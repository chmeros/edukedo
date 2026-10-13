/**
 * Geschütztes Leerzeichen zwischen Zahl und Einheit (Kosmetik, Entscheidung 13.10.2026): In schmalen Tabellenspalten des
 * Theorie-Lesefensters brach „2.000,00 €“ am Leerzeichen in „2.000,00“ und „€“ um. Die Hausregel (`content/README.md`,
 * „Schreibweise“) verlangt das Leerzeichen vor €, % und Einheiten; es soll nur nicht umbrechen. Statt Tausende Content-Items zu
 * ändern (jede Änderung würde den Import und die Schlüssel der Fachgesprächsfragen berühren), ersetzt die Anzeige das Leerzeichen
 * vor dem Rendern durch U+00A0. Der Inhalt in der Datenbank bleibt unverändert.
 */

const NBSP = "\u00a0";

/** Einheiten, nach denen ein Leerzeichen nach einer Zahl nicht umbrechen soll (längste zuerst, damit „mm“ vor „m“ greift). */
const EINHEITEN = [
  "€", "%", "‰", "°C", "°",
  "N/mm²", "m/min", "l/min", "m/s", "min⁻¹", "dB(A)", "dB",
  "mm²", "cm²", "m²", "mm³", "cm³", "m³",
  "kWh", "kW", "MPa", "kPa", "bar", "Pa", "Hz", "kN", "kJ", "kg", "km", "mm", "cm", "µm", "PLN", "USD", "EUR",
  "m", "g", "t", "l", "h", "s", "V", "W", "N", "J",
].sort((a, b) => b.length - a.length);

const ESCAPED = EINHEITEN.map((einheit) => einheit.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|");

/** Ziffer, ein normales Leerzeichen, dann eine Einheit, auf die kein weiterer Buchstabe oder Hochzahl folgt („5 mm“, nicht „5 mal“). */
const ZAHL_EINHEIT = new RegExp(`(\\d) (?=(?:${ESCAPED})(?![A-Za-zÄÖÜäöüß0-9²³⁻]))`, "g");

/**
 * Ersetzt in Markdown-Text das Leerzeichen zwischen Zahl und Einheit durch ein geschütztes Leerzeichen. Codeblöcke (``` … ```)
 * bleiben unverändert. Die Funktion ändert keine Zeichen außer diesem einen Leerzeichen; Überschriften-Anker (`headingSlug`)
 * bleiben gleich, weil dort jede Folge von Nicht-Buchstaben zu „-“ wird.
 */
export function schuetzeZahlUndEinheit(markdown: string): string {
  let imCodeblock = false;
  return markdown
    .split("\n")
    .map((zeile) => {
      if (/^\s*```/.test(zeile)) {
        imCodeblock = !imCodeblock;
        return zeile;
      }
      return imCodeblock ? zeile : zeile.replace(ZAHL_EINHEIT, `$1${NBSP}`);
    })
    .join("\n");
}
