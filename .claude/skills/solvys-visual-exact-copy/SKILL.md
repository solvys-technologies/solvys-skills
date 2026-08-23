---
name: solvys-visual-exact-copy
description: Create and verify a visual exact copy across a production application, its ChatGPT Site, and an editable Wonder canvas. Use when a user asks for a one-to-one, pixel-exact, production-parity, code-to-Wonder, Site-to-Wonder, or production-surface copy.
---

# Solvys Visual Exact Copy

Use this skill to create a **visual exact copy**. The production renderer, the
ChatGPT Site renderer, and the Wonder canvas must render the same approved
source revision with no visible pixel deviation.

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
building the replication: YAGNI, existing repo seam, standard library or native
platform, already-installed dependency, maintained OSS with lower ownership
cost, one line, then the minimum custom code. Copy the real source
implementation rather than recreating it from memory.

## Required source contract

1. Read the production repository at a named commit. Identify the actual entry
   view, imported components, tokens, fonts, assets, and route state.
2. Use real repository components as Wonder reuse units. Build each shared
   component once, retain its source path and commit provenance, and duplicate
   that unit for later instances. Do not recreate components from screenshots,
   DOM text, memory, or generic blocks.
3. Bind Wonder values to the source token system. Preserve source fonts, asset
   references, sizing, copy, icons, visible loading, empty, and error state,
   plus state-specific hierarchy.
4. Build the ChatGPT Site from the same production revision. Do not compare
   different commits, fixtures, viewport widths, feature flags, themes, locales,
   or authentication states.

## Parity gate

Before accepting any artboard, capture production, the Site, and Wonder at the
same route, state, and viewport. Compare all three for geometry, typography,
color, assets, copy, controls, visible data, focus or pressed state, and
responsive behavior.

- Mark the state `MATCHED` only when all three sources share the same revision
  and have no visible pixel deviation.
- Mark any source, state, asset, viewport, or visible difference `DIVERGED`.
- Mark unavailable source capture, inaccessible Site, unresolved live-data
  variance, or inaccessible Wonder canvas `BLOCKED`.
- Never publish, accept, or describe a `DIVERGED` or `BLOCKED` screen as a
  visual exact copy.

## Live-data rule

For time-varying production data, name and reproduce a stable observable state:
loading, empty, error, stale, or a frozen populated capture. Never invent a
static replacement. Record the source commit and the state inputs in the parity
receipt.

## Feedback loop

Treat every failed parity check as skill feedback. Record the source revision,
route, state, viewport, mismatch class, evidence, correction, and recheck
result. When a workflow gap caused the failure, update this skill before the
next parity run. Keep the failed case in the receipt until the corrected pass
proves `MATCHED`.

## Required receipt

Record the production commit and source files, Site version, Wonder file and
artboard, route, viewport, state inputs, three captures, diff result, feedback
record, and every remaining mismatch. Re-run the parity gate whenever the source
revision or a visible state changes.
