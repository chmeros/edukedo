import { z } from "zod";

/**
 * F-60: Highscore-/Punkteliste — opt-in, je Kurs getrennt, beschränkt auf den eigenen
 * Freundeskreis (F-63). Siehe apps/api/src/trpc/routers/highscore.ts für die Punktelogik
 * (Anzahl richtig beantworteter Fragen der letzten 7 Tage) und die Minderjährigen-Sperre (F-66).
 */
export const highscoreOptInInputSchema = z.object({
  kursId: z.string().uuid(),
  optIn: z.boolean(),
});
export type HighscoreOptInInput = z.infer<typeof highscoreOptInInputSchema>;

export const highscoreKursInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type HighscoreKursInput = z.infer<typeof highscoreKursInputSchema>;
