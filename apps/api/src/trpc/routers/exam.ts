import { fallaufgabePayloadSchema, finishExamInputSchema, startExamInputSchema, submitExamAnswerInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import {
  contentItem,
  contentItemVersion,
  examAnswer,
  examSession,
  fachgebiet,
  learningEvent,
  thema,
  userCourse,
} from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

const EXAM_MODE = "schriftliche_pruefung";

export const examRouter = router({
  /**
   * F-23: startet eine neue Prüfungssitzung mit je einer zufälligen Fallaufgabe pro
   * Fachgebiet (Handlungsbereich) im Kurs — "situationsbezogene Fallaufgabe über mehrere
   * Fachgebiete" (Anforderungskatalog). Die Zeitbegrenzung ist bewusst rein clientseitig
   * (siehe apps/web/src/Exam.tsx und exam.ts-Schema in @edukedo/shared) und wird hier nicht
   * gespeichert/erzwungen. Siehe Architekturplanung Abschnitt 13.
   */
  start: protectedProcedure.input(startExamInputSchema).mutation(async ({ ctx, input }) => {
    const candidates = await ctx.db
      .select({
        id: contentItem.id,
        prompt: contentItem.prompt,
        explanation: contentItem.explanation,
        payload: contentItem.payload,
        fachgebietId: fachgebiet.id,
        fachgebietTitle: fachgebiet.title,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(
        userCourse,
        and(
          eq(userCourse.kursId, fachgebiet.kursId),
          eq(userCourse.userId, ctx.currentUser.id),
          eq(userCourse.kursId, input.kursId),
        ),
      )
      .where(and(eq(contentItem.type, "fallaufgabe"), eq(contentItem.isActive, true)))
      .orderBy(sql`random()`);

    // Je Fachgebiet nur die erste (bereits zufällig sortierte) Fallaufgabe behalten, damit die
    // Prüfung mehrere Handlungsbereiche kombiniert statt sich auf eines zu konzentrieren.
    const byFachgebiet = new Map<string, (typeof candidates)[number]>();
    for (const candidate of candidates) {
      if (!byFachgebiet.has(candidate.fachgebietId)) {
        byFachgebiet.set(candidate.fachgebietId, candidate);
      }
    }
    const selected = [...byFachgebiet.values()];

    if (selected.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Keine Fallaufgaben für diesen Kurs verfügbar." });
    }

    const [session] = await ctx.db
      .insert(examSession)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId, mode: EXAM_MODE })
      .returning();
    if (!session) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prüfungssitzung konnte nicht angelegt werden." });
    }

    return {
      sessionId: session.id,
      items: selected.map((candidate) => ({
        id: candidate.id,
        prompt: candidate.prompt,
        explanation: candidate.explanation ?? "",
        fachgebietTitle: candidate.fachgebietTitle,
        parts: fallaufgabePayloadSchema.parse(candidate.payload).parts,
      })),
    };
  }),

  /**
   * F-23: Selbsteinschätzung je Teilaufgabe (analog zum Karteikarten-Modus) — Fallaufgaben
   * sind freie Situationsaufgaben ohne automatisch prüfbare Antwort. Ein erneuter Aufruf für
   * dieselbe Fallaufgabe derselben Sitzung ersetzt die vorherige Einschätzung, statt sie
   * zusätzlich zu zählen (z. B. bei Zurück-Navigation).
   *
   * Prüft zuerst, dass `sessionId` der aufrufenden Person gehört (Code-Review-Fund,
   * nachgezogen): ohne diese Prüfung könnte jede eingeloggte Person eine `examAnswer`-Zeile
   * in eine fremde Prüfungssitzung schreiben, da sonst nichts außer der Existenz des
   * Content-Items geprüft wird — anders als bei `finish` unten, das von Anfang an nach
   * `examSession.userId` filtert.
   */
  submitAnswer: protectedProcedure.input(submitExamAnswerInputSchema).mutation(async ({ ctx, input }) => {
    const [session] = await ctx.db
      .select()
      .from(examSession)
      .where(and(eq(examSession.id, input.sessionId), eq(examSession.userId, ctx.currentUser.id)))
      .limit(1);
    if (!session) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Prüfungssitzung nicht gefunden." });
    }

    const [item] = await ctx.db
      .select()
      .from(contentItem)
      .where(and(eq(contentItem.id, input.contentItemId), eq(contentItem.type, "fallaufgabe")))
      .limit(1);
    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Fallaufgabe nicht gefunden." });
    }

    const [version] = await ctx.db
      .select()
      .from(contentItemVersion)
      .where(
        and(eq(contentItemVersion.contentItemId, item.id), eq(contentItemVersion.versionNumber, item.currentVersion)),
      )
      .limit(1);
    if (!version) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Content-Version nicht gefunden." });
    }

    const parts = fallaufgabePayloadSchema.parse(item.payload).parts;
    // Serverseitig auf die tatsächlich mögliche Punktzahl je Teilaufgabe begrenzen — verhindert
    // eine zu hohe Selbsteinschätzung unabhängig vom Frontend-Zustand.
    const clampedParts = input.parts.map((part, index) => ({
      answerText: part.answerText,
      selfAssessedPoints: Math.max(0, Math.min(part.selfAssessedPoints, parts[index]?.points ?? 0)),
    }));
    const totalPoints = clampedParts.reduce((sum, part) => sum + part.selfAssessedPoints, 0);

    await ctx.db
      .delete(examAnswer)
      .where(and(eq(examAnswer.examSessionId, input.sessionId), eq(examAnswer.contentItemVersionId, version.id)));
    await ctx.db.insert(examAnswer).values({
      examSessionId: input.sessionId,
      contentItemVersionId: version.id,
      givenAnswer: { parts: clampedParts },
      points: totalPoints,
    });

    const maxPoints = parts.reduce((sum, part) => sum + part.points, 0);

    // Code-Review-Fund, nachgezogen: ohne diesen Eintrag blieb Prüfungs-Übung für F-31
    // (Trefferquote/Anzahl) und F-32/F-27 (Schwachstellen) komplett unsichtbar, da nur
    // recordQuizAttempt/submitReview (siehe progress.ts) in learning_event schrieben.
    // Fallaufgaben haben keine einzelne "richtig/falsch"-Antwort wie Quiz/Karteikarten,
    // daher als Näherung: mehrheitlich erreichte Punktzahl (>= 50 %) zählt als "richtig" —
    // bewusst dieselbe großzügige Grundhaltung wie bei Karteikarten, wo schon "unsicher"
    // (nicht nur "gewusst") als nicht-falsch zählt, siehe submitReview unten.
    if (maxPoints > 0) {
      await ctx.db.insert(learningEvent).values({
        userId: ctx.currentUser.id,
        contentItemId: item.id,
        isCorrect: totalPoints / maxPoints >= 0.5,
      });
    }

    return { totalPoints, maxPoints };
  }),

  /**
   * F-23: schließt die Prüfungssitzung ab. Der Gesamt-Score bezieht sich bewusst nur auf die
   * tatsächlich eingereichten Fallaufgaben dieser Sitzung (nicht auf ursprünglich zugeteilte,
   * aber übersprungene) — siehe Architekturplanung Abschnitt 13 für die Begründung.
   */
  finish: protectedProcedure.input(finishExamInputSchema).mutation(async ({ ctx, input }) => {
    const [session] = await ctx.db
      .select()
      .from(examSession)
      .where(and(eq(examSession.id, input.sessionId), eq(examSession.userId, ctx.currentUser.id)))
      .limit(1);
    if (!session) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Prüfungssitzung nicht gefunden." });
    }

    const answers = await ctx.db
      .select({ points: examAnswer.points, payload: contentItemVersion.payload })
      .from(examAnswer)
      .innerJoin(contentItemVersion, eq(contentItemVersion.id, examAnswer.contentItemVersionId))
      .where(eq(examAnswer.examSessionId, input.sessionId));

    const achievedPoints = answers.reduce((sum, answer) => sum + (answer.points ?? 0), 0);
    const maxPoints = answers.reduce(
      (sum, answer) => sum + fallaufgabePayloadSchema.parse(answer.payload).parts.reduce((s, part) => s + part.points, 0),
      0,
    );
    const score = maxPoints === 0 ? 0 : Math.round((achievedPoints / maxPoints) * 100);

    await ctx.db.update(examSession).set({ finishedAt: new Date(), score }).where(eq(examSession.id, input.sessionId));

    return { achievedPoints, maxPoints, score, answeredCount: answers.length };
  }),
});
