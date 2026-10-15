// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem AEVO-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "aevo-kern", "einspielen.cjs"), "utf8");
t = t.replace(/^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/, "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-J Versicherungen: neue Themen KP2 4.5 und 4.6, Ergänzung in 4.4,\n// Fallaufgaben F-KP2-05/-06/-07, Fachgespräch).\n// Aufruf");
const a = t.indexOf("const NEUE_THEMEN");
const b = t.indexOf("function abschnitte(text)");
const konst = [
  'const KURS = "versicherungen-finanzanlagen";',
  "const NEUE_THEMEN = [",
  '  ["versicherung-4.5-digitalisierung-ki-ethik.md", KURS + "/kp2/4.5-digitalisierung-insurtech-ki-ethik.md"],',
  '  ["versicherung-4.6-personalbedarf-arbeitswelt.md", KURS + "/kp2/4.6-personalbedarf-personalmarketing-arbeitswelt.md"],',
  "];",
  "const ERGAENZUNGEN = {",
  "  [KURS]: {",
  '    datei: "versicherung-4.4-ergaenzung-lernortkooperation-ausbildungsvertrag.md",',
  '    abschnitte: [["A", "B", "C", "kp2/4.4-berufsausbildung.md"]],',
  "  },",
  "};",
  "const FAELLE = [",
  '  ["versicherung-faelle-a.md", KURS + "/kp2"],',
  '  ["versicherung-faelle-b.md", KURS + "/kp2"],',
  '  ["versicherung-faelle-c.md", KURS + "/kp2"],',
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
  "  for (const [alt, neu] of paare) {",
  '    if (!t.includes(alt)) throw new Error("Textstelle fehlt in " + datei + ": " + alt);',
  "    t = t.split(alt).join(neu);",
  "  }",
  "  schreibe(datei, t, crlf);",
  "}",
  'ersetzeInDatei(path.join(ziel, KURS, "kp2/fallaufgaben.md"), [["KP2 (4.1–4.4)", "KP2 (4.1–4.6)"]]);',
  "",
].join("\n");
t = t.slice(0, e) + schluss + t.slice(g);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("ok");
