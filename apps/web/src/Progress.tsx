import { InfoIcon } from "./Icons";
import { ProgressExportButton } from "./ProgressExport";
import { trpc } from "./trpc";

export function formatLernzeit(minutes: number): string {
  if (minutes < 1) {
    return "< 1 Min.";
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) {
    return `${rest} Min.`;
  }
  return `${hours} Std. ${rest} Min.`;
}

/**
 * F-107: Zeigt nur noch die bisherige "Übersicht" direkt an, ohne Unter-Tab-Leiste (siehe
 * Architekturplanung Abschnitt 13) — "Sozial"/"Erfolge" sind jetzt eigenständige Haupt-Tabs
 * (`Sozial.tsx`, `Achievements.tsx`, siehe App.tsx), "Einstellungen" ist ins
 * Header-Benutzermenü gewandert (`SettingsModal.tsx`).
 * F-109 (Nutzer-Feedback vom 18.09.2026): Die "Fortschritt je Fachgebiet"-Anzeige unten war
 * bereits genau die von F-109 verlangte Modul-/Fachgebiets-Übersicht mit Fortschritt je
 * Modul — ihr fehlte nur die "explizite Navigationsebene". Statt einer separaten, redundanten
 * zweiten Übersicht (z. B. im Instrumente-Tab) wird deshalb DIESE Ansicht um Klickbarkeit
 * (`onGoToThema`, derselbe F-27-Themenfilter wie bei F-14/F-50) sowie einen "Standort-Hinweis"
 * (`activeThemaId`, hebt das aktuell gefilterte Thema optisch hervor) ergänzt.
 */
export function Progress({
  kursId,
  kursTitle,
  userLabel,
  activeThemaId,
  onGoToThema,
}: {
  kursId: string;
  kursTitle: string;
  userLabel: string;
  activeThemaId?: string;
  onGoToThema: (themaId: string, themaTitle: string) => void;
}) {
  const overview = trpc.progress.overview.useQuery({ kursId });
  // F-31/F-32: eigene Abfrage statt Teil von `overview` — andere Datenquelle (learning_event/
  // learning_session statt user_progress) und unabhängig ladend/leer, siehe
  // Architekturplanung Abschnitt 13.
  const stats = trpc.progress.stats.useQuery({ kursId });

  if (overview.isLoading) {
    return <p>Lädt…</p>;
  }

  const fachgebiete = overview.data ?? [];

  if (fachgebiete.length === 0) {
    return (
      <div className="alert alert-info">
        <InfoIcon />
        <div>Noch keine Karteikarten-Fortschrittsdaten für diesen Kurs. Lerne ein paar Karteikarten.</div>
      </div>
    );
  }

  return (
    <div className="stack">
      {/* F-34: exportiert genau die unten sichtbaren Daten (Fachgebiet-/Themen-Fortschritt +
          Lernstatistik), siehe ProgressExport.tsx. */}
      <div style={{ alignSelf: "flex-start" }}>
        <ProgressExportButton kursTitle={kursTitle} userLabel={userLabel} overview={fachgebiete} stats={stats.data} />
      </div>
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Fortschritt je Fachgebiet</h2>
          <p>Auf ein Thema klicken, um gezielt dort weiterzulernen.</p>
        </div>
        <div className="progress-grid">
          {fachgebiete.map((fachgebiet) => (
            <div key={fachgebiet.id} className="stack">
              <div className="progress-block is-total">
                <div className="progress-head">
                  <b>{fachgebiet.title}</b>
                  <span>
                    {fachgebiet.percent} % ({fachgebiet.mastered}/{fachgebiet.total})
                  </span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${fachgebiet.percent}%` }} />
                </div>
              </div>
              {fachgebiet.themen.map((thema) => (
                <button
                  key={thema.id}
                  type="button"
                  className={thema.id === activeThemaId ? "progress-block is-active" : "progress-block"}
                  onClick={() => onGoToThema(thema.id, thema.title)}
                >
                  <div className="progress-head">
                    <b>
                      {thema.title}
                      {thema.id === activeThemaId ? " · aktuell ausgewählt" : ""}
                    </b>
                    <span>
                      {thema.percent} % ({thema.mastered}/{thema.total})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${thema.percent}%` }} />
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {stats.data && stats.data.totalAnswered > 0 && (
        <div className="panel-section">
          <div className="panel-section-head">
            <h2>Deine Lernstatistik</h2>
          </div>
          <div className="stat-row">
            <div className="stat-tile">
              <span className="stat-value">{stats.data.hitRatePercent} %</span>
              <span className="stat-label">Trefferquote</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{stats.data.totalAnswered}</span>
              <span className="stat-label">Beantwortete Fragen</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{formatLernzeit(stats.data.learningMinutes)}</span>
              <span className="stat-label">Lernzeit</span>
            </div>
          </div>

          {stats.data.dailyHitRate.length > 0 && (
            <div className="stack">
              <span className="stat-subheading">Trefferquote im Zeitverlauf</span>
              {stats.data.dailyHitRate.map((day) => (
                <div key={day.date} className="progress-block">
                  <div className="progress-head">
                    <b>{day.date}</b>
                    <span>
                      {day.percent} % ({day.correct}/{day.total})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${day.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {stats.data.weakThemen.length > 0 && (
            <div className="stack">
              <span className="stat-subheading">Schwachstellen — hier lohnt sich Wiederholen</span>
              {stats.data.weakThemen.map((thema) => (
                <div key={thema.id} className="progress-block is-weak">
                  <div className="progress-head">
                    <b>{thema.title}</b>
                    <span>
                      {thema.percent} % ({thema.correct}/{thema.total})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${thema.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
