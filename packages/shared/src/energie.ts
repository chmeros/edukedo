import { formatDe } from "./game-logic-rechnen";
import { istExaktGerundet, leseBetrag } from "./handelskalkulation";
import { formatKurz } from "./skalierung";

/**
 * F-208 (Energiebedarf-Rechner, siehe Architekturplanung Abschnitt 13): Rechenlogik für den Kurs „Fachinformatiker
 * Digitale Vernetzung“ (Kursprofil W-DV-04): Leistungsaufnahme mehrerer Geräte und Leistungsbudget (Switch mit PoE,
 * Netzteil) nach dem Rechenbeispiel der Kurstheorie 8.3, Energie und Energiekosten, Akkulaufzeit, dazu Übungsaufgaben.
 * Reine Funktionen. Einheiten: Leistung in Watt (W), Spannung in Volt (V), Strom in Ampere (A), Energie in Kilowattstunden
 * (kWh), Kapazität in Amperestunden (Ah) oder Milliamperestunden (mAh).
 *
 * Rundung: Es wird mit ungerundeten Zwischenwerten gerechnet und erst die Anzeige gerundet (kWh und Stunden auf zwei Stellen,
 * Kosten auf Cent). Die Energiepreise sind Beispielwerte, der echte Preis steht im Vertrag (Rahmenentscheidung R7).
 */

/** P = U × I */
export function leistung(spannungV: number, stromA: number): number {
  return spannungV * stromA;
}

/** I = P ÷ U */
export function stromAusLeistung(leistungW: number, spannungV: number): number | null {
  return spannungV > 0 ? leistungW / spannungV : null;
}

export interface Geraet {
  name: string;
  /** Anzahl als Text, damit leere Felder möglich sind. */
  anzahl: string;
  leistungW: string;
  spannungV: string;
  stromA: string;
}

export interface GeraeteZeile {
  name: string;
  anzahl: number;
  /** Leistung je Gerät in Watt. */
  einzel: number;
  summe: number;
  /** Rechenweg, zum Beispiel „12 × 15 W = 180 W“. */
  weg: string;
}

export interface GeraeteErgebnis {
  zeilen: GeraeteZeile[];
  summe: number;
  /** Hinweise zu unvollständigen Zeilen (nach Zeilennummer). */
  fehler: string[];
}

const wattText = (wert: number) => `${formatKurz(wert, 3)} W`;

/** Leistung je Gerät: direkt in Watt, sonst aus Spannung × Strom. Zeilen ohne jede Angabe werden übersprungen. */
export function gesamtLeistung(geraete: Geraet[]): GeraeteErgebnis {
  const zeilen: GeraeteZeile[] = [];
  const fehler: string[] = [];
  geraete.forEach((geraet, index) => {
    const nr = `Zeile ${index + 1}`;
    const leer = geraet.name.trim() === "" && geraet.anzahl.trim() === "" && geraet.leistungW.trim() === "" && geraet.spannungV.trim() === "" && geraet.stromA.trim() === "";
    if (leer) return;
    const anzahl = leseBetrag(geraet.anzahl);
    if (anzahl === null || !Number.isInteger(anzahl) || anzahl < 1) {
      fehler.push(`${nr}: Die Anzahl muss eine ganze Zahl ab 1 sein.`);
      return;
    }
    const direkt = geraet.leistungW.trim() === "" ? null : leseBetrag(geraet.leistungW);
    const u = geraet.spannungV.trim() === "" ? null : leseBetrag(geraet.spannungV);
    const i = geraet.stromA.trim() === "" ? null : leseBetrag(geraet.stromA);
    let einzel: number;
    let weg: string;
    if (geraet.leistungW.trim() !== "") {
      if (direkt === null || direkt < 0) {
        fehler.push(`${nr}: Die Leistung muss eine Zahl ab 0 sein.`);
        return;
      }
      einzel = direkt;
      weg = `${anzahl} × ${wattText(einzel)} = ${wattText(anzahl * einzel)}`;
    } else if (u !== null && i !== null && u >= 0 && i >= 0) {
      einzel = leistung(u, i);
      weg = `${anzahl} × (${formatKurz(u, 3)} V × ${formatKurz(i, 3)} A = ${wattText(einzel)}) = ${wattText(anzahl * einzel)}`;
    } else {
      fehler.push(`${nr}: Trage die Leistung in Watt ein oder Spannung und Strom.`);
      return;
    }
    zeilen.push({ name: geraet.name.trim() || `Gerät ${index + 1}`, anzahl, einzel, summe: anzahl * einzel, weg });
  });
  return { zeilen, summe: zeilen.reduce((s, zeile) => s + zeile.summe, 0), fehler };
}

