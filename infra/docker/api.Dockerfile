# Kern-API (Review A5/INF-01). Bauen aus dem Repository-Wurzelverzeichnis:
#   docker build -f infra/docker/api.Dockerfile -t edukedo-api .
# Das Image enthält den Server (dist/index.js), die Betriebsbefehle (dist/migrate.js, dist/import-content.js, ...), die
# Migrationen (drizzle/) und die Inhalte (content/). Migration beim Deployment: `node dist/migrate.js`.

FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edukedo/api build
# Nur die Produktionsabhängigkeiten plus gebautes dist/ und drizzle/ (siehe "files" in apps/api/package.json).
RUN pnpm --filter @edukedo/api --prod deploy /deploy

FROM node:22-slim
ENV NODE_ENV=production \
    PORT=3001 \
    CONTENT_DIR=/app/content
WORKDIR /app
COPY --from=build /deploy ./
COPY content ./content
USER node
EXPOSE 3001
CMD ["node", "dist/index.js"]
