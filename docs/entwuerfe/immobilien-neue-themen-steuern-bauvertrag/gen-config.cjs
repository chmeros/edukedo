// Erzeugt einspielen-config.json aus ersetzungen-a.json, ersetzungen-b.json plus Einleitungen der HB2- und HB5-Fallaufgaben. Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/immobilien-neue-themen-steuern-bauvertrag/";
const base = "content/immobilienfachwirt/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
const add = (d, a, b) => { if (!map.has(d)) map.set(d, []); map.get(d).push([a, b]); };
add("hb2/fallaufgaben.md", "HB2 (2.1–2.4)", "HB2 (2.1–2.5)");
add("hb5/fallaufgaben.md", "HB5 (5.1–5.4)", "HB5 (5.1–5.5)");
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
const neueThemen = [
  ["im-2.5-steuern-immobilienwirtschaft.md", "hb2/2.5-steuern-immobilienwirtschaft.md"],
  ["im-5.5-bauvertragsrecht.md", "hb5/5.5-bauvertragsrecht.md"],
];
const faelle = [["im-faelle-a.md", "hb2"], ["im-faelle-b.md", "hb5"]];
const rs = new Set(["hb2/fallaufgaben.md", "hb2/fachgespraech.md", "hb5/fallaufgaben.md", "hb5/fachgespraech.md"]);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "immobilienfachwirt",
  rsDatum: "22.10.2026",
  neueThemen,
  ergaenzungen: [],
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...rs],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare,", cfg.rechtsstand.length, "rechtsstand");
}
