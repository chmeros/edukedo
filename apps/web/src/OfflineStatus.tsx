import { useEffect, useRef, useState } from "react";
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
export function OfflineStatus({ roundActive = false }: { roundActive?: boolean }) {
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

  // Review WEB-21: Ein Wechsel zwischen online und offline ersetzt die Fragenliste der laufenden Runde (offline kommt sie aus der lokalen
  // Kopie). Die Runde beginnt dann von vorn; ohne Hinweis wirkt das wie ein Fehler. Die Antworten bis dahin bleiben gespeichert.
  const [rundeNeu, setRundeNeu] = useState(false);
  const vorher = useRef(online);
  useEffect(() => {
    if (vorher.current === online) return;
    vorher.current = online;
    if (!roundActive) return;
    setRundeNeu(true);
    const timer = setTimeout(() => setRundeNeu(false), 8000);
    return () => clearTimeout(timer);
  }, [online, roundActive]);

  if (rundeNeu) {
    return (
      <span className="offline-status offline-status--syncing" role="status">
        Verbindung gewechselt – die Runde beginnt neu, bisherige Antworten bleiben gespeichert.
      </span>
    );
  }

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
  // sichtbar bleiben, statt stillschweigend in der lokalen Warteschlange zu verharren. Code-
  // Review-Fund, nachgezogen: `syncState === "error"` war hier redundant neben `pendingCount >
  // 0` — syncOfflineQueue setzt "error" ausschließlich, wenn der Request wirft, und ein
  // werfender Request löscht nie Einträge aus der Warteschlange, `pendingCount` ist also in
  // jedem erreichbaren Fehlerfall bereits > 0.
  if (pendingCount > 0) {
    return (
      <span className="offline-status offline-status--error" role="status">
        {`${pendingCount} Ereignis${pendingCount === 1 ? "" : "se"} nicht synchronisiert`}
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
