# Universal Component Gallery Contract

The gallery is a source-backed reference, not a design mood board. It must show
real Solvys/Fintheon primitives, their states, their tokens, and the rules that
future projects inherit.

## Current Fintheon Source Map

Primary repo:
`/Users/tifos/Documents/Codebases/fintheon`

Primary frontend sources:

- `frontend/components`
- `frontend/components/ui`
- `frontend/components/chat`
- `frontend/components/feed`
- `frontend/components/narrative`
- `frontend/components/settings`
- `frontend/components/layout`
- `frontend/components/arbitrum`
- `frontend/components/journal`
- `frontend/components/apparatus`
- `frontend/components/consilium`
- `frontend/lib/theme.ts`
- `frontend/lib/font-theme.ts`
- `frontend/styles`

Key installed dependencies already present in Fintheon:

- `@base-ui/react`
- `@xyflow/react`
- `recharts`
- `d3-force`
- `framer-motion`
- `gsap`
- `three`
- `lucide-react`
- Tailwind 4

Observed component clusters from the current repo include chat/composer,
NarrativeFlow, settings/theme controls, RiskFlow feed surfaces, Arbitrum
workbench, journal/performance charts, apparatus maps, Consilium boardroom,
layout rails, icon bank, loaders, UI primitives, and marketing assets.

## Required Gallery Sections

1. Foundations: palette, type, spacing, radii, icon stroke, motion timing,
   glass-off, reduced-motion, severity colors, and data colors.
2. Commands: primary, secondary, ghost, danger, icon-only, segmented controls,
   toggles, menu triggers, and overflow controls.
3. Surfaces: cards, rows, panels, rails, drawers, modals, popups, sheets,
   toolbars, docks, and full-width page bands.
4. Feeds: RiskFlow cards, alert rows, event fuses, source previews, timeline
   rows, empty states, and error states.
5. Chat/composer: full composer, compact composer, connected drawers, provider
   modal, attachments, skills/connectors, mentions, queues, sessions, and tool
   approvals.
6. Navigation: sidebar, top header, mobile footer, mobile quick nav, tabs,
   command palette, and breadcrumbs when present.
7. Forms/settings: inputs, color picker, theme presets, font presets, toggles,
   profile save/rename/delete, integrations, and validation.
8. Data viz: Recharts samples, journal charts, macro chart, radial agent graph,
   apparatus flow map, graph canvas, legends, tooltips, and no-data states.
9. Motion: dropdown reveal, drawer attach/tuck, rail collapse, section
   transition, loader-to-success, fade-through, and drag/collapse gestures.
10. Marketing/public pages: Fintheon landing, product screenshots, video hero,
    app mockup treatment, and public copy register.

## State Matrix

Every gallery component needs the relevant states:

- rest
- hover
- focus
- active/pressed
- selected
- disabled
- loading
- saving/saved
- empty
- error
- partial/offline
- mobile
- high-density
- reduced motion
- glass off

## Chart And Graph Standard

- Sample chart library: Recharts, wrapped through Fintheon/Solvys chart
  containers and tokens.
- Sample graph library: `@xyflow/react` for node-edge workflows or `d3-force`
  for force/radial maps when the existing Fintheon source already uses it.
- Base UI standard: use `@base-ui/react` for gallery controls that need
  accessible headless primitives. Use Fintheon source components first when
  they already exist.
- Do not add another chart or graph library without a written reason and source
  comparison.

## Bookmark Source Boundary

Fresh bookmark direction must come from live X Bookmarks through the approved
Chrome extension/profile.

Allowed lanes:

- `Fintheon`
- `All other Solvys`
- `Design Bookmarks`

Do not substitute browser bookmark stores, old exports, BOS packets, repo docs,
Linear, web search, or memory as fresh bookmark intent. If live access is
blocked, write `bookmark_source_status: blocked` and cite only historical
inventories as prior context.

Historical Fintheon bookmark decisions that may seed the gallery after source
status is disclosed:

- shared CSS class contracts for buttons, cards, feeds, widgets, rails, menus,
  drawers, toasts, queues, and overflow controls
- reusable scroll fade affordances
- action and navigation menus
- restrained overflow/bloom menu pattern
- intent-revealed controls for dense surfaces
- depth restraint as a design review rubric
- source-backed Liquid Glass fallback only
- edge-to-edge mobile behavior
- compact tool-call transparency
- request-access drawer interaction
- dropdown processing loader that resolves into success
- radial graph polish for component gallery and Performance tab
- fade-through transition token
- drag-to-collapse left rail

## CSS Class Contract

New Solvys projects should define stable class families before one-off styling:

```css
.sv-button {}
.sv-button-primary {}
.sv-button-ghost {}
.sv-icon-button {}
.sv-card {}
.sv-panel {}
.sv-feed {}
.sv-feed-row {}
.sv-rail {}
.sv-drawer {}
.sv-menu {}
.sv-toast-inline {}
.sv-queue {}
.sv-overflow-controls {}
.sv-chart {}
.sv-graph {}
```

Names may be mapped to repo-specific prefixes, but the intent must stay stable
so global fixes do not require editing every component by hand.

