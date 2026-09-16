import { useEffect, useState } from "react";
import { syncOfflineQueue } from "./offlineSync";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

export type OfflineSyncState = "idle" | "syncing" | "synced" | "error";

/**
 * F-42 Baustein 6: der in Baustein 5 gebaute automatische Sync-Trigger (bei jedem Wechsel zu
 * `online`, auch beim Mounten, falls bereits online) — vorher ohne jede sichtbare Rückmeldung
 * direkt in App.tsx. Jetzt hier gekapselt, damit `OfflineStatus.tsx` den Zustand anzeigen kann.
 */
export function useOfflineSync(): OfflineSyncState {
  const utils = trpc.useUtils();
  const online = useOnlineStatus();
  const [state, setState] = useState<OfflineSyncState>("idle");

  useEffect(() => {
    if (!online) return;
    setState("syncing");
    syncOfflineQueue(utils)
      .then((count) => {
        if (count > 0) {
          utils.progress.invalidate();
          utils.content.invalidate();
        }
        setState("synced");
      })
      .catch(() => {
        setState("error");
      });
  }, [online, utils]);

  return state;
}
