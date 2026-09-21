import { useState } from "react";

const QUIZ_COUNT_OPTIONS = [10, 20, 30, 50];

/**
 * F-22: Themenbezogenes Übungsset mit frei wählbarer Fragenzahl — bewusst als einklappbare,
 * optionale Auswahl statt eines verbindlichen Setup-Schritts vor jeder Runde (Nutzer-
 * Entscheidung 21.09.2026, siehe Architekturplanung Abschnitt 13): Eine Runde startet weiterhin
 * sofort mit der zuletzt gewählten (Default 20) Fragenzahl, ohne zusätzlichen Klick — die
 * Anpassung ist nur bei Bedarf sichtbar, um den mit F-104 bewusst reibungsarm gehaltenen
 * Lernablauf nicht zu verkomplizieren.
 */
export function QuizCountControl({ count, onChange }: { count: number; onChange: (count: number) => void }) {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <button type="button" className="link-muted-btn" onClick={() => setExpanded(true)}>
        {count} Fragen · Anzahl anpassen
      </button>
    );
  }

  return (
    <div className="list-row-actions">
      {QUIZ_COUNT_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={option === count ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={() => {
            onChange(option);
            setExpanded(false);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
