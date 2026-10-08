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

/** Toleranz für abweichende Geräteuhren: Ein Zeitstempel bis zu fünf Minuten in der Zukunft gilt noch als plausibel. */
export const OFFLINE_EVENT_FUTURE_TOLERANCE_MS = 5 * 60 * 1000;
/** Ältere Offline-Ereignisse gelten als unplausibel; offline wird realistisch höchstens über wenige Tage gelernt. */
export const OFFLINE_EVENT_MAX_AGE_DAYS = 14;

/**
 * Review-Befund LOG-03: `occurredAt` stammt von der Geräteuhr und ist nicht überprüfbar. Ein Zeitstempel in der
 * Zukunft würde die Karte einfrieren (spätere Reviews gelten als älter und werden verworfen) und Streak, Highscore
 * und Achievements verfälschen; ein sehr alter erlaubt nachträgliches Auffüllen von Streak-Tagen. Liegt der Zeitstempel
 * außerhalb des plausiblen Fensters, zählt stattdessen die Serverzeit des Syncs. Das Ereignis selbst (die Antwort)
 * bleibt erhalten, nur sein Zeitpunkt wird ersetzt.
 */
export function normalizeOccurredAt(occurredAt: Date, now: Date): Date {
  const time = occurredAt.getTime();
  if (Number.isNaN(time)) return now;
  const latest = now.getTime() + OFFLINE_EVENT_FUTURE_TOLERANCE_MS;
  const earliest = now.getTime() - OFFLINE_EVENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  if (time > latest || time < earliest) return now;
  return occurredAt;
}
