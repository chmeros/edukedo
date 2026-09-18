import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { InfoIcon } from "./Icons";

/** Eigenständige Seite ohne App.tsx-Zustand — Header-Aktionen führen schlicht zur Startseite,
 * analog zu DatenschutzKinder.tsx/AGB.tsx/Datenschutzerklaerung.tsx. */
function goHome() {
  window.location.href = "/";
}

/**
 * F-51 (Impressum, Teil 1 von 3): Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz, löste zum
 * 14.05.2024 die bisherige Impressumspflicht nach § 5 TMG ab). **Bewusst mit Platzhaltern statt
 * echter Kontaktdaten** (Nutzer-Entscheidung 18.09.2026, siehe Architekturplanung Abschnitt 13):
 * Die laut Entwicklungsplan (Iteration 0, Recht & Compliance) nötige Kleingewerbe-Anmeldung
 * inkl. ladungsfähiger Anschrift sowie die geschäftliche E-Mail-Adresse (Iteration 0,
 * Organisatorisches) sind beide noch nicht abgeschlossen — ein Impressum mit erfundenen Angaben
 * wäre selbst rechtswidrig. Vor echtem Live-Gang müssen die Platzhalter durch echte, geprüfte
 * Angaben ersetzt werden. Statische Seite ohne tRPC-Zugriff, öffentlich unter /impressum
 * (kein eigener Router im Projekt, siehe main.tsx).
 */
export function Impressum() {
  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card stack">
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              Entwurf mit Platzhaltern. Die Kleingewerbe-Anmeldung und die geschäftliche E-Mail-Adresse stehen
              noch aus (siehe Entwicklungsplan, Iteration 0) — vor echtem Live-Gang müssen die eckigen Klammern
              durch echte, geprüfte Angaben ersetzt werden.
            </div>
          </div>

          <h2>Impressum</h2>

          <p>
            <b>Angaben gemäß § 5 DDG</b>
          </p>
          <p>
            edukedo
            <br />
            [Name der Projektverantwortlichen/des Projektverantwortlichen]
            <br />
            [Straße Hausnummer]
            <br />
            [PLZ Ort]
          </p>

          <p>
            <b>Kontakt</b>
            <br />
            E-Mail: [kontakt@edukedo.de]
            <br />
            Telefon: [optional, falls vorhanden]
          </p>

          <p>
            <b>Rechtsform</b>
            <br />
            Einzelunternehmen (Kleingewerbe)
            <br />
            [ggf. Hinweis zur Kleinunternehmerregelung gemäß § 19 UStG]
          </p>

          <p>
            <b>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</b>
            <br />
            [Name, Anschrift wie oben — sofern die Inhalte als journalistisch-redaktionell
            einzustufen sind; vor Live-Gang rechtlich zu klären]
          </p>

          <p>
            <b>Streitschlichtung</b>
            <br />
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <p>
            <b>Haftung für Inhalte</b>
            <br />
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen. Eine Entfernung oder Sperrung rechtswidriger Inhalte erfolgt, sobald
            wir davon Kenntnis erlangen.
          </p>

          <p>
            <b>Haftung für Links</b>
            <br />
            Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr; verantwortlich ist stets der
            jeweilige Anbieter der verlinkten Seite.
          </p>

          <p>
            <b>Hinweis zu Prüfungsinstitutionen</b>
            <br />
            edukedo ist ein privates Lernhilfsmittel und steht in keiner Verbindung zu IHKs, Schulen,
            Kultusministerien oder anderen Prüfungsinstitutionen. Es besteht kein Anspruch auf inhaltliche
            Übereinstimmung mit aktuellen offiziellen Prüfungs- oder Lehrplananforderungen.
          </p>

          <a className="link-muted" href="/">
            ← Zurück zur Startseite
          </a>
        </div>
      </main>
    </>
  );
}
