# Daily Context Sync Contract

## Purpose

The daily sync preserves the context that becomes invaluable between sessions: repo changes, user corrections, non-technical learning, painful failures, Eureka moments, design canon candidates, skill changes, client-specific constraints, proof gaps, and automation drift.

## Inputs

- Git checkpoints and dirty state for Solvys/client repos changed since the previous run.
- Current branch, worktree, release, live, and installed truth where relevant.
- Date-only integration branch, task-owned checkpoint refs, exact base/commit
  SHAs, and clean closure receipts.
- Codex rollout summaries and prior-day user corrections.
- Automation definitions, latest-run memory, and control-room health.
- Internal and external capacity state, execution-lane reservations, the
  tranche/workspace registry, and ten-day conversation sweep candidates.
- Repo daily reflections, active briefs, review queues, and changelogs.
- Shared and repo-local design files.
- `solvys-skills` source versus installed global skill state.
- Existing memory notes and unresolved context from the prior daily ledger.

Run `python3 scripts/daily_context_inventory.py` for a read-only starting inventory. The synthesis still has to inspect the meaningful diffs and conversation evidence.

The default device scope covers repositories under `/Users/tifos/Documents/Codebases`, SSFitness, the HRight operating workspace, the Solvys Ops control room, and the recorded ShipTracker workspace. Missing or non-Git workspaces must remain visible in the output instead of disappearing from the daily picture.

## Required Output

Write one dated ledger with these sections:

1. **What materially changed** - user-visible or operating changes, not every commit.
2. **What TP learned in non-technical terms** - plain-language system model, analogy, and why it matters.
3. **Pain and Eureka** - failure, false proxy, root cause, repair, and new preventive rule.
4. **User corrections** - exact correction and affected scope.
5. **Memory promotions** - durable facts/preferences that deserve one ad-hoc memory note.
6. **Design promotions** - shared canon, repo-local canon, or no promotion, with evidence.
7. **Skill/protocol promotions** - procedures that future agents must execute in order.
8. **Client partitions** - facts that must not leak from one product into another.
9. **Proof gaps and review queue** - implemented but not live, live but not installed, or review still open.
10. **Tomorrow's handshake** - exact starting context, branch/worktree, next proof, and what not to redo.
11. **Storage and execution lanes** - internal/external pressure, Cloud
    backend-only routing, external-local frontend routing, workspace closure
    state, protected conversations, and transcript candidates that crossed the
    30-day inactivity/non-reference gate.

## Promotion Policy

- Write at most one small memory extension note per run, containing only durable corrections, preferences, or facts supported by current evidence.
- Update shared `Design.md` automatically only for an explicit TP correction or a lesson proven across at least two shipped/rendered surfaces. Otherwise create a proposed design change in the ledger.
- Update repo-local canon for product-specific rules with current source proof.
- Update a skill when sequence, role, or validation behavior must recur. Do not turn temporary status into a skill.
- Promote an explicit TP correction immediately to the smallest durable layer
  future agents load. Do not wait for recurrence when the correction is direct.
- Never rewrite canonical memory files directly; use the configured ad-hoc memory-note path.
- Preserve dirty work and do not commit, deploy, publish, complete issues, delete storage, or rotate secrets during the sync.
- Keep the daily storage inventory and action receipt inside the Terra Codex
  task. When TP explicitly prompts `flush memory`, write and verify at most one
  durable memory note, confirm it in that task, and archive the task as the final
  action.

## Drift Checks

The run fails visibly when:

- An automation registry claims a loop that has no current definition.
- An installed Solvys skill differs from canonical `solvys-skills` source without an explicit local override.
- Shared and repo-local design rules contradict without a recorded scope decision.
- The daily ledger claims a release/live/install state without checking the corresponding truth surface.
- A memory or design promotion lacks a supporting correction, source diff, rendered proof, or repeated pattern.
- A tranche has no execution lane, capacity reservation, workspace path or
  Cloud branch, owner, exit condition, and closure state.
- A Wonder preview is reported as source-integrated or port 7777 proof.
- A backup is reported complete from upload alone without encrypted
  local-plus-cloud manifests and restore/readback proof.
- A checkpoint omits workspace, base, date branch, commit/ref SHAs, changed
  files, validation, protected zones, name-only secrets status, proof rung,
  human gates, or exact clean status.
