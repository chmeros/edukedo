import Fastify, { type FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db/client";
import { invoice, subscription } from "./db/schema";
import { env } from "./env";
import { placeholderPaymentProvider, type PaymentProvider } from "./payment-provider";
import { publishSubscriptionUpdated } from "./queue/subscription-updated-queue";

const userIdParamsSchema = z.object({ userId: z.string().uuid() });
const checkoutSessionBodySchema = z.object({ userId: z.string().uuid() });

/**
 * Schmale REST-API statt tRPC (Architekturplanung Abschnitt 7: "bewusst nicht mit dem
 * Payment-Service geteilt, um dessen Isolation nicht über gemeinsame Typen/Verträge
 * aufzuweichen") — ein stabiler, sprachunabhängiger HTTP-Vertrag statt TS-spezifischem RPC.
 * Jede Route außer /health verlangt den Header `x-kern-service-token` (siehe env.ts) als
 * einfaches Dienst-zu-Dienst-Shared-Secret, da diese API nie vom Browser aus aufgerufen wird.
 */
export async function buildApp(paymentProvider: PaymentProvider = placeholderPaymentProvider): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });

  app.get("/health", async () => ({ status: "ok" }));

  app.addHook("preHandler", async (request, reply) => {
    if (request.url === "/health") return;
    if (request.headers["x-kern-service-token"] !== env.KERN_SERVICE_TOKEN) {
      await reply.code(401).send({ error: "Ungültiges oder fehlendes Service-Token." });
    }
  });

  app.get("/subscriptions/:userId", async (request, reply) => {
    const { userId } = userIdParamsSchema.parse(request.params);
    const [row] = await db.select().from(subscription).where(eq(subscription.userId, userId));
    if (!row) {
      return reply.send({ status: "none", premiumUntil: null });
    }
    return reply.send({
      status: row.status,
      premiumUntil: row.status === "active" ? row.currentPeriodEnd.toISOString() : null,
    });
  });

  app.post("/checkout-sessions", async (request, reply) => {
    const { userId } = checkoutSessionBodySchema.parse(request.body);
    const session = await paymentProvider.createCheckoutSession(userId);

    // Platzhalter-PSP simuliert eine sofort erfolgreiche Zahlung statt eines echten,
    // asynchronen Webhooks (siehe payment-provider.ts) — daher wird die Subscription hier
    // direkt aktiv geschaltet, nicht erst nach einem separaten Webhook-Aufruf.
    const [existing] = await db.select().from(subscription).where(eq(subscription.userId, userId));
    const [row] = existing
      ? await db
          .update(subscription)
          .set({ status: "active", currentPeriodEnd: session.currentPeriodEnd, canceledAt: null, updatedAt: new Date() })
          .where(eq(subscription.userId, userId))
          .returning()
      : await db
          .insert(subscription)
          .values({ userId, status: "active", currentPeriodEnd: session.currentPeriodEnd })
          .returning();

    // Platzhalter-Betrag (F-81 nennt keinen konkreten Preis) — reine Demonstration der
    // Rechnungshistorie für F-82 ("u. a. Rechnungen").
    await db.insert(invoice).values({ subscriptionId: row!.id, amountCents: 999, status: "paid" });

    await publishSubscriptionUpdated({ userId, premiumUntil: session.currentPeriodEnd.toISOString() });

    return reply.send({ checkoutUrl: session.checkoutUrl, premiumUntil: session.currentPeriodEnd.toISOString() });
  });

  app.post("/subscriptions/:userId/cancel", async (request, reply) => {
    const { userId } = userIdParamsSchema.parse(request.params);
    const [row] = await db
      .update(subscription)
      .set({ status: "canceled", canceledAt: new Date(), updatedAt: new Date() })
      .where(eq(subscription.userId, userId))
      .returning();

    if (!row) {
      return reply.code(404).send({ error: "Kein Abo für diese Nutzer-ID gefunden." });
    }

    // Bewusst sofortige Deaktivierung statt Zugriff bis zum Periodenende (v1-Vereinfachung,
    // siehe Architekturplanung Abschnitt 13) — vermeidet einen zusätzlichen zeitgesteuerten Job,
    // der Abos exakt zum Periodenende nachträglich deaktivieren müsste.
    await publishSubscriptionUpdated({ userId, premiumUntil: null });

    return reply.send({ status: "canceled" });
  });

  return app;
}
