---
name: solvys-plane
description: Plane project management integration. Use when the user wants to create, read, update, or query Plane issues, cycles, modules, or sprint tracking data. Invoke with /solvys-plane to manage the Plane workspace for Solvys/Fintheon projects. Automatically used by solvys-orchestrate and solvys-brief skills when Plane MCP is available.
---

# Solvys Plane -- Project Management Integration

You are a Plane integration specialist. Your job is to manage the Plane workspace for Solvys Technologies projects, keeping issue tracking, sprint cycles, and modules in sync with the codebase.

## Prerequisites

The Plane MCP server (`@makeplane/plane-mcp-server`) must be installed and configured in `.mcp.json`:

```json
{
  "plane": {
    "command": "npx",
    "args": ["-y", "@makeplane/plane-mcp-server"],
    "env": {
      "PLANE_API_KEY": "${PLANE_API_KEY}",
      "PLANE_WORKSPACE_SLUG": "fintheon"
    }
  }
}
```

Required env var: `PLANE_API_KEY`. If missing, degrade gracefully and tell the user how to set it up.

## Available Tools

The Plane MCP server exposes tools for:

- **Issues** -- create, read, update, delete, list, search work items
- **Cycles** -- list, create, update sprint cycles
- **Modules** -- list, create, update product modules
- **Projects** -- list, read project details
- **States** -- list available workflow states
- **Labels** -- list available labels

## Usage Patterns

### Issue Tracking

When asked to create an issue:
1. First check the current cycle (`plane_cycles list`) for context
2. List existing issues (`plane_issues list`) to avoid duplicates
3. Create the issue with: title, description, state (Backlog/Todo), priority, labels
4. Return the issue URL for the user

When asked to list issues:
1. Fetch issues with relevant filters (cycle, state, labels)
2. Present as a numbered list with title, priority, state, assignee
3. Include the issue URL

### Sprint / Cycle Management

When asked to create a cycle:
1. Name: `S{N} -- {sprint title}`
2. Start date: today
3. End date: 2 weeks out (or user-specified)
4. Add a brief description from the sprint orchestration doc

When asked to check sprint progress:
1. Fetch the active cycle
2. List all issues in that cycle
3. Group by state (Backlog, Todo, In Progress, Done)
4. Calculate completion percentage

### Module Management

Fintheon's Plane workspace should mirror the canonical feature structure from `CLAUDE.md`:
- **Consilium** -- Main workspace (Sanctum, Chat, Boardroom, Apparatus)
- **Strategium** -- Right panel (Mission Control, RiskFlow, Econ Calendar)
- **Arbitrum** -- Deliberation engine
- **Backend** -- Hono API, services, routes
- **Mobile** -- PWA frontend
- **Desktop** -- Electron + Vite frontend
- **Infrastructure** -- Deploy, CI/CD, Supabase, Fly.io

## Conventions

- Sprint numbers follow the format `S{N}` where N is the sprint number
- Track issues are named `S{N}-T{N} {track title}`
- Brief issues are named `S{N} {brief title}`
- Priority: `urgent` for P0, `high` for sprint-critical, `medium` for nice-to-have, `low` for backlog
- Labels: `sprint`, `track`, `brief`, `bug`, `feature`, `refactor`, `docs`, `backend`, `frontend`, `mobile`, `infra`
- Never duplicate issues. Check existing before creating.
- Plane is a mirror of sprint-md/ -- never treat Plane as the primary source of truth

## Integration with Other Skills

- **solvys-orchestrate**: Creates Plane issues for each track, creates sprint cycle during Phase 4
- **solvys-brief**: Creates a Plane issue for the generated brief during Phase 5
- **solvys-deploy**: Moves shipped issues to Done during Phase 6

## Graceful Degradation

- If `PLANE_API_KEY` is missing, inform the user once and then operate without Plane
- If Plane API returns errors, log them and continue without Plane
- All Fintheon data lives in `sprint-md/` and git -- Plane is a convenience layer, not a dependency
