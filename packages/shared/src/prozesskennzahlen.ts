import { formatDe } from "./game-logic-rechnen";
import { istExaktGerundet } from "./handelskalkulation";
import { formatKurz } from "./skalierung";

/**
 * F-211 (Prozesskennzahlen-Rechner, siehe Architekturplanung Abschnitt 13): Rechenlogik für den Kurs „Fachinformatiker
 * Daten- und Prozessanalyse“ nach den Kurstheorien 8.1 (Kennzahlen: Durchlaufzeit, Bearbeitungs- und Liegezeit,
 * Prozesseffizienz, Fehlerquote, Auslastung, Gesetz von Little), 8.3 (Engpass, Wertschöpfungsanteil) und 8.4
 * (Wirtschaftlichkeit, statische Amortisationsdauer), dazu Übungsaufgaben. Reine Funktionen.
 *
 * Definitionen wie in der Theorie: Durchlaufzeit = Bearbeitungszeit + Liegezeiten; Prozesseffizienz = Bearbeitungszeit ÷
 * Durchlaufzeit; Fehlerquote = fehlerhafte ÷ alle Vorgänge; Erstdurchlaufquote = 1 − Fehlerquote; Auslastung = Aufwand ÷
 * Kapazität; Durchlaufzeit = Bestand ÷ Durchsatz; Amortisationsdauer = Investition ÷ jährlicher Netto-Nutzen.
 */

// ---------------------------------------------------------------------------------------------------------------
// Durchlaufzeit

export interface ProzessSchritt {
  name: string;
  /** Bearbeitungszeit in Minuten. */
  bearbeitung: number;
  /** Liegezeit vor dem Schritt in Minuten. */
  liege: number;
}

export interface Durchlauf {
  bearbeitung: number;
  liege: number;
  durchlaufzeit: number;
  /** Prozesseffizienz (Bearbeitungsanteil) in Prozent. */
  effizienz: number;
  /** Anteil der Liegezeit an der Durchlaufzeit in Prozent. */
  wartezeitAnteil: number;
  /** Index des Schritts mit der größten Liegezeit (größter Hebel); null ohne Liegezeit. */
  groessteLiegezeit: number | null;
}

export function durchlauf(schritte: ProzessSchritt[]): Durchlauf | null {
  const bearbeitung = schritte.reduce((s, x) => s + x.bearbeitung, 0);
  const liege = schritte.reduce((s, x) => s + x.liege, 0);
  const dlz = bearbeitung + liege;
  if (schritte.length === 0 || !(dlz > 0)) return null;
  let index: number | null = null;
  schritte.forEach((schritt, i) => {
    if (schritt.liege > 0 && (index === null || schritt.liege > schritte[index]!.liege)) index = i;
  });
  return { bearbeitung, liege, durchlaufzeit: dlz, effizienz: (bearbeitung / dlz) * 100, wartezeitAnteil: (liege / dlz) * 100, groessteLiegezeit: index };
}

export interface Verbesserung {
  neu: Durchlauf;
  /** Änderung der Durchlaufzeit in Minuten (negativ bei Verkürzung) und in Prozent. */
  aenderung: number;
  aenderungProzent: number;
}

/** Wirkung, wenn die Liegezeit eines Schritts auf einen neuen Wert sinkt (Gedankenexperiment der Theorie: 300 min auf 60 min). */
export function mitNeuerLiegezeit(schritte: ProzessSchritt[], index: number, neueLiege: number): Verbesserung | null {
  const alt = durchlauf(schritte);
  const geaendert = schritte.map((schritt, i) => (i === index ? { ...schritt, liege: neueLiege } : schritt));
  const neu = durchlauf(geaendert);
  if (!alt || !neu || index < 0 || index >= schritte.length) return null;
  return { neu, aenderung: neu.durchlaufzeit - alt.durchlaufzeit, aenderungProzent: ((neu.durchlaufzeit - alt.durchlaufzeit) / alt.durchlaufzeit) * 100 };
}

