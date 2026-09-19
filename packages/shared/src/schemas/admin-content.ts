import { z } from "zod";
import { contentItemBloomSchema, contentItemDifficultySchema, contentItemTypeSchema } from "./content-item";

/**
 * F-11: Admin-/Redaktionsbereich — Pflege (und seit der Nutzer-Entscheidung vom 19.09.2026
 * auch Neuanlage) einzelner Content-Items, unabhängig vom App-Release/Bulk-Import (F-17).
 * Bewusst EIGENE Schemas statt Wiederverwendung von contentItemPayloadSchema (content-item.ts):
 * Jenes beschreibt das gespeicherte payload-JSON 1:1, dieses hier die vom Formular kommenden,
 * noch unverarbeiteten Eingaben (z. B. `lueckentextSource` mit inline `___Stichwort___`-Syntax
 * statt eines fertigen `blanks`-Arrays, `pairs` statt der relationalen `answer_option`-Zeilen)
 * — die Umwandlung übernimmt `adminContent.ts` server-seitig (dieselbe Logik wie beim
 * Bulk-Import, siehe `parseLueckentext` in `content-parser.ts`).
 */

export const adminThemaTreeInputSchema = z.object({ kursId: z.string().uuid() });

export const adminContentItemsInputSchema = z.object({
  kursId: z.string().uuid(),
  themaId: z.string().uuid().optional(),
  type: contentItemTypeSchema.optional(),
  search: z.string().max(200).optional(),
});

export const adminContentItemInputSchema = z.object({ contentItemId: z.string().uuid() });

export const adminSetContentItemActiveInputSchema = z.object({
  contentItemId: z.string().uuid(),
  isActive: z.boolean(),
});

const promptSchema = z.string().min(1).max(2000);
const explanationSchema = z.string().max(4000).nullable().optional();
const answerOptionFormSchema = z.object({ text: z.string().min(1).max(500), isCorrect: z.boolean() });
const zuordnungPairFormSchema = z.object({ left: z.string().min(1).max(300), right: z.string().min(1).max(300) });
const fallaufgabePartFormSchema = z.object({
  prompt: z.string().min(1).max(2000),
  points: z.number().positive(),
  bloom: contentItemBloomSchema.nullable().optional(),
});

const commonFormFields = {
  themaId: z.string().uuid(),
  difficulty: contentItemDifficultySchema,
  bloom: contentItemBloomSchema.nullable().optional(),
  isPremium: z.boolean(),
  isActive: z.boolean(),
};

/**
 * Ein Zweig je content_item.type — deckungsgleich mit contentItemPayloadSchema, aber mit den
 * rohen Formulareingaben statt des fertigen payload-JSON. `theorie` hat bewusst kein eigenes
 * `explanation`-Feld im Formular (wird beim Import ebenfalls nie gesetzt, siehe
 * import-content.ts) — bleibt beim Speichern schlicht `null`.
 */
const adminContentItemFormUnion = z.discriminatedUnion("type", [
  z.object({ type: z.literal("theorie"), prompt: promptSchema, bodyMarkdown: z.string().min(1), ...commonFormFields }),
  z.object({ type: z.literal("karteikarte"), prompt: promptSchema, explanation: explanationSchema, ...commonFormFields }),
  z.object({
    type: z.literal("quiz_mc"),
    prompt: promptSchema,
    explanation: explanationSchema,
    options: z.array(answerOptionFormSchema).min(2).max(10),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("zuordnung"),
    prompt: promptSchema,
    explanation: explanationSchema,
    pairs: z.array(zuordnungPairFormSchema).min(2).max(10),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("luecken"),
    // Kein eigenes `prompt`-Feld: content_item.prompt entspricht bei Lückentext-Items exakt
    // dem Quelltext mit den inline ___Stichwort___-Markierungen (siehe import-content.ts) —
    // wird server-seitig 1:1 aus lueckentextSource übernommen (siehe adminContent.ts,
    // prepareContent), statt es hier doppelt (und potenziell widersprüchlich) einzugeben.
    explanation: explanationSchema,
    // Inline-Autorenformat statt eines fertigen blanks-Arrays, siehe Moduldoku oben.
    lueckentextSource: z.string().min(1),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("kurzantwort"),
    prompt: promptSchema,
    explanation: explanationSchema,
    acceptedAnswers: z.array(z.string().min(1).max(200)).min(1).max(10),
    matchMode: z.enum(["exact", "contains"]),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("fallaufgabe"),
    prompt: promptSchema,
    explanation: explanationSchema,
    parts: z.array(fallaufgabePartFormSchema).min(1).max(10),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("fachgespraech_frage"),
    prompt: promptSchema,
    explanation: explanationSchema,
    themaTitel: z.string().min(1).max(300),
    ...commonFormFields,
  }),
]);

// .refine() erst NACH dem discriminatedUnion angehängt statt auf dem einzelnen quiz_mc-Zweig:
// z.discriminatedUnion() verlangt für jeden Zweig ein reines ZodObject, kein ZodEffects (das
// Ergebnis von .refine()) — siehe Zod-Typfehler, wenn man es direkt am Zweig versucht.
export const adminContentItemFormSchema = adminContentItemFormUnion.refine(
  (data) => data.type !== "quiz_mc" || data.options.filter((option) => option.isCorrect).length === 1,
  { message: "Genau eine Antwortoption muss als richtig markiert sein.", path: ["options"] },
);
export type AdminContentItemForm = z.infer<typeof adminContentItemFormUnion>;

export const adminCreateContentItemInputSchema = adminContentItemFormSchema;

export const adminUpdateContentItemInputSchema = adminContentItemFormSchema.and(
  z.object({ contentItemId: z.string().uuid(), changeNote: z.string().max(500).optional() }),
);
