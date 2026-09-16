import { activeKursInputSchema, sessionIdInputSchema, submitReviewInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, gte, inArray, isNull, lte } from "drizzle-orm";
import { initialProgressState, scheduleReview } from "../../fsrs/scheduler";
import { calculateEinzelterminPacing } from "../../pacing";
import type { Database } from "../../db/client";
import {
  contentItem,
  fachgebiet,
  kurs,
  learningEvent,
  learningSession,
  thema,
  userCourse,
  userProgress,
} from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-26: Quiz-Ergebnisse fließen jetzt ebenfalls in `user_progress`/die Fortschrittsanzeige
 * ein (siehe `overview` unten und Architekturplanung Abschnitt 13) — aufgerufen aus den vier
 * `quiz.submit*`-Mutationen, NICHT aus dem kontolosen Vorschau-Modus (`preview.ts`), der
 * bewusst ohne jeden Datenbank-Schreibzugriff bleibt (F-08).
 *
 * Quiz-Items haben kein FSRS-Wiederholungsintervall wie Karteikarten — "beherrscht" bedeutet
 * hier schlicht "die letzte Antwort war richtig", nicht "die Karte hat die Lernphase
 * verlassen". `difficulty`/`stability`/`dueAt` sind für Quiz-Zeilen bewusst neutrale
 * Platzhalter: `content.dueCards` (Karteikarten-Fälligkeit) filtert ohnehin strikt auf
 * `content_item.type = "karteikarte"` und liest diese Felder für Quiz-Zeilen nie.
 */
export async function recordQuizAttempt(
  db: Database,
  userId: string,
  contentItemId: string,
  isCorrect: boolean,
): Promise<void> {
  const now = new Date();
  const state = isCorrect ? "review" : "learning";

  await db
    .insert(userProgress)
    .values({
      userId,
      contentItemId,
      difficulty: 0,
      stability: 0,
      state,
      dueAt: now,
      lastReviewedAt: now,
      reps: 0,
      lapses: 0,
    })
    .onConflictDoUpdate({
      target: [userProgress.userId, userProgress.contentItemId],
      set: { state, lastReviewedAt: now },
    });

  await db.insert(learningEvent).values({ userId, contentItemId, isCorrect, occurredAt: now });
}

/**
 * F-32: Mindestanzahl Antworten, ab der eine Trefferquote je Thema überhaupt aussagekräftig
 * ist — an einer Stelle definiert statt (wie ursprünglich) in `stats` und `suggestions`
 * unabhängig doppelt, siehe Code-Review-Fund unten.
 */
const MIN_ATTEMPTS_FOR_WEAK_SPOT = 3;

/**
 * F-31/F-32/F-27: `learning_event`, über Thema/Fachgebiet hinweg verjoint — von `stats` (F-31)
 * und `suggestions` (F-27) gemeinsam genutzt, statt (wie ursprünglich) je Prozedur eine
 * eigene, identische Kopie dieser Abfrage samt Aggregations-Map zu pflegen (Code-Review-Fund,
 * nachgezogen). `occurredAt` wird nur von `stats` für den Tages-Verlauf gebraucht, aber
 * mitzuladen kostet nichts und hält die Funktion für beide Aufrufer nutzbar.
 */
async function fetchLearningEventsByThema(db: Database, userId: string, kursId: string) {
  return db
    .select({
      occurredAt: learningEvent.occurredAt,
      isCorrect: learningEvent.isCorrect,
      themaId: thema.id,
      themaTitle: thema.title,
      fachgebietTitle: fachgebiet.title,
    })
    .from(learningEvent)
    .innerJoin(contentItem, eq(contentItem.id, learningEvent.contentItemId))
    .innerJoin(thema, eq(thema.id, contentItem.themaId))
    .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
    .where(and(eq(learningEvent.userId, userId), eq(fachgebiet.kursId, kursId)));
}

