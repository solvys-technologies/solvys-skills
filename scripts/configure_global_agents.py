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
    directive_path = args.repo_root / "factory" / "canon" / "agency-directive.md"
    directive_lines = [
        line.strip()
        for line in directive_path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    ]
    directive = directive_lines[0]

    block = f"""{START}
# Solvys Factory entrance

For substantial Solvys or client work, read `{skill}` before planning or action.

{directive}

Before project work, require `~/.config/solvys-factory/orientation.yaml`. If it is absent, run `python3 {orientation}`, send the generated orientation handoff prompt, and wait for its acknowledgement.

Read the project Welcome Mat, assigned PL, PM, DEV, or CAO sign, project manifest, active sprint, and latest receipt. Verify repository, SHA, paths, Cloud, SSH, providers, accounts, dirty ownership, protected zones, and proof rung. Do not resume a TP-paused project task until TP gives the cue.
Read the repository's canonical `PROJECT-STATE.md` with the latest receipt before Executive Ops dispatches work or a Cloud worker mutates code. The record must match the target branch and commit and report `aligned`. A Cabinet view can link to the record. Do not maintain a second editable progress file. Create a Breakthrough record only for TP's explicit direction, clear positive feedback about the current agent result, or a confirmed merge into `main`. Negative feedback and agent self-judgment never create one.
For every frontend task, read and enforce `factory/canon/frontend-wonder-source-of-truth.md` from the installed Solvys suite. Wonder is the protected, human-editable visual source of truth. Preserve its 1:1 code mapping. Do not create a parallel UI, page, component library, or layout. When no Wonder-imported source exists, create or import it before new UI code begins.
For multi-unit implementation, read and enforce `factory/canon/structural-delivery-contract.md`. Use the Sprint Unit Assignment Ledger, Development Contract Gate Ledger, visible Cloud tasks or Codex sessions, and an integrator verifier receipt. Do not use hidden product subagents or an unsupported completion claim.
If no literal Welcome Mat exists, read the project's onboarding composite (`AGENTS.md`, `CLAUDE.md`, `README.md`, `SETUP.md`, `WORKSPACE.md`, `PRODUCT.md`, and `DESIGN.md` when present) and record that substitution instead of declaring a blocker. Keep shared Solvys skills in the installed suite or a project-local symlink; never copy or commit shared skill bodies into the product repository.
For Google Sign-In that requires a project password, open Paste, search the exact project name, open the project folder from the search suggestion, and use the matching `Primary Project Password` or `Secondary Project Password` item. Never search guessed labels such as `CRED Gmail Password`. Copy the password only into regular Chrome. Do not enter it in Chrome Dev or ask TP to type a password that Paste stores. Prefer a provider SMS/text code when available; otherwise trigger the Google Prompt Tap Yes or Tap the number fallback. After Google authentication, use the authorized target session and select Continue and Allow access when shown.
If the project manifest names Bitwarden, load `$solvys-bitwarden` and use its read-only, project-scoped policy. Prefer a Bitwarden Secrets Manager machine-account token for locked-Mac workers. Use the official `bw` fallback only with the project-isolated app-data directory and project-specific Keychain reference. Never use a shared `codex` / `bw-master` item or put secret values in prompts, receipts, logs, or source.
When any skill uses Paste MCP or opens a Paste folder or pinboard, keep the Paste app and MCP connection open through the task and handoff. Never close it, sign out, or terminate its sync process because TP relies on the iCloud sync. If the exact target is already authenticated, reuse it and do not open a new login or OAuth flow.
Apply `$communication-style-protocol` and the live denylist at `{args.repo_root / 'factory' / 'forbidden.md'}` to every message, handoff, correction, status report, and agent-authored artifact. Follow Zinsser's four principles: Simplicity, Brevity, Clarity, Humanity.
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
