# Solvys Universal Component Gallery

This gallery is the canonical planning target for Solvys websites and apps. It
starts from Fintheon's real component surface and expands with live bookmark
research only when the approved source is available.

## Source Status

- Fintheon component source: available at
  `/Users/tifos/Documents/Codebases/fintheon/frontend/components`.
- Fintheon tokens/fonts: available at `frontend/lib/theme.ts` and
  `frontend/lib/font-theme.ts`.
- Fintheon historical bookmark inventory: available at
  `fintheon/sprint-md/SOL-001-fintheon-bookmark-folder-inventory-2026-06-30.md`.
- Fresh bookmarks: must be pulled from live X Bookmarks through the approved
  Chrome extension/profile. Do not substitute local browser bookmark JSON or old
  exports.

## Gallery Sections

1. Foundations
2. Commands
3. Surfaces
4. Feeds
5. Chat and composer
6. Navigation
7. Forms and settings
8. Data visualization
9. Motion
10. Marketing and public pages

The detailed contract lives in
`.claude/skills/solvys-designer-planning/references/component-gallery-contract.md`.

## Visualization Standard

- Charts: Recharts, wrapped in Solvys/Fintheon chart tokens.
- Graphs: `@xyflow/react` for node-edge workflows, `d3-force` when matching
  existing Fintheon radial/force-map source.
- Controls: Fintheon primitives first; `@base-ui/react` for accessible headless
  controls in new gallery-only tooling.

