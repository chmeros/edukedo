import { SQL_DATENSAETZE, vergleicheErgebnisse, type SqlDatensatzId, type SqlTabelle } from "@edukedo/shared";
import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import type { SqlAnfrage, SqlAnzeigeTabelle, SqlAntwort } from "./sqlSandbox";

/**
 * F-167: Web Worker der SQL-Übungsfläche. Lädt SQLite (sql.js/WebAssembly), legt die Beispieldatenbank
 * (SQL_SCHEMA) im Arbeitsspeicher an und führt Anweisungen der Lernenden aus. Keine Netzwerkzugriffe,
 * keine Persistenz: Beim Schließen der Seite oder `zuruecksetzen` ist alles weg. Zum Prüfen werden
 * Lösung und Eingabe je auf einer frisch aufgebauten Datenbank ausgeführt, sodass Änderungen
 * (INSERT/UPDATE/DELETE/DDL) die Übungsdatenbank der Sitzung nicht verfälschen.
 */
const ANZEIGE_MAX_ZEILEN = 200;
const PRUEF_MAX_ZEILEN = 10000;

const kontext = self as unknown as {
  onmessage: ((event: MessageEvent<SqlAnfrage>) => void) | null;
  postMessage: (nachricht: SqlAntwort) => void;
};

let sqlModul: Promise<SqlJsStatic> | null = null;
/** Eine Sitzungsdatenbank je Datensatz (Projektdaten, Importdaten), damit der Wechsel keine Änderungen verwirft. */
const sitzungen = new Map<SqlDatensatzId, Database>();

function lade(): Promise<SqlJsStatic> {
  sqlModul ??= initSqlJs({ locateFile: () => wasmUrl });
  return sqlModul;
}

/**
 * Review WRK-14: Der Watchdog (5 s) begrenzt nur die Zeit. Zusätzlich ist die Größe der Datenbank (4.000 Seiten, rund 16 MB) und die
 * Länge einer Eingabe begrenzt; ein rekursives INSERT oder eine riesige Anweisung scheitert so mit einer Meldung, statt den
 * Arbeitsspeicher des Browsers zu füllen.
 */
const MAX_SEITEN = 4000;
const MAX_SQL_ZEICHEN = 20000;

function neueDatenbank(SQL: SqlJsStatic, datensatz: SqlDatensatzId): Database {
  const db = new SQL.Database();
  db.exec(SQL_DATENSAETZE[datensatz].schema);
  db.exec(`PRAGMA max_page_count = ${MAX_SEITEN};`);
  return db;
}

function wert(zelle: unknown): string | number | null {
  if (zelle === null || typeof zelle === "string" || typeof zelle === "number") return zelle;
  if (zelle instanceof Uint8Array) return `[BLOB, ${zelle.length} Byte]`;
  return String(zelle);
}

/** Führt alle Anweisungen nacheinander aus; Ergebnistabellen und Zahl der geänderten Zeilen werden gesammelt. */
function fuehreAus(db: Database, sql: string, maxZeilen: number): { tabellen: SqlAnzeigeTabelle[]; geaendert: number } {
  const tabellen: SqlAnzeigeTabelle[] = [];
  let geaendert = 0;
  for (const anweisung of db.iterateStatements(sql)) {
    const spalten = anweisung.getColumnNames();
    const zeilen: SqlTabelle["zeilen"] = [];
    let gesamt = 0;
    while (anweisung.step()) {
      gesamt += 1;
      if (zeilen.length < maxZeilen) zeilen.push(anweisung.get().map(wert));
    }
    if (spalten.length > 0) tabellen.push({ spalten, zeilen, gesamtZeilen: gesamt });
    else geaendert += db.getRowsModified();
  }
  return { tabellen, geaendert };
}

function letzte(tabellen: SqlAnzeigeTabelle[]): SqlTabelle | null {
  const ergebnis = tabellen[tabellen.length - 1];
  return ergebnis ? { spalten: ergebnis.spalten, zeilen: ergebnis.zeilen } : null;
}

/** Zustand, den die Prüfung vergleicht: letzte Abfrage bzw. Prüfabfrage nach den Änderungen. */
function pruefTabelle(db: Database, sql: string, art: "abfrage" | "aenderung", pruefAbfrage: string | undefined): SqlTabelle | null {
  const ausfuehrung = fuehreAus(db, sql, PRUEF_MAX_ZEILEN);
  if (art === "abfrage") return letzte(ausfuehrung.tabellen);
  return letzte(fuehreAus(db, pruefAbfrage ?? "SELECT 1", PRUEF_MAX_ZEILEN).tabellen);
}

async function bearbeite(anfrage: SqlAnfrage): Promise<SqlAntwort> {
  try {
    // Review WRK-33: Scheitert das Laden von sql.js/WebAssembly, kommt eine Fehlermeldung statt nach 5 s "läuft zu lange".
    const SQL = await lade();
    if ("sql" in anfrage && anfrage.sql.length > MAX_SQL_ZEICHEN) {
      throw new Error(`Die Anweisung ist zu lang (höchstens ${MAX_SQL_ZEICHEN} Zeichen).`);
    }
    if (anfrage.art === "zuruecksetzen") {
      sitzungen.get(anfrage.datensatz)?.close();
      sitzungen.set(anfrage.datensatz, neueDatenbank(SQL, anfrage.datensatz));
      return { id: anfrage.id, ok: true, art: "zuruecksetzen" };
    }
    if (anfrage.art === "ausfuehren") {
      let sitzung = sitzungen.get(anfrage.datensatz);
      if (!sitzung) {
        sitzung = neueDatenbank(SQL, anfrage.datensatz);
        sitzungen.set(anfrage.datensatz, sitzung);
      }
      const start = performance.now();
      const { tabellen, geaendert } = fuehreAus(sitzung, anfrage.sql, ANZEIGE_MAX_ZEILEN);
      return { id: anfrage.id, ok: true, art: "ausfuehren", tabellen, geaendert, dauerMs: Math.round(performance.now() - start) };
    }
    // Prüfen: Musterlösung und Eingabe je auf frischer Datenbank
    const { uebung } = anfrage;
    const musterDb = neueDatenbank(SQL, anfrage.datensatz);
    const eingabeDb = neueDatenbank(SQL, anfrage.datensatz);
    try {
      const erwartet = pruefTabelle(musterDb, uebung.loesung, uebung.art, uebung.pruefAbfrage);
      const gegeben = pruefTabelle(eingabeDb, anfrage.sql, uebung.art, uebung.pruefAbfrage);
      const vergleich = vergleicheErgebnisse(erwartet, gegeben, uebung.geordnet ?? false);
      return { id: anfrage.id, ok: true, art: "pruefen", richtig: vergleich.ok, hinweis: vergleich.hinweis };
    } finally {
      musterDb.close();
      eingabeDb.close();
    }
  } catch (fehler) {
    return { id: anfrage.id, ok: false, fehler: fehler instanceof Error ? fehler.message : String(fehler) };
  }
}

kontext.onmessage = (event) => {
  void bearbeite(event.data).then((antwort) => kontext.postMessage(antwort));
};
