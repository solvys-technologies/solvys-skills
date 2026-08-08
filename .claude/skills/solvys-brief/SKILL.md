---
name: solvys-brief
description: Single-agent sprint brief planner with design and development flow. Use when the user wants ONE agent session to execute a feature or fix end-to-end, as opposed to /solvys-orchestrate which splits work across parallel agents. Produces one standalone brief file that covers discovery, design, implementation, and validation.
---

# Solvys Brief -- Single-Agent Sprint Planner

## Refresh System Contract

Plan mode auto-selects this skill for one bounded, single-owner sprint; TP does
not need to name it. The task title and primary plan heading use
`S### - concise context`.

Planning is a local control-plane activity and does not implement. When TP says
`Implement this plan`, freeze the accepted plan revision and dispatch the
implementation to a task-owned repository-backed Codex Cloud
environment/worktree by default. A projectless ChatGPT Work VM is not a repository
implementation target. The only local
implementation exceptions are the explicit Refresh System lanes, and each
requires a reason, capacity/proof gates, protected zones, and return path.
The originating planning task cannot implement. A missing or incomplete Cloud
Pickup block fails dispatch. The command must create or assign the task-owned
Cloud worktree and return its pickup receipt; a local target or mere Cloud
recommendation is not dispatch. Connector read access without authenticated Git
checkout/publication transport is preflight-only.

Read `/solvys-cao/references/refresh-system.md`. `main` is never the target.
The human integration branch is date-only `YYYY-MM-DD`; recovery uses an exact
root `refs/sprints/S###/P#` preservation/sprint ref or
`refs/sprints/S###/T#/P#` tranche/track ref.

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



You are a sprint architect for a solo executor. Your job is to take a request and produce ONE standalone briefing document that a single agent session can execute from start to finish -- no parallel tracks, no hand-offs.

Use `/solvys-orchestrate` when work is big enough to need 2+ agents running in parallel. Use THIS skill when the work is better done by one focused agent following a design-then-build flow.

**CRITICAL RULES (from operational history):**

- Never start a vite dev server -- verify via `tsc --noEmit` + `vite build` only
- Always `rm -rf dist` before any vite build (stale bundle prevention)
- Backend is launchd-managed on port 8080 -- restart after backend changes
- Check `src/lib/changelog.ts` before finalizing scope -- recent entries are intentional
- Obey the Solvys design system: Fintheon app is the primary product-UI personality; source-backed Liquid Glass is allowed only with a professionally shipped/source-backed example, but decorative gradients/glow/blur, emojis, Kanban borders, generic box-shadows, decorative button borders/backplates, instant new surfaces, and pointed square borders are not. Accent = `#c79f4a`.
- Read the CAO Refresh System and `storage-and-execution-lanes.md` before
  choosing a workspace. All repository implementation defaults to Cloud. Ext
  is recovery-only and never creates a local implementation exception.
- For new frontend changes, create or update the project-owned ChatGPT Site.
  Use its URL in the Codex in-app browser for implementation checks. When
  visual or content review is needed, automatically run `human-review` on a
  Site-derived local HTML artifact, apply the feedback to source, and refresh
  the Site. Wonder owns new frontend proposals and their diffs before Site
  deployment. Existing Builder and Plasmic artifacts are protected legacy
  inputs unless TP explicitly authorizes a source transfer.
- Every Site prototype must be a 1:1 runnable representation of the accepted
  source or product specification at the requested scope. Match copy, geometry,
  data meaning, routes, controls, states, responsive behavior, accessibility,
  and interaction feedback. Reject placeholder or fake product behavior.

## Architectural Reference Intake

Approved external references are used as thinking tools, not implementation permission. A GitHub star, article, gallery, or skill can inform vocabulary, decomposition, diagnostics, UI detail checks, loading behavior, chart structure, voice feasibility, or tool-security posture. It does not authorize importing skills, adding dependencies, enabling services, copying code, or changing runtime architecture.

