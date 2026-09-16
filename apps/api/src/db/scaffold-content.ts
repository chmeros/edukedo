import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

/**
 * Redaktions-Effizienzfunktion (F-17, Entwicklungsplan Iteration 4): erzeugt leere, korrekt
 * formatierte Grundgerüste für das Content-Zwischenformat (siehe content/README.md), damit
 * Redakteur:innen die je Fragetyp leicht unterschiedliche Markdown-Syntax (Checkbox-Markierung,
 * ↔-Zeichen, ___Lücken___, Metadaten-Zeile) nicht jedes Mal von Hand nachschlagen/abtippen
 * müssen. Reine Dateioperationen, keine Datenbank nötig.
 *
 * Zwei Unterbefehle:
 *
 *   pnpm content:scaffold -- new-thema <kurs_slug> <fachgebiet_code> <thema_code> <ziel-datei>
 *     Legt eine neue Thema-Datei mit Frontmatter (Titel/Quelle als "TODO"-Platzhalter, direkt
 *     im Editor auszufüllen) und leeren Theorie-/Karteikarten-/Quiz-Abschnitten an.
 *
 *   pnpm content:scaffold -- add-item <datei> <typ>
 *     Hängt einen leeren Platzhalter-Block des gewählten Typs an eine bestehende Thema-Datei
 *     an. Die nächste freie ID (K-.../Q-...) wird automatisch aus den bereits vorhandenen
 *     Blöcken derselben Datei ermittelt.
 */

export const ITEM_TYPES = ["karteikarte", "quiz_mc", "zuordnung", "luecken", "kurzantwort"] as const;
export type ItemType = (typeof ITEM_TYPES)[number];

export function isItemType(value: string): value is ItemType {
  return (ITEM_TYPES as readonly string[]).includes(value);
}

// Bloom-Tag im Platzhalter mitgegeben statt weggelassen: seit HB1/HB2/HB4 verbindlich (siehe
// content/README.md) — "verstehen" als neutraler Mittelwert zum direkten Überschreiben, nicht
// als inhaltlich geprüfte Einstufung.
const META_LINE_PLACEHOLDER = "`schwierigkeit: mittel` · `bloom: verstehen`";

function karteikartePlaceholder(id: string): string {
  return [`#### ${id}`, "**Frage:** TODO", "**Antwort:** TODO", META_LINE_PLACEHOLDER].join("\n");
}

function quizMcPlaceholder(id: string): string {
  return [
    `#### ${id} · Multiple Choice`,
    "**Frage:** TODO",
    "- [ ] TODO",
    "- [x] TODO (richtige Option)",
    "- [ ] TODO",
    "- [ ] TODO",
    "**Erklärung:** TODO",
    META_LINE_PLACEHOLDER,
  ].join("\n");
}

function zuordnungPlaceholder(id: string): string {
  return [
    `#### ${id} · Zuordnung`,
    "**Anweisung:** Ordne die Begriffe den passenden Beschreibungen zu.",
    "- TODO ↔ TODO",
    "- TODO ↔ TODO",
    "**Erklärung:** TODO",
    META_LINE_PLACEHOLDER,
  ].join("\n");
}

function lueckenPlaceholder(id: string): string {
  return [`#### ${id} · Lückentext`, "**Text:** TODO ___Lückenwort___ TODO.", "**Erklärung:** TODO", META_LINE_PLACEHOLDER].join(
    "\n",
  );
}

function kurzantwortPlaceholder(id: string): string {
  return [
    `#### ${id} · Kurzantwort`,
    "**Frage:** TODO",
    "**Akzeptierte Antworten:** TODO; TODO",
    "**Erklärung:** TODO",
    META_LINE_PLACEHOLDER,
  ].join("\n");
}

function placeholderFor(type: ItemType, id: string): string {
  switch (type) {
    case "karteikarte":
      return karteikartePlaceholder(id);
    case "quiz_mc":
      return quizMcPlaceholder(id);
    case "zuordnung":
      return zuordnungPlaceholder(id);
    case "luecken":
      return lueckenPlaceholder(id);
    case "kurzantwort":
      return kurzantwortPlaceholder(id);
  }
}

/** Nächste freie Nummer für ein ID-Präfix ("K-3.1-" o. Ä.) anhand vorhandener `#### <Präfix>NN`-Header. */
export function nextIdNumber(fileContent: string, prefix: string): number {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^#### ${escapedPrefix}(\\d+)`, "gm");
  let max = 0;
  for (const match of fileContent.matchAll(pattern)) {
    max = Math.max(max, Number(match[1]));
  }
  return max + 1;
}

