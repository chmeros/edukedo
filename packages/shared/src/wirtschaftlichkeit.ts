import { formatDe } from "./game-logic-rechnen";
import { leseBetrag } from "./handelskalkulation";
import type { ProzessFeld } from "./prozesskennzahlen";
import { formatKurz } from "./skalierung";

/**
 * F-213 (Nutzwert- und Wirtschaftlichkeitsrechner, siehe Architekturplanung Abschnitt 13): Rechenlogik für die
 * Fachinformatiker-Kurse nach der gemeinsamen Kurstheorie 2.3 (Angebotsvergleich, TCO, Kauf gegen Abonnement, Nutzwertanalyse
 * mit KO-Kriterien und Sensitivität) und der Make-or-Buy-Betrachtung in 12.2 (Anwendungsentwicklung). Reine Funktionen.
 *
 * Definitionen wie in der Theorie: Teilnutzwert = Gewicht × Punkte, Nutzwert = Summe der Teilnutzwerte (Gewichte zusammen 100 %);
 * TCO = Anschaffung + jährliche Betriebskosten × Jahre + Aussonderung − Restwert. Der Anschaffungspreis ergibt sich aus dem
 * Listenpreis nach Rabatt und danach Skonto. Das Werkzeug wertet nicht und empfiehlt nichts; Gewichtung und Punkte sind Wertungen.
 */

// ---------------------------------------------------------------------------------------------------------------
// Nutzwertanalyse

export interface NwKriterium {
  name: string;
  /** Gewicht in Prozent. */
  gewicht: number;
}

export interface NwAlternative {
  name: string;
  /** Punkte je Kriterium, in der Reihenfolge der Kriterien. */
  punkte: number[];
  /** Ein KO-Kriterium ist nicht erfüllt: Die Alternative scheidet aus und wird nicht gerechnet. */
  ko?: boolean;
}

export interface NwZeile {
  name: string;
  ko: boolean;
  /** Teilnutzwerte (Gewicht × Punkte ÷ 100) je Kriterium. */
  teil: number[];
  nutzwert: number;
  /** 1 für den höchsten Nutzwert; gleiche Nutzwerte teilen sich den Rang; `null` bei KO. */
  rang: number | null;
}

export interface NwErgebnis {
  gewichtssumme: number;
  zeilen: NwZeile[];
  /** Indizes der Alternativen mit Rang 1 (bei Gleichstand mehrere). */
  sieger: number[];
}

const EPS = 1e-9;

export function nutzwertanalyse(kriterien: NwKriterium[], alternativen: NwAlternative[]): NwErgebnis | null {
  if (kriterien.length === 0 || alternativen.length === 0) return null;
  if (alternativen.some((a) => a.punkte.length !== kriterien.length)) return null;
  const gewichtssumme = kriterien.reduce((summe, k) => summe + k.gewicht, 0);
  const zeilen: NwZeile[] = alternativen.map((a) => {
    const teil = kriterien.map((k, i) => (k.gewicht * a.punkte[i]!) / 100);
    return { name: a.name, ko: a.ko === true, teil, nutzwert: teil.reduce((s, t) => s + t, 0), rang: null };
  });
  for (const zeile of zeilen) {
    if (zeile.ko) continue;
    zeile.rang = 1 + zeilen.filter((andere) => !andere.ko && andere.nutzwert > zeile.nutzwert + EPS).length;
  }
  const sieger = zeilen.flatMap((zeile, index) => (zeile.rang === 1 ? [index] : []));
  return { gewichtssumme, zeilen, sieger };
}

/** Rechnet die Gewichte proportional auf zusammen 100 % um; `null`, wenn die Summe nicht positiv ist. */
export function normalisiereGewichte(kriterien: NwKriterium[]): NwKriterium[] | null {
  const summe = kriterien.reduce((s, k) => s + k.gewicht, 0);
  if (!(summe > 0)) return null;
  return kriterien.map((k) => ({ ...k, gewicht: (k.gewicht * 100) / summe }));
}

