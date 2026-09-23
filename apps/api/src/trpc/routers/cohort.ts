import { cohortIdInputSchema, cohortKursInputSchema, createCohortInputSchema, joinCohortInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, count, eq, gte, sql } from "drizzle-orm";
import { generateInviteCode } from "../../auth/invite-code";
import type { Database } from "../../db/client";
import {
  cohort,
  cohortMember,
  contentItem,
  fachgebiet,
  friendCircleLink,
  learningEvent,
  thema,
  user,
  userCourse,
  userProgress,
} from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-93/F-64 (dieselbe Begründung wie in company.ts): unterhalb dieser Mitgliederzahl wäre eine
 * "aggregierte" Kennzahl faktisch eine personenbezogene Einzelauswertung. */
const MIN_COHORT_SIZE_FOR_STATS = 5;

/** F-64: "Anteil aktiver Mitglieder" — dasselbe rollierende 30-Tage-Fenster wie company.stats. */
const ACTIVE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

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

async function requireCohortDozent(db: Database, cohortId: string, dozentUserId: string) {
  const [row] = await db
    .select()
    .from(cohort)
    .where(and(eq(cohort.id, cohortId), eq(cohort.dozentUserId, dozentUserId)))
    .limit(1);

  if (!row) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Diese Kohorte wurde nicht gefunden." });
  }
  return row;
}

/** F-65: verbindet zwei Personen im kursbezogenen Freundeskreis (F-63), kanonisch sortiert wie
 * überall sonst (friend.ts, report.ts) — idempotent, falls die Freundschaft bereits besteht. */
async function ensureFriendship(db: Database, kursId: string, userIdX: string, userIdY: string) {
  const [userIdA, userIdB] = userIdX < userIdY ? [userIdX, userIdY] : [userIdY, userIdX];
  await db
    .insert(friendCircleLink)
    .values({ kursId, userIdA, userIdB })
    .onConflictDoNothing({ target: [friendCircleLink.kursId, friendCircleLink.userIdA, friendCircleLink.userIdB] });
}

/**
 * F-07/F-64/F-65: Lehrgangsgruppen (Kohorten) — je Kurs angelegt, Selbstbedienung durch jede
 * eingeschriebene Person (wird dabei automatisch Dozent:in dieser einen Kohorte, siehe
 * schema.ts für die Begründung gegen einen eigenen `user.role`-Wert). Mitglieder werden beim
 * Beitritt automatisch in den Freundeskreis (F-63) aller bereits vorhandenen Mitglieder
 * aufgenommen (F-65), sodass Duelle (F-61)/Lernpartner-Vermittlung (F-62) innerhalb der Kohorte
 * ohne manuelle Einladung funktionieren. `stats` liefert ausschließlich aggregierte Kennzahlen
 * (F-64) — strukturell nie Einzeldatensätze, analog zu company.stats.
 */
