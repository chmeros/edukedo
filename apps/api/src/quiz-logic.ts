import { kurzantwortPayloadSchema, lueckenPayloadSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";

/**
 * Reine Formungs-/Prüflogik für Quiz-Items (F-21), gemeinsam genutzt von
 * trpc/routers/quiz.ts (eingeschriebene Kurse, F-21) und trpc/routers/preview.ts
 * (kontoloser Vorschau-Modus, F-08) — beide zeigen dieselben vier Fragetypen ohne
 * Lösung an und prüfen serverseitig identisch, nur die Quelle der content_item-Zeilen
 * unterscheidet sich (eingeschriebene Kurse vs. veröffentlichte Kurse ohne Account-Bezug).
 */

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
}

export type ShapedQuizItem =
  | { id: string; type: "quiz_mc"; prompt: string; options: { id: string; text: string }[] }
  | {
      id: string;
      type: "zuordnung";
      prompt: string;
      left: { id: string; text: string }[];
      right: { id: string; text: string }[];
    }
  | { id: string; type: "luecken"; prompt: string; textWithBlanks: string; blankIds: string[] }
  | { id: string; type: "kurzantwort"; prompt: string };

/** Formt eine rohe content_item-Zeile (+ zugehörige answer_option-Zeilen) in die
 * öffentliche, lösungsfreie Darstellung — nie die richtige Antwort/Zuordnung/Lösung
 * mitschicken (siehe Architekturplanung Abschnitt 13). */
export function shapeQuizItem(item: RawQuizItem, options: RawAnswerOption[]): ShapedQuizItem {
  if (item.type === "quiz_mc") {
    return {
      id: item.id,
      type: "quiz_mc",
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

  return { id: item.id, type: "kurzantwort", prompt: item.prompt };
}

export function checkMcAnswer(options: RawAnswerOption[], selectedOptionId: string) {
  const selected = options.find((option) => option.id === selectedOptionId);
  const correct = options.find((option) => option.isCorrect);

  if (!selected || !correct) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Frage oder Antwortoption nicht gefunden." });
  }

  return { isCorrect: selected.isCorrect, correctOptionId: correct.id };
}

export function checkMatching(options: RawAnswerOption[], pairs: { leftOptionId: string; rightOptionId: string }[]) {
  if (options.length === 0) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Frage nicht gefunden." });
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
