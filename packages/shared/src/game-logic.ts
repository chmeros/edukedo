import { layoutCrossword, createSeededRandom, seededShuffle } from "./kreuzwort-generator";
import { shuffle } from "./quiz-logic";
import type {
  KennzahlenDuellFrage,
  KennzahlenDuellPayload,
  KreuzwortraetselPayload,
  KreuzwortraetselWort,
  MemoryPayload,
} from "./schemas/game";

/**
 * F-140/F-141/F-142/F-143 (siehe schemas/game.ts für die vollständige Konzept-Dokumentation):
 * reine Form-/Prüflogik für die drei Gaming-Tab-Lernspiele — analog zu quiz-logic.ts (F-21) und
 * instrument-lernpfad-logic.ts (F-129). Nie die Lösung (Kreuzworträtsel-`loesung`, Duell-
 * `richtig`, Memory-Paarzuordnung) an ungeprüfte Stellen durchreichen — `shape*`-Funktionen
 * liefern immer nur die lösungsfreie Anzeigeform, `check*`-Funktionen bekommen das vollständige,
 * serverseitig aus der DB geladene Payload und geben je EINEM Versuch die Antwort zurück.
 */

export class GameItemNotFoundError extends Error {}

// ---------------------------------------------------------------------------
// Kreuzworträtsel „Finanzkennzahlen" (F-141)
// ---------------------------------------------------------------------------

/** Dieselbe Normalform wie bei der Content-Autorierung (`kreuzwortraetselWortSchema.loesung`):
 * Großbuchstaben, Umlaute/ß nach der in der Spezifikation festgelegten Regel ersetzt. Wird auf
 * JEDE Eingabe angewendet, unabhängig von der Schwierigkeitsstufe — in der einfachen Variante
 * ist die Wortkarte selbst bereits in dieser Form, die Normalisierung ist dort ein No-op. */
export function normalizeKreuzwortraetselEingabe(eingabe: string): string {
  return eingabe
    .toUpperCase()
    .replaceAll("Ä", "AE")
    .replaceAll("Ö", "OE")
    .replaceAll("Ü", "UE")
    .replaceAll("ß", "SS");
}

/** Wort mit festen Gitterkoordinaten — das Ergebnis von `buildKreuzwortraetselPuzzle`. */
export type PositionedKreuzwortraetselWort = KreuzwortraetselWort & {
  richtung: "waagerecht" | "senkrecht";
  startRow: number;
  startCol: number;
};
export type KreuzwortraetselPuzzle = Omit<KreuzwortraetselPayload, "woerter"> & { woerter: PositionedKreuzwortraetselWort[] };

/** F-193: Legt aus dem Wort-Pool des Sets ein Rätsel an. Mit Seed wird bei jedem Start eine andere Auswahl und Anordnung gebildet
 * (derselbe Seed liefert dasselbe Rätsel, ein Neuladen verändert es also nicht). Ohne Seed (alter Spielstand vor F-193) bleibt das von
 * Hand gebaute Gitter erhalten, sofern alle Wörter Positionen tragen; sonst wird mit festem Seed 1 angelegt. Die Rätselnummern laufen
 * wie bei einem gedruckten Rätsel von oben links nach unten rechts. */
export function buildKreuzwortraetselPuzzle(payload: KreuzwortraetselPayload, seed?: number | null): KreuzwortraetselPuzzle {
  const hatPositionen = payload.woerter.every((wort) => wort.richtung !== undefined && wort.startRow !== undefined && wort.startCol !== undefined);
  if ((seed === undefined || seed === null) && hatPositionen) {
    return { ...payload, woerter: payload.woerter as PositionedKreuzwortraetselWort[] };
  }
  const platziert = layoutCrossword(payload.woerter, seed ?? 1, { wortzahl: payload.wortzahl ?? 10 });
  return {
    ...payload,
    woerter: platziert.map((eintrag, index) => ({
      ...eintrag.wort,
      nummer: index + 1,
      richtung: eintrag.richtung,
      startRow: eintrag.startRow,
      startCol: eintrag.startCol,
    })),
  };
}

