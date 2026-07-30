---
name: solvys-hyperdesign
description: One-command Solvys design suite that translates Hyperagent public skill patterns into Solvys-native brand systems, Swiss/editorial layouts, data visualizations, campaign mockups, quote/configurator demos, and motion artifacts. Use when the user invokes /solvys-hyperdesign, asks to add or apply hyperagent-public-skills, wants agency-grade design exploration, or needs a design artifact routed through Solvys Feels, Solvys Transitions, and the shared Solvys UI canon.
---

# Solvys Hyperdesign

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


Use this as the single command for Hyperagent-inspired design work inside the Solvys skills suite. It is a translator, not a vendor dump: pull the useful workflow shape from `alexmcdonnell-airtable/hyperagent-public-skills`, then rebuild it with Solvys source canon, product constraints, and proof standards.

## Source Boundary

- Treat upstream Hyperagent public skills as public inspiration and provenance, not copied prompt text or runtime code.
- The inspected snapshot was `alexmcdonnell-airtable/hyperagent-public-skills` at commit `0d732a229bdffd20eae708ead042856b929d008b` from 2026-06-12.
- No upstream license file was present in that snapshot. Do not vendor full JSON bodies, copy long prompt passages, or import dependencies from it unless TP explicitly approves after license review.
- Load `references/hyperagent-public-skills-map.md` when choosing modes, refreshing upstream, or documenting provenance.
- If the user asks to refresh from upstream, clone to `/tmp`, extract metadata only, note the commit, and preserve this Solvys translation layer.

## Command Shape

The user-facing command is `/solvys-hyperdesign`. If the user does not specify a mode, infer the closest mode from the desired artifact:

| Mode | Use For | Output Bias |
| --- | --- | --- |
| `brand` | product identity, brand books, landing hero concepts | three distinct routes, one chosen Solvys-native system |
| `grid` | reports, editorial pages, Swiss-modern layout audits | real modular grid, baseline rhythm, optical alignment notes |
| `data` | charts, dashboards, research graphics | restrained editorial charts with clear annotations |
| `campaign` | OOH, subway/transit, launch case studies | locked identity, real-placement mockup plan, case-study page |
| `motion` | launch videos, briefing trailers, explainer clips | beat board, text zones, overlay plan, assembly checklist |
| `configurator` | quote tools, before/after demos, proposal builders | interactive before/after or option-switching pitch artifact |

Do not expose this table as explanatory UI inside generated apps. Use it to route the work.

## Solvys Translation Rules

1. Start with the local repo or product source of truth. For Fintheon, the current app is the primary product-UI personality.
2. For any greenfield or new-project frontend, run `/solvys-discovery` and `refero-design` before planning or generating frontend work. `refero-design` must produce a reference lock and decision ledger first; if missing, install it with `npx skills add https://github.com/referodesign/refero_skill`.
3. For visual system work, also consult `../solvys-feels/SKILL.md`; for motion, consult `../solvys-transitions/SKILL.md`; for CSS-driven character scenes, consult `../solvys-avatar-forge/SKILL.md`.
4. Preserve Solvys bans unless the source product already proves an exception: no decorative gradients, AI sparkles, generic shadows, decorative blur, emojis in UI chrome, or copied upstream visual language.
5. Translate external style cues into Solvys materials: warm near-black canvas, Solvys Gold as signal, warm off-white text, dense operational hierarchy for product UI, and source-backed public registers for marketing pages.
6. Keep generated artifacts inspectable. Favor HTML/CSS/React prototypes, real images where needed, stable tokens, and exact component/file references over vague moodboards.
7. If a mode calls for image/video generation, lock identity assets first, then reuse them across every generation step. Do not accept drifting logos, characters, colors, or typography.
8. End with proof matched to the artifact: screenshot/browser check for web, image set review for campaigns, rendered clip inspection for video, chart data sanity for data-viz, and repo-native build/test checks when code changed.

## Workflow

1. Parse the user's ask into one or two modes. If multiple modes apply, stage them in order: `brand` before `campaign`, `grid` before `data`, `brand` before `motion`, and `configurator` after the core product promise is clear.
2. Identify the source register: product UI, public product page, parent studio, fitness/public PWA, resident ops, or a one-off external brief.
3. Build a small design brief with the artifact, audience, source inputs, constraints, and proof plan.
4. Produce the artifact directly when enough context exists. Ask only when missing source material would cause a high-risk identity, legal, medical, financial, or brand claim.
5. Convert the Hyperagent pattern into Solvys structure:
   - Use route toggles and brand-applied mockups from `brand`, but keep Solvys palette discipline and avoid trend soup.
   - Use true grid overlays and baseline checks from `grid`, but adapt type and spacing to the product register.
   - Use color restraint and annotation discipline from `data`, but use Solvys chart tokens and numeric typography.
   - Use locked brand assets and real placement planning from `campaign`, but avoid implying official MTA or third-party endorsement.
   - Use planned text zones from `motion`, but make overlays readable through composition before effects.
   - Use before/after and live quote mechanics from `configurator`, but keep estimates labeled as assumptions unless backed by real pricing data.
6. Record any external source snapshot used in the final handoff or artifact notes.

## Acceptance Checklist

- `/solvys-hyperdesign` works as the one command for the design route.
- The result reads Solvys-native, not Hyperagent-native.
- External provenance is named without copying full upstream prompt text.
- Identity assets, typography, colors, and layout rules stay consistent across mockups.
- Generated UI avoids Solvys banned patterns and preserves product chrome unless TP asked for redesign.
- The artifact includes the highest-reality proof available for its surface.
