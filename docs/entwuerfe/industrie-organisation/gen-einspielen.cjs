// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-M-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "industrie-controlling", "einspielen.cjs"), "utf8");
const ersetze = (alt, neu) => {
  if (!t.includes(alt)) throw new Error("Stelle fehlt: " + alt.slice(0, 70));
  t = t.replace(alt, () => neu);
};
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-N Industriefachwirt: neue Themen HQ4 8.5 und WQ4 4.4, Ergänzung in\n// WQ4 4.1, Fallaufgaben F-HQ4-05, F-WQ4-04, F-WQ4-05, Fachgespräch).\n// Aufruf"
);
const m = t.match(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \[[\s\S]*?\n\];\nconst FAELLE = \[[\s\S]*?\n\];/);
if (!m) throw new Error("Konstantenblock nicht gefunden");
t = t.replace(m[0], () =>
  [
    "const NEUE_THEMEN = [",
    '  ["industrie-8.5-organisationsentwicklung-change.md", KURS + "/hq4/8.5-organisationsentwicklung-change-management.md"],',
    '  ["industrie-4.4-personalplanung-beurteilung-entgelt.md", KURS + "/wq4/4.4-personalplanung-beurteilung-entgelt.md"],',
    "];",
    "const ERGAENZUNGEN = [",
    '  { datei: "industrie-4.1-ergaenzung-organisationsformen-prozess-stelle.md", abschnitte: [["A", "B", "C", "wq4/4.1-betriebsorganisation.md"]] },',
    "];",
    "const FAELLE = [",
    '  ["industrie-faelle-a.md", KURS + "/hq4"],',
    '  ["industrie-faelle-b.md", KURS + "/wq4"],',
    '  ["industrie-faelle-c.md", KURS + "/wq4"],',
    "];",
  ].join("\n")
);
const iEnde = t.indexOf('const RS_ALT =');
if (iEnde < 0) throw new Error("RS_ALT nicht gefunden");
t = t.slice(0, iEnde) + [
  'const RS_ALT = \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\';',
  'const RS_NEU = \'rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\';',
  'ersetzeInDatei(path.join(ziel, KURS, "hq4/fallaufgaben.md"), [',
  '  ["HQ4 (8.1–8.4)", "HQ4 (8.1–8.5)"],',
  '  ["Ausgangssituation und vier Teilaufgaben", "Ausgangssituation und vier oder fünf Teilaufgaben"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, KURS, "wq4/fallaufgaben.md"), [',
  '  ["WQ4 (4.1–4.3)", "WQ4 (4.1–4.4)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, KURS, "hq4/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "wq4/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "wq4/4.1-betriebsorganisation.md"), [[RS_ALT, RS_NEU]]);',
  'console.log("ok");',
  "",
].join("\n");
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
