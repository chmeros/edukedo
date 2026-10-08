import { afterEach, describe, expect, it, vi } from "vitest";
import { maskEmailAddress } from "./mask";

describe("maskEmailAddress", () => {
  it("zeigt nur den ersten Buchstaben und die Domain", () => {
    expect(maskEmailAddress("maria.mustermann@example.com")).toBe("m***@example.com");
    expect(maskEmailAddress("a@b.de")).toBe("a***@b.de");
  });
});

describe("Platzhalter-E-Mail-Versand (Review SEC-01)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("../env");
  });

  async function sendWithEnv(nodeEnv: "production" | "development") {
    vi.resetModules();
    vi.doMock("../env", () => ({ env: { NODE_ENV: nodeEnv } }));
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const sender = await import("./sender");
    sender.sendConsentEmail({ to: "eltern@example.com", confirmUrl: "https://edukedo.example/consent/confirm?token=GEHEIM123", childEmail: "kind@example.com" });
    sender.sendCompanySetupEmail({ to: "firma@example.com", setupUrl: "https://edukedo.example/company/setup?token=GEHEIM456", companyName: "Firma" });
    return { logged: [...log.mock.calls, ...warn.mock.calls].flat().join(" | ") };
  }

  it("schreibt in Produktion weder Links noch vollständige Adressen ins Log, sondern nur eine Warnung mit maskierter Adresse", async () => {
    const { logged } = await sendWithEnv("production");
    expect(logged).not.toContain("GEHEIM123");
    expect(logged).not.toContain("GEHEIM456");
    expect(logged).not.toContain("eltern@example.com");
    expect(logged).not.toContain("kind@example.com");
    expect(logged).toContain("e***@example.com");
    expect(logged).toContain("NICHT versendet");
  });

  it("gibt in Entwicklung und Test den vollständigen Text samt Link aus", async () => {
    const { logged } = await sendWithEnv("development");
    expect(logged).toContain("GEHEIM123");
    expect(logged).toContain("eltern@example.com");
  });
});
