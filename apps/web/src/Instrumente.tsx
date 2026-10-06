import {
  FLAG_AUFGABEN,
  TERMINAL_SZENARIEN,
  angebotInstrument,
  angebotLernpfad,
  angebotSzenarien,
  angebotWerkzeug,
  topologieSzenarien,
  type KursAngebotGruppe,
} from "@edukedo/shared";
import { useMemo, useState } from "react";
import {
  AblaufIllustration,
  AbcIllustration,
  AnalysewerkzeugeIllustration,
  AnsoffIllustration,
  BpmnIllustration,
  DatenqualitaetIllustration,
  DonabedianIllustration,
  BscIllustration,
  EisenhowerIllustration,
  ErModellIllustration,
  GanttIllustration,
  HierarchieIllustration,
  BeschaffungIllustration,
  BeurteilungsfehlerIllustration,
  FertigungsverfahrenIllustration,
  GitIllustration,
  HandlungsfelderIllustration,
  KalkulationIllustration,
  KlassenbeziehungenIllustration,
  KostentraegerIllustration,
  LernzielbereicheIllustration,
  MusterIllustration,
  NetzplanIllustration,
  TestverfahrenIllustration,
  NormalisierungIllustration,
  IncotermsIllustration,
  InstandhaltungIllustration,
  IndustrieprotokolleIllustration,
  Ishikawa6mIllustration,
  IshikawaIllustration,
  OsiIllustration,
  PdcaIllustration,
  NetzsicherheitIllustration,
  ProjektphasenIllustration,
  PpsIllustration,
  PyramideIllustration,
  RegelwerkeIllustration,
  RaidIllustration,
  RisikoIllustration,
  SchutzzieleIllustration,
  SeciIllustration,
  SensorAktorIllustration,
  SicherungsartenIllustration,
  SkalenniveausIllustration,
  StakeholderIllustration,
  SwitchingIllustration,
  ScrumIllustration,
  SqlIllustration,
  SqlUebungIllustration,
  FlagRaetselIllustration,
  TerminalLaborIllustration,
  TopologieLaborIllustration,
  SubnettingIllustration,
  SwotIllustration,
  TeststufenIllustration,
  TopIllustration,
  UmlIllustration,
  VerzeichnisdienstIllustration,
  VierStufenIllustration,
  ZonenkonzeptIllustration,
} from "./InstrumentIllustrations";
import { InstrumentLernpfad } from "./InstrumentLernpfad";
import { Netzplan } from "./Netzplan";
import { FlagRaetsel } from "./FlagRaetsel";
import { SqlUebungsflaeche } from "./SqlUebung";
import { TerminalLabor } from "./TerminalLabor";
import { TopologieLabor } from "./TopologieLabor";
import { Subnetting } from "./Subnetting";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

/**
 * F-105 (ToDo-Punkt 6 vom 23.09.2026, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
 * Abschnitt 13): kursspezifischer Werkzeugkasten-Katalog — löst den bisherigen "Statt eines
 * reinen Such-/Notizen-Bereichs"-Zustand des Tabs "Instrumente" ab (Suche.tsx/MeineNotizen.tsx
 * bleiben als zusätzlicher Inhalt darunter erhalten, siehe App.tsx — nicht ersetzt, da beide
 * eigenständig wertvoll bleiben, nur nicht mehr der einzige Inhalt des Tabs). Die acht
 * Instrumente sind hier bewusst als STATISCHE Liste hinterlegt (keine eigene DB-Tabelle nötig —
 * es handelt sich um eine feste, im Code bekannte Menge fachlicher Modelle, keine
 * content-autorierte Sammlung), `content.instruments` liefert nur, WOHIN "Zu diesem Instrument
 * lernen" je Kurs springt (kursspezifisch: der Mathe-Kurs hat andere Instrumente mit Content
 * hinterlegt als der Fachwirt-Kurs). Der Lernpfad "erst Wissenstest per Quiz, danach Anwendung am
 * Instrument" steckt nicht in einer eigenen Sequenzierung, sondern darin, dass das verlinkte
 * Thema sowohl gewöhnliche Wissensfragen als auch die Zonen-/Baum-Zuordnungsfrage des Instruments
 * enthält (siehe content/README.md) — der bestehende F-27-Themenfilter zeigt beides gemischt.
 * F-146 (Nutzer-Vorgabe vom 05.10.2026): Kacheln (`Tile.tsx`) mit eigener Illustration je Instrument
 * (`InstrumentIllustrations.tsx`) statt Listenzeilen; Logik und Texte unverändert.
 */
