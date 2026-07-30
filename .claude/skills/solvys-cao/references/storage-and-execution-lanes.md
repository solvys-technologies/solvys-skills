# Storage And Execution Lanes

## Purpose

Select where work runs before creating a checkout, worktree, dependency store,
build cache, recording, or generated asset. The lane decision protects the Mac
while keeping planning local and implementation Cloud-first.

## Lane Order

1. **Cloud implementation:** default for every non-flagship implementation
   track once the exact base/checkpoint ref and turnkey pickup block exist.
2. **Fintheon external-local:** the current flagship exception for frontend or
   combined source-integrated work that needs Wonder/source transfer, port 7777,
   Mac/hardware behavior, deployment review, or installed-app verification.
3. **Cloud Fintheon compute:** allowed for backend-only deterministic or
   parallel compute from a pushed branch/ref and turnkey brief.
4. **Internal-local:** planning, executive, and marketing work only by default;
   implementation requires an enumerated exception, a healthy capacity gate,
   and projected peak growth under 2 GB.

Local implementation opens only for dirty super-sprint custody, Wonder/source
transfer, port 7777 or named-sandbox proof, Mac/hardware behavior, deployment
review, or installed-app verification. Record the reason, capacity/proof gates,
owner, protected zones, return path, and closure condition.

Backend-only and frontend plus backend are task shapes, not automatic local
lanes; the Cloud-first and Fintheon exception rules above decide custody.

## Capacity Gates

The worse byte or percentage threshold wins.

| State | Internal volume | CAO behavior |
| --- | --- | --- |
| Healthy | At least 40 GB and at least 15% free | Small internal-local work is allowed |
| Yellow | Below 40 GB or below 15% | Block new internal dependencies and full builds |
| Red | Below 20 GB or below 10% | Close internal-local for substantial work |
| Critical | Below 10 GB or below 5% | Freeze new internal workspaces and route to Cloud or external-local |

Keep at least 20 percent of `/Volumes/Ext.` free after projected peak use. Stop
before a heavy copy, install, build, Docker recovery, or media run when the
reservation would breach that floor. Serialize disk-intensive work.

## Workspace Roots

- Canonical codebases: `/Volumes/Ext./Codebases`
- Codex-managed worktrees: `/Volumes/Ext./CodexWorktrees/managed`
- Explicit tranche worktrees: `/Volumes/Ext./CodexWorktrees/{repo}-{sprint}-{tranche}`
- Quarantine and cold transcript archive: `/Volumes/Ext./SolvysOps/storage`
- Deployed always-on runtime bundles: `~/Library/Application Support/{Product}/runtime`
- Runtime logs: `~/Library/Logs/{Product}`

Verify the managed-worktree root from `git-worktree-root` in
`~/.codex/config.toml`. The installed Codex build does not use
`.codex-global-state.json` as the authoritative store for this setting.

Keep macOS system state, swap, Preboot, Cryptex, active Codex databases,
credentials, and supported Application Support in their native locations unless
a separate controlled migration is explicitly approved.

## Source Versus Always-On Runtime

External-first applies to source checkouts, worktrees, dependencies used for
development, builds, recordings, generated assets, and project-local caches. It
does not require a macOS LaunchAgent to execute a live repository directly from
a removable volume.

When an always-on service must survive external-drive permissions, disconnects,
or source edits:

1. Deploy a bounded, versioned runtime bundle to
   `~/Library/Application Support/{Product}/runtime`.
2. Keep its logs in `~/Library/Logs/{Product}`, never inside the source checkout.
3. Point installed LaunchAgents at the runtime bundle and verify their loaded
   definition, working directory, PID, exit state, and product health.
4. Treat runtime refresh as a deployment with an exact source commit, proof, and
   rollback. Never let a live daemon execute an arbitrary dirty checkout.
5. Keep the runtime bundle no larger than the files and dependencies required to
   operate the service. It is a controlled internal exception, not a second
   development workspace.

If external execution fails because of removable-volume or launch-service
permissions, restore the live service first, then create this deployment seam.
Do not force the source checkout back onto the internal disk.

## Tranche Contract

Each track or tranche records:

