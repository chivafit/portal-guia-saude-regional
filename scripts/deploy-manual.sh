#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAGES_WORKTREE="${GUIA_PAGES_WORKTREE:-/private/tmp/guia-saude-deploy}"
DOMAIN="guiasaude.app.br"

cd "$ROOT"

echo "→ Sincronizando main..."
git pull --ff-only origin main

echo "→ Gerando build de produção..."
npm run build:pages

echo "→ Preparando GitHub Pages..."
printf '%s\n' "$DOMAIN" > out/CNAME
touch out/.nojekyll

if ! git -C "$PAGES_WORKTREE" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "→ Criando worktree gh-pages em $PAGES_WORKTREE..."
  rm -rf "$PAGES_WORKTREE"
  git worktree add "$PAGES_WORKTREE" gh-pages
fi

if [ "$(git -C "$PAGES_WORKTREE" branch --show-current)" != "gh-pages" ]; then
  echo "Erro: $PAGES_WORKTREE não está na branch gh-pages." >&2
  exit 1
fi

echo "→ Atualizando arquivos publicados..."
find "$PAGES_WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R out/. "$PAGES_WORKTREE"/

git -C "$PAGES_WORKTREE" add -A

if git -C "$PAGES_WORKTREE" diff --cached --quiet; then
  echo "✓ Nenhuma alteração nova para publicar."
  exit 0
fi

git -C "$PAGES_WORKTREE" commit -m "Deploy manual: $(date '+%Y-%m-%d %H:%M')"

echo "→ Sincronizando referência remota..."
git -C "$PAGES_WORKTREE" fetch origin gh-pages

echo "→ Publicando gh-pages..."
git -C "$PAGES_WORKTREE" push --force-with-lease origin gh-pages

echo "✓ Deploy concluído: https://$DOMAIN"
