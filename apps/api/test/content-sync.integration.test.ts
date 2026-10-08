import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type DesiredItem, type SyncOption } from "../src/db/content-sync-plan";
import { syncThemaItems } from "../src/db/content-sync";
import * as schema from "../src/db/schema";

/**
 * Sicherer Content-Import, Schritt 5a (Entwurf docs/entwuerfe/sicherer-content-import.md): Der Executor setzt Pläne um, ohne
 * Items zu löschen. Geprüft gegen eine echte Postgres-Instanz (Testcontainers, benötigt Docker): Lernfortschritt, Notizen,
 * Prüfungsantworten und Duelle bleiben erhalten, ein Fehler hinterlässt nichts Halbes, Trockenlauf und Schwelle schreiben nichts.
 */
describe("Content-Abgleich (Executor)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let themaId: string;
  let userId: string;
  let kursId: string;

  const opt = (sortOrder: number, text: string, isCorrect = false): SyncOption => ({ sortOrder, text, isCorrect, groupKey: null, side: null });
  const card = (key: string, answer = "Antwort", tags: string[] = []): DesiredItem => ({
    key, type: "karteikarte", prompt: `Frage ${key}`, explanation: answer, difficulty: "leicht", bloom: "erinnern", payload: {}, options: [], tags, isActive: true,
  });
  const mc = (key: string, options: SyncOption[], prompt = `Frage ${key}`): DesiredItem => ({
    key, type: "quiz_mc", prompt, explanation: "Weil.", difficulty: "mittel", bloom: "verstehen", payload: {}, options, tags: [], isActive: true,
  });

  async function itemByKey(key: string) {
    const [row] = await db.select().from(schema.contentItem).where(and(eq(schema.contentItem.themaId, themaId), eq(schema.contentItem.sourceKey, key)));
    return row;
  }
  async function versionsOf(itemId: string) {
    return db.select().from(schema.contentItemVersion).where(eq(schema.contentItemVersion.contentItemId, itemId));
  }
  async function allItems() {
    return db.select().from(schema.contentItem).where(eq(schema.contentItem.themaId, themaId));
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db.insert(schema.kurs).values({ slug: "sync-test", title: "Sync-Test", type: "fachwirt", isPublished: true, metadata: {} }).returning();
    kursId = kursRow!.id;
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId, code: "FG1", title: "Fachgebiet", sortOrder: 10 }).returning();
    const [themaRow] = await db.insert(schema.thema).values({ fachgebietId: fachgebietRow!.id, code: "1.1", title: "1.1 — Thema", sortOrder: 10 }).returning();
    themaId = themaRow!.id;
    const [userRow] = await db.insert(schema.user).values({ email: "sync@example.test", passwordHash: "x", isMinor: false }).returning();
    userId = userRow!.id;
  }, 240_000);

  afterAll(async () => {
    await pool?.end();
    await container?.stop();
  });

  it("legt beim ersten Abgleich Items, Versionen, Optionen und Tags an und setzt Schlüssel und Hash", async () => {
    const desired = [card("K-1", "Antwort", ["a", "b"]), mc("Q-1", [opt(0, "Richtig", true), opt(1, "Falsch"), opt(2, "Auch falsch")])];
    const result = await syncThemaItems(db, themaId, desired);

    expect(result.applied).toBe(true);
    expect(result.stats).toMatchObject({ created: 2, updated: 0, unchanged: 0, deactivated: 0 });
    const k1 = (await itemByKey("K-1"))!;
    expect(k1.contentHash).toMatch(/^v1:/);
    expect(k1.currentVersion).toBe(1);
    expect(await versionsOf(k1.id)).toHaveLength(1);
    const q1 = (await itemByKey("Q-1"))!;
    expect(await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, q1.id))).toHaveLength(3);
    expect(await db.select().from(schema.contentItemTag).where(eq(schema.contentItemTag.contentItemId, k1.id))).toHaveLength(2);
  });

  it("lässt bei unverändertem Inhalt alles stehen und legt keine neuen Versionen an", async () => {
    const before = await allItems();
    const result = await syncThemaItems(db, themaId, [card("K-1", "Antwort", ["a", "b"]), mc("Q-1", [opt(0, "Richtig", true), opt(1, "Falsch"), opt(2, "Auch falsch")])]);
    expect(result.applied).toBe(true);
    expect(result.stats).toMatchObject({ created: 0, updated: 0, unchanged: 2, deactivated: 0 });
    expect((await allItems()).map((item) => item.updatedAt.getTime()).sort()).toEqual(before.map((item) => item.updatedAt.getTime()).sort());
    expect(await versionsOf((await itemByKey("K-1"))!.id)).toHaveLength(1);
  });

  it("aktualisiert geänderte Items an Ort und Stelle: gleiche IDs, neue Version, Fortschritt und Notizen bleiben", async () => {
    const k1 = (await itemByKey("K-1"))!;
    const q1 = (await itemByKey("Q-1"))!;
    const optionIdsBefore = (await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, q1.id))).map((row) => row.id).sort();

    await db.insert(schema.userProgress).values({ userId, contentItemId: k1.id, difficulty: 3, stability: 2, state: "review", dueAt: new Date() });
    await db.insert(schema.userNote).values({ userId, contentItemId: k1.id, noteText: "Meine Notiz" });
    await db.insert(schema.learningEvent).values({ userId, contentItemId: k1.id, isCorrect: true });

    const result = await syncThemaItems(db, themaId, [
      card("K-1", "Neue Antwort", ["b", "c"]),
      mc("Q-1", [opt(0, "Richtig", true), opt(1, "Falsch geändert"), opt(2, "Auch falsch")]),
    ]);
    expect(result.stats).toMatchObject({ created: 0, updated: 2, unchanged: 0 });
    expect(result.stats.solutionChanged).toEqual([]);

    const k1After = (await itemByKey("K-1"))!;
    expect(k1After.id).toBe(k1.id);
    expect(k1After.explanation).toBe("Neue Antwort");
    expect(k1After.currentVersion).toBe(2);
    expect((await versionsOf(k1.id)).map((row) => row.versionNumber).sort()).toEqual([1, 2]);
    expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, k1.id))).toHaveLength(1);
    expect(await db.select().from(schema.userNote).where(eq(schema.userNote.contentItemId, k1.id))).toHaveLength(1);
    expect(await db.select().from(schema.learningEvent).where(eq(schema.learningEvent.contentItemId, k1.id))).toHaveLength(1);

    const tagNames = (
      await db.select({ name: schema.tag.name }).from(schema.contentItemTag).innerJoin(schema.tag, eq(schema.tag.id, schema.contentItemTag.tagId)).where(eq(schema.contentItemTag.contentItemId, k1.id))
    ).map((row) => row.name).sort();
    expect(tagNames).toEqual(["b", "c"]);

    const optionsAfter = await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, q1.id));
    expect(optionsAfter.map((row) => row.id).sort()).toEqual(optionIdsBefore);
    expect(optionsAfter.find((row) => row.sortOrder === 1)!.text).toBe("Falsch geändert");
  });

  it("meldet eine geänderte richtige Antwort, behält den Fortschritt und kennzeichnet das Item", async () => {
    const result = await syncThemaItems(db, themaId, [
      card("K-1", "Neue Antwort", ["b", "c"]),
      mc("Q-1", [opt(0, "Richtig", false), opt(1, "Falsch geändert", true), opt(2, "Auch falsch")]),
    ]);
    expect(result.stats.solutionChanged).toEqual(["Q-1"]);
    expect(result.stats.updated).toBe(1);
  });

  it("deaktiviert entfernte Items statt sie zu löschen und reaktiviert sie, wenn sie wieder auftauchen", async () => {
    const k1 = (await itemByKey("K-1"))!;
    const q1Desired = mc("Q-1", [opt(0, "Richtig", false), opt(1, "Falsch geändert", true), opt(2, "Auch falsch")]);

    const removed = await syncThemaItems(db, themaId, [q1Desired]);
    expect(removed.stats.deactivated).toBe(1);
    const k1Inactive = (await itemByKey("K-1"))!;
    expect(k1Inactive.id).toBe(k1.id);
    expect(k1Inactive.isActive).toBe(false);
    expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, k1.id))).toHaveLength(1);

    const back = await syncThemaItems(db, themaId, [card("K-1", "Neue Antwort", ["b", "c"]), q1Desired]);
    expect(back.stats.activationChanges).toBe(1);
    expect((await itemByKey("K-1"))!.isActive).toBe(true);
    expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, k1.id))).toHaveLength(1);
  });

  it("läuft durch, obwohl Prüfungsantworten und Duelle auf Version und Option verweisen (RESTRICT), und löscht keine verwendete Option", async () => {
    const q1 = (await itemByKey("Q-1"))!;
    const version = (await versionsOf(q1.id)).sort((a, b) => b.versionNumber - a.versionNumber)[0]!;
    const options = await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, q1.id));
    const thirdOption = options.find((row) => row.sortOrder === 2)!;

    const [session] = await db.insert(schema.examSession).values({ userId, kursId, mode: "pruefung" }).returning();
    await db.insert(schema.examAnswer).values({ examSessionId: session!.id, contentItemVersionId: version.id, givenAnswer: { a: 1 } });

    const [opponent] = await db.insert(schema.user).values({ email: "gegner@example.test", passwordHash: "x", isMinor: false }).returning();
    const [duell] = await db
      .insert(schema.duell)
      .values({ kursId, challengerUserId: userId, opponentUserId: opponent!.id, questionCount: 1, expiresAt: new Date(Date.now() + 86_400_000) })
      .returning();
    const [duellQuestion] = await db
      .insert(schema.duellQuestion)
      .values({ duellId: duell!.id, contentItemId: q1.id, contentItemVersionId: version.id, sortOrder: 0 })
      .returning();
    await db.insert(schema.duellAnswer).values({ duellQuestionId: duellQuestion!.id, userId, selectedOptionId: thirdOption.id, isCorrect: false });

    // Inhalt ändern und die dritte Option (von einer Duellantwort verwendet) entfallen lassen.
    const result = await syncThemaItems(db, themaId, [
      card("K-1", "Neue Antwort", ["b", "c"]),
      mc("Q-1", [opt(0, "Richtig", false), opt(1, "Falsch geändert", true)], "Frage Q-1 neu formuliert"),
    ]);
    expect(result.applied).toBe(true);
    expect(result.stats.warnings.some((warning) => warning.includes("Duellantwort"))).toBe(true);
    expect(await db.select().from(schema.answerOption).where(eq(schema.answerOption.id, thirdOption.id))).toHaveLength(1);
    expect((await itemByKey("Q-1"))!.prompt).toBe("Frage Q-1 neu formuliert");
    expect(await db.select().from(schema.examAnswer).where(eq(schema.examAnswer.contentItemVersionId, version.id))).toHaveLength(1);
  });

  it("schreibt bei einem Trockenlauf nichts", async () => {
    const before = JSON.stringify((await allItems()).map((item) => [item.id, item.prompt, item.currentVersion, item.isActive]).sort());
    const result = await syncThemaItems(db, themaId, [card("K-1", "Ganz andere Antwort", ["x"]), card("K-NEU")], { dryRun: true });
    expect(result.applied).toBe(false);
    expect(result.stats).toMatchObject({ created: 1, updated: 1, deactivated: 1 });
    expect(JSON.stringify((await allItems()).map((item) => [item.id, item.prompt, item.currentVersion, item.isActive]).sort())).toBe(before);
  });

  it("macht bei einem Fehler mitten im Plan alles rückgängig (Transaktion je Thema)", async () => {
    const before = JSON.stringify((await allItems()).map((item) => [item.id, item.prompt, item.currentVersion, item.isActive]).sort());
    const broken: DesiredItem = { ...card("K-KAPUTT"), bloom: "ungueltige-stufe" };
    await expect(syncThemaItems(db, themaId, [card("K-1", "Wieder neue Antwort", ["b", "c"]), mc("Q-1", [opt(0, "Richtig", false), opt(1, "Falsch geändert", true)], "Frage Q-1 neu formuliert"), card("K-ZWISCHEN"), broken])).rejects.toThrow();
    expect(JSON.stringify((await allItems()).map((item) => [item.id, item.prompt, item.currentVersion, item.isActive]).sort())).toBe(before);
    expect(await itemByKey("K-ZWISCHEN")).toBeUndefined();
  });

  it("blockiert ein Thema, bei dem zu viele Items entfielen, und führt den Plan nicht aus", async () => {
    const [newThema] = await db.insert(schema.thema).values({ fachgebietId: (await db.select().from(schema.thema).where(eq(schema.thema.id, themaId)))[0]!.fachgebietId, code: "1.2", title: "1.2 — Thema", sortOrder: 20 }).returning();
    const many = Array.from({ length: 20 }, (_, index) => card(`K-${index + 1}`));
    expect((await syncThemaItems(db, newThema!.id, many)).applied).toBe(true);

    const reduced = many.slice(0, 14);
    const blocked = await syncThemaItems(db, newThema!.id, reduced);
    expect(blocked.applied).toBe(false);
    expect(blocked.plan.blocked).toContain("6 von 20");
    const stillActive = (await db.select().from(schema.contentItem).where(eq(schema.contentItem.themaId, newThema!.id))).filter((item) => item.isActive);
    expect(stillActive).toHaveLength(20);

    const allowed = await syncThemaItems(db, newThema!.id, reduced, { allowRemovals: true });
    expect(allowed.applied).toBe(true);
    expect(allowed.stats.deactivated).toBe(6);
  });

  it("serialisiert gleichzeitige Abgleiche desselben Themas über die Advisory-Sperre (kein doppeltes Anlegen)", async () => {
    const [fachgebietRow] = await db.select().from(schema.fachgebiet).where(eq(schema.fachgebiet.kursId, kursId));
    const [concurrentThema] = await db.insert(schema.thema).values({ fachgebietId: fachgebietRow!.id, code: "1.3", title: "1.3 — Parallel", sortOrder: 30 }).returning();
    const desired = [card("K-P1"), card("K-P2"), card("K-P3")];
    const results = await Promise.all([syncThemaItems(db, concurrentThema!.id, desired), syncThemaItems(db, concurrentThema!.id, desired), syncThemaItems(db, concurrentThema!.id, desired)]);
    expect(results.every((result) => result.applied)).toBe(true);
    expect(results.reduce((sum, result) => sum + result.stats.created, 0)).toBe(3);
    expect(await db.select().from(schema.contentItem).where(eq(schema.contentItem.themaId, concurrentThema!.id))).toHaveLength(3);
  });
});
