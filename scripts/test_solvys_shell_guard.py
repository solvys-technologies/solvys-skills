#!/usr/bin/env python3
"""Synthetic inputs only; no destructive commands are executed."""
import json
import subprocess
import sys
from pathlib import Path
from solvys_shell_guard import destructive_shell_reason
from factory_productivity_hook import default_state, stop_decision

root = Path(__file__).parent
blocked = ['git worktree remove /tmp/example', 'git worktree prune', 'rm -rf /tmp/example', 'rm -fr /tmp/example', 'rm -r /tmp/example', '/bin/rm -R /tmp/example', 'rm --recursive /tmp/example', 'git reset --hard', 'git -C "/tmp/project space" reset --hard', 'git clean -fd', 'git clean -dfx', 'git checkout -- .', 'git worktree remove --force /tmp/example', 'diskutil eraseDisk APFS X disk7', 'mkfs.ext4 /tmp/example', 'echo ok; rm -fr /tmp/example', 'echo ok\nrm -r /tmp/example', "bash -c 'rm -rf /tmp/example'"]
allowed = ['git status --short', 'git -C /tmp/example diff --stat', 'git clean -nd', 'git checkout main', 'git worktree list', 'rm /tmp/one-file', 'echo "rm -rf /tmp/example"', 'printf "%s" "git reset --hard"', 'python3 work/preserve_goalpost.py']
count = 0
assert destructive_shell_reason({'command': "python3 - <<'PY'\nprint(\"it's a report\")\nPY"}) is None
count += 1
for key in ['command', 'cmd']:
    for command in blocked + allowed:
        payload = {'tool_name': 'Bash', 'tool_input': {key: command}}
        assert bool(destructive_shell_reason(payload)) == (command in blocked), command
        count += 1
for event in ['PreToolUse', 'SessionStart', 'PostToolUse']:
    payload = {'tool_name': 'Bash', 'tool_input': {'cmd': blocked[0]}}
    p = subprocess.run([sys.executable, str(root/'factory_productivity_hook.py'), '--event', event, '--no-write'], input=json.dumps(payload), capture_output=True, text=True)
    output = json.loads(p.stdout)
    if event == 'PreToolUse':
        assert p.returncode == 2 and output['hookSpecificOutput']['permissionDecision'] == 'deny' and p.stderr
    else:
        assert p.returncode == 0 and output['hookSpecificOutput']['hookEventName'] == event
    count += 1
for script in ['/Users/tifos/.cursor/hooks/solvys-shell-guard.sh', '/Users/tifos/.config/devin/hooks/solvys-shell-guard.sh', '/Users/tifos/.config/opencode/cursor/hooks/solvys-shell-guard.sh']:
    for command in [blocked[1], allowed[0]]:
        p = subprocess.run([script], input=json.dumps({'tool_input': {'cmd': command}}), capture_output=True, text=True)
        assert p.returncode == (2 if command in blocked else 0)
        assert json.loads(p.stdout)['permission'] == ('deny' if command in blocked else 'allow')
        count += 1
state = default_state('test', 'test')
assert stop_decision({}, state)[0] == 'allow'
state['correctionLatch']['active'] = True
assert stop_decision({}, state)[0] == 'deny'
state['correctionLatch']['active'] = False
state['circuit']['state'] = 'open'
assert stop_decision({}, state)[0] == 'deny'
count += 3
print(json.dumps({'checksPassed': count, 'destructiveCommandsExecuted': 0}))
