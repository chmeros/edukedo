import { shuffle } from "./quiz-logic";
import type {
  InstrumentLernpfadPayload,
  LernpfadGepoolteZuordnungStation,
  LernpfadPoolRound,
  LernpfadWissensfrage,
  LernpfadZoneItem,
} from "./schemas/instrument-lernpfad";

/**
 * F-129 (siehe schemas/instrument-lernpfad.ts für die vollständige Konzept-Dokumentation): reine
 * Form-/Prüflogik für den Instrumenten-Lernpfad — analog zu quiz-logic.ts (F-21), aber für die
 * neue, eigenständige Orchestrierungs-Ebene statt content_item/answer_option. Nie die Lösung
 * (isCorrect/feedback/zoneKey) an ungeprüfte Stellen durchreichen — `shapeXForLearner`-Funktionen
 * liefern immer nur die lösungsfreie Anzeigeform, `checkX`-Funktionen bekommen das vollständige,
 * serverseitig aus der DB geladene Payload und geben je EINEM Versuch die Antwort zurück (siehe
 * Moduldoku in instrument-lernpfad.ts zum "Sofort"-Interaktionsmuster).
 */

export class LernpfadItemNotFoundError extends Error {}

// ---------------------------------------------------------------------------
// Wissensfrage (Stationen 1 „Grundlagenfragen" und 6 „Zusammenhänge")
// ---------------------------------------------------------------------------

export interface ShapedLernpfadOption {
  index: number;
  text: string;
}

/** Formt eine Wissensfrage lösungsfrei — Options-Reihenfolge wird gemischt, die zurückgegebene
 * `index` bezieht sich auf die GEMISCHTE Reihenfolge; `checkLernpfadWissensfrage` erwartet daher
 * dieselben gemischten Indizes zurück, nicht die ursprüngliche Autoren-Reihenfolge. */
export function shapeLernpfadWissensfrage(question: LernpfadWissensfrage): {
  prompt: string;
  selectCount: number;
  options: ShapedLernpfadOption[];
} {
  const order = shuffle(question.options.map((_, index) => index));
  return {
    prompt: question.prompt,
    selectCount: question.options.filter((option) => option.isCorrect).length,
    options: order.map((originalIndex, shuffledIndex) => ({ index: shuffledIndex, text: question.options[originalIndex]!.text })),
  };
}

// Damit `checkLernpfadWissensfrage` dieselbe gemischte Zuordnung wie `shapeLernpfadWissensfrage`
// auflösen kann, wird die Zuordnung nicht serverseitig zwischengespeichert (kein Session-Zustand
// für den Lernpfad, siehe Architekturplanung Abschnitt 13) — stattdessen bekommt der Client bei
// jeder Anzeige eine NEU gemischte Reihenfolge und muss sie an EIN UND DEMSELBEN Bildschirm(zustand)
// konsistent zurückmelden. Da eine Wissensfrage batch-geprüft wird (Auswahl -> ein "Antwort
// prüfen"-Klick, siehe Moduldoku), reicht es, die im UI sichtbare gemischte Reihenfolge einmalig
// beim Laden der Station im Frontend-Zustand zu halten und beim Prüfen mitzusenden statt eines
// zweiten Server-Roundtrips — deshalb erwartet dieser Check-Aufruf ZUSÄTZLICH dieselbe gemischte
// Optionsliste (Text je Index), nicht nur die ausgewählten Indizes, und vergleicht anhand des
// TEXTES gegen die Original-Frage (robuster als ein bei jedem Aufruf neu erratener Index-Bezug).
export function checkLernpfadWissensfrage(
  question: LernpfadWissensfrage,
  shuffledOptionTexts: string[],
  selectedIndices: number[],
): { perOption: { index: number; isCorrect: boolean; feedback: string }[]; allCorrect: boolean } {
  const selectedSet = new Set(selectedIndices);
  const perOption = shuffledOptionTexts.map((text, index) => {
    const original = question.options.find((option) => option.text === text);
    if (!original) {
      throw new LernpfadItemNotFoundError("Antwortoption nicht gefunden.");
    }
    return { index, isCorrect: original.isCorrect, feedback: original.feedback, wasSelected: selectedSet.has(index) };
  });

  const allCorrect = perOption.every((option) => option.isCorrect === option.wasSelected);

  return {
    perOption: perOption.map(({ index, isCorrect, feedback }) => ({ index, isCorrect, feedback })),
    allCorrect,
  };
}

// ---------------------------------------------------------------------------
// Pool-Auswahl (Stationen 2 „Struktur erkennen" und 5 „Maßnahmen-Wahl")
// ---------------------------------------------------------------------------

/** Formt eine Pool-Runde lösungsfrei — Reihenfolge gemischt, `index` bezieht sich auf die
 * gemischte Reihenfolge und wird 1:1 als `itemIndex` an `checkLernpfadPoolItem` zurückgegeben
 * (siehe Frontend PoolAuswahlStep: hält die beim Laden gemischte Liste im Zustand). */
export function shapeLernpfadPoolRound(round: LernpfadPoolRound): {
  context: string | undefined;
  correctCount: number;
  items: ShapedLernpfadOption[];
} {
  const order = shuffle(round.items.map((_, index) => index));
  return {
    context: round.context,
    correctCount: round.correctCount,
    items: order.map((originalIndex, shuffledIndex) => ({ index: shuffledIndex, text: round.items[originalIndex]!.text })),
  };
}

/** Sofort-Prüfung EINES einzelnen gezogenen Begriffs — `itemText` identifiziert das Element
 * eindeutig über den Originaltext (derselbe Grund wie bei checkLernpfadWissensfrage: kein
 * serverseitig gehaltener Sitzungszustand für den Lernpfad). */
