---
name: solvys-pta
description: Prototype-to-alpha implementation from a validated Interface Inventory and accepted PL0 contract, with approved-library assembly, ChatGPT Site hosting, exact-copy parity receipts, and fail-closed source, Site, browser, and human-review gates. Use when the user asks to prototype, recreate, or build an Alpha surface from a benchmark report, approved component inventory, finalized design system, or Wonder-to-Site transfer.
---

# Solvys PTA: PL0-locked prototype-to-alpha implementation

## Contract

The prototype consumes a finalized Interface Inventory. It does not invent a
design system while scaffolding a screen.

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
assembling the Alpha: YAGNI, existing repo seam, standard library or native
platform, already-installed dependency, maintained OSS with lower ownership
cost, one line, then the minimum custom code. Assemble from accepted approved
blocks before creating a custom component.

The objective is: deliver a runnable Alpha prototype that matches the accepted
PL0 contract for every token, component anatomy, variant, state, responsive
rule, interaction, motion rule, and layout rule, using only the internal
Approved UI Libraries and recorded no-fit exceptions.

## Mandatory report gate

Before touching frontend files, creating a project, writing CSS, or starting a
preview, require the report root and run the Solvys Kirby validator:

```bash
python3 <solvys-kirby>/scripts/validate_interface_inventory.py \
  <interface-inventory-root> --require-accepted
```

Proceed only when the command returns:

```text
PASS: Interface Inventory package passed accepted PL0 validation
```

The report root must contain the four core files
`DESIGN_TOKENS.md`, `COMPONENT_INVENTORY.md`, `LAYOUT_ARCHITECTURE.md`, and
`INTERACTION_PATTERNS.md`, plus `INTERFACE_INVENTORY.md`,
`NAVIGATION_MAP.md`, `PL0_ACCEPTANCE.md`, `EVIDENCE_LEDGER.ndjson`, and the
project ChatGPT Site receipt. A legacy Wonder board receipt may remain as
evidence, but it cannot replace the Site receipt. `PL0_ACCEPTANCE.md` must say
`Status: ACCEPTED`.

If the report is missing, incomplete, stale, unmeasured, or unaccepted, stop
with `BLOCKED`. Name the missing file, failed validator rule, or missing user
decision. Do not scaffold a partial prototype as a workaround.

## Required intake

1. Read the accepted report revision and record its path, revision, checksum or
   source commit, benchmark scope, target Alpha, and acceptance date.
2. Read the target repo instructions, `Design.md`, current PL0 and PL1
   records, current component source, and dirty state. Preserve unrelated
   changes.
3. Load the current internal Approved UI Libraries ledger and verify the
   installation foundation for each mapped block. Record source, revision,
   license, registry access, installation state, adapter, owner, fallback, and
   proof requirement.
4. Record the project ChatGPT Site and source-to-Site publication path before
   frontend implementation. Use the Site for review under the Solvys operating
   rules. Legacy editor artifacts are evidence context and cannot replace Site
   proof.
5. Freeze the accepted report revision. A later report revision blocks this
   prototype until the user accepts the new PL0 record.

## Evidence-rung discipline

Keep each receipt separate: authenticated Wonder source readback, Kirby
inventory and PL0, repository source and build, Site source push, saved Site
version, deployment, browser runtime, and human review.

A saved or successful private deployment proves packaging and hosting only. It
does not prove visual parity or runtime behavior. If the Wonder connector is
missing or its refresh is invalid, the Site is owner-gated, or a browser view
cannot be reached, mark that rung `BLOCKED`. Use `MATCHED` only after same-
viewport route and state captures show no visible deviation. Otherwise use
`DIVERGED` or `BLOCKED`; never widen access, mutate the benchmark, or add a
guessed state to bypass the gate.

Preserve old candidates and human-owned source frames. Use a machine-readable
source manifest with exact copy, geometry, tokens, shadows, component
ownership, and capture IDs. Unmeasured behavior stays in the blocker ledger
until Wonder evidence or an explicit PL0 contract exists.

Run the actual ChatGPT Sites isolated build after saving or publishing. If it
catches stale starter configuration or packaging drift, repair the source,
push a new exact commit, save a new version, and redeploy before review.

Retrieve approved private-library credentials from the UI Libraries Paste
location when a mapped block requires them. Never print, commit, or place a
raw credential in a report. If the credential or private source is unavailable,
keep that block blocked and use the public approved fallback only when PL0
allows it, with the ownership and proof gap recorded.

## PL0 fidelity rules

Treat the accepted PL0 record as a typed contract:

| PL0 record | Prototype must match |
| --- | --- |
| `DESIGN_TOKENS.md` and accepted token IDs | Exact color, typography, spacing, radius, elevation, breakpoint, icon, asset, and motion values |
| `COMPONENT_INVENTORY.md` and component IDs | Exact anatomy, nesting, slots, variants, hierarchy, content rules, and all accepted states |
| `LAYOUT_ARCHITECTURE.md` and layout IDs | Exact containers, gutters, grids, fixed or sticky layers, overflow, scroll, templates, and responsive changes |
| `INTERACTION_PATTERNS.md` and interaction IDs | Exact click, keyboard, focus, touch, gesture, loading, error, success, open, exit, and reduced-motion behavior |
| Approved-library map in PL0 | The named approved block, adapter boundary, source revision, and ownership split |
| Intentional divergence list | Only the listed differences. Do not add silent improvements |

When the report leaves a value `UNKNOWN`, `INFERRED`, or `UNREACHABLE`, stop
before choosing a default if the value affects the accepted surface. Route the
gap back to Solvys Kirby for capture or to PL0 for an explicit user decision.

## Approved-library implementation

Assemble the accepted pattern from the internal hierarchy:

1. BeUI Pro, then BeUI.
2. Motionary.dev, then ascertainty UI.
3. Bklit for eligible data visualization, then EvilCharts.

Use a library for presentation and accessible primitives. Keep Alpha-owned
state, data, domain semantics, routing, permissions, persistence, provider
behavior, data cadence, and security in the product seam.

Do not import a benchmark's library, screenshot, CSS, icon, asset, or source
code into the Alpha unless the user has separately authorized it and PL0
records that authority. Do not use a generic UI kit as a silent fallback. A
no-fit exception must name the searched approved sources, reason, owner,
maintenance cost, fallback, and PL0 approval before custom work begins.

## Build sequence

1. **Map the source.** Create a trace table from each prototype route and
   component to its accepted report IDs, approved block, source file, and
   owner. Do not begin with a blank generic shell.
2. **Install or verify the foundation.** Use the recorded source and version.
   Do not add dependencies that the report does not need. Preserve existing
   repo ownership and protected zones.
3. **Implement the accepted tokens.** Copy exact values into the repo's
   existing token seam. Do not rename, smooth, normalize, or theme values
   without a new PL0 decision.
4. **Implement the component anatomy.** Build the accepted nesting and slots
   from the mapped approved blocks. Implement every accepted variant and
   state, including disabled, loading, empty, error, success, focus, open,
   expanded, modal, and responsive states where applicable.
5. **Implement layout and behavior.** Match accepted containers, grids,
   breakpoints, scroll rules, z-index layers, keyboard paths, gestures,
   transitions, and reduced-motion behavior. Keep content visible by default.
6. **Record deviations immediately.** If source, library, or runtime limits
   prevent exact matching, stop the affected seam, record the difference and
   cause, and route a PL0 decision. Never hide the difference in polish work.

## Proof gate

Verify the prototype against the accepted report at every required viewport,
theme, route, component variant, and state. Use real click, tap, keyboard,
focus, gesture, open, close, submit, cancel, loading, error, success, and
persistence checks where the report requires them.

For each proof frame, record the report capture ID, prototype capture ID,
viewport, theme, state, route, interaction action, and result. Compare measured
tokens and geometry. A build or typecheck does not prove visual fidelity.

Use the project ChatGPT Site for the live frontend review. When visual or
content review is needed, create the Site-derived local HTML artifact and open
it with `human-review`, then apply accepted feedback to source and republish
the Site. Keep source, Site, deployed, and installed proof separate.

For an exact-copy or 1:1 objective, compare Wonder/source and the Site at the
same viewport, route, and state before publishing or accepting a version. Check
palette, density, geometry, shell, labels, controls, and visible content. A
token-aligned candidate is still `DIVERGED` until this comparison is `MATCHED`.
If the Site is owner-gated or unreachable, mark runtime proof `BLOCKED` and do
not publish a replacement to work around the missing evidence. A new private
candidate requires explicit authorization and must leave the current Site
intact until human acceptance.

Run a final comparison for:

- token and font values;
- component anatomy, variants, and state matrix;
- layout, breakpoints, overflow, and z-index;
- interaction, motion, gesture, keyboard, focus, and reduced-motion behavior;
- accessibility, contrast, target size, semantics, and announcements;
- approved-library provenance and no-fit exceptions;
- intentional divergence list and unresolved items.

The handoff must say `MATCHED`, `DIVERGED`, or `BLOCKED` for each contract ID.
Do not call the prototype exact when any unapproved divergence remains.

## Hard stops

Stop before implementation when:

- no Interface Inventory report exists;
- the validator fails;
- PL0 is not explicitly `ACCEPTED`;
- the accepted report revision changed;
- an approved library mapping is missing or unverified;
- a required state, breakpoint, theme, component anatomy, or layout rule is
  absent;
- the desired behavior requires an unapproved dependency or custom block;
- a source value is unknown and the agent would need to guess;
- a visual review surface or required proof cannot be reached.

Return the exact blocker and the next evidence or decision needed. Do not
create a placeholder prototype, generic shell, fake state, or unverified
library substitute to make the task appear complete.
