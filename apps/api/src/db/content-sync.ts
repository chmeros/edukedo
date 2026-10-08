import { and, eq, inArray, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type DesiredItem, type ExistingItem, type ExistingOption, planSync, type PlanOptions, type SyncPlan } from "./content-sync-plan";
import * as schema from "./schema";
import { answerOption, contentItem, contentItemTag, contentItemVersion, duellAnswer, tag } from "./schema";

/**
 * Executor für den Content-Abgleich (Entwurf docs/entwuerfe/sicherer-content-import.md, Abschnitte 4.3 bis 4.6, Schritt 5a).
 * Setzt einen Plan aus `planSync` in der Datenbank um, ohne Items zu löschen: Lernfortschritt, Notizen, Prüfungsantworten
 * und Duelle bleiben erhalten. Je Thema eine Transaktion mit einer globalen Advisory-Sperre, damit nie zwei Importe
 * gleichzeitig schreiben. Der Importer selbst ist in diesem Schritt noch nicht umgestellt.
 */

type Db = NodePgDatabase<typeof schema>;
export type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

/** Schlüssel der globalen Import-Sperre (pg_advisory_xact_lock). */
const IMPORT_LOCK_KEY = "edukedo-content-import";

export interface SyncStats {
  created: number;
  updated: number;
  unchanged: number;
  deactivated: number;
  activationChanges: number;
  /** Aktualisierte Items, bei denen sich die Lösung geändert hat (Fortschritt bleibt erhalten). */
  solutionChanged: string[];
  warnings: string[];
}

export interface SyncResult {
  plan: SyncPlan;
  /** `true`, wenn geschrieben wurde; `false` bei Trockenlauf oder blockiertem Plan. */
  applied: boolean;
  stats: SyncStats;
}

export interface SyncThemaOptions extends PlanOptions {
  /** Nur planen, nichts schreiben. */
  dryRun?: boolean;
}

/** Lädt den Ist-Zustand eines Themas (Items, Optionen, Tags) in der Form für `planSync`. */
export async function loadExistingItems(tx: Tx, themaId: string): Promise<ExistingItem[]> {
  const items = await tx.select().from(contentItem).where(eq(contentItem.themaId, themaId));
  if (items.length === 0) return [];
  const ids = items.map((item) => item.id);

  const options = await tx.select().from(answerOption).where(inArray(answerOption.contentItemId, ids));
  const referenced = options.length
    ? new Set(
        (
          await tx
            .select({ optionId: duellAnswer.selectedOptionId })
            .from(duellAnswer)
            .where(inArray(duellAnswer.selectedOptionId, options.map((option) => option.id)))
        ).map((row) => row.optionId),
      )
    : new Set<string>();
  const tags = await tx
    .select({ contentItemId: contentItemTag.contentItemId, name: tag.name })
    .from(contentItemTag)
    .innerJoin(tag, eq(tag.id, contentItemTag.tagId))
    .where(inArray(contentItemTag.contentItemId, ids));

  return items.map((item) => ({
    id: item.id,
    key: item.sourceKey,
    type: item.type,
    isActive: item.isActive,
    contentHash: item.contentHash,
    payload: item.payload,
    options: options
      .filter((option) => option.contentItemId === item.id)
      .map(
        (option): ExistingOption => ({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
          groupKey: option.groupKey,
          side: option.side as "links" | "rechts" | null,
          sortOrder: option.sortOrder,
          referenced: referenced.has(option.id),
        }),
      ),
    tags: tags.filter((entry) => entry.contentItemId === item.id).map((entry) => entry.name),
  }));
}

async function ensureTagIds(tx: Tx, names: string[]): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const name of new Set(names)) {
    const [existing] = await tx.select().from(tag).where(eq(tag.name, name)).limit(1);
    if (existing) {
      ids.set(name, existing.id);
      continue;
    }
    const [created] = await tx.insert(tag).values({ name }).returning();
    if (!created) throw new Error(`Tag "${name}" konnte nicht angelegt werden.`);
    ids.set(name, created.id);
  }
  return ids;
}

function optionRow(contentItemId: string, option: DesiredItem["options"][number]) {
  return { contentItemId, text: option.text, isCorrect: option.isCorrect, groupKey: option.groupKey, side: option.side, sortOrder: option.sortOrder };
}

