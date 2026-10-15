// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-L-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "industrie-marketing", "einspielen.cjs"), "utf8");
const ersetze = (alt, neu) => {
  if (!t.includes(alt)) throw new Error("Stelle fehlt: " + alt.slice(0, 70));
  t = t.replace(alt, () => neu);
};
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-M Industriefachwirt: neue Themen HQ1 5.4 und WQ2 2.6, Ergänzungen in\n// HQ1 5.2 und WQ1 1.2, Fallaufgaben F-HQ1-04, F-WQ2-09, F-HQ1-05, F-WQ1-04, Fachgespräch).\n// Aufruf"
);
const m = t.match(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \{[\s\S]*?\n\};\nconst FAELLE = \[[\s\S]*?\n\];/);
if (!m) throw new Error("Konstantenblock nicht gefunden");
t = t.replace(m[0], () =>
  [
    "const NEUE_THEMEN = [",
    '  ["industrie-5.4-controlling.md", KURS + "/hq1/5.4-controlling-steuerungsinstrument.md"],',
    '  ["industrie-2.6-kalkulation-prozesskosten-preisuntergrenze.md", KURS + "/wq2/2.6-kalkulationsverfahren-prozesskosten-preisuntergrenzen.md"],',
    "];",
    "const ERGAENZUNGEN = [",
    '  { datei: "industrie-5.2-ergaenzung-finanzierung-beurteilen.md", abschnitte: [["A", "B", "C", "hq1/5.2-finanzierungsarten.md"]] },',
    '  { datei: "industrie-1.2-ergaenzung-ziele-produktivitaet.md", abschnitte: [["A", "B", "C", "wq1/1.2-betriebliche-grundfunktionen.md"]] },',
    "];",
    "const FAELLE = [",
    '  ["industrie-faelle-a.md", KURS + "/hq1"],',
    '  ["industrie-faelle-b.md", KURS + "/wq2"],',
    '  ["industrie-faelle-c.md", KURS + "/hq1"],',
    '  ["industrie-faelle-d.md", KURS + "/wq1"],',
    "];",
  ].join("\n")
);
ersetze(
  "for (const [kurs, { datei, abschnitte: karten }] of Object.entries(ERGAENZUNGEN)) {",
  "for (const { datei, abschnitte: karten } of ERGAENZUNGEN) {"
);
ersetze("einfuegen(path.join(ziel, kurs, thema),", "einfuegen(path.join(ziel, KURS, thema),");
// Einleitungssätze und rechtsstand (strikt: fehlende Stelle bricht ab)
const iEnde = t.indexOf('ersetzeInDatei(path.join(ziel, KURS, "hq3/fallaufgaben.md")');
if (iEnde < 0) throw new Error("ersetzeInDatei-Aufrufe nicht gefunden");
t = t.slice(0, iEnde) + [
  'const RS_ALT = \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\';',
  'const RS_NEU = \'rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\';',
  'ersetzeInDatei(path.join(ziel, KURS, "hq1/fallaufgaben.md"), [',
  '  ["HQ1 (5.1–5.3)", "HQ1 (5.1–5.4)"],',
  '  ["Ausgangssituation und vier Teilaufgaben", "Ausgangssituation und vier oder fünf Teilaufgaben"],',
  "]);",
  'ersetzeInDatei(path.join(ziel, KURS, "wq2/fallaufgaben.md"), [["WQ2 (2.1–2.5)", "WQ2 (2.1–2.6)"]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "hq1/5.2-finanzierungsarten.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, KURS, "wq1/1.2-betriebliche-grundfunktionen.md"), [[RS_ALT, RS_NEU]]);',
  'console.log("ok");',
  "",
].join("\n");
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
