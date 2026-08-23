---
name: solvys-flowmap
description: Create or update connected Langflow architecture and sprint-control canvases for Solvys projects. Use when a project needs a technical system map, a plain-English product tree, a live backend sprint map, dependency visibility, or a visual execution lane that proves what is working, broken, unbuilt, or awaiting audit.
---

# Solvys Flow Map

Build a visual operating map. Keep repository, provider, and deployment truth in their owning systems. Use Langflow as the visual control plane and evidence surface.

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
choosing how to render the map: YAGNI, existing repo seam, standard library or
native platform, already-installed dependency, maintained OSS with lower
ownership cost, one line, then the minimum custom code. Reuse the established
Langflow control plane before building a custom renderer.

## Plan gate

Use this skill for every plan that proposes or changes a Langflow canvas. A plan is incomplete until it defines:

1. the project or canvas owner;
2. the shared three-zone layout;
3. the node-card contract below;
4. one specification Text node;
5. service links and human-action links;
6. evidence, validation, and acceptance gates; and
7. the return path for missing facts or user decisions.

Apply the same layout and formatting contract to every canvas in a multi-project set. Do not start node construction from a plan that omits this gate.

## Mandatory node-card contract

Every Langflow node card and note card uses bullet-point text only.

- Give every component, module, feature, dependency, task, and evidence node a
  visible technical title. Use the real system term, such as `Discovery
  Worker`, `Worker Relay`, `Process API`, `D1 State Store`, `R2 Artifact Store`,
  `Job Queue`, or `Drive Export Adapter`.
- Keep titles outside the bullet body. A title does not count toward the
  five-word bullet limit.
- Use plain, non-technical language inside every bullet. The title names the
  machine part. The bullets explain what people get, what works, what fails,
  what is needed, and what happens next.
- Do not put paragraphs inside cards.
- Add one purpose bullet for each purpose.
- Keep every purpose bullet to five words or fewer.
- Keep status, task, dependency, and boundary bullets to five words or fewer when present.
- Add a separate bullet for each exact service or subproduct link.
- Link to the used service or subproduct location.
- Use the service name as the link text.
- Add a final separate bullet only for a true human action.
- Link that final bullet directly to the human action.
- Omit the final bullet when no human action exists.
- Keep credentials, tokens, cookies, private data, and secrets off-canvas.

Use one dedicated specification Text node for the plan document. This is the only long-form exception. It may contain paragraphs and must cover only the user journey objective and the problem the app is intended to solve. Do not use this exception for service, task, status, dependency, or evidence nodes.

Use this bullet order inside each card:

1. purpose bullets;
2. compact state, task, dependency, or boundary bullets;
3. exact service or subproduct link bullets; and
4. the optional human-action link as the final bullet.

Treat a card that breaks this contract as invalid. Repair the card before saving, sharing, or accepting the canvas.

## Mandatory module topology

Build every canvas as connected system topology. Do not use a flat grid of
status cards.

1. Break the product into small module groups. Keep each group to two through
   five nodes when the evidence supports that split.
2. Give each module its real technical title. Keep the bullet body plain.
3. Connect modules in the direction that data, work, state, artifacts, or
   receipts move.
4. End each module group at one client-facing objective or feature node. Name
   that feature in plain product language, such as `Estate Tracking`,
   `Document Prep`, `Market Briefing`, `Desk Answers`, `Deal Review`, or
   `Operator Handoff`.
5. Connect each feature node to its proof, missing-work, or acceptance lane.
6. Keep unrelated branches separate. A connector must represent a real
   dependency or flow. Do not add decorative connectors.
7. Use short semantic edge labels, such as `estate`, `job`, `event`, `state`,
   `artifact`, `receipt`, `brief`, `answer`, or `approval`.

The canvas must explain three things at fit view: which modules exist, which
client feature each module group serves, and where the path stops or fails.
Branch view must expose the plain-English bullets and exact links without
crossings or crowding.

## Mandatory macro and micro views

Every canvas must work at two zoom levels.

1. At fit view, show the product, client-facing features, major module groups,
   external owners, health colors, and the point where each branch stops.
2. At branch view, show the small technical modules that carry the request,
   state, job, artifact, export, or receipt. Keep each connected micro group to
   two through five nodes. Split a larger path into another named group.
3. Connect each external owner to the internal adapter or process that uses it.
   Connect that process to its state or artifact owner. End the group at the
   client-facing objective or feature it supports.
4. Keep frontend, backend, worker, container, database, queue, artifact store,
   provider, and client-feature ownership visible. Do not collapse a provider
   estate into one general card when the provider owns several distinct
   resources.
5. Use a separate node for each deployed application, worker, container image,
   database role, queue, object store, external API, and architecture-owning
   SDK. Group ordinary direct code libraries by purpose and link that group to
   a complete direct-dependency inventory.
6. Do not add a deployed provider node from a package name alone. When source
   proves an installed SDK but no live resource, mark the node as installed,
   required, or audit-pending according to the available evidence.

At fit view a developer and a non-technical operator must both be able to answer:

