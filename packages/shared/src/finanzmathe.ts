/**
 * F-197 (Finanzmathe-Kern, Phase 2 der Kursprofile, W-KF-01): reine Rechenbausteine für den Finanzrechner im
 * Werkzeugkasten (Handels-, Industrie-, Technischer, Wirtschafts-, Immobilien- und Versicherungskurs).
 * Es wird mit **jährlicher Verzinsung** und **nachschüssigen** Zahlungen gerechnet (Zahlung am Jahresende); die
 * Rechenwege der Ergebnisse nennen das ausdrücklich. Alle Funktionen sind frei von Seiteneffekten und liefern
 * Lernbeispiele, keine Beratung und keine Prognose.
 */

export const MAX_JAHRE = 60;

export type Fehlend<T> = { ok: true; wert: T } | { ok: false; fehler: string };

function pruefeJahre(jahre: number): string | null {
  if (!Number.isInteger(jahre) || jahre < 1 || jahre > MAX_JAHRE) return `Die Laufzeit muss eine ganze Zahl von 1 bis ${MAX_JAHRE} Jahren sein.`;
  return null;
}

function pruefeZins(zinsProzent: number): string | null {
  if (!Number.isFinite(zinsProzent) || zinsProzent < 0 || zinsProzent > 100) return "Der Zinssatz muss zwischen 0 und 100 Prozent liegen.";
  return null;
}

function pruefeBetrag(betrag: number, name: string): string | null {
  if (!Number.isFinite(betrag) || betrag < 0 || betrag > 1_000_000_000) return `${name} muss zwischen 0 und 1 Milliarde Euro liegen.`;
  return null;
}

/**
 * Auf Cent runden, kaufmännisch (ab 0,5 Cent auf, bei negativen Werten weg von null).
 * Review-Befund SHR-02: Die frühere Korrektur `+ Number.EPSILON` wirkt nur bei Werten unter 2; bei größeren Beträgen
 * wurde z. B. 8,54 × 25 % = 2,135 (gespeichert als 2,1349999…) zu 2,13 statt 2,14. Deshalb wird das Zwischenergebnis
 * zuerst auf 15 gültige Stellen gerundet, das beseitigt den Gleitkomma-Rest (213,49999999999997 → 213,5) für Beträge
 * bis in den Billionenbereich.
 */
export function rundeCent(wert: number): number {
  if (!Number.isFinite(wert)) return wert;
  const cents = Number((Math.abs(wert) * 100).toPrecision(15));
  const gerundet = Math.round(cents) / 100;
  return wert < 0 && gerundet !== 0 ? -gerundet : gerundet;
}

// ---------------------------------------------------------------------------
// Aufzinsung (Zinseszins) und Sparplan
// ---------------------------------------------------------------------------

export interface AufzinsungJahr {
  jahr: number;
  zinsen: number;
  kapital: number;
}

export interface Aufzinsung {
  endkapital: number;
  zinsenGesamt: number;
  verlauf: AufzinsungJahr[];
}

/** Endkapital K_n = K_0 · (1 + i)^n bei jährlicher Verzinsung; Zinsen bleiben im Kapital (Zinseszins). */
export function aufzinsen(kapital: number, zinsProzent: number, jahre: number): Fehlend<Aufzinsung> {
  const fehler = pruefeBetrag(kapital, "Das Startkapital") ?? pruefeZins(zinsProzent) ?? pruefeJahre(jahre);
  if (fehler) return { ok: false, fehler };
  const i = zinsProzent / 100;
  const verlauf: AufzinsungJahr[] = [];
  let stand = kapital;
  for (let jahr = 1; jahr <= jahre; jahr += 1) {
    const zinsen = stand * i;
    stand += zinsen;
    verlauf.push({ jahr, zinsen: rundeCent(zinsen), kapital: rundeCent(stand) });
  }
  const endkapital = kapital * (1 + i) ** jahre;
  return { ok: true, wert: { endkapital: rundeCent(endkapital), zinsenGesamt: rundeCent(endkapital - kapital), verlauf } };
}

export interface Sparplan {
  endwert: number;
  eingezahlt: number;
  zinsenGesamt: number;
}

/** Endwert regelmäßiger Jahresraten (nachschüssig): R · ((1 + i)^n − 1) / i; ohne Zins R · n. */
export function sparplanEndwert(rateProJahr: number, zinsProzent: number, jahre: number): Fehlend<Sparplan> {
  const fehler = pruefeBetrag(rateProJahr, "Die Jahresrate") ?? pruefeZins(zinsProzent) ?? pruefeJahre(jahre);
  if (fehler) return { ok: false, fehler };
  const i = zinsProzent / 100;
  const endwert = i === 0 ? rateProJahr * jahre : (rateProJahr * ((1 + i) ** jahre - 1)) / i;
  const eingezahlt = rateProJahr * jahre;
  return { ok: true, wert: { endwert: rundeCent(endwert), eingezahlt: rundeCent(eingezahlt), zinsenGesamt: rundeCent(endwert - eingezahlt) } };
}

// ---------------------------------------------------------------------------
// Barwert und Kapitalwert
// ---------------------------------------------------------------------------

/** Barwert einer Zahlung in der Zukunft: Z / (1 + i)^n. */
export function barwert(zahlung: number, zinsProzent: number, jahre: number): Fehlend<number> {
  const fehler = pruefeBetrag(zahlung, "Die Zahlung") ?? pruefeZins(zinsProzent) ?? pruefeJahre(jahre);
  if (fehler) return { ok: false, fehler };
  return { ok: true, wert: rundeCent(zahlung / (1 + zinsProzent / 100) ** jahre) };
}

export interface KapitalwertZeile {
  jahr: number;
  zahlung: number;
  abzinsungsfaktor: number;
  barwert: number;
}

