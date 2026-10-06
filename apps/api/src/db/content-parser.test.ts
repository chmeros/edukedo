import { describe, expect, it } from "vitest";
import {
  extractBloom,
  extractSection,
  parseFachgespraechFragen,
  parseFallaufgabe,
  parseGlossar,
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

  it("parst die IT-Instrumente (F-156) über die Zonen-Beschriftungen aus QUADRANT_MODELS, auch bei 3 und 7 Zonen", () => {
    const scrum = parseQuizBlock(
      [
        "#### Q-1.1-16 · Scrum",
        "**Anweisung:** Ordne zu.",
        "- Product Owner → Rollen",
        "- Daily Scrum → Events",
        "- Product Backlog → Artefakte",
        "- Increment → Artefakte",
        "**Erklärung:** ...",
        "`schwierigkeit: leicht`",
      ].join("\n"),
    );
    expect(scrum?.type).toBe("scrum");
    if (scrum?.type === "scrum") {
      expect(scrum.terms.map((term) => term.zoneKey)).toEqual(["rollen", "events", "artefakte", "artefakte"]);
    }

    const osi = parseQuizBlock(
      [
        "#### Q-3.1-14 · OSI-Modell",
        "**Anweisung:** Ordne zu.",
        "- HTTP-Anfrage → Anwendung",
        "- Elektrische Signale → Bitübertragung",
        "- IP-Routing → Vermittlung",
        "- Ports → Transport",
        "**Erklärung:** ...",
        "`schwierigkeit: leicht`",
      ].join("\n"),
    );
    expect(osi?.type).toBe("osi");
    if (osi?.type === "osi") {
      expect(osi.terms.map((term) => term.zoneKey)).toEqual(["anwendung", "bituebertragung", "vermittlung", "transport"]);
    }

    const unbekannt = [
      "#### Q-3.1-15 · OSI-Modell",
      "**Anweisung:** ...",
      "- Begriff → Schicht 9",
      "**Erklärung:** ...",
      "`schwierigkeit: leicht`",
    ].join("\n");
    expect(() => parseQuizBlock(unbekannt)).toThrow(/Unbekannte Zonen-Beschriftung/);
  });

  it("parst die weiteren IT-Instrumente (F-162): ER-Modell, Normalformen mit Ziffern in der Zonen-Beschriftung, Ablaufstrukturen", () => {
    const er = parseQuizBlock(
      [
        "#### Q-5.1-14 · ER-Modell",
        "**Anweisung:** Ordne zu.",
        "- Kunde → Entitätstyp",
        "- Budget → Attribut",
        "- beauftragt → Beziehung",
        "- 1:n → Kardinalität",
        "**Erklärung:** ...",
        "`schwierigkeit: leicht`",
      ].join("\n"),
    );
    expect(er?.type).toBe("ermodell");
    if (er?.type === "ermodell") {
      expect(er.terms.map((term) => term.zoneKey)).toEqual(["entitaetstyp", "attribut", "beziehung", "kardinalitaet"]);
    }

    const nf = parseQuizBlock(
      [
        "#### Q-5.1-17 · Normalformen",
        "**Anweisung:** Ordne zu.",
        "- Jede Zelle enthält nur atomare Werte → 1. Normalform",
        "- Partielle Abhängigkeiten werden beseitigt → 2. Normalform",
        "- Transitive Abhängigkeiten werden ausgelagert → 3. Normalform",
        "- Wiederholungsgruppen werden aufgelöst → 1. Normalform",
        "**Erklärung:** ...",
        "`schwierigkeit: leicht`",
      ].join("\n"),
    );
    expect(nf?.type).toBe("normalisierung");
    if (nf?.type === "normalisierung") {
      expect(nf.terms.map((term) => term.zoneKey)).toEqual(["nf1", "nf2", "nf3", "nf1"]);
    }

    const ablauf = parseQuizBlock(
      [
        "#### Q-4.2-14 · Ablaufstrukturen",
        "**Anweisung:** Ordne zu.",
        "- Anweisungen stehen übereinander → Sequenz",
        "- Zweigeteilter Block mit ja und nein → Verzweigung",
        "- Eingerückter, wiederholter Rumpf → Schleife",
        "- WENN … DANN … SONST → Verzweigung",
        "**Erklärung:** ...",
        "`schwierigkeit: leicht`",
      ].join("\n"),
    );
    expect(ablauf?.type).toBe("ablauf");
    if (ablauf?.type === "ablauf") {
      expect(ablauf.terms.map((term) => term.zoneKey)).toEqual(["sequenz", "verzweigung", "schleife", "verzweigung"]);
    }
  });

  it("parst die Modelle aus F-176 (Muster, Klassenbeziehungen, Testverfahren, Git) und die fünfte UML-Zone", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-1.1-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const muster = parse("Entwurfs- und Architekturmuster", ["- Genau eine Instanz → Singleton", "- Oberfläche, Logik, Daten trennen → MVC", "- Änderungen an alle melden → Beobachter (Observer)", "- Unterklasse erzeugt das Objekt → Fabrikmethode (Factory)"]);
    expect(muster?.type).toBe("muster");
    if (muster?.type === "muster") expect(muster.terms.map((term) => term.zoneKey)).toEqual(["singleton", "mvc", "beobachter", "fabrikmethode"]);

    const beziehungen = parse("UML-Klassenbeziehungen", ["- Raum und Gebäude → Komposition", "- Kunde kennt Auftrag → Assoziation", "- Unterklasse erbt → Vererbung (Generalisierung)", "- Parameter einer Methode → Abhängigkeit", "- Team und Mitarbeitende → Aggregation"]);
    expect(beziehungen?.type).toBe("klassenbeziehungen");
    if (beziehungen?.type === "klassenbeziehungen") expect(beziehungen.terms.map((term) => term.zoneKey)).toEqual(["komposition", "assoziation", "vererbung", "abhaengigkeit", "aggregation"]);

    const testverfahren = parse("Testverfahren", ["- Review → Statische Verfahren", "- Grenzwertanalyse → Dynamisch: Black-Box", "- Zweigüberdeckung → Dynamisch: White-Box", "- Schreibtischtest → Statische Verfahren"]);
    expect(testverfahren?.type).toBe("testverfahren");
    if (testverfahren?.type === "testverfahren") expect(testverfahren.terms.map((term) => term.zoneKey)).toEqual(["statisch", "blackbox", "whitebox", "statisch"]);

    const git = parse("Git-Bereiche", ["- git add → Staging-Bereich (Index)", "- Datei geändert, nicht vorgemerkt → Arbeitsverzeichnis", "- git commit → Lokales Repository", "- git push → Remote-Repository"]);
    expect(git?.type).toBe("git");
    if (git?.type === "git") expect(git.terms.map((term) => term.zoneKey)).toEqual(["staging", "arbeitsverzeichnis", "lokal", "remote"]);

    const uml = parse("UML-Diagramme", ["- Zustände einer Bestellung → Zustandsdiagramm", "- Klassen und Attribute → Klassendiagramm", "- Nachrichten über die Zeit → Sequenzdiagramm", "- Ablauf mit Verzweigung → Aktivitätsdiagramm"]);
    expect(uml?.type).toBe("uml");
    if (uml?.type === "uml") expect(uml.terms[0]?.zoneKey).toBe("zustand");
  });

  it("parst die Modelle aus F-178 (BPMN, Analysewerkzeuge, Datenqualität, Skalenniveaus)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-8.2-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const bpmn = parse("BPMN-2.0-Bausteine", ["- Entscheidung: Rechnung über 5 000 €? → Gateway", "- Nachricht an Lieferanten → Fluss (Sequenz-/Nachrichtenfluss)", "- Verantwortungsbereich Buchhaltung → Teilnehmer (Pool/Lane)", "- Rechnung prüfen → Aktivität", "- Rechnung ist eingegangen → Ereignis"]);
    expect(bpmn?.type).toBe("bpmn");
    if (bpmn?.type === "bpmn") expect(bpmn.terms.map((term) => term.zoneKey)).toEqual(["gateway", "fluss", "teilnehmer", "aktivitaet", "ereignis"]);

    const analyse = parse("Analysewerkzeuge der Prozessanalyse", ["- Welche 20 % der Ursachen verursachen 80 % der Fehler? → Pareto-Analyse", "- Ablauf aus Ereignisprotokollen rekonstruieren → Process Mining", "- Warum tritt der Fehler immer wieder auf? → Ursachenanalyse (Ishikawa/5-Why)", "- Wo staut sich die Arbeit? → Engpassanalyse"]);
    expect(analyse?.type).toBe("analysewerkzeuge");
    if (analyse?.type === "analysewerkzeuge") expect(analyse.terms.map((term) => term.zoneKey)).toEqual(["pareto", "processmining", "ursachen", "engpass"]);

    const dq = parse("Datenqualitäts-Dimensionen", ["- 12 % der Geburtsdaten fehlen → Vollständigkeit", "- Lieferung vor Bestellung → Plausibilität", "- Kundin doppelt angelegt → Redundanz", "- PLZ mit vier Ziffern → Validität", "- nur 40 Datensätze → Quantität"]);
    expect(dq?.type).toBe("datenqualitaet");
    if (dq?.type === "datenqualitaet") expect(dq.terms.map((term) => term.zoneKey)).toEqual(["vollstaendigkeit", "plausibilitaet", "redundanz", "validitaet", "quantitaet"]);

    const skala = parse("Skalenniveaus", ["- Postleitzahl → Nominal", "- Schulnote → Ordinal", "- Temperatur in °C → Intervall", "- Umsatz in € → Verhältnis"]);
    expect(skala?.type).toBe("skalenniveaus");
    if (skala?.type === "skalenniveaus") expect(skala.terms.map((term) => term.zoneKey)).toEqual(["nominal", "ordinal", "intervall", "verhaeltnis"]);
  });

  it("parst die Modelle aus F-179 (Pyramide, Sensor/Aktor, Industrieprotokolle, Zonenkonzept)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-8.2-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const pyramide = parse("Automatisierungspyramide", ["- Temperatursensor → Feldebene", "- SPS → Steuerungsebene", "- Leitstand → Prozessleitebene (SCADA/HMI)", "- Fertigungssteuerung → Betriebsleitebene (MES)", "- Auftragsabwicklung → Unternehmensebene (ERP)"]);
    expect(pyramide?.type).toBe("pyramide");
    if (pyramide?.type === "pyramide") expect(pyramide.terms.map((term) => term.zoneKey)).toEqual(["feld", "steuerung", "prozessleit", "betriebsleit", "unternehmen"]);

    const sak = parse("Sensor, Steuerung, Aktor, Kommunikation", ["- Lichtschranke → Sensor", "- Mikrocontroller → Steuerung/Verarbeitung", "- Stellmotor → Aktor", "- Gateway → Kommunikation/Gateway"]);
    expect(sak?.type).toBe("sensoraktor");
    if (sak?.type === "sensoraktor") expect(sak.terms.map((term) => term.zoneKey)).toEqual(["sensor", "steuerung", "aktor", "kommunikation"]);

    const protokolle = parse("Industrie- und IoT-Protokolle", ["- Publish/Subscribe über einen Broker → MQTT", "- Informationsmodell mit eingebauter Sicherheit → OPC UA", "- einfaches Register-Protokoll → Modbus", "- zyklischer, echtzeitfähiger Datenaustausch → Feldbus/Industrial Ethernet"]);
    expect(protokolle?.type).toBe("industrieprotokolle");
    if (protokolle?.type === "industrieprotokolle") expect(protokolle.terms.map((term) => term.zoneKey)).toEqual(["mqtt", "opcua", "modbus", "feldbus"]);

    const zonen = parse("Zonenkonzept IT/OT", ["- Mailserver → Büro-IT", "- Historian als Datenbroker → DMZ (Übergang)", "- SCADA-Server → Produktionsnetz (Leitebene)", "- SPS → Zelle/Feldebene"]);
    expect(zonen?.type).toBe("zonenkonzept");
    if (zonen?.type === "zonenkonzept") expect(zonen.terms.map((term) => term.zoneKey)).toEqual(["bueroit", "dmz", "produktion", "zelle"]);
  });

  it("parst die Modelle aus F-180 (Sicherungsarten, RAID, Netzsicherheit, Verzeichnisdienst, Switching)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-10.3-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const sicherung = parse("Sicherungsarten", ["- Alle Daten werden kopiert → Vollsicherung", "- Nur Änderungen seit der letzten Sicherung → Inkrementelle Sicherung", "- Änderungen seit der letzten Vollsicherung → Differentielle Sicherung"]);
    expect(sicherung?.type).toBe("sicherungsarten");
    if (sicherung?.type === "sicherungsarten") expect(sicherung.terms.map((term) => term.zoneKey)).toEqual(["voll", "inkrementell", "differentiell"]);

    const raid = parse("RAID-Level", ["- Striping ohne Ausfallschutz → RAID 0", "- Spiegelung → RAID 1", "- Parität über alle Platten → RAID 5", "- zwei Paritätsblöcke → RAID 6", "- gespiegelte Stripes → RAID 10"]);
    expect(raid?.type).toBe("raid");
    if (raid?.type === "raid") expect(raid.terms.map((term) => term.zoneKey)).toEqual(["raid0", "raid1", "raid5", "raid6", "raid10"]);

    const netz = parse("Netzwerksicherheits-Bausteine", ["- filtert Verkehr nach Regeln → Firewall", "- tauscht private gegen öffentliche Adressen → NAT", "- verschlüsselter Zugang von außen → VPN", "- Server aus dem Internet erreichbar, Intranet geschützt → DMZ/Segmentierung", "- nur freigegebene Geräte am Switchport → Zugangskontrolle am Netzrand (802.1X/Port-Security)"]);
    expect(netz?.type).toBe("netzsicherheit");
    if (netz?.type === "netzsicherheit") expect(netz.terms.map((term) => term.zoneKey)).toEqual(["firewall", "nat", "vpn", "dmz", "zugangskontrolle"]);

    const verz = parse("Verzeichnisdienst und Berechtigungen", ["- eigene Anmeldung → Benutzerkonto", "- Vertrieb erhält Zugriff → Gruppe", "- Verwaltung der Filiale delegieren → Organisationseinheit (OU)", "- Passwortregeln zentral erzwingen → Gruppenrichtlinie (GPO)", "- wer darf den Ordner lesen → Berechtigung (ACL)"]);
    expect(verz?.type).toBe("verzeichnisdienst");
    if (verz?.type === "verzeichnisdienst") expect(verz.terms.map((term) => term.zoneKey)).toEqual(["konto", "gruppe", "ou", "gpo", "acl"]);

    const sw = parse("Switching, VLAN, Routing und Redundanz", ["- Frames nach MAC-Tabelle weiterleiten → Switching (Layer 2)", "- Broadcast-Domäne verkleinern → VLAN/Trunking", "- Pakete in ein anderes Netz weiterleiten → Routing (Layer 3)", "- Schleife im Layer-2-Netz verhindern → Redundanz (Spanning Tree)"]);
    expect(sw?.type).toBe("switching");
    if (sw?.type === "switching") expect(sw.terms.map((term) => term.zoneKey)).toEqual(["switching", "vlan", "routing", "redundanz"]);
  });

  it("parst die Modelle aus F-181 (Handlungsfelder, Vier-Stufen-Methode, Lernzielbereiche, Beurteilungsfehler, Regelwerke)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-3.2-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const hf = parse("Handlungsfelder der AEVO", ["- Eignung des Betriebs prüfen → HF 1: Voraussetzungen prüfen, Ausbildung planen", "- Bewerbende auswählen → HF 2: Ausbildung vorbereiten, Einstellung", "- Lernaufgaben einsetzen → HF 3: Ausbildung durchführen", "- Zeugnis erstellen → HF 4: Ausbildung abschließen"]);
    expect(hf?.type).toBe("handlungsfelder");
    if (hf?.type === "handlungsfelder") expect(hf.terms.map((term) => term.zoneKey)).toEqual(["hf1", "hf2", "hf3", "hf4"]);

    const stufen = parse("Vier-Stufen-Methode", ["- Arbeitsplatz bereitlegen → Stufe 1: Vorbereiten, Vormachen und Erklären", "- Azubi führt den Handgriff selbst aus → Stufe 2: Nachmachen lassen", "- Wiederholen mit steigender Geschwindigkeit → Stufe 3: Üben lassen", "- Auftrag eigenverantwortlich erledigen → Stufe 4: Selbstständig durchführen lassen"]);
    expect(stufen?.type).toBe("vierstufen");
    if (stufen?.type === "vierstufen") expect(stufen.terms.map((term) => term.zoneKey)).toEqual(["stufe1", "stufe2", "stufe3", "stufe4"]);

    const lernziele = parse("Lernzielbereiche", ["- erklärt die Funktion → Kognitiv", "- geht respektvoll auf Kundschaft zu → Affektiv", "- bohrt rechtwinklig → Psychomotorisch"]);
    expect(lernziele?.type).toBe("lernzielbereiche");
    if (lernziele?.type === "lernzielbereiche") expect(lernziele.terms.map((term) => term.zoneKey)).toEqual(["kognitiv", "affektiv", "psychomotorisch"]);

    const fehler = parse("Beurteilungsfehler", ["- Gute Ausdrucksfähigkeit färbt auf alles ab → Halo-Effekt", "- Alle erhalten befriedigend → Tendenz zur Mitte", "- Alle Bewertungen sind zu gut → Milde- und Strengefehler", "- Bewertung nach Bauchgefühl für die Person → Sympathie und Antipathie", "- Nur das letzte Quartal zählt → Recency-Effekt"]);
    expect(fehler?.type).toBe("beurteilungsfehler");
    if (fehler?.type === "beurteilungsfehler") expect(fehler.terms.map((term) => term.zoneKey)).toEqual(["halo", "mitte", "milde", "sympathie", "recency"]);

    const regeln = parse("Regelwerke der Berufsausbildung", ["- Probezeit → Berufsbildungsgesetz (BBiG)", "- Pausen Jugendlicher → Jugendarbeitsschutzgesetz (JArbSchG)", "- sachliche Gliederung im Betrieb → Ausbildungsordnung und Ausbildungsrahmenplan", "- Lernfelder → Rahmenlehrplan der Berufsschule"]);
    expect(regeln?.type).toBe("regelwerke");
    if (regeln?.type === "regelwerke") expect(regeln.terms.map((term) => term.zoneKey)).toEqual(["bbig", "jarbschg", "ausbildungsordnung", "rahmenlehrplan"]);
  });

  it("parst die Modelle aus F-182 (Donabedian, Kostenträger)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-2.1-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const donabedian = parse("Qualitätsdimensionen nach Donabedian", ["- Qualifikation der Mitarbeitenden → Strukturqualität", "- Einhaltung der Standards → Prozessqualität", "- Zufriedenheit der betreuten Menschen → Ergebnisqualität"]);
    expect(donabedian?.type).toBe("donabedian");
    if (donabedian?.type === "donabedian") expect(donabedian.terms.map((term) => term.zoneKey)).toEqual(["struktur", "prozess", "ergebnis"]);

    const traeger = parse("Kostenträger im Gesundheits- und Sozialwesen", ["- ärztlich verordnete Leistung → Gesetzliche Krankenversicherung (SGB V)", "- Leistungen bei Pflegebedürftigkeit → Soziale Pflegeversicherung (SGB XI)", "- Hilfe bei Bedürftigkeit → Sozialhilfe (SGB XII)", "- Vertragstarif → Private Krankenversicherung"]);
    expect(traeger?.type).toBe("kostentraeger");
    if (traeger?.type === "kostentraeger") expect(traeger.terms.map((term) => term.zoneKey)).toEqual(["gkv", "pflegeversicherung", "sozialhilfe", "pkv"]);
  });

  it("parst die Modelle aus F-183 (Projektphasen, Stakeholder-Matrix, ABC-Analyse)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-1.3-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const phasen = parse("Projektphasen", ["- Umfang und Ziele klären → Projektauftrag analysieren", "- Kick-off durchführen → Projektstart vorbereiten", "- Meilensteine überwachen → Projektablauf steuern", "- Ist mit Soll vergleichen → Projektkontrolle durchführen", "- Abschlussbericht schreiben → Projektdokumentation erstellen", "- Zielerreichung bewerten → Projektevaluation durchführen"]);
    expect(phasen?.type).toBe("projektphasen");
    if (phasen?.type === "projektphasen") expect(phasen.terms.map((term) => term.zoneKey)).toEqual(["auftrag", "start", "steuerung", "kontrolle", "dokumentation", "evaluation"]);

    const stakeholder = parse("Stakeholder-Matrix", ["- Geschäftsführung mit Budgetverantwortung → Eng einbinden", "- Datenschutzbeauftragte mit Vetorecht → Zufriedenstellen", "- Kolleginnen mit Interesse, ohne Einfluss → Informieren", "- Lieferant ohne Bezug zum Projekt → Beobachten"]);
    expect(stakeholder?.type).toBe("stakeholder");
    if (stakeholder?.type === "stakeholder") expect(stakeholder.terms.map((term) => term.zoneKey)).toEqual(["eng", "zufriedenstellen", "informieren", "beobachten"]);

    const abc = parse("ABC-Analyse", ["- wenige Artikel mit hohem Wertanteil → A-Klasse", "- mittlerer Wertanteil → B-Klasse", "- viele Artikel mit geringem Wertanteil → C-Klasse"]);
    expect(abc?.type).toBe("abc");
    if (abc?.type === "abc") expect(abc.terms.map((term) => term.zoneKey)).toEqual(["a", "b", "c"]);
  });

  it("parst die Modelle aus F-184 (PPS, Beschaffung, SECI, Ishikawa, Zuschlagskalkulation, Incoterms)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-6.1-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const pps = parse("PPS-Aufgaben", ["- Erzeugnisse und Mengen festlegen → Produktionsprogrammplanung", "- Bedarf aus der Stückliste ableiten → Mengenplanung", "- Linien und Werke auslasten → Termin- und Kapazitätsplanung", "- Soll-Ist-Abgleich → Produktionssteuerung"]);
    expect(pps?.type).toBe("pps");
    if (pps?.type === "pps") expect(pps.terms.map((term) => term.zoneKey)).toEqual(["programm", "menge", "termin", "steuerung"]);

    const beschaffung = parse("Beschaffungsstrategien", ["- große Mengen ins Lager → Vorratsbeschaffung", "- Menge für einen Auftrag bei Bedarf → Einzelbeschaffung", "- Material genau bei Bedarf → Just-in-Time (JIT)", "- Teile in der Montagereihenfolge → Just-in-Sequence (JIS)"]);
    expect(beschaffung?.type).toBe("beschaffung");
    if (beschaffung?.type === "beschaffung") expect(beschaffung.terms.map((term) => term.zoneKey)).toEqual(["vorrat", "einzel", "jit", "jis"]);

    const seci = parse("SECI-Modell der Wissensumwandlung", ["- neben der Kollegin mitarbeiten → Sozialisation", "- Erfahrung in einer Checkliste festhalten → Externalisierung", "- Checklisten zu einem Handbuch zusammenführen → Kombination", "- aus dem Handbuch lernen → Internalisierung"]);
    expect(seci?.type).toBe("seci");
    if (seci?.type === "seci") expect(seci.terms.map((term) => term.zoneKey)).toEqual(["sozialisation", "externalisierung", "kombination", "internalisierung"]);

    const ishikawa = parse("Ishikawa-Diagramm (Ursachenkategorien)", ["- Prüfer nicht eingearbeitet → Mensch", "- Werkzeugverschleiß → Maschine", "- fehlerhafte Charge → Material", "- unklare Arbeitsanweisung → Methode", "- schwankende Hallenluft → Mitwelt", "- widersprüchliche Zielvorgaben → Management"]);
    expect(ishikawa?.type).toBe("ishikawa");
    if (ishikawa?.type === "ishikawa") expect(ishikawa.terms.map((term) => term.zoneKey)).toEqual(["mensch", "maschine", "material", "methode", "mitwelt", "management"]);

    const kalkulation = parse("Zuschlagskalkulation", ["- Kupferanteil des Auftrags → Materialkosten", "- Fertigungslöhne → Fertigungskosten", "- Material plus Fertigung → Herstellkosten", "- plus Verwaltung und Vertrieb → Selbstkosten", "- plus Gewinnaufschlag → Angebotspreis"]);
    expect(kalkulation?.type).toBe("kalkulation");
    if (kalkulation?.type === "kalkulation") expect(kalkulation.terms.map((term) => term.zoneKey)).toEqual(["material", "fertigung", "herstellkosten", "selbstkosten", "angebotspreis"]);

    const incoterms = parse("Incoterms", ["- Käufer holt im Werk ab → EXW (Ab Werk)", "- Gefahr bis zur Verladung auf das Schiff → FOB (Frei an Bord)", "- Verkäufer organisiert Seetransport und Versicherung → CIF (Kosten, Versicherung, Fracht)", "- Verkäufer trägt alle Kosten bis zur Lieferadresse → DDP (Geliefert verzollt)"]);
    expect(incoterms?.type).toBe("incoterms");
    if (incoterms?.type === "incoterms") expect(incoterms.terms.map((term) => term.zoneKey)).toEqual(["exw", "fob", "cif", "ddp"]);
  });

  it("parst die Modelle aus F-185 (Fertigungsverfahren, Instandhaltung, TOP-Prinzip, Ishikawa 6M)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-7.1-01 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const fertigung = parse("Fertigungsverfahren nach DIN 8580", ["- Sandguss → Urformen", "- Schmieden → Umformen", "- Fräsen → Trennen", "- Schweißen → Fügen", "- Lackieren → Beschichten", "- Härten → Stoffeigenschaft ändern"]);
    expect(fertigung?.type).toBe("fertigungsverfahren");
    if (fertigung?.type === "fertigungsverfahren") expect(fertigung.terms.map((term) => term.zoneKey)).toEqual(["urformen", "umformen", "trennen", "fuegen", "beschichten", "stoffeigenschaft"]);

    const instandhaltung = parse("Instandhaltungsmaßnahmen nach DIN 31051", ["- Schmieren → Wartung", "- Lagerspiel messen → Inspektion", "- Motor austauschen → Instandsetzung", "- zuverlässigeres Bauteil einbauen → Verbesserung"]);
    expect(instandhaltung?.type).toBe("instandhaltung");
    if (instandhaltung?.type === "instandhaltung") expect(instandhaltung.terms.map((term) => term.zoneKey)).toEqual(["wartung", "inspektion", "instandsetzung", "verbesserung"]);

    const top = parse("TOP-Prinzip im Arbeitsschutz", ["- feste Schutzeinrichtung → Technische Maßnahmen", "- Unterweisung → Organisatorische Maßnahmen", "- Gehörschutz → Personenbezogene Maßnahmen"]);
    expect(top?.type).toBe("top");
    if (top?.type === "top") expect(top.terms.map((term) => term.zoneKey)).toEqual(["technisch", "organisatorisch", "personenbezogen"]);

    const ishikawa = parse("Ishikawa-Diagramm (6M)", ["- unzureichende Schulung → Mensch", "- Werkzeugverschleiß → Maschine", "- fehlerhafte Charge → Material", "- unklare Anweisung → Methode", "- schwankende Hallentemperatur → Milieu (Umwelt)", "- unklare Verantwortung → Management"]);
    expect(ishikawa?.type).toBe("ishikawa6m");
    if (ishikawa?.type === "ishikawa6m") expect(ishikawa.terms.map((term) => term.zoneKey)).toEqual(["mensch", "maschine", "material", "methode", "milieu", "management"]);
  });

  it("parst die Modelle aus F-187 (Investitionsrechenverfahren, Vier-Seiten-Modell)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-2.1-14 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const investition = parse("Investitionsrechenverfahren", ["- Kostenvergleichsrechnung → Statische Verfahren", "- Amortisationsrechnung → Statische Verfahren", "- Kapitalwertmethode → Dynamische Verfahren", "- interner Zinsfuß → Dynamische Verfahren"]);
    expect(investition?.type).toBe("investition");
    if (investition?.type === "investition") expect(investition.terms.map((term) => term.zoneKey)).toEqual(["statisch", "statisch", "dynamisch", "dynamisch"]);

    const vierseiten = parse("Vier-Seiten-Modell", ["- „Das Lager ist schon wieder voll.“ → Sachebene", "- „Ich bin heute sehr angespannt.“ → Selbstoffenbarung", "- „Du kannst das ohnehin nicht.“ → Beziehungsebene", "- „Räum das bitte bis morgen auf.“ → Appell"]);
    expect(vierseiten?.type).toBe("vierseiten");
    if (vierseiten?.type === "vierseiten") expect(vierseiten.terms.map((term) => term.zoneKey)).toEqual(["sachebene", "selbstoffenbarung", "beziehungsebene", "appell"]);
  });

  it("parst das Modell aus F-188 (Verkehrsträger)", () => {
    const block = [
      "#### Q-2.3-13 · Verkehrsträger",
      "**Anweisung:** Ordne zu.",
      "- Haus-zu-Haus-Transport ohne Umschlag → Straße",
      "- Fahrplangebundener Massengutverkehr → Schiene",
      "- Binnenschiff auf dem Rhein → Wasser",
      "- Eilige, hochwertige Sendung → Luft",
      "**Erklärung:** ...",
      "`schwierigkeit: leicht`",
    ].join("\n");
    const verkehr = parseQuizBlock(block);
    expect(verkehr?.type).toBe("verkehrstraeger");
    if (verkehr?.type === "verkehrstraeger") expect(verkehr.terms.map((term) => term.zoneKey)).toEqual(["strasse", "schiene", "wasser", "luft"]);
  });

  it("parst die Modelle aus F-189 (XYZ-Analyse, Handelskalkulation, Kraljic-Matrix)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-4.1-17 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const xyz = parse("XYZ-Analyse", ["- gleichmäßiger Verbrauch → X-Klasse", "- saisonal schwankend → Y-Klasse", "- kaum vorhersagbar → Z-Klasse"]);
    expect(xyz?.type).toBe("xyz");
    if (xyz?.type === "xyz") expect(xyz.terms.map((term) => term.zoneKey)).toEqual(["x", "y", "z"]);

    const kalkulation = parse("Handelskalkulation", ["- Lieferantenrabatt → Bezugskalkulation", "- Handlungskosten → Selbstkostenkalkulation", "- Kundenskonto → Verkaufskalkulation"]);
    expect(kalkulation?.type).toBe("handelskalkulation");
    if (kalkulation?.type === "handelskalkulation") expect(kalkulation.terms.map((term) => term.zoneKey)).toEqual(["bezug", "selbstkosten", "verkauf"]);

    const kraljic = parse("Kraljic-Matrix", ["- Verhandlungsstärke nutzen → Hebelprodukte", "- enge Partnerschaft → Strategische Produkte", "- Bestellung vereinfachen → Standardprodukte", "- Versorgung absichern → Engpassprodukte"]);
    expect(kraljic?.type).toBe("kraljic");
    if (kraljic?.type === "kraljic") expect(kraljic.terms.map((term) => term.zoneKey)).toEqual(["hebel", "strategisch", "standard", "engpass"]);
  });

  it("parst die Modelle aus F-190 (Immobilienfachwirt)", () => {
    const parse = (ueberschrift: string, zeilen: string[]) =>
      parseQuizBlock([`#### Q-6.3-13 · ${ueberschrift}`, "**Anweisung:** Ordne zu.", ...zeilen, "**Erklärung:** ...", "`schwierigkeit: leicht`"].join("\n"));

    const wert = parse("Wertermittlungsverfahren", ["- Bodenrichtwert → Vergleichswertverfahren", "- Liegenschaftszinssatz → Ertragswertverfahren", "- Herstellungskosten → Sachwertverfahren"]);
    expect(wert?.type).toBe("wertermittlung");
    if (wert?.type === "wertermittlung") expect(wert.terms.map((term) => term.zoneKey)).toEqual(["vergleichswert", "ertragswert", "sachwert"]);

    const miete = parse("Wege der Mieterhöhung", ["- Mietspiegel → Vergleichsmiete", "- Anteil der Modernisierungskosten → Modernisierungsumlage", "- vorab vereinbarte Stufen → Staffelmiete", "- Bindung an den Verbraucherpreisindex → Indexmiete"]);
    expect(miete?.type).toBe("mieterhoehung");
    if (miete?.type === "mieterhoehung") expect(miete.terms.map((term) => term.zoneKey)).toEqual(["vergleichsmiete", "modernisierung", "staffel", "index"]);

    const weg = parse("WEG-Organe", ["- beschließt den Wirtschaftsplan → Eigentümerversammlung", "- führt die Beschlüsse aus → Verwalter", "- unterstützt und kontrolliert → Verwaltungsbeirat"]);
    expect(weg?.type).toBe("wegorgane");
    if (weg?.type === "wegorgane") expect(weg.terms.map((term) => term.zoneKey)).toEqual(["versammlung", "verwalter", "beirat"]);

    const kosten = parse("Betriebskosten", ["- Grundsteuer → Umlagefähig", "- Verwalterhonorar → Nicht umlagefähig", "- Heizkosten nach Verbrauch → Verbrauchsabhängig (Heizkostenverordnung)"]);
    expect(kosten?.type).toBe("betriebskosten");
    if (kosten?.type === "betriebskosten") expect(kosten.terms.map((term) => term.zoneKey)).toEqual(["umlagefaehig", "nichtumlagefaehig", "verbrauch"]);

    const kg = parse("DIN-276-Kostengruppen", ["- Kaufpreis des Grundstücks → KG 100 Grundstück", "- Heizungsanlage → KG 400 Technische Anlagen", "- Genehmigungskosten → KG 700 Baunebenkosten"]);
    expect(kg?.type).toBe("kostengruppen");
    if (kg?.type === "kostengruppen") expect(kg.terms.map((term) => term.zoneKey)).toEqual(["kg100", "kg400", "kg700"]);
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

  it("parst Hierarchie-Blöcke (Projektstrukturplan/Organigramm) als echten, mehrstufigen Baum", () => {
    const block = [
      "#### Q-1.3-20 · Hierarchie",
      "**Anweisung:** Ordne die Positionen der Projektorganisation in die richtige Hierarchie ein.",
      "**Wurzel:** Projektleitung",
      "- Teilprojekt A (unter: Wurzel)",
      "- Teilprojekt B (unter: Wurzel)",
      "- Arbeitspaket A1 (unter: Teilprojekt A)",
      "- Anforderungsanalyse → Arbeitspaket A1",
      "- Budgetplanung → Teilprojekt B",
      "- Ressourcenplanung → Teilprojekt B",
      "- Konzept erstellen → Teilprojekt A",
      "**Erklärung:** Ein Projektstrukturplan gliedert ein Projekt in Teilprojekte und Arbeitspakete.",
      "`schwierigkeit: mittel` · `bloom: anwenden`",
    ].join("\n");
    const parsed = parseQuizBlock(block);
    expect(parsed?.type).toBe("hierarchie");
    if (parsed?.type === "hierarchie") {
      expect(parsed.root).toBe("Projektleitung");
      expect(parsed.nodes).toEqual([
        { label: "Teilprojekt A", parentIndex: null },
        { label: "Teilprojekt B", parentIndex: null },
        // Zwei Ebenen tief: "Arbeitspaket A1" referenziert "Teilprojekt A" (Index 0), nicht die
        // Wurzel — der Fall, den eine flache Zonen-Zuordnung nicht abbilden könnte.
        { label: "Arbeitspaket A1", parentIndex: 0 },
      ]);
      expect(parsed.terms).toEqual([
        { text: "Anforderungsanalyse", nodeIndex: 2 },
        { text: "Budgetplanung", nodeIndex: 1 },
        { text: "Ressourcenplanung", nodeIndex: 1 },
        { text: "Konzept erstellen", nodeIndex: 0 },
      ]);
    }
  });

  it("wirft bei einer unbekannten übergeordneten Ebene statt eine ungültige Baumstruktur stillschweigend zu erzeugen", () => {
    const block = [
      "#### Q-1.3-21 · Hierarchie",
      "**Anweisung:** ...",
      "**Wurzel:** Projektleitung",
      "- Teilprojekt A (unter: Wurzel)",
      "- Arbeitspaket X1 (unter: Nicht existierendes Teilprojekt)",
      "- Begriff → Teilprojekt A",
      "**Erklärung:** ...",
      "`schwierigkeit: mittel`",
    ].join("\n");
    expect(() => parseQuizBlock(block)).toThrow(/Unbekannte übergeordnete Ebene/);
  });

  it("wirft bei einem Begriff mit unbekannter Ebene statt eine ungültige Zuordnung stillschweigend zu erzeugen", () => {
    const block = [
      "#### Q-1.3-22 · Hierarchie",
      "**Anweisung:** ...",
      "**Wurzel:** Projektleitung",
      "- Teilprojekt A (unter: Wurzel)",
      "- Begriff → Unbekannte Ebene",
      "**Erklärung:** ...",
      "`schwierigkeit: mittel`",
    ].join("\n");
    expect(() => parseQuizBlock(block)).toThrow(/Unbekannte Ebene/);
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

describe("parseGlossar (F-165)", () => {
  it("liest Begriff, Aliase, Thema, Abschnitt, Definition und Prüfstatus", () => {
    const eintraege = parseGlossar(
      [
        "#### Netzplan",
        "**Auch:** Vorgangsknotennetz, Netzplantechnik",
        "**Thema:** 1.1",
        "**Abschnitt:** Termine planen",
        "**Definition:** Darstellung der Vorgänge und ihrer Abhängigkeiten.",
        "**Geprüft:** nein",
        "",
        "#### SLA",
        "**Definition:** Vereinbarung zur Servicequalität.",
        "**Geprüft:** ja",
      ].join("\n"),
    );
    expect(eintraege).toEqual([
      {
        term: "Netzplan",
        aliases: ["Vorgangsknotennetz", "Netzplantechnik"],
        thema: "1.1",
        abschnitt: "Termine planen",
        definition: "Darstellung der Vorgänge und ihrer Abhängigkeiten.",
        geprueft: false,
      },
      { term: "SLA", aliases: [], thema: null, abschnitt: null, definition: "Vereinbarung zur Servicequalität.", geprueft: true },
    ]);
  });

  it("bricht bei fehlender Definition mit klarer Meldung ab und ignoriert Text vor dem ersten Block", () => {
    expect(() => parseGlossar("#### Leer\n**Thema:** 1.1")).toThrow(/"Leer".*Definition/);
    expect(parseGlossar("Einleitung ohne Block")).toEqual([]);
  });
});
