import { useState } from "react";
import { trpc } from "./trpc";

type Feedback = { isCorrect: boolean; correctOptionId: string; explanation: string | null };

export function Quiz() {
  const quizItems = trpc.quiz.quizItems.useQuery();
  const submitAnswer = trpc.quiz.submitAnswer.useMutation();

  const [index, setIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
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

  function checkAnswer() {
    if (!selectedOptionId) return;
    submitAnswer.mutate(
      { contentItemId: current.id, selectedOptionId },
      {
        onSuccess: (result) => {
          setFeedback(result);
          if (result.isCorrect) {
            setCorrectCount((count) => count + 1);
          }
        },
      },
    );
  }

  function nextQuestion() {
    setIndex((current) => current + 1);
    setSelectedOptionId(null);
    setFeedback(null);
  }

  return (
    <section className="quiz">
      <p className="quiz-count">
        Frage {index + 1} von {items.length}
      </p>
      <div className="quiz-prompt">{current.prompt}</div>
      <div className="quiz-options">
        {current.options.map((option) => {
          let className = "quiz-option";
          if (feedback) {
            if (option.id === feedback.correctOptionId) {
              className += " correct";
            } else if (option.id === selectedOptionId) {
              className += " incorrect";
            }
          } else if (option.id === selectedOptionId) {
            className += " selected";
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
          <p className={feedback.isCorrect ? "quiz-feedback correct" : "quiz-feedback incorrect"}>
            {feedback.isCorrect ? "Richtig!" : "Leider falsch."}
            {feedback.explanation ? ` ${feedback.explanation}` : ""}
          </p>
          <button type="button" onClick={nextQuestion}>
            {index + 1 < items.length ? "Nächste Frage" : "Ergebnis anzeigen"}
          </button>
        </>
      ) : (
        <button type="button" onClick={checkAnswer} disabled={!selectedOptionId || submitAnswer.isPending}>
          Antwort prüfen
        </button>
      )}
    </section>
  );
}
