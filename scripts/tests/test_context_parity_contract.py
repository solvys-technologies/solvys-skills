from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
STATE_VALIDATOR = REPO_ROOT / "scripts" / "validate_project_state.py"
STATE_TEMPLATE = REPO_ROOT / "factory" / "Factory Registry" / "Templates" / "PROJECT-STATE.md"
BREAKTHROUGH_SURFACES = (
    REPO_ROOT / "factory" / "canon" / "context-parity-contract.md",
    REPO_ROOT / "factory" / "Solvys Operations Handbook.md",
    REPO_ROOT / ".claude" / "skills" / "solvys-factory" / "SKILL.md",
    REPO_ROOT / ".claude" / "skills" / "communication-style-protocol" / "SKILL.md",
    REPO_ROOT / "SOLVYS_AGENT_SYSTEM_PROMPT.md",
)


class ContextParityContractTests(unittest.TestCase):
    def test_project_state_template_is_valid(self) -> None:
        result = subprocess.run(
            [sys.executable, str(STATE_VALIDATOR), "--state", str(STATE_TEMPLATE), "--template"],
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)

    def test_breakthrough_triggers_are_consistent(self) -> None:
        for path in BREAKTHROUGH_SURFACES:
            text = " ".join(path.read_text(encoding="utf-8").lower().split())
            self.assertIn("good job", text, str(path))
            self.assertIn("merge", text, str(path))
            self.assertIn("negative feedback", text, str(path))
            self.assertIn("own interpretation", text, str(path))

    def test_cao_requires_context_parity_before_mutation(self) -> None:
        cao = (REPO_ROOT / ".claude" / "skills" / "solvys-cao" / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("Check context parity", cao)
        self.assertIn("Only `aligned` allows mutation", cao)


if __name__ == "__main__":
    unittest.main()
