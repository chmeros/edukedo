import { bugHuntPayloadSchema } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
import { bugHuntSchleifen } from "./content/game-bughunt-schleifen";
import { bugHuntSqlFehler } from "./content/game-bughunt-sql-fehler";

/**
 * Bug-Hunt-Zusatzsets für die Anwendungsentwicklung (setKey "schleifen", "objektorientierung", "sql-fehler"):
 * Qualitätsregeln für die Inhalte, geprüft ohne Datenbank. Die Ausschnitte selbst wurden zusätzlich
 * außerhalb dieses Tests mit den jeweiligen Compilern bzw. Interpretern gegengeprüft.
 */
const SETS = [
  { name: "schleifen", payload: bugHuntSchleifen, sprachen: ["Java", "Python", "JavaScript", "C#"] },
  { name: "objektorientierung", payload: bugHuntObjektorientierung, sprachen: ["Java", "Python", "JavaScript", "C#"] },
  { name: "sql-fehler", payload: bugHuntSqlFehler, sprachen: ["SQL"] },
];

describe.each(SETS)("Bug-Hunt-Set $name", ({ payload, sprachen }) => {
  const parsed = bugHuntPayloadSchema.parse(payload);

  it("besteht die Schema-Validierung und hat mindestens zehn Ausschnitte", () => {
    expect(bugHuntPayloadSchema.safeParse(payload).success).toBe(true);
    expect(parsed.aufgaben.length).toBeGreaterThanOrEqual(10);
  });

  it("nummeriert die Aufgaben lückenlos ab 1 mit eindeutigen Nummern und Titeln", () => {
    const nummern = parsed.aufgaben.map((aufgabe) => aufgabe.nummer);
    expect(new Set(nummern).size).toBe(nummern.length);
    expect(nummern).toEqual(nummern.map((_, index) => index + 1));
    const titel = parsed.aufgaben.map((aufgabe) => aufgabe.titel);
    expect(new Set(titel).size).toBe(titel.length);
  });

  it("verwendet nur die vorgesehenen Sprachen", () => {
    for (const aufgabe of parsed.aufgaben) {
      expect(sprachen).toContain(aufgabe.sprache);
    }
  });

  it("hat eine Fehlerzeile im Ausschnitt, die sich von der Korrektur unterscheidet", () => {
    for (const aufgabe of parsed.aufgaben) {
      expect(aufgabe.fehlerZeile).toBeGreaterThanOrEqual(1);
      expect(aufgabe.fehlerZeile).toBeLessThanOrEqual(aufgabe.zeilen.length);
      const fehlerhafteZeile = aufgabe.zeilen[aufgabe.fehlerZeile - 1]!;
      expect(aufgabe.korrektur, `Aufgabe ${aufgabe.nummer}`).not.toBe(fehlerhafteZeile);
    }
  });

  it("enthält keine leeren Codezeilen und keine Tabulatoren", () => {
    for (const aufgabe of parsed.aufgaben) {
      for (const zeile of aufgabe.zeilen) {
        expect(zeile.trim().length, `Aufgabe ${aufgabe.nummer}`).toBeGreaterThan(0);
        expect(zeile).not.toContain("\t");
      }
    }
  });

  it("verrät die Lösung nicht in Titel oder Aufgabenstellung (Korrektur kommt nicht wörtlich vor)", () => {
    for (const aufgabe of parsed.aufgaben) {
      const korrektur = aufgabe.korrektur.trim();
      if (korrektur.length < 20) continue; // sehr kurze Korrekturen kommen zufällig in normalen Sätzen vor
      expect(aufgabe.titel).not.toContain(korrektur);
      expect(aufgabe.aufgabe).not.toContain(korrektur);
      expect(aufgabe.tipp).not.toContain(korrektur);
    }
  });
});

describe("Bug-Hunt-Zusatzsets: Mischung der Sprachen", () => {
  it("verteilt die Programmiersprachen der ersten beiden Sets auf Java, Python, JavaScript und C#", () => {
    for (const payload of [bugHuntSchleifen, bugHuntObjektorientierung]) {
      const anzahl = (sprache: string) => payload.aufgaben.filter((aufgabe) => aufgabe.sprache === sprache).length;
      expect(anzahl("Java")).toBeGreaterThanOrEqual(2);
      expect(anzahl("Python")).toBeGreaterThanOrEqual(2);
      expect(anzahl("JavaScript")).toBeGreaterThanOrEqual(2);
      expect(anzahl("C#")).toBeGreaterThanOrEqual(1);
    }
  });
});
