#!/usr/bin/env python3
"""Create the mandatory, secret-free Solvys Factory orientation receipt."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path


REQUIRED_TOOLS = ["git", "gh", "ssh", "codex", "node", "npm"]
OPTIONAL_PROVIDER_TOOLS = ["vercel", "wrangler", "fly", "supabase", "docker"]
MAC_APPS = {
    "Codex desktop": ["Codex.app", "ChatGPT.app"],
    "Google Chrome": ["Google Chrome.app"],
    "Paste": ["Paste.app"],
}


def ask(label: str, required: bool = False, default: str = "") -> str:
    while True:
        suffix = f" [{default}]" if default else ""
        value = input(f"{label}{suffix}: ").strip()
        if value:
            return value
        if default:
            return default
        if not required:
            return "not provided"
        print("This answer is required for Factory orientation.")


def app_present(app_names: list[str]) -> bool:
    return any(
        path.exists()
        for app_name in app_names
        for path in [Path("/Applications") / app_name, Path.home() / "Applications" / app_name]
    )


def render(template: str, values: dict[str, str]) -> str:
    for key, value in values.items():
        template = template.replace("{{" + key + "}}", value)
    return template


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config-dir", type=Path)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    config_dir = args.config_dir or Path.home() / ".config" / "solvys-factory"
    receipt_path = config_dir / "orientation.yaml"
    handoff_path = config_dir / "orientation-handoff.md"

    if receipt_path.exists() and not args.force:
        print(f"Orientation already exists: {receipt_path}")
        print(f"Handoff: {handoff_path}")
        return 0

    if not sys.stdin.isatty():
        print("Reading mandatory orientation answers from standard input.")

    print("\nSolvys Factory orientation")
    print("Do not enter passwords, MFA codes, tokens, or secret values.\n")

    answers = {
        "position": ask("What position are you?", required=True),
        "company": ask("What company are you with?", required=True),
        "main_project": ask("What is your main project?", required=True),
        "work_lane": ask("Primary work lane (PL, PM, DEV, CAO, design, or mixed)", required=True),
        "github_user": ask("GitHub username"),
        "github_org": ask("GitHub organization", default="solvys-technologies"),
        "project_google_identity": ask("Project Google email or identity label"),
        "linear_workspace": ask("Linear workspace"),
        "slack_workspace": ask("Primary Slack workspace"),
        "mac_mini_access": ask("Mac Mini access (yes, no, or request)", required=True),
        "chatgpt_sites_access": ask("ChatGPT Sites team-review access (yes, no, or request)", required=True),
        "wonder_access": ask("Wonder access (yes, no, or request)"),
        "paste_access": ask("Paste access (yes, no, or request)"),
    }

    installed: list[str] = []
    missing: list[str] = []

    for tool in REQUIRED_TOOLS + OPTIONAL_PROVIDER_TOOLS:
        if shutil.which(tool):
            installed.append(f"- CLI: {tool}")
        else:
            missing.append(f"- CLI: {tool}")

    if sys.platform == "darwin":
        for label, app_names in MAC_APPS.items():
            if app_present(app_names):
                installed.append(f"- macOS app: {label}")
            else:
                missing.append(f"- macOS app: {label}")

    for field, label in [
        ("mac_mini_access", "Mac Mini access"),
        ("chatgpt_sites_access", "ChatGPT Sites team-review access"),
        ("wonder_access", "Wonder access"),
        ("paste_access", "Paste access"),
    ]:
        if answers[field].lower() not in {"yes", "y", "available", "granted"}:
            missing.append(f"- Access: {label} ({answers[field]})")

    receipt = {
        "version": 1,
        "completedAt": datetime.now(timezone.utc).isoformat(),
        "orientationStatus": "handoff-required",
        "identity": {
            "position": answers["position"],
            "company": answers["company"],
            "mainProject": answers["main_project"],
            "workLane": answers["work_lane"],
        },
        "accounts": {
            "githubUser": answers["github_user"],
            "githubOrganization": answers["github_org"],
            "projectGoogleIdentity": answers["project_google_identity"],
            "linearWorkspace": answers["linear_workspace"],
            "slackWorkspace": answers["slack_workspace"],
        },
        "reviewAccess": {
            "macMini": answers["mac_mini_access"],
            "chatgptSites": answers["chatgpt_sites_access"],
            "wonder": answers["wonder_access"],
            "paste": answers["paste_access"],
        },
        "installed": installed,
        "missing": missing,
        "secretValuesCollected": False,
    }

    config_dir.mkdir(parents=True, exist_ok=True)
    receipt_path.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")

    template_path = Path(__file__).resolve().parent.parent / "assets" / "orientation-handoff-template.md"
    template = template_path.read_text(encoding="utf-8")
    values = dict(answers)
    values["installed_items"] = "\n".join(installed) if installed else "- None detected"
    values["missing_items"] = "\n".join(missing) if missing else "- None detected"
    handoff_path.write_text(render(template, values), encoding="utf-8")

    print(f"\nOrientation receipt: {receipt_path}")
    print(f"Mandatory handoff prompt: {handoff_path}")
    print("Send the handoff prompt to the Solvys orientation task before project work.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
