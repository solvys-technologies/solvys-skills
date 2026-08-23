#!/usr/bin/env python3
"""Focused tests for correction classification and repair queue priority."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
RECORDER = REPO_ROOT / "scripts" / "record_infraction.py"
SWEEPER = REPO_ROOT / "scripts" / "sweep_infractions.py"


class InfractionControlTests(unittest.TestCase):
    def run_recorder(self, ledger: Path, *extra: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [
                sys.executable,
                str(RECORDER),
                "--project-id",
                "factory-test",
                "--ledger",
                str(ledger),
                *extra,
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    def correction_args(self) -> list[str]:
        return [
            "--title",
            "Wrong browser surface",
            "--description",
            "The active path opened a desktop browser outside the authorized review surface.",
            "--category",
            "tool-lane",
            "--trigger-kind",
            "direct-correction",
            "--failed-contract",
            "Use the Codex in-app browser for Solvys Main review.",
            "--root-cause",
            "The browser choice was made before the task surface was checked.",
            "--prevention-test",
            "The surface guard rejects a desktop-browser route for Solvys Main review.",
            "--timestamp",
            "2026-08-11T00:00:00Z",
        ]

    def test_correction_requires_repair_context(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            ledger = Path(temporary) / "infraction-ledger.json"
            result = self.run_recorder(
                ledger,
                "--title",
                "Wrong browser surface",
                "--description",
                "A direct correction stopped the active path.",
                "--category",
                "tool-lane",
                "--trigger-kind",
                "direct-correction",
            )

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("requires repair context", result.stderr)
            self.assertFalse(ledger.exists())

    def test_correction_metadata_survives_deduplication(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            ledger = Path(temporary) / "infraction-ledger.json"
            first = self.run_recorder(ledger, *self.correction_args())
            second = self.run_recorder(ledger, *self.correction_args(), "--repair-verified")

            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual(second.returncode, 0, second.stderr)
            entry = json.loads(ledger.read_text(encoding="utf-8"))["entries"][0]
            self.assertEqual(entry["count"], 2)
            self.assertEqual(entry["triggerKinds"], ["direct-correction"])
            self.assertEqual(len(entry["failedContracts"]), 1)
            self.assertEqual(len(entry["rootCauses"]), 1)
            self.assertEqual(len(entry["preventionTests"]), 1)
            self.assertTrue(entry["stopRequired"])
            self.assertTrue(entry["repairVerified"])

    def test_stop_required_repairs_rank_first(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            ledger = Path(temporary) / "infraction-ledger.json"
            critical = self.run_recorder(
                ledger,
                "--title",
                "Routine proof gap",
                "--description",
                "A manual audit found a proof gap.",
                "--category",
                "proof",
                "--severity",
                "critical",
                "--timestamp",
                "2026-08-11T00:00:01Z",
            )
            correction = self.run_recorder(
                ledger,
                *self.correction_args(),
                "--severity",
                "low",
            )
            sweep = subprocess.run(
                [sys.executable, str(SWEEPER), "--ledger", str(ledger)],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertEqual(critical.returncode, 0, critical.stderr)
            self.assertEqual(correction.returncode, 0, correction.stderr)
            self.assertEqual(sweep.returncode, 0, sweep.stderr)
            selected = json.loads(sweep.stdout)["selectedRepairs"]
            self.assertEqual(selected[0]["title"], "Wrong browser surface")
            self.assertTrue(selected[0]["stopRequired"])
            self.assertEqual(selected[0]["failedContracts"], [
                "Use the Codex in-app browser for Solvys Main review."
            ])


if __name__ == "__main__":
    unittest.main()
