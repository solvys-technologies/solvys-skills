---
name: solvys-execute
description: Linear-native multi-track sprint orchestration. Use when an agent with Linear MCP access needs to plan, create, and manage a multi-track sprint entirely from within Linear — create issues, organize cycles, link briefs, and handle the state machine. No Cursor workflow required. Works wherever the agent has the Linear MCP tools available.
---

# Solvys Execute — Linear-Native Sprint Orchestration

## Refresh System Dispatch

Read `/solvys-cao/references/refresh-system.md`. This skill consumes an accepted
multi-track plan; it does not invent a second plan or self-assign
implementation. The primary sprint identity is `S### - concise context`.

The exact command `Implement this plan` freezes the accepted revision and
dispatches every repository implementation-eligible track to a task-owned,
repository-backed Codex Cloud environment/worktree by default. Projectless
ChatGPT Work is not a source lane. Each track must contain a complete turnkey
Cloud Pickup block before pickup. `main` is protected; the only human-facing
integration branch is `YYYY-MM-DD`; checkpoint custody uses root
`refs/sprints/S###/P#` preservation/sprint refs or
`refs/sprints/S###/T#/P#` tranche/track refs. The originating planning task is
never a valid implementation target. The command must create or assign each
task-owned Cloud worktree and return its pickup receipt; reject local targets
and recommendation-only results. Reject projectless ChatGPT Work and
connector-read-only preflight when repository files, source CI, commits, refs,
PRs, or a worktree are promised.

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



You are a sprint orchestrator that operates entirely through Linear MCP. Your job is to take a high-level sprint goal and turn it into a tracked, sequenced set of Linear issues with correct naming, cycle assignment, dependency links, @-brief references, and Beta Phase awareness.

This skill assumes you have access to the Linear MCP tool set (list_issues, save_issue, list_cycles, list_initiatives, list_projects, list_issue_statuses, list_issue_labels, list_teams, save_status_update, etc.). It does NOT require Cursor, a particular IDE, or a local repo — any agent with the Linear MCP can execute this.

## Greenfield Frontend Gate

For any new Solvys project or greenfield frontend track, Linear issues and local briefs must require `/solvys-discovery` plus the `refero-design` skill before implementation touches frontend files, writes CSS, generates UI, or treats a visual direction as implementation-ready. The issue or brief must cite the discovery artifact and Refero reference lock. If `refero-design` is missing, install it with `npx skills add https://github.com/referodesign/refero_skill`.

For every frontend change, require the Wonder sandbox when applicable before
source implementation. The issue records the agent-owned Wonder artboard,
disregards concurrent human-owned changes outside that scope, requires TP's
source-transfer authorization, and ends with source-integrated port 7777 proof.

## Execution And Storage Gate

Read the CAO `storage-and-execution-lanes.md` before pickup:

- Non-flagship implementation tracks use Cloud by default.
- Fintheon remains the current flagship external-custody exception; its
  backend-only deterministic/parallel compute may offload from an exact pushed
  ref and brief.
- Internal-local requires a healthy capacity gate and a projected peak under
  2 GB.
- Sound libraries stay on Ext, TP-selected sensitive music stays on the
  designated flash drive, and code custody uses Git plus bounded dirty-overlay
  preservation. A readable Ext volume never implies a bulk backup, repair,
  erase, or migration.
- Refuse repository pickup unless a repository-backed Codex Cloud environment
  supplies exact environment ID/label, repository slug and attachment proof,
  requested base/ref availability, detached checkout proof, authenticated Git
  publication route, date branch, task-owned checkpoint ref, capacity/resource
  budget, owner, dependencies, protected zones, name-only secrets manifest,
  excluded names/categories, purpose-specific authorization gates, proof gates,
  return path, exit condition, and closure state.

## Protocol

### Phase 0 — Discovery (via user questions)

Before creating anything, gather context from the user:

1. **Sprint number & phase**: what Sprint number are we on? Which Beta Phase? (Pre-Release / Closed Beta / Open Beta)
2. **Sprint goal**: what does this sprint accomplish in one sentence?
3. **Tracks**: list each track as a one-liner (e.g., "T1: Message queue system", "T2: Settings panel", etc.)
4. **Due date**: same-week Saturday for most issues, or specific date?
5. **Cycle**: which Linear cycle does this belong to? (If unknown, look it up via `list_cycles`)
6. **Initiative**: which Linear initiative owns this sprint? (Look up via `list_initiatives` if needed)
7. **Greenfield frontend gate**: if a track creates a new frontend/project, has `/solvys-discovery` run and does a `refero-design` reference lock exist, or should a blocking discovery/reference-lock issue be created first?
8. **Execution lane**: confirm Cloud dispatch for every eligible track and
   record any exact Refresh System local exception with its capacity/proof gate.
