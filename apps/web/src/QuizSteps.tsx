import { useState } from "react";
import { ReportContentButton } from "./ReportContentButton";

/**
 * Die vier Fragetyp-Komponenten (F-21) — gemeinsam genutzt von Quiz.tsx (eingeschriebene
 * Kurse), MixedLearning.tsx (F-104-Mischmodus) und Vorschau.tsx (kontoloser Vorschau-Modus,
 * F-08). Beide zeigen exakt dieselbe UI, nur die zugrunde liegenden tRPC-Mutationen unterscheiden
 * sich (quiz.* vs. preview.*, siehe apps/api/src/quiz-logic.ts) — deshalb werden sie hier als
 * Props durchgereicht statt intern fest auf einen bestimmten Router verdrahtet zu sein.
 */

/**
 * F-112 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): kurze, motivierende Zusatzformulierung
 * neben dem bestehenden Sofort-Feedback — bewusst OHNE Sofort-Retry an derselben Frage und OHNE
 * Änderung, wann die Lösung gezeigt wird (Nutzer-Entscheidung 21.09.2026, siehe Architekturplanung
 * Abschnitt 13): die Lösung erscheint weiterhin sofort, Wiederholung falscher Antworten bleibt
 * Sache des bestehenden F-26-Wiederholungssets. Mehrere Formulierungen je Ergebnis (zufällig
 * gewählt, einmal pro Antwort in `onSuccess` fixiert statt bei jedem Re-Render neu) statt einer
 * einzigen festen Phrase — soll einer gewissen Demotivierung durch immer dieselbe Rückmeldung bei
 * wiederholt falschen Antworten vorbeugen (dritte offene Frage aus dem Anforderungskatalog).
 * Bewusst milde formuliert bei falscher Antwort (kein "Falsch!" ohne Kontext).
 */
const CORRECT_MOTIVATIONS = ["Super gemacht!", "Klasse, weiter so!", "Stark getroffen!", "Perfekt!"];
const WRONG_MOTIVATIONS = [
  "Nicht aufgeben, das schaffst du!",
  "Kein Problem, weiter geht's!",
  "Kopf hoch — beim nächsten Mal klappt's!",
  "Halb so wild, du lernst gerade dazu!",
];

