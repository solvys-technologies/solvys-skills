---
name: solvys-brief-alt
description: Junior-dev cattleprod. Claims a coworking brief and walks the junior through a scripted 15-step pipeline from discovery to merged PR. Auto-invokes browser-harness QA, /solvys-feels, and /solvys-beta-alt at the right checkpoints so the junior never has to remember them. Use when a junior has a brief ID to execute.
---

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

## Execution, Storage, And Wonder Contract

- Read `/solvys-cao` and its `storage-and-execution-lanes.md` reference before assigning a workspace. Backend-only work may use a Cloud VM after the branch and brief are pushed; frontend-only and frontend-plus-backend work stay local and prefer `/Volumes/Ext.`.
- Every sprint owns one registered tranche workspace, peak-storage estimate, reservation, protected zone, proof target, exit condition, and closure receipt. Never create a new worktree merely because a new session opened, and never manually delete an opened worktree.
- For frontend changes, use Wonder as the provisional design sandbox when the surface can be represented there. TP may design alongside the agent; preserve and disregard unrelated human Wonder changes, and stay inside the assigned artboard, branch, or element scope.
- Wonder approval does not prove the product. TP explicitly chooses what crosses into source, then the owner implements that selection and proves the source-integrated result on port 7777 before claiming frontend completion.

## Source-backed visual rules (overrides everything below)

This skill obeys the Solvys source canon. UI work must load `/solvys-feels`, name the register, and use Fintheon app as the default product-UI personality. Source-backed liquid glass, image overlays, and public-site CTA treatment are allowed only when they come from Fintheon product page/app, solvys.io, pricedinresearch.io, SSFitness, Solvys-1, or existing project code.

- No unsourced decorative gradients.
- No emojis, colored or monochrome.
- No Kanban side-stripe borders (thick left-only accent bars).
- No AI sparkles, decorative shimmer effects, or decorative "AI did this" glyphs.
- No generic box-shadows on cards. Product UI uses flat/source-owned surfaces with thin accent borders unless a source-owned glass primitive applies.

Use a plain `PASS` / `FAIL` text marker for status. No checkmark icon.

## Tone

Default to non-technical language. You are talking to a junior developer who can read code but does not yet know the codebase's conventions. Explain the why, not just the what. Drop into technical detail only when you are actually showing code, calling a tool, or the junior asks for it.

## Invocation contract

Junior types `/solvys-brief-alt <brief_id>` in their local IDE agent pane. The brief_id comes from TP via the coworking bridge -- it will already be posted in the junior's thread by the time they run this.

If the junior runs `/solvys-brief-alt` with no argument, list their open briefs:

1. `listBriefs({ peer_id: '<junior peer id>', status: ['open', 'claimed', 'in_progress'] })` via the mock client. The junior's peer id is `junior-<initial>`; ask if you don't already have it.
2. Show the titles + ids in a plain list.
3. Use `AskUserQuestion` ("Which brief are you working on?") to pick one.
4. Resume the flow with that brief_id.

## Claim

Call `claimBrief(brief_id, '<junior peer id>')` via the mock client. Three outcomes:

- Success -- status becomes `claimed`. Continue.
- Already claimed by this junior -- continue without re-claiming.
- Claimed by a different peer -- stop. Tell the junior plainly: "This brief is claimed by peer X. Check with TP before taking it." Do not proceed.

## The 15 steps

Every step advances the coworking event log. You are responsible for posting a `started` event at the top of each step and a `passed` or `failed` event at the end. Never skip an event post -- TP's audit trail depends on it.

Event post call: `postEvent(brief_id, step_name, status, note?)` from `backend-hono/src/lib/coworking/mock-client.ts`. Import:

```ts
import {
  claimBrief,
  postEvent,
  postMessage,
  pollNotes,
  markVictory,
} from "backend-hono/src/lib/coworking/mock-client";
```

### Step 1 -- Discovery

Fetch the brief via `listBriefs({ peer_id: '<junior peer id>' })` and find the one matching `brief_id`. Read `body_md`. Summarize it in one paragraph of plain English to the junior: "You are adding a Save button to the Strategium panel so users can...". Include: what ships, what success looks like, what surfaces it touches. Post `{ step_name: 'discovery', status: 'passed' }`.

### Step 2 -- Handoff acknowledgment

Restate the work in one paragraph, call out any hidden assumptions you noticed that the brief did not (e.g., "the brief assumes we already have a `useStrategium` hook; that exists, confirmed via grep"). Post `{ step_name: 'handoff', status: 'passed' }`.

### Step 3 -- Plan

If the brief is for a new project or greenfield frontend, confirm the brief includes `/solvys-discovery` evidence and a `refero-design` reference lock before planning frontend code. If either is missing, stop and post a `failed` plan event that says TP needs a discovery/reference-lock brief first. If `refero-design` is missing in the active runtime, tell TP the install command is `npx skills add https://github.com/referodesign/refero_skill`.

If the brief's surface scope includes UI, auto-invoke `/solvys-feels` to ground the design. Name the source register before writing any component code: Fintheon app product UI, Fintheon public product page, Solvys/PRI studio, Solvys-1 resident ops, or SSFitness public PWA.

Use `AskUserQuestion` for any remaining unknowns the brief did not cover. Examples: placement ambiguity, copy choices, which variant of an existing component to reuse. Batch up to four questions.

Produce a short numbered step list the junior can see. Post `{ step_name: 'plan', status: 'passed', note: '<short plan summary>' }`.

### Step 4 -- Build

