import { submitReviewInputSchema } from "@edukedo/shared";
import { and, eq } from "drizzle-orm";
import { initialProgressState, scheduleReview } from "../../fsrs/scheduler";
import { contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const progressRouter = router({
  /**
   * F-30: Fortschrittsanzeige je Fachgebiet und Thema. "beherrscht" = user_progress.state
   * "review" (FSRS-Karte hat die anfängliche Lernphase verlassen und ist im
   * Langzeit-Wiederholungsplan) — siehe Architekturplanung Abschnitt 13 für die Begründung.
   * Umfasst aktuell nur Karteikarten (type "karteikarte"), da nur der Karteikarten-Modus
   * user_progress schreibt (F-21-Quizantworten tun das bewusst noch nicht, siehe F-26).
   */
  overview: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        contentItemId: contentItem.id,
        themaId: thema.id,
        themaTitle: thema.title,
        themaSortOrder: thema.sortOrder,
        fachgebietId: fachgebiet.id,
        fachgebietTitle: fachgebiet.title,
        fachgebietSortOrder: fachgebiet.sortOrder,
        state: userProgress.state,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(eq(userCourse.kursId, fachgebiet.kursId), eq(userCourse.userId, ctx.currentUser.id)),
      )
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(and(eq(contentItem.type, "karteikarte"), eq(contentItem.isActive, true)));

    type ThemaAgg = { id: string; title: string; sortOrder: number; total: number; mastered: number };
    type FachgebietAgg = {
      id: string;
      title: string;
      sortOrder: number;
      total: number;
      mastered: number;
      themen: Map<string, ThemaAgg>;
    };

    const fachgebiete = new Map<string, FachgebietAgg>();

    for (const row of rows) {
      let fg = fachgebiete.get(row.fachgebietId);
      if (!fg) {
        fg = {
          id: row.fachgebietId,
          title: row.fachgebietTitle,
          sortOrder: row.fachgebietSortOrder,
          total: 0,
          mastered: 0,
          themen: new Map(),
        };
        fachgebiete.set(row.fachgebietId, fg);
      }

      let th = fg.themen.get(row.themaId);
      if (!th) {
        th = { id: row.themaId, title: row.themaTitle, sortOrder: row.themaSortOrder, total: 0, mastered: 0 };
        fg.themen.set(row.themaId, th);
      }

      const isMastered = row.state === "review";
      fg.total += 1;
      th.total += 1;
      if (isMastered) {
        fg.mastered += 1;
        th.mastered += 1;
      }
    }

    const percent = (mastered: number, total: number) => (total === 0 ? 0 : Math.round((mastered / total) * 100));

    return [...fachgebiete.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((fg) => ({
        id: fg.id,
        title: fg.title,
        total: fg.total,
        mastered: fg.mastered,
        percent: percent(fg.mastered, fg.total),
        themen: [...fg.themen.values()]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((th) => ({
            id: th.id,
            title: th.title,
            total: th.total,
            mastered: th.mastered,
            percent: percent(th.mastered, th.total),
          })),
      }));
  }),

  submitReview: protectedProcedure.input(submitReviewInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();

    const [existing] = await ctx.db
      .select()
      .from(userProgress)
      .where(
        and(eq(userProgress.userId, ctx.currentUser.id), eq(userProgress.contentItemId, input.contentItemId)),
      )
      .limit(1);

    const current = existing
      ? {
          difficulty: existing.difficulty,
          stability: existing.stability,
          state: existing.state,
          dueAt: existing.dueAt,
          lastReviewedAt: existing.lastReviewedAt,
          reps: existing.reps,
          lapses: existing.lapses,
        }
      : initialProgressState(now);

    const next = scheduleReview(current, input.result, now);

    await ctx.db
      .insert(userProgress)
      .values({
        userId: ctx.currentUser.id,
        contentItemId: input.contentItemId,
        difficulty: next.difficulty,
        stability: next.stability,
        state: next.state,
        dueAt: next.dueAt,
        lastReviewedAt: next.lastReviewedAt,
        lastResult: input.result,
        reps: next.reps,
        lapses: next.lapses,
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.contentItemId],
        set: {
          difficulty: next.difficulty,
          stability: next.stability,
          state: next.state,
          dueAt: next.dueAt,
          lastReviewedAt: next.lastReviewedAt,
          lastResult: input.result,
          reps: next.reps,
          lapses: next.lapses,
        },
      });

    return { dueAt: next.dueAt };
  }),
});
