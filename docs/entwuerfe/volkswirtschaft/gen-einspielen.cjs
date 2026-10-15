// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-N-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "industrie-organisation", "einspielen.cjs"), "utf8");
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-O Volkswirtschaft: neues Thema 1.5 im Industriefachwirt (WQ1) und im\n// Wirtschaftsfachwirt (WBQ1), Fallaufgaben F-WQ1-05 und F-WBQ1-04, Fachgespräch).\n// Aufruf"
);
const m = t.match(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \[[\s\S]*?\n\];\nconst FAELLE = \[[\s\S]*?\n\];/);
if (!m) throw new Error("Konstantenblock nicht gefunden");
t = t.replace(m[0], () =>
  [
    "const NEUE_THEMEN = [",
    '  ["industrie-1.5-wirtschaftspolitik-geld-inflation.md", KURS + "/wq1/1.5-wirtschaftspolitik-geld-inflation.md"],',
    '  ["wifa-1.5-wirtschaftspolitik-geld-inflation.md", "wirtschaftsfachwirt/wbq1/1.5-wirtschaftspolitik-geld-inflation.md"],',
    "];",
    "const ERGAENZUNGEN = [];",
    "const FAELLE = [",
    '  ["industrie-faelle.md", KURS + "/wq1"],',
    '  ["wifa-faelle.md", "wirtschaftsfachwirt/wbq1"],',
    "];",
  ].join("\n")
);
const iEnde = t.indexOf("const RS_ALT =");
if (iEnde < 0) throw new Error("RS_ALT nicht gefunden");
t = t.slice(0, iEnde) + [
  'const RS_ALT = \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\';',
  'const RS_NEU = \'rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\';',
  'ersetzeInDatei(path.join(ziel, KURS, "wq1/fallaufgaben.md"), [',
  '  ["WQ1 (1.1–1.4)", "WQ1 (1.1–1.5)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, KURS, "wq1/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, "wirtschaftsfachwirt", "wbq1/fallaufgaben.md"), [',
  '  ["WBQ1 (1.1–1.4)", "WBQ1 (1.1–1.5)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, "wirtschaftsfachwirt", "wbq1/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'console.log("ok");',
  "",
].join("\n");
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
