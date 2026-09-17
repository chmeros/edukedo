import { and, count, desc, eq, isNotNull } from "drizzle-orm";
import { ACHIEVEMENT_DEFINITIONS, longestConsecutiveDayStreak } from "../../achievements/catalog";
import { achievement, examSession, learningEvent } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-67 "Bestwerte": Ein einzelner Tag mit sehr wenigen Antworten würde die Trefferquote sonst
 * verzerren (z. B. 1 von 1 = 100 %) — analog zu MIN_ATTEMPTS_FOR_WEAK_SPOT in progress.ts. */
const MIN_ANSWERS_FOR_BEST_DAY_HIT_RATE = 3;

/**
 * F-67: Nicht-soziale Gamification — Achievements/Abzeichen und persönliche Bestwerte, bewusst
 * ohne jeden Fremdkontakt und ohne Kurs-Skopierung (siehe db/schema.ts, `achievement`,
 * Architekturplanung Abschnitt 13). Alle Kennzahlen laufen über `learning_event`/`exam_session`
 * des Nutzers über ALLE belegten Kurse hinweg, nicht nur den aktuell ausgewählten.
 */
export const gamificationRouter = router({
  /**
   * Prüft alle Katalog-Kriterien gegen die aktuellen Daten und vergibt neu erfüllte
   * Achievements (idempotent, `onConflictDoNothing`) — bewusst bei jedem Aufruf neu berechnet
   * statt event-getrieben bei jeder Antwort/Prüfung ausgelöst, da eine einmal vergebene
   * Auszeichnung ohnehin unveränderlich bleibt (siehe Tabellenkommentar) und die Berechnung
   * selbst nur wenige einfache Zählungen über die eigenen Daten der Person umfasst.
   */
  checkAndAward: protectedProcedure.mutation(async ({ ctx }) => {
    const [totalRow] = await ctx.db
      .select({ value: count() })
      .from(learningEvent)
      .where(eq(learningEvent.userId, ctx.currentUser.id));
    const [correctRow] = await ctx.db
      .select({ value: count() })
      .from(learningEvent)
      .where(and(eq(learningEvent.userId, ctx.currentUser.id), eq(learningEvent.isCorrect, true)));
    const dayRows = await ctx.db
      .select({ occurredAt: learningEvent.occurredAt })
      .from(learningEvent)
      .where(eq(learningEvent.userId, ctx.currentUser.id));
    const streak = longestConsecutiveDayStreak(dayRows.map((row) => row.occurredAt.toISOString().slice(0, 10)));
    const [examRow] = await ctx.db
      .select({ id: examSession.id })
      .from(examSession)
      .where(and(eq(examSession.userId, ctx.currentUser.id), isNotNull(examSession.finishedAt)))
      .limit(1);

    const totalAnswered = totalRow?.value ?? 0;
    const correctCount = correctRow?.value ?? 0;

    const earnedKeys = new Set<string>();
    if (totalAnswered >= 1) earnedKeys.add("erste_antwort");
    if (correctCount >= 10) earnedKeys.add("zehn_richtig");
    if (correctCount >= 100) earnedKeys.add("hundert_richtig");
    if (streak >= 7) earnedKeys.add("sieben_tage_serie");
    if (examRow) earnedKeys.add("erste_pruefung");

    const existingRows = await ctx.db
      .select({ achievementKey: achievement.achievementKey })
      .from(achievement)
      .where(eq(achievement.userId, ctx.currentUser.id));
    const existingKeys = new Set(existingRows.map((row) => row.achievementKey));
    const newlyEarnedKeys = [...earnedKeys].filter((key) => !existingKeys.has(key));

    if (newlyEarnedKeys.length > 0) {
      await ctx.db
        .insert(achievement)
        .values(newlyEarnedKeys.map((achievementKey) => ({ userId: ctx.currentUser.id, achievementKey })))
        .onConflictDoNothing({ target: [achievement.userId, achievement.achievementKey] });
    }

    return { newlyEarnedKeys };
  }),

  myAchievements: protectedProcedure.query(async ({ ctx }) => {
    const earnedRows = await ctx.db
      .select({ achievementKey: achievement.achievementKey, earnedAt: achievement.earnedAt })
      .from(achievement)
      .where(eq(achievement.userId, ctx.currentUser.id));
    const earnedAtByKey = new Map(earnedRows.map((row) => [row.achievementKey, row.earnedAt]));

    return ACHIEVEMENT_DEFINITIONS.map((definition) => ({
      ...definition,
      earnedAt: earnedAtByKey.get(definition.key) ?? null,
    }));
  }),

  myPersonalBests: protectedProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .select({ occurredAt: learningEvent.occurredAt, isCorrect: learningEvent.isCorrect })
      .from(learningEvent)
      .where(eq(learningEvent.userId, ctx.currentUser.id));

    const byDay = new Map<string, { total: number; correct: number }>();
    for (const event of events) {
      const day = event.occurredAt.toISOString().slice(0, 10);
      const entry = byDay.get(day) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (event.isCorrect) entry.correct += 1;
      byDay.set(day, entry);
    }

    let bestHitRatePercent: number | null = null;
    let mostAnsweredInOneDay = 0;
    for (const { total, correct } of byDay.values()) {
      mostAnsweredInOneDay = Math.max(mostAnsweredInOneDay, total);
      if (total >= MIN_ANSWERS_FOR_BEST_DAY_HIT_RATE) {
        const percent = Math.round((correct / total) * 100);
        bestHitRatePercent = bestHitRatePercent === null ? percent : Math.max(bestHitRatePercent, percent);
      }
    }

    const [bestExamRow] = await ctx.db
      .select({ score: examSession.score })
      .from(examSession)
      .where(and(eq(examSession.userId, ctx.currentUser.id), isNotNull(examSession.finishedAt)))
      .orderBy(desc(examSession.score))
      .limit(1);

    return {
      bestHitRatePercent,
      mostAnsweredInOneDay,
      longestStreakDays: longestConsecutiveDayStreak([...byDay.keys()]),
      bestExamScore: bestExamRow?.score ?? null,
    };
  }),
});
