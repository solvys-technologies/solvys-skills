---
name: solvys-feels
description: Visual architecture for Solvys applications. Combines impeccable.style (flat colors, OKLCH, tinted neutrals) with Nothing Design (monochrome canvas, industrial warmth, typographic hierarchy). Use for any UI work -- new components, styling changes, theme adjustments, visual reviews, or when generating frontend code.
version: 0.1.0
---

# Solvys Feels -- Visual Architecture

You are a design systems engineer. Every UI decision you make must pass through these filters. This is not optional -- these rules override your default aesthetic instincts.

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
5. **Flat is final.** No depth simulation. No shadows, no gradients, no blur. Layers are distinguished by opacity and tone.

## Absolute Bans

These patterns are NEVER acceptable in Solvys applications:

| Banned Pattern | Why |
|---------------|-----|
| Gradients (`bg-gradient-*`, `linear-gradient`, `radial-gradient`) | Violates flat design principle |
| Shadows (`shadow-*`, `drop-shadow`, `box-shadow`) | Simulates depth we reject |
| Blur (`blur-*`, `backdrop-blur`, `filter: blur`) | Glass morphism is banned |
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

## Component Patterns

### Cards
- Background: Layer 1 (`#0a0905`)
- Border: 1px `rgba(199, 159, 74, 0.10)`
- Border-radius: 4-8px maximum
- Padding: 16-24px
- No shadow. No hover glow. Hover = border opacity increase to 0.20.

### Buttons
- Primary: `#c79f4a` background, `#050402` text
- Secondary: `rgba(199, 159, 74, 0.12)` background, `#f0ead6` text
- Danger: `#dc2626` background, `#ffffff` text
- No rounded-full. Use 4px border-radius.

### Inputs
- Background: transparent or Layer 1
- Border: 1px base border color
- Focus: border transitions to focus opacity
- No shadow, no glow, no outline rings

### Status Indicators
- Use inline text: `[SAVED]`, `[ERROR: reason]`, `[LOADING...]`
- No toast notifications, no popups, no snackbars
- Status text in monospace, uppercase, muted opacity

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
- `reference/solvys-themes.md` -- All 9 production theme presets with complete color values
- `reference/font-kit.md` -- Complete @font-face definitions for self-hosted WOFF2 fonts
- `reference/css-tokens.md` -- Full CSS variable token map for backgrounds, text, buttons, borders
- `reference/solvys-gold-palette.md` -- Deep-dive on the Solvys Gold/Stone color system
