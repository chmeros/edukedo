import { z } from "zod";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, drei vollständig
 * ausgearbeitete User-Story-Dokumente als Referenz-Content, siehe Architekturplanung
 * Abschnitt 13): drei content-autorierte Lernspiele (Kreuzworträtsel/Kennzahlen-Duell/Memory),
 * strukturell analog zum Instrumenten-Lernpfad (siehe schemas/instrument-lernpfad.ts) — ein
 * fest hinterlegtes JSONB-Payload je Kurs+Spieltyp (`game.payload`), keine relationale
 * Zerlegung, App-Ebene per Zod validiert statt DB-Ebene erzwungen.
 *
 * Anders als beim Instrumenten-Lernpfad verlangt die Spezifikation aller drei Spiele
 * ausdrücklich PERSISTENTEN Fortschritt je Nutzer:in (gewählte Variante, abgeschlossene
 * Runden/Duelle) — siehe `game_progress` in schema.ts sowie den zugehörigen `game`-Router.
 */

/**
 * F-158 (weitere Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
 * Architekturplanung Abschnitt 13): ein Kurs kann mehrere Sets desselben Spieltyps haben (z. B. zwei
 * Memory-Sets). `setKey` wählt das Set; ohne Angabe gilt das Standard-Set ("standard") — dadurch
 * bleiben alle bisherigen Aufrufe und Fortschrittsdaten unverändert gültig.
 */
export const DEFAULT_GAME_SET_KEY = "standard";
const setKeyField = z.string().min(1).max(40).regex(/^[a-z0-9_-]+$/).optional();

const TEXT_MAX = 500;
const HINT_MAX = 1000;
const FEEDBACK_MAX = 1000;

// ---------------------------------------------------------------------------
// Kreuzworträtsel „Finanzkennzahlen" (F-141)
// ---------------------------------------------------------------------------

/**
 * `loesung` ist die im Gitter einzutragende Zeichenkette — bereits in der für die Prüfung
 * verbindlichen Normalform (Großbuchstaben, Umlaute/ß nach der in der Spezifikation
 * festgelegten Regel ersetzt: Ä→AE, Ö→OE, Ü→UE, ß→SS). `startRow`/`startCol` (0-basiert) und
 * `richtung` legen die Gitterposition fest — die Spezifikation gibt nur Nummern/Richtungen/
 * Lösungen vor, das tatsächliche Gitter (inkl. konsistenter Kreuzungsbuchstaben) wird bei der
 * Content-Autorierung konstruiert und über `verifyCrosswordGrid` (game-logic.ts) geprüft.
 *
 * F-193 (Wiederspielbarkeit, Nutzer-Vorgabe vom 06.10.2026): `richtung`/`startRow`/`startCol` sind optional.
 * Der Server legt das Gitter bei jedem Start aus allen Wörtern des Sets (dem Wort-Pool) neu an
 * (`buildKreuzwortraetselPuzzle`, Generator in kreuzwort-generator.ts); vorhandene Positionen werden dann ignoriert.
 * `nummer` ist im Pool nur eine eindeutige Kennung, die Rätselnummern werden beim Anlegen neu vergeben.
 */
export const kreuzwortraetselWortSchema = z.object({
  nummer: z.number().int().positive(),
  richtung: z.enum(["waagerecht", "senkrecht"]).optional(),
  startRow: z.number().int().min(0).optional(),
  startCol: z.number().int().min(0).optional(),
  hinweis: z.string().min(1).max(TEXT_MAX),
  tipp: z.string().min(1).max(HINT_MAX),
  loesung: z
    .string()
    .min(1)
    .max(TEXT_MAX)
    .regex(/^[A-Z]+$/, "Lösung muss aus Großbuchstaben A-Z bestehen (Umlaute/ß bereits normalisiert)."),
  bestaetigung: z.string().min(1).max(FEEDBACK_MAX),
});
export type KreuzwortraetselWort = z.infer<typeof kreuzwortraetselWortSchema>;

