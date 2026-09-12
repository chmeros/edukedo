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

export function roleProcedure(...allowed: UserRole[]) {
  return protectedProcedure.use(({ ctx, next }) => {
    if (!hasRole(ctx.currentUser.role as UserRole, allowed)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({ ctx });
  });
}
