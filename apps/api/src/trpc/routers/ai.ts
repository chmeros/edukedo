import { aiGradingRequestInputSchema, generateMcQuestionInputSchema, type AdminContentItemForm } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { aiProvider } from "../../ai";
import { isPremiumActive } from "../../auth/premium-status";
import { env } from "../../env";
import { aiGradingQueue } from "../../queue/ai-grading-queue";
import { withTimeout } from "../../queue/with-timeout";
import { aiGradingJob, answerOption, contentItem, contentItemVersion, examAnswer, examSession, fachgebiet, thema } from "../../db/schema";
import { protectedProcedure, roleProcedure, router } from "../trpc";
import { prepareContent } from "./adminContent";

/** N-10-Code-Review-Fund (25.09.2026, siehe queue/with-timeout.ts): ein Redis-Ausfall darf
 * `requestGrading` nicht unbegrenzt hängen lassen. */
const QUEUE_ADD_TIMEOUT_MS = 3000;

/**
 * F-70/F-71: KI-gestützte Bewertung offener Fallaufgaben-Abgaben (asynchron, siehe
 * queue/ai-grading-queue.ts) und KI-gestützte Aufgabengenerierung (synchron, bewusst nur
 * `quiz_mc` — siehe Architekturplanung Abschnitt 13). F-70 ist seit 25.09.2026 (Nutzer-Vorgabe,
 * siehe Abschnitt 13) über den echten Abo-Status freigeschaltet (`isPremiumActive`, siehe
 * `auth/premium-status.ts`), nicht mehr über ein separates Admin-Flag. F-71 bleibt weiterhin
 * hinter dem eigenständigen `user.ai_generation_enabled`-Admin-Flag (F-80,
 * admin.setAiGenerationEnabled) — F-71 läuft laut Nutzer-Vorgabe vom 25.09.2026 vorerst extern.
 */
