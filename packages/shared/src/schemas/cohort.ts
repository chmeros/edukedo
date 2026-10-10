import { z } from "zod";

/**
 * F-07/F-64/F-65: Lehrgangsgruppen (Kohorten), je Kurs angelegt. Siehe
 * apps/api/src/trpc/routers/cohort.ts für die Dozenten-Autorisierung (Eigentümerschaft statt
 * eigener Rolle) und die aggregierten Kennzahlen (F-64).
 */
export const cohortKursInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type CohortKursInput = z.infer<typeof cohortKursInputSchema>;

export const createCohortInputSchema = z.object({
  kursId: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
});
export type CreateCohortInput = z.infer<typeof createCohortInputSchema>;

export const cohortIdInputSchema = z.object({
  cohortId: z.string().uuid(),
});
export type CohortIdInput = z.infer<typeof cohortIdInputSchema>;

/**
 * Review UXL-06: Zeitraum, in dem ein Mitglied als „aktiv“ zählt (mindestens eine beantwortete Aufgabe). Vorher fest 30 Tage; die
 * Leitung wählt jetzt 7, 30 oder 90 Tage (Standard 30).
 */
export const COHORT_ACTIVE_WINDOW_DAYS = [7, 30, 90] as const;
export const cohortStatsInputSchema = z.object({
  cohortId: z.string().uuid(),
  days: z.union([z.literal(7), z.literal(30), z.literal(90)]).default(30),
});
export type CohortStatsInput = z.infer<typeof cohortStatsInputSchema>;

/**
 * Review UXL-04: Wer beitritt, bestätigt vorher, was die Gruppe sieht (Dozent:in: E-Mail-Adresse, Beitrittsdatum und
 * Gruppenkennzahlen; Mitglieder werden Freunde). Die Bestätigung gehört zum Beitritt und wird serverseitig verlangt.
 */
export const joinCohortInputSchema = z.object({
  code: z.string().trim().min(1),
  confirmed: z.literal(true, { errorMap: () => ({ message: "Bitte bestätige den Hinweis zur Sichtbarkeit in der Gruppe." }) }),
});
export type JoinCohortInput = z.infer<typeof joinCohortInputSchema>;

/** Review UXL-05: Verwaltung durch die Dozent:in (umbenennen, Mitglied entfernen). */
export const renameCohortInputSchema = z.object({
  cohortId: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
});
export type RenameCohortInput = z.infer<typeof renameCohortInputSchema>;

export const removeCohortMemberInputSchema = z.object({
  cohortId: z.string().uuid(),
  userId: z.string().uuid(),
});
export type RemoveCohortMemberInput = z.infer<typeof removeCohortMemberInputSchema>;
