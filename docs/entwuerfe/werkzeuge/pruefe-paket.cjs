// Gemeinsames Prüfwerkzeug für Content-Pakete. Aufrufe (aus dem Repo-Wurzelordner):
//   node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test <Paketordner> [--nur=teil1,teil2]
//       Kopie von content/ anlegen, Entwürfe laut einspielen-config.json einfügen, validate-content und Parser-Prüfung laufen lassen,
//       Kopie wieder löschen. Gibt nur eine kompakte Zusammenfassung aus.
//   node docs/entwuerfe/werkzeuge/pruefe-paket.cjs siebenwort <Datei> [<Datei> ...] [--n=7]
//       Wörtliche Läufe von mindestens n Wörtern gegen content/ und docs/entwuerfe/ (ohne die Datei selbst).
//   node docs/entwuerfe/werkzeuge/pruefe-paket.cjs zahlen <Paketordner> <Datei> [<Datei> ...]
//       Zahlen der Entwurfsdateien, die auch im Kurs (content/<kurs>/) oder in anderen Entwurfsdateien vorkommen.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const repo = path.resolve(__dirname, "..", "..", "..");
const [, , befehl, ...rest] = process.argv;
const optionen = rest.filter((a) => a.startsWith("--"));
const args = rest.filter((a) => !a.startsWith("--"));
const opt = (name, std) => {
  const a = optionen.find((o) => o.startsWith("--" + name + "="));
  return a ? a.slice(name.length + 3) : std;
};

