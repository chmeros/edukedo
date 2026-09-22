import { kurzantwortPayloadSchema, lueckenAuswahlPayloadSchema, lueckenPayloadSchema } from "./schemas/content-item";

/**
 * Reine Formungs-/Prüflogik für Quiz-Items (F-21) — ursprünglich nur in apps/api geteilt
 * zwischen trpc/routers/quiz.ts (eingeschriebene Kurse) und trpc/routers/preview.ts
 * (kontoloser Vorschau-Modus, F-08), seit F-42 (Baustein 4) nach @edukedo/shared verschoben,
 * damit auch der Web-Client Quiz-Antworten offline exakt gleich prüfen kann (siehe
 * apps/web/src/offlineQuiz.ts und Architekturplanung Abschnitt 13 für die Nutzer-Entscheidung,
 * dass offline heruntergeladene Inhalte die Lösung enthalten). Beide Backend-Router zeigen den
 * Lernenden dieselben vier Fragetypen ohne Lösung an und prüfen serverseitig identisch, nur die
 * Quelle der content_item-Zeilen unterscheidet sich (eingeschriebene Kurse vs. veröffentlichte
 * Kurse ohne Account-Bezug).
 *
 * `checkMcAnswer`/`checkMatching` warfen hier ursprünglich `TRPCError` — durch die einfache
 * `QuizItemNotFoundError` ersetzt, damit dieses Modul kein Server-Framework in den
 * Browser-Bundle zieht. Ändert das Verhalten nur im praktisch nie erreichten Fall eines
 * manipulierten Requests (falsche/fremde Options-ID): Die Backend-Router liefern dafür jetzt
 * INTERNAL_SERVER_ERROR statt NOT_FOUND, da tRPC einen nicht als TRPCError erkannten Fehler
 * generisch abbildet.
 */
export class QuizItemNotFoundError extends Error {}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export interface RawQuizItem {
  id: string;
  type: string;
  prompt: string;
  payload: unknown;
}

export interface RawAnswerOption {
  id: string;
  contentItemId: string;
  text: string;
  side: string | null;
  groupKey: string | null;
  isCorrect: boolean;
  // F-113 Teil 2 (Sortieren): trägt hier die RICHTIGE Position (0-basiert) statt nur einer
  // Anzeige-Reihenfolge — Wiederverwendung derselben Spalte, die bei anderen Typen (quiz_mc,
  // zuordnung, …) rein kosmetisch ist, siehe checkSortierenAnswer unten.
  sortOrder: number;
}

/**
 * F-113 (Nutzer-Feedback vom 18.09.2026, erweitert F-21): "wahr_falsch"/"entweder_oder"/
 * "was_passt_nicht" sind strukturell identisch zu "quiz_mc" (N Options, genau eine richtig,
 * dieselbe answer_option-Tabelle) — EIN gemeinsamer Union-Zweig und eine gemeinsame
 * shapeQuizItem-Bedingung statt drei fast identischer Kopien, siehe Architekturplanung
 * Abschnitt 13. Unterschiedlich ist nur die Content-Autoren-Formularführung (AdminContentEditor)
 * und die Lernenden-UI (QuizSteps.tsx: MultipleChoiceStep für quiz_mc/was_passt_nicht,
 * TwoChoiceStep für wahr_falsch/entweder_oder) — beides oberhalb dieser Schicht.
 */
export const MC_LIKE_QUIZ_TYPES = ["quiz_mc", "wahr_falsch", "entweder_oder", "was_passt_nicht"] as const;
export type McLikeQuizType = (typeof MC_LIKE_QUIZ_TYPES)[number];

