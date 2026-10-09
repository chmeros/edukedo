import { useCallback, useEffect, useRef, useState } from "react";
import { ContentActions } from "./ContentActions";
import { useCalmMode } from "./displayPrefs";
import { ErrorMessage } from "./ErrorMessage";
import { clearExamDraft, readExamDraft, writeExamDraft, type ExamStepDraft } from "./examDraft";
import { FachbegriffText } from "./Fachbegriffe";
import { DangerIcon, HamsterWheelIcon, InfoIcon, SuccessIcon } from "./Icons";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

const AI_GRADING_STATUS_LABELS: Record<string, string> = {
  queued: "In der Warteschlange… (kann je nach Auslastung einige Minuten dauern)",
  processing: "Wird bewertet… (kann einige Minuten dauern, bei erlaubten Benachrichtigungen melden wir uns)",
  completed: "Bewertung vorliegend",
  failed: "Bewertung fehlgeschlagen",
};

const AI_GRADING_POLL_INTERVAL_MS = 2000;

/**
 * F-70 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): KI-Bewertung für
 * eine bereits eingereichte Fallaufgabe — löst die frühere Entscheidung "bewusst kein
 * Dauer-Polling, sondern ein manuelles 'Status aktualisieren'" ab: die Bewertung soll ohne
 * Zutun erscheinen, sobald sie fertig ist. `refetchInterval` pollt daher automatisch, SOLANGE
 * der letzte bekannte Status "queued"/"processing" ist, und schaltet sich danach selbst ab
 * (Rückgabewert `false`) — kein Dauer-Polling über das Ende der Bewertung hinaus. Der frühere
 * Grund für den manuellen Weg (Job läuft im Hintergrund, Person kann weiterlernen) bleibt
 * unberührt: der Hinweis mit dem laufenden Punktehamster ersetzt nur den Klick durchs erneute
 * Öffnen dieses Tabs.
 */
