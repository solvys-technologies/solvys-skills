# Wonder default instructions — paste block

Wonder's desktop app loads standing instructions from `~/.claude/CLAUDE.md` and `~/.claude/rules/` on the machine where it runs (Settings > Memory → "Instructions your chats load"). Repo `CLAUDE.md`/`AGENTS.md` files load per-worktree on top of that.

Paste this into the Wonder machine's `~/.claude/CLAUDE.md` (or as a rule file `~/.claude/rules/solvys-deploy.md`) so every chat — including every Wonder worktree chat — treats deploy requests as turnkey:

```markdown
## Solvys deploys

For ANY request to deploy, preview, release, ship, or push a build live: invoke the `solvys-deploy` skill immediately and follow it end to end. Do not ask clarifying questions it doesn't require. Preview requests get ONE host question (Vercel vs Wonder Preview); production deploys auto-route to the repo's real host (Vercel, Cloudflare, TestFlight). Credentials resolve env → 1Password → ask; secrets are never printed. Frontend prod deploys are signed off by you as Frontend Wonderer per the Wonder 1:1 rule — keep canvas, source, Preview, and deploy evidence separate.
```

If the skill isn't installed yet on that machine, install it first:

```bash
# Option A — from the canonical factory bank (preferred)
git clone https://github.com/solvys-technologies/solvys-factory /tmp/solvys-factory
mkdir -p ~/.claude/skills
cp -R /tmp/solvys-factory/Skills/Solvys/solvys-deploy ~/.claude/skills/
# the skill's references/ folder must come along — copy the whole directory

# Option B — symlink the whole Solvys skills bank so all skills stay in sync
ln -sfn /path/to/solvys-factory/Skills/Solvys ~/.claude/skills/solvys
```

Note: Claude Code discovers skills at `~/.claude/skills/<name>/SKILL.md` (personal) and `<repo>/.claude/skills/<name>/SKILL.md` (project). A skill placed in a product repo's `.claude/skills/` only loads for worktrees of that repo — the home-dir install covers every Wonder chat.
