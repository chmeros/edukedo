import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { isCliEntry } from "./cli-entry";
import { contentDir } from "./content-dir";
import { and, asc, eq, inArray } from "drizzle-orm";
import { buildDesiredItems } from "./content-desired";
import { validateContentDir } from "./content-keys";
import { splitFrontmatter } from "./content-parser";
import { computeContentHash, type DesiredItem, type SyncOption } from "./content-sync-plan";

/**
 * Backfill der stabilen Schlüssel für bereits importierten Altbestand (Entwurf docs/entwuerfe/sicherer-content-import.md,
 * Abschnitt 4.7, Schritt 4): ordnet bestehende `content_item`-Zeilen den Items aus dem Markdown zu und schreibt
 * `source_key` und `content_hash`. Standardmäßig ein **Trockenlauf**, der nur berichtet; `--apply` schreibt, je Thema in
 * einer Transaktion. Der Lauf ist wiederholbar (bereits zugeordnete Items werden über ihren Schlüssel erkannt).
 *
 * Zuordnung je Thema und Typ: erst über den Schlüssel (falls schon gesetzt), dann über den exakten Prompt (bei doppelten
 * Prompts in Reihenfolge), zuletzt über die Reihenfolge, aber nur wenn die Zahl der übrigen Items beider Seiten gleich ist.
 * Nicht Zuordenbares wird gemeldet und nie geraten.
 */

export type MatchHow = "schluessel" | "prompt" | "reihenfolge";

export interface BackfillExisting {
  id: string;
  sourceKey: string | null;
  /** Der Zustand in der Datenbank in der Form eines Soll-Items (Schlüssel egal), für Typ, Prompt und Hash. */
  state: DesiredItem;
}

export interface MatchResult {
  pairs: { desired: DesiredItem; existing: BackfillExisting; how: MatchHow }[];
  unmatchedDesired: DesiredItem[];
  unmatchedExisting: BackfillExisting[];
}

/** Ordnet bestehende Items den Soll-Items eines Themas zu. `existing` muss in Anlagereihenfolge übergeben werden. */
export function matchItems(desired: DesiredItem[], existing: BackfillExisting[]): MatchResult {
  const pairs: MatchResult["pairs"] = [];
  const takenExisting = new Set<string>();
  const matchedDesired = new Set<DesiredItem>();

  // 1. Schon zugeordnet (Wiederholung des Backfills).
  const existingByKey = new Map(existing.filter((item) => item.sourceKey !== null).map((item) => [item.sourceKey!, item] as const));
  for (const wanted of desired) {
    const current = existingByKey.get(wanted.key);
    if (current && current.state.type === wanted.type) {
      pairs.push({ desired: wanted, existing: current, how: "schluessel" });
      takenExisting.add(current.id);
      matchedDesired.add(wanted);
    }
  }

  // 2. Exakter Prompt je Typ, bei doppelten Prompts in Reihenfolge.
  const queues = new Map<string, BackfillExisting[]>();
  for (const item of existing) {
    if (takenExisting.has(item.id) || item.sourceKey !== null) continue;
    const queueKey = `${item.state.type}\u0000${item.state.prompt}`;
    const queue = queues.get(queueKey) ?? [];
    queue.push(item);
    queues.set(queueKey, queue);
  }
  for (const wanted of desired) {
    if (matchedDesired.has(wanted)) continue;
    const current = queues.get(`${wanted.type}\u0000${wanted.prompt}`)?.shift();
    if (!current) continue;
    pairs.push({ desired: wanted, existing: current, how: "prompt" });
    takenExisting.add(current.id);
    matchedDesired.add(wanted);
  }

  // 3. Reihenfolge je Typ, nur bei gleicher Anzahl übriger Items; die Theorie (je Thema genau eines) auch bei geändertem Titel.
  const restDesired = desired.filter((item) => !matchedDesired.has(item));
  const restExisting = existing.filter((item) => !takenExisting.has(item.id) && item.sourceKey === null);
  const types = new Set([...restDesired.map((item) => item.type), ...restExisting.map((item) => item.state.type)]);
  for (const type of types) {
    const wantedOfType = restDesired.filter((item) => item.type === type);
    const currentOfType = restExisting.filter((item) => item.state.type === type);
    if (wantedOfType.length === 0 || wantedOfType.length !== currentOfType.length) continue;
    wantedOfType.forEach((wanted, index) => {
      const current = currentOfType[index]!;
      pairs.push({ desired: wanted, existing: current, how: "reihenfolge" });
      takenExisting.add(current.id);
      matchedDesired.add(wanted);
    });
  }

  return {
    pairs,
    unmatchedDesired: desired.filter((item) => !matchedDesired.has(item)),
    unmatchedExisting: existing.filter((item) => !takenExisting.has(item.id)),
  };
}