function AiGradingRow({ sessionId, contentItemId, aiGradingEnabled }: { sessionId: string; contentItemId: string; aiGradingEnabled: boolean }) {
  const result = trpc.ai.myGradingResult.useQuery(
    { sessionId, contentItemId },
    {
      enabled: aiGradingEnabled,
      refetchInterval: (data) => (data?.status === "queued" || data?.status === "processing" ? AI_GRADING_POLL_INTERVAL_MS : false),
    },
  );
  const requestGrading = trpc.ai.requestGrading.useMutation({
    onSuccess: () => result.refetch(),
  });

  if (!aiGradingEnabled) {
    return null;
  }

  const status = result.data?.status;

  return (
    <div className="stack">
      {(!status || status === "failed") && (
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ alignSelf: "flex-start" }}
          disabled={requestGrading.isPending}
          onClick={() => requestGrading.mutate({ sessionId, contentItemId })}
        >
          KI-Bewertung anfordern
        </button>
      )}
      {requestGrading.error && <ErrorMessage>{requestGrading.error.message}</ErrorMessage>}
      {status && status !== "completed" && status !== "failed" && (
        <div className="exam-ai-grading-progress">
          <HamsterWheelIcon size={26} />
          <span className="field-hint">{AI_GRADING_STATUS_LABELS[status] ?? status}</span>
        </div>
      )}
      {status === "failed" && result.data?.errorMessage && <ErrorMessage>{result.data.errorMessage}</ErrorMessage>}
      {status === "completed" && result.data?.parts && (
        <div className="alert alert-info">
          <InfoIcon />
          <div className="stack">
            <b>KI-Bewertung (unverbindliche Lernhilfe, kein Anspruch auf offizielle Korrektheit):</b>
            {result.data.parts.map((part, index) => (
              <div key={index} className="exam-ai-grading-part">
                <p className="exam-ai-grading-part-heading">
                  <b>Teilaufgabe {index + 1}:</b> {part.aiPoints} von {part.maxPoints} Punkten (KI-Vorschlag) · Deine
                  Selbsteinschätzung: {part.selfAssessedPoints} von {part.maxPoints} Punkten
                </p>
                <p className="exam-ai-grading-answer">
                  <b>Deine Antwort:</b> {part.answerText || "(keine Antwort eingereicht)"}
                </p>
                <p>{part.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type ExamItem = {
  id: string;
  prompt: string;
  explanation: string;
  fachgebietTitle: string;
  parts: { prompt: string; points: number; bloom?: string | null }[];
};

const DURATION_PRESETS_MINUTES = [30, 60, 90, 600];

/** Review UXT-B-10: deutsche Schreibweise mit Komma („1,5 Std.“), nicht „1.5 Std.“. */
function formatDuration(minutes: number): string {
  return minutes >= 60 ? `${(minutes / 60).toLocaleString("de-DE")} Std.` : `${minutes} Min.`;
}

function formatRemaining(seconds: number): string {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const rest = clamped % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

/**
 * Ausgangssituation einer Fallaufgabe: Zeilenumbrüche bleiben erhalten (Aufzählungen), ```-Codeblöcke
 * erscheinen als <pre>, und Absätze aus mehreren "a | b | c"-Zeilen (Tabellen als Klartext) werden in
 * Festbreitenschrift gesetzt, damit die mit Leerzeichen ausgerichteten Spalten fluchten — ein reines
 * <p> hätte alles zu einer Zeile zusammengefasst (bei den Fachinformatiker-Kursen mit Code/SQL/
 * Tabellen unleserlich).
 */
function SituationText({ text }: { text: string }) {
  const segments = text.split(/```[^\n]*\n([\s\S]*?)```/g);
  const blocks = segments.flatMap((segment, index) =>
    index % 2 === 1
      ? [{ kind: "code" as const, content: segment.replace(/\n$/, "") }]
      : segment
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph) => ({
            kind: paragraph.split("\n").filter((line) => line.includes(" | ")).length >= 2 ? ("code" as const) : ("text" as const),
            content: paragraph,
          })),
  );
  return (
    <>
      {blocks.map((block, index) =>
        block.kind === "code" ? (
          <pre key={index} className="exam-situation-code">
            <code>{block.content}</code>
          </pre>
        ) : (
          <p key={index} className="exam-situation-text">
            {block.content}
          </p>
        ),
      )}
    </>
  );
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
  initialDraft,
  onDraftChange,
}: {
  item: ExamItem;
  position: number;
  total: number;
  onSubmit: (parts: { answerText: string; selfAssessedPoints: number }[]) => void;
  isSubmitting: boolean;
  error: string | null;
  /** Review WEB-10: gesicherter Stand dieser Aufgabe (nach Neuladen oder Tabwechsel). */
  initialDraft?: ExamStepDraft;
  onDraftChange: (draft: ExamStepDraft) => void;
}) {
  // F-133 (Nutzer-Vorgabe 26.09.2026, siehe Architekturplanung Abschnitt 13): "abgeben" und
  // "Musterlösungshinweise anzeigen" waren bisher ein einziger Zustand (`revealed`) hinter einem
  // Button, der wie ein optionales Hinweis-Angebot aussah, aber tatsächlich zwingend war, um
  // überhaupt weiterzukommen (Selbsteinschätzung + Weiter/Abschließen-Button erschienen nur nach
  // diesem Klick). Das zwang zudem dazu, die Musterlösung zu sehen, bevor man abgeben konnte —
  // in einer Prüfungssimulation nicht gewünscht. Jetzt getrennt: `submitted` schaltet
  // Selbsteinschätzung + Weiter/Abschließen frei (klar als "Antworten abgeben" beschriftet),
  // `hintsShown` zeigt unabhängig davon optional die Musterlösungshinweise.
  const [submitted, setSubmitted] = useState(initialDraft?.submitted ?? false);
  const [hintsShown, setHintsShown] = useState(false);
  const [answers, setAnswers] = useState(() => (initialDraft?.answers.length === item.parts.length ? initialDraft.answers : item.parts.map(() => "")));
  const [points, setPoints] = useState(() => (initialDraft?.points.length === item.parts.length ? initialDraft.points : item.parts.map(() => 0)));
  useEffect(() => {
    onDraftChange({ answers, points, submitted });
    // `onDraftChange` ist im Elternteil stabil; der Entwurf soll nur bei Änderungen der Eingaben gesichert werden.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, points, submitted]);

  const totalPoints = points.reduce((sum, value) => sum + value, 0);
  const maxPoints = item.parts.reduce((sum, part) => sum + part.points, 0);

  return (
    <div className="stack">
      <span className="quiz-progress">
        Fallaufgabe {position + 1} von {total} · {item.fachgebietTitle}
      </span>
      <div className="exam-situation">
        <span className="flip-kicker">Ausgangssituation</span>
        <SituationText text={item.prompt} />
      </div>
      <ContentActions contentItemId={item.id} />
      {item.parts.map((part, index) => (
        <div key={index} className="exam-part">
          <p className="exam-part-prompt">
            {/* F-149: die Bloom-Stufe ist ein internes Didaktik-Label der Aufgabenautor:innen und gehört in
                keiner echten Prüfung zur Aufgabenstellung — sie wird bewusst nicht angezeigt. */}
            <b>Teilaufgabe {index + 1}</b> ({part.points} Punkte): {part.prompt}
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
          {submitted && (
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
      {!submitted && (
        <button type="button" className="btn btn-primary" onClick={() => setSubmitted(true)}>
          Antworten abgeben
        </button>
      )}
      {submitted && (
        <>
          {!hintsShown && (
            <button type="button" className="btn btn-ghost" onClick={() => setHintsShown(true)}>
              Musterlösungshinweise anzeigen
            </button>
          )}
          {hintsShown && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                <b>Musterlösungshinweise:</b> <FachbegriffText text={item.explanation} aktiv />
              </div>
            </div>
          )}
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

const TIMER_HIDDEN_STORAGE_KEY = "edukedo.examTimerHidden";

/** Eigene Wahl der Person (true/false) oder null, wenn sie noch nichts gewählt hat. */
function readTimerChoice(): boolean | null {
  try {
    const stored = localStorage.getItem(TIMER_HIDDEN_STORAGE_KEY);
    return stored === null ? null : stored === "1";
  } catch {
    return null;
  }
}

export function Exam({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery();
  const [durationMinutes, setDurationMinutes] = useState(60);
  // F-149: Prüfungsbereiche der echten Abschlussprüfung (leer bei Kursen ohne Angabe → freie Mischprüfung).
  // `areaKey`: undefined = Standard (erster Bereich), "mix" = freie Mischprüfung.
  const areas = trpc.exam.areas.useQuery({ kursId });
  const [areaKey, setAreaKey] = useState<string | undefined>(undefined);
  // F-151: der Countdown lässt sich ausblenden (Prüfungsangst, Nutzer-Feedback vom 05.10.2026); die Zeit läuft
  // weiter, die Einstellung bleibt im Browser gespeichert.
  // F-155: ohne eigene Wahl blendet der Ruhige Modus den Countdown standardmäßig aus.
  const calmMode = useCalmMode();
  const [timerChoice, setTimerChoice] = useState<boolean | null>(readTimerChoice);
  const timerHidden = timerChoice ?? calmMode;
  const [confirmAbort, setConfirmAbort] = useState(false);
  function toggleTimerHidden() {
    const next = !timerHidden;
    setTimerChoice(next);
    try {
      localStorage.setItem(TIMER_HIDDEN_STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Speichern ist nur eine Komfortfunktion.
    }
  }
  const areaList = areas.data ?? [];
  const selectedArea = areaKey === "mix" ? undefined : (areaList.find((area) => area.key === areaKey) ?? areaList[0]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [items, setItems] = useState<ExamItem[]>([]);
  const [index, setIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<{ achievedPoints: number; maxPoints: number; score: number } | null>(null);

  // Review WEB-10: gesicherter Stand einer unterbrochenen Sitzung ("Prüfung fortsetzen") und laufende Sicherung.
  const [saved, setSaved] = useState(() => readExamDraft(kursId));
  const stepsRef = useRef<Record<string, ExamStepDraft>>({});
  const laufRef = useRef<{ sessionId: string | null; items: ExamItem[]; index: number; deadline: number | null }>({
    sessionId: null,
    items: [],
    index: 0,
    deadline: null,
  });
  const sichern = useCallback(() => {
    const lauf = laufRef.current;
    if (!lauf.sessionId || lauf.items.length === 0) return;
    writeExamDraft({ kursId, sessionId: lauf.sessionId, items: lauf.items, index: lauf.index, deadline: lauf.deadline, steps: stepsRef.current });
  }, [kursId]);
  const onStepDraft = useCallback(
    (itemId: string, draft: ExamStepDraft) => {
      stepsRef.current[itemId] = draft;
      sichern();
    },
    [sichern],
  );

  const startExam = trpc.exam.start.useMutation({
    onSuccess: (data) => {
      stepsRef.current = {};
      setSaved(null);
      setSessionId(data.sessionId);
      setItems(data.items);
      setIndex(0);
      setDeadline(Date.now() + (data.durationMinutes ?? durationMinutes) * 60_000);
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
    onSuccess: (data) => {
      clearExamDraft();
      setResult(data);
    },
  });

  useEffect(() => {
    if (deadline === null || result !== null) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [deadline, result]);

  // Review WEB-10: Während einer laufenden Sitzung warnt der Browser vor dem Neuladen oder Schließen der Seite (Antworten und
  // Frist liegen nur im Arbeitsspeicher dieser Seite).
  const sitzungLaeuft = sessionId !== null && items.length > 0 && result === null;
  laufRef.current = { sessionId, items, index, deadline };
  useEffect(() => {
    if (sitzungLaeuft) sichern();
  }, [sitzungLaeuft, sessionId, items, index, deadline, sichern]);
  useEffect(() => {
    if (!sitzungLaeuft) return;
    const warnen = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnen);
    return () => window.removeEventListener("beforeunload", warnen);
  }, [sitzungLaeuft]);

  function reset() {
    clearExamDraft();
    stepsRef.current = {};
    setSessionId(null);
    setItems([]);
    setIndex(0);
    setDeadline(null);
    setResult(null);
    setConfirmAbort(false);
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
            Prüfung abgeschlossen — Selbsteinschätzung: {result.achievedPoints} von {result.maxPoints} Punkten (
            {result.score} %). Diese Punktzahl beruht auf deiner eigenen Einschätzung je Teilaufgabe, nicht auf einer
            objektiven Korrektur.
          </div>
        </div>
        {sessionId &&
          (me.data?.isPremiumActive ? (
            <div className="stack">
              <h3>KI-Bewertung deiner Fallaufgaben</h3>
              {items.map((item) => (
                <div key={item.id} className="exam-part">
                  <p className="exam-part-prompt">{item.prompt.slice(0, 120)}{item.prompt.length > 120 ? "…" : ""}</p>
                  <AiGradingRow sessionId={sessionId} contentItemId={item.id} aiGradingEnabled={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                <b>Fortgeschritten:</b> Mit einem aktiven Fortgeschritten-Status bewertet eine KI jede deiner
                Fallaufgaben-Antworten einzeln mit Punktvorschlag und ausführlichem Feedback, statt dich nur
                auf deine Selbsteinschätzung zu verlassen. Freischaltbar im Kontomenü oben rechts unter
                „Einstellungen".
              </div>
            </div>
          ))}
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
        <div className="rate-row">
          {timerHidden ? (
            <span className="field-hint">Timer ausgeblendet — die Zeit läuft im Hintergrund weiter.</span>
          ) : (
            <div className={timeIsUp ? "exam-timer is-expired" : "exam-timer"}>⏱ {formatRemaining(remainingSeconds)}</div>
          )}
          <button type="button" className="btn btn-ghost btn-sm" aria-pressed={timerHidden} onClick={toggleTimerHidden}>
            {timerHidden ? "Timer einblenden" : "Timer ausblenden"}
          </button>
        </div>
        {timeIsUp && (
          <div className="alert alert-danger">
            <DangerIcon />
            <div>Die gewählte Zeit ist abgelaufen — du kannst trotzdem in Ruhe weitermachen, das ist ein Übungswerkzeug.</div>
          </div>
        )}
        {confirmAbort ? (
          <div className="alert alert-info">
            <InfoIcon />
            <div className="stack">
              <div>
                Prüfung beenden? Bereits abgegebene Fallaufgaben bleiben gespeichert, die aktuelle Aufgabe und alle
                weiteren werden nicht gewertet. Du kannst jederzeit eine neue Prüfung starten.
              </div>
              <div className="alert-actions">
                <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
                  Prüfung beenden
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmAbort(false)}>
                  Weitermachen
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" className="link-muted-btn" style={{ alignSelf: "flex-start" }} onClick={() => setConfirmAbort(true)}>
            Prüfung beenden
          </button>
        )}
        <ExamFallaufgabeStep
          key={items[index]!.id}
          item={items[index]!}
          position={index}
          total={items.length}
          onSubmit={handleItemSubmit}
          isSubmitting={submitAnswer.isPending || finishExam.isPending}
          initialDraft={stepsRef.current[items[index]!.id]}
          onDraftChange={(draft) => onStepDraft(items[index]!.id, draft)}
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

  function resume(draft: NonNullable<typeof saved>) {
    stepsRef.current = draft.steps ?? {};
    setSessionId(draft.sessionId);
    setItems(draft.items as ExamItem[]);
    setIndex(Math.min(draft.index, draft.items.length - 1));
    setDeadline(draft.deadline);
    setResult(null);
    setSaved(null);
  }

  return (
    <div className="stack">
      {saved && (
        <div className="alert alert-info">
          <InfoIcon />
          <div className="stack">
            <div>
              <b>Unterbrochene Prüfung:</b> Du hast eine Prüfungssimulation mit {saved.items.length} Fallaufgaben begonnen (bei Aufgabe{" "}
              {Math.min(saved.index + 1, saved.items.length)}). Deine noch nicht abgegebenen Antworten sind auf diesem Gerät gesichert.
            </div>
            <div className="alert-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => resume(saved)}>
                Prüfung fortsetzen
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  clearExamDraft();
                  setSaved(null);
                }}
              >
                Verwerfen
              </button>
            </div>
          </div>
        </div>
      )}
      {areaList.length > 0 ? (
        <>
          <p>
            Die schriftliche Abschlussprüfung besteht aus mehreren Prüfungsbereichen mit vorgeschriebener Dauer. Übe
            einen davon unter echten Zeitbedingungen — oder mische frei, wenn du dich nicht festlegen möchtest.
          </p>
          <div className="field">
            <span id="exam-area-label">Prüfungsbereich</span>
            <div className="tile-grid tile-grid-sm" role="group" aria-labelledby="exam-area-label">
              {areaList.map((area) => (
                <Tile
                  key={area.key}
                  size="sm"
                  title={area.title}
                  meta={`${area.part} · ${area.minutes} Min.`}
                  active={selectedArea?.key === area.key}
                  aria-pressed={selectedArea?.key === area.key}
                  onClick={() => setAreaKey(area.key)}
                />
              ))}
              <Tile
                size="sm"
                title="Gemischte Übung"
                meta="Alle Fachgebiete · freie Dauer"
                active={selectedArea === undefined}
                aria-pressed={selectedArea === undefined}
                onClick={() => setAreaKey("mix")}
              />
            </div>
          </div>
          <p className="field-hint">
            Die Aufgaben stammen aus den zum Prüfungsbereich passenden Fachgebieten. Diese Zuordnung ist eine
            Lernhilfe dieser Plattform, keine amtliche Aufgabenliste.
          </p>
        </>
      ) : (
        <p>
          Situationsbezogene Fallaufgaben über mehrere Handlungsbereiche hinweg, wie in der schriftlichen IHK-Prüfung —
          wähle eine Übungsdauer und starte, sobald du bereit bist.
        </p>
      )}
      {selectedArea ? (
        <p>
          Vorgeschriebene Dauer: <b>{selectedArea.minutes} Minuten</b>
        </p>
      ) : (
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
                {formatDuration(minutes)}
              </button>
            ))}
          </div>
          <span className="field-hint">Die Übungsdauer ist frei wählbar. 10 Std. entsprechen der Gesamtdauer der schriftlichen Fachwirt-Prüfung (600 Minuten).</span>
        </div>
      )}
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
        onClick={() => startExam.mutate({ kursId, pruefungsbereichKey: selectedArea?.key })}
      >
        Prüfungssimulation starten
      </button>
    </div>
  );
}
