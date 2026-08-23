# Solvys Product Design Doctrine

Last source pass: 2026-07-16.

This file is the frontend design gate for Solvys product work. It turns the
current Fintheon app design tendencies into rules that agents must use before
planning, while planning, and before implementation.

## Mandatory Frontend Gate

For any task that touches frontend, UI copy, styles, icons, layout, motion,
drawers, composer behavior, charts, empty/error/loading states, or public pages:

0. Read and apply the complete anti-slop law in the active `AGENTS.md` before
   this file. Confirm that read to TP and promise a point-by-point final recheck.
1. Load `/solvys-cao` so the original problem, best precedent, client partition,
   protected zones, and proof rung are explicit before visual direction is set.
2. For a new Solvys project or greenfield frontend, create the project's
   ChatGPT Site before treating a visual direction as implementation-ready.
   Record the Site URL, sandbox, source branch or Cloud checkpoint, and the
   six-source library installation status. Use the approved library block first;
   record a no-fit exception before any custom component or block.
3. Read this `Design.md` immediately before writing the implementation plan.
4. Read the target repo-local `Design.md` or `DESIGN.md` when one exists. The
   repo-local file may narrow defaults, but it cannot weaken this shared canon.
5. Read the target repo instructions and the current source files for the
   actual surface being changed.
6. Inspect current rendered proof for the surface when the app can run or a
   prototype exists.
7. Retrieve the strongest accepted Solvys precedent plus the failure that
   preceded it. The nearest or most recent example is not automatically canon.
8. Write the plan against this file.
9. Before editing, re-check the plan against this file and remove any violation.
10. During final verification, inspect the rendered surface, test every control,
    and re-read the anti-slop law point by point. Typecheck alone is insufficient.

If the user corrects a design rule, capture the correction in this file or in
the repo-local design file before product-wide migration work continues.

A project-owned ChatGPT Site is the design and implementation-check surface.
Open `human-review` automatically on a Site-derived local HTML review artifact
when the Site needs visual or content review. Wonder owns the human-editable
frontend source and its recorded code mapping. Read
`factory/canon/frontend-wonder-source-of-truth.md` before a frontend change.
Existing Builder and Plasmic artifacts
are protected legacy inputs until TP selects a source transfer. Localhost, port 7777,
a screenshot, or a legacy-editor preview cannot be promoted into source,
deployed, live, or installed proof.

Every Site prototype must be a 1:1 runnable representation of the accepted
source or product specification at the requested scope. Match geometry,
hierarchy, copy, data meaning, routes, controls, loading/empty/error states,
responsive behavior, keyboard/focus accessibility, and interaction feedback.
Reject placeholder screens, fake dashboards, invented identities or metrics,
dead controls, skeleton-only previews, and close-enough substitutes. Record the
source-to-Site path, route/state map, control checklist, desktop/mobile
viewports, fixture provenance, and Site interaction receipt before acceptance.

The Installation Foundation is BeUI Pro primary with BeUI fallback, Motionary.dev
secondary with ascertainty UI fallback, and Bklit primary for visualization with
EvilCharts fallback. Plans record provenance, license, installation state, and
protected zones. Policy-only work records each as `not applicable` and installs
nothing.

Do not design a generic component or block until the approved hierarchy has been
searched and found not to fit. Record the no-fit exception before custom work.

The Solvys Build Kit is the runnable assembly layer for shared interview,
architecture, control-inventory, state, rail, and workbench surfaces. Load it
through `$solvys-build-kit` after the Installation Foundation decision. It can
compose approved library bodies, but it never owns product identity, data,
permissions, routes, provider state, persistence, or acceptance.

If a task says "copy-paste" from one workspace to another, inspect the source
implementation and copy/adapt the real code. Do not recreate an approximate
version from memory.

If TP provides a website, screenshot, or implementation as inspiration, use the
two-stage reference workflow: faithfully reconstruct the supplied composition,
geometry, responsive behavior, and interactions first; compare it against the
reference; then personalize it through a recorded divergence pass until the
client result is unmistakably distinct. Use only assets and source TP is
authorized to use. Do not improve the reference before fidelity can be judged.

## Canon Terms

- Canon: the stable source of truth that agents must follow before taste,
  memory, or library demos.
- Token: a named design value such as color, radius, spacing, motion duration,
  or material intensity, implemented as CSS variables or theme values.
- Primitive: a source-owned reusable UI unit, class family, component, or
  interaction contract.
- Reference-only: approved inspiration or demo behavior that informs decisions
  but is not a default implementation dependency.

## Fintheon Design Tendencies

