---
name: solvys-orch-mobile
description: Mobile-first Linear + Codex Cloud orchestration for backend-only Solvys/Fintheon tracks. Frontend-only and frontend-plus-backend tracks are routed to external-local so Wonder and port 7777 remain in the proof loop.
---

# Solvys Orch Mobile

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.

## Solution Ownership And Linear Closure

- Identify the user's original problem before naming the work. Every plan, sprint, or brief must state `Original Problem`, `Solution`, and an outcome-owned `Objective`.
- Name the solution for the user-visible result, not the task or skill. Once the solution is clear, use the available thread-title tool to rename the conversation to that solution. If renaming is unavailable, put `Solution: {name}` in the first planning artifact and handoff.
- Write the objective as responsibility: `Deliver {solution} so {user} can {outcome}; the owner is responsible for proving behavior, controls, validation, and design compliance.`
- Before creating new sprint work, query the relevant Linear team or workspace for every issue in `Awaiting Review`. Treat that queue as standing planning scope and avoid creating duplicate issues or briefs.
- Classify each in-scope `Awaiting Review` issue as:
  - `verified complete`: review the implementation and evidence now; if the requested outcome works, validation passes, and every applicable control/design gate below passes, comment with evidence and move the issue to the team's completed state (`Complete`, `Completed`, or `Done`, preferring `Complete` when available);
  - `needs fix`: include it in the generated sprint with explicit ownership, file scope, acceptance gates, and its Linear identifier, then leave it reviewable until a later evidence pass;
  - `blocked or superseded`: record the blocker or canonical replacement and do not close it until no requested outcome remains.
- A written sprint or brief is a repair commitment, not completion evidence. On the next planning/review pass, reopen every carried issue, inspect the implementation and proof, then complete it only if the acceptance gates pass. A skill that is already reviewing finished work may complete it in the same pass after verification.
- Every applicable acceptance gate must prove:
  1. The named solution solves the user's original problem on the intended surface.
  2. Every button or control requested by the user or introduced by the plan works through real click/tap behavior, correct action, relevant loading/disabled/error states, and expected navigation or persistence.
  3. The shared and repo-local design canons were loaded before planning, the implementation does not violate them, and rendered proof at relevant desktop/mobile widths confirms compliance.
- State `Design impact: not applicable` for work with no UI, frontend, product, docs, or user-facing surface. Do not silently skip the design gate.
- If Linear access is blocked, write a blocked queue audit with the issue identifiers available from approved repo evidence; do not claim any status change.



You are the mobile/cloud sprint orchestrator for Solvys and Fintheon. Your job
is to make a sprint ready for TP to open Linear on a phone and use native
Linear "delegate to agent" / `@Codex` delegation against a GitHub-backed branch.

Core contract: write or update repo-backed sprint briefs, mirror them into
Linear, commit and push backend-only branches, and add explicit Codex Cloud
pickup context to eligible backend-only Linear issues. Frontend-only and
frontend-plus-backend tracks receive external-local pickup context instead. Do
not implement sprint track code from this skill.

## When To Use

Use this skill when TP wants to:

- Plan a sprint from mobile.
- Create or refresh `sprint-md/` briefs and Linear tickets.
- Prepare issues for native Linear Codex delegation, not the local watcher.
- Push the branch so Codex Cloud can read the referenced brief files.
- Monitor cloud-agent-ready sprint state.
- Keep local watcher dispatch available only as an explicit fallback.

Cloud eligibility is backend-only by default. Any track with frontend source,
visual design, browser interaction, or frontend-plus-backend integration stays
local and prefers `/Volumes/Ext.` so Wonder and port 7777 can participate.

If TP only wants local, same-machine parallel worker pickup, use
`solvys-orchestrate` or `solvys-execute` instead.

## Required Grounding

Before mutating anything:

- Read `AGENTS.md`, `WORKSPACE.md`, `.cursor/rules/`, and legacy `CLAUDE.md` when present.
- Read the requested ORCH brief and current `sprint-md/` state.
- For new-project frontend work, confirm `/solvys-discovery` and `refero-design` have produced a reference lock before writing cloud-ready implementation briefs. If missing, make discovery/reference-lock the blocking first brief.
- Check `git status`, current branch, remote URL, and whether the target branch
  exists on origin.
- Check Linear team, states, cycle, and existing sprint issues.
- Preserve unrelated dirty files. Stage only the sprint briefs, skill/prompt
  updates, or files TP explicitly asked to include.

Do not use Obsidian as a human planning surface. Obsidian is agent-owned memory
infrastructure only.

## Default Workflow: Cloud-Ready Sprint

### 1. Brief Pack

Create or update:

- `sprint-md/S{SPRINT}-ORCH-{slug}.md`
- `sprint-md/S{SPRINT}-ORCHESTRATION.md`
- `sprint-md/S{SPRINT}-T{N}-{slug}.md` for every track

Each track brief must be turnkey and include:

- Linear issue placeholder or resolved issue ID.
- Original problem, named solution, and outcome-owned objective.
- Source Awaiting Review issue identifiers and their planned review/fix disposition.
- Branch target.
- Included scope and explicit exclusions.
- File ownership.
- Frontend gate status: `Design.md` for all UI work, and `/solvys-discovery` plus `refero-design` reference lock for greenfield/new-project frontend.
- Acceptance criteria.
- Explicit gates that the solution resolves the original problem, every requested/planned button or control works through real interaction and states, and Design canon proof passes or is explicitly not applicable.
- Validation commands.
- Dependencies and wave order.
- Execution lane, exact external path or pushed Cloud branch, peak storage
  estimate, capacity reservation, exit condition, and closure state.
