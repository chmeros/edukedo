/**
 * Angleichen von Kurzantworten und Lückentext-Antworten vor dem Vergleich (Entscheidung 09.10.2026, Review FL-MA-03).
 *
 * Bis dahin zählte nur dieselbe Zeichenfolge (außer Groß-/Kleinschreibung und Randleerzeichen). Richtige Antworten in anderer
 * Schreibweise („wurzel 10“ statt „√10“, „9 tan 60“ statt „9·tan(60°)“, „x^2“ statt „x²“) galten deshalb als falsch. Die Funktion
 * gleicht deshalb BEIDE Seiten des Vergleichs (die Eingabe und jede akzeptierte Antwort) mit denselben Regeln an; so müssen die
 * Autoren nicht jede Tippvariante aufzählen.
 *
 * Bewusst NICHT angeglichen werden Punkt und Komma bei Zahlen („1.000“ und „1,000“ wären sonst gleich) und die Reihenfolge von
 * Termen. Wörter (außer den unten genannten Schreibweisen) und Ziffern bleiben unverändert, die Funktion ist deshalb für alle Kurse
 * gleichermaßen unbedenklich. Das Ergebnis dient nur dem Vergleich und wird nie angezeigt.
 */

const HOCHZAHLEN: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁻": "-",
  "⁺": "+",
  "ⁿ": "n",
};
const HOCHZAHL_FOLGE = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿ]+/g;

export function normalisiereAntwort(eingabe: string): string {
  let text = eingabe.toLowerCase();

  // Hochgestellte Zeichen → ^Zahl (vor allem anderen, weil sie sich sonst nicht von normalen Ziffern unterscheiden ließen).
  text = text.replace(HOCHZAHL_FOLGE, (folge) => `^${[...folge].map((zeichen) => HOCHZAHLEN[zeichen] ?? zeichen).join("")}`);

  // Minus- und Malzeichen vereinheitlichen.
  text = text.replace(/[−–—‐‑]/g, "-").replace(/[·⋅×∙•]/g, "*").replace(/\*\*/g, "^");

  // Wortschreibweisen: Wurzel, Hochzahl, Pi, Grad. (Grenzen \b gibt es für Umlaute nicht; die Wörter sind reines ASCII.)
  text = text
    .replace(/quadratwurzel\s+aus|wurzel\s+aus|wurzel|sqrt/g, "√")
    .replace(/\bhoch\b/g, "^")
    .replace(/\bpi\b/g, "π");

  // Gradzeichen und das Wort „Grad“ nach einer Zahl entfallen (45°, 45 grad und 45 meinen dasselbe).
  text = text.replace(/[°º˚]/g, "").replace(/(\d)\s*grad\b/g, "$1");

  // Alle Leerraumzeichen entfallen („15 %“ = „15%“, „x = 4“ = „x=4“).
  text = text.replace(/\s+/g, "");

  // Klammern um einen einfachen Operanden entfallen: √(10) = √10, tan(60) = tan60, 2^(10) = 2^10. Bei zusammengesetzten
  // Ausdrücken bleiben sie stehen: √(a+b) ist etwas anderes als √a+b.
  text = text
    .replace(/√\(([0-9a-zπ.,]+)\)/g, "√$1")
    .replace(/(sin|cos|tan|ln|log)\(([0-9a-zπ.,]+)\)/g, "$1$2")
    .replace(/\^\((-?[0-9a-z.,]+)\)/g, "^$1");

  // Das Malzeichen vor Buchstaben, Wurzel, Pi oder Klammer und nach Buchstaben entfällt (9*tan = 9tan, 10*√2 = 10√2); zwischen zwei Zahlen
  // bleibt es („2*3“ ist nicht „23“).
  text = text.replace(/\*(?=[a-zπ√(])/g, "").replace(/(?<=[a-zπ√)])\*/g, "");

  return text;
}
