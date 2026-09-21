import {
  activeKursInputSchema,
  dueCardsInputSchema,
  fachgespraechFragePayloadSchema,
  searchContentInputSchema,
  theoriePayloadSchema,
  themaCardsInputSchema,
} from "@edukedo/shared";
import { and, asc, eq, ilike, inArray, isNull, lte, ne, or, sql } from "drizzle-orm";
import { contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** ILIKE behandelt "%"/"_" als Wildcards und "\" als Escape-Zeichen — ohne Escaping würde ein
 * Suchbegriff wie "50%" jedes beliebige Zeichen an dieser Stelle treffen statt eines wörtlichen
 * Prozentzeichens. */
export function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export const contentRouter = router({
  /**
   * Fällige Karteikarten (F-20) im ausgewählten Kurs (F-09: Mehrfach-Kursbelegung aktiv
   * genutzt, siehe Architekturplanung Abschnitt 13 — vorher über alle eingeschriebenen
   * Kurse hinweg aggregiert): neue Karten (kein user_progress-Datensatz) zuerst, danach nach
   * Fälligkeit (Architekturplanung Abschnitt 4.3, Index auf user_progress(user_id, due_at)).
   *
   * F-110: `contentItemIds` (gezielte Auswahl einzelner Karten, siehe `content.themaFlashcards`)
   * und `onlyFlagged` (nur als "schwierig" markierte Karten) ersetzen jeweils die reguläre
   * Fälligkeitsfilterung — beide sollen Karten unabhängig vom FSRS-Fälligkeitszeitpunkt liefern.
   * Schließen sich gegenseitig aus (Frontend zeigt immer nur einen der beiden Auswahlmodi
   * gleichzeitig an); bei gemeinsamer Angabe hat `contentItemIds` Vorrang.
   */
  dueCards: protectedProcedure.input(dueCardsInputSchema).query(async ({ ctx, input }) => {
    const now = new Date();

    const conditions = [eq(contentItem.type, "karteikarte"), eq(contentItem.isActive, true)];
    if (input.contentItemIds) {
      conditions.push(inArray(contentItem.id, input.contentItemIds));
    } else if (input.onlyFlagged) {
      conditions.push(eq(userProgress.flaggedAsDifficult, true));
    } else {
      conditions.push(or(isNull(userProgress.dueAt), lte(userProgress.dueAt, now))!);
    }
    // F-27: optionaler Thema-Filter — siehe themaFilterableKursInputSchema.
    if (input.themaId) {
      conditions.push(eq(thema.id, input.themaId));
    }

    const rows = await ctx.db
      .select({
        id: contentItem.id,
        prompt: contentItem.prompt,
        explanation: contentItem.explanation,
        dueAt: userProgress.dueAt,
        flaggedAsDifficult: userProgress.flaggedAsDifficult,
      })
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
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(and(...conditions))
      // NULLS FIRST: neue, noch nie geübte Karten (kein user_progress-Datensatz) vor
      // bereits fälligen Wiederholungen — Postgres sortiert NULL bei ASC sonst zuletzt.
      .orderBy(sql`${userProgress.dueAt} asc nulls first`)
      // F-110: bei expliziter Auswahl (contentItemIds) darf die Auswahl nicht stillschweigend
      // auf 20 Karten gekürzt werden — sie ist bereits durch die Auswahl selbst begrenzt.
      .limit(input.contentItemIds ? input.contentItemIds.length : 20);

    return rows.map((row) => ({
      id: row.id,
      prompt: row.prompt,
      explanation: row.explanation,
      flaggedAsDifficult: row.flaggedAsDifficult ?? false,
    }));
  }),

  /**
   * F-110: Alle Karteikarten eines einzelnen Themas (nicht nur die fälligen) für die gezielte
   * Auswahl einzelner Karten — Basis der Checkliste im Frontend (`content.dueCards` mit
   * `contentItemIds` lädt anschließend genau die dort ausgewählten).
   */
  themaFlashcards: protectedProcedure.input(themaCardsInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        id: contentItem.id,
        prompt: contentItem.prompt,
        dueAt: userProgress.dueAt,
        flaggedAsDifficult: userProgress.flaggedAsDifficult,
      })
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
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(and(eq(contentItem.type, "karteikarte"), eq(contentItem.isActive, true), eq(thema.id, input.themaId)))
      .orderBy(asc(contentItem.createdAt));

    const now = new Date();
    return rows.map((row) => ({
      id: row.id,
      prompt: row.prompt,
      due: row.dueAt === null || row.dueAt <= now,
      flaggedAsDifficult: row.flaggedAsDifficult ?? false,
    }));
  }),

  /**
   * Theorie-Abschnitte (Fließtext je Thema) im ausgewählten Kurs — gruppiert nach
   * Fachgebiet, sortiert nach fachgebiet.sort_order/thema.sort_order. Es gibt je Thema
   * höchstens einen Theorie-content_item (siehe apps/api/src/db/import-content.ts).
   */
  theorySections: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        contentItemId: contentItem.id,
        payload: contentItem.payload,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
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
      .where(and(eq(contentItem.type, "theorie"), eq(contentItem.isActive, true)))
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder));

    return rows.map((row) => ({
      id: row.contentItemId,
      fachgebietTitle: row.fachgebietTitle,
      themaTitle: row.themaTitle,
      bodyMarkdown: theoriePayloadSchema.parse(row.payload).body_markdown,
    }));
  }),

  /**
   * F-25 Fachgesprächs-Trainer: zufällige Auswahl von Übungsfragen über den ganzen Kurs
   * hinweg (mehrere Handlungsbereiche, analog zu F-23) — reiner Fragen-Pool ohne
   * Scoring/Sitzung, daher keine eigene Mutation zum Beantworten nötig. Nur beim Fachwirt-
   * Piloten relevant (siehe content/README.md); andere Kurse liefern einfach eine leere Liste.
   */
  fachgespraechFragen: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({ id: contentItem.id, prompt: contentItem.prompt, payload: contentItem.payload })
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
      .where(and(eq(contentItem.type, "fachgespraech_frage"), eq(contentItem.isActive, true)))
      .orderBy(sql`random()`)
      .limit(20);

    return rows.map((row) => ({
      id: row.id,
      frage: row.prompt,
      themaTitel: fachgespraechFragePayloadSchema.parse(row.payload).themaTitel,
    }));
  }),

  /**
   * F-14: Volltextsuche über alle Lerninhalte eines Kurses — sucht in `prompt` (bei jedem
   * Content-Typ die eigentliche Fragestellung) sowie `explanation`, wo vorhanden. Bewusst
   * OHNE `type = "theorie"`: Der Theorie-Tab ist seit F-103 ohne Zugriffsweg im eingeloggten
   * Bereich, ein Suchtreffer dorthin liefe ins Leere. Ergebnisse verlinken über die Thema-ID
   * in den "Lernen"-Tab (bestehender F-27-Themenfilter, siehe App.tsx) statt einer neuen
   * "einzelnes Content-Item anzeigen"-Ansicht — weder `content.dueCards` (nur fällige Karten)
   * noch `quiz.quizItems` (zufällige 20er-Runde) unterstützen das gezielte Ansteuern eines
   * einzelnen Items, siehe Architekturplanung Abschnitt 13.
   */
  search: protectedProcedure.input(searchContentInputSchema).query(async ({ ctx, input }) => {
    const pattern = `%${escapeLikePattern(input.query)}%`;

    const rows = await ctx.db
      .select({
        id: contentItem.id,
        type: contentItem.type,
        prompt: contentItem.prompt,
        themaId: thema.id,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
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
      .where(
        and(
          ne(contentItem.type, "theorie"),
          eq(contentItem.isActive, true),
          or(ilike(contentItem.prompt, pattern), ilike(contentItem.explanation, pattern)),
        ),
      )
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder))
      .limit(30);

    return rows;
  }),
});
