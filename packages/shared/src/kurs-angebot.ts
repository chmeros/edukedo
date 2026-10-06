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
] as const;

export const KATALOG_WERKZEUGE = ["netzplan", "subnetting", "sqluebung", "terminal", "topologie", "flags"] as const;

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
/** Die drei Spieltypen mit Content in den Fachwirt-Kursen (Sets entstehen kursweise; ohne Set erscheint nichts). */
const FACHWIRT_SPIELE = spiele([
  ["kreuzwortraetsel", null, "kern"],
  ["kennzahlen_duell", null, "kern"],
  ["memory", null, "kern"],
]);

/** Szenarien der FI-Kurse (Matrix 05, Abschnitt 5; Zuordnung der Kategorien zu IDs bestätigt am 06.10.2026). */
const TERMINAL_LEICHT = ["internet", "dns", "platte-voll", "apipa"];
const TERMINAL_DV = [...TERMINAL_LEICHT, "webseite", "ip-maske", "firewall", "prozess-last", "ssh-angriff", "mehrstufig"];
const TERMINAL_SI = [...TERMINAL_DV, "rechte", "cron-job"];
const TOPOLOGIE_LEICHT = ["ein-netz-ein-switch", "zwei-netze-router", "dhcp-apotheke"];
const TOPOLOGIE_ALLE = [...TOPOLOGIE_LEICHT, "dhcp-pool-konflikt", "filiale-zwei-router", "gastnetz-vlan", "nat-partnernetz", "server-vlan-firewall", "drei-standorte-routing"];

