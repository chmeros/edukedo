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
  // F-113 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): strukturell identisch zu "quiz_mc"
  // (answer_option, genau eine Option isCorrect) — siehe MC_LIKE_QUIZ_TYPES in quiz-logic.ts.
  "wahr_falsch",
  "entweder_oder",
  "was_passt_nicht",
  // F-114 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung): visuelle Zuordnungs-
  // Variante mit N festen Zonen statt zwei Spalten — siehe QUADRANT_QUIZ_TYPES in quiz-logic.ts.
  "swot",
  "bsc",
  "ansoff",
  // F-105 (ToDo-Punkt 6 vom 23.09.2026, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
  // Abschnitt 13): drei weitere Modelle mit fest im Code hinterlegten Zonen, technisch
  // deckungsgleich zu swot/bsc/ansoff (siehe QUADRANT_MODELS in quiz-logic.ts) — Eisenhower-
  // Matrix (Dringlichkeit × Wichtigkeit), PDCA-Zyklus (vier Phasen), Risikomatrix (vereinfacht
  // auf Eintrittswahrscheinlichkeit × Auswirkung, je 2 statt 3 Stufen, damit sie sich in dieselbe
  // 2×2-Mechanik einfügt).
  "eisenhower",
  "pdca",
  "risiko",
  // F-116 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Multiple Choice): Mehrfachauswahl —
  // eine, zwei, drei oder alle vier Antwortoptionen können richtig sein, statt wie bei "quiz_mc"
  // genau eine. Bewusst ein EIGENER Typ statt eines Flags auf "quiz_mc" (siehe Anforderungskatalog
  // F-116: "die Umstellung betrifft nur neu als Mehrfachauswahl gekennzeichnete Fragen, bereits
  // vorhandene Multiple-Choice-Inhalte bleiben unverändert einfachauswahl-basiert") — siehe
  // checkMcMultiAnswer in quiz-logic.ts.
  "quiz_mc_multi",
  // F-115 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Lückentext): Wortauswahl-Lückentext —
  // dieselbe Bewertung wie "luecken", nur mit einem Wortpool (inkl. Distraktoren) statt freier
  // Texteingabe. Siehe lueckenAuswahlPayloadSchema.
  "luecken_auswahl",
  // F-113 Teil 2 (Sortieren, Nutzer-Feedback vom 18.09.2026, erweitert F-21): vier vorgegebene
  // Elemente per Drag-and-Drop in die richtige Reihenfolge bringen — dieselbe answer_option-
  // Tabelle wie "zuordnung", `sort_order` trägt hier die richtige Position statt nur einer
  // Anzeige-Reihenfolge, siehe checkSortierenAnswer in quiz-logic.ts.
  "sortieren",
  // F-114 Teil 2 (Gantt-Diagramm, Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung):
  // vierter im Anforderungskatalog genannter Modell-Typ, technisch dieselbe "Begriffe in feste
  // Zonen ziehen"-Mechanik wie swot/bsc/ansoff (siehe QUADRANT_MODELS-Doku in quiz-logic.ts),
  // bewusst NICHT Teil von QUADRANT_QUIZ_TYPES: die Zeitabschnitte eines Gantt-Diagramms sind
  // projektspezifisch statt eines universellen, fest im Code hinterlegten Modells — deshalb
  // eigener Typ mit content-autorierten Zonen im payload (ganttPayloadSchema), statt in
  // QUADRANT_MODELS.
  "gantt",
  // F-105 (ToDo-Punkt 6 vom 23.09.2026, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
  // Abschnitt 13): Projektstrukturplan/Organigramm — anders als eisenhower/pdca/risiko KEINE
  // flache Zonen-Zuordnung, sondern eine echte, content-autorierte Baumstruktur (Wurzel + Knoten
  // mit optionalem übergeordneten Knoten, siehe hierarchiePayloadSchema). Begriffe werden wie bei
  // "gantt" den (hier: baumförmigen) Zonen zugeordnet — checkQuadrantAnswer in quiz-logic.ts wird
  // dafür UNVERÄNDERT wiederverwendet, nur die Zonen-Herkunft/-Darstellung unterscheidet sich.
  "hierarchie",
]);
export type ContentItemType = z.infer<typeof contentItemTypeSchema>;

export const contentItemDifficultySchema = z.enum(["leicht", "mittel", "schwer"]);
export type ContentItemDifficulty = z.infer<typeof contentItemDifficultySchema>;

/**
 * F-14: Volltextsuche über alle Lerninhalte eines Kurses — bewusst mindestens 2 Zeichen
 * (verhindert eine ILIKE '%x%'-Suche über Tausende Content-Items bei jedem Tastenanschlag)
 * und höchstens 200 (Schutz vor übergroßen Suchbegriffen), siehe course-audience-nahe
 * content.search in apps/api/src/trpc/routers/content.ts.
 */
