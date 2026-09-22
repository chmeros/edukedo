import { describe, expect, it } from "vitest";
import {
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  checkSortierenAnswer,
  QuizItemNotFoundError,
  type RawAnswerOption,
  shapeQuizItem,
} from "./quiz-logic";

function mcOptions(): RawAnswerOption[] {
  return [
    { id: "opt-a", contentItemId: "item-1", text: "Falsch A", side: null, groupKey: null, isCorrect: false, sortOrder: 0 },
    { id: "opt-b", contentItemId: "item-1", text: "Richtig", side: null, groupKey: null, isCorrect: true, sortOrder: 1 },
  ];
}

describe("checkMcAnswer", () => {
  it("erkennt eine richtige Antwort", () => {
    expect(checkMcAnswer(mcOptions(), "opt-b")).toEqual({ isCorrect: true, correctOptionId: "opt-b" });
  });

  it("erkennt eine falsche Antwort, liefert trotzdem die korrekte Options-ID zurück", () => {
    expect(checkMcAnswer(mcOptions(), "opt-a")).toEqual({ isCorrect: false, correctOptionId: "opt-b" });
  });

  it("wirft QuizItemNotFoundError bei einer unbekannten Options-ID", () => {
    expect(() => checkMcAnswer(mcOptions(), "opt-unbekannt")).toThrow(QuizItemNotFoundError);
  });
});

describe("checkMatching", () => {
  function options(): RawAnswerOption[] {
    return [
      { id: "l1", contentItemId: "item-1", text: "Links 1", side: "links", groupKey: "g1", isCorrect: false, sortOrder: 0 },
      { id: "l2", contentItemId: "item-1", text: "Links 2", side: "links", groupKey: "g2", isCorrect: false, sortOrder: 1 },
      { id: "r1", contentItemId: "item-1", text: "Rechts 1", side: "rechts", groupKey: "g1", isCorrect: false, sortOrder: 0 },
      { id: "r2", contentItemId: "item-1", text: "Rechts 2", side: "rechts", groupKey: "g2", isCorrect: false, sortOrder: 1 },
    ];
  }

  it("zählt korrekt zugeordnete Paare", () => {
    const result = checkMatching(options(), [
      { leftOptionId: "l1", rightOptionId: "r1" },
      { leftOptionId: "l2", rightOptionId: "r2" },
    ]);
    expect(result).toEqual({ correctMap: { l1: "r1", l2: "r2" }, correctCount: 2, total: 2 });
  });

  it("zählt vertauschte Paare als falsch", () => {
    const result = checkMatching(options(), [
      { leftOptionId: "l1", rightOptionId: "r2" },
      { leftOptionId: "l2", rightOptionId: "r1" },
    ]);
    expect(result.correctCount).toBe(0);
    expect(result.total).toBe(2);
  });

  it("wirft QuizItemNotFoundError, wenn keine Optionen vorhanden sind", () => {
    expect(() => checkMatching([], [])).toThrow(QuizItemNotFoundError);
  });
});

describe("checkBlanks", () => {
  const payload = {
    text_with_blanks: "Die ___ ist wichtig.",
    blanks: [{ id: "1", accepted: ["Antwort", "antwort"] }],
  };

  it("akzeptiert eine exakte Übereinstimmung unabhängig von Groß-/Kleinschreibung", () => {
    const result = checkBlanks(payload, { "1": "ANTWORT" });
    expect(result).toEqual({ results: { "1": true }, correctAnswers: { "1": "Antwort" }, correctCount: 1, total: 1 });
  });

  it("lehnt eine fehlende/falsche Antwort ab", () => {
    const result = checkBlanks(payload, {});
    expect(result.results["1"]).toBe(false);
    expect(result.correctCount).toBe(0);
  });
});

