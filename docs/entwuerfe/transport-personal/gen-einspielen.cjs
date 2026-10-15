// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-E-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "versicherung-kern", "einspielen.cjs"), "utf8");
t = t.replace(/^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/, "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-I Transport: neue Themen HB3 3.5 und 3.6,\n// Fallaufgaben F-HB3-04/-05, Fachgespräch).\n// Aufruf");
const a = t.indexOf("const KURS =");
const b = t.indexOf("function abschnitte(text)");
const konst = [
  'const KURS = "transport-management-logistics";',
  "const NEUE_THEMEN = [",
  '  ["transport-3.5-personal-auswahl-einsatz-entwicklung.md", KURS + "/hb3/3.5-personal-auswahl-einsatz-entwicklung.md"],',
  '  ["transport-3.6-praesentieren-verhandeln-kundenberatung.md", KURS + "/hb3/3.6-praesentieren-verhandeln-kundenberatung.md"],',
  "];",
  "const ERGAENZUNGEN = {};",
  "const FAELLE = [",
  '  ["transport-faelle-a.md", KURS + "/hb3"],',
  '  ["transport-faelle-b.md", KURS + "/hb3"],',
  "];",
  "",
  "",
].join("\n");
t = t.slice(0, a) + konst + t.slice(b);
const e = t.indexOf("ersetzeInDatei(path.join(ziel, KURS");
const g = t.indexOf('console.log("ok");');
const schluss = [
  'ersetzeInDatei(path.join(ziel, KURS, "hb3/fallaufgaben.md"), [["HB3 (3.1–3.4)", "HB3 (3.1–3.6)"]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "hb3/fachgespraech.md"), [["(3.1–3.4)", "(3.1–3.6)"]]);',
  "",
].join("\n");
t = t.slice(0, e) + schluss + t.slice(g);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("ok");
