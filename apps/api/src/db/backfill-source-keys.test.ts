import { describe, expect, it } from "vitest";
import { type BackfillExisting, matchItems } from "./backfill-source-keys";
import { buildDesiredItems } from "./content-desired";
import { computeContentHash, type DesiredItem } from "./content-sync-plan";

function desired(key: string, type: string, prompt: string): DesiredItem {
  return { key, type, prompt, explanation: null, difficulty: "mittel", bloom: null, payload: {}, options: [], tags: [], isActive: true };
}
function existing(id: string, type: string, prompt: string, sourceKey: string | null = null): BackfillExisting {
  return { id, sourceKey, state: desired(sourceKey ?? "", type, prompt) };
}

describe("matchItems", () => {
  it("ordnet über den exakten Prompt zu, unabhängig von der Reihenfolge", () => {
    const result = matchItems(
      [desired("K-1", "karteikarte", "A?"), desired("K-2", "karteikarte", "B?")],
      [existing("e2", "karteikarte", "B?"), existing("e1", "karteikarte", "A?")],
    );
    expect(result.pairs.map((pair) => [pair.desired.key, pair.existing.id, pair.how])).toEqual([
      ["K-1", "e1", "prompt"],
      ["K-2", "e2", "prompt"],
    ]);
    expect(result.unmatchedDesired).toEqual([]);
    expect(result.unmatchedExisting).toEqual([]);
  });

  it("ordnet doppelte Prompts in Anlagereihenfolge zu", () => {
    const result = matchItems(
      [desired("K-1", "karteikarte", "Gleich?"), desired("K-2", "karteikarte", "Gleich?")],
      [existing("e1", "karteikarte", "Gleich?"), existing("e2", "karteikarte", "Gleich?")],
    );
    expect(result.pairs.map((pair) => [pair.desired.key, pair.existing.id])).toEqual([
      ["K-1", "e1"],
      ["K-2", "e2"],
    ]);
  });

  it("unterscheidet gleiche Prompts verschiedener Typen", () => {
    const result = matchItems([desired("K-1", "karteikarte", "X"), desired("Q-1", "quiz_mc", "X")], [existing("e1", "quiz_mc", "X"), existing("e2", "karteikarte", "X")]);
    expect(result.pairs.map((pair) => [pair.desired.key, pair.existing.id])).toEqual([
      ["K-1", "e2"],
      ["Q-1", "e1"],
    ]);
  });

  it("fällt bei geändertem Prompt auf die Reihenfolge zurück, aber nur bei gleicher Anzahl je Typ", () => {
    const gleich = matchItems([desired("K-1", "karteikarte", "neu 1"), desired("K-2", "karteikarte", "neu 2")], [existing("e1", "karteikarte", "alt 1"), existing("e2", "karteikarte", "alt 2")]);
    expect(gleich.pairs.map((pair) => [pair.desired.key, pair.existing.id, pair.how])).toEqual([
      ["K-1", "e1", "reihenfolge"],
      ["K-2", "e2", "reihenfolge"],
    ]);

    const ungleich = matchItems([desired("K-1", "karteikarte", "neu 1"), desired("K-2", "karteikarte", "neu 2")], [existing("e1", "karteikarte", "alt 1")]);
    expect(ungleich.pairs).toEqual([]);
    expect(ungleich.unmatchedDesired).toHaveLength(2);
    expect(ungleich.unmatchedExisting).toHaveLength(1);
  });

  it("ordnet die Theorie auch bei geändertem Titel zu", () => {
    const result = matchItems([desired("theorie", "theorie", "Neuer Titel")], [existing("e1", "theorie", "Alter Titel")]);
    expect(result.pairs.map((pair) => [pair.existing.id, pair.how])).toEqual([["e1", "reihenfolge"]]);
  });

  it("erkennt schon zugeordnete Items über den Schlüssel (Wiederholung ist ein No-op) und fasst sie nicht neu an", () => {
    const result = matchItems(
      [desired("K-1", "karteikarte", "Anderer Text jetzt"), desired("K-2", "karteikarte", "B?")],
      [existing("e1", "karteikarte", "Alter Text", "K-1"), existing("e2", "karteikarte", "B?")],
    );
    expect(result.pairs.map((pair) => [pair.desired.key, pair.existing.id, pair.how])).toEqual([
      ["K-1", "e1", "schluessel"],
      ["K-2", "e2", "prompt"],
    ]);
  });

  it("meldet Items ohne Gegenstück auf beiden Seiten", () => {
    const result = matchItems([desired("K-1", "karteikarte", "A?"), desired("K-9", "karteikarte", "Neu?")], [existing("e1", "karteikarte", "A?"), existing("e7", "quiz_mc", "Verwaist")]);
    expect(result.unmatchedDesired.map((item) => item.key)).toEqual(["K-9"]);
    expect(result.unmatchedExisting.map((item) => item.id)).toEqual(["e7"]);
  });
});

