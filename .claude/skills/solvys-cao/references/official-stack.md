# Official Solvys Stack

Last verified: 2026-07-16. This is an ownership ledger, not permission to install everything. Existing repos keep their proven base unless TP authorizes migration.

## Installation Foundation

Every product build and implementation-planning pass starts by recording or
installing this foundation before component design, code, or an implementation
plan proceeds:

1. **BeUI** is the primary interaction and component source.
2. **Vercel UI library** is a secondary source when BeUI does not own the
   required eligible pattern.
3. **Bklit** is the primary eligible data-visualization source.
4. **EvilCharts** is a secondary data-visualization source when Bklit does not
   own the required eligible pattern.

For every item, record `installed`, `already installed`, `planned`, or `not
applicable`, plus provenance, version or source revision, target seam, owner,
protected zones, fallback, and proof requirement. The gate does not authorize
blanket dependency installs, migrations, or replacing a proven product-owned
surface. It requires an explicit, installation-first decision before work
starts.

## Selection Rules

1. Reuse repo-owned primitives and installed dependencies first.
2. Use one owner per concern and document protected zones.
3. For copied-source libraries, record source URL, revision/checksum, local path, license, theme adapter, motion adapter, allowed surfaces, and last review date.
4. Put a representative gallery and rendered acceptance gate before any broad migration.
5. A UI library owns presentation only; product state, domain semantics, cadence, security, and persistence stay with the product contract.

## Foundations

- **React 19 + TypeScript + Zod:** default application language and contract validation where the target product is React.
- **Vite + Bun:** preferred for Fintheon-style product shells, desktop renderers, and fast operational apps.
- **Next.js + OpenNext + Cloudflare:** preferred for SSFitness-style websites/PWAs and authenticated public products when that deployment register applies.
- **Electron + electron-builder:** desktop product packaging when the application is device-resident.
- **Hono + Bun/Node:** lightweight product APIs and service adapters in Fintheon-style systems.
- **Postgres/Supabase or repo-proven storage:** follow the product's current data authority; no global database swap.

## Interaction And Primitives

- **Base UI (`@base-ui/react`):** preferred headless accessible primitive foundation for greenfield React products. In existing products, adopt only where installed and accepted; do not migrate stable Radix/source-owned behavior for fashion.
- **BeUI:** approved copy-source motion component and interaction library for eligible drawers, sheets, tooltips, selects, modals, loaders, toasts, and authored motion patterns. Retain provenance and remove slop defaults.
- **Vercel UI library:** secondary interaction and component source. Use only for an eligible pattern BeUI does not already own, retain provenance, and keep product state and domain behavior outside the library.
- **BeUI Pro:** licensed/credentialed source for eligible agent composer, profile, and advanced interaction patterns. Never expose registry tokens or let presentation own chat/provider state.
- **cmdk:** command palettes, grouped launchers, and keyboard-first action search.
- **React Virtuoso:** large variable-height feeds, grouped lists, logs, tables, and chat histories. Do not virtualize small lists without evidence.
- **dnd kit:** accessible sortable queues, tabs, customization, and boards when drag/drop is a real workflow.
- **Sonner:** conditional toast foundation only when the product does not already own notification state and the visual treatment is redesigned into the product register.
- **Leva:** internal sandboxes, tuning, annotation, and design calibration; never ship it as customer-facing product chrome.

## Motion And Numerals

- **One motion runtime per repo.** Greenfield uses the current Motion package (`motion/react`). Existing Fintheon retains its `framer-motion` contract until an authorized migration changes repo canon. Do not mix Motion, Framer Motion, GSAP, and temporal CSS in one production surface.
- **NumberFlow (`@number-flow/react`):** app-owned changing numerals, counts, scores, percentages, durations, and summaries. Exclude high-frequency instrument prices, sub-two-second data, canvas/iframe/native chart text, and contexts where movement hurts scanning. Reduced motion renders the final value immediately.
- **Solvys transitions:** use repo/shared transition tokens for simple surface continuity when the repo canon assigns CSS rather than a React runtime. Content stays visible by default.

## Data Visualization

- **Bklit:** primary eligible analytical charts and heatmaps when a product needs authored, composable visualization. It is source-copied through the shadcn registry and currently carries beta/experimental surfaces, so pin provenance and keep live trading, fuses, canvas, maps, and high-frequency renderers protected.
- **EvilCharts:** secondary data-visualization source. Use only when Bklit does not own the eligible pattern, pin provenance, and preserve product-owned data cadence, live renderers, and fuses.
- **Tremor Raw:** secondary KPI/status blocks, analytical tables, filters, ranges, and simple charts. Use copy-source components, not legacy `@tremor/react`, and never use it as a generic application card shell.
- **Datawrapper API:** authored publication graphics for reports, memos, and editorial figures through a server-only adapter with a local static fallback. Never use it for live operational dashboards or expose its token to the browser.
- **Existing live engines:** TradingView, lightweight-charts, MapLibre, native canvas/SVG, and product fuses remain product-owned unless an explicit migration contract proves cadence and interaction parity.

## Agentic Product UI

