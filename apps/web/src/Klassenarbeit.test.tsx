import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";

// Für die Prüfungsvorbereitung: die IHK-Bausteine sind nicht Gegenstand dieses Tests.
vi.mock("./Exam", () => ({ Exam: () => <div>Schriftliche Prüfung (Baustein)</div> }));
vi.mock("./Praesentationstrainer", () => ({ Praesentationstrainer: () => <div>Präsentation (Baustein)</div> }));
vi.mock("./Fachgespraechstrainer", () => ({ Fachgespraechstrainer: () => <div>Fachgespräch (Baustein)</div> }));
vi.mock("./Projekthilfe", () => ({ Projekthilfe: () => <div>Projekt (Baustein)</div> }));

import { Klassenarbeit } from "./Klassenarbeit";
import { Pruefungsangst } from "./Pruefungsangst";
import { Pruefungsvorbereitung } from "./Pruefungsvorbereitung";

const text = () => document.body.textContent ?? "";

const frage = (nummer: number) => ({
  id: `frage-${nummer}`,
  type: "quiz_mc",
  prompt: `Aufgabe ${nummer}?`,
  options: [
    { id: `frage-${nummer}-richtig`, text: "Richtig" },
    { id: `frage-${nummer}-falsch`, text: "Falsch" },
  ],
});

function bereiteVor(anzahl = 2) {
  reg.queries["quiz.quizItems"] = Array.from({ length: anzahl }, (_, index) => frage(index + 1));
  reg.mutations["progress.startExerciseSet"] = () => ({ exerciseSetId: "set-1" });
  reg.mutations["quiz.submitAnswer"] = (eingabe) => {
    const { selectedOptionId } = eingabe as { selectedOptionId: string };
    const richtig = selectedOptionId.endsWith("richtig");
    return { isCorrect: richtig, correctOptionId: selectedOptionId.replace("falsch", "richtig"), explanation: null };
  };
}

function beantworte(option: "Richtig" | "Falsch") {
  fireEvent.click(screen.getByRole("button", { name: option }));
  fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
}

function weiter(label: "Nächste Frage" | "Ergebnis anzeigen") {
  fireEvent.click(screen.getByRole("button", { name: label }));
}

describe("Klassenarbeit (Review UXT-I-10, Probe-Klassenarbeit für Schulkurse)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("bietet drei Dauern mit Fragenzahl an (Standard 45 Minuten) und erklärt, dass es eine Übung ohne Note ist", () => {
    bereiteVor();
    render(<Klassenarbeit kursId="kurs-1" />);
    expect(screen.getByRole("button", { name: "20 Min. · 12 Fragen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "45 Min. · 25 Fragen" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "90 Min. · 40 Fragen" })).toBeTruthy();
    expect(text()).toContain("sagt dir deine Lehrkraft");
  });

  it("startet mit der gewählten Fragenzahl, zeigt Restzeit und Abgeben, aber weder Fragenzahl-Auswahl noch Pause", () => {
    bereiteVor();
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "20 Min. · 12 Fragen" }));
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));

    expect(reg.queryInputs["quiz.quizItems"]!.at(-1)).toMatchObject({ count: 12 });
    expect(screen.getByRole("timer").textContent).toContain("20:00");
    expect(screen.getByRole("button", { name: "Abgeben" })).toBeTruthy();
    expect(screen.getByText("Aufgabe 1?")).toBeTruthy();
    expect(screen.queryByText(/Anzahl anpassen/)).toBeNull();
    expect(screen.queryByRole("button", { name: "Runde abbrechen" })).toBeNull();
  });

  it("zählt die Restzeit herunter", () => {
    bereiteVor();
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));
    act(() => {
      vi.advanceTimersByTime(65_000);
    });
    expect(screen.getByRole("timer").textContent).toContain("43:55");
  });

  it("zeigt nach der letzten Frage das Ergebnis in Prozent", () => {
    bereiteVor(2);
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));
    beantworte("Richtig");
    weiter("Nächste Frage");
    beantworte("Falsch");
    weiter("Ergebnis anzeigen");

    expect(text()).toContain("Klassenarbeit beendet.");
    expect(text()).toContain("1 von 2 Fragen richtig (50 %).");
    expect(text()).toContain("eine Übung und keine Note");
    expect(screen.queryByRole("timer")).toBeNull();
  });

  it("endet beim Abgeben mit dem bisherigen Stand und zählt Unbeantwortetes als nicht gelöst", () => {
    bereiteVor(2);
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));
    beantworte("Richtig");
    fireEvent.click(screen.getByRole("button", { name: "Abgeben" }));

    expect(text()).toContain("Abgegeben.");
    expect(text()).toContain("1 von 2 Fragen richtig (50 %).");
    expect(text()).toContain("1 Frage blieb unbeantwortet");
  });

  it("endet, wenn die Zeit abgelaufen ist", () => {
    bereiteVor(2);
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "20 Min. · 12 Fragen" }));
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));
    beantworte("Richtig");
    act(() => {
      vi.advanceTimersByTime(20 * 60_000 + 2_000);
    });

    expect(text()).toContain("Die Zeit ist abgelaufen.");
    expect(text()).toContain("1 von 2 Fragen richtig");
    expect(screen.queryByText("Aufgabe 2?")).toBeNull();
  });

  it("lässt sich mit „Noch eine Klassenarbeit“ neu starten, wieder bei der ersten Frage", () => {
    bereiteVor(1);
    render(<Klassenarbeit kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Klassenarbeit starten" }));
    beantworte("Richtig");
    weiter("Ergebnis anzeigen");
    fireEvent.click(screen.getByRole("button", { name: "Noch eine Klassenarbeit" }));

    expect(screen.getByRole("timer").textContent).toContain("45:00");
    expect(screen.getByText("Aufgabe 1?")).toBeTruthy();
  });
});