Fintheon is the default Solvys product-UI personality. It is a dense operational
workspace, not a generic SaaS dashboard and not a marketing card grid.

- Warm near-black canvas, restrained gold events, warm off-white/grey text.
- Rails, drawers, toolbars, composer surfaces, and compact panels.
- Data-first hierarchy with dense but readable spacing.
- Source-owned primitives before new shells.
- Borderless icon-first controls unless a primary action fill is required.
- Integrated rails, tucked drawers, continuous headers, and main content areas
  with large iOS-style rounding over shared chrome.
- Drawers attached to the control/composer that owns them.
- Motion that clarifies attachment, reveal, collapse, and state change.
- User-facing copy only. No implementation narration in the UI.

Theme evidence: Fintheon defaults to `#080808` bg, `#e0e0e0` text,
`#C79F4A` accent, `#0a0a0a` surface, and `#1a1a1a` border. Solvys base
identity remains `#050402`, `#f0ead6`, and `#c79f4a`. Current app fonts are
`Space Grotesk`, `Doto`, and `Space Mono` with readable digits.

Use Fintheon app patterns for product UI. Use public-site registers only for
public product pages, brand pages, or marketing surfaces.

## TP Personal Design Registers

When a client has not supplied a stronger visual register, Solvys work should
feel like TP's art or home, never like a generic agency template.

- **Home:** minimal, borderless, calm, precise, and warm, with one controlled
  pop. Hierarchy comes from space, type, tone, and exact alignment instead of
  boxes and lines.
- **Art:** authored, unusual, fresh, and tech-forward. It needs one memorable
  signature artifact, thoughtful simple-sense components, and a coherent visual
  medium that could only belong to this product.

Both registers require purposeful motion on every applicable interactive
element: hover/focus/press state, attached surface continuity, selection,
numeric change, drag, progress, or feedback. Motion remains visible-by-default,
works under reduced motion, and never exists merely to prove animation was added.

Before locking a meaningful direction, review it through the ten `/solvys-cao`
roles: solution ownership, product architecture, design direction, frontend
experience, systems, debugging, adversarial QA, sanitation, research, and
review/release truth. One agent may perform all ten lenses.

## Operational Cockpit Override

This override applies to dense operational product surfaces, with Fintheon Desk
as its reference implementation. It does not apply to marketing or public
sites, and it does not import trading-specific semantics into other Solvys
applications.

- Organize the work surface as a left context stack, a primary right decision
  surface, a lower awareness surface, and a persistent bottom KPI strip.
- Use quiet seams, data hierarchy, and spacing to connect those regions. Do not
  turn each region into an equal-weight card grid.
- Keep `EdgeCaster` as the Fintheon Desk default. Layout selection belongs in
  Profile settings; never add an in-cockpit layout picker or floating prototype
  pill.
- Give compact bubbles only to the selected tab or selected section. Leave the
  rest of the control surface bare and legible.

## Future Frontend Stack Ledger

Read `/solvys-cao/references/official-stack.md` for the full current ownership
ledger. Stable canon: Base UI for greenfield accessible headless primitives;
BeUI/BeUI Pro for eligible source-owned interaction and motion patterns; Bklit
for eligible analytical charts; Tremor Raw for secondary analytical tables,
filters, KPI/status blocks, and simple charts; `@number-flow/react` for eligible
changing numerals; one Motion runtime per repo; `leva` for internal sandbox
annotation/tuning; `cmdk` for command palettes; `react-virtuoso` for large
feeds/tables; and `@dnd-kit/*` for accessible sorting.

Conditional: `sonner` only when the product does not already own notification
state and its visual treatment is rebuilt in the product register. Datawrapper
is server-only for authored report/editorial figures with a local fallback.
Denied/reference-only: Liveline is not charting canon; Figma/iOS kits and Fluid
Functionalism are geometry, material, and interaction references translated
into Solvys primitives.

Every imported library needs a job, provenance, allowed surfaces, theme/motion
adapter, and protected-surface ledger. A representative rendered gallery must
pass before broad migration. Libraries never override product state, cadence,
domain semantics, source-owned primitives, this file, or repo-local design.

## Absolute Bans

These are default violations unless TP or the current repo explicitly asks for
the exception:

- Normal or toolbar buttons with both background color and border lines.
- Button backplates around icon buttons.
- Hover border boxes around small controls.
- Borders/backgrounds around ordinary buttons, ticker pills, mobile header
  icon buttons, or drag rows unless the control is selected, primary, or
  source-owned.
- Left-side Kanban borders, side-stripe alerts, and card-left color bars.
- Gradient emojis, emoji UI chrome, AI sparkles, glitter, aurora filler.
- Basic agent-drawn icons when a local icon facade, Lucide, Nucleo mapping, or
  verified brand SVG exists.
