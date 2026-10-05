import {
  lernpfadStationsnamen,
  LERNPFAD_STATIONSNAMEN_STANDARD,
  pruefeLernpfadPayload,
  pruefeStationsnamenVollstaendig,
  type InstrumentLernpfadPayload,
} from "@edukedo/shared";
import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { bscNordsternLernpfad } from "./content/instrument-lernpfad-bsc-nordstern";

/**
 * F-168: Qualitätsregeln für alle Instrumenten-Lernpfad-Inhalte unter `db/content/instrument-lernpfad-*.ts`
 * (Schema plus Struktur: eindeutige Texte, richtige Zählangaben, ausreichend große Pools, vollständige
 * Stationsnamen bei neuen Pfaden) sowie Negativtests der Prüffunktion selbst.
 */
const CONTENT_DIR = path.resolve(import.meta.dirname, "content");
const DATEIEN = readdirSync(CONTENT_DIR).filter((name) => /^instrument-lernpfad-.*\.ts$/.test(name)).sort();

function kopie(): InstrumentLernpfadPayload {
  return structuredClone(bscNordsternLernpfad);
}

describe("Lernpfad-Content (alle Dateien)", () => {
  it("gibt es den BSC-Pfad und die IT-Lernpfade", () => {
    expect(DATEIEN).toContain("instrument-lernpfad-bsc-nordstern.ts");
    expect(DATEIEN.length).toBeGreaterThanOrEqual(5);
  });

  for (const datei of DATEIEN) {
    it(`${datei}: besteht die Strukturprüfung`, async () => {
      const modul = (await import(/* @vite-ignore */ path.join(CONTENT_DIR, datei).replaceAll(path.sep, "/"))) as Record<string, unknown>;
      const payloads = Object.values(modul).filter((wert) => typeof wert === "object" && wert !== null && "grundlagenfragen" in wert);
      expect(payloads.length, "Lernpfad-Export").toBeGreaterThan(0);
      for (const payload of payloads) {
        expect(pruefeLernpfadPayload(payload)).toEqual([]);
        if (!/bsc/.test(datei)) expect(pruefeStationsnamenVollstaendig(payload)).toEqual([]);
      }
    });
  }
});

describe("pruefeLernpfadPayload", () => {
  it("akzeptiert den BSC-Pfad", () => {
    expect(pruefeLernpfadPayload(bscNordsternLernpfad)).toEqual([]);
  });

  it("meldet Schemaverstöße", () => {
    expect(pruefeLernpfadPayload({ organisation: "x" }).length).toBeGreaterThan(0);
  });

  it("meldet falsche Zählangaben, doppelte Texte und fehlenden Kontext", () => {
    const p = kopie();
    p.strukturErkennen.rounds[0]!.correctCount = 7;
    p.grundlagenfragen.questions[0]!.options[1]!.text = p.grundlagenfragen.questions[0]!.options[0]!.text;
    delete p.massnahmenWahl.rounds[0]!.context;
    const probleme = pruefeLernpfadPayload(p).join("\n");
    expect(probleme).toContain("strukturErkennen[0]: correctCount 7");
    expect(probleme).toContain("grundlagenfragen[0]: doppelte Option");
    expect(probleme).toContain("massnahmenWahl[0]: Kontext fehlt");
  });

  it("meldet unbekannte Zonen, zu kleine Pools und doppelte Sortiereinträge", () => {
    const p = kopie();
    p.zieleZuordnen.items[0]!.zoneKey = "gibt-es-nicht";
    p.messbareZieleZuordnen.pool = p.messbareZieleZuordnen.pool.filter((item) => item.zoneKey !== "finanzen").concat(
      p.messbareZieleZuordnen.pool.filter((item) => item.zoneKey === "finanzen").slice(0, 3),
    );
    p.wirkungsketten.tasks[0]!.items[1] = p.wirkungsketten.tasks[0]!.items[0]!;
    const probleme = pruefeLernpfadPayload(p).join("\n");
    expect(probleme).toContain("unbekannte Zone");
    expect(probleme).toContain('Zone "finanzen" hat 3 Begriffe');
    expect(probleme).toContain("wirkungsketten[0]: doppelter Eintrag");
  });
});

describe("Stationsnamen", () => {
  it("liefern ohne Angabe die Standardnamen und überschreiben nur gesetzte Felder", () => {
    expect(lernpfadStationsnamen(null)).toEqual(LERNPFAD_STATIONSNAMEN_STANDARD);
    expect(lernpfadStationsnamen({ zieleZuordnen: "Rollen zuordnen" })).toEqual({ ...LERNPFAD_STATIONSNAMEN_STANDARD, zieleZuordnen: "Rollen zuordnen" });
  });

  it("verlangen für neue Pfade alle sieben Namen", () => {
    expect(pruefeStationsnamenVollstaendig(bscNordsternLernpfad)).toHaveLength(7);
    const p = kopie();
    p.stationsnamen = { grundlagenfragen: "A", strukturErkennen: "B", zieleZuordnen: "C", messbareZieleZuordnen: "D", massnahmenWahl: "E", zusammenhaenge: "F", wirkungsketten: "G" };
    expect(pruefeStationsnamenVollstaendig(p)).toEqual([]);
  });
});
