import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlanksStep, MatchingStep, QuadrantStep, SortierenStep } from "./QuizSteps";

/**
 * Rückmeldung nach der Antwort (Review UXT-B-07, UXT-F-09, UXT-I-06): Die Lösung steht als Text da, nicht nur als Farbe am Begriff,
 * dazu die Erklärung. Die Schritte werden ohne Server getestet: `submit` liefert sofort das Ergebnis, das der Server schicken würde.
 */
function nachgemachteAuswertung<TResult>(ergebnis: TResult) {
  const mutate = vi.fn((_eingabe: unknown, optionen: { onSuccess: (ergebnis: TResult) => void }) => optionen.onSuccess(ergebnis));
  return { mutate, isPending: false, error: null };
}

const text = () => document.body.textContent ?? "";

/** Wählt einen Begriff aus (Tastatur-/Klickweg) und legt ihn im benannten Zielfeld ab. */
function lege(begriff: string, ziel: string) {
  fireEvent.click(screen.getByRole("button", { name: begriff }));
  fireEvent.click(screen.getByRole("button", { name: ziel }));
}

function pruefe() {
  fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
}

describe("MatchingStep: Rückmeldung mit Lösung", () => {
  const item = {
    id: "z1",
    prompt: "Ordne zu.",
    left: [
      { id: "l-hund", text: "Hund" },
      { id: "l-katze", text: "Katze" },
    ],
    right: [
      { id: "r-bellen", text: "bellt" },
      { id: "r-miauen", text: "miaut" },
    ],
  };

  function zeige(ergebnis: { correctMap: Record<string, string>; correctCount: number; total: number; explanation?: string | null }) {
    const submit = nachgemachteAuswertung(ergebnis);
    render(<MatchingStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    return submit;
  }

  it("nennt bei falscher Zuordnung die richtige als „Begriff → Partner“ und zeigt die Erklärung", () => {
    // Hund bekommt „miaut“, Katze „bellt“: beides falsch.
    zeige({ correctMap: { "l-hund": "r-bellen", "l-katze": "r-miauen" }, correctCount: 0, total: 2, explanation: "Hunde bellen, Katzen miauen." });
    lege("bellt", "Katze");
    lege("miaut", "Hund");
    pruefe();

    expect(text()).toContain("0 von 2 Begriffen richtig zugeordnet.");
    expect(text()).toContain("Richtig wäre:");
    expect(text()).toContain("Hund → bellt");
    expect(text()).toContain("Katze → miaut");
    expect(text()).toContain("Hunde bellen, Katzen miauen.");
  });

  it("zeigt am Begriff ein Zeichen und einen Text für Hilfstechnik, nicht nur eine Farbe", () => {
    // Hund ↔ „bellt“ ist richtig, Katze ↔ „bellt“ wäre richtig gewesen: „miaut“ bei der Katze zählt hier als falsch.
    zeige({ correctMap: { "l-hund": "r-bellen", "l-katze": "r-bellen" }, correctCount: 1, total: 2 });
    lege("bellt", "Hund");
    lege("miaut", "Katze");
    pruefe();

    expect(screen.getByRole("button", { name: /bellt.*\(richtig\)/ }).textContent).toContain("✓");
    expect(screen.getByRole("button", { name: /miaut.*\(falsch\)/ }).textContent).toContain("✗");
  });

  it("nennt bei vollständig richtiger Zuordnung keine Korrektur, aber die Erklärung", () => {
    zeige({ correctMap: { "l-hund": "r-bellen", "l-katze": "r-miauen" }, correctCount: 2, total: 2, explanation: "Typische Laute." });
    lege("bellt", "Hund");
    lege("miaut", "Katze");
    pruefe();

    expect(text()).toContain("2 von 2 Begriffen richtig zugeordnet.");
    expect(text()).not.toContain("Richtig wäre:");
    expect(text()).toContain("Typische Laute.");
    expect(text()).toMatch(/✓/);
  });
});

describe("QuadrantStep: Rückmeldung mit richtiger Zone", () => {
  const item = {
    id: "q1",
    prompt: "Ordne den Zonen zu.",
    zones: [
      { key: "staerken", label: "Stärken" },
      { key: "risiken", label: "Risiken" },
    ],
    terms: [
      { id: "t-qualitaet", text: "Hohe Qualität" },
      { id: "t-preis", text: "Preisdruck" },
    ],
  };

  it("nennt für falsch eingeordnete Begriffe die richtige Zone und zeigt die Erklärung", () => {
    const submit = nachgemachteAuswertung({
      results: { "t-qualitaet": false, "t-preis": true },
      correctZones: { "t-qualitaet": "staerken", "t-preis": "risiken" },
      correctCount: 1,
      total: 2,
      explanation: "Qualität ist eine interne Stärke.",
    });
    render(<QuadrantStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    lege("Hohe Qualität", "Risiken");
    lege("Preisdruck", "Risiken");
    pruefe();

    expect(text()).toContain("1 von 2 Begriffen richtig zugeordnet.");
    expect(text()).toContain("Hohe Qualität → Stärken");
    expect(text()).not.toContain("Preisdruck → Risiken");
    expect(text()).toContain("Qualität ist eine interne Stärke.");
  });
});

describe("BlanksStep: Zeichen je Lücke und Erklärung", () => {
  it("kennzeichnet jede Lücke mit ✓ oder ✗ samt Text, nennt die Lösung und zeigt die Erklärung", () => {
    const submit = nachgemachteAuswertung({
      results: { b1: true, b2: false },
      correctAnswers: { b1: "Netz", b2: "Kabel" },
      correctCount: 1,
      total: 2,
      explanation: "Beides gehört zur Infrastruktur.",
    });
    const item = { id: "b", prompt: "Fülle aus.", textWithBlanks: "Ein ___ braucht ein ___.", blankIds: ["b1", "b2"] };
    render(<BlanksStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    const felder = screen.getAllByRole("textbox");
    fireEvent.change(felder[0]!, { target: { value: "Netz" } });
    fireEvent.change(felder[1]!, { target: { value: "Draht" } });
    pruefe();

    expect(text()).toContain("1 von 2 Lücken richtig.");
    expect(text()).toContain("Richtige Lösung: Netz, Kabel");
    expect(text()).toContain("Beides gehört zur Infrastruktur.");
    expect(text()).toContain("✓");
    expect(text()).toContain("✗");
    const hilfstext = [...document.querySelectorAll(".sr-only")].map((element) => element.textContent);
    expect(hilfstext).toContain(" (richtig)");
    expect(hilfstext).toContain(" (falsch)");
  });
});

describe("SortierenStep: Erklärung", () => {
  it("zeigt nach der Antwort die Erklärung", () => {
    const submit = nachgemachteAuswertung({
      results: { a: true, b: true, c: true, d: true },
      correctOrder: ["a", "b", "c", "d"],
      correctCount: 4,
      total: 4,
      explanation: "Erst planen, dann umsetzen.",
    });
    const item = {
      id: "s",
      prompt: "Bringe in die Reihenfolge.",
      items: [
        { id: "a", text: "Planen" },
        { id: "b", text: "Entwerfen" },
        { id: "c", text: "Umsetzen" },
        { id: "d", text: "Prüfen" },
      ],
    };
    render(<SortierenStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    const ziele = ["1.", "2.", "3.", "4."];
    ["Planen", "Entwerfen", "Umsetzen", "Prüfen"].forEach((begriff, index) => {
      fireEvent.click(screen.getByRole("button", { name: begriff }));
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${ziele[index]!.replace(".", "\\.")}`) }));
    });
    pruefe();
    expect(text()).toContain("Erst planen, dann umsetzen.");
  });
});
