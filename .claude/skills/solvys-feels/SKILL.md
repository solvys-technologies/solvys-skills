---
name: solvys-feels
description: Visual architecture for Solvys applications. Use for any UI work, design-system update, tech-stack choice, styling change, visual review, or frontend generation. Fintheon current app is the primary product-UI personality; Fintheon product page, solvys.io, pricedinresearch.io, SSFitness, Solvys-1 Renters, and impeccable.style provide source registers and stack constraints.
version: 0.1.0
---

# Solvys Feels -- Visual Architecture

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


You are a design systems engineer. Every UI decision you make must pass through these filters. This is not optional -- these rules override your default aesthetic instincts.

## Mandatory Design.md Gate

For any greenfield or new-project frontend, run `/solvys-discovery` and the
`refero-design` skill before using this skill to plan or generate frontend code.
`refero-design` must produce a reference lock and decision ledger first. If it is
missing, install it with `npx skills add https://github.com/referodesign/refero_skill`.

For any frontend/UI task, load the Solvys-skills suite root `Design.md`
immediately before planning. After drafting the plan, verify it against
`Design.md` again before implementation. If this compatibility skill has been
copied without the suite root, use the installed/source suite copy of
`Design.md` or stop and state that the gate file is missing.

## Source Canon

Before making UI or stack decisions, identify the register and source:

- **Product UI default:** Fintheon current app. Use its rails, drawers, composer behavior, buttons, icon bank, font discipline, dense panels, tokens, and operational hierarchy as the primary UI personality.
- **Public product page:** `pricedinresearch.io/fintheon`. Use its liquid-glass cards, data-rain atmosphere, product mockups, Poppins + Source Serif + Doto register, and direct trader/product stakes.
- **Parent studio/research:** `solvys.io` and `pricedinresearch.io`. Use sparse black space, real city/capital imagery, Almarai + Instrument Serif, gold microcopy, large cream type, and "before consensus" confidence.
- **Process refresh:** `impeccable.style`. Use PRODUCT.md, DESIGN.md, document/extract/live/detect, and brand-vs-product register ideas to keep this suite current.
- **Resident ops:** Solvys-1 Renters. Use its Next/Expo monorepo stack, building-operations language, beige/green and dark grey/green themes, Clerk, tRPC, Drizzle/Postgres, and glass primitives.
- **Fitness/public PWA:** SSFitness at `stryvsocietyfit.com`. Use its Next/OpenNext/Cloudflare + Clerk website stack, image-led dark/gold public conversion pattern, and mobile/PWA polish.

For the full source hierarchy and tech-stack allowlist, load `reference/source-canon.md`. For practical UI rules, load `reference/design-guidelines.md`.

## Core Identity

**Palette: Solvys Gold**
- Background: `#050402` (near-black with warm undertone)
- Accent: `#c79f4a` (muted gold -- not bright, not shiny)
- Text: `#f0ead6` (warm off-white -- never pure white)

**Aesthetic: Industrial Luxe**
Precise but not cold. Technical but not clinical. Monochrome canvas with a single warm accent. Every element earns its pixel.

## Design Principles

1. **Subtract, don't add.** If you can remove an element without losing meaning, remove it.
2. **Structure is ornament.** The grid, the data, the hierarchy ARE the design. No decorative elements.
3. **Monochrome is the canvas.** Color is an event, not a default. The gold accent is a signal, not a fill.
4. **Type does the heavy lifting.** Scale, weight, and spacing create hierarchy. Not color, not icons, not borders.
5. **Source-backed material only.** Product chrome is mostly flat layers, thin borders, opacity, rulers, and type. Liquid glass, image overlays, and soft depth are allowed only when inherited from the source canon and used functionally.

## Absolute Bans

These patterns are NEVER acceptable in Solvys applications:

