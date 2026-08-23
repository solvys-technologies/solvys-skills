# Solvys Factory Registry

This registry locates the current authority for every active project. Read it before following a path from an older task, document, or automation.

The registry records pointers and receipts. It does not duplicate secrets or product source.

## Required project records

- `WELCOME.md`
- `project-manifest.yaml`
- `source-registry.yaml`
- `provider-resource-manifest.yaml`
- `architecture-canvas.json`
- `control-inventory.json`
- `entrance-receipt.json`
- `development-contract.md`
- `sprint-unit.json`
- `work-window.json`
- `daily-sitrep.json`
- `infraction-ledger.json`
- `custody-receipt.json`

## Status language

Use `planned`, `approved`, `installed`, `configured`, `wired`, `tested`, `provider-verified`, `deployed`, `human-accepted`, `failed`, or `stale`.

Use `paused-for-factory-cutover` for product sessions that must wait for TP's recommencement cue.

Infraction entries use `open`, `in-progress`, `resolved`, or `accepted-risk`.
Keep one ledger per project. Merge repeated mechanisms by fingerprint and keep
the evidence events that explain each occurrence.

Record an event with `python3 scripts/record_infraction.py`; build the daily
ranked repair queue with `python3 scripts/sweep_infractions.py`. Both commands
write or read only the ledger paths you provide or the configured Factory
project root.

Use `python3 scripts/ensure_factory_ledgers.py` against the Factory Registry to
create zero-state ledgers and detect missing coverage. Use
`python3 scripts/validate_entrance.py --mutation` before any product,
repository, Wonder, provider, deployment, or credential mutation. A failed
entrance check permits diagnosis and repair only.

Every code or behavior change has one Development Contract based on
`Templates/development-contract.md`. Keep its SPEC functional, its PLAN
technical, and its TASKS small and ordered. Use `micro` for a self-contained
change that needs one short behavior scenario. Default substantial Solvys work
to `spec-anchored`, keep the contract beside the repository, and update its
revision before code when scope or architecture changes. Use `spec-as-source`
only when a proven generator or evaluator makes the spec authoritative.

Validate a draft or template with:

```bash
python3 scripts/validate_development_contract.py \
  --contract <path-to-development-contract>
```

Add `--implementation` to require an approved status, exact base SHA, resolved
questions, Given/When/Then scenarios, exact commands, boundaries, and S/M tasks.
Use `scripts/validate_entrance.py --implementation` to require both the entrance
receipt and its linked Development Contract before implementation.

Use `Templates/repair-handoff.json` for the single repair handoff shape. It
must name the original problem, evidence, earliest shared cause, owner, blocked
action, next safe action, and required acceptance proof.

Triggered durable records use `Templates/skill-proposal.md` for `skill that`
roadblocks and `Templates/breakthrough-record.md` for C-Cab promotions. Link
both records from the active Sprint Unit or latest receipt.
