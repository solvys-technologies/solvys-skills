---
name: solvys-designer-planning
description: Solvys frontend design planning for websites, apps, PRDs, Design.md files, component galleries, style/vibe selection, reference research, CSS architecture, and anti-slop guardrails. Use before any new Solvys frontend, website, landing page, dashboard, component suite, motion-designed surface, app redesign, or visual polish pass; use when the user says Solvys-designer-planning, cardinal design sins, component gallery, Artsy, Tech SaaS, Motion Designed, OpenDesign, Superdesign, Awwwards, Refero, TypeUI, Taste Skill, Impeccable, Anthropic frontend design, or Design.md guardrails.
---

# Solvys Designer Planning

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


Use this skill before frontend work, not after the UI has already drifted.
Planning is the default for greenfield frontend, new websites, public pages,
major redesigns, component systems, and motion-heavy surfaces.

## Non-Negotiable Startup

1. Read `/Users/tifos/Documents/Codebases/solvys-skills/Design.md`.
2. Read the target repo instructions and the source files for the real surface.
3. For greenfield or new-project frontend, run `/solvys-discovery` and
   `refero-design` before touching frontend files.
4. Open or prepare the applicable Wonder sandbox for every new frontend change
   that can be represented there. Record the agent-owned artboard and disregard
   concurrent human-owned changes outside that scope.
5. Keep Wonder provisional. Require TP's explicit source-transfer authorization
   before applying the accepted direction to product source, then verify the
   integrated result on port 7777.
6. Use `design-taste-frontend`, `impeccable`, `frontend-design`, and
   `frontend-responsive-design-standards` as supporting critics only. They do
   not override Solvys `Design.md`, repo truth, or user-specific bans.
7. If a user has not pre-selected a style for a new project, plan extensively
   before implementation. Do not write CSS or components until a PRD, reference
   lock, and project `Design.md` exist.

## Source Rules

- Existing project: inspect real components, tokens, routes, screenshots, and
  rendered behavior before prescribing a design system.
- Fintheon component gallery: start from
  `/Users/tifos/Documents/Codebases/fintheon/frontend/components`,
  `/frontend/lib/theme.ts`, `/frontend/lib/font-theme.ts`, and existing
  marketing assets/docs.
- Bookmark-derived direction: use live X Bookmarks through the approved Chrome
  extension/profile. Do not substitute Chrome bookmark stores, old exports,
  repo docs, Linear, search, or memory as fresh bookmark intent.
- If live bookmark access is blocked, state that clearly and use prior
  inventories only as historical seed material.

## Research Hierarchy

For new design work, research inspiration in this order:

1. Awwwards for high-level composition, editorial rhythm, and brave layouts.
2. Refero for style, screen, and flow reference locks.
3. Superdesign for generated draft exploration and design-system capture.
4. TypeUI / awesome-design-skills for reusable design-system variants.

Research extracts architecture and principles, not copied code or decoration.
Every major design choice must trace to the user brief, source product, or a
locked reference.

## Vibe Selection

Choose exactly one dominant vibe unless the user explicitly asks for variants:

- Artsy: OpenDesign-first, editorial composition, unusual but disciplined
  structure, art-directed media, and restrained interaction.
- Tech SaaS: Taste Skill as a critic, big real hero imagery, product mockups
  from the app, contrasting type, and lush but source-backed screenshots.
- Motion Designed: OpenDesign or Superdesign planning, explicit overlay/video
  background model, legibility layer, scroll or ambient motion budget, and
  reduced-motion fallbacks.

Read `references/vibe-matrix.md` before committing a vibe.

## Reference Files

- `references/design-sins.md`: the cardinal violations to prevent.
- `references/questionnaire.md`: the 50-question planning questionnaire.
- `references/vibe-matrix.md`: vibe, palette, font, media, and tooling matrix.
- `references/component-gallery-contract.md`: universal component gallery source
  map, required pages, state coverage, and chart/graph stack.

Read only the references needed for the current task.

## Required Outputs

For a new website, app, or major redesign, produce:

1. PRD with the original user problem, named solution, outcome-owned objective,
   user, business, content, workflow, state, and proof requirements.
2. Reference lock with primary direction, secondary details, rejects, and role
   rules.
3. Project `Design.md` with palette, fonts, spacing, components, motion, media,
   CSS contracts, accessibility, responsive rules, and bans.
4. Component-gallery citation: which existing components, tokens, and patterns
   are being reused or extended.
5. CSS architecture plan: token file, component class families, utility
   boundaries, data-viz tokens, and responsive constraints.
6. Verification plan: desktop/mobile rendered proof, reduced-motion check, text
   fit, overlap scan, accessibility states, banned-pattern scan, and real
   click/tap proof for every requested or planned button/control across its
   relevant loading, disabled, error, navigation, and persistence states.
7. Wonder handoff: file/page/artboard, agent-owned target, human-owned changes
   ignored, accepted decision, source-transfer authority, and port 7777 proof.

## Hard Stops

Stop and report a blocker if any of these are true:

- The project has no source inventory and the user asked for source-backed
  design.
- A new frontend has no PRD, reference lock, or project `Design.md`.
- The work depends on live X bookmark folders and live access is unavailable.
- A proposed design requires fake glass, decorative gradients, bokeh/orbs,
  generic card grids, invented icons, or motion without a product reason.
