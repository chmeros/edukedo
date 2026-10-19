// Erzeugt einspielen-config.json aus ersetzungen-a..d.json (Reihenfolge: A, B, C, D) plus Einleitungs-Ersetzung HB3. Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/transport-neue-inhalte-r4/";
const base = "content/transport-management-logistics/";
const map = new Map();
for (const t of ["a", "b", "c", "d"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Einleitung der HB3-Fallaufgaben: neues Thema 3.7
if (!map.has("hb3/fallaufgaben.md")) map.set("hb3/fallaufgaben.md", []);
map.get("hb3/fallaufgaben.md").push(["Themen aus HB3 (3.1–3.6)", "Themen aus HB3 (3.1–3.7)"]);
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
  { datei: "tl-1.4-ergaenzung-adsp-fixkostenspedition-lagergeschaeft.md", abschnitte: [["A", "B", "C", "hb1/1.4-vertragsgestaltung-gueterverkehr.md", "### Versicherungen im Güterverkehr"]] },
  { datei: "tl-2.1-ergaenzung-lenk-ruhezeiten-fahrverbote-kabotage.md", abschnitte: [["A", "B", "C", "hb2/2.1-transportplanung-durchfuehrung.md", "### Ladungssicherung: Grundprinzipien"]] },
  { datei: "tl-2.4-ergaenzung-exportkontrolle-zolltarif-aeo.md", abschnitte: [["A", "B", "C", "hb2/2.4-zoll-aussenwirtschaft-gueterverkehr.md", "### Incoterms 2020 im Überblick"]] },
];
const neueThemen = [["tl-3.7-arbeits-gesundheitsschutz-logistik.md", "hb3/3.7-arbeits-gesundheitsschutz-logistik.md"]];
const faelle = [["tl-faelle-a.md", "hb1"], ["tl-faelle-b.md", "hb3"], ["tl-faelle-c.md", "hb2"], ["tl-faelle-d.md", "hb2"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["hb1/fallaufgaben.md", "hb1/fachgespraech.md", "hb2/fallaufgaben.md", "hb2/fachgespraech.md", "hb3/fallaufgaben.md", "hb3/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "transport-management-logistics",
  rsDatum: "19.10.2026",
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
