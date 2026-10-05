import { describe, expect, it } from "vitest";
import { kursPresentationMinutes, kursProjektStunden, kursWerkzeuge } from "./pruefungsbereiche";

describe("kursProjektStunden (F-161)", () => {
  it("liest die Stundenobergrenze aus metadata.projekt.stunden", () => {
    expect(kursProjektStunden({ projekt: { stunden: 80 } })).toBe(80);
    expect(kursProjektStunden({ projekt: { stunden: 40 } })).toBe(40);
  });

  it("ergibt null für Kurse ohne gültiges Projekt", () => {
    for (const metadata of [null, undefined, [], {}, { projekt: null }, { projekt: [] }, { projekt: {} }]) {
      expect(kursProjektStunden(metadata)).toBeNull();
    }
    for (const stunden of [0, -5, 12.5, "40", null]) {
      expect(kursProjektStunden({ projekt: { stunden } })).toBeNull();
    }
  });
});

describe("kursPresentationMinutes (F-150)", () => {
  it("nutzt den Kurswert oder den Standard von 10 Minuten", () => {
    expect(kursPresentationMinutes({ presentationMinutes: 15 })).toBe(15);
    expect(kursPresentationMinutes({})).toBe(10);
    expect(kursPresentationMinutes({ presentationMinutes: 0 })).toBe(10);
  });
});

describe("kursWerkzeuge (F-163)", () => {
  it("liest die freigeschalteten Übungswerkzeuge aus metadata.werkzeuge", () => {
    expect(kursWerkzeuge({ werkzeuge: ["netzplan"] })).toEqual(["netzplan"]);
  });

  it("ergibt eine leere Liste ohne gültige Angabe", () => {
    for (const metadata of [null, undefined, [], {}, { werkzeuge: "netzplan" }, { werkzeuge: [1] }, { werkzeuge: [""] }]) {
      expect(kursWerkzeuge(metadata)).toEqual([]);
    }
  });
});
