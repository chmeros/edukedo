import { Duell } from "./Duell";
import { FriendCircle } from "./FriendCircle";
import { Highscore } from "./Highscore";
import { Kohorte } from "./Kohorte";
import { Lernpartner } from "./Lernpartner";
import { trpc } from "./trpc";

/**
 * F-107: Eigenständiger Haupt-Tab "Sozial" — löst den bisherigen, mit "Erfolge" kombinierten
 * Unter-Tab "Sozial & Erfolge" im Fortschritt-Tab ab (siehe Architekturplanung Abschnitt 13).
 * Bündelt die Freundeskreis-/Gamification-Features mit Fremdkontakt (F-60/F-61/F-62/F-63) sowie
 * die Kohorten-/Dozenten-Funktion (F-07/F-64/F-65, `Kohorte.tsx` — Beitritt erweitert automatisch
 * den Freundeskreis); die
 * fremdkontaktfreien Achievements (F-67) sind seither ein eigener Tab "Erfolge"
 * (`Achievements.tsx`, direkt in App.tsx). `fachgebiete` kam bisher von `Progress.tsx`
 * (bereits über `progress.overview` geladen) — jetzt eine eigene, schlanke Abfrage hier, da
 * "Sozial" unabhängig von "Fortschritt" aufrufbar ist.
 */
export function Sozial({
  kursId,
  isMinor,
  gamificationEnabled,
}: {
  kursId: string;
  isMinor: boolean;
  gamificationEnabled: boolean;
}) {
  const overview = trpc.progress.overview.useQuery({ kursId });
  const fachgebiete = (overview.data ?? []).map((entry) => ({ id: entry.id, title: entry.title }));

  return (
    <div className="stack">
      <FriendCircle kursId={kursId} />
      <Kohorte kursId={kursId} />
      <Highscore kursId={kursId} isMinor={isMinor} gamificationEnabled={gamificationEnabled} />
      <Duell kursId={kursId} isMinor={isMinor} gamificationEnabled={gamificationEnabled} />
      <Lernpartner kursId={kursId} fachgebiete={fachgebiete} isMinor={isMinor} gamificationEnabled={gamificationEnabled} />
    </div>
  );
}
