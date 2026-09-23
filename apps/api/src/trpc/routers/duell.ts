import {
  challengeDuellInputSchema,
  checkMcAnswer,
  duellIdInputSchema,
  duellKursInputSchema,
  MC_LIKE_QUIZ_TYPES,
  setDuellRevealDetailsInputSchema,
  shapeQuizItem,
  submitDuellAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, inArray, or, sql } from "drizzle-orm";
import type { Database } from "../../db/client";
import {
  answerOption,
  block,
  contentItem,
  contentItemVersion,
  duell,
  duellAnswer,
  duellQuestion,
  fachgebiet,
  friendCircleLink,
  thema,
  user,
  userCourse,
} from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-61: "läuft automatisch nach 7 Tagen ab". */
const DUELL_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

async function requireEnrollment(db: Database, userId: string, kursId: string) {
  const [enrollment] = await db
    .select()
    .from(userCourse)
    .where(and(eq(userCourse.userId, userId), eq(userCourse.kursId, kursId)))
    .limit(1);

  if (!enrollment) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist in diesem Kurs nicht eingeschrieben." });
  }
}

/** Identischer Aufbau wie report.ts' gleichnamiger Helfer — bewusst hier dupliziert statt
 * geteilt (kleine, lokale Prüf-Helfer bleiben in diesem Projekt je Router, siehe friend.ts'
 * requireEnrollment). */
async function requireExistingFriendship(db: Database, userId: string, otherUserId: string, kursId: string) {
  const [userIdA, userIdB] = userId < otherUserId ? [userId, otherUserId] : [otherUserId, userId];
  const [existing] = await db
    .select()
    .from(friendCircleLink)
    .where(
      and(eq(friendCircleLink.kursId, kursId), eq(friendCircleLink.userIdA, userIdA), eq(friendCircleLink.userIdB, userIdB)),
    )
    .limit(1);

  if (!existing) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ihr seid in diesem Kurs nicht befreundet." });
  }
}

function isDuellExpired(row: { status: string; expiresAt: Date }, now: Date): boolean {
  return row.status === "offen" && row.expiresAt.getTime() < now.getTime();
}

/**
 * F-61: Asynchrone 1:1-Wissensduelle innerhalb des Freundeskreises (F-63) je Kurs — derselbe
 * Fragenpool (identische Fragen, als Content-Version-Snapshot beim Start eingefroren) für beide
 * Seiten, Bewertung primär nach Trefferzahl, Zeit als Sekundärkriterium, keine Einsicht in die
 * Antworten der Gegenseite vor Abschluss des eigenen Durchgangs, je Person konfigurierbare
 * Sichtbarkeit der eigenen Einzelfragen-Ergebnisse für die Gegenseite (Default: nur
 * Gesamtergebnis), automatischer Ablauf nach 7 Tagen mit Erinnerung kurz vorher (F-43, siehe
 * db/send-duell-reminders.ts). Letzter der drei von F-66 gemeinsam genannten
 * Fremdkontakt-Funktionen (Highscore F-60, Lernpartner-Vermittlung F-62 bereits vorhanden) —
 * dieselbe Minderjährigen-Sperre (`user.gamification_enabled`, siehe parent.setChildGamification
 * Enabled) gilt hier für das AUSLÖSEN eines neuen Duells (Herausfordern), nicht für das
 * Weiterspielen eines bereits bestehenden.
 */
