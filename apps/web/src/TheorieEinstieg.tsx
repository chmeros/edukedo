import { useState } from "react";
import { useTheorie } from "./TheorieReader";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

/**
 * Review UXT-B-04/I-16: Die Theorie hat keinen eigenen Tab (F-103) und war bisher nur nach einer Antwort („Im Thema nachlesen“), im
 * Fortschritt oder über die Suche zu erreichen. Dieser Einstieg steht oben im Lernen-Tab: eingeklappt „📖 Theorie lesen“, aufgeklappt
 * die Themen des Kurses nach Fachgebieten; ein Klick öffnet das Lesefenster. Die Themenliste wird erst beim Aufklappen geladen
 * (dieselbe Abfrage wie der Fortschritt). Wie das Lesefenster selbst nur online, weil die Theorie nicht offline vorgehalten wird.
 */
export function TheorieEinstieg({ kursId }: { kursId: string }) {
  const { openTheorie, verfuegbar } = useTheorie();
  const online = useOnlineStatus();
  const [offen, setOffen] = useState(false);
  const uebersicht = trpc.progress.overview.useQuery({ kursId }, { enabled: offen && online, staleTime: 5 * 60 * 1000 });

  if (!verfuegbar || !online) return null;

  return (
    <details className="theorie-einstieg" onToggle={(event) => setOffen(event.currentTarget.open)}>
      <summary>📖 Theorie lesen</summary>
      {uebersicht.isLoading && <p className="field-hint">Lädt…</p>}
      {uebersicht.isError && <p className="field-hint">Die Themen konnten nicht geladen werden.</p>}
      {(uebersicht.data ?? []).map((fachgebiet) => (
        <div key={fachgebiet.id} className="stack">
          <span className="field-hint">{fachgebiet.title}</span>
          <div className="header-actions">
            {fachgebiet.themen.map((thema) => (
              <button
                key={thema.id}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => openTheorie({ themaId: thema.id, themaTitle: thema.title })}
              >
                {thema.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </details>
  );
}
