import type { ZodIssue } from "zod";

/**
 * Review UXL-08/WEB-14: tRPC reicht den Zod-Fehler als JSON-Text des Issue-Arrays an den Client, die Oberfläche zeigte ihn roh und
 * auf Englisch an ("String must contain at most 100 character(s)"). Dieses Modul übersetzt die Issues in kurze deutsche Sätze.
 * Eigene Meldungen der Schemas (`custom`, `refine` mit deutschem Text) bleiben unverändert.
 */

/** Anzeigename des Feldes, soweit bekannt; sonst wird kein Feldname genannt. */
const FELDNAMEN: Record<string, string> = {
  email: "Die E-Mail-Adresse",
  parentEmail: "Die E-Mail-Adresse des Elternteils",
  password: "Das Passwort",
  displayName: "Der Name",
  name: "Der Name",
  code: "Der Code",
  token: "Der Link",
  note: "Der Text",
  noteText: "Der Text",
  reason: "Der Text",
  text: "Der Text",
  birthDate: "Das Geburtsdatum",
  title: "Der Titel",
  count: "Die Anzahl",
  questionCount: "Die Anzahl der Fragen",
};

function feld(issue: ZodIssue): string {
  const letzter = [...issue.path].reverse().find((teil) => typeof teil === "string") as string | undefined;
  return (letzter && FELDNAMEN[letzter]) || "Die Eingabe";
}

function einheit(art: string, anzahl: number): string {
  if (art === "string") return anzahl === 1 ? "Zeichen" : "Zeichen";
  if (art === "array") return anzahl === 1 ? "Eintrag" : "Einträge";
  return "";
}

/** Zods eigene englische Standardtexte; alles andere hat ein Schema selbst formuliert (deutsch) und bleibt unverändert. */
const ZOD_STANDARDTEXT = /^(Invalid|Required|Expected|String must|Number must|Array must|Too |Unrecognized|Input |Expected )/;

export function zodIssueDe(issue: ZodIssue): string {
  if (!ZOD_STANDARDTEXT.test(issue.message)) return issue.message;
  switch (issue.code) {
    case "invalid_type":
      return issue.received === "undefined" || issue.received === "null" ? `${feld(issue)} fehlt.` : `${feld(issue)} hat ein ungültiges Format.`;
    case "too_small": {
      if (issue.type === "string") {
        return issue.minimum === 1 ? `${feld(issue)} darf nicht leer sein.` : `${feld(issue)} ist zu kurz (mindestens ${issue.minimum} Zeichen).`;
      }
      if (issue.type === "array") return `${feld(issue)} braucht mindestens ${issue.minimum} ${einheit("array", Number(issue.minimum))}.`;
      return `${feld(issue)} ist zu klein (mindestens ${issue.minimum}).`;
    }
    case "too_big": {
      if (issue.type === "string") return `${feld(issue)} ist zu lang (höchstens ${issue.maximum} Zeichen).`;
      if (issue.type === "array") return `${feld(issue)} darf höchstens ${issue.maximum} ${einheit("array", Number(issue.maximum))} enthalten.`;
      return `${feld(issue)} ist zu groß (höchstens ${issue.maximum}).`;
    }
    case "invalid_string":
      if (issue.validation === "email") return "Bitte gib eine gültige E-Mail-Adresse ein.";
      if (issue.validation === "url") return `${feld(issue)} ist keine gültige Adresse (URL).`;
      if (issue.validation === "uuid") return `${feld(issue)} hat ein ungültiges Format.`;
      return `${feld(issue)} hat ein ungültiges Format.`;
    case "invalid_enum_value":
    case "invalid_literal":
    case "invalid_union":
    case "invalid_union_discriminator":
      return `${feld(issue)} enthält einen nicht erlaubten Wert.`;
    case "invalid_date":
      return `${feld(issue)} ist kein gültiges Datum.`;
    case "not_multiple_of":
    case "not_finite":
      return `${feld(issue)} ist keine gültige Zahl.`;
    case "unrecognized_keys":
      return "Die Anfrage enthält unbekannte Angaben.";
    case "custom":
    default:
      // Eigene Texte der Schemas sind bereits deutsch.
      return issue.message;
  }
}

/** Fasst alle Issues zu einem lesbaren Text zusammen (erste vier, ohne Wiederholungen). */
export function zodIssuesDe(issues: ZodIssue[]): string {
  const texte = [...new Set(issues.map(zodIssueDe))];
  return texte.slice(0, 4).join(" ") + (texte.length > 4 ? " …" : "");
}
