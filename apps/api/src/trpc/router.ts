import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";
import { companyRouter } from "./routers/company";
import { consentRouter } from "./routers/consent";
import { contentRouter } from "./routers/content";
import { coursesRouter } from "./routers/courses";
import { examRouter } from "./routers/exam";
import { friendRouter } from "./routers/friend";
import { healthRouter } from "./routers/health";
import { highscoreRouter } from "./routers/highscore";
import { lernpartnerRouter } from "./routers/lernpartner";
import { offlineRouter } from "./routers/offline";
import { parentRouter } from "./routers/parent";
import { presentationRouter } from "./routers/presentation";
import { previewRouter } from "./routers/preview";
import { progressRouter } from "./routers/progress";
import { quizRouter } from "./routers/quiz";
import { reportRouter } from "./routers/report";
import { sponsorRouter } from "./routers/sponsor";
import { router } from "./trpc";

/**
 * Kern-API-Grundstruktur (Architekturplanung Abschnitt 7): weitere Module (reports, blocks)
 * kommen in späteren Iterationen als eigene Sub-Router hinzu. `admin` deckt F-11 bisher nur in
 * der ersten, einfachen Ausbaustufe ab (Kurs-Veröffentlichung) — die eigentliche Content-Pflege
 * (Fragen/Karteikarten) folgt später. `exam` (F-23, seit 16.09.2026) nutzt die hierfür bereits
 * vorbereiteten `exam_session`/`exam_answer`-Tabellen. `presentation` (F-24, seit 16.09.2026)
 * speichert den Gliederungs-/Checklisten-Entwurf des Präsentationstrainers. `offline` (F-42,
 * seit 16.09.2026) liefert den Content-Download für die lokale IndexedDB-Kopie. `company`
 * (F-91, seit 16.09.2026) ist das Business-Lizenzen-Auth-Grundgerüst (Baustein 1). `sponsor`
 * (F-94, seit 17.09.2026) ist der öffentliche, lesende Sponsoring-Endpunkt (Baustein 5) —
 * schreibend über `admin.*`. `friend` (F-63, seit 17.09.2026) ist das Einladungs-/
 * Freundschaftssystem-Grundgerüst, Basis für die späteren Highscore/Duelle/Lernpartner-Bausteine.
 * `report` (F-68, seit 17.09.2026) ist Melden/Blockieren, aktuell nur innerhalb des
 * Freundeskreises erreichbar; die Moderationsansicht offener Meldungen liegt unter `admin.*`.
 * `highscore` (F-60, seit 17.09.2026) ist die opt-in Highscore-Liste je Kurs, beschränkt auf den
 * eigenen Freundeskreis. `lernpartner` (F-62, seit 17.09.2026) zeigt Prüfungstermin-/
 * Handlungsbereich-Übereinstimmungen innerhalb des Freundeskreises, ohne eigenen Chat.
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
  friend: friendRouter,
  presentation: presentationRouter,
  admin: adminRouter,
  offline: offlineRouter,
  sponsor: sponsorRouter,
  report: reportRouter,
  highscore: highscoreRouter,
  lernpartner: lernpartnerRouter,
});

export type AppRouter = typeof appRouter;
