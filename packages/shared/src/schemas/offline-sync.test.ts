import { describe, expect, it } from "vitest";
import { normalizeOccurredAt, OFFLINE_EVENT_FUTURE_TOLERANCE_MS, OFFLINE_EVENT_MAX_AGE_DAYS } from "./offline-sync";

describe("normalizeOccurredAt (Review-Befund LOG-03)", () => {
  const now = new Date("2026-10-08T12:00:00.000Z");
  const day = 24 * 60 * 60 * 1000;

  it("lässt plausible Zeitstempel unverändert (gestern, vor einer Stunde, jetzt)", () => {
    for (const offset of [-day, -60 * 60 * 1000, 0]) {
      const stamp = new Date(now.getTime() + offset);
      expect(normalizeOccurredAt(stamp, now)).toBe(stamp);
    }
  });

  it("toleriert eine leicht vorgehende Geräteuhr, ersetzt aber einen Zeitstempel weiter in der Zukunft durch die Serverzeit", () => {
    const slightlyAhead = new Date(now.getTime() + OFFLINE_EVENT_FUTURE_TOLERANCE_MS);
    expect(normalizeOccurredAt(slightlyAhead, now)).toBe(slightlyAhead);
    expect(normalizeOccurredAt(new Date(now.getTime() + OFFLINE_EVENT_FUTURE_TOLERANCE_MS + 1), now)).toBe(now);
    expect(normalizeOccurredAt(new Date("2099-01-01T00:00:00.000Z"), now)).toBe(now);
  });

  it("ersetzt Zeitstempel außerhalb des Rückwärts-Fensters durch die Serverzeit", () => {
    const edge = new Date(now.getTime() - OFFLINE_EVENT_MAX_AGE_DAYS * day);
    expect(normalizeOccurredAt(edge, now)).toBe(edge);
    expect(normalizeOccurredAt(new Date(edge.getTime() - 1), now)).toBe(now);
    expect(normalizeOccurredAt(new Date(0), now)).toBe(now);
  });

  it("behandelt ein ungültiges Datum wie einen unplausiblen Zeitstempel", () => {
    expect(normalizeOccurredAt(new Date("kein datum"), now)).toBe(now);
  });
});