/**
 * F-114 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Zuordnung, Nutzer-Entscheidung
 * 21.09.2026, siehe Architekturplanung Abschnitt 13): "Interaktive Diagramme und Modelle" —
 * technisch eine visuelle Variante der bestehenden Zuordnungsfrage, aber mit N festen Zonen
 * (hier: 4) statt einer festen Zwei-Spalten-Struktur. SWOT-Matrix, Balanced Scorecard und
 * Ansoff-Matrix teilen sich dieselbe "N feste Zonen, Begriffe hineinziehen"-Mechanik — nur die
 * Zonen-Beschriftungen unterscheiden sich, daher EIN gemeinsamer QUADRANT_QUIZ_TYPES-Typ statt
 * dreier fast identischer Kopien (analog zu MC_LIKE_QUIZ_TYPES bei F-113). Die Zonen sind
 * bewusst FEST im Code hinterlegt (nicht content-autorierbar) — ein SWOT-Feld hat immer genau
 * die vier Zonen Stärken/Schwächen/Chancen/Risiken, das ist Teil der fachlichen Modell-
 * Definition, keine je-Frage-variable Eigenschaft. `answer_option.group_key` trägt hier den
 * Zonen-Schlüssel des jeweiligen Begriffs (Wiederverwendung desselben Feldes, das bei
 * "zuordnung" die Paar-ID trägt) statt einer neuen Spalte.
 */
export const QUADRANT_MODELS = {
  swot: {
    label: "SWOT-Matrix",
    zones: [
      { key: "staerken", label: "Stärken" },
      { key: "schwaechen", label: "Schwächen" },
      { key: "chancen", label: "Chancen" },
      { key: "risiken", label: "Risiken" },
    ],
  },
  bsc: {
    label: "Balanced Scorecard",
    zones: [
      { key: "finanzen", label: "Finanzen" },
      { key: "kunden", label: "Kunden" },
      { key: "prozesse", label: "Interne Prozesse" },
      { key: "lernen_entwicklung", label: "Lernen & Entwicklung" },
    ],
  },
  ansoff: {
    label: "Ansoff-Matrix",
    zones: [
      { key: "marktdurchdringung", label: "Marktdurchdringung" },
      { key: "marktentwicklung", label: "Marktentwicklung" },
      { key: "produktentwicklung", label: "Produktentwicklung" },
      { key: "diversifikation", label: "Diversifikation" },
    ],
  },
} as const satisfies Record<string, { label: string; zones: { key: string; label: string }[] }>;

export const QUADRANT_QUIZ_TYPES = Object.keys(QUADRANT_MODELS) as (keyof typeof QUADRANT_MODELS)[];
export type QuadrantQuizType = (typeof QUADRANT_QUIZ_TYPES)[number];

/**
 * F-116 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Multiple Choice, Nutzer-Entscheidung
 * 22.09.2026, siehe Architekturplanung Abschnitt 13): Mehrfachauswahl — strukturell dieselbe
 * answer_option-Grundlage wie MC_LIKE_QUIZ_TYPES (N Options, hier aber 1–N davon `isCorrect`
 * statt genau einer), daher beim Formen/Laden gemeinsam mit MC_LIKE_QUIZ_TYPES behandelt (siehe
 * shapeQuizItem unten). Bewusst NICHT Teil von MC_LIKE_QUIZ_TYPES selbst, da die Bewertung
 * (checkMcMultiAnswer, Alles-oder-nichts über ein Set von IDs) und die Formular-/UI-Führung
 * grundsätzlich anders sind als bei "genau eine Option richtig".
 */
/**
 * F-115 (Nutzer-Feedback vom 18.09.2026, erweitert F-21/Lückentext, Nutzer-Entscheidung
 * 22.09.2026, siehe Architekturplanung Abschnitt 13): Mindestanzahl an Distraktoren (Begriffen
 * ohne passende Lücke) im Wortpool eines Wortauswahl-Lückentexts — verhindert triviales
 * Ausschluss-Raten bei der letzten offenen Lücke. Als benannte Konstante statt einer verstreuten
 * Magic Number, da sowohl das Admin-Formular-Schema (admin-content.ts) als auch diese Doku
 * darauf verweisen.
 */
