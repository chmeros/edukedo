import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Fachgespraechstrainer } from "./Fachgespraechstrainer";
import { registry as reg } from "./test/trpcRegistry";

const text = () => document.body.textContent ?? "";

const MIT = {
  id: "frage-1",
  frage: "Erläutern Sie das Hub-and-Spoke-Prinzip.",
  themaTitel: "1.1 Netzwerke",
  erwartung: ["Bündelung über zentrale Umschlagpunkte.", "Niedrigere Kosten je Sendung."],
  rueckfragen: ["Welche Faktoren bestimmen den Standort?"],
};
const OHNE = { id: "frage-2", frage: "Was ist eine Frage ohne Erwartungshorizont?", themaTitel: "1.2 Weiteres", erwartung: [], rueckfragen: [] };

describe("Fachgespraechstrainer: Antwort prüfen (Entscheidung 11.10.2026)", () => {
  beforeEach(() => {
    reg.queries["content.fachgespraechFragen"] = [MIT, OHNE];
  });

  it("zeigt vor dem Prüfen nur die Frage, keine Erwartungspunkte", () => {
    render(<Fachgespraechstrainer kursId="k1" />);
    expect(text()).toContain("Erläutern Sie das Hub-and-Spoke-Prinzip.");
    expect(text()).not.toContain("Bündelung über zentrale Umschlagpunkte.");
    expect(screen.queryByRole("button", { name: "Nächste Frage" })).toBeNull();
  });

  it("zeigt nach „Antwort prüfen“ den Erwartungshorizont zum Abhaken und die Rückfragen", () => {
    render(<Fachgespraechstrainer kursId="k1" />);
    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(text()).toContain("Das gehört in eine gute Antwort");
    expect(text()).toContain("Mögliche Rückfragen der Prüfenden");
    expect(text()).toContain("Welche Faktoren bestimmen den Standort?");
    expect(text()).toContain("0 von 2 Punkten genannt.");

    fireEvent.click(screen.getByRole("checkbox", { name: "Bündelung über zentrale Umschlagpunkte." }));
    expect(text()).toContain("1 von 2 Punkten genannt.");
    // Ein Klick schaltet wieder aus.
    fireEvent.click(screen.getByRole("checkbox", { name: "Bündelung über zentrale Umschlagpunkte." }));
    expect(text()).toContain("0 von 2 Punkten genannt.");
  });

  it("zeigt bei einer Frage ohne Erwartungshorizont das allgemeine Raster und keine Rückfragen", () => {
    render(<Fachgespraechstrainer kursId="k1" />);
    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    fireEvent.click(screen.getByRole("button", { name: "Nächste Frage" }));

    expect(text()).toContain("Was ist eine Frage ohne Erwartungshorizont?");
    expect(text()).not.toContain("Das gehört in eine gute Antwort");
    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(text()).toContain("Worauf die Prüfenden achten");
    expect(text()).toContain("Fachlichkeit");
    expect(text()).toContain("Struktur");
    expect(text()).toContain("Praxisbezug");
    expect(text()).not.toContain("Mögliche Rückfragen der Prüfenden");
    expect(screen.getByRole("button", { name: "Runde abschließen" })).toBeTruthy();
  });

  it("setzt Abhaken und Prüfstand bei der nächsten Frage zurück", () => {
    render(<Fachgespraechstrainer kursId="k1" />);
    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Niedrigere Kosten je Sendung." }));
    fireEvent.click(screen.getByRole("button", { name: "Nächste Frage" }));
    expect(screen.getByRole("button", { name: "Antwort prüfen" })).toBeTruthy();
    expect(text()).not.toContain("Punkten genannt");
  });

  it("kommt auch mit Antworten ohne die neuen Felder zurecht (älterer Serverstand)", () => {
    reg.queries["content.fachgespraechFragen"] = [{ id: "frage-3", frage: "Alte Frage?", themaTitel: "1.3" }];
    render(<Fachgespraechstrainer kursId="k1" />);
    fireEvent.click(screen.getByRole("button", { name: "Antwort prüfen" }));
    expect(text()).toContain("Worauf die Prüfenden achten");
  });
});
