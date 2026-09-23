import { describe, expect, it } from "vitest";
import {
  extractBloom,
  extractSection,
  parseFachgespraechFragen,
  parseFallaufgabe,
  parseKarteikarten,
  parseQuizBlock,
  splitBlocks,
  splitFrontmatter,
} from "./content-parser";

const SAMPLE_FILE = `---
kurs_slug: fachwirt-buero-projektorganisation
fachgebiet_code: HB3
fachgebiet_title: "Führen, Betreuen, Verwalten und Ausbilden im büro- und personalwirtschaftlichen Umfeld"
thema_code: "3.1"
thema_title: "Personalplanung, -beschaffung, -betreuung und -entwicklung"
quelle: "DIHK-Rahmenplan „Geprüfter Fachwirt für Büro- und Projektorganisation", Abschnitt 3.1 — frei formuliert"
---

# Thema 3.1 — Personalplanung

## Theorie

### Personalplanung

Erster Absatz mit **fettem** Text.

### Personalbeschaffung

Zweiter Absatz.

## Karteikarten

#### K-3.1-01
**Frage:** Was ist Personalbedarf?
**Antwort:** Die benötigte Personalausstattung.
\`tags: personalplanung, agg\` · \`schwierigkeit: leicht\`

## Quiz

#### Q-3.1-01 · Multiple Choice
**Frage:** Welche Aussage trifft zu?
- [ ] Falsche Option
- [x] Richtige Option
- [ ] Noch eine falsche Option
**Erklärung:** Weil das so ist.
\`schwierigkeit: mittel\`

#### Q-3.1-02 · Zuordnung
**Anweisung:** Ordne zu.
- Begriff A ↔ Beschreibung A
- Begriff B ↔ Beschreibung B
**Erklärung:** Erklärung dazu.
\`schwierigkeit: leicht\`

#### Q-3.1-03 · Lückentext
**Text:** Die Differenz zwischen ___Bestand___ und ___Bedarf___ zeigt den Handlungsbedarf.
**Erklärung:** Grundformel.
\`schwierigkeit: leicht\`

#### Q-3.1-04 · Kurzantwort
**Frage:** Wie heißt das Gesetz?
**Akzeptierte Antworten:** Nachweisgesetz; NachwG
**Erklärung:** Regelt die Nachweispflicht.
\`schwierigkeit: mittel\`
`;

describe("splitFrontmatter", () => {
  it("parst die bekannten Frontmatter-Felder trotz verschachtelter Anführungszeichen in 'quelle'", () => {
    const { frontmatter } = splitFrontmatter(SAMPLE_FILE);
    expect(frontmatter.kurs_slug).toBe("fachwirt-buero-projektorganisation");
    expect(frontmatter.fachgebiet_code).toBe("HB3");
    expect(frontmatter.thema_code).toBe("3.1");
    expect(frontmatter.thema_title).toBe("Personalplanung, -beschaffung, -betreuung und -entwicklung");
  });

  it("ignoriert eine mehrzeilige YAML-Liste (z. B. qualifikationsinhalte, ab HB1/HB2/HB4) statt daran zu scheitern", () => {
    const withList = `---
kurs_slug: fachwirt-buero-projektorganisation
fachgebiet_code: HB1
thema_code: "1.1"
qualifikationsinhalte:
  - "1.1.1 Informationsfluss strukturieren"
  - "1.1.2 Art und Güte bewerten"
---

## Theorie

Text.
`;
    const { frontmatter } = splitFrontmatter(withList);
    // qualifikationsinhalte bleibt bewusst rein dokumentarisch im Frontmatter und wird nicht in
    // der Datenbank persistiert (siehe Architekturplanung Abschnitt 13) — der einfache
    // Zeilen-Parser liest hier nur den (leeren) Key, die Listenelemente werden ignoriert, ohne
    // die übrigen Felder zu stören.
    expect(frontmatter.kurs_slug).toBe("fachwirt-buero-projektorganisation");
    expect(frontmatter.thema_code).toBe("1.1");
  });
});

