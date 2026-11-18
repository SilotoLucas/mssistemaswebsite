FROM oven/bun:1.4.0 AS bun

FROM node:24-bookworm-slim AS construcao
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --ignore-scripts
RUN bun run build

FROM caddy:2.10.2-alpine
COPY deploy/Caddyfile.site /etc/caddy/Caddyfile
COPY --from=construcao /app/apps/web/dist /srv
