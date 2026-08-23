# Solvys palette themes

Production palette pairs for every Solvys app. Each pair has light and dark theme variants. Settings must expose cycling across all four pairs.

**Default:** Forest Chartreuse (`Solvys Forest Light` / `Solvys Forest Dark` in Goalpost).

See `factory/canon/solvys-palette-themes.md` for hex values, surface rules, and implementation paths.

## ThemeConfig (legacy Fintheon apps)

Fintheon-era apps used a richer `ThemeConfig` with bullish/bearish/severe scales. New Factory apps should use the Goalpost OKLCH theme system (`solvysPalettes.ts`) or map these four pairs into their local token layer.

## Retired defaults

- Solvys Gold / Stone monochrome + `#c79f4a` accent
- Diehard black/gray/white-only canvases

Those remain documented below for legacy maintenance only.

---

## Legacy: Solvys Gold

```typescript
{
  name: "solvys-gold",
  label: "Solvys Gold",
  accent: "#D4AF37",
  bg: "#050402",
  text: "#f0ead6",
  // ...
}
```

## Legacy: Solvys Stone

```typescript
{
  name: "solvys-stone",
  label: "Solvys Stone",
  accent: "#c79f4a",
  // ...
}
```
