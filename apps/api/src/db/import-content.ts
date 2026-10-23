import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { isCliEntry } from "./cli-entry";
import { contentDir } from "./content-dir";
import { and, eq } from "drizzle-orm";
import { KURS_ANGEBOT } from "@edukedo/shared";
import { db, pool } from "./client";
import { buildDesiredItems } from "./content-desired";
import { validateContentDir } from "./content-keys";
import { extractSection, parseGlossar, splitFrontmatter } from "./content-parser";
import { statsFromPlan, syncThemaItems, type SyncStats } from "./content-sync";
import { type DesiredItem, planSync } from "./content-sync-plan";
import { fachgebiet, glossarEintrag, kurs, thema } from "./schema";

/**
 * Bulk-Import des Content-Zwischenformats (siehe content/README.md im Repo-Root) — löst das
 * manuelle Iteration-0-Provisorium (db/seed.ts, rein technischer Platzhalter-Content) für den
 * Fachwirt-Piloten ab. Kein generischer YAML-Parser: Die quelle-Zeile im Frontmatter enthält
 * verschachtelte Anführungszeichen ("...„..."..."), die kein striktes YAML sind — ein einfacher
 * Key:Value-Zeilenparser für die bekannten Frontmatter-Felder ist robuster als ein YAML-Parser,
 * der daran scheitern würde. Siehe Architekturplanung Abschnitt 13.
 *
 * fallaufgaben.md/uebungsaufgaben.md (F-23) und fachgespraech.md (F-25) werden seit dem
 * 16.09.2026 importiert (siehe unten und Architekturplanung Abschnitt 13) — beide lagen vorher
 * bewusst ungenutzt, solange die zugehörigen Features im Code noch nicht existierten.
 */
const CONTENT_DIR = contentDir();

interface KursMeta {
  title: string;
  type: string;
  isPublished: boolean;
  metadata: Record<string, unknown>;
}

/**
 * Kursmetadaten je kurs_slug — das Frontmatter-Format (siehe content/README.md) sieht dafür
 * bewusst kein eigenes Feld vor (jede Thema-Datei kennt nur ihr eigenes Fachgebiet/Thema,
 * nicht den Gesamtkurs). Unbekannte Slugs fallen auf einen sicheren Default zurück
 * (`isPublished: false`) statt den Import abzubrechen — ein neuer Kurs soll nie unbeabsichtigt
 * sofort live gehen.
 *
 * mathematik-9: bewusst `isPublished: false` (Entwicklungsplan Iteration 3, "zunächst mit
 * is_published = false") — der Schulfach-Kurs darf laut Architekturplanung erst live gehen,
 * nachdem das Redaktionsteam den ersten Themenblock als fertig eingestuft hat, nicht
 * automatisch mit dem Import. Das Veröffentlichen bleibt ein bewusster, separater Schritt.
 *
 * metadata.zielgruppe (F-13, siehe course-audience.ts und Architekturplanung Abschnitt 13):
 * Der Fachwirt-Kurs richtet sich fachlich an Berufstätige (AGG, BetrVG, Personalführung) und
 * ist daher für Minderjährige ausgeblendet. Mathematik-9 bleibt bewusst ohne dieses Feld
 * ("alle") — ein Erwachsener, der Schulstoff auffrischen möchte, ist kein Schutzproblem in die
 * andere Richtung, nur der Fachwirt-Kurs für Minderjährige war der beobachtete Missstand.
 *
 * metadata.kategorie (F-102, siehe course-audience.ts): steuert die Belegungs-Exklusivität aus
 * F-102 — nur Kurse der Kategorie "erwachsenenbildung" (aktuell: der Fachwirt-Pilot) beschränken
 * F-09 auf de facto eine aktive Belegung gleichzeitig. Mathematik-9 trägt "schule" (unverändert
 * mehrfach belegbar); der technische Demo-Kurs bleibt bewusst unkategorisiert.
 */
/**
 * F-149/F-150 (Prüfungsbereiche und Präsentationsdauer der Fachinformatiker-Kurse, Nutzer-Vorgabe
 * vom 05.10.2026, siehe Architekturplanung Abschnitt 13). Dauern und Bereichsnamen nach FIAusbV
 * (live gegen gesetze-im-internet.de/fiausbv/ geprüft): Teil 1 "Einrichten eines IT-gestützten
 * Arbeitsplatzes" 90 Min. für alle Fachrichtungen; Teil 2 je Fachrichtung zwei schriftliche
 * Prüfungsbereiche à 90 Min. plus WiSo 60 Min.; Präsentation höchstens 15 Min. (Präsentation +
 * Fachgespräch insgesamt höchstens 30 Min.). Die Zuordnung der Fachgebiete (`fachgebiet.code`) zu den
 * Prüfungsbereichen ist eine didaktische Zuordnung dieser Plattform, keine amtliche Vorgabe: Teil 1
 * deckt die Berufsbildpositionen der ersten 18 Monate ab (FU1/FU2/FU3/FU6), die Projekt-Fachgebiete
 * (AE5/SI5/DP5/DV5) gehören zur mündlichen Prüfung (Präsentation/Fachgespräch), nicht zur schriftlichen.
 */
