import type {} from "@fastify/cookie"; // Ambient Typ-Erweiterung von FastifyRequest/-Reply (req.cookies, req.unsignCookie, res.setCookie, ...)
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { eq } from "drizzle-orm";
import { SESSION_COOKIE_NAME, validateSessionToken } from "../auth/session";
import { db } from "../db/client";
import { companyAccount, parent, user } from "../db/schema";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const token = req.cookies[SESSION_COOKIE_NAME];
  let currentUser: typeof user.$inferSelect | null = null;
  let currentParent: typeof parent.$inferSelect | null = null;
  let currentCompanyAdmin: typeof companyAccount.$inferSelect | null = null;

  if (token) {
    const unsigned = req.unsignCookie(token);
    const validToken = unsigned.valid ? unsigned.value : null;
    const validated = validToken ? await validateSessionToken(db, validToken) : null;

    if (validated?.userId) {
      const [row] = await db.select().from(user).where(eq(user.id, validated.userId)).limit(1);
      currentUser = row ?? null;
    } else if (validated?.parentId) {
      const [row] = await db.select().from(parent).where(eq(parent.id, validated.parentId)).limit(1);
      currentParent = row ?? null;
    } else if (validated?.companyAccountId) {
      const [row] = await db
        .select()
        .from(companyAccount)
        .where(eq(companyAccount.id, validated.companyAccountId))
        .limit(1);
      currentCompanyAdmin = row ?? null;
    }
  }

  return { db, req, res, currentUser, currentParent, currentCompanyAdmin };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
