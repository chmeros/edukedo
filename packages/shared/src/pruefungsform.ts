/**
 * Prüfungsform der Fachgesprächsfragen eines Fachgebiets (Entscheidung 13.10.2026, Architekturplanung Abschnitt 13).
 *
 * Die Verordnung über die Prüfung zum Geprüften Technischen Fachwirt (TechFachwPrV) kennt zwei mündliche Formen:
 * - die **mündliche Ergänzungsprüfung** in den wirtschaftsbezogenen (§ 4 Abs. 6, WQ) und technischen (§ 5 Abs. 5, TQ)
 *   Qualifikationen, die nur angeboten wird, wenn in höchstens einem Bereich „mangelhaft“ erreicht wurde, und
 * - das **situationsbezogene Fachgespräch mit Präsentation** im Teil Handlungsspezifische Qualifikationen (§ 3 Abs. 6,
 *   HQ), eine reguläre Prüfungsleistung; der Schwerpunkt soll nach § 3 Abs. 6 auf § 3 Abs. 4 Nr. 1 und 2 liegen, also auf den
 *   Handlungsbereichen „Absatz-, Materialwirtschaft und Logistik“ (HQ1) und „Produktionsplanung, -steuerung und -kontrolle“ (HQ2).
 *   (Korrektur 13.10.2026: Der Schwerpunkt wurde zuerst irrtümlich bei „Führung und Zusammenarbeit“ gesehen; das ist § 6 Abs. 4.)
 *
 * Die Zuordnung steht hier und nicht im Frontmatter oder Payload der Fragen, weil sie aus der Verordnung folgt und beim
 * Bearbeiten im Admin-Editor und beim Export sonst verloren ginge.
 */

export type PruefungsformArt = "ergaenzungspruefung" | "fachgespraech";

export interface FachgespraechPruefungsform {
  art: PruefungsformArt;
  /** Kurzer Titel für die Anzeige, z. B. „Mündliche Ergänzungsprüfung“. */
  titel: string;
  /** Übliche Höchstdauer in Minuten laut Verordnung („in der Regel nicht länger als“ bzw. „soll nicht länger dauern als“). */
  dauerMinuten: number;
  /** Fundstelle in der Verordnung. */
  quelle: string;
  /** Erklärender Satz für Lernende (Anrede „du“). */
  hinweis: string;
}

const TECHNISCHER_FACHWIRT = "technischer-fachwirt";

const HAFTUNGSHINWEIS = "Maßgeblich ist die Prüfungsordnung deiner Kammer.";

const ERGAENZUNG_WQ: FachgespraechPruefungsform = {
  art: "ergaenzungspruefung",
  titel: "Mündliche Ergänzungsprüfung",
  dauerMinuten: 15,
  quelle: "§ 4 Abs. 6 TechFachwPrV",
  hinweis:
    "Diese Frage übt die mündliche Ergänzungsprüfung. Sie wird angeboten, wenn die schriftliche Leistung in einem Bereich mit „mangelhaft“ bewertet wurde. " +
    "Sie ist anwendungsbezogen und dauert in der Regel höchstens 15 Minuten; die schriftliche Leistung zählt doppelt. " +
    HAFTUNGSHINWEIS,
};

const ERGAENZUNG_TQ: FachgespraechPruefungsform = {
  art: "ergaenzungspruefung",
  titel: "Mündliche Ergänzungsprüfung",
  dauerMinuten: 20,
  quelle: "§ 5 Abs. 5 TechFachwPrV",
  hinweis:
    "Diese Frage übt die mündliche Ergänzungsprüfung. Sie wird angeboten, wenn die schriftliche Leistung in einem Bereich mit „mangelhaft“ bewertet wurde. " +
    "Sie ist anwendungsbezogen und dauert in der Regel höchstens 20 Minuten; die schriftliche Leistung zählt doppelt. " +
    HAFTUNGSHINWEIS,
};

const FACHGESPRAECH_HQ: FachgespraechPruefungsform = {
  art: "fachgespraech",
  titel: "Fachgespräch mit Präsentation",
  dauerMinuten: 30,
  quelle: "§ 3 Abs. 6 TechFachwPrV",
  hinweis:
    "Diese Frage übt das situationsbezogene Fachgespräch. Es ist eine reguläre Prüfungsleistung der Handlungsspezifischen Qualifikationen und soll höchstens 30 Minuten dauern. " +
    HAFTUNGSHINWEIS,
};

const FACHGESPRAECH_HQ12: FachgespraechPruefungsform = {
  ...FACHGESPRAECH_HQ,
  hinweis:
    "Diese Frage übt das situationsbezogene Fachgespräch. Es soll höchstens 30 Minuten dauern; der Schwerpunkt liegt nach der Verordnung auf den Handlungsbereichen Absatz-, Materialwirtschaft und Logistik sowie Produktionsplanung, -steuerung und -kontrolle. " +
    HAFTUNGSHINWEIS,
};

/**
 * Prüfungsform für ein Fachgebiet, oder `null`, wenn für den Kurs keine Zuordnung hinterlegt ist (dann zeigt der Trainer
 * nichts an). Bisher nur für den Kurs „Geprüfter Technischer Fachwirt“.
 */
export function fachgespraechPruefungsform(kursSlug: string, fachgebietCode: string): FachgespraechPruefungsform | null {
  if (kursSlug !== TECHNISCHER_FACHWIRT) return null;
  const code = fachgebietCode.trim().toUpperCase();
  if (/^WQ[1-4]$/.test(code)) return ERGAENZUNG_WQ;
  if (/^TQ[1-3]$/.test(code)) return ERGAENZUNG_TQ;
  if (code === "HQ1" || code === "HQ2") return FACHGESPRAECH_HQ12;
  if (code === "HQ3" || code === "HQ4") return FACHGESPRAECH_HQ;
  return null;
}
