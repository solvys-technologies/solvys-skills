---
name: solvys-website
description: Build, deploy, and verify a complete client marketing website as one turnkey pass that ends in a working Vercel preview URL verified across every format. Use when the user asks for a website, landing page, one-pager, marketing site, or preview for a client, brand, or product, or supplies client research, a reference site, or a design brief to turn into a site.
metadata:
  version: "0.1.0"
---

# Solvys Website

One invocation produces one finished client website: authored source, a live
Vercel preview URL, and format coverage that a human can open and judge without
another build round. The default shape is a single-page site with a scroll-driven
visual narrative.

This skill owns the build discipline. It composes the skills that already own
design canon, deployment, review, and proof. Do not restate their rules; load
them.

| Need | Loaded skill or canon |
| --- | --- |
| Product policy, protected zones, proof state | `/solvys-cao` |
| Project entrance, lanes, receipts | `/solvys-factory` |
| Design canon, material and control rules | `Design.md`, `/solvys-feels` is product-app UI only |
| Visual benchmark teardown | `/solvys-kirby` when a reference site must be reverse-engineered |
| Visual review artifact | `/human-review` |
| Deploy pre-flight and release | `/solvys-deploy` for a client-owned production release |
| Implementation discipline | `factory/canon/ponytail-ladder.md` |
| Prose, copy, status language | `communication-style-protocol`, `factory/forbidden.md` |

## One-shot outcome contract

A run is complete only when all of these are true:

1. A preview URL serves `HTTP 200` with no Vercel authentication wall.
2. Desktop, tablet, and mobile viewports render the full page with no overflow,
   no clipped copy, and no horizontal scroll.
3. Light and dark themes both render their intended treatment.
4. Reduced motion renders a complete, readable page with the narrative intact.
5. Keyboard and pointer paths reach every control.
6. Real client media and real client copy are in place, or a named gap is
   recorded with the decision that is missing.
7. The format matrix script passes at the current deployment.

Author on one page by default. Add pages only when the client's copy or
navigation requires them, or when the intake records a separate blog or legal
page.

## Stop points

Ask a question only when the answer changes what ships and no research can
settle it. Everything else is researched and decided. The permitted stop points
are:

- The preview deployment target when the client already owns a live site.
- A control the client must supply: a marketplace invite URL, a booking link, a
  real logo file, a phone number the client must confirm.
- A direction the client has rejected twice.
- An access gate: a provider login, a paid asset, a protected media library.

For every other gap, take the defensible default, record it in the receipt, and
continue. A disabled control with an unpointed link is acceptable when the
destination does not exist yet. Record it and keep building.

## Phase 0 -- Intake and research

Read [references/client-intake.md](references/client-intake.md) before the first
line of source. It defines the research gate, the fact table, and the copy rule.

The rule that fails most first drafts: the client's identity, offer, phone
number, address, ownership, and product list are facts to find. Never invent
them and never leave a placeholder where a fact exists. Research the client's
current site, business listings, and public catalog first.

When the request supplies a reference site or a visual benchmark to match, run
`/solvys-kirby` and consume its Interface Inventory. Do not approximate a
benchmark from memory or from a screenshot alone.

## Phase 1 -- Visual system

Read [references/visual-system.md](references/visual-system.md) before writing
any CSS. It carries the material recipes, the two Solvys website themes, the
grain and Liquid Glass construction, the dither treatment, and the
type and palette royalty rules.

The short version:

- Light theme is tanned manilla on Solvys gold. Dark theme replaces manilla with
  smoke gray on near-black space.
- Grain sits on explicit flat and textured surfaces. Grain never sits on the
  Liquid Glass material itself.
- Liquid Glass is premium and sparse. It belongs on chosen controls, chips, and
  selected surfaces, not on every row.
- Imagery is dithered and pixelated. Dithering is what makes a low-quality
  source read as intentional styling instead of a bad photo. Apply the same
  treatment to both themes; make dark-mode pixelation finer and subtler than
  light-mode.
