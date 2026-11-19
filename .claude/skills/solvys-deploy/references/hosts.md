# Host runbooks

Per-host deploy mechanics. The routing table in SKILL.md decides WHICH host; this file has the HOW. Project docs in each repo override anything here — read them first when they exist.

## Vercel

Standard Next.js/JS-framework app:

```bash
vercel whoami                                   # auth check
vercel link                                     # once per checkout, if .vercel/ missing
vercel pull --yes --environment=production      # sync project settings + env
vercel build --prod                             # production build
vercel deploy --prebuilt --prod                 # ship it; capture the deployment URL
```

- Monorepo with `services` in `vercel.json` (e.g. solvers): run `vercel deploy --prod` from the repo ROOT, not a subdirectory — the services config resolves roots itself.
- Prebuilt mobile/static dirs: `rm -rf dist && <build>` before `vercel build` — stale bundles have shipped before.
- Preview: `vercel deploy` (no `--prod`) from the branch, or push a branch and let git-integration build a preview. Report the `*.vercel.app` URL.
- Env vars: `vercel env ls` / `vercel env add NAME production|preview`. `NEXT_PUBLIC_*`/`VITE_*`/`PUBLIC_*` are public — never secrets.
- If CLI auth is missing: `vercel login` (interactive → Yab/human) or a token from 1Password injected as `VERCEL_TOKEN` for the single command. Never write the token to disk or chat.

## Cloudflare Worker (wrangler)

```bash
wrangler whoami                                  # auth check (OAuth or CLOUDFLARE_API_TOKEN)
wrangler deploy                                  # from repo root; uploads worker + triggers
wrangler deployments list                        # proof: new version id + timestamp
wrangler secret put NAME                          # secrets — never `vars` in wrangler.jsonc for secrets
```

- `wrangler.jsonc` carries `account_id`, `routes`, `triggers.crons`, `durable_objects`, `vars`. Routes like `waam.solvys.io/*` deploy with the worker — no separate step.
- Cron triggers deploy atomically with the worker; verify `wrangler deployments list` shows the new version, then hit a routed URL for live proof.
- Multiple workers: check `wrangler.jsonc` `name` before assuming the target; cred-pipeline's worker name is `cred-pipeline`.

## TestFlight (credlist ios-shell, focalcut apps/ios)

Builds run on the **Mac Mini** (`ssh tifos@mac-mini`, Tailscale) — not on Linux.

```bash
ssh tifos@mac-mini 'cd <repo> && xcodebuild archive -scheme <Scheme> -archivePath <path> -allowProvisioningUpdates'
ssh tifos@mac-mini 'xcodebuild -exportArchive -archivePath <path> -exportOptionsPlist <plist> -allowProvisioningUpdates'
# exportOptionsPlist: destination=upload, method=app-store-connect, signingStyle=automatic
```

- Signing: App Store Connect API key. credlist stores it in 1Password as **"App Store Connect API - CREDList"** (fields `issuer_id`, `key_id`, `team_id`, `bundle_id`, `app_apple_id`, .p8 attached); the .p8 lives at `~/.appstoreconnect/private_keys/` on the Mini. Full account-setup history: `credlist/ios-shell/TESTFLIGHT-KEY-HANDOFF.md`.
- NEVER use `~/.fintheon/signing` keys on the Mini — different Apple team.
- Apple web steps (developer.apple.com, appstoreconnect.apple.com — agreements, identifiers, API keys, tester groups) go through **Yab**; hand off for passwords/2FA/agreements. Account Holder-only actions are human-only, always.
- After upload: the build sits in "Processing" in App Store Connect for minutes. Report "uploaded, processing" — it is not on devices until processing finishes and a group has access.

## GitHub releases / Tauri desktop (solvers)

- `desktop-release.yml` fires on pushes to `main` touching `deployment/web/desktop/**`; `desktop-release-tag.yml` handles tag pushes. Both build Tauri bundles (macOS universal + Windows) and publish GH releases.
- To ship desktop: merge/tag per the repo's convention, then verify the release exists via `gh release list -R solvys-technologies/solvers`.
- Do not hand-build DMGs locally unless the repo doc says so — CI owns the artifacts.

## Fly.io (Fintheon legacy only)

```bash
cd backend-hono && fly deploy --yes     # app 'fintheon' → fintheon.fly.dev
```

- NEVER `fly deploy` from repo root — root Dockerfile is a static server.
- NEVER target `pulse-api-*` apps — deleted legacy.
- Mobile PWA: `cd mobile && rm -rf dist && npx vite build && vercel build --prod && vercel deploy --prebuilt --prod`.
- Desktop frontend: `cd frontend && vercel build --prod && vercel deploy --prebuilt --prod`.

## Generic fallback

If none of the above match: read `package.json` scripts, `README`/`docs/` deploy sections, CI workflows, and hosting configs (`vercel.json`, `wrangler.*`, `fly.toml`, `netlify.toml`, `render.yaml`, `app.json`/`eas.json`). Use the repo's own documented path. If nothing is documented, report that the repo has no established deploy path and propose options — do not guess a host.
