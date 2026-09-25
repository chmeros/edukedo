import { z } from "zod";

/**
 * F-129/F-130/F-131 (Nutzer-Vorgabe vom 24.09.2026, zwei vollständig ausgearbeitete User-Story-
 * Dokumente als Referenz-Content, siehe content/instrumenten-lernpfade/README.md sowie
 * Architekturplanung Abschnitt 13): Instrumenten-Lernpfad — ein geführter, mehrstufiger
 * Lern-/Übungsdurchgang je Instrument, technisch eine neue Orchestrierungs-Ebene OBERHALB der
 * bestehenden Fragetyp-Mechaniken (Zuordnung/Zonen F-114, Sortieren F-113, Mehrfachauswahl F-116),
 * keine content_item-Zeilen. Der gesamte Pfad (Narrativ + sieben Stationen) liegt als EIN
 * content-autoriertes JSONB-Payload auf `instrument_lernpfad.payload` (siehe schema.ts) — die
 * Struktur ist fest (jede Station hat eine definierte Rolle, kein flacher, beliebig
 * durchmischbarer Fragenpool wie bei content_item/answer_option), daher hier bewusst KEINE
 * relationale Zerlegung analog zu answer_option, sondern dieselbe "Array aus strukturierten
 * Objekten in einem JSONB-Feld"-Idee wie z. B. bei `fallaufgabePayloadSchema`/`hierarchiePayloadSchema`.
 *
 * Zwei Interaktions-Muster, exakt wie im Referenz-Content beschrieben:
 * - **Batch-Stationen** (Wissensfrage/Sortieren): Auswahl treffen, dann EINMAL "prüfen" — wie die
 *   bestehenden Quiz-Schritte (F-21/F-113/F-116). Feedback (inkl. je Option/Begriff eigener Text)
 *   wird erst nach dem Absenden aufgedeckt.
 * - **Sofort-Stationen** (Struktur erkennen/Zonen-Zuordnung/Maßnahmen-Wahl): "Nach jedem
 *   einzelnen Ziehen bekomme ich sofort Rückmeldung" — jede einzelne Platzierung löst SERVERSEITIG
 *   eine eigene Prüfung aus (siehe `instrumentLernpfad`-Router), nie eine batch-weise Prüfung wie
 *   bei QuadrantStep (F-114) — das entspricht dem Referenz-Content nicht. Trotzdem bleibt die
 *   Lösung bis zum jeweiligen Versuch serverseitig verborgen (dieselbe Leitplanke wie überall sonst
 *   im Projekt), indem `get` nur textuelle Anzeige-Daten ohne `correct`/`feedback`/`zoneKey` liefert
 *   und ein eigener `submit*`-Aufruf je Versuch nur GENAU dieses eine Element auflöst.
 */

const CONTEXT_MAX = 2000;
const TEXT_MAX = 500;
const FEEDBACK_MAX = 1000;

/** Stationen 1 (Grundlagen) und 6 (Zusammenhänge) — strukturell identisch: eine Liste von
 * Wissensfragen, je Frage 2–10 Optionen mit EIGENEM Feedback-Text pro Option (anders als die
 * bestehenden MC-Typen, die nur ein gemeinsames `content_item.explanation` kennen) und einer frei
 * wählbaren Anzahl korrekter Optionen (1 = Multiple Choice/Wahr-Falsch-artig, 2+ = Mehrfachauswahl-
 * artig wie F-116) — batch-geprüft wie die bestehenden Quiz-Schritte. */
export const lernpfadWissensfrageOptionSchema = z.object({
  text: z.string().min(1).max(TEXT_MAX),
  isCorrect: z.boolean(),
  feedback: z.string().min(1).max(FEEDBACK_MAX),
});
export const lernpfadWissensfrageSchema = z.object({
  prompt: z.string().min(1).max(CONTEXT_MAX),
  options: z.array(lernpfadWissensfrageOptionSchema).min(2).max(10),
});
export const lernpfadWissensfragenStationSchema = z.object({
  intro: z.string().min(1).max(CONTEXT_MAX),
  questions: z.array(lernpfadWissensfrageSchema).min(1).max(10),
});
export type LernpfadWissensfrage = z.infer<typeof lernpfadWissensfrageSchema>;
export type LernpfadWissensfragenStation = z.infer<typeof lernpfadWissensfragenStationSchema>;

/** Station 2 (Struktur erkennen) und Station 5 (Maßnahmen-Wahl, dort mehrrundig mit `context` je
 * Runde) — ein Begriffs-/Vorschlags-Pool inkl. Distraktoren, Zielfelder sind untereinander
 * gleichwertig (Position irrelevant), jeder Begriff (richtig wie falsch) trägt sein EIGENES
 * Feedback. Sofort-geprüft je einzelnem Zug. */
