/**
 * F-204 (Ausbildungsplan-Zeitplaner, siehe Architekturplanung Abschnitt 13): reine Logik für den Entwurf eines
 * betrieblichen Ausbildungsplans im Kurs „Ausbildung der Ausbilder“ (Kursprofil W-AEV-04). Aus Ausbildungsdauer,
 * Probezeit und einer Liste von Abschnitten (Betrieb, Berufsschule, Sonstiges) entstehen eine Zeitleiste in Wochen, eine
 * Summenprüfung und die sachlich-zeitliche Gliederung als Text. Die Prüfungen sind **Heuristiken zur Selbstkontrolle**.
 *
 * Bewusst ohne Rechtswerte: Ausbildungsdauer und Probezeit gibt man ein (Ausbildungsordnung bzw. BBiG, siehe Kurs 1.1);
 * das Werkzeug kennt weder zulässige Probezeiten noch Urlaubs- oder Berufsschulregeln (Rahmenentscheidung R4).
 * Zeitgrundlage: ein Jahr hat 52 Wochen, ein Monat entspricht 52 ÷ 12 Wochen, gerundet.
 */
export const WOCHEN_PRO_JAHR = 52;

export type AbschnittArt = "betrieb" | "schule" | "sonstiges";

export const ABSCHNITT_ARTEN: { id: AbschnittArt; label: string }[] = [
  { id: "betrieb", label: "Betrieb (Abteilung, Station)" },
  { id: "schule", label: "Berufsschule (Block)" },
  { id: "sonstiges", label: "Sonstiges (Urlaub, Prüfung, Puffer)" },
];

export interface Abschnitt {
  id: string;
  name: string;
  art: AbschnittArt;
  /** Ganze Wochen als Text, damit leere Felder möglich sind. */
  wochen: string;
  inhalte: string;
}

export interface Ausbildungsplan {
  beruf: string;
  dauerMonate: string;
  probezeitMonate: string;
  abschnitte: Abschnitt[];
}

export function neuerAbschnitt(art: AbschnittArt = "betrieb"): Abschnitt {
  const zufall = Math.random().toString(36).slice(2, 10);
  return { id: `a-${Date.now().toString(36)}-${zufall}`, name: "", art, wochen: "", inhalte: "" };
}

export function leererAusbildungsplan(): Ausbildungsplan {
  return { beruf: "", dauerMonate: "", probezeitMonate: "", abschnitte: [neuerAbschnitt()] };
}

/** Frei erfundenes Muster (kein echter Beruf, keine Wiedergabe eines Ausbildungsrahmenplans). */
export function beispielAusbildungsplan(): Ausbildungsplan {
  const zeile = (nr: number, name: string, art: AbschnittArt, wochen: number, inhalte: string): Abschnitt => ({ id: `bsp-${nr}`, name, art, wochen: String(wochen), inhalte });
  return {
    beruf: "Fachkraft für Beispielbetrieb (frei erfundenes Muster)",
    dauerMonate: "36",
    probezeitMonate: "4",
    abschnitte: [
      zeile(1, "Einführung und Betriebsorganisation", "betrieb", 6, "Betrieb kennenlernen, Arbeitssicherheit, Aufbau und Abläufe des Betriebs"),
      zeile(2, "Abteilung A: Materialwirtschaft", "betrieb", 24, "Wareneingang, Lagerung, Bestandsführung, einfache Kennzahlen"),
      zeile(3, "Berufsschule, Block 1", "schule", 4, "Theorieblock nach Plan der Berufsschule"),
      zeile(4, "Abteilung B: Verkauf", "betrieb", 26, "Kundenberatung, Angebotserstellung, Auftragsabwicklung"),
      zeile(5, "Berufsschule, Block 2", "schule", 4, "Theorieblock nach Plan der Berufsschule"),
      zeile(6, "Abteilung C: Rechnungswesen", "betrieb", 24, "Belege prüfen und buchen, Zahlungsverkehr, Auswertungen"),
      zeile(7, "Berufsschule, Block 3", "schule", 4, "Theorieblock nach Plan der Berufsschule"),
      zeile(8, "Abteilung D: Projektarbeit", "betrieb", 32, "Eigenes Projekt planen, durchführen, dokumentieren und präsentieren"),
      zeile(9, "Berufsschule, Block 4", "schule", 4, "Theorieblock nach Plan der Berufsschule"),
      zeile(10, "Prüfungsvorbereitung", "betrieb", 16, "Wiederholung der Ausbildungsinhalte, Probeaufgaben, Fachgespräch üben"),
      zeile(11, "Urlaub und Puffer", "sonstiges", 12, "Nach Absprache über die gesamte Ausbildung verteilt"),
    ],
  };
}

/** Eine ganze Zahl größer als 0 aus einer Texteingabe; sonst null. */
export function leseWochen(text: string): number | null {
  const bereinigt = text.trim();
  if (!/^\d{1,4}$/.test(bereinigt)) return null;
  const wert = Number(bereinigt);
  return wert > 0 ? wert : null;
}

