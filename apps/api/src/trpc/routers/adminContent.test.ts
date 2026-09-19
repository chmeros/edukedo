import type { AdminContentItemForm } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { prepareContent } from "./adminContent";

const commonFormFields = {
  themaId: "00000000-0000-0000-0000-000000000000",
  difficulty: "mittel" as const,
  bloom: null,
  isPremium: false,
  isActive: true,
};

describe("prepareContent (F-11)", () => {
  it("theorie: baut body_markdown/images aus dem Formularfeld, explanation bleibt immer null", () => {
    const result = prepareContent({
      type: "theorie",
      prompt: "3.1 Personalplanung",
      bodyMarkdown: "# Überschrift\n\nText…",
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.explanation).toBeNull();
    expect(result.payload).toEqual({ body_markdown: "# Überschrift\n\nText…", images: [] });
    expect(result.answerOptions).toBeUndefined();
  });

  it("karteikarte: prompt/explanation direkt übernommen, payload leer", () => {
    const result = prepareContent({
      type: "karteikarte",
      prompt: "Was ist ein Pflichtenheft?",
      explanation: "Ein Dokument, das die Anforderungen beschreibt.",
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.prompt).toBe("Was ist ein Pflichtenheft?");
    expect(result.explanation).toBe("Ein Dokument, das die Anforderungen beschreibt.");
    expect(result.payload).toEqual({});
  });

  it("quiz_mc: baut answerOptions mit fortlaufendem sortOrder aus den Options", () => {
    const result = prepareContent({
      type: "quiz_mc",
      prompt: "Was ist 2+2?",
      explanation: null,
      options: [
        { text: "3", isCorrect: false },
        { text: "4", isCorrect: true },
        { text: "5", isCorrect: false },
      ],
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.payload).toEqual({});
    expect(result.answerOptions).toEqual([
      { text: "3", isCorrect: false, sortOrder: 0 },
      { text: "4", isCorrect: true, sortOrder: 1 },
      { text: "5", isCorrect: false, sortOrder: 2 },
    ]);
  });

  it("zuordnung: löst jedes Paar in zwei answer_option-Zeilen mit gemeinsamem groupKey auf", () => {
    const result = prepareContent({
      type: "zuordnung",
      prompt: "Ordne zu",
      explanation: null,
      pairs: [
        { left: "Pflichtenheft", right: "Anforderungsdokument" },
        { left: "Lastenheft", right: "Auftraggeber-Wunsch" },
      ],
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.answerOptions).toEqual([
      { text: "Pflichtenheft", isCorrect: false, groupKey: "0", side: "links", sortOrder: 0 },
      { text: "Anforderungsdokument", isCorrect: false, groupKey: "0", side: "rechts", sortOrder: 0 },
      { text: "Lastenheft", isCorrect: false, groupKey: "1", side: "links", sortOrder: 1 },
      { text: "Auftraggeber-Wunsch", isCorrect: false, groupKey: "1", side: "rechts", sortOrder: 1 },
    ]);
  });

  it("luecken: parst das inline ___Stichwort___-Format in text_with_blanks + blanks, prompt = Quelltext", () => {
    const result = prepareContent({
      type: "luecken",
      explanation: null,
      lueckentextSource: "Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf.",
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.prompt).toBe("Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf.");
    expect(result.payload).toEqual({
      text_with_blanks: "Die Differenz zwischen ___ und ___ zeigt den Handlungsbedarf.",
      blanks: [
        { id: "1", accepted: ["Soll"] },
        { id: "2", accepted: ["Ist"] },
      ],
    });
  });

  it("luecken: lehnt einen Quelltext ganz ohne ___Stichwort___-Markierung ab", () => {
    expect(() =>
      prepareContent({
        type: "luecken",
        explanation: null,
        lueckentextSource: "Text ganz ohne Lücken.",
        ...commonFormFields,
      } as AdminContentItemForm),
    ).toThrow(TRPCError);
  });

  it("kurzantwort: übernimmt acceptedAnswers/matchMode 1:1 ins payload", () => {
    const result = prepareContent({
      type: "kurzantwort",
      prompt: "Hauptstadt von Deutschland?",
      explanation: null,
      acceptedAnswers: ["Berlin"],
      matchMode: "exact",
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.payload).toEqual({ accepted_answers: ["Berlin"], match_mode: "exact" });
  });

  it("fallaufgabe: übernimmt parts 1:1 ins payload", () => {
    const result = prepareContent({
      type: "fallaufgabe",
      prompt: "Situationsaufgabe",
      explanation: null,
      parts: [{ prompt: "Teilaufgabe a)", points: 5, bloom: "anwenden" }],
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.payload).toEqual({ parts: [{ prompt: "Teilaufgabe a)", points: 5, bloom: "anwenden" }] });
  });

  it("fachgespraech_frage: übernimmt themaTitel ins payload", () => {
    const result = prepareContent({
      type: "fachgespraech_frage",
      prompt: "Wie gehen Sie bei einem Konflikt vor?",
      explanation: null,
      themaTitel: "3.3 Konfliktmanagement",
      ...commonFormFields,
    } as AdminContentItemForm);

    expect(result.payload).toEqual({ themaTitel: "3.3 Konfliktmanagement" });
  });
});
