---
name: solvys-wonder
description: Recover authorized Wonder access, inspect live Wonder files, protect human-owned work, import direct source-capture application frames or approved UI libraries, and prepare an evidence-backed Wonder-to-ChatGPT-Site transfer. Use when a task names Wonder, a Wonder file or page, a built application to canvas, a live canvas inventory, a Wonder OAuth issue, a Build Kit import, or a faithful Site transfer.
---

# Solvys Wonder

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
importing source or building a transfer: YAGNI, existing repo seam, standard
library or native platform, already-installed dependency, maintained OSS with
lower ownership cost, one line, then the minimum custom code. Import the
approved library or existing canvas before creating custom elements.

## Invocation and agent-owned reauthentication

Treat every explicit `@wonder` plugin mention as an instruction to invoke this
skill before any other Wonder work. Start with native connector readback. If it
reports an expired, stale, or invalid refresh token, the agent owns one
authorized re-entry attempt in the approved browser lane. The attempt must
actively open Wonder, select the provider sign-in or reconnect action, and
trigger the provider approval prompt. Opening a Wonder URL alone does not count
as reauthentication. Do not ask the user to renew an MCP token or to provide a
token value. Keep the user involved only when the provider requires a live
approval, such as a Google Prompt, MFA, or a CAPTCHA. Verify the connector
readback after the browser flow before any canvas mutation.

Wonder is the protected human-editable frontend source of truth. The project
ChatGPT Site is the runnable review and acceptance surface. Repository source
is the implementation authority; provider consoles and CLIs own provider truth;
Linear owns issue truth. A Wonder canvas does not prove runtime behavior.
Never use a stale screenshot, local mockup, code export, or guessed canvas state
as live Wonder evidence.

## Enter with custody

Before any read that can lead to a write:

1. Complete the Solvys Factory entrance. Read the project `WELCOME.md` when it
   exists. If it does not exist, read the documented onboarding composite:
   `AGENTS.md`, `CLAUDE.md`, `README.md`, `SETUP.md`, `WORKSPACE.md`,
   `PRODUCT.md`, and `DESIGN.md` when present. Record that substitution in the
   entrance receipt; do not turn a missing literal file into a blocker. Read the
   assigned sign, manifest, active sprint, latest receipt, protected zones, and
   Paste references. If Paste MCP is used, keep the Paste app and MCP connection
   open through the task and handoff; never close it or terminate its sync
   process. Record an `entrance-receipt.json` before substantive work.
2. Confirm the target file, branch, page, artboard, current revision, account,
   and requested scope. Read the live target before changing it.
3. Confirm whether the task is read-only or authorizes a Wonder mutation. Keep
   human-owned frames and accepted baselines unchanged. Create an isolated,
   named agent-owned artboard only when the task authorizes a design mutation.
4. Use one active Wonder editor context per task. Do not start duplicate OAuth
   callbacks, MCP connections, or editor sessions. A second task must read the
   handoff and wait or use a separate, explicitly read-only target.
5. Keep Wonder, repository, ChatGPT Site, provider, deployed-product, and
   installed-app evidence as separate proof rungs.

For cross-task work, use the handoff path registered by the project manifest.
If no path is registered, create `handoffs/ACTIVE.json` in the project Cabinet,
record its pointer in the manifest, and mirror it in the repository's
`docs/operations/handoffs/` path when the task owns a repository. Include the
sprint/task ID, owner, repository and SHA, Cloud task or checkout, Wonder file,
branch, page and artboard IDs, source revision, proof rung, protected zones,
secret names only, next action, expiry, and evidence links. A chat message is
transport; the handoff record is durable state.

## Keep skill custody separate from product custody

The installed Solvys suite is the shared source of truth. A skill being absent
from the current callable list does not authorize copying its body into the
product repository. First inspect `/Users/tifos/.codex/skills`, the configured
agent skill roots, and the canonical C-Cab suite. Use an installed source or a
project-local symlink when the host requires a project path. Never create or
commit a second shared-skill mirror inside the product repo.

If a task already created untracked shared-skill copies, stop before design
work, record the clean starting status, and move only those task-owned copies
to a recoverable Factory receipt backup. Preserve pre-existing project-specific
skills and list every moved path. Do not hide the resulting diff or call the
repository clean until the ownership record and status readback agree.

## Restore Wonder access safely