export interface ShapedKreuzwortraetselWort {
  nummer: number;
  richtung: "waagerecht" | "senkrecht";
  startRow: number;
  startCol: number;
  laenge: number;
  hinweis: string;
  tipp: string;
  geloest: boolean;
  // Nur gesetzt, wenn `geloest` true ist — ein bereits gelöstes Wort preiszugeben ist unkritisch
  // (die Lösung IST der bestätigt richtige Stand) und wird fürs Gitter-Rendering nach einem
  // Reload/erneuten Laden benötigt (das Frontend kennt die Buchstaben eines in DIESER Sitzung
  // gerade erst selbst eingereichten Worts zwar bereits aus der eigenen Eingabe, nicht aber die
  // eines schon in einer früheren Sitzung gelösten Worts).
  loesung: string | null;
}

/** Lösungsfreie (außer bereits gelösten Wörtern, siehe oben) Gitter-Anzeigeform — `laenge` statt
 * `loesung`, damit das Frontend die richtige Anzahl Buchstabenfelder rendern kann, ohne die
 * Lösung selbst zu kennen. Für die einfache Variante (Begriffe als Wortkarten) liefert
 * `buildWordBank` unten zusätzlich die — bei diesem Modus laut Spezifikation bewusst offen
 * sichtbaren — Lösungswörter. */
export function shapeKreuzwortraetsel(
  payload: KreuzwortraetselPayload,
  solvedWordNumbers: number[],
): ShapedKreuzwortraetselWort[] {
  const solved = new Set(solvedWordNumbers);
  return payload.woerter.map((wort) => {
    const geloest = solved.has(wort.nummer);
    return {
      nummer: wort.nummer,
      // F-193: Nach `buildKreuzwortraetselPuzzle` tragen alle Wörter Positionen; die Rückfallwerte gelten nur für ein unaufbereitetes Pool-Payload.
      richtung: wort.richtung ?? "waagerecht",
      startRow: wort.startRow ?? 0,
      startCol: wort.startCol ?? 0,
      laenge: wort.loesung.length,
      hinweis: wort.hinweis,
      tipp: wort.tipp,
      geloest,
      loesung: geloest ? wort.loesung : null,
    };
  });
}

/** Nur für die einfache Variante ("Begriffe zuordnen") — alle noch NICHT gelösten Lösungswörter
 * gemischt als Wortkarten, exakt wie in der Spezifikation gefordert ("Ihre Reihenfolge wird bei
 * jedem neuen Start gemischt" / "Die verwendete Wortkarte verschwindet aus der Auswahl"). Bereits
 * gelöste Wörter (z. B. nach einem Reload) tauchen nicht erneut im Pool auf. In der
 * anspruchsvollen Variante wird diese Funktion nicht aufgerufen. */
export function buildKreuzwortraetselWordBank(payload: KreuzwortraetselPayload, solvedWordNumbers: number[]): string[] {
  const solved = new Set(solvedWordNumbers);
  return shuffle(payload.woerter.filter((wort) => !solved.has(wort.nummer)).map((wort) => wort.loesung));
}

export function findKreuzwortraetselTipp(payload: KreuzwortraetselPayload, nummer: number): string {
  const wort = payload.woerter.find((candidate) => candidate.nummer === nummer);
  if (!wort) {
    throw new GameItemNotFoundError("Hinweis nicht gefunden.");
  }
  return wort.tipp;
}

/** Prüft GENAU einen Lösungsversuch für ein Wort — identifiziert über die fest hinterlegte
 * Nummer (nicht über die Wortlänge, siehe Spezifikation: "Eine Wortkarte darf nicht als richtig
 * gewertet werden, nur weil sie in eine gleich lange Wortposition passt"). */
