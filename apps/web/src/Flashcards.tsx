import { useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { FlipCard } from "./FlipCard";
import { SuccessIcon } from "./Icons";
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
    return (
      <div className="alert alert-success">
        <SuccessIcon />
        <div>Keine Karten fällig 🎉</div>
      </div>
    );
  }

  function review(result: ReviewResult) {
    submitReview.mutate({ contentItemId: current!.id, result });
    setRevealed(false);
  }

  return (
    <div className="stack">
      <span className="due-count">
        <b>{cards.length}</b> Karte(n) fällig
      </span>
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
            <span className="flip-kicker" style={{ color: "#fff" }}>
              Antwort
            </span>
            <p className="flip-a">{current.explanation ?? "Keine Zusatzerklärung vorhanden."}</p>
            <span className="flip-hint">Bewerte unten, wie es lief</span>
          </>
        }
      />
      {revealed && (
        <div className="rate-row">
          <button type="button" className="again" onClick={() => review("nicht_gewusst")}>
            Nochmal
          </button>
          <button type="button" className="hard" onClick={() => review("unsicher")}>
            Schwer
          </button>
          <button type="button" className="good" onClick={() => review("gewusst")}>
            Gut
          </button>
        </div>
      )}
    </div>
  );
}
