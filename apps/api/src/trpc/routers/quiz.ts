import {
  submitBlanksInputSchema,
  submitKurzantwortInputSchema,
  submitMatchingInputSchema,
  submitQuizAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { checkBlanks, checkKurzantwort, checkMatching, checkMcAnswer, shapeQuizItem } from "../../quiz-logic";
import { answerOption, contentItem, fachgebiet, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const quizRouter = router({
  /**
   * F-21: Fragen aller vier Formate (Multiple Choice, Zuordnung, Lückentext, Kurzantwort)
   * über die eingeschriebenen Kurse — jeweils OHNE die richtige Antwort/Zuordnung/Lösung,
   * die erst bei submitAnswer/submitMatching/submitBlanks/submitKurzantwort serverseitig
   * geprüft wird (siehe Architekturplanung Abschnitt 13). Formung/Prüfung teilt sich die
   * Implementierung mit dem kontolosen Vorschau-Modus (trpc/routers/preview.ts, F-08) über
   * quiz-logic.ts — nur die Quelle der content_item-Zeilen unterscheidet sich.
   */
  quizItems: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db
      .select({ id: contentItem.id, type: contentItem.type, prompt: contentItem.prompt, payload: contentItem.payload })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(eq(userCourse.kursId, fachgebiet.kursId), eq(userCourse.userId, ctx.currentUser.id)),
      )
      .where(
        and(
          inArray(contentItem.type, ["quiz_mc", "zuordnung", "luecken", "kurzantwort"]),
          eq(contentItem.isActive, true),
        ),
      )
      .orderBy(sql`random()`)
      .limit(20);

    if (items.length === 0) {
      return [];
    }

    const optionItemIds = items
      .filter((item) => item.type === "quiz_mc" || item.type === "zuordnung")
      .map((item) => item.id);
    const options = optionItemIds.length
      ? await ctx.db
          .select()
          .from(answerOption)
          .where(inArray(answerOption.contentItemId, optionItemIds))
          .orderBy(asc(answerOption.sortOrder))
      : [];

    return items.map((item) => shapeQuizItem(item, options));
  }),

  submitAnswer: protectedProcedure.input(submitQuizAnswerInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const { isCorrect, correctOptionId } = checkMcAnswer(options, input.selectedOptionId);

    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);

    return { isCorrect, correctOptionId, explanation: item?.explanation ?? null };
  }),

  submitMatching: protectedProcedure.input(submitMatchingInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    return checkMatching(
      options,
      input.pairs.map((pair) => ({ leftOptionId: pair.leftOptionId, rightOptionId: pair.rightOptionId })),
    );
  }),

  submitBlanks: protectedProcedure.input(submitBlanksInputSchema).mutation(async ({ ctx, input }) => {
    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);

    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden." });
    }

    return checkBlanks(item.payload, input.answers);
  }),

  submitKurzantwort: protectedProcedure.input(submitKurzantwortInputSchema).mutation(async ({ ctx, input }) => {
    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);

    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden." });
    }

    const { isCorrect, correctAnswer } = checkKurzantwort(item.payload, input.answer);
    return { isCorrect, correctAnswer, explanation: item.explanation };
  }),
});
