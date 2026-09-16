import { activeKursInputSchema, initialProgressState } from "@edukedo/shared";
import { and, asc, eq, inArray } from "drizzle-orm";
import { answerOption, contentItem, fachgebiet, thema, userCourse, userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

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
            text: option.text,
            isCorrect: option.isCorrect,
            side: option.side as "links" | "rechts" | null,
            groupKey: option.groupKey,
          })),
          progress,
        };
      }),
    };
  }),
});