9. **Wonder target**: which file/page/artboard owns each frontend proposal, or
   why is Wonder not applicable?

Ask these in one batch using `AskUserQuestion` (2-4 per round, collect scope first then detail).

### Phase 1 — Recon (auto, query Linear)

Once you have the sprint parameters, query Linear to understand the current landscape:

```yaml
Queries to run:
1. list_teams → find the relevant team (e.g., "Solvys")
2. list_issue_statuses(team: "{team}") → find these status IDs:
   - "Backlog" or "Todo" (for new issues)
   - "In Progress (Solvys Agent)" (for local Codex CLI pickup)
   - "Awaiting Review" (for completion)
   - "Done" or "Completed" (for accepted work)
3. list_cycles(teamId: "{teamId}") → find the target cycle
4. list_initiatives → find the target initiative
5. list_issue_labels(team: "{team}") → find relevant labels (e.g., "sprint", "bug", "feature")
```

Save these mappings for Phase 2.

### Phase 2 — Issue Creation (Linear-wired)

For each track T{N}, create one Linear issue:

```yaml
Action: save_issue
Arguments:
  title: "S{SPRINT} - {Concise context} / T{N} - {Track description}"
  description: |
    ## Problem And Solution
    - **Original Problem**: {the user-visible problem}
    - **Solution**: {named implementation solution}
    - **Outcome Objective**: Deliver {solution} so {user} can {outcome}; the track owner is responsible for behavior, controls, validation, and design proof.
    - **Awaiting Review Source**: {issue ids or none}

    ## Context
    {2-4 sentence track summary}

    ## Sprint Context
    - **Sprint**: S{SPRINT}
    - **Beta Phase**: {phase}
    - **Track**: T{N}
    - **Due**: {due date}

    ## Acceptance Criteria
    1. The named solution resolves the original problem on the intended surface.
    2. Every requested or planned button/control performs the correct action through real interaction, including applicable loading, disabled, error, navigation, and persistence behavior.
    3. Shared and repo-local design canons were loaded before planning, and rendered desktop/mobile proof shows no canon violations; or Design impact is explicitly not applicable.
    4. {Track-specific criterion}

    ## Frontend Gate
    {If frontend/UI: read Design.md before planning and re-check before
    implementation; use Wonder when applicable, record the agent-owned target
    and ignored human changes, require TP source-transfer authorization, and
    verify on port 7777. If greenfield/new-project frontend: cite
    /solvys-discovery and the refero-design reference lock before touching
    frontend files.}

    ## Execution And Storage Lane
    - **Execution lane**: {Cloud default / explicit local exception}
    - **Workspace path or Cloud branch**: {exact value}
    - **Estimated peak storage**: {value}
    - **Capacity reservation**: {value}
    - **Exit condition**: {value}
    - **Closure state**: active

    ## Cloud Pickup
    - **Sprint identity**: S{SPRINT} - {concise context}
    - **Accepted plan revision**: {exact identity}
    - **Environment type**: repository-backed Codex Cloud
    - **Environment ID**: {exact id}
    - **Environment label**: {exact label}
    - **Repository slug**: {owner/repo}
    - **Repository attachment proof**: {exact proof}
    - **Base commit**: {sha}
    - **Requested base/ref availability proof**: {exact proof}
    - **Date integration branch**: {YYYY-MM-DD}
    - **Task-owned checkpoint ref**: refs/sprints/S{SPRINT}/T{N}/P#
    - **Checkout mode**: detached task-owned worktree
    - **Worktree mode**: detached
    - **Checkout proof**: {exact proof}
    - **Authenticated Git publication route**: {exact route}
    - **Owner**: {owner}
    - **Protected zones**: {zones}
    - **Dependencies**: {ids}
    - **Secrets manifest (names only)**: {names or none}
    - **Excluded secret names/categories**: {names/categories}
    - **Purpose-specific authorization gates**: {gates or none}
    - **Proof gates**: {gates}
    - **Return path**: {handoff target}
    - **Capacity and resource budget**: default ceilings | recorded sprint override
    - **Closure condition**: {condition}

    ## @ Constituent
    @sprint-md/S{SPRINT}-T{N}-{slug}.md (brief to be created locally before pickup)

    ## Dependencies
    {blockedBy or blocks refs}
  team: "{team name or ID}"
  cycle: "{cycle name, number, or ID}"
  priority: {1=Urgent, 2=High, 3=Medium, 4=Low per track complexity}
  labels: ["sprint", "t{N}", "{backend/frontend/infra as appropriate}"]
  dueDate: "{ISO date}"
  state: "{Backlog/Todo state ID}"
```

