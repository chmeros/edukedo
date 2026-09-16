import { useEffect, useState } from "react";
import { useOfflineQueueCount } from "./useOfflineQueueCount";
import { useOfflineSync } from "./useOfflineSync";
import { useOnlineStatus } from "./useOnlineStatus";

/**
 * F-42 Baustein 6: sichtbare Rückmeldung für den in Baustein 4/5 bereits funktionierenden,
 * aber bis dahin unsichtbaren Offline-Antwortpfad + Sync — ohne diese Anzeige merkt eine
 * lernende Person nicht, ob eine offline gegebene Antwort "wirklich" gespeichert wurde oder
 * nur lokal in der Warteschlange wartet. Bewusst nur bei etwas Meldenswertem sichtbar
 * (`role="status"`, wie bei `ErrorMessage.tsx`s `role="alert"` implizit `aria-live`), im
 * normalen Online-Alltag ohne ausstehende Ereignisse zeigt die Komponente nichts an.
 */
export function OfflineStatus() {
  const online = useOnlineStatus();
  const pendingCount = useOfflineQueueCount();
  const syncState = useOfflineSync();

  // Blendet eine kurze Erfolgsbestätigung nach einem abgeschlossenen Sync ein — nur dann, denn
  // ein dauerhaft sichtbarer "Synchronisiert"-Hinweis wäre im (weit überwiegenden) online/nichts-
  // zu-tun-Normalfall reine Ablenkung.
  const [showSynced, setShowSynced] = useState(false);
  useEffect(() => {
    if (syncState !== "synced") return;
    setShowSynced(true);
    const timer = setTimeout(() => setShowSynced(false), 3000);
    return () => clearTimeout(timer);
  }, [syncState]);

  if (!online) {
    return (
      <span className="offline-status offline-status--offline" role="status">
        Offline{pendingCount > 0 ? ` · ${pendingCount} noch zu synchronisieren` : ""}
      </span>
    );
  }

  if (syncState === "syncing") {
    return (
      <span className="offline-status offline-status--syncing" role="status">
        Wird synchronisiert…
      </span>
    );
  }

  // Bleibt nach einem Sync-Versuch übrig, wenn einzelne Ereignisse serverseitig abgelehnt wurden
  // (siehe offline.syncQueue, Baustein 5) oder der Request selbst fehlschlug — beides soll
  // sichtbar bleiben, statt stillschweigend in der lokalen Warteschlange zu verharren.
  if (syncState === "error" || pendingCount > 0) {
    return (
      <span className="offline-status offline-status--error" role="status">
        {pendingCount > 0
          ? `${pendingCount} Ereignis${pendingCount === 1 ? "" : "se"} nicht synchronisiert`
          : "Synchronisierung fehlgeschlagen"}
      </span>
    );
  }

  if (showSynced) {
    return (
      <span className="offline-status offline-status--synced" role="status">
        ✓ Synchronisiert
      </span>
    );
  }

  return null;
}
