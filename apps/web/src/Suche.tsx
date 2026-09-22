import { useState } from "react";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

// Exportiert, da MeineNotizen.tsx (F-15) dieselbe Zuordnung für ihre eigene Trefferliste braucht
// — Notizen können prinzipiell an jedem Content-Typ hängen, den auch die Suche durchsucht.
export const TYPE_LABELS: Record<string, string> = {
  karteikarte: "Karteikarte",
  quiz_mc: "Quiz · Multiple Choice",
  // F-113: strukturell identisch zu Multiple Choice (siehe Architekturplanung Abschnitt 13).
  wahr_falsch: "Quiz · Wahr/Falsch",
  entweder_oder: "Quiz · Entweder-Oder",
  was_passt_nicht: "Quiz · Was passt nicht dazu",
  quiz_mc_multi: "Quiz · Mehrfachauswahl",
  zuordnung: "Quiz · Zuordnung",
  sortieren: "Quiz · Sortieren",
  // F-114: visuelle Zuordnungs-Variante mit festen Zonen (siehe Architekturplanung Abschnitt 13).
  swot: "Quiz · SWOT-Matrix",
  bsc: "Quiz · Balanced Scorecard",
  ansoff: "Quiz · Ansoff-Matrix",
  gantt: "Quiz · Gantt-Diagramm",
  luecken: "Quiz · Lückentext",
  luecken_auswahl: "Quiz · Lückentext (Wortauswahl)",
  kurzantwort: "Quiz · Kurzantwort",
  fallaufgabe: "Fallaufgabe",
  fachgespraech_frage: "Fachgesprächsfrage",
};

/**
 * F-14: Volltextsuche über alle Lerninhalte — erster echter Inhalt im bisherigen
 * F-105-Platzhalter-Tab "Instrumente" (siehe Architekturplanung Abschnitt 13). Bewusst kein
 * Sprung zu einem einzelnen Suchtreffer (weder `content.dueCards` noch `quiz.quizItems`
 * unterstützen das gezielte Ansteuern eines einzelnen Items) — stattdessen reicht "Zu diesem
 * Thema lernen" den bereits bestehenden F-27-Themenfilter an `App.tsx` durch, der den
 * "Lernen"-Tab auf genau dieses Thema filtert.
 */
export function Suche({
  kursId,
  onGoToThema,
}: {
  kursId: string;
  onGoToThema: (themaId: string, themaTitle: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const trimmed = submittedQuery.trim();
  const results = trpc.content.search.useQuery({ kursId, query: trimmed }, { enabled: trimmed.length >= 2 });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Lerninhalte durchsuchen</h2>
      </div>
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedQuery(query);
        }}
      >
        <div className="field">
          <label htmlFor="content-search">Suchbegriff</label>
          <input
            id="content-search"
            className="input"
            type="search"
            placeholder="z. B. Nutzwertanalyse"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }}>
          Suchen
        </button>
      </form>

      {trimmed.length > 0 && trimmed.length < 2 && (
        <p className="field-hint">Bitte mindestens 2 Zeichen eingeben.</p>
      )}
      {/* @tanstack/react-query v4: `isLoading` bleibt bei einer deaktivierten Query (`enabled:
          false`, hier: noch kein Suchbegriff abgeschickt) dauerhaft `true` (status "loading"
          statt "idle"), solange nie erfolgreich geladen wurde — `isFetching` bildet dagegen
          korrekt ab, ob gerade tatsächlich ein Request läuft. */}
      {trimmed.length >= 2 && results.isFetching && <p>Suche läuft…</p>}
      {results.data && results.data.length === 0 && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Keine Treffer für „{trimmed}".</div>
        </div>
      )}
      {results.data && results.data.length > 0 && (
        <div className="list" style={{ marginTop: 10 }}>
          {results.data.map((hit) => (
            <div key={hit.id} className="list-row">
              <div className="meta">
                {hit.prompt}
                <span>
                  {TYPE_LABELS[hit.type] ?? hit.type} · {hit.fachgebietTitle} — {hit.themaTitle}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onGoToThema(hit.themaId, hit.themaTitle)}
              >
                Zu diesem Thema lernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
