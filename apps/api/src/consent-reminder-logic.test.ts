import { describe, expect, it } from "vitest";
import { MAX_REMINDERS, REMINDER_INTERVAL_MS, shouldSendReminder } from "./consent-reminder-logic";

const CONSENT_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 Tage, siehe auth/consent.ts

function daysAfter(base: Date, days: number): Date {
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
}

describe("shouldSendReminder", () => {
  const tokenCreatedAt = new Date("2026-01-01T00:00:00Z");
  const expiresAt = new Date(tokenCreatedAt.getTime() + CONSENT_TOKEN_DURATION_MS);

  it("verschickt noch keine Erinnerung kurz nach Erstellung", () => {
    const now = daysAfter(tokenCreatedAt, 1);
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: 0, expiresAt, now })).toBe(false);
  });

  it("verschickt die erste Erinnerung nach Ablauf des Intervalls (Tag 2)", () => {
    const now = daysAfter(tokenCreatedAt, 2);
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: 0, expiresAt, now })).toBe(true);
  });

  it("verschickt keine zweite Erinnerung, solange das nächste Intervall noch nicht erreicht ist", () => {
    const now = daysAfter(tokenCreatedAt, 3);
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: 1, expiresAt, now })).toBe(false);
  });

  it("verschickt die zweite Erinnerung an Tag 4", () => {
    const now = daysAfter(tokenCreatedAt, 4);
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: 1, expiresAt, now })).toBe(true);
  });

  it("verschickt keine weitere Erinnerung, wenn MAX_REMINDERS erreicht ist", () => {
    const now = daysAfter(tokenCreatedAt, 6);
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: MAX_REMINDERS, expiresAt, now })).toBe(false);
  });

  it("verschickt keine Erinnerung mehr, sobald der Token abgelaufen ist", () => {
    const now = expiresAt;
    expect(shouldSendReminder({ tokenCreatedAt, reminderSentCount: 0, expiresAt, now })).toBe(false);
  });

  it("REMINDER_INTERVAL_MS entspricht 2 Tagen", () => {
    expect(REMINDER_INTERVAL_MS).toBe(1000 * 60 * 60 * 24 * 2);
  });
});
