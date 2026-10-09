import { TRPCError } from "@trpc/server";
import { and, asc, count, eq, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";
import { enforceRateLimit, LIMITS } from "../../auth/request-limits";
import { kursZielgruppe, matchesKursZielgruppe } from "../../course-audience";
import { leseAnsicht, suchAusschnitt } from "../../content-reader";
import type { Database } from "../../db/client";
import { answerOption, contentItem, fachgebiet, kurs, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";
import { escapeLikePattern } from "./content";

/**
 * Lese-Modus für Kursinhalte (Review UXL-12): Lehrkräfte und Interessierte können die Inhalte eines Kurses mit Lösungen ansehen,
 * ohne ihm beizutreten (bei Weiterbildungskursen wäre dafür sonst der bisherige Kurs zu verlassen). Rein lesend, ohne Fortschritt,
 * Credits oder Lernereignisse. Zugang: angemeldetes Konto und ein veröffentlichter Kurs, dessen Zielgruppe zur Altersgruppe passt (wie
 * beim Beitritt); es werden nur aktive Inhalte gezeigt, also nichts, was noch ungeprüft oder zurückgezogen ist.
 */
async function kursOffen(db: Database, userId: string, isMinor: boolean, kursId: string): Promise<void> {
  const [kursRow] = await db.select({ isPublished: kurs.isPublished, metadata: kurs.metadata }).from(kurs).where(eq(kurs.id, kursId)).limit(1);
  if (!kursRow?.isPublished) throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht gefunden." });
  if (matchesKursZielgruppe(kursZielgruppe(kursRow.metadata), isMinor)) return;
  // Wer den Kurs schon belegt, behält den Zugang, auch wenn sich die Zielgruppe später ändert (wie in courses.list).
  const [belegt] = await db.select({ id: userCourse.id }).from(userCourse).where(and(eq(userCourse.userId, userId), eq(userCourse.kursId, kursId))).limit(1);
  if (!belegt) throw new TRPCError({ code: "FORBIDDEN", message: "Dieser Kurs ist für deine Altersgruppe nicht vorgesehen." });
}

export const kursInhaltRouter = router({
  /** Gliederung eines Kurses: Fachgebiete mit Themen und der Zahl aktiver Inhalte je Thema. */
  uebersicht: protectedProcedure.input(z.object({ kursId: z.string().uuid() })).query(async ({ ctx, input }) => {
    await kursOffen(ctx.db, ctx.currentUser.id, ctx.currentUser.isMinor, input.kursId);
    const rows = await ctx.db
      .select({
        fachgebietId: fachgebiet.id,
        fachgebietCode: fachgebiet.code,
        fachgebietTitle: fachgebiet.title,
        themaId: thema.id,
        themaTitle: thema.title,
        anzahl: count(contentItem.id),
      })
      .from(fachgebiet)
      .innerJoin(thema, eq(thema.fachgebietId, fachgebiet.id))
      .leftJoin(contentItem, and(eq(contentItem.themaId, thema.id), eq(contentItem.isActive, true)))
      .where(eq(fachgebiet.kursId, input.kursId))
      .groupBy(fachgebiet.id, fachgebiet.code, fachgebiet.title, fachgebiet.sortOrder, thema.id, thema.title, thema.sortOrder)
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder));

    const fachgebiete = new Map<string, { id: string; code: string; title: string; themen: { id: string; title: string; anzahl: number }[] }>();
    for (const row of rows) {
      const eintrag = fachgebiete.get(row.fachgebietId) ?? { id: row.fachgebietId, code: row.fachgebietCode, title: row.fachgebietTitle, themen: [] };
      eintrag.themen.push({ id: row.themaId, title: row.themaTitle, anzahl: row.anzahl });
      fachgebiete.set(row.fachgebietId, eintrag);
    }
    return [...fachgebiete.values()];
  }),

  /**
   * Suche über den ganzen Kurs (Aufgabentext, Erklärung bzw. Rückseite, Theorietext), ohne Beitritt, nur aktive Inhalte. Liefert
   * höchstens 40 Treffer in der Reihenfolge der Gliederung, je mit Ausschnitt; die Lösung selbst steht erst in der Themenansicht.
   */
  suche: protectedProcedure.input(z.object({ kursId: z.string().uuid(), query: z.string().trim().min(2).max(200) })).query(async ({ ctx, input }) => {
    enforceRateLimit(`kursinhalt-suche:${ctx.currentUser.id}`, LIMITS.kursInhaltSuchePerUser, "Zu viele Suchanfragen in kurzer Zeit. Bitte warte einige Minuten.");
    await kursOffen(ctx.db, ctx.currentUser.id, ctx.currentUser.isMinor, input.kursId);
    const muster = `%${escapeLikePattern(input.query)}%`;
    const koerper = sql<string | null>`${contentItem.payload}->>'body_markdown'`;
    const rows = await ctx.db
      .select({
        id: contentItem.id,
        type: contentItem.type,
        prompt: contentItem.prompt,
        explanation: contentItem.explanation,
        koerper,
        themaId: thema.id,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(
        and(
          eq(fachgebiet.kursId, input.kursId),
          eq(contentItem.isActive, true),
          or(ilike(contentItem.prompt, muster), ilike(contentItem.explanation, muster), ilike(koerper, muster)),
        ),
      )
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder), asc(contentItem.createdAt), asc(contentItem.id))
      .limit(41);

    return {
      zuViele: rows.length > 40,
      treffer: rows.slice(0, 40).map((row) => ({
        id: row.id,
        type: row.type,
        themaId: row.themaId,
        themaTitle: row.themaTitle,
        fachgebietTitle: row.fachgebietTitle,
        ausschnitt: suchAusschnitt(row.prompt, input.query) ?? suchAusschnitt(row.explanation, input.query) ?? suchAusschnitt(row.koerper, input.query) ?? row.prompt.slice(0, 140),
      })),
    };
  }),

  /** Inhalte eines Themas mit Lösung (aktive Inhalte, in der Reihenfolge der Erstellung). */
  thema: protectedProcedure.input(z.object({ themaId: z.string().uuid() })).query(async ({ ctx, input }) => {
    const [themaRow] = await ctx.db
      .select({ kursId: fachgebiet.kursId, title: thema.title })
      .from(thema)
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(eq(thema.id, input.themaId))
      .limit(1);
    if (!themaRow) throw new TRPCError({ code: "NOT_FOUND", message: "Thema nicht gefunden." });
    await kursOffen(ctx.db, ctx.currentUser.id, ctx.currentUser.isMinor, themaRow.kursId);

    const items = await ctx.db
      .select({ id: contentItem.id, type: contentItem.type, prompt: contentItem.prompt, explanation: contentItem.explanation, payload: contentItem.payload })
      .from(contentItem)
      .where(and(eq(contentItem.themaId, input.themaId), eq(contentItem.isActive, true)))
      .orderBy(asc(contentItem.createdAt), asc(contentItem.id));
    const optionen = items.length
      ? await ctx.db
          .select({
            contentItemId: answerOption.contentItemId,
            text: answerOption.text,
            isCorrect: answerOption.isCorrect,
            groupKey: answerOption.groupKey,
            side: answerOption.side,
            sortOrder: answerOption.sortOrder,
          })
          .from(answerOption)
          .innerJoin(contentItem, eq(contentItem.id, answerOption.contentItemId))
          .where(and(eq(contentItem.themaId, input.themaId), eq(contentItem.isActive, true)))
      : [];

    return {
      themaTitle: themaRow.title,
      items: items.map((item) => ({
        id: item.id,
        type: item.type,
        prompt: item.prompt,
        ...leseAnsicht({
          type: item.type,
          prompt: item.prompt,
          explanation: item.explanation,
          payload: item.payload,
          options: optionen.filter((option) => option.contentItemId === item.id),
        }),
      })),
    };
  }),
});
