# CRED manifesto

Read this before `AGENTS.md`, Wonder, S008, any Cursor goal, and `docs/listings-pipeline-system.md`. If those files disagree with this one, this file wins until a human revises it.

Copy this file to `gp-cred` and CREDList when those remotes exist. Until they do, `solvys-technologies/cred-cowork` is the home.

Sources: Sam's operating law on 2026-09-05, the original Promotions-to-WhatsApp job, and `proposals/CRED-Phase-2-Forward-Deployed-Engineering-Proposal.md` (5 August 2026). A later signed PDF may replace commercial terms. It does not replace P0 unless it names a different paid outcome.

## The job

Gmail Promotions in. WhatsApp group out.

Intake mailbox: Promotions on `sam@creativerealestatedeals.com`. Peek only. Do not open Gmail. Do not mark mail read.

The card in the group is an InvestorPost. Address with city/ST/ZIP when the source had them. Beds, baths, living sqft, price. ARV optional, at most once. A photo a buyer can use to recognize the house from the curb.

Ship that path fast. Leave it running. Imperfect listings that land in the group beat a perfect board that never posts.

## Who pays

Client: Creative Real Estate Deals (CRED). Pombo owns real-estate decisions. Sam is the FDE and controlling manager (`sam@solvys.io`).

CRED's business runs on WhatsApp. They post listings to a group. That is how the money moved last year.

Solvys is a forward-deployed engineering team. We solve that operating problem. We do not grow a SaaS company on top of it.

Phase 2 is exception-driven. Healthy automation does not need a 34-hour build. Normal attention on a healthy day is a short exception review, not a product rewrite.

## Priority stack

Do the next item only after the one above it is true in the real world.

1. **P0. Listing.** A Promotions listing is in the destination WhatsApp group. Today that destination is Test Group until Sam switches it back to Creative Deals. Duplicate scan still covers every membership group.
2. **P1. Speed.** Ingest to send is short. Semi-Auto Send and drop-to-Queued fire. Auto sends when the gate passes. A trigger that replaces a working heartbeat is a regression.
3. **P2. Sight and hands.** WAAM is a visual look at that pipe with the option to turn it: power, Hold, Send, Enrich, Select, Reject. Humans can tell whether the worker should be rebuilt because the board shows whether listings are landing.
4. **P3. Stay up.** IMAP stays connected. Secrets stay in every environment that runs. Power stays honest. Exception review per the Phase 2 schedule.

Board cards with no group message are a P0 failure.

## Real-world done

Done means a human in the WhatsApp group can see the listing, recognize the house, and read the deal facts.

Not done: Kanban counts, Maps HTTP 200, toast copy, Wonder parity, tsc green, a Situation snapshot, or "photos are in their proper place" when the photo is a roof.

The original ship target was about three days, then leave the path alone. Months of cockpit work with a silent group is the failure that already cost this account once.

## Customer intuition

Ask what the person in the group sees. Then fix that.

Aerial or satellite on the card: the customer cannot see the property. Fix the image. Prefer source Drive photos. Then street-level house imagery. Overhead is last resort and still a fail if a house photo was possible.

Google mark on the frame: the card looks unfinished. Fix the image.

Cards on Tracked, Queued 0, group silent: the send path is broken. Do not polish the board.

1Password logged out, IMAP `ok: false`, env empty: the machine cannot do P0. Log in. Create service accounts for Production and Preview. Put the named secrets in each environment. Prove Promotions LOGIN. Then send. Do not keep probing the same failing LOGIN.

## Out of scope

These stay out unless a human writes a new scope, price, and acceptance:

- New websites, marketplaces, buyer portals, Deal Rooms
- Goalpost CRM product work
- A second brain beside GoalBot
- Bird's-eye command-center rebuilds
- Replacing a working send path with a new architecture because the UI looks incomplete
- Opening Gmail to "check" Promotions
- `--prod` of Wonder chrome onto `https://waam.solvys.io`
- Mixing Wonder UI commits onto the listings track
- Dynamically rewriting this job into a better-looking one

Wonder may exist as cockpit chrome. It is not the product. Listings into WhatsApp is the product.

## Milestones