export const lernpfadPoolItemSchema = z.object({
  text: z.string().min(1).max(TEXT_MAX),
  correct: z.boolean(),
  feedback: z.string().min(1).max(FEEDBACK_MAX),
});
export const lernpfadPoolRoundSchema = z.object({
  // Nur bei Station 5 gesetzt: das Ziel, zu dem die vier Vorschläge gehören.
  context: z.string().max(CONTEXT_MAX).optional(),
  correctCount: z.number().int().positive(),
  items: z.array(lernpfadPoolItemSchema).min(2).max(12),
});
export const lernpfadPoolStationSchema = z.object({
  prompt: z.string().min(1).max(CONTEXT_MAX),
  rounds: z.array(lernpfadPoolRoundSchema).min(1).max(10),
});
export type LernpfadPoolRound = z.infer<typeof lernpfadPoolRoundSchema>;
export type LernpfadPoolStation = z.infer<typeof lernpfadPoolStationSchema>;

/** Station 3 (grobe Zuordnung) — alle Zonen und alle Begriffe auf einmal sichtbar, wie die
 * bestehende Zuordnungs-/Zonen-Mechanik (F-114), aber sofort je einzelnem Zug geprüft statt erst
 * nach "Antwort prüfen". Anders als bei Station 2/5 ist das Feedback hier NICHT je Begriff
 * einzeln verfasst, sondern (wie im Referenz-Content) ein gemeinsamer Richtig-/Falsch-Text für die
 * ganze Station — spiegelt exakt den Referenz-Content, keine erfundene Verfeinerung. */
export const lernpfadZoneSchema = z.object({ key: z.string().min(1), label: z.string().min(1).max(200) });
export const lernpfadZoneItemSchema = z.object({ text: z.string().min(1).max(TEXT_MAX), zoneKey: z.string().min(1) });
export const lernpfadZonenZuordnungStationSchema = z.object({
  prompt: z.string().min(1).max(CONTEXT_MAX),
  zones: z.array(lernpfadZoneSchema).min(2).max(8),
  items: z.array(lernpfadZoneItemSchema).min(2).max(20),
  correctFeedback: z.string().min(1).max(FEEDBACK_MAX),
  wrongFeedback: z.string().min(1).max(FEEDBACK_MAX),
});
export type LernpfadZone = z.infer<typeof lernpfadZoneSchema>;
export type LernpfadZoneItem = z.infer<typeof lernpfadZoneItemSchema>;
export type LernpfadZonenZuordnungStation = z.infer<typeof lernpfadZonenZuordnungStationSchema>;

/** Station 4 (vertiefte Zuordnung) — wie Station 3, aber die Begriffe kommen aus einem deutlich
 * größeren Pool, wovon je Zone `kernAnzahlProZone` Stück für den verpflichtenden Grunddurchlauf
 * zufällig gezogen und in Runden zu `rundengroesse` gemischt werden; der Rest bleibt als
 * freiwilliger Zusatzumfang abrufbar. Auswahl/Durchmischung passiert bei jedem `get`-Aufruf neu
 * serverseitig (siehe instrumentLernpfad-Router) — bewusst ohne eigene Persistenz je Lauf (Zu
 * klären in F-129 zum Pfad-Fortschritt: für die erste Umsetzung startet ein neu geladener Pfad
 * bewusst neu, siehe Architekturplanung Abschnitt 13). */
export const lernpfadGepoolteZuordnungStationSchema = z.object({
  prompt: z.string().min(1).max(CONTEXT_MAX),
  zones: z.array(lernpfadZoneSchema).min(2).max(8),
  pool: z.array(lernpfadZoneItemSchema).min(4).max(60),
  kernAnzahlProZone: z.number().int().positive(),
  rundengroesse: z.number().int().positive(),
  correctFeedback: z.string().min(1).max(FEEDBACK_MAX),
  wrongFeedback: z.string().min(1).max(FEEDBACK_MAX),
});
export type LernpfadGepoolteZuordnungStation = z.infer<typeof lernpfadGepoolteZuordnungStationSchema>;

/** Station 7 (Wirkungsketten) — mehrere Sortieraufgaben mit je genau vier Aussagen in der
 * (Referenz-Content-)Reihenfolge; batch-geprüft, dieselbe Mechanik wie die bestehende Sortieren-
 * Frage (F-113 Teil 2), nur außerhalb von content_item/answer_option gespeichert. */