- One accent per theme. Resist a second.

## Phase 2 -- Scroll narrative

Read [references/scroll-engine.md](references/scroll-engine.md) before authoring
the scroll behavior. It documents the scroll-driven runtime and its `data-sc-*`
contract.

Requirements:

- Every scroll-driven animation reverses smoothly on upward scroll.
- Every act exposes normalized progress as `--sc-p` so CSS can read it.
- Reduced motion keeps the story and drops the translation.
- Use one smoothed playhead for all scrubbed media rather than writing scroll
  position straight into `currentTime`.
- Author real semantic HTML and mark it up. Do not generate a DOM from a config
  object, because every site built that way looks identical.

A before-and-after narrative runs in the page background: the opening scene
transitions to the finished one as the reader scrolls past the hero, then fades
through detail scenes. Do not cut the page into a sequence of unrelated
sections.

## Phase 3 -- Build

Apply the Ponytail Ladder before writing a component. Prefer an existing seam, a
platform feature, an installed dependency, or a small custom block over a new
library. Assemble the site from the approved Solvys Build Kit and the approved
UI library hierarchy before hand-rolling a control.

Author with literal Tailwind utilities and a small set of CSS custom properties
for the theme tokens. Keep the scroll runtime dependency-free. A build that adds
an animation framework, a WebGL engine, or a second component library for what
the runtime and CSS already do fails the ladder.

Ground every claim the site makes in the intake fact table. Marketing copy is
written, not invented: it must describe what the client actually does.

## Phase 4 -- Preview deployment

Deploy to a Vercel preview, not to the client's production domain, unless the
intake records production authority.

Use the standing Vercel pattern:

```bash
vercel build --prod && vercel deploy --prebuilt --prod
```

Then remove the authentication wall so the client can open the link:

```bash
vercel project inspect <project>
# Disable Vercel Authentication / Deployment Protection for this project
```

Confirm with an unauthenticated fetch before reporting the URL:

```bash
curl -s -o /dev/null -w "%{http_code}" <preview_url>
```

A `401` or `403` means the wall is still up. A protection page is not a preview.
Never report a protected URL as reviewable.

Leave the client's existing production deployment and domain untouched. When the
client already has a live site, deploy under a new project name derived from the
client and the work, for example `<client>-preview`.

## Phase 5 -- Format gate

Run the bundled verifier against the live URL:

```bash
python3 scripts/verify_site.py <preview_url> --json site-receipt.json
```

Read [references/format-matrix.md](references/format-matrix.md) when the matrix
needs to change for a client whose media or navigation differs from the default.

The verifier covers viewport widths, theme rendering, reduced motion, and
control reachability. Fix what it reports, redeploy, and rerun. The site is not
finished while the verifier reports a failure.

For visual judgement on top of the machine checks, capture viewport screenshots
and open the review artifact with `/human-review`.

## Phase 6 -- Handoff

Report the preview URL, what the site says and does, the format matrix result,
and every recorded gap. Name the exact next action for each gap.

Write the receipt to the project Cabinet or, when no Cabinet applies, to the
workspace root:

```text
<workspace>/site-receipt.json     # verifier output
<workspace>/SITE-NOTES.md         # intake facts, decisions, gaps, next actions
```

For a client-owned production release, hand off to `/solvys-deploy` rather than
deploying production from this skill.

## Hard stops

Stop and report when:

- The client is unknown and the request names no brand, product, or research
  source. The intake fact table cannot be built, so nothing grounded can ship.
- Only AI-generated media is available for a client that requires real media,
  and the client cannot supply their own. Record the gap rather than shipping a
  fabricated image of their business.
- A benchmark reconstruction would require proprietary source, protected assets,
  or a brand mark the client does not own.
- A provider credential is needed and no approved custody path exists.
- The preview cannot be made publicly reviewable and no other authorized review
  surface exists.

Do not report a run complete while a Stop point is unresolved. Report the
blocker, the affected surface, and the smallest next action.