export interface Budget {
  /** Verbleibende Leistung; negativ, wenn das Budget überschritten ist. */
  reserve: number;
  /** Auslastung in Prozent des Budgets. */
  auslastung: number | null;
  ueberschritten: boolean;
}

export function budgetReserve(summeW: number, budgetW: number): Budget {
  return { reserve: budgetW - summeW, auslastung: budgetW > 0 ? (summeW / budgetW) * 100 : null, ueberschritten: summeW > budgetW + 1e-9 /* Review WRK-08: Gleitkomma-Summen wie n × 15,4 sind nicht exakt */ };
}

export interface Energie {
  kwhTag: number;
  kwhJahr: number;
  kostenJahr: number;
}

/** Energie und Kosten: kWh = Watt × Stunden ÷ 1000; Kosten = kWh × Preis je kWh. */
export function energie(leistungW: number, stundenProTag: number, tageProJahr: number, preisProKwh: number): Energie {
  const kwhTag = (leistungW * stundenProTag) / 1000;
  const kwhJahr = kwhTag * tageProJahr;
  return { kwhTag, kwhJahr, kostenJahr: kwhJahr * preisProKwh };
}

/** Laufzeit in Stunden aus Kapazität in mAh und Stromaufnahme in mA, bei nutzbarem Anteil der Kapazität (1 = ganz). */
export function laufzeitAusStrom(kapazitaetMah: number, stromMa: number, nutzbar = 1): number | null {
  return stromMa > 0 ? (kapazitaetMah * nutzbar) / stromMa : null;
}

/** Laufzeit in Stunden aus gespeicherter Energie (Kapazität in Ah × Spannung in V = Wh) und Leistungsaufnahme in W. */
export function laufzeitAusLeistung(kapazitaetAh: number, spannungV: number, leistungW: number, nutzbar = 1): number | null {
  return leistungW > 0 ? (kapazitaetAh * spannungV * nutzbar) / leistungW : null;
}