Use the native Wonder connector first. Before saying it is unavailable, query
the active and deferred tool inventory for a Wonder connector. The
`solvys-wonder` skill and the native Wonder connector are separate things: a
missing connector does not mean the skill is missing, and a reachable URL does
not prove an authenticated connector. If no connector is available, a
browser-only visual check may continue when authorized, but authenticated
connector readback and all Wonder mutations remain `BLOCKED`.
When no browser is named, use the Codex in-app browser. Use Chrome only when
the user explicitly selects or authorizes it. Never substitute direct HTTP,
guessed OAuth calls, a local mock, or a screenshot for the connector's live
readback.

If the connector reports an unauthenticated, stale, or unavailable session:

1. Use the `control-chrome` skill only when the user explicitly selects Chrome
   or gives task-specific authorization for the Wonder OAuth flow. Follow that
   skill's browser-selection and Node-backed control rules; do not invent a
   named-session API or switch browser families silently.
2. When Google Sign-In requires a project password, open Paste and search for
   the exact project name. Select the project folder from the search suggestion,
   open it, and use the matching item titled `Primary Project Password` or
   `Secondary Project Password`. Do not search for guessed labels such as
   `CRED Gmail Password`. Copy the password only into regular Chrome. Do not
   enter it in Chrome Dev or ask TP to type it. Open `https://app.wonder.so/` or
   the exact task-owned file/page URL in regular Chrome and select **Continue
   with Google**.
3. Verify the visible account before granting access. For the Solvys development
   lane, `sam@solvys.io` is valid only when the project manifest or current user
   instruction authorizes it. Select **Continue** on Google's confirmation step,
   then select **Allow access** on Wonder's consent screen.
4. After Google authentication completes, use the same regular Chrome session or
   hand it to the authorized Chrome development profile when the Wonder editor
   requires that profile. If Google asks for a device approval, MFA code,
   password, CAPTCHA, or policy decision, prefer SMS/text verification when it is
   offered; otherwise trigger Google's **Tap Yes** or **Tap the number** prompt.
   Leave the exact page open and ask the user only to complete or provide the
   required live approval. Do not bypass the challenge, request a password, or
   claim that authentication succeeded before visual and connector proof.
5. Do not save OAuth refresh tokens, browser cookies, MFA codes, or session
   secrets in Paste. Search an approved Paste item for an already-authorized
   project credential when required, use its title and ID in records, and never
   echo its value in a receipt, source file, terminal output, or response.
6. After consent, return to the exact Wonder file, branch, and page. Keep that
   canvas open and focused until the connector reports an active editor/page
   context. Verify the signed-in identity, file metadata, current artboard, and
   live readback through the native connector.

If the account, file, page, or revision does not match the task, stop and record
the mismatch. Close only temporary tabs created by this task. This cleanup rule
never applies to Paste: if Paste MCP was used, keep the Paste app and MCP
connection open so TP's iCloud sync remains available. Preserve the user's
existing tabs and keep the authenticated canvas open when it is the connector's
required context.

Do not loop on the same stale `401` or invalid-refresh result. Record the
connector state once, inspect the approved browser path, and perform one
authorized re-entry attempt. If the connector is still absent or the consent
screen is not available, return the exact gate and continue only with source
visible inventory work. Never ask another session to send a raw Wonder token;
use the registered handoff record and non-secret file, page, branch, and
revision identifiers instead.

## Inventory the live canvas

Use `solvys-kirby` for the Interface Inventory contract. Freeze the benchmark,
role, route scope, breakpoints, themes, state scope, output directory, and
target Alpha before capture. A Wonder canvas can prove observable proposal
geometry and composition. It cannot prove runtime routing, provider behavior,
permissions, keyboard handling, loading, or reduced-motion behavior unless the
selected surface exposes and the evidence captures those behaviors.

For every capture, record:

- file, branch, page, artboard, dimensions, capture ID, source revision, and
  timestamp;
- hierarchy, geometry, spacing, tokens, type, colors, radii, controls, and
  visible affordances;
- copy and fixtures, with empty, loading, error, success, focus, pressed,
  disabled, permission, and responsive states marked `MEASURED`, `OBSERVED`,
  `INFERRED`, `UNKNOWN`, or `UNREACHABLE`;
- component anatomy and source ownership: approved library, project primitive,
  or a documented no-fit exception;
- a screenshot or other supported capture for each distinct visual state, plus
  the action that reached it. Do not treat a label or an uncaptured frame as
  state proof.

Read `solvys-kirby/references/report-contract.md` before synthesis. Write the
complete Kirby package, including `INTERFACE_INVENTORY.md`,
`NAVIGATION_MAP.md`, `DESIGN_TOKENS.md`, `COMPONENT_INVENTORY.md`,
`LAYOUT_ARCHITECTURE.md`, `INTERACTION_PATTERNS.md`, `PL0_ACCEPTANCE.md`,
`EVIDENCE_LEDGER.ndjson`, `board/WONDER_BOARD.md`, and the evidence folders.
Run the bundled Interface Inventory validator against the report root:

