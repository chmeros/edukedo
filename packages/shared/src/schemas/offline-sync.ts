import { z } from "zod";
import { reviewResultSchema } from "./progress";

/**
 * F-42 Baustein 5 (Sync-Endpunkt): Spiegelbild von `OfflineQueueEventPayload` in
 * apps/web/src/offlineDb.ts — ein Ereignis je offline beantworteter Karteikarte/Quiz-Frage,
 * das serverseitig über dieselben Prüf-/Fortschritts-Pfade wie online nachgespielt wird
 * (siehe apps/api/src/trpc/routers/offline.ts, Architekturplanung Abschnitt 13).
 */
export const offlineQueueEventSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("review"), result: reviewResultSchema }),
  z.object({ kind: z.literal("quiz_mc"), selectedOptionId: z.string().uuid() }),
  z.object({
    kind: z.literal("zuordnung"),
    pairs: z.array(z.object({ leftOptionId: z.string().uuid(), rightOptionId: z.string().uuid() })).min(1),
  }),
  z.object({ kind: z.literal("luecken"), answers: z.record(z.string(), z.string()) }),
  z.object({ kind: z.literal("kurzantwort"), answer: z.string() }),
]);
export type OfflineQueueEvent = z.infer<typeof offlineQueueEventSchema>;

/**
 * Obergrenze je Sync-Aufruf — rein defensiv gegen eine pathologisch große lokale Warteschlange
 * (z. B. nach wochenlanger Offline-Nutzung); der Client sendet bei Bedarf mehrere Batches
 * nacheinander, siehe apps/web/src/offlineSync.ts.
 */
export const OFFLINE_SYNC_BATCH_LIMIT = 500;

export const syncQueueInputSchema = z.object({
  entries: z
    .array(
      z.object({
        id: z.string().uuid(),
        contentItemId: z.string().uuid(),
        occurredAt: z.coerce.date(),
        event: offlineQueueEventSchema,
      }),
    )
    .max(OFFLINE_SYNC_BATCH_LIMIT),
});
export type SyncQueueInput = z.infer<typeof syncQueueInputSchema>;
