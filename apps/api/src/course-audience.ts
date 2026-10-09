/**
 * F-13: Zielgruppen-Eignung je Kurs über das generische metadata-JSON-Feld
 * (`kurs.metadata.zielgruppe`) statt einer eigenen Spalte — siehe Architekturplanung
 * Abschnitt 13. Ein fehlendes/unbekanntes Feld gilt als "alle" (keine Einschränkung),
 * damit bestehende Kurse ohne dieses Feld (z. B. der Demo-Kurs) unverändert für
 * jede Altersgruppe sichtbar bleiben.
 */
export type KursZielgruppe = "minderjaehrige" | "erwachsene" | "alle";

export function kursZielgruppe(metadata: unknown): KursZielgruppe {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const value = (metadata as Record<string, unknown>).zielgruppe;
    if (value === "minderjaehrige" || value === "erwachsene") {
      return value;
    }
  }
  return "alle";
}

/**
 * Review-Befund SEC-02: Ob sich ein Kurs (auch) an Minderjährige richtet, hängt nicht allein am Feld `zielgruppe`. Der
 * Mathematik-Kurs trägt es bewusst nicht ("alle", damit Erwachsene den Schulstoff auffrischen können), ist aber ein Schulfach.
 * Als an Minderjährige gerichtet gelten deshalb: `zielgruppe: "minderjaehrige"`, die Kategorie "schule" oder eine
 * Klassenstufe in den Metadaten. Eine ausdrückliche `zielgruppe: "erwachsene"` hat Vorrang.
 */
export function kursTargetsMinors(metadata: unknown): boolean {
  const zielgruppe = kursZielgruppe(metadata);
  if (zielgruppe === "minderjaehrige") return true;
  if (zielgruppe === "erwachsene") return false;
  if (kursKategorie(metadata) === "schule") return true;
  return typeof (metadata as Record<string, unknown> | null)?.klassenstufe === "number";
}

export function matchesKursZielgruppe(zielgruppe: KursZielgruppe, isMinor: boolean): boolean {
  switch (zielgruppe) {
    case "minderjaehrige":
      return isMinor;
    case "erwachsene":
      return !isMinor;
    case "alle":
      return true;
  }
}

/**
 * F-102: Kurskategorie über dasselbe generische metadata-JSON-Feld wie zielgruppe (Anforderungs-
 * katalog Abschnitt 5.13/4, Architekturplanung Abschnitt 13). Ein fehlendes/unbekanntes Feld
 * gilt als "unbekannt" — keine Belegungs-Exklusivität (siehe isEnrollmentExclusive), analog zum
 * "alle"-Fallback bei kursZielgruppe.
 */
export type KursKategorie = "erwachsenenbildung" | "schule" | "unbekannt";

export function kursKategorie(metadata: unknown): KursKategorie {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const value = (metadata as Record<string, unknown>).kategorie;
    if (value === "erwachsenenbildung" || value === "schule") {
      return value;
    }
  }
  return "unbekannt";
}

/**
 * F-102: Nur Kurse der Kategorie "erwachsenenbildung" beschränken F-09 auf de facto eine
 * aktive Belegung gleichzeitig — Schulkurse und unkategorisierte Kurse (z. B. der technische
 * Demo-Kurs) bleiben von der Einschränkung unberührt.
 */
export function isEnrollmentExclusive(kategorie: KursKategorie): boolean {
  return kategorie === "erwachsenenbildung";
}

/**
 * Review UXT-I-12: Der technische Demo-Kurs (`db:seed`, type "demo", veröffentlicht) darf in Produktion
 * nicht beitretbar sein. Gilt nur für neue Beitritte; wer ihn schon belegt hat, behält den Zugriff.
 */
export function istDemoKursGesperrt(kursType: string, nodeEnv: string): boolean {
  return kursType === "demo" && nodeEnv === "production";
}
