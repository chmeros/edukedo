import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { eq } from "drizzle-orm";
import { SESSION_COOKIE_NAME, validateSessionToken } from "../auth/session";
import { db } from "../db/client";
import { parent, user } from "../db/schema";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const token = req.cookies[SESSION_COOKIE_NAME];
  let currentUser: typeof user.$inferSelect | null = null;
  let currentParent: typeof parent.$inferSelect | null = null;

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
    }
  }

  return { db, req, res, currentUser, currentParent };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
