---
name: solvys-user-testing
description: Run Solvys end-to-end user-journey acceptance testing against inherited project specifications. Use for sprint acceptance, demos, product workflows, release closure, regression testing, and every completion decision that depends on a real user obtaining the client objective.
---

# Solvys User Testing

In Solvys language, user testing means end-to-end user-journey acceptance testing. The project specification owns the main client objective, full user journey, acceptance criteria, validation gates, authoritative resource map, current progress state, and regression journeys. A sprint or worktree inherits that authority. It cannot invent separate completion criteria.

## Required inputs

Before ordinary implementation or testing begins, require four durable files:

- A human-readable canonical project specification map in the project's Codex Cabinet documentation.
- A technical project specification map inside the owning internal, external, or exported codebase folder.
- `user-testing-context.json`: the compact inherited context for this sprint and worktree.
- `user-testing-record.json`: the evidence record produced by the worker and accepted by the orchestrator.

Both physical maps must carry the same specification revision and integrity-link ID. The canonical map stores the technical map path and SHA-256. The technical map stores the canonical map path, revision, and integrity-link ID. The context pins both paths and digests. A pointer-only record does not satisfy custody. Use [references/spec-map-contract.md](references/spec-map-contract.md) for the exact contract.

Run the validator in context mode before implementation:

```bash
python3 /Users/tifos/.codex/skills/solvys-user-testing/scripts/validate_user_testing.py \
  --cabinet-map /absolute/Codex-Cabinet/project-specification-map.json \
  --technical-map /absolute/codebase/project-specification-map.json \
  --context user-testing-context.json
```

The context must contain both current map paths and SHA-256 values; the shared revision and integrity-link ID; the parent objective and journey; the exact task sub-journey; inherited acceptance, validation, resource, progress, and regression identifiers; the test-data boundary; full routine approval posture; genuine human-only gates; required skills; acceptance branch; and next action. Missing, stale, incomplete, pointer-only, or independently invented context fails closed.

## Test the inherited journey

1. Read the parent objective and full journey from the canonical Cabinet map. Read the task sub-journey, gates, resource locations, and regression set from the linked technical map.
2. Use only the authoritative resources named by the inherited resource IDs. Verify each location before use.
3. Stay inside the declared test-data boundary. Record fixtures and real-provider effects separately.
4. Exercise the task sub-journey from entry to observable result. Include controls, permissions, persistence, reload or return behavior, error recovery, and external acknowledgement when required.
5. Run every inherited regression journey affected by the task.
6. For each failure, record the action, observed result, expected result, state, and earliest likely cause. Repair safely, restart only task-owned components, and rerun the full affected journey.
7. Write evidence by inherited criterion, validation gate, task sub-journey, and regression journey. Do not add completion criteria.

## Completion authority

The worker never declares completion. It may report only `ready-for-orchestrator-acceptance` after all evidence is present. The orchestrator validates the record against the same spec revision, manifest, sprint sub-journey, and regression set, then writes the acceptance decision.

```bash
python3 /Users/tifos/.codex/skills/solvys-user-testing/scripts/validate_user_testing.py \
  --cabinet-map /absolute/Codex-Cabinet/project-specification-map.json \
  --technical-map /absolute/codebase/project-specification-map.json \
  --context user-testing-context.json \
  --record user-testing-record.json \
  --require-acceptance
```

A normal final statement cannot bypass this command or the Factory Stop hook. Tests, builds, deployments, screenshots, and provider acknowledgements remain supporting proof.

## Approval posture

Routine in-scope implementation, testing, debugging, restart, and validation use the existing full approval posture. Waiting for approval for those actions is an orchestration failure.

Pause only for a new secret, MFA or consent, billing or a paid commitment, a client decision, rights, or an irreversible external action. Name the smallest human action and continue every safe path that does not depend on it.

For a product with no user-facing journey, the project specification must define the equivalent operational journey and evidence. A sprint cannot create this exception.
