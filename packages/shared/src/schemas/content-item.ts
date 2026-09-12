import { z } from "zod";

/**
 * content_item.type — siehe Architekturplanung Abschnitt 4.3.
 */
export const contentItemTypeSchema = z.enum([
  "theorie",
  "karteikarte",
  "quiz_mc",
  "zuordnung",
  "luecken",
  "kurzantwort",
  "fallaufgabe",
]);
export type ContentItemType = z.infer<typeof contentItemTypeSchema>;

export const contentItemDifficultySchema = z.enum(["leicht", "mittel", "schwer"]);
export type ContentItemDifficulty = z.infer<typeof contentItemDifficultySchema>;

/**
 * payload je content_item.type (Architekturplanung Abschnitt 4.3, Payload-Tabelle).
 * theorie/karteikarte/quiz_mc/zuordnung nutzen prompt/explanation bzw. answer_option;
 * ihr payload bleibt ein leeres Objekt.
 */
export const theoriePayloadSchema = z.object({
  body_markdown: z.string(),
  images: z.array(z.string()).default([]),
});

export const lueckenBlankSchema = z.object({
  id: z.string(),
  accepted: z.array(z.string()).min(1),
});

export const lueckenPayloadSchema = z.object({
  text_with_blanks: z.string(),
  blanks: z.array(lueckenBlankSchema).min(1),
});

export const kurzantwortPayloadSchema = z.object({
  accepted_answers: z.array(z.string()).min(1),
  match_mode: z.enum(["exact", "contains"]),
});

export const fallaufgabePartSchema = z.object({
  prompt: z.string(),
  points: z.number().positive(),
});

export const fallaufgabePayloadSchema = z.object({
  parts: z.array(fallaufgabePartSchema).min(1),
});

export const emptyPayloadSchema = z.object({}).strict();

/**
 * Discriminated Union über content_item.type + payload — Validierung auf Anwendungsebene
 * (die DB erzwingt payload bewusst nicht, siehe Architekturplanung Abschnitt 4.1).
 */
export const contentItemPayloadSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("theorie"), payload: theoriePayloadSchema }),
  z.object({ type: z.literal("karteikarte"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("quiz_mc"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("zuordnung"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("luecken"), payload: lueckenPayloadSchema }),
  z.object({ type: z.literal("kurzantwort"), payload: kurzantwortPayloadSchema }),
  z.object({ type: z.literal("fallaufgabe"), payload: fallaufgabePayloadSchema }),
]);
export type ContentItemPayload = z.infer<typeof contentItemPayloadSchema>;

/**
 * answer_option.side — nur relevant für type "zuordnung" (Architekturplanung Abschnitt 4.3/4.4).
 */
export const answerOptionSideSchema = z.enum(["links", "rechts"]);
export type AnswerOptionSide = z.infer<typeof answerOptionSideSchema>;
