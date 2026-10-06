import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-142 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kennzahlen-Duell „Qualitätsmanagement und Prozesse" — reines Einzelspieler-Quiz (20
 * Entweder-oder-Fragen in vier Themenrunden à fünf Fragen), UI-Text bewusst durchgängig
 * „Kennzahlen-Duell" statt bloß „Duell", um Verwechslung mit dem bestehenden F-61-„Duell"
 * (asynchrones 1:1-Wissensduell im Freundeskreis) zu vermeiden.
 *
 * Nutzer-Vorgabe vom 28.09.2026: Runden laufen streng sequenziell (beginnend bei der ersten
 * noch nicht abgeschlossenen), keine frei wählbare Rundenübersicht mehr. Nach einer
 * abgeschlossenen Runde entscheidet die Person explizit zwischen "Weiter" (nächste Runde) und
 * "Schluss für heute" (zurück zum Spiele-Katalog) — der interne Rundenzeiger startet mit der
 * serverseitig ermittelten ersten unfertigen Runde und wird nur durch einen expliziten
 * "Weiter"-Klick weitergesetzt, niemals automatisch.
 */

interface Frage {
  nummer: number;
  runde: number;
  frage: string;
  antwortA: string;
  antwortB: string;
  beantwortet: boolean;
}

/** F-157: `title` kommt aus `game.title` des Kurses (z. B. „Kennzahlen-Duell: …" im Fachwirt-Kurs, „Begriffe-Duell: …" bei den Fachinformatikern). */
export function KennzahlenDuell({ kursId, setKey, title, onClose }: { kursId: string; setKey?: string; title: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const data = trpc.game.getKennzahlenDuell.useQuery({ kursId, setKey });
  const [rundeOverride, setRundeOverride] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ nummer: number; ausgewaehlt: "A" | "B"; correct: boolean; feedback: string } | null>(
    null,
  );

  const submit = trpc.game.submitKennzahlenDuellAntwort.useMutation({
    onSuccess: (result, variables) => {
      setFeedback({ nummer: variables.nummer, ausgewaehlt: variables.ausgewaehlt, correct: result.correct, feedback: result.feedback });
      if (result.correct) {
        utils.game.getKennzahlenDuell.invalidate({ kursId, setKey });
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const spiel = data.data;

  const fragenNachRunde = new Map<number, Frage[]>();
  for (const frage of spiel.fragen) {
    const list = fragenNachRunde.get(frage.runde) ?? [];
    list.push(frage);
    fragenNachRunde.set(frage.runde, list);
  }

  // Erste noch nicht vollständig beantwortete Runde — Ausgangspunkt bei jedem (Wieder-)Einstieg,
  // solange kein expliziter "Weiter"-Klick (rundeOverride) einen anderen Zeiger gesetzt hat.
  const ersteUnfertigeRunde =
    spiel.runden.find((runde) => (fragenNachRunde.get(runde.nummer) ?? []).some((frage) => !frage.beantwortet))?.nummer ??
    spiel.runden[spiel.runden.length - 1]?.nummer ??
    1;
  const aktiveRunde = rundeOverride ?? ersteUnfertigeRunde;
  const rundenIndex = spiel.runden.findIndex((entry) => entry.nummer === aktiveRunde);
  const runde = spiel.runden[rundenIndex]!;
  const naechsteRunde = spiel.runden[rundenIndex + 1];
  const fragenDerRunde = fragenNachRunde.get(aktiveRunde) ?? [];
  const naechsteFrage = fragenDerRunde.find((frage) => !frage.beantwortet);
  const rundeFertig = !naechsteFrage;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>{title}: {runde.titel}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Zurück zu den Spielen
        </button>
      </div>

      {rundeFertig ? (
        <div className="stack">
          <div className="alert alert-success">
            <div>{runde.abschlussmeldung}</div>
          </div>
          <div className="list-row-actions">
            {naechsteRunde ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setFeedback(null);
                  setRundeOverride(naechsteRunde.nummer);
                }}
              >
                Weiter: {naechsteRunde.titel}
              </button>
            ) : (
              spiel.abgeschlossen && (
                <div className="alert alert-success">
                  <div>{spiel.abschlussmeldung}</div>
                </div>
              )
            )}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Schluss für heute
            </button>
          </div>
        </div>
      ) : (
        <div className="stack">
          <span className="quiz-progress">
            Runde {aktiveRunde} von {spiel.runden.length} · Duell {fragenDerRunde.filter((f) => f.beantwortet).length + 1} von{" "}
            {fragenDerRunde.length}
          </span>
          <div className="quiz-question">{naechsteFrage.frage}</div>
          <div className="quiz-two-choice">
            {(["A", "B"] as const).map((option) => {
              const isSelectedOption = feedback?.nummer === naechsteFrage.nummer && feedback.ausgewaehlt === option;
              const text = option === "A" ? naechsteFrage.antwortA : naechsteFrage.antwortB;
              let className = "quiz-opt";
              if (isSelectedOption) {
                className += feedback!.correct ? " is-correct" : " is-wrong";
              }
              return (
                <button
                  key={option}
                  type="button"
                  className={className}
                  disabled={submit.isPending}
                  onClick={() => {
                    setFeedback(null);
                    submit.mutate({ kursId, setKey, nummer: naechsteFrage.nummer, ausgewaehlt: option });
                  }}
                >
                  {text}
                </button>
              );
            })}
          </div>
          {feedback?.nummer === naechsteFrage.nummer && (
            <p role="status" className={feedback.correct ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
              {feedback.feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
