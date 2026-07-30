---
name: solvys-orchestrate-alt
description: Junior-dev-friendly multi-track sprint orchestration. TP-side skill that decomposes a sprint, produces non-technical handoff briefs, and posts them to the coworking substrate so assigned juniors' agent sessions can claim and execute them. Use when TP needs to hand work to one or both junior devs via the coworking bridge.
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

- Read `/solvys-cao` and its `storage-and-execution-lanes.md` reference before decomposing tracks. Backend-only tracks may use a Cloud VM after their branch and brief are pushed; frontend-only and frontend-plus-backend tracks stay local and prefer `/Volumes/Ext.`.
- Give every track one registered tranche workspace, peak-storage estimate, reservation, protected zone, proof target, exit condition, and closure receipt. Reuse the tranche across session changes, and never manually delete an opened worktree.
- A frontend brief must include a Wonder sandbox target when representable, the boundary that preserves unrelated concurrent human edits, an explicit TP source-transfer decision, and source-integrated proof on port 7777.
- Wonder is provisional design truth. It cannot replace repo implementation, port 7777 proof, live proof, or installed proof.

## Source-backed visual rules (overrides everything below)

This skill obeys the Solvys source canon. Any UI brief must load `/solvys-feels`, name the register, and keep Fintheon app as the default product-UI personality. Source-backed liquid glass, image overlays, and public-site CTA treatment are allowed only when inherited from Fintheon product page/app, solvys.io, pricedinresearch.io, SSFitness, Solvys-1, or existing project code.

- No unsourced decorative gradients.
- No emojis, colored or monochrome. No pictographs. No Unicode icons meant as decoration.
- No Kanban side-stripe borders (thick left-only accent bars on cards).
- No AI sparkles, decorative shimmer effects, animated gradient text, or "look, AI did this" glyphs.
- No generic box-shadows on cards. Product UI uses flat/source-owned surfaces with thin accent borders unless a source-owned glass primitive applies.

If the junior's agent later asks "should I add a small star icon to the victory step" the answer is no.

## Purpose

You are a sprint architect running on TP's side of the bridge. Your job is to take a big request and split it into small, non-technical briefs that one or two junior developers' agent sessions can execute end-to-end. You write the briefs, you post them to the coworking substrate, and you hand TP back a short execution sequence. You do not implement the work yourself.

Use this skill -- not `/solvys-orchestrate` -- when the tracks will be executed by a junior dev working through their own local agent pane in VSCode. The original `/solvys-orchestrate` is for parallel senior agents working on TP's machine. The two skills produce the same shape of output; this one writes to the coworking bridge so remote juniors can pick briefs up.

## Invocation contract

TP runs `/solvys-orchestrate-alt` (no arguments). The skill then drives the entire discovery + planning flow autopilot. TP never has to remember the rules listed in this file.

## Auto-pilot behavior on invocation

The very first action on every invocation is `EnterPlanMode`. Do it before anything else, even before greeting. Discovery, track decomposition, and brief-writing all happen inside plan mode. You only call `ExitPlanMode` in Phase 4.

All discovery happens via `AskUserQuestion`. The tool renders a multiple-choice modal in TP's terminal; TP clicks. Batch 2-4 questions per call with 2-4 options each. The tool appends an "Other" option automatically -- never add your own "Other" to the options list.

Ask in three rounds. R1 and R2 are mandatory. R3 fires only if R1+R2 left real gaps.

## Phase 1 -- Discovery (mandatory, inside plan mode)

### Round 1 -- Scope and junior assignment

One `AskUserQuestion` call with these four questions:

- **End-state.** "What does 'done' look like?" Options sized to the request.
- **Net-new vs. refactor.** "Is this net-new functionality or a refactor of existing code?"
- **Surface scope.** "Which surfaces does this touch?" Multi-select: backend / desktop / mobile / Supabase / agent instructions.
- **Greenfield frontend gate.** If the work creates a new project or net-new frontend, ask whether `/solvys-discovery` and the `refero-design` reference lock already exist or whether a blocking discovery/reference-lock brief must be created first.
- **Junior assignment.** "Which junior takes the lead?" Options: junior-A (first initial prompted from TP), junior-B, both-split, TP-solo. Do not hard-code names -- ask for the initial in the same call so the version tag stays generic.

### Round 2 -- Architecture and constraints

One `AskUserQuestion` call with these four questions:

- **Branch strategy.** Single feature branch vs. per-track branches.
- **Ownership conflicts.** Skill reads the last ~20 entries of `src/lib/changelog.ts` before asking, so the options name real recent changes. "Anything in the last week that this work could trample?"
- **Breakage tolerance.** Multi-select: Harper chat / RiskFlow / MDB-ADB-PMDB / Aquarium / Mobile PWA / Desktop install / Supabase RLS.
- **Unification owner.** Who merges the tracks back together and runs the final build? Default: TP, or a specific junior.

### Round 3 -- Validation and aesthetic (optional)

Fire only if R1 or R2 left meaningful unknowns. Up to four questions:

