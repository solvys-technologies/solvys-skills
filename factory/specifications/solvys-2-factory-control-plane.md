# Solvys-2 Factory control plane

Status: implementation-ready specification, product operations paused pending TP cue

## Outcome

Solvys-2 becomes the visual operating map for Stack Interview decisions, project Cabinets, backend architecture, provider resources, frontend controls, Sprint Units, proof, and handoffs.

## Product surfaces

### Stack Interview

- Capture fluid defaults and dynamic exceptions.
- Capture numeric performance, security, hosting, integrations, cost, and exit requirements.
- Export accepted decisions to the Cabinet, PRD, Architecture Canvas, provider manifest, sprint plan, Outputs & Sources, and control inventory.
- Use a decision-complete adaptive interview, with 21 mandatory questions when 21 material decisions exist.

### Widget rail

- Open over the interview at 80 percent desktop width and full mobile width.
- Provide Linear-style top controls, versioned autosave, publish, discard, attachment, provenance, and custom notes.
- Support React Flow maps, rich documents, shader headers, images, provider tables, performance receipts, control inventories, incident maps, and deployment receipts.
- Use approved UI Building Blocks and OSS foundations before custom components.

### Architecture Canvas

Represent routes, screens, controls, states, API handlers, auth checks, permissions, queues, jobs, retries, databases, tables, buckets, provider projects, domains, deployments, tests, receipts, docs, issues, and owners.

Use independent node rungs: `planned`, `approved`, `installed`, `configured`, `wired`, `tested`, `provider-verified`, `deployed`, `human-accepted`, `failed`, and `stale`.

Green means the node reached the sprint's declared rung. Red names the earliest missing or failed dependency.

### Control inventory

Map each control from Wonder and ChatGPT Site through client event, API, backend handler, permission, provider resource, state change, feedback, failure states, Linear issue, documentation, owner, and proof.

## Minimum data contracts

- `project-manifest.yaml`
- `source-registry.yaml`
- `provider-resource-manifest.yaml`
- `architecture-canvas.json`
- `control-inventory.json`
- `factory-widget.v1.json`
- `entrance-receipt.json`
- `sprint-unit.json`
- `work-window.json`
- `daily-sitrep.json`
- `infraction-ledger.json`
- `comrade-care-request.json`
- `custody-receipt.json`

## Minimum API

- `GET /api/factory/projects/:projectId`
- `PATCH /api/factory/projects/:projectId/interview`
- `POST /api/factory/projects/:projectId/widgets`
- `POST /api/factory/projects/:projectId/sprint-units`
- `POST /api/factory/projects/:projectId/work-windows`
- `POST /api/factory/projects/:projectId/sitreps`
- `PATCH /api/factory/projects/:projectId/nodes/:nodeId`
- `POST /api/factory/projects/:projectId/handoffs/ack`
- `POST /api/factory/projects/:projectId/custody/receipts`
- `GET /api/factory/projects/:projectId/events`

## Acceptance

- A test result can update only the test rung.
- Provider verification requires authenticated provider evidence.
- Controls show the full backend and provider reaction chain.
- Broken relationships become red nodes with an owner and issue.
- Cabinet exports are versioned and reproducible.
- Wonder remains the frontend proposal authority.
- The project ChatGPT Site remains the runnable feature and human-review surface.
- Linear remains the issue authority until the OpenProject migration gate passes.
- Mintlify remains the publication layer.