```bash
python3 <solvys-kirby>/scripts/validate_interface_inventory.py <report-root>
```

If the Wonder evidence board or live capture is inaccessible, mark the report
`BLOCKED`; do not replace it with local screenshots.

## Exact-copy source-to-Site gate

When the objective says `1:1`, `exact copy`, or production-surface parity,
token alignment is only an implementation input. Before publishing or accepting
the Site, capture Wonder and the Site at the same viewport, route, and state,
then compare palette, density, geometry, shell, labels, controls, and visible
content. A mismatch is `DIVERGED`; an owner-gated or unreachable Site is
`BLOCKED`. Neither state can be reported as a matched candidate or used as
runtime proof.

### Three-way production, Site, and Wonder parity

**Visual exact copy** is the required acceptance standard. This phrase means
that the production renderer, the ChatGPT Site renderer, and the Wonder canvas
render the same approved source revision without any visible pixel deviation.

For a production-surface copy, the repository production revision is the
starting authority. The ChatGPT Site and Wonder canvas must each reproduce that
same revision at the same route, viewport, user-visible state, feature flags,
theme, locale, and data fixture or frozen live-data capture. Do not accept
token-only alignment, a visual approximation, a stale screenshot, or a
different deployment revision as parity evidence.

Before a screen or state is accepted, create one parity receipt that records:

1. the production repository commit and source entry files;
2. the deployed Site version and runtime configuration reference;
3. the Wonder file, branch, page, and artboard;
4. matched desktop or mobile viewport dimensions and route/state inputs;
5. rendered captures from production, the Site, and Wonder; and
6. a three-way visual-diff result for geometry, typography, colors, assets,
   copy, hierarchy, controls, loading/empty/error state, and visible data.

Use `MATCHED` only when all three surfaces come from the same source revision
and the diff contains no visible deviation. Any differing commit, asset,
viewport, state, or visible pixel is `DIVERGED`. Missing production capture,
unavailable Site, unresolved live-data variance, or inaccessible Wonder canvas
is `BLOCKED`. A `DIVERGED` or `BLOCKED` state prevents publication and must be
fixed or explicitly resolved before the next screen is accepted.

When production has live or time-varying data, capture and reproduce a named
state contract rather than inventing a static substitute. The receipt must name
the loading, empty, error, stale, or populated state and the exact source
revision that rendered it. Wonder components must retain provenance to their
repository source entry and commit so a later source change can trigger a new
parity pass.

### Three-way production, Site, and Wonder parity

**Visual exact copy** is the required acceptance standard. This phrase means
that the production renderer, the ChatGPT Site renderer, and the Wonder canvas
render the same approved source revision without any visible pixel deviation.

For a production-surface copy, the repository production revision is the
starting authority. The ChatGPT Site and Wonder canvas must each reproduce that
same revision at the same route, viewport, user-visible state, feature flags,
theme, locale, and data fixture or frozen live-data capture. Do not accept
token-only alignment, a visual approximation, a stale screenshot, or a
different deployment revision as parity evidence.

Before a screen or state is accepted, create one parity receipt that records:

1. the production repository commit and source entry files;
2. the deployed Site version and runtime configuration reference;
3. the Wonder file, branch, page, and artboard;
4. matched desktop or mobile viewport dimensions and route/state inputs;
5. rendered captures from production, the Site, and Wonder; and
6. a three-way visual-diff result for geometry, typography, colors, assets,
   copy, hierarchy, controls, loading/empty/error state, and visible data.

Use `MATCHED` only when all three surfaces come from the same source revision
and the diff contains no visible deviation. Any differing commit, asset,
viewport, state, or visible pixel is `DIVERGED`. Missing production capture,
unavailable Site, unresolved live-data variance, or inaccessible Wonder canvas
is `BLOCKED`. A `DIVERGED` or `BLOCKED` state prevents publication and must be
fixed or explicitly resolved before the next screen is accepted.

When production has live or time-varying data, capture and reproduce a named
state contract rather than inventing a static substitute. The receipt must name
the loading, empty, error, stale, or populated state and the exact source
revision that rendered it. Wonder components must retain provenance to their
repository source entry and commit so a later source change can trigger a new
parity pass.

An explicitly authorized new Site may be created as a private candidate, but it
must keep the existing Site intact, carry a candidate label, and remain outside
acceptance until the comparison receipt says `MATCHED`. Never delete or replace
the current Site to escape a fidelity mismatch. Return the exact mismatch list
and the next proof gate instead of polishing around it.

