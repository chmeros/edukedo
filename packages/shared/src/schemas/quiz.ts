import { z } from "zod";

/**
 * F-22: Themenbezogenes Übungsset mit frei wählbarer Fragenzahl — `count` steuert, wie viele
 * Fragen quiz.quizItems lädt (Default 20, bisher fest verdrahtet, siehe Architekturplanung
 * Abschnitt 13). Obergrenze 50 als praktikable Rundengröße, keine unbegrenzte Anzahl.
 */
export const quizItemsInputSchema = z.object({
  kursId: z.string().uuid(),
  themaId: z.string().uuid().optional(),
  count: z.number().int().min(1).max(50).default(20),
});
export type QuizItemsInput = z.infer<typeof quizItemsInputSchema>;

/**
 * F-21 (Multiple-Choice-Teil): Antwort auf eine quiz_mc-Frage einreichen. Die richtige
 * Antwort wird bewusst NICHT beim Laden der Fragen mitgeschickt (siehe quiz.ts-Router),
 * sondern erst hier serverseitig geprüft — sonst könnte man sie im Devtools-Netzwerktab lesen.
 */
export const submitQuizAnswerInputSchema = z.object({
  contentItemId: z.string().uuid(),
  selectedOptionId: z.string().uuid(),
});
export type SubmitQuizAnswerInput = z.infer<typeof submitQuizAnswerInputSchema>;

/**
 * F-21 (Zuordnung-Teil): eingereichte Paare (linke Option ↔ rechte Option). Welche Paare
 * tatsächlich zusammengehören (answer_option.group_key), wird ebenfalls erst hier
 * serverseitig geprüft — beim Laden der Frage sind links/rechts unabhängig gemischt.
 */
export const submitMatchingInputSchema = z.object({
  contentItemId: z.string().uuid(),
  pairs: z
    .array(z.object({ leftOptionId: z.string().uuid(), rightOptionId: z.string().uuid() }))
    .min(1),
});
export type SubmitMatchingInput = z.infer<typeof submitMatchingInputSchema>;

/**
 * F-21 (Lückentext-Teil): eingegebene Antworten je Lücken-ID (content_item.payload.blanks[].id).
 */
export const submitBlanksInputSchema = z.object({
  contentItemId: z.string().uuid(),
  answers: z.record(z.string(), z.string()),
});
export type SubmitBlanksInput = z.infer<typeof submitBlanksInputSchema>;

/**
 * F-21 (Kurzantwort-Teil): freier Text als Antwort. Prüfung (exact/contains, case-insensitive
 * nach Trim, siehe payload.match_mode) erfolgt ausschließlich serverseitig.
 */
export const submitKurzantwortInputSchema = z.object({
  contentItemId: z.string().uuid(),
  answer: z.string(),
});
export type SubmitKurzantwortInput = z.infer<typeof submitKurzantwortInputSchema>;

/**
 * F-114 (SWOT/BSC/Ansoff-Teil): eingereichte Zonen-Platzierung je Begriff (answer_option-ID →
 * Zonen-Schlüssel, siehe QUADRANT_MODELS in quiz-logic.ts). Welche Zone tatsächlich richtig
 * ist (answer_option.group_key), wird ebenfalls erst hier serverseitig geprüft.
 */
export const submitQuadrantInputSchema = z.object({
  contentItemId: z.string().uuid(),
  placements: z.array(z.object({ optionId: z.string().uuid(), zoneKey: z.string() })).min(1),
});
export type SubmitQuadrantInput = z.infer<typeof submitQuadrantInputSchema>;
