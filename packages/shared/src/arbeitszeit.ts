/**
 * F-198 (Arbeitszeit-Prüfer, Phase 2 der Kursprofile, W-GES-03 und W-AEV-03): Regelmaschine für die Grundregeln des
 * Arbeitszeitgesetzes (ArbZG, Erwachsene) und des Jugendarbeitsschutzgesetzes (JArbSchG, unter 18 Jahren).
 * Die beiden Regelsätze stehen bewusst getrennt in `REGELN`. **Rechtsstand:** Die Werte sind Grundregeln, aus den
 * Paragrafen übernommen, aber noch nicht von einer Fachperson gegen den Gesetzestext abgeglichen (Rahmenfrage R4);
 * Ausnahmen (Tarifverträge, Branchen, Pflege, Rufbereitschaft, §§ 14 ff. JArbSchG) sind bewusst nicht abgebildet.
 * Das Werkzeug ist eine Übung zu den Grundregeln, keine Rechtsberatung.
 */

export type Personengruppe = "erwachsene" | "jugendliche";

export const REGEL_STAND = "Oktober 2026 (Entwurf, noch nicht gegen den Gesetzestext abgeglichen)";

export interface Regelsatz {
  gesetz: string;
  /** Tägliche Höchstarbeitszeit in Minuten, die ohne Ausgleich zulässig ist. */
  tagNormalMin: number;
  /** Obergrenze, die nur mit Ausgleich erreichbar ist (nur Erwachsene), sonst `null`. */
  tagMaxMitAusgleichMin: number | null;
  /** Wochenhöchstarbeitszeit in Minuten (nur Jugendliche), sonst `null`. */
  wocheMaxMin: number | null;
  maxArbeitstageProWoche: number | null;
  /** Pausenstufen: ab einer Arbeitszeit von mehr als `abMin` Minuten sind `pauseMin` Minuten Pause nötig (aufsteigend). */
  pausenStufen: { abMin: number; pauseMin: number }[];
  ruhezeitMin: number;
  /** Zulässiges Zeitfenster für Jugendliche (Minuten ab Mitternacht), sonst `null`. */
  fenster: { vonMin: number; bisMin: number } | null;
  paragrafen: { arbeitszeit: string; pause: string; ruhezeit: string; fenster: string | null; woche: string | null; berufsschule: string | null };
}

export const REGELN: Record<Personengruppe, Regelsatz> = {
  erwachsene: {
    gesetz: "ArbZG",
    tagNormalMin: 8 * 60,
    tagMaxMitAusgleichMin: 10 * 60,
    wocheMaxMin: null,
    maxArbeitstageProWoche: null,
    pausenStufen: [
      { abMin: 6 * 60, pauseMin: 30 },
      { abMin: 9 * 60, pauseMin: 45 },
    ],
    ruhezeitMin: 11 * 60,
    fenster: null,
    paragrafen: { arbeitszeit: "§ 3 ArbZG", pause: "§ 4 ArbZG", ruhezeit: "§ 5 ArbZG", fenster: null, woche: null, berufsschule: null },
  },
  jugendliche: {
    gesetz: "JArbSchG",
    tagNormalMin: 8 * 60,
    tagMaxMitAusgleichMin: null,
    wocheMaxMin: 40 * 60,
    maxArbeitstageProWoche: 5,
    pausenStufen: [
      { abMin: 4.5 * 60, pauseMin: 30 },
      { abMin: 6 * 60, pauseMin: 60 },
    ],
    ruhezeitMin: 12 * 60,
    fenster: { vonMin: 6 * 60, bisMin: 20 * 60 },
    paragrafen: {
      arbeitszeit: "§ 8 JArbSchG",
      pause: "§ 11 JArbSchG",
      ruhezeit: "§ 13 JArbSchG",
      fenster: "§ 14 JArbSchG",
      woche: "§ 8 und § 15 JArbSchG",
      berufsschule: "§ 9 JArbSchG",
    },
  },
};

