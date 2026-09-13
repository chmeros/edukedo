import { useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { trpc } from "./trpc";

export function Flashcards() {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const hasJoinedCourse = courses.data?.some((course) => course.joined) ?? false;

  const dueCards = trpc.content.dueCards.useQuery(undefined, { enabled: hasJoinedCourse });

  const enroll = trpc.courses.enroll.useMutation({
    onSuccess: () => {
      utils.courses.list.invalidate();
      utils.content.dueCards.invalidate();
    },
  });

  const submitReview = trpc.progress.submitReview.useMutation({
    onSuccess: () => utils.content.dueCards.invalidate(),
  });

  const [revealed, setRevealed] = useState(false);

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  if (!hasJoinedCourse) {
    return (
      <section>
        <h2>Verfügbare Kurse</h2>
        <ul className="course-list">
          {courses.data?.map((course) => (
            <li key={course.id}>
              <span>{course.title}</span>
              <button
                type="button"
                onClick={() => enroll.mutate({ kursId: course.id })}
                disabled={enroll.isPending}
              >
                Beitreten
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (dueCards.isLoading) {
    return <p>Lädt…</p>;
  }

  const cards = dueCards.data ?? [];
  const current = cards[0];

  if (!current) {
    return <p>Keine Karten fällig 🎉</p>;
  }

  function review(result: ReviewResult) {
    submitReview.mutate({ contentItemId: current!.id, result });
    setRevealed(false);
  }

  return (
    <section className="flashcard">
      <p className="flashcard-count">{cards.length} Karte(n) fällig</p>
      <div className="flashcard-face">{current.prompt}</div>
      {revealed && current.explanation && <div className="flashcard-back">{current.explanation}</div>}
      {!revealed ? (
        <button type="button" onClick={() => setRevealed(true)}>
          Antwort zeigen
        </button>
      ) : (
        <div className="flashcard-actions">
          <button type="button" className="rating-again" onClick={() => review("nicht_gewusst")}>
            Nicht gewusst
          </button>
          <button type="button" className="rating-hard" onClick={() => review("unsicher")}>
            Unsicher
          </button>
          <button type="button" className="rating-good" onClick={() => review("gewusst")}>
            Gewusst
          </button>
        </div>
      )}
    </section>
  );
}
