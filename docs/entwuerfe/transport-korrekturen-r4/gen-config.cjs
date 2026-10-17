// Erzeugt einspielen-config.json aus ersetzungen-a.json, ersetzungen-b.json (Reihenfolge: A, dann B). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/transport-korrekturen-r4/";
const base = "content/transport-management-logistics/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Prüfung: je Datei sequentiell, jede alte Zeichenkette genau einmal; einzeilig
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8");
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    text = text.replace(a, b);
  }
}
const ergaenzungen = [
  { datei: "tl-1.4-ergaenzung-haftungsregime-hgb-cmr.md", abschnitte: [["A", "B", "C", "hb1/1.4-vertragsgestaltung-gueterverkehr.md", "### Versicherungen im Güterverkehr"]] },
];
const faelle = [["tl-faelle-a.md", "hb1"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["hb1/fallaufgaben.md", "hb1/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "transport-management-logistics",
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
