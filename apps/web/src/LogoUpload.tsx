import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { leseLogoDatei, LOGO_TYPEN, pruefeLogoDatei, type GelesenesLogo } from "./logoDatei";

/**
 * Auswahl einer Logo-Datei (Entscheidung 09.10.2026: Upload statt externer Adresse). Zeigt das aktuelle Logo, prüft die Datei
 * vorab im Browser und übergibt sie als Base64 an den Aufrufer; Speichern, Ersetzen und Entfernen laufen dort über den Server.
 */
export function LogoUpload({
  id,
  label,
  logoUrl,
  onSelect,
  onRemove,
  disabled,
  serverFehler,
}: {
  id: string;
  label: string;
  /** Aktuell gespeichertes oder gerade gewähltes Logo (Adresse oder data:-Vorschau). */
  logoUrl: string | null;
  onSelect: (logo: GelesenesLogo) => void;
  onRemove?: () => void;
  disabled?: boolean;
  serverFehler?: string;
}) {
  const [fehler, setFehler] = useState<string | null>(null);

  async function waehle(datei: File | undefined) {
    setFehler(null);
    if (!datei) return;
    const problem = pruefeLogoDatei(datei);
    if (problem) {
      setFehler(problem);
      return;
    }
    try {
      onSelect(await leseLogoDatei(datei));
    } catch (error) {
      setFehler(error instanceof Error ? error.message : "Die Datei konnte nicht gelesen werden.");
    }
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {logoUrl ? (
          <img src={logoUrl} alt="Aktuelles Logo" style={{ height: 32, width: "auto", maxWidth: 160, objectFit: "contain" }} />
        ) : (
          <span className="field-hint">Kein Logo hinterlegt</span>
        )}
        <input
          className="input"
          id={id}
          type="file"
          accept={LOGO_TYPEN.join(",")}
          disabled={disabled}
          onChange={(event) => {
            void waehle(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        {onRemove && logoUrl && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onRemove} disabled={disabled}>
            Logo entfernen
          </button>
        )}
      </div>
      <span className="field-hint">
        PNG, JPG oder WebP, höchstens 200 KB, 16 bis 1024 Pixel je Seite. Das Logo ist für alle sichtbar, die das Banner sehen; bitte
        keine Bilder mit persönlichen Angaben (z. B. Ortsdaten in den Bildinfos).
      </span>
      {(fehler || serverFehler) && <ErrorMessage>{fehler ?? serverFehler}</ErrorMessage>}
    </div>
  );
}
