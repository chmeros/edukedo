import { useState } from "react";
import { InstrumentLernpfad } from "./InstrumentLernpfad";
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
 */
const INSTRUMENT_CATALOG = [
  {
    type: "swot",
    label: "SWOT-Matrix",
    description: "Stärken, Schwächen, Chancen und Risiken strukturiert gegenüberstellen.",
  },
  {
    type: "bsc",
    label: "Balanced Scorecard",
    description: "Unternehmenserfolg aus vier Perspektiven gleichzeitig betrachten.",
  },
  {
    type: "ansoff",
    label: "Ansoff-Matrix",
    description: "Wachstumsstrategien anhand von Markt und Produkt einordnen.",
  },
  {
    type: "gantt",
    label: "Gantt-Diagramm",
    description: "Arbeitspakete den passenden Zeitabschnitten eines Projekts zuordnen.",
  },
  {
    type: "eisenhower",
    label: "Eisenhower-Matrix",
    description: "Aufgaben nach Dringlichkeit und Wichtigkeit priorisieren.",
  },
  {
    type: "pdca",
    label: "PDCA-Zyklus",
    description: "Verbesserungsmaßnahmen den vier Phasen Plan, Do, Check und Act zuordnen.",
  },
  {
    type: "risiko",
    label: "Risikomatrix",
    description: "Risiken nach Eintrittswahrscheinlichkeit und Auswirkung einschätzen.",
  },
  {
    type: "hierarchie",
    label: "Projektstrukturplan / Organigramm",
    description: "Aufgaben oder Positionen als echten Baum in die richtige Hierarchie-Ebene einordnen.",
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

  if (activeLernpfad) {
    return (
      <InstrumentLernpfad
        kursId={kursId}
        instrumentType={activeLernpfad}
        onClose={() => setActiveLernpfad(null)}
      />
    );
  }

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
      <div className="list" style={{ marginTop: 10 }}>
        {INSTRUMENT_CATALOG.map((instrument) => {
          const target = instruments.data?.[instrument.type];
          const lernpfad = lernpfade.data?.find((entry) => entry.instrumentType === instrument.type);
          return (
            <div key={instrument.type} className="list-row">
              <div className="meta">
                {instrument.label}
                <span>{instrument.description}</span>
              </div>
              <div className="list-row-actions">
                {target ? (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onGoToThema(target.themaId, target.themaTitle)}
                  >
                    Zu diesem Instrument lernen
                  </button>
                ) : (
                  <span className="field-hint">In diesem Kurs noch nicht verfügbar</span>
                )}
                {lernpfad &&
                  (instrumentLernpfadeEnabled ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => setActiveLernpfad(instrument.type)}>
                      Geführten Lernpfad starten
                    </button>
                  ) : (
                    <span className="field-hint">Geführter Lernpfad: Fortgeschritten-Funktion, noch nicht freigeschaltet</span>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
