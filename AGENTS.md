> **Retired standalone skills bank, 2026-10-04.**
>
> The canonical bank now lives directly in [Solvys Factory](https://github.com/solvys-technologies/solvys-factory/tree/main/Skills).
> Each skill has its own `Skills/<original-author>/<skill>/SKILL.md` folder.
> Attach Solvys Factory alongside your product repository and start with its root `AGENTS.md`.
> New skills, updates, hooks and operational sequences belong in that monorepo.
> This repository is retired for history and provenance. GitHub archival is pending repository-administration access. The instructions below are historical;
> do not use its old installers or treat it as an active runtime bank.
>
> Factory consolidation: [PR #16](https://github.com/solvys-technologies/solvys-factory/pull/16).

# Solvys skills repository instructions

work freely, work with an open mind, and explore all possible options; never jump to conclusions at the second or third blocker. Be innovative, take inventory of your skills

This repository is the turnkey Solvys Factory suite.

Before changes:

1. Read `.claude/skills/communication-style-protocol/SKILL.md`.
2. Read `.claude/skills/solvys-building-blocks/SKILL.md`.
3. Read `.claude/skills/solvys-cao/SKILL.md`.
4. Read `.claude/skills/solvys-factory/SKILL.md`.
5. Preserve unrelated dirty work.

Keep skill bodies concise. Put detailed Factory policy in `factory/Solvys Operations Handbook.md` and task-specific records in the Codebase Cabinet.

For every frontend task, read and enforce
`factory/canon/frontend-wonder-source-of-truth.md`. Wonder is the protected,
human-editable visual source of truth. Preserve its 1:1 code mapping and do not
create a parallel UI, page, component library, or layout. When the project has
no Wonder-imported source, create or import it before new UI code begins.

Validate every skill with the skill-creator validator. Test the installer in an isolated target home before publication.

Use the daily `YYYY-MM-DD` integration branch, an `S### - concise context` PR title, green checks, and a squash merge into clean `main`.

<!-- SOLVYS_MONOREPO_BEGIN -->
## Solvys monorepo context

Read `../../../Codebase Cabinet/Internal Codebases/solvys-factory/AGENTS.md`, the current working canon, and this repository's state before planning. Read the current company/team manifesto and this project's manifesto from their authoritative paths or URLs before project work; record their revisions in the existing receipt. Missing sources block product implementation. After tests pass, reread both manifestos and the original request, then run a second acceptance pass over the complete user journey and integration boundaries before claiming completion. `.solvys/factory.json` records the factory revision and relative checkout. If this checkout layout changes, locate the attached `solvys-factory` repository and rerun its `workflow/attach.py`.

Run `python3 ../../../Codebase Cabinet/Internal Codebases/solvys-factory/workflow/route.py --event before-plan` and the matching phase events. Read only the returned existing skill sources from `../../../Codebase Cabinet/Internal Codebases/solvys-factory/Skills/<original-author>/`. All general operations, setup, authentication and design skills belong to this factory. Only specialized application E2E skills may remain in this product. Do not install a personal or external skill bank. Current user instructions override historical source material. Manual checkpoints are not installed harness hooks.

In native Warp use the attached factory's `workflow/warp.py` and actual task/plan evidence; no second operations ledger is required. Only a product opting into the legacy portable contract uses `python3 .solvys/workflow.py --event before-implementation` for implementation admission. The repository-local launcher binds this checkout automatically; the factory checks the exact plan and runs environment preflight. Source inspection uses `--resolve-only` and does not authorize implementation.

For canvas/PR-map work run `python3 .solvys/workflow.py --event canvas-request` and read the canonical Solvys-owned `../../../Codebase Cabinet/Internal Codebases/solvys-factory/Skills/Solvys/goalpost-canvas/SKILL.md`. Its attributed PR Lens adaptation uses the shared `../../../Codebase Cabinet/Internal Codebases/solvys-factory/design/canvas/` ReUI/BeUI/OpenUI contract. Product-local discovery links are projections into the attached monorepo, not separate skill bodies. Discover installed product capabilities before edits; a specification or offline proposal check does not prove a live transport or licensed Pro installation. Reattach with `--canvas-discovery` after changing the checkout layout.
<!-- SOLVYS_MONOREPO_END -->