const FI_TEIL1 = {
  key: "teil1",
  title: "Einrichten eines IT-gestützten Arbeitsplatzes",
  part: "Teil 1",
  minutes: 90,
  fachgebietCodes: ["FU1", "FU2", "FU3", "FU6"],
};
const FI_WISO = {
  key: "wiso",
  title: "Wirtschafts- und Sozialkunde",
  part: "Teil 2",
  minutes: 60,
  fachgebietCodes: ["FU7"],
};
function fachinformatikMetadata(
  projektStunden: number,
  bereiche: { key: string; title: string; minutes: number; fachgebietCodes: string[] }[],
) {
  return {
    // F-154: Stichpunkte für die Hilfeseite "Gelassen bleiben" (Prüfungsablauf nach FIAusbV, Gewichte als
    // Anteil an der Gesamtnote).
    pruefungsablauf: [
      "Die Abschlussprüfung ist gestreckt: Teil 1 findet im vierten Ausbildungshalbjahr statt und zählt 20 % der Gesamtnote, Teil 2 folgt am Ende der Ausbildung.",
      "Teil 1 ist schriftlich und dauert 90 Minuten (Prüfungsbereich: Einrichten eines IT-gestützten Arbeitsplatzes).",
      "Teil 2 besteht aus zwei schriftlichen Prüfungsbereichen (je 90 Minuten, je 10 % der Gesamtnote) und Wirtschafts- und Sozialkunde (60 Minuten, 10 %).",
      `Dazu kommt ein betriebliches Projekt (höchstens ${projektStunden} Stunden) mit Dokumentation, einer Präsentation von höchstens 15 Minuten und einem Fachgespräch — zusammen 50 % der Gesamtnote. Präsentation und Fachgespräch dauern gemeinsam höchstens 30 Minuten.`,
      "Das Fachgespräch bezieht sich auf dein Projekt: Du erklärst, was du getan hast und warum — es ist kein Abfragen von Auswendiggelerntem.",
    ],
    zielgruppe: "erwachsene",
    kategorie: "erwachsenenbildung",
    presentationMinutes: 15,
    // F-161: betriebliches Projekt (Stundenobergrenze nach FIAusbV) — schaltet den Reiter "Projekt" frei.
    projekt: { stunden: projektStunden },
    // F-163: Netzplan-Trainer im Instrumente-Tab (Projektplanung gehört zu FU1 aller Fachinformatiker-Kurse);
    // F-166: Subnetting-Rechner (Netzwerke, FU3); F-167: SQL-Übungsfläche (Datenbanken, FU5);
    // F-171: Terminal-Szenarien, Netzwerk-Topologie und Flag-Rätsel (Netzwerke/Server/IT-Sicherheit, FU3/FU4/FU6).
    werkzeuge: ["netzplan", "subnetting", "sqluebung", "terminal", "topologie", "flags"],
    pruefungsbereiche: [FI_TEIL1, ...bereiche.map((bereich) => ({ ...bereich, part: "Teil 2" })), FI_WISO],
  };
}

/**
 * Stichpunkte für die Hilfeseite "Gelassen bleiben" (Prüfungsablauf) der Fortbildungs- und Eignungskurse,
 * Stand 23.10.2026, abgeleitet aus den jeweiligen Prüfungsverordnungen auf gesetze-im-internet.de
 * (FachkBüroPrV, GesWFachwPrV, WFachwPrV, HdlFachwPrV, TechFachwPrV, IndFachwirtPrV 2010, ImmoFachwPrV,
 * BAProVFFPrV, GüLogFachwBAProFV, AusbEignV). Aussagen, die je Kammer abweichen können (Tagesaufteilung,
 * Vorbereitungszeit, Hilfsmittel, Termine), sind im Text ausdrücklich als "je nach Kammer" gekennzeichnet.
 * Rechtsnah: vor Verwendung prüfen (Stand Oktober 2026), siehe docs/entwuerfe/spielcode-korrekturen/bericht-I.md.
 */
const PRUEFUNGSABLAUF_HILFSMITTEL =
  "Erlaubte Hilfsmittel (in der Regel ein nicht netzwerkfähiger Taschenrechner und unkommentierte Gesetzestexte) legt die Kammer fest — je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen. Stand Oktober 2026, ohne Gewähr: Verbindlich sind die Prüfungsverordnung und die Einladung deiner IHK.";
const PRUEFUNGSABLAUF_WIEDERHOLUNG =
  "Eine nicht bestandene Prüfung kannst du zweimal wiederholen; wenn du dich innerhalb von zwei Jahren wieder anmeldest, kannst du auf Antrag von Leistungen befreit werden, die du früher mindestens mit „ausreichend“ geschafft hast.";
const PRUEFUNGSABLAUF_TEIL1_WIRTSCHAFT =
  "Teil 1 prüft schriftlich Volks- und Betriebswirtschaft, Rechnungswesen, Recht und Steuern sowie Unternehmensführung — nach der Verordnung insgesamt höchstens 330 Minuten; die Aufteilung auf die Bereiche je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen.";

