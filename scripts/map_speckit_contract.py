#!/usr/bin/env python3
"""Map Spec Kit artifacts into one Solvys Development Contract authority."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def read_required(path: Path) -> str:
    if not path.exists():
        raise ValueError(f"missing Spec Kit artifact: {path.name}")
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        raise ValueError(f"empty Spec Kit artifact: {path.name}")
    return text


def validate_inputs(spec: str, plan: str, tasks: str) -> list[str]:
    errors: list[str] = []
    for marker in ("Given", "When", "Then"):
        if not re.search(rf"(?mi)^\s*{marker}\b", spec):
            errors.append(f"spec is missing {marker} acceptance text")
    if re.search(r"(?i)\b(TODO|TBD|FIXME|OPEN QUESTION)\b|\?\?", "\n".join((spec, plan, tasks))):
        errors.append("Spec Kit artifacts contain unresolved questions or placeholders")
    if not re.search(r"(?mi)^#{2,4}\s+(T\d+|Task\s+\d+)", tasks):
        errors.append("tasks artifact has no ordered task headings")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--feature-dir", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--contract-id", default="S###")
    parser.add_argument("--project", required=True)
    parser.add_argument("--repository", required=True)
    parser.add_argument("--base-ref", required=True)
    parser.add_argument("--base-sha", required=True)
    parser.add_argument("--revision", type=int, default=1)
    args = parser.parse_args()

    feature = args.feature_dir.expanduser().resolve()
    output = args.output.expanduser().resolve()
    try:
        spec = read_required(feature / "spec.md")
        plan = read_required(feature / "plan.md")
        tasks = read_required(feature / "tasks.md")
    except ValueError as exc:
        print(json.dumps({"valid": False, "errors": [str(exc)]}, indent=2))
        return 1
    errors = validate_inputs(spec, plan, tasks)
    if errors:
        print(json.dumps({"valid": False, "errors": errors}, indent=2))
        return 1

    scenario = {}
    for marker in ("Given", "When", "Then"):
        match = re.search(rf"(?mi)^\s*{marker}\s+(.+)$", spec)
        scenario[marker] = match.group(1).strip() if match else "the approved artifact is present"
    mapped_tasks = re.sub(
        r"(?mi)^- Acceptance:\s*.*$",
        "- Acceptance: `AC-1`",
        tasks,
    )
    mapped_plan = re.sub(r"(?m)^###\s+", "#### ", plan)

    contract = f"""# Development Contract: {args.project}

Contract ID: `{args.contract_id}`
Project: `{args.project}`
Maturity: `spec-anchored`
Status: `approved`
Revision: `{args.revision}`
Owner: `{args.contract_id} integrator`
Decision owner: `TP`
Repository: `{args.repository}`
Base ref: `{args.base_ref}`
Base SHA: `{args.base_sha}`
Dirty-state owner: `recorded in the Factory entrance receipt`
Required proof rung: `tests`

## SPEC - Functional contract

### Objective

Implement the approved Spec Kit feature through one Solvys authority.

### Users and outcomes

- The user receives the behavior and proof defined in the source specification.
- The implementation owner receives current scope, plan, and ordered tasks.

### In scope

{spec}

### Out of scope

- Work outside the source specification and approved task list.
- A second implementation authority.

### Assumptions

- The Factory entrance verified the supplied repository, base ref, and SHA.
- The source Spec Kit artifacts are anchored documentation.

### Functional requirements

- FR-1: Implement the behavior in the source specification.
- FR-2: Follow the mapped technical plan and ordered tasks.
- FR-3: Keep proof rungs separate and preserve protected state.

### Acceptance scenarios

#### AC-1 - Satisfy the source specification

Given {scenario['Given']}
When {scenario['When']}
Then {scenario['Then']}

### Edge and failure cases

- A changed requirement increments this contract before work resumes.
- A failed task check blocks the next task.

### Open questions

None

## PLAN - Technical contract

### Current source and accepted patterns

{mapped_plan}

### Architecture and contracts

- The Spec Kit artifacts generate this contract. This contract authorizes implementation.

### Exact commands

- Focused test: `run the focused command declared in the mapped plan`
- Full validation: `run the repository validation declared in the mapped plan`
- Build: `run the build command declared in the mapped plan`
- Runtime or Site: `run the highest applicable runtime or Site proof; otherwise Not applicable`

### Testing and proof

- Run each task's exact verification before the next task.

### Security, performance, and observability

- Preserve project security, performance budgets, logs, and secret boundaries.

### Boundaries

- Always: preserve recorded dirty work, protected zones, and proof-rung truth.
- Ask first: cost, rights, secrets, destructive actions, merge, and deploy.
- Never: create a second implementation authority or bypass the entrance.

### Risks and rollback

- Stop on unexpected failure, preserve evidence, repair the shared cause, and verify.
- Roll back only task-owned changes while preserving unrelated state.

## TASKS - Ordered execution

{mapped_tasks}

## Change log

- Revision {args.revision}: mapped from Spec Kit artifacts; the Solvys Development Contract is the implementation authority.
"""
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(contract.rstrip() + "\n", encoding="utf-8")
    mapping = {
        "version": 1,
        "sources": {
            "spec": str(feature / "spec.md"),
            "plan": str(feature / "plan.md"),
            "tasks": str(feature / "tasks.md"),
        },
        "target": str(output),
        "authority": "solvys-development-contract",
        "phaseMap": {
            "PL0": ["constitution", "specify", "clarify", "Given/When/Then"],
            "PL1": ["research", "approved precedent", "OSS", "constraints"],
            "PL2": ["plan", "tasks", "ownership", "proof"],
            "PL3": ["backend execution", "failure", "rollback"],
            "PL4": ["interface integration", "Site proof"],
            "PL5": ["analyze", "drift", "handoff"],
        },
    }
    mapping_path = output.with_suffix(output.suffix + ".map.json")
    mapping_path.write_text(json.dumps(mapping, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"valid": True, "contract": str(output), "mapping": str(mapping_path)}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
