import { SQL_SCHLUESSELWOERTER, tokenisiereSql } from "./sql-highlight";
import { SQL_TABELLEN } from "./sql-uebungen";

/**
 * F-172: Autovervollständigung für den SQL-Editor der Übungsfläche (F-167). Reine Funktion: aus Text und
 * Cursorposition werden passende Vorschläge (Tabellen, Spalten, Schlüsselwörter) und der zu ersetzende
 * Bereich bestimmt. Bewusst klein gehalten — kein SQL-Parser, sondern Regeln, die für die Aufgaben der
 * Übungsfläche (SELECT/JOIN/GROUP BY, INSERT/UPDATE/DELETE, CREATE TABLE) ausreichen:
 * - nach FROM/JOIN/INTO/UPDATE/TABLE nur Tabellen,
 * - nach "tabelle." oder "alias." nur die Spalten dieser Tabelle (Aliase aus FROM/JOIN werden erkannt),
 * - sonst Spalten der in der Anweisung genannten Tabellen (ohne Nennung: aller Tabellen), Tabellen, Schlüsselwörter.
 * In Zeichenketten und Kommentaren gibt es keine Vorschläge.
 */
export type SqlVorschlagArt = "schluesselwort" | "tabelle" | "spalte";

export interface SqlVorschlag {
  /** Der einzufügende Text (Schlüsselwörter in Großbuchstaben). */
  text: string;
  art: SqlVorschlagArt;
  /** Kurzinfo für die Anzeige, z. B. "Spalte von projekt (INTEGER)". */
  hinweis: string;
}

export interface SqlVorschlagErgebnis {
  /** Beginn des Wortes, das ersetzt wird (Index im Text). */
  von: number;
  /** Ende des Wortes = Cursorposition. */
  bis: number;
  vorschlaege: SqlVorschlag[];
}

export const SQL_VORSCHLAEGE_MAX = 8;

/** Wörter, die nach einem Tabellennamen stehen und daher nie ein Alias sind. */
const KEIN_ALIAS = new Set(["WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "CROSS", "NATURAL", "ON", "USING", "GROUP", "ORDER", "HAVING", "LIMIT", "UNION", "SET", "VALUES", "AS"]);
/** Schlüsselwörter, nach denen ein Tabellenname folgt. */
const TABELLEN_KONTEXT = new Set(["FROM", "JOIN", "INTO", "UPDATE", "TABLE"]);

/** Liegt die Cursorposition mitten in einer Zeichenkette oder einem Kommentar? */
function istInZeichenketteOderKommentar(vorCursor: string): boolean {
  const tokens = tokenisiereSql(vorCursor);
  const letzter = tokens[tokens.length - 1];
  if (!letzter) return false;
  if (letzter.art === "zeichenkette") {
    // Ungerade Zahl von Hochkommas = noch offen (verdoppelte Hochkommas zählen doppelt).
    return (letzter.text.match(/'/g)?.length ?? 0) % 2 === 1;
  }
  if (letzter.art === "kommentar") {
    return letzter.text.startsWith("--") || !(letzter.text.length >= 4 && letzter.text.endsWith("*/"));
  }
  return false;
}

/** Tabellen (Name → Tabellenobjekt) und Aliase der Anweisung aus den FROM-/JOIN-Teilen. */
function tabellenDerAnweisung(text: string, tabellen: typeof SQL_TABELLEN) {
  const bekannt = new Map(tabellen.map((tabelle) => [tabelle.name.toLowerCase(), tabelle]));
  const genannt: typeof SQL_TABELLEN = [];
  const aliase = new Map<string, (typeof SQL_TABELLEN)[number]>();
  const muster = /\b(?:FROM|JOIN|INTO|UPDATE)\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+(?:AS\s+)?([A-Za-z_][A-Za-z0-9_]*))?/gi;
  for (const treffer of text.matchAll(muster)) {
    const tabelle = bekannt.get(treffer[1]!.toLowerCase());
    if (!tabelle) continue;
    if (!genannt.includes(tabelle)) genannt.push(tabelle);
    const alias = treffer[2];
    if (alias && !KEIN_ALIAS.has(alias.toUpperCase()) && !SQL_SCHLUESSELWOERTER.has(alias.toUpperCase())) aliase.set(alias.toLowerCase(), tabelle);
  }
  return { bekannt, genannt, aliase };
}

export function sqlVorschlaege(text: string, cursor: number, tabellen: typeof SQL_TABELLEN = SQL_TABELLEN): SqlVorschlagErgebnis | null {
  const vorCursor = text.slice(0, cursor);
  if (istInZeichenketteOderKommentar(vorCursor)) return null;

  const wortTreffer = /(?:([A-Za-z_][A-Za-z0-9_]*)\.)?([A-Za-z_][A-Za-z0-9_]*)?$/.exec(vorCursor);
  if (!wortTreffer) return null;
  const qualifizierer = wortTreffer[1];
  const wort = wortTreffer[2] ?? "";
  const von = cursor - wort.length;
  const klein = wort.toLowerCase();
  if (!qualifizierer && wort.length < 2) return null;

  const { bekannt, genannt, aliase } = tabellenDerAnweisung(text, tabellen);
  const spaltenVon = (tabelle: (typeof SQL_TABELLEN)[number]): SqlVorschlag[] =>
    tabelle.spalten.map((spalte) => ({ text: spalte.name, art: "spalte", hinweis: `Spalte von ${tabelle.name} (${spalte.typ})` }));
  const passt = (kandidat: string) => kandidat.toLowerCase().startsWith(klein);

  let kandidaten: SqlVorschlag[];
  if (qualifizierer) {
    const tabelle = bekannt.get(qualifizierer.toLowerCase()) ?? aliase.get(qualifizierer.toLowerCase());
    if (!tabelle) return null;
    kandidaten = spaltenVon(tabelle);
  } else {
    // Vorheriges Wort (vor dem aktuellen) bestimmt den Kontext.
    const davor = vorCursor.slice(0, von);
    const vorWort = /([A-Za-z_]+)\s*$/.exec(davor)?.[1]?.toUpperCase();
    const tabellenVorschlaege: SqlVorschlag[] = tabellen.map((tabelle) => ({ text: tabelle.name, art: "tabelle", hinweis: `Tabelle (${tabelle.spalten.length} Spalten)` }));
    if (vorWort && TABELLEN_KONTEXT.has(vorWort)) {
      kandidaten = tabellenVorschlaege;
    } else {
      const spaltenQuelle = genannt.length > 0 ? genannt : tabellen;
      const spalten = spaltenQuelle.flatMap(spaltenVon).filter((vorschlag, index, alle) => alle.findIndex((x) => x.text === vorschlag.text) === index);
      const schluesselwoerter: SqlVorschlag[] = [...SQL_SCHLUESSELWOERTER].map((wortText) => ({ text: wortText, art: "schluesselwort", hinweis: "Schlüsselwort" }));
      kandidaten = [...spalten, ...tabellenVorschlaege, ...schluesselwoerter];
    }
  }

  const treffer = kandidaten.filter((kandidat) => passt(kandidat.text));
  // Ein einziger Treffer, der schon vollständig dasteht, braucht keinen Vorschlag.
  if (treffer.length === 1 && treffer[0]!.text.toLowerCase() === klein) return null;
  if (treffer.length === 0) return null;
  return { von, bis: cursor, vorschlaege: treffer.slice(0, SQL_VORSCHLAEGE_MAX) };
}
