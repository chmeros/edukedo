import { pruefungsbereichSchema, type Pruefungsbereich } from "@edukedo/shared";
import { z } from "zod";

/**
 * F-149/F-150: liest die Prüfungsbereiche und die Präsentationsdauer eines Kurses aus dem
 * generischen `kurs.metadata`-JSON (wie `zielgruppe`/`kategorie`, siehe course-audience.ts).
 * Fehlende oder ungültige Angaben ergeben `[]` bzw. den bisherigen Standard von 10 Minuten —
 * Kurse ohne diese Angaben verhalten sich unverändert.
 */
export const DEFAULT_PRESENTATION_MINUTES = 10;

export function kursPruefungsbereiche(metadata: unknown): Pruefungsbereich[] {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const parsed = z.array(pruefungsbereichSchema).safeParse((metadata as Record<string, unknown>).pruefungsbereiche);
    if (parsed.success) return parsed.data;
  }
  return [];
}

export function kursPresentationMinutes(metadata: unknown): number {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const value = (metadata as Record<string, unknown>).presentationMinutes;
    if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  }
  return DEFAULT_PRESENTATION_MINUTES;
}

/**
 * F-154: kurze Beschreibung des Prüfungsablaufs als Stichpunkte (`kurs.metadata.pruefungsablauf`),
 * für die Hilfeseite „Gelassen bleiben" — fehlt die Angabe, ist die Liste leer.
 */
export function kursPruefungsablauf(metadata: unknown): string[] {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const parsed = z.array(z.string().min(1)).safeParse((metadata as Record<string, unknown>).pruefungsablauf);
    if (parsed.success) return parsed.data;
  }
  return [];
}
