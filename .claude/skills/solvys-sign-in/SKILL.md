---
name: solvys-sign-in
description: Complete authorized sign-ins for Solvys projects and providers without dead loops. Use only when a target is unauthenticated, redirected to login, missing the required scope, or showing an identity mismatch. Do not invoke it for an already-authenticated target session.
---

# Solvys Sign-In

Read the project Welcome Mat and read your assigned PL, PM, DEV, or CAO lane sign before any sign-in action.

## Purpose

Treat sign-in as a state machine with a known finish. The first login screen is
an action prompt, not a blocker. Follow the authorized chain, prove the final
account and target, and keep secrets out of chat, files, receipts, and logs.

Run the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) before
reaching for a credential or automation path: YAGNI (does this new path need to
exist), existing repo seam, standard library or native platform, already-installed
dependency, maintained OSS with lower ownership cost, one line, then the minimum
custom code. Does an existing credential lane or installed tool already solve it,
does the platform or vendor SDK cover it? Only then the minimum new code. Never
use the ladder to skip MFA, consent, scoped-credential, or least-privilege
requirements.

Sign-in has two separate lanes:

- **Interactive bootstrap:** regular Chrome on an awake, unlocked control
  device establishes or renews a human Google or provider session.
- **Machine execution:** Cloud tasks, CI, and workers use short-lived API or
  provider credentials issued into their authorized environment. They do not
  depend on Chrome, Paste, a local Keychain, or an unlocked Mac.

A headless browser can automate an already-authorized web session. It cannot
replace Google's password, MFA, risk, consent, or device-approval controls.
Do not classify a locked Mac as an agent permission failure until the task's
machine credential path has been checked.

## Session-state gate

Before opening a login or OAuth URL:

1. Inspect the exact target surface, visible account, browser profile, and
   provider state.
2. Treat the existing browser session as the first credential surface. When the
   provider offers a valid Continue, remembered account, account-selection,
   passkey, or authenticator path, use that path before any vault lookup or
   password attempt. Retrieve a project-scoped Bitwarden credential only when a
   real credential prompt remains or that supported continuation fails.
3. If the authorized account is already signed in on the exact target tab,
   reuse it. Do not open a new OAuth callback, Google account selector, QR flow,
   relink, or duplicate provider session.
4. Invoke this skill only when the target redirects to sign-in, the session has
   expired, the visible identity is wrong, or the requested scope is missing.
5. Treat a preserved authenticated provider tab as usable proof for the next
   task action. Do not turn provider work into a new login task.

An already-authenticated WhatsApp Web tab is a provider session. Reuse the
preserved tab, do not open QR or relink, and do not ask TP to sign in again.

## Required entrance

Before opening a login page:

1. Load `$solvys-factory` and complete the project entrance. Read `WELCOME.md`
   when it exists. If it does not exist, read the registered onboarding
   composite (`AGENTS.md`, `CLAUDE.md`, `README.md`, `SETUP.md`, `WORKSPACE.md`,
   `PRODUCT.md`, and `DESIGN.md` when present), then read the assigned lane
   sign, project manifest, active Sprint Unit, latest receipt, and relevant
   Paste project folder. If Paste MCP is used, keep the Paste app and MCP
   connection open; never close it or terminate its sync process.
2. Identify the exact provider, project, account label, target URL or CLI, and
   requested action. Record the secret names or Paste references only.
3. Check whether another active task owns the provider tab or MCP connection.
   Reuse its exact handoff and target when possible. Do not start duplicate
   OAuth callbacks, browser profiles, or MCP sessions.
4. Write or update the entrance and sign-in receipt before claiming a blocker.

## Standard authorization chain

Use this order unless the project Welcome Mat declares a narrower route:

1. Open Paste and search for the exact project name first. Select the project
   folder from the search suggestion, open that folder, and restrict the next
   search to that folder. Do not search for a guessed credential label such as
   `CRED Gmail Password`. The approved password names are `Primary Project
   Password` and `Secondary Project Password`; use the one that matches the
   authorized project identity and record the label used, never the value. The
   project folder is the password authority. Keep Paste open for the entire
   task and handoff, and never ask TP to type or reveal a password that is
   present there. Never print or copy the credential value into a prompt, source
   file, shell history, or receipt.
2. Copy the selected password only into the authorized regular Chrome password
   field. For a primary project identity, use `Primary Project Password`; use
   `Secondary Project Password` only when the target identity or project record
   identifies the secondary account. If the account mapping is unclear, stop at
   the identity check and resolve it from the project record instead of trying
   both passwords or asking TP to reveal either value.
