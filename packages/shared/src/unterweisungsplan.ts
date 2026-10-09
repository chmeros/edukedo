/**
 * F-200 (Unterweisungs-Planer, Phase 3 der Kursprofile, W-AEV-01): reine Logik für den Entwurf einer Unterweisung nach
 * der Vier-Stufen-Methode (Ausbildung der Ausbilder). Die Prüfungen sind **Heuristiken zur Selbstkontrolle**, keine
 * Bewertung: Sie schauen auf Vollständigkeit, Zeitplan und die Formulierung der Feinziele (überprüfbares Verb).
 * Grundlage sind die Theorie zur Vier-Stufen-Methode (F-192) und zu den Lernzielbereichen (3.2).
 */

export type Lernzielbereich = "kognitiv" | "affektiv" | "psychomotorisch";

export const LERNZIELBEREICHE: { id: Lernzielbereich; label: string; merkhilfe: string }[] = [
  { id: "kognitiv", label: "kognitiv (Wissen und Denken)", merkhilfe: "Kopf" },
  { id: "affektiv", label: "affektiv (Einstellungen und Haltungen)", merkhilfe: "Herz" },
  { id: "psychomotorisch", label: "psychomotorisch (Fertigkeiten)", merkhilfe: "Hand" },
];

export const STUFEN = [
  { id: "vorbereiten", label: "Stufe 1: Vorbereiten", hinweis: "Auszubildende einstimmen, Vorwissen klären, Ziel nennen, Interesse wecken." },
  { id: "vormachen", label: "Stufe 2: Vormachen und Erklären", hinweis: "Die Tätigkeit in sinnvollen Schritten zeigen und dabei begründen." },
  { id: "nachmachen", label: "Stufe 3: Nachmachen lassen", hinweis: "Die Auszubildenden führen die Tätigkeit aus und erklären dabei; Fehler werden sofort korrigiert." },
  { id: "ueben", label: "Stufe 4: Üben lassen", hinweis: "Die Tätigkeit festigen, das Ergebnis kontrollieren, Rückmeldung geben." },
] as const;

export type StufenId = (typeof STUFEN)[number]["id"];

export interface Feinziel {
  text: string;
  bereich: Lernzielbereich | "";
}

export interface Stufe {
  /** Eingegebene Minuten (Text, damit leere Felder möglich sind). */
  minuten: string;
  inhalt: string;
}

export interface Unterweisungsplan {
  thema: string;
  zielgruppe: string;
  richtziel: string;
  grobziel: string;
  feinziele: Feinziel[];
  /** Verfügbare Zeit für die Unterweisung in Minuten (Prüfungsvorgabe, Standard 15). */
  gesamtMinuten: number;
  stufen: Record<StufenId, Stufe>;
  medien: string;
  lernerfolgskontrolle: string;
}

export function leererPlan(gesamtMinuten = 15): Unterweisungsplan {
  return {
    thema: "",
    zielgruppe: "",
    richtziel: "",
    grobziel: "",
    feinziele: [{ text: "", bereich: "" }],
    gesamtMinuten,
    stufen: {
      vorbereiten: { minuten: "", inhalt: "" },
      vormachen: { minuten: "", inhalt: "" },
      nachmachen: { minuten: "", inhalt: "" },
      ueben: { minuten: "", inhalt: "" },
    },
    medien: "",
    lernerfolgskontrolle: "",
  };
}

