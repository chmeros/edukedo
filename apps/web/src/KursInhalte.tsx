import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { TYPE_LABELS } from "./Suche";
import { trpc } from "./trpc";

/**
 * Lese-Modus für Kursinhalte (Review UXL-12): Gliederung eines Kurses und seine Inhalte mit Lösungen, ohne beizutreten und ohne
 * Fortschritt. Gedacht für Lehrkräfte, Ausbildende und Interessierte, die sehen wollen, was ein Kurs enthält. Zeigt nur aktive Inhalte.
 */
export function KursInhalte({ kursId, titel, onClose }: { kursId: string; titel: string; onClose: () => void }) {
  const uebersicht = trpc.kursInhalt.uebersicht.useQuery({ kursId });
  const [themaId, setThemaId] = useState<string | null>(null);
  const thema = trpc.kursInhalt.thema.useQuery({ themaId: themaId ?? "" }, { enabled: themaId !== null });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Inhalte ansehen: {titel}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zur Kursauswahl
        </button>
      </div>
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          Lese-Modus: Du siehst die Inhalte mit Lösungen und Erklärungen, ohne dem Kurs beizutreten. Es wird nichts gewertet und kein Fortschritt gespeichert.
          Gezeigt werden nur freigegebene Inhalte.
        </div>
      </div>
      {uebersicht.isLoading && <p>Lädt…</p>}
      {uebersicht.isError && <ErrorMessage>{uebersicht.error.message}</ErrorMessage>}
      <div className="stack">
        {(uebersicht.data ?? []).map((fachgebiet) => (
          <details key={fachgebiet.id} open={fachgebiet.themen.some((eintrag) => eintrag.id === themaId)}>
            <summary>
              {fachgebiet.code} {fachgebiet.title}
            </summary>
            <div className="header-actions">
              {fachgebiet.themen.map((eintrag) => (
                <button
                  key={eintrag.id}
                  type="button"
                  className={eintrag.id === themaId ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                  aria-pressed={eintrag.id === themaId}
                  disabled={eintrag.anzahl === 0}
                  onClick={() => setThemaId(eintrag.id)}
                >
                  {eintrag.title} ({eintrag.anzahl})
                </button>
              ))}
            </div>
          </details>
        ))}
        {uebersicht.data?.length === 0 && <p className="field-hint">Dieser Kurs hat noch keine Gliederung.</p>}
      </div>

      {themaId && (
        <div className="stack">
          {thema.isLoading && <p>Lädt…</p>}
          {thema.isError && <ErrorMessage>{thema.error.message}</ErrorMessage>}
          {thema.data && <h3 className="stat-subheading">{thema.data.themaTitle}</h3>}
          {(thema.data?.items ?? []).map((item) => (
            <article key={item.id} className="exam-part">
              <span className="flip-kicker">{TYPE_LABELS[item.type] ?? item.type}</span>
              {item.type === "theorie" ? (
                <div className="markdown">
                  <ReactMarkdown>{item.text ?? item.prompt}</ReactMarkdown>
                </div>
              ) : (
                <>
                  <p style={{ whiteSpace: "pre-wrap" }}>{item.prompt}</p>
                  {item.text && <p style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>}
                </>
              )}
              {(item.loesung.length > 0 || item.erklaerung) && (
                <details>
                  <summary>Lösung und Erklärung</summary>
                  {item.loesung.length > 0 && (
                    <ul>
                      {item.loesung.map((zeile, index) => (
                        <li key={index}>{zeile}</li>
                      ))}
                    </ul>
                  )}
                  {item.erklaerung && <p style={{ whiteSpace: "pre-wrap" }}>{item.erklaerung}</p>}
                </details>
              )}
            </article>
          ))}
          {thema.data?.items.length === 0 && <p className="field-hint">In diesem Thema gibt es noch keine freigegebenen Inhalte.</p>}
        </div>
      )}
    </div>
  );
}
