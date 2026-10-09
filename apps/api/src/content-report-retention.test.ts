import { describe, expect, it } from "vitest";
import { CONTENT_REPORT_RETENTION_DAYS, isOverdueOpenReport, OPEN_CONTENT_REPORT_WARNING_DAYS, PURGED_REPORT_TEXT, retentionCutoff } from "./content-report-retention";

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = new Date("2026-10-09T12:00:00Z");

describe("Aufbewahrung der Inhaltsmeldungen", () => {
  it("die Frist beträgt 180 Tage nach der Bearbeitung, der Hinweis für offene Meldungen 365 Tage", () => {
    expect(CONTENT_REPORT_RETENTION_DAYS).toBe(180);
    expect(OPEN_CONTENT_REPORT_WARNING_DAYS).toBe(365);
  });

  it("der Stichtag liegt genau 180 Tage vor dem Aufruf", () => {
    expect(retentionCutoff(NOW).getTime()).toBe(NOW.getTime() - 180 * DAY_MS);
  });

  it("offene Meldungen sind erst nach mehr als 365 Tagen überfällig", () => {
    expect(isOverdueOpenReport(new Date(NOW.getTime() - 365 * DAY_MS), NOW)).toBe(false);
    expect(isOverdueOpenReport(new Date(NOW.getTime() - 366 * DAY_MS), NOW)).toBe(true);
    expect(isOverdueOpenReport(NOW, NOW)).toBe(false);
  });

  it("der Ersatztext enthält keine Inhalte und sagt, was geschehen ist", () => {
    expect(PURGED_REPORT_TEXT).toContain("gelöscht");
  });
});
