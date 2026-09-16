import { describe, expect, it } from "vitest";
import { calculateEinzelterminPacing } from "./pacing";

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

describe("calculateEinzelterminPacing", () => {
  it("empfiehlt das unveränderte Ursprungspensum, wenn der Fortschritt genau im Plan liegt", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      // Plan läuft insgesamt 10 Wochen (planStart bis targetDate); nach der Hälfte der Zeit
      // (jetzt) sollten planmäßig 5 von 10 Themen geschafft sein.
      remainingThemen: 5,
      planStartDate: new Date(now.getTime() - 5 * WEEK),
      targetDate: new Date(now.getTime() + 5 * WEEK),
      now,
    });

    expect(result).toEqual({ isComplete: false, isOverdue: false, recommendedPerWeek: 1, isBehind: false });
  });

  it("erkennt Rückstand und erhöht die Empfehlung, wenn weniger geschafft wurde als geplant", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      // Nur 2 von 10 Themen nach der Hälfte der ursprünglichen Planlaufzeit geschafft.
      remainingThemen: 8,
      planStartDate: new Date(now.getTime() - 10 * WEEK),
      targetDate: new Date(now.getTime() + 2 * WEEK),
      now,
    });

    expect(result.isBehind).toBe(true);
    expect(result.recommendedPerWeek).toBe(4);
  });

  it("meldet keinen Rückstand, wenn der Fortschritt dem Plan voraus ist", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      // Bereits 8 von 10 Themen geschafft, obwohl laut Plan erst die Hälfte fällig wäre.
      remainingThemen: 2,
      planStartDate: new Date(now.getTime() - 10 * WEEK),
      targetDate: new Date(now.getTime() + 10 * WEEK),
      now,
    });

    expect(result.isBehind).toBe(false);
  });

  it("meldet isComplete, sobald keine Themen mehr offen sind, unabhängig vom Zieltermin", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      remainingThemen: 0,
      planStartDate: new Date(now.getTime() - 10 * WEEK),
      targetDate: new Date(now.getTime() + 5 * WEEK),
      now,
    });

    expect(result).toEqual({ isComplete: true, isOverdue: false, recommendedPerWeek: 0, isBehind: false });
  });

  it("meldet isOverdue statt einer irreführenden Wochenempfehlung, wenn der Zieltermin verstrichen ist", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      remainingThemen: 3,
      planStartDate: new Date(now.getTime() - 10 * WEEK),
      targetDate: new Date(now.getTime() - 1 * DAY),
      now,
    });

    expect(result.isOverdue).toBe(true);
    expect(result.recommendedPerWeek).toBeNull();
    expect(result.isBehind).toBe(false);
  });

  it("behandelt den Zieltermin exakt heute als bereits erreicht (Grenzfall)", () => {
    const now = new Date("2026-06-01T00:00:00Z");
    const result = calculateEinzelterminPacing({
      totalThemen: 10,
      remainingThemen: 3,
      planStartDate: new Date(now.getTime() - 10 * WEEK),
      targetDate: now,
      now,
    });

    expect(result.isOverdue).toBe(true);
  });
});
