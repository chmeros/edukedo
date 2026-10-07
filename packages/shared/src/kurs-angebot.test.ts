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
import { SQL_ALLE_UEBUNGEN } from "./sql-datenqualitaet";
import { TERMINAL_SZENARIEN } from "./terminal-sim";
import { topologieSzenarien } from "./topologie-sim";

const SLUGS = Object.keys(KURS_ANGEBOT);
const ALLE_IDS = {
  terminal: TERMINAL_SZENARIEN.map((s) => s.id),
  topologie: topologieSzenarien.map((s) => s.id),
  flags: FLAG_AUFGABEN.map((a) => a.id),
  sql: SQL_ALLE_UEBUNGEN.map((u) => u.id),
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
    for (const werkzeug of Object.keys(angebot.szenarien)) expect(angebotWerkzeug(angebot, werkzeug === "sql" ? "sqluebung" : werkzeug)).not.toBeNull();
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

  it("Arbeitszeit-Prüfer (F-198): in keinem Kurs freigegeben (Rechtsprüfung)", () => {
    for (const slug of Object.keys(KURS_ANGEBOT)) expect(angebotWerkzeug(KURS_ANGEBOT[slug], "arbeitszeit"), slug).toBeNull();
  });

  it("Handelskalkulation-Trainer (F-199): Werkzeug nur im Handelsfachwirt", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT.handelsfachwirt, "kalkulationstrainer")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "handelsfachwirt")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "kalkulationstrainer"), slug).toBeNull();
    }
  });

  it("Nutzwert- und Wirtschaftlichkeitsrechner (F-213): Kernangebot in allen vier Fachinformatiker-Kursen, sonst nirgends", () => {
    for (const slug of Object.keys(KURS_ANGEBOT)) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "wirtschaftlichkeit"), slug).toBe(slug.startsWith("fachinformatiker-") ? "kern" : null);
    }
  });

  it("Datenqualitäts-Aufgaben (F-214): nur der Kurs Daten- und Prozessanalyse bekommt die Aufgaben auf den Importdaten", () => {
    const importIds = SQL_ALLE_UEBUNGEN.filter((u) => u.datensatz === "import").map((u) => u.id);
    expect(importIds.length).toBeGreaterThan(10);
    const sql = (slug: string) => (KURS_ANGEBOT[slug]!.szenarien.sql ?? []).map((e) => e.schluessel);
    for (const id of importIds) {
      expect(sql("fachinformatiker-daten-prozessanalyse")).toContain(id);
      expect(sql("fachinformatiker-anwendungsentwicklung")).not.toContain(id);
    }
    // Die Projektdaten-Aufgaben bleiben in beiden Kursen vollständig.
    for (const u of SQL_ALLE_UEBUNGEN.filter((x) => x.datensatz !== "import")) {
      expect(sql("fachinformatiker-daten-prozessanalyse")).toContain(u.id);
      expect(sql("fachinformatiker-anwendungsentwicklung")).toContain(u.id);
    }
  });

  it("Netzwerk-Szenarien für Systemintegration (F-218): nur im Kurs Systemintegration", () => {
    const ids = ["inter-vlan-verwaltung", "standortverbund-vpn", "dmz-webserver", "redundante-anbindung"];
    for (const slug of Object.keys(KURS_ANGEBOT)) {
      const liste = (KURS_ANGEBOT[slug]!.szenarien.topologie ?? []).map((e) => e.schluessel);
      for (const id of ids) expect(liste.includes(id), `${slug} ${id}`).toBe(slug === "fachinformatiker-systemintegration");
    }
  });

  it("Industrienetz-Szenarien (F-217): nur im Kurs Digitale Vernetzung", () => {
    const ids = ["produktionszelle-vlan", "feldnetz-gateway", "buero-produktion-firewall", "wartung-ueber-dmz"];
    for (const slug of Object.keys(KURS_ANGEBOT)) {
      const liste = (KURS_ANGEBOT[slug]!.szenarien.topologie ?? []).map((e) => e.schluessel);
      for (const id of ids) expect(liste.includes(id), `${slug} ${id}`).toBe(slug === "fachinformatiker-digitale-vernetzung");
    }
  });

  it("Algorithmen-Visualisierer (F-215): Kernangebot in der Anwendungsentwicklung, Grundlage in den übrigen Fachinformatiker-Kursen", () => {
    for (const slug of Object.keys(KURS_ANGEBOT)) {
      const erwartet = slug === "fachinformatiker-anwendungsentwicklung" ? "kern" : slug.startsWith("fachinformatiker-") ? "grundlagen" : null;
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "algorithmen"), slug).toBe(erwartet);
    }
  });

  it("Schreibtischtest-Trainer (F-212): Kernangebot in der Anwendungsentwicklung, Grundlage in den übrigen Fachinformatiker-Kursen", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-anwendungsentwicklung"], "schreibtischtest")).toBe("kern");
    for (const slug of ["fachinformatiker-daten-prozessanalyse", "fachinformatiker-digitale-vernetzung", "fachinformatiker-systemintegration"]) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "schreibtischtest"), slug).toBe("grundlagen");
    }
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => !eintrag.startsWith("fachinformatiker-"))) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "schreibtischtest"), slug).toBeNull();
    }
  });

  it("Prozesskennzahlen-Rechner (F-211): Werkzeug nur im Kurs Daten- und Prozessanalyse", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-daten-prozessanalyse"], "prozesskennzahlen")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-daten-prozessanalyse")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "prozesskennzahlen"), slug).toBeNull();
    }
  });

  it("Statistik-Trainer (F-210): Werkzeug nur im Kurs Daten- und Prozessanalyse", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-daten-prozessanalyse"], "statistik")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-daten-prozessanalyse")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "statistik"), slug).toBeNull();
    }
  });

  it("Verfügbarkeits- und RAID-Rechner (F-209): Werkzeug in den vier Fachinformatiker-Kursen", () => {
    const fi = ["fachinformatiker-anwendungsentwicklung", "fachinformatiker-daten-prozessanalyse", "fachinformatiker-digitale-vernetzung", "fachinformatiker-systemintegration"];
    for (const slug of fi) expect(angebotWerkzeug(KURS_ANGEBOT[slug], "verfuegbarkeit"), slug).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => !fi.includes(eintrag))) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "verfuegbarkeit"), slug).toBeNull();
    }
  });

  it("Energiebedarf-Rechner (F-208): Werkzeug nur im Kurs Digitale Vernetzung", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-digitale-vernetzung"], "energierechner")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-digitale-vernetzung")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "energierechner"), slug).toBeNull();
    }
  });

  it("Skalierungs- und Modbus-Register-Rechner (F-207): Werkzeug nur im Kurs Digitale Vernetzung", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-digitale-vernetzung"], "skalierung")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-digitale-vernetzung")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "skalierung"), slug).toBeNull();
    }
  });

  it("MQTT-Labor (F-206): Werkzeug nur im Kurs Digitale Vernetzung", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-digitale-vernetzung"], "mqttlabor")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-digitale-vernetzung")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "mqttlabor"), slug).toBeNull();
    }
  });

  it("Testfall-Trainer (F-205): Werkzeug nur im Kurs Anwendungsentwicklung", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["fachinformatiker-anwendungsentwicklung"], "testfaelle")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "fachinformatiker-anwendungsentwicklung")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "testfaelle"), slug).toBeNull();
    }
  });

  it("Ausbildungsplan-Zeitplaner (F-204): Werkzeug nur im AEVO-Kurs", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["ausbildung-der-ausbilder"], "ausbildungsplan")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "ausbildung-der-ausbilder")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "ausbildungsplan"), slug).toBeNull();
    }
  });

  it("Lernziel-Check (F-203): Werkzeug nur im AEVO-Kurs", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["ausbildung-der-ausbilder"], "lernzielcheck")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "ausbildung-der-ausbilder")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "lernzielcheck"), slug).toBeNull();
    }
  });

  it("Sparverfahren-Trainer (F-202): Werkzeug nur im Kurs Transport/Logistik", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["transport-management-logistics"], "sparverfahren")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "transport-management-logistics")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "sparverfahren"), slug).toBeNull();
    }
  });

  it("Lagerkennzahlen-Rechner (F-201): Werkzeug nur im Handelsfachwirt", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT.handelsfachwirt, "lagerkennzahlen")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "handelsfachwirt")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "lagerkennzahlen"), slug).toBeNull();
    }
  });

  it("Unterweisungs-Planer (F-200): Werkzeug nur im AEVO-Kurs", () => {
    expect(angebotWerkzeug(KURS_ANGEBOT["ausbildung-der-ausbilder"], "unterweisungsplan")).toBe("kern");
    for (const slug of Object.keys(KURS_ANGEBOT).filter((eintrag) => eintrag !== "ausbildung-der-ausbilder")) {
      expect(angebotWerkzeug(KURS_ANGEBOT[slug], "unterweisungsplan"), slug).toBeNull();
    }
  });

  it("istInstrumentEntwurf erkennt Entwürfe", () => {
    expect(istInstrumentEntwurf("fachinformatiker-systemintegration", "verzeichnisdienst")).toBe(true);
    expect(istInstrumentEntwurf("fachinformatiker-anwendungsentwicklung", "sql")).toBe(false);
    expect(istInstrumentEntwurf("mathematik-9", "git")).toBe(false);
  });
});
