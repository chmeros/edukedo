import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { offlineDb, type OfflineContentItem } from "./offlineDb";
import { trpc } from "./trpc";

/**
 * F-42 Baustein 3: "Für offline verfügbar machen"-Aktion je Kurs. Lädt den vollständigen
 * Karteikarten-/Quiz-Bestand des Kurses inklusive Lösung (`offline.downloadKurs`, siehe
 * Architekturplanung Abschnitt 13) und spiegelt ihn in die lokale IndexedDB-Kopie
 * (`offlineDb.ts`). Nutzt bewusst `utils.offline.downloadKurs.fetch` statt `useQuery` — ein
 * einmaliger, per Klick ausgelöster Abruf, keine dauerhaft im Hintergrund gehaltene Anfrage.
 *
 * Zeigt nur die Download-Aktion selbst; das tatsächliche Offline-Beantworten
 * (Flashcards.tsx/Quiz.tsx bei `!navigator.onLine`) und der Sync sind eigene, spätere Bausteine.
 */
export function OfflineDownload({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const [status, setStatus] = useState<"idle" | "downloading" | "done" | "error">("idle");
  const [count, setCount] = useState(0);

  async function download() {
    setStatus("downloading");
    try {
      const result = await utils.offline.downloadKurs.fetch({ kursId });
      const now = Date.now();
      // Der Server schickt Daten als JSON (kein superjson-Transformer, siehe trpc.ts) —
      // dueAt/lastReviewedAt kommen deshalb als ISO-Strings an und müssen für spätere
      // scheduleReview-Aufrufe (Baustein 4) wieder zu echten Date-Objekten werden.
      const items: OfflineContentItem[] = result.items.map((item) => ({
        ...item,
        payload: item.payload ?? null,
        progress: item.progress
          ? {
              ...item.progress,
              dueAt: new Date(item.progress.dueAt),
              lastReviewedAt: item.progress.lastReviewedAt ? new Date(item.progress.lastReviewedAt) : null,
            }
          : null,
        downloadedAt: now,
      }));
      await offlineDb.content.bulkPut(items);
      setCount(items.length);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="stack">
      <button type="button" className="btn btn-ghost btn-sm" onClick={download} disabled={status === "downloading"}>
        {status === "downloading" ? "Wird geladen…" : "Für offline verfügbar machen"}
      </button>
      {status === "done" && <span className="field-hint">{count} Inhalte jetzt offline verfügbar.</span>}
      {status === "error" && <ErrorMessage>Download fehlgeschlagen. Bitte erneut versuchen.</ErrorMessage>}
    </div>
  );
}
