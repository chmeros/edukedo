// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-C Präsentation, Moderation und Gesprächsführung:
// Handelsfachwirt HB2 2.5/2.6, Industriefachwirt HQ5 9.4, Büro und Projektorganisation HB3 3.3/3.4 als Ergänzung).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

const NEUE_THEMEN = [
  ["handel-2.5-praesentation-moderation-gespraechsfuehrung.md", "handelsfachwirt/hb2/2.5-praesentation-moderation-gespraechsfuehrung.md"],
  ["handel-2.6-zeit-selbstmanagement.md", "handelsfachwirt/hb2/2.6-zeit-selbstmanagement.md"],
  ["industrie-9.4-praesentation-moderation-mitarbeitergespraeche.md", "industriefachwirt/hq5/9.4-praesentation-moderation-mitarbeitergespraeche.md"],
];
const ERGAENZUNGEN = {
  "fachwirt-buero-projektorganisation": {
    datei: "buero-themen.md",
    abschnitte: [
      ["A", "B", "C", "hb3/3.3-konfliktmanagement.md"],
      ["D", "E", "F", "hb3/3.4-moderation.md", "### Evaluation der Moderation durchführen"],
    ],
  },
};
// [Fall-Datei, Zielordner relativ zur Content-Wurzel]
const FAELLE = [
  ["handel-faelle.md", "handelsfachwirt/hb2"],
  ["industrie-faelle.md", "industriefachwirt/hq5"],
  ["buero-faelle.md", "fachwirt-buero-projektorganisation/hb3"],
];

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

function einfuegen(zieldatei, { theorie, karten, quiz, anker }) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = lf(text);
  const iKarten = t.indexOf("\n## Karteikarten");
  const iQuiz = t.indexOf("\n## Quiz");
  if (iKarten < 0 || iQuiz < 0 || !theorie || !karten || !quiz) throw new Error("Abschnitte fehlen: " + zieldatei);
  let kopf = t.slice(0, iKarten).replace(/\s+$/, "");
  const mitte = t.slice(iKarten, iQuiz).replace(/\s+$/, "");
  const ende = t.slice(iQuiz).replace(/\s+$/, "");
  if (anker) {
    // Theorie vor der genannten Überschrift einfügen (statt am Ende der Theorie)
    const iAnker = kopf.indexOf("\n" + anker);
    if (iAnker < 0) throw new Error("Anker fehlt: " + anker);
    kopf = [kopf.slice(0, iAnker).replace(/\s+$/, ""), "", theorie, "", kopf.slice(iAnker + 1)].join("\n");
  } else {
    kopf = [kopf, "", theorie].join("\n");
  }
  schreibe(zieldatei, [kopf, "", mitte, "", karten, "", ende, "", quiz, ""].join("\n"), crlf);
}

function haengeAn(zieldatei, block, trenner) {
  const text = lies(zieldatei);
  const crlf = text.includes("\r\n");
  const t = lf(text).replace(/\s+$/, "");
  schreibe(zieldatei, t + trenner + block.trim() + "\n", crlf);
}

