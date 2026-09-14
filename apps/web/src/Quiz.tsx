import { useState } from "react";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
import { trpc } from "./trpc";

export function Quiz({ kursId }: { kursId: string }) {
  const quizItems = trpc.quiz.quizItems.useQuery({ kursId });
  const submitAnswer = trpc.quiz.submitAnswer.useMutation();
  const submitMatching = trpc.quiz.submitMatching.useMutation();
  const submitBlanks = trpc.quiz.submitBlanks.useMutation();
  const submitKurzantwort = trpc.quiz.submitKurzantwort.useMutation();
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
      <p>
        Quiz abgeschlossen 🎉 — {correctCount} von {items.length} richtig
      </p>
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
    <section className="quiz">
      <p className="quiz-count">
        Frage {index + 1} von {items.length}
      </p>
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
    </section>
  );
}
