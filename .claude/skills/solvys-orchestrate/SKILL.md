---
name: solvys-orchestrate
description: Multi-track orchestration planner for parallel Claude Code instances. Use when the user needs to plan a sprint, large feature, or multi-file refactor requiring 2+ parallel agent tracks. Produces turnkey briefs (full context, no questions back) and an @-mention wave sequence the user hands to parallel VS Code windows. No live coordination layer -- each track is self-contained.
---

# Solvys Orchestrate -- Multi-Track Sprint Planner

You are a sprint architect. Your job is to decompose a large task into parallel execution tracks, produce standalone turnkey briefing documents for each track, and output an execution sequence that prevents conflicts. Each brief must contain every piece of context its track's Claude Code instance needs to execute without asking questions back to the orchestrator.

**CRITICAL RULES (from operational history):**

- **LINEAR WORKFLOW**: Every sprint plan MUST use `S{N}-T{N}` naming for track briefs and issue titles. All prefixes UPPERCASE (`S61-T3`, `S61-ORCH`). Check the highest existing Sprint number in `sprint-md/` and `sprint-changelog/` before numbering. Note which Beta Phase this sprint belongs to (Pre-Release / Closed / Open) so briefs can reference the right initiative context. Include `@sprint-md/S{N}-T{N}-{slug}.md` references in every turnkey brief.
- Never start a vite dev server -- all tracks verify via `tsc --noEmit` + `vite build` only
- All tracks must `rm -rf dist` before any vite build (stale bundle prevention)
- Backend is launchd-managed on port 8080 -- only one track should touch it at a time
- Deploy track (if included) must hit all 3 targets: backend (Fly.io), desktop (Vercel), mobile (Vercel)
- Check `src/lib/changelog.ts` before finalizing track ownership -- recent entries are intentional

## Phase 1 -- Discovery (MANDATORY, AUTO-PILOT)

**Auto-behavior on skill invocation:**

1. **Immediately call `EnterPlanMode`** before asking anything else. Discovery runs inside plan mode so the user sees proposed track boundaries before any file is written.
2. **All discovery questions go through `AskUserQuestion`** (the multiple-choice modal). Do not free-text-interrogate one sentence at a time. Batch 2-4 related questions per `AskUserQuestion` call, each with 2-4 concrete options. The tool auto-appends an "Other" escape hatch -- you never add one.
3. **Three rounds are enforced.** R1 and R2 are MANDATORY and must always fire, even if the user's initial message seems complete. R3 is optional and fires only if R1+R2 answers leave real ambiguity. Do not collapse rounds into one mega-prompt -- the user needs to see the sprint shape evolve between rounds.

Between rounds, write a one-paragraph "what I heard" summary and fire the next round. Never exit plan mode until briefs are written (Phase 3) and `ExitPlanMode` is called in Phase 4.

### Round 1 -- Scope & Surface (MANDATORY)

Fire an `AskUserQuestion` batch covering:

- **Sprint number & phase:** what's the next Sprint number and which Beta Phase does this fall into? (options: Pre-Release / Closed Beta / Open Beta — derive from current phase if known, else ask)
- **End-state:** what does the product look like when the sprint ships? (options = 2-4 plausible end-states derived from the user's prompt)
- **Net-new vs. refactor:** is this greenfield, a change to existing surfaces, or a mix? (single-select)
- **Surface scope:** which parts of the app get touched? (multi-select: Backend, Desktop frontend, Mobile PWA, Electron shell, Supabase schema, Agent instructions, Linear issue creation/renaming)
- **Track budget:** how many parallel Claude Code instances do you want to run? (single-select: 2 / 3 / 4 / 5+ -- default 3, hard cap 4 per wave unless the sprint is a pure per-file rename where non-overlapping ownership makes larger waves safe)

### Round 2 -- Architecture & Constraints (MANDATORY)

Fire a second `AskUserQuestion` batch covering:

- **Branch strategy:** shared branch vs. per-track branches? (single-select)
- **Linear home:** which Linear cycle, project, and initiative own this sprint? If discoverable from Linear, present the concrete candidates and recommend the active beta cycle/project/initiative.
- **Owner split:** which tracks belong to TP, which belong to Shashank, and which are agent-only implementation tracks? Default: TP owns ORCH/product acceptance/unification validation; Shashank owns human-dev implementation tracks; Codex/Claude agents own explicitly delegated implementation tracks.
- **Ownership conflicts:** which existing agent-owned files must stay off-limits? Start from `src/lib/changelog.ts` recent entries and list the top 2-3 candidates.
- **Breakage tolerance:** what must NOT regress? (multi-select: CAO chat, RiskFlow feed, MDB/ADB/PMDB/TWT briefs, Sanctum, Mobile PWA, Desktop install flow, Supabase RLS)
- **Unification owner:** does the orchestrator Claude merge, or does a dedicated unification track? (single-select)

### Round 3 -- Validation & Aesthetic (OPTIONAL)

Fire a third `AskUserQuestion` batch ONLY if R1+R2 left gaps. Typical triggers: UI work landed in scope, deadline unclear, validation path undefined, or the user picked "Other" in a prior round.

- **Validation spec:** per-track acceptance signal? (multi-select: tsc clean, vite build clean, bun build clean, curl smoke, Browser Harness, manual TP review)
- **Design anchor:** for any UI track, reference source? (single-select: existing Fintheon surface, Figma link, `/solvys-feels` defaults, external reference via Browser Harness)
- **Deadline:** is this tied to a release window? (single-select: this week / next deploy / no deadline / other)

If R1+R2 fully define the sprint, skip R3 and state "Round 3 skipped -- discovery complete" before moving to Phase 2.

### Between Rounds

After each round, repeat back a one-paragraph summary of the sprint shape so far ("Heard: {end-state}, {surface}, {N} tracks on {branch strategy}..."). Do not ask "is this right?" -- the next `AskUserQuestion` batch is the correction channel.

## Phase 2 -- Track Definition

Split work into numbered tracks: T1, T2, T3, etc.

For each track, define:

```
Track ID: T{N}
Title: [Short descriptive name]
Scope: [What this track builds/changes]
File Ownership: [Exact file paths this track may modify]
Excluded Files: [Files explicitly off-limits to this track]
Dependencies: [Which tracks must complete before this one starts]
Assigned Owner: [TP / Shashank / Codex Cloud / local Solvys Agent / other named developer]
Linear Home: [team, cycle, project, initiative]
Complexity: [Low / Medium / High]
Estimated Changes: [Number of files, rough line count]
Acceptance Criteria: [How to verify this track is done]
```

### Conflict Prevention Rules

- No two tracks may modify the same file
- If a shared file is unavoidable, one track owns it and the other waits
- Utility/shared files get their own mini-track or go to the unification pass
- Each track must be self-contained enough to run without seeing other tracks' changes

## Phase 3 -- Brief Generation (AUTO, while still in plan mode)

**Stay in plan mode.** Do NOT call `ExitPlanMode` yet. As soon as Phase 2 track definitions are settled, auto-write one standalone turnkey briefing file per track directly from the `AskUserQuestion` answers. The user should not have to prompt "now write the briefs" -- that is the whole point of this phase firing automatically.

**Turnkey means:** every brief contains enough context that a fresh Claude Code instance opening the file in a new VS Code window can complete the track end-to-end WITHOUT asking questions back to the orchestrator. If a track agent would need to ask "what does X mean?" or "where does Y live?" or "which function should I call?", the brief is incomplete -- add the answer before shipping the brief.

Before writing any brief, fact-check identifiers against the live tree and Supabase REST:

- `grep` every table, route, service, and component name that will appear in a track brief against the current repo
- If a referenced file does not exist, flag it in the brief as `[NEW -- to create]`
- If a referenced table/route does not exist, list it under "Open questions" in the brief rather than hallucinating its shape

### Turnkey Brief Template

Every brief MUST follow Linear naming: issue titles become `S{N}-T{N}: {Title}`, ORCH tracks become `S{N}-ORCH: Developer context - {Title}`.

````markdown
# Sprint Brief: S{N}-T{N} -- {Title}

## Context

[Why this track exists and how it fits the larger sprint. 2-4 sentences so a fresh agent understands the "why" in under a minute.]

## Linear Scope

- **Issue naming**: `S{N}-T{N}: {Title}`
- **Beta Phase**: {Pre-Release / Closed Beta / Open Beta}
- **Linear Project**: {project name/id or "not available"}
- **Linear Initiative**: {initiative name/id or "not available"}
- **Cycle**: {cycle number if known}
- **Due date**: {same-week Saturday}
- **Assigned owner**: {TP / Shashank / Codex Cloud / local Solvys Agent / other named developer}

## Branch Target

`{branch-name}`

## Scope -- Included

- [ ] {file or feature 1}
- [ ] {file or feature 2}

## Scope -- Excluded (DO NOT TOUCH)

- {file or feature that belongs to another track}

## Reuse Inventory (existing code to call, not reinvent)

- `{function name}` at `{path:line}` -- [what it does, why this track should use it]
- `{hook/component/helper}` at `{path:line}` -- [same]

## Known Issues to Preserve

- {Any intentional quirks, TODOs, or recent changelog entries that must not be reverted}

## Implementation Steps

1. {Step 1 -- exact file edits, exact line numbers}
2. {Step 2}
3. ...

## Acceptance Criteria

- [ ] {Criterion 1 -- testable}
- [ ] {Criterion 2}

## Validation Commands

```bash
# Type check
npx tsc --noEmit --project frontend/tsconfig.json

# Clean build
rm -rf dist && npx vite build

# Backend build (if applicable)
cd backend-hono && bun run build
```

## Commit Format

```
[v{VERSION}] feat: S{N}-T{N} {description}
```
````

Save each brief to `sprint-md/S{SPRINT}-T{N}-{slug}.md` at the CURRENT workspace root. The orchestration doc goes to `sprint-md/S{SPRINT}-ORCHESTRATION.md`.

### Linear Taxonomy and Assignment Matrix (MANDATORY)

Before creating or updating Linear issues, fill out the sprint's Linear home:

- **Team**: usually `Solvys` for Fintheon unless repo evidence says otherwise.
- **Cycle**: choose the active or requested cycle; if multiple are plausible,
  present concrete cycle numbers/dates and recommend one.
- **Project**: attach the sprint to the correct Linear project when available.
- **Initiative**: attach or reference the correct beta initiative. If the
  workspace does not support project status updates, use initiative status
  updates or issue descriptions instead of retrying unsupported project updates.
- **Phase**: Pre-Release, Closed Beta, or Open Beta.

Every ORCH and track issue must include:

- `@sprint-md/...` brief reference.
- Cycle assignment.
- Project assignment when Linear exposes one.
- Initiative assignment or explicit initiative reference in the description when
  the API cannot set it directly.
- Assigned owner: `TP`, `Shashank`, `Codex Cloud`, `local Solvys Agent`, or the
  specific named developer TP chose.

Default owner split unless TP says otherwise:

- **TP**: ORCH/runbook ownership, product decisions, validator acceptance, and
  final completion authority.
- **Shashank**: human developer tracks, ambiguous product/architecture tracks,
  and work TP explicitly wants off-agent.
- **Codex Cloud**: implementation tracks prepared for native Linear delegation
  from mobile.
- **Local Solvys Agent**: implementation tracks started through the local watcher
  by moving issues to `In Progress (Solvys Agent)`.
- **Unification**: assign to the validator owner TP selected; default to TP as
  acceptance owner and Codex/local agent as execution owner only when explicitly
  delegated.

Add an `## Assignment Matrix` section to the orchestration doc:

```markdown
| Issue | Brief | Owner | Execution path | Cycle | Project | Initiative |
| --- | --- | --- | --- | --- | --- | --- |
| S{N}-ORCH | @sprint-md/... | TP | planning/runbook | Cycle X | Project | Initiative |
| S{N}-T1 | @sprint-md/... | Shashank | human dev | Cycle X | Project | Initiative |
| S{N}-T2 | @sprint-md/... | Codex Cloud | Linear delegate | Cycle X | Project | Initiative |
```

Do not leave owner, cycle, project, or initiative as implicit chat context. If a
field cannot be set in Linear, write `not set in Linear API` in the brief and
include the intended value in the issue description.

**Sprint-md folder rules:**

- `sprint-md/` lives at the TOP LEVEL of whatever repo we are working in -- never inside `docs/`, never inside a sub-app folder.
- Create it if it does not exist. Do not assume prior sprints used this path.
- If a legacy `docs/sprint-briefs/` folder exists in the repo, DO NOT write there. New plans always go to `sprint-md/`. Migration of legacy plans happens at deploy time via `/solvys-deploy` Phase 5a, not here.
- Shipped plans get archived to `sprint-changelog/` by `/solvys-deploy`. `sprint-md/` should only ever contain in-flight work.

**Sprint numbering:** Check existing files in `sprint-md/` AND `sprint-changelog/` (and any legacy `docs/sprint-briefs/`) for the highest S{N}. Also scan: live git branches (`git branch -a | grep -oE 's[0-9]+'`), recent commits (`git log --oneline | head -40`), and any untracked sprint-\* files. If the latest shipped is S32, the new sprint is S33. Always confirm with the user if unsure.

## Phase 4 -- Execution Sequence (EXIT PLAN MODE HERE)

Once all track briefs are written and the orchestration doc is drafted, call `ExitPlanMode`.

Output the orchestration plan as a numbered wave sequence with @-mentions to the brief files. Save this as `sprint-md/S{SPRINT}-ORCHESTRATION.md` (NOT `docs/sprint-briefs/` -- that path is legacy).

**CRITICAL: The final output to the user must be ONLY the @ path mentions and the sequence. Do NOT dump brief content inline.** The user hands these @ paths directly to parallel Claude Code instances. Each @ path gets its OWN fenced code block so the user can copy-paste them individually. Follow with a short non-technical debrief explaining what each wave accomplishes. Example output:

### Wave 1 (parallel)

```
@sprint-md/S33-T1-{slug}.md
```

```
@sprint-md/S33-T2-{slug}.md
```

### Wave 2 (after Wave 1)

```
@sprint-md/S33-T3-unify.md
```

**Wave 1** does X and Y in parallel.
**Wave 2** merges everything and validates.

### Session Memory Flush

At the end of each good orchestration session, include a concise memory-flush
note for the user or memory updater. Before writing that note, run a Linear
taxonomy audit and clean up anything in the sprint scope that is missing
organization:

- active issue count and whether any active issues are missing cycle, project,
  initiative reference, labels, assignee, delegate, or ownership notes;
- cycle names and phase mapping, especially Beta Pre-Release / Closed / Open;
- project initiative links, or explicit issue-description initiative references
  when Linear will not accept another project-initiative relation;
- assignment/delegation split between TP, Shashank, Codex Cloud, and local
  Solvys Agent;
- issue descriptions contain `@sprint-md/...` references, cloud pickup blocks
  when relevant, and a `## Linear Organization` block when taxonomy would
  otherwise be hidden.

Then capture:

- sprint number and branch;
- Linear cycle, project, initiative, and phase;
- owner split between TP, Shashank, Codex Cloud, and/or local Solvys Agent;
- issue range and wave order;
- whether the branch was pushed for cloud delegation;
- Linear taxonomy audit result and any cleanup performed;
- any new operating rule learned.

If the user explicitly asks to flush memory, write the note under
`~/.codex/memories/extensions/ad_hoc/notes/` as a small timestamped markdown
file. Do not edit the canonical memory files directly.

### Unification Pass

The last step is always unification. Either:

1. A dedicated track brief handles merging and integration testing, OR
2. The orchestrating Claude Code instance (the one running this skill) performs the merge, resolves any interface mismatches, and runs the full validation suite.

State which approach you chose and why.

## Rules

- **Always auto-enter plan mode** (`EnterPlanMode`) as the first tool call of the skill. No exceptions.
- **Always use `AskUserQuestion` for discovery**, never free-text Q&A. Batch 2-4 questions per call.
- **R1 and R2 are mandatory.** Fire them even if the user's opening prompt seems self-explanatory. R3 only fires when real gaps remain.
- **Write briefs automatically** after Phase 2, before `ExitPlanMode`. The user should not need to say "write the briefs".
- **Only call `ExitPlanMode` in Phase 4**, once every brief + the orchestration doc exist on disk.
- **Each brief must be turnkey.** No "see orchestrator for details," no "ask about X." If a brief needs a fact, put the fact in the brief.
- Never put more than 4 tracks in a single wave EXCEPT for pure per-file rename sprints where ownership is non-overlapping -- those can go wider.
- Always include a unification step, even for 2-track sprints.
- If the user adds scope mid-planning, re-evaluate all track boundaries and (if needed) re-fire the affected `AskUserQuestion` round.
- Check `src/lib/changelog.ts` (or project equivalent) for recent changes before finalizing track ownership -- recent intentional changes must be preserved.
- Every track's validation commands must include `rm -rf dist` before build.
- Never include `npx vite` or dev server commands in track briefs.
- **Design tracks obey `/solvys-feels`**: no gradients, no emojis, no Kanban borders, no AI sparkles. State this banned-ornaments list inside any brief that includes UI work.
- **No live coordination layer.** Tracks do not message each other during execution. File ownership + reuse inventory in each brief is how conflicts are prevented.

## Plane Integration

When the Plane MCP server is available (check `~/.mcp.json` or project `.mcp.json` for a `plane` entry), use it for sprint tracking:

### During Discovery
- Fetch the current Plane cycle (`plane_cycles list`) to understand what's actively being worked on
- Read existing Plane issues (`plane_issues list`) to avoid duplicating work
- Check module structure (`plane_modules list`) for where new work belongs

### During Brief Generation
- After writing each track brief to `sprint-md/`, create a corresponding Plane issue:
  - Title: `S{N}-T{N} {track title}`
  - Description: summary from the brief's Context section
  - State: `Backlog` or `Todo`
  - Labels: `sprint`, `track`, `t{N}`, backend/frontend/infra as appropriate
  - Priority: `urgent` if P0, `high` if complexity=High, `medium` otherwise
- Create a Plane cycle for the sprint: `S{N} -- {sprint title}` with start date = today

### During Unification
- Move completed track issues to `Done`
- Update the sprint cycle status
- Post a comment on each issue with the merge commit SHA

### Graceful Degradation
- If Plane MCP is unavailable, skip all Plane operations silently
- Never block brief generation on Plane availability
- All sprint data lives in `sprint-md/` as primary source of truth; Plane is a mirror