## Apply proven Wonder import constraints

When translating a populated application into editable Wonder artboards:

1. Use flex, nested flex rows, and flex wrapping. Wonder IR rejects CSS Grid.
2. Keep every `className` value literal. Create explicit state siblings or
   duplicate a verified artboard, then change its properties. Do not use dynamic
   or computed class expressions.
3. Read back variable bindings after duplication. Some duplicate and read
   surfaces can materialize computed token values as literals. Rebind any lost
   token reference before acceptance.
4. Keep inline text in the edit payload when editing a text node. A self-closing
   text element can be interpreted as a frame conversion and fail.
5. Use a self-closing frame edit to preserve its children. Use `replace` only
   for an intentional atomic subtree rewrite because replacement removes the
   existing subtree.
6. Give important overlay text an explicit verified color, then inspect the
   rendered result. Newly created overlay nodes can fall back to black even when
   their parent carries a text color.

For a large route-and-state library, build from visually verified base screens.
Arrange the new artboards in a labeled grid beside the protected baseline, keep
source and commit provenance on every base, and verify screenshots in small
groups. Call `finish_artboard` once for every created or changed artboard. Call
`finish_session` once, after every artboard is complete, and make it the final
Wonder tool call for that session.

## Direct-source capture artboards for a complete built frontend

### Invocation policy

Use this track when TP asks to put a built, deployed, preview, or authenticated
application into Wonder as complete visual frames. Trigger it for phrases such
as `live shots`, `all screens`, `all tabs and states`, `entire frontend on the
canvas`, `1:1 app frames`, `one state per frame`, or `source-faithful screen
library`.

Use this track when the requested truth is the rendered application at an exact
route, state, and viewport. Use the native library track below whenever the
same request also needs reusable semantic controls or editable component trees.
One task can use both tracks. Keep the resulting regions separate.

A direct-source capture artboard is an editable Wonder frame that preserves one
literal application viewport. Wonder can edit the artboard, its placement,
label, provenance, and capture asset. A bitmap does not expose the application's
individual controls as native canvas nodes. Record that boundary clearly. Do
not describe a direct-capture frame as a semantic component tree.

### Procedure

1. Freeze a capture manifest before the first canvas mutation. Every row must
   contain a stable ID, product, source URL or capture path, route, visible
   state, viewport, measured width and height, source revision, capture time,
   source kind, and owner. Record explicit exclusions and protected artboards.
2. Capture the rendered source in the authorized browser or use a previously
   authenticated, provenance-complete viewport capture. Preserve the actual
   application pixels. Do not rebuild the view from memory, draw a similar
   interface, add browser chrome, or substitute fixtures.
3. Reject a partial or cropped source image. A source file that ends before the
   intended viewport must not be stretched, extended, or treated as a complete
   screen. Recapture the full viewport when the state is reachable. Otherwise,
   record the state as unavailable.
4. Create exactly one artboard for each route, tab, overlay, drawer, sidebar
   state, responsive viewport, or transient state. Do not combine sibling tabs
   or states into a composite frame. Put the state in the artboard label and
   its manifest row.
5. Set the artboard root to the source image's exact measured pixel width and
   height. Put the original image in a same-size image node with contain,
   no-repeat, and centered rendering. Never use cover, a crop, a fixed shorter
   root, or a decorative device frame. This preserves terminal rails, status
   rails, bottom navigation, and every other visible bottom-edge surface.
6. Arrange the artboards in an isolated named region and preserve protected
   human-owned artboards. Use the manifest order for deterministic placement.
   Keep adjacent frames separated and prove that no artboards overlap.
7. Measure the current canvas batch limit with a calibration batch. Record the
   submitted count, successful count, and error for every batch. The verified
   Fintheon application-frame recovery limit was five frames per canvas batch.
   Treat that as a safe default until a new measurement proves a different cap.
8. Finish each completed artboard. Verify representative desktop, mobile, and
   tablet frames visually. Read back the artboard code for representative
   frames and confirm that the root and image dimensions equal the source
   dimensions. Call `finish_session` only after the whole import passes.

### Acceptance record

The final receipt must show the manifest count equals the canvas artboard count,
the dimensions histogram matches, the overlap count is zero, and each exclusion
was authorized. Include representative full-bottom captures, protected-artboard
readback, source revision or source-kind provenance, completed batch count, and
the exact maximum batch size. Keep direct-capture proof separate from runtime
acceptance. A current production, Site, and Wonder parity claim still requires
the three-way parity receipt above.

## Native Build Kit component-library import

### Invocation policy

