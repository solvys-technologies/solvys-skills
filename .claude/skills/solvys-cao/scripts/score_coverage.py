#!/usr/bin/env python3
"""Score every Solvys skill's coverage of the Solvys Ponytail Ladder rungs.

The Solvys Ponytail Ladder (factory/canon/ponytail-ladder.md) has seven rungs:

  1. YAGNI -- does this need to exist at all
  2. Repo reuse -- already in this repo
  3. Stdlib / native platform
  4. Already-installed dependency
  5. Maintained OSS with lower ownership cost (pragmatic OSS-first)
  6. One line
  7. Minimum custom code only

This scorer reports, per skill, which rungs are represented in the skill text
and the resulting coverage percentage. It enforces the plan target: operational
skills that own build/implementation decisions must score >= 80%.

Exit codes:
  0 -- all gated skills score at or above the coverage gate
  1 -- one or more gated skills score below the gate (or a config error)
"""

from __future__ import annotations

from pathlib import Path
import re
import sys

# Canonical ladder rung phrases, in ladder order. Each maps a rung to one or
# more short phrases that a skill must contain to be credited that rung. One
# match is enough.
RUNG_PHRASES: list[tuple[str, tuple[str, ...]]] = [
    ("yagni", ("does this need to exist", "yagni", "needed at all")),
    (
        "repo_reuse",
        (
            "already in the repo",
            "already in this repo",
            "existing repo seam",
            "repo-owned primitives",
            "repo already solve",
        ),
    ),
    (
        "stdlib_native",
        (
            "standard library",
            "stdlib",
            "native platform",
            "native platform feature",
        ),
    ),
    (
        "installed_dependency",
        (
            "installed dependency",
            "already-installed dependency",
            "existing dependency",
        ),
    ),
    (
        "oss_first",
        (
            "maintained OSS",
            "oss-first",
            "oss first",
            "maintained oss",
            "open source",
            "integration cost",
        ),
    ),
    ("one_line", ("one line", "can it be one line", "one-line")),
    (
        "minimal_code",
        (
            "minimum code",
            "minimum new code",
            "minimum custom code",
            "smallest runnable check",
            "minimal code",
        ),
    ),
]

# Skills that decide when and how to build or implement. These are the ones the
# >= 80% gate binds. Specialist visual/design/roll skills may still score but
# are not gated, because their job is presentation doctrine rather than
# build-or-reuse decisions.
GATED_SKILLS: set[str] = {
    "solvys-audit",
    "solvys-brief",
    "solvys-build-kit",
    "solvys-building-blocks",
    "solvys-cao",
    "solvys-deploy",
    "solvys-factory",
    "solvys-orchestrate",
    "solvys-run-point",
    "solvys-sign-in",
    "solvys-spec",
    "solvys-user-journey-acceptance",
    "solvys-user-testing",
}

COVERAGE_GATE = 0.80

SUITE_DIR = Path(__file__).resolve().parents[2]  # .claude/skills under the Cabinet / install


def _find_canonical_ladder() -> Path | None:
    """Resolve the canonical ladder page, scanning upward and known installs."""
    script_dir = Path(__file__).resolve().parent
    for candidate in (
        script_dir.parents[4] / "factory" / "canon" / "ponytail-ladder.md",  # Cabinet root
        script_dir.parents[1] / ".." / ".." / "factory" / "canon" / "ponytail-ladder.md",
        Path.home() / ".codex" / "tools" / "solvys-skills" / "factory" / "canon" / "ponytail-ladder.md",
    ):
        if candidate.is_file():
            return candidate
    return None


CANONICAL_LADDER = _find_canonical_ladder()


def score_text(text: str) -> tuple[int, int, list[str]]:
    """Return (covered_rung_count, total_rungs, matched_phrases)."""
    lowered = text.lower()
    covered: list[str] = []
    matched: list[str] = []
    for rung, phrases in RUNG_PHRASES:
        for phrase in phrases:
            if phrase.lower() in lowered:
                covered.append(rung)
                matched.append(phrase.lower())
                break
    return len(covered), len(RUNG_PHRASES), matched


def main() -> int:
    if not SUITE_DIR.is_dir():
        print(f"Solvys Ponytail coverage: FAIL (suite dir missing: {SUITE_DIR})")
        return 1

    rows: list[tuple[str, int, int, list[str]]] = []
    failures: list[str] = []

    for skill_dir in sorted(SUITE_DIR.glob("solvys-*/SKILL.md")):
        name = skill_dir.parent.name
        text = skill_dir.read_text(encoding="utf-8")
        covered, total, matched = score_text(text)
        rows.append((name, covered, total, matched))
        if name in GATED_SKILLS and covered / total < COVERAGE_GATE:
            failures.append(
                f"{name}: {covered}/{total} rungs ({covered / total:.0%}) below "
                f"the {COVERAGE_GATE:.0%} gate"
            )

    if CANONICAL_LADDER is None or not CANONICAL_LADDER.is_file():
        failures.append(
            "missing canonical ladder: factory/canon/ponytail-ladder.md "
            "(checked Cabinet root and ~/.codex/tools/solvys-skills)"
        )

    name_w = max(len(r[0]) for r in rows) if rows else 4
    cell_w = 8
    print(f"{'skill'.ljust(name_w)}  {'coverage'}")
    print("-" * (name_w + cell_w + 4))
    for name, covered, total, matched in rows:
        pct = covered / total
        flag = "GATED" if name in GATED_SKILLS else "     "
        print(
            f"{name.ljust(name_w)}  {covered}/{total:>2} ({pct:>4.0%}) {flag}"
        )

    if failures:
        print("\nSolvys Ponytail coverage: FAIL")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(
        f"\nSolvys Ponytail coverage: PASS "
        f"(all {len(GATED_SKILLS)} gated skills >= {COVERAGE_GATE:.0%})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())