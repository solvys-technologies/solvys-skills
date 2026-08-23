# Solvys Skills Suite

A Claude Code/Codex skills suite for design, development, orchestration, and deployment -- built by Solvys Technologies.

## Install

The canonical installer links the suite into Codex, shared agents, and Claude-compatible skill roots, registers the Factory source, preserves replaced paths in a timestamped backup, and runs the mandatory first-install orientation.

```bash
gh repo clone solvys-technologies/solvys-skills "$HOME/Solvys/solvys-skills" && "$HOME/Solvys/solvys-skills/scripts/install.sh"
```

The orientation records role, company, main project, working lane, account labels, required macOS applications, provider CLIs, Mac Mini access, Wonder access, Paste access, and ChatGPT Sites team-review access. It never collects passwords, MFA codes, API tokens, or secret values.

## Solvys Factory

This repository is the turnkey Solvys Factory suite. It contains:

- The Solvys Operations Handbook
- PL, PM, DEV, and CAO operating signs
- The Stack Interview contract and fluid/dynamic stack rules
- Welcome Mat and project-manifest templates
- Architecture Canvas, provider-resource, control-inventory, Sprint Unit, work-window, sitrep, comrade-care, and custody records
- The mandatory `$solvys-factory` skill
- The loadable `$solvys-build-kit` React assembly bank, presets, provenance receipt, and validator
- A safe global installer and orientation handoff generator

The canonical local source can live anywhere. The installer registers it at `~/.codex/tools/solvys-skills` and links each managed skill into the supported global skill roots.

Live client records stay in protected local Cabinet custody. The public suite
ships schemas, templates, and operating rules, while the installer creates
`~/.config/solvys-factory/projects`, `registry`, and `receipts` for each team
member's local operating state.

## Operating Authority

The writable local suite source on this Mac is `/Users/tifos/Documents/Solvys/Codebase Cabinet/solvys-skills`.
`/Users/tifos/.codex/tools/solvys-skills` is its global compatibility link.
Installed Codex, Claude Code, and shared-agent paths link to that source.
`/Volumes/Ext.` is a restored writable recovery asset. It remains outside the
skills source, worktree, cache, build, preview, and review lanes.

Every frontend sandbox owns a project ChatGPT Site. Use its URL in the Codex
in-app browser for implementation checks. When visual or content review is
needed, create a Site-derived local HTML artifact and open it with
`human-review` automatically, then apply feedback to source and refresh the
Site. Wonder is the proposal source for new frontend changes and must hold the
diff before Site deployment. Existing Builder and Plasmic artifacts are
protected legacy inputs unless TP explicitly selects a source transfer.
Shared interactive assemblies come from the source-copied Solvys Build Kit.
The Factory ships no runtime dependency on a visual editor or design canvas;
legacy exports stay outside the suite until TP records an explicit source
transfer.

Every Site prototype must be a 1:1 runnable representation of the accepted
source or product specification at the requested scope. Match copy, geometry,
data meaning, routes, controls, states, responsive behavior, accessibility,
and interaction feedback. Reject placeholder or fake product behavior. Record
the source-to-Site path, route/state map, real-control checklist, viewports,
fixture provenance, and Site interaction receipt before acceptance.

## Skills

| Skill | Invoke | Purpose |
|-------|--------|---------|
| CAO | `/solvys-cao` | Universal operating doctrine for authority, Cloud execution, Site review, safety, and proof |
| Factory | `/solvys-factory` | Mandatory orientation, Welcome Mat entrance, operating lanes, architecture maps, proof, and handoff |
| Sign-In | `/solvys-sign-in` | Complete authorized Google, provider, CLI, MFA, QR, and Wonder sign-ins without dead loops |
| Build Kit | `/solvys-build-kit` | Load runnable Solvys interview, architecture, control-inventory, state, rail, and workbench assemblies into a React project |
| Orchestrate | `/solvys-orchestrate` | Multi-track sprint planning with parallel agent briefings |
| Audit | `/solvys-audit` | Pre-flight checks, debugging, environment audit, security scan |
| Inform | `/solvys-inform` | Brief an AI agent on project context and recent changes |
| Deploy | `/solvys-deploy` | Pre-flight, deploy release, test, fix-and-redeploy cycle |
| Beta | `/solvys-beta` | Local build, test, and DMG publish to desktop |
| Feels | `/solvys-feels` | Visual architecture -- Solvys Gold palette, flat design, industrial warmth |
| Kirby Interface Inventory | `/solvys-kirby` (`Solvys-admiration-report`) | Reverse-engineer an authorized live benchmark into evidence-backed tokens, components, states, layout, motion, and a PL0 contract |
| Prototype-to-alpha | `/solvys-pta` | Build an Alpha surface only from a validated Interface Inventory and accepted PL0 contract |
| Communication Style | `communication-style-protocol` | Universal direct, high-trust communication protocol with the No AI Slop overlay |
| No AI Slop | `/no-ai-slop` | Remove AI writing patterns while preserving the writer's voice |
| Human Review | `/human-review` | Direct text edits and anchored comments on the Site-derived local review artifact |

## Solvys Feels -- Design System

The `solvys-feels` skill includes full theme presets, font kits, and CSS token maps imported from production Solvys applications. See the [reference/](/.claude/skills/solvys-feels/reference/) directory for:

- **Theme presets** -- 9 production themes with severity colors and bullish/bearish pairs
- **Font kit** -- 7 font families with self-hosted WOFF2 definitions and Readable Digits numeric override
- **CSS token map** -- Complete variable system for backgrounds, text, buttons, borders
- **Color palette** -- Full Solvys Gold/Stone token reference in hex and OKLCH

## Design Principles

- No gradients, no shadows, no blur
- No emojis in UI chrome
- No AI sparkles, glitter, or aurora effects
- Flat colors only, OKLCH color space
- Monochrome canvas with single accent color
- Industrial warmth -- precise but not cold

## License

MIT -- Solvys Technologies
