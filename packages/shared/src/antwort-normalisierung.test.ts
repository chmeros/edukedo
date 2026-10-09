import { describe, expect, it } from "vitest";
import { normalisiereAntwort as n } from "./antwort-normalisierung";

function gleich(...varianten: string[]) {
  const [erste, ...rest] = varianten;
  for (const variante of rest) {
    expect(n(variante), `„${variante}“ soll wie „${erste}“ gelten`).toBe(n(erste!));
  }
}
function verschieden(a: string, b: string) {
  expect(n(a), `„${a}“ darf nicht wie „${b}“ gelten`).not.toBe(n(b));
}

describe("normalisiereAntwort: gleiche Antworten in verschiedener Schreibweise", () => {
  it("Wurzel", () => {
    gleich("√10", "wurzel 10", "Wurzel aus 10", "sqrt(10)", "sqrt 10", "√(10)", "√ 10", "quadratwurzel aus 10");
    gleich("10√2", "10 √2", "10*√2", "10·√2", "10 Wurzel 2", "10 * wurzel(2)");
  });

  it("Hochzahlen", () => {
    gleich("x²", "x^2", "x ^ 2", "x**2", "x hoch 2", "x^(2)");
    gleich("2^10", "2¹⁰", "2 hoch 10", "2**10", "2^(10)");
    gleich("3⁻²", "3^-2", "3^(-2)", "3 hoch -2", "3^−2");
  });

  it("Winkel und Funktionen", () => {
    gleich("45°", "45 Grad", "45", "45 grad");
    gleich("9 · tan(60°)", "9*tan(60)", "9 tan 60", "9tan60°", "9 · tan 60 °");
    gleich("4 · sin(70°)", "4*sin(70)", "4 sin 70");
  });

  it("Minus, Mal, Leerzeichen und Prozent", () => {
    gleich("x=-4", "x = −4", "x=–4", "X = -4");
    gleich("15 %", "15%", "15 %", "15 %");
    gleich("S(1|3)", "S (1 | 3)", "s(1|3)");
    gleich("x=4 und x=-4", "x = 4 und x = −4");
  });

  it("Pi", () => {
    gleich("π", "pi", "Pi");
  });
});

describe("normalisiereAntwort: verschiedene Antworten bleiben verschieden", () => {
  it("Punkt und Komma bei Zahlen werden nicht gleichgesetzt (1.000 ist nicht 1,000)", () => {
    verschieden("1.000", "1,000");
    verschieden("0,5", "0.5"); // bewusst: Schreibweisen mit Punkt stehen als eigene Variante im Inhalt
  });

  it("Malzeichen zwischen Zahlen bleibt, 2*3 ist nicht 23", () => {
    verschieden("2*3", "23");
    expect(n("2*3")).toBe("2*3");
  });

  it("Klammern um zusammengesetzte Ausdrücke bleiben: √(a+b) ist nicht √a+b", () => {
    verschieden("√(a+b)", "√a+b");
    verschieden("tan(a+b)", "tana+b");
    verschieden("2^(n+1)", "2^n+1");
  });

  it("andere Zahlen, andere Vorzeichen, andere Hochzahlen", () => {
    verschieden("√10", "√11");
    verschieden("x=4", "x=-4");
    verschieden("x²", "x³");
    verschieden("2^10", "2^11");
    verschieden("45°", "54°");
    verschieden("9 tan 60", "9 tan 30");
  });

  it("Wörter bleiben unverändert: nur Groß-/Kleinschreibung und Leerzeichen werden angeglichen", () => {
    gleich("Bundeskartellamt", "bundeskartellamt", "Bundes kartellamt");
    verschieden("Bundeskartellamt", "Bundesamt");
    expect(n("Global Sourcing")).toBe("globalsourcing");
  });

  it("leere Eingabe bleibt leer", () => {
    expect(n("")).toBe("");
    expect(n("   ")).toBe("");
  });
});
