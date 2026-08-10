#!/usr/bin/env python3
"""Create zero-state project ledgers and report Factory ledger coverage."""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


PROJECT = re.compile(r"^\s*- id:\s*([a-z0-9][a-z0-9._-]*)\s*$")


def now_utc() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def project_ids(registry: Path) -> list[str]:
    return [match.group(1) for line in registry.read_text(encoding="utf-8").splitlines() if (match := PROJECT.match(line))]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--registry", type=Path, required=True)
    parser.add_argument("--records-root", type=Path, required=True)
    parser.add_argument("--check", action="store_true", help="Do not create missing ledgers")
    args = parser.parse_args()
    ids = project_ids(args.registry.expanduser().resolve())
    missing: list[str] = []
    created: list[str] = []
    invalid: list[str] = []
    for project_id in ids:
        path = args.records_root.expanduser().resolve() / project_id.title().replace("-", "-") / "infraction-ledger.json"
        if project_id == "solvys-2":
            path = args.records_root.expanduser().resolve() / "Solvys-2" / "infraction-ledger.json"
        elif project_id == "cred-cowork":
            path = args.records_root.expanduser().resolve() / "CRED-Cowork" / "infraction-ledger.json"
        elif project_id == "ssfitness":
            path = args.records_root.expanduser().resolve() / "SSFitness" / "infraction-ledger.json"
        elif project_id == "heirright":
            path = args.records_root.expanduser().resolve() / "HeirRight" / "infraction-ledger.json"
        elif project_id == "fintheon":
            path = args.records_root.expanduser().resolve() / "Fintheon" / "infraction-ledger.json"
        if not path.exists():
            missing.append(project_id)
            if not args.check:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(json.dumps({"version": 1, "projectId": project_id, "updatedAt": None, "entries": []}, indent=2) + "\n", encoding="utf-8")
                created.append(project_id)
            continue
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
            if payload.get("version") != 1 or payload.get("projectId") != project_id or not isinstance(payload.get("entries"), list):
                invalid.append(str(path))
        except (OSError, json.JSONDecodeError):
            invalid.append(str(path))
    result = {"generatedAt": now_utc(), "projects": ids, "missingProjects": missing, "createdProjects": created, "invalidLedgers": invalid, "coverageComplete": not missing and not invalid}
    print(json.dumps(result, indent=2))
    return 1 if invalid or (args.check and missing) else 0


if __name__ == "__main__":
    raise SystemExit(main())
