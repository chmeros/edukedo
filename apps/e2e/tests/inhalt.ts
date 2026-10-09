/**
 * Der feste Testkurs aus `apps/api/src/db/seed-e2e.ts`. Die Texte stehen dort ein zweites Mal; beide Stellen zusammen ändern.
 */
export const KURS_TITEL = "E2E-Testkurs";

export const KARTEN = [
  { vorne: "E2E-Karte Eins: Wie heißt die Hauptstadt von Italien?", hinten: "Rom" },
  { vorne: "E2E-Karte Zwei: Wie heißt die Hauptstadt von Frankreich?", hinten: "Paris" },
  { vorne: "E2E-Karte Drei: Wie heißt die Hauptstadt von Spanien?", hinten: "Madrid" },
] as const;

export const FRAGEN = [
  { frage: "E2E-Frage Eins: Wie viele Tage hat eine Woche?", richtig: "Sieben Tage", falsch: "Fünf Tage" },
  { frage: "E2E-Frage Zwei: Welche Formel hat Wasser?", richtig: "H2O", falsch: "CO2" },
  { frage: "E2E-Frage Drei: Welcher Planet ist der Sonne am nächsten?", richtig: "Merkur", falsch: "Venus" },
] as const;