export const LUECKEN_AUSWAHL_MIN_DISTRACTORS = 2;

export type ShapedQuizItem =
  | { id: string; type: McLikeQuizType; prompt: string; options: { id: string; text: string }[] }
  | { id: string; type: "quiz_mc_multi"; prompt: string; options: { id: string; text: string }[] }
  | {
      id: string;
      type: "zuordnung";
      prompt: string;
      left: { id: string; text: string }[];
      right: { id: string; text: string }[];
    }
  | { id: string; type: "luecken"; prompt: string; textWithBlanks: string; blankIds: string[] }
  | {
      id: string;
      type: "luecken_auswahl";
      prompt: string;
      textWithBlanks: string;
      blankIds: string[];
      words: { id: string; text: string }[];
    }
  | { id: string; type: "kurzantwort"; prompt: string }
  | {
      id: string;
      type: QuadrantQuizType;
      prompt: string;
      zones: { key: string; label: string }[];
      terms: { id: string; text: string }[];
    }
  | { id: string; type: "sortieren"; prompt: string; items: { id: string; text: string }[] };

/** Formt eine rohe content_item-Zeile (+ zugehörige answer_option-Zeilen) in die
 * öffentliche, lösungsfreie Darstellung — nie die richtige Antwort/Zuordnung/Lösung
 * mitschicken (siehe Architekturplanung Abschnitt 13). */
export function shapeQuizItem(item: RawQuizItem, options: RawAnswerOption[]): ShapedQuizItem {
  // F-116: quiz_mc_multi formt sich identisch zu den MC_LIKE_QUIZ_TYPES (dieselben Options ohne
  // isCorrect) — nur die spätere Bewertung (checkMcMultiAnswer) und die Lernenden-UI (Checkboxen
  // statt Radio-Buttons, siehe QuizSteps.tsx McMultiStep) unterscheiden sich.
  if (item.type === "quiz_mc_multi" || (MC_LIKE_QUIZ_TYPES as readonly string[]).includes(item.type)) {
    return {
      id: item.id,
      type: item.type as McLikeQuizType | "quiz_mc_multi",
      prompt: item.prompt,
      options: options
        .filter((option) => option.contentItemId === item.id)
        .map((option) => ({ id: option.id, text: option.text })),
    };
  }

  if (item.type === "zuordnung") {
    const itemOptions = options.filter((option) => option.contentItemId === item.id);
    return {
      id: item.id,
      type: "zuordnung",
      prompt: item.prompt,
      left: shuffle(
        itemOptions.filter((option) => option.side === "links").map((option) => ({ id: option.id, text: option.text })),
      ),
      right: shuffle(
        itemOptions.filter((option) => option.side === "rechts").map((option) => ({ id: option.id, text: option.text })),
      ),
    };
  }

  // F-113 Teil 2 (Sortieren, Nutzer-Feedback vom 18.09.2026, erweitert F-21): dieselbe
  // answer_option-Tabelle wie "zuordnung", `sort_order` trägt hier aber die RICHTIGE Position
  // statt nur einer Anzeige-Reihenfolge — deshalb hier gemischt ausgegeben (shuffle), sonst
  // würde die Lade-Reihenfolge selbst schon die Lösung verraten.
  if (item.type === "sortieren") {
    return {
      id: item.id,
      type: "sortieren",
      prompt: item.prompt,
      items: shuffle(
        options
          .filter((option) => option.contentItemId === item.id)
          .map((option) => ({ id: option.id, text: option.text })),
      ),
    };
  }

  if (item.type === "luecken") {
    const payload = lueckenPayloadSchema.parse(item.payload);
    return {
      id: item.id,
      type: "luecken",
      prompt: item.prompt,
      textWithBlanks: payload.text_with_blanks,
      blankIds: payload.blanks.map((blank) => blank.id),
    };
  }

  // F-115: wie "luecken", zusätzlich ein gemischter Wortpool aus den (einzigen) richtigen
  // Begriffen je Lücke (`blank.accepted[0]`) und den Distraktoren. Die Pool-IDs sind bewusst
  // fortlaufend synthetisch (w0, w1, …) statt z. B. der Lücken-ID selbst — sonst würde die ID
  // eines Wortes bereits verraten, zu welcher Lücke es gehört.
  if (item.type === "luecken_auswahl") {
    const payload = lueckenAuswahlPayloadSchema.parse(item.payload);
    const wordTexts = shuffle([...payload.blanks.map((blank) => blank.accepted[0]!), ...payload.distractors]);
    return {
      id: item.id,
      type: "luecken_auswahl",
      prompt: item.prompt,
      textWithBlanks: payload.text_with_blanks,
      blankIds: payload.blanks.map((blank) => blank.id),
      words: wordTexts.map((text, index) => ({ id: `w${index}`, text })),
    };
  }

  if ((QUADRANT_QUIZ_TYPES as readonly string[]).includes(item.type)) {
    const quadrantType = item.type as QuadrantQuizType;
    return {
      id: item.id,
      type: quadrantType,
      prompt: item.prompt,
      zones: [...QUADRANT_MODELS[quadrantType].zones],
      terms: shuffle(
        options
          .filter((option) => option.contentItemId === item.id)
          .map((option) => ({ id: option.id, text: option.text })),
      ),
    };
  }

  return { id: item.id, type: "kurzantwort", prompt: item.prompt };
}

