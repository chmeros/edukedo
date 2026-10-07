import { z } from "zod";

/**
 * F-176 (Kursprofil-Mechanismus, Phase 0): Je Kurs steht fest, **welche** Instrumente, Spiele, Übungswerkzeuge,
 * Szenarien und Lernpfade angeboten werden — nur was zum Kurs passt. Grundlage sind die Bestandsbewertungen der
 * Kursprofil-Vorlagen (docs/kursprofile/01–04) und die Matrix docs/kursprofile/05-phase0-matrix.md, freigegeben am
 * 06.10.2026.
 *
 * - `gruppe: "kern"` = Kernangebot des Kurses, `"grundlagen"` = gemeinsamer Teil-1-Stoff (nur bei den
 *   Fachinformatiker-Kursen: bleibt sichtbar, aber in einer eigenen Gruppe).
 * - **Allowlist:** Was nicht aufgeführt ist, wird im Kurs nicht angeboten (kein „noch nicht verfügbar“).
 * - Ein erlaubter Instrumenttyp erscheint erst, wenn der Kurs Inhalt dazu hat (Entscheidung Q-1).
 * - Fehlt einem Kurs die Angabe ganz (z. B. Mathematik), gilt keine Einschränkung (alter Zustand).
 * - Gespeichert wird die Liste je Kurs in `kurs.metadata.angebot` (siehe import-content.ts).
 */
export const KATALOG_INSTRUMENTE = [
  "swot",
  "bsc",
  "ansoff",
  "gantt",
  "eisenhower",
  "pdca",
  "risiko",
  "hierarchie",
  "osi",
  "schutzziele",
  "sql",
  "scrum",
  "uml",
  "teststufen",
  "ermodell",
  "normalisierung",
  "ablauf",
  // Kursprofile Phase 1 (Anwendungsentwicklung)
  "muster",
  "klassenbeziehungen",
  "testverfahren",
  "git",
  // Kursprofile Phase 1 (Daten- und Prozessanalyse)
  "bpmn",
  "analysewerkzeuge",
  "datenqualitaet",
  "skalenniveaus",
  // Kursprofile Phase 1 (Digitale Vernetzung)
  "pyramide",
  "sensoraktor",
  "industrieprotokolle",
  "zonenkonzept",
  // Kursprofile Phase 1 (Systemintegration)
  "sicherungsarten",
  "raid",
  "netzsicherheit",
  "verzeichnisdienst",
  "switching",
  // Kursprofile Phase 1 (AEVO)
  "handlungsfelder",
  "vierstufen",
  "lernzielbereiche",
  "beurteilungsfehler",
  "regelwerke",
  // Kursprofile Phase 1 (Gesundheit/Soziales)
  "donabedian",
  "kostentraeger",
  // Kursprofile Phase 1 (Büro-/Projektorganisation)
  "projektphasen",
  "stakeholder",
  "abc",
  // Kursprofile Phase 1 (Industriefachwirt)
  "pps",
  "beschaffung",
  "seci",
  "ishikawa",
  "kalkulation",
  "incoterms",
  // Kursprofile Phase 1 (Technischer Fachwirt)
  "fertigungsverfahren",
  "instandhaltung",
  "top",
  "ishikawa6m",
  // Kursprofile Phase 1 (Wirtschaftsfachwirt)
  "investition",
  "vierseiten",
  // Kursprofile Phase 1 (Transport/Logistik)
  "verkehrstraeger",
  // Kursprofile Phase 1 (Handelsfachwirt)
  "xyz",
  "handelskalkulation",
  "kraljic",
  // Kursprofile Phase 1 (Immobilienfachwirt)
  "wertermittlung",
  "mieterhoehung",
  "wegorgane",
  "betriebskosten",
  "kostengruppen",
  // Kursprofile Phase 1 (Versicherungen/Finanzanlagen)
  "altersvorsorge",
  "versicherungskennzahlen",
  "risikopolitik",
] as const;

