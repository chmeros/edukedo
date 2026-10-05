import { useState } from "react";
import {
  AblaufIllustration,
  AnsoffIllustration,
  BscIllustration,
  EisenhowerIllustration,
  ErModellIllustration,
  GanttIllustration,
  HierarchieIllustration,
  NetzplanIllustration,
  NormalisierungIllustration,
  OsiIllustration,
  PdcaIllustration,
  RisikoIllustration,
  SchutzzieleIllustration,
  ScrumIllustration,
  SqlIllustration,
  SwotIllustration,
  TeststufenIllustration,
  UmlIllustration,
} from "./InstrumentIllustrations";
import { InstrumentLernpfad } from "./InstrumentLernpfad";
import { Netzplan } from "./Netzplan";
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
    label: "Struktogramm und Programmablauf",
    description: "Abläufe als Sequenz, Verzweigung oder Schleife erkennen.",
    Illustration: AblaufIllustration,
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
  const kursWerkzeuge = courses.data?.find((course) => course.id === kursId)?.werkzeuge ?? [];
  const [activeWerkzeug, setActiveWerkzeug] = useState<string | null>(null);

  if (activeWerkzeug === "netzplan") {
    return <Netzplan onClose={() => setActiveWerkzeug(null)} />;
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
    const werkzeugVerfuegbar = istWerkzeug && kursWerkzeuge.includes(instrument.type);
    const lernpfad = lernpfade.data?.find((entry) => entry.instrumentType === instrument.type);
    return (
      <Tile
        key={instrument.type}
        title={instrument.label}
        description={instrument.description}
        image={<instrument.Illustration />}
        note={!target && !werkzeugVerfuegbar ? "In diesem Kurs noch nicht verfügbar" : undefined}
        actions={
          <>
            {werkzeugVerfuegbar && (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveWerkzeug(instrument.type)}>
                Netzplan üben
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

  const istVerfuegbar = (instrument: (typeof INSTRUMENT_CATALOG)[number]) =>
    "werkzeug" in instrument ? kursWerkzeuge.includes(instrument.type) : Boolean(instruments.data?.[instrument.type]);
  const available = INSTRUMENT_CATALOG.filter(istVerfuegbar);
  const unavailable = INSTRUMENT_CATALOG.filter((instrument) => !istVerfuegbar(instrument));

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
          <div className="tile-grid">{available.map(renderTile)}</div>
          {unavailable.length > 0 && (
            // F-156: mit den IT-Instrumenten hat jeder Kurs mehrere Instrumente ohne Content — sie stehen
            // eingeklappt darunter statt als Reihe leerer Kacheln (Fachwirt: keine IT, Fachinformatiker: kein
            // BSC/Ansoff).
            <details className="instrument-more">
              <summary>Weitere Instrumente ({unavailable.length}) — in diesem Kurs noch nicht verfügbar</summary>
              <div className="tile-grid">{unavailable.map(renderTile)}</div>
            </details>
          )}
        </>
      )}
    </div>
  );
}
