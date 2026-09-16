import { useEffect, useState } from "react";
import { offlineDb } from "./offlineDb";

/**
 * F-42 Baustein 6: Anzahl noch nicht synchronisierter Ereignisse in `offlineDb.queue`, live
 * gehalten über Dexies eingebaute Table-Hooks (`creating`/`deleting` — laut Dexie-Doku auch bei
 * `bulkDelete` je gelöschtem Eintrag ausgelöst) statt eines Polling-Intervalls oder einer
 * zusätzlichen Abhängigkeit wie `dexie-react-hooks`.
 */
export function useOfflineQueueCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    offlineDb.queue.count().then((initial) => {
      if (!cancelled) setCount(initial);
    });

    function onCreating() {
      setCount((c) => c + 1);
    }
    function onDeleting() {
      setCount((c) => c - 1);
    }
    offlineDb.queue.hook("creating", onCreating);
    offlineDb.queue.hook("deleting", onDeleting);
    return () => {
      cancelled = true;
      offlineDb.queue.hook("creating").unsubscribe(onCreating);
      offlineDb.queue.hook("deleting").unsubscribe(onDeleting);
    };
  }, []);

  return count;
}
