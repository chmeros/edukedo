import { z } from "zod";

/**
 * F-62: Lernpartner-Vermittlung — 1:1, innerhalb des eigenen Freundeskreises (F-63), auf Basis
 * von Prüfungstermin (`user_course.target_date`, bereits vorhanden) und/oder Handlungsbereich
 * (neue, optionale `user_course.lernpartner_fachgebiet_id`-Präferenz). Ausdrücklich ohne
 * Forum/Chat — die App zeigt nur Übereinstimmungen an, der Kontakt läuft über die bereits
 * sichtbare E-Mail-Adresse (siehe FriendCircle.tsx), nicht über einen eigenen Nachrichtenkanal.
 */
export const setLernpartnerFachgebietInputSchema = z.object({
  kursId: z.string().uuid(),
  fachgebietId: z.string().uuid().nullable(),
});
export type SetLernpartnerFachgebietInput = z.infer<typeof setLernpartnerFachgebietInputSchema>;

export const lernpartnerKursInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type LernpartnerKursInput = z.infer<typeof lernpartnerKursInputSchema>;
