// Erzeugt je Kurs einen Ordner cfg-<kurs>/einspielen-config.json für P-AU aus den Ersetzungsdateien der Teams. Aufruf aus der Repo-Wurzel.
// Prüft: alte Zeichenkette im Bestand genau einmal und einzeilig, neue enthält die alte nicht, Paare nacheinander anwendbar, rechtsstand-Zeile vorhanden.
const fs = require("fs");
const out = "docs/entwuerfe/korrekturen-r4-weitere-kurse/";
const quellen = {
  "fachwirt-gesundheit-soziales": ["docs/entwuerfe/korrekturen-gesundheit-r4/ersetzungen-a.json", "docs/entwuerfe/korrekturen-gesundheit-r4/ersetzungen-b.json"],
  "fachwirt-buero-projektorganisation": ["docs/entwuerfe/korrekturen-buero-r4/ersetzungen.json"],
  "technischer-fachwirt": ["docs/entwuerfe/korrekturen-technischer-fachwirt-r4/ersetzungen-a.json", "docs/entwuerfe/korrekturen-technischer-fachwirt-r4/ersetzungen-b.json", "docs/entwuerfe/korrekturen-technischer-fachwirt-r4/ersetzungen-c.json"],
};
const kurse = new Map(); // kurs -> Map(datei -> paare[])
const add = (kurs, datei, paare) => {
  if (!kurse.has(kurs)) kurse.set(kurs, new Map());
  const m = kurse.get(kurs);
  if (!m.has(datei)) m.set(datei, []);
  m.get(datei).push(...paare);
};
for (const [kurs, dateien] of Object.entries(quellen)) {
  for (const f of dateien) for (const e of JSON.parse(fs.readFileSync(f, "utf8"))) add(kurs, e.datei, e.paare);
}
for (const e of JSON.parse(fs.readFileSync("docs/entwuerfe/korrekturen-fachinformatiker-r4/ersetzungen-fi.json", "utf8"))) add(e.kurs, e.datei, e.paare);

const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
let ok = true;
let gesamt = 0;
const rsDateien = new Map(); // kurs -> Dateien mit Standard-rechtsstand-Zeile; Dateien mit eigener (P8-)Zeile bleiben unberührt
for (const [kurs, map] of kurse) {
  const base = `content/${kurs}/`;
  for (const [d, ps] of map) {
    let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
    if (!rsDateien.has(kurs)) rsDateien.set(kurs, []);
    if (RS.test(text)) rsDateien.get(kurs).push(d); else console.log("eigene rechtsstand-Zeile, bleibt unberührt:", kurs, d);
    for (const [a, b] of ps) {
      gesamt++;
      if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", kurs, d, a.slice(0, 60)); }
      const n = text.split(a).length - 1;
      if (n !== 1) { ok = false; console.log("FEHLER", kurs, d, n, a.slice(0, 70)); continue; }
      if (b.includes(a)) { ok = false; console.log("NEUE ENTHÄLT ALTE", kurs, d, a.slice(0, 60)); }
      text = text.replace(a, () => b);
    }
  }
}
if (ok) {
  for (const [kurs, map] of kurse) {
    const cfg = {
      kurs,
      rsDatum: "23.10.2026",
      neueThemen: [],
      ergaenzungen: [],
      faelle: [],
      ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
      rechtsstand: rsDateien.get(kurs),
    };
    const dir = `${out}cfg-${kurs}/`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
    console.log(kurs, ":", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare");
  }
  console.log("gesamt", gesamt, "Paare");
}
