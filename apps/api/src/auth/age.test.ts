import { describe, expect, it } from "vitest";
import { calculateIsMinor } from "./age";

describe("calculateIsMinor", () => {
  const now = new Date("2026-09-12T00:00:00Z");

  it("ist true für eine Person, die erst in einer Woche 18 wird", () => {
    expect(calculateIsMinor(new Date("2008-09-19T00:00:00Z"), now)).toBe(true);
  });

  it("ist false für eine Person, die vor einer Woche 18 wurde", () => {
    expect(calculateIsMinor(new Date("2008-09-05T00:00:00Z"), now)).toBe(false);
  });

  it("ist false genau am 18. Geburtstag", () => {
    expect(calculateIsMinor(new Date("2008-09-12T00:00:00Z"), now)).toBe(false);
  });

  it("ist true einen Tag vor dem 18. Geburtstag", () => {
    expect(calculateIsMinor(new Date("2008-09-13T00:00:00Z"), now)).toBe(true);
  });

  it("ist true für ein Kind", () => {
    expect(calculateIsMinor(new Date("2015-01-01T00:00:00Z"), now)).toBe(true);
  });
});
