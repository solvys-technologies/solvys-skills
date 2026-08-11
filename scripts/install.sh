#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
solvys_user_home="${HOME:?HOME is required}"
force_orientation=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target-home)
      solvys_user_home="$2"
      shift 2
      ;;
    --force-orientation)
      force_orientation=1
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 2
      ;;
  esac
done

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup_root="$solvys_user_home/.config/solvys-factory/backups/$timestamp"

link_path() {
  local source_path="$1"
  local target_path="$2"
  mkdir -p "$(dirname "$target_path")"

  if [[ -L "$target_path" ]] && [[ "$(readlink "$target_path")" == "$source_path" ]]; then
    return
  fi

  if [[ -e "$target_path" || -L "$target_path" ]]; then
    local relative_target="${target_path#"$solvys_user_home"/}"
    local backup_path="$backup_root/$relative_target"
    mkdir -p "$(dirname "$backup_path")"
    mv "$target_path" "$backup_path"
  fi

  ln -s "$source_path" "$target_path"
}

link_path "$repo_root" "$solvys_user_home/.codex/tools/solvys-skills"

mkdir -p \
  "$solvys_user_home/.config/solvys-factory/projects" \
  "$solvys_user_home/.config/solvys-factory/registry" \
  "$solvys_user_home/.config/solvys-factory/receipts"

for skill_root in "$solvys_user_home/.codex/skills" "$solvys_user_home/.agents/skills" "$solvys_user_home/.claude/skills"; do
  mkdir -p "$skill_root"
  legacy_user_testing="$skill_root/solvys-user-journey-acceptance"
  if [[ -e "$legacy_user_testing" || -L "$legacy_user_testing" ]]; then
    relative_target="${legacy_user_testing#"$solvys_user_home"/}"
    backup_path="$backup_root/$relative_target"
    mkdir -p "$(dirname "$backup_path")"
    mv "$legacy_user_testing" "$backup_path"
  fi
  for skill_dir in "$repo_root"/.claude/skills/*; do
    [[ -d "$skill_dir" && -f "$skill_dir/SKILL.md" ]] || continue
    link_path "$skill_dir" "$skill_root/$(basename "$skill_dir")"
  done

  for shared_file in Design.md SOLVYS_AGENT_SYSTEM_PROMPT.md; do
    if [[ -f "$repo_root/.claude/skills/$shared_file" ]]; then
      link_path "$repo_root/.claude/skills/$shared_file" "$skill_root/$shared_file"
    fi
  done
done

python3 "$repo_root/scripts/configure_global_agents.py" \
  --agents-file "$solvys_user_home/.codex/AGENTS.md" \
  --repo-root "$repo_root"

python3 "$repo_root/scripts/configure_factory_hooks.py" \
  --hooks-file "$solvys_user_home/.codex/hooks.json" \
  --repo-root "$repo_root" \
  --home "$solvys_user_home"

orientation_args=(--config-dir "$solvys_user_home/.config/solvys-factory")
if [[ "$force_orientation" -eq 1 ]]; then
  orientation_args+=(--force)
fi
python3 "$repo_root/.claude/skills/solvys-factory/scripts/orient.py" "${orientation_args[@]}"

echo
echo "Solvys Factory installed from: $repo_root"
echo "Global Codex source: $solvys_user_home/.codex/tools/solvys-skills"
if [[ -d "$backup_root" ]]; then
  echo "Replaced paths were preserved at: $backup_root"
fi
