import { describe, expect, it } from "vitest";
import { DUELL_REMINDER_WINDOW_MS, shouldSendDuellReminder } from "./duell-reminder-logic";

describe("shouldSendDuellReminder", () => {
  const now = new Date("2026-09-23T12:00:00Z");

  it("erinnert nicht, solange bis zum Ablauf noch mehr als das Erinnerungsfenster verbleibt", () => {
    expect(
      shouldSendDuellReminder({
        expiresAt: new Date(now.getTime() + DUELL_REMINDER_WINDOW_MS + 1000),
        now,
        reminderSentAt: null,
      }),
    ).toBe(false);
  });

  it("erinnert, sobald das Erinnerungsfenster vor dem Ablauf erreicht ist", () => {
    expect(
      shouldSendDuellReminder({
        expiresAt: new Date(now.getTime() + DUELL_REMINDER_WINDOW_MS - 1000),
        now,
        reminderSentAt: null,
      }),
    ).toBe(true);
  });

  it("erinnert nicht mehr, wenn das Duell bereits abgelaufen ist", () => {
    expect(
      shouldSendDuellReminder({
        expiresAt: new Date(now.getTime() - 1000),
        now,
        reminderSentAt: null,
      }),
    ).toBe(false);
  });

  it("erinnert kein zweites Mal, wenn bereits eine Erinnerung verschickt wurde", () => {
    expect(
      shouldSendDuellReminder({
        expiresAt: new Date(now.getTime() + 1000),
        now,
        reminderSentAt: new Date(now.getTime() - 1000),
      }),
    ).toBe(false);
  });
});
