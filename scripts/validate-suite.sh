#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
validator="${CODEX_SKILL_VALIDATOR:-$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py}"

python3 -m json.tool "$repo_root/factory/Factory Registry/Schemas/factory-records.schema.json" >/dev/null
python3 -m json.tool "$repo_root/factory/Factory Registry/Schemas/infraction-ledger.schema.json" >/dev/null
for s015_schema in \
  factory-run-state.v1.schema.json \
  factory-hook-event.v1.schema.json \
  factory-loop-policy.v1.schema.json \
  factory-symphony-project.v1.schema.json \
  factory-operator-action.v1.schema.json \
  speckit-contract-map.v1.schema.json; do
  python3 -m json.tool "$repo_root/factory/Factory Registry/Schemas/$s015_schema" >/dev/null
done
python3 -m json.tool "$repo_root/factory/loops/toolchain-lock.json" >/dev/null
python3 -m json.tool "$repo_root/factory/Factory Registry/Templates/infraction-ledger.json" >/dev/null
test -f "$repo_root/factory/Factory Registry/Templates/skill-proposal.md"
test -f "$repo_root/factory/Factory Registry/Templates/breakthrough-record.md"
test -f "$repo_root/factory/Factory Registry/Templates/PROJECT-STATE.md"
test -f "$repo_root/factory/Factory Registry/Templates/development-contract.md"
python3 -m json.tool "$repo_root/factory/Factory Registry/Templates/repair-handoff.json" >/dev/null
python3 "$repo_root/scripts/validate_development_contract.py" \
  --contract "$repo_root/factory/Factory Registry/Templates/development-contract.md" \
  --template >/dev/null
python3 "$repo_root/scripts/validate_development_contract.py" \
  --contract "$repo_root/factory/specifications/S015-solvys-autonomous-delivery-system.md" \
  --implementation >/dev/null
python3 "$repo_root/scripts/validate_project_state.py" \
  --state "$repo_root/factory/Factory Registry/Templates/PROJECT-STATE.md" --template >/dev/null

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
  "$repo_root/scripts/configure_factory_hooks.py" \
  "$repo_root/scripts/configure_project_loops.py" \
  "$repo_root/scripts/factory_productivity_hook.py" \
  "$repo_root/scripts/init_factory_loop.py" \
  "$repo_root/scripts/map_speckit_contract.py" \
  "$repo_root/scripts/record_infraction.py" \
  "$repo_root/scripts/sweep_infractions.py" \
  "$repo_root/scripts/ensure_factory_ledgers.py" \
  "$repo_root/scripts/validate_project_state.py" \
  "$repo_root/scripts/validate_development_contract.py" \
  "$repo_root/scripts/validate_entrance.py" \
  "$repo_root/scripts/validate-skills.py" \
  "$repo_root/.claude/skills/solvys-user-testing/scripts/validate_user_testing.py" \
  "$repo_root/.claude/skills/solvys-factory/scripts/orient.py" \
  "$repo_root/.claude/skills/solvys-build-kit/scripts/load_build_kit.py" \
  "$repo_root/.claude/skills/solvys-build-kit/scripts/validate_build_kit.py"

python3 -m unittest discover -s "$repo_root/scripts/tests" -p 'test_*.py'

bash "$repo_root/scripts/install_s015_toolchains.sh" --verify-only

python3 "$repo_root/.claude/skills/solvys-build-kit/scripts/validate_build_kit.py"

echo "Solvys Factory suite validation passed."