| ID | Milestone | Proof |
| --- | --- | --- |
| M0 | Access | 1Password session alive. Service accounts for Production and Preview. Named secrets present on Vercel project `waam` in both. Promotions LOGIN true. WhatsApp dest named. |
| M1 | First live send | One real Promotions listing lands in Test Group as InvestorPost, house-recognizable photo, no Google mark. |
| M2 | Repeatable pipe | Auto or Semi-Auto works without replacing heartbeat. Duplicate scan covers membership groups. Fail one, skip, continue. |
| M3 | Honest cockpit | WAAM shows power, mode, last send, and failures in customer copy. No env var names, JSON, or API paths in the UI. |
| M4 | Chrome | Only after M1 is true. Hub, sidebar, island, Wonder parity. Never at the expense of M1. |

Do not start M4 while M0 or M1 is false.

## Access

Blocked on credentials is a stop, not a creative-coding prompt.

1. If 1Password is logged out, log in on the authorized `sam@solvys.io` profile. Then continue.
2. Create or reuse service accounts and machine tokens for every environment that runs this app: Vercel Production, Vercel Preview, Fly if the send path needs it, Cloudflare Worker/R2 if images or drip clocks need it.
3. Disperse the named secrets into those environments. Do not copy secret values into chat, git, receipts, or screenshots.
4. Prove the env loaded with a redeploy and a health check, then prove P0.

Secret names only (values stay in 1Password / Vercel):

- `IMAP_USER` = `sam@creativerealestatedeals.com`
- `IMAP_PASSWORD` = Google Workspace App Password for that mailbox. Account password plus TOTP is not IMAP LOGIN. If Workspace blocks App Passwords, stop and ask the domain admin. Do not invent a password.
- `GOALBOT_SERVICE_TOKEN` = 1Password item `waam.vercel - Goalbot service`
- `GOALBOT_API_URL` = `https://goalbots.solvys.io`
- `WAAM_CONTROL_TOKEN` = 1Password item `waam.vercel - WAAM control token`

Never print tokens, E.164 numbers, listing bodies, WhatsApp bodies, or `live_view_url`.

Do not open Gmail. Peek with IMAP `BODY.PEEK[]`. Restore `UNSEEN` if `\Seen` flips.

## Deployment

| Rule | Detail |
| --- | --- |
| Live cockpit | Vercel project `waam`, team solvys, root `dashboard/`, https://waam.solvys.io |
| GoalBot | https://goalbots.solvys.io |
| Do not deploy | Legacy Vercel projects `workspace`, `cred-cowork`, `dashboard` |
| Wonder | Preview only. Do not `--prod` Wonder onto production. |
| Listings track | This is what production runs. Do not mix Wonder UI commits onto it. |
| Send dest | Test Group / `TEST_GROUP_ID` until Sam switches to Creative Deals |
| Cloudflare | Account Solvys |
| Fly | `credlist-ops` / CRED bridge. HTTP 503 with outbound off is a P0 blocker if send needs that bridge. |
| Power | Durable `agent_routines` name `bender-outbound`. UI Auto with `powered: false` is a lie. Fix power, then send. |

## Unattended work

Do not start a Cursor goal you cannot cut off.

If you are blocked on access, a human gate, or the same failing probe twice: stop the goal. Leave a blocker receipt. Do not spend the rest of the usage window rewriting UI.

Maximum unattended window without a P0 proof: 2 hours. After that, stop.

`UpdateGoal` complete only when the WhatsApp group has the listing, or a human stopped the work. Do not mark a cockpit refactor complete because tests passed.

Two git tracks stay two tracks until a human says otherwise. Wonder chrome is one track. Listings send is the other. Production is listings.

## Consult, plan, craft

Name the real-world problem. Put options in front of Sam. Wait for the plan. Then craft only that.

Do not retarget P0 because IMAP is messy, because the board shows cards, because Wonder is unfinished, or because a 34-hour goal is still active.

## Stop

Stop and report when:

- The group is not receiving listings and the next action is another UI feature
- Aerial imagery is shipping as the listing photo
- 1Password is logged out and the next action is another IMAP probe
- A goal has been running for hours with no message in the group
- You are about to invent a product name, a second send path, or a Deal Room

## Names

Product names: WAAM AI, Goalpost CRM, GoalBot, Kernel, Bender, Computa. Do not invent others.

WAAM AI is the cockpit. GoalBot is the hub. Kernel is the browser session. Bender is the deal engine.

## Proof that counts

Counts: a listing visible in the destination WhatsApp group, house-recognizable photo, InvestorPost body, Promotions LOGIN true, secrets present in Production and Preview.

Does not count: `tsc`, unit tests, Maps 200, Kanban counts, Wonder screenshot, Situation JSON, a green Vercel deploy of chrome that still cannot send.
