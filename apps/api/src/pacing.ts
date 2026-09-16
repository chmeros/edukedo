/**
 * F-35 (Zielmodus "einzeltermin"): reine Formel für die Restzeit-/Lernpensum-Empfehlung, aus
 * progress.ts ausgelagert, damit sie ohne laufende Datenbank unit-testbar ist (siehe
 * pacing.test.ts), analog zu content-parser.ts/fsrs/scheduler.ts. "Lerneinheit" ist hier ein
 * Thema (siehe progress.ts für die Begründung dieser Operationalisierung).
 *
 * Formel (Anforderungskatalog F-35): verbleibende Lerneinheiten ÷ verbleibende Wochen bis zum
 * Zieltermin. "Rückstand" heißt: das aktuell nötige Wochenpensum ist höher als das ursprünglich
 * (ab planStartDate) geplante — die reine Neuberechnung mit dem aktuellen Datum würde einen
 * Rückstand allein noch nicht sichtbar machen, da "verbleibende Lerneinheiten ÷ verbleibende
 * Wochen" auch bei plangemäßem Fortschritt stets denselben Wert wie das Ursprungspensum ergibt.
 */

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export interface EinzelterminPacingInput {
  totalThemen: number;
  remainingThemen: number;
  targetDate: Date;
  planStartDate: Date;
  now: Date;
}

export interface EinzelterminPacingResult {
  isComplete: boolean;
  isOverdue: boolean;
  /** Aufgerundete Themen/Woche — null, solange das nicht aussagekräftig wäre (siehe unten). */
  recommendedPerWeek: number | null;
  isBehind: boolean;
}

export function calculateEinzelterminPacing(input: EinzelterminPacingInput): EinzelterminPacingResult {
  const { totalThemen, remainingThemen, targetDate, planStartDate, now } = input;

  const isComplete = remainingThemen === 0;
  const isOverdue = targetDate.getTime() <= now.getTime();

  // Untergrenze 1/7 Woche (= 1 Tag) statt 0: verhindert Division durch 0 direkt am Zieltermin
  // und eine Explosion Richtung Infinity kurz davor, ohne isOverdue als eigenen Fall zu
  // verkomplizieren.
  const remainingWeeks = Math.max((targetDate.getTime() - now.getTime()) / MS_PER_WEEK, 1 / 7);
  const totalWeeksOriginal = Math.max((targetDate.getTime() - planStartDate.getTime()) / MS_PER_WEEK, 1 / 7);

  const rawRecommendedPerWeek = remainingThemen / remainingWeeks;
  const rawOriginalPerWeek = totalThemen === 0 ? 0 : totalThemen / totalWeeksOriginal;

  return {
    isComplete,
    isOverdue,
    // Fertig: nichts mehr zu empfehlen. Termin verstrichen: eine "Themen/Woche"-Zahl wäre
    // irreführend (rechnerisch riesig, da remainingWeeks unten geklemmt ist) — die Warnung
    // dafür ist stattdessen isOverdue selbst.
    recommendedPerWeek: isComplete ? 0 : isOverdue ? null : Math.ceil(rawRecommendedPerWeek),
    isBehind: !isComplete && !isOverdue && rawRecommendedPerWeek > rawOriginalPerWeek + 1e-9,
  };
}
