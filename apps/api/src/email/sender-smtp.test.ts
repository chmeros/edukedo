import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const BASE_ENV = {
  NODE_ENV: "production" as const,
  SMTP_HOST: "smtp.example.test",
  SMTP_PORT: 587,
  SMTP_SECURE: false,
  SMTP_USER: "benutzer@example.test",
  SMTP_PASSWORD: "geheim-passwort",
  MAIL_FROM: "edukedo <noreply@example.test>",
};

describe("SMTP-Versand", () => {
  const sendMail = vi.fn();
  const createTransport = vi.fn(() => ({ sendMail }));

  beforeEach(() => {
    vi.useFakeTimers();
    sendMail.mockReset();
    createTransport.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.resetModules();
    vi.doUnmock("../env");
    vi.doUnmock("nodemailer");
  });

  async function loadSender(envOverrides: Record<string, unknown> = {}) {
    vi.resetModules();
    vi.doMock("../env", () => ({ env: { ...BASE_ENV, ...envOverrides } }));
    vi.doMock("nodemailer", () => ({ default: { createTransport } }));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const sender = await import("./sender");
    const logged = () => [...warn.mock.calls, ...error.mock.calls, ...log.mock.calls].flat().join(" | ");
    return { sender, logged };
  }

  it("sendet die Mail mit Absender, Empfänger, Betreff und Link als Text und schreibt den Link nicht ins Log", async () => {
    sendMail.mockResolvedValue({});
    const { sender, logged } = await loadSender();
    sender.sendConsentEmail({ to: "eltern@example.com", confirmUrl: "https://edukedo.example/consent/confirm?token=GEHEIM123", childEmail: "kind@example.com" });
    await vi.runAllTimersAsync();

    expect(sendMail).toHaveBeenCalledTimes(1);
    const mail = sendMail.mock.calls[0]?.[0];
    expect(mail?.from).toBe("edukedo <noreply@example.test>");
    expect(mail?.to).toBe("eltern@example.com");
    expect(mail?.subject).toContain("kind@example.com");
    expect(mail?.text).toContain("https://edukedo.example/consent/confirm?token=GEHEIM123");
    expect(logged()).not.toContain("GEHEIM123");
    expect(logged()).not.toContain("eltern@example.com");
  });

  it("richtet die Verbindung verschlüsselt ein (STARTTLS erzwungen, Zugangsdaten, Zeitlimits)", async () => {
    sendMail.mockResolvedValue({});
    const { sender } = await loadSender();
    sender.sendPasswordResetEmail({ to: "a@example.com", resetUrl: "https://edukedo.example/reset?token=X" });
    await vi.runAllTimersAsync();

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.example.test",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: "benutzer@example.test", pass: "geheim-passwort" },
        connectionTimeout: expect.any(Number),
        socketTimeout: expect.any(Number),
      }),
    );
  });

  it("verlangt bei implizitem TLS (Port 465) kein zusätzliches STARTTLS und nutzt die Verbindung für mehrere Mails", async () => {
    sendMail.mockResolvedValue({});
    const { sender } = await loadSender({ SMTP_PORT: 465, SMTP_SECURE: true });
    sender.sendEmailVerificationEmail({ to: "a@example.com", confirmUrl: "https://edukedo.example/verify?token=X" });
    sender.sendCompanySetupEmail({ to: "b@example.com", setupUrl: "https://edukedo.example/setup?token=Y", companyName: "Firma" });
    await vi.runAllTimersAsync();

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({ port: 465, secure: true, requireTLS: false }));
    expect(sendMail).toHaveBeenCalledTimes(2);
  });

  it("wiederholt einen fehlgeschlagenen Versand und meldet danach nichts, wenn ein späterer Versuch gelingt", async () => {
    sendMail.mockRejectedValueOnce(Object.assign(new Error("Timeout für eltern@example.com"), { code: "ETIMEDOUT" })).mockResolvedValue({});
    const { sender, logged } = await loadSender();
    sender.sendConsentReminderEmail({ to: "eltern@example.com", confirmUrl: "https://edukedo.example/c?token=GEHEIM9", childEmail: "kind@example.com", reminderNumber: 1 });
    await vi.runAllTimersAsync();

    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(logged()).toBe("");
  });

  it("protokolliert nach drei Fehlversuchen nur maskierte Adresse und SMTP-Code, nie Link oder Fehlertext", async () => {
    sendMail.mockRejectedValue(Object.assign(new Error("550 Empfänger eltern@example.com abgelehnt"), { code: "EENVELOPE", responseCode: 550 }));
    const { sender, logged } = await loadSender();
    sender.sendConsentEmail({ to: "eltern@example.com", confirmUrl: "https://edukedo.example/c?token=GEHEIM7", childEmail: "kind@example.com" });
    await vi.runAllTimersAsync();

    expect(sendMail).toHaveBeenCalledTimes(3);
    const text = logged();
    expect(text).toContain("e***@example.com");
    expect(text).toContain("EENVELOPE 550");
    expect(text).not.toContain("GEHEIM7");
    expect(text).not.toContain("eltern@example.com");
    expect(text).not.toContain("abgelehnt");
  });

  it("wirft keinen unbehandelten Fehler, wenn der Aufrufer nicht wartet", async () => {
    sendMail.mockRejectedValue(new Error("kaputt"));
    const { sender } = await loadSender();
    expect(() => sender.sendPasswordResetEmail({ to: "a@example.com", resetUrl: "https://edukedo.example/r?token=Z" })).not.toThrow();
    await vi.runAllTimersAsync();
  });

  it("fällt ohne SMTP_HOST auf den Platzhalter zurück und baut keine Verbindung auf", async () => {
    const { sender, logged } = await loadSender({ SMTP_HOST: undefined });
    sender.sendPasswordResetEmail({ to: "a@example.com", resetUrl: "https://edukedo.example/r?token=Z" });
    await vi.runAllTimersAsync();

    expect(createTransport).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
    expect(logged()).toContain("NICHT versendet");
  });
});
