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

export interface McMultiItem {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
}

/**
 * F-116 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Multiple Choice, Nutzer-Entscheidung
 * 22.09.2026, siehe Architekturplanung Abschnitt 13): Mehrfachauswahl — mechanisch wie
 * MultipleChoiceStep (dieselben `.quiz-opt`-Kacheln), aber togglebare Auswahl (Klick an-/abwählen)
 * statt einer einzelnen Auswahl, und ein fester Hinweistext, damit für Lernende erkennbar ist,
 * dass hier mehrere Antworten richtig sein können (Anforderungskatalog F-116). Bewertung
 * Alles-oder-nichts (checkMcMultiAnswer in quiz-logic.ts): "Richtig" nur bei exakt der
 * angekreuzten Menge, `correctOptionIds` markiert nach Prüfung zusätzlich fehlende Optionen als
 * "richtig, aber nicht ausgewählt".
 */
export function McMultiStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  McMultiItem,
  { contentItemId: string; selectedOptionIds: string[] },
  { isCorrect: boolean; correctOptionIds: string[]; explanation: string | null }
>) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctOptionIds: string[];
    explanation: string | null;
    motivation: string;
  } | null>(null);

  function toggleOption(optionId: string) {
    setSelectedOptionIds((current) =>
      current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId],
    );
  }

  function checkAnswer() {
    if (selectedOptionIds.length === 0) return;
    submit.mutate(
      { contentItemId: item.id, selectedOptionIds },
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
      <p className="field-hint">Mehrere Antworten können richtig sein.</p>
      <div className="quiz-options">
        {item.options.map((option) => {
          const isSelected = selectedOptionIds.includes(option.id);
          let className = "quiz-opt";
          if (feedback) {
            if (feedback.correctOptionIds.includes(option.id)) {
              className += " is-correct";
            } else if (isSelected) {
              className += " is-wrong";
            }
          } else if (isSelected) {
            className += " is-selected";
          }

          return (
            <button
              key={option.id}
              type="button"
              className={className}
              disabled={feedback !== null}
              onClick={() => toggleOption(option.id)}
            >
              {isSelected ? "☑ " : "☐ "}
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
          disabled={selectedOptionIds.length === 0 || submit.isPending}
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

/**
 * F-113 Teil 2 (Sortieren, Nutzer-Feedback vom 18.09.2026, erweitert F-21): vier vorgegebene
 * Elemente per Drag-and-Drop in die richtige Reihenfolge bringen — mechanisch analog zu
 * QuadrantStep (Pool + feste Zielfelder), nur sind die "Zonen" hier vier nummerierte Positionen
 * statt fachlicher Zonen-Namen. Wiederverwendet dieselben DraggableTerm/DroppableZone-Bausteine
 * sowie dieselben `.quadrant-*`-CSS-Klassen (2×2-Raster, bricht auf schmalen Bildschirmen auf
 * eine Spalte um) — keine neue CSS nötig.
 */
const SORTIEREN_POOL_ID = "_pool";
const SORTIEREN_POSITIONS = [0, 1, 2, 3];

export interface SortierenItem {
  id: string;
  prompt: string;
  items: { id: string; text: string }[];
}

export function SortierenStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  SortierenItem,
  { contentItemId: string; orderedOptionIds: string[] },
  { results: Record<string, boolean>; correctOrder: string[]; correctCount: number; total: number }
>) {
  // Element-ID → Positions-Index (0–3), oder null = noch im Pool — analog zu QuadrantSteps
  // `placements`, nur ist der Zielwert hier ein Positions-Index statt eines Zonen-Schlüssels.
  const [placements, setPlacements] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(item.items.map((element) => [element.id, null])),
  );
  const [feedback, setFeedback] = useState<{
    results: Record<string, boolean>;
    correctOrder: string[];
    correctCount: number;
    total: number;
    motivation: string;
  } | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    if (feedback) return;
    const elementId = String(event.active.id);
    const targetId = event.over ? String(event.over.id) : SORTIEREN_POOL_ID;
    if (targetId === SORTIEREN_POOL_ID) {
      setPlacements((current) => ({ ...current, [elementId]: null }));
      return;
    }
    const targetPosition = Number(targetId);
    // Jede Position fasst nur ein Element — ein bereits dort platziertes Element wandert
    // zurück in den Pool (wie bei BlanksSelectionStep/QuadrantStep).
    setPlacements((current) => {
      const next = { ...current };
      for (const [id, position] of Object.entries(next)) {
        if (position === targetPosition) next[id] = null;
      }
      next[elementId] = targetPosition;
      return next;
    });
  }

  const allPlaced = item.items.every((element) => placements[element.id] !== null);

  function checkAnswer() {
    const orderedOptionIds = SORTIEREN_POSITIONS.map(
      (position) => item.items.find((element) => placements[element.id] === position)!.id,
    );
    submit.mutate(
      { contentItemId: item.id, orderedOptionIds },
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
        <DroppableZone id={SORTIEREN_POOL_ID} className="quadrant-pool">
          {item.items
            .filter((element) => placements[element.id] === null)
            .map((element) => (
              <DraggableTerm key={element.id} id={element.id} text={element.text} disabled={feedback !== null} />
            ))}
        </DroppableZone>
        <div className="quadrant-grid">
          {SORTIEREN_POSITIONS.map((position) => {
            const placedElement = item.items.find((element) => placements[element.id] === position);
            return (
              <DroppableZone key={position} id={String(position)} label={`${position + 1}.`} className="quadrant-zone">
                {placedElement && (
                  <DraggableTerm
                    id={placedElement.id}
                    text={placedElement.text}
                    disabled={feedback !== null}
                    state={feedback ? (feedback.results[placedElement.id] ? "correct" : "wrong") : undefined}
                  />
                )}
              </DroppableZone>
            );
          })}
        </div>
      </DndContext>
      {feedback ? (
        <>
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
            {feedback.correctCount} von {feedback.total} Positionen richtig.
            {feedback.correctCount < feedback.total && (
              <>
                {" "}
                Richtige Reihenfolge:{" "}
                {feedback.correctOrder
                  .map((id) => item.items.find((element) => element.id === id)?.text)
                  .join(", ")}
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

/**
 * F-115 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Lückentext, Nutzer-Entscheidung
 * 22.09.2026, siehe Architekturplanung Abschnitt 13): Wortauswahl-Lückentext — mechanisch wie
 * BlanksStep (derselbe `submitBlanks`-Endpunkt, dieselbe `answers: Record<blankId,string>`-Form),
 * aber per echtem Drag-and-Drop aus einem Wortpool statt Freitext-Eingabe. Wiederverwendet die
 * DraggableTerm/DroppableZone-Bausteine aus QuadrantStep (F-114) für den Wortpool — nur die
 * Lücken selbst brauchen eine neue, INLINE im Fließtext sitzende Droppable-Zone
 * (`DroppableBlankSlot`), da `DroppableZone` als Block gedacht ist.
 */
const BLANKS_POOL_ID = "_pool";

function DroppableBlankSlot({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <span ref={setNodeRef} className={isOver ? "quiz-blank-slot is-over" : "quiz-blank-slot"}>
      {children}
    </span>
  );
}

export interface BlanksSelectionItem {
  id: string;
  prompt: string;
  textWithBlanks: string;
  blankIds: string[];
  words: { id: string; text: string }[];
}

export function BlanksSelectionStep({
  item,
  isLast,
  onAnswered,
  onNext,
  submit,
  canReport,
}: StepProps<
  BlanksSelectionItem,
  { contentItemId: string; answers: Record<string, string> },
  { results: Record<string, boolean>; correctAnswers: Record<string, string>; correctCount: number; total: number }
>) {
  // Pool-Wort-ID → Lücken-ID (oder null = noch im Pool) — analog zu QuadrantSteps `placements`.
  const [placements, setPlacements] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(item.words.map((word) => [word.id, null])),
  );
  const [feedback, setFeedback] = useState<{
    results: Record<string, boolean>;
    correctAnswers: Record<string, string>;
    correctCount: number;
    total: number;
    motivation: string;
  } | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    if (feedback) return;
    const wordId = String(event.active.id);
    const targetId = event.over ? String(event.over.id) : BLANKS_POOL_ID;
    if (targetId === BLANKS_POOL_ID) {
      setPlacements((current) => ({ ...current, [wordId]: null }));
      return;
    }
    // Jede Lücke fasst nur ein Wort — ein bereits dort platziertes Wort wandert zurück in den
    // Pool, statt dass zwei Wörter derselben Lücke zugeordnet werden könnten.
    setPlacements((current) => {
      const next = { ...current };
      for (const [id, blankId] of Object.entries(next)) {
        if (blankId === targetId) next[id] = null;
      }
      next[wordId] = targetId;
      return next;
    });
  }

  const parts = item.textWithBlanks.split("___");
  const allFilled = item.blankIds.every((blankId) => Object.values(placements).includes(blankId));

  function checkAnswer() {
    const answers = Object.fromEntries(
      item.blankIds.map((blankId) => {
        const word = item.words.find((candidate) => placements[candidate.id] === blankId);
        return [blankId, word?.text ?? ""];
      }),
    );
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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="quiz-question prose">
          {parts.map((part, partIndex) => {
            const blankId = item.blankIds[partIndex];
            const word = blankId ? item.words.find((candidate) => placements[candidate.id] === blankId) : undefined;
            return (
              <span key={partIndex}>
                {part}
                {blankId && (
                  <DroppableBlankSlot id={blankId}>
                    {word && (
                      <DraggableTerm
                        id={word.id}
                        text={word.text}
                        disabled={feedback !== null}
                        state={feedback ? (feedback.results[blankId] ? "correct" : "wrong") : undefined}
                      />
                    )}
                  </DroppableBlankSlot>
                )}
              </span>
            );
          })}
        </div>
        <DroppableZone id={BLANKS_POOL_ID} className="quadrant-pool">
          {item.words
            .filter((word) => !placements[word.id])
            .map((word) => (
              <DraggableTerm key={word.id} id={word.id} text={word.text} disabled={feedback !== null} />
            ))}
        </DroppableZone>
      </DndContext>
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
