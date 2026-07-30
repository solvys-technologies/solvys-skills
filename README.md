# Solvys Skills Suite

A runtime-neutral skills suite for design, development, orchestration, and deployment -- built by Solvys Technologies.

## Install

**Automatic:**
```bash
npx skills add solvys-technologies/solvys-skills
```

**Manual:**
Clone this repo and copy `.claude/skills/` into your project's `.claude/` directory when that workspace still loads skills from the legacy compatibility path.

`.claude/skills/` is the current compatibility distribution path. It does not imply a specific runtime is active. Read local `AGENTS.md`, `WORKSPACE.md`, legacy `CLAUDE.md` if present, and any `.cursor/rules/` or equivalent repo instructions before using a skill.

## Coding Agent System Prompt

Use [`SOLVYS_AGENT_SYSTEM_PROMPT.md`](./SOLVYS_AGENT_SYSTEM_PROMPT.md) as the operating contract for coding agents working on Solvys products, including Fintheon. It is runtime-neutral and should be included or referenced by new agent handoffs, Linear pickup prompts, `/solvys-inform` briefings, and sprint briefs.

The short rule: start from repo truth, preserve intentional dirty state, understand the whole product surface, keep UI canon stable, execute narrowly, and prove work through the highest-reality surface available before calling it done.

For substantial Solvys work, load [Solvys CAO](./.claude/skills/solvys-cao/SKILL.md).
It codifies TP's problem-first, metaphor-driven reverse engineering; separates
decisions agents should make from questions that require authority; records the
official stack and protected zones; defines ten independent dream-team roles;
and promotes durable corrections into memory, design canon, repo canon, or
skills instead of losing them between sessions.

## Ponytail Engineering Chain

Ponytail is now part of the Solvys development doctrine, especially for backend and agentic feature work. After reading repo truth and tracing the real flow, agents should prefer the first rung that holds: do not build what is unnecessary; reuse an existing repo seam; use stdlib or native platform behavior; use an already-installed dependency or maintained OSS when it is safer than owning custom code; write the smallest correct implementation only after those checks fail.

This does not relax validation, auth, security, data-loss handling, accessibility, explicit requirements, or proof. Bug fixes must still target the root shared seam after checking sibling callers, and non-trivial logic needs the smallest runnable check or product proof.

## Frontend Design Gate

Use [`Design.md`](./Design.md) for every Solvys frontend/UI task. An agent must read it immediately before planning, read the repo-local `Design.md` or `DESIGN.md` when one exists, write the plan against both files, then re-check the plan against them once more before implementation. This applies to app UI, public pages, icons, drawers, composer changes, copy, data rendering, motion, and visual review.

The shared file is canon: it is the stable source of truth. Repo-local design files narrow product defaults, but they do not weaken universal Solvys rules. Any user correction that changes future design behavior must be captured in the shared canon or in the repo-local design file before product-wide UI work proceeds.

For any new Solvys project or greenfield frontend, run `/solvys-discovery` and `refero-design` before touching frontend files, writing CSS, generating UI, or treating visual direction as implementation-ready. `refero-design` is installed from `https://github.com/referodesign/refero_skill`; if missing, install it with `npx skills add https://github.com/referodesign/refero_skill`. The discovery or sprint artifact must cite the Refero reference lock and decision ledger.

Use Wonder as the lightweight collaborative sandbox for new frontend changes
when applicable. Keep agent-owned and concurrent human-owned Wonder work
separate. TP explicitly chooses the design that enters source, and the
source-integrated result must still pass the existing port 7777 verification
lane. Backend-only tracks may use Cloud after their branch and brief are pushed;
frontend-only and frontend-plus-backend tracks stay local and prefer
`/Volumes/Ext.`.

## Skills

| Skill | Invoke | Purpose |
|-------|--------|---------|
| CAO | `/solvys-cao` | Problem-first Solvys doctrine, decision authority, stack, dream-team roles, proof, and durable learning |
| Orchestrate | `/solvys-orchestrate` | Multi-track sprint planning with parallel agent briefings |
| Orch Mobile | `/solvys-orch-mobile` | Mobile Slack + Linear orchestration for local Codex CLI pickup |
| Brief | `/solvys-brief` | Single-agent sprint brief planner with design + development flow |
| Plane | `/solvys-plane` | Plane project management -- issues, cycles, modules, sprint tracking |
| Audit | `/solvys-audit` | Pre-flight checks, debugging, environment audit, security scan |
| Support Install | `/solvys-support-install` | Install remote incident capture, Linear filing, admin health, and fix-sync loop |
| Support Audit | `/solvys-support-audit` | Audit the support pipeline end-to-end before shipping or after incidents |
| Support Sprint | `/solvys-support-sprint` | Triage Linear support tickets into an executable sprint pack |
| Inform | `/solvys-inform` | Brief an AI agent on project context and recent changes |
| Deploy | `/solvys-deploy` | Pre-flight, deploy release, test, fix-and-redeploy cycle |
| Beta | `/solvys-beta` | Local build, test, and DMG publish to desktop |
| Research | `/solvys-research` | Fast source-backed deep dives with OSS options |
| Feels | `/solvys-feels` | Visual architecture -- Solvys Gold palette, flat design, industrial warmth |
| Transitions | `/solvys-transitions` | 9 paste-ready CSS transitions tuned for Solvys |
| Avatar Forge | `/solvys-avatar-forge` | CSS-var-driven 8-bit avatar scenes like the Fintheon CAO |
| Hyperdesign | `/solvys-hyperdesign` | One command for Hyperagent-inspired brand, grid, data, campaign, motion, and configurator design workflows |
| Bookmark Actionizer | `/solvys-bookmark-actionizer` | Turn bookmark exports into clustered artifacts, sprint suggestions, and skill additions |
| Fully Comp | `/solvys-fully-comp` | Competitive analysis against Anthropic/Codex truth anchors with Solvys-native improvements |
| Fully YOP | `/solvys-fully-yop` | Same-level competitor and feature inspiration research turned into reuse-first build plans |

