import { Queue } from "bullmq";
import { redisConnection } from "./connection";
import { SUBSCRIPTION_UPDATED_QUEUE_NAME, type SubscriptionUpdatedEvent } from "./events";
import { withTimeout } from "./with-timeout";

/** N-10-Code-Review-Fund (25.09.2026, siehe with-timeout.ts). */
const QUEUE_ADD_TIMEOUT_MS = 3000;

export const subscriptionUpdatedQueue = new Queue<SubscriptionUpdatedEvent>(SUBSCRIPTION_UPDATED_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: true, removeOnFail: true },
});

/** Rein additiv — die synchrone REST-Antwort (Checkout/Kündigung) trägt bereits den
 * maßgeblichen Wert (siehe Architekturplanung Abschnitt 13, Payment-Baustein 2: "der Kern
 * übernimmt den Wert direkt aus der synchronen REST-Antwort"), dieses Ereignis bestätigt ihn nur
 * zusätzlich. Ein Redis-Ausfall darf Checkout/Kündigung daher nicht scheitern lassen. */
export async function publishSubscriptionUpdated(event: SubscriptionUpdatedEvent): Promise<void> {
  try {
    await withTimeout(
      subscriptionUpdatedQueue.add("subscription.updated", event),
      QUEUE_ADD_TIMEOUT_MS,
      "Redis nicht erreichbar.",
    );
  } catch (error) {
    console.error(`subscription.updated-Ereignis für ${event.userId} konnte nicht publiziert werden:`, error);
  }
}
