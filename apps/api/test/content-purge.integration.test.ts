import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq, inArray } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { findPurgeCandidates, purgeCandidates } from "../src/db/purge-inactive";
import * as schema from "../src/db/schema";

/**
 * Sicherer Content-Import, Schritt 7 (Entwurf docs/entwuerfe/sicherer-content-import.md): `db:purge-inactive` löscht nur
 * deaktivierte, nicht mehr im Markdown stehende Items ohne Nutzerbezug; die Fremdschlüssel der Lerndaten sind seit
 * Migration 0044 RESTRICT. Benötigt Docker.
 */
describe("Bereinigung deaktivierter Items und Schutz der Lerndaten", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let themaId: string;
  let fachgebietId: string;
  let kursId: string;
  let userId: string;
  const ids: Record<string, string> = {};

  async function item(name: string, values: { key: string | null; isActive: boolean }) {
    const [row] = await db
      .insert(schema.contentItem)
      .values({ themaId, type: "karteikarte", prompt: `Frage ${name}`, explanation: "A", sourceKey: values.key, isActive: values.isActive })
      .returning();
    ids[name] = row!.id;
    await db.insert(schema.contentItemVersion).values({ contentItemId: row!.id, versionNumber: 1, prompt: row!.prompt, explanation: "A", payload: {} });
    await db.insert(schema.answerOption).values({ contentItemId: row!.id, text: "Option", sortOrder: 0 });
    return row!;
  }
  async function exists(name: string): Promise<boolean> {
    return (await db.select({ id: schema.contentItem.id }).from(schema.contentItem).where(eq(schema.contentItem.id, ids[name]!))).length === 1;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db.insert(schema.kurs).values({ slug: "purge-test", title: "Purge", type: "fachwirt", isPublished: true, metadata: {} }).returning();
    kursId = kursRow!.id;
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId, code: "FG1", title: "FG", sortOrder: 10 }).returning();
    fachgebietId = fachgebietRow!.id;
    const [themaRow] = await db.insert(schema.thema).values({ fachgebietId, code: "1.1", title: "1.1 — Thema", sortOrder: 10 }).returning();
    themaId = themaRow!.id;
    const [userRow] = await db.insert(schema.user).values({ email: "purge@example.test", passwordHash: "x", isMinor: false }).returning();
    userId = userRow!.id;

    await item("aktiv", { key: "K-1", isActive: true });
    await item("entfernt", { key: "K-2", isActive: false });
    await item("ohneSchluessel", { key: null, isActive: false });
    await item("entwurf", { key: "K-3", isActive: false });
    await item("mitFortschritt", { key: "K-4", isActive: false });
    await item("mitNotiz", { key: "K-5", isActive: false });
    await item("mitPruefung", { key: "K-6", isActive: false });
    await item("mitMeldung", { key: "K-7", isActive: false });
    await item("mitDuell", { key: "K-8", isActive: false });

    await db.insert(schema.userProgress).values({ userId, contentItemId: ids.mitFortschritt!, difficulty: 3, stability: 2, state: "review", dueAt: new Date() });
    await db.insert(schema.userNote).values({ userId, contentItemId: ids.mitNotiz!, noteText: "Notiz" });
    const [version] = await db.select().from(schema.contentItemVersion).where(eq(schema.contentItemVersion.contentItemId, ids.mitPruefung!));
    const [session] = await db.insert(schema.examSession).values({ userId, kursId, mode: "pruefung" }).returning();
    await db.insert(schema.examAnswer).values({ examSessionId: session!.id, contentItemVersionId: version!.id, givenAnswer: {} });
    await db.insert(schema.contentReport).values({ contentItemId: ids.mitMeldung!, reporterUserId: userId, reason: "Test" });
    const [gegner] = await db.insert(schema.user).values({ email: "purge-gegner@example.test", passwordHash: "x", isMinor: false }).returning();
    const [duell] = await db
      .insert(schema.duell)
      .values({ kursId, challengerUserId: userId, opponentUserId: gegner!.id, questionCount: 1, expiresAt: new Date(Date.now() + 86_400_000) })
      .returning();
    const [duellVersion] = await db.select().from(schema.contentItemVersion).where(eq(schema.contentItemVersion.contentItemId, ids.mitDuell!));
    await db.insert(schema.duellQuestion).values({ duellId: duell!.id, contentItemId: ids.mitDuell!, contentItemVersionId: duellVersion!.id, sortOrder: 0 });
  }, 240_000);

  afterAll(async () => {
    await pool?.end();
    await container?.stop();
  });

  it("findet nur deaktivierte, nicht mehr im Markdown stehende Items ohne Nutzerbezug", async () => {
    const candidates = await findPurgeCandidates(db, themaId, new Set(["K-1", "K-3"]));
    expect(candidates.map((candidate) => candidate.id).sort()).toEqual([ids.entfernt!, ids.ohneSchluessel!].sort());
  });

  it("löscht die Kandidaten samt Versionen und Optionen und lässt alles andere stehen", async () => {
    const deleted = await purgeCandidates(db, themaId, new Set(["K-1", "K-3"]));
    expect(deleted).toBe(2);
    expect(await exists("entfernt")).toBe(false);
    expect(await exists("ohneSchluessel")).toBe(false);
    expect(await db.select().from(schema.contentItemVersion).where(inArray(schema.contentItemVersion.contentItemId, [ids.entfernt!, ids.ohneSchluessel!]))).toHaveLength(0);
    expect(await db.select().from(schema.answerOption).where(inArray(schema.answerOption.contentItemId, [ids.entfernt!, ids.ohneSchluessel!]))).toHaveLength(0);
    for (const name of ["aktiv", "entwurf", "mitFortschritt", "mitNotiz", "mitPruefung", "mitMeldung", "mitDuell"]) {
      expect(await exists(name), name).toBe(true);
    }
    expect(await purgeCandidates(db, themaId, new Set(["K-1", "K-3"]))).toBe(0);
  });

  it("lässt sich ein Item mit Fortschritt, Notiz oder Lernereignis nicht mehr löschen (RESTRICT)", async () => {
    await expect(db.delete(schema.contentItem).where(eq(schema.contentItem.id, ids.mitFortschritt!))).rejects.toThrow();
    await expect(db.delete(schema.contentItem).where(eq(schema.contentItem.id, ids.mitNotiz!))).rejects.toThrow();
    await db.insert(schema.learningEvent).values({ userId, contentItemId: ids.aktiv!, isCorrect: true });
    await expect(db.delete(schema.contentItem).where(eq(schema.contentItem.id, ids.aktiv!))).rejects.toThrow();
    expect(await exists("mitFortschritt")).toBe(true);
    expect(await exists("mitNotiz")).toBe(true);
    expect(await exists("aktiv")).toBe(true);
  });

  it("schützt über RESTRICT auch vor dem Löschen eines ganzen Themas mit Lerndaten", async () => {
    await expect(db.delete(schema.thema).where(eq(schema.thema.id, themaId))).rejects.toThrow();
    expect(await exists("mitFortschritt")).toBe(true);
  });

  it("löscht beim Löschen eines Kontos weiterhin dessen Lerndaten (Kaskade vom Nutzer her, F-06)", async () => {
    const [temp] = await db.insert(schema.user).values({ email: "purge-temp@example.test", passwordHash: "x", isMinor: false }).returning();
    await db.insert(schema.userProgress).values({ userId: temp!.id, contentItemId: ids.aktiv!, difficulty: 3, stability: 2, state: "review", dueAt: new Date() });
    await db.delete(schema.user).where(eq(schema.user.id, temp!.id));
    expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.userId, temp!.id))).toHaveLength(0);
    expect(await exists("aktiv")).toBe(true);
  });
});