- what goes to Supabase;
- what runs on Fly;
- what runs inside Docker;
- what runs on Cloudflare;
- what runs on another external service; and
- which client feature each resource supports.

## External service link contract

Every external service node uses the normal card order and may include these
short link bullets after its state and boundary bullets:

1. the exact deployed resource, project, application, bucket, worker, database,
   or provider console location when verified;
2. the official documentation for the exact configured feature;
3. the billing or usage page when the service can create client cost; and
4. the API key, token, webhook, application, or account-management page when
   that control is operationally relevant.

Use short service names as link text. Do not use a generic company homepage.
Do not put credentials, secret-bearing URLs, account identifiers that expose
private data, or copied provider content on the canvas. If an exact authenticated
resource link cannot be verified, add an uncolored audit node and link only to
the verified official documentation. A management link is not a human-action
link by itself. Add the final human-action link only when a real person must
complete a key, token, consent, billing, setup, approval, or provider action.

## Start with evidence

1. Read the project specification, current sprint, source inventory, latest receipt, and user-testing record.
2. Identify the active frontend route, canonical backend process, deployed resources, duplicate paths, and missing contracts.
3. Do not infer a provider from a bundle. Add a dependency only when source or provider evidence proves it. Add an audit node when evidence is incomplete.
4. Never place credentials, cookies, raw client documents, raw client data, sessions, or secret values on a canvas.

## Build three separate maps on one canvas

Use the same spacious layout on every canvas:

- Top-left: one specification Text node.
- Upper-right: technical architecture map.
- Middle band: plain-English product tree.
- Lower band: sprint and dependency map.
- Separate corner: status and acceptance legend.

Keep the three map areas visually separate. Use native Langflow nodes and directional edges. Keep edge labels short and semantic. Keep crossings and crowding out of the fit view and branch views. Notes may clarify a branch only when they use the same bullet-only card contract. A note must not replace a component or an edge.

### 1. Technical architecture map

Show the current route and the target process as visible data and state flow. Include:

- small connected module groups with technical titles;
- one visible client-facing feature endpoint for each group;
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

Connect each product-tree branch to the technical module group that enables it.
Do not leave the product tree as disconnected notes.

### 3. Backend sprint and dependency map

Turn the repair into dependency-ordered sprint tasks. Use plain-English task cards. Put the verified service/tool layer beside the tasks. Link every service to its permitted role and evidence: process owner, storage owner, deployment target, source/render adapter, research routing, or read-only provider audit.

Bundles are controlled tools. Give every bundle node an explicit resource, action boundary, and proof gate. Do not use a bundle as evidence that a service exists. Keep tracker writes, deployment, billing, destructive changes, and external sends behind their separate authority gates.

## Status colors and live architecture progress

The canvas is a visual record of the architecture as it changes. Put progress on
the affected architecture card. Do not create sprint, track, or status cards to
repeat a connector change.

- **Purple:** a frontend surface or frontend deployment boundary.
- **Green:** a connection is saved, read back, verified, and attached to the
  approved relay-backed path.
- **Burnt orange:** a connection, dependency, or module is still missing or
  disconnected.
- **Red:** a path is broken or needs critical attention. Use red for failures
  such as a production error, a failed authorization, or a route that returns
  an error.
- **Yellow:** a path needs review, a human decision, provider consent, or
  another attention gate before work can continue.

Use the node background or header when Langflow supports it. Prefer a small,
narrow colored top tab or card edge over a large colored panel. If the card
cannot show a small marker, use a restrained card background or border. Do not
color an entire unrelated branch to imply work that did not occur.

After every material connector change, update the affected card's existing
bullets in the normal card order: purpose, exact saved connection or removed
connection, current dependency or failure, then service links and any real human
action. Keep the change readable in the card; links remain last. A green mark
requires saved-canvas readback. A red, orange, or yellow mark must name the
actual failure, missing dependency, or attention gate in a compact bullet.

Only the Factory Executive Ops acceptance lane may mark a journey accepted or
complete. Keep acceptance separate from card health and progress colors.

## Sprint lanes

Represent a live sprint as a small isolated lane. The lane must include objective, input evidence, task sequence, protected zones, proof gates, current status, next safe action, and return to orchestrator acceptance. Do not run or claim a sprint from a canvas node without its linked specification and Development Contract.

## Validate before handoff

1. Reopen the exact canvas in Langflow after saving. Do not trust API readback alone.
2. Confirm every branch has visible directional edges and readable spacing at fit view and branch view.
3. Confirm every frontend and backend node has a visible technical title and a
   plain-English bullet body.
4. Confirm every module group connects to a client-facing objective or feature.
5. Confirm no flat card grids, starter fixtures, stale nodes, dead labels, or secret-bearing content remain.
6. Confirm every green, red, and burnt-orange state has a cited reason.
7. Keep a non-secret migration manifest when the canvas will move between devices. Move it only on the owner’s cue.

Report the active map, confirmed facts, audit-pending resources, missing work, and the next safe action. Do not declare product completion from a map.
