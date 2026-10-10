import { describe, expect, it } from "vitest";
import { COHORT_PERCENT_STEP, hideIfFewContributors, MIN_CONTRIBUTORS_FOR_STATS, roundToStep } from "./stats-privacy";

describe("hideIfFewContributors", () => {
  it("blendet eine Kennzahl unterhalb der Mindestzahl beitragender Personen aus", () => {
    expect(hideIfFewContributors(42, 0)).toBeNull();
    expect(hideIfFewContributors(42, 1)).toBeNull();
    expect(hideIfFewContributors(42, MIN_CONTRIBUTORS_FOR_STATS - 1)).toBeNull();
  });

  it("gibt die Kennzahl ab der Mindestzahl unverändert zurück, auch 0 %", () => {
    expect(hideIfFewContributors(42, MIN_CONTRIBUTORS_FOR_STATS)).toBe(42);
    expect(hideIfFewContributors(0, 20)).toBe(0);
  });
});

describe("roundToStep", () => {
  it("rundet auf die nächste Stufe, auf halbe Stufen nach oben", () => {
    expect(roundToStep(42, COHORT_PERCENT_STEP)).toBe(40);
    expect(roundToStep(45, COHORT_PERCENT_STEP)).toBe(50);
    expect(roundToStep(4, COHORT_PERCENT_STEP)).toBe(0);
    expect(roundToStep(96, COHORT_PERCENT_STEP, 100)).toBe(100);
  });

  it("begrenzt auf den Höchstwert und lässt fehlende Werte fehlen", () => {
    expect(roundToStep(100, COHORT_PERCENT_STEP, 100)).toBe(100);
    expect(roundToStep(103, COHORT_PERCENT_STEP, 100)).toBe(100);
    expect(roundToStep(null, COHORT_PERCENT_STEP)).toBeNull();
  });

  it("macht benachbarte Werte ununterscheidbar (kein Rückschluss auf kleine Änderungen)", () => {
    expect(roundToStep(41, COHORT_PERCENT_STEP)).toBe(roundToStep(44, COHORT_PERCENT_STEP));
  });
});
