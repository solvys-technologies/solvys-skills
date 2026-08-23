---
name: solvys-kirby
description: Reverse-engineer an authorized live benchmark into a complete Interface Inventory, UI/UX Teardown Spec, Design System Extraction Report, and Frontend Recreation Blueprint. Use when the user invokes $solvys-kirby or Solvys-admiration-report, chooses a benchmark to study, asks for evidence-backed UI reconstruction, or requires a design-system report before a prototype.
---

# Solvys Kirby: Interface Inventory

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
turning the inventory into a recreation blueprint: YAGNI, existing repo seam,
standard library or native platform, already-installed dependency, maintained
OSS with lower ownership cost, one line, then the minimum custom code. Reconstruct
the accepted benchmark with existing approved components before inventing new
ones.

## Contract

The original problem is design work that starts from an idealized Figma file,
marketing screenshots, or memory and misses the live product's real states.

The solution is an evidence-backed Interface Inventory. It records the
rendered benchmark as a measurable system that another agent can consume.

The objective is: deliver a complete Interface Inventory for the user-selected
benchmark so Solvys can decide its own Alpha's tokens, components, states,
layout, and approved-library mappings before any prototype work starts.

Use the name `Interface Inventory` in the main handoff. The aliases `UI/UX
Teardown Spec`, `Design System Extraction Report`, and `Frontend Recreation
Blueprint` describe the same evidence package.

Keep the legacy invocation names `$solvys-kirby` and
`Solvys-admiration-report` mapped to this skill.

## Authority and boundaries

- The user selects the benchmark, routes, role, and audit scope. Do not widen
  the benchmark set without a new decision.
- The live rendered product is the primary source of truth. Figma, marketing
  screenshots, documentation, remembered behavior, and source code are
  supporting evidence only.
- The report records observed behavior. It does not copy protected code,
  assets, brand marks, private data, or product-specific content.
- Inspect only sources that the user is allowed to access. Do not bypass
  authentication, rate limits, paywalls, access controls, or product safety
  controls.
- The report is the source for the Alpha design decision. PL0 is the final
  decision record for the Alpha. A benchmark observation does not become an
  Alpha requirement until the user accepts it in PL0.
- The internal Approved UI Libraries list controls implementation mapping.
  Benchmark libraries and screenshots never authorize a dependency or a
  copied component.
- Wonder is the required evidence board for this report when the authorized
  Wonder surface is available. It does not become the design authority. The
  project ChatGPT Site remains the frontend review surface under the Solvys
  operating rules.

If the benchmark, target role, route scope, or permitted access is missing,
ask for the smallest missing decision before capture. If live rendered access
is unavailable, stop the inventory and report the exact evidence blocker.

## Required workflow

1. **Freeze the brief.** Record the benchmark name and URL, user role, account
   or fixture state, routes, target product, capture date, timezone, requested
   breakpoints, themes, state scope, permitted assets, and output directory.
   Record the target Alpha and the PL0 decision that this report will support.

2. **Load current truth.** Inspect the target repo, local instructions,
   `Design.md`, current PL0 record, existing tokens, routes, component source,
   screenshots, and dirty state. Load the current internal Approved UI Libraries
   ledger. Record the strongest accepted Solvys precedent and the closest
   failure when the repository provides them. Do not overwrite dirty work.

3. **Verify the approved foundation.** For every library that can own a
   mapped block, record `installed`, `already installed`, `planned`, or `not
   applicable`, plus source, version or revision, license, registry access,
   target seam, owner, protected zones, fallback, and proof requirement. Use
   this order for the shared hierarchy:

   - BeUI Pro, then BeUI.
   - Motionary.dev, then ascertainty UI.
   - Bklit for eligible data visualization, then EvilCharts.

   Add a product-specific approved source only when its current ledger proves
   approval. A no-fit custom exception must name the searched approved sources,
   reason, owner, maintenance cost, protected product state, and PL0 decision.

4. **Capture the live interface.** Use the approved Codex in-app browser or
   another authorized capture surface. Capture every distinct screen and view
   at high resolution. Repeat the capture at every supported breakpoint,
   theme, and meaningful state. Capture key flows as ordered image sequences
   or short recordings so motion, timing, and gesture behavior remain visible.
   Give every artifact a stable capture ID and add it to the evidence ledger.

5. **Measure the rendered system.** Use computed styles, DOM geometry,
   responsive resize probes, browser accessibility inspection, and pixel
   measurement where available. Record exact values and units. Label each fact
   `MEASURED`, `OBSERVED`, `INFERRED`, `UNKNOWN`, or `UNREACHABLE`. Never write
   `looks like`, `approximately`, or `standard` for a value that the report
   calls exact.

6. **Extract the inventory.** Record the page map, navigation, foundations,
   components, layout architecture, interaction and motion patterns,
   accessibility notes, tech-stack clues, inconsistencies, and evidence links.
   Use stable IDs such as `TOK-COLOR-001`, `CMP-BUTTON-001`, `LAY-GRID-001`,
   `INT-MODAL-001`, and `CAP-DESKTOP-HOME-DEFAULT-001` so the Alpha can trace
   each decision back to a source observation.

7. **Map observations to approved building blocks.** For every component,
   map the observed pattern to an approved library block or mark it
   `NO-FIT`. Record the library, block name, source revision, license,
   adoption level, adapter owner, state and variant coverage, and protected
   product-owned behavior. Keep domain state, routing, permissions,
   persistence, provider behavior, data cadence, and semantics with the Alpha.