export interface Arbeitstag {
  /** Minuten ab Mitternacht; `null` = kein Arbeitstag. */
  beginnMin: number | null;
  endeMin: number | null;
  pauseMin: number;
  /** Berufsschultag mit mehr als fünf Unterrichtsstunden (nur Jugendliche). */
  berufsschule?: boolean;
}

export type HinweisArt = "verstoss" | "hinweis";

export interface Hinweis {
  art: HinweisArt;
  text: string;
  regel: string;
}

export interface TagAuswertung {
  /** Arbeitszeit ohne Ruhepausen in Minuten, `null` ohne gültige Eingabe. */
  arbeitsMin: number | null;
  hinweise: Hinweis[];
  /** Ruhezeit bis zum Beginn des nächsten Arbeitstags in Minuten, wenn dieser direkt folgt. */
  ruhezeitNachMin: number | null;
}

export interface WochenAuswertung {
  tage: TagAuswertung[];
  summeMin: number;
  arbeitstage: number;
  hinweise: Hinweis[];
}

/** "08:30" → 510; ungültig → `null`. */
export function parseUhrzeit(text: string): number | null {
  const treffer = /^(\d{1,2}):(\d{2})$/.exec(text.trim());
  if (!treffer) return null;
  const h = Number(treffer[1]);
  const m = Number(treffer[2]);
  return h <= 23 && m <= 59 ? h * 60 + m : null;
}

export function formatDauer(minuten: number): string {
  const h = Math.floor(Math.abs(minuten) / 60);
  const m = Math.abs(minuten) % 60;
  return m === 0 ? `${h} Std.` : `${h} Std. ${m} Min.`;
}

