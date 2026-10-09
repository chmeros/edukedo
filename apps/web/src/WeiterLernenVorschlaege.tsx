import { useState } from "react";
import { pluralDe } from "./plural";
import { NachlesenButton } from "./TheorieReader";

export interface LernVorschlag {
  themaId: string;
  title: string;
  dueCount: number;
  overdueDays: number;
  weakPercent: number | null;
}

/**
 * F-108: „Weiter, wo du aufgehört hast“ auf Themen-Ebene (Nutzer-Entscheidung 21.09.2026); der oberste Vorschlag (`is-primary`) bleibt
 * derselbe wie in F-27. Review UXT-B-11/I-03: Auf schmalen Bildschirmen füllten bis zu fünf Karten den ersten Bildschirm; dort zeigt die
 * Liste zunächst zwei und blendet den Rest hinter „Weitere Vorschläge“ ein (das Ausblenden macht die Formatvorlage, am Desktop sind
 * immer alle sichtbar). Unter jeder Karte steht „Im Thema nachlesen“ (UXT-B-04).
 */
export function WeiterLernenVorschlaege({
  vorschlaege,
  onWaehle,
}: {
  vorschlaege: LernVorschlag[];
  onWaehle: (themaId: string, title: string) => void;
}) {
  const [alle, setAlle] = useState(false);
  if (vorschlaege.length === 0) return null;

  return (
    <>
      <span className="field-hint">Weiter, wo du aufgehört hast:</span>
      <div className={alle ? "suggestion-row is-alle" : "suggestion-row"}>
        {vorschlaege.map((vorschlag, position) => (
          <div key={vorschlag.themaId} className="suggestion-item">
            <button
              type="button"
              className={position === 0 ? "suggestion-chip is-primary" : "suggestion-chip"}
              onClick={() => onWaehle(vorschlag.themaId, vorschlag.title)}
            >
              <span className="suggestion-title">{vorschlag.title}</span>
              <span className="suggestion-reason">
                {vorschlag.dueCount > 0
                  ? `${pluralDe(vorschlag.dueCount, "Karte", "Karten")} fällig${vorschlag.overdueDays > 0 ? `, ${pluralDe(vorschlag.overdueDays, "Tag", "Tage")} überfällig` : ""}`
                  : vorschlag.weakPercent !== null
                    ? `${vorschlag.weakPercent} % Trefferquote`
                    : "Zum Wiederholen"}
              </span>
            </button>
            <NachlesenButton themaId={vorschlag.themaId} themaTitle={vorschlag.title} />
          </div>
        ))}
      </div>
      {vorschlaege.length > 2 && (
        <button type="button" className="link-muted-btn suggestion-mehr" aria-expanded={alle} onClick={() => setAlle((aktuell) => !aktuell)}>
          {alle ? "Weniger Vorschläge" : `Weitere Vorschläge (${vorschlaege.length - 2})`}
        </button>
      )}
    </>
  );
}
