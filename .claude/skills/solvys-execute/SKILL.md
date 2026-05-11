---
name: solvys-execute
description: Linear-native multi-track sprint orchestration. Use when an agent with Linear MCP access needs to plan, create, and manage a multi-track sprint entirely from within Linear — create issues, organize cycles, link briefs, and handle the state machine. No Cursor workflow required. Works wherever the agent has the Linear MCP tools available.
---

# Solvys Execute — Linear-Native Sprint Orchestration

You are a sprint orchestrator that operates entirely through Linear MCP. Your job is to take a high-level sprint goal and turn it into a tracked, sequenced set of Linear issues with correct naming, cycle assignment, dependency links, @-brief references, and Beta Phase awareness.

This skill assumes you have access to the Linear MCP tool set (list_issues, save_issue, list_cycles, list_initiatives, list_projects, list_issue_statuses, list_issue_labels, list_teams, save_status_update, etc.). It does NOT require Cursor, a particular IDE, or a local repo — any agent with the Linear MCP can execute this.

## Protocol

### Phase 0 — Discovery (via user questions)

Before creating anything, gather context from the user:

1. **Sprint number & phase**: what Sprint number are we on? Which Beta Phase? (Pre-Release / Closed Beta / Open Beta)
2. **Sprint goal**: what does this sprint accomplish in one sentence?
3. **Tracks**: list each track as a one-liner (e.g., "T1: Message queue system", "T2: Settings panel", etc.)
4. **Due date**: same-week Saturday for most issues, or specific date?
5. **Cycle**: which Linear cycle does this belong to? (If unknown, look it up via `list_cycles`)
6. **Initiative**: which Linear initiative owns this sprint? (Look up via `list_initiatives` if needed)

Ask these in one batch using `AskUserQuestion` (2-4 per round, collect scope first then detail).

### Phase 1 — Recon (auto, query Linear)

Once you have the sprint parameters, query Linear to understand the current landscape:

```yaml
Queries to run:
1. list_teams → find the relevant team (e.g., "Solvys")
2. list_issue_statuses(team: "{team}") → find these status IDs:
   - "Backlog" or "Todo" (for new issues)
   - "In Progress" (for active work)
   - "In Progress (Cursor CLI)" (for agent-claimed work)
   - "Awaiting Review" (for completion)
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
  title: "S{SPRINT}-T{N}: {Track description}"
  description: |
    ## Context
    {2-4 sentence track summary}

    ## Sprint Context
    - **Sprint**: S{SPRINT}
    - **Beta Phase**: {phase}
    - **Track**: T{N}
    - **Due**: {due date}

    ## Acceptance Criteria
    1. {Criterion 1}
    2. {Criterion 2}

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
title: "S{SPRINT}-ORCH: Developer context - {Sprint name}"
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
# Sprint Brief: S{SPRINT}-T{N} -- {Title}

## Context
{Why this track exists, 2-4 sentences}

## Linear Scope
- **Issue**: {LIN-XXX or SOL-XXX}
- **Beta Phase**: {phase}
- **Cycle**: {cycle name}
- **Due date**: {due date}

## Scope -- Included
- {feature list}

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

1. **Watcher scripts** (if available) detect `In Progress` → auto-move to `In Progress (Cursor CLI)`
2. Agent reads the issue + @-referenced brief
3. Agent implements in vertical slices
4. Agent posts an Initiative Status Update as debrief
5. Agent moves to `Awaiting Review`

If watcher scripts are not available (non-Cursor agent), the agent should manually:
- Move the issue to `In Progress (Cursor CLI)` on pickup
- Move to `Awaiting Review` when done
- Post a comment on the ORCH issue with a summary

## Graceful Degradation

- If `list_cycles` requires a `teamId` you don't have, call `list_teams` first to get it
- If `save_status_update` requires an initiative ID, call `list_initiatives` to find it
- If any tool is unavailable, skip that step and note it in the ORCH issue description
- If no team is specified, default is "Solvys" (Fintheon's Linear team)

## Cross-Reference

This skill is the Linear-native counterpart of `solvys-orchestrate`. The two share the same naming conventions, Beta Phase structure, and state machine. `solvys-orchestrate` handles the full Cursor workflow (plan mode, brief generation, wave execution). `solvys-linear-orchestrate` handles the Linear side: issue creation, cycle assignment, dependency wiring, and status updates. Use together for full coverage.