export const searchContentInputSchema = z.object({
  kursId: z.string().uuid(),
  query: z.string().min(2).max(200),
});
export type SearchContentInput = z.infer<typeof searchContentInputSchema>;

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

/**
 * F-115 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Lückentext): Wortauswahl-Lückentext —
 * dieselbe `text_with_blanks`/`blanks`-Struktur wie beim regulären Lückentext (freie
 * Texteingabe), zusätzlich eine feste Liste von `distractors` — Begriffe, die im Wortpool
 * angeboten, aber in keine Lücke gehören (siehe `LUECKEN_AUSWAHL_MIN_DISTRACTORS` in
 * quiz-logic.ts für die Mindestanzahl). Bewusst KEIN eigenes `checkLueckenAuswahlAnswer` nötig:
 * `checkBlanks`/`lueckenPayloadSchema.parse` ignorieren das zusätzliche `distractors`-Feld
 * automatisch (Zod strippt unbekannte Felder im Default-Modus), die Bewertung ist exakt
 * dieselbe wie beim regulären Lückentext — nur die Lernenden-UI unterscheidet sich (Wörter aus
 * einem Pool ziehen statt frei tippen, siehe QuizSteps.tsx BlanksSelectionStep).
 */
export const lueckenAuswahlPayloadSchema = z.object({
  text_with_blanks: z.string(),
  blanks: z.array(lueckenBlankSchema).min(1),
  distractors: z.array(z.string().min(1)).min(1),
});

/**
 * F-114 Teil 2 (Gantt-Diagramm): anders als bei swot/bsc/ansoff (Zonen fest in QUADRANT_MODELS,
 * quiz-logic.ts) sind die Zeitabschnitte eines Gantt-Diagramms projektspezifisch und daher
 * content-autoriert — `periods` entspricht strukturell den `zones` eines Quadrant-Modells
 * (Schlüssel + Beschriftung), nur je Content-Item statt global im Code definiert. Mindestens 2,
 * höchstens 6 Zeitabschnitte (Layout-Grenze wie bei `zonesTermFormSchema`/`.quadrant-grid`, kein
 * horizontales Zeitleisten-Layout nötig — dasselbe zweispaltige Zonen-Raster aus F-114 Teil 1
 * generalisiert bereits korrekt auf eine beliebige Zonenzahl, siehe Architekturplanung Abschnitt 13).
 */
export const ganttPeriodSchema = z.object({ key: z.string(), label: z.string() });
export const ganttPayloadSchema = z.object({ periods: z.array(ganttPeriodSchema).min(2).max(6) });

/**
 * F-105 (ToDo-Punkt 6, Nutzer-Entscheidung 24.09.2026 — "echte Baum-/Hierarchie-Darstellung"
 * statt einer vereinfachten flachen Ebenen-Zuordnung, siehe Architekturplanung Abschnitt 13):
 * `root` ist die feste Wurzel (z. B. "Projektleitung"), `nodes` bilden einen echten Baum —
 * `parentKey: null` heißt "direkt unter der Wurzel", ansonsten verweist `parentKey` auf
 * `key` eines anderen Knotens. Begriffe (answer_option) tragen wie bei den QUADRANT_MODELS/
 * "gantt" den Ziel-Knoten-Schlüssel in `group_key` — die Baumtiefe selbst ist dadurch beliebig,
 * begrenzt nur durch die Knotenzahl (2–12, wie bei anderen content-autorierten Zonen-Modellen).
 */
export const hierarchieNodeSchema = z.object({
  key: z.string(),
  label: z.string(),
  parentKey: z.string().nullable(),
});
export const hierarchiePayloadSchema = z.object({
  root: z.string().min(1).max(150),
  nodes: z.array(hierarchieNodeSchema).min(2).max(12),
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
  z.object({ type: z.literal("wahr_falsch"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("entweder_oder"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("was_passt_nicht"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("zuordnung"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("sortieren"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("gantt"), payload: ganttPayloadSchema }),
  z.object({ type: z.literal("swot"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("bsc"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("ansoff"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("eisenhower"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("pdca"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("risiko"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("hierarchie"), payload: hierarchiePayloadSchema }),
  z.object({ type: z.literal("quiz_mc_multi"), payload: emptyPayloadSchema }),
  z.object({ type: z.literal("luecken"), payload: lueckenPayloadSchema }),
  z.object({ type: z.literal("luecken_auswahl"), payload: lueckenAuswahlPayloadSchema }),
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
