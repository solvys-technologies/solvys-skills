# Solvys palette tokens (CSS)

Canonical palette pairs live in `factory/canon/solvys-palette-themes.md`.
Default pair: **Forest Chartreuse**.

## Default accent tokens (Forest Chartreuse)

```css
:root {
  --solvys-accent-light: #DCD870; /* Sunlit Chartreuse */
  --solvys-accent-dark: #223D22;  /* Deep Forest Green */
  --solvys-surface-light: #C0C8CA; /* nardo grey — light canvas */
  --solvys-surface-dark: #1f1f1f;  /* dark canvas */
}
```

## Semantic mapping

```css
:root {
  --text-link: var(--solvys-accent-light);
  --brand-primary: var(--solvys-accent-light);
  --link-color: var(--solvys-accent-light);
  --button-primary-bg: var(--solvys-accent-light);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-link: oklch(0.58 0.08 144);
    --brand-primary: oklch(0.58 0.08 144);
  }
}
```

## OKLCH reference (Forest Chartreuse)

```css
--accent-light: oklch(0.864 0.127 106.8); /* #DCD870 */
--accent-dark: oklch(0.330 0.057 144.1);  /* #223D22 */
--surface-light: oklch(0.827 0.009 214.4); /* #C0C8CA */
--surface-dark: oklch(0.239 0 0);          /* #1f1f1f */
```

## Legacy

`#c79f4a` gold and diehard black/gray/white defaults are retired for new Factory work.
Fintheon legacy themes may still reference gold in existing apps.
