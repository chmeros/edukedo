// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (Versicherungen und Finanzanlagen, Büro und Projektorganisation, Wirtschaftsfachwirt).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const THEMEN = {
  "versicherungen-finanzanlagen": [
    {
      datei: "versich-themen.md",
      abschnitte: [
        ["A", "B", "C", "kb1/1.3-unfallversicherung.md"],
        ["D", "E", "F", "kb2/2.4-betriebsunterbrechungsversicherung.md"],
        ["G", "H", "I", "kb2/2.5-risikoanalyse-gewerbekunden.md"],
        ["J", "K", "L", "kp1/3.1-produktmanagement-versicherungsprodukte.md"],
        ["M", "N", "O", "kp2/4.1-unternehmenssteuerung-controlling.md"],
      ],
    },
  ],
  "fachwirt-buero-projektorganisation": [
    {
      datei: "buero-themen.md",
      abschnitte: [
        ["A", "B", "C", "hb1/1.3-projektmanagement.md"],
        ["D", "E", "F", "hb2/2.4-veranstaltungsmanagement.md"],
        ["G", "H", "I", "hb3/3.1-personalwirtschaft.md"],
        ["J", "K", "L", "hb4/4.1-kennzahlen-controlling.md"],
        ["M", "N", "O", "hb4/4.2-einkauf-beschaffung.md"],
      ],
    },
  ],
  wirtschaftsfachwirt: [
    {
      datei: "wifa-themen.md",
      abschnitte: [
        ["A", "B", "C", "wbq2/2.1-finanzbuchhaltung-jahresabschluss.md"],
        ["D", "E", "F", "wbq2/2.2-kostenrechnung.md"],
        ["G", "H", "I", "wbq2/2.3-planungsrechnung.md"],
        ["J", "K", "L", "wbq3/3.4-steuerrecht.md"],
      ],
    },
  ],
};
const FAELLE = {
  "versicherungen-finanzanlagen": { datei: "versich-faelle.md", ziele: { "F-KB1-": "kb1", "F-KB2-": "kb2", "F-KP1-": "kp1", "F-KP2-": "kp2" } },
  "fachwirt-buero-projektorganisation": { datei: "buero-faelle.md", ziele: { "F-HB1-": "hb1", "F-HB2-": "hb2", "F-HB3-": "hb3", "F-HB4-": "hb4" } },
  wirtschaftsfachwirt: { datei: "wifa-faelle.md", ziele: { "F-WBQ2-": "wbq2", "F-WBQ3-": "wbq3" } },
};

const lies = (p) => fs.readFileSync(p, "utf8");

function abschnitte(text) {
  const norm = text.replace(/\r\n/g, "\n");
  const treffer = [...norm.matchAll(/^## ([A-O])\. .*$/gm)];
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
