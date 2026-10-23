// Erzeugt einspielen-config.json für P-AW (Fachwirt Gesundheit und Soziales, Teile AV-A bis AY-B) aus den Entwürfen. Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand (nacheinander angewandt) genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen dieses Pakets (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
// Treffer in archivierten, bereits eingespielten Vorläufer-Entwürfen (docs/entwuerfe/fachgespraech-stufe3*, gesundheit-immobilien-kern, ...) sind unschädlich.
// Dateien mit eigener (P8-)Rechtsstandzeile bleiben in der rechtsstand-Liste unberührt.
const fs = require("fs");
const dir = "docs/entwuerfe/gesundheit-neue-inhalte/";
const base = "content/fachwirt-gesundheit-soziales/";
const teile = ["av-a", "av-b", "av-c", "aw-a", "aw-b", "ax-a", "ax-b", "ax-c", "ay-a", "ay-b"];
const map = new Map();
for (const t of teile) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Auftraggeber: Einleitungen der Fallaufgaben-Dateien (neue Themen), einzeilig, genau ein Treffer.
const extra = (datei, a, b) => { if (!map.has(datei)) map.set(datei, []); map.get(datei).push([a, b]); };
extra("hb1/fallaufgaben.md", "Diese Aufgaben verknüpfen mehrere Themen aus HB1 (1.1–1.4)", "Diese Aufgaben verknüpfen mehrere Themen aus HB1 (1.1–1.5)");
extra("hb2/fallaufgaben.md", "Diese Aufgaben verknüpfen mehrere Themen aus HB2 (2.1–2.4)", "Diese Aufgaben verknüpfen mehrere Themen aus HB2 (2.1–2.6)");
extra("hb4/fallaufgaben.md", "Diese Aufgaben verknüpfen mehrere Themen aus HB4 (4.1–4.4)", "Diese Aufgaben verknüpfen mehrere Themen aus HB4 (4.1–4.5)");

const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("gs-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
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
const erg = (datei, abschnitte) => ({ datei, abschnitte });
const ergaenzungen = [
  erg("gs-4.2-ergaenzung-verguetung-ppv.md", [["A", "B", "C", "hb4/4.2-finanzierungssysteme.md", "### Bedeutung für die betriebliche Steuerung ambulanter Pflegedienste"]]),
  erg("gs-5.5-ergaenzung-arbeitsrecht.md", [
    ["A", "B", "C", "hb5/5.5-arbeitsrecht.md", "### Mutterschutz und Jugendarbeitsschutz (Grundzüge)"],
    ["D", "E", "F", "hb5/5.5-arbeitsrecht.md", "### Kündigung und Kündigungsschutz"],
  ]),
  erg("gs-5.4-ergaenzung-entgelt.md", [["A", "B", "C", "hb5/5.4-personalentwicklung.md", "### Rechenbeispiel: Personalkennziffern"]]),
  erg("gs-5.1-ergaenzung-beschaeftigtendatenschutz.md", [["A", "B", "C", "hb5/5.1-personalplanung-auswahl.md", "### Rechenbeispiel: Personalbedarf nach der Kennzahlenmethode"]]),
  erg("gs-2.2-ergaenzung-qualitaetspruefung.md", [["A", "B", "C", "hb2/2.2-prozessdaten-bewerten.md", "### Zertifizierung"]]),
  erg("gs-2.3-ergaenzung-behandlungsvertrag-haftung.md", [["A", "B", "C", "hb2/2.3-vertragsrecht-risikomanagement.md", "### Grundbegriffe des Risikomanagements"]]),
  erg("gs-4.1-ergaenzung-pflegebuchfuehrung-gemeinnuetzigkeit.md", [["A", "B", "C", "hb4/4.1-rechnungswesen-jahresabschluss.md", "### Abschreibungen"]]),
  erg("gs-6.3-ergaenzung-online-auftritt.md", [["A", "B", "C", "hb6/6.3-marketingkonzepte-wettbewerbsrecht.md", "### Heilmittelwerbegesetz und berufsrechtliche Werbe-Schranken"]]),
  erg("gs-6.4-ergaenzung-spendenrecht.md", [["A", "B", "C", "hb6/6.4-sozialmarketing-fundraising-marketing-controlling.md", "### Spender:innen-Pyramide und Spendenzyklus"]]),
];
const neueThemen = [
  ["gs-4.5-krankenhaus-stationaere-pflege.md", "hb4/4.5-krankenhaus-stationaere-pflege-finanzierung.md"],
  ["gs-1.5-eingliederungshilfe-jugendhilfe.md", "hb1/1.5-eingliederungshilfe-kinder-jugendhilfe.md"],
  ["gs-2.5-datenschutz-schweigepflicht.md", "hb2/2.5-datenschutz-schweigepflicht.md"],
  ["gs-2.6-hygiene-infektionsschutz.md", "hb2/2.6-hygiene-infektionsschutz.md"],
];
const faelle = [
  ["gs-faelle-av-a.md", "hb4"], ["gs-faelle-av-b.md", "hb4"], ["gs-faelle-ay-a.md", "hb4"],
  ["gs-faelle-av-c.md", "hb1"],
  ["gs-faelle-aw-a.md", "hb5"], ["gs-faelle-aw-b.md", "hb5"],
  ["gs-faelle-ax-a.md", "hb2"], ["gs-faelle-ax-b.md", "hb2"], ["gs-faelle-ax-c.md", "hb2"],
  ["gs-faelle-ay-b.md", "hb6"],
];
const rsKandidaten = [...new Set([
  ...map.keys(),
  ...ergaenzungen.flatMap((e) => e.abschnitte.map((a) => a[3])),
  ...faelle.flatMap(([, h]) => [`${h}/fallaufgaben.md`, `${h}/fachgespraech.md`]),
])];
const rechtsstand = rsKandidaten.filter((d) => {
  const standard = RS.test(fs.readFileSync(base + d, "utf8"));
  if (!standard) console.log("eigene rechtsstand-Zeile, bleibt unberührt:", d);
  return standard;
});
const cfg = {
  kurs: "fachwirt-gesundheit-soziales",
  rsDatum: "23.10.2026",
  neueThemen,
  ergaenzungen,
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand,
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare; rechtsstand:", rechtsstand.length, "Dateien");
}