function leseMonate(text: string): number | null {
  const bereinigt = text.trim();
  return /^\d{1,3}$/.test(bereinigt) ? Number(bereinigt) : null;
}

export function monateInWochen(monate: number): number {
  return Math.round((monate * WOCHEN_PRO_JAHR) / 12);
}

export interface Zeitzeile {
  nr: number;
  abschnitt: Abschnitt;
  wochen: number;
  /** Erste und letzte Woche des Abschnitts (Zählung ab Woche 1 des Plans). */
  von: number;
  bis: number;
  jahrVon: number;
  jahrBis: number;
}

function jahrDerWoche(woche: number): number {
  return Math.ceil(woche / WOCHEN_PRO_JAHR);
}

/** Zeitleiste in der eingegebenen Reihenfolge. Abschnitte ohne gültige Wochenzahl fehlen in der Zeitleiste (die Prüfung meldet sie). */
export function zeitleiste(plan: Ausbildungsplan): Zeitzeile[] {
  const zeilen: Zeitzeile[] = [];
  let stand = 0;
  plan.abschnitte.forEach((abschnitt, index) => {
    const wochen = leseWochen(abschnitt.wochen);
    if (wochen === null) return;
    zeilen.push({ nr: index + 1, abschnitt, wochen, von: stand + 1, bis: stand + wochen, jahrVon: jahrDerWoche(stand + 1), jahrBis: jahrDerWoche(stand + wochen) });
    stand += wochen;
  });
  return zeilen;
}

export interface PlanSummen {
  betrieb: number;
  schule: number;
  sonstiges: number;
  gesamt: number;
  /** Wochen laut Ausbildungsdauer; null, wenn die Dauer fehlt. */
  verfuegbar: number | null;
}

export function planSummen(plan: Ausbildungsplan): PlanSummen {
  const ergebnis: PlanSummen = { betrieb: 0, schule: 0, sonstiges: 0, gesamt: 0, verfuegbar: null };
  for (const zeile of zeitleiste(plan)) {
    ergebnis[zeile.abschnitt.art] += zeile.wochen;
    ergebnis.gesamt += zeile.wochen;
  }
  const dauer = leseMonate(plan.dauerMonate);
  ergebnis.verfuegbar = dauer !== null && dauer > 0 ? monateInWochen(dauer) : null;
  return ergebnis;
}

/** Woche, in der die Probezeit endet, und der Abschnitt, in den sie fällt (Nummer in der Liste); null ohne gültige Angaben. */
export function probezeitEnde(plan: Ausbildungsplan): { woche: number; abschnittNr: number | null } | null {
  const monate = leseMonate(plan.probezeitMonate);
  if (monate === null || monate <= 0) return null;
  const woche = monateInWochen(monate);
  const treffer = zeitleiste(plan).find((zeile) => woche >= zeile.von && woche <= zeile.bis);
  return { woche, abschnittNr: treffer ? treffer.nr : null };
}

export type AusbildungsHinweisArt = "fehlt" | "hinweis" | "ok";

export interface AusbildungsHinweis {
  art: AusbildungsHinweisArt;
  bereich: string;
  text: string;
}

