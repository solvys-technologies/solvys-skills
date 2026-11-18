#!/usr/bin/env python3
"""Catch common destructive shell operations. This is not a shell sandbox."""
import json
import shlex
import sys
from pathlib import PurePath


def destructive_shell_reason(payload):
    data = payload.get('tool_input') or payload.get('toolInput') or payload
    if not isinstance(data, dict):
        return None
    command = data.get('command') or data.get('cmd') or ''
    if not isinstance(command, str) or not command:
        return None
    try:
        lexer = shlex.shlex(command, posix=True, punctuation_chars=';&|()\n')
        lexer.whitespace = ' \t\r'
        lexer.whitespace_split = True
        tokens = list(lexer)
    except ValueError:
        # shlex is not a shell grammar; valid heredocs can contain unmatched
        # shell quotes. An unsupported parse is not evidence of deletion.
        return None
    segments = [[]]
    for token in tokens:
        if token and all(c in ';&|()\n' for c in token):
            segments.append([])
        else:
            segments[-1].append(token)
    for words in segments:
        while words and (words[0] in {'sudo', 'command', 'env', 'exec', 'nohup'} or '=' in words[0]):
            words = words[1:]
        if not words:
            continue
        name = PurePath(words[0]).name
        args = words[1:]
        reason = None
        if name == 'rm' and any(a == '--recursive' or (a.startswith('-') and not a.startswith('--') and ('r' in a or 'R' in a)) for a in args):
            reason = 'recursive file removal'
        elif name == 'git':
            # Git global options may precede the subcommand (for example -C).
            i = 0
            while i < len(args) and args[i].startswith('-'):
                i += 2 if args[i] in {'-C', '-c', '--git-dir', '--work-tree', '--namespace'} else 1
            sub = args[i] if i < len(args) else ''
            opts = args[i + 1:]
            if sub == 'reset' and '--hard' in opts:
                reason = 'hard Git reset'
            elif sub == 'clean' and any(a == '--force' or (a.startswith('-') and not a.startswith('--') and 'f' in a) for a in opts):
                reason = 'forced Git clean'
            elif sub == 'checkout' and '--' in opts:
                reason = 'discarding working files with Git checkout'
            elif sub == 'worktree' and opts and opts[0] in {'remove', 'prune'}:
                reason = 'worktree removal or recovery metadata pruning'
        elif name == 'diskutil' and args and (args[0].startswith('erase') or args[0] == 'partitionDisk'):
            reason = 'disk erasure'
        elif name.startswith('mkfs'):
            reason = 'filesystem formatting'
        elif name in {'sh', 'bash', 'zsh'} and '-c' in args:
            i = args.index('-c')
            if i + 1 < len(args):
                reason = destructive_shell_reason({'command': args[i + 1]})
        if reason:
            return 'Solvys recovery guard blocked ' + reason + '. Preserve dirty/unpushed files in a verified backup and use a bounded recovery workflow.'
    return None


def main():
    try:
        payload = json.load(sys.stdin)
        if not isinstance(payload, dict):
            raise ValueError('expected an object')
        reason = destructive_shell_reason(payload)
    except (ValueError, TypeError):
        reason = 'Solvys recovery guard received invalid JSON.'
    result = {'permission': 'deny' if reason else 'allow'}
    if reason:
        result.update(user_message=reason, agent_message=reason)
        print(reason, file=sys.stderr)
    print(json.dumps(result))
    return 2 if reason else 0


if __name__ == '__main__':
    sys.exit(main())
