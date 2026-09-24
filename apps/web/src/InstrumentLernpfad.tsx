import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableTerm, DroppableZone } from "./QuizSteps";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-129/F-130/F-131 (Nutzer-Vorgabe vom 24.09.2026, siehe packages/shared/src/schemas/
 * instrument-lernpfad.ts für die vollständige Konzept-Dokumentation): Instrumenten-Lernpfad —
 * geführter, mehrstufiger Lern-/Übungsdurchgang, sequenziell durchlaufen (kein freies Springen
 * zwischen Stationen, anders als die übrigen Lernmodi). Wiederverwendet DraggableTerm/
 * DroppableZone/DndContext aus QuizSteps.tsx (F-114/F-113) für alle Drag-and-Drop-Stationen.
 *
 * Zwei Interaktionsmuster (siehe Moduldoku in instrument-lernpfad.ts):
 * - Batch (Wissensfrage/Sortieren): auswählen, dann "Antwort prüfen".
 * - Sofort (Struktur/Zonen/Maßnahmen): jeder einzelne Zug löst SOFORT einen eigenen
 *   Server-Aufruf aus (kein Sammel-Submit) — reagiert dadurch bewusst NICHT optimistisch, ein
 *   kurzer Moment bis zur Rückmeldung ist gewollt in Kauf genommen, damit die Lösung serverseitig
 *   verborgen bleiben kann (siehe Moduldoku).
 */

type WissensfrageOption = { index: number; text: string };
type WissensfrageShaped = { prompt: string; selectCount: number; options: WissensfrageOption[] };
type PoolItemShaped = { index: number; text: string };
type PoolRoundShaped = { context?: string; correctCount: number; items: PoolItemShaped[] };
type ZoneShaped = { key: string; label: string };
type ZoneItemShaped = { text: string };

