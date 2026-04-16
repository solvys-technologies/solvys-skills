# Solvys CSS Token Map

Complete CSS custom property system imported from Fintheon production. Use these variable names when building Solvys applications.

## Root Variables (Fintheon Theme System)

Applied to `:root` by the ThemeProvider. Defaults to Solvys Gold.

```css
:root {
  /* Core palette */
  --fintheon-accent: #d4af37;
  --fintheon-bg: #050402;
  --fintheon-text: #f0ead6;
  --fintheon-bullish: #34d399;
  --fintheon-bearish: #ef4444;
  --fintheon-surface: #0a0a00;
  --fintheon-border: #d4af37;
  --fintheon-muted: #6b7280;

  /* Severity scale */
  --fintheon-severe: #ef4444;
  --fintheon-neutral-severe: #f59e0b;
  --fintheon-neutral: #6b7280;
  --fintheon-low-neutral: #3b82f6;
  --fintheon-low: #34d399;

  /* Glass surfaces (translucent with accent tint) */
  --fintheon-glass-bg: color-mix(in srgb, var(--fintheon-surface) 55%, transparent);
  --fintheon-glass-border: color-mix(in srgb, var(--fintheon-accent) 16%, transparent);
  --fintheon-glass-highlight: color-mix(in srgb, var(--fintheon-accent) 6%, transparent);

  /* Easing */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Typography */
  --font-body: "Readable Digits", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-heading: "Readable Digits", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Radius */
  --radius: 0.625rem;
}
```

## Fluxer Embed Token Map

For iframe embeds (Fluxer.app or similar). Maps Solvys Gold to a generic CSS variable namespace.

```css
:root {
  /* Backgrounds */
  --bg-primary: #050402;
  --bg-secondary: #0a0905;
  --bg-tertiary: #110f0a;
  --bg-header: #080604;
  --bg-modifier-hover: rgba(199, 159, 74, 0.06);
  --bg-modifier-active: rgba(199, 159, 74, 0.10);
  --bg-modifier-selected: rgba(199, 159, 74, 0.12);

  /* Text */
  --text-primary: #f0ead6;
  --text-secondary: rgba(240, 234, 214, 0.72);
  --text-muted: rgba(240, 234, 214, 0.40);
  --text-link: #c79f4a;

  /* Brand / accent */
  --brand-primary: #c79f4a;
  --brand-primary-light: #d4af37;
  --link-color: #c79f4a;

  /* Buttons */
  --button-primary-bg: #c79f4a;
  --button-primary-text: #050402;
  --button-secondary-bg: rgba(199, 159, 74, 0.12);
  --button-secondary-text: #f0ead6;
  --button-danger-bg: #dc2626;
  --button-danger-text: #ffffff;

  /* Borders */
  --border-base: rgba(199, 159, 74, 0.10);
  --border-hover: rgba(199, 159, 74, 0.20);
  --border-focus: rgba(199, 159, 74, 0.40);

  /* Scrollbar */
  --scrollbar-thin-thumb: rgba(199, 159, 74, 0.20);
  --scrollbar-thin-track: transparent;

  /* Code blocks */
  --code-bg: #0a0905;
}
```

## OKLCH Equivalents

For projects using OKLCH color space (preferred):

```css
:root {
  --background: oklch(0.06 0.01 70);      /* #050402 */
  --foreground: oklch(0.93 0.02 85);      /* #f0ead6 */
  --accent: oklch(0.72 0.10 75);          /* #c79f4a */
  --surface: oklch(0.10 0.01 70);         /* #0a0905 */
  --elevated: oklch(0.13 0.01 70);        /* #110f0a */
  --overlay: oklch(0.15 0.01 70);         /* #151310 */
  --muted-foreground: oklch(0.556 0 0);   /* #6b7280 */
  --destructive: oklch(0.577 0.245 27);   /* #ef4444 */
}
```

## Tailwind Integration

When using Tailwind CSS v4 with `@theme inline`:

```css
@theme inline {
  --color-accent: var(--fintheon-accent);
  --color-bg: var(--fintheon-bg);
  --color-text: var(--fintheon-text);
  --color-bullish: var(--fintheon-bullish);
  --color-bearish: var(--fintheon-bearish);
  --color-surface: var(--fintheon-surface);
  --color-border: var(--fintheon-border);
  --color-muted: var(--fintheon-muted);
}
```

Then use as: `bg-accent`, `text-bg`, `border-border`, etc.

## Theme Injection Function

For injecting the theme into iframes or shadow DOM:

```typescript
function buildThemeCSS(tokens: Record<string, string>): string {
  const vars = Object.entries(tokens)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `:root {\n${vars}\n}`;
}
```
