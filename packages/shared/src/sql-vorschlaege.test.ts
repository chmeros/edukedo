import { describe, expect, it } from "vitest";
import { SQL_VORSCHLAEGE_MAX, sqlVorschlaege } from "./sql-vorschlaege";

/** Hilfsfunktion: Cursor steht am Ende des Textes. */
const amEnde = (text: string) => sqlVorschlaege(text, text.length);
const texte = (text: string) => amEnde(text)?.vorschlaege.map((v) => v.text) ?? null;

describe("sqlVorschlaege", () => {
  it("macht bei weniger als zwei Zeichen keine Vorschläge", () => {
    expect(amEnde("")).toBeNull();
    expect(amEnde("S")).toBeNull();
    expect(amEnde("SELECT ")).toBeNull();
  });

  it("schlägt Schlüsselwörter in Großbuchstaben vor, auch bei kleingeschriebener Eingabe", () => {
    expect(texte("sel")).toEqual(["SELECT"]);
    const ergebnis = amEnde("sel")!;
    expect(ergebnis.von).toBe(0);
    expect(ergebnis.bis).toBe(3);
    expect(ergebnis.vorschlaege[0]).toMatchObject({ art: "schluesselwort", hinweis: "Schlüsselwort" });
  });

  it("schlägt nach FROM, JOIN, INTO, UPDATE und TABLE nur Tabellen vor", () => {
    expect(texte("SELECT * FROM ku")).toEqual(["kunde"]);
    expect(texte("SELECT * FROM kunde JOIN pro")).toEqual(["projekt"]);
    expect(texte("INSERT INTO ti")).toEqual(["ticket"]);
    expect(texte("UPDATE pr")).toEqual(["projekt"]);
    // "se" würde sonst auch SELECT/SET vorschlagen — nach FROM nur Tabellen:
    expect(amEnde("SELECT * FROM se")).toBeNull();
  });

  it("schlägt Spalten der in der Anweisung genannten Tabellen vor", () => {
    expect(texte("SELECT kun FROM kunde")).toBeNull(); // Cursor am Ende, Wort ist "kunde" (Tabelle, vollständig)
    const ergebnis = sqlVorschlaege("SELECT nam FROM kunde", "SELECT nam".length)!;
    expect(ergebnis.vorschlaege.map((v) => v.text)).toEqual(["name"]);
    expect(ergebnis.vorschlaege[0]).toMatchObject({ art: "spalte", hinweis: "Spalte von kunde (TEXT)" });
    expect(ergebnis.von).toBe(7);
  });

  it("nutzt ohne genannte Tabelle die Spalten aller Tabellen und führt gleiche Namen nur einmal auf", () => {
    const vorschlaege = texte("SELECT kun")!;
    expect(vorschlaege.filter((t) => t === "kunde_id")).toHaveLength(1);
    expect(vorschlaege).toContain("kunde"); // Tabelle
  });

  it("schlägt nach tabelle. und alias. die Spalten genau dieser Tabelle vor", () => {
    expect(texte("SELECT kunde.")).toEqual(["kunde_id", "name", "ort", "branche"]);
    expect(texte("SELECT kunde.na")).toEqual(["name"]);
    const sql = "SELECT p.ti FROM kunde k JOIN projekt p ON p.kunde_id = k.kunde_id";
    expect(sqlVorschlaege(sql, "SELECT p.ti".length)?.vorschlaege.map((v) => v.text)).toEqual(["titel"]);
    expect(sqlVorschlaege("SELECT k. FROM kunde AS k", "SELECT k.".length)?.vorschlaege).toHaveLength(4);
  });

  it("macht für unbekannte Tabellen oder Aliase keine Vorschläge", () => {
    expect(amEnde("SELECT x.na")).toBeNull();
    expect(amEnde("SELECT kunde.zzz")).toBeNull();
  });

  it("erkennt keine Wörter wie WHERE oder JOIN als Alias", () => {
    const sql = "SELECT * FROM kunde WHERE nam";
    expect(sqlVorschlaege(sql, sql.length)?.vorschlaege.map((v) => v.text)).toEqual(["name"]);
  });

  it("schweigt in Zeichenketten und Kommentaren", () => {
    expect(amEnde("SELECT * FROM kunde WHERE name = 'Hart")).toBeNull();
    expect(amEnde("SELECT 1 -- sel")).toBeNull();
    expect(amEnde("/* sel")).toBeNull();
    // Nach geschlossener Zeichenkette bzw. geschlossenem Kommentar geht es wieder
    expect(texte("SELECT 'a' AS x, nam FROM kunde")).toBeNull(); // Cursor am Ende (Wort "kunde" vollständig)
    expect(sqlVorschlaege("SELECT 'a' AS x, nam FROM kunde", "SELECT 'a' AS x, nam".length)?.vorschlaege.map((v) => v.text)).toEqual(["name"]);
    expect(texte("/* c */ sel")).toEqual(["SELECT"]);
    expect(texte("SELECT 'O''Brien' FROM ku")).toEqual(["kunde"]);
    expect(amEnde("SELECT 'O''Br")).toBeNull();
  });

  it("verlangt in einer neuen Zeile nach einem Zeilenkommentar wieder normale Vorschläge", () => {
    expect(texte("-- Hinweis\nsel")).toEqual(["SELECT"]);
  });

  it("schlägt keinen Treffer vor, der schon vollständig dasteht", () => {
    expect(amEnde("SELECT * FROM kunde")).toBeNull();
    expect(texte("SELECT * FROM kunde WHERE ort")).toBeNull();
  });

  it("begrenzt die Anzahl der Vorschläge und bildet den Ersetzungsbereich mitten im Text", () => {
    const viele = amEnde("SELECT *, co")!;
    expect(viele.vorschlaege.length).toBeLessThanOrEqual(SQL_VORSCHLAEGE_MAX);
    const text = "SELECT nam FROM kunde";
    const mitten = sqlVorschlaege(text, "SELECT nam".length)!;
    expect(text.slice(mitten.von, mitten.bis)).toBe("nam");
  });

  it("verändert die Tabellenliste nicht und akzeptiert eine eigene", () => {
    const eigene = [{ name: "auto", spalten: [{ name: "kennzeichen", typ: "TEXT" }] }];
    expect(sqlVorschlaege("SELECT ken FROM auto", "SELECT ken".length, eigene)?.vorschlaege.map((v) => v.text)).toEqual(["kennzeichen"]);
    expect(sqlVorschlaege("SELECT * FROM au", "SELECT * FROM au".length, eigene)?.vorschlaege.map((v) => v.text)).toEqual(["auto"]);
  });
});
