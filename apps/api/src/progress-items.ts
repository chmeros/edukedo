import {
  GANTT_QUIZ_TYPE,
  HIERARCHIE_QUIZ_TYPE,
  MC_LIKE_QUIZ_TYPES,
  QUADRANT_QUIZ_TYPES,
} from "@edukedo/shared";

/**
 * Content-Item-Typen, die in Fortschrittsanzeigen mitzählen (F-30 `progress.overview`, F-35
 * `progress.pacing`, F-144 `courses.progress`): Karteikarten und alle Quiz-Typen mit
 * Beherrschungs-Zustand (`user_progress.state`). Theorie-Inhalte bleiben bewusst außen vor.
 * F-113/F-114: MC_LIKE_QUIZ_TYPES/QUADRANT_QUIZ_TYPES sind strukturell identisch zu quiz_mc bzw.
 * zuordnung. F-116: quiz_mc_multi ist die Mehrfachauswahl-Variante von quiz_mc.
 */
export const PROGRESS_COUNTABLE_TYPES: string[] = [
  "karteikarte",
  ...MC_LIKE_QUIZ_TYPES,
  "quiz_mc_multi",
  "zuordnung",
  "sortieren",
  ...QUADRANT_QUIZ_TYPES,
  GANTT_QUIZ_TYPE,
  HIERARCHIE_QUIZ_TYPE,
  "luecken",
  "luecken_auswahl",
  "kurzantwort",
];
