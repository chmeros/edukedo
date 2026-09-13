import { describe, expect, it } from "vitest";
import { requiresParentalConsent } from "./age";

describe("requiresParentalConsent", () => {
  const now = new Date("2026-09-13T00:00:00Z");

  it("ist true für eine Person, die erst in einer Woche 16 wird", () => {
    expect(requiresParentalConsent(new Date("2010-09-20T00:00:00Z"), now)).toBe(true);
  });

  it("ist false für eine Person, die vor einer Woche 16 wurde", () => {
    expect(requiresParentalConsent(new Date("2010-09-06T00:00:00Z"), now)).toBe(false);
  });

  it("ist false genau am 16. Geburtstag", () => {
    expect(requiresParentalConsent(new Date("2010-09-13T00:00:00Z"), now)).toBe(false);
  });

  it("ist true einen Tag vor dem 16. Geburtstag", () => {
    expect(requiresParentalConsent(new Date("2010-09-14T00:00:00Z"), now)).toBe(true);
  });

  it("ist false für eine erwachsene Person", () => {
    expect(requiresParentalConsent(new Date("2000-01-01T00:00:00Z"), now)).toBe(false);
  });

  it("ist true für ein Kind", () => {
    expect(requiresParentalConsent(new Date("2015-01-01T00:00:00Z"), now)).toBe(true);
  });
});
