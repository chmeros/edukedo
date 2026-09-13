import { useState } from "react";
import { trpc } from "./trpc";

interface StepProps<TItem> {
  item: TItem;
  isLast: boolean;
  onAnswered: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function Quiz() {
  const quizItems = trpc.quiz.quizItems.useQuery();
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
        <MultipleChoiceStep key={current.id} item={current} isLast={isLast} onAnswered={handleAnswered} onNext={next} />
      )}
      {current.type === "zuordnung" && (
        <MatchingStep key={current.id} item={current} isLast={isLast} onAnswered={handleAnswered} onNext={next} />
      )}
      {current.type === "luecken" && (
        <BlanksStep key={current.id} item={current} isLast={isLast} onAnswered={handleAnswered} onNext={next} />
      )}
    </section>
  );
}

interface McItem {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
}

function MultipleChoiceStep({ item, isLast, onAnswered, onNext }: StepProps<McItem>) {
  const submitAnswer = trpc.quiz.submitAnswer.useMutation();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctOptionId: string;
    explanation: string | null;
  } | null>(null);

  function checkAnswer() {
    if (!selectedOptionId) return;
    submitAnswer.mutate(
      { contentItemId: item.id, selectedOptionId },
      {
        onSuccess: (result) => {
          setFeedback(result);
          onAnswered(result.isCorrect);
        },
      },
    );
  }

  return (
    <>
      <div className="quiz-prompt">{item.prompt}</div>
      <div className="quiz-options">
        {item.options.map((option) => {
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
          <button type="button" onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button type="button" onClick={checkAnswer} disabled={!selectedOptionId || submitAnswer.isPending}>
          Antwort prüfen
        </button>
      )}
    </>
  );
}

interface MatchingItem {
  id: string;
  prompt: string;
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
}

function MatchingStep({ item, isLast, onAnswered, onNext }: StepProps<MatchingItem>) {
  const submitMatching = trpc.quiz.submitMatching.useMutation();
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [pairs, setPairs] = useState<{ leftId: string; rightId: string }[]>([]);
  const [feedback, setFeedback] = useState<{
    correctMap: Record<string, string>;
    correctCount: number;
    total: number;
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
    submitMatching.mutate(
      {
        contentItemId: item.id,
        pairs: pairs.map((pair) => ({ leftOptionId: pair.leftId, rightOptionId: pair.rightId })),
      },
      {
        onSuccess: (result) => {
          setFeedback(result);
          onAnswered(result.correctCount === result.total);
        },
      },
    );
  }

  return (
    <>
      <div className="quiz-prompt">{item.prompt}</div>
      {pairs.length > 0 && (
        <div className="matching-pairs">
          {pairs.map((pair) => {
            let className = "matching-pair";
            if (feedback) {
              className += feedback.correctMap[pair.leftId] === pair.rightId ? " correct" : " incorrect";
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
        <div className="matching-columns">
          <div className="matching-column">
            {remainingLeft.map((option) => (
              <button
                key={option.id}
                type="button"
                className={option.id === selectedLeftId ? "matching-item selected" : "matching-item"}
                onClick={() => setSelectedLeftId(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="matching-column">
            {remainingRight.map((option) => (
              <button
                key={option.id}
                type="button"
                className="matching-item"
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
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback correct" : "quiz-feedback incorrect"}>
            {feedback.correctCount} von {feedback.total} Zuordnungen richtig.
          </p>
          <button type="button" onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={checkAnswer}
          disabled={pairs.length !== item.left.length || submitMatching.isPending}
        >
          Antwort prüfen
        </button>
      )}
    </>
  );
}

interface BlanksItem {
  id: string;
  prompt: string;
  textWithBlanks: string;
  blankIds: string[];
}

function BlanksStep({ item, isLast, onAnswered, onNext }: StepProps<BlanksItem>) {
  const submitBlanks = trpc.quiz.submitBlanks.useMutation();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{
    results: Record<string, boolean>;
    correctAnswers: Record<string, string>;
    correctCount: number;
    total: number;
  } | null>(null);

  const parts = item.textWithBlanks.split("___");
  const allFilled = item.blankIds.every((id) => (answers[id] ?? "").trim().length > 0);

  function checkAnswer() {
    submitBlanks.mutate(
      { contentItemId: item.id, answers },
      {
        onSuccess: (result) => {
          setFeedback(result);
          onAnswered(result.correctCount === result.total);
        },
      },
    );
  }

  return (
    <>
      <div className="quiz-prompt blanks-prompt">
        {parts.map((part, partIndex) => {
          const blankId = item.blankIds[partIndex];
          return (
            <span key={partIndex}>
              {part}
              {blankId && (
                <input
                  type="text"
                  className={
                    feedback ? (feedback.results[blankId] ? "blank-input correct" : "blank-input incorrect") : "blank-input"
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
          <p className={feedback.correctCount === feedback.total ? "quiz-feedback correct" : "quiz-feedback incorrect"}>
            {feedback.correctCount} von {feedback.total} Lücken richtig.
            {feedback.correctCount < feedback.total && (
              <>
                {" "}
                Richtige Lösung: {item.blankIds.map((id) => feedback.correctAnswers[id]).join(", ")}
              </>
            )}
          </p>
          <button type="button" onClick={onNext}>
            {isLast ? "Ergebnis anzeigen" : "Nächste Frage"}
          </button>
        </>
      ) : (
        <button type="button" onClick={checkAnswer} disabled={!allFilled || submitBlanks.isPending}>
          Antwort prüfen
        </button>
      )}
    </>
  );
}