Implement the plan. Touch ONLY the files listed in the brief's File Ownership section. Never create files outside that list without asking TP via `postMessage(..., kind='note')` first.

Post `{ step_name: 'build', status: 'started' }` at the top. Post `{ step_name: 'build', status: 'passed' }` when code compiles and the local type-check is clean.

Before the type-check: `rm -rf dist` if the track includes a Vite build, then run the build (not just `tsc`). For backend-only tracks, run `cd backend-hono && bun run build`.

### Step 5 -- browser-harness QA (critical, never skip)

This is the single most-skipped step by junior-dev agents and the one most likely to hide real UX breaks. Auto-invoke it. The junior should not have to ask.

Call `browseTask` from `backend-hono/src/services/browser/operator.ts` with:

- `url`: the deployed preview URL (or localhost if the brief calls for it)
- `objective`: "verify the acceptance criteria listed in the brief"
- `extract_schema`: a Zod schema mapping each acceptance-criterion id to `{ passed: z.boolean(), evidence: z.string() }`

If every criterion passes: post `{ step_name: 'browser_harness', status: 'passed' }` and continue. If any criterion fails: post `{ step_name: 'browser_harness', status: 'failed', note: '<which criteria failed and why>' }` and jump to Step 6.

### Step 6 -- Debug

Diagnose and fix the failures from Step 5. Post `started` and `passed` around the fix. When the fix lands, loop back to Step 5 and re-run the browser-harness sweep. Do not advance past this step until Step 5 comes back clean.

### Step 7 -- Re-test

Re-run the Step 5 `browseTask` sweep with the same objective + schema. Post `{ step_name: 'retest', status: 'passed' }` only if every criterion now passes. Otherwise loop to Step 6.

### Step 8 -- Declare victory

Post `{ step_name: 'victory', status: 'passed' }`. Show the junior a plain text `PASS` line -- no checkmark icon, no emoji, no decorative glyph.

### Step 9 -- Recap

One paragraph non-technical recap for the junior: what shipped, what to look for when they install the beta DMG in Step 10. This is not a technical diff; this is the "here's what your product manager would say" version.

### Step 10 -- Beta build

Wait for the junior to type an intent like "build beta" or "ship me a DMG". When they do, invoke `/solvys-beta-alt`. If that skill isn't installed, fall back to `/solvys-beta`. Capture the DMG path from the build output.

Post `{ step_name: 'beta', status: 'passed', note: '<dmg path>' }`.

### Step 11 -- Junior check

Produce a numbered checklist of things for the junior to visually verify in the DMG -- mapped directly to the brief's acceptance criteria, one item per criterion. Use `AskUserQuestion` one criterion at a time: "Does the Save button appear in the top-right of Strategium?" (Yes / No / Looks different / Skip).

If the junior says No or Looks different on any item: post `{ step_name: 'junior_check', status: 'failed', note: '<criterion id + what junior saw>' }` and jump back to Step 6. Do not pass this step until every check is Yes.

When all checks pass: post `{ step_name: 'junior_check', status: 'passed' }`.

### Step 12 -- Pass up the chain

When the junior types something like "pass it up" or "send to TP", call `markVictory(brief_id, summary)` where `summary` is the one-paragraph recap from Step 9.

Tell the junior plainly: "I'm waiting for TP's review. Monitor this thread -- I will pick up their notes automatically and apply them in this same session. No action from you until I tell you."

### Step 13 -- Poll TP notes

Call `pollNotes(brief_id, since=<now>)` to check for new messages. If nothing yet, schedule the next poll with `ScheduleWakeup` for 20-30 minutes out. Stay warm but not chatty -- the junior does not need a "still waiting" update every wake.

When a message arrives and the body says "ship it" (or equivalent approval): advance to Step 14 without another code change. When the body lists fixes: summarize them in plain English for the junior, then loop back to Step 4 (Build) to implement. Every fix posts its own `started` / `passed` events.

### Step 14 -- Re-debug and retest

After TP's notes are applied, rerun Steps 4, 5, 6, 7 as needed. Post a fresh victory event (`{ step_name: 'victory', status: 'passed', note: 'post-review' }`) when clean.

### Step 15 -- Push and PR

- `git add` only the files from the brief's File Ownership section.
- `git commit -m "[v.{version_tag}] feat: S{N}-T{N} {title}"`.
- `git push --set-upstream origin feature/s{N}-t{N}-...`.
- `gh pr create --title "[S{N}-T{N}] {title}" --body "<body>"`. The body must include: a link/reference to the brief file, the acceptance criteria as a checklist, and a one-line note that browser-harness was run and passed.

Never run `gh pr merge`. The merge gate stays with TP.

Tell the junior: "I opened the PR. Type 'flush memory and feedback' to end this thread cleanly."

Post `{ step_name: 'pr_open', status: 'passed', note: '<pr url>' }`.

## Rules (locked)

- Never skip Step 5 (browser-harness QA). If tooling is unavailable, post `{ step_name: 'browser_harness', status: 'blocked' }` and wait for TP via `postMessage(..., kind='note')` -- do not fake it.
- Post an event for every step, even quick ones. The event log is TP's audit trail.
- Never push to `main`. Only to `feature/s{N}-t{N}-...` branches.
- Never run `gh pr merge`. Trust gate: TP merges.
- Every commit message carries the version substrate tag in the `[...]` prefix.
- Speak to the junior in non-technical language unless they ask for detail or you are showing code.
- Never create files outside the brief's File Ownership list without a `postMessage(..., kind='note')` back to TP and an ack.
- No unsourced gradients, emojis, or decorative glyphs. Ever.
