/**
 * F-170: Zerlegt SQL-Text in Abschnitte für die Syntaxhervorhebung der SQL-Übungsfläche (F-167).
 * Bewusst klein und ohne Abhängigkeit: ein einfacher Zeichen-Scanner statt eines SQL-Parsers — es geht nur um
 * Farben, nicht um Gültigkeit. Die Zerlegung ist **verlustfrei** (die Texte aller Abschnitte ergeben wieder genau
 * die Eingabe), damit eine über dem Eingabefeld liegende Hervorhebung Zeichen für Zeichen deckungsgleich bleibt.
 * Unvollständige Eingaben (offene Zeichenkette oder offener Kommentar) färben bis zum Ende ein, statt Fehler zu werfen.
 */
export type SqlTokenArt = "schluesselwort" | "zeichenkette" | "zahl" | "kommentar" | "bezeichner" | "text";

export interface SqlToken {
  art: SqlTokenArt;
  text: string;
}

/** Schlüsselwörter, Datentypen und gängige Funktionen aus den Aufgaben der SQL-Übungsfläche (SQLite-Dialekt). */
const SQL_SCHLUESSELWOERTER: ReadonlySet<string> = new Set(
  (
    "SELECT FROM WHERE AND OR NOT IN IS NULL LIKE BETWEEN ORDER BY GROUP HAVING JOIN INNER LEFT RIGHT FULL OUTER CROSS NATURAL ON USING AS " +
    "DISTINCT LIMIT OFFSET UNION INTERSECT EXCEPT ALL ANY EXISTS CASE WHEN THEN ELSE END ASC DESC " +
    "INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE ALTER ADD COLUMN DROP RENAME TO INDEX VIEW TRIGGER " +
    "PRIMARY KEY FOREIGN REFERENCES DEFAULT UNIQUE CHECK CONSTRAINT AUTOINCREMENT IF WITH " +
    "BEGIN COMMIT ROLLBACK TRANSACTION GRANT REVOKE TRUE FALSE " +
    "INTEGER INT TEXT REAL NUMERIC VARCHAR CHAR DATE DATETIME BOOLEAN BLOB FLOAT DOUBLE DECIMAL " +
    "COUNT SUM AVG MIN MAX ROUND LENGTH UPPER LOWER SUBSTR COALESCE IFNULL CAST ABS"
  ).split(" "),
);

const WORT = /[A-Za-z_À-ɏ][A-Za-z0-9_À-ɏ]*/y;
const ZAHL = /[0-9]+(?:\.[0-9]+)?/y;

export function tokenisiereSql(sql: string): SqlToken[] {
  const tokens: SqlToken[] = [];
  const hinzu = (art: SqlTokenArt, text: string) => {
    const letzter = tokens[tokens.length - 1];
    if (art === "text" && letzter?.art === "text") letzter.text += text;
    else tokens.push({ art, text });
  };

  let i = 0;
  while (i < sql.length) {
    const zeichen = sql[i]!;
    const naechstes = sql[i + 1];

    if (zeichen === "-" && naechstes === "-") {
      const ende = sql.indexOf("\n", i);
      const bis = ende < 0 ? sql.length : ende;
      hinzu("kommentar", sql.slice(i, bis));
      i = bis;
    } else if (zeichen === "/" && naechstes === "*") {
      const schluss = sql.indexOf("*/", i + 2);
      const bis = schluss < 0 ? sql.length : schluss + 2;
      hinzu("kommentar", sql.slice(i, bis));
      i = bis;
    } else if (zeichen === "'") {
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            j += 2; // verdoppeltes Hochkomma = Hochkomma im Text
            continue;
          }
          j += 1;
          break;
        }
        j += 1;
      }
      hinzu("zeichenkette", sql.slice(i, j));
      i = j;
    } else if (zeichen === '"' || zeichen === "`") {
      const schluss = sql.indexOf(zeichen, i + 1);
      const bis = schluss < 0 ? sql.length : schluss + 1;
      hinzu("bezeichner", sql.slice(i, bis));
      i = bis;
    } else {
      WORT.lastIndex = i;
      const wort = WORT.exec(sql);
      if (wort) {
        hinzu(SQL_SCHLUESSELWOERTER.has(wort[0].toUpperCase()) ? "schluesselwort" : "text", wort[0]);
        i += wort[0].length;
        continue;
      }
      ZAHL.lastIndex = i;
      const zahl = ZAHL.exec(sql);
      if (zahl) {
        hinzu("zahl", zahl[0]);
        i += zahl[0].length;
        continue;
      }
      hinzu("text", zeichen);
      i += 1;
    }
  }
  return tokens;
}
