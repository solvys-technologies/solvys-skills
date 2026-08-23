# Solvys skills repository instructions

work freely, work with an open mind, and explore all possible options; never jump to conclusions at the second or third blocker. Be innovative, take inventory of your skills

This repository is the turnkey Solvys Factory suite.

Before changes:

1. Read `.claude/skills/communication-style-protocol/SKILL.md`.
2. Read `.claude/skills/solvys-building-blocks/SKILL.md`.
3. Read `.claude/skills/solvys-cao/SKILL.md`.
4. Read `.claude/skills/solvys-factory/SKILL.md`.
5. Preserve unrelated dirty work.

Keep skill bodies concise. Put detailed Factory policy in `factory/Solvys Operations Handbook.md` and task-specific records in the Codebase Cabinet.

For every frontend task, read and enforce
`factory/canon/frontend-wonder-source-of-truth.md`. Wonder is the protected,
human-editable visual source of truth. Preserve its 1:1 code mapping and do not
create a parallel UI, page, component library, or layout. When the project has
no Wonder-imported source, create or import it before new UI code begins.

Validate every skill with the skill-creator validator. Test the installer in an isolated target home before publication.

Use the daily `YYYY-MM-DD` integration branch, an `S### - concise context` PR title, green checks, and a squash merge into clean `main`.
