import { describe, expect, it } from "vitest";
import { hasRole } from "./roles";

describe("hasRole", () => {
  it("erlaubt eine Rolle, die in der Allow-Liste steht", () => {
    expect(hasRole("admin", ["admin"])).toBe(true);
    expect(hasRole("content_editor", ["admin", "content_editor"])).toBe(true);
  });

  it("lehnt eine Rolle ab, die nicht in der Allow-Liste steht", () => {
    expect(hasRole("learner", ["admin"])).toBe(false);
    expect(hasRole("content_editor", ["admin"])).toBe(false);
  });

  it("lehnt jede Rolle bei einer leeren Allow-Liste ab", () => {
    expect(hasRole("admin", [])).toBe(false);
  });
});
