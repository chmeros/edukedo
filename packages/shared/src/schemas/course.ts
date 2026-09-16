import { z } from "zod";

/**
 * F-09: Mehrfach-Kursbelegung aktiv genutzt — alle Lernmodi (Theorie, Karteikarten, Quiz,
 * Fortschritt) beziehen sich jetzt auf genau einen ausgewählten Kurs statt über alle
 * eingeschriebenen Kurse hinweg zu aggregieren, siehe Architekturplanung Abschnitt 13.
 */
export const activeKursInputSchema = z.object({ kursId: z.string().uuid() });
export type ActiveKursInput = z.infer<typeof activeKursInputSchema>;

/**
 * F-27 "Weiter lernen"-Einstieg: optionaler Thema-Filter für `content.dueCards`/
 * `quiz.quizItems` — ein Klick auf einen Vorschlag lernt gezielt nur dieses Thema statt
 * wie sonst quer über den ganzen Kurs, siehe Architekturplanung Abschnitt 13. Ohne
 * `themaId` unverändertes Verhalten (kursweite Auswahl), rückwärtskompatibel zu
 * `activeKursInputSchema`.
 */
export const themaFilterableKursInputSchema = z.object({
  kursId: z.string().uuid(),
  themaId: z.string().uuid().optional(),
});
export type ThemaFilterableKursInput = z.infer<typeof themaFilterableKursInputSchema>;

/**
 * F-35: Setzt die persönliche Zielplanung für einen belegten Kurs. Welche Felder tatsächlich
 * greifen, hängt vom Zielmodus des Kurses ab (kurs.targetMode, siehe Architekturplanung
 * Abschnitt 13) — `targetDate`/`planStartDate` nur bei "einzeltermin", `weeklyGoalItems` nur
 * bei "wochenziel". Alle drei bleiben hier bewusst optional/nullable statt modusabhängig
 * verpflichtend: Das Frontend zeigt ohnehin nur die zum Kursmodus passenden Felder an, eine
 * serverseitige Modus-Prüfung hätte nur denselben Fall nochmal abgedeckt.
 */
export const setCourseTargetInputSchema = z.object({
  kursId: z.string().uuid(),
  targetDate: z.coerce.date().nullable().optional(),
  planStartDate: z.coerce.date().nullable().optional(),
  weeklyGoalItems: z.number().int().positive().nullable().optional(),
});
export type SetCourseTargetInput = z.infer<typeof setCourseTargetInputSchema>;
