import { useState } from "react";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-110: Gezielte Auswahl einzelner Karteikarten (über die themenbezogene Fragenzahl aus F-22
 * hinaus) — Checkliste über alle Karteikarten des aktuell per F-27-Filter aktiven Themas
 * (`content.themaFlashcards`, bewusst themengebunden statt kursweit, siehe Architekturplanung
 * Abschnitt 13). Die Auswahl selbst lädt anschließend über `content.dueCards` mit
 * `contentItemIds` — unabhängig davon, ob die Karten gerade fällig sind.
 */
export function FlashcardSelection({
  kursId,
  themaId,
  themaTitle,
  onApply,
  onClose,
}: {
  kursId: string;
  themaId: string;
  themaTitle: string;
  onApply: (contentItemIds: string[]) => void;
  onClose: () => void;
}) {
  const cardsQuery = trpc.content.themaFlashcards.useQuery({ kursId, themaId });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <Modal title={`Karten auswählen — ${themaTitle}`} onClose={onClose}>
      <div className="stack">
        {cardsQuery.isLoading && <p>Lädt…</p>}
        {cardsQuery.data && cardsQuery.data.length === 0 && <p>Keine Karteikarten in diesem Thema.</p>}
        {cardsQuery.data && cardsQuery.data.length > 0 && (
          <div className="list">
            {cardsQuery.data.map((card) => (
              <label key={card.id} className="list-row" style={{ cursor: "pointer" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" checked={selected.has(card.id)} onChange={() => toggle(card.id)} />
                  {card.prompt}
                </span>
                <span className="meta">
                  <span>
                    {card.flaggedAsDifficult ? "⭐ schwierig markiert" : ""}
                    {card.flaggedAsDifficult && !card.due ? " · " : ""}
                    {!card.due ? "nicht fällig" : ""}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
        <div className="list-row-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={selected.size === 0}
            onClick={() => onApply([...selected])}
          >
            {selected.size} Karte(n) lernen
          </button>
        </div>
      </div>
    </Modal>
  );
}
