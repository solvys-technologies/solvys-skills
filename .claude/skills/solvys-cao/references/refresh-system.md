# Solvys Refresh System

## Purpose

Planning is the local control plane. Implementation is Cloud-first. Unique work
must remain recoverable, `main` must remain clean and deployable, risky actions
must stop for human proof, and every checkpoint must return an exact receipt.

This contract governs CAO, brief, orchestration, execution, run-point,
installation/design intake, sanitation, storage, and validation. A product or
repo may narrow it, but may not weaken its custody, proof, risk, or secret
boundaries.

## Cross-Device Operating Context

The executive-management and development Codex accounts are peer lanes sharing
one operating brain. Most executive planning and consultation occurs on the
executive device. Research, development, implementation, technical proof,
repository work, and the connections and environments primarily configured on
the development Mac stay in that lane. The writable local doctrine source is
`/Users/tifos/Documents/Solvys/Codebase Cabinet/solvys-skills`.
`/Users/tifos/.codex/tools/solvys-skills` is its global compatibility link, and
`CAO Turnkey` in iCloud Drive `Cabinet` carries portable context. Live source, runtime, provider, credential,
and account truth remains with the owning device. `/Volumes/Ext.` is recovery
only and cannot become an operating source by implication.

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
already has context. Dispatch means creating or assigning the task-owned Cloud
worktree and returning its pickup receipt. A Cloud recommendation alone is not
dispatch. Repository implementation requires a repository-backed Codex Cloud
environment/worktree; a projectless ChatGPT Work VM is not an implementation
target.

## Turnkey Cloud Pickup

Every implementation-eligible plan or track includes:

```markdown
## Cloud Pickup
- Sprint identity: S### - concise context
- Accepted plan revision:
- Environment type: repository-backed Codex Cloud
- Environment ID:
- Environment label:
- Repository slug:
- Repository attachment proof:
- Base commit:
- Requested base/ref availability proof:
- Date integration branch: YYYY-MM-DD
- Task-owned checkpoint ref: refs/sprints/S###/P# | refs/sprints/S###/T#/P#
- Checkout mode: detached task-owned worktree
- Worktree mode: detached
- Checkout proof:
- Authenticated Git publication route:
- Owner:
- Protected zones:
- Dependencies:
- Secrets manifest (names only):
- Excluded secret names/categories:
- Purpose-specific authorization gates:
- Proof gates:
- Return path:
- Capacity and resource budget: default ceilings | recorded sprint override
- Closure condition:
```

The return receipt repeats environment ID and label, repository slug, exact
base, repository attachment proof, checkout mode/proof, authenticated Git
publication route, name-only secret manifest, excluded secret names/categories,
and purpose-specific authorization gates. The checkpoint ref is exact and
recovery-owned.

Preflight must prove that the environment itself has the repository attached,
the requested base/ref is available, detached checkout/worktree creation works,
and an authenticated Git publication route can push the promised commit, ref,
or branch. A structured connector that can read repository metadata or an exact
SHA but cannot provide checkout and publication transport is preflight-only.

Projectless ChatGPT Work may perform non-repository research, analysis, or
standalone artifact creation. It fails as an implementation target when the
plan changes repository files, creates commits/refs/PRs, runs source CI, or
promises a worktree.

Never put a secret value in a pickup block, handoff, commit, issue, fixture, or
receipt. Plans and receipts inventory variable names only. Use encrypted Cloud
environment secrets only for exact task-required values during setup. A value
may persist to runtime only when a reviewed setup script materializes a
least-privilege runtime file. Keep public/build configuration in environment
variables. Never bulk-copy production, trading, auth, database, provider-admin,
or destructive credentials merely because an environment exists; record
excluded names/categories and purpose-specific authorization gates.

## Execution Lanes

Repository implementation defaults to repository-backed Codex Cloud. Solvys
Main remains the local control, receipt, and ChatGPT Site review lane. SSH is a
transport path for Cloud work and never creates a second local build lane.