3. When Google Sign-In requires the project password, use regular Chrome. Do
   not enter the project password in Chrome Dev. Google's security warning is a
   browser-profile mismatch, not a reason to abandon the sign-in.
4. Select **Sign in with Google** or **Continue with Google** in regular Chrome.
   When Google's confirmation page asks whether to continue, select
   **Continue**. When the provider consent page appears, select **Allow access**
   or its exact equivalent.
5. Use the Codex in-app browser for provider readback when it has the needed
   session. Use the authorized project Chrome development profile only after
   Google authentication when the existing provider session, device approval,
   or editor requires it. Do not switch browser families silently.
6. If the device sends a phone notification, QR approval, MFA code, CAPTCHA, or
   policy decision, keep the exact page open and let the authorized human
   approve it. Prefer the provider's **Text me a code** or SMS option when it
   exists. If text is unavailable, trigger the Google Prompt **Tap Yes** or
   **Tap the number** fallback. Ask only for the live approval or code that the
   page requests. Never ask for a project password when the value is in the
   project-specific Paste folder and never claim that a password, MFA, or
   provider policy is blocking the agent before the complete chain is attempted.
7. After the redirect, verify the visible account, organization, project,
   route, and the requested read or write capability. A consent success page
   alone is not provider proof.

## Machine credential lane

Before a task depends on a password-backed web login, check for an API, CLI,
service account, OAuth refresh token, OIDC federation, or provider secret path.
Prefer that path for work that must continue while the Mac is locked.

When the project manifest or receipt names Bitwarden, load `$solvys-bitwarden`
before retrieving a credential. Prefer its read-only Bitwarden Secrets Manager
machine-account path. Use its official `bw` fallback only with the project
policy, project-isolated app data, and project-specific Keychain reference.
Never route a worker through a global Keychain item or a human browser password
when the scoped machine path exists.

1. Bootstrap the credential once through the authorized interactive lane.
2. Store the resulting credential in the project's approved machine store or
   provider environment. Paste remains the source reference; it is not the
   worker's runtime dependency.
3. Issue the worker only the minimum project, environment, and action scope.
4. Use short-lived tokens or provider-native rotation where supported.
5. Record the secret name, issuer, scope, expiry, rotation owner, and proof rung;
   never record the value.
6. Revoke the machine credential when the sprint, project, or owner changes.

For Google Workspace APIs, use a project-owned OAuth client or service account
with only the required scopes. Domain-wide delegation requires explicit
Workspace administrator approval. It does not authorize a browser UI session.

For Cloudflare-protected internal services, use a scoped Access service token or
OIDC path for the worker. Do not use a human Google password as an API token.

## Locked-device rule

When the Mac is locked:

- Continue Cloud, CI, API, deployment, test, and receipt work through the
  machine credential lane.
- Use a project-scoped Bitwarden Secrets Manager token when the project policy
  provides one. The token name and scope belong in the receipt. The token value
  stays in the task environment.
- Do not launch a new Google web login, ask for a browser MFA prompt, or claim a
  password blocker from a headless session.
- If only a web UI exists, mark the task `human-gate: interactive browser
  required`, preserve the exact URL and state, and continue every safe API or
  repository action in parallel.
- Do not weaken macOS Keychain protections to make a local worker appear
  autonomous. Apple's default login keychain is tied to device lock state.

## Provider playbooks

### Wonder

- For Google Sign-In or a project password, use regular Chrome. Do not enter
  the password in Chrome Dev. Open Paste, search the exact project name, open
  the folder from the search suggestion, then use the item titled `Primary
  Project Password` or `Secondary Project Password` that matches the authorized
  identity. Use it in regular Chrome without asking TP to type it. After Google
  finishes, use the same browser or
  hand the authorized provider session to Chrome Dev when the editor requires
  that profile.
- Use the authorized Solvys Wonder account `sam@solvys.io` when the project
  record or TP authorizes it.
- Select **Continue with Google**, then **Continue**, then **Allow access**.
- Keep the exact Wonder file, branch, page, and editor canvas open. After a
  consent success page, return to the target canvas in the same browser.
- Use one active Wonder editor and one MCP connection per task. If the editor
  reports that it is not connected, keep the target canvas focused and wait for
  it to load before retrying the same read.
- Verify `get_basic_info`, the current branch/page, and a read-only artboard or
  screenshot before any mutation. Preserve human-owned frames and accepted
  baselines.

### Pen.dev

