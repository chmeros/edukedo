import { setCalmMode, setTheme, useCalmMode, useTheme, type Theme } from "./displayPrefs";

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
export function DisplaySettings() {
  const theme = useTheme();
  const calm = useCalmMode();

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
    </div>
  );
}
