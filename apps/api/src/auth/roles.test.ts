import { describe, expect, it } from "vitest";
import { hasRole } from "./roles";

describe("hasRole", () => {
  it("erlaubt eine Rolle, die in der Allow-Liste steht", () => {
    expect(hasRole("admin", ["admin"])).toBe(true);
    expect(hasRole("learner", ["admin", "learner"])).toBe(true);
  });

  it("lehnt eine Rolle ab, die nicht in der Allow-Liste steht", () => {
    expect(hasRole("learner", ["admin"])).toBe(false);
  });

  it("lehnt jede Rolle bei einer leeren Allow-Liste ab", () => {
    expect(hasRole("admin", [])).toBe(false);
  });
});
