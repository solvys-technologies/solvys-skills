# Solvys Design Guidelines

Use this file for UI work after loading `/solvys-feels`. For source hierarchy and stack choices, load `source-canon.md`.

Before planning any frontend/UI work, also load the Solvys-skills suite root
`Design.md`. Re-check the plan against `Design.md` before implementation.
For substantial Solvys work, load `/solvys-cao` before choosing the register so
the original problem, strongest precedent, client partition, and protected
zones are explicit.

## First Decision: Register

Name the register before designing:

- **Product UI:** Fintheon app first. Dense, operational, rail/drawer/composer aware.
- **Public product page:** Fintheon product page first. Liquid glass, product mockups, data atmosphere.
- **Parent studio/research:** solvys.io and pricedinresearch.io first. Sparse cinematic credibility.
- **Resident operations:** Solvys-1 first. Plain building language and staff/resident workflow clarity.
- **Fitness/local commerce:** SSFitness first. Dark athletic media and conversion clarity.

## Product UI Defaults

- Use Fintheon tokens: `#050402`, `#f0ead6`, `#c79f4a` / `#D4AF37`, warm surfaces, low-opacity borders.
- Build rails, toolbars, tabs, buttons, and drawers from existing app primitives before inventing new shells.
- Use lucide/local line icons, 1.5-2px stroke, theme-colored. Prefer icons inside tool buttons with labels only where command clarity needs them.
- Use the app icon facade, Lucide, Nucleo mappings, or verified brand SVGs. Do not invent agent-rendered icons when the bank already covers the concept.
- Do this in Fintheon: borderless icon controls like `frontend/components/proxvoice/ProxVoiceHeaderControl.tsx`, animated connected drawers like `frontend/components/layout/MobileUnderlayDrawer.tsx`, popover transitions like `frontend/components/layout/HeaderLockButton.tsx`, fading ruler separation via `frontend/styles/fading-ruler.css`, and source-owned glass treatment via `frontend/styles/ios27-glass.css`.
- Never do this: hover-border boxes around tiny icon buttons, arbitrary translucent backplates behind toolbar buttons, detached popup rails, instant new surfaces, pointed square borders, triangular corner flags, sharp outline ornaments, or homemade Liquid Glass.
- Selected main-content tabs highlight text/icon plus a thin border, underline, or restrained shimmer. Avoid filled selected backgrounds in dense product areas.
- Data values and KPIs use mono/tabular numerals.
- Empty/loading/saving states are local and compact: dot-matrix, braille where Solvys-1 already uses it, or inline `[LOADING...]` style text. Avoid page-wide skeletons.
- Drawers attach to their triggering input/rail/control. Do not float drawer-like popups as detached cards.
- New popups, rails, drawers, modals, sheets, and panels require enter/exit transitions. Use `/solvys-transitions` or repo-native motion primitives.
- Button backgrounds are for primary action fills or approved soft-glow states only. Toolbar and compact action buttons should remain borderless/transparent at rest and on hover unless an existing primitive proves otherwise.
- Do not render duplicate labels, implementation narration, or raw source strings. Convert raw values to proper user-facing capitalization before display.
- Corners must be intentionally softened or fully circular for true round controls. Do not use pointed square outlines or decorative corner flags.

## Liquid Glass

Allowed when source-backed:

- Fintheon product page public cards and CTAs.
- Existing Fintheon app glass surfaces.
- Solvys-1 `GlassSurface`, `GlassButton`, `GlassControlGroup`, and related primitives.
- SSFitness-style public CTAs/cards.

Rules:

- Liquid Glass is not a generic `backdrop-filter` recipe. Cite a professionally shipped product example or use a repo-owned source treatment before calling something Liquid Glass.
- Frosted glass is the calmer product material: warm translucent plate, restrained blur, optional thin owning-surface rim, no glow-rim theater.
- Use blur and transparency to clarify hierarchy, not as decoration.
- Keep borders thin and source-tinted.
- Avoid generic glow, bokeh, aurora, and purple-blue glass.
- Product UI glass should be calmer than landing-page glass.

## Typography

- Product UI: Readable Digits / Inter body, JetBrains Mono for data, Playfair/Cormorant only for rare display moments.
- Fintheon product page: Poppins plus Source Serif 4, with Doto-style uppercase micro-labels when the page already uses that register.
- Solvys / Priced In public pages: Almarai plus Instrument Serif.
- Solvys-1: project token fonts, Playfair and JetBrains where the repo already exposes them.
- Keep each screen to two font families and three practical sizes unless it is a true marketing hero.

## Website Imagery

- Public websites should use real product, place, object, or environment imagery: city/capital imagery for Solvys/Priced In, trading/product mockups for Fintheon, gym imagery for SSFitness, building/resident context for Solvys-1.
- Do not replace specific imagery with generic abstract gradients.
- A hero can be cinematic, but first viewport content must reveal the brand/product/place immediately.

## Inspiration Fidelity And Client Divergence

- When TP supplies an inspiration site, screenshot, or implementation, first
  reconstruct its composition, geometry, responsive behavior, and interactions
  faithfully enough for direct comparison. Inspect the real source or rendered
  reference; do not approximate from memory.
- After fidelity is accepted, keep a reference-to-client divergence ledger and
  replace copy, assets, brand, information architecture, signature artifact,
  and client-specific behavior until the result is unmistakably original.
- Use only source, assets, marks, and copy TP is authorized to use.
- Every applicable interactive element needs purposeful feedback or a
  microinteraction with visible-by-default and reduced-motion behavior.

## Stack Discipline

- Choose only from the stacks in `source-canon.md`.
- If a requested implementation would require a new base framework, icon runtime, auth system, database, or UI kit, call it out as out of canon and get explicit TP approval.
- Prefer extracting source-owned primitives over installing a new component system.

## Acceptance Checklist

- The register is named and matches the surface.
- The design source is named: Fintheon app, Fintheon product page, solvys.io, pricedinresearch.io, SSFitness, Solvys-1, or Impeccable process.
- The tech stack stays within the allowlist.
- Liquid glass, gradients, shadows, and blur are source-backed and functional, not decorative filler.
- Icons are local/lucide line icons with consistent stroke.
- Text and buttons fit on mobile and desktop.
- Verification includes screenshots or browser checks for visual work.