export const kreuzwortraetselPayloadSchema = z.object({
  woerter: z.array(kreuzwortraetselWortSchema).min(1).max(40),
  // F-193: Wie viele Wörter ein Rätsel enthält (Standard 10); ist der Pool größer, wird bei jedem Start eine andere Auswahl getroffen.
  wortzahl: z.number().int().min(4).max(16).optional(),
  // Generische Rückmeldungen (nicht wortspezifisch, siehe Spezifikation Abschnitt 4/5):
  // "einfach" = falsch zugeordnete Wortkarte, "anspruchsvoll" = vollständiges, aber falsches
  // Wort, "unvollstaendig" = noch nicht alle Buchstaben eingetragen (nur anspruchsvoll).
  falschEinfachFeedback: z.string().min(1).max(FEEDBACK_MAX),
  falschAnspruchsvollFeedback: z.string().min(1).max(FEEDBACK_MAX),
  unvollstaendigFeedback: z.string().min(1).max(FEEDBACK_MAX),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type KreuzwortraetselPayload = z.infer<typeof kreuzwortraetselPayloadSchema>;

export const KREUZWORTRAETSEL_VARIANTS = ["einfach", "anspruchsvoll"] as const;
export type KreuzwortraetselVariant = (typeof KREUZWORTRAETSEL_VARIANTS)[number];

// ---------------------------------------------------------------------------
// Kennzahlen-Duell „Qualitätsmanagement und Prozesse" (F-142)
// ---------------------------------------------------------------------------

export const kennzahlenDuellFrageSchema = z.object({
  nummer: z.number().int().positive(),
  runde: z.number().int().min(1).max(4),
  frage: z.string().min(1).max(TEXT_MAX),
  antwortA: z.string().min(1).max(TEXT_MAX),
  antwortB: z.string().min(1).max(TEXT_MAX),
  richtig: z.enum(["A", "B"]),
  feedbackRichtig: z.string().min(1).max(FEEDBACK_MAX),
  feedbackFalsch: z.string().min(1).max(FEEDBACK_MAX),
});
export type KennzahlenDuellFrage = z.infer<typeof kennzahlenDuellFrageSchema>;

export const kennzahlenDuellRundeSchema = z.object({
  nummer: z.number().int().min(1).max(4),
  titel: z.string().min(1).max(200),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type KennzahlenDuellRunde = z.infer<typeof kennzahlenDuellRundeSchema>;

export const kennzahlenDuellPayloadSchema = z.object({
  runden: z.array(kennzahlenDuellRundeSchema).min(1).max(10),
  fragen: z.array(kennzahlenDuellFrageSchema).min(1).max(100),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type KennzahlenDuellPayload = z.infer<typeof kennzahlenDuellPayloadSchema>;

// ---------------------------------------------------------------------------
// Kennzahlen-Memory „Personal" (F-143)
// ---------------------------------------------------------------------------

export const memoryPaarSchema = z.object({
  nummer: z.number().int().positive(),
  runde: z.number().int().min(1).max(4),
  begriff: z.string().min(1).max(TEXT_MAX),
  bedeutung: z.string().min(1).max(TEXT_MAX),
  bestaetigung: z.string().min(1).max(FEEDBACK_MAX),
});
export type MemoryPaar = z.infer<typeof memoryPaarSchema>;

export const memoryRundeSchema = z.object({
  nummer: z.number().int().min(1).max(4),
  titel: z.string().min(1).max(200),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type MemoryRunde = z.infer<typeof memoryRundeSchema>;

export const memoryPayloadSchema = z.object({
  runden: z.array(memoryRundeSchema).min(1).max(10),
  paare: z.array(memoryPaarSchema).min(1).max(100),
  // F-193: Wie viele Paare eine Runde zeigt (Standard 6); enthält die Runde im Pool mehr Paare, wird bei jedem Spiel neu gezogen.
  paareProRunde: z.number().int().min(3).max(10).optional(),
  falschesPaarFeedback: z.string().min(1).max(FEEDBACK_MAX),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type MemoryPayload = z.infer<typeof memoryPayloadSchema>;

// ---------------------------------------------------------------------------
// game.gameType — welche der drei Spiele es aktuell gibt
// ---------------------------------------------------------------------------

export const GAME_TYPES = [
  "kreuzwortraetsel",
  "kennzahlen_duell",
  "memory",
  // F-158: weitere Spieltypen
  "phishing",
  "bughunt",
  "codereihenfolge",
  "troubleshooting",
  "subnetting",
  "zahlensysteme",
  // F-194: Rechen-Sprint
  "rechensprint",
  // F-195: Prozess-Reihenfolge
  "prozessreihenfolge",
] as const;
export type GameType = (typeof GAME_TYPES)[number];

// ---------------------------------------------------------------------------
// tRPC Input-Schemas
// ---------------------------------------------------------------------------

export const gameKursInputSchema = z.object({ kursId: z.string().uuid(), setKey: setKeyField });

export const startKreuzwortraetselInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  variant: z.enum(KREUZWORTRAETSEL_VARIANTS),
});

export const submitKreuzwortraetselWortInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  eingabe: z.string().min(1).max(TEXT_MAX),
});

export const submitKennzahlenDuellAntwortInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  ausgewaehlt: z.enum(["A", "B"]),
});

export const memoryRundeInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  runde: z.number().int().min(1).max(4),
  // F-193: Ziehung der Paare und Mischen der Karten; derselbe Seed liefert dieselben Karten (ein Neuladen verändert die Runde nicht).
  seed: z.number().int().min(1).max(2147483647).optional(),
});

export const submitMemoryPaarInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  runde: z.number().int().min(1).max(4),
  textA: z.string().min(1).max(TEXT_MAX),
  textB: z.string().min(1).max(TEXT_MAX),
});

