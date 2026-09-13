import { authRouter } from "./routers/auth";
import { contentRouter } from "./routers/content";
import { coursesRouter } from "./routers/courses";
import { healthRouter } from "./routers/health";
import { progressRouter } from "./routers/progress";
import { quizRouter } from "./routers/quiz";
import { router } from "./trpc";

/**
 * Kern-API-Grundstruktur (Architekturplanung Abschnitt 7): weitere Module (consent,
 * admin/content, exam-sessions, reports, blocks) kommen in späteren Iterationen als
 * eigene Sub-Router hinzu.
 */
export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  courses: coursesRouter,
  content: contentRouter,
  progress: progressRouter,
  quiz: quizRouter,
});

export type AppRouter = typeof appRouter;
