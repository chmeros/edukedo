import { and, eq, or, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { OPEN_CONTENT_REPORT_WARNING_DAYS, PURGED_REPORT_TEXT, retentionCutoff } from "../content-report-retention";
import { isCliEntry } from "./cli-entry";
import * as schema from "./schema";
import { contentReport } from "./schema";

/**
 * `pnpm db:purge-content-reports [--apply]` (Entscheidung 09.10.2026, Entwicklungsplan Iteration 23): leert den Freitext
 * bearbeiteter Inhaltsmeldungen 180 Tage nach der Bearbeitung. Gelöscht werden der Meldungstext (ersetzt durch einen festen
 * Hinweistext, das Feld ist `NOT NULL`), die Rückmeldung der Redaktion und der Verweis auf die meldende Person; Kategorie,
 * Status und Zeitpunkte bleiben als Statistik. Meldungen ohne Bearbeitungszeitpunkt (aus der Zeit vor Migration 0049) zählen ab
 * dem Eingang. Offene Meldungen werden nie angefasst, nur gezählt. Standard ist ein Trockenlauf. Die Ausgabe enthält keine
 * Inhalte der Meldungen, nur Anzahlen. Gedacht für einen regelmäßigen Aufruf durch den Zeitplan des Hosters (monatlich genügt).
 */

type Db = NodePgDatabase<typeof schema>;

export interface PurgeReportsSummary {
  /** Bearbeitete Meldungen, deren Frist abgelaufen ist und die noch Text oder Personenbezug tragen. */
  expired: number;
  /** Davon tatsächlich geleert (nur mit `apply`). */
  purged: number;
  /** Offene Meldungen, die seit über 365 Tagen offen sind (nur Hinweis). */
  overdueOpen: number;
}

function expiredCondition(cutoff: Date) {
  return and(
    eq(contentReport.status, "geschlossen"),
    sql`coalesce(${contentReport.resolvedAt}, ${contentReport.createdAt}) < ${cutoff}`,
    or(
      sql`${contentReport.reason} <> ${PURGED_REPORT_TEXT}`,
      sql`${contentReport.resolutionNote} is not null`,
      sql`${contentReport.reporterUserId} is not null`,
    ),
  );
}

export async function runPurgeContentReports(db: Db, now: Date, apply: boolean): Promise<PurgeReportsSummary> {
  const cutoff = retentionCutoff(now);
  const [expiredRow] = await db.select({ value: sql<number>`count(*)::int` }).from(contentReport).where(expiredCondition(cutoff));
  const overdueCutoff = new Date(now.getTime() - OPEN_CONTENT_REPORT_WARNING_DAYS * 24 * 60 * 60 * 1000);
  const [overdueRow] = await db
    .select({ value: sql<number>`count(*)::int` })
    .from(contentReport)
    .where(and(eq(contentReport.status, "offen"), sql`${contentReport.createdAt} < ${overdueCutoff}`));

  let purged = 0;
  if (apply && (expiredRow?.value ?? 0) > 0) {
    const updated = await db
      .update(contentReport)
      .set({ reason: PURGED_REPORT_TEXT, resolutionNote: null, reporterUserId: null })
      .where(expiredCondition(cutoff))
      .returning({ id: contentReport.id });
    purged = updated.length;
  }
  return { expired: expiredRow?.value ?? 0, purged, overdueOpen: overdueRow?.value ?? 0 };
}

if (isCliEntry("purge-content-reports")) {
  const apply = process.argv.includes("--apply");
  const { db, pool } = await import("./client");
  runPurgeContentReports(db, new Date(), apply)
    .then(async (summary) => {
      console.log(
        `${apply ? "Geleert" : "Trockenlauf (nichts geändert)"}: ${summary.expired} bearbeitete Meldungen mit abgelaufener Aufbewahrungsfrist, ${summary.purged} geleert.`,
      );
      if (summary.overdueOpen > 0) {
        console.log(`Hinweis: ${summary.overdueOpen} offene Meldungen sind seit über ${OPEN_CONTENT_REPORT_WARNING_DAYS} Tagen offen (werden nicht gelöscht).`);
      }
      await pool.end();
    })
    .catch((error: unknown) => {
      console.error("Bereinigung der Meldungen fehlgeschlagen:", error);
      process.exit(1);
    });
}
