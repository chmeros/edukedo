import { PROJEKT_FELD_KEYS, PROJEKT_FELD_MAX_LENGTH, type ProjektFeldKey } from "@edukedo/shared";
import { useEffect, useState } from "react";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-161 (Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13): Hilfen rund um das
 * betriebliche Projekt der Fachinformatiker-Kurse — Check zum Projektantrag, Check zur
 * Projektdokumentation und "Mein Projekt" in neun Stichpunkten, je mit den Nachfragen, die der
 * Prüfungsausschuss dazu typischerweise stellt (sie stammen aus dem Fragen-Pool des
 * Fachgesprächs-Trainers, F-25). Die Punkte sind bewusst im Frontend definiert (wie beim
 * Präsentationsentwurf, F-24); nur der Stand der Person wird gespeichert (`projekt.get/save`).
 *
 * Fachliche Grundlage der Antrags- und Dokumentations-Punkte: Content-Themen 12.1/12.2 der
 * Fachinformatiker-Kurse (FIAusbV: Projektbeschreibung mit Ausgangssituation, Projektziel und
 * Zeitplanung zur Genehmigung durch den Prüfungsausschuss; Umfang und Form legt die zuständige IHK fest).
 */
type Frage = { key: ProjektFeldKey; label: string; hint: string; nachfragen: string[] };

const FELDER: Frage[] = [
  {
    key: "titel",
    label: "Projekttitel",
    hint: "Ein Satz, der Thema und Nutzen nennt.",
    nachfragen: ["Warum haben Sie genau dieses Projekt gewählt, und wie haben Sie geprüft, dass es in der verfügbaren Zeit machbar ist?"],
  },
  {
    key: "umfeld",
    label: "Auftraggeber und Umfeld",
    hint: "Für wen entsteht das Projekt (Abteilung, Kunde) und welche Systeme gibt es schon?",
    nachfragen: ["Wie fügt sich Ihre Lösung in die vorhandene Systemlandschaft des Kunden ein?"],
  },
  {
    key: "ausgangssituation",
    label: "Ausgangssituation (Ist-Zustand und Problem)",
    hint: "Wie läuft es heute ab, wo liegt das konkrete Problem, warum soll es gelöst werden?",
    nachfragen: ["Wie haben Sie die Anforderungen des Kunden ermittelt, und welche haben Sie bewusst nicht umgesetzt (Abgrenzung)?"],
  },
  {
    key: "ziel",
    label: "Projektziel (messbar)",
    hint: "So formuliert, dass man am Ende prüfen kann, ob es erreicht wurde.",
    nachfragen: ["Wie ist Ihr Projektziel formuliert, und woran haben Sie am Projektende gemessen, ob es erreicht wurde?"],
  },
  {
    key: "umsetzung",
    label: "Vorgehen und Umsetzung",
    hint: "Vorgehensmodell, wichtigste Arbeitspakete, wie du getestet hast.",
    nachfragen: [
      "Welches Vorgehensmodell haben Sie gewählt, und warum passt es besser als die Alternativen?",
      "Welche Tests haben Sie durchgeführt, wie haben Sie die Testfälle abgeleitet, und was haben Sie bewusst nicht getestet?",
    ],
  },
  {
    key: "entscheidung",
    label: "Wichtigste Entscheidung und verworfene Alternativen",
    hint: "Was hast du entschieden, welche Alternativen gab es, nach welchen Kriterien hast du gewählt?",
    nachfragen: ["Warum haben Sie sich für diese Lösung entschieden, und welche Alternativen haben Sie verworfen?"],
  },
  {
    key: "schwierigkeit",
    label: "Größte Schwierigkeit",
    hint: "Was hat am meisten Zeit gekostet und wie hast du es gelöst?",
    nachfragen: ["Welches Problem hat Sie im Projekt am meisten Zeit gekostet, und wie haben Sie es gelöst?"],
  },
  {
    key: "ergebnis",
    label: "Ergebnis und Soll-Ist-Vergleich",
    hint: "Zeit, Kosten, Umfang und Qualität: geplant gegen tatsächlich, Abweichungen offen benennen.",
    nachfragen: [
      "Wo weicht das Ergebnis von Ihrer Planung ab (Zeit, Kosten, Umfang), und wie erklären Sie diese Abweichungen?",
      "Wie haben Sie die Wirtschaftlichkeit berechnet, welche Annahmen stecken in Ihrer Rechnung, und wie belastbar sind sie?",
    ],
  },
  {
    key: "fazit",
    label: "Fazit: Was würdest du anders machen?",
    hint: "Zielerreichung, was gut und was weniger gut lief, Ausblick.",
    nachfragen: ["Was würden Sie heute anders machen, wenn Sie das Projekt noch einmal beginnen könnten?"],
  },
];

