import { kennzahlenDuellPayloadSchema, kreuzwortraetselPayloadSchema, memoryPayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { kennzahlenDuellItBegriffe } from "./content/game-kennzahlen-duell-it-begriffe";
import {
  bugHuntPayloadSchema,
  codeReihenfolgePayloadSchema,
  DEFAULT_GAME_SET_KEY,
  phishingPayloadSchema,
  subnettingPayloadSchema,
  troubleshootingPayloadSchema,
  zahlensystemePayloadSchema,
  SUBNETTING_TYPEN,
  ZAHLENSYSTEM_TYPEN,
} from "@edukedo/shared";
import { bugHuntCodefehler } from "./content/game-bughunt-codefehler";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
import { bugHuntSchleifen } from "./content/game-bughunt-schleifen";
import { bugHuntSkripteKonfiguration } from "./content/game-bughunt-skripte-konfiguration";
import { bugHuntSqlFehler } from "./content/game-bughunt-sql-fehler";
import { codeReihenfolgeGrundmuster } from "./content/game-codereihenfolge-grundmuster";
import { kennzahlenDuellFinanzierungControlling } from "./content/game-kennzahlen-duell-finanzierung-controlling";
import { kennzahlenDuellGesundheitSozialsystem } from "./content/game-kennzahlen-duell-gesundheit-sozialsystem";
import { kennzahlenDuellHandelAehnlich } from "./content/game-kennzahlen-duell-handel-aehnlich";
import { kennzahlenDuellKostenLeistungen } from "./content/game-kennzahlen-duell-kosten-leistungen";
import { kennzahlenDuellProjektmanagement } from "./content/game-kennzahlen-duell-projektmanagement";
import { kennzahlenDuellRechtBerufsausbildung } from "./content/game-kennzahlen-duell-recht-berufsausbildung";
import { kennzahlenDuellSpeditionFracht } from "./content/game-kennzahlen-duell-spedition-fracht";
import { kennzahlenDuellSqlDatenmodellierung } from "./content/game-kennzahlen-duell-sql-datenmodellierung";
import { kennzahlenDuellTechnischeUnterscheidungen } from "./content/game-kennzahlen-duell-technische-unterscheidungen";
import { kreuzwortraetselNetzwerkSicherheit } from "./content/game-kreuzwortraetsel-netzwerk-sicherheit";
import { memoryPortsProtokolle } from "./content/game-memory-ports-protokolle";
import { phishingItAlltag } from "./content/game-phishing-it-alltag";
import { troubleshootingIndustrieIot } from "./content/game-troubleshooting-industrie-iot";
import { troubleshootingNetzwerk } from "./content/game-troubleshooting-netzwerk";
import { troubleshootingServerdienste } from "./content/game-troubleshooting-serverdienste";
import { troubleshootingSwitchingRouting } from "./content/game-troubleshooting-switching-routing";
import { kennzahlenDuellQmProzesse } from "./content/game-kennzahlen-duell-qm-prozesse";
import { kreuzwortraetselItFachbegriffe } from "./content/game-kreuzwortraetsel-it-fachbegriffe";
import { kreuzwortraetselFinanzkennzahlen } from "./content/game-kreuzwortraetsel-finanzkennzahlen";
import { memoryItBegriffe } from "./content/game-memory-it-begriffe";
import { memoryPersonalkennzahlen } from "./content/game-memory-personalkennzahlen";
import { game, kurs } from "./schema";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13): lädt
 * die drei Gaming-Tab-Lernspiele aus `db/content/` in `game` — exakt dasselbe Muster wie
 * `seed-instrument-lernpfad.ts` (eigenes Skript statt einer Erweiterung von `import-content.ts`,
 * da die Inhalte NICHT dem Markdown-Zwischenformat folgen, sondern als getypte TS-Objekte
 * vorliegen und vor dem Schreiben per Zod validiert werden). Upsert über den Unique-Index
 * (kurs_id, game_type) — ein erneuter Lauf nach einer Content-Korrektur ersetzt den vorhandenen
 * Eintrag, statt Duplikate anzulegen.
 */
