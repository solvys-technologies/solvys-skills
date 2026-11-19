---
name: solvys-deploy
description: Ship Solvys work to its real host — Vercel preview/production, Cloudflare Workers, TestFlight, GitHub/Tauri releases. Turn-key: invoke on ANY deploy, preview, release, ship, or "push it live" request. Detects the repo's host, resolves credentials, deploys, verifies the live URL, and reports evidence. This skill has side effects — it deploys code.
---

# Solvys Deploy — Ship to the Repo's Real Host

You are the release engineer. When this skill fires, **just do it**: classify the request, pick the path, run it, verify live, report. The only questions you ask are the ones this skill explicitly requires. Everything else — host detection, credential resolution, pre-flight, verification — is your job.

## Authority (read before any side effect)

- **Frontend production sign-off**: only the **Frontend Wonderer, Super Foreman, or CAO** may sign off a frontend deployment (owner rule, verbatim). In Wonder you ARE the Frontend Wonderer — you may sign off frontend deploys yourself. Any other agent role: prepare everything, then hand the deploy step to an authorized role; do not deploy a frontend to prod alone.
- **Wonder 1:1 rule** (`factory/canon/frontend-wonder-source-of-truth.md`): never deploy UI that diverged from the Wonder-approved revision. Record MATCHED / DIVERGED / BLOCKED. BLOCKED stops the deploy.
- **Solvys Factory rules apply** inside factory workspaces: read the repo's `AGENTS.md`, current manifestos, and `workflow/` routing when present. Ponytail ladder before adding any deploy tooling — prefer the repo's existing scripts and the host's CLI over new code.
- **Human gates stay human**: Apple account agreements, payments, 2FA, CAPTCHA, license acceptances → Yab handoff. Never type a password, never accept an agreement, never enter a payment.

## Step 0 — Classify (no questions yet)

- **PREVIEW** requested → Step P.
- **PROD / RELEASE / SHIP** requested → Step R.
- Ambiguous ("deploy 0.5.0", "ship it") → Step R against the repo's primary production host. If the repo has multiple prod hosts and the request doesn't name scopes, ask ONE scoping question (which surfaces) — never guess between prod targets.

## Step P — Preview

**Always clarify the host once** unless the user already named it:

> "Vercel preview or Wonder Preview?"

- **Vercel preview** → run the host runbook in `references/hosts.md` for a non-production deployment (branch/preview deploy). Report the preview URL.
- **Wonder Preview** → this is the managed Preview bound to the worktree's dev server, per `solvys-wonder`. Start/inspect it through Wonder's Preview controls; do NOT `vercel deploy` for it and do NOT spin a duplicate dev server. Canvas, source, Preview, and deploy evidence stay separate.
- **Wonder Publish-to-web** (`*.preview.wonder.design`) → only on explicit request. It is Wonder-hosted, Pro-gated, not our stack — never substitute it for a Vercel/Cloudflare preview.

## Step R — Production (auto-route, no host question)

1. **Detect the host** from the routing table below; if the repo isn't listed, run the detection procedure.
2. **Pre-flight** (below). FAIL = stop and report, do not deploy around it.
3. **Deploy** via the matching runbook in `references/hosts.md`.
4. **Verify live** (below). Unverified = not done.
5. **Report**: host, URL, commit/version deployed, verification evidence.

## Host routing table (verified 2026-11-19 — re-detect if the repo changed)

| Repo | Host | Production path |
|---|---|---|
| `credlist` | Vercel (Next.js) **and** TestFlight iOS | Web: `vercel deploy --prod` or merge-to-main auto-deploy. iOS: `ios-shell/` → `xcodebuild archive` + `-exportArchive` on the Mac Mini (`ssh tifos@mac-mini`), ASC API key from 1Password. See `ios-shell/TESTFLIGHT-KEY-HANDOFF.md`. |
| `cred-pipeline` | Cloudflare Worker | `wrangler deploy` from repo root (`wrangler.jsonc`, account `e7a583857399cb19fd86f879c3a4629f`, routes on `waam.solvys.io`, cron triggers). |
| `solvers` | Vercel (services config) **and** Tauri desktop | Web: `vercel deploy --prod` — `vercel.json` uses `services.web`, run from repo root. Desktop: tag/push triggers `.github/workflows/desktop-release*.yml` (Tauri universal macOS + Windows, GH releases). |
| `focalcut` | TestFlight iOS **and** web surfaces | `apps/ios` → Xcode/TestFlight (see `SESSION-*-testflight.md` docs). `apps/prototype`/`apps/native-preview` → Vercel when a `vercel.json`/project link exists; otherwise preview-only until a prod target is confirmed. |
| `Fintheon` (legacy) | Fly.io + Vercel + DMG | Backend: `cd backend-hono && fly deploy` (app `fintheon`, NEVER repo root, NEVER `pulse-api-*`). Frontends: prebuilt Vercel from `frontend/` and `mobile/` (`rm -rf dist` first). Desktop: DMG to `~/Desktop`. |