// ---------------------------------------------------------------------------
// F-158: Phishing-Detektiv
// ---------------------------------------------------------------------------

/**
 * Eine E-Mail besteht aus `elemente` in Anzeigereihenfolge (Absender, Betreff, Textabschnitte, Link,
 * Anhang). Jedes Element ist anklickbar; `verdaechtig` sagt, ob es ein Phishing-Merkmal ist. Auch
 * harmlose Elemente tragen eine kurze `erklaerung` (warum unauffällig bzw. verdächtig).
 * `ort` steuert die Darstellung: "absender"/"betreff" als Kopfzeilen, "text" als Absatz, "link" als
 * Link (`text` zeigt Linktext UND sichtbares Ziel im Format "Linktext → https://ziel"), "anhang" als
 * Dateianhang.
 */
export const phishingElementSchema = z.object({
  id: z.string().min(1).max(20),
  ort: z.enum(["absender", "betreff", "text", "link", "anhang"]),
  text: z.string().min(1).max(TEXT_MAX),
  verdaechtig: z.boolean(),
  erklaerung: z.string().min(1).max(FEEDBACK_MAX),
});
export type PhishingElement = z.infer<typeof phishingElementSchema>;

export const phishingMailSchema = z
  .object({
    nummer: z.number().int().positive(),
    elemente: z.array(phishingElementSchema).min(4).max(12),
    istPhishing: z.boolean(),
    aufloesung: z.string().min(1).max(FEEDBACK_MAX),
  })
  .refine((mail) => new Set(mail.elemente.map((element) => element.id)).size === mail.elemente.length, {
    message: "Element-IDs müssen innerhalb einer E-Mail eindeutig sein.",
  })
  .refine((mail) => !mail.istPhishing || mail.elemente.filter((element) => element.verdaechtig).length >= 2, {
    message: "Eine Phishing-Mail braucht mindestens zwei verdächtige Elemente.",
  })
  .refine((mail) => mail.istPhishing || mail.elemente.every((element) => !element.verdaechtig), {
    message: "Eine echte Mail darf kein verdächtig markiertes Element enthalten.",
  });
export type PhishingMail = z.infer<typeof phishingMailSchema>;

export const phishingPayloadSchema = z.object({
  mails: z.array(phishingMailSchema).min(1).max(30),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type PhishingPayload = z.infer<typeof phishingPayloadSchema>;

export const submitPhishingInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  markiert: z.array(z.string().min(1).max(20)).max(12),
  urteil: z.enum(["phishing", "echt"]),
});

// ---------------------------------------------------------------------------
// F-158: Bug-Hunt
// ---------------------------------------------------------------------------

export const bugHuntAufgabeSchema = z
  .object({
    nummer: z.number().int().positive(),
    titel: z.string().min(1).max(200),
    sprache: z.string().min(1).max(40),
    aufgabe: z.string().min(1).max(TEXT_MAX),
    zeilen: z.array(z.string().max(200)).min(3).max(25),
    fehlerZeile: z.number().int().min(1),
    tipp: z.string().min(1).max(HINT_MAX),
    korrektur: z.string().min(1).max(200),
    erklaerung: z.string().min(1).max(FEEDBACK_MAX),
  })
  .refine((aufgabe) => aufgabe.fehlerZeile <= aufgabe.zeilen.length, { message: "fehlerZeile liegt außerhalb des Codes." });
