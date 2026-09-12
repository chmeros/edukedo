import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  check: publicProcedure.query(() => ({ status: "ok" as const, timestamp: new Date().toISOString() })),
});
