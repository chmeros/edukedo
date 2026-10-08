import { describe, expect, it } from "vitest";
import { globPasst } from "./terminal-sim";

describe("globPasst (Review WRK-13)", () => {
  it("passt wie eine Shell: * für beliebig viele, ? für genau ein Zeichen", () => {
    expect(globPasst("*.txt", "bericht.txt")).toBe(true);
    expect(globPasst("*.txt", "bericht.pdf")).toBe(false);
    expect(globPasst("log?", "log1")).toBe(true);
    expect(globPasst("log?", "log")).toBe(false);
    expect(globPasst("a*b*c", "aXXbYYc")).toBe(true);
    expect(globPasst("a*b*c", "aXXbYY")).toBe(false);
    expect(globPasst("*", "")).toBe(true);
    expect(globPasst("", "")).toBe(true);
    expect(globPasst("", "x")).toBe(false);
  });

  it("behandelt Sonderzeichen der Regex-Schreibweise als gewöhnliche Zeichen", () => {
    expect(globPasst("a.b", "a.b")).toBe(true);
    expect(globPasst("a.b", "axb")).toBe(false);
    expect(globPasst("(x)+[y]", "(x)+[y]")).toBe(true);
  });

  it("läuft auch bei vielen Sternen und ohne Treffer in kurzer Zeit (kein exponentielles Zurückverfolgen)", () => {
    const muster = `${"*a".repeat(40)}*b`;
    const name = "a".repeat(60);
    const start = performance.now();
    expect(globPasst(muster, name)).toBe(false);
    expect(performance.now() - start).toBeLessThan(200);
  });
});
