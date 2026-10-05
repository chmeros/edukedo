import { useEffect, useState } from "react";
import { KennzahlenDuellIllustration, KreuzwortraetselIllustration, MemoryIllustration } from "./GameIllustrations";
import { KennzahlenDuell } from "./KennzahlenDuell";
import { Kreuzwortraetsel } from "./Kreuzwortraetsel";
import { PersonalkennzahlenMemory } from "./PersonalkennzahlenMemory";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung
 * Abschnitt 13): Spiele-Katalog — exakt nach dem `Instrumente.tsx`-Muster (F-105): die drei
 * Spiele sind hier bewusst als STATISCHE Liste hinterlegt (keine eigene DB-Tabelle für den
 * Katalog selbst nötig — feste, im Code bekannte Menge), `game.available` liefert nur, welche
 * davon in diesem Kurs tatsächlich Content haben (aktuell Fachwirt-spezifisch, der Mathe-Kurs
 * zeigt "noch nicht verfügbar", analog zu Instrumenten ohne Kurs-Content).
 *
 * Nutzer-Vorgabe vom 28.09.2026: Kacheln statt Listenzeilen (siehe GameIllustrations.tsx; seit F-144
 * über die gemeinsame `Tile`-Komponente), sowie
 * `onActiveGameChange` — meldet an `App.tsx`, ob gerade ein Spiel läuft, damit der darunter
 * gerenderte Sozial-Bereich (`Sozial.tsx`) während eines laufenden Spiels ausgeblendet werden
 * kann (Fokus aufs Spiel).
 */
const GAME_CATALOG = [
  {
    type: "kreuzwortraetsel",
    label: "Kreuzworträtsel",
    description: "Zehn wichtige Fachbegriffe anhand kurzer Hinweise im Gitter erkennen.",
    Illustration: KreuzwortraetselIllustration,
  },
  {
    type: "kennzahlen_duell",
    label: "Duell",
    description: "In kurzen Entweder-oder-Duellen ähnliche Begriffe sicher unterscheiden.",
    Illustration: KennzahlenDuellIllustration,
  },
  {
    type: "memory",
    label: "Memory",
    description: "Begriffe und ihre Bedeutung als Karten-Paare zuordnen.",
    Illustration: MemoryIllustration,
  },
] as const;

export function Spiele({ kursId, onActiveGameChange }: { kursId: string; onActiveGameChange?: (active: boolean) => void }) {
  const available = trpc.game.available.useQuery({ kursId });
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    onActiveGameChange?.(activeGame !== null);
    // Beim Verlassen des Tabs (Unmount) den Fokus-Modus wieder aufheben, damit ein
    // Tab-Wechsel mitten im Spiel den Sozial-Bereich nicht dauerhaft ausgeblendet lässt.
    return () => onActiveGameChange?.(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGame]);

  // F-157: Titel je Kurs aus `game.title` (der statische Katalog-Name dient nur als Rückfall).
  const titleFor = (type: string) =>
    available.data?.find((row) => row.gameType === type)?.title ?? GAME_CATALOG.find((entry) => entry.type === type)?.label ?? "Spiel";
  if (activeGame === "kreuzwortraetsel") {
    return <Kreuzwortraetsel kursId={kursId} title={titleFor(activeGame)} onClose={() => setActiveGame(null)} />;
  }
  if (activeGame === "kennzahlen_duell") {
    return <KennzahlenDuell kursId={kursId} title={titleFor(activeGame)} onClose={() => setActiveGame(null)} />;
  }
  if (activeGame === "memory") {
    return <PersonalkennzahlenMemory kursId={kursId} title={titleFor(activeGame)} onClose={() => setActiveGame(null)} />;
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
      <div className="tile-grid">
        {GAME_CATALOG.map((entry) => {
          const isAvailable = available.data?.some((row) => row.gameType === entry.type) ?? false;
          return (
            <Tile
              key={entry.type}
              title={titleFor(entry.type)}
              description={entry.description}
              image={<entry.Illustration />}
              disabled={!isAvailable}
              note={!isAvailable ? "In diesem Kurs noch nicht verfügbar" : undefined}
              onClick={() => setActiveGame(entry.type)}
            />
          );
        })}
      </div>
    </div>
  );
}
