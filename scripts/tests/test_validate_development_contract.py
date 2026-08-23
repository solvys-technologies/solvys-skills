from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from validate_development_contract import validate_contract


VALID_CONTRACT = """# Development Contract: Factory repair

Contract ID: `S014`
Project: `solvys-factory`
Maturity: `spec-anchored`
Status: `approved`
Revision: `1`
Owner: `Factory integrator`
Decision owner: `TP`
Repository: `solvys-technologies/solvys-skills`
Base ref: `2026-08-09`
Base SHA: `fda95efca102878265d551ed22e292d7a62df6e7`
Dirty-state owner: `TP owns existing changes`
Required proof rung: `tests`

## SPEC - Functional contract
### Objective
Deliver a validated contract.
### Users and outcomes
- Agents receive one contract.
### In scope
- Contract validation.
### Out of scope
- Product code.
### Assumptions
- The repository is available.
### Functional requirements
- FR-1: Reject an incomplete contract.
### Acceptance scenarios
#### AC-1 - Reject missing proof
Given an incomplete contract
When the validator runs
Then the validator returns a nonzero result
### Edge and failure cases
- Missing files fail closed.
### Open questions
None

## PLAN - Technical contract
### Current source and accepted patterns
- Repository truth: current SHA.
### Architecture and contracts
- One Markdown contract and one validator.
### Exact commands
- Focused test: `python3 -m unittest scripts.tests.test_validate_development_contract`
- Full validation: `bash scripts/validate-suite.sh`
- Build: `python3 -m py_compile scripts/validate_development_contract.py`
- Runtime or Site: Not applicable
### Testing and proof
- Unit tests cover fail-closed behavior.
### Security, performance, and observability
- No secrets are read.
### Boundaries
- Always: validate before implementation.
- Ask first: change external state.
- Never: accept unresolved questions.
### Risks and rollback
- Risk: false approval.
- Rollback: revert the validator change.

## TASKS - Ordered execution
### T1 - Add contract validation
- Size: `S`
- Owner: `Factory integrator`
- Dependencies: `None`
- Files: `scripts/validate_development_contract.py`
- Acceptance: `AC-1`
- Verify: run the focused test and expect PASS
- Checkpoint: focused test receipt

## Change log
- Revision 1: TP approved implementation.
"""


class DevelopmentContractTests(unittest.TestCase):
    def validate(self, text: str, *, implementation: bool = True) -> dict:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "development-contract.md"
            path.write_text(text, encoding="utf-8")
            return validate_contract(path, implementation=implementation)

    def test_approved_contract_passes(self) -> None:
        result = self.validate(VALID_CONTRACT)
        self.assertTrue(result["valid"], result["errors"])
        self.assertTrue(result["implementationAllowed"])

    def test_missing_then_fails(self) -> None:
        result = self.validate(VALID_CONTRACT.replace("Then the validator returns a nonzero result\n", ""))
        self.assertIn("AC-1 is missing Then", result["errors"])

    def test_open_question_blocks_implementation(self) -> None:
        result = self.validate(VALID_CONTRACT.replace("### Open questions\nNone", "### Open questions\nWhich runner owns this?"))
        self.assertIn("Open questions must be None before implementation", result["errors"])

    def test_large_task_fails(self) -> None:
        result = self.validate(VALID_CONTRACT.replace("- Size: `S`", "- Size: `XL`"))
        self.assertIn("T1 size must be S or M", result["errors"])

    def test_draft_blocks_implementation(self) -> None:
        result = self.validate(VALID_CONTRACT.replace("Status: `approved`", "Status: `draft`"))
        self.assertIn("Status must be approved before implementation", result["errors"])


if __name__ == "__main__":
    unittest.main()