async function upsertGame(
  kursSlug: string,
  gameType: string,
  title: string,
  payload: unknown,
  setKey: string = DEFAULT_GAME_SET_KEY,
): Promise<void> {
  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) {
    throw new Error(`Kurs "${kursSlug}" wurde nicht gefunden — zuerst db:import-content laufen lassen.`);
  }

  await db
    .insert(game)
    .values({ kursId: kursRow.id, gameType, setKey, title, payload: payload as object })
    .onConflictDoUpdate({
      target: [game.kursId, game.gameType, game.setKey],
      set: { title, payload: payload as object, updatedAt: new Date() },
    });

  console.log(`Spiel "${title}" (${kursSlug}/${gameType}/${setKey}) angelegt/aktualisiert.`);
}

async function main() {
  const kursSlug = "fachwirt-buero-projektorganisation";

  await upsertGame(
    kursSlug,
    "kreuzwortraetsel",
    "Kreuzworträtsel: Finanzkennzahlen",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselFinanzkennzahlen),
  );
  await upsertGame(
    kursSlug,
    "kennzahlen_duell",
    "Kennzahlen-Duell: Qualitätsmanagement und Prozesse",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellQmProzesse),
  );
  await upsertGame(
    kursSlug,
    "memory",
    "Kennzahlen-Memory: Personal",
    memoryPayloadSchema.parse(memoryPersonalkennzahlen),
  );

  // F-157 (Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
  // Architekturplanung Abschnitt 13): dieselben drei Spieltypen mit IT-Content, für alle vier
  // Fachinformatiker-Kurse identisch (wie die gemeinsamen Fachgebiete FU1–FU7). Der Titel je Kurs
  // steht in `game.title` und wird im Spiele-Katalog angezeigt.
  for (const fachinformatikSlug of [
    "fachinformatiker-anwendungsentwicklung",
    "fachinformatiker-systemintegration",
    "fachinformatiker-daten-prozessanalyse",
    "fachinformatiker-digitale-vernetzung",
  ]) {
    await upsertGame(
      fachinformatikSlug,
      "kreuzwortraetsel",
      "Kreuzworträtsel: IT-Fachbegriffe",
      kreuzwortraetselPayloadSchema.parse(kreuzwortraetselItFachbegriffe),
    );
    await upsertGame(
      fachinformatikSlug,
      "kennzahlen_duell",
      "Begriffe-Duell: IT-Grundlagen",
      kennzahlenDuellPayloadSchema.parse(kennzahlenDuellItBegriffe),
    );
    await upsertGame(
      fachinformatikSlug,
      "memory",
      "IT-Memory: Abkürzungen und Begriffe",
      memoryPayloadSchema.parse(memoryItBegriffe),
    );

    // F-158 (weitere Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026): zusätzliche
    // Sets der bekannten Spieltypen (setKey ≠ "standard") und sechs neue Spieltypen.
    await upsertGame(
      fachinformatikSlug,
      "kreuzwortraetsel",
      "Kreuzworträtsel: Netzwerk und IT-Sicherheit",
      kreuzwortraetselPayloadSchema.parse(kreuzwortraetselNetzwerkSicherheit),
      "netzwerk-sicherheit",
    );
    await upsertGame(
      fachinformatikSlug,
      "kennzahlen_duell",
      "Begriffe-Duell: SQL und Datenmodellierung",
      kennzahlenDuellPayloadSchema.parse(kennzahlenDuellSqlDatenmodellierung),
      "sql",
    );
    await upsertGame(
      fachinformatikSlug,
      "memory",
      "IT-Memory: Ports und Protokolle",
      memoryPayloadSchema.parse(memoryPortsProtokolle),
      "ports",
    );
    await upsertGame(fachinformatikSlug, "phishing", "Phishing-Detektiv: E-Mails prüfen", phishingPayloadSchema.parse(phishingItAlltag));
    await upsertGame(fachinformatikSlug, "bughunt", "Bug-Hunt: Fehlerzeilen finden", bugHuntPayloadSchema.parse(bugHuntCodefehler));
    await upsertGame(
      fachinformatikSlug,
      "codereihenfolge",
      "Code-Reihenfolge: Grundmuster",
      codeReihenfolgePayloadSchema.parse(codeReihenfolgeGrundmuster),
    );
    await upsertGame(
      fachinformatikSlug,
      "troubleshooting",
      "Troubleshooting-Detektiv: Netzwerkstörungen",
      troubleshootingPayloadSchema.parse(troubleshootingNetzwerk),
    );
    await upsertGame(
      fachinformatikSlug,
      "subnetting",
      "Subnetting-Sprint",
      subnettingPayloadSchema.parse({
        aufgabenTypen: [...SUBNETTING_TYPEN],
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Mit etwas Übung gehen Netzadresse, Broadcast und Maske bald im Schlaf.",
      }),
    );
    await upsertGame(
      fachinformatikSlug,
      "zahlensysteme",
      "Zahlensystem-Sprint",
      zahlensystemePayloadSchema.parse({
        aufgabenTypen: [...ZAHLENSYSTEM_TYPEN],
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Dual, dezimal und hexadezimal sind für dich bald keine Fremdsprachen mehr.",
      }),
    );
  }

  // Weitere Bug-Hunt-Sets (setKey ≠ "standard") nur für die Anwendungsentwicklung: Schleifen/Off-by-one,
  // Objektorientierung und SQL-Fehler passen zu den Lerninhalten dieses Berufs, nicht zu allen vier
  // Fachinformatiker-Kursen.
  const anwendungsentwicklungSlug = "fachinformatiker-anwendungsentwicklung";
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: Schleifen und Off-by-one",
    bugHuntPayloadSchema.parse(bugHuntSchleifen),
    "schleifen",
  );
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: Objektorientierung",
    bugHuntPayloadSchema.parse(bugHuntObjektorientierung),
    "objektorientierung",
  );
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: SQL-Fehler",
    bugHuntPayloadSchema.parse(bugHuntSqlFehler),
    "sql-fehler",
  );

  // Zusätzliches Bug-Hunt-Set (setKey ≠ "standard") nur für die Systemintegration: Fehler in Bash-,
  // PowerShell- und Python-Skripten sowie in sshd-, nginx- und ufw-Konfigurationen passen zu den
  // Lerninhalten dieses Berufs (Skripting, Konfigurationsmanagement).
  await upsertGame(
    "fachinformatiker-systemintegration",
    "bughunt",
    "Bug-Hunt: Skripte und Konfigurationsdateien",
    bugHuntPayloadSchema.parse(bugHuntSkripteKonfiguration),
    "skripte-konfiguration",
  );

  // Zusätzliches Troubleshooting-Set (setKey ≠ "standard") nur für Digitale Vernetzung: Störungsfälle aus
  // Industrie und IoT (Sensorik, Modbus, MQTT, OPC UA) passen zu den Lerninhalten dieses Berufs.
  await upsertGame(
    "fachinformatiker-digitale-vernetzung",
    "troubleshooting",
    "Troubleshooting-Detektiv: Industrie und IoT",
    troubleshootingPayloadSchema.parse(troubleshootingIndustrieIot),
    "industrie-iot",
  );

  // Zusätzliche Troubleshooting-Sets (setKey ≠ "standard") nur für die Systemintegration: Störungsfälle
  // rund um Serverdienste (Windows/Linux) sowie Switching und Routing passen zu den Lerninhalten dieses Berufs.
  const systemintegrationSlug = "fachinformatiker-systemintegration";
  await upsertGame(
    systemintegrationSlug,
    "troubleshooting",
    "Troubleshooting-Detektiv: Serverdienste",
    troubleshootingPayloadSchema.parse(troubleshootingServerdienste),
    "serverdienste",
  );
  await upsertGame(
    systemintegrationSlug,
    "troubleshooting",
    "Troubleshooting-Detektiv: Switching und Routing",
    troubleshootingPayloadSchema.parse(troubleshootingSwitchingRouting),
    "switching-routing",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Ausbildung der Ausbilder (AEVO)": Recht der
  // Berufsausbildung (Probezeit, Jugendarbeitsschutz, Ausbildungsvertrag/-plan, Prüfung und Zeugnis).
  await upsertGame(
    "ausbildung-der-ausbilder",
    "kennzahlen_duell",
    "Begriffe-Duell: Recht der Berufsausbildung",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellRechtBerufsausbildung),
    "recht-berufsausbildung",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Fachwirt für Gesundheits- und
  // Sozialwesen": Gesundheits- und Sozialsystem (Kostenträger, Qualitätsmanagement, Kostenverhalten, Arbeitsrecht).
  await upsertGame(
    "fachwirt-gesundheit-soziales",
    "kennzahlen_duell",
    "Begriffe-Duell: Gesundheits- und Sozialsystem",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellGesundheitSozialsystem),
    "gesundheit-sozialsystem",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Fachwirt für Büro- und
  // Projektorganisation": Projektmanagement (Projektauftrag und -start, Planung und Steuerung, Netzplan und
  // Puffer, Kontrolle, Dokumentation und Evaluation).
  await upsertGame(
    "fachwirt-buero-projektorganisation",
    "kennzahlen_duell",
    "Begriffe-Duell: Projektmanagement",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellProjektmanagement),
    "projektmanagement",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Industriefachwirt": Kosten und
  // Leistungen (Aufwand und Kosten, Kostenarten, Kostenstellen und Kalkulation, Voll- und Teilkostenrechnung).
  await upsertGame(
    "industriefachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Kosten und Leistungen",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellKostenLeistungen),
    "kosten-leistungen",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Technischer Fachwirt": Technische
  // Unterscheidungen (Werkstoffe und Werkstoffprüfung, Fertigung/Zeichnen/Passungen, Instandhaltung und Qualität,
  // Arbeitsschutz und Elektrotechnik).
  await upsertGame(
    "technischer-fachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Technische Unterscheidungen",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellTechnischeUnterscheidungen),
    "technische-unterscheidungen",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Wirtschaftsfachwirt": Finanzierung und
  // Controlling (Finanzierungsarten, Investitionsrechnung, Kosten- und Leistungsrechnung, Controlling und Kennzahlen).
  await upsertGame(
    "wirtschaftsfachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Finanzierung und Controlling",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellFinanzierungControlling),
    "finanzierung-controlling",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Bachelor Professional in Transport Management and
  // Logistics": Spedition und Fracht (Spedition und Frachtführer, Transportplanung und Disposition, Lager und
  // Bestand, Verkehrsträger und Zoll).
  await upsertGame(
    "transport-management-logistics",
    "kennzahlen_duell",
    "Begriffe-Duell: Spedition und Fracht",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellSpeditionFracht),
    "spedition-fracht",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Handelsfachwirt": Handel — ähnlich, aber
  // nicht gleich (Markt, Sortiment und Marketing, Bedarf und Beschaffung, Lager und Bestand, Konditionen, Investition
  // und Außenhandel).
  await upsertGame(
    "handelsfachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Handel — ähnlich, aber nicht gleich",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellHandelAehnlich),
    "handel-aehnlich",
  );

  await pool.end();
}

main().catch((error) => {
  console.error("Seed der Gaming-Tab-Spiele fehlgeschlagen:", error);
  process.exit(1);
});
