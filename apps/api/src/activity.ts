import { eq, sql } from "drizzle-orm";
import type { Database } from "./db/client";
import { learningEvent } from "./db/schema";
import { LEARNING_TIME_ZONE } from "./learning-day";

/**
 * Kalendertag (`YYYY-MM-DD`) eines Ereignisses in der Lernzeitzone, als SQL-Ausdruck (siehe learning-day.ts). Die Zeitzone steht als
 * Konstante im SQL-Text statt als Parameter: Mit Parametern unterscheiden sich SELECT und GROUP BY (`$1` gegen `$3`), und PostgreSQL
 * lehnt die Gruppierung ab. Die Konstante stammt aus dem Code, nicht aus Eingaben.
 */
export const ereignisTag = sql<string>`to_char(${learningEvent.occurredAt} at time zone '${sql.raw(LEARNING_TIME_ZONE)}', 'YYYY-MM-DD')`;

/** Eindeutiger Schlüssel des beantworteten Elements (Content-Item oder Spiel-Element) für "verschiedene Fragen"-Zählungen. */
export const ereignisElement = sql<string>`coalesce(${learningEvent.contentItemId}::text, ${learningEvent.gameItemKey})`;

export interface TagesAktivitaet {
  day: string;
  total: number;
  correct: number;
}

/**
 * Review LOG-10: Aktivität je Kalendertag, in SQL aggregiert. Serien, Bestwerte, Erinnerungen und Achievements luden bisher jedes
 * Lernereignis der Person und gruppierten in TypeScript; die Zeilenzahl wuchs mit jeder Antwort, jetzt mit jedem Lerntag.
 */
export async function tagesAktivitaet(db: Database, userId: string): Promise<TagesAktivitaet[]> {
  const rows = await db
    .select({
      day: ereignisTag,
      total: sql<number>`count(*)`.mapWith(Number),
      correct: sql<number>`count(*) filter (where ${learningEvent.isCorrect})`.mapWith(Number),
    })
    .from(learningEvent)
    .where(eq(learningEvent.userId, userId))
    .groupBy(ereignisTag);
  return rows;
}
