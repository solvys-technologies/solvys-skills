---
name: solvys-inform
description: Brief an AI agent on project context, recent changes, available tools, and how to work within the codebase. Use when onboarding a new agent instance, handing off between agents, or resuming after a long break.
version: 0.1.0
---

# Solvys Inform -- Agent Briefing Generator

You are a briefing officer. Your job is to produce a self-contained context document that brings any AI agent (Claude Code, Cursor, Codex, or an agentic layer within the app) fully up to speed on the current project state.

## When to Use

- Onboarding a new Claude Code instance to this project
- Handing off work between agents (e.g., Claude Code to Cursor, or between PIC agents)
- Resuming a project after a gap
- Briefing an embedded AI agent (e.g., a chat agent within the app) on how to use the system it lives in
- Informing a teammate's agent about recent changes

## Phase 1 -- Context Gathering

Read and synthesize the following sources. Do not skip any that exist:

### Project Identity
- Read `CLAUDE.md`, `.cursorrules`, or equivalent project instructions file
- Extract: project name, stack, team/agent roster, core rules, key paths

### Recent History
```bash
git log --oneline -20
git diff --stat HEAD~5
git branch --show-current
git log --oneline main..HEAD  # If on a feature branch
```

### Active State
- Current branch and its relationship to main
- Uncommitted changes (`git status`)
- Any open TODOs or known issues in recent commits

### Available Tools
- List available slash commands (check `.claude/commands/` and `.claude/skills/`)
- List configured hooks (check `.claude/settings.json` or `.claude/settings.local.json`)
- List MCP servers if configured (read `.mcp.json`)
- If `claude-peers` MCP is registered, call out the four tools it exposes (`list_peers`, `send_message`, `set_summary`, `check_messages`) and note that the receiving agent should `set_summary` on startup so other live windows can see what it's doing

### Architectural Guidance
- Summarize current Solvys engineering doctrine: small vertical slices, diagnosis loop, service boundaries, Zod at boundaries, validation gates, changelog discipline.
- Summarize current Solvys design doctrine: Solvys Gold, warm near-black, frosted-glass surfaces over Kanban cards, no gradients, no emojis, no AI sparkles, no generic shadows.
- Call out TP-vetoed references or deprecated product names so incoming agents do not use them as influence sources.

### Operational Protocol and Tool Updates
- Inspect recent changelog entries, sprint briefs, agent instruction files, and tool/skill changes for new operational protocols.
- If new routes, scripts, skills, Linear rules, release rules, learning loops, approval flows, or orchestration conventions exist, include them in the briefing as first-class operating instructions.
- In Fintheon, check `backend-hono/src/services/ai/agent-instructions/`, `backend-hono/src/routes/`, `backend-hono/package.json`, `scripts/`, `sprint-md/`, and `src/lib/changelog.ts` for newly available tools and protocols.
- Specifically call out agent learning tools when present: `POST /api/agent/learning`, `GET /api/agent/learning/summary?days=7`, automatic post-analysis learning sessions, and `bun run memory:obsidian`.
- Include Linear/ORCH operating rules when present: uppercase sprint prefixes, every Linear issue references `@sprint-md/...`, ORCH tickets are planning/runbook items, and implementation tickets stay open until repo evidence plus validation support closure.

### Environment
- Build commands (from `package.json` scripts)
- Deploy targets (Vercel, Workers, local DMG)
- Required environment variables (from `.env.example`)

## Phase 1.25 -- Embedded Agent Instruction Sync

When briefing embedded Fintheon agents, do not stop at a chat summary. Ensure the agent-facing instruction source is updated when new tools or protocols should persist across future sessions:

- Shared behavior for all agents belongs in `backend-hono/src/services/ai/agent-instructions/index.ts` or shared belief/instruction modules.
- Harper/CAO-specific operating rules belong in `backend-hono/src/services/ai/agent-instructions/harper-extra.md`.
- Role-specific rules belong in the matching `oracle-extra.md`, `feucht-extra.md`, `consul-extra.md`, or `herald-extra.md`.
- Add a changelog entry in `src/lib/changelog.ts` for any persistent instruction update.
- Validate with `cd backend-hono && bun run build` after touching backend instruction assembly.
- Never embed secrets, private credentials, or machine-specific tokens into agent instructions.

The briefing must state what was updated, which agents now receive it, and which command or endpoint they should use.

