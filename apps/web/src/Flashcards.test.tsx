import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { registry as reg, testState } from "./test/trpcRegistry";

// Offline-Zweig: die lokale IndexedDB-Kopie wird durch Attrappen ersetzt (jsdom hat kein IndexedDB).
const offline = vi.hoisted(() => ({ loadOfflineDueCards: vi.fn(), reviewOfflineCard: vi.fn() }));
vi.mock("./offlineFlashcards", () => offline);

import { Flashcards } from "./Flashcards";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const karte = (nummer: number, zusatz: Record<string, unknown> = {}) => ({
  id: `karte-${nummer}`,
  prompt: `Vorderseite ${nummer}`,
  explanation: `Rückseite ${nummer}`,
  flaggedAsDifficult: false,
  ...zusatz,
});

function bereiteVor(karten = [karte(1), karte(2)]) {
  reg.queries["content.dueCards"] = karten;
  reg.queries["auth.me"] = { flashcardStartWithAnswer: false };
}

function zeige() {
  return render(<Flashcards kursId="kurs-1" themaId="thema-1" themaTitle="Thema" onClearThema={() => {}} />);
}

const umdrehen = (vorderseite: string) => fireEvent.click(screen.getByText(vorderseite));
const bewerte = (bewertung: "Einfach" | "Mittel" | "Schwer") => fireEvent.click(screen.getByRole("button", { name: bewertung }));
const text = () => document.body.textContent ?? "";