export interface SensitivitaetSegment {
  /** Gewicht des untersuchten Kriteriums in Prozent, von … bis … (ganze Prozentpunkte, einschließlich). */
  von: number;
  bis: number;
  sieger: number[];
}

export interface Sensitivitaet {
  segmente: SensitivitaetSegment[];
  /** Aktuelles (auf 100 % umgerechnetes) Gewicht des Kriteriums. */
  aktuell: number;
  /** Um wie viele Prozentpunkte das Gewicht sinken bzw. steigen kann, bis die Rangfolge an der Spitze wechselt; `null`, wenn es keinen Wechsel gibt. */
  nachUnten: number | null;
  nachOben: number | null;
}

/**
 * Sensitivität (Theorie 2.3): Das Gewicht eines Kriteriums wird von 0 bis 100 Prozent durchgespielt; die übrigen Gewichte werden
 * im bisherigen Verhältnis auf den Rest verteilt. Gezeigt wird, welche Alternative bei welchem Gewicht vorn liegt.
 */
export function sensitivitaet(kriterien: NwKriterium[], alternativen: NwAlternative[], index: number): Sensitivitaet | null {
  const normal = normalisiereGewichte(kriterien);
  if (!normal || index < 0 || index >= normal.length) return null;
  const aktiv = alternativen.map((a, i) => ({ a, i })).filter(({ a }) => !a.ko && a.punkte.length === normal.length);
  if (aktiv.length === 0) return null;
  const rest = 100 - normal[index]!.gewicht;
  if (!(rest > EPS)) return null;
  const nutzwertBei = (a: NwAlternative, w: number): number => {
    let andere = 0;
    normal.forEach((k, i) => {
      if (i !== index) andere += k.gewicht * a.punkte[i]!;
    });
    return (w * a.punkte[index]! + ((100 - w) / rest) * andere) / 100;
  };
  const segmente: SensitivitaetSegment[] = [];
  for (let w = 0; w <= 100; w++) {
    const werte = aktiv.map(({ a, i }) => ({ i, n: nutzwertBei(a, w) }));
    const hoechst = Math.max(...werte.map((x) => x.n));
    const sieger = werte.filter((x) => x.n >= hoechst - EPS).map((x) => x.i);
    const letzte = segmente[segmente.length - 1];
    if (letzte && letzte.sieger.length === sieger.length && letzte.sieger.every((s, k) => s === sieger[k])) letzte.bis = w;
    else segmente.push({ von: w, bis: w, sieger });
  }
  const aktuell = normal[index]!.gewicht;
  const stelle = Math.min(100, Math.max(0, Math.round(aktuell)));
  const segment = segmente.find((s) => s.von <= stelle && stelle <= s.bis)!;
  return { segmente, aktuell, nachUnten: segment.von > 0 ? aktuell - segment.von : null, nachOben: segment.bis < 100 ? segment.bis - aktuell : null };
}

// ---------------------------------------------------------------------------------------------------------------
// Gesamtkosten (TCO)

export interface TcoAngebot {
  name: string;
  /** Preis laut Angebot (netto, einmalig). */
  listenpreis: number;
  /** Rabatt in Prozent auf den Listenpreis. */
  rabatt: number;
  /** Skonto in Prozent auf den Preis nach Rabatt. */
  skonto: number;
  betriebJeJahr: number;
  aussonderung: number;
  restwert: number;
}

export interface TcoErgebnis {
  name: string;
  anschaffung: number;
  betrieb: number;
  aussonderung: number;
  restwert: number;
  tco: number;
  tcoJeJahr: number;
  /** Rang 1 für die niedrigsten Gesamtkosten; gleiche Kosten teilen sich den Rang. */
  rang: number;
  /** Mehrkosten gegenüber dem günstigsten Angebot (0 beim günstigsten). */
  mehrkosten: number;
}

/** Anschaffungspreis nach Rabatt und danach Skonto. */
export function anschaffungspreis(listenpreis: number, rabatt = 0, skonto = 0): number {
  return listenpreis * (1 - rabatt / 100) * (1 - skonto / 100);
}

