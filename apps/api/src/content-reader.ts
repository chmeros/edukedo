import { fallaufgabePayloadSchema, kurzantwortPayloadSchema, lueckenPayloadSchema, theoriePayloadSchema } from "@edukedo/shared";

/**
 * Lese-Modus für Kursinhalte (Review UXL-12): bereitet ein Content-Item für die reine Ansicht auf, MIT Lösung. Keine Wertung, kein
 * Fortschritt, kein Schreibzugriff. Bewusst allgemein gehalten: Der Aufbau der gut zwanzig Aufgabentypen wird nicht einzeln
 * nachgebaut; die Lösung steht als Textzeilen da, wo sie aus den Antwortoptionen oder dem Payload hervorgeht, sonst in der Erklärung.
 */
export interface LeseOption {
  text: string;
  isCorrect: boolean;
  groupKey: string | null;
  side: string | null;
  sortOrder: number;
}

export interface LeseItem {
  type: string;
  prompt: string;
  explanation: string | null;
  payload: unknown;
  options: LeseOption[];
}

export interface LeseAnsicht {
  /** Zusätzlicher Text zur Aufgabe (Theorie als Markdown, Lückentext mit Platzhaltern, Teilaufgaben). */
  text: string | null;
  /** Lösung als Zeilen. */
  loesung: string[];
  /** Erklärung bzw. Rückseite der Karteikarte. */
  erklaerung: string | null;
}

function optionenZeilen(type: string, optionen: LeseOption[]): string[] {
  if (optionen.length === 0) return [];
  const sortiert = [...optionen].sort((a, b) => a.sortOrder - b.sortOrder);
  if (type === "sortieren") return sortiert.map((option, index) => `${index + 1}. ${option.text}`);
  // Zuordnung in zwei Spalten: Paare je Schlüssel.
  if (sortiert.some((option) => option.side)) {
    const gruppen = new Map<string, { links: string[]; rechts: string[] }>();
    for (const option of sortiert) {
      const schluessel = option.groupKey ?? option.text;
      const eintrag = gruppen.get(schluessel) ?? { links: [], rechts: [] };
      (option.side === "rechts" ? eintrag.rechts : eintrag.links).push(option.text);
      gruppen.set(schluessel, eintrag);
    }
    return [...gruppen.values()].map((eintrag) => `${eintrag.links.join(", ")} ↔ ${eintrag.rechts.join(", ")}`);
  }
  // Zonen-Aufgaben (SWOT, BSC, …): Begriffe je Zone.
  if (sortiert.every((option) => option.groupKey)) {
    const zonen = new Map<string, string[]>();
    for (const option of sortiert) zonen.set(option.groupKey!, [...(zonen.get(option.groupKey!) ?? []), option.text]);
    return [...zonen.entries()].map(([zone, begriffe]) => `${zone}: ${begriffe.join("; ")}`);
  }
  // Auswahlfragen: richtige Optionen markiert.
  return sortiert.map((option) => `${option.isCorrect ? "✓" : "–"} ${option.text}`);
}

export function leseAnsicht(item: LeseItem): LeseAnsicht {
  const loesung = optionenZeilen(item.type, item.options);
  let text: string | null = null;

  if (item.type === "theorie") {
    const payload = theoriePayloadSchema.safeParse(item.payload);
    if (payload.success) text = payload.data.body_markdown;
  } else if (item.type === "luecken") {
    const payload = lueckenPayloadSchema.safeParse(item.payload);
    if (payload.success) {
      text = payload.data.text_with_blanks;
      for (const lucke of payload.data.blanks) loesung.push(`${lucke.id}: ${lucke.accepted.join(" / ")}`);
    }
  } else if (item.type === "kurzantwort") {
    const payload = kurzantwortPayloadSchema.safeParse(item.payload);
    if (payload.success) loesung.push(...payload.data.accepted_answers.map((antwort) => `Akzeptiert: ${antwort}`));
  } else if (item.type === "fallaufgabe") {
    const payload = fallaufgabePayloadSchema.safeParse(item.payload);
    if (payload.success) text = payload.data.parts.map((teil, index) => `Teilaufgabe ${index + 1} (${teil.points} Punkte): ${teil.prompt}`).join("\n");
  }

  return { text, loesung, erklaerung: item.explanation };
}
