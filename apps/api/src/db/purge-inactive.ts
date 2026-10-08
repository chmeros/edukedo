import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { and, eq, inArray, isNull, notInArray, or, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { buildDesiredItems } from "./content-desired";
import { listMarkdownFiles } from "./content-keys";
import { splitFrontmatter } from "./content-parser";
import * as schema from "./schema";
import { contentItem, fachgebiet, kurs, thema } from "./schema";

/**
 * `pnpm db:purge-inactive [--apply]` (Entwurf docs/entwuerfe/sicherer-content-import.md, Abschnitt 4.5, Schritt 7): löscht
 * deaktivierte Items, die nicht mehr im Markdown stehen **und** keinen Nutzerbezug haben (kein Fortschritt, keine Notiz,
 * kein Lernereignis, keine Meldung, kein Duell, keine Prüfungsantwort). Entwurfs-Items (inaktiv, aber im Markdown vorhanden)
 * und alles mit Nutzerbezug bleiben. Standard ist ein Trockenlauf.
 */

type Db = NodePgDatabase<typeof schema>;

export interface PurgeCandidate {
  id: string;
  key: string | null;
  type: string;
  prompt: string;
}

/** Deaktivierte Items eines Themas, die nicht mehr im Markdown stehen und von keiner Nutzerdatenzeile referenziert werden. */
export async function findPurgeCandidates(db: Db, themaId: string, desiredKeys: Set<string>): Promise<PurgeCandidate[]> {
  const keys = [...desiredKeys];
  const rows = await db
    .select({ id: contentItem.id, key: contentItem.sourceKey, type: contentItem.type, prompt: contentItem.prompt })
    .from(contentItem)
    .where(
      and(
        eq(contentItem.themaId, themaId),
        eq(contentItem.isActive, false),
        keys.length > 0 ? or(isNull(contentItem.sourceKey), notInArray(contentItem.sourceKey, keys)) : undefined,
        sql`not exists (select 1 from user_progress where content_item_id = ${contentItem.id})`,
        sql`not exists (select 1 from user_note where content_item_id = ${contentItem.id})`,
        sql`not exists (select 1 from learning_event where content_item_id = ${contentItem.id})`,
        sql`not exists (select 1 from content_report where content_item_id = ${contentItem.id})`,
        sql`not exists (select 1 from duell_question where content_item_id = ${contentItem.id})`,
        sql`not exists (select 1 from exam_answer ea join content_item_version v on v.id = ea.content_item_version_id where v.content_item_id = ${contentItem.id})`,
      ),
    );
  return rows;
}

/** Löscht die Kandidaten (Versionen, Optionen und Tags kaskadieren). Prüft den Nutzerbezug erneut in derselben Transaktion. */
export async function purgeCandidates(db: Db, themaId: string, desiredKeys: Set<string>): Promise<number> {
  return db.transaction(async (tx) => {
    const candidates = await findPurgeCandidates(tx as unknown as Db, themaId, desiredKeys);
    if (candidates.length === 0) return 0;
    await tx.delete(contentItem).where(inArray(contentItem.id, candidates.map((candidate) => candidate.id)));
    return candidates.length;
  });
}

export interface PurgeSummary {
  themen: number;
  candidates: { thema: string; key: string | null; type: string; prompt: string }[];
  deleted: number;
}

export async function runPurge(db: Db, contentDir: string, apply: boolean): Promise<PurgeSummary> {
  const summary: PurgeSummary = { themen: 0, candidates: [], deleted: 0 };
  for (const file of await listMarkdownFiles(contentDir)) {
    let parsed: ReturnType<typeof splitFrontmatter>;
    try {
      parsed = splitFrontmatter((await readFile(file, "utf8")).replace(/\r\n/g, "\n"));
    } catch {
      continue;
    }
    const { frontmatter, body } = parsed;
    if (!frontmatter.kurs_slug) continue;
    const [row] = await db
      .select({ id: thema.id })
      .from(thema)
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(kurs, eq(kurs.id, fachgebiet.kursId))
      .where(and(eq(kurs.slug, frontmatter.kurs_slug), eq(fachgebiet.code, frontmatter.fachgebiet_code!), eq(thema.code, frontmatter.thema_code!)))
      .limit(1);
    if (!row) continue;
    summary.themen += 1;
    const desiredKeys = new Set(buildDesiredItems({ kursSlug: frontmatter.kurs_slug, themaTitle: frontmatter.thema_title!, body }).map((item) => item.key));
    const label = `${frontmatter.kurs_slug}/${frontmatter.fachgebiet_code}/${frontmatter.thema_code}`;
    const candidates = await findPurgeCandidates(db, row.id, desiredKeys);
    for (const candidate of candidates) summary.candidates.push({ thema: label, key: candidate.key, type: candidate.type, prompt: candidate.prompt.slice(0, 70) });
    if (apply && candidates.length > 0) summary.deleted += await purgeCandidates(db, row.id, desiredKeys);
  }
  return summary;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const apply = process.argv.includes("--apply");
  const contentDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");
  const { db, pool } = await import("./client");
  runPurge(db, contentDir, apply)
    .then(async (summary) => {
      console.log(`${apply ? "Gelöscht" : "Trockenlauf (nichts gelöscht)"}: ${summary.themen} Themen geprüft, ${summary.candidates.length} Kandidaten, ${summary.deleted} gelöscht.`);
      for (const candidate of summary.candidates.slice(0, 40)) console.log(`  ${candidate.thema} ${candidate.key ?? "(ohne Schlüssel)"} (${candidate.type}): ${candidate.prompt}`);
      if (summary.candidates.length > 40) console.log(`  … ${summary.candidates.length - 40} weitere`);
      await pool.end();
    })
    .catch((error: unknown) => {
      console.error("Bereinigung fehlgeschlagen:", error);
      process.exit(1);
    });
}
