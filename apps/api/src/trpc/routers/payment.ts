import { eq } from "drizzle-orm";
import { isPremiumActive } from "../../auth/premium-status";
import { user } from "../../db/schema";
import {
  cancelSubscription as cancelRemoteSubscription,
  createCheckoutSession,
  fetchInvoices,
  fetchPaymentStatus,
} from "../../payment/client";
import { protectedProcedure, router } from "../trpc";

/**
 * F-81/F-82 (Payment-Baustein 2, siehe Architekturplanung Abschnitt 13): Abo-/Kaufverwaltung und
 * Statusübersicht im Nutzerprofil, aufbauend auf dem Payment-Service-Grundgerüst (Baustein 1).
 * Seit 25.09.2026 (Nutzer-Vorgabe, siehe Abschnitt 13) die alleinige Quelle für die Freischaltung
 * von F-70 (KI-Bewertung) und F-129 (Instrumenten-Lernpfade) — die vormaligen separaten
 * admin-vergebbaren Freischalt-Flags je Funktion entfallen, siehe `auth/premium-status.ts`.
 */
export const paymentRouter = router({
  /**
   * N-10 ("ein Ausfall darf den Kernbetrieb nicht beeinträchtigen"): bei einem nicht
   * erreichbaren Payment-Service wird NICHT geworfen, sondern auf den zuletzt per Event-Queue
   * aktualisierten `user.premium_until`-Cache zurückgefallen (`live: false` macht das für das
   * Frontend unterscheidbar). Bei Erfolg wird der Cache zusätzlich gleich aktualisiert — ein
   * abweichender Wert kann sonst nur eintreten, wenn eine `subscription.updated`-Zustellung
   * verloren ging.
   */
  status: protectedProcedure.query(async ({ ctx }) => {
    try {
      const remote = await fetchPaymentStatus(ctx.currentUser.id);
      const premiumUntil = remote.status === "active" && remote.premiumUntil ? new Date(remote.premiumUntil) : null;
      if (premiumUntil?.getTime() !== ctx.currentUser.premiumUntil?.getTime()) {
        await ctx.db.update(user).set({ premiumUntil }).where(eq(user.id, ctx.currentUser.id));
      }
      return { isPremiumActive: isPremiumActive(premiumUntil), premiumUntil: premiumUntil?.toISOString() ?? null, live: true };
    } catch {
      const cached = ctx.currentUser.premiumUntil;
      return { isPremiumActive: isPremiumActive(cached), premiumUntil: cached?.toISOString() ?? null, live: false };
    }
  }),

  /** Aktualisiert den lokalen Cache direkt aus der synchronen REST-Antwort (siehe
   * Architekturplanung Abschnitt 3: der zweite, asynchrone Kanal — die Event-Queue — bestätigt
   * denselben Wert kurz darauf noch einmal, was dank des absoluten Ereigniszustands unschädlich ist). */
  startCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await createCheckoutSession(ctx.currentUser.id);
    await ctx.db.update(user).set({ premiumUntil: new Date(session.premiumUntil) }).where(eq(user.id, ctx.currentUser.id));
    return { checkoutUrl: session.checkoutUrl };
  }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    await cancelRemoteSubscription(ctx.currentUser.id);
    await ctx.db.update(user).set({ premiumUntil: null }).where(eq(user.id, ctx.currentUser.id));
    return { success: true };
  }),

  /** Gibt bei einem nicht erreichbaren Payment-Service eine leere Liste statt eines Fehlers
   * zurück (N-10) — eine Rechnungsübersicht ist rein informativ, kein kritischer Pfad. */
  invoices: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await fetchInvoices(ctx.currentUser.id);
    } catch {
      return [];
    }
  }),
});
