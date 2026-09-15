import { useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { FlipCard } from "./FlipCard";
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
      <FlipCard
        flipped={revealed}
        onToggle={() => setRevealed((current) => !current)}
        front={
          <>
            <span className="flip-kicker">Karteikarte</span>
            <p className="flip-q">{current.prompt}</p>
            <span className="flip-hint">Antippen zum Umdrehen</span>
          </>
        }
        back={
          <>
            <span className="flip-kicker">Antwort</span>
            <p className="flip-a">{current.explanation ?? "Keine Zusatzerklärung vorhanden."}</p>
            <span className="flip-hint">Bewerte unten, wie es lief</span>
          </>
        }
      />
      {revealed && (
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