export function checkLernpfadPoolItem(round: LernpfadPoolRound, itemText: string): { correct: boolean; feedback: string } {
  const item = round.items.find((candidate) => candidate.text === itemText);
  if (!item) {
    throw new LernpfadItemNotFoundError("Begriff nicht gefunden.");
  }
  return { correct: item.correct, feedback: item.feedback };
}

// ---------------------------------------------------------------------------
// Zonen-Zuordnung (Stationen 3 „Ziele zuordnen" und 4 „Messbare Ziele zuordnen")
// ---------------------------------------------------------------------------

export interface ShapedLernpfadZoneItem {
  text: string;
}

export function shapeLernpfadZoneItems(items: LernpfadZoneItem[]): ShapedLernpfadZoneItem[] {
  return shuffle(items).map((item) => ({ text: item.text }));
}

/** Sofort-Prüfung EINER einzelnen Zonen-Platzierung — dieselbe Grund-Idee wie checkQuadrantAnswer
 * (quiz-logic.ts, F-114), hier aber nur für ein einzelnes Element statt eines ganzen Batches,
 * über den Originaltext aufgelöst statt einer DB-Options-ID. Gemeinsames (nicht Begriff-
 * individuelles) Feedback, siehe Moduldoku in schemas/instrument-lernpfad.ts. */
export function checkLernpfadZoneItem(
  items: LernpfadZoneItem[],
  itemText: string,
  submittedZoneKey: string,
  correctFeedback: string,
  wrongFeedback: string,
): { correct: boolean; feedback: string } {
  const item = items.find((candidate) => candidate.text === itemText);
  if (!item) {
    throw new LernpfadItemNotFoundError("Begriff nicht gefunden.");
  }
  const correct = item.zoneKey === submittedZoneKey;
  return { correct, feedback: correct ? correctFeedback : wrongFeedback };
}

// ---------------------------------------------------------------------------
// Gepoolte Zonen-Zuordnung (Station 4) — Zufallsauswahl + Rundenbildung aus einem größeren Pool
// ---------------------------------------------------------------------------

/** Reine Anzeige (Text ohne Zonen-Zugehörigkeit) — Alias statt eigenem Typ, da identisch zu
 * ShapedLernpfadZoneItem. */
export type LernpfadPoolRundeItem = ShapedLernpfadZoneItem;

/** Wählt je Zone `kernAnzahlProZone` Begriffe zufällig aus dem Gesamt-Pool und verteilt sie in
 * gemischte Runden zu `rundengroesse` — der "Grunddurchlauf". `extra: true` liefert stattdessen
 * die VERBLEIBENDEN Begriffe (der freiwillige Zusatzumfang), ebenfalls in Runden gruppiert. Bei
 * jedem Aufruf neu zufällig gezogen (keine Persistenz je Lauf, siehe Architekturplanung
 * Abschnitt 13 zur bewussten Scope-Entscheidung für die erste Umsetzung). */
export function selectLernpfadGepoolteRunden(
  station: LernpfadGepoolteZuordnungStation,
  extra: boolean,
): LernpfadPoolRundeItem[][] {
  const byZone = new Map<string, number[]>();
  station.pool.forEach((item, index) => {
    const list = byZone.get(item.zoneKey) ?? [];
    list.push(index);
    byZone.set(item.zoneKey, list);
  });

  const kernIndices = new Set<number>();
  for (const zone of station.zones) {
    const indicesForZone = shuffle(byZone.get(zone.key) ?? []);
    for (const index of indicesForZone.slice(0, station.kernAnzahlProZone)) {
      kernIndices.add(index);
    }
  }

  const selectedIndices = station.pool
    .map((_, index) => index)
    .filter((index) => (extra ? !kernIndices.has(index) : kernIndices.has(index)));
  const shuffledIndices = shuffle(selectedIndices);

  const rounds: LernpfadPoolRundeItem[][] = [];
  for (let i = 0; i < shuffledIndices.length; i += station.rundengroesse) {
    const chunk = shuffledIndices.slice(i, i + station.rundengroesse);
    rounds.push(chunk.map((index) => ({ text: station.pool[index]!.text })));
  }
  return rounds;
}

export function checkLernpfadGepoolteZoneItem(
  station: LernpfadGepoolteZuordnungStation,
  itemText: string,
  submittedZoneKey: string,
): { correct: boolean; feedback: string } {
  return checkLernpfadZoneItem(station.pool, itemText, submittedZoneKey, station.correctFeedback, station.wrongFeedback);
}

// ---------------------------------------------------------------------------
// Sortieren (Station 7 „Wirkungsketten")
// ---------------------------------------------------------------------------

export function shapeLernpfadSortierAufgabe(items: string[]): ShapedLernpfadOption[] {
  const order = shuffle(items.map((_, index) => index));
  return order.map((originalIndex, shuffledIndex) => ({ index: shuffledIndex, text: items[originalIndex]! }));
}

/** Positionsweise Auswertung wie `checkSortierenAnswer` (quiz-logic.ts, F-113 Teil 2), hier
 * gegen die als Klartext-Array gespeicherte richtige Reihenfolge statt gegen `answer_option.sort_order`. */
export function checkLernpfadSortieren(
  correctOrder: string[],
  shuffledTexts: string[],
  orderedIndices: number[],
): { results: boolean[]; correctCount: number; total: number } {
  const submittedOrderTexts = orderedIndices.map((index) => shuffledTexts[index]);
  const results = correctOrder.map((expectedText, position) => expectedText === submittedOrderTexts[position]);
  return { results, correctCount: results.filter(Boolean).length, total: correctOrder.length };
}

export type { InstrumentLernpfadPayload };
