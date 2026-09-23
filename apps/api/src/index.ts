import { buildApp } from "./app";
import { env } from "./env";
import { startAiGradingWorker } from "./queue/ai-grading-queue";

const app = await buildApp();

// F-70: läuft im selben Prozess wie die Fastify-App statt als eigenständiges Deployment — das
// Projekt läuft bewusst als einzelner Prozess ohne horizontale Skalierung (siehe
// Architekturplanung Abschnitt 1), ein separater Worker-Prozess wäre hier unnötiger
// Infrastruktur-Aufwand für den aktuellen Umfang.
startAiGradingWorker();

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => app.log.info(`edukedo-api hört auf Port ${env.PORT}`))
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
