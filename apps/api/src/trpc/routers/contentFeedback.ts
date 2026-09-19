import { reportContentInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
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
      reason: input.reason,
    });

    return { success: true };
  }),
});