export interface Kapitalwert {
  kapitalwert: number;
  summeBarwerte: number;
  zeilen: KapitalwertZeile[];
}

/** Kapitalwert: −I_0 + Σ Z_t / (1 + i)^t für t = 1 … n (Zahlungen jeweils am Jahresende). */
export function kapitalwert(investition: number, zahlungen: number[], zinsProzent: number): Fehlend<Kapitalwert> {
  const fehler = pruefeBetrag(investition, "Die Anfangsinvestition") ?? pruefeZins(zinsProzent);
  if (fehler) return { ok: false, fehler };
  if (zahlungen.length < 1 || zahlungen.length > MAX_JAHRE) return { ok: false, fehler: `Es braucht 1 bis ${MAX_JAHRE} jährliche Zahlungen.` };
  if (zahlungen.some((zahlung) => !Number.isFinite(zahlung) || Math.abs(zahlung) > 1_000_000_000)) return { ok: false, fehler: "Jede Zahlung muss eine Zahl zwischen −1 Milliarde und 1 Milliarde sein." };
  const i = zinsProzent / 100;
  const zeilen = zahlungen.map((zahlung, index) => {
    const faktor = 1 / (1 + i) ** (index + 1);
    return { jahr: index + 1, zahlung, abzinsungsfaktor: faktor, barwert: zahlung * faktor };
  });
  const summe = zeilen.reduce((acc, zeile) => acc + zeile.barwert, 0);
  return {
    ok: true,
    wert: {
      kapitalwert: rundeCent(summe - investition),
      summeBarwerte: rundeCent(summe),
      zeilen: zeilen.map((zeile) => ({ ...zeile, barwert: rundeCent(zeile.barwert) })),
    },
  };
}

// ---------------------------------------------------------------------------
// Annuitätendarlehen
// ---------------------------------------------------------------------------

export interface TilgungsZeile {
  jahr: number;
  zinsen: number;
  tilgung: number;
  rate: number;
  restschuld: number;
}

export interface Annuitaetendarlehen {
  /** Konstante Jahresrate (Zins + Tilgung), auf Cent gerundet. */
  annuitaet: number;
  zinsenGesamt: number;
  plan: TilgungsZeile[];
}

/**
 * Annuität A = D · i · q^n / (q^n − 1) mit q = 1 + i (ohne Zins: D / n). Der Tilgungsplan rechnet je Jahr
 * Zinsen = Restschuld · i, Tilgung = A − Zinsen; im letzten Jahr wird der Rest getilgt, damit die Restschuld
 * genau 0 € beträgt (Rundung auf Cent).
 */
export function annuitaetendarlehen(darlehen: number, zinsProzent: number, jahre: number): Fehlend<Annuitaetendarlehen> {
  const fehler = pruefeBetrag(darlehen, "Das Darlehen") ?? pruefeZins(zinsProzent) ?? pruefeJahre(jahre);
  if (fehler) return { ok: false, fehler };
  if (darlehen <= 0) return { ok: false, fehler: "Das Darlehen muss größer als 0 € sein." };
  const i = zinsProzent / 100;
  const q = 1 + i;
  const annuitaet = rundeCent(i === 0 ? darlehen / jahre : (darlehen * i * q ** jahre) / (q ** jahre - 1));
  const plan: TilgungsZeile[] = [];
  let rest = rundeCent(darlehen);
  let zinsenGesamt = 0;
  for (let jahr = 1; jahr <= jahre; jahr += 1) {
    const zinsen = rundeCent(rest * i);
    const letztesJahr = jahr === jahre;
    const tilgung = letztesJahr ? rest : rundeCent(Math.min(annuitaet - zinsen, rest));
    const rate = rundeCent(zinsen + tilgung);
    rest = rundeCent(rest - tilgung);
    zinsenGesamt += zinsen;
    plan.push({ jahr, zinsen, tilgung, rate, restschuld: rest });
  }
  return { ok: true, wert: { annuitaet, zinsenGesamt: rundeCent(zinsenGesamt), plan } };
}

// ---------------------------------------------------------------------------
// Skonto-Effektivzins
// ---------------------------------------------------------------------------

export interface SkontoEffektivzins {
  /** Effektiver Jahreszins in Prozent (lineare Näherung, 360 Tage). */
  zinsProzent: number;
  finanzierungstage: number;
}

/**
 * Effektivzins eines nicht genutzten Skontos als lineare Näherung mit 360 Tagen:
 * i = s / (100 − s) · 360 / (Zahlungsziel − Skontofrist) · 100. Wer das Skonto nicht nutzt, „leiht“ sich
 * den Betrag für die Tage zwischen Skontofrist und Zahlungsziel zu diesem Zins.
 */
export function skontoEffektivzins(skontoProzent: number, zahlungszielTage: number, skontofristTage: number): Fehlend<SkontoEffektivzins> {
  if (!Number.isFinite(skontoProzent) || skontoProzent <= 0 || skontoProzent >= 50) return { ok: false, fehler: "Der Skontosatz muss größer als 0 und kleiner als 50 Prozent sein." };
  if (!Number.isInteger(zahlungszielTage) || !Number.isInteger(skontofristTage) || skontofristTage < 0 || zahlungszielTage > 365) {
    return { ok: false, fehler: "Zahlungsziel und Skontofrist müssen ganze Tage sein (Zahlungsziel höchstens 365)." };
  }
  if (zahlungszielTage <= skontofristTage) return { ok: false, fehler: "Das Zahlungsziel muss länger sein als die Skontofrist." };
  const tage = zahlungszielTage - skontofristTage;
  return { ok: true, wert: { zinsProzent: (skontoProzent / (100 - skontoProzent)) * (360 / tage) * 100, finanzierungstage: tage } };
}
