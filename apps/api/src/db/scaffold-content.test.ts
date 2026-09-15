import { describe, expect, it } from "vitest";
import { splitFrontmatter } from "./content-parser";
import { insertItemBlock, newThemaContent, nextIdNumber } from "./scaffold-content";

describe("nextIdNumber", () => {
  it("gibt 1 zurück, wenn noch kein Block mit diesem Präfix existiert", () => {
    expect(nextIdNumber("## Karteikarten\n", "K-3.1-")).toBe(1);
  });

  it("findet die höchste vorhandene Nummer und zählt eins weiter, auch bei Lücken", () => {
    const content = ["#### K-3.1-01", "...", "#### K-3.1-03", "..."].join("\n");
    expect(nextIdNumber(content, "K-3.1-")).toBe(4);
  });

  it("verwechselt Karteikarten- und Quiz-Präfix nicht", () => {
    const content = ["#### K-3.1-01", "#### Q-3.1-01", "#### Q-3.1-02"].join("\n");
    expect(nextIdNumber(content, "K-3.1-")).toBe(2);
    expect(nextIdNumber(content, "Q-3.1-")).toBe(3);
  });

  it("behandelt Sonderzeichen im Themacode (z. B. Punkt) als Literal, nicht als Regex-Wildcard", () => {
    // "3.1" enthält einen Punkt — ohne Escaping würde das Muster auch "3X1" treffen.
    const content = "#### K-3X1-01";
    expect(nextIdNumber(content, "K-3.1-")).toBe(1);
  });
});

describe("insertItemBlock", () => {
  it("hängt einen Karteikarten-Platzhalter mit der nächsten freien ID an", () => {
    const existing = ["---", "thema_code: \"3.1\"", "---", "", "## Karteikarten", "", "#### K-3.1-01", "..."].join("\n");
    const { id, updated } = insertItemBlock(existing, "karteikarte", "3.1");
    expect(id).toBe("K-3.1-02");
    expect(updated).toContain("#### K-3.1-02");
    expect(updated).toContain("**Frage:** TODO");
  });

  it("fügt einen Karteikarten-Block VOR einem bereits vorhandenen Quiz-Abschnitt ein, nicht ans Dateiende (Regressionstest)", () => {
    const existing = [
      "---",
      'thema_code: "9.9"',
      "---",
      "",
      "## Karteikarten",
      "",
      "## Quiz",
      "",
      "#### Q-9.9-01 · Kurzantwort",
      "**Frage:** X",
      "**Akzeptierte Antworten:** Y",
      "**Erklärung:** Z",
      "`schwierigkeit: mittel`",
      "",
    ].join("\n");

    const { id, updated } = insertItemBlock(existing, "karteikarte", "9.9");
    expect(id).toBe("K-9.9-01");
    const karteikartenIndex = updated.indexOf("## Karteikarten");
    const newBlockIndex = updated.indexOf("#### K-9.9-01");
    const quizIndex = updated.indexOf("## Quiz");
    expect(karteikartenIndex).toBeLessThan(newBlockIndex);
    expect(newBlockIndex).toBeLessThan(quizIndex);
  });

  it("fügt einen zweiten Quiz-Block nach dem ersten ein, nicht davor", () => {
    const existing = [
      "---",
      'thema_code: "9.9"',
      "---",
      "",
      "## Quiz",
      "",
      "#### Q-9.9-01 · Kurzantwort",
      "**Frage:** X",
      "**Akzeptierte Antworten:** Y",
      "**Erklärung:** Z",
      "`schwierigkeit: mittel`",
      "",
    ].join("\n");

    const { id, updated } = insertItemBlock(existing, "quiz_mc", "9.9");
    expect(id).toBe("Q-9.9-02");
    expect(updated.indexOf("Q-9.9-01")).toBeLessThan(updated.indexOf("Q-9.9-02"));
  });

  it("legt den Abschnitt neu an, falls er in der Datei noch fehlt", () => {
    const existing = ["---", "thema_code: \"ALG1\"", "---", "", "## Theorie", "", "Text."].join("\n");
    const { id, updated } = insertItemBlock(existing, "quiz_mc", "ALG1");
    expect(id).toBe("Q-ALG1-01");
    expect(updated).toContain("## Quiz");
    expect(updated.indexOf("## Quiz")).toBeGreaterThan(updated.indexOf("## Theorie"));
  });

  it("erzeugt für jeden Fragetyp einen mit dem Parser kompatiblen Block-Header", () => {
    const base = ["---", "thema_code: \"X\"", "---", ""].join("\n");
    for (const type of ["quiz_mc", "zuordnung", "luecken", "kurzantwort"] as const) {
      const { updated } = insertItemBlock(base, type, "X");
      expect(updated).toMatch(/#### Q-X-01 · /);
    }
  });
});

describe("newThemaContent", () => {
  it("erzeugt einen gültigen Frontmatter-Block mit den übergebenen Kern-Feldern", () => {
    const content = newThemaContent({ kursSlug: "mathematik-9", fachgebietCode: "ALG", themaCode: "ALG4" });
    const { frontmatter } = splitFrontmatter(content);
    expect(frontmatter.kurs_slug).toBe("mathematik-9");
    expect(frontmatter.fachgebiet_code).toBe("ALG");
    expect(frontmatter.thema_code).toBe("ALG4");
  });

  it("legt alle drei Abschnitte leer an", () => {
    const content = newThemaContent({ kursSlug: "x", fachgebietCode: "Y", themaCode: "Z1" });
    expect(content).toContain("## Theorie");
    expect(content).toContain("## Karteikarten");
    expect(content).toContain("## Quiz");
  });
});
