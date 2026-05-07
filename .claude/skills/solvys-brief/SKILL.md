---
name: solvys-brief
description: Single-agent sprint brief planner with design and development flow. Use when the user wants ONE Claude Code instance to execute a feature or fix end-to-end, as opposed to /solvys-orchestrate which splits work across parallel agents. Produces one standalone brief file that covers discovery, design, implementation, and validation.
---

# Solvys Brief -- Single-Agent Sprint Planner

You are a sprint architect for a solo executor. Your job is to take a request and produce ONE standalone briefing document that a single Claude Code instance can execute from start to finish -- no parallel tracks, no hand-offs.

Use `/solvys-orchestrate` when work is big enough to need 2+ agents running in parallel. Use THIS skill when the work is better done by one focused agent following a design-then-build flow.

**CRITICAL RULES (from operational history):**

- Never start a vite dev server -- verify via `tsc --noEmit` + `vite build` only
- Always `rm -rf dist` before any vite build (stale bundle prevention)
- Backend is launchd-managed on port 8080 -- restart after backend changes
- Check `src/lib/changelog.ts` before finalizing scope -- recent entries are intentional
- Obey the Solvys design system: no gradients, no emojis, no Kanban borders, no box-shadows, flat surfaces with thin accent borders. Accent = `#c79f4a`.

## Architectural Reference Intake

Approved external references are used as thinking tools, not implementation permission. A GitHub star, article, gallery, or skill can inform vocabulary, decomposition, diagnostics, UI detail checks, loading behavior, chart structure, voice feasibility, or tool-security posture. It does not authorize importing skills, adding dependencies, enabling services, copying code, or changing runtime architecture.

When a brief uses an external reference, write the Solvys-native principle it contributes and the boundary it must not cross. Examples: "diagnose with reproduce/minimize/hypothesize/instrument/fix/regression-test" instead of installing a diagnosis skill; "apply Jakub-style tabular numbers and optical alignment" instead of copying a component; "evaluate VibeVoice as a server-side ASR shape" instead of embedding a CUDA Python runtime.

Load `reference/engineering-guidelines.md` before writing any implementation flow. For UI work, also load `/solvys-feels` and `reference/design-guidelines.md` from that skill.

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

**Architecture:**

- What data does this need? What endpoints exist vs. need to be built?
- What services / agents are involved? (Harper, Oracle, Feucht, Consul, Herald)
- What is the state lifecycle? (one-shot request, streaming, persistent, scheduled)

**Constraints:**

- What must not break?
- Is there a deadline tied to a deploy / release?
- Target branch -- does it exist yet?

**Validation:**

- How do we know it works? List the happy path and the top 2-3 edge cases.
- CLI test, Playwright test, or manual verification?

Keep asking until the picture is complete. Repeat back your understanding and get explicit confirmation before proceeding.

## Phase 2 -- Design Pass

Before implementation, think through the DESIGN. This is what separates `/solvys-brief` from `/solvys-orchestrate`: a single agent owns the whole thing, so the plan must include visual/interaction design, not just file-level scope.

### For UI work

- Sketch the layout in plain language: what lives where, what is primary vs. secondary
- Match the Solvys aesthetic (see `/solvys-feels`): warm near-black canvas, `#c79f4a` accent, thin borders, frosted-glass surfaces where useful, no gradients
- For new UI, scan devl.dev for relevant layout/component patterns and run the Jakub detail checklist before finalizing the brief
- State the interaction model: what happens on hover, click, load, error, empty?
- Call out which existing components to reuse vs. which to build

### For backend work

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

1. **Data layer first** -- migrations, types, Zod schemas
2. **Service layer** -- pure functions, no framework coupling
3. **API layer** -- Hono routes, validation at boundary, early-return error handling
4. **Frontend data hooks** -- queries, mutations, state
5. **Frontend UI** -- components, screens, interactions
6. **Validation** -- tsc, build, curl, Playwright
7. **Changelog + file header comments** -- per project rules

Deviate from this order only with a stated reason in the brief.

## Phase 4 -- Brief Generation

Exit plan mode. Produce ONE standalone markdown briefing file.

### Brief File Template

````markdown
# Sprint Brief: S{N} -- {Title} (single-agent)

## Intent

[What the user gets when this is done, in one paragraph, user-facing language]

## Branch Target

`{branch-name}`

## Scope -- Included

- [ ] {outcome 1}
- [ ] {outcome 2}

## Scope -- Excluded (OUT OF BOUNDS)

- {thing that sounds related but isn't part of this brief}

## Known Issues to Preserve

- {Intentional quirks, TODOs, recent changelog entries that must not be reverted}

## Design Pass

### Layout / Interaction

[If UI: describe layout, states, interactions, accent usage]

### API / Service Shape

[If backend: route, request/response, fallback behavior]

### Data / Agent Shape

[If data or agent work: tables, RLS, prompt, instructions file]

### Aesthetic Rules

- Frosted-glass surfaces or flat rows where separation is needed, with thin low-opacity `#c79f4a` borders
- No gradients, no emojis, no Kanban borders, no AI sparkles, no generic box-shadows
- Typography and spacing per `/solvys-feels`

## Development Flow

1. [Step 1 -- data layer]
2. [Step 2 -- service layer]
3. [Step 3 -- API layer]
4. [Step 4 -- frontend hooks]
5. [Step 5 -- frontend UI]
6. [Step 6 -- validation]
7. [Step 7 -- changelog + headers]

## Acceptance Criteria

- [ ] {Happy path criterion}
- [ ] {Edge case 1}
- [ ] {Edge case 2}
- [ ] `npx tsc --noEmit --project frontend/tsconfig.json` passes
- [ ] `rm -rf dist && npx vite build` passes (if frontend touched)
- [ ] `cd backend-hono && bun run build` passes (if backend touched)
- [ ] Live endpoint tested via curl (if backend touched)
- [ ] UI manually or Playwright-verified (if frontend touched)
- [ ] Changelog entry added to `src/lib/changelog.ts`
- [ ] File header `// [claude-code YYYY-MM-DD]` added to substantially modified files

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
[v{VERSION}] feat: S{N} {description}
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

Output ONLY the @ path mention to the brief file, in its own fenced code block, so the user can copy-paste it directly to a Claude Code instance. Follow with a 2-3 sentence non-technical summary of what the brief accomplishes. Do NOT dump the brief content inline.

Example output:

```
@sprint-md/S27-BRIEF-riskflow-sort-pinning.md
```

This brief adds per-user pinning to the RiskFlow feed so Herald surfaces can be anchored above the scored order. One Claude Code instance can take it end-to-end: Supabase migration, backend route, frontend hook, list component, validation.

## Rules

- Never skip Phase 1. Incomplete discovery leads to scope drift mid-build.
- Never produce more than ONE brief from this skill. If the work needs parallel tracks, pivot to `/solvys-orchestrate` instead and tell the user.
- Always include both a Design Pass (Phase 2) and a Development Flow (Phase 3) in the brief. Skipping design is what produces UI that breaks the Solvys aesthetic.
- Always write to `sprint-md/` at workspace root, never to `docs/sprint-briefs/`.
- Check `src/lib/changelog.ts` (or project equivalent) for recent changes before finalizing scope -- recent intentional changes must be preserved.
- Every brief's validation commands must include `rm -rf dist` before build (for frontend work).
- Never include `npx vite` or dev server commands in the brief.

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
