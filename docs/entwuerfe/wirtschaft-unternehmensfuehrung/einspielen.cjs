// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-R Wirtschaftsfachwirt: neue Themen HSQ1 1.5 Betriebsstatistik und 1.6
// Wissensmanagement, Ergänzungen in HSQ1 1.4 und 1.2, Fallaufgaben F-HSQ1-04 bis -07, Fachgespräch).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

const KURS = "industriefachwirt";
const NEUE_THEMEN = [
  ["wifa-1.5-betriebsstatistik.md", "wirtschaftsfachwirt/hsq1/1.5-betriebsstatistik.md"],
  ["wifa-1.6-wissensmanagement.md", "wirtschaftsfachwirt/hsq1/1.6-wissensmanagement.md"],
];
const ERGAENZUNGEN = [
  { datei: "wifa-1.4-ergaenzung-kreativ-entscheidungstechniken.md", abschnitte: [["A", "B", "C", "hsq1/1.4-managementtechniken.md"]] },
  { datei: "wifa-1.2-ergaenzung-organisationsentwicklung.md", abschnitte: [["A", "B", "C", "hsq1/1.2-organisationsentwicklung.md"]] },
];
const FAELLE = [
  ["wifa-faelle-a.md", "wirtschaftsfachwirt/hsq1"],
  ["wifa-faelle-b.md", "wirtschaftsfachwirt/hsq1"],
  ["wifa-faelle-c.md", "wirtschaftsfachwirt/hsq1"],
  ["wifa-faelle-d.md", "wirtschaftsfachwirt/hsq1"],
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
      // neue Themenabschnitte vor dem Sammelblock „Rückfragen zur eigenen Unterweisung“ einordnen, falls vorhanden
      const iRueck = t.search(/^### Rückfragen zur eigenen Unterweisung/m);
      if (iRueck >= 0 && nr && /^\d/.test(nr)) {
        t = t.slice(0, iRueck).replace(/\s+$/, "") + "\n\n" + teil.trim() + "\n\n" + t.slice(iRueck);
      } else {
        t = t + "\n\n" + teil.trim();
      }
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

for (const { datei, abschnitte: karten } of ERGAENZUNGEN) {
  const a = abschnitte(lies(path.join(entw, datei)));
  for (const [th, ka, qu, thema, anker] of karten) {
    einfuegen(path.join(ziel, "wirtschaftsfachwirt", thema), { theorie: a[th], karten: a[ka], quiz: a[qu], anker });
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

// Einleitungssätze (Themenbereiche)
function ersetzeInDatei(datei, paare) {
  const text = lies(datei);
  const crlf = text.includes(String.fromCharCode(13, 10));
  let t = lf(text);
  for (const [alt, neu] of paare) {
    if (!t.includes(alt)) throw new Error("Textstelle fehlt in " + datei + ": " + alt);
    t = t.split(alt).join(neu);
  }
  schreibe(datei, t, crlf);
}
const RS_ALT = 'rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"';
const RS_NEU = 'rechtsstand: "16.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"';
const WF = "wirtschaftsfachwirt";
ersetzeInDatei(path.join(ziel, WF, "hsq1/fallaufgaben.md"), [
  ["HSQ1 (1.1–1.4)", "HSQ1 (1.1–1.6)"],
  [RS_ALT, RS_NEU],
]);
ersetzeInDatei(path.join(ziel, WF, "hsq1/fachgespraech.md"), [[RS_ALT, RS_NEU]]);
ersetzeInDatei(path.join(ziel, WF, "hsq1/1.2-organisationsentwicklung.md"), [[RS_ALT, RS_NEU]]);
ersetzeInDatei(path.join(ziel, WF, "hsq1/1.4-managementtechniken.md"), [[RS_ALT, RS_NEU]]);
console.log("ok");
