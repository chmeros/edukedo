/**
 * Rechtsstand eines Themas (UXT-B-13, Entwicklungsplan „Rechtsstand in der Theorie (R4)“).
 *
 * Die Themendateien tragen im Frontmatter `rechtsstand: "23.10.2026 — rechtliche Passagen vor
 * Verwendung durch echte Lernende fachlich/rechtlich prüfen"`. Für Lernende ist nur der Teil vor dem
 * Gedankenstrich bestimmt (Datum, ggf. mit einem Klammerzusatz); der Rest ist ein interner
 * Prüfvermerk für die Redaktion und wird nicht angezeigt.
 */
export const RECHTSSTAND_TRENNER = " — ";

/** Teil vor „ — “ (getrimmt) oder `null`, wenn der Wert leer ist bzw. nichts davor steht. */
export function rechtsstandDatum(wert: string | null | undefined): string | null {
  if (typeof wert !== "string") return null;
  const teil = wert.split(RECHTSSTAND_TRENNER)[0]!.trim();
  return teil === "" ? null : teil;
}

/**
 * Hinweistext für das Lesefenster, `null` ohne Rechtsstand. Angezeigt wird er nur, wenn der Vermerk rechtliche Inhalte
 * meint (enthält „recht“, z. B. „rechtliche Passagen … prüfen“); Themen ohne Rechtsbezug (z. B. Mathematik: „fachlich gegenlesen“)
 * bekommen keinen Rechtshinweis.
 */
export function rechtsstandHinweis(wert: string | null | undefined): string | null {
  const datum = rechtsstandDatum(wert);
  if (!datum || !/recht/i.test(wert ?? "")) return null;
  return `Rechtlicher Stand: ${datum}. Ohne Gewähr, keine Rechtsberatung; rechtliche Passagen vor Verwendung prüfen.`;
}
