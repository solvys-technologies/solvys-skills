# Solvys palette themes

Every Solvys app ships four palette pairs. Each pair has a **light** and **dark**
theme variant. Settings must expose palette cycling by default.

## Default pair

**Forest Chartreuse** is the default surfaced combo.

| Role | Name | Hex |
|------|------|-----|
| Light accent | Sunlit Chartreuse | `#DCD870` |
| Dark accent | Deep Forest Green | `#223D22` |

Default theme ids in Goalpost / Macro theme system:

- Light: `Solvys Forest Light`
- Dark: `Solvys Forest Dark`

## All four pairs

| Pair | Light accent | Dark accent |
|------|--------------|-------------|
| Forest Chartreuse (default) | Sunlit Chartreuse `#DCD870` | Deep Forest Green `#223D22` |
| Sunrise Gold | Sunrise Gold `#EDB964` | Deep Vine Green `#3B3D26` |
| Misty Blue | Misty Blue `#83A7B4` | Midnight Teal `#062635` |
| Pale Harbor | Pale Mis `#C0C8CA` | Deep Harbor `#2B4851` |

## Surface rules

- **Light themes:** nardo-grey bases (`#C0C8CA` family). Never pure white canvases.
- **Dark themes:** `#1f1f1f` or `#5C5858` on black or near-black. Elevated layers pick up a subtle hue tint from the pair.

## Implementation

- App source: `apps/web/src/features/theme/solvysPalettes.ts`
- Settings cycling: Appearance → **Palette** row
- Legacy ids `Macro Dark` / `Macro Light` migrate to Forest Chartreuse

## Retired doctrine

Do not default new work to diehard black/gray/white canvases or `#c79f4a` gold.
Product-specific Fintheon themes may remain in legacy apps but are not the Factory default.