const PRUEFUNGSABLAUF: Record<string, string[]> = {
  "fachwirt-buero-projektorganisation": [
    "Die Prüfung hat einen schriftlichen und einen mündlichen Teil. Die mündliche Prüfung findet erst statt, wenn du die schriftliche bestanden hast.",
    "Schriftlich bearbeitest du zu einer betrieblichen Situation zwei gleichgewichtige Aufgabenstellungen aus allen vier Handlungsbereichen — nach der Verordnung insgesamt 600 Minuten, in der Regel auf zwei Tage verteilt (je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen).",
    "Mündlich folgen eine Präsentation von höchstens 10 Minuten und ein Fachgespräch von in der Regel etwa 40 Minuten. Das Thema wählst du selbst; es verbindet „Führen, Betreuen, Verwalten und Ausbilden“ mit einem weiteren Handlungsbereich und wird bei der schriftlichen Prüfung eingereicht.",
    "Bestanden hast du mit mindestens 50 Punkten im schriftlichen und im mündlichen Teil; beide zählen zu gleichen Teilen.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  "fachwirt-gesundheit-soziales": [
    "Die Prüfung hat einen schriftlichen und einen mündlichen Teil. Zur mündlichen Prüfung wirst du zugelassen, wenn deine schriftlichen Leistungen mindestens „ausreichend“ sind.",
    "Schriftlich bearbeitest du zu einer betrieblichen Situation zwei aufeinander abgestimmte, gleichgewichtige Aufgabenstellungen aus allen sechs Handlungsbereichen — nach der Verordnung mindestens 600 und höchstens 630 Minuten; die Aufteilung auf Tage legt die Kammer fest.",
    "Mündlich folgen eine Präsentation von etwa 10 Minuten (zählt ein Drittel) und ein Fachgespräch von höchstens 20 Minuten. Das Thema wählst du selbst; es verbindet „Führen und Entwickeln von Personal“ mit einem weiteren frei wählbaren Handlungsbereich und wird mit der ersten schriftlichen Prüfungsleistung eingereicht.",
    "Bestanden hast du mit mindestens 50 Punkten im schriftlichen und im mündlichen Teil.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  wirtschaftsfachwirt: [
    "Die Prüfung hat zwei Teile: Teil 1 (Wirtschaftsbezogene Qualifikationen) schriftlich, Teil 2 (Handlungsspezifische Qualifikationen) schriftlich und mündlich. Teil 2 folgt erst nach Teil 1, die mündliche Prüfung erst nach den schriftlichen Teilen.",
    PRUEFUNGSABLAUF_TEIL1_WIRTSCHAFT,
    "Teil 2 schriftlich: zu einer betrieblichen Situation zwei gleichgewichtige Aufgabenstellungen aus fünf Handlungsbereichen (u. a. Logistik, Marketing und Vertrieb, Führung und Zusammenarbeit), insgesamt 480 bis 510 Minuten.",
    "Mündlich: Fachgespräch mit Präsentation, zusammen höchstens 30 Minuten, davor höchstens 30 Minuten Vorbereitung; Schwerpunkt ist der Handlungsbereich „Führung und Zusammenarbeit“.",
    "Bestanden hast du mit mindestens 50 Punkten in jedem Bereich von Teil 1, in der schriftlichen Aufgabe und in der mündlichen Prüfung. Gesamtnote: 25 % Teil 1, 50 % schriftlich Teil 2, 25 % mündlich. Bei einem mangelhaften Bereich in Teil 1 gibt es unter Umständen eine kurze mündliche Ergänzungsprüfung.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  handelsfachwirt: [
    "Die Prüfung hat zwei schriftliche Teilprüfungen und eine mündliche. Die mündliche folgt nach den schriftlichen, innerhalb eines Jahres.",
    "Schriftlich 1 (240 Minuten): „Unternehmensführung und -steuerung“ sowie „Führung, Personalmanagement, Kommunikation und Kooperation“.",
    "Schriftlich 2 (300 Minuten): die Pflichtbereiche „Handelsmarketing“ sowie „Beschaffung und Logistik“ und ein Wahlbereich (Vertriebssteuerung, Handelslogistik, Einkauf oder Außenhandel), den du bei der Anmeldung angibst. Die Aufteilung auf Tage legt die Kammer fest.",
    "Mündlich hältst du eine Präsentation von etwa 15 Minuten zu einem selbst gewählten Thema aus einem Handlungsbereich (Kurzbeschreibung am Tag der zweiten schriftlichen Prüfung). Im Fachgespräch von höchstens 20 Minuten, das zwei Drittel der mündlichen Note ausmacht, geht es ausgehend von der Präsentation um betriebliche Probleme.",
    "Bestanden hast du mit mindestens 50 Punkten in jeder schriftlichen Teilprüfung und in der mündlichen Prüfung.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  "technischer-fachwirt": [
    "Die Prüfung hat drei Teile: Wirtschaftsbezogene, Technische und Handlungsspezifische Qualifikationen. Zum dritten Teil wirst du zugelassen, wenn du die beiden anderen abgelegt hast; die mündliche Prüfung folgt erst nach den erfolgreichen schriftlichen Leistungen.",
    "Wirtschaftsbezogen schriftlich: Volks- und Betriebswirtschaft, Rechnungswesen, Recht und Steuern, Unternehmensführung — insgesamt höchstens 330 Minuten. Technisch schriftlich: naturwissenschaftliche und technische Grundlagen, technische Kommunikation und Werkstofftechnologie, Fertigungs- und Betriebstechnik — ebenfalls höchstens 330 Minuten.",
    "Handlungsspezifisch schriftlich: eine Situationsaufgabe von 240 bis 300 Minuten, die vier Handlungsbereiche verbindet (Absatz, Material und Logistik; Produktion; Qualität, Umwelt und Arbeitsschutz; Führung und Zusammenarbeit).",
    "Mündlich: situationsbezogenes Fachgespräch mit Präsentation, höchstens 30 Minuten, davor höchstens 30 Minuten Vorbereitung; Schwerpunkt Absatz, Materialwirtschaft und Logistik sowie Produktionsplanung. Die Präsentation zählt ein Drittel, das Fachgespräch zwei Drittel; wie sich die Zeit aufteilt, je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen.",
    "Bestanden hast du mit mindestens 50 Punkten in jedem Bereich der ersten beiden Teile, in der Situationsaufgabe und in der mündlichen Prüfung. Gesamtnote: 15 % wirtschaftsbezogen, 15 % technisch, 45 % Situationsaufgabe, 25 % mündlich. Bei einem mangelhaften Bereich in den ersten beiden Teilen gibt es unter Umständen eine kurze mündliche Ergänzungsprüfung.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  industriefachwirt: [
    "Die Prüfung hat zwei Teile: Teil 1 (Wirtschaftsbezogene Qualifikationen) schriftlich, Teil 2 (Handlungsspezifische Qualifikationen) schriftlich und mündlich. Teil 2 folgt erst nach bestandenem Teil 1; die mündliche Prüfung findet nur statt, wenn deine schriftlichen Leistungen mindestens „ausreichend“ sind.",
    PRUEFUNGSABLAUF_TEIL1_WIRTSCHAFT,
    "Teil 2 schriftlich: zu einer betrieblichen Situation zwei aufeinander abgestimmte, gleichgewichtige Aufgabenstellungen aus fünf Handlungsbereichen (u. a. Produktionsprozesse, Marketing und Vertrieb, Führung und Zusammenarbeit), insgesamt 480 bis 510 Minuten.",
    "Mündlich: eine Präsentation von höchstens 10 Minuten (ein Drittel) zu einem selbst gewählten Thema aus mindestens zwei Handlungsbereichen, Kurzbeschreibung und Gliederung bei der ersten schriftlichen Leistung; danach ein Fachgespräch von in der Regel höchstens 20 Minuten (zwei Drittel). Eine Vorbereitungszeit legt die Kammer fest.",
    "Bestanden hast du mit mindestens 50 Punkten in jedem Bereich von Teil 1, in der schriftlichen Aufgabe und in der mündlichen Prüfung. Gesamtnote: 25 % Teil 1, 50 % schriftlich Teil 2, 25 % mündlich. Bei einem mangelhaften Bereich in Teil 1 gibt es unter Umständen eine kurze mündliche Ergänzungsprüfung.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  immobilienfachwirt: [
    "Die Prüfung hat einen schriftlichen und einen mündlichen Teil. Zur mündlichen Prüfung wirst du zugelassen, wenn deine schriftlichen Leistungen mindestens „ausreichend“ sind.",
    "Schriftlich werden sechs Handlungsbereiche geprüft (u. a. Immobilienbewirtschaftung, Bauprojektmanagement, Marktorientierung und Vertrieb, Maklertätigkeit) — nach der Verordnung insgesamt 600 bis 660 Minuten. Verteilung auf Tage und Reihenfolge je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen.",
    "Mündlich hältst du eine Präsentation von höchstens etwa 10 Minuten zu einem selbst gewählten Thema (in der Regel mit der ersten schriftlichen Leistung einzureichen, je nach Kammer). Im Fachgespräch von in der Regel höchstens 20 Minuten können alle Handlungsbereiche vorkommen; es zählt doppelt so viel wie die Präsentation.",
    "Bestanden hast du mit mindestens 50 Punkten in jeder schriftlichen Teilprüfung und in der mündlichen Prüfung. Bei mangelhaften schriftlichen Leistungen gibt es unter Umständen kurze mündliche Ergänzungsprüfungen.",
    PRUEFUNGSABLAUF_WIEDERHOLUNG,
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  "versicherungen-finanzanlagen": [
    "Die Prüfung hat zwei Teile: „Kundenbedarfsfelder“ (Teil 1, schriftlich) und „Kernprozesse, Steuerung und Zusammenarbeit“ (Teil 2, schriftlich und praxisbezogen). Reihenfolge und Termine legt die Kammer fest (je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen).",
    "Teil 1 ist fallbezogen und dauert 270 Minuten. Du wählst einen Bereich: Vorsorge oder Lösungen für Gewerbekunden im Sach- und Vermögensschutz.",
    "Teil 2 schriftlich: drei komplexe betriebliche Situationen zu „Kernprozesse gestalten“ sowie „Steuerung, Zusammenarbeit und Leadership“, 300 Minuten.",
    "Praxisbezogen in Teil 2: eine Praxistransferarbeit (4 bis 6 Textseiten zu einem selbst gewählten betrieblichen Thema, spätestens am Tag der letzten schriftlichen Prüfungsleistung abzugeben), eine Präsentation von höchstens 20 Minuten und direkt danach ein Fachgespräch von höchstens 30 Minuten.",
    "Bestanden hast du mit mindestens 50 Punkten in allen Prüfungsleistungen — ein Ausgleich zwischen ihnen ist nicht möglich. Teil 1 zählt 30 % der Gesamtnote, Teil 2 70 %.",
    "Schriftliche Prüfungen kannst du je zweimal wiederholen. Bei der praxisbezogenen Prüfung wiederholst du alle drei Leistungen, mit neuem Thema für die Praxistransferarbeit. Zur Wiederholung musst du dich innerhalb von zwei Jahren anmelden.",
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  "transport-management-logistics": [
    "Die Prüfung hat einen schriftlichen und einen mündlichen Teil; die mündliche Prüfung darf erst nach der schriftlichen abgelegt werden. Das gesamte Verfahren muss innerhalb von zwei Jahren ab der ersten Prüfungsleistung abgeschlossen sein.",
    "Schriftlich bearbeitest du zwei aufeinander abgestimmte Aufgabenstellungen zu einer betrieblichen Situation, je 300 Minuten, aus allen drei Prüfungsbereichen (Entwickeln und Vermarkten, Erstellen, Kommunikation/Führung/Zusammenarbeit). Die Verteilung auf Tage legt die Kammer fest.",
    "Mündlich hältst du eine Präsentation von höchstens 10 Minuten zu einem selbst gewählten Thema aus Bereich 1 oder 2, verknüpft mit Bereich 3 (Kurzbeschreibung und Gliederung zum Termin der zweiten schriftlichen Prüfung). Das Fachgespräch dauert höchstens 20 Minuten und zählt zwei Drittel der mündlichen Note.",
    "Bestanden hast du mit mindestens 50 Punkten im schriftlichen und im mündlichen Teil; beide zählen gleich viel.",
    "Jeden nicht bestandenen Teil kannst du zweimal wiederholen. Wenn du dich innerhalb von zwei Jahren wieder anmeldest, entfällt der schriftliche Teil, falls du dort mindestens 50 Punkte erreicht hattest.",
    PRUEFUNGSABLAUF_HILFSMITTEL,
  ],
  "ausbildung-der-ausbilder": [
    "Die Prüfung hat einen schriftlichen und einen praktischen Teil. Reihenfolge und Termine legt die Kammer fest (je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen).",
    "Schriftlich bearbeitest du fallbezogene Aufgaben aus allen vier Handlungsfeldern (Voraussetzungen prüfen und planen, vorbereiten, durchführen, abschließen); die Dauer soll nach der Verordnung drei Stunden betragen.",
    "Praktisch präsentierst du eine selbst gewählte, berufstypische Ausbildungssituation (höchstens 15 Minuten) und erläuterst im Fachgespräch, warum du sie so ausgewählt und gestaltet hast; zusammen höchstens 30 Minuten. Statt der Präsentation ist auch eine praktische Durchführung vorgesehen — ob und wie, regelt die Kammer (je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen).",
    "Bestanden hast du, wenn jeder Teil mindestens mit „ausreichend“ bewertet wird. Eine nicht bestandene Prüfung kannst du zweimal wiederholen; ein bestandener Teil kann angerechnet werden.",
    "Erlaubte Hilfsmittel legt die Kammer fest — je nach Kammer, bitte bei der Prüfungsanmeldung nachlesen. Stand Oktober 2026, ohne Gewähr: Verbindlich sind die Prüfungsverordnung und die Einladung deiner IHK.",
  ],
};

export const KURS_META: Record<string, KursMeta> = {
  "fachwirt-buero-projektorganisation": {
    title: "Geprüfter Fachwirt für Büro- und Projektorganisation (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung", werkzeuge: ["netzplan"] },
  },
  "mathematik-9": {
    title: "Mathematik, Klasse 9 (bundeslandneutral)",
    type: "schulfach",
    isPublished: false,
    metadata: { klassenstufe: 9, bundesland_ansatz: "bundeslandneutral", kategorie: "schule" },
  },
  // F-144 (dritter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // bewusst sofort isPublished:true (anders als mathematik-9) — Zielgruppe sind Berufstätige
  // wie beim Büro-Fachwirt-Piloten, kein Jugendschutz-Gate/Consent-Flow-Abhängigkeit nötig.
  "fachwirt-gesundheit-soziales": {
    title: "Geprüfter Fachwirt für Gesundheits- und Sozialwesen (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-145 (vierter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // größte Fachwirt-Qualifikation nach Teilnehmerzahl (DIHK-Statistik 2024). Bewusst sofort
  // isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  wirtschaftsfachwirt: {
    title: "Geprüfter Wirtschaftsfachwirt (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-146 (fünfter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // zweitgrößte noch nicht umgesetzte Fachwirt-Qualifikation (DIHK-Statistik 2025). Bewusst
  // sofort isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  handelsfachwirt: {
    title: "Geprüfter Handelsfachwirt (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-147 (sechster Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // drittgrößte noch nicht umgesetzte Fachwirt-Qualifikation (DIHK-Statistik 2025). Bewusst
  // sofort isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  "technischer-fachwirt": {
    title: "Geprüfter Technischer Fachwirt (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-148 (siebter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // viertgrößte noch nicht umgesetzte Fachwirt-Qualifikation (DIHK-Statistik 2025). Bewusst
  // sofort isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  industriefachwirt: {
    title: "Geprüfter Industriefachwirt (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-149 (achter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // fünftgrößte noch nicht umgesetzte Fachwirt-Qualifikation (DIHK-Statistik 2025). Bewusst
  // sofort isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  immobilienfachwirt: {
    title: "Geprüfter Immobilienfachwirt (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung", werkzeuge: ["netzplan"] },
  },
  // F-150 (neunter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // Nachfolge-Qualifikation des auslaufenden "Fachwirt für Versicherungen und Finanzen"
  // (VersFachwPrV 2008, Anmeldeschluss 31.12.2026) -- auf Nutzerentscheidung hin die neue
  // Prüfungsordnung BAProVFFPrV (in Kraft seit 01.01.2025) statt der auslaufenden Fassung
  // umgesetzt. Bewusst sofort isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  "versicherungen-finanzanlagen": {
    title: "Bachelor Professional in Versicherungen und Finanzanlagen (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung", werkzeuge: ["netzplan"] },
  },
  // F-151 (zehnter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // Nachfolge-Bezeichnung des größtenteils bereits migrierten "Fachwirt für Güterverkehr und
  // Logistik" (nur noch 6 von 442 Prüfungsteilnehmer:innen 2025 unter altem Titel) -- analog zur
  // beim neunten Kurs getroffenen Nutzerentscheidung direkt die aktuelle Bezeichnung "Bachelor
  // Professional in Transport Management and Logistics" umgesetzt. Bewusst sofort
  // isPublished:true wie die übrigen Erwachsenenbildungs-Kurse.
  "transport-management-logistics": {
    title: "Bachelor Professional in Transport Management and Logistics (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  // F-152 (elfter Kurs, Nutzer-Vorgabe vom 29.09.2026, siehe Architekturplanung Abschnitt 13):
  // "Ausbildung der Ausbilder" (AEVO-Ausbildereignungsprüfung) -- direkte Nutzer-Namensvorgabe,
  // kein DIHK-Statistik-Ranking-Kandidat wie bei Kurs 3-10. type bewusst NICHT "fachwirt" (anders
  // als bei den Bachelor-Professional-Nachfolgetiteln der Kurse 9/10): AdA ist keine
  // Aufstiegsfortbildung, sondern eine Eignungsprüfung nach BBiG/AEVO -- neuer, eigenständiger
  // type-Wert "eignungspruefung" eingeführt (rein deskriptiv, keine Logik hängt daran außer der
  // bestehenden "demo"-Sortierung in courses.ts).
  "ausbildung-der-ausbilder": {
    title: "Ausbildung der Ausbilder – AEVO-Ausbildereignungsprüfung (IHK)",
    type: "eignungspruefung",
    isPublished: true,
    // Präsentation einer Ausbildungssituation: höchstens 15 Minuten (§ 4 Abs. 3 AusbEignV, verifiziert
    // am 05.10.2026; Präsentation und Fachgespräch zusammen höchstens 30 Minuten).
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung", presentationMinutes: 15 },
  },
  // F-153 (zwölfter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker:in Anwendungsentwicklung (FIAusbV 2020) -- erster von vier Fachinformatiker-
  // Kursen (je Fachrichtung ein eigener Kurs, gemeinsame Fachgebiete FU1-FU7 je Kurs kopiert).
  // type "ausbildungsberuf" (neuer, rein deskriptiver Wert): Ausbildungsberuf mit gestreckter
  // Abschlussprüfung, weder Fortbildung ("fachwirt") noch Eignungsprüfung. Titel bewusst neutral
  // ("IHK-Abschlussprüfung"), da Umschulung und Erstausbildung zur selben Prüfung führen;
  // zielgruppe "erwachsene" wie alle Erwachsenenbildungs-Kurse (Umschüler:innen sind erwachsen).
  "fachinformatiker-anwendungsentwicklung": {
    title: "Fachinformatiker:in Anwendungsentwicklung (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(80, [
      { key: "softwareprodukt", title: "Planen eines Softwareproduktes", minutes: 90, fachgebietCodes: ["AE1", "AE2", "AE3"] },
      { key: "algorithmen", title: "Entwicklung und Umsetzung von Algorithmen", minutes: 90, fachgebietCodes: ["AE4", "FU4", "FU5"] },
    ]),
  },
  // F-154 (dreizehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker:in Systemintegration -- zweiter der vier Fachinformatiker-Kurse; die
  // fachrichtungsübergreifenden Fachgebiete fu1-fu7 sind aus dem Anwendungsentwicklungs-Kurs
  // kopiert (nur kurs_slug im Frontmatter unterscheidet sich), type/Zielgruppe wie dort.
  "fachinformatiker-systemintegration": {
    title: "Fachinformatiker:in Systemintegration (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(40, [
      { key: "konzeption", title: "Konzeption und Administration von IT-Systemen", minutes: 90, fachgebietCodes: ["SI1", "SI3", "SI4"] },
      { key: "netzwerke", title: "Analyse und Entwicklung von Netzwerken", minutes: 90, fachgebietCodes: ["SI2", "FU3"] },
    ]),
  },
  // F-155 (vierzehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker:in Daten- und Prozessanalyse -- dritter der vier Fachinformatiker-Kurse;
  // fu1-fu7 aus dem Anwendungsentwicklungs-Kurs kopiert (nur kurs_slug unterscheidet sich).
  "fachinformatiker-daten-prozessanalyse": {
    title: "Fachinformatiker:in Daten- und Prozessanalyse (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(40, [
      { key: "prozessanalyse", title: "Durchführen einer Prozessanalyse", minutes: 90, fachgebietCodes: ["DP1", "FU1"] },
      { key: "datenqualitaet", title: "Sicherstellen der Datenqualität", minutes: 90, fachgebietCodes: ["DP2", "DP3", "DP4", "FU5"] },
    ]),
  },
  // F-156 (fünfzehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker:in Digitale Vernetzung -- vierter und letzter der vier Fachinformatiker-Kurse;
  // fu1-fu7 aus dem Anwendungsentwicklungs-Kurs kopiert (nur kurs_slug unterscheidet sich).
  "fachinformatiker-digitale-vernetzung": {
    title: "Fachinformatiker:in Digitale Vernetzung (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(40, [
      { key: "diagnose", title: "Diagnose und Störungsbeseitigung in vernetzten Systemen", minutes: 90, fachgebietCodes: ["DV3", "FU3"] },
      { key: "betrieb", title: "Betrieb und Erweiterung von vernetzten Systemen", minutes: 90, fachgebietCodes: ["DV1", "DV2", "DV4"] },
    ]),
  },
};

