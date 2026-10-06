import {
  bugHuntPayloadSchema,
  checkBugHunt,
  checkCodeReihenfolge,
  checkPhishing,
  checkTroubleshooting,
  codeReihenfolgePayloadSchema,
  DEFAULT_GAME_SET_KEY,
  erzeugeSubnettingAufgabe,
  erzeugeZahlensystemAufgabe,
  phishingPayloadSchema,
  pruefeSubnettingEingabe,
  pruefeZahlensystemEingabe,
  shapeBugHunt,
  shapeCodeReihenfolge,
  shapePhishing,
  shapeTroubleshooting,
  sprintAbschlussInputSchema,
  sprintAntwortInputSchema,
  sprintStartInputSchema,
  submitBugHuntInputSchema,
  submitCodeReihenfolgeInputSchema,
  submitPhishingInputSchema,
  submitTroubleshootingInputSchema,
  subnettingFrage,
  subnettingLoesung,
  subnettingPayloadSchema,
  troubleshootingPayloadSchema,
  zahlensystemFrage,
  zahlensystemLoesung,
  zahlensystemePayloadSchema,
  type SubnettingParams,
  type ZahlensystemParams,
  buildKreuzwortraetselPuzzle,
  buildKreuzwortraetselWordBank,
  randomSeed,
  checkKennzahlenDuellAntwort,
  checkKreuzwortraetselWort,
  checkMemoryPaar,
  gameKursInputSchema,
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
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, gameId);
    const state = parseSolvedListState(progressRow?.state);
    if (!state.solvedNumbers.includes(nummer)) state.solvedNumbers.push(nummer);
    await upsertProgress(ctx.db, ctx.currentUser.id, gameId, state, state.solvedNumbers.length === total ? new Date() : null);
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
  | { g: "zahlensysteme"; params: ZahlensystemParams; s: string };

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
      if (!state.solvedWordNumbers.includes(input.nummer)) {
        state.solvedWordNumbers.push(input.nummer);
      }
      const completed = state.solvedWordNumbers.length === puzzle.woerter.length;
      await upsertProgress(ctx.db, ctx.currentUser.id, row.id, state, completed ? new Date() : null);
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
      const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
      const state = parseKennzahlenDuellState(progressRow?.state);
      if (!state.completedQuestionNumbers.includes(input.nummer)) {
        state.completedQuestionNumbers.push(input.nummer);
      }
      const completed = state.completedQuestionNumbers.length === payload.fragen.length;
      await upsertProgress(ctx.db, ctx.currentUser.id, row.id, state, completed ? new Date() : null);
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
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseMemoryState(progressRow?.state);

    if (!state.completedRoundNumbers.includes(input.runde)) {
      state.completedRoundNumbers.push(input.runde);
    }
    const totalRounds = new Set(payload.paare.map((paar) => paar.runde)).size;
    const completed = state.completedRoundNumbers.length === totalRounds;
    await upsertProgress(ctx.db, ctx.currentUser.id, row.id, state, completed ? new Date() : null);

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
  // Code-Reihenfolge
  // -------------------------------------------------------------------------

  getCodeReihenfolge: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "codereihenfolge", input.setKey);
    const payload = codeReihenfolgePayloadSchema.parse(row.payload);
    const state = parseSolvedListState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
    return { aufgaben: shapeCodeReihenfolge(payload, state.solvedNumbers), abschlussmeldung: payload.abschlussmeldung };
  }),

  submitCodeReihenfolge: protectedProcedure.input(submitCodeReihenfolgeInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "codereihenfolge", input.setKey);
    const payload = codeReihenfolgePayloadSchema.parse(row.payload);
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
      const payload = (input.gameType === "subnetting" ? subnettingPayloadSchema : zahlensystemePayloadSchema).parse(row.payload);
      const state = parseSprintState((await loadProgressRow(ctx.db, ctx.currentUser.id, row.id))?.state);
      return { anzahl: payload.anzahl, abschlussmeldung: payload.abschlussmeldung, bestwerte: state.bestwerte };
    }),

  sprintStart: protectedProcedure.input(sprintStartInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const { randomInt } = await import("node:crypto");
    const rng = () => randomInt(0, 1_000_000) / 1_000_000;
    if (input.gameType === "subnetting") {
      const payload = subnettingPayloadSchema.parse(row.payload);
      const aufgaben = Array.from({ length: payload.anzahl }, () => {
        const typ = payload.aufgabenTypen[Math.floor(rng() * payload.aufgabenTypen.length)]!;
        const params = erzeugeSubnettingAufgabe(typ, input.schwierigkeit, rng);
        const { frage, hinweis } = subnettingFrage(params);
        const tokenPayload: SprintTokenPayload = { g: "subnetting", params, s: input.schwierigkeit };
        return { token: signSprintToken(tokenPayload), frage, hinweis, typ };
      });
      return { aufgaben };
    }
    const payload = zahlensystemePayloadSchema.parse(row.payload);
    const aufgaben = Array.from({ length: payload.anzahl }, () => {
      const typ = payload.aufgabenTypen[Math.floor(rng() * payload.aufgabenTypen.length)]!;
      const params = erzeugeZahlensystemAufgabe(typ, input.schwierigkeit, rng);
      const { frage, hinweis } = zahlensystemFrage(params);
      const tokenPayload: SprintTokenPayload = { g: "zahlensysteme", params, s: input.schwierigkeit };
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
    const loesung = decoded.g === "subnetting" ? subnettingLoesung(decoded.params) : zahlensystemLoesung(decoded.params);
    const correct =
      decoded.g === "subnetting" ? pruefeSubnettingEingabe(decoded.params, input.eingabe) : pruefeZahlensystemEingabe(decoded.params, input.eingabe);
    return { correct, erwartet: loesung.erwartet, erklaerung: loesung.erklaerung };
  }),

  /** Client-gemeldetes Ergebnis eines Sprints — nur Bestwert-Anzeige (eigener Spielstand), keine Belohnung. */
  sprintAbschluss: protectedProcedure.input(sprintAbschlussInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, input.gameType, input.setKey);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseSprintState(progressRow?.state);
    const vorher = state.bestwerte[input.schwierigkeit];
    const richtig = Math.min(input.richtig, input.gesamt);
    if (!vorher || richtig / input.gesamt > vorher.richtig / vorher.gesamt) {
      state.bestwerte[input.schwierigkeit] = { richtig, gesamt: input.gesamt };
    }
    await upsertProgress(ctx.db, ctx.currentUser.id, row.id, state, progressRow?.completedAt ?? new Date());
    return { bestwert: state.bestwerte[input.schwierigkeit]! };
  }),
});
