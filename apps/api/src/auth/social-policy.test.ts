import { describe, expect, it } from "vitest";
import { contactEmail, isSocialRestricted, requireSocialAccess, socialName } from "./social-policy";

describe("isSocialRestricted", () => {
  it("sperrt nur Minderjährige ohne Freigabe", () => {
    expect(isSocialRestricted({ isMinor: true, gamificationEnabled: false })).toBe(true);
    expect(isSocialRestricted({ isMinor: true, gamificationEnabled: true })).toBe(false);
    expect(isSocialRestricted({ isMinor: false, gamificationEnabled: false })).toBe(false);
  });

  it("requireSocialAccess wirft für gesperrte Konten FORBIDDEN", () => {
    expect(() => requireSocialAccess({ isMinor: true, gamificationEnabled: false })).toThrow(/Einwilligung/);
    expect(() => requireSocialAccess({ isMinor: false, gamificationEnabled: false })).not.toThrow();
  });
});

describe("socialName und contactEmail", () => {
  const erwachsen = { isMinor: false };
  const kind = { isMinor: true };

  it("nimmt zuerst den Anzeigenamen", () => {
    expect(socialName({ displayName: " Mia ", email: "mia@example.com", isMinor: true }, kind)).toBe("Mia");
  });

  it("zeigt die Adresse nur zwischen zwei Erwachsenen", () => {
    expect(socialName({ displayName: null, email: "mia.mueller@example.com", isMinor: false }, erwachsen)).toBe("mia.mueller@example.com");
    expect(contactEmail({ email: "mia@example.com", isMinor: false }, erwachsen)).toBe("mia@example.com");
  });

  it("maskiert die Adresse, sobald eine Seite minderjährig ist, ohne Anbieter", () => {
    expect(socialName({ displayName: null, email: "mia.mueller@schule-xy.de", isMinor: true }, erwachsen)).toBe("mi***@***.de");
    expect(socialName({ displayName: "  ", email: "a@b.org", isMinor: false }, kind)).toBe("a***@***.org");
    expect(socialName({ displayName: null, email: "ohne-at", isMinor: true }, erwachsen)).toBe("oh***@***");
    expect(contactEmail({ email: "mia@example.com", isMinor: true }, erwachsen)).toBeNull();
    expect(contactEmail({ email: "mia@example.com", isMinor: false }, kind)).toBeNull();
  });
});
