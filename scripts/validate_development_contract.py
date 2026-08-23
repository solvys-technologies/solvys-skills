#!/usr/bin/env python3
"""Validate one Solvys Development Contract before implementation."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


MATURITIES = {"micro", "spec-first", "spec-anchored", "spec-as-source"}
IMPLEMENTATION_STATUSES = {"approved", "implemented", "verified"}
PROOF_RUNGS = {
    "source",
    "static checks",
    "tests",
    "runtime",
    "provider",
    "deployed",
    "installed",
    "human accepted",
}
REQUIRED_METADATA = (
    "Contract ID",
    "Project",
    "Maturity",
    "Status",
    "Revision",
    "Owner",
    "Decision owner",
    "Repository",
    "Base ref",
    "Base SHA",
    "Dirty-state owner",
    "Required proof rung",
)
REQUIRED_HEADINGS = (
    "## SPEC - Functional contract",
    "### Objective",
    "### Users and outcomes",
    "### In scope",
    "### Out of scope",
    "### Assumptions",
    "### Functional requirements",
    "### Acceptance scenarios",
    "### Edge and failure cases",
    "### Open questions",
    "## PLAN - Technical contract",
    "### Current source and accepted patterns",
    "### Architecture and contracts",
    "### Exact commands",
    "### Testing and proof",
    "### Security, performance, and observability",
    "### Boundaries",
    "### Risks and rollback",
    "## TASKS - Ordered execution",
    "## Change log",
)
TASK_FIELDS = ("Size", "Owner", "Dependencies", "Files", "Acceptance", "Verify", "Checkpoint")
PLACEHOLDER = re.compile(r"<[^>\n]+>|\bS###\b")


def clean(value: str) -> str:
    return value.strip().strip("`").strip()


def metadata(text: str) -> dict[str, str]:
    header = text.split("## SPEC - Functional contract", 1)[0]
    values: dict[str, str] = {}
    for line in header.splitlines():
        match = re.match(r"^([A-Za-z][A-Za-z -]+):\s*(.+?)\s*$", line)
        if match:
            values[match.group(1)] = clean(match.group(2))
    return values


def section(text: str, heading: str, level: int) -> str:
    match = re.search(rf"^{re.escape(heading)}\s*$", text, re.MULTILINE)
    if not match:
        return ""
    tail = text[match.end() :]
    next_heading = re.search(rf"^#{{1,{level}}}\s+", tail, re.MULTILINE)
    return tail[: next_heading.start()] if next_heading else tail


def blocks(text: str, pattern: re.Pattern[str], end_heading: str | None = None) -> list[tuple[str, str]]:
    matches = list(pattern.finditer(text))
    found: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        if end_heading:
            stop = text.find(end_heading, match.end(), end)
            if stop != -1:
                end = stop
        found.append((match.group(1), text[match.end() : end]))
    return found


def validate_contract(path: Path, *, implementation: bool = False, template: bool = False) -> dict:
    resolved = path.expanduser().resolve()
    errors: list[str] = []
    try:
        text = resolved.read_text(encoding="utf-8")
    except OSError as exc:
        return {
            "contract": str(resolved),
            "valid": False,
            "implementation": implementation,
            "template": template,
            "errors": [f"cannot read contract: {exc}"],
            "acceptanceScenarioCount": 0,
            "taskCount": 0,
            "implementationAllowed": False,
        }

    if not re.search(r"^# Development Contract:\s+.+$", text, re.MULTILINE):
        errors.append("missing Development Contract title")
    for heading in REQUIRED_HEADINGS:
        if not re.search(rf"^{re.escape(heading)}\s*$", text, re.MULTILINE):
            errors.append(f"missing heading: {heading}")

    values = metadata(text)
    for field in REQUIRED_METADATA:
        if field not in values:
            errors.append(f"missing metadata: {field}")

    acceptance_pattern = re.compile(r"^####\s+(AC-[0-9]+)\s+-\s+.+$", re.MULTILINE)
    acceptance_blocks = blocks(text, acceptance_pattern)
    if not acceptance_blocks:
        errors.append("at least one acceptance scenario is required")
    for acceptance_id, body in acceptance_blocks:
        for keyword in ("Given", "When", "Then"):
            if not re.search(rf"^{keyword}\s+\S.+$", body, re.MULTILINE):
                errors.append(f"{acceptance_id} is missing {keyword}")

    task_pattern = re.compile(r"^###\s+(T[0-9]+)\s+-\s+.+$", re.MULTILINE)
    task_section = section(text, "## TASKS - Ordered execution", 2)
    task_blocks = blocks(task_section, task_pattern)
    if not task_blocks:
        errors.append("at least one ordered task is required")
    known_acceptance = {item[0] for item in acceptance_blocks}
    for task_id, body in task_blocks:
        fields: dict[str, str] = {}
        for line in body.splitlines():
            match = re.match(r"^- ([A-Za-z]+):\s*(.+?)\s*$", line)
            if match:
                fields[match.group(1)] = clean(match.group(2))
        for field in TASK_FIELDS:
            if field not in fields:
                errors.append(f"{task_id} is missing field: {field}")
        size = fields.get("Size")
        if size and not template and size not in {"S", "M"}:
            errors.append(f"{task_id} size must be S or M")
        acceptance = fields.get("Acceptance", "")
        references = set(re.findall(r"AC-[0-9]+", acceptance))
        if not template and (not references or not references.issubset(known_acceptance)):
            errors.append(f"{task_id} must reference a defined acceptance scenario")

    boundaries = section(text, "### Boundaries", 3)
    for label in ("Always", "Ask first", "Never"):
        if not re.search(rf"^- {re.escape(label)}:\s+.+$", boundaries, re.MULTILINE):
            errors.append(f"Boundaries is missing: {label}")

    commands = section(text, "### Exact commands", 3)
    for label in ("Focused test", "Full validation", "Build", "Runtime or Site"):
        if not re.search(rf"^- {re.escape(label)}:\s+.+$", commands, re.MULTILINE):
            errors.append(f"Exact commands is missing: {label}")

    if not template:
        maturity = values.get("Maturity", "")
        status = values.get("Status", "")
        if maturity not in MATURITIES:
            errors.append(f"invalid maturity: {maturity!r}")
        if status not in {"draft", *IMPLEMENTATION_STATUSES}:
            errors.append(f"invalid status: {status!r}")
        revision = values.get("Revision", "")
        if not revision.isdigit() or int(revision) < 1:
            errors.append("Revision must be a positive integer")
        proof_rung = values.get("Required proof rung", "")
        if proof_rung not in PROOF_RUNGS:
            errors.append(f"invalid proof rung: {proof_rung!r}")

    if implementation:
        if PLACEHOLDER.search(text):
            errors.append("implementation contract contains unresolved placeholders")
        if not re.fullmatch(r"S[0-9]{3,}", values.get("Contract ID", "")):
            errors.append("Contract ID must use S### format")
        if values.get("Status") not in IMPLEMENTATION_STATUSES:
            errors.append("Status must be approved before implementation")
        if not re.fullmatch(r"[0-9a-f]{40}", values.get("Base SHA", "")):
            errors.append("Base SHA must be an exact lowercase 40-character SHA")
        for field in ("Project", "Owner", "Decision owner", "Repository", "Base ref", "Dirty-state owner"):
            value = values.get(field, "")
            if not value or PLACEHOLDER.search(value):
                errors.append(f"implementation metadata is unresolved: {field}")
        open_questions = clean(section(text, "### Open questions", 3)).lower()
        if open_questions not in {"none", "- none"}:
            errors.append("Open questions must be None before implementation")

    valid = not errors
    return {
        "contract": str(resolved),
        "valid": valid,
        "implementation": implementation,
        "template": template,
        "metadata": values,
        "errors": errors,
        "acceptanceScenarioCount": len(acceptance_blocks),
        "taskCount": len(task_blocks),
        "implementationAllowed": implementation and valid,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--contract", type=Path, required=True)
    parser.add_argument("--implementation", action="store_true", help="Require an approved and fully resolved contract")
    parser.add_argument("--template", action="store_true", help="Validate the bundled placeholder template")
    args = parser.parse_args()
    if args.implementation and args.template:
        raise SystemExit("--implementation and --template cannot be combined")
    result = validate_contract(args.contract, implementation=args.implementation, template=args.template)
    print(json.dumps(result, indent=2, sort_keys=False))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
