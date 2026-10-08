import { OFFLINE_SYNC_BATCH_LIMIT } from "@edukedo/shared";
import { claimOfflineData, offlineDb } from "./offlineDb";
import { trpc } from "./trpc";

/**
 * F-42 Baustein 5: überträgt die lokal gepufferten Ereignisse (offlineDb.queue) an
 * `offline.syncQueue`, sobald wieder eine Verbindung besteht (ausgelöst in App.tsx bei
 * `useOnlineStatus() === true`). Serverseitig werden sie chronologisch über
 * applyReview/recordQuizAttempt nachgespielt (siehe trpc/routers/offline.ts,
 * Architekturplanung Abschnitt 13, Ereignis-Replay statt "Last Write Wins"). Nur die vom
 * Server bestätigten (`syncedIds`) und die dauerhaft abgelehnten Einträge (`rejectedIds`, z. B. eine inzwischen entfernte
 * Frage; Review WEB-20) werden anschließend aus der lokalen Warteschlange entfernt. Schlägt der Request selbst fehl, bleibt
 * alles für einen späteren Versuch stehen.
 *
 * Nutzt bewusst `utils.client.offline.syncQueue.mutate` (vanilla-Client aus `useUtils()`) statt
 * `useMutation` — ein Hintergrund-Sync ohne eigene UI-Bindung an Ladezustand/Formular.
 *
 * Code-Review-Fund, nachgezogen: sendet die Warteschlange in Blöcken von höchstens
 * `OFFLINE_SYNC_BATCH_LIMIT` Einträgen statt in einem einzigen Request — der Server lehnt
 * größere Arrays per Zod-`.max()` komplett ab (siehe offline-sync.ts), vorher konnte eine nach
 * längerer Offline-Nutzung über dieses Limit gewachsene Warteschlange dadurch nie mehr
 * synchronisiert werden. Bereits bestätigte Blöcke werden sofort lokal gelöscht, ein
 * fehlschlagender Block bricht erst hier ab (die vorherigen Blöcke bleiben synchronisiert).
 */
export async function syncOfflineQueue(utils: ReturnType<typeof trpc.useUtils>): Promise<number> {
  // Vor dem Senden klären, wem die lokale Warteschlange gehört: Gehört sie einer anderen Person als der
  // angemeldeten (geteiltes Gerät, abgelaufene Sitzung), wird sie gelöscht statt der falschen Person gutgeschrieben.
  const me = await utils.client.auth.me.query();
  await claimOfflineData(me.id);

  // Review LOG-13: chronologisch senden. Die Tabelle liefert nach Primärschlüssel (UUID); bei mehr als einem Block kämen sonst
  // ältere Ereignisse nach neueren an und würden für den Lernstand übergangen.
  const pending = (await offlineDb.queue.toArray()).sort((a, b) => a.occurredAt - b.occurredAt);
  if (pending.length === 0) {
    return 0;
  }

  let totalSynced = 0;
  for (let offset = 0; offset < pending.length; offset += OFFLINE_SYNC_BATCH_LIMIT) {
    const batch = pending.slice(offset, offset + OFFLINE_SYNC_BATCH_LIMIT);
    const { syncedIds, rejectedIds } = await utils.client.offline.syncQueue.mutate({
      entries: batch.map((entry) => ({
        id: entry.id,
        contentItemId: entry.contentItemId,
        occurredAt: new Date(entry.occurredAt),
        event: entry.event,
      })),
    });
    // Review WEB-20: Vom Server dauerhaft abgelehnte Einträge (z. B. Frage inzwischen entfernt) werden verworfen, sonst blieben sie
    // für immer in der Warteschlange und die Statusanzeige meldete dauerhaft "nicht synchronisiert".
    await offlineDb.queue.bulkDelete([...syncedIds, ...rejectedIds]);
    totalSynced += syncedIds.length;
  }

  return totalSynced;
}
