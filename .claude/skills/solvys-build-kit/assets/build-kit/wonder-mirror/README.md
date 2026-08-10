# Solvys Build Kit / Wonder mirror handoff

This handoff describes the isolated Wonder surface that is ready to create from the canonical Pen canvas.

- Canonical design file: `../solvys-build-kit.pen`
- Local visual review: `../solvys-build-kit-review.html`
- Full promoted catalog: 515 items
- Auto-updating sources: BeUI Pro (141), BeUI (103), and EvilCharts (271)
- Pinned chart source: `@tanstack/charts@0.9.0`

The current Wonder account is signed in and shows the existing Solvys, Fintheon, CRED Cowork, and HeirRight files. This handoff leaves those files untouched. The session lacks the native Wonder MCP connector, so it cannot create or mutate a Wonder file safely through the browser. Once that connector is enabled, create a new isolated file owned by this Build Kit and import the Pen canvas named `Solvys Build Kit | Design System`.

The repository updater remains the update authority. Each successful BeUI, BeUI Pro, or EvilCharts promotion must refresh the source catalogs, the Pen catalog, the HTML review artifact, and this handoff manifest before the Wonder mirror is refreshed.
