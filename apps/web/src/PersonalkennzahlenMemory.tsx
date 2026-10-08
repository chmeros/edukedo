import { randomSeed } from "@edukedo/shared";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kennzahlen-Memory „Personal" — 24 Personalkennzahlen-Paare (Begriff ↔ Bedeutung) in vier
 * Themenrunden à sechs Paare. Innerhalb einer laufenden Runde bleiben bereits gefundene Paare
 * bewusst nur clientseitig gehalten (siehe Architekturplanung Abschnitt 13 zur Datenmodell-
 * Entscheidung F-140–F-143): ein Reload mitten in einer Runde beginnt diese Runde neu, bereits
 * ABGESCHLOSSENE Runden bleiben serverseitig erhalten (`completeMemoryRound`).
 *
 * Nutzer-Vorgabe vom 28.09.2026: Runden laufen streng sequenziell (beginnend bei der ersten
 * noch nicht abgeschlossenen), keine frei wählbare Rundenübersicht mehr. Nach einer
 * abgeschlossenen Runde entscheidet die Person explizit zwischen "Weiter" und "Schluss für
 * heute". Da `game.getMemory` immer genau eine Runde lädt, wird die passende Startrunde einmalig
 * über eine kleine Bootstrap-Abfrage (Runde 1, liefert `abgeschlosseneRunden` unabhängig von der
 * angefragten Runde) ermittelt, bevor die eigentliche Runde geladen wird.
 */

interface Karte {
  cardId: number;
  text: string;
}

/** F-157: `title` kommt aus `game.title` des Kurses (z. B. „Kennzahlen-Memory: Personal" im Fachwirt-Kurs). */
export function PersonalkennzahlenMemory({ kursId, setKey, title, onClose }: { kursId: string; setKey?: string; title: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const [aktiveRunde, setAktiveRunde] = useState<number | null>(null);
  // F-193: Seed für die Ziehung der Paare und das Mischen der Karten; ein neuer Seed gibt neue Karten.
  const [seed, setSeed] = useState(() => randomSeed());
  const [aufgedeckt, setAufgedeckt] = useState<number[]>([]);
  const [gefunden, setGefunden] = useState<number[]>([]);
  const [falschesPaar, setFalschesPaar] = useState<number[] | null>(null);
  const [bestaetigung, setBestaetigung] = useState<string | null>(null);

  // Bootstrap: welche Runde ist die erste noch nicht abgeschlossene? `abgeschlosseneRunden`
  // liegt in JEDER `getMemory`-Antwort identisch vor, unabhängig von der angefragten Runde.
  const bootstrap = trpc.game.getMemory.useQuery({ kursId, setKey, runde: 1 }, { enabled: aktiveRunde === null });
  useEffect(() => {
    if (aktiveRunde !== null || !bootstrap.data) return;
    const abgeschlossen = new Set(bootstrap.data.abgeschlosseneRunden);
    const naturalStart =
      bootstrap.data.runden.find((runde) => !abgeschlossen.has(runde.nummer))?.nummer ??
      bootstrap.data.runden[bootstrap.data.runden.length - 1]?.nummer ??
      1;
    setAktiveRunde(naturalStart);
  }, [bootstrap.data, aktiveRunde]);

  const data = trpc.game.getMemory.useQuery({ kursId, setKey, runde: aktiveRunde ?? 1, seed }, { enabled: aktiveRunde !== null });
  const submitPaar = trpc.game.submitMemoryPaar.useMutation();
  const completeRound = trpc.game.completeMemoryRound.useMutation({
    onSuccess: () => utils.game.getMemory.invalidate({ kursId, setKey, runde: aktiveRunde ?? 1, seed }),
  });

  // Review WRK-38: Der Timer, der ein falsches Paar nach 1,2 s wieder zudeckt, wird beim Rundenwechsel und beim Verlassen gelöscht.
  const zudeckTimer = useRef<number | null>(null);
  const loescheZudeckTimer = () => {
    if (zudeckTimer.current !== null) {
      window.clearTimeout(zudeckTimer.current);
      zudeckTimer.current = null;
    }
  };
  useEffect(() => loescheZudeckTimer, []);

  useEffect(() => {
    loescheZudeckTimer();
    setAufgedeckt([]);
    setGefunden([]);
    setFalschesPaar(null);
    setBestaetigung(null);
  }, [aktiveRunde, seed]);

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
      { kursId, setKey, runde: aktiveRunde!, textA: ersteKarte.text, textB: zweiteKarte.text },
      {
        onSuccess: (result) => {
          if (result.correct) {
            const neuGefunden = [...gefunden, ersteId!, zweiteId!];
            setGefunden(neuGefunden);
            setBestaetigung(result.bestaetigung);
            setAufgedeckt([]);
            if (neuGefunden.length === karten.length) {
              completeRound.mutate({ kursId, setKey, runde: aktiveRunde! });
            }
          } else {
            setFalschesPaar(naechsteAufgedeckt);
            loescheZudeckTimer();
            zudeckTimer.current = window.setTimeout(() => {
              zudeckTimer.current = null;
              setAufgedeckt([]);
              setFalschesPaar(null);
            }, 1200);
          }
        },
      },
    );
  }

  if (aktiveRunde === null || data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const runde = data.data;
  const rundeFertig = gefunden.length === runde.karten.length;
  const rundenIndex = runde.runden.findIndex((entry) => entry.nummer === aktiveRunde);
  const naechsteRunde = runde.runden[rundenIndex + 1];

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>{title}: Runde {aktiveRunde}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Zurück zu den Spielen
        </button>
      </div>

      {rundeFertig ? (
        <div className="stack">
          <div className="alert alert-success">
            <div>{runde.runden[rundenIndex]?.abschlussmeldung}</div>
          </div>
          <div className="list-row-actions">
            {naechsteRunde ? (
              <button type="button" className="btn btn-primary" onClick={() => setAktiveRunde(naechsteRunde.nummer)}>
                Weiter: {naechsteRunde.titel}
              </button>
            ) : (
              runde.abgeschlossen && (
                <div className="alert alert-success">
                  <div>{runde.abschlussmeldung}</div>
                </div>
              )
            )}
            {!naechsteRunde && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSeed(randomSeed());
                  setAktiveRunde(1);
                }}
              >
                Noch einmal spielen
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Schluss für heute
            </button>
          </div>
        </div>
      ) : (
        <div className="stack">
          <div className="list-row-actions">
            <span className="due-count">
              {Math.floor(gefunden.length / 2)} von {runde.karten.length / 2} Paaren
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSeed(randomSeed())}>
              Neue Karten
            </button>
          </div>
          {/* Review WRK-22: Spaltenzahl richtet sich nach der Breite statt fest 4 (auf dem Handy sonst winzige Karten). */}
          <div className="quadrant-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 6.5rem), 1fr))" }}>
            {runde.karten.map((karte, kartenNummer) => {
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
                  aria-label={istAufgedeckt ? undefined : `Karte ${kartenNummer + 1}, verdeckt`}
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
