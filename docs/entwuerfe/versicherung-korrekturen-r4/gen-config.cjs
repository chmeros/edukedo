// Erzeugt einspielen-config.json aus ersetzungen-a.json (kb1) und ersetzungen-b.json (kp1, kb2). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/versicherung-korrekturen-r4/";
const base = "content/versicherungen-finanzanlagen/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
  if (!RS.test(text)) { ok = false; console.log("RECHTSSTAND-ZEILE PASST NICHT", d); }
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    text = text.replace(a, () => b);
  }
}
const cfg = {
  kurs: "versicherungen-finanzanlagen",
  rsDatum: "17.10.2026",
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
