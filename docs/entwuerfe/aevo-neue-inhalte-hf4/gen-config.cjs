// Erzeugt einspielen-config.json für P-AT aus den Entwürfen (Teile A und B). Aufruf aus der Repo-Wurzel.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
const fs = require("fs");
const dir = "docs/entwuerfe/aevo-neue-inhalte-hf4/";
const base = "content/ausbildung-der-ausbilder/";
const map = new Map();
for (const t of ["a", "b"]) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) {
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
}
// Auftraggeber: Einleitung der Fallaufgaben-Datei (einzeilig, genau ein Treffer).
const extra = (datei, a, b) => { if (!map.has(datei)) map.set(datei, []); map.get(datei).push([a, b]); };
extra("hf4/fallaufgaben.md", "Diese Aufgaben verknüpfen die beiden Themen aus HF4 (4.1 und 4.2)", "Diese Aufgaben verknüpfen die Themen aus HF4 (4.1 bis 4.3)");
extra("hf4/fallaufgaben.md", "Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben", "Jede Aufgabe besteht aus einer Ausgangssituation und vier oder fünf Teilaufgaben mit Punktangaben");

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
  rsDatum: "23.10.2026",
  neueThemen: [["aevo-4.3-beendigung-ausbildungsverhaeltnis.md", "hf4/4.3-beendigung-ausbildungsverhaeltnis.md"]],
  ergaenzungen: [
    { datei: "aevo-4.1-ergaenzung-abschlusspruefung-wiederholung.md", abschnitte: [["A", "B", "C", "hf4/4.1-pruefungsvorbereitung-anmeldung.md"]] },
  ],
  faelle: [
    ["aevo-faelle-a.md", "hf4"],
    ["aevo-faelle-b.md", "hf4"],
  ],
  ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
  rechtsstand: [...new Set([...map.keys(), "hf4/fachgespraech.md", "hf4/fallaufgaben.md"])],
};
if (ok) {
  fs.writeFileSync(dir + "einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare");
}
