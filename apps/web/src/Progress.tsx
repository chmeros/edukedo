import { useRef, useState } from "react";
import { Achievements } from "./Achievements";
import { FriendCircle } from "./FriendCircle";
import { Highscore } from "./Highscore";
import { InfoIcon } from "./Icons";
import { Lernpartner } from "./Lernpartner";
import { OfflineDownload } from "./OfflineDownload";
import { RedeemCompanyCode } from "./RedeemCompanyCode";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { trpc } from "./trpc";
import { Zielplanung } from "./Zielplanung";

const PROGRESS_TABS: { id: "uebersicht" | "sozial" | "einstellungen"; label: string }[] = [
  { id: "uebersicht", label: "Übersicht" },
  { id: "sozial", label: "Sozial & Erfolge" },
  { id: "einstellungen", label: "Einstellungen" },
];

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

export function Progress({ kursId, isMinor }: { kursId: string; isMinor: boolean }) {
  const overview = trpc.progress.overview.useQuery({ kursId });
  // F-31/F-32: eigene Abfrage statt Teil von `overview` — andere Datenquelle (learning_event/
  // learning_session statt user_progress) und unabhängig ladend/leer, siehe
  // Architekturplanung Abschnitt 13.
  const stats = trpc.progress.stats.useQuery({ kursId });
  const [mode, setMode] = useState<"uebersicht" | "sozial" | "einstellungen">("uebersicht");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
      {/* Redesign 17.09.2026 (Nachfrage): der Fortschritt-Tab war als eine einzige, sehr lange
          Seite (Einstellungen + vier Social-/Gamification-Bereiche + volle Fachgebiets-
          Baumstruktur + Lernstatistik) unübersichtlich geworden — dieselbe Sub-Tab-Leiste wie in
          Pruefungsvorbereitung.tsx (".segmented", ARIA-Tablist mit roving Tabindex) statt eines
          neuen Musters, siehe Architekturplanung Abschnitt 13. Alle drei Panels bleiben wie dort
          über `hidden` immer gemountet statt beim Umschalten neu zu mounten, damit z. B. ein
          angefangener Freundeskreis-Formular-Entwurf beim Tab-Wechsel nicht verloren geht. */}
      <div className="segmented" role="tablist" aria-label="Fortschritt-Bereich">
        {PROGRESS_TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-fortschritt-${tab.id}`}
            aria-selected={mode === tab.id}
            aria-controls={`panel-fortschritt-${tab.id}`}
            tabIndex={mode === tab.id ? 0 : -1}
            className={mode === tab.id ? "is-active" : ""}
            onClick={() => setMode(tab.id)}
            onKeyDown={(event) =>
              handleTabListKeyDown(event, index, PROGRESS_TABS.length, tabRefs, (next) => setMode(PROGRESS_TABS[next]!.id))
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div hidden={mode !== "uebersicht"} role="tabpanel" id="panel-fortschritt-uebersicht" aria-labelledby="tab-fortschritt-uebersicht">
        {/* Eigener innerer .stack-Wrapper statt der Klasse direkt auf dem hidden-Element: ein
            display:flex-Class auf demselben Element wie `hidden` würde dessen native
            display:none-Wirkung überschreiben (gleiche Spezifität, Autoren-Regel nach
            User-Agent-Regel) — das Panel bliebe beim Umschalten sichtbar. */}
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
      </div>

      <div hidden={mode !== "sozial"} role="tabpanel" id="panel-fortschritt-sozial" aria-labelledby="tab-fortschritt-sozial">
        <FriendCircle kursId={kursId} />
        <Highscore kursId={kursId} isMinor={isMinor} />
        <Lernpartner kursId={kursId} fachgebiete={fachgebiete.map((entry) => ({ id: entry.id, title: entry.title }))} />
        <Achievements />
      </div>

      <div
        hidden={mode !== "einstellungen"}
        role="tabpanel"
        id="panel-fortschritt-einstellungen"
        aria-labelledby="tab-fortschritt-einstellungen"
      >
        <div className="panel-section widget-grid">
          <div className="widget">
            <Zielplanung kursId={kursId} />
          </div>
          <div className="widget">
            <OfflineDownload kursId={kursId} />
          </div>
          <div className="widget">
            <RedeemCompanyCode />
          </div>
        </div>
      </div>
    </div>
  );
}