export const KURS_ANGEBOT: Record<string, KursAngebot> = {
  // ---- Fachinformatiker ----
  "fachinformatiker-anwendungsentwicklung": {
    instrumente: liste(["gantt", "hierarchie", "schutzziele", "sql", "scrum", "uml", "teststufen", "ermodell", "normalisierung", "ablauf"], ["pdca", "risiko", "osi"]),
    werkzeuge: liste(["sqluebung"], ["netzplan", "subnetting", "terminal", "topologie", "flags"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "grundlagen"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["kennzahlen_duell", "sql", "kern"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "grundlagen"],
      ["phishing", null, "grundlagen"],
      // Neue Sets (schleifen, objektorientierung, sql-fehler) erst nach der Freigabe des Prüfblatts 06 aufnehmen.
      ["bughunt", "standard", "kern"],
      ["codereihenfolge", null, "kern"],
      ["subnetting", null, "grundlagen"],
      ["zahlensysteme", null, "grundlagen"],
    ]),
    lernpfade: ["scrum", "schutzziele", "normalisierung", "ermodell", "osi"],
    szenarien: {
      terminal: liste([], TERMINAL_LEICHT),
      topologie: liste([], TOPOLOGIE_LEICHT),
      flags: liste([], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-pruefsumme-spiegel", "flag-passwort-hashes", "flag-phishing-header", "flag-jwt-token", "flag-weblog-pfad", "flag-mehrstufig-funkspruch"]),
    },
  },
  "fachinformatiker-daten-prozessanalyse": {
    instrumente: liste(["gantt", "pdca", "schutzziele", "sql", "ermodell", "normalisierung"], ["risiko", "hierarchie", "osi", "scrum"]),
    werkzeuge: liste(["sqluebung"], ["netzplan", "subnetting", "terminal", "topologie", "flags"]),
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
    ]),
    lernpfade: ["scrum", "osi", "schutzziele", "normalisierung", "ermodell"],
    szenarien: {
      terminal: liste([], TERMINAL_LEICHT),
      topologie: liste([], TOPOLOGIE_LEICHT),
      flags: liste([], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-pruefsumme-spiegel", "flag-passwort-hashes", "flag-phishing-header", "flag-mehrstufig-funkspruch"]),
    },
  },
  "fachinformatiker-digitale-vernetzung": {
    instrumente: liste(["gantt", "risiko", "osi", "schutzziele", "teststufen"], ["pdca", "hierarchie", "scrum"]),
    werkzeuge: liste(["subnetting", "terminal", "topologie", "flags"], ["netzplan"]),
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
    ]),
    lernpfade: ["scrum", "osi", "schutzziele"],
    szenarien: {
      terminal: liste(TERMINAL_DV),
      topologie: liste(TOPOLOGIE_ALLE),
      flags: liste(["flag-basic-auth", "flag-offene-ports", "flag-log-bruteforce", "flag-dns-tunnel"]),
    },
  },
  "fachinformatiker-systemintegration": {
    instrumente: liste(["gantt", "risiko", "osi", "schutzziele", "teststufen"], ["pdca", "hierarchie", "scrum"]),
    werkzeuge: liste(["subnetting", "terminal", "topologie", "flags"], ["netzplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", "standard", "grundlagen"],
      ["kreuzwortraetsel", "netzwerk-sicherheit", "kern"],
      ["kennzahlen_duell", "standard", "grundlagen"],
      ["memory", "standard", "grundlagen"],
      ["memory", "ports", "kern"],
      ["phishing", null, "grundlagen"],
      // Neue Sets (serverdienste, switching-routing) und Bug-Hunt skripte-konfiguration erst nach der Freigabe des Prüfblatts 09 aufnehmen.
      ["troubleshooting", "standard", "kern"],
      ["subnetting", null, "kern"],
      ["zahlensysteme", null, "kern"],
    ]),
    lernpfade: ["scrum", "osi", "schutzziele"],
    szenarien: {
      terminal: liste(TERMINAL_SI),
      topologie: liste(TOPOLOGIE_ALLE),
      flags: liste(["flag-offene-ports", "flag-log-bruteforce", "flag-sshd-reihenfolge", "flag-dns-tunnel"], ["flag-base64-kennwort", "flag-caesar-postfach", "flag-hex-notiz", "flag-mehrstufig-funkspruch"]),
    },
  },

  // ---- Fachwirte und weitere Kurse (nur Passendes; IT-Inhalte entfallen) ----
  // Die neuen Instrumente (PPS, Beschaffung, SECI, Ishikawa, Zuschlagskalkulation, Incoterms) und das Duell-Set "kosten-leistungen" erst nach der
  // Freigabe des Prüfblatts 13 aufnehmen; das Begriffe-Duell ist bis dahin auf das nicht vorhandene Set "standard" begrenzt.
  industriefachwirt: {
    instrumente: liste(OHNE()),
    werkzeuge: [],
    spiele: spiele([
      ["kreuzwortraetsel", null, "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", null, "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  "technischer-fachwirt": { instrumente: liste(OHNE()), werkzeuge: [], spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  wirtschaftsfachwirt: { instrumente: liste(OHNE("gantt")), werkzeuge: [], spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  "transport-management-logistics": { instrumente: liste(OHNE("bsc", "gantt")), werkzeuge: [], spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  handelsfachwirt: { instrumente: liste(OHNE()), werkzeuge: [], spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  immobilienfachwirt: { instrumente: liste(OHNE()), werkzeuge: liste(["netzplan"]), spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  "versicherungen-finanzanlagen": { instrumente: liste(OHNE()), werkzeuge: liste(["netzplan"]), spiele: FACHWIRT_SPIELE, lernpfade: [], szenarien: {} },
  // Die neuen Instrumente (Projektphasen, Stakeholder-Matrix, ABC-Analyse) und das Duell-Set "projektmanagement" erst nach der Freigabe des
  // Prüfblatts 12 aufnehmen; das Begriffe-Duell ist bis dahin auf das bestehende Set "standard" begrenzt.
  "fachwirt-buero-projektorganisation": {
    instrumente: liste(OHNE()),
    werkzeuge: liste(["netzplan"]),
    spiele: spiele([
      ["kreuzwortraetsel", null, "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", null, "kern"],
    ]),
    lernpfade: ["bsc"],
    szenarien: {},
  },
  // Neue Inhalte (PDCA-Fragen, Donabedian, Kostenträger, Duell-Set "gesundheit-sozialsystem") erst nach der fachlichen und rechtlichen
  // Freigabe des Prüfblatts 11 aufnehmen: PDCA bleibt bis dahin aus der Liste, das Duell auf das nicht vorhandene Set "standard" begrenzt.
  "fachwirt-gesundheit-soziales": {
    instrumente: liste(OHNE("pdca")),
    werkzeuge: [],
    spiele: spiele([
      ["kreuzwortraetsel", null, "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", null, "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
  // Das neue Duell-Set "recht-berufsausbildung" und die neuen Instrumente erst nach der Freigabe des Prüfblatts 10 aufnehmen.
  "ausbildung-der-ausbilder": {
    instrumente: [],
    werkzeuge: [],
    spiele: spiele([
      ["kreuzwortraetsel", null, "kern"],
      ["kennzahlen_duell", "standard", "kern"],
      ["memory", null, "kern"],
    ]),
    lernpfade: [],
    szenarien: {},
  },
};