/** Neutrales Mustertext-Beispiel zum Ausprobieren (frei erfunden). */
export function beispielPlan(gesamtMinuten = 15): Unterweisungsplan {
  return {
    thema: "Eine Leitung abisolieren und in einer Reihenklemme anschließen",
    zielgruppe: "Auszubildende im ersten Ausbildungsjahr, Grundkenntnisse zu Werkzeug und Arbeitssicherheit sind vorhanden, noch keine Erfahrung mit Reihenklemmen",
    richtziel: "Die Auszubildenden arbeiten an elektrischen Verbindungen sicher und sorgfältig.",
    grobziel: "Die Auszubildenden stellen einfache Leitungsverbindungen fachgerecht her.",
    feinziele: [
      { text: "Die Auszubildenden isolieren eine Leitung mit der Abisolierzange auf 8 Millimeter ab, ohne den Leiter zu beschädigen.", bereich: "psychomotorisch" },
      { text: "Die Auszubildenden begründen, warum die Leitung vor dem Abisolieren spannungsfrei sein muss.", bereich: "kognitiv" },
    ],
    gesamtMinuten,
    stufen: {
      vorbereiten: { minuten: "2", inhalt: "Begrüßung, Ziel nennen, Vorwissen erfragen, Werkzeug bereitlegen, Sicherheitsregel (spannungsfrei) ansprechen." },
      vormachen: { minuten: "4", inhalt: "Leitung abisolieren und in die Klemme einführen, jeden Schritt kurz begründen, kritische Stelle (Länge, Leiter nicht einkerben) betonen." },
      nachmachen: { minuten: "4", inhalt: "Der Auszubildende macht den Vorgang nach und erklärt die Schritte dabei laut; Fehler werden sofort besprochen." },
      ueben: { minuten: "4", inhalt: "Der Auszubildende isoliert zwei weitere Leitungen selbstständig ab; Ergebnis mit Lehre prüfen, Rückmeldung geben, Zusammenfassung." },
    },
    medien: "Original-Werkzeug und Leitungsstücke, Reihenklemme am Übungsbrett, Abisolierlehre",
    lernerfolgskontrolle: "Abisolierlänge mit der Lehre messen, Leiter auf Beschädigung prüfen, Auszubildenden die Begründung der Spannungsfreiheit in eigenen Worten nennen lassen.",
  };
}

// ---------------------------------------------------------------------------
// Prüfungen (Heuristiken)
// ---------------------------------------------------------------------------

export type PlanHinweisArt = "fehlt" | "hinweis" | "ok";

export interface PlanHinweis {
  art: PlanHinweisArt;
  bereich: string;
  text: string;
}

/** Verben, die sich nicht beobachten und prüfen lassen (typische Stolpersteine bei Feinzielen). */
export const NICHT_PRUEFBAR = [
  "wissen", "weiß", "kennen", "kennt", "kenntnis", "kennenlern", "verstehen", "versteht", "begreifen", "begreift", "einsehen", "lernen", "lernt", "vertraut", "bewusst", "schätzen", "würdigen",
  "interesse", "interessieren", "auseinander", "gefühl",
];

/** Wortanfänge überprüfbarer Tätigkeitsverben (Heuristik, keine vollständige Liste). */
export const PRUEFBAR = [
  "beschreib", "nenn", "benenn", "erklär", "erläuter", "begründ", "bedien", "ausführ", "durchführ", "anwend", "herstell", "stell", "mess", "einricht", "vergleich",
  "berechn", "auswähl", "zeig", "demonstrier", "isolier", "montier", "prüf", "kontrollier", "bestimm", "zuordn", "anfertig", "erstell", "einhalt", "verbind", "schließ",
  "bohr", "feil", "säg", "schleif", "löt", "schraub", "wechsel", "füll", "sortier", "ordn", "formulier", "unterscheid", "begrüß", "beraten", "berat", "schreib", "bearbeit",
  "anschließ", "einstell", "reinig", "bestell", "buch", "erfass", "nutz", "wend", "wähl", "entscheid", "identifizier", "lös", "plan", "dokumentier", "übergeb", "übernehm",
  "acht", "beacht", "hör", "frag", "trag", "halt", "meld", "erkenn", "kennzeichn",
];

export function woerter(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-zäöüß]+/)
    .filter((wort) => wort.length > 0);
}

function minutenWert(text: string): number | null {
  const bereinigt = text.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(bereinigt)) return null;
  const wert = Number(bereinigt);
  return Number.isFinite(wert) ? wert : null;
}

