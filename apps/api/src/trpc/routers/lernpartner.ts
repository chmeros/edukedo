import { lernpartnerKursInputSchema, setLernpartnerFachgebietInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, or } from "drizzle-orm";
import { fachgebiet, friendCircleLink, user, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-62: Zwei Prüfungstermine gelten als "im selben Zeitraum", wenn sie höchstens 30 Tage
 * voneinander abweichen — ein bewusst grober, aber nachvollziehbarer Schwellenwert (kein
 * exakter Wert im Anforderungskatalog vorgegeben), analog zum rollierenden Zeitfenster bei F-60. */
const TARGET_DATE_MATCH_WINDOW_MS = 1000 * 60 * 60 * 24 * 30;

/**
 * F-62: Lernpartner-Vermittlung — 1:1, innerhalb des eigenen Freundeskreises (F-63), auf Basis
 * von Prüfungstermin und/oder Handlungsbereich. Zeigt ausschließlich Übereinstimmungen an, kein
 * Anfrage-/Bestätigungs-Workflow und kein Forum/Chat — der Kontakt läuft über die im
 * Freundeskreis bereits sichtbare E-Mail-Adresse.
 */
export const lernpartnerRouter = router({
  setFachgebiet: protectedProcedure.input(setLernpartnerFachgebietInputSchema).mutation(async ({ ctx, input }) => {
    if (input.fachgebietId) {
      const [fachgebietRow] = await ctx.db
        .select()
        .from(fachgebiet)
        .where(and(eq(fachgebiet.id, input.fachgebietId), eq(fachgebiet.kursId, input.kursId)))
        .limit(1);
      if (!fachgebietRow) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Dieses Handlungsbereich gehört nicht zu diesem Kurs." });
      }
    }

    const [updated] = await ctx.db
      .update(userCourse)
      .set({ lernpartnerFachgebietId: input.fachgebietId })
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .returning({ id: userCourse.id });

    if (!updated) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist in diesem Kurs nicht eingeschrieben." });
    }

    return { success: true };
  }),

  /**
   * Liefert für jeden Freund in diesem Kurs die Übereinstimmung mit der eigenen Präferenz
   * (Prüfungstermin innerhalb von 30 Tagen und/oder identischer Handlungsbereich), absteigend
   * nach Übereinstimmungsgrad (beides > eines > keines) und danach nach zeitlicher Nähe des
   * Prüfungstermins sortiert.
   */
  matches: protectedProcedure.input(lernpartnerKursInputSchema).query(async ({ ctx, input }) => {
    const [myRow] = await ctx.db
      .select({ targetDate: userCourse.targetDate, fachgebietId: userCourse.lernpartnerFachgebietId })
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);
    if (!myRow) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist in diesem Kurs nicht eingeschrieben." });
    }

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
    if (friendUserIds.length === 0) {
      return [];
    }

    const rows = await ctx.db
      .select({
        userId: user.id,
        email: user.email,
        targetDate: userCourse.targetDate,
        fachgebietId: userCourse.lernpartnerFachgebietId,
        fachgebietTitle: fachgebiet.title,
      })
      .from(userCourse)
      .innerJoin(user, eq(user.id, userCourse.userId))
      .leftJoin(fachgebiet, eq(fachgebiet.id, userCourse.lernpartnerFachgebietId))
      .where(and(eq(userCourse.kursId, input.kursId), or(...friendUserIds.map((id) => eq(userCourse.userId, id)))));

    const myTargetDateMs = myRow.targetDate ? new Date(myRow.targetDate).getTime() : null;

    return rows
      .map((row) => {
        const rowTargetDateMs = row.targetDate ? new Date(row.targetDate).getTime() : null;
        const matchesTargetDate =
          myTargetDateMs !== null &&
          rowTargetDateMs !== null &&
          Math.abs(myTargetDateMs - rowTargetDateMs) <= TARGET_DATE_MATCH_WINDOW_MS;
        const matchesFachgebiet = myRow.fachgebietId !== null && myRow.fachgebietId === row.fachgebietId;

        return {
          friendUserId: row.userId,
          friendEmail: row.email,
          targetDate: row.targetDate,
          fachgebietTitle: row.fachgebietTitle,
          matchesTargetDate,
          matchesFachgebiet,
          matchScore: (matchesTargetDate ? 1 : 0) + (matchesFachgebiet ? 1 : 0),
          dateDistanceMs: myTargetDateMs !== null && rowTargetDateMs !== null ? Math.abs(myTargetDateMs - rowTargetDateMs) : null,
        };
      })
      .sort((a, b) => {
        if (a.matchScore !== b.matchScore) return b.matchScore - a.matchScore;
        if (a.dateDistanceMs === null) return 1;
        if (b.dateDistanceMs === null) return -1;
        return a.dateDistanceMs - b.dateDistanceMs;
      });
  }),
});
