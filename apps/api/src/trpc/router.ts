import { authRouter } from "./routers/auth";
import { healthRouter } from "./routers/health";
import { router } from "./trpc";

/**
 * Kern-API-Grundstruktur (Architekturplanung Abschnitt 7): weitere Module (consent, courses,
 * content, admin/content, progress, exam-sessions, reports, blocks) kommen in späteren
 * Iterationen als eigene Sub-Router hinzu.
 */
export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
