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
  "fachgespraech_frage",
]);
export type ContentItemType = z.infer<typeof contentItemTypeSchema>;

export const contentItemDifficultySchema = z.enum(["leicht", "mittel", "schwer"]);
export type ContentItemDifficulty = z.infer<typeof contentItemDifficultySchema>;

/**
 * content_item.bloom — kognitive Anforderungsstufe nach der Bloom'schen Taxonomie
 * (Anderson/Krathwohl-Revision), zusätzlich zur (subjektiveren) contentItemDifficultySchema.
 * Ab HB1/HB2/HB4 verbindlich im Content-Zwischenformat (siehe content/README.md), für
 * älteren Content (HB3, Mathematik-9, Demo) bewusst optional/null statt eines irreführenden
 * Default-Werts (siehe Architekturplanung Abschnitt 13).
 */
export const contentItemBloomSchema = z.enum(["erinnern", "verstehen", "anwenden", "analysieren", "bewerten", "erschaffen"]);
export type ContentItemBloom = z.infer<typeof contentItemBloomSchema>;

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

/**
 * bloom je Teilaufgabe statt am content_item selbst (siehe content_item.bloom in schema.ts):
 * eine Fallaufgabe kombiniert mehrere Teilaufgaben, die typischerweise unterschiedliche
 * kognitive Anforderungsstufen abdecken (siehe content/README.md) — eine einzelne Stufe je
 * ganzer Fallaufgabe würde das nicht abbilden können. Optional, da nur bei Fachwirt-
 * Fallaufgaben verbindlich, nicht bei Mathematik-Übungsaufgaben (siehe content/README.md).
 */
export const fallaufgabePartSchema = z.object({
  prompt: z.string(),
  points: z.number().positive(),
  bloom: contentItemBloomSchema.nullable().optional(),
});

export const fallaufgabePayloadSchema = z.object({
  parts: z.array(fallaufgabePartSchema).min(1),
});

/**
 * F-25 Fachgesprächs-Trainer: reiner Fragen-Pool ohne automatisch prüfbare Antwort und ohne
 * Punkte (anders als F-23-Fallaufgaben) — freies mündliches Beantworten. `themaTitel` ist der
 * ursprüngliche Gliederungspunkt aus `fachgespraech.md` (z. B. "3.1 Personalplanung, ..."),
 * rein zur Anzeige von Kontext neben der Frage, keine eigene `thema`-Zeile (siehe
 * Architekturplanung Abschnitt 13).
 */
export const fachgespraechFragePayloadSchema = z.object({
  themaTitel: z.string(),
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
  z.object({ type: z.literal("fachgespraech_frage"), payload: fachgespraechFragePayloadSchema }),
]);
export type ContentItemPayload = z.infer<typeof contentItemPayloadSchema>;

/**
 * answer_option.side — nur relevant für type "zuordnung" (Architekturplanung Abschnitt 4.3/4.4).
 */
export const answerOptionSideSchema = z.enum(["links", "rechts"]);
export type AnswerOptionSide = z.infer<typeof answerOptionSideSchema>;
