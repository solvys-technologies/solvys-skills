# Solvys Source Canon

Last live/source pass: 2026-07-16.

Use this file when a Solvys skill, brief, app, website, or product UI needs source-of-truth design or stack guidance. The goal is not to make every surface look identical. The goal is to keep the family resemblance, use proven implementation stacks, and preserve each product's register.

Load `/solvys-cao` first for the original problem, best-work precedent, client
partition, decision authority, protected zones, and proof rung. The current
library ownership ledger lives in
`../../solvys-cao/references/official-stack.md`; this file governs product
register and visual-source selection.

## Source Hierarchy

1. **Fintheon current app** is the primary UI personality for product software: rails, drawers, composer geometry, buttons, icon discipline, tokens, dense panels, fonts, live-data layout, and system motion.
2. **Fintheon product page** at `https://pricedinresearch.io/fintheon` is the public product-page register: liquid-glass cards, data rain, product mockups, terminal atmosphere, Poppins body, Source Serif display italics, Doto micro-labels, and direct product stakes.
3. **solvys.io** is the parent studio register: black cinematic space, real Miami/Brickell imagery, large cream wordmark, gold microcopy, Almarai plus Instrument Serif, sparse navigation, and "products before consensus" confidence.
4. **impeccable.style** is the rolling design-process reference: use its PRODUCT.md / DESIGN.md / document / extract / live / detect ideas to keep Solvys skills current. Treat it as workflow inspiration, not a visual default. On 2026-06-04 `impeccable.design` failed TLS hostname verification, while `impeccable.style` was current.
5. **Solvys-1 Renters** is the resident/building-operations register: plain building language, beige/green plus dark grey/green themes, Next/Expo monorepo patterns, Clerk, tRPC, Drizzle/Postgres, glass primitives, and staff/resident task density.
6. **SSFitness / Stryv Society Fit** at `https://stryvsocietyfit.com` is the fitness/public-PWA register and website stack source: Next.js/OpenNext on Cloudflare, Clerk, dark athletic image-led pages, gold CTAs, mobile/PWA metadata, and direct conversion copy.
7. **pricedinresearch.io** is the research-desk parent register: institutional imagery, Almarai plus Instrument Serif, dark gold/cream editorial pacing, and "intelligence before consensus" copy.

## Tech Stack Allowlist

Do not introduce a new base stack for Solvys work unless TP explicitly asks for it. Pick from these proven sources:

### Product Apps

- React 19, TypeScript, Tailwind v4, CSS custom properties, Zod.
- Fintheon-style Vite + Bun for app shells, desktop-bound frontends, fast product prototypes, and Electron renderer work.
- Electron + electron-builder for local desktop software.
- Hono + Node/Bun services for Fintheon-style APIs.
- Supabase, Neon/Postgres, pg, Redis, Sentry, LiveKit, AI SDK, OpenAI/Anthropic provider adapters, and MCP SDK only where the product already needs those capabilities.
- Zustand, React Query/tRPC, Framer Motion, lucide-react, local icon facades, and source-owned UI primitives.
- Base UI for greenfield accessible headless primitives; existing repos adopt it
  only when installed and explicitly accepted.
- BeUI/BeUI Pro for eligible source-owned interaction patterns, Bklit for
  eligible analytical charts, Tremor Raw for secondary analytical data
  surfaces, and NumberFlow for eligible app-owned changing numerals. Each needs
  provenance, allowed surfaces, protected zones, and a representative rendered
  acceptance gate before broad migration.

### Websites / PWAs

- Next.js / OpenNext / Cloudflare when following SSFitness-style public PWA or authenticated website patterns.
- Vercel-hosted React/Vite public shells when following Solvys, Priced In Research, or Fintheon landing patterns.
- Almarai + Instrument Serif for Solvys / Priced In public studio and research pages.
- Poppins + Source Serif 4 + Doto for Fintheon product-page language.
- Self-hosted fonts or platform-native font loading; no CDN font surprise unless the source surface already uses it and the project accepts that deployment model.

### Monorepos / Native

- pnpm + Turbo for Solvys-1 style monorepos.
- Next.js app router, Expo, React Native, NativeWind, Clerk, tRPC, Drizzle ORM, Postgres, shared validators, and workspace packages for Solvys-1 Renters style systems.
- Radix, class-variance-authority, and tailwind-merge are allowed when a source repo already uses them.

### Default "No"

- No new icon runtime, paid icon dependency, design kit, animation framework, backend framework, auth provider, database/ORM, or CSS framework unless it is already present in one of the source projects or TP explicitly authorizes it.
- No generic SaaS UI starter kits as a base. Extract source-native primitives instead.
- No second motion, icon, chart, base-component, auth, database, or state runtime
  without a proven ownership gap and explicit approval.

## Visual Registers

### Product UI

Start with Fintheon app behavior: warm near-black, gold events, dense but readable hierarchy, icon-first toolbars, connected drawers, narrow rails, data values in mono, source-owned chat/composer chrome, local loading states, and selected tabs that highlight text/icon with a thin border rather than filled pills.

### Public Product Page

Use Fintheon product page language: data rain, product screenshots, liquid-glass cards, bold operational headlines, serif italic emphasis, small uppercase labels, and product-specific stakes. This register may use more atmosphere than product UI, but the product must still be visible and real.

### Parent Studio / Research

Use Solvys and Priced In: huge black space, real city/capital imagery, sparse nav, gold microcopy, large cream typography, restrained serif italics, and confidence through omission. Avoid app-card clutter.

### Resident Operations

Use Solvys-1: building-aware plain language, staff/resident workflows, beige/green or dark grey/green theme, practical task surfaces, glass panels only when they clarify hierarchy, and explicit human blockers.

### Fitness / Local Commerce

Use SSFitness: image-led hero, athletic display type, dark/gold conversion path, mobile-first CTAs, PWA readiness, Clerk-authenticated account flows, and short direct copy.

## Material Rules

- Product UI defaults to Fintheon tokens and Solvys Feels restraint.
- Liquid glass is allowed when it is source-backed: Fintheon product-page cards, Solvys-1 glass primitives, SSFitness CTA/cards, or existing app glass surfaces.
- Glass must be a functional material for nav, cards, drawers, modals, or hero CTAs. Do not add decorative blurred blobs, auroras, generic glow fields, or glass purely to fill space.
- Image overlays and gradients are allowed for source-backed website/hero imagery. They are not a license to use purple-blue SaaS gradients or gradient text.
- Product app chrome should still prefer flat layers, thin borders, opacity, rulers, and type over heavy shadow/depth simulation.

## Impeccable Refresh Loop

Use Impeccable as a maintenance ritual:

1. Before major Solvys design-system work, re-check `https://impeccable.style/docs/` and the homepage.
2. Look specifically for changes to PRODUCT.md, DESIGN.md, `document`, `extract`, `live`, `detect`, brand-vs-product registers, and CI/slop-detection guidance.
3. Fold durable process lessons into this source canon or `design-guidelines.md`.
4. Do not run `npx impeccable skills update`, install plugins, or rewrite a project around Impeccable unless TP explicitly asks. Source canon updates should be deliberate, reviewed edits.
