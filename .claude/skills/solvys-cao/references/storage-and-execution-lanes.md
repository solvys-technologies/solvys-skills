# Storage And Execution Lanes

## Purpose

Choose the execution lane before creating a checkout, worktree, dependency
store, build cache, recording, generated asset, preview, or test surface. The
lane decision protects the Mac, keeps Solvys authority local, and keeps heavy
implementation in Cloud.

## Authority Map

- **Internal control authority:** `/Users/tifos/.codex`, including the writable
  `tools/solvys-skills` source, installed global skills, automation definitions,
  memories, and the future local-worktree root.
- **Cloud implementation authority:** repository-backed Codex Cloud Tasks with
  an exact repository, base/ref, detached checkout, checkpoint ref, and
  authenticated Git return route.
- **Solvys Main:** planning, coordination, browser review, receipts, and the
  project ChatGPT Site.
- **SSH:** a low-footprint transport to an approved Cloud or remote target. It
  does not authorize a second local checkout or background build.
- **Ext:** restored writable recovery storage. It is not an execution lane.

The internal source is the operating authority on this Mac. GitHub publication
remains a separate branch, owner, and proof-gated action. Existing Ext paths
are protected recovery references, never new authority.

## Lane Order

1. **Cloud implementation:** default for every repository change, test suite,
   build, dependency install, and parallel task.
2. **ChatGPT Site review:** default frontend sandbox, implementation check, and
   human-review surface for each project sandbox.
3. **Internal-local control:** planning, executive work, small non-repository
   artifacts, and explicitly approved Mac or installed-app proof only.
4. **Ext recovery:** bounded inspection or separately authorized recovery
   work. Never use it as a code, cache, build, server, or test lane.

Backend-only and frontend plus backend are task shapes. They do not create a
local exception. Repository-backed Cloud handles both by default.

## Capacity Admission

The worse byte or percentage threshold wins.

| State | Internal volume | Allowed local work |
| --- | --- | --- |
| Healthy | At least 40 GB and 15 percent free | One bounded local exception after admission |
| Yellow | Below 40 GB or 15 percent free | Planning and small control artifacts only |
| Red | Below 20 GB or 10 percent free | No substantial local work, cache, or build |
| Critical | Below 10 GB or 5 percent free | No local checkout, worktree, dependency store, build cache, preview, or server |

At red or critical capacity, use Cloud Tasks and the project ChatGPT Site. Do
not create a new local worktree to solve a disk problem. The current task's
capacity record names free bytes, free percent, projected peak, task-owned
processes, RAM state, CPU state, and return path.

Every storage sweep ends with one explicit user-facing total: `Total measured
storage freed this sweep: X.XX GB`. Calculate it from verified before-and-after
free-space measurements for each storage surface in scope, using decimal GB and
two decimal places. Report logical candidate size beside each path when useful,
but never use logical size as the sweep total. Print `0.00 GB` when the sweep
produces no measured free-space gain.

## Resource Admission

- Use one in-app browser and one active ChatGPT Site review per task.
- Normal frontend proof uses zero local previews and zero local test servers.
- A task may own at most two local helper processes, including one named SSH or
  transport helper. Extra helpers need a recorded reason and capacity check.
- Stop new local launches when task-owned RAM exceeds 65 percent, sustained RAM
  exceeds 55 percent for five minutes, or task-owned CPU exceeds 60 percent for
  three minutes. Route the next step to Cloud.
- Treat WindowServer above 25 percent CPU as a GPU-pressure warning. Reduce
  agent-owned visual work first. Never stop system visual processes or change
  macOS visual settings automatically.
- Do not stop a process until its task owner, listener/client state, active
  goal, automation, reference, and expected lifetime prove it is releasable.

## Workspace Roots

- Internal control root: `/Users/tifos/.codex`
- Writable Solvys skills source: `/Users/tifos/Documents/Solvys/Codebase Cabinet/solvys-skills`
- Global compatibility link: `/Users/tifos/.codex/tools/solvys-skills`
- Future managed local worktrees: `/Users/tifos/.codex/worktrees/managed`
- Runtime bundles: `~/Library/Application Support/{Product}/runtime`
- Runtime logs: `~/Library/Logs/{Product}`
- Automation and memory: `/Users/tifos/.codex/automations` and
  `/Users/tifos/.codex/memories`

Set `git-worktree-root` to the internal managed-worktree path. This only names
the local authority root. The capacity gate can still close local worktrees.
Do not use the compatibility symlink under `~/Documents/Codebases` when it
resolves to Ext.

## Ext Recovery Boundary

Ext stays recovery-only unless the dedicated recovery task holds the exact
authority and safety gates. Product, automation, and review tasks must not:

- use an Ext directory as a working directory, worktree, runtime, cache,
  dependency store, build output, preview server, or browser test target;
- unmount, repair, erase, repartition, bulk-copy, or migrate
  it; or
- stop unknown, recovery, upload, remote-transport, or user-owned processes to
  free the volume.

Treat an unavailable mount, unclear owner, missing readback, or active recovery
reference as protected. A readable Ext volume does not authorize a bulk backup,
repair, erase, or migration. A specific transfer requires its own user authority,
bounded target, manifest, and readback proof.

## Source Versus Always-On Runtime

