import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import { beforeAll, describe, expect, it } from "vitest";
import { datensatzVon, SQL_ALLE_UEBUNGEN, SQL_DATENSAETZE, SQL_IMPORT_SCHEMA, SQL_IMPORT_TABELLEN, SQL_QUALITAET_UEBUNGEN } from "./sql-datenqualitaet";
import { vergleicheErgebnisse, type SqlTabelle, type SqlUebung } from "./sql-uebungen";

let SQL: SqlJsStatic;
beforeAll(async () => {
  SQL = await initSqlJs();
});

function frisch(uebung: SqlUebung): Database {
  const db = new SQL.Database();
  db.exec(SQL_DATENSAETZE[datensatzVon(uebung)].schema);
  return db;
}
function letzte(db: Database, sql: string): SqlTabelle | null {
  const e = db.exec(sql);
  const l = e[e.length - 1];
  return l ? { spalten: l.columns, zeilen: l.values as SqlTabelle["zeilen"] } : null;
}
function ergebnis(uebung: SqlUebung, sql: string): SqlTabelle | null {
  const db = frisch(uebung);
  try {
    db.exec(sql);
    return uebung.art === "abfrage" ? letzte(db, sql) : letzte(db, uebung.pruefAbfrage!);
  } finally {
    db.close();
  }
}
function pruefe(uebung: SqlUebung, sql: string) {
  return vergleicheErgebnisse(ergebnis(uebung, uebung.loesung), ergebnis(uebung, sql), uebung.geordnet ?? false);
}
const aufgabe = (id: string) => SQL_QUALITAET_UEBUNGEN.find((u) => u.id === id)!;
const werte = (id: string) => ergebnis(aufgabe(id), aufgabe(id).loesung)!.zeilen;
const spalte0 = (id: string) => werte(id).map((z) => z[0]);

describe("Importdaten", () => {
  it("haben 20 Kundenzeilen und 10 Bestellungen, alle E-Mail-Adressen mit der reservierten Endung .test", () => {
    const db = new SQL.Database();
    db.exec(SQL_IMPORT_SCHEMA);
    expect(db.exec("SELECT COUNT(*) FROM kunde_import")[0]!.values[0]![0]).toBe(20);
    expect(db.exec("SELECT COUNT(*) FROM bestellung_import")[0]!.values[0]![0]).toBe(10);
    const adressen = db.exec("SELECT email FROM kunde_import WHERE email LIKE '%@%'")[0]!.values.map((z) => String(z[0]));
    for (const adresse of adressen) expect(adresse.endsWith(".test")).toBe(true);
    db.close();
  });

  it("SQL_IMPORT_TABELLEN beschreibt genau die Spalten des Schemas", () => {
    const db = new SQL.Database();
    db.exec(SQL_IMPORT_SCHEMA);
    for (const tabelle of SQL_IMPORT_TABELLEN) {
      const spalten = db.exec(`SELECT name FROM pragma_table_info('${tabelle.name}') ORDER BY cid`)[0]!.values.map((z) => z[0]);
      expect(tabelle.spalten.map((s) => s.name)).toEqual(spalten);
    }
    db.close();
  });

  it("Übungs-IDs sind über alle Übungen eindeutig; Datenqualitäts-Aufgaben laufen auf den Importdaten", () => {
    const ids = SQL_ALLE_UEBUNGEN.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const u of SQL_QUALITAET_UEBUNGEN) expect(datensatzVon(u)).toBe("import");
    expect(SQL_QUALITAET_UEBUNGEN.map((u) => u.stufe).filter((s) => s === "leicht")).toHaveLength(3);
    expect(SQL_QUALITAET_UEBUNGEN.map((u) => u.stufe).filter((s) => s === "schwer").length).toBeGreaterThanOrEqual(5);
  });
});

