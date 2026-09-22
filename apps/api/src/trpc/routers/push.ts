import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { pushSubscription } from "../../db/schema";
import { env } from "../../env";
import { protectedProcedure, router } from "../trpc";

const subscribeInputSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

const unsubscribeInputSchema = z.object({
  endpoint: z.string().url(),
});

/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)", Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): verwaltet nur die Web-Push-Subscriptions selbst — der tatsächliche Versand
 * läuft über das eigenständige Wartungsskript db/send-learning-reminders.ts (analog zu
 * send-consent-reminders.ts/F-08, siehe dort).
 */
export const pushRouter = router({
  /** Öffentlicher VAPID-Schlüssel für `pushManager.subscribe({ applicationServerKey })` im
   * Frontend — bewusst über tRPC statt eines zusätzlichen Build-Zeit-Envs im Web-Paket, damit
   * der Schlüssel nur an einer Stelle (apps/api/.env) gepflegt werden muss. */
  publicKey: protectedProcedure.query(() => env.VAPID_PUBLIC_KEY),

  /** Ob für dieses Konto mindestens ein abonnierter Browser/Gerät existiert — das IST der
   * Opt-in-Zustand (siehe db/schema.ts, `pushSubscription`). */
  status: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({ id: pushSubscription.id })
      .from(pushSubscription)
      .where(eq(pushSubscription.userId, ctx.currentUser.id))
      .limit(1);
    return { subscribed: rows.length > 0 };
  }),

  /** Derselbe Browser kann sich erneut anmelden (z. B. nach Cache-Löschung) und liefert dabei
   * denselben `endpoint`, aber ggf. neue Schlüssel — `onConflictDoUpdate` statt eines doppelten
   * Datensatzes. */
  subscribe: protectedProcedure.input(subscribeInputSchema).mutation(async ({ ctx, input }) => {
    await ctx.db
      .insert(pushSubscription)
      .values({
        userId: ctx.currentUser.id,
        endpoint: input.endpoint,
        p256dh: input.keys.p256dh,
        auth: input.keys.auth,
      })
      .onConflictDoUpdate({
        target: [pushSubscription.endpoint],
        set: { userId: ctx.currentUser.id, p256dh: input.keys.p256dh, auth: input.keys.auth },
      });
    return { success: true };
  }),

  unsubscribe: protectedProcedure.input(unsubscribeInputSchema).mutation(async ({ ctx, input }) => {
    await ctx.db
      .delete(pushSubscription)
      .where(and(eq(pushSubscription.endpoint, input.endpoint), eq(pushSubscription.userId, ctx.currentUser.id)));
    return { success: true };
  }),
});