export function checkMcAnswer(options: RawAnswerOption[], selectedOptionId: string) {
  const selected = options.find((option) => option.id === selectedOptionId);
  const correct = options.find((option) => option.isCorrect);

  if (!selected || !correct) {
    throw new QuizItemNotFoundError("Frage oder Antwortoption nicht gefunden.");
  }

  return { isCorrect: selected.isCorrect, correctOptionId: correct.id };
}

/**
 * F-116: prüft eine Mehrfachauswahl-Antwort — anders als checkMcAnswer (genau eine
 * Options-ID) hier ein Set von Options-IDs. Alles-oder-nichts-Bewertung (Nutzer-Entscheidung
 * 22.09.2026, siehe Architekturplanung Abschnitt 13): nur eine exakt mit den als `isCorrect`
 * markierten Optionen deckungsgleiche Auswahl (alle richtigen angekreuzt, keine falschen) zählt
 * als richtig — konsistent mit dem binären richtig/falsch-Bewertungsmodell, das Streaks,
 * Fortschrittsquote (F-30) und das motivierende Feedback (F-112) bereits durchgängig nutzen.
 */
export function checkMcMultiAnswer(options: RawAnswerOption[], selectedOptionIds: string[]) {
  if (options.length === 0) {
    throw new QuizItemNotFoundError("Frage nicht gefunden.");
  }

  const correctOptionIds = options.filter((option) => option.isCorrect).map((option) => option.id);
  const correctSet = new Set(correctOptionIds);
  const selectedSet = new Set(selectedOptionIds);
  const isCorrect =
    selectedSet.size === correctSet.size && [...selectedSet].every((id) => correctSet.has(id));

  return { isCorrect, correctOptionIds };
}

/**
 * F-113 Teil 2 (Sortieren): prüft eine eingereichte Reihenfolge (Options-IDs in der von der
 * lernenden Person gewählten Abfolge) gegen `option.sortOrder` als die tatsächlich richtige
 * Position. Positionsweise ausgewertet (nicht "irgendwo richtig platziert") — ein Element an
 * der falschen Stelle zählt als falsch, auch wenn es später noch einmal vorkäme (kommt bei
 * eindeutigen Elementen ohnehin nicht vor).
 */
