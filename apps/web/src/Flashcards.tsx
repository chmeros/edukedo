import { useEffect, useState } from "react";
import type { ReviewResult } from "@edukedo/shared";
import { FlashcardSelection } from "./FlashcardSelection";
import { FlipCard } from "./FlipCard";
import { InfoIcon, StarIcon, SuccessIcon } from "./Icons";
import { loadOfflineDueCards, reviewOfflineCard } from "./offlineFlashcards";
import type { OfflineContentItem } from "./offlineDb";
import { ReportContentButton } from "./ReportContentButton";
import { ThemaFilterBadge } from "./ThemaFilterBadge";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

/**
 * F-110: Erweiterte Karteikarten-Auswahl (Nutzer-Feedback vom 18.09.2026, erweitert F-22).
 * Vier Teile, siehe Architekturplanung Abschnitt 13 für die jeweilige Design-Entscheidung:
 * 1. Gezielte Auswahl einzelner Karten (`FlashcardSelection.tsx`, nur online, setzt ein
 *    aktives F-27-Thema voraus).
 * 2. Freie Wahl der Startseite (`auth.me.flashcardStartWithAnswer`, Einstellungen-Modal).
 * 3. Vor-/Zurück-Navigation innerhalb der Runde — löst die Runde von einer "bei jeder
 *    Bewertung neu geladenen Liste" (bisher) zu einer beim Laden fixierten, indexbasierten
 *    Liste ab (analog zu Quiz.tsx), sonst wäre "Zurück" nicht möglich.
 * 4. Manuelle "schwierig"-Markierung (`progress.toggleDifficultyFlag`), rein additiv zur
 *    FSRS-Selbsteinschätzung, plus "Nur schwierige Karten"-Filter.
 * Alle vier bewusst nur online — der Offline-Pfad (F-42) bleibt unverändert bei der
 * bisherigen, einfachen "nächste fällige Karte"-Logik, analog zur Offline-Ausnahme bei N-08.
 */
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
  const me = trpc.auth.me.useQuery();
  const startWithAnswer = me.data?.flashcardStartWithAnswer ?? false;

  // F-110: Auswahlmodus — entweder gezielt ausgewählte Karten-IDs oder der "Nur schwierige
  // Karten"-Filter, nie beides gleichzeitig (siehe dueCardsInputSchema). Ein Themenwechsel/
  // Kurswechsel verwirft eine laufende Auswahl, da sie sich auf das vorherige Thema bezog.
  const [selectedCardIds, setSelectedCardIds] = useState<string[] | null>(null);
  const [onlyFlagged, setOnlyFlagged] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    setSelectedCardIds(null);
    setOnlyFlagged(false);
  }, [kursId, themaId]);

  const dueCardsInput = {
    kursId,
    themaId,
    contentItemIds: selectedCardIds ?? undefined,
    onlyFlagged: selectedCardIds ? undefined : onlyFlagged,
  };
  // staleTime: Infinity — analog zu quiz.quizItems in Quiz.tsx: die Runde ist beim Laden
  // fixiert, damit der lokale `index` (Vor-/Zurück-Navigation) zur angezeigten Liste passt.
  // Ein Review verändert die Liste deshalb bewusst NICHT mehr per invalidate() (anders als
  // vorher) — "Weitere Karten laden" unten holt bei Bedarf explizit eine neue Runde.
  const dueCardsQuery = trpc.content.dueCards.useQuery(dueCardsInput, {
    staleTime: Infinity,
    enabled: online,
  });

  const submitReview = trpc.progress.submitReview.useMutation({
    onSuccess: () => {
      // F-27: Ergebnis kann die nächste Runde Vorschläge verändern (z. B. Thema jetzt
      // nicht mehr überfällig).
      utils.progress.suggestions.invalidate();
      utils.progress.overview.invalidate();
    },
  });

  const toggleFlag = trpc.progress.toggleDifficultyFlag.useMutation({
    onSuccess: (result, variables) => {
      // Lokales Update statt invalidate(): die Runde bleibt fixiert (siehe oben), nur das
      // Flag der betroffenen Karte im bereits geladenen Cache wird aktualisiert.
      utils.content.dueCards.setData(dueCardsInput, (existing) =>
        existing?.map((card) =>
          card.id === variables.contentItemId ? { ...card, flaggedAsDifficult: result.flagged } : card,
        ),
      );
      utils.content.themaFlashcards.invalidate();
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

  const [revealed, setRevealed] = useState(startWithAnswer);
  const [index, setIndex] = useState(0);
  // Ein Verbindungswechsel oder eine neue Auswahl (Karten-IDs/Nur-schwierig-Filter) ersetzt
  // die komplette Liste — der Index müsste sonst nicht mehr zur neuen Liste passen.
  useEffect(() => {
    setIndex(0);
    setRevealed(startWithAnswer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, selectedCardIds, onlyFlagged]);

  if (online ? dueCardsQuery.isLoading : offlineCards === null) {
    return <p>Lädt…</p>;
  }

  const cards = online ? dueCardsQuery.data ?? [] : offlineCards!;
  const filterBadge = themaId && themaTitle && onClearThema && (
    <ThemaFilterBadge themaTitle={themaTitle} onClear={onClearThema} />
  );

  // F-110: nur online sinnvoll (Auswahl/Flag-Filter setzen einen Serverkontakt voraus) — der
  // Offline-Modus zeigt diese Steuerzeile deshalb gar nicht erst an.
  const selectionControls = online && (
    <div className="list-row-actions" style={{ flexWrap: "wrap" }}>
      {themaId && (
        <button type="button" className="link-muted-btn" onClick={() => setShowPicker(true)}>
          Karten auswählen
        </button>
      )}
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <input
          type="checkbox"
          checked={onlyFlagged}
          onChange={(event) => {
            setSelectedCardIds(null);
            setOnlyFlagged(event.target.checked);
          }}
        />
        Nur schwierige Karten
      </label>
      {selectedCardIds && (
        <button type="button" className="link-muted-btn" onClick={() => setSelectedCardIds(null)}>
          ✕ Auswahl aufheben
        </button>
      )}
    </div>
  );

  if (cards.length === 0) {
    return (
      <div className="stack">
        {filterBadge}
        {selectionControls}
        {selectedCardIds || onlyFlagged ? (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              {selectedCardIds ? "Keine der ausgewählten Karten wurde gefunden." : "Keine als schwierig markierten Karten."}
            </div>
          </div>
        ) : (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>Keine Karten fällig 🎉</div>
          </div>
        )}
        {showPicker && themaId && themaTitle && (
          <FlashcardSelection
            kursId={kursId}
            themaId={themaId}
            themaTitle={themaTitle}
            onApply={(ids) => {
              setOnlyFlagged(false);
              setSelectedCardIds(ids);
              setShowPicker(false);
            }}
            onClose={() => setShowPicker(false)}
          />
        )}
      </div>
    );
  }

  // F-110 Teil 3: Vor-/Zurück-Navigation innerhalb der (jetzt fixierten) Runde — der Index
  // läuft NICHT automatisch über das Rundenende hinaus, sondern bleibt auf dem letzten
  // gültigen Wert stehen (cards.length - 1); der "Runde abgeschlossen"-Zustand blendet sich
  // separat über `roundComplete` ein, ohne current auf undefined laufen zu lassen.
  const roundComplete = index >= cards.length;
  const current = cards[Math.min(index, cards.length - 1)]!;
  // "in"-Prüfung statt current.flaggedAsDifficult direkt: `cards` ist online ein anderer Typ
  // (mit Flag) als offline (OfflineContentItem, ohne Flag) — F-110 ist bewusst nur online
  // verfügbar (siehe oben), offline bleibt das Flag also immer false.
  const currentFlagged = "flaggedAsDifficult" in current && current.flaggedAsDifficult;

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
      setRevealed(startWithAnswer);
      return;
    }
    setIndex((i) => i + 1);
    setRevealed(startWithAnswer);
  }

  if (roundComplete) {
    return (
      <div className="stack">
        {filterBadge}
        {selectionControls}
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Runde abgeschlossen 🎉 — {cards.length} Karte(n)</div>
        </div>
        <div className="list-row-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setIndex(0);
              setRevealed(startWithAnswer);
            }}
          >
            Von vorne beginnen
          </button>
          {online && !selectedCardIds && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={async () => {
                await dueCardsQuery.refetch();
                setIndex(0);
                setRevealed(startWithAnswer);
              }}
            >
              Weitere Karten laden
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      {filterBadge}
      {selectionControls}
      <span className="due-count">
        <b>{index + 1}</b> von {cards.length} Karte(n)
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
      <div className="list-row-actions" style={{ justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => Math.max(i - 1, 0));
            setRevealed(startWithAnswer);
          }}
        >
          ← Zurück
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setIndex((i) => i + 1);
            setRevealed(startWithAnswer);
          }}
        >
          Weiter →
        </button>
        {online && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            disabled={toggleFlag.isPending}
            aria-pressed={currentFlagged}
            onClick={() => toggleFlag.mutate({ contentItemId: current.id })}
          >
            <StarIcon filled={currentFlagged} /> Schwierig
          </button>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <ReportContentButton contentItemId={current.id} />
      </div>
      {showPicker && themaId && themaTitle && (
        <FlashcardSelection
          kursId={kursId}
          themaId={themaId}
          themaTitle={themaTitle}
          onApply={(ids) => {
            setOnlyFlagged(false);
            setSelectedCardIds(ids);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
