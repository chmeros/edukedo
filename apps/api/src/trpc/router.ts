import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { consentRouter } from "./routers/consent";
import { contentRouter } from "./routers/content";
import { coursesRouter } from "./routers/courses";
import { healthRouter } from "./routers/health";
import { parentRouter } from "./routers/parent";
import { previewRouter } from "./routers/preview";
import { progressRouter } from "./routers/progress";
import { quizRouter } from "./routers/quiz";
import { router } from "./trpc";

/**
 * Kern-API-Grundstruktur (Architekturplanung Abschnitt 7): weitere Module
 * (exam-sessions, reports, blocks) kommen in späteren Iterationen als eigene Sub-Router
 * hinzu. `admin` deckt F-11 bisher nur in der ersten, einfachen Ausbaustufe ab
 * (Kurs-Veröffentlichung) — die eigentliche Content-Pflege (Fragen/Karteikarten) folgt später.
 */
export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  consent: consentRouter,
  parent: parentRouter,
  preview: previewRouter,
  courses: coursesRouter,
  content: contentRouter,
  progress: progressRouter,
  quiz: quizRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
