---
name: solvys-bitwarden
description: Use Bitwarden as the scoped credential lane for authorized Solvys login work, password-gated browser tasks, TOTP retrieval, and locked-Mac worker execution. Invoke it after the Factory entrance passes and a project Bitwarden policy names the exact target origin and secret IDs or item ID.
---

# Solvys Bitwarden

Use this skill when a Solvys task needs a password, username, TOTP, or other
login material from Bitwarden. The skill separates human browser bootstrap from
worker access so a locked Mac does not turn an ordinary login into a dead loop.

## Entrance and authority

1. Read the project Welcome Mat or registered onboarding composite, the assigned
   PL, PM, DEV, or CAO sign, the manifest, active sprint, latest receipt, and
   current infraction ledger.
2. Validate the Factory entrance before any provider, browser, credential, or
   repository mutation. Read-only diagnosis may continue while the receipt is
   repaired.
3. Load the project Bitwarden policy. The primary vault item name must equal
   the repository name. Use the example at
   `factory/templates/bitwarden-policy.example.json` as the shape. The live
   policy belongs in the project Cabinet or
   `~/.config/solvys-factory/projects/<project>/bitwarden-policy.json`.
4. Read the login item's **Additional Options** note before a sign-in, TOTP,
   text fallback, or override attempt. It can define a provider route, an
   approved contact, a resource boundary, or a prohibited fallback. Treat the
   note as part of the credential contract. Record names, IDs, scope, expiry,
   and owner only. Never record a password, token, cookie, MFA code, phone
   number, or secret value.
5. Use one active Bitwarden access path for the task. Do not open a second vault
   session, duplicate browser profile, or duplicate provider callback.

## Backend choice

Choose the backend in this order:

1. **Bitwarden Secrets Manager (`bws`)**. Use a read-only machine-account
   token scoped to the project's Secrets Manager project. This is the default
   worker path because it keeps the Mac, Chrome, and the human master password
   out of routine execution.
2. **Official Bitwarden CLI (`bw`)**. Use only when the project has no Secrets
   Manager machine account. Give the task a project-specific
   `BITWARDENCLI_APPDATA_DIR` and a project-specific Keychain reference. Never
   use the shared `codex` / `bw-master` entry from the reviewed source.
3. **Interactive Bitwarden desktop or web**. Use for the human-controlled vault
   setup, item creation, MFA, or machine-account bootstrap. The agent may open
   the app. The human enters the master password, approves MFA, and fills new
   vault values.

The official Bitwarden client remains the provider. This skill is a clean-room
Solvys wrapper. It does not copy code from `georgeben/bitwarden-auth`, which has
no declared license and failed the Factory security review. Read
`references/security-review.md` before changing this lane.

## Credential retrieval

Use the bundled helper. It checks the target origin, exact item or secret IDs,
repository-name item binding, project scope, read-only policy, and backend
before it returns a value.

```bash
python3 /path/to/solvys-bitwarden/scripts/solvys_bitwarden.py \
  --policy /path/to/bitwarden-policy.json \
  get-login --target-url https://login.example.com/start
```

Use `get-username`, `get-password`, or `get-totp` when the browser or provider
needs one field. Route the output directly to the authorized browser control
or process. Never paste helper output into chat, a prompt, a receipt, a log,
shell history, a screenshot, or a source file.

`get-totp` returns the current one-time code for an official `bw` login item.
It does not expose the saved TOTP seed. Use the individual field commands
instead of `get-login` when a provider needs a one-time code.

Read the item's Additional Options before retrieving credentials:

```bash
python3 /path/to/solvys-bitwarden/scripts/solvys_bitwarden.py \
  --policy /path/to/bitwarden-policy.json \
  get-options --target-url https://login.example.com
```

For version 2 policies, every credential command requires
`--options-reviewed`. This is a protocol check. It never prints the note in a
receipt, chat, shell history, or source file.

The helper requires an exact `https` origin. It rejects an unlisted domain,
redirect target, item URI mismatch, duplicate item match, missing project ID,
missing secret ID, or write-enabled policy. It returns no value when those
checks fail. A target URL with a path is accepted only after its origin matches
the policy. Wildcard origins are forbidden.

