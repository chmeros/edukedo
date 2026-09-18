import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { InfoIcon } from "./Icons";

function goHome() {
  window.location.href = "/";
}

/**
 * F-51 (Datenschutzerklärung, Teil 2 von 3): Vollständige juristische Fassung — ergänzt die
 * bereits bestehende kindgerechte Kurzfassung (F-53, DatenschutzKinder.tsx), auf die F-53
 * explizit als "ergänzend zur vollständigen Fassung" verweist. Beschreibt die tatsächliche
 * Datenverarbeitung anhand des echten Datenmodells (Architekturplanung Abschnitt 4.3) statt
 * generischer Textbausteine. **Entwurf, noch nicht anwaltlich geprüft** — die für den
 * Mathematik-Kurs ohnehin schon beauftragte externe Jugendschutz-/Kinderdatenschutzprüfung
 * (Anforderungskatalog Abschnitt 7) deckt diesen Text mit ab, sobald sie stattfindet; bis dahin
 * ersetzt dieser Entwurf keine rechtliche Prüfung. Kontaktdaten als Platzhalter wie im
 * Impressum (Nutzer-Entscheidung 18.09.2026, siehe Architekturplanung Abschnitt 13).
 */
export function Datenschutzerklaerung() {
  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card stack">
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              Entwurf, noch nicht anwaltlich geprüft. Kontaktdaten sind Platzhalter (siehe Impressum). Für
              Kinder und Jugendliche gibt es zusätzlich eine{" "}
              <a className="link" href="/datenschutz-kinder">
                kindgerechte Kurzfassung
              </a>
              .
            </div>
          </div>

          <h2>Datenschutzerklärung</h2>

          <p>
            <b>1. Verantwortlicher</b>
            <br />
            Verantwortlich für die Datenverarbeitung auf edukedo ist die im{" "}
            <a className="link" href="/impressum">
              Impressum
            </a>{" "}
            genannte Person.
          </p>

          <p>
            <b>2. Welche Daten wir verarbeiten</b>
          </p>
          <p>
            <b>Kontodaten:</b> E-Mail-Adresse, Passwort (als Argon2id-Hash gespeichert — das Passwort selbst
            liegt zu keinem Zeitpunkt lesbar vor), Geburtsdatum (zur Altersprüfung, siehe Punkt 4), Rolle
            (Lernende:r, Redaktion, Admin).
          </p>
          <p>
            <b>Lerndaten:</b> belegte Kurse, Lernfortschritt je Karteikarte/Quiz-Frage (u. a.
            Spaced-Repetition-Zustand), Verlauf beantworteter Fragen und Lernsitzungen (Dauer, Zeitpunkt),
            Ergebnisse von Prüfungssimulationen, eigene Zielplanung (z. B. Prüfungstermin).
          </p>
          <p>
            <b>Optionale soziale Daten (nur bei aktiver Nutzung):</b> Freundeskreis-Verknüpfungen (deine
            E-Mail-Adresse wird dabei für die von dir bestätigten Freunde sichtbar), Highscore-Teilnahme,
            Lernpartner-Präferenzen, Meldungen/Blockierungen anderer Nutzer:innen.
          </p>
          <p>
            <b>Technische Daten:</b> ein signiertes, ausschließlich technisch notwendiges Session-Cookie (siehe
            Punkt 7), sowie serverseitige Zugriffsprotokolle (u. a. IP-Adresse, Zeitpunkt) zur Absicherung des
            Betriebs.
          </p>
          <p>
            <b>Bei minderjährigen Nutzer:innen zusätzlich:</b> die E-Mail-Adresse eines Elternteils sowie der
            Status der Einwilligung (erteilt/widerrufen), siehe Punkt 4.
          </p>
          <p>
            <b>Bei Mitgliedschaft in einem Unternehmenskonto:</b> die Zuordnung zu diesem Unternehmen. Der
            Arbeitgeber erhält dabei ausdrücklich <b>keine</b> Einsicht in individuelle Lerninhalte oder
            Einzelantworten, sondern höchstens aggregierte Kennzahlen ab einer Mindestgruppengröße (siehe
            Anforderungskatalog Abschnitt 7, Beschäftigtendatenschutz).
          </p>

          <p>
            <b>3. Zwecke und Rechtsgrundlagen</b>
          </p>
          <p>
            Wir verarbeiten diese Daten, um dir dein Nutzerkonto und die Lernfunktionen bereitzustellen (Art. 6
            Abs. 1 lit. b DSGVO, Vertragserfüllung), um den Betrieb sicher und funktionsfähig zu halten (Art. 6
            Abs. 1 lit. f DSGVO, berechtigtes Interesse) und — bei unter 16-Jährigen — auf Grundlage der
            Einwilligung des Elternteils (Art. 8 DSGVO, siehe Punkt 4).
          </p>

          <p>
            <b>4. Minderjährige Nutzer:innen und Einwilligung der Erziehungsberechtigten</b>
          </p>
          <p>
            Nutzer:innen unter 16 Jahren benötigen vor der Kontoaktivierung die Einwilligung eines Elternteils
            (Art. 8 DSGVO). Beim Registrieren wird die E-Mail-Adresse eines Elternteils abgefragt; das Konto
            bleibt gesperrt, bis der Elternteil einen Bestätigungslink per E-Mail anklickt. Bis zur Bestätigung
            kann ein eingeschränkter, kontoloser Vorschau-Modus ohne Speicherung personenbezogener Daten
            genutzt werden. Der Elternteil erhält danach ein eigenes Eltern-Dashboard, über das die Einwilligung
            jederzeit wieder widerrufen werden kann — ein Widerruf sperrt das Kind-Konto.
          </p>

          <p>
            <b>5. Empfänger und Auftragsverarbeitung</b>
          </p>
          <p>
            Ein Hosting-Anbieter für die Server-Infrastruktur ist noch nicht final ausgewählt (siehe
            Entwicklungsplan, Iteration 0); sobald das geschieht, wird hier ergänzt, wer das ist und dass ein
            Auftragsverarbeitungsvertrag besteht. E-Mails (z. B. Eltern-Bestätigungslinks) werden aktuell noch
            nicht über einen echten E-Mail-Anbieter verschickt, sondern nur intern protokolliert — auch das
            wird hier ergänzt, sobald ein Anbieter angebunden ist. Eine Weitergabe an Dritte darüber hinaus
            findet nicht statt, außer wenn wir gesetzlich dazu verpflichtet sind.
          </p>

          <p>
            <b>6. Speicherdauer</b>
          </p>
          <p>
            Wir speichern deine Daten, solange dein Konto besteht. Du kannst dein Konto jederzeit selbst
            unwiderruflich löschen (in den Kontoeinstellungen im Header-Menü) — dabei werden dein Konto und
            alle zugehörigen Daten (Fortschritt, Kursbelegungen, soziale Verknüpfungen) entfernt.
          </p>

          <p>
            <b>7. Cookies</b>
          </p>
          <p>
            edukedo setzt ausschließlich ein einziges, technisch notwendiges Cookie: ein signiertes
            Session-Cookie zur Anmeldung (httpOnly, kann von JavaScript nicht ausgelesen werden). Es dient
            keiner Analyse, Werbung oder Nachverfolgung. Da es sich um ein unbedingt erforderliches Cookie
            handelt (§ 25 Abs. 2 Nr. 2 TTDSG, Art. 6 Abs. 1 lit. f DSGVO), ist dafür kein Consent-Banner
            erforderlich. Sollten wir künftig nicht notwendige Cookies (z. B. für Analyse) einsetzen, holen wir
            vorab deine Einwilligung über ein entsprechendes Banner ein.
          </p>
          <p>
            Für den Offline-Modus (F-42) werden zusätzlich Lerninhalte und noch nicht synchronisierte
            Antworten lokal in deinem Browser (IndexedDB) gespeichert — diese Daten verlassen dein Gerät nicht,
            bis eine Online-Verbindung besteht und sie mit deinem Konto synchronisiert werden.
          </p>

          <p>
            <b>8. Deine Rechte</b>
          </p>
          <p>
            Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21)
            bezüglich deiner Daten. Wende dich dazu an die im Impressum genannte Kontaktadresse. Du hast außerdem
            das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>

          <p>
            <b>9. Datensicherheit</b>
          </p>
          <p>
            Passwörter werden ausschließlich als Argon2id-Hash gespeichert. Die Übertragung erfolgt
            verschlüsselt (HTTPS), sobald edukedo produktiv unter einer eigenen Domain läuft.
          </p>

          <p>
            <b>10. Änderungen dieser Erklärung</b>
          </p>
          <p>
            Wir passen diese Erklärung an, sobald sich die tatsächliche Datenverarbeitung ändert (z. B. bei
            Anbindung eines Hosting- oder E-Mail-Anbieters, oder bei Aktivierung kostenpflichtiger
            KI-Funktionen).
          </p>

          <a className="link-muted" href="/">
            ← Zurück zur Startseite
          </a>
        </div>
      </main>
    </>
  );
}
