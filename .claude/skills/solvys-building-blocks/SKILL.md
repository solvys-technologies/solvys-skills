---
name: solvys-building-blocks
description: Solvys-wide doctrine for finding, vetting, approving, retrieving, and composing proven design references, UI libraries, OSS technology, backend documentation, North Star repositories, and X bookmarks before creating custom work. Use at every design, architecture, research, implementation, automation, dependency, or fork-in-the-road decision across all workspaces.
---

# Solvys Building Blocks

Build from the strongest proven parts available, then spend custom effort only
where the product earns differentiation. A building block may supply behavior,
structure, a visual pattern, a protocol, or implementation evidence. It never
inherits product state, client identity, domain semantics, or decision authority.

## Global Decision Order

At every meaningful fork in the road:

1. Inspect the current repo, installed dependencies, product canon, and accepted
   local precedents.
2. Search the relevant approved Paste pinboard.
3. Inspect the original source firsthand. For design inspiration, compare the
   rendered reference at the target viewport. For technology, inspect official
   docs, source, license, releases, issues, and runtime requirements.
4. Choose the adoption level explicitly: `dependency`, `fork`, `source
   component`, `pattern`, `visual reference`, or `reject`.
5. Record what the block owns, what remains Solvys or client-owned, its protected
   zones, its provenance, and the proof required.
6. Compose the smallest coherent system from approved blocks before writing a
   custom substitute.
7. Prove the result at the requested reality rung. A good reference does not
   prove a good integration.

Custom invention is warranted when no approved block fits, the product's
differentiator requires it, licensing or security blocks adoption, or integration
cost exceeds ownership cost. State that reason before building from scratch.

## Solvys Ponytail Ladder And Pragmatic OSS-First

At every build, implementation, architecture, dependency, or fork-in-the-road
decision, run the Solvys Ponytail Ladder from `factory/canon/ponytail-ladder.md`
in order: YAGNI, existing repo seam, stdlib/native platform, installed dependency,
maintained OSS with lower ownership cost, one line, then the minimum custom
code.

Be a pragmatic OSS-first engineer, not a write-everything-from-scratch
engineer. The default preference for generic capabilities -- backend
primitives, protocols, workflow engines, parsers, queues, observability,
auth, state, and UI foundations -- is maintained OSS, adopted when its license,
maintenance, security, runtime fit, and integration cost beat owning custom
code. Rejecting OSS requires a recorded reason (licensing, security,
integration cost, product differentiation) and an exit path, the same evidence
a custom exception requires. When the ladder reaches the last rung, write the
minimum custom code that works and mark a real corner cut with a `ponytail:`
comment naming the ceiling and upgrade path.

## Cross-Device Operating Context

The executive-management and development Codex accounts are peer lanes sharing
one operating brain through the writable local source
`/Users/tifos/Documents/Solvys/Codebase Cabinet/solvys-skills`, linked through
`/Users/tifos/.codex/tools/solvys-skills`, and the `CAO Turnkey` handoff in
iCloud Drive `Cabinet`. Executive planning and consultation primarily live on
the executive device. Research, development, implementation, technical proof,
and the connections and environments primarily configured on this Mac remain
in the development lane. A reference or decision can cross devices through an
explicit handoff, but ownership and live truth stay with the surface that
produced them. `/Volumes/Ext.` is a restored writable recovery asset and never
a source, worktree, cache, build, preview, or review lane.

For prototype and frontend design work, each project owns a ChatGPT Site. The
Site URL in the Codex in-app browser is the implementation-test and review
surface. When human review is needed, create a Site-derived local HTML artifact
and open it with `human-review` automatically; apply the returned edits to
source and refresh the Site. Pen.dev owns new frontend proposals and their diffs
before Site deployment through its desktop app, CLI, and local MCP connection.
Wonder is the fallback after a recorded Pen.dev connection attempt. Existing
Builder and Plasmic artifacts remain protected
legacy inputs unless TP explicitly selects a source transfer.
The Site prototype must be a 1:1 runnable representation of the accepted source
or product specification at the requested scope. Match copy, geometry, data
meaning, routes, controls, states, responsive behavior, accessibility, and
interaction feedback. Reject placeholder or fake product behavior, and record
the source-to-Site path, route/state map, control checklist, viewport record,
fixture provenance, and interaction receipt.
Use this library hierarchy:

