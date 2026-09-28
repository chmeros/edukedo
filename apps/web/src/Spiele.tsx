import { useState } from "react";
import { KennzahlenDuell } from "./KennzahlenDuell";
import { Kreuzwortraetsel } from "./Kreuzwortraetsel";
import { PersonalkennzahlenMemory } from "./PersonalkennzahlenMemory";
import { trpc } from "./trpc";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung
 * Abschnitt 13): Spiele-Katalog — exakt nach dem `Instrumente.tsx`-Muster (F-105): die drei
 * Spiele sind hier bewusst als STATISCHE Liste hinterlegt (keine eigene DB-Tabelle für den
 * Katalog selbst nötig — feste, im Code bekannte Menge), `game.available` liefert nur, welche
 * davon in diesem Kurs tatsächlich Content haben (aktuell Fachwirt-spezifisch, der Mathe-Kurs
 * zeigt "noch nicht verfügbar", analog zu Instrumenten ohne Kurs-Content).
 */
const GAME_CATALOG = [
  {
    type: "kreuzwortraetsel",
    label: "Kreuzworträtsel: Finanzkennzahlen",
    description: "Zehn wichtige Finanzkennzahlen anhand kurzer Hinweise im Gitter erkennen.",
  },
  {
    type: "kennzahlen_duell",
    label: "Kennzahlen-Duell: Qualitätsmanagement und Prozesse",
    description: "In kurzen Entweder-oder-Duellen ähnliche Kennzahlen sicher unterscheiden.",
  },
  {
    type: "memory",
    label: "Kennzahlen-Memory: Personal",
    description: "Personalkennzahlen und ihre Bedeutung als Karten-Paare zuordnen.",
  },
] as const;

export function Spiele({ kursId }: { kursId: string }) {
  const available = trpc.game.available.useQuery({ kursId });
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === "kreuzwortraetsel") {
    return <Kreuzwortraetsel kursId={kursId} onClose={() => setActiveGame(null)} />;
  }
  if (activeGame === "kennzahlen_duell") {
    return <KennzahlenDuell kursId={kursId} onClose={() => setActiveGame(null)} />;
  }
  if (activeGame === "memory") {
    return <PersonalkennzahlenMemory kursId={kursId} onClose={() => setActiveGame(null)} />;
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Spiele</h2>
      </div>
      <p className="field-hint">
        Fachbegriffe und Kennzahlen spielerisch üben — jedes Spiel wertet deine Fortschritte sofort in Punktehamster,
        Creditstand und Lernserie mit.
      </p>
      <div className="list" style={{ marginTop: 10 }}>
        {GAME_CATALOG.map((entry) => {
          const isAvailable = available.data?.some((row) => row.gameType === entry.type);
          return (
            <div key={entry.type} className="list-row">
              <div className="meta">
                {entry.label}
                <span>{entry.description}</span>
              </div>
              <div className="list-row-actions">
                {isAvailable ? (
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveGame(entry.type)}>
                    Spiel starten
                  </button>
                ) : (
                  <span className="field-hint">In diesem Kurs noch nicht verfügbar</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