- Pen.dev is the primary editable design surface. Start its desktop application
  or CLI before trying a fallback design surface. Its local MCP server starts
  with the application and exposes the open `.pen` document to the agent.
- Use this connection order for collaborative frontend work:
  1. Desktop application with its local MCP server on the same `.pen` file. This
     is the live shared-canvas path for a human and Luna Max.
  2. CLI interactive app mode connected to the running desktop application.
     This keeps the agent and canvas in one live document when direct MCP
     attachment is unavailable.
  3. CLI headless mode on a repository-owned `.pen` file. Use it for repeatable
     file edits, exports, and non-live review.
  4. Project-scoped CLI key in a Cloud or CI credential store. Use it for
     unattended automation after its scope and organization are verified.
  5. Wonder only after the Pen.dev chain is attempted and recorded. Preserve
     the existing Wonder source and any human-owned frames.
- Reuse an authenticated Pen.dev desktop or CLI session when it owns the target
  document. Otherwise, open Paste, search the exact project name, and use the
  password stored in the same project folder and credential path used for
  Wonder. Record the item reference only. Never copy its value into chat,
  prompts, source, shell history, or receipts.
- Prefer a project-scoped CLI key for Cloud or CI work. Store the key in the
  approved machine credential store, record its name and scope only, and use
  the interactive login route only to bootstrap or renew that key.
- Verify the authenticated organization and target `.pen` file with the CLI or
  desktop readback before editing. Keep one active editor/MCP connection per
  document, preserve accepted source baselines, and use Wonder only after the
  Pen.dev connection chain has been attempted and recorded.

### GitHub

- Use the stored GitHub CLI credential and confirm `gh api user --jq .login`
  returns `nicharacci` before repository writes.
- Keep organization work under `solvys-technologies` when GitHub confirms that
  owner. Do not create new personal remotes under the retired `solvys` name.
- Use GitHub Mobile or the authorized phone approval for device confirmation.
  Send or enter only the digits requested by the live GitHub page.

### Slack, Linear, and OpenProject

- Use the project Google identity and the project workspace. If a connector
  opens the wrong workspace, use the browser login and select the correct one.
- If Google shows a password screen, open Paste, search the project name, open
  the suggested project folder, and retrieve the matching `Primary Project
  Password` or `Secondary Project Password`. Use regular Chrome; do not search
  for a guessed label or ask TP to enter a password that Paste already stores.
- Confirm the workspace, team, project, channel, and issue before writing.
- Keep Linear as issue authority until the Solvys-2/OpenProject migration gate
  is accepted.

### Vercel, Cloudflare, Fly, Supabase, and ChatGPT Sites

- Confirm the provider account, organization, project, environment, and target
  before CLI or console writes. Use the provider's `whoami` or equivalent
  readback when available.
- Keep provider credentials in Paste or the approved credential store. Record
  names and references only.
- Use the project ChatGPT Site for frontend runtime proof. Use Pen.dev for
  proposals and diffs, with Wonder as the fallback. Do not substitute a local
  preview for live proof.

## Loop breakers

- Never stop at the first login page. Continue through Google, **Continue**,
  provider consent, device approval, redirect, and target readback.
- If the target is already signed in with the authorized account, stop the
  sign-in chain before opening a new auth flow and continue the requested task.
- If the same sign-in action produces no new state twice in one work window,
  stop that action. Record or increment an `auth` or
  `automation-death-loop` infraction with evidence, inspect the shared cause,
  and use the authorized alternate surface or existing task handoff before one
  final retry.
- A human-only MFA, CAPTCHA, terms acceptance, or organization policy prompt is
  a review gate. Show the exact page and request the smallest approval. It is
  not a reason to abandon safe work or invent a successful receipt.
- If the project-specific Paste folder is unavailable, keep Paste open and
  record that exact source failure. Do not ask TP for a password by default or
  replace the project credential with a different account.
- If a provider has one-editor or one-MCP limits, serialize access through the
  handoff. Do not create duplicate authorization links or claim that the
  provider is unavailable.

## Proof and closeout

Record the provider, account label, target, timestamp, final route or CLI
readback, requested capability, proof rung, and any human gate. Keep passwords,
tokens, cookies, QR contents, MFA codes, and browser storage out of the record.

Leave the authorized tab and editor target open when another active task needs
it. Update the task handoff with the exact target and next action. If the
provider state is unchanged, produce no repetitive user-facing update. If Paste
MCP was used, leave the Paste app and MCP connection open at closeout so iCloud
sync remains available to TP and the next task.
