// Spielt die Glossar-Entwürfe (glossar-<ziel>.md) in content/fachinformatiker-*/<ziel>/glossar.md ein. Aufruf aus der Repo-Wurzel:
//   node docs/entwuerfe/fachinformatiker-glossar/einspielen-glossar.cjs [--schreiben]
// Ohne --schreiben: nur prüfen (Eindeutigkeit von Begriff und Alias je Kurs über alle Glossare, Pflichtfelder, Länge, Abschnitt) und zählen.
// Bestehende glossar.md: neue Blöcke werden angehängt, rechtsstand auf RS gesetzt. Neue glossar.md (ae1, ae2, dv4, si5, dp2): Frontmatter wird ergänzt.
const fs = require("fs");
const path = require("path");
const dir = "docs/entwuerfe/fachinformatiker-glossar/";
const RS = "23.10.2026 — Entwurf, vor Livegang fachlich prüfen";
const KURSE = {
  ae: "fachinformatiker-anwendungsentwicklung",
  dp: "fachinformatiker-daten-prozessanalyse",
  dv: "fachinformatiker-digitale-vernetzung",
  si: "fachinformatiker-systemintegration",
};
// Ziel -> Kurse (alle bei fu*, sonst nur der eine)
const ZIELE = {
  fu1: ["ae", "dp", "dv", "si"], fu2: ["ae", "dp", "dv", "si"], fu6: ["ae", "dp", "dv", "si"], fu7: ["ae", "dp", "dv", "si"],
  ae1: ["ae"], ae2: ["ae"], dp2: ["dp"], dv4: ["dv"], si5: ["si"],
};
const schreiben = process.argv.includes("--schreiben");
const lf = (s) => s.replace(/\r\n/g, "\n");
let ok = true;
const fehler = (m) => { ok = false; console.log("FEHLER", m); };

function bloecke(text) {
  let t = lf(text).replace(/^<!--[\s\S]*?-->\s*/m, "");
  const iEnde = t.search(/^---\s*$/m);
  if (iEnde >= 0) t = t.slice(0, iEnde);
  return t.split(/\n(?=#### )/).filter((b) => b.startsWith("#### ")).map((b) => b.trim());
}
function feld(b, name) {
  const m = new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.*)$`, "m").exec(b);
  return m ? m[1].trim() : null;
}
function themaDatei(kurs, ziel, code) {
  const d = `content/${KURSE[kurs]}/${ziel}`;
  const f = fs.readdirSync(d).find((n) => n.startsWith(code + "-") && n.endsWith(".md"));
  return f ? d + "/" + f : null;
}

const entwuerfe = {};
for (const ziel of Object.keys(ZIELE)) {
  const f = dir + `glossar-${ziel}.md`;
  entwuerfe[ziel] = fs.existsSync(f) ? bloecke(fs.readFileSync(f, "utf8")) : [];
}

for (const k of Object.keys(KURSE)) {
  const vergeben = new Map();
  const belege = (name, wo) => {
    const s = name.toLowerCase();
    if (vergeben.has(s)) fehler(`${KURSE[k]}: "${name}" doppelt (${vergeben.get(s)} und ${wo})`);
    vergeben.set(s, wo);
  };
  // Bestand
  for (const d of fs.readdirSync(`content/${KURSE[k]}`)) {
    const f = `content/${KURSE[k]}/${d}/glossar.md`;
    if (!fs.existsSync(f)) continue;
    for (const b of bloecke(lf(fs.readFileSync(f, "utf8")).split(/^## Glossar\s*$/m)[1] || "")) {
      belege(/^#### (.+)$/m.exec(b)[1].trim(), `Bestand ${d}`);
      for (const a of (feld(b, "Auch") || "").split(",").map((x) => x.trim()).filter(Boolean)) belege(a, `Bestand ${d}`);
    }
  }
  // Neu
  for (const [ziel, kurse] of Object.entries(ZIELE)) {
    if (!kurse.includes(k)) continue;
    for (const b of entwuerfe[ziel]) {
      const term = /^#### (.+)$/m.exec(b)[1].trim();
      belege(term, `neu ${ziel}`);
      for (const a of (feld(b, "Auch") || "").split(",").map((x) => x.trim()).filter(Boolean)) belege(a, `neu ${ziel}`);
      const def = feld(b, "Definition");
      const thema = feld(b, "Thema");
      const abschnitt = feld(b, "Abschnitt");
      if (!def) fehler(`${term}: Definition fehlt`);
      else if (def.length > 280) fehler(`${term}: Definition ${def.length} Zeichen`);
      if (feld(b, "Geprüft") !== "nein") fehler(`${term}: Geprüft: nein fehlt`);
      if (!thema || !abschnitt) { fehler(`${term}: Thema/Abschnitt fehlt`); continue; }
      const tf = themaDatei(k, ziel, thema);
      if (!tf) { fehler(`${term}: Thema ${thema} nicht in ${KURSE[k]}/${ziel}`); continue; }
      if (!lf(fs.readFileSync(tf, "utf8")).split("\n").some((l) => l.trim() === "### " + abschnitt)) fehler(`${term}: Abschnitt "${abschnitt}" nicht in ${path.basename(tf)}`);
    }
  }
}

console.log("Einträge je Ziel:", Object.entries(entwuerfe).map(([z, b]) => `${z} ${b.length}`).join(", "));
if (!ok) { console.log("Abbruch: Prüfung nicht bestanden."); process.exit(1); }
if (!schreiben) { console.log("Prüfung bestanden (nichts geschrieben)."); process.exit(0); }

for (const [ziel, kurse] of Object.entries(ZIELE)) {
  if (!entwuerfe[ziel].length) continue;
  const neu = entwuerfe[ziel].join("\n\n") + "\n";
  for (const k of kurse) {
    const f = `content/${KURSE[k]}/${ziel}/glossar.md`;
    if (fs.existsSync(f)) {
      const crlf = fs.readFileSync(f, "utf8").includes("\r\n");
      let t = lf(fs.readFileSync(f, "utf8")).replace(/\s+$/, "") + "\n\n" + neu;
      t = t.replace(/^rechtsstand: ".*"$/m, `rechtsstand: "${RS}"`);
      fs.writeFileSync(f, crlf ? t.replace(/\n/g, "\r\n") : t);
    } else {
      // Kopf aus einer beliebigen Themendatei des Fachgebiets
      const tdir = `content/${KURSE[k]}/${ziel}`;
      const erste = fs.readdirSync(tdir).filter((n) => /^\d.*\.md$/.test(n)).sort()[0];
      const kopf = lf(fs.readFileSync(`${tdir}/${erste}`, "utf8"));
      const code = /^fachgebiet_code: (.+)$/m.exec(kopf)[1];
      const titel = /^fachgebiet_title: (.+)$/m.exec(kopf)[1];
      const t = `---\nkurs_slug: ${KURSE[k]}\nfachgebiet_code: ${code}\nfachgebiet_title: ${titel}\nthema_code: "${code}-glossar"\nthema_title: "Glossar (Entwurf)"\nquelle: "Aus der vorhandenen Theorie der Themen dieses Fachgebiets abgeleitete Kurzdefinitionen"\nrechtsstand: "${RS}"\n---\n\n## Glossar\n\n${neu}`;
      fs.writeFileSync(f, t);
    }
    console.log("geschrieben:", f);
  }
}
