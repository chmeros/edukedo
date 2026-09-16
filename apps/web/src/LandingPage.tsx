import { useState } from "react";
import { FlipCard } from "./FlipCard";
import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";

/**
 * Öffentliche Startseite für nicht eingeloggte Besucher:innen (design/01-landing-und-app-
 * vorschau.html, siehe design/README.md) — bewusst als lokaler Zustand in App.tsx verdrahtet
 * statt als eigene Route (kein Router im Projekt): "Anmelden"/"Kostenlos starten" wechseln nur
 * auf das bestehende Login-/Registrierungsformular, ohne die Seite neu zu laden. Der
 * "Ein Blick in die App"-Abschnitt aus dem Entwurf (fiktive Browser-Attrappe mit Beispiel-
 * Prozentwerten) wurde bewusst nicht übernommen — echte Nutzungszahlen zu erfinden wäre
 * irreführend, und die eigentliche App ist ja nur einen Klick entfernt.
 */
export function LandingPage({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  const [heroFlipped, setHeroFlipped] = useState(false);

  return (
    <div className="landing">
      <Header right={<GuestHeaderActions onLogin={onLogin} onStart={onStart} />} />

      <main className="landing-wrap">
        <section className="hero">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Kostenloser Zugang zu Wissen</span>
              <h1>
                Lernen, das sich merkt,
                <br />
                wann du es <span className="hl">wieder vergisst.</span>
              </h1>
              <p className="hero-sub">
                edukedo bringt dich mit Karteikarten und Quiz nach dem FSRS-Wiederholungsalgorithmus sicher
                durch Prüfungen — von der IHK-Fortbildung bis zur Klassenarbeit. Ohne Bezahlschranke für den
                Lerninhalt.
              </p>
              <div className="hero-ctas">
                <button type="button" className="btn btn-primary" onClick={onStart}>
                  Kostenlos loslernen
                </button>
                <a className="btn btn-ghost" href="#method">
                  Wie das funktioniert
                </a>
              </div>
              <div className="stat-strip">
                <div className="stat">
                  <b>100&nbsp;%</b>
                  <span>kostenloser Lerninhalt</span>
                </div>
                <div className="stat">
                  <b>2</b>
                  <span>Pilotkurse am Start</span>
                </div>
                <div className="stat">
                  <b>FSRS</b>
                  <span>Wiederholung im richtigen Moment</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <span className="badge-floating">Beispiel-Karteikarte</span>
              <FlipCard
                flipped={heroFlipped}
                onToggle={() => setHeroFlipped((current) => !current)}
                front={
                  <>
                    <span className="flip-kicker">Karteikarte · Algebra &amp; Funktionen</span>
                    <p className="flip-q">D&nbsp;=&nbsp;b²&nbsp;&minus;&nbsp;4ac &mdash; wofür steht das?</p>
                    <span className="flip-hint">Antippen zum Umdrehen</span>
                  </>
                }
                back={
                  <>
                    <span className="flip-kicker" style={{ color: "#fff", opacity: 0.85 }}>
                      Antwort
                    </span>
                    <p className="flip-a">
                      Die Diskriminante: Sie verrät, wie viele Lösungen eine quadratische Gleichung hat.
                    </p>
                    <span className="flip-hint">Wieder umdrehen</span>
                  </>
                }
              />
            </div>
          </div>
        </section>
      </main>

      <section className="mission">
        <div className="landing-wrap mission-row">
          <p>
            Möglichst breiter, <b>kostenfreier Zugang zu Wissen</b> ist unser eigentlicher Zweck — nicht nur
            ein Mittel, um Nutzer:innen für später zu gewinnen.
          </p>
        </div>
      </section>

      <section className="landing-section" id="courses">
        <div className="landing-wrap">
          <div className="section-head">
            <span className="eyebrow">Zwei Piloten, ein Prinzip</span>
            <h2>Für Aufstiegsprüfung und Klassenarbeit gleichermaßen</h2>
            <p>
              Gleiche Lernmechanik, zwei ganz unterschiedliche Zielgruppen — das generische Kursmodell von
              edukedo trägt beide.
            </p>
          </div>

          <div className="course-grid">
            <article className="course-card c-fw">
              <div className="course-top">
                <div>
                  <span className="course-tag">IHK-Fortbildungsprüfung</span>
                  <h3>Fachwirt für Büro- und Projektorganisation</h3>
                </div>
                <span className="course-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20V9l8-5 8 5v11"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 20v-6h6v6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <p className="course-desc">
                Handlungsbereich „Personal führen und entwickeln" — frei formulierter Lernstoff, keine
                1:1-Übernahme aus Lehrgangsmaterial.
              </p>
              <div className="topic-list">
                <span className="topic-pill">Personalwirtschaft</span>
                <span className="topic-pill">Ausbildung</span>
                <span className="topic-pill">Konfliktmanagement</span>
                <span className="topic-pill">Moderation</span>
              </div>
              <div className="course-foot">
                <button type="button" className="course-foot-link" onClick={onStart}>
                  Kurs ansehen →
                </button>
                <span className="course-meta">für Erwachsene</span>
              </div>
            </article>

            <article className="course-card c-mt">
              <div className="course-top">
                <div>
                  <span className="course-tag">Schulfach · Klasse 9</span>
                  <h3>
                    Mathematik, bundeslandneutral <span className="badge-soon">Bald verfügbar</span>
                  </h3>
                </div>
                <span className="course-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 4v16M4 9h16" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
              </div>
              <p className="course-desc">
                Drei Themenblöcke nach den KMK-Bildungsstandards — für Klassenarbeiten und echtes
                Verständnis.
              </p>
              <div className="topic-list">
                <span className="topic-pill">Quadratische Funktionen</span>
                <span className="topic-pill">Satz des Pythagoras</span>
                <span className="topic-pill">Trigonometrie</span>
                <span className="topic-pill">Wahrscheinlichkeit</span>
              </div>
              <div className="course-foot">
                {/* Kurs ist inhaltlich fertig, aber noch nicht veröffentlicht (kurs.is_published =
                    false, siehe Architekturplanung Abschnitt 4.1/13) — bewusst kein anklickbarer
                    "Kurs ansehen"-Link mehr, der einen sofortigen Zugang suggerieren würde. */}
                <span className="course-meta">Registrierung schon möglich, Inhalte folgen in Kürze</span>
                <span className="course-meta">mit&nbsp;Eltern-Einwilligung</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-section" id="method">
        <div className="landing-wrap">
          <div className="section-head">
            <span className="eyebrow">Die Methode</span>
            <h2>Dein Gehirn vergisst planmäßig — wir holen dich rechtzeitig ab</h2>
            <p>
              Der FSRS-Algorithmus verschiebt jede Karteikarte genau dann wieder vor dich, wenn du kurz davor
              bist, sie zu vergessen.
            </p>
          </div>
          <div className="trail">
            <div className="trail-step">
              <div className="trail-num">1</div>
              <h3>Lernen</h3>
              <p>
                Theorie in eigenen Worten, dann direkt in Karteikarten und Quiz üben — kein langes
                Lehrbuch-Kapitel vorweg.
              </p>
            </div>
            <div className="trail-step">
              <div className="trail-num">2</div>
              <h3>Bewerten</h3>
              <p>
                Du schätzt nach jeder Karte kurz ein, wie schwer sie dir fiel — daraus berechnet FSRS dein
                nächstes Intervall.
              </p>
            </div>
            <div className="trail-step">
              <div className="trail-num">3</div>
              <h3>Behalten</h3>
              <p>
                Karten kommen genau rechtzeitig zurück — seltener, sobald sie sitzen, häufiger, solange sie
                wackeln.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-wrap">
          <div className="foot-row">
            <div>
              <span className="logo" style={{ marginBottom: 12 }}>
                <span className="logo-mark">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" fill="#fff" />
                  </svg>
                </span>
                edukedo
              </span>
              <p className="foot-mission">
                Ein Ort für Prüfungsvorbereitung und Wissenserwerb — unabhängig von einer einzelnen Prüfung
                oder Zielgruppe. Reichweite und Nutzung stehen bei uns vor Umsatz.
              </p>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© edukedo — kostenloser Zugang zu Wissen.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
