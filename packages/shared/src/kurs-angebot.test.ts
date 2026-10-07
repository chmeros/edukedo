import { describe, expect, it } from "vitest";
import { FLAG_AUFGABEN } from "./flag-raetsel";
import {
  KATALOG_INSTRUMENTE,
  KATALOG_WERKZEUGE,
  KURS_ANGEBOT,
  KURS_ENTWURF,
  istInstrumentEntwurf,
  angebotInstrument,
  angebotLernpfad,
  angebotSpiel,
  angebotSzenarien,
  angebotWerkzeug,
  kursAngebotSchema,
  parseKursAngebot,
} from "./kurs-angebot";
import { GAME_TYPES } from "./schemas/game";
import { TERMINAL_SZENARIEN } from "./terminal-sim";
import { topologieSzenarien } from "./topologie-sim";

const SLUGS = Object.keys(KURS_ANGEBOT);
const ALLE_IDS = {
  terminal: TERMINAL_SZENARIEN.map((s) => s.id),
  topologie: topologieSzenarien.map((s) => s.id),
  flags: FLAG_AUFGABEN.map((a) => a.id),
} as const;

describe("KURS_ANGEBOT (Kursprofil-Allowlist)", () => {
  it("deckt alle 14 Kurse außer Mathematik ab", () => {
    expect(SLUGS).toHaveLength(14);
    expect(SLUGS).not.toContain("mathematik-9");
  });

  it.each(SLUGS)("%s: ist schema-gültig und verweist nur auf bekannte Schlüssel", (slug) => {
    const angebot = KURS_ANGEBOT[slug]!;
    expect(kursAngebotSchema.safeParse(angebot).success).toBe(true);
    for (const e of angebot.instrumente) expect(KATALOG_INSTRUMENTE as readonly string[]).toContain(e.schluessel);
    for (const e of angebot.werkzeuge) expect(KATALOG_WERKZEUGE as readonly string[]).toContain(e.schluessel);
    for (const s of angebot.spiele) expect(GAME_TYPES as readonly string[]).toContain(s.gameType);
    for (const typ of angebot.lernpfade) expect(KATALOG_INSTRUMENTE as readonly string[]).toContain(typ);
    for (const [werkzeug, eintraege] of Object.entries(angebot.szenarien)) {
      for (const e of eintraege ?? []) expect(ALLE_IDS[werkzeug as keyof typeof ALLE_IDS]).toContain(e.schluessel);
    }
  });

  it.each(SLUGS)("%s: Eintrag nur einmal je Schlüssel, Lernpfade nur für angebotene Instrumente", (slug) => {
    const angebot = KURS_ANGEBOT[slug]!;
    const eindeutig = (liste: string[]) => expect(new Set(liste).size).toBe(liste.length);
    eindeutig(angebot.instrumente.map((e) => e.schluessel));
    eindeutig(angebot.werkzeuge.map((e) => e.schluessel));
    eindeutig(angebot.spiele.map((s) => `${s.gameType}/${s.setKey ?? "*"}`));
    for (const typ of angebot.lernpfade) expect(angebotInstrument(angebot, typ)).not.toBeNull();
    // Szenarien nur für angebotene Werkzeuge
    for (const werkzeug of Object.keys(angebot.szenarien)) expect(angebotWerkzeug(angebot, werkzeug)).not.toBeNull();
  });

  it("Fachwirt-Kurse zeigen keine IT-Instrumente, -Werkzeuge und -Spiele", () => {
    for (const slug of SLUGS.filter((s) => !s.startsWith("fachinformatiker-"))) {
      const angebot = KURS_ANGEBOT[slug]!;
      for (const typ of ["sql", "scrum", "uml", "teststufen", "ermodell", "normalisierung", "ablauf", "osi", "schutzziele"]) {
        expect(angebotInstrument(angebot, typ), `${slug}/${typ}`).toBeNull();
      }
      for (const werkzeug of ["subnetting", "sqluebung", "terminal", "topologie", "flags"]) expect(angebotWerkzeug(angebot, werkzeug), `${slug}/${werkzeug}`).toBeNull();
      for (const gameType of ["phishing", "bughunt", "codereihenfolge", "troubleshooting", "subnetting", "zahlensysteme"]) {
        expect(angebotSpiel(angebot, gameType, "standard"), `${slug}/${gameType}`).toBeNull();
      }
    }
  });

  it("Fachinformatiker blenden Wirtschaftsinstrumente ohne IT-Bezug aus", () => {
    for (const slug of SLUGS.filter((s) => s.startsWith("fachinformatiker-"))) {
      for (const typ of ["swot", "bsc", "ansoff"]) expect(angebotInstrument(KURS_ANGEBOT[slug], typ), `${slug}/${typ}`).toBeNull();
    }
  });

  it("Blaupause Anwendungsentwicklung: Kern- und Grundlagen-Gruppen", () => {
    const ae = KURS_ANGEBOT["fachinformatiker-anwendungsentwicklung"];
    expect(angebotInstrument(ae, "uml")).toBe("kern");
    expect(angebotInstrument(ae, "osi")).toBe("grundlagen");
    expect(angebotWerkzeug(ae, "sqluebung")).toBe("kern");
    expect(angebotWerkzeug(ae, "terminal")).toBe("grundlagen");
    expect(angebotSpiel(ae, "kennzahlen_duell", "sql")).toBe("kern");
    expect(angebotSpiel(ae, "kennzahlen_duell", "standard")).toBe("grundlagen");
    expect(angebotSpiel(ae, "troubleshooting", "standard")).toBeNull();
  });

  it("Spiel-Eintrag mit Set hat Vorrang vor dem Eintrag für den ganzen Typ", () => {
    const angebot = parseKursAngebot({
      instrumente: [],
      werkzeuge: [],
      spiele: [
        { gameType: "memory", gruppe: "grundlagen" },
        { gameType: "memory", setKey: "ports", gruppe: "kern" },
      ],
      lernpfade: [],
      szenarien: {},
    });
    expect(angebotSpiel(angebot, "memory", "ports")).toBe("kern");
    expect(angebotSpiel(angebot, "memory", "standard")).toBe("grundlagen");
    expect(angebotSpiel(angebot, "phishing", "standard")).toBeNull();
  });
});

