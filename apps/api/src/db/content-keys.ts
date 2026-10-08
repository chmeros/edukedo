import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { extractSection, parseFachgespraechFragen, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";

/**
 * Stabile Schlüssel für den Content-Import (Entwurf docs/entwuerfe/sicherer-content-import.md, Abschnitt 4.1, Schritt 2).
 * Reine Funktionen ohne Datenbankzugriff: Sie leiten aus dem Markdown den Schlüssel jedes Items ab und prüfen vorab, ob
 * die Schlüssel eindeutig sind. Der Importer nutzt sie später, um Items wiederzuerkennen statt sie zu löschen und neu
 * anzulegen; bis dahin dient `pnpm db:validate-content` als Prüfung der Content-Dateien.
 */

/** Schlüssel der Theorie eines Themas (je Thema genau ein Item). */
export const THEORIE_SOURCE_KEY = "theorie";

/** Länge des Hash-Anteils im Schlüssel einer Fachgesprächsfrage. */
const FG_HASH_LENGTH = 16;

/** ID aus der Überschrift eines `####`-Blocks (z. B. `#### K-1.1-01` oder `#### Q-6.1-17 · Kryptografie-Bausteine`). */
export function blockSourceKey(block: string): string | null {
  const match = /^#### (\S+?)(?:\s+·\s.*)?\s*$/m.exec(block.split("\n")[0] ?? "");
  return match ? match[1]! : null;
}

/** Schlüssel einer Fachgesprächsfrage (Aufzählungspunkt ohne ID): Hash des normalisierten Fragetexts. */
export function fachgespraechSourceKey(frage: string): string {
  const normalized = frage.normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
  return `fg:${createHash("sha256").update(normalized).digest("hex").slice(0, FG_HASH_LENGTH)}`;
}

export interface ThemaSourceKeys {
  /** Schlüssel in Dateireihenfolge, `theorie` zuerst, je Itemart in der Reihenfolge des Importers. */
  keys: { key: string; art: "theorie" | "karteikarte" | "quiz" | "fallaufgabe" | "fachgespraech" }[];
  /** Verstöße gegen die Schlüsselregeln dieser Datei (leer = in Ordnung). */
  issues: string[];
}

/**
 * Leitet alle Item-Schlüssel einer Themendatei ab und meldet Verstöße: fehlende ID bei einem Block, der ein Item ergibt,
 * oder mehrfach vergebene Schlüssel in derselben Datei.
 */
export function deriveThemaSourceKeys(body: string): ThemaSourceKeys {
  const keys: ThemaSourceKeys["keys"] = [];
  const issues: string[] = [];

  if (extractSection(body, "Theorie")) keys.push({ key: THEORIE_SOURCE_KEY, art: "theorie" });

  const blockSections: { art: "karteikarte" | "quiz" | "fallaufgabe"; text: string | null }[] = [
    { art: "karteikarte", text: extractSection(body, "Karteikarten") },
    { art: "quiz", text: extractSection(body, "Quiz") },
    { art: "fallaufgabe", text: extractSection(body, "Fallaufgaben") ?? extractSection(body, "Übungsaufgaben") },
  ];
  for (const { art, text } of blockSections) {
    if (!text) continue;
    for (const block of splitBlocks(text)) {
      // Quizblöcke, die der Importer überspringt (unbekannte Art), erzeugen kein Item und brauchen keinen Schlüssel;
      // ebenso der Einleitungsabsatz vor dem ersten "####"-Block einer Fallaufgaben-Sektion (wie im Importer).
      if (art === "quiz" && !parseQuizBlock(block)) continue;
      if (art === "fallaufgabe" && !block.startsWith("#### ")) continue;
      const key = blockSourceKey(block);
      if (!key) {
        issues.push(`Block ohne ID in „${art}“: ${(block.split("\n")[0] ?? "").slice(0, 80)}`);
        continue;
      }
      keys.push({ key, art });
    }
  }

  const fachgespraech = extractSection(body, "Fachgesprächsfragen");
  if (fachgespraech) {
    for (const { frage } of parseFachgespraechFragen(fachgespraech)) {
      keys.push({ key: fachgespraechSourceKey(frage), art: "fachgespraech" });
    }
  }

  const seen = new Set<string>();
  for (const { key } of keys) {
    if (seen.has(key)) issues.push(`Schlüssel „${key}“ kommt mehrfach in derselben Datei vor.`);
    seen.add(key);
  }
  return { keys, issues };
}

export interface ContentValidationReport {
  /** Anzahl geprüfter Themendateien. */
  files: number;
  /** Anzahl abgeleiteter Item-Schlüssel. */
  items: number;
  /** Alle Verstöße als lesbare Zeilen, mit Dateipfad. */
  issues: string[];
}

const GLOSSAR_DATEINAME = "glossar.md";

/** Alle Themendateien unterhalb von `dir` (ohne `glossar.md`), sortiert. */
export async function listMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(full);
      return entry.name.endsWith(".md") && entry.name !== GLOSSAR_DATEINAME ? [full] : [];
    }),
  );
  return nested.flat().sort();
}

/**
 * Prüft alle Themendateien unterhalb von `contentDir` (Kurs-/Fachgebiets-Ordner), ohne etwas zu schreiben:
 *  - Pflichtfelder im Frontmatter (`kurs_slug`, `fachgebiet_code`, `thema_code`),
 *  - jeder Themencode je (Kurs, Fachgebiet) nur einmal,
 *  - Schlüsselregeln je Datei (siehe `deriveThemaSourceKeys`).
 * Dateien ohne Frontmatter (z. B. Übersichtsseiten) werden übersprungen.
 */
export async function validateContentDir(contentDir: string): Promise<ContentValidationReport> {
  const issues: string[] = [];
  const themenOrte = new Map<string, string>();
  let files = 0;
  let items = 0;

  for (const file of await listMarkdownFiles(contentDir)) {
    const relative = path.relative(contentDir, file).split(path.sep).join("/");
    let parsed: ReturnType<typeof splitFrontmatter>;
    try {
      parsed = splitFrontmatter((await readFile(file, "utf8")).replace(/\r\n/g, "\n"));
    } catch {
      continue;
    }
    const { frontmatter, body } = parsed;
    if (!frontmatter.kurs_slug) continue;

    files += 1;
    for (const feld of ["fachgebiet_code", "thema_code"] as const) {
      if (!frontmatter[feld]) issues.push(`${relative}: Pflichtfeld „${feld}“ fehlt im Frontmatter.`);
    }
    const themaKey = [frontmatter.kurs_slug, frontmatter.fachgebiet_code, frontmatter.thema_code].join("|");
    const vorher = themenOrte.get(themaKey);
    if (vorher) issues.push(`${relative}: Thema „${frontmatter.thema_code}“ (${frontmatter.fachgebiet_code}) steht schon in ${vorher}.`);
    else themenOrte.set(themaKey, relative);

    const abgeleitet = deriveThemaSourceKeys(body);
    items += abgeleitet.keys.length;
    for (const issue of abgeleitet.issues) issues.push(`${relative}: ${issue}`);
  }
  return { files, items, issues };
}
