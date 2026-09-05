# Frontend and Wonder.design rule

## Required source of truth

Every frontend has one human-editable source of truth on the project's Wonder
canvas. The codebase and the named Wonder file, branch, page, and artboards
must remain 1:1 compatible. Wonder is the human visual-editing authority.
Repository source remains the implementation authority. The project ChatGPT
Site remains the runnable test and acceptance surface.

## Rules

1. Do not invent a parallel UI, page, component library, or layout. Copy the
   named Wonder frame. A greenfield **shell** is allowed when the current
   chrome is the wrong IA (Goalpost Code: leftover Circle/C-Cab map vs `wush`
   Greenfield, Goalpost v2.3). Still do not invent chrome the lock does not
   show. Every **tab surface** still maps 1:1 to a Wonder frame.
2. Work only with the existing frontend that is already imported into Wonder or
   is ready for a recorded Wonder import.
3. Before a frontend change, locate the existing Wonder-compatible source and
   record its file, branch, page, artboard, source commit, and import map.
4. Make the smallest code change that preserves the Wonder import path,
   component hierarchy, tokens, and file layout. Prefer files already known by
   Wonder. Never create parallel `v2`, `new-frontend`, `updated-ui`, or
   agent-generated versions.
5. If no Wonder-imported copy exists, create or import the editable canvas
   source first. Do not write new UI code until that source and its mapping are
   recorded. A human-owned canvas remains protected.
6. Keep output Wonder-compatible: clean React and Tailwind where the project
   supports them, literal class names, flex-based layout, explicit component
   structure, and no opaque generated output.
7. Use approved OSS packages and UI blocks through the Factory building-block
   process. They may supply primitives. They do not replace the Wonder mapping,
   product state, permissions, routing, persistence, or domain ownership.

## Required receipt

Every frontend task records the Wonder source identity, source-to-Wonder map,
code commit, changed controls and states, import compatibility result, and the
separate ChatGPT Site test result. Use `MATCHED`, `DIVERGED`, or `BLOCKED`.
`BLOCKED` prevents new UI implementation and must name the next human or
technical action.
