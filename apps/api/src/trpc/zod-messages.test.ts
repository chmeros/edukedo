import { describe, expect, it } from "vitest";
import { z } from "zod";
import { zodIssuesDe } from "./zod-messages";

function meldung(schema: z.ZodTypeAny, wert: unknown): string {
  const result = schema.safeParse(wert);
  if (result.success) throw new Error("Erwartet: Validierungsfehler");
  return zodIssuesDe(result.error.issues);
}

describe("zodIssuesDe (Review UXL-08/WEB-14)", () => {
  it("übersetzt Länge, Pflichtfeld, E-Mail und Format ins Deutsche", () => {
    const schema = z.object({ name: z.string().min(1).max(100), email: z.string().email(), password: z.string().min(8) });
    expect(meldung(schema, { name: "x".repeat(101), email: "abc", password: "kurz" })).toBe(
      "Der Name ist zu lang (höchstens 100 Zeichen). Bitte gib eine gültige E-Mail-Adresse ein. Das Passwort ist zu kurz (mindestens 8 Zeichen).",
    );
    expect(meldung(z.object({ name: z.string().min(1) }), { name: "" })).toBe("Der Name darf nicht leer sein.");
    expect(meldung(z.object({ code: z.string() }), {})).toBe("Der Code fehlt.");
  });

  it("lässt eigene deutsche Meldungen unverändert und nennt unbekannte Felder allgemein", () => {
    const schema = z.object({ a: z.string() }).refine(() => false, { message: "Bitte gib einen Elternteil an." });
    expect(meldung(schema, { a: "x" })).toBe("Bitte gib einen Elternteil an.");
    expect(meldung(z.object({ irgendwas: z.number().max(5) }), { irgendwas: 9 })).toBe("Die Eingabe ist zu groß (höchstens 5).");
  });

  it("enthält nie englische Standardtexte", () => {
    const texte = [
      meldung(z.array(z.string()).max(2), ["a", "b", "c"]),
      meldung(z.enum(["a", "b"]), "c"),
      meldung(z.string().url(), "x"),
      meldung(z.coerce.date(), "kein datum"),
    ];
    for (const text of texte) expect(text).not.toMatch(/String must|Invalid|Required|Expected/);
  });
});
