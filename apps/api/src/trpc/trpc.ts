import { GameItemNotFoundError, LernpfadItemNotFoundError, QuizItemNotFoundError, type UserRole } from "@edukedo/shared";
import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { hasRole } from "../auth/roles";
import type { Context } from "./context";
import { zodIssuesDe } from "./zod-messages";

// Review UXL-19: Stacktraces (lokale Pfade) nur im Entwicklungsmodus ausliefern, nicht in Tests oder Produktion.
const t = initTRPC.context<Context>().create({
  // Direkt aus process.env, damit dieses Modul ohne vollständige Umgebung (Unit-Tests) importierbar bleibt.
  isDev: process.env.NODE_ENV === "development",
  // Review UXL-08/WEB-14: verständliche deutsche Meldung statt des rohen Zod-Arrays. Die Einzelheiten bleiben in `data.zodIssues`.
  errorFormatter({ shape, error }) {
    if (error.code === "BAD_REQUEST" && error.cause instanceof ZodError) {
      return { ...shape, message: zodIssuesDe(error.cause.issues), data: { ...shape.data, zodIssues: error.cause.issues } };
    }
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;

/**
 * Review LOG-17: Fachliche "nicht gefunden"-Fehler der gemeinsamen Prüffunktionen (Frage, Spielelement, Lernpfad-Element)
 * sind kein Serverfehler. Ohne Abbildung endeten sie als HTTP 500 und füllten das Fehlerlog (veraltete Option-ID,
 * manipulierter Aufruf).
 */
const mapDomainErrors = middleware(async ({ next }) => {
  const result = await next();
  if (!result.ok) {
    const cause = result.error.cause;
    if (
      cause instanceof QuizItemNotFoundError ||
      cause instanceof GameItemNotFoundError ||
      cause instanceof LernpfadItemNotFoundError
    ) {
      throw new TRPCError({ code: "NOT_FOUND", message: cause.message, cause });
    }
  }
  return result;
});

const baseProcedure = t.procedure.use(mapDomainErrors);
export const publicProcedure = baseProcedure;

const requireUser = middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, currentUser: ctx.currentUser } });
});

export const protectedProcedure = baseProcedure.use(requireUser);

/**
 * F-90: Eltern-Dashboard. Eigene Middleware statt requireUser, weil "parent" ein eigener
 * Account-Typ mit eigener Session-Variante ist (session.parent_id statt session.user_id,
 * siehe Architekturplanung Abschnitt 13) — nicht einfach eine weitere "user.role".
 */
const requireParent = middleware(({ ctx, next }) => {
  if (!ctx.currentParent) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, currentParent: ctx.currentParent } });
});

export const protectedParentProcedure = baseProcedure.use(requireParent);

/**
 * F-91: Business-Lizenzen. Eigene Middleware analog zu requireParent — "company_account" ist
 * ebenfalls ein eigener Account-Typ mit eigener Session-Variante (session.company_account_id,
 * siehe Architekturplanung Abschnitt 13), nicht Teil des "user"-Rollenmodells.
 */
const requireCompanyAdmin = middleware(({ ctx, next }) => {
  if (!ctx.currentCompanyAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, currentCompanyAdmin: ctx.currentCompanyAdmin } });
});

export const protectedCompanyAdminProcedure = baseProcedure.use(requireCompanyAdmin);

export function roleProcedure(...allowed: UserRole[]) {
  return protectedProcedure.use(({ ctx, next }) => {
    if (!hasRole(ctx.currentUser.role as UserRole, allowed)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({ ctx });
  });
}
