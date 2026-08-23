# Component catalog

## Selection table

| Component | Purpose | Product-owned inputs | Included presets |
|---|---|---|---|
| `StateGate` | Loading, empty, error, permission, and ready boundaries | Copy, retry action, permission behavior, children | foundation, interview, architecture, all |
| `DecisionCard` | Expandable Stack Interview choice | Decision ID, copy, selection, details, source status | interview, all |
| `OutputsSourcesRail` | Ordered progress and selected-stack summary | Step order, completion, source labels, current step | interview, all |
| `WorkbenchDrawer` | Wide overlay workbench with controls and notes | Open state, control bar, content, note persistence | interview, all |
| `ControlInventory` | Direct record of which control does what | Control IDs, routes, actions, feature and proof status | foundation, architecture, all |
| `ArchitectureMap` | Interactive node map with working, warning, and blocked states | Nodes, edges, selection handler, engine/chassis metaphor | architecture, all |
| `TanStackChartPanel` | Typed, accessible bar-chart adapter with loading, empty, ready, and error states | Rows, labels, state, focus/select handlers, chart copy | charting, all |

## Source model

The kit provides Solvys-owned assemblies. Approved libraries can supply the lower-level control or motion body through a project adapter. They do not inherit product data, permissions, routing, provider state, or visual identity.

The charting boundary is explicit. EvilCharts remains the design-first chart block source. TanStack Charts provides the installed typed chart grammar and React host when a project needs a product-owned definition or a lighter chart surface. A project selects one chart body per surface and records the choice in its adoption contract.

`ArchitectureMap` uses a small stable node-and-edge contract. A project can map that contract to React Flow when the project already owns that dependency and needs zoom, pan, minimaps, or large-graph layout. The bundled renderer remains useful for small maps and keeps the default preset dependency-free beyond React.

## Styling model

The CSS defines structure, focus visibility, status semantics, and restrained state transitions. Projects set the exposed `--solvys-kit-*` variables in their own theme adapter. The kit has no fixed palette, font, gradient, glow, shadow, blur, logo, or invented brand asset.

## Proof minimum

For every loaded component, record:

- Source kit version and component IDs.
- Target repository, commit, and destination path.
- Project token adapter and approved library adapter.
- Protected product state and data seams.
- Desktop and mobile routes.
- Keyboard, focus, reduced-motion, empty, error, permission, and success proof.
- ChatGPT Site interaction receipt and human-review result.
