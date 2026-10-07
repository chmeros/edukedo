import { kennzahlenDuellPayloadSchema, kreuzwortraetselPayloadSchema, memoryPayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { kennzahlenDuellItBegriffe } from "./content/game-kennzahlen-duell-it-begriffe";
import { belegdetektivEinkauf } from "./content/game-belegdetektiv-einkauf";
import { datenDetektivQualitaet } from "./content/game-datendetektiv-datenqualitaet";
import { phishingFrachtBetrug } from "./content/game-phishing-fracht-betrug";
import { prozessSets } from "./content/game-prozessreihenfolge";
import {
  belegPayloadSchema,
  bugHuntPayloadSchema,
  codeReihenfolgePayloadSchema,
  DEFAULT_GAME_SET_KEY,
  phishingPayloadSchema,
  prozessReihenfolgePayloadSchema,
  rechensprintPayloadSchema,
  subnettingPayloadSchema,
  troubleshootingPayloadSchema,
  zahlensystemePayloadSchema,
  SUBNETTING_TYPEN,
  ZAHLENSYSTEM_TYPEN,
  type RechenTyp,
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
import { kennzahlenDuellImmobilienAehnlich } from "./content/game-kennzahlen-duell-immobilien-aehnlich";
import { kennzahlenDuellKostenLeistungen } from "./content/game-kennzahlen-duell-kosten-leistungen";
import { kennzahlenDuellProjektmanagement } from "./content/game-kennzahlen-duell-projektmanagement";
import { kennzahlenDuellRechtBerufsausbildung } from "./content/game-kennzahlen-duell-recht-berufsausbildung";
import { kennzahlenDuellSpeditionFracht } from "./content/game-kennzahlen-duell-spedition-fracht";
import { kennzahlenDuellSqlDatenmodellierung } from "./content/game-kennzahlen-duell-sql-datenmodellierung";
import { kennzahlenDuellTechnischeUnterscheidungen } from "./content/game-kennzahlen-duell-technische-unterscheidungen";
import { kennzahlenDuellVersicherungAehnlich } from "./content/game-kennzahlen-duell-versicherung-aehnlich";
import { kreuzwortraetselNetzwerkSicherheit } from "./content/game-kreuzwortraetsel-netzwerk-sicherheit";
import { kreuzwortraetselAevo } from "./content/game-kreuzwortraetsel-aevo";
import { memoryAevo } from "./content/game-memory-aevo";
import { kreuzwortraetselGesundheitSoziales } from "./content/game-kreuzwortraetsel-gesundheit-soziales";
import { memoryGesundheitSoziales } from "./content/game-memory-gesundheit-soziales";
import { kreuzwortraetselIndustrie } from "./content/game-kreuzwortraetsel-industrie";
import { memoryIndustrie } from "./content/game-memory-industrie";
import { kreuzwortraetselTechnik } from "./content/game-kreuzwortraetsel-technik";
import { memoryTechnik } from "./content/game-memory-technik";
import { kreuzwortraetselWirtschaft } from "./content/game-kreuzwortraetsel-wirtschaft";
import { memoryWirtschaft } from "./content/game-memory-wirtschaft";
import { kreuzwortraetselLogistik } from "./content/game-kreuzwortraetsel-logistik";
import { memoryLogistik } from "./content/game-memory-logistik";
import { kreuzwortraetselHandel } from "./content/game-kreuzwortraetsel-handel";
import { memoryHandel } from "./content/game-memory-handel";
import { kreuzwortraetselImmobilien } from "./content/game-kreuzwortraetsel-immobilien";
import { memoryImmobilien } from "./content/game-memory-immobilien";
import { kreuzwortraetselVersicherung } from "./content/game-kreuzwortraetsel-versicherung";
import { memoryVersicherung } from "./content/game-memory-versicherung";
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
  // nicht gleich (Markt, Sortiment und Marketing, Bedarf und Beschaffung, Lager und Bestand, Konditionen und
  // Investition).
  await upsertGame(
    "handelsfachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Handel — ähnlich, aber nicht gleich",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellHandelAehnlich),
    "handel-aehnlich",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Geprüfter Immobilienfachwirt": Immobilien — ähnlich,
  // aber nicht gleich (Eigentum, Grundbuch und Recht, Miete, WEG und Betriebskosten, Instandhaltung, Bau und Baurecht,
  // Bewertung, Makler und Vermarktung).
  await upsertGame(
    "immobilienfachwirt",
    "kennzahlen_duell",
    "Begriffe-Duell: Immobilien — ähnlich, aber nicht gleich",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellImmobilienAehnlich),
    "immobilien-aehnlich",
  );

  // Zusätzliches Begriffe-Duell (setKey ≠ "standard") nur für „Bachelor Professional in Versicherungen und
  // Finanzanlagen": Versicherung — ähnlich, aber nicht gleich (Personenversicherung und Vorsorge, Sach-, Haftpflicht-
  // und Ertragsausfallschutz, Beratung, Schaden und Leistung, Prämie, Risiko und Steuerung).
  await upsertGame(
    "versicherungen-finanzanlagen",
    "kennzahlen_duell",
    "Begriffe-Duell: Versicherung — ähnlich, aber nicht gleich",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellVersicherungAehnlich),
    "versicherung-aehnlich",
  );

  // F-193: Kreuzworträtsel- und Memory-Pools (Wiederspielbarkeit) für die Fachwirt-Kurse und die AEVO; setKeys "fachbegriffe" und "begriff-paare".
  // Sichtbar erst nach Freigabe: In kurs-angebot.ts stehen sie noch nicht in der Spieleliste.
  await upsertGame(
    "ausbildung-der-ausbilder",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Ausbildung",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselAevo),
    "fachbegriffe",
  );
  await upsertGame("ausbildung-der-ausbilder", "memory", "Memory: Begriffe der Ausbildung", memoryPayloadSchema.parse(memoryAevo), "begriff-paare");
  await upsertGame(
    "fachwirt-gesundheit-soziales",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe im Gesundheits- und Sozialwesen",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselGesundheitSoziales),
    "fachbegriffe",
  );
  await upsertGame("fachwirt-gesundheit-soziales", "memory", "Memory: Begriffe im Gesundheits- und Sozialwesen", memoryPayloadSchema.parse(memoryGesundheitSoziales), "begriff-paare");
  await upsertGame(
    "industriefachwirt",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Industrie",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselIndustrie),
    "fachbegriffe",
  );
  await upsertGame("industriefachwirt", "memory", "Memory: Begriffe der Industrie", memoryPayloadSchema.parse(memoryIndustrie), "begriff-paare");
  await upsertGame(
    "technischer-fachwirt",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Technik",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselTechnik),
    "fachbegriffe",
  );
  await upsertGame("technischer-fachwirt", "memory", "Memory: Begriffe der Technik", memoryPayloadSchema.parse(memoryTechnik), "begriff-paare");
  await upsertGame(
    "wirtschaftsfachwirt",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Wirtschaft",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselWirtschaft),
    "fachbegriffe",
  );
  await upsertGame("wirtschaftsfachwirt", "memory", "Memory: Begriffe der Wirtschaft", memoryPayloadSchema.parse(memoryWirtschaft), "begriff-paare");
  await upsertGame(
    "transport-management-logistics",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Logistik",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselLogistik),
    "fachbegriffe",
  );
  await upsertGame("transport-management-logistics", "memory", "Memory: Begriffe der Logistik", memoryPayloadSchema.parse(memoryLogistik), "begriff-paare");
  await upsertGame(
    "handelsfachwirt",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe des Handels",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselHandel),
    "fachbegriffe",
  );
  await upsertGame("handelsfachwirt", "memory", "Memory: Begriffe des Handels", memoryPayloadSchema.parse(memoryHandel), "begriff-paare");
  await upsertGame(
    "immobilienfachwirt",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Immobilienwirtschaft",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselImmobilien),
    "fachbegriffe",
  );
  await upsertGame("immobilienfachwirt", "memory", "Memory: Begriffe der Immobilienwirtschaft", memoryPayloadSchema.parse(memoryImmobilien), "begriff-paare");
  await upsertGame(
    "versicherungen-finanzanlagen",
    "kreuzwortraetsel",
    "Kreuzworträtsel: Begriffe der Versicherung",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselVersicherung),
    "fachbegriffe",
  );
  await upsertGame("versicherungen-finanzanlagen", "memory", "Memory: Begriffe der Versicherung", memoryPayloadSchema.parse(memoryVersicherung), "begriff-paare");

  // F-194: Rechen-Sprint. Der Sprint hat keine festen Inhalte, das Payload wählt nur die Aufgabenarten je Kurs.
  // Set "rechnen" (Kalkulation) und "it-rechnen" sind freigegeben; "kennzahlen" (Lager, OEE: Rechenkonventionen) steht noch nicht in kurs-angebot.ts.
  const kaufmaennisch: RechenTyp[] = ["prozentwert", "skonto", "dreisatz", "zuschlag", "deckungsbeitrag", "breakeven"];
  const kennzahlenTypen: Record<string, RechenTyp[]> = {
    wirtschaftsfachwirt: ["umschlag", "lagerdauer", "andler"],
    industriefachwirt: ["umschlag", "lagerdauer", "andler", "oee"],
    "technischer-fachwirt": ["oee", "umschlag", "lagerdauer", "andler"],
    handelsfachwirt: ["umschlag", "lagerdauer", "andler"],
    "transport-management-logistics": ["umschlag", "lagerdauer", "andler"],
  };
  for (const [slug, typen] of Object.entries(kennzahlenTypen)) {
    await upsertGame(
      slug,
      "rechensprint",
      "Rechen-Sprint: Kalkulation",
      rechensprintPayloadSchema.parse({
        aufgabenTypen: kaufmaennisch,
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Prozent, Skonto, Zuschlag und Deckungsbeitrag gehen mit etwas Übung schnell von der Hand.",
      }),
      "rechnen",
    );
    await upsertGame(
      slug,
      "rechensprint",
      "Rechen-Sprint: Betriebskennzahlen",
      rechensprintPayloadSchema.parse({
        aufgabenTypen: typen,
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Umschlagshäufigkeit, Lagerdauer und optimale Bestellmenge sitzen schon besser.",
      }),
      "kennzahlen",
    );
  }
  const itTypen: Record<string, RechenTyp[]> = {
    "fachinformatiker-anwendungsentwicklung": ["uebertragung", "speicher", "stromkosten", "prozentwert", "skonto", "dreisatz"],
    "fachinformatiker-daten-prozessanalyse": ["uebertragung", "speicher", "stromkosten", "prozentwert", "skonto", "dreisatz"],
    "fachinformatiker-systemintegration": ["uebertragung", "speicher", "stromkosten", "verfuegbarkeit", "mtbf", "raid"],
    "fachinformatiker-digitale-vernetzung": ["uebertragung", "speicher", "stromkosten", "verfuegbarkeit", "mtbf", "raid"],
  };
  for (const [slug, typen] of Object.entries(itTypen)) {
    await upsertGame(
      slug,
      "rechensprint",
      "Rechen-Sprint: IT-Rechnen",
      rechensprintPayloadSchema.parse({
        aufgabenTypen: typen,
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Datenmengen, Übertragungszeiten und Verfügbarkeit gehören zu den häufigen Rechenaufgaben der Prüfung.",
      }),
      "it-rechnen",
    );
  }

  // F-219: Statistik-Sprint (Daten- und Prozessanalyse) und Algorithmen-Sprint (alle vier Fachinformatiker-Kurse; Kern in der Anwendungsentwicklung).
  await upsertGame(
    "fachinformatiker-daten-prozessanalyse",
    "rechensprint",
    "Rechen-Sprint: Statistik",
    rechensprintPayloadSchema.parse({
      aufgabenTypen: ["mittelwert", "median", "spannweite", "quartil", "stdabw"] satisfies RechenTyp[],
      anzahl: 10,
      abschlussmeldung: "Sprint geschafft! Mittelwert, Median, Quartile und Standardabweichung gehören zum Handwerkszeug jeder Datenanalyse.",
    }),
    "statistik",
  );
  for (const slug of ["fachinformatiker-anwendungsentwicklung", "fachinformatiker-daten-prozessanalyse", "fachinformatiker-digitale-vernetzung", "fachinformatiker-systemintegration"]) {
    await upsertGame(
      slug,
      "rechensprint",
      "Rechen-Sprint: Sortieren und Suchen",
      rechensprintPayloadSchema.parse({
        aufgabenTypen: ["sortvergleiche", "sorttausch", "sortwert", "binaersuche", "suchindex", "binmax"] satisfies RechenTyp[],
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Wer Sortier- und Suchverfahren von Hand durchspielen kann, liest Programmcode sicherer.",
      }),
      "algorithmen",
    );
  }

  // F-220: Daten-Detektiv (Datenqualität) als Set "daten" des Beleg-Detektivs für Daten- und Prozessanalyse. Im Kurs noch NICHT sichtbar:
  // Die Freigabe (Eintrag in kurs-angebot.ts) folgt der Fachprüfung (Prüfblatt 24), Rahmenentscheidung R3.
  await upsertGame("fachinformatiker-daten-prozessanalyse", "belegdetektiv", "Daten-Detektiv: Datenqualität", belegPayloadSchema.parse(datenDetektivQualitaet), "daten");

  // F-195: Prozess-Reihenfolge (Abläufe in Fließtext), ein Set "prozesse" je Kurs; Inhalte in game-prozessreihenfolge.ts.
  for (const set of prozessSets) {
    await upsertGame(set.slug, "prozessreihenfolge", set.titel, prozessReihenfolgePayloadSchema.parse(set.payload), set.setKey);
  }

  // F-196: Beleg-Detektiv (Wareneingang und Rechnungsprüfung) für Kurse mit Beschaffung, Betrugs-Detektiv für Transport/Logistik.
  for (const slug of ["handelsfachwirt", "industriefachwirt", "technischer-fachwirt", "wirtschaftsfachwirt", "fachwirt-buero-projektorganisation"]) {
    await upsertGame(slug, "belegdetektiv", "Beleg-Detektiv: Wareneingang und Rechnungsprüfung", belegPayloadSchema.parse(belegdetektivEinkauf), "belege");
  }
  await upsertGame(
    "transport-management-logistics",
    "phishing",
    "Betrugs-Detektiv: Fake-Spedition und Frachtbetrug",
    phishingPayloadSchema.parse(phishingFrachtBetrug),
    "fracht-betrug",
  );

  await pool.end();
}

main().catch((error) => {
  console.error("Seed der Gaming-Tab-Spiele fehlgeschlagen:", error);
  process.exit(1);
});