Internal-local work opens only for an explicitly recorded need:

1. planning, executive, or marketing work;
2. protected dirty custody that cannot enter Cloud;
3. an explicit legacy source transfer selected by TP;
4. Mac or hardware behavior;
5. deployment review;
6. installed-application verification.

Every exception records its reason, capacity gate, proof gate, owner, protected
zones, and return path. At less than 10 GB or 5 percent free internal capacity,
local checkout, worktree, dependency, build-cache, preview, and server creation
are closed. Use Cloud and the project ChatGPT Site.

Ext is unavailable as an implementation lane. Preserve existing Ext state and
recovery activity. Do not use it for Fintheon, any other product, or any new
cache, worktree, source, preview, or browser proof.

## Branch, Ref, Worktree, And Closure Contract

- `main` is clean, protected, deployable, and never a development lane.
- The only human-facing integration branch name is `YYYY-MM-DD`.
- Do not create feature, recovery, product, incident, bug-description, prose,
  agent, runtime, or other contextual branches.
- Root preservation or sprint-level checkpoints use
  `refs/sprints/S###/P#`, for example `refs/sprints/S166/P0`. Tranche or track
  checkpoints use `refs/sprints/S###/T#/P#`, for example
  `refs/sprints/S166/T1/P1`.
- Parallel work uses registered detached worktrees and exact task-owned track
  checkpoint refs.
- The daily integrator assembles accepted checkpoints onto the date branch.
- The daily backend aggregation PR is CI-gated and squashes at the PR boundary.
- The accepted daily backend aggregation produces one coherent CI/deployment
  receipt.
- Routine accepted backend changes outside the named human-risk categories
  autonomously complete this ordered lifecycle: green CI receipt, daily PR
  squash-merge receipt, deployment receipt, postcheck receipt, clean-main
  proof, then automatic date-branch deletion with a deletion/absence receipt.
  Date-branch deletion is forbidden until every earlier receipt passes. No
  separate human merge, deployment, or deletion authorization applies to this
  routine low-risk lane.
- Accepted history is never force-rewritten for cosmetic cleanup.
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
integrations, release/install behavior, any declared protected surface, or any
other damaging or high-risk boundary.

Those categories hard-stop before merge, deployment, and date-branch deletion
pending mandatory human verification. Automation may prepare their evidence,
but it may not convert preparation into authorization. Routine accepted backend
changes outside every category complete the receipt-gated autonomous lifecycle.

## Backup, Restore, And Unique-State Gates

- Custody classification precedes backup work: Ext stays recovery-only;
  personal media remains outside Solvys authority unless TP explicitly selects
  it; Solvys repositories use remote Git and pushed Sprint checkpoint refs,
  with bounded preservation for unpushed commits, dirty overlays, and unique
  non-Git artifacts only.
- A readable or read-only external volume does not trigger a full-volume,
  full-repository, or bulk-media backup. It also does not authorize repair,
  erase, migration, or duplicate checkout creation.
- Only the exact bounded asset set TP explicitly selects for Cloud backup uses
  an encrypted manifest.
- A backup receipt records source identity, manifest identity, encryption
  state, object count, byte count, hashes, readback, restore target, restore
  result, timestamp, and verifier.
- "Uploaded" is never backup completion. Completion requires restore proof.
- Run scheduled restore drills against bounded non-production targets.
- Before an explicitly authorized destructive reconstruction, prove the
  affected unique state reached its selected custody target. Without a
  destructive action, this gate cannot manufacture a bulk backup project.
- Preserve dirty-state provenance, task artifacts, transcripts, and checkpoint
  refs until their retention and human gates pass.

## Resource Budgets

These default ceilings apply unless the accepted sprint records an explicit
override with reason, owner, approver, start/end time, replacement ceiling, and
cleanup/return condition:

| Resource | Default ceiling |
| --- | --- |
| Concurrent local implementation tasks | 0 at critical capacity; 1 after a healthy admission check |
| Task-owned preview processes | 0 for normal frontend proof |
| Task-owned browser processes | 1 in-app Site review per task |
| Task-owned server processes | 0 for normal frontend proof |
| Total task-owned preview/browser/server processes | 2 per task, including one named transport/helper when needed |
| Peak RAM pressure | 65 percent |
| Sustained RAM pressure | 55 percent for 5 minutes |
| Task-owned CPU | 60 percent for 3 minutes before Cloud handoff |
| WindowServer GPU proxy | report above 25 percent; never stop system visual processes automatically |
| DMGs | 1 per product/sprint; 0 hours after verification |
| Reproducible artifacts | 2 GB per task and 10 GB per sprint |
| Retained checkpoints | 3 per track and 12 per sprint |
| Active worktrees | 1 per track and 4 per sprint |
| Active transcripts | 1 per task; retention follows the transcript sweep |

At or above a ceiling:

1. stop new task, worktree, preview, browser, server, build, and artifact
   launches;
2. inventory the exact task-owned PIDs, paths, refs, sizes, and owners;
3. gracefully stop task-owned preview/browser/server processes, oldest first,
   and verify PID exit; never kill unrelated or system processes;
4. close or archive finished tasks and transcripts through their owning
   lifecycle;
5. allow Codex-managed retention to remove opened worktrees; never manually
   delete one;
6. retain current and rollback checkpoints, and mark superseded refs for
   control-plane retention rather than deleting them;
7. immediately delete every ordinary verified DMG and return both deletion and
   absence receipts; retain one only when that exact DMG is explicitly
   classified as a retained release artifact with path, SHA-256, release
   identity, scope, owner, retention end, and classification receipt;
8. move reproducible artifacts through the approved recoverable cleanup lane;
9. resume only after the measured state is below the ceiling or a recorded
   sprint override is active.

## Frontend Truth And Foundation

- A project-owned ChatGPT Site is the frontend sandbox, check, and review truth.
- The Site must be a 1:1 runnable representation of the accepted source or
  product specification at the requested scope. Match copy, geometry, data
  meaning, routes, controls, states, responsive behavior, accessibility, and
  interaction feedback. Reject placeholder or fake product behavior.
- Site acceptance requires a source-to-Site path, route/state map, real-control
  checklist, desktop/mobile viewport record, fixture/provenance record, and
  Site interaction receipt. Missing evidence blocks deployment or review.
- Open `human-review` on a Site-derived local HTML review artifact automatically when visual or content review is needed.
- Wonder owns new frontend proposals and their diffs before Site deployment. Existing Builder and Plasmic artifacts remain legacy inputs until TP selects a source transfer.
- Localhost and port 7777 cannot satisfy frontend review or acceptance proof.
- BeUI Pro is primary with BeUI fallback; Motionary.dev is secondary with
  ascertainty UI fallback.
- Bklit is the primary eligible visualization source; EvilCharts is the
  secondary fallback.
- Library installation and no-fit custom-block records are required before
  frontend implementation.
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

### Repository-backed identity correction

Repository mutation is authorized only when pickup and return identify the same
actual repository-backed Codex Cloud environment and repository attachment.
Record a 32-character lowercase hexadecimal opaque environment ID separately
from its human-readable environment label. Reject path IDs, `workspace:` IDs,
IDs containing `/workspace/scratch/`, and synthetic `codex-cloud-env-*` labels.
Both receipts must cross-match environment type/ID/label, repository slug,
managed workspace, requested base/ref, exact checked-out HEAD, clean-start
status, detached checkout mode, publication route, return branch, task identity,
and checkpoint ref. `main` is protected and can never be named as the
implementation lane. Projectless ChatGPT Work and connector-only access remain
valid for research or standalone artifacts only, never repository mutation.