8. **Build the PL0 decision record.** Separate observed benchmark facts from
   Alpha decisions. List the accepted token values, component anatomy and
   IDs, variants, states, responsive rules, layout templates, interaction
   behavior, motion rules, approved-library mappings, intentional divergences,
   exclusions, open questions, and proof gates. Set PL0 to `ACCEPTED` only
   after the user accepts the final direction. Do not self-accept PL0.

9. **Run the readiness gate.** Run the bundled validator against the report
   root. A report passes only when every required file exists, every claim has
   evidence or an explicit status, the navigation map contains Mermaid, the
   state matrix is complete, the approved-library map is present, and PL0 has
   an explicit status. The prototype gate requires the validator's
   `--require-accepted` mode.

## Evidence coverage

Capture and index all applicable items below. Mark a category `NOT APPLICABLE`
only with a reason.

- Screens and views: home, auth, onboarding, primary workflows, settings,
  account, admin, detail, search, notifications, help, and error routes.
- Breakpoints: mobile, tablet, desktop, and every custom layout threshold where
  the rendered composition changes.
- Themes: light, dark, high contrast, branded, system, and any other supported
  mode.
- States: default, hover, active or pressed, focus, disabled, loading,
  skeleton, empty, error, success, open or expanded, modal, drawer, sheet,
  overlay, validation, offline, and permission-denied.
- Flows: navigation, form submission, search, filtering, sorting, drag or
  resize, menus, dialogs, media controls, gestures, keyboard paths, and any
  flow whose transition changes the design system.

Do not claim state coverage from an unclicked screenshot. Add the action that
reached the state and the capture ID that proves it.

## Required handoff package

Write the package to a stable directory such as
`docs/interface-inventory/<benchmark-slug>/`:

```text
INTERFACE_INVENTORY.md       # scope, evidence index, page map, findings
NAVIGATION_MAP.md            # Mermaid navigation and semantic page map
DESIGN_TOKENS.md             # measured foundations and usage frequency
COMPONENT_INVENTORY.md       # anatomy, variants, states, behavior, mapping
LAYOUT_ARCHITECTURE.md       # grids, containers, layers, scroll, templates
INTERACTION_PATTERNS.md      # state matrix, motion, gestures, accessibility
PL0_ACCEPTANCE.md            # accepted Alpha contract and explicit exclusions
EVIDENCE_LEDGER.ndjson       # one JSON record per capture or flow artifact
board/WONDER_BOARD.md        # Wonder canvas receipt and category map
evidence/screens/             # high-resolution screenshots
evidence/flows/               # sequences or short recordings
tokens/                       # optional DTCG, Tailwind, or shadcn output
```

Read [report-contract.md](references/report-contract.md) before synthesis. It
defines the required fields for each file and the minimum evidence schema.

## Approved-library rule

The report can describe what the benchmark uses, but the Alpha mapping can use
only the current internal Approved UI Libraries list. Record benchmark clues
as `REFERENCE_ONLY` when they are outside that list. Do not turn a screenshot,
icon, CSS fragment, or copied source file into an Alpha dependency.

For each mapped component, include:

| Field | Required meaning |
| --- | --- |
| Observed ID | Stable component and capture IDs from the live evidence |
| Alpha decision | `ADOPT`, `ADAPT`, `NO-FIT`, `DEFER`, or `REJECT` |
| Approved source | Library and exact block or component name |
| Provenance | URL or registry path, revision, license, and access state |
| Ownership | Library-owned presentation and Alpha-owned state/semantics |
| Coverage | Variants, themes, breakpoints, states, keyboard, touch, and motion |
| Exception | Reason, owner, maintenance cost, fallback, and PL0 approval if custom |

## PL0 lock

`PL0_ACCEPTANCE.md` is the only source that unlocks prototype work. It must
contain:

- `Status: DRAFT`, `READY_FOR_REVIEW`, `ACCEPTED`, or `BLOCKED`.
- Benchmark scope, target Alpha, user, desired outcome, success signal, and
  explicit exclusions.
- The accepted token IDs and values.
- The accepted component IDs, anatomy, variants, and complete state coverage.
- The accepted layout IDs, container rules, breakpoint rules, layers, and page
  templates.
- The accepted interaction, motion, accessibility, and responsive rules.
- The accepted approved-library map and every no-fit exception.
- Intentional differences from the benchmark, unresolved questions, owner,
  acceptance date, revision, and proof requirements.

If any accepted value changes, increment the PL0 revision, rerun the report
validator, and treat the prototype as blocked until the new revision is
accepted.

## Hard stops

Stop with `BLOCKED` when any of these conditions applies:

- The benchmark or route scope is unclear.
- The live rendered source is unavailable or the capture is unauthorized.
- A required breakpoint, theme, state, or key flow is untested.
- A value is presented as exact without measurement.
- A component has no anatomy, state matrix, responsive rule, or evidence link.
- The approved-library source, version, license, or registry access is unknown.
- The report relies on Figma or marketing screenshots as primary evidence.
- A protected asset, code path, brand mark, or private data would be copied.
- The report is complete but PL0 has no explicit user acceptance.
- The required Wonder evidence board is missing or inaccessible. Mark the
  report `BLOCKED` instead of treating a local screenshot folder as a Wonder
  receipt.
- Someone asks for a prototype before this report passes and PL0 is `ACCEPTED`.

Never fill a missing observation with a generic design default. Record the gap,
name the next capture or decision, and keep the prototype gate closed.
