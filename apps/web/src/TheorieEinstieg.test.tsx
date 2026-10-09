import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { registry as reg, testState } from "./test/trpcRegistry";

// Die Setup-Datei ersetzt das Lesefenster durch eine Attrappe; dieser Test braucht das echte (Provider und Kontext).
vi.unmock("./TheorieReader");

import { TheorieEinstieg } from "./TheorieEinstieg";
import { NachlesenButton, TheorieProvider } from "./TheorieReader";

const uebersicht = [
  { id: "fg1", title: "Handlungsbereich 1", percent: 0, mastered: 0, total: 4, themen: [{ id: "t11", title: "1.1 Planung", percent: 0, mastered: 0, total: 2 }, { id: "t12", title: "1.2 Prozesse", percent: 0, mastered: 0, total: 2 }] },
  { id: "fg2", title: "Handlungsbereich 2", percent: 0, mastered: 0, total: 2, themen: [{ id: "t21", title: "2.1 Führung", percent: 0, mastered: 0, total: 2 }] },
];

function bereiteVor() {
  reg.queries["progress.overview"] = uebersicht;
  reg.queries["content.theorieThema"] = { themaTitle: "1.1 Planung", fachgebietTitle: "Handlungsbereich 1", bodyMarkdown: "# Planung\n\nHier steht die Theorie zur Planung." };
}

function klappeAuf() {
  const details = document.querySelector("details.theorie-einstieg") as HTMLDetailsElement;
  details.open = true;
  fireEvent(details, new Event("toggle"));
}

describe("TheorieEinstieg (Review UXT-B-04, UXT-I-16)", () => {
  it("ist eingeklappt und lädt die Themenliste erst beim Aufklappen", () => {
    bereiteVor();
    render(
      <TheorieProvider kursId="kurs-1">
        <TheorieEinstieg kursId="kurs-1" />
      </TheorieProvider>,
    );
    expect(screen.getByText("📖 Theorie lesen")).toBeTruthy();
    // Die Abfrage ist abgeschaltet, solange nichts aufgeklappt ist: keine Themen in der Seite.
    expect(screen.queryByText("1.1 Planung")).toBeNull();

    klappeAuf();
    expect(screen.getByText("1.1 Planung")).toBeTruthy();
  });

  it("zeigt aufgeklappt die Themen nach Fachgebieten und öffnet beim Klick das Lesefenster mit der Theorie", () => {
    bereiteVor();
    render(
      <TheorieProvider kursId="kurs-1">
        <TheorieEinstieg kursId="kurs-1" />
      </TheorieProvider>,
    );
    klappeAuf();
    expect(screen.getByText("Handlungsbereich 1")).toBeTruthy();
    expect(screen.getByRole("button", { name: "2.1 Führung" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "1.1 Planung" }));
    expect(screen.getByRole("complementary", { name: "Theorie: 1.1 Planung" })).toBeTruthy();
    expect(document.body.textContent).toContain("Hier steht die Theorie zur Planung.");
    expect(reg.queryInputs["content.theorieThema"]![0]).toEqual({ kursId: "kurs-1", themaId: "t11" });
  });

  it("erscheint offline nicht, weil die Theorie nicht offline vorgehalten wird", () => {
    bereiteVor();
    testState.online = false;
    render(
      <TheorieProvider kursId="kurs-1">
        <TheorieEinstieg kursId="kurs-1" />
      </TheorieProvider>,
    );
    expect(screen.queryByText("📖 Theorie lesen")).toBeNull();
  });

  it("erscheint nicht ohne aktiven Kurs", () => {
    bereiteVor();
    render(
      <TheorieProvider kursId={null}>
        <TheorieEinstieg kursId="kurs-1" />
      </TheorieProvider>,
    );
    expect(screen.queryByText("📖 Theorie lesen")).toBeNull();
  });
});

describe("TheorieProvider: Lesefenster schließt bei Tab-Wechsel (Review UXT-I-07)", () => {
  function seite(resetKey: string) {
    return (
      <TheorieProvider kursId="kurs-1" resetKey={resetKey}>
        <NachlesenButton themaId="t11" themaTitle="1.1 Planung" />
      </TheorieProvider>
    );
  }

  it("lässt das Fenster bei gleichem Schlüssel offen und schließt es, wenn sich der Schlüssel ändert", () => {
    bereiteVor();
    const { rerender } = render(seite("app:lernen"));
    fireEvent.click(screen.getByRole("button", { name: /Im Thema nachlesen/ }));
    expect(screen.getByRole("complementary")).toBeTruthy();

    rerender(seite("app:lernen"));
    expect(screen.getByRole("complementary")).toBeTruthy();

    rerender(seite("app:exam"));
    expect(screen.queryByRole("complementary")).toBeNull();
  });
});
