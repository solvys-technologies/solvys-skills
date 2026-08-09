#!/usr/bin/env python3
"""Record or increment one Solvys Factory infraction without losing evidence."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import tempfile
from datetime import datetime, timezone
from pathlib import Path


CATEGORIES = (
    "automation-death-loop",
    "auth",
    "handoff",
    "proof",
    "provider",
    "storage",
    "scope",
    "communication",
    "security",
    "other",
)
SEVERITIES = ("low", "medium", "high", "critical")
STATUSES = ("open", "in-progress", "resolved", "accepted-risk")
SEVERITY_RANK = {value: index for index, value in enumerate(SEVERITIES)}
PROJECT_ID = re.compile(r"^[a-z0-9][a-z0-9._-]*$")


def now_utc() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def normalize(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def default_ledger(project_id: str) -> Path:
    factory_home = Path(os.environ.get("SOLVYS_FACTORY_HOME", "~/.config/solvys-factory")).expanduser()
    return factory_home / "projects" / project_id / "infraction-ledger.json"


def atomic_write(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2, sort_keys=False)
            handle.write("\n")
        os.replace(temporary, path)
    except Exception:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def load_ledger(path: Path, project_id: str) -> dict:
    if not path.exists():
        return {"version": 1, "projectId": project_id, "updatedAt": None, "entries": []}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"cannot read infraction ledger {path}: {exc}") from exc
    if payload.get("version") != 1:
        raise SystemExit(f"unsupported infraction ledger version in {path}")
    existing_project = payload.get("projectId")
    if existing_project not in (None, "replace-me", project_id):
        raise SystemExit(f"ledger projectId {existing_project!r} does not match {project_id!r}")
    if not isinstance(payload.get("entries"), list):
        raise SystemExit(f"ledger entries must be a list in {path}")
    payload["projectId"] = project_id
    return payload


def next_entry_id(entries: list[dict]) -> str:
    numbers = []
    for entry in entries:
        match = re.fullmatch(r"INF-(\d+)", str(entry.get("id", "")))
        if match:
            numbers.append(int(match.group(1)))
    return f"INF-{(max(numbers, default=0) + 1):03d}"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project-id", required=True, help="Factory project slug; use unassigned when unknown")
    parser.add_argument("--ledger", type=Path, help="Project Cabinet ledger path; defaults to local Factory custody")
    parser.add_argument("--title", required=True, help="Short mechanism name")
    parser.add_argument("--description", required=True, help="Concrete observed mechanism and impact")
    parser.add_argument("--category", choices=CATEGORIES, required=True)
    parser.add_argument("--severity", choices=SEVERITIES, default="medium")
    parser.add_argument("--status", choices=STATUSES, default="open")
    parser.add_argument("--owner", default="CAO")
    parser.add_argument("--next-action", default="Review in the next daily infraction sweep")
    parser.add_argument("--source-type", default="task", help="task, automation, review, or user")
    parser.add_argument("--source-id", default="unknown")
    parser.add_argument("--evidence", action="append", default=[], help="Evidence path or identifier; repeatable")
    parser.add_argument("--fingerprint", help="Stable dedup key; defaults to normalized category and title")
    parser.add_argument("--timestamp", help="UTC timestamp for deterministic tests or imported evidence")
    parser.add_argument("--death-loop", action="store_true", help="Mark a repeated/no-progress cycle")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if not PROJECT_ID.fullmatch(args.project_id):
        raise SystemExit("project-id must be a lowercase Factory slug")
    timestamp = args.timestamp or now_utc()
    ledger_path = (args.ledger or default_ledger(args.project_id)).expanduser().resolve()
    payload = load_ledger(ledger_path, args.project_id)
    fingerprint = args.fingerprint or hashlib.sha256(
        f"{normalize(args.category)}::{normalize(args.title)}".encode("utf-8")
    ).hexdigest()[:16]
    entries: list[dict] = payload["entries"]
    entry = next((candidate for candidate in entries if candidate.get("fingerprint") == fingerprint), None)
    deduplicated = entry is not None

    if entry is None:
        entry = {
            "id": next_entry_id(entries),
            "fingerprint": fingerprint,
            "title": args.title.strip(),
            "category": args.category,
            "severity": args.severity,
            "count": 0,
            "status": args.status,
            "deathLoop": args.death_loop,
            "firstSeenAt": timestamp,
            "lastSeenAt": timestamp,
            "owner": args.owner,
            "nextAction": args.next_action,
            "resolution": None,
            "events": [],
        }
        entries.append(entry)

    entry["count"] = int(entry.get("count", 0)) + 1
    entry["lastSeenAt"] = timestamp
    entry["status"] = args.status if args.status != "resolved" else "open"
    entry["severity"] = max(
        (entry.get("severity", "medium"), args.severity),
        key=lambda value: SEVERITY_RANK[value],
    )
    entry["deathLoop"] = bool(entry.get("deathLoop", False) or args.death_loop)
    entry["owner"] = args.owner
    entry["nextAction"] = args.next_action
    entry["resolution"] = None
    event_number = len(entry["events"]) + 1
    entry["events"].append(
        {
            "eventId": f"{entry['id']}-E{event_number:03d}",
            "occurredAt": timestamp,
            "sourceType": args.source_type,
            "sourceId": args.source_id,
            "description": args.description.strip(),
            "evidence": args.evidence,
        }
    )
    payload["updatedAt"] = timestamp
    atomic_write(ledger_path, payload)
    print(
        json.dumps(
            {
                "ledger": str(ledger_path),
                "projectId": args.project_id,
                "entryId": entry["id"],
                "fingerprint": fingerprint,
                "count": entry["count"],
                "status": entry["status"],
                "deathLoop": entry["deathLoop"],
                "deduplicated": deduplicated,
            },
            sort_keys=True,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
