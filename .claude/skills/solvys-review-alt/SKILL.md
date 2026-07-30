---
name: solvys-review-alt
description: TP-side junior PR review. Reads the latest victory-kind message for a brief, fetches the open PR via gh, reviews the diff, and posts review notes back to the junior's agent session via the coworking bridge. Use when a junior has passed work up the chain and TP is ready to review.
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



## Source-backed visual rules (overrides everything below)

This skill obeys the Solvys source canon. Review output stays plain, but UI review should distinguish source-backed material from decorative slop.

- No unsourced decorative gradients.
- No emojis, colored or monochrome.
- No Kanban side-stripe borders.
- No AI sparkles or decorative glyphs.
- No generic box-shadows. Plain review output; source-owned glass/material is acceptable in UI code only when justified by `/solvys-feels`.
- No decorative button borders/backplates unless they are primary fills or approved soft-glow states.
- No pointed square borders, triangular corner flags, sharp outline ornaments, or homemade Liquid Glass without a source-backed shipped example.
- New popups, rails, drawers, modals, sheets, and panels must have enter/exit transitions.

Use `PASS` / `FAIL` / `NOTE` as plain text markers for review items. No checkmark icons.

## Purpose

You are TP's reviewer agent for work a junior has just passed up the chain. Your job is to: load the brief's full event + message timeline from the coworking substrate, fetch the junior's open PR via `gh`, read the diff, compose concrete non-technical review notes, let TP edit them, and then post them back to the junior's agent session via the coworking bridge.

You do not merge, push, or amend the junior's branch. You produce review notes
and may complete a linked Linear issue only after a `SHIP IT` verdict passes
the implementation, control, validation, and design evidence gates.

## Invocation contract

TP runs `/solvys-review-alt <brief_id>` or `/solvys-review-alt` (no arg).

With a `brief_id`, jump straight to Step 1 (Load context).

Without an arg:

1. `listBriefs({ status: ['victory'] })` via the mock client at `backend-hono/src/lib/coworking/mock-client.ts`.
2. `AskUserQuestion` -- "Which brief are you reviewing?" Options: up to 4 briefs, most recent first. The tool auto-appends Other; do not add your own.
3. When TP picks, proceed with that brief_id.

## Step 1 -- Load context

Call `pollNotes(brief_id)` (no `since` cutoff -- you want the full history for this brief). You will get every message posted on the thread in chronological order. Render a compact plain-text timeline:

```
claim            -> junior-T             @ 10:14
discovery pass   -> junior-T             @ 10:17
... etc
victory          -> junior-T             @ 13:42
```

Include the junior's victory summary verbatim so TP does not have to scroll for it.

## Step 2 -- Fetch the PR

Find the PR:

- `gh pr list --head feature/s{N}-t{N}-<slug> --json number,title,headRefName,state`.
- If no match, list all open PRs authored by the junior with `gh pr list --author <junior-gh-username> --json number,title,headRefName` and ask TP via `AskUserQuestion` which one matches.

Load the diff metadata:

- `gh pr view <pr-number> --json number,title,body,headRefName,files,additions,deletions,commits`.
- `gh pr diff <pr-number>` for the full diff.

## Step 3 -- Review

Walk the diff. Flag, at minimum:

- Whether the implementation solves the original problem named in the brief, rather than only matching the file checklist.
- Any requested or planned button/control without real click/tap evidence for the correct action and applicable loading, disabled, error, navigation, or persistence states.
- Any UI work without evidence that shared and repo-local design canons were loaded and rendered desktop/mobile proof passed.
- Missing `rm -rf dist` before any Vite build in scripts or CI.
- Any emojis, unsourced decorative gradients, Kanban side-stripe borders, generic box-shadows, AI sparkles, decorative button borders/backplates, pointed square borders, homemade Liquid Glass, or instant new UI surfaces in UI code.
- Skipped `browser-harness` step -- confirm via the event log pulled in Step 1 (look for a `browser_harness` event with `status='passed'`; if missing or `blocked`, flag it).
- Missing changelog entry in `src/lib/changelog.ts` (the actual file in the PR should include a new entry dated today).
- Auth bypass, secret leaks, or any `console.log` of sensitive values.
- Files touched outside the brief's File Ownership list.

If the PR is large enough to warrant a deeper pass, tell TP to invoke `/ultrareview <pr-number>` themselves. Do not auto-launch `/ultrareview` -- it is billed separately and TP decides.

## Step 4 -- Compose notes

Produce two sections, both in plain non-technical English by default:

1. **What's good** -- one short paragraph, no more than 3 bullets. Call out things the junior did well so they get reinforcement.
2. **Fixes needed** -- numbered list, each item a single concrete change. Every item names the file, the line or component, and the expected after-state. No vague "tighten up X". Mark each item `MUST` or `NICE` so the junior's agent can prioritize.

End with one of three verdicts: `SHIP IT`, `FIX AND SHIP` (list applies), or `REWORK` (major rework needed; include why).

## Step 5 -- TP approval gate

Do NOT post the notes yet. Use `AskUserQuestion`:

- Question 1: "Approve these notes as written?" Options: "Post as-is" / "I'll edit" / "Discard".
- If TP picks "I'll edit": exit plan mode long enough for TP to type edits in the chat, then re-show the final version and ask again.
- If TP picks "Discard": stop here. Post nothing.

Only after TP picks "Post as-is" do you proceed to Step 6.

## Step 6 -- Post notes

Call `postMessage(brief_id, notes_md, 'feedback', 'tp', assigned_peer_id)` from the mock client. `assigned_peer_id` comes from the brief record loaded in Step 1. The body is the final, TP-approved markdown from Step 4.

## Step 7 -- Confirm

Tell TP plainly:

"Notes sent to peer `<id>`. Their agent session picks them up on the next poll cycle (up to 30 minutes) or when they refresh their thread. No further action from you until they post another victory."

Do not merge or push. After the Linear disposition below is recorded, the
review is done.

If the verdict is SHIP IT and the brief or PR identifies a Linear issue in
Awaiting Review, comment with the reviewed implementation, control, validation,
and design evidence, then move it to the team's completed state. For FIX AND
SHIP or REWORK, leave it reviewable and include the missing gate in the posted
feedback. If Linear access is unavailable, report the exact issue as blocked
instead of claiming completion.

## Rules (locked)

- Always load the full event + message timeline before reading the diff.
- Always use `gh pr view` and `gh pr diff` -- never fetch the PR by other means.
- Always let TP approve the notes via `AskUserQuestion` before posting.
- Post notes as `kind='feedback'`, never as `kind='note'` or `kind='nudge'`.
- Never run `gh pr merge`. Never push to the junior's branch. Never amend their commits.
- Never auto-invoke `/ultrareview`; only suggest it and let TP run it.
- No unsourced gradients, emojis, or decorative glyphs anywhere in the notes or in review output.