export function pruefeAusbildungsplan(plan: Ausbildungsplan): AusbildungsHinweis[] {
  const hinweise: AusbildungsHinweis[] = [];
  const fehlt = (bereich: string, text: string) => hinweise.push({ art: "fehlt", bereich, text });
  const hinweis = (bereich: string, text: string) => hinweise.push({ art: "hinweis", bereich, text });

  if (!plan.beruf.trim()) fehlt("Beruf", "Es fehlt der Ausbildungsberuf. Der betriebliche Ausbildungsplan leitet sich aus dem Ausbildungsrahmenplan dieses Berufs ab.");
  const dauer = leseMonate(plan.dauerMonate);
  if (dauer === null || dauer <= 0) fehlt("Ausbildungsdauer", "Trage die Ausbildungsdauer in Monaten ein. Sie steht in der Ausbildungsordnung des Berufs.");
  const probe = leseMonate(plan.probezeitMonate);
  if (probe === null || probe <= 0) {
    hinweis("Probezeit", "Trage die Probezeit in Monaten ein. Wie lang sie sein darf, regelt das Berufsbildungsgesetz (siehe Kurs, Handlungsfeld 1).");
  } else if (dauer !== null && probe >= dauer) {
    hinweis("Probezeit", "Die Probezeit ist so lang wie die gesamte Ausbildung oder länger. Prüfe die Monatsangaben.");
  }

  if (plan.abschnitte.length === 0) fehlt("Abschnitte", "Lege mindestens einen Abschnitt an.");
  plan.abschnitte.forEach((abschnitt, index) => {
    const nr = `Abschnitt ${index + 1}`;
    if (!abschnitt.name.trim()) fehlt(nr, "Es fehlt die Bezeichnung (zum Beispiel Abteilung oder Station).");
    const wochen = leseWochen(abschnitt.wochen);
    if (wochen === null) fehlt(nr, "Trage die Dauer in ganzen Wochen ein (größer als 0).");
    if (abschnitt.art === "betrieb") {
      if (!abschnitt.inhalte.trim()) hinweis(nr, "Es sind keine Ausbildungsinhalte genannt. Welche Inhalte aus dem Ausbildungsrahmenplan vermittelst du in diesem Abschnitt?");
      if (wochen !== null && wochen < 2) hinweis(nr, "Sehr kurzer Betriebsabschnitt (Faustregel, keine Vorgabe): Ein bis zwei Wochen reichen selten für Einarbeitung und eine Lernerfolgskontrolle.");
    }
  });

  const s = planSummen(plan);
  if (s.verfuegbar !== null && s.gesamt > 0) {
    if (s.gesamt > s.verfuegbar) hinweis("Zeit", `Die Abschnitte summieren sich auf ${s.gesamt} Wochen, bei ${plan.dauerMonate} Monaten stehen etwa ${s.verfuegbar} Wochen zur Verfügung: ${s.gesamt - s.verfuegbar} Wochen zu viel.`);
    else if (s.gesamt < s.verfuegbar) hinweis("Zeit", `Die Abschnitte summieren sich auf ${s.gesamt} Wochen, bei ${plan.dauerMonate} Monaten stehen etwa ${s.verfuegbar} Wochen zur Verfügung: ${s.verfuegbar - s.gesamt} Wochen sind noch nicht verplant.`);
  }
  if (plan.abschnitte.length > 0 && s.schule === 0) {
    hinweis("Berufsschule", "Es sind keine Berufsschulzeiten eingetragen. Trage sie ein, damit der Plan zur Ausbildung an beiden Lernorten passt (dualen Ausbildung, siehe Kurs).");
  }
  const probeEnde = probezeitEnde(plan);
  if (probeEnde && probeEnde.abschnittNr === null && s.gesamt > 0 && probeEnde.woche > s.gesamt) {
    hinweis("Probezeit", "Die Probezeit reicht über die geplanten Abschnitte hinaus.");
  }

  if (hinweise.length === 0) {
    hinweise.push({ art: "ok", bereich: "Gesamt", text: "Keine Auffälligkeiten bei den Prüfpunkten. Das ersetzt nicht den Abgleich mit dem Ausbildungsrahmenplan und die Rückmeldung durch eine Ausbilderin oder einen Ausbilder." });
  }
  return hinweise;
}

function jahrText(zeile: Zeitzeile): string {
  return zeile.jahrVon === zeile.jahrBis ? `${zeile.jahrVon}. Jahr` : `${zeile.jahrVon}. bis ${zeile.jahrBis}. Jahr`;
}

const ART_KURZ: Record<AbschnittArt, string> = { betrieb: "Betrieb", schule: "Berufsschule", sonstiges: "Sonstiges" };

/** Die sachlich-zeitliche Gliederung als reiner Text (zum Kopieren und Ausdrucken). */
export function planAlsText(plan: Ausbildungsplan): string {
  const s = planSummen(plan);
  const dauer = leseMonate(plan.dauerMonate);
  const probe = leseMonate(plan.probezeitMonate);
  const kopf = [
    "Betrieblicher Ausbildungsplan (Entwurf)",
    `Beruf: ${plan.beruf.trim() || "–"}`,
    `Ausbildungsdauer: ${dauer !== null && dauer > 0 ? `${dauer} Monate (etwa ${monateInWochen(dauer)} Wochen)` : "–"}`,
    `Probezeit: ${probe !== null && probe > 0 ? `${probe} Monate (etwa ${monateInWochen(probe)} Wochen)` : "–"}`,
    "",
    "Sachlich-zeitliche Gliederung",
  ];
  const zeilen = zeitleiste(plan).map(
    (zeile) =>
      `${zeile.nr}. ${zeile.abschnitt.name.trim() || "(ohne Bezeichnung)"} [${ART_KURZ[zeile.abschnitt.art]}] · ${zeile.wochen} Wochen · Woche ${zeile.von} bis ${zeile.bis} (${jahrText(zeile)})${
        zeile.abschnitt.inhalte.trim() ? `\n   Inhalte: ${zeile.abschnitt.inhalte.trim()}` : ""
      }`,
  );
  const fuss = [
    "",
    `Summe: Betrieb ${s.betrieb} Wochen, Berufsschule ${s.schule} Wochen, Sonstiges ${s.sonstiges} Wochen, gesamt ${s.gesamt}${s.verfuegbar !== null ? ` von etwa ${s.verfuegbar}` : ""} Wochen.`,
    "Entwurf: Inhalte mit dem Ausbildungsrahmenplan des Berufs abgleichen.",
  ];
  return [...kopf, ...zeilen, ...fuss].join("\n");
}
