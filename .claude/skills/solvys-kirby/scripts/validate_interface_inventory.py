#!/usr/bin/env python3
"""Validate the structural contract for a Solvys Kirby report package."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


REQUIRED_FILES = (
    "INTERFACE_INVENTORY.md",
    "NAVIGATION_MAP.md",
    "DESIGN_TOKENS.md",
    "COMPONENT_INVENTORY.md",
    "LAYOUT_ARCHITECTURE.md",
    "INTERACTION_PATTERNS.md",
    "PL0_ACCEPTANCE.md",
    "EVIDENCE_LEDGER.ndjson",
    "board/WONDER_BOARD.md",
)

REQUIRED_DIRECTORIES = (
    "evidence/screens",
    "evidence/flows",
)

REQUIRED_MARKERS = {
    "INTERFACE_INVENTORY.md": (
        "benchmark",
        "evidence",
        "coverage",
        "supporting intelligence",
    ),
    "DESIGN_TOKENS.md": (
        "color",
        "typography",
        "spacing",
        "breakpoint",
        "motion",
        "asset",
    ),
    "COMPONENT_INVENTORY.md": (
        "anatomy",
        "variant",
        "state",
        "responsive",
        "interaction",
        "accessibility",
        "approved",
    ),
    "LAYOUT_ARCHITECTURE.md": ("grid", "container", "scroll", "responsive"),
    "INTERACTION_PATTERNS.md": (
        "state matrix",
        "keyboard",
        "gesture",
        "motion",
        "accessibility",
        "reduced-motion",
    ),
    "PL0_ACCEPTANCE.md": ("status", "accepted contract", "approved library"),
    "board/WONDER_BOARD.md": ("wonder", "category"),
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate(root: Path, require_accepted: bool) -> list[str]:
    errors: list[str] = []
    contents: dict[str, str] = {}

    for relative in REQUIRED_DIRECTORIES:
        path = root / relative
        if not path.is_dir():
            errors.append(f"missing required directory: {relative}")
        elif not any(path.iterdir()):
            errors.append(f"empty required directory: {relative}")

    for relative in REQUIRED_FILES:
        path = root / relative
        if not path.is_file():
            errors.append(f"missing required file: {relative}")
            continue
        text = read_text(path)
        contents[relative] = text
        if not text.strip():
            errors.append(f"empty required file: {relative}")

    for relative, markers in REQUIRED_MARKERS.items():
        text = contents.get(relative, "").lower()
        for marker in markers:
            if marker.lower() not in text:
                errors.append(f"{relative} is missing required marker: {marker}")

    navigation = contents.get("NAVIGATION_MAP.md", "")
    if not re.search(r"```mermaid\s+", navigation, flags=re.IGNORECASE):
        errors.append("NAVIGATION_MAP.md must contain a Mermaid code block")

    evidence_path = root / "EVIDENCE_LEDGER.ndjson"
    evidence_records = 0
    if evidence_path.is_file():
        for line_number, line in enumerate(evidence_path.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            evidence_records += 1
            try:
                record = json.loads(line)
            except json.JSONDecodeError as exc:
                errors.append(f"EVIDENCE_LEDGER.ndjson line {line_number} is not JSON: {exc.msg}")
                continue
            for key in (
                "capture_id",
                "kind",
                "source",
                "viewport",
                "state",
                "action",
                "artifact",
                "observed_at",
                "status",
            ):
                if key not in record:
                    errors.append(f"EVIDENCE_LEDGER.ndjson line {line_number} is missing key: {key}")
            artifact = record.get("artifact")
            if isinstance(artifact, str) and artifact and not artifact.startswith(("http://", "https://")):
                if not (root / artifact).is_file():
                    errors.append(
                        f"EVIDENCE_LEDGER.ndjson line {line_number} points to missing artifact: {artifact}"
                    )

    if evidence_records == 0:
        errors.append("EVIDENCE_LEDGER.ndjson must contain at least one evidence record")

    pl0 = contents.get("PL0_ACCEPTANCE.md", "")
    status_match = re.search(r"^\s*status\s*:\s*(\w+)", pl0, flags=re.IGNORECASE | re.MULTILINE)
    if not status_match:
        errors.append("PL0_ACCEPTANCE.md must declare Status")
    elif require_accepted and status_match.group(1).upper() != "ACCEPTED":
        errors.append(
            "PL0_ACCEPTANCE.md is not accepted; prototype work requires Status: ACCEPTED"
        )

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path, help="Interface Inventory report root")
    parser.add_argument(
        "--require-accepted",
        action="store_true",
        help="Require PL0_ACCEPTANCE.md to declare Status: ACCEPTED",
    )
    args = parser.parse_args()

    errors = validate(args.root, args.require_accepted)
    if errors:
        print(f"FAIL: {len(errors)} Interface Inventory contract issue(s)")
        for error in errors:
            print(f"- {error}")
        return 1

    mode = "accepted PL0" if args.require_accepted else "structural"
    print(f"PASS: Interface Inventory package passed {mode} validation")
    return 0


if __name__ == "__main__":
    sys.exit(main())