export const lernpfadSortierAufgabeSchema = z.object({
  prompt: z.string().min(1).max(CONTEXT_MAX),
  // Reihenfolge im Array IST die richtige Reihenfolge (wie bei "sortieren", siehe quiz-logic.ts).
  items: z.array(z.string().min(1).max(TEXT_MAX)).min(3).max(6),
});
export const lernpfadSortierenStationSchema = z.object({
  intro: z.string().min(1).max(CONTEXT_MAX),
  tasks: z.array(lernpfadSortierAufgabeSchema).min(1).max(10),
});
export type LernpfadSortierAufgabe = z.infer<typeof lernpfadSortierAufgabeSchema>;
export type LernpfadSortierenStation = z.infer<typeof lernpfadSortierenStationSchema>;

/** Vollständiges Payload eines Instrumenten-Lernpfads (`instrument_lernpfad.payload`). */
export const instrumentLernpfadPayloadSchema = z.object({
  organisation: z.string().min(1).max(200),
  vision: z.string().min(1).max(CONTEXT_MAX),
  fallbeispielIntro: z.string().min(1).max(CONTEXT_MAX),
  grundlagenfragen: lernpfadWissensfragenStationSchema,
  strukturErkennen: lernpfadPoolStationSchema,
  zieleZuordnen: lernpfadZonenZuordnungStationSchema,
  messbareZieleZuordnen: lernpfadGepoolteZuordnungStationSchema,
  massnahmenWahl: lernpfadPoolStationSchema,
  zusammenhaenge: lernpfadWissensfragenStationSchema,
  wirkungsketten: lernpfadSortierenStationSchema,
  selbsteinschaetzungPrompt: z.string().min(1).max(CONTEXT_MAX),
});
export type InstrumentLernpfadPayload = z.infer<typeof instrumentLernpfadPayloadSchema>;

/** Reihenfolge der Stationen, wie sie sequenziell durchlaufen werden (F-129: "eine feste,
 * sequenziell zu durchlaufende Folge von Stationen statt einer zufällig gemischten Fragenrunde"). */
export const LERNPFAD_STATION_KEYS = [
  "grundlagenfragen",
  "strukturErkennen",
  "zieleZuordnen",
  "messbareZieleZuordnen",
  "massnahmenWahl",
  "zusammenhaenge",
  "wirkungsketten",
] as const;
export type LernpfadStationKey = (typeof LERNPFAD_STATION_KEYS)[number];

// ---------------------------------------------------------------------------
// tRPC Input-Schemas
// ---------------------------------------------------------------------------

export const lernpfadInputSchema = z.object({ kursId: z.string().uuid(), instrumentType: z.string().min(1) });
export type LernpfadInput = z.infer<typeof lernpfadInputSchema>;

/**
 * Alle `submit*`-Aufrufe identifizieren das geprüfte Element über seinen Original-TEXT statt
 * eines Index — der Lernpfad hält bewusst keinen serverseitigen Sitzungszustand (siehe Moduldoku
 * oben), Anzeige-Reihenfolgen werden bei jedem `get` neu gemischt bzw. bei Station 4 sogar neu aus
 * dem Pool gezogen. Der Text ist innerhalb einer Station/Runde eindeutig (Autoren-Vorgabe, wie bei
 * `answer_option.text` andernorts auch nie auf Eindeutigkeit geprüft, aber in der Praxis immer
 * eindeutig) und identifiziert das Element damit unabhängig von jeder Anzeige-Reihenfolge.
 */
export const lernpfadSubmitWissensfrageInputSchema = z.object({
  lernpfadId: z.string().uuid(),
  station: z.enum(["grundlagenfragen", "zusammenhaenge"]),
  questionIndex: z.number().int().min(0),
  // Die dem Lernenden angezeigte (gemischte) Optionsliste — siehe checkLernpfadWissensfrage.
  optionTexts: z.array(z.string().min(1)).min(2).max(10),
  selectedIndices: z.array(z.number().int().min(0)).max(10),
});

export const lernpfadSubmitPoolItemInputSchema = z.object({
  lernpfadId: z.string().uuid(),
  station: z.enum(["strukturErkennen", "massnahmenWahl"]),
  roundIndex: z.number().int().min(0),
  itemText: z.string().min(1),
});

export const lernpfadSubmitZoneItemInputSchema = z.object({
  lernpfadId: z.string().uuid(),
  station: z.enum(["zieleZuordnen", "messbareZieleZuordnen"]),
  itemText: z.string().min(1),
  zoneKey: z.string().min(1),
});

export const lernpfadSubmitSortierenInputSchema = z.object({
  lernpfadId: z.string().uuid(),
  taskIndex: z.number().int().min(0),
  // Die dem Lernenden angezeigte (gemischte) Reihenfolge, siehe checkLernpfadSortieren.
  shuffledTexts: z.array(z.string().min(1)).min(3).max(6),
  orderedIndices: z.array(z.number().int().min(0)).min(3).max(6),
});

export const lernpfadSubmitSelbsteinschaetzungInputSchema = z.object({
  lernpfadId: z.string().uuid(),
  rating: z.number().int().min(0).max(10),
});