describe("Pruefungsvorbereitung je Kurskategorie (Review UXT-I-10)", () => {
  function kurse(kategorie: string, projektStunden: number | null = null) {
    reg.queries["courses.list"] = [{ id: "kurs-1", kategorie, projektStunden }];
    reg.queries["exam.guide"] = { areas: [], ablauf: [] };
  }

  it("zeigt für Schulkurse nur Probe-Klassenarbeit und Gelassen bleiben, ohne IHK-Bausteine", () => {
    kurse("schule");
    reg.queries["quiz.quizItems"] = [];
    render(<Pruefungsvorbereitung kursId="kurs-1" />);
    const reiter = screen.getAllByRole("tab").map((tab) => tab.textContent);
    expect(reiter).toEqual(["Probe-Klassenarbeit", "Gelassen bleiben"]);
    expect(screen.getByRole("tab", { name: "Probe-Klassenarbeit" }).getAttribute("aria-selected")).toBe("true");
    expect(text()).not.toContain("Schriftliche Prüfung (Baustein)");
    expect(text()).not.toContain("Präsentation (Baustein)");
    expect(text()).not.toContain("Fachgespräch (Baustein)");
  });

  it("lässt für Weiterbildungskurse alle Reiter unverändert (Projekt nur mit Projektstunden)", () => {
    kurse("erwachsenenbildung");
    const { unmount } = render(<Pruefungsvorbereitung kursId="kurs-1" />);
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Schriftliche Prüfung", "Präsentation", "Fachgespräch", "Gelassen bleiben"]);
    unmount();

    kurse("erwachsenenbildung", 40);
    render(<Pruefungsvorbereitung kursId="kurs-1" />);
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Schriftliche Prüfung", "Präsentation", "Projekt", "Fachgespräch", "Gelassen bleiben"]);
  });
});

describe("Pruefungsangst für Schulkurse", () => {
  beforeEach(() => {
    reg.queries["exam.guide"] = { areas: [], ablauf: [] };
  });

  it("spricht von Klassenarbeit, Lehrkraft und Schule statt von IHK, Kammer, Einladung und Projekt", () => {
    render(<Pruefungsangst kursId="kurs-1" schule />);
    expect(text()).toContain("So läuft eine Klassenarbeit ab");
    expect(text()).toContain("sagt dir deine Lehrkraft");
    expect(text()).toContain("Checkliste für den Tag der Klassenarbeit");
    expect(text()).toContain("entscheidet deine Schule");
    expect(text()).not.toContain("IHK");
    expect(text()).not.toContain("Kammer");
    expect(text()).not.toContain("Personalausweis");
    expect(text()).not.toContain("mündlichen Prüfung");
    expect(text()).not.toContain("Projekt");
  });

  it("lässt für andere Kurse die bisherigen Texte", () => {
    render(<Pruefungsangst kursId="kurs-1" />);
    expect(text()).toContain("So läuft deine Prüfung ab");
    expect(text()).toContain("deiner IHK");
    expect(text()).toContain("Personalausweis");
  });
});