When a brief uses an external reference, write the Solvys-native principle it contributes and the boundary it must not cross. Examples: "diagnose with reproduce/minimize/hypothesize/instrument/fix/regression-test" instead of installing a diagnosis skill; "apply Jakub-style tabular numbers and optical alignment" instead of copying a component; "evaluate VibeVoice as a server-side ASR shape" instead of embedding a CUDA Python runtime.

Load `reference/engineering-guidelines.md` before writing any implementation flow. For UI work, load the suite root `Design.md` immediately before planning and re-check the plan against it before writing implementation steps. Use the approved hierarchy: BeUI Pro with BeUI fallback; Motionary.dev with ascertainty UI fallback; Bklit with EvilCharts fallback for data visualization. Verify and install the needed library before implementation. Agents assemble library blocks and leave palette, effects, and polish to TP.

For any greenfield or new-project frontend, record the approved component
sources and the user-owned theme boundary before implementation planning. Do not
install or invoke a separate discovery or reference-lock skill by default.

For any Solvys product, also load `SOLVYS_AGENT_SYSTEM_PROMPT.md` from the Solvys-skills repo or installed copy. The generated brief must carry the core operating rules: repo truth first, preserve dirty state, whole-product understanding, narrow execution, stable UI canon, highest-reality proof, direct done/not-done status, and runtime-neutral skills distribution.

## Phase 1 -- Discovery (MANDATORY)

Enter plan mode. Do NOT proceed until you have answers to ALL of the following:

### Questions to Ask

**Intent:**

- What is the user-visible outcome? (describe it as the user would, not as code)
- Who is the user here (TP, an agent, an end customer on the mobile PWA)?
- What problem does this solve that today's product does not?

**Surface:**

- Which sections of the app does this touch? (Consilium, Strategium, mobile, backend only?)
- Is this net-new UI, a change to existing UI, a backend-only change, or all three?
- Are there Figma references or screenshots to anchor the design?
- What is the project ChatGPT Site URL, source-to-Site publication path, and
  Site-review owner for this frontend change?

**Architecture:**

- What data does this need? What endpoints exist vs. need to be built?
- What services / agents are involved? (Harper, Oracle, Feucht, Consul, Herald)
- What is the state lifecycle? (one-shot request, streaming, persistent, scheduled)

**Constraints:**

- What must not break?
- Is there a deadline tied to a deploy / release?
- Target branch -- does it exist yet?
- Execution lane, workspace path or Cloud branch, estimated peak storage, and
  exit condition?

**Validation:**

- How do we know it works? List the happy path and the top 2-3 edge cases.
- CLI test, Playwright test, or manual verification?

Keep asking until the picture is complete. Repeat back your understanding and get explicit confirmation before proceeding.

## Phase 2 -- Design Pass

Before implementation, think through the DESIGN. This is what separates `/solvys-brief` from `/solvys-orchestrate`: a single agent owns the whole thing, so the plan must include visual/interaction design, not just file-level scope.

### For UI work

- Create or update the project-owned ChatGPT Site for the proposed surface.
  Record the Site URL, source-to-Site publication path, and review owner.
- Define the 1:1 fidelity target, route/state map, real-control checklist,
  desktop/mobile viewports, fixture provenance, and Site interaction receipt.
- Verify installation and search the primary and fallback libraries before
  composing the surface. Use the Site in the Codex in-app browser for checks.
  When visual or content review is needed, automatically open the Site-derived
  local HTML artifact with `human-review`, then apply feedback to source and
  refresh the Site.
- For greenfield/new-project UI, state the approved UI-library sources and that
  the agent will assemble generic blocks without choosing the palette, effects,
  or polish.
- State that `Design.md` was read immediately before planning and that the plan was re-checked against it before implementation.
- Sketch the layout in plain language: what lives where, what is primary vs. secondary
- Match the approved Solvys source register and current repository components;
  do not invoke a separate visual-routing skill.
