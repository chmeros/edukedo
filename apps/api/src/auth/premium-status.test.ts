import { describe, expect, it } from "vitest";
import { isPremiumActive } from "./premium-status";

describe("isPremiumActive", () => {
  it("ist false bei null (kein Abo)", () => {
    expect(isPremiumActive(null)).toBe(false);
  });

  it("ist true, wenn premiumUntil in der Zukunft liegt", () => {
    expect(isPremiumActive(new Date(Date.now() + 60_000))).toBe(true);
  });

  it("ist false, wenn premiumUntil in der Vergangenheit liegt (abgelaufen/gekündigt)", () => {
    expect(isPremiumActive(new Date(Date.now() - 60_000))).toBe(false);
  });
});
