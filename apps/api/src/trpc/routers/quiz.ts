import { submitQuizAnswerInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { answerOption, contentItem, fachgebiet, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const quizRouter = router({
  /**
   * F-21 (Multiple-Choice-Teil): quiz_mc-Fragen über die eingeschriebenen Kurse, OHNE
   * is_correct — die richtige Antwort wird erst bei submitAnswer serverseitig geprüft.
   */
  quizItems: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db
      .select({ id: contentItem.id, prompt: contentItem.prompt })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(eq(userCourse.kursId, fachgebiet.kursId), eq(userCourse.userId, ctx.currentUser.id)),
      )
      .where(and(eq(contentItem.type, "quiz_mc"), eq(contentItem.isActive, true)))
      .orderBy(sql`random()`)
      .limit(20);

    if (items.length === 0) {
      return [];
    }

    const options = await ctx.db
      .select({
        id: answerOption.id,
        contentItemId: answerOption.contentItemId,
        text: answerOption.text,
      })
      .from(answerOption)
      .where(
        inArray(
          answerOption.contentItemId,
          items.map((item) => item.id),
        ),
      )
      .orderBy(asc(answerOption.sortOrder));

    return items.map((item) => ({
      id: item.id,
      prompt: item.prompt,
      options: options
        .filter((option) => option.contentItemId === item.id)
        .map((option) => ({ id: option.id, text: option.text })),
    }));
  }),

  submitAnswer: protectedProcedure.input(submitQuizAnswerInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const selected = options.find((option) => option.id === input.selectedOptionId);
    const correct = options.find((option) => option.isCorrect);

    if (!selected || !correct) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Frage oder Antwortoption nicht gefunden." });
    }

    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);

    return {
      isCorrect: selected.isCorrect,
      correctOptionId: correct.id,
      explanation: item?.explanation ?? null,
    };
  }),
});