// F-176: Kursprofil je Kurs (Allowlist der angebotenen Instrumente/Spiele/Werkzeuge/Szenarien/Lernpfade, siehe
// packages/shared/src/kurs-angebot.ts). Das Angebot ersetzt die ältere Einzelangabe metadata.werkzeuge.
for (const [slug, angebot] of Object.entries(KURS_ANGEBOT)) {
  const meta = KURS_META[slug];
  if (!meta) throw new Error(`KURS_ANGEBOT verweist auf unbekannten Kurs "${slug}".`);
  const rest = { ...meta.metadata };
  delete rest.werkzeuge;
  meta.metadata = { ...rest, angebot };
}

// F-176: Präsentationsdauer der mündlichen Prüfung laut Prüfungsordnung (Entscheidung 06.10.2026); die übrigen
// Kurse behalten den Standard von 10 Minuten, solange die Dauer nicht belegt ist.
const PRAESENTATION_MINUTEN: Record<string, number> = { handelsfachwirt: 15, "versicherungen-finanzanlagen": 20 };
for (const [slug, minuten] of Object.entries(PRAESENTATION_MINUTEN)) {
  const meta = KURS_META[slug];
  if (!meta) throw new Error(`PRAESENTATION_MINUTEN verweist auf unbekannten Kurs "${slug}".`);
  meta.metadata = { ...(meta.metadata as Record<string, unknown>), presentationMinutes: minuten };
}

