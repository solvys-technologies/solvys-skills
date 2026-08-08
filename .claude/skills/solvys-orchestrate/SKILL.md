---
name: solvys-orchestrate
description: Multi-track orchestration planner for parallel agent sessions. Use when the user needs to plan a sprint, large feature, or multi-file refactor requiring 2+ parallel agent tracks. Produces turnkey briefs (full context, no questions back) and an @-mention wave sequence the user hands to parallel IDE windows. No live coordination layer -- each track is self-contained.
---

# Solvys Orchestrate -- Multi-Track Sprint Planner

## Refresh System Contract

Plan mode auto-selects this skill for multi-track, parallel, long-running, or
super-sprint work; TP does not need to name it. The task title and primary plan
artifact use `S### - concise context`. Track IDs remain subordinate.

Planning stays in the local control plane and never self-assigns
implementation. `Implement this plan` freezes the accepted plan revision and
dispatches every repository implementation-eligible track to a registered
task-owned, repository-backed Codex Cloud environment/worktree by default. A
projectless ChatGPT Work VM and connector-only repository read access are
preflight-only. Recovery refs use the exact
root `refs/sprints/S###/P#` preservation/sprint shape or
`refs/sprints/S###/T#/P#` tranche/track shape. The originating planning task
cannot implement, and a missing or incomplete Cloud Pickup block fails
dispatch. The command must create or assign each task-owned Cloud worktree and
return its environment, checkout, and authenticated Git transport receipt; a
local target, projectless target, or mere Cloud recommendation is not dispatch.
Never call sub-agent or Task routing. Use separate visible Codex sessions on the
configured Luna model for independent planning and review. Use Solvys Cloud
Tasks for implementation, then return the exact checkpoint to the local daily
integrator before review or deployment.
Read
`/solvys-cao/references/refresh-system.md`.

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- Backend tracks start from the proven project stack and default to Fly.io,
  Supabase, Cloudflare, Vercel, and PostHog in their recorded roles. Add another
  technology only when best practice reduces lifetime tech debt and management
  enough to justify the client's cost; record that tradeoff and exit path.
- Frontend tracks create or update the project-owned ChatGPT Site and use its
  URL in the Codex in-app browser for implementation checks. When visual or
  content review is needed, they automatically open a Site-derived local HTML
  artifact with `human-review`, apply feedback to source, and refresh the Site.
  They verify and install the approved library hierarchy before implementation:
  BeUI Pro/BeUI, Motionary.dev/ascertainty UI, and Bklit/EvilCharts. Use a
  custom block only after a recorded no-fit exception.
- Every frontend track builds a 1:1 runnable Site prototype at the accepted
  scope. Match copy, geometry, data meaning, routes, controls, states,
  responsive behavior, accessibility, and interaction feedback. Reject
  placeholder or fake product behavior and record the fidelity target and
  evidence.
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



You are a sprint architect. Your job is to decompose a large task into parallel execution tracks, produce standalone turnkey briefing documents for each track, and output an execution sequence that prevents conflicts. Each brief must contain every piece of context its track's agent session needs to execute without asking questions back to the orchestrator.

**CRITICAL RULES (from operational history):**

- **SOLVYS CODING-AGENT PROMPT**: For Solvys product work, load `SOLVYS_AGENT_SYSTEM_PROMPT.md` from the Solvys-skills repo or installed copy. For any frontend/UI track, load suite root `Design.md` immediately before planning and re-check the plan against it before implementation. Every track brief must include the contract: repo truth first, preserve dirty state, whole-product understanding, narrow execution, stable UI canon, highest-reality proof, direct done/not-done status, and runtime-neutral skills distribution.
- **APPROVED FRONTEND BLOCK GATE**: For any new Solvys project or greenfield
  frontend track, record the approved UI-library sources before frontend files
  are touched. Assemble generic library blocks with Impeccable and Apple
  Design. The agent does not choose palette, effects, spacing system, or polish;
  TP owns the theme in the approved editor.
- **LINEAR WORKFLOW**: Every task title begins with the searchable sprint
  identity: `S{N} - {Concise context} / T{N} - {Track title}` or
  `S{N} - {Concise context} / ORCH`. Filesystem-safe brief paths may retain
  `S{N}-T{N}-{slug}.md`. Check the highest existing Sprint number in
  `sprint-md/` and `sprint-changelog/` before numbering. Note which Beta Phase
  owns the sprint and include each `@sprint-md/...` path in its turnkey brief.
- Never start a vite dev server -- all tracks verify via `tsc --noEmit` + `vite build` only
- All tracks must `rm -rf dist` before any vite build (stale bundle prevention)
- Backend is launchd-managed on port 8080 -- only one track should touch it at a time
- Deploy track (if included) must hit all 3 targets: backend (Fly.io), desktop (Vercel), mobile (Vercel)
- Check `src/lib/changelog.ts` before finalizing track ownership -- recent entries are intentional
- **EXECUTION LANE GATE**: Read the CAO Refresh System and
  `storage-and-execution-lanes.md`. All repository implementation defaults to
  Cloud. Ext is recovery-only and cannot create a local implementation
  exception.