## Phase 1.5 -- Mintlify Documentation Sync

Before assembling the briefing, check whether the current app/codebase has Mintlify docs:

```bash
find . -maxdepth 3 \( -name "docs.json" -o -name "mint.json" \)
```

If Mintlify docs exist, update them when the current work changes any of the following:

- A user-facing feature, workflow, screen, command, or API route
- An integration such as Slack, Linear, MCP, Supabase, Vercel, GitHub, or a market-data connector
- Setup, update, release, or troubleshooting steps
- Product naming, positioning, status language, or known limitations
- Linear-tracked work that should be represented in an external roadmap or "in development" page

Documentation update rules:

- Keep Mintlify navigation current in `docs.json` or `mint.json`.
- Use external-facing language: describe what is available, what is in internal preview, what is in development, and what is only planned.
- Never describe a Todo/unstarted Linear issue as shipped. Use "in development", "planned", or "intended to" framing.
- Never publish secrets, private tokens, customer data, or machine-specific local credentials.
- If the repo has a status-language or roadmap page, update it for unfinished Linear issues that affect public expectations.
- If the docs source is not present locally but the project has live Mintlify docs, call that out in the briefing and list the exact docs pages that should be updated.

## Phase 2 -- Briefing Assembly

Produce the briefing in this exact format:

```markdown
--- Briefing for {Agent Name / Role} ---
Generated: {date}
Project: {name}
Branch: {current branch} (main: {commits ahead/behind})

## Identity
{Project name, what it does, who it serves -- 2-3 sentences max}

## Stack
- Frontend: {framework, language, styling}
- Backend: {framework, language, database}
- Infrastructure: {hosting, CI, deployment}

## Core Rules
{Bullet list of non-obvious rules from CLAUDE.md or equivalent}

## Key Paths
| Path | Purpose |
|------|---------|
| {path} | {what lives there} |

## Agent Roster
| Agent | Role | Notes |
|-------|------|-------|
| {name} | {role} | {what they own or do} |

## Recent Changes (Last 5 Commits)
| Hash | Summary | Files |
|------|---------|-------|
| {hash} | {message} | {count} files |

## What Changed and Why
{For each significant recent commit, 1-2 sentences explaining the change and its motivation}

## Open Issues
{Any known bugs, TODOs, or blockers visible in recent commits or code comments}

## Available Commands
| Command | Purpose |
|---------|---------|
| {/command} | {what it does} |

## Tools and Operational Protocol Updates
{New routes, scripts, skills, MCP tools, Linear/ORCH rules, release rules, approval flows, learning loops, and agent-facing instruction updates. Include exact commands/endpoints and who should use them.}

## Build and Deploy
```bash
# Build
{build command}

# Test
{test command}

# Deploy
{deploy command}
```

## Environment Variables
{List required vars with safe descriptions -- never include actual values}

## How to Work Here
{3-5 bullet points on conventions: commit format, changelog protocol, file size limits, naming patterns}

## Architectural Guidance
{Short summary of engineering and design doctrine, approved-reference-as-thinking-only rules, deprecated names, and vetoed references.}

## Docs Sync
{State whether Mintlify docs were found, what pages were updated or should be updated, and any unfinished Linear issues that require external-facing "in development" framing.}

--- End Briefing ---
```

## Phase 3 -- Delivery

### For Claude Code / Cursor / Codex agents:
Output the briefing directly into the chat. The receiving agent can read it from the conversation context.

### For embedded app agents:
If `$ARGUMENTS` specifies a file path, write the briefing to that path so the app can load it. Otherwise, output to chat and let the user decide where to save it.

### For handoff between PIC agents:
Save to `~/.openclaw/workspace/memory/handoffs/{date}-{from}-{to}.md` if the OpenClaw workspace exists. Otherwise, output to chat.

If both the outgoing and incoming agents are live Claude Code windows AND `claude-peers` MCP is registered, also `send_message` a one-liner to the receiving peer pointing at the briefing path/chat -- file/chat is canonical, the message is a nudge so they read it now rather than on next poll.

## Rules

- Never include secrets, API keys, or database URLs in the briefing
- Always use absolute dates, never relative ("April 15" not "yesterday")
- If the project has a changelog, reference the last 3 entries
- If you cannot determine something, say "UNKNOWN -- check {where to look}" rather than guessing
- Keep the briefing under 200 lines. Agents have limited context windows too.
