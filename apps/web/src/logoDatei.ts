/**
 * Logo-Upload (Entscheidung 09.10.2026): Vorabprüfung im Browser für eine schnelle Rückmeldung. Maßgeblich ist die Prüfung auf dem
 * Server (apps/api/src/branding/logo.ts); sie wird hier nicht ersetzt, sondern nur vorweggenommen.
 */
export const LOGO_TYPEN = ["image/png", "image/jpeg", "image/webp"] as const;
export const LOGO_MAX_BYTES = 200 * 1024;

export interface GelesenesLogo {
  /** Reines Base64 ohne "data:"-Präfix, wie es der Server erwartet. */
  base64: string;
  /** Adresse für die Vorschau im Browser. */
  vorschauUrl: string;
}

export function pruefeLogoDatei(datei: File): string | null {
  if (!(LOGO_TYPEN as readonly string[]).includes(datei.type)) {
    return "Erlaubt sind nur PNG-, JPG- und WebP-Bilder (kein SVG).";
  }
  if (datei.size > LOGO_MAX_BYTES) {
    return `Das Logo ist zu groß (höchstens ${Math.round(LOGO_MAX_BYTES / 1024)} KB, deine Datei hat ${Math.round(datei.size / 1024)} KB).`;
  }
  return null;
}

export function leseLogoDatei(datei: File): Promise<GelesenesLogo> {
  return new Promise((resolve, reject) => {
    const leser = new FileReader();
    leser.onerror = () => reject(new Error("Die Datei konnte nicht gelesen werden."));
    leser.onload = () => {
      const ergebnis = String(leser.result);
      const komma = ergebnis.indexOf(",");
      if (!ergebnis.startsWith("data:") || komma < 0) {
        reject(new Error("Die Datei konnte nicht gelesen werden."));
        return;
      }
      resolve({ base64: ergebnis.slice(komma + 1), vorschauUrl: ergebnis });
    };
    leser.readAsDataURL(datei);
  });
}
