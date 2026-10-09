import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { registry as reg, testState } from "./test/trpcRegistry";

// Offline-Zweig: die lokale IndexedDB-Kopie wird durch Attrappen ersetzt (jsdom hat kein IndexedDB).
const offline = vi.hoisted(() => ({ loadOfflineQuizRound: vi.fn(), createOfflineQuizMutations: vi.fn(), DEFAULT_QUIZ_ROUND_SIZE: 20 }));
vi.mock("./offlineQuiz", () => offline);

import { Quiz } from "./Quiz";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const mc = (nummer: number) => ({
  id: `frage-${nummer}`,
  type: "quiz_mc",
  prompt: `Quizfrage ${nummer}?`,
  options: [
    { id: `frage-${nummer}-richtig`, text: "Richtige Option" },
    { id: `frage-${nummer}-falsch`, text: "Falsche Option" },
  ],
});
const wahrFalsch = (nummer: number) => ({
  id: `frage-${nummer}`,
  type: "wahr_falsch",
  prompt: `Aussage ${nummer}`,
  options: [
    { id: `frage-${nummer}-wahr`, text: "Wahr" },
    { id: `frage-${nummer}-falsch`, text: "Falsch" },
  ],
});

function bereiteVor(fragen: unknown[] = [mc(1), mc(2)]) {
  reg.queries["quiz.quizItems"] = fragen;
  reg.mutations["progress.startExerciseSet"] = () => ({ exerciseSetId: "set-1" });
  reg.mutations["quiz.submitAnswer"] = (eingabe) => {
    const { selectedOptionId } = eingabe as { selectedOptionId: string };
    const richtig = selectedOptionId.endsWith("richtig") || selectedOptionId.endsWith("wahr");
    return { isCorrect: richtig, correctOptionId: richtig ? selectedOptionId : selectedOptionId.replace("falsch", "richtig"), explanation: "Darum." };
  };
}

function zeige(zusatz: { itemType?: string } = {}) {
  return render(<Quiz kursId="kurs-1" themaId="thema-1" themaTitle="Thema" onClearThema={() => {}} {...zusatz} />);
}

function beantworte(option: "Richtige Option" | "Falsche Option") {
  fireEvent.click(screen.getByRole("button", { name: option }));
  fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
}

const text = () => document.body.textContent ?? "";

