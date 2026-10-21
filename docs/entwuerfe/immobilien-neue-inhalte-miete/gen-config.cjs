// Erzeugt einspielen-config.json aus ersetzungen-a.json, ersetzungen-b.json plus Einleitung der HB4-Fallaufgaben. Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/immobilien-neue-inhalte-miete/";
const base = "content/immobilienfachwirt/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Einleitung der HB4-Fallaufgaben: neues Thema 4.5, Fälle mit fünf Teilaufgaben
if (!map.has("hb4/fallaufgaben.md")) map.set("hb4/fallaufgaben.md", []);
map.get("hb4/fallaufgaben.md").push(["Themen aus HB4 (4.1–4.4)", "Themen aus HB4 (4.1–4.5)"], ["vier Teilaufgaben mit Punktangaben", "vier bis fünf Teilaufgaben mit Punktangaben"]);
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    text = text.replace(a, () => b);
  }
}
const ergaenzungen = [
  { datei: "im-4.1-ergaenzung-mieterhoehung-mietpreisbremse.md", abschnitte: [["A", "B", "C", "hb4/4.1-mietverwaltung.md", "### Kündigung und Räumung (Grundzüge)"]] },
];
const neueThemen = [["im-4.5-mietrecht-im-bestand.md", "hb4/4.5-mietrecht-im-bestand.md"]];
const faelle = [["im-faelle-a.md", "hb4"], ["im-faelle-b.md", "hb4"]];
const rs = new Set(["hb4/4.1-mietverwaltung.md", "hb4/fallaufgaben.md", "hb4/fachgespraech.md"]);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "immobilienfachwirt",
  rsDatum: "21.10.2026",
  neueThemen,
  ergaenzungen,
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...rs],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare,", cfg.rechtsstand.length, "rechtsstand");
}
