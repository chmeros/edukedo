import {
  belegPayloadSchema,
  bugHuntPayloadSchema,
  checkBeleg,
  checkBugHunt,
  checkCodeReihenfolge,
  checkPhishing,
  checkTroubleshooting,
  codeReihenfolgePayloadSchema,
  DEFAULT_GAME_SET_KEY,
  erzeugeRechenAufgabe,
  erzeugeSubnettingAufgabe,
  erzeugeZahlensystemAufgabe,
  phishingPayloadSchema,
  prozessAlsReihenfolge,
  prozessReihenfolgePayloadSchema,
  pruefeRechenEingabe,
  pruefeSubnettingEingabe,
  pruefeZahlensystemEingabe,
  rechenFrage,
  rechenLoesung,
  rechensprintPayloadSchema,
  shapeBelege,
  shapeBugHunt,
  shapeCodeReihenfolge,
  shapePhishing,
  shapeTroubleshooting,
  sprintAbschlussInputSchema,
  sprintAntwortInputSchema,
  sprintStartInputSchema,
  submitBelegInputSchema,
  submitBugHuntInputSchema,
  submitReihenfolgeInputSchema,
  submitPhishingInputSchema,
  submitTroubleshootingInputSchema,
  subnettingFrage,
  subnettingLoesung,
  subnettingPayloadSchema,
  troubleshootingPayloadSchema,
  zahlensystemFrage,
  zahlensystemLoesung,
  zahlensystemePayloadSchema,
  type CodeReihenfolgePayload,
  type ReihenfolgeGameType,
  type RechenParams,
  type RechenTyp,
  type SprintGameType,
  type SprintSchwierigkeit,
  type SubnettingParams,
  type SubnettingTyp,
  type ZahlensystemParams,
  type ZahlensystemTyp,
  buildKreuzwortraetselPuzzle,
  buildKreuzwortraetselWordBank,
  randomSeed,
  checkKennzahlenDuellAntwort,
  checkKreuzwortraetselWort,
  checkMemoryPaar,
  gameKursInputSchema,
  reihenfolgeKursInputSchema,
  kennzahlenDuellPayloadSchema,
  kreuzwortraetselPayloadSchema,
  memoryPayloadSchema,
  memoryRundeInputSchema,
  shapeKennzahlenDuell,
  shapeKreuzwortraetsel,
  shapeMemoryRunde,
  startKreuzwortraetselInputSchema,
  submitKennzahlenDuellAntwortInputSchema,
  submitKreuzwortraetselWortInputSchema,
  submitMemoryPaarInputSchema,
  type KreuzwortraetselVariant,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import type { Database } from "../../db/client";
import { signSprintToken, verifySprintToken } from "../../game-sprint-token";
import { game, gameProgress, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe packages/shared/src/
 * schemas/game.ts für die vollständige Konzept-Dokumentation und Architekturplanung Abschnitt 13
 * für die technischen Entscheidungen): drei content-autorierte Lernspiele im umbenannten
 * "Gaming"-Tab — strukturell analog zum Instrumenten-Lernpfad (siehe instrumentLernpfad.ts),
 * aber bewusst OHNE Premium-Gate (Teil des kostenlosen Kernangebots wie Quiz/Karteikarten) und
 * MIT persistentem Rundenfortschritt (`game_progress`, siehe schema.ts) statt eines bei jedem
 * `get()` neu startenden Durchlaufs. `get*` liefert IMMER nur die lösungsfreie Anzeigeform,
 * jeder `submit*`-Aufruf prüft genau EIN Element (Kreuzworträtsel-Wort, Duell-Frage,
 * Memory-Paar) gegen das serverseitig geladene Payload.
 */

async function requireEnrollment(db: Database, userId: string, kursId: string): Promise<void> {
  const [enrollment] = await db
    .select({ id: userCourse.id })
    .from(userCourse)
    .where(and(eq(userCourse.userId, userId), eq(userCourse.kursId, kursId)))
    .limit(1);
  if (!enrollment) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Du bist in diesem Kurs nicht eingeschrieben." });
  }
}

async function loadGame(db: Database, userId: string, kursId: string, gameType: string, setKey: string = DEFAULT_GAME_SET_KEY) {
  const [row] = await db
    .select({ id: game.id, payload: game.payload, title: game.title })
    .from(game)
    .where(and(eq(game.kursId, kursId), eq(game.gameType, gameType), eq(game.setKey, setKey), eq(game.isActive, true)))
    .limit(1);
  if (!row) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Spiel ist in diesem Kurs nicht verfügbar." });
  }
  await requireEnrollment(db, userId, kursId);
  return row;
}

