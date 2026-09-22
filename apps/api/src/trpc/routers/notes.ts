import { listNotesInputSchema, noteContentItemInputSchema, saveNoteInputSchema } from "@edukedo/shared";
import { and, desc, eq } from "drizzle-orm";
import { contentItem, fachgebiet, thema, userCourse, userNote } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-15: eigene Notizen zu Lerneinheiten — bewusst ein eigener, schmaler Router statt Teil von
 * `content`/`progress`, analog zu `contentFeedback` (F-50): bezieht sich auf alle Content-Typen
 * gleichermaßen und ist unabhängig vom FSRS-/Quiz-Fortschritt eines Items (siehe
 * db/schema.ts `user_note`, Architekturplanung Abschnitt 13).
 */
export const notesRouter = router({
  /** Bestehende Notiz zu einem einzelnen Item laden (zum Vorbefüllen des Bearbeiten-Formulars) —
   * `null`, wenn noch keine Notiz existiert. */
  get: protectedProcedure.input(noteContentItemInputSchema).query(async ({ ctx, input }) => {
    const [note] = await ctx.db
      .select({ noteText: userNote.noteText })
      .from(userNote)
      .where(and(eq(userNote.userId, ctx.currentUser.id), eq(userNote.contentItemId, input.contentItemId)))
      .limit(1);

    return note?.noteText ?? null;
  }),

  /** Anlegen oder Aktualisieren — ein nach dem Trimmen leerer Text löscht die Notiz stattdessen
   * (kein Ansammeln leerer Zeilen in der "Meine Notizen"-Übersicht durch ein geleertes Formular). */
  save: protectedProcedure.input(saveNoteInputSchema).mutation(async ({ ctx, input }) => {
    const trimmed = input.noteText.trim();

    if (trimmed.length === 0) {
      await ctx.db
        .delete(userNote)
        .where(and(eq(userNote.userId, ctx.currentUser.id), eq(userNote.contentItemId, input.contentItemId)));
      return { noteText: null };
    }

    await ctx.db
      .insert(userNote)
      .values({ userId: ctx.currentUser.id, contentItemId: input.contentItemId, noteText: trimmed })
      .onConflictDoUpdate({
        target: [userNote.userId, userNote.contentItemId],
        set: { noteText: trimmed, updatedAt: new Date() },
      });

    return { noteText: trimmed };
  }),

  delete: protectedProcedure.input(noteContentItemInputSchema).mutation(async ({ ctx, input }) => {
    await ctx.db
      .delete(userNote)
      .where(and(eq(userNote.userId, ctx.currentUser.id), eq(userNote.contentItemId, input.contentItemId)));
    return { success: true };
  }),

  /** "Meine Notizen"-Übersicht (Instrumente-Tab) — alle eigenen Notizen im gewählten Kurs, jüngste
   * zuerst, inkl. Thema-/Fachgebiets-Kontext für den Sprung zurück ins Lernen (wie content.search,
   * F-14). */
  list: protectedProcedure.input(listNotesInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        contentItemId: contentItem.id,
        type: contentItem.type,
        prompt: contentItem.prompt,
        noteText: userNote.noteText,
        updatedAt: userNote.updatedAt,
        themaId: thema.id,
        themaTitle: thema.title,
        fachgebietTitle: fachgebiet.title,
      })
      .from(userNote)
      .innerJoin(contentItem, eq(contentItem.id, userNote.contentItemId))
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
      .where(eq(userNote.userId, ctx.currentUser.id))
      .orderBy(desc(userNote.updatedAt));

    return rows;
  }),
});
