import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { companyRouter } from "./routers/company";
import { consentRouter } from "./routers/consent";
import { contentRouter } from "./routers/content";
import { coursesRouter } from "./routers/courses";
import { examRouter } from "./routers/exam";
import { healthRouter } from "./routers/health";
import { offlineRouter } from "./routers/offline";
import { parentRouter } from "./routers/parent";
import { presentationRouter } from "./routers/presentation";
import { previewRouter } from "./routers/preview";
import { progressRouter } from "./routers/progress";
import { quizRouter } from "./routers/quiz";
import { router } from "./trpc";

/**
 * Kern-API-Grundstruktur (Architekturplanung Abschnitt 7): weitere Module (reports, blocks)
 * kommen in späteren Iterationen als eigene Sub-Router hinzu. `admin` deckt F-11 bisher nur in
 * der ersten, einfachen Ausbaustufe ab (Kurs-Veröffentlichung) — die eigentliche Content-Pflege
 * (Fragen/Karteikarten) folgt später. `exam` (F-23, seit 16.09.2026) nutzt die hierfür bereits
 * vorbereiteten `exam_session`/`exam_answer`-Tabellen. `presentation` (F-24, seit 16.09.2026)
 * speichert den Gliederungs-/Checklisten-Entwurf des Präsentationstrainers. `offline` (F-42,
 * seit 16.09.2026) liefert den Content-Download für die lokale IndexedDB-Kopie. `company`
 * (F-91, seit 16.09.2026) ist das Business-Lizenzen-Auth-Grundgerüst (Baustein 1).
 */
export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  consent: consentRouter,
  parent: parentRouter,
  company: companyRouter,
  preview: previewRouter,
  courses: coursesRouter,
  content: contentRouter,
  progress: progressRouter,
  quiz: quizRouter,
  exam: examRouter,
  presentation: presentationRouter,
  admin: adminRouter,
  offline: offlineRouter,
});

export type AppRouter = typeof appRouter;
