import { activeKursInputSchema, theoriePayloadSchema } from "@edukedo/shared";
import { and, asc, eq, isNull, lte, or, sql } from "drizzle-orm";
import { contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const contentRouter = router({
  /**
   * Fällige Karteikarten (F-20) im ausgewählten Kurs (F-09: Mehrfach-Kursbelegung aktiv
   * genutzt, siehe Architekturplanung Abschnitt 13 — vorher über alle eingeschriebenen
   * Kurse hinweg aggregiert): neue Karten (kein user_progress-Datensatz) zuerst, danach nach
   * Fälligkeit (Architekturplanung Abschnitt 4.3, Index auf user_progress(user_id, due_at)).
   */
  dueCards: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const now = new Date();

    const rows = await ctx.db
      .select({
        id: contentItem.id,
        prompt: contentItem.prompt,
        explanation: contentItem.explanation,
        dueAt: userProgress.dueAt,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(
          eq(userCourse.kursId, fachgebiet.kursId),
          eq(userCourse.userId, ctx.currentUser.id),
          eq(userCourse.kursId, input.kursId),
        ),
      )
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(
        and(
          eq(contentItem.type, "karteikarte"),
          eq(contentItem.isActive, true),
          or(isNull(userProgress.dueAt), lte(userProgress.dueAt, now)),
        ),
      )
      // NULLS FIRST: neue, noch nie geübte Karten (kein user_progress-Datensatz) vor
      // bereits fälligen Wiederholungen — Postgres sortiert NULL bei ASC sonst zuletzt.
      .orderBy(sql`${userProgress.dueAt} asc nulls first`)
      .limit(20);

    return rows.map((row) => ({ id: row.id, prompt: row.prompt, explanation: row.explanation }));
  }),

  /**
   * Theorie-Abschnitte (Fließtext je Thema) im ausgewählten Kurs — gruppiert nach
   * Fachgebiet, sortiert nach fachgebiet.sort_order/thema.sort_order. Es gibt je Thema
   * höchstens einen Theorie-content_item (siehe apps/api/src/db/import-content.ts).
   */
  theorySections: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        contentItemId: contentItem.id,
        payload: contentItem.payload,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(
          eq(userCourse.kursId, fachgebiet.kursId),
          eq(userCourse.userId, ctx.currentUser.id),
          eq(userCourse.kursId, input.kursId),
        ),
      )
      .where(and(eq(contentItem.type, "theorie"), eq(contentItem.isActive, true)))
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder));

    return rows.map((row) => ({
      id: row.contentItemId,
      fachgebietTitle: row.fachgebietTitle,
      themaTitle: row.themaTitle,
      bodyMarkdown: theoriePayloadSchema.parse(row.payload).body_markdown,
    }));
  }),
});
