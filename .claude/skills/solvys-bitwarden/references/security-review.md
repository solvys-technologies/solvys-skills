# Clean-room security review

## Upstream reviewed

- Source: `https://github.com/georgeben/bitwarden-auth`
- Reviewed revision: `46f8d73` on `main`
- Review date: 2026-08-11
- License: none declared by the repository metadata or checkout
- Local review: read all seven tracked files, three commits, shell syntax, file
  modes, history, and object database. No source code was copied.

## Findings that block a 1:1 copy

1. The repository has no declared license. A direct source copy has no clear
   permission path.
2. Its shared `codex` / `bw-master` Keychain lookup unlocks the whole personal
   vault for every task that can call the wrapper. There is no project boundary.
3. It exports `BW_PASSWORD` and `BW_SESSION`, which makes secret material
   available to child processes and diagnostic tools.
4. It accepts an item name without an exact target-origin allowlist. A caller
   can retrieve a credential and use it on another domain.
5. Its `store-login` path can create vault items by default. It does not require
   an explicit write policy or human review.
6. It runs `bw sync` and `bw lock` for every call. Parallel tasks can invalidate
   each other's CLI sessions.
7. It has no tests, CI, license file, version pin, item-ID binding, receipt, or
   strict non-interactive policy.

## Solvys response

The Factory uses a clean-room wrapper around the official Bitwarden clients.
Secrets Manager machine accounts are the preferred backend. They provide
project-scoped read access and event logs. The official `bw` CLI is a bounded
fallback with project-isolated app data, a project-specific Keychain reference,
non-exported session arguments, exact item ID binding, and a non-writing
policy.

The wrapper rejects HTTP and wildcard origins, unlisted target hosts, missing
project IDs, duplicate item matches, and write-enabled policies. It emits only
the requested field or login object to the caller. The caller remains
responsible for keeping that output out of chat and logs.

## Remaining human gates

- TP must fill the Bitwarden vault and confirm each project item or Secrets
  Manager secret. The agent must not enter the master password.
- A Solvys administrator must create each read-only machine account and issue a
  task-scoped access token when the project supports Secrets Manager.
- A human must verify the target account, origin, provider consent, and MFA on
  the first browser sign-in.
- Security review is complete for the clean-room design when the policy tests
  pass. Provider access is still pending until the live policy is filled.