Cloud owns routine source builds and implementation. An always-on service that
requires a Mac-local runtime uses a bounded, versioned bundle under
`~/Library/Application Support/{Product}/runtime`, with logs in
`~/Library/Logs/{Product}`.

1. Deploy the runtime from an exact source commit and record the rollback.
2. Point the LaunchAgent at the runtime bundle, never an Ext or dirty checkout.
3. Verify its loaded definition, working directory, PID, exit state, and product
   health.
4. Keep only the files and dependencies required to run it.
5. Treat the runtime refresh as a deployment. It does not create a second
   development workspace.

## ChatGPT Site Review

Every frontend sandbox has a unique project ChatGPT Site. Use the Site URL in
the Codex in-app browser for implementation checks. When it needs visual or
content review, generate a Site-derived local HTML artifact and run
`human-review` on that artifact automatically. Apply returned feedback to source
and refresh the Site before reporting the result.

The Site must be a 1:1 runnable representation of the accepted source or
product specification at the requested scope. Record the source-to-Site path,
route/state map, real-control checklist, desktop/mobile viewports,
fixture/provenance, and interaction receipt. Do not accept placeholders,
screenshots, dead controls, invented data, or close-enough substitutes as Site
proof.

`localhost`, port 7777, a local HTTP response, a screenshot, a Plasmic preview,
or a Builder/Wonder canvas cannot replace Site proof. Existing design artifacts
remain protected legacy inputs until TP explicitly chooses a source transfer.
Read [chatgpt-site-review.md](chatgpt-site-review.md) for the exact record and
truth-rung contract.

## Repository-Backed Codex Cloud

Cloud implementation requires the exact repository attachment, readable label,
opaque 32-character lowercase hexadecimal environment ID, requested base/ref,
detached checkout proof, authenticated Git publication route, task-owned
checkpoint ref, and matching return receipt. Projectless ChatGPT Work can make
research and standalone artifacts. It cannot mutate a repository.

## Tranche Contract

Each track records:

```markdown
- Execution lane: repository-backed Codex Cloud | internal-control | Ext-recovery
- Environment ID and label:
- Repository slug and attachment proof:
- Requested base/ref and detached-checkout proof:
- Authenticated Git publication route:
- Workspace path or Cloud branch:
- Estimated peak storage and capacity admission:
- Project ChatGPT Site URL and review state:
- Owner and protected zones:
- Task/worktree/checkpoint/artifact/transcript/process/RAM/CPU budgets:
- Proof rung, exit condition, and closure state:
- Root preservation and track checkpoint refs:
- Date integration branch:
- Secrets manifest: variable names only:
```

At a boundary, record exact commit/ref, proof reached, blockers, protected
zones, Site review state, and handoff. Reuse the prepared Cloud branch or
accepted workspace. Worktrees expire after four inactive days. At expiry,
notify the owner to commit and push, verify the remote or checkpoint receipt,
then archive the task and remove the worktree through Codex-managed retention.
Raw filesystem deletion is forbidden. Active, pinned, paused, blocked, dirty
unknown, recovery, credential, open-handle, provider, upload, failed-readback,
and unknown-owner worktrees remain protected and are reported as exceptions.

## Recovery And Restore Contract

Classify custody before backup. Solvys code uses remote Git and pushed Sprint
checkpoint refs. Preserve unpushed commits, dirty overlays, and unique non-Git
artifacts only when they have an identified owner and bounded target. A readable
or read-only external volume is never a bulk-recovery trigger.

An authorized bounded backup records source identity, encrypted manifest,
object and byte counts, hashes, readback, restore target, result, timestamp, and
verifier. Upload is incomplete until restore/readback passes. A readable external volume is not a bulk-recovery trigger. Never infer broad copy, repair,
erase, or migration authority from a recovery receipt.

## Resource Budgets

Use the capacity and resource limits above. At a breach:

1. Stop new local launches.
2. Inventory exact task-owned PIDs, paths, listeners, clients, refs, sizes, and
   owners.
3. Gracefully stop only proven idle task-owned helpers, oldest first, and verify
   each PID exit.
4. Archive finished tasks and transcripts through their owning lifecycle.
5. Keep current and rollback checkpoints. Let Codex manage opened-worktree
   retention.
6. Delete only an ordinary verified task-owned DMG when its exact deletion and
   absence receipts are allowed. Preserve release artifacts with their recorded
   retention contract.
7. Resume local work only after the measured state passes admission or a scoped
   override exists.

## Ten-Day Conversation Sweep

Daily maintenance identifies tasks at least ten days old. Automation targets,
active goals, pinned tasks, dirty work, client evidence, recovery activity, and
referenced sessions stay protected. Archive eligible tasks through Codex. Do not
delete their worktrees directly.

## Thirty-Day Transcript Sweep

Review archived transcripts only after 30 days of inactivity and non-reference.
Write at most one durable memory note, keep secrets out, and use the configured
local archive policy. Do not move transcript storage to Ext while it is recovery
only.

## Terra Task Lifecycle

Terra runs in its own Codex task. It measures capacity, memory, task-owned
processes, active browsers, Site-review helpers, skill drift, and automation
definitions. It performs only registered, exact, recoverable cache actions.
It reports uncertain ownership, missing Site records, Ext references, or drift
as protected blockers. It never self-archives or flushes memory without TP's
explicit `flush memory` instruction.
