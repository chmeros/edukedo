// Gemeinsames Einspielskript für Content-Pakete (ersetzt die je Paket erzeugten einspielen.cjs / gen-einspielen.cjs ab Paket P-U).
// Aufruf: node einspielen.cjs <Paketordner> <Content-Wurzel> [--nur=teil1,teil2]
//   <Paketordner> enthält einspielen-config.json (Format siehe README.md in diesem Ordner) und die Entwurfsdateien.
//   --nur=...: verarbeitet nur Entwurfsdateien, deren Name einen der Teile enthält (z. B. --nur=3.4,faelle-a); für Tests einzelner Teile.
const fs = require("fs");
const path = require("path");

const entw = path.resolve(process.argv[2]);
const ziel = path.resolve(process.argv[3]);
const nurArg = process.argv.find((a) => a.startsWith("--nur="));
const nur = nurArg ? nurArg.slice(6).split(",").filter(Boolean) : null;
const cfg = JSON.parse(fs.readFileSync(path.join(entw, "einspielen-config.json"), "utf8"));
const KURS = cfg.kurs;
const gewaehlt = (name) => !nur || nur.some((n) => name.includes(n));

const lies = (p) => fs.readFileSync(p, "utf8");
const lf = (t) => t.replace(/\r\n/g, "\n");
const schreibe = (p, text, crlf) => fs.writeFileSync(p, crlf ? text.replace(/\n/g, "\r\n") : text);

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

// Fachgesprächsabschnitte: gibt es im Ziel schon eine Überschrift mit gleicher Nummer ("### 3.3"), werden die Fragen am Ende dieses
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

for (const [quelle, rel] of cfg.neueThemen || []) {
  if (!gewaehlt(quelle)) continue;
  const zielDatei = path.join(ziel, KURS, rel);
  if (fs.existsSync(zielDatei)) throw new Error("existiert bereits: " + rel);
  fs.writeFileSync(zielDatei, lf(lies(path.join(entw, quelle))).replace(/\s+$/, "") + "\n");
}

for (const { datei, abschnitte: karten } of cfg.ergaenzungen || []) {
  if (!gewaehlt(datei)) continue;
  const a = abschnitte(lies(path.join(entw, datei)));
  for (const [th, ka, qu, thema, anker] of karten) {
    einfuegen(path.join(ziel, KURS, thema), { theorie: a[th], karten: a[ka], quiz: a[qu], anker });
  }
}

for (const [datei, ordner] of cfg.faelle || []) {
  if (!gewaehlt(datei)) continue;
  const f = lf(lies(path.join(entw, datei)));
  const iFg = f.search(/^## Fachgesprächsfragen/m);
  if (iFg < 0) throw new Error("Fachgesprächsfragen fehlen: " + datei);
  const fallTeil = f.slice(0, iFg);
  const fgTeil = f.slice(iFg);
  const bloecke = [...fallTeil.matchAll(/^#### (F-[A-Z0-9-]+) · Fallaufgabe[\s\S]*?(?=\n---\s*\n|\s*(?![\s\S]))/gm)].map((m) => m[0].trim());
  if (bloecke.length === 0) throw new Error("keine Fallaufgaben: " + datei);
  const fallDatei = path.join(ziel, KURS, ordner, "fallaufgaben.md");
  for (const b of bloecke) haengeAn(fallDatei, b, "\n\n---\n\n");
  const abschn = fgTeil.match(/^### [\s\S]*$/m);
  if (!abschn) throw new Error("keine Fachgesprächsabschnitte: " + datei);
  fgEinfuegen(path.join(ziel, KURS, ordner, "fachgespraech.md"), abschn[0].replace(/\n---\s*$/, ""));
  console.log(ordner, "Fälle:", bloecke.map((b) => b.match(/^#### (F-[A-Z0-9-]+)/)[1]).join(", "));
}

// Textersetzungen (Einleitungssätze der Fallaufgaben) und rechtsstand. Bricht ab, wenn eine Textstelle fehlt.
const RS = /rechtsstand: "[0-9.]+ — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
const RS_NEU = `rechtsstand: "${cfg.rsDatum} — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"`;
if (!nur) {
  for (const { datei, paare } of cfg.ersetzungen || []) {
    const p = path.join(ziel, KURS, datei);
    const text = lies(p);
    const crlf = text.includes("\r\n");
    let t = lf(text);
    for (const [alt, neu] of paare) {
      if (!t.includes(alt)) throw new Error("Textstelle fehlt in " + datei + ": " + alt);
      t = t.split(alt).join(neu);
    }
    schreibe(p, t, crlf);
  }
  for (const datei of cfg.rechtsstand || []) {
    const p = path.join(ziel, KURS, datei);
    const text = lies(p);
    const crlf = text.includes("\r\n");
    const t = lf(text);
    if (!RS.test(t)) throw new Error("rechtsstand fehlt in " + datei);
    schreibe(p, t.replace(RS, RS_NEU), crlf);
  }
}
console.log("ok");
