/**
 * F-198 (Arbeitszeit-Prüfer, Phase 2 der Kursprofile, W-GES-03 und W-AEV-03): Regelmaschine für die Grundregeln des
 * Arbeitszeitgesetzes (ArbZG, Erwachsene) und des Jugendarbeitsschutzgesetzes (JArbSchG, unter 18 Jahren).
 * Die beiden Regelsätze stehen bewusst getrennt in `REGELN`. **Rechtsstand:** Die Werte sind am 23.10.2026 gegen den
 * Gesetzestext (gesetze-im-internet.de: §§ 4, 8, 9, 11 bis 15 JArbSchG, §§ 3 bis 5 ArbZG) und gegen Thema 1.4 des
 * AEVO-Kurses abgeglichen, aber noch nicht von einer Fachperson geprüft (Rahmenfrage R4). Was der Gesetzestext nur mit
 * Auslegung, Branchenwissen oder zusätzlichen Angaben entscheidet (Ausgleich auf 8,5 Stunden, Branchenausnahmen,
 * Berufsschule vor 9 Uhr, Blockwochen, Lage der Pausen), wird als **Hinweis** („bitte prüfen“) ausgegeben, nicht als
 * Verstoß. Ausnahmen (Tarifverträge, Pflege, Rufbereitschaft, §§ 14 ff. und 21 ff. JArbSchG) sind bewusst nicht
 * abgebildet. Das Werkzeug ist eine Übung zu den Grundregeln, keine Rechtsberatung.
 */

export type Personengruppe = "erwachsene" | "jugendliche";

export const REGEL_STAND = "Oktober 2026 (gegen den Gesetzestext abgeglichen, noch nicht rechtlich geprüft)";

/** Eine Unterbrechung zählt nur ab 15 Minuten als Ruhepause (§ 11 Abs. 1 JArbSchG, § 4 Satz 2 ArbZG). */
export const MIN_RUHEPAUSE_MIN = 15;

export interface Regelsatz {
  gesetz: string;
  /** Tägliche Höchstarbeitszeit in Minuten, die ohne Ausgleich zulässig ist. */
  tagNormalMin: number;
  /** Obergrenze, die nur mit Ausgleich erreichbar ist (Erwachsene 10 Std., Jugendliche 8,5 Std.), sonst `null`. */
  tagMaxMitAusgleichMin: number | null;
  /** Wochenhöchstarbeitszeit in Minuten (nur Jugendliche), sonst `null`. */
  wocheMaxMin: number | null;
  maxArbeitstageProWoche: number | null;
  /** Pausenstufen: ab einer Arbeitszeit von mehr als `abMin` Minuten sind `pauseMin` Minuten Pause nötig (aufsteigend). */
  pausenStufen: { abMin: number; pauseMin: number }[];
  ruhezeitMin: number;
  /** Höchste Schichtzeit (Arbeitszeit plus Ruhepausen) in Minuten (nur Jugendliche), sonst `null`. */
  schichtMaxMin: number | null;
  /** Zulässiges Zeitfenster für Jugendliche (Minuten ab Mitternacht), sonst `null`. */
  fenster: { vonMin: number; bisMin: number } | null;
  paragrafen: { arbeitszeit: string; pause: string; ruhezeit: string; fenster: string | null; woche: string | null; berufsschule: string | null; schicht: string | null };
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
    schichtMaxMin: null,
    fenster: null,
    paragrafen: { arbeitszeit: "§ 3 ArbZG", pause: "§ 4 ArbZG", ruhezeit: "§ 5 ArbZG", fenster: null, woche: null, berufsschule: null, schicht: null },
  },
  jugendliche: {
    gesetz: "JArbSchG",
    tagNormalMin: 8 * 60,
    tagMaxMitAusgleichMin: 8.5 * 60,
    wocheMaxMin: 40 * 60,
    maxArbeitstageProWoche: 5,
    pausenStufen: [
      { abMin: 4.5 * 60, pauseMin: 30 },
      { abMin: 6 * 60, pauseMin: 60 },
    ],
    ruhezeitMin: 12 * 60,
    schichtMaxMin: 10 * 60,
    fenster: { vonMin: 6 * 60, bisMin: 20 * 60 },
    paragrafen: {
      arbeitszeit: "§ 8 JArbSchG",
      pause: "§ 11 JArbSchG",
      ruhezeit: "§ 13 JArbSchG",
      fenster: "§ 14 JArbSchG",
      woche: "§ 8 und § 15 JArbSchG",
      berufsschule: "§ 9 JArbSchG",
      schicht: "§ 12 JArbSchG",
    },
  },
};

