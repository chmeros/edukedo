/**
 * F-27 "Weiter lernen"-Einstieg: zeigt an, dass Flashcards/Quiz gerade auf ein einzelnes
 * Thema gefiltert sind (nach Klick auf einen Vorschlag, siehe App.tsx), mit Möglichkeit,
 * den Filter wieder aufzuheben und zur kursweiten Auswahl zurückzukehren.
 */
export function ThemaFilterBadge({ themaTitle, onClear }: { themaTitle: string; onClear: () => void }) {
  return (
    <div className="thema-filter-badge">
      <span>
        Gefiltert: <b>{themaTitle}</b>
      </span>
      <button type="button" className="link-muted-btn" onClick={onClear}>
        ✕ Alle Themen
      </button>
    </div>
  );
}
