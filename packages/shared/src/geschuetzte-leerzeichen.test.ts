import { describe, expect, it } from "vitest";
import { headingSlug } from "./theorie-headings";
import { schuetzeZahlUndEinheit } from "./geschuetzte-leerzeichen";

const NBSP = "\u00a0";

describe("schuetzeZahlUndEinheit", () => {
  it("schützt das Leerzeichen zwischen Zahl und €, % und Einheiten", () => {
    expect(schuetzeZahlUndEinheit("| Materialkosten | 2.000,00 € |")).toBe(`| Materialkosten | 2.000,00${NBSP}€ |`);
    expect(schuetzeZahlUndEinheit("Zinssatz 4 % und 36,7 %")).toBe(`Zinssatz 4${NBSP}% und 36,7${NBSP}%`);
    expect(schuetzeZahlUndEinheit("Der Druck beträgt 11 bar bei 850 °C und 1.200 min⁻¹.")).toBe(
      `Der Druck beträgt 11${NBSP}bar bei 850${NBSP}°C und 1.200${NBSP}min⁻¹.`,
    );
    expect(schuetzeZahlUndEinheit("Querschnitt 84 mm² und 940 N/mm²")).toBe(`Querschnitt 84${NBSP}mm² und 940${NBSP}N/mm²`);
  });

  it("nimmt die längste passende Einheit und verwechselt sie nicht mit Wörtern", () => {
    expect(schuetzeZahlUndEinheit("5 mm Blech")).toBe(`5${NBSP}mm Blech`);
    expect(schuetzeZahlUndEinheit("2 m lang")).toBe(`2${NBSP}m lang`);
    // „mal“, „Minuten“, „Stück“, „Jahre“ und „Schritte“ sind Wörter, keine Einheiten im Sinn dieser Funktion.
    expect(schuetzeZahlUndEinheit("3 mal, 10 Minuten, 5 Stück, 2 Jahre, 4 Schritte")).toBe("3 mal, 10 Minuten, 5 Stück, 2 Jahre, 4 Schritte");
    expect(schuetzeZahlUndEinheit("Teil 2 und 3 sind")).toBe("Teil 2 und 3 sind");
  });

  it("lässt Codeblöcke und Text ohne Zahl davor unverändert", () => {
    const text = "Preis in €\n```\n4 € je Stück\n```\n4 € danach";
    expect(schuetzeZahlUndEinheit(text)).toBe(`Preis in €\n\`\`\`\n4 € je Stück\n\`\`\`\n4${NBSP}€ danach`);
  });

  it("ändert die Überschriften-Anker nicht", () => {
    const mit = "Zuschlag 10 % auf Material";
    expect(headingSlug(schuetzeZahlUndEinheit(mit))).toBe(headingSlug(mit));
  });

  it("ändert sonst nichts am Text", () => {
    const text = "Zeile eins\r\nZeile zwei mit **fett** und `Code` 12 kg\n\n| a | b |\n|---|---|\n| 1 | 2 |";
    expect(schuetzeZahlUndEinheit(text).replace(new RegExp(NBSP, "g"), " ")).toBe(text);
  });
});
