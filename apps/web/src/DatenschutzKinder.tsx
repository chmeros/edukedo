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
    <main>
      <h1>edukedo</h1>
      <p className="dev-hint">
        🔧 Entwurf, noch nicht von einer Anwältin/einem Anwalt geprüft. Ersetzt nicht die
        vollständige Datenschutzerklärung (die es aktuell noch nicht gibt).
      </p>
      <h2>Was passiert mit deinen Daten?</h2>
      <p>Hier erklären wir dir kurz und einfach, was mit deinen Daten bei edukedo passiert.</p>
      <p>
        <strong>Was wir von dir speichern:</strong> deine E-Mail-Adresse, dein Passwort (sicher
        verschlüsselt, niemand kann es lesen) und dein Geburtsdatum. Außerdem speichern wir, welche
        Karteikarten und Quiz-Fragen du schon geübt hast, damit wir dir zur richtigen Zeit die
        richtigen Fragen zeigen können.
      </p>
      <p>
        <strong>Wofür wir das brauchen:</strong> damit du dich einloggen kannst und damit edukedo sich
        merkt, was du schon gut kannst und was du noch üben solltest.
      </p>
      <p>
        <strong>Wenn du unter 16 Jahre alt bist:</strong> Ein Elternteil muss zuerst per E-Mail
        bestätigen, dass du edukedo nutzen darfst. Erst danach kannst du dich einloggen. Ein
        Elternteil kann diese Erlaubnis auch später jederzeit wieder zurücknehmen.
      </p>
      <p>
        <strong>Was wir NICHT machen:</strong> Wir zeigen dir keine Werbung und werten deine Daten
        nicht aus, um dir Werbung zu zeigen. Wir geben deine Daten nicht an fremde Firmen weiter.
      </p>
      <p>
        <strong>Dein Konto löschen:</strong> Du (oder ein Elternteil) kannst dein Konto jederzeit
        selbst löschen. Dann werden alle deine Daten entfernt.
      </p>
      <p>
        <strong>Fragen?</strong> Ein Elternteil kann sich jederzeit an uns wenden, wenn etwas unklar
        ist.
      </p>
    </main>
  );
}
