import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { SprintSpiel } from "./WeitereSpiele";

const text = () => document.body.textContent ?? "";

function bereiteVor() {
  reg.queries["game.getSprint"] = { anzahl: 2, bestwerte: {}, abschlussmeldung: "Geschafft" };
  reg.mutations["game.sprintStart"] = () => ({
    sprintId: "sprint-1",
    aufgaben: [
      { token: "t1", frage: "Wie viel sind 10 % von 200?", hinweis: "Ganze Zahl", typ: "x" },
      { token: "t2", frage: "Wie viel sind 5 % von 100?", hinweis: "Ganze Zahl", typ: "x" },
    ],
  });
  reg.mutations["game.sprintAntwort"] = () => ({ correct: true, erwartet: "20", erklaerung: "Weil.", gezaehlt: true });
}

function starte(gameType: "rechensprint" | "subnetting") {
  render(<SprintSpiel kursId="kurs-1" setKey="standard" title="Sprint" gameType={gameType} onClose={() => {}} />);
  fireEvent.click(screen.getByRole("button", { name: "Sprint starten" }));
}

function antworte(eingabe: string) {
  fireEvent.change(screen.getByRole("textbox", { name: "Deine Antwort" }), { target: { value: eingabe } });
  fireEvent.click(screen.getByRole("button", { name: "Prüfen" }));
}

describe("SprintSpiel (Review UXT-B-15)", () => {
  it("beschreibt den Rechen-Sprint in ganzen Sätzen, ohne abgebrochenen Satz", () => {
    bereiteVor();
    render(<SprintSpiel kursId="kurs-1" setKey="standard" title="Sprint" gameType="rechensprint" onClose={() => {}} />);
    expect(text()).toContain("Ein einfacher Taschenrechner ist erlaubt. Prüfe jede Antwort sofort.");
    expect(text()).not.toContain("— und prüfe");
  });

  it("nennt bei den anderen Sprints die Hilfsmittel ebenfalls mit Satzende", () => {
    bereiteVor();
    render(<SprintSpiel kursId="kurs-1" setKey="standard" title="Sprint" gameType="subnetting" onClose={() => {}} />);
    expect(text()).toContain("Rechne im Kopf oder auf Papier. Prüfe jede Antwort sofort.");
  });

  it("weist im Rechen-Sprint eine Eingabe ohne Zahl mit einem Hinweis ab, statt sie als falsche Antwort zu werten", () => {
    bereiteVor();
    starte("rechensprint");
    antworte("abc");

    expect(screen.getByRole("alert").textContent).toContain("Bitte gib eine Zahl ein");
    expect(reg.mutationCalls["game.sprintAntwort"]).toBeUndefined();
  });

  it("löscht den Hinweis beim nächsten Tippen und wertet danach eine Zahl wie bisher", () => {
    bereiteVor();
    starte("rechensprint");
    antworte("abc");
    fireEvent.change(screen.getByRole("textbox", { name: "Deine Antwort" }), { target: { value: "20" } });
    expect(screen.queryByRole("alert")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Prüfen" }));

    expect(reg.mutationCalls["game.sprintAntwort"]).toEqual([{ kursId: "kurs-1", setKey: "standard", gameType: "rechensprint", token: "t1", eingabe: "20" }]);
  });

  it("akzeptiert im Rechen-Sprint auch deutsche Schreibweisen mit Komma und Einheit", () => {
    bereiteVor();
    starte("rechensprint");
    antworte("1.250,50 €");
    expect(reg.mutationCalls["game.sprintAntwort"]).toHaveLength(1);
  });

  it("schickt in den anderen Sprints jede Eingabe zur Prüfung (Adressen und Zahlen in anderen Systemen sind keine Dezimalzahlen)", () => {
    bereiteVor();
    starte("subnetting");
    antworte("192.168.0.0");
    expect(reg.mutationCalls["game.sprintAntwort"]).toHaveLength(1);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
