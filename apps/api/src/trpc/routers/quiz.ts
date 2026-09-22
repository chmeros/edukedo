import {
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  checkMcMultiAnswer,
  checkQuadrantAnswer,
  MC_LIKE_QUIZ_TYPES,
  QUADRANT_QUIZ_TYPES,
  quizItemsInputSchema,
  shapeQuizItem,
  submitBlanksInputSchema,
  submitKurzantwortInputSchema,
  submitMatchingInputSchema,
  submitMcMultiInputSchema,
  submitQuadrantInputSchema,
  submitQuizAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { answerOption, contentItem, fachgebiet, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";
import { recordQuizAttempt } from "./progress";

export const quizRouter = router({
  /**
   * F-21: Fragen aller vier Formate (Multiple Choice, Zuordnung, Lückentext, Kurzantwort) im
   * ausgewählten Kurs (F-09: Mehrfach-Kursbelegung aktiv genutzt, siehe Architekturplanung
   * Abschnitt 13 — vorher über alle eingeschriebenen Kurse hinweg aggregiert) — jeweils OHNE
   * die richtige Antwort/Zuordnung/Lösung, die erst bei
   * submitAnswer/submitMatching/submitBlanks/submitKurzantwort serverseitig geprüft wird
   * (siehe Architekturplanung Abschnitt 13). Formung/Prüfung teilt sich die Implementierung
   * mit dem kontolosen Vorschau-Modus (trpc/routers/preview.ts, F-08) über quiz-logic.ts —
   * nur die Quelle der content_item-Zeilen unterscheidet sich. Die vier submit*-Mutationen
   * unten schreiben das Ergebnis zusätzlich über `recordQuizAttempt` (F-26, siehe
   * trpc/routers/progress.ts) in `user_progress` — bewusst NICHT in `preview.ts`, der ohne
   * jeden Datenbank-Schreibzugriff bleibt.
   * F-22: `count` (siehe quizItemsInputSchema) steuert die Rundengröße — vorher fest 20, jetzt
   * frei wählbar (1–50), Default weiterhin 20 für unverändertes Verhalten ohne Angabe.
   */
  quizItems: protectedProcedure.input(quizItemsInputSchema).query(async ({ ctx, input }) => {
    const conditions = [
      // F-113: MC_LIKE_QUIZ_TYPES (wahr_falsch/entweder_oder/was_passt_nicht) sind strukturell
      // identisch zu quiz_mc. F-114: QUADRANT_QUIZ_TYPES (swot/bsc/ansoff) sind eine visuelle
      // Zuordnungs-Variante mit N Zonen statt zwei Spalten. F-116: quiz_mc_multi lädt genauso
      // Optionen wie MC_LIKE_QUIZ_TYPES, wird aber anders bewertet. Siehe quiz-logic.ts.
      inArray(contentItem.type, [
        ...MC_LIKE_QUIZ_TYPES,
        "quiz_mc_multi",
        "zuordnung",
        ...QUADRANT_QUIZ_TYPES,
        "luecken",
        "kurzantwort",
      ]),
      eq(contentItem.isActive, true),
    ];
    // F-27: optionaler Thema-Filter — siehe quizItemsInputSchema.
    if (input.themaId) {
      conditions.push(eq(thema.id, input.themaId));
    }

    const items = await ctx.db
      .select({ id: contentItem.id, type: contentItem.type, prompt: contentItem.prompt, payload: contentItem.payload })
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
      .where(and(...conditions))
      .orderBy(sql`random()`)
      // F-22: frei wählbare Anzahl (siehe quizItemsInputSchema) statt fest verdrahteter 20.
      .limit(input.count);

    if (items.length === 0) {
      return [];
    }

    const optionItemIds = items
      .filter(
        (item) =>
          item.type === "quiz_mc_multi" ||
          (MC_LIKE_QUIZ_TYPES as readonly string[]).includes(item.type) ||
          item.type === "zuordnung" ||
          (QUADRANT_QUIZ_TYPES as readonly string[]).includes(item.type),
      )
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

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, isCorrect);

    return { isCorrect, correctOptionId, explanation: item?.explanation ?? null };
  }),

  /** F-116: Mehrfachauswahl auswerten — dieselbe answer_option-Grundlage wie submitAnswer, aber
   * ein Set von Options-IDs statt einer einzelnen (siehe checkMcMultiAnswer). */
  submitMcMulti: protectedProcedure.input(submitMcMultiInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const { isCorrect, correctOptionIds } = checkMcMultiAnswer(options, input.selectedOptionIds);

    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(eq(contentItem.id, input.contentItemId))
      .limit(1);

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, isCorrect);

    return { isCorrect, correctOptionIds, explanation: item?.explanation ?? null };
  }),

  submitMatching: protectedProcedure.input(submitMatchingInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const result = checkMatching(
      options,
      input.pairs.map((pair) => ({ leftOptionId: pair.leftOptionId, rightOptionId: pair.rightOptionId })),
    );

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, result.correctCount === result.total);

    return result;
  }),

  /** F-114: SWOT/BSC/Ansoff-Zonen-Zuordnung auswerten — dieselbe answer_option-Grundlage wie
   * submitMatching, aber N Zonen statt exakt zwei Seiten (siehe checkQuadrantAnswer). */
  submitQuadrant: protectedProcedure.input(submitQuadrantInputSchema).mutation(async ({ ctx, input }) => {
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const result = checkQuadrantAnswer(options, input.placements);

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, result.correctCount === result.total);

    return result;
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

    const result = checkBlanks(item.payload, input.answers);

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, result.correctCount === result.total);

    return result;
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

    await recordQuizAttempt(ctx.db, ctx.currentUser.id, input.contentItemId, isCorrect);

    return { isCorrect, correctAnswer, explanation: item.explanation };
  }),
});
