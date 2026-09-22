import { useEffect, useRef, useState } from "react";
import type { OfflineQuizRound } from "./offlineQuiz";
import { createOfflineQuizMutations, DEFAULT_QUIZ_ROUND_SIZE, loadOfflineQuizRound } from "./offlineQuiz";
import { InfoIcon, SuccessIcon } from "./Icons";
import { QuizCountControl } from "./QuizCountControl";
import {
  BlanksSelectionStep,
  BlanksStep,
  KurzantwortStep,
  MatchingStep,
  McMultiStep,
  MultipleChoiceStep,
  QuadrantStep,
  TwoChoiceStep,
} from "./QuizSteps";
import { ThemaFilterBadge } from "./ThemaFilterBadge";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

export function Quiz({
  kursId,
  themaId,
  themaTitle,
  onClearThema,
}: {
  kursId: string;
  themaId?: string;
  themaTitle?: string;
  onClearThema?: () => void;
}) {
  const online = useOnlineStatus();
  const utils = trpc.useUtils();
  // F-26: Quiz-Antworten fließen jetzt in die Fortschrittsanzeige ein (siehe
  // Architekturplanung Abschnitt 13) — nach jeder Antwort invalidieren, damit der
  // Fortschritt-Tab nicht auf einem veralteten Zwischenstand hängen bleibt. Offline gibt es
  // nichts zu invalidieren (kein Serverkontakt) — der Fortschritt zieht dann erst beim Sync nach.
  const invalidateProgress = () => {
    utils.progress.overview.invalidate();
    // F-27: Ergebnis kann die nächste Runde Vorschläge verändern.
    utils.progress.suggestions.invalidate();
  };
  // staleTime: Infinity — quiz.quizItems liefert die 20 Fragen in zufälliger Reihenfolge (siehe
  // apps/api/src/trpc/routers/quiz.ts); ein automatischer Hintergrund-Refetch (z. B. TanStack
  // Querys refetchOnWindowFocus) würde sonst mitten in einer Runde eine neu gemischte Liste
  // laden, während der lokale `index` unverändert bleibt — die angezeigte Frage würde nicht mehr
  // zur Fragenzahl passen. Die Komponente bleibt jetzt ohnehin über den Tab-Wechsel hinweg
  // gemountet (siehe App.tsx), ein Re-Fetch ist hier also nie erwünscht.
  // F-22: frei wählbare Rundengröße statt fest 20 — siehe QuizCountControl.
  const [questionCount, setQuestionCount] = useState(DEFAULT_QUIZ_ROUND_SIZE);
  const quizItemsQuery = trpc.quiz.quizItems.useQuery(
    { kursId, themaId, count: questionCount },
    { staleTime: Infinity, enabled: online },
  );
  const submitAnswerMutation = trpc.quiz.submitAnswer.useMutation({ onSuccess: invalidateProgress });
  const submitMcMultiMutation = trpc.quiz.submitMcMulti.useMutation({ onSuccess: invalidateProgress });
  const submitMatchingMutation = trpc.quiz.submitMatching.useMutation({ onSuccess: invalidateProgress });
  const submitQuadrantMutation = trpc.quiz.submitQuadrant.useMutation({ onSuccess: invalidateProgress });
  const submitBlanksMutation = trpc.quiz.submitBlanks.useMutation({ onSuccess: invalidateProgress });
  const submitKurzantwortMutation = trpc.quiz.submitKurzantwort.useMutation({ onSuccess: invalidateProgress });

  // N-08: Übungsset-Tracking für die "Abschlussquote"-KPI (Anforderungskatalog Abschnitt 11) —
  // bewusst nur online, siehe exercise_set in apps/api/src/db/schema.ts. Startet neu, sobald
  // quiz.quizItems tatsächlich Daten für die aktuelle Runde liefert (staleTime: Infinity, siehe
  // oben — feuert also genau einmal je Kurs/Thema/Rundengröße, nicht bei jedem Render).
  const startExerciseSet = trpc.progress.startExerciseSet.useMutation();
  const completeExerciseSet = trpc.progress.completeExerciseSet.useMutation();
  const exerciseSetIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!online || !quizItemsQuery.data || quizItemsQuery.data.length === 0) {
      return;
    }
    exerciseSetIdRef.current = null;
    startExerciseSet.mutate(
      { kursId, themaId, mode: "quiz", totalItems: quizItemsQuery.data.length },
      { onSuccess: (result) => (exerciseSetIdRef.current = result.exerciseSetId) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, kursId, themaId, questionCount, quizItemsQuery.data]);

  // F-42 Baustein 4: offline kommt die Runde (inkl. Lösung für die lokale Prüfung) aus der
  // IndexedDB-Kopie statt von quiz.quizItems — einmalig pro Kurs/Thema/Online-Wechsel geladen,
  // analog zum offline-Zweig in Flashcards.tsx.
  const [offlineRound, setOfflineRound] = useState<OfflineQuizRound | null>(null);
  useEffect(() => {
    if (online) {
      setOfflineRound(null);
      return;
    }
    let cancelled = false;
    loadOfflineQuizRound(kursId, themaId, questionCount).then((round) => {
      if (!cancelled) setOfflineRound(round);
    });
    return () => {
      cancelled = true;
    };
  }, [online, kursId, themaId, questionCount]);

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // Ein Verbindungswechsel oder eine geänderte Rundengröße (F-22) ersetzt die komplette
  // Fragenliste — index/correctCount müssten sonst nicht mehr zur neuen Liste passen.
  useEffect(() => {
    setIndex(0);
    setCorrectCount(0);
  }, [online, questionCount]);

  if (online ? quizItemsQuery.isLoading : offlineRound === null) {
    return <p>Lädt…</p>;
  }

  const items = online ? quizItemsQuery.data ?? [] : offlineRound!.shaped;
  const offlineMutations = online ? null : createOfflineQuizMutations(offlineRound!.raw);
  const submitAnswer = online ? submitAnswerMutation : offlineMutations!.submitAnswer;
  const submitMatching = online ? submitMatchingMutation : offlineMutations!.submitMatching;
  const submitBlanks = online ? submitBlanksMutation : offlineMutations!.submitBlanks;
  const submitKurzantwort = online ? submitKurzantwortMutation : offlineMutations!.submitKurzantwort;

  const filterBadge = themaId && themaTitle && onClearThema && (
    <ThemaFilterBadge themaTitle={themaTitle} onClear={onClearThema} />
  );
  const countControl = <QuizCountControl count={questionCount} onChange={setQuestionCount} />;

  if (items.length === 0) {
    return (
      <div className="stack">
        {filterBadge}
        <div className="alert alert-info">
          <InfoIcon />
          <div>Keine Quiz-Fragen verfügbar.</div>
        </div>
        {countControl}
      </div>
    );
  }

  if (index >= items.length) {
    return (
      <div className="stack">
        {filterBadge}
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            Quiz abgeschlossen 🎉 — {correctCount} von {items.length} richtig
          </div>
        </div>
        {countControl}
      </div>
    );
  }

  const current = items[index]!;
  const isLast = index + 1 >= items.length;

  function handleAnswered(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  }

  function next() {
    setIndex((i) => {
      const nextIndex = i + 1;
      // N-08: Übungsset abgeschlossen, sobald die letzte Frage beantwortet wurde.
      if (nextIndex >= items.length && exerciseSetIdRef.current) {
        const exerciseSetId = exerciseSetIdRef.current;
        exerciseSetIdRef.current = null;
        completeExerciseSet.mutate({ exerciseSetId });
      }
      return nextIndex;
    });
  }

  return (
    <div className="stack">
      {filterBadge}
      <span className="quiz-progress">
        Frage {index + 1} von {items.length}
      </span>
      {countControl}
      {/* F-113: was_passt_nicht mechanisch identisch zu quiz_mc (siehe QuizSteps.tsx),
          wahr_falsch/entweder_oder nutzen die eigene TwoChoiceStep-Darstellung. */}
      {(current.type === "quiz_mc" || current.type === "was_passt_nicht") && (
        <MultipleChoiceStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitAnswer}
          canReport
        />
      )}
      {(current.type === "wahr_falsch" || current.type === "entweder_oder") && (
        <TwoChoiceStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitAnswer}
          canReport
        />
      )}
      {/* F-116: bewusst nur online (siehe Architekturplanung Abschnitt 13, analog F-114) —
          offline kommt diese Frage über offlineRound gar nicht erst vor. */}
      {current.type === "quiz_mc_multi" && (
        <McMultiStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitMcMultiMutation}
          canReport
        />
      )}
      {current.type === "zuordnung" && (
        <MatchingStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitMatching}
          canReport
        />
      )}
      {/* F-114: bewusst nur online (siehe Architekturplanung Abschnitt 13) — offline kommt diese
          Frage über offlineRound gar nicht erst vor, `submitQuadrantMutation` wird hier also nur
          erreicht, wenn `online` ohnehin true ist. */}
      {(current.type === "swot" || current.type === "bsc" || current.type === "ansoff") && (
        <QuadrantStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitQuadrantMutation}
          canReport
        />
      )}
      {current.type === "luecken" && (
        <BlanksStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitBlanks}
          canReport
        />
      )}
      {/* F-115: bewusst nur online, wie F-114/F-116 (siehe Architekturplanung Abschnitt 13) —
          submitBlanksMutation statt der online/offline-geswitchten submitBlanks, da diese Frage
          im Offline-Pfad gar nicht erst vorkommt. */}
      {current.type === "luecken_auswahl" && (
        <BlanksSelectionStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitBlanksMutation}
          canReport
        />
      )}
      {current.type === "kurzantwort" && (
        <KurzantwortStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitKurzantwort}
          canReport
        />
      )}
    </div>
  );
}
