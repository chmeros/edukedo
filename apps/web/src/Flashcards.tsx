import { useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { FlipCard } from "./FlipCard";
import { SuccessIcon } from "./Icons";
import { ThemaFilterBadge } from "./ThemaFilterBadge";
import { trpc } from "./trpc";

export function Flashcards({
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
  const utils = trpc.useUtils();
  const dueCards = trpc.content.dueCards.useQuery({ kursId, themaId });

  const submitReview = trpc.progress.submitReview.useMutation({
    onSuccess: () => {
      utils.content.dueCards.invalidate();
      // F-27: Ergebnis kann die nächste Runde Vorschläge verändern (z. B. Thema jetzt
      // nicht mehr überfällig).
      utils.progress.suggestions.invalidate();
    },
  });

  const [revealed, setRevealed] = useState(false);

  if (dueCards.isLoading) {
    return <p>Lädt…</p>;
  }

  const cards = dueCards.data ?? [];
  const current = cards[0];

  if (!current) {
    return (
      <div className="stack">
        {themaId && themaTitle && onClearThema && (
          <ThemaFilterBadge themaTitle={themaTitle} onClear={onClearThema} />
        )}
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Keine Karten fällig 🎉</div>
        </div>
      </div>
    );
  }

  function review(result: ReviewResult) {
    submitReview.mutate({ contentItemId: current!.id, result });
    setRevealed(false);
  }

  return (
    <div className="stack">
      {themaId && themaTitle && onClearThema && <ThemaFilterBadge themaTitle={themaTitle} onClear={onClearThema} />}
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