function antragPunkte(stunden: number): { key: string; label: string }[] {
  return [
    { key: "antrag_ausgangssituation", label: "Ausgangssituation beschrieben: Auftraggeber, Ist-Zustand, konkretes Problem (Pflichtbestandteil)" },
    { key: "antrag_ziel", label: "Projektziel so formuliert, dass man am Ende prüfen kann, ob es erreicht wurde (Pflichtbestandteil)" },
    {
      key: "antrag_zeitplan",
      label: `Zeitplanung mit Arbeitspaketen und Puffer; Projektarbeit und Dokumentation zusammen höchstens ${stunden} Stunden (Pflichtbestandteil)`,
    },
    { key: "antrag_machbar", label: "Umfang realistisch: weder zu groß für die Zeit noch zu klein für Alternativen, Tests und Dokumentation" },
    { key: "antrag_ihk", label: "Zusätzliche Angaben und Form deiner IHK geprüft (Formular, Titel, Seitenvorgaben — das legt die IHK fest)" },
    { key: "antrag_genehmigt", label: "Genehmigung des Prüfungsausschusses liegt vor, bevor ich mit der Projektarbeit beginne" },
  ];
}

const DOKU_PUNKTE: { key: string; label: string }[] = [
  { key: "doku_gliederung", label: "Gliederung: Einleitung, Planung, Analyse, Entwurf und Umsetzung, Test, Einführung, Soll-Ist-Vergleich, Fazit" },
  { key: "doku_rotfaden", label: "Roter Faden: Jede Anforderung taucht in Entwurf, Test und Fazit wieder auf" },
  { key: "doku_projektbezug", label: "Projektbezug statt Lehrbuchwissen: Entscheidungen meines Projekts sind begründet" },
  { key: "doku_ausschnitte", label: "Nur ausgewählte, erläuterte Ausschnitte (Code, Konfiguration, Diagramme) statt vollständiger Dumps" },
  { key: "doku_sollist", label: "Soll-Ist-Vergleich (Zeit, Kosten, Umfang, Qualität) mit offen benannten Abweichungen" },
  { key: "doku_anhang", label: "Praxisbezogene Unterlagen im Anhang (z. B. Test- und Abnahmeprotokoll)" },
  { key: "doku_daten", label: "Kundendaten und Betriebsgeheimnisse nur mit Freigabe oder anonymisiert verwendet" },
  { key: "doku_form", label: "Seitenlimit, Gliederungs- und Abgabevorgaben der IHK eingehalten" },
];

