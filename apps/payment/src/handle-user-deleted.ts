import { eq } from "drizzle-orm";
import { subscription } from "./db/schema";
import type { Database } from "./db/client";

/**
 * F-06/N-11: löscht ein von der Kern-Löschung betroffenes Abo samt Rechnungen (`invoice`
 * kaskadiert über `subscription_id`, siehe schema.ts) — von Grund auf idempotent, da ein DELETE
 * ohne Treffer schlicht 0 Zeilen betrifft. Eine erneute Zustellung desselben Ereignisses (BullMQ
 * garantiert nur "at-least-once") braucht deshalb keine eigene Dedupe-Tabelle, siehe
 * queue/events.ts. Getrennt vom dünnen Worker-Wrapper (queue/user-deleted-worker.ts), damit sie
 * ohne echte Queue direkt test-/aufrufbar bleibt (analog zu apps/api/src/ai/process-grading-job.ts).
 */
export async function handleUserDeleted(db: Database, userId: string): Promise<void> {
  await db.delete(subscription).where(eq(subscription.userId, userId));
}
