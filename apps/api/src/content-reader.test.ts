import { describe, expect, it } from "vitest";
import { leseAnsicht, suchAusschnitt, type LeseOption } from "./content-reader";

const option = (text: string, teil: Partial<LeseOption> = {}): LeseOption => ({ text, isCorrect: false, groupKey: null, side: null, sortOrder: 0, ...teil });

describe("leseAnsicht (Lese-Modus, Review UXL-12)", () => {
  it("markiert bei Auswahlfragen die richtigen Optionen", () => {
    const ansicht = leseAnsicht({
      type: "quiz_mc",
      prompt: "Frage",
      explanation: "Darum.",
      payload: {},
      options: [option("A", { sortOrder: 0 }), option("B", { isCorrect: true, sortOrder: 1 })],
    });
    expect(ansicht.loesung).toEqual(["– A", "✓ B"]);
    expect(ansicht.erklaerung).toBe("Darum.");
  });

  it("zeigt Zuordnungen als Paare und Sortieren als Reihenfolge", () => {
    const paare = leseAnsicht({
      type: "zuordnung",
      prompt: "x",
      explanation: null,
      payload: {},
      options: [
        option("Hund", { side: "links", groupKey: "1", sortOrder: 0 }),
        option("Tier", { side: "rechts", groupKey: "1", sortOrder: 1 }),
      ],
    });
    expect(paare.loesung).toEqual(["Hund ↔ Tier"]);
    const reihenfolge = leseAnsicht({
      type: "sortieren",
      prompt: "x",
      explanation: null,
      payload: {},
      options: [option("zweitens", { sortOrder: 1 }), option("erstens", { sortOrder: 0 })],
    });
    expect(reihenfolge.loesung).toEqual(["1. erstens", "2. zweitens"]);
  });

  it("liest Lücken, Kurzantworten, Fallaufgaben und Theorie aus dem Payload; ein defektes Payload bricht nichts", () => {
    const luecken = leseAnsicht({
      type: "luecken",
      prompt: "x",
      explanation: null,
      payload: { text_with_blanks: "Das ist {{a}}.", blanks: [{ id: "a", accepted: ["gut", "prima"] }] },
      options: [],
    });
    expect(luecken.text).toBe("Das ist {{a}}.");
    expect(luecken.loesung).toEqual(["a: gut / prima"]);
    expect(leseAnsicht({ type: "kurzantwort", prompt: "x", explanation: null, payload: { accepted_answers: ["Ja"], match_mode: "exact" }, options: [] }).loesung).toEqual(["Akzeptiert: Ja"]);
    expect(leseAnsicht({ type: "fallaufgabe", prompt: "x", explanation: null, payload: { parts: [{ prompt: "Nenne.", points: 2 }] }, options: [] }).text).toBe("Teilaufgabe 1 (2 Punkte): Nenne.");
    expect(leseAnsicht({ type: "theorie", prompt: "x", explanation: null, payload: { body_markdown: "# Titel" }, options: [] }).text).toBe("# Titel");
    expect(leseAnsicht({ type: "luecken", prompt: "x", explanation: null, payload: { kaputt: true }, options: [] })).toEqual({ text: null, loesung: [], erklaerung: null });
  });
});

describe("suchAusschnitt (Suche im Lese-Modus)", () => {
  it("liefert einen Ausschnitt um die Fundstelle, ohne Beachtung der Groß-/Kleinschreibung", () => {
    expect(suchAusschnitt("Die Amortisationsdauer gibt an, wann sich eine Investition lohnt.", "amortisation")).toBe("Die Amortisationsdauer gibt an, wann sich eine Investition lohnt.");
  });

  it("kürzt lange Texte mit Auslassungspunkten vorn und hinten", () => {
    const text = `${"a ".repeat(60)}Fundstelle${" b".repeat(80)}`;
    const ausschnitt = suchAusschnitt(text, "Fundstelle")!;
    expect(ausschnitt.startsWith("…")).toBe(true);
    expect(ausschnitt.endsWith("…")).toBe(true);
    expect(ausschnitt).toContain("Fundstelle");
    expect(ausschnitt.length).toBeLessThan(170);
  });

  it("entfernt Markdown-Zeichen und Zeilenumbrüche", () => {
    expect(suchAusschnitt("# Titel\n\nEin **fetter** Begriff", "fetter")).toBe("Titel Ein fetter Begriff");
  });

  it("gibt null zurück, wenn nichts gefunden wird oder der Text fehlt", () => {
    expect(suchAusschnitt("Text", "xyz")).toBeNull();
    expect(suchAusschnitt(null, "xyz")).toBeNull();
    expect(suchAusschnitt("Text", "")).toBeNull();
  });
});

describe("leseAnsicht: Wortauswahl-Lückentext (UXT-F-06)", () => {
  it("zeigt Text mit Platzhaltern, die Lösungen und die nicht passenden Wörter", () => {
    const ansicht = leseAnsicht({
      type: "luecken_auswahl",
      prompt: "Das ___Netz___ braucht ein ___Kabel___.",
      explanation: null,
      payload: { text_with_blanks: "Das ___ braucht ein ___.", blanks: [{ id: "1", accepted: ["Netz"] }, { id: "2", accepted: ["Kabel"] }], distractors: ["Drucker"] },
      options: [],
    });
    expect(ansicht.text).toBe("Das ___ braucht ein ___.");
    expect(ansicht.loesung).toEqual(["1: Netz", "2: Kabel", "Nicht passend: Drucker"]);
  });
});