For the ORCH (developer context) track:

```yaml
title: "S{SPRINT} - {Concise context} / ORCH"
description: |
  ## Sprint Architecture
  {one-paragraph sprint overview}

  ## Wave Execution Order
  {Wave 1}: T1, T2 (parallel)
  {Wave 2}: T3 (after T1+T2)

  ## Unification
  {how tracks merge}

  ## Beta Phase
  {phase}
team: "{team name or ID}"
cycle: "{cycle name, number, or ID}"
priority: 1
labels: ["sprint", "orchestration"]
```

### Phase 3 — Dependency Wiring

After all issues exist, wire block/dependency relationships:

- If one track blocks another, use `save_issue` with `blocks: ["LIN-XXX"]` on the blocking issue
- Use `blockedBy: ["LIN-XXX"]` on the blocked issue
- The ORCH issue should relate to all tracks via `relatedTo`
- The final unification issue is blocked by every implementation issue and must not be optional.

### Phase 4 — Initiative Status Update (Debrief Marker)

Create an Initiative Status Update to mark the sprint start:

```yaml
Action: save_status_update
Arguments:
  initiative: "{initiative ID or name}"
  body: |
    **S{SPRINT}: {Sprint name}** — Launched {today's date}
    Beta Phase: {phase}
    Cycle: {cycle name}
    Tracks: {list all tracks}
  health: "onTrack"
```

### Phase 5 — Brief File Generation

For each track, also generate a `sprint-md/S{SPRINT}-T{N}-{slug}.md` file in the repo. This uses the existing `solvys-orchestrate` turnkey brief template structure. Each brief must include the `@sprint-md/` path that was referenced in the Linear issue description.

```markdown
# S{SPRINT} - {Concise context}

## Track T{N} - {Title}

## Problem And Solution
- **Original Problem**: {the user-visible problem}
- **Solution**: {named implementation solution}
- **Outcome Objective**: Deliver {solution} so {user} can {outcome}; this owner is responsible for behavior, controls, validation, and design proof.
- **Awaiting Review Source**: {issue ids or none}

## Context
{Why this track exists, 2-4 sentences}

## Linear Scope
- **Issue**: {LIN-XXX or SOL-XXX}
- **Beta Phase**: {phase}
- **Cycle**: {cycle name}
- **Due date**: {due date}

## Scope -- Included
- {feature list}

## Frontend Gate
- {If frontend/UI: Design.md gate status}
- {If greenfield/new-project frontend: /solvys-discovery artifact and refero-design reference-lock path/status}
- {Wonder status, file/page/artboard, agent-owned target, human changes ignored,
  accepted decision, source-transfer authorization, and port 7777 proof}

## Execution And Storage Lane
- **Execution lane**: {Cloud default / explicit local exception}
- **Workspace path or Cloud branch**: {exact value}
- **Estimated peak storage**: {value}
- **Capacity reservation**: {value}
- **Exit condition**: {value}
- **Closure state**: active

## Cloud Pickup
- **Sprint identity**: S{SPRINT} - {concise context}
- **Accepted plan revision**: {exact identity}
- **Environment type**: repository-backed Codex Cloud
- **Environment ID**: {exact id}
- **Environment label**: {exact label}
- **Repository slug**: {owner/repo}
- **Repository attachment proof**: {exact proof}
- **Base commit**: {sha}
- **Requested base/ref availability proof**: {exact proof}
- **Date integration branch**: {YYYY-MM-DD}
- **Task-owned checkpoint ref**: refs/sprints/S{SPRINT}/T{N}/P#
- **Checkout mode**: detached task-owned worktree
- **Worktree mode**: detached
- **Checkout proof**: {exact proof}
- **Authenticated Git publication route**: {exact route}
- **Owner**: {owner}
- **Protected zones**: {zones}
- **Dependencies**: {ids}
- **Secrets manifest (names only)**: {names or none}
- **Excluded secret names/categories**: {names/categories}
- **Purpose-specific authorization gates**: {gates or none}
- **Proof gates**: {gates}
- **Return path**: {handoff target}
- **Capacity and resource budget**: default ceilings | recorded sprint override
- **Closure condition**: {condition}

## Acceptance Criteria
- {criterion list}

## Validation Commands
```bash
# Fill in per-project (e.g. tsc --noEmit, vite build, bun run build)
```
```

Save all briefs to `sprint-md/S{SPRINT}-ORCHESTRATION.md` at the repo root.

## State Machine Integration

