---
name: solvys-bookmark-actionizer
description: Turn bookmark exports into proactive backlog artifacts, sprint suggestions, demo candidates, and skill-addition notes with preserved provenance. Use when the user drops bookmark exports, X saves, link piles, or source clusters that should become implementation work instead of passive inspiration.
---

# Solvys Bookmark Actionizer

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


## Purpose

Use this skill when bookmarks should become a working backlog. The goal is to turn saved links, X exports, notes, and pasted sources into artifacts an agent can act on immediately.

Keep the distribution path `.claude/skills/` for compatibility, but write instructions in runtime-neutral language. Assume the executing environment could be Codex, OpenCode, Cursor, or another agent runtime.

## Input Sources

Accept any mix of:

- bookmark export JSON
- pasted URLs
- copied post text
- local planning notes
- repo-specific references

If the user gave multiple sources, preserve source precedence exactly as stated by the user. If no precedence was given, use:

1. Latest explicit user correction
2. Existing handoff or orchestration decisions
3. Curated map or summary doc
4. Raw export item text

## Clusters

Cluster each item into one primary bucket:

- design
- Fintheon
- priced-in-trading
- market-signals
- agents-tools
- infrastructure
- Cloudflare
- client-references
- skills-additions
- pass-archive

If an item clearly supports multiple buckets, keep one primary bucket and note cross-links in provenance.

## Statuses

Apply one status per item:

- `USE NOW`
- `CHERRIES`
- `SKILLS-ADDITION`
- `TEST / VALIDATE`
- `PASS / ARCHIVE`
- `LINEAR ISSUE`
- `DEMO CANDIDATE`

Do not invent softer substitutes. Preserve shorthand exactly.

## Required Outputs

Produce all of these files using the templates in `templates/`:

- `bookmark-clusters.md`
- `sprint-suggestions.md`
- `linear-issue-candidates.md`
- `skills-additions.md`
- `cherries.md`
- `pass-archive.md`
- `demo-candidates.md`

Each output must preserve source links and short provenance notes.

## Required Planning Behavior

When a bookmark suggests near-term action, agents should proactively surface it in this exact shape:

> Per your bookmarks, we could use ____, a ____ repo/platform/tool that ____. Link: ____.

Use that line in sprint suggestions, brief notes, or handoff summaries when it genuinely strengthens the plan.

If a bookmark-derived recommendation becomes a new Solvys project or greenfield frontend, route it through `/solvys-discovery` and `refero-design` before any frontend implementation brief. The backlog artifact must say that frontend files, CSS, generated UI, and implementation-ready visual decisions are blocked until the Refero reference lock exists.

## Workflow

1. Normalize the source list.
   - Remove duplicate links.
   - Keep the most descriptive text block available.
   - Preserve handle, title, URL, and date when present.

2. Classify the item.
   - Pick a primary cluster.
   - Assign one status.
   - Write one sentence on why it matters now.

3. Turn sources into artifacts.
   - `bookmark-clusters.md`: every item bucketed with status and provenance
   - `sprint-suggestions.md`: concrete work packages, not vague themes
   - `linear-issue-candidates.md`: local issue candidates only unless the user explicitly asked for live Linear mutation
   - `skills-additions.md`: candidate workflows, tests, and integration notes
   - `cherries.md`: reusable patterns or ideas worth porting
   - `pass-archive.md`: explicitly rejected or parked items
   - `demo-candidates.md`: sources that are best suited to a demo surface or narrative

4. Preserve boundaries.
   - Do not create live Linear issues unless the user explicitly asked.
   - Do not present legal or compliance claims as settled.
   - Do not treat bookmarked inspiration as permission to import dependencies or copy code.

## Review Checks

Before closing, verify:

- every output file exists
- every kept item has a source link
- every recommended sprint is concrete enough to implement
- `skills-additions.md` names required validation for external ideas such as Browserbase, OfficeCLI, or Kappaemme-style analyzers
- pass/archive decisions are explicit rather than silently dropped

## Reference Patterns

- Timeless / Recollect style flow: ingest, tag, cluster, resurface during planning
- Lazyweb / Hallmark style research: separate use-now, redesign, audit, and pass decisions
- Browserbase / browser-to-api: evaluate when third-party workflow capture or automation is a better fit than a pure API integration
- README upgrade ideas: use richer repo presentation only when it clarifies the workflow, not as decoration
- Test-first additions: Kappaemme and OfficeCLI-style ideas must land in `skills-additions.md` with validation notes before they are treated as standard workflow
