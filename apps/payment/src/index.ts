import { buildApp } from "./app";
import { env } from "./env";
import { startUserDeletedWorker } from "./queue/user-deleted-worker";

const app = await buildApp();

// Läuft im selben Prozess wie die Fastify-App statt als eigenständiges Deployment — analog zur
// bestehenden Begründung bei apps/api/src/index.ts (startAiGradingWorker).
startUserDeletedWorker();

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => app.log.info(`edukedo-payment hört auf Port ${env.PORT}`))
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