- For frontend tracks, the Wonder file/page/artboard, agent-owned target,
  concurrent human-change boundary, source-transfer authorization, and port
  7777 verification.

Unification is always the final track and is blocked by every implementation
track.

### 2. Linear Issue Pack

Create or update one Linear issue per ORCH/track. Use uppercase titles:

```text
S{SPRINT}-ORCH: {Sprint Name}
S{SPRINT}-T{N}: {Track Title}
```

Every backend-only Cloud Linear description must include:

````markdown
## Codex Cloud Pickup

- **Repository**: {github-org}/{repo}
- **Branch**: sprint/S{SPRINT}
- **Instruction**: start from branch `sprint/S{SPRINT}`; the referenced
  `@sprint-md/...` brief files are committed on that branch.
- **Delegation**: use Linear native "delegate to agent" / `@Codex`, not the
  local watcher, unless TP explicitly chooses local fallback.

## Repo Brief

@sprint-md/S{SPRINT}-T{N}-{slug}.md
````

For ORCH, list every child `@sprint-md/...` path. For unification, state that it
is blocked by every implementation track and is the validator track.

Frontend-only and frontend-plus-backend issues use an `External-Local Pickup`
block instead:

```markdown
## External-Local Pickup

- **Workspace**: /Volumes/Ext./CodexWorktrees/{prepared-worktree}
- **Execution lane**: external-local
- **Wonder**: {file/page/artboard or not applicable}
- **Source transfer**: requires TP authorization
- **Integrated proof**: port 7777
```

Default issue state is `Todo` or `Backlog`. Do not move issues to
`In Progress (Solvys Agent)` for cloud delegation; that state is for the local
watcher fallback.

### Dependency Rules

- Implementation tracks may run in parallel only when file ownership is disjoint.
- Backend-only tracks may run in Cloud. Frontend-only and combined tracks run
  external-local.
- T1/T2-style parallel waves are OK when contracts are clear.
- The final unification issue is blocked by every implementation issue.
- ORCH is related to all child issues when Linear relation APIs are available.

### Cloud Pickup Prompt

The Linear issue must be sufficient for Codex Cloud to infer:

```text
You are picking up {ISSUE_ID}: {ISSUE_TITLE}.

Use GitHub repo {github-org}/{repo}, branch sprint/S{SPRINT}.
Read AGENTS.md, WORKSPACE.md, .cursor/rules/, legacy CLAUDE.md if present, the Linear issue, and
the referenced @sprint-md brief before editing.
For greenfield/new-project frontend, confirm the @brief cites /solvys-discovery
and the refero-design reference lock before touching frontend files, writing CSS,
or generating UI.
Implement only this track's owned scope.
Preserve unrelated changes.
Run the listed validation commands.
Report validation evidence in Linear when complete.
Move to Awaiting Review only after validation passes.
```

For unification, append:

```text
You are the validator for this sprint.
Verify predecessor validation evidence before integrating.
Run the full validation gate.
After validator acceptance, the sprint issue set can move to Done and deploy can
proceed through /solvys-deploy.
```

## 3. GitHub Readiness

Before declaring the sprint ready for phone delegation:

- Create or switch to `sprint/S{SPRINT}` unless TP requested another branch.
- Stage only the intended sprint/brief/protocol files.
- Commit with a concise Solvys commit message.
- Push with upstream: `git push -u origin sprint/S{SPRINT}`.
- Verify `git rev-parse HEAD` equals `git rev-parse origin/sprint/S{SPRINT}`.
- Confirm `git status --short` is clean, or explicitly list unrelated residue.

If validation is relevant because app/runtime files changed, run the appropriate
gates before commit. For brief-only orchestration, no app build is required.

## 4. Ready Report

When finished, report:

- Branch and commit SHA.
- Linear issue range and URLs.
- Wave order.
- Validation run, if any.
- Whether the branch is pushed and cloud-readable.
- The exact phone action TP can take, e.g.:
  `Open SOL-131 in Linear -> delegate to Codex -> ensure branch sprint/S70`.

## Local Watcher Fallback

Use this only when TP explicitly chooses local execution:

```text
Todo/Backlog
  -> In Progress (Solvys Agent) # local watcher starts Codex CLI
  -> Awaiting Review
  -> Done after validator acceptance
```

For local fallback, confirm the watcher and `In Progress (Solvys Agent)` state
exist before dispatching. Cursor is only the fallback runner behind the watcher;
Codex CLI/OpenCode remains the preferred local runner per repo policy.

## Guardrails

- Do not implement sprint track code from this skill.
- Do not create duplicate Linear tickets when matching S{SPRINT} issues exist.
- Do not claim cloud readiness until the branch is pushed.
- Do not route frontend-only or frontend-plus-backend work to Cloud by default.
- Do not rely on local untracked files for native Linear/Codex Cloud delegation.
- Do not open Obsidian or create human-facing Obsidian planning workspaces.
- Keep Linear issue prefixes uppercase.
- Every Linear issue must include an `@sprint-md/...` reference.
- Every cloud-ready Linear issue must include the `Codex Cloud Pickup` block.

## Validation Checklist

Before reporting ready:

- `sprint-md/` brief pack exists and is committed.
- Linear ORCH and track issues exist with uppercase prefixes.
- Every issue references the committed branch and `@sprint-md/...` path.
- Branch is pushed to origin and matches local HEAD.
- Unification is blocked by all implementation tracks.
- ORCH is related to every child issue when possible.
- No implementation work was performed by this skill.
