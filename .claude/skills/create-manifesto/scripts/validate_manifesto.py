#!/usr/bin/env python3
"""Check a project manifesto has the required agent-ergonomic headings in order."""

from __future__ import annotations

import sys
from pathlib import Path

REQUIRED_HEADINGS = (
    "The job",
    "Who pays",
    "Priority stack",
    "Real-world done",
    "Customer intuition",
    "Out of scope",
    "Milestones",
    "Access",
    "Deployment",
    "Unattended work",
    "Consult, plan, craft",
    "Stop",
    "Names",
    "Proof that counts",
)


def heading_titles(text: str) -> list[str]:
    titles: list[str] = []
    for line in text.splitlines():
        if line.startswith("## "):
            titles.append(line[3:].strip())
    return titles


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    if "---" in text.splitlines()[0:1]:
        errors.append(f"{path}: manifesto body must not start as skill frontmatter")
    if not text.startswith("# "):
        errors.append(f"{path}: missing top-level title")
    titles = heading_titles(text)
    required = list(REQUIRED_HEADINGS)
    found = [title for title in titles if title in required]
    if found != required:
        errors.append(
            f"{path}: required headings out of order or missing. "
            f"found={found!r} required={required!r}"
        )
    lowered = text.lower()
    if "p0" not in lowered:
        errors.append(f"{path}: P0 is missing from the priority stack")
    if "2 hours" not in lowered and "2-hour" not in lowered:
        errors.append(f"{path}: 2 hour unattended limit is missing")
    if "service account" not in lowered:
        errors.append(f"{path}: service accounts are missing from Access")
    return errors


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: validate_manifesto.py <MANIFESTO.md> [more.md]", file=sys.stderr)
        return 2
    errors: list[str] = []
    for raw in argv[1:]:
        path = Path(raw)
        if not path.is_file():
            errors.append(f"{path}: file not found")
            continue
        errors.extend(validate(path))
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Manifesto headings valid for {len(argv) - 1} file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