async function loadProgressRow(db: Database, userId: string, gameId: string) {
  const [row] = await db
    .select({ state: gameProgress.state, completedAt: gameProgress.completedAt })
    .from(gameProgress)
    .where(and(eq(gameProgress.userId, userId), eq(gameProgress.gameId, gameId)))
    .limit(1);
  return row ?? null;
}

async function upsertProgress(db: Database, userId: string, gameId: string, state: unknown, completedAt: Date | null): Promise<void> {
  await db
    .insert(gameProgress)
    .values({ userId, gameId, state: state as object, completedAt, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: [gameProgress.userId, gameProgress.gameId],
      set: { state: state as object, completedAt, updatedAt: new Date() },
    });
}

/**
 * Review LOG-15: Spielstand atomar fortschreiben. Der JSON-Zustand wurde vorher gelesen, ergänzt und zurückgeschrieben; zwei fast
 * gleichzeitige richtige Antworten (zwei Tabs, schnelle Eingabe) überschrieben sich, eine gelöste Nummer ging verloren. Jetzt
 * liegt die Zeile (bei Bedarf leer angelegt) unter einer Zeilensperre, `aendern` ändert den Zustand und meldet, ob das Spiel
 * damit abgeschlossen ist. `completed_at` wird nur gesetzt, wenn es noch leer ist: eine spätere richtige Antwort oder eine
 * geänderte Elementzahl macht ein abgeschlossenes Spiel weder "neu abgeschlossen" noch wieder "offen".
 */
async function aktualisiereFortschritt<S>(
  db: Database,
  userId: string,
  gameId: string,
  lesen: (raw: unknown) => S,
  aendern: (state: S) => boolean,
): Promise<S> {
  return db.transaction(async (tx) => {
    await tx
      .insert(gameProgress)
      .values({ userId, gameId, state: {}, completedAt: null, updatedAt: new Date() })
      .onConflictDoNothing({ target: [gameProgress.userId, gameProgress.gameId] });
    const [row] = await tx
      .select({ id: gameProgress.id, state: gameProgress.state, completedAt: gameProgress.completedAt })
      .from(gameProgress)
      .where(and(eq(gameProgress.userId, userId), eq(gameProgress.gameId, gameId)))
      .for("update");
    const state = lesen(row!.state);
    const abgeschlossen = aendern(state);
    await tx
      .update(gameProgress)
      .set({ state: state as object, completedAt: row!.completedAt ?? (abgeschlossen ? new Date() : null), updatedAt: new Date() })
      .where(eq(gameProgress.id, row!.id));
    return state;
  });
}

// ---------------------------------------------------------------------------
// Kreuzworträtsel „Finanzkennzahlen" (F-141)
// ---------------------------------------------------------------------------

interface KreuzwortraetselProgressState {
  variant: KreuzwortraetselVariant | null;
  solvedWordNumbers: number[];
  /** F-193: Seed des aktuellen Rätsels (Auswahl und Anordnung der Wörter); fehlt bei Spielständen vor F-193 (dann bleibt das alte Gitter). */
  seed?: number;
}

function parseKreuzwortraetselState(raw: unknown): KreuzwortraetselProgressState {
  const state = (raw ?? {}) as Partial<KreuzwortraetselProgressState>;
  return { variant: state.variant ?? null, solvedWordNumbers: state.solvedWordNumbers ?? [], seed: state.seed };
}

// ---------------------------------------------------------------------------
// Kennzahlen-Duell „Qualitätsmanagement und Prozesse" (F-142)
// ---------------------------------------------------------------------------

interface KennzahlenDuellProgressState {
  completedQuestionNumbers: number[];
}

function parseKennzahlenDuellState(raw: unknown): KennzahlenDuellProgressState {
  const state = (raw ?? {}) as Partial<KennzahlenDuellProgressState>;
  return { completedQuestionNumbers: state.completedQuestionNumbers ?? [] };
}

// ---------------------------------------------------------------------------
// Kennzahlen-Memory „Personal" (F-143)
// ---------------------------------------------------------------------------

interface MemoryProgressState {
  completedRoundNumbers: number[];
}