- **assistant-ui:** approved runtime/lifecycle foundation when the product needs a structured AI chat system. A presentation library may wrap it but cannot replace provider, queue, approval, session, tool, or recovery ownership.
- **AI SDK/provider adapters:** follow the target product's installed provider and trust boundaries. Do not expose routing, secrets, or proprietary prompts in client bundles.

## Icons And Brand Marks

- **Local Solvys icon facade:** mandatory runtime boundary. Components import from the product facade even when underlying bodies originate in Lucide, Tabler, Phosphor, Iconoir, Radix, Nucleo, or another approved bank.
- **Verified official brand SVGs:** preferred for real integrations and brands, stored as bare marks with source URL, license/provenance, retrieval date, and checksum.
- **Lucide:** acceptable fallback source when already installed, never the product's unfiltered visual personality.
- **Nucleo:** approved when the project owns the license/assets and mappings.
- Never invent a brand glyph or migrate the global icon language before a representative gallery passes.

## State, Data, And Quality

- **TanStack Query / repo-proven query layer:** server-state caching and invalidation.
- **Zustand:** compact client state when current product patterns support it.
- **React Hook Form + Zod:** forms and validation where already installed or selected for greenfield.
- **Vitest + Testing Library:** unit/component contracts.
- **Playwright:** browser flows, responsive interaction, and highest-reality local UI proof.
- **Renovate:** bounded dependency updates; stable patches may auto-merge only behind checks and age gates, while copied source, minors, majors, unstable packages, and sensitive runtimes remain review-only.
- **Sentry or repo-owned telemetry:** production error evidence when the product already has the account and privacy contract.

## Default Rejections

- A second base UI kit, icon runtime, animation runtime, chart library, auth provider, ORM, database, or CSS framework without an ownership gap and TP approval.
- Generic SaaS section kits as a product identity.
- Paid/proprietary packages without license and credential confirmation.
- Abandoned, source-obscured, insecure, or pre-1.0 dependencies in a critical path without a pin, fallback, and review owner.
- Dependencies whose integration and update cost is larger than the small product-owned seam they replace.

## Approved Repository Canon

This is the shortlist to inspect before searching broadly. Approval means the
repository is a proven source or reference for its named job; it does not mean
every new project installs it.

### Default foundations

- `base-ui-components/base-ui` - accessible unstyled React primitives for a
  greenfield product that has not already selected a stable primitive owner.
- `motiondivision/motion` - the greenfield React motion runtime when CSS tokens
  cannot express the required interaction.
- `barvian/number-flow` - eligible changing numerals under the cadence and
  reduced-motion boundaries above.
- `tanstack/query`, `pmndrs/zustand`, `react-hook-form/react-hook-form`, and
  `colinhacks/zod` - server state, compact client state, forms, and runtime
  contracts when the selected product architecture needs those separate jobs.
- `microsoft/playwright` and `vitest-dev/vitest` - browser truth and fast
  unit/contract proof. Neither replaces the other.
- `renovatebot/renovate` - dependency review automation under the bounded update
  policy above.

### Solvys specialist sources

- `starc007/ui-components` - BeUI source for eligible authored controls and
  motion patterns. Copy through provenance and Solvys adapters.
- `bklit/bklit-ui` - analytical chart and heatmap source. Keep product cadence,
  data models, and protected renderers native.
- `tremorlabs/tremor` - Tremor Raw analytical blocks, tables, filters, and simple
  charts. Never make it the product shell.
- `petyosi/react-virtuoso` - long variable-height feeds, logs, tables, and chat
  history.
- `clauderic/dnd-kit` - sortable and drag/drop workflows with a real interaction
  requirement.
- `assistant-ui/assistant-ui` - structured AI chat lifecycle where the product
  needs it, behind product-owned provider and session contracts.
- `maplibre/maplibre-gl-js` and `tradingview/lightweight-charts` - specialized
  map and market rendering. These remain product-owned protected zones.

### Reference and intake only

- `shadcn-ui/ui` - inspect accessible source patterns and registry mechanics.
  Do not import its default visual identity or add Tailwind to a stable non-
  Tailwind product for one component.
- Marketing block galleries, animation showcases, Figma kits, and copied HTML
  references - use for lawful reconstruction and learning, then pass through the
  reference-to-client divergence gate. They never become Solvys identity by
  default.

For every new repository candidate, record: problem solved, current owner gap,
license, maintenance evidence, install or copy model, update owner, allowed
surfaces, protected zones, fallback, and proof gallery. Reject the candidate if
those answers are weaker than the product-owned seam it would replace.

## Current Primary Sources

- BeUI: `https://beui.dev` and `starc007/ui-components`
- Bklit: `https://bklit.com/docs/components` and `bklit/bklit-ui`
- Base UI: `https://base-ui.com/react`
- Motion: `https://motion.dev/docs`
- NumberFlow: `https://number-flow.barvian.me`
- Tremor Raw: `https://github.com/tremorlabs/tremor`
- Datawrapper API: `https://developer.datawrapper.de`
- React Virtuoso: `https://virtuoso.dev`
- dnd kit: `https://docs.dndkit.com`
