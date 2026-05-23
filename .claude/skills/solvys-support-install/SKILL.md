---
name: solvys-support-install
description: "Install the Solvys client support loop in an app: remote incident capture, Supabase incident/update records, automatic Linear issue filing to Solvys, admin health UI, smoke tests, and scheduled Codex resolution sync. Use when adding support automation for a client deliverable or PWA."
---

# Solvys Support Install

You install the standard Solvys support loop into a client app so errors turn into actionable Linear tickets before the client has to complain.

## Outcome

The app must ship with:

- Remote incident capture for client/runtime/API/PWA/integration failures.
- A durable incident sink, preferably Supabase when available.
- Automatic Linear issue creation to the Solvys team.
- A client/admin-visible health panel with Linear links and published fix records.
- A smoke test that proves the support pipeline before handoff.
- A scheduled Codex job or documented equivalent that watches completed Linear issues and publishes client setup update records.

## Discovery

Before editing, inspect:

1. App framework and routing.
2. Existing database/schema/migration system.
3. Existing admin/dashboard surfaces.
4. Existing env handling and `.env.example`.
5. Existing Linear, Supabase, Sentry, or telemetry code.
6. Current deployment/update path for the client setup.

Preserve existing support tooling. Extend it instead of replacing it unless it is nonfunctional.

## Default Architecture

Use this unless the repo already has a stronger local standard:

- Database tables:
  - `support_incidents`: source, route, message, severity, fingerprint, status, occurrence count, stack, context, admin action, Linear issue fields, raw payload, first/last seen, resolution fields.
  - `app_update_records`: incident id, title, summary, Linear issue fields, commit sha, status, published/applied timestamps.
- API routes:
  - `POST /api/incidents`: validate, dedupe, store, auto-file Linear.
  - `GET /api/incidents`: return open incidents and recent update records for admin UI.
  - `POST /api/incidents/:id/linear`: privileged retry/helper for filing Linear.
  - `POST /api/incidents/sync-resolution`: privileged endpoint used by scheduled Codex to publish update records.
- Client capture:
  - React error boundary.
  - `window.error` and `unhandledrejection`.
  - Explicit capture around fragile integrations.
- Linear filing:
  - Team/project: Solvys.
  - Assignee: `LINEAR_DEFAULT_ASSIGNEE_ID`.
  - Labels/body: `client-incident`, app slug, severity.
  - Priority: critical=1, high=2, medium=3, low=4.

## Required Env

Add documented env vars without printing secrets:

```text
INCIDENT_WEBHOOK_SECRET=
LINEAR_API_KEY=
LINEAR_DEFAULT_ASSIGNEE_ID=
LINEAR_SOLVYS_TEAM_ID=
LINEAR_SOLVYS_PROJECT_ID=
LINEAR_INCIDENT_LABEL_IDS=
```

If Supabase is used, ensure the repo's existing Supabase service env is documented too.

## Implementation Rules

- Never let incident reporting crash the app.
- If Linear filing fails, keep the incident and mark it `linear_failed`.
- Dedupe by fingerprint for open incidents.
- Add a dry-run smoke mode when live env may be unavailable.
- Admin UI copy must be calm and operational: "System health", "Needs eyes", "Setup needed", "Fix published".
- Do not expose internal secrets, raw stack traces, or write-access controls to unauthenticated users.
- If auth/RLS exists, admin incident reads should be admin-only; update records may be public/read-only when useful.

## Smoke Test Requirement

Before declaring success, run a smoke that proves at least:

1. Incident payload validation.
2. Dedupe/fingerprint behavior.
3. Linear priority/payload shaping.
4. Incident health endpoint shape.
5. Live ticket creation if Supabase and Linear env are configured.

If live env is missing, say exactly which vars are missing and report the smoke as dry-run only.

## Scheduled Codex Resolution Sync

Create or document a scheduled Codex automation:

- Poll Linear for completed SSFitness/client incident issues.
- Confirm fix metadata from comments, PRs, commits, or deploy notes.
- Call `/api/incidents/sync-resolution` with `INCIDENT_WEBHOOK_SECRET`.
- Write an app update record.
- Mark the incident resolved.
- Comment in Linear that the client update record was published.

Prefer a Codex scheduled task over a local watcher unless the user asks for local-only.

## Final Report

Include:

- Files/features added.
- Migration/table names.
- Env vars required.
- Smoke results, including dry-run vs live.
- Scheduled job name/frequency, if created.
- Any unresolved setup gaps.