function alleMd(wurzel, liste = []) {
  if (!fs.existsSync(wurzel)) return liste;
  for (const e of fs.readdirSync(wurzel, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(wurzel, e.name);
    if (e.isDirectory()) alleMd(p, liste);
    else if (e.name.endsWith(".md")) liste.push(p);
  }
  return liste;
}
const rel = (p) => path.relative(repo, p).replace(/\\/g, "/");
// Vergleichskorpus ohne Protokolle, Aufträge und Werkzeuge (nur Inhalt: content/ und Entwurfsdateien)
const imKorpus = (p) => !/(^|[\\/])(pruefung-[a-z]\.md|00-pruefprotokoll\.md|auftrag\.md|README\.md|werkzeuge)([\\/]|$)/.test(p);
// Kopfstück einer Entwurfsdatei (Einfügehinweise, Abgleich) nicht mitprüfen: erst ab Frontmatter-Ende bzw. erster Inhaltsüberschrift
const ohneKopf = (text) => {
  if (text.startsWith("---")) return text;
  const m = text.match(/^(## A\. |## Fallaufgaben|# Thema )/m);
  return m ? text.slice(m.index) : text;
};

function test() {
  const ordner = path.resolve(args[0]);
  const cfg = JSON.parse(fs.readFileSync(path.join(ordner, "einspielen-config.json"), "utf8"));
  const nur = optionen.find((o) => o.startsWith("--nur=")) || "";
  const tmp = path.join(os.tmpdir(), "edukedo-paketkopie-" + Date.now());
  const sh = (cmd, cwd, env) => execSync(cmd, { cwd, env: { ...process.env, ...env }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  try {
    fs.cpSync(path.join(repo, "content"), path.join(tmp, "content"), { recursive: true });
    const e = sh(`node "${path.join(__dirname, "einspielen.cjs")}" "${ordner}" "${path.join(tmp, "content")}" ${nur}`, repo);
    console.log(e.trim().split("\n").slice(-4).join("\n"));
    const v = sh(`npx tsx src/db/validate-content.ts`, path.join(repo, "apps/api"), { CONTENT_DIR: path.join(tmp, "content") });
    console.log("validate-content:", v.trim().split("\n").slice(-1)[0]);
    const p = sh(`npx tsx "${path.join(__dirname, "parser-check.mts")}" "${repo}" "${path.join(tmp, "content")}" "${path.join(repo, "content")}" ${cfg.kurs}`, path.join(repo, "apps/api"));
    console.log(p.trim());
  } catch (err) {
    console.log("FEHLER:", (err.stdout || "").toString().trim().split("\n").slice(-6).join("\n"), (err.stderr || err.message || "").toString().trim().split("\n").slice(-8).join("\n"));
    process.exitCode = 1;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

const woerter = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

function siebenwort() {
  const n = parseInt(opt("n", "7"), 10);
  const eingaben = args.map((a) => path.resolve(a));
  const ziele = eingaben.map((f) => {
    const w = woerter(ohneKopf(fs.readFileSync(f, "utf8")));
    const map = new Map();
    for (let i = 0; i + n <= w.length; i++) {
      const k = w.slice(i, i + n).join(" ");
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(i);
    }
    return { f, w, map, treffer: new Array(w.length).fill(null) };
  });
  const korpus = [...alleMd(path.join(repo, "content")), ...alleMd(path.join(repo, "docs", "entwuerfe"))].filter(imKorpus);
  for (const k of korpus) {
    const kw = woerter(ohneKopf(fs.readFileSync(k, "utf8")));
    for (const z of ziele) {
      if (path.resolve(k) === z.f) continue;
      for (let i = 0; i + n <= kw.length; i++) {
        const pos = z.map.get(kw.slice(i, i + n).join(" "));
        if (!pos) continue;
        for (const p of pos) for (let j = p; j < p + n; j++) if (!z.treffer[j]) z.treffer[j] = rel(k);
      }
    }
  }
  for (const z of ziele) {
    const laeufe = [];
    let i = 0;
    while (i < z.w.length) {
      if (!z.treffer[i]) { i++; continue; }
      let j = i;
      while (j < z.w.length && z.treffer[j]) j++;
      laeufe.push({ laenge: j - i, quelle: z.treffer[i], text: z.w.slice(i, Math.min(j, i + 14)).join(" ") });
      i = j;
    }
    laeufe.sort((a, b) => b.laenge - a.laenge);
    console.log(`== ${rel(z.f)}: ${laeufe.length} Läufe ab ${n} Wörtern`);
    for (const l of laeufe.slice(0, 40)) console.log(`${String(l.laenge).padStart(3)} Wörter | ${l.quelle} | ${l.text}${l.laenge > 14 ? " …" : ""}`);
  }
}

function zahlen() {
  const ordner = path.resolve(args[0]);
  const cfg = JSON.parse(fs.readFileSync(path.join(ordner, "einspielen-config.json"), "utf8"));
  const dateien = args.slice(1).map((a) => path.resolve(a));
  const korpus = [...alleMd(path.join(repo, "content", cfg.kurs)), ...alleMd(path.join(repo, "docs", "entwuerfe"))].filter(imKorpus);
  const texte = korpus.map((k) => ({ k, t: ohneKopf(fs.readFileSync(k, "utf8")) }));
  for (const f of dateien) {
    const t = ohneKopf(fs.readFileSync(f, "utf8"));
    const nums = [...new Set(t.match(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+,\d+|\d{4,}/g) || [])].filter((x) => !/^(19|20)\d\d$/.test(x));
    const zeilen = [];
    for (const num of nums) {
      const re = new RegExp("(?<![\\d.,])" + num.replace(/[.,]/g, (c) => "\\" + c) + "(?![\\d]|[.,]\\d)");
      const orte = texte.filter(({ k, t: x }) => path.resolve(k) !== f && re.test(x)).map(({ k }) => rel(k));
      if (orte.length) zeilen.push({ num, orte });
    }
    zeilen.sort((a, b) => a.orte.length - b.orte.length);
    console.log(`== ${rel(f)}: ${zeilen.length} von ${nums.length} Zahlen kommen auch anderswo vor (wenige Fundstellen zuerst)`);
    for (const z of zeilen.slice(0, 60)) console.log(`${z.num.padStart(12)} | ${z.orte.length} Dateien | ${z.orte.slice(0, 3).join(", ")}`);
  }
}

if (befehl === "test") test();
else if (befehl === "siebenwort") siebenwort();
else if (befehl === "zahlen") zahlen();
else console.log("Befehle: test | siebenwort | zahlen (siehe Kopfkommentar)");