/** Setzt einen Plan um. Nur innerhalb einer Transaktion aufrufen. */
export async function executePlan(tx: Tx, themaId: string, plan: SyncPlan): Promise<SyncStats> {
  const stats: SyncStats = {
    created: 0,
    updated: 0,
    unchanged: plan.unchanged,
    deactivated: 0,
    activationChanges: 0,
    solutionChanged: [],
    warnings: [...plan.warnings],
  };

  for (const { desired, contentHash } of plan.create) {
    const [item] = await tx
      .insert(contentItem)
      .values({
        themaId,
        type: desired.type,
        prompt: desired.prompt,
        explanation: desired.explanation,
        difficulty: desired.difficulty,
        bloom: desired.bloom,
        payload: desired.payload ?? {},
        isActive: desired.isActive,
        sourceKey: desired.key,
        contentHash,
      })
      .returning();
    if (!item) throw new Error(`Item "${desired.key}" konnte nicht angelegt werden.`);
    await tx.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: 1,
      prompt: item.prompt,
      explanation: item.explanation,
      payload: item.payload,
    });
    if (desired.options.length > 0) await tx.insert(answerOption).values(desired.options.map((option) => optionRow(item.id, option)));
    if (desired.tags.length > 0) {
      const tagIds = await ensureTagIds(tx, desired.tags);
      await tx.insert(contentItemTag).values([...new Set(desired.tags)].map((name) => ({ contentItemId: item.id, tagId: tagIds.get(name)! })));
    }
    stats.created += 1;
  }

  for (const change of plan.update) {
    const { desired } = change;
    const [item] = await tx
      .update(contentItem)
      .set({
        type: desired.type,
        prompt: desired.prompt,
        explanation: desired.explanation,
        difficulty: desired.difficulty,
        bloom: desired.bloom,
        payload: desired.payload ?? {},
        contentHash: change.contentHash,
        currentVersion: sql`${contentItem.currentVersion} + 1`,
        updatedAt: sql`now()`,
      })
      .where(eq(contentItem.id, change.id))
      .returning();
    if (!item) throw new Error(`Item "${change.key}" nicht gefunden.`);
    // Versionen sind append-only: Prüfungsantworten verweisen darauf (RESTRICT).
    await tx.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: item.currentVersion,
      prompt: item.prompt,
      explanation: item.explanation,
      payload: item.payload,
      changeNote: "Content-Import",
    });

    for (const entry of change.options.update) {
      await tx
        .update(answerOption)
        .set({ text: entry.desired.text, isCorrect: entry.desired.isCorrect, groupKey: entry.desired.groupKey, side: entry.desired.side })
        .where(eq(answerOption.id, entry.id));
    }
    if (change.options.insert.length > 0) {
      await tx.insert(answerOption).values(change.options.insert.map((option) => optionRow(item.id, option)));
    }
    if (change.options.remove.length > 0) {
      await tx.delete(answerOption).where(inArray(answerOption.id, change.options.remove));
    }
    if (change.addTags.length > 0) {
      const tagIds = await ensureTagIds(tx, change.addTags);
      await tx.insert(contentItemTag).values(change.addTags.map((name) => ({ contentItemId: item.id, tagId: tagIds.get(name)! })));
    }
    if (change.removeTags.length > 0) {
      const names = await tx.select({ id: tag.id }).from(tag).where(inArray(tag.name, change.removeTags));
      await tx
        .delete(contentItemTag)
        .where(and(eq(contentItemTag.contentItemId, item.id), inArray(contentItemTag.tagId, names.map((row) => row.id))));
    }
    if (change.solutionChanged) stats.solutionChanged.push(change.key);
    stats.updated += 1;
  }

  for (const entry of plan.setActive) {
    await tx.update(contentItem).set({ isActive: entry.isActive, updatedAt: sql`now()` }).where(eq(contentItem.id, entry.id));
    stats.activationChanges += 1;
  }
  if (plan.deactivate.length > 0) {
    await tx
      .update(contentItem)
      .set({ isActive: false, updatedAt: sql`now()` })
      .where(inArray(contentItem.id, plan.deactivate.map((entry) => entry.id)));
    stats.deactivated = plan.deactivate.length;
  }
  return stats;
}

/**
 * Gleicht ein Thema mit dem Soll-Zustand ab: Sperre, Plan, Umsetzung, alles in einer Transaktion. Bei einem Fehler wird
 * nichts geschrieben. Ein blockierter Plan (Abbruchschwelle) wird nicht ausgeführt; `blocked` steht im Ergebnis.
 */
export async function syncThemaItems(db: Db, themaId: string, desired: DesiredItem[], options: SyncThemaOptions = {}): Promise<SyncResult> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${IMPORT_LOCK_KEY}))`);
    const existing = await loadExistingItems(tx, themaId);
    const plan = planSync(desired, existing, { allowRemovals: options.allowRemovals });
    if (options.dryRun || plan.blocked) {
      return {
        plan,
        applied: false,
        stats: {
          created: plan.create.length,
          updated: plan.update.length,
          unchanged: plan.unchanged,
          deactivated: plan.deactivate.length,
          activationChanges: plan.setActive.length,
          solutionChanged: plan.update.filter((entry) => entry.solutionChanged).map((entry) => entry.key),
          warnings: plan.warnings,
        },
      };
    }
    const stats = await executePlan(tx, themaId, plan);
    return { plan, applied: true, stats };
  });
}
