import { useEffect, useMemo, useRef, useState } from "react";
import type { ReviewResult, ShapedQuizItem } from "@edukedo/shared";
import { shuffle } from "@edukedo/shared";
import { FlipCard } from "./FlipCard";
import { SuccessIcon } from "./Icons";
import type { OfflineContentItem } from "./offlineDb";
import { loadOfflineDueCards, reviewOfflineCard } from "./offlineFlashcards";
import type { OfflineQuizRound } from "./offlineQuiz";
import { createOfflineQuizMutations, DEFAULT_QUIZ_ROUND_SIZE, loadOfflineQuizRound } from "./offlineQuiz";
import { QuizCountControl } from "./QuizCountControl";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
import { ReportContentButton } from "./ReportContentButton";
import { ThemaFilterBadge } from "./ThemaFilterBadge";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

type FlashItem = { kind: "karteikarte"; card: { id: string; prompt: string; explanation: string | null } };
type QuizItem = { kind: "quiz"; item: ShapedQuizItem };
type MixedItem = FlashItem | QuizItem;

/**
 * F-104: "Beides gemischt" — führt fällige Karteikarten (F-20) und eine Quiz-Runde (F-21) zu
 * EINER zufällig durchmischten Warteschlange zusammen, statt sie als zwei getrennte Abschnitte
 * nacheinander zu zeigen (Nutzer-Entscheidung 18.09.2026, siehe Architekturplanung Abschnitt 13).
 * Holt dieselben Daten wie Flashcards.tsx/Quiz.tsx (`content.dueCards`/`quiz.quizItems`, inkl.
 * derselben Offline-Fallbacks) und mischt sie hier nur zu einer gemeinsamen Abfolge — bewusst
 * kein neuer Backend-Endpunkt, um die bestehende Fälligkeits-/Zufallsauswahl-Logik in
 * content.dueCards/quiz.quizItems nicht zu duplizieren. `index` schreitet wie in Quiz.tsx über
 * eine beim Laden einmalig gemischte, feste Liste (staleTime: Infinity) statt bei jeder Antwort
 * neu zu sortieren.
 */
