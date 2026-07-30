# Bookmark Actionizer Workflow

Use this workflow when a user provides bookmark exports, saved-post dumps, research links, or a planning archive that should become an execution backlog instead of a static reference pile.

## Workflow

1. Accept one or more source inputs.
   - browser exports
   - X bookmark exports
   - copied link lists
   - notes or screenshots with URLs
2. Normalize each item into a source row with:
   - title or handle
   - URL
   - source type
   - short extraction note
   - project or track guess
3. Cluster every item into one primary bucket:
   - design
   - Fintheon
   - Priced In or trading
   - market signals
   - agents and tools
   - infrastructure
   - Cloudflare
   - client references
   - skills additions
   - pass or archive
4. Assign one status per item:
   - `USE NOW`
   - `CHERRIES`
   - `SKILLS-ADDITION`
   - `TEST / VALIDATE`
   - `PASS / ARCHIVE`
   - `LINEAR ISSUE`
   - `DEMO CANDIDATE`
5. Produce the artifact pack in [`bookmark-actionizer/`](./bookmark-actionizer/).
6. Keep provenance in every artifact. Every recommendation should preserve the original source handle or title plus the URL.

## Required Agent Behavior

During sprint planning, the agent should proactively surface leverage from the bookmark set in this format:

`Per your bookmarks, we could use <name>, a <repo/platform/tool> that <why it matters>. Link: <url>.`

If a bookmark-derived recommendation becomes a new Solvys project or greenfield frontend, route it through `/solvys-discovery` and `refero-design` before any frontend implementation brief. Frontend files, CSS, generated UI, and implementation-ready visual decisions stay blocked until the Refero reference lock exists.

## Planning Checks

- When a bookmark points toward scraping, browser automation, or a third-party integration, include a Browserbase or browser-to-api feasibility check before proposing bespoke code.
- When a bookmark looks like a reusable repo or skill candidate, decide whether it belongs in `skills-additions.md`, `demo-candidates.md`, or `pass-archive.md`.
- When a bookmark suggests deterministic docs, presentations, or complexity analysis, add it to the validation queue before expanding it into a default workflow.

## Validation Queue Defaults

- `Browserbase` and browser-to-api references: confirm whether browser automation can be replaced by a durable API or trace-driven flow.
- `Kappaemme`: test as a complexity-hotspot or review-signal aid before wiring it into a default review skill.
- `OfficeCLI`: test for deterministic docx/xlsx/ppt generation before making it part of a standard artifact pipeline.
- README upgrades: prefer collapsible details, diagrams, and asset links only when they improve operator pickup.
