import { useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-25: reiner Fragen-Pool ohne Scoring — anders als Quiz/Exam gibt es hier keine
 * automatisch prüfbare oder selbst eingeschätzte Antwort, nur freies mündliches Beantworten.
 * Entsprechend simpel bleibt die Komponente: Frage anzeigen, "Nächste Frage" weiterschalten,
 * am Ende neu mischen (erneuter Query-Fetch liefert eine frische Zufallsauswahl).
 */
export function Fachgespraechstrainer({ kursId }: { kursId: string }) {
  const fragen = trpc.content.fachgespraechFragen.useQuery({ kursId }, { staleTime: Infinity });
  const [index, setIndex] = useState(0);

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
            fragen.refetch();
          }}
        >
          Neu mischen
        </button>
      </div>
    );
  }

  const current = items[index]!;

  return (
    <div className="stack">
      <p>
        Beantworte die folgende Frage laut, wie in einem echten Fachgespräch — es gibt hier keine automatische
        Bewertung, das Üben des freien Formulierens steht im Vordergrund.
      </p>
      <span className="quiz-progress">
        Frage {index + 1} von {items.length} · {current.themaTitel}
      </span>
      <div className="exam-situation">
        <p className="flip-q">{current.frage}</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => setIndex((i) => i + 1)}>
        {index + 1 < items.length ? "Nächste Frage" : "Runde abschließen"}
      </button>
    </div>
  );
}
