import {
  FLAG_AUFGABEN,
  SQL_ALLE_UEBUNGEN,
  TERMINAL_SZENARIEN,
  angebotInstrument,
  angebotLernpfad,
  angebotSzenarien,
  angebotWerkzeug,
  topologieSzenarien,
  type KursAngebotGruppe,
} from "@edukedo/shared";
import { lazy, useMemo, useState } from "react";
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
  ArbeitszeitIllustration,
  KalkulationstrainerIllustration,
  UnterweisungsplanIllustration,
  LagerkennzahlenIllustration,
  SparverfahrenIllustration,
  LernzielcheckIllustration,
  AusbildungsplanIllustration,
  TestfaelleIllustration,
  MqttlaborIllustration,
  SkalierungIllustration,
  EnergierechnerIllustration,
  VerfuegbarkeitIllustration,
  StatistikIllustration,
  ProzesskennzahlenIllustration,
  SchreibtischtestIllustration,
  AlgorithmenIllustration,
  WirtschaftlichkeitIllustration,
  FertigungsverfahrenIllustration,
  FinanzrechnerIllustration,
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
  InvestitionIllustration,
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
  AuthfaktorenIllustration,
  KryptobausteineIllustration,
  MonitoringIllustration,
  CloudmodelleIllustration,
  AngriffsartenIllustration,
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
  VerkehrstraegerIllustration,
  HandelskalkulationIllustration,
  KraljicIllustration,
  XyzIllustration,
  AltersvorsorgeIllustration,
  VersicherungskennzahlenIllustration,
  RisikopolitikIllustration,
  BetriebskostenIllustration,
  KostengruppenIllustration,
  MieterhoehungIllustration,
  WegOrganeIllustration,
  WertermittlungIllustration,
  VerzeichnisdienstIllustration,
  VierSeitenIllustration,
  VierStufenIllustration,
  ZonenkonzeptIllustration,
} from "./InstrumentIllustrations";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

// Review WEB-22/WRK-44: Die Werkzeuge (Rechner, Labore) werden erst beim Öffnen geladen.
const InstrumentLernpfad = lazy(() => import("./InstrumentLernpfad").then((modul) => ({ default: modul.InstrumentLernpfad })));
const Quiz = lazy(() => import("./Quiz").then((modul) => ({ default: modul.Quiz })));
const Arbeitszeitpruefer = lazy(() => import("./Arbeitszeitpruefer").then((modul) => ({ default: modul.Arbeitszeitpruefer })));
const Handelskalkulation = lazy(() => import("./Handelskalkulation").then((modul) => ({ default: modul.Handelskalkulation })));
const Unterweisungsplaner = lazy(() => import("./Unterweisungsplaner").then((modul) => ({ default: modul.Unterweisungsplaner })));
const Lagerkennzahlen = lazy(() => import("./Lagerkennzahlen").then((modul) => ({ default: modul.Lagerkennzahlen })));
const Sparverfahren = lazy(() => import("./Sparverfahren").then((modul) => ({ default: modul.Sparverfahren })));
const Lernzielcheck = lazy(() => import("./Lernzielcheck").then((modul) => ({ default: modul.Lernzielcheck })));
const Ausbildungsplaner = lazy(() => import("./Ausbildungsplaner").then((modul) => ({ default: modul.Ausbildungsplaner })));
const Testfalltrainer = lazy(() => import("./Testfalltrainer").then((modul) => ({ default: modul.Testfalltrainer })));
const Mqttlabor = lazy(() => import("./Mqttlabor").then((modul) => ({ default: modul.Mqttlabor })));
const Skalierungsrechner = lazy(() => import("./Skalierungsrechner").then((modul) => ({ default: modul.Skalierungsrechner })));
const Energierechner = lazy(() => import("./Energierechner").then((modul) => ({ default: modul.Energierechner })));
const Verfuegbarkeitsrechner = lazy(() => import("./Verfuegbarkeitsrechner").then((modul) => ({ default: modul.Verfuegbarkeitsrechner })));
const Statistiktrainer = lazy(() => import("./Statistiktrainer").then((modul) => ({ default: modul.Statistiktrainer })));
const Prozesskennzahlen = lazy(() => import("./Prozesskennzahlen").then((modul) => ({ default: modul.Prozesskennzahlen })));
const Schreibtischtest = lazy(() => import("./Schreibtischtest").then((modul) => ({ default: modul.Schreibtischtest })));
const Algorithmen = lazy(() => import("./Algorithmen").then((modul) => ({ default: modul.Algorithmen })));
const Wirtschaftlichkeit = lazy(() => import("./Wirtschaftlichkeit").then((modul) => ({ default: modul.Wirtschaftlichkeit })));
const Finanzrechner = lazy(() => import("./Finanzrechner").then((modul) => ({ default: modul.Finanzrechner })));
const Netzplan = lazy(() => import("./Netzplan").then((modul) => ({ default: modul.Netzplan })));
const FlagRaetsel = lazy(() => import("./FlagRaetsel").then((modul) => ({ default: modul.FlagRaetsel })));
const SqlUebungsflaeche = lazy(() => import("./SqlUebung").then((modul) => ({ default: modul.SqlUebungsflaeche })));
const TerminalLabor = lazy(() => import("./TerminalLabor").then((modul) => ({ default: modul.TerminalLabor })));
const TopologieLabor = lazy(() => import("./TopologieLabor").then((modul) => ({ default: modul.TopologieLabor })));
const Subnetting = lazy(() => import("./Subnetting").then((modul) => ({ default: modul.Subnetting })));

