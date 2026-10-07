/**
 * F-205 (Testfall-Trainer, siehe Architekturplanung Abschnitt 13): Äquivalenzklassen und Grenzwerte für ganzzahlige
 * Eingaben nach der Kurstheorie 9.2 des Kurses Anwendungsentwicklung (Black-Box-Test). Zu einer zufälligen
 * Spezifikation (Staffel mit gültigem Bereich und ungültigen Bereichen) berechnet das Werkzeug die Klassen, die
 * Grenzwerte beidseitig und bewertet eine Liste von Testwerten nach Abdeckung. Reine Funktionen ohne Zustand.
 *
 * Alle Eingaben sind ganze Zahlen. Eine Klasse hat entweder eine Grenze oder ist nach unten bzw. oben offen (null).
 */
export type TestStufe = "leicht" | "mittel" | "schwer";

export interface Staffelstufe {
  /** Erster Wert der Stufe. */
  von: number;
  /** Letzter Wert der Stufe; null bei der obersten Stufe ohne Obergrenze. */
  bis: number | null;
  ergebnis: string;
}

export interface Spezifikation {
  /** Kurzer Kontext, zum Beispiel „Rabatt nach Bestellmenge“. */
  titel: string;
  eingabe: string;
  einheit: string;
  ergebnisName: string;
  /** Kleinster gültiger Wert und größter gültiger Wert (null: nach oben offen). */
  min: number;
  max: number | null;
  stufen: Staffelstufe[];
}

export const UNGUELTIG = "Fehlermeldung";

export interface Klasse {
  nr: number;
  /** null: nach unten offen. */
  von: number | null;
  /** null: nach oben offen. */
  bis: number | null;
  gueltig: boolean;
  ergebnis: string;
}

/** Alle Äquivalenzklassen von unten nach oben: ungültig unten, die Stufen, ungültig oben (falls es eine Obergrenze gibt). */
export function klassen(spec: Spezifikation): Klasse[] {
  const liste: Omit<Klasse, "nr">[] = [{ von: null, bis: spec.min - 1, gueltig: false, ergebnis: UNGUELTIG }];
  for (const stufe of spec.stufen) liste.push({ von: stufe.von, bis: stufe.bis, gueltig: true, ergebnis: stufe.ergebnis });
  if (spec.max !== null) liste.push({ von: spec.max + 1, bis: null, gueltig: false, ergebnis: UNGUELTIG });
  return liste.map((klasse, index) => ({ nr: index + 1, ...klasse }));
}

export function klasseVon(spec: Spezifikation, wert: number): Klasse {
  const treffer = klassen(spec).find((klasse) => (klasse.von === null || wert >= klasse.von) && (klasse.bis === null || wert <= klasse.bis));
  return treffer!;
}

/** Erwartetes Ergebnis für einen Eingabewert. */
export function erwartet(spec: Spezifikation, wert: number): string {
  return klasseVon(spec, wert).ergebnis;
}

export interface Grenze {
  unten: Klasse;
  oben: Klasse;
  /** Letzter Wert der unteren und erster Wert der oberen Klasse. */
  werte: [number, number];
}

/** Die Grenzen zwischen benachbarten Klassen. */
export function grenzen(spec: Spezifikation): Grenze[] {
  const alle = klassen(spec);
  const liste: Grenze[] = [];
  for (let i = 0; i < alle.length - 1; i++) {
    const unten = alle[i]!;
    const oben = alle[i + 1]!;
    liste.push({ unten, oben, werte: [unten.bis!, oben.von!] });
  }
  return liste;
}

export function klasseText(klasse: Klasse): string {
  const bereich = klasse.von === null ? `bis ${klasse.bis}` : klasse.bis === null ? `ab ${klasse.von}` : klasse.von === klasse.bis ? `${klasse.von}` : `${klasse.von} bis ${klasse.bis}`;
  return `${bereich} (${klasse.gueltig ? klasse.ergebnis : "ungültig"})`;
}

/** Beschreibung der Spezifikation als Fließtext. */
export function spezText(spec: Spezifikation): string {
  const teile = spec.stufen.map((stufe) => (stufe.bis === null ? `ab ${stufe.von}: ${stufe.ergebnis}` : stufe.von === stufe.bis ? `${stufe.von}: ${stufe.ergebnis}` : `${stufe.von} bis ${stufe.bis}: ${stufe.ergebnis}`));
  const ungueltig = spec.max === null ? `Werte unter ${spec.min} sind ungültig` : `Werte unter ${spec.min} und über ${spec.max} sind ungültig`;
  return `${spec.titel}. Ergebnis ist ${spec.ergebnisName}, abhängig von der Eingabe „${spec.eingabe}“ (ganze Zahl, ${spec.einheit}). ${teile.join(", ")}. ${ungueltig} und lösen eine ${UNGUELTIG} aus.`;
}

