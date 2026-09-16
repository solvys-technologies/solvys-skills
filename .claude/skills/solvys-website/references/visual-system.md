# Visual system

Recipes here are extracted from shipped Solvys website builds. Use them as the
starting point and keep them consistent across a run. Treat the values as the
known-good baseline, not as decoration to re-invent per site.

## Themes

Two themes ship on every Solvys website. Both stay grainy. A dark theme is
always accessible, not a variant added later.

| Role | Light theme | Dark theme |
| --- | --- | --- |
| Base surface | Tanned manilla | Smoke gray on near-black |
| Page ground | Manilla plate | Space ground, near-black |
| Primary text | Warm dark ink | Warm off-white |
| Accent | Solvys gold | Restrained gold, lifted for interactive states |
| Grain | Present | Present, finer and subtler than light |

Reference values from the shipped build:

```css
:root {
  --solvys-gold: #c79f4a;
  --solvys-ink: #050402;
  --solvys-surface: #0a0a00;
  --solvys-surface-2: #15130f;
  --solvys-warm-white: #f0ead6;
  --solvys-manilla: #e4dcc2;
  --solvys-muted: #8f8c84;
}
```

These are the website register, not the product-app palette. Product
applications use the four pairs in `factory/canon/solvys-palette-themes.md`.
Do not carry the product default into a website and do not introduce a third
accent.

Keep each theme to one accent and a small type palette. Hierarchy comes from
size, weight, opacity, and spacing before it comes from fills or borders.

## Grain

Grain is a flat-surface treatment. It is what makes a dithered render read as a
crafted material instead of a degraded photo.

Two shipped recipes, both as inline SVG turbulence:

```css
/* Fine grain: 200x200 tile */
--grain-fine: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

/* Coarser grain: 240x240 tile */
--grain-coarse: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E");
```

`fractalNoise` with `stitchTiles='stitch'` is what keeps the tile seamless. Do
not switch to `turbulence`, which produces visible directional banding.

Apply grain with a pseudo-element so it never covers text:

```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: var(--grain-fine);
  opacity: 0.18;
  mix-blend-mode: overlay;
}
```

Blend modes in the shipped build are `overlay`, `soft-light`, `screen`, and
`luminosity`. `overlay` is the default for grain over a tinted plate.
`soft-light` is the quiet option. Reserve `screen` for light-on-ground effects.

Keep every glyph above the grain layer. If a background change makes a label
read muddy, the grain is sitting over the text node.

## Liquid Glass

Liquid Glass is a premium, sparse material. It belongs on chosen controls,
chips, selected surfaces, and logo casings. It does not belong on every row,
every card, or a whole page.

Construction:

```css
.liquid-glass {
  position: relative;
  background: color-mix(in oklab, var(--glass-tint) 14%, transparent);
  backdrop-filter: blur(14px) saturate(1.2);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
  border: 0;                      /* borderless by default */
  isolation: isolate;
}

.liquid-glass--raised {
  backdrop-filter: blur(18px) saturate(1.25);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.08),
    inset 0 -12px 24px -16px rgb(0 0 0 / 0.55),
    0 18px 40px -24px rgb(0 0 0 / 0.6);
}
```

Rules learned from the client review rounds in this workflow:

- The tint mixes the theme accent with a warm pearl, never raw white. Raw white
  pearl reads as a hard border.
- The inner shadow is a diffuse inset, not a rim. When it reads as a border, it
  is too tight, too opaque, or too dark at the edge. Soften it, spread it, and
  reduce its contrast until it reads as light falloff.
- A raised "bump" uses an inset top highlight plus an inset bottom shade plus a
  soft external lift. All three, or the element stays flat.
- Grain never goes on the glass material. Grain belongs on the flat plate
  behind and beside it.
- Do not build glass out of generic blur plus border plus glow. That is the
  banned homemade version.

### Logo casing

When a client logo must appear as a chip:

1. Extract the original logo at its real resolution. Do not redraw it.
2. Leave the flat logo artwork untouched. Do not restyle, recolour, or resample
   the mark itself.
3. Place it in a rounded chip whose padding comes from a matching background
   tone sampled from the logo, so the chip edge blends instead of boxing it.
4. Wrap the chip in the glass casing above.
5. Scale the artwork down inside the chip and let the background extend around
   it, so the mark breathes rather than filling the frame.

The client keeps the logo they already have. The casing is the new part.

## Dither and pixelation

Imagery is dithered. This is the core visual signature: a dithered render reads
as intentional art direction, while the same source image undithered reads as a
low-quality photograph.

Apply dithering to both themes. The dark theme has the harder job, because a
mistreated dark render reads as broken rather than stylised, so its pixelation
is finer and subtler than the light theme's.

Implementation options, cheapest first:

1. **CSS filter chain** for a fast, reversible approximation on background
   media:

   ```css
   .dithered {
     image-rendering: pixelated;
     filter: contrast(1.15) saturate(0.85);
     mix-blend-mode: luminosity;
   }
   ```

2. **Canvas pass** when the source needs true quantization. Downsample, apply an
   ordered threshold, then upscale with `image-rendering: pixelated`. Use a
   small tile constant for the threshold matrix so the pattern stays stable
   across the page.

3. **Pre-baked asset** when an image never changes. Bake the dithered render at
   build time and ship the resulting asset.

Prefer option 1 or 2. Option 3 duplicates an asset per theme.

Keep the dither on the imagery layer, not on the UI layer. Text, controls, and
glass stay crisp.

## Particle and monumentalist imagery

The accepted register for Solvys websites is particle flow and dithered
monumentalist imagery: a tiny figure against a vast landscape. Keep colour
variation minimal and let scale carry the drama.

Compose the opening scene, then reveal the wider frame as the reader scrolls.
For a city-to-planet journey, the opening establishes the city, the scroll pulls
back to the planet, and the final frame carries the closing statement. Orbital
elements such as data centres are an ode to the industry, not literal
documentation.

Generate and pre-bake animation frames as an image sequence the scroll runtime
can scrub. Do not ship a live 3D engine for a render that can be a sequence.

## Typography

New websites choose a characterful signature face from the client brief and pair
it with a quiet neutral body. Do not default to the product-application fonts.

The shipped Solvys website pairs `Almarai` for body and chrome with
`Instrument Serif` italic for display statements. That pairing is the proven
baseline for this register.

Rules:

- Two families maximum on a page.
- Display serif italic for statements, sans for everything else.
- Numerals are tabular and readable before they are stylish.
- Use type size, weight, opacity, and spacing for hierarchy before adding boxes.

Self-host WOFF2 with `font-display: swap`. A paid font requires a recorded
license and the client's authority to use it.

## Reference files

- [format-matrix.md](format-matrix.md) defines the viewport, theme, and motion
  matrix the verifier enforces.
- [scroll-engine.md](scroll-engine.md) documents the runtime that drives the
  narrative.
- [client-intake.md](client-intake.md) defines the research gate and the fact
  table every claim traces to.
