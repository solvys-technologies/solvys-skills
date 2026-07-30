# Solvys Refresh System

## Purpose

Planning is the local control plane. Implementation is Cloud-first. Unique work
must remain recoverable, `main` must remain clean and deployable, risky actions
must stop for human proof, and every checkpoint must return an exact receipt.

This contract governs CAO, brief, orchestration, execution, run-point,
installation/design intake, sanitation, storage, and validation. A product or
repo may narrow it, but may not weaken its custody, proof, risk, or secret
boundaries.

## Searchable Sprint Identity

- Every task title and primary plan artifact uses `S### - concise context`.
- Use a filesystem-safe slug only where a path or tool cannot accept the title.
- Sprint numbers own tasks, worktrees, PR titles, commits, tracks, tranches,
  checkpoints, evidence, handoffs, and task-owned refs.
- Track labels remain subordinate to the sprint identity, for example
  `S166-T2`; they never replace the primary `S166 - concise context` identity.

## Plan-Mode Router

Plan mode selects the planning skill without requiring TP to name one:

- Auto-select `solvys-brief` for one bounded, single-owner sprint.
- Auto-select `solvys-orchestrate` for multi-track, parallel, long-running, or
  super-sprint work.
- Planning tasks create and freeze executable contracts. They do not implement
  product changes.

The exact command `Implement this plan` freezes the accepted plan revision. Do
not silently reinterpret scope after freeze. Dispatch every implementation-
eligible track to a task-owned Cloud worktree by default. A local planning track
may coordinate or review, but may not absorb implementation merely because it
already has context.

## Turnkey Cloud Pickup

Every implementation-eligible plan or track includes:

```markdown
## Cloud Pickup
- Sprint identity: S### - concise context
- Accepted plan revision:
- Repository:
- Base commit:
- Date integration branch: YYYY-MM-DD
- Task-owned checkpoint ref: refs/sprints/S###/P#
- Worktree mode: detached
- Owner:
- Protected zones:
- Dependencies:
- Secrets manifest (names only):
- Proof gates:
- Return path:
- Capacity and resource budget:
- Closure condition:
```

The checkpoint ref is exact and recovery-owned. Never put a secret value in a
pickup block, handoff, commit, issue, fixture, or receipt.

## Execution Lanes

All non-flagship implementation lanes default to Cloud.

Local opens only for an explicitly recorded need:

1. planning, executive, or marketing work;
2. dirty super-sprint custody;
3. Wonder or source transfer;
4. port 7777 or a named sandbox proof;
5. Mac or hardware behavior;
6. deployment review;
7. installed-application verification.

Every exception records its reason, capacity gate, proof gate, owner, protected
zones, and return path.

Fintheon remains the current flagship external-custody project. Its source-
integrated frontend and combined lanes may remain external-local. Backend-only
deterministic or parallel compute may offload to Cloud only from a pushed
branch or task-owned checkpoint ref with a turnkey brief.

## Branch, Ref, Worktree, And Closure Contract

- `main` is clean, protected, deployable, and never a development lane.
- The only human-facing integration branch name is `YYYY-MM-DD`.
- Do not create feature, recovery, product, incident, bug-description, prose,
  agent, runtime, or other contextual branches.
- Parallel work uses registered detached worktrees or exact task-owned refs such
  as `refs/sprints/S166/P1`.
- The daily integrator assembles accepted checkpoints onto the date branch.
- The daily backend aggregation PR is CI-gated and squashes at the PR boundary.
- The accepted daily backend aggregation produces one coherent CI/deployment
  receipt; deployment remains separately human-authorized.
- Merge and date-branch deletion require authorization. Accepted history is
  never force-rewritten for cosmetic cleanup.
- Preserve all existing refs, dirty-state provenance, and recoverable unique
  state.
- Repository closure requires exact `git status --short --branch` evidence and
  a clean worktree. "Looks clean" is not a receipt.

## Integration, Blacksmith, And Human Risk Gates

Blacksmith may autonomously apply a low-risk patch only when all are true:

- the change is deterministic, bounded, and reversible;
- rollback is exact and tested;
- tests are bounded to the affected contract and do not weaken broader gates;
- no protected surface is touched;
- no human-risk category below is involved.

Blacksmith eligibility is lost when a change touches migrations, destructive
writes, authentication, authorization, billing, secrets or provider
credentials, infrastructure, broad routing, security controls, irreversible
integrations, release/install behavior, or any declared protected surface.

Those categories require mandatory human verification before merge or deploy.
Automation may prepare evidence, but it may not convert preparation into
authorization.

## Backup, Restore, And Unique-State Gates

- Backups use encrypted local-plus-cloud manifests.
- A backup receipt records source identity, manifest identity, encryption
  state, object count, byte count, hashes, readback, restore target, restore
  result, timestamp, and verifier.
- "Uploaded" is never backup completion. Completion requires restore proof.
- Run scheduled restore drills against bounded non-production targets.
- Before destructive reconstruction, prove personal and unique-state readback.
  If readback is missing or mismatched, stop.
- Preserve dirty-state provenance, task artifacts, transcripts, and checkpoint
  refs until their retention and human gates pass.

## Resource Budgets

Every sprint or tranche records explicit budgets for:

- active tasks and task age;
- worktrees and retained checkpoints;
- artifacts and transcript storage;
- DMG/build artifacts;
- concurrent processes;
- peak RAM and sustained memory pressure.

Budget breaches stop new work and trigger a receipt-backed review. Task archival
and Codex-managed retention own opened-worktree removal; agents never manually
delete an opened worktree.

## Frontend Truth And Foundation

- Wonder is provisional co-design truth.
- TP selects the source transfer.
- Port 7777 or the explicitly named sandbox is source-integrated truth.
- BeUI is primary; Vercel UI is secondary.
- Bklit is the primary eligible visualization source; EvilCharts is secondary.
- Installed/source provenance, owner, target seam, fallback, proof, and
  protected zones are mandatory.
- A policy-only task records each foundation item as `not applicable` and does
  not invent or install UI dependencies.

## Durable Corrections And Secrets

The canned negation-then-correction repair phrase is banned. State the direct
correction and causal evidence without reproducing the banned template.

An explicit TP correction promotes directly to the smallest durable layer that
future agents will load: shared canon for universal behavior, repo canon for a
product rule, a skill for repeatable procedure, or memory for a durable personal
fact. Temporary state stays in the ledger. Do not wait for recurrence when the
correction is explicit.

Secrets are inventoried and reported by variable name only. Production,
unrelated-client, personal, signing, and machine-wide credentials are excluded
unless TP authorizes the exact item and purpose. Never expose, relocate, repair,
erase, rotate, or substitute credential values through implication.

## Exact Checkpoint Receipt

Every checkpoint and final handoff returns:

- workspace;
- exact base SHA;
- date branch;
- commit SHA and task-owned checkpoint ref SHA;
- changed files;
- validation commands and verbatim outcome summary;
- protected zones;
- secret-name manifest status;
- highest proof rung reached;
- remaining human gates;
- exact clean status.

Commit bodies state outcome, principal areas, proof, protected zones, and the
remaining blocker. Do not claim PR, merge, deployment, live, release, or
installed proof that did not occur.
