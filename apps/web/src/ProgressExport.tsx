import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { formatLernzeit } from "./Progress";

interface ThemaOverview {
  id: string;
  title: string;
  total: number;
  mastered: number;
  percent: number;
}

interface FachgebietOverview extends ThemaOverview {
  themen: ThemaOverview[];
}

interface ProgressStats {
  hitRatePercent: number;
  totalAnswered: number;
  learningMinutes: number;
  dailyHitRate: { date: string; total: number; correct: number; percent: number }[];
  weakThemen: { id: string; title: string; fachgebietTitle: string; total: number; correct: number; percent: number }[];
}

/**
 * F-34 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Export des Lernfortschritts (z. B.
 * PDF-Report)", siehe Architekturplanung Abschnitt 13): "PDF" ist im Anforderungskatalog nur ein
 * Beispiel-Format ("z. B."), kein zwingendes Zielformat — statt einer neuen PDF-Bibliothek
 * (jsPDF/pdfkit o. Ä., keine im Projekt vorhanden) nutzt dieser Export bewusst den nativen
 * Druckdialog des Browsers (`window.print()`, Ziel "Als PDF speichern") — liefert eine echte PDF
 * ohne jede neue Abhängigkeit. Der Report wird per Portal direkt unter `document.body` gerendert
 * (normalerweise `display: none`, nur unter `@media print` sichtbar, siehe styles.css) und blendet
 * dafür `#root` komplett aus — einfacher und robuster als zu versuchen, nur Teile der
 * interaktiven, tab-basierten App-Oberfläche selbst druckfähig zu machen.
 *
 * `kursTitle`/`userLabel` werden bewusst als Props von App.tsx durchgereicht statt hier per
 * eigenem `trpc.auth.me.useQuery()`/`trpc.courses.list.useQuery()` neu abgefragt — beide Werte
 * liegen dort (aus `me.data`/`courses.data`) bereits vor, ein erneuter Query-Hook wäre rein
 * redundant. (Ursprünglich aus dem Verdacht heraus so gebaut, dass eigene Hooks hier einen bereits
 * VOR dieser Änderung reproduzierbaren tRPC-Batch-404 beim App-Start mitverursachen könnten — bei
 * der Live-Verifikation bestätigt, dass der 404 unverändert bei jedem Laden auftritt, auch ganz
 * ohne diese Komponente, also unabhängig von F-34 ist. Als eigenständiger Fund vorgemerkt statt im
 * Rahmen dieser Änderung mitkorrigiert, siehe Architekturplanung Abschnitt 13. Die Props-Variante
 * bleibt trotzdem die sauberere Lösung, unabhängig von diesem Fund.)
 */
export function ProgressExportButton({
  kursTitle,
  userLabel,
  overview,
  stats,
}: {
  kursTitle: string;
  userLabel: string;
  overview: FachgebietOverview[];
  stats: ProgressStats | undefined;
}) {
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!exporting) return;

    // Der Report muss erst gemalt sein, bevor der Druckdialog öffnet — ein Tick reicht, da der
    // Portal-Inhalt bereits im selben Render wie `exporting = true` erzeugt wird.
    const previousTitle = document.title;
    document.title = kursTitle ? `Lernfortschritt - ${kursTitle}` : "Lernfortschritt";
    const timeout = setTimeout(() => window.print(), 50);

    function handleAfterPrint() {
      setExporting(false);
    }
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("afterprint", handleAfterPrint);
      document.title = previousTitle;
    };
  }, [exporting, kursTitle]);

  return (
    <>
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setExporting(true)}>
        Fortschritt als PDF exportieren
      </button>
      {exporting &&
        createPortal(
          <div className="progress-print-report">
            <h1>Lernfortschritt{kursTitle ? ` — ${kursTitle}` : ""}</h1>
            <p className="progress-print-meta">
              {userLabel} · Stand: {new Date().toLocaleDateString("de-DE")}
            </p>

            <h2>Fortschritt je Fachgebiet</h2>
            {overview.map((fachgebiet) => (
              <div key={fachgebiet.id} className="progress-print-fachgebiet">
                <h3>
                  {fachgebiet.title} — {fachgebiet.percent} % ({fachgebiet.mastered}/{fachgebiet.total})
                </h3>
                <ul>
                  {fachgebiet.themen.map((thema) => (
                    <li key={thema.id}>
                      {thema.title}: {thema.percent} % ({thema.mastered}/{thema.total})
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {stats && stats.totalAnswered > 0 && (
              <>
                <h2>Lernstatistik</h2>
                <p>
                  Trefferquote: {stats.hitRatePercent} % · Beantwortete Fragen: {stats.totalAnswered} · Lernzeit:{" "}
                  {formatLernzeit(stats.learningMinutes)}
                </p>

                {stats.dailyHitRate.length > 0 && (
                  <>
                    <h2>Trefferquote im Zeitverlauf</h2>
                    <ul>
                      {stats.dailyHitRate.map((day) => (
                        <li key={day.date}>
                          {day.date}: {day.percent} % ({day.correct}/{day.total})
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {stats.weakThemen.length > 0 && (
                  <>
                    <h2>Schwachstellen — hier lohnt sich Wiederholen</h2>
                    <ul>
                      {stats.weakThemen.map((thema) => (
                        <li key={thema.id}>
                          {thema.title} ({thema.fachgebietTitle}): {thema.percent} % ({thema.correct}/{thema.total})
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
