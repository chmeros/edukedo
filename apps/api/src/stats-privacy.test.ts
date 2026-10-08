import { describe, expect, it } from "vitest";
import { hideIfFewContributors, MIN_CONTRIBUTORS_FOR_STATS } from "./stats-privacy";

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
