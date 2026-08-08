#!/usr/bin/env python3
"""Install or refresh the bounded Solvys Factory block in global AGENTS.md."""

from __future__ import annotations

import argparse
from pathlib import Path


START = "<!-- SOLVYS_FACTORY_BEGIN -->"
END = "<!-- SOLVYS_FACTORY_END -->"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--agents-file", required=True, type=Path)
    parser.add_argument("--repo-root", required=True, type=Path)
    args = parser.parse_args()

    skill = args.repo_root / ".claude" / "skills" / "solvys-factory" / "SKILL.md"
    orientation = args.repo_root / ".claude" / "skills" / "solvys-factory" / "scripts" / "orient.py"

    block = f"""{START}
# Solvys Factory entrance

For substantial Solvys or client work, read `{skill}` before planning or action.

Before project work, require `~/.config/solvys-factory/orientation.yaml`. If it is absent, run `python3 {orientation}`, send the generated orientation handoff prompt, and wait for its acknowledgement.

Read the project Welcome Mat, assigned PL, PM, DEV, or CAO sign, project manifest, active sprint, and latest receipt. Verify repository, SHA, paths, Cloud, SSH, providers, accounts, dirty ownership, protected zones, and proof rung. Do not resume a TP-paused project task until TP gives the cue.
{END}"""

    current = args.agents_file.read_text(encoding="utf-8") if args.agents_file.exists() else ""
    if START in current and END in current:
        before = current.split(START, 1)[0].rstrip()
        after = current.split(END, 1)[1].lstrip()
        updated = f"{before}\n\n{block}\n\n{after}".rstrip() + "\n"
    else:
        updated = current.rstrip() + ("\n\n" if current.strip() else "") + block + "\n"

    args.agents_file.parent.mkdir(parents=True, exist_ok=True)
    args.agents_file.write_text(updated, encoding="utf-8")
    print(f"Configured Factory block: {args.agents_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