export function summeMinuten(plan: Unterweisungsplan): number {
  return STUFEN.reduce((summe, stufe) => summe + (minutenWert(plan.stufen[stufe.id].minuten) ?? 0), 0);
}

export function pruefePlan(plan: Unterweisungsplan): PlanHinweis[] {
  const hinweise: PlanHinweis[] = [];
  const fehlt = (bereich: string, text: string) => hinweise.push({ art: "fehlt", bereich, text });
  const hinweis = (bereich: string, text: string) => hinweise.push({ art: "hinweis", bereich, text });

  if (!plan.thema.trim()) fehlt("Thema", "Es fehlt das Thema der Unterweisung: Eine konkrete, in der Zeit machbare Tätigkeit.");
  if (!plan.zielgruppe.trim()) fehlt("Zielgruppe", "Beschreibe die Zielgruppe: Ausbildungsjahr, Vorkenntnisse, Besonderheiten. Daran hängen Methode und Tempo.");
  if (!plan.richtziel.trim()) hinweis("Ziele", "Ein Richtziel (allgemeine Richtung) fehlt. Es gibt vor, wohin die Ausbildung insgesamt führt.");
  if (!plan.grobziel.trim()) hinweis("Ziele", "Ein Grobziel fehlt. Es konkretisiert den Ausbildungsabschnitt, zu dem die Unterweisung gehört.");

  const gefuellt = plan.feinziele.filter((ziel) => ziel.text.trim() !== "");
  if (gefuellt.length === 0) {
    fehlt("Feinziele", "Es fehlt mindestens ein Feinziel. Es beschreibt, was die Auszubildenden am Ende dieser Unterweisung konkret können.");
  }
  gefuellt.forEach((ziel, index) => {
    const nr = `Feinziel ${index + 1}`;
    const w = woerter(ziel.text);
    const unpruefbar = w.find((wort) => NICHT_PRUEFBAR.some((stamm) => wort.startsWith(stamm)));
    if (unpruefbar) {
      hinweis(nr, `„${unpruefbar}“ lässt sich nicht beobachten oder prüfen. Formuliere mit einem Verb, das man sieht oder hört, zum Beispiel „beschreiben“, „ausführen“, „begründen“.`);
    } else if (!w.some((wort) => PRUEFBAR.some((stamm) => wort.startsWith(stamm)))) {
      hinweis(nr, "Es wurde kein überprüfbares Tätigkeitsverb erkannt (Heuristik). Prüfe, ob man am Ende sehen oder hören kann, dass das Ziel erreicht ist.");
    }
    if (w.length < 6) hinweis(nr, "Das Feinziel ist sehr kurz. Ein gutes Feinziel nennt auch die Bedingung und den Maßstab, zum Beispiel womit und wie genau.");
    if (!ziel.bereich) hinweis(nr, "Ordne das Feinziel einem Lernzielbereich zu (kognitiv, affektiv oder psychomotorisch).");
  });
  if (gefuellt.length > 0 && gefuellt.every((ziel) => ziel.bereich === "kognitiv")) {
    hinweis("Methode", "Alle Feinziele sind kognitiv. Die Vier-Stufen-Methode eignet sich vor allem für Fertigkeiten, bei reinen Wissenszielen kann eine andere Methode besser passen (zum Beispiel Leittext).");
  }
  if (gefuellt.length > 4) hinweis("Feinziele", "Mehr als vier Feinziele sind in einer kurzen Unterweisung kaum zu schaffen. Konzentriere dich auf das Wesentliche.");

  for (const stufe of STUFEN) {
    const eintrag = plan.stufen[stufe.id];
    const min = minutenWert(eintrag.minuten);
    if (!eintrag.inhalt.trim()) fehlt(stufe.label, "Zu dieser Stufe fehlt der Ablauf. Jede der vier Stufen gehört in die Unterweisung.");
    if (min === null || min <= 0) fehlt(stufe.label, "Zu dieser Stufe fehlt die Zeit in Minuten.");
  }

  const summe = summeMinuten(plan);
  if (summe > plan.gesamtMinuten) {
    hinweis("Zeit", `Der Zeitplan summiert sich auf ${formatMinuten(summe)} Minuten, verfügbar sind ${plan.gesamtMinuten}. Kürze, vor allem bei Erklärungen.`);
  } else if (summe > 0 && plan.gesamtMinuten - summe > 2) {
    hinweis("Zeit", `Es bleiben ${formatMinuten(plan.gesamtMinuten - summe)} Minuten der verfügbaren ${plan.gesamtMinuten} Minuten ungeplant. Nutze sie für Üben oder Rückmeldung oder plane einen Puffer ein.`);
  }
  const vormachen = minutenWert(plan.stufen.vormachen.minuten) ?? 0;
  const selbst = (minutenWert(plan.stufen.nachmachen.minuten) ?? 0) + (minutenWert(plan.stufen.ueben.minuten) ?? 0);
  if (vormachen > 0 && selbst > 0 && selbst < vormachen) {
    hinweis("Zeit", "Faustregel, keine Vorgabe: Die Auszubildenden sollten in den Stufen 3 und 4 zusammen mindestens so viel Zeit selbst tätig sein, wie du in Stufe 2 vormachst.");
  }

  if (!plan.medien.trim()) hinweis("Medien", "Es sind keine Medien und Arbeitsmittel genannt. Nenne, was du für jede Stufe bereithältst.");
  if (!plan.lernerfolgskontrolle.trim()) fehlt("Lernerfolgskontrolle", "Es fehlt die Kontrolle des Lernerfolgs. Sie gehört zur Stufe 4: Woran erkennst du, dass die Feinziele erreicht sind?");

  if (hinweise.length === 0) {
    hinweise.push({ art: "ok", bereich: "Gesamt", text: "Keine Auffälligkeiten bei den Prüfpunkten. Das ersetzt nicht die Rückmeldung durch eine Ausbilderin oder einen Ausbilder." });
  }
  return hinweise;
}

