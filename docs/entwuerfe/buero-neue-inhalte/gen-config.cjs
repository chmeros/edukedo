// Erzeugt einspielen-config.json für P-AX (Fachwirt Büro und Projektorganisation, Teile a bis j) aus den Entwürfen. Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand (nacheinander angewandt) genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen dieses Pakets (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
// Treffer in archivierten, bereits eingespielten Vorläufer-Entwürfen unter docs/entwuerfe sind unschädlich.
// Dateien mit eigener (P8-)Rechtsstandzeile bleiben in der rechtsstand-Liste unberührt.
const fs = require("fs");
const dir = "docs/entwuerfe/buero-neue-inhalte/";
const base = "content/fachwirt-buero-projektorganisation/";
const teile = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const map = new Map();
for (const t of teile) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("bp-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
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
const erg = (datei, ziel, anker) => ({ datei, abschnitte: [["A", "B", "C", ziel, anker]] });
const ergaenzungen = [
  // Reihenfolge: a vor b (gleicher Anker), e vor f (gleicher Anker), g und h mit eigenen Ankern
  erg("bp-4.2-ergaenzung-vertrag-wareneingang-maengel.md", "hb4/4.2-einkauf-beschaffung.md", "### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse"),
  erg("bp-4.2-ergaenzung-rechnung-aufbewahrung.md", "hb4/4.2-einkauf-beschaffung.md", "### Rechenbeispiel: Angebotsvergleich, Einkaufskennzahlen und ABC-Analyse"),
  erg("bp-2.3-ergaenzung-werberecht.md", "hb2/2.3-werbemittel.md", "### Ergebnisse zielgruppengerecht darstellen"),
  erg("bp-2.4-ergaenzung-veranstaltungsrecht.md", "hb2/2.4-veranstaltungsmanagement.md", "### Veranstaltungsablaufplan erarbeiten"),
  erg("bp-3.1-ergaenzung-arbeitszeit-urlaub-entgelt.md", "hb3/3.1-personalwirtschaft.md", "### Personalentwicklung"),
  erg("bp-3.1-ergaenzung-beendigung-zeugnis.md", "hb3/3.1-personalwirtschaft.md", "### Personalentwicklung"),
  erg("bp-3.2-ergaenzung-ausbildungsvertrag.md", "hb3/3.2-ausbildung.md", "### Ausbildung zielgruppengerecht durchführen"),
  erg("bp-3.2-ergaenzung-pruefung-beendigung.md", "hb3/3.2-ausbildung.md", "### Berufseinstieg gestalten"),
  erg("bp-4.3-ergaenzung-datenschutz.md", "hb4/4.3-it-anwendungen.md", "### Anforderungen und Leistungen vergleichen"),
  erg("bp-2.5-ergaenzung-korrespondenz.md", "hb2/2.5-kundenkommunikation-beschwerdemanagement.md", "### Kommunikationsstandards vermitteln"),
];
const faelle = [
  ["bp-faelle-a.md", "hb4"], ["bp-faelle-b.md", "hb4"], ["bp-faelle-i.md", "hb4"],
  ["bp-faelle-c.md", "hb2"], ["bp-faelle-d.md", "hb2"], ["bp-faelle-j.md", "hb2"],
  ["bp-faelle-e.md", "hb3"], ["bp-faelle-f.md", "hb3"], ["bp-faelle-g.md", "hb3"], ["bp-faelle-h.md", "hb3"],
];
const rsKandidaten = [...new Set([
  ...map.keys(),
  ...ergaenzungen.flatMap((e) => e.abschnitte.map((a) => a[3])),
  ...["hb2", "hb3", "hb4"].flatMap((h) => [`${h}/fallaufgaben.md`, `${h}/fachgespraech.md`]),
])];
const rechtsstand = rsKandidaten.filter((d) => {
  const standard = RS.test(fs.readFileSync(base + d, "utf8"));
  if (!standard) console.log("eigene rechtsstand-Zeile, bleibt unberührt:", d);
  return standard;
});
const cfg = {
  kurs: "fachwirt-buero-projektorganisation",
  rsDatum: "23.10.2026",
  neueThemen: [],
  ergaenzungen,
  faelle,
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand,
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare; rechtsstand:", rechtsstand.length, "Dateien");
}
