import { describe, expect, it } from "vitest";
import { updateCompanyBrandingInputSchema } from "./company";
import { createSponsorInputSchema } from "./sponsor";

describe("Logo-Adressen nur mit https (Review SHR-11/UXL-10)", () => {
  const basis = { color: "", headline: "" };

  it("akzeptiert https-Adressen und eine leere Angabe", () => {
    expect(updateCompanyBrandingInputSchema.safeParse({ ...basis, logoUrl: "https://example.com/logo.png" }).success).toBe(true);
    expect(updateCompanyBrandingInputSchema.safeParse({ ...basis, logoUrl: "" }).success).toBe(true);
  });

  it("lehnt http, javascript:, data:, file: und ftp: ab", () => {
    for (const logoUrl of ["http://example.com/l.png", "javascript:alert(1)", "data:text/html,x", "file:///etc/passwd", "ftp://example.com/l.png"]) {
      const result = updateCompanyBrandingInputSchema.safeParse({ ...basis, logoUrl });
      expect(result.success, logoUrl).toBe(false);
    }
  });

  it("gilt auch für Sponsoren", () => {
    const sponsor = { name: "Test", attributionText: "Ermöglicht durch Test", logoUrl: "https://example.com/l.png" };
    expect(createSponsorInputSchema.safeParse(sponsor).success).toBe(true);
    expect(createSponsorInputSchema.safeParse({ ...sponsor, logoUrl: "http://example.com/l.png" }).success).toBe(false);
  });
});
