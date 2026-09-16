import { scheduleReview } from "@edukedo/shared";
import type { ReviewResult } from "@edukedo/shared";
import { offlineDb, type OfflineContentItem } from "./offlineDb";

/**
 * F-42 Baustein 4: liest die lokal heruntergeladenen, aktuell fälligen Karteikarten eines
 * Kurses (optional auf ein Thema gefiltert) — dieselbe "fällig"-Definition wie
 * `content.dueCards` (`dueAt` <= jetzt), nur lokal statt per SQL berechnet, da offline kein
 * Serverkontakt möglich ist. Jede heruntergeladene Karteikarte hat einen FSRS-Zustand (siehe
 * `offline.downloadKurs` — auch nie geübte Karten bekommen dort `initialProgressState` statt
 * `null`), der Filter auf `progress !== null` ist daher nur eine defensive Absicherung.
 */
export async function loadOfflineDueCards(
  kursId: string,
  themaId: string | undefined,
): Promise<OfflineContentItem[]> {
  const now = Date.now();
  const all = await offlineDb.content.where("kursId").equals(kursId).toArray();
  return all
    .filter(
      (item) =>
        item.type === "karteikarte" &&
        (!themaId || item.themaId === themaId) &&
        item.progress !== null &&
        item.progress.dueAt.getTime() <= now,
    )
    .sort((a, b) => a.progress!.dueAt.getTime() - b.progress!.dueAt.getTime());
}

/**
 * Bewertet eine Karteikarte offline: berechnet den nächsten FSRS-Zustand lokal (`scheduleReview`
 * aus `@edukedo/shared` — derselbe Code wie serverseitig, siehe Architekturplanung Abschnitt 13),
 * aktualisiert den Zustand in `offlineDb.content` und reiht ein Sync-Ereignis in
 * `offlineDb.queue` ein (Baustein 5 spielt diese Ereignisse später chronologisch nach).
 */
export async function reviewOfflineCard(item: OfflineContentItem, result: ReviewResult): Promise<void> {
  if (!item.progress) return;
  const now = new Date();
  const next = scheduleReview(item.progress, result, now);

  await offlineDb.content.update(item.id, { progress: next });
  await offlineDb.queue.put({
    id: crypto.randomUUID(),
    contentItemId: item.id,
    event: { kind: "review", result },
    occurredAt: now.getTime(),
    synced: false,
  });
}
