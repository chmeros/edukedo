import { describe, expect, it } from "vitest";
import { rechtsstandDatum, rechtsstandHinweis } from "./rechtsstand";

describe("Rechtsstand (UXT-B-13)", () => {
  it("nimmt das Datum vor dem Gedankenstrich", () => {
    expect(rechtsstandDatum("23.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen")).toBe("23.10.2026");
  });

  it("akzeptiert ein bloßes Datum ohne Vermerk", () => {
    expect(rechtsstandDatum("14.09.2026")).toBe("14.09.2026");
  });

  it("behält einen Klammerzusatz am Datum", () => {
    expect(rechtsstandDatum("23.10.2026 (BU-Definition gegen § 172 VVG geprüft) — rechtliche Passagen prüfen")).toBe("23.10.2026 (BU-Definition gegen § 172 VVG geprüft)");
  });

  it("trennt nur am Gedankenstrich mit Leerzeichen, nicht am Bindestrich", () => {
    expect(rechtsstandDatum("Oktober 2026 - Entwurf")).toBe("Oktober 2026 - Entwurf");
  });

  it("liefert null für leere oder fehlende Werte", () => {
    expect(rechtsstandDatum(undefined)).toBeNull();
    expect(rechtsstandDatum(null)).toBeNull();
    expect(rechtsstandDatum("")).toBeNull();
    expect(rechtsstandDatum("   ")).toBeNull();
    expect(rechtsstandDatum(" — nur Vermerk")).toBeNull();
    expect(rechtsstandHinweis("")).toBeNull();
    // Themen ohne Rechtsbezug (Mathematik) bekommen keinen Rechtshinweis.
    expect(rechtsstandHinweis("14.09.2026 — vor Verwendung durch echte Lernende fachlich gegenlesen")).toBeNull();
  });

  it("baut den Hinweistext", () => {
    expect(rechtsstandHinweis("23.10.2026 — rechtliche Passagen prüfen")).toBe(
      "Rechtlicher Stand: 23.10.2026. Ohne Gewähr, keine Rechtsberatung; rechtliche Passagen vor Verwendung prüfen.",
    );
  });
});
