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
| Brief | `/solvys-brief` | Single-agent sprint brief planner with design + development flow |
| Plane | `/solvys-plane` | Plane project management -- issues, cycles, modules, sprint tracking |
| Audit | `/solvys-audit` | Pre-flight checks, debugging, environment audit, security scan |
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

## Design Principles

- No gradients, no shadows, no blur
- No emojis in UI chrome
- No AI sparkles, glitter, or aurora effects
- Flat colors only, OKLCH color space
- Monochrome canvas with single accent color
- Industrial warmth -- precise but not cold

## License

MIT -- Solvys Technologies