export const aiRouter = router({
  /** F-72/F-128: welcher Anbieter aktuell aktiv ist — rein informativ fürs Admin-Panel, damit
   * dessen Hinweistext nicht mehr pauschal "Entwicklungs-Platzhalter" behauptet, sobald ein
   * echter Anbieter (Ollama) konfiguriert ist. */
  providerInfo: roleProcedure("admin").query(() => ({
    provider: env.AI_PROVIDER,
    model: env.AI_PROVIDER === "ollama" ? env.OLLAMA_MODEL : null,
  })),

  /**
   * Setzt voraus, dass die Fallaufgabe bereits über exam.submitAnswer eingereicht wurde — die
   * KI bewertet eine bestehende Abgabe, keinen neuen, separat übermittelten Text.
   */
  requestGrading: protectedProcedure.input(aiGradingRequestInputSchema).mutation(async ({ ctx, input }) => {
    if (!isPremiumActive(ctx.currentUser.premiumUntil)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Die KI-gestützte Bewertung ist für dein Konto nicht freigeschaltet.",
      });
    }

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
      .where(and(eq(contentItemVersion.contentItemId, item.id), eq(contentItemVersion.versionNumber, item.currentVersion)))
      .limit(1);
    if (!version) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Content-Version nicht gefunden." });
    }

    const [answerRow] = await ctx.db
      .select()
      .from(examAnswer)
      .where(and(eq(examAnswer.examSessionId, input.sessionId), eq(examAnswer.contentItemVersionId, version.id)))
      .limit(1);
    if (!answerRow) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Bitte reiche diese Fallaufgabe zuerst ein, bevor du eine KI-Bewertung anforderst.",
      });
    }

    const [pendingJob] = await ctx.db
      .select({ id: aiGradingJob.id })
      .from(aiGradingJob)
      .where(and(eq(aiGradingJob.examAnswerId, answerRow.id), inArray(aiGradingJob.status, ["queued", "processing"])))
      .limit(1);
    if (pendingJob) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Für diese Abgabe läuft bereits eine KI-Bewertung." });
    }

    const [jobRow] = await ctx.db
      .insert(aiGradingJob)
      .values({ examAnswerId: answerRow.id, userId: ctx.currentUser.id })
      .returning();
    if (!jobRow) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "KI-Bewertung konnte nicht angefragt werden." });
    }

    try {
      await withTimeout(
        aiGradingQueue.add("grade", { jobRowId: jobRow.id }),
        QUEUE_ADD_TIMEOUT_MS,
        "Die Warteschlange für KI-Bewertungen ist gerade nicht erreichbar.",
      );
    } catch (error) {
      // Der bereits angelegte Job-Datensatz würde sonst als Karteileiche für immer auf
      // "queued" stehen bleiben, ohne je verarbeitet zu werden — lieber sofort ein klarer
      // Fehler zum erneuten Versuch als ein stiller Datensatz ohne Fortschritt.
      await ctx.db.delete(aiGradingJob).where(eq(aiGradingJob.id, jobRow.id));
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "KI-Bewertung konnte nicht angefragt werden.",
      });
    }

    return { jobId: jobRow.id };
  }),

  /** `null`, solange noch nie eine Bewertung angefragt wurde — kein Fehler, siehe Frontend
   * (kein Polling, siehe Architekturplanung Abschnitt 13: einfaches erneutes Laden/Öffnen wie
   * bei Highscore/Lernpartner/Duell). */
  myGradingResult: protectedProcedure.input(aiGradingRequestInputSchema).query(async ({ ctx, input }) => {
    const [session] = await ctx.db
      .select()
      .from(examSession)
      .where(and(eq(examSession.id, input.sessionId), eq(examSession.userId, ctx.currentUser.id)))
      .limit(1);
    if (!session) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Prüfungssitzung nicht gefunden." });
    }

    const [item] = await ctx.db
      .select({ id: contentItem.id, currentVersion: contentItem.currentVersion })
      .from(contentItem)
      .where(and(eq(contentItem.id, input.contentItemId), eq(contentItem.type, "fallaufgabe")))
      .limit(1);
    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Fallaufgabe nicht gefunden." });
    }

    const [version] = await ctx.db
      .select({ id: contentItemVersion.id })
      .from(contentItemVersion)
      .where(and(eq(contentItemVersion.contentItemId, item.id), eq(contentItemVersion.versionNumber, item.currentVersion)))
      .limit(1);
    if (!version) {
      return null;
    }

    const [answerRow] = await ctx.db
      .select({ id: examAnswer.id })
      .from(examAnswer)
      .where(and(eq(examAnswer.examSessionId, input.sessionId), eq(examAnswer.contentItemVersionId, version.id)))
      .limit(1);
    if (!answerRow) {
      return null;
    }

    const [job] = await ctx.db
      .select({
        status: aiGradingJob.status,
        resultText: aiGradingJob.resultText,
        errorMessage: aiGradingJob.errorMessage,
      })
      .from(aiGradingJob)
      .where(eq(aiGradingJob.examAnswerId, answerRow.id))
      .orderBy(desc(aiGradingJob.requestedAt))
      .limit(1);

    return job ?? null;
  }),

  /**
   * F-71: erzeugt einen Entwurf mit `isActive: false` — durchläuft damit zwingend den
   * bestehenden redaktionellen Freischalt-Weg (F-11, `adminContent.setActive`/`update`), genau
   * wie die Anforderung verlangt ("durchlaufen verpflichtend den redaktionellen
   * Review-Prozess"), ohne dafür einen eigenen Review-Mechanismus zu bauen.
   */
  generateContentItem: roleProcedure("admin").input(generateMcQuestionInputSchema).mutation(async ({ ctx, input }) => {
    if (!ctx.currentUser.aiGenerationEnabled) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Die KI-gestützte Aufgabengenerierung ist für dein Konto nicht freigeschaltet.",
      });
    }

    const [themaRow] = await ctx.db
      .select({ id: thema.id, fachgebietTitle: fachgebiet.title })
      .from(thema)
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(eq(thema.id, input.themaId))
      .limit(1);
    if (!themaRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Thema wurde nicht gefunden." });
    }

    const generated = await aiProvider.generateMcQuestion({
      topicHint: input.topicHint,
      fachgebietTitle: themaRow.fachgebietTitle,
    });

    const form: AdminContentItemForm = {
      type: "quiz_mc",
      prompt: generated.prompt,
      explanation: generated.explanation,
      options: generated.options,
      themaId: input.themaId,
      difficulty: "mittel",
      bloom: null,
      isPremium: false,
      isActive: false,
    };
    const prepared = prepareContent(form);

    return ctx.db.transaction(async (tx) => {
      const [item] = await tx
        .insert(contentItem)
        .values({
          themaId: input.themaId,
          type: "quiz_mc",
          prompt: prepared.prompt,
          explanation: prepared.explanation,
          payload: prepared.payload,
          difficulty: "mittel",
          isPremium: false,
          isActive: false,
          createdBy: ctx.currentUser.id,
        })
        .returning();
      if (!item) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      await tx.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: prepared.prompt,
        explanation: prepared.explanation,
        payload: prepared.payload,
        changedBy: ctx.currentUser.id,
      });

      if (prepared.answerOptions) {
        await tx.insert(answerOption).values(prepared.answerOptions.map((option) => ({ contentItemId: item.id, ...option })));
      }

      return { id: item.id };
    });
  }),
});
