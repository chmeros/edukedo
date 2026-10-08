import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateContentDir } from "./content-keys";

/**
 * `pnpm db:validate-content`: prüft die Markdown-Dateien in content/ auf Pflichtfelder, eindeutige Themen und eindeutige
 * Item-Schlüssel, ohne Datenbankzugriff (Entwurf docs/entwuerfe/sicherer-content-import.md). Exit-Code 1 bei Verstößen.
 */
const CONTENT_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");

validateContentDir(CONTENT_DIR)
  .then((report) => {
    for (const issue of report.issues) console.error(issue);
    console.log(`${report.files} Themendateien, ${report.items} Item-Schlüssel, ${report.issues.length} Verstöße.`);
    if (report.issues.length > 0) process.exit(1);
  })
  .catch((error: unknown) => {
    console.error("Validierung fehlgeschlagen:", error);
    process.exit(1);
  });
