// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem P-R-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "wirtschaft-unternehmensfuehrung", "einspielen.cjs"), "utf8");
t = t.replace(
  /^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/,
  "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-S Wirtschaftsfachwirt: neue Themen HSQ3 3.4 Bedarfsermittlung und HSQ4 4.5\n// Produktlebenszyklus, Ergänzung in HSQ4 4.4, Fallaufgaben F-HSQ3-04, F-HSQ4-04, -05, Fachgespräch).\n// Aufruf"
);
const m = t.match(/const NEUE_THEMEN = \[[\s\S]*?\n\];\nconst ERGAENZUNGEN = \[[\s\S]*?\n\];\nconst FAELLE = \[[\s\S]*?\n\];/);
if (!m) throw new Error("Konstantenblock nicht gefunden");
t = t.replace(m[0], () =>
  [
    "const NEUE_THEMEN = [",
    '  ["wifa-3.4-bedarf-bestellmenge-make-or-buy.md", "wirtschaftsfachwirt/hsq3/3.4-bedarf-bestellmenge-make-or-buy.md"],',
    '  ["wifa-4.5-lebenszyklus-preiselastizitaet-verkaufsgespraech.md", "wirtschaftsfachwirt/hsq4/4.5-produktlebenszyklus-preiselastizitaet-verkaufsgespraech.md"],',
    "];",
    "const ERGAENZUNGEN = [",
    '  { datei: "wifa-4.4-ergaenzung-markterschliessung-kulturmodelle.md", abschnitte: [["A", "B", "C", "hsq4/4.4-internationale-geschaeftsbeziehungen.md"]] },',
    "];",
    "const FAELLE = [",
    '  ["wifa-faelle-a.md", "wirtschaftsfachwirt/hsq3"],',
    '  ["wifa-faelle-b.md", "wirtschaftsfachwirt/hsq4"],',
    '  ["wifa-faelle-c.md", "wirtschaftsfachwirt/hsq4"],',
    "];",
  ].join("\n")
);
const iEnde = t.indexOf("const RS_ALT =");
if (iEnde < 0) throw new Error("RS_ALT nicht gefunden");
t = t.slice(0, iEnde) + [
  'const RS_ALT = \'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"\';',
  'const RS_NEU = \'rechtsstand: "16.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"\';',
  'const WF = "wirtschaftsfachwirt";',
  'ersetzeInDatei(path.join(ziel, WF, "hsq3/fallaufgaben.md"), [',
  '  ["HSQ3 (3.1–3.3)", "HSQ3 (3.1–3.4)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, WF, "hsq3/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, WF, "hsq4/fallaufgaben.md"), [',
  '  ["HSQ4 (4.1–4.4)", "HSQ4 (4.1–4.5)"],',
  "  [RS_ALT, RS_NEU],",
  "]);",
  'ersetzeInDatei(path.join(ziel, WF, "hsq4/fachgespraech.md"), [[RS_ALT, RS_NEU]]);',
  'ersetzeInDatei(path.join(ziel, WF, "hsq4/4.4-internationale-geschaeftsbeziehungen.md"), [[RS_ALT, RS_NEU]]);',
  'console.log("ok");',
  "",
].join("\n");
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("einspielen.cjs erzeugt");
