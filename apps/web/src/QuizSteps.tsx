import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
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

/**
 * F-113 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): "Wahr/Falsch" und "Entweder-Oder" —
 * beide strukturell identisch zu Multiple Choice (`item`/`submit`/Grading exakt wie
 * MultipleChoiceStep, siehe quiz-logic.ts), aber bewusst als eigene, visuell unterscheidbare
 * Komponente statt Wiederverwendung von MultipleChoiceStep: zwei große, nebeneinander stehende
 * Antwortflächen (`.quiz-two-choice`) statt der vertikalen Options-Liste, damit sich die binäre
 * Entscheidung (wahr/falsch bzw. das eine oder das andere) auch optisch von einer regulären,
 * potenziell längeren Multiple-Choice-Liste abhebt. "Was passt nicht dazu" (vier Begriffe, einer
 * ist der Ausreißer) ist dagegen mechanisch identisch zu einer regulären MC-Liste und nutzt
 * deshalb MultipleChoiceStep unverändert weiter (siehe Quiz.tsx/MixedLearning.tsx/Vorschau.tsx).
 */
export function TwoChoiceStep({
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

  function checkAnswer(optionId: string) {
    setSelectedOptionId(optionId);
    submit.mutate(
      { contentItemId: item.id, selectedOptionId: optionId },
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
      <div className="quiz-two-choice">
        {item.options.map((option) => {
          let className = "quiz-opt";
          if (feedback) {
            if (option.id === feedback.correctOptionId) {
              className += " is-correct";
            } else if (option.id === selectedOptionId) {
              className += " is-wrong";
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              className={className}
              disabled={feedback !== null || submit.isPending}
              onClick={() => checkAnswer(option.id)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {feedback && (
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

/**
 * F-114 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung): SWOT-Matrix/Balanced
 * Scorecard/Ansoff-Matrix — dieselbe "Begriffe der richtigen Gruppe zuordnen"-Idee wie
 * MatchingStep, aber N feste Zonen (`item.zones`) statt zwei Spalten, und per echtem
 * Drag-and-Drop statt Klick-Klick bedient (Nutzer-Entscheidung 21.09.2026, siehe
 * Architekturplanung Abschnitt 13 für die Begründung — insbesondere @dnd-kit/core statt einer
 * selbst gebauten Pointer-Events-Lösung, wegen zuverlässiger Touch-Unterstützung).
 * `POOL_ID` ist eine eigene, "virtuelle" Droppable-Zone für noch nicht zugeordnete Begriffe —
 * kein Zonen-Schlüssel des Modells, daher der führende Unterstrich zur Abgrenzung.
 */
const QUADRANT_POOL_ID = "_pool";

export interface QuadrantItem {
  id: string;
  prompt: string;
  zones: { key: string; label: string }[];
  terms: { id: string; text: string }[];
}

function DraggableTerm({
  id,
  text,
  disabled,
  state,
}: {
  id: string;
  text: string;
  disabled: boolean;
  state?: "correct" | "wrong";
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });
  let className = "quadrant-term";
  if (state === "correct") className += " is-correct";
  if (state === "wrong") className += " is-wrong";
  if (isDragging) className += " is-dragging";

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={className}
      disabled={disabled}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      {...listeners}
      {...attributes}
    >
      {text}
    </button>
  );
}

function DroppableZone({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label?: string;
  className: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={isOver ? `${className} is-over` : className}>
      {label && <span className="quadrant-zone-label">{label}</span>}
      <div className="quadrant-zone-terms">{children}</div>
    </div>
  );
}

export function QuadrantStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  QuadrantItem,
  { contentItemId: string; placements: { optionId: string; zoneKey: string }[] },
  { results: Record<string, boolean>; correctZones: Record<string, string>; correctCount: number; total: number }
>) {
  const [placements, setPlacements] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(item.terms.map((term) => [term.id, null])),
  );
  const [feedback, setFeedback] = useState<{
    results: Record<string, boolean>;
    correctZones: Record<string, string>;
    correctCount: number;
    total: number;
    motivation: string;
  } | null>(null);
  // distance-Schwelle verhindert, dass ein einfacher Tap/Klick (z. B. um den Begriff nur
  // anzusehen) bereits als Drag-Start gewertet wird — auf Touch wie Maus gleichermaßen relevant.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    if (feedback) return;
    const termId = String(event.active.id);
    const targetId = event.over ? String(event.over.id) : QUADRANT_POOL_ID;
    setPlacements((current) => ({ ...current, [termId]: targetId === QUADRANT_POOL_ID ? null : targetId }));
  }

  const allPlaced = item.terms.every((term) => placements[term.id] !== null);

  function checkAnswer() {
    submit.mutate(
      {
        contentItemId: item.id,
        placements: item.terms.map((term) => ({ optionId: term.id, zoneKey: placements[term.id]! })),
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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableZone id={QUADRANT_POOL_ID} className="quadrant-pool">
          {item.terms
            .filter((term) => !placements[term.id])
            .map((term) => (
              <DraggableTerm key={term.id} id={term.id} text={term.text} disabled={feedback !== null} />
            ))}
        </DroppableZone>
        <div className="quadrant-grid">
          {item.zones.map((zone) => (
            <DroppableZone key={zone.key} id={zone.key} label={zone.label} className="quadrant-zone">
              {item.terms
                .filter((term) => placements[term.id] === zone.key)
                .map((term) => (
                  <DraggableTerm
                    key={term.id}
                    id={term.id}
                    text={term.text}
                    disabled={feedback !== null}
                    state={feedback ? (feedback.results[term.id] ? "correct" : "wrong") : undefined}
                  />
                ))}
            </DroppableZone>
          ))}
        </div>
      </DndContext>
      {feedback ? (
        <>
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.correctCount} von {feedback.total} Begriffen richtig zugeordnet.
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
          disabled={!allPlaced || submit.isPending}
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
