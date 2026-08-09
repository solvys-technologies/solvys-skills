#!/usr/bin/env python3
"""Install or refresh the bounded Solvys Factory block in global AGENTS.md."""

from __future__ import annotations

import argparse
from pathlib import Path


START = "<!-- SOLVYS_FACTORY_BEGIN -->"
END = "<!-- SOLVYS_FACTORY_END -->"
FIRST_LINE = "Read the project Welcome Mat and read your assigned PL, PM, DEV, or CAO lane sign before any other action."


def remove_block(text: str, start: str, end: str) -> str:
    if start not in text or end not in text:
        return text
    before = text.split(start, 1)[0].rstrip()
    after = text.split(end, 1)[1].lstrip()
    return f"{before}\n\n{after}".strip()


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
If no literal Welcome Mat exists, read the project's onboarding composite (`AGENTS.md`, `CLAUDE.md`, `README.md`, `SETUP.md`, `WORKSPACE.md`, `PRODUCT.md`, and `DESIGN.md` when present) and record that substitution instead of declaring a blocker. Keep shared Solvys skills in the installed suite or a project-local symlink; never copy or commit shared skill bodies into the product repository.
For Google Sign-In that requires a project password, retrieve the password from the project-specific Paste folder and use regular Chrome. Do not enter the password in Chrome Dev or ask TP to type a password that Paste stores. Prefer a provider SMS/text code when available; otherwise trigger the Google Prompt Tap Yes or Tap the number fallback. After Google authentication, use the authorized target session and select Continue and Allow access when shown.
When any skill uses Paste MCP or opens a Paste folder or pinboard, keep the Paste app and MCP connection open through the task and handoff. Never close it, sign out, or terminate its sync process because TP relies on the iCloud sync. If the exact target is already authenticated, reuse it and do not open a new login or OAuth flow.
{END}"""

    current = args.agents_file.read_text(encoding="utf-8") if args.agents_file.exists() else ""
    if current.startswith(FIRST_LINE):
        current = current[len(FIRST_LINE):].lstrip("\n")
    current = remove_block(current, START, END)
    if current:
        updated_body = f"{block}\n\n{current}"
    else:
        updated_body = block
    updated = f"{FIRST_LINE}\n\n{updated_body}".rstrip() + "\n"

    args.agents_file.parent.mkdir(parents=True, exist_ok=True)
    args.agents_file.write_text(updated, encoding="utf-8")
    print(f"Configured Factory block: {args.agents_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
