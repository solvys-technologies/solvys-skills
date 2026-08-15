# Solvys UI assembly and palette policy

TP set this policy on 2026-08-15 for all Solvys products and workspaces.

1. Agents assemble interfaces from the approved Solvys Build Kit. Agents do not invent generic UI components when an eligible approved block exists.
2. A custom component requires a recorded no-fit review and TP's explicit approval before implementation.
3. The default palette is black, gray, and white. Tonal grayscale steps supply hierarchy.
4. TP chooses product palettes and approves every exception. Agents do not introduce accent colors, gradients, or palettes.
5. Product code owns data, permissions, routes, copy, state, and domain behavior. Library blocks own their eligible interaction and accessibility foundations.
6. Public repositories store only source whose license allows redistribution. Private and restricted registry source stays in approved local custody unless its active license expressly permits the target repository and audience.

The canonical local package is `/Users/Shared/Solvys/build-kit`. Its `verification-receipt.json` and `manifest.json` define the accepted inventory and source hashes.