describe("Quiz (F-21/F-22, nur Quiz)", () => {
  it("zeigt „Lädt…“, solange die Fragen geladen werden", () => {
    bereiteVor();
    reg.loading["quiz.quizItems"] = true;
    zeige();
    expect(screen.getByText("Lädt…")).toBeTruthy();
  });

  it("meldet, wenn keine Fragen vorhanden sind", () => {
    bereiteVor([]);
    zeige();
    expect(text()).toContain("Keine Quiz-Fragen verfügbar.");
  });

  it("fragt mit Thema, Inhaltstyp und der Standardgröße von 20 Fragen an und zeigt die erste Frage", () => {
    bereiteVor([mc(1), mc(2), mc(3)]);
    zeige({ itemType: "swot" });
    expect(reg.queryInputs["quiz.quizItems"]![0]).toEqual({ kursId: "kurs-1", themaId: "thema-1", itemType: "swot", count: 20 });
    expect(text()).toContain("Frage 1 von 3");
    expect(screen.getByText("Quizfrage 1?")).toBeTruthy();
  });

  it("verlangt eine Auswahl, bevor „Antwort prüfen“ möglich ist", () => {
    bereiteVor();
    zeige();
    expect((screen.getByRole("button", { name: "Antwort prüfen" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Richtige Option" }));
    expect((screen.getByRole("button", { name: "Antwort prüfen" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("schickt Auswahl und Idempotenzschlüssel an den Server und zeigt die Rückmeldung mit Erklärung", () => {
    bereiteVor();
    zeige();
    beantworte("Richtige Option");

    const aufruf = reg.mutationCalls["quiz.submitAnswer"]![0] as { contentItemId: string; selectedOptionId: string; clientEventId: string };
    expect(aufruf).toMatchObject({ contentItemId: "frage-1", selectedOptionId: "frage-1-richtig" });
    expect(aufruf.clientEventId).toMatch(UUID);
    expect(text()).toContain("Richtig!");
    expect(text()).toContain("Darum.");
  });

  it("zeigt bei einer falschen Antwort „Leider falsch.“", () => {
    bereiteVor();
    zeige();
    beantworte("Falsche Option");
    expect(text()).toContain("Leider falsch.");
  });

  it("beantwortet Wahr/Falsch-Fragen mit einem Klick auf die Antwort", () => {
    bereiteVor([wahrFalsch(1)]);
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Wahr" }));
    expect(reg.mutationCalls["quiz.submitAnswer"]![0]).toMatchObject({ contentItemId: "frage-1", selectedOptionId: "frage-1-wahr" });
    expect(text()).toContain("Richtig!");
  });

  it("geht nach der Antwort zur nächsten Frage und zeigt am Ende die Zahl der richtigen Antworten", () => {
    bereiteVor();
    zeige();
    beantworte("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Nächste Frage" }));
    expect(text()).toContain("Frage 2 von 2");
    beantworte("Falsche Option");
    fireEvent.click(screen.getByRole("button", { name: "Ergebnis anzeigen" }));

    expect(text()).toContain("Quiz abgeschlossen");
    expect(text()).toContain("1 von 2 richtig");
  });

  it("legt für die Runde ein Übungsset an und schließt es nach der letzten Frage ab", () => {
    bereiteVor([mc(1), mc(2)]);
    zeige();
    expect(reg.mutationCalls["progress.startExerciseSet"]).toEqual([{ kursId: "kurs-1", themaId: "thema-1", mode: "quiz", totalItems: 2 }]);
    beantworte("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Nächste Frage" }));
    expect(reg.mutationCalls["progress.completeExerciseSet"]).toBeUndefined();
    beantworte("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Ergebnis anzeigen" }));
    expect(reg.mutationCalls["progress.completeExerciseSet"]).toEqual([{ exerciseSetId: "set-1" }]);
  });

  it("ändert über „Anzahl anpassen“ die Rundengröße und fragt neu an", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getByRole("button", { name: /Anzahl anpassen/ }));
    fireEvent.click(screen.getByRole("button", { name: "30" }));
    expect(reg.queryInputs["quiz.quizItems"]!.at(-1)).toMatchObject({ count: 30 });
  });

  it("lädt bei „Neue Runde starten“ neu und beginnt wieder bei der ersten Frage", () => {
    bereiteVor([mc(1)]);
    zeige();
    beantworte("Richtige Option");
    fireEvent.click(screen.getByRole("button", { name: "Ergebnis anzeigen" }));
    fireEvent.click(screen.getByRole("button", { name: "Neue Runde starten" }));

    expect(reg.refetch["quiz.quizItems"]).toHaveBeenCalledTimes(1);
    expect(text()).toContain("Frage 1 von 1");
  });

  it("zeigt nach Abbruch bzw. Pause die passende Meldung und startet mit „Neue Runde starten“ neu", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Runde abbrechen" }));
    expect(text()).toContain("Runde abgebrochen — nichts wurde gewertet.");
    fireEvent.click(screen.getByRole("button", { name: "Neue Runde starten" }));
    expect(reg.refetch["quiz.quizItems"]).toHaveBeenCalledTimes(1);
    expect(text()).toContain("Frage 1 von 2");

    fireEvent.click(screen.getByRole("button", { name: "Pause machen" }));
    expect(text()).toContain("Pause — deine bisherigen Antworten sind gespeichert.");
  });

  it("zeigt bei einem Fehler der Antwort die Meldung und lässt dieselbe Antwort erneut abschicken (gleicher Schlüssel)", async () => {
    bereiteVor();
    let versuche = 0;
    reg.mutations["quiz.submitAnswer"] = () => {
      versuche += 1;
      if (versuche === 1) throw new Error("Keine Verbindung");
      return { isCorrect: true, correctOptionId: "frage-1-richtig", explanation: null };
    };
    zeige();
    beantworte("Richtige Option");
    expect(await screen.findByText("Keine Verbindung")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(text()).toContain("Richtig!");
    const [erster, zweiter] = reg.mutationCalls["quiz.submitAnswer"]! as { clientEventId: string }[];
    expect(zweiter!.clientEventId).toBe(erster!.clientEventId);
  });

  describe("offline (F-42)", () => {
    it("liest die Runde aus der lokalen Kopie und wertet über die lokale Mutation aus, ohne den Server anzurufen", async () => {
      testState.online = false;
      const lokal = vi.fn((_eingabe: unknown, optionen: { onSuccess: (ergebnis: unknown) => void }) => optionen.onSuccess({ isCorrect: true, correctOptionId: "frage-1-richtig", explanation: "Lokal." }));
      offline.loadOfflineQuizRound.mockResolvedValue({ shaped: [mc(1)], raw: [] });
      offline.createOfflineQuizMutations.mockReturnValue({ submitAnswer: { mutate: lokal, isPending: false, error: null }, submitMatching: {}, submitBlanks: {}, submitKurzantwort: {} });
      zeige();

      expect(await screen.findByText("Quizfrage 1?")).toBeTruthy();
      expect(offline.loadOfflineQuizRound).toHaveBeenCalledWith("kurs-1", "thema-1", 20, undefined);
      beantworte("Richtige Option");

      expect(lokal).toHaveBeenCalledTimes(1);
      expect(lokal.mock.calls[0]![0]).toEqual({ contentItemId: "frage-1", selectedOptionId: "frage-1-richtig" });
      expect(reg.mutationCalls["quiz.submitAnswer"]).toBeUndefined();
      expect(text()).toContain("Lokal.");
    });

    it("legt offline kein Übungsset an und zeigt den Abbruchknopf nicht", async () => {
      testState.online = false;
      offline.loadOfflineQuizRound.mockResolvedValue({ shaped: [mc(1)], raw: [] });
      offline.createOfflineQuizMutations.mockReturnValue({ submitAnswer: { mutate: vi.fn(), isPending: false, error: null }, submitMatching: {}, submitBlanks: {}, submitKurzantwort: {} });
      zeige();
      await screen.findByText("Quizfrage 1?");
      expect(reg.mutationCalls["progress.startExerciseSet"]).toBeUndefined();
      expect(screen.queryByRole("button", { name: "Runde abbrechen" })).toBeNull();
    });
  });
});
