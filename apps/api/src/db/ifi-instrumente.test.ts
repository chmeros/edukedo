import { readFileSync } from "node:fs";
import path from "node:path";
import { KATALOG_INSTRUMENTE, KURS_ANGEBOT, KURS_ENTWURF, QUADRANT_MODELS } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { extractSection, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";

/**
 * F-221 (gemeinsame Instrumente der Fachinformatiker-Kurse, I-FI-04 bis I-FI-06): Die Fragen stehen als Zuordnungsfragen in den
 * Theoriedateien; dieser Test liest die echten Dateien und prüft Aufbau und Zonen.
 */
const CONTENT = path.resolve(__dirname, "../../../../content");

const FU6 = (kurs: string) => `${kurs}/fu6/6.1-it-sicherheit-bedrohungsszenarien.md`;
const DATEIEN: { datei: string; typ: string; anzahl: number }[] = [
  ...["fachinformatiker-anwendungsentwicklung", "fachinformatiker-daten-prozessanalyse", "fachinformatiker-digitale-vernetzung", "fachinformatiker-systemintegration"].flatMap((kurs) => [
    { datei: FU6(kurs), typ: "authfaktoren", anzahl: 3 },
    { datei: FU6(kurs), typ: "kryptobausteine", anzahl: 3 },
  ]),
  { datei: "fachinformatiker-systemintegration/si2/9.4-netzbetrieb-monitoring-verfuegbarkeit.md", typ: "monitoring", anzahl: 3 },
  { datei: "fachinformatiker-digitale-vernetzung/dv3/10.1-systemueberwachung-status-auslastung.md", typ: "monitoring", anzahl: 3 },
  { datei: "fachinformatiker-systemintegration/si1/8.2-server-virtualisierung-cloud.md", typ: "cloudmodelle", anzahl: 3 },
];

function zuordnungen(datei: string, typ: string) {
  const { body } = splitFrontmatter(readFileSync(path.join(CONTENT, datei), "utf8"));
  const quiz = extractSection(body, "Quiz") ?? "";
  return splitBlocks(quiz)
    .map((block) => ({ block, item: parseQuizBlock(block) }))
    .filter((eintrag) => eintrag.item?.type === typ);
}

describe("F-221: gemeinsame Instrumente der Fachinformatiker-Kurse", () => {
  it.each(DATEIEN)("$typ in $datei: drei Zuordnungsfragen mit sieben Aussagen, alle Zonen des Instruments kommen vor", ({ datei, typ, anzahl }) => {
    const fragen = zuordnungen(datei, typ);
    expect(fragen).toHaveLength(anzahl);
    const zonen = QUADRANT_MODELS[typ as keyof typeof QUADRANT_MODELS]!.zones.map((zone) => zone.key);
    for (const { item } of fragen) {
      if (!item || item.type !== typ) throw new Error("falscher Typ");
      const terms = (item as unknown as { terms: { zoneKey: string }[] }).terms;
      expect(terms).toHaveLength(7);
      expect([...new Set(terms.map((term) => term.zoneKey))].sort()).toEqual([...zonen].sort());
    }
    expect(fragen.map((eintrag) => eintrag.item?.difficulty)).toEqual(["leicht", "mittel", "schwer"]);
  });

  it("die vier Instrumente sind im Katalog und bis zur Freigabe nur als Entwurf geführt (nicht im Angebot)", () => {
    const neu = ["authfaktoren", "kryptobausteine", "monitoring", "cloudmodelle"];
    for (const typ of neu) expect(KATALOG_INSTRUMENTE as readonly string[]).toContain(typ);
    for (const [slug, typen] of Object.entries(KURS_ENTWURF)) {
      for (const typ of typen.filter((eintrag) => neu.includes(eintrag))) {
        expect(KURS_ANGEBOT[slug]!.instrumente.map((eintrag) => eintrag.schluessel), `${slug}/${typ}`).not.toContain(typ);
      }
    }
    expect(KURS_ENTWURF["fachinformatiker-systemintegration"]).toEqual(expect.arrayContaining(neu));
    expect(KURS_ENTWURF["fachinformatiker-digitale-vernetzung"]).toEqual(expect.arrayContaining(["authfaktoren", "kryptobausteine", "monitoring"]));
    expect(KURS_ENTWURF["fachinformatiker-anwendungsentwicklung"]).toEqual(["authfaktoren", "kryptobausteine"]);
  });

  it("keine Aussage der neuen Fragen enthält einen zweiten Pfeil oder eine leere Zone", () => {
    for (const { datei, typ } of DATEIEN) {
      for (const { block } of zuordnungen(datei, typ)) {
        const zeilen = block.split("\n").filter((zeile) => zeile.startsWith("- "));
        expect(zeilen).toHaveLength(7);
        for (const zeile of zeilen) expect(zeile.split(" → ")).toHaveLength(2);
      }
    }
  });
});