describe("ohne Angebot (z. B. Mathematik) gilt keine Einschränkung", () => {
  it("liefert überall „kern“", () => {
    expect(angebotInstrument(null, "sql")).toBe("kern");
    expect(angebotWerkzeug(undefined, "terminal")).toBe("kern");
    expect(angebotSpiel(null, "memory", "x")).toBe("kern");
    expect(angebotLernpfad(null, "scrum")).toBe(true);
    expect(angebotSzenarien(null, "terminal", [{ id: "a" }])).toEqual([{ id: "a", gruppe: "kern" }]);
  });

  it("parseKursAngebot gibt bei ungültigen Daten null zurück", () => {
    expect(parseKursAngebot(undefined)).toBeNull();
    expect(parseKursAngebot({ instrumente: "x" })).toBeNull();
  });
});

describe("angebotSzenarien", () => {
  it("filtert auf erlaubte Szenarien und hängt die Gruppe an", () => {
    const angebot = KURS_ANGEBOT["fachinformatiker-anwendungsentwicklung"];
    const liste = angebotSzenarien(angebot, "terminal", TERMINAL_SZENARIEN);
    expect(liste.map((s) => s.id)).toEqual(["internet", "dns", "platte-voll", "apipa"].filter((id) => TERMINAL_SZENARIEN.some((s) => s.id === id)).sort((a, b) => TERMINAL_SZENARIEN.findIndex((s) => s.id === a) - TERMINAL_SZENARIEN.findIndex((s) => s.id === b)));
    expect(liste.every((s) => s.gruppe === "grundlagen")).toBe(true);
  });

  it("ein Werkzeug ohne Szenario-Liste behält alle Szenarien", () => {
    const angebot = parseKursAngebot({ instrumente: [], werkzeuge: [], spiele: [], lernpfade: [], szenarien: {} });
    expect(angebotSzenarien(angebot, "flags", FLAG_AUFGABEN)).toHaveLength(FLAG_AUFGABEN.length);
  });

  it("Systemintegration bietet alle zwölf Terminal-Szenarien im Kern", () => {
    const liste = angebotSzenarien(KURS_ANGEBOT["fachinformatiker-systemintegration"], "terminal", TERMINAL_SZENARIEN);
    expect(liste).toHaveLength(TERMINAL_SZENARIEN.length);
    expect(liste.every((s) => s.gruppe === "kern")).toBe(true);
  });
});