export const KATALOG_WERKZEUGE = ["netzplan", "subnetting", "sqluebung", "terminal", "topologie", "flags", "finanzrechner", "arbeitszeit", "kalkulationstrainer", "unterweisungsplan", "lagerkennzahlen", "sparverfahren", "lernzielcheck", "ausbildungsplan", "testfaelle", "mqttlabor", "skalierung", "energierechner", "verfuegbarkeit", "statistik", "prozesskennzahlen"] as const;

/** Werkzeuge mit auswählbaren Szenarien/Aufgaben (Filter je Kurs). */
export const KATALOG_SZENARIO_WERKZEUGE = ["terminal", "topologie", "flags"] as const;
export type SzenarioWerkzeug = (typeof KATALOG_SZENARIO_WERKZEUGE)[number];

export const kursAngebotGruppeSchema = z.enum(["kern", "grundlagen"]);
export type KursAngebotGruppe = z.infer<typeof kursAngebotGruppeSchema>;

const eintragSchema = z.object({ schluessel: z.string().min(1), gruppe: kursAngebotGruppeSchema });

export const kursAngebotSchema = z.object({
  instrumente: z.array(eintragSchema),
  werkzeuge: z.array(eintragSchema),
  /** Ohne `setKey` gilt der Eintrag für alle Sets des Spieltyps; ein Eintrag mit `setKey` hat Vorrang. */
  spiele: z.array(z.object({ gameType: z.string().min(1), setKey: z.string().min(1).optional(), gruppe: kursAngebotGruppeSchema })),
  /** Instrumenttypen, für die der Kurs einen geführten Lernpfad anbietet. */
  lernpfade: z.array(z.string().min(1)),
  /** Erlaubte Szenarien je Werkzeug; fehlt ein Werkzeug hier, sind alle seine Szenarien erlaubt. */
  szenarien: z
    .object({
      terminal: z.array(eintragSchema),
      topologie: z.array(eintragSchema),
      flags: z.array(eintragSchema),
    })
    .partial(),
});
export type KursAngebot = z.infer<typeof kursAngebotSchema>;

