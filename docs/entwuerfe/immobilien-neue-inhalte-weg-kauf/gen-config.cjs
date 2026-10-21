// Erzeugt einspielen-config.json aus ersetzungen-a..c.json (Reihenfolge A, B, C). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/immobilien-neue-inhalte-weg-kauf/";
const base = "content/immobilienfachwirt/";
const map = new Map();
for (const t of ["a", "b", "c"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
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
  { datei: "im-1.1-ergaenzung-begruendung-wohnungseigentum.md", abschnitte: [["A", "B", "C", "hb1/1.1-rechtliche-rahmenbedingungen.md", "### Grundbuch und dingliche Rechte"]] },
  { datei: "im-4.2-ergaenzung-weg-vertiefen.md", abschnitte: [["A", "B", "C", "hb4/4.2-weg-verwaltung.md", "### Verwalterpflichten nach WEG-Reform"]] },
  { datei: "im-6.4-ergaenzung-kaufabwicklung-kaufnebenkosten.md", abschnitte: [["A", "B", "C", "hb6/6.4-vertriebsprozess-kundenbetreuung.md", "### Kundenbindung und Nachbetreuung"]] },
];
const faelle = [["im-faelle-a.md", "hb1"], ["im-faelle-b.md", "hb4"], ["im-faelle-c.md", "hb6"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["hb1/fallaufgaben.md", "hb1/fachgespraech.md", "hb4/fallaufgaben.md", "hb4/fachgespraech.md", "hb6/fallaufgaben.md", "hb6/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "immobilienfachwirt",
  rsDatum: "21.10.2026",
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
