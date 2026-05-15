"""
Deploy built dist/ to Hostinger via SFTP.

Usage:
  python deploy.py

Reads asset filenames from dist/index.html automatically — no manual updates needed.
Bump the version in vite.config.ts (main-v53 → main-v54) before each deploy to bust CDN cache.
"""
import paramiko
import os
import re

HOST = '217.21.76.22'
PORT = 65002
USER = 'u495633441'
PASS = 'Dadi@0896'
REMOTE_ROOT = '/home/u495633441/domains/prudentia.bizzinfo.in/public_html'
LOCAL_DIST = os.path.join(os.path.dirname(__file__), 'dist')


def parse_assets(index_html_path: str) -> list[str]:
    """Extract JS and CSS asset paths from the built index.html."""
    with open(index_html_path, encoding='utf-8') as f:
        content = f.read()
    assets = re.findall(r'(?:src|href)="(/assets/[^"]+)"', content)
    return list(dict.fromkeys(assets))  # dedupe, preserve order


def main():
    index_path = os.path.join(LOCAL_DIST, 'index.html')
    if not os.path.exists(index_path):
        raise FileNotFoundError('dist/index.html not found — run npm run build first')

    assets = parse_assets(index_path)
    uploads = [('index.html', 'index.html')] + [
        (a.lstrip('/'), a.lstrip('/')) for a in assets
    ]

    print('Files to upload:')
    for local_rel, _ in uploads:
        print(f'  {local_rel}')

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, port=PORT, username=USER, password=PASS)
    sftp = ssh.open_sftp()

    try:
        sftp.stat(f'{REMOTE_ROOT}/assets')
    except FileNotFoundError:
        sftp.mkdir(f'{REMOTE_ROOT}/assets')

    for local_rel, remote_rel in uploads:
        local_path = os.path.join(LOCAL_DIST, local_rel.replace('/', os.sep))
        remote_path = f'{REMOTE_ROOT}/{remote_rel}'
        sftp.put(local_path, remote_path)
        print(f'OK {remote_rel}')

    sftp.close()
    ssh.close()
    print('\nDeploy complete.')


if __name__ == '__main__':
    main()