/** Liest ein Angebot aus `kurs.metadata.angebot`; ungültige oder fehlende Angaben ergeben `null` (keine Einschränkung). */
export function parseKursAngebot(raw: unknown): KursAngebot | null {
  const parsed = kursAngebotSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

// ---------------------------------------------------------------------------
// Abfragen (reine Funktionen, Frontend und Tests)
// ---------------------------------------------------------------------------

/** Gruppe des Eintrags, oder `null` = im Kurs nicht angeboten. Ohne Angebot (null) gilt keine Einschränkung. */
function gruppeVon(eintraege: { schluessel: string; gruppe: KursAngebotGruppe }[], schluessel: string): KursAngebotGruppe | null {
  return eintraege.find((eintrag) => eintrag.schluessel === schluessel)?.gruppe ?? null;
}

export function angebotInstrument(angebot: KursAngebot | null | undefined, typ: string): KursAngebotGruppe | null {
  return angebot ? gruppeVon(angebot.instrumente, typ) : "kern";
}

export function angebotWerkzeug(angebot: KursAngebot | null | undefined, schluessel: string): KursAngebotGruppe | null {
  return angebot ? gruppeVon(angebot.werkzeuge, schluessel) : "kern";
}

export function angebotSpiel(angebot: KursAngebot | null | undefined, gameType: string, setKey: string): KursAngebotGruppe | null {
  if (!angebot) return "kern";
  const genau = angebot.spiele.find((eintrag) => eintrag.gameType === gameType && eintrag.setKey === setKey);
  if (genau) return genau.gruppe;
  return angebot.spiele.find((eintrag) => eintrag.gameType === gameType && eintrag.setKey === undefined)?.gruppe ?? null;
}

export function angebotLernpfad(angebot: KursAngebot | null | undefined, typ: string): boolean {
  return angebot ? angebot.lernpfade.includes(typ) : true;
}

/** Filtert die Szenarien eines Werkzeugs auf die erlaubten und hängt die Gruppe an (ohne Einschränkung: alle als „kern“). */
export function angebotSzenarien<T extends { id: string }>(
  angebot: KursAngebot | null | undefined,
  werkzeug: SzenarioWerkzeug,
  alle: readonly T[],
): (T & { gruppe: KursAngebotGruppe })[] {
  const liste = angebot?.szenarien?.[werkzeug];
  if (!liste) return alle.map((eintrag) => ({ ...eintrag, gruppe: "kern" as const }));
  return alle.flatMap((eintrag) => {
    const gruppe = gruppeVon(liste, eintrag.id);
    return gruppe ? [{ ...eintrag, gruppe }] : [];
  });
}

// ---------------------------------------------------------------------------
// Die Allowlist je Kurs (Phase 0, freigegeben 06.10.2026)
// ---------------------------------------------------------------------------

type EintragListe = { schluessel: string; gruppe: KursAngebotGruppe }[];

/** Kürzel: erste Liste = Kernangebot, zweite = Grundlagen. */
function liste(kern: readonly string[], grundlagen: readonly string[] = []): EintragListe {
  return [...kern.map((schluessel) => ({ schluessel, gruppe: "kern" as const })), ...grundlagen.map((schluessel) => ({ schluessel, gruppe: "grundlagen" as const }))];
}

type SpielListe = KursAngebot["spiele"];
function spiele(eintraege: [string, string | null, KursAngebotGruppe][]): SpielListe {
  return eintraege.map(([gameType, setKey, gruppe]) => ({ gameType, ...(setKey ? { setKey } : {}), gruppe }));
}

const WIRTSCHAFT = ["swot", "bsc", "ansoff", "gantt", "eisenhower", "pdca", "risiko", "hierarchie"] as const;
const OHNE = (...entfernt: string[]) => WIRTSCHAFT.filter((typ) => !entfernt.includes(typ));

/** Szenarien der FI-Kurse (Matrix 05, Abschnitt 5; Zuordnung der Kategorien zu IDs bestätigt am 06.10.2026). */
const TERMINAL_LEICHT = ["internet", "dns", "platte-voll", "apipa"];
const TERMINAL_DV = [...TERMINAL_LEICHT, "webseite", "ip-maske", "firewall", "prozess-last", "ssh-angriff", "mehrstufig"];
const TERMINAL_SI = [...TERMINAL_DV, "rechte", "cron-job"];
const TOPOLOGIE_LEICHT = ["ein-netz-ein-switch", "zwei-netze-router", "dhcp-apotheke"];
const TOPOLOGIE_ALLE = [...TOPOLOGIE_LEICHT, "dhcp-pool-konflikt", "filiale-zwei-router", "gastnetz-vlan", "nat-partnernetz", "server-vlan-firewall", "drei-standorte-routing"];

/**
 * F-186 (Freigabe-Mechanismus): Instrumenttypen je Kurs, deren Fragen noch **ungeprüfte Entwürfe** sind (Rahmenentscheidung R3: erst nach
 * fachlicher Prüfung sichtbar). Der Import legt Fragen dieser Typen **inaktiv** an, sodass sie weder im Lernen-Quiz noch im Instrument,
 * in der Vorschau oder in der Fortschrittsberechnung vorkommen. Ein Typ steht entweder hier (Entwurf) oder in `KURS_ANGEBOT` (freigegeben),
 * nie in beiden (Test). **Freigabe:** Typ aus dieser Liste nehmen, in `KURS_ANGEBOT` aufnehmen und `pnpm db:freigeben <kurs> <typ>` ausführen.
 * Die ergänzten Theorieabschnitte und Karteikarten sind davon nicht betroffen und bereits Teil der Themen.
 */
export const KURS_ENTWURF: Record<string, readonly string[]> = {
  "fachinformatiker-systemintegration": ["verzeichnisdienst"],
  "ausbildung-der-ausbilder": ["regelwerke"],
  "fachwirt-gesundheit-soziales": ["kostentraeger"],
  industriefachwirt: ["incoterms"],
  "technischer-fachwirt": ["instandhaltung"],
  immobilienfachwirt: ["mieterhoehung", "wegorgane", "betriebskosten", "kostengruppen"],
  "versicherungen-finanzanlagen": ["altersvorsorge", "risikopolitik"],
};

/** Ist dieser Instrumenttyp im Kurs noch ein ungeprüfter Entwurf (Fragen inaktiv)? */
export function istInstrumentEntwurf(kursSlug: string, typ: string): boolean {
  return (KURS_ENTWURF[kursSlug] ?? []).includes(typ);
}

/**
 * F-193: Kreuzworträtsel (Set "fachbegriffe") und Memory (Set "begriff-paare") der Fachwirt-Kurse und der AEVO sind neue, noch ungeprüfte Inhalte.
 * Bis zur Freigabe stehen sie nicht in der Spieleliste ("standard" ist ein nicht vorhandenes Set); nur der Büro-Kurs behält seine vorhandenen Sets.
 * Freigegeben am 07.10.2026 (nach Entfernen der rechtsnahen Wörter und Paare): Industriefachwirt, Technischer Fachwirt, Handelsfachwirt, Transport/Logistik.
 * Prozess-Reihenfolge (F-195): Set "prozesse" in elf Kursen freigegeben (Abläufe mit genau einer üblichen Reihenfolge, Kalkulationsstufen nach der Kurstheorie).
 * Prozesskennzahlen-Rechner (F-211): Werkzeug "prozesskennzahlen" im Kurs Daten- und Prozessanalyse freigegeben (Durchlaufzeit, Prozesseffizienz, Engpass, Fehlerquote, Auslastung, Little, Amortisation nach 8.1, 8.3 und 8.4; Beispielwerte).
 * Statistik-Trainer (F-210): Werkzeug "statistik" im Kurs Daten- und Prozessanalyse freigegeben (Lage- und Streuungsmaße, Quartile mit festgelegter Methode, Ausreißer, Korrelation und Regression nach 10.1 und 10.2; Zahlen bleiben im Browser).
 * Verfügbarkeits- und RAID-Rechner (F-209): Werkzeug "verfuegbarkeit" in den vier Fachinformatiker-Kursen freigegeben (gemeinsamer Teil 1: Verfügbarkeit nach 3.3, RAID nach 5.3; Beispielwerte). Backup-Rechner und RPO/RTO fehlen bewusst, weil die Theorie sie nicht enthält.
 * Energiebedarf-Rechner (F-208): Werkzeug "energierechner" im Kurs Digitale Vernetzung freigegeben (Leistungsbudget wie PoE, Energie und Energiekosten, Akkulaufzeit; Beispielwerte, Datenblatt und Vertrag maßgeblich).
 * Skalierungs- und Modbus-Register-Rechner (F-207): Werkzeug "skalierung" im Kurs Digitale Vernetzung freigegeben (4–20 mA und 0–10 V, Plausibilität, Umsetzer-Auflösung, Modbus-Register, 32 Bit aus zwei Registern, Adressen ab 0 und ab 1; Beispielwerte, Datenblatt und Registerbeschreibung maßgeblich).
 * MQTT-Labor (F-206): Werkzeug "mqttlabor" im Kurs Digitale Vernetzung freigegeben (Simulation eines Brokers nach MQTT 3.1.1 im Browser; ohne Netzwerkverkehr, TLS und Anmeldung).
 * Testfall-Trainer (F-205): Werkzeug "testfaelle" im Kurs Anwendungsentwicklung freigegeben (Äquivalenzklassen und Grenzwerte nach der Kurstheorie 9.2; reine Rechenübung mit ganzen Zahlen).
 * Ausbildungsplan-Zeitplaner (F-204): Werkzeug "ausbildungsplan" im AEVO-Kurs freigegeben (Zeitleiste, Summenprüfung, sachlich-zeitliche Gliederung; bewusst ohne Rechtswerte, Dauer und Probezeit trägt man ein).
 * Lernziel-Check (F-203): Werkzeug "lernzielcheck" im AEVO-Kurs freigegeben (Wortlisten-Heuristiken zu Feinzielen, Übung zu überprüfbaren Zielen und Lernzielbereichen; kein Rechtsbezug, kein KI-Einsatz).
 * Sparverfahren-Trainer (F-202): Werkzeug "sparverfahren" im Kurs Transport/Logistik freigegeben (Savings-Algorithmus nach der Kurstheorie 2.1; reine Rechenübung ohne Rechtsbezug, Hinweis auf die Heuristik).
 * Lagerkennzahlen-Rechner (F-201): Werkzeug "lagerkennzahlen" im Handelsfachwirt freigegeben (Umschlagshäufigkeit, Reichweite, Meldebestand nach der Kurstheorie 4.1 und 4.3; Andler-Formel und Lagerzinssatz stehen nicht in der Theorie und fehlen bewusst).
 * Unterweisungs-Planer (F-200): Werkzeug "unterweisungsplan" im AEVO-Kurs freigegeben (Vier-Stufen-Methode nach F-192, Lernzielbereiche aus 3.2; Prüfungen sind Selbstkontroll-Heuristiken).
 * Handelskalkulation-Trainer (F-199): Werkzeug "kalkulationstrainer" im Handelsfachwirt freigegeben (Schema und Sätze nach der Kurstheorie 5.3, Beispielwerte).
 * Arbeitszeit-Prüfer (F-198): Werkzeug "arbeitszeit" ist angelegt, steht aber noch in keiner Kursliste (Gesundheit/Soziales und AEVO erst nach der Rechtsprüfung der Grundregeln, Prüfblatt 23).
 * Finanzrechner (F-197): Werkzeug "finanzrechner" in Industrie-, Technischem, Wirtschafts-, Handels-, Immobilien- und Versicherungskurs freigegeben (reine Rechenverfahren, Beispielwerte, Hinweis "keine Beratung").
 * Beleg-Detektiv (F-196): Set "belege" (Wareneingang, Rechnungsprüfung) in fünf Kursen, Phishing-Set "fracht-betrug" in Transport/Logistik, beide freigegeben (frei erfundene Fälle ohne Rechtsaussagen).
 * Rechen-Sprint (F-194): Die Sets "rechnen" (Kalkulation) und "it-rechnen" sind freigegeben; das Set "kennzahlen" (Lager, OEE) steht bewusst nicht in den Listen, bis die Rechenkonventionen (360 Tage, Andler-Annahmen, OEE) fachlich geprüft sind.
 * Freigabe: je Kurs `["kreuzwortraetsel", "fachbegriffe", "kern"]` und `["memory", "begriff-paare", "kern"]` an die Stelle des Platzhalters setzen.
 */
export const KURS_ANGEBOT: Record<string, KursAngebot> = {
  // ---- Fachinformatiker ----
  "fachinformatiker-anwendungsentwicklung": {
    instrumente: liste(["gantt", "hierarchie", "schutzziele", "sql", "scrum", "uml", "teststufen", "ermodell", "normalisierung", "ablauf", "git", "muster", "klassenbeziehungen", "testverfahren"], ["pdca", "risiko", "osi"]),
    werkzeuge: liste(["sqluebung", "testfaelle", "verfuegbarkeit"], ["netzplan", "subnetting", "terminal", "topologie", "flags"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "grundlagen"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["kennzahlen_duell", "sql", "kern"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "grundlagen"],
      ["phishing", null, "grundlagen"],
      ["bughunt", "standard", "kern"],
      ["bughunt", "schleifen", "kern"],
      ["bughunt", "objektorientierung", "kern"],
      ["bughunt", "sql-fehler", "kern"],
      ["codereihenfolge", null, "kern"],
      ["subnetting", null, "grundlagen"],
      ["zahlensysteme", null, "grundlagen"],
      ["rechensprint", "it-rechnen", "grundlagen"],
      ["prozessreihenfolge", "prozesse", "kern"],
    ]),
    lernpfade: ["scrum", "schutzziele", "normalisierung", "ermodell", "osi"],
    szenarien: {
      terminal: liste([], TERMINAL_LEICHT),
      topologie: liste([], TOPOLOGIE_LEICHT),
      flags: liste([], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-pruefsumme-spiegel", "flag-passwort-hashes", "flag-phishing-header", "flag-jwt-token", "flag-weblog-pfad", "flag-mehrstufig-funkspruch"]),
    },
  },
  "fachinformatiker-daten-prozessanalyse": {
    instrumente: liste(["gantt", "pdca", "schutzziele", "sql", "ermodell", "normalisierung", "bpmn", "analysewerkzeuge", "datenqualitaet", "skalenniveaus"], ["risiko", "hierarchie", "osi", "scrum"]),
    werkzeuge: liste(["sqluebung", "verfuegbarkeit", "statistik", "prozesskennzahlen"], ["netzplan", "subnetting", "terminal", "topologie", "flags"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "grundlagen"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["kennzahlen_duell", "sql", "kern"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "grundlagen"],
      ["phishing", null, "grundlagen"],
      ["subnetting", null, "grundlagen"],
      ["zahlensysteme", null, "grundlagen"],
      ["rechensprint", "it-rechnen", "grundlagen"],
      ["prozessreihenfolge", "prozesse", "kern"],
    ]),
    lernpfade: ["scrum", "osi", "schutzziele", "normalisierung", "ermodell"],
    szenarien: {
      terminal: liste([], TERMINAL_LEICHT),
      topologie: liste([], TOPOLOGIE_LEICHT),
      flags: liste([], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-pruefsumme-spiegel", "flag-passwort-hashes", "flag-phishing-header", "flag-mehrstufig-funkspruch"]),
    },
  },
  "fachinformatiker-digitale-vernetzung": {
    instrumente: liste(["gantt", "risiko", "osi", "schutzziele", "teststufen", "pyramide", "sensoraktor", "industrieprotokolle", "zonenkonzept"], ["pdca", "hierarchie", "scrum"]),
    werkzeuge: liste(["subnetting", "terminal", "topologie", "flags", "mqttlabor", "skalierung", "energierechner", "verfuegbarkeit"], ["netzplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "kern"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "kern"],
      ["phishing", null, "grundlagen"],
      // Neues Set (industrie-iot) erst nach der Freigabe des Prüfblatts 08 aufnehmen.
      ["troubleshooting", "standard", "kern"],
      ["subnetting", null, "kern"],
      ["zahlensysteme", null, "kern"],
      ["rechensprint", "it-rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
    ]),
    lernpfade: ["scrum", "osi", "schutzziele"],
    szenarien: {
      terminal: liste(TERMINAL_DV),
      topologie: liste(TOPOLOGIE_ALLE),
      flags: liste(["flag-basic-auth", "flag-offene-ports", "flag-log-bruteforce", "flag-dns-tunnel"]),
    },
  },
  "fachinformatiker-systemintegration": {
    instrumente: liste(["gantt", "risiko", "osi", "schutzziele", "teststufen", "sicherungsarten", "switching", "raid", "netzsicherheit"], ["pdca", "hierarchie", "scrum"]),
    werkzeuge: liste(["subnetting", "terminal", "topologie", "flags", "verfuegbarkeit"], ["netzplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "kern"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "kern"],
      ["phishing", null, "grundlagen"],
      // Neue Troubleshooting-Sets (serverdienste, switching-routing) erst nach der Freigabe des Prüfblatts 09 aufnehmen.
      ["troubleshooting", "standard", "kern"],
      ["bughunt", "skripte-konfiguration", "kern"],
      ["subnetting", null, "kern"],
      ["zahlensysteme", null, "kern"],
      ["rechensprint", "it-rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
    ]),
    lernpfade: ["scrum", "osi", "schutzziele"],
    szenarien: {
      terminal: liste(TERMINAL_SI),
      topologie: liste(TOPOLOGIE_ALLE),
      flags: liste(["flag-offene-ports", "flag-log-bruteforce", "flag-sshd-reihenfolge", "flag-dns-tunnel"], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-mehrstufig-funkspruch"]),
    },
  },

  // ---- Fachwirte und weitere Kurse (nur Passendes; IT-Inhalte entfallen) ----
  // Beschaffung und SECI (Welle 1) sowie PPS, Ishikawa, Zuschlagskalkulation und das Duell "kosten-leistungen" (Welle 2) sind freigegeben.
  // Incoterms (ICC-Regelwerk) erst nach der Freigabe des Prüfblatts 13 aufnehmen.
  industriefachwirt: {
    instrumente: liste([...OHNE(), "beschaffung", "seci", "pps", "ishikawa", "kalkulation"]),
    werkzeuge: liste(["finanzrechner"]),
    spiele: spiele([
      ["kreuzwortraetsel", "fachbegriffe", "kern"],
      ["kennzahlen_duell", "kosten-leistungen", "kern"],
      ["memory", "begriff-paare", "kern"],
      ["rechensprint", "rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["belegdetektiv", "belege", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Fertigungsverfahren, TOP-Prinzip, Ishikawa 6M, Zuschlagskalkulation und das Duell "technische-unterscheidungen" sind freigegeben (Welle 2).
  // Instandhaltung nach DIN 31051 (Normbegriffe) erst nach der Freigabe des Prüfblatts 14 aufnehmen.
  "technischer-fachwirt": {
    instrumente: liste([...OHNE(), "fertigungsverfahren", "top", "ishikawa6m", "kalkulation"]),
    werkzeuge: liste(["finanzrechner"]),
    spiele: spiele([
      ["kreuzwortraetsel", "fachbegriffe", "kern"],
      ["kennzahlen_duell", "technische-unterscheidungen", "kern"],
      ["memory", "begriff-paare", "kern"],
      ["rechensprint", "rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["belegdetektiv", "belege", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Investitionsrechenverfahren, Vier-Seiten-Modell und das Duell "finanzierung-controlling" sind freigegeben (Welle 2b, 06.10.2026).
  wirtschaftsfachwirt: {
    instrumente: liste([...OHNE("gantt"), "investition", "vierseiten"]),
    werkzeuge: liste(["finanzrechner"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "kern"],
      ["kennzahlen_duell", "finanzierung-controlling", "kern"],
      ["memory", "standard", "kern"],
      ["rechensprint", "rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["belegdetektiv", "belege", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Verkehrsträger und ABC-Analyse sind freigegeben (Welle 2b, 06.10.2026). Das Duell-Set "spedition-fracht" (Fracht- und Zollrecht) erst nach der
  // Rechtsprüfung des Prüfblatts 16 aufnehmen; das Begriffe-Duell ist bis dahin auf das nicht vorhandene Set "standard" begrenzt.
  "transport-management-logistics": {
    instrumente: liste([...OHNE("bsc", "gantt"), "verkehrstraeger", "abc"]),
    werkzeuge: liste(["sparverfahren"]),
    spiele: spiele([
      ["kreuzwortraetsel", "fachbegriffe", "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", "begriff-paare", "kern"],
      ["rechensprint", "rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["phishing", "fracht-betrug", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // ABC-Analyse, XYZ-Analyse, Handelskalkulation und Kraljic-Matrix sind freigegeben (Welle 2b, 06.10.2026), ebenso das Duell-Set "handel-aehnlich"
  // (Nutzer-Entscheidung vom 06.10.2026: die drei Fragen mit Außenhandelsrecht wurden durch Fragen ohne Rechtsbezug ersetzt).
  handelsfachwirt: {
    instrumente: liste([...OHNE(), "abc", "xyz", "handelskalkulation", "kraljic"]),
    werkzeuge: liste(["finanzrechner", "kalkulationstrainer", "lagerkennzahlen"]),
    spiele: spiele([
      ["kreuzwortraetsel", "fachbegriffe", "kern"],
      ["kennzahlen_duell", "handel-aehnlich", "kern"],
      ["memory", "begriff-paare", "kern"],
      ["rechensprint", "rechnen", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["belegdetektiv", "belege", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Das Wertermittlungsverfahren ist freigegeben (Welle 2b, 06.10.2026). Wege der Mieterhöhung, WEG-Organe, Betriebskosten, DIN-276-Kostengruppen und das
  // Duell-Set "immobilien-aehnlich" erst nach der Rechtsprüfung des Prüfblatts 18 aufnehmen; das Begriffe-Duell ist bis dahin auf das nicht vorhandene Set
  // "standard" begrenzt.
  immobilienfachwirt: {
    instrumente: liste([...OHNE(), "wertermittlung"]),
    werkzeuge: liste(["netzplan", "finanzrechner"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", "standard", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Die Kennzahlen der Versicherungstechnik sind freigegeben (Welle 2b, 06.10.2026). Das Drei-Schichten-Modell der Altersvorsorge und das Duell-Set
  // "versicherung-aehnlich" erst nach der Rechtsprüfung des Prüfblatts 19 aufnehmen; das Begriffe-Duell ist bis dahin auf das nicht vorhandene Set
  // "standard" begrenzt.
  "versicherungen-finanzanlagen": {
    instrumente: liste([...OHNE(), "versicherungskennzahlen"]),
    werkzeuge: liste(["netzplan", "finanzrechner"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", "standard", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Projektphasen, Stakeholder-Matrix, ABC-Analyse und das Duell-Set "projektmanagement" sind freigegeben (Welle 2).
  "fachwirt-buero-projektorganisation": {
    instrumente: liste([...OHNE(), "projektphasen", "stakeholder", "abc"]),
    werkzeuge: liste(["netzplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", null, "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["kennzahlen_duell", "projektmanagement", "kern"],
      ["memory", null, "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
      ["belegdetektiv", "belege", "kern"],
    ]),
    lernpfade: ["bsc"],
    szenarien: {},
  },
  // PDCA und Donabedian sind freigegeben (Welle 1, 06.10.2026). Kostenträger und das Duell-Set "gesundheit-sozialsystem" erst nach der fachlichen
  // und rechtlichen Freigabe des Prüfblatts 11 aufnehmen; das Duell bleibt bis dahin auf das nicht vorhandene Set "standard" begrenzt.
  "fachwirt-gesundheit-soziales": {
    instrumente: liste([...OHNE(), "donabedian"]),
    werkzeuge: [],
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", "standard", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Handlungsfelder und Lernzielbereiche (Welle 1), Beurteilungsfehler (Welle 2) und die Vier-Stufen-Methode (in der üblichen Fassung, freigegeben am
  // 06.10.2026) sind freigegeben. Regelwerke und das Duell-Set "recht-berufsausbildung" erst nach der Freigabe des Prüfblatts 10 aufnehmen (Rechtsfragen).
  "ausbildung-der-ausbilder": {
    instrumente: liste(["handlungsfelder", "lernzielbereiche", "beurteilungsfehler", "vierstufen"]),
    werkzeuge: liste(["unterweisungsplan", "lernzielcheck", "ausbildungsplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", "standard", "kern"],
      ["prozessreihenfolge", "prozesse", "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
};

