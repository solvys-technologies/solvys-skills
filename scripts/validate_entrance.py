#!/usr/bin/env python3
"""Validate a Factory entrance receipt before read-only or mutating work."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED = ("projectId", "threadId", "enteredAt", "lane", "welcomeMatRead", "signRead", "repository", "baseRef", "sha", "localPath", "cloudEnvironment", "sshRoute", "providerEnvironment", "dirtyStateOwner", "infractionLedger", "requiredProofRung", "operationsAuthorized")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--receipt", type=Path, required=True)
    parser.add_argument("--project-id", required=True)
    parser.add_argument("--mutation", action="store_true", help="Require a valid receipt for product mutation")
    args = parser.parse_args()
    errors: list[str] = []
    try:
        payload = json.loads(args.receipt.expanduser().resolve().read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"cannot read receipt: {exc}")
        payload = {}
    if payload.get("projectId") != args.project_id:
        errors.append("projectId does not match")
    for key in REQUIRED:
        value = payload.get(key)
        if value in (None, "", False, {}):
            errors.append(f"missing receipt field: {key}")
    ledger = payload.get("infractionLedger")
    if isinstance(ledger, dict) and int(ledger.get("openCount", 0)) < 0:
        errors.append("infractionLedger.openCount cannot be negative")
    if args.mutation and payload.get("operationsAuthorized") is not True:
        errors.append("operationsAuthorized must be true for mutation")
    result = {"receipt": str(args.receipt.expanduser().resolve()), "projectId": args.project_id, "mutation": args.mutation, "valid": not errors, "errors": errors, "mutationAllowed": args.mutation and not errors and payload.get("operationsAuthorized") is True}
    print(json.dumps(result, indent=2))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
