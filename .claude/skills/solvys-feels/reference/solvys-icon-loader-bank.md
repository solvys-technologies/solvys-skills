# Solvys Icon & Loader Bank

This bank is the cross-app default for Solvys product UI. Use it before choosing new icons, spinners, loading states, or Zen-mode behavior.

## Operating Rules

- Check this bank before changing icons or loaders in any Solvys app.
- Preserve the approved mappings unless the user explicitly revises them.
- Prefer bundled/local line icons through the app's icon facade.
- Do not add remote icon runtimes or paid icon dependencies by default.
- Keep icons line-only, 1.5-2px stroke, flat, theme-colored, and unfilled.
- Do not use gradients, shadows, blur, emojis, sparkles, aurora effects, or colorful filled marks.
- If an app already has a local icon facade, update that facade first; use targeted component swaps only when a global remap would be wrong.

## Approved Icon Mappings

| Surface / Concept | Icon Direction | Notes |
|---|---|---|
| Desk / Dash | Three people standing beside each other | Use for non-agentic Desk and dashboard references. |
| Desk Plan | Open book | Also use for add-to-Desk and Desk Queue flows. |
| Consul | Magnifying glass | Counsel/investigation signal. |
| Feucht | Stock/chart icon | Risk-desk market read, not a generic zap. |
| Consilium | Bank/courthouse | Must match Arbitrum. |
| Arbitrum | Bank/courthouse | Roman-structure / pillars direction. |
| Forum | Coliseum / arena | Use across Forum surfaces. |
| Forum header widget | Phone | Header widget is call-oriented. |
| Chat / messages | Circular chat bubble | Do not use square message bubble for chat surfaces. |
| Oracle | Eye | Keep the all-seeing mark. |
| Agent Lounge | Crescent moon | Keep the lounge/after-hours mark. |
| Zen mode | TV | Use in Appearance and layout controls. |
| Castra | Layers / layered panel | Keep existing Castra direction. |
| Agentic Desk | Atom-like icon | Only when the surface is explicitly agentic or system-intelligence oriented. |
| Refinement Engine | Cube-focus / Phosphor card-style icon | Use for the engine and related refinement controls. |
| Filters / sorting | Tabler market card / candle icon | Use for market filters and sorting controls. |
| Security / access control | Fingerprint | Do not use shield language for security. |
| Approval modal/cards | Check-circle confirmation | Keep approval separate from security. |
| IV widget point value | Custom stacked plus/minus glyph | Do not globally remap every diff icon. |
| Antilag activity | Custom clock showing 7:05 | Exact time matters. |
| Regime Tracker | Retired/no assignment | Do not assign new icons unless the feature returns. |

## Loader & Spinner Rules

- Use the approved dot-matrix/circular-cropped loader bank for loaders and spinners.
- Loader color follows the user's primary theme token, falling back to the app accent only if no primary token exists.
- Loaders and success fade should run 25% slower than the app's current baseline when this bank is applied.
- Generic loading and saving states should transition into a borderless green check with a fade success sequence.
- Respect `prefers-reduced-motion`; freeze non-essential animation and keep the status understandable.

| Surface / State | Loader Direction |
|---|---|
| Chat interfaces | Diagonal scan |
| Arbitrum | Pyramid |
| Econ add-to-Desk | Twin orbit |
| Desk refresh | Cipher |
| Generic loading | Dot-matrix loader from the bank |
| Saving complete | Borderless green check with fade |

## Zen Mode Guideline

- App-wide Zen mode belongs in Appearance settings.
- Zen mode turns eligible buttons into icon-only controls.
- Preserve hover tooltip, `title`, and `aria-label` for every icon-only control.
- Normal and Zen examples do not need container borders.
- In main content, selected sections/tabs highlight text and icon only, plus a thin selected border. Do not illuminate or fill the selected button background.

## Implementation Preference

- Use global icon facades for broad replacements.
- Use targeted component-level swaps for domain-specific exceptions such as Feucht, Consul, Desk Plan, Forum header widget, and IV point values.
- Keep the preview board or equivalent QA artifact available when a repo has many surfaces, so reviewers can inspect the whole bank before implementation.