describe("extractSection", () => {
  it("extrahiert den Theorie-Abschnitt vollständig, nicht nur bis zur ersten Leerzeile", () => {
    const { body } = splitFrontmatter(SAMPLE_FILE);
    const theorie = extractSection(body, "Theorie");
    expect(theorie).toContain("Personalplanung");
    expect(theorie).toContain("Personalbeschaffung");
    expect(theorie).toContain("Zweiter Absatz.");
  });

  it("extrahiert Karteikarten- und Quiz-Abschnitt separat", () => {
    const { body } = splitFrontmatter(SAMPLE_FILE);
    const karteikarten = extractSection(body, "Karteikarten");
    const quiz = extractSection(body, "Quiz");
    expect(karteikarten).toContain("K-3.1-01");
    expect(karteikarten).not.toContain("Q-3.1-01");
    expect(quiz).toContain("Q-3.1-01");
    expect(quiz).not.toContain("K-3.1-01");
  });
});

describe("parseKarteikarten", () => {
  it("parst Frage, Antwort, Schwierigkeit und Tags; bloom fehlt bei HB3 (wie im Original) und wird null statt eines Defaults", () => {
    const { body } = splitFrontmatter(SAMPLE_FILE);
    const karteikarten = parseKarteikarten(extractSection(body, "Karteikarten")!);
    expect(karteikarten).toHaveLength(1);
    expect(karteikarten[0]).toEqual({
      prompt: "Was ist Personalbedarf?",
      explanation: "Die benötigte Personalausstattung.",
      difficulty: "leicht",
      bloom: null,
      tags: ["personalplanung", "agg"],
    });
  });

  it("parst das seit HB1/HB2/HB4 verbindliche bloom-Tag", () => {
    const block = [
      "#### K-1.1-01",
      "**Frage:** X",
      "**Antwort:** Y",
      "`tags: informationsfluss` · `schwierigkeit: leicht` · `bloom: erinnern`",
    ].join("\n");
    const [parsed] = parseKarteikarten(block);
    expect(parsed?.bloom).toBe("erinnern");
  });
});

describe("extractBloom", () => {
  it("erkennt alle sechs Stufen der Bloom'schen Taxonomie", () => {
    for (const stufe of ["erinnern", "verstehen", "anwenden", "analysieren", "bewerten", "erschaffen"] as const) {
      expect(extractBloom(`\`bloom: ${stufe}\``)).toBe(stufe);
    }
  });

  it("gibt null zurück, wenn kein bloom-Tag vorhanden ist (statt eines Default-Werts)", () => {
    expect(extractBloom("`schwierigkeit: mittel`")).toBeNull();
  });
});

