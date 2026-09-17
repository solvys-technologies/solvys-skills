# Format matrix

The format gate exists because a site that only looks right on the builder's
screen is not finished. The default matrix below is what `scripts/verify_site.py`
checks. Change it only when the client's media or navigation differs.

## Default matrix

| Format | Setting | Pass condition |
| --- | --- | --- |
| Desktop | width `1440`, height `900` | Full page renders, no horizontal scroll |
| Laptop | width `1280`, height `800` | No clipped copy, no overlapping elements |
| Tablet | width `834`, height `1112` | Layout reflows, tap targets stay reachable |
| Mobile | width `390`, height `844` | Single column, no horizontal scroll |
| Narrow mobile | width `320`, height `568` | No clipped copy, no overflow |
| Light theme | default | Manilla and gold treatment renders |
| Dark theme | `prefers-color-scheme: dark` | Smoke gray and space treatment renders |
| Reduced motion | `prefers-reduced-motion: reduce` | Complete readable page, no stranded stage |
| Keyboard | tab traversal | Every control receives focus, focus is visible |
| Pointer | fine pointer | Pointer-gated effects active, inert on coarse |
| Auth | unauthenticated fetch | `HTTP 200`, no protection page |

## What the verifier checks

For each viewport it records whether the page produced horizontal overflow, which
is the single most common defect in a scroll-driven site. For each theme it
records whether the theme's tokens actually resolved rather than falling back.
For reduced motion it records whether the narrative content is present in the
document rather than hidden behind a stage that never advances.

## Manual checks the script cannot make

The verifier proves the page is well formed. It cannot judge whether the site
looks right. Capture screenshots and open them with `/human-review`:

- Does the opening scene establish the place and the offer?
- Does the scroll narrative reverse smoothly, not just forward?
- Does the dark theme look considered, or merely inverted?
- Does the grain read as texture, or as noise over the image?
- Does the logo casing read as a raised element, or as a border?
- Does the copy describe the business in the fact table?

## When to change the matrix

Add a format when:

- The client's navigation has more destinations than the default fits.
- The client's media has an aspect ratio that breaks at a listed width.
- The client operates primarily on a format not listed, such as a kiosk or a
  large-format display.
- The client's audience needs a specific zoom level or contrast setting.

Do not remove a format because it is inconvenient. Record it as a known failure
with its cause and next action instead.
