import { describe, expect, it } from "vitest";
import { erstelleFachbegriffSucher, type FachbegriffEintrag } from "./fachbegriffe";

const EINTRAEGE: FachbegriffEintrag[] = [
  { id: "netzplan", term: "Netzplan", aliases: ["Netzplantechnik"] },
  { id: "kritischer-pfad", term: "Kritischer Pfad", aliases: ["kritischen Pfad", "kritischer Pfad"] },
  { id: "kriterium", term: "Kriterium", aliases: ["Kriterien"] },
  { id: "sql", term: "SQL", aliases: [] },
  { id: "primaerschluessel", term: "Primärschlüssel", aliases: ["PK"] },
  { id: "er", term: "ER-Modell", aliases: [] },
  { id: "modell", term: "Modell", aliases: [] },
];

const finde = erstelleFachbegriffSucher(EINTRAEGE);
const markiert = (text: string) => finde(text).filter((segment) => segment.eintragId !== null).map((segment) => [segment.text, segment.eintragId]);

describe("erstelleFachbegriffSucher", () => {
  it("findet Begriffe unabhängig von der Groß-/Kleinschreibung und teilt den Text verlustfrei", () => {
    const text = "Im netzplan steht der Kritische Pfad.";
    const segmente = finde(text);
    expect(segmente.map((segment) => segment.text).join("")).toBe(text);
    // "Kritische Pfad" ist keine Form von "Kritischer Pfad"/"kritischen Pfad" und bleibt unmarkiert.
    expect(markiert(text)).toEqual([["netzplan", "netzplan"]]);
  });

  it("erkennt einfache Endungen und Aliase für unregelmäßige Formen", () => {
    expect(markiert("Die Netzpläne")).toEqual([]);
    expect(markiert("Zwei Netzplans und ein Primärschlüssel")).toEqual([["Netzplans", "netzplan"], ["Primärschlüssel", "primaerschluessel"]]);
    expect(markiert("Alle Kriterien zählen")).toEqual([["Kriterien", "kriterium"]]);
    expect(markiert("auf dem kritischen Pfad")).toEqual([["kritischen Pfad", "kritischer-pfad"]]);
  });

  it("verlangt ganze Wörter: kein Treffer in Komposita oder Bindestrich-Verbindungen", () => {
    expect(markiert("Der Netzplantrainer und der Netzplan-Trainer")).toEqual([]);
    expect(markiert("Netzplantechnik")).toEqual([["Netzplantechnik", "netzplan"]]);
  });

  it("behandelt Akronyme exakt (Groß-/Kleinschreibung, keine Endung)", () => {
    expect(markiert("SQL ist eine Sprache")).toEqual([["SQL", "sql"]]);
    expect(markiert("sql und Sqls")).toEqual([]);
    expect(markiert("SQLs")).toEqual([]);
  });

  it("bevorzugt den längeren Begriff und markiert je Begriff nur das erste Vorkommen", () => {
    expect(markiert("Das ER-Modell ist ein Modell. Ein weiteres Modell.")).toEqual([["ER-Modell", "er"], ["Modell", "modell"]]);
    expect(markiert("Netzplan, noch ein Netzplan und der Netzplan")).toEqual([["Netzplan", "netzplan"]]);
  });

  it("erlaubt beliebige Leerzeichen in Mehrwortbegriffen und liefert ohne Treffer den ganzen Text", () => {
    expect(markiert("Der  kritischer   Pfad")).toEqual([["kritischer   Pfad", "kritischer-pfad"]]);
    expect(finde("Nichts Besonderes")).toEqual([{ text: "Nichts Besonderes", eintragId: null }]);
    expect(finde("")).toEqual([{ text: "", eintragId: null }]);
  });

  it("kommt mit leerem Glossar und Sonderzeichen in Begriffen zurecht", () => {
    expect(erstelleFachbegriffSucher([])("Text")).toEqual([{ text: "Text", eintragId: null }]);
    const sucher = erstelleFachbegriffSucher([{ id: "c", term: "C++", aliases: [] }]);
    expect(sucher("Ein C++ Programm").filter((segment) => segment.eintragId).length).toBe(1);
  });
});
