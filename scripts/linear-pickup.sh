#!/bin/bash
# ============================================================================
# linear-pickup.sh — Move a Linear issue to "In Progress" and spawn a fresh
# Cursor Agent session to work on it.
#
# A generic operational protocol for any Linear workspace, any repo.
#
# Usage:
#   ./scripts/linear-pickup.sh ISSUE_ID [model]
#
# Args:
#   issue   — Linear issue identifier (e.g. SOL-78, PROJ-123)
#   model   — Cursor agent model (default: claude-4.6-sonnet-medium)
#
# Env:
#   LINEAR_API_KEY    — Linear personal API key (required)
#                       Get one from https://linear.app/settings/api
#   WORKSPACE         — Path to the repo to work in (default: $PWD)
#   LINEAR_TEAM_ID    — Your Linear team's ID (required for state resolution)
#                       Find it: https://linear.app/settings/api → team ID
#
# Examples:
#   LINEAR_API_KEY=lin_api_xxx ./scripts/linear-pickup.sh SOL-78
#   LINEAR_API_KEY=lin_api_xxx WORKSPACE=~/my-project ./scripts/linear-pickup.sh PROJ-42
# ============================================================================
set -eo pipefail

# ── Config ──────────────────────────────────────────────────────────────────

WORKSPACE="${WORKSPACE:-$PWD}"
CURSOR_CLI="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
LINEAR_API="https://api.linear.app/graphql"
DEFAULT_MODEL="claude-4.6-sonnet-medium"

# ── Help ─────────────────────────────────────────────────────────────────────

