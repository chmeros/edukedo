import {
  buildKreuzwortraetselWordBank,
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
import { recordGameAttempt } from "./progress";
import type { Database } from "../../db/client";
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

async function loadGame(db: Database, userId: string, kursId: string, gameType: string) {
  const [row] = await db
    .select({ id: game.id, payload: game.payload })
    .from(game)
    .where(and(eq(game.kursId, kursId), eq(game.gameType, gameType), eq(game.isActive, true)))
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
}

function parseKreuzwortraetselState(raw: unknown): KreuzwortraetselProgressState {
  const state = (raw ?? {}) as Partial<KreuzwortraetselProgressState>;
  return { variant: state.variant ?? null, solvedWordNumbers: state.solvedWordNumbers ?? [] };
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

export const gameRouter = router({
  /** Für den Spiele-Katalog (Spiele.tsx, analog zu instrumentLernpfad.available): welche der
   * drei Spiele in diesem Kurs aktiven Content haben (z. B. hat der Mathe-Kurs aktuell keinen). */
  available: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    return ctx.db
      .select({ gameType: game.gameType, title: game.title })
      .from(game)
      .where(and(eq(game.kursId, input.kursId), eq(game.isActive, true)));
  }),

  getKreuzwortraetsel: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel");
    const payload = kreuzwortraetselPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseKreuzwortraetselState(progressRow?.state);

    return {
      variant: state.variant,
      woerter: shapeKreuzwortraetsel(payload, state.solvedWordNumbers),
      wordBank: state.variant === "einfach" ? buildKreuzwortraetselWordBank(payload, state.solvedWordNumbers) : null,
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
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel");
    await upsertProgress(ctx.db, ctx.currentUser.id, row.id, { variant: input.variant, solvedWordNumbers: [] }, null);
    return { success: true };
  }),

  submitKreuzwortraetselWort: protectedProcedure.input(submitKreuzwortraetselWortInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kreuzwortraetsel");
    const payload = kreuzwortraetselPayloadSchema.parse(row.payload);
    const result = checkKreuzwortraetselWort(payload, input.nummer, input.eingabe);

    if (result.correct) {
      const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
      const state = parseKreuzwortraetselState(progressRow?.state);
      if (!state.solvedWordNumbers.includes(input.nummer)) {
        state.solvedWordNumbers.push(input.nummer);
      }
      const completed = state.solvedWordNumbers.length === payload.woerter.length;
      await upsertProgress(ctx.db, ctx.currentUser.id, row.id, state, completed ? new Date() : null);
    }
    await recordGameAttempt(ctx.db, ctx.currentUser.id, `kreuzwortraetsel:${input.kursId}:${input.nummer}`, result.correct, "leicht");

    return result;
  }),

  getKennzahlenDuell: protectedProcedure.input(gameKursInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kennzahlen_duell");
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
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "kennzahlen_duell");
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
    await recordGameAttempt(ctx.db, ctx.currentUser.id, `kennzahlen_duell:${input.kursId}:${input.nummer}`, result.correct, "mittel");

    return result;
  }),

  getMemory: protectedProcedure.input(memoryRundeInputSchema).query(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory");
    const payload = memoryPayloadSchema.parse(row.payload);
    const progressRow = await loadProgressRow(ctx.db, ctx.currentUser.id, row.id);
    const state = parseMemoryState(progressRow?.state);

    return {
      runden: payload.runden,
      karten: shapeMemoryRunde(payload, input.runde),
      falschesPaarFeedback: payload.falschesPaarFeedback,
      abschlussmeldung: payload.abschlussmeldung,
      abgeschlosseneRunden: state.completedRoundNumbers,
      abgeschlossen: !!progressRow?.completedAt,
    };
  }),

  submitMemoryPaar: protectedProcedure.input(submitMemoryPaarInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory");
    const payload = memoryPayloadSchema.parse(row.payload);
    const result = checkMemoryPaar(payload, input.runde, input.textA, input.textB);

    // Anders als beim Kreuzworträtsel/Kennzahlen-Duell gibt es für eine FALSCHE Kombination
    // keine sinnvolle einzelne gameItemKey (zwei aufgedeckte Karten gehören zu zwei
    // UNTERSCHIEDLICHEN Paaren) — recordGameAttempt wird deshalb bewusst nur bei einem
    // tatsächlichen Treffer aufgerufen, keyed über die zugehörige Paar-Nummer.
    if (result.correct) {
      const paar = payload.paare.find(
        (candidate) => candidate.runde === input.runde && (candidate.begriff === input.textA || candidate.bedeutung === input.textA),
      )!;
      await recordGameAttempt(ctx.db, ctx.currentUser.id, `memory:${input.kursId}:${paar.nummer}`, true, "leicht");
    }

    return result;
  }),

  /** Client-gemeldeter Rundenabschluss (alle Paare dieser Runde in der aktuellen Sitzung
   * gefunden) — bewusst ohne serverseitige Nachprüfung der einzelnen Paare: die
   * Punktehamster-/Credit-Vergabe ist bereits über `submitMemoryPaar` pro echtem Treffer
   * serverseitig abgesichert, dieser Aufruf dient ausschließlich dem Fortschritts-Fortsetzen
   * ("Fortschritt: Die Anwendung speichert abgeschlossene Runden") — ein fälschlich gemeldeter
   * Abschluss hat keine Gamification-Konsequenz. */
  completeMemoryRound: protectedProcedure.input(memoryRundeInputSchema).mutation(async ({ ctx, input }) => {
    const row = await loadGame(ctx.db, ctx.currentUser.id, input.kursId, "memory");
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
});
