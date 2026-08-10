#!/usr/bin/env python3
"""Build a ranked, read-only repair queue from Solvys Factory ledgers."""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path


SEVERITY_RANK = {"low": 1, "medium": 2, "high": 3, "critical": 4}
OPEN_STATUSES = {"open", "in-progress"}


def now_utc() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def default_root() -> Path:
    factory_home = Path(os.environ.get("SOLVYS_FACTORY_HOME", "~/.config/solvys-factory")).expanduser()
    return factory_home / "projects"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=default_root(), help="Project ledger root")
    parser.add_argument("--ledger", type=Path, action="append", default=[], help="Explicit ledger path; repeatable")
    parser.add_argument("--expected-project", action="append", default=[], help="Registered project slug; repeatable")
    parser.add_argument("--rollup", type=Path, help="Write the JSON result to this path as well as stdout")
    parser.add_argument("--include-resolved", action="store_true", help="Include resolved and accepted-risk entries")
    parser.add_argument("--limit", type=int, default=50, help="Maximum repair entries to return")
    return parser.parse_args()


def ledger_paths(root: Path, explicit: list[Path]) -> list[Path]:
    paths = {path.expanduser().resolve() for path in explicit}
    if root.exists():
        if root.is_file() and root.name == "infraction-ledger.json":
            paths.add(root.resolve())
        else:
            own_ledger = root / "infraction-ledger.json"
            if own_ledger.is_file():
                paths.add(own_ledger.resolve())
            paths.update(path.resolve() for path in root.glob("*/infraction-ledger.json"))
    return sorted(paths)


def read_ledger(path: Path) -> tuple[dict | None, str | None]:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return None, str(exc)
    if payload.get("version") != 1 or not isinstance(payload.get("entries"), list):
        return None, "expected version 1 ledger with an entries list"
    return payload, None


def main() -> int:
    args = parse_args()
    if args.limit < 1:
        raise SystemExit("limit must be at least 1")

    repairs: list[dict] = []
    invalid: list[dict] = []
    paths = ledger_paths(args.root, args.ledger)
    for path in paths:
        payload, error = read_ledger(path)
        if error:
            invalid.append({"ledger": str(path), "error": error})
            continue
        project_id = payload.get("projectId", "unassigned")
        for entry in payload["entries"]:
            status = entry.get("status", "open")
            if not args.include_resolved and status not in OPEN_STATUSES:
                continue
            severity = entry.get("severity", "medium")
            repairs.append(
                {
                    "projectId": project_id,
                    "ledger": str(path),
                    "entryId": entry.get("id"),
                    "title": entry.get("title"),
                    "category": entry.get("category"),
                    "severity": severity,
                    "count": int(entry.get("count", 0)),
                    "status": status,
                    "deathLoop": bool(entry.get("deathLoop", False)),
                    "owner": entry.get("owner"),
                    "nextAction": entry.get("nextAction"),
                    "lastSeenAt": entry.get("lastSeenAt"),
                }
            )

    repairs.sort(
        key=lambda item: (
            not item["deathLoop"],
            -SEVERITY_RANK.get(item["severity"], 0),
            -item["count"],
            item["lastSeenAt"] or "",
        )
    )
    selected = repairs[: args.limit]
    observed_projects = {str(payload.get("projectId")) for path in paths if (payload := read_ledger(path)[0])}
    missing_projects = sorted(set(args.expected_project) - observed_projects)
    result = {
        "generatedAt": now_utc(),
        "root": str(args.root.expanduser().resolve()),
        "ledgerCount": len(paths),
        "invalidLedgers": invalid,
        "missingProjects": missing_projects,
        "coverageComplete": not invalid and not missing_projects,
        "openCount": len(repairs),
        "selectedRepairs": selected,
        "remainingCount": max(0, len(repairs) - len(selected)),
    }
    rendered = json.dumps(result, indent=2, sort_keys=False)
    if args.rollup:
        args.rollup.expanduser().resolve().parent.mkdir(parents=True, exist_ok=True)
        args.rollup.expanduser().resolve().write_text(rendered + "\n", encoding="utf-8")
    print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