export function checkSortierenAnswer(options: RawAnswerOption[], orderedOptionIds: string[]) {
  if (options.length === 0) {
    throw new QuizItemNotFoundError("Frage nicht gefunden.");
  }

  const correctOrder = [...options].sort((a, b) => a.sortOrder - b.sortOrder).map((option) => option.id);
  const results: Record<string, boolean> = {};
  let correctCount = 0;
  orderedOptionIds.forEach((optionId, index) => {
    const isCorrect = correctOrder[index] === optionId;
    results[optionId] = isCorrect;
    if (isCorrect) correctCount += 1;
  });

  return { results, correctOrder, correctCount, total: correctOrder.length };
}

export function checkMatching(options: RawAnswerOption[], pairs: { leftOptionId: string; rightOptionId: string }[]) {
  if (options.length === 0) {
    throw new QuizItemNotFoundError("Frage nicht gefunden.");
  }

  const leftOptions = options.filter((option) => option.side === "links");
  const correctMap: Record<string, string> = {};
  for (const left of leftOptions) {
    const partner = options.find((option) => option.side === "rechts" && option.groupKey === left.groupKey);
    if (partner) {
      correctMap[left.id] = partner.id;
    }
  }

  let correctCount = 0;
  for (const pair of pairs) {
    if (correctMap[pair.leftOptionId] === pair.rightOptionId) {
      correctCount += 1;
    }
  }

  return { correctMap, correctCount, total: leftOptions.length };
}

/**
 * F-114: prüft eine Zonen-Zuordnung (SWOT/BSC/Ansoff) — dieselbe Struktur wie checkMatching
 * (options.group_key trägt hier die richtige Zone statt einer Paar-ID), aber N Zonen statt
 * exakt zwei Seiten. Ein Begriff ohne Platzierung (nicht in `placements` enthalten) zählt als
 * falsch, nicht als übersprungen — das Frontend lässt "Antwort prüfen" ohnehin erst zu, wenn
 * alle Begriffe platziert sind (siehe QuizSteps.tsx QuadrantStep).
 */
export function checkQuadrantAnswer(options: RawAnswerOption[], placements: { optionId: string; zoneKey: string }[]) {
  if (options.length === 0) {
    throw new QuizItemNotFoundError("Frage nicht gefunden.");
  }

  const correctZones: Record<string, string> = {};
  for (const option of options) {
    if (option.groupKey) {
      correctZones[option.id] = option.groupKey;
    }
  }

  const results: Record<string, boolean> = {};
  let correctCount = 0;
  for (const placement of placements) {
    const isCorrect = correctZones[placement.optionId] === placement.zoneKey;
    results[placement.optionId] = isCorrect;
    if (isCorrect) {
      correctCount += 1;
    }
  }

  return { results, correctZones, correctCount, total: options.length };
}

export function checkBlanks(payload: unknown, answers: Record<string, string>) {
  const parsed = lueckenPayloadSchema.parse(payload);

  const results: Record<string, boolean> = {};
  const correctAnswers: Record<string, string> = {};
  let correctCount = 0;

  for (const blank of parsed.blanks) {
    const given = (answers[blank.id] ?? "").trim().toLowerCase();
    const isCorrect = blank.accepted.some((accepted) => accepted.trim().toLowerCase() === given);
    results[blank.id] = isCorrect;
    correctAnswers[blank.id] = blank.accepted[0] ?? "";
    if (isCorrect) {
      correctCount += 1;
    }
  }

  return { results, correctAnswers, correctCount, total: parsed.blanks.length };
}

export function checkKurzantwort(payload: unknown, answer: string) {
  const parsed = kurzantwortPayloadSchema.parse(payload);
  const given = answer.trim().toLowerCase();

  const isCorrect = parsed.accepted_answers.some((accepted) => {
    const normalizedAccepted = accepted.trim().toLowerCase();
    return parsed.match_mode === "contains" ? given.includes(normalizedAccepted) : normalizedAccepted === given;
  });

  return { isCorrect, correctAnswer: parsed.accepted_answers[0] ?? "" };
}
