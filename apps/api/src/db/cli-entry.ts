import path from "node:path";

/**
 * Wahr, wenn der laufende Prozess genau dieses Skript gestartet hat (z. B. `tsx src/db/import-content.ts` oder
 * `node dist/import-content.js`), nicht wenn das Modul nur importiert wird.
 *
 * Der frühere Vergleich `import.meta.url === pathToFileURL(process.argv[1]).href` versagt in einem gebündelten Build: Dort
 * haben alle Module einer Datei dieselbe `import.meta.url`, und der Server (dist/index.js) würde die Kommandozeilen-Blöcke
 * aller importierten Skripte mitstarten. Der Vergleich über den Dateinamen unterscheidet beide Fälle.
 */
export function isCliEntry(name: string): boolean {
  const start = process.argv[1];
  if (!start) return false;
  return path.basename(start).replace(/\.(ts|js|mjs|cjs)$/, "") === name;
}
