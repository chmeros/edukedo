/**
 * F-193 (Wiederspielbarkeit der Gaming-Tab-Spiele, Nutzer-Vorgabe vom 06.10.2026, siehe Architekturplanung Abschnitt 13):
 * Gitter-Generator für das Kreuzworträtsel. Statt eines von Hand entworfenen, immer gleichen Gitters wählt der
 * Generator aus einem Wort-Pool eine Teilmenge und legt sie bei jedem Start neu an. Alles läuft über einen
 * Seed (deterministisch): derselbe Seed liefert dasselbe Rätsel, sodass ein Reload mitten im Spiel das Rätsel
 * nicht verändert; ein neuer Seed liefert ein neues Rätsel.
 */

/** Kleiner, schneller Zufallsgenerator (mulberry32) — liefert Werte in [0, 1). */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Neuer zufälliger Seed (31 Bit, passt in `z.number().int()` und in JSONB). */
export function randomSeed(): number {
  return Math.floor(Math.random() * 2147483647) + 1;
}

/** Fisher-Yates mit übergebenem Zufallsgenerator (der Eingabe-Array bleibt unverändert). */
export function seededShuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export interface CrosswordLayoutOptions {
  /** Wie viele Wörter das Rätsel enthalten soll (Standard 10). Ist der Pool kleiner, werden alle verwendet. */
  wortzahl?: number;
  /** Längste zulässige Gitterkante (Zeilen bzw. Spalten). */
  maxKante?: number;
  /** Wörter länger als dieser Wert zählen als „lang“ (Standard 10 Buchstaben). */
  langAb?: number;
  /** Höchstzahl langer Wörter je Rätsel (Standard 2) — das Rätsel soll nicht aus Fachwort-Ungetümen bestehen. */
  maxLange?: number;
  /** Absolute Obergrenze der Wortlänge; längere Wörter werden nur genutzt, wenn der Pool sonst zu klein wäre. */
  maxLaenge?: number;
  /** Anzahl der Versuche mit jeweils neuer Wortauswahl und Reihenfolge. */
  versuche?: number;
}

export interface PlacedWord<T> {
  wort: T;
  richtung: "waagerecht" | "senkrecht";
  startRow: number;
  startCol: number;
}

interface Cell {
  letter: string;
  /** Richtung des Wortes, zu dem die Zelle gehört — eine Zelle darf nur von zwei Wörtern verschiedener Richtung geteilt werden. */
  richtungen: Set<"waagerecht" | "senkrecht">;
}

interface Attempt<T> {
  placed: PlacedWord<T>[];
  rows: number;
  cols: number;
}

function key(row: number, col: number): string {
  return `${row},${col}`;
}

function wortZellen(laenge: number, richtung: "waagerecht" | "senkrecht", row: number, col: number): { row: number; col: number }[] {
  return Array.from({ length: laenge }, (_, offset) => ({
    row: richtung === "senkrecht" ? row + offset : row,
    col: richtung === "waagerecht" ? col + offset : col,
  }));
}

/** Prüft, ob das Wort an dieser Stelle in das bisherige Gitter passt (Kreuzungen nur bei gleichem Buchstaben, keine
 * Nachbarschaft zu parallelen Wörtern, keine Verlängerung bestehender Wörter) und zählt die Kreuzungen. */
function pruefePlatzierung(
  grid: Map<string, Cell>,
  loesung: string,
  richtung: "waagerecht" | "senkrecht",
  row: number,
  col: number,
): number | null {
  const zellen = wortZellen(loesung.length, richtung, row, col);
  const davor = richtung === "waagerecht" ? { row, col: col - 1 } : { row: row - 1, col };
  const danach =
    richtung === "waagerecht" ? { row, col: col + loesung.length } : { row: row + loesung.length, col };
  if (grid.has(key(davor.row, davor.col)) || grid.has(key(danach.row, danach.col))) return null;

  let kreuzungen = 0;
  for (let i = 0; i < zellen.length; i += 1) {
    const zelle = zellen[i]!;
    const vorhanden = grid.get(key(zelle.row, zelle.col));
    if (vorhanden) {
      if (vorhanden.letter !== loesung[i] || vorhanden.richtungen.has(richtung)) return null;
      kreuzungen += 1;
      continue;
    }
    const seite1 = richtung === "waagerecht" ? { row: zelle.row - 1, col: zelle.col } : { row: zelle.row, col: zelle.col - 1 };
    const seite2 = richtung === "waagerecht" ? { row: zelle.row + 1, col: zelle.col } : { row: zelle.row, col: zelle.col + 1 };
    if (grid.has(key(seite1.row, seite1.col)) || grid.has(key(seite2.row, seite2.col))) return null;
  }
  return kreuzungen;
}

