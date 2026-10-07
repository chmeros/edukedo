import initSqlJs, { type SqlJsStatic } from "sql.js";
import { beforeAll, describe, expect, it } from "vitest";
import { SQL_BEIBLATT } from "./sql-beiblatt";
import { SQL_SCHEMA } from "./sql-uebungen";

let SQL: SqlJsStatic;
beforeAll(async () => {
  SQL = await initSqlJs();
});

const eintraege = SQL_BEIBLATT.flatMap((abschnitt) => abschnitt.eintraege.map((eintrag) => ({ abschnitt: abschnitt.titel, ...eintrag })));

describe("SQL-Beiblatt (Prüfungsmodus)", () => {
  it("deckt die Themen der Kurstheorie 5.2 ab", () => {
    const syntax = eintraege.map((e) => e.syntax).join("\n");
    for (const wort of ["SELECT", "WHERE", "ORDER BY", "GROUP BY", "HAVING", "INNER JOIN", "LEFT JOIN", "INSERT INTO", "UPDATE", "DELETE FROM", "CREATE TABLE", "DROP TABLE", "BETWEEN", "LIKE", "IS [NOT] NULL"]) {
      expect(syntax, wort).toContain(wort);
    }
  });

  it.each(eintraege.map((e) => [e.abschnitt, e.beispiel] as const))("%s: Beispiel läuft auf den Projektdaten: %s", (_abschnitt, beispiel) => {
    const db = new SQL.Database();
    db.exec(SQL_SCHEMA);
    expect(() => db.exec(beispiel)).not.toThrow();
    db.close();
  });

  it("Abfrage-Beispiele liefern Ergebnisse, die zur Beschreibung passen", () => {
    const db = new SQL.Database();
    db.exec(SQL_SCHEMA);
    const wert = (sql: string) => db.exec(sql)[0]!.values;
    expect(wert("SELECT DISTINCT ort FROM kunde WHERE branche = 'Handel' ORDER BY ort DESC;")).toEqual([["Köln"], ["Hamburg"]]);
    expect(wert("SELECT bereich, SUM(budget) FROM projekt GROUP BY bereich HAVING SUM(budget) > 40000;")).toEqual([["IoT", 59000], ["Softwareentwicklung", 48000], ["Systemintegration", 60000]]);
    expect(wert("SELECT k.name FROM kunde k LEFT JOIN projekt p ON p.kunde_id = k.kunde_id WHERE p.projekt_id IS NULL;")).toEqual([["Kaufhaus Brandt"]]);
    db.close();
  });

  it("alle Einträge haben Syntax, Hinweis und Beispiel", () => {
    for (const e of eintraege) {
      expect(e.syntax.length).toBeGreaterThan(10);
      expect(e.hinweis.length).toBeGreaterThan(20);
      expect(e.beispiel.length).toBeGreaterThan(10);
    }
  });
});
