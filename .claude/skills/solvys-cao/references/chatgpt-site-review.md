# ChatGPT Site Review Contract

## Purpose

Every frontend sandbox owns one project ChatGPT Site. The Site is the shared
visual prototype and implementation-check surface for all Solvys workspaces. It
replaces localhost and port 7777 for frontend tests and checks. `human-review`
opens the Site-derived local HTML review artifact when direct edits are needed.

## 1:1 Prototype Gate

The Site must reproduce the accepted source or product specification at the
requested scope. Check geometry, hierarchy, exact copy, data shape and meaning,
routes, controls, loading/empty/error states, responsive behavior, keyboard and
focus behavior, accessibility, and purposeful interaction feedback.

Do not publish placeholders, screenshots, marketing mockups, fake dashboards,
invented metrics or identities, dead controls, skeleton-only previews, or
close-enough substitutes as Site prototypes. Fixtures may stand in for an
unavailable boundary only when they follow the real data contract, record source
and fixture provenance, and appear in the receipt.

The Site gate requires a source-to-Site path, route/state map, control checklist,
desktop and mobile viewport record, fixture/provenance record, and interaction
receipt. Missing evidence blocks Site deployment or acceptance.

## Authority And Boundaries

- The Site is a sandbox proof surface. It does not prove deployment,
  live-provider behavior, release publication, or installed-app behavior.
- `human-review` 0.4.0 accepts a local HTML/Markdown file or localhost URL. It
  does not accept a remote Site URL. Generate a named local review artifact from
  the Site source or Site export, then apply edits back to source and recheck
  the real Site URL in the in-app browser.
- A local server may exist only to prepare or publish a Site when no remote
  route exists. Its port, HTTP response, screenshot, or browser tab is not an
  acceptance receipt.
- Ext is never the Site source, preview root, cache, or review target.
- Wonder owns new frontend proposals and their diffs before Site deployment.
  Existing Builder and Plasmic artifacts are protected legacy inputs. Use them
  only after TP explicitly chooses their source transfer.
- A non-frontend task records `ChatGPT Site: not applicable` and does not create
  an empty Site merely to satisfy the contract.

## Required Site Record

Before frontend implementation or review, record:

```markdown
- ChatGPT Site: required | existing | not applicable
- Site project and URL:
- Owning product/sandbox and Sprint:
- Source branch or Cloud checkpoint:
- Site purpose: prototype | implementation check
- 1:1 fidelity target and accepted source/spec:
- Route/state map and real-control checklist:
- Fixture and provenance record:
- Desktop/mobile viewport record:
- Local review artifact and source path:
- Source, Site, deployed, and installed proof required:
- Human-review status: not opened | open | feedback applied | closed
- Task-owned local helpers and release condition:
```

Use a unique Site for each project sandbox. Do not share a generic Site across
products, branches, or unrelated test states.

## Execution Sequence

1. Create or update the project Site from the accepted source or Cloud artifact.
2. Open the Site URL in the Codex in-app browser. Use one browser and one Site
   review per task.
3. Check the accepted source/spec against the Site. Record the exact URL,
   viewport, route, control, state, and result.
4. Run the requested implementation checks against the Site. Record the exact
   URL, viewport, route, interaction, and result.
5. When visual, copy, layout, or product review is needed, generate the named
   local HTML artifact and run `human-review` on it automatically. Wait for
   feedback, apply every edit and comment to source, then update the Site.
6. Recheck the changed Site route. Keep Site review, source checks, deployment,
   live-provider, release, and installed-app receipts separate.
7. Close only task-owned helpers after the owner, client, listener, reference,
   and task-lifetime checks pass.

## Resource Rules

- Build and publish through Cloud Tasks whenever repository work or meaningful
  compute is involved.
- Do not start a local Vite, Next, Bun, Node, browser, or preview process for
  normal frontend proof when the Site can serve it.
- At critical internal capacity, do not create a local checkout, dependency
  store, build cache, or server. Route the work to Cloud and use the Site URL.
- Do not open Chrome for ordinary QA. Use the Codex in-app browser.
- Never stop system, recovery, upload, remote-transport, or unknown-owned
  processes to make room for a Site review.

## Truth Rungs

| Claim | Required evidence |
| --- | --- |
| Source changed | Source diff and scoped source checks |
| Frontend sandbox checked | Project ChatGPT Site URL and interaction receipt |
| Human review completed | `human-review` feedback applied and Site recheck |
| Deployed | Authorized deployment receipt and endpoint readback |
| Live | Intended public/provider path verified after deployment |
| Installed | Intended application installed and opened on the target device |

Do not promote a Site screenshot, local server response, or human-review open
state into a higher proof rung.