/** Reine Textoperation ohne Dateizugriff — testbar ohne echtes Dateisystem, siehe addItem(). */
export function insertItemBlock(fileContent: string, type: ItemType, themaCode: string): { id: string; updated: string } {
  const isKarteikarte = type === "karteikarte";
  const prefix = isKarteikarte ? `K-${themaCode}-` : `Q-${themaCode}-`;
  const nextNumber = nextIdNumber(fileContent, prefix);
  const id = `${prefix}${String(nextNumber).padStart(2, "0")}`;
  const block = placeholderFor(type, id);

  const heading = isKarteikarte ? "## Karteikarten" : "## Quiz";
  const headingMatch = new RegExp(`(?:^|\\n)${heading}\\n`).exec(fileContent);

  if (!headingMatch) {
    // Abschnitt existiert noch nicht in der Datei — am Dateiende neu anlegen.
    const updated = `${fileContent.trimEnd()}\n\n${heading}\n\n${block}\n`;
    return { id, updated };
  }

  // Block ans Ende DIESES Abschnitts einfügen, nicht ans Dateiende — sonst würde z. B. ein
  // Karteikarten-Block hinter einem bereits vorhandenen "## Quiz" landen. "## " (zwei Rauten)
  // matcht dabei keine "#### "-Item-Header (vier Rauten), da das dritte Zeichen dort kein
  // Leerzeichen ist.
  const sectionStart = headingMatch.index + headingMatch[0].length;
  const nextHeadingMatch = /\n## /.exec(fileContent.slice(sectionStart));
  const sectionEnd = nextHeadingMatch ? sectionStart + nextHeadingMatch.index : fileContent.length;

  const before = fileContent.slice(0, sectionEnd).trimEnd();
  const after = fileContent.slice(sectionEnd).replace(/^\n+/, "");
  const updated = after ? `${before}\n\n${block}\n\n${after}` : `${before}\n\n${block}\n`;

  return { id, updated };
}

export async function addItem(filePath: string, type: string): Promise<string> {
  if (!isItemType(type)) {
    throw new Error(`Unbekannter Fragetyp "${type}". Gültig: ${ITEM_TYPES.join(", ")}`);
  }
  const content = await readFile(filePath, "utf8");
  const themaCodeMatch = /^thema_code:\s*"?([^"\n]+?)"?\s*$/m.exec(content);
  const themaCode = themaCodeMatch?.[1]?.trim() ?? "X";

  const { id, updated } = insertItemBlock(content, type, themaCode);
  await writeFile(filePath, updated, "utf8");
  return id;
}

export interface NewThemaOptions {
  kursSlug: string;
  fachgebietCode: string;
  themaCode: string;
}

export function newThemaContent(options: NewThemaOptions): string {
  const today = new Date().toISOString().slice(0, 10);
  return [
    "---",
    `kurs_slug: ${options.kursSlug}`,
    `fachgebiet_code: ${options.fachgebietCode}`,
    `fachgebiet_title: "TODO"`,
    `thema_code: "${options.themaCode}"`,
    `thema_title: "TODO"`,
    `quelle: "TODO — Quelle ergänzen, siehe content/README.md"`,
    `rechtsstand: "${today} — noch nicht fachlich/rechtlich geprüft"`,
    "---",
    "",
    "## Theorie",
    "",
    "TODO",
    "",
    "## Karteikarten",
    "",
    "## Quiz",
    "",
  ].join("\n");
}

const USAGE = [
  "Verwendung:",
  "  pnpm content:scaffold -- new-thema <kurs_slug> <fachgebiet_code> <thema_code> <ziel-datei>",
  `  pnpm content:scaffold -- add-item <datei> <${ITEM_TYPES.join("|")}>`,
].join("\n");

async function main(): Promise<void> {
  const [subcommand, ...rest] = process.argv.slice(2);

  if (subcommand === "new-thema") {
    const [kursSlug, fachgebietCode, themaCode, targetFile] = rest;
    if (!kursSlug || !fachgebietCode || !themaCode || !targetFile) {
      console.error(USAGE);
      process.exitCode = 1;
      return;
    }
    if (existsSync(targetFile)) {
      console.error(`Datei existiert bereits, wird nicht überschrieben: ${targetFile}`);
      process.exitCode = 1;
      return;
    }
    await writeFile(targetFile, newThemaContent({ kursSlug, fachgebietCode, themaCode }), "utf8");
    console.log(`Neue Thema-Datei angelegt: ${targetFile} — Titel/Quelle bitte im Frontmatter ausfüllen.`);
    return;
  }

  if (subcommand === "add-item") {
    const [filePath, type] = rest;
    if (!filePath || !type) {
      console.error(USAGE);
      process.exitCode = 1;
      return;
    }
    if (!existsSync(filePath)) {
      console.error(`Datei nicht gefunden: ${filePath}`);
      process.exitCode = 1;
      return;
    }
    const id = await addItem(filePath, type);
    console.log(`Neuer Platzhalter-Block ${id} an ${filePath} angehängt.`);
    return;
  }

  console.error(USAGE);
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error: unknown) => {
    console.error("Fehler:", error);
    process.exit(1);
  });
}