function parseMemoryState(raw: unknown): MemoryProgressState {
  const state = (raw ?? {}) as Partial<MemoryProgressState>;
  return { completedRoundNumbers: state.completedRoundNumbers ?? [] };
}

// ---------------------------------------------------------------------------
// F-158: weitere Spiele
// ---------------------------------------------------------------------------

interface SolvedListState {
  solvedNumbers: number[];
}

function parseSolvedListState(raw: unknown): SolvedListState {
  const state = (raw ?? {}) as Partial<SolvedListState>;
  return { solvedNumbers: state.solvedNumbers ?? [] };
}

/** Gemeinsamer Ablauf der vier inhaltsbasierten Spiele: Spielstand (gelöste Nummern) fortschreiben. */
async function recordListResult(
  ctx: { db: Database; currentUser: { id: string } },
  gameId: string,
  nummer: number,
  total: number,
  correct: boolean,
): Promise<void> {
  if (correct) {
    await aktualisiereFortschritt(ctx.db, ctx.currentUser.id, gameId, parseSolvedListState, (state) => {
      if (!state.solvedNumbers.includes(nummer)) state.solvedNumbers.push(nummer);
      return state.solvedNumbers.length >= total;
    });
  }
}

interface SprintProgressState {
  bestwerte: Record<string, { richtig: number; gesamt: number }>;
}

function parseSprintState(raw: unknown): SprintProgressState {
  const state = (raw ?? {}) as Partial<SprintProgressState>;
  return { bestwerte: state.bestwerte ?? {} };
}

type SprintTokenPayload =
  | { g: "subnetting"; params: SubnettingParams; s: string }
  | { g: "zahlensysteme"; params: ZahlensystemParams; s: string }
  | { g: "rechensprint"; params: RechenParams; s: string };

/** Gemeinsame Form der drei Sprint-Payloads (Aufgabenarten, Anzahl, Abschlussmeldung). */
interface SprintPayload {
  aufgabenTypen: string[];
  anzahl: number;
  abschlussmeldung: string;
}

function parseSprintPayload(gameType: SprintGameType, raw: unknown): SprintPayload {
  const schema = gameType === "subnetting" ? subnettingPayloadSchema : gameType === "zahlensysteme" ? zahlensystemePayloadSchema : rechensprintPayloadSchema;
  return schema.parse(raw);
}

function erzeugeSprintAufgabe(
  gameType: SprintGameType,
  typ: string,
  schwierigkeit: SprintSchwierigkeit,
  rng: () => number,
): { tokenPayload: SprintTokenPayload; frage: string; hinweis: string } {
  if (gameType === "subnetting") {
    const params = erzeugeSubnettingAufgabe(typ as SubnettingTyp, schwierigkeit, rng);
    return { tokenPayload: { g: "subnetting", params, s: schwierigkeit }, ...subnettingFrage(params) };
  }
  if (gameType === "zahlensysteme") {
    const params = erzeugeZahlensystemAufgabe(typ as ZahlensystemTyp, schwierigkeit, rng);
    return { tokenPayload: { g: "zahlensysteme", params, s: schwierigkeit }, ...zahlensystemFrage(params) };
  }
  const params = erzeugeRechenAufgabe(typ as RechenTyp, schwierigkeit, rng);
  return { tokenPayload: { g: "rechensprint", params, s: schwierigkeit }, ...rechenFrage(params) };
}

function pruefeSprintAntwort(decoded: SprintTokenPayload, eingabe: string): { correct: boolean; erwartet: string; erklaerung: string } {
  switch (decoded.g) {
    case "subnetting":
      return { correct: pruefeSubnettingEingabe(decoded.params, eingabe), ...subnettingLoesung(decoded.params) };
    case "zahlensysteme":
      return { correct: pruefeZahlensystemEingabe(decoded.params, eingabe), ...zahlensystemLoesung(decoded.params) };
    case "rechensprint": {
      const { erwartet, erklaerung } = rechenLoesung(decoded.params);
      return { correct: pruefeRechenEingabe(decoded.params, eingabe), erwartet, erklaerung };
    }
  }
}

/** Code- und Prozess-Reihenfolge teilen Mischen, Prüfen und Spielstand; nur das Payload unterscheidet sich. */
function parseReihenfolgePayload(gameType: ReihenfolgeGameType, raw: unknown): CodeReihenfolgePayload {
  return gameType === "prozessreihenfolge" ? prozessAlsReihenfolge(prozessReihenfolgePayloadSchema.parse(raw)) : codeReihenfolgePayloadSchema.parse(raw);
}