## Bookmark Workflow

Use `/solvys-bookmark-actionizer` when a bookmark dump should become an implementation backlog instead of passive inspiration. The full workflow lives in [`bookmark-actionizer-workflow.md`](./bookmark-actionizer-workflow.md). It accepts raw exports or pasted links, clusters them into design, market signals, agents/tools, infrastructure, client references, skills additions, and pass/archive buckets, then produces:

- `bookmark-clusters.md`
- `sprint-suggestions.md`
- `linear-issue-candidates.md`
- `skills-additions.md`
- `cherries.md`
- `pass-archive.md`
- `demo-candidates.md`

Every artifact must keep source links, shorthand statuses such as `USE NOW`, `CHERRIES`, `SKILLS-ADDITION`, `TEST / VALIDATE`, `PASS / ARCHIVE`, `LINEAR ISSUE`, and `DEMO CANDIDATE`, plus the proactive planning line:

> Per your bookmarks, we could use ____, a ____ repo/platform/tool that ____. Link: ____.

Keep Browserbase/browser-to-api checks, README upgrade ideas, and external tool candidates such as Kappaemme and OfficeCLI in a validation queue until they are proven useful in a real Solvys workflow.

## Solvys Feels -- Design System

The `solvys-feels` skill includes the Solvys source canon, full theme presets, font kits, and CSS token maps imported from production Solvys applications. Fintheon current app is the primary product-UI personality; Fintheon product page, solvys.io, pricedinresearch.io, SSFitness, Solvys-1 Renters, and impeccable.style provide the public registers, stack constraints, and rolling design-process inputs. See the [reference/](/.claude/skills/solvys-feels/reference/) directory for:

- **Source canon** -- Source hierarchy, visual registers, tech-stack allowlist, and Impeccable refresh loop
- **Design guidelines** -- Practical UI register rules, liquid-glass usage, typography, imagery, and stack discipline
- **Theme presets** -- 9 production themes with severity colors and bullish/bearish pairs
- **Font kit** -- 7 font families with self-hosted WOFF2 definitions and Readable Digits numeric override
- **CSS token map** -- Complete variable system for backgrounds, text, buttons, borders
- **Color palette** -- Full Solvys Gold/Stone token reference in hex and OKLCH
- **Icon & loader bank** -- Cross-app icon mappings, circular dot-matrix spinners, success fades, and Zen-mode rules

## Solvys Hyperdesign -- Hyperagent-Inspired Design Suite

Use `/solvys-hyperdesign` as the one command for Hyperagent-inspired design work translated into Solvys-native output. It routes brand books, Vignelli/Muller-Brockmann grid discipline, editorial data visualization, transit/OOH campaigns, Veo/Hyperframes motion, briefing trailers, claymation explainers, and configurator/quote demos through the Solvys source canon instead of copying upstream prompt text.

The upstream snapshot is documented in `.claude/skills/solvys-hyperdesign/references/hyperagent-public-skills-map.md`; because that snapshot had no license file, this suite keeps a provenance and workflow map rather than vendoring the full JSON skill bodies.

## Design Principles

- For new projects and greenfield frontend, complete `/solvys-discovery` plus the `refero-design` reference lock before any frontend implementation
- Read `Design.md` and the repo-local design file right before planning any frontend/UI work, then verify the plan against them again before implementation
- Product UI defaults to Fintheon app tokens, rails, buttons, icons, fonts, drawers, and dense operational hierarchy
- Use source-backed liquid glass only where it clarifies product/page hierarchy
- No decorative button borders or arbitrary button backplates; button backgrounds are for primary fills or approved soft-glow states only
- New popups, rails, drawers, modals, sheets, and surfaces require enter/exit transitions
- No pointed square borders, triangular corner flags, sharp outline ornaments, or generic bordered-button boxes
- Liquid Glass requires a professionally shipped/source-backed example and repo-owned treatment; otherwise use frosted glass, flat layers, fading rulers, spacing, and type
- No emojis in UI chrome
- No AI sparkles, glitter, or aurora effects
- Use the Solvys Icon & Loader Bank before changing any app icons, spinners, or saving/loading states
- Tech stack choices must come from the Fintheon, SSFitness, pricedinresearch.io, or Solvys-1 source pool unless explicitly approved
- Flat product chrome, OKLCH color space, warm black/cream/gold defaults
- Monochrome canvas with controlled source-backed accents
- Industrial warmth -- precise but not cold

## License

MIT -- Solvys Technologies