describe("Musterlösungen liefern die erwarteten Befunde", () => {
  it("Mengenabgleich: 20 Zeilen, 18 verschiedene Kundennummern", () => {
    expect(werte("dq-mengenabgleich")).toEqual([[20, 18]]);
  });
  it("fehlende E-Mail: 2 NULL; mit leer und Platzhalter die Zeilen 3, 7, 11, 15", () => {
    expect(werte("dq-fehlende-email")).toEqual([[2]]);
    expect(spalte0("dq-platzhalter")).toEqual([3, 7, 11, 15]);
  });
  it("doppelte Kundennummern K002 und K003, je zweimal", () => {
    expect(werte("dq-doppelte-nummern")).toEqual([["K002", 2], ["K003", 2]]);
  });
  it("ungültiger Status Zeile 8, Postleitzahlen Zeilen 4 und 10, Geburtsjahre Zeilen 5 und 13, E-Mail ohne @ Zeile 9", () => {
    expect(spalte0("dq-ungueltiger-status")).toEqual([8]);
    expect(spalte0("dq-plz")).toEqual([4, 10]);
    expect(spalte0("dq-geburtsjahr")).toEqual([5, 13]);
    expect(spalte0("dq-email-format")).toEqual([9]);
  });
  it("Bestellungen: ohne Kunden 4 und 8, Lieferung vor Bestellung 5, ungültiges Datum 9", () => {
    expect(spalte0("dq-bestellung-ohne-kunde")).toEqual([4, 8]);
    expect(spalte0("dq-lieferung-vor-bestellung")).toEqual([5]);
    expect(spalte0("dq-ungueltiges-datum")).toEqual([9]);
  });
  it("Quoten: Vollständigkeit 80,0 Prozent, Fehlerquote der Bestellungen 50,0 Prozent, 10 Kunden ohne Bestellung", () => {
    expect(werte("dq-vollstaendigkeitsquote")).toEqual([[80]]);
    expect(werte("dq-fehlerquote-bestellungen")).toEqual([[50]]);
    expect(spalte0("dq-kunden-ohne-bestellung")).toEqual(["K004", "K006", "K008", "K009", "K010", "K011", "K013", "K014", "K016", "K017"]);
  });
  it("Dubletten entfernen löscht nur Zeile 6; Platzhalter bereinigen setzt die Zeilen 7 und 11 auf NULL", () => {
    expect(spalte0("dq-dubletten-entfernen")).toEqual([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    const bereinigt = werte("dq-platzhalter-bereinigen");
    expect(bereinigt.filter((z) => z[1] === null).map((z) => z[0])).toEqual([3, 7, 11, 15]);
  });
});

describe("Prüfung gegen die Musterlösung", () => {
  it("jede Musterlösung besteht ihre eigene Prüfung", () => {
    for (const u of SQL_QUALITAET_UEBUNGEN) expect(pruefe(u, u.loesung).ok, u.id).toBe(true);
  });

  it("gleichwertige Abfragen sind richtig", () => {
    expect(pruefe(aufgabe("dq-fehlende-email"), "SELECT COUNT(*) - COUNT(email) FROM kunde_import;").ok).toBe(true);
    expect(pruefe(aufgabe("dq-bestellung-ohne-kunde"), "SELECT b.bestell_id FROM bestellung_import b LEFT JOIN kunde_import k ON k.kunden_nr = b.kunden_nr WHERE k.zeile_id IS NULL;").ok).toBe(true);
    expect(pruefe(aufgabe("dq-plz"), "SELECT zeile_id FROM kunde_import WHERE plz NOT GLOB '[0-9][0-9][0-9][0-9][0-9]';").ok).toBe(true);
    expect(pruefe(aufgabe("dq-vollstaendigkeitsquote"), "SELECT ROUND(100.0 * COUNT(NULLIF(NULLIF(email, ''), 'k. A.')) / COUNT(*), 1) FROM kunde_import;").ok).toBe(true);
    expect(pruefe(aufgabe("dq-dubletten-entfernen"), "DELETE FROM kunde_import WHERE zeile_id = 6;").ok).toBe(true);
  });

  it("typische Fehlversuche werden abgelehnt, gleichwertige Randvarianten angenommen", () => {
    expect(pruefe(aufgabe("dq-platzhalter"), "SELECT zeile_id FROM kunde_import WHERE email IS NULL;").ok).toBe(false);
    expect(pruefe(aufgabe("dq-email-format"), "SELECT zeile_id FROM kunde_import WHERE email NOT LIKE '%@%';").ok).toBe(false);
    expect(pruefe(aufgabe("dq-ungueltiger-status"), "SELECT zeile_id FROM kunde_import WHERE status <> 'aktiv' AND status <> 'inaktiv';").ok).toBe(true);
    expect(pruefe(aufgabe("dq-lieferung-vor-bestellung"), "SELECT bestell_id FROM bestellung_import WHERE lieferdatum <= bestelldatum;").ok).toBe(true);
    expect(pruefe(aufgabe("dq-vollstaendigkeitsquote"), "SELECT ROUND(100 * COUNT(email) / COUNT(*), 1) FROM kunde_import;").ok).toBe(false);
    expect(pruefe(aufgabe("dq-dubletten-entfernen"), "DELETE FROM kunde_import WHERE kunden_nr IN ('K002', 'K003');").ok).toBe(false);
    expect(pruefe(aufgabe("dq-platzhalter-bereinigen"), "UPDATE kunde_import SET email = NULL;").ok).toBe(false);
    expect(pruefe(aufgabe("dq-doppelte-nummern"), "SELECT kunden_nr, COUNT(*) FROM kunde_import GROUP BY kunden_nr;").ok).toBe(false);
  });
});