export const duellRouter = router({
  /**
   * Fragenpool bewusst auf MC_LIKE_QUIZ_TYPES beschränkt (quiz_mc/wahr_falsch/entweder_oder/
   * was_passt_nicht) — strukturell identisch (genau eine Options-ID je Antwort), damit sich
   * sowohl die Bewertung (checkMcAnswer) als auch die Lernenden-UI (MultipleChoiceStep/
   * TwoChoiceStep aus QuizSteps.tsx) unverändert wiederverwenden lassen, statt für ein Duell
   * eigene Varianten für Zuordnung/Lückentext/Kurzantwort zu bauen.
   */
  challenge: protectedProcedure.input(challengeDuellInputSchema).mutation(async ({ ctx, input }) => {
    if (input.opponentUserId === ctx.currentUser.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du kannst dich nicht selbst herausfordern." });
    }
    if (ctx.currentUser.isMinor && !ctx.currentUser.gamificationEnabled) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Für minderjährige Nutzer:innen sind Duelle ohne gesonderte Einwilligung der Erziehungsberechtigten deaktiviert.",
      });
    }

    await requireEnrollment(ctx.db, ctx.currentUser.id, input.kursId);
    await requireEnrollment(ctx.db, input.opponentUserId, input.kursId);
    await requireExistingFriendship(ctx.db, ctx.currentUser.id, input.opponentUserId, input.kursId);

    // Zusätzliche, generische Sperre analog zu friend.redeemInviteCode — eine bestehende
    // Freundschaft wird bei einer Blockierung bereits entfernt (report.ts), dieser Check ist
    // Verteidigung in der Tiefe für den Fall einer zwischenzeitlichen Blockierung.
    const [blockRow] = await ctx.db
      .select()
      .from(block)
      .where(
        and(
          eq(block.kursId, input.kursId),
          or(
            and(eq(block.userId, ctx.currentUser.id), eq(block.blockedUserId, input.opponentUserId)),
            and(eq(block.userId, input.opponentUserId), eq(block.blockedUserId, ctx.currentUser.id)),
          ),
        ),
      )
      .limit(1);
    if (blockRow) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Ihr seid in diesem Kurs nicht befreundet." });
    }

    const candidates = await ctx.db
      .select({ id: contentItem.id, versionId: contentItemVersion.id })
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
      .innerJoin(
        contentItemVersion,
        and(eq(contentItemVersion.contentItemId, contentItem.id), eq(contentItemVersion.versionNumber, contentItem.currentVersion)),
      )
      .where(and(inArray(contentItem.type, [...MC_LIKE_QUIZ_TYPES]), eq(contentItem.isActive, true)))
      .orderBy(sql`random()`)
      .limit(input.questionCount);

    if (candidates.length < input.questionCount) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Für ein Duell dieser Größe gibt es in diesem Kurs nicht genügend passende Fragen.",
      });
    }

    const [createdDuell] = await ctx.db
      .insert(duell)
      .values({
        kursId: input.kursId,
        challengerUserId: ctx.currentUser.id,
        opponentUserId: input.opponentUserId,
        questionCount: candidates.length,
        expiresAt: new Date(Date.now() + DUELL_DURATION_MS),
      })
      .returning();
    if (!createdDuell) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Duell konnte nicht angelegt werden." });
    }

    await ctx.db.insert(duellQuestion).values(
      candidates.map((candidate, index) => ({
        duellId: createdDuell.id,
        contentItemId: candidate.id,
        contentItemVersionId: candidate.versionId,
        sortOrder: index,
      })),
    );

    return { id: createdDuell.id };
  }),

  myDuelle: protectedProcedure.input(duellKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select()
      .from(duell)
      .where(
        and(
          eq(duell.kursId, input.kursId),
          or(eq(duell.challengerUserId, ctx.currentUser.id), eq(duell.opponentUserId, ctx.currentUser.id)),
        ),
      )
      .orderBy(desc(duell.createdAt));

    const opponentUserIds = rows.map((row) =>
      row.challengerUserId === ctx.currentUser.id ? row.opponentUserId : row.challengerUserId,
    );
    const opponentUsers = opponentUserIds.length
      ? await ctx.db
          .select({ id: user.id, email: user.email })
          .from(user)
          .where(or(...opponentUserIds.map((id) => eq(user.id, id))))
      : [];
    const emailByUserId = new Map(opponentUsers.map((row) => [row.id, row.email]));

    const now = new Date();
    return rows.map((row) => {
      const isChallenger = row.challengerUserId === ctx.currentUser.id;
      const opponentUserId = isChallenger ? row.opponentUserId : row.challengerUserId;
      const myFinishedAt = isChallenger ? row.challengerFinishedAt : row.opponentFinishedAt;
      const opponentFinishedAt = isChallenger ? row.opponentFinishedAt : row.challengerFinishedAt;

      return {
        id: row.id,
        status: isDuellExpired(row, now) ? ("abgelaufen" as const) : row.status,
        expiresAt: row.expiresAt,
        questionCount: row.questionCount,
        opponentEmail: emailByUserId.get(opponentUserId) ?? "unbekannt",
        myFinished: myFinishedAt !== null,
        opponentFinished: opponentFinishedAt !== null,
      };
    });
  }),

  get: protectedProcedure.input(duellIdInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(duell).where(eq(duell.id, input.duellId)).limit(1);
    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }
    const isChallenger = row.challengerUserId === ctx.currentUser.id;
    const isOpponent = row.opponentUserId === ctx.currentUser.id;
    if (!isChallenger && !isOpponent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }

    const now = new Date();
    const status = isDuellExpired(row, now) ? ("abgelaufen" as const) : row.status;

    const opponentUserId = isChallenger ? row.opponentUserId : row.challengerUserId;
    const [opponentUser] = await ctx.db.select({ email: user.email }).from(user).where(eq(user.id, opponentUserId)).limit(1);

    const questions = await ctx.db
      .select({
        duellQuestionId: duellQuestion.id,
        contentItemId: duellQuestion.contentItemId,
        type: contentItem.type,
        prompt: contentItemVersion.prompt,
        payload: contentItemVersion.payload,
      })
      .from(duellQuestion)
      .innerJoin(contentItemVersion, eq(contentItemVersion.id, duellQuestion.contentItemVersionId))
      .innerJoin(contentItem, eq(contentItem.id, duellQuestion.contentItemId))
      .where(eq(duellQuestion.duellId, input.duellId))
      .orderBy(duellQuestion.sortOrder);
    const duellQuestionIds = questions.map((question) => question.duellQuestionId);

    const answers = duellQuestionIds.length
      ? await ctx.db
          .select()
          .from(duellAnswer)
          .where(
            and(
              inArray(duellAnswer.duellQuestionId, duellQuestionIds),
              or(eq(duellAnswer.userId, ctx.currentUser.id), eq(duellAnswer.userId, opponentUserId)),
            ),
          )
      : [];
    const myAnswers = answers.filter((answer) => answer.userId === ctx.currentUser.id);
    const opponentAnswerRows = answers.filter((answer) => answer.userId === opponentUserId);
    const myAnsweredQuestionIds = new Set(myAnswers.map((answer) => answer.duellQuestionId));

    const myFinishedAt = isChallenger ? row.challengerFinishedAt : row.opponentFinishedAt;
    const myCorrectCount = isChallenger ? row.challengerCorrectCount : row.opponentCorrectCount;
    const myRevealDetails = isChallenger ? row.challengerRevealDetails : row.opponentRevealDetails;
    const opponentFinishedAt = isChallenger ? row.opponentFinishedAt : row.challengerFinishedAt;
    const opponentCorrectCountRaw = isChallenger ? row.opponentCorrectCount : row.challengerCorrectCount;
    const opponentRevealDetails = isChallenger ? row.opponentRevealDetails : row.challengerRevealDetails;

    const bothFinished = myFinishedAt !== null && opponentFinishedAt !== null;

    // F-61: "keine Einsicht in die Antworten der Gegenseite vor Abschluss des eigenen
    // Durchgangs" — das Gesamtergebnis der Gegenseite ist deshalb an BEIDE Bedingungen
    // gekoppelt (bothFinished), nicht nur daran, dass die Gegenseite selbst fertig ist.
    const opponentCorrectCount = bothFinished ? opponentCorrectCountRaw : null;

    let result: "me" | "opponent" | "draw" | null = null;
    if (bothFinished) {
      if (myCorrectCount! > opponentCorrectCountRaw!) {
        result = "me";
      } else if (myCorrectCount! < opponentCorrectCountRaw!) {
        result = "opponent";
      } else {
        const myStartedAt = isChallenger ? row.challengerStartedAt : row.opponentStartedAt;
        const opponentStartedAt = isChallenger ? row.opponentStartedAt : row.challengerStartedAt;
        const myTimeMs = myStartedAt ? myFinishedAt!.getTime() - myStartedAt.getTime() : Infinity;
        const opponentTimeMs = opponentStartedAt ? opponentFinishedAt!.getTime() - opponentStartedAt.getTime() : Infinity;
        result = myTimeMs < opponentTimeMs ? "me" : myTimeMs > opponentTimeMs ? "opponent" : "draw";
      }
    }

    let nextQuestion = null;
    if (status === "offen" && myFinishedAt === null) {
      const nextQuestionRow = questions.find((question) => !myAnsweredQuestionIds.has(question.duellQuestionId));
      if (nextQuestionRow) {
        const options = await ctx.db
          .select()
          .from(answerOption)
          .where(eq(answerOption.contentItemId, nextQuestionRow.contentItemId));
        nextQuestion = shapeQuizItem(
          {
            id: nextQuestionRow.contentItemId,
            type: nextQuestionRow.type,
            prompt: nextQuestionRow.prompt,
            payload: nextQuestionRow.payload,
          },
          options,
        );
      }
    }

    const myAnswerDetails =
      myFinishedAt !== null
        ? questions.map((question) => ({
            contentItemId: question.contentItemId,
            prompt: question.prompt,
            isCorrect: myAnswers.find((answer) => answer.duellQuestionId === question.duellQuestionId)?.isCorrect ?? false,
          }))
        : null;

    const opponentAnswerDetails =
      bothFinished && opponentRevealDetails
        ? questions.map((question) => ({
            contentItemId: question.contentItemId,
            prompt: question.prompt,
            isCorrect: opponentAnswerRows.find((answer) => answer.duellQuestionId === question.duellQuestionId)?.isCorrect ?? false,
          }))
        : null;

    return {
      id: row.id,
      kursId: row.kursId,
      status,
      expiresAt: row.expiresAt,
      questionCount: row.questionCount,
      opponentEmail: opponentUser?.email ?? "unbekannt",
      me: {
        finishedAt: myFinishedAt,
        correctCount: myCorrectCount,
        revealDetails: myRevealDetails,
        answeredCount: myAnsweredQuestionIds.size,
      },
      opponent: {
        finishedAt: opponentFinishedAt,
        correctCount: opponentCorrectCount,
        revealDetails: opponentRevealDetails,
      },
      result,
      nextQuestion,
      myAnswers: myAnswerDetails,
      opponentAnswers: opponentAnswerDetails,
    };
  }),

  submitAnswer: protectedProcedure.input(submitDuellAnswerInputSchema).mutation(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(duell).where(eq(duell.id, input.duellId)).limit(1);
    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }
    const isChallenger = row.challengerUserId === ctx.currentUser.id;
    const isOpponent = row.opponentUserId === ctx.currentUser.id;
    if (!isChallenger && !isOpponent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }
    if (isDuellExpired(row, new Date()) || row.status !== "offen") {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Dieses Duell ist nicht mehr offen." });
    }
    const myFinishedAt = isChallenger ? row.challengerFinishedAt : row.opponentFinishedAt;
    if (myFinishedAt !== null) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du hast diesen Durchgang bereits abgeschlossen." });
    }

    const [questionRow] = await ctx.db
      .select()
      .from(duellQuestion)
      .where(and(eq(duellQuestion.duellId, input.duellId), eq(duellQuestion.contentItemId, input.contentItemId)))
      .limit(1);
    if (!questionRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Diese Frage gehört nicht zu diesem Duell." });
    }

    const [existingAnswer] = await ctx.db
      .select()
      .from(duellAnswer)
      .where(and(eq(duellAnswer.duellQuestionId, questionRow.id), eq(duellAnswer.userId, ctx.currentUser.id)))
      .limit(1);
    if (existingAnswer) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Diese Frage wurde bereits beantwortet." });
    }

    const options = await ctx.db.select().from(answerOption).where(eq(answerOption.contentItemId, input.contentItemId));
    const { isCorrect, correctOptionId } = checkMcAnswer(options, input.selectedOptionId);

    await ctx.db.insert(duellAnswer).values({
      duellQuestionId: questionRow.id,
      userId: ctx.currentUser.id,
      selectedOptionId: input.selectedOptionId,
      isCorrect,
    });

    const [version] = await ctx.db
      .select({ explanation: contentItemVersion.explanation })
      .from(contentItemVersion)
      .where(eq(contentItemVersion.id, questionRow.contentItemVersionId))
      .limit(1);

    const allQuestionRows = await ctx.db
      .select({ id: duellQuestion.id })
      .from(duellQuestion)
      .where(eq(duellQuestion.duellId, input.duellId));
    const myAnswerRows = await ctx.db
      .select({ isCorrect: duellAnswer.isCorrect })
      .from(duellAnswer)
      .where(
        and(
          eq(duellAnswer.userId, ctx.currentUser.id),
          inArray(
            duellAnswer.duellQuestionId,
            allQuestionRows.map((question) => question.id),
          ),
        ),
      );

    const updates: Partial<typeof duell.$inferInsert> = {};
    const myStartedAt = isChallenger ? row.challengerStartedAt : row.opponentStartedAt;
    if (myStartedAt === null) {
      if (isChallenger) updates.challengerStartedAt = new Date();
      else updates.opponentStartedAt = new Date();
    }
    if (myAnswerRows.length === allQuestionRows.length) {
      const correctCount = myAnswerRows.filter((answer) => answer.isCorrect).length;
      if (isChallenger) {
        updates.challengerFinishedAt = new Date();
        updates.challengerCorrectCount = correctCount;
      } else {
        updates.opponentFinishedAt = new Date();
        updates.opponentCorrectCount = correctCount;
      }
      const opponentAlreadyFinished = isChallenger ? row.opponentFinishedAt !== null : row.challengerFinishedAt !== null;
      if (opponentAlreadyFinished) {
        updates.status = "abgeschlossen";
      }
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.update(duell).set(updates).where(eq(duell.id, input.duellId));
    }

    return { isCorrect, correctOptionId, explanation: version?.explanation ?? null };
  }),

  /** F-61: "individuell konfigurierbar, ob für die Gegenseite nur das Gesamtergebnis oder auch
   * die Einzelfragen-Ergebnisse sichtbar sind" — steuert ausschließlich die eigene Sichtbarkeit
   * für die Gegenseite, jederzeit änderbar (wirkt sich aber erst aus, sobald beide fertig sind,
   * siehe `get` oben). */
  setRevealDetails: protectedProcedure.input(setDuellRevealDetailsInputSchema).mutation(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(duell).where(eq(duell.id, input.duellId)).limit(1);
    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }
    const isChallenger = row.challengerUserId === ctx.currentUser.id;
    const isOpponent = row.opponentUserId === ctx.currentUser.id;
    if (!isChallenger && !isOpponent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Duell wurde nicht gefunden." });
    }

    await ctx.db
      .update(duell)
      .set(isChallenger ? { challengerRevealDetails: input.revealDetails } : { opponentRevealDetails: input.revealDetails })
      .where(eq(duell.id, input.duellId));

    return { success: true };
  }),
});