const INSTRUMENT_CATALOG = [
  {
    type: "swot",
    label: "SWOT-Matrix",
    description: "Stärken, Schwächen, Chancen und Risiken strukturiert gegenüberstellen.",
    Illustration: SwotIllustration,
  },
  {
    type: "bsc",
    label: "Balanced Scorecard",
    description: "Unternehmenserfolg aus vier Perspektiven gleichzeitig betrachten.",
    Illustration: BscIllustration,
  },
  {
    type: "ansoff",
    label: "Ansoff-Matrix",
    description: "Wachstumsstrategien anhand von Markt und Produkt einordnen.",
    Illustration: AnsoffIllustration,
  },
  {
    type: "gantt",
    label: "Gantt-Diagramm",
    description: "Arbeitspakete den passenden Zeitabschnitten eines Projekts zuordnen.",
    Illustration: GanttIllustration,
  },
  {
    type: "eisenhower",
    label: "Eisenhower-Matrix",
    description: "Aufgaben nach Dringlichkeit und Wichtigkeit priorisieren.",
    Illustration: EisenhowerIllustration,
  },
  {
    type: "pdca",
    label: "PDCA-Zyklus",
    description: "Verbesserungsmaßnahmen den vier Phasen Plan, Do, Check und Act zuordnen.",
    Illustration: PdcaIllustration,
  },
  {
    type: "risiko",
    label: "Risikomatrix",
    description: "Risiken nach Eintrittswahrscheinlichkeit und Auswirkung einschätzen.",
    Illustration: RisikoIllustration,
  },
  {
    type: "hierarchie",
    label: "Projektstrukturplan / Organigramm",
    description: "Aufgaben oder Positionen als echten Baum in die richtige Hierarchie-Ebene einordnen.",
    Illustration: HierarchieIllustration,
  },
  // F-156 (IT-Instrumente für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
  // Architekturplanung Abschnitt 13): derselbe Mechanismus wie oben — die Typen stehen in
  // QUADRANT_MODELS (quiz-logic.ts), der Content kommt aus den Fachinformatiker-Kursen.
  {
    type: "osi",
    label: "OSI-Modell",
    description: "Protokolle, Geräte und Fehlerbilder den sieben Schichten zuordnen.",
    Illustration: OsiIllustration,
  },
  {
    type: "schutzziele",
    label: "Schutzziele der IT-Sicherheit",
    description: "Maßnahmen und Vorfälle Vertraulichkeit, Integrität, Verfügbarkeit und Authentizität zuordnen.",
    Illustration: SchutzzieleIllustration,
  },
  {
    type: "sql",
    label: "SQL-Befehlsgruppen",
    description: "Anweisungen den Gruppen DDL, DML, DQL, DCL und TCL zuordnen.",
    Illustration: SqlIllustration,
  },
  {
    type: "scrum",
    label: "Scrum",
    description: "Rollen, Events und Artefakte unterscheiden.",
    Illustration: ScrumIllustration,
  },
  {
    type: "uml",
    label: "UML-Diagramme",
    description: "Notationselemente und Aufgaben dem passenden Diagrammtyp zuordnen.",
    Illustration: UmlIllustration,
  },
  {
    type: "teststufen",
    label: "Teststufen im V-Modell",
    description: "Testaktivitäten der richtigen Stufe vom Komponenten- bis zum Abnahmetest zuordnen.",
    Illustration: TeststufenIllustration,
  },
  // F-162 (weitere IT-Instrumente, siehe Architekturplanung Abschnitt 13): wiederum Zonen-Zuordnung
  // über QUADRANT_MODELS, Content in den gemeinsamen Fachgebieten FU4/FU5 der Fachinformatiker-Kurse.
  {
    type: "ermodell",
    label: "ER-Modell",
    description: "Begriffe den Bausteinen Entitätstyp, Attribut, Beziehung und Kardinalität zuordnen.",
    Illustration: ErModellIllustration,
  },
  {
    type: "normalisierung",
    label: "Normalformen",
    description: "Mängel und Maßnahmen der 1., 2. oder 3. Normalform zuordnen.",
    Illustration: NormalisierungIllustration,
  },
  {
    type: "ablauf",
    label: "Ablaufstrukturen",
    description: "Abläufe in Pseudocode und Aktivitätsdiagramm als Sequenz, Verzweigung oder Schleife erkennen.",
    Illustration: AblaufIllustration,
  },
  // F-176 (Kursprofile Phase 1, Anwendungsentwicklung): vier weitere Zonen-Instrumente.
  {
    type: "muster",
    label: "Entwurfs- und Architekturmuster",
    description: "Singleton, Fabrikmethode, Beobachter und MVC an Situationen aus der Entwicklung erkennen.",
    Illustration: MusterIllustration,
  },
  {
    type: "klassenbeziehungen",
    label: "UML-Klassenbeziehungen",
    description: "Assoziation, Aggregation, Komposition, Vererbung und Abhängigkeit unterscheiden.",
    Illustration: KlassenbeziehungenIllustration,
  },
  {
    type: "testverfahren",
    label: "Testverfahren",
    description: "Statische Verfahren sowie Black-Box- und White-Box-Tests den passenden Beispielen zuordnen.",
    Illustration: TestverfahrenIllustration,
  },
  {
    type: "git",
    label: "Git-Bereiche",
    description: "Wohin wandern die Änderungen? Arbeitsverzeichnis, Staging, lokales und Remote-Repository.",
    Illustration: GitIllustration,
  },
  // F-178 (Kursprofile Phase 1, Daten- und Prozessanalyse): vier weitere Zonen-Instrumente.
  {
    type: "bpmn",
    label: "BPMN-2.0-Bausteine",
    description: "Ereignisse, Aktivitäten, Gateways, Flüsse und Pools/Lanes in Prozessausschnitten erkennen.",
    Illustration: BpmnIllustration,
  },
  {
    type: "analysewerkzeuge",
    label: "Analysewerkzeuge der Prozessanalyse",
    description: "Welche Frage beantwortet welches Werkzeug? Pareto, Ishikawa, Engpass-, Wertstromanalyse und Process Mining.",
    Illustration: AnalysewerkzeugeIllustration,
  },
  {
    type: "datenqualitaet",
    label: "Datenqualitäts-Dimensionen",
    description: "Befunde in Daten der passenden Dimension zuordnen: Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität.",
    Illustration: DatenqualitaetIllustration,
  },
  {
    type: "skalenniveaus",
    label: "Skalenniveaus",
    description: "Merkmale als nominal, ordinal, intervall- oder verhältnisskaliert einordnen.",
    Illustration: SkalenniveausIllustration,
  },
  // F-179 (Kursprofile Phase 1, Digitale Vernetzung): vier weitere Zonen-Instrumente.
  {
    type: "pyramide",
    label: "Automatisierungspyramide",
    description: "Geräte und Systeme der richtigen Ebene zuordnen: vom Feldgerät über SPS und Leitstand bis zum ERP.",
    Illustration: PyramideIllustration,
  },
  {
    type: "sensoraktor",
    label: "Sensor, Steuerung, Aktor, Kommunikation",
    description: "Bauteile nach ihrer Rolle im cyber-physischen System einordnen: erfassen, verarbeiten, ausführen, übertragen.",
    Illustration: SensorAktorIllustration,
  },
  {
    type: "industrieprotokolle",
    label: "Industrie- und IoT-Protokolle",
    description: "Feldbus, Modbus, OPC UA und MQTT an ihren typischen Eigenschaften erkennen.",
    Illustration: IndustrieprotokolleIllustration,
  },
  {
    type: "zonenkonzept",
    label: "Zonenkonzept IT/OT",
    description: "Systeme der Büro-IT, der DMZ, dem Produktionsnetz oder der Zelle zuordnen.",
    Illustration: ZonenkonzeptIllustration,
  },
  // F-180 (Kursprofile Phase 1, Systemintegration): fünf weitere Zonen-Instrumente.
  {
    type: "sicherungsarten",
    label: "Sicherungsarten",
    description: "Voll-, inkrementelle und differentielle Sicherung an Szenarien und Wiederherstellungsketten erkennen.",
    Illustration: SicherungsartenIllustration,
  },
  {
    type: "raid",
    label: "RAID-Level",
    description: "RAID 0, 1, 5, 6 und 10 an Kapazität, Ausfallschutz und Leistung unterscheiden.",
    Illustration: RaidIllustration,
  },
  {
    type: "netzsicherheit",
    label: "Netzwerksicherheits-Bausteine",
    description: "Firewall, NAT, VPN, DMZ und Zugangskontrolle am Netzrand an Einsatzszenarien erkennen.",
    Illustration: NetzsicherheitIllustration,
  },
  {
    type: "verzeichnisdienst",
    label: "Verzeichnisdienst und Berechtigungen",
    description: "Konto, Gruppe, OU, Gruppenrichtlinie und Berechtigung den passenden Verwaltungsaufgaben zuordnen.",
    Illustration: VerzeichnisdienstIllustration,
  },
  {
    type: "switching",
    label: "Switching, VLAN, Routing und Redundanz",
    description: "Probleme und passende Netzwerklösungen zuordnen: Layer 2, VLAN, Routing und Spanning Tree.",
    Illustration: SwitchingIllustration,
  },
  // F-181 (Kursprofile Phase 1, AEVO): fünf Zonen-Instrumente für die Ausbildereignung.
  {
    type: "handlungsfelder",
    label: "Handlungsfelder der AEVO",
    description: "Ausbildungstätigkeiten dem passenden der vier Handlungsfelder zuordnen: planen, vorbereiten, durchführen, abschließen.",
    Illustration: HandlungsfelderIllustration,
  },
  {
    type: "vierstufen",
    label: "Vier-Stufen-Methode",
    description: "Handlungen in der Unterweisung der richtigen Stufe zuordnen: von der Vorführung bis zum selbstständigen Durchführen.",
    Illustration: VierStufenIllustration,
  },
  {
    type: "lernzielbereiche",
    label: "Lernzielbereiche",
    description: "Lernziele als kognitiv (Wissen), affektiv (Haltung) oder psychomotorisch (Fertigkeit) einordnen.",
    Illustration: LernzielbereicheIllustration,
  },
  {
    type: "beurteilungsfehler",
    label: "Beurteilungsfehler",
    description: "Typische Verzerrungen in Beurteilungen erkennen: Halo-Effekt, Tendenz zur Mitte, Milde, Sympathie und Recency.",
    Illustration: BeurteilungsfehlerIllustration,
  },
  {
    type: "regelwerke",
    label: "Regelwerke der Berufsausbildung",
    description: "BBiG, Jugendarbeitsschutzgesetz, Ausbildungsordnung und Rahmenlehrplan an ihren Regelungsgegenständen unterscheiden.",
    Illustration: RegelwerkeIllustration,
  },
  // F-182 (Kursprofile Phase 1, Gesundheit/Soziales): zwei Zonen-Instrumente für Qualitätsmanagement und Finanzierung.
  {
    type: "donabedian",
    label: "Qualitätsdimensionen nach Donabedian",
    description: "Merkmale der Struktur-, Prozess- und Ergebnisqualität unterscheiden — mit Beispielen aus Organisation und Qualitätsmanagement.",
    Illustration: DonabedianIllustration,
  },
  {
    type: "kostentraeger",
    label: "Kostenträger im Gesundheits- und Sozialwesen",
    description: "Wer zahlt was? Leistungen den Kostenträgern zuordnen — eine Übung zur Systematik, keine Sozialberatung.",
    Illustration: KostentraegerIllustration,
  },
  // F-183 (Kursprofile Phase 1, Büro-/Projektorganisation): drei Zonen-Instrumente für Projektmanagement und Beschaffung.
  {
    type: "projektphasen",
    label: "Projektphasen",
    description: "Tätigkeiten den sechs Schritten eines Projekts zuordnen: vom Projektauftrag bis zur Evaluation.",
    Illustration: ProjektphasenIllustration,
  },
  {
    type: "stakeholder",
    label: "Stakeholder-Matrix",
    description: "Beteiligte nach Einfluss und Interesse einordnen: eng einbinden, zufriedenstellen, informieren oder beobachten.",
    Illustration: StakeholderIllustration,
  },
  {
    type: "abc",
    label: "ABC-Analyse",
    description: "Güter, Lieferanten oder Aufgaben nach ihrem Wertanteil als A-, B- oder C-Klasse einordnen.",
    Illustration: AbcIllustration,
  },
  // F-184 (Kursprofile Phase 1, Industriefachwirt): sechs Zonen-Instrumente für Produktion, Beschaffung, Wissensmanagement, Kalkulation und Export.
  {
    type: "pps",
    label: "PPS-Aufgaben",
    description: "Tätigkeiten der Produktionsplanung und -steuerung den Stufen zuordnen: Programm, Menge, Termine und Kapazität, Steuerung.",
    Illustration: PpsIllustration,
  },
  {
    type: "beschaffung",
    label: "Beschaffungsstrategien",
    description: "Vorrats-, Einzelbeschaffung, Just-in-Time und Just-in-Sequence an Bedarfssituationen und Merkmalen erkennen.",
    Illustration: BeschaffungIllustration,
  },
  {
    type: "seci",
    label: "SECI-Modell der Wissensumwandlung",
    description: "Beispiele aus dem Betrieb den vier Phasen zuordnen: Sozialisation, Externalisierung, Kombination, Internalisierung.",
    Illustration: SeciIllustration,
  },
  {
    type: "ishikawa",
    label: "Ishikawa-Diagramm (Ursachenkategorien)",
    description: "Mögliche Ursachen eines Qualitätsproblems den sechs Kategorien zuordnen: Mensch, Maschine, Material, Methode, Mitwelt, Management.",
    Illustration: IshikawaIllustration,
  },
  {
    type: "kalkulation",
    label: "Zuschlagskalkulation",
    description: "Kostenbestandteile und Rechenschritte der Zuschlagskalkulation den Stufen zuordnen — von den Materialkosten bis zum Angebotspreis.",
    Illustration: KalkulationIllustration,
  },
  {
    type: "incoterms",
    label: "Incoterms",
    description: "EXW, FOB, CIF und DDP an der Verteilung von Kosten und Risiken zwischen Verkäufer und Käufer erkennen.",
    Illustration: IncotermsIllustration,
  },
  // F-185 (Kursprofile Phase 1, Technischer Fachwirt): vier Zonen-Instrumente für Fertigung, Instandhaltung, Arbeitsschutz und Qualität.
  {
    type: "fertigungsverfahren",
    label: "Fertigungsverfahren nach DIN 8580",
    description: "Verfahren den sechs Hauptgruppen zuordnen: Urformen, Umformen, Trennen, Fügen, Beschichten, Stoffeigenschaft ändern.",
    Illustration: FertigungsverfahrenIllustration,
  },
  {
    type: "instandhaltung",
    label: "Instandhaltungsmaßnahmen nach DIN 31051",
    description: "Tätigkeiten als Wartung, Inspektion, Instandsetzung oder Verbesserung einordnen.",
    Illustration: InstandhaltungIllustration,
  },
  {
    type: "top",
    label: "TOP-Prinzip im Arbeitsschutz",
    description: "Schutzmaßnahmen als technisch, organisatorisch oder personenbezogen einordnen — in der Rangfolge ihrer Priorität.",
    Illustration: TopIllustration,
  },
  {
    type: "ishikawa6m",
    label: "Ishikawa-Diagramm (6M)",
    description: "Ursachen eines Qualitätsproblems den sechs Kategorien zuordnen: Mensch, Maschine, Material, Methode, Milieu, Management.",
    Illustration: Ishikawa6mIllustration,
  },
  // F-163 (Netzplan-Trainer, siehe Architekturplanung Abschnitt 13): kein Quiz-Content, sondern ein
  // eigener Rechentrainer — "werkzeug" markiert Einträge, die über `kurs.metadata.werkzeuge` (courses.list)
  // statt über Content-Items freigeschaltet werden.
  {
    type: "netzplan",
    label: "Netzplan",
    description: "Vorwärts- und Rückwärtsrechnung, Puffer und kritischen Pfad an zufälligen Aufgaben üben.",
    Illustration: NetzplanIllustration,
    werkzeug: true,
    aktion: "Netzplan üben",
  },
  // F-166 (Subnetting-Rechner, siehe Architekturplanung Abschnitt 13): freies Rechenwerkzeug, ebenfalls über
  // `kurs.metadata.werkzeuge` freigeschaltet (alle Fachinformatiker-Kurse).
  {
    type: "subnetting",
    label: "Subnetting-Rechner",
    description: "IPv4-Adressen und -Netze nachrechnen: Netz, Broadcast, Hostbereich, Binärdarstellung, Netze teilen.",
    Illustration: SubnettingIllustration,
    werkzeug: true,
    aktion: "Rechner öffnen",
  },
  // F-167 (SQL-Übungsfläche, siehe Architekturplanung Abschnitt 13): SQLite im Browser; Werkzeug-Schlüssel
  // "sqluebung" (der Schlüssel "sql" gehört dem Quiz-Instrument "SQL-Befehlsgruppen").
  {
    type: "sqluebung",
    label: "SQL-Übungsfläche",
    description: "Eigene SQL-Abfragen und Änderungen auf einer Beispieldatenbank ausprobieren — mit Aufgaben, Tipps und Prüfung.",
    Illustration: SqlUebungIllustration,
    werkzeug: true,
    aktion: "Übungsfläche öffnen",
  },
  // F-171 (Netzwerk-/Server-Simulationen und Flag-Rätsel, siehe Architekturplanung Abschnitt 13): drei
  // Werkzeuge, die komplett im Browser simulieren (keine echten Systeme, keine Speicherung, keine Wertung).
  {
    type: "terminal",
    label: "Terminal-Szenarien",
    description: "Störungen an simulierten Linux-Rechnern per Kommandozeile eingrenzen und beheben — ohne echte Server.",
    Illustration: TerminalLaborIllustration,
    werkzeug: true,
    aktion: "Terminal öffnen",
  },
  {
    type: "topologie",
    label: "Netzwerk-Topologie",
    description: "Geräte verkabeln, IP-Adressen und Gateways eintragen und prüfen, ob die Rechner miteinander sprechen können.",
    Illustration: TopologieLaborIllustration,
    werkzeug: true,
    aktion: "Netzwerk bauen",
  },
  {
    type: "flags",
    label: "Flag-Rätsel",
    description: "IT-Sicherheit spielerisch: Logdateien auswerten, Kodierungen entschlüsseln und Prüfsummen vergleichen.",
    Illustration: FlagRaetselIllustration,
    werkzeug: true,
    aktion: "Rätsel lösen",
  },
] as const;

