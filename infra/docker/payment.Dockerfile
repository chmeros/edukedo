# Payment-Service (Review A5/INF-01), vollständig getrennt vom Kern. Bauen aus dem Repository-Wurzelverzeichnis:
#   docker build -f infra/docker/payment.Dockerfile -t edukedo-payment .
# Migration beim Deployment: `node dist/migrate.js`.

FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edukedo/payment build
RUN pnpm --filter @edukedo/payment --prod deploy /deploy

FROM node:22-slim
ENV NODE_ENV=production \
    PORT=3002
WORKDIR /app
COPY --from=build /deploy ./
USER node
EXPOSE 3002
CMD ["node", "dist/index.js"]
