import { z } from "zod";

/**
 * F-61: Asynchrone 1:1-Wissensduelle innerhalb des Freundeskreises (F-63). Siehe
 * apps/api/src/trpc/routers/duell.ts für den Fragenpool-Snapshot, die Bewertung
 * (checkMcAnswer, wiederverwendet aus quiz-logic.ts) und die Minderjährigen-Sperre (F-66).
 */
export const duellKursInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type DuellKursInput = z.infer<typeof duellKursInputSchema>;

export const duellIdInputSchema = z.object({
  duellId: z.string().uuid(),
});
export type DuellIdInput = z.infer<typeof duellIdInputSchema>;

/** questionCount: 5–20, Default 10 — bewusst enger als quiz.quizItems' 1–50 (F-22), da eine
 * Duell-Runde eine überschaubare, in einem Zug spielbare Einheit bleiben soll. */
export const challengeDuellInputSchema = z.object({
  kursId: z.string().uuid(),
  opponentUserId: z.string().uuid(),
  questionCount: z.number().int().min(5).max(20).default(10),
});
export type ChallengeDuellInput = z.infer<typeof challengeDuellInputSchema>;

export const submitDuellAnswerInputSchema = z.object({
  duellId: z.string().uuid(),
  contentItemId: z.string().uuid(),
  selectedOptionId: z.string().uuid(),
});
export type SubmitDuellAnswerInput = z.infer<typeof submitDuellAnswerInputSchema>;

export const setDuellRevealDetailsInputSchema = z.object({
  duellId: z.string().uuid(),
  revealDetails: z.boolean(),
});
export type SetDuellRevealDetailsInput = z.infer<typeof setDuellRevealDetailsInputSchema>;
