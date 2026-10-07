import { describe, expect, it } from "vitest";
import { beispielPlan, entwurfsText, leererPlan, pruefePlan, STUFEN, summeMinuten } from "./unterweisungsplan";

function bereiche(plan = beispielPlan()): string[] {
  return pruefePlan(plan).map((hinweis) => `${hinweis.art}:${hinweis.bereich}`);
}

describe("F-200: Unterweisungs-Planer", () => {
  it("das Beispiel ist vollständig und ohne Auffälligkeiten", () => {
    const hinweise = pruefePlan(beispielPlan());
    expect(hinweise.map((h) => h.art)).toEqual(["ok"]);
    expect(summeMinuten(beispielPlan())).toBe(14);
  });

  it("ein leerer Plan meldet alle fehlenden Teile", () => {
    const hinweise = pruefePlan(leererPlan());
    const fehlend = hinweise.filter((h) => h.art === "fehlt").map((h) => h.bereich);
    expect(fehlend).toEqual(expect.arrayContaining(["Thema", "Zielgruppe", "Feinziele", "Lernerfolgskontrolle", ...STUFEN.map((stufe) => stufe.label)]));
    expect(hinweise.some((h) => h.art === "ok")).toBe(false);
    // Jede Stufe meldet Ablauf UND Zeit
    expect(hinweise.filter((h) => h.bereich === STUFEN[0].label)).toHaveLength(2);
  });

  it("erkennt nicht überprüfbare Verben in Feinzielen", () => {
    const plan = beispielPlan();
    plan.feinziele[0] = { text: "Die Auszubildenden wissen, wie man eine Leitung fachgerecht abisoliert und anschließt.", bereich: "kognitiv" };
    const hinweise = pruefePlan(plan);
    expect(hinweise.find((h) => h.bereich === "Feinziel 1")?.text).toContain("„wissen“");
    plan.feinziele[0] = { text: "Die Auszubildenden verstehen die Funktion einer Reihenklemme im Schaltschrank genau.", bereich: "kognitiv" };
    expect(pruefePlan(plan).find((h) => h.bereich === "Feinziel 1")?.text).toContain("verstehen");
    // „erkennen“ ist kein Treffer für „kennen“
    plan.feinziele[0] = { text: "Die Auszubildenden benennen die drei Bauteile der Reihenklemme am Modell korrekt.", bereich: "kognitiv" };
    expect(pruefePlan(plan).filter((h) => h.bereich === "Feinziel 1")).toEqual([]);
  });

  it("meldet fehlendes Tätigkeitsverb, kurze Feinziele und fehlenden Lernzielbereich", () => {
    const plan = beispielPlan();
    plan.feinziele = [{ text: "Leitung und Klemme", bereich: "" }];
    const texte = pruefePlan(plan).filter((h) => h.bereich === "Feinziel 1").map((h) => h.text);
    expect(texte.some((t) => t.includes("kein überprüfbares Tätigkeitsverb"))).toBe(true);
    expect(texte.some((t) => t.includes("sehr kurz"))).toBe(true);
    expect(texte.some((t) => t.includes("Lernzielbereich"))).toBe(true);
  });

  it("rät bei ausschließlich kognitiven Zielen zu einer anderen Methode", () => {
    const plan = beispielPlan();
    plan.feinziele = [{ text: "Die Auszubildenden beschreiben die Funktion der Reihenklemme in eigenen Worten genau.", bereich: "kognitiv" }];
    expect(bereiche(plan)).toContain("hinweis:Methode");
    expect(bereiche()).not.toContain("hinweis:Methode");
  });

  it("prüft den Zeitplan gegen die verfügbare Zeit", () => {
    const plan = beispielPlan();
    plan.stufen.ueben.minuten = "9"; // 2+4+4+9 = 19 > 15
    expect(pruefePlan(plan).find((h) => h.bereich === "Zeit")?.text).toContain("19 Minuten");
    const kurz = beispielPlan();
    kurz.stufen.ueben.minuten = "1"; // 11 von 15: 4 Minuten ungeplant
    expect(pruefePlan(kurz).find((h) => h.bereich === "Zeit")?.text).toContain("4 Minuten");
    const kommazahl = beispielPlan();
    kommazahl.stufen.vorbereiten.minuten = "1,5";
    expect(summeMinuten(kommazahl)).toBe(13.5);
    const faustregel = beispielPlan();
    faustregel.stufen.vormachen.minuten = "8";
    faustregel.stufen.nachmachen.minuten = "2";
    faustregel.stufen.ueben.minuten = "2"; // 2+8+2+2 = 14, selbst 4 < vormachen 8
    expect(pruefePlan(faustregel).some((h) => h.bereich === "Zeit" && h.text.startsWith("Faustregel"))).toBe(true);
  });

  it("verlangt Lernerfolgskontrolle und weist auf fehlende Medien hin", () => {
    const plan = beispielPlan();
    plan.lernerfolgskontrolle = "  ";
    plan.medien = "";
    const b = bereiche(plan);
    expect(b).toContain("fehlt:Lernerfolgskontrolle");
    expect(b).toContain("hinweis:Medien");
  });

  it("warnt bei mehr als vier Feinzielen", () => {
    const plan = beispielPlan();
    plan.feinziele = Array.from({ length: 5 }, (_, i) => ({ text: `Die Auszubildenden führen Arbeitsschritt ${i + 1} sorgfältig und nach Vorgabe aus.`, bereich: "psychomotorisch" as const }));
    expect(bereiche(plan)).toContain("hinweis:Feinziele");
  });

  it("erzeugt ein Entwurfsblatt mit allen Teilen", () => {
    const text = entwurfsText(beispielPlan());
    expect(text).toContain("UNTERWEISUNGSENTWURF");
    expect(text).toContain("Thema: Eine Leitung abisolieren");
    expect(text).toContain("Feinziel 1 (psychomotorisch):");
    expect(text).toContain("Feinziel 2 (kognitiv):");
    expect(text).toContain("ZEITPLAN (verfügbar: 15 Minuten, geplant: 14 Minuten)");
    for (const stufe of STUFEN) expect(text).toContain(stufe.label);
    expect(text).toContain("Lernerfolgskontrolle:");
    expect(entwurfsText(leererPlan())).toContain("Thema: –");
  });
});
