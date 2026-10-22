// Erzeugt einspielen-config.json für P-AS aus den Entwürfen (Teile A bis E). Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
const fs = require("fs");
const dir = "docs/entwuerfe/aevo-neue-inhalte-hf1-hf2/";
const base = "content/ausbildung-der-ausbilder/";
const map = new Map();
for (const t of ["a", "b", "c", "d", "e"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Auftraggeber: Einleitungen der Fallaufgaben-Dateien und Frontmatter-quelle (alles einzeilig, genau ein Treffer).
const extra = (datei, a, b) => { if (!map.has(datei)) map.set(datei, []); map.get(datei).push([a, b]); };
extra("hf1/fallaufgaben.md", "Diese Aufgaben verknüpfen mehrere Themen aus HF1 (1.1–1.3)", "Diese Aufgaben verknüpfen mehrere Themen aus HF1 (1.1–1.4)");
extra("hf1/fallaufgaben.md", "Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben", "Jede Aufgabe besteht aus einer Ausgangssituation und vier oder fünf Teilaufgaben mit Punktangaben");
extra("hf2/fallaufgaben.md", "Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben", "Jede Aufgabe besteht aus einer Ausgangssituation und vier oder fünf Teilaufgaben mit Punktangaben");
extra("hf1/1.1-rechtliche-grundlagen-berufsausbildung.md", "§ 2 Nr. 1 und § 3 Abs. 1 (Handlungsfeld 1) — frei formuliert", "§ 2 Nr. 1 und § 3 Abs. 1 (Handlungsfeld 1) sowie §§ 4 bis 7 (Prüfung, Anerkennung, Bestandsschutz) und Berufsbildungsgesetz (BBiG) §§ 39 bis 47 (Prüfungsausschuss, Prüfung) — frei formuliert");
extra("hf1/1.2-ausbildungsbedarf-ausbildungsberuf.md", "Auswahl von Ausbildungsberufen) — frei formuliert", "Auswahl von Ausbildungsberufen) sowie Berufsbildungsgesetz (BBiG) § 7a (Teilzeitberufsausbildung) — frei formuliert");
extra("hf1/1.3-eignung-betrieb-kooperationsformen.md", "vorbereitende Maßnahmen, Mitwirkende) — frei formuliert", "vorbereitende Maßnahmen, Mitwirkende) sowie Berufsbildungsgesetz (BBiG) §§ 27 bis 36 (Eignung der Ausbildenden und Ausbilder:innen) — frei formuliert");
extra("hf2/2.3-auswahl-ausbildungsvertrag.md", "§§ 2 Abs. 3/11/20/34/36, des Dritten Buches Sozialgesetzbuch (SGB III) §§ 54a und 76 und des Allgemeinen Gleichbehandlungsgesetzes (AGG)", "§§ 2 Abs. 3/11/17/20/34/36, des Dritten Buches Sozialgesetzbuch (SGB III) §§ 54a und 76, des Neunten Buches Sozialgesetzbuch (SGB IX) §§ 164 f. und des Allgemeinen Gleichbehandlungsgesetzes (AGG)");

const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("aevo-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
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
    for (const [f, t] of entwuerfe) if (t.includes(a)) { ok = false; console.log("ALTE ZEICHENKETTE AUCH IM ENTWURF", f, a.slice(0, 60)); }
  }
}
const cfg = {
  kurs: "ausbildung-der-ausbilder",
  rsDatum: "22.10.2026",
  neueThemen: [["aevo-1.4-jugendarbeitsschutz.md", "hf1/1.4-jugendarbeitsschutz-im-betrieb.md"]],
  ergaenzungen: [
    { datei: "aevo-1.1-ergaenzung-pruefung-zur-ausbildereignung.md", abschnitte: [["A", "B", "C", "hf1/1.1-rechtliche-grundlagen-berufsausbildung.md", "### Grundzüge des Jugendarbeitsschutzgesetzes (JArbSchG)"]] },
    { datei: "aevo-1.2-ergaenzung-teilzeit-zielgruppen-kosten-nutzen.md", abschnitte: [["A", "B", "C", "hf1/1.2-ausbildungsbedarf-ausbildungsberuf.md"]] },
    { datei: "aevo-1.3-ergaenzung-ausbildende-ausbilder-eignung.md", abschnitte: [["A", "B", "C", "hf1/1.3-eignung-betrieb-kooperationsformen.md"]] },
    { datei: "aevo-2.3-ergaenzung-verguetung-datenschutz-agg.md", abschnitte: [["A", "B", "C", "hf2/2.3-auswahl-ausbildungsvertrag.md"]] },
  ],
  faelle: [
    ["aevo-faelle-a.md", "hf1"],
    ["aevo-faelle-b.md", "hf1"],
    ["aevo-faelle-c.md", "hf1"],
    ["aevo-faelle-e.md", "hf1"],
    ["aevo-faelle-d.md", "hf2"],
  ],
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...new Set([...map.keys(), "hf1/1.4-jugendarbeitsschutz-im-betrieb.md", "hf1/fachgespraech.md", "hf2/fachgespraech.md", "hf1/fallaufgaben.md", "hf2/fallaufgaben.md"])]
    .filter((d) => d !== "hf1/1.4-jugendarbeitsschutz-im-betrieb.md"),
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare");
}
