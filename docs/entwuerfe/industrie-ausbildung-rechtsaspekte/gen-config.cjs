// Erzeugt einspielen-config.json aus ersetzungen-a|b|c.json (Teile A, B, C). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/industrie-ausbildung-rechtsaspekte/";
const base = "content/industriefachwirt/";
const map = new Map();
for (const t of ["a", "b", "c"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
map.set("hq5/fallaufgaben.md", [["aus HQ5 (9.1–9.4) zu", "aus HQ5 (9.1–9.6) zu"]]);
map.set("hq3/fallaufgaben.md", [["aus HQ3 (7.1–7.6) zu", "aus HQ3 (7.1–7.7) zu"]]);
let ok = true;
for (const [d, ps] of map) {
  const text = fs.readFileSync(base + d, "utf8");
  for (const [a] of ps) {
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); }
  }
}
const neueThemen = [
  ["if-9.5-berufsausbildung-rechtsrahmen-vertrag.md", "hq5/9.5-berufsausbildung-rechtsrahmen-vertrag.md"],
  ["if-9.6-ausbildung-planen-durchfuehren.md", "hq5/9.6-ausbildung-planen-durchfuehren.md"],
  ["if-7.7-rechtsaspekte-marketing-vertrieb.md", "hq3/7.7-rechtsaspekte-marketing-vertrieb.md"],
];
const faelle = [["if-faelle-a.md", "hq5"], ["if-faelle-b.md", "hq5"], ["if-faelle-c.md", "hq3"]];
const rs = new Set(neueThemen.map(x => x[1]));
for (const f of ["hq5/fallaufgaben.md", "hq5/fachgespraech.md", "hq3/fallaufgaben.md", "hq3/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
// Einleitungen der Fallaufgaben-Dateien
const einleit = [
  { datei: "hq5/fallaufgaben.md", paare: [] },
  { datei: "hq3/fallaufgaben.md", paare: [] },
];
for (const e of einleit) {
  const t = fs.readFileSync(base + e.datei, "utf8");
  const m = t.match(/\(?\b(7\.1|9\.1)[–-](7\.6|9\.4)\b\)?/);
  console.log(e.datei, "Einleitung:", m ? m[0] : "nicht gefunden");
}
const cfg = {
  kurs: "industriefachwirt",
  rsDatum: "17.10.2026",
  neueThemen,
  ergaenzungen: [],
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...rs],
};
if (ok) { fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n"); console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare"); }
