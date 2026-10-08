import { buildApp } from "./app";
import { env, placeholderPaymentAllowed } from "./env";
import { selectPaymentProvider } from "./payment-provider";
import { startUserDeletedWorker } from "./queue/user-deleted-worker";

const app = await buildApp(selectPaymentProvider(placeholderPaymentAllowed));
if (placeholderPaymentAllowed) {
  app.log.warn("Platzhalter-Zahlungsanbieter aktiv: Checkouts schalten ohne echte Zahlung frei (nur Entwicklung/Test).");
} else {
  app.log.warn("Kein Zahlungsanbieter eingerichtet: Checkouts werden mit 503 abgelehnt (ALLOW_PLACEHOLDER_PAYMENT nicht gesetzt).");
}

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
