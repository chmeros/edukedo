import { useEffect, useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { FlipCard } from "./FlipCard";
import { SuccessIcon } from "./Icons";
import { loadOfflineDueCards, reviewOfflineCard } from "./offlineFlashcards";
import type { OfflineContentItem } from "./offlineDb";
import { ReportContentButton } from "./ReportContentButton";
import { ThemaFilterBadge } from "./ThemaFilterBadge";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

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
  const online = useOnlineStatus();
  const utils = trpc.useUtils();
  const dueCardsQuery = trpc.content.dueCards.useQuery({ kursId, themaId }, { enabled: online });

  const submitReview = trpc.progress.submitReview.useMutation({
    onSuccess: () => {
      utils.content.dueCards.invalidate();
      // F-27: Ergebnis kann die nächste Runde Vorschläge verändern (z. B. Thema jetzt
      // nicht mehr überfällig).
      utils.progress.suggestions.invalidate();
    },
  });

  // F-42 Baustein 4: offline kommen die fälligen Karten aus der lokalen IndexedDB-Kopie statt
  // von content.dueCards — einmalig pro Kurs/Thema/Online-Wechsel geladen, danach per
  // setOfflineCards direkt aktualisiert (siehe review() unten), ohne erneut aus Dexie zu lesen.
  const [offlineCards, setOfflineCards] = useState<OfflineContentItem[] | null>(null);
  useEffect(() => {
    if (online) {
      setOfflineCards(null);
      return;
    }
    let cancelled = false;
    loadOfflineDueCards(kursId, themaId).then((cards) => {
      if (!cancelled) setOfflineCards(cards);
    });
    return () => {
      cancelled = true;
    };
  }, [online, kursId, themaId]);

  const [revealed, setRevealed] = useState(false);

  if (online ? dueCardsQuery.isLoading : offlineCards === null) {
    return <p>Lädt…</p>;
  }

  const cards = online ? dueCardsQuery.data ?? [] : offlineCards!;
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
    if (online) {
      submitReview.mutate({ contentItemId: current!.id, result });
    } else {
      // Entfernt die bewertete Karte direkt aus der lokalen Liste, statt (wie online) eine
      // Server-Query zu invalidieren — es gibt offline keine Query, die neu laden könnte.
      // Code-Review-Fund, nachgezogen: ohne .catch() wäre ein Schreibfehler (z. B. IndexedDB-
      // Kontingent überschritten) eine unbehandelte Promise-Ablehnung gewesen — die Karte bleibt
      // in diesem Fall bewusst in der fälligen Liste stehen (setOfflineCards läuft nur bei
      // Erfolg), ein erneutes Bewerten versucht es erneut, statt die Bewertung unbemerkt zu
      // verlieren.
      reviewOfflineCard(current as OfflineContentItem, result)
        .then(() => {
          setOfflineCards((existing) => (existing ?? []).filter((card) => card.id !== current!.id));
        })
        .catch((error: unknown) => {
          console.error("Offline-Karteikarten-Bewertung konnte nicht gespeichert werden:", error);
        });
    }
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
        stacked={cards.length > 1}
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
      <div style={{ textAlign: "center" }}>
        <ReportContentButton contentItemId={current.id} />
      </div>
    </div>
  );
}