export function Instrumente({
  kursId,
  instrumentLernpfadeEnabled,
  onGoToThema,
}: {
  kursId: string;
  instrumentLernpfadeEnabled: boolean;
  onGoToThema: (themaId: string, themaTitle: string) => void;
}) {
  const instruments = trpc.content.instruments.useQuery({ kursId });
  // F-129/F-130/F-131: welche Instrumente zusätzlich einen geführten Lernpfad haben — unabhängig
  // von `content.instruments` oben (Lernpfad und einzelne Quiz-Frage sind unabhängige Konzepte,
  // siehe F-105-Abgrenzung im Anforderungskatalog).
  const lernpfade = trpc.instrumentLernpfad.available.useQuery({ kursId });
  const [activeLernpfad, setActiveLernpfad] = useState<string | null>(null);
  // F-163: Übungswerkzeuge ohne Content (Netzplan) — Freischaltung je Kurs über courses.list.
  const courses = trpc.courses.list.useQuery();
  const kurs = courses.data?.find((course) => course.id === kursId);
  const kursWerkzeuge = kurs?.werkzeuge ?? [];
  // F-176: Kursprofil — null = keine Einschränkung (z. B. Mathematik).
  const angebot = kurs?.angebot ?? null;
  const [activeWerkzeug, setActiveWerkzeug] = useState<string | null>(null);
  // Erlaubte Szenarien je Werkzeug (undefined = alle); stabile Identität, weil die Labore sie als Abhängigkeit nutzen.
  const szenarien = useMemo(() => {
    const ids = (liste: readonly { id: string }[], werkzeug: "terminal" | "topologie" | "flags") =>
      angebot ? angebotSzenarien(angebot, werkzeug, liste).map((eintrag) => eintrag.id) : undefined;
    return {
      terminal: ids(TERMINAL_SZENARIEN, "terminal"),
      topologie: ids(topologieSzenarien, "topologie"),
      flags: ids(FLAG_AUFGABEN, "flags"),
    };
  }, [angebot]);

  if (activeWerkzeug === "netzplan") {
    return <Netzplan onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "subnetting") {
    return <Subnetting onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "sqluebung") {
    return <SqlUebungsflaeche onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "terminal") {
    return <TerminalLabor onClose={() => setActiveWerkzeug(null)} erlaubt={szenarien.terminal} />;
  }
  if (activeWerkzeug === "topologie") {
    return <TopologieLabor onClose={() => setActiveWerkzeug(null)} erlaubt={szenarien.topologie} />;
  }
  if (activeWerkzeug === "flags") {
    return <FlagRaetsel onClose={() => setActiveWerkzeug(null)} erlaubt={szenarien.flags} />;
  }

  if (activeLernpfad) {
    return (
      <InstrumentLernpfad
        kursId={kursId}
        instrumentType={activeLernpfad}
        onClose={() => setActiveLernpfad(null)}
      />
    );
  }

  function renderTile(instrument: (typeof INSTRUMENT_CATALOG)[number]) {
    const istWerkzeug = "werkzeug" in instrument;
    const target = istWerkzeug ? undefined : instruments.data?.[instrument.type];
    const werkzeugVerfuegbar = istWerkzeug;
    const lernpfad = angebotLernpfad(angebot, instrument.type) ? lernpfade.data?.find((entry) => entry.instrumentType === instrument.type) : undefined;
    return (
      <Tile
        key={instrument.type}
        title={instrument.label}
        description={instrument.description}
        image={<instrument.Illustration />}
        actions={
          <>
            {werkzeugVerfuegbar && (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveWerkzeug(instrument.type)}>
                {"aktion" in instrument ? instrument.aktion : "Öffnen"}
              </button>
            )}
            {target && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onGoToThema(target.themaId, target.themaTitle)}
              >
                Zu diesem Instrument lernen
              </button>
            )}
            {lernpfad &&
              (instrumentLernpfadeEnabled ? (
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveLernpfad(instrument.type)}>
                  Geführten Lernpfad starten
                </button>
              ) : (
                <span className="field-hint">Geführter Lernpfad: Fortgeschritten-Funktion, noch nicht freigeschaltet</span>
              ))}
          </>
        }
      />
    );
  }

  // F-176: Gruppe des Eintrags im Kursprofil; null = im Kurs nicht angeboten. Ein Instrument erscheint zusätzlich
  // erst, wenn der Kurs Inhalt dazu hat (Quiz-Items bzw. ein freigeschaltetes Werkzeug mit mindestens einem Szenario).
  function gruppeVon(instrument: (typeof INSTRUMENT_CATALOG)[number]): KursAngebotGruppe | null {
    if ("werkzeug" in instrument) {
      const gruppe = angebot ? angebotWerkzeug(angebot, instrument.type) : kursWerkzeuge.includes(instrument.type) ? "kern" : null;
      if (!gruppe) return null;
      const szenarioIds = instrument.type === "terminal" ? szenarien.terminal : instrument.type === "topologie" ? szenarien.topologie : instrument.type === "flags" ? szenarien.flags : undefined;
      return szenarioIds && szenarioIds.length === 0 ? null : gruppe;
    }
    const gruppe = angebotInstrument(angebot, instrument.type);
    return gruppe && instruments.data?.[instrument.type] ? gruppe : null;
  }
  const eintraege = INSTRUMENT_CATALOG.map((instrument) => ({ instrument, gruppe: gruppeVon(instrument) })).filter((eintrag) => eintrag.gruppe !== null);
  const kern = eintraege.filter((eintrag) => eintrag.gruppe === "kern").map((eintrag) => eintrag.instrument);
  const grundlagen = eintraege.filter((eintrag) => eintrag.gruppe === "grundlagen").map((eintrag) => eintrag.instrument);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Werkzeugkasten</h2>
      </div>
      <p className="field-hint">
        Je Instrument erst ein Wissenstest per Quiz, danach die praktische Anwendung am Instrument selbst — beides
        findet sich im jeweils verlinkten Thema. Für manche Instrumente gibt es zusätzlich einen geführten,
        mehrstufigen Lernpfad mit durchgehendem Fallbeispiel (Teil der Fortgeschritten-Funktionen, siehe unten).
      </p>
      {instruments.isLoading || courses.isLoading ? (
        <p>Lädt…</p>
      ) : (
        <>
          {/* F-176: nur Instrumente, die zum Kurs passen — keine „noch nicht verfügbar“-Kacheln mehr. */}
          {eintraege.length === 0 && <p className="field-hint">Für diesen Kurs gibt es derzeit keine Instrumente und Werkzeuge.</p>}
          {kern.length > 0 && (
            <>
              {grundlagen.length > 0 && <h3 className="tile-group-title">Kernangebot</h3>}
              <div className="tile-grid">{kern.map(renderTile)}</div>
            </>
          )}
          {grundlagen.length > 0 && (
            <>
              <h3 className="tile-group-title">Grundlagen (gemeinsamer Teil 1)</h3>
              <div className="tile-grid">{grundlagen.map(renderTile)}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