// Prüfungsablauf-Stichpunkte der Fortbildungs- und Eignungskurse (Hilfeseite "Gelassen bleiben"); die
// Fachinformatiker-Kurse bringen ihre Stichpunkte über fachinformatikMetadata() mit.
for (const [slug, ablauf] of Object.entries(PRUEFUNGSABLAUF)) {
  const meta = KURS_META[slug];
  if (!meta) throw new Error(`PRUEFUNGSABLAUF verweist auf unbekannten Kurs "${slug}".`);
  meta.metadata = { ...(meta.metadata as Record<string, unknown>), pruefungsablauf: ablauf };
}

function kursMetaFor(slug: string): KursMeta {
  return KURS_META[slug] ?? { title: slug, type: slug, isPublished: false, metadata: {} };
}

export interface ImportOptions {
  /** Nur planen und berichten, nichts schreiben. */
  dryRun?: boolean;
  /** Hebt die Abbruchschwelle für Entfernungen auf (siehe REMOVAL_THRESHOLD_* in content-sync-plan.ts). */
  allowRemovals?: boolean;
  /**
   * Nur diese Kurse (Verzeichnisnamen unter `content/`, gleich dem `kurs_slug`) abgleichen. Gedacht für Integrationstests, die
   * nur einen Kurs brauchen: Der Voll-Import (16.000+ Items) dauert dort je Testdatei über eine Minute und wächst mit jedem Kurs.
   * Die Validierung läuft weiterhin über den gesamten Content.
   */
  kurse?: string[];
}

