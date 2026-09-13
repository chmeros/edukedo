import { z } from "zod";

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
