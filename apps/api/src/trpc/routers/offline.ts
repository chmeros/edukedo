import {
  activeKursInputSchema,
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  initialProgressState,
  QuizItemNotFoundError,
  syncQueueInputSchema,
} from "@edukedo/shared";
import { and, asc, eq, inArray } from "drizzle-orm";
import { ZodError } from "zod";
import { answerOption, contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";
import { applyReview, recordQuizAttempt } from "./progress";

const OFFLINE_CONTENT_TYPES = ["karteikarte", "quiz_mc", "zuordnung", "luecken", "kurzantwort"] as const;

export const offlineRouter = router({
  /**
   * F-42 Baustein 3 ("Für offline verfügbar machen"): liefert den vollständigen Karteikarten-/
   * Quiz-Bestand eines Kurses INKLUSIVE Lösung für die lokale IndexedDB-Kopie
   * (apps/web/src/offlineDb.ts) — anders als content.dueCards/quiz.quizItems, die die Lösung
   * serverseitig zurückhalten. Bewusste Nutzer-Entscheidung (siehe Architekturplanung
   * Abschnitt 13): Offline soll sofortiges Feedback wie online möglich sein, der Kompromiss
   * (Lösungen liegen für heruntergeladene Fragen lokal vor) wurde als vertretbar eingestuft.
   *
   * Liefert ALLE aktiven Items des Kurses statt nur fälliger Karten/einer zufälligen
   * 20er-Quiz-Auswahl, damit die Offline-Kopie über die gesamte Downloadphase hinweg nutzbar
   * bleibt — Fälligkeiten verschieben sich auch ohne Serverkontakt weiter, und eine feste
   * 20er-Auswahl wäre nach deren Bearbeitung erschöpft.
   */
  downloadKurs: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        id: contentItem.id,
        themaId: thema.id,
        type: contentItem.type,
        prompt: contentItem.prompt,
        explanation: contentItem.explanation,
        payload: contentItem.payload,
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
      .where(and(inArray(contentItem.type, [...OFFLINE_CONTENT_TYPES]), eq(contentItem.isActive, true)));

    if (rows.length === 0) {
      return { items: [] };
    }

    const itemIds = rows.map((row) => row.id);
    const [options, progressRows] = await Promise.all([
      ctx.db
        .select()
        .from(answerOption)
        .where(inArray(answerOption.contentItemId, itemIds))
        .orderBy(asc(answerOption.contentItemId), asc(answerOption.sortOrder)),
      ctx.db
        .select()
        .from(userProgress)
        .where(and(eq(userProgress.userId, ctx.currentUser.id), inArray(userProgress.contentItemId, itemIds))),
    ]);

    const optionsByItem = new Map<string, (typeof options)[number][]>();
    for (const option of options) {
      const list = optionsByItem.get(option.contentItemId) ?? [];
      list.push(option);
      optionsByItem.set(option.contentItemId, list);
    }
    const progressByItem = new Map(progressRows.map((row) => [row.contentItemId, row] as const));
    const now = new Date();

    return {
      items: rows.map((row) => {
        const existingProgress = progressByItem.get(row.id);
        // Nie geübte Karten haben noch keine user_progress-Zeile — derselbe initiale
        // FSRS-Zustand wie beim ersten Server-seitigen submitReview (siehe progress.ts),
        // damit die erste Offline-Bewertung exakt wie online plant.
        const progress =
          row.type === "karteikarte"
            ? existingProgress
              ? {
                  difficulty: existingProgress.difficulty,
                  stability: existingProgress.stability,
                  state: existingProgress.state,
                  dueAt: existingProgress.dueAt,
                  lastReviewedAt: existingProgress.lastReviewedAt,
                  reps: existingProgress.reps,
                  lapses: existingProgress.lapses,
                }
              : initialProgressState(now)
            : null;

        return {
          id: row.id,
          kursId: input.kursId,
          themaId: row.themaId,
          type: row.type as (typeof OFFLINE_CONTENT_TYPES)[number],
          prompt: row.prompt,
          explanation: row.explanation,
          payload: row.payload,
          options: (optionsByItem.get(row.id) ?? []).map((option) => ({
            id: option.id,
            contentItemId: option.contentItemId,
            text: option.text,
            isCorrect: option.isCorrect,
            side: option.side as "links" | "rechts" | null,
            groupKey: option.groupKey,
            // F-113 Teil 2: RawAnswerOption (quiz-logic.ts, @edukedo/shared) verlangt seither
            // sortOrder für alle Typen — für die hier offline unterstützten Typen (quiz_mc,
            // zuordnung) bleibt der Wert ungenutzt (nur bei "sortieren" bewusst nicht offline
            // verfügbar, siehe OFFLINE_CONTENT_TYPES).
            sortOrder: option.sortOrder,
          })),
          progress,
        };
      }),
    };
  }),

  /**
   * F-42 Baustein 5 (Sync-Endpunkt): spielt die lokal gepufferten Ereignisse aus
   * apps/web/src/offlineDb.ts (`queue`-Tabelle) chronologisch (`occurredAt`) über dieselben
   * Prüf-/Fortschritts-Pfade wie die Online-Mutationen nach (applyReview für Karteikarten,
   * recordQuizAttempt + die vier check*-Funktionen für Quiz) — bewusstes Ereignis-Replay statt
   * "Last Write Wins", damit bei Mehrgeräte-Nutzung keine zwischenzeitliche Wiederholung
   * verloren geht (siehe Architekturplanung Abschnitt 13). Jeder Eintrag trägt seine
   * client-generierte `id` als Idempotenz-Schlüssel (learningEvent.clientEventId), falls ein
   * Sync-Versuch abbricht und wiederholt wird.
   *
   * Antwortoptionen (quiz_mc/zuordnung) und Payloads (luecken/kurzantwort) werden vorab
   * gebündelt geladen (wie downloadKurs oben) statt je Eintrag einzeln nachzuladen — ein
   * Kurs-Sync bezieht sich typischerweise auf eine überschaubare Anzahl unterschiedlicher
   * content_item-Zeilen, auch wenn die Warteschlange selbst länger sein kann.
   */
  syncQueue: protectedProcedure.input(syncQueueInputSchema).mutation(async ({ ctx, input }) => {
    const entries = [...input.entries].sort((a, b) => a.occurredAt.getTime() - b.occurredAt.getTime());

    // Code-Review-Fund, nachgezogen: vorher gab es für "review"-Ereignisse (Karteikarten) gar
    // keine Existenz-/Aktiv-Prüfung vor `applyReview` — ein zwischenzeitlich hart gelöschtes
    // content_item (z. B. durch einen Content-Re-Import, siehe import-content.ts) löste dort
    // einen rohen Fremdschlüssel-Fehler aus, der NICHT von der QuizItemNotFoundError/ZodError-
    // Behandlung unten abgefangen wurde und den gesamten restlichen Batch dauerhaft blockierte
    // (derselbe Eintrag steht nach dem Sortieren immer wieder an derselben Stelle). Ebenso
    // fehlte für alle Ereignistypen ein `isActive`-Filter, obwohl `downloadKurs` oben nur aktive
    // Items ausliefert — ein zwischenzeitlich deaktiviertes (nicht gelöschtes) Item wurde bisher
    // stillschweigend akzeptiert statt wie dokumentiert übersprungen zu werden. Eine einzige,
    // vorab gebündelte Prüfung auf "existiert UND aktiv" für ALLE Ereignistypen behebt beides an
    // der Wurzel, statt es je Ereignistyp einzeln nachzuziehen.
    const allItemIds = [...new Set(entries.map((e) => e.contentItemId))];
    const activeItemRows = allItemIds.length
      ? await ctx.db
          .select({ id: contentItem.id })
          .from(contentItem)
          .where(and(inArray(contentItem.id, allItemIds), eq(contentItem.isActive, true)))
      : [];
    const activeItemIds = new Set(activeItemRows.map((row) => row.id));

    const optionItemIds = [
      ...new Set(
        entries.filter((e) => e.event.kind === "quiz_mc" || e.event.kind === "zuordnung").map((e) => e.contentItemId),
      ),
    ];
    const payloadItemIds = [
      ...new Set(
        entries.filter((e) => e.event.kind === "luecken" || e.event.kind === "kurzantwort").map((e) => e.contentItemId),
      ),
    ];

    const [optionRows, payloadRows] = await Promise.all([
      optionItemIds.length
        ? ctx.db.select().from(answerOption).where(inArray(answerOption.contentItemId, optionItemIds))
        : Promise.resolve([]),
      payloadItemIds.length
        ? ctx.db.select({ id: contentItem.id, payload: contentItem.payload }).from(contentItem).where(
            inArray(contentItem.id, payloadItemIds),
          )
        : Promise.resolve([]),
    ]);

    const optionsByItem = new Map<string, typeof optionRows>();
    for (const option of optionRows) {
      const list = optionsByItem.get(option.contentItemId) ?? [];
      list.push(option);
      optionsByItem.set(option.contentItemId, list);
    }
    const payloadByItem = new Map(payloadRows.map((row) => [row.id, row.payload] as const));

    const syncedIds: string[] = [];

    // Bewusst sequenziell statt Promise.all: Karteikarten-Bewertungen bauen über applyReview
    // auf dem jeweils zuletzt geschriebenen user_progress-Zustand auf, die chronologische
    // Reihenfolge muss also eingehalten werden (siehe Docstring oben).
    for (const entry of entries) {
      try {
        if (!activeItemIds.has(entry.contentItemId)) {
          throw new QuizItemNotFoundError("Content-Item nicht gefunden oder deaktiviert.");
        }
        if (entry.event.kind === "review") {
          await applyReview(ctx.db, ctx.currentUser.id, entry.contentItemId, entry.event.result, entry.occurredAt, entry.id);
        } else if (entry.event.kind === "quiz_mc") {
          const { isCorrect } = checkMcAnswer(optionsByItem.get(entry.contentItemId) ?? [], entry.event.selectedOptionId);
          await recordQuizAttempt(ctx.db, ctx.currentUser.id, entry.contentItemId, isCorrect, entry.occurredAt, entry.id);
        } else if (entry.event.kind === "zuordnung") {
          const result = checkMatching(optionsByItem.get(entry.contentItemId) ?? [], entry.event.pairs);
          await recordQuizAttempt(
            ctx.db,
            ctx.currentUser.id,
            entry.contentItemId,
            result.correctCount === result.total,
            entry.occurredAt,
            entry.id,
          );
        } else if (entry.event.kind === "luecken") {
          const result = checkBlanks(payloadByItem.get(entry.contentItemId), entry.event.answers);
          await recordQuizAttempt(
            ctx.db,
            ctx.currentUser.id,
            entry.contentItemId,
            result.correctCount === result.total,
            entry.occurredAt,
            entry.id,
          );
        } else {
          const { isCorrect } = checkKurzantwort(payloadByItem.get(entry.contentItemId), entry.event.answer);
          await recordQuizAttempt(ctx.db, ctx.currentUser.id, entry.contentItemId, isCorrect, entry.occurredAt, entry.id);
        }
        syncedIds.push(entry.id);
      } catch (error) {
        // Frage wurde serverseitig deaktiviert/entfernt oder ihr Payload ist inzwischen anders
        // strukturiert, seit sie heruntergeladen wurde (QuizItemNotFoundError bzw. ein
        // Zod-Parse-Fehler in check*) — dieser einzelne Eintrag bleibt unsynchronisiert, statt
        // den gesamten Batch abzubrechen; alle anderen Einträge werden trotzdem übernommen.
        if (!(error instanceof QuizItemNotFoundError) && !(error instanceof ZodError)) {
          throw error;
        }
      }
    }

    return { syncedIds };
  }),
});
