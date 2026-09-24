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
  }, 120_000);

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
    60_000,
  );

  it(
    "ersetzt bei einem erneuten Import den Content vollständig, ohne verwaiste Versionen anzusammeln",
    async () => {
      const first = await importAllContent();
      const second = await importAllContent();

      expect(second.filesProcessed).toBe(first.filesProcessed);
      expect(second.itemsImported).toBe(first.itemsImported);

      const items = await db.select().from(schema.contentItem);
      const versions = await db.select().from(schema.contentItemVersion);
      expect(items.length).toBe(second.itemsImported);
      // Kaskadierendes Löschen (content_item -> content_item_version, Abschnitt 4.4) muss bei
      // jedem Re-Import greifen — sonst würden sich hier alte Versionen ungenutzt ansammeln.
      expect(versions.length).toBe(items.length);
    },
    60_000,
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
    60_000,
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
    60_000,
  );
});
