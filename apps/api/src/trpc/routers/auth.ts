import { loginInputSchema, registerInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { calculateIsMinor } from "../../auth/age";
import { hashPassword, verifyPassword } from "../../auth/password";
import { SESSION_COOKIE_NAME, createSession, invalidateSession } from "../../auth/session";
import { env } from "../../env";
import { user } from "../../db/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

function setSessionCookie(res: import("fastify").FastifyReply, token: string, expiresAt: Date) {
  res.setCookie(SESSION_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    signed: true,
    expires: expiresAt,
  });
}

export const authRouter = router({
  register: publicProcedure.input(registerInputSchema).mutation(async ({ ctx, input }) => {
    const [existing] = await ctx.db.select().from(user).where(eq(user.email, input.email)).limit(1);
    if (existing) {
      throw new TRPCError({ code: "CONFLICT", message: "E-Mail-Adresse bereits registriert." });
    }

    const passwordHash = await hashPassword(input.password);
    const isMinor = calculateIsMinor(input.birthDate);

    const [created] = await ctx.db
      .insert(user)
      .values({
        email: input.email,
        passwordHash,
        birthDate: input.birthDate.toISOString().slice(0, 10),
        isMinor,
      })
      .returning();

    if (!created) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    const { token, expiresAt } = await createSession(ctx.db, { userId: created.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { id: created.id, email: created.email, role: created.role, isMinor: created.isMinor };
  }),

  login: publicProcedure.input(loginInputSchema).mutation(async ({ ctx, input }) => {
    const [found] = await ctx.db.select().from(user).where(eq(user.email, input.email)).limit(1);
    const passwordMatches = found ? await verifyPassword(found.passwordHash, input.password) : false;

    if (!found || !passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    const { token, expiresAt } = await createSession(ctx.db, { userId: found.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { id: found.id, email: found.email, role: found.role, isMinor: found.isMinor };
  }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const token = ctx.req.cookies[SESSION_COOKIE_NAME];
    if (token) {
      const unsigned = ctx.req.unsignCookie(token);
      if (unsigned.valid) {
        await invalidateSession(ctx.db, unsigned.value);
      }
    }
    ctx.res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  me: protectedProcedure.query(({ ctx }) => ({
    id: ctx.currentUser.id,
    email: ctx.currentUser.email,
    role: ctx.currentUser.role,
    isMinor: ctx.currentUser.isMinor,
  })),
});
