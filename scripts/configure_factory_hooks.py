#!/usr/bin/env python3
"""Merge Solvys productivity and safety hooks into Codex hooks.json."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


EVENTS = ("SessionStart", "UserPromptSubmit", "PreToolUse", "PostToolUse", "Stop")


def command_entry(command: str, timeout: int, status: str) -> dict[str, Any]:
    return {
        "type": "command",
        "command": command,
        "timeout": timeout,
        "statusMessage": status,
    }


def contains_command(groups: list[Any], command: str) -> bool:
    for group in groups:
        if not isinstance(group, dict):
            continue
        for hook in group.get("hooks", []):
            if isinstance(hook, dict) and hook.get("command") == command:
                return True
    return False


def merge_hooks(payload: dict[str, Any], repo_root: Path, home: Path) -> dict[str, Any]:
    hooks = payload.setdefault("hooks", {})
    runtime = repo_root / "scripts" / "factory_productivity_hook.py"
    for event in EVENTS:
        groups = hooks.setdefault(event, [])
        command = f'python3 "{runtime}" --event {event}'
        if not contains_command(groups, command):
            group: dict[str, Any] = {
                "hooks": [command_entry(command, 5, f"Factory {event}")]
            }
            if event in {"PreToolUse", "PostToolUse"}:
                group["matcher"] = "Bash|Edit|Write|apply_patch|MCP"
            groups.append(group)

    guard = home / ".agents" / "hooks" / "deny-dangerous.sh"
    if guard.exists():
        groups = hooks.setdefault("PreToolUse", [])
        guard_command = str(guard)
        if not contains_command(groups, guard_command):
            groups.insert(
                0,
                {
                    "matcher": "Bash",
                    "hooks": [command_entry(guard_command, 5, "Safety guard")],
                },
            )
    return payload


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--hooks-file", required=True, type=Path)
    parser.add_argument("--repo-root", required=True, type=Path)
    parser.add_argument("--home", required=True, type=Path)
    args = parser.parse_args()

    hooks_file = args.hooks_file.expanduser().resolve()
    try:
        payload = json.loads(hooks_file.read_text(encoding="utf-8")) if hooks_file.exists() else {}
    except json.JSONDecodeError as exc:
        raise SystemExit(f"refusing to replace invalid hooks JSON: {exc}") from exc
    if not isinstance(payload, dict):
        raise SystemExit("hooks file root must be an object")
    updated = merge_hooks(payload, args.repo_root.expanduser().resolve(), args.home.expanduser().resolve())
    hooks_file.parent.mkdir(parents=True, exist_ok=True)
    hooks_file.write_text(json.dumps(updated, indent=2) + "\n", encoding="utf-8")
    print(f"Configured Factory hooks: {hooks_file}")
    print("Codex hook entries changed. Review and re-trust them with /hooks before relying on enforcement.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
