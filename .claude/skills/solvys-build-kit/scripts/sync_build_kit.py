#!/usr/bin/env python3
"""Discover approved upstream library changes and update the Build Kit receipt."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
REGISTRY_PATH = ASSET_ROOT / "library-sources.json"
UPDATES_ROOT = ASSET_ROOT / "updates"
RECEIPT_PATH = UPDATES_ROOT / "sync-receipt.json"
LOCK_PATH = UPDATES_ROOT / "upstream-lock.json"
SLUG = re.compile(r"[^a-z0-9]+")


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def fetch_json(url: str, auth_env: str | None = None) -> dict | list:
    headers = {"Accept": "application/json", "User-Agent": "solvys-build-kit-sync/2.0"}
    if auth_env and os.environ.get(auth_env):
        headers["Authorization"] = f"Bearer {os.environ[auth_env]}"
    request = Request(url, headers=headers)
    with urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def source_slug(value: str) -> str:
    return SLUG.sub("-", value.lower()).strip("-") or "unnamed"


def local_catalog(source: dict) -> tuple[dict | list | None, str | None]:
    mirror_env = source.get("mirrorEnv")
    relative = source.get("mirrorCatalog")
    mirror = os.environ.get(mirror_env or "")
    if not mirror or not relative:
        return None, None
    path = Path(mirror).expanduser() / relative
    if not path.is_file():
        return None, str(path)
    return read_json(path), str(path)


def catalog_for(source: dict) -> tuple[dict | list | None, str | None, str | None]:
    catalog_env = source.get("catalogUrlEnv")
    catalog_url = os.environ.get(catalog_env or "") or source.get("catalogUrl")
    if catalog_url:
        try:
            return fetch_json(catalog_url, source.get("authEnv")), catalog_url, None
        except (HTTPError, URLError, TimeoutError, ValueError) as exc:
            return None, catalog_url, str(exc)
    catalog, path = local_catalog(source)
    return catalog, path, None


def catalog_items(catalog: dict | list) -> list[dict]:
    if isinstance(catalog, list):
        return [item for item in catalog if isinstance(item, dict)]
    for key in ("items", "components", "blocks", "entries"):
        value = catalog.get(key)
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    return []


def catalog_revision(catalog: dict | list) -> str | None:
    if isinstance(catalog, list):
        return None
    for key in ("revision", "version", "sha", "updatedAt"):
        if catalog.get(key):
            return str(catalog[key])
    canonical = json.dumps(catalog, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return f"catalog-{hashlib.sha256(canonical).hexdigest()[:16]}"


def normalized_items(source: dict, catalog: dict | list) -> list[dict]:
    result = []
    raw_items = catalog_items(catalog)
    names = {str(item.get("name")) for item in raw_items if item.get("name")}
    package_path = ASSET_ROOT / "package.json"
    package_names: set[str] = set()
    if package_path.is_file():
        package = read_json(package_path)
        package_names.update(package.get("dependencies", {}))
        package_names.update(package.get("devDependencies", {}))
    for item in raw_items:
        name = str(item.get("name") or item.get("title") or item.get("id") or "unnamed")
        item_id = str(item.get("id") or source_slug(name))
        raw_kind = str(item.get("kind") or item.get("type") or "component")
        kind = {
            "registry:component": "component",
            "registry:block": "block",
            "registry:ui": "component",
            "registry:page": "template",
        }.get(raw_kind, raw_kind.removeprefix("registry:") or "component")
        dependencies = [str(value) for value in item.get("dependencies", []) if isinstance(value, str)]
        registry_dependencies = [str(value) for value in item.get("registryDependencies", []) if isinstance(value, str)]
        missing_dependencies = []
        for dependency in dependencies:
            if dependency in package_names:
                continue
            if dependency.startswith("@") and "/" in dependency and dependency.split("/", 1)[0] == source.get("registryNamespace", ""):
                if dependency.rsplit("/", 1)[-1] in names:
                    continue
            missing_dependencies.append(dependency)
        files = item.get("files") if isinstance(item.get("files"), list) else []
        source_path = item.get("path") or item.get("url") or item.get("registryItem")
        if not source_path and source.get("catalogItemPathTemplate"):
            source_path = source["catalogItemPathTemplate"].replace("{name}", quote(item_id, safe=""))
        license_value = item.get("license") or source.get("catalogLicense")
        source_checks = {
            "registrySchema": bool(item.get("type") and files),
            "sourceFilesPresent": bool(files),
            "dependenciesInstalled": not missing_dependencies,
            "licensePolicyResolved": bool(license_value),
        }
        result.append({
            "id": f"{source['id']}:{source_slug(item_id)}",
            "name": name,
            "kind": kind,
            "sourceId": source["id"],
            "sourceRevision": str(item.get("revision") or item.get("version") or catalog_revision(catalog) or "unknown"),
            "license": license_value,
            "licensePolicy": source.get("licensePolicy", "verify-per-block"),
            "licenseUrl": source.get("catalogLicenseUrl"),
            "compatibility": item.get("compatibility") or source.get("compatibilityProfile") or "unknown",
            "contractId": item.get("contractId") or source.get("contractId"),
            "sourcePath": source_path or source.get("catalogUrl"),
            "sourceType": raw_kind,
            "dependencies": dependencies,
            "registryDependencies": registry_dependencies,
            "sourceChecks": source_checks,
        })
    return result


def check_npm(source: dict) -> dict:
    package = source["packages"][0]
    url = f"https://registry.npmjs.org/{quote(package, safe='@/') }"
    try:
        payload = fetch_json(url)
    except (HTTPError, URLError, TimeoutError, ValueError) as exc:
        return {"id": source["id"], "status": "unavailable", "detail": str(exc), "sourceUrl": source["sourceUrl"]}
    latest = str(payload.get("dist-tags", {}).get("latest") or "unknown")
    license_value = payload.get("license")
    if isinstance(license_value, dict):
        license_value = license_value.get("type")
    return {
        "id": source["id"],
        "status": "ready",
        "sourceUrl": source["sourceUrl"],
        "package": package,
        "observedRevision": latest,
        "pinnedRevision": source.get("pinnedVersion"),
        "license": license_value,
        "change": "same" if latest == source.get("pinnedVersion") else "available",
        "autoUpdate": bool(source.get("autoUpdate")),
    }


def check_catalog(source: dict) -> dict:
    catalog, locator, error = catalog_for(source)
    if error:
        return {"id": source["id"], "status": "unavailable", "sourceUrl": source["sourceUrl"], "locator": locator, "detail": error}
    if catalog is None:
        return {
            "id": source["id"],
            "status": "awaiting-source",
            "sourceUrl": source["sourceUrl"],
            "locator": locator,
            "requiredEnvironment": [source.get("catalogUrlEnv"), source.get("mirrorEnv")],
            "detail": "No catalog endpoint or local mirror is configured.",
        }
    revision = catalog_revision(catalog) or "unknown"
    items = normalized_items(source, catalog)
    return {
        "id": source["id"],
        "status": "ready",
        "sourceUrl": source["sourceUrl"],
        "locator": locator,
        "observedRevision": revision,
        "items": items,
        "itemCount": len(items),
        "autoUpdate": bool(source.get("autoUpdate")),
    }


def check_source(source: dict) -> dict:
    if source.get("distribution") == "npm":
        return check_npm(source)
    return check_catalog(source)


def build_receipt(registry: dict) -> dict:
    sources = [check_source(source) for source in registry.get("activeUpstreams", [])]
    ready = sum(result["status"] == "ready" for result in sources)
    awaiting = sum(result["status"] == "awaiting-source" for result in sources)
    unavailable = sum(result["status"] == "unavailable" for result in sources)
    return {
        "schemaVersion": 1,
        "kit": registry.get("kit"),
        "generatedAt": now(),
        "sources": sources,
        "summary": {"total": len(sources), "ready": ready, "awaitingSource": awaiting, "unavailable": unavailable},
        "promotion": {
            "mode": registry.get("sourcePolicy", {}).get("productionPromotion", "green-only"),
            "automatic": "compatible additive blocks only",
            "quarantine": "breaking, uncertain, unlicensed, or identity-changing blocks",
        },
    }


def write_updates(receipt: dict) -> None:
    UPDATES_ROOT.mkdir(parents=True, exist_ok=True)
    RECEIPT_PATH.write_text(json.dumps(receipt, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    previous = read_json(LOCK_PATH) if LOCK_PATH.is_file() else {"schemaVersion": 1, "sources": {}}
    locks = previous.get("sources", {})
    for source in receipt["sources"]:
        source_id = source["id"]
        entry = locks.setdefault(source_id, {})
        entry["observedRevision"] = source.get("observedRevision")
        entry["observedAt"] = receipt["generatedAt"]
        entry["status"] = source["status"]
        if source.get("status") == "ready" and source.get("items"):
            candidate_path = UPDATES_ROOT / "candidates" / f"{source_id}.json"
            candidate_path.parent.mkdir(parents=True, exist_ok=True)
            candidate_path.write_text(json.dumps({
                "schemaVersion": 1,
                "source": source_id,
                "sourceUrl": source.get("sourceUrl"),
                "sourceRevision": source.get("observedRevision"),
                "items": source["items"],
                "status": "candidate",
            }, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    LOCK_PATH.write_text(json.dumps({"schemaVersion": 1, "sources": locks}, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Discover upstream revisions without writing")
    parser.add_argument("--apply", action="store_true", help="Write the receipt, lock, and candidate catalogs")
    parser.add_argument("--strict", action="store_true", help="Fail when an active source is unavailable or awaiting configuration")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.check and not args.apply:
        args.check = True
    try:
        registry = read_json(REGISTRY_PATH)
        receipt = build_receipt(registry)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"sync configuration error: {exc}", file=sys.stderr)
        return 1
    if args.apply:
        write_updates(receipt)
    print(json.dumps({"kit": receipt["kit"], "generatedAt": receipt["generatedAt"], "summary": receipt["summary"], "sources": [{k: v for k, v in source.items() if k not in {"items"}} for source in receipt["sources"]]}, indent=2, sort_keys=True))
    if args.strict and any(source["status"] != "ready" for source in receipt["sources"]):
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
