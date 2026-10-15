// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-E-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "versicherung-kern", "einspielen.cjs"), "utf8");
t = t.replace(/^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/, "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-K Industriefachwirt: neue Themen HQ2 6.5 bis 6.8,\n// Fallaufgaben F-HQ2-05 bis -08, Fachgespräch).\n// Aufruf");
const a = t.indexOf("const KURS =");
const b = t.indexOf("function abschnitte(text)");
const konst = [
  'const KURS = "industriefachwirt";',
  "const NEUE_THEMEN = [",
  '  ["industrie-6.5-beschaffung-make-or-buy.md", KURS + "/hq2/6.5-beschaffung-make-or-buy-einkaufsverhandlung.md"],',
  '  ["industrie-6.6-lager-transport.md", KURS + "/hq2/6.6-lager-transportwesen.md"],',
  '  ["industrie-6.7-entsorgungslogistik.md", KURS + "/hq2/6.7-entsorgungslogistik-kreislaufwirtschaft.md"],',
  '  ["industrie-6.8-fertigungsorganisation-standort.md", KURS + "/hq2/6.8-fertigungsorganisation-fertigungstiefe-standort.md"],',
  "];",
  "const ERGAENZUNGEN = {};",
  "const FAELLE = [",
  '  ["industrie-faelle-a.md", KURS + "/hq2"],',
  '  ["industrie-faelle-b.md", KURS + "/hq2"],',
  '  ["industrie-faelle-c.md", KURS + "/hq2"],',
  '  ["industrie-faelle-d.md", KURS + "/hq2"],',
  "];",
  "",
  "",
].join("\n");
t = t.slice(0, a) + konst + t.slice(b);
const e = t.indexOf("ersetzeInDatei(path.join(ziel, KURS");
const g = t.indexOf('console.log("ok");');
const schluss = [
  'ersetzeInDatei(path.join(ziel, KURS, "hq2/fallaufgaben.md"), [["HQ2 (6.1–6.4)", "HQ2 (6.1–6.8)"]]);',
  "",
].join("\n");
t = t.slice(0, e) + schluss + t.slice(g);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("ok");