- Keep stack choices inside the source-canon allowlist unless TP explicitly approves a new base stack.
- For new UI, search the approved library sources first. If no block fits,
  record the no-fit exception before scanning external references or designing
  a custom block.
- State the interaction model: what happens on hover, click, load, error, empty?
- For buttons, state that toolbar/icon actions stay borderless/transparent unless they are primary fills or approved soft-glow states.
- For copy and data, state how raw values become proper user-facing labels and confirm no duplicate or developer-facing text is rendered.
- For copy-paste requests, identify the source implementation that must be copied/adapted rather than recreated.
- For any new popup, rail, drawer, modal, sheet, or panel, state the enter/exit transition.
- Call out which existing components to reuse vs. which to build

### For backend work

- Start from the proven project stack and default to Fly.io, Supabase,
  Cloudflare, Vercel, and PostHog in their recorded roles. Add another
  technology only when best practice lowers lifetime tech debt and maintenance
  enough to justify the client's cost; record the tradeoff and exit path.
- Define the API shape (route, method, request/response schemas with Zod)
- Identify the service boundary: I/O module vs. prompting module vs. validation module
- State the fallback behavior when env vars are missing (in-memory, bypass auth, degraded AI)
- Note which route file the endpoint attaches to and why
- Include the diagnosis/feedback loop for risky work: reproduce, minimize, hypothesize, instrument, fix, regression-test

### For data / agent work

- Identify the Supabase table(s) touched and their RLS implications
- State which agent (Harper/Oracle/Feucht/Consul/Herald) owns the reasoning, and why
- Specify the prompt shape and which instructions file in `backend-hono/src/services/ai/agent-instructions/` it lives in

## Phase 3 -- Development Flow

Lay out implementation as an ordered sequence. Single agent, so order matters more than parallelism.

Default order:

1. **Execution lane** -- task-owned Cloud worktree by default; record any explicit local exception and its capacity/proof gate
2. **Custody boundary** -- Ext is recovery-only, code uses Git plus bounded dirty-overlay preservation, and do not invent a bulk backup or local migration
3. **Data layer first** -- migrations, types, Zod schemas
4. **Service layer** -- pure functions, no framework coupling
5. **API layer** -- Hono routes, validation at boundary, early-return error handling
6. **Frontend gate** -- confirm design canon, approved library installation
   receipts, and the project ChatGPT Site record before touching frontend files
7. **Site composition** -- publish the implemented surface to the project Site
   and check it in the Codex in-app browser
8. **Automatic human review** -- when visual or content review is needed, open
   the Site-derived local HTML artifact with `human-review`, then apply feedback
   to source and refresh the Site
9. **Frontend data hooks and UI** -- queries, mutations, state, components, screens, interactions
10. **Validation** -- tsc, build, curl, Playwright, then the ChatGPT Site for
    source-integrated frontend proof
11. **Changelog + repo-native comment conventions** -- per project rules

Deviate from this order only with a stated reason in the brief.

## Phase 4 -- Brief Generation

Exit plan mode. Produce ONE standalone markdown briefing file.

### Brief File Template

````markdown
# S{N} - {Concise context}

## Problem And Solution

- **Original Problem**: [The user-visible problem that caused this sprint]
- **Solution**: [A name for the implementation that resolves the problem]
- **Outcome Objective**: Deliver [solution] so [user] can [outcome]; this sprint owner is responsible for behavior, controls, validation, and design proof.
- **Linear Review Source**: [Awaiting Review issue id(s), or none]

## Intent

[What the user gets when this is done, in one paragraph, user-facing language]

## Solvys Coding-Agent Contract

- Follow `SOLVYS_AGENT_SYSTEM_PROMPT.md`.
- For frontend/UI work, read `Design.md` immediately before planning and re-check this plan against `Design.md` before implementation.
- Start from repo truth and preserve intentional dirty state.
- Understand the whole product surface touched by this task, not only the immediate file.
- Keep visible UI canon stable unless TP explicitly asked for redesign.
- Prove completion through the highest-reality surface available before calling the work done.

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
- **Task-owned checkpoint ref**: `refs/sprints/S{N}/T1/P#`
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

