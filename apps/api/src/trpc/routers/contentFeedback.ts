import { reportContentInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { contentItem, contentReport } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-50: Feedback-Funktion für fehlerhafte Lerninhalte — bewusst ein eigener, schmaler Router
 * statt Teil von `content`/`quiz`, da er sich auf alle Content-Typen gleichermaßen bezieht
 * (Karteikarten, alle vier Quiz-Formate, Fallaufgaben, Fachgesprächsfragen). Die
 * Moderationsansicht offener Meldungen liegt wie bei F-68 unter `admin.*`, siehe
 * Architekturplanung Abschnitt 13.
 */
export const contentFeedbackRouter = router({
  report: protectedProcedure.input(reportContentInputSchema).mutation(async ({ ctx, input }) => {
    const [item] = await ctx.db
      .select({ id: contentItem.id })
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);
    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Lerninhalt nicht gefunden." });
    }

    await ctx.db.insert(contentReport).values({
      contentItemId: input.contentItemId,
      reporterUserId: ctx.currentUser.id,
      category: input.category,
      reason: input.reason,
    });

    return { success: true };
  }),

  /** Review UXL-13: eigene Meldungen mit Bearbeitungsstand und Rückmeldung der Redaktion. */
  myReports: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: contentReport.id,
        category: contentReport.category,
        reason: contentReport.reason,
        status: contentReport.status,
        resolutionNote: contentReport.resolutionNote,
        createdAt: contentReport.createdAt,
        resolvedAt: contentReport.resolvedAt,
        contentItemPrompt: contentItem.prompt,
      })
      .from(contentReport)
      .innerJoin(contentItem, eq(contentItem.id, contentReport.contentItemId))
      .where(eq(contentReport.reporterUserId, ctx.currentUser.id))
      .orderBy(desc(contentReport.createdAt))
      .limit(50);
  }),
});
