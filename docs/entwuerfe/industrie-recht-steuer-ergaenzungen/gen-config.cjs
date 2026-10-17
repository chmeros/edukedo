// Erzeugt einspielen-config.json aus ersetzungen-a|b|c|d.json (Teile A bis D). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/industrie-recht-steuer-ergaenzungen/";
const base = "content/industriefachwirt/";
const map = new Map();
for (const t of ["a", "b", "c", "d"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
let ok = true;
for (const [d, ps] of map) {
  const text = fs.readFileSync(base + d, "utf8");
  for (const [a] of ps) {
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); }
  }
}
const ergaenzungen = [
  { datei: "if-1.3-ergaenzung-sonderformen-rechtsformen.md", abschnitte: [["A", "B", "C", "wq1/1.3-existenzgruendung-unternehmensformen.md", "### Existenzgründung im industriellen Umfeld"]] },
  { datei: "if-3.2-ergaenzung-arbeitsrecht.md", abschnitte: [["A", "B", "C", "wq3/3.2-arbeitsrecht-grundlagen.md", "### Arbeitsschutz und besondere Schutzvorschriften"]] },
  { datei: "if-3.3-ergaenzung-verzug-verjaehrung-mahnverfahren-insolvenz-cisg.md", abschnitte: [["A", "B", "C", "wq3/3.3-vertragsgestaltung.md"]] },
  { datei: "if-3.4-ergaenzung-lohnsteuer-sozialversicherung-e-rechnung.md", abschnitte: [["A", "B", "C", "wq3/3.4-steuerrecht.md"]] },
];
const faelle = [["if-faelle-a.md", "wq1"], ["if-faelle-b.md", "wq3"], ["if-faelle-c.md", "wq3"], ["if-faelle-d.md", "wq3"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["wq1/fallaufgaben.md", "wq1/fachgespraech.md", "wq3/fallaufgaben.md", "wq3/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "industriefachwirt",
  rsDatum: "17.10.2026",
  neueThemen: [],
  ergaenzungen,
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...rs],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare,", cfg.rechtsstand.length, "rechtsstand");
}
