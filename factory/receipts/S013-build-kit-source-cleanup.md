# S013 - Build Kit source cleanup

Date: 2026-08-09
State: audited

## Outcome

The Solvys Factory source and its installed mirrors use the source-copied
Solvys Build Kit as the shared UI assembly source. Retired visual-editor
artifacts are excluded from the suite and remain outside the Factory source.

## Audit scope

- Factory source: `Codebase Cabinet/solvys-skills`
- C-Cab Factory records: `Factory Instance` and `Project Records`
- Global mirrors: `.codex/skills`, `.claude/skills`, and `.agents/skills`
- Dependency manifests, symlinks, tracked paths, and text references

## Proof

- No retired visual-editor paths were present in the Factory source, C-Cab
  Factory records, or installed skill mirrors.
- No package, lockfile, container, or provider dependency was present for a
  retired visual editor.
- No symlink in the Factory source points to a retired visual-editor asset.
- `source-authority.yaml`, `factory-registry.yaml`, and the project manifest
  template now identify Solvys Build Kit as the shared UI assembly source.
- The suite validator and Build Kit validator remain the required checks before
  publication.

## Protected zones

- No client repository, Wonder file, ChatGPT Site, provider resource, or active
  product worktree was changed.
- Existing legacy evidence outside the Factory source remains untouched.
