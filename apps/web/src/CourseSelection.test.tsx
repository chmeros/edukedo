import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { CourseSelection } from "./CourseSelection";

const text = () => document.body.textContent ?? "";

const kurs = (id: string, title: string, kategorie: string, joined: boolean) => ({ id, title, kategorie, type: "kurs", joined });

function bereiteVor(kurse = [kurs("a", "Fachwirt Büro", "erwachsenenbildung", true), kurs("b", "Handelsfachwirt", "erwachsenenbildung", false), kurs("c", "Mathematik 9", "schule", false)]) {
  reg.queries["courses.list"] = kurse;
  reg.queries["courses.progress"] = [{ kursId: "a", total: 10, mastered: 4, percent: 40 }];
  reg.queries["auth.me"] = { isMinor: false };
  reg.queries["auth.publicConfig"] = { minorsAllowed: true };
  reg.mutations["courses.enroll"] = () => ({ success: true });
  reg.mutations["courses.leave"] = () => ({ success: true });
}

function zeige(zusatz: { canDismiss?: boolean; onSelected?: (id: string) => void } = {}) {
  const onSelected = zusatz.onSelected ?? vi.fn();
  render(<CourseSelection onSelected={onSelected} canDismiss={zusatz.canDismiss ?? true} onDismiss={() => {}} />);
  return onSelected;
}

describe("CourseSelection (F-100/F-101/F-102)", () => {
  it("zeigt belegte Kurse mit Fortschritt und wählt sie über „Auswählen“", () => {
    bereiteVor();
    const onSelected = zeige();
    expect(text()).toContain("Deine Kurse");
    expect(text()).toContain("40 % gelernt");
    fireEvent.click(screen.getByRole("button", { name: "Auswählen" }));
    expect(onSelected).toHaveBeenCalledWith("a");
  });

  it("verlangt in der Erstauswahl einen Kurs und bietet dort keinen Weg zurück", () => {
    bereiteVor([kurs("c", "Mathematik 9", "schule", false)]);
    zeige({ canDismiss: false });
    expect(text()).toContain("Wähle einen Lernbereich");
    expect(text()).toContain("Kurs beitreten");
    expect(screen.queryByRole("button", { name: "← Zurück" })).toBeNull();
  });

  it("tritt einem Kurs ohne Konflikt direkt bei und meldet ihn als ausgewählt", () => {
    bereiteVor();
    const onSelected = zeige();
    // Reihenfolge der Kacheln: Handelsfachwirt (Weiterbildung), Mathematik 9 (Schule). Schulkurse sind nicht exklusiv: kein Wechsel-Dialog.
    fireEvent.click(screen.getAllByRole("button", { name: "Beitreten" })[1]!);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(reg.mutationCalls["courses.enroll"]).toEqual([{ kursId: "c" }]);
    expect(onSelected).toHaveBeenCalledWith("c");
  });

  it("fragt beim Beitritt zu einem zweiten Weiterbildungskurs nach und verlässt erst nach „Wechseln“ den alten", () => {
    bereiteVor();
    const onSelected = zeige();
    const beitreten = screen.getAllByRole("button", { name: "Beitreten" });
    // Reihenfolge der Kacheln: Handelsfachwirt (Weiterbildung), Mathematik 9 (Schule).
    fireEvent.click(beitreten[0]!);

    expect(screen.getByRole("dialog", { name: "Kurs wechseln?" })).toBeTruthy();
    expect(text()).toContain("verlässt du Fachwirt Büro automatisch");
    expect(reg.mutationCalls["courses.enroll"]).toBeUndefined();

    fireEvent.click(screen.getByRole("button", { name: "Wechseln" }));
    expect(reg.mutationCalls["courses.enroll"]).toEqual([{ kursId: "b", leaveKursId: "a" }]);
    expect(onSelected).toHaveBeenCalledWith("b");
  });

  it("sagt im Wechsel-Dialog, was mit Kohorten passiert: Mitgliedschaften enden, geleitete bleiben (Review UXL-05)", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getAllByRole("button", { name: "Beitreten" })[0]!);
    expect(text()).toContain("Mitgliedschaften in Kohorten des verlassenen Kurses enden");
    expect(text()).toContain("Kohorten, die du leitest, bleiben bestehen");
  });

  it("bricht den Wechsel mit „Abbrechen“ ab, ohne zu beizutreten", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getAllByRole("button", { name: "Beitreten" })[0]!);
    fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(reg.mutationCalls["courses.enroll"]).toBeUndefined();
  });

  it("verlässt einen Kurs erst nach der Rückfrage", () => {
    bereiteVor();
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Verlassen" }));
    expect(reg.mutationCalls["courses.leave"]).toBeUndefined();
    expect(text()).toContain("Mitgliedschaften in Kohorten dieses Kurses gehen verloren");
    fireEvent.click(screen.getByRole("button", { name: "Ja, verlassen" }));
    expect(reg.mutationCalls["courses.leave"]).toEqual([{ kursId: "a" }]);
  });

  it("filtert nach Suchtext und Kategorie und meldet, wenn nichts passt", () => {
    bereiteVor();
    zeige();
    fireEvent.change(screen.getByPlaceholderText("Kurs suchen…"), { target: { value: "mathe" } });
    expect(text()).toContain("Mathematik 9");
    expect(text()).not.toContain("Handelsfachwirt");

    fireEvent.change(screen.getByPlaceholderText("Kurs suchen…"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Schule" }));
    expect(text()).toContain("Mathematik 9");
    expect(text()).not.toContain("Handelsfachwirt");

    fireEvent.change(screen.getByPlaceholderText("Kurs suchen…"), { target: { value: "xyz" } });
    expect(text()).toContain("Keine passenden Kurse gefunden.");
  });

  it("zeigt Minderjährigen, warum IHK-Kurse fehlen, und nennt bei gesperrtem Zugang den Vermerk am Schulkurs", () => {
    bereiteVor();
    reg.queries["auth.me"] = { isMinor: true };
    reg.queries["auth.publicConfig"] = { minorsAllowed: false };
    zeige();
    expect(text()).toContain("erst ab 18 Jahren freigeschaltet");
    expect(text()).toContain("aktuell nur für Volljährige zugänglich");
  });

  it("zeigt den Fehler eines fehlgeschlagenen Beitritts an der Kachel", async () => {
    bereiteVor();
    reg.mutations["courses.enroll"] = () => {
      throw new Error("Kurs nicht gefunden.");
    };
    zeige();
    fireEvent.click(screen.getAllByRole("button", { name: "Beitreten" })[1]!);
    expect(await screen.findByText("Kurs nicht gefunden.")).toBeTruthy();
  });
});
