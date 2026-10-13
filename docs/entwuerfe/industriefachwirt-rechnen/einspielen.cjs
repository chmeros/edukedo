// Fügt die Entwürfe aus docs/entwuerfe/industriefachwirt-rechnen in eine Content-Wurzel ein.
// Aufruf: node merge-rechnen.cjs <Repo-Wurzel> <Ziel-Content-Wurzel>
const fs = require("fs");
const path = require("path");

const [repo, ziel] = process.argv.slice(2);
const entw = path.join(repo, "docs", "entwuerfe", "industriefachwirt-rechnen");
const kurs = path.join(ziel, "industriefachwirt");

function lies(p) {
  return fs.readFileSync(p, "utf8");
}
function schreibe(p, text) {
  fs.writeFileSync(p, text);
}

/** Teilt eine Entwurfsdatei in die Abschnitte A bis F auf. */
function abschnitte(text) {
  const norm = text.replace(/\r\n/g, "\n");
  const treffer = [...norm.matchAll(/^## ([A-F])\. .*$/gm)];
  const aus = {};
  treffer.forEach((t, i) => {
    const start = t.index + t[0].length;
    let ende = i + 1 < treffer.length ? treffer[i + 1].index : norm.length;
    // Trennlinie und Teilüberschriften („---“, „# Teil 2“) gehören nicht zum Abschnitt.
    let block = norm.slice(start, ende);
    block = block.replace(/\n---\s*\n+# Teil [0-9][^\n]*\n*$/, "\n").replace(/\n---\s*$/, "\n");
    aus[t[1]] = block.trim();
  });
  return aus;
}

function einfuegen(zieldatei, { theorie, karten, quiz }) {
  let text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  let t = text.replace(/\r\n/g, "\n");
  const iKarten = t.indexOf("\n## Karteikarten");
  const iQuiz = t.indexOf("\n## Quiz");
  if (iKarten < 0 || iQuiz < 0) throw new Error("Abschnitte fehlen in " + zieldatei);
  const kopf = t.slice(0, iKarten).replace(/\s+$/, "");
  const mitte = t.slice(iKarten, iQuiz).replace(/\s+$/, "");
  const ende = t.slice(iQuiz).replace(/\s+$/, "");
  const neu = [kopf, "", theorie, "", mitte, "", karten, "", ende, "", quiz, ""].join("\n");
  schreibe(zieldatei, crlf ? neu.replace(/\n/g, "\r\n") : neu);
}

function hängeFaelleAn(zieldatei, faelle) {
  let text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  let t = text.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const neu = t + "\n\n---\n\n" + faelle.join("\n\n---\n\n") + "\n";
  schreibe(zieldatei, crlf ? neu.replace(/\n/g, "\r\n") : neu);
}

const dat = (n) => path.join(entw, n);
const kd = (...teile) => path.join(kurs, ...teile);

// Themen
let a = abschnitte(lies(dat("wq2-2.1-rechnen.md")));
einfuegen(kd("wq2", "2.1-finanzbuchhaltung-jahresabschluss.md"), { theorie: a.A, karten: a.B, quiz: a.C });
a = abschnitte(lies(dat("wq2-2.2-rechnen.md")));
einfuegen(kd("wq2", "2.2-kostenrechnung.md"), { theorie: a.A, karten: a.B, quiz: a.C });
a = abschnitte(lies(dat("hq2-6.1-6.4-rechnen.md")));
einfuegen(kd("hq2", "6.1-produktionsplanung-steuerung.md"), { theorie: a.A, karten: a.B, quiz: a.C });
einfuegen(kd("hq2", "6.4-materialwirtschaft-logistik.md"), { theorie: a.D, karten: a.E, quiz: a.F });
a = abschnitte(lies(dat("hq3-7.1-rechnen.md")));
einfuegen(kd("hq3", "7.1-marktanalyse.md"), { theorie: a.A, karten: a.B, quiz: a.C });

// Fallaufgaben
const fall = lies(dat("fallaufgaben-rechnen.md")).replace(/\r\n/g, "\n");
const bloecke = [...fall.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => ({ id: m[1], text: m[0].trim() }));
const nach = (praefix) => bloecke.filter((b) => b.id.startsWith(praefix)).map((b) => b.text);
hängeFaelleAn(kd("wq2", "fallaufgaben.md"), nach("F-WQ2-"));
hängeFaelleAn(kd("hq2", "fallaufgaben.md"), nach("F-HQ2-"));
hängeFaelleAn(kd("hq3", "fallaufgaben.md"), nach("F-HQ3-"));
console.log("Fälle:", bloecke.map((b) => b.id).join(", "));
