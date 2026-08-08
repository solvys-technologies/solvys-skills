---
name: solvys-build-kit
description: Load the approved Solvys React assembly kit, component contracts, source manifest, and installation receipt into a product repository. Use for greenfield frontends, Stack Interview surfaces, Outputs and Sources rails, Architecture Canvas node maps, control inventories, state boundaries, Factory workbenches, or replacement of static design-kit handoffs with runnable source.
---

# Solvys Build Kit

Load reusable source assemblies without turning the kit into a product identity. The kit owns accessible interaction shells and record shapes. The project owns data, permissions, routes, copy, palette, typography, provider state, and acceptance.

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

## Presets

- `foundation`: state boundaries and the control inventory.
- `interview`: expandable decision cards, Outputs and Sources rail, workbench drawer, and state boundaries.
- `architecture`: status node map, control inventory, and state boundaries.
- `all`: every current assembly.

Read [component-catalog.md](references/component-catalog.md) before selecting a preset. Read [adoption-contract.md](references/adoption-contract.md) before replacing an existing project component or loading the kit into a mature repository.

## Boundaries

- Use one component owner for each concern.
- Keep content visible by default. Motion can clarify state changes but cannot gate content.
- Keep the kit source-copied and project-owned after load. Do not add a runtime dependency on this repository.
- Do not auto-edit `package.json`, install packages, choose visual identity, or create product data.
- Do not call a dry load, copied source, local preview, or passing typecheck accepted UI proof.
- A no-fit exception must name the searched source, reason, owner, maintenance cost, protected zones, and proof gate.

## Validation

Run both checks after changing the kit:

```bash
python3 scripts/validate_build_kit.py
python3 "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" .
```

The suite installer links this skill into Codex, shared-agent, and Claude-compatible skill roots automatically.
