import { Queue, Worker } from "bullmq";
import { eq } from "drizzle-orm";
import type { Database } from "../db/client";
import { db } from "../db/client";
import { user } from "../db/schema";
import { redisConnection } from "./connection";
import {
  SUBSCRIPTION_UPDATED_QUEUE_NAME,
  USER_DELETED_QUEUE_NAME,
  type SubscriptionUpdatedEvent,
  type UserDeletedEvent,
} from "./payment-events";

/** F-06/Payment-Service-Grundgerüst: der Kern meldet eine Konto-Löschung an apps/payment, damit
 * dessen eigene Subscription-/Rechnungsdaten ebenfalls bereinigt werden (Architekturplanung
 * Abschnitt 3/8) — publiziert NACH dem eigentlichen `db.delete(user)` in auth.deleteAccount. */
export const userDeletedQueue = new Queue<UserDeletedEvent>(USER_DELETED_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: true, removeOnFail: true },
});

export async function publishUserDeleted(userId: string): Promise<void> {
  await userDeletedQueue.add("user.deleted", { userId });
}

/** Aktualisiert den lokalen Abo-Cache (`user.premium_until`) — getrennt vom dünnen
 * Worker-Wrapper unten, damit sie ohne echte Queue direkt test-/aufrufbar bleibt (analog zu
 * apps/payment/src/handle-user-deleted.ts). Ein Update für eine nicht mehr existierende
 * Nutzer-ID (Konto wurde inzwischen selbst gelöscht) betrifft schlicht 0 Zeilen. */
export async function handleSubscriptionUpdated(database: Database, event: SubscriptionUpdatedEvent): Promise<void> {
  await database
    .update(user)
    .set({ premiumUntil: event.premiumUntil ? new Date(event.premiumUntil) : null })
    .where(eq(user.id, event.userId));
}

/** Konsumiert die von apps/payment publizierten `subscription.updated`-Ereignisse. */
export function startSubscriptionUpdatedWorker(): Worker<SubscriptionUpdatedEvent> {
  return new Worker<SubscriptionUpdatedEvent>(
    SUBSCRIPTION_UPDATED_QUEUE_NAME,
    async (job) => {
      await handleSubscriptionUpdated(db, job.data);
    },
    { connection: redisConnection },
  );
}
