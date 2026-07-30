---
name: solvys-fully-yop
description: Competitor and feature inspiration planning for Solvys products. Use when the user wants to find same-level competitors, study their features and UI, reverse-engineer a Solvys-native implementation plan, search open-source repos, and reuse existing Fintheon, Solvys-1, HeirRight, or shared Solvys components before proposing new builds.
---

# Solvys Fully YOP

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


Find same-level competitors, extract useful feature and UI inspiration, then turn it into a reuse-first Solvys build plan.

Use this skill when a product idea needs market reality, visual references, open-source leverage, and a concrete internal implementation path instead of a vague inspiration board.

## Core Contract

- Load `SOLVYS_AGENT_SYSTEM_PROMPT.md` before touching a Solvys repo or writing an implementation plan.
- For UI planning, load `/solvys-feels` and its relevant source-canon/design references.
- For any new Solvys project or greenfield frontend, run `/solvys-discovery` and `refero-design` before proposing frontend implementation. The plan must include the Refero reference lock and decision ledger before it names frontend files, CSS, generated UI, or implementation-ready visual direction.
- Search for same-level competitors first: comparable buyer, maturity, workflow depth, price band, distribution channel, and product surface. Aspirational giants belong in a separate bucket.
- Treat external products as inspiration only. Do not copy code, protected assets, proprietary wording, pricing tables, screenshots, or unique trade dress.
- Reuse Solvys internals in this order before proposing new build work:
  1. Fintheon components, agents, rails, drawers, data hooks, provenance, and UI canon
  2. Solvys-1 app/admin/resident-ops components, auth, data, and operational flows
  3. HeirRight/HWRITE lead, dossier, review, export, and public-record patterns
  4. Shared Solvys skills, scripts, design tokens, and run-point workflows
  5. Permissively licensed open-source repos with verified license and fit
  6. Net-new Solvys implementation
- Every plan must show source links, reuse candidates, visual interpretation, implementation phases, and proof strategy.

## Workflow

1. Frame the opportunity.
   - Define the target product, feature, user, and outcome.
   - Identify which Solvys repo or product family would own it.
   - State the feature level: tiny interaction, full workflow, agent capability, admin tool, marketplace feature, or new product wedge.

2. Find same-level competitors.
   - Search the web for products solving the same job at a comparable level.
   - Classify competitors as `same-level`, `adjacent`, or `aspirational`.
   - Keep at least three same-level candidates when available, with source links and why they qualify.

3. Extract feature inspiration.
   - Break each feature into user job, objects, data, state transitions, permissions, edge cases, and operational workflow.
   - Identify what is worth channeling into Solvys and what should be rejected.
   - Keep a source ledger so every idea remains traceable.

4. Capture visual and interaction references.
   - Search product pages, docs, screenshots, videos, app listings, design galleries, and web examples.
   - Describe visual interpretations in plain language: layout, hierarchy, components, empty/loading/error states, and interaction model.
   - Translate each pattern into the correct Solvys register rather than copying the external look.

5. Scan Solvys internals.
   - Search Fintheon, Solvys-1, HeirRight/HWRITE, and shared Solvys skills for reusable components, services, flows, prompts, schemas, and validation patterns.
   - Prefer adapting an existing Solvys primitive over adding a dependency.
   - Note gaps where a new shared primitive would reduce future duplication.

6. Search open source only after internal reuse.
   - Search GitHub, package registries, docs, and examples for permissively licensed repos.
   - Verify license, maintenance, framework fit, security risk, and whether the repo should be used as dependency, code reference, or pattern only.

7. Reverse-engineer the Solvys build plan.
   - Define the Solvys-native product behavior.
   - Map source inspiration to internal components and services.
   - Split into small implementation phases with validation per phase.
   - Include a proof plan: browser screenshots, live endpoint checks, packaged-app checks, diagnostics, or real data runs as appropriate.

## Required Output

Produce a markdown plan with these sections:

- `Opportunity`: target user, product, feature, and intended outcome
- `Competitor Set`: same-level, adjacent, aspirational, and rejected candidates
- `Feature Inspiration Ledger`: sourced patterns worth adapting
- `Visual Interpretation Board`: source link, observed UI pattern, Solvys-native translation
- `Solvys Reuse Matrix`: candidate components/services/repos and adaptation notes
- `Open-Source Candidates`: license, maintenance, fit, risk, and adoption level
- `Build Plan`: ordered phases, files/repos, data/API shape, UI shape, and validation
- `Risks And Boundaries`: copy risk, dependency risk, product-fit risk, and what not to build

## Reference

Load `references/competitor-to-build-plan.md` for the same-level competitor rubric, source search prompts, reuse matrix, OSS criteria, and implementation-plan template.

## Review Checks

Before closing, verify:

- same-level competitors are not mixed with aspirational anchor products
- every borrowed idea has a source link and a Solvys-native translation
- Fintheon, Solvys-1, HeirRight/HWRITE, and shared Solvys reuse were checked before OSS
- OSS candidates include license and maintenance evidence
- UI recommendations align with `/solvys-feels` instead of external trade dress
- greenfield frontend recommendations cite `/solvys-discovery` and the `refero-design` reference lock before implementation
- implementation phases include real-surface validation, not only build commands
