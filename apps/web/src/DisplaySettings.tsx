import { trpc } from "./trpc";
import { setCalmMode, setFachbegriffe, setTheme, useCalmMode, useFachbegriffe, useTheme, type Theme } from "./displayPrefs";

const THEME_OPTIONS: { id: Theme; label: string }[] = [
  { id: "system", label: "Wie das Gerät" },
  { id: "light", label: "Hell" },
  { id: "dark", label: "Dunkel" },
];

/**
 * F-155: Darstellung (Hell/Dunkel) und „Ruhiger Modus" — Einstellungen dieses Browsers, siehe
 * displayPrefs.ts. Sofort wirksame Auswahl ohne Speichern-Button, analog zu den übrigen
 * Einstellungs-Widgets.
 */
export function DisplaySettings({ kursId = null }: { kursId?: string | null }) {
  const theme = useTheme();
  const calm = useCalmMode();
  const fachbegriffe = useFachbegriffe();
  // Review UXT-I-14: Die Einstellung betrifft nur Kurse mit Glossar; ohne Glossareinträge (oder ohne Kurs) bliebe sie wirkungslos.
  // Gleicher Abfrage-Schlüssel wie in Fachbegriffe.tsx, die Liste wird also nur einmal je Kurs geladen.
  const glossar = trpc.glossar.list.useQuery({ kursId: kursId ?? "" }, { enabled: kursId !== null, staleTime: Infinity });
  const hatGlossar = (glossar.data?.length ?? 0) > 0;

  return (
    <div className="stack">
      <span className="stat-subheading">Darstellung</span>
      <div className="segmented" role="group" aria-label="Farbschema">
        {THEME_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={theme === option.id ? "is-active" : ""}
            aria-pressed={theme === option.id}
            onClick={() => setTheme(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={calm} onChange={(event) => setCalmMode(event.target.checked)} />
        Ruhiger Modus
      </label>
      <span className="field-hint">
        Blendet Punktehamster, Lernserie und Credits aus und versteckt den Countdown in der Prüfungssimulation —
        für entspanntes Lernen ohne Spielelemente. Gilt nur für diesen Browser.
      </span>
      {/* F-165: Fachbegriffe nach der Antwort markieren — nur für Kurse mit Glossar (UXT-I-14) */}
      {hatGlossar && (
        <>
          <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={fachbegriffe} onChange={(event) => setFachbegriffe(event.target.checked)} />
            Fachbegriffe nach der Antwort markieren
          </label>
          <span className="field-hint">
            Hebt Begriffe mit Kurzerklärung in Erklärungen und aufgedeckten Karteikarten hervor — erst nach der Antwort, nie
            davor. Gilt nur für diesen Browser.
          </span>
        </>
      )}
    </div>
  );
}
