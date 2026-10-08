import Fastify, { type FastifyInstance } from "fastify";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db/client";
import { invoice, subscription } from "./db/schema";
import { env } from "./env";
import { PaymentProviderNotConfiguredError, placeholderPaymentProvider, type PaymentProvider } from "./payment-provider";
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

  // F-82 ("u. a. Rechnungen") — eigener, schlanker Endpunkt statt die Rechnungen an
  // /subscriptions/:userId anzuhängen, analog zur Trennung eines echten PSPs zwischen Abo- und
  // Rechnungs-Ressourcen.
  app.get("/subscriptions/:userId/invoices", async (request, reply) => {
    const { userId } = userIdParamsSchema.parse(request.params);
    const [subscriptionRow] = await db.select().from(subscription).where(eq(subscription.userId, userId));
    if (!subscriptionRow) {
      return reply.send([]);
    }
    const rows = await db
      .select({ amountCents: invoice.amountCents, currency: invoice.currency, status: invoice.status, issuedAt: invoice.issuedAt })
      .from(invoice)
      .where(eq(invoice.subscriptionId, subscriptionRow.id))
      .orderBy(desc(invoice.issuedAt));
    return reply.send(rows.map((row) => ({ ...row, issuedAt: row.issuedAt.toISOString() })));
  });

  app.post("/checkout-sessions", async (request, reply) => {
    const { userId } = checkoutSessionBodySchema.parse(request.body);
    let session: Awaited<ReturnType<PaymentProvider["createCheckoutSession"]>>;
    try {
      session = await paymentProvider.createCheckoutSession(userId);
    } catch (error) {
      if (error instanceof PaymentProviderNotConfiguredError) {
        return reply.code(503).send({ error: error.message });
      }
      throw error;
    }

    // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): Diese Route hatte
    // keinerlei Schutz gegen einen doppelten/erneuten Aufruf (Client-Retry nach dem 5s-Timeout
    // in apps/api/src/payment/client.ts, oder ein doppelt abgeschickter "Jetzt freischalten"-
    // Klick). Zwei Probleme behoben: (1) eine Transaktion mit `for("update")`-Zeilensperre auf
    // der bestehenden Subscription-Zeile serialisiert zwei nahezu gleichzeitige Aufrufe für
    // dieselbe Nutzer-ID, statt dass beide denselben "existing"-Zustand lesen und beim INSERT auf
    // den unique(user_id)-Constraint kollidieren; (2) ein bereits aktives Abo wird ab dem
    // SPÄTEREN von "jetzt" und dem bisherigen Periodenende verlängert statt bedingungslos auf
    // "jetzt + 30 Tage" zurückgesetzt — sonst hätte ein Doppel-Aufruf die verbleibende bezahlte
    // Zeit sogar verkürzen können. Eine vollständige Dedup-Sperre gegen eine ECHTE doppelte
    // Abbuchung braucht zusätzlich einen client-seitigen Idempotenz-Schlüssel, den es beim
    // aktuellen Platzhalter-PSP (simuliert sofortigen Erfolg, kein echter Redirect) noch nicht
    // gibt — sinnvoll nachzuziehen, sobald ein echter Zahlungsdienstleister ausgewählt ist
    // (Entwicklungsplan Iteration 6).
    const row = await db.transaction(async (tx) => {
      async function upsertActiveSubscription(existing: typeof subscription.$inferSelect | undefined) {
        const newPeriodEnd =
          existing?.status === "active" && existing.currentPeriodEnd > new Date()
            ? new Date(Math.max(existing.currentPeriodEnd.getTime(), session.currentPeriodEnd.getTime()))
            : session.currentPeriodEnd;

        const [updatedOrCreated] = existing
          ? await tx
              .update(subscription)
              .set({ status: "active", currentPeriodEnd: newPeriodEnd, canceledAt: null, updatedAt: new Date() })
              .where(eq(subscription.userId, userId))
              .returning()
          : await tx.insert(subscription).values({ userId, status: "active", currentPeriodEnd: newPeriodEnd }).returning();
        return updatedOrCreated!;
      }

      const [existing] = await tx.select().from(subscription).where(eq(subscription.userId, userId)).for("update");

      // `for("update")` sperrt nur eine BESTEHENDE Zeile — für eine brandneue Nutzer-ID (kein
      // "existing") schützt das nicht gegen zwei echt gleichzeitige Erst-Checkouts, die beide
      // versuchen einzufügen. Statt einer zusätzlichen Advisory-Lock-Infrastruktur: den seltenen
      // Kollisionsfall abfangen und dann als Update statt Insert erneut versuchen — die andere
      // Transaktion hat zu diesem Zeitpunkt bereits committet.
      let updatedOrCreated;
      try {
        updatedOrCreated = await upsertActiveSubscription(existing);
      } catch (error) {
        if (!existing && error instanceof Error && "code" in error && (error as { code: unknown }).code === "23505") {
          const [nowExisting] = await tx.select().from(subscription).where(eq(subscription.userId, userId)).for("update");
          updatedOrCreated = await upsertActiveSubscription(nowExisting);
        } else {
          throw error;
        }
      }

      // Platzhalter-Betrag (F-81 nennt keinen konkreten Preis) — reine Demonstration der
      // Rechnungshistorie für F-82 ("u. a. Rechnungen").
      await tx.insert(invoice).values({ subscriptionId: updatedOrCreated.id, amountCents: 999, status: "paid" });

      return updatedOrCreated;
    });

    await publishSubscriptionUpdated({ userId, premiumUntil: row.currentPeriodEnd.toISOString() });

    return reply.send({ checkoutUrl: session.checkoutUrl, premiumUntil: row.currentPeriodEnd.toISOString() });
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

    // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): vorher wurde nur die
    // lokale Zeile umgeschaltet, ohne den PSP selbst zu informieren — siehe payment-provider.ts.
    await paymentProvider.cancelSubscription(userId);

    // Bewusst sofortige Deaktivierung statt Zugriff bis zum Periodenende (v1-Vereinfachung,
    // siehe Architekturplanung Abschnitt 13) — vermeidet einen zusätzlichen zeitgesteuerten Job,
    // der Abos exakt zum Periodenende nachträglich deaktivieren müsste.
    await publishSubscriptionUpdated({ userId, premiumUntil: null });

    return reply.send({ status: "canceled" });
  });

  return app;
}
