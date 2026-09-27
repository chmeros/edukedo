import { describe, expect, it, vi } from "vitest";
import { checkAiProvider, checkAllServices, checkDatabase, checkPaymentService, checkRedis } from "./system-status";

describe("checkDatabase", () => {
  it("meldet ok, wenn die Abfrage erfolgreich zurückkommt", async () => {
    const db = { execute: vi.fn().mockResolvedValue([{ "?column?": 1 }]) };
    const result = await checkDatabase(db);
    expect(result).toMatchObject({ name: "Datenbank (Kern)", status: "ok" });
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("meldet down mit der Fehlermeldung, wenn die Abfrage fehlschlägt", async () => {
    const db = { execute: vi.fn().mockRejectedValue(new Error("Verbindung abgelehnt")) };
    const result = await checkDatabase(db);
    expect(result).toMatchObject({ name: "Datenbank (Kern)", status: "down", detail: "Verbindung abgelehnt" });
  });
});

describe("checkRedis", () => {
  it("meldet ok, wenn PING erfolgreich beantwortet wird", async () => {
    const result = await checkRedis(() => Promise.resolve("PONG"));
    expect(result).toMatchObject({ name: "Warteschlange (Redis)", status: "ok" });
  });

  it("meldet down, wenn PING fehlschlägt", async () => {
    const result = await checkRedis(() => Promise.reject(new Error("connect ECONNREFUSED")));
    expect(result).toMatchObject({ name: "Warteschlange (Redis)", status: "down", detail: "connect ECONNREFUSED" });
  });

  it("meldet down bei Zeitüberschreitung, statt unbegrenzt zu warten", async () => {
    const neverResolves = new Promise<string>(() => {});
    const result = await checkRedis(() => neverResolves);
    expect(result.status).toBe("down");
    expect(result.detail).toMatch(/Zeitlimit|Antwort/);
  }, 10_000);
});

describe("checkPaymentService", () => {
  it("meldet ok, wenn /health erfolgreich antwortet", async () => {
    const result = await checkPaymentService(() => Promise.resolve({ status: "ok" }));
    expect(result).toMatchObject({ name: "Payment-Service", status: "ok" });
  });

  it("meldet down, wenn der Service nicht erreichbar ist", async () => {
    const result = await checkPaymentService(() => Promise.reject(new Error("fetch failed")));
    expect(result).toMatchObject({ name: "Payment-Service", status: "down", detail: "fetch failed" });
  });
});

describe("checkAiProvider", () => {
  it("meldet not_configured im Platzhalter-Modus, ohne einen Netzwerkaufruf zu versuchen", async () => {
    const ping = vi.fn();
    const result = await checkAiProvider("placeholder", ping);
    expect(result).toMatchObject({ name: "KI-Anbindung", status: "not_configured" });
    expect(ping).not.toHaveBeenCalled();
  });

  it("meldet ok, wenn Ollama erreichbar ist", async () => {
    const result = await checkAiProvider("ollama", () => Promise.resolve());
    expect(result).toMatchObject({ name: "KI-Anbindung (Ollama)", status: "ok" });
  });

  it("meldet down, wenn Ollama nicht erreichbar ist", async () => {
    const result = await checkAiProvider("ollama", () => Promise.reject(new Error("ECONNREFUSED")));
    expect(result).toMatchObject({ name: "KI-Anbindung (Ollama)", status: "down", detail: "ECONNREFUSED" });
  });
});

describe("checkAllServices", () => {
  it("prüft alle Dienste unabhängig voneinander und liefert einen Zeitstempel", async () => {
    const db = { execute: vi.fn().mockResolvedValue([]) };
    const result = await checkAllServices(
      db,
      () => Promise.resolve("PONG"),
      () => Promise.resolve({ status: "ok" }),
      "ollama",
      () => Promise.resolve(),
    );
    expect(result.services).toHaveLength(4);
    expect(result.services.map((service) => service.name)).toEqual([
      "Datenbank (Kern)",
      "Warteschlange (Redis)",
      "Payment-Service",
      expect.stringMatching(/^KI-Anbindung/),
    ]);
    expect(new Date(result.checkedAt).toString()).not.toBe("Invalid Date");
  });

  it("lässt einen ausgefallenen Dienst die übrigen Prüfungen nicht verzögern oder verhindern", async () => {
    const db = { execute: vi.fn().mockRejectedValue(new Error("Datenbank down")) };
    const result = await checkAllServices(
      db,
      () => Promise.resolve("PONG"),
      () => Promise.resolve({ status: "ok" }),
      "placeholder",
      () => Promise.resolve(),
    );
    const database = result.services.find((service) => service.name === "Datenbank (Kern)");
    expect(database?.status).toBe("down");
    // Die übrigen Dienste wurden trotzdem geprüft (Promise.all statt Abbruch beim ersten Fehler).
    expect(result.services).toHaveLength(4);
  });
});