- Recreating source code from memory when the user asked to copy-paste from an
  existing workspace.
- Duplicate visible text, repeated section labels, unnecessary headers, or UI
  that explains the implementation.
- Developer-facing UI copy such as "added robust error handling" unless the user
  asked for developer controls or diagnostic text.
- Raw backend/source strings rendered directly without user-facing
  capitalization.
- Browser-default or harsh fonts that do not read soft, modern, and smooth.
- Applying a display font, icon bank, material, or motion system globally before
  it passes representative dense, mobile, empty, error, and live-data proof.
- Instant new popups, rails, drawers, modals, sheets, panels, or menus.
- Applicable controls with no purposeful state transition or microinteraction.
- Pointed square borders, triangular corner flags, sharp outline ornaments.
- Homemade Liquid Glass from generic blur, border, and glow CSS.
- Liquid Glass with grain. Grain belongs only to explicit flat/textured
  surfaces, never to the Liquid Glass material itself.
- Raw white pearl in Liquid Glass. Pearl tint must mix the project primary token
  with a warm pearl/off-white token.
- A left/right comparison gallery presented as the future target after the
  contract has been selected. Show the chosen contract only.

Approved exceptions must be local and justified by repo evidence. A primary CTA
may have a fill. A danger action may use an explicit destructive state. A 1px
fading ruler may use a gradient as a line, not as a surface fill.

## Buttons And Controls

Buttons are commands, not tiny cards.

- Toolbar/icon controls default to transparent, borderless, and icon-first.
- Use labels only when command clarity requires text.
- Primary fills are allowed for true primary actions.
- The canonical primary CTA treatment is **Street Light**, named from the
  accepted Fintheon Forum Mobile `Join` control. It uses one near-black outer
  plate with a restrained directional top light behind the action content, a
  clean inset top lip, and a crisp foreground above every material layer. The
  light may illuminate the plate; grain, fog, blur, bloom, or a pseudo-element
  may never sit over the label or icon. Do not copy the Forum phone icon into
  unrelated CTAs; the material and content layering are the reusable contract.
- Street Light applies only to the true primary CTA. Selected controls, status
  indicators, header widgets, and recommendation chips retain their own compact
  materials and must not be promoted into primary actions.
- A Street Light CTA must remain legible and aligned in resting, hover, focus,
  pressed, loading, disabled, error, success, glass-off, and reduced-motion
  states. Disabled means visibly unavailable, never dusty or unreadable. Wrap
  direct text nodes or make the shared primitive establish a foreground layer
  so all glyphs remain above `::before`, `::after`, grain, and distortion.
- Validate Street Light mobile-first. Compact height and width must reduce the
  light's spread rather than compress its wash over the foreground. A mobile
  CTA may become full-width or stack its content when the product layout calls
  for it, but the label, icon, spinner, and focus treatment remain optically
  centered and unobscured at the narrowest supported viewport.
- Secondary actions use a distinct, opaque near-black material with a restrained
  primary-tint angle, inset top edge, soft external lift, and fully legible
  foreground. Keep that treatment separate from Liquid Glass and cap-light so
  alternate actions never read fogged. It applies only to explicit secondary
  actions; primary/suggested actions, selected controls, status pills, and
  widgets keep their own semantic material.
- Approved soft-glow states are allowed only when already present in the repo
  or explicitly requested.
- Selected tabs and selected sections use a compact selected bubble only. The
  bubble may use the approved source-owned selected material, but unselected
  tabs stay bare text or bare icons.
- The directional cap-light remains the shared compact-material treatment for
  selected controls, status badges, widgets, and recommended action chips. Its
  source is just above the center of the capsule and falls through the material;
  ordinary controls remain bare. It does not define primary CTA composition;
  Street Light owns that role and keeps its light behind the foreground. A user
  preference that removes optional glass blur or distortion keeps this static
  compact-control light, because it is the compact-control identity rather than
  a backdrop effect.
- Use the active primary token when a control has no semantic state. When a
  compact control carries severity, drive the cap-light from its state token;
  a VIX move temporarily overrides it with bullish as VIX falls and bearish as
  it rises. A desktop vertical fuse uses a narrow, fully rounded black Liquid
  Glass rail with a primary-token rim and reflection rising from the bottom;
  severity color belongs only to the liquid inside the rail.
- Short metadata labels such as `Set`, `10 min`, `Sync`, `Plan`, or `Morning`
  stay plain text unless the user asks for chips.
