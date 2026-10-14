// Hilfsskript (nur zum Erzeugen von einspielen.cjs aus dem AEVO-Skript; nicht Teil des Einspielens).
const fs = require("fs");
const path = require("path");
let t = fs.readFileSync(path.join(__dirname, "..", "aevo-kern", "einspielen.cjs"), "utf8");

// 1. Kopf
t = t.replace(/^\/\/ Fügt[\s\S]*?\n\/\/ Aufruf/, "// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-D Transport: neue Themen 1.6, 2.7, 2.8, 2.9, Ergänzungen in 1.3 und 2.6,\n// Fallaufgaben F-HB1-05/-06 und F-HB2-06/-07, Fachgespräch).\n// Aufruf");

// 2. Konstanten
const a = t.indexOf("const NEUE_THEMEN");
const b = t.indexOf("function abschnitte(text)");
const konst = `const KURS = "transport-management-logistics";
const NEUE_THEMEN = [
  ["transport-1.6-marketingplan.md", KURS + "/hb1/1.6-marketingplan.md"],
  ["transport-2.7-ausschreibungen.md", KURS + "/hb2/2.7-ausschreibungen.md"],
  ["transport-2.8-kostenanalyse-kennzahlen-budget.md", KURS + "/hb2/2.8-kostenanalyse-kennzahlen-budget.md"],
  ["transport-2.9-lieferkettensicherheit-betrugspraevention.md", KURS + "/hb2/2.9-lieferkettensicherheit-betrugspraevention.md"],
];
const ERGAENZUNGEN = {
  [KURS]: {
    datei: "transport-themen-c.md",
    abschnitte: [
      ["A", "B", "C", "hb1/1.3-vertrieb-angebotskalkulation.md"],
      ["D", "E", "F", "hb2/2.6-qualitaets-umweltmanagement-logistik.md"],
    ],
  },
};
// Fall-Dateien; Fallaufgaben und Fachgesprächsabschnitte werden nach Fachgebiet geroutet (F-HB1-… und Abschnitte 1.x nach hb1, sonst hb2)
const FAELLE = ["transport-faelle-a.md", "transport-faelle-b.md", "transport-faelle-c.md"];

`;
t = t.slice(0, a) + konst + t.slice(b);

// 3. Schleife über die Fälle
const c = t.indexOf("for (const [datei, ordner] of FAELLE) {");
const d = t.indexOf("bestandFg();");
const schleife = `for (const datei of FAELLE) {
  const f = lf(lies(path.join(entw, datei)));
  const iFg = f.search(/^## Fachgesprächsfragen/m);
  if (iFg < 0) throw new Error("Fachgesprächsfragen fehlen: " + datei);
  const fallTeil = f.slice(0, iFg);
  const fgTeil = f.slice(iFg);
  const bloecke = [...fallTeil.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\\s\\S]*?(?=\\n---\\s*\\n|\\s*(?![\\s\\S]))/gm)].map((m) => m[0].trim());
  if (bloecke.length === 0) throw new Error("keine Fallaufgaben: " + datei);
  for (const blk of bloecke) {
    const id = blk.match(/^#### (F-[A-Z0-9-]+)/)[1];
    const ordner = id.startsWith("F-HB1-") ? "hb1" : "hb2";
    haengeAn(path.join(ziel, KURS, ordner, "fallaufgaben.md"), blk, "\\n\\n---\\n\\n");
  }
  const abschn = fgTeil.match(/^### [\\s\\S]*$/m);
  if (!abschn) throw new Error("keine Fachgesprächsabschnitte: " + datei);
  const teile = abschn[0].replace(/\\n---\\s*$/, "").split(/^(?=### )/m).filter((s) => s.trim());
  for (const teil of teile) {
    const nr = (teil.match(/^### (\\S+)/) || [])[1] || "";
    const ordner = nr.startsWith("1.") ? "hb1" : "hb2";
    fgEinfuegen(path.join(ziel, KURS, ordner, "fachgespraech.md"), teil);
  }
  console.log(datei, "Fälle:", bloecke.map((x) => x.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
}
`;
t = t.slice(0, c) + schleife + t.slice(d);

// 4. Schluss
const e = t.indexOf("// Einleitungssätze (Themenbereiche)");
const g = t.indexOf('console.log("ok");');
const schluss = `// Einleitungssätze (Themenbereiche)
function ersetzeInDatei(datei, paare) {
  const text = lies(datei);
  const crlf = text.includes(String.fromCharCode(13, 10));
  let t = lf(text);
  let geaendert = false;
  for (const [alt, neu] of paare) {
    if (t.includes(alt)) {
      t = t.split(alt).join(neu);
      geaendert = true;
    }
  }
  if (geaendert) schreibe(datei, t, crlf);
}
ersetzeInDatei(path.join(ziel, KURS, "hb1/fallaufgaben.md"), [["(1.1–1.5)", "(1.1–1.6)"]]);
ersetzeInDatei(path.join(ziel, KURS, "hb1/fachgespraech.md"), [["(1.1–1.5)", "(1.1–1.6)"]]);
ersetzeInDatei(path.join(ziel, KURS, "hb2/fallaufgaben.md"), [["(2.1–2.6)", "(2.1–2.9)"], ["vier Teilaufgaben mit Punktangaben", "vier bis fünf Teilaufgaben mit Punktangaben"]]);
ersetzeInDatei(path.join(ziel, KURS, "hb2/fachgespraech.md"), [["(2.1–2.6)", "(2.1–2.9)"]]);
`;
t = t.slice(0, e) + schluss + t.slice(g);
fs.writeFileSync(path.join(__dirname, "einspielen.cjs"), t);
console.log("ok");
