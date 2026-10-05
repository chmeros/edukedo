/**
 * F-165: Erkennung von Fachbegriffen (Glossar) in einem Text — reine Funktion, damit sie ohne Browser
 * testbar ist; Darstellung und Popover stehen in apps/web/src/Fachbegriffe.tsx.
 *
 * Regeln (bewusst konservativ, damit wenig falsch markiert wird):
 *  - Ganzes Wort: davor und danach weder Buchstabe/Ziffer noch Bindestrich (kein Treffer in "Netzplan-
 *    Trainer" oder "Netzplantechnik").
 *  - Groß-/Kleinschreibung egal — außer bei Akronymen (Großbuchstaben/Ziffern, höchstens 6 Zeichen,
 *    z. B. "SQL", "NAT"): dort exakt, ohne Endung.
 *  - Einfache deutsche Endungen (-e, -en, -er, -es, -n, -s) am Ende des Begriffs werden mit erkannt;
 *    unregelmäßige Formen stehen als Alias im Glossar.
 *  - Mehrwortbegriffe: beliebige Leerzeichen zwischen den Wörtern.
 *  - Längster Begriff zuerst; überlappende Treffer fallen weg; je Begriff nur das erste Vorkommen im Text.
 */
export type FachbegriffEintrag = { id: string; term: string; aliases: string[] };
export type TextSegment = { text: string; eintragId: string | null };

const ENDUNGEN = "(?:e|en|er|es|n|s)?";

function maskiere(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((wort) => wort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
}

function normalisiere(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function istAkronym(name: string): boolean {
  return name.length <= 6 && /^[A-ZÄÖÜ0-9][A-ZÄÖÜ0-9-]*$/u.test(name) && /[A-ZÄÖÜ]/u.test(name);
}

export function erstelleFachbegriffSucher(eintraege: FachbegriffEintrag[]): (text: string) => TextSegment[] {
  const normale = new Map<string, string>();
  const akronyme = new Map<string, string>();
  for (const eintrag of eintraege) {
    for (const name of [eintrag.term, ...eintrag.aliases]) {
      if (name.trim() === "") continue;
      if (istAkronym(name.trim())) akronyme.set(name.trim(), eintrag.id);
      else normale.set(normalisiere(name), eintrag.id);
    }
  }

  const baueRegex = (namen: string[], endungen: string, flags: string): RegExp | null =>
    namen.length === 0
      ? null
      : new RegExp(
          `(?<![\\p{L}\\p{N}-])(${[...namen]
            .sort((a, b) => b.length - a.length)
            .map(maskiere)
            .join("|")})${endungen}(?![\\p{L}\\p{N}-])`,
          flags,
        );
  const regexNormal = baueRegex([...normale.keys()], ENDUNGEN, "giu");
  const regexAkronym = baueRegex([...akronyme.keys()], "", "gu");

  return (text) => {
    const treffer: { start: number; ende: number; id: string }[] = [];
    if (regexNormal) {
      for (const match of text.matchAll(regexNormal)) {
        const id = normale.get(normalisiere(match[1]!));
        if (id) treffer.push({ start: match.index!, ende: match.index! + match[0].length, id });
      }
    }
    if (regexAkronym) {
      for (const match of text.matchAll(regexAkronym)) {
        const id = akronyme.get(match[1]!);
        if (id) treffer.push({ start: match.index!, ende: match.index! + match[0].length, id });
      }
    }
    treffer.sort((a, b) => a.start - b.start || b.ende - b.start - (a.ende - a.start));

    const gewaehlt: typeof treffer = [];
    const gesehen = new Set<string>();
    let belegtBis = 0;
    for (const eintrag of treffer) {
      if (eintrag.start < belegtBis || gesehen.has(eintrag.id)) continue;
      gewaehlt.push(eintrag);
      gesehen.add(eintrag.id);
      belegtBis = eintrag.ende;
    }

    const segmente: TextSegment[] = [];
    let position = 0;
    for (const eintrag of gewaehlt) {
      if (eintrag.start > position) segmente.push({ text: text.slice(position, eintrag.start), eintragId: null });
      segmente.push({ text: text.slice(eintrag.start, eintrag.ende), eintragId: eintrag.id });
      position = eintrag.ende;
    }
    if (position < text.length) segmente.push({ text: text.slice(position), eintragId: null });
    return segmente.length > 0 ? segmente : [{ text, eintragId: null }];
  };
}