- Button text must sit on the optical horizontal axis of the control, especially
  where the border radius is shallowest vertically. Use line-height, padding,
  and flex alignment tokens instead of one-off nudges.

Before adding a background or border to a button, prove why text color,
opacity, icon state, underline, ruler separation, or a primary fill is not
enough.

Before migrating Street Light across a product, render a representative gallery
containing at least one primary form action, a disabled/loading action, an
icon-and-label action, a narrow mobile action, and the product's accepted source
CTA. Approve the shared primitive against that gallery before changing all
consumers; do not conceal a product-wide material migration inside scattered
screen fixes.

## Drawers, Composer, And Rails

The Solvys chat composer is a system surface. Do not restyle it per page.

- Rails are integrated edge structures, not standalone cards. A collapsing
  sidebar becomes an integrated icon rail before it becomes a floating menu.
- Sidebars use borderless selected bubbles. Do not box every menu item.
- Main content can use large continuous iOS-style rounding. The underlying
  header, rail, drawer, or sidebar chrome must visually continue beneath those
  rounded corners so corners feel blended, not cut out.
- Headers belong to the shared chrome layer. Their controls follow the same
  borderless icon rule and selected-bubble rule.
- Preserve the repo-owned composer component and slots.
- Full and compact are the only composer variants.
- Attach, tools, skills/connectors, mentions, queues, and context pickers are
  connected drawers.
- Provider selectors, command palettes, full previews, and approvals are popups
  or modals, not drawer-shaped popovers.
- Drawers must visually touch or tuck under the owning composer/control.
- The seam-side border should tuck under the owner, with matching inner padding
  so content alignment does not shift.
- Opening another drawer closes the active drawer. Re-clicking the active
  trigger closes it.
- Do not add full-row black strips, row-wide fades, detached drawer cards, or
  wrappers that blur/dim/capture content outside the composer/drawer footprint.
- Chat composers are docked-with-lift surfaces: structurally docked to their
  shell, visually premium, and never detached cards pretending to be input bars.

When a number conflicts between old notes and current code, follow the current
repo-owned component and verify the rendered geometry.

## Icons And Loaders

Use the icon bank. Do not invent icons.

Order of preference:

1. The target app's local icon facade or shared icon resolver.
2. Verified brand SVGs through the app's brand icon component.
3. Lucide icons already installed in the app.
4. Nucleo mappings/specs when the repo owns or references them.
5. A plain fallback lettermark when and only when the brand icon is unknown.

Rules:

- Line icons, 1.5-2px stroke, flat, theme-colored.
- No colorful filled marks for product UI unless it is a verified brand mark.
- No emoji substitutes.
- No one-off SVGs if Lucide/Nucleo/local bank already has the concept.
- Loader states use approved dot-matrix/braille/circular loader primitives and
  fade to borderless success checks when the repo supports it.
- Preserve tooltips, `title`, and `aria-label` for icon-only controls.

## Typography

Fonts should read soft, modern, smooth, and intentional.

Product UI defaults:

- `Space Grotesk` for current Fintheon body/product chrome when the theme uses
  the Nothing/Solvys register.
- `Doto` for headings, micro-labels, and display-like system labels where the
  current app uses it.
- `Space Mono` or repo mono for data values, metrics, code, timings, and IDs.
- `Inter`/Readable Digits where the current theme or numeric readability needs
  it.

Those families describe current Fintheon compatibility, not a greenfield font
default. New products choose a characterful, licensed or self-hosted signature
face from the client brief and use a quiet neutral body. Dense numerals always
prioritize readable/tabular behavior; the Doto rollback proved that display
personality cannot own timestamps, compact KPIs, or calendar values.

Keep each screen to a small type palette. Use type size, weight, opacity, and
spacing for hierarchy before adding boxes, fills, or borders.

## Color And Material

Use warm black/grey layers, muted gold events, and restrained text opacity.

- Product chrome is mostly flat layers, opacity, type, thin rims, and fading
  rulers.
- Frosted glass is a functional material: warm translucent plate, restrained
  blur, no glow-rim theater.
- Liquid Glass needs a professionally shipped/source-backed example and a
  repo-owned treatment.
- Liquid Glass is premium and sparse. It belongs on chosen controls, selected
  sections, important popovers, and source-owned material examples, not every
  button or row.
- Liquid Glass tint uses the project primary token mixed with pearl/warm
  off-white. Never use raw white. In Fintheon, the pearl should read as subtle
  primary/pearl, like a soft lit iOS control, not a white glow.
- Shared glass rims must derive from the warm text/pearl token rather than raw
  white. Dense result surfaces use quiet opaque compartments and chips; apply
  cap-light only when the element is semantically primary, selected, status, or
  source-owned.
