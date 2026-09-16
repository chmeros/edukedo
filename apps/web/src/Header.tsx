import type { ReactNode } from "react";
import { BrandLink } from "./BrandLink";

/**
 * Global über allen Zuständen (Landing, Login/Registrierung, eingeloggte App, Eltern-
 * Dashboard, Vorschau, Rechtsseiten) — löst den bisherigen Bruch zwischen der vollflächigen
 * Landing Page (eigener `.landing-nav`-Header) und dem in eine einzelne `.shell > .card`
 * gepressten Rest der App ab (siehe Architekturplanung Abschnitt 13, Entscheidung vom
 * 16.09.2026). Nutzt bewusst exakt dieselben CSS-Klassen wie die ursprüngliche Landing-Page-
 * Kopfzeile (`landing-nav`/`landing-wrap`/`landing-nav-actions`), damit der Header überall
 * pixelgleich aussieht, statt eine zweite, ähnliche Variante zu pflegen.
 */
export function Header({ right }: { right?: ReactNode }) {
  return (
    <>
      {/* F-44: Sprungmarke zum Hauptinhalt — nur bei Tastaturfokus sichtbar (.skip-link in
          styles.css), damit Tastatur-/Screenreader-Nutzende nicht bei jedem Seitenaufruf
          zuerst durch den kompletten Header tabben müssen, um zum eigentlichen Inhalt zu
          kommen. Zielt auf `#main-content`, das jede Seite auf ihrem `<main>` trägt. */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <header className="landing-nav">
        <div className="landing-wrap landing-nav-row">
          <BrandLink />
          {right && <div className="landing-nav-actions">{right}</div>}
        </div>
      </header>
    </>
  );
}
