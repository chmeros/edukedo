import { describe, expect, it } from "vitest";
import { extractTheorieHeadings, headingSlug } from "./theorie-headings";

describe("headingSlug", () => {
  it("bildet ASCII-Anker aus Umlauten, Sonderzeichen und Markdown-Auszeichnung", () => {
    expect(headingSlug("Das **ER-Modell**: von der Anforderung zum Datenmodell")).toBe("das-er-modell-von-der-anforderung-zum-datenmodell");
    expect(headingSlug("Größe & Maß")).toBe("groesse-mass");
    expect(headingSlug("???")).toBe("abschnitt");
  });
});

describe("extractTheorieHeadings", () => {
  it("findet Überschriften der Ebenen 2 und 3 und ignoriert Codeblöcke und andere Ebenen", () => {
    const markdown = ["# Titel", "## Theorie", "Text", "### Erster Abschnitt", "```", "### kein Abschnitt", "```", "#### zu tief", "### Zweiter **Abschnitt**"].join("\n");
    expect(extractTheorieHeadings(markdown)).toEqual([
      { level: 2, text: "Theorie", id: "theorie" },
      { level: 3, text: "Erster Abschnitt", id: "erster-abschnitt" },
      { level: 3, text: "Zweiter Abschnitt", id: "zweiter-abschnitt" },
    ]);
  });

  it("liefert eine leere Liste ohne Überschriften", () => {
    expect(extractTheorieHeadings("nur Text\nmehr Text")).toEqual([]);
  });
});
