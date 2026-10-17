// Erzeugt einspielen-config.json aus ersetzungen-a|b.json (Teile A, B). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/industrie-aussenhandel-entsorgungsrecht/";
const base = "content/industriefachwirt/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Prüfung: jede alte Zeichenkette genau einmal im Bestand (die Paare werden nacheinander angewendet,
// daher je Datei sequentiell prüfen)
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8");
  for (const [a, b] of ps) {
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    text = text.replace(a, b);
  }
}
const ergaenzungen = [
  { datei: "if-7.4-ergaenzung-zahlungsabsicherung-zoll-incoterms.md", abschnitte: [["A", "B", "C", "hq3/7.4-internationale-geschaeftsbeziehungen.md", "### Kulturelle Unterschiede im internationalen Vertrieb"]] },
  { datei: "if-6.7-ergaenzung-entsorgungsrecht.md", abschnitte: [["A", "B", "C", "hq2/6.7-entsorgungslogistik-kreislaufwirtschaft.md", "### Wirtschaftlichkeit der Entsorgung"]] },
];
const faelle = [["if-faelle-a.md", "hq3"], ["if-faelle-b.md", "hq2"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["hq3/fallaufgaben.md", "hq3/fachgespraech.md", "hq2/fallaufgaben.md", "hq2/fachgespraech.md"]) rs.add(f);
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
