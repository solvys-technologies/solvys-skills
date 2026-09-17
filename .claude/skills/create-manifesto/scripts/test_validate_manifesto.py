#!/usr/bin/env python3
"""Focused check that manifesto files keep the required heading contract."""

from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[4]
VALIDATOR = SKILL_ROOT / "scripts" / "validate_manifesto.py"


class ValidateManifestoTests(unittest.TestCase):
    def run_validator(self, *paths: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(VALIDATOR), *map(str, paths)],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_template_example_and_canon_pass(self) -> None:
        result = self.run_validator(
            REPO_ROOT / "factory" / "Factory Registry" / "Templates" / "project-manifesto.md",
            SKILL_ROOT / "examples" / "cred.md",
            REPO_ROOT / "factory" / "canon" / "cred-manifesto.md",
        )
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_missing_p0_fails(self) -> None:
        broken = SKILL_ROOT / "scripts" / "fixtures" / "missing-p0.md"
        result = self.run_validator(broken)
        self.assertEqual(result.returncode, 1)
        self.assertIn("P0 is missing", result.stderr)


if __name__ == "__main__":
    unittest.main()