if [[ "$1" == "--help" || "$1" == "-h" || $# -eq 0 ]]; then
  echo "linear-pickup.sh — Start working on a Linear issue"
  echo ""
  echo "Usage: LINEAR_API_KEY=lin_api_xxx ./scripts/linear-pickup.sh ISSUE_ID [MODEL]"
  echo ""
  echo "Arguments:"
  echo "  ISSUE_ID   Linear issue identifier (e.g. SOL-78)"
  echo "  MODEL      Cursor agent model (default: $DEFAULT_MODEL)"
  echo ""
  echo "Available models (cursor agent models):"
  echo "  Cheap/fast:   gpt-5.4-nano-medium, gpt-5.4-mini-medium, gemini-3-flash"
  echo "  Balanced:     claude-4.6-sonnet-medium (default)"
  echo "  Powerful:     claude-opus-4-7-medium, claude-4.6-opus-high-thinking"
  echo ""
  echo "Environment:"
  echo "  LINEAR_API_KEY   Required. Get from https://linear.app/settings/api"
  echo "  WORKSPACE        Repo path (default: current directory)"
  echo "  LINEAR_TEAM_ID   Required for 'In Progress' state resolution"
  echo ""
  echo "Examples:"
  echo "  LINEAR_API_KEY=lin_api_xxx bash scripts/linear-pickup.sh SOL-78"
  echo "  LINEAR_API_KEY=lin_api_xxx WORKSPACE=~/my-app bash scripts/linear-pickup.sh PROJ-42"
  exit 0
fi

ISSUE_ID="$1"
MODEL="${2:-$DEFAULT_MODEL}"

# ── Pre-flight checks ───────────────────────────────────────────────────────

if [[ -z "$LINEAR_API_KEY" ]]; then
  echo "ERROR: LINEAR_API_KEY is not set."
  echo "Get one from https://linear.app/settings/api and export it:"
  echo "  export LINEAR_API_KEY=lin_api_xxxxxxxxxxxx"
  exit 1
fi

if [[ -z "$LINEAR_TEAM_ID" ]]; then
  echo "ERROR: LINEAR_TEAM_ID is not set."
  echo "Find your team ID in Linear: https://linear.app/settings/api"
  exit 1
fi

if [[ ! -f "$CURSOR_CLI" ]]; then
  echo "ERROR: Cursor CLI not found at $CURSOR_CLI"
  echo "Install Cursor from https://cursor.com"
  exit 1
fi

if [[ ! -d "$WORKSPACE" ]]; then
  echo "ERROR: Workspace not found at $WORKSPACE"
  echo "Set WORKSPACE to the correct path"
  exit 1
fi

# ── Linear GraphQL helper ───────────────────────────────────────────────────

linear_query() {
  local query="$1"
  local variables="${2:-{}}"
  curl -s "$LINEAR_API" \
    -H "Content-Type: application/json" \
    -H "Authorization: $LINEAR_API_KEY" \
    --data "$(jq -n --arg q "$query" --argjson v "$variables" '{query: $q, variables: $v}')" \
    --max-time 15
}

# ── Step 0: Resolve "In Progress" state ID ──────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════════"
echo "  LINEAR PICKUP — $ISSUE_ID"
echo "  Model: $MODEL"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""

echo "→ Resolving 'In Progress' state for team $LINEAR_TEAM_ID..."

STATES_QUERY='
query($teamId: String!) {
  team(id: $teamId) {
    states {
      nodes {
        id
        name
        type
      }
    }
  }
}
'

STATES_RESULT=$(linear_query "$STATES_QUERY" "{\"teamId\":\"$LINEAR_TEAM_ID\"}")
STATES_ERROR=$(echo "$STATES_RESULT" | jq -r '.errors[0].message // empty')

if [[ -n "$STATES_ERROR" ]]; then
  echo "ERROR: Failed to fetch team states: $STATES_ERROR"
  exit 1
fi

IN_PROGRESS_STATE=$(echo "$STATES_RESULT" | jq -r '.data.team.states.nodes[] | select(.type == "started") | .id' | head -1)

if [[ -z "$IN_PROGRESS_STATE" ]]; then
  echo "ERROR: Could not find an 'In Progress' (started) state for team $LINEAR_TEAM_ID"
  exit 1
fi

echo "  ✓ Found In Progress state"
echo ""

# ── Step 1: Fetch issue details ─────────────────────────────────────────────

echo "→ Fetching $ISSUE_ID from Linear..."

FETCH_QUERY='
query($id: String!) {
  issue(id: $id) {
    id
    identifier
    title
    description
    priority
    url
    labels { nodes { name } }
    project { name }
    projectMilestone { name }
    assignee { name }
    team { name key }
  }
}
'

FETCH_RESULT=$(linear_query "$FETCH_QUERY" "{\"id\":\"$ISSUE_ID\"}")
ISSUE_ERROR=$(echo "$FETCH_RESULT" | jq -r '.errors[0].message // empty')

if [[ -n "$ISSUE_ERROR" ]]; then
  echo "ERROR: $ISSUE_ERROR"
  exit 1
fi

ISSUE_TITLE=$(echo "$FETCH_RESULT" | jq -r '.data.issue.title')
ISSUE_DESCRIPTION=$(echo "$FETCH_RESULT" | jq -r '.data.issue.description // "No description"')
ISSUE_URL=$(echo "$FETCH_RESULT" | jq -r '.data.issue.url')
ISSUE_LABELS=$(echo "$FETCH_RESULT" | jq -r '[.data.issue.labels.nodes[].name] | join(", ")')
ISSUE_MILESTONE=$(echo "$FETCH_RESULT" | jq -r '.data.issue.projectMilestone.name // "No milestone"')
ISSUE_PRIORITY=$(echo "$FETCH_RESULT" | jq -r '.data.issue.priority')
ISSUE_TEAM=$(echo "$FETCH_RESULT" | jq -r '.data.issue.team.name')

PRIORITY_NAMES=("None" "Urgent" "High" "Medium" "Low")
PRIORITY_NAME="${PRIORITY_NAMES[$ISSUE_PRIORITY]:-Unknown}"

echo "  Team:     $ISSUE_TEAM"
echo "  Title:    $ISSUE_TITLE"
echo "  Priority: $PRIORITY_NAME"
echo "  Labels:   ${ISSUE_LABELS:-None}"
echo "  Milestone: $ISSUE_MILESTONE"
echo "  URL:      $ISSUE_URL"
echo ""

# ── Step 2: Move to "In Progress" ──────────────────────────────────────────

echo "→ Moving $ISSUE_ID to In Progress..."

UPDATE_QUERY='
mutation($id: String!, $stateId: String!) {
  issueUpdate(id: $id, input: { stateId: $stateId }) {
    success
    issue {
      id
      identifier
      state { name }
    }
  }
}
'

UPDATE_RESULT=$(linear_query "$UPDATE_QUERY" "{\"id\":\"$ISSUE_ID\",\"stateId\":\"$IN_PROGRESS_STATE\"}")
UPDATE_ERROR=$(echo "$UPDATE_RESULT" | jq -r '.errors[0].message // empty')

if [[ -n "$UPDATE_ERROR" ]]; then
  echo "ERROR: Failed to update issue: $UPDATE_ERROR"
  exit 1
fi

STATE_NAME=$(echo "$UPDATE_RESULT" | jq -r '.data.issueUpdate.issue.state.name')
echo "  ✓ $ISSUE_ID is now \"$STATE_NAME\""
echo ""

# ── Step 3: Build agent prompt ──────────────────────────────────────────────

# Truncate description to avoid blowing out the CLI args
DESCRIPTION_TRUNC=$(echo "$ISSUE_DESCRIPTION" | head -c 3000)

read -r -d '' AGENT_PROMPT << PROMPTEOF || true
You are picking up Linear issue $ISSUE_ID.

ISSUE: $ISSUE_TITLE
PRIORITY: $PRIORITY_NAME
TEAM: $ISSUE_TEAM
MILESTONE: $ISSUE_MILESTONE
LABELS: ${ISSUE_LABELS:-None}
URL: $ISSUE_URL

DESCRIPTION:
$DESCRIPTION_TRUNC

────────────────────────────────────
GENERAL INSTRUCTIONS:
- Read any existing CLAUDE.md, WORKSPACE.md, AGENTS.md, and .cursor/rules/ in the repo before coding
- Understand what already exists vs what needs building
- Propose a plan before writing code
- Work in small vertical slices
- Follow the repo's established conventions
- No classes, no enums, no emojis unless the project already uses them
- Keep files under 300 lines — split on growth

First, summarize your understanding of what needs to be done, then proceed.
PROMPTEOF

# ── Step 4: Launch Cursor Agent ─────────────────────────────────────────────

echo "→ Launching Cursor Agent (model: $MODEL)..."
echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo "  Cursor agent will start in $WORKSPACE"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""

exec "$CURSOR_CLI" agent \
  --model "$MODEL" \
  --workspace "$WORKSPACE" \
  --trust \
  --print \
  "$AGENT_PROMPT"
