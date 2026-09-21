import { z } from "zod";

/**
 * Selbsteinschätzung im Karteikarten-Modus (F-20, Anforderungskatalog Abschnitt 5.3) —
 * entspricht user_progress.last_result (Architekturplanung Abschnitt 4.3). Wird im
 * Backend auf ein FSRS-Grade (Again/Hard/Good) abgebildet, siehe Abschnitt 13.
 */
export const reviewResultSchema = z.enum(["gewusst", "unsicher", "nicht_gewusst"]);
export type ReviewResult = z.infer<typeof reviewResultSchema>;

export const submitReviewInputSchema = z.object({
  contentItemId: z.string().uuid(),
  result: reviewResultSchema,
});
export type SubmitReviewInput = z.infer<typeof submitReviewInputSchema>;

/**
 * F-31 Lernzeit-Tracking (explizites Start/Heartbeat/Ende, siehe
 * apps/web/src/useLearningSession.ts und Architekturplanung Abschnitt 13): pingSession/
 * endSession beziehen sich per sessionId auf eine zuvor mit startSession angelegte Sitzung.
 */
export const sessionIdInputSchema = z.object({ sessionId: z.string().uuid() });
export type SessionIdInput = z.infer<typeof sessionIdInputSchema>;

/**
 * N-08: Start/Abschluss eines Übungssets (Quiz- oder Mischmodus-Runde, F-22) für die
 * "Abschlussquote von Übungssets"-KPI (Anforderungskatalog Abschnitt 11) — siehe exercise_set
 * in apps/api/src/db/schema.ts.
 */
export const exerciseSetModeSchema = z.enum(["quiz", "mixed"]);
export type ExerciseSetMode = z.infer<typeof exerciseSetModeSchema>;

export const startExerciseSetInputSchema = z.object({
  kursId: z.string().uuid(),
  themaId: z.string().uuid().optional(),
  mode: exerciseSetModeSchema,
  totalItems: z.number().int().positive(),
});
export type StartExerciseSetInput = z.infer<typeof startExerciseSetInputSchema>;

export const exerciseSetIdInputSchema = z.object({ exerciseSetId: z.string().uuid() });
export type ExerciseSetIdInput = z.infer<typeof exerciseSetIdInputSchema>;