describe("parseQuizBlock", () => {
  const { body } = splitFrontmatter(SAMPLE_FILE);
  const blocks = splitBlocks(extractSection(body, "Quiz")!);

  it("parst Multiple-Choice-Blöcke inkl. richtiger Option", () => {
    const parsed = parseQuizBlock(blocks[0]!);
    expect(parsed).toMatchObject({
      type: "quiz_mc",
      prompt: "Welche Aussage trifft zu?",
      difficulty: "mittel",
    });
    if (parsed?.type === "quiz_mc") {
      expect(parsed.options).toEqual([
        { text: "Falsche Option", isCorrect: false },
        { text: "Richtige Option", isCorrect: true },
        { text: "Noch eine falsche Option", isCorrect: false },
      ]);
    }
  });

  it("parst Zuordnungs-Blöcke als Paare", () => {
    const parsed = parseQuizBlock(blocks[1]!);
    expect(parsed).toMatchObject({ type: "zuordnung" });
    if (parsed?.type === "zuordnung") {
      expect(parsed.pairs).toEqual([
        { left: "Begriff A", right: "Beschreibung A" },
        { left: "Begriff B", right: "Beschreibung B" },
      ]);
    }
  });

  it("parst Lückentext-Blöcke mit mehreren Lücken und stabilen IDs", () => {
    const parsed = parseQuizBlock(blocks[2]!);
    expect(parsed).toMatchObject({ type: "luecken" });
    if (parsed?.type === "luecken") {
      expect(parsed.textWithBlanks).toBe("Die Differenz zwischen ___ und ___ zeigt den Handlungsbedarf.");
      expect(parsed.blanks).toEqual([
        { id: "1", accepted: ["Bestand"] },
        { id: "2", accepted: ["Bedarf"] },
      ]);
    }
  });

  it("parst Kurzantwort-Blöcke mit mehreren akzeptierten Antworten", () => {
    const parsed = parseQuizBlock(blocks[3]!);
    expect(parsed).toMatchObject({ type: "kurzantwort" });
    if (parsed?.type === "kurzantwort") {
      expect(parsed.acceptedAnswers).toEqual(["Nachweisgesetz", "NachwG"]);
    }
  });

  // F-113/F-114/F-115/F-116: die 10 neuen Fragetypen (Nutzer-Feedback vom 23.09.2026), bisher
  // nur über den Admin-Redaktionsbereich anlegbar — hier erstmals auch im Bulk-Import-Parser
  // (siehe content/README.md-Ergänzung für die Syntax).
  it("parst Wahr/Falsch-Blöcke mit dem Feldlabel 'Aussage' statt 'Frage'", () => {
    const block = [
      "#### Q-3.1-05 · Wahr/Falsch",
      "**Aussage:** Ein Projekt ist eine dauerhaft wiederkehrende Routineaufgabe.",
      "- [ ] Wahr",
      "- [x] Falsch",
      "**Erklärung:** Ein Projekt ist per Definition zeitlich begrenzt.",
      "`schwierigkeit: leicht` · `bloom: verstehen`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed).toMatchObject({ type: "wahr_falsch", prompt: "Ein Projekt ist eine dauerhaft wiederkehrende Routineaufgabe." });
    if (parsed?.type === "wahr_falsch") {
      expect(parsed.options).toEqual([
        { text: "Wahr", isCorrect: false },
        { text: "Falsch", isCorrect: true },
      ]);
    }
  });

  it("parst Entweder-Oder-Blöcke", () => {
    const block = [
      "#### Q-3.1-06 · Entweder-Oder",
      "**Frage:** Ist eine neue gesetzliche Regelung ein interner oder externer Einflussfaktor?",
      "- [ ] Intern",
      "- [x] Extern",
      "**Erklärung:** Gesetzliche Vorgaben entstehen außerhalb des Unternehmens.",
      "`schwierigkeit: mittel`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("entweder_oder");
    if (parsed?.type === "entweder_oder") {
      expect(parsed.options).toEqual([
        { text: "Intern", isCorrect: false },
        { text: "Extern", isCorrect: true },
      ]);
    }
  });

  it("parst 'Was passt nicht dazu'-Blöcke", () => {
    const block = [
      "#### Q-3.1-07 · Was passt nicht dazu",
      "**Frage:** Welcher Begriff gehört nicht zu den vier Perspektiven der Balanced Scorecard?",
      "- [ ] Finanzperspektive",
      "- [ ] Kundenperspektive",
      "- [x] Wettbewerbsperspektive",
      "- [ ] Prozessperspektive",
      "**Erklärung:** Die vierte Perspektive ist Lernen & Entwicklung, nicht Wettbewerb.",
      "`schwierigkeit: schwer`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("was_passt_nicht");
    if (parsed?.type === "was_passt_nicht") {
      expect(parsed.options.filter((option) => option.isCorrect)).toEqual([{ text: "Wettbewerbsperspektive", isCorrect: true }]);
    }
  });

  it("parst Mehrfachauswahl-Blöcke mit mehreren richtigen Optionen", () => {
    const block = [
      "#### Q-3.1-08 · Mehrfachauswahl",
      "**Frage:** Welche der folgenden Aussagen zum Projektmanagement sind richtig?",
      "- [x] Ein Projekt ist zeitlich begrenzt.",
      "- [x] Ein Projekt verfolgt ein definiertes Ziel.",
      "- [ ] Ein Projekt wiederholt sich routinemäßig.",
      "**Erklärung:** Zeitliche Begrenzung und ein definiertes Ziel sind Kernmerkmale.",
      "`schwierigkeit: mittel`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("quiz_mc_multi");
    if (parsed?.type === "quiz_mc_multi") {
      expect(parsed.options.filter((option) => option.isCorrect)).toHaveLength(2);
    }
  });

  it("parst Sortieren-Blöcke — die Eingabereihenfolge der nummerierten Liste ist die richtige Reihenfolge", () => {
    const block = [
      "#### Q-3.1-09 · Sortieren",
      "**Anweisung:** Bringe die Projektphasen in die richtige Reihenfolge.",
      "1. Initiierung",
      "2. Planung",
      "3. Durchführung",
      "4. Abschluss",
      "**Erklärung:** Klassischer Projektlebenszyklus.",
      "`schwierigkeit: leicht`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("sortieren");
    if (parsed?.type === "sortieren") {
      expect(parsed.items).toEqual([
        { text: "Initiierung" },
        { text: "Planung" },
        { text: "Durchführung" },
        { text: "Abschluss" },
      ]);
    }
  });

  it("parst SWOT-Matrix-Blöcke und bildet die deutschen Zonen-Beschriftungen auf die festen internen Zonen-Schlüssel ab", () => {
    const block = [
      "#### Q-2.2-01 · SWOT-Matrix",
      "**Anweisung:** Ordne die Begriffe den passenden Feldern der SWOT-Matrix zu.",
      "- Erfahrenes Team → Stärken",
      "- Hohe Fluktuation → Schwächen",
      "- Neuer Markt → Chancen",
      "- Neuer Wettbewerber → Risiken",
      "**Erklärung:** Interne Faktoren (Stärken/Schwächen) vs. externe Faktoren (Chancen/Risiken).",
      "`schwierigkeit: mittel` · `bloom: analysieren`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("swot");
    if (parsed?.type === "swot") {
      expect(parsed.terms).toEqual([
        { text: "Erfahrenes Team", zoneKey: "staerken" },
        { text: "Hohe Fluktuation", zoneKey: "schwaechen" },
        { text: "Neuer Markt", zoneKey: "chancen" },
        { text: "Neuer Wettbewerber", zoneKey: "risiken" },
      ]);
    }
  });

  it("wirft bei einer unbekannten Zonen-Beschriftung statt eine ungültige Zuordnung stillschweigend zu erzeugen", () => {
    const block = [
      "#### Q-2.2-02 · SWOT-Matrix",
      "**Anweisung:** ...",
      "- Begriff → Unbekannte Zone",
      "**Erklärung:** ...",
      "`schwierigkeit: mittel`",
    ].join("\n");
    expect(() => parseQuizBlock(block)).toThrow(/Unbekannte Zonen-Beschriftung/);
  });

  it("parst Balanced-Scorecard- und Ansoff-Matrix-Blöcke mit ihren jeweils eigenen Zonen", () => {
    const bscBlock = [
      "#### Q-4.1-01 · Balanced Scorecard",
      "**Anweisung:** Ordne die Kennzahlen den vier Perspektiven zu.",
      "- Umsatzwachstum → Finanzen",
      "- Kundenzufriedenheit → Kunden",
      "- Durchlaufzeit → Interne Prozesse",
      "- Weiterbildungsquote → Lernen & Entwicklung",
      "**Erklärung:** Die vier klassischen BSC-Perspektiven.",
      "`schwierigkeit: schwer`",
    ].join("\n");
    const bscParsed = parseQuizBlock(bscBlock);
    expect(bscParsed?.type).toBe("bsc");
    if (bscParsed?.type === "bsc") {
      expect(bscParsed.terms.map((term) => term.zoneKey)).toEqual(["finanzen", "kunden", "prozesse", "lernen_entwicklung"]);
    }

    const ansoffBlock = [
      "#### Q-2.2-03 · Ansoff-Matrix",
      "**Anweisung:** Ordne die Strategien den passenden Feldern zu.",
      "- Mehr Werbung für bestehendes Produkt im bestehenden Markt → Marktdurchdringung",
      "- Bestehendes Produkt in neuem Land → Marktentwicklung",
      "- Neue Produktvariante für bestehende Kundschaft → Produktentwicklung",
      "- Neues Produkt in neuem Markt → Diversifikation",
      "**Erklärung:** Die vier Ansoff-Wachstumsstrategien.",
      "`schwierigkeit: schwer`",
    ].join("\n");
    const ansoffParsed = parseQuizBlock(ansoffBlock);
    expect(ansoffParsed?.type).toBe("ansoff");
    if (ansoffParsed?.type === "ansoff") {
      expect(ansoffParsed.terms.map((term) => term.zoneKey)).toEqual([
        "marktdurchdringung",
        "marktentwicklung",
        "produktentwicklung",
        "diversifikation",
      ]);
    }
  });

  it("parst Gantt-Diagramm-Blöcke mit content-autorierten Zeitabschnitten (kein fester Zonen-Katalog)", () => {
    const block = [
      "#### Q-1.3-01 · Gantt-Diagramm",
      "**Anweisung:** Ordne die Arbeitspakete den passenden Zeitabschnitten zu.",
      "**Zeitabschnitte:** Planung; Entwicklung; Testphase; Markteinführung",
      "- Anforderungsanalyse → Planung",
      "- Prototyp erstellen → Entwicklung",
      "- Fehlerbehebung → Testphase",
      "- Rollout → Markteinführung",
      "**Erklärung:** Klassischer Produktentwicklungs-Zeitplan.",
      "`schwierigkeit: mittel` · `bloom: anwenden`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("gantt");
    if (parsed?.type === "gantt") {
      expect(parsed.periods).toEqual(["Planung", "Entwicklung", "Testphase", "Markteinführung"]);
      expect(parsed.terms).toEqual([
        { text: "Anforderungsanalyse", periodIndex: 0 },
        { text: "Prototyp erstellen", periodIndex: 1 },
        { text: "Fehlerbehebung", periodIndex: 2 },
        { text: "Rollout", periodIndex: 3 },
      ]);
    }
  });

  it("wirft bei einem unbekannten Zeitabschnitt statt eine ungültige Zuordnung stillschweigend zu erzeugen", () => {
    const block = [
      "#### Q-1.3-02 · Gantt-Diagramm",
      "**Anweisung:** ...",
      "**Zeitabschnitte:** Planung; Umsetzung",
      "- Begriff → Unbekannter Abschnitt",
      "**Erklärung:** ...",
      "`schwierigkeit: mittel`",
    ].join("\n");
    expect(() => parseQuizBlock(block)).toThrow(/Unbekannter Zeitabschnitt/);
  });

  it("parst Lückentext-mit-Wortauswahl-Blöcke inkl. zusätzlicher, nicht benötigter Begriffe", () => {
    const block = [
      "#### Q-1.1-01 · Lückentext (Wortauswahl)",
      "**Text:** Ein ___Projekt___ ist ein zeitlich begrenztes Vorhaben. Die Planung übernimmt die ___Projektleitung___.",
      "**Zusätzliche Begriffe:** Routineaufgabe; Umsatz; Hierarchie",
      "**Erklärung:** Grundbegriffe des Projektmanagements.",
      "`schwierigkeit: leicht` · `bloom: erinnern`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("luecken_auswahl");
    if (parsed?.type === "luecken_auswahl") {
      expect(parsed.blanks).toEqual([
        { id: "1", accepted: ["Projekt"] },
        { id: "2", accepted: ["Projektleitung"] },
      ]);
      expect(parsed.distractors).toEqual(["Routineaufgabe", "Umsatz", "Hierarchie"]);
    }
  });
});

describe("parseFallaufgabe (F-23)", () => {
  const FALLAUFGABEN_SECTION = `Einleitender Absatz vor dem ersten Block, kein eigener Aufgaben-Block.

---

#### F-HB3-01 · Fallaufgabe
**Ausgangssituation:** Ein Team klagt über unklare Zuständigkeiten.
**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie die Ursache.
**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Bewerten Sie zwei Lösungsansätze.
**Musterlösungshinweise:** Teilaufgabe 1 sollte auf fehlende Meldewege eingehen. Teilaufgabe 2 sollte Vor-/Nachteile abwägen.

---

#### U-ALG-01 · Übungsaufgabe
**Aufgabenstellung:** Ein Rechteck hat den Umfang 20 m.
**Teilaufgabe 1 (4 Punkte):** Stelle die Flächenfunktion auf.
**Teilaufgabe 2 (6 Punkte):** Bestimme das Maximum.
**Musterlösungshinweise:**
- T1: A(x) = ...
- T2: Maximum bei x = 5.
`;

  // "startsWith('#### ')"-Filter spiegelt die Verwendung in import-content.ts wider, wo der
  // führende Absatz vor dem ersten Aufgaben-Block genauso herausgefiltert wird.
  const blocks = splitBlocks(FALLAUFGABEN_SECTION).filter((block) => block.startsWith("#### "));

  it("parst eine einzeilige Musterlösungshinweise-Zeile mit bloom je Teilaufgabe (Fachwirt-Fallaufgabe)", () => {
    const parsed = parseFallaufgabe(blocks[0]!);
    expect(parsed.prompt).toBe("Ein Team klagt über unklare Zuständigkeiten.");
    expect(parsed.parts).toEqual([
      { points: 5, bloom: "analysieren", prompt: "Analysieren Sie die Ursache." },
      { points: 5, bloom: "bewerten", prompt: "Bewerten Sie zwei Lösungsansätze." },
    ]);
    expect(parsed.explanation).toBe(
      "Teilaufgabe 1 sollte auf fehlende Meldewege eingehen. Teilaufgabe 2 sollte Vor-/Nachteile abwägen.",
    );
  });

  it("parst eine mehrzeilige Musterlösungshinweise-Aufzählung ohne bloom je Teilaufgabe (Mathe-Übungsaufgabe)", () => {
    const parsed = parseFallaufgabe(blocks[1]!);
    expect(parsed.prompt).toBe("Ein Rechteck hat den Umfang 20 m.");
    expect(parsed.parts).toEqual([
      { points: 4, bloom: null, prompt: "Stelle die Flächenfunktion auf." },
      { points: 6, bloom: null, prompt: "Bestimme das Maximum." },
    ]);
    expect(parsed.explanation).toBe("- T1: A(x) = ...\n- T2: Maximum bei x = 5.");
  });

  it("filtert den einleitenden Absatz vor dem ersten Aufgaben-Block heraus", () => {
    expect(blocks).toHaveLength(2);
  });
});

describe("parseFachgespraechFragen (F-25)", () => {
  const FACHGESPRAECH_SECTION = `Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25).

### 3.1 Personalplanung, -beschaffung, -betreuung und -entwicklung

- Wie würden Sie vorgehen, um den Personalbedarf zu ermitteln?
- Welche Vor- und Nachteile sehen Sie bei interner vs. externer Personalbeschaffung?

### 3.2 Ausbildung planen, organisieren, durchführen und kontrollieren

- Welche gesetzlichen Grundlagen regeln die betriebliche Berufsausbildung?
`;

  it("gruppiert Fragen nach der jeweiligen Thema-Überschrift", () => {
    const fragen = parseFachgespraechFragen(FACHGESPRAECH_SECTION);
    expect(fragen).toEqual([
      {
        themaTitel: "3.1 Personalplanung, -beschaffung, -betreuung und -entwicklung",
        frage: "Wie würden Sie vorgehen, um den Personalbedarf zu ermitteln?",
      },
      {
        themaTitel: "3.1 Personalplanung, -beschaffung, -betreuung und -entwicklung",
        frage: "Welche Vor- und Nachteile sehen Sie bei interner vs. externer Personalbeschaffung?",
      },
      {
        themaTitel: "3.2 Ausbildung planen, organisieren, durchführen und kontrollieren",
        frage: "Welche gesetzlichen Grundlagen regeln die betriebliche Berufsausbildung?",
      },
    ]);
  });

  it("ignoriert den einleitenden Absatz vor der ersten Thema-Überschrift", () => {
    const fragen = parseFachgespraechFragen("Nur ein Einleitungssatz ohne jede Überschrift.");
    expect(fragen).toEqual([]);
  });
});
