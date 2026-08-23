#!/usr/bin/env python3
"""Focused spec-lineage, user-testing, and completion-authority tests."""

from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = REPO_ROOT / ".claude/skills/solvys-user-testing/scripts/validate_user_testing.py"
HOOK = REPO_ROOT / "scripts/factory_productivity_hook.py"


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class UserTestingLineageTests(unittest.TestCase):
    def package(self, root: Path, *, parent: str = "objective", failed: bool = False) -> dict[str, Path]:
        cabinet_dir = root / "Codex Cabinet" / "Factory Test"
        codebase_dir = root / "External Codebases" / "factory-test"
        cabinet_dir.mkdir(parents=True)
        codebase_dir.mkdir(parents=True)
        cabinet = cabinet_dir / "project-specification-map.json"
        technical = codebase_dir / "project-specification-map.json"
        context = root / "user-testing-context.json"
        record = root / "user-testing-record.json"

        technical_value = {
            "version": 1,
            "project": "factory-test",
            "revision": "12",
            "integrityLinkId": "factory-test-spec-12",
            "canonicalMap": {"path": str(cabinet), "revision": "12", "integrityLinkId": "factory-test-spec-12"},
            "objectives": [{
                "id": "objective",
                "journeys": [{
                    "id": "primary",
                    "subJourneys": [{
                        "id": "change-and-reload",
                        "acceptanceCriteria": [{"id": "result-visible"}],
                        "validationGates": [{"id": "reload-proof"}],
                        "resources": [{"id": "product-site", "location": "https://example.invalid/site"}],
                    }],
                    "regressionJourneys": [{"id": "existing-flow"}],
                }],
            }],
            "progress": {"revision": "progress-7", "state": "in-progress"},
        }
        technical.write_text(json.dumps(technical_value, indent=2) + "\n", encoding="utf-8")
        cabinet_value = {
            "version": 1,
            "project": "factory-test",
            "revision": "12",
            "integrityLinkId": "factory-test-spec-12",
            "clientObjective": {"id": "objective", "statement": "An authorized user completes and reloads the workflow."},
            "userJourneys": [{"id": "primary", "statement": "The user enters, completes, observes, and reloads the result."}],
            "technicalMap": {"path": str(technical), "revision": "12", "integrityLinkId": "factory-test-spec-12", "sha256": sha(technical)},
        }
        cabinet.write_text(json.dumps(cabinet_value, indent=2) + "\n", encoding="utf-8")
        context_value = {
            "version": 1,
            "specificationMaps": {
                "revision": "12",
                "integrityLinkId": "factory-test-spec-12",
                "cabinet": {"path": str(cabinet), "sha256": sha(cabinet)},
                "technical": {"path": str(technical), "sha256": sha(technical)},
            },
            "parentObjectiveId": parent,
            "parentJourneyId": "primary",
            "taskSubJourneyId": "change-and-reload",
            "acceptanceCriterionIds": ["result-visible"],
            "validationGateIds": ["reload-proof"],
            "authoritativeResources": [{"id": "product-site", "location": "https://example.invalid/site"}],
            "progressRevision": "progress-7",
            "regressionJourneyIds": ["existing-flow"],
            "testDataBoundary": {"mode": "fixture", "allowed": ["named-fixture"]},
            "approvalPosture": {"routine": "full", "actions": ["implementation", "testing", "debugging", "restart", "validation"]},
            "genuineHumanOnlyGates": [],
            "requiredSkills": ["solvys-audit", "solvys-user-testing"],
            "acceptanceBranch": "2026-08-11",
            "nextAction": "Run the inherited journey.",
        }
        context.write_text(json.dumps(context_value, indent=2) + "\n", encoding="utf-8")
        status = "failed" if failed else "passed"
        record_value = {
            "version": 1,
            "contextSha256": sha(context),
            "workerStatus": "ready-for-orchestrator-acceptance",
            "workerCompletionClaim": False,
            "taskSubJourney": {"id": "change-and-reload", "status": status, "evidence": ["Site run and reload"]},
            "acceptanceCriteria": [{"id": "result-visible", "status": status, "evidence": ["visible result"]}],
            "validationGates": [{"id": "reload-proof", "status": status, "evidence": ["reload retained result"]}],
            "regressionJourneys": [{"id": "existing-flow", "status": status, "evidence": ["existing flow rerun"]}],
            "orchestratorAcceptance": {"status": "accepted" if not failed else "rejected", "owner": "factory-orchestrator", "evidence": ["cross-artifact validation"]},
        }
        record.write_text(json.dumps(record_value, indent=2) + "\n", encoding="utf-8")
        return {"cabinet": cabinet, "technical": technical, "context": context, "record": record}

    def validate(self, files: dict[str, Path], *, acceptance: bool = True) -> subprocess.CompletedProcess[str]:
        command = [sys.executable, str(VALIDATOR), "--cabinet-map", str(files["cabinet"]), "--technical-map", str(files["technical"]), "--context", str(files["context"]), "--record", str(files["record"])]
        if acceptance:
            command.append("--require-acceptance")
        return subprocess.run(command, capture_output=True, text=True, check=False)

    def hook(self, state: Path, event: str, payload: dict) -> subprocess.CompletedProcess[str]:
        return subprocess.run([sys.executable, str(HOOK), "--event", event, "--state", str(state)], input=json.dumps(payload), capture_output=True, text=True, check=False)

    def hook_payload(self, files: dict[str, Path]) -> dict:
        return {
            "userTestingRequired": True,
            "cabinetSpecMapPath": str(files["cabinet"]),
            "technicalSpecMapPath": str(files["technical"]),
            "userTestingContextPath": str(files["context"]),
            "userTestingRecordPath": str(files["record"]),
        }

    def test_missing_parent_lineage_denies_dispatch(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            files = self.package(Path(temporary), parent="missing-objective")
            result = self.hook(Path(temporary) / "state.json", "PreToolUse", {**self.hook_payload(files), "ordinaryImplementation": True})
            self.assertEqual(result.returncode, 2)
            self.assertIn("missing-or-stale-user-testing-lineage", json.loads(result.stdout)["mechanisms"])

    def test_dual_map_drift_denies_acceptance(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            files = self.package(Path(temporary))
            technical = json.loads(files["technical"].read_text(encoding="utf-8"))
            technical["progress"]["state"] = "changed-after-dispatch"
            files["technical"].write_text(json.dumps(technical, indent=2) + "\n", encoding="utf-8")
            result = self.validate(files)
            self.assertEqual(result.returncode, 2)
            self.assertIn("digest is stale", result.stdout)

    def test_failed_or_incomplete_journey_denies_completion(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            files = self.package(Path(temporary), failed=True)
            payload = {**self.hook_payload(files), "actorRole": "orchestrator", "completionClaim": True}
            result = self.hook(Path(temporary) / "state.json", "Stop", payload)
            self.assertEqual(result.returncode, 2)
            self.assertIn("incomplete-user-testing", json.loads(result.stdout)["mechanisms"])

    def test_worker_cannot_declare_completion(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            files = self.package(Path(temporary))
            payload = {**self.hook_payload(files), "actorRole": "worker", "completionClaim": True}
            result = self.hook(Path(temporary) / "state.json", "Stop", payload)
            self.assertEqual(result.returncode, 2)
            self.assertIn("Worker completion claims are blocked", result.stdout)

    def test_fully_evidenced_inherited_journey_passes_orchestrator_gate(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            files = self.package(Path(temporary))
            validated = self.validate(files)
            self.assertEqual(validated.returncode, 0, validated.stdout + validated.stderr)
            payload = {**self.hook_payload(files), "actorRole": "orchestrator", "completionClaim": True}
            result = self.hook(Path(temporary) / "state.json", "Stop", payload)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(json.loads(result.stdout)["decision"], "allow")


if __name__ == "__main__":
    unittest.main()
