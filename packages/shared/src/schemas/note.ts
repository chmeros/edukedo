import { z } from "zod";

/**
 * F-15 (Anforderungskatalog Abschnitt 5.2): eigene, freie Notizen zu einer Lerneinheit
 * (content_item) — unabhängig vom FSRS-/Quiz-Fortschritt, siehe db/schema.ts (`user_note`).
 * Genau eine Notiz je (Nutzer:in, Content-Item), daher reicht `contentItemId` allein, um eine
 * bestehende Notiz zu adressieren (kein eigener `noteId` im Client nötig).
 */
export const noteContentItemInputSchema = z.object({ contentItemId: z.string().uuid() });
export type NoteContentItemInput = z.infer<typeof noteContentItemInputSchema>;

export const saveNoteInputSchema = z.object({
  contentItemId: z.string().uuid(),
  noteText: z.string().max(2000),
});
export type SaveNoteInput = z.infer<typeof saveNoteInputSchema>;

/**
 * F-15: "Meine Notizen"-Übersicht (Instrumente-Tab) — kursgebunden wie die Volltextsuche (F-14),
 * da eine Notiz nur im Kontext des zugehörigen Kurses sinnvoll angezeigt werden kann (Thema/
 * Fachgebiet-Einordnung, Sprung zurück ins Lernen).
 */
export const listNotesInputSchema = z.object({ kursId: z.string().uuid() });
export type ListNotesInput = z.infer<typeof listNotesInputSchema>;
