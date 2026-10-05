import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import { beforeAll, describe, expect, it } from "vitest";
import { SQL_SCHEMA, SQL_TABELLEN, SQL_UEBUNGEN, vergleicheErgebnisse, type SqlTabelle, type SqlUebung } from "./sql-uebungen";

let SQL: SqlJsStatic;

beforeAll(async () => {
  SQL = await initSqlJs();
});

function frischeDatenbank(): Database {
  const db = new SQL.Database();
  db.exec(SQL_SCHEMA);
  return db;
}

/** Führt Anweisungen aus und liefert die Tabelle der letzten Abfrage (oder null). */
function letzteTabelle(db: Database, sql: string): SqlTabelle | null {
  const ergebnisse = db.exec(sql);
  const letzte = ergebnisse[ergebnisse.length - 1];
  return letzte ? { spalten: letzte.columns, zeilen: letzte.values as SqlTabelle["zeilen"] } : null;
}

/** Ergebnis, das die Prüfung für diese Aufgabe und diese Anweisungen sieht. */
function ergebnisFuer(uebung: SqlUebung, sql: string): SqlTabelle | null {
  const db = frischeDatenbank();
  try {
    db.exec(sql);
    return uebung.art === "abfrage" ? letzteTabelle(db, sql) : letzteTabelle(db, uebung.pruefAbfrage!);
  } finally {
    db.close();
  }
}

/** Wie ergebnisFuer, aber bei Abfragen wird die Abfrage nur einmal ausgeführt (db.exec liefert alle Ergebnisse). */
function pruefe(uebung: SqlUebung, sql: string) {
  const erwartet = ergebnisFuer(uebung, uebung.loesung);
  const gegeben = ergebnisFuer(uebung, sql);
  return vergleicheErgebnisse(erwartet, gegeben, uebung.geordnet ?? false);
}

const aufgabe = (id: string) => SQL_UEBUNGEN.find((uebung) => uebung.id === id)!;

describe("Beispieldatenbank", () => {
  it("entspricht den Beispieldaten der Theorie (5 Kunden, 5 Projekte, 7 Tickets)", () => {
    const db = frischeDatenbank();
    const anzahl = (tabelle: string) => db.exec(`SELECT COUNT(*) FROM ${tabelle}`)[0]!.values[0]![0];
    expect([anzahl("kunde"), anzahl("projekt"), anzahl("ticket")]).toEqual([5, 5, 7]);
    expect(db.exec("SELECT SUM(budget) FROM projekt")[0]!.values[0]![0]).toBe(182000);
  });

  it("beschreibt in SQL_TABELLEN genau die Spalten, die das Schema anlegt", () => {
    const db = frischeDatenbank();
    for (const tabelle of SQL_TABELLEN) {
      const spalten = db.exec(`SELECT name FROM pragma_table_info('${tabelle.name}') ORDER BY cid`)[0]!.values.map((zeile) => zeile[0]);
      expect(tabelle.spalten.map((spalte) => spalte.name)).toEqual(spalten);
    }
  });
});

