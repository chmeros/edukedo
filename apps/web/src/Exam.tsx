import { useEffect, useState } from "react";
import { ContentActions } from "./ContentActions";
import { ErrorMessage } from "./ErrorMessage";
import { DangerIcon, InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

type ExamItem = {
  id: string;
  prompt: string;
  explanation: string;
  fachgebietTitle: string;
  parts: { prompt: string; points: number; bloom?: string | null }[];
};

const DURATION_PRESETS_MINUTES = [30, 60, 90, 600];

function formatRemaining(seconds: number): string {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const rest = clamped % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

/**
 * Ein-Fallaufgabe-Schritt: eigener lokaler Zustand für Antwortentwürfe/Selbsteinschätzung,
 * per `key={item.id}` im Elternteil (Exam) bei jedem Fallaufgaben-Wechsel neu gemountet —
 * analog zu den `key={current.id}`-Quiz-Steps in QuizSteps.tsx.
 */
function ExamFallaufgabeStep({
  item,
  position,
  total,
  onSubmit,
  isSubmitting,
  error,
}: {
  item: ExamItem;
  position: number;
  total: number;
  onSubmit: (parts: { answerText: string; selfAssessedPoints: number }[]) => void;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState(() => item.parts.map(() => ""));
  const [points, setPoints] = useState(() => item.parts.map(() => 0));

  const totalPoints = points.reduce((sum, value) => sum + value, 0);
  const maxPoints = item.parts.reduce((sum, part) => sum + part.points, 0);

  return (
    <div className="stack">
      <span className="quiz-progress">
        Fallaufgabe {position + 1} von {total} · {item.fachgebietTitle}
      </span>
      <div className="exam-situation">
        <span className="flip-kicker">Ausgangssituation</span>
        <p>{item.prompt}</p>
      </div>
      <ContentActions contentItemId={item.id} />
      {item.parts.map((part, index) => (
        <div key={index} className="exam-part">
          <p className="exam-part-prompt">
            <b>Teilaufgabe {index + 1}</b> ({part.points} Punkte
            {part.bloom ? `, bloom: ${part.bloom}` : ""}): {part.prompt}
          </p>
          <textarea
            className="input exam-answer-textarea"
            placeholder="Deine Antwort…"
            value={answers[index]}
            onChange={(event) =>
              setAnswers((current) => current.map((value, i) => (i === index ? event.target.value : value)))
            }
            rows={3}
          />
          {revealed && (
            <div className="field exam-self-assessment">
              <label htmlFor={`points-${index}`}>Selbst eingeschätzte Punktzahl (0–{part.points})</label>
              <input
                id={`points-${index}`}
                className="input"
                type="number"
                min={0}
                max={part.points}
                value={points[index]}
                onChange={(event) => {
                  const value = Math.max(0, Math.min(part.points, Number(event.target.value) || 0));
                  setPoints((current) => current.map((existing, i) => (i === index ? value : existing)));
                }}
              />
            </div>
          )}
        </div>
      ))}
      {!revealed && (
        <button type="button" className="btn btn-ghost" onClick={() => setRevealed(true)}>
          Musterlösungshinweise anzeigen
        </button>
      )}
      {revealed && (
        <>
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              <b>Musterlösungshinweise:</b> {item.explanation}
            </div>
          </div>
          <div className="due-count">
            Selbst eingeschätzt: <b>{totalPoints}</b> von {maxPoints} Punkten
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={() => onSubmit(answers.map((answerText, index) => ({ answerText, selfAssessedPoints: points[index]! })))}
          >
            {position + 1 < total ? "Weiter zur nächsten Fallaufgabe" : "Prüfung abschließen"}
          </button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      )}
    </div>
  );
}

export function Exam({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [items, setItems] = useState<ExamItem[]>([]);
  const [index, setIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<{ achievedPoints: number; maxPoints: number; score: number } | null>(null);

  const startExam = trpc.exam.start.useMutation({
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setItems(data.items);
      setIndex(0);
      setDeadline(Date.now() + durationMinutes * 60_000);
      setResult(null);
    },
  });
  // Code-Review-Fund (22.09.2026, siehe Architekturplanung Abschnitt 13): exam.submitAnswer
  // schreibt bei einer mehrheitlich erreichten Punktzahl eine learning_event-Zeile (siehe
  // exam.ts) — genau wie quiz.submit*/progress.submitReview muss das die Lernserie und den
  // Fortschritt/die "Weiter lernen"-Vorschläge mit aktualisieren, sonst bleiben
  // StreakReminderBanner/Progress.tsx bis zum nächsten Reload auf dem alten Stand. Mascot-Food/
  // Credits bleiben bewusst unberührt — Fallaufgaben laufen nicht über recordQuizAttempt.
  const submitAnswer = trpc.exam.submitAnswer.useMutation({
    onSuccess: () => {
      utils.gamification.streakStatus.invalidate();
      utils.progress.overview.invalidate({ kursId });
      utils.progress.suggestions.invalidate({ kursId });
    },
  });
  const finishExam = trpc.exam.finish.useMutation({
    onSuccess: (data) => setResult(data),
  });

  useEffect(() => {
    if (deadline === null || result !== null) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [deadline, result]);

  function reset() {
    setSessionId(null);
    setItems([]);
    setIndex(0);
    setDeadline(null);
    setResult(null);
  }

  function handleItemSubmit(parts: { answerText: string; selfAssessedPoints: number }[]) {
    const current = items[index]!;
    submitAnswer.mutate(
      { sessionId: sessionId!, contentItemId: current.id, parts },
      {
        onSuccess: () => {
          if (index + 1 < items.length) {
            setIndex((i) => i + 1);
          } else {
            finishExam.mutate({ sessionId: sessionId! });
          }
        },
      },
    );
  }

  if (result) {
    return (
      <div className="stack">
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            Prüfung abgeschlossen — {result.achievedPoints} von {result.maxPoints} Punkten ({result.score} %)
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={reset}>
          Neue Prüfung starten
        </button>
      </div>
    );
  }

  if (sessionId && items.length > 0) {
    const remainingSeconds = deadline ? Math.round((deadline - now) / 1000) : 0;
    const timeIsUp = remainingSeconds <= 0;
    return (
      <div className="stack">
        <div className={timeIsUp ? "exam-timer is-expired" : "exam-timer"}>⏱ {formatRemaining(remainingSeconds)}</div>
        {timeIsUp && (
          <div className="alert alert-danger">
            <DangerIcon />
            <div>Die gewählte Zeit ist abgelaufen — du kannst trotzdem in Ruhe weitermachen, das ist ein Übungswerkzeug.</div>
          </div>
        )}
        <ExamFallaufgabeStep
          key={items[index]!.id}
          item={items[index]!}
          position={index}
          total={items.length}
          onSubmit={handleItemSubmit}
          isSubmitting={submitAnswer.isPending || finishExam.isPending}
          // Code-Review-Fund (22.09.2026, siehe Architekturplanung Abschnitt 13): weder
          // submitAnswer noch finishExam zeigten bisher eine Fehlermeldung — der Button wurde
          // nach einem Fehlschlag (Netzwerkfehler, abgelaufene Session) stillschweigend wieder
          // aktiv. Beide Fehler landen hier zusammen: finishExam schlägt nur bei der letzten
          // Fallaufgabe zu (nach einem bereits erfolgreichen submitAnswer), daher können beide
          // nie gleichzeitig gesetzt sein.
          error={submitAnswer.error?.message ?? finishExam.error?.message ?? null}
        />
      </div>
    );
  }

  return (
    <div className="stack">
      <p>
        Situationsbezogene Fallaufgaben über mehrere Handlungsbereiche hinweg, wie in der schriftlichen IHK-Prüfung —
        wähle eine Übungsdauer und starte, sobald du bereit bist.
      </p>
      <div className="field">
        <label htmlFor="exam-duration">Übungsdauer</label>
        <div className="segmented">
          {DURATION_PRESETS_MINUTES.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={durationMinutes === minutes ? "is-active" : ""}
              onClick={() => setDurationMinutes(minutes)}
            >
              {minutes >= 60 ? `${minutes / 60} Std.` : `${minutes} Min.`}
            </button>
          ))}
        </div>
      </div>
      {startExam.error && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>{startExam.error.message}</div>
        </div>
      )}
      <button
        type="button"
        className="btn btn-primary btn-block"
        disabled={startExam.isPending}
        onClick={() => startExam.mutate({ kursId })}
      >
        Prüfungssimulation starten
      </button>
    </div>
  );
}
