/**
 * Review WEB-10: Eine laufende Prüfungssimulation (bis zu 10 Stunden) lag nur im Arbeitsspeicher der Seite; ein Neuladen, ein Update
 * des Service Workers oder ein vom Betriebssystem beendeter Browser verwarf Zeitplan und alle noch nicht abgegebenen Antworten. Der
 * Entwurf liegt jetzt im Browser (localStorage) und erlaubt "Prüfung fortsetzen". Er wird beim Abmelden gelöscht (siehe
 * `clearOfflineData`) und verfällt nach 12 Stunden.
 */
export const EXAM_DRAFT_KEY = "edukedo.examDraft.v1";
const MAX_AGE_MS = 12 * 60 * 60 * 1000;

export interface ExamStepDraft {
  answers: string[];
  points: number[];
  submitted: boolean;
}

export interface ExamDraft {
  kursId: string;
  sessionId: string;
  items: unknown[];
  index: number;
  /** Ende der Prüfungszeit (Epoch-Millisekunden). */
  deadline: number | null;
  steps: Record<string, ExamStepDraft>;
  savedAt: number;
}

export function readExamDraft(kursId: string): ExamDraft | null {
  try {
    const raw = localStorage.getItem(EXAM_DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as ExamDraft;
    if (draft.kursId !== kursId || Date.now() - draft.savedAt > MAX_AGE_MS || !Array.isArray(draft.items) || draft.items.length === 0) return null;
    return draft;
  } catch {
    return null;
  }
}

export function writeExamDraft(draft: Omit<ExamDraft, "savedAt">): void {
  try {
    localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    // Speicher blockiert oder voll: die Sitzung läuft normal weiter, nur das Fortsetzen steht nicht zur Verfügung.
  }
}

export function clearExamDraft(): void {
  try {
    localStorage.removeItem(EXAM_DRAFT_KEY);
  } catch {
    // Nichts zu tun.
  }
}
