import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PURGED_REPORT_TEXT } from "../src/content-report-retention";
import { runPurgeContentReports } from "../src/db/purge-content-reports";
import * as schema from "../src/db/schema";

/**
 * Aufbewahrung der Inhaltsmeldungen (Entscheidung 09.10.2026): `db:purge-content-reports` leert den Freitext bearbeiteter Meldungen
 * 180 Tage nach der Bearbeitung, lässt Kategorie, Status und Zeitpunkte stehen und fasst offene Meldungen nie an. Benötigt Docker.
 */
describe("Bereinigung abgelaufener Inhaltsmeldungen", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let contentItemId: string;
  let userId: string;
  const ids: Record<string, string> = {};

  const NOW = new Date("2026-10-09T12:00:00Z");
  const daysAgo = (days: number) => new Date(NOW.getTime() - days * 24 * 60 * 60 * 1000);

  async function report(
    name: string,
    values: { status: "offen" | "geschlossen"; createdDaysAgo: number; resolvedDaysAgo?: number; note?: string },
  ) {
    const [row] = await db
      .insert(schema.contentReport)
      .values({
        contentItemId,
        reporterUserId: userId,
        category: "fachfehler",
        reason: `Text zu ${name} mit Angaben zur Person`,
        status: values.status,
        resolutionNote: values.note ?? null,
        resolvedAt: values.resolvedDaysAgo !== undefined ? daysAgo(values.resolvedDaysAgo) : null,
        createdAt: daysAgo(values.createdDaysAgo),
      })
      .returning();
    ids[name] = row!.id;
  }

  async function load(name: string) {
    const [row] = await db.select().from(schema.contentReport).where(eq(schema.contentReport.id, ids[name]!));
    return row!;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db.insert(schema.kurs).values({ slug: "meldung-test", title: "Meldung", type: "fachwirt", isPublished: true, metadata: {} }).returning();
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId: kursRow!.id, code: "FG1", title: "FG", sortOrder: 10 }).returning();
    const [themaRow] = await db.insert(schema.thema).values({ fachgebietId: fachgebietRow!.id, code: "1.1", title: "1.1 — Thema", sortOrder: 10 }).returning();
    const [itemRow] = await db.insert(schema.contentItem).values({ themaId: themaRow!.id, type: "karteikarte", prompt: "Frage", explanation: "A", sourceKey: "K-1", isActive: true }).returning();
    contentItemId = itemRow!.id;
    const [userRow] = await db.insert(schema.user).values({ email: "meldung@example.test", passwordHash: "x", isMinor: false }).returning();
    userId = userRow!.id;

    await report("abgelaufen", { status: "geschlossen", createdDaysAgo: 400, resolvedDaysAgo: 181, note: "Danke, korrigiert" });
    await report("knappAbgelaufen", { status: "geschlossen", createdDaysAgo: 300, resolvedDaysAgo: 181 });
    await report("nochInFrist", { status: "geschlossen", createdDaysAgo: 300, resolvedDaysAgo: 179, note: "Erledigt" });
    await report("altOhneZeitpunkt", { status: "geschlossen", createdDaysAgo: 500 }); // aus der Zeit vor Migration 0049: resolved_at ist null
    await report("jungOhneZeitpunkt", { status: "geschlossen", createdDaysAgo: 10 });
    await report("offenAlt", { status: "offen", createdDaysAgo: 400 });
    await report("offenNeu", { status: "offen", createdDaysAgo: 20 });
  }, 240_000);

  afterAll(async () => {
    await pool?.end();
    await container?.stop();
  });

  it("zählt im Trockenlauf nur bearbeitete Meldungen mit abgelaufener Frist und ändert nichts", async () => {
    const summary = await runPurgeContentReports(db, NOW, false);
    expect(summary).toEqual({ expired: 3, purged: 0, overdueOpen: 1 });
    expect((await load("abgelaufen")).reason).toContain("Angaben zur Person");
    expect((await load("abgelaufen")).resolutionNote).toBe("Danke, korrigiert");
  });

  it("leert Text, Rückmeldung und Verweis auf die meldende Person, lässt Kategorie, Status und Zeitpunkte stehen", async () => {
    const summary = await runPurgeContentReports(db, NOW, true);
    expect(summary).toMatchObject({ expired: 3, purged: 3 });

    for (const name of ["abgelaufen", "knappAbgelaufen", "altOhneZeitpunkt"]) {
      const row = await load(name);
      expect(row.reason, name).toBe(PURGED_REPORT_TEXT);
      expect(row.resolutionNote, name).toBeNull();
      expect(row.reporterUserId, name).toBeNull();
      expect(row.status, name).toBe("geschlossen");
      expect(row.category, name).toBe("fachfehler");
      expect(row.createdAt, name).toBeInstanceOf(Date);
    }
    expect((await load("abgelaufen")).resolvedAt?.getTime()).toBe(daysAgo(181).getTime());
  });

  it("lässt Meldungen innerhalb der Frist und alle offenen Meldungen unverändert, auch die überfälligen", async () => {
    for (const name of ["nochInFrist", "jungOhneZeitpunkt", "offenAlt", "offenNeu"]) {
      const row = await load(name);
      expect(row.reason, name).toContain("Angaben zur Person");
      expect(row.reporterUserId, name).toBe(userId);
    }
    expect((await load("nochInFrist")).resolutionNote).toBe("Erledigt");
    expect((await load("offenAlt")).status).toBe("offen");
  });

  it("ist wiederholbar: ein zweiter Lauf findet nichts mehr und ändert nichts", async () => {
    expect(await runPurgeContentReports(db, NOW, true)).toEqual({ expired: 0, purged: 0, overdueOpen: 1 });
  });

  it("erfasst eine Meldung, sobald ihre Frist abläuft", async () => {
    const later = new Date(NOW.getTime() + 2 * 24 * 60 * 60 * 1000); // „nochInFrist“ ist dann 181 Tage her
    expect((await runPurgeContentReports(db, later, false)).expired).toBe(1);
    expect((await runPurgeContentReports(db, later, true)).purged).toBe(1);
    expect((await load("nochInFrist")).reason).toBe(PURGED_REPORT_TEXT);
    expect((await load("jungOhneZeitpunkt")).reason).toContain("Angaben zur Person");
  });
});
