import { describe, expect, it } from "vitest";
import { LEARNING_REMINDER_THRESHOLD_DAYS, shouldSendLearningReminder } from "./learning-reminder-logic";

describe("shouldSendLearningReminder", () => {
  it("erinnert nicht, wenn noch nie gelernt wurde", () => {
    expect(
      shouldSendLearningReminder({ daysSinceLastActive: null, lastActiveAt: null, lastReminderSentAt: null }),
    ).toBe(false);
  });

  it("erinnert nicht, solange der Schwellenwert noch nicht erreicht ist", () => {
    expect(
      shouldSendLearningReminder({
        daysSinceLastActive: LEARNING_REMINDER_THRESHOLD_DAYS - 1,
        lastActiveAt: new Date("2026-09-20T00:00:00Z"),
        lastReminderSentAt: null,
      }),
    ).toBe(false);
  });

  it("erinnert, sobald der Schwellenwert erreicht ist und noch nie erinnert wurde", () => {
    expect(
      shouldSendLearningReminder({
        daysSinceLastActive: LEARNING_REMINDER_THRESHOLD_DAYS,
        lastActiveAt: new Date("2026-09-20T00:00:00Z"),
        lastReminderSentAt: null,
      }),
    ).toBe(true);
  });

  it("erinnert kein zweites Mal für dieselbe Lernpause", () => {
    const lastActiveAt = new Date("2026-09-20T00:00:00Z");
    expect(
      shouldSendLearningReminder({
        daysSinceLastActive: LEARNING_REMINDER_THRESHOLD_DAYS + 3,
        lastActiveAt,
        lastReminderSentAt: new Date("2026-09-21T00:00:00Z"),
      }),
    ).toBe(false);
  });

  it("erinnert erneut, sobald nach der letzten Erinnerung wieder gelernt und danach erneut pausiert wurde", () => {
    expect(
      shouldSendLearningReminder({
        daysSinceLastActive: LEARNING_REMINDER_THRESHOLD_DAYS,
        lastActiveAt: new Date("2026-09-22T00:00:00Z"),
        lastReminderSentAt: new Date("2026-09-15T00:00:00Z"),
      }),
    ).toBe(true);
  });
});
