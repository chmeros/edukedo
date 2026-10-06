import { bugHuntPayloadSchema } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { bugHuntSkripteKonfiguration } from "./content/game-bughunt-skripte-konfiguration";

/**
 * Bug-Hunt-Set „Skripte und Konfigurationsdateien“ für die Systemintegration (setKey "skripte-konfiguration"):
 * Qualitätsregeln für die Inhalte, geprüft ohne Datenbank. Die Skripte wurden zusätzlich außerhalb dieses Tests
 * mit bash -n, dem PowerShell-Parser und Python (compile/Lauf der Fehler- und der Korrekturfassung) gegengeprüft.
 */
const ERLAUBTE_SPRACHEN = ["Bash", "PowerShell", "Python", "sshd_config", "nginx", "ufw"];

// Befehle, die bei einem versehentlichen Ausführen Schaden anrichten könnten: kommen weder im Ausschnitt noch in der Korrektur vor.
const VERBOTENE_MUSTER: { name: string; muster: RegExp }[] = [
  { name: "rm -rf / rm -r", muster: /\brm\s+-[a-z]*[rf]/i },
  { name: "dd if=", muster: /\bdd\s+if=/i },
  { name: "mkfs", muster: /\bmkfs/i },
  { name: "format ", muster: /\bformat\s/i },
  { name: "Format-Volume", muster: /Format-Volume/i },
  { name: "Remove-Item", muster: /Remove-Item/i },
  { name: "del / erase / rd / rmdir", muster: /\b(del|erase|rd|rmdir)\s+(\/|[a-z]:)/i },
  { name: "Löschen per shred/wipe/truncate", muster: /\b(shred|wipefs|truncate)\b/i },
  { name: "Schreiben auf Geräte", muster: />\s*\/dev\/(sd|nvme|hd|vd)/i },
];

describe("Bug-Hunt-Set skripte-konfiguration", () => {
  const parsed = bugHuntPayloadSchema.parse(bugHuntSkripteKonfiguration);
  const aufgaben = parsed.aufgaben;

  it("besteht die Schema-Validierung und hat genau zwölf Ausschnitte", () => {
    expect(bugHuntPayloadSchema.safeParse(bugHuntSkripteKonfiguration).success).toBe(true);
    expect(aufgaben.length).toBeGreaterThanOrEqual(12);
    expect(aufgaben).toHaveLength(12);
  });

  it("nummeriert die Aufgaben lückenlos ab 1 mit eindeutigen Nummern und Titeln", () => {
    const nummern = aufgaben.map((aufgabe) => aufgabe.nummer);
    expect(new Set(nummern).size).toBe(nummern.length);
    expect(nummern).toEqual(nummern.map((_, index) => index + 1));
    const titel = aufgaben.map((aufgabe) => aufgabe.titel);
    expect(new Set(titel).size).toBe(titel.length);
  });

  it("verwendet nur die vorgesehenen Sprachen in der vorgesehenen Mischung", () => {
    for (const aufgabe of aufgaben) {
      expect(ERLAUBTE_SPRACHEN, `Aufgabe ${aufgabe.nummer}`).toContain(aufgabe.sprache);
    }
    const anzahl = (sprache: string) => aufgaben.filter((aufgabe) => aufgabe.sprache === sprache).length;
    expect(anzahl("Bash")).toBe(4);
    expect(anzahl("PowerShell")).toBe(3);
    expect(anzahl("Python")).toBe(2);
    expect(anzahl("sshd_config") + anzahl("nginx") + anzahl("ufw")).toBe(3);
  });

  it("hat Ausschnitte mit fünf bis zwölf Zeilen", () => {
    for (const aufgabe of aufgaben) {
      expect(aufgabe.zeilen.length, `Aufgabe ${aufgabe.nummer}`).toBeGreaterThanOrEqual(5);
      expect(aufgabe.zeilen.length, `Aufgabe ${aufgabe.nummer}`).toBeLessThanOrEqual(12);
    }
  });

  it("hat eine Fehlerzeile im Ausschnitt, die sich von der Korrektur unterscheidet", () => {
    for (const aufgabe of aufgaben) {
      expect(aufgabe.fehlerZeile).toBeGreaterThanOrEqual(1);
      expect(aufgabe.fehlerZeile).toBeLessThanOrEqual(aufgabe.zeilen.length);
      const fehlerhafteZeile = aufgabe.zeilen[aufgabe.fehlerZeile - 1]!;
      expect(aufgabe.korrektur, `Aufgabe ${aufgabe.nummer}`).not.toBe(fehlerhafteZeile);
      // Die Korrektur steht sonst nirgends im Ausschnitt (sonst wäre sie schon vorhanden und die Zeile nicht eindeutig falsch).
      const andereZeilen = aufgabe.zeilen.filter((_, index) => index !== aufgabe.fehlerZeile - 1);
      expect(andereZeilen, `Aufgabe ${aufgabe.nummer}`).not.toContain(aufgabe.korrektur);
    }
  });

  it("enthält keine leeren Codezeilen, keine Tabulatoren und keine Zeilenenden mit Leerzeichen", () => {
    for (const aufgabe of aufgaben) {
      for (const zeile of [...aufgabe.zeilen, aufgabe.korrektur]) {
        expect(zeile.trim().length, `Aufgabe ${aufgabe.nummer}`).toBeGreaterThan(0);
        expect(zeile, `Aufgabe ${aufgabe.nummer}`).not.toContain("\t");
        expect(zeile, `Aufgabe ${aufgabe.nummer}`).not.toMatch(/\s$/);
      }
    }
  });

  it("enthält keine gefährlichen Befehle im Ausschnitt oder in der Korrektur", () => {
    for (const aufgabe of aufgaben) {
      for (const zeile of [...aufgabe.zeilen, aufgabe.korrektur]) {
        for (const { name, muster } of VERBOTENE_MUSTER) {
          expect(zeile, `Aufgabe ${aufgabe.nummer}: verbotenes Muster ${name}`).not.toMatch(muster);
        }
      }
    }
  });

  it("verwendet in Pfaden nur harmlose, erfundene Beispiele (keine Systemverzeichnisse zum Schreiben)", () => {
    for (const aufgabe of aufgaben) {
      for (const zeile of [...aufgabe.zeilen, aufgabe.korrektur]) {
        expect(zeile, `Aufgabe ${aufgabe.nummer}`).not.toMatch(/(\/etc\/|\/boot|\/dev\/sd|C:\\Windows)/i);
      }
    }
  });

  it("verrät die Lösung nicht in Titel, Aufgabenstellung oder Tipp (Korrektur kommt nicht wörtlich vor)", () => {
    for (const aufgabe of aufgaben) {
      const korrektur = aufgabe.korrektur.trim();
      if (korrektur.length < 20) continue; // sehr kurze Korrekturen kommen zufällig in normalen Sätzen vor
      expect(aufgabe.titel).not.toContain(korrektur);
      expect(aufgabe.aufgabe).not.toContain(korrektur);
      expect(aufgabe.tipp).not.toContain(korrektur);
    }
  });
});
