---
name: solvys-discovery
description: Full-stack Discovery and Project Planning for new Solvys applications. Covers MIT repo search for fast-track development, Refero Design reference-locking, design inspiration gathering from getdesign.md/superdesign.dev, veteran sprint decomposition, feature scoping with scope-creep guardrails, Hook Model UX formatting, CTA mapping, micro-interaction/transition/icon/font planning, prototype drafting, and architecture decision-making. Use when starting a brand new project, before any code is written.
---

# Solvys Discovery — Project Planning Protocol

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


You are a veteran product strategist and technical architect. Every new project at Solvys begins here. This skill replaces ad-hoc planning with a repeatable, thorough discovery process. Run this end-to-end, in order, for every greenfield project.

## Mandatory Refero Frontend Gate

For any greenfield or new Solvys project with a frontend, run the `refero-design` skill before touching frontend files, generating UI, writing CSS, or treating a visual direction as implementation-ready. `refero-design` is installed from `https://github.com/referodesign/refero_skill`; if the skill is missing in the active runtime, install it with:

```bash
npx skills add https://github.com/referodesign/refero_skill
```

This gate happens before visual prototyping or frontend implementation planning:

- Use `refero-design` to research styles, screens, and flows when relevant.
- Capture a reference lock: primary direction, traits to preserve, source token/component roles, media strategy, rejected averages, and decision ledger.
- Reconcile that reference lock with Solvys `Design.md` and `/solvys-feels` before any frontend work. If they conflict, write the conflict and resolution in the discovery document before implementation.

## Mandatory Wonder Sandbox Disposition

Every new frontend discovery records whether Wonder can serve as the
collaborative provisional sandbox. When applicable, name the target
file/page/artboard, the agent-owned lane, concurrent human changes that remain
out of scope, the decision TP must accept, and the later port 7777
source-verification gate. Wonder does not authorize source changes by itself.

---

## Phase 0: Project Briefing

Gather from the user:

- **Project name and one-line mission**
- **Primary user** (who uses this?)
- **Core problem** (what does it solve in one sentence?)
- **Platform** (web, mobile, desktop, API?)
- **Timeline pressure** (ASAP, structured sprints, exploratory?)
- **Any existing assets** (PRD, wireframes, brand guide, competitor links)

Ask these concisely — do not over-ask. Capture the answers and proceed.

---

## Phase 1: MIT Repo Search — Fast-Track Development

Search for MIT-licensed repositories that can accelerate development. Do NOT build from scratch if a solid foundation exists.

### Search Targets

| Target | Why | Where to Search |
|--------|-----|----------------|
| Starter templates | Next.js, Vite, T3, create-t3-app, electron-vite | GitHub (topic:starter-template, topic:nextjs-starter) |
| Auth boilerplate | Clerk, NextAuth, Lucia, Supabase auth patterns | GitHub, official docs |
| Component libraries | shadcn/ui, Radix, Ark UI, Park UI | GitHub, npm |
| Theming engines | next-themes, Park UI, custom CSS variable systems | GitHub |
| Reference architectures | Monorepo setups, Turborepo examples, t3 examples | GitHub |
| Design system starters | Accessible, themeable, tailwind-based | GitHub (topic:design-system, topic:tailwind-components) |

### Protocol

1. Search GitHub for relevant repos using Firecrawl or WebSearch:
   - `"MIT" "starter" "nextjs" site:github.com`
   - `"MIT" "auth" "template" site:github.com`
   - Topic searches: `topic:nextjs-starter site:github.com`
2. For each promising repo, check:
   - License is MIT (or permissive)
   - Last commit within 6 months
   - Active maintenance (open issues being addressed, recent releases)
   - Bundle of features that maps to your project needs
3. Present top 2-3 options with a recommendation. Do NOT overwhelm with choices.
4. After user selects, note the repo URL, license, and key architectural decisions it imposes.

---

## Phase 2: Design Inspiration Gathering

Pull design inspiration from known sources — NOT to copy, but to extract architectural lessons (layout rhythm, component patterns, spacing hierarchy, interaction models).

### Sources to Scan

| Source | What to Look For |
|--------|-----------------|
| `refero-design` skill | Research-first style, screen, and flow references; reference lock; decision ledger; anti-generic design guardrails |
| https://getdesign.md | Component patterns, layout grids, typographic scale, spacing systems |
| https://app.superdesign.dev/ | Visual design drafts, page compositions, interaction patterns |
| https://impeccable.style | Production-grade frontend patterns, critique discipline |
| devl.dev | Interface details, micro-interactions, state models |
| jakub.design / jakub interface details | Component boundaries, hierarchy, subtle animations |
| detail.design | Refined UI details, interaction patterns |
| MV---Design | Motion and visual rhythms |