When an agent picks up one of these issues:

1. **Watcher scripts** (if available) detect `In Progress (Solvys Agent)` and launch Codex CLI locally.
2. Agent reads the issue + @-referenced brief
3. Agent implements in vertical slices
4. Agent posts an Initiative Status Update as debrief
5. Agent moves to `Awaiting Review`

If watcher scripts are not available (non-Cursor agent), the agent should manually:
- Move the issue to `In Progress (Solvys Agent)` on pickup
- Move to `Awaiting Review` when done
- Post a comment on the ORCH issue with a summary

### Validator Chain — Last Track Automation

The validator/orchestrator must watch the track set after every track completion.
When the last non-unification implementation track reaches `Awaiting Review`,
`Done`, or an explicitly accepted equivalent:

1. Verify every implementation track has a completion comment and passing validation evidence.
2. Move the final unification issue to `In Progress (Solvys Agent)` without waiting for another user command.
3. Comment on ORCH that unification has started and list the predecessor issue identifiers.
4. Do not mark implementation tracks `Done` yet; they remain reviewable until unification passes.

When the unification issue finishes and the validator accepts it:

1. Confirm the unification track reconciled all track outputs, ran the full validation gate, and posted results.
2. Move every reviewed implementation track plus the unification track to `Done` or the team's completed state.
3. Post one final ORCH/initiative status update that the sprint is unified and accepted.
4. Prepare the daily integration receipt. Routine accepted backend changes
   outside the named risk categories autonomously advance through green CI,
   daily PR squash merge, deployment, postcheck, clean-main proof, and only
   then automatic date-branch deletion. Every stage requires its receipt.
   Risk-category work hard-stops before merge, deployment, and deletion pending
   recorded human verification.

Blacksmith may autonomously patch only deterministic, bounded, reversible
low-risk work with exact rollback and bounded tests. Migrations, destructive
writes, auth/authorization, billing, credentials, infrastructure, broad
routing, security controls, irreversible integrations, release/install
behavior, protected surfaces, and other damaging/high-risk boundaries always
require human verification before merge, deployment, or date-branch deletion.

## STRICT GUARDRAIL — No Self-Assignment

The orchestrating agent that runs `/solvys-execute` MUST NOT pick up any track for implementation itself. This skill is for **orchestration only** — create the issues, wire dependencies, generate briefs, and stop.

**After the briefs are written and issues created, the orchestrator does exactly one thing: wait.** Do not begin implementing any track, even if no one else has picked it up yet. Do not "just start T1 since it's simple." Do not continue working unless the user explicitly tells you to start implementing.

If a track is not picked up by a CLI agent or another developer, the proper action is to **report that fact in the ORCH issue** and wait for user direction. The orchestrator's job ends when the sprint is created and briefs are available. Full stop.

Rationale: the orchestrator running this skill often has the broadest context (sprint architecture, all track boundaries). If it starts implementing one track while tracks remain unassigned, it creates a coordination gap — the implementing agent won't know the full sprint shape, and the orchestrator can't track status across all tracks. The sprint's state machine (`In Progress (Solvys Agent)` → `Awaiting Review` → validator acceptance) assumes each track has a dedicated pickup agent. Violating this assumption creates stale issues, missed dependencies, and unrecorded work.

## Graceful Degradation

- If `list_cycles` requires a `teamId` you don't have, call `list_teams` first to get it
- If `save_status_update` requires an initiative ID, call `list_initiatives` to find it
- If any tool is unavailable, skip that step and note it in the ORCH issue description
- If no team is specified, default is "Solvys" (Fintheon's Linear team)

## Cross-Reference

This skill is the Linear-native counterpart of `solvys-orchestrate`. The two share the same naming conventions, Beta Phase structure, and state machine. `solvys-orchestrate` handles the full Cursor workflow (plan mode, brief generation, wave execution). `solvys-linear-orchestrate` handles the Linear side: issue creation, cycle assignment, dependency wiring, and status updates. Use together for full coverage.

### Repository-backed Cloud identity invariant

For repository mutation, require the same actual repository-backed Codex Cloud
identity and repository attachment at pickup and return. Use a real opaque
32-character lowercase hexadecimal environment ID plus a separate readable
label; reject paths, `workspace:` and `/workspace/scratch/` identities, and
synthetic `codex-cloud-env-*` values. Cross-check repository slug, managed
workspace, requested base/ref, exact checked-out HEAD, clean-start proof,
detached checkout mode, publication route, return branch, task identity, and
checkpoint ref. Never call `main` the implementation lane. Projectless ChatGPT
Work and connector-only preflight are research/standalone-artifact lanes only.