| Banned Pattern | Why |
|---------------|-----|
| Decorative gradients (`bg-gradient-*`, `linear-gradient`, `radial-gradient`) | Banned unless they are source-backed image overlays, fades, or liquid-glass edges |
| Generic shadows (`shadow-*`, decorative `drop-shadow`) | Banned in product chrome; use only source-backed glass/material depth |
| Blur as decoration (`blur-*`, unfocused blobs, bokeh) | Banned; functional liquid glass is allowed through source-owned primitives |
| Emojis in UI chrome | Unprofessional, inconsistent cross-platform |
| AI sparkles / glitter / aurora effects | Immediate "AI slop" signal |
| Colored icons / filled icons | Line icons only, stroke-width 1.5-2px |
| Rounded-full on non-circular elements | Industrial, not bubbly |
| Pure black (`#000000`) as background | Too harsh -- use warm near-black |
| Pure white (`#ffffff`) as text | Too harsh -- use warm off-white |
| M-dashes in text content | Use en-dashes or hyphens |
| `border-left` or `border-right` > 1px on cards/alerts | Side-stripe borders are banned |
| Gradient text (`background-clip: text`) | Never |
| Skeleton loading screens | Use `[LOADING...]` text indicators |
| Toast popups | Use inline status text: `[SAVED]`, `[ERROR: ...]` |
| Parallax, scroll-jacking, bounce easing | Disruptive motion |
| Full-row chat composer strips | Composer chrome must not obscure content outside the input/drawer footprint |
| Popup-positioned chat drawers | Attach, tools, skills, connectors, mentions, and queues must be actual connected drawers |
| Drawer-sized popups/modals | Popups and modals are separate surface types; never use drawer geometry |
| Decorative button borders / button backplates | Buttons are commands, not tiny cards; use primary fills or approved soft-glow states only |
| Recreating requested copy-paste UI | If TP asked to copy-paste from another workspace, inspect and adapt the real source code |
| Duplicate/developer-facing UI text | Product UI renders user-facing previews, not implementation narration |
| Raw source strings in UI | Data must be converted to proper user-facing capitalization before rendering |
| Instant new popups, rails, drawers, modals, sheets, or surfaces | New UI surfaces must transition in and out |
| Pointed square borders, triangular corner flags, sharp outline ornaments | Solvys corners are softened or truly round, never pointed |
| Homemade Liquid Glass | Liquid Glass requires a professionally shipped/source-backed example and repo-owned treatment |

## Chat Composer & Drawer Rules

Chat composers are repo-owned system surfaces, not page-owned styling projects.

### Allowed Variants
- **Full** -- primary CAO/main chat, NarrativeFlow/NF-Workspace, and page-level chat.
- **Compact** -- sidebar chat, mobile/sidebar chat, floating chat, rails, widgets, and embedded chat.
- No third composer variant. Domain behavior must be passed through slots/props while preserving shared chrome, spacing, drawer geometry, and interaction behavior.

### Drawer Geometry
- Drawers are centered over or under the chat input bar and visually connected to it.
- Drawer width is exactly `92%` of the rendered composer/input width.
- The input bar decides max width; drawers do not size from the viewport or arbitrary card widths.
- A drawer must touch/fuse with the input edge: no visual gap, no detached card, no popover placement.
- Re-clicking the active icon closes the drawer. Opening a different drawer closes the current drawer.

### Popups vs Drawers
- **Drawers:** Attach, Skills+Connectors, mentions, active work/queue, context pickers.
- **Popups/modals:** provider selector, full-size image preview, command palette, tool approvals.
- Popups/modals may share color/material tokens with drawers, but must never use drawer placement, drawer sizing, or drawer connection rules.

### Composer Kill List
- Kill full-width black strips behind chat composers.
- Kill row-wide fades/backdrops/masks that obscure text outside the actual input or drawer rectangle.
- Kill popup-positioned Attach panels.
- Kill popup-positioned Skills+Connectors panels.
- Kill drawer surfaces that float with a visual gap from the input bar.
- Kill drawer widths based on viewport or arbitrary card widths instead of `92%` of rendered composer width.
- Kill icon triggers that only open and cannot close on second click.
- Kill multiple local chat input shells pretending to be the same composer.
- Kill NarrativeFlow-specific composer chrome that diverges from the repo-owned composer.
- Kill compact sidebars accidentally rendering full composer controls.
- Kill popups/modals using drawer geometry.
- Kill hidden/empty toolbar slots rendering as visible labels like `{providerSlot}`.
- Kill composer wrappers that capture, dim, blur, or mask scroll content outside the composer/drawer footprint.

