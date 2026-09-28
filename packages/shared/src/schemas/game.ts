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
 */
export const kreuzwortraetselWortSchema = z.object({
  nummer: z.number().int().positive(),
  richtung: z.enum(["waagerecht", "senkrecht"]),
  startRow: z.number().int().min(0),
  startCol: z.number().int().min(0),
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
  woerter: z.array(kreuzwortraetselWortSchema).min(1).max(20),
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
  falschesPaarFeedback: z.string().min(1).max(FEEDBACK_MAX),
  abschlussmeldung: z.string().min(1).max(FEEDBACK_MAX),
});
export type MemoryPayload = z.infer<typeof memoryPayloadSchema>;

// ---------------------------------------------------------------------------
// game.gameType — welche der drei Spiele es aktuell gibt
// ---------------------------------------------------------------------------

export const GAME_TYPES = ["kreuzwortraetsel", "kennzahlen_duell", "memory"] as const;
export type GameType = (typeof GAME_TYPES)[number];

// ---------------------------------------------------------------------------
// tRPC Input-Schemas
// ---------------------------------------------------------------------------

export const gameKursInputSchema = z.object({ kursId: z.string().uuid() });

export const startKreuzwortraetselInputSchema = z.object({
  kursId: z.string().uuid(),
  variant: z.enum(KREUZWORTRAETSEL_VARIANTS),
});

export const submitKreuzwortraetselWortInputSchema = z.object({
  kursId: z.string().uuid(),
  nummer: z.number().int().positive(),
  eingabe: z.string().min(1).max(TEXT_MAX),
});

export const submitKennzahlenDuellAntwortInputSchema = z.object({
  kursId: z.string().uuid(),
  nummer: z.number().int().positive(),
  ausgewaehlt: z.enum(["A", "B"]),
});

export const memoryRundeInputSchema = z.object({ kursId: z.string().uuid(), runde: z.number().int().min(1).max(4) });

export const submitMemoryPaarInputSchema = z.object({
  kursId: z.string().uuid(),
  runde: z.number().int().min(1).max(4),
  textA: z.string().min(1).max(TEXT_MAX),
  textB: z.string().min(1).max(TEXT_MAX),
});
