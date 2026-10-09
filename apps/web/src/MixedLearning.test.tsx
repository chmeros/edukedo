import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";

import { MixedLearning } from "./MixedLearning";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const karte = (nummer: number) => ({ id: `karte-${nummer}`, prompt: `Vorderseite ${nummer}`, explanation: `Rückseite ${nummer}` });
const frage = (nummer: number) => ({
  id: `frage-${nummer}`,
  type: "quiz_mc",
  prompt: `Quizfrage ${nummer}?`,
  options: [
    { id: `frage-${nummer}-richtig`, text: "Richtige Option" },
    { id: `frage-${nummer}-falsch`, text: "Falsche Option" },
  ],
});

function bereiteVor({ karten = 2, fragen = 1 } = {}) {
  reg.queries["content.dueCards"] = Array.from({ length: karten }, (_, index) => karte(index + 1));
  reg.queries["quiz.quizItems"] = Array.from({ length: fragen }, (_, index) => frage(index + 1));
  reg.mutations["progress.startExerciseSet"] = () => ({ exerciseSetId: "set-1" });
  reg.mutations["quiz.submitAnswer"] = (eingabe) => {
    const { selectedOptionId } = eingabe as { selectedOptionId: string };
    return { isCorrect: selectedOptionId.endsWith("richtig"), correctOptionId: selectedOptionId.replace("falsch", "richtig"), explanation: "Darum." };
  };
}

function zeigeMischmodus() {
  return render(<MixedLearning kursId="kurs-1" themaId="thema-1" />);
}

/** Dreht die aktuelle Karteikarte um und bewertet sie. */
function bewerteKarte(vorderseite: string, bewertung: "Einfach" | "Mittel" | "Schwer") {
  fireEvent.click(screen.getByText(vorderseite));
  fireEvent.click(screen.getByRole("button", { name: bewertung }));
}

function beantworteFrage(option: "Richtige Option" | "Falsche Option") {
  fireEvent.click(screen.getByRole("button", { name: option }));
  fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
}