export function tco(angebot: TcoAngebot, jahre: number): Omit<TcoErgebnis, "rang" | "mehrkosten"> {
  const anschaffung = anschaffungspreis(angebot.listenpreis, angebot.rabatt, angebot.skonto);
  const betrieb = angebot.betriebJeJahr * jahre;
  const gesamt = anschaffung + betrieb + angebot.aussonderung - angebot.restwert;
  return { name: angebot.name, anschaffung, betrieb, aussonderung: angebot.aussonderung, restwert: angebot.restwert, tco: gesamt, tcoJeJahr: jahre > 0 ? gesamt / jahre : gesamt };
}

export function tcoVergleich(angebote: TcoAngebot[], jahre: number): TcoErgebnis[] | null {
  if (angebote.length === 0 || !(jahre > 0)) return null;
  const rohe = angebote.map((a) => tco(a, jahre));
  const niedrigste = Math.min(...rohe.map((r) => r.tco));
  return rohe.map((r) => ({ ...r, rang: 1 + rohe.filter((andere) => andere.tco < r.tco - EPS).length, mehrkosten: r.tco - niedrigste }));
}

export interface Gleichstand {
  /** Nach so vielen Jahren sind die laufenden Gesamtkosten beider Angebote gleich hoch. */
  jahre: number;
  /** Index (0 oder 1) des Angebots, das nach dem Gleichstand günstiger ist. */
  danachGuenstiger: 0 | 1;
}

/**
 * Zeitpunkt, ab dem das Angebot mit dem höheren Anschaffungspreis, aber niedrigeren laufenden Kosten günstiger ist (Anschaffung plus
 * Betrieb, ohne Aussonderung und Restwert). `null`, wenn es keinen Gleichstand gibt (ein Angebot ist in beiden Punkten günstiger oder gleich).
 */
export function gleichstand(a: TcoAngebot, b: TcoAngebot): Gleichstand | null {
  const anschaffungA = anschaffungspreis(a.listenpreis, a.rabatt, a.skonto);
  const anschaffungB = anschaffungspreis(b.listenpreis, b.rabatt, b.skonto);
  const betriebsDifferenz = a.betriebJeJahr - b.betriebJeJahr;
  if (Math.abs(betriebsDifferenz) < EPS) return null;
  const jahre = (anschaffungB - anschaffungA) / betriebsDifferenz;
  if (!(jahre > 0) || !Number.isFinite(jahre)) return null;
  // Nach dem Gleichstand ist das Angebot mit den niedrigeren laufenden Kosten günstiger.
  return { jahre, danachGuenstiger: betriebsDifferenz > 0 ? 1 : 0 };
}

