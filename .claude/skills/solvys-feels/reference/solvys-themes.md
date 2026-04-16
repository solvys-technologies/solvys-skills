# Solvys Theme Presets

Production theme configurations imported from Fintheon. Each theme implements the `ThemeConfig` interface.

## ThemeConfig Interface

```typescript
interface ThemeConfig {
  name: string;
  label: string;
  accent: string;
  bg: string;
  text: string;
  bullish: string;
  bearish: string;
  surface: string;
  border: string;
  muted: string;
  severe?: string;
  neutralSevere?: string;
  neutral?: string;
  lowNeutral?: string;
  low?: string;
}
```

## Primary Theme: Solvys Gold

The default. Warm gold accent on near-black. Vibrant bullish/bearish for clear financial signals.

```typescript
{
  name: "solvys-gold",
  label: "Solvys Gold",
  accent: "#D4AF37",
  bg: "#050402",
  text: "#f0ead6",
  bullish: "#34D399",
  bearish: "#EF4444",
  surface: "#0a0a00",
  border: "#D4AF37",
  muted: "#6B7280",
}
```

## Secondary Theme: Solvys Stone

Muted variant with severity scale. Gold accent is softer, bullish/bearish are desaturated. Includes the full severity color system.

```typescript
{
  name: "solvys-stone",
  label: "Solvys Stone",
  accent: "#c79f4a",
  bg: "#0d0c09",
  text: "#c38f25",
  bullish: "#d49616",
  bearish: "#824d4d",
  surface: "#151310",
  border: "#c79f4a",
  muted: "#6b6455",
  severe: "#da0000",
  neutralSevere: "#ac5318",
  neutral: "#c79f4a",
  lowNeutral: "#526089",
  low: "#073c00",
}
```

## Stone (Base)

The foundation Stone variant. Earthy, desaturated, quiet.

```typescript
{
  name: "stone",
  label: "Stone",
  accent: "#c79f4a",
  bg: "#0d0c09",
  text: "#cdc5b4",
  bullish: "#2d5a3d",
  bearish: "#7a3030",
  surface: "#151310",
  border: "#3d3826",
  muted: "#6b6455",
}
```

## iOS

Apple-native blue on black. Clean, familiar, high contrast.

```typescript
{
  name: "ios",
  label: "iOS",
  accent: "#007AFF",
  bg: "#000000",
  text: "#FFFFFF",
  bullish: "#30D158",
  bearish: "#FF453A",
  surface: "#1C1C1E",
  border: "#007AFF",
  muted: "#8E8E93",
}
```

## Project X

Neutral gray accent. Minimal, no-brand look for embedded contexts.

```typescript
{
  name: "project-x",
  label: "Project X",
  accent: "#6B7280",
  bg: "#111111",
  text: "#E5E7EB",
  bullish: "#4ADE80",
  bearish: "#F87171",
  surface: "#1A1A1A",
  border: "#6B7280",
  muted: "#9CA3AF",
}
```

## Dark Trading

Professional trading blue. Bloomberg-adjacent. High information density.

```typescript
{
  name: "dark-trading",
  label: "Dark Trading",
  accent: "#3B82F6",
  bg: "#0A0A0F",
  text: "#E2E8F0",
  bullish: "#22C55E",
  bearish: "#EF4444",
  surface: "#12121A",
  border: "#3B82F6",
  muted: "#64748B",
}
```

## Miami Heat

Hot pink accent. High energy, bold. Use for sports/entertainment contexts.

```typescript
{
  name: "miami-heat",
  label: "Miami Heat",
  accent: "#F4005F",
  bg: "#0A0A0A",
  text: "#FFFFFF",
  bullish: "#00BCD4",
  bearish: "#F4005F",
  surface: "#141014",
  border: "#F4005F",
  muted: "#888888",
}
```

## Miami Dolphins

Teal on navy. Specific client theme.

```typescript
{
  name: "miami-dolphins",
  label: "Miami Dolphins",
  accent: "#008E97",
  bg: "#0A1628",
  text: "#FFFFFF",
  bullish: "#008E97",
  bearish: "#F26522",
  surface: "#0F1F35",
  border: "#008E97",
  muted: "#FC4C02",
}
```

## Monocolor

Pure white-on-black. No color whatsoever. Maximum Nothing Design alignment.

```typescript
{
  name: "monocolor",
  label: "Monocolor",
  accent: "#FFFFFF",
  bg: "#0A0A0A",
  text: "#E5E5E5",
  bullish: "#FFFFFF",
  bearish: "#FFFFFF",
  surface: "#141414",
  border: "#FFFFFF",
  muted: "#737373",
}
```

## Theme Persistence

Themes persist via localStorage:

```typescript
const STORAGE_KEY = "fintheon:theme";
const CUSTOM_STORAGE_KEY = "fintheon:theme-custom";

// Load: check localStorage for preset name or "custom" + JSON
// Save: if matches a preset, store the key; else store "custom" + full JSON
```

Default theme: `solvys-gold`.
