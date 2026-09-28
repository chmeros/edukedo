import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kennzahlen-Memory „Personal" — 24 Personalkennzahlen-Paare (Begriff ↔ Bedeutung) in vier
 * Themenrunden à sechs Paare. Innerhalb einer laufenden Runde bleiben bereits gefundene Paare
 * bewusst nur clientseitig gehalten (siehe Architekturplanung Abschnitt 13 zur Datenmodell-
 * Entscheidung F-140–F-143): ein Reload mitten in einer Runde beginnt diese Runde neu, bereits
 * ABGESCHLOSSENE Runden bleiben serverseitig erhalten (`completeMemoryRound`).
 */

interface Karte {
  cardId: number;
  text: string;
}

export function PersonalkennzahlenMemory({ kursId, onClose }: { kursId: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const [aktiveRunde, setAktiveRunde] = useState<number | null>(null);
  const [aufgedeckt, setAufgedeckt] = useState<number[]>([]);
  const [gefunden, setGefunden] = useState<number[]>([]);
  const [falschesPaar, setFalschesPaar] = useState<number[] | null>(null);
  const [bestaetigung, setBestaetigung] = useState<string | null>(null);

  const invalidateProgress = () => {
    utils.progress.overview.invalidate();
    utils.progress.suggestions.invalidate();
    utils.gamification.mascotStatus.invalidate();
    utils.auth.me.invalidate();
    utils.gamification.streakStatus.invalidate();
  };

  const data = trpc.game.getMemory.useQuery({ kursId, runde: aktiveRunde ?? 1 }, { enabled: aktiveRunde !== null });
  const submitPaar = trpc.game.submitMemoryPaar.useMutation();
  const completeRound = trpc.game.completeMemoryRound.useMutation({
    onSuccess: () => utils.game.getMemory.invalidate({ kursId, runde: aktiveRunde ?? 1 }),
  });

  // Übersichtsdaten (welche Runden schon abgeschlossen sind) — bewusst eine zweite, feste Abfrage
  // für Runde 1 statt vier separater Overview-Prozeduren; `abgeschlosseneRunden` liegt in jeder
  // Runden-Antwort identisch vor (siehe game.ts-Router).
  const overview = trpc.game.getMemory.useQuery({ kursId, runde: 1 }, { enabled: aktiveRunde === null });

  useEffect(() => {
    setAufgedeckt([]);
    setGefunden([]);
    setFalschesPaar(null);
    setBestaetigung(null);
  }, [aktiveRunde]);

  function karteAufdecken(karte: Karte, karten: Karte[]) {
    if (submitPaar.isPending || aufgedeckt.length === 2 || gefunden.includes(karte.cardId) || aufgedeckt.includes(karte.cardId)) {
      return;
    }
    const naechsteAufgedeckt = [...aufgedeckt, karte.cardId];
    setAufgedeckt(naechsteAufgedeckt);
    setFalschesPaar(null);
    setBestaetigung(null);

    if (naechsteAufgedeckt.length !== 2) return;

    const [ersteId, zweiteId] = naechsteAufgedeckt;
    const ersteKarte = karten.find((entry) => entry.cardId === ersteId)!;
    const zweiteKarte = karten.find((entry) => entry.cardId === zweiteId)!;

    submitPaar.mutate(
      { kursId, runde: aktiveRunde!, textA: ersteKarte.text, textB: zweiteKarte.text },
      {
        onSuccess: (result) => {
          if (result.correct) {
            const neuGefunden = [...gefunden, ersteId!, zweiteId!];
            setGefunden(neuGefunden);
            setBestaetigung(result.bestaetigung);
            setAufgedeckt([]);
            invalidateProgress();
            if (neuGefunden.length === karten.length) {
              completeRound.mutate({ kursId, runde: aktiveRunde! });
            }
          } else {
            setFalschesPaar(naechsteAufgedeckt);
            window.setTimeout(() => {
              setAufgedeckt([]);
              setFalschesPaar(null);
            }, 1200);
          }
        },
      },
    );
  }

  if (aktiveRunde === null) {
    if (overview.isLoading) return <p>Lädt…</p>;
    if (overview.error || !overview.data) return <ErrorMessage>Kennzahlen-Memory konnte nicht geladen werden.</ErrorMessage>;
    const abgeschlosseneRunden = new Set(overview.data.abgeschlosseneRunden);

    return (
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Kennzahlen-Memory: Personal</h2>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Zurück zu den Spielen
          </button>
        </div>
        <p className="field-hint">
          Welche Kennzahl passt zu welcher Beschreibung? Decke jeweils zwei Karten auf und finde die passenden Paare. Nach jedem
          gefundenen Paar erfährst du, was die Kennzahl aussagt.
        </p>
        <div className="list">
          {overview.data.runden.map((runde) => (
            <div key={runde.nummer} className="list-row">
              <div className="meta">
                Runde {runde.nummer}: {runde.titel}
                {abgeschlosseneRunden.has(runde.nummer) && <span>Abgeschlossen</span>}
              </div>
              <div className="list-row-actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setAktiveRunde(runde.nummer)}>
                  {abgeschlosseneRunden.has(runde.nummer) ? "Runde erneut spielen" : "Runde starten"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {overview.data.abgeschlossen && (
          <div className="alert alert-success">
            <div>{overview.data.abschlussmeldung}</div>
          </div>
        )}
      </div>
    );
  }

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Runde konnte nicht geladen werden.</ErrorMessage>;
  const runde = data.data;
  const rundeFertig = gefunden.length === runde.karten.length;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Kennzahlen-Memory: Runde {aktiveRunde}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAktiveRunde(null)}>
          Zurück zur Rundenübersicht
        </button>
      </div>

      {rundeFertig ? (
        <div className="alert alert-success">
          <div>{runde.runden.find((entry) => entry.nummer === aktiveRunde)?.abschlussmeldung}</div>
        </div>
      ) : (
        <div className="stack">
          <span className="due-count">
            {Math.floor(gefunden.length / 2)} von {runde.karten.length / 2} Paaren
          </span>
          <div className="quadrant-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {runde.karten.map((karte) => {
              const istGefunden = gefunden.includes(karte.cardId);
              const istAufgedeckt = aufgedeckt.includes(karte.cardId) || istGefunden;
              const istFalsch = falschesPaar?.includes(karte.cardId) ?? false;
              let className = "quadrant-term";
              if (istGefunden) className += " is-correct";
              if (istFalsch) className += " is-wrong";
              return (
                <button
                  key={karte.cardId}
                  type="button"
                  className={className}
                  style={{ minHeight: 64 }}
                  disabled={istGefunden || submitPaar.isPending}
                  onClick={() => karteAufdecken(karte, runde.karten)}
                >
                  {istAufgedeckt ? karte.text : "?"}
                </button>
              );
            })}
          </div>
          {bestaetigung && (
            <p role="status" className="quiz-feedback is-correct">
              {bestaetigung}
            </p>
          )}
          {falschesPaar && (
            <p role="status" className="quiz-feedback is-wrong">
              {runde.falschesPaarFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
