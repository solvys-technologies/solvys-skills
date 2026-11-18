#!/usr/bin/env python3
# SOLVYS_GENERATED_WORKFLOW_LAUNCHER
import json
import subprocess
import sys
from pathlib import Path

project = Path(__file__).resolve().parents[1]
pointer = json.loads((project / '.solvys/factory.json').read_text())
if pointer.get('repository') != 'solvys-technologies/solvys-factory':
    raise SystemExit('Unrecognized factory pointer; reattach the canonical monorepo')
factory = (project / pointer['localPath']).resolve()
entry = factory / 'workflow/route.py'
if not entry.is_file():
    raise SystemExit('Attached factory is unavailable; locate it and rerun workflow/attach.py')
raise SystemExit(subprocess.run([sys.executable, str(entry), *sys.argv[1:], '--project', str(project)]).returncode)