export interface Arbeitstag {
  /** Minuten ab Mitternacht; `null` = kein Arbeitstag. */
  beginnMin: number | null;
  endeMin: number | null;
  pauseMin: number;
  /**
   * Berufsschultag mit mehr als fünf Unterrichtsstunden von mindestens je 45 Minuten (nur Jugendliche). Auch an einem
   * Tag ohne Betriebseinsatz (Beginn und Ende leer) setzen: Der Tag wird dann mit der durchschnittlichen täglichen
   * Arbeitszeit auf die Woche angerechnet (§ 9 Abs. 2 Nr. 1 JArbSchG).
   */
  berufsschule?: boolean;
}

export interface WochenOptionen {
  /**
   * Die Ruhezeit vom letzten Arbeitstag zum ersten der Folgewoche mitprüfen, unter der Annahme, dass die Folgewoche wie
   * diese Woche beginnt (Ergebnis nur als Hinweis). Gedacht für eine Woche Montag bis Sonntag.
   */
  wochenwechsel?: boolean;
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
  /** Arbeitszeit im Betrieb in Minuten (ohne angerechneten Berufsschultag, siehe `schultagAnrechnungMin`). */
  summeMin: number;
  arbeitstage: number;
  /** Geschätzte Anrechnung eines beschäftigungsfreien Berufsschultags (§ 9 Abs. 2 Nr. 1 JArbSchG) in Minuten, sonst `null`. */
  schultagAnrechnungMin: number | null;
  /** Befunde zur Woche: Verstöße und Hinweise. */
  hinweise: Hinweis[];
  /** Was das Werkzeug mit den vorhandenen Eingaben nicht prüfen kann; immer als Hinweis „bitte prüfen“. */
  nichtGeprueft: Hinweis[];
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

/** Eintrag ohne jede Zeitangabe: freier Tag. */
function istFrei(tag: Arbeitstag): boolean {
  return tag.beginnMin === null && tag.endeMin === null;
}

interface TagBasis {
  /** Arbeitszeit ohne die Unterbrechungen, die als Ruhepause zählen; `null` ohne gültige Eingabe. */
  arbeitsMin: number | null;
  /** Dauer, die als Ruhepause zählt (0, wenn die eingetragene Pause unter 15 Minuten liegt). */
  pauseZaehltMin: number;
  spanneMin: number;
  ende: number | null;
}

function basisTag(tag: Arbeitstag): TagBasis {
  const ende = endeAbsolut(tag);
  if (tag.beginnMin === null || ende === null) return { arbeitsMin: null, pauseZaehltMin: 0, spanneMin: 0, ende: null };
  const spanne = ende - tag.beginnMin;
  if (tag.pauseMin < 0 || spanne - tag.pauseMin <= 0) return { arbeitsMin: null, pauseZaehltMin: 0, spanneMin: spanne, ende };
  const zaehlt = tag.pauseMin >= MIN_RUHEPAUSE_MIN ? tag.pauseMin : 0;
  return { arbeitsMin: spanne - zaehlt, pauseZaehltMin: zaehlt, spanneMin: spanne, ende };
}

function nichtGeprueftListe(gruppe: Personengruppe): Hinweis[] {
  if (gruppe === "erwachsene") {
    return [
      {
        art: "hinweis",
        regel: "§ 4 ArbZG",
        text: "Pausen: Eingegeben wird nur die Gesamtdauer. Nicht geprüft: Die Pausen müssen im Voraus feststehen und dürfen nur in Abschnitten von jeweils mindestens 15 Minuten genommen werden; länger als sechs Stunden hintereinander darf nicht ohne Ruhepause gearbeitet werden. Bitte prüfen.",
      },
      {
        art: "hinweis",
        regel: "§§ 3, 5, 6, 9 ArbZG",
        text: "Nicht geprüft: Ausgleich des Durchschnitts von acht Stunden über sechs Kalendermonate oder 24 Wochen, Nacht- und Schichtarbeit, Sonn- und Feiertagsruhe, Ausnahmen durch Tarifvertrag und die Verkürzung der Ruhezeit um eine Stunde mit Ausgleich in Pflege, Gaststätten, Verkehr und weiteren Bereichen. Bitte prüfen.",
      },
      {
        art: "hinweis",
        regel: "§ 9 Abs. 1 JArbSchG",
        text: "Für noch berufsschulpflichtige Personen über 18 Jahre gilt zusätzlich: keine Beschäftigung vor Berufsschulunterricht, der vor 9 Uhr beginnt. Das wird hier nicht geprüft. Bitte prüfen.",
      },
    ];
  }
  return [
    {
      art: "hinweis",
      regel: "§ 11 JArbSchG",
      text: "Pausen: Eingegeben wird nur die Gesamtdauer. Nicht geprüft: Jede Ruhepause muss im Voraus feststehen und mindestens 15 Minuten dauern; sie darf nicht in der ersten und nicht in der letzten Stunde der Arbeitszeit liegen, und länger als 4,5 Stunden hintereinander darf nicht ohne Ruhepause gearbeitet werden. Bitte prüfen.",
    },
    {
      art: "hinweis",
      regel: "§ 9 und § 14 Abs. 4 JArbSchG",
      text: "Berufsschule: Nicht geprüft: Unterricht, der vor 9 Uhr beginnt (dann keine Beschäftigung davor und am Vortag nicht nach 20 Uhr), Blockwochen mit mindestens 25 Unterrichtsstunden an fünf Tagen und die Anrechnung der übrigen Unterrichtszeit einschließlich Pausen und Wegezeiten auf die Arbeitszeit. Bitte prüfen.",
    },
    {
      art: "hinweis",
      regel: "§ 8 Abs. 2, § 4 Abs. 5, §§ 16 bis 18 JArbSchG",
      text: "Nicht geprüft: Verteilung der ausfallenden Arbeitszeit rund um Feiertage auf fünf zusammenhängende Wochen, Zusammenrechnung bei mehreren Arbeitgebern sowie das Verbot der Samstags-, Sonntags- und Feiertagsarbeit mit seinen Ausnahmen. Bitte prüfen.",
    },
  ];
}

export function pruefeWoche(gruppe: Personengruppe, tage: Arbeitstag[], optionen: WochenOptionen = {}): WochenAuswertung {
  const regeln = REGELN[gruppe];
  const basis = tage.map(basisTag);
  const auswertung: TagAuswertung[] = tage.map((tag, index) => {
    const hinweise: Hinweis[] = [];
    const b = basis[index]!;
    if (tag.beginnMin === null || b.ende === null) return { arbeitsMin: null, hinweise, ruhezeitNachMin: null };
    if (b.arbeitsMin === null) {
      hinweise.push({ art: "hinweis", text: "Die Pause ist so lang wie der ganze Arbeitstag oder länger. Bitte die Eingabe prüfen.", regel: regeln.paragrafen.pause });
      return { arbeitsMin: null, hinweise, ruhezeitNachMin: null };
    }
    const arbeitsMin = b.arbeitsMin;

    // Pausen unter 15 Minuten zählen nicht als Ruhepause
    if (tag.pauseMin > 0 && tag.pauseMin < MIN_RUHEPAUSE_MIN) {
      hinweise.push({
        art: "hinweis",
        text: `Eine Unterbrechung von ${tag.pauseMin} Minuten gilt nicht als Ruhepause (mindestens ${MIN_RUHEPAUSE_MIN} Minuten). Sie wird hier nicht von der Arbeitszeit abgezogen. Bitte prüfen.`,
        regel: regeln.paragrafen.pause,
      });
    }

    // Höchstarbeitszeit je Tag
    if (regeln.tagMaxMitAusgleichMin !== null && arbeitsMin > regeln.tagMaxMitAusgleichMin) {
      hinweise.push({
        art: "verstoss",
        text:
          gruppe === "erwachsene"
            ? `Die Arbeitszeit von ${formatDauer(arbeitsMin)} liegt über der Obergrenze von ${formatDauer(regeln.tagMaxMitAusgleichMin)} am Tag.`
            : `Die Arbeitszeit von ${formatDauer(arbeitsMin)} liegt über ${formatDauer(regeln.tagMaxMitAusgleichMin)} am Tag, dem Höchstwert, den das Gesetz auch mit Ausgleich zulässt (Abweichungen durch Tarifvertrag, § 21a, oder im Notfall, § 21, sind hier nicht abgebildet).`,
        regel: regeln.paragrafen.arbeitszeit,
      });
    } else if (arbeitsMin > regeln.tagNormalMin) {
      if (gruppe === "erwachsene") {
        hinweise.push({
          art: "hinweis",
          text: `Mehr als ${formatDauer(regeln.tagNormalMin)} am Tag sind bis ${formatDauer(regeln.tagMaxMitAusgleichMin!)} nur zulässig, wenn innerhalb von sechs Kalendermonaten oder 24 Wochen im Durchschnitt acht Stunden werktäglich nicht überschritten werden.`,
          regel: regeln.paragrafen.arbeitszeit,
        });
      } else {
        const kuerzererTag = basis.some((andere, position) => position !== index && andere.arbeitsMin !== null && andere.arbeitsMin < regeln.tagNormalMin);
        hinweise.push({
          art: "hinweis",
          text:
            `Die Arbeitszeit von ${formatDauer(arbeitsMin)} liegt über ${formatDauer(regeln.tagNormalMin)}. Bis ${formatDauer(regeln.tagMaxMitAusgleichMin!)} ist das zulässig, wenn die Arbeitszeit an einzelnen Werktagen derselben Woche unter 8 Stunden verkürzt ist (§ 8 Abs. 2a) oder ` +
            `die ausfallende Arbeitszeit in Verbindung mit Feiertagen auf fünf zusammenhängende Wochen verteilt wird (§ 8 Abs. 2); die Wochengrenze von ${formatDauer(regeln.wocheMaxMin!)} bleibt bestehen. ` +
            (kuerzererTag
              ? "Ein anderer eingetragener Tag liegt unter 8 Stunden, die Voraussetzung des Ausgleichs innerhalb der Woche ist hier also erkennbar."
              : "Kein anderer eingetragener Tag liegt unter 8 Stunden; ob ein freier Werktag als Verkürzung zählt, ist Auslegung.") +
            " Bitte prüfen.",
          regel: regeln.paragrafen.arbeitszeit,
        });
      }
    }

    // Ruhepausen
    const noetig = erforderlichePause(regeln, arbeitsMin);
    if (b.pauseZaehltMin < noetig) {
      hinweise.push({
        art: "verstoss",
        text: `Bei ${formatDauer(arbeitsMin)} Arbeitszeit sind mindestens ${noetig} Minuten Pause nötig, als Ruhepause zählen ${b.pauseZaehltMin} (eingetragen sind ${tag.pauseMin}).`,
        regel: regeln.paragrafen.pause,
      });
    }

    // Schichtzeit (Jugendliche): Arbeitszeit plus Ruhepausen
    if (regeln.schichtMaxMin !== null && b.spanneMin > regeln.schichtMaxMin) {
      hinweise.push({
        art: "verstoss",
        text: `Die Schichtzeit (Arbeitszeit plus Ruhepausen) von ${formatDauer(b.spanneMin)} liegt über ${formatDauer(regeln.schichtMaxMin)}. (Im Gaststättengewerbe, in der Landwirtschaft, in der Tierhaltung und auf Bau- und Montagestellen gelten 11 Stunden; das ist hier nicht abgebildet.)`,
        regel: regeln.paragrafen.schicht!,
      });
    }

    // Zeitfenster (Jugendliche)
    if (regeln.fenster && (tag.beginnMin < regeln.fenster.vonMin || b.ende > regeln.fenster.bisMin)) {
      hinweise.push({
        art: "verstoss",
        text: `Jugendliche dürfen nur zwischen ${formatUhr(regeln.fenster.vonMin)} und ${formatUhr(regeln.fenster.bisMin)} Uhr beschäftigt werden. Ausnahmen gelten für einzelne Branchen (zum Beispiel Gaststätten, mehrschichtige Betriebe, Bäckereien, Landwirtschaft) und meist erst ab 16 Jahren (§ 14 Abs. 2 bis 7); sie sind hier nicht abgebildet.`,
        regel: regeln.paragrafen.fenster!,
      });
    }
    return { arbeitsMin, hinweise, ruhezeitNachMin: null };
  });

  // Berufsschultage (Jugendliche): das Gesetz schützt einen Berufsschultag mit mehr als fünf Unterrichtsstunden je Woche
  let schultagFrei = false;
  if (gruppe === "jugendliche") {
    const schultage = tage.map((tag, index) => (tag.berufsschule ? index : -1)).filter((index) => index >= 0);
    const freieSchultage = schultage.filter((index) => istFrei(tage[index]!));
    const geleisteteSchultage = schultage.filter((index) => auswertung[index]!.arbeitsMin !== null);
    schultagFrei = freieSchultage.length > 0;
    const berufsschuleRegel = regeln.paragrafen.berufsschule!;
    geleisteteSchultage.forEach((index, position) => {
      const hinweise = auswertung[index]!.hinweise;
      if (position === 0 && !schultagFrei) {
        hinweise.push({
          art: "verstoss",
          text:
            geleisteteSchultage.length === 1
              ? "An einem Berufsschultag mit mehr als fünf Unterrichtsstunden von mindestens je 45 Minuten dürfen Jugendliche (einmal in der Woche) im Betrieb nicht beschäftigt werden."
              : "Mindestens einer der Berufsschultage mit mehr als fünf Unterrichtsstunden pro Woche muss beschäftigungsfrei bleiben; hier ist keiner frei.",
          regel: berufsschuleRegel,
        });
      } else {
        hinweise.push({
          art: "hinweis",
          text: `Das Beschäftigungsverbot gilt nur für einen Berufsschultag mit mehr als fünf Unterrichtsstunden je Woche; ${schultagFrei ? "dieser Tag ist hier schon beschäftigungsfrei" : "dieser Tag ist hier schon als Verstoß gewertet"}. Die Unterrichtszeit einschließlich Pausen und Wegezeiten wird auf die Arbeitszeit angerechnet (§ 9 Abs. 2 Nr. 3), die Grenzen von 8 und 40 Stunden sind dann einzuhalten. Bitte prüfen.`,
          regel: berufsschuleRegel,
        });
      }
    });
  }

  // Ruhezeit zwischen aufeinanderfolgenden Arbeitstagen, auch über freie oder fehlerhafte Zeilen hinweg
  const gueltig = basis.map((b, index) => (b.arbeitsMin !== null ? index : -1)).filter((index) => index >= 0);
  const pruefeRuhe = (von: number, nach: number, abstandTage: number, imFolgewochenfall: boolean) => {
    const morgen = tage[nach]!;
    const ende = basis[von]!.ende!;
    const ruhe = abstandTage * 1440 + morgen.beginnMin! - ende;
    if (abstandTage === 1 && !imFolgewochenfall) auswertung[von]!.ruhezeitNachMin = ruhe;
    if (ruhe >= regeln.ruhezeitMin) return;
    const text = `Zwischen Arbeitsende (${formatUhr(ende)} Uhr) und Beginn ${imFolgewochenfall ? "in der Folgewoche (angenommen: gleiche Lage wie in dieser Woche)" : "am nächsten Arbeitstag"} (${formatUhr(morgen.beginnMin!)} Uhr) liegen nur ${formatDauer(Math.max(ruhe, 0))}, nötig sind mindestens ${formatDauer(regeln.ruhezeitMin)} Ruhezeit.`;
    if (imFolgewochenfall) {
      auswertung[von]!.hinweise.push({ art: "hinweis", text: `${text} Bitte prüfen.`, regel: regeln.paragrafen.ruhezeit });
    } else if (gruppe === "erwachsene" && ruhe >= regeln.ruhezeitMin - 60) {
      auswertung[von]!.hinweise.push({
        art: "hinweis",
        text: `${text} In Krankenhäusern und anderen Einrichtungen zur Behandlung, Pflege und Betreuung, in Gaststätten, Verkehrsbetrieben, beim Rundfunk, in der Landwirtschaft und in der Tierhaltung darf die Ruhezeit um bis zu eine Stunde verkürzt werden, wenn die Verkürzung innerhalb eines Kalendermonats oder von vier Wochen durch eine andere Ruhezeit von mindestens zwölf Stunden ausgeglichen wird (§ 5 Abs. 2). Sonst ist das ein Verstoß. Bitte prüfen.`,
        regel: regeln.paragrafen.ruhezeit,
      });
    } else {
      auswertung[von]!.hinweise.push({
        art: "verstoss",
        text: `${text} (Ausnahmen durch Tarifvertrag oder in einzelnen Bereichen sind hier nicht abgebildet.)`,
        regel: regeln.paragrafen.ruhezeit,
      });
    }
  };
  for (let position = 0; position < gueltig.length - 1; position += 1) {
    pruefeRuhe(gueltig[position]!, gueltig[position + 1]!, gueltig[position + 1]! - gueltig[position]!, false);
  }
  if (optionen.wochenwechsel && gueltig.length > 0) {
    const letzter = gueltig[gueltig.length - 1]!;
    const erster = gueltig[0]!;
    pruefeRuhe(letzter, erster, tage.length - letzter + erster, true);
  }

  const summeMin = auswertung.reduce((summe, tag) => summe + (tag.arbeitsMin ?? 0), 0);
  const arbeitstage = auswertung.filter((tag) => tag.arbeitsMin !== null).length;
  const hinweise: Hinweis[] = [];
  let schultagAnrechnungMin: number | null = null;
  if (regeln.wocheMaxMin !== null && summeMin > regeln.wocheMaxMin) {
    hinweise.push({ art: "verstoss", text: `Die Wochenarbeitszeit von ${formatDauer(summeMin)} im Betrieb liegt über ${formatDauer(regeln.wocheMaxMin)}.`, regel: regeln.paragrafen.woche! });
  }
  if (regeln.maxArbeitstageProWoche !== null && arbeitstage > regeln.maxArbeitstageProWoche) {
    hinweise.push({ art: "verstoss", text: `Jugendliche dürfen höchstens an ${regeln.maxArbeitstageProWoche} Tagen in der Woche beschäftigt werden, eingetragen sind ${arbeitstage}.`, regel: regeln.paragrafen.woche! });
  }
  if (gruppe === "jugendliche" && schultagFrei) {
    // Der beschäftigungsfreie Berufsschultag zählt mit der durchschnittlichen täglichen Arbeitszeit (§ 9 Abs. 2 Nr. 1).
    const normaleTage = auswertung.filter((tag, index) => tag.arbeitsMin !== null && !tage[index]!.berufsschule);
    if (normaleTage.length > 0) schultagAnrechnungMin = Math.round(normaleTage.reduce((summe, tag) => summe + tag.arbeitsMin!, 0) / normaleTage.length);
    const schule = regeln.paragrafen.berufsschule!;
    if (schultagAnrechnungMin === null) {
      hinweise.push({
        art: "hinweis",
        text: "Ein Berufsschultag mit mehr als fünf Unterrichtsstunden wird mit der durchschnittlichen täglichen Arbeitszeit auf die Wochenarbeitszeit angerechnet. Ohne eingetragene Arbeitstage lässt sich das hier nicht berechnen. Bitte prüfen.",
        regel: `${schule} Abs. 2`,
      });
    } else {
      const gesamt = summeMin + schultagAnrechnungMin;
      hinweise.push({
        art: "hinweis",
        text:
          `Ein Berufsschultag mit mehr als fünf Unterrichtsstunden wird mit der durchschnittlichen täglichen Arbeitszeit auf die Wochenarbeitszeit angerechnet (§ 9 Abs. 2 Nr. 1). Geschätzt mit dem Durchschnitt der eingetragenen Arbeitstage (${formatDauer(schultagAnrechnungMin)}) ergeben sich ${formatDauer(gesamt)} in der Woche. ` +
          (gesamt > regeln.wocheMaxMin!
            ? `Das liegt über ${formatDauer(regeln.wocheMaxMin!)}; nach verbreiteter Auslegung zählt die angerechnete Zeit bei der Wochengrenze mit. `
            : "Das liegt innerhalb der Wochengrenze. ") +
          "Bitte prüfen.",
        regel: `${schule} Abs. 2`,
      });
    }
  }
  return { tage: auswertung, summeMin, arbeitstage, schultagAnrechnungMin, hinweise, nichtGeprueft: nichtGeprueftListe(gruppe) };
}