## Color System

Use OKLCH where possible. All custom properties should be defined in OKLCH with hex fallbacks.

### Surface Layers (darkest to lightest)
```
Layer 0 (base):     #050402   oklch(0.06 0.01 70)
Layer 1 (surface):  #0a0905   oklch(0.10 0.01 70)
Layer 2 (elevated): #110f0a   oklch(0.13 0.01 70)
Layer 3 (overlay):  #151310   oklch(0.15 0.01 70)
Header:             #080604   oklch(0.08 0.01 70)
```

### Text Opacity Tiers
```
Primary:    #f0ead6  100%     -- headings, primary content
Secondary:  #f0ead6  72%      -- body text, descriptions
Muted:      #f0ead6  40%      -- labels, timestamps, secondary info
Disabled:   #f0ead6  20%      -- disabled states
```

### Accent Usage
```
Accent:         #c79f4a           -- links, active states, key indicators
Accent hover:   rgba(199,159,74, 0.20)  -- hover backgrounds
Accent active:  rgba(199,159,74, 0.10)  -- active/selected backgrounds
Accent subtle:  rgba(199,159,74, 0.06)  -- subtle hover states
```

### Severity Colors (for data, alerts, status)
```
Severe:          #da0000    -- critical errors, stop signals
Neutral-Severe:  #ac5318    -- warnings, caution
Neutral:         #c79f4a    -- normal state (same as accent)
Low-Neutral:     #526089    -- informational
Low:             #073c00    -- success, safe, confirmed
```

### Bullish / Bearish (for financial data)
```
Bullish (muted):   #2d5a3d   -- Stone theme
Bullish (vibrant): #34D399   -- Gold theme
Bearish (muted):   #7a3030   -- Stone theme
Bearish (vibrant): #EF4444   -- Gold theme
```

Severity colors apply to VALUES only, never to labels or containers.

## Typography

### Font Stack (in priority order)
1. **Readable Digits** -- Inter mapped to numeric unicode ranges. Prepended in every font stack so digits always render consistently regardless of theme.
2. **Inter** (300-700) -- Default body font. Clean, neutral, readable at all sizes.
3. **Playfair Display** (400, 600, 700) -- Elegant headings. Use sparingly for display text.
4. **JetBrains Mono** (400, 500) -- Code, monospace, technical data. Always available.
5. **Cinzel** (400, 600, 700) -- Imperial/ceremonial headings. Reserved for branding contexts.
6. **Cormorant Garamond** (400-700) -- Imperial body text. Reserved for long-form ceremonial content.

### Hierarchy Rules
- Maximum 2 font families per screen
- Maximum 3 font sizes per screen
- Maximum 2 font weights per screen
- If two elements compete visually, one must shrink, fade, or move
- Monospace for ALL data values, metrics, and KPIs

### Loading CSS
All fonts self-hosted as WOFF2 with `font-display: swap`. See `reference/font-kit.md` for the complete `@font-face` definitions.

## Borders

```
Base:   rgba(199, 159, 74, 0.10)   -- 1px, default card/section borders
Hover:  rgba(199, 159, 74, 0.20)   -- on hover
Focus:  rgba(199, 159, 74, 0.40)   -- focused inputs, active elements
```

Always 1px. Never thicker. Never solid accent color at full opacity for borders (too loud).

## Animation

### Easing
```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);    /* Primary easing -- calm, luxurious */
--ease-spring:   cubic-bezier(0.16, 1, 0.3, 1);    /* Entrance easing */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1); /* Card entrance only */
```

### Duration
- Micro-interactions (hover, focus): 150-200ms
- Transitions (tab switch, collapse): 300-500ms
- Entrance animations: 500-600ms
- Luxurious fades: 1000-1300ms

### Rules
- Opacity transitions over transform transitions
- No bounce on anything except card entrances
- No spring physics, no parallax, no scroll-jacking
- Respect `prefers-reduced-motion` -- disable all non-essential animation
- Public websites may use cinematic image/video motion only when the source surface already does and the first viewport remains readable.

## Component Patterns

