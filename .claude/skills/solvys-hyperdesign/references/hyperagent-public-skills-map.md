# Hyperagent Public Skills Map

Use this file when `/solvys-hyperdesign` needs provenance or mode selection.

## Upstream Snapshot

- Repository: `https://github.com/alexmcdonnell-airtable/hyperagent-public-skills`
- Inspected commit: `0d732a229bdffd20eae708ead042856b929d008b`
- Commit date: 2026-06-12
- Format: JSON skill exports
- License file found: none

Because no license file was found, keep this as a metadata and workflow-inspiration map. Do not copy upstream `skillMdBody` text into Solvys outputs or skills without TP approval and a license decision.

## Adopted Design Routes

| Upstream Skill | Solvys Mode | Keep | Translate |
| --- | --- | --- | --- |
| Brand Book Generator | `brand` | three distinct identity routes, applied mockups, one-screen comparison | Solvys palette discipline, compact labels, source-backed product registers |
| Vignelli Canon Design System | `grid` | semantic discipline, timeless typography, wayfinding rigor | avoid pure pastiche; map to Solvys product or public register |
| Muller-Brockmann Grid Systems | `grid` | real modular grid, baseline lock, grid overlay verification | use Solvys typography, spacing, and proof language |
| nyt-data-viz | `data` | restrained color, chart-type judgment, annotations, tabular digits | use Solvys chart tokens and product data hierarchy |
| NYC Subway Campaign | `campaign` | locked logo asset, repeated placement consistency, agency case-study shape | avoid implying official third-party endorsement; re-skin to Solvys material |
| Veo + Hyperframes | `motion` | planned text zones, beat boards, overlay-first composition | use Solvys motion tokens and readable product copy |
| briefing-trailer | `motion` | real timeline to cinematic briefing, text-on-screen structure | ground in actual sources and avoid fictional operational claims |
| Claymation Explainer | `motion` | storyboard, character consistency, single voiceover, final web artifact | use only when the requested brand allows playful non-photoreal style |
| Claymation Podcast Clips | `motion` | transcript-to-shot plan, captions, original-audio preservation | confirm likeness and rights before rendering people |
| Landscaping design and quote | `configurator` | before/after switching, itemized quote, live recalculation | generalize to Solvys proposal/configurator demos with labeled assumptions |

## Excluded Or Secondary Routes

| Upstream Skill | Reason |
| --- | --- |
| Airtable Kanban Work Tracker | operational tracking, not part of the Solvys design suite |
| Business Simulation Operator Method | agent-operations methodology; borrow source-of-truth discipline only when designing a simulated product artifact |

## Refresh Procedure

1. Clone or fetch the upstream repo into `/tmp/hyperagent-public-skills`.
2. Record `git log -1 --format='%H %cI %s'`.
3. Extract only `name`, `description`, `whenToUse`, and `tags` from each JSON file.
4. Reconcile new entries into this map as `Adopted`, `Secondary`, or `Excluded`.
5. Keep `SKILL.md` focused on the Solvys workflow, not upstream internals.