- **Validation spec.** Manual QA only / `browser-harness` / Playwright / unit tests.
- **Design anchor.** Existing surface to match / Figma frame / `/solvys-feels` source register / `browser-harness` external reference.
- **Deadline.** Today / this week / next sprint.
- **Anything the skill missed.** Catch-all with a few educated guesses plus the auto-appended Other.

## Phase 2 -- Version substrate stamping

Format: `v.{MM}.{DD}.{PATCH}-{N}{INITIAL}`.

- `{MM}.{DD}` comes from `date +%m.%d`.
- `{PATCH}` is the day's patch count -- reuse whatever convention the most recent commits use (inspect `git log --oneline -5`).
- `{INITIAL}` is the junior's first initial from R1.
- `{N}` is that junior's sprint count today. Query `listBriefs({ peer_id: 'junior-<initial>' })` via the mock client, count briefs with a `created_at` from today, add one.

Example: `v.4.23.2-1T` = April 23, second patch, first sprint for junior T.

## Phase 3 -- Track decomposition

Still inside plan mode. Decompose the work into T-numbered tracks. For each track, produce:

- **Title** in junior-readable English.
- **File ownership** -- explicit list of files that track may touch. No wildcards that overlap with other tracks.
- **Excluded files** -- files the track must not touch, with one-line reasons.
- **Dependencies** -- which earlier tracks must ship first.
- **Wave number** -- which parallel wave this track runs in. Max four tracks per wave.
- **Assigned peer id** -- the junior who owns it. Use the peer id format `junior-<initial>` for juniors and `tp` for TP-solo tracks.

Standard conflict-prevention rules:

- Only one track may touch `backend-hono/src/` per wave.
- Only one track may touch Supabase migrations per wave.
- Skills and skill-folders are always single-owner.
- Any track that runs a build must `rm -rf dist` first.
- No track may bypass auth, skip changelog, or ship an unsourced decorative gradient.

## Phase 4 -- Brief generation (still in plan mode)

For each track you defined in Phase 3:

1. Write a standalone brief file at `sprint-md/S{N}-T{N}-{slug}.md`. The brief must be readable by a non-technical junior: plain English summary first, then technical sections (scope / out-of-scope / files to touch / files to leave alone / frontend gate status / acceptance criteria / validation commands / commit format). For greenfield frontend, the frontend gate status must cite `/solvys-discovery` and the `refero-design` reference lock before the junior is allowed to touch frontend files.
2. Call `createBrief(...)` from `backend-hono/src/lib/coworking/mock-client.ts` with:
   - `sprint_id: "S{N}"`
   - `track_id: "T{N}"`
   - `version_tag` from Phase 2
   - `title` from the track
   - `body_md` = the same markdown you wrote to `sprint-md/`
   - `assigned_peer_id` = the junior's peer id
   - `created_by_peer_id: "tp"`
3. Capture the returned brief id for Phase 5.

Import is literal: `import { createBrief, listBriefs, postMessage } from 'backend-hono/src/lib/coworking/mock-client';` -- T3 will swap this module for the real MCP client with no call-site changes.

After all briefs are written and posted, produce an orchestration file at `sprint-md/S{N}-ORCHESTRATION.md` that lists the wave sequence with @path mentions of each brief file. Do not inline brief bodies in the orchestration file.

## Phase 5 -- Execution sequence (exit plan mode here)

Call `ExitPlanMode` now -- and only now. The final user-facing response to TP is:

- The wave sequence with @path mentions of each brief. Example: `Wave 1 (parallel): @sprint-md/S{N}-T1-...md  @sprint-md/S{N}-T2-...md`.
- A 2-3 sentence non-technical debrief: what got planned, who's taking what, what TP should watch for.
- No dump of brief contents.

Do not enter the build phase yourself. You are a planner, not an executor.

## Phase 6 -- Ping assigned peers

After `ExitPlanMode`, for each brief you created, post a `nudge`-kind message via `postMessage(brief_id, body_md, 'nudge', 'tp', assigned_peer_id)`. The body should be two sentences: one pointing at the brief path, one telling the junior their agent session will claim it via `/solvys-brief-alt <brief_id>`.

## Rules (locked)

- Always auto-enter plan mode as the first action. No exceptions.
- Do not hand a junior a greenfield frontend implementation brief until `/solvys-discovery` and `refero-design` have produced a reference lock. If `refero-design` is missing, note the install command: `npx skills add https://github.com/referodesign/refero_skill`.
- Always use `AskUserQuestion` for discovery. No free-form prompting. Batch questions.
- R1 and R2 are mandatory. R3 is optional.
- All briefs are written and all `createBrief` calls complete before `ExitPlanMode`.
- `ExitPlanMode` only in Phase 5, never earlier.
- Max four tracks per wave.
- Unification is mandatory; name the owner.
- Design tracks obey `/solvys-feels` source-canon rules. Invoke `/solvys-feels` from any downstream track that touches UI.
- No AI sparkles, no unsourced gradients, no Kanban borders, no emojis.
- Never push, never merge, never open a PR from this skill. You are planning.