/** Dauer in Stunden als Text: „12 h 30 min“, ab 48 Stunden zusätzlich in Tagen. */
export function formatLaufzeit(stunden: number): string {
  const minutenGesamt = Math.round(stunden * 60);
  const h = Math.floor(minutenGesamt / 60);
  const min = minutenGesamt % 60;
  const text = min === 0 ? `${formatDe(h, 0)} h` : `${formatDe(h, 0)} h ${min} min`;
  return stunden >= 48 ? `${text} (etwa ${formatDe(stunden / 24, 1)} Tage)` : text;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type EnergieArt = "budget" | "leistung" | "energie" | "akku";
export type EnergieStufe = "leicht" | "mittel" | "schwer";

export interface EnergieFeld {
  id: string;
  label: string;
  einheit: string;
  stellen: number;
  soll: number;
  weg: string;
}

export interface EnergieAufgabe {
  art: EnergieArt;
  stufe: EnergieStufe;
  text: string;
  felder: EnergieFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}
function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
const z = (wert: number, stellen = 0) => formatDe(wert, stellen);
const zk = (wert: number) => formatKurz(wert, 4);

const POE_GERAETE = [
  { name: "Access Points", w: [10, 12, 15] },
  { name: "IP-Kameras", w: [6, 8, 12] },
  { name: "Telefone", w: [4, 5] },
  { name: "Sensor-Gateways", w: [7, 9, 13] },
];

function erzeugeBudget(stufe: EnergieStufe, zufall: () => number): EnergieAufgabe {
  const anzahlGruppen = stufe === "leicht" ? 2 : 3;
  const gemischt = POE_GERAETE.slice();
  for (let i = gemischt.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(zufall() * (i + 1)));
    [gemischt[i], gemischt[j]] = [gemischt[j]!, gemischt[i]!];
  }
  const gruppen = gemischt
    .slice(0, anzahlGruppen)
    .map((typ) => ({ name: typ.name, anzahl: ganz(2, 12, zufall), w: wahl(typ.w, zufall), strom: false }));
  const beschreibung: string[] = [];
  let summe = 0;
  const wege: string[] = [];
  gruppen.forEach((gruppe, index) => {
    // Auf der Stufe „mittel“ und „schwer“ wird eine Gruppe über Spannung und Strom angegeben.
    if (stufe !== "leicht" && index === anzahlGruppen - 1) {
      // Ströme, die bei 48 V genau glatte Leistungen ergeben (binär exakt).
      const u = 48;
      const amp = wahl([0.125, 0.25, 0.3125, 0.5], zufall);
      const w = u * amp;
      gruppe.w = w;
      gruppe.strom = true;
      beschreibung.push(`${gruppe.anzahl} ${gruppe.name} mit je ${z(u)} V und ${zk(amp)} A`);
      wege.push(`${gruppe.anzahl} × (${z(u)} V × ${zk(amp)} A = ${zk(w)} W) = ${zk(gruppe.anzahl * w)} W`);
    } else {
      beschreibung.push(`${gruppe.anzahl} ${gruppe.name} mit je ${zk(gruppe.w)} W`);
      wege.push(`${gruppe.anzahl} × ${zk(gruppe.w)} W = ${zk(gruppe.anzahl * gruppe.w)} W`);
    }
    summe += gruppe.anzahl * gruppe.w;
  });
  summe = Math.round(summe * 1000) / 1000;
  // Budget: bei „schwer“ knapp zu klein oder knapp ausreichend, sonst mit Reserve.
  let budget: number;
  if (stufe === "schwer") budget = Math.max(1, Math.round(summe) + wahl([-40, -25, -15, 20, 35], zufall));
  else budget = Math.round(summe) + wahl([40, 60, 80, 110, 150], zufall);
  const reserve = budget - summe;
  const text = `Ein Switch hat ein PoE-Budget von ${z(budget)} W. Angeschlossen werden ${beschreibung.join(" und ")}. ${
    stufe === "schwer" ? "Wie groß ist die Gesamtleistung, und wie viel Reserve bleibt? Ist das Budget überschritten, ist die Reserve negativ." : "Wie groß ist die Gesamtleistung, und wie viel Reserve bleibt?"
  }`;
  return {
    art: "budget",
    stufe,
    text,
    felder: [
      { id: "summe", label: "Gesamtleistung", einheit: "W", stellen: 1, soll: summe, weg: `${wege.join(" + ")} = ${zk(summe)} W` },
      { id: "reserve", label: "Reserve (negativ bei Überschreitung)", einheit: "W", stellen: 1, soll: reserve, weg: `${z(budget)} W − ${zk(summe)} W = ${zk(reserve)} W` },
    ],
  };
}