```markdown
- Execution lane: Cloud backend-only | external-local | internal-local
- Workspace path or Cloud branch:
- Estimated peak storage:
- Capacity reservation:
- Owner:
- Protected zones:
- Proof rung:
- Exit condition:
- Closure state: active | cooling | archive-eligible | protected
- Root preservation/sprint ref: refs/sprints/S###/P#
- Tranche/track checkpoint ref: refs/sprints/S###/T#/P#
- Date integration branch: YYYY-MM-DD
- Secrets manifest: variable names only
- Task/worktree/checkpoint/artifact/transcript/DMG/process/RAM budgets:
```

At a tranche boundary:

1. Record the exact commit, branch, PR state, proof reached, blockers, and
   protected zones.
2. Write a durable next-tranche handoff before a new session begins.
3. Reuse the exact prepared workspace or pushed Cloud branch. A new session
   does not justify another checkout.
4. Respect merge and external-evidence gates before opening the next tranche.
5. Mark the old workspace cooling after merge or explicit cancellation.
6. Do not manually delete any worktree that has been opened. The conversation
   sweep and Codex-managed retention own natural removal after the task is
   archived.

## Recovery And Restore Contract

- Maintain encrypted local-plus-cloud backup manifests for personal or unique
  state.
- Record source identity, encryption state, object/byte counts, hashes,
  readback, restore target, result, timestamp, and verifier.
- An upload is incomplete until a bounded restore and readback pass.
- Run restore drills on non-production targets.
- Before destructive reconstruction, personal/unique-state readback must pass.
  A mismatch or missing manifest stops the action.

## Resource Budgets

Use the enforceable defaults in `refresh-system.md`: one concurrent local
implementation task; at most one preview, one browser, two servers, and four
total task-owned processes per task; RAM ceilings of 75 percent peak and 65
percent sustained for five minutes; one DMG per product/sprint for at most 24
hours after verification; artifacts capped at 2 GB per task and 10 GB per
sprint; three checkpoints per track and twelve per sprint; one worktree per
track and four per sprint; and one active transcript per task.

At a ceiling, stop new launches, inventory exact task-owned resources,
gracefully stop task-owned processes oldest-first, verify PID exit, and use the
owning archival, control-plane retention, or recoverable cleanup lane. Never
kill unrelated/system processes or manually delete an opened worktree.

An override is valid only when the accepted sprint records reason, owner,
approver, start/end time, replacement ceiling, and cleanup/return condition.

## Ten-Day Conversation Sweep

Daily Terra inventory identifies tasks whose starting date is at least ten days
old.

- Tasks targeted by an active automation are protected from archival.
- Before an automation task is replaced, refresh its contract and memory into
  the canonical automation session, update the automation target, and pin the
  canonical session in Codex Desktop.
- Tasks that are not automation targets become archive candidates only after an
  explicit memory flush and reference check.
- Do not delete their worktrees directly. Archive the task and let Codex apply
  its managed-worktree lifecycle.
- A pinned, active, dirty, goal-owned, legally significant, client-evidence, or
  referenced task remains protected.

## Thirty-Day Transcript Sweep

Archived transcripts enter cold-storage review after 30 days of inactivity and
non-reference.

Before externalization or removal:

1. Confirm the task is archived, unpinned, inactive, outside automations and
   goals, and not referenced by an active brief, handoff, issue, or evidence
   packet.
2. Write one bounded durable memory note or rollout summary that preserves the
   useful lesson without copying secrets or full transcripts.
3. Copy to the external archive, record SHA-256 and size, compress,
   decompress-test, and verify the hash.
4. Quarantine the local original before final removal under the approved
   retention policy.

Terra reports candidates and approved actions only inside its own Codex task.
It does not create inventory report files, Slack messages, emails, or external
receipts.

## Terra Task Lifecycle

Terra runs daily in a standalone Codex task using `gpt-5.6-terra` with high
reasoning.

- The first three scheduled runs are inventory-only.
- Every result and exact action receipt stays in that run's Codex task.
- The task remains visible until TP explicitly says `flush memory`.
- After that prompt, write and verify at most one small memory extension note,
  post the final confirmation, then archive the current Codex task as the final
  action.
- Never flush or self-archive without the explicit prompt.