/** Gruppiert das Ergebnis von `fetchLearningEventsByThema` nach Thema — ebenfalls gemeinsam
 * genutzt von `stats` und `suggestions` (siehe dort). */
function aggregateEventsByThema(events: Awaited<ReturnType<typeof fetchLearningEventsByThema>>) {
  const byThema = new Map<string, { title: string; fachgebietTitle: string; total: number; correct: number }>();
  for (const event of events) {
    const entry = byThema.get(event.themaId) ?? {
      title: event.themaTitle,
      fachgebietTitle: event.fachgebietTitle,
      total: 0,
      correct: 0,
    };
    entry.total += 1;
    if (event.isCorrect) entry.correct += 1;
    byThema.set(event.themaId, entry);
  }
  return byThema;
}

export const progressRouter = router({
  /**
   * F-30: Fortschrittsanzeige je Fachgebiet und Thema im ausgewählten Kurs (F-09:
   * Mehrfach-Kursbelegung aktiv genutzt, siehe Architekturplanung Abschnitt 13 — vorher über
   * alle eingeschriebenen Kurse hinweg aggregiert). "beherrscht" = user_progress.state
   * "review" — bei Karteikarten (FSRS-Karte hat die anfängliche Lernphase verlassen und ist
   * im Langzeit-Wiederholungsplan) wie bei Quiz-Fragen (die letzte Antwort war richtig, siehe
   * F-26/`recordQuizAttempt` oben) einheitlich dasselbe Feld, siehe Architekturplanung
   * Abschnitt 13. Theorie-Inhalte bleiben bewusst außen vor, da sie keinen
   * Beherrschungs-Zustand haben.
   */
  overview: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        contentItemId: contentItem.id,
        themaId: thema.id,
        themaTitle: thema.title,
        themaSortOrder: thema.sortOrder,
        fachgebietId: fachgebiet.id,
        fachgebietTitle: fachgebiet.title,
        fachgebietSortOrder: fachgebiet.sortOrder,
        state: userProgress.state,
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
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(
        and(
          inArray(contentItem.type, ["karteikarte", "quiz_mc", "zuordnung", "luecken", "kurzantwort"]),
          eq(contentItem.isActive, true),
        ),
      );

    type ThemaAgg = { id: string; title: string; sortOrder: number; total: number; mastered: number };
    type FachgebietAgg = {
      id: string;
      title: string;
      sortOrder: number;
      total: number;
      mastered: number;
      themen: Map<string, ThemaAgg>;
    };

    const fachgebiete = new Map<string, FachgebietAgg>();

    for (const row of rows) {
      let fg = fachgebiete.get(row.fachgebietId);
      if (!fg) {
        fg = {
          id: row.fachgebietId,
          title: row.fachgebietTitle,
          sortOrder: row.fachgebietSortOrder,
          total: 0,
          mastered: 0,
          themen: new Map(),
        };
        fachgebiete.set(row.fachgebietId, fg);
      }

      let th = fg.themen.get(row.themaId);
      if (!th) {
        th = { id: row.themaId, title: row.themaTitle, sortOrder: row.themaSortOrder, total: 0, mastered: 0 };
        fg.themen.set(row.themaId, th);
      }

      const isMastered = row.state === "review";
      fg.total += 1;
      th.total += 1;
      if (isMastered) {
        fg.mastered += 1;
        th.mastered += 1;
      }
    }

    const percent = (mastered: number, total: number) => (total === 0 ? 0 : Math.round((mastered / total) * 100));

    return [...fachgebiete.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((fg) => ({
        id: fg.id,
        title: fg.title,
        total: fg.total,
        mastered: fg.mastered,
        percent: percent(fg.mastered, fg.total),
        themen: [...fg.themen.values()]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((th) => ({
            id: th.id,
            title: th.title,
            total: th.total,
            mastered: th.mastered,
            percent: percent(th.mastered, th.total),
          })),
      }));
  }),

  /**
   * F-35: Restzeit-/Lernpensum-Anzeige. "Lerneinheit" wird hier auf Thema-Ebene
   * operationalisiert — der Anforderungskatalog spricht im selben Satz sowohl von
   * "Lerneinheiten" in der Formel als auch von "wie viele Themen pro Woche" in der
   * resultierenden Empfehlung; ein Thema gilt als abgeschlossen, sobald alle seine
   * Karteikarten-/Quiz-Items "beherrscht" sind (state "review", dieselbe Definition wie in
   * `overview` oben). Die im Anforderungskatalog vorgesehene "X von Y Handlungsbereichen
   * verfügbar"-Anzeige bei unvollständigem Rahmenlehrplan wird hier bewusst NICHT gebaut: Beide
   * aktuellen Kurse sind bereits vollständig befüllt (siehe Entwicklungsplan Iteration 4), und
   * es gibt aktuell keine gespeicherte "geplante Gesamtzahl" jenseits des tatsächlich
   * importierten Contents. Nachziehen, sobald ein Kurs erneut mit unvollständigem Content
   * startet, siehe Architekturplanung Abschnitt 13.
   */
  pacing: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const [course] = await ctx.db
      .select({ targetMode: kurs.targetMode })
      .from(kurs)
      .where(eq(kurs.id, input.kursId))
      .limit(1);
    if (!course) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht gefunden." });
    }

    const [enrollment] = await ctx.db
      .select({
        targetDate: userCourse.targetDate,
        planStartDate: userCourse.planStartDate,
        weeklyGoalItems: userCourse.weeklyGoalItems,
        joinedAt: userCourse.joinedAt,
      })
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);
    if (!enrollment) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht belegt." });
    }

    const rows = await ctx.db
      .select({ themaId: thema.id, state: userProgress.state })
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
      .leftJoin(
        userProgress,
        and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
      )
      .where(
        and(
          inArray(contentItem.type, ["karteikarte", "quiz_mc", "zuordnung", "luecken", "kurzantwort"]),
          eq(contentItem.isActive, true),
        ),
      );

    const byThema = new Map<string, { total: number; mastered: number }>();
    for (const row of rows) {
      const entry = byThema.get(row.themaId) ?? { total: 0, mastered: 0 };
      entry.total += 1;
      if (row.state === "review") entry.mastered += 1;
      byThema.set(row.themaId, entry);
    }
    const totalThemen = byThema.size;
    const completedThemen = [...byThema.values()].filter((t) => t.mastered === t.total).length;
    const remainingThemen = totalThemen - completedThemen;

    if (course.targetMode === "wochenziel") {
      // Rollierendes 7-Tage-Fenster statt Kalenderwoche (Montag–Sonntag): passend zum
      // "kontinuierliches Pensum ohne festen Stichtag"-Charakter dieses Modus, siehe
      // Anforderungskatalog F-35. Gezählt wird die reine Übungsmenge (alle learning_event-
      // Zeilen, richtig wie falsch beantwortet) statt abgeschlossener Themen — ohne festen
      // Termin gibt es keinen sinnvollen Bezugspunkt, WANN ein Thema "diese Woche" fertig
      // wurde, ohne eine bislang nicht vorhandene Thema-Abschluss-Zeitstempel einzuführen.
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentEvents = await ctx.db
        .select({ id: learningEvent.id })
        .from(learningEvent)
        .innerJoin(contentItem, eq(contentItem.id, learningEvent.contentItemId))
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .where(
          and(
            eq(learningEvent.userId, ctx.currentUser.id),
            eq(fachgebiet.kursId, input.kursId),
            gte(learningEvent.occurredAt, weekAgo),
          ),
        );

      return {
        mode: "wochenziel" as const,
        weeklyGoalItems: enrollment.weeklyGoalItems,
        itemsThisWeek: recentEvents.length,
        totalThemen,
        completedThemen,
      };
    }

    if (!enrollment.targetDate) {
      return {
        mode: "einzeltermin" as const,
        targetDate: null,
        planStartDate: enrollment.planStartDate,
        totalThemen,
        completedThemen,
        remainingThemen,
      };
    }

    const pacing = calculateEinzelterminPacing({
      totalThemen,
      remainingThemen,
      targetDate: new Date(enrollment.targetDate),
      planStartDate: new Date(enrollment.planStartDate ?? enrollment.joinedAt),
      now: new Date(),
    });

    return {
      mode: "einzeltermin" as const,
      targetDate: enrollment.targetDate,
      planStartDate: enrollment.planStartDate,
      totalThemen,
      completedThemen,
      remainingThemen,
      ...pacing,
    };
  }),

  submitReview: protectedProcedure.input(submitReviewInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();

    const [existing] = await ctx.db
      .select()
      .from(userProgress)
      .where(
        and(eq(userProgress.userId, ctx.currentUser.id), eq(userProgress.contentItemId, input.contentItemId)),
      )
      .limit(1);

    const current = existing
      ? {
          difficulty: existing.difficulty,
          stability: existing.stability,
          state: existing.state,
          dueAt: existing.dueAt,
          lastReviewedAt: existing.lastReviewedAt,
          reps: existing.reps,
          lapses: existing.lapses,
        }
      : initialProgressState(now);

    const next = scheduleReview(current, input.result, now);

    await ctx.db
      .insert(userProgress)
      .values({
        userId: ctx.currentUser.id,
        contentItemId: input.contentItemId,
        difficulty: next.difficulty,
        stability: next.stability,
        state: next.state,
        dueAt: next.dueAt,
        lastReviewedAt: next.lastReviewedAt,
        lastResult: input.result,
        reps: next.reps,
        lapses: next.lapses,
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.contentItemId],
        set: {
          difficulty: next.difficulty,
          stability: next.stability,
          state: next.state,
          dueAt: next.dueAt,
          lastReviewedAt: next.lastReviewedAt,
          lastResult: input.result,
          reps: next.reps,
          lapses: next.lapses,
        },
      });

    // F-31/F-32: siehe learningEvent in db/schema.ts — "richtig" heißt bei Karteikarten wie
    // bei den lapses oben "kein Again/nicht_gewusst", nicht dasselbe wie "state === review"
    // (das würde erst den Abschluss der FSRS-Lernphase widerspiegeln, nicht die aktuelle
    // Selbsteinschätzung).
    await ctx.db.insert(learningEvent).values({
      userId: ctx.currentUser.id,
      contentItemId: input.contentItemId,
      isCorrect: input.result !== "nicht_gewusst",
      occurredAt: now,
    });

    return { dueAt: next.dueAt };
  }),

  /**
   * F-31 Lernzeit: startet eine neue Lernsitzung (siehe learningSession in db/schema.ts und
   * apps/web/src/useLearningSession.ts). Wird vom Frontend aufgerufen, sobald der
   * Karteikarten- oder Quiz-Tab sichtbar aktiv wird.
   */
  startSession: protectedProcedure.input(activeKursInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();
    const [created] = await ctx.db
      .insert(learningSession)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId, startedAt: now, lastPingAt: now })
      .returning({ id: learningSession.id });

    return { sessionId: created!.id };
  }),

  /**
   * F-31 Lernzeit: Heartbeat alle paar Sekunden, solange die Sitzung aktiv bleibt — siehe
   * learningSession.lastPingAt in db/schema.ts für die Begründung (konservativer Ersatz für
   * ended_at bei Absturz/Verbindungsabbruch).
   */
  pingSession: protectedProcedure.input(sessionIdInputSchema).mutation(async ({ ctx, input }) => {
    const [updated] = await ctx.db
      .update(learningSession)
      .set({ lastPingAt: new Date() })
      .where(
        and(
          eq(learningSession.id, input.sessionId),
          eq(learningSession.userId, ctx.currentUser.id),
          isNull(learningSession.endedAt),
        ),
      )
      .returning({ id: learningSession.id });

    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Lernsitzung nicht gefunden oder bereits beendet." });
    }
  }),

  endSession: protectedProcedure.input(sessionIdInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();
    await ctx.db
      .update(learningSession)
      .set({ endedAt: now, lastPingAt: now })
      .where(
        and(
          eq(learningSession.id, input.sessionId),
          eq(learningSession.userId, ctx.currentUser.id),
          isNull(learningSession.endedAt),
        ),
      );
  }),

  /**
   * F-31/F-32: Lernstatistik + Schwachstellenanalyse für den ausgewählten Kurs. Aggregiert wie
   * `overview` oben bewusst in TypeScript nach einer einzelnen SQL-Abfrage je Datenquelle,
   * statt mehrerer GROUP-BY-Abfragen — Datenmenge je Nutzer:in ist klein genug, siehe
   * Architekturplanung Abschnitt 13.
   */
  stats: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    // Code-Review-Fund, nachgezogen: `events` und `sessions` sind voneinander unabhängig
    // (verschiedene Tabellen, keine Datenabhängigkeit) und liefen vorher nacheinander statt
    // parallel — Promise.all spart einen kompletten DB-Roundtrip Wartezeit.
    const [events, sessions] = await Promise.all([
      fetchLearningEventsByThema(ctx.db, ctx.currentUser.id, input.kursId),
      ctx.db
        .select({
          startedAt: learningSession.startedAt,
          lastPingAt: learningSession.lastPingAt,
          endedAt: learningSession.endedAt,
        })
        .from(learningSession)
        .where(and(eq(learningSession.userId, ctx.currentUser.id), eq(learningSession.kursId, input.kursId))),
    ]);

    const totalAnswered = events.length;
    const correctCount = events.filter((event) => event.isCorrect).length;
    const hitRatePercent = totalAnswered === 0 ? 0 : Math.round((correctCount / totalAnswered) * 100);

    const byDay = new Map<string, { total: number; correct: number }>();
    for (const event of events) {
      const day = event.occurredAt.toISOString().slice(0, 10);
      const entry = byDay.get(day) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (event.isCorrect) entry.correct += 1;
      byDay.set(day, entry);
    }
    const dailyHitRate = [...byDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, { total, correct }]) => ({
        date,
        total,
        correct,
        percent: Math.round((correct / total) * 100),
      }));

    const byThema = aggregateEventsByThema(events);
    const weakThemen = [...byThema.entries()]
      .map(([id, entry]) => ({
        id,
        title: entry.title,
        fachgebietTitle: entry.fachgebietTitle,
        total: entry.total,
        correct: entry.correct,
        percent: Math.round((entry.correct / entry.total) * 100),
      }))
      .filter((entry) => entry.total >= MIN_ATTEMPTS_FOR_WEAK_SPOT)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 5);

    const learningMs = sessions.reduce((sum, session) => {
      const end = session.endedAt ?? session.lastPingAt;
      return sum + Math.max(0, end.getTime() - session.startedAt.getTime());
    }, 0);

    return {
      totalAnswered,
      correctCount,
      hitRatePercent,
      learningMinutes: Math.round(learningMs / 60_000),
      dailyHitRate,
      weakThemen,
    };
  }),

  /**
   * F-27 "Weiter lernen"-Einstieg: Top-3-Themenvorschläge, gerankt nach einer Kombination aus
   * Fälligkeit (F-20, wie lange überfällig) und Schwachstelle (F-32, niedrige Trefferquote).
   * Gewichtung 50/50 und die MIN_ATTEMPTS-Schwelle (analog zu `stats.weakThemen` oben) sind
   * bewusste, dokumentierte Annahmen ohne Vorgabe im Anforderungskatalog — siehe
   * Architekturplanung Abschnitt 13. Ein Thema landet nur in der Liste, wenn es tatsächlich
   * etwas Konkretes zu tun gibt (fällige Karten ODER genug Quiz-Antworten für eine belastbare
   * Trefferquote) — sonst gäbe es nichts, das der Klick sinnvoll "startet".
   */
  suggestions: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const now = new Date();

    // Code-Review-Fund, nachgezogen: `overdueRows` (fällige Karten) und `eventRows`
    // (Trefferquote) sind unabhängige Abfragen über verschiedene Tabellen und liefen vorher
    // nacheinander statt parallel.
    const [overdueRows, eventRows] = await Promise.all([
      ctx.db
        .select({
          themaId: thema.id,
          themaTitle: thema.title,
          fachgebietTitle: fachgebiet.title,
          dueAt: userProgress.dueAt,
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
        .innerJoin(
          userProgress,
          and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
        )
        .where(and(eq(contentItem.type, "karteikarte"), eq(contentItem.isActive, true), lte(userProgress.dueAt, now))),
      fetchLearningEventsByThema(ctx.db, ctx.currentUser.id, input.kursId),
    ]);

    const byThemaOverdue = new Map<
      string,
      { title: string; fachgebietTitle: string; dueCount: number; maxOverdueDays: number }
    >();
    for (const row of overdueRows) {
      const overdueDays = Math.max(0, (now.getTime() - row.dueAt.getTime()) / 86_400_000);
      const entry = byThemaOverdue.get(row.themaId) ?? {
        title: row.themaTitle,
        fachgebietTitle: row.fachgebietTitle,
        dueCount: 0,
        maxOverdueDays: 0,
      };
      entry.dueCount += 1;
      entry.maxOverdueDays = Math.max(entry.maxOverdueDays, overdueDays);
      byThemaOverdue.set(row.themaId, entry);
    }

    const byThemaWeak = aggregateEventsByThema(eventRows);

    const themaIds = new Set([...byThemaOverdue.keys(), ...byThemaWeak.keys()]);
    const candidates = [...themaIds]
      .map((themaId) => {
        const overdue = byThemaOverdue.get(themaId);
        const weak = byThemaWeak.get(themaId);
        const weakPercent =
          weak && weak.total >= MIN_ATTEMPTS_FOR_WEAK_SPOT ? Math.round((weak.correct / weak.total) * 100) : null;
        return {
          themaId,
          title: (overdue ?? weak)!.title,
          fachgebietTitle: (overdue ?? weak)!.fachgebietTitle,
          dueCount: overdue?.dueCount ?? 0,
          maxOverdueDays: overdue?.maxOverdueDays ?? 0,
          weakPercent,
        };
      })
      .filter((candidate) => candidate.dueCount > 0 || candidate.weakPercent !== null);

    if (candidates.length === 0) {
      return [];
    }

    const maxOverdueDaysAcrossThemen = Math.max(1, ...candidates.map((candidate) => candidate.maxOverdueDays));

    return candidates
      .map((candidate) => {
        const overdueScore = candidate.maxOverdueDays / maxOverdueDaysAcrossThemen;
        const weakScore = candidate.weakPercent === null ? 0 : (100 - candidate.weakPercent) / 100;
        return {
          themaId: candidate.themaId,
          title: candidate.title,
          fachgebietTitle: candidate.fachgebietTitle,
          dueCount: candidate.dueCount,
          overdueDays: Math.round(candidate.maxOverdueDays),
          weakPercent: candidate.weakPercent,
          // Fällige Karten sind konkret abarbeitbar — bei vorhandenem Rückstand wird
          // deshalb immer Karteikarten vorgeschlagen, sonst Quiz (dann muss weakPercent
          // gesetzt sein, siehe Filter oben).
          mode: candidate.dueCount > 0 ? ("flashcards" as const) : ("quiz" as const),
          score: overdueScore * 0.5 + weakScore * 0.5,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ score: _score, ...suggestion }) => suggestion);
  }),
});
