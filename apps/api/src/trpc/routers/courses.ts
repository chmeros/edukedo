import { activeKursInputSchema, enrollInputSchema, setCourseTargetInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { isEnrollmentExclusive, kursKategorie, kursZielgruppe, matchesKursZielgruppe } from "../../course-audience";
import { kurs, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** Drizzles `date`-Spalten sind im String-Modus (siehe schema.ts) — Konvertierung analog zu
 * `birthDate` in auth.ts, damit "YYYY-MM-DD" statt einer vollen ISO-Timestamp-Zeichenkette
 * gespeichert wird. */
function toDateOnlyString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export const coursesRouter = router({
  /**
   * F-13/Zielgruppen-Eignung (siehe Architekturplanung Abschnitt 13): Kurse, deren
   * metadata.zielgruppe nicht zur Altersgruppe der aktuellen Person passt (z. B. der
   * Fachwirt-Kurs für ein minderjähriges Konto), werden aus "Verfügbare Kurse" entfernt statt
   * nur optisch markiert — bewusst nur für NEUE Beitritte. Bereits eingeschriebene Personen
   * behalten Zugriff auf ihre laufenden Kurse, auch wenn sich die Zielgruppen-Zuordnung eines
   * Kurses später ändert.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: kurs.id,
        slug: kurs.slug,
        title: kurs.title,
        type: kurs.type,
        metadata: kurs.metadata,
        targetMode: kurs.targetMode,
        joinedAt: userCourse.joinedAt,
        targetDate: userCourse.targetDate,
        planStartDate: userCourse.planStartDate,
        weeklyGoalItems: userCourse.weeklyGoalItems,
      })
      .from(kurs)
      .leftJoin(userCourse, and(eq(userCourse.kursId, kurs.id), eq(userCourse.userId, ctx.currentUser.id)))
      .where(eq(kurs.isPublished, true));

    return rows
      .filter(
        (row) => row.joinedAt !== null || matchesKursZielgruppe(kursZielgruppe(row.metadata), ctx.currentUser.isMinor),
      )
      // Ohne ORDER BY liefert Postgres keine garantierte Reihenfolge — in der Praxis meist
      // Einfügereihenfolge, wodurch der zuerst per db:seed angelegte Demo-Kurs vor den echten
      // Kursen erschien. Demo-Kurse (type "demo") bewusst ans Ende sortiert, echte Kurse
      // untereinander in der bisherigen (Einfüge-)Reihenfolge belassen.
      .sort((a, b) => Number(a.type === "demo") - Number(b.type === "demo"))
      .map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        type: row.type,
        // F-102: steuert im Frontend, ob ein Beitritt die Bestätigung "aktuellen Kurs
        // verlassen?" auslösen muss (siehe course-audience.ts, Architekturplanung Abschnitt 13).
        kategorie: kursKategorie(row.metadata),
        joined: row.joinedAt !== null,
        // F-35: nur für bereits belegte Kurse aussagekräftig — die Vorbelegungs-Felder bleiben
        // bei row.joinedAt === null (Kurs zum Beitreten, noch nicht eigener) einfach null.
        targetMode: row.targetMode,
        targetDate: row.targetDate,
        planStartDate: row.planStartDate,
        weeklyGoalItems: row.weeklyGoalItems,
      }));
  }),

  enroll: protectedProcedure.input(enrollInputSchema).mutation(async ({ ctx, input }) => {
    const [course] = await ctx.db.select().from(kurs).where(eq(kurs.id, input.kursId)).limit(1);
    if (!course?.isPublished) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht gefunden." });
    }

    const [existingEnrollment] = await ctx.db
      .select()
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);

    // Nur neue Beitritte prüfen (siehe list oben) — ein erneuter enroll-Aufruf für einen bereits
    // laufenden Kurs bleibt ein no-op statt fälschlich zu blockieren.
    if (existingEnrollment) {
      return { success: true };
    }

    if (!matchesKursZielgruppe(kursZielgruppe(course.metadata), ctx.currentUser.isMinor)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Dieser Kurs ist für deine Altersgruppe nicht vorgesehen." });
    }

    // F-102: Für Kurse der Kategorie "erwachsenenbildung" ist zu einem Zeitpunkt nur eine
    // aktive Belegung vorgesehen — das Frontend kennt einen Konflikt bereits aus courses.list
    // und holt vorab eine Bestätigung ein (siehe Architekturplanung Abschnitt 13, integrierter
    // Wechsel-Flow statt zwei getrennter Schritte), diese Prüfung hier ist die serverseitige
    // Durchsetzung, falls das Frontend den Konflikt aus irgendeinem Grund nicht kennt.
    if (isEnrollmentExclusive(kursKategorie(course.metadata))) {
      const enrollments = await ctx.db
        .select({ kursId: userCourse.kursId, metadata: kurs.metadata, title: kurs.title })
        .from(userCourse)
        .innerJoin(kurs, eq(kurs.id, userCourse.kursId))
        .where(eq(userCourse.userId, ctx.currentUser.id));
      const conflict = enrollments.find((row) => isEnrollmentExclusive(kursKategorie(row.metadata)));

      if (conflict) {
        if (input.leaveKursId !== conflict.kursId) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Du bist bereits in "${conflict.title}" eingeschrieben — Weiterbildungskurse erlauben nur eine aktive Belegung gleichzeitig.`,
          });
        }
        // Atomarer Wechsel: alte Belegung verlassen und neue in derselben Transaktion anlegen,
        // damit nie ein Zwischenzustand ohne jede Belegung dieser Kategorie sichtbar wird.
        await ctx.db.transaction(async (tx) => {
          await tx
            .delete(userCourse)
            .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, conflict.kursId)));
          await tx.insert(userCourse).values({ userId: ctx.currentUser.id, kursId: input.kursId });
        });
        return { success: true };
      }
    }

    await ctx.db
      .insert(userCourse)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId })
      .onConflictDoNothing();

    return { success: true };
  }),

  /**
   * F-102: Allgemeine "Kurs verlassen"-Funktion (nicht nur für den Exklusivitäts-Wechsel-Flow
   * oben nutzbar) — löscht ausschließlich die Beleg-Zeile (`user_course`); Lernhistorie
   * (`user_progress`/`learning_event`) bleibt erhalten, falls die Person den Kurs später erneut
   * belegt (kein `ON DELETE CASCADE` von `user_course` auf diese Tabellen, siehe Abschnitt 4.3).
   */
  leave: protectedProcedure.input(activeKursInputSchema).mutation(async ({ ctx, input }) => {
    const deleted = await ctx.db
      .delete(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .returning();
    if (deleted.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht belegt." });
    }
    return { success: true };
  }),

  /**
   * F-35/F-04: Setzt die persönliche Zielplanung (Zieltermin/Plan-Start bei "einzeltermin",
   * Wochenziel bei "wochenziel", siehe kurs.targetMode) für einen bereits belegten Kurs.
   * `undefined` lässt ein Feld unverändert, `null` löscht es explizit wieder (z. B. um vom
   * Countdown zurück in den ungeplanten Zustand zu wechseln) — daher `undefined` als
   * Sentinel-Wert je Feld statt eines pauschalen "alles überschreiben".
   */
  setTarget: protectedProcedure.input(setCourseTargetInputSchema).mutation(async ({ ctx, input }) => {
    const [enrollment] = await ctx.db
      .select({ id: userCourse.id, targetDate: userCourse.targetDate, planStartDate: userCourse.planStartDate })
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);
    if (!enrollment) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht belegt." });
    }

    const updates: Partial<typeof userCourse.$inferInsert> = {};
    if (input.targetDate !== undefined) {
      updates.targetDate = input.targetDate ? toDateOnlyString(input.targetDate) : null;
    }
    if (input.planStartDate !== undefined) {
      updates.planStartDate = input.planStartDate ? toDateOnlyString(input.planStartDate) : null;
    }
    if (input.weeklyGoalItems !== undefined) {
      updates.weeklyGoalItems = input.weeklyGoalItems;
    }

    // Nach Anwendung der Änderungen gültige Kombination sicherstellen — geprüft anhand der
    // resultierenden Werte (nicht nur der übergebenen), da targetDate/planStartDate auch in
    // getrennten Aufrufen gesetzt werden können.
    const finalTargetDate = "targetDate" in updates ? updates.targetDate : enrollment.targetDate;
    const finalPlanStartDate = "planStartDate" in updates ? updates.planStartDate : enrollment.planStartDate;
    if (finalTargetDate && finalPlanStartDate && finalTargetDate <= finalPlanStartDate) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Der Zieltermin muss nach dem Plan-Startdatum liegen." });
    }

    if (Object.keys(updates).length > 0) {
      await ctx.db.update(userCourse).set(updates).where(eq(userCourse.id, enrollment.id));
    }

    return { success: true };
  }),
});
