#!/usr/bin/env python3
"""Validate that the Solvys CAO skill keeps its required operating contracts."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path
import re
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
    "references/refresh-system.md",
    "references/wonder-frontend-sandbox.md",
    "ops/storage-policy.json",
    "ops/tranche-registry.json",
    "ops/README.md",
    "scripts/storage_inventory.py",
    "scripts/fixtures/refresh-contract.json",
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
        "Refresh Dispatch And Integration",
        "S### - concise context",
        "Implement this plan",
        "refs/sprints/S###/P#",
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
        "Cloud implementation",
        "Recovery And Restore Contract",
        "Resource Budgets",
    ],
    "references/wonder-frontend-sandbox.md": [
        "Wonder is provisional design truth",
        "Port 7777 or the explicitly named sandbox",
        "Concurrent Human Work",
    ],
    "references/refresh-system.md": [
        "Plan-Mode Router",
        "Implement this plan",
        "Turnkey Cloud Pickup",
        "S### - concise context",
        "refs/sprints/S###/P#",
        "YYYY-MM-DD",
        "main",
        "Blacksmith",
        "mandatory human verification",
        "restore proof",
        "Resource Budgets",
        "Wonder is provisional co-design truth",
        "Port 7777 or the explicitly named sandbox is source-integrated truth",
        "variable name only",
        "Exact Checkpoint Receipt",
        "coherent CI/deployment",
        "Worktree mode: detached",
    ],
}

SUITE_ROOT = ROOT.parent
OPERATIONAL_SKILLS = {
    "solvys-brief": SUITE_ROOT / "solvys-brief" / "SKILL.md",
    "solvys-orchestrate": SUITE_ROOT / "solvys-orchestrate" / "SKILL.md",
    "solvys-execute": SUITE_ROOT / "solvys-execute" / "SKILL.md",
    "solvys-run-point": SUITE_ROOT / "solvys-run-point" / "SKILL.md",
}

OPERATIONAL_REQUIRED = [
    "S### - concise context",
    "Implement this plan",
    "YYYY-MM-DD",
    "refs/sprints/S###/P#",
    "main",
]


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

    for name, path in OPERATIONAL_SKILLS.items():
        if not path.is_file():
            errors.append(f"missing operational skill: {name}")
            continue
        text = path.read_text(encoding="utf-8")
        for phrase in OPERATIONAL_REQUIRED:
            if phrase not in text:
                errors.append(f"{name}: missing Refresh phrase {phrase!r}")
        if name in {"solvys-brief", "solvys-orchestrate", "solvys-execute"}:
            for field in (
                "Accepted plan revision",
                "Base commit",
                "Task-owned checkpoint ref",
                "Protected zones",
                "Dependencies",
                "Secrets manifest (names only)",
                "Proof gates",
                "Return path",
                "Capacity and resource budget",
                "Closure condition",
            ):
                if field not in text:
                    errors.append(f"{name}: Cloud Pickup missing {field!r}")
        for stale_title in (
            "issue titles become `S{N}-T{N}:",
            'title: "S{SPRINT}-T{N}:',
            'title: "S{SPRINT}-ORCH:',
        ):
            if stale_title in text:
                errors.append(f"{name}: stale non-searchable task title {stale_title!r}")

    run_point = OPERATIONAL_SKILLS["solvys-run-point"]
    if run_point.is_file():
        run_point_text = run_point.read_text(encoding="utf-8")
        for banned in (
            "Branch format: `v<major>.<minor>.<patch>/",
            "weekly version roll",
            "monthly version roll",
            "version-namespaced daily branches",
        ):
            if banned.lower() in run_point_text.lower():
                errors.append(f"solvys-run-point: stale branch convention {banned!r}")

    policy_path = ROOT / "ops/storage-policy.json"
    registry_path = ROOT / "ops/tranche-registry.json"
    try:
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
        rules = policy["sanitationRules"]
        if policy["approvedActions"]["manualWorktreeDeletion"] is not False:
            errors.append("storage policy: manual worktree deletion must stay disabled")
        if policy["approvedActions"]["codexHomeMigration"] is not False:
            errors.append("storage policy: CODEX_HOME migration must stay disabled")
        branch_contract = policy["branchAndRefContract"]
        if branch_contract["mainProtected"] is not True:
            errors.append("storage policy: main must stay protected")
        if branch_contract["dailyPrMergeMethod"] != "squash":
            errors.append("storage policy: daily PR must squash at the boundary")
        if branch_contract["forceRewriteAcceptedHistory"] is not False:
            errors.append("storage policy: accepted history must not be force rewritten")
        backup = policy["backupContract"]
        if backup["uploadedIsComplete"] is not False or backup["restoreReadbackRequired"] is not True:
            errors.append("storage policy: upload must not count without restore/readback")
        secrets = policy["secretManifest"]
        if secrets["valuesAllowed"] is not False or secrets["namesOnly"] is not True:
            errors.append("storage policy: secret manifests must contain names only")
        required_budgets = set(policy["resourceBudgets"]["requiredCategories"])
        if required_budgets != {
            "tasks",
            "worktrees",
            "checkpoints",
            "artifacts",
            "transcripts",
            "dmgs",
            "processes",
            "ram",
        }:
            errors.append("storage policy: resource budget categories drifted")
        risk = policy["riskContract"]
        if set(risk["humanVerificationBeforeMergeOrDeploy"]) != {
            "migrations",
            "destructive_writes",
            "authentication",
            "authorization",
            "billing",
            "secrets_or_provider_credentials",
            "infrastructure",
            "broad_routing",
            "security_controls",
            "irreversible_integrations",
            "release_or_install_behavior",
            "protected_surface_changes",
        }:
            errors.append("storage policy: human-risk gate categories drifted")
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
        s166 = next((entry for entry in registry["entries"] if entry.get("id") == "S166"), None)
        if not s166:
            errors.append("tranche registry: missing S166 Cloud tranche")
        else:
            if s166.get("title") != "S166 - Solvys Refresh System":
                errors.append("tranche registry: S166 searchable identity drifted")
            if s166.get("branch") != "2026-07-29":
                errors.append("tranche registry: S166 date branch drifted")
            if s166.get("checkpointRef") != "refs/sprints/S166/P1":
                errors.append("tranche registry: S166 checkpoint ref drifted")
            if s166.get("secretsManifestNames") != []:
                errors.append("tranche registry: S166 secret manifest must remain name-only/empty")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"tranche registry: invalid machine-readable boundary: {exc}")

    fixture_path = ROOT / "scripts/fixtures/refresh-contract.json"
    try:
        fixtures = json.loads(fixture_path.read_text(encoding="utf-8"))
        title_re = re.compile(r"^S\d{3,} - [A-Za-z0-9][A-Za-z0-9 .()/_-]*$")
        date_branch_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")
        checkpoint_re = re.compile(r"^refs/sprints/S\d{3,}/P\d+$")
        for title in fixtures["valid"]["taskTitles"]:
            if not title_re.fullmatch(title):
                errors.append(f"refresh fixture: valid title rejected {title!r}")
        for title in fixtures["invalid"]["taskTitles"]:
            if title_re.fullmatch(title):
                errors.append(f"refresh fixture: invalid title accepted {title!r}")
        for branch in fixtures["valid"]["dateBranches"]:
            try:
                date.fromisoformat(branch)
            except ValueError:
                errors.append(f"refresh fixture: valid date branch rejected {branch!r}")
                continue
            if not date_branch_re.fullmatch(branch):
                errors.append(f"refresh fixture: valid date branch rejected {branch!r}")
        for branch in fixtures["invalid"]["branches"]:
            try:
                date.fromisoformat(branch)
                is_date = True
            except ValueError:
                is_date = False
            if date_branch_re.fullmatch(branch) and is_date:
                errors.append(f"refresh fixture: invalid branch accepted {branch!r}")
        for ref in fixtures["valid"]["checkpointRefs"]:
            if not checkpoint_re.fullmatch(ref):
                errors.append(f"refresh fixture: valid checkpoint rejected {ref!r}")
        for ref in fixtures["invalid"]["checkpointRefs"]:
            if checkpoint_re.fullmatch(ref):
                errors.append(f"refresh fixture: invalid checkpoint accepted {ref!r}")
        routing = {item["shape"]: item["skill"] for item in fixtures["routing"]}
        if routing.get("bounded-single-owner") != "solvys-brief":
            errors.append("refresh fixture: single-owner route must select solvys-brief")
        for shape in ("multi-track", "parallel", "long-running", "super-sprint"):
            if routing.get(shape) != "solvys-orchestrate":
                errors.append(f"refresh fixture: {shape} must select solvys-orchestrate")
        risky = set(fixtures["blacksmith"]["ineligible"])
        required_risky = {
            "migration",
            "destructive-write",
            "authentication",
            "authorization",
            "billing",
            "secret-or-provider-credential",
            "infrastructure",
            "broad-routing",
            "security-control",
            "irreversible-integration",
            "release-or-install",
            "protected-surface",
        }
        if risky != required_risky:
            errors.append("refresh fixture: Blacksmith protected/risky surfaces drifted")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"refresh fixtures: invalid machine-readable boundary: {exc}")

    if errors:
        print("Solvys CAO canon validation: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Solvys CAO canon validation: PASS ({len(REQUIRED)} required files)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