export function checkKreuzwortraetselWort(
  payload: KreuzwortraetselPayload,
  nummer: number,
  eingabe: string,
): { correct: boolean; bestaetigung: string | null } {
  const wort = payload.woerter.find((candidate) => candidate.nummer === nummer);
  if (!wort) {
    throw new GameItemNotFoundError("Rätselwort nicht gefunden.");
  }
  const correct = normalizeKreuzwortraetselEingabe(eingabe) === wort.loesung;
  return { correct, bestaetigung: correct ? wort.bestaetigung : null };
}

/**
 * Konstruktionsprüfung für das bei der Content-Autorierung von Hand entworfene Gitter (die
 * Spezifikation gibt nur Nummern/Richtungen/Lösungen vor, keine Koordinaten — "Das endgültige
 * Gitter muss so erstellt und geprüft werden, dass alle zehn Wörter mit den festgelegten
 * Richtungen, Nummern und übereinstimmenden Kreuzungsbuchstaben hineinpassen"). Prüft, dass sich
 * an jeder von zwei Wörtern gemeinsam belegten Gitterzelle identische Buchstaben befinden.
 * Wird von einem Unit-Test gegen den tatsächlich autorierten Content aufgerufen — keine manuelle
 * Handarbeit ohne automatisierte Gegenprobe.
 */
