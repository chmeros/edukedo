import { useRef, useState } from "react";
import { Achievements } from "./Achievements";
import { InfoIcon } from "./Icons";
import { ProgressExportButton } from "./ProgressExport";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
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

type FachgebietOverview = {
  id: string;
  title: string;
  percent: number;
  mastered: number;
  total: number;
  themen: { id: string; title: string; percent: number; mastered: number; total: number }[];
};

/**
 * F-126 (Nutzer-Feedback vom 23.09.2026, erweitert F-30): Ein Fachgebiet zeigt zunächst nur
 * seine kumulierte Fortschrittsanzeige — die zugehörigen Themen werden erst nach Aufklappen
 * sichtbar, statt wie bisher immer alle Fachgebiete samt aller Themen gleichzeitig anzuzeigen.
 * Standardmäßig eingeklappt, AUSSER das Fachgebiet enthält das aktuell gefilterte Thema
 * (`activeThemaId`, siehe F-109-Standort-Hinweis) — sonst würde die bestehende
 * "aktuell ausgewählt"-Hervorhebung hinter einem eingeklappten Fachgebiet verschwinden.
 */
function FachgebietProgressBlock({
  fachgebiet,
  activeThemaId,
  onGoToThema,
}: {
  fachgebiet: FachgebietOverview;
  activeThemaId?: string;
  onGoToThema: (themaId: string, themaTitle: string) => void;
}) {
  const containsActiveThema = fachgebiet.themen.some((thema) => thema.id === activeThemaId);
  const [expanded, setExpanded] = useState(containsActiveThema);

  return (
    <div className="stack">
      <button
        type="button"
        className="progress-block is-total progress-block-toggle"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        <div className="progress-head">
          <b>
            {expanded ? "▾" : "▸"} {fachgebiet.title}
          </b>
          <span>
            {fachgebiet.percent} % ({fachgebiet.mastered}/{fachgebiet.total})
          </span>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${fachgebiet.percent}%` }} />
        </div>
      </button>
      {expanded &&
        fachgebiet.themen.map((thema) => (
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
  );
}

const FORTSCHRITT_MODE_TABS: { id: "uebersicht" | "erfolge"; label: string }[] = [
  { id: "uebersicht", label: "Übersicht" },
  { id: "erfolge", label: "Erfolge" },
];

/**
 * F-107 (18.09.2026): Zeigte ursprünglich nur noch die bisherige "Übersicht" direkt an, ohne
 * Unter-Tab-Leiste (siehe Architekturplanung Abschnitt 13) — "Sozial"/"Erfolge" waren damals
 * zu eigenständigen Haupt-Tabs geworden (`Sozial.tsx`, `Achievements.tsx`, siehe App.tsx),
 * "Einstellungen" wanderte ins Header-Benutzermenü (`SettingsModal.tsx`).
 * Nutzer-Vorgabe 26.09.2026 (siehe Architekturplanung Abschnitt 13): Fokus auf die drei
 * Kernfunktionen "Lernen"/"Prüfung"/"Instrumente" — "Erfolge" (`Achievements.tsx`, F-67)
 * kommt deshalb als interner Unter-Tab hierher zurück, "Fortschritt" dient jetzt als
 * Oberbegriff für beides. Bewusst wieder eine Unter-Tab-Leiste (nach demselben Muster wie
 * `Pruefungsvorbereitung.tsx`) statt einer schlichten Aneinanderreihung — "Übersicht" bleibt
 * dadurch bei jedem Aufruf des Fortschritt-Tabs unverändert der direkt sichtbare Standard.
 * "Sozial" bleibt bewusst ein eigener Haupt-Tab (nicht Teil dieser Zusammenführung).
 * F-109 (Nutzer-Feedback vom 18.09.2026): Die "Fortschritt je Fachgebiet"-Anzeige unten war
 * bereits genau die von F-109 verlangte Modul-/Fachgebiets-Übersicht mit Fortschritt je
 * Modul — ihr fehlte nur die "explizite Navigationsebene". Statt einer separaten, redundanten
 * zweiten Übersicht (z. B. im Instrumente-Tab) wird deshalb DIESE Ansicht um Klickbarkeit
 * (`onGoToThema`, derselbe F-27-Themenfilter wie bei F-14/F-50) sowie einen "Standort-Hinweis"
 * (`activeThemaId`, hebt das aktuell gefilterte Thema optisch hervor) ergänzt.
 * F-126 (Nutzer-Feedback vom 23.09.2026): Jedes Fachgebiet ist jetzt einzeln auf-/zuklappbar
 * (siehe FachgebietProgressBlock oben) statt alle Themen aller Fachgebiete gleichzeitig zu
 * zeigen.
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
  const [mode, setMode] = useState<"uebersicht" | "erfolge">("uebersicht");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const overview = trpc.progress.overview.useQuery({ kursId });
  // F-31/F-32: eigene Abfrage statt Teil von `overview` — andere Datenquelle (learning_event/
  // learning_session statt user_progress) und unabhängig ladend/leer, siehe
  // Architekturplanung Abschnitt 13.
  const stats = trpc.progress.stats.useQuery({ kursId });

  const fachgebiete = overview.data ?? [];

  return (
    <div className="stack">
      <div className="segmented" role="tablist" aria-label="Fortschritt">
        {FORTSCHRITT_MODE_TABS.map((tab, index) => (
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
              handleTabListKeyDown(event, index, FORTSCHRITT_MODE_TABS.length, tabRefs, (next) =>
                setMode(FORTSCHRITT_MODE_TABS[next]!.id),
              )
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Bewusst OHNE eigene className hier (anders als sonst bei .stack-Wrappern in dieser
          Codebase) — `.stack` setzt `display: flex` und würde damit das `hidden`-Attribut
          überschreiben (Author-Stylesheet schlägt UA-Default bei gleicher Spezifität), sodass
          dieses Panel trotz `hidden` sichtbar bliebe. Die Flex-Spaltenanordnung steckt deshalb
          im inneren Fragment-Kind weiter unten. */}
      <div hidden={mode !== "uebersicht"} role="tabpanel" id="panel-fortschritt-uebersicht" aria-labelledby="tab-fortschritt-uebersicht">
        {overview.isLoading ? (
          <p>Lädt…</p>
        ) : fachgebiete.length === 0 ? (
          <div className="alert alert-info">
            <InfoIcon />
            <div>Noch keine Karteikarten-Fortschrittsdaten für diesen Kurs. Lerne ein paar Karteikarten.</div>
          </div>
        ) : (
          <div className="stack">
            {/* F-34: exportiert genau die unten sichtbaren Daten (Fachgebiet-/Themen-Fortschritt +
                Lernstatistik), siehe ProgressExport.tsx. */}
            <div style={{ alignSelf: "flex-start" }}>
              <ProgressExportButton kursTitle={kursTitle} userLabel={userLabel} overview={fachgebiete} stats={stats.data} />
            </div>
            <div className="panel-section">
              <div className="panel-section-head">
                <h2>Fortschritt je Fachgebiet</h2>
                <p>Auf ein Fachgebiet klicken, um die Themen auf-/zuzuklappen; auf ein Thema klicken, um gezielt dort weiterzulernen.</p>
              </div>
              <div className="progress-grid">
                {fachgebiete.map((fachgebiet) => (
                  <FachgebietProgressBlock
                    key={fachgebiet.id}
                    fachgebiet={fachgebiet}
                    activeThemaId={activeThemaId}
                    onGoToThema={onGoToThema}
                  />
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

                {/* F-127 (Nutzer-Feedback vom 23.09.2026, erweitert F-31/F-32, siehe Architekturplanung
                    Abschnitt 13): beide Auswertungen nutzten bisher dieselbe Balkenoptik
                    (.progress-block, nur die Farbe unterschied sich) und standen ohne erklärenden Text
                    direkt untereinander — leicht als EINE zusammenhängende Zeitreihe misszuverstehen,
                    obwohl es zwei unabhängige Kennzahlen mit unterschiedlicher Gruppierung sind (je
                    Kalendertag vs. je Thema). Erklärender Hinweistext hier, plus eine strukturell
                    andere Darstellung für die Trefferquote (vertikales Balkendiagramm entlang einer
                    Datums-Achse, siehe .stat-timeline-* unten) statt derselben horizontalen
                    Balken-Liste wie bei den Schwachstellen. */}
                {(stats.data.dailyHitRate.length > 0 || stats.data.weakThemen.length > 0) && (
                  <p className="field-hint">
                    Die beiden folgenden Auswertungen sind zwei unabhängige Kennzahlen, keine zusammenhängende
                    Zeitreihe: links die Trefferquote je Kalendertag, darunter die Schwachstellen je Thema.
                  </p>
                )}

                {stats.data.dailyHitRate.length > 0 && (
                  <div className="stack">
                    <span className="stat-subheading">Trefferquote im Zeitverlauf — je Kalendertag</span>
                    <div className="stat-timeline">
                      {stats.data.dailyHitRate.map((day) => (
                        <div
                          key={day.date}
                          className="stat-timeline-col"
                          title={`${new Date(day.date).toLocaleDateString("de-DE")}: ${day.percent} % (${day.correct}/${day.total})`}
                        >
                          <span className="stat-timeline-value">{day.percent} %</span>
                          <div className="stat-timeline-track">
                            <span className="stat-timeline-bar" style={{ height: `${day.percent}%` }} />
                          </div>
                          <span className="stat-timeline-date">
                            {new Date(day.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stats.data.weakThemen.length > 0 && (
                  <div className="stack">
                    <span className="stat-subheading">Schwachstellen — hier lohnt sich Wiederholen, je Thema</span>
                    <p className="field-hint">
                      Die {stats.data.weakThemen.length} Themen mit der niedrigsten Trefferquote (mindestens 3
                      beantwortete Fragen), unabhängig davon, an welchem Tag gelernt wurde.
                    </p>
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
        )}
      </div>
      <div
        hidden={mode !== "erfolge"}
        role="tabpanel"
        id="panel-fortschritt-erfolge"
        aria-labelledby="tab-fortschritt-erfolge"
      >
        <Achievements />
      </div>
    </div>
  );
}
