import { describe, expect, it } from "vitest";
import { devLink } from "./dev-links";

describe("devLink (Review UXL-19)", () => {
  it("liefert den Link außerhalb von Produktion aus", () => {
    expect(devLink("development", "http://localhost:5173/verify-email?token=abc")).toBe("http://localhost:5173/verify-email?token=abc");
    expect(devLink("test", "http://localhost:5173/reset?token=abc")).toBe("http://localhost:5173/reset?token=abc");
  });

  it("liefert in Produktion nichts aus, auch nicht bei gesetztem Link", () => {
    expect(devLink("production", "http://localhost:5173/verify-email?token=abc")).toBeUndefined();
  });

  it("lässt einen fehlenden Link fehlend", () => {
    expect(devLink("development", undefined)).toBeUndefined();
    expect(devLink("production", undefined)).toBeUndefined();
  });
});