function formatMinuten(minuten: number): string {
  return Number.isInteger(minuten) ? String(minuten) : minuten.toFixed(1).replace(".", ",");
}

/** Das Entwurfsblatt als reiner Text (zum Kopieren und Ausdrucken). */
export function entwurfsText(plan: Unterweisungsplan): string {
  const zeilen: string[] = [];
  const feld = (titel: string, wert: string) => zeilen.push(`${titel}: ${wert.trim() || "–"}`);
  zeilen.push("UNTERWEISUNGSENTWURF (Vier-Stufen-Methode)", "");
  feld("Thema", plan.thema);
  feld("Zielgruppe", plan.zielgruppe);
  zeilen.push("", "ZIELE");
  feld("Richtziel", plan.richtziel);
  feld("Grobziel", plan.grobziel);
  plan.feinziele
    .filter((ziel) => ziel.text.trim() !== "")
    .forEach((ziel, index) => {
      const bereich = LERNZIELBEREICHE.find((eintrag) => eintrag.id === ziel.bereich);
      zeilen.push(`Feinziel ${index + 1}${bereich ? ` (${bereich.id})` : ""}: ${ziel.text.trim()}`);
    });
  zeilen.push("", `ZEITPLAN (verfügbar: ${plan.gesamtMinuten} Minuten, geplant: ${formatMinuten(summeMinuten(plan))} Minuten)`);
  for (const stufe of STUFEN) {
    const eintrag = plan.stufen[stufe.id];
    zeilen.push(`${stufe.label} (${eintrag.minuten.trim() || "?"} Min.): ${eintrag.inhalt.trim() || "–"}`);
  }
  zeilen.push("");
  feld("Medien und Arbeitsmittel", plan.medien);
  feld("Lernerfolgskontrolle", plan.lernerfolgskontrolle);
  return zeilen.join("\n");
}
