import { BrandLink } from "./BrandLink";
import { InfoIcon } from "./Icons";

/**
 * F-53: Kind-/elterngerecht formulierte Kurzfassung, ergänzend zur vollständigen
 * juristischen Datenschutzerklärung (F-51). F-51 selbst existiert im Projekt noch nicht
 * (kein Impressum/keine vollständige Datenschutzerklärung) — diese Kurzfassung ist daher
 * bewusst als ungeprüfter Entwurf gekennzeichnet, siehe Architekturplanung Abschnitt 13.
 * Statische Seite ohne tRPC-Zugriff, öffentlich unter /datenschutz-kinder erreichbar
 * (kein eigener Router im Projekt, siehe main.tsx).
 */
export function DatenschutzKinder() {
  return (
    <div className="shell shell--narrow">
      <div className="card">
        <BrandLink />
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Entwurf, noch nicht von einer Anwältin/einem Anwalt geprüft. Ersetzt nicht die vollständige
            Datenschutzerklärung (die es aktuell noch nicht gibt).
          </div>
        </div>
        <h2>Was passiert mit deinen Daten?</h2>
        <p>Hier erklären wir dir kurz und einfach, was mit deinen Daten bei edukedo passiert.</p>
        <p>
          <b>Was wir von dir speichern:</b> deine E-Mail-Adresse, dein Passwort (sicher verschlüsselt, niemand
          kann es lesen) und dein Geburtsdatum. Außerdem speichern wir, welche Karteikarten und Quiz-Fragen du
          schon geübt hast, damit wir dir zur richtigen Zeit die richtigen Fragen zeigen können.
        </p>
        <p>
          <b>Wofür wir das brauchen:</b> damit du dich einloggen kannst und damit edukedo sich merkt, was du
          schon gut kannst und was du noch üben solltest.
        </p>
        <p>
          <b>Wenn du unter 16 Jahre alt bist:</b> Ein Elternteil muss zuerst per E-Mail bestätigen, dass du
          edukedo nutzen darfst. Erst danach kannst du dich einloggen. Ein Elternteil kann diese Erlaubnis auch
          später jederzeit wieder zurücknehmen.
        </p>
        <p>
          <b>Was wir NICHT machen:</b> Wir zeigen dir keine Werbung und werten deine Daten nicht aus, um sie zu
          verkaufen. Wir geben deine Daten nicht an Dritte weiter, außer wenn es gesetzlich nötig ist.
        </p>
        <p>
          <b>Deine Rechte:</b> Du (bzw. ein Elternteil für dich) kannst jederzeit einsehen, was gespeichert ist,
          Fehler korrigieren lassen oder dein Konto vollständig löschen — dann werden alle deine Daten entfernt.
        </p>
        <p>
          <b>Fragen?</b> Ein Elternteil kann sich jederzeit an uns wenden, wenn etwas unklar ist. Konkrete
          Kontaktmöglichkeit folgt noch — die geschäftliche E-Mail-Adresse ist laut Entwicklungsplan (Iteration
          0, Organisatorisches) noch nicht eingerichtet.
        </p>
        <a className="link-muted" href="/">
          ← Zurück zur Registrierung
        </a>
      </div>
    </div>
  );
}
