# Solvys Brief Engineering Guidelines

Use this file before writing the implementation flow in a single-agent brief. It keeps `/solvys-brief` aligned with the current source canon without turning every brief into a design-system rewrite.

## Source Stack First

- Load `SOLVYS_AGENT_SYSTEM_PROMPT.md` from the Solvys-skills repo, or the installed Solvys-skills copy when available, before drafting implementation steps for any Solvys product.
- Choose the implementation stack from `/solvys-feels/reference/source-canon.md`.
- Default product UI work to the current Fintheon app personality and primitives.
- Use the Fintheon product page for public product pages with liquid-glass material.
- Use solvys.io / pricedinresearch.io for parent studio and research-site registers.
- Use SSFitness for public fitness/PWA patterns.
- Use Solvys-1 Renters for resident, staff, and building-operations systems.
- If the requested work needs a new framework, auth provider, icon runtime, ORM, UI kit, animation runtime, or deployment model, call that out as out-of-canon and require explicit TP approval.

## Repo Intake

- Read repo instructions, recent changelog entries, package scripts, and relevant existing primitives before drafting steps.
- Include the Solvys coding-agent prompt rules in the executor handoff: repo truth first, preserve dirty state, whole-product understanding, narrow execution, stable UI canon, highest-reality proof, and direct done/not-done status.
- Preserve intentional dirty work. Do not tell the executor to revert unrelated files.
- Name the target branch and whether it already exists when the user provided that context.
- Anchor file paths and commands to the actual repo, not generic examples.

## Implementation Flow

- Keep the flow ordered: data, service, API, hooks/state, UI, validation, changelog.
- Reuse source-owned UI primitives before adding new abstractions.
- Prefer typed boundaries: Zod schemas, shared validators, service-level pure functions, and explicit error states.
- Keep fallbacks honest: describe degraded behavior when env vars, auth, network, or upstream services are missing.
- Include browser/screenshot verification for visual work, not only typecheck/build.

## Validation

- Use the repo-native build and test commands listed in package scripts or project docs.
- For Vite apps, include stale-bundle prevention when that repo requires it.
- For deployed or public website work, include the live URL or preview URL that must be checked.
- For authenticated product UI, distinguish unauthenticated proof from logged-in proof.
- End with a concise done/not-done gate and the remaining blocker if one exists.
