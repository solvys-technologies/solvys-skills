#!/usr/bin/env python3
"""Create project-scoped Loop Engineering records from a Factory manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path


def manifest_value(text: str, key: str, default: str = "unknown") -> str:
    match = re.search(rf"(?m)^\s*{re.escape(key)}:\s*['\"]?([^\n'\"]+)", text)
    return match.group(1).strip() if match else default


def write_new(path: Path, text: str) -> None:
    if path.exists():
        raise FileExistsError(f"refusing to overwrite loop record: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.rstrip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--sprint", default="S###")
    parser.add_argument("--contract", default="unregistered")
    parser.add_argument("--mode", choices=["report-only", "assisted-repair"], default="report-only")
    args = parser.parse_args()

    manifest = args.manifest.expanduser().resolve()
    output = args.output.expanduser().resolve()
    text = manifest.read_text(encoding="utf-8")
    project = manifest_value(text, "projectId")
    display = manifest_value(text, "displayName", project)
    repository_owner = manifest_value(text, "owner")
    repository_name = manifest_value(text, "name")
    required_rung = manifest_value(text, "requiredRung")
    scope_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()

    write_new(
        output / "LOOP.md",
        f"""# {display} Sprint Loop

- Project: `{project}`
- Sprint: `{args.sprint}`
- Contract: `{args.contract}`
- Mode: `{args.mode}`
- Repository: `{repository_owner}/{repository_name}`
- Required proof rung: `{required_rung}`

## Cycle

1. Read the manifest, entrance receipt, Development Contract, and current state.
2. Run the Spec Kit to Development Contract reconciliation.
3. Inventory skills, current source, CLI, browser, provider API, and approved OSS.
4. Choose one bounded task and record the expected prevention test.
5. Execute only in the registered lane and verify before the next task.
6. Update state, run log, budget, infraction links, and proof rung.
7. Retry with a materially different safe path. Enter repair mode after the
   same failure twice. Open the circuit after the third identical failure.

Recurring runs are report-only during their first seven days. Auto-merge is
always disabled.
""",
    )
    write_new(
        output / "STATE.md",
        f"""# Current Loop State

- Project: `{project}`
- Sprint: `{args.sprint}`
- Phase: `PL0`
- Status: `ready-for-contract-check`
- Scope hash: `{scope_hash}`
- Distinct safe paths tried: `0/3`
- Circuit: `closed`
- Human gate: `none`
- Proof reached: `none`
- Next action: validate the entrance and Development Contract
""",
    )
    write_new(
        output / "loop-budget.md",
        """# Loop Budget

- Max tokens per day: 100000
- Maximum distinct safe paths: 3
- Repair threshold: same normalized failure twice
- Circuit threshold: same normalized failure three times
- Global Symphony concurrency: 3
- Per-project Symphony concurrency: 1
- Auto-merge: false
- Recurring loop mode for first seven days: report-only
- Kill switch: open the circuit and stop dispatch when the cap is exhausted
""",
    )
    write_new(
        output / "loop-run-log.md",
        """# Loop Run Log

Append one row per run. Keep secret values and full user quotations out.

| Started | Run ID | Contract revision | Path | Result | Proof | Next action |
| --- | --- | --- | --- | --- | --- | --- |
""",
    )
    write_new(
        output / "gate.yaml",
        """version: 1
denylist:
  - ".env"
  - ".env.*"
  - "**/secrets/**"
  - "**/*_key*"
  - "**/*credentials*"
maxFiles: 25
autoMergeAllowlist: []
""",
    )
    state = {
        "version": 1,
        "runId": f"{args.sprint}-{project}",
        "projectId": project,
        "sprintId": args.sprint,
        "phase": "PL0",
        "sourceRef": None,
        "scopeHash": scope_hash,
        "allowedSurfaces": [],
        "allowedPaths": [],
        "blockers": [],
        "exploredPaths": [],
        "skillInventory": [],
        "proof": [],
        "humanGate": None,
        "correctionLatch": {"active": False, "mechanism": None, "preventionTestPassed": False},
        "circuit": {"state": "closed", "reason": None},
    }
    write_new(output / "run-ledger.json", json.dumps(state, indent=2, sort_keys=True))
    policy = {
        "version": 1,
        "mode": args.mode,
        "maxDistinctPaths": 3,
        "repeatRepairThreshold": 2,
        "repeatCircuitThreshold": 3,
        "budget": {"globalConcurrency": 3, "projectConcurrency": 1},
        "autoMerge": False,
    }
    write_new(output / "loop-policy.json", json.dumps(policy, indent=2, sort_keys=True))
    print(json.dumps({"projectId": project, "output": str(output), "scopeHash": scope_hash}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
