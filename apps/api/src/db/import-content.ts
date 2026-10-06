import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { and, eq, inArray } from "drizzle-orm";
import { isQuadrantItem, KURS_ANGEBOT } from "@edukedo/shared";
import { db, pool } from "./client";
import {
  type Bloom,
  extractSection,
  parseFachgespraechFragen,
  parseFallaufgabe,
  parseGlossar,
  parseKarteikarten,
  parseQuizBlock,
  splitBlocks,
  splitFrontmatter,
} from "./content-parser";
import {
  answerOption,
  contentItem,
  contentItemTag,
  contentItemVersion,
  fachgebiet,
  glossarEintrag,
  kurs,
  tag,
  thema,
} from "./schema";

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
const CONTENT_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");

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
  // Fachinformatiker/in Anwendungsentwicklung (FIAusbV 2020) -- erster von vier Fachinformatiker-
  // Kursen (je Fachrichtung ein eigener Kurs, gemeinsame Fachgebiete FU1-FU7 je Kurs kopiert).
  // type "ausbildungsberuf" (neuer, rein deskriptiver Wert): Ausbildungsberuf mit gestreckter
  // Abschlussprüfung, weder Fortbildung ("fachwirt") noch Eignungsprüfung. Titel bewusst neutral
  // ("IHK-Abschlussprüfung"), da Umschulung und Erstausbildung zur selben Prüfung führen;
  // zielgruppe "erwachsene" wie alle Erwachsenenbildungs-Kurse (Umschüler:innen sind erwachsen).
  "fachinformatiker-anwendungsentwicklung": {
    title: "Fachinformatiker/in Anwendungsentwicklung (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(80, [
      { key: "softwareprodukt", title: "Planen eines Softwareproduktes", minutes: 90, fachgebietCodes: ["AE1", "AE2", "AE3"] },
      { key: "algorithmen", title: "Entwicklung und Umsetzung von Algorithmen", minutes: 90, fachgebietCodes: ["AE4", "FU4", "FU5"] },
    ]),
  },
  // F-154 (dreizehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker/in Systemintegration -- zweiter der vier Fachinformatiker-Kurse; die
  // fachrichtungsübergreifenden Fachgebiete fu1-fu7 sind aus dem Anwendungsentwicklungs-Kurs
  // kopiert (nur kurs_slug im Frontmatter unterscheidet sich), type/Zielgruppe wie dort.
  "fachinformatiker-systemintegration": {
    title: "Fachinformatiker/in Systemintegration (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(40, [
      { key: "konzeption", title: "Konzeption und Administration von IT-Systemen", minutes: 90, fachgebietCodes: ["SI1", "SI3", "SI4"] },
      { key: "netzwerke", title: "Analyse und Entwicklung von Netzwerken", minutes: 90, fachgebietCodes: ["SI2", "FU3"] },
    ]),
  },
  // F-155 (vierzehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker/in Daten- und Prozessanalyse -- dritter der vier Fachinformatiker-Kurse;
  // fu1-fu7 aus dem Anwendungsentwicklungs-Kurs kopiert (nur kurs_slug unterscheidet sich).
  "fachinformatiker-daten-prozessanalyse": {
    title: "Fachinformatiker/in Daten- und Prozessanalyse (IHK-Abschlussprüfung)",
    type: "ausbildungsberuf",
    isPublished: true,
    metadata: fachinformatikMetadata(40, [
      { key: "prozessanalyse", title: "Durchführen einer Prozessanalyse", minutes: 90, fachgebietCodes: ["DP1", "FU1"] },
      { key: "datenqualitaet", title: "Sicherstellen der Datenqualität", minutes: 90, fachgebietCodes: ["DP2", "DP3", "DP4", "FU5"] },
    ]),
  },
  // F-156 (fünfzehnter Kurs, Nutzer-Vorgabe vom 04.10.2026, siehe Architekturplanung Abschnitt 13):
  // Fachinformatiker/in Digitale Vernetzung -- vierter und letzter der vier Fachinformatiker-Kurse;
  // fu1-fu7 aus dem Anwendungsentwicklungs-Kurs kopiert (nur kurs_slug unterscheidet sich).
  "fachinformatiker-digitale-vernetzung": {
    title: "Fachinformatiker/in Digitale Vernetzung (IHK-Abschlussprüfung)",
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

function kursMetaFor(slug: string): KursMeta {
  return KURS_META[slug] ?? { title: slug, type: slug, isPublished: false, metadata: {} };
}

async function ensureTagIds(tagNames: string[]): Promise<Map<string, string>> {
  const uniqueNames = [...new Set(tagNames)];
  const ids = new Map<string, string>();
  for (const name of uniqueNames) {
    const [existing] = await db.select().from(tag).where(eq(tag.name, name)).limit(1);
    if (existing) {
      ids.set(name, existing.id);
      continue;
    }
    const [created] = await db.insert(tag).values({ name }).returning();
    if (!created) throw new Error(`Tag "${name}" konnte nicht angelegt werden.`);
    ids.set(name, created.id);
  }
  return ids;
}

/**
 * Gemeinsamer Insert-Helfer für die F-113/F-114/F-115/F-116-Fragetypen (10 Stück, siehe
 * content-parser.ts) — alle folgen demselben Muster wie die länger bestehenden
 * quiz_mc/zuordnung-Zweige unten (contentItem + contentItemVersion + optionale
 * answer_option-Zeilen), nur mit unterschiedlichem payload/answerOptions-Aufbau je Typ. Die
 * älteren, bereits produktiv laufenden Zweige (quiz_mc/zuordnung/luecken/kurzantwort) bleiben
 * bewusst unangetastet, um kein Regressionsrisiko in bereits getesteten Code einzubringen.
 */
async function insertQuizContentItem(
  themaId: string,
  type: string,
  prompt: string,
  explanation: string,
  difficulty: string,
  bloom: Bloom | null,
  payload: Record<string, unknown>,
  answerOptions?: { text: string; isCorrect: boolean; groupKey?: string; sortOrder: number }[],
): Promise<void> {
  const [item] = await db
    .insert(contentItem)
    .values({ themaId, type, prompt, explanation, difficulty, bloom, payload })
    .returning();
  if (!item) throw new Error(`Content-Item vom Typ "${type}" konnte nicht angelegt werden.`);
  await db.insert(contentItemVersion).values({
    contentItemId: item.id,
    versionNumber: 1,
    prompt: item.prompt,
    explanation: item.explanation,
    payload,
  });
  if (answerOptions && answerOptions.length > 0) {
    await db.insert(answerOption).values(answerOptions.map((option) => ({ contentItemId: item.id, ...option })));
  }
}

async function importThemaFile(filePath: string, fachgebietSortOrder: number, sortOrder: number): Promise<number> {
  const raw = await readFile(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);

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

  const themaTitle = `${frontmatter.thema_code} — ${frontmatter.thema_title}`;
  const [existingThema] = await db
    .select()
    .from(thema)
    .where(and(eq(thema.fachgebietId, fachgebietRow.id), eq(thema.title, themaTitle)))
    .limit(1);

  const themaRow =
    existingThema ??
    (await db.insert(thema).values({ fachgebietId: fachgebietRow.id, title: themaTitle, sortOrder }).returning())[0];
  if (!themaRow) throw new Error(`Thema "${themaTitle}" konnte nicht angelegt werden.`);

  if (existingThema) {
    // Volle Ersetzung statt Upsert je Content-Item: Es gibt für dieses Thema noch keine
    // echten Nutzerdaten (erster Import echten Fachwirt-Contents), ein erneuter Lauf nach
    // Textänderungen soll einfach den vorherigen Stand ersetzen. Kaskadiert automatisch zu
    // content_item_version/answer_option/content_item_tag/user_progress (Abschnitt 4.4).
    const existingItems = await db.select({ id: contentItem.id }).from(contentItem).where(eq(contentItem.themaId, themaRow.id));
    if (existingItems.length > 0) {
      await db.delete(contentItem).where(inArray(contentItem.id, existingItems.map((item) => item.id)));
    }
    await db.update(thema).set({ sortOrder }).where(eq(thema.id, themaRow.id));
  }

  const theorieBody = extractSection(body, "Theorie");
  const karteikartenBody = extractSection(body, "Karteikarten");
  const quizBody = extractSection(body, "Quiz");
  // F-23: "Fallaufgaben" beim Fachwirt-Piloten, "Übungsaufgaben" bei Mathematik/Schulfach —
  // dieselbe Struktur, derselbe content_item.type, siehe content/README.md.
  const fallaufgabenBody = extractSection(body, "Fallaufgaben") ?? extractSection(body, "Übungsaufgaben");
  // F-25: nur beim Fachwirt-Piloten relevant (siehe content/README.md), daher bei anderen
  // Kurstypen (Mathematik-9, Demo) einfach nicht vorhanden.
  const fachgespraechBody = extractSection(body, "Fachgesprächsfragen");

  let created = 0;

  if (theorieBody) {
    const [item] = await db
      .insert(contentItem)
      .values({
        themaId: themaRow.id,
        type: "theorie",
        prompt: frontmatter.thema_title!,
        payload: { body_markdown: theorieBody, images: [] },
      })
      .returning();
    if (!item) throw new Error("Theorie-Item konnte nicht angelegt werden.");
    await db.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: 1,
      prompt: item.prompt,
      explanation: null,
      payload: item.payload,
    });
    created += 1;
  }

  if (karteikartenBody) {
    for (const card of parseKarteikarten(karteikartenBody)) {
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "karteikarte",
          prompt: card.prompt,
          explanation: card.explanation,
          difficulty: card.difficulty,
          bloom: card.bloom,
        })
        .returning();
      if (!item) throw new Error("Karteikarte konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: item.explanation,
        payload: {},
      });

      if (card.tags.length > 0) {
        const tagIds = await ensureTagIds(card.tags);
        await db
          .insert(contentItemTag)
          .values(card.tags.map((name) => ({ contentItemId: item.id, tagId: tagIds.get(name)! })));
      }
      created += 1;
    }
  }

  if (quizBody) {
    for (const block of splitBlocks(quizBody)) {
      const parsed = parseQuizBlock(block);
      if (!parsed) continue;

      if (
        parsed.type === "wahr_falsch" ||
        parsed.type === "entweder_oder" ||
        parsed.type === "was_passt_nicht" ||
        parsed.type === "quiz_mc_multi"
      ) {
        // F-113/F-116: strukturell identisch zu Multiple Choice (options-Array), siehe
        // prepareContent in adminContent.ts für dieselbe Zuordnung — hier bewusst dupliziert
        // statt importiert, um db/ frei von trpc/routers/-Abhängigkeiten zu halten (siehe
        // Moduldoku oben: content-parser.ts ist bewusst ohne DB-/Router-Kopplung ausgelagert).
        await insertQuizContentItem(
          themaRow.id,
          parsed.type,
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          {},
          parsed.options.map((option, index) => ({ text: option.text, isCorrect: option.isCorrect, sortOrder: index })),
        );
      } else if (parsed.type === "sortieren") {
        // F-113 Teil 2: sortOrder trägt hier die tatsächlich zu prüfende Position (die
        // Eingabereihenfolge selbst), nicht nur eine kosmetische Anzeige-Reihenfolge.
        await insertQuizContentItem(
          themaRow.id,
          "sortieren",
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          {},
          parsed.items.map((sortierenItem, index) => ({ text: sortierenItem.text, isCorrect: false, sortOrder: index })),
        );
      } else if (
        isQuadrantItem(parsed)
      ) {
        // F-114: visuelle Zuordnungs-Variante — dieselbe answer_option-Tabelle wie "zuordnung",
        // group_key trägt hier den festen Zonen-Schlüssel statt einer Paar-ID.
        await insertQuizContentItem(
          themaRow.id,
          parsed.type,
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          {},
          parsed.terms.map((term, index) => ({ text: term.text, isCorrect: false, groupKey: term.zoneKey, sortOrder: index })),
        );
      } else if (parsed.type === "hierarchie") {
        // F-105 (ToDo-Punkt 6): wie gantt unten (content-autorierte Zonen, generierte Schlüssel
        // n0, n1, …), zusätzlich `parentKey` je Knoten für die Baumstruktur (siehe
        // hierarchiePayloadSchema).
        const nodes = parsed.nodes.map((node, index) => ({
          key: `n${index}`,
          label: node.label,
          parentKey: node.parentIndex === null ? null : `n${node.parentIndex}`,
        }));
        await insertQuizContentItem(
          themaRow.id,
          "hierarchie",
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          { root: parsed.root, nodes },
          parsed.terms.map((term, index) => ({
            text: term.text,
            isCorrect: false,
            groupKey: nodes[term.nodeIndex]!.key,
            sortOrder: index,
          })),
        );
      } else if (parsed.type === "gantt") {
        // F-114 Teil 2: Zeitabschnitte sind content-autoriert statt fest im Code (siehe
        // ganttPayloadSchema) — generierte Schlüssel (p0, p1, …) analog zu adminContent.ts.
        const periods = parsed.periods.map((label, index) => ({ key: `p${index}`, label }));
        await insertQuizContentItem(
          themaRow.id,
          "gantt",
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          { periods },
          parsed.terms.map((term, index) => ({
            text: term.text,
            isCorrect: false,
            groupKey: periods[term.periodIndex]!.key,
            sortOrder: index,
          })),
        );
      } else if (parsed.type === "luecken_auswahl") {
        // F-115: wie "luecken" unten, zusätzlich die frei eingegebenen Distraktoren im payload.
        await insertQuizContentItem(
          themaRow.id,
          "luecken_auswahl",
          parsed.prompt,
          parsed.explanation,
          parsed.difficulty,
          parsed.bloom,
          { text_with_blanks: parsed.textWithBlanks, blanks: parsed.blanks, distractors: parsed.distractors },
        );
      } else if (parsed.type === "quiz_mc") {
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "quiz_mc",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
          })
          .returning();
        if (!item) throw new Error("Multiple-Choice-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload: {},
        });
        await db.insert(answerOption).values(
          parsed.options.map((option, index) => ({
            contentItemId: item.id,
            text: option.text,
            isCorrect: option.isCorrect,
            sortOrder: index,
          })),
        );
      } else if (parsed.type === "zuordnung") {
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "zuordnung",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
          })
          .returning();
        if (!item) throw new Error("Zuordnungs-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload: {},
        });
        await db.insert(answerOption).values(
          parsed.pairs.flatMap((pair, index) => [
            { contentItemId: item.id, groupKey: String(index), side: "links", text: pair.left, sortOrder: index },
            { contentItemId: item.id, groupKey: String(index), side: "rechts", text: pair.right, sortOrder: index },
          ]),
        );
      } else if (parsed.type === "luecken") {
        const payload = { text_with_blanks: parsed.textWithBlanks, blanks: parsed.blanks };
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "luecken",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
            payload,
          })
          .returning();
        if (!item) throw new Error("Lückentext-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload,
        });
      } else if (parsed.type === "kurzantwort") {
        const payload = { accepted_answers: parsed.acceptedAnswers, match_mode: "exact" as const };
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "kurzantwort",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
            payload,
          })
          .returning();
        if (!item) throw new Error("Kurzantwort-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload,
        });
      }
      created += 1;
    }
  }

  if (fallaufgabenBody) {
    // Führender Absatz vor dem ersten "#### "-Block (Einleitungstext, siehe fallaufgaben.md/
    // uebungsaufgaben.md) ist kein eigener Aufgaben-Block — splitBlocks liefert ihn trotzdem
    // als erstes Element, wenn die Sektion nicht direkt mit "#### " beginnt.
    for (const block of splitBlocks(fallaufgabenBody).filter((entry) => entry.startsWith("#### "))) {
      const parsed = parseFallaufgabe(block);
      const payload = {
        parts: parsed.parts.map((part) => ({ prompt: part.prompt, points: part.points, bloom: part.bloom })),
      };
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "fallaufgabe",
          prompt: parsed.prompt,
          explanation: parsed.explanation,
          // bloom bleibt am content_item selbst null: Fallaufgaben stufen jede Teilaufgabe
          // einzeln ein (payload.parts[].bloom), keine einzelne Stufe für die ganze Aufgabe.
          bloom: null,
          payload,
        })
        .returning();
      if (!item) throw new Error("Fallaufgabe konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: item.explanation,
        payload,
      });
      created += 1;
    }
  }

  if (fachgespraechBody) {
    for (const { themaTitel, frage } of parseFachgespraechFragen(fachgespraechBody)) {
      const payload = { themaTitel };
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "fachgespraech_frage",
          prompt: frage,
          payload,
        })
        .returning();
      if (!item) throw new Error("Fachgesprächsfrage konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: null,
        payload,
      });
      created += 1;
    }
  }

  console.log(`${path.basename(filePath)}: ${created} Content-Items importiert (Thema "${themaTitle}").`);
  return created;
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
  await db.delete(glossarEintrag).where(eq(glossarEintrag.kursId, kursRow.id));

  const vergeben = new Map<string, string>(); // kleingeschriebener Name → Begriff, der ihn belegt
  let angelegt = 0;
  for (const filePath of filePaths) {
    const { frontmatter, body } = splitFrontmatter(await readFile(filePath, "utf8"));
    const [fachgebietRow] = await db
      .select()
      .from(fachgebiet)
      .where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code ?? "")))
      .limit(1);
    const themen = fachgebietRow ? await db.select().from(thema).where(eq(thema.fachgebietId, fachgebietRow.id)) : [];

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
      await db.insert(glossarEintrag).values({
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
}

export interface ImportSummary {
  filesProcessed: number;
  itemsImported: number;
}

/**
 * Exportierte Kernlogik statt nur eines CLI-Skripts (F-17, Bulk-Import-Trigger im Admin-
 * Bereich, siehe trpc/routers/admin.ts) — bewusst ohne `pool.end()` hier drin, da ein
 * Server-Aufruf den gemeinsamen DB-Pool des laufenden Prozesses sonst mit schließen würde.
 */
export async function importAllContent(): Promise<ImportSummary> {
  const kursDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  let filesProcessed = 0;
  let itemsImported = 0;

  for (const kursDir of kursDirs) {
    if (!kursDir.isDirectory()) continue;
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
        itemsImported += await importThemaFile(path.join(fachgebietPath, file), (fachgebietIndex + 1) * 10, (index + 1) * 10);
        filesProcessed += 1;
      }
    }
    if (glossarDateien.length > 0) {
      await importGlossarFiles(kursDir.name, glossarDateien);
      filesProcessed += glossarDateien.length;
    }
  }

  return { filesProcessed, itemsImported };
}

/**
 * CLI-Einstiegspunkt (`pnpm db:import-content`) — läuft nur, wenn diese Datei direkt
 * ausgeführt wird, nicht beim bloßen Import als Modul. Ohne diese Guard würde admin.ts durch
 * den Import allein sofort einen vollen Content-Import auslösen und danach den gemeinsamen
 * DB-Pool des Servers schließen.
 */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  importAllContent()
    .then((summary) => {
      console.log(`Import abgeschlossen: ${summary.filesProcessed} Dateien, ${summary.itemsImported} Content-Items.`);
      return pool.end();
    })
    .catch((error: unknown) => {
      console.error("Content-Import fehlgeschlagen:", error);
      process.exit(1);
    });
}
