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

export const joinCohortInputSchema = z.object({
  code: z.string().trim().min(1),
});
export type JoinCohortInput = z.infer<typeof joinCohortInputSchema>;
