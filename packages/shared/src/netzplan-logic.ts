/**
 * F-163: Netzplan-Trainer (Instrument "Netzplan"). Reine Rechen- und Generierungslogik, damit sie
 * ohne Browser testbar ist; Darstellung und Eingabe stehen in apps/web/src/Netzplan.tsx.
 *
 * Verfahren: Netzplantechnik mit Vorgängen als Knoten (Vorgangsknotennetz, Begriffe nach DIN 69900).
 *  - Vorwärtsrechnung:   FAZ = größter FEZ aller Vorgänger (ohne Vorgänger: 0), FEZ = FAZ + Dauer
 *  - Projektdauer:       größter FEZ aller Vorgänge
 *  - Rückwärtsrechnung:  SEZ = kleinster SAZ aller Nachfolger (ohne Nachfolger: Projektdauer), SAZ = SEZ − Dauer
 *  - Gesamtpuffer GP:    SAZ − FAZ (= SEZ − FEZ)
 *  - Freier Puffer FP:   kleinster FAZ aller Nachfolger (ohne Nachfolger: Projektdauer) − FEZ
 *  - Kritisch:           GP = 0; die kritischen Vorgänge bilden den kritischen Pfad
 * Zeitpunkte zählen in Zeiteinheiten ab Projektstart 0 (Zeitpunkt = Ende der Einheit, FAZ des ersten
 * Vorgangs ist 0). Es gibt nur Normalfolgen (Ende–Anfang ohne Zeitabstand).
 */
export type Vorgang = { id: string; dauer: number; vorgaenger: string[] };

export type VorgangErgebnis = {
  faz: number;
  fez: number;
  saz: number;
  sez: number;
  gp: number;
  fp: number;
  kritisch: boolean;
};

export type NetzplanErgebnis = {
  projektdauer: number;
  vorgaenge: Record<string, VorgangErgebnis>;
};

export type NetzplanSchwierigkeit = "leicht" | "mittel" | "schwer";

/** Eingabefelder je Schwierigkeit (Reihenfolge = Spaltenreihenfolge in der Tabelle). */
export const NETZPLAN_FELDER: Record<NetzplanSchwierigkeit, readonly (keyof Omit<VorgangErgebnis, "kritisch">)[]> = {
  leicht: ["faz", "fez"],
  mittel: ["faz", "fez", "saz", "sez", "gp"],
  schwer: ["faz", "fez", "saz", "sez", "gp", "fp"],
};

/**
 * Berechnet den Netzplan. Erwartet eine topologische Reihenfolge (jeder Vorgänger steht vor dem
 * Vorgang, der ihn nennt) — `erzeugeNetzplan` liefert sie so; sonst wird ein Fehler geworfen.
 */
export function berechneNetzplan(vorgaenge: Vorgang[]): NetzplanErgebnis {
  const index = new Map(vorgaenge.map((vorgang, position) => [vorgang.id, position]));
  if (index.size !== vorgaenge.length) throw new Error("Doppelte Vorgangs-ID.");
  const nachfolger = new Map<string, string[]>(vorgaenge.map((vorgang) => [vorgang.id, []]));
  for (const vorgang of vorgaenge) {
    for (const vorher of vorgang.vorgaenger) {
      const position = index.get(vorher);
      if (position === undefined || position >= index.get(vorgang.id)!) {
        throw new Error(`Vorgänger "${vorher}" von "${vorgang.id}" steht nicht davor.`);
      }
      nachfolger.get(vorher)!.push(vorgang.id);
    }
  }

  const faz = new Map<string, number>();
  const fez = new Map<string, number>();
  for (const vorgang of vorgaenge) {
    const start = vorgang.vorgaenger.length === 0 ? 0 : Math.max(...vorgang.vorgaenger.map((id) => fez.get(id)!));
    faz.set(vorgang.id, start);
    fez.set(vorgang.id, start + vorgang.dauer);
  }
  const projektdauer = Math.max(...vorgaenge.map((vorgang) => fez.get(vorgang.id)!));

  const saz = new Map<string, number>();
  const sez = new Map<string, number>();
  for (const vorgang of [...vorgaenge].reverse()) {
    const folgende = nachfolger.get(vorgang.id)!;
    const ende = folgende.length === 0 ? projektdauer : Math.min(...folgende.map((id) => saz.get(id)!));
    sez.set(vorgang.id, ende);
    saz.set(vorgang.id, ende - vorgang.dauer);
  }

  const ergebnis: Record<string, VorgangErgebnis> = {};
  for (const vorgang of vorgaenge) {
    const folgende = nachfolger.get(vorgang.id)!;
    const naechsterStart = folgende.length === 0 ? projektdauer : Math.min(...folgende.map((id) => faz.get(id)!));
    const gp = saz.get(vorgang.id)! - faz.get(vorgang.id)!;
    ergebnis[vorgang.id] = {
      faz: faz.get(vorgang.id)!,
      fez: fez.get(vorgang.id)!,
      saz: saz.get(vorgang.id)!,
      sez: sez.get(vorgang.id)!,
      gp,
      fp: naechsterStart - fez.get(vorgang.id)!,
      kritisch: gp === 0,
    };
  }
  return { projektdauer, vorgaenge: ergebnis };
}

