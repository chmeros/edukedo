const fs = require("fs");
const base = "content/handelsfachwirt/";
const paare = {
  "hb1/1.7-unternehmensformen-gruendung.md": [
    ["können außergewöhnlichen Geschäften widersprechen und haben Kontrollrechte (Einsicht in den Jahresabschluss) |", "wirken bei Geschäften über den gewöhnlichen Betrieb hinaus am Gesellschafterbeschluss mit (Stand Oktober 2026, vor Verwendung prüfen) und haben Informationsrechte (Einsicht in den Jahresabschluss) |"],
    ["können aber außergewöhnlichen Geschäften widersprechen und haben Kontrollrechte.", "wirken aber bei Geschäften über den gewöhnlichen Betrieb hinaus am Gesellschafterbeschluss mit und haben Informationsrechte (Stand Oktober 2026, vor Verwendung prüfen)."],
    ["- [x] Kommanditist:innen können außergewöhnlichen Geschäften widersprechen.", "- [x] Bei Geschäften über den gewöhnlichen Betrieb hinaus wirken die Kommanditist:innen am Gesellschafterbeschluss mit."],
    ["und haben Kontroll- und Widerspruchsrechte.", "wirken bei Geschäften über den gewöhnlichen Betrieb hinaus am Gesellschafterbeschluss mit und haben Informationsrechte (Stand Oktober 2026, vor Verwendung prüfen)."]
  ],
  "hb1/fallaufgaben.md": [
    ["haben aber Widerspruchs- und Kontrollrechte.", "wirken aber bei Geschäften über den gewöhnlichen Betrieb hinaus am Gesellschafterbeschluss mit und haben Informationsrechte."],
    ["kann aber außergewöhnlichen Geschäften widersprechen und hat Kontrollrechte (Einsicht in den Jahresabschluss)", "wirkt aber bei Geschäften über den gewöhnlichen Betrieb hinaus am Gesellschafterbeschluss mit und hat Informationsrechte (Einsicht in den Jahresabschluss)"]
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
  const cfg = { kurs: "handelsfachwirt", rsDatum: "16.10.2026", neueThemen: [], ergaenzungen: [], faelle: [], ersetzungen: Object.entries(paare).map(([datei, p]) => ({ datei, paare: p })), rechtsstand: [] };
  fs.writeFileSync("docs/entwuerfe/handelsfachwirt-korrektur-kg/einspielen-config.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log("config geschrieben");
}
