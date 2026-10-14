// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (Projektmanagement und Instrumente: Industriefachwirt, Büro und Projektorganisation, Wirtschaftsfachwirt).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

const THEMEN = {
  "fachwirt-buero-projektorganisation": {
    datei: "buero-themen.md",
    abschnitte: [
      ["A", "B", "C", "hb1/1.3-projektmanagement.md"],
      ["D", "E", "F", "hb2/2.2-zielgruppen-marktanalyse.md"],
      ["G", "H", "I", "hb4/4.1-kennzahlen-controlling.md"],
    ],
  },
  wirtschaftsfachwirt: {
    datei: "wifa-themen.md",
    abschnitte: [
      ["A", "B", "C", "hsq3/3.3-wertschoepfungskette-rationalisierung.md"],
      ["D", "E", "F", "wbq4/4.3-planungs-analysemethoden.md"],
      ["G", "H", "I", "wbq1/1.4-unternehmenszusammenschluesse.md"],
    ],
  },
};

function abschnitte(text) {
  const norm = lf(text);
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
  const t = lf(text);
  const iKarten = t.indexOf("\n## Karteikarten");
  const iQuiz = t.indexOf("\n## Quiz");
  if (iKarten < 0 || iQuiz < 0 || !theorie || !karten || !quiz) throw new Error("Abschnitte fehlen: " + zieldatei);
  const kopf = t.slice(0, iKarten).replace(/\s+$/, "");
  const mitte = t.slice(iKarten, iQuiz).replace(/\s+$/, "");
  const ende = t.slice(iQuiz).replace(/\s+$/, "");
  schreibe(zieldatei, [kopf, "", theorie, "", mitte, "", karten, "", ende, "", quiz, ""].join("\n"), crlf);
}

function haengeAn(zieldatei, block, trenner) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = lf(text).replace(/\s+$/, "");
  schreibe(zieldatei, t + trenner + block.trim() + "\n", crlf);
}

function ersetze(zieldatei, alt, neu) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = lf(text);
  if (!t.includes(alt)) return;
  schreibe(zieldatei, t.split(alt).join(neu), crlf);
}

for (const [kurs, { datei, abschnitte: karten }] of Object.entries(THEMEN)) {
  const a = abschnitte(lies(path.join(entw, datei)));
  for (const [th, ka, qu, thema] of karten) {
    einfuegen(path.join(ziel, kurs, thema), { theorie: a[th], karten: a[ka], quiz: a[qu] });
  }
}

// Büro: Fallaufgabe F-HB1-05
{
  const fall = lf(lies(path.join(entw, "buero-faelle.md")));
  const m = fall.match(/^#### F-HB1-05 · Fallaufgabe[\s\S]*$/m);
  if (!m) throw new Error("F-HB1-05 fehlt");
  haengeAn(path.join(ziel, "fachwirt-buero-projektorganisation", "hb1", "fallaufgaben.md"), m[0], "\n\n---\n\n");
}

// Industriefachwirt: neues Thema 8.4, Fallaufgabe F-HQ4-04, Fachgespräch
{
  const hq4 = path.join(ziel, "industriefachwirt", "hq4");
  const neuesThema = path.join(hq4, "8.4-projektmanagement.md");
  if (fs.existsSync(neuesThema)) throw new Error("8.4 existiert bereits");
  fs.writeFileSync(neuesThema, lf(lies(path.join(entw, "industrie-8-4-projektmanagement.md"))));

  const f = lf(lies(path.join(entw, "industrie-faelle.md")));
  const fall = f.match(/^#### F-HQ4-04 · Fallaufgabe[\s\S]*?(?=\n---\s*\n+## Fachgesprächsfragen)/m);
  const fg = f.match(/^### 8\.4 Projektmanagement[\s\S]*$/m);
  if (!fall || !fg) throw new Error("Fall oder Fachgespräch fehlt");
  haengeAn(path.join(hq4, "fallaufgaben.md"), fall[0], "\n\n---\n\n");
  haengeAn(path.join(hq4, "fachgespraech.md"), fg[0], "\n\n");
  ersetze(path.join(hq4, "fallaufgaben.md"), "(8.1–8.3)", "(8.1–8.4)");
  ersetze(path.join(hq4, "fachgespraech.md"), "(8.1–8.3)", "(8.1–8.4)");
}
console.log("ok");