/** Laufende Gesamtkosten (Anschaffung plus Betrieb) nach j Jahren, j = 0 … jahre. */
export function kostenverlauf(angebot: TcoAngebot, jahre: number): number[] {
  const anschaffung = anschaffungspreis(angebot.listenpreis, angebot.rabatt, angebot.skonto);
  return Array.from({ length: Math.max(0, Math.floor(jahre)) + 1 }, (_, j) => anschaffung + angebot.betriebJeJahr * j);
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type WirtschaftArt = "nutzwert" | "tco" | "kaufabo";
export type WirtschaftStufe = "leicht" | "mittel" | "schwer";

export interface WirtschaftAufgabe {
  art: WirtschaftArt;
  stufe: WirtschaftStufe;
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
const euro = (wert: number) => `${formatDe(wert, Math.abs(wert - Math.round(wert)) < 1e-9 ? 0 : 2)} €`;
const zk = (wert: number) => formatKurz(wert, 4);
const BUCHSTABEN = ["A", "B", "C"];

const GEWICHTSSAETZE: number[][] = [
  [50, 30, 20],
  [40, 40, 20],
  [60, 30, 10],
  [50, 25, 25],
  [40, 35, 25],
];
const GEWICHTSSAETZE_VIER: number[][] = [
  [40, 30, 20, 10],
  [30, 30, 25, 15],
  [40, 25, 20, 15],
  [35, 30, 20, 15],
];
const KRITERIEN = ["Leistung", "Preis bzw. TCO", "Service", "Nachhaltigkeit", "Bedienkomfort", "Erweiterbarkeit"];

function punktzeile(anzahl: number, zufall: () => number): number[] {
  return Array.from({ length: anzahl }, () => ganz(1, 5, zufall));
}

function nwTabellenText(namen: string[], gewichte: number[], punkte: number[][]): string {
  const kriterien = namen.map((n, i) => `${n} ${gewichte[i]} %`).join(", ");
  const angebote = punkte.map((p, i) => `Angebot ${BUCHSTABEN[i]}: ${p.join(", ")}`).join("; ");
  return `Kriterien und Gewichte: ${kriterien}. Punkte (1 bis 5, in derselben Reihenfolge der Kriterien): ${angebote}.`;
}

function nwWeg(gewichte: number[], p: number[]): string {
  const teile = gewichte.map((g, i) => `${zk(g / 100)} × ${p[i]}`).join(" + ");
  const werte = gewichte.map((g, i) => zk((g * p[i]!) / 100)).join(" + ");
  const summe = gewichte.reduce((s, g, i) => s + g * p[i]!, 0) / 100;
  return `${teile} = ${werte} = ${zk(summe)}`;
}

function erzeugeNutzwert(stufe: WirtschaftStufe, zufall: () => number): WirtschaftAufgabe {
  for (let versuch = 0; versuch < 500; versuch++) {
    if (stufe === "leicht" || stufe === "mittel") {
      const vier = stufe === "mittel";
      const gewichte = wahl(vier ? GEWICHTSSAETZE_VIER : GEWICHTSSAETZE, zufall);
      const anzahlAlt = vier ? 3 : 2;
      const namen = KRITERIEN.slice(0, gewichte.length);
      const punkte = Array.from({ length: anzahlAlt }, () => punktzeile(gewichte.length, zufall));
      const ergebnis = nutzwertanalyse(
        gewichte.map((gewicht, i) => ({ name: namen[i]!, gewicht })),
        punkte.map((p, i) => ({ name: BUCHSTABEN[i]!, punkte: p })),
      )!;
      if (ergebnis.sieger.length !== 1) continue;
      return {
        art: "nutzwert",
        stufe,
        text: `Eine Nutzwertanalyse vergleicht ${anzahlAlt} Angebote. ${nwTabellenText(namen, gewichte, punkte)} Berechne die Nutzwerte und bestimme das Angebot mit dem höchsten Nutzwert (1 = A, 2 = B, 3 = C).`,
        felder: [
          ...ergebnis.zeilen.map((zeile, i) => ({ id: `nw${i}`, label: `Nutzwert Angebot ${BUCHSTABEN[i]}`, einheit: "Punkte", stellen: 2, soll: zeile.nutzwert, weg: nwWeg(gewichte, punkte[i]!) })),
          { id: "sieger", label: "Angebot mit dem höchsten Nutzwert", einheit: "", stellen: 0, soll: ergebnis.sieger[0]! + 1, weg: `Die Nutzwerte ${ergebnis.zeilen.map((zeile) => zk(zeile.nutzwert)).join(", ")}: das höchste hat Angebot ${BUCHSTABEN[ergebnis.sieger[0]!]}.` },
        ],
      };
    }
    // schwer: ein Gewicht fehlt, danach Sensitivität (ein Gewicht steigt, die übrigen werden anteilig kleiner)
    const gewichte = wahl([[50, 30, 20], [20, 50, 30], [50, 20, 30], [20, 30, 50]], zufall);
    const index = 0;
    const neuesGewicht = gewichte[0] === 50 ? 70 : 60;
    const namen = KRITERIEN.slice(0, 3);
    const punkte = [punktzeile(3, zufall), punktzeile(3, zufall)];
    const alt = nutzwertanalyse(gewichte.map((gewicht, i) => ({ name: namen[i]!, gewicht })), punkte.map((p, i) => ({ name: BUCHSTABEN[i]!, punkte: p })))!;
    const rest = 100 - gewichte[0]!;
    const neu = gewichte.map((g, i) => (i === index ? neuesGewicht : (g * (100 - neuesGewicht)) / rest));
    const neuErgebnis = nutzwertanalyse(neu.map((gewicht, i) => ({ name: namen[i]!, gewicht })), punkte.map((p, i) => ({ name: BUCHSTABEN[i]!, punkte: p })))!;
    if (alt.sieger.length !== 1 || neuErgebnis.sieger.length !== 1) continue;
    const wechsel = alt.sieger[0] !== neuErgebnis.sieger[0];
    const faktor = (100 - neuesGewicht) / rest;
    return {
      art: "nutzwert",
      stufe,
      text: `Nutzwertanalyse mit drei Kriterien: ${namen[0]} ${gewichte[0]} %, ${namen[1]} ${gewichte[1]} %, ${namen[2]} (Gewicht noch offen; die Gewichte ergeben zusammen 100 %). Punkte (1 bis 5): Angebot A: ${punkte[0]!.join(", ")}; Angebot B: ${punkte[1]!.join(", ")}. Bestimme das fehlende Gewicht. Prüfe dann die Sensitivität: ${namen[0]} soll auf ${neuesGewicht} % steigen, die beiden anderen Gewichte werden im bisherigen Verhältnis kleiner, sodass die Summe 100 % bleibt. Berechne die neuen Nutzwerte und gib an, ob sich der Sieger ändert (1 = ja, 0 = nein).`,
      felder: [
        { id: "fehlend", label: `Gewicht ${namen[2]}`, einheit: "%", stellen: 0, soll: gewichte[2]!, weg: `100 % − ${gewichte[0]} % − ${gewichte[1]} % = ${gewichte[2]} %` },
        ...neuErgebnis.zeilen.map((zeile, i) => ({
          id: `neu${i}`,
          label: `Neuer Nutzwert Angebot ${BUCHSTABEN[i]}`,
          einheit: "Punkte",
          stellen: 2,
          soll: zeile.nutzwert,
          weg: `Neue Gewichte: ${neu.map((g) => `${zk(g)} %`).join(", ")} (die beiden übrigen mal ${zk(faktor)}). ${nwWeg(neu, punkte[i]!)}`,
        })),
        { id: "wechsel", label: "Ändert sich der Sieger? (1 = ja, 0 = nein)", einheit: "", stellen: 0, soll: wechsel ? 1 : 0, weg: `Vorher gewinnt Angebot ${BUCHSTABEN[alt.sieger[0]!]} (${alt.zeilen.map((zeile) => zk(zeile.nutzwert)).join(" zu ")}), nachher Angebot ${BUCHSTABEN[neuErgebnis.sieger[0]!]} (${neuErgebnis.zeilen.map((zeile) => zk(zeile.nutzwert)).join(" zu ")}).` },
      ],
    };
  }
  throw new Error("Keine passende Nutzwert-Aufgabe gefunden");
}

function erzeugeTco(stufe: WirtschaftStufe, zufall: () => number): WirtschaftAufgabe {
  for (let versuch = 0; versuch < 500; versuch++) {
    const jahre = stufe === "leicht" ? ganz(3, 5, zufall) : ganz(3, 6, zufall);
    const preisA = ganz(6, 14, zufall) * 100;
    const preisB = preisA + ganz(2, 6, zufall) * 100;
    const betriebA = ganz(8, 20, zufall) * 10;
    const betriebB = betriebA - ganz(2, 6, zufall) * 10;
    if (betriebB <= 0) continue;
    if (stufe === "leicht") {
      const a: TcoAngebot = { name: "A", listenpreis: preisA, rabatt: 0, skonto: 0, betriebJeJahr: betriebA, aussonderung: 0, restwert: 0 };
      const b: TcoAngebot = { name: "B", listenpreis: preisB, rabatt: 0, skonto: 0, betriebJeJahr: betriebB, aussonderung: 0, restwert: 0 };
      const ergebnis = tcoVergleich([a, b], jahre)!;
      if (ergebnis[0]!.tco === ergebnis[1]!.tco) continue;
      return {
        art: "tco",
        stufe,
        text: `Notebook A kostet ${euro(preisA)} und verursacht jährlich ${euro(betriebA)} für Support, Reparaturen und Strom. Notebook B kostet ${euro(preisB)} bei jährlich ${euro(betriebB)}. Die Geräte werden ${jahre} Jahre genutzt, Aussonderung und Restwert werden vernachlässigt. Berechne die TCO beider Geräte und die Differenz (Betrag).`,
        felder: [
          { id: "tcoA", label: "TCO Notebook A", einheit: "€", stellen: 2, soll: ergebnis[0]!.tco, weg: `${z(preisA)} € + ${jahre} × ${z(betriebA)} € = ${z(ergebnis[0]!.tco)} €` },
          { id: "tcoB", label: "TCO Notebook B", einheit: "€", stellen: 2, soll: ergebnis[1]!.tco, weg: `${z(preisB)} € + ${jahre} × ${z(betriebB)} € = ${z(ergebnis[1]!.tco)} €` },
          { id: "diff", label: "Differenz der TCO (Betrag)", einheit: "€", stellen: 2, soll: Math.abs(ergebnis[0]!.tco - ergebnis[1]!.tco), weg: `|${z(ergebnis[0]!.tco)} € − ${z(ergebnis[1]!.tco)} €| = ${z(Math.abs(ergebnis[0]!.tco - ergebnis[1]!.tco))} €` },
        ],
      };
    }
    if (stufe === "mittel") {
      const ausA = wahl([0, 20, 40], zufall);
      const ausB = wahl([20, 30, 50], zufall);
      const restA = wahl([0, 50, 100], zufall);
      const restB = wahl([50, 100, 150], zufall);
      const a: TcoAngebot = { name: "A", listenpreis: preisA, rabatt: 0, skonto: 0, betriebJeJahr: betriebA, aussonderung: ausA, restwert: restA };
      const b: TcoAngebot = { name: "B", listenpreis: preisB, rabatt: 0, skonto: 0, betriebJeJahr: betriebB, aussonderung: ausB, restwert: restB };
      const e = tcoVergleich([a, b], jahre)!;
      if (e[0]!.tco === e[1]!.tco) continue;
      const weg = (x: TcoAngebot, r: (typeof e)[number]) => `${z(x.listenpreis)} € + ${jahre} × ${z(x.betriebJeJahr)} € + ${z(x.aussonderung)} € − ${z(x.restwert)} € = ${z(r.tco)} €`;
      return {
        art: "tco",
        stufe,
        text: `Zwei Server werden über ${jahre} Jahre verglichen. Server A: Anschaffung ${euro(preisA)}, jährlich ${euro(betriebA)} Betrieb, Aussonderung ${euro(ausA)}, Restwert ${euro(restA)}. Server B: Anschaffung ${euro(preisB)}, jährlich ${euro(betriebB)}, Aussonderung ${euro(ausB)}, Restwert ${euro(restB)}. Berechne die TCO beider Server und die TCO je Jahr des günstigeren.`,
        felder: [
          { id: "tcoA", label: "TCO Server A", einheit: "€", stellen: 2, soll: e[0]!.tco, weg: weg(a, e[0]!) },
          { id: "tcoB", label: "TCO Server B", einheit: "€", stellen: 2, soll: e[1]!.tco, weg: weg(b, e[1]!) },
          { id: "jahr", label: "TCO je Jahr des günstigeren Servers", einheit: "€", stellen: 2, soll: Math.min(e[0]!.tco, e[1]!.tco) / jahre, weg: `${z(Math.min(e[0]!.tco, e[1]!.tco))} € ÷ ${jahre} Jahre = ${z(Math.min(e[0]!.tco, e[1]!.tco) / jahre, 2)} €` },
        ],
      };
    }
    // schwer: Rabatt und Skonto, Gleichstand
    const rabattA = wahl([0, 5, 10], zufall);
    const rabattB = wahl([10, 15, 20], zufall);
    const skontoA = 0;
    const skontoB = wahl([2, 3], zufall);
    const a: TcoAngebot = { name: "A", listenpreis: preisA * 3, rabatt: rabattA, skonto: skontoA, betriebJeJahr: betriebA * 3, aussonderung: 0, restwert: 0 };
    const b: TcoAngebot = { name: "B", listenpreis: preisB * 3, rabatt: rabattB, skonto: skontoB, betriebJeJahr: betriebB * 3, aussonderung: 0, restwert: 0 };
    const g = gleichstand(a, b);
    if (!g || g.jahre < 1 || g.jahre > 12) continue;
    const e = tcoVergleich([a, b], jahre)!;
    if (e[0]!.tco === e[1]!.tco) continue;
    const anschA = e[0]!.anschaffung;
    const anschB = e[1]!.anschaffung;
    return {
      art: "tco",
      stufe,
      text: `Für ein Rechenzentrumsprojekt liegen zwei Angebote vor. Angebot A: Listenpreis ${euro(a.listenpreis)}, Rabatt ${rabattA} %, kein Skonto, Betriebskosten ${euro(a.betriebJeJahr)} pro Jahr. Angebot B: Listenpreis ${euro(b.listenpreis)}, Rabatt ${rabattB} %, danach ${skontoB} % Skonto, Betriebskosten ${euro(b.betriebJeJahr)} pro Jahr. Nutzungsdauer ${jahre} Jahre, Aussonderung und Restwert entfallen. Der Anschaffungspreis ist der Listenpreis nach Rabatt und danach nach Skonto. Berechne die beiden Anschaffungspreise und die TCO beider Angebote sowie nach wie vielen Jahren die Gesamtkosten (Anschaffung plus Betrieb) beider Angebote gleich hoch sind.`,
      felder: [
        { id: "anschA", label: "Anschaffungspreis Angebot A", einheit: "€", stellen: 2, soll: anschA, weg: `${z(a.listenpreis)} € × ${zk(1 - rabattA / 100)} = ${z(anschA, 2)} €` },
        { id: "anschB", label: "Anschaffungspreis Angebot B", einheit: "€", stellen: 2, soll: anschB, weg: `${z(b.listenpreis)} € × ${zk(1 - rabattB / 100)} × ${zk(1 - skontoB / 100)} = ${z(anschB, 2)} €` },
        { id: "tcoA", label: "TCO Angebot A", einheit: "€", stellen: 2, soll: e[0]!.tco, weg: `${z(anschA, 2)} € + ${jahre} × ${z(a.betriebJeJahr)} € = ${z(e[0]!.tco, 2)} €` },
        { id: "tcoB", label: "TCO Angebot B", einheit: "€", stellen: 2, soll: e[1]!.tco, weg: `${z(anschB, 2)} € + ${jahre} × ${z(b.betriebJeJahr)} € = ${z(e[1]!.tco, 2)} €` },
        { id: "gleich", label: "Gleichstand der Gesamtkosten nach", einheit: "Jahren", stellen: 2, soll: g.jahre, weg: `Anschaffungsunterschied ${z(Math.abs(anschB - anschA), 2)} € ÷ Unterschied der Betriebskosten ${z(Math.abs(a.betriebJeJahr - b.betriebJeJahr))} € pro Jahr = ${z(g.jahre, 2)} Jahre` },
      ],
    };
  }
  throw new Error("Keine passende TCO-Aufgabe gefunden");
}

function erzeugeKaufAbo(stufe: WirtschaftStufe, zufall: () => number): WirtschaftAufgabe {
  for (let versuch = 0; versuch < 500; versuch++) {
    const kauf = ganz(15, 60, zufall) * 100;
    const laufend = ganz(2, 8, zufall) * 100;
    const monat = ganz(2, 9, zufall) * 50;
    const einrichtung = stufe === "schwer" ? ganz(1, 4, zufall) * 100 : 0;
    const jahre = ganz(3, 8, zufall);
    const aboJahr = monat * 12;
    if (aboJahr <= laufend) continue;
    const t = (kauf - einrichtung) / (aboJahr - laufend);
    if (t < 1 || t > 12 || Math.abs(t - jahre) < 0.3) continue;
    const kostenKauf = kauf + laufend * jahre;
    const kostenAbo = einrichtung + aboJahr * jahre;
    const guenstiger = kostenKauf < kostenAbo ? 1 : 2;
    const einr = einrichtung > 0 ? `, einmalig ${euro(einrichtung)} Einrichtung` : "";
    const felder: ProzessFeld[] = [
      { id: "kauf", label: `Gesamtkosten Kauf nach ${jahre} Jahren`, einheit: "€", stellen: 2, soll: kostenKauf, weg: `${z(kauf)} € + ${jahre} × ${z(laufend)} € = ${z(kostenKauf)} €` },
      { id: "abo", label: `Gesamtkosten Abonnement nach ${jahre} Jahren`, einheit: "€", stellen: 2, soll: kostenAbo, weg: `${einrichtung > 0 ? `${z(einrichtung)} € + ` : ""}${jahre} × 12 × ${z(monat)} € = ${z(kostenAbo)} €` },
    ];
    if (stufe !== "leicht") {
      felder.push({ id: "guenstiger", label: `Günstigere Variante nach ${jahre} Jahren (1 = Kauf, 2 = Abonnement)`, einheit: "", stellen: 0, soll: guenstiger, weg: `${z(kostenKauf)} € (Kauf) gegen ${z(kostenAbo)} € (Abonnement): ${guenstiger === 1 ? "der Kauf" : "das Abonnement"} ist günstiger.` });
      felder.push({ id: "gleich", label: "Gleichstand der Gesamtkosten nach", einheit: "Jahren", stellen: 2, soll: t, weg: `(${z(kauf)} €${einrichtung > 0 ? ` − ${z(einrichtung)} €` : ""}) ÷ (${z(aboJahr)} € − ${z(laufend)} €) = ${z(t, 2)} Jahre` });
    }
    return {
      art: "kaufabo",
      stufe,
      text: `Eine Software kann gekauft oder abonniert werden. Kauf: ${euro(kauf)} einmalig, danach ${euro(laufend)} Wartung pro Jahr. Abonnement: ${euro(monat)} pro Monat${einr}. Betrachtet werden ${jahre} Jahre; Aussonderung und Restwert entfallen.${stufe === "leicht" ? " Berechne die Gesamtkosten beider Varianten." : " Berechne die Gesamtkosten beider Varianten, nenne die günstigere und bestimme, nach wie vielen Jahren die Gesamtkosten beider Varianten gleich hoch sind."}`,
      felder,
    };
  }
  throw new Error("Keine passende Kauf-Abo-Aufgabe gefunden");
}

export function erzeugeWirtschaftAufgabe(art: WirtschaftArt, stufe: WirtschaftStufe, zufall: () => number = Math.random): WirtschaftAufgabe {
  if (art === "nutzwert") return erzeugeNutzwert(stufe, zufall);
  if (art === "tco") return erzeugeTco(stufe, zufall);
  return erzeugeKaufAbo(stufe, zufall);
}

/** Prüft eine Eingabe gegen ein Aufgabenfeld; die Rundung auf die angegebenen Nachkommastellen genügt. */
export function pruefeWirtschaftFeld(eingabe: string, feld: ProzessFeld): boolean {
  const wert = leseBetrag(eingabe);
  return wert !== null && Math.abs(wert - feld.soll) <= 0.5 * Math.pow(10, -feld.stellen) + 1e-9;
}
