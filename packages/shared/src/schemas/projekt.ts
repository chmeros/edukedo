import { z } from "zod";

/**
 * F-161: "Mein Projekt" für die Fachgesprächs-Vorbereitung (betriebliches Projekt der
 * Fachinformatiker-Kurse). Die neun Leitfelder sind ein fester Satz (Reihenfolge = Reihenfolge der
 * Erzählung im Fachgespräch); Beschriftungen und Nachfragen stehen im Frontend
 * (apps/web/src/Projekthilfe.tsx). Die Checkliste ist wie beim Präsentationsentwurf (F-24) ein
 * freies Key→Boolean-Mapping, damit sich die Punkte ohne Schema-Änderung anpassen lassen.
 */
export const PROJEKT_FELD_KEYS = [
  "titel",
  "umfeld",
  "ausgangssituation",
  "ziel",
  "umsetzung",
  "entscheidung",
  "schwierigkeit",
  "ergebnis",
  "fazit",
] as const;
export type ProjektFeldKey = (typeof PROJEKT_FELD_KEYS)[number];

export const PROJEKT_FELD_MAX_LENGTH = 2000;

export const projektFelderSchema = z.record(z.enum(PROJEKT_FELD_KEYS), z.string().max(PROJEKT_FELD_MAX_LENGTH));

export const saveProjektProfilInputSchema = z.object({
  kursId: z.string().uuid(),
  felder: projektFelderSchema,
  checklist: z.record(z.string().min(1).max(60), z.boolean()).refine((map) => Object.keys(map).length <= 50, {
    message: "Zu viele Checklistenpunkte.",
  }),
});
export type SaveProjektProfilInput = z.infer<typeof saveProjektProfilInputSchema>;
