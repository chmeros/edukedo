import { offlineDb } from "./offlineDb";
import { trpc } from "./trpc";

/**
 * F-42 Baustein 5: überträgt die lokal gepufferten Ereignisse (offlineDb.queue) an
 * `offline.syncQueue`, sobald wieder eine Verbindung besteht (ausgelöst in App.tsx bei
 * `useOnlineStatus() === true`). Serverseitig werden sie chronologisch über
 * applyReview/recordQuizAttempt nachgespielt (siehe trpc/routers/offline.ts,
 * Architekturplanung Abschnitt 13, Ereignis-Replay statt "Last Write Wins"). Nur die vom
 * Server bestätigten Einträge (`syncedIds`) werden anschließend aus der lokalen Warteschlange
 * entfernt — alles andere (z. B. eine inzwischen deaktivierte Frage) bleibt für einen späteren
 * Versuch stehen, statt stillschweigend verworfen zu werden.
 *
 * Nutzt bewusst `utils.client.offline.syncQueue.mutate` (vanilla-Client aus `useUtils()`) statt
 * `useMutation` — ein Hintergrund-Sync ohne eigene UI-Bindung an Ladezustand/Formular.
 */
export async function syncOfflineQueue(utils: ReturnType<typeof trpc.useUtils>): Promise<number> {
  const pending = await offlineDb.queue.toArray();
  if (pending.length === 0) {
    return 0;
  }

  const { syncedIds } = await utils.client.offline.syncQueue.mutate({
    entries: pending.map((entry) => ({
      id: entry.id,
      contentItemId: entry.contentItemId,
      occurredAt: new Date(entry.occurredAt),
      event: entry.event,
    })),
  });

  await offlineDb.queue.bulkDelete(syncedIds);
  return syncedIds.length;
}
