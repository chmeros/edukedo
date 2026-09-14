import { useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { trpc } from "./trpc";

export function Flashcards({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const dueCards = trpc.content.dueCards.useQuery({ kursId });

  const submitReview = trpc.progress.submitReview.useMutation({
    onSuccess: () => utils.content.dueCards.invalidate(),
  });

  const [revealed, setRevealed] = useState(false);

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
