import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-134 (26.09.2026, Befund aus einer kritischen Neu-Nutzer-Simulation, siehe Architekturplanung
 * Abschnitt 13): Vorher gab es für ein brandneues Konto keinerlei Erklärung der fünf Haupt-Tabs
 * oder der Kopfzeilen-Symbole (Punktehamster-Fortschritt/Lernserie/Credits) — die Person landete
 * ohne jede Einführung direkt in der ersten Quiz-Frage. Bewusst ein dezentes, nicht-blockierendes
 * `alert-info`-Banner statt eines weiteren `Modal` (analog zu `StreakReminderBanner.tsx`), da für
 * ein Erstkonto ohnehin bereits `LearningModePrompt` (F-104) als blockierender Dialog erscheint,
 * sobald der Tab "Lernen" aktiv wird — zwei gleichzeitige Modals wären eine schlechtere Erfahrung
 * als ein zusätzliches, ignorierbares Banner. Dauerhaft je Person ausblendbar (server-seitiges
 * `onboardingHintsSeen`, nicht nur Session-State wie bei `StreakReminderBanner`), da es sich um
 * eine reine Einmal-Einführung handelt, die nach dem ersten Verstehen dauerhaft irrelevant wird.
 */
export function OnboardingHints() {
  const utils = trpc.useUtils();
  const dismiss = trpc.auth.dismissOnboardingHints.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });

  return (
    <div className="alert alert-info">
      <InfoIcon />
      <div>
        <b>Kurz erklärt:</b> „Lernen" übt Karteikarten/Quiz zu deinem aktuellen Kurs, „Prüfung" simuliert die
        echte Prüfungssituation, „Instrumente" ist ein Werkzeugkasten fachlicher Modelle, „Sozial" bündelt
        Freundeskreis/Kohorten/Duelle, „Fortschritt" zeigt Statistik und Erfolge. Oben siehst du außerdem deinen
        Punktehamster-Fortschritt, deine Lernserie und deinen Creditstand.{" "}
        <button
          type="button"
          className="link-muted-btn"
          disabled={dismiss.isPending}
          onClick={() => dismiss.mutate()}
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
