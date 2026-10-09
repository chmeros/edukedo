import { describe, expect, it } from "vitest";
import { logoDataSchema, updateCompanyBrandingInputSchema, uploadLogoInputSchema } from "./company";
import { createSponsorInputSchema, setSponsorLogoInputSchema } from "./sponsor";

describe("Logo-Upload statt externer Adresse (Entscheidung 09.10.2026)", () => {
  it("das Branding trägt keine Logo-Adresse mehr: eine mitgesendete Adresse wird verworfen", () => {
    const result = updateCompanyBrandingInputSchema.safeParse({ color: "#112233", headline: "Hallo", logoUrl: "https://example.com/l.png" });
    expect(result.success).toBe(true);
    expect(result.success && "logoUrl" in result.data).toBe(false);
  });

  it("Bilddaten sind Base64-Text mit Obergrenze und nicht leer", () => {
    expect(logoDataSchema.safeParse("QUJD").success).toBe(true);
    expect(logoDataSchema.safeParse("").success).toBe(false);
    expect(logoDataSchema.safeParse("A".repeat(300_001)).success).toBe(false);
    expect(uploadLogoInputSchema.safeParse({ dataBase64: "QUJD" }).success).toBe(true);
    expect(uploadLogoInputSchema.safeParse({}).success).toBe(false);
  });

  it("Sponsoren: Logo ist optional, beim Ersetzen darf es auch entfernt werden", () => {
    const sponsor = { name: "Test", attributionText: "Ermöglicht durch Test" };
    expect(createSponsorInputSchema.safeParse(sponsor).success).toBe(true);
    expect(createSponsorInputSchema.safeParse({ ...sponsor, logoData: "QUJD" }).success).toBe(true);
    const id = "3f6b1a3e-6a43-4b7c-9d1d-2d3b8f0c9a11";
    expect(setSponsorLogoInputSchema.safeParse({ sponsorId: id, logoData: null }).success).toBe(true);
    expect(setSponsorLogoInputSchema.safeParse({ sponsorId: id, logoData: "QUJD" }).success).toBe(true);
    expect(setSponsorLogoInputSchema.safeParse({ sponsorId: id }).success).toBe(false);
  });
});