interface ThemaImportResult {
  label: string;
  itemCount: number;
  stats: SyncStats;
  blocked: string | null;
}

/** Findet das Thema über den stabilen Code (Fallback: Titel eines noch nicht zugeordneten Altbestands). */
async function findThema(fachgebietId: string, code: string, title: string) {
  const [byCode] = await db.select().from(thema).where(and(eq(thema.fachgebietId, fachgebietId), eq(thema.code, code))).limit(1);
  if (byCode) return byCode;
  const [byTitle] = await db.select().from(thema).where(and(eq(thema.fachgebietId, fachgebietId), eq(thema.title, title))).limit(1);
  return byTitle;
}

/** Trockenlauf für ein Thema: liest nur, legt weder Kurs noch Fachgebiet noch Thema an. */
async function planThemaDryRun(frontmatter: Record<string, string>, desired: DesiredItem[], themaTitle: string, label: string): Promise<ThemaImportResult> {
  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, frontmatter.kurs_slug!)).limit(1);
  const [fachgebietRow] = kursRow
    ? await db.select().from(fachgebiet).where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code!))).limit(1)
    : [];
  const themaRow = fachgebietRow ? await findThema(fachgebietRow.id, frontmatter.thema_code!, themaTitle) : undefined;
  if (themaRow) {
    const result = await syncThemaItems(db, themaRow.id, desired, { dryRun: true });
    return { label, itemCount: desired.length, stats: result.stats, blocked: result.plan.blocked };
  }
  return { label, itemCount: desired.length, stats: statsFromPlan(planSync(desired, [])), blocked: null };
}

/**
 * Importiert eine Themendatei als Abgleich (Entwurf docs/entwuerfe/sicherer-content-import.md): Items werden über ihren
 * stabilen Schlüssel angelegt, aktualisiert oder deaktiviert, aber nie gelöscht. Lernfortschritt, Notizen, Prüfungsantworten
 * und Duelle bleiben erhalten; die Datei wird in einer Transaktion abgeglichen.
 */