export const cohortRouter = router({
  create: protectedProcedure.input(createCohortInputSchema).mutation(async ({ ctx, input }) => {
    await requireEnrollment(ctx.db, ctx.currentUser.id, input.kursId);

    const [created] = await ctx.db
      .insert(cohort)
      .values({
        kursId: input.kursId,
        dozentUserId: ctx.currentUser.id,
        name: input.name,
        joinCode: generateInviteCode(),
      })
      .returning();
    if (!created) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Kohorte konnte nicht angelegt werden." });
    }

    return { id: created.id, name: created.name, joinCode: created.joinCode };
  }),

  myCohorts: protectedProcedure.input(cohortKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select()
      .from(cohort)
      .where(and(eq(cohort.dozentUserId, ctx.currentUser.id), eq(cohort.kursId, input.kursId)))
      .orderBy(cohort.createdAt);

    const memberCounts = await Promise.all(
      rows.map((row) =>
        ctx.db
          .select({ value: count() })
          .from(cohortMember)
          .where(eq(cohortMember.cohortId, row.id))
          .then(([result]) => result?.value ?? 0),
      ),
    );

    return rows.map((row, index) => ({
      id: row.id,
      name: row.name,
      joinCode: row.joinCode,
      memberCount: memberCounts[index]!,
    }));
  }),

  /**
   * Generische, nicht verräterische Meldung bei einem unbekannten Code (analog zu
   * friend.redeemInviteCode) — bewusst kein Hinweis, ob der Code überhaupt je existierte.
   * Idempotent bei erneutem Beitritt (wie friend.redeemInviteCode/company.redeemInviteCode).
   */
  join: protectedProcedure.input(joinCohortInputSchema).mutation(async ({ ctx, input }) => {
    const normalizedCode = input.code.trim().toUpperCase();
    const [foundCohort] = await ctx.db.select().from(cohort).where(eq(cohort.joinCode, normalizedCode)).limit(1);
    if (!foundCohort) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Beitritts-Code ist ungültig." });
    }
    if (foundCohort.dozentUserId === ctx.currentUser.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist bereits Dozent:in dieser Kohorte." });
    }

    await requireEnrollment(ctx.db, ctx.currentUser.id, foundCohort.kursId);

    // Bestehende Mitglieder VOR dem eigenen Insert abfragen, damit ein erneuter (idempotenter)
    // Beitritt derselben Person die eigene, bereits vorhandene Zeile nicht versehentlich als
    // "bestehendes Mitglied" mitzählt (ensureFriendship(kursId, X, X) würde sonst den
    // friend_circle_link_user_order_check-Constraint verletzen). `.returning()` zeigt, ob
    // tatsächlich neu eingefügt wurde — nur dann ist eine Verknüpfung überhaupt nötig, bei einem
    // No-op-Konflikt bestehen alle Freundschaften bereits aus dem ursprünglichen Beitritt.
    const existingMembers = await ctx.db
      .select({ userId: cohortMember.userId })
      .from(cohortMember)
      .where(eq(cohortMember.cohortId, foundCohort.id));

    const [inserted] = await ctx.db
      .insert(cohortMember)
      .values({ cohortId: foundCohort.id, userId: ctx.currentUser.id })
      .onConflictDoNothing({ target: [cohortMember.cohortId, cohortMember.userId] })
      .returning({ id: cohortMember.id });

    if (inserted) {
      for (const existingMember of existingMembers) {
        await ensureFriendship(ctx.db, foundCohort.kursId, ctx.currentUser.id, existingMember.userId);
      }
    }

    return { cohortId: foundCohort.id, cohortName: foundCohort.name };
  }),

  regenerateJoinCode: protectedProcedure.input(cohortIdInputSchema).mutation(async ({ ctx, input }) => {
    await requireCohortDozent(ctx.db, input.cohortId, ctx.currentUser.id);

    const [updated] = await ctx.db
      .update(cohort)
      .set({ joinCode: generateInviteCode() })
      .where(eq(cohort.id, input.cohortId))
      .returning({ joinCode: cohort.joinCode });

    return { joinCode: updated!.joinCode };
  }),

  /** Bewusst NUR E-Mail + Beitrittsdatum, kein Lernfortschritt (Beschäftigten-/
   * Datenschutz-Parallele zu company.members, § 26 BDSG-Gedanke auch außerhalb des
   * Beschäftigungskontexts sinngemäß angewendet — siehe F-64: "keine personenbezogenen
   * Einzelantworten ... ohne deren gesonderte Zustimmung"). */
  members: protectedProcedure.input(cohortIdInputSchema).query(async ({ ctx, input }) => {
    await requireCohortDozent(ctx.db, input.cohortId, ctx.currentUser.id);

    const rows = await ctx.db
      .select({ userId: cohortMember.userId, email: user.email, joinedAt: cohortMember.joinedAt })
      .from(cohortMember)
      .innerJoin(user, eq(user.id, cohortMember.userId))
      .where(eq(cohortMember.cohortId, input.cohortId))
      .orderBy(cohortMember.joinedAt);

    return rows;
  }),

  /**
   * F-64: "durchschnittliche Trefferquote je Handlungsbereich, Anteil aktiver Mitglieder und
   * Fortschritt in % des behandelten Contents, jeweils aggregiert über die Gruppe — jedoch keine
   * personenbezogenen Einzelantworten". Bewusst reine SQL-Aggregation (count/count distinct über
   * Joins) statt Laden von Einzeldatensätzen, analog zu company.stats — der Endpunkt kann
   * strukturell nie eine auf eine Einzelperson zurückführbare Zeile liefern. Zusätzlich zur
   * Mindestgröße der GESAMTEN Kohorte wird auch JE HANDLUNGSBEREICH geprüft, ob mindestens
   * MIN_COHORT_SIZE_FOR_STATS unterschiedliche Personen beigetragen haben (Code-Review-Erwägung:
   * ohne diese zweite Prüfung könnte ein Handlungsbereich, den bisher nur eine einzelne Person
   * bearbeitet hat, deren Einzelleistung offenlegen, obwohl die Kohorte insgesamt groß genug ist).
   */
  stats: protectedProcedure.input(cohortIdInputSchema).query(async ({ ctx, input }) => {
    const cohortRow = await requireCohortDozent(ctx.db, input.cohortId, ctx.currentUser.id);

    const [totalRow] = await ctx.db
      .select({ value: count() })
      .from(cohortMember)
      .where(eq(cohortMember.cohortId, input.cohortId));
    const totalMembers = totalRow?.value ?? 0;

    if (totalMembers < MIN_COHORT_SIZE_FOR_STATS) {
      return {
        totalMembers,
        minCohortSize: MIN_COHORT_SIZE_FOR_STATS,
        activeSharePercent: null,
        avgProgressPercent: null,
        byFachgebiet: [] as { fachgebietId: string; fachgebietTitle: string; avgAccuracyPercent: number | null }[],
      };
    }

    const activeSince = new Date(Date.now() - ACTIVE_WINDOW_MS);

    const [[activeRow], [totalProgressRow], [masteredProgressRow], accuracyByFachgebiet] = await Promise.all([
      ctx.db
        .select({ value: sql<number>`count(distinct ${learningEvent.userId})::int` })
        .from(learningEvent)
        .innerJoin(
          cohortMember,
          and(eq(cohortMember.userId, learningEvent.userId), eq(cohortMember.cohortId, input.cohortId)),
        )
        .innerJoin(contentItem, eq(contentItem.id, learningEvent.contentItemId))
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .where(and(eq(fachgebiet.kursId, cohortRow.kursId), gte(learningEvent.occurredAt, activeSince))),
      ctx.db
        .select({ value: count() })
        .from(userProgress)
        .innerJoin(
          cohortMember,
          and(eq(cohortMember.userId, userProgress.userId), eq(cohortMember.cohortId, input.cohortId)),
        )
        .innerJoin(contentItem, eq(contentItem.id, userProgress.contentItemId))
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .where(eq(fachgebiet.kursId, cohortRow.kursId)),
      ctx.db
        .select({ value: count() })
        .from(userProgress)
        .innerJoin(
          cohortMember,
          and(eq(cohortMember.userId, userProgress.userId), eq(cohortMember.cohortId, input.cohortId)),
        )
        .innerJoin(contentItem, eq(contentItem.id, userProgress.contentItemId))
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .where(and(eq(fachgebiet.kursId, cohortRow.kursId), eq(userProgress.state, "review"))),
      ctx.db
        .select({
          fachgebietId: fachgebiet.id,
          fachgebietTitle: fachgebiet.title,
          contributors: sql<number>`count(distinct ${learningEvent.userId})::int`,
          total: count(),
          correct: sql<number>`count(*) filter (where ${learningEvent.isCorrect})::int`,
        })
        .from(learningEvent)
        .innerJoin(
          cohortMember,
          and(eq(cohortMember.userId, learningEvent.userId), eq(cohortMember.cohortId, input.cohortId)),
        )
        .innerJoin(contentItem, eq(contentItem.id, learningEvent.contentItemId))
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .where(eq(fachgebiet.kursId, cohortRow.kursId))
        .groupBy(fachgebiet.id, fachgebiet.title, fachgebiet.sortOrder)
        .orderBy(fachgebiet.sortOrder),
    ]);

    const totalProgress = totalProgressRow?.value ?? 0;

    return {
      totalMembers,
      minCohortSize: MIN_COHORT_SIZE_FOR_STATS,
      activeSharePercent: Math.round(((activeRow?.value ?? 0) / totalMembers) * 100),
      avgProgressPercent: totalProgress > 0 ? Math.round(((masteredProgressRow?.value ?? 0) / totalProgress) * 100) : null,
      byFachgebiet: accuracyByFachgebiet.map((row) => ({
        fachgebietId: row.fachgebietId,
        fachgebietTitle: row.fachgebietTitle,
        avgAccuracyPercent:
          row.contributors >= MIN_COHORT_SIZE_FOR_STATS && row.total > 0 ? Math.round((row.correct / row.total) * 100) : null,
      })),
    };
  }),
});
