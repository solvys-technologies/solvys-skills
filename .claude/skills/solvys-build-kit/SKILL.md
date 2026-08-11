---
name: solvys-build-kit
description: Load the approved Solvys React assembly kit, component contracts, source manifest, and installation receipt into a product repository. Use for greenfield frontends, Stack Interview surfaces, Outputs and Sources rails, Architecture Canvas node maps, control inventories, state boundaries, Factory workbenches, or replacement of static design-kit handoffs with runnable source.
---

# Solvys Build Kit

Load reusable source assemblies without turning the kit into a product identity. The kit owns accessible interaction shells, record shapes, chart contracts, and the canonical Pen.dev library file. The project owns data, permissions, routes, copy, palette, typography, provider state, and acceptance.

## Load sequence

1. Read the project `WELCOME.md`, active Interface Inventory, accepted PL0 record, `Design.md`, and current component source.
2. Inspect the repository for an existing owner. Reuse a proven project component before loading a duplicate.
3. Verify the approved source hierarchy in the suite `Design.md`. Record BeUI Pro or BeUI, Motionary.dev or ascertainty UI, and Bklit or EvilCharts as installed, planned, or not applicable.
4. List available presets:

   ```bash
   python3 scripts/load_build_kit.py --list
   ```

5. Run a dry load against the exact project:

   ```bash
   python3 scripts/load_build_kit.py --target /absolute/project --preset interview --dry-run
   ```

6. Load the accepted preset. The loader fails on collisions. Use `--replace` only when the current kit directory is owned by this project and a recoverable backup is appropriate.
7. Bind product-owned data and handlers. Do not put provider calls, secrets, permissions, routing, or persistence inside kit components.
8. Apply project tokens and approved library bodies through local adapters. Preserve every source revision and license in the project source registry.
9. Test every control, state, viewport, keyboard path, and reduced-motion path in the project ChatGPT Site. Record the receipt in the Cabinet.

## Upstream sync

The approved upstream set lives in `assets/build-kit/library-sources.json`. The asset package carries the installed runtime dependencies and complete source snapshots for BeUI, BeUI Pro, and EvilCharts in separate library folders. TanStack Charts is installed at the pinned version recorded in the manifest. Automatic discovery and promotion are disabled; a new snapshot requires an explicit install command.

Refresh the installed source layer with:

```bash
python3 scripts/install_library_sources.py --apply --full
```

The installer records catalog receipts under `assets/build-kit/installed-registries/` and copies every shipped registry item and source file under `assets/build-kit/installed-libraries/{beui,beui-pro,evilcharts}/`. It also writes `installed-registries/{beui,beui-pro}/app-blocks.json`, a source-faithful app-only registry. The complete upstream catalogs remain available for provenance; product app assembly uses the app-only registry and does not pull marketing/site sections. It reads `BEUI_PRO_TOKEN` only from the current process, so the private catalog can be fetched from the Paste-held credential bridge locally or from the workflow secret in CI. It never writes the token to a file, source snapshot, receipt, lockfile, or log. Bakai Lab and the X post remain visual references. Grainient remains a commercial, license-gated asset source.

The sync and promotion scripts are retained as historical tooling, but they are disabled for this kit. Do not run them as an automatic update path.

The source install writes `assets/build-kit/installed-registries/install-receipt.json`.

The sync writes source revisions and candidate catalogs under `assets/build-kit/updates/`. It never changes product data, routes, permissions, tokens, or copy. A new upstream block enters the candidate catalog automatically when its source catalog is available. Breaking, uncertain, unlicensed, or identity-changing blocks remain quarantined until their contract is known.

Promote only validated additive records into the kit catalog:

```bash
python3 scripts/promote_build_kit.py --apply --strict
```

Promotion requires a source-scoped ID, explicit license, compatible Solvys contract, source path, and an unchanged existing revision. The workflow keeps changed or incomplete records in `assets/build-kit/updates/quarantine.json`.

## Presets

- `foundation`: state boundaries and the control inventory.
- `interview`: expandable decision cards, Outputs and Sources rail, workbench drawer, and state boundaries.
- `architecture`: status node map, control inventory, and state boundaries.
- `charting`: state boundaries and the TanStack Chart panel adapter.
- `all`: every current assembly.

Read [component-catalog.md](references/component-catalog.md) before selecting a preset. Read [adoption-contract.md](references/adoption-contract.md) before replacing an existing project component or loading the kit into a mature repository.

## Boundaries

- Use one component owner for each concern.
- Keep content visible by default. Motion can clarify state changes but cannot gate content.
- Keep the kit source-copied and project-owned after load. Do not add a runtime dependency on this repository.
- Do not let the product loader auto-edit a target project's `package.json`, choose visual identity, or create product data. The Build Kit's own asset package is intentionally installed and versioned here so the source layer can be tested before project adoption.
- Do not persist a private Paste credential. The scheduled job reads public default catalog URLs and the configured private catalog secret; it records `awaiting-source` when the private bridge is absent.
- Do not call a dry load, copied source, local preview, or passing typecheck accepted UI proof.
- A no-fit exception must name the searched source, reason, owner, maintenance cost, protected zones, and proof gate.

## Validation

Run both checks after changing the kit:

```bash
python3 scripts/validate_build_kit.py
python3 "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" .
```

The suite installer links this skill into Codex, shared-agent, and Claude-compatible skill roots automatically.
