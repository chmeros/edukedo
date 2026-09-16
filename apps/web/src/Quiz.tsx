import { useEffect, useState } from "react";
import type { OfflineQuizRound } from "./offlineQuiz";
import { createOfflineQuizMutations, loadOfflineQuizRound } from "./offlineQuiz";
import { InfoIcon, SuccessIcon } from "./Icons";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
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
  const quizItemsQuery = trpc.quiz.quizItems.useQuery({ kursId, themaId }, { staleTime: Infinity, enabled: online });
  const submitAnswerMutation = trpc.quiz.submitAnswer.useMutation({ onSuccess: invalidateProgress });
  const submitMatchingMutation = trpc.quiz.submitMatching.useMutation({ onSuccess: invalidateProgress });
  const submitBlanksMutation = trpc.quiz.submitBlanks.useMutation({ onSuccess: invalidateProgress });
  const submitKurzantwortMutation = trpc.quiz.submitKurzantwort.useMutation({ onSuccess: invalidateProgress });

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
    loadOfflineQuizRound(kursId, themaId).then((round) => {
      if (!cancelled) setOfflineRound(round);
    });
    return () => {
      cancelled = true;
    };
  }, [online, kursId, themaId]);

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // Ein Verbindungswechsel mitten in einer Runde ersetzt die komplette Fragenliste (Server- vs.
  // IndexedDB-Quelle) — index/correctCount müssten sonst nicht mehr zur neuen Liste passen.
  useEffect(() => {
    setIndex(0);
    setCorrectCount(0);
  }, [online]);

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

  if (items.length === 0) {
    return (
      <div className="stack">
        {filterBadge}
        <div className="alert alert-info">
          <InfoIcon />
          <div>Keine Quiz-Fragen verfügbar.</div>
        </div>
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
    setIndex((i) => i + 1);
  }

  return (
    <div className="stack">
      {filterBadge}
      <span className="quiz-progress">
        Frage {index + 1} von {items.length}
      </span>
      {current.type === "quiz_mc" && (
        <MultipleChoiceStep
          key={current.id}
          item={current}
          isLast={isLast}
          onAnswered={handleAnswered}
          onNext={next}
          submit={submitAnswer}
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
        />
      )}
    </div>
  );
}
