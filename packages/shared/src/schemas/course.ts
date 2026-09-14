import { z } from "zod";

/**
 * F-09: Mehrfach-Kursbelegung aktiv genutzt — alle Lernmodi (Theorie, Karteikarten, Quiz,
 * Fortschritt) beziehen sich jetzt auf genau einen ausgewählten Kurs statt über alle
 * eingeschriebenen Kurse hinweg zu aggregieren, siehe Architekturplanung Abschnitt 13.
 */
export const activeKursInputSchema = z.object({ kursId: z.string().uuid() });
export type ActiveKursInput = z.infer<typeof activeKursInputSchema>;
