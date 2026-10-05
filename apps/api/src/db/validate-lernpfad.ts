import { pruefeLernpfadPayload, pruefeStationsnamenVollstaendig } from "@edukedo/shared";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * F-168: Kommandozeilen-Prüfung für Lernpfad-Content (Redaktionswerkzeug):
 *   npx tsx src/db/validate-lernpfad.ts src/db/content/instrument-lernpfad-<name>.ts
 * Lädt die Datei, nimmt jeden Export, der wie ein Lernpfad-Payload aussieht, und gibt Schema- und
 * Strukturprobleme aus (Exit-Code 1 bei Problemen). Ohne Argument werden alle Dateien
 * `db/content/instrument-lernpfad-*.ts` geprüft.
 */
async function main() {
  const dateien = process.argv.slice(2);
  if (dateien.length === 0) {
    const { readdirSync } = await import("node:fs");
    const verzeichnis = path.resolve(import.meta.dirname, "content");
    for (const name of readdirSync(verzeichnis)) if (/^instrument-lernpfad-.*\.ts$/.test(name)) dateien.push(path.join(verzeichnis, name));
  }
  let fehlerGesamt = 0;
  for (const datei of dateien) {
    const modul = (await import(pathToFileURL(path.resolve(datei)).href)) as Record<string, unknown>;
    const payloads = Object.entries(modul).filter(([, wert]) => typeof wert === "object" && wert !== null && "grundlagenfragen" in wert);
    if (payloads.length === 0) {
      console.log(`${path.basename(datei)}: kein Lernpfad-Export gefunden.`);
      fehlerGesamt += 1;
      continue;
    }
    for (const [name, payload] of payloads) {
      const probleme = [...pruefeLernpfadPayload(payload), ...(/bsc/i.test(datei) ? [] : pruefeStationsnamenVollstaendig(payload))];
      console.log(`${path.basename(datei)} / ${name}: ${probleme.length === 0 ? "OK" : `${probleme.length} Problem(e)`}`);
      for (const problem of probleme) console.log(`  - ${problem}`);
      fehlerGesamt += probleme.length;
    }
  }
  process.exit(fehlerGesamt === 0 ? 0 : 1);
}

void main();
