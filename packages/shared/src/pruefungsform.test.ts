import { describe, expect, it } from "vitest";
import { fachgespraechPruefungsform } from "./pruefungsform";

describe("fachgespraechPruefungsform", () => {
  it("ordnet die wirtschaftsbezogenen Bereiche der Ergänzungsprüfung nach § 4 Abs. 6 zu (15 Minuten)", () => {
    for (const code of ["WQ1", "WQ2", "WQ3", "WQ4"]) {
      const form = fachgespraechPruefungsform("technischer-fachwirt", code);
      expect(form?.art).toBe("ergaenzungspruefung");
      expect(form?.dauerMinuten).toBe(15);
      expect(form?.quelle).toContain("§ 4 Abs. 6");
    }
  });

  it("ordnet die technischen Bereiche der Ergänzungsprüfung nach § 5 Abs. 5 zu (20 Minuten)", () => {
    for (const code of ["TQ1", "TQ2", "TQ3"]) {
      const form = fachgespraechPruefungsform("technischer-fachwirt", code);
      expect(form?.art).toBe("ergaenzungspruefung");
      expect(form?.dauerMinuten).toBe(20);
      expect(form?.quelle).toContain("§ 5 Abs. 5");
    }
  });

  it("ordnet die Handlungsbereiche dem regulären Fachgespräch zu und nennt bei HQ1 und HQ2 den Schwerpunkt", () => {
    for (const code of ["HQ1", "HQ2", "HQ3", "HQ4"]) {
      const form = fachgespraechPruefungsform("technischer-fachwirt", code);
      expect(form?.art).toBe("fachgespraech");
      expect(form?.dauerMinuten).toBe(30);
      expect(form?.quelle).toContain("§ 3 Abs. 6");
    }
    // § 3 Abs. 6 TechFachwPrV: Schwerpunkt auf § 3 Abs. 4 Nr. 1 und 2, also HQ1 und HQ2.
    for (const code of ["HQ1", "HQ2"]) expect(fachgespraechPruefungsform("technischer-fachwirt", code)?.hinweis).toContain("Schwerpunkt");
    for (const code of ["HQ3", "HQ4"]) expect(fachgespraechPruefungsform("technischer-fachwirt", code)?.hinweis).not.toContain("Schwerpunkt");
  });

  it("liefert für andere Kurse und unbekannte Fachgebiete nichts", () => {
    expect(fachgespraechPruefungsform("handelsfachwirt", "WQ1")).toBeNull();
    expect(fachgespraechPruefungsform("technischer-fachwirt", "XY9")).toBeNull();
  });

  it("unterscheidet Groß- und Kleinschreibung und Leerzeichen nicht", () => {
    expect(fachgespraechPruefungsform("technischer-fachwirt", " wq2 ")?.art).toBe("ergaenzungspruefung");
  });
});
