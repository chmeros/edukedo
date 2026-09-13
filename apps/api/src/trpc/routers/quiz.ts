import {
  lueckenPayloadSchema,
  submitBlanksInputSchema,
  submitMatchingInputSchema,
  submitQuizAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { answerOption, contentItem, fachgebiet, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export const quizRouter = router({
  /**
   * F-21: Fragen aller drei Formate (Multiple Choice, Zuordnung, Lückentext) über die
   * eingeschriebenen Kurse — jeweils OHNE die richtige Antwort/Zuordnung/Lösung, die erst
   * bei submitAnswer/submitMatching/submitBlanks serverseitig geprüft wird (siehe
   * Architekturplanung Abschnitt 13).
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
      .where(and(inArray(contentItem.type, ["quiz_mc", "zuordnung", "luecken"]), eq(contentItem.isActive, true)))
      .orderBy(sql`random()`)
      .limit(20);

    if (items.length === 0) {
      return [];
    }

    const optionItemIds = items.filter((item) => item.type !== "luecken").map((item) => item.id);
    const options = optionItemIds.length
      ? await ctx.db
          .select()
          .from(answerOption)
          .where(inArray(answerOption.contentItemId, optionItemIds))
          .orderBy(asc(answerOption.sortOrder))
      : [];

    return items.map((item) => {
      if (item.type === "quiz_mc") {
        return {
          id: item.id,
          type: "quiz_mc" as const,
          prompt: item.prompt,
          options: options
            .filter((option) => option.contentItemId === item.id)
            .map((option) => ({ id: option.id, text: option.text })),
        };
      }

      if (item.type === "zuordnung") {
        const itemOptions = options.filter((option) => option.contentItemId === item.id);
        return {
          id: item.id,
          type: "zuordnung" as const,
          prompt: item.prompt,
          left: shuffle(
            itemOptions.filter((option) => option.side === "links").map((option) => ({ id: option.id, text: option.text })),
          ),
          right: shuffle(
            itemOptions
              .filter((option) => option.side === "rechts")
              .map((option) => ({ id: option.id, text: option.text })),
          ),
        };
      }

      const payload = lueckenPayloadSchema.parse(item.payload);
      return {
        id: item.id,
        type: "luecken" as const,
        prompt: item.prompt,
        textWithBlanks: payload.text_with_blanks,
        blankIds: payload.blanks.map((blank) => blank.id),
      };
    });
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

  submitMatching: protectedProcedure.input(submitMatchingInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    if (options.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden." });
    }

    const leftOptions = options.filter((option) => option.side === "links");
    const correctMap: Record<string, string> = {};
    for (const left of leftOptions) {
      const partner = options.find((option) => option.side === "rechts" && option.groupKey === left.groupKey);
      if (partner) {
        correctMap[left.id] = partner.id;
      }
    }

    let correctCount = 0;
    for (const pair of input.pairs) {
      if (correctMap[pair.leftOptionId] === pair.rightOptionId) {
        correctCount += 1;
      }
    }

    return { correctMap, correctCount, total: leftOptions.length };
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

    const payload = lueckenPayloadSchema.parse(item.payload);

    const results: Record<string, boolean> = {};
    const correctAnswers: Record<string, string> = {};
    let correctCount = 0;

    for (const blank of payload.blanks) {
      const given = (input.answers[blank.id] ?? "").trim().toLowerCase();
      const isCorrect = blank.accepted.some((accepted) => accepted.trim().toLowerCase() === given);
      results[blank.id] = isCorrect;
      correctAnswers[blank.id] = blank.accepted[0] ?? "";
      if (isCorrect) {
        correctCount += 1;
      }
    }

    return { results, correctAnswers, correctCount, total: payload.blanks.length };
  }),
});