Use this track when TP asks to import approved UI libraries, the Solvys Build
Kit, BeUI, Beautiful UI, Bklit, Evil Charts, or a reusable component gallery
into Wonder. Also invoke `$solvys-build-kit`. Use this track for native editable
component trees that future canvas screens can compose.

Do not use direct screenshots as the final library items. A library import must
preserve the source component's anatomy, accessibility affordances, and visible
states as native Wonder layers. Keep library artboards separate from product direct
captures, existing reference atlases, and protected product design regions.

### Procedure

1. Confirm repository-visible source custody. A device-local symlink cannot
   supply a remote Wonder agent. Read `build-kit/WONDER-IMPORT.md`,
   `manifest.json`, the library index, the item's manifest, source files, and
   license or custody record. Record exact source path, revision, license,
   registry type, and source-ready status.
2. Use only eligible app-building items. Exclude website sections, marketing
   assemblies, binary media, fonts, dependency folders, and access-gated source
   that lacks distribution authority. Record every skipped item with its exact
   path and reason in an import-exceptions record.
3. Make a deterministic import manifest before creating components. Each row
   contains library, item ID, source path, default state, required variants,
   source revision, license, target region, and import status. Count eligible,
   source-ready, access-gated, imported, skipped, and failed items separately.
4. Create one native Wonder artboard per approved source item and one distinct
   artboard for each meaningful visible variant. Preserve source tokens, fonts,
   hierarchy, interaction anatomy, and accessibility affordances. Bind product
   data, routes, permissions, persistence, and domain semantics only in the
   product source. A library never owns those contracts.
5. Import library-by-library in small measured batches. Start with a calibration
   item, then retain the largest successful canvas batch size in the receipt.
   Continue through the whole authorized inventory. A failed item does not stop
   unrelated eligible items. Record its exact source path, error, and retry
   result instead of inventing a replacement.
6. Place the imported artboards in a named Build Kit region beside protected
   reference artboards. Preserve every user-owned region. Read back each
   representative native component tree, verify its source provenance and
   variables, and take representative rendered captures before completion.
7. Finish every changed library artboard. End the session only after the import
   ledger, exceptions record, visible canvas count, and source inventory count
   agree.

### Acceptance record

The receipt must identify the repository, branch, commit, Build Kit manifest,
libraries, licenses, item counts, batch cap, exception rows, protected regions,
and finished-artboard count. It must state that the library items are native
editable component trees. Keep that receipt separate from a direct-source
application-frame receipt and from production or Site runtime proof.

## Transfer accepted source to ChatGPT Site

Do not start a Site implementation until the Interface Inventory passes and
`PL0_ACCEPTANCE.md` is `Status: ACCEPTED`, unless the task is explicitly limited
to an inventory or proposal. Before a transfer:

1. Freeze the accepted Wonder file, branch, page, artboard IDs, source revision,
   and source-to-Site map. Record the user acceptance and repository base SHA.
2. Preserve user-finalized navigation and controls. Add or remove an application
   tab only when the accepted Wonder source or explicit scope authorizes it.
3. Match accepted hierarchy, geometry, copy, data meaning, routes, state
   behavior, keyboard and focus behavior, responsive rules, and accessibility
   requirements. Use the approved Solvys Build Kit and UI-library hierarchy;
   record provenance, license, ownership, and no-fit exceptions. Wonder is not
   a runtime dependency.
4. Keep provider calls, permissions, routing, persistence, security, and domain
   semantics in the project source. Do not invent provider success, legal
   workflow meaning, fixtures, or BeUI Pro credentials or ownership.
5. Hand the accepted source map to `solvys-pta` for Site implementation.
   Use `human-review` for the Site-derived review artifact, apply returned user
   edits to the real source, republish, and recheck the actual Site URL.
6. Exercise every visible control at the required desktop and mobile viewports.
   Record source, Site, deployed, provider, installed, and human-review proof
   separately. A build or screenshot alone is not acceptance.

## Close with a truthful receipt

Return the registered Cabinet/repository receipt with:

- proof rung for each stage: authenticated Wonder readback, inventory, source
  transfer, Site build, deployment, browser test, installed proof, and human
  acceptance;
- Wonder account name, file, branch, page, artboards, source revision, and
  evidence IDs;
- repository and SHA, Cloud task or checkout, Site URL/version, capture paths,
  and the complete source-to-Site map;
- exact changes, protected human work, ownership, remaining gates, next action,
  and handoff expiry; secret values never belong in the receipt.

Use `MATCHED`, `DIVERGED`, or `BLOCKED` for each accepted contract. Never call a
blocked OAuth session, unavailable connector, uncaptured canvas, missing Kirby
package, or unaccepted PL0 record complete.
