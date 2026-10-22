// Erzeugt einspielen-config.json aus ersetzungen-a.json (HF1/HF2), ersetzungen-b.json (HF3) und ersetzungen-c.json (HF4, Prüfungsaufbau). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/aevo-korrekturen-r4/";
const base = "content/ausbildung-der-ausbilder/";
const map = new Map();
for (const t of ["a", "b", "c"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Frontmatter-quelle von 2.3 (N9 der Prüfung A): Auftraggeber ergänzt §§ 36 BBiG sowie 54a und 76 SGB III.
map.get("hf2/2.3-auswahl-ausbildungsvertrag.md").push(["des Berufsbildungsgesetzes (BBiG) §§ 2 Abs. 3/11/20/34 und des Allgemeinen Gleichbehandlungsgesetzes (AGG)", "des Berufsbildungsgesetzes (BBiG) §§ 2 Abs. 3/11/20/34/36, des Dritten Buches Sozialgesetzbuch (SGB III) §§ 54a und 76 und des Allgemeinen Gleichbehandlungsgesetzes (AGG)"]);
const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
  if (!RS.test(text)) { ok = false; console.log("RECHTSSTAND-ZEILE PASST NICHT", d); }
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    const doppeltOk = d === "hf4/fachgespraech.md" && a.startsWith("  - Erwartung: Für kaufmännische und IT-nahe Berufe sind IHK-Fachwirt-Fortbildungen");
    if (n !== 1 && !(doppeltOk && n === 2)) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    text = text.split(a).join(b);
  }
}
const cfg = {
  kurs: "ausbildung-der-ausbilder",
  rsDatum: "22.10.2026",
  neueThemen: [],
  ergaenzungen: [],
  faelle: [],
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...map.keys()],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare");
}