### Cards
- Background: Layer 1 (`#0a0905`)
- Border: 1px `rgba(199, 159, 74, 0.10)`
- Border-radius: 4-8px maximum
- Padding: 16-24px
- Product UI: no generic shadow or glow. Hover = border opacity increase to 0.20.
- Public product pages may use source-backed liquid-glass cards with larger radii when matching Fintheon product page, Solvys-1 glass primitives, or SSFitness public CTAs.

### Buttons
- Primary: `#c79f4a` background, `#050402` text
- Secondary: `rgba(199, 159, 74, 0.12)` background, `#f0ead6` text
- Danger: `#dc2626` background, `#ffffff` text
- Product UI default: 4-10px radius, icon-first controls, lucide/local line icons, and labels only where command clarity needs them.
- Toolbar/icon buttons default to borderless, transparent controls. Do not add hover border boxes or background plates unless the control is a primary action or an approved soft glow state.
- Product UI button corners must be softened or truly circular. Do not use sharp 90-degree button boxes or pointed border ornaments.
- Public-site CTAs may use rounded pills when matching Solvys, Priced In, Fintheon product page, or SSFitness.

### Surface Motion
- Every newly introduced popup, rail, drawer, modal, sheet, or panel must have enter and exit motion.
- Prefer opacity and transform transitions, using local primitives or `/solvys-transitions`.
- Do not add instant-appearing detached UI. If the surface appears, disappears, expands, collapses, or attaches to a control, the motion is part of the feature.

### Inputs
- Background: transparent or Layer 1
- Border: 1px base border color
- Focus: border transitions to focus opacity
- No shadow, no glow, no outline rings

### Status Indicators
- Use inline text: `[SAVED]`, `[ERROR: reason]`, `[LOADING...]`
- No toast notifications, no popups, no snackbars
- Status text in monospace, uppercase, muted opacity

### Solvys Icon & Loader Bank
- Before changing icons or loaders in any Solvys app, check `reference/solvys-icon-loader-bank.md`.
- Treat the bank as the default across Solvys apps unless the user explicitly revises it.
- Prefer bundled/local line icons through the app's icon facade. Do not add remote icon runtimes or paid icon dependencies by default.
- Icons stay line-only, 1.5-2px stroke, flat, and theme-colored.
- Loaders come from the approved circular dot-matrix loader bank and follow the user's primary theme token.
- Loading/saving states should resolve to a borderless green check with a fade success sequence when the state completes.
- App-wide Zen mode should turn eligible buttons into icon-only controls while preserving hover tooltip, title, and aria labels.

## CSS Custom Properties

When building for Solvys applications, use these CSS custom property names:

```css
:root {
  --fintheon-accent: #c79f4a;
  --fintheon-bg: #050402;
  --fintheon-text: #f0ead6;
  --fintheon-bullish: #34D399;
  --fintheon-bearish: #EF4444;
  --fintheon-surface: #0a0905;
  --fintheon-border: #c79f4a;
  --fintheon-muted: #6b7280;
}
```

For Fluxer/iframe embeds, see `reference/css-tokens.md` for the full variable map.

## Validation -- The Slop Test

Before finalizing any UI work, ask yourself:

> "If someone saw this interface and was told 'AI made this,' would they believe it immediately?"

If yes, that is the problem. Go back and subtract. Real design has opinion and restraint. AI slop has everything turned up to 7/10 across the board.

## Reference Files

For detailed token tables, font definitions, and theme presets:
- `../../../Design.md` -- mandatory frontend gate, Fintheon design tendencies, bans, source-first reuse, and three-pass rule
- `reference/source-canon.md` -- source hierarchy, visual registers, tech-stack allowlist, and Impeccable refresh loop
- `reference/design-guidelines.md` -- practical UI register rules, liquid-glass rules, typography, and acceptance checklist
- `reference/solvys-themes.md` -- All 9 production theme presets with complete color values
- `reference/font-kit.md` -- Complete @font-face definitions for self-hosted WOFF2 fonts
- `reference/css-tokens.md` -- Full CSS variable token map for backgrounds, text, buttons, borders
- `reference/solvys-gold-palette.md` -- Deep-dive on the Solvys Gold/Stone color system
- `reference/solvys-icon-loader-bank.md` -- Cross-app icon, spinner, loader, success, and Zen-mode rules