1. BeUI Pro, with BeUI as the primary fallback.
2. Motionary.dev, with ascertainty UI as the secondary fallback.
3. Bklit for data visualization, with EvilCharts as the secondary fallback.

Verify and install the eligible library before implementation. Use an existing
approved block as-is before composing a new one. A custom component or block
requires a recorded no-fit exception that names the searched libraries, reason,
owner, and maintenance cost. Preserve user edits, batch comments or
annotations, and the required picture-led PDF closeout for a closing phase.

## Paste Approval Ledger

Use Paste Pinboards as the fast retrieval layer for approved references:

- `Web Design`
- `App/UI Design`
- `X Bookmarks - Automation & Design Research`
- `Backend Docs & North Star Repos`
- `OSS Technology Building Blocks`
- `UI Library Building Blocks`

### Paste MCP custody

When a skill uses Paste MCP or opens a Paste folder or pinboard, keep the Paste
app and MCP connection open for the entire task and handoff. Never close it,
sign out, or terminate its sync process as cleanup; doing so can interrupt the
iCloud sync that TP relies on for fluid work. Leave the exact project folder or
pinboard available when the task ends. Record item titles, references, and
secret names only; never record secret values.

Paste is an approval ledger, not a web-scrape bucket. Add an item only when TP
explicitly approves it or when a Solvys task reaches accepted rendered or
implementation proof. Keep the canonical URL, give it a readable title, and use
one primary pinboard. Cross-reference in a task ledger when a block spans
categories.

If Paste is unavailable, keep the candidate in the task's source ledger and
report that it remains unpinned. Never invent a Pinboard ID or claim a save that
was not read back.

## Design Inspiration Sources

Treat [Recent Websites](https://recent.design/websites) as a default current
source for every web-design inspiration decision. Use
[Recent App Screenshots](https://recent.design/app-store-screenshots) when the
target is an app or mobile UI.

References teach composition, geometry, responsive behavior, interaction, and
design language. Do not copy proprietary assets, copy, source, trade dress,
logos, or client identity. Reconstruct the useful principle, then diverge into
the target product's own world.

Search approved design references at every material layout, interaction, mobile,
navigation, typography, motion, and component fork. Do not wait until the end
and use inspiration as decoration.

## X Bookmarks

Use the X Pinboard during automation runs and per-task design research for quick
fork-in-the-road reference. Social posts are leads and demonstrations, not
primary proof. Verify technical, licensing, maintenance, security, and product
claims against the original repository, documentation, release, or rendered
artifact before adoption.

## Technology And UI Foundations

For backend and infrastructure decisions, consult approved docs and North Star
repos before selecting an architecture. For generic capabilities, prefer
maintained OSS when its license, maintenance, security, runtime fit, and
integration cost beat custom ownership.

For interfaces, install or reuse the approved UI foundation before drawing
generic controls. Search the primary library first, then its named fallback,
and use the library block before designing a replacement. A custom block is
allowed only after the no-fit exception is recorded. Libraries may own
presentation and interaction primitives. The product retains state, permissions,
persistence, provider routing, evidence, and domain rules.

For backend and infrastructure, start from the proven project stack and this
default platform estate: Fly.io for durable services and workers, Supabase for
Postgres/auth/storage when it is the product authority, Cloudflare for edge,
Durable Objects, and R2 seams, Vercel for web delivery and eligible functions,
and PostHog for privacy-bounded product analytics. Add another technology only
when documented best practice lowers lifetime tech debt, maintenance, or
management burden. Record the client-facing cost and the reason before adding
it.

## Approval And Promotion

Classify every candidate as `candidate`, `approved`, `adopted`, or `rejected`.
Only `approved` and `adopted` items belong in the Paste approval ledger.

Promote a new block when it survives:

- source and rights verification;
- fit, maintenance, security, and integration review where applicable;
- client-partition and protected-zone review;
- representative rendered or runnable proof;
- TP approval or accepted product proof.

Capture the durable procedure here, product-specific decisions in repo canon,
and temporary comparisons in the task source ledger.
