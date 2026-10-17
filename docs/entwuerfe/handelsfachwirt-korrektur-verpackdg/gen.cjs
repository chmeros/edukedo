const fs = require("fs");
const base = "content/handelsfachwirt/";
const paare = {
  "hb4/4.4-entsorgung-kreislaufwirtschaft.md": [
    ["| Verpackungen | Verpackungsgesetz (VerpackG) und EU-Verpackungsverordnung |", "| Verpackungen | EU-Verpackungsverordnung und Verpackungsrecht-Durchführungsgesetz (VerpackDG, löst seit dem 12.08.2026 das Verpackungsgesetz ab; Stand Oktober 2026, vor Verwendung prüfen) |"],
    ["Beim Verpackungsgesetz entscheidet das erstmalige", "Beim Verpackungsrecht entscheidet das erstmalige"],
    ["| Verkaufs- und Versandverpackungen | Verpackungsgesetz |", "| Verkaufs- und Versandverpackungen | Verpackungsrecht (VerpackDG) |"],
    ["| Transport- und Umverpackungen im Gewerbe | Verpackungsgesetz |", "| Transport- und Umverpackungen im Gewerbe | Verpackungsrecht (VerpackDG) |"],
    ["Das Verpackungsrecht ist im Umbruch: Die EU-Verpackungsverordnung gilt nach dem Stand Oktober 2026 seit dem 12.08.2026 unmittelbar, und welche Vorschriften des nationalen Verpackungsgesetzes daneben fortgelten oder angepasst wurden, ist zeitkritisch (vor Verwendung prüfen). Die folgende Darstellung gibt die bisherige Systematik des Verpackungsgesetzes wieder. Es knüpft",
     "Das Verpackungsrecht ist im Umbruch: Die EU-Verpackungsverordnung (Verordnung (EU) 2025/40) gilt seit dem 12.08.2026 unmittelbar, und das Verpackungsrecht-Durchführungsgesetz (VerpackDG) hat das bisherige Verpackungsgesetz abgelöst (Stand Oktober 2026, vor Verwendung prüfen; zeitkritisch, Übergangsfristen laufen). Die folgende Darstellung gibt nur die Grundsystematik wieder, Einzelheiten und Fristen bleiben offen. Sie knüpft"],
    ["die Mehrwegangebotspflicht des Verpackungsgesetzes betrifft", "die Mehrwegangebotspflicht des nationalen Verpackungsrechts betrifft"],
    ["Die Systematik folgt dem bisherigen Verpackungsgesetz; neben der EU-Verpackungsverordnung ist der Stand zeitkritisch (Stand Oktober 2026, vor Verwendung prüfen).", "Dargestellt ist die Grundsystematik; seit dem 12.08.2026 gelten die EU-Verpackungsverordnung und das Verpackungsrecht-Durchführungsgesetz, Einzelheiten und Übergangsfristen sind zeitkritisch (Stand Oktober 2026, vor Verwendung prüfen)."]
  ],
  "hb4/fallaufgaben.md": [
    ["Nach der bisherigen Systematik des Verpackungsgesetzes (neben der seit 12.08.2026 unmittelbar geltenden EU-Verpackungsverordnung ist der Stand zeitkritisch)", "Nach der Grundsystematik des Verpackungsrechts (seit 12.08.2026 gelten die EU-Verpackungsverordnung unmittelbar und das Verpackungsrecht-Durchführungsgesetz, das das bisherige Verpackungsgesetz ablöst; Einzelheiten und Übergangsfristen zeitkritisch)"]
  ]
};
let ok = true;
for (const [d, ps] of Object.entries(paare)) {
  const t = fs.readFileSync(base + d, "utf8");
  for (const [a] of ps) {
    const n = t.split(a).length - 1;
    console.log(d, n, a.slice(0, 50));
    if (n !== 1) ok = false;
  }
}
if (ok) {
  const cfg = { kurs: "handelsfachwirt", rsDatum: "17.10.2026", neueThemen: [], ergaenzungen: [], faelle: [], ersetzungen: Object.entries(paare).map(([datei, p]) => ({ datei, paare: p })), rechtsstand: [] };
  fs.writeFileSync("docs/entwuerfe/handelsfachwirt-korrektur-verpackdg/einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben");
}
