import { z } from "zod";
import { contentItemBloomSchema, contentItemDifficultySchema, contentItemTypeSchema } from "./content-item";
import { LUECKEN_AUSWAHL_MIN_DISTRACTORS, QUADRANT_MODELS } from "../quiz-logic";

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
// F-113 Teil 2 (Sortieren): die EINGABE-Reihenfolge im Formular IST die richtige Reihenfolge —
// kein separates Positions-Feld, die Redaktion trägt die vier Elemente schlicht in der korrekten
// Abfolge ein (siehe adminContent.ts, prepareContent: sortOrder = Array-Index).
const sortierenItemFormSchema = z.object({ text: z.string().min(1).max(300) });
// F-114: `zoneKey` referenziert einen der festen Zonen-Schlüssel aus QUADRANT_MODELS (siehe
// quiz-logic.ts) — hier bewusst nur als String validiert, die Zugehörigkeit zum richtigen
// Modell prüft das .refine() unten (dort ist der `type`-Zweig bereits bekannt).
const quadrantTermFormSchema = z.object({ text: z.string().min(1).max(300), zoneKey: z.string().min(1) });
// F-114 Teil 2 (Gantt-Diagramm): `periodIndex` referenziert einen Eintrag des `periods`-Arrays
// desselben Formulars per Index statt eines Schlüssel-Strings — die Zeitabschnitte sind hier
// (anders als bei swot/bsc/ansoff) selbst Teil des Formulars, nicht fest im Code hinterlegt,
// ein Index ist daher einfacher zu validieren als ein erst noch zu erzeugender Schlüssel-String.
const ganttTermFormSchema = z.object({ text: z.string().min(1).max(300), periodIndex: z.number().int().min(0) });
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
  // F-113 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): strukturell identisch zu "quiz_mc"
  // (answer_option-basiert, genau eine Option richtig) — siehe Architekturplanung Abschnitt 13.
  // "wahr_falsch"/"entweder_oder" bewusst auf genau 2 Optionen festgelegt (Frontend sperrt bei
  // "wahr_falsch" zusätzlich die Option-Texte auf "Wahr"/"Falsch"), "was_passt_nicht" bleibt wie
  // "quiz_mc" flexibel (2–10), da die Anzahl "verwandter Begriffe" je Frage variieren kann.
  z.object({
    type: z.literal("wahr_falsch"),
    prompt: promptSchema,
    explanation: explanationSchema,
    options: z.array(answerOptionFormSchema).length(2),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("entweder_oder"),
    prompt: promptSchema,
    explanation: explanationSchema,
    options: z.array(answerOptionFormSchema).length(2),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("was_passt_nicht"),
    prompt: promptSchema,
    explanation: explanationSchema,
    options: z.array(answerOptionFormSchema).min(2).max(10),
    ...commonFormFields,
  }),
  // F-116 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Multiple Choice, Nutzer-Entscheidung
  // 22.09.2026, siehe Architekturplanung Abschnitt 13): Mehrfachauswahl — formal identisch zu
  // "quiz_mc" (options-Array, answerOptionFormSchema), nur die Mindestanzahl markierter Optionen
  // unterscheidet sich (mindestens eine statt genau eine, siehe .refine() unten).
  z.object({
    type: z.literal("quiz_mc_multi"),
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
  // F-113 Teil 2 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): "Sortieren" — bewusst fest auf
  // genau 4 Elemente begrenzt (Anforderungskatalog: "vier vorgegebene Elemente"), wie bei
  // wahr_falsch/entweder_oder kein Hinzufügen/Entfernen im Formular.
  z.object({
    type: z.literal("sortieren"),
    prompt: promptSchema,
    explanation: explanationSchema,
    items: z.array(sortierenItemFormSchema).length(4),
    ...commonFormFields,
  }),
  // F-114 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung): SWOT-Matrix, Balanced
  // Scorecard und Ansoff-Matrix — dieselbe "Begriffe den festen Zonen zuordnen"-Formularstruktur,
  // nur die im Frontend angezeigten Zonen-Beschriftungen unterscheiden sich (siehe
  // QUADRANT_MODELS in quiz-logic.ts). Mindestens 4 Begriffe (einer je Zone), Obergrenze 20 wie
  // bei den anderen Formaten mit variabler Elementanzahl.
  z.object({
    type: z.literal("swot"),
    prompt: promptSchema,
    explanation: explanationSchema,
    terms: z.array(quadrantTermFormSchema).min(4).max(20),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("bsc"),
    prompt: promptSchema,
    explanation: explanationSchema,
    terms: z.array(quadrantTermFormSchema).min(4).max(20),
    ...commonFormFields,
  }),
  z.object({
    type: z.literal("ansoff"),
    prompt: promptSchema,
    explanation: explanationSchema,
    terms: z.array(quadrantTermFormSchema).min(4).max(20),
    ...commonFormFields,
  }),
  // F-114 Teil 2 (Gantt-Diagramm, Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung, siehe
  // Architekturplanung Abschnitt 13): wie swot/bsc/ansoff, aber die Zeitabschnitte selbst sind
  // Teil des Formulars (`periods`) statt fest im Code — 2–6 Abschnitte, analog zur Zonenzahl der
  // anderen Modelle. Begriffe (`terms`) referenzieren einen Abschnitt per Index.
  z.object({
    type: z.literal("gantt"),
    prompt: promptSchema,
    explanation: explanationSchema,
    periods: z.array(z.string().min(1).max(100)).min(2).max(6),
    terms: z.array(ganttTermFormSchema).min(4).max(20),
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
  // F-115 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Lückentext, Nutzer-Entscheidung
  // 22.09.2026, siehe Architekturplanung Abschnitt 13): Wortauswahl-Lückentext — dasselbe
  // `lueckentextSource`-Autorenformat wie "luecken", zusätzlich eine Liste zusätzlicher
  // (falscher) Begriffe für den Wortpool. Mindestanzahl direkt am Array erzwungen statt per
  // separatem `.refine()` — LUECKEN_AUSWAHL_MIN_DISTRACTORS ist eine feste, von der Lückenzahl
  // unabhängige Untergrenze (Nutzer-Entscheidung), keine content-abhängige Bedingung.
  z.object({
    type: z.literal("luecken_auswahl"),
    explanation: explanationSchema,
    lueckentextSource: z.string().min(1),
    distractors: z.array(z.string().min(1).max(200)).min(LUECKEN_AUSWAHL_MIN_DISTRACTORS).max(15),
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
export const adminContentItemFormSchema = adminContentItemFormUnion
  .refine(
    (data) =>
      (data.type !== "quiz_mc" &&
        data.type !== "wahr_falsch" &&
        data.type !== "entweder_oder" &&
        data.type !== "was_passt_nicht") ||
      data.options.filter((option) => option.isCorrect).length === 1,
    { message: "Genau eine Antwortoption muss als richtig markiert sein.", path: ["options"] },
  )
  // F-116: bei Mehrfachauswahl reicht "mindestens eine" (statt "genau eine") — alle vier dürfen
  // auch richtig sein, siehe Anforderungskatalog F-116.
  .refine((data) => data.type !== "quiz_mc_multi" || data.options.some((option) => option.isCorrect), {
    message: "Mindestens eine Antwortoption muss als richtig markiert sein.",
    path: ["options"],
  })
  // F-114: jeder Begriff muss einer tatsächlich existierenden Zone des gewählten Modells
  // zugeordnet sein — verhindert einen "verwaisten" Begriff mit einem Tippfehler-Zonen-Schlüssel,
  // der beim Lernen nie als richtig auswertbar wäre.
  .refine(
    (data) =>
      (data.type !== "swot" && data.type !== "bsc" && data.type !== "ansoff") ||
      data.terms.every((term) => QUADRANT_MODELS[data.type as "swot" | "bsc" | "ansoff"].zones.some((zone) => zone.key === term.zoneKey)),
    { message: "Jeder Begriff muss einer gültigen Zone dieses Modells zugeordnet sein.", path: ["terms"] },
  )
  // F-114 Teil 2: jeder Begriff muss einen tatsächlich vorhandenen Zeitabschnitt referenzieren —
  // analog zum swot/bsc/ansoff-Refine oben, hier per Index statt Schlüssel-String geprüft.
  .refine(
    (data) => data.type !== "gantt" || data.terms.every((term) => term.periodIndex < data.periods.length),
    { message: "Jeder Begriff muss einem vorhandenen Zeitabschnitt zugeordnet sein.", path: ["terms"] },
  );
export type AdminContentItemForm = z.infer<typeof adminContentItemFormUnion>;

export const adminCreateContentItemInputSchema = adminContentItemFormSchema;

export const adminUpdateContentItemInputSchema = adminContentItemFormSchema.and(
  z.object({ contentItemId: z.string().uuid(), changeNote: z.string().max(500).optional() }),
);
