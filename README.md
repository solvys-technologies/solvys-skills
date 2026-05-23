# Solvys Skills Suite

A Claude Code skills suite for design, development, orchestration, and deployment -- built by Solvys Technologies.

## Install

**Automatic:**
```bash
npx skills add solvys-technologies/solvys-skills
```

**Manual:**
Clone this repo and copy `.claude/skills/` into your project's `.claude/` directory.

## Skills

| Skill | Invoke | Purpose |
|-------|--------|---------|
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
| Feels | `/solvys-feels` | Visual architecture -- Solvys Gold palette, flat design, industrial warmth |
| Transitions | `/solvys-transitions` | 9 paste-ready CSS transitions tuned for Solvys |

## Solvys Feels -- Design System

The `solvys-feels` skill includes full theme presets, font kits, and CSS token maps imported from production Solvys applications. See the [reference/](/.claude/skills/solvys-feels/reference/) directory for:

- **Theme presets** -- 9 production themes with severity colors and bullish/bearish pairs
- **Font kit** -- 7 font families with self-hosted WOFF2 definitions and Readable Digits numeric override
- **CSS token map** -- Complete variable system for backgrounds, text, buttons, borders
- **Color palette** -- Full Solvys Gold/Stone token reference in hex and OKLCH
- **Icon & loader bank** -- Cross-app icon mappings, circular dot-matrix spinners, success fades, and Zen-mode rules

## Design Principles

- No gradients, no shadows, no blur
- No emojis in UI chrome
- No AI sparkles, glitter, or aurora effects
- Use the Solvys Icon & Loader Bank before changing any app icons, spinners, or saving/loading states
- Flat colors only, OKLCH color space
- Monochrome canvas with single accent color
- Industrial warmth -- precise but not cold

## License

MIT -- Solvys Technologies
