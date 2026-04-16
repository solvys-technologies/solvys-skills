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
- List MCP servers if configured

### Environment
- Build commands (from `package.json` scripts)
- Deploy targets (Vercel, Workers, local DMG)
- Required environment variables (from `.env.example`)

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

--- End Briefing ---
```

## Phase 3 -- Delivery

### For Claude Code / Cursor / Codex agents:
Output the briefing directly into the chat. The receiving agent can read it from the conversation context.

### For embedded app agents:
If `$ARGUMENTS` specifies a file path, write the briefing to that path so the app can load it. Otherwise, output to chat and let the user decide where to save it.

### For handoff between PIC agents:
Save to `~/.openclaw/workspace/memory/handoffs/{date}-{from}-{to}.md` if the OpenClaw workspace exists. Otherwise, output to chat.

## Rules

- Never include secrets, API keys, or database URLs in the briefing
- Always use absolute dates, never relative ("April 15" not "yesterday")
- If the project has a changelog, reference the last 3 entries
- If you cannot determine something, say "UNKNOWN -- check {where to look}" rather than guessing
- Keep the briefing under 200 lines. Agents have limited context windows too.