describe("checkKurzantwort", () => {
  it("prüft im Modus 'exact' auf exakte Übereinstimmung (getrimmt, ohne Groß-/Kleinschreibung)", () => {
    const payload = { accepted_answers: ["Wissensbilanz"], match_mode: "exact" as const };
    expect(checkKurzantwort(payload, "  wissensbilanz  ")).toEqual({ isCorrect: true, correctAnswer: "Wissensbilanz" });
    expect(checkKurzantwort(payload, "Wissensbilanzen")).toEqual({ isCorrect: false, correctAnswer: "Wissensbilanz" });
  });

  it("prüft im Modus 'contains' auf Teilübereinstimmung", () => {
    const payload = { accepted_answers: ["Nachweisgesetz"], match_mode: "contains" as const };
    expect(checkKurzantwort(payload, "Das Nachweisgesetz regelt das.").isCorrect).toBe(true);
  });
});

describe("checkSortierenAnswer", () => {
  function options(): RawAnswerOption[] {
    return [
      { id: "a", contentItemId: "item-1", text: "Planung", side: null, groupKey: null, isCorrect: false, sortOrder: 0 },
      { id: "b", contentItemId: "item-1", text: "Durchführung", side: null, groupKey: null, isCorrect: false, sortOrder: 1 },
      { id: "c", contentItemId: "item-1", text: "Kontrolle", side: null, groupKey: null, isCorrect: false, sortOrder: 2 },
      { id: "d", contentItemId: "item-1", text: "Abschluss", side: null, groupKey: null, isCorrect: false, sortOrder: 3 },
    ];
  }

  it("erkennt die exakt richtige Reihenfolge", () => {
    const result = checkSortierenAnswer(options(), ["a", "b", "c", "d"]);
    expect(result).toEqual({
      results: { a: true, b: true, c: true, d: true },
      correctOrder: ["a", "b", "c", "d"],
      correctCount: 4,
      total: 4,
    });
  });

  it("zählt nur die Positionen richtig, die tatsächlich übereinstimmen", () => {
    // a und d bleiben richtig, b/c sind vertauscht.
    const result = checkSortierenAnswer(options(), ["a", "c", "b", "d"]);
    expect(result.results).toEqual({ a: true, c: false, b: false, d: true });
    expect(result.correctCount).toBe(2);
    expect(result.total).toBe(4);
  });

  it("wirft QuizItemNotFoundError, wenn keine Optionen vorhanden sind", () => {
    expect(() => checkSortierenAnswer([], [])).toThrow(QuizItemNotFoundError);
  });
});

describe("shapeQuizItem", () => {
  it("entfernt bei quiz_mc die Lösung (isCorrect) aus den Optionen", () => {
    const shaped = shapeQuizItem({ id: "item-1", type: "quiz_mc", prompt: "Frage?", payload: {} }, mcOptions());
    expect(shaped).toEqual({
      id: "item-1",
      type: "quiz_mc",
      prompt: "Frage?",
      options: [
        { id: "opt-a", text: "Falsch A" },
        { id: "opt-b", text: "Richtig" },
      ],
    });
  });

  it("liefert bei luecken den Lückentext ohne die akzeptierten Antworten", () => {
    const shaped = shapeQuizItem(
      {
        id: "item-2",
        type: "luecken",
        prompt: "",
        payload: { text_with_blanks: "Die ___ ist wichtig.", blanks: [{ id: "1", accepted: ["Antwort"] }] },
      },
      [],
    );
    expect(shaped).toEqual({
      id: "item-2",
      type: "luecken",
      prompt: "",
      textWithBlanks: "Die ___ ist wichtig.",
      blankIds: ["1"],
    });
  });

  it("liefert bei kurzantwort nur die Frage, keine akzeptierten Antworten", () => {
    const shaped = shapeQuizItem({ id: "item-3", type: "kurzantwort", prompt: "Frage?", payload: {} }, []);
    expect(shaped).toEqual({ id: "item-3", type: "kurzantwort", prompt: "Frage?" });
  });
});
