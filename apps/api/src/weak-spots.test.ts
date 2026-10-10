import { describe, expect, it } from "vitest";
import { MAX_PERCENT_FOR_WEAK_SPOT, MIN_ATTEMPTS_FOR_WEAK_SPOT, ratedPercent, weakSpotPercent } from "./weak-spots";

describe("Schwachstellen-Regel (F-32, Review UXT-F-15)", () => {
  it("braucht mindestens drei beantwortete Fragen", () => {
    expect(ratedPercent(MIN_ATTEMPTS_FOR_WEAK_SPOT - 1, 0)).toBeNull();
    expect(weakSpotPercent(2, 0)).toBeNull();
    expect(ratedPercent(3, 1)).toBe(33);
    expect(weakSpotPercent(3, 1)).toBe(33);
  });

  it("zählt nur Themen unter 80 Prozent als Schwachstelle", () => {
    expect(weakSpotPercent(5, 4)).toBeNull(); // genau 80 %
    expect(weakSpotPercent(105, 85)).toBeNull(); // 81 %
    expect(weakSpotPercent(10, 7)).toBe(70);
    expect(weakSpotPercent(5, 5)).toBeNull();
    expect(MAX_PERCENT_FOR_WEAK_SPOT).toBe(80);
  });

  it("rundet vor dem Vergleich wie die Anzeige (79,6 % wird als 80 % angezeigt und zählt nicht)", () => {
    expect(weakSpotPercent(500, 398)).toBeNull(); // 79,6 % -> 80 %
    expect(weakSpotPercent(500, 397)).toBe(79); // 79,4 % -> 79 %
  });
});