function Checkliste({
  titel,
  punkte,
  checklist,
  onToggle,
}: {
  titel: string;
  punkte: { key: string; label: string }[];
  checklist: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const erledigt = punkte.filter((punkt) => checklist[punkt.key]).length;
  return (
    <div className="stack">
      <span className="stat-subheading">
        {titel} ({erledigt}/{punkte.length})
      </span>
      {punkte.map((punkt) => (
        <label key={punkt.key} className="checklist-item">
          <input type="checkbox" checked={!!checklist[punkt.key]} onChange={() => onToggle(punkt.key)} />
          {punkt.label}
        </label>
      ))}
    </div>
  );
}

export function Projekthilfe({
  kursId,
  stunden,
  onOpenFachgespraech,
}: {
  kursId: string;
  stunden: number;
  onOpenFachgespraech: () => void;
}) {
  const utils = trpc.useUtils();
  const profil = trpc.projekt.get.useQuery({ kursId });
  const save = trpc.projekt.save.useMutation({
    onSuccess: () => utils.projekt.get.invalidate(),
  });

  const [hydrated, setHydrated] = useState(false);
  const [felder, setFelder] = useState<Partial<Record<ProjektFeldKey, string>>>({});
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState(false);

  // Serverstand nur einmal beim ersten Laden übernehmen (siehe Praesentationstrainer.tsx), damit ein
  // Refetch nach dem Speichern spätere lokale Eingaben nicht überschreibt.
  useEffect(() => {
    if (profil.data && !hydrated) {
      setFelder(profil.data.felder);
      setChecklist(profil.data.checklist);
      setHydrated(true);
    }
  }, [profil.data, hydrated]);

  if (profil.isLoading) {
    return <p>Lädt…</p>;
  }

  const ausgefuellt = PROJEKT_FELD_KEYS.filter((key) => (felder[key] ?? "").trim() !== "").length;

  function toggle(key: string) {
    setChecklist((current) => ({ ...current, [key]: !current[key] }));
    setDirty(true);
  }

  function handleSave() {
    save.mutate({ kursId, felder, checklist }, { onSuccess: () => setDirty(false) });
  }

  return (
    <div className="stack">
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          Hier bereitest du dein betriebliches Projekt (Projektarbeit und Dokumentation zusammen höchstens {stunden} Stunden) auf
          Projektantrag, Dokumentation und Fachgespräch vor. Dein Stand wird gespeichert. Umfang, Form und Seitenvorgaben legt deine
          IHK fest — im Zweifel gilt ihre Handreichung.
        </div>
      </div>

      <Checkliste titel="Projektantrag" punkte={antragPunkte(stunden)} checklist={checklist} onToggle={toggle} />
      <Checkliste titel="Projektdokumentation" punkte={DOKU_PUNKTE} checklist={checklist} onToggle={toggle} />

      <div className="stack">
        <span className="stat-subheading">
          Mein Projekt in neun Stichpunkten ({ausgefuellt}/{PROJEKT_FELD_KEYS.length} ausgefüllt)
        </span>
        <p className="field-hint">
          Wer sein Projekt in diesen Punkten knapp erzählen kann, ist auf das Fachgespräch gut vorbereitet. Unter jedem Feld stehen die
          Nachfragen, die der Prüfungsausschuss dazu typischerweise stellt.
        </p>
        {FELDER.map((feld) => {
          const wert = felder[feld.key] ?? "";
          return (
            <div key={feld.key} className="field">
              <label htmlFor={`projekt-${feld.key}`}>{feld.label}</label>
              <span className="field-hint">{feld.hint}</span>
              <textarea
                id={`projekt-${feld.key}`}
                className="input"
                rows={3}
                maxLength={PROJEKT_FELD_MAX_LENGTH}
                value={wert}
                onChange={(event) => {
                  setFelder((current) => ({ ...current, [feld.key]: event.target.value }));
                  setDirty(true);
                }}
              />
              <span className="field-hint">
                {wert.trim() === "" ? "Noch leer — hier wirst du vermutlich gefragt: " : "Dazu wird oft gefragt: "}
                {feld.nachfragen.join(" · ")}
              </span>
            </div>
          );
        })}
      </div>

      <div className="rate-row">
        <button type="button" className="btn btn-primary" disabled={save.isPending} onClick={handleSave}>
          Speichern
        </button>
        <button type="button" className="btn btn-ghost" onClick={onOpenFachgespraech}>
          Zum Fachgespräch-Training
        </button>
        {save.isSuccess && !dirty && <span className="field-hint">Gespeichert ✓</span>}
        {save.isError && <span className="field-hint">Speichern fehlgeschlagen: {save.error.message}</span>}
      </div>
    </div>
  );
}
