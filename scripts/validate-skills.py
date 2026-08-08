#!/usr/bin/env python3
"""Run a dependency-free structural check when Codex skill-creator is absent."""

from __future__ import annotations

import re
import sys
from pathlib import Path


NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0] != "---":
        raise ValueError("missing opening frontmatter delimiter")
    try:
        end = lines.index("---", 1)
    except ValueError as exc:
        raise ValueError("missing closing frontmatter delimiter") from exc

    values: dict[str, str] = {}
    for line in lines[1:end]:
        if not line or line[0].isspace() or ":" not in line:
            continue
        key, value = line.split(":", 1)
        values[key.strip()] = value.strip().strip('"\'')
    return values


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    errors: list[str] = []
    skill_files = sorted((repo_root / ".claude" / "skills").glob("*/SKILL.md"))
    if not skill_files:
        errors.append("no packaged skills found")

    for skill_file in skill_files:
        try:
            values = frontmatter(skill_file)
        except ValueError as exc:
            errors.append(f"{skill_file}: {exc}")
            continue
        name = values.get("name", "")
        description = values.get("description", "")
        if not NAME_RE.fullmatch(name) or len(name) > 64:
            errors.append(f"{skill_file}: invalid skill name {name!r}")
        if not description or len(description) > 1024 or "<" in description or ">" in description:
            errors.append(f"{skill_file}: invalid description")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Fallback skill validation passed for {len(skill_files)} skills.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