## Solvys Override

Use the primary repository-named login first. An approved provider may use the
`Solvys Override` item only after the visible primary session proves that the
requested project workspace, organization, database, deployment, or other
listed resource is absent. The fallback belongs in the project policy with its
own exact item ID and allowed origins.

The fallback is limited to the recorded shared-provider target. It is not a
general vault search or a reason to try another identity. After fallback
sign-in, read back the requested project resource. If it remains absent, stop
the provider path and record the missing access without changing provider
state. Never use the override for a client account, a payment account, or an
unlisted provider.

Invoke it only with the policy's explicit fallback selector:

```bash
python3 /path/to/solvys-bitwarden/scripts/solvys_bitwarden.py \
  --policy /path/to/bitwarden-policy.json \
  get-login --credential solvys-override --target-url https://provider.example.com
```

## Browser sign-in

1. Reuse an already-authorized target tab when the account and provider match.
2. When the browser needs a human password or MFA step, use the regular Chrome
   profile or Bitwarden desktop. Do not enter the project password in Chrome
   Dev. The agent can open the page and place the cursor. The human owns the
   master password, CAPTCHA, and first-device approval.
3. Use the stored TOTP item first. When the item notes explicitly authorize a
   named text contact, the agent may use Messages for that one sign-in only.
   Identify itself as `Harper, Solvys automated assistant`, wait for the
   contact's reply, enter the received code only on the approved provider, send
   a short thanks, then close Messages. Never infer a contact, number, or text
   authority from a project name.
4. Complete the visible Google sequence: **Sign in with Google**, **Continue**,
   then **Allow access** when shown. Prefer a text code. Use **Tap Yes** or
   **Tap the number** when the provider offers that fallback.
5. After the redirect, verify the visible account, organization, project, route,
   and requested capability. A success page alone is not provider proof.
6. Keep the Bitwarden app and MCP connection open when Paste MCP or another
   custody surface is also in use. Do not close or sign out of Paste because
   iCloud sync is part of the Factory custody path.

## Locked-Mac operation

When the Mac is locked, use `bws` or another project-scoped machine credential.
Do not start a new Google login, ask for a browser prompt, or weaken Keychain
protections. If the target has only an interactive web flow, write a
`human-gate: interactive browser required` receipt with the exact URL and keep
safe API, repository, test, and evidence work moving.

The `bw` fallback uses a short-lived session in a project-specific CLI app-data
directory. The helper passes the session to each command instead of exporting
`BW_SESSION`, keeps the master password in a child-process environment only,
serializes that project CLI app-data directory, and locks it on close. It does
not call a global `bw lock` against another task's session.

## Prohibited actions

- Do not copy the upstream repository as a 1:1 source because it has no license
  and its security model is too broad for Factory use.
- Do not use one global Keychain item for every project or worker.
- Do not return a credential without a target URL, exact origin check, and
  repository-name item binding.
- Do not use `Solvys Override` before visible proof that the primary identity
  lacks the requested approved-provider resource.
- Do not create or edit vault items from an agent task. The initial lane is
  read-only. Human setup owns item creation and machine-account issuance.
- Do not put a Bitwarden token in a commit, prompt, issue, handoff, screenshot,
  environment file, or browser URL.
- Do not claim a login or provider task is complete until the target readback
  proves the account and requested action.

## Infraction and learning hooks

If the phrase `infraction committed` is used, record the mechanism in the
project ledger before continuing. Repeat the same mechanism without new
evidence and mark the entry as a death loop. If TP says `skill that`, create a
skill proposal for the roadblock. If TP says `Update the C-Cab with that
Breakthrough`, promote the repair to the smallest durable Factory layer.

## Proof and closeout

Return a receipt with the project, backend, policy path, target origin, account
label, secret names or IDs, scope, expiry, proof rung, and human gate. Leave
secret values out. Preserve the exact browser or app target when the next task
owns the same provider session. Run the focused policy and script checks before
calling the skill review-ready.
