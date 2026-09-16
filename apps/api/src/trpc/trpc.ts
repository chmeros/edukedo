import type { UserRole } from "@edukedo/shared";
import { TRPCError, initTRPC } from "@trpc/server";
import { hasRole } from "../auth/roles";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const requireUser = middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, currentUser: ctx.currentUser } });
});

export const protectedProcedure = t.procedure.use(requireUser);

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

export const protectedParentProcedure = t.procedure.use(requireParent);

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

export const protectedCompanyAdminProcedure = t.procedure.use(requireCompanyAdmin);

export function roleProcedure(...allowed: UserRole[]) {
  return protectedProcedure.use(({ ctx, next }) => {
    if (!hasRole(ctx.currentUser.role as UserRole, allowed)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({ ctx });
  });
}
