import { describe, expect, it } from "vitest";
import { kursZielgruppe, matchesKursZielgruppe } from "./course-audience";

describe("kursZielgruppe", () => {
  it("liest ein gesetztes zielgruppe-Feld aus den Metadaten", () => {
    expect(kursZielgruppe({ zielgruppe: "erwachsene" })).toBe("erwachsene");
    expect(kursZielgruppe({ zielgruppe: "minderjaehrige" })).toBe("minderjaehrige");
  });

  it("fällt auf \"alle\" zurück, wenn das Feld fehlt", () => {
    expect(kursZielgruppe({})).toBe("alle");
    expect(kursZielgruppe({ klassenstufe: 9 })).toBe("alle");
  });

  it("fällt auf \"alle\" zurück bei unbekanntem Wert oder unerwarteter Form", () => {
    expect(kursZielgruppe({ zielgruppe: "kinder" })).toBe("alle");
    expect(kursZielgruppe(null)).toBe("alle");
    expect(kursZielgruppe(undefined)).toBe("alle");
    expect(kursZielgruppe("erwachsene")).toBe("alle");
    expect(kursZielgruppe(["erwachsene"])).toBe("alle");
  });
});

describe("matchesKursZielgruppe", () => {
  it("lässt Minderjährige nur zu Kursen für Minderjährige oder alle zu", () => {
    expect(matchesKursZielgruppe("minderjaehrige", true)).toBe(true);
    expect(matchesKursZielgruppe("erwachsene", true)).toBe(false);
    expect(matchesKursZielgruppe("alle", true)).toBe(true);
  });

  it("lässt Erwachsene nur zu Kursen für Erwachsene oder alle zu", () => {
    expect(matchesKursZielgruppe("erwachsene", false)).toBe(true);
    expect(matchesKursZielgruppe("minderjaehrige", false)).toBe(false);
    expect(matchesKursZielgruppe("alle", false)).toBe(true);
  });
});
