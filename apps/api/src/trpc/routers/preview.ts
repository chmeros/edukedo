import {
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  shapeQuizItem,
  submitBlanksInputSchema,
  submitKurzantwortInputSchema,
  submitMatchingInputSchema,
  submitQuizAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, inArray, sql } from "drizzle-orm";
import type { Database } from "../../db/client";
import { answerOption, contentItem, fachgebiet, kurs, thema } from "../../db/schema";
import { publicProcedure, router } from "../trpc";

const PREVIEW_ITEM_LIMIT = 5;

/**
 * F-08: Kontoloser Vorschau-Modus — "einige Demo-Fragen ohne Speicherung von Fortschritt
 * oder personenbezogenen Daten" für Minderjährige, deren Konto noch auf die Bestätigung
 * eines Elternteils wartet (siehe Anforderungskatalog F-08, Architekturplanung Abschnitt
 * 4.4/8). Bewusst vollständig zustandslos: publicProcedure statt protectedProcedure, keine
 * Session/Cookie nötig, kein Bezug zu einem konkreten Konto, kein Datenbank-Schreibzugriff
 * an irgendeiner Stelle dieses Routers. Quelle sind alle veröffentlichten Kurse
 * (`kurs.is_published = true`) — nicht nur der jeweils betroffene Kurs, damit der
 * Vorschau-Modus automatisch auch für den Schulfach-Kurs funktioniert, sobald dieser live
 * geht, ohne dass dafür etwas an diesem Router geändert werden müsste.
 */
export const previewRouter = router({
  items: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.db
      .select({ id: contentItem.id, type: contentItem.type, prompt: contentItem.prompt, payload: contentItem.payload })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(kurs, eq(kurs.id, fachgebiet.kursId))
      .where(
        and(
          inArray(contentItem.type, ["quiz_mc", "zuordnung", "luecken", "kurzantwort"]),
          eq(contentItem.isActive, true),
          eq(kurs.isPublished, true),
        ),
      )
      .orderBy(sql`random()`)
      .limit(PREVIEW_ITEM_LIMIT);

    if (items.length === 0) {
      return [];
    }

    const optionItemIds = items
      .filter((item) => item.type === "quiz_mc" || item.type === "zuordnung")
      .map((item) => item.id);
    const options = optionItemIds.length
      ? await ctx.db.select().from(answerOption).where(inArray(answerOption.contentItemId, optionItemIds))
      : [];

    return items.map((item) => shapeQuizItem(item, options));
  }),

  /**
   * Jeweils zusätzlich gegen kurs.is_published/content_item.is_active geprüft (anders als
   * der geschützte quiz-Router, der sich auf die Einschreibung verlässt) — der einzige
   * Nachweis hier ist die content_item_id selbst, ohne jede Account-/Session-Prüfung.
   */
  submitAnswer: publicProcedure.input(submitQuizAnswerInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const { isCorrect, correctOptionId } = checkMcAnswer(options, input.selectedOptionId);
    return { isCorrect, correctOptionId, explanation: item.explanation };
  }),

  submitMatching: publicProcedure.input(submitMatchingInputSchema).mutation(async ({ ctx, input }) => {
    await findPublishedItem(ctx.db, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    return checkMatching(
      options,
      input.pairs.map((pair) => ({ leftOptionId: pair.leftOptionId, rightOptionId: pair.rightOptionId })),
    );
  }),

  submitBlanks: publicProcedure.input(submitBlanksInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, input.contentItemId);
    return checkBlanks(item.payload, input.answers);
  }),

  submitKurzantwort: publicProcedure.input(submitKurzantwortInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, input.contentItemId);
    const { isCorrect, correctAnswer } = checkKurzantwort(item.payload, input.answer);
    return { isCorrect, correctAnswer, explanation: item.explanation };
  }),
});

async function findPublishedItem(db: Database, contentItemId: string) {
  const [item] = await db
    .select({ id: contentItem.id, payload: contentItem.payload, explanation: contentItem.explanation })
    .from(contentItem)
    .innerJoin(thema, eq(thema.id, contentItem.themaId))
    .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
    .innerJoin(kurs, eq(kurs.id, fachgebiet.kursId))
    .where(and(eq(contentItem.id, contentItemId), eq(contentItem.isActive, true), eq(kurs.isPublished, true)))
    .limit(1);

  if (!item) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden." });
  }
  return item;
}