export function verifyCrosswordGrid(woerter: KreuzwortraetselWort[]): string[] {
  const errors: string[] = [];
  const numbersSeen = new Set<number>();
  const cells = new Map<string, { letter: string; wordNummer: number }>();

  for (const wort of woerter) {
    if (numbersSeen.has(wort.nummer)) {
      errors.push(`Nummer ${wort.nummer} ist mehrfach vergeben.`);
    }
    numbersSeen.add(wort.nummer);
    // F-193: Wörter eines reinen Wort-Pools tragen keine Positionen — dort gibt es nichts zu prüfen.
    if (wort.richtung === undefined || wort.startRow === undefined || wort.startCol === undefined) continue;

    for (let offset = 0; offset < wort.loesung.length; offset += 1) {
      const row = wort.richtung === "senkrecht" ? wort.startRow + offset : wort.startRow;
      const col = wort.richtung === "waagerecht" ? wort.startCol + offset : wort.startCol;
      const letter = wort.loesung[offset]!;
      const key = `${row},${col}`;
      const existing = cells.get(key);
      if (existing && existing.letter !== letter) {
        errors.push(
          `Kreuzungskonflikt bei Zelle (${row},${col}): Wort ${existing.wordNummer} erwartet "${existing.letter}", ` +
            `Wort ${wort.nummer} erwartet "${letter}".`,
        );
      }
      cells.set(key, { letter, wordNummer: wort.nummer });
    }
  }

  // F-193: Außerdem dürfen im Gitter keine ungewollten Buchstabenfolgen entstehen (zwei Wörter nebeneinander): Jede waagerechte
  // und senkrechte Folge von mindestens zwei Buchstaben muss genau einem Wort entsprechen.
  const positioniert = woerter.filter((wort) => wort.richtung !== undefined && wort.startRow !== undefined && wort.startCol !== undefined);
  const belegt = new Set(cells.keys());
  const wortStarts = new Set(positioniert.map((wort) => `${wort.richtung}:${wort.startRow},${wort.startCol}:${wort.loesung.length}`));
  for (const richtung of ["waagerecht", "senkrecht"] as const) {
    for (const k of belegt) {
      const [row, col] = k.split(",").map(Number) as [number, number];
      const davor = richtung === "waagerecht" ? `${row},${col - 1}` : `${row - 1},${col}`;
      if (belegt.has(davor)) continue;
      let laenge = 1;
      while (belegt.has(richtung === "waagerecht" ? `${row},${col + laenge}` : `${row + laenge},${col}`)) laenge += 1;
      if (laenge >= 2 && !wortStarts.has(`${richtung}:${row},${col}:${laenge}`)) {
        errors.push(`Ungewollte ${richtung}e Buchstabenfolge ab Zelle (${row},${col}) mit ${laenge} Buchstaben.`);
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Kennzahlen-Duell „Qualitätsmanagement und Prozesse" (F-142)
// ---------------------------------------------------------------------------

export interface ShapedKennzahlenDuellFrage {
  nummer: number;
  runde: number;
  frage: string;
  antwortA: string;
  antwortB: string;
  beantwortet: boolean;
}

/** Lösungsfrei — `richtig` wird nie an den Client geliefert, bevor eine Antwort geprüft wurde. */
export function shapeKennzahlenDuell(
  payload: KennzahlenDuellPayload,
  completedQuestionNumbers: number[],
): ShapedKennzahlenDuellFrage[] {
  const completed = new Set(completedQuestionNumbers);
  return payload.fragen.map((frage) => ({
    nummer: frage.nummer,
    runde: frage.runde,
    frage: frage.frage,
    antwortA: frage.antwortA,
    antwortB: frage.antwortB,
    beantwortet: completed.has(frage.nummer),
  }));
}

export function checkKennzahlenDuellAntwort(
  payload: KennzahlenDuellPayload,
  nummer: number,
  ausgewaehlt: "A" | "B",
): { correct: boolean; feedback: string } {
  const frage: KennzahlenDuellFrage | undefined = payload.fragen.find((candidate) => candidate.nummer === nummer);
  if (!frage) {
    throw new GameItemNotFoundError("Frage nicht gefunden.");
  }
  const correct = ausgewaehlt === frage.richtig;
  return { correct, feedback: correct ? frage.feedbackRichtig : frage.feedbackFalsch };
}

// ---------------------------------------------------------------------------
// Kennzahlen-Memory „Personal" (F-143)
// ---------------------------------------------------------------------------

export interface ShapedMemoryCard {
  cardId: number;
  text: string;
}

/** Mischt die zwölf Karten (sechs Paare) EINER Runde — bei jedem Aufruf neu gemischt (keine
 * Persistenz der Kartenpositionen je Lauf, analog zur Instrumenten-Lernpfad-Station 4). Gibt
 * bewusst KEINE Paar-Zugehörigkeit zurück — die Prüfung identifiziert ein Paar stattdessen über
 * die beiden Original-Texte (siehe checkMemoryPaar), dieselbe "Sitzungszustand-frei"-Idee wie im
 * Instrumenten-Lernpfad. */
export function shapeMemoryRunde(payload: MemoryPayload, runde: number, seed?: number): ShapedMemoryCard[] {
  const pool = payload.paare.filter((candidate) => candidate.runde === runde);
  // F-193: Enthält die Runde mehr Paare als gezeigt werden (`paareProRunde`, Standard 6), wird bei jedem Spiel neu gezogen.
  const random = seed === undefined ? Math.random : createSeededRandom(seed + runde * 7919);
  const paare = pool.length > (payload.paareProRunde ?? 6) ? seededShuffle(pool, random).slice(0, payload.paareProRunde ?? 6) : pool;
  const cards = paare.flatMap((paar) => [paar.begriff, paar.bedeutung]);
  return seededShuffle(
    cards.map((text, index) => ({ cardId: index, text })),
    random,
  );
}

/** Prüft GENAU einen aufgedeckten Kartenversuch — beide Texte müssen zum selben Paar (derselben
 * `nummer`) innerhalb der angegebenen Runde gehören. */
export function checkMemoryPaar(
  payload: MemoryPayload,
  runde: number,
  textA: string,
  textB: string,
): { correct: boolean; bestaetigung: string | null } {
  const paare = payload.paare.filter((candidate) => candidate.runde === runde);
  const paarA = paare.find((candidate) => candidate.begriff === textA || candidate.bedeutung === textA);
  const paarB = paare.find((candidate) => candidate.begriff === textB || candidate.bedeutung === textB);
  if (!paarA || !paarB) {
    throw new GameItemNotFoundError("Karte nicht gefunden.");
  }
  const correct = paarA.nummer === paarB.nummer && textA !== textB;
  return { correct, bestaetigung: correct ? paarA.bestaetigung : null };
}