function erzeugeLeistung(stufe: EnergieStufe, zufall: () => number): EnergieAufgabe {
  const u = wahl([5, 12, 24, 48], zufall);
  if (stufe === "leicht") {
    const i = wahl([0.25, 0.5, 1, 1.5, 2, 2.5], zufall);
    return { art: "leistung", stufe, text: `Ein Gerät nimmt bei ${z(u)} V einen Strom von ${zk(i)} A auf. Welche Leistung ist das?`, felder: [{ id: "p", label: "Leistung", einheit: "W", stellen: 2, soll: u * i, weg: `P = U × I = ${z(u)} V × ${zk(i)} A = ${zk(u * i)} W` }] };
  }
  if (stufe === "mittel") {
    const p = wahl([6, 12, 15, 24, 30, 60], zufall);
    const i = (p / u) * 1000;
    return { art: "leistung", stufe, text: `Ein Gerät nimmt ${z(p)} W bei ${z(u)} V auf. Welchen Strom nimmt es auf, in Milliampere?`, felder: [{ id: "i", label: "Strom", einheit: "mA", stellen: 1, soll: i, weg: `I = P ÷ U = ${z(p)} W ÷ ${z(u)} V = ${zk(p / u)} A = ${zk(i)} mA` }] };
  }
  const p = wahl([6, 12, 15, 24, 30], zufall);
  const anzahl = ganz(2, 10, zufall);
  const strom = (p / u) * anzahl;
  return {
    art: "leistung",
    stufe,
    text: `${anzahl} Geräte nehmen bei ${z(u)} V je ${z(p)} W auf und hängen an einem gemeinsamen Netzteil. Welche Gesamtleistung ergibt das, und welchen Gesamtstrom muss das Netzteil bei ${z(u)} V mindestens liefern, in Ampere?`,
    felder: [
      { id: "p", label: "Gesamtleistung", einheit: "W", stellen: 1, soll: anzahl * p, weg: `${anzahl} × ${z(p)} W = ${z(anzahl * p)} W` },
      { id: "i", label: "Gesamtstrom", einheit: "A", stellen: 2, soll: strom, weg: `I = P ÷ U = ${z(anzahl * p)} W ÷ ${z(u)} V = ${zk(strom)} A` },
    ],
  };
}

function erzeugeEnergie(stufe: EnergieStufe, zufall: () => number): EnergieAufgabe {
  const p = wahl([10, 20, 40, 60, 100, 150, 250], zufall);
  if (stufe === "leicht") {
    const h = wahl([2, 4, 5, 8, 10, 12], zufall);
    return { art: "energie", stufe, text: `Ein Gerät mit ${z(p)} W läuft täglich ${z(h)} Stunden. Wie viel Energie verbraucht es pro Tag in Kilowattstunden?`, felder: [{ id: "kwh", label: "Energie pro Tag", einheit: "kWh", stellen: 3, soll: (p * h) / 1000, weg: `${z(p)} W × ${z(h)} h ÷ 1000 = ${zk((p * h) / 1000)} kWh` }] };
  }
  const preis = wahl([0.25, 0.3, 0.35, 0.4], zufall);
  if (stufe === "mittel") {
    const h = wahl([8, 10, 12, 16], zufall);
    const tage = wahl([220, 250, 300, 365], zufall);
    const e = energie(p, h, tage, preis);
    return {
      art: "energie",
      stufe,
      text: `Ein Gerät mit ${z(p)} W läuft ${z(h)} Stunden am Tag an ${z(tage)} Tagen im Jahr. Der Strompreis beträgt ${z(preis, 2)} € je kWh (Beispielwert). Wie viele Kilowattstunden sind das im Jahr, und was kostet das?`,
      felder: [
        { id: "kwh", label: "Energie pro Jahr", einheit: "kWh", stellen: 2, soll: e.kwhJahr, weg: `${z(p)} W × ${z(h)} h × ${z(tage)} Tage ÷ 1000 = ${zk(e.kwhJahr)} kWh` },
        { id: "kosten", label: "Kosten pro Jahr", einheit: "€", stellen: 2, soll: e.kostenJahr, weg: `${zk(e.kwhJahr)} kWh × ${z(preis, 2)} €/kWh = ${z(e.kostenJahr, 2)} €` },
      ],
    };
  }
  const anzahl = ganz(4, 24, zufall);
  const e = energie(p * anzahl, 24, 365, preis);
  return {
    art: "energie",
    stufe,
    text: `${anzahl} Geräte mit je ${z(p)} W laufen im Dauerbetrieb (24 Stunden an 365 Tagen). Der Strompreis beträgt ${z(preis, 2)} € je kWh (Beispielwert). Wie viele Kilowattstunden verbrauchen alle zusammen im Jahr, und was kostet das?`,
    felder: [
      { id: "kwh", label: "Energie pro Jahr", einheit: "kWh", stellen: 1, soll: e.kwhJahr, weg: `${anzahl} × ${z(p)} W = ${z(p * anzahl)} W; ${z(p * anzahl)} W × 24 h × 365 Tage ÷ 1000 = ${zk(e.kwhJahr)} kWh` },
      { id: "kosten", label: "Kosten pro Jahr", einheit: "€", stellen: 2, soll: e.kostenJahr, weg: `${zk(e.kwhJahr)} kWh × ${z(preis, 2)} €/kWh = ${z(e.kostenJahr, 2)} €` },
    ],
  };
}