describe("Übungsaufgaben", () => {
  it("hat eindeutige IDs und je Stufe mindestens fünf Aufgaben mit Tipps und Erklärung", () => {
    expect(new Set(SQL_UEBUNGEN.map((uebung) => uebung.id)).size).toBe(SQL_UEBUNGEN.length);
    for (const stufe of ["leicht", "mittel", "schwer"] as const) {
      expect(SQL_UEBUNGEN.filter((uebung) => uebung.stufe === stufe).length).toBeGreaterThanOrEqual(5);
    }
    for (const uebung of SQL_UEBUNGEN) {
      expect(uebung.tipps.length, uebung.id).toBeGreaterThanOrEqual(2);
      expect(uebung.erklaerung.length, uebung.id).toBeGreaterThan(20);
      if (uebung.art === "aenderung") expect(uebung.pruefAbfrage, uebung.id).toBeTruthy();
    }
  });

  for (const uebung of SQL_UEBUNGEN) {
    it(`${uebung.id}: Musterlösung läuft und besteht die eigene Prüfung`, () => {
      const ergebnis = ergebnisFuer(uebung, uebung.loesung);
      expect(ergebnis, "Ergebnistabelle").not.toBeNull();
      expect(ergebnis!.zeilen.length).toBeGreaterThan(0);
      expect(pruefe(uebung, uebung.loesung)).toEqual({ ok: true, hinweis: "Richtig!" });
    });
  }

  it("akzeptiert gleichwertige Lösungen (anderer Weg, Aliase, Schreibweise)", () => {
    expect(pruefe(aufgabe("kunden-ohne-projekt"), "select name from kunde where kunde_id not in (select kunde_id from projekt)").ok).toBe(true);
    expect(pruefe(aufgabe("kunden-ohne-projekt"), "SELECT name AS ohne FROM kunde k WHERE NOT EXISTS (SELECT 1 FROM projekt p WHERE p.kunde_id = k.kunde_id);").ok).toBe(true);
    expect(pruefe(aufgabe("projekte-ohne-ticket"), "SELECT titel FROM projekt WHERE projekt_id NOT IN (SELECT projekt_id FROM ticket)").ok).toBe(true);
    expect(pruefe(aufgabe("ueber-durchschnitt"), "SELECT titel FROM projekt WHERE budget > 36400").ok).toBe(true);
    expect(pruefe(aufgabe("budget-erhoehen"), "UPDATE projekt SET budget = budget * 110 / 100 WHERE bereich = 'IoT'").ok).toBe(true);
    expect(pruefe(aufgabe("tabelle-anlegen"), "CREATE TABLE mitarbeiter (mitarbeiter_id INTEGER PRIMARY KEY, name VARCHAR(50) NOT NULL, abteilung VARCHAR(30))").ok).toBe(true);
  });

  it("lehnt falsche Lösungen mit passendem Hinweis ab, ohne Musterzeilen zu verraten", () => {
    const falscheSpalten = pruefe(aufgabe("kunden-koeln"), "SELECT name FROM kunde WHERE ort = 'Köln' ORDER BY name");
    expect(falscheSpalten).toEqual({ ok: false, hinweis: "Deine Tabelle hat 1 Spalte(n), erwartet werden 2." });
    const falscheZeilen = pruefe(aufgabe("kunden-koeln"), "SELECT name, ort FROM kunde ORDER BY name");
    expect(falscheZeilen.ok).toBe(false);
    expect(falscheZeilen.hinweis).toBe("Deine Tabelle hat 5 Zeile(n), erwartet werden 2.");
    const falscheWerte = pruefe(aufgabe("kunden-koeln"), "SELECT name, ort FROM kunde WHERE ort = 'Hamburg' ORDER BY name");
    expect(falscheWerte.ok).toBe(false);
    expect(falscheWerte.hinweis).toContain("Werte unterscheiden sich");
    expect(falscheWerte.hinweis).not.toMatch(/Hartmann|Sonnenhof/);
  });

  it("verlangt bei geordneten Aufgaben die richtige Reihenfolge", () => {
    const ergebnis = pruefe(aufgabe("teure-projekte"), "SELECT titel, budget FROM projekt WHERE budget >= 30000 ORDER BY budget");
    expect(ergebnis.ok).toBe(false);
    expect(ergebnis.hinweis).toContain("Reihenfolge");
    // ungeordnete Aufgaben ignorieren die Reihenfolge
    expect(pruefe(aufgabe("iot-projekte"), "SELECT titel FROM projekt WHERE bereich = 'IoT' ORDER BY titel DESC").ok).toBe(true);
  });

  it("bewertet Änderungen am Ergebnis, nicht am Wortlaut: vergessenes WHERE und fehlende Wirkung fallen auf", () => {
    expect(pruefe(aufgabe("budget-erhoehen"), "UPDATE projekt SET budget = budget * 1.1").ok).toBe(false);
    expect(pruefe(aufgabe("tickets-loeschen"), "DELETE FROM ticket").ok).toBe(false);
    expect(pruefe(aufgabe("projekt-einfuegen"), "SELECT 1").ok).toBe(false);
  });

  it("meldet fehlende Ergebnistabelle bei Abfrageaufgaben", () => {
    const uebung = aufgabe("alle-kunden");
    expect(vergleicheErgebnisse(ergebnisFuer(uebung, uebung.loesung), null, false).hinweis).toContain("keine Ergebnistabelle");
  });
});

describe("vergleicheErgebnisse", () => {
  const tabelle = (zeilen: SqlTabelle["zeilen"]): SqlTabelle => ({ spalten: ["a"], zeilen });

  it("unterscheidet NULL, Zahl und Text und rundet Kommazahlen", () => {
    expect(vergleicheErgebnisse(tabelle([[null]]), tabelle([["NULL"]]), false).ok).toBe(false);
    expect(vergleicheErgebnisse(tabelle([[1]]), tabelle([["1"]]), false).ok).toBe(false);
    expect(vergleicheErgebnisse(tabelle([[35200 + 1e-11]]), tabelle([[35200]]), false).ok).toBe(true);
  });
});
