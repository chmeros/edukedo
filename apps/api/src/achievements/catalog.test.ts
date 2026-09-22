import { describe, expect, it } from "vitest";
import { currentStreakDays, daysSinceLastActive } from "./catalog";

const TODAY = new Date("2026-09-22T15:00:00.000Z");

describe("currentStreakDays", () => {
  it("ist 0 ohne jede Lernaktivität", () => {
    expect(currentStreakDays([], TODAY)).toBe(0);
  });

  it("zählt heute allein als Serie von 1", () => {
    expect(currentStreakDays(["2026-09-22"], TODAY)).toBe(1);
  });

  it("bleibt aktiv, wenn heute noch nicht gelernt wurde, aber gestern", () => {
    expect(currentStreakDays(["2026-09-21"], TODAY)).toBe(1);
  });

  it("zählt mehrere lückenlose Tage bis einschließlich heute", () => {
    expect(currentStreakDays(["2026-09-19", "2026-09-20", "2026-09-21", "2026-09-22"], TODAY)).toBe(4);
  });

  it("bricht bei einem vollständig ausgelassenen Tag ab", () => {
    // 20.09. fehlt — die Serie zählt nur noch den 22./21.09.
    expect(currentStreakDays(["2026-09-18", "2026-09-19", "2026-09-21", "2026-09-22"], TODAY)).toBe(2);
  });

  it("ist 0, wenn der letzte Lerntag mehr als einen Tag zurückliegt", () => {
    expect(currentStreakDays(["2026-09-19"], TODAY)).toBe(0);
  });

  it("ignoriert doppelte Datums-Strings desselben Tages", () => {
    expect(currentStreakDays(["2026-09-22", "2026-09-22", "2026-09-21"], TODAY)).toBe(2);
  });
});

describe("daysSinceLastActive", () => {
  it("ist null ohne jede Lernaktivität", () => {
    expect(daysSinceLastActive([], TODAY)).toBeNull();
  });

  it("ist 0 bei heutiger Aktivität", () => {
    expect(daysSinceLastActive(["2026-09-22"], TODAY)).toBe(0);
  });

  it("zählt die Tage seit dem jüngsten Lerntag, unabhängig von der Reihenfolge im Array", () => {
    expect(daysSinceLastActive(["2026-09-20", "2026-09-15"], TODAY)).toBe(2);
  });
});