### Extraction Protocol

1. Run `refero-design` first for any new-project frontend and capture the reference lock before other visual sources become implementation guidance.
2. Visit each relevant source.
3. Extract only: **architectural lessons** — not code, not assets, not packages.
4. Translate into Solvys-native requirements:
   - "This uses a sticky sidebar with expandable sections" → sidebar pattern for our nav
   - "This uses a stepped progress indicator" → multi-step form pattern
   - "This uses a command palette for search" → Cmd+K search for our app
5. Log the 3-5 strongest architectural inspirations and identify which ones are subordinate to the Refero reference lock.

---

## Bookmark Actionizer Extension

If the user brings bookmark exports, saved-link piles, or shorthand like `cherries`, `skills-addition`, `pass`, or `demo candidate`, run the bookmark-actionizer pass before sprint decomposition.

Use the repo-level `bookmark-actionizer/` pack to:

- cluster items into design, product, market signals, infrastructure, client-reference, skills-addition, and pass/archive buckets
- apply statuses `USE NOW`, `CHERRIES`, `SKILLS-ADDITION`, `TEST / VALIDATE`, `PASS / ARCHIVE`, `LINEAR ISSUE`, and `DEMO CANDIDATE`
- preserve source links and extraction notes in every artifact
- convert the strongest items into `sprint-suggestions.md`, `skills-additions.md`, or `demo-candidates.md`

During planning, proactively surface leverage in this exact format:

`Per your bookmarks, we could use <name>, a <repo/platform/tool> that <why it matters>. Link: <url>.`

Whenever a bookmark points toward scraping, browser automation, or a third-party integration, add a Browserbase or browser-to-api feasibility check before recommending custom glue code.

---

## Phase 3: Sprint Decomposition

Break the project into sprints like a seasoned tech lead. Be practical, not aspirational.

### Sprint Rules

| Rule | Why |
|------|-----|
| **Sprint 0 only** — setup, CI, design system, tooling | Without foundation, everything crumbles |
| **Sprint 1** — the thinnest possible working vertical slice (auth + 1 core action) | Prove the stack works end-to-end before adding features |
| **Never more than 2 weeks per sprint** | Forces real prioritization |
| **Each sprint ships something usable** | No "infrastructure only" sprints after Sprint 0 |
| **Max 3 features per sprint** | Focus beats breadth |
| **No "polish" sprints** | Polish is continuous, not a phase |

### Structure

```
## Sprint 0: Foundation (Week 1-2)
Setup, tooling, CI/CD, design system scaffolding, auth integration

## Sprint 1: Skeleton (Week 3-4)
Auth working, one core user flow end-to-end, one page rendered

## Sprint 2-N: Feature Sprints
Each sprint: 1-3 features, each with a clear outcome
```

For each sprint, define:
- **Sprint goal** (one sentence)
- **Features** (numbered, with outcome basis)
- **Exit criteria** (what "done" looks like)
- **Scope guardrails** (what is NOT in this sprint)

---

## Phase 4: Feature Scoping — Outcome Basis & Scope Guardrails

For every feature, define with cold practicality:

### Feature Definition Template

```
## Feature: [Name]

### Outcome Basis
Single sentence: "The user can [action] so that [benefit]."

### User Journey Segment
Where in the app flow this lives.

### CTAs
- Primary CTA: [button/link text] → [action]
- Secondary CTA: [text] → [action]
- Contextual CTA: [text] → [action]

### Hook Model Formatting
Apply the Nir Eyal Hook Model:
- **Trigger** (external or internal): What prompts the user to use this?
- **Action**: Simplest behavior in anticipation of reward
- **Variable Reward**: What uncertainty makes this satisfying?
- **Investment**: What work does the user put in that makes them return?

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Hard Scope Guardrails
- Feature does NOT include: [list things explicitly out of scope]
- Scope creep red flags: [warnings for what always derails this feature]
- Deferred to: [sprint number] — [feature name]

### Complexities & Risks
- Technical risk: [what could go wrong]
- UX risk: [what could confuse users]
- Mitigation: [how to handle]
```

---

## Phase 5: UX & Interaction Planning

### Micro-Interactions

For every interactive element, plan:

| Element | Interaction | Duration | Timing |
|---------|------------|----------|--------|
| Button hover | Border opacity | 150ms | Entrance |
| Button click | Scale 0.97 | 100ms | Instant |
| Page transition | Fade + slide 8px | 300ms | Navigation |
| Panel open | Opacity + glass blur | 350ms | Entrance |
| Input focus | Border color transition | 200ms | Entrance |
| Tab switch | Content crossfade | 250ms | Switch |
| Modal open | Opacity + scale 0.98→1.0 | 250ms | Entrance |
| Notification | Slide in from top | 300ms | Entrance |

Ask the user:
- "Smooth and luxurious (400-600ms transitions) or snappy and responsive (150-250ms)?"
- "Any custom micro-interactions you have in mind?"
- "Should modals/dialogs use the frosted glass pattern?"

### Global Transitions

| Context | Transition | Easing | Duration |
|---------|-----------|--------|----------|
| Route change | Fade + slight slide | standard | 300ms |
| Theme toggle | Crossfade | standard | 400ms |
| Sidebar collapse | Width + opacity | spring | 350ms |
| Content load | Staggered fade-in | standard | 200ms stagger |

### Icon Bank

| Category | Icon Set | Format |
|----------|----------|--------|
| UI / Navigation | Lucide icons | SVG, stroke-width 1.5-2px |
| Actions | Same set, matching style | Line icons only |
| Status | Lucide + custom branded | Stroke style consistent |
| Brand | Custom SVGs | Inline or sprite |

**Rules:**
- Single icon set across the entire app. No mixing.
- Line icons only. No filled icons. No colored icons.
- Stroke-width consistent (1.5-2px).
- All icons MUST be accessible (aria-hidden, aria-label on actionable icons).

### Font Selection

Ask the user:

- **Primary body font**: Inter (default for Solvys — clean, neutral, readable)
- **Display/heading font**: Playfair Display (elegant) or stick with Inter (clean/modern)
- **Monospace font**: JetBrains Mono (for code, data, metrics)
- **Any special brand font?** (Cinzel for ceremonial, Cormorant Garamond for long-form)

**Solvys rules:**
- Max 2 font families per screen
- Max 3 font sizes per screen
- Max 2 font weights per screen
- All self-hosted WOFF2 with `font-display: swap`

---

## Phase 6: Cardinal Design Sins — Never Do These

These are hard bans. Violating them causes immediate rejection.

### Absolutely Banned Patterns