function pickMotivation(isCorrect: boolean): string {
  const pool = isCorrect ? CORRECT_MOTIVATIONS : WRONG_MOTIVATIONS;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

interface MutationLike<TInput, TOutput> {
  mutate: (input: TInput, opts: { onSuccess: (result: TOutput) => void }) => void;
  isPending: boolean;
}

interface StepProps<TItem, TInput, TOutput> {
  item: TItem;
  isLast: boolean;
  onAnswered: (isCorrect: boolean) => void;
  onNext: () => void;
  submit: MutationLike<TInput, TOutput>;
  // F-50: Standardmäßig AUS statt AN — Vorschau.tsx (F-08, kontoloser Modus ohne jeden
  // Datenbank-Schreibzugriff) nutzt dieselben vier Komponenten, dort würde der Button auf eine
  // protectedProcedure treffen und mit UNAUTHORIZED fehlschlagen. Nur Quiz.tsx/MixedLearning.tsx
  // (eingeschriebene, eingeloggte Nutzer:innen) setzen `canReport`.
  canReport?: boolean;
}

export interface McItem {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
}

export function MultipleChoiceStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<McItem, { contentItemId: string; selectedOptionId: string }, {
  isCorrect: boolean;
  correctOptionId: string;
  explanation: string | null;
}>) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctOptionId: string;
    explanation: string | null;
    motivation: string;
  } | null>(null);

  function checkAnswer() {
    if (!selectedOptionId) return;
    submit.mutate(
      { contentItemId: item.id, selectedOptionId },
      {
        onSuccess: (result) => {
          setFeedback({ ...result, motivation: pickMotivation(result.isCorrect) });
          onAnswered(result.isCorrect);
        },
      },
    );
  }

  return (
    <div className="stack">
      <div className="quiz-question">{item.prompt}</div>
      <div className="quiz-options">
        {item.options.map((option) => {
          let className = "quiz-opt";
          if (feedback) {
            if (option.id === feedback.correctOptionId) {
              className += " is-correct";
            } else if (option.id === selectedOptionId) {
              className += " is-wrong";
            }
          } else if (option.id === selectedOptionId) {
            className += " is-selected";
          }

          return (
            <button
              key={option.id}
              type="button"
              className={className}
              disabled={feedback !== null}
              onClick={() => setSelectedOptionId(option.id)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {feedback ? (
        <>
          <p className={feedback.isCorrect ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.isCorrect ? "Richtig!" : "Leider falsch."}
            {feedback.explanation ? ` ${feedback.explanation}` : ""}
          </p>
          <p className="field-hint">{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={checkAnswer}
          disabled={!selectedOptionId || submit.isPending}
        >
          Antwort prüfen
        </button>
      )}
      {canReport && (
        <div style={{ textAlign: "center" }}>
          <ReportContentButton contentItemId={item.id} />
        </div>
      )}
    </div>
  );
}

export interface MatchingItem {
  id: string;
  prompt: string;
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
}

export function MatchingStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  MatchingItem,
  { contentItemId: string; pairs: { leftOptionId: string; rightOptionId: string }[] },
  { correctMap: Record<string, string>; correctCount: number; total: number }
>) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [pairs, setPairs] = useState<{ leftId: string; rightId: string }[]>([]);
  const [feedback, setFeedback] = useState<{
    correctMap: Record<string, string>;
    correctCount: number;
    total: number;
    motivation: string;
  } | null>(null);

  const pairedLeftIds = new Set(pairs.map((pair) => pair.leftId));
  const pairedRightIds = new Set(pairs.map((pair) => pair.rightId));
  const remainingLeft = item.left.filter((option) => !pairedLeftIds.has(option.id));
  const remainingRight = item.right.filter((option) => !pairedRightIds.has(option.id));

  function textFor(id: string, side: "left" | "right") {
    return (side === "left" ? item.left : item.right).find((option) => option.id === id)?.text ?? "?";
  }

  function pickRight(rightId: string) {
    if (!selectedLeftId || feedback) return;
    setPairs((current) => [...current, { leftId: selectedLeftId, rightId }]);
    setSelectedLeftId(null);
  }

  function removePair(leftId: string) {
    if (feedback) return;
    setPairs((current) => current.filter((pair) => pair.leftId !== leftId));
  }

  function checkAnswer() {
    submit.mutate(
      {
        contentItemId: item.id,
        pairs: pairs.map((pair) => ({ leftOptionId: pair.leftId, rightOptionId: pair.rightId })),
      },
      {
        onSuccess: (result) => {
          setFeedback({ ...result, motivation: pickMotivation(result.correctCount === result.total) });
          onAnswered(result.correctCount === result.total);
        },
      },
    );
  }

  return (
    <div className="stack">
      <div className="quiz-question">{item.prompt}</div>
      {pairs.length > 0 && (
        <div className="match-pairs">
          {pairs.map((pair) => {
            let className = "match-pair";
            if (feedback) {
              className += feedback.correctMap[pair.leftId] === pair.rightId ? " is-correct" : " is-wrong";
            }
            return (
              <button
                key={pair.leftId}
                type="button"
                className={className}
                disabled={feedback !== null}
                onClick={() => removePair(pair.leftId)}
              >
                {textFor(pair.leftId, "left")} ↔ {textFor(pair.rightId, "right")}
              </button>
            );
          })}
        </div>
      )}
      {!feedback && (remainingLeft.length > 0 || remainingRight.length > 0) && (
        <div className="match-grid">
          <div className="match-column">
            {remainingLeft.map((option) => (
              <button
                key={option.id}
                type="button"
                className={option.id === selectedLeftId ? "match-item is-selected" : "match-item"}
                onClick={() => setSelectedLeftId(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="match-column">
            {remainingRight.map((option) => (
              <button
                key={option.id}
                type="button"
                className="match-item"
                disabled={!selectedLeftId}
                onClick={() => pickRight(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
      {feedback ? (
        <>
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.correctCount} von {feedback.total} Zuordnungen richtig.
          </p>
          <p className="field-hint">{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={checkAnswer}
          disabled={pairs.length !== item.left.length || submit.isPending}
        >
          Antwort prüfen
        </button>
      )}
      {canReport && (
        <div style={{ textAlign: "center" }}>
          <ReportContentButton contentItemId={item.id} />
        </div>
      )}
    </div>
  );
}

export interface BlanksItem {
  id: string;
  prompt: string;
  textWithBlanks: string;
  blankIds: string[];
}

export function BlanksStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  BlanksItem,
  { contentItemId: string; answers: Record<string, string> },
  { results: Record<string, boolean>; correctAnswers: Record<string, string>; correctCount: number; total: number }
>) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{
    results: Record<string, boolean>;
    correctAnswers: Record<string, string>;
    correctCount: number;
    total: number;
    motivation: string;
  } | null>(null);

  const parts = item.textWithBlanks.split("___");
  const allFilled = item.blankIds.every((id) => (answers[id] ?? "").trim().length > 0);

  function checkAnswer() {
    submit.mutate(
      { contentItemId: item.id, answers },
      {
        onSuccess: (result) => {
          setFeedback({ ...result, motivation: pickMotivation(result.correctCount === result.total) });
          onAnswered(result.correctCount === result.total);
        },
      },
    );
  }

  return (
    <div className="stack">
      <div className="quiz-question prose">
        {parts.map((part, partIndex) => {
          const blankId = item.blankIds[partIndex];
          return (
            <span key={partIndex}>
              {part}
              {blankId && (
                <input
                  type="text"
                  className={
                    feedback ? (feedback.results[blankId] ? "quiz-blank is-correct" : "quiz-blank is-wrong") : "quiz-blank"
                  }
                  value={answers[blankId] ?? ""}
                  disabled={feedback !== null}
                  onChange={(event) => setAnswers((current) => ({ ...current, [blankId]: event.target.value }))}
                />
              )}
            </span>
          );
        })}
      </div>
      {feedback ? (
        <>
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.correctCount} von {feedback.total} Lücken richtig.
            {feedback.correctCount < feedback.total && (
              <>
                {" "}
                Richtige Lösung: {item.blankIds.map((id) => feedback.correctAnswers[id]).join(", ")}
              </>
            )}
          </p>
          <p className="field-hint">{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={checkAnswer}
          disabled={!allFilled || submit.isPending}
        >
          Antwort prüfen
        </button>
      )}
      {canReport && (
        <div style={{ textAlign: "center" }}>
          <ReportContentButton contentItemId={item.id} />
        </div>
      )}
    </div>
  );
}

export interface KurzantwortItem {
  id: string;
  prompt: string;
}

export function KurzantwortStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  KurzantwortItem,
  { contentItemId: string; answer: string },
  { isCorrect: boolean; correctAnswer: string; explanation: string | null }
>) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string | null;
    motivation: string;
  } | null>(null);

  function checkAnswer() {
    submit.mutate(
      { contentItemId: item.id, answer },
      {
        onSuccess: (result) => {
          setFeedback({ ...result, motivation: pickMotivation(result.isCorrect) });
          onAnswered(result.isCorrect);
        },
      },
    );
  }

  return (
    <div className="stack">
      <div className="quiz-question">{item.prompt}</div>
      <div className="field">
        <input
          className={feedback ? (feedback.isCorrect ? "input is-correct" : "input is-wrong") : "input"}
          type="text"
          placeholder="Antwort"
          value={answer}
          disabled={feedback !== null}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </div>
      {feedback ? (
        <>
          <p className={feedback.isCorrect ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.isCorrect ? "Richtig!" : (
              <>
                Leider falsch. Richtige Lösung: <b>{feedback.correctAnswer}</b>
              </>
            )}
            {feedback.explanation ? ` ${feedback.explanation}` : ""}
          </p>
          <p className="field-hint">{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          onClick={checkAnswer}
          disabled={!answer.trim() || submit.isPending}
        >
          Antwort prüfen
        </button>
      )}
      {canReport && (
        <div style={{ textAlign: "center" }}>
          <ReportContentButton contentItemId={item.id} />
        </div>
      )}
    </div>
  );
}
