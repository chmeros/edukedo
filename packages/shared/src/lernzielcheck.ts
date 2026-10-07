import { NICHT_PRUEFBAR, PRUEFBAR, woerter, type Lernzielbereich } from "./unterweisungsplan";

/**
 * F-203 (Lernziel-Check, siehe Architekturplanung Abschnitt 13): regelbasierte Hinweise zu einem frei formulierten
 * Feinziel (Kursprofil W-AEV-02) und eine Übung, an Beispielen überprüfbare von nicht überprüfbaren Feinzielen zu
 * unterscheiden und sie einem Lernzielbereich zuzuordnen. Kein KI-Einsatz, nur Wortlisten (Heuristiken zur
 * Selbstkontrolle, keine Bewertung). Die Verbliste teilt sich der Check mit dem Unterweisungs-Planer (F-200).
 */

export type CheckKriterium = "Tätigkeitsverb" | "Überprüfbarkeit" | "Bedingung" | "Maßstab" | "Lernzielbereich" | "Umfang";

export interface CheckErgebnis {
  kriterium: CheckKriterium;
  /** true: kein Hinweis nötig; false: Hinweis zur Überarbeitung. */
  erfuellt: boolean;
  text: string;
}

/** Ganze Wörter für Bedingungen („womit, unter welchen Umständen“); „mit“ allein, damit „Mitarbeiter“ kein Treffer ist. */
const BEDINGUNG = ["mit", "mithilfe", "mittels", "anhand", "unter", "ohne", "nach", "gemäß", "laut", "gegeben", "bei", "gegenüber"];

/** Wörter und Wortanfänge für Maßstäbe („wie gut, wie genau, wie schnell“). Zahlen zählen ebenfalls. */
const MASSSTAB = [
  "fehlerfrei", "vollständig", "korrekt", "richtig", "mindestens", "höchstens", "maximal", "innerhalb", "genau", "zeitgerecht", "maßhaltig", "toleranz", "prozent", "minute", "sekunde",
  "stunde", "jedes", "immer", "selbstständig", "selbständig",
];