/** Minuten als Text mit Stunden und Minuten: „605 min (= 10 h 5 min)“. */
export function formatMinuten(minuten: number): string {
  const gerundet = Math.round(minuten);
  if (gerundet < 60) return `${formatKurz(minuten, 2)} min`;
  const h = Math.floor(gerundet / 60);
  const m = gerundet % 60;
  return `${formatKurz(minuten, 2)} min (= ${h} h${m > 0 ? ` ${m} min` : ""})`;
}

/** Wertschöpfungsanteil = wertschöpfende Zeit ÷ Durchlaufzeit in Prozent. */
export function wertschoepfungsanteil(wertschoepfendMin: number, durchlaufzeitMin: number): number | null {
  return durchlaufzeitMin > 0 ? (wertschoepfendMin / durchlaufzeitMin) * 100 : null;
}

// ---------------------------------------------------------------------------------------------------------------
// Engpass

export interface Station {
  name: string;
  /** Kapazität in Vorgängen je Zeiteinheit. */
  kapazitaet: number;
}

export interface EngpassErgebnis {
  /** Indizes der Stationen mit der geringsten Kapazität (bei Gleichstand mehrere). */
  engpass: number[];
  durchsatz: number;
  /** Rückstau je Zeiteinheit bei einem Zugang; 0, wenn der Engpass den Zugang bewältigt. */
  rueckstau: number;
}

export function engpass(stationen: Station[], zugang = 0): EngpassErgebnis | null {
  if (stationen.length === 0 || stationen.some((s) => !(s.kapazitaet > 0))) return null;
  const minimum = Math.min(...stationen.map((s) => s.kapazitaet));
  const indizes = stationen.map((s, i) => (s.kapazitaet === minimum ? i : -1)).filter((i) => i >= 0);
  return { engpass: indizes, durchsatz: minimum, rueckstau: Math.max(0, zugang - minimum) };
}

export interface Erweiterung {
  neu: EngpassErgebnis;
  /** Zuwachs des Durchsatzes in Prozent. */
  steigerungProzent: number;
  /** Der Engpass hat sich verlagert (die erweiterte Station ist nicht mehr allein der Engpass). */
  verlagert: boolean;
}

/** Wirkung, wenn eine Station auf eine neue Kapazität erweitert wird: Der Durchsatz steigt nur bis zum nächsten Engpass. */
export function erweitere(stationen: Station[], index: number, neueKapazitaet: number, zugang = 0): Erweiterung | null {
  const alt = engpass(stationen, zugang);
  const neueListe = stationen.map((s, i) => (i === index ? { ...s, kapazitaet: neueKapazitaet } : s));
  const neu = engpass(neueListe, zugang);
  if (!alt || !neu || index < 0 || index >= stationen.length) return null;
  return { neu, steigerungProzent: ((neu.durchsatz - alt.durchsatz) / alt.durchsatz) * 100, verlagert: !neu.engpass.includes(index) };
}

// ---------------------------------------------------------------------------------------------------------------
// Fehler, Auslastung, Little, Amortisation

export function fehlerquote(fehlerhaft: number, alle: number): { fehlerquote: number; erstdurchlauf: number } | null {
  if (!(alle > 0) || fehlerhaft < 0 || fehlerhaft > alle) return null;
  const q = (fehlerhaft / alle) * 100;
  return { fehlerquote: q, erstdurchlauf: 100 - q };
}

/** Zusätzlicher Aufwand durch Nacharbeit in Minuten. */
export function nacharbeitMinuten(fehlerhaft: number, minutenJeNacharbeit: number): number {
  return fehlerhaft * minutenJeNacharbeit;
}

/** Auslastung = Arbeitsaufwand ÷ verfügbare Kapazität in Prozent. */
export function auslastung(aufwand: number, kapazitaet: number): number | null {
  return kapazitaet > 0 ? (aufwand / kapazitaet) * 100 : null;
}

/** Durchlaufzeit = Bestand ÷ Durchsatz (Gesetz von Little, näherungsweise bei stabilem Betrieb). */
export function little(bestand: number, durchsatz: number): number | null {
  return durchsatz > 0 ? bestand / durchsatz : null;
}

