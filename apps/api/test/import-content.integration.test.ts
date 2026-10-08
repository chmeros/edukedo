import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-12/F-17: Datenintegrität und Versionierung des Bulk-Imports (Entwicklungsplan Iteration 3)
 * gegen eine echte, per Testcontainers gestartete Postgres-Instanz. Importiert bewusst den
 * echten Content aus content/ (Repo-Root, siehe import-content.ts) statt synthetischer
 * Test-Fixtures — CONTENT_DIR wird relativ zur Datei selbst aufgelöst, ein Override für Tests
 * existiert bewusst nicht (siehe Architekturplanung Abschnitt 13).
 *
 * `importAllContent` nutzt den App-weiten `db`-Singleton aus `db/client.ts`, der beim ersten
 * Import von `../src/env.ts` fest auf `process.env.DATABASE_URL` verdrahtet wird — die
 * Umgebungsvariablen müssen daher VOR dem (dynamischen) Import von `import-content.ts` auf den
 * Testcontainer zeigen. Benötigt einen laufenden Docker-Daemon.
 */
describe("Bulk-Import — Datenintegrität und Versionierung", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let importAllContent: typeof import("../src/db/import-content").importAllContent;
  let appPool: typeof import("../src/db/client").pool;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "integrationstest-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    ({ importAllContent } = await import("../src/db/import-content"));
    // importAllContent() nutzt intern den App-Singleton-Pool aus client.ts, nicht unseren
    // eigenen `pool` oben — ohne ihn hier separat zu schließen, versucht er nach dem Stoppen
    // des Testcontainers noch offene Verbindungen zu bedienen und wirft einen unhandled error.
    ({ pool: appPool } = await import("../src/db/client"));
  }, 240_000);

  afterAll(async () => {
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "importiert den vollständigen Content und legt je Content-Item genau eine Version 1 an",
    async () => {
      const summary = await importAllContent();
      expect(summary.filesProcessed).toBeGreaterThan(0);
      expect(summary.itemsImported).toBeGreaterThan(0);

      const items = await db.select().from(schema.contentItem);
      expect(items.length).toBe(summary.itemsImported);

      const versions = await db.select().from(schema.contentItemVersion);
      expect(versions.length).toBe(items.length);
      expect(versions.every((version) => version.versionNumber === 1)).toBe(true);
    },
    240_000,
  );

  it(
    "gleicht bei einem erneuten Import ab statt zu ersetzen: nichts ändert sich, keine neuen Versionen, Item-IDs und Fortschritt bleiben",
    async () => {
      const first = await importAllContent();
      const itemsBefore = await db.select().from(schema.contentItem);
      const [karte] = itemsBefore.filter((item) => item.type === "karteikarte");
      const [nutzer] = await db.insert(schema.user).values({ email: "import-test@example.test", passwordHash: "x", isMinor: false }).returning();
      await db.insert(schema.userProgress).values({ userId: nutzer!.id, contentItemId: karte!.id, difficulty: 3, stability: 2, state: "review", dueAt: new Date() });
      await db.insert(schema.userNote).values({ userId: nutzer!.id, contentItemId: karte!.id, noteText: "bleibt erhalten" });

      const second = await importAllContent();

      expect(second.filesProcessed).toBe(first.filesProcessed);
      expect(second.itemsImported).toBe(first.itemsImported);
      expect(second).toMatchObject({ created: 0, updated: 0, deactivated: 0, unchanged: first.itemsImported, blocked: [] });

      const items = await db.select().from(schema.contentItem);
      const versions = await db.select().from(schema.contentItemVersion);
      expect(items.length).toBe(second.itemsImported);
      expect(items.map((item) => item.id).sort()).toEqual(itemsBefore.map((item) => item.id).sort());
      expect(versions.length).toBe(items.length);
      expect(items.every((item) => item.sourceKey !== null && item.contentHash !== null)).toBe(true);

      // Früher löschte der Re-Import die Items und mit ihnen Fortschritt und Notizen (ON DELETE CASCADE).
      expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, karte!.id))).toHaveLength(1);
      expect(await db.select().from(schema.userNote).where(eq(schema.userNote.contentItemId, karte!.id))).toHaveLength(1);
    },
    240_000,
  );

  it(
    "liefert im Trockenlauf eine Zusammenfassung und schreibt nichts",
    async () => {
      const before = (await db.select().from(schema.contentItem)).map((item) => `${item.id}:${item.currentVersion}`).sort();
      const summary = await importAllContent({ dryRun: true });
      expect(summary.dryRun).toBe(true);
      expect(summary).toMatchObject({ created: 0, updated: 0, deactivated: 0 });
      expect((await db.select().from(schema.contentItem)).map((item) => `${item.id}:${item.currentVersion}`).sort()).toEqual(before);
    },
    240_000,
  );

  it(
    "überschreibt is_published niemals bei einem erneuten Import",
    async () => {
      await importAllContent();
      const [kursRow] = await db
        .select()
        .from(schema.kurs)
        .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"))
        .limit(1);
      expect(kursRow).toBeTruthy();

      // Manuellen Live-Gang simulieren (z. B. über den Admin-Bereich) und erneut importieren.
      await db.update(schema.kurs).set({ isPublished: true }).where(eq(schema.kurs.id, kursRow!.id));
      await importAllContent();

      const [afterReimport] = await db.select().from(schema.kurs).where(eq(schema.kurs.id, kursRow!.id)).limit(1);
      expect(afterReimport!.isPublished).toBe(true);
    },
    240_000,
  );

  it(
    "leitet fachgebiet.sort_order aus der alphabetischen Verzeichnisreihenfolge ab (Regressionstest)",
    async () => {
      await importAllContent();
      const [mathKurs] = await db.select().from(schema.kurs).where(eq(schema.kurs.slug, "mathematik-9")).limit(1);
      expect(mathKurs).toBeTruthy();

      const fachgebiete = await db
        .select()
        .from(schema.fachgebiet)
        .where(eq(schema.fachgebiet.kursId, mathKurs!.id))
        .orderBy(schema.fachgebiet.sortOrder);

      // Vor dem Fix (siehe Architekturplanung Abschnitt 13) blieb sort_order für alle
      // Fachgebiete beim Spalten-Default 0 — die Reihenfolge war dann zufällig statt
      // alphabetisch (ALG vor GEO vor STO).
      expect(fachgebiete.map((f) => f.code)).toEqual(["ALG", "GEO", "STO"]);
    },
    240_000,
  );

  it(
    "importiert die Glossare (F-165): je Fachinformatiker-Kurs gleiche, vollständig verlinkte Einträge, glossar.md wird kein Thema",
    async () => {
      const kurse = await db.select().from(schema.kurs);
      const fi = kurse.filter((kurs) => kurs.slug.startsWith("fachinformatiker-"));
      expect(fi).toHaveLength(4);

      const anzahl: number[] = [];
      for (const kurs of fi) {
        const eintraege = await db.select().from(schema.glossarEintrag).where(eq(schema.glossarEintrag.kursId, kurs.id));
        anzahl.push(eintraege.length);
        expect(eintraege.length).toBeGreaterThan(100);
        // jeder Eintrag ist mit einem Thema des Kurses verknüpft und hat eine Definition
        expect(eintraege.every((eintrag) => eintrag.themaId !== null && eintrag.definition.length > 20)).toBe(true);
        expect(eintraege.every((eintrag) => Array.isArray(eintrag.aliases))).toBe(true);
      }
      // die gemeinsamen Fachgebiete FU1–FU7 sind in allen vier Kursen identisch kopiert
      expect(new Set(anzahl).size).toBe(1);

      // Kurse ohne glossar.md haben kein Glossar, und die Datei erzeugt kein Thema
      const fachwirt = kurse.find((kurs) => kurs.slug === "fachwirt-buero-projektorganisation")!;
      expect(await db.select().from(schema.glossarEintrag).where(eq(schema.glossarEintrag.kursId, fachwirt.id))).toHaveLength(0);
      const themen = await db.select().from(schema.thema);
      expect(themen.some((thema) => /glossar/i.test(thema.title))).toBe(false);
    },
    240_000,
  );
});
