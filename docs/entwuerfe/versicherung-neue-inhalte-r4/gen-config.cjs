// Erzeugt einspielen-config.json aus ersetzungen-a..e.json (Reihenfolge: A, B, C, D, E). Aufruf aus der Repo-Wurzel.
const fs = require("fs");
const dir = "docs/entwuerfe/versicherung-neue-inhalte-r4/";
const base = "content/versicherungen-finanzanlagen/";
const map = new Map();
for (const t of ["a", "b", "c", "d", "e"]) {
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
  { datei: "vf-3.3-ergaenzung-obliegenheiten-faelligkeit-verjaehrung.md", abschnitte: [["A", "B", "C", "kp1/3.3-schadenmanagement.md", "### Regressmanagement"]] },
  { datei: "vf-1.6-ergaenzung-anlageberatung-aufsichtsrecht.md", abschnitte: [["A", "B", "C", "kb1/1.6-finanzanlagen-grundlagen.md"]] },
  { datei: "vf-3.2-ergaenzung-informationspflichten-weiterbildung-beschwerde.md", abschnitte: [["A", "B", "C", "kp1/3.2-kundenmanagement-kundenberatung.md", "### Bestandspflege"]] },
  { datei: "vf-3.1-ergaenzung-produktfreigabe-solvency-lebensversicherung.md", abschnitte: [["A", "B", "C", "kp1/3.1-produktmanagement-versicherungsprodukte.md", "### Produktlebenszyklus"]] },
  {
    datei: "vf-2.2-ergaenzung-umwelt-arbeitgeberhaftpflicht-elementar.md",
    abschnitte: [
      ["A", "B", "C", "kb2/2.2-haftpflichtversicherungen-gewerbekunden.md", "### Abgrenzung zu reinen Vermögensschäden"],
      ["D", "E", "F", "kb2/2.1-betriebliche-sachversicherungen.md", "### Zusatzkosten und Ausschlüsse"],
    ],
  },
];
const faelle = [["vf-faelle-a.md", "kp1"], ["vf-faelle-b.md", "kb1"], ["vf-faelle-c.md", "kp1"], ["vf-faelle-d.md", "kp1"], ["vf-faelle-e.md", "kb2"]];
const rs = new Set();
for (const e of ergaenzungen) for (const a of e.abschnitte) rs.add(a[3]);
for (const f of ["kp1/fallaufgaben.md", "kp1/fachgespraech.md", "kb1/fallaufgaben.md", "kb1/fachgespraech.md", "kb2/fallaufgaben.md", "kb2/fachgespraech.md"]) rs.add(f);
for (const d of map.keys()) rs.add(d);
const cfg = {
  kurs: "versicherungen-finanzanlagen",
  rsDatum: "19.10.2026",
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