export interface AmortisationEingabe {
  einsparungJeVorgang: number;
  vorgaengeJeJahr: number;
  laufendeKostenJeJahr: number;
  einmaligeKosten: number;
}

export interface Amortisation {
  einsparungJeJahr: number;
  nettoNutzenJeJahr: number;
  /** Amortisationsdauer in Jahren; null, wenn der Netto-Nutzen nicht positiv ist. */
  dauerJahre: number | null;
  dauerMonate: number | null;
}

/** Statische Amortisationsdauer = einmalige Investition ÷ jährlicher Netto-Nutzen (Einsparung abzüglich laufender Mehrkosten). */
export function amortisation(e: AmortisationEingabe): Amortisation {
  const einsparung = e.einsparungJeVorgang * e.vorgaengeJeJahr;
  const netto = einsparung - e.laufendeKostenJeJahr;
  const jahre = netto > 0 ? e.einmaligeKosten / netto : null;
  return { einsparungJeJahr: einsparung, nettoNutzenJeJahr: netto, dauerJahre: jahre, dauerMonate: jahre === null ? null : jahre * 12 };
}

/** Kumulierter Netto-Nutzen nach einer Anzahl Jahre abzüglich der einmaligen Investition. */
export function kumulierterNutzen(e: AmortisationEingabe, jahre: number): number {
  return amortisation(e).nettoNutzenJeJahr * jahre - e.einmaligeKosten;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type ProzessArt = "durchlauf" | "engpass" | "kennzahlen" | "amortisation";
export type ProzessStufe = "leicht" | "mittel" | "schwer";

export interface ProzessFeld {
  id: string;
  label: string;
  einheit: string;
  stellen: number;
  soll: number;
  weg: string;
}

export interface ProzessAufgabe {
  art: ProzessArt;
  stufe: ProzessStufe;
  text: string;
  felder: ProzessFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}
function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
const z = (wert: number, stellen = 0) => formatDe(wert, stellen);
const zk = (wert: number) => formatKurz(wert, 4);

const SCHRITTNAMEN = ["Auftrag erfassen", "Verfügbarkeit prüfen", "Preisfreigabe einholen", "Bestätigung senden", "Lieferfreigabe erteilen", "Rechnung stellen"];

function erzeugeDurchlauf(stufe: ProzessStufe, zufall: () => number): ProzessAufgabe {
  if (stufe === "schwer") {
    const arbeitstage = ganz(2, 4, zufall);
    const dlz = arbeitstage * 480;
    const wert = wahl([40, 60, 80, 90], zufall);
    const uebrige = [wahl([10, 20, 30], zufall), wahl([15, 25, 40], zufall), wahl([5, 10, 15], zufall)];
    const bearbeitung = wert + uebrige.reduce((a, b) => a + b, 0);
    const wa = (wert / dlz) * 100;
    const pe = (bearbeitung / dlz) * 100;
    return {
      art: "durchlauf",
      stufe,
      text: `Ein Monatsbericht hat eine Durchlaufzeit von ${arbeitstage} Arbeitstagen (je 480 Minuten). Die Bearbeitungszeit besteht aus: Daten exportieren ${uebrige[0]} min, bereinigen ${uebrige[1]} min, Analyse erstellen ${wert} min, Versand ${uebrige[2]} min. Aus Kundensicht wertschöpfend ist nur die Analyse. Berechne den Wertschöpfungsanteil und die Prozesseffizienz in Prozent.`,
      felder: [
        { id: "wertanteil", label: "Wertschöpfungsanteil", einheit: "%", stellen: 2, soll: wa, weg: `${z(wert)} min ÷ ${z(dlz)} min × 100 = ${zk(wa)} %` },
        { id: "effizienz", label: "Prozesseffizienz (Bearbeitungsanteil)", einheit: "%", stellen: 1, soll: pe, weg: `Bearbeitungszeit ${z(bearbeitung)} min ÷ ${z(dlz)} min × 100 = ${zk(pe)} %` },
      ],
    };
  }
  const n = stufe === "leicht" ? 4 : 5;
  const schritte: ProzessSchritt[] = SCHRITTNAMEN.slice(0, n).map((name, i) => ({ name, bearbeitung: wahl([5, 8, 10, 12, 15, 20], zufall), liege: i === 0 ? 0 : wahl([30, 60, 90, 105, 120, 240, 300], zufall) }));
  const d = durchlauf(schritte)!;
  const tabelle = schritte.map((s, i) => `${i + 1} ${s.name}: Bearbeitung ${s.bearbeitung} min, Liegezeit davor ${s.liege} min`).join("; ");
  const felder: ProzessFeld[] = [
    { id: "bearbeitung", label: "Summe der Bearbeitungszeit", einheit: "min", stellen: 0, soll: d.bearbeitung, weg: `${schritte.map((s) => s.bearbeitung).join(" + ")} = ${z(d.bearbeitung)} min` },
    { id: "dlz", label: "Durchlaufzeit", einheit: "min", stellen: 0, soll: d.durchlaufzeit, weg: `Bearbeitung ${z(d.bearbeitung)} + Liegezeit ${z(d.liege)} (${schritte.map((s) => s.liege).join(" + ")}) = ${z(d.durchlaufzeit)} min` },
    { id: "effizienz", label: "Prozesseffizienz", einheit: "%", stellen: 1, soll: d.effizienz, weg: `${z(d.bearbeitung)} ÷ ${z(d.durchlaufzeit)} × 100 = ${zk(d.effizienz)} %` },
  ];
  if (stufe === "mittel") {
    const index = d.groessteLiegezeit!;
    const neueLiege = Math.round(schritte[index]!.liege / 5 / 10) * 10 || 10;
    const v = mitNeuerLiegezeit(schritte, index, neueLiege)!;
    felder.push({ id: "wartezeit", label: "Anteil der Liegezeit an der Durchlaufzeit", einheit: "%", stellen: 1, soll: d.wartezeitAnteil, weg: `${z(d.liege)} ÷ ${z(d.durchlaufzeit)} × 100 = ${zk(d.wartezeitAnteil)} %` });
    felder.push({ id: "neudlz", label: `Durchlaufzeit, wenn die größte Liegezeit (${schritte[index]!.liege} min vor „${schritte[index]!.name}“) auf ${neueLiege} min sinkt`, einheit: "min", stellen: 0, soll: v.neu.durchlaufzeit, weg: `${z(d.durchlaufzeit)} − (${schritte[index]!.liege} − ${neueLiege}) = ${z(v.neu.durchlaufzeit)} min` });
    return { art: "durchlauf", stufe, text: `Aufnahme eines Auftragsprozesses: ${tabelle}. Berechne die Summe der Bearbeitungszeit, die Durchlaufzeit, die Prozesseffizienz, den Anteil der Liegezeit und die Durchlaufzeit, wenn die größte Liegezeit auf ${neueLiege} min sinkt.`, felder };
  }
  return { art: "durchlauf", stufe, text: `Aufnahme eines Auftragsprozesses: ${tabelle}. Berechne die Summe der Bearbeitungszeit, die Durchlaufzeit und die Prozesseffizienz.`, felder };
}

function erzeugeEngpass(stufe: ProzessStufe, zufall: () => number): ProzessAufgabe {
  let kapazitaeten: number[];
  do {
    kapazitaeten = Array.from({ length: 4 }, () => ganz(10, 40, zufall));
  } while (new Set(kapazitaeten).size < 4);
  const stationen = kapazitaeten.map((k, i) => ({ name: String.fromCharCode(65 + i), kapazitaet: k }));
  const e = engpass(stationen)!;
  const name = stationen[e.engpass[0]!]!.name;
  const liste = stationen.map((s) => `${s.name} ${s.kapazitaet}`).join(", ");
  const zugang = e.durchsatz + ganz(2, 10, zufall);
  const felder: ProzessFeld[] = [{ id: "durchsatz", label: "Höchster Durchsatz des Gesamtprozesses", einheit: "je Stunde", stellen: 0, soll: e.durchsatz, weg: `Der Engpass ist Station ${name} mit der kleinsten Kapazität: ${e.durchsatz} je Stunde` }];
  if (stufe === "leicht") {
    return { art: "engpass", stufe, text: `Vier Stationen eines Prozesses haben diese Kapazitäten (Vorgänge je Stunde): ${liste}. Wie hoch ist der höchste Durchsatz des Gesamtprozesses?`, felder };
  }
  const rueck = zugang - e.durchsatz;
  felder.push({ id: "rueckstau", label: "Rückstau je Stunde", einheit: "", stellen: 0, soll: rueck, weg: `${zugang} − ${e.durchsatz} = ${rueck} je Stunde` });
  if (stufe === "mittel") {
    felder.push({ id: "schicht", label: "Rückstau in einer 8-Stunden-Schicht", einheit: "", stellen: 0, soll: rueck * 8, weg: `${rueck} × 8 = ${rueck * 8}` });
    return { art: "engpass", stufe, text: `Kapazitäten (Vorgänge je Stunde): ${liste}. Es treffen ${zugang} Vorgänge je Stunde ein. Wie hoch ist der Durchsatz, wie groß der Rückstau je Stunde und in einer 8-Stunden-Schicht?`, felder };
  }
  const ziel = e.durchsatz + ganz(10, 25, zufall);
  const erw = erweitere(stationen, e.engpass[0]!, ziel, zugang)!;
  felder.push({ id: "neu", label: "Neuer Durchsatz nach der Erweiterung", einheit: "je Stunde", stellen: 0, soll: erw.neu.durchsatz, weg: `Nach der Erweiterung von ${name} auf ${ziel} begrenzt die kleinste Kapazität der übrigen Stationen: ${erw.neu.durchsatz} je Stunde` });
  felder.push({ id: "steigerung", label: "Steigerung des Durchsatzes", einheit: "%", stellen: 1, soll: erw.steigerungProzent, weg: `(${erw.neu.durchsatz} − ${e.durchsatz}) ÷ ${e.durchsatz} × 100 = ${zk(erw.steigerungProzent)} %` });
  return {
    art: "engpass",
    stufe,
    text: `Kapazitäten (Vorgänge je Stunde): ${liste}. Es treffen ${zugang} Vorgänge je Stunde ein. Der Engpass ${name} wird auf ${ziel} je Stunde erweitert. Wie hoch war der Durchsatz vorher, wie groß ist der Rückstau je Stunde (vorher), wie hoch ist der Durchsatz nachher, und um wie viel Prozent steigt er? (Der Durchsatz kann nicht über die kleinste Kapazität der übrigen Stationen steigen.)`,
    felder,
  };
}

function erzeugeKennzahlen(stufe: ProzessStufe, zufall: () => number): ProzessAufgabe {
  if (stufe === "leicht") {
    const alle = wahl([400, 500, 800, 1000, 1200], zufall);
    const fehler = Math.round(alle * wahl([0.03, 0.05, 0.07, 0.1], zufall));
    const f = fehlerquote(fehler, alle)!;
    return {
      art: "kennzahlen",
      stufe,
      text: `Von ${z(alle)} Eingangsrechnungen eines Monats sind ${z(fehler)} fehlerhaft. Berechne die Fehlerquote und die Erstdurchlaufquote (jeder Fehler löst Nacharbeit aus) in Prozent.`,
      felder: [
        { id: "fehler", label: "Fehlerquote", einheit: "%", stellen: 1, soll: f.fehlerquote, weg: `${z(fehler)} ÷ ${z(alle)} × 100 = ${zk(f.fehlerquote)} %` },
        { id: "erst", label: "Erstdurchlaufquote", einheit: "%", stellen: 1, soll: f.erstdurchlauf, weg: `100 % − ${zk(f.fehlerquote)} % = ${zk(f.erstdurchlauf)} %` },
      ],
    };
  }
  if (stufe === "mittel") {
    const personen = ganz(2, 5, zufall);
    const minProPerson = wahl([420, 450, 480], zufall);
    const vorgaenge = ganz(80, 200, zufall);
    const minJeVorgang = wahl([5, 6, 7, 8], zufall);
    const kap = personen * minProPerson;
    const aufwand = vorgaenge * minJeVorgang;
    const a = auslastung(aufwand, kap)!;
    return {
      art: "kennzahlen",
      stufe,
      text: `Ein Team aus ${personen} Sachbearbeitenden hat je ${z(minProPerson)} Minuten verfügbare Bearbeitungszeit pro Tag. Es bearbeitet täglich ${z(vorgaenge)} Vorgänge zu je ${z(minJeVorgang)} Minuten. Berechne die verfügbare Kapazität, den Aufwand und die Auslastung in Prozent.`,
      felder: [
        { id: "kap", label: "Verfügbare Kapazität", einheit: "min", stellen: 0, soll: kap, weg: `${personen} × ${z(minProPerson)} = ${z(kap)} min` },
        { id: "aufwand", label: "Arbeitsaufwand", einheit: "min", stellen: 0, soll: aufwand, weg: `${z(vorgaenge)} × ${z(minJeVorgang)} = ${z(aufwand)} min` },
        { id: "auslastung", label: "Auslastung", einheit: "%", stellen: 1, soll: a, weg: `${z(aufwand)} ÷ ${z(kap)} × 100 = ${zk(a)} %` },
      ],
    };
  }
  const durchsatz = wahl([20, 25, 40, 50], zufall);
  const bestand = durchsatz * ganz(2, 5, zufall);
  const dlz = little(bestand, durchsatz)!;
  const zielTage = dlz - 1;
  const zielBestand = zielTage * durchsatz;
  return {
    art: "kennzahlen",
    stufe,
    text: `Im Service-Desk sind im Mittel ${z(bestand)} Tickets offen, und täglich werden ${z(durchsatz)} abgeschlossen (Gesetz von Little). Wie lang ist die mittlere Durchlaufzeit in Tagen, und auf wie viele Tickets müsste der Bestand bei gleichem Durchsatz sinken, damit die Durchlaufzeit einen Tag kürzer ist?`,
    felder: [
      { id: "dlz", label: "Mittlere Durchlaufzeit", einheit: "Tage", stellen: 1, soll: dlz, weg: `${z(bestand)} ÷ ${z(durchsatz)} = ${zk(dlz)} Tage` },
      { id: "bestand", label: "Neuer Bestand", einheit: "Tickets", stellen: 0, soll: zielBestand, weg: `Durchlaufzeit ${zk(zielTage)} Tage × ${z(durchsatz)} je Tag = ${z(zielBestand)} Tickets` },
    ],
  };
}

function erzeugeAmortisation(stufe: ProzessStufe, zufall: () => number): ProzessAufgabe {
  const vorgaenge = wahl([2000, 3000, 4000, 5000, 6000], zufall);
  const alt = wahl([9.5, 10, 11.4, 12], zufall);
  const neu = wahl([4.5, 5, 6.9, 7], zufall);
  const ersparnis = Math.round((alt - neu) * 100) / 100;
  const e0: AmortisationEingabe = { einsparungJeVorgang: ersparnis, vorgaengeJeJahr: vorgaenge, laufendeKostenJeJahr: 0, einmaligeKosten: 0 };
  const einsparung = ersparnis * vorgaenge;
  const kopf = `Die Bearbeitung eines Vorgangs kostet heute ${z(alt, 2)} €, nach der Automatisierung ${z(neu, 2)} €. Es gibt ${z(vorgaenge)} Vorgänge im Jahr.`;
  if (stufe === "leicht") {
    return { art: "amortisation", stufe, text: `${kopf} Wie hoch ist die Einsparung pro Jahr?`, felder: [{ id: "einsparung", label: "Einsparung pro Jahr", einheit: "€", stellen: 2, soll: einsparung, weg: `${z(vorgaenge)} × (${z(alt, 2)} € − ${z(neu, 2)} €) = ${z(vorgaenge)} × ${z(ersparnis, 2)} € = ${z(einsparung, 2)} €` }] };
  }
  // Laufende Kosten immer unter der Einsparung, damit es einen positiven Netto-Nutzen gibt.
  const laufend = wahl([1000, 2000, 3000, 6000].filter((kosten) => kosten < einsparung * 0.8), zufall);
  let einmalig: number;
  if (stufe === "mittel") {
    einmalig = wahl([10000, 20000, 30000, 42000, 50000], zufall);
    const a = amortisation({ ...e0, laufendeKostenJeJahr: laufend, einmaligeKosten: einmalig });
    return {
      art: "amortisation",
      stufe,
      text: `${kopf} Laufende Lizenz- und Wartungskosten: ${z(laufend)} € im Jahr. Einmalige Investition: ${z(einmalig)} €. Wie hoch ist der jährliche Netto-Nutzen, und nach wie vielen Jahren amortisiert sich die Investition (statisch)?`,
      felder: [
        { id: "netto", label: "Netto-Nutzen pro Jahr", einheit: "€", stellen: 2, soll: a.nettoNutzenJeJahr, weg: `${z(einsparung, 2)} € − ${z(laufend)} € = ${z(a.nettoNutzenJeJahr, 2)} €` },
        { id: "dauer", label: "Amortisationsdauer", einheit: "Jahre", stellen: 2, soll: a.dauerJahre!, weg: `${z(einmalig)} € ÷ ${z(a.nettoNutzenJeJahr, 2)} € = ${zk(a.dauerJahre!)} Jahre` },
      ],
    };
  }
  const software = wahl([20000, 24000, 30000], zufall);
  const einfuehrung = wahl([8000, 14000, 16000], zufall);
  const schulung = wahl([2000, 4000, 6000], zufall);
  einmalig = software + einfuehrung + schulung;
  const eg = { ...e0, laufendeKostenJeJahr: laufend, einmaligeKosten: einmalig };
  const a = amortisation(eg);
  const nach3 = kumulierterNutzen(eg, 3);
  return {
    art: "amortisation",
    stufe,
    text: `${kopf} Laufende Kosten: ${z(laufend)} € im Jahr. Einmalige Kosten: Software ${z(software)} €, Einführung ${z(einfuehrung)} €, Schulung ${z(schulung)} €. Berechne die einmalige Investition, die Amortisationsdauer in Monaten und den kumulierten Netto-Nutzen nach drei Jahren abzüglich der Investition.`,
    felder: [
      { id: "invest", label: "Einmalige Investition", einheit: "€", stellen: 0, soll: einmalig, weg: `${z(software)} + ${z(einfuehrung)} + ${z(schulung)} = ${z(einmalig)} €` },
      { id: "monate", label: "Amortisationsdauer", einheit: "Monate", stellen: 1, soll: a.dauerMonate!, weg: `Netto-Nutzen ${z(einsparung, 2)} € − ${z(laufend)} € = ${z(a.nettoNutzenJeJahr, 2)} € je Jahr; ${z(einmalig)} € ÷ ${z(a.nettoNutzenJeJahr, 2)} € = ${zk(a.dauerJahre!)} Jahre = ${zk(a.dauerMonate!)} Monate` },
      { id: "nach3", label: "Kumulierter Nutzen nach drei Jahren abzüglich Investition", einheit: "€", stellen: 2, soll: nach3, weg: `3 × ${z(a.nettoNutzenJeJahr, 2)} € − ${z(einmalig)} € = ${z(nach3, 2)} €` },
    ],
  };
}

export function erzeugeProzessAufgabe(art: ProzessArt, stufe: ProzessStufe, zufall: () => number = Math.random): ProzessAufgabe {
  if (art === "durchlauf") return erzeugeDurchlauf(stufe, zufall);
  if (art === "engpass") return erzeugeEngpass(stufe, zufall);
  if (art === "kennzahlen") return erzeugeKennzahlen(stufe, zufall);
  return erzeugeAmortisation(stufe, zufall);
}

/** Ein Feld gilt nur mit dem exakt auf die verlangte Stellenzahl gerundeten Wert als richtig (Review WRK-04). */
export function pruefeProzessFeld(eingabe: string, feld: ProzessFeld): boolean {
  return istExaktGerundet(eingabe, feld.soll, feld.stellen);
}
