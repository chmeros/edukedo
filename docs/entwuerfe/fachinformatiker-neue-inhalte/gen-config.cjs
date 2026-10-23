// Erzeugt je Fachinformatiker-Kurs cfg-<kurs>/einspielen-config.json für P-AY (Teile a bis m) aus den Entwürfen. Aufruf aus der Repo-Wurzel.
// Die Entwürfe liegen gemeinsam in diesem Ordner ("entwuerfe": ".." relativ zu cfg-<kurs>); kurs-spezifische Teile (C, M: AE; D: DV; E: SI; H: DP) gehen nur in ihren Kurs.
// Prüft zusätzlich: jede alte Zeichenkette der Ersetzungen kommt im Bestand (nacheinander angewandt) genau einmal und einzeilig vor
// und NICHT in den einzufügenden Entwürfen dieses Pakets (einspielen.cjs ersetzt alle Treffer, nachdem die Entwürfe eingefügt wurden).
// Treffer in archivierten, bereits eingespielten Vorläufer-Entwürfen unter docs/entwuerfe sind unschädlich.
// Dateien mit eigener (P8-)Rechtsstandzeile bleiben in der rechtsstand-Liste unberührt.
const fs = require("fs");
const dir = "docs/entwuerfe/fachinformatiker-neue-inhalte/";
const KURSE = {
  ae: "fachinformatiker-anwendungsentwicklung",
  dp: "fachinformatiker-daten-prozessanalyse",
  dv: "fachinformatiker-digitale-vernetzung",
  si: "fachinformatiker-systemintegration",
};
const teile = "abcdefghijklm".split("");
const alle = [];
for (const t of teile) {
  for (const e of JSON.parse(fs.readFileSync(dir + `ersetzungen-${t}.json`, "utf8"))) alle.push(e);
}
// kursspezifische Ordner: ae*, dp*, dv*, si*; fu* gilt für alle vier
const gehoert = (datei, k) => {
  const m = datei.match(/^(ae|dp|dv|si)\d/);
  return !m || m[1] === k;
};
const entwuerfe = fs.readdirSync(dir).filter((f) => f.startsWith("fi-") && f.endsWith(".md")).map((f) => [f, fs.readFileSync(dir + f, "utf8").replace(/\r\n/g, "\n")]);
const RS = /rechtsstand: "[0-9.]+( \([^)]*\))? — rechtliche Passagen vor Verwendung durch echte Lernende fachlich\/rechtlich prüfen[^"]*"/;
const erg = (datei, ziel, anker, nur) => ({ datei, nur, abschnitte: [["A", "B", "C", ziel, anker]] });
// Reihenfolge: gleiche Zieldatei nacheinander in der Reihenfolge der Auflistung
const ergAlle = [
  erg("fi-6.2-ergaenzung-datenschutz.md", "fu6/6.2-datenschutz.md", "### Datenschutzbeauftragte und Datenpannen"),
  erg("fi-1.3-ergaenzung-it-vertraege.md", "fu1/1.3-leistungserbringung-dokumentation-auftragsabschluss.md", "### Kosten erfassen und im Soll-Ist-Vergleich bewerten"),
  erg("fi-1.2-ergaenzung-uwg.md", "fu1/1.2-kundenberatung-bedarfsermittlung-marketing.md", "### Marktbeobachtung und Wettbewerbsvergleich"),
  erg("fi-2.2-ergaenzung-urheberrecht-lizenzen.md", "fu2/2.2-betriebssysteme-software-lizenzen.md", "### Virtualisierung als Grundkonzept"),
  erg("fi-9.1-ergaenzung-cra-entwicklung.md", "ae2/9.1-sicherheit-in-der-softwareentwicklung.md", "### Sicherheit im Entwicklungsprozess verankern", "ae"),
  erg("fi-8.3-ergaenzung-barrierefreiheit-recht.md", "ae1/8.3-benutzerschnittstellen-ergonomie.md", "### Prototyping und Abstimmung mit dem Kunden", "ae"),
  erg("fi-11.3-ergaenzung-ot-recht.md", "dv4/11.3-systemressourcen-kennzahlen-betriebssicherheit.md", "### Bereichsspezifische Sicherheitslösungen im Betrieb", "dv"),
  erg("fi-12.2-ergaenzung-managed-services-recht.md", "si5/12.2-umsetzung-schutzmassnahmen-dokumentation.md", "### Wirtschaftlichkeit: Kosten und Nutzen", "si"),
  erg("fi-9.2-ergaenzung-data-act.md", "dp2/9.2-nutzungsberechtigung-verknuepfung.md", "### Zweckbindung und Rechtsgrundlage — grundlagenorientiert", "dp"),
];
// neue Themen (gemeinsame Entwürfe, kurs_slug wird je Kurs gesetzt)
const neueThemen = [
  ["fi-6.6-nis2-kritis-meldepflichten.md", "fu6/6.6-nis2-kritis-meldepflichten.md"],
  ["fi-6.7-cyber-resilience-act.md", "fu6/6.7-cyber-resilience-act.md"],
  ["fi-6.8-ki-verordnung-ki-einsatz.md", "fu6/6.8-ki-verordnung-ki-einsatz.md"],
  ["fi-7.6-verbraucherrecht-kaufvertrag.md", "fu7/7.6-verbraucherrecht-kaufvertrag.md"],
];
// Fälle: [Entwurf, Ordner, nur-Kurs]; Fachgespräch geht im Entwurf mit, wenn vorhanden
const faelleAlle = [
  ["fi-faelle-a.md", "fu6"], ["fi-faelle-b.md", "fu6"], ["fi-faelle-f.md", "fu6"], ["fi-faelle-g.md", "fu6"],
  ["fi-faelle-i.md", "fu7"], ["fi-faelle-j.md", "fu1"], ["fi-faelle-k.md", "fu2"],
  ["fi-faelle-c.md", "ae2", "ae"], ["fi-faelle-d.md", "dv4", "dv"], ["fi-faelle-e.md", "si5", "si"], ["fi-faelle-h.md", "dp2", "dp"],
];
// Einleitungen der Fallaufgaben-Sammlung (Auftraggeberanpassung, alle Kurse gleich)
const extra = [
  { datei: "fu6/fallaufgaben.md", paare: [
    ["Diese Aufgaben verknüpfen mehrere Themen aus FU6 (6.1–6.5) zu", "Diese Aufgaben verknüpfen mehrere Themen aus FU6 (6.1–6.8) zu"],
    ["Ausgangssituation und vier Teilaufgaben mit Punktangaben;", "Ausgangssituation und vier bis fünf Teilaufgaben mit Punktangaben;"],
  ] },
  // F-DV4-04 hat fünf Teilaufgaben (nur Kurs Digitale Vernetzung)
  { datei: "dv4/fallaufgaben.md", paare: [
    ["Ausgangssituation und vier Teilaufgaben mit Punktangaben;", "Ausgangssituation und vier bis fünf Teilaufgaben mit Punktangaben;"],
  ] },
];
let ok = true;
const abgleich = new Set();
for (const [k, kurs] of Object.entries(KURSE)) {
  const base = `content/${kurs}/`;
  const map = new Map();
  for (const e of [...alle, ...extra]) {
    if (!gehoert(e.datei, k)) continue;
    if (!map.has(e.datei)) map.set(e.datei, []);
    map.get(e.datei).push(...e.paare);
  }
  for (const [d, ps] of map) {
    let text = fs.readFileSync(base + d, "utf8").replace(/\r\n/g, "\n");
    for (const [a, b] of ps) {
      if (a.includes("\n")) { ok = false; console.log("MEHRZEILIG", k, d, a.slice(0, 60)); }
      const n = text.split(a).length - 1;
      if (n !== 1) { ok = false; console.log("FEHLER", k, d, n, a.slice(0, 60)); continue; }
      if (b.includes(a)) { ok = false; console.log("NEUE ENTHÄLT ALTE", k, d, a.slice(0, 60)); }
      text = text.replace(a, () => b);
      for (const [f, t] of entwuerfe) if (t.includes(a)) { ok = false; console.log("ALTE ZEICHENKETTE AUCH IM ENTWURF", f, a.slice(0, 60)); }
    }
  }
  const ergaenzungen = ergAlle.filter((e) => !e.nur || e.nur === k).map(({ datei, abschnitte }) => ({ datei, abschnitte }));
  const faelle = faelleAlle.filter((f) => !f[2] || f[2] === k).map((f) => [f[0], f[1]]);
  const ordner = [...new Set(faelle.map((f) => f[1]))];
  const rsKandidaten = [...new Set([
    ...map.keys(),
    ...ergaenzungen.flatMap((e) => e.abschnitte.map((a) => a[3])),
    ...ordner.flatMap((o) => [`${o}/fallaufgaben.md`, `${o}/fachgespraech.md`]),
  ])].filter((d) => fs.existsSync(base + d));
  const rechtsstand = rsKandidaten.filter((d) => {
    const standard = RS.test(fs.readFileSync(base + d, "utf8"));
    if (!standard && !abgleich.has(d)) { console.log("eigene rechtsstand-Zeile, bleibt unberührt:", d); abgleich.add(d); }
    return standard;
  });
  const cfg = {
    kurs,
    entwuerfe: "..",
    rsDatum: "23.10.2026",
    neueThemen,
    ergaenzungen,
    faelle,
    ersetzungen: [...map].map(([datei, paare]) => ({ datei, paare })),
    rechtsstand,
  };
  if (ok) {
    fs.mkdirSync(dir + `cfg-${k}`, { recursive: true });
    fs.writeFileSync(dir + `cfg-${k}/einspielen-config.json`, JSON.stringify(cfg, null, 2) + "\n");
    console.log(k, "config geschrieben:", cfg.ersetzungen.length, "Dateien,", cfg.ersetzungen.reduce((s, e) => s + e.paare.length, 0), "Paare; ergänzungen", ergaenzungen.length, "; fälle", faelle.length, "; rechtsstand:", rechtsstand.length, "Dateien");
  }
}
if (!ok) process.exit(1);
