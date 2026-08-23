#!/usr/bin/env python3
"""Validate a Factory entrance receipt before read-only or mutating work."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from validate_development_contract import validate_contract
from validate_project_state import validate_state


REQUIRED = ("projectId", "threadId", "enteredAt", "lane", "welcomeMatRead", "signRead", "repository", "baseRef", "sha", "localPath", "cloudEnvironment", "sshRoute", "providerEnvironment", "dirtyStateOwner", "infractionLedger", "requiredProofRung", "operationsAuthorized")


def contract_path(receipt_path: Path, value: str) -> Path:
    candidate = Path(value).expanduser()
    if candidate.is_absolute():
        return candidate.resolve()
    beside_receipt = (receipt_path.parent / candidate).resolve()
    if beside_receipt.exists():
        return beside_receipt
    return (Path.cwd() / candidate).resolve()


def validate_receipt(
    receipt_path: Path,
    project_id: str,
    *,
    mutation: bool = False,
    implementation: bool = False,
) -> dict:
    resolved_receipt = receipt_path.expanduser().resolve()
    errors: list[str] = []
    try:
        payload = json.loads(resolved_receipt.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"cannot read receipt: {exc}")
        payload = {}
    if payload.get("projectId") != project_id:
        errors.append("projectId does not match")
    for key in REQUIRED:
        value = payload.get(key)
        if value in (None, "", False, {}):
            errors.append(f"missing receipt field: {key}")
    ledger = payload.get("infractionLedger")
    if isinstance(ledger, dict) and int(ledger.get("openCount", 0)) < 0:
        errors.append("infractionLedger.openCount cannot be negative")
    mutation_required = mutation or implementation
    if mutation_required and payload.get("operationsAuthorized") is not True:
        errors.append("operationsAuthorized must be true for mutation")

    contract_summary = None
    context_summary = None
    if mutation_required:
        context = payload.get("contextParity")
        if not isinstance(context, dict):
            errors.append("missing receipt field: contextParity")
        else:
            for key in (
                "path",
                "stateRevision",
                "sourceRef",
                "sourceCommit",
                "syncStatus",
                "verifiedAt",
                "latestReceipt",
            ):
                value = context.get(key)
                if value in (None, "", False):
                    errors.append(f"missing contextParity field: {key}")
            state_path_value = context.get("path")
            if isinstance(state_path_value, str) and state_path_value:
                resolved_state = contract_path(resolved_receipt, state_path_value)
                state_result = validate_state(
                    resolved_state,
                    project_id=project_id,
                    expected_ref=payload.get("baseRef"),
                    expected_commit=payload.get("sha"),
                    require_aligned=True,
                )
                context_summary = {
                    "path": str(resolved_state),
                    "valid": state_result["valid"],
                    "syncStatus": state_result["metadata"].get("syncStatus"),
                }
                errors.extend(f"contextParity: {error}" for error in state_result["errors"])
                comparisons = {
                    "stateRevision": state_result["metadata"].get("stateRevision"),
                    "sourceRef": state_result["metadata"].get("sourceRef"),
                    "sourceCommit": state_result["metadata"].get("sourceCommit"),
                    "syncStatus": state_result["metadata"].get("syncStatus"),
                }
                for key, expected in comparisons.items():
                    actual = context.get(key)
                    if str(actual) != str(expected):
                        errors.append(f"contextParity.{key} does not match the project state")
    if implementation:
        development = payload.get("developmentContract")
        if not isinstance(development, dict):
            errors.append("missing receipt field: developmentContract")
        else:
            for key in (
                "path",
                "maturity",
                "revision",
                "status",
                "validatedAt",
                "validatorReceipt",
                "implementationAuthorized",
            ):
                value = development.get(key)
                if value in (None, "", False):
                    errors.append(f"missing developmentContract field: {key}")
            path_value = development.get("path")
            if isinstance(path_value, str) and path_value:
                resolved_contract = contract_path(resolved_receipt, path_value)
                contract_result = validate_contract(resolved_contract, implementation=True)
                contract_summary = {
                    "path": str(resolved_contract),
                    "valid": contract_result["valid"],
                    "acceptanceScenarioCount": contract_result["acceptanceScenarioCount"],
                    "taskCount": contract_result["taskCount"],
                }
                errors.extend(f"developmentContract: {error}" for error in contract_result["errors"])
                contract_metadata = contract_result.get("metadata", {})
                comparisons = {
                    "maturity": contract_metadata.get("Maturity"),
                    "revision": contract_metadata.get("Revision"),
                    "status": contract_metadata.get("Status"),
                }
                for key, expected in comparisons.items():
                    actual = development.get(key)
                    if str(actual) != str(expected):
                        errors.append(f"developmentContract.{key} does not match the contract")

    valid = not errors
    result = {
        "receipt": str(resolved_receipt),
        "projectId": project_id,
        "mutation": mutation_required,
        "implementation": implementation,
        "valid": valid,
        "errors": errors,
        "mutationAllowed": mutation_required and valid and payload.get("operationsAuthorized") is True,
        "implementationAllowed": implementation and valid,
        "developmentContract": contract_summary,
        "contextParity": context_summary,
    }
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--receipt", type=Path, required=True)
    parser.add_argument("--project-id", required=True)
    parser.add_argument("--mutation", action="store_true", help="Require a valid receipt for product mutation")
    parser.add_argument("--implementation", action="store_true", help="Require an approved linked Development Contract")
    args = parser.parse_args()
    result = validate_receipt(
        args.receipt,
        args.project_id,
        mutation=args.mutation,
        implementation=args.implementation,
    )
    print(json.dumps(result, indent=2))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
