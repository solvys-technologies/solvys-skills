#!/usr/bin/env python3
"""Read-only Codex archive eligibility report. Never deletes anything."""
import argparse, collections, json, pathlib, re, sqlite3, subprocess, time

def inspect(home, protected_file):
    protected = set(json.loads(protected_file.read_text()))
    if time.time() - protected_file.stat().st_mtime > 3600:
        raise RuntimeError('Refresh app protected-task snapshot before evaluation')
    db = sqlite3.connect('file:' + str(home/'state_5.sqlite') + '?mode=ro', uri=True)
    db.row_factory = sqlite3.Row
    rows = {r['id']: dict(r) for r in db.execute('SELECT id,rollout_path,updated_at,archived,is_pinned FROM threads')}
    goals = sqlite3.connect('file:' + str(home/'goals_1.sqlite') + '?mode=ro', uri=True)
    protected.update(r[0] for r in goals.execute("SELECT thread_id FROM thread_goals WHERE status NOT IN ('complete','completed','cancelled','canceled')"))
    for parent, child in db.execute('SELECT parent_thread_id,child_thread_id FROM thread_spawn_edges'):
        if parent in protected or not rows.get(parent, {}).get('archived', False): protected.add(child)
        if child in protected or not rows.get(child, {}).get('archived', False): protected.add(parent)
    refs = set()
    uuid = re.compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}', re.I)
    for folder in ['memories','automations']:
        for p in (home/folder).rglob('*'):
            if p.is_file() and p.suffix in ('.md','.json','.toml','.yaml','.yml'):
                refs.update(uuid.findall(p.read_text(errors='replace')))
    handles = subprocess.run(['/usr/sbin/lsof','-nP','-F','n'], capture_output=True, text=True, timeout=45)
    if handles.returncode != 0: raise RuntimeError('Open-handle inventory failed')
    opened = {line[1:] for line in handles.stdout.splitlines() if line.startswith('n/')}
    report = {'checked_at':time.time(),'eligible':[],'held':[]}
    for p in (home/'archived_sessions').glob('*.jsonl'):
        reasons=[]; tid=None; row={}
        try:
            with p.open() as f: tid=json.loads(f.readline()).get('payload',{}).get('id')
            row=rows.get(tid,{})
            if not row or pathlib.Path(row['rollout_path']).resolve()!=p.resolve(): reasons.append('unverified identity/path')
            if not row.get('archived'): reasons.append('not indexed archived')
            if row.get('is_pinned') or tid in protected: reasons.append('protected task/goal/dependency')
            if tid in refs: reasons.append('memory/automation reference')
            if str(p) in opened: reasons.append('open handle')
            last=max(row.get('updated_at',time.time()),p.stat().st_mtime)
            if time.time()-last<30*86400: reasons.append('less than 30 days inactive')
            item={'id':tid,'path':str(p),'size':p.stat().st_size,'last_activity':last,'reasons':reasons}
        except Exception as e: item={'id':tid,'path':str(p),'reasons':['unverified: '+type(e).__name__]}; reasons=item['reasons']
        report['held' if reasons else 'eligible'].append(item)
    # Parent deletion may cascade. Hold any ancestor of a held/unknown child.
    edges=list(db.execute('SELECT parent_thread_id,child_thread_id FROM thread_spawn_edges'))
    eligible={i['id']:i for i in report['eligible']}
    changed=True
    while changed:
        changed=False
        for parent,child in edges:
            if parent in eligible and child not in eligible:
                item=eligible.pop(parent);item['reasons']=['child is not independently eligible for deletion'];report['held'].append(item);changed=True
    report['eligible']=list(eligible.values())
    report['reason_counts']=dict(collections.Counter(r for item in report['held'] for r in item['reasons']))
    return report

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--codex-home',type=pathlib.Path,default=pathlib.Path.home()/'.codex');p.add_argument('--protected-task-ids',type=pathlib.Path,required=True);p.add_argument('--output',type=pathlib.Path,required=True);args=p.parse_args()
    report=inspect(args.codex_home,args.protected_task_ids);args.output.write_text(json.dumps(report,indent=2))
    print(json.dumps({'eligible':len(report['eligible']),'eligible_bytes':sum(i['size'] for i in report['eligible']),'held':len(report['held']),'reason_counts':report['reason_counts']}))
