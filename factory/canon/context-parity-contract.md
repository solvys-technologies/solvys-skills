# Context Parity Contract

## Purpose

Every project has one Git-tracked `PROJECT-STATE.md` file at the repository
root. It gives executive and Cloud workers the same current context before a
task starts. A Cabinet view may link to this file. It must not become a second
editable source of truth.

## Required state

The record must identify the project, state revision, active sprint, source
branch and commit, owning environment, latest accepted receipt, current intent,
verified truth, protected zones, open gates, next safe action, and recent
Breakthrough records. It must state the proof rung reached. It must not contain
secrets, session material, raw client data, or guessed runtime claims.

## Sync checks

Before Executive Ops dispatches work, and before a Cloud worker edits code, the
agent must read `PROJECT-STATE.md` and the latest accepted receipt. It compares
the record's branch and commit with the target checkout, confirms the owner and
protected zones, and records one of these states: `aligned`, `stale`,
`blocked`, or `unverified`.

Only `aligned` allows product or repository mutation. A mismatch creates one
repair handoff. It does not justify guessing, recreating context from chat, or
editing a second progress file.

At a checkpoint and terminal closeout, the owner updates the canonical record
with verified facts only. The executive lane reads it back from the accepted
Cloud checkpoint. A local pointer folder cannot claim source or runtime truth.

## Breakthrough triggers

Create a Breakthrough record only when one of these events occurs:

1. TP explicitly directs a Breakthrough record.
2. TP gives clear positive feedback about the current agent result. Examples
   include `good job`, `that's what the fuck I'm talking about`, and equivalent
   direct praise.
3. A change is confirmed merged into `main`.

Praise must clearly refer to the agent's current result. General enthusiasm,
thanks, or an agent's own interpretation does not qualify. Negative feedback,
corrections, frustration, failed proof, and an infraction never trigger a
Breakthrough record. They use the repair or infraction path. A separate direct
Breakthrough instruction remains a valid trigger.

For a `main` merge, record the confirmed merge, the accepted scope, proof rung,
and the next context action. Do not call a routine merge a quality judgment.

Every valid Breakthrough updates both the project Cabinet record and the
`Breakthrough log` in `PROJECT-STATE.md`, so the local and Cloud lanes can
resume from the same durable lesson.