/** Zahlwörter als Maßstab („drei Kriterien“, „fünf Beispiele“). */
const ZAHLWOERTER = ["zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "einmal", "zweimal", "dreimal"];

const BEREICH_VERBEN: Record<Lernzielbereich, string[]> = {
  psychomotorisch: ["bohr", "feil", "säg", "schleif", "löt", "schraub", "montier", "bedien", "herstell", "einricht", "einstell", "wechsel", "reinig", "anschließ", "füll", "anfertig", "bearbeit"],
  kognitiv: [
    "nenn", "benenn", "beschreib", "erklär", "erläuter", "begründ", "berechn", "vergleich", "unterscheid", "zuordn", "bestimm", "identifizier", "definier", "analysier", "beurteil", "bewert",
    "aufzähl", "erkenn", "ermittel",
  ],
  affektiv: ["beacht", "achte", "hör", "respektier", "wertschätz", "akzeptier", "unterstütz", "übernimmt", "verantwort", "rücksicht"],
};

const BEREICH_ORDNUNG: Lernzielbereich[] = ["psychomotorisch", "kognitiv", "affektiv"];

export const BEREICH_LABEL: Record<Lernzielbereich, string> = {
  kognitiv: "kognitiv (Wissen und Denken)",
  affektiv: "affektiv (Einstellungen und Haltungen)",
  psychomotorisch: "psychomotorisch (Fertigkeiten)",
};

/** Schlägt anhand des ersten erkannten Verbs einen Lernzielbereich vor (Heuristik); null, wenn kein Verb erkannt wird. */
export function schlageBereichVor(text: string): { bereich: Lernzielbereich; verb: string } | null {
  for (const wort of woerter(text)) {
    for (const bereich of BEREICH_ORDNUNG) {
      if (BEREICH_VERBEN[bereich].some((stamm) => wort.startsWith(stamm))) return { bereich, verb: wort };
    }
  }
  return null;
}

function hatWortanfang(w: string[], liste: string[]): string | undefined {
  return w.find((wort) => liste.some((stamm) => wort.startsWith(stamm)));
}

/** Prüft ein Feinziel nach sechs Kriterien. Eine leere Eingabe ergibt eine leere Liste. */
export function pruefeLernziel(text: string, bereich: Lernzielbereich | ""): CheckErgebnis[] {
  if (text.trim() === "") return [];
  const w = woerter(text);
  const ergebnisse: CheckErgebnis[] = [];

  const unpruefbar = w.find((wort) => NICHT_PRUEFBAR.some((stamm) => wort.startsWith(stamm)));
  const pruefbarVerb = hatWortanfang(w, PRUEFBAR);
  if (unpruefbar) {
    ergebnisse.push({
      kriterium: "Überprüfbarkeit",
      erfuellt: false,
      text: `„${unpruefbar}“ lässt sich nicht beobachten oder prüfen. Ersetze es durch ein Verb, das man sieht oder hört, zum Beispiel „beschreibt“, „bohrt“ oder „begründet“.`,
    });
  } else {
    ergebnisse.push({ kriterium: "Überprüfbarkeit", erfuellt: true, text: "Kein Wort aus der Liste nicht überprüfbarer Verben gefunden (Heuristik)." });
  }
  ergebnisse.push(
    pruefbarVerb
      ? { kriterium: "Tätigkeitsverb", erfuellt: true, text: `Ein Tätigkeitsverb wurde erkannt: „${pruefbarVerb}“.` }
      : {
          kriterium: "Tätigkeitsverb",
          erfuellt: false,
          text: "Es wurde kein Tätigkeitsverb erkannt (Heuristik, die Liste ist nicht vollständig). Prüfe, ob man am Ende sehen oder hören kann, dass das Ziel erreicht ist.",
        },
  );

  const bedingung = w.find((wort) => BEDINGUNG.includes(wort));
  ergebnisse.push(
    bedingung
      ? { kriterium: "Bedingung", erfuellt: true, text: `Eine Bedingung ist erkennbar („${bedingung}“): womit oder unter welchen Umständen die Handlung geschieht.` }
      : { kriterium: "Bedingung", erfuellt: false, text: "Es ist keine Bedingung erkennbar. Nenne, womit oder unter welchen Umständen die Handlung ausgeführt wird, zum Beispiel „mit einer Checkliste“." },
  );

  const zahlwort = w.find((wort) => ZAHLWOERTER.includes(wort));
  const massstab = /\d/.test(text) ? "Zahl" : (zahlwort ?? hatWortanfang(w, MASSSTAB));
  ergebnisse.push(
    massstab
      ? { kriterium: "Maßstab", erfuellt: true, text: `Ein Maßstab ist erkennbar („${massstab}“): woran man erkennt, dass die Handlung gut genug war.` }
      : { kriterium: "Maßstab", erfuellt: false, text: "Es ist kein Maßstab erkennbar. Nenne, woran man „gut genug“ erkennt, zum Beispiel eine Genauigkeit, eine Zeit oder „ohne Fehler“." },
  );

  const vorschlag = schlageBereichVor(text);
  if (bereich) {
    if (vorschlag && vorschlag.bereich !== bereich) {
      ergebnisse.push({
        kriterium: "Lernzielbereich",
        erfuellt: false,
        text: `Du hast „${BEREICH_LABEL[bereich]}“ gewählt. Das Verb „${vorschlag.verb}“ spricht eher für „${BEREICH_LABEL[vorschlag.bereich]}“ (Heuristik). Prüfe, welche Art von Leistung verlangt wird.`,
      });
    } else {
      ergebnisse.push({ kriterium: "Lernzielbereich", erfuellt: true, text: `Zugeordnet zu „${BEREICH_LABEL[bereich]}“.` });
    }
  } else if (vorschlag) {
    ergebnisse.push({
      kriterium: "Lernzielbereich",
      erfuellt: false,
      text: `Noch nicht zugeordnet. Das Verb „${vorschlag.verb}“ spricht eher für „${BEREICH_LABEL[vorschlag.bereich]}“ (Heuristik). Entscheide selbst, welche Art von Leistung verlangt wird.`,
    });
  } else {
    ergebnisse.push({ kriterium: "Lernzielbereich", erfuellt: false, text: "Noch nicht zugeordnet. Frage dich: Soll gewusst, getan oder gefühlt (eine Haltung gezeigt) werden?" });
  }

  const undAnzahl = w.filter((wort) => wort === "und").length;
  const mehrere = undAnzahl >= 2 || w.includes("sowie") || w.includes("außerdem");
  ergebnisse.push(
    mehrere
      ? { kriterium: "Umfang", erfuellt: false, text: "Das Feinziel enthält womöglich mehrere Handlungen. Ein Feinziel beschreibt eine einzelne Handlung; teile es gegebenenfalls auf." }
      : { kriterium: "Umfang", erfuellt: true, text: "Es sieht nach einer einzelnen Handlung aus." },
  );
  if (w.length < 6) {
    const index = ergebnisse.findIndex((eintrag) => eintrag.kriterium === "Umfang");
    ergebnisse[index] = { kriterium: "Umfang", erfuellt: false, text: "Das Feinziel ist sehr kurz. Ein gutes Feinziel sagt, wer was womit und wie gut tut." };
  }
  return ergebnisse;
}

// ---------------------------------------------------------------------------------------------------------------
// Übung

export interface Uebungsziel {
  id: string;
  text: string;
  pruefbar: boolean;
  /** Nur bei überprüfbaren Zielen gefragt. */
  bereich?: Lernzielbereich;
  erklaerung: string;
  /** Eine überprüfbare Fassung, bei nicht überprüfbaren Zielen. */
  besser?: string;
}

export const UEBUNGSZIELE: Uebungsziel[] = [
  {
    id: "stufen-beschreiben",
    text: "Die Auszubildende beschreibt die vier Stufen der Unterweisung mit eigenen Worten.",
    pruefbar: true,
    bereich: "kognitiv",
    erklaerung: "Das Verb „beschreibt“ lässt sich hören und prüfen. Verlangt wird Wissen, das in Worten wiedergegeben wird.",
  },
  {
    id: "bohren",
    text: "Der Auszubildende bohrt mit der Ständerbohrmaschine ein Loch von 8 mm Durchmesser rechtwinklig in ein Flachstahlstück, die Abweichung beträgt höchstens 0,5 mm.",
    pruefbar: true,
    bereich: "psychomotorisch",
    erklaerung: "Handlung, Bedingung (Maschine) und Maßstab (höchstens 0,5 mm) stehen im Ziel. Verlangt wird eine Fertigkeit.",
  },
  {
    id: "schutzbrille",
    text: "Die Auszubildende achtet bei Arbeiten am Schleifbock jedes Mal selbstständig darauf, die Schutzbrille zu tragen.",
    pruefbar: true,
    bereich: "affektiv",
    erklaerung: "Man kann beobachten, ob die Schutzbrille ohne Erinnerung getragen wird. Verlangt wird eine Haltung, hier ein Sicherheitsbewusstsein, das sich im Verhalten zeigt.",
  },
  {
    id: "lagerbestand",
    text: "Der Auszubildende berechnet aus Anfangs- und Endbestand den durchschnittlichen Lagerbestand.",
    pruefbar: true,
    bereich: "kognitiv",
    erklaerung: "Das Ergebnis der Rechnung ist prüfbar. Verlangt wird Denken und Rechnen, also der kognitive Bereich.",
  },
  {
    id: "loeten",
    text: "Der Auszubildende lötet ein Bauteil an die Platine, ohne dass eine kalte Lötstelle entsteht.",
    pruefbar: true,
    bereich: "psychomotorisch",
    erklaerung: "Das Ergebnis lässt sich ansehen. Verlangt wird eine handwerkliche Fertigkeit.",
  },
  {
    id: "pausen",
    text: "Die Auszubildende beachtet die vereinbarten Pausenzeiten und meldet sich bei einer Verspätung ab.",
    pruefbar: true,
    bereich: "affektiv",
    erklaerung: "Zuverlässigkeit zeigt sich im beobachtbaren Verhalten. Verlangt wird eine Haltung.",
  },
  {
    id: "zieleunterscheiden",
    text: "Der Auszubildende unterscheidet an fünf Beispielen Richtziel, Grobziel und Feinziel.",
    pruefbar: true,
    bereich: "kognitiv",
    erklaerung: "Die Zuordnung der fünf Beispiele ist prüfbar. Verlangt wird begriffliches Wissen.",
  },
  {
    id: "regalfaecher",
    text: "Die Auszubildende füllt fünf Regalfächer nach dem Prinzip „first in, first out“ ohne Fehler auf.",
    pruefbar: true,
    bereich: "psychomotorisch",
    erklaerung: "Man sieht, ob die Ware richtig eingeräumt ist. Verlangt wird eine praktische Fertigkeit.",
  },
  {
    id: "zuhoeren",
    text: "Der Auszubildende hört bei Rückmeldungen aufmerksam zu und fragt bei Unklarheiten nach.",
    pruefbar: true,
    bereich: "affektiv",
    erklaerung: "Zuhören und Nachfragen sind beobachtbar. Verlangt wird eine Haltung im Umgang mit Rückmeldungen.",
  },
  {
    id: "schraubendreher",
    text: "Der Auszubildende weiß, wie ein Schraubendreher benutzt wird.",
    pruefbar: false,
    erklaerung: "„Wissen“ lässt sich nicht beobachten: Man sieht nur, was jemand sagt oder tut.",
    besser: "Der Auszubildende wählt aus fünf Schraubendrehern den passenden für eine Kreuzschlitzschraube aus und begründet seine Wahl.",
  },
  {
    id: "sorgfaeltig",
    text: "Die Auszubildende lernt, sorgfältig zu arbeiten.",
    pruefbar: false,
    erklaerung: "„Lernt“ beschreibt den Vorgang, nicht das erreichte Verhalten. Woran erkennt man „sorgfältig“?",
    besser: "Die Auszubildende prüft ihr Werkstück vor der Abgabe anhand einer Checkliste und korrigiert gefundene Fehler.",
  },
  {
    id: "sicherheitsregeln",
    text: "Der Auszubildende kennt die Sicherheitsregeln an der Bohrmaschine.",
    pruefbar: false,
    erklaerung: "„Kennt“ lässt sich nicht beobachten. Man kann aber nachfragen und beobachten.",
    besser: "Der Auszubildende nennt die vier Sicherheitsregeln an der Bohrmaschine und wendet sie bei der Übung an.",
  },
  {
    id: "rueckmeldung",
    text: "Die Auszubildende versteht, warum Rückmeldungen im Team wichtig sind.",
    pruefbar: false,
    erklaerung: "„Versteht“ steckt im Kopf. Beobachtbar wird es, wenn die Person es erklärt oder zeigt.",
    besser: "Die Auszubildende begründet in zwei Sätzen, warum Rückmeldungen im Team wichtig sind.",
  },
  {
    id: "interesse",
    text: "Der Auszubildende soll Interesse an der Arbeit mit Zahlen entwickeln.",
    pruefbar: false,
    erklaerung: "Interesse ist eine innere Haltung. Beobachtbar ist, was jemand daraus tut.",
    besser: "Der Auszubildende bearbeitet freiwillig eine zusätzliche Rechenaufgabe und stellt dazu mindestens eine Frage.",
  },
  {
    id: "gefuehl",
    text: "Die Auszubildende hat ein Gefühl für gute Kundenberatung.",
    pruefbar: false,
    erklaerung: "Ein „Gefühl“ lässt sich weder sehen noch prüfen.",
    besser: "Die Auszubildende führt ein Beratungsgespräch im Rollenspiel und erfragt dabei mindestens drei Kundenwünsche.",
  },
  {
    id: "kasse",
    text: "Der Auszubildende ist mit der Bedienung der Kasse vertraut.",
    pruefbar: false,
    erklaerung: "„Vertraut sein“ ist nicht beobachtbar. Besser beschreibt man, was er an der Kasse tut.",
    besser: "Der Auszubildende bedient die Kasse beim Verkauf von fünf Artikeln fehlerfrei und erstellt den Bon.",
  },
];

/** Zieht eine Übungsrunde mit mindestens zwei überprüfbaren und zwei nicht überprüfbaren Zielen, gemischt. */
export function zieheUebungsrunde(zufall: () => number = Math.random, anzahl = 5): Uebungsziel[] {
  const mischen = <T>(liste: T[]): T[] => {
    const kopie = [...liste];
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.min(i, Math.floor(zufall() * (i + 1)));
      [kopie[i], kopie[j]] = [kopie[j]!, kopie[i]!];
    }
    return kopie;
  };
  const pruefbar = mischen(UEBUNGSZIELE.filter((ziel) => ziel.pruefbar));
  const unpruefbar = mischen(UEBUNGSZIELE.filter((ziel) => !ziel.pruefbar));
  const nUnpruefbar = Math.min(unpruefbar.length, 2 + Math.floor(zufall() * (anzahl - 3)));
  const runde = [...unpruefbar.slice(0, nUnpruefbar), ...pruefbar.slice(0, anzahl - nUnpruefbar)];
  return mischen(runde);
}
