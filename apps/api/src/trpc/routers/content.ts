import {
  activeKursInputSchema,
  dueCardsInputSchema,
  fachgespraechFragePayloadSchema,
  GANTT_QUIZ_TYPE,
  HIERARCHIE_QUIZ_TYPE,
  QUADRANT_QUIZ_TYPES,
  searchContentInputSchema,
  theoriePayloadSchema,
  theorieThemaInputSchema,
  themaCardsInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, ilike, inArray, isNull, lte, ne, or, sql } from "drizzle-orm";
import { contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** ILIKE behandelt "%"/"_" als Wildcards und "\" als Escape-Zeichen — ohne Escaping würde ein
 * Suchbegriff wie "50%" jedes beliebige Zeichen an dieser Stelle treffen statt eines wörtlichen
 * Prozentzeichens. */
export function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

// F-105 (ToDo-Punkt 6 vom 23.09.2026, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
// Abschnitt 13): alle Content-Typen, die ein "Instrument" im Werkzeugkasten-Katalog
// (Instrumente.tsx) repräsentieren — dieselbe Typliste, die auch quiz.ts/preview.ts/progress.ts
// für die Zonen-Zuordnungsfragen verwenden (QUADRANT_QUIZ_TYPES + Gantt + Hierarchie).
const INSTRUMENT_TYPES = [...QUADRANT_QUIZ_TYPES, GANTT_QUIZ_TYPE, HIERARCHIE_QUIZ_TYPE];

export const contentRouter = router({
  /**
   * Fällige Karteikarten (F-20) im ausgewählten Kurs (F-09: Mehrfach-Kursbelegung aktiv
   * genutzt, siehe Architekturplanung Abschnitt 13 — vorher über alle eingeschriebenen
   * Kurse hinweg aggregiert): fällige Wiederholungen zuerst (nach Fälligkeit), neue Karten (kein
   * user_progress-Datensatz) füllen die übrigen Plätze, siehe Review LOG-07 (Architekturplanung Abschnitt 4.3, Index auf user_progress(user_id, due_at)).
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
        // F-164: für "Im Thema nachlesen" (Lesefenster) nach dem Aufdecken der Karte.
        themaId: thema.id,
        themaTitle: thema.title,
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
      // Review LOG-07: Fällige Wiederholungen zuerst (die am längsten überfällige zuerst), neue Karten (kein user_progress-Datensatz)
      // füllen nur die übrigen Plätze der Runde. Vorher standen neue Karten vorn; bei vielen ungesehenen Karten kamen fällige
      // Wiederholungen dadurch nie dran, und das Vergessen stieg. Ein Tageslimit für neue Karten gibt es noch nicht.
      .orderBy(sql`${userProgress.dueAt} asc nulls last`)
      // F-110: bei expliziter Auswahl (contentItemIds) darf die Auswahl nicht stillschweigend
      // auf 20 Karten gekürzt werden — sie ist bereits durch die Auswahl selbst begrenzt.
      .limit(input.contentItemIds ? input.contentItemIds.length : 20);

    return rows.map((row) => ({
      id: row.id,
      prompt: row.prompt,
      explanation: row.explanation,
      themaId: row.themaId,
      themaTitle: row.themaTitle,
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

    // Review LOG-17: Ein einziges defektes Payload lässt nicht die gesamte Theorie-Liste scheitern; der Abschnitt entfällt.
    return rows.flatMap((row) => {
      const payload = theoriePayloadSchema.safeParse(row.payload);
      if (!payload.success) return [];
      return [
        {
          id: row.contentItemId,
          fachgebietTitle: row.fachgebietTitle,
          themaTitle: row.themaTitle,
          bodyMarkdown: payload.data.body_markdown,
        },
      ];
    });
  }),

  /**
   * F-164: Theorie eines einzelnen Themas für das Lesefenster (Seitenleiste). Zugriff nur für
   * Personen, die den Kurs belegt haben (wie alle Content-Abfragen); ein Thema ohne Theorie
   * ergibt `null` (das Lesefenster zeigt dann einen Hinweis statt eines Fehlers).
   */
  theorieThema: protectedProcedure.input(theorieThemaInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select({
        payload: contentItem.payload,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
      .from(thema)
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(
          eq(userCourse.kursId, fachgebiet.kursId),
          eq(userCourse.userId, ctx.currentUser.id),
          eq(userCourse.kursId, input.kursId),
        ),
      )
      .leftJoin(contentItem, and(eq(contentItem.themaId, thema.id), eq(contentItem.type, "theorie"), eq(contentItem.isActive, true)))
      .where(eq(thema.id, input.themaId))
      .limit(1);

    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Thema nicht gefunden." });
    }
    return {
      themaId: input.themaId,
      themaTitle: row.themaTitle,
      fachgebietTitle: row.fachgebietTitle,
      bodyMarkdown: row.payload ? theoriePayloadSchema.parse(row.payload).body_markdown : null,
    };
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
   * Bereich, ein Suchtreffer dorthin liefe ins Leere. **F-164:** Theorie-Treffer kommen jetzt als
   * eigene Zeilen (`type: "theorie"`, Volltext im Theorie-Text) und öffnen das Lesefenster statt
   * den Themenfilter. Ergebnisse verlinken über die Thema-ID
   * in den "Lernen"-Tab (bestehender F-27-Themenfilter, siehe App.tsx) statt einer neuen
   * "einzelnes Content-Item anzeigen"-Ansicht — weder `content.dueCards` (nur fällige Karten)
   * noch `quiz.quizItems` (zufällige 20er-Runde) unterstützen das gezielte Ansteuern eines
   * einzelnen Items, siehe Architekturplanung Abschnitt 13.
   */
  search: protectedProcedure.input(searchContentInputSchema).query(async ({ ctx, input }) => {
    const pattern = `%${escapeLikePattern(input.query)}%`;

    // F-164: Treffer im Theorie-Text (je Thema höchstens ein Item) — zuerst, maximal 8.
    const theorieTreffer = await ctx.db
      .select({
        id: contentItem.id,
        type: contentItem.type,
        prompt: thema.title,
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
          eq(contentItem.type, "theorie"),
          eq(contentItem.isActive, true),
          ilike(sql<string>`${contentItem.payload}->>'body_markdown'`, pattern),
        ),
      )
      .orderBy(asc(fachgebiet.sortOrder), asc(thema.sortOrder))
      .limit(8);

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

    return [...theorieTreffer, ...rows];
  }),

  /**
   * F-105 (ToDo-Punkt 6, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung Abschnitt 13):
   * kursspezifischer Werkzeugkasten-Katalog im Tab "Instrumente" — je Instrument-Typ das
   * früheste Thema mit mindestens einem aktiven Content-Item dieses Typs im gewählten Kurs.
   * Bestimmt, ob und wohin "Zu diesem Instrument lernen" springt (bestehender F-27-Themenfilter,
   * siehe App.tsx). Ein Instrument ganz ohne Content in diesem Kurs bleibt im (statischen)
   * Frontend-Katalog sichtbar, aber ohne Sprungziel — der Mathe-Kurs und der Fachwirt-Kurs haben
   * naturgemäß unterschiedliche Instrumente mit Content hinterlegt.
   */
  instruments: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        type: contentItem.type,
        themaId: thema.id,
        themaTitle: thema.title,
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
      .where(and(inArray(contentItem.type, INSTRUMENT_TYPES), eq(contentItem.isActive, true)))
      .orderBy(asc(contentItem.createdAt));

    const byType: Record<string, { themaId: string; themaTitle: string }> = {};
    for (const row of rows) {
      if (!byType[row.type]) {
        byType[row.type] = { themaId: row.themaId, themaTitle: row.themaTitle };
      }
    }
    return byType;
  }),
});