- A contained radial cap-light is an approved source-owned material edge, not
  a decorative gradient. Use it only on compact controls and chips, keep the
  source centered above the capsule, and let status color appear as a faint
  local reflection while text or icon remains the state signal. The glass
  setting may remove distortion, but it does not remove this static
  compact-control identity.
- Grain is not Liquid Glass. Grain is allowed only on explicit flat/textured
  surfaces such as selected sidebar sections, selected QuantComposer memo
  blocks, or Arbitrum preset cards when the local design file calls for it.
- Gradients are not product chrome. The approved product exception is a 1px
  fading ruler or source-backed image/material edge.
- Severity colors apply to values and states, not entire decorative containers.

Avoid one-note palettes. Do not drift into purple-blue SaaS gradients, beige
default dashboards, or decorative brown/orange panels unless the product source
register already proves that direction.

## Copy And Data Rendering

Only render what the user needs.

- Preserve exact user-visible copy when the request is copy, legal, notice, or
  status sensitive.
- Do not duplicate labels, headers, or explanatory text.
- Do not show implementation notes to end users.
- Error handling belongs in behavior and compact user-facing states, not a large
  "Errors" panel unless the product surface is a diagnostics/admin surface.
- Convert raw values to display values before rendering: `needs_review` becomes
  `Needs Review`, `morning_daily_brief` becomes `Morning Daily Brief`.
- Keep acronyms intentional and consistent with repo vocabulary.
- Use title/proper capitalization for labels and sentence case for readable
  prose unless the surrounding product surface already uses uppercase
  micro-labels.

## Source-First Reuse

Reuse beats approximation.

- Start from existing components, primitives, tokens, hooks, and CSS utilities.
- When TP asks to copy a surface from another workspace, inspect the source,
  copy the implementation, and adapt it to the target repo.
- When TP supplies inspiration, complete and compare the faithful reference
  reconstruction before changing brand or composition. Then record every
  divergence that makes the final work client-owned and unmistakably distinct.
- Do not rewrite a working component by describing what it probably did.
- Do not install a new component library, icon runtime, animation system, auth
  system, or charting stack unless the source repo already uses it or TP
  explicitly approves it.
- External design examples authorize a fidelity study of structure, behavior,
  and visual language inside the requested workflow. They do not authorize
  proprietary source, protected assets, marks, or copy TP does not control.

## Planning And Proof Loop

For meaningful frontend work, read this file and repo-local design docs before
planning, read target source/rendered proof, and re-check the plan before
editing. Load `/solvys-cao` plus the smallest applicable skills: usually
`/impeccable`, `/apple-design`, `/solvys-brief` or `/solvys-orchestrate`, and
`/solvys-parallel-sessions` when the work needs repository-backed Cloud Tasks.

### Solution Outcome Gate

Every frontend plan must name the user's original problem, the solution being
implemented, and the user-visible outcome. Its acceptance criteria must prove
that the solution resolves that problem rather than merely proving that files
or components exist.

For every button or control the user requested or the plan introduces, specify
the command it owns, click/tap behavior, loading/disabled/error states, and any
expected navigation or persistence. Completion requires rendered interaction
proof on the intended surface and relevant desktop/mobile widths.

The plan must also record that this shared canon and any repo-local design file
were loaded before planning. A technically working control still fails the gate
when it violates the approved control, material, icon, copy, layout, motion, or
responsive rules.

Before calling UI work done:

- Greenfield work has a recorded project ChatGPT Site URL, source-to-Site
  publication path, automatic human-review state when needed, and a verified
  approved-library installation or no-fit receipt.
- The Site is a 1:1 runnable representation of the accepted source or product
  specification. Copy, geometry, data meaning, controls, states,
  responsive behavior, accessibility, and interaction receipts match the
  accepted target. No placeholder or fake product behavior remains.
- Source components/code were reused or copied when requested.
- Inspiration-led work passed reference fidelity before client divergence.
- No banned button borders/backplates, side stripes, instant surfaces,
  homemade glass, grainy Liquid Glass, raw white pearl, duplicate UI copy, raw
  source strings, or nested card stacks were added.
- Ordinary controls are borderless unless selected, primary, or source-owned.
- Selected tabs/sections use compact selected bubbles.
- Icons come from the app facade, verified brand SVGs, Lucide, or Nucleo.
- New surfaces have enter and exit transitions.
- Every applicable interactive element has purposeful feedback or a
  microinteraction, with visible-by-default and reduced-motion behavior.
- Text fits, mobile/desktop geometry holds, shell pieces blend correctly, and
  rendered proof plus repo-native build/typecheck were captured or blocked.
