import {
  adminCreateCompanyAccountInputSchema,
  adminFindUserByEmailInputSchema,
  adminSetAiFeatureFlagsInputSchema,
  adminUpdateCompanyBillingInputSchema,
  createSponsorInputSchema,
  resolveContentReportInputSchema,
  resolveReportInputSchema,
  setSponsorActiveInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq, gte, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { pingOllama } from "../../ai/ollama-provider";
import { createCompanyAccount } from "../../auth/company-setup";
import { kursZielgruppe } from "../../course-audience";
import { importAllContent } from "../../db/import-content";
import { importPreviewToken } from "../../db/import-preview";
import { companyAccount, contentItem, contentReport, exerciseSet, kurs, learningEvent, report, sponsor, user } from "../../db/schema";
import { env } from "../../env";
import { pingPaymentService } from "../../payment/client";
import { redisConnection } from "../../queue/connection";
import { checkAllServices } from "../../system-status";
import { roleProcedure, router } from "../trpc";

const ACTIVE_USERS_WINDOW_MS = 1000 * 60 * 60 * 24 * 7; // 7 Tage (WAU, siehe Anforderungskatalog Abschnitt 11)
const EXERCISE_SET_WINDOW_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

/**
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — bewusst zunächst nur
 * Kurs-Veröffentlichung und der Bulk-Import-Trigger (F-17, siehe Entwicklungsplan
 * Iteration 3). Löst den bisherigen Weg ab, `kurs.is_published` zu setzen und den
 * Content-Import auszulösen, ausschließlich per direktem SQL-/CLI-Zugriff. Die eigentliche
 * Fragen-/Karteikarten-Pflege (CMS-Teil von F-11) bleibt ein späterer Ausbauschritt.
 */
export const adminRouter = router({
  courses: roleProcedure("admin").query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: kurs.id,
        slug: kurs.slug,
        title: kurs.title,
        type: kurs.type,
        isPublished: kurs.isPublished,
        metadata: kurs.metadata,
      })
      .from(kurs)
      .orderBy(kurs.title);

    // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): `targetsMinors`
    // ist rein informativ fürs Admin-Panel (zeigt an, welche Kurse laut metadata.zielgruppe
    // "minderjaehrige" sind) — die eigentliche Durchsetzung sitzt unten in `setPublished`.
    return rows.map(({ metadata, ...row }) => ({
      ...row,
      targetsMinors: kursZielgruppe(metadata) === "minderjaehrige",
    }));
  }),

  /**
   * Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): Diese Prozedur war
   * bisher ein ungebremstes UPDATE ohne jeden Bezug zur Eltern-Consent-Pflicht — die im
   * CLAUDE.md/Architekturplanung dokumentierte harte Regel ("Mathe-Kurs darf erst live gehen,
   * nachdem der vollständige Eltern-Consent-Flow produktiv steht") war damit eine rein
   * prozedurale Absprache, nicht im Code erzwungen. Da der Consent-Flow selbst inzwischen
   * vollständig implementiert ist (F-08/F-90, siehe consent.ts/parent.ts), lässt sich "ist er
   * produktiv" nicht mehr sinnvoll als DB-Flag modellieren — stattdessen erzwingt diese
   * Prozedur jetzt eine explizite, separate Bestätigung (`confirmMinorsAudiencePublish`) beim
   * ERSTMALIGEN Veröffentlichen eines Kurses mit `metadata.zielgruppe === "minderjaehrige"`,
   * damit ein einzelner, unbedachter Klick (oder eine kompromittierte Admin-Sitzung) das nicht
   * mehr versehentlich auslösen kann — die UI (AdminPanel.tsx) zeigt dafür einen eigenen
   * Bestätigungsdialog statt des normalen Ein-Klick-Buttons.
   */
  setPublished: roleProcedure("admin")
    .input(
      z.object({
        kursId: z.string().uuid(),
        isPublished: z.boolean(),
        confirmMinorsAudiencePublish: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select({ isPublished: kurs.isPublished, metadata: kurs.metadata })
        .from(kurs)
        .where(eq(kurs.id, input.kursId))
        .limit(1);

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Kurs wurde nicht gefunden." });
      }

      const isNewlyPublishing = input.isPublished && !existing.isPublished;
      const targetsMinors = kursZielgruppe(existing.metadata) === "minderjaehrige";

      if (isNewlyPublishing && targetsMinors && !input.confirmMinorsAudiencePublish) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Dieser Kurs richtet sich an Minderjährige — die Veröffentlichung erfordert eine explizite Bestätigung, dass der Eltern-Consent-Flow (F-08/F-90) produktiv steht.",
        });
      }

      await ctx.db.update(kurs).set({ isPublished: input.isPublished }).where(eq(kurs.id, input.kursId));
      return { success: true };
    }),

  // F-17: löst das bisherige manuelle `pnpm db:import-content` per SSH/Terminal ab. Liest
  // das Content-Zwischenformat aus content/ (Repo-Root) neu ein und gleicht den Content je Thema
  // ab (siehe import-content.ts; ohne Löschen von Items, Lernfortschritt bleibt erhalten) —
  // is_published bleibt dabei unangetastet. Zweistufig (Entwurf sicherer-content-import.md,
  // Entscheidung 5): `previewImport` ist ein Trockenlauf und liefert Zusammenfassung und
  // Prüfmarke, `triggerImport` schreibt nur mit der passenden Marke.
  previewImport: roleProcedure("admin").mutation(async () => {
    try {
      const summary = await importAllContent({ dryRun: true });
      return { summary, previewToken: importPreviewToken(summary) };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Import-Vorschau fehlgeschlagen.",
      });
    }
  }),

  triggerImport: roleProcedure("admin")
    .input(z.object({ previewToken: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        // Erneuter Trockenlauf: Hat sich Content oder Datenbank seit der Vorschau geändert, stimmt die Marke nicht mehr.
        const check = await importAllContent({ dryRun: true });
        if (importPreviewToken(check) !== input.previewToken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Der Content hat sich seit der Vorschau geändert. Bitte die Vorschau erneut ausführen.",
          });
        }
        return await importAllContent();
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Content-Import fehlgeschlagen.",
        });
      }
    }),

  /**
   * F-91: Business-Lizenzen, Baustein 1. Liste aller Unternehmens-Konten für den
   * Admin-Bereich — noch ohne Sitzplatz-Auslastung (belegte/freie Plätze, erst Baustein 2,
   * sobald user_company_membership existiert).
   */
  companyAccounts: roleProcedure("admin").query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: companyAccount.id,
        name: companyAccount.name,
        contactEmail: companyAccount.contactEmail,
        seatLimit: companyAccount.seatLimit,
        billingStatus: companyAccount.billingStatus,
        passwordSet: companyAccount.passwordSet,
        createdAt: companyAccount.createdAt,
      })
      .from(companyAccount)
      .orderBy(companyAccount.name);
  }),

  /**
   * F-91: Legt ein neues Unternehmens-Konto an — bewusst kein Self-Service-Signup, die
   * Abrechnung (Sitzplatz-Kontingent, Rechnung/Überweisung) läuft manuell außerhalb des
   * Systems, ein Admin richtet das Konto erst danach ein (siehe Architekturplanung
   * Abschnitt 4.5/13). `billing_status` bleibt bewusst beim Default "pending" — das
   * Freischalt-Werkzeug dafür ist ein eigener, späterer Baustein.
   */
  createCompanyAccount: roleProcedure("admin")
    .input(adminCreateCompanyAccountInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(companyAccount)
        .where(eq(companyAccount.contactEmail, input.contactEmail))
        .limit(1);
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Diese Kontakt-E-Mail ist bereits einem Unternehmens-Konto zugeordnet.",
        });
      }

      const { id, setupUrl } = await createCompanyAccount(ctx.db, input);

      return {
        id,
        // Nur außerhalb von production offengelegt — es gibt noch keinen echten
        // E-Mail-Versand (siehe apps/api/src/email/sender.ts), daher wird der Setup-Link
        // hier direkt für die manuelle Weiterverwendung zurückgegeben (siehe auth.register).
        devSetupUrl: env.NODE_ENV === "production" ? undefined : setupUrl,
      };
    }),

  /**
   * F-91 Baustein 6: Freischalt-Werkzeug nach manuellem Zahlungseingang (Rechnung/Überweisung
   * außerhalb des Systems) — kein automatisierter Checkout, kein Anschluss an den separaten
   * Payment-Service (siehe Architekturplanung Abschnitt 4.5/13). Bewusst EIN Endpunkt für beide
   * Felder statt zwei getrennter: `billing_status` und `seat_limit` werden in der Praxis
   * gemeinsam nach demselben Zahlungseingang aktualisiert, nie unabhängig voneinander.
   */
  updateCompanyBilling: roleProcedure("admin")
    .input(adminUpdateCompanyBillingInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(companyAccount)
        .set({ billingStatus: input.billingStatus, seatLimit: input.seatLimit })
        .where(eq(companyAccount.id, input.companyAccountId))
        .returning({ id: companyAccount.id });

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Unternehmens-Konto wurde nicht gefunden." });
      }

      return { success: true };
    }),

  /**
   * F-91 Baustein 5 (F-94): Liste aller Sponsorings (auch inaktive/außerhalb ihres Zeitfensters)
   * — anders als der öffentliche `sponsor.list`-Endpunkt, der nur aktuell sichtbare liefert.
   */
  sponsors: roleProcedure("admin").query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: sponsor.id,
        name: sponsor.name,
        logoUrl: sponsor.logoUrl,
        attributionText: sponsor.attributionText,
        kursId: sponsor.kursId,
        isActive: sponsor.isActive,
        startsAt: sponsor.startsAt,
        endsAt: sponsor.endsAt,
      })
      .from(sponsor)
      .orderBy(sponsor.createdAt);
  }),

  /**
   * F-91 Baustein 5 (F-94): Legt ein Sponsoring an — admin-gepflegt, kein Self-Service durch das
   * sponsernde Unternehmen (redaktionelle Unabhängigkeit, siehe F-11/F-16). Ein leerer String bei
   * `logoUrl` wird auf `null` normalisiert (kaputtes `<img src="">` vermeiden, analog zu
   * `company.updateBranding`).
   */
  createSponsor: roleProcedure("admin")
    .input(createSponsorInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [created] = await ctx.db
        .insert(sponsor)
        .values({
          name: input.name,
          logoUrl: input.logoUrl || null,
          attributionText: input.attributionText,
          kursId: input.kursId ?? null,
          startsAt: input.startsAt ?? null,
          endsAt: input.endsAt ?? null,
        })
        .returning({ id: sponsor.id });

      if (!created) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: created.id };
    }),

  /**
   * F-91 Baustein 5 (F-94): Deaktivieren/Reaktivieren statt Löschen — analog zu
   * `admin.setPublished` für Kurse. Ein Hard-Delete würde eine bereits vereinbarte
   * Sponsoring-Laufzeit stillschweigend beenden, statt sie kontrolliert auszublenden.
   */
  setSponsorActive: roleProcedure("admin")
    .input(setSponsorActiveInputSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(sponsor).set({ isActive: input.isActive }).where(eq(sponsor.id, input.sponsorId));
      return { success: true };
    }),

  /**
   * F-68: Moderationsansicht für offene Meldungen (`report.status = 'offen'`) — ohne diese
   * Ansicht würde eine Meldung ins Leere laufen, sobald F-68 eine Möglichkeit zum Melden bietet.
   * `reporterUser`/`reportedUser` als Alias-Selbst-Join auf `user`, da beide Spalten auf dieselbe
   * Tabelle verweisen.
   */
  reports: roleProcedure("admin").query(async ({ ctx }) => {
    const reporterUser = alias(user, "reporter_user");
    const reportedUser = alias(user, "reported_user");

    return ctx.db
      .select({
        id: report.id,
        reporterEmail: reporterUser.email,
        reportedEmail: reportedUser.email,
        kursId: report.kursId,
        reason: report.reason,
        status: report.status,
        createdAt: report.createdAt,
      })
      .from(report)
      .leftJoin(reporterUser, eq(reporterUser.id, report.reporterUserId))
      .leftJoin(reportedUser, eq(reportedUser.id, report.reportedUserId))
      .where(eq(report.status, "offen"))
      .orderBy(report.createdAt);
  }),

  resolveReport: roleProcedure("admin").input(resolveReportInputSchema).mutation(async ({ ctx, input }) => {
    const [updated] = await ctx.db
      .update(report)
      .set({ status: "geschlossen" })
      .where(eq(report.id, input.reportId))
      .returning({ id: report.id });

    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Diese Meldung wurde nicht gefunden." });
    }

    return { success: true };
  }),

  /**
   * F-50: Moderationsansicht für offene Content-Fehlermeldungen — analog zu `reports` oben
   * (F-68), aber mit Content-Item-Kontext (Prompt/Typ) statt eines zweiten Nutzerkontos, damit
   * die Redaktion den gemeldeten Lerninhalt ohne zusätzliche Suche wiederfindet.
   */
  contentReports: roleProcedure("admin").query(async ({ ctx }) => {
    const reporterUser = alias(user, "content_reporter_user");

    return ctx.db
      .select({
        id: contentReport.id,
        reporterEmail: reporterUser.email,
        reason: contentReport.reason,
        status: contentReport.status,
        createdAt: contentReport.createdAt,
        contentItemId: contentReport.contentItemId,
        contentItemPrompt: contentItem.prompt,
        contentItemType: contentItem.type,
      })
      .from(contentReport)
      .innerJoin(contentItem, eq(contentItem.id, contentReport.contentItemId))
      .leftJoin(reporterUser, eq(reporterUser.id, contentReport.reporterUserId))
      .where(eq(contentReport.status, "offen"))
      .orderBy(contentReport.createdAt);
  }),

  resolveContentReport: roleProcedure("admin")
    .input(resolveContentReportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(contentReport)
        .set({ status: "geschlossen" })
        .where(eq(contentReport.id, input.contentReportId))
        .returning({ id: contentReport.id });

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Diese Meldung wurde nicht gefunden." });
      }

      return { success: true };
    }),

  /**
   * N-08: Kern-KPIs laut Anforderungskatalog Abschnitt 11 — aktive Nutzer:innen (WAU, aus
   * `learning_event`, da nur echte Lernaktivität zählt) und die Abschlussquote von Übungssets
   * (aus `exercise_set`, siehe F-22/Architekturplanung Abschnitt 13). Beide Fenster bewusst
   * fix (7 bzw. 30 Tage) statt konfigurierbar — ein Dashboard mit Zeitraum-Auswahl wäre für
   * eine erste MVP-Kennzahl über das Ziel hinausgeschossen.
   */
  kpis: roleProcedure("admin").query(async ({ ctx }) => {
    const activeUsersSince = new Date(Date.now() - ACTIVE_USERS_WINDOW_MS);
    const exerciseSetsSince = new Date(Date.now() - EXERCISE_SET_WINDOW_MS);

    const [[activeUsersRow], exerciseSets] = await Promise.all([
      ctx.db
        .select({ count: sql<number>`count(distinct ${learningEvent.userId})` })
        .from(learningEvent)
        .where(gte(learningEvent.occurredAt, activeUsersSince)),
      ctx.db
        .select({ completedAt: exerciseSet.completedAt })
        .from(exerciseSet)
        .where(gte(exerciseSet.startedAt, exerciseSetsSince)),
    ]);

    const exerciseSetsStarted = exerciseSets.length;
    const exerciseSetsCompleted = exerciseSets.filter((row) => row.completedAt !== null).length;

    return {
      activeUsersWeekly: Number(activeUsersRow?.count ?? 0),
      exerciseSetsStarted,
      exerciseSetsCompleted,
      exerciseSetCompletionRate: exerciseSetsStarted > 0 ? exerciseSetsCompleted / exerciseSetsStarted : null,
    };
  }),

  /**
   * F-70/F-71/F-80: Vorstufe zu `setAiFeatureFlags` — die Admin-Oberfläche sucht ein Konto per
   * E-Mail statt aus einer Liste auszuwählen, da es (anders als bei Unternehmens-Konten) keine
   * bereits vorhandene Übersicht über alle Nutzer:innen gibt.
   */
  findUserByEmail: roleProcedure("admin")
    .input(adminFindUserByEmailInputSchema)
    .query(async ({ ctx, input }) => {
      const [found] = await ctx.db
        .select({
          id: user.id,
          email: user.email,
          aiGenerationEnabled: user.aiGenerationEnabled,
        })
        .from(user)
        .where(eq(user.email, input.email))
        .limit(1);

      if (!found) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Kein Konto mit dieser E-Mail-Adresse gefunden." });
      }

      return found;
    }),

  /**
   * F-71/F-80 (Nutzer-Entscheidung 23.09.2026, seit 25.09.2026 einziges verbleibendes
   * KI-Freischalt-Flag, siehe Architekturplanung Abschnitt 13): F-70 (KI-Bewertung) und F-129
   * (Instrumenten-Lernpfade) laufen inzwischen über den echten Abo-Status (`payment`-Router)
   * statt über ein Admin-Flag — nur F-71 (Aufgabengenerierung, läuft laut Nutzer-Vorgabe vom
   * 25.09.2026 vorerst extern) bleibt admin-vergebbar.
   */
  setAiGenerationEnabled: roleProcedure("admin")
    .input(adminSetAiFeatureFlagsInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(user)
        .set({ aiGenerationEnabled: input.aiGenerationEnabled })
        .where(eq(user.id, input.userId))
        .returning({ id: user.id });

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieses Konto wurde nicht gefunden." });
      }

      return { success: true };
    }),

  /**
   * F-138 (26.09.2026, Nutzer-Vorgabe, siehe Architekturplanung Abschnitt 13): Dienst-
   * Verfügbarkeits-Dashboard — prüft bei jedem Aufruf live alle externen Abhängigkeiten des
   * Kern-Backends (Datenbank, Redis-Warteschlange, Payment-Service, KI-Anbindung). Die "regelmäßige"
   * Prüfung kommt bewusst vom Frontend her (`refetchInterval`, siehe SystemStatusPanel.tsx) statt
   * von einem eigenen Hintergrund-Job/Cron — ein Admin-Dashboard, das nur bei tatsächlichem
   * Betrachten aktualisiert wird, braucht keine dauerhaft laufende Prüf-Infrastruktur.
   */
  systemStatus: roleProcedure("admin").query(async ({ ctx }) => {
    return checkAllServices(
      ctx.db,
      () => redisConnection.ping(),
      pingPaymentService,
      env.AI_PROVIDER,
      () => pingOllama(env.OLLAMA_BASE_URL),
    );
  }),
});
