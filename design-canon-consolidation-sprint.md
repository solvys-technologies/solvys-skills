# Design Canon Consolidation Sprint

Status: Wave 1 implementation artifact.
Source of truth after landing: `/Users/tifos/Documents/Codebases/solvys-skills/Design.md`.

## Goal

Define the future frontend design stack and immutable agent guardrails for
Solvys, Fintheon, and client projects before broader product-surface work
continues. This is not a generic component-library showcase and not a Fintheon
redesign. It is canon cleanup, stack definition, file ownership, and validation
policy.

## Stack Decision Ledger

Stable canon:

- NumberFlow: animated numeric and countdown readouts.
- Leva: sandbox annotation, daily tuning, internal planning controls.
- cmdk: command palette, grouped launcher, keyboard-first action search.
- Virtuoso: large feeds, logs, grouped lists, and long tables.
- dnd kit: accessible sortable queues, boards, tabs, and customization.
- Fluid Functionalism: approved interaction reference for tabs, sliders,
  proximity affordances, and functional motion.

Conditional:

- Sonner: allowed only with right-justified CTAs, bare secondary actions, and a
  primary-token Liquid Glass chip for the suggested action.

Reference-only or denied:

- Liveline: denied as charting canon. Use existing charting or source-owned
  chart wrappers unless reopened later.
- Base UI: not assumed. It becomes usable only after target-project install and
  explicit acceptance.
- Figma/iOS Apple kits: reference geometry, tint, touch affordance, and material
  behavior. Translate into Solvys tokens and source-owned primitives.

## Universal Laws

- Shared `Design.md` is canon. Repo-local `Design.md` or `DESIGN.md` narrows
  defaults but cannot weaken universal rules.
- Read shared design canon, repo-local design docs, repo instructions, current
  source, and rendered proof before design decisions.
- Fintheon remains the reference cockpit: dense operational surfaces, warm
  near-black canvas, restrained gold accents, compact controls, source-owned
  primitives, icon-first UI, no decorative SaaS gradients, and no nested card
  stacks.
- Ordinary controls are borderless unless selected, primary, or source-owned.
- Selected tabs and selected sections use one compact selected bubble only.
- Liquid Glass is sparse black liquid glass with primary-token/pearl tint. No
  grain, raw white pearl, decorative glow, or broad gradient fills.
- Grain is explicit-only flat texture.
- Rails, sidebars, drawers, headers, main content, and composers blend into one
  shell. Main content may use iOS-style rounding only when chrome continues
  beneath the corners.

## File Ownership

Shared canon:

- `solvys-skills/Design.md`
- `solvys-skills/README.md`
- `solvys-skills/design-canon-consolidation-sprint.md`

Global agent skills:

- `~/.codex/skills/solvys-designer-planning/SKILL.md`
- `~/.codex/skills/solvys-designer-planning/references/component-gallery-contract.md`
- `~/.codex/skills/solvys-designer-planning/references/design-sins.md`
- `~/.codex/skills/solvys-feels/SKILL.md`
- `~/.codex/skills/solvys-feels/reference/css-tokens.md`

Fintheon local defaults:

- `fintheon/DESIGN.md`
- `fintheon/.agents/skills/solvys-feels/SKILL.md`
- `fintheon/.agents/skills/solvys-ui-cleanup/SKILL.md`
- `fintheon/.agents/skills/solvys-ui-detail/SKILL.md`
- `fintheon/.agents/skills/solvys-transitions/SKILL.md`

Prototype evidence:

- `fintheon/sprint-md/S121-liquid-glass-gallery.html`

## Wave Order

Wave 1 - Canon and enforcement:

- Update shared `Design.md` with stack ledger, shell law, Liquid Glass law, and
  validation gates.
- Add this sprint file.
- Add Fintheon repo-local `DESIGN.md`.
- Patch global and repo-local skills so startup reads shared plus repo-local
  design docs.
- Remove denied Liveline from the approved gallery demo set.

Wave 2 - Template and source preparation:

- Add future-project template references that copy shared canon then create a
  repo-local `Design.md`.
- Add lintable CSS/token notes for selected bubbles, Liquid Glass, rails,
  drawers, and shell geometry.
- Keep Fintheon product source unchanged unless explicitly authorized.

Wave 3 - Product migration planning:

- Map target Fintheon files by surface owner: shell, sidebar, top header, mobile
  header, QuantComposer, Arbitrum, theme/color picker, toasts, and RiskFlow
  guard zones.
- Define before/after proof for desktop and mobile.
- Keep RiskFlow product behavior untouched unless the sprint explicitly scopes
  it.

Wave 4 - Product implementation:

- Apply source-owned classes/tokens broadly, not as one-off component tweaks.
- Migrate surfaces by owner, not by scattered CSS overrides.
- Preserve app personality and avoid generic showcase work.

Wave 5 - Unification and proof:

- Remove duplicate material rules.
- Verify desktop/mobile screenshots, banned-pattern scan, typecheck, build, and
  reduced-motion behavior.
- Update sprint notes only after proof exists.

## Validation Gates

Planning gate:

- Shared `Design.md` read.
- Repo-local `Design.md` or `DESIGN.md` read when present.
- Installed-vs-approved library truth checked.
- Rendered proof inspected when available.

Implementation gate:

- No ordinary-control borders unless selected, primary, or source-owned.
- Selected tabs/sections use compact selected bubbles only.
- Liquid Glass has primary-token/pearl tint, no grain, no raw white.
- Grain only appears on explicit flat/textured surfaces.
- Rails, drawers, sidebars, headers, composer, and main canvas geometry are
  checked as one shell.

Proof gate:

- Desktop and mobile screenshots or explicit blocker.
- Banned-pattern scan for decorative gradients, nested cards, generic borders,
  uncontrolled glass, raw white pearl, detached drawers, and raw UI strings.
- Repo-native typecheck/build for touched frontend source.
- Reduced-motion and text-fit checks for surfaces with motion or compact labels.

## Deferred

- Product UI migration.
- Theme picker implementation.
- Color picker production wiring.
- Base UI adoption.
- Charting library replacement.
- Fintheon release notes or changelog entries for product source changes.