function erzeugeAkku(stufe: EnergieStufe, zufall: () => number): EnergieAufgabe {
  if (stufe === "leicht") {
    const kap = wahl([1000, 2000, 2400, 3000, 5000], zufall);
    const strom = wahl([20, 40, 50, 100, 125, 250], zufall);
    const h = kap / strom;
    return { art: "akku", stufe, text: `Ein Akku hat ${z(kap)} mAh. Der Sensor, den er versorgt, nimmt ${z(strom)} mA auf. Wie lange läuft er, in Stunden?`, felder: [{ id: "h", label: "Laufzeit", einheit: "h", stellen: 2, soll: h, weg: `${z(kap)} mAh ÷ ${z(strom)} mA = ${zk(h)} h` }] };
  }
  if (stufe === "mittel") {
    const kap = wahl([2, 4, 7, 10], zufall);
    const u = wahl([12, 24], zufall);
    const p = wahl([5, 8, 10, 15, 20], zufall);
    const wh = kap * u;
    return {
      art: "akku",
      stufe,
      text: `Ein Akku hat ${z(kap)} Ah bei ${z(u)} V. Das angeschlossene Gerät nimmt ${z(p)} W auf. Wie viel Energie ist gespeichert, in Wattstunden, und wie lange läuft das Gerät, in Stunden?`,
      felder: [
        { id: "wh", label: "Gespeicherte Energie", einheit: "Wh", stellen: 1, soll: wh, weg: `${z(kap)} Ah × ${z(u)} V = ${z(wh)} Wh` },
        { id: "h", label: "Laufzeit", einheit: "h", stellen: 2, soll: wh / p, weg: `${z(wh)} Wh ÷ ${z(p)} W = ${zk(wh / p)} h` },
      ],
    };
  }
  const kap = wahl([2000, 3000, 5000, 8000], zufall);
  const strom = wahl([40, 50, 80, 100, 200], zufall);
  const nutzbar = wahl([0.8, 0.75, 0.9], zufall);
  const h = (kap * nutzbar) / strom;
  return {
    art: "akku",
    stufe,
    text: `Ein Akku hat ${z(kap)} mAh, davon sind nach Datenblatt nur ${z(nutzbar * 100)} Prozent nutzbar. Der Verbraucher nimmt ${z(strom)} mA auf. Wie lange läuft er, in Stunden?`,
    felder: [{ id: "h", label: "Laufzeit", einheit: "h", stellen: 2, soll: h, weg: `${z(kap)} mAh × ${z(nutzbar * 100)} % = ${zk(kap * nutzbar)} mAh; ${zk(kap * nutzbar)} mAh ÷ ${z(strom)} mA = ${zk(h)} h` }],
  };
}

export function erzeugeEnergieAufgabe(art: EnergieArt, stufe: EnergieStufe, zufall: () => number = Math.random): EnergieAufgabe {
  if (art === "budget") return erzeugeBudget(stufe, zufall);
  if (art === "leistung") return erzeugeLeistung(stufe, zufall);
  if (art === "energie") return erzeugeEnergie(stufe, zufall);
  return erzeugeAkku(stufe, zufall);
}

/** Ein Feld gilt nur mit dem exakt auf die verlangte Stellenzahl gerundeten Wert als richtig (Review WRK-04). */
export function pruefeEnergieFeld(eingabe: string, feld: EnergieFeld): boolean {
  return istExaktGerundet(eingabe, feld.soll, feld.stellen);
}