- **CHATGPT SITE FRONTEND**: New frontend changes create or update the
  project-owned ChatGPT Site before acceptance. Verify and install BeUI Pro or
  BeUI fallback, Motionary.dev or ascertainty UI fallback, and Bklit or
  EvilCharts fallback as applicable. Use the Site in the Codex in-app browser
  for checks. Automatically run `human-review` on a Site-derived local HTML
  artifact when visual or content review is needed. Wonder owns new frontend
  proposals and their diffs before Site deployment. Existing Builder and
  Plasmic artifacts are protected legacy inputs unless TP explicitly authorizes
  a source transfer. Create a no-fit exception before any custom block.

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
- **New-project frontend gate:** if greenfield frontend is in scope, record the
  approved UI-library sources and the user-owned theme boundary before
  implementation.
- **ChatGPT Site:** for every frontend track, what is the Site URL,
  source-to-Site publication path, and review owner?
- **Track budget:** how many parallel agent sessions do you want to run? (single-select: 2 / 3 / 4 / 5+ -- default 3, hard cap 4 per wave unless the sprint is a pure per-file rename where non-overlapping ownership makes larger waves safe)

### Round 2 -- Architecture & Constraints (MANDATORY)

Fire a second `AskUserQuestion` batch covering:

- **Integration receipt:** verify the date-only `YYYY-MM-DD` branch and assign
  exact root `refs/sprints/S{N}/P#` preservation refs and
  `refs/sprints/S{N}/T{N}/P#` track refs. Do not offer contextual branch choices.
- **Execution lane:** repository-backed Cloud by default, plus workspace path
  or Cloud branch, peak storage estimate, capacity reservation, and exit
  condition for each track. A local exception requires a recorded reason and
  capacity admission.
- **Linear home:** which Linear cycle, project, and initiative own this sprint? If discoverable from Linear, present the concrete candidates and recommend the active beta cycle/project/initiative.
- **Owner split:** which tracks belong to TP, which belong to Shashank, and which are agent-only implementation tracks? Default: TP owns ORCH/product acceptance/unification validation; Shashank owns human-dev implementation tracks; local/cloud agent sessions own explicitly delegated implementation tracks.
- **Ownership conflicts:** which existing agent-owned files must stay off-limits? Start from `src/lib/changelog.ts` recent entries and list the top 2-3 candidates.
- **Breakage tolerance:** what must NOT regress? (multi-select: CAO chat, RiskFlow feed, MDB/ADB/PMDB/TWT briefs, Sanctum, Mobile PWA, Desktop install flow, Supabase RLS)
- **Unification owner:** does the orchestrator agent merge, or does a dedicated unification track? (single-select)

### Round 3 -- Validation & Aesthetic (OPTIONAL)

Fire a third `AskUserQuestion` batch ONLY if R1+R2 left gaps. Typical triggers: UI work landed in scope, deadline unclear, validation path undefined, or the user picked "Other" in a prior round.

- **Validation spec:** per-track acceptance signal? (multi-select: ChatGPT Site
  check, library installation receipt, automatic human review when needed, tsc
  clean, vite build clean, bun build clean, curl smoke, Plannotator review,
  manual TP review)
