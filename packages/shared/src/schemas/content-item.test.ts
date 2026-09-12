import { describe, expect, it } from "vitest";
import { contentItemPayloadSchema } from "./content-item";

describe("contentItemPayloadSchema", () => {
  it("akzeptiert eine gültige Lückentext-Payload", () => {
    const result = contentItemPayloadSchema.safeParse({
      type: "luecken",
      payload: {
        text_with_blanks: "Der ___ ist rund.",
        blanks: [{ id: "1", accepted: ["Ball"] }],
      },
    });
    expect(result.success).toBe(true);
  });

  it("lehnt eine Lückentext-Payload ohne blanks ab", () => {
    const result = contentItemPayloadSchema.safeParse({
      type: "luecken",
      payload: { text_with_blanks: "...", blanks: [] },
    });
    expect(result.success).toBe(false);
  });

  it("erwartet für karteikarte ein leeres Payload-Objekt", () => {
    const result = contentItemPayloadSchema.safeParse({
      type: "karteikarte",
      payload: {},
    });
    expect(result.success).toBe(true);
  });

  it("lehnt unbekannte Felder im karteikarte-Payload ab", () => {
    const result = contentItemPayloadSchema.safeParse({
      type: "karteikarte",
      payload: { unexpected: true },
    });
    expect(result.success).toBe(false);
  });
});