// Fachgesprächsabschnitte: gibt es im Ziel schon eine Überschrift mit gleicher Nummer (z. B. "### 3.3"), werden die Fragen am
// Ende dieses Abschnitts eingefügt, sonst am Dateiende angehängt.
function fgEinfuegen(datei, block) {
  const text = lies(datei);
  const crlf = text.includes("\r\n");
  let t = lf(text).replace(/\s+$/, "");
  const teile = block.split(/^(?=### )/m).filter((s) => s.trim());
  for (const teil of teile) {
    const kopf = teil.split("\n")[0];
    const nr = (kopf.match(/^### (\S+)/) || [])[1];
    const re = nr ? new RegExp("^### " + nr.replace(/[.]/g, "\\.") + "(\\s|$)", "m") : null;
    const m = re ? re.exec(t) : null;
    const fragen = teil.split("\n").slice(1).join("\n").trim();
    if (m) {
      const start = m.index + m[0].length;
      const n = t.slice(start).search(/\n### /);
      const ende = n < 0 ? t.length : start + n;
      const vor = t.slice(0, ende).replace(/\s+$/, "");
      const nach = n < 0 ? "" : "\n\n" + t.slice(ende).replace(/^\n+/, "");
      t = vor + "\n" + fragen + nach;
    } else {
      t = t + "\n\n" + teil.trim();
    }
    t = t.replace(/\s+$/, "");
  }
  schreibe(datei, t + "\n", crlf);
}

// Ergänzung von Bestandsfragen ohne Erwartungen: Datei bestand-fachgespraech.json
// { "Datei relativ zur Content-Wurzel": { "Frage ohne führendes '- '": ["Erwartung", ...] } }
function bestandFg() {
  const p = path.join(entw, "bestand-fachgespraech.json");
  if (!fs.existsSync(p)) return;
  const def = JSON.parse(lies(p));
  for (const [rel, fragen] of Object.entries(def)) {
    const datei = path.join(ziel, rel);
    const text = lies(datei);
    const crlf = text.includes("\r\n");
    let t = lf(text);
    for (const [frage, erwartungen] of Object.entries(fragen)) {
      const zeile = "- " + frage;
      const i = t.indexOf("\n" + zeile + "\n");
      if (i < 0) throw new Error("Bestandsfrage fehlt: " + frage);
      const nach = i + 1 + zeile.length + 1;
      if (/^\s+- Erwartung:/.test(t.slice(nach).split("\n")[0])) throw new Error("Bestandsfrage hat schon Erwartungen: " + frage);
      t = t.slice(0, nach) + erwartungen.map((e) => "  - Erwartung: " + e).join("\n") + "\n" + t.slice(nach);
    }
    schreibe(datei, t, crlf);
  }
}

for (const [quelle, rel] of NEUE_THEMEN) {
  const zielDatei = path.join(ziel, rel);
  if (fs.existsSync(zielDatei)) throw new Error("existiert bereits: " + rel);
  fs.writeFileSync(zielDatei, lf(lies(path.join(entw, quelle))).replace(/\s+$/, "") + "\n");
}

for (const [kurs, { datei, abschnitte: karten }] of Object.entries(ERGAENZUNGEN)) {
  const a = abschnitte(lies(path.join(entw, datei)));
  for (const [th, ka, qu, thema, anker] of karten) {
    einfuegen(path.join(ziel, kurs, thema), { theorie: a[th], karten: a[ka], quiz: a[qu], anker });
  }
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
  const abschn = fgTeil.match(/^### [\s\S]*$/m);
  if (!abschn) throw new Error("keine Fachgesprächsabschnitte: " + datei);
  const fgDatei = path.join(ziel, ordner, "fachgespraech.md");
  fgEinfuegen(fgDatei, abschn[0].replace(/\n---\s*$/, ""));
  console.log(ordner, "Fälle:", bloecke.map((b) => b.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
}
bestandFg();

// Einleitungssätze (Themenbereiche) und Korrektur des Vornamens Schulz von Thun (Friedemann, nicht Friedrich) im Bestand
function ersetzeInDatei(datei, paare) {
  const text = lies(datei);
  const crlf = text.includes("\r\n");
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
ersetzeInDatei(path.join(ziel, "industriefachwirt/hq5/fallaufgaben.md"), [["(9.1–9.3)", "(9.1–9.4)"]]);
ersetzeInDatei(path.join(ziel, "industriefachwirt/hq5/fachgespraech.md"), [["(9.1–9.3)", "(9.1–9.4)"]]);
ersetzeInDatei(path.join(ziel, "handelsfachwirt/hb2/fallaufgaben.md"), [["(2.1–2.4)", "(2.1–2.6)"], ["vier Teilaufgaben mit Punktangaben", "vier bis fünf Teilaufgaben mit Punktangaben"]]);
ersetzeInDatei(path.join(ziel, "handelsfachwirt/hb2/fachgespraech.md"), [["(2.1–2.4)", "(2.1–2.6)"]]);
for (const datei of ["industriefachwirt/hq5/9.2-teamarbeit-kommunikation.md", "technischer-fachwirt/hq4/11.2-teamarbeit-kommunikation.md"]) {
  ersetzeInDatei(path.join(ziel, datei), [
    ["Friedrich Schulz von Thun", "Friedemann Schulz von Thun"],
    ["**Akzeptierte Antworten:** Friedemann Schulz von Thun; Schulz von Thun", "**Akzeptierte Antworten:** Friedemann Schulz von Thun; F. Schulz von Thun; Schulz von Thun"],
  ]);
}
console.log("ok");
