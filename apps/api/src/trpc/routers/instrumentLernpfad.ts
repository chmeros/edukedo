import {
  checkLernpfadGepoolteZoneItem,
  checkLernpfadPoolItem,
  checkLernpfadSortieren,
  checkLernpfadWissensfrage,
  checkLernpfadZoneItem,
  instrumentLernpfadPayloadSchema,
  LernpfadItemNotFoundError,
  lernpfadInputSchema,
  lernpfadSubmitPoolItemInputSchema,
  lernpfadSubmitSelbsteinschaetzungInputSchema,
  lernpfadSubmitSortierenInputSchema,
  lernpfadSubmitWissensfrageInputSchema,
  lernpfadSubmitZoneItemInputSchema,
  selectLernpfadGepoolteRunden,
  shapeLernpfadPoolRound,
  shapeLernpfadSortierAufgabe,
  shapeLernpfadWissensfrage,
  shapeLernpfadZoneItems,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import type { Database } from "../../db/client";
import { instrumentLernpfad, instrumentLernpfadSelbsteinschaetzung, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-129/F-130/F-131 (Nutzer-Vorgabe vom 24.09.2026, siehe packages/shared/src/schemas/
 * instrument-lernpfad.ts für die vollständige Konzept-Dokumentation und Architekturplanung
 * Abschnitt 13 für die technischen Entscheidungen): Instrumenten-Lernpfad — geführter,
 * mehrstufiger Lern-/Übungsdurchgang je Instrument, kostenpflichtiger erweiterter Content-Umfang
 * (F-130, `user.instrument_lernpfade_enabled`). `get` liefert IMMER nur die lösungsfreie
 * Anzeigeform (nie `isCorrect`/`feedback`/`zoneKey` vorab), jeder `submit*`-Aufruf prüft genau
 * EIN einzelnes Element gegen das serverseitig geladene Payload und gibt nur dessen Ergebnis
 * zurück — siehe Moduldoku in instrument-lernpfad-logic.ts zum "Sofort"-Interaktionsmuster.
 */

async function loadLernpfadForUser(db: Database, userId: string, lernpfadId: string) {
  const [row] = await db
    .select({
      id: instrumentLernpfad.id,
      kursId: instrumentLernpfad.kursId,
      isActive: instrumentLernpfad.isActive,
      payload: instrumentLernpfad.payload,
    })
    .from(instrumentLernpfad)
    .where(eq(instrumentLernpfad.id, lernpfadId))
    .limit(1);

  if (!row || !row.isActive) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Lernpfad wurde nicht gefunden." });
  }

  const [enrolled] = await db
    .select({ id: userCourse.id })
    .from(userCourse)
    .where(and(eq(userCourse.userId, userId), eq(userCourse.kursId, row.kursId)))
    .limit(1);
  if (!enrolled) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Du bist in diesem Kurs nicht eingeschrieben." });
  }

  return { ...row, payload: instrumentLernpfadPayloadSchema.parse(row.payload) };
}

function requireLernpfadeEnabled(instrumentLernpfadeEnabled: boolean) {
  if (!instrumentLernpfadeEnabled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Instrumenten-Lernpfade sind für dein Konto nicht freigeschaltet.",
    });
  }
}

