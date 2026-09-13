import { z } from "zod";

/**
 * F-21 (Multiple-Choice-Teil): Antwort auf eine quiz_mc-Frage einreichen. Die richtige
 * Antwort wird bewusst NICHT beim Laden der Fragen mitgeschickt (siehe content.ts-Router),
 * sondern erst hier serverseitig geprüft — sonst könnte man sie im Devtools-Netzwerktab lesen.
 */
export const submitQuizAnswerInputSchema = z.object({
  contentItemId: z.string().uuid(),
  selectedOptionId: z.string().uuid(),
});
export type SubmitQuizAnswerInput = z.infer<typeof submitQuizAnswerInputSchema>;