const BODY = `
## Theorie

Theorietext.

## Karteikarten

#### K-1.1-01
**Frage:** Was ist A?
**Antwort:** B.
\`schwierigkeit: leicht\` · \`bloom: erinnern\` · \`tags: x, y\`

## Quiz

#### Q-1.1-01 · Multiple Choice
**Frage:** Welche Option stimmt?
- [x] Richtig
- [ ] Falsch
**Erklärung:** Weil.
\`schwierigkeit: schwer\` · \`bloom: verstehen\`

#### Q-1.1-02 · Zuordnung
**Anweisung:** Ordne zu.
- Links 1 ↔ Rechts 1
- Links 2 ↔ Rechts 2
**Erklärung:** Paare.
\`schwierigkeit: mittel\` · \`bloom: verstehen\`

#### Q-1.1-03 · Lückentext
**Text:** Die ___Antwort___ ist wichtig.
**Erklärung:** Lücke.
\`schwierigkeit: leicht\` · \`bloom: erinnern\`

#### Q-1.1-04 · Kurzantwort
**Frage:** Nenne den Begriff.
**Akzeptierte Antworten:** Begriff
**Erklärung:** Kurz.
\`schwierigkeit: leicht\` · \`bloom: erinnern\`

## Fallaufgaben

Einleitung.

#### F-1-01
**Ausgangssituation:** Situation.
**Teilaufgabe 1 (10 Punkte, bloom: anwenden):** Aufgabe.
**Musterlösungshinweise:** Lösung.

## Fachgesprächsfragen

### 1.1 Gruppe

- Erklären Sie A.
`;

describe("buildDesiredItems", () => {
  const items = buildDesiredItems({ kursSlug: "demo", themaTitle: "Thema", body: BODY });
  const byKey = (key: string) => items.find((item) => item.key === key)!;

  it("liefert alle Itemarten in Importreihenfolge mit den Standardwerten des Importers", () => {
    expect(items.map((item) => [item.key.startsWith("fg:") ? "fg" : item.key, item.type])).toEqual([
      ["theorie", "theorie"],
      ["K-1.1-01", "karteikarte"],
      ["Q-1.1-01", "quiz_mc"],
      ["Q-1.1-02", "zuordnung"],
      ["Q-1.1-03", "luecken"],
      ["Q-1.1-04", "kurzantwort"],
      ["F-1-01", "fallaufgabe"],
      ["fg", "fachgespraech_frage"],
    ]);
    expect(byKey("theorie")).toMatchObject({ prompt: "Thema", difficulty: "mittel", bloom: null, payload: { body_markdown: "Theorietext.", images: [] } });
    expect(items.at(-1)).toMatchObject({ explanation: null, difficulty: "mittel", bloom: null, payload: { themaTitel: "1.1 Gruppe" } });
  });

  it("übernimmt Optionen, Payloads, Tags und Einstufung", () => {
    expect(byKey("K-1.1-01")).toMatchObject({ tags: ["x", "y"], difficulty: "leicht", bloom: "erinnern" });
    expect(byKey("Q-1.1-01")).toMatchObject({
      difficulty: "schwer",
      bloom: "verstehen",
      options: [
        { text: "Richtig", isCorrect: true, groupKey: null, side: null, sortOrder: 0 },
        { text: "Falsch", isCorrect: false, groupKey: null, side: null, sortOrder: 1 },
      ],
    });
    expect(byKey("Q-1.1-02").options).toEqual([
      { text: "Links 1", isCorrect: false, groupKey: "0", side: "links", sortOrder: 0 },
      { text: "Rechts 1", isCorrect: false, groupKey: "0", side: "rechts", sortOrder: 0 },
      { text: "Links 2", isCorrect: false, groupKey: "1", side: "links", sortOrder: 1 },
      { text: "Rechts 2", isCorrect: false, groupKey: "1", side: "rechts", sortOrder: 1 },
    ]);
    expect(byKey("Q-1.1-03").payload).toEqual({ text_with_blanks: "Die ___ ist wichtig.", blanks: [{ id: "1", accepted: ["Antwort"] }] });
    expect(byKey("Q-1.1-04").payload).toEqual({ accepted_answers: ["Begriff"], match_mode: "exact" });
    expect(byKey("F-1-01")).toMatchObject({ bloom: null, payload: { parts: [{ prompt: "Aufgabe.", points: 10, bloom: "anwenden" }] } });
  });

  it("liefert für denselben Inhalt immer denselben Hash", () => {
    const again = buildDesiredItems({ kursSlug: "demo", themaTitle: "Thema", body: BODY });
    expect(again.map(computeContentHash)).toEqual(items.map(computeContentHash));
  });

  it("wirft bei einem Block ohne ID", () => {
    expect(() => buildDesiredItems({ kursSlug: "demo", themaTitle: "T", body: BODY.replace("#### K-1.1-01", "#### ") })).toThrow(/ohne ID/);
  });
});