function pickMotivation(isCorrect: boolean): string {
  const correct = ["Super gemacht!", "Klasse, weiter so!", "Stark getroffen!"];
  const wrong = ["Nicht aufgeben, das schaffst du!", "Kein Problem, weiter geht's!", "Kopf hoch — beim nächsten Mal klappt's!"];
  const pool = isCorrect ? correct : wrong;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

// ---------------------------------------------------------------------------
// Wissensfrage (Stationen 1 „Grundlagenfragen" und 6 „Zusammenhänge")
// ---------------------------------------------------------------------------

function WissensfrageQuestion({
  question,
  isLast,
  onNext,
  onSubmit,
}: {
  question: WissensfrageShaped;
  isLast: boolean;
  onNext: () => void;
  onSubmit: (optionTexts: string[], selectedIndices: number[]) => Promise<{ perOption: { index: number; isCorrect: boolean; feedback: string }[]; allCorrect: boolean }>;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<{ perOption: { index: number; isCorrect: boolean; feedback: string }[]; allCorrect: boolean; motivation: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMulti = question.selectCount !== 1;

  function toggle(index: number) {
    if (feedback) return;
    setSelected((current) => {
      const next = new Set(isMulti ? current : []);
      if (current.has(index) && isMulti) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function check() {
    setPending(true);
    setError(null);
    try {
      const result = await onSubmit(
        question.options.map((option) => option.text),
        [...selected],
      );
      setFeedback({ ...result, motivation: pickMotivation(result.allCorrect) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Antwort konnte nicht geprüft werden.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="stack">
      <div className="quiz-question">{question.prompt}</div>
      <p className="field-hint">
        {question.selectCount === 1 ? "Wähle genau eine Antwort." : `Wähle genau ${question.selectCount} Antworten.`}
      </p>
      <div className="quiz-options">
        {question.options.map((option) => {
          const optionFeedback = feedback?.perOption.find((entry) => entry.index === option.index);
          let className = "quiz-opt";
          if (optionFeedback) className += optionFeedback.isCorrect ? " is-correct" : " is-wrong";
          else if (selected.has(option.index)) className += " is-selected";
          return (
            <button
              key={option.index}
              type="button"
              className={className}
              disabled={feedback !== null}
              onClick={() => toggle(option.index)}
            >
              <span>{option.text}</span>
              {/* F-129: anders als die bestehenden MC-Typen (ein gemeinsames explanation-Feld)
                  trägt hier JEDE Option ihren eigenen Rückmeldetext, exakt wie im Referenz-Content. */}
              {optionFeedback && <span className="field-hint lernpfad-option-feedback">{optionFeedback.feedback}</span>}
            </button>
          );
        })}
      </div>
      {feedback ? (
        <>
          <p className={feedback.allCorrect ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Weiter" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          disabled={selected.size !== question.selectCount || pending}
          onClick={check}
        >
          Antwort prüfen
        </button>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

function WissensfragenStation({
  intro,
  questions,
  onSubmit,
  onStationComplete,
}: {
  intro: string;
  questions: WissensfrageShaped[];
  onSubmit: (questionIndex: number, optionTexts: string[], selectedIndices: number[]) => Promise<{ perOption: { index: number; isCorrect: boolean; feedback: string }[]; allCorrect: boolean }>;
  onStationComplete: () => void;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex]!;
  const isLast = questionIndex === questions.length - 1;

  return (
    <div className="stack">
      <p className="field-hint">{intro}</p>
      <p className="field-hint">
        Frage {questionIndex + 1} von {questions.length}
      </p>
      <WissensfrageQuestion
        key={questionIndex}
        question={question}
        isLast={isLast}
        onSubmit={(optionTexts, selectedIndices) => onSubmit(questionIndex, optionTexts, selectedIndices)}
        onNext={() => (isLast ? onStationComplete() : setQuestionIndex((current) => current + 1))}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pool-Auswahl (Stationen 2 „Struktur erkennen" und 5 „Maßnahmen-Wahl")
// ---------------------------------------------------------------------------

const POOL_TARGET_ID = "_lernpfad_target";
const POOL_SOURCE_ID = "_lernpfad_pool";

function PoolRoundStep({
  round,
  isLast,
  onSubmitItem,
  onRoundComplete,
}: {
  round: PoolRoundShaped;
  isLast: boolean;
  onSubmitItem: (itemText: string) => Promise<{ correct: boolean; feedback: string }>;
  onRoundComplete: () => void;
}) {
  const [placedCorrect, setPlacedCorrect] = useState<Set<string>>(new Set());
  const [lastFeedback, setLastFeedback] = useState<{ correct: boolean; feedback: string } | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const done = placedCorrect.size >= round.correctCount;

  async function handleDragEnd(event: DragEndEvent) {
    if (done || checking) return;
    const targetId = event.over ? String(event.over.id) : POOL_SOURCE_ID;
    if (targetId !== POOL_TARGET_ID) return;
    const text = String(event.active.id);
    setChecking(text);
    setError(null);
    try {
      const result = await onSubmitItem(text);
      setLastFeedback(result);
      if (result.correct) {
        setPlacedCorrect((current) => new Set(current).add(text));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Antwort konnte nicht geprüft werden.");
    } finally {
      setChecking(null);
    }
  }

  return (
    <div className="stack">
      {round.context && <p className="lernpfad-context">{round.context}</p>}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableZone id={POOL_SOURCE_ID} className="quadrant-pool">
          {round.items
            .filter((item) => !placedCorrect.has(item.text))
            .map((item) => (
              <DraggableTerm key={item.text} id={item.text} text={item.text} disabled={checking !== null || done} />
            ))}
        </DroppableZone>
        <DroppableZone id={POOL_TARGET_ID} label={`Richtig (${placedCorrect.size}/${round.correctCount})`} className="quadrant-zone">
          {round.items
            .filter((item) => placedCorrect.has(item.text))
            .map((item) => (
              <DraggableTerm key={item.text} id={item.text} text={item.text} disabled state="correct" />
            ))}
        </DroppableZone>
      </DndContext>
      {lastFeedback && <p className={lastFeedback.correct ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>{lastFeedback.feedback}</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {done && (
        <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onRoundComplete}>
          {isLast ? "Weiter" : "Nächste Runde"}
        </button>
      )}
    </div>
  );
}

function PoolStation({
  prompt,
  rounds,
  onSubmitItem,
  onStationComplete,
}: {
  prompt: string;
  rounds: PoolRoundShaped[];
  onSubmitItem: (roundIndex: number, itemText: string) => Promise<{ correct: boolean; feedback: string }>;
  onStationComplete: () => void;
}) {
  const [roundIndex, setRoundIndex] = useState(0);
  const isLast = roundIndex === rounds.length - 1;

  return (
    <div className="stack">
      <div className="quiz-question">{prompt}</div>
      {rounds.length > 1 && (
        <p className="field-hint">
          Runde {roundIndex + 1} von {rounds.length}
        </p>
      )}
      <PoolRoundStep
        key={roundIndex}
        round={rounds[roundIndex]!}
        isLast={isLast}
        onSubmitItem={(itemText) => onSubmitItem(roundIndex, itemText)}
        onRoundComplete={() => (isLast ? onStationComplete() : setRoundIndex((current) => current + 1))}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Zonen-Zuordnung (Station 3 „Ziele zuordnen")
// ---------------------------------------------------------------------------

const ZONE_POOL_ID = "_lernpfad_zone_pool";

function ZonenZuordnungStep({
  prompt,
  zones,
  items,
  onSubmitItem,
  onStationComplete,
}: {
  prompt: string;
  zones: ZoneShaped[];
  items: ZoneItemShaped[];
  onSubmitItem: (itemText: string, zoneKey: string) => Promise<{ correct: boolean; feedback: string }>;
  onStationComplete: () => void;
}) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const done = Object.keys(placements).length >= items.length;

  async function handleDragEnd(event: DragEndEvent) {
    if (checking) return;
    const targetId = event.over ? String(event.over.id) : ZONE_POOL_ID;
    if (targetId === ZONE_POOL_ID) return;
    const text = String(event.active.id);
    setChecking(text);
    setError(null);
    try {
      const result = await onSubmitItem(text, targetId);
      setLastFeedback(result.feedback);
      if (result.correct) {
        setPlacements((current) => ({ ...current, [text]: targetId }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Antwort konnte nicht geprüft werden.");
    } finally {
      setChecking(null);
    }
  }

  return (
    <div className="stack">
      <div className="quiz-question">{prompt}</div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableZone id={ZONE_POOL_ID} className="quadrant-pool">
          {items
            .filter((item) => !placements[item.text])
            .map((item) => (
              <DraggableTerm key={item.text} id={item.text} text={item.text} disabled={checking !== null} />
            ))}
        </DroppableZone>
        <div className="quadrant-grid">
          {zones.map((zone) => (
            <DroppableZone key={zone.key} id={zone.key} label={zone.label} className="quadrant-zone">
              {items
                .filter((item) => placements[item.text] === zone.key)
                .map((item) => (
                  <DraggableTerm key={item.text} id={item.text} text={item.text} disabled state="correct" />
                ))}
            </DroppableZone>
          ))}
        </div>
      </DndContext>
      {lastFeedback && <p className="field-hint">{lastFeedback}</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {done && (
        <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onStationComplete}>
          Weiter
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gepoolte Zonen-Zuordnung (Station 4 „Messbare Ziele zuordnen")
// ---------------------------------------------------------------------------

function GepoolteZuordnungStation({
  prompt,
  zones,
  kernRunden,
  extraRunden,
  onSubmitItem,
  onStationComplete,
}: {
  prompt: string;
  zones: ZoneShaped[];
  kernRunden: ZoneItemShaped[][];
  extraRunden: ZoneItemShaped[][];
  onSubmitItem: (itemText: string, zoneKey: string) => Promise<{ correct: boolean; feedback: string }>;
  onStationComplete: () => void;
}) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [usingExtra, setUsingExtra] = useState(false);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [checking, setChecking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const rounds = usingExtra ? extraRunden : kernRunden;
  const currentRoundItems = rounds[roundIndex] ?? [];
  const roundDone = currentRoundItems.length > 0 && currentRoundItems.every((item) => placements[item.text]);
  const isLastRound = roundIndex === rounds.length - 1;

  async function handleDragEnd(event: DragEndEvent) {
    if (checking) return;
    const targetId = event.over ? String(event.over.id) : ZONE_POOL_ID;
    if (targetId === ZONE_POOL_ID) return;
    const text = String(event.active.id);
    setChecking(text);
    setError(null);
    try {
      const result = await onSubmitItem(text, targetId);
      setLastFeedback(result.feedback);
      if (result.correct) {
        setPlacements((current) => ({ ...current, [text]: targetId }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Antwort konnte nicht geprüft werden.");
    } finally {
      setChecking(null);
    }
  }

  function nextRound() {
    if (isLastRound) {
      if (usingExtra || extraRunden.length === 0) {
        onStationComplete();
      }
      // Sonst: Angebot "Zwölf weitere üben" unten wird angezeigt.
    } else {
      setRoundIndex((current) => current + 1);
    }
  }

  return (
    <div className="stack">
      <div className="quiz-question">{prompt}</div>
      <p className="field-hint">
        {usingExtra ? "Zusatzrunde" : "Grunddurchlauf"} — Runde {roundIndex + 1} von {rounds.length}
      </p>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableZone id={ZONE_POOL_ID} className="quadrant-pool">
          {currentRoundItems
            .filter((item) => !placements[item.text])
            .map((item) => (
              <DraggableTerm key={item.text} id={item.text} text={item.text} disabled={checking !== null} />
            ))}
        </DroppableZone>
        <div className="quadrant-grid">
          {zones.map((zone) => (
            <DroppableZone key={zone.key} id={zone.key} label={zone.label} className="quadrant-zone">
              {Object.entries(placements)
                .filter(([, zoneKey]) => zoneKey === zone.key)
                .map(([text]) => (
                  <DraggableTerm key={text} id={text} text={text} disabled state="correct" />
                ))}
            </DroppableZone>
          ))}
        </div>
      </DndContext>
      {lastFeedback && <p className="field-hint">{lastFeedback}</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {roundDone && (
        <div className="list-row-actions">
          {!(isLastRound && (usingExtra || extraRunden.length === 0)) && (
            <button type="button" className="btn btn-primary" onClick={nextRound}>
              {isLastRound ? "Weiter" : "Nächste Runde"}
            </button>
          )}
          {isLastRound && !usingExtra && extraRunden.length > 0 && (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setUsingExtra(true);
                  setRoundIndex(0);
                }}
              >
                Zwölf weitere üben
              </button>
              <button type="button" className="btn btn-primary" onClick={onStationComplete}>
                Weiter: Maßnahmen
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sortieren (Station 7 „Wirkungsketten")
// ---------------------------------------------------------------------------

const SORTIEREN_POOL_ID = "_lernpfad_sortieren_pool";

function SortierenTask({
  prompt,
  items,
  isLast,
  onSubmit,
  onNext,
}: {
  prompt: string;
  items: PoolItemShaped[];
  isLast: boolean;
  onSubmit: (shuffledTexts: string[], orderedIndices: number[]) => Promise<{ results: boolean[]; correctCount: number; total: number }>;
  onNext: () => void;
}) {
  const [placements, setPlacements] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(items.map((item) => [item.index, null])),
  );
  const [feedback, setFeedback] = useState<{ results: boolean[]; correctCount: number; total: number; motivation: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    if (feedback) return;
    const itemIndex = Number(event.active.id);
    const targetId = event.over ? String(event.over.id) : SORTIEREN_POOL_ID;
    setPlacements((current) => ({ ...current, [itemIndex]: targetId === SORTIEREN_POOL_ID ? null : Number(targetId) }));
  }

  const allPlaced = items.every((item) => placements[item.index] !== null);

  async function check() {
    setPending(true);
    setError(null);
    try {
      const orderedIndices = items
        .slice()
        .sort((a, b) => placements[a.index]! - placements[b.index]!)
        .map((item) => item.index);
      const result = await onSubmit(
        items.map((item) => item.text),
        orderedIndices,
      );
      setFeedback({ ...result, motivation: pickMotivation(result.correctCount === result.total) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Antwort konnte nicht geprüft werden.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="stack">
      <div className="quiz-question">{prompt}</div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableZone id={SORTIEREN_POOL_ID} className="quadrant-pool">
          {items
            .filter((item) => placements[item.index] === null)
            .map((item) => (
              <DraggableTerm key={item.index} id={String(item.index)} text={item.text} disabled={feedback !== null} />
            ))}
        </DroppableZone>
        <div className="quadrant-grid">
          {items.map((_, position) => {
            const placedItem = items.find((item) => placements[item.index] === position);
            return (
              <DroppableZone key={position} id={String(position)} label={`${position + 1}.`} className="quadrant-zone">
                {placedItem && (
                  <DraggableTerm
                    id={String(placedItem.index)}
                    text={placedItem.text}
                    disabled={feedback !== null}
                    state={feedback ? (feedback.results[position] ? "correct" : "wrong") : undefined}
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
            {feedback.correctCount} von {feedback.total} an der richtigen Stelle.
          </p>
          <p className="field-hint">{feedback.motivation}</p>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={onNext}>
            {isLast ? "Weiter" : "Nächste Aufgabe"}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
          disabled={!allPlaced || pending}
          onClick={check}
        >
          Reihenfolge prüfen
        </button>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

function SortierenStation({
  intro,
  tasks,
  onSubmit,
  onStationComplete,
}: {
  intro: string;
  tasks: { prompt: string; items: PoolItemShaped[] }[];
  onSubmit: (taskIndex: number, shuffledTexts: string[], orderedIndices: number[]) => Promise<{ results: boolean[]; correctCount: number; total: number }>;
  onStationComplete: () => void;
}) {
  const [taskIndex, setTaskIndex] = useState(0);
  const isLast = taskIndex === tasks.length - 1;

  return (
    <div className="stack">
      <p className="field-hint">{intro}</p>
      <p className="field-hint">
        Aufgabe {taskIndex + 1} von {tasks.length}
      </p>
      <SortierenTask
        key={taskIndex}
        prompt={tasks[taskIndex]!.prompt}
        items={tasks[taskIndex]!.items}
        isLast={isLast}
        onSubmit={(shuffledTexts, orderedIndices) => onSubmit(taskIndex, shuffledTexts, orderedIndices)}
        onNext={() => (isLast ? onStationComplete() : setTaskIndex((current) => current + 1))}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Selbsteinschätzung (Abschluss)
// ---------------------------------------------------------------------------

function Selbsteinschaetzung({
  prompt,
  previous,
  onSubmit,
}: {
  prompt: string;
  previous: number | null;
  onSubmit: (rating: number) => Promise<void>;
}) {
  const [rating, setRating] = useState(previous ?? 5);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  if (done) {
    return (
      <div className="alert alert-success">
        <div>Danke! Deine Einschätzung ({rating}/10) wurde gespeichert — unabhängig von deinem Ergebnis im Lernpfad.</div>
      </div>
    );
  }

  return (
    <div className="stack">
      <p className="quiz-question">{prompt}</p>
      <input
        type="range"
        min={0}
        max={10}
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
        aria-label="Selbsteinschätzung von 0 bis 10"
      />
      <p className="field-hint">
        Deine Auswahl: <b>{rating}</b> von 10 (0 = gar nicht sicher, 5 = teils/teils, 10 = sehr sicher)
      </p>
      <button
        type="button"
        className="btn btn-primary"
        style={{ alignSelf: "flex-start" }}
        disabled={pending}
        onClick={async () => {
          setPending(true);
          await onSubmit(rating);
          setPending(false);
          setDone(true);
        }}
      >
        Ergebnis ansehen
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hauptkomponente
// ---------------------------------------------------------------------------

const STATION_LABELS = [
  "Grundlagen",
  "Struktur erkennen",
  "Ziele zuordnen",
  "Messbare Ziele zuordnen",
  "Maßnahmen wählen",
  "Zusammenhänge",
  "Wirkungsketten",
  "Selbsteinschätzung",
] as const;

export function InstrumentLernpfad({
  kursId,
  instrumentType,
  onClose,
}: {
  kursId: string;
  instrumentType: string;
  onClose: () => void;
}) {
  const utils = trpc.useUtils();
  const data = trpc.instrumentLernpfad.get.useQuery({ kursId, instrumentType });
  const [stationIndex, setStationIndex] = useState(0);

  const submitWissensfrage = trpc.instrumentLernpfad.submitWissensfrage.useMutation();
  const submitPoolItem = trpc.instrumentLernpfad.submitPoolItem.useMutation();
  const submitZoneItem = trpc.instrumentLernpfad.submitZoneItem.useMutation();
  const submitSortieren = trpc.instrumentLernpfad.submitSortieren.useMutation();
  const submitSelbsteinschaetzung = trpc.instrumentLernpfad.submitSelbsteinschaetzung.useMutation({
    onSuccess: () => utils.instrumentLernpfad.get.invalidate({ kursId, instrumentType }),
  });

  if (data.isLoading) {
    return <p>Lädt…</p>;
  }

  if (data.error) {
    return (
      <div className="alert alert-info">
        <InfoIcon />
        <div>{data.error.message}</div>
      </div>
    );
  }

  const lernpfad = data.data;
  if (!lernpfad) {
    return null;
  }

  const lernpfadId = lernpfad.id;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>{lernpfad.title}</h2>
        <button type="button" className="link-muted-btn" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      {/* F-129: "Ab Station 2 sehe ich oberhalb meiner BSC dauerhaft die Vision" — hier bewusst
          bereits ab Station 1 sichtbar (einfacher als eine Sonderregel nur für Station 1). */}
      <div className="lernpfad-narrative">
        <p className="field-hint">{lernpfad.fallbeispielIntro}</p>
        <p className="lernpfad-vision">„{lernpfad.vision}"</p>
      </div>
      <p className="field-hint">
        Station {Math.min(stationIndex + 1, STATION_LABELS.length)} von {STATION_LABELS.length}: {STATION_LABELS[stationIndex]}
      </p>

      {stationIndex === 0 && (
        <WissensfragenStation
          intro={lernpfad.grundlagenfragen.intro}
          questions={lernpfad.grundlagenfragen.questions}
          onSubmit={(questionIndex, optionTexts, selectedIndices) =>
            submitWissensfrage.mutateAsync({ lernpfadId, station: "grundlagenfragen", questionIndex, optionTexts, selectedIndices })
          }
          onStationComplete={() => setStationIndex(1)}
        />
      )}
      {stationIndex === 1 && (
        <PoolStation
          prompt={lernpfad.strukturErkennen.prompt}
          rounds={[lernpfad.strukturErkennen.round]}
          onSubmitItem={(_roundIndex, itemText) =>
            submitPoolItem.mutateAsync({ lernpfadId, station: "strukturErkennen", roundIndex: 0, itemText })
          }
          onStationComplete={() => setStationIndex(2)}
        />
      )}
      {stationIndex === 2 && (
        <ZonenZuordnungStep
          prompt={lernpfad.zieleZuordnen.prompt}
          zones={lernpfad.zieleZuordnen.zones}
          items={lernpfad.zieleZuordnen.items}
          onSubmitItem={(itemText, zoneKey) =>
            submitZoneItem.mutateAsync({ lernpfadId, station: "zieleZuordnen", itemText, zoneKey })
          }
          onStationComplete={() => setStationIndex(3)}
        />
      )}
      {stationIndex === 3 && (
        <GepoolteZuordnungStation
          prompt={lernpfad.messbareZieleZuordnen.prompt}
          zones={lernpfad.messbareZieleZuordnen.zones}
          kernRunden={lernpfad.messbareZieleZuordnen.kernRunden}
          extraRunden={lernpfad.messbareZieleZuordnen.extraRunden}
          onSubmitItem={(itemText, zoneKey) =>
            submitZoneItem.mutateAsync({ lernpfadId, station: "messbareZieleZuordnen", itemText, zoneKey })
          }
          onStationComplete={() => setStationIndex(4)}
        />
      )}
      {stationIndex === 4 && (
        <PoolStation
          prompt={lernpfad.massnahmenWahl.prompt}
          rounds={lernpfad.massnahmenWahl.rounds}
          onSubmitItem={(roundIndex, itemText) =>
            submitPoolItem.mutateAsync({ lernpfadId, station: "massnahmenWahl", roundIndex, itemText })
          }
          onStationComplete={() => setStationIndex(5)}
        />
      )}
      {stationIndex === 5 && (
        <WissensfragenStation
          intro={lernpfad.zusammenhaenge.intro}
          questions={lernpfad.zusammenhaenge.questions}
          onSubmit={(questionIndex, optionTexts, selectedIndices) =>
            submitWissensfrage.mutateAsync({ lernpfadId, station: "zusammenhaenge", questionIndex, optionTexts, selectedIndices })
          }
          onStationComplete={() => setStationIndex(6)}
        />
      )}
      {stationIndex === 6 && (
        <SortierenStation
          intro={lernpfad.wirkungsketten.intro}
          tasks={lernpfad.wirkungsketten.tasks}
          onSubmit={(taskIndex, shuffledTexts, orderedIndices) =>
            submitSortieren.mutateAsync({ lernpfadId, taskIndex, shuffledTexts, orderedIndices })
          }
          onStationComplete={() => setStationIndex(7)}
        />
      )}
      {stationIndex === 7 && (
        <Selbsteinschaetzung
          prompt={lernpfad.selbsteinschaetzungPrompt}
          previous={lernpfad.previousSelbsteinschaetzung}
          onSubmit={async (rating) => {
            await submitSelbsteinschaetzung.mutateAsync({ lernpfadId, rating });
          }}
        />
      )}
    </div>
  );
}
