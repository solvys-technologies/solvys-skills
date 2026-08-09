#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
validator="${CODEX_SKILL_VALIDATOR:-$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py}"

python3 -m json.tool "$repo_root/factory/Factory Registry/Schemas/factory-records.schema.json" >/dev/null
python3 -m json.tool "$repo_root/factory/Factory Registry/Schemas/infraction-ledger.schema.json" >/dev/null
python3 -m json.tool "$repo_root/factory/Factory Registry/Templates/infraction-ledger.json" >/dev/null

if [[ -f "$validator" ]]; then
  for skill_dir in "$repo_root"/.claude/skills/*; do
    [[ -d "$skill_dir" && -f "$skill_dir/SKILL.md" ]] || continue
    python3 "$validator" "$skill_dir"
  done
else
  python3 "$repo_root/scripts/validate-skills.py"
fi

python3 -m py_compile \
  "$repo_root/scripts/configure_global_agents.py" \
  "$repo_root/scripts/record_infraction.py" \
  "$repo_root/scripts/sweep_infractions.py" \
  "$repo_root/scripts/validate-skills.py" \
  "$repo_root/.claude/skills/solvys-factory/scripts/orient.py" \
  "$repo_root/.claude/skills/solvys-build-kit/scripts/load_build_kit.py" \
  "$repo_root/.claude/skills/solvys-build-kit/scripts/validate_build_kit.py"

python3 "$repo_root/.claude/skills/solvys-build-kit/scripts/validate_build_kit.py"

echo "Solvys Factory suite validation passed."
