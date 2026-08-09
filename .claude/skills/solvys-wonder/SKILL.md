---
name: solvys-wonder
description: Recover authorized Wonder access, inspect live Wonder files, protect human-owned work, and prepare an evidence-backed Wonder-to-ChatGPT-Site transfer. Use when a task names Wonder, a Wonder file or page, a live canvas inventory, a Wonder OAuth issue, or a faithful Site transfer.
---

# Solvys Wonder

Wonder is the proposal and visual-diff authority for new frontend work. The
project ChatGPT Site is the runnable review and acceptance surface. Repository
source is the implementation authority; provider consoles and CLIs own provider
truth; Linear owns issue truth. A Wonder canvas does not prove runtime behavior.
Never use a stale screenshot, local mockup, code export, or guessed canvas state
as live Wonder evidence.

## Enter with custody

Before any read that can lead to a write:

1. Complete the Solvys Factory entrance. Read the project `WELCOME.md`, assigned
   sign, manifest, active sprint, latest receipt, protected zones, and Paste
   references. If Paste MCP is used, keep the Paste app and MCP connection open
   through the task and handoff; never close it or terminate its sync process.
   Record an `entrance-receipt.json` before substantive work.
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

## Restore Wonder access safely

Use the native Wonder connector first. Before saying it is unavailable, query
the active and deferred tool inventory for a Wonder connector. If no connector
is available, a browser-only visual check may continue when authorized, but
authenticated connector readback and all Wonder mutations remain `BLOCKED`.
When no browser is named, use the Codex in-app browser. Use Chrome only when
the user explicitly selects or authorizes it. Never substitute direct HTTP,
guessed OAuth calls, a local mock, or a screenshot for the connector's live
readback.

If the connector reports an unauthenticated, stale, or unavailable session:

1. Use the `control-chrome` skill only when the user explicitly selects Chrome
   or gives task-specific authorization for the Wonder OAuth flow. Follow that
   skill's browser-selection and Node-backed control rules; do not invent a
   named-session API or switch browser families silently.
2. When Google Sign-In requires a project password, retrieve it from the
   project-specific Paste folder and use regular Chrome. Do not enter that
   password in Chrome Dev or ask TP to type it. Open `https://app.wonder.so/`
   or the exact task-owned file/page URL in regular Chrome and select
   **Continue with Google**.
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
5. Hand the accepted source map to `solvys-prototype` for Site implementation.
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