export function MixedLearning({
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

  // F-22: frei wählbare Anzahl Quiz-Fragen im Mix — die Karteikarten-Seite bleibt unverändert
  // FSRS-gesteuert ("alle fälligen"), siehe QuizCountControl.
  const [questionCount, setQuestionCount] = useState(DEFAULT_QUIZ_ROUND_SIZE);
  const dueCardsQuery = trpc.content.dueCards.useQuery(
    { kursId, themaId },
    { enabled: online, staleTime: Infinity },
  );
  const quizItemsQuery = trpc.quiz.quizItems.useQuery(
    { kursId, themaId, count: questionCount },
    { enabled: online, staleTime: Infinity },
  );

  const invalidateProgress = () => {
    utils.content.dueCards.invalidate();
    utils.progress.overview.invalidate();
    utils.progress.suggestions.invalidate();
  };
  const submitReviewMutation = trpc.progress.submitReview.useMutation({ onSuccess: invalidateProgress });
  const submitAnswerMutation = trpc.quiz.submitAnswer.useMutation({ onSuccess: invalidateProgress });
  const submitMatchingMutation = trpc.quiz.submitMatching.useMutation({ onSuccess: invalidateProgress });
  const submitBlanksMutation = trpc.quiz.submitBlanks.useMutation({ onSuccess: invalidateProgress });
  const submitKurzantwortMutation = trpc.quiz.submitKurzantwort.useMutation({ onSuccess: invalidateProgress });

  const [offlineCards, setOfflineCards] = useState<OfflineContentItem[] | null>(null);
  const [offlineRound, setOfflineRound] = useState<OfflineQuizRound | null>(null);
  useEffect(() => {
    if (online) {
      setOfflineCards(null);
      setOfflineRound(null);
      return;
    }
    let cancelled = false;
    Promise.all([loadOfflineDueCards(kursId, themaId), loadOfflineQuizRound(kursId, themaId, questionCount)]).then(
      ([cards, round]) => {
        if (!cancelled) {
          setOfflineCards(cards);
          setOfflineRound(round);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [online, kursId, themaId, questionCount]);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuizCount, setAnsweredQuizCount] = useState(0);
  // Ein Verbindungswechsel oder eine geänderte Quiz-Anzahl (F-22) ersetzt die komplette Runde.
  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setCorrectCount(0);
    setAnsweredQuizCount(0);
  }, [online, kursId, themaId, questionCount]);

  const loading = online
    ? dueCardsQuery.isLoading || quizItemsQuery.isLoading
    : offlineCards === null || offlineRound === null;

  // Einmalig gemischt, solange dieselben Daten geladen bleiben (staleTime: Infinity online,
  // nur einmal pro Online-Wechsel offline) — ein Reshuffle mitten in der Runde würde `index`
  // auf ein anderes Element als zuletzt angezeigt zeigen lassen.
  const queue = useMemo<MixedItem[]>(() => {
    if (loading) return [];
    const cards = online ? dueCardsQuery.data ?? [] : offlineCards!;
    const quizRaw = online ? quizItemsQuery.data ?? [] : offlineRound!.shaped;
    const flashItems: MixedItem[] = cards.map((card) => ({
      kind: "karteikarte",
      card: { id: card.id, prompt: card.prompt, explanation: card.explanation },
    }));
    const quizItems: MixedItem[] = quizRaw.map((item) => ({ kind: "quiz", item }));
    return shuffle([...flashItems, ...quizItems]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, online, dueCardsQuery.data, quizItemsQuery.data, offlineCards, offlineRound]);

  // N-08: Übungsset-Tracking für die "Abschlussquote"-KPI (Anforderungskatalog Abschnitt 11) —
  // bewusst nur online, siehe exercise_set in apps/api/src/db/schema.ts. `mode: "mixed"` zählt
  // die GESAMTE gemischte Runde (Karteikarten + Quiz) als ein Übungsset, nicht nur den
  // Quiz-Anteil — aus Sicht der Lernenden ist es eine einzige, durchgängige Runde.
  const startExerciseSet = trpc.progress.startExerciseSet.useMutation();
  const completeExerciseSet = trpc.progress.completeExerciseSet.useMutation();
  const exerciseSetIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!online || loading || queue.length === 0) {
      return;
    }
    exerciseSetIdRef.current = null;
    startExerciseSet.mutate(
      { kursId, themaId, mode: "mixed", totalItems: queue.length },
      { onSuccess: (result) => (exerciseSetIdRef.current = result.exerciseSetId) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, kursId, themaId, queue]);

  const offlineQuizMutations = online || !offlineRound ? null : createOfflineQuizMutations(offlineRound.raw);
  const submitAnswer = online ? submitAnswerMutation : offlineQuizMutations!.submitAnswer;
  const submitMatching = online ? submitMatchingMutation : offlineQuizMutations!.submitMatching;
  const submitBlanks = online ? submitBlanksMutation : offlineQuizMutations!.submitBlanks;
  const submitKurzantwort = online ? submitKurzantwortMutation : offlineQuizMutations!.submitKurzantwort;

  if (loading) {
    return <p>Lädt…</p>;
  }

  const filterBadge = themaId && themaTitle && onClearThema && (
    <ThemaFilterBadge themaTitle={themaTitle} onClear={onClearThema} />
  );
  const countControl = <QuizCountControl count={questionCount} onChange={setQuestionCount} />;

  if (queue.length === 0) {
    return (
      <div className="stack">
        {filterBadge}
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Keine Karten oder Fragen fällig 🎉</div>
        </div>
        {countControl}
      </div>
    );
  }

  if (index >= queue.length) {
    return (
      <div className="stack">
        {filterBadge}
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            Runde abgeschlossen 🎉
            {answeredQuizCount > 0 && ` — ${correctCount} von ${answeredQuizCount} Quiz-Fragen richtig`}
          </div>
        </div>
        {countControl}
      </div>
    );
  }

  const current = queue[index]!;
  const isLast = index + 1 >= queue.length;

  function next() {
    setIndex((i) => {
      const nextIndex = i + 1;
      // N-08: Übungsset abgeschlossen, sobald das letzte Element (Karte oder Frage) erledigt ist.
      if (nextIndex >= queue.length && exerciseSetIdRef.current) {
        const exerciseSetId = exerciseSetIdRef.current;
        exerciseSetIdRef.current = null;
        completeExerciseSet.mutate({ exerciseSetId });
      }
      return nextIndex;
    });
    setRevealed(false);
  }

  function reviewCard(result: ReviewResult) {
    const card = (current as FlashItem).card;
    if (online) {
      submitReviewMutation.mutate({ contentItemId: card.id, result });
    } else {
      const offlineItem = offlineCards!.find((item) => item.id === card.id);
      if (offlineItem) {
        reviewOfflineCard(offlineItem, result).catch((error: unknown) => {
          console.error("Offline-Karteikarten-Bewertung konnte nicht gespeichert werden:", error);
        });
      }
    }
    next();
  }

  function handleQuizAnswered(isCorrect: boolean) {
    setAnsweredQuizCount((count) => count + 1);
    if (isCorrect) setCorrectCount((count) => count + 1);
  }

  return (
    <div className="stack">
      {filterBadge}
      <span className="quiz-progress">
        {index + 1} von {queue.length}
      </span>
      {countControl}
      {current.kind === "karteikarte" && (
        <>
          <FlipCard
            flipped={revealed}
            onToggle={() => setRevealed((current) => !current)}
            front={
              <>
                <span className="flip-kicker">Karteikarte</span>
                <p className="flip-q">{current.card.prompt}</p>
                <span className="flip-hint">Antippen zum Umdrehen</span>
              </>
            }
            back={
              <>
                <span className="flip-kicker" style={{ color: "#fff" }}>
                  Antwort
                </span>
                <p className="flip-a">{current.card.explanation ?? "Keine Zusatzerklärung vorhanden."}</p>
                {/* F-111: gleiche Formulierung/Beschriftung wie Flashcards.tsx (Einfach/Mittel/
                    Schwer statt Gut/Schwer/Nochmal) — nachträgliches Ändern bleibt hier bewusst
                    außen vor, da der Mischmodus (anders als F-110s "Nur Karteikarten") keine
                    Zurück-Navigation zu bereits bewerteten Karten kennt. */}
                <span className="flip-hint">Wie schwierig war diese Karteikarte für dich?</span>
              </>
            }
          />
          {revealed && (
            <div className="rate-row">
              <button type="button" className="again" onClick={() => reviewCard("nicht_gewusst")}>
                Schwer
              </button>
              <button type="button" className="hard" onClick={() => reviewCard("unsicher")}>
                Mittel
              </button>
              <button type="button" className="good" onClick={() => reviewCard("gewusst")}>
                Einfach
              </button>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <ReportContentButton contentItemId={current.card.id} />
          </div>
        </>
      )}
      {current.kind === "quiz" && current.item.type === "quiz_mc" && (
        <MultipleChoiceStep
          key={current.item.id}
          item={current.item}
          isLast={isLast}
          onAnswered={handleQuizAnswered}
          onNext={next}
          submit={submitAnswer}
          canReport
        />
      )}
      {current.kind === "quiz" && current.item.type === "zuordnung" && (
        <MatchingStep
          key={current.item.id}
          item={current.item}
          isLast={isLast}
          onAnswered={handleQuizAnswered}
          onNext={next}
          submit={submitMatching}
          canReport
        />
      )}
      {current.kind === "quiz" && current.item.type === "luecken" && (
        <BlanksStep
          key={current.item.id}
          item={current.item}
          isLast={isLast}
          onAnswered={handleQuizAnswered}
          onNext={next}
          submit={submitBlanks}
          canReport
        />
      )}
      {current.kind === "quiz" && current.item.type === "kurzantwort" && (
        <KurzantwortStep
          key={current.item.id}
          item={current.item}
          isLast={isLast}
          onAnswered={handleQuizAnswered}
          onNext={next}
          submit={submitKurzantwort}
          canReport
        />
      )}
    </div>
  );
}
