import { z } from "zod";

/**
 * F-164: Lesefenster "Theorie" — die Theorie eines einzelnen Themas im ausgewählten Kurs
 * (`content.theorieThema`). Bewusst je Thema statt je Kurs: eine Kurs-Theorie wären mehrere hundert
 * Kilobyte; das Lesefenster braucht immer nur ein Thema.
 */
export const theorieThemaInputSchema = z.object({
  kursId: z.string().uuid(),
  themaId: z.string().uuid(),
});
export type TheorieThemaInput = z.infer<typeof theorieThemaInputSchema>;
