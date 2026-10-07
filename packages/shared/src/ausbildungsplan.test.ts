import { describe, expect, it } from "vitest";
import {
  beispielAusbildungsplan,
  leererAusbildungsplan,
  leseWochen,
  monateInWochen,
  planAlsText,
  planSummen,
  probezeitEnde,
  pruefeAusbildungsplan,
  zeitleiste,
  type Ausbildungsplan,
} from "./ausbildungsplan";

function mitAbschnitten(abschnitte: [string, "betrieb" | "schule" | "sonstiges", string][], rest: Partial<Ausbildungsplan> = {}): Ausbildungsplan {
  return {
    beruf: "Musterberuf",
    dauerMonate: "12",
    probezeitMonate: "2",
    ...rest,
    abschnitte: abschnitte.map(([name, art, wochen], index) => ({ id: `t-${index}`, name, art, wochen, inhalte: "Inhalte" })),
  };
}

const bereiche = (plan: Ausbildungsplan) => pruefeAusbildungsplan(plan).map((hinweis) => `${hinweis.art}:${hinweis.bereich}`);

describe("Ausbildungsplan-Zeitplaner (W-AEV-04)", () => {
  it("Monate in Wochen mit 52 Wochen pro Jahr", () => {
    expect(monateInWochen(12)).toBe(52);
    expect(monateInWochen(36)).toBe(156);
    expect(monateInWochen(42)).toBe(182);
    expect(monateInWochen(4)).toBe(17);
  });

  it("liest nur ganze positive Wochenzahlen", () => {
    expect(leseWochen("6")).toBe(6);
    expect(leseWochen(" 12 ")).toBe(12);
    for (const ungueltig of ["", "0", "-3", "2,5", "1.5", "abc", "12345"]) expect(leseWochen(ungueltig), ungueltig).toBeNull();
  });

  it("Zeitleiste zählt fortlaufend und ordnet Ausbildungsjahre zu", () => {
    const plan = mitAbschnitten([
      ["A", "betrieb", "40"],
      ["B", "schule", "20"],
      ["C", "betrieb", "10"],
    ]);
    const zeilen = zeitleiste(plan);
    expect(zeilen.map((z) => [z.von, z.bis])).toEqual([
      [1, 40],
      [41, 60],
      [61, 70],
    ]);
    expect(zeilen.map((z) => [z.jahrVon, z.jahrBis])).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
  });

  it("Abschnitte ohne gültige Wochen fehlen in der Zeitleiste und werden gemeldet", () => {
    const plan = mitAbschnitten([
      ["A", "betrieb", "20"],
      ["B", "betrieb", ""],
      ["C", "schule", "30"],
    ]);
    expect(zeitleiste(plan).map((z) => z.nr)).toEqual([1, 3]);
    expect(zeitleiste(plan)[1]!.von).toBe(21);
    expect(pruefeAusbildungsplan(plan).some((h) => h.art === "fehlt" && h.bereich === "Abschnitt 2")).toBe(true);
  });

  it("Summen nach Art und gegen die Ausbildungsdauer", () => {
    const plan = mitAbschnitten([
      ["A", "betrieb", "30"],
      ["B", "schule", "10"],
      ["C", "sonstiges", "5"],
    ]);
    expect(planSummen(plan)).toEqual({ betrieb: 30, schule: 10, sonstiges: 5, gesamt: 45, verfuegbar: 52 });
    expect(pruefeAusbildungsplan(plan).find((h) => h.bereich === "Zeit")!.text).toContain("7 Wochen sind noch nicht verplant");
    const zuViel = mitAbschnitten([
      ["A", "betrieb", "50"],
      ["B", "schule", "10"],
    ]);
    expect(pruefeAusbildungsplan(zuViel).find((h) => h.bereich === "Zeit")!.text).toContain("8 Wochen zu viel");
  });

  it("Probezeit-Ende liegt in einem bestimmten Abschnitt", () => {
    const plan = mitAbschnitten(
      [
        ["A", "betrieb", "10"],
        ["B", "betrieb", "42"],
      ],
      { probezeitMonate: "4" },
    );
    expect(probezeitEnde(plan)).toEqual({ woche: 17, abschnittNr: 2 });
    expect(probezeitEnde({ ...plan, probezeitMonate: "" })).toBeNull();
    expect(probezeitEnde({ ...plan, probezeitMonate: "0" })).toBeNull();
  });

  it("Beispielplan ist vollständig und passt genau in die Ausbildungsdauer", () => {
    const plan = beispielAusbildungsplan();
    const s = planSummen(plan);
    expect(s.gesamt).toBe(156);
    expect(s.verfuegbar).toBe(156);
    expect(pruefeAusbildungsplan(plan)).toEqual([expect.objectContaining({ art: "ok" })]);
    expect(probezeitEnde(plan)!.abschnittNr).toBe(2);
  });

  it("leerer Plan meldet das Fehlende", () => {
    const hinweise = bereiche(leererAusbildungsplan());
    expect(hinweise).toContain("fehlt:Beruf");
    expect(hinweise).toContain("fehlt:Ausbildungsdauer");
    expect(hinweise).toContain("hinweis:Probezeit");
    expect(hinweise).toContain("fehlt:Abschnitt 1");
  });

  it("weitere Hinweise: Probezeit nicht kürzer als Ausbildung, fehlende Inhalte, kurzer Abschnitt, keine Berufsschule", () => {
    const plan = mitAbschnitten([["A", "betrieb", "1"]], { dauerMonate: "1", probezeitMonate: "3" });
    plan.abschnitte[0]!.inhalte = "";
    const hinweise = pruefeAusbildungsplan(plan);
    expect(hinweise.some((h) => h.bereich === "Probezeit" && h.text.includes("so lang wie die gesamte Ausbildung"))).toBe(true);
    expect(hinweise.some((h) => h.bereich === "Abschnitt 1" && h.text.includes("keine Ausbildungsinhalte"))).toBe(true);
    expect(hinweise.some((h) => h.bereich === "Abschnitt 1" && h.text.includes("kurzer Betriebsabschnitt"))).toBe(true);
    expect(hinweise.some((h) => h.bereich === "Berufsschule")).toBe(true);
  });

  it("nennt keine Rechtswerte zu Probezeit, Urlaub oder Berufsschule (Rahmenentscheidung R4)", () => {
    const text = JSON.stringify(pruefeAusbildungsplan(leererAusbildungsplan())) + planAlsText(beispielAusbildungsplan());
    expect(text).not.toMatch(/§|Höchstdauer|Mindestdauer|vier Monate|drei Monate|Werktage/);
  });

  it("Text enthält Kopf, Zeilen mit Wochen und Jahren, Inhalte und Summe", () => {
    const text = planAlsText(beispielAusbildungsplan());
    expect(text).toContain("Betrieblicher Ausbildungsplan (Entwurf)");
    expect(text).toContain("Ausbildungsdauer: 36 Monate (etwa 156 Wochen)");
    expect(text).toContain("Probezeit: 4 Monate (etwa 17 Wochen)");
    expect(text).toContain("1. Einführung und Betriebsorganisation [Betrieb] · 6 Wochen · Woche 1 bis 6 (1. Jahr)");
    expect(text).toContain("Inhalte: Wareneingang");
    expect(text).toContain("Summe: Betrieb 128 Wochen, Berufsschule 16 Wochen, Sonstiges 12 Wochen, gesamt 156 von etwa 156 Wochen.");
    expect(planAlsText(leererAusbildungsplan())).toContain("Beruf: –");
  });
});
