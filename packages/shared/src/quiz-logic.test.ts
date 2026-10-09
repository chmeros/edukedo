import { describe, expect, it } from "vitest";
import {
  checkBlanks,
  checkKurzantwort,
  checkMatching,
  checkMcAnswer,
  checkQuadrantAnswer,
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

  /**
   * Sicherheits-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13): ohne
   * Deduplizierung ließ sich ein einzelnes bekanntes Paar beliebig oft einreichen und so
   * correctCount === total erreichen, ohne die übrigen Paare zu kennen.
   */
  it("zählt ein mehrfach eingereichtes Paar nur einmal, statt die fehlenden Paare zu verschleiern", () => {
    const result = checkMatching(options(), [
      { leftOptionId: "l1", rightOptionId: "r1" },
      { leftOptionId: "l1", rightOptionId: "r1" },
      { leftOptionId: "l1", rightOptionId: "r1" },
      { leftOptionId: "l1", rightOptionId: "r1" },
    ]);
    expect(result.correctCount).toBe(1);
    expect(result.total).toBe(2);
  });

  it("zählt eine wiederholte falsche Zuordnung ebenfalls nur einmal", () => {
    const result = checkMatching(options(), [
      { leftOptionId: "l1", rightOptionId: "r2" },
      { leftOptionId: "l1", rightOptionId: "r1" },
    ]);
    // Die erste Einreichung von l1 zählt (falsch, r2 statt r1) — die zweite, obwohl diesmal
    // korrekt, wird als Duplikat verworfen, damit ein Ausprobieren mehrerer Antworten für
    // dasselbe Paar im selben Request keinen Vorteil bringt.
    expect(result.correctCount).toBe(0);
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

  describe("gleiche Schreibweisen (FL-MA-03)", () => {
    const wurzel = { accepted_answers: ["10√2"], match_mode: "exact" as const };
    const tangens = { accepted_answers: ["Gegenkathete = 9 · tan(60°)"], match_mode: "exact" as const };
    const potenz = { accepted_answers: ["2^10"], match_mode: "exact" as const };

    it("wertet gängige Tipp-Schreibweisen als richtig, ohne dass sie im Inhalt aufgezählt sind", () => {
      for (const eingabe of ["10 wurzel 2", "10*√2", "10 √ 2", "10·sqrt(2)", "10 Wurzel aus 2"]) {
        expect(checkKurzantwort(wurzel, eingabe).isCorrect, eingabe).toBe(true);
      }
      for (const eingabe of ["gegenkathete = 9 tan 60", "Gegenkathete=9*tan(60)", "gegenkathete = 9 · tan 60°"]) {
        expect(checkKurzantwort(tangens, eingabe).isCorrect, eingabe).toBe(true);
      }
      for (const eingabe of ["2¹⁰", "2 hoch 10", "2**10", "2 ^ 10"]) {
        expect(checkKurzantwort(potenz, eingabe).isCorrect, eingabe).toBe(true);
      }
    });

    it("wertet falsche Antworten weiterhin als falsch und zeigt als Lösung die Schreibweise des Autors", () => {
      expect(checkKurzantwort(wurzel, "10√3")).toEqual({ isCorrect: false, correctAnswer: "10√2" });
      expect(checkKurzantwort(potenz, "2^11").isCorrect).toBe(false);
      expect(checkKurzantwort(tangens, "gegenkathete = 9 tan 30").isCorrect).toBe(false);
      expect(checkKurzantwort(wurzel, "").isCorrect).toBe(false);
    });

    it("gleicht Punkt und Komma bei Zahlen nicht an", () => {
      const tausend = { accepted_answers: ["1.000"], match_mode: "exact" as const };
      expect(checkKurzantwort(tausend, "1,000").isCorrect).toBe(false);
      expect(checkKurzantwort(tausend, "1.000").isCorrect).toBe(true);
    });

    it("gilt auch für Lücken im Lückentext", () => {
      const lueckentext = { text_with_blanks: "Die Zahl ___ ist irrational.", blanks: [{ id: "1", accepted: ["√2"] }] };
      expect(checkBlanks(lueckentext, { "1": "wurzel 2" }).results["1"]).toBe(true);
      expect(checkBlanks(lueckentext, { "1": "wurzel 3" }).results["1"]).toBe(false);
    });
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

describe("checkQuadrantAnswer", () => {
  function options(): RawAnswerOption[] {
    return [
      { id: "s1", contentItemId: "item-1", text: "Stärke 1", side: null, groupKey: "staerken", isCorrect: false, sortOrder: 0 },
      { id: "s2", contentItemId: "item-1", text: "Stärke 2", side: null, groupKey: "staerken", isCorrect: false, sortOrder: 1 },
      { id: "w1", contentItemId: "item-1", text: "Schwäche 1", side: null, groupKey: "schwaechen", isCorrect: false, sortOrder: 2 },
    ];
  }

  it("erkennt eine vollständig richtige Zuordnung", () => {
    const result = checkQuadrantAnswer(options(), [
      { optionId: "s1", zoneKey: "staerken" },
      { optionId: "s2", zoneKey: "staerken" },
      { optionId: "w1", zoneKey: "schwaechen" },
    ]);
    expect(result.correctCount).toBe(3);
    expect(result.total).toBe(3);
  });

  it("wirft QuizItemNotFoundError, wenn keine Optionen vorhanden sind", () => {
    expect(() => checkQuadrantAnswer([], [])).toThrow(QuizItemNotFoundError);
  });

  /**
   * Sicherheits-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13): ohne
   * Deduplizierung ließ sich ein einzelner bekannter Begriff beliebig oft einreichen und so
   * correctCount === total erreichen, ohne die übrigen Begriffe je platziert zu haben.
   */
  it("zählt einen mehrfach eingereichten Begriff nur einmal, statt die fehlende Platzierung anderer Begriffe zu verschleiern", () => {
    const result = checkQuadrantAnswer(options(), [
      { optionId: "s1", zoneKey: "staerken" },
      { optionId: "s1", zoneKey: "staerken" },
      { optionId: "s1", zoneKey: "staerken" },
    ]);
    expect(result.correctCount).toBe(1);
    expect(result.total).toBe(3);
  });
});

describe("shapeQuizItem", () => {
  it("entfernt bei quiz_mc die Lösung (isCorrect) aus den Optionen", () => {
    const shaped = shapeQuizItem({ id: "item-1", type: "quiz_mc", prompt: "Frage?", payload: {} }, mcOptions());
    expect(shaped).toEqual({
      id: "item-1",
      type: "quiz_mc",
      prompt: "Frage?",
      options: expect.arrayContaining([
        { id: "opt-a", text: "Falsch A" },
        { id: "opt-b", text: "Richtig" },
      ]),
    });
    expect((shaped as { options: unknown[] }).options).toHaveLength(2);
  });

  it("mischt die Optionen von Mehrfachauswahl-Typen (jede Position kommt vor), Wahr/Falsch bleibt in fester Reihenfolge", () => {
    const options = [0, 1, 2, 3].map((i) => ({ id: `o${i}`, contentItemId: "m", text: `Option ${i}`, isCorrect: i === 0 }) as never);
    const positionOfFirst = new Set<number>();
    for (let i = 0; i < 400; i += 1) {
      const shaped = shapeQuizItem({ id: "m", type: "quiz_mc", prompt: "?", payload: {} }, options) as { options: { id: string }[] };
      expect(shaped.options.map((option) => option.id).sort()).toEqual(["o0", "o1", "o2", "o3"]);
      positionOfFirst.add(shaped.options.findIndex((option) => option.id === "o0"));
    }
    expect([...positionOfFirst].sort()).toEqual([0, 1, 2, 3]);

    const wf = [
      { id: "w", contentItemId: "t", text: "Wahr", isCorrect: false },
      { id: "f", contentItemId: "t", text: "Falsch", isCorrect: true },
    ] as never[];
    for (let i = 0; i < 50; i += 1) {
      const shaped = shapeQuizItem({ id: "t", type: "wahr_falsch", prompt: "?", payload: {} }, wf) as { options: { id: string }[] };
      expect(shaped.options.map((option) => option.id)).toEqual(["w", "f"]);
    }
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
