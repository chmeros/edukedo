import { describe, expect, it } from "vitest";
import { importPreviewToken } from "./import-preview";

const base = { created: 1, updated: 2, unchanged: 3, deactivated: 0, activationChanges: 0, blocked: [], solutionChanged: [{ thema: "k/f/1.1", key: "Q-1" }] };

describe("importPreviewToken", () => {
  it("ist deterministisch und unabhängig von der Reihenfolge der Listen", () => {
    const a = importPreviewToken({ ...base, solutionChanged: [{ thema: "k/f/1.1", key: "Q-1" }, { thema: "k/f/1.2", key: "Q-2" }] });
    const b = importPreviewToken({ ...base, solutionChanged: [{ thema: "k/f/1.2", key: "Q-2" }, { thema: "k/f/1.1", key: "Q-1" }] });
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{32}$/);
  });

  it("ändert sich bei jeder Änderung der Zahlen, blockierten Themen oder geänderten Lösungen", () => {
    const token = importPreviewToken(base);
    expect(importPreviewToken({ ...base, created: 2 })).not.toBe(token);
    expect(importPreviewToken({ ...base, updated: 3 })).not.toBe(token);
    expect(importPreviewToken({ ...base, unchanged: 4 })).not.toBe(token);
    expect(importPreviewToken({ ...base, deactivated: 1 })).not.toBe(token);
    expect(importPreviewToken({ ...base, activationChanges: 1 })).not.toBe(token);
    expect(importPreviewToken({ ...base, blocked: [{ thema: "k/f/1.1", reason: "zu viele" }] })).not.toBe(token);
    expect(importPreviewToken({ ...base, solutionChanged: [] })).not.toBe(token);
  });
});
