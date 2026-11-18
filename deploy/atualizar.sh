#!/usr/bin/env bash
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ESTADO="${MS_ESTADO:-/var/lib/mssistemas-deploy}"
RAMO="${MS_RAMO:-feat/redesign-visual}"
CADDY="${MS_CADDY:-abanou-caddy-1}"
SITES="${MS_SITES:-/opt/borda/sites}"

publicar_site() {
  set -a
  . "$RAIZ/deploy/.env"
  set +a
  : "${DOMINIO:?defina DOMINIO em deploy/.env}"
  local novo
  novo="$(mktemp)"
  sed "s/DOMINIO/$DOMINIO/" "$RAIZ/deploy/mssistemas.caddy.modelo" > "$novo"
  if ! cmp -s "$novo" "$SITES/mssistemas.caddy"; then
    mkdir -p "$SITES"
    install -m 644 "$novo" "$SITES/mssistemas.caddy"
    docker exec "$CADDY" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
    echo "proxy atualizado para $DOMINIO"
  fi
  rm -f "$novo"
}

principal() {
  mkdir -p "$ESTADO"
  exec 9>"$ESTADO/trava"
  flock -n 9 || { echo "deploy já em andamento"; return 0; }
  cd "$RAIZ"
  git fetch --quiet origin "$RAMO"
  local alvo ultimo
  alvo="$(git rev-parse "origin/$RAMO")"
  ultimo="$(cat "$ESTADO/ultimo" 2>/dev/null || true)"
  if [ "$alvo" = "$ultimo" ] && [ "${1:-}" != "--forcar" ]; then return 0; fi
  echo "deploy de ${alvo:0:7} (antes: ${ultimo:0:7})"
  git checkout --quiet --force "$RAMO"
  git reset --quiet --hard "$alvo"
  (cd deploy && docker compose up -d --build --remove-orphans)
  publicar_site
  docker image prune -f > /dev/null
  echo "$alvo" > "$ESTADO/ultimo"
  echo "deploy de ${alvo:0:7} concluído"
}

principal "$@"
exit