export type BugHuntAufgabe = z.infer<typeof bugHuntAufgabeSchema>;

export const bugHuntPayloadSchema = z.object({
  aufgaben: z.array(bugHuntAufgabeSchema).min(1).max(30),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type BugHuntPayload = z.infer<typeof bugHuntPayloadSchema>;

export const submitBugHuntInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  zeile: z.number().int().min(1).max(25),
});

// ---------------------------------------------------------------------------
// F-158: Code-Reihenfolge (Parsons-Probleme)
// ---------------------------------------------------------------------------

export const codeReihenfolgeAufgabeSchema = z.object({
  nummer: z.number().int().positive(),
  titel: z.string().min(1).max(200),
  sprache: z.string().min(1).max(40),
  aufgabe: z.string().min(1).max(TEXT_MAX),
  /** Die Zeilen in der RICHTIGEN Reihenfolge (Einrückung ist Teil des Textes). */
  zeilen: z.array(z.string().min(1).max(200)).min(3).max(10),
  erklaerung: z.string().min(1).max(FEEDBACK_MAX),
});
export type CodeReihenfolgeAufgabe = z.infer<typeof codeReihenfolgeAufgabeSchema>;

export const codeReihenfolgePayloadSchema = z.object({
  aufgaben: z.array(codeReihenfolgeAufgabeSchema).min(1).max(30),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type CodeReihenfolgePayload = z.infer<typeof codeReihenfolgePayloadSchema>;

export const submitCodeReihenfolgeInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  reihenfolge: z.array(z.string().min(1).max(40)).min(3).max(10),
});

// ---------------------------------------------------------------------------
// F-195: Prozess-Reihenfolge (Verallgemeinerung der Code-Reihenfolge für Abläufe in Fließtext)
// ---------------------------------------------------------------------------

export const prozessReihenfolgeAufgabeSchema = z.object({
  nummer: z.number().int().positive(),
  titel: z.string().min(1).max(200),
  aufgabe: z.string().min(1).max(TEXT_MAX),
  /** Die Schritte in der RICHTIGEN Reihenfolge. */
  schritte: z.array(z.string().min(1).max(200)).min(3).max(10),
  erklaerung: z.string().min(1).max(FEEDBACK_MAX),
});
export type ProzessReihenfolgeAufgabe = z.infer<typeof prozessReihenfolgeAufgabeSchema>;

export const prozessReihenfolgePayloadSchema = z.object({
  aufgaben: z.array(prozessReihenfolgeAufgabeSchema).min(1).max(30),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type ProzessReihenfolgePayload = z.infer<typeof prozessReihenfolgePayloadSchema>;

/** Beide Reihenfolge-Spiele teilen Mischen, Prüfen und Spielstand. */
export const REIHENFOLGE_GAME_TYPES = ["codereihenfolge", "prozessreihenfolge"] as const;
export type ReihenfolgeGameType = (typeof REIHENFOLGE_GAME_TYPES)[number];

export const reihenfolgeKursInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  gameType: z.enum(REIHENFOLGE_GAME_TYPES),
});

export const submitReihenfolgeInputSchema = submitCodeReihenfolgeInputSchema.extend({
  gameType: z.enum(REIHENFOLGE_GAME_TYPES),
});

// ---------------------------------------------------------------------------
// F-158: Netzwerk-Troubleshooting-Detektiv
// ---------------------------------------------------------------------------

const troubleshootingOptionSchema = z.object({ id: z.string().min(1).max(20), text: z.string().min(1).max(TEXT_MAX) });

export const troubleshootingFallSchema = z
  .object({
    nummer: z.number().int().positive(),
    titel: z.string().min(1).max(200),
    szenario: z.string().min(1).max(TEXT_MAX),
    /** Beobachtungen/Messergebnisse, z. B. "ping 127.0.0.1 funktioniert", "Link-LED aus". */
    symptome: z.array(z.string().min(1).max(300)).min(2).max(6),
    schichtOptionen: z.array(troubleshootingOptionSchema).min(3).max(5),
    richtigeSchicht: z.string().min(1).max(20),
    ursachenOptionen: z.array(troubleshootingOptionSchema).min(3).max(5),
    richtigeUrsache: z.string().min(1).max(20),
    erklaerung: z.string().min(1).max(FEEDBACK_MAX),
  })
  .refine((fall) => fall.schichtOptionen.some((option) => option.id === fall.richtigeSchicht), {
    message: "richtigeSchicht verweist auf keine Option.",
  })
  .refine((fall) => fall.ursachenOptionen.some((option) => option.id === fall.richtigeUrsache), {
    message: "richtigeUrsache verweist auf keine Option.",
  });
