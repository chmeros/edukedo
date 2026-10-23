// Erzeugt einspielen-config.json für P-AQ aus den Entwürfen (Teile A bis H). Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
const fs = require("fs");
const dir = "docs/entwuerfe/immobilien-weitere-r4/";
const base = "content/immobilienfachwirt/";
const map = new Map();
for (const t of ["a", "b", "c", "d", "e", "f", "g", "h"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Auftraggeber: Einleitung der Fallaufgaben-Datei HB1 (neues Thema 1.5), einzeilig, genau ein Treffer.
const extra = (datei, a, b) => { if (!map.has(datei)) map.set(datei, []); map.get(datei).push([a, b]); };
extra("hb1/fallaufgaben.md", "Diese Aufgaben verknüpfen mehrere Themen aus HB1 (1.1–1.4)", "Diese Aufgaben verknüpfen mehrere Themen aus HB1 (1.1–1.5)");

const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("im-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
let ok = true;
for (const [d, ps] of map) {
  let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
  if (!RS.test(text)) { ok = false; console.log("RECHTSSTAND-ZEILE PASST NICHT", d); }
  for (const [a, b] of ps) {
    if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", d, a.slice(0, 60)); }
    const n = text.split(a).length - 1;
    if (n !== 1) { ok = false; console.log("FEHLER", d, n, a.slice(0, 60)); continue; }
    if (b.includes(a)) { ok = false; console.log("NEUE ENTHÄLT ALTE", d, a.slice(0, 60)); }
    text = text.replace(a, () => b);
    for (const [f, t] of entwuerfe) if (t.includes(a)) { ok = false; console.log("ALTE ZEICHENKETTE AUCH IM ENTWURF", f, a.slice(0, 60)); }
  }
}
const erg = (datei, ziel, anker) => ({ datei, abschnitte: [anker ? ["A", "B", "C", ziel, anker] : ["A", "B", "C", ziel]] });
const cfg = {
  kurs: "immobilienfachwirt",
  rsDatum: "23.10.2026",
  neueThemen: [["im-1.5-grundstuecksrechte.md", "hb1/1.5-grundstuecksrechte.md"]],
  ergaenzungen: [
    erg("im-6.2-ergaenzung-recht-im-vertrieb.md", "hb6/6.2-marketing-fuer-immobilien.md", "### Zielgruppenansprache und Marketingmix"),
    erg("im-6.1-ergaenzung-maklervertrag-praxis.md", "hb6/6.1-maklerrecht-maklertaetigkeit.md", "### Aufklärungs- und Sorgfaltspflichten des Maklers"),
    erg("im-5.3-ergaenzung-baulast-brandschutz.md", "hb5/5.3-baurecht-grundzuege.md"),
    erg("im-5.2-ergaenzung-vergabe-baustelle.md", "hb5/5.2-bauplanung-durchfuehrung.md", "### Bauüberwachung"),
    erg("im-1.4-ergaenzung-gebaeudeenergierecht.md", "hb1/1.4-nachhaltigkeit-esg.md", "### ESG-Kriterien in der Immobilienbewirtschaftung und -entwicklung"),
    erg("im-4.1-ergaenzung-gewerberaummiete.md", "hb4/4.1-mietverwaltung.md", "### Kündigung und Räumung (Grundzüge)"),
    erg("im-2.3-ergaenzung-liquiditaetsgrade-faustwerte.md", "hb2/2.3-controlling-kennzahlen.md", "### Liquiditätsplanung in der Hausverwaltung: Ziel und Aufbau"),
  ],
  faelle: [
    ["im-faelle-a.md", "hb6"],
    ["im-faelle-b.md", "hb6"],
    ["im-faelle-c.md", "hb1"],
    ["im-faelle-d.md", "hb5"],
    ["im-faelle-e.md", "hb5"],
    ["im-faelle-f.md", "hb4", "hb1"],
    ["im-faelle-g.md", "hb4"],
  ],
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...new Set([...map.keys(), "hb1/fallaufgaben.md", "hb1/fachgespraech.md", "hb4/fallaufgaben.md", "hb4/fachgespraech.md", "hb5/fallaufgaben.md", "hb5/fachgespraech.md", "hb6/fallaufgaben.md", "hb6/fachgespraech.md", "hb6/6.1-maklerrecht-maklertaetigkeit.md", "hb6/6.2-marketing-fuer-immobilien.md", "hb5/5.2-bauplanung-durchfuehrung.md", "hb5/5.3-baurecht-grundzuege.md", "hb1/1.4-nachhaltigkeit-esg.md", "hb4/4.1-mietverwaltung.md", "hb2/2.3-controlling-kennzahlen.md"])],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare");
}