// ---------------------------------------------------------------------------
// Datenbankteil
// ---------------------------------------------------------------------------

export interface BackfillSummary {
  themen: number;
  desired: number;
  existing: number;
  bySchluessel: number;
  byPrompt: number;
  byReihenfolge: number;
  /** Zugeordnet, aber der gespeicherte Inhalt weicht vom Markdown ab (Textänderung seit dem Import oder Builder-Abweichung). */
  contentDiffers: { key: string; thema: string; type: string }[];
  unmatchedDesired: { key: string; thema: string; type: string }[];
  unmatchedExisting: { id: string; thema: string; type: string; prompt: string }[];
  themenOhneDatei: string[];
  written: number;
}

const CONTENT_DIR = contentDir();

async function listThemaFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listThemaFiles(full);
      return entry.name.endsWith(".md") && entry.name !== "glossar.md" ? [full] : [];
    }),
  );
  return nested.flat().sort();
}

export async function runBackfill(options: { apply: boolean; kursFilter?: string }): Promise<BackfillSummary> {
  // Import erst hier, damit das reine Matching ohne Datenbankverbindung testbar bleibt.
  const { db } = await import("./client");
  const { answerOption, contentItem, contentItemTag, fachgebiet, kurs, tag, thema } = await import("./schema");

  const preflight = await validateContentDir(CONTENT_DIR);
  if (preflight.issues.length > 0) {
    throw new Error(`Content-Validierung fehlgeschlagen (${preflight.issues.length} Verstöße), erster: ${preflight.issues[0]}`);
  }

  const summary: BackfillSummary = {
    themen: 0,
    desired: 0,
    existing: 0,
    bySchluessel: 0,
    byPrompt: 0,
    byReihenfolge: 0,
    contentDiffers: [],
    unmatchedDesired: [],
    unmatchedExisting: [],
    themenOhneDatei: [],
    written: 0,
  };
  const seenThemaIds = new Set<string>();

  for (const file of await listThemaFiles(CONTENT_DIR)) {
    let parsed: ReturnType<typeof splitFrontmatter>;
    try {
      parsed = splitFrontmatter((await readFile(file, "utf8")).replace(/\r\n/g, "\n"));
    } catch {
      continue; // Übersichtsseiten ohne Frontmatter
    }
    const { frontmatter, body } = parsed;
    if (!frontmatter.kurs_slug) continue;
    if (options.kursFilter && frontmatter.kurs_slug !== options.kursFilter) continue;

    const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, frontmatter.kurs_slug)).limit(1);
    if (!kursRow) continue;
    const [fachgebietRow] = await db
      .select()
      .from(fachgebiet)
      .where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code!)))
      .limit(1);
    if (!fachgebietRow) continue;
    const [themaRow] = await db
      .select()
      .from(thema)
      .where(and(eq(thema.fachgebietId, fachgebietRow.id), eq(thema.code, frontmatter.thema_code!)))
      .limit(1);
    if (!themaRow) continue;
    seenThemaIds.add(themaRow.id);
    const themaLabel = `${frontmatter.kurs_slug}/${frontmatter.fachgebiet_code}/${frontmatter.thema_code}`;

    const desired = buildDesiredItems({ kursSlug: frontmatter.kurs_slug, themaTitle: frontmatter.thema_title!, body });
    const itemRows = await db.select().from(contentItem).where(eq(contentItem.themaId, themaRow.id)).orderBy(asc(contentItem.createdAt), asc(contentItem.id));
    const ids = itemRows.map((row) => row.id);
    const optionRows = ids.length ? await db.select().from(answerOption).where(inArray(answerOption.contentItemId, ids)) : [];
    const tagRows = ids.length
      ? await db
          .select({ contentItemId: contentItemTag.contentItemId, name: tag.name })
          .from(contentItemTag)
          .innerJoin(tag, eq(tag.id, contentItemTag.tagId))
          .where(inArray(contentItemTag.contentItemId, ids))
      : [];

    const existing: BackfillExisting[] = itemRows.map((row) => {
      const itemOptions: SyncOption[] = optionRows
        .filter((option) => option.contentItemId === row.id)
        .map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
          groupKey: option.groupKey,
          side: option.side as "links" | "rechts" | null,
          sortOrder: option.sortOrder,
        }));
      return {
        id: row.id,
        sourceKey: row.sourceKey,
        state: {
          key: row.sourceKey ?? "",
          type: row.type,
          prompt: row.prompt,
          explanation: row.explanation,
          difficulty: row.difficulty,
          bloom: row.bloom,
          payload: row.payload,
          options: itemOptions,
          tags: tagRows.filter((entry) => entry.contentItemId === row.id).map((entry) => entry.name),
          isActive: row.isActive,
        },
      };
    });

    const result = matchItems(desired, existing);
    summary.themen += 1;
    summary.desired += desired.length;
    summary.existing += existing.length;
    for (const pair of result.pairs) {
      if (pair.how === "schluessel") summary.bySchluessel += 1;
      else if (pair.how === "prompt") summary.byPrompt += 1;
      else summary.byReihenfolge += 1;
      if (computeContentHash(pair.existing.state) !== computeContentHash(pair.desired)) {
        summary.contentDiffers.push({ key: pair.desired.key, thema: themaLabel, type: pair.desired.type });
      }
    }
    for (const item of result.unmatchedDesired) summary.unmatchedDesired.push({ key: item.key, thema: themaLabel, type: item.type });
    for (const item of result.unmatchedExisting) {
      summary.unmatchedExisting.push({ id: item.id, thema: themaLabel, type: item.state.type, prompt: item.state.prompt.slice(0, 70) });
    }

    if (options.apply && result.pairs.length > 0) {
      await db.transaction(async (tx) => {
        for (const pair of result.pairs) {
          // Der gespeicherte Hash beschreibt den Zustand in der Datenbank; weicht das Markdown ab, erkennt der erste Sync die Änderung.
          await tx
            .update(contentItem)
            .set({ sourceKey: pair.desired.key, contentHash: computeContentHash(pair.existing.state) })
            .where(eq(contentItem.id, pair.existing.id));
          summary.written += 1;
        }
      });
    }
  }

  // Themen in der Datenbank, zu denen es keine Datei gibt (nur zur Information).
  const alleThemen = await db.select({ id: thema.id, title: thema.title }).from(thema);
  for (const row of alleThemen) if (!seenThemaIds.has(row.id)) summary.themenOhneDatei.push(row.title);
  return summary;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function printSummary(summary: BackfillSummary, apply: boolean, verbose: boolean): void {
  const zugeordnet = summary.bySchluessel + summary.byPrompt + summary.byReihenfolge;
  console.log(`${apply ? "Backfill geschrieben" : "Trockenlauf (nichts geschrieben)"}:`);
  console.log(`  Themen mit Datei und Datenbankzeile: ${summary.themen}`);
  console.log(`  Items laut Markdown: ${summary.desired}, in der Datenbank: ${summary.existing}`);
  console.log(`  zugeordnet: ${zugeordnet} (Schlüssel ${summary.bySchluessel}, Prompt ${summary.byPrompt}, Reihenfolge ${summary.byReihenfolge})`);
  console.log(`  Inhalt weicht ab: ${summary.contentDiffers.length}`);
  console.log(`  nur im Markdown (würden angelegt): ${summary.unmatchedDesired.length}`);
  console.log(`  nur in der Datenbank (würden deaktiviert): ${summary.unmatchedExisting.length}`);
  console.log(`  Themen in der Datenbank ohne Datei: ${summary.themenOhneDatei.length}`);
  if (apply) console.log(`  geschriebene Zeilen: ${summary.written}`);
  const limit = verbose ? Infinity : 15;
  const show = <T>(title: string, rows: T[], format: (row: T) => string) => {
    if (rows.length === 0) return;
    console.log(`\n${title} (${rows.length}):`);
    for (const row of rows.slice(0, limit)) console.log(`  ${format(row)}`);
    if (rows.length > limit) console.log(`  … ${rows.length - limit} weitere (mit --verbose alle)`);
  };
  show("Inhalt weicht ab", summary.contentDiffers, (row) => `${row.thema} ${row.key} (${row.type})`);
  show("Nur im Markdown", summary.unmatchedDesired, (row) => `${row.thema} ${row.key} (${row.type})`);
  show("Nur in der Datenbank", summary.unmatchedExisting, (row) => `${row.thema} ${row.type}: ${row.prompt}`);
  show("Themen ohne Datei", summary.themenOhneDatei, (row) => row);
}

if (isCliEntry("backfill-source-keys")) {
  const args = process.argv.slice(2);
  const kursFilter = args.find((arg) => arg.startsWith("--kurs="))?.slice("--kurs=".length);
  const apply = args.includes("--apply");
  runBackfill({ apply, kursFilter })
    .then(async (summary) => {
      printSummary(summary, apply, args.includes("--verbose"));
      const { pool } = await import("./client");
      await pool.end();
    })
    .catch((error: unknown) => {
      console.error("Backfill fehlgeschlagen:", error);
      process.exit(1);
    });
}