function formatUhr(minuten: number): string {
  const m = ((minuten % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function endeAbsolut(tag: Arbeitstag): number | null {
  if (tag.beginnMin === null || tag.endeMin === null) return null;
  return tag.endeMin <= tag.beginnMin ? tag.endeMin + 1440 : tag.endeMin;
}

function erforderlichePause(regeln: Regelsatz, arbeitsMin: number): number {
  let pause = 0;
  for (const stufe of regeln.pausenStufen) if (arbeitsMin > stufe.abMin) pause = stufe.pauseMin;
  return pause;
}

export function pruefeWoche(gruppe: Personengruppe, tage: Arbeitstag[]): WochenAuswertung {
  const regeln = REGELN[gruppe];
  const auswertung: TagAuswertung[] = tage.map((tag) => {
    const hinweise: Hinweis[] = [];
    const ende = endeAbsolut(tag);
    if (tag.beginnMin === null || ende === null) return { arbeitsMin: null, hinweise, ruhezeitNachMin: null };

    const spanne = ende - tag.beginnMin;
    const arbeitsMin = spanne - tag.pauseMin;
    if (tag.pauseMin < 0 || arbeitsMin <= 0) {
      hinweise.push({ art: "hinweis", text: "Die Pause ist so lang wie der ganze Arbeitstag oder länger. Bitte die Eingabe prüfen.", regel: regeln.paragrafen.pause });
      return { arbeitsMin: null, hinweise, ruhezeitNachMin: null };
    }

    // Höchstarbeitszeit je Tag
    if (regeln.tagMaxMitAusgleichMin !== null && arbeitsMin > regeln.tagMaxMitAusgleichMin) {
      hinweise.push({ art: "verstoss", text: `Die Arbeitszeit von ${formatDauer(arbeitsMin)} liegt über der Obergrenze von ${formatDauer(regeln.tagMaxMitAusgleichMin)} am Tag.`, regel: regeln.paragrafen.arbeitszeit });
    } else if (arbeitsMin > regeln.tagNormalMin) {
      hinweise.push(
        regeln.tagMaxMitAusgleichMin !== null
          ? {
              art: "hinweis",
              text: `Mehr als ${formatDauer(regeln.tagNormalMin)} am Tag sind bis ${formatDauer(regeln.tagMaxMitAusgleichMin)} nur zulässig, wenn innerhalb von sechs Kalendermonaten oder 24 Wochen im Durchschnitt acht Stunden werktäglich nicht überschritten werden.`,
              regel: regeln.paragrafen.arbeitszeit,
            }
          : { art: "verstoss", text: `Die Arbeitszeit von ${formatDauer(arbeitsMin)} liegt über ${formatDauer(regeln.tagNormalMin)} am Tag.`, regel: regeln.paragrafen.arbeitszeit },
      );
    }

    // Ruhepausen
    const noetig = erforderlichePause(regeln, arbeitsMin);
    if (tag.pauseMin < noetig) {
      hinweise.push({ art: "verstoss", text: `Bei ${formatDauer(arbeitsMin)} Arbeitszeit sind mindestens ${noetig} Minuten Pause nötig, eingetragen sind ${tag.pauseMin}.`, regel: regeln.paragrafen.pause });
    }

    // Zeitfenster (Jugendliche)
    if (regeln.fenster && (tag.beginnMin < regeln.fenster.vonMin || ende > regeln.fenster.bisMin)) {
      hinweise.push({
        art: "verstoss",
        text: `Jugendliche dürfen grundsätzlich nur zwischen ${formatUhr(regeln.fenster.vonMin)} und ${formatUhr(regeln.fenster.bisMin)} Uhr beschäftigt werden (Ausnahmen für einzelne Branchen sind hier nicht abgebildet).`,
        regel: regeln.paragrafen.fenster!,
      });
    }

    // Berufsschultag (Jugendliche)
    if (gruppe === "jugendliche" && tag.berufsschule) {
      hinweise.push({
        art: "verstoss",
        text: "An einem Berufsschultag mit mehr als fünf Unterrichtsstunden von mindestens je 45 Minuten (einmal in der Woche) dürfen Jugendliche im Betrieb nicht beschäftigt werden.",
        regel: regeln.paragrafen.berufsschule!,
      });
    }
    return { arbeitsMin, hinweise, ruhezeitNachMin: null };
  });

  // Ruhezeit zwischen aufeinanderfolgenden Arbeitstagen
  for (let index = 0; index < tage.length - 1; index += 1) {
    const heute = tage[index]!;
    const morgen = tage[index + 1]!;
    const ende = endeAbsolut(heute);
    if (ende === null || morgen.beginnMin === null || morgen.endeMin === null || auswertung[index]!.arbeitsMin === null || auswertung[index + 1]!.arbeitsMin === null) continue;
    const ruhe = morgen.beginnMin + 1440 - ende;
    auswertung[index]!.ruhezeitNachMin = ruhe;
    if (ruhe < regeln.ruhezeitMin) {
      auswertung[index]!.hinweise.push({
        art: "verstoss",
        text: `Zwischen Arbeitsende (${formatUhr(ende)} Uhr) und Beginn am nächsten Tag (${formatUhr(morgen.beginnMin)} Uhr) liegen nur ${formatDauer(ruhe)}, nötig sind mindestens ${formatDauer(regeln.ruhezeitMin)} Ruhezeit (Ausnahmen, etwa in der Pflege, sind hier nicht abgebildet).`,
        regel: regeln.paragrafen.ruhezeit,
      });
    }
  }

  const summeMin = auswertung.reduce((summe, tag) => summe + (tag.arbeitsMin ?? 0), 0);
  const arbeitstage = auswertung.filter((tag) => tag.arbeitsMin !== null).length;
  const hinweise: Hinweis[] = [];
  if (regeln.wocheMaxMin !== null && summeMin > regeln.wocheMaxMin) {
    hinweise.push({ art: "verstoss", text: `Die Wochenarbeitszeit von ${formatDauer(summeMin)} liegt über ${formatDauer(regeln.wocheMaxMin)}.`, regel: regeln.paragrafen.woche! });
  }
  if (regeln.maxArbeitstageProWoche !== null && arbeitstage > regeln.maxArbeitstageProWoche) {
    hinweise.push({ art: "verstoss", text: `Jugendliche dürfen höchstens an ${regeln.maxArbeitstageProWoche} Tagen in der Woche beschäftigt werden, eingetragen sind ${arbeitstage}.`, regel: regeln.paragrafen.woche! });
  }
  return { tage: auswertung, summeMin, arbeitstage, hinweise };
}
