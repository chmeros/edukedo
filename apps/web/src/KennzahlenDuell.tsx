import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-142 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kennzahlen-Duell „Qualitätsmanagement und Prozesse" — reines Einzelspieler-Quiz (20
 * Entweder-oder-Fragen in vier Themenrunden à fünf Fragen), UI-Text bewusst durchgängig
 * „Kennzahlen-Duell" statt bloß „Duell", um Verwechslung mit dem bestehenden F-61-„Duell"
 * (asynchrones 1:1-Wissensduell im Freundeskreis) zu vermeiden. Zwei große Antwortflächen wie
 * `TwoChoiceStep` (QuizSteps.tsx), hier aber als eigene, schlankere Komponente, da Runden-
 * Navigation und Rundenübersicht spezifisch für dieses Spiel sind.
 */

interface Frage {
  nummer: number;
  runde: number;
  frage: string;
  antwortA: string;
  antwortB: string;
  beantwortet: boolean;
}

export function KennzahlenDuell({ kursId, onClose }: { kursId: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const data = trpc.game.getKennzahlenDuell.useQuery({ kursId });
  const [aktiveRunde, setAktiveRunde] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ nummer: number; ausgewaehlt: "A" | "B"; correct: boolean; feedback: string } | null>(
    null,
  );

  const invalidateProgress = () => {
    utils.progress.overview.invalidate();
    utils.progress.suggestions.invalidate();
    utils.gamification.mascotStatus.invalidate();
    utils.auth.me.invalidate();
    utils.gamification.streakStatus.invalidate();
  };

  const submit = trpc.game.submitKennzahlenDuellAntwort.useMutation({
    onSuccess: (result, variables) => {
      setFeedback({ nummer: variables.nummer, ausgewaehlt: variables.ausgewaehlt, correct: result.correct, feedback: result.feedback });
      if (result.correct) {
        utils.game.getKennzahlenDuell.invalidate({ kursId });
        invalidateProgress();
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Kennzahlen-Duell konnte nicht geladen werden.</ErrorMessage>;
  const spiel = data.data;

  const fragenNachRunde = new Map<number, Frage[]>();
  for (const frage of spiel.fragen) {
    const list = fragenNachRunde.get(frage.runde) ?? [];
    list.push(frage);
    fragenNachRunde.set(frage.runde, list);
  }

  if (aktiveRunde === null) {
    return (
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Kennzahlen-Duell: Qualitätsmanagement und Prozesse</h2>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Zurück zu den Spielen
          </button>
        </div>
        <p className="field-hint">
          Fehlerquote oder Nacharbeitsquote? Durchlaufzeit oder Bearbeitungszeit? Entscheide, welche Kennzahl zur Frage passt. Nach jeder
          Antwort erfährst du, worin sich die beiden Begriffe unterscheiden.
        </p>
        <div className="list">
          {spiel.runden.map((runde) => {
            const fragen = fragenNachRunde.get(runde.nummer) ?? [];
            const erledigt = fragen.filter((frage) => frage.beantwortet).length;
            return (
              <div key={runde.nummer} className="list-row">
                <div className="meta">
                  Runde {runde.nummer}: {runde.titel}
                  <span>
                    {erledigt} von {fragen.length} Duellen
                  </span>
                </div>
                <div className="list-row-actions">
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => setAktiveRunde(runde.nummer)}>
                    {erledigt === fragen.length ? "Runde wiederholen" : erledigt > 0 ? "Weiter" : "Runde starten"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {spiel.abgeschlossen && (
          <div className="alert alert-success">
            <div>{spiel.abschlussmeldung}</div>
          </div>
        )}
      </div>
    );
  }

  const runde = spiel.runden.find((entry) => entry.nummer === aktiveRunde)!;
  const fragenDerRunde = fragenNachRunde.get(aktiveRunde) ?? [];
  const naechsteFrage = fragenDerRunde.find((frage) => !frage.beantwortet);
  const rundeFertig = !naechsteFrage;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Kennzahlen-Duell: {runde.titel}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAktiveRunde(null)}>
          Zurück zur Rundenübersicht
        </button>
      </div>

      {rundeFertig ? (
        <div className="alert alert-success">
          <div>{runde.abschlussmeldung}</div>
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
                    submit.mutate({ kursId, nummer: naechsteFrage.nummer, ausgewaehlt: option });
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