async function importThemaFile(filePath: string, fachgebietSortOrder: number, sortOrder: number, options: ImportOptions): Promise<ThemaImportResult> {
  const raw = await readFile(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);

  const themaTitle = `${frontmatter.thema_code} — ${frontmatter.thema_title}`;
  const label = `${frontmatter.kurs_slug}/${frontmatter.fachgebiet_code}/${frontmatter.thema_code}`;
  const desired = buildDesiredItems({ kursSlug: frontmatter.kurs_slug!, themaTitle: frontmatter.thema_title!, body, rechtsstand: frontmatter.rechtsstand });
  if (options.dryRun) return planThemaDryRun(frontmatter, desired, themaTitle, label);

  const meta = kursMetaFor(frontmatter.kurs_slug!);

  const [existingKurs] = await db.select().from(kurs).where(eq(kurs.slug, frontmatter.kurs_slug!)).limit(1);
  const kursRow =
    existingKurs ??
    (
      await db
        .insert(kurs)
        .values({
          slug: frontmatter.kurs_slug!,
          type: meta.type,
          title: meta.title,
          // isPublished nur beim Erstanlegen aus KURS_META übernehmen — siehe unten, warum ein
          // Re-Import das niemals überschreiben darf.
          isPublished: meta.isPublished,
          metadata: meta.metadata,
        })
        .returning()
    )[0];
  if (!kursRow) throw new Error(`Kurs "${frontmatter.kurs_slug}" konnte nicht angelegt werden.`);

  // Titel/Typ/Metadata bei jedem Lauf synchronisieren, is_published bewusst NICHT: Ein Kurs
  // könnte inzwischen manuell veröffentlicht worden sein (siehe Entwicklungsplan Iteration 3,
  // "Nach Fertigstellung ... is_published = true setzen") — ein erneuter Import darf das
  // niemals unbeabsichtigt wieder zurücksetzen. Metadata wird per JSON-Vergleich einbezogen
  // (nicht nur title/type), sonst würde z. B. eine nachträglich in KURS_META ergänzte
  // metadata.zielgruppe (siehe course-audience.ts) bei einem bereits existierenden Kurs beim
  // Re-Import stillschweigend ignoriert.
  if (
    kursRow.title !== meta.title ||
    kursRow.type !== meta.type ||
    JSON.stringify(kursRow.metadata) !== JSON.stringify(meta.metadata)
  ) {
    await db.update(kurs).set({ title: meta.title, type: meta.type, metadata: meta.metadata }).where(eq(kurs.id, kursRow.id));
  }

  const [existingFachgebiet] = await db
    .select()
    .from(fachgebiet)
    .where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code!)))
    .limit(1);
  const fachgebietRow =
    existingFachgebiet ??
    (
      await db
        .insert(fachgebiet)
        .values({
          kursId: kursRow.id,
          code: frontmatter.fachgebiet_code!,
          title: frontmatter.fachgebiet_title!,
          sortOrder: fachgebietSortOrder,
        })
        .returning()
    )[0];
  if (!fachgebietRow) throw new Error(`Fachgebiet "${frontmatter.fachgebiet_code}" konnte nicht angelegt werden.`);

  // sortOrder bei jedem Lauf synchronisieren: ohne explizites Feld bleiben mehrere Fachgebiete
  // desselben Kurses sonst bei sortOrder = 0 (Spalten-Default) und die Anzeige-Reihenfolge hängt
  // vom Zufall der jeweiligen SQL-Join-Reihenfolge ab (sichtbar erst bei >1 Fachgebiet je Kurs).
  if (fachgebietRow.sortOrder !== fachgebietSortOrder) {
    await db.update(fachgebiet).set({ sortOrder: fachgebietSortOrder }).where(eq(fachgebiet.id, fachgebietRow.id));
  }

  const existingThema = await findThema(fachgebietRow.id, frontmatter.thema_code!, themaTitle);
  const themaRow =
    existingThema ??
    (await db.insert(thema).values({ fachgebietId: fachgebietRow.id, code: frontmatter.thema_code!, title: themaTitle, sortOrder }).returning())[0];
  if (!themaRow) throw new Error(`Thema "${themaTitle}" konnte nicht angelegt werden.`);
  // Titel, Code und Reihenfolge bei jedem Lauf nachziehen: Eine Titelkorrektur erzeugt kein zweites Thema.
  if (existingThema && (existingThema.title !== themaTitle || existingThema.code !== frontmatter.thema_code || existingThema.sortOrder !== sortOrder)) {
    await db.update(thema).set({ title: themaTitle, code: frontmatter.thema_code!, sortOrder }).where(eq(thema.id, themaRow.id));
  }

  const result = await syncThemaItems(db, themaRow.id, desired, { allowRemovals: options.allowRemovals });
  const { stats } = result;
  console.log(
    `${path.basename(filePath)}: ${desired.length} Items (${stats.created} neu, ${stats.updated} geändert, ${stats.unchanged} unverändert, ${stats.deactivated} deaktiviert, ${stats.activationChanges} Sichtbarkeit geändert)` +
      `${result.plan.blocked ? " — BLOCKIERT: " + result.plan.blocked : ""} (Thema "${themaTitle}").`,
  );
  return { label, itemCount: desired.length, stats, blocked: result.plan.blocked };
}

/** Dateiname der Glossar-Datei je Fachgebiet (F-165) — wird NICHT als Thema importiert. */
export const GLOSSAR_DATEINAME = "glossar.md";

/**
 * F-165: ersetzt das gesamte Glossar eines Kurses aus den `glossar.md`-Dateien seiner Fachgebiete.
 * Läuft nach dem Import der Themen, weil `Thema:` (thema_code) auf deren Titel aufgelöst wird. Ein
 * Begriff (oder Alias) darf im Kurs nur einmal vorkommen; ein unbekannter thema_code bricht ab.
 */
export async function importGlossarFiles(kursSlug: string, filePaths: string[]): Promise<number> {
  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) return 0;
  // Alles in einer Transaktion: Bei einem Fehler (z. B. mehrdeutiger Begriff) bleibt das bisherige Glossar bestehen statt leer.
  return db.transaction(async (tx) => {
  await tx.delete(glossarEintrag).where(eq(glossarEintrag.kursId, kursRow.id));

  const vergeben = new Map<string, string>(); // kleingeschriebener Name → Begriff, der ihn belegt
  let angelegt = 0;
  for (const filePath of filePaths) {
    const { frontmatter, body } = splitFrontmatter(await readFile(filePath, "utf8"));
    const [fachgebietRow] = await tx
      .select()
      .from(fachgebiet)
      .where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code ?? "")))
      .limit(1);
    const themen = fachgebietRow ? await tx.select().from(thema).where(eq(thema.fachgebietId, fachgebietRow.id)) : [];

    for (const eintrag of parseGlossar(extractSection(body, "Glossar") ?? "")) {
      for (const name of [eintrag.term, ...eintrag.aliases]) {
        const schluessel = name.toLowerCase();
        const belegtVon = vergeben.get(schluessel);
        if (belegtVon !== undefined) {
          throw new Error(`Glossar (${kursSlug}): "${name}" ist mehrdeutig — belegt von "${belegtVon}" und "${eintrag.term}".`);
        }
        vergeben.set(schluessel, eintrag.term);
      }
      let themaId: string | null = null;
      if (eintrag.thema) {
        const treffer = themen.find((row) => row.title.startsWith(`${eintrag.thema} — `));
        if (!treffer) {
          throw new Error(`Glossar (${kursSlug}): Thema "${eintrag.thema}" zu "${eintrag.term}" nicht gefunden (${path.basename(path.dirname(filePath))}).`);
        }
        themaId = treffer.id;
      }
      await tx.insert(glossarEintrag).values({
        kursId: kursRow.id,
        term: eintrag.term,
        aliases: eintrag.aliases,
        definition: eintrag.definition,
        themaId,
        abschnitt: eintrag.abschnitt,
        geprueft: eintrag.geprueft,
      });
      angelegt += 1;
    }
  }
  console.log(`${kursSlug}: ${angelegt} Glossar-Einträge importiert.`);
  return angelegt;
  });
}