function platziere(grid: Map<string, Cell>, loesung: string, richtung: "waagerecht" | "senkrecht", row: number, col: number): void {
  wortZellen(loesung.length, richtung, row, col).forEach((zelle, i) => {
    const vorhanden = grid.get(key(zelle.row, zelle.col));
    if (vorhanden) vorhanden.richtungen.add(richtung);
    else grid.set(key(zelle.row, zelle.col), { letter: loesung[i]!, richtungen: new Set([richtung]) });
  });
}

function begrenzung(placed: { loesung: string; richtung: "waagerecht" | "senkrecht"; startRow: number; startCol: number }[]): {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
} {
  let minRow = Infinity;
  let maxRow = -Infinity;
  let minCol = Infinity;
  let maxCol = -Infinity;
  for (const wort of placed) {
    const endRow = wort.richtung === "senkrecht" ? wort.startRow + wort.loesung.length - 1 : wort.startRow;
    const endCol = wort.richtung === "waagerecht" ? wort.startCol + wort.loesung.length - 1 : wort.startCol;
    minRow = Math.min(minRow, wort.startRow);
    maxRow = Math.max(maxRow, endRow);
    minCol = Math.min(minCol, wort.startCol);
    maxCol = Math.max(maxCol, endCol);
  }
  return { minRow, maxRow, minCol, maxCol };
}

function einVersuch<T extends { loesung: string }>(
  woerter: T[],
  random: () => number,
  maxKante: number,
): Attempt<T> {
  const grid = new Map<string, Cell>();
  const placed: { wort: T; loesung: string; richtung: "waagerecht" | "senkrecht"; startRow: number; startCol: number }[] = [];
  const offen = [...woerter];

  const erstes = offen.shift()!;
  const erstRichtung = random() < 0.5 ? "waagerecht" : "senkrecht";
  platziere(grid, erstes.loesung, erstRichtung, 0, 0);
  placed.push({ wort: erstes, loesung: erstes.loesung, richtung: erstRichtung, startRow: 0, startCol: 0 });

  let fortschritt = true;
  while (offen.length > 0 && fortschritt) {
    fortschritt = false;
    for (let index = 0; index < offen.length; index += 1) {
      const kandidat = offen[index]!;
      let beste: { richtung: "waagerecht" | "senkrecht"; row: number; col: number; punkte: number } | null = null;

      for (const bestehend of placed) {
        const richtung: "waagerecht" | "senkrecht" = bestehend.richtung === "waagerecht" ? "senkrecht" : "waagerecht";
        for (let i = 0; i < kandidat.loesung.length; i += 1) {
          for (let j = 0; j < bestehend.loesung.length; j += 1) {
            if (kandidat.loesung[i] !== bestehend.loesung[j]) continue;
            const row = richtung === "senkrecht" ? bestehend.startRow - i : bestehend.startRow + j;
            const col = richtung === "waagerecht" ? bestehend.startCol - i : bestehend.startCol + j;
            const kreuzungen = pruefePlatzierung(grid, kandidat.loesung, richtung, row, col);
            if (kreuzungen === null) continue;

            const mit = [...placed, { loesung: kandidat.loesung, richtung, startRow: row, startCol: col }];
            const rahmen = begrenzung(mit);
            const hoehe = rahmen.maxRow - rahmen.minRow + 1;
            const breite = rahmen.maxCol - rahmen.minCol + 1;
            if (hoehe > maxKante || breite > maxKante) continue;

            // Mehr Kreuzungen und ein kompakteres, möglichst quadratisches Gitter sind besser; der Zufall entscheidet bei Gleichstand.
            const punkte = kreuzungen * 10 - (hoehe + breite) - Math.abs(hoehe - breite) * 0.5 + random() * 3;
            if (!beste || punkte > beste.punkte) beste = { richtung, row, col, punkte };
          }
        }
      }

      if (beste) {
        platziere(grid, kandidat.loesung, beste.richtung, beste.row, beste.col);
        placed.push({ wort: kandidat, loesung: kandidat.loesung, richtung: beste.richtung, startRow: beste.row, startCol: beste.col });
        offen.splice(index, 1);
        fortschritt = true;
        break;
      }
    }
  }

  const rahmen = begrenzung(placed);
  return {
    placed: placed.map((p) => ({ wort: p.wort, richtung: p.richtung, startRow: p.startRow - rahmen.minRow, startCol: p.startCol - rahmen.minCol })),
    rows: rahmen.maxRow - rahmen.minRow + 1,
    cols: rahmen.maxCol - rahmen.minCol + 1,
  };
}

