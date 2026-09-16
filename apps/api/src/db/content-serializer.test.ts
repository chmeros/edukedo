import { describe, expect, it } from "vitest";
import { extractSection, parseKarteikarten, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";
import {
  serializeKarteikarte,
  serializeKurzantwort,
  serializeLuecken,
  serializeQuizMc,
  serializeThemaFile,
  serializeZuordnung,
  splitThemaTitle,
} from "./content-serializer";

describe("splitThemaTitle", () => {
  it("trennt Code und Titel am Trennzeichen des Imports (' — ')", () => {
    expect(splitThemaTitle("3.1 — Personalplanung, -beschaffung")).toEqual({
      code: "3.1",
      title: "Personalplanung, -beschaffung",
    });
  });

  it("fällt ohne Trennzeichen auf einen leeren Code zurück, statt zu werfen", () => {
    expect(splitThemaTitle("Nur ein Titel ohne Code")).toEqual({ code: "", title: "Nur ein Titel ohne Code" });
  });
});

describe("Round-Trip serialize -> parse", () => {
  it("Karteikarte: serialisierter Block parst zu denselben Feldern (ohne bloom, wie HB3/Mathematik-9)", () => {
    const block = serializeKarteikarte(
      "K-3.1-01",
      "Was ist Personalbedarf?",
      "Die benötigte Personalausstattung.",
      "leicht",
      null,
      ["personalplanung", "agg"],
    );
    expect(block).not.toContain("bloom:");
    const [parsed] = parseKarteikarten(block);
    expect(parsed).toEqual({
      prompt: "Was ist Personalbedarf?",
      explanation: "Die benötigte Personalausstattung.",
      difficulty: "leicht",
      bloom: null,
      tags: ["personalplanung", "agg"],
    });
  });

  it("Karteikarte mit bloom (wie ab HB1/HB2/HB4 verbindlich): serialisierter Block parst zum selben Wert", () => {
    const block = serializeKarteikarte("K-1.1-01", "Frage", "Antwort", "leicht", "erinnern", []);
    expect(block).toContain("`bloom: erinnern`");
    const [parsed] = parseKarteikarten(block);
    expect(parsed?.bloom).toBe("erinnern");
  });

  it("Karteikarte ohne Tags: kein leeres `tags: `-Segment im Output", () => {
    const block = serializeKarteikarte("K-3.1-02", "Frage", "Antwort", "mittel", null, []);
    expect(block).not.toContain("tags:");
    const [parsed] = parseKarteikarten(block);
    expect(parsed?.tags).toEqual([]);
  });

  it("Multiple Choice: serialisierter Block parst zu denselben Optionen und demselben bloom-Wert", () => {
    const block = serializeQuizMc("Q-3.1-01", "Welche Aussage trifft zu?", "Weil das so ist.", "mittel", "verstehen", [
      { text: "Falsche Option", isCorrect: false },
      { text: "Richtige Option", isCorrect: true },
    ]);
    const parsed = parseQuizBlock(block);
    expect(parsed).toMatchObject({ type: "quiz_mc", prompt: "Welche Aussage trifft zu?", difficulty: "mittel", bloom: "verstehen" });
    if (parsed?.type === "quiz_mc") {
      expect(parsed.options).toEqual([
        { text: "Falsche Option", isCorrect: false },
        { text: "Richtige Option", isCorrect: true },
      ]);
    }
  });

  it("Zuordnung: serialisierter Block parst zu denselben Paaren", () => {
    const block = serializeZuordnung("Q-3.1-02", "Ordne zu.", "Erklärung dazu.", "leicht", null, [
      { left: "Begriff A", right: "Beschreibung A" },
      { left: "Begriff B", right: "Beschreibung B" },
    ]);
    const parsed = parseQuizBlock(block);
    expect(parsed).toMatchObject({ type: "zuordnung", bloom: null });
    if (parsed?.type === "zuordnung") {
      expect(parsed.pairs).toEqual([
        { left: "Begriff A", right: "Beschreibung A" },
        { left: "Begriff B", right: "Beschreibung B" },
      ]);
    }
  });

  it("Lückentext: serialisierter Block parst zu denselben Lücken", () => {
    const block = serializeLuecken(
      "Q-3.1-03",
      "Grundformel.",
      "leicht",
      "erinnern",
      "Die Differenz zwischen ___ und ___ zeigt den Handlungsbedarf.",
      [{ accepted: ["Bestand"] }, { accepted: ["Bedarf"] }],
    );
    const parsed = parseQuizBlock(block);
    expect(parsed).toMatchObject({ type: "luecken", bloom: "erinnern" });
    if (parsed?.type === "luecken") {
      expect(parsed.textWithBlanks).toBe("Die Differenz zwischen ___ und ___ zeigt den Handlungsbedarf.");
      expect(parsed.blanks).toEqual([
        { id: "1", accepted: ["Bestand"] },
        { id: "2", accepted: ["Bedarf"] },
      ]);
    }
  });

  it("Kurzantwort: serialisierter Block parst zu denselben akzeptierten Antworten", () => {
    const block = serializeKurzantwort("Q-3.1-04", "Wie heißt das Gesetz?", "Regelt die Nachweispflicht.", "mittel", "analysieren", [
      "Nachweisgesetz",
      "NachwG",
    ]);
    const parsed = parseQuizBlock(block);
    expect(parsed).toMatchObject({ type: "kurzantwort", bloom: "analysieren" });
    if (parsed?.type === "kurzantwort") {
      expect(parsed.acceptedAnswers).toEqual(["Nachweisgesetz", "NachwG"]);
    }
  });
});

describe("serializeThemaFile", () => {
  it("erzeugt eine Datei, aus der sich Theorie/Karteikarten/Quiz wieder sauber extrahieren lassen", () => {
    const karteikartenBlock = serializeKarteikarte("K-3.1-01", "Frage", "Antwort", "leicht", null, []);
    const quizBlock = serializeQuizMc("Q-3.1-01", "Quiz-Frage", "Erklärung", "mittel", null, [{ text: "Option", isCorrect: true }]);
    const fileContent = serializeThemaFile(
      {
        kursSlug: "fachwirt-buero-projektorganisation",
        fachgebietCode: "HB3",
        fachgebietTitle: "Führen, Betreuen, Verwalten und Ausbilden",
        themaCode: "3.1",
        themaTitle: "Personalplanung",
      },
      "Theorie-Fließtext mit **fettem** Wort.",
      [karteikartenBlock],
      [quizBlock],
    );

    const { frontmatter, body } = splitFrontmatter(fileContent);
    expect(frontmatter.kurs_slug).toBe("fachwirt-buero-projektorganisation");
    expect(frontmatter.thema_code).toBe("3.1");

    const theorie = extractSection(body, "Theorie");
    expect(theorie).toContain("Theorie-Fließtext");

    const karteikarten = extractSection(body, "Karteikarten");
    expect(splitBlocks(karteikarten!)).toHaveLength(1);

    const quiz = extractSection(body, "Quiz");
    expect(splitBlocks(quiz!)).toHaveLength(1);
  });

  it("lässt leere Abschnitte (keine Karteikarten/Quiz-Items) einfach weg, statt eine leere Überschrift zu erzeugen", () => {
    const fileContent = serializeThemaFile(
      {
        kursSlug: "mathematik-9",
        fachgebietCode: "ALG",
        fachgebietTitle: "Algebra & Funktionen",
        themaCode: "ALG1",
        themaTitle: "Quadratwurzeln",
      },
      "Nur Theorie vorhanden.",
      [],
      [],
    );
    expect(fileContent).not.toContain("## Karteikarten");
    expect(fileContent).not.toContain("## Quiz");
  });
});
