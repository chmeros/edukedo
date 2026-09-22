import { useState } from "react";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-33 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Erinnerungen an regelmäßiges
 * Lernen (optional, dezent)", siehe Architekturplanung Abschnitt 13): mangels jeder Push-/
 * E-Mail-Infrastruktur im Projekt (siehe apps/api/src/email/sender.ts, aktuell nur eine
 * Konsolen-Ausgabe statt eines echten Versands) bewusst rein IN-APP statt eines echten
 * Erinnerungs-Kanals — erscheint nur, wenn seit mind. REMINDER_THRESHOLD_DAYS Tagen nicht mehr
 * gelernt wurde UND überhaupt schon einmal gelernt wurde (kein Nerven brandneuer Konten). Bewusst
 * PRO SITZUNG statt dauerhaft ausblendbar (`dismissed`, reiner Client-State, kein Server-Feld) —
 * "dezent" heißt hier: nicht aufdringlich WÄHREND des Lernens, aber beim nächsten Öffnen der App
 * (wenn die Erinnerung tatsächlich noch zutrifft) wieder sichtbar, sonst würde ein einmaliges
 * Wegklicken die Funktion dauerhaft wirkungslos machen.
 */
const REMINDER_THRESHOLD_DAYS = 2;

export function StreakReminderBanner() {
  const [dismissed, setDismissed] = useState(false);
  const streak = trpc.gamification.streakStatus.useQuery();

  if (dismissed || !streak.data || streak.data.daysSinceLastActive === null) {
    return null;
  }
  if (streak.data.daysSinceLastActive < REMINDER_THRESHOLD_DAYS) {
    return null;
  }

  return (
    <div className="alert alert-info">
      <InfoIcon />
      <div>
        Du hast seit {streak.data.daysSinceLastActive} Tagen nicht gelernt — schon eine kurze Lerneinheit hilft, dranzubleiben.{" "}
        <button type="button" className="link-muted-btn" onClick={() => setDismissed(true)}>
          Ausblenden
        </button>
      </div>
    </div>
  );
}
