---
name: solvys-transitions
description: Drop-in CSS transitions for Solvys UI surfaces. 9 named transitions (modal, dropdown, panel reveal, card resize, icon swap, text swap, page slide, badge, number pop-in) wired to Solvys timing tokens. Use when adding motion to state changes -- opening/closing menus, expanding cards, swapping icons, animating digits. Adapted from transitions.dev (Jakub Antalik) under the Solvys ban list (no glassmorphic surfaces, no gradients).
---

# Solvys Transitions

Curated motion primitives for Solvys apps. Each transition is a self-contained `t-*` class set with CSS custom properties for tuning. Paste `transitions.css` (in this skill's `reference/`) into your styles dir, import it from your global CSS, and apply the class + state attribute on your component.

> **Source:** Forked from [transitions.dev](https://transitions.dev) by Jakub Antalik (MIT). Adapted to use Solvys timing scale and respect the no-glass / no-shadow ban.
>
> **Anti-glass note:** These transitions use `filter: blur()` ONLY during the in-flight animation — it returns to `blur(0)` at rest. This is motion blur on a single element, not a backdrop-filter on a surface. It is NOT a glassmorphic effect and does NOT violate the Solvys glass ban. Surfaces (cards, panels, modals) stay flat.

## The 9 transitions

| Name | Class | When to use |
| ---- | ----- | ----------- |
| Notification badge | `.t-badge` | Slide-in + pop badge for unread counts on a bell / button |
| Menu dropdown | `.t-dropdown` | Scale + fade dropdown menus, popovers, filter pickers |
| Panel reveal | `.t-panel-slide` | Translate-Y + fade panels, peek footers, expanding sheets |
| Card resize | `.t-resize` | Tween width / height when a card swaps states (compact ↔ expanded) |
| Icon swap | `.t-icon-swap` | Cross-fade two icons (chevron flip, play/pause, mute/unmute) |
| Text swap | `.t-text-swap` | Three-phase exit/enter for status labels ("Saving..." → "Saved") |
| Modal | `.t-modal` | Scale + fade modal / dialog open + close |
| Page slide | `.t-page-slide` | Left/right slide between two views (wizard pages, tab swap) |
| Number pop-in | `.t-digit-group` | Staggered digit pop-in for numeric displays (scores, prices, IV) |

## How to apply

### 1. Copy the stylesheet

Copy `reference/transitions.css` to your project's styles directory (e.g. `frontend/styles/transitions.css`) and import it once from your root CSS:

```css
/* index.css */
@import "tailwindcss";
@import "./styles/transitions.css";
```

The stylesheet declares all `--t-*` custom properties on `:root` and includes a `@media (prefers-reduced-motion: reduce)` guard. No setup beyond the import.

### 2. Apply per surface

Each transition uses one class plus a state attribute or class. Examples:

**Dropdown** — toggle `.is-open` on the wrapper:

```tsx
<div className={cn("t-dropdown", { "is-open": open, "is-closing": closing })} data-origin="top-right">
  {/* menu items */}
</div>
```

On close, swap `.is-open` for `.is-closing`, then remove `.is-closing` after `--t-dropdown-close-dur` (150ms).

**Panel reveal** — toggle `data-open`:

```tsx
<div className="t-panel-slide" data-open={open ? "true" : "false"}>
  {/* panel contents */}
</div>
```

**Modal** — toggle `.is-open`:

```tsx
<div className={cn("t-modal", { "is-open": open, "is-closing": closing })} role="dialog">
  {/* modal */}
</div>
```

**Number pop-in** — wrap each character in `.t-digit`, toggle `.is-animating` on the group:

```tsx
<span className={cn("t-digit-group", { "is-animating": animating })}>
  {chars.map((ch, i) => (
    <span key={i} className="t-digit" data-stagger={i >= chars.length - 2 ? String(chars.length - i) : undefined}>{ch}</span>
  ))}
</span>
```

Replay by removing `is-animating`, forcing a reflow, then re-adding it.

**Icon swap** — set `data-state="a"` or `"b"`:

```tsx
<span className="t-icon-swap" data-state={open ? "b" : "a"}>
  <ChevronDown className="t-icon" data-icon="a" />
  <ChevronUp className="t-icon" data-icon="b" />
</span>
```

### 3. Tune per surface (optional)

Override any `--t-*` token at the surface level:

```css
.my-special-modal {
  --t-modal-open-dur: 220ms;
  --t-modal-scale: 0.92;
}
```

## Solvys ban list compliance

Verified against the Solvys ban list:

- **No glassmorphism.** `filter: blur()` is only applied during the animation and tweens to `blur(0)` at rest. No `backdrop-filter`, no surface translucency.
- **No gradients.** None of the transitions use `linear-gradient` or `radial-gradient`.
- **No shadows.** None of the transitions use `box-shadow`.
- **No emojis or sparkles.** Pure motion primitives, no decorative glyphs.

If you find a surface where a transition produces a glass-like read at rest, that's a bug — file it.

## File map

```
solvys-transitions/
  SKILL.md              ← this file
  reference/
    transitions.css     ← paste-ready stylesheet (import once)
    badge.md            ← per-transition usage doc
    dropdown.md
    panel-slide.md
    resize.md
    icon-swap.md
    text-swap.md
    modal.md
    page-slide.md
    digit-group.md
```

Read `reference/<name>.md` for the full per-transition contract (HTML shape, JS state machine, tuning knobs).

## Credit

Original CSS designs by [Jakub Antalik](https://jakubantalik.com) at [transitions.dev](https://transitions.dev). Solvys adaptation namespaces tokens under `--t-*` and removes the demo-specific scaffolding.
