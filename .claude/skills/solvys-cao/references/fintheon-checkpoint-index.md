# Fintheon Checkpoint Index

This index makes the major Fintheon pain and Eureka lessons recoverable from
repository evidence. It is intentionally selective: the strongest repair,
revert, or operating checkpoint is more useful than a dump of every commit.

## How To Recover The Evidence

Run these commands from `/Users/tifos/Documents/Codebases/fintheon`:

```bash
git show --stat <checkpoint>
git show <checkpoint> -- <relevant-path>
git log --all --date=iso-strict --format='%H %ad %s' -- <relevant-path>
```

Use `git branch --contains <checkpoint>` when branch ownership matters. A hash
proves source history, not current live, released, or installed state.

## Problem And Repair Pairs

| Date | Checkpoint | Evidence | Solvys lesson |
| --- | --- | --- | --- |
| 2025-12-24 | `6954b97e70e51012cc1bdaee34c4cb998bcea4e8` | `Migrate to Fly.io backend and Vite frontend` moved both deployment and frontend foundations. | A broad foundation change creates several new truth boundaries at once. Prove one complete user path before expanding. |
| 2025-12-25 | `4d75c9da27aa6df220e7a6b5276273bd6b91ebf9` | Repaired the critical white screen caused by a React hook violation and added an error boundary. | Compilation and architecture do not prove boot or recovery. The first integrated browser path is a foundation gate. |
| 2026-03-27 | `d3b4a2f1791866e975ac8d72a6aba4e0ad659ce5` | Added regime-aware RiskFlow scoring, commentator tiers, calibration state, and refinement workflows across 90 files. | TP's top-down market metaphor became useful only after the analogy was converted into explicit nested state, weights, and observable controls. |
| 2026-04-17 | `998d3a6550c1f2b5c8cf9c9f35b478cf317d7a1d` | Reverted global Doto digits after timestamps, calendars, and small KPIs became illegible. | Display personality and operational data readability are separate typography roles. |
| 2026-04-18 | `a6afdf9f3ea69e1bc7bc18599ef631b18cb13dac` | Removed nested Kanban anatomy from approvals and notifications, then bumped the service worker after stale assets hid the change. | A material migration must cross the full component hierarchy, and cache delivery is part of visual proof. |
| 2026-04-19 | `f93c14b0aaf08c852a0bcdc58b03e36a5b5c5fda` | Fixed a worker build-context failure and a persistence schema mismatch, then verified real rows and heartbeats. | A visible or configured capability is theater until build, schema, persistence, and downstream evidence agree. |
| 2026-04-20 | `c243abacf2d6aea21977afda3e8e9f4bb4e813fc` | Introduced the agent-spinner bank and routed it through repeated product consumers. | A locally attractive component can become incoherent when multiplied across the product. |
| 2026-04-23 | `e7913656df7f2c2fd281fe405e5d5d4aedfa6a7a` | Removed the spinner implementation and its consumers after the broad migration failed at product scale. | Prove global visual systems in a representative gallery before changing hundreds of consumers. |
| 2026-04-25 | `7d471f44d544f8d07722bc859f5f0810cdaef546` | Installed nine named Solvys transitions across menus, panels, numerals, collapsibles, and settings with reduced-motion handling. | Motion becomes coherent infrastructure when it has named roles, visible-by-default content, and product-wide ownership. |
| 2026-04-26 | `902d95f92eea49f4f1bc57831499f130c9a80d67` | Rebuilt Arbitrum with distinct personas, model lineages, evidence contexts, weights, and a bear case. | More agents do not create independent thought. Different responsibility, evidence, and incentives do. |
| 2026-06-30 | `f41994173419f84aad813ad53e4564439bda8a42` | Hardened the Databento GEX source and serving path with regression tests and a reflection. | When a rendered value is wrong, trace source, units, normalization, storage, API, selector, and renderer before explaining the domain. |
| 2026-07-05 | `a73258f921262c2501467596c114fd5a0fb3b0c1` | Added the narrow CAO quick-reply seam and its SSE-compatible tests. | Intelligence includes declining the full agent runtime for obvious low-risk work. |
| 2026-07-05 | `ebbe8cb8740f914cbd5eaef9644d312ad10e6423` | Corrected effort override behavior and recorded the measured `sup` latency result. | A fast path must preserve the full route for task-shaped prompts and must be proved on the actual managed service. |
| 2026-07-16 | `b329d65fc4fb823675d8ae13d95a9714ff9673d6` | Migrated eligible Performance heatmaps through a Bklit adapter while recording allocation, motion, and protected-surface audits. | A library should enter through an owned adapter and an explicit surface contract. |
| 2026-07-16 | `1161739582af7ffa63afc28b85edac05ced22928` | Consolidated BeUI controls across desktop and mobile with recurring-primitive, provenance, and responsive contracts. | Library adoption needs a control plane, not repeated local enthusiasm. |
| 2026-07-16 | `c01d8576f44efbe321419c008a31e1bedc8397be` | Fixed desktop updater selection of the latest release. | Release metadata is a product data path and requires the same exact-path debugging as a UI value. |
| 2026-07-16 | `6cfbfd47db4eb1e3e0ded33886e75ead7365fc11` | Hardened notarized macOS release metadata and updater preflight generation. | Build, notarization, updater metadata, download, and installed application are separate closure gates. |

## Operational Evidence Outside Git

Several durable corrections were made in conversation, runtime review, or
automation state rather than one Fintheon commit. Use the current sources below:

- Date-based branch naming and `same branch` continuation: account memory plus
  current `git branch --show-current` and active sprint ownership.
- Inspiration fidelity before client divergence: `solvys-cao/SKILL.md` and
  shared `Design.md`.
- Release, live, updater, and installed truth: current release endpoints,
  GitHub assets, updater metadata, and `/Applications/Fintheon.app`, never this
  index alone.
- Review-first planning: current `Awaiting Review` queue plus evidence comments,
  not a planning document.
- Automation truth: `/Users/tifos/.codex/automations/*/automation.toml`, latest
  run memory, `Loop Registry.md`, and `Automation Health.md` in that order.

## Selection Rule

When teaching or planning from this history, retrieve both sides of the closest
pair: the change that looked reasonable and the checkpoint that exposed or
repaired its failure. Copying only the accepted end state loses the Eureka.
