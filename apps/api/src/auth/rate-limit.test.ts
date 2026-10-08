import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit, rateLimitEntryCount, resetRateLimits } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    resetRateLimits();
  });

  it("erlaubt bis zur Höchstzahl und blockiert danach bis zum Ablauf des Fensters", () => {
    for (let i = 0; i < 3; i += 1) expect(checkRateLimit("a", 3, 1000)).toBe(true);
    expect(checkRateLimit("a", 3, 1000)).toBe(false);
    expect(checkRateLimit("b", 3, 1000)).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(checkRateLimit("a", 3, 1000)).toBe(true);
  });

  it("entfernt abgelaufene Einträge, sobald viele Schlüssel angefallen sind (kein unbegrenztes Wachstum)", () => {
    for (let i = 0; i < 6_000; i += 1) checkRateLimit(`alt-${i}`, 1, 1000);
    expect(rateLimitEntryCount()).toBe(6_000);

    vi.advanceTimersByTime(2000);
    checkRateLimit("neu", 1, 1000);
    // Die 6.000 abgelaufenen Einträge sind weg, nur der neue steht.
    expect(rateLimitEntryCount()).toBe(1);
  });

  it("begrenzt den Speicher auch bei einer Flut noch gültiger Schlüssel auf die Obergrenze", () => {
    for (let i = 0; i < 60_000; i += 1) checkRateLimit(`flut-${i}`, 1, 24 * 60 * 60 * 1000);
    expect(rateLimitEntryCount()).toBeLessThanOrEqual(50_000);
    // Neue Schlüssel werden weiterhin gezählt.
    expect(checkRateLimit("flut-letzter", 1, 1000)).toBe(true);
    expect(checkRateLimit("flut-letzter", 1, 1000)).toBe(false);
  });
});