export const instrumentLernpfadRouter = router({
  /**
   * F-105-Abgrenzung (siehe Anforderungskatalog): liefert je Kurs, welche Instrumente einen
   * Lernpfad HABEN (unabhängig von der Freischaltung — Instrumente.tsx zeigt bei fehlender
   * Freischaltung einen Hinweis statt den Link einfach zu verstecken), für den Katalog im Tab
   * "Instrumente".
   */
  available: protectedProcedure.input(lernpfadInputSchema.pick({ kursId: true })).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({ instrumentType: instrumentLernpfad.instrumentType, title: instrumentLernpfad.title })
      .from(instrumentLernpfad)
      .where(and(eq(instrumentLernpfad.kursId, input.kursId), eq(instrumentLernpfad.isActive, true)));
    return rows;
  }),

  get: protectedProcedure.input(lernpfadInputSchema).query(async ({ ctx, input }) => {
    requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);

    const [row] = await ctx.db
      .select({
        id: instrumentLernpfad.id,
        title: instrumentLernpfad.title,
        payload: instrumentLernpfad.payload,
      })
      .from(instrumentLernpfad)
      .where(
        and(
          eq(instrumentLernpfad.kursId, input.kursId),
          eq(instrumentLernpfad.instrumentType, input.instrumentType),
          eq(instrumentLernpfad.isActive, true),
        ),
      )
      .limit(1);
    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Für dieses Instrument ist in diesem Kurs kein Lernpfad hinterlegt." });
    }

    const [enrolled] = await ctx.db
      .select({ id: userCourse.id })
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);
    if (!enrolled) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Du bist in diesem Kurs nicht eingeschrieben." });
    }

    const payload = instrumentLernpfadPayloadSchema.parse(row.payload);

    const [previous] = await ctx.db
      .select({ rating: instrumentLernpfadSelbsteinschaetzung.rating })
      .from(instrumentLernpfadSelbsteinschaetzung)
      .where(
        and(
          eq(instrumentLernpfadSelbsteinschaetzung.userId, ctx.currentUser.id),
          eq(instrumentLernpfadSelbsteinschaetzung.instrumentLernpfadId, row.id),
        ),
      )
      .limit(1);

    return {
      id: row.id,
      title: row.title,
      organisation: payload.organisation,
      vision: payload.vision,
      fallbeispielIntro: payload.fallbeispielIntro,
      grundlagenfragen: {
        intro: payload.grundlagenfragen.intro,
        questions: payload.grundlagenfragen.questions.map(shapeLernpfadWissensfrage),
      },
      strukturErkennen: {
        prompt: payload.strukturErkennen.prompt,
        round: shapeLernpfadPoolRound(payload.strukturErkennen.rounds[0]!),
      },
      zieleZuordnen: {
        prompt: payload.zieleZuordnen.prompt,
        zones: payload.zieleZuordnen.zones,
        items: shapeLernpfadZoneItems(payload.zieleZuordnen.items),
      },
      messbareZieleZuordnen: {
        prompt: payload.messbareZieleZuordnen.prompt,
        zones: payload.messbareZieleZuordnen.zones,
        kernRunden: selectLernpfadGepoolteRunden(payload.messbareZieleZuordnen, false),
        extraRunden: selectLernpfadGepoolteRunden(payload.messbareZieleZuordnen, true),
      },
      massnahmenWahl: {
        prompt: payload.massnahmenWahl.prompt,
        rounds: payload.massnahmenWahl.rounds.map(shapeLernpfadPoolRound),
      },
      zusammenhaenge: {
        intro: payload.zusammenhaenge.intro,
        questions: payload.zusammenhaenge.questions.map(shapeLernpfadWissensfrage),
      },
      wirkungsketten: {
        intro: payload.wirkungsketten.intro,
        tasks: payload.wirkungsketten.tasks.map((task) => ({
          prompt: task.prompt,
          items: shapeLernpfadSortierAufgabe(task.items),
        })),
      },
      selbsteinschaetzungPrompt: payload.selbsteinschaetzungPrompt,
      previousSelbsteinschaetzung: previous?.rating ?? null,
    };
  }),

  submitWissensfrage: protectedProcedure.input(lernpfadSubmitWissensfrageInputSchema).mutation(async ({ ctx, input }) => {
    requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);
    const { payload } = await loadLernpfadForUser(ctx.db, ctx.currentUser.id, input.lernpfadId);
    const question = payload[input.station].questions[input.questionIndex];
    if (!question) {
      throw new LernpfadItemNotFoundError("Frage nicht gefunden.");
    }
    return checkLernpfadWissensfrage(question, input.optionTexts, input.selectedIndices);
  }),

  submitPoolItem: protectedProcedure.input(lernpfadSubmitPoolItemInputSchema).mutation(async ({ ctx, input }) => {
    requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);
    const { payload } = await loadLernpfadForUser(ctx.db, ctx.currentUser.id, input.lernpfadId);
    const round = payload[input.station].rounds[input.roundIndex];
    if (!round) {
      throw new LernpfadItemNotFoundError("Runde nicht gefunden.");
    }
    return checkLernpfadPoolItem(round, input.itemText);
  }),

  submitZoneItem: protectedProcedure.input(lernpfadSubmitZoneItemInputSchema).mutation(async ({ ctx, input }) => {
    requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);
    const { payload } = await loadLernpfadForUser(ctx.db, ctx.currentUser.id, input.lernpfadId);
    if (input.station === "zieleZuordnen") {
      const station = payload.zieleZuordnen;
      return checkLernpfadZoneItem(station.items, input.itemText, input.zoneKey, station.correctFeedback, station.wrongFeedback);
    }
    return checkLernpfadGepoolteZoneItem(payload.messbareZieleZuordnen, input.itemText, input.zoneKey);
  }),

  submitSortieren: protectedProcedure.input(lernpfadSubmitSortierenInputSchema).mutation(async ({ ctx, input }) => {
    requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);
    const { payload } = await loadLernpfadForUser(ctx.db, ctx.currentUser.id, input.lernpfadId);
    const task = payload.wirkungsketten.tasks[input.taskIndex];
    if (!task) {
      throw new LernpfadItemNotFoundError("Aufgabe nicht gefunden.");
    }
    return checkLernpfadSortieren(task.items, input.shuffledTexts, input.orderedIndices);
  }),

  /**
   * F-129 (Abschluss-Selbsteinschätzung): bewusst ohne jede Korrektheitsprüfung — reines Upsert.
   */
  submitSelbsteinschaetzung: protectedProcedure
    .input(lernpfadSubmitSelbsteinschaetzungInputSchema)
    .mutation(async ({ ctx, input }) => {
      requireLernpfadeEnabled(ctx.currentUser.instrumentLernpfadeEnabled);
      await loadLernpfadForUser(ctx.db, ctx.currentUser.id, input.lernpfadId);

      await ctx.db
        .insert(instrumentLernpfadSelbsteinschaetzung)
        .values({ userId: ctx.currentUser.id, instrumentLernpfadId: input.lernpfadId, rating: input.rating })
        .onConflictDoUpdate({
          target: [instrumentLernpfadSelbsteinschaetzung.userId, instrumentLernpfadSelbsteinschaetzung.instrumentLernpfadId],
          set: { rating: input.rating, updatedAt: new Date() },
        });

      return { success: true };
    }),
});
