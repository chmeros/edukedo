import { highscoreKursInputSchema, highscoreOptInInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, count, eq, gte, or } from "drizzle-orm";
import { contentItem, fachgebiet, friendCircleLink, learningEvent, thema, user, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-60: "regelmäßiger (z. B. wöchentlicher) Reset" — als reines Zeitfenster in der Abfrage
 * umgesetzt (rollierend, nicht auf feste Kalenderwochen ausgerichtet): kein Scheduler/Cronjob
 * nötig, keine separate Zurücksetzungs-Logik, keine Historie über abgeschlossene Wochen. */
const HIGHSCORE_WINDOW_MS = 1000 * 60 * 60 * 24 * 7;

/**
 * F-60: Highscore-/Punkteliste — opt-in (Default `false`, siehe `user_course.highscore_opt_in`),
 * beschränkt auf den eigenen Freundeskreis (F-63) je Kurs, mit rollierendem 7-Tage-Fenster statt
 * fester Kalenderwochen. Punktestand = Anzahl richtig beantworteter Fragen im Fenster (`count`,
 * nicht Trefferquote) — die einfachste, robusteste Metrik ohne Mindest-Fragenumfangs-Schwelle.
 */
export const highscoreRouter = router({
  /**
   * F-66: Standardmäßig deaktiviert für Minderjährige, Aktivierung nur mit gesonderter
   * Einwilligung der Erziehungsberechtigten über das Eltern-Dashboard (F-90,
   * `user.gamification_enabled`, geschrieben von `parent.setChildGamificationEnabled`).
   */
  setOptIn: protectedProcedure.input(highscoreOptInInputSchema).mutation(async ({ ctx, input }) => {
    if (input.optIn && ctx.currentUser.isMinor && !ctx.currentUser.gamificationEnabled) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Für minderjährige Nutzer:innen ist die Highscore-Liste ohne gesonderte Einwilligung der Erziehungsberechtigten deaktiviert.",
      });
    }

    const [updated] = await ctx.db
      .update(userCourse)
      .set({ highscoreOptIn: input.optIn })
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .returning({ id: userCourse.id });

    if (!updated) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist in diesem Kurs nicht eingeschrieben." });
    }

    return { success: true };
  }),

  myOptIn: protectedProcedure.input(highscoreKursInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select({ highscoreOptIn: userCourse.highscoreOptIn })
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);

    return { optedIn: row?.highscoreOptIn ?? false };
  }),

  /**
   * Liefert die eigene Zeile (nur falls opted-in) plus alle Freunde in diesem Kurs, die
   * ebenfalls opted-in sind — absteigend nach Punktestand. Wer selbst nicht opted-in ist, kann
   * die Liste trotzdem einsehen (Ansehen ist keine Teilnahme), erscheint darin aber nicht.
   */
  leaderboard: protectedProcedure.input(highscoreKursInputSchema).query(async ({ ctx, input }) => {
    const friendRows = await ctx.db
      .select({ userIdA: friendCircleLink.userIdA, userIdB: friendCircleLink.userIdB })
      .from(friendCircleLink)
      .where(
        and(
          eq(friendCircleLink.kursId, input.kursId),
          or(eq(friendCircleLink.userIdA, ctx.currentUser.id), eq(friendCircleLink.userIdB, ctx.currentUser.id)),
        ),
      );
    const friendUserIds = friendRows.map((row) => (row.userIdA === ctx.currentUser.id ? row.userIdB : row.userIdA));
    const candidateUserIds = [ctx.currentUser.id, ...friendUserIds];

    const optedInRows = await ctx.db
      .select({ userId: userCourse.userId })
      .from(userCourse)
      .where(
        and(
          eq(userCourse.kursId, input.kursId),
          eq(userCourse.highscoreOptIn, true),
          or(...candidateUserIds.map((id) => eq(userCourse.userId, id))),
        ),
      );
    const optedInUserIds = optedInRows.map((row) => row.userId);
    if (optedInUserIds.length === 0) {
      return [];
    }

    const since = new Date(Date.now() - HIGHSCORE_WINDOW_MS);
    const pointRows = await ctx.db
      .select({ userId: learningEvent.userId, points: count() })
      .from(learningEvent)
      .innerJoin(contentItem, eq(contentItem.id, learningEvent.contentItemId))
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(
        and(
          eq(fachgebiet.kursId, input.kursId),
          eq(learningEvent.isCorrect, true),
          gte(learningEvent.occurredAt, since),
          or(...optedInUserIds.map((id) => eq(learningEvent.userId, id))),
        ),
      )
      .groupBy(learningEvent.userId);
    const pointsByUserId = new Map(pointRows.map((row) => [row.userId, row.points]));

    const userRows = await ctx.db
      .select({ id: user.id, email: user.email })
      .from(user)
      .where(or(...optedInUserIds.map((id) => eq(user.id, id))));
    const emailByUserId = new Map(userRows.map((row) => [row.id, row.email]));

    return optedInUserIds
      .map((userId) => ({
        userId,
        email: emailByUserId.get(userId) ?? "unbekannt",
        points: pointsByUserId.get(userId) ?? 0,
        isSelf: userId === ctx.currentUser.id,
      }))
      .sort((a, b) => b.points - a.points);
  }),
});
