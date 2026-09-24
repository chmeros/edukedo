import {
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  checkMcMultiAnswer,
  checkQuadrantAnswer,
  checkSortierenAnswer,
  GANTT_QUIZ_TYPE,
  HIERARCHIE_QUIZ_TYPE,
  MC_LIKE_QUIZ_TYPES,
  QUADRANT_QUIZ_TYPES,
  shapeQuizItem,
  submitBlanksInputSchema,
  submitKurzantwortInputSchema,
  submitMatchingInputSchema,
  submitMcMultiInputSchema,
  submitQuadrantInputSchema,
  submitQuizAnswerInputSchema,
  submitSortierenInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, inArray, sql } from "drizzle-orm";
import { checkRateLimit } from "../../auth/rate-limit";
import type { Database } from "../../db/client";
import { answerOption, contentItem, fachgebiet, kurs, thema } from "../../db/schema";
import { publicProcedure, router } from "../trpc";

const PREVIEW_ITEM_LIMIT = 5;

/**
 * Code-Review-Fund (23.09.2026, siehe Architekturplanung Abschnitt 13): dieser ganze Router ist
 * bewusst kontolos (publicProcedure, siehe oben) — genau das machte ihn ohne eigene Begrenzung zu
 * einem unauthentifizierten Antwort-Orakel: ein Skript konnte `items` beliebig oft aufrufen, um
 * Content-Item-IDs quer über den gesamten veröffentlichten Katalog zu sammeln, und anschließend
 * jede der submit*-Prozeduren beliebig oft aufrufen, um sich so einen vollständigen
 * Lösungsschlüssel zu erarbeiten — ohne Konto, ohne erkennbaren Nutzer, ohne Kosten. Begrenzung
 * nach IP (`ctx.req.ip`) statt nach Konto, da hier keines existiert — dieselbe
 * In-Memory-Implementierung wie beim Login/Freundeskreis-Code (siehe auth/rate-limit.ts). Ein
 * gemeinsamer Schlüssel für alle sieben submit*-Prozeduren (statt je einer eigenen), damit ein
 * Umgehen der Grenze durch Verteilen der Aufrufe auf mehrere Aufgabentypen nicht möglich ist.
 */
const PREVIEW_ITEMS_RATE_LIMIT_MAX_ATTEMPTS = 20;
const PREVIEW_ITEMS_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10; // 10 Minuten
const PREVIEW_SUBMIT_RATE_LIMIT_MAX_ATTEMPTS = 30;
const PREVIEW_SUBMIT_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10; // 10 Minuten

function assertPreviewRateLimit(ip: string, bucket: "items" | "submit", maxAttempts: number, windowMs: number): void {
  if (!checkRateLimit(`preview-${bucket}:${ip}`, maxAttempts, windowMs)) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Zu viele Anfragen an den Vorschau-Modus. Bitte versuch es in ein paar Minuten erneut.",
    });
  }
}

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
    assertPreviewRateLimit(ctx.req.ip, "items", PREVIEW_ITEMS_RATE_LIMIT_MAX_ATTEMPTS, PREVIEW_ITEMS_RATE_LIMIT_WINDOW_MS);

    const items = await ctx.db
      .select({ id: contentItem.id, type: contentItem.type, prompt: contentItem.prompt, payload: contentItem.payload })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(kurs, eq(kurs.id, fachgebiet.kursId))
      .where(
        and(
          // F-113: MC_LIKE_QUIZ_TYPES sind strukturell identisch zu quiz_mc. F-114:
          // QUADRANT_QUIZ_TYPES sind eine visuelle Zuordnungs-Variante mit N Zonen. F-116:
          // quiz_mc_multi lädt genauso Optionen wie MC_LIKE_QUIZ_TYPES. F-115: luecken_auswahl
          // wird genau wie "luecken" bewertet. Siehe quiz-logic.ts.
          inArray(contentItem.type, [
            ...MC_LIKE_QUIZ_TYPES,
            "quiz_mc_multi",
            "zuordnung",
            "sortieren",
            ...QUADRANT_QUIZ_TYPES,
            GANTT_QUIZ_TYPE,
            HIERARCHIE_QUIZ_TYPE,
            "luecken",
            "luecken_auswahl",
            "kurzantwort",
          ]),
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
      .filter(
        (item) =>
          item.type === "quiz_mc_multi" ||
          (MC_LIKE_QUIZ_TYPES as readonly string[]).includes(item.type) ||
          item.type === "zuordnung" ||
          item.type === "sortieren" ||
          item.type === GANTT_QUIZ_TYPE ||
          item.type === HIERARCHIE_QUIZ_TYPE ||
          (QUADRANT_QUIZ_TYPES as readonly string[]).includes(item.type),
      )
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
    const item = await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const { isCorrect, correctOptionId } = checkMcAnswer(options, input.selectedOptionId);
    return { isCorrect, correctOptionId, explanation: item.explanation };
  }),

  submitMcMulti: publicProcedure.input(submitMcMultiInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    const { isCorrect, correctOptionIds } = checkMcMultiAnswer(options, input.selectedOptionIds);
    return { isCorrect, correctOptionIds, explanation: item.explanation };
  }),

  submitMatching: publicProcedure.input(submitMatchingInputSchema).mutation(async ({ ctx, input }) => {
    await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    return checkMatching(
      options,
      input.pairs.map((pair) => ({ leftOptionId: pair.leftOptionId, rightOptionId: pair.rightOptionId })),
    );
  }),

  submitSortieren: publicProcedure.input(submitSortierenInputSchema).mutation(async ({ ctx, input }) => {
    await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    return checkSortierenAnswer(options, input.orderedOptionIds);
  }),

  submitQuadrant: publicProcedure.input(submitQuadrantInputSchema).mutation(async ({ ctx, input }) => {
    await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const options = await ctx.db
      .select()
      .from(answerOption)
      .where(eq(answerOption.contentItemId, input.contentItemId));

    return checkQuadrantAnswer(options, input.placements);
  }),

  submitBlanks: publicProcedure.input(submitBlanksInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    return checkBlanks(item.payload, input.answers);
  }),

  submitKurzantwort: publicProcedure.input(submitKurzantwortInputSchema).mutation(async ({ ctx, input }) => {
    const item = await findPublishedItem(ctx.db, ctx.req.ip, input.contentItemId);
    const { isCorrect, correctAnswer } = checkKurzantwort(item.payload, input.answer);
    return { isCorrect, correctAnswer, explanation: item.explanation };
  }),
});

async function findPublishedItem(db: Database, ip: string, contentItemId: string) {
  assertPreviewRateLimit(ip, "submit", PREVIEW_SUBMIT_RATE_LIMIT_MAX_ATTEMPTS, PREVIEW_SUBMIT_RATE_LIMIT_WINDOW_MS);

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