/**
 * F-105 (ToDo-Punkt 6 vom 23.09.2026, Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
 * Abschnitt 13): kursspezifischer Werkzeugkasten-Katalog — löst den bisherigen "Statt eines
 * reinen Such-/Notizen-Bereichs"-Zustand des Tabs "Instrumente" ab (Suche.tsx/MeineNotizen.tsx
 * bleiben als zusätzlicher Inhalt darunter erhalten, siehe App.tsx — nicht ersetzt, da beide
 * eigenständig wertvoll bleiben, nur nicht mehr der einzige Inhalt des Tabs). Die acht
 * Instrumente sind hier bewusst als STATISCHE Liste hinterlegt (keine eigene DB-Tabelle nötig —
 * es handelt sich um eine feste, im Code bekannte Menge fachlicher Modelle, keine
 * content-autorierte Sammlung), `content.instruments` liefert nur, OB "Fragen zu diesem Instrument
 * üben" je Kurs angeboten wird (Review B8: Übungsrunde nur mit den Fragen dieses Instruments) (kursspezifisch: der Mathe-Kurs hat andere Instrumente mit Content
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
  // F-221 (I-FI-04 bis I-FI-06): gemeinsame Zonen-Instrumente der Fachinformatiker-Kurse.
  {
    type: "authfaktoren",
    label: "Authentifizierungsfaktoren",
    description: "Anmeldemethoden den Faktoren Wissen, Besitz und Eigenschaft zuordnen und erkennen, wann zwei Faktoren wirklich zwei sind.",
    Illustration: AuthfaktorenIllustration,
  },
  {
    type: "kryptobausteine",
    label: "Kryptografie-Bausteine",
    description: "Aufgaben und Eigenschaften der symmetrischen und asymmetrischen Verschlüsselung und der Hashverfahren unterscheiden.",
    Illustration: KryptobausteineIllustration,
  },
  {
    type: "monitoring",
    label: "Monitoring-Kategorien",
    description: "Messwerte und Meldungen den Kategorien Ressourcen, Verfügbarkeit, Netzwerk und Ereignisse zuordnen.",
    Illustration: MonitoringIllustration,
  },
  {
    type: "cloudmodelle",
    label: "Cloud-Servicemodelle",
    description: "On-Premises, IaaS, PaaS und SaaS an der Verantwortungsgrenze zwischen Anbieter und Kunde erkennen.",
    Illustration: CloudmodelleIllustration,
  },
  // F-222 (I-FI-02): Angriffsarten und Schutzmaßnahmen.
  {
    type: "angriffsarten",
    label: "Angriffsarten und Schutzmaßnahmen",
    description: "Merkmale, Szenarien und Abwehrmaßnahmen den Angriffsarten Injection, Man-in-the-Middle, DDoS, Social Engineering und Passwortangriffen zuordnen.",
    Illustration: AngriffsartenIllustration,
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
    description: "Handlungen in der Unterweisung der richtigen Stufe zuordnen: Vorbereiten, Vormachen und Erklären, Nachmachen lassen, Üben lassen.",
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
  // F-187 (Kursprofile Phase 1, Wirtschaftsfachwirt): zwei Zonen-Instrumente für Investitionsrechnung und Kommunikation.
  {
    type: "investition",
    label: "Investitionsrechenverfahren",
    description: "Verfahren und Merkmale den statischen oder dynamischen Investitionsrechnungen zuordnen — mit und ohne Zeitwert des Geldes.",
    Illustration: InvestitionIllustration,
  },
  {
    type: "vierseiten",
    label: "Vier-Seiten-Modell",
    description: "Aussagen aus Mitarbeitergesprächen der Sach-, Selbstoffenbarungs-, Beziehungs- oder Appellseite zuordnen.",
    Illustration: VierSeitenIllustration,
  },
  // F-188 (Kursprofile Phase 1, Transport/Logistik): Zonen-Instrument für die Wahl des Verkehrsträgers.
  {
    type: "verkehrstraeger",
    label: "Verkehrsträger",
    description: "Eigenschaften, Güter und Aufträge den vier Verkehrsträgern zuordnen: Straße, Schiene, Wasser und Luft.",
    Illustration: VerkehrstraegerIllustration,
  },
  // F-189 (Kursprofile Phase 1, Handelsfachwirt): drei Zonen-Instrumente für Bestandsführung, Preisbildung und Einkaufsstrategie (die ABC-Analyse
  // aus F-183 bekommt hier eigenen Content und nutzt den bestehenden Katalogeintrag).
  {
    type: "xyz",
    label: "XYZ-Analyse",
    description: "Artikel nach der Regelmäßigkeit ihres Verbrauchs den Klassen X, Y und Z zuordnen.",
    Illustration: XyzIllustration,
  },
  {
    type: "handelskalkulation",
    label: "Handelskalkulation",
    description: "Posten der Bezugs-, Selbstkosten- und Verkaufskalkulation der richtigen Stufe zuordnen.",
    Illustration: HandelskalkulationIllustration,
  },
  {
    type: "kraljic",
    label: "Kraljic-Matrix",
    description: "Beschaffungsobjekte nach Gewinnauswirkung und Versorgungsrisiko als Hebel-, Strategische, Standard- oder Engpassprodukte einordnen.",
    Illustration: KraljicIllustration,
  },
  // F-190 (Kursprofile Phase 1, Immobilienfachwirt): fünf Zonen-Instrumente für Bewertung, Mietverwaltung, WEG, Betriebskosten und Baukosten.
  {
    type: "wertermittlung",
    label: "Wertermittlungsverfahren",
    description: "Begriffe und Merkmale dem Vergleichswert-, Ertragswert- oder Sachwertverfahren zuordnen.",
    Illustration: WertermittlungIllustration,
  },
  {
    type: "mieterhoehung",
    label: "Wege der Mieterhöhung",
    description: "Vergleichsmiete, Modernisierungsumlage, Staffelmiete und Indexmiete anhand ihrer Merkmale auseinanderhalten.",
    Illustration: MieterhoehungIllustration,
  },
  {
    type: "wegorgane",
    label: "WEG-Organe",
    description: "Aufgaben der Eigentümerversammlung, des Verwalters und des Verwaltungsbeirats unterscheiden.",
    Illustration: WegOrganeIllustration,
  },
  {
    type: "betriebskosten",
    label: "Betriebskosten",
    description: "Kostenpositionen als umlagefähig, nicht umlagefähig oder verbrauchsabhängig abrechnen.",
    Illustration: BetriebskostenIllustration,
  },
  {
    type: "kostengruppen",
    label: "DIN-276-Kostengruppen",
    description: "Kostenpositionen eines Bauprojekts den sieben Kostengruppen von 100 bis 700 zuordnen.",
    Illustration: KostengruppenIllustration,
  },
  // F-191 (Kursprofile Phase 1, Versicherungen/Finanzanlagen): zwei Zonen-Instrumente für Altersvorsorge und Versicherungstechnik.
  {
    type: "altersvorsorge",
    label: "Drei-Schichten-Modell der Altersvorsorge",
    description: "Vorsorgeformen und ihre Merkmale der Basisversorgung, der Zusatzversorgung oder der privaten Vorsorge zuordnen.",
    Illustration: AltersvorsorgeIllustration,
  },
  {
    type: "versicherungskennzahlen",
    label: "Kennzahlen der Versicherungstechnik",
    description: "Bestandteile und Aussagen der Schadenquote, der Kostenquote oder der Combined Ratio zuordnen.",
    Illustration: VersicherungskennzahlenIllustration,
  },
  // F-192: Risikopolitik mit den Standardbegriffen (Versicherungen/Finanzanlagen).
  {
    type: "risikopolitik",
    label: "Risikopolitik",
    description: "Maßnahmen im Umgang mit einem Risiko als Vermeiden, Vermindern, Überwälzen oder Selbst tragen einordnen.",
    Illustration: RisikopolitikIllustration,
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
  // F-197 (Finanzmathe-Kern): Zinseszins, Sparplan, Kapitalwert, Annuität und Skonto-Effektivzins, komplett im Browser.
  {
    type: "finanzrechner",
    label: "Finanzrechner",
    description: "Zinseszins, Sparplan, Kapitalwert, Annuitätendarlehen mit Tilgungsplan und Skonto-Effektivzins nachrechnen — mit Rechenweg.",
    Illustration: FinanzrechnerIllustration,
    werkzeug: true,
    aktion: "Rechner öffnen",
  },
  // F-200 (Unterweisungs-Planer): Entwurf einer Unterweisung nach der Vier-Stufen-Methode im AEVO-Kurs.
  {
    type: "unterweisungsplan",
    label: "Unterweisungs-Planer",
    description: "Eine Unterweisung nach den vier Stufen planen: Ziele, Zeitplan, Medien, Lernerfolgskontrolle — mit Prüfpunkten und Entwurfsblatt.",
    Illustration: UnterweisungsplanIllustration,
    werkzeug: true,
    aktion: "Unterweisung planen",
  },
  // F-213 (Nutzwert- und Wirtschaftlichkeitsrechner): Nutzwertanalyse, TCO, Rabatt und Skonto, Kauf gegen Abonnement, in den Fachinformatiker-Kursen.
  {
    type: "wirtschaftlichkeit",
    label: "Nutzwert & Wirtschaftlichkeit",
    description: "Angebote mit Nutzwertanalyse und Sensitivität vergleichen, Gesamtkosten (TCO) berechnen, Rabatt und Skonto einrechnen und Kauf gegen Abonnement abwägen.",
    Illustration: WirtschaftlichkeitIllustration,
    werkzeug: true,
    aktion: "Angebote vergleichen",
  },
  // F-215 (Algorithmen-Visualisierer): Sortier- und Suchverfahren Schritt für Schritt, in den Fachinformatiker-Kursen.
  {
    type: "algorithmen",
    label: "Algorithmen-Visualisierer",
    description: "Bubblesort, Selectionsort, Insertionsort sowie lineare und binäre Suche Schritt für Schritt verfolgen, Vergleiche und Vertauschungen zählen und üben.",
    Illustration: AlgorithmenIllustration,
    werkzeug: true,
    aktion: "Algorithmus verfolgen",
  },
  // F-212 (Schreibtischtest-Trainer): Programme von Hand verfolgen, Trace-Tabellen ausfüllen, in den Fachinformatiker-Kursen.
  {
    type: "schreibtischtest",
    label: "Schreibtischtest",
    description: "Kleine Programme Schritt für Schritt verfolgen, die Trace-Tabelle ausfüllen und Fehler in Schleifen und Bedingungen finden.",
    Illustration: SchreibtischtestIllustration,
    werkzeug: true,
    aktion: "Programm verfolgen",
  },
  // F-211 (Prozesskennzahlen-Rechner): Durchlaufzeit, Engpass, Fehlerquote, Auslastung und Amortisation, im Kurs Daten- und Prozessanalyse.
  {
    type: "prozesskennzahlen",
    label: "Prozesskennzahlen",
    description: "Durchlaufzeit und Prozesseffizienz einer Prozessaufnahme berechnen, Engpässe finden, Fehlerquote, Auslastung und Amortisation bestimmen und an Aufgaben üben.",
    Illustration: ProzesskennzahlenIllustration,
    werkzeug: true,
    aktion: "Kennzahlen berechnen",
  },
  // F-210 (Statistik-Trainer): Kennzahlen einer Zahlenreihe, Boxplot, Ausreißer, Korrelation und Regression, im Kurs Daten- und Prozessanalyse.
  {
    type: "statistik",
    label: "Statistik-Trainer",
    description: "Lage- und Streuungsmaße, Quartile und Ausreißer einer Zahlenreihe mit Boxplot berechnen, Korrelation und Regressionsgerade bestimmen und an Aufgaben üben.",
    Illustration: StatistikIllustration,
    werkzeug: true,
    aktion: "Statistik rechnen",
  },
  // F-209 (Verfügbarkeits- und RAID-Rechner): Verfügbarkeit, Ausfallzeit, Reihen- und Parallelschaltung und RAID-Kapazität, in den Fachinformatiker-Kursen.
  {
    type: "verfuegbarkeit",
    label: "Verfügbarkeit und RAID",
    description: "Verfügbarkeit aus MTBF und MTTR berechnen, Ausfallzeiten bestimmen, Reihen- und Parallelschaltung durchrechnen und die nutzbare Kapazität von RAID-Verbünden bestimmen.",
    Illustration: VerfuegbarkeitIllustration,
    werkzeug: true,
    aktion: "Verfügbarkeit berechnen",
  },
  // F-208 (Energiebedarf-Rechner): Leistungsbudget, Energiekosten und Akkulaufzeit, im Kurs Digitale Vernetzung.
  {
    type: "energierechner",
    label: "Energiebedarf-Rechner",
    description: "Leistungsbudget eines PoE-Switches oder Netzteils prüfen, Energie und Stromkosten berechnen und die Laufzeit eines Akkus bestimmen.",
    Illustration: EnergierechnerIllustration,
    werkzeug: true,
    aktion: "Energie berechnen",
  },
  // F-207 (Skalierungs- und Modbus-Register-Rechner): analoge Signale skalieren und Modbus-Register deuten, im Kurs Digitale Vernetzung.
  {
    type: "skalierung",
    label: "Skalierung und Modbus-Register",
    description: "4–20-mA-Signale in Messwerte umrechnen, Fehler erkennen, Modbus-Register mit Faktor, Vorzeichen und 32 Bit deuten und Registeradressen ab 0 und ab 1 umrechnen.",
    Illustration: SkalierungIllustration,
    werkzeug: true,
    aktion: "Rechner öffnen",
  },
  // F-206 (MQTT-Labor): Broker-Simulation mit Topics, Platzhaltern, Zustellgüte, Retained Messages und Last Will, im Kurs Digitale Vernetzung.
  {
    type: "mqttlabor",
    label: "MQTT-Labor",
    description: "Einen simulierten MQTT-Broker bedienen: Abonnements mit Platzhaltern, Zustellgüte, gespeicherte Nachrichten und Last Will in Aufträgen und im freien Labor ausprobieren.",
    Illustration: MqttlaborIllustration,
    werkzeug: true,
    aktion: "MQTT ausprobieren",
  },
  // F-205 (Testfall-Trainer): Äquivalenzklassen und Grenzwerte an zufälligen Spezifikationen üben, im Kurs Anwendungsentwicklung.
  {
    type: "testfaelle",
    label: "Testfall-Trainer",
    description: "Zu einer Spezifikation Äquivalenzklassen bilden, Testwerte mit Grenzwerten beidseitig wählen und erwartete Ergebnisse bestimmen.",
    Illustration: TestfaelleIllustration,
    werkzeug: true,
    aktion: "Testfälle üben",
  },
  // F-204 (Ausbildungsplan-Zeitplaner): betrieblichen Ausbildungsplan als Zeitleiste in Wochen entwerfen, im AEVO-Kurs.
  {
    type: "ausbildungsplan",
    label: "Ausbildungsplan-Zeitplaner",
    description: "Einen betrieblichen Ausbildungsplan entwerfen: Abschnitte und Berufsschulblöcke in Wochen anlegen, Summe und Probezeit prüfen, Gliederung als Text ausgeben.",
    Illustration: AusbildungsplanIllustration,
    werkzeug: true,
    aktion: "Ausbildungsplan entwerfen",
  },
  // F-203 (Lernziel-Check): Feinziele auf überprüfbare Formulierung prüfen und üben, im AEVO-Kurs.
  {
    type: "lernzielcheck",
    label: "Lernziel-Check",
    description: "Feinziele auf Verb, Überprüfbarkeit, Bedingung, Maßstab und Lernzielbereich prüfen und an Beispielen üben, gute von schwachen Zielen zu unterscheiden.",
    Illustration: LernzielcheckIllustration,
    werkzeug: true,
    aktion: "Feinziel prüfen",
  },
  // F-202 (Sparverfahren-Trainer): Tourenplanung nach dem Savings-Algorithmus, im Kurs Transport/Logistik.
  {
    type: "sparverfahren",
    label: "Sparverfahren-Trainer",
    description: "Kunden mit dem Savings-Algorithmus auf Touren verteilen: Einsparungen berechnen, Paare verbinden, Kapazität beachten — mit Rechenweg und Vergleich zur besten Lösung.",
    Illustration: SparverfahrenIllustration,
    werkzeug: true,
    aktion: "Touren planen",
  },
  // F-201 (Lagerkennzahlen-Rechner): Umschlagshäufigkeit, Reichweite und Meldebestand üben und rechnen, im Handelsfachwirt.
  {
    type: "lagerkennzahlen",
    label: "Lagerkennzahlen-Rechner",
    description: "Umschlagshäufigkeit, Reichweite und Meldebestand an zufälligen Aufgaben üben und mit dem Rechner eigene Werte auswerten.",
    Illustration: LagerkennzahlenIllustration,
    werkzeug: true,
    aktion: "Lagerkennzahlen üben",
  },
  // F-199 (Handelskalkulation-Trainer): Vorwärts-, Rückwärts- und Differenzkalkulation mit Zeilenprüfung, im Handelsfachwirt.
  {
    type: "kalkulationstrainer",
    label: "Handelskalkulation-Trainer",
    description: "Vorwärts-, Rückwärts- und Differenzkalkulation an zufälligen Aufgaben üben und mit dem Rechner Kalkulationszuschlag, -faktor und Handelsspanne bestimmen.",
    Illustration: KalkulationstrainerIllustration,
    werkzeug: true,
    aktion: "Kalkulation üben",
  },
  // F-198 (Arbeitszeit-Prüfer): Übung zu den Grundregeln von ArbZG und JArbSchG; noch in keinem Kurs freigegeben (Rechtsprüfung).
  {
    type: "arbeitszeit",
    label: "Arbeitszeit-Prüfer",
    description: "Eine Arbeitswoche eintragen und gegen die Grundregeln zu Höchstarbeitszeit, Pausen und Ruhezeit prüfen, für Erwachsene und Jugendliche.",
    Illustration: ArbeitszeitIllustration,
    werkzeug: true,
    aktion: "Prüfer öffnen",
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
}: {
  kursId: string;
  instrumentLernpfadeEnabled: boolean;
}) {
  const instruments = trpc.content.instruments.useQuery({ kursId });
  // F-129/F-130/F-131: welche Instrumente zusätzlich einen geführten Lernpfad haben — unabhängig
  // von `content.instruments` oben (Lernpfad und einzelne Quiz-Frage sind unabhängige Konzepte,
  // siehe F-105-Abgrenzung im Anforderungskatalog).
  const lernpfade = trpc.instrumentLernpfad.available.useQuery({ kursId });
  const [activeLernpfad, setActiveLernpfad] = useState<string | null>(null);
  // Review B8: Übungsrunde nur mit den Fragen genau dieses Instruments (statt einer gemischten Themenrunde).
  const [activeRunde, setActiveRunde] = useState<{ type: string; label: string } | null>(null);
  // F-163: Übungswerkzeuge ohne Content (Netzplan) — Freischaltung je Kurs über courses.list.
  const courses = trpc.courses.list.useQuery();
  const kurs = courses.data?.find((course) => course.id === kursId);
  const kursWerkzeuge = kurs?.werkzeuge ?? [];
  // F-176: Kursprofil — null = keine Einschränkung (z. B. Mathematik).
  const angebot = kurs?.angebot ?? null;
  const [activeWerkzeug, setActiveWerkzeug] = useState<string | null>(null);
  // Erlaubte Szenarien je Werkzeug (undefined = alle); stabile Identität, weil die Labore sie als Abhängigkeit nutzen.
  const szenarien = useMemo(() => {
    const ids = (liste: readonly { id: string }[], werkzeug: "terminal" | "topologie" | "flags" | "sql") =>
      angebot ? angebotSzenarien(angebot, werkzeug, liste).map((eintrag) => eintrag.id) : undefined;
    return {
      terminal: ids(TERMINAL_SZENARIEN, "terminal"),
      topologie: ids(topologieSzenarien, "topologie"),
      flags: ids(FLAG_AUFGABEN, "flags"),
      sql: ids(SQL_ALLE_UEBUNGEN, "sql"),
    };
  }, [angebot]);

  if (activeWerkzeug === "netzplan") {
    return <Netzplan onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "finanzrechner") {
    return <Finanzrechner onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "unterweisungsplan") {
    return <Unterweisungsplaner onClose={() => setActiveWerkzeug(null)} praesentationMinuten={kurs?.presentationMinutes ?? 15} />;
  }
  if (activeWerkzeug === "wirtschaftlichkeit") {
    return <Wirtschaftlichkeit onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "algorithmen") {
    return <Algorithmen onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "schreibtischtest") {
    return <Schreibtischtest onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "prozesskennzahlen") {
    return <Prozesskennzahlen onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "statistik") {
    return <Statistiktrainer onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "verfuegbarkeit") {
    return <Verfuegbarkeitsrechner onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "energierechner") {
    return <Energierechner onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "skalierung") {
    return <Skalierungsrechner onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "mqttlabor") {
    return <Mqttlabor onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "testfaelle") {
    return <Testfalltrainer onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "ausbildungsplan") {
    return <Ausbildungsplaner onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "lernzielcheck") {
    return <Lernzielcheck onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "sparverfahren") {
    return <Sparverfahren onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "lagerkennzahlen") {
    return <Lagerkennzahlen onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "kalkulationstrainer") {
    return <Handelskalkulation onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "arbeitszeit") {
    return <Arbeitszeitpruefer onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "subnetting") {
    return <Subnetting onClose={() => setActiveWerkzeug(null)} />;
  }
  if (activeWerkzeug === "sqluebung") {
    return <SqlUebungsflaeche onClose={() => setActiveWerkzeug(null)} erlaubt={szenarien.sql} />;
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

  if (activeRunde) {
    return (
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>{activeRunde.label}: Fragen üben</h2>
          <button type="button" className="link-muted-btn" onClick={() => setActiveRunde(null)}>
            ← Zurück zum Werkzeugkasten
          </button>
        </div>
        <Quiz key={activeRunde.type} kursId={kursId} itemType={activeRunde.type} />
      </div>
    );
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
              <button
                type="button"
                className="btn btn-primary btn-sm"
                aria-label={`${"aktion" in instrument ? instrument.aktion : "Öffnen"}: ${instrument.label}`}
                onClick={() => setActiveWerkzeug(instrument.type)}
              >
                {"aktion" in instrument ? instrument.aktion : "Öffnen"}
              </button>
            )}
            {target && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                aria-label={`Fragen zu diesem Instrument üben: ${instrument.label}`}
                onClick={() => setActiveRunde({ type: instrument.type, label: instrument.label })}
              >
                Fragen zu diesem Instrument üben
              </button>
            )}
            {lernpfad &&
              (instrumentLernpfadeEnabled ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  aria-label={`Geführten Lernpfad starten: ${instrument.label}`}
                  onClick={() => setActiveLernpfad(instrument.type)}
                >
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
      const szenarioIds = instrument.type === "terminal" ? szenarien.terminal : instrument.type === "topologie" ? szenarien.topologie : instrument.type === "flags" ? szenarien.flags : instrument.type === "sqluebung" ? szenarien.sql : undefined;
      return szenarioIds && szenarioIds.length === 0 ? null : gruppe;
    }
    const gruppe = angebotInstrument(angebot, instrument.type);
    return gruppe && instruments.data?.[instrument.type] ? gruppe : null;
  }
  const eintraege = INSTRUMENT_CATALOG.map((instrument) => ({ instrument, gruppe: gruppeVon(instrument) })).filter((eintrag) => eintrag.gruppe !== null);
  const kern = eintraege.filter((eintrag) => eintrag.gruppe === "kern").map((eintrag) => eintrag.instrument);
  const grundlagen = eintraege.filter((eintrag) => eintrag.gruppe === "grundlagen").map((eintrag) => eintrag.instrument);
  const hatLernpfade = (lernpfade.data ?? []).some((eintrag) => angebotLernpfad(angebot, eintrag.instrumentType));

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Werkzeugkasten</h2>
      </div>
      {/* Review UXT-B-18/I-11: Die Einleitung erscheint nur, wenn es etwas zu zeigen gibt, und nennt Lernpfade nur in Kursen, die welche haben. */}
      {eintraege.length > 0 && (
        <p className="field-hint">
          Je Instrument eine Übungsrunde mit Fragen genau zu diesem Instrument und, wo vorhanden, die praktische Anwendung am
          Werkzeug selbst.
          {hatLernpfade &&
            " Für manche Instrumente gibt es zusätzlich einen geführten, mehrstufigen Lernpfad mit durchgehendem Fallbeispiel (Teil der Fortgeschritten-Funktionen)."}
        </p>
      )}
      {instruments.isLoading || courses.isLoading ? (
        <p>Lädt…</p>
      ) : instruments.isError || courses.isError ? (
        // Review WRK-24: Ein Ladefehler ist keine leere Antwort ("keine Instrumente").
        <div className="stack">
          <p className="error" role="alert">Die Instrumente konnten nicht geladen werden. Bitte prüfe deine Verbindung.</p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ alignSelf: "flex-start" }}
            onClick={() => {
              void instruments.refetch();
              void courses.refetch();
            }}
          >
            Erneut versuchen
          </button>
        </div>
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
