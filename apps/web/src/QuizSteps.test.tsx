import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlanksStep, KurzantwortStep, MatchingStep, McMultiStep, QuadrantStep, SortierenStep } from "./QuizSteps";

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

describe("KurzantwortStep: Hinweis auf anders formulierte Antworten", () => {
  function antworteFalsch(richtigeAntwort: string) {
    const submit = nachgemachteAuswertung({ isCorrect: false, correctAnswer: richtigeAntwort, explanation: null });
    render(<KurzantwortStep item={{ id: "k", prompt: "Frage?" }} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} canReport />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "falsch" } });
    pruefe();
  }

  it("zeigt bei einer falschen Textantwort den Hinweis, dass sinngemäß richtige Antworten meldbar sind", () => {
    antworteFalsch("Pflichtenheft");
    expect(text()).toContain("War deine Antwort trotzdem sinngemäß richtig");
  });

  it("zeigt den Hinweis nicht bei reinen Zahlenantworten (UXT-F, Zusatzbefund)", () => {
    antworteFalsch("1.250,50");
    expect(text()).toContain("Richtige Lösung:");
    expect(text()).not.toContain("War deine Antwort trotzdem sinngemäß richtig");
  });
});

describe("Eingabe und Bedienung (Review UXT-B-06, B-12, B-16)", () => {
  it("Kurzantwort: das Feld hat einen Namen, und Enter prüft die Antwort (nur mit Eingabe)", () => {
    const submit = nachgemachteAuswertung({ isCorrect: true, correctAnswer: "Pflichtenheft", explanation: null });
    render(<KurzantwortStep item={{ id: "k", prompt: "Frage?" }} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    const feld = screen.getByRole("textbox", { name: "Deine Antwort" });

    fireEvent.keyDown(feld, { key: "Enter" });
    expect(submit.mutate).not.toHaveBeenCalled();

    fireEvent.change(feld, { target: { value: "Pflichtenheft" } });
    fireEvent.keyDown(feld, { key: "Enter" });
    expect(submit.mutate).toHaveBeenCalledTimes(1);
    expect(text()).toContain("Richtig!");
  });

  it("Lückentext: Enter prüft erst, wenn alle Lücken gefüllt sind; jede Lücke hat einen Namen", () => {
    const submit = nachgemachteAuswertung({
      results: { b1: true, b2: true },
      correctAnswers: { b1: "Netz", b2: "Kabel" },
      correctCount: 2,
      total: 2,
    });
    const item = { id: "b", prompt: "Fülle aus.", textWithBlanks: "Ein ___ braucht ein ___.", blankIds: ["b1", "b2"] };
    render(<BlanksStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    const erste = screen.getByRole("textbox", { name: "Lücke 1" });
    const zweite = screen.getByRole("textbox", { name: "Lücke 2" });

    fireEvent.change(erste, { target: { value: "Netz" } });
    fireEvent.keyDown(erste, { key: "Enter" });
    expect(submit.mutate).not.toHaveBeenCalled();

    fireEvent.change(zweite, { target: { value: "Kabel" } });
    fireEvent.keyDown(zweite, { key: "Enter" });
    expect(submit.mutate).toHaveBeenCalledTimes(1);
  });

  it("Mehrfachauswahl: jede Option ist ein Ankreuzfeld mit Zustand, das Kästchen-Zeichen wird nicht mitgelesen", () => {
    const submit = nachgemachteAuswertung({ isCorrect: true, correctOptionIds: ["a"], explanation: null });
    const item = { id: "m", prompt: "Mehrere?", options: [{ id: "a", text: "Alpha" }, { id: "b", text: "Beta" }] };
    render(<McMultiStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    const alpha = screen.getByRole("checkbox", { name: "Alpha" });
    expect(alpha.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(alpha);
    expect(alpha.getAttribute("aria-checked")).toBe("true");
    expect(alpha.querySelector("[aria-hidden='true']")?.textContent).toBe("☑ ");
  });

  it("Zuordnung: ein Klick auf die freie Fläche des Zielfelds legt den gewählten Begriff dort ab, nicht nur der Klick auf die Beschriftung", () => {
    const submit = nachgemachteAuswertung({ correctMap: {}, correctCount: 0, total: 1 });
    const item = { id: "z", prompt: "Ordne zu.", left: [{ id: "l1", text: "Hund" }], right: [{ id: "r1", text: "bellt" }] };
    render(<MatchingStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    fireEvent.click(screen.getByRole("button", { name: "bellt" }));
    const zone = screen.getByRole("button", { name: "Hund" }).closest(".quadrant-zone") as HTMLElement;
    fireEvent.click(zone);

    expect(zone.querySelector(".quadrant-term")?.textContent).toContain("bellt");
    expect(document.querySelector(".quadrant-pool .quadrant-term")).toBeNull();
  });

  it("Zuordnung: ein Klick auf einen Begriff in der Zone legt nichts ab, sondern wählt ihn nur aus", () => {
    const submit = nachgemachteAuswertung({ correctMap: {}, correctCount: 0, total: 2 });
    const item = {
      id: "z",
      prompt: "Ordne zu.",
      left: [{ id: "l1", text: "Hund" }, { id: "l2", text: "Katze" }],
      right: [{ id: "r1", text: "bellt" }, { id: "r2", text: "miaut" }],
    };
    render(<MatchingStep item={item} isLast={false} onAnswered={() => {}} onNext={() => {}} submit={submit} />);
    fireEvent.click(screen.getByRole("button", { name: "bellt" }));
    fireEvent.click(screen.getByRole("button", { name: "Hund" }));
    // „bellt“ liegt jetzt im Feld „Hund“; ein Klick darauf wählt es aus und verschiebt nichts.
    const begriff = screen.getByRole("button", { name: "bellt" });
    fireEvent.click(begriff);
    expect(begriff.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Hund" }).closest(".quadrant-zone")?.querySelector(".quadrant-term")?.textContent).toContain("bellt");
  });
});
