// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (Handelsfachwirt und Transport Management and Logistics).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const THEMEN = {
  handelsfachwirt: [
    { datei: "handel-hb1.md", abschnitte: [["A", "B", "C", "hb1/1.2-unternehmensfinanzierung.md"], ["D", "E", "F", "hb1/1.3-controllinginstrumente.md"]] },
    {
      datei: "handel-hb2-hb4.md",
      abschnitte: [
        ["A", "B", "C", "hb2/2.3-personalplanung.md"],
        ["D", "E", "F", "hb4/4.1-bedarfsermittlung.md"],
        ["G", "H", "I", "hb4/4.3-lager-transportprozesse.md"],
      ],
    },
    { datei: "handel-wb1.md", abschnitte: [["A", "B", "C", "wb1/5.2-flaechenoptimierung.md"], ["D", "E", "F", "wb1/5.3-preis-konditionenpolitik.md"]] },
    { datei: "handel-wb2.md", abschnitte: [["A", "B", "C", "wb2/6.2-vertragskonditionen-investitionsbewertung.md"]] },
  ],
  "transport-management-logistics": [
    {
      datei: "transport-themen.md",
      abschnitte: [
        ["A", "B", "C", "hb1/1.3-vertrieb-angebotskalkulation.md"],
        ["D", "E", "F", "hb2/2.1-transportplanung-durchfuehrung.md"],
        ["G", "H", "I", "hb2/2.2-lagerlogistik-bestandsmanagement.md"],
        ["J", "K", "L", "hb2/2.6-qualitaets-umweltmanagement-logistik.md"],
      ],
    },
  ],
};
const FAELLE = {
  handelsfachwirt: { datei: "handel-faelle.md", ziele: { "F-HB1-": "hb1", "F-HB2-": "hb2", "F-HB4-": "hb4", "F-WB1-": "wb1", "F-WB2-": "wb2" } },
  "transport-management-logistics": { datei: "transport-faelle.md", ziele: { "F-HB1-": "hb1", "F-HB2-": "hb2" } },
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
