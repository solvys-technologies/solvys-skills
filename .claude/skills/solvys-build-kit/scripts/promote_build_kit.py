#!/usr/bin/env python3
"""Promote validated additive upstream block records into the Build Kit catalog."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
UPDATES_ROOT = ASSET_ROOT / "updates"
CANDIDATES_ROOT = UPDATES_ROOT / "candidates"
PROMOTED_PATH = UPDATES_ROOT / "promoted-catalog.json"
QUARANTINE_PATH = UPDATES_ROOT / "quarantine.json"
AUTO_SOURCES = {"beui", "beui-pro", "evilcharts"}
ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*(?::[a-z0-9]+(?:-[a-z0-9]+)*)$")
CONTRACT_PATTERN = re.compile(r"^[a-z0-9]+(?:[-:._/][a-z0-9]+)*$")
ALLOWED_KINDS = {"component", "block", "chart", "visualization", "template"}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_json(path: Path, fallback: dict) -> dict:
    if not path.is_file():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def explicit_license(value: object) -> bool:
    if not isinstance(value, str):
        return False
    return bool(value.strip()) and value.strip().lower() not in {"unknown", "unlicensed", "verify-per-block"}


def compatible(value: object) -> bool:
    if isinstance(value, dict):
        status = str(value.get("status") or value.get("result") or "").lower()
        kit = str(value.get("kit") or value.get("target") or "solvys-build-kit").lower()
        return kit in {"solvys-build-kit", "solvys"} and status in {"compatible", "supported", "green", "pass", "passed"}
    if isinstance(value, list):
        return any(compatible(item) for item in value)
    if isinstance(value, str):
        token = value.strip().lower()
        return token in {"compatible", "supported", "green", "pass", "passed"} or "solvys-build-kit" in token
    return value is True


def safe_source_path(value: object) -> bool:
    if not isinstance(value, str) or not value.strip():
        return False
    path = value.strip()
    return path.startswith("https://") or (not path.startswith("/") and ".." not in path and "\\" not in path)


def validate_item(source_id: str, item: dict) -> list[str]:
    reasons: list[str] = []
    item_id = item.get("id")
    if not isinstance(item_id, str) or not ID_PATTERN.fullmatch(item_id) or not item_id.startswith(f"{source_id}:"):
        reasons.append("invalid-source-scoped-id")
    if not isinstance(item.get("name"), str) or not item["name"].strip():
        reasons.append("missing-name")
    if item.get("kind") not in ALLOWED_KINDS:
        reasons.append("unsupported-kind")
    if not item.get("sourceRevision") or item.get("sourceRevision") == "unknown":
        reasons.append("missing-source-revision")
    if not explicit_license(item.get("license")):
        reasons.append("missing-explicit-license")
    if not compatible(item.get("compatibility")):
        reasons.append("missing-compatible-contract")
    checks = item.get("sourceChecks")
    if not isinstance(checks, dict) or not all(checks.get(key) is True for key in ("registrySchema", "sourceFilesPresent", "dependenciesInstalled", "licensePolicyResolved")):
        reasons.append("source-checks-not-green")
    contract_id = item.get("contractId")
    if not isinstance(contract_id, str) or not CONTRACT_PATTERN.fullmatch(contract_id.lower()):
        reasons.append("missing-contract-id")
    if not safe_source_path(item.get("sourcePath")):
        reasons.append("unsafe-or-missing-source-path")
    return reasons


def candidate_records() -> list[dict]:
    if not CANDIDATES_ROOT.is_dir():
        return []
    records: list[dict] = []
    for path in sorted(CANDIDATES_ROOT.glob("*.json")):
        payload = read_json(path, {})
        if isinstance(payload, dict):
            records.append(payload)
    return records


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate candidates without writing promotion receipts")
    parser.add_argument("--apply", action="store_true", help="Write promoted and quarantine catalogs")
    parser.add_argument("--strict", action="store_true", help="Fail when any candidate is quarantined")
    args = parser.parse_args()
    if not args.check and not args.apply:
        args.check = True

    try:
        previous = read_json(PROMOTED_PATH, {"schemaVersion": 1, "kit": "solvys-build-kit", "items": []})
        existing = {item.get("id"): item for item in previous.get("items", []) if isinstance(item, dict) and item.get("id")}
        promoted: list[dict] = list(existing.values())
        quarantine: list[dict] = []
        promoted_ids: set[str] = set(existing)
        for candidate in candidate_records():
            source_id = str(candidate.get("source") or "")
            if source_id not in AUTO_SOURCES:
                quarantine.append({"source": source_id, "reason": "source-is-not-auto-update-approved"})
                continue
            for item in candidate.get("items", []):
                if not isinstance(item, dict):
                    quarantine.append({"source": source_id, "reason": "candidate-item-is-not-an-object"})
                    continue
                item_id = item.get("id")
                reasons = validate_item(source_id, item)
                if item_id in promoted_ids:
                    prior = existing[item_id]
                    if prior.get("sourceRevision") == item.get("sourceRevision"):
                        continue
                    reasons.append("existing-item-revision-changed")
                if reasons:
                    quarantine.append({"source": source_id, "id": item_id, "reasons": sorted(set(reasons))})
                    continue
                promoted.append({**item, "promotion": "automatic-green-only", "promotedAt": now()})
                promoted_ids.add(item_id)
        promoted.sort(key=lambda item: item.get("id", ""))
        generated_at = now()
        approved = {
            "schemaVersion": 1,
            "kit": "solvys-build-kit",
            "generatedAt": generated_at,
            "policy": {"sources": sorted(AUTO_SOURCES), "mode": "green-only", "changeType": "additive-only"},
            "items": promoted,
            "summary": {"promoted": len(promoted), "quarantined": len(quarantine)},
        }
        quarantine_payload = {"schemaVersion": 1, "kit": "solvys-build-kit", "generatedAt": generated_at, "items": quarantine, "summary": {"quarantined": len(quarantine)}}
    except (OSError, json.JSONDecodeError, TypeError) as exc:
        print(f"promotion configuration error: {exc}", file=sys.stderr)
        return 1

    if args.apply:
        UPDATES_ROOT.mkdir(parents=True, exist_ok=True)
        PROMOTED_PATH.write_text(json.dumps(approved, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        QUARANTINE_PATH.write_text(json.dumps(quarantine_payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"kit": approved["kit"], "generatedAt": generated_at, "summary": approved["summary"]}, indent=2, sort_keys=True))
    if args.strict and quarantine:
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
