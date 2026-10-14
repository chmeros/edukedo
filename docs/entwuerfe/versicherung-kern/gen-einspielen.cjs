// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem AEVO-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "aevo-kern", "einspielen.cjs"), "utf8");
t = t.replace(/^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/, "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-E Versicherungen und Finanzanlagen: neue Themen KB1 1.6 und 1.7,\n// Fallaufgaben F-KB1-05/-06, Fachgespräch).\n// Aufruf");
const a = t.indexOf("const NEUE_THEMEN");
const b = t.indexOf("function abschnitte(text)");
const konst = [
  'const KURS = "versicherungen-finanzanlagen";',
  "const NEUE_THEMEN = [",
  '  ["versicherung-1.6-finanzanlagen-grundlagen.md", KURS + "/kb1/1.6-finanzanlagen-grundlagen.md"],',
  '  ["versicherung-1.7-nachhaltigkeit.md", KURS + "/kb1/1.7-nachhaltigkeit.md"],',
  "];",
  "const ERGAENZUNGEN = {};",
  "const FAELLE = [",
  '  ["versicherung-faelle-a.md", KURS + "/kb1"],',
  '  ["versicherung-faelle-b.md", KURS + "/kb1"],',
  "];",
  "",
  "",
].join("\n");
t = t.slice(0, a) + konst + t.slice(b);
const e = t.indexOf("// Einleitungssätze (Themenbereiche)");
const g = t.indexOf('console.log("ok");');
const schluss = [
  "// Einleitungssätze (Themenbereiche)",
  "function ersetzeInDatei(datei, paare) {",
  "  const text = lies(datei);",
  "  const crlf = text.includes(String.fromCharCode(13, 10));",
  "  let t = lf(text);",
  "  let geaendert = false;",
  "  for (const [alt, neu] of paare) {",
  "    if (t.includes(alt)) {",
  "      t = t.split(alt).join(neu);",
  "      geaendert = true;",
  "    }",
  "  }",
  "  if (geaendert) schreibe(datei, t, crlf);",
  "}",
  'ersetzeInDatei(path.join(ziel, KURS, "kb1/fallaufgaben.md"), [["(1.1–1.5)", "(1.1–1.7)"], ["vier Teilaufgaben mit Punktangaben", "vier bis fünf Teilaufgaben mit Punktangaben"]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "kb1/fachgespraech.md"), [["(1.1–1.5)", "(1.1–1.7)"]]);',
  "",
].join("\n");
t = t.slice(0, e) + schluss + t.slice(g);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("ok");
