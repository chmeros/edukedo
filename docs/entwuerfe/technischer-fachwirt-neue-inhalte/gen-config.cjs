// Erzeugt einspielen-config.json für P-AV (Technischer Fachwirt, Teile A bis D) aus den Entwürfen. Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
// Dateien mit eigener (P8-)Rechtsstandzeile (hq3/fallaufgaben.md, hq3/fachgespraech.md) bleiben in der rechtsstand-Liste unberührt.
const fs = require("fs");
const dir = "docs/entwuerfe/technischer-fachwirt-neue-inhalte/";
const base = "content/technischer-fachwirt/";
const map = new Map();
for (const t of ["a", "b", "c", "d"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Auftraggeber: Einleitungen der Fallaufgaben-Dateien (Teilaufgabenzahl), einzeilig, genau ein Treffer.
const extra = (datei, a, b) => { if (!map.has(datei)) map.set(datei, []); map.get(datei).push([a, b]); };
extra("wq3/fallaufgaben.md", "Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben", "Jede Aufgabe besteht aus einer Ausgangssituation und vier oder fünf Teilaufgaben mit Punktangaben");
extra("hq3/fallaufgaben.md", "Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben", "Jede Aufgabe besteht aus einer Ausgangssituation und vier oder fünf Teilaufgaben mit Punktangaben");

const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("tf-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    if (b.includes(a)) { ok = false; console.log("NEUE ENTHÄLT ALTE", d, a.slice(0, 60)); }
    text = text.replace(a, () => b);
    for (const [f, t] of entwuerfe) if (t.includes(a)) { ok = false; console.log("ALTE ZEICHENKETTE AUCH IM ENTWURF", f, a.slice(0, 60)); }
  }
}
const rsKandidaten = [...new Set([...map.keys(), "wq3/fallaufgaben.md", "wq3/fachgespraech.md", "hq3/fallaufgaben.md", "hq3/fachgespraech.md", "wq3/3.2-arbeitsrecht-grundlagen.md", "wq3/3.3-vertragsgestaltung.md", "wq3/3.4-steuerrecht.md", "hq3/10.1-qualitaetsmanagement.md"])];
const rechtsstand = rsKandidaten.filter((d) => {
  const standard = RS.test(fs.readFileSync(base + d, "utf8"));
  if (!standard) console.log("eigene rechtsstand-Zeile, bleibt unberührt:", d);
  return standard;
});
const erg = (datei, abschnitte) => ({ datei, abschnitte });
const cfg = {
  kurs: "technischer-fachwirt",
  rsDatum: "23.10.2026",
  neueThemen: [],
  ergaenzungen: [
    erg("tf-wq3-3.2-ergaenzung-arbeitsrecht.md", [
      ["A", "B", "C", "wq3/3.2-arbeitsrecht-grundlagen.md", "### Betriebsverfassung und Mitbestimmung"],
      ["D", "E", "F", "wq3/3.2-arbeitsrecht-grundlagen.md", "### Arbeitszeit, Arbeitsschutz und flexible Beschäftigungsformen in der Fertigung"],
    ]),
    erg("tf-wq3-3.3-ergaenzung-verzug-durchsetzung.md", [["A", "B", "C", "wq3/3.3-vertragsgestaltung.md", "### Internationale Lieferverträge"]]),
    erg("tf-wq3-3.4-ergaenzung-lohn-sozialversicherung.md", [["A", "B", "C", "wq3/3.4-steuerrecht.md", "### Grundsteuer und weitere betriebliche Aspekte"]]),
    erg("tf-hq3-10.1-ergaenzung-iatf-16949.md", [["A", "B", "C", "hq3/10.1-qualitaetsmanagement.md", "### Audit-Arten und Auditablauf"]]),
  ],
  faelle: [
    ["tf-faelle-a.md", "wq3"],
    ["tf-faelle-b.md", "wq3"],
    ["tf-faelle-c.md", "wq3"],
    ["tf-faelle-d.md", "hq3"],
  ],
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand,
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare; rechtsstand:", rechtsstand.length, "Dateien");
}
