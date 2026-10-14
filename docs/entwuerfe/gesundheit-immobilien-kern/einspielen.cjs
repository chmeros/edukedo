// Fügt die Entwürfe aus diesem Ordner in eine Content-Wurzel ein (P-H Gesundheit und Immobilien: Ergänzungen in GS 3.4/4.4, neues Thema GS 6.4,
// Ergänzungen in Immobilien 2.2/2.3/5.1, Fallaufgaben F-HB3-04, F-HB4-06, F-HB6-05, F-HB2-06, F-HB2-07, F-HB5-05, Fachgespräch).
// Aufruf: node einspielen.cjs <Content-Wurzel>      (z. B. node einspielen.cjs ../../../content)
const fs = require("fs");
const path = require("path");

const ziel = path.resolve(process.argv[2]);
const entw = __dirname;

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

const GS = "fachwirt-gesundheit-soziales";
const IM = "immobilienfachwirt";
const NEUE_THEMEN = [["gesundheit-6.4-sozialmarketing-fundraising.md", GS + "/hb6/6.4-sozialmarketing-fundraising-marketing-controlling.md"]];
// [Kursordner, Entwurfsdatei, [[Theorie, Karten, Quiz, Zieldatei (relativ zum Kursordner), optional Anker], ...]]
const ERGAENZUNGEN = [
  [GS, "gesundheit-3.4-ergaenzung-psp-projektrisiken.md", [["A", "B", "C", "hb3/3.4-projekte-steuern.md"]]],
  [GS, "gesundheit-4.4-ergaenzung-balanced-scorecard.md", [["A", "B", "C", "hb4/4.4-controlling-kennzahlen.md"]]],
  [IM, "immobilien-2.2-ergaenzung-finanzmathematik.md", [["A", "B", "C", "hb2/2.2-investitions-finanzierungsrechnung.md"]]],
  [IM, "immobilien-2.3-5.1-ergaenzung-liquiditaet-residualwert.md", [["A", "B", "C", "hb2/2.3-controlling-kennzahlen.md"], ["D", "E", "F", "hb5/5.1-projektentwicklung.md"]]],
];
// [Fall-Datei, Kursordner]; das Fachgebiet (hbN) ergibt sich aus der Fall-ID bzw. der Fachgesprächs-Überschrift
const FAELLE = [
  ["gesundheit-faelle-a.md", GS],
  ["gesundheit-faelle-b.md", GS],
  ["gesundheit-faelle-c.md", GS],
  ["immobilien-faelle-d.md", IM],
  ["immobilien-faelle-e.md", IM],
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

for (const [kurs, datei, karten] of ERGAENZUNGEN) {
  const a = abschnitte(lies(path.join(entw, datei)));
  for (const [th, ka, qu, thema, anker] of karten) {
    einfuegen(path.join(ziel, kurs, thema), { theorie: a[th], karten: a[ka], quiz: a[qu], anker });
  }
}

for (const [datei, kurs] of FAELLE) {
  const f = lf(lies(path.join(entw, datei)));
  const iFg = f.search(/^## Fachgesprächsfragen/m);
  const fallTeil = iFg < 0 ? f : f.slice(0, iFg);
  const bloecke = [...fallTeil.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => m[0].trim());
  if (bloecke.length === 0) throw new Error("keine Fallaufgaben: " + datei);
  for (const b of bloecke) {
    const hb = "hb" + b.match(/^#### F-HB(\d)/)[1];
    haengeAn(path.join(ziel, kurs, hb, "fallaufgaben.md"), b, "\n\n---\n\n");
  }
  if (iFg >= 0) {
    const abschn = f.slice(iFg).match(/^### [\s\S]*$/m);
    if (!abschn) throw new Error("keine Fachgesprächsabschnitte: " + datei);
    const teile = abschn[0].replace(/\n---\s*$/, "").split(/^(?=### )/m).filter((s) => s.trim());
    for (const teil of teile) {
      const hb = "hb" + teil.match(/^### (\d)/)[1];
      fgEinfuegen(path.join(ziel, kurs, hb, "fachgespraech.md"), teil);
    }
  }
  console.log(kurs, "Fälle:", bloecke.map((b) => b.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
}

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
ersetzeInDatei(path.join(ziel, GS, "hb6/fallaufgaben.md"), [["HB6 (6.1–6.3)", "HB6 (6.1–6.4)"]]);
console.log("ok");
