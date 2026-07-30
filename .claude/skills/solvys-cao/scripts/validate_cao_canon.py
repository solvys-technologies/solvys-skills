#!/usr/bin/env python3
"""Validate that the Solvys CAO skill keeps its required operating contracts."""

from __future__ import annotations

import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "agents/openai.yaml",
    "references/mission-doctrine.md",
    "references/forbidden-mindsets-and-design-sins.md",
    "references/decision-authority.md",
    "references/official-stack.md",
    "references/voice-and-respect.md",
    "references/client-partitions.md",
    "references/daily-context-contract.md",
    "references/storage-and-execution-lanes.md",
    "references/wonder-frontend-sandbox.md",
    "ops/storage-policy.json",
    "ops/tranche-registry.json",
    "ops/README.md",
    "scripts/storage_inventory.py",
    "references/fintheon-pain-eureka-ledger.md",
    "references/fintheon-checkpoint-index.md",
    "references/agent-cao.md",
    "references/agent-product-architect.md",
    "references/agent-design-director.md",
    "references/agent-experience-engineer.md",
    "references/agent-systems-engineer.md",
    "references/agent-debugger.md",
    "references/agent-adversarial-tester.md",
    "references/agent-sanitizer.md",
    "references/agent-research-librarian.md",
    "references/agent-review-release-steward.md",
]

REQUIRED_PHRASES = {
    "SKILL.md": [
        "Name the original problem",
        "Retrieve the best precedent",
        "Run the Ponytail chain",
        "Prove at the highest reality",
        "Select the execution and storage lane",
        "Wonder proves a provisional design direction",
        "Reference reconstruction",
        "Dream Team Roles",
    ],
    "references/decision-authority.md": ["Answer For Yourself", "Clarify", "Shoot Down"],
    "references/official-stack.md": [
        "BeUI",
        "Bklit",
        "NumberFlow",
        "Local Solvys icon facade",
        "Approved Repository Canon",
    ],
    "references/fintheon-checkpoint-index.md": [
        "Problem And Repair Pairs",
        "Operational Evidence Outside Git",
        "Selection Rule",
    ],
    "references/storage-and-execution-lanes.md": [
        "Backend-only",
        "frontend plus backend",
        "Ten-Day Conversation Sweep",
        "Thirty-Day Transcript Sweep",
        "Terra Task Lifecycle",
        "Source Versus Always-On Runtime",
        "Application Support",
    ],
    "references/wonder-frontend-sandbox.md": [
        "Wonder is provisional design truth",
        "Port 7777 is source-integrated product truth",
        "Concurrent Human Work",
    ],
}


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED:
        path = ROOT / relative
        if not path.is_file():
            errors.append(f"missing: {relative}")

    for relative, phrases in REQUIRED_PHRASES.items():
        path = ROOT / relative
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in text:
                errors.append(f"{relative}: missing phrase {phrase!r}")
        if "TODO" in text:
            errors.append(f"{relative}: contains TODO placeholder")

    policy_path = ROOT / "ops/storage-policy.json"
    registry_path = ROOT / "ops/tranche-registry.json"
    try:
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
        rules = policy["sanitationRules"]
        if policy["approvedActions"]["manualWorktreeDeletion"] is not False:
            errors.append("storage policy: manual worktree deletion must stay disabled")
        if policy["approvedActions"]["codexHomeMigration"] is not False:
            errors.append("storage policy: CODEX_HOME migration must stay disabled")
        for name in ("registeredTaskTemp", "externalQuarantine", "transcriptArchive"):
            if name not in rules:
                errors.append(f"storage policy: missing sanitation rule {name!r}")
        if not policy.get("hardDenyRoots"):
            errors.append("storage policy: hardDenyRoots must not be empty")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"storage policy: invalid machine-readable boundary: {exc}")

    try:
        registry = json.loads(registry_path.read_text(encoding="utf-8"))
        for entry in registry["entries"]:
            for key in (
                "id",
                "repository",
                "executionLane",
                "workspacePathOrCloudBranch",
                "owner",
                "closureState",
                "sanitationPaths",
            ):
                if key not in entry:
                    errors.append(f"tranche registry: {entry.get('id', '<unknown>')} missing {key!r}")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"tranche registry: invalid machine-readable boundary: {exc}")

    if errors:
        print("Solvys CAO canon validation: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Solvys CAO canon validation: PASS ({len(REQUIRED)} required files)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