Multi-host repos: a bare "deploy" ships **all** the repo's production surfaces unless the request scopes it (e.g. "deploy the iOS build" → TestFlight only). State which surfaces you shipped in the report.

## Host detection (when the table misses)

Look for, in order: `vercel.json` → Vercel · `wrangler.toml`/`wrangler.jsonc` → Cloudflare Worker · `fly.toml` → Fly.io · `eas.json`, `ios-shell/*.xcodeproj`, `apps/ios` → Apple/TestFlight · `.github/workflows/*release*` → GH releases/Tauri · `package.json` scripts named `deploy`/`release`/`deploy:*` · `docs/` files matching `*deploy*`, `*TESTFLIGHT*`, `*HANDOFF*`, `*setup*`. Read the repo's own deploy docs before inventing commands — project docs beat this table.

## Credentials (resolve in order; NEVER print values)

1. **Environment** — check the var/CLI auth already present (`vercel whoami`, `wrangler whoami`, `gh auth status`, `fly auth whoami`).
2. **1Password** — `op` CLI, vault **"Agentic Keychain"** (service account is read-only: reads OK, writes need the user). Canonical consumer skill: Kit Langton `2password`; `OP_SERVICE_ACCOUNT_TOKEN` is the only env bootstrap secret. Reference secret NAMES only.
3. **Ask the user** — only when neither source has it. Never collect secrets in chat; point at the provider's secret-entry surface.

Auth flows and browser-gated steps follow `solvys-sign-in` (machine lane = API creds in env; interactive lane = Yab/regular Chrome). Password-gated web work — Apple Developer, App Store Connect, Vercel/Cloudflare dashboards, Google — goes through **Yab** (the user's own signed-in browser); hand off via Yab for passwords, 2FA, agreements, payments.

## Pre-flight (every deploy)

- `git status` — commit intentional work; never sweep unrelated dirty files into a deploy commit. Deploy from the intended branch; warn if behind remote.
- Build/check green: the repo's own scripts (`package.json`, `turbo`/`pnpm -r`, `tsc --noEmit`, tests scoped to the change). No dev-server-only verification for prod.
- Version/changelog per repo convention (git tags, `package.json` version, `CHANGELOG`, project docs). If the repo doesn't version, don't invent one — deploy the commit and say so.
- Env vars: confirm names exist for the target environment (prod vs preview) before deploy; `NEXT_PUBLIC_*`/`VITE_*`/`PUBLIC_*` values ship to browsers — never put secrets in them.
- No placeholder or fake behavior ships. If a required input is missing, stop and name it.

## Post-deploy verification (mandatory)

- Hit the live URL: HTTP 200 + expected markers (version string, title, asset hash, `/api/health`-style endpoint if present).
- Host-specific proof: Vercel → deployment URL + alias; Worker → `wrangler deployments list` / version id; TestFlight → build visible in App Store Connect (processing takes minutes — report "uploaded, processing" honestly, never "live on devices").
- On failure: fix-and-redeploy, max 3 attempts, then escalate with evidence (logs, HTTP codes, what changed).

## Hard boundaries

- Never deploy to a host the repo doesn't use; never create a new hosting target silently — propose it and wait.
- Never expose secrets in logs, chat, commits, or receipts. Env var NAMES only.
- TestFlight processing, App Store review, paid plans, domain changes, and anything with legal/financial effect → human handoff via Yab, always.
- Previews are disposable; prod deploys are real. One scoping question beats a wrong prod target — but never re-ask what the user already answered.
