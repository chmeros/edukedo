import { AnzeigenameHinweis } from "./AnzeigenameHinweis";
import { InfoIcon } from "./Icons";
import { Kohorte } from "./Kohorte";

/**
 * Review UXL-07 (Entscheidung 10.10.2026): Eigener Einstieg „Gruppe leiten“ im Nutzermenü, außerhalb des Tabs „Gaming“. Wer eine
 * Lerngruppe führt (Lehrkraft, Ausbildende, Kursleitung), findet hier ohne Umweg über Freundeskreis und Spiele die Verwaltung seiner
 * Kohorten und erfährt in vier Schritten, wie die Gruppe beitritt. Die Funktion selbst ist `Kohorte.tsx` (nur der Leitungsteil).
 */
export function GruppeLeiten({ kursId, onBack }: { kursId: string; onBack: () => void }) {
  return (
    <div className="stack">
      <div className="panel-section-head">
        <h2>Gruppe leiten</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Zurück zur Lern-App
        </button>
      </div>
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          <b>Wie lade ich meine Gruppe ein?</b>
          <ol>
            <li>Lege unten eine Kohorte an, zum Beispiel „Fachwirt Herbst 2026“. Sie gehört zum aktuell gewählten Kurs.</li>
            <li>Gib den Beitritts-Code der Kohorte an deine Gruppe weiter (Kopieren-Knopf neben dem Code).</li>
            <li>
              Die Teilnehmenden belegen denselben Kurs und geben den Code unter „Gaming“ → „Lehrgangsgruppen“ → „Kohorte beitreten“ ein. Vorher
              erfahren sie, was die Leitung sieht: Anzeigename, Beitrittsdatum und Kennzahlen der ganzen Gruppe, nie einzelne Antworten. Die E-Mail-Adresse zeigt die App der Leitung nur auf ausdrücklichen Klick.
            </li>
            <li>
              Kennzahlen erscheinen ab fünf Teilnehmenden, die gelernt haben, in gerundeter Form. Die Mitgliederliste sieht nur die Leitung.
            </li>
          </ol>
        </div>
      </div>
      <AnzeigenameHinweis />
      <Kohorte key={kursId} kursId={kursId} nurLeiten />
    </div>
  );
}
