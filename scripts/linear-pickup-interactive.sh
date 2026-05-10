#!/bin/bash
# ============================================================================
# linear-pickup-interactive.sh — Same as linear-pickup.sh but opens an
# interactive Cursor Agent session (not headless --print mode).
#
# A generic operational protocol for any Linear workspace, any repo.
#
# Usage:
#   LINEAR_API_KEY=lin_api_xxx LINEAR_TEAM_ID=xxx \
#     ./scripts/linear-pickup-interactive.sh SOL-78 [model]
# ============================================================================
set -eo pipefail

WORKSPACE="${WORKSPACE:-$PWD}"
CURSOR_CLI="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
LINEAR_API="https://api.linear.app/graphql"
DEFAULT_MODEL="claude-4.6-sonnet-medium"

if [[ "$1" == "--help" || "$1" == "-h" || $# -eq 0 ]]; then
  echo "linear-pickup-interactive.sh — Start an interactive Cursor session for a Linear issue"
  echo ""
  echo "Usage: LINEAR_API_KEY=lin_api_xxx LINEAR_TEAM_ID=xxx \\"
  echo "         ./scripts/linear-pickup-interactive.sh ISSUE_ID [MODEL]"
  echo ""
  echo "  ISSUE_ID   e.g. SOL-78, PROJ-42"
  echo "  MODEL      Cursor agent model (default: $DEFAULT_MODEL)"
  echo ""
  echo "  Env: LINEAR_API_KEY (required), LINEAR_TEAM_ID (required),"
  echo "       WORKSPACE (default: current directory)"
  exit 0
fi

ISSUE_ID="$1"
MODEL="${2:-$DEFAULT_MODEL}"

if [[ -z "$LINEAR_API_KEY" ]]; then
  echo "ERROR: LINEAR_API_KEY not set"
  exit 1
fi

if [[ -z "$LINEAR_TEAM_ID" ]]; then
  echo "ERROR: LINEAR_TEAM_ID not set"
  exit 1
fi

if [[ ! -f "$CURSOR_CLI" ]]; then
  echo "ERROR: Cursor CLI not found at $CURSOR_CLI"
  exit 1
fi

if [[ ! -d "$WORKSPACE" ]]; then
  echo "ERROR: Workspace not found at $WORKSPACE"
  exit 1
fi

linear_query() {
  curl -s "$LINEAR_API" \
    -H "Content-Type: application/json" \
    -H "Authorization: $LINEAR_API_KEY" \
    --data "$(jq -n --arg q "$1" --argjson v "${2:-{}}" '{query: $q, variables: $v}')" \
    --max-time 15
}

# ── Resolve "In Progress" state ────────────────────────────────────────────

STATES_QUERY='
query($teamId: String!) {
  team(id: $teamId) {
    states { nodes { id name type } }
  }
}'
STATES_RESULT=$(linear_query "$STATES_QUERY" "{\"teamId\":\"$LINEAR_TEAM_ID\"}")
IN_PROGRESS_STATE=$(echo "$STATES_RESULT" | jq -r '.data.team.states.nodes[] | select(.type == "started") | .id' | head -1)

if [[ -z "$IN_PROGRESS_STATE" ]]; then
  echo "ERROR: Could not find 'In Progress' (started) state for team $LINEAR_TEAM_ID"
  exit 1
fi

# ── Fetch issue ────────────────────────────────────────────────────────────

FETCH_QUERY='
query($id: String!) {
  issue(id: $id) {
    identifier title description priority url
    projectMilestone { name }
    assignee { name }
    labels { nodes { name } }
    team { name key }
  }
}'

FETCH_RESULT=$(linear_query "$FETCH_QUERY" "{\"id\":\"$ISSUE_ID\"}")
ISSUE_ERROR=$(echo "$FETCH_RESULT" | jq -r '.errors[0].message // empty')

if [[ -n "$ISSUE_ERROR" ]]; then
  echo "ERROR: $ISSUE_ERROR"
  exit 1
fi

ISSUE_TITLE=$(echo "$FETCH_RESULT" | jq -r '.data.issue.title')
ISSUE_DESCRIPTION=$(echo "$FETCH_RESULT" | jq -r '.data.issue.description // "No description"')
ISSUE_URL=$(echo "$FETCH_RESULT" | jq -r '.data.issue.url')
ISSUE_TEAM=$(echo "$FETCH_RESULT" | jq -r '.data.issue.team.name')

echo "═══════════════════════════════════════════════════════════════════════"
echo "  LINEAR PICKUP — $ISSUE_ID"
echo "  $ISSUE_TITLE"
echo "  Team: $ISSUE_TEAM  |  Model: $MODEL"
echo "═══════════════════════════════════════════════════════════════════════"

# ── Move to In Progress ────────────────────────────────────────────────────

UPDATE_QUERY='
mutation($id: String!, $stateId: String!) {
  issueUpdate(id: $id, input: { stateId: $stateId }) {
    success
    issue { identifier state { name } }
  }
}'
UPDATE_RESULT=$(linear_query "$UPDATE_QUERY" "{\"id\":\"$ISSUE_ID\",\"stateId\":\"$IN_PROGRESS_STATE\"}")
UPDATE_ERROR=$(echo "$UPDATE_RESULT" | jq -r '.errors[0].message // empty')

if [[ -n "$UPDATE_ERROR" ]]; then
  echo "ERROR: Failed to update issue: $UPDATE_ERROR"
  exit 1
fi

STATE_NAME=$(echo "$UPDATE_RESULT" | jq -r '.data.issueUpdate.issue.state.name')
echo "  ✓ Moved to \"$STATE_NAME\""

DESCRIPTION_TRUNC=$(echo "$ISSUE_DESCRIPTION" | head -c 3000)

read -r -d '' AGENT_PROMPT << PROMPTEOF || true
You are picking up Linear issue $ISSUE_ID ($ISSUE_TEAM).

ISSUE: $ISSUE_TITLE
URL: $ISSUE_URL

DESCRIPTION:
$DESCRIPTION_TRUNC

────────────────────────────────────
GENERAL INSTRUCTIONS:
- Read CLAUDE.md, WORKSPACE.md, AGENTS.md, .cursor/rules/ for full project context
- Understand what already exists vs what needs building
- Propose a plan before writing code
- Work in small vertical slices
- Follow the repo's established conventions

First, read relevant existing code and briefs, then propose your plan.
PROMPTEOF

echo ""
echo "→ Starting interactive Cursor Agent..."
echo "  (Type /help in the agent for commands)"
echo ""

exec "$CURSOR_CLI" agent \
  --model "$MODEL" \
  --workspace "$WORKSPACE" \
  --trust \
  "$AGENT_PROMPT"