// ---------------------------------------------------------------------------------------------------------------
// Bewertung von Testwerten

export interface Abdeckung {
  /** Klassen, in denen mindestens ein Testwert liegt. */
  abgedeckt: number[];
  fehlendeKlassen: Klasse[];
  /** Grenzen, bei denen mindestens einer der beiden Randwerte fehlt, mit den fehlenden Werten. */
  fehlendeGrenzen: { grenze: Grenze; fehlend: number[] }[];
  /** Alle Klassen sind abgedeckt. */
  klassenVollstaendig: boolean;
  /** Alle Grenzen sind beidseitig abgedeckt. */
  grenzenVollstaendig: boolean;
}

export function bewerteTestwerte(spec: Spezifikation, werte: number[]): Abdeckung {
  const menge = new Set(werte);
  const alle = klassen(spec);
  const abgedeckt = alle.filter((klasse) => werte.some((wert) => (klasse.von === null || wert >= klasse.von) && (klasse.bis === null || wert <= klasse.bis))).map((klasse) => klasse.nr);
  const fehlendeKlassen = alle.filter((klasse) => !abgedeckt.includes(klasse.nr));
  const fehlendeGrenzen = grenzen(spec)
    .map((grenze) => ({ grenze, fehlend: grenze.werte.filter((wert) => !menge.has(wert)) }))
    .filter((eintrag) => eintrag.fehlend.length > 0);
  return { abgedeckt, fehlendeKlassen, fehlendeGrenzen, klassenVollstaendig: fehlendeKlassen.length === 0, grenzenVollstaendig: fehlendeGrenzen.length === 0 };
}

/** Liest ganze Zahlen (auch negative), getrennt durch Semikolon, Leerzeichen oder Zeilenumbruch. Kommas und Dezimalzahlen sind ungültig (null); leere Eingabe ergibt eine leere Liste. */
export function leseTestwerte(eingabe: string): number[] | null {
  const teile = eingabe.split(/[;\s]+/).filter((teil) => teil !== "");
  const werte: number[] = [];
  for (const teil of teile) {
    if (!/^-?\d{1,7}$/.test(teil)) return null;
    werte.push(Number(teil));
  }
  return werte;
}

function normiere(text: string): string {
  return text
    .toLowerCase()
    .replace(/euro|prozent|punkte|note|[%€\s.]/g, "")
    .replace(",", ".");
}

/** Vergleicht ein erwartetes Ergebnis tolerant (Leerzeichen, Prozent- und Eurozeichen); bei ungültigen Eingaben genügt „Fehler…“ oder „ungültig“. */
export function istErwartetRichtig(eingabe: string, soll: string): boolean {
  const e = normiere(eingabe);
  if (e === "") return false;
  if (soll === UNGUELTIG) return /^(fehler|ungültig|ungueltig|error)/.test(e);
  return e === normiere(soll);
}

// ---------------------------------------------------------------------------------------------------------------
// Aufgaben

export interface TestAufgabe {
  stufe: TestStufe;
  spec: Spezifikation;
  /** Eingaben, zu denen das erwartete Ergebnis einzutragen ist (leer bei „leicht“). */
  erwartungsEingaben: number[];
}

interface Kontext {
  titel: string;
  eingabe: string;
  einheit: string;
  ergebnisName: string;
  min: number;
  maxOptionen: number[];
  /** Mögliche Ergebnisfolgen für die Stufen von unten nach oben. */
  ergebnisse: string[][];
  /** Zulässige Startwerte der 2., 3. und 4. Stufe (aufsteigend gewählt). */
  schwellen: [number, number][];
}

