import { describe, expect, it } from "vitest";
import { SQL_UEBUNGEN } from "./sql-uebungen";
import { tokenisiereSql } from "./sql-highlight";

const arten = (sql: string) => tokenisiereSql(sql).filter((t) => t.art !== "text").map((t) => `${t.art}:${t.text}`);

describe("tokenisiereSql", () => {
  it("erkennt Schlüsselwörter unabhängig von der Schreibweise", () => {
    expect(arten("select Name from kunde where id = 3")).toEqual(["schluesselwort:select", "schluesselwort:from", "schluesselwort:where", "zahl:3"]);
  });

  it("färbt Zeichenketten samt verdoppeltem Hochkomma als eine Einheit", () => {
    expect(arten("WHERE ort = 'O''Brien-Stadt' AND x = 1")).toEqual(["schluesselwort:WHERE", "zeichenkette:'O''Brien-Stadt'", "schluesselwort:AND", "zahl:1"]);
  });

  it("färbt Kommentare bis Zeilenende bzw. bis zum Blockende", () => {
    expect(arten("SELECT 1 -- Hinweis mit 'Text'\nFROM t")).toEqual(["schluesselwort:SELECT", "zahl:1", "kommentar:-- Hinweis mit 'Text'", "schluesselwort:FROM"]);
    expect(arten("/* WHERE */ SELECT")).toEqual(["kommentar:/* WHERE */", "schluesselwort:SELECT"]);
  });

  it("behandelt Zahlen mit Dezimalstellen, aber nicht Ziffern in Namen", () => {
    expect(arten("preis > 12.50 AND tabelle1.spalte2 = 7")).toEqual(["zahl:12.50", "schluesselwort:AND", "zahl:7"]);
  });

  it("markiert Bezeichner in Anführungszeichen", () => {
    expect(arten('SELECT "Order" FROM `from`')).toEqual(["schluesselwort:SELECT", 'bezeichner:"Order"', "schluesselwort:FROM", "bezeichner:`from`"]);
  });

  it("färbt unvollständige Eingaben bis zum Ende ein, ohne Fehler", () => {
    expect(arten("SELECT 'offen")).toEqual(["schluesselwort:SELECT", "zeichenkette:'offen"]);
    expect(arten("SELECT /* offen")).toEqual(["schluesselwort:SELECT", "kommentar:/* offen"]);
    expect(tokenisiereSql("")).toEqual([]);
  });

  it("ist verlustfrei, auch bei Umlauten, Tabulatoren und Zeilenumbrüchen", () => {
    const beispiele = ["SELECT ä, ö FROM Größe;\n\tWHERE x<>'ü';", "  \n ", "a-b /* x */ 'y' \"z\" 1.5 .5 ;;", ...SQL_UEBUNGEN.map((u) => u.loesung)];
    for (const beispiel of beispiele) {
      expect(tokenisiereSql(beispiel).map((t) => t.text).join("")).toBe(beispiel);
    }
  });
});