/** Zwei Wörter dürfen nicht an derselben Zelle beginnen (sonst fehlt in der Gitteranzeige eine Nummer). */
function startzellenEindeutig<T>(placed: PlacedWord<T>[]): boolean {
  const gesehen = new Set<string>();
  for (const wort of placed) {
    const k = key(wort.startRow, wort.startCol);
    if (gesehen.has(k)) return false;
    gesehen.add(k);
  }
  return true;
}

/**
 * Wählt aus dem Pool eine Teilmenge (bevorzugt kurze Wörter, höchstens `maxLange` lange) und legt sie als Kreuzworträtsel an.
 * Es werden mehrere Versuche gemacht; zurück kommt das Layout mit den meisten platzierten Wörtern (bei Gleichstand das
 * kompakteste). Sortiert nach Position, damit die Nummerierung wie bei einem gedruckten Rätsel von oben links nach unten rechts läuft.
 */
export function layoutCrossword<T extends { loesung: string }>(
  pool: readonly T[],
  seed: number,
  optionen: CrosswordLayoutOptions = {},
): PlacedWord<T>[] {
  const wortzahl = Math.min(optionen.wortzahl ?? 10, pool.length);
  const maxKante = optionen.maxKante ?? 15;
  const langAb = optionen.langAb ?? 10;
  const maxLange = optionen.maxLange ?? 2;
  const maxLaenge = optionen.maxLaenge ?? 13;
  const versuche = optionen.versuche ?? 120;
  const random = createSeededRandom(seed);

  let beste: Attempt<T> | null = null;
  for (let versuch = 0; versuch < versuche; versuch += 1) {
    const gemischt = seededShuffle(pool, random);
    // Kurze Wörter bevorzugen; höchstens `maxLange` lange Wörter; zu lange Wörter nur, wenn der Pool sonst nicht reicht.
    const kurz = gemischt.filter((wort) => wort.loesung.length <= langAb);
    const lang = gemischt.filter((wort) => wort.loesung.length > langAb && wort.loesung.length <= maxLaenge);
    const sehrLang = gemischt.filter((wort) => wort.loesung.length > maxLaenge);
    const anzahlLang = Math.min(lang.length, Math.floor(random() * (maxLange + 1)));
    const auswahl: T[] = [...lang.slice(0, anzahlLang), ...kurz.slice(0, wortzahl - anzahlLang)];
    if (auswahl.length < wortzahl) auswahl.push(...lang.slice(anzahlLang, anzahlLang + wortzahl - auswahl.length));
    if (auswahl.length < wortzahl) auswahl.push(...sehrLang.slice(0, wortzahl - auswahl.length));
    // Längstes Wort zuerst (mehr Kreuzungsmöglichkeiten), der Rest in zufälliger Reihenfolge.
    const reihenfolge = [...auswahl].sort((a, b) => b.loesung.length - a.loesung.length || random() - 0.5);
    if (reihenfolge.length === 0) continue;
    const ergebnis = einVersuch(reihenfolge, random, maxKante);
    if (!startzellenEindeutig(ergebnis.placed)) continue;
    const besser =
      !beste ||
      ergebnis.placed.length > beste.placed.length ||
      (ergebnis.placed.length === beste.placed.length && ergebnis.rows + ergebnis.cols < beste.rows + beste.cols);
    if (besser) beste = ergebnis;
    if (beste && beste.placed.length === wortzahl && beste.rows + beste.cols <= maxKante + 2) break;
  }

  if (!beste) return [];
  return [...beste.placed].sort((a, b) => a.startRow - b.startRow || a.startCol - b.startCol);
}
