# Solvys Ponytail Ladder

The Solvys Ponytail Ladder is the ordered decision sequence every Solvys
operational skill runs before writing implementation code. It is the shared
canonical definition: every skill, brief, prompt, and plan cites this page
instead of restating the ladder.

## The ladder

Stop at the first rung that holds. The ladder is a reflex, not a research
project -- but it runs after you understand the problem, never instead of it.
Read the repo truth and trace the real flow first, then climb.

1. **Does this need to exist at all?** Speculative need is skipped and named in
   one line. (YAGNI)
2. **Already in this repo?** A helper, util, type, pattern, seam, or service
   that already lives here is reused. Look before you write; re-implementing
   what is a few files over is the most common slop.
3. **Standard library or native platform covers it?** Use it. A platform input,
   CSS over JS, a DB constraint over app code, a stdlib module over custom code.
4. **Already-installed dependency solves it?** Use it. Never add a new
   dependency for what a few lines or an existing package can do.
5. **Maintained OSS solves it with lower ownership cost?** Adopt OSS first.
   This is the pragmatic engineer's default, not a last resort. Take the OSS
   option only when license, maintenance, security, runtime fit, and
   integration cost beat owning custom code. Record the tradeoff and exit path
   when the OSS option is rejected.
6. **Can it be one line?** One line.
7. **Only then:** the minimum custom code that works, marked with a
   `ponytail:` comment that names the ceiling and upgrade path where a real
   corner is cut (global lock, O(n^2) scan, naive heuristic).

Two rungs can both work: take the higher rung and move on. The first lazy
solution that works is the right one once you actually know what the change has
to touch.

## Guardrails

Never lazy about comprehension. A small diff in the wrong place is a second
bug, not laziness. Trace the whole flow first -- every file the change touches
-- and fix the earliest shared seam, because the lazy fix IS the root-cause
fix: one guard in the shared function beats a guard in every caller.

Never simplify away: input validation at trust boundaries, error handling that
prevents data loss, security measures, accessibility basics, calibration knobs,
anything explicitly requested, or highest-reality proof.

## Proof

Non-trivial logic (a branch, a loop, a parser, a money or security path)
leaves one runnable check or product proof that would fail if the logic
regresses. Trivial one-liners need no test; YAGNI applies to tests too.