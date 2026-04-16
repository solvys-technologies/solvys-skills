# Solvys Font Kit

Self-hosted WOFF2 font definitions imported from Fintheon. All fonts use `font-display: swap` for performance.

## Font Stack Priority

```css
--font-body: "Readable Digits", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-heading: "Readable Digits", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Readable Digits is always first in the stack to ensure consistent numeric rendering across all themes.

---

## Inter -- Default + Solvys Body

The workhorse. Used for all body text, UI labels, and navigation.

```css
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/fonts/inter-light.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/inter-regular.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/inter-medium.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/inter-semibold.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/inter-bold.woff2") format("woff2");
}
```

## Playfair Display -- Elegant Headings

Serif display font for Solvys-branded headings. Use sparingly.

```css
@font-face {
  font-family: "Playfair Display";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/playfair-display-regular.woff2") format("woff2");
}
@font-face {
  font-family: "Playfair Display";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/playfair-display-semibold.woff2") format("woff2");
}
@font-face {
  font-family: "Playfair Display";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/playfair-display-bold.woff2") format("woff2");
}
```

## Roboto -- Classic Theme

Alternative body font for the Classic theme preset.

```css
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/fonts/roboto-light.woff2") format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/roboto-regular.woff2") format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/roboto-medium.woff2") format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/roboto-bold.woff2") format("woff2");
}
```

## JetBrains Mono -- Code/Monospace

Always active across all themes. Used for code blocks, data values, KPIs, and technical content.

```css
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/jetbrains-mono-regular.woff2") format("woff2");
}
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/jetbrains-mono-medium.woff2") format("woff2");
}
```

## Cinzel -- Imperial Headings

Serif display font for ceremonial/imperial branding contexts. Reserved.

```css
@font-face {
  font-family: "Cinzel";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/cinzel-regular.woff2") format("woff2");
}
@font-face {
  font-family: "Cinzel";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/cinzel-semibold.woff2") format("woff2");
}
@font-face {
  font-family: "Cinzel";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/cinzel-bold.woff2") format("woff2");
}
```

## Readable Digits -- Numeric Override

Inter mapped to numeric/currency unicode ranges only. Prepended in font stacks so digits, currency symbols, and mathematical operators always render in Inter regardless of the active theme font.

```css
@font-face {
  font-family: "Readable Digits";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/fonts/inter-light.woff2") format("woff2");
  unicode-range: U+0024-0025, U+002B, U+002C-002E, U+0030-0039, U+00B0, U+2012-2014, U+2030, U+20AC;
}
@font-face {
  font-family: "Readable Digits";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/inter-regular.woff2") format("woff2");
  unicode-range: U+0024-0025, U+002B, U+002C-002E, U+0030-0039, U+00B0, U+2012-2014, U+2030, U+20AC;
}
@font-face {
  font-family: "Readable Digits";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/inter-medium.woff2") format("woff2");
  unicode-range: U+0024-0025, U+002B, U+002C-002E, U+0030-0039, U+00B0, U+2012-2014, U+2030, U+20AC;
}
@font-face {
  font-family: "Readable Digits";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/inter-semibold.woff2") format("woff2");
  unicode-range: U+0024-0025, U+002B, U+002C-002E, U+0030-0039, U+00B0, U+2012-2014, U+2030, U+20AC;
}
@font-face {
  font-family: "Readable Digits";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/inter-bold.woff2") format("woff2");
  unicode-range: U+0024-0025, U+002B, U+002C-002E, U+0030-0039, U+00B0, U+2012-2014, U+2030, U+20AC;
}
```

### Unicode Range Coverage
| Range | Characters |
|-------|-----------|
| U+0024-0025 | $ % |
| U+002B | + |
| U+002C-002E | , - . |
| U+0030-0039 | 0-9 |
| U+00B0 | degree symbol |
| U+2012-2014 | en-dash, em-dash, figure-dash |
| U+2030 | per-mille |
| U+20AC | euro sign |

## Cormorant Garamond -- Imperial Body

Serif body font for long-form ceremonial or imperial-themed content. Reserved.

```css
@font-face {
  font-family: "Cormorant Garamond";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/cormorant-garamond-regular.woff2") format("woff2");
}
@font-face {
  font-family: "Cormorant Garamond";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/cormorant-garamond-medium.woff2") format("woff2");
}
@font-face {
  font-family: "Cormorant Garamond";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/cormorant-garamond-semibold.woff2") format("woff2");
}
@font-face {
  font-family: "Cormorant Garamond";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/cormorant-garamond-bold.woff2") format("woff2");
}
```
