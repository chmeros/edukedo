// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-O-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "volkswirtschaft", "einspielen.cjs"), "utf8");
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-Q Wirtschaftsfachwirt: neues Thema HSQ2 2.5, Ergänzungen in HSQ2 2.2\n// und 2.3, Fallaufgaben F-HSQ2-04, -05, -06, Fachgespräch).\n// Aufruf"
);
const m = t.match(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \[\];\nconst FAELLE = \[[\s\S]*?\n\];/);
if (!m) throw new Error("Konstantenblock nicht gefunden");
t = t.replace(m[0], () =>
  [
    "const NEUE_THEMEN = [",
    '  ["wifa-2.5-finanzplanung-finanzbedarf.md", "wirtschaftsfachwirt/hsq2/2.5-finanzplanung-finanzbedarf.md"],',
    "];",
    "const ERGAENZUNGEN = [",
    '  { datei: "wifa-2.2-ergaenzung-finanzierung-beurteilen.md", abschnitte: [["A", "B", "C", "hsq2/2.2-finanzierungsarten.md"]] },',
    '  { datei: "wifa-2.3-ergaenzung-prozesskosten-target-costing.md", abschnitte: [["A", "B", "C", "hsq2/2.3-kosten-leistungsrechnung-vertieft.md"]] },',
    "];",
    "const FAELLE = [",
    '  ["wifa-faelle-a.md", "wirtschaftsfachwirt/hsq2"],',
    '  ["wifa-faelle-b.md", "wirtschaftsfachwirt/hsq2"],',
    '  ["wifa-faelle-c.md", "wirtschaftsfachwirt/hsq2"],',
    "];",
  ].join("\n")
);
// einfuegen() arbeitet mit KURS: die Ergänzungen liegen im Wirtschaftsfachwirt
if (!t.includes("einfuegen(path.join(ziel, KURS, thema),")) throw new Error("einfuegen-Aufruf nicht gefunden");
t = t.replace("einfuegen(path.join(ziel, KURS, thema),", 'einfuegen(path.join(ziel, "wirtschaftsfachwirt", thema),');
const iEnde = t.indexOf("const RS_ALT =");
if (iEnde < 0) throw new Error("RS_ALT nicht gefunden");
t = t.slice(0, iEnde) + [
  'const RS_ALT = \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\';',
  'const RS_NEU = \'rechtsstand: "15.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\';',
  'const WF = "wirtschaftsfachwirt";',
  'ersetzeInDatei(path.join(ziel, WF, "hsq2/fallaufgaben.md"), [',
  '  ["HSQ2 (2.1–2.4)", "HSQ2 (2.1–2.5)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, WF, "hsq2/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, WF, "hsq2/2.2-finanzierungsarten.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, WF, "hsq2/2.3-kosten-leistungsrechnung-vertieft.md"), [[RS_ALT, RS_NEU]]);',
  'console.log("ok");',
  "",
].join("\n");
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
