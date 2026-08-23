from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from validate_entrance import validate_receipt


CONTRACT = """# Development Contract: Entrance gate
Contract ID: `S014`
Project: `solvys-factory`
Maturity: `spec-anchored`
Status: `approved`
Revision: `2`
Owner: `Factory integrator`
Decision owner: `TP`
Repository: `solvys-technologies/solvys-skills`
Base ref: `2026-08-09`
Base SHA: `fda95efca102878265d551ed22e292d7a62df6e7`
Dirty-state owner: `TP owns existing changes`
Required proof rung: `tests`
## SPEC - Functional contract
### Objective
Authorize valid implementation.
### Users and outcomes
- Agents receive a gate.
### In scope
- Entrance validation.
### Out of scope
- Product code.
### Assumptions
- The contract is local.
### Functional requirements
- FR-1: Reject an invalid contract.
### Acceptance scenarios
#### AC-1 - Gate implementation
Given an approved contract
When the entrance validator runs
Then implementation is authorized
### Edge and failure cases
- Missing evidence fails.
### Open questions
None
## PLAN - Technical contract
### Current source and accepted patterns
- Repository truth: current SHA.
### Architecture and contracts
- Link the contract from the receipt.
### Exact commands
- Focused test: `python3 -m unittest`
- Full validation: `bash scripts/validate-suite.sh`
- Build: Not applicable
- Runtime or Site: Not applicable
### Testing and proof
- Test valid and invalid receipts.
### Security, performance, and observability
- No secrets.
### Boundaries
- Always: validate the contract.
- Ask first: mutate providers.
- Never: bypass the gate.
### Risks and rollback
- Risk: stale receipt.
- Rollback: regenerate the receipt.
## TASKS - Ordered execution
### T1 - Validate the entrance
- Size: `S`
- Owner: `Factory integrator`
- Dependencies: `None`
- Files: `scripts/validate_entrance.py`
- Acceptance: `AC-1`
- Verify: run the focused test and expect PASS
- Checkpoint: test receipt
## Change log
- Revision 2: TP approved implementation.
"""

PROJECT_STATE = """---
version: 1
projectId: solvys-factory
stateRevision: 2
activeSprint: S014
sourceRef: 2026-08-09
sourceCommit: fda95efca102878265d551ed22e292d7a62df6e7
authorityEnvironment: test
syncStatus: aligned
lastVerifiedAt: 2026-08-11T00:00:01Z
latestReceipt: entrance-receipt.json
---

# Project state

## Current intent

Test the entrance gate.

## Current truth

The test fixture is aligned.

## Protected zones

None.

## Open gates

None.

## Next safe action

Run the validator.

## Breakthrough log

None.
"""


def receipt(contract_name: str) -> dict:
    return {
        "version": 1,
        "projectId": "solvys-factory",
        "threadId": "test-thread",
        "enteredAt": "2026-08-11T00:00:00Z",
        "lane": "CAO",
        "welcomeMatRead": True,
        "signRead": True,
        "repository": "solvys-technologies/solvys-skills",
        "baseRef": "2026-08-09",
        "sha": "fda95efca102878265d551ed22e292d7a62df6e7",
        "localPath": "/tmp/solvys-skills",
        "cloudEnvironment": "test",
        "sshRoute": "not applicable",
        "providerEnvironment": "not applicable",
        "dirtyStateOwner": "test owner",
        "requiredProofRung": "tests",
        "contextParity": {
            "path": "PROJECT-STATE.md",
            "stateRevision": 2,
            "sourceRef": "2026-08-09",
            "sourceCommit": "fda95efca102878265d551ed22e292d7a62df6e7",
            "syncStatus": "aligned",
            "verifiedAt": "2026-08-11T00:00:01Z",
            "latestReceipt": "entrance-receipt.json",
        },
        "infractionLedger": {"path": "/tmp/ledger.json", "openCount": 0},
        "developmentContract": {
            "path": contract_name,
            "maturity": "spec-anchored",
            "revision": 2,
            "status": "approved",
            "validatedAt": "2026-08-11T00:00:01Z",
            "validatorReceipt": "valid=true",
            "implementationAuthorized": True,
        },
        "operationsAuthorized": True,
    }


class EntranceValidationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.contract = self.root / "development-contract.md"
        self.contract.write_text(CONTRACT, encoding="utf-8")
        self.state = self.root / "PROJECT-STATE.md"
        self.state.write_text(PROJECT_STATE, encoding="utf-8")
        self.receipt = self.root / "entrance-receipt.json"

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def write_receipt(self, payload: dict) -> None:
        self.receipt.write_text(json.dumps(payload), encoding="utf-8")

    def test_valid_contract_authorizes_implementation(self) -> None:
        self.write_receipt(receipt(self.contract.name))
        result = validate_receipt(self.receipt, "solvys-factory", implementation=True)
        self.assertTrue(result["valid"], result["errors"])
        self.assertTrue(result["implementationAllowed"])

    def test_missing_contract_record_blocks_implementation(self) -> None:
        payload = receipt(self.contract.name)
        del payload["developmentContract"]
        self.write_receipt(payload)
        result = validate_receipt(self.receipt, "solvys-factory", implementation=True)
        self.assertIn("missing receipt field: developmentContract", result["errors"])

    def test_draft_contract_blocks_implementation(self) -> None:
        self.contract.write_text(CONTRACT.replace("Status: `approved`", "Status: `draft`"), encoding="utf-8")
        payload = receipt(self.contract.name)
        payload["developmentContract"]["status"] = "draft"
        self.write_receipt(payload)
        result = validate_receipt(self.receipt, "solvys-factory", implementation=True)
        self.assertTrue(any("Status must be approved" in error for error in result["errors"]))

    def test_stale_project_state_blocks_implementation(self) -> None:
        self.state.write_text(PROJECT_STATE.replace("syncStatus: aligned", "syncStatus: stale"), encoding="utf-8")
        payload = receipt(self.contract.name)
        payload["contextParity"]["syncStatus"] = "stale"
        self.write_receipt(payload)
        result = validate_receipt(self.receipt, "solvys-factory", implementation=True)
        self.assertTrue(any("syncStatus must be aligned" in error for error in result["errors"]))


if __name__ == "__main__":
    unittest.main()
