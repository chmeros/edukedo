import {
  activeKursInputSchema,
  fallaufgabePayloadSchema,
  finishExamInputSchema,   startExamInputSchema,
  submitExamAnswerInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, inArray, sql } from "drizzle-orm";
import {
  contentItem,
  contentItemVersion,
  examAnswer,
  examSession,
  fachgebiet,
  kurs,
  learningEvent,
  thema,
  userCourse,
  userProgress,
} from "../../db/schema";
import { PROGRESS_COUNTABLE_TYPES } from "../../progress-items";
import { kursPresentationMinutes, kursPruefungsablauf, kursPruefungsbereiche } from "../../pruefungsbereiche";
import { protectedProcedure, router } from "../trpc";

const EXAM_MODE = "schriftliche_pruefung";

/** Eine Fallaufgabe entspricht grob 20 Minuten Bearbeitungszeit (4 Teilaufgaben à 5 Punkte). */
const MINUTES_PER_FALLAUFGABE = 20;

export const examRouter = router({
  /**
   * F-154 (Hilfeseite „Gelassen bleiben“, Nutzer-Feedback vom 05.10.2026, siehe Architekturplanung
   * Abschnitt 13): Prüfungsablauf (Stichpunkte), Präsentationsdauer und der Lernstand je
   * Prüfungsbereich. Lernstand = beherrschte ÷ zählbare Items der zum Bereich gehörenden
   * Fachgebiete (gleiche Zählweise wie `progress.overview`/`courses.progress`, siehe progress-items.ts) —
   * ausdrücklich keine Prognose für die Prüfungsnote.
   */
  guide: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select({ metadata: kurs.metadata })
      .from(kurs)
      .innerJoin(userCourse, and(eq(userCourse.kursId, kurs.id), eq(userCourse.userId, ctx.currentUser.id)))
      .where(eq(kurs.id, input.kursId))
      .limit(1);
    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht gefunden oder nicht belegt." });
    }
    const areas = kursPruefungsbereiche(row.metadata);

    const perFachgebiet = new Map<string, { total: number; mastered: number }>();
    if (areas.length > 0) {
      const rows = await ctx.db
        .select({
          code: fachgebiet.code,
          total: sql<number>`count(*)::int`,
          mastered: sql<number>`count(*) filter (where ${userProgress.state} = 'review')::int`,
        })
        .from(contentItem)
        .innerJoin(thema, eq(thema.id, contentItem.themaId))
        .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
        .leftJoin(
          userProgress,
          and(eq(userProgress.contentItemId, contentItem.id), eq(userProgress.userId, ctx.currentUser.id)),
        )
        .where(
          and(
            eq(fachgebiet.kursId, input.kursId),
            inArray(contentItem.type, PROGRESS_COUNTABLE_TYPES),
            eq(contentItem.isActive, true),
          ),
        )
        .groupBy(fachgebiet.code);
      for (const entry of rows) perFachgebiet.set(entry.code, { total: entry.total, mastered: entry.mastered });
    }

    return {
      presentationMinutes: kursPresentationMinutes(row.metadata),
      ablauf: kursPruefungsablauf(row.metadata),
      areas: areas.map((area) => {
        const sum = area.fachgebietCodes.reduce(
          (acc, code) => {
            const entry = perFachgebiet.get(code);
            return { total: acc.total + (entry?.total ?? 0), mastered: acc.mastered + (entry?.mastered ?? 0) };
          },
          { total: 0, mastered: 0 },
        );
        return {
          key: area.key,
          title: area.title,
          part: area.part,
          minutes: area.minutes,
          total: sum.total,
          mastered: sum.mastered,
          percent: sum.total === 0 ? 0 : Math.round((sum.mastered / sum.total) * 100),
        };
      }),
    };
  }),

  /**
   * F-149: Prüfungsbereiche der echten schriftlichen Abschlussprüfung dieses Kurses (leer für Kurse
   * ohne Angabe in `kurs.metadata.pruefungsbereiche` → freie Mischprüfung). Nur für belegte Kurse.
   */
  areas: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select({ metadata: kurs.metadata })
      .from(kurs)
      .innerJoin(userCourse, and(eq(userCourse.kursId, kurs.id), eq(userCourse.userId, ctx.currentUser.id)))
      .where(eq(kurs.id, input.kursId))
      .limit(1);
    return (row ? kursPruefungsbereiche(row.metadata) : []).map((area) => ({
      key: area.key,
      title: area.title,
      part: area.part,
      minutes: area.minutes,
    }));
  }),

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
        fachgebietCode: fachgebiet.code,
        fachgebietTitle: fachgebiet.title,
        kursMetadata: kurs.metadata,
      })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .innerJoin(kurs, eq(kurs.id, fachgebiet.kursId))
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

    // F-149: mit `pruefungsbereichKey` nur die Fachgebiete dieses Prüfungsbereichs, und so viele
    // Fallaufgaben, wie in die vorgeschriebene Dauer passen (reihum über die Fachgebiete verteilt,
    // damit der Bereich nicht von einem Fachgebiet dominiert wird). Ohne Key: wie bisher je
    // Fachgebiet die erste (zufällig sortierte) Fallaufgabe über den ganzen Kurs.
    let area: ReturnType<typeof kursPruefungsbereiche>[number] | undefined;
    if (input.pruefungsbereichKey && candidates.length > 0) {
      const areas = kursPruefungsbereiche(candidates[0]?.kursMetadata);
      area = areas.find((entry) => entry.key === input.pruefungsbereichKey);
      if (!area) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Unbekannter Prüfungsbereich für diesen Kurs." });
      }
    }

    const pool = area ? candidates.filter((candidate) => area.fachgebietCodes.includes(candidate.fachgebietCode)) : candidates;
    const byFachgebiet = new Map<string, typeof candidates>();
    for (const candidate of pool) {
      byFachgebiet.set(candidate.fachgebietId, [...(byFachgebiet.get(candidate.fachgebietId) ?? []), candidate]);
    }
    const target = area ? Math.max(1, Math.round(area.minutes / MINUTES_PER_FALLAUFGABE)) : byFachgebiet.size;
    const queues = [...byFachgebiet.values()];
    const selected: typeof candidates = [];
    while (selected.length < target && queues.some((queue) => queue.length > 0)) {
      for (const queue of queues) {
        const next = queue.shift();
        if (next && selected.length < target) selected.push(next);
      }
    }

    if (selected.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Keine Fallaufgaben für diesen Kurs verfügbar." });
    }

    const [session] = await ctx.db
      .insert(examSession)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId, mode: EXAM_MODE, assignedItemIds: selected.map((candidate) => candidate.id) })
      .returning();
    if (!session) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prüfungssitzung konnte nicht angelegt werden." });
    }

    return {
      sessionId: session.id,
      // F-149: vorgeschriebene Dauer des Prüfungsbereichs (sonst wählt die Person sie selbst).
      durationMinutes: area?.minutes ?? null,
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
    // Review B12/LOG-04: eine abgeschlossene Sitzung bleibt, wie sie war (Score, Bestwert und Achievement hängen daran).
    if (session.finishedAt) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Diese Prüfungssitzung ist bereits abgeschlossen." });
    }
    // Nur Aufgaben, die beim Start zugeteilt wurden (Sitzungen aus der Zeit vor dieser Prüfung haben keine Liste).
    if (session.assignedItemIds && !session.assignedItemIds.includes(input.contentItemId)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Diese Fallaufgabe gehört nicht zu dieser Prüfungssitzung." });
    }

    // Die Aufgabe muss im Kurs der Sitzung liegen (nie eine Aufgabe eines fremden oder nicht belegten Kurses).
    const [item] = await ctx.db
      .select({ id: contentItem.id, currentVersion: contentItem.currentVersion, payload: contentItem.payload })
      .from(contentItem)
      .innerJoin(thema, eq(thema.id, contentItem.themaId))
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(
        and(
          eq(contentItem.id, input.contentItemId),
          eq(contentItem.type, "fallaufgabe"),
          eq(fachgebiet.kursId, session.kursId),
        ),
      )
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

    // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): ein "DELETE dann
    // INSERT" ist bei zwei nahezu gleichzeitigen Einreichungen (Doppel-Klick, Client-Retry)
    // nicht atomar — beide DELETEs können vor beiden INSERTs laufen, wodurch zwei Zeilen für
    // dieselbe Fallaufgabe derselben Sitzung entstehen, die `finish()` unten dann doppelt
    // zählt. Ein echter Upsert über den neuen Unique-Index (siehe schema.ts) ist atomar: die
    // zweite Einreichung ERSETZT die erste, statt eine zusätzliche Zeile anzulegen.
    const maxPoints = parts.reduce((sum, part) => sum + part.points, 0);
    const isCorrect = maxPoints > 0 ? totalPoints / maxPoints >= 0.5 : null;

    // Review B12/LOG-04: alles in einer Transaktion, genau eine Antwort und höchstens ein Lernereignis je Aufgabe und Sitzung.
    await ctx.db.transaction(async (tx) => {
      // Wurde die Aufgabe zwischen zwei Einreichungen redaktionell geändert (neue Version), bliebe sonst die Antwort zur alten
      // Version zusätzlich stehen und finish() zählte die Aufgabe doppelt.
      const itemVersions = await tx
        .select({ id: contentItemVersion.id })
        .from(contentItemVersion)
        .where(eq(contentItemVersion.contentItemId, item.id));
      const earlier = await tx
        .select({ id: examAnswer.id, versionId: examAnswer.contentItemVersionId })
        .from(examAnswer)
        .where(
          and(
            eq(examAnswer.examSessionId, input.sessionId),
            inArray(
              examAnswer.contentItemVersionId,
              itemVersions.map((entry) => entry.id),
            ),
          ),
        );
      const stale = earlier.filter((entry) => entry.versionId !== version.id).map((entry) => entry.id);
      if (stale.length > 0) await tx.delete(examAnswer).where(inArray(examAnswer.id, stale));

      await tx
        .insert(examAnswer)
        .values({
          examSessionId: input.sessionId,
          contentItemVersionId: version.id,
          givenAnswer: { parts: clampedParts },
          points: totalPoints,
        })
        .onConflictDoUpdate({
          target: [examAnswer.examSessionId, examAnswer.contentItemVersionId],
          set: { givenAnswer: { parts: clampedParts }, points: totalPoints },
        });

      if (isCorrect === null) return;
      // Fallaufgaben haben keine einzelne "richtig/falsch"-Antwort; Näherung wie unten beschrieben. Bei erneuter Einreichung
      // wird das Ereignis dieser Sitzung korrigiert statt ein weiteres anzulegen (Statistik zählt die Aufgabe einmal).
      const [sessionEvent] =
        earlier.length > 0
          ? await tx
              .select({ id: learningEvent.id })
              .from(learningEvent)
              .where(
                and(
                  eq(learningEvent.userId, ctx.currentUser.id),
                  eq(learningEvent.contentItemId, item.id),
                  sql`${learningEvent.occurredAt} >= ${session.startedAt}`,
                ),
              )
              .orderBy(sql`${learningEvent.occurredAt} desc`)
              .limit(1)
          : [];
      if (sessionEvent) {
        await tx.update(learningEvent).set({ isCorrect }).where(eq(learningEvent.id, sessionEvent.id));
      } else {
        await tx.insert(learningEvent).values({ userId: ctx.currentUser.id, contentItemId: item.id, isCorrect });
      }
    });

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

    // Review B12/LOG-04: Eine bereits abgeschlossene Sitzung liefert ihr gespeichertes Ergebnis, ohne sich zu ändern.
    if (session.finishedAt) {
      return { achievedPoints, maxPoints, score: session.score ?? score, answeredCount: answers.length };
    }
    // Ohne eine einzige Antwort gibt es nichts zu werten: kein Abschluss, damit weder ein Score 0 noch das Achievement
    // "Erste Prüfungssimulation" entsteht.
    if (answers.length === 0) {
      return { achievedPoints, maxPoints, score, answeredCount: 0 };
    }

    await ctx.db.update(examSession).set({ finishedAt: new Date(), score }).where(eq(examSession.id, input.sessionId));

    return { achievedPoints, maxPoints, score, answeredCount: answers.length };
  }),
});
