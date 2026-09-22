import { checkBlanks, checkKurzantwort, checkMatching, checkMcAnswer, shapeQuizItem, shuffle } from "@edukedo/shared";
import type { ShapedQuizItem } from "@edukedo/shared";
import { offlineDb, type OfflineContentItem, type OfflineQueueEventPayload } from "./offlineDb";

const QUIZ_TYPES = ["quiz_mc", "zuordnung", "luecken", "kurzantwort"] as const;
// Spiegelt quiz.quizItems (random + limit(count), siehe apps/api/src/trpc/routers/quiz.ts) —
// dieselbe, seit F-22 frei wählbare Rundengröße offline, nur lokal aus dem heruntergeladenen
// Bestand gezogen statt per SQL, da eine feste Auswahl aus dem vollen, für F-42 heruntergeladenen
// Pool sonst nach deren Bearbeitung erschöpft wäre.
export const DEFAULT_QUIZ_ROUND_SIZE = 20;

export interface OfflineQuizRound {
  /** Für die Anzeige — Lösung entfernt (`shapeQuizItem`), wie bei quiz.quizItems. */
  shaped: ShapedQuizItem[];
  /** Für die lokale Prüfung — inklusive Lösung, wie von `offline.downloadKurs` geliefert. */
  raw: OfflineContentItem[];
}

/**
 * F-42 Baustein 4: liest den lokal heruntergeladenen Quiz-Bestand (siehe OfflineDownload.tsx)
 * für einen Kurs (optional auf ein Thema gefiltert, F-27) und wählt daraus eine zufällige Runde.
 * F-22: `count` steuert die Rundengröße, analog zu quiz.quizItems — Default DEFAULT_QUIZ_ROUND_SIZE.
 */
export async function loadOfflineQuizRound(
  kursId: string,
  themaId: string | undefined,
  count: number = DEFAULT_QUIZ_ROUND_SIZE,
): Promise<OfflineQuizRound> {
  const all = await offlineDb.content.where("kursId").equals(kursId).toArray();
  const filtered = all.filter(
    (item) => (QUIZ_TYPES as readonly string[]).includes(item.type) && (!themaId || item.themaId === themaId),
  );
  const raw = shuffle(filtered).slice(0, count);
  const shaped = raw.map((item) => shapeQuizItem(item, item.options));
  return { shaped, raw };
}

function pushQueueEvent(contentItemId: string, event: OfflineQueueEventPayload) {
  return offlineDb.queue.put({
    id: crypto.randomUUID(),
    contentItemId,
    event,
    occurredAt: Date.now(),
    synced: false,
  });
}

/**
 * Baut die vier submit*-"Mutationen" für den Offline-Fall — dieselbe `MutationLike`-Schnittstelle
 * (siehe QuizSteps.tsx) wie die echten tRPC-Mutationen von Quiz.tsx, aber lokal anhand der
 * (inklusive Lösung heruntergeladenen) `raw`-Items ausgewertet statt per Serveraufruf. Jede
 * Auswertung reiht zusätzlich ein Sync-Ereignis in `offlineDb.queue` ein (Baustein 5 spielt sie
 * später nach).
 */
export function createOfflineQuizMutations(raw: OfflineContentItem[]) {
  function findItem(id: string) {
    return raw.find((item) => item.id === id);
  }

  // `error: null` (statt eines echten reaktiven Fehlerzustands) genügt hier: ein
  // fehlgeschlagenes `pushQueueEvent` unten lässt `onSuccess` bewusst aus (siehe Kommentar
  // dort) — dieselbe Nicht-Reaktion wie zuvor, jetzt nur zusätzlich kompatibel zur
  // `MutationLike`-Schnittstelle (QuizSteps.tsx), die seit dem Code-Review vom 22.09.2026 ein
  // `error`-Feld erwartet.
  return {
    submitAnswer: {
      isPending: false,
      error: null,
      mutate(
        input: { contentItemId: string; selectedOptionId: string },
        opts: {
          onSuccess: (result: { isCorrect: boolean; correctOptionId: string; explanation: string | null }) => void;
        },
      ) {
        const item = findItem(input.contentItemId);
        if (!item) return;
        const { isCorrect, correctOptionId } = checkMcAnswer(item.options, input.selectedOptionId);
        pushQueueEvent(item.id, { kind: "quiz_mc", selectedOptionId: input.selectedOptionId })
          .then(() => opts.onSuccess({ isCorrect, correctOptionId, explanation: item.explanation }))
          .catch((error: unknown) => {
            // Code-Review-Fund, nachgezogen: onSuccess feuerte vorher synchron, unabhängig
            // vom (unbehandelten) Ergebnis des Warteschlangen-Schreibzugriffs — bei einem
            // Fehler (z. B. IndexedDB-Kontingent überschritten) meldete die UI fälschlich
            // Erfolg, obwohl die Antwort nie in offline.syncQueue ankommen würde. onSuccess
            // bleibt jetzt aus, ein erneuter Klick auf "Antwort prüfen" versucht es erneut.
            console.error("Offline-Quiz-Antwort (quiz_mc) konnte nicht gespeichert werden:", error);
          });
      },
    },
    submitMatching: {
      isPending: false,
      error: null,
      mutate(
        input: { contentItemId: string; pairs: { leftOptionId: string; rightOptionId: string }[] },
        opts: { onSuccess: (result: { correctMap: Record<string, string>; correctCount: number; total: number }) => void },
      ) {
        const item = findItem(input.contentItemId);
        if (!item) return;
        const result = checkMatching(item.options, input.pairs);
        pushQueueEvent(item.id, { kind: "zuordnung", pairs: input.pairs })
          .then(() => opts.onSuccess(result))
          .catch((error: unknown) => {
            console.error("Offline-Quiz-Antwort (zuordnung) konnte nicht gespeichert werden:", error);
          });
      },
    },
    submitBlanks: {
      isPending: false,
      error: null,
      mutate(
        input: { contentItemId: string; answers: Record<string, string> },
        opts: {
          onSuccess: (result: {
            results: Record<string, boolean>;
            correctAnswers: Record<string, string>;
            correctCount: number;
            total: number;
          }) => void;
        },
      ) {
        const item = findItem(input.contentItemId);
        if (!item) return;
        const result = checkBlanks(item.payload, input.answers);
        pushQueueEvent(item.id, { kind: "luecken", answers: input.answers })
          .then(() => opts.onSuccess(result))
          .catch((error: unknown) => {
            console.error("Offline-Quiz-Antwort (luecken) konnte nicht gespeichert werden:", error);
          });
      },
    },
    submitKurzantwort: {
      isPending: false,
      error: null,
      mutate(
        input: { contentItemId: string; answer: string },
        opts: { onSuccess: (result: { isCorrect: boolean; correctAnswer: string; explanation: string | null }) => void },
      ) {
        const item = findItem(input.contentItemId);
        if (!item) return;
        const { isCorrect, correctAnswer } = checkKurzantwort(item.payload, input.answer);
        pushQueueEvent(item.id, { kind: "kurzantwort", answer: input.answer })
          .then(() => opts.onSuccess({ isCorrect, correctAnswer, explanation: item.explanation }))
          .catch((error: unknown) => {
            console.error("Offline-Quiz-Antwort (kurzantwort) konnte nicht gespeichert werden:", error);
          });
      },
    },
  };
}
