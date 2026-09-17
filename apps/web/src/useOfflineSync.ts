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
        // Redesign-Audit 17.09.2026 (Bug-Fund): vorher wurde unbedingt "synced" gesetzt, auch
        // wenn die Warteschlange leer war (der Normalfall bei jedem Login/Reload ohne Offline-
        // Nutzung) — OfflineStatus.tsx blendete dadurch bei praktisch jedem Seitenaufruf kurz
        // ein irreführendes "✓ Synchronisiert" ein, obwohl gar nichts zu synchronisieren war.
        if (count > 0) {
          utils.progress.invalidate();
          utils.content.invalidate();
          setState("synced");
        } else {
          setState("idle");
        }
      })
      .catch(() => {
        setState("error");
      });
  }, [online, utils]);

  return state;
}
