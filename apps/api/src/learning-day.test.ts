import { describe, expect, it } from "vitest";
import { currentStreakDays, daysSinceLastActive, longestConsecutiveDayStreak } from "./achievements/catalog";
import { endOfLearningDay, learningDay, startOfLearningDay } from "./learning-day";

describe("learningDay (Review LOG-06)", () => {
  it("ordnet Zeitpunkte dem deutschen Kalendertag zu, nicht dem UTC-Tag", () => {
    // Sommerzeit (UTC+2): 22:30 UTC ist schon 00:30 am nächsten Tag.
    expect(learningDay(new Date("2026-07-10T22:30:00Z"))).toBe("2026-07-11");
    expect(learningDay(new Date("2026-07-10T21:59:00Z"))).toBe("2026-07-10");
    // Winterzeit (UTC+1): die Grenze liegt bei 23:00 UTC.
    expect(learningDay(new Date("2026-01-10T22:59:00Z"))).toBe("2026-01-10");
    expect(learningDay(new Date("2026-01-10T23:00:00Z"))).toBe("2026-01-11");
  });

  it("behandelt die Zeitumstellung (Ende der Sommerzeit am 25.10.2026) tagesgenau", () => {
    expect(learningDay(new Date("2026-10-24T22:00:00Z"))).toBe("2026-10-25");
    expect(learningDay(new Date("2026-10-25T22:59:00Z"))).toBe("2026-10-25");
    expect(learningDay(new Date("2026-10-25T23:00:00Z"))).toBe("2026-10-26");
  });
});

describe("Serien und Inaktivität mit deutschen Tagesgrenzen", () => {
  it("zählt Lernen um 00:10 und 23:50 Ortszeit an zwei Folgetagen als zusammenhängende Serie", () => {
    // 00:10 MESZ am 11.7. = 22:10 UTC am 10.7.; 23:50 MESZ am 12.7. = 21:50 UTC am 12.7. (UTC-Tage: 10. und 12., mit Lücke).
    const tage = [new Date("2026-07-10T22:10:00Z"), new Date("2026-07-11T21:50:00Z"), new Date("2026-07-12T21:50:00Z")].map(learningDay);
    expect(tage).toEqual(["2026-07-11", "2026-07-11", "2026-07-12"]);
    expect(longestConsecutiveDayStreak(tage)).toBe(2);
    // Am 12.7. um 23:50 Ortszeit (21:50 UTC) ist die Serie 2 Tage lang (11. und 12.7.).
    expect(currentStreakDays(tage, new Date("2026-07-12T21:55:00Z"))).toBe(2);
  });

  it("rechnet 'heute' in der Lernzeitzone: um 00:30 Ortszeit ist der Vortag noch tolerierter Gestern-Tag", () => {
    const tage = ["2026-07-10", "2026-07-11"];
    // 22:30 UTC am 11.7. = 00:30 MESZ am 12.7.: heute noch nicht gelernt, gestern ja, die Serie lebt.
    expect(currentStreakDays(tage, new Date("2026-07-11T22:30:00Z"))).toBe(2);
    expect(daysSinceLastActive(tage, new Date("2026-07-11T22:30:00Z"))).toBe(1);
    // Zwei Tage später in Ortszeit ist die Serie gerissen.
    expect(currentStreakDays(tage, new Date("2026-07-13T22:30:00Z"))).toBe(0);
  });
});

describe("startOfLearningDay / endOfLearningDay (Review LOG-19)", () => {
  it("liefert Tagesgrenzen in Ortszeit, auch an Zeitumstellungstagen", () => {
    expect(startOfLearningDay("2026-07-01").toISOString()).toBe("2026-06-30T22:00:00.000Z");
    expect(startOfLearningDay("2026-01-15").toISOString()).toBe("2026-01-14T23:00:00.000Z");
    expect(endOfLearningDay("2026-07-01").toISOString()).toBe("2026-07-01T22:00:00.000Z");
    // Umstellung auf Sommerzeit am 29.03.2026: der Tag hat 23 Stunden.
    expect(startOfLearningDay("2026-03-29").toISOString()).toBe("2026-03-28T23:00:00.000Z");
    expect(endOfLearningDay("2026-03-29").toISOString()).toBe("2026-03-29T22:00:00.000Z");
    // Monats- und Jahreswechsel.
    expect(endOfLearningDay("2026-12-31").toISOString()).toBe("2026-12-31T23:00:00.000Z");
  });
});
