#!/usr/bin/env python3
"""Install and snapshot the supplied Solvys Build Kit library sources."""

from __future__ import annotations

import argparse
import json
import hashlib
import os
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
INSTALL_ROOT = ASSET_ROOT / "installed-registries"
FULL_SOURCE_ROOT = ASSET_ROOT / "installed-libraries"
RECEIPT_PATH = INSTALL_ROOT / "install-receipt.json"


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def fetch(url: str, token_env: str | None = None) -> bytes:
    headers = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "solvys-build-kit-source-installer/2.0",
    }
    token = os.environ.get(token_env or "")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = Request(url, headers=headers)
    with urlopen(request, timeout=30) as response:
        return response.read()


def write_snapshot(namespace: str, filename: str, url: str, token_env: str | None = None) -> dict:
    target = INSTALL_ROOT / namespace / filename
    try:
        body = fetch(url, token_env)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(body)
        return {
            "url": url,
            "path": str(target.relative_to(ASSET_ROOT)),
            "status": "installed",
            "bytes": len(body),
        }
    except (HTTPError, URLError, TimeoutError, OSError) as exc:
        status = "awaiting-credentials" if isinstance(exc, HTTPError) and exc.code in {401, 403} and token_env else "unavailable"
        return {"url": url, "status": status, "detail": str(exc)}


def safe_path(value: str) -> Path:
    """Return a repository-safe relative path for an upstream registry path."""
    parts = [part for part in Path(value).parts if part not in {"", ".", "..", "/", "\\"}]
    if not parts:
        return Path("source.txt")
    return Path(*parts)


def fetch_json(url: str, token_env: str | None = None) -> dict | list:
    return json.loads(fetch(url, token_env).decode("utf-8"))


def catalog_items(catalog: dict | list) -> list[dict]:
    if isinstance(catalog, list):
        return [item for item in catalog if isinstance(item, dict)]
    value = catalog.get("items") if isinstance(catalog, dict) else None
    return value if isinstance(value, list) else []


def access_status(exc: Exception, token_env: str | None = None) -> str:
    """Classify a source failure without hiding an access-gated catalog entry."""
    if isinstance(exc, HTTPError) and exc.code in {401, 403}:
        return "awaiting-credentials" if token_env else "access-gated"
    return "unavailable"