- **Design anchor:** for any UI track, use the approved Solvys UI-library
  source list and current repository components. TP owns the palette and polish.
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
Execution Lane: [repository-backed Codex Cloud / internal-control / approved local exception]
Environment ID And Label: [exact values]
Repository Attachment Proof: [exact repository slug and attachment evidence]
Requested Base/Ref Availability Proof: [exact evidence]
Checkout Mode And Proof: [detached task-owned worktree and exact evidence]
Authenticated Git Publication Route: [exact managed Git transport]
Workspace Path Or Cloud Branch: [exact Cloud worktree or explicit local exception]
Task-Owned Checkpoint Ref: [refs/sprints/S{N}/T{N}/P#]
Date Integration Branch: [YYYY-MM-DD]
Estimated Peak Storage: [bytes or GiB]
Capacity Reservation: [free before / projected free after]
Custody Boundary: [Ext sound libraries / designated-flash sensitive music / Git plus bounded dirty overlays / exact user-selected backup set]
Exit Condition: [merge, handoff, proof, or explicit cancellation]
Closure State: [active / cooling / archive-eligible / protected]
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

**Turnkey means:** every brief contains enough context that a fresh agent session opening the file in a new IDE window can complete the track end-to-end WITHOUT asking questions back to the orchestrator. If a track agent would need to ask "what does X mean?" or "where does Y live?" or "which function should I call?", the brief is incomplete -- add the answer before shipping the brief.

Before writing any brief, fact-check identifiers against the live tree and Supabase REST:

- `grep` every table, route, service, and component name that will appear in a track brief against the current repo
- If a referenced file does not exist, flag it in the brief as `[NEW -- to create]`
- If a referenced table/route does not exist, list it under "Open questions" in the brief rather than hallucinating its shape

### Turnkey Brief Template

Every brief MUST preserve searchable identity. Issue titles become
`S{N} - {Concise context} / T{N} - {Title}` and ORCH becomes
`S{N} - {Concise context} / ORCH`.

````markdown
# S{N} - {Concise context}

## Track T{N} - {Title}

## Problem And Solution

- **Original Problem**: [The user-visible problem this track helps solve]
- **Solution**: [The named sprint solution]
- **Outcome Objective**: Deliver [solution] so [user] can [outcome]; this track owner is responsible for behavior, controls, validation, and design proof.
- **Linear Review Source**: [Awaiting Review issue id(s), or none]

## Context

[Why this track exists and how it fits the larger sprint. 2-4 sentences so a fresh agent understands the "why" in under a minute.]

## Solvys Coding-Agent Contract

- Follow `SOLVYS_AGENT_SYSTEM_PROMPT.md`.
- For frontend/UI work, read `Design.md` immediately before planning and re-check this plan against `Design.md` before implementation.
- Start from repo truth and preserve intentional dirty state.
- Understand the whole product surface touched by this track, not only the immediate file.
- Keep visible UI canon stable unless TP explicitly asked for redesign.
- Prove completion through the highest-reality surface available before calling the work done.

## Linear Scope

- **Issue naming**: `S{N} - {Concise context} / T{N} - {Title}`
- **Beta Phase**: {Pre-Release / Closed Beta / Open Beta}
- **Linear Project**: {project name/id or "not available"}
- **Linear Initiative**: {initiative name/id or "not available"}
- **Cycle**: {cycle number if known}
- **Due date**: {same-week Saturday}
- **Assigned owner**: {TP / Shashank / Codex Cloud / local Solvys Agent / other named developer}

## Branch Target

`{YYYY-MM-DD}`

`main` is protected and never a development lane.

## Cloud Pickup

- **Sprint identity**: `S{N} - {Concise context}`
- **Accepted plan revision**:
- **Environment type**: repository-backed Codex Cloud
- **Environment ID**:
- **Environment label**:
- **Repository slug**:
- **Repository attachment proof**:
- **Base commit**:
- **Requested base/ref availability proof**:
- **Date integration branch**: `{YYYY-MM-DD}`
- **Task-owned checkpoint ref**: `refs/sprints/S{N}/T{N}/P#`
- **Checkout mode**: detached task-owned worktree
- **Worktree mode**: detached
- **Checkout proof**:
- **Authenticated Git publication route**:
- **Owner**:
- **Protected zones**:
- **Dependencies**:
- **Secrets manifest (names only)**:
- **Excluded secret names/categories**:
- **Purpose-specific authorization gates**:
- **Proof gates**:
- **Return path**:
- **Capacity and resource budget**: default ceilings | recorded sprint override
- **Closure condition**:

## Scope -- Included

- [ ] {file or feature 1}
- [ ] {file or feature 2}

## Scope -- Excluded (DO NOT TOUCH)

- {file or feature that belongs to another track}

## Frontend Gate

- For frontend/UI tracks: read `Design.md` immediately before planning and re-check the plan before implementation.
- For greenfield/new-project frontend tracks: record the approved UI-library
  source list and user-owned theme boundary before touching frontend files.
- For new frontend changes: create or update the project-owned ChatGPT Site,
  record its URL and source-to-Site publication path, verify the approved
  library installation, use the Site in the Codex in-app browser for checks,
  and automatically run `human-review` on a Site-derived local HTML artifact
  when visual or content review is needed.
- For every frontend track, record the 1:1 fidelity target, route/state map,
  real-control checklist, desktop/mobile viewports, fixture provenance, and
  Site interaction receipt.

## Execution And Storage Lane

- **Execution lane**: Cloud default | explicit local exception
- **Workspace path or Cloud branch**:
- **Estimated peak storage**:
- **Capacity reservation**:
- **Exit condition**:
- **Closure state**: active

## ChatGPT Site Review

- **Project ChatGPT Site URL**:
- **Source-to-Site publication path**:
- **1:1 fidelity target and accepted source/spec**:
- **Route/state map and real-control checklist**:
- **Fixture and provenance record**:
- **Desktop/mobile viewport record**:
- **Library source and installation state**:
- **Implemented Site route/state**:
- **No-fit custom exception, if any**:
- **Automatic human-review artifact and feedback state**:
- **Site verification receipt**:

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

- [ ] The named solution resolves the original problem on the intended surface.
- [ ] Every requested or planned button/control performs the correct action through real interaction, including applicable loading, disabled, error, navigation, and persistence behavior.
- [ ] Shared and repo-local design canons were loaded before planning, and rendered desktop/mobile proof shows no canon violations; or Design impact: not applicable is recorded.
- [ ] The execution lane, workspace or Cloud branch, peak storage estimate,
      capacity reservation, exit condition, and closure state are recorded.
- [ ] Every frontend track recorded its project ChatGPT Site, recorded library
      installation, ran automatic human review when applicable, applied feedback
      to source, and passed source-integrated Site verification.
- [ ] Every frontend Site is a 1:1 runnable representation of the accepted
      source/spec, with real controls, states, responsive behavior,
      accessibility, and interaction receipts. No placeholder or fake product
      behavior remains.
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
S{N} - {concise context} / T{N}

Outcome: ...
Principal areas: ...
Proof: ...
Protected zones: ...
Remaining blocker: ...
```
````

Save each brief to `sprint-md/S{SPRINT}-T{N}-{slug}.md` at the CURRENT workspace root. The orchestration doc goes to `sprint-md/S{SPRINT}-ORCHESTRATION.md`.
The orchestration document's first heading is
`# S{SPRINT} - {Concise context}`; the path is only the filesystem-safe
representation.

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
- **Codex Cloud**: default implementation owner for backend, frontend, and
  combined tracks with an exact repository-backed receipt.
- **Local Solvys Agent**: planning, coordination, and a documented
  capacity-safe local exception only. It does not default to repository
  implementation.
- **Unification**: assign to the validator owner TP selected; default to TP as
  acceptance owner and Codex/local agent as execution owner only when explicitly
  delegated.

Add an `## Assignment Matrix` section to the orchestration doc:

```markdown
| Issue | Brief | Owner | Execution path | Cycle | Project | Initiative |
| --- | --- | --- | --- | --- | --- | --- |
| S{N} - context / ORCH | @sprint-md/... | TP | planning/runbook | Cycle X | Project | Initiative |
| S{N} - context / T1 | @sprint-md/... | Shashank | human dev | Cycle X | Project | Initiative |
| S{N} - context / T2 | @sprint-md/... | Codex Cloud | Linear delegate | Cycle X | Project | Initiative |
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

**CRITICAL: The final output to the user must be ONLY the @ path mentions and the sequence. Do NOT dump brief content inline.** The user hands these @ paths directly to parallel agent sessions. Each @ path gets its OWN fenced code block so the user can copy-paste them individually. Follow with a short non-technical debrief explaining what each wave accomplishes. Example output:

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
2. The orchestrating agent session (the one running this skill) performs the merge, resolves any interface mismatches, and runs the full validation suite.

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
- Every track records its execution lane, workspace path or Cloud branch,
  capacity reservation, exit condition, and closure state.
- All repository implementation defaults to Cloud. Local work opens only for a
  documented capacity-safe exception; Ext remains recovery-only.
- `main` is protected; the only human integration branch is `YYYY-MM-DD`.
  Parallel work uses registered detached worktrees or task-owned checkpoint
  refs. Do not create feature, recovery, product, incident, bug, prose, agent,
  runtime, or other contextual branches.
- New frontend tracks create or update a project ChatGPT Site, use it for
  source-integrated checks, and automatically open a Site-derived local HTML
  artifact with `human-review` when visual or content review is needed. Wonder
  owns new frontend proposals and their diffs before Site deployment. Existing
  Builder and Plasmic artifacts remain protected legacy inputs unless TP
  explicitly selects a source transfer.
- **Design tracks use approved blocks and `Design.md`**: for all frontend/UI
  work, load `Design.md` immediately before frontend planning and re-check the
  plan before implementation. Use the approved UI-library source list and
  Impeccable/Apple Design for behavior and alignment. Assemble generic blocks;
  leave palette, effects, and polish to TP. Preserve the existing interaction
  and accessibility gates, and require enter/exit transitions for new popups,
  rails, drawers, modals, sheets, and panels.
- **No live coordination layer.** Tracks do not message each other during execution. File ownership + reuse inventory in each brief is how conflicts are prevented.

## Plane Integration

When the Plane MCP server is available (check `~/.mcp.json` or project `.mcp.json` for a `plane` entry), use it for sprint tracking:

### During Discovery
- Fetch the current Plane cycle (`plane_cycles list`) to understand what's actively being worked on
- Read existing Plane issues (`plane_issues list`) to avoid duplicating work
- Check module structure (`plane_modules list`) for where new work belongs

### During Brief Generation
- After writing each track brief to `sprint-md/`, create a corresponding Plane issue:
  - Title: `S{N} - {concise context} / T{N} - {track title}`
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
