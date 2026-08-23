#!/usr/bin/env python3
"""S015 agency, hook, loop, and Spec Kit contract tests."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
HOOK = REPO_ROOT / "scripts" / "factory_productivity_hook.py"
LOOP_INIT = REPO_ROOT / "scripts" / "init_factory_loop.py"
LOOP_CONFIGURATOR = REPO_ROOT / "scripts" / "configure_project_loops.py"
MAPPER = REPO_ROOT / "scripts" / "map_speckit_contract.py"
CONTRACT_VALIDATOR = REPO_ROOT / "scripts" / "validate_development_contract.py"
HOOK_CONFIGURATOR = REPO_ROOT / "scripts" / "configure_factory_hooks.py"
AGENT_CONFIGURATOR = REPO_ROOT / "scripts" / "configure_global_agents.py"
DIRECTIVE = (
    "work freely, work with an open mind, and explore all possible options; "
    "never jump to conclusions at the second or third blocker. Be innovative, "
    "take inventory of your skills"
)
MANAGED_SURFACES = [
    REPO_ROOT / "AGENTS.md",
    REPO_ROOT / "SOLVYS_AGENT_SYSTEM_PROMPT.md",
    REPO_ROOT / ".claude/skills/solvys-factory/SKILL.md",
    REPO_ROOT / ".claude/skills/solvys-cao/SKILL.md",
    REPO_ROOT / ".claude/skills/solvys-brief/SKILL.md",
    REPO_ROOT / ".claude/skills/solvys-orchestrate/SKILL.md",
    REPO_ROOT / ".claude/skills/solvys-loop/SKILL.md",
    REPO_ROOT / ".claude/skills/solvys-spec/SKILL.md",
    REPO_ROOT / "factory/Factory Registry/Signs/PL.md",
    REPO_ROOT / "factory/Factory Registry/Signs/PM.md",
    REPO_ROOT / "factory/Factory Registry/Signs/DEV.md",
    REPO_ROOT / "factory/Factory Registry/Signs/CAO.md",
    REPO_ROOT / "factory/spec-kit/constitution.md",
    REPO_ROOT / "factory/spec-kit/.specify/memory/constitution.md",
]


def load_hook_module():
    spec = importlib.util.spec_from_file_location("factory_productivity_hook", HOOK)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class S015ControlTests(unittest.TestCase):
    def run_hook(self, event: str, state: Path, payload: dict) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(HOOK), "--event", event, "--state", str(state)],
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=False,
        )

    def test_directive_is_exactly_once_on_managed_surfaces(self) -> None:
        canonical = REPO_ROOT / "factory/canon/agency-directive.md"
        self.assertEqual(canonical.read_text(encoding="utf-8").count(DIRECTIVE), 1)
        for surface in MANAGED_SURFACES:
            self.assertEqual(surface.read_text(encoding="utf-8").count(DIRECTIVE), 1, str(surface))

    def test_all_thirteen_mechanisms_have_prevention(self) -> None:
        module = load_hook_module()
        self.assertEqual(module.MECHANISMS, set(module.PREVENTION_MAP))
        self.assertEqual(len(module.PREVENTION_MAP), 16)

    def test_stop_rejects_avoidable_handoff(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            state = Path(temporary) / "run.json"
            result = self.run_hook("Stop", state, {})
            self.assertEqual(result.returncode, 2)
            output = json.loads(result.stdout)
            self.assertEqual(output["decision"], "deny")
            self.assertIn("Don’t make TP do your fucking job", output["reason"])
            self.assertIn("asked-before-inventory", output["mechanisms"])

    def test_stop_allows_exact_genuine_gate(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            state = Path(temporary) / "run.json"
            payload = {
                "version": 1,
                "runId": "run-1",
                "projectId": "factory-test",
                "sprintId": "S015",
                "phase": "PL3",
                "scopeHash": "scope",
                "blockers": [],
                "exploredPaths": [],
                "skillInventory": [],
                "proof": [],
                "humanGate": {"type": "mfa-or-consent", "evidence": ["provider challenge"], "smallestAction": "approve the challenge", "safeWorkContinues": True},
                "correctionLatch": {"active": False, "mechanism": None, "preventionTestPassed": False},
                "circuit": {"state": "closed", "reason": None},
            }
            state.write_text(json.dumps(payload), encoding="utf-8")
            result = self.run_hook("Stop", state, {})
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout)["decision"], "allow")

    def test_repeated_failure_enters_repair_then_opens_circuit(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            state = Path(temporary) / "run.json"
            payload = {"is_error": True, "error": "provider timeout 504 on attempt 1"}
            first = self.run_hook("PostToolUse", state, payload)
            second = self.run_hook("PostToolUse", state, payload)
            third = self.run_hook("PostToolUse", state, payload)
            self.assertEqual(first.returncode, 0)
            self.assertEqual(json.loads(second.stdout)["decision"], "warn")
            saved = json.loads(state.read_text(encoding="utf-8"))
            self.assertEqual(saved["circuit"]["state"], "open")
            self.assertEqual(json.loads(third.stdout)["decision"], "warn")

    def test_correction_latch_blocks_reopened_path(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            state = Path(temporary) / "run.json"
            payload = {
                "version": 1,
                "runId": "run-1",
                "projectId": "factory-test",
                "sprintId": "S015",
                "phase": "PL3",
                "scopeHash": "scope",
                "allowedSurfaces": [],
                "blockers": [],
                "exploredPaths": ["repo", "cli", "api"],
                "skillInventory": ["solvys-loop"],
                "proof": [],
                "humanGate": None,
                "correctionLatch": {"active": True, "mechanism": "wrong-review-surface", "preventionTestPassed": False},
                "circuit": {"state": "closed", "reason": None},
            }
            state.write_text(json.dumps(payload), encoding="utf-8")
            result = self.run_hook("PreToolUse", state, {"tool_name": "Bash", "tool_input": {"command": "echo retry"}})
            self.assertEqual(result.returncode, 2)
            self.assertIn("reopened-stopped-path", json.loads(result.stdout)["mechanisms"])

    def test_profanity_in_prompt_is_not_an_infraction(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            state = Path(temporary) / "run.json"
            result = self.run_hook(
                "UserPromptSubmit",
                state,
                {"prompt": "quoted policy: fucking dumbass dickhead stupid doofus"},
            )
            self.assertEqual(result.returncode, 0)
            self.assertEqual(json.loads(result.stdout)["mechanisms"], [])

    def test_loop_scaffold_is_project_scoped_and_no_overwrite(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            manifest = root / "project-manifest.yaml"
            manifest.write_text(
                "projectId: factory-test\ndisplayName: Factory Test\nrepository:\n  owner: solvys-technologies\n  name: factory-test\nproof:\n  requiredRung: tests\n",
                encoding="utf-8",
            )
            output = root / "loop"
            first = subprocess.run(
                [sys.executable, str(LOOP_INIT), "--manifest", str(manifest), "--output", str(output), "--sprint", "S015"],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertFalse(json.loads((output / "loop-policy.json").read_text())["autoMerge"])
            self.assertIn("denylist:", (output / "gate.yaml").read_text(encoding="utf-8"))
            self.assertIn("Max tokens per day", (output / "loop-budget.md").read_text(encoding="utf-8"))
            second = subprocess.run(
                [sys.executable, str(LOOP_INIT), "--manifest", str(manifest), "--output", str(output), "--sprint", "S015"],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertNotEqual(second.returncode, 0)

    def test_project_loop_context_is_bounded_exact_and_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            records = root / "records"
            project = records / "Example"
            (project / ".codex/skills/loop-triage").mkdir(parents=True)
            (project / ".codex/agents").mkdir(parents=True)
            (project / "project-manifest.yaml").write_text("projectId: example\n", encoding="utf-8")
            (project / "infraction-ledger.json").write_text(
                json.dumps({"entries": [{"id": "INF-001", "fingerprint": "abc123", "category": "scope", "title": "Expanded scope", "status": "open"}]}),
                encoding="utf-8",
            )
            for name in ("LOOP.md", "STATE.md", "loop-constraints.md", ".codex/skills/loop-triage/SKILL.md"):
                (project / name).write_text("# Upstream content\n", encoding="utf-8")
            (project / ".codex/agents/verifier.toml").write_text('instructions = """\nVerify.\n"""\n', encoding="utf-8")
            registry = root / "registry.yaml"
            registry.write_text(
                f"projectRecordsRoot: {records}\nprojects:\n  - id: example\n    manifest: Example/project-manifest.yaml\n    sprint: S015\n    contract: contract.md\n    loopMode: report-only\nrollout:\n  reportOnlyThrough: 2026-08-18T00:00:00Z\n",
                encoding="utf-8",
            )
            command = [sys.executable, str(LOOP_CONFIGURATOR), "--registry", str(registry), "--canonical", str(REPO_ROOT / "factory/canon/agency-directive.md")]
            first = subprocess.run(command, capture_output=True, text=True, check=False)
            second = subprocess.run(command, capture_output=True, text=True, check=False)
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual(second.returncode, 0, second.stderr)
            for path in (
                project / "AGENTS.md",
                project / "LOOP.md",
                project / "STATE.md",
                project / "loop-constraints.md",
                project / ".codex/skills/loop-triage/SKILL.md",
                project / ".codex/agents/verifier.toml",
            ):
                text = path.read_text(encoding="utf-8")
                self.assertEqual(text.count(DIRECTIVE), 1, str(path))
                self.assertNotIn("npm test", text)
                self.assertIn("INF-001:abc123", text)
            self.assertIn("autoMergeAllowlist: []", (project / "gate.yaml").read_text(encoding="utf-8"))
            self.assertIn("Kill switch", (project / "loop-budget.md").read_text(encoding="utf-8"))

    def test_toolchain_lock_pins_every_published_loop_command(self) -> None:
        lock = json.loads((REPO_ROOT / "factory/loops/toolchain-lock.json").read_text(encoding="utf-8"))
        for key in ("loop-engineering", "loop-init", "loop-audit", "loop-cost", "loop-sync", "loop-context", "loop-worktree", "loop-gate", "loop-mcp-server"):
            self.assertRegex(lock["tools"][key]["version"], r"^\d+\.\d+\.\d+$")
            self.assertTrue(lock["tools"][key]["integrity"].startswith("sha512-"))
        self.assertEqual(lock["tools"]["loop-sandbox"]["status"], "disabled-not-published-on-npm")

    def test_all_speckit_codex_skills_include_agency_directive(self) -> None:
        skills = sorted((REPO_ROOT / "factory/spec-kit/.agents/skills").glob("*/SKILL.md"))
        self.assertEqual(len(skills), 10)
        for skill in skills:
            self.assertEqual(skill.read_text(encoding="utf-8").count(DIRECTIVE), 1, str(skill))

    def test_hook_installer_preserves_existing_hooks_and_is_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            home = root / "home"
            hooks = home / ".codex/hooks.json"
            guard = home / ".agents/hooks/deny-dangerous.sh"
            guard.parent.mkdir(parents=True)
            guard.write_text("#!/bin/sh\nexit 0\n", encoding="utf-8")
            hooks.parent.mkdir(parents=True)
            hooks.write_text(
                json.dumps({"hooks": {"Stop": [{"hooks": [{"type": "command", "command": "/existing/review"}]}]}}),
                encoding="utf-8",
            )
            command = [sys.executable, str(HOOK_CONFIGURATOR), "--hooks-file", str(hooks), "--repo-root", str(REPO_ROOT), "--home", str(home)]
            first = subprocess.run(command, capture_output=True, text=True, check=False)
            second = subprocess.run(command, capture_output=True, text=True, check=False)
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual(second.returncode, 0, second.stderr)
            payload = json.loads(hooks.read_text(encoding="utf-8"))["hooks"]
            self.assertTrue(any(item["hooks"][0]["command"] == "/existing/review" for item in payload["Stop"]))
            for event in ("SessionStart", "UserPromptSubmit", "PreToolUse", "PostToolUse", "Stop"):
                commands = [hook["command"] for group in payload[event] for hook in group.get("hooks", [])]
                expected = f'python3 "{REPO_ROOT / "scripts/factory_productivity_hook.py"}" --event {event}'
                self.assertEqual(commands.count(expected), 1)

    def test_global_agent_block_includes_canonical_directive(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            agents = Path(temporary) / "AGENTS.md"
            result = subprocess.run(
                [sys.executable, str(AGENT_CONFIGURATOR), "--agents-file", str(agents), "--repo-root", str(REPO_ROOT)],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(agents.read_text(encoding="utf-8").count(DIRECTIVE), 1)

    def test_speckit_mapping_passes_development_contract_validator(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            feature = root / "feature"
            feature.mkdir()
            (feature / "spec.md").write_text(
                "## Purpose\nDeliver a bounded change.\n\n### Scenario\nGiven an approved request\nWhen the worker runs\nThen proof is recorded\n",
                encoding="utf-8",
            )
            (feature / "plan.md").write_text(
                "### Current source and accepted patterns\nUse repo truth.\n\n### Architecture and contracts\nUse one seam.\n\n### Exact commands\n- Test: `python3 -m unittest`\n\n### Testing and proof\nRun tests.\n\n### Risks and rollback\nRevert the bounded change.\n",
                encoding="utf-8",
            )
            (feature / "tasks.md").write_text(
                "### T1 - Implement\n- Size: `S`\n- Owner: `tester`\n- Dependencies: `None`\n- Files: `one.py`\n- Acceptance: `Scenario`\n- Verify: run `python3 -m unittest`\n- Checkpoint: test receipt\n",
                encoding="utf-8",
            )
            contract = root / "contract.md"
            mapped = subprocess.run(
                [sys.executable, str(MAPPER), "--feature-dir", str(feature), "--output", str(contract), "--project", "factory-test", "--repository", "solvys-technologies/factory-test", "--base-ref", "main", "--base-sha", "a" * 40, "--contract-id", "S015"],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(mapped.returncode, 0, mapped.stdout + mapped.stderr)
            validated = subprocess.run(
                [sys.executable, str(CONTRACT_VALIDATOR), "--contract", str(contract), "--implementation"],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(validated.returncode, 0, validated.stdout + validated.stderr)


if __name__ == "__main__":
    unittest.main()
