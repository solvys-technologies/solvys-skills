# Solvys Gold Palette -- Deep Reference

The complete color system for Solvys applications. Two primary variants: Gold (vibrant) and Stone (muted).

## Core Triad

| Role | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Background | `#050402` | `oklch(0.06 0.01 70)` | Page background, base layer |
| Accent | `#c79f4a` | `oklch(0.72 0.10 75)` | Links, active states, key indicators |
| Text | `#f0ead6` | `oklch(0.93 0.02 85)` | Primary text, headings |

The accent exists in two weights:
- `#c79f4a` -- the true Solvys gold (used in Stone, borders, subtle contexts)
- `#D4AF37` -- brighter gold (used in Gold theme, primary buttons, prominent UI)

## Surface Layers

Progressively lighter surfaces for visual depth without shadows.

| Layer | Hex | OKLCH | CSS Variable | Usage |
|-------|-----|-------|-------------|-------|
| 0 (base) | `#050402` | `oklch(0.06 0.01 70)` | `--fintheon-bg` | Page background |
| 1 (surface) | `#0a0905` | `oklch(0.10 0.01 70)` | `--fintheon-surface` / `--bg-secondary` | Cards, panels |
| 2 (elevated) | `#110f0a` | `oklch(0.13 0.01 70)` | `--bg-tertiary` | Nested panels, dropdowns |
| 3 (overlay) | `#151310` | `oklch(0.15 0.01 70)` | -- | Modals, overlays |
| Header | `#080604` | `oklch(0.08 0.01 70)` | `--bg-header` | Fixed headers, nav bars |

All surfaces carry the same warm hue angle (70 in OKLCH). Never use cool-tinted grays.

## Text Hierarchy

All text is `#f0ead6` at varying opacity levels:

| Tier | Opacity | Resulting Color | Usage |
|------|---------|----------------|-------|
| Primary | 100% | `#f0ead6` | Headings, key content |
| Secondary | 72% | `rgba(240, 234, 214, 0.72)` | Body text, descriptions |
| Muted | 40% | `rgba(240, 234, 214, 0.40)` | Labels, timestamps, captions |
| Disabled | 20% | `rgba(240, 234, 214, 0.20)` | Disabled controls |

In the Stone variant, primary text shifts to `#cdc5b4` (more desaturated) or `#c38f25` (gold-tinted in Solvys Stone).

## Accent Opacity Scale

For backgrounds and interactive states:

| State | Value | Usage |
|-------|-------|-------|
| Subtle hover | `rgba(199, 159, 74, 0.06)` | List item hover |
| Active | `rgba(199, 159, 74, 0.10)` | Selected item, active tab bg |
| Selected | `rgba(199, 159, 74, 0.12)` | Secondary button bg |
| Hover | `rgba(199, 159, 74, 0.20)` | Border hover, scrollbar |
| Focus | `rgba(199, 159, 74, 0.40)` | Focus ring, active border |

## Border System

| State | Value |
|-------|-------|
| Base | `rgba(199, 159, 74, 0.10)` |
| Hover | `rgba(199, 159, 74, 0.20)` |
| Focus | `rgba(199, 159, 74, 0.40)` |
| Stone variant | `#3d3826` (solid, no opacity) |

Always 1px width. Never thicker.

## Severity Colors

Used by RiskFlow badges, alerts, and status indicators. Applied to VALUES only, never to labels or containers.

| Level | Gold Theme | Stone Theme | Usage |
|-------|-----------|-------------|-------|
| Severe | `#ef4444` | `#da0000` | Critical errors, stop signals |
| Neutral-Severe | `#f59e0b` | `#ac5318` | Warnings, caution |
| Neutral | `#6b7280` | `#c79f4a` | Normal, informational |
| Low-Neutral | `#3b82f6` | `#526089` | Low priority info |
| Low | `#34d399` | `#073c00` | Success, safe, confirmed |

## Financial Data Colors

Two modes depending on theme:

### Gold Theme (Vibrant)
- Bullish: `#34D399` (emerald green)
- Bearish: `#EF4444` (red)

### Stone Theme (Muted)
- Bullish: `#2d5a3d` (dark forest green)
- Bearish: `#7a3030` (dark burgundy)

### Special: Solvys Stone (Monochromatic)
- Bullish: `#d49616` (gold -- same family as accent)
- Bearish: `#824d4d` (muted rose)

## Theme Muted Colors

The "quiet" color for secondary information:

| Theme | Muted | Character |
|-------|-------|-----------|
| Solvys Gold | `#6B7280` | Cool gray (contrast to warm palette) |
| Stone | `#6b6455` | Warm gray (matches surface warmth) |
| Solvys Stone | `#6b6455` | Warm gray |
| iOS | `#8E8E93` | Apple system gray |
| Monocolor | `#737373` | Pure neutral gray |
