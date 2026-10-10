import { describe, expect, it } from "vitest";
import { contactEmail, DISPLAY_NAME_REQUIRED_MESSAGE, isSocialRestricted, requireSocialAccess, socialName } from "./social-policy";

describe("isSocialRestricted", () => {
  it("sperrt nur Minderjährige ohne Freigabe", () => {
    expect(isSocialRestricted({ isMinor: true, gamificationEnabled: false })).toBe(true);
    expect(isSocialRestricted({ isMinor: true, gamificationEnabled: true })).toBe(false);
    expect(isSocialRestricted({ isMinor: false, gamificationEnabled: false })).toBe(false);
  });

  it("requireSocialAccess wirft für gesperrte Konten FORBIDDEN", () => {
    expect(() => requireSocialAccess({ isMinor: true, gamificationEnabled: false, displayName: "Mia" })).toThrow(/Einwilligung/);
    expect(() => requireSocialAccess({ isMinor: false, gamificationEnabled: false, displayName: "Mia" })).not.toThrow();
  });

  it("requireSocialAccess verlangt einen Anzeigenamen (Entscheidung 10.10.2026)", () => {
    expect(() => requireSocialAccess({ isMinor: false, gamificationEnabled: false, displayName: null })).toThrow(DISPLAY_NAME_REQUIRED_MESSAGE);
    expect(() => requireSocialAccess({ isMinor: false, gamificationEnabled: false, displayName: "   " })).toThrow(/Anzeigenamen/);
    expect(() => requireSocialAccess({ isMinor: true, gamificationEnabled: true, displayName: null })).toThrow(/Anzeigenamen/);
  });
});

describe("socialName und contactEmail", () => {
  const erwachsen = { isMinor: false };
  const kind = { isMinor: true };

  it("nimmt zuerst den Anzeigenamen", () => {
    expect(socialName({ displayName: " Mia ", email: "mia@example.com" })).toBe("Mia");
  });

  it("zeigt nie die Adresse, auch nicht zwischen Erwachsenen", () => {
    expect(socialName({ displayName: null, email: "mia.mueller@example.com" })).toBe("mi***@***.com");
    expect(socialName({ displayName: "  ", email: "a@b.org" })).toBe("a***@***.org");
    expect(socialName({ displayName: null, email: "ohne-at" })).toBe("oh***@***");
  });

  it("gibt die Adresse für den Klick der Leitung nur zwischen zwei Erwachsenen heraus", () => {
    expect(contactEmail({ email: "mia@example.com", isMinor: false }, erwachsen)).toBe("mia@example.com");
    expect(contactEmail({ email: "mia@example.com", isMinor: true }, erwachsen)).toBeNull();
    expect(contactEmail({ email: "mia@example.com", isMinor: false }, kind)).toBeNull();
  });
});
