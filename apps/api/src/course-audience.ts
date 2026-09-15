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
