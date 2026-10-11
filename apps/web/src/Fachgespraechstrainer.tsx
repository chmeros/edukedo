import { useState } from "react";
import { ContentActions } from "./ContentActions";
import { InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * Allgemeines Bewertungsraster für Fragen ohne eigenen Erwartungshorizont (Entscheidung 11.10.2026, FL-IM-55, FL-TL-46,
 * FL-AEVO-29): Worauf eine Prüfungskommission in einer mündlichen Antwort achtet.
 */
const RASTER: { titel: string; text: string }[] = [
  { titel: "Fachlichkeit", text: "Die Fachbegriffe stimmen und die Aussage ist richtig." },
  { titel: "Struktur", text: "Du nennst zuerst die Kernaussage, begründest sie und stützt sie mit einem Beispiel." },
  { titel: "Praxisbezug", text: "Du verbindest die Antwort mit einem Beispiel aus dem eigenen Betrieb oder Alltag." },
];

/**
 * F-25: Fragen-Pool für das mündliche Üben. Nach der Antwort („Antwort prüfen“) zeigt der Trainer, was eine gute Antwort nennt:
 * den Erwartungshorizont der Frage zum Abhaken, sonst das allgemeine Raster, dazu mögliche Rückfragen der Prüfenden. Es gibt weiter
 * keine automatische Bewertung und nichts wird gespeichert, das Üben des freien Formulierens steht im Vordergrund.
 */
export function Fachgespraechstrainer({ kursId }: { kursId: string }) {
  const fragen = trpc.content.fachgespraechFragen.useQuery({ kursId }, { staleTime: Infinity });
  const [index, setIndex] = useState(0);
  const [geprueft, setGeprueft] = useState(false);
  const [genannt, setGenannt] = useState<Set<number>>(new Set());

  if (fragen.isLoading) {
    return <p>Lädt…</p>;
  }
  const items = fragen.data ?? [];
  if (items.length === 0) {
    return (
      <div className="alert alert-info">
        <InfoIcon />
        <div>Keine Fachgesprächsfragen für diesen Kurs verfügbar.</div>
      </div>
    );
  }
  if (index >= items.length) {
    return (
      <div className="stack">
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Alle {items.length} Fragen dieser Runde durchgegangen 🎉</div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setIndex(0);
            setGeprueft(false);
            setGenannt(new Set());
            fragen.refetch();
          }}
        >
          Neu mischen
        </button>
      </div>
    );
  }

  const current = items[index]!;
  const erwartung = current.erwartung ?? [];
  const rueckfragen = current.rueckfragen ?? [];

  function weiter() {
    setIndex((i) => i + 1);
    setGeprueft(false);
    setGenannt(new Set());
  }

  function umschalten(punkt: number) {
    setGenannt((vorher) => {
      const neu = new Set(vorher);
      if (neu.has(punkt)) neu.delete(punkt);
      else neu.add(punkt);
      return neu;
    });
  }

  return (
    <div className="stack">
      <p>
        Beantworte die folgende Frage laut, wie in einem echten Fachgespräch — es gibt hier keine automatische Bewertung, das Üben des
        freien Formulierens steht im Vordergrund.
      </p>
      <span className="quiz-progress">
        Frage {index + 1} von {items.length} · {current.themaTitel}
      </span>
      <div className="exam-situation">
        <p className="flip-q">{current.frage}</p>
      </div>

      {!geprueft ? (
        <button type="button" className="btn btn-primary" onClick={() => setGeprueft(true)}>
          Antwort prüfen
        </button>
      ) : (
        <>
          {erwartung.length > 0 ? (
            <section className="stack" aria-labelledby="fg-erwartung">
              <h3 id="fg-erwartung" className="stat-subheading">
                Das gehört in eine gute Antwort
              </h3>
              <p className="field-hint">Hake ab, was du genannt hast.</p>
              {erwartung.map((punkt, nummer) => (
                <label key={punkt} className="checkbox-row">
                  <input type="checkbox" checked={genannt.has(nummer)} onChange={() => umschalten(nummer)} />
                  <span>{punkt}</span>
                </label>
              ))}
              <p role="status" className="field-hint">
                {genannt.size} von {erwartung.length} Punkten genannt.
              </p>
            </section>
          ) : (
            <section className="stack" aria-labelledby="fg-raster">
              <h3 id="fg-raster" className="stat-subheading">
                Worauf die Prüfenden achten
              </h3>
              <p className="field-hint">Für diese Frage gibt es noch keinen eigenen Erwartungshorizont. Prüfe deine Antwort an diesem Raster:</p>
              <ul>
                {RASTER.map((kriterium) => (
                  <li key={kriterium.titel}>
                    <strong>{kriterium.titel}:</strong> {kriterium.text}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {rueckfragen.length > 0 && (
            <section className="stack" aria-labelledby="fg-rueckfragen">
              <h3 id="fg-rueckfragen" className="stat-subheading">
                Mögliche Rückfragen der Prüfenden
              </h3>
              <ul>
                {rueckfragen.map((rueckfrage) => (
                  <li key={rueckfrage}>{rueckfrage}</li>
                ))}
              </ul>
            </section>
          )}

          <button type="button" className="btn btn-primary" onClick={weiter}>
            {index + 1 < items.length ? "Nächste Frage" : "Runde abschließen"}
          </button>
        </>
      )}
      <ContentActions contentItemId={current.id} />
    </div>
  );
}
