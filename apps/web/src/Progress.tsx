import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

function formatLernzeit(minutes: number): string {
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
 */
export function Progress({ kursId }: { kursId: string }) {
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
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Fortschritt je Fachgebiet</h2>
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
                <div key={thema.id} className="progress-block">
                  <div className="progress-head">
                    <b>{thema.title}</b>
                    <span>
                      {thema.percent} % ({thema.mastered}/{thema.total})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${thema.percent}%` }} />
                  </div>
                </div>
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