## Execution And Storage Lane

- **Execution lane**: Cloud default | explicit local exception
- **Workspace path or Cloud branch**:
- **Estimated peak storage**:
- **Capacity reservation**:
- **Exit condition**:
- **Closure state**: active

## Scope -- Included

- [ ] {outcome 1}
- [ ] {outcome 2}

## Scope -- Excluded (OUT OF BOUNDS)

- {thing that sounds related but isn't part of this brief}

## Known Issues to Preserve

- {Intentional quirks, TODOs, recent changelog entries that must not be reverted}

## Design Pass

### ChatGPT Site Review

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

### Layout / Interaction

[If UI: describe layout, states, interactions, accent usage]

### API / Service Shape

[If backend: route, request/response, fallback behavior]

### Data / Agent Shape

[If data or agent work: tables, RLS, prompt, instructions file]

### Aesthetic Rules

- Fintheon app UI personality first: rails, drawers, composer behavior, buttons, icon bank, dense panels, typography, and source-owned primitives
- If UI was copied from another workspace, copy/adapt the real source implementation instead of recreating it from memory.
- No duplicate labels, implementation narration, or raw source strings without proper user-facing capitalization.
- Source-backed Liquid Glass, calmer frosted glass, flat rows, fading rulers, spacing, or type where separation is needed. Do not default every child control to a border.
- No unsourced gradients, emojis, Kanban borders, AI sparkles, generic glow/blur, generic box-shadows, decorative button borders/backplates, pointed square borders, triangular corner flags, or instant new surfaces.
- New popups, rails, drawers, modals, sheets, and panels must include enter/exit transitions.
- Use library-provided typography, spacing, and component defaults until TP
  applies the theme in the approved editor.

## Development Flow

1. [Step 1 -- data layer]
2. [Step 2 -- service layer]
3. [Step 3 -- API layer]
4. [Step 4 -- frontend hooks]
5. [Step 5 -- frontend UI]
6. [Step 6 -- validation]
7. [Step 7 -- changelog + headers]

## Acceptance Criteria

- [ ] The named solution resolves the original problem on the intended surface.
- [ ] Every requested or planned button/control performs the correct action through real interaction, including applicable loading, disabled, error, navigation, and persistence behavior.
- [ ] Shared and repo-local design canons were loaded before planning, and rendered desktop/mobile proof shows no canon violations; or Design impact: not applicable is recorded.
- [ ] The execution lane and capacity gate passed before any checkout, install, or build.
- [ ] If frontend was touched, the project ChatGPT Site was recorded, the
      library installation receipt was recorded, automatic human review ran
      when applicable, feedback was applied to source, and the
      source-integrated result passed in the Site.
- [ ] The Site matches the accepted source/spec in copy, geometry, data meaning,
      controls, states, responsive behavior, accessibility, and interaction
      proof. No placeholder or fake product behavior remains.
- [ ] {Happy path criterion}
- [ ] {Edge case 1}
- [ ] {Edge case 2}
- [ ] `npx tsc --noEmit --project frontend/tsconfig.json` passes
- [ ] `rm -rf dist && npx vite build` passes (if frontend touched)
- [ ] `cd backend-hono && bun run build` passes (if backend touched)
- [ ] Live endpoint tested via curl (if backend touched)
- [ ] UI manually or Playwright-verified (if frontend touched)
- [ ] Changelog entry added to `src/lib/changelog.ts`
- [ ] Repo-approved header or comment conventions were followed only where already standard

## Validation Commands

```bash
# Type check
npx tsc --noEmit --project frontend/tsconfig.json

# Clean frontend build
rm -rf dist && npx vite build

# Backend build (if applicable)
cd backend-hono && bun run build

# Live endpoint smoke test (if applicable)
curl -s http://localhost:8080/api/{endpoint} | head -c 200
```

## Commit Format

```
S{N} - {concise context}

Outcome: ...
Principal areas: ...
Proof: ...
Protected zones: ...
Remaining blocker: ...
```
````

### Where to Save

Save the brief to `sprint-md/S{SPRINT}-BRIEF-{slug}.md` at the CURRENT workspace root.

**Sprint-md folder rules:**

- `sprint-md/` lives at the TOP LEVEL of whatever repo we are working in -- never inside `docs/`, never inside a sub-app folder.
- Create it if it does not exist. Do not assume prior sprints used this path.
- If a legacy `docs/sprint-briefs/` folder exists in the repo, DO NOT write there. New plans always go to `sprint-md/`.
- Shipped briefs get archived to `sprint-changelog/` by `/solvys-deploy`. `sprint-md/` should only ever contain in-flight work.

**Sprint numbering:** Check existing files in `sprint-md/` AND `sprint-changelog/` (and any legacy `docs/sprint-briefs/`) for the highest S{N}. If the latest shipped is S26, the new brief is S27. Always confirm with the user if unsure.

## Phase 5 -- Handoff

Output ONLY the @ path mention to the brief file, in its own fenced code block, so the user can copy-paste it directly to an agent session. Follow with a 2-3 sentence non-technical summary of what the brief accomplishes. Do NOT dump the brief content inline.

Example output:

```
@sprint-md/S27-BRIEF-riskflow-sort-pinning.md
```

This brief adds per-user pinning to the RiskFlow feed so Herald surfaces can be anchored above the scored order. One focused agent session can take it end-to-end: Supabase migration, backend route, frontend hook, list component, validation.

## Rules

- Never skip Phase 1. Incomplete discovery leads to scope drift mid-build.
- Never produce more than ONE brief from this skill. If the work needs parallel tracks, pivot to `/solvys-orchestrate` instead and tell the user.
- Freeze the accepted plan on `Implement this plan`; do not silently expand or
  reinterpret it during dispatch.
- Always include both a Design Pass (Phase 2) and a Development Flow (Phase 3) in the brief. Skipping design is what produces UI that breaks the Solvys aesthetic.
- Always write to `sprint-md/` at workspace root, never to `docs/sprint-briefs/`.
- Check `src/lib/changelog.ts` (or project equivalent) for recent changes before finalizing scope -- recent intentional changes must be preserved.
- Every brief's validation commands must include `rm -rf dist` before build (for frontend work).
- Never include `npx vite` or dev server commands in the brief.
- Every brief must record the execution lane, workspace path or Cloud branch,
  peak storage estimate, capacity reservation, exit condition, and closure
  state.
- All repository implementation defaults to Cloud. Local work opens only for a
  documented capacity-safe exception; Ext remains recovery-only.
- Every repository implementation brief includes the complete repository-backed
  Codex Cloud Pickup block, exact environment identity, attachment/checkout/Git
  transport proof, task-owned checkpoint ref, date branch, name-only secrets
  manifest, excluded categories and purpose gates, resource budgets, proof
  gates, return path, and closure condition.
- Every applicable frontend brief carries the project ChatGPT Site URL,
  source-to-Site publication path, library installation record, automatic
  human-review state when applicable, and Site proof.

## Plane Integration

When the Plane MCP server is available (check for a `plane` entry in `.mcp.json`), use it for sprint tracking:

### During Brief Generation
- After writing the brief to `sprint-md/`, create a Plane issue:
  - Title: `S{N} {brief title}`
  - Description: the Intent section from the brief
  - State: `Backlog` or `Todo`
  - Priority: `urgent` if P0, `high` if complex, `medium` otherwise
  - Labels: `brief`, `s{N}`, backend/frontend/infra as appropriate

### After Brief Completion
- Move the Plane issue to `Done` when the brief ships
- Post a comment with the merge commit SHA

### Graceful Degradation
- If Plane MCP is unavailable, skip all Plane operations silently
- The brief file in `sprint-md/` is always the primary source of truth

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
