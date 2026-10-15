// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-K-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "industrie-beschaffung", "einspielen.cjs"), "utf8");
const ersetze = (alt, neu) => {
  if (!t.includes(alt)) throw new Error("Stelle fehlt: " + alt.slice(0, 60));
  t = t.replace(alt, neu);
};
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-L Industriefachwirt: neue Themen HQ3 7.5 und 7.6, Ergänzung in 7.4,\n// Fallaufgaben F-HQ3-05 bis -07, Fachgespräch).\n// Aufruf"
);
t = t.replace(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \{\};\nconst FAELLE = \[[\s\S]*?\n\];/, [
  "const NEUE_THEMEN = [",
  '  ["industrie-7.5-marketingplanung-lebenszyklus-marke.md", KURS + "/hq3/7.5-marketingplanung-produktlebenszyklus-marke.md"],',
  '  ["industrie-7.6-vertriebsplanung-prognose-verguetung.md", KURS + "/hq3/7.6-vertriebsplanung-absatzprognose-verguetung.md"],',
  "];",
  "const ERGAENZUNGEN = {",
  "  [KURS]: {",
  '    datei: "industrie-7.4-ergaenzung-interkulturelle-modelle.md",',
  '    abschnitte: [["A", "B", "C", "hq3/7.4-internationale-geschaeftsbeziehungen.md"]],',
  "  },",
  "};",
  "const FAELLE = [",
  '  ["industrie-faelle-a.md", KURS + "/hq3"],',
  '  ["industrie-faelle-b.md", KURS + "/hq3"],',
  '  ["industrie-faelle-c.md", KURS + "/hq3"],',
  "];",
].join("\n"));
if (!t.includes("industrie-7.5-marketingplanung")) throw new Error("Themenliste nicht ersetzt");
// strikte Textersetzung
ersetze("  let geaendert = false;\n", "");
ersetze(
  "    if (t.includes(alt)) {\n      t = t.split(alt).join(neu);\n      geaendert = true;\n    }\n  }\n  if (geaendert) schreibe(datei, t, crlf);",
  '    if (!t.includes(alt)) throw new Error("Textstelle fehlt in " + datei + ": " + alt);\n    t = t.split(alt).join(neu);\n  }\n  schreibe(datei, t, crlf);'
);
ersetze(
  'ersetzeInDatei(path.join(ziel, KURS, "hq2/fallaufgaben.md"), [["HQ2 (6.1–6.4)", "HQ2 (6.1–6.8)"]]);',
  [
    'ersetzeInDatei(path.join(ziel, KURS, "hq3/fallaufgaben.md"), [["HQ3 (7.1–7.4)", "HQ3 (7.1–7.6)"]]);',
    'ersetzeInDatei(path.join(ziel, KURS, "hq3/7.4-internationale-geschaeftsbeziehungen.md"), [',
    '  [',
    '    \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\',',
    '    \'rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\',',
    '  ],',
    ']);',
  ].join("\n")
);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