describe("KURS_ENTWURF (ungeprüfte Instrumente, F-186)", () => {
  it("verweist nur auf bekannte Kurse und Instrumenttypen", () => {
    for (const [slug, typen] of Object.entries(KURS_ENTWURF)) {
      expect(Object.keys(KURS_ANGEBOT), slug).toContain(slug);
      for (const typ of typen) expect(KATALOG_INSTRUMENTE as readonly string[], `${slug}/${typ}`).toContain(typ);
    }
  });

  it("ein Typ steht entweder im Entwurf oder im Kursangebot, nie in beiden", () => {
    for (const [slug, typen] of Object.entries(KURS_ENTWURF)) {
      for (const typ of typen) expect(angebotInstrument(KURS_ANGEBOT[slug], typ), `${slug}/${typ}`).toBeNull();
    }
  });

  it("Rechen-Sprint (F-194): Kalkulation für die fünf Fachwirte, IT-Rechnen für die Fachinformatiker, Betriebskennzahlen noch gesperrt", () => {
    for (const slug of ["industriefachwirt", "technischer-fachwirt", "wirtschaftsfachwirt", "transport-management-logistics", "handelsfachwirt"]) {
      const angebot = KURS_ANGEBOT[slug];
      expect(angebotSpiel(angebot, "rechensprint", "rechnen"), slug).toBe("kern");
      expect(angebotSpiel(angebot, "rechensprint", "kennzahlen"), slug).toBeNull();
      expect(angebotSpiel(angebot, "rechensprint", "it-rechnen"), slug).toBeNull();
    }
    expect(angebotSpiel(KURS_ANGEBOT["fachinformatiker-anwendungsentwicklung"], "rechensprint", "it-rechnen")).toBe("grundlagen");
    expect(angebotSpiel(KURS_ANGEBOT["fachinformatiker-systemintegration"], "rechensprint", "it-rechnen")).toBe("kern");
    for (const slug of ["immobilienfachwirt", "versicherungen-finanzanlagen", "ausbildung-der-ausbilder", "fachwirt-gesundheit-soziales", "fachwirt-buero-projektorganisation"]) {
      for (const setKey of ["rechnen", "kennzahlen", "it-rechnen"]) expect(angebotSpiel(KURS_ANGEBOT[slug], "rechensprint", setKey), `${slug}/${setKey}`).toBeNull();
    }
  });

  it("Prozess-Reihenfolge (F-195): Set prozesse in elf Kursen, nicht in Gesundheit/Soziales, Immobilien und Versicherung", () => {
    for (const slug of [
      "fachinformatiker-anwendungsentwicklung",
      "fachinformatiker-daten-prozessanalyse",
      "fachinformatiker-digitale-vernetzung",
      "fachinformatiker-systemintegration",
      "industriefachwirt",
      "technischer-fachwirt",
      "wirtschaftsfachwirt",
      "transport-management-logistics",
      "handelsfachwirt",
      "fachwirt-buero-projektorganisation",
      "ausbildung-der-ausbilder",
    ]) {
      expect(angebotSpiel(KURS_ANGEBOT[slug], "prozessreihenfolge", "prozesse"), slug).toBe("kern");
      expect(angebotSpiel(KURS_ANGEBOT[slug], "prozessreihenfolge", "standard"), slug).toBeNull();
    }
    for (const slug of ["fachwirt-gesundheit-soziales", "immobilienfachwirt", "versicherungen-finanzanlagen"]) {
      expect(angebotSpiel(KURS_ANGEBOT[slug], "prozessreihenfolge", "prozesse"), slug).toBeNull();
    }
  });

  it("Beleg-Detektiv und Betrugs-Detektiv (F-196): Sets nur in den vorgesehenen Kursen", () => {
    for (const slug of ["industriefachwirt", "technischer-fachwirt", "wirtschaftsfachwirt", "handelsfachwirt", "fachwirt-buero-projektorganisation"]) {
      expect(angebotSpiel(KURS_ANGEBOT[slug], "belegdetektiv", "belege"), slug).toBe("kern");
      expect(angebotSpiel(KURS_ANGEBOT[slug], "phishing", "fracht-betrug"), slug).toBeNull();
    }
    expect(angebotSpiel(KURS_ANGEBOT["transport-management-logistics"], "phishing", "fracht-betrug")).toBe("kern");
    expect(angebotSpiel(KURS_ANGEBOT["transport-management-logistics"], "belegdetektiv", "belege")).toBeNull();
    for (const slug of ["immobilienfachwirt", "versicherungen-finanzanlagen", "fachwirt-gesundheit-soziales", "ausbildung-der-ausbilder"]) {
      expect(angebotSpiel(KURS_ANGEBOT[slug], "belegdetektiv", "belege"), slug).toBeNull();
    }
  });

  it("Finanzrechner (F-197): Werkzeug nur in den sechs Kursen mit Finanzrechnung", () => {
    for (const slug of ["industriefachwirt", "technischer-fachwirt", "wirtschaftsfachwirt", "handelsfachwirt", "immobilienfachwirt", "versicherungen-finanzanlagen"]) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "finanzrechner"), slug).toBe("kern");
    }
    for (const slug of ["fachinformatiker-anwendungsentwicklung", "fachinformatiker-systemintegration", "ausbildung-der-ausbilder", "fachwirt-gesundheit-soziales", "transport-management-logistics"]) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "finanzrechner"), slug).toBeNull();
    }
  });

  it("istInstrumentEntwurf erkennt Entwürfe", () => {
    expect(istInstrumentEntwurf("fachinformatiker-systemintegration", "verzeichnisdienst")).toBe(true);
    expect(istInstrumentEntwurf("fachinformatiker-anwendungsentwicklung", "sql")).toBe(false);
    expect(istInstrumentEntwurf("mathematik-9", "git")).toBe(false);
  });
});
