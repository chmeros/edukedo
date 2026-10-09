import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { KursInhalte } from "./KursInhalte";

describe("KursInhalte, Lese-Modus (Review UXL-13)", () => {
  it("bietet bei jeder Aufgabe „Fehler melden“ an", () => {
    reg.queries["kursInhalt.uebersicht"] = [
      { id: "fg1", code: "FG1", title: "Fachgebiet", themen: [{ id: "t1", title: "Thema Eins", anzahl: 2 }] },
    ];
    reg.queries["kursInhalt.thema"] = {
      themaTitle: "Thema Eins",
      items: [
        { id: "i1", type: "karteikarte", prompt: "Was ist ein Netzplan?", text: null, loesung: ["Ein Plan"], erklaerung: null },
        { id: "i2", type: "theorie", prompt: "Theorie", text: "Text der Theorie", loesung: [], erklaerung: null },
      ],
    };
    render(<KursInhalte kursId="kurs-1" titel="Testkurs" onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Thema Eins/ }));

    expect(screen.getAllByRole("button", { name: "Fehler melden" })).toHaveLength(2);
  });
});
