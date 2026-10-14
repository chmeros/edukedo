// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-G Fachinformatiker-Querschnitt: neue Themen FU3 3.5/3.6/3.7 und
// FU6 6.5, Ergänzung FU4 4.2, Fallaufgaben F-FU3-04/05/06, F-FU4-04, F-FU6-04, Fachgespräch 6.5), jeweils in alle vier Kurse.
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

const KURSE = [
  "fachinformatiker-anwendungsentwicklung",
  "fachinformatiker-daten-prozessanalyse",
  "fachinformatiker-digitale-vernetzung",
  "fachinformatiker-systemintegration",
];
// [Entwurfsdatei, Zieldatei relativ zum Kursordner]; der Platzhalter KURS_SLUG im Frontmatter wird ersetzt
const NEUE_THEMEN = [
  ["fachinformatiker-3.5-zahlensysteme-datenmengen.md", "fu3/3.5-zahlensysteme-datenmengen-uebertragungszeiten.md"],
  ["fachinformatiker-3.6-subnetting-vlsm.md", "fu3/3.6-subnetting-adressplanung-vlsm.md"],
  ["fachinformatiker-3.7-dns-dhcp-ipv6.md", "fu3/3.7-dns-dhcp-ipv6.md"],
  ["fachinformatiker-6.5-zertifikate-pki.md", "fu6/6.5-zertifikate-pki.md"],
];
// Ergänzungen (Abschnitte A bis O): [Theorie, Karten, Quiz, Zieldatei relativ zum Kursordner, optional Anker]
const ERGAENZUNGEN = {
  datei: "fachinformatiker-4.2-ergaenzung-sortieren-suchen.md",
  abschnitte: [["A", "B", "C", "fu4/4.2-algorithmen-kontrollstrukturen-datenstrukturen.md"]],
};
// [Fall-Datei, Zielordner relativ zum Kursordner]
const FAELLE = [
  ["fachinformatiker-faelle-a.md", "fu3"],
  ["fachinformatiker-faelle-b.md", "fu3"],
  ["fachinformatiker-faelle-c.md", "fu3"],
  ["fachinformatiker-faelle-d.md", "fu4"],
  ["fachinformatiker-faelle-e.md", "fu6"],
];

function abschnitte(text) {
  const norm = lf(text);
  const namen = { A: "## Theorie-Ergänzung", B: "## Karteikarten-Ergänzung", C: "## Quiz-Ergänzung" };
  const idx = {};
  for (const [k, n] of Object.entries(namen)) {
    idx[k] = norm.indexOf("\n" + n + "\n");
    if (idx[k] < 0) throw new Error("Ergänzungsabschnitt fehlt: " + n);
  }
  const aus = {};
  const reihe = ["A", "B", "C"];
  reihe.forEach((k, i) => {
    const start = idx[k] + 1 + namen[k].length;
    const ende = i + 1 < reihe.length ? idx[reihe[i + 1]] : norm.length;
    aus[k] = norm.slice(start, ende).replace(/\n---\s*$/, "").trim();
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

// Fachgesprächsabschnitte: gibt es im Ziel schon eine Überschrift mit gleicher Nummer, werden die Fragen am Ende dieses
// Abschnitts eingefügt, sonst am Dateiende angehängt.
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

function ersetzeInDatei(datei, paare) {
  const text = lies(datei);
  const crlf = text.includes(String.fromCharCode(13, 10));
  let t = lf(text);
  let geaendert = false;
  for (const [alt, neu] of paare) {
    if (t.includes(alt)) {
      t = t.split(alt).join(neu);
      geaendert = true;
    } else {
      throw new Error("Textstelle fehlt in " + datei + ": " + alt);
    }
  }
  if (geaendert) schreibe(datei, t, crlf);
}

const ergaenzungen = abschnitte(lies(path.join(entw, ERGAENZUNGEN.datei)));

for (const kurs of KURSE) {
  for (const [quelle, rel] of NEUE_THEMEN) {
    const zielDatei = path.join(ziel, kurs, rel);
    if (fs.existsSync(zielDatei)) throw new Error("existiert bereits: " + kurs + "/" + rel);
    const text = lf(lies(path.join(entw, quelle)));
    if (!text.includes("kurs_slug: KURS_SLUG")) throw new Error("Platzhalter kurs_slug fehlt: " + quelle);
    fs.writeFileSync(zielDatei, text.replace("kurs_slug: KURS_SLUG", "kurs_slug: " + kurs).replace(/\s+$/, "") + "\n");
  }

  for (const [th, ka, qu, thema, anker] of ERGAENZUNGEN.abschnitte) {
    einfuegen(path.join(ziel, kurs, thema), { theorie: ergaenzungen[th], karten: ergaenzungen[ka], quiz: ergaenzungen[qu], anker });
  }

  for (const [datei, ordner] of FAELLE) {
    const f = lf(lies(path.join(entw, datei)));
    const iFg = f.search(/^## Fachgesprächsfragen/m);
    const fallTeil = iFg < 0 ? f : f.slice(0, iFg);
    const bloecke = [...fallTeil.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => m[0].trim());
    if (bloecke.length === 0) throw new Error("keine Fallaufgaben: " + datei);
    const fallDatei = path.join(ziel, kurs, ordner, "fallaufgaben.md");
    for (const b of bloecke) haengeAn(fallDatei, b, "\n\n---\n\n");
    if (iFg >= 0) {
      const abschn = f.slice(iFg).match(/^### [\s\S]*$/m);
      if (abschn) fgEinfuegen(path.join(ziel, kurs, ordner, "fachgespraech.md"), abschn[0].replace(/\n---\s*$/, ""));
    }
    console.log(kurs, ordner, "Fälle:", bloecke.map((b) => b.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
  }

  // Einleitungssätze (Themenbereiche)
  ersetzeInDatei(path.join(ziel, kurs, "fu3/fallaufgaben.md"), [["(3.1–3.4)", "(3.1–3.7)"]]);
  ersetzeInDatei(path.join(ziel, kurs, "fu6/fallaufgaben.md"), [["(6.1–6.4)", "(6.1–6.5)"]]);
}
console.log("ok");