export interface ImportSummary {
  filesProcessed: number;
  /** Anzahl der Items laut Markdown (alle Themen), unabhängig davon, ob sie neu, geändert oder unverändert sind. */
  itemsImported: number;
  created: number;
  updated: number;
  unchanged: number;
  deactivated: number;
  /** Items, die sichtbar bzw. unsichtbar werden (Entwurf, Kursangebot), ohne dass sich ihr Inhalt ändert. */
  activationChanges: number;
  dryRun: boolean;
  /** Themen, bei denen die Abbruchschwelle für Entfernungen griff; sie wurden nicht verändert. */
  blocked: { thema: string; reason: string }[];
  /** Geänderte Items, bei denen sich die richtige Antwort oder Lösung geändert hat (Fortschritt bleibt erhalten). */
  solutionChanged: { thema: string; key: string }[];
  warnings: string[];
}

/**
 * Exportierte Kernlogik statt nur eines CLI-Skripts (F-17, Bulk-Import-Trigger im Admin-
 * Bereich, siehe trpc/routers/admin.ts) — bewusst ohne `pool.end()` hier drin, da ein
 * Server-Aufruf den gemeinsamen DB-Pool des laufenden Prozesses sonst mit schließen würde.
 *
 * Seit 08.10.2026 ein Abgleich statt „löschen und neu anlegen“ (siehe docs/entwuerfe/sicherer-content-import.md): Vorab wird
 * der gesamte Content validiert (Pflichtfelder, eindeutige Themen und Schlüssel); ein Fehler bricht ab, ohne etwas zu
 * ändern. Danach wird je Themendatei in einer Transaktion abgeglichen.
 */
export async function importAllContent(options: ImportOptions = {}): Promise<ImportSummary> {
  const preflight = await validateContentDir(CONTENT_DIR);
  if (preflight.issues.length > 0) {
    throw new Error(`Content-Validierung fehlgeschlagen (${preflight.issues.length} Verstöße), erster: ${preflight.issues[0]}`);
  }

  const kursDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  const summary: ImportSummary = {
    filesProcessed: 0,
    itemsImported: 0,
    created: 0,
    updated: 0,
    unchanged: 0,
    deactivated: 0,
    activationChanges: 0,
    dryRun: options.dryRun === true,
    blocked: [],
    solutionChanged: [],
    warnings: [],
  };

  for (const kursDir of kursDirs) {
    if (!kursDir.isDirectory()) continue;
    if (options.kurse && !options.kurse.includes(kursDir.name)) continue;
    const kursPath = path.join(CONTENT_DIR, kursDir.name);
    const fachgebietDirs = await readdir(kursPath, { withFileTypes: true });

    const sortedFachgebietDirs = fachgebietDirs.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

    const glossarDateien: string[] = [];
    for (const [fachgebietIndex, fachgebietDir] of sortedFachgebietDirs.entries()) {
      const fachgebietPath = path.join(kursPath, fachgebietDir.name);
      const alleDateien = (await readdir(fachgebietPath)).filter((file) => file.endsWith(".md")).sort();
      // F-165: glossar.md ist kein Thema, sondern wird nach den Themen des Kurses gesammelt importiert.
      const files = alleDateien.filter((file) => file !== GLOSSAR_DATEINAME);
      if (alleDateien.includes(GLOSSAR_DATEINAME)) glossarDateien.push(path.join(fachgebietPath, GLOSSAR_DATEINAME));

      for (const [index, file] of files.entries()) {
        const result = await importThemaFile(path.join(fachgebietPath, file), (fachgebietIndex + 1) * 10, (index + 1) * 10, options);
        summary.itemsImported += result.itemCount;
        summary.created += result.stats.created;
        summary.updated += result.stats.updated;
        summary.unchanged += result.stats.unchanged;
        summary.deactivated += result.stats.deactivated;
        summary.activationChanges += result.stats.activationChanges;
        if (result.blocked) summary.blocked.push({ thema: result.label, reason: result.blocked });
        for (const key of result.stats.solutionChanged) summary.solutionChanged.push({ thema: result.label, key });
        for (const warning of result.stats.warnings) summary.warnings.push(`${result.label}: ${warning}`);
        summary.filesProcessed += 1;
      }
    }
    if (glossarDateien.length > 0) {
      if (!options.dryRun) await importGlossarFiles(kursDir.name, glossarDateien);
      summary.filesProcessed += glossarDateien.length;
    }
  }

  return summary;
}

function printSummary(summary: ImportSummary): void {
  console.log(
    `${summary.dryRun ? "Trockenlauf (nichts geschrieben): " : "Import abgeschlossen: "}${summary.filesProcessed} Dateien, ${summary.itemsImported} Content-Items ` +
      `(${summary.created} neu, ${summary.updated} geändert, ${summary.unchanged} unverändert, ${summary.deactivated} deaktiviert, ${summary.activationChanges} mit geänderter Sichtbarkeit).`,
  );
  if (summary.solutionChanged.length > 0) {
    console.log(`
Lösung geändert (Fortschritt bleibt erhalten, bitte prüfen), ${summary.solutionChanged.length}:`);
    for (const entry of summary.solutionChanged.slice(0, 30)) console.log(`  ${entry.thema} ${entry.key}`);
  }
  if (summary.warnings.length > 0) {
    console.log(`
Warnungen (${summary.warnings.length}):`);
    for (const warning of summary.warnings.slice(0, 30)) console.log(`  ${warning}`);
  }
  if (summary.blocked.length > 0) {
    console.error(`
BLOCKIERT (${summary.blocked.length} Themen unverändert, mit --allow-removals bestätigen):`);
    for (const entry of summary.blocked) console.error(`  ${entry.thema}: ${entry.reason}`);
  }
}

/**
 * CLI-Einstiegspunkt (`pnpm db:import-content [--dry-run] [--allow-removals]`) — läuft nur, wenn diese Datei direkt
 * ausgeführt wird, nicht beim bloßen Import als Modul. Ohne diese Guard würde admin.ts durch
 * den Import allein sofort einen vollen Content-Import auslösen und danach den gemeinsamen
 * DB-Pool des Servers schließen. Exit-Code 1 bei Fehlern oder blockierten Themen.
 */
if (isCliEntry("import-content")) {
  const args = process.argv.slice(2);
  importAllContent({ dryRun: args.includes("--dry-run"), allowRemovals: args.includes("--allow-removals") })
    .then(async (summary) => {
      printSummary(summary);
      await pool.end();
      if (summary.blocked.length > 0) process.exit(1);
    })
    .catch((error: unknown) => {
      console.error("Content-Import fehlgeschlagen:", error);
      process.exit(1);
    });
}
