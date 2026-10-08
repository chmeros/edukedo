import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";

function goHome() {
  window.location.href = "/";
}

/** Review WEB-31: Unbekannte Adressen zeigen eine Hinweisseite statt stillschweigend die App. */
export function NotFound() {
  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card stack">
          <h1>Seite nicht gefunden</h1>
          <p>Diese Adresse gibt es bei edukedo nicht. Vielleicht ist der Link veraltet oder falsch abgetippt.</p>
          <a className="btn btn-primary" style={{ alignSelf: "flex-start" }} href="/">
            Zur Startseite
          </a>
        </div>
      </main>
    </>
  );
}
