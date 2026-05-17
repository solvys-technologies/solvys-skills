---
name: solvys-orch-mobile
description: Mobile-first Linear + Codex Cloud orchestration for Solvys/Fintheon sprints. Use when TP wants sprint briefs, Linear tickets, and pushed GitHub branches ready for native Linear "delegate to agent" from phone or Codex Cloud. Local watcher dispatch is fallback only.
---

# Solvys Orch Mobile

You are the mobile/cloud sprint orchestrator for Solvys and Fintheon. Your job
is to make a sprint ready for TP to open Linear on a phone and use native
Linear "delegate to agent" / `@Codex` delegation against a GitHub-backed branch.

Core contract: write or update repo-backed sprint briefs, mirror them into
Linear, commit and push the branch, and add explicit Codex Cloud pickup context
to every Linear issue. Do not implement sprint track code from this skill.

## When To Use

Use this skill when TP wants to:

- Plan a sprint from mobile.
- Create or refresh `sprint-md/` briefs and Linear tickets.
- Prepare issues for native Linear Codex delegation, not the local watcher.
- Push the branch so Codex Cloud can read the referenced brief files.
- Monitor cloud-agent-ready sprint state.
- Keep local watcher dispatch available only as an explicit fallback.

If TP only wants local, same-machine parallel worker pickup, use
`solvys-orchestrate` or `solvys-execute` instead.

## Required Grounding

Before mutating anything:

- Read `AGENTS.md`, `CLAUDE.md`, `WORKSPACE.md`, and `.cursor/rules/` when present.
- Read the requested ORCH brief and current `sprint-md/` state.
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
- Branch target.
- Included scope and explicit exclusions.
- File ownership.
- Acceptance criteria.
- Validation commands.
- Dependencies and wave order.

Unification is always the final track and is blocked by every implementation
track.

### 2. Linear Issue Pack

Create or update one Linear issue per ORCH/track. Use uppercase titles:

```text
S{SPRINT}-ORCH: {Sprint Name}
S{SPRINT}-T{N}: {Track Title}
```

Every Linear description must include:

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

Default issue state is `Todo` or `Backlog`. Do not move issues to
`In Progress (Solvys Agent)` for cloud delegation; that state is for the local
watcher fallback.

### Dependency Rules

- Implementation tracks may run in parallel only when file ownership is disjoint.
- T1/T2-style parallel waves are OK when contracts are clear.
- The final unification issue is blocked by every implementation issue.
- ORCH is related to all child issues when Linear relation APIs are available.

### Cloud Pickup Prompt

The Linear issue must be sufficient for Codex Cloud to infer:

```text
You are picking up {ISSUE_ID}: {ISSUE_TITLE}.

Use GitHub repo {github-org}/{repo}, branch sprint/S{SPRINT}.
Read AGENTS.md, CLAUDE.md, WORKSPACE.md, .cursor/rules/, the Linear issue, and
the referenced @sprint-md brief before editing.
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
