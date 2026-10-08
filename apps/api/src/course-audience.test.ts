import { describe, expect, it } from "vitest";
import { isEnrollmentExclusive, kursKategorie, kursTargetsMinors, kursZielgruppe, matchesKursZielgruppe } from "./course-audience";

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

describe("kursTargetsMinors (Review SEC-02)", () => {
  it("erkennt ausdrücklich für Minderjährige gedachte Kurse", () => {
    expect(kursTargetsMinors({ zielgruppe: "minderjaehrige" })).toBe(true);
  });

  it("erkennt den Mathematik-Kurs (Kategorie schule, Klassenstufe, ohne zielgruppe)", () => {
    expect(kursTargetsMinors({ klassenstufe: 9, bundesland_ansatz: "bundeslandneutral", kategorie: "schule" })).toBe(true);
    expect(kursTargetsMinors({ kategorie: "schule" })).toBe(true);
    expect(kursTargetsMinors({ klassenstufe: 9 })).toBe(true);
  });

  it("lässt Erwachsenenkurse, Kurse ohne Angaben und eine ausdrückliche Erwachsenen-Zielgruppe nicht als Minderjährigenkurs gelten", () => {
    expect(kursTargetsMinors({ zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" })).toBe(false);
    expect(kursTargetsMinors({ zielgruppe: "erwachsene", kategorie: "schule" })).toBe(false);
    expect(kursTargetsMinors({})).toBe(false);
    expect(kursTargetsMinors(null)).toBe(false);
    expect(kursTargetsMinors("kein objekt")).toBe(false);
    expect(kursTargetsMinors({ klassenstufe: "9" })).toBe(false);
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

describe("kursKategorie", () => {
  it("liest ein gesetztes kategorie-Feld aus den Metadaten", () => {
    expect(kursKategorie({ kategorie: "erwachsenenbildung" })).toBe("erwachsenenbildung");
    expect(kursKategorie({ kategorie: "schule" })).toBe("schule");
  });

  it("fällt auf \"unbekannt\" zurück, wenn das Feld fehlt oder unerwartet ist", () => {
    expect(kursKategorie({})).toBe("unbekannt");
    expect(kursKategorie({ kategorie: "sonstiges" })).toBe("unbekannt");
    expect(kursKategorie(null)).toBe("unbekannt");
    expect(kursKategorie(undefined)).toBe("unbekannt");
  });
});

describe("isEnrollmentExclusive", () => {
  it("ist nur für Erwachsenenbildungskurse exklusiv (F-102)", () => {
    expect(isEnrollmentExclusive("erwachsenenbildung")).toBe(true);
    expect(isEnrollmentExclusive("schule")).toBe(false);
    expect(isEnrollmentExclusive("unbekannt")).toBe(false);
  });
});
