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

## Session-state gate

Before opening a login or OAuth URL:

1. Inspect the exact target surface, visible account, browser profile, and
   provider state.
2. If the authorized account is already signed in on the exact target tab,
   reuse it. Do not open a new OAuth callback, Google account selector, QR flow,
   relink, or duplicate provider session.
3. Invoke this skill only when the target redirects to sign-in, the session has
   expired, the visible identity is wrong, or the requested scope is missing.
4. Treat a preserved authenticated provider tab as usable proof for the next
   task action. Do not turn provider work into a new login task.

An already-authenticated WhatsApp Web tab is a provider session. Reuse the
preserved tab, do not open QR or relink, and do not ask TP to sign in again.

## Required entrance

Before opening a login page:

1. Load `$solvys-factory` and complete the project entrance. Read `WELCOME.md`,
   the assigned lane sign, project manifest, active Sprint Unit, latest receipt,
   and the relevant Paste project folder. If Paste MCP is used, keep the Paste
   app and MCP connection open; never close it or terminate its sync process.
2. Identify the exact provider, project, account label, target URL or CLI, and
   requested action. Record the secret names or Paste references only.
3. Check whether another active task owns the provider tab or MCP connection.
   Reuse its exact handoff and target when possible. Do not start duplicate
   OAuth callbacks, browser profiles, or MCP sessions.
4. Write or update the entrance and sign-in receipt before claiming a blocker.

## Standard authorization chain

Use this order unless the project Welcome Mat declares a narrower route:

1. Search the project-specific Paste folder by codebase, repo, or workspace
   title first. That folder is the password authority for the project. Use the
   stored credential through the approved surface, keep Paste open for the
   entire task and handoff, and never ask TP to type or reveal a password that
   is present there. Never print or copy the credential value into a prompt,
   source file, shell history, or receipt.
2. When Google Sign-In requires the project password, use regular Chrome. Do
   not enter the project password in Chrome Dev. Google's security warning is a
   browser-profile mismatch, not a reason to abandon the sign-in.
3. Select **Sign in with Google** or **Continue with Google** in regular Chrome.
   When Google's confirmation page asks whether to continue, select
   **Continue**. When the provider consent page appears, select **Allow access**
   or its exact equivalent.
4. Use the Codex in-app browser for provider readback when it has the needed
   session. Use the authorized project Chrome development profile only after
   Google authentication when the existing provider session, device approval,
   or editor requires it. Do not switch browser families silently.
5. If the device sends a phone notification, QR approval, MFA code, CAPTCHA, or
   policy decision, keep the exact page open and let the authorized human
   approve it. Prefer the provider's **Text me a code** or SMS option when it
   exists. If text is unavailable, trigger the Google Prompt **Tap Yes** or
   **Tap the number** fallback. Ask only for the live approval or code that the
   page requests. Never ask for a project password when the value is in the
   project-specific Paste folder and never claim that a password, MFA, or
   provider policy is blocking the agent before the complete chain is attempted.
6. After the redirect, verify the visible account, organization, project,
   route, and the requested read or write capability. A consent success page
   alone is not provider proof.

## Provider playbooks

### Wonder

- For Google Sign-In or a project password, use regular Chrome. Do not enter
  the password in Chrome Dev. Retrieve the project password from the
  project-specific Paste folder and use it in regular Chrome without asking TP
  to type it. After Google finishes, use the same browser or
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
- If Google shows a password screen, retrieve the password from the
  project-specific Paste folder and use regular Chrome; do not ask TP to enter
  a password that Paste already stores.
- Confirm the workspace, team, project, channel, and issue before writing.
- Keep Linear as issue authority until the Solvys-2/OpenProject migration gate
  is accepted.

### Vercel, Cloudflare, Fly, Supabase, and ChatGPT Sites

- Confirm the provider account, organization, project, environment, and target
  before CLI or console writes. Use the provider's `whoami` or equivalent
  readback when available.
- Keep provider credentials in Paste or the approved credential store. Record
  names and references only.
- Use the project ChatGPT Site for frontend runtime proof. Use Wonder for
  proposals and diffs. Do not substitute a local preview for live proof.

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
