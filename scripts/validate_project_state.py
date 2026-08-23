#!/usr/bin/env python3
"""Validate a shared Factory PROJECT-STATE.md record."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED_METADATA = (
    "version",
    "projectId",
    "stateRevision",
    "activeSprint",
    "sourceRef",
    "sourceCommit",
    "authorityEnvironment",
    "syncStatus",
    "lastVerifiedAt",
    "latestReceipt",
)
REQUIRED_SECTIONS = (
    "# Project state",
    "## Current intent",
    "## Current truth",
    "## Protected zones",
    "## Open gates",
    "## Next safe action",
    "## Breakthrough log",
)
SYNC_STATES = {"aligned", "stale", "blocked", "unverified"}


def parse_frontmatter(text: str) -> dict[str, str]:
    lines = text.splitlines()
    if not lines or lines[0] != "---":
        raise ValueError("missing opening frontmatter")
    try:
        end = lines.index("---", 1)
    except ValueError as exc:
        raise ValueError("missing closing frontmatter") from exc
    metadata: dict[str, str] = {}
    for line in lines[1:end]:
        if not line or line.lstrip().startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip("\"'")
    return metadata


def validate_state(
    state_path: Path,
    *,
    project_id: str | None = None,
    expected_ref: str | None = None,
    expected_commit: str | None = None,
    require_aligned: bool = False,
    template: bool = False,
) -> dict:
    path = state_path.expanduser().resolve()
    errors: list[str] = []
    try:
        text = path.read_text(encoding="utf-8")
        metadata = parse_frontmatter(text)
    except (OSError, ValueError) as exc:
        return {"state": str(path), "valid": False, "errors": [str(exc)], "metadata": {}}

    for key in REQUIRED_METADATA:
        if metadata.get(key) in (None, "") or (not template and metadata.get(key) == "replace-me"):
            errors.append(f"missing state metadata: {key}")
    for heading in REQUIRED_SECTIONS:
        if heading not in text:
            errors.append(f"missing state section: {heading}")
    if metadata.get("syncStatus") not in SYNC_STATES:
        errors.append("syncStatus is invalid")
    if project_id and metadata.get("projectId") != project_id:
        errors.append("projectId does not match")
    if expected_ref and metadata.get("sourceRef") != expected_ref:
        errors.append("sourceRef does not match")
    if expected_commit and metadata.get("sourceCommit") != expected_commit:
        errors.append("sourceCommit does not match")
    if require_aligned and metadata.get("syncStatus") != "aligned":
        errors.append("syncStatus must be aligned")
    return {"state": str(path), "valid": not errors, "errors": errors, "metadata": metadata}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--state", type=Path, required=True)
    parser.add_argument("--project-id")
    parser.add_argument("--expected-ref")
    parser.add_argument("--expected-commit")
    parser.add_argument("--require-aligned", action="store_true")
    parser.add_argument("--template", action="store_true")
    args = parser.parse_args()
    result = validate_state(
        args.state,
        project_id=args.project_id,
        expected_ref=args.expected_ref,
        expected_commit=args.expected_commit,
        require_aligned=args.require_aligned,
        template=args.template,
    )
    print(json.dumps(result, indent=2))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
