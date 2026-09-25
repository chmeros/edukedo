import { describe, expect, it } from "vitest";
import { withTimeout } from "./with-timeout";

describe("withTimeout", () => {
  it("löst mit dem Ergebnis auf, wenn das Promise vor dem Zeitlimit erfüllt wird", async () => {
    const fast = new Promise((resolve) => setTimeout(() => resolve("ok"), 10));
    await expect(withTimeout(fast, 200, "zu langsam")).resolves.toBe("ok");
  });

  it("wirft die Zeitlimit-Nachricht, wenn das Promise nicht rechtzeitig erfüllt wird", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("zu spät"), 200));
    await expect(withTimeout(slow, 10, "Redis nicht erreichbar")).rejects.toThrow("Redis nicht erreichbar");
  });

  it("wirft den ursprünglichen Fehler weiter, wenn das Promise selbst vor dem Zeitlimit ablehnt", async () => {
    const failing = Promise.reject(new Error("echter Fehler"));
    await expect(withTimeout(failing, 200, "zu langsam")).rejects.toThrow("echter Fehler");
  });
});