export type TroubleshootingFall = z.infer<typeof troubleshootingFallSchema>;

export const troubleshootingPayloadSchema = z.object({
  faelle: z.array(troubleshootingFallSchema).min(1).max(30),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type TroubleshootingPayload = z.infer<typeof troubleshootingPayloadSchema>;

export const submitTroubleshootingInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  nummer: z.number().int().positive(),
  schritt: z.union([z.literal(1), z.literal(2)]),
  antwort: z.string().min(1).max(20),
});

// ---------------------------------------------------------------------------
// F-158: Subnetting-Sprint und Zahlensystem-Sprint (serverseitig erzeugte Aufgaben)
// ---------------------------------------------------------------------------

export const SUBNETTING_TYPEN = ["netzadresse", "broadcast", "hosts", "maske", "praefix"] as const;
export type SubnettingTyp = (typeof SUBNETTING_TYPEN)[number];
export const ZAHLENSYSTEM_TYPEN = ["dez_bin", "bin_dez", "dez_hex", "hex_dez", "bin_hex", "hex_bin"] as const;
export type ZahlensystemTyp = (typeof ZAHLENSYSTEM_TYPEN)[number];

/** Für diese Spiele gibt es keinen festen Aufgabeninhalt: das Payload konfiguriert nur die Aufgabenarten. */
export const subnettingPayloadSchema = z.object({
  aufgabenTypen: z.array(z.enum(SUBNETTING_TYPEN)).min(1),
  anzahl: z.number().int().min(3).max(20),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type SubnettingPayload = z.infer<typeof subnettingPayloadSchema>;

export const zahlensystemePayloadSchema = z.object({
  aufgabenTypen: z.array(z.enum(ZAHLENSYSTEM_TYPEN)).min(1),
  anzahl: z.number().int().min(3).max(20),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type ZahlensystemePayload = z.infer<typeof zahlensystemePayloadSchema>;

/** F-194: Aufgabenarten des Rechen-Sprints (kaufmännisch/betrieblich und IT). */
export const RECHEN_TYPEN = [
  "prozentwert",
  "skonto",
  "dreisatz",
  "zuschlag",
  "deckungsbeitrag",
  "breakeven",
  "umschlag",
  "lagerdauer",
  "andler",
  "oee",
  "uebertragung",
  "speicher",
  "stromkosten",
  "verfuegbarkeit",
  "mtbf",
  "raid",
] as const;
export type RechenTyp = (typeof RECHEN_TYPEN)[number];

export const rechensprintPayloadSchema = z.object({
  aufgabenTypen: z.array(z.enum(RECHEN_TYPEN)).min(1),
  anzahl: z.number().int().min(3).max(20),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type RechensprintPayload = z.infer<typeof rechensprintPayloadSchema>;

export const SPRINT_SCHWIERIGKEITEN = ["leicht", "mittel", "schwer"] as const;
export type SprintSchwierigkeit = (typeof SPRINT_SCHWIERIGKEITEN)[number];

export const SPRINT_GAME_TYPES = ["subnetting", "zahlensysteme", "rechensprint"] as const;
export type SprintGameType = (typeof SPRINT_GAME_TYPES)[number];

export const sprintStartInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  gameType: z.enum(SPRINT_GAME_TYPES),
  schwierigkeit: z.enum(SPRINT_SCHWIERIGKEITEN),
});

export const sprintAntwortInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  gameType: z.enum(SPRINT_GAME_TYPES),
  /** Signierter, serverseitig geprüfter Aufgaben-Token aus `sprintStart`. */
  token: z.string().min(10).max(600),
  eingabe: z.string().min(1).max(60),
});

export const sprintAbschlussInputSchema = z.object({
  kursId: z.string().uuid(),
  setKey: setKeyField,
  gameType: z.enum(SPRINT_GAME_TYPES),
  schwierigkeit: z.enum(SPRINT_SCHWIERIGKEITEN),
  richtig: z.number().int().min(0).max(20),
  gesamt: z.number().int().min(1).max(20),
});
