// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-B Rechnungswesen und Kennzahlen: Industriefachwirt WQ2 2.4/2.5, Wirtschaftsfachwirt WBQ2 2.4/2.5, Handelsfachwirt HB1 1.5).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

// [Entwurfsdatei, Ziel relativ zur Content-Wurzel]
const NEUE_THEMEN = [
  ["industrie-2.4-buchungssaetze-abschlussbuchungen.md", "industriefachwirt/wq2/2.4-buchungssaetze-abschlussbuchungen.md"],
  ["industrie-2.5-bilanz-kennzahlenanalyse.md", "industriefachwirt/wq2/2.5-bilanz-kennzahlenanalyse.md"],
  ["wifa-2.4-buchungssaetze-abschlussbuchungen.md", "wirtschaftsfachwirt/wbq2/2.4-buchungssaetze-abschlussbuchungen.md"],
  ["wifa-2.5-bilanz-kennzahlenanalyse.md", "wirtschaftsfachwirt/wbq2/2.5-bilanz-kennzahlenanalyse.md"],
  ["handel-1.5-kosten-leistungsrechnung.md", "handelsfachwirt/hb1/1.5-kosten-leistungsrechnung.md"],
];
// [Fall-Datei, Zielordner relativ zur Content-Wurzel]
const FAELLE = [
  ["industrie-faelle.md", "industriefachwirt/wq2"],
  ["wifa-faelle.md", "wirtschaftsfachwirt/wbq2"],
  ["handel-faelle.md", "handelsfachwirt/hb1"],
];

function haengeAn(zieldatei, block, trenner) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = lf(text).replace(/\s+$/, "");
  schreibe(zieldatei, t + trenner + block.trim() + "\n", crlf);
}

for (const [quelle, rel] of NEUE_THEMEN) {
  const zielDatei = path.join(ziel, rel);
  if (fs.existsSync(zielDatei)) throw new Error("existiert bereits: " + rel);
  fs.writeFileSync(zielDatei, lf(lies(path.join(entw, quelle))).replace(/\s+$/, "") + "\n");
}

for (const [datei, ordner] of FAELLE) {
  const f = lf(lies(path.join(entw, datei)));
  const iFg = f.search(/^## Fachgesprächsfragen/m);
  if (iFg < 0) throw new Error("Fachgesprächsfragen fehlen: " + datei);
  const fallTeil = f.slice(0, iFg);
  const fgTeil = f.slice(iFg);
  const bloecke = [...fallTeil.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => m[0].trim());
  if (bloecke.length === 0) throw new Error("keine Fallaufgaben: " + datei);
  const fallDatei = path.join(ziel, ordner, "fallaufgaben.md");
  for (const b of bloecke) haengeAn(fallDatei, b, "\n\n---\n\n");
  // Fachgespräch: die Abschnitte ab dem ersten „### “ anhängen
  const abschnitte = fgTeil.match(/^### [\s\S]*$/m);
  if (!abschnitte) throw new Error("keine Fachgesprächsabschnitte: " + datei);
  const fgDatei = path.join(ziel, ordner, "fachgespraech.md");
  haengeAn(fgDatei, abschnitte[0].replace(/\n---\s*$/, ""), "\n\n");
  for (const d of [fallDatei, fgDatei]) {
    for (const [alt, neu] of [["(1.1–1.4)", "(1.1–1.5)"], ["(2.1–2.3)", "(2.1–2.5)"]]) {
      const t = lies(d);
      if (lf(t).includes(alt)) schreibe(d, lf(t).split(alt).join(neu), t.includes("\r\n"));
    }
  }
  console.log(ordner, "Fälle:", bloecke.map((b) => b.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
}
// Klarstellung im Bestand: ROI-Gewinngröße in hsq2/2.4 (Befund der Prüfung Wirtschaftsfachwirt)
{
  const datei = path.join(ziel, "wirtschaftsfachwirt", "hsq2", "2.4-controlling.md");
  const text = lies(datei);
  const crlf = text.includes("\r\n");
  let t = lf(text);
  const ersetzungen = [
    [
      "zwei unterschiedliche Stellhebel, die im Controlling gezielt adressiert werden können.",
      "zwei unterschiedliche Stellhebel, die im Controlling gezielt adressiert werden können. Mit „Gewinn“ ist hier vereinfacht der Gewinn gemeint; in der Bilanzanalyse (Thema 2.5 im Fachgebiet WBQ2) wird der ROI als Gesamtkapitalrentabilität mit dem Gewinn vor Fremdkapitalzinsen gerechnet. Welche Gewinngröße gilt, gibt die Aufgabe vor.",
    ],
    [
      "**Antwort:** ROI = Umsatzrentabilität × Kapitalumschlag.\n",
      "**Antwort:** ROI = Umsatzrentabilität × Kapitalumschlag (mit „Gewinn“ vereinfacht; in der Bilanzanalyse WBQ2 2.5 mit dem Gewinn vor Fremdkapitalzinsen; maßgeblich ist die Vorgabe der Aufgabe).\n",
    ],
  ];
  for (const [alt, neu] of ersetzungen) {
    if (!t.includes(alt)) throw new Error("hsq2/2.4: Stelle fehlt: " + alt.slice(0, 50));
    t = t.replace(alt, neu);
  }
  schreibe(datei, t, crlf);
}
console.log("ok");
