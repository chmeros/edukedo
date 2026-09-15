import { useState } from "react";
import { SuccessIcon } from "./Icons";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
import { trpc } from "./trpc";

export function Quiz({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  // F-26: Quiz-Antworten fließen jetzt in die Fortschrittsanzeige ein (siehe
  // Architekturplanung Abschnitt 13) — nach jeder Antwort invalidieren, damit der
  // Fortschritt-Tab nicht auf einem veralteten Zwischenstand hängen bleibt.
  const invalidateProgress = () => utils.progress.overview.invalidate();
  // staleTime: Infinity — quiz.quizItems liefert die 20 Fragen in zufälliger Reihenfolge (siehe
  // apps/api/src/trpc/routers/quiz.ts); ein automatischer Hintergrund-Refetch (z. B. TanStack
  // Querys refetchOnWindowFocus) würde sonst mitten in einer Runde eine neu gemischte Liste
  // laden, während der lokale `index` unverändert bleibt — die angezeigte Frage würde nicht mehr
  // zur Fragenzahl passen. Die Komponente bleibt jetzt ohnehin über den Tab-Wechsel hinweg
  // gemountet (siehe App.tsx), ein Re-Fetch ist hier also nie erwünscht.
  const quizItems = trpc.quiz.quizItems.useQuery({ kursId }, { staleTime: Infinity });
  const submitAnswer = trpc.quiz.submitAnswer.useMutation({ onSuccess: invalidateProgress });
  const submitMatching = trpc.quiz.submitMatching.useMutation({ onSuccess: invalidateProgress });
  const submitBlanks = trpc.quiz.submitBlanks.useMutation({ onSuccess: invalidateProgress });
  const submitKurzantwort = trpc.quiz.submitKurzantwort.useMutation({ onSuccess: invalidateProgress });
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (quizItems.isLoading) {
    return <p>Lädt…</p>;
  }

  const items = quizItems.data ?? [];

  if (items.length === 0) {
    return <p>Keine Quiz-Fragen verfügbar.</p>;
  }

  if (index >= items.length) {
    return (
      <div className="alert alert-success">
        <SuccessIcon />
        <div>
          Quiz abgeschlossen 🎉 — {correctCount} von {items.length} richtig
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
