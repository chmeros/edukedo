import { readFileSync } from "node:fs";
import { QUADRANT_MODELS, isQuadrantItem } from "@edukedo/shared";
import { extractSection, parseKarteikarten, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";

/**
 * Redaktionswerkzeug: prüft Content-Markdown-Dateien ohne Datenbank gegen den Parser des Imports (Frontmatter,
 * Karteikarten, Quiz-Blöcke inkl. Zonen-Instrumente mit gültigen Zonen-Beschriftungen) und gibt eine Übersicht je Datei
 * aus. Aufruf aus `apps/api`:
 *   npx tsx src/db/validate-content-md.ts ../../content/<kurs>/<ordner>/<datei>.md [weitere …]
 * Exit-Code 1 bei Fehlern.
 */
let fehler = 0;

for (const datei of process.argv.slice(2)) {
  const roh = readFileSync(datei, "utf8").replace(/\r\n/g, "\n");
  try {
    const { frontmatter, body } = splitFrontmatter(roh);
    for (const pflicht of ["kurs_slug", "fachgebiet_code", "thema_code", "thema_title"]) {
      if (!frontmatter[pflicht]) throw new Error(`Frontmatter-Feld "${pflicht}" fehlt`);
    }
    const karten = parseKarteikarten(extractSection(body, "Karteikarten") ?? "");
    const quizBlock = extractSection(body, "Quiz") ?? "";
    const bloecke = splitBlocks(quizBlock);
    const arten: Record<string, number> = {};
    for (const block of bloecke) {
      const parsed = parseQuizBlock(block);
      if (!parsed) throw new Error(`Quiz-Block nicht lesbar: ${block.split("\n")[0]}`);
      arten[parsed.type] = (arten[parsed.type] ?? 0) + 1;
      if (isQuadrantItem(parsed)) {
        const zonen = QUADRANT_MODELS[parsed.type].zones.map((zone) => zone.key);
        const benutzt = new Set(parsed.terms.map((term) => term.zoneKey));
        const fehlend = zonen.filter((zone) => !benutzt.has(zone));
        if (fehlend.length > 0) console.warn(`  Hinweis ${block.split("\n")[0]}: Zone(n) ohne Begriff: ${fehlend.join(", ")}`);
      }
    }
    const theorie = extractSection(body, "Theorie") ?? "";
    console.log(`OK  ${datei}: Theorie ${theorie.length} Zeichen, ${karten.length} Karteikarten, ${bloecke.length} Quiz-Blöcke (${Object.entries(arten).map(([art, anzahl]) => `${art} ${anzahl}`).join(", ")})`);
  } catch (error) {
    fehler += 1;
    console.error(`FEHLER ${datei}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

process.exit(fehler > 0 ? 1 : 0);