describe("MixedLearning (F-104, Beides gemischt)", () => {
  it("zeigt „Lädt…“, solange Karten oder Fragen noch geladen werden", () => {
    bereiteVor();
    reg.loading["content.dueCards"] = true;
    zeigeMischmodus();
    expect(screen.getByText("Lädt…")).toBeTruthy();
  });

  it("meldet, wenn weder Karten noch Fragen fällig sind", () => {
    bereiteVor({ karten: 0, fragen: 0 });
    zeigeMischmodus();
    expect(screen.getByText(/Keine Karten oder Fragen fällig/)).toBeTruthy();
    expect(screen.queryByText(/von \d+ \(/)).toBeNull();
  });

  it("führt Karteikarten und Quizfragen zu einer Runde zusammen und zählt beide getrennt", () => {
    bereiteVor({ karten: 2, fragen: 3 });
    zeigeMischmodus();
    expect(screen.getByText("1 von 5 (2 Karteikarten + 3 Quiz-Fragen)")).toBeTruthy();
    expect(screen.getByText("Vorderseite 1")).toBeTruthy();
  });

  it("fragt Karten mit den für den Thema-Filter und die Quizanzahl passenden Eingaben ab", () => {
    bereiteVor();
    zeigeMischmodus();
    expect(reg.queryInputs["content.dueCards"]![0]).toEqual({ kursId: "kurs-1", themaId: "thema-1" });
    expect(reg.queryInputs["quiz.quizItems"]![0]).toMatchObject({ kursId: "kurs-1", themaId: "thema-1", count: 20 });
  });

  it("verbucht eine Kartenbewertung mit Idempotenzschlüssel und geht zur nächsten Aufgabe", () => {
    bereiteVor();
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Einfach");

    const aufrufe = reg.mutationCalls["progress.submitReview"]!;
    expect(aufrufe).toHaveLength(1);
    expect(aufrufe[0]).toMatchObject({ contentItemId: "karte-1", result: "gewusst" });
    expect((aufrufe[0] as { clientEventId: string }).clientEventId).toMatch(UUID);
    expect(screen.getByText("2 von 3 (2 Karteikarten + 1 Quiz-Fragen)")).toBeTruthy();
    expect(screen.getByText("Vorderseite 2")).toBeTruthy();
  });

  it("bildet die drei Bewertungen auf gewusst, unsicher und nicht_gewusst ab", () => {
    bereiteVor({ karten: 3, fragen: 0 });
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Einfach");
    bewerteKarte("Vorderseite 2", "Mittel");
    bewerteKarte("Vorderseite 3", "Schwer");
    const ergebnisse = reg.mutationCalls["progress.submitReview"]!.map((aufruf) => (aufruf as { result: string }).result);
    expect(ergebnisse).toEqual(["gewusst", "unsicher", "nicht_gewusst"]);
  });

  it("wertet eine Quizantwort aus, zeigt die Rückmeldung und schickt Auswahl und Schlüssel an den Server", () => {
    bereiteVor({ karten: 0, fragen: 1 });
    zeigeMischmodus();
    beantworteFrage("Richtige Option");

    const aufruf = reg.mutationCalls["quiz.submitAnswer"]![0] as { contentItemId: string; selectedOptionId: string; clientEventId: string };
    expect(aufruf).toMatchObject({ contentItemId: "frage-1", selectedOptionId: "frage-1-richtig" });
    expect(aufruf.clientEventId).toMatch(UUID);
    expect(screen.getByText(/Richtig!/)).toBeTruthy();
  });

  it("zeigt am Ende, wie viele Quizfragen richtig waren (Karten zählen nicht mit)", () => {
    bereiteVor({ karten: 1, fragen: 2 });
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Einfach");
    beantworteFrage("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Nächste Frage" }));
    beantworteFrage("Falsche Option");
    expect(screen.getByText(/Leider falsch/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Ergebnis anzeigen" }));

    expect(screen.getByText(/Runde abgeschlossen/).textContent).toContain("1 von 2 Quiz-Fragen richtig");
  });

  it("zeigt am Ende einer reinen Kartenrunde keine Quiz-Wertung", () => {
    bereiteVor({ karten: 1, fragen: 0 });
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Mittel");
    const meldung = screen.getByText(/Runde abgeschlossen/).textContent!;
    expect(meldung).not.toContain("Quiz-Fragen richtig");
  });

  it("legt für die ganze gemischte Runde ein Übungsset an und schließt es nach der letzten Aufgabe ab", () => {
    bereiteVor({ karten: 1, fragen: 1 });
    zeigeMischmodus();
    expect(reg.mutationCalls["progress.startExerciseSet"]).toEqual([{ kursId: "kurs-1", themaId: "thema-1", mode: "mixed", totalItems: 2 }]);
    expect(reg.mutationCalls["progress.completeExerciseSet"]).toBeUndefined();

    bewerteKarte("Vorderseite 1", "Einfach");
    expect(reg.mutationCalls["progress.completeExerciseSet"]).toBeUndefined();
    beantworteFrage("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Ergebnis anzeigen" }));
    expect(reg.mutationCalls["progress.completeExerciseSet"]).toEqual([{ exerciseSetId: "set-1" }]);
  });

  it("lädt bei „Neue Runde starten“ Karten und Fragen neu und beginnt wieder bei der ersten Aufgabe", () => {
    bereiteVor({ karten: 1, fragen: 0 });
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Einfach");
    fireEvent.click(screen.getByRole("button", { name: "Neue Runde starten" }));

    expect(reg.refetch["content.dueCards"]).toHaveBeenCalledTimes(1);
    expect(reg.refetch["quiz.quizItems"]).toHaveBeenCalledTimes(1);
    expect(screen.getByText("1 von 1 (1 Karteikarten + 0 Quiz-Fragen)")).toBeTruthy();
  });

  it("gibt eine abgeschlossene Karte nicht doppelt aus (Index läuft über die feste Warteschlange)", () => {
    bereiteVor({ karten: 2, fragen: 0 });
    zeigeMischmodus();
    bewerteKarte("Vorderseite 1", "Einfach");
    expect(screen.queryByText("Vorderseite 1")).toBeNull();
    bewerteKarte("Vorderseite 2", "Einfach");
    expect(screen.getByText(/Runde abgeschlossen/)).toBeTruthy();
  });
});
