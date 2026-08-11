---
name: solvys-flowmap
description: Create or update connected Langflow architecture and sprint-control canvases for Solvys projects. Use when a project needs a technical system map, a plain-English product tree, a live backend sprint map, dependency visibility, or a visual execution lane that proves what is working, broken, unbuilt, or awaiting audit.
---

# Solvys Flow Map

Build a visual operating map. Keep repository, provider, and deployment truth in their owning systems. Use Langflow as the visual control plane and evidence surface.

## Start with evidence

1. Read the project specification, current sprint, source inventory, latest receipt, and user-testing record.
2. Identify the active frontend route, canonical backend process, deployed resources, duplicate paths, and missing contracts.
3. Do not infer a provider from a bundle. Add a dependency only when source or provider evidence proves it. Add an audit node when evidence is incomplete.
4. Never place credentials, cookies, raw client documents, raw client data, sessions, or secret values on a canvas.

## Build three separate maps on one canvas

Place the maps in distinct, spacious areas. Use native Langflow nodes and directional edges. A note may explain a branch. A note must not replace a component or an edge.

### 1. Technical architecture map

Show the current route and the target process as visible data and state flow. Include:

- frontend, API, process owner, data stores, jobs, artifact storage, export, providers, and duplicate paths;
- edge labels that say what moves between nodes, such as estate ID, immutable file reference, event, job lease, artifact reference, or export receipt;
- disabled, missing, and legacy paths; and
- the repair path from specification through integration, user testing, and orchestrator acceptance.

### 2. Plain-English product tree

Place the app at the center. Branch to customer-facing capabilities with plain language. Use names such as Estate Tracking, Document Collection, Discovery Doc Prep Engine, Closing Doc Prep Engine, Document Storage, Status Updates, Review and Export, Front End, Legacy Front End, Retired Features, Retired Tabs, and Quality Checks.

Each branch must say:

- what staff or clients get;
- its current status;
- its next concrete task; and
- the capability it depends on.

### 3. Backend sprint and dependency map

Turn the repair into dependency-ordered sprint tasks. Use plain-English task cards. Put the verified service/tool layer beside the tasks. Link every service to its permitted role and evidence: process owner, storage owner, deployment target, source/render adapter, research routing, or read-only provider audit.

Bundles are controlled tools. Give every bundle node an explicit resource, action boundary, and proof gate. Do not use a bundle as evidence that a service exists. Keep tracker writes, deployment, billing, destructive changes, and external sends behind their separate authority gates.

## Status colors

Put this legend on every canvas:

- **Pale green:** independently source-proven implementation exists. This does not mean accepted or complete.
- **Burnt red:** an implemented path is broken, disconnected, duplicate, failing, or disabled.
- **Burnt orange:** a required capability or contract is not yet built.
- **Amber:** a named runtime or provider resource exists in evidence but needs live readback.

Only the Factory Executive Ops acceptance lane may mark a journey accepted or complete. Keep that state separate from node color.

## Sprint lanes

Represent a live sprint as a small isolated lane. The lane must include objective, input evidence, task sequence, protected zones, proof gates, current status, next safe action, and return to orchestrator acceptance. Do not run or claim a sprint from a canvas node without its linked specification and Development Contract.

## Validate before handoff

1. Reopen the exact canvas in Langflow after saving. Do not trust API readback alone.
2. Confirm every branch has visible directional edges and readable spacing at fit view and branch view.
3. Confirm no starter fixtures, stale nodes, dead labels, or secret-bearing content remain.
4. Confirm every green, red, orange, and amber state has a cited reason.
5. Keep a non-secret migration manifest when the canvas will move between devices. Move it only on the owner’s cue.

Report the active map, confirmed facts, audit-pending resources, missing work, and the next safe action. Do not declare product completion from a map.