export const gameRouter = router({
  /** Für den Spiele-Katalog (Spiele.tsx, analog zu instrumentLernpfad.available): welche der
   * drei Spiele in diesem Kurs aktiven Content haben (z. B. hat der Mathe-Kurs aktuell keinen). */
  available: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    return ctx.db
      .select({ gameType: game.gameType, setKey: game.setKey, title: game.title })
      .from(game)
      .where(and(eq(game.kursId, input.kursId), eq(game.isActive, true)))
      .orderBy(game.createdAt);
  }),

  getKreuzwortraetsel: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel", input.setKey);
    const payload = kreuzwortraetselPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseKreuzwortraetselState(progressRow?.state);
    const puzzle = buildKreuzwortraetselPuzzle(payload, state.seed);

    return {
      variant: state.variant,
      woerter: shapeKreuzwortraetsel(puzzle, state.solvedWordNumbers),
      wordBank: state.variant === "einfach" ? buildKreuzwortraetselWordBank(puzzle, state.solvedWordNumbers) : null,
      falschEinfachFeedback: payload.falschEinfachFeedback,
      falschAnspruchsvollFeedback: payload.falschAnspruchsvollFeedback,
      unvollstaendigFeedback: payload.unvollstaendigFeedback,
      abschlussmeldung: payload.abschlussmeldung,
      abgeschlossen: !!progressRow?.completedAt,
    };
  }),

  /** Setzt/ändert die gewählte Schwierigkeitsstufe — startet dabei bewusst den bisherigen
   * Rätsel-Fortschritt dieses Kurses neu (Spezifikation: "Ein erneuter Start setzt die
   * Eingaben und die gesperrten Wörter dieses Rätseldurchlaufs zurück"). */
  startKreuzwortraetsel: protectedProcedure.input(startKreuzwortraetselInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel", input.setKey);
    // F-193: Jeder Start zieht einen neuen Seed — Auswahl und Anordnung der Wörter ändern sich, das Rätsel ist wiederspielbar.
    await upsertProgress(ctx.db, ctx.currentUser.id, row.id, { variant: input.variant, solvedWordNumbers: [], seed: randomSeed() }, null);
    return { success: true };
  }),

  submitKreuzwortraetselWort: protectedProcedure.input(submitKreuzwortraetselWortInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel", input.setKey);
    const payload = kreuzwortraetselPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseKreuzwortraetselState(progressRow?.state);
    const puzzle = buildKreuzwortraetselPuzzle(payload, state.seed);
    const result = checkKreuzwortraetselWort(puzzle, input.nummer, input.eingabe);

    if (result.correct) {
      // Der Seed ist Teil des Zustands und ändert sich nur beim Neustart; die Wörterzahl des Rätsels steht oben fest.
      await aktualisiereFortschritt(ctx.db, ctx.currentUser.id, row.id, parseKreuzwortraetselState, (aktuell) => {
        if (!aktuell.solvedWordNumbers.includes(input.nummer)) {
          aktuell.solvedWordNumbers.push(input.nummer);
        }
        return aktuell.solvedWordNumbers.length >= puzzle.woerter.length;
      });
    }

    return result;
  }),

  getKennzahlenDuell: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kennzahlen_duell", input.setKey);
    const payload = kennzahlenDuellPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseKennzahlenDuellState(progressRow?.state);

    return {
      runden: payload.runden,
      fragen: shapeKennzahlenDuell(payload, state.completedQuestionNumbers),
      abschlussmeldung: payload.abschlussmeldung,
      abgeschlossen: !!progressRow?.completedAt,
    };
  }),

  submitKennzahlenDuellAntwort: protectedProcedure.input(submitKennzahlenDuellAntwortInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kennzahlen_duell", input.setKey);
    const payload = kennzahlenDuellPayloadSchema.parse(row.payload);
    const result = checkKennzahlenDuellAntwort(payload, input.nummer, input.ausgewaehlt);

    if (result.correct) {
      await aktualisiereFortschritt(ctx.db, ctx.currentUser.id, row.id, parseKennzahlenDuellState, (state) => {
        if (!state.completedQuestionNumbers.includes(input.nummer)) {
          state.completedQuestionNumbers.push(input.nummer);
        }
        return state.completedQuestionNumbers.length >= payload.fragen.length;
      });
    }

    return result;
  }),

  getMemory: protectedProcedure.input(memoryRundeInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory", input.setKey);
    const payload = memoryPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseMemoryState(progressRow?.state);

    return {
      runden: payload.runden,
      karten: shapeMemoryRunde(payload, input.runde, input.seed),
      falschesPaarFeedback: payload.falschesPaarFeedback,
      abschlussmeldung: payload.abschlussmeldung,
      abgeschlosseneRunden: state.completedRoundNumbers,
      abgeschlossen: !!progressRow?.completedAt,
    };
  }),

  submitMemoryPaar: protectedProcedure.input(submitMemoryPaarInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory", input.setKey);
    const payload = memoryPayloadSchema.parse(row.payload);
    const result = checkMemoryPaar(payload, input.runde, input.textA, input.textB);

    return result;
  }),

  /** Client-gemeldeter Rundenabschluss (alle Paare dieser Runde in der aktuellen Sitzung
   * gefunden) — bewusst ohne serverseitige Nachprüfung der einzelnen Paare: Belohnungen gibt es für
   * Spiele nicht (seit 06.10.2026), dieser Aufruf dient ausschließlich dem Fortschritts-Fortsetzen
   * ("Fortschritt: Die Anwendung speichert abgeschlossene Runden") — ein fälschlich gemeldeter
   * Abschluss hat keine Gamification-Konsequenz. */
  completeMemoryRound: protectedProcedure.input(memoryRundeInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory", input.setKey);
    const payload = memoryPayloadSchema.parse(row.payload);
    // Review LOG-15: nur Runden, die es in diesem Satz gibt; abgeschlossen ist das Spiel, wenn jede vorhandene Runde gemeldet
    // wurde (nicht, wenn die Anzahl zufällig stimmt).
    const runden = new Set(payload.paare.map((paar) => paar.runde));
    if (!runden.has(input.runde)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Diese Runde gibt es in diesem Spiel nicht." });
    }
    await aktualisiereFortschritt(ctx.db, ctx.currentUser.id, row.id, parseMemoryState, (state) => {
      if (!state.completedRoundNumbers.includes(input.runde)) {
        state.completedRoundNumbers.push(input.runde);
      }
      return [...runden].every((runde) => state.completedRoundNumbers.includes(runde));
    });

    return { success: true };
  }),

  // -------------------------------------------------------------------------
  // Phishing-Detektiv
  // -------------------------------------------------------------------------

  getPhishing: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "phishing", input.setKey);
    const payload = phishingPayloadSchema.parse(row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { mails: shapePhishing(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitPhishing: protectedProcedure.input(submitPhishingInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "phishing", input.setKey);
    const payload = phishingPayloadSchema.parse(row.payload);
    const result = checkPhishing(payload, input.nummer, input.markiert, input.urteil);
    await recordListResult(ctx, row.id, input.nummer, payload.mails.length, result.correct);
    return result;
  }),

  // -------------------------------------------------------------------------
  // Beleg-Detektiv (F-196)
  // -------------------------------------------------------------------------

  getBeleg: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "belegdetektiv", input.setKey);
    const payload = belegPayloadSchema.parse(row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { belege: shapeBelege(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitBeleg: protectedProcedure.input(submitBelegInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "belegdetektiv", input.setKey);
    const payload = belegPayloadSchema.parse(row.payload);
    const result = checkBeleg(payload, input.nummer, input.markiert, input.urteil);
    await recordListResult(ctx, row.id, input.nummer, payload.belege.length, result.correct);
    return result;
  }),

  // -------------------------------------------------------------------------
  // Bug-Hunt
  // -------------------------------------------------------------------------

  getBugHunt: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "bughunt", input.setKey);
    const payload = bugHuntPayloadSchema.parse(row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { aufgaben: shapeBugHunt(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitBugHunt: protectedProcedure.input(submitBugHuntInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "bughunt", input.setKey);
    const payload = bugHuntPayloadSchema.parse(row.payload);
    const result = checkBugHunt(payload, input.nummer, input.zeile);
    await recordListResult(ctx, row.id, input.nummer, payload.aufgaben.length, result.correct);
    return result;
  }),

  // -------------------------------------------------------------------------
  // Code-Reihenfolge und Prozess-Reihenfolge (F-195)
  // -------------------------------------------------------------------------

  getReihenfolge: protectedProcedure.input(reihenfolgeKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const payload = parseReihenfolgePayload(input.gameType, row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { aufgaben: shapeCodeReihenfolge(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitReihenfolge: protectedProcedure.input(submitReihenfolgeInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const payload = parseReihenfolgePayload(input.gameType, row.payload);
    let result;
    try {
      result = checkCodeReihenfolge(payload, input.nummer, input.reihenfolge);
    } catch {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Ungültige Reihenfolge." });
    }
    await recordListResult(ctx, row.id, input.nummer, payload.aufgaben.length, result.correct);
    return result;
  }),

  // -------------------------------------------------------------------------
  // Netzwerk-Troubleshooting-Detektiv
  // -------------------------------------------------------------------------

  getTroubleshooting: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "troubleshooting", input.setKey);
    const payload = troubleshootingPayloadSchema.parse(row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { faelle: shapeTroubleshooting(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitTroubleshooting: protectedProcedure.input(submitTroubleshootingInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "troubleshooting", input.setKey);
    const payload = troubleshootingPayloadSchema.parse(row.payload);
    const result = checkTroubleshooting(payload, input.nummer, input.schritt, input.antwort);
    // Spielstand (gelöst) erst nach der richtigen Ursache (Schritt 2).
    if (input.schritt === 2) {
      await recordListResult(ctx, row.id, input.nummer, payload.faelle.length, result.correct);
    }
    return result;
  }),

  // -------------------------------------------------------------------------
  // Subnetting-/Zahlensystem-Sprint (serverseitig erzeugte Aufgaben)
  // -------------------------------------------------------------------------

  getSprint: protectedProcedure
    .input(sprintStartInputSchema.pick({ kursId: true, setKey: true, gameType: true }))
    .query(async ({ ctx, input }) => {
      const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
      const payload = parseSprintPayload(input.gameType, row.payload);
      const state = parseSprintState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
      return { anzahl: payload.anzahl, abschlussmeldung: payload.abschlussmeldung, bestwerte: state.bestwerte };
    }),

  sprintStart: protectedProcedure.input(sprintStartInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const { randomInt } = await import("node:crypto");
    const rng = () => randomInt(0, 1_000_000) / 1_000_000;
    const payload = parseSprintPayload(input.gameType, row.payload);
    const aufgaben = Array.from({ length: payload.anzahl }, () => {
      const typ = payload.aufgabenTypen[Math.floor(rng() * payload.aufgabenTypen.length)]!;
      const { tokenPayload, frage, hinweis } = erzeugeSprintAufgabe(input.gameType, typ, input.schwierigkeit, rng);
      return { token: signSprintToken(tokenPayload), frage, hinweis, typ };
    });
    return { aufgaben };
  }),

  sprintAntwort: protectedProcedure.input(sprintAntwortInputSchema).mutation(async ({ ctx, input }) => {
    await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const decoded = verifySprintToken(input.token) as SprintTokenPayload | null;
    if (!decoded || decoded.g !== input.gameType) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Die Aufgabe ist ungültig oder abgelaufen. Starte den Sprint neu." });
    }
    return pruefeSprintAntwort(decoded, input.eingabe);
  }),

  /** Client-gemeldetes Ergebnis eines Sprints — nur Bestwert-Anzeige (eigener Spielstand), keine Belohnung. */
  sprintAbschluss: protectedProcedure.input(sprintAbschlussInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    // Review LOG-15: Ein Sprint hat genau `anzahl` Aufgaben; "1 von 1" (100 %) lässt sich so nicht mehr als Bestwert melden.
    const payload = parseSprintPayload(input.gameType, row.payload);
    if (input.gesamt !== payload.anzahl || input.richtig > input.gesamt) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Das Ergebnis passt nicht zu diesem Sprint." });
    }
    const state = await aktualisiereFortschritt(ctx.db, ctx.currentUser.id, row.id, parseSprintState, (aktuell) => {
      const vorher = aktuell.bestwerte[input.schwierigkeit];
      if (!vorher || input.richtig / input.gesamt > vorher.richtig / vorher.gesamt) {
        aktuell.bestwerte[input.schwierigkeit] = { richtig: input.richtig, gesamt: input.gesamt };
      }
      return true;
    });
    return { bestwert: state.bestwerte[input.schwierigkeit]! };
  }),
});