describe("Flashcards (F-110/F-111, nur Karteikarten)", () => {
  beforeEach(() => {
    offline.loadOfflineDueCards.mockReset();
    offline.reviewOfflineCard.mockReset();
  });

  it("zeigt „Lädt…“, solange die Karten geladen werden", () => {
    bereiteVor();
    reg.loading["content.dueCards"] = true;
    zeige();
    expect(screen.getByText("Lädt…")).toBeTruthy();
  });

  it("meldet, wenn keine Karte fällig ist", () => {
    bereiteVor([]);
    zeige();
    expect(text()).toContain("Keine Karten fällig");
  });

  it("zeigt die erste Karte mit Zählung und deckt die Rückseite erst nach dem Umdrehen zur Bewertung auf", () => {
    bereiteVor();
    zeige();
    expect(text()).toContain("von 2 Karten");
    expect(screen.getByText("Vorderseite 1")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Einfach" })).toBeNull();
    umdrehen("Vorderseite 1");
    expect(screen.getByRole("button", { name: "Einfach" })).toBeTruthy();
    expect(screen.getByText("Wie schwierig war diese Karteikarte für dich?")).toBeTruthy();
  });

  it("zeigt die Karte auf Wunsch gleich mit der Antwort (Einstellung „Startseite“)", () => {
    bereiteVor();
    reg.queries["auth.me"] = { flashcardStartWithAnswer: true };
    zeige();
    expect(screen.getByRole("button", { name: "Einfach" })).toBeTruthy();
  });

  it("verbucht die Bewertung mit Idempotenzschlüssel über submitReview und geht zur nächsten Karte", () => {
    bereiteVor();
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");

    const aufrufe = reg.mutationCalls["progress.submitReview"]!;
    expect(aufrufe).toHaveLength(1);
    expect(aufrufe[0]).toMatchObject({ contentItemId: "karte-1", result: "gewusst" });
    expect((aufrufe[0] as { clientEventId: string }).clientEventId).toMatch(UUID);
    expect(screen.getByText("Vorderseite 2")).toBeTruthy();
  });

  it("bildet Einfach, Mittel und Schwer auf gewusst, unsicher und nicht_gewusst ab und schließt die Runde ab", () => {
    bereiteVor([karte(1), karte(2), karte(3)]);
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");
    umdrehen("Vorderseite 2");
    bewerte("Mittel");
    umdrehen("Vorderseite 3");
    bewerte("Schwer");

    expect(reg.mutationCalls["progress.submitReview"]!.map((aufruf) => (aufruf as { result: string }).result)).toEqual(["gewusst", "unsicher", "nicht_gewusst"]);
    expect(text()).toContain("Runde abgeschlossen");
    expect(text()).toContain("3 Karten");
  });

  it("ändert eine bereits bewertete Karte über changeReview statt sie ein zweites Mal zu bewerten (F-111)", () => {
    bereiteVor();
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");
    fireEvent.click(screen.getByRole("button", { name: "← Zurück" }));
    umdrehen("Vorderseite 1");
    expect(screen.getByText("Einschätzung ändern?")).toBeTruthy();
    bewerte("Schwer");

    expect(reg.mutationCalls["progress.submitReview"]).toHaveLength(1);
    expect(reg.mutationCalls["progress.changeReview"]).toEqual([{ contentItemId: "karte-1", result: "nicht_gewusst" }]);
  });

  it("zeigt bei einer fehlgeschlagenen Bewertung eine Meldung und bewertet die Karte danach erneut als erste Bewertung (WEB-06)", async () => {
    bereiteVor();
    reg.mutations["progress.submitReview"] = () => {
      throw new Error("Keine Verbindung");
    };
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");

    expect(await screen.findByText(/Die letzte Bewertung wurde nicht gespeichert \(Keine Verbindung\)/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "← Zurück" }));
    umdrehen("Vorderseite 1");
    bewerte("Einfach");
    // Die Karte gilt nach dem Fehler nicht als bewertet: der zweite Versuch geht wieder an submitReview, nicht an changeReview.
    expect(reg.mutationCalls["progress.submitReview"]).toHaveLength(2);
    expect(reg.mutationCalls["progress.changeReview"]).toBeUndefined();
    // Jeder Versuch trägt einen gültigen Schlüssel.
    for (const aufruf of reg.mutationCalls["progress.submitReview"]!) {
      expect((aufruf as { clientEventId: string }).clientEventId).toMatch(UUID);
    }
  });

  it("blättert mit „Weiter“ und „Zurück“, ohne zu bewerten; „Zurück“ ist bei der ersten Karte gesperrt", () => {
    bereiteVor();
    zeige();
    const zurueck = screen.getByRole("button", { name: "← Zurück" }) as HTMLButtonElement;
    expect(zurueck.disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Weiter →" }));
    expect(screen.getByText("Vorderseite 2")).toBeTruthy();
    expect(zurueck.disabled).toBe(false);
    fireEvent.click(zurueck);
    expect(screen.getByText("Vorderseite 1")).toBeTruthy();
    expect(reg.mutationCalls["progress.submitReview"]).toBeUndefined();
  });

  it("markiert eine Karte als schwierig und zeigt den Zustand an", () => {
    bereiteVor([karte(1, { flaggedAsDifficult: true }), karte(2)]);
    zeige();
    const markierung = screen.getByRole("button", { name: /Schwierig/ });
    expect(markierung.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(markierung);
    expect(reg.mutationCalls["progress.toggleDifficultyFlag"]).toEqual([{ contentItemId: "karte-1" }]);
  });

  it("fragt mit dem Filter „Nur schwierige Karten“ neu an und meldet, wenn es keine gibt", () => {
    reg.queries["auth.me"] = { flashcardStartWithAnswer: false };
    reg.queries["content.dueCards"] = (eingabe: { onlyFlagged?: boolean }) => (eingabe.onlyFlagged ? [] : [karte(1)]);
    zeige();
    fireEvent.click(screen.getByRole("checkbox", { name: "Nur schwierige Karten" }));
    expect(reg.queryInputs["content.dueCards"]!.at(-1)).toMatchObject({ kursId: "kurs-1", themaId: "thema-1", onlyFlagged: true });
    expect(text()).toContain("Keine als schwierig markierten Karten.");
  });

  it("lädt am Rundenende auf Wunsch weitere Karten und beginnt wieder bei der ersten", async () => {
    bereiteVor([karte(1)]);
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");
    fireEvent.click(screen.getByRole("button", { name: "Weitere Karten laden" }));

    expect(await screen.findByText("Vorderseite 1")).toBeTruthy();
    expect(reg.refetch["content.dueCards"]).toHaveBeenCalledTimes(1);
  });

  it("beginnt die Runde mit „Von vorne beginnen“ erneut, ohne neu zu laden", () => {
    bereiteVor([karte(1)]);
    zeige();
    umdrehen("Vorderseite 1");
    bewerte("Einfach");
    fireEvent.click(screen.getByRole("button", { name: "Von vorne beginnen" }));
    expect(screen.getByText("Vorderseite 1")).toBeTruthy();
    expect(reg.refetch["content.dueCards"]).not.toHaveBeenCalled();
  });

  it("zeigt nach Abbruch bzw. Pause die passende Meldung und startet mit „Neue Runde starten“ neu", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Runde abbrechen" }));
    expect(text()).toContain("Runde abgebrochen — nichts wurde gewertet.");
    fireEvent.click(screen.getByRole("button", { name: "Neue Runde starten" }));
    expect(reg.refetch["content.dueCards"]).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Vorderseite 1")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Pause machen" }));
    expect(text()).toContain("Pause — deine bisherigen Antworten sind gespeichert.");
  });

  describe("offline (F-42)", () => {
    it("liest die Karten aus der lokalen Kopie, bewertet lokal und ruft den Server nicht an", async () => {
      testState.online = false;
      offline.loadOfflineDueCards.mockResolvedValue([karte(1), karte(2)]);
      offline.reviewOfflineCard.mockResolvedValue(undefined);
      reg.queries["auth.me"] = { flashcardStartWithAnswer: false };
      zeige();

      expect(await screen.findByText("Vorderseite 1")).toBeTruthy();
      expect(offline.loadOfflineDueCards).toHaveBeenCalledWith("kurs-1", "thema-1");
      umdrehen("Vorderseite 1");
      bewerte("Mittel");

      expect(offline.reviewOfflineCard).toHaveBeenCalledTimes(1);
      expect(offline.reviewOfflineCard.mock.calls[0]![1]).toBe("unsicher");
      expect(reg.mutationCalls["progress.submitReview"]).toBeUndefined();
      // Die bewertete Karte verschwindet aus der Liste, die nächste kommt.
      expect(await screen.findByText("Vorderseite 2")).toBeTruthy();
      expect(screen.queryByText("Vorderseite 1")).toBeNull();
    });

    it("lässt die Karte stehen, wenn das lokale Speichern fehlschlägt, damit sie erneut bewertet werden kann", async () => {
      testState.online = false;
      offline.loadOfflineDueCards.mockResolvedValue([karte(1)]);
      offline.reviewOfflineCard.mockRejectedValue(new Error("Kontingent überschritten"));
      reg.queries["auth.me"] = { flashcardStartWithAnswer: false };
      const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
      zeige();

      await screen.findByText("Vorderseite 1");
      umdrehen("Vorderseite 1");
      bewerte("Einfach");
      await vi.waitFor(() => expect(fehler).toHaveBeenCalled());
      expect(screen.getByText("Vorderseite 1")).toBeTruthy();
      fehler.mockRestore();
    });

    it("zeigt die Steuerung für Auswahl und Schwierig-Markierung offline nicht an", async () => {
      testState.online = false;
      offline.loadOfflineDueCards.mockResolvedValue([karte(1)]);
      reg.queries["auth.me"] = { flashcardStartWithAnswer: false };
      zeige();
      await screen.findByText("Vorderseite 1");
      expect(screen.queryByRole("checkbox", { name: "Nur schwierige Karten" })).toBeNull();
      expect(screen.queryByRole("button", { name: /Schwierig/ })).toBeNull();
    });
  });
});