| Pattern | Why |
|---------|-----|
| **Kanban boards** | Overused, generic UI trope. Use structured lists or custom layouts instead. |
| **Decorative gradients** (`bg-gradient-*`, `linear-gradient`) | Banned unless they are source-backed image overlays, fades, or liquid-glass edges. |
| **Emojis in UI chrome** (buttons, nav, headers, status) | Unprofessional, inconsistent cross-platform. Prohibited. |
| **Generic shadows** (`shadow-*`, decorative `drop-shadow`) | Generic SaaS depth. Product chrome should use source-owned glass/material only. |
| **Blur as decoration** (`blur-*`, heavy glow, unfocused blobs) | AI-slop visual noise. Functional Fintheon/Solvys-1 liquid glass is allowed. |
| **AI sparkles / glitter / aurora effects** | Immediate "AI slop" signal. |
| **Toast popups** | Use inline status text: `[SAVED]`, `[ERROR: ...]` |
| **Full-page skeleton loaders** | Use compact local loading states. |
| **Pure black (#000) backgrounds** | Too harsh. Use warm near-black. |
| **Pure white (#fff) text** | Too harsh. Use warm off-white. |
| **Colored or filled icons** | Line icons only. Stroke-width 1.5-2px. |
| **Parallax, scroll-jacking, bounce easing** | Disruptive motion. |

### Solvys Design Language

| Rule | Specification |
|------|--------------|
| **Background** | `#050402` (warm near-black) |
| **Accent** | `#c79f4a` (Solvys Gold — muted, not bright) |
| **Text** | `#f0ead6` (warm off-white) |
| **Surface layers** | Layer 0 `#050402`, Layer 1 `#0a0905`, Layer 2 `#110f0a`, Layer 3 `#151310` |
| **Surface material** | Product UI defaults to flat Fintheon layers, thin borders, opacity, and type. Liquid glass is allowed only when source-backed by Fintheon product page/app, Solvys-1 primitives, SSFitness, or existing project code. |
| **Borders** | Thin `1px` — default `rgba(199,159,74,0.10)`, hover `rgba(199,159,74,0.20)`, focus `rgba(199,159,74,0.40)` |
| **Border radius** | 8-12px rounded (iOS26 influence) |
| **Dividers** | Use fading ruler lines instead of thick borders or cards. Subtle horizontal/vertical rules. |
| **Card usage** | Avoid too many cards. Prefer frosted glass for meaningful panels; use rulers, spacing, and type for density. |
| **Personalization** | ALL apps must have theme control. Users own their visual experience. |
| **Layout** | Name the register first: Fintheon product UI, Fintheon public product page, Solvys/PRI studio, Solvys-1 resident ops, or SSFitness public PWA. |

---

## Phase 7: Visual Prototyping (2-3 Drafts)

Before any code is written, draft how the app will look.

### Protocol

1. **Run `superdesign search-prompts --tags "style"`** to find matching design style prompts
2. **Confirm the `refero-design` reference lock** is written into the discovery document; do not create frontend drafts until this exists.
3. **Pick the most suitable style prompt** from the returned results
4. **Fetch prompt details**: `superdesign get-prompts --slugs "<slug>"`
5. **Write `.superdesign/design-system.md`** capturing: product context, branding, color tokens, typography, spacing, component patterns, interaction model, and Refero reference-lock decisions
6. **Create the project**: `superdesign create-project --title "<Project Name>"`
7. **Generate 2-3 design prototypes** covering different layout approaches:
   - `superdesign create-design-draft --project-id <id> --title "Prototype A: [approach]" -p "Liquid glass sidebar layout..." --device desktop`
   - `superdesign create-design-draft --project-id <id> --title "Prototype B: [approach]" -p "Centered content layout..." --device desktop`
   - (Third if needed for a distinct alternative)
7. **Present URLs** to the user. Let them pick.

### Prototype Variation Strategy

Each prototype should test a different layout hypothesis:

| Prototype | Layout Thesis |
|-----------|--------------|
| **A: Sidebar Nav** | Persistent sidebar, content takes remaining width. Best for data-heavy apps. |
| **B: Centered Content** | Top nav, centered content with max-width. Best for content-forward apps. |
| **C: Hybrid/Canvas** | Collapsible sidebar, floating panels. Best for creative/flexible workspaces. |

### After Selection

Once the user picks a layout direction:

1. Finalize the `.superdesign/design-system.md` with the chosen direction
2. Present the architecture decision:

```
## Architecture Decision Record

### Frontend
- Framework: [choose from source canon: Fintheon Vite/React/Electron, Next/OpenNext, Solvys-1 Next/Expo]
- Component library: [source-owned primitives, Radix/CVA where already used, local icon facade]
- Styling: [Tailwind v4 + CSS variables]
- Theming: [source-owned CSS variable theme system]
- Auth: [Clerk or Supabase/Fintheon-native auth only unless explicitly approved]
- State: [React Query/tRPC, Zustand, or existing source-native state]
- Font loading: [next/font / vanilla WOFF2]

### Backend (if applicable)
- API: [Hono for Fintheon-style services, tRPC for Solvys-1 style apps, Next routes where the source app already uses them]
- Database: [Postgres via Supabase/Neon/postgres]
- ORM: [Drizzle where Solvys-1 style, source-native SQL/client where Fintheon style]
- Hosting: [Vercel, Cloudflare/OpenNext, Electron desktop, or source-native local service]

### Design
- Theme system: [CSS variables with data-theme attribute]
- Component extraction: [DraftComponents for NavBar, Sidebar, etc.]
- Prototype source: [superdesign project URL]
```

---

## Deliverable: Discovery Document

At the end of this protocol, produce a single markdown file:

```
docs/discovery/[project-slug]-discovery.md
```

Containing:

1. **Project Brief** — name, mission, core problem
2. **MIT Repo Selection** — what was chosen and why
3. **Refero Reference Lock** — primary direction, traits to preserve, token/component roles, media strategy, rejected averages, and decision ledger
4. **Design Inspirations** — 3-5 architectural lessons extracted
5. **Sprint Plan** — full sprint breakdown with feature lists
6. **Feature Specs** — one per feature using the Feature Definition Template
7. **UX & Interaction Spec** — micro-interactions, transitions, icons, fonts
8. **Design System Summary** — colors, typography, spacing, materials
9. **Architecture Decision Record** — framework, backend, hosting decisions
10. **Visual Prototypes** — superdesign draft URLs, selected direction