/** Ebene (0 = Start) je Vorgang: Länge der längsten Kette von Vorgängern — für die Spaltenanordnung. */
export function netzplanEbenen(vorgaenge: Vorgang[]): Record<string, number> {
  const ebenen: Record<string, number> = {};
  for (const vorgang of vorgaenge) {
    ebenen[vorgang.id] = vorgang.vorgaenger.length === 0 ? 0 : Math.max(...vorgang.vorgaenger.map((id) => ebenen[id]!)) + 1;
  }
  return ebenen;
}

const PARAMETER: Record<NetzplanSchwierigkeit, { anzahl: number; maxDauer: number; zweiVorgaenger: number }> = {
  leicht: { anzahl: 5, maxDauer: 6, zweiVorgaenger: 0.3 },
  mittel: { anzahl: 7, maxDauer: 8, zweiVorgaenger: 0.4 },
  schwer: { anzahl: 9, maxDauer: 9, zweiVorgaenger: 0.5 },
};

const ID_BUCHSTABEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_VERSUCHE = 300;

function zufallsInt(zufall: () => number, min: number, max: number): number {
  return min + Math.floor(zufall() * (max - min + 1));
}

function versuch(schwierigkeit: NetzplanSchwierigkeit, zufall: () => number): Vorgang[] {
  const { anzahl, maxDauer, zweiVorgaenger } = PARAMETER[schwierigkeit];
  const vorgaenge: Vorgang[] = [];
  // Vorfahren je Vorgang, um überflüssige Kanten (A→C, obwohl A→B→C) zu vermeiden.
  const vorfahren: Set<string>[] = [];
  for (let position = 0; position < anzahl; position += 1) {
    const id = ID_BUCHSTABEN[position]!;
    let gewaehlt: number[] = [];
    if (position > 0) {
      const fenster = Math.min(position, 3);
      gewaehlt.push(position - 1 - Math.floor(zufall() * fenster));
      if (position >= 2 && zufall() < zweiVorgaenger) {
        const weiterer = zufallsInt(zufall, 0, position - 1);
        if (!gewaehlt.includes(weiterer)) gewaehlt.push(weiterer);
      }
      // Kanten entfernen, die über einen anderen gewählten Vorgänger ohnehin gelten.
      gewaehlt = gewaehlt.filter(
        (kandidat) => !gewaehlt.some((anderer) => anderer !== kandidat && vorfahren[anderer]!.has(ID_BUCHSTABEN[kandidat]!)),
      );
      gewaehlt.sort((a, b) => a - b);
    }
    const alleVorfahren = new Set<string>();
    for (const vorher of gewaehlt) {
      alleVorfahren.add(ID_BUCHSTABEN[vorher]!);
      for (const weiter of vorfahren[vorher]!) alleVorfahren.add(weiter);
    }
    vorfahren.push(alleVorfahren);
    vorgaenge.push({ id, dauer: zufallsInt(zufall, 1, maxDauer), vorgaenger: gewaehlt.map((vorher) => ID_BUCHSTABEN[vorher]!) });
  }
  return vorgaenge;
}

/** Erfüllt der Netzplan die Lernziele der Stufe (genug Puffer, nicht alles kritisch)? */
function istBrauchbar(vorgaenge: Vorgang[], schwierigkeit: NetzplanSchwierigkeit): boolean {
  const { vorgaenge: ergebnis } = berechneNetzplan(vorgaenge);
  const werte = Object.values(ergebnis);
  const kritisch = werte.filter((wert) => wert.kritisch).length;
  const mitPuffer = werte.filter((wert) => wert.gp > 0).length;
  if (kritisch < 3 || mitPuffer < (schwierigkeit === "leicht" ? 1 : 2)) return false;
  if (schwierigkeit === "schwer" && !werte.some((wert) => wert.fp > 0)) return false;
  // Jeder Vorgang außer dem letzten soll einen Nachfolger haben, sonst "hängt" er sichtbar im Leeren.
  const mitNachfolger = new Set(vorgaenge.flatMap((vorgang) => vorgang.vorgaenger));
  const ohneNachfolger = vorgaenge.filter((vorgang) => !mitNachfolger.has(vorgang.id));
  return ohneNachfolger.length <= 2;
}

/**
 * Erzeugt eine zufällige, lösbare Aufgabe. `zufall` ist austauschbar (Tests übergeben eine
 * deterministische Quelle). Bleibt nach `MAX_VERSUCHE` Versuchen keine brauchbare Aufgabe, wird die
 * letzte (immer gültige) zurückgegeben.
 */
export function erzeugeNetzplan(schwierigkeit: NetzplanSchwierigkeit, zufall: () => number = Math.random): Vorgang[] {
  let letzter = versuch(schwierigkeit, zufall);
  for (let nummer = 0; nummer < MAX_VERSUCHE; nummer += 1) {
    if (istBrauchbar(letzter, schwierigkeit)) return letzter;
    letzter = versuch(schwierigkeit, zufall);
  }
  return letzter;
}

/** Eingabe tolerant lesen: ganze Zahl, Leerzeichen egal; leer oder ungültig → null. */
export function leseNetzplanZahl(eingabe: string): number | null {
  const bereinigt = eingabe.trim();
  if (!/^-?\d{1,3}$/.test(bereinigt)) return null;
  return Number(bereinigt);
}
