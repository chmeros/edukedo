// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (Immobilienfachwirt und Gesundheit/Soziales).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const THEMEN = {
  immobilienfachwirt: [
    { datei: "immo-hb2.md", abschnitte: [["A", "B", "C", "hb2/2.2-investitions-finanzierungsrechnung.md"], ["D", "E", "F", "hb2/2.3-controlling-kennzahlen.md"]] },
    {
      datei: "immo-hb4-hb5.md",
      abschnitte: [
        ["A", "B", "C", "hb4/4.4-betriebskostenabrechnung.md"],
        ["D", "E", "F", "hb5/5.1-projektentwicklung.md"],
        ["G", "H", "I", "hb5/5.3-baurecht-grundzuege.md"],
        ["J", "K", "L", "hb5/5.4-kosten-terminplanung-bau.md"],
      ],
    },
    { datei: "immo-hb6.md", abschnitte: [["A", "B", "C", "hb6/6.3-immobilienbewertung-grundzuege.md"]] },
  ],
  "fachwirt-gesundheit-soziales": [
    {
      datei: "gs-hb4.md",
      abschnitte: [
        ["A", "B", "C", "hb4/4.1-rechnungswesen-jahresabschluss.md"],
        ["D", "E", "F", "hb4/4.3-kosten-leistungsrechnung.md"],
        ["G", "H", "I", "hb4/4.4-controlling-kennzahlen.md"],
      ],
    },
    {
      datei: "gs-hb5-hb6.md",
      abschnitte: [
        ["A", "B", "C", "hb5/5.1-personalplanung-auswahl.md"],
        ["D", "E", "F", "hb5/5.4-personalentwicklung.md"],
        ["G", "H", "I", "hb6/6.2-marktanalyse-ziele.md"],
      ],
    },
  ],
};
const FAELLE = {
  immobilienfachwirt: { datei: "immo-faelle.md", ziele: { "F-HB2-": "hb2", "F-HB4-": "hb4", "F-HB5-": "hb5", "F-HB6-": "hb6" } },
  "fachwirt-gesundheit-soziales": { datei: "gs-faelle.md", ziele: { "F-HB4-": "hb4", "F-HB5-": "hb5", "F-HB6-": "hb6" } },
};

const lies = (p) => fs.readFileSync(p, "utf8");

function abschnitte(text) {
  const norm = text.replace(/\r\n/g, "\n");
  const treffer = [...norm.matchAll(/^## ([A-L])\. .*$/gm)];
  const aus = {};
  treffer.forEach((t, i) => {
    const start = t.index + t[0].length;
    const ende = i + 1 < treffer.length ? treffer[i + 1].index : norm.length;
    let block = norm.slice(start, ende);
    block = block.replace(/\n---\s*\n+# Teil [0-9][^\n]*\n*$/, "\n").replace(/\n---\s*$/, "\n");
    aus[t[1]] = block.trim();
  });
  return aus;
}

function einfuegen(zieldatei, { theorie, karten, quiz }) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = text.replace(/\r\n/g, "\n");
  const iKarten = t.indexOf("\n## Karteikarten");
  const iQuiz = t.indexOf("\n## Quiz");
  if (iKarten < 0 || iQuiz < 0 || !theorie || !karten || !quiz) throw new Error("Abschnitte fehlen: " + zieldatei);
  const kopf = t.slice(0, iKarten).replace(/\s+$/, "");
  const mitte = t.slice(iKarten, iQuiz).replace(/\s+$/, "");
  const ende = t.slice(iQuiz).replace(/\s+$/, "");
  const neu = [kopf, "", theorie, "", mitte, "", karten, "", ende, "", quiz, ""].join("\n");
  fs.writeFileSync(zieldatei, crlf ? neu.replace(/\n/g, "\r\n") : neu);
}

function haengeFaelleAn(zieldatei, faelle) {
  if (faelle.length === 0) return;
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = text.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const neu = t + "\n\n---\n\n" + faelle.join("\n\n---\n\n") + "\n";
  fs.writeFileSync(zieldatei, crlf ? neu.replace(/\n/g, "\r\n") : neu);
}

for (const [kurs, dateien] of Object.entries(THEMEN)) {
  for (const { datei, abschnitte: karten } of dateien) {
    const a = abschnitte(lies(path.join(entw, datei)));
    for (const [th, ka, qu, thema] of karten) {
      einfuegen(path.join(ziel, kurs, thema), { theorie: a[th], karten: a[ka], quiz: a[qu] });
    }
  }
  const { datei, ziele } = FAELLE[kurs];
  const fall = lies(path.join(entw, datei)).replace(/\r\n/g, "\n");
  const bloecke = [...fall.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => ({ id: m[1], text: m[0].trim() }));
  for (const [praefix, ordner] of Object.entries(ziele)) {
    haengeFaelleAn(path.join(ziel, kurs, ordner, "fallaufgaben.md"), bloecke.filter((b) => b.id.startsWith(praefix)).map((b) => b.text));
  }
  console.log(kurs, "Fälle:", bloecke.map((b) => b.id).join(", "));
}