def snapshot_full_registry(source: dict, catalog_url: str, token_env: str | None = None, skip_existing: bool = False) -> dict:
    """Copy every registry item and its shipped source files into an isolated library folder."""
    catalog = fetch_json(catalog_url, token_env)
    items = catalog_items(catalog)
    source_root = FULL_SOURCE_ROOT / source["id"]
    source_root.mkdir(parents=True, exist_ok=True)
    (source_root / "catalog.json").write_text(json.dumps(catalog, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    item_manifests: list[dict] = []
    template = source.get("catalogItemPathTemplate")
    if not template:
        raise ValueError(f"source {source['id']} has no catalog item path template")

    for index, item in enumerate(items, start=1):
        name = str(item.get("name") or item.get("id") or f"item-{index}")
        item_id = quote(name, safe="")
        item_url = template.replace("{name}", item_id)
        item_root = source_root / "items" / safe_path(name)
        files_root = item_root / "files"
        existing_manifest = item_root / "registry-item.json"
        if skip_existing and existing_manifest.is_file() and files_root.is_dir() and any(files_root.rglob("*")):
            cached = json.loads(existing_manifest.read_text(encoding="utf-8"))
            shipped_files = cached.get("shippedFiles", []) if isinstance(cached, dict) else []
            item_manifests.append({
                "name": name,
                "type": item.get("type"),
                "title": item.get("title"),
                "status": cached.get("status", "installed") if isinstance(cached, dict) else "installed",
                "sourceUrl": cached.get("sourceUrl") if isinstance(cached, dict) else item_url,
                "fileCount": len(shipped_files),
                "sourceFiles": shipped_files,
            })
            continue
        files_root.mkdir(parents=True, exist_ok=True)
        try:
            payload = fetch_json(item_url, token_env)
        except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
            status = access_status(exc, token_env)
            manifest = {
                "name": name,
                "type": item.get("type"),
                "title": item.get("title"),
                "sourceUrl": item_url,
                "status": status,
                "detail": str(exc),
                "shippedFiles": [],
            }
            (item_root / "registry-item.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
            item_manifests.append({
                "name": name,
                "type": item.get("type"),
                "title": item.get("title"),
                "status": status,
                "sourceUrl": item_url,
                "fileCount": 0,
                "sourceFiles": [],
                "detail": str(exc),
            })
            continue
        files = payload.get("files", []) if isinstance(payload, dict) else []
        manifest = {key: value for key, value in (payload.items() if isinstance(payload, dict) else []) if key != "files"}
        shipped_files: list[dict] = []
        for file_index, file_entry in enumerate(files, start=1):
            if not isinstance(file_entry, dict):
                continue
            relative = safe_path(str(file_entry.get("path") or file_entry.get("target") or f"source-{file_index}.txt"))
            content = file_entry.get("content")
            if not isinstance(content, str):
                continue
            destination = files_root / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(content, encoding="utf-8")
            shipped_files.append({
                "path": str(relative),
                "type": file_entry.get("type"),
                "target": file_entry.get("target"),
                "bytes": len(content.encode("utf-8")),
                "sha256": hashlib.sha256(content.encode("utf-8")).hexdigest(),
            })
        manifest["sourceUrl"] = item_url
        manifest["status"] = "installed"
        manifest["shippedFiles"] = shipped_files
        (item_root / "registry-item.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        item_manifests.append({
            "name": name,
            "type": item.get("type"),
            "title": item.get("title"),
            "status": "installed",
            "sourceUrl": item_url,
            "fileCount": len(shipped_files),
            "sourceFiles": shipped_files,
        })

    gated_items = [item for item in item_manifests if item.get("status") in {"access-gated", "awaiting-credentials"}]
    unavailable_items = [item for item in item_manifests if item.get("status") == "unavailable"]
    installed_items = [item for item in item_manifests if item.get("status") == "installed"]
    library_manifest = {
        "schemaVersion": 1,
        "library": source["id"],
        "name": source.get("name"),
        "sourceUrl": source.get("sourceUrl"),
        "catalogUrl": catalog_url,
        "catalogItemCount": len(items),
        "installedItemCount": len(installed_items),
        "accessGatedItemCount": len(gated_items),
        "unavailableItemCount": len(unavailable_items),
        "status": "installed" if not gated_items and not unavailable_items else "installed-with-access-gates",
        "snapshotMode": "full-registry-source",
        "autoUpdate": False,
        "items": item_manifests,
    }
    (source_root / "library-manifest.json").write_text(json.dumps(library_manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return {
        "status": "installed" if not gated_items and not unavailable_items else "installed-with-access-gates",
        "mode": "full-registry-source",
        "path": str(source_root.relative_to(ASSET_ROOT)),
        "itemCount": len(items),
        "installedItemCount": len(installed_items),
        "accessGatedItemCount": len(gated_items),
        "unavailableItemCount": len(unavailable_items),
        "fileCount": sum(item["fileCount"] for item in item_manifests),
    }


def snapshot_aicss_registry(catalog_url: str, skip_existing: bool = False) -> dict:
    """Snapshot every AIcss catalog entry, including locked-entry metadata."""
    catalog = fetch_json(catalog_url)
    components = catalog.get("components", []) if isinstance(catalog, dict) else []
    source_root = FULL_SOURCE_ROOT / "aicss"
    source_root.mkdir(parents=True, exist_ok=True)
    (source_root / "catalog.json").write_text(json.dumps(catalog, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    item_manifests: list[dict] = []
    for component in components:
        if not isinstance(component, dict):
            continue
        slug = str(component.get("slug") or component.get("name") or "item")
        item_root = source_root / "items" / safe_path(slug)
        item_root.mkdir(parents=True, exist_ok=True)
        target = item_root / "registry-item.json"
        if skip_existing and target.is_file():
            cached = json.loads(target.read_text(encoding="utf-8"))
            item_manifests.append({
                "slug": slug,
                "name": component.get("name"),
                "tier": component.get("tier"),
                "status": cached.get("status", "installed") if isinstance(cached, dict) else "installed",
                "sourceUrl": cached.get("sourceUrl") if isinstance(cached, dict) else f"https://www.aicss.dev/r/{quote(slug, safe='')}",
            })
            continue
        item_url = f"https://www.aicss.dev/r/{quote(slug, safe='')}"
        try:
            payload = fetch_json(item_url)
            status = "installed"
            target.write_text(json.dumps({"sourceUrl": item_url, "status": status, "payload": payload}, indent=2, sort_keys=True) + "\n", encoding="utf-8")
            item_manifests.append({
                "slug": slug,
                "name": component.get("name"),
                "tier": component.get("tier"),
                "status": status,
                "sourceUrl": item_url,
            })
        except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
            status = access_status(exc)
            target.write_text(json.dumps({
                "slug": slug,
                "name": component.get("name"),
                "tier": component.get("tier"),
                "sourceUrl": item_url,
                "status": status,
                "detail": str(exc),
            }, indent=2, sort_keys=True) + "\n", encoding="utf-8")
            item_manifests.append({
                "slug": slug,
                "name": component.get("name"),
                "tier": component.get("tier"),
                "status": status,
                "sourceUrl": item_url,
                "detail": str(exc),
            })
    gated_items = [item for item in item_manifests if item.get("status") in {"access-gated", "awaiting-credentials"}]
    unavailable_items = [item for item in item_manifests if item.get("status") == "unavailable"]
    installed_items = [item for item in item_manifests if item.get("status") == "installed"]
    manifest = {
        "schemaVersion": 1,
        "library": "aicss",
        "name": "AIcss",
        "catalogUrl": catalog_url,
        "catalogItemCount": len(components),
        "installedItemCount": len(installed_items),
        "accessGatedItemCount": len(gated_items),
        "unavailableItemCount": len(unavailable_items),
        "status": "installed" if not gated_items and not unavailable_items else "installed-with-access-gates",
        "snapshotMode": "full-source-registry",
        "autoUpdate": False,
        "items": item_manifests,
    }
    (source_root / "library-manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return {
        "status": manifest["status"],
        "mode": "full-source-registry",
        "path": str(source_root.relative_to(ASSET_ROOT)),
        "itemCount": len(components),
        "installedItemCount": len(installed_items),
        "accessGatedItemCount": len(gated_items),
        "unavailableItemCount": len(unavailable_items),
    }


def npm_inventory() -> dict:
    package_path = ASSET_ROOT / "package.json"
    package = json.loads(package_path.read_text(encoding="utf-8"))
    return {
        "dependencies": package.get("dependencies", {}),
        "devDependencies": package.get("devDependencies", {}),
    }


def install_sources(full: bool = False, skip_existing: bool = False) -> dict:
    results: dict[str, dict] = {}
    results["beui"] = {
        "mode": "registry-catalog",
        "autoUpdate": False,
        "snapshot": write_snapshot("beui", "registry.json", "https://beui.dev/r/registry.json"),
    }
    results["beui-pro"] = {
        "mode": "private-registry-catalog",
        "autoUpdate": False,
        "credentialEnv": "BEUI_PRO_TOKEN",
        "snapshot": write_snapshot("beui-pro", "registry.json", "https://pro.beui.dev/r/registry.json", "BEUI_PRO_TOKEN"),
    }
    results["evilcharts"] = {
        "mode": "registry-catalog",
        "autoUpdate": False,
        "snapshot": write_snapshot("evilcharts", "registry.json", "https://evilcharts.com/r/registry.json?raw=1"),
    }
    if full:
        for source_id, token_env, catalog_url in [
            ("beui", None, "https://beui.dev/r/registry.json"),
            ("beui-pro", "BEUI_PRO_TOKEN", "https://pro.beui.dev/r/registry.json"),
            ("evilcharts", None, "https://evilcharts.com/r/registry.json?raw=1"),
            ("mapcn", None, "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/registry.json"),
            ("aceternity-ui", None, "https://ui.aceternity.com/registry/registry.json"),
            ("create-ui", None, "https://createui.co/r/registry.json"),
        ]:
            source = next(entry for entry in json.loads((ASSET_ROOT / "library-sources.json").read_text(encoding="utf-8"))["activeUpstreams"] if entry["id"] == source_id)
            results.setdefault(source_id, {"mode": "registry-catalog", "autoUpdate": False})
            try:
                results[source_id]["fullSource"] = snapshot_full_registry(source, catalog_url, token_env, skip_existing)
            except (HTTPError, URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as exc:
                results[source_id]["fullSource"] = {
                    "status": "awaiting-credentials" if isinstance(exc, HTTPError) and exc.code in {401, 403} and token_env else "unavailable",
                    "detail": str(exc),
                }
    results["tanstack-charts"] = {
        "mode": "pinned-npm-package",
        "autoUpdate": False,
        "package": "@tanstack/charts",
        "version": json.loads((ASSET_ROOT / "package.json").read_text(encoding="utf-8"))["dependencies"]["@tanstack/charts"],
        "sourceUrl": "https://tanstack.com/charts/latest",
    }
    mapcn_urls = {
        "registry.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/registry.json",
        "map.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/map.json",
        "analytics-card.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/analytics-card.json",
        "analytics-map.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/analytics-map.json",
        "choropleth.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/choropleth.json",
        "heatmap.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/heatmap.json",
        "delivery-tracker.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/delivery-tracker.json",
        "uptime-monitor.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/uptime-monitor.json",
        "logistics-network.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/logistics-network.json",
        "store-locator.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/store-locator.json",
    }
    mapcn_result = results.get("mapcn", {})
    mapcn_result.update({
        "mode": "github-shadcn-registry",
        "autoUpdate": False,
        "license": "MIT",
        "snapshots": {name: write_snapshot("mapcn", name, url) for name, url in mapcn_urls.items()},
    })
    results["mapcn"] = mapcn_result
    aceternity_result = results.get("aceternity-ui", {})
    aceternity_result.update({
        "mode": "shadcn-registry",
        "autoUpdate": False,
        "catalog": write_snapshot("aceternity-ui", "registry.json", "https://ui.aceternity.com/registry/registry.json"),
        "snapshots": {
            "bento-grid.json": write_snapshot("aceternity-ui", "bento-grid.json", "https://ui.aceternity.com/registry/bento-grid.json"),
            "terminal.json": write_snapshot("aceternity-ui", "terminal.json", "https://ui.aceternity.com/registry/terminal.json"),
        },
    })
    results["aceternity-ui"] = aceternity_result
    create_ui_result = results.get("create-ui", {})
    create_ui_result.update({
        "mode": "cli-registry",
        "autoUpdate": False,
        "catalog": write_snapshot("create-ui", "registry.json", "https://createui.co/r/registry.json"),
    })
    results["create-ui"] = create_ui_result
    free_aicss = [
        "thinking-state",
        "thinking-reasoning",
        "orbs",
        "text-response",
        "streaming-text",
        "code-block",
        "task-list",
        "data-table",
        "ai-agent-input",
    ]
    results["aicss"] = {
        "mode": "source-registry-free-catalog",
        "autoUpdate": False,
        "licensePolicy": "licensed-components-remain-gated",
        "catalog": write_snapshot("aicss", "registry.json", "https://www.aicss.dev/r"),
        "snapshots": {name: write_snapshot("aicss", f"{name}.json", f"https://www.aicss.dev/r/{name}") for name in free_aicss},
    }
    if full:
        try:
            results["aicss"]["fullSource"] = snapshot_aicss_registry("https://www.aicss.dev/r", skip_existing)
        except (HTTPError, URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as exc:
            results["aicss"]["fullSource"] = {"status": access_status(exc), "detail": str(exc)}
    results["npm"] = {
        "mode": "pinned-install",
        "autoUpdate": False,
        "inventory": npm_inventory(),
    }
    results["reference-only"] = {
        "bakai-lab": {"status": "reference-only-no-package", "url": "https://www.bakai.me/lab"},
        "grainient": {"status": "license-gated-asset-service", "url": "https://grainient.supply/"},
        "basit-designs-x": {"status": "reference-only-image-post", "url": "https://x.com/basit_designs/status/2086046675282624551?s=12"},
        "openui-examples": {"status": "installed-via-npm", "url": "https://github.com/thesysdev/openui/tree/main/examples"},
        "create-ui": {"status": "installed-via-cli", "url": "https://createui.co/docs/components"},
        "generative-loaders": {"status": "installed-via-npm", "url": "https://generativeloaders.com/"},
        "thinking-orbs": {"status": "installed-via-npm", "url": "https://orbs.jakubantalik.com/"},
    }
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Fetch public registries and write the install receipt")
    parser.add_argument("--full", action="store_true", help="Copy every approved registry item and shipped source file into installed-libraries")
    parser.add_argument("--skip-existing", action="store_true", help="Reuse completed item snapshots when resuming a full install")
    args = parser.parse_args()
    if not args.apply:
        parser.error("use --apply to write the source layer")
    INSTALL_ROOT.mkdir(parents=True, exist_ok=True)
    receipt = {
        "schemaVersion": 1,
        "kit": "solvys-build-kit",
        "generatedAt": now(),
        "secretPolicy": "private credentials are process-only and never written to snapshots or receipts",
        "sources": install_sources(full=args.full, skip_existing=args.skip_existing),
    }
    RECEIPT_PATH.write_text(json.dumps(receipt, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    summary = {"receipt": str(RECEIPT_PATH), "fullSourceRoot": str(FULL_SOURCE_ROOT), "privateCredentialUsed": bool(os.environ.get("BEUI_PRO_TOKEN")), "full": args.full}
    print(json.dumps(summary, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
