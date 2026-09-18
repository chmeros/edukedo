import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { InfoIcon } from "./Icons";

function goHome() {
  window.location.href = "/";
}

/**
 * F-51 (AGB, Teil 3 von 3): Regelt die Nutzung des aktuell vollständig kostenfreien Angebots
 * (Anforderungskatalog Abschnitt 5.10 — Premium/F-81 ist noch nicht aktiviert, siehe
 * Entwicklungsplan Iteration 6). Bewusst schlank gehalten, statt bereits jetzt Klauseln für ein
 * noch nicht existierendes Zahlungsmodell vorzuschreiben — wird erweitert, sobald F-81 aktiv
 * wird (inkl. der dafür laut Entwicklungsplan ohnehin vorgesehenen rechtlichen Prüfung).
 * **Entwurf, noch nicht anwaltlich geprüft**, Kontaktdaten als Platzhalter wie im Impressum.
 */
export function AGB() {
  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card stack">
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              Entwurf, noch nicht anwaltlich geprüft. Deckt den aktuellen, vollständig kostenfreien Stand ab —
              wird ergänzt, sobald optionale kostenpflichtige Funktionen (F-81) aktiviert werden.
            </div>
          </div>

          <h2>Allgemeine Geschäftsbedingungen (AGB)</h2>

          <p>
            <b>1. Geltungsbereich</b>
            <br />
            Diese Bedingungen gelten für die Nutzung der Lernplattform edukedo, betrieben von der im{" "}
            <a className="link" href="/impressum">
              Impressum
            </a>{" "}
            genannten Person ("wir"). Sie richten sich an Einzelpersonen ("Nutzer:innen"); für
            Unternehmenskonten (Business-Lizenzen) gelten ergänzend gesonderte Vereinbarungen.
          </p>

          <p>
            <b>2. Leistungsbeschreibung</b>
            <br />
            edukedo bietet digitale Lerninhalte (u. a. Karteikarten, Quiz, Prüfungssimulationen,
            Präsentations-/Fachgesprächstrainer) für ausgewählte Kurse an. Der Kernumfang ist kostenfrei
            nutzbar — kostenfreier Wissenszugang ist der eigentliche Zweck von edukedo, nicht nur ein Mittel
            zur Nutzergewinnung. Optionale, künftig kostenpflichtige Zusatzfunktionen (z. B. KI-gestützte
            Bewertung) sind derzeit noch nicht aktiv; sobald sie es sind, gelten hierfür ergänzende Regelungen.
          </p>

          <p>
            <b>3. Registrierung und Nutzerkonto</b>
            <br />
            Für die Nutzung ist ein Nutzerkonto mit wahrheitsgemäßer Altersangabe erforderlich. Nutzer:innen
            unter 16 Jahren benötigen zusätzlich die Einwilligung eines Elternteils (siehe
            Datenschutzerklärung). Zugangsdaten sind vertraulich zu behandeln; Missbrauchsverdacht ist uns
            unverzüglich mitzuteilen.
          </p>

          <p>
            <b>4. Nutzungsrechte</b>
            <br />
            Wir räumen dir ein einfaches, nicht übertragbares Recht ein, die Lerninhalte für den eigenen,
            privaten Lernzweck zu nutzen. Eine Weiterveröffentlichung, ein Weiterverkauf oder eine sonstige
            kommerzielle Weiterverbreitung der Inhalte ist ohne unsere Zustimmung nicht gestattet.
          </p>

          <p>
            <b>5. Geistiges Eigentum und Hinweis zu Prüfungsinstitutionen</b>
            <br />
            Die Lerninhalte sind urheberrechtlich geschützt. edukedo ist ein privates Lernhilfsmittel ohne
            Verbindung zu IHKs, Schulen oder anderen Prüfungsinstitutionen; es besteht kein Anspruch auf
            inhaltliche Übereinstimmung mit aktuellen offiziellen Prüfungs- oder Lehrplananforderungen.
          </p>

          <p>
            <b>6. Verfügbarkeit</b>
            <br />
            Wir sind um einen zuverlässigen Betrieb bemüht, garantieren aber keine ununterbrochene
            Verfügbarkeit. Wartungsarbeiten oder technische Störungen können den Zugang zeitweise
            einschränken.
          </p>

          <p>
            <b>7. Haftung</b>
            <br />
            Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den Vorschriften des
            Produkthaftungsgesetzes. Im Übrigen haften wir nur bei der Verletzung wesentlicher
            Vertragspflichten und begrenzt auf den vorhersehbaren, vertragstypischen Schaden. Für die
            inhaltliche Richtigkeit, Vollständigkeit oder Aktualität der Lerninhalte sowie für den Erfolg in
            einer tatsächlichen Prüfung übernehmen wir keine Garantie.
          </p>

          <p>
            <b>8. Kündigung</b>
            <br />
            Du kannst dein Konto jederzeit selbst und ohne Angabe von Gründen löschen (in den
            Kontoeinstellungen im Header-Menü). Wir können Konten bei erheblichem Verstoß gegen diese
            Bedingungen sperren oder löschen.
          </p>

          <p>
            <b>9. Änderungen dieser AGB</b>
            <br />
            Wir können diese Bedingungen anpassen, insbesondere wenn neue Funktionen (z. B. kostenpflichtige
            Zusatzfunktionen) hinzukommen. Über wesentliche Änderungen informieren wir angemeldete
            Nutzer:innen in geeigneter Form.
          </p>

          <p>
            <b>10. Anwendbares Recht</b>
            <br />
            Es gilt deutsches Recht.
          </p>

          <a className="link-muted" href="/">
            ← Zurück zur Startseite
          </a>
        </div>
      </main>
    </>
  );
}
