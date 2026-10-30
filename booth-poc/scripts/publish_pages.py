"""Publish only dist/ to q/main:booth/, preserving every sibling Git blob.

Prepare: python scripts/publish_pages.py
Publish reviewed checkout: python scripts/publish_pages.py --publish
Verify public hashes/workflow: python scripts/publish_pages.py --verify
Checkout and machine-readable evidence live under ignored .runtime/.
"""
import argparse
import hashlib
import json
import shutil
import subprocess
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHECKOUT = ROOT / '.runtime/pages-checkout'
RECORD = ROOT / '.runtime/pages-release.json'
SITE = 'https://toastmasterslee.github.io/q/booth/'

def git(*args):
    return subprocess.check_output(['git', '-C', str(CHECKOUT), *args], text=True).strip()

def outside(ref):
    return {line.split('\t')[1]: line.split('\t')[0] for line in git('ls-tree', '-r', ref).splitlines()
            if not line.split('\t')[1].startswith('booth/')}

def digest(data):
    return hashlib.sha256(data).hexdigest()

def save(record):
    RECORD.write_text(json.dumps(record, indent=2) + '\n', encoding='utf-8')

def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'booth-pages-verifier'})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--publish', action='store_true')
    parser.add_argument('--verify', action='store_true')
    parser.add_argument('--github-proof', type=Path, help='Fresh connector proof when anonymous GitHub API is rate limited')
    args = parser.parse_args()
    assert git('rev-parse', '--show-toplevel').replace('\\', '/').lower() == CHECKOUT.as_posix().lower()
    assert git('remote', 'get-url', 'origin') in ('https://github.com/ToastmastersLee/q.git', 'git@github-work:ToastmastersLee/q.git')
    if args.verify:
        record = json.loads(RECORD.read_text(encoding='utf-8'))
        sha = record['commit']
        if args.github_proof:
            proof = json.loads(args.github_proof.read_text(encoding='utf-8'))
            age = (datetime.now(timezone.utc) - datetime.fromisoformat(proof['fetchedAt'].replace('Z', '+00:00'))).total_seconds()
            assert 0 <= age < 1800
            head, workflow = proof['headSha'], proof['workflow']
            assert workflow['head_sha'] == sha
        else:
            head = json.loads(fetch('https://api.github.com/repos/ToastmastersLee/q/commits/main'))['sha']
            runs = json.loads(fetch(f'https://api.github.com/repos/ToastmastersLee/q/actions/runs?head_sha={sha}&per_page=10'))['workflow_runs']
            workflow = next(r for r in runs if r['name'] == 'pages build and deployment')
        assert head == sha, 'Remote head moved; inspect newer release'
        assert workflow['status'] == 'completed' and workflow['conclusion'] == 'success', workflow['status']
        for relative, expected in record['files'].items():
            assert digest(fetch(SITE + relative)) == expected, relative
        for relative in ('index.html', 'lcs/index.html', 'planners/lcs/index.html', 'planners/dante/index.html', 'demos/lcs/index.html', 'demos/dante/index.html'):
            assert fetch('https://toastmasterslee.github.io/q/' + relative)
        record.update(status='public_bytes_verified_awaiting_browser', workflow=workflow['html_url'], verifiedAt=datetime.now(timezone.utc).isoformat())
        save(record)
        print(json.dumps({k:record[k] for k in ('site','commit','status','workflow','verifiedAt')}, indent=2))
        return
    if not args.publish:
        assert not git('status', '--porcelain'), 'Checkout must be clean before preparation'
        git('pull', '--ff-only')
        build = ROOT / 'dist'
        assert (build / 'index.html').is_file()
        owned = CHECKOUT / 'booth'
        assert owned.resolve().parent == CHECKOUT.resolve() and not owned.is_symlink()
        record = dict(site=SITE, previousCommit=git('rev-parse', 'HEAD'), outside=outside('HEAD'), status='prepared',
                      files={p.relative_to(build).as_posix(): digest(p.read_bytes()) for p in build.rglob('*') if p.is_file()})
        if owned.exists():
            old_paths = list(owned.rglob('*'))
            assert all(not p.is_symlink() and p.resolve().is_relative_to(owned.resolve()) for p in old_paths)
            for path in old_paths:
                if path.is_file() and path.relative_to(owned).as_posix() not in record['files']:
                    path.unlink()
        shutil.copytree(build, owned, dirs_exist_ok=True)
        git('add', '--', 'booth')
        assert all(p.startswith('booth/') for p in git('diff', '--cached', '--name-only').splitlines())
        if not git('diff', '--cached', '--name-only'):
            record.update(commit=git('rev-parse', 'HEAD'),status='pushed_waiting_for_pages')
            save(record)
            print('No file changes; verify the existing release instead of committing.')
            return
        save(record)
        print(git('diff', '--cached', '--stat'))
        return
    record = json.loads(RECORD.read_text(encoding='utf-8'))
    assert record['status'] == 'prepared'
    assert git('ls-remote', 'origin', 'refs/heads/main').split()[0] == record['previousCommit']
    for relative, expected in record['files'].items():
        assert digest((CHECKOUT / 'booth' / relative).read_bytes()) == expected
    assert all(p.startswith('booth/') for p in git('diff', '--cached', '--name-only').splitlines())
    # Source whitespace is checked before build. Preserve generated shader/HTML bytes.
    if git('rev-parse', 'HEAD') == record['previousCommit']:
        git('commit', '-m', 'Publish booth planner with left wall power routing and on-demand rendering')
    else:
        assert git('rev-parse', 'HEAD^') == record['previousCommit'], 'Unexpected local commits'
        assert not git('status', '--porcelain'), 'Unexpected uncommitted edits'
    assert outside('HEAD') == record['outside'], 'Sibling files changed'
    git('push', 'origin', 'HEAD:main')
    record.update(commit=git('rev-parse', 'HEAD'), status='pushed_waiting_for_pages')
    save(record)
    print(record['commit'])

if __name__ == '__main__':
    main()