const KONTEXTE: Kontext[] = [
  {
    titel: "Rabatt nach Bestellmenge",
    eingabe: "Bestellmenge",
    einheit: "Stück",
    ergebnisName: "Rabatt",
    min: 1,
    maxOptionen: [500, 999],
    ergebnisse: [["0 %", "5 %", "10 %", "15 %"], ["0 %", "3 %", "8 %", "12 %"]],
    schwellen: [[10, 20], [25, 60], [75, 150]],
  },
  {
    titel: "Eintrittspreis nach Alter",
    eingabe: "Alter",
    einheit: "Jahre",
    ergebnisName: "Eintrittspreis",
    min: 0,
    maxOptionen: [120, 99],
    ergebnisse: [["frei", "4 €", "9 €", "6 €"], ["frei", "3 €", "8 €", "5 €"]],
    schwellen: [[4, 8], [14, 19], [60, 67]],
  },
  {
    titel: "Versandkosten nach Warenwert",
    eingabe: "Warenwert",
    einheit: "volle Euro",
    ergebnisName: "Versandkostenanteil",
    min: 1,
    maxOptionen: [1000, 2500],
    ergebnisse: [["6 €", "4 €", "2 €", "0 €"], ["7 €", "5 €", "3 €", "0 €"]],
    schwellen: [[20, 35], [50, 80], [100, 150]],
  },
  {
    titel: "Note nach Punktzahl",
    eingabe: "Punktzahl",
    einheit: "Punkte",
    ergebnisName: "Notenstufe",
    min: 0,
    maxOptionen: [100, 120],
    ergebnisse: [["5", "4", "3", "2"], ["Note 5", "Note 4", "Note 3", "Note 2"]],
    schwellen: [[30, 45], [50, 62], [70, 82]],
  },
];

function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}

function mischen<T>(liste: T[], zufall: () => number): T[] {
  const kopie = [...liste];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(zufall() * (i + 1)));
    [kopie[i], kopie[j]] = [kopie[j]!, kopie[i]!];
  }
  return kopie;
}

const STUFEN_JE_NIVEAU: Record<TestStufe, number> = { leicht: 2, mittel: 3, schwer: 4 };

export function erzeugeTestAufgabe(stufe: TestStufe, zufall: () => number = Math.random): TestAufgabe {
  const kontext = KONTEXTE[Math.min(KONTEXTE.length - 1, Math.floor(zufall() * KONTEXTE.length))]!;
  const anzahl = STUFEN_JE_NIVEAU[stufe];
  const ergebnisse = kontext.ergebnisse[Math.min(kontext.ergebnisse.length - 1, Math.floor(zufall() * kontext.ergebnisse.length))]!.slice(0, anzahl);
  // Startwerte der Stufen 2 bis n, aufsteigend und mit Abstand.
  const starts: number[] = [];
  for (let i = 0; i < anzahl - 1; i++) {
    const [lo, hi] = kontext.schwellen[i]!;
    starts.push(ganz(lo, hi, zufall));
  }
  const max = stufe === "schwer" || (stufe === "mittel" && zufall() < 0.5) ? kontext.maxOptionen[Math.min(kontext.maxOptionen.length - 1, Math.floor(zufall() * kontext.maxOptionen.length))]! : null;
  const stufen: Staffelstufe[] = [];
  const grenzenStart = [kontext.min, ...starts];
  for (let i = 0; i < anzahl; i++) {
    const von = grenzenStart[i]!;
    const bis = i + 1 < anzahl ? grenzenStart[i + 1]! - 1 : max;
    stufen.push({ von, bis, ergebnis: ergebnisse[i]! });
  }
  const spec: Spezifikation = { titel: kontext.titel, eingabe: kontext.eingabe, einheit: kontext.einheit, ergebnisName: kontext.ergebnisName, min: kontext.min, max, stufen };
  let erwartungsEingaben: number[] = [];
  if (stufe !== "leicht") {
    const kandidaten = grenzen(spec).flatMap((grenze) => grenze.werte);
    erwartungsEingaben = mischen(kandidaten, zufall)
      .slice(0, stufe === "mittel" ? 4 : 6)
      .sort((a, b) => a - b);
  }
  return { stufe, spec, erwartungsEingaben };
}

/** Die Muster-Testfälle: alle Grenzwerte beidseitig und ein Repräsentant je offener Randklasse, aufsteigend. */
export function musterTestwerte(spec: Spezifikation): number[] {
  const werte = new Set<number>(grenzen(spec).flatMap((grenze) => grenze.werte));
  const alle = klassen(spec);
  // Klassen, die schon durch einen Grenzwert abgedeckt sind, brauchen keinen weiteren Repräsentanten.
  const untere = alle[0]!;
  if (untere.bis !== null) werte.add(untere.bis - 5);
  const letzte = alle[alle.length - 1]!;
  if (letzte.von !== null) werte.add(letzte.von + 5);
  return [...werte].sort((a, b) => a - b);
}
