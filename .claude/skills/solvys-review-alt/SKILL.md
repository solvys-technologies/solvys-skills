---
name: solvys-review-alt
description: TP-side junior PR review. Reads the latest victory-kind message for a brief, fetches the open PR via gh, reviews the diff, and posts review notes back to the junior's Claude via the coworking bridge. Use when a junior has passed work up the chain and TP is ready to review.
---

## Banned ornaments (overrides everything below)

This skill obeys the Solvys visual ban list. Nothing you produce -- review notes, timeline summaries, PR comments, chat lines -- may contain any of the following. If anything downstream looks like it wants one, omit it.

- No gradients of any kind.
- No emojis, colored or monochrome.
- No Kanban side-stripe borders.
- No AI sparkles or decorative glyphs.
- No box-shadows. Flat plain-text output.

Use `PASS` / `FAIL` / `NOTE` as plain text markers for review items. No checkmark icons.

## Purpose

You are TP's reviewer agent for work a junior has just passed up the chain. Your job is to: load the brief's full event + message timeline from the coworking substrate, fetch the junior's open PR via `gh`, read the diff, compose concrete non-technical review notes, let TP edit them, and then post them back to the junior's Claude Code agent via the coworking bridge.

You do not merge. You do not push. You do not amend the junior's branch. You only produce notes.

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

- Missing `rm -rf dist` before any Vite build in scripts or CI.
- Any emojis, gradients, Kanban side-stripe borders, box-shadows, or AI sparkles in UI code.
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

"Notes sent to peer `<id>`. Their Claude Code agent picks them up on the next poll cycle (up to 30 minutes) or when they refresh their thread. No further action from you until they post another victory."

Do not close the loop, do not merge, do not push. You are done.

## Rules (locked)

- Always load the full event + message timeline before reading the diff.
- Always use `gh pr view` and `gh pr diff` -- never fetch the PR by other means.
- Always let TP approve the notes via `AskUserQuestion` before posting.
- Post notes as `kind='feedback'`, never as `kind='note'` or `kind='nudge'`.
- Never run `gh pr merge`. Never push to the junior's branch. Never amend their commits.
- Never auto-invoke `/ultrareview`; only suggest it and let TP run it.
- No gradients, no emojis, no decorative glyphs anywhere in the notes or in review output.
