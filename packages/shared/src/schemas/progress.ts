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
 * F-110: Manuelle "schwierig"-Markierung — bewusst unabhängig vom FSRS-Zustand (Nutzer-
 * Entscheidung 21.09.2026, siehe Architekturplanung Abschnitt 13): rein additives Flag, das
 * weder difficulty/stability/due_at noch die reguläre Selbsteinschätzung (F-20) beeinflusst.
 */
export const toggleDifficultyFlagInputSchema = z.object({
  contentItemId: z.string().uuid(),
});
export type ToggleDifficultyFlagInput = z.infer<typeof toggleDifficultyFlagInputSchema>;

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

/**
 * F-125 (Nutzer-Feedback vom 23.09.2026, erweitert F-21/F-30, Nutzer-Entscheidung 23.09.2026):
 * Lernrunde jederzeit ohne Wertung abbrechen — anders als einfaches Wegnavigieren (bei dem
 * bereits gegebene Antworten unverändert gewertet bleiben) verwirft ein Abbruch rückwirkend
 * alle in DIESER Runde bereits gegebenen Antworten. `contentItemIds` ist die vollständige,
 * client-seitig ohnehin bereits bekannte Liste der Runden-Items (nicht nur der beantworteten —
 * ein noch unbeantwortetes Item hat serverseitig einfach nichts zum Verwerfen). `since` grenzt
 * auf Ereignisse dieser Runde ein, damit eine ältere Antwort desselben Items aus einer früheren
 * Runde nicht versehentlich mit verworfen wird (siehe abortRoundItem, apps/api/src/trpc/
 * routers/progress.ts). `exerciseSetId` optional, da Flashcards.tsx (reiner Karteikarten-Modus)
 * — anders als Quiz.tsx/MixedLearning.tsx — kein exercise_set anlegt.
 */
export const abortRoundInputSchema = z.object({
  contentItemIds: z.array(z.string().uuid()).min(1),
  since: z.coerce.date(),
  exerciseSetId: z.string().uuid().optional(),
});
export type AbortRoundInput = z.infer<typeof abortRoundInputSchema>;
