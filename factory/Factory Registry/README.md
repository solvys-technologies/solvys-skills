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

Triggered durable records use `Templates/skill-proposal.md` for `skill that`
roadblocks and `Templates/breakthrough-record.md` for C-Cab promotions. Link
both records from the active Sprint Unit or latest receipt.
