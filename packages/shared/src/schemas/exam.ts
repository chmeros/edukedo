import { z } from "zod";

/**
 * F-23 Prüfungssimulation "Schriftliche Prüfung": zeitlich begrenzt, situationsbezogene
 * Fallaufgaben über mehrere Fachgebiete (Handlungsbereiche) hinweg. Die Zeitbegrenzung ist
 * bewusst rein clientseitig (Countdown in apps/web/src/Exam.tsx) und wird server-seitig nicht
 * erzwungen — ein Selbstlern-Werkzeug, kein beaufsichtigter Prüfungsmodus, siehe
 * Architekturplanung Abschnitt 13.
 */
/**
 * F-149 (Prüfungsbereiche, Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13):
 * Ein Kurs kann in `kurs.metadata.pruefungsbereiche` die Prüfungsbereiche seiner echten
 * schriftlichen Abschlussprüfung hinterlegen (Name, Prüfungsteil, vorgeschriebene Dauer, zugehörige
 * Fachgebiete über `fachgebiet.code`). Kurse ohne diese Angabe behalten die freie Mischprüfung.
 */
export const pruefungsbereichSchema = z.object({
  key: z.string().min(1).max(64),
  title: z.string().min(1),
  part: z.string().min(1),
  minutes: z.number().int().positive(),
  fachgebietCodes: z.array(z.string().min(1)).min(1),
});
export type Pruefungsbereich = z.infer<typeof pruefungsbereichSchema>;

export const startExamInputSchema = z.object({
  kursId: z.string().uuid(),
  /** Optional: Prüfungsbereich aus `kurs.metadata.pruefungsbereiche`; ohne Angabe die freie Mischprüfung. */
  pruefungsbereichKey: z.string().min(1).max(64).optional(),
});
export type StartExamInput = z.infer<typeof startExamInputSchema>;

export const examPartAnswerSchema = z.object({
  answerText: z.string(),
  selfAssessedPoints: z.number().min(0),
});
export type ExamPartAnswer = z.infer<typeof examPartAnswerSchema>;

/**
 * Selbsteinschätzung je Teilaufgabe (analog zum Karteikarten-Modus F-20): Fallaufgaben sind
 * freie Situationsaufgaben ohne automatisch prüfbare "richtige" Antwort — die Musterlösungs-
 * hinweise werden nach dem eigenen Antwortversuch eingeblendet, die Punktzahl je Teilaufgabe
 * schätzt die lernende Person danach selbst ein (serverseitig auf die mögliche Punktzahl der
 * jeweiligen Teilaufgabe begrenzt, siehe exam.ts).
 */
export const submitExamAnswerInputSchema = z.object({
  sessionId: z.string().uuid(),
  contentItemId: z.string().uuid(),
  parts: z.array(examPartAnswerSchema).min(1),
});
export type SubmitExamAnswerInput = z.infer<typeof submitExamAnswerInputSchema>;

export const finishExamInputSchema = z.object({ sessionId: z.string().uuid() });
export type FinishExamInput = z.infer<typeof finishExamInputSchema>;
