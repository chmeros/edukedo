import { formatDauer, parseUhrzeit, pruefeWoche, REGEL_STAND, REGELN, type Arbeitstag, type Personengruppe } from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-198 (Arbeitszeit-Prüfer, siehe Architekturplanung Abschnitt 13): Übung zu den Grundregeln des Arbeitszeitgesetzes
 * (Erwachsene) und des Jugendarbeitsschutzgesetzes (unter 18 Jahren). Rechnet live im Browser
 * (packages/shared/src/arbeitszeit.ts), ohne Server-Aufruf, Speicherung oder Wertung. Die Regelsätze sind getrennt
 * und mit Stand und Paragrafen sichtbar; Ausnahmen sind bewusst nicht abgebildet. Keine Rechtsberatung.
 */
const TAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"] as const;

interface Zeile {
  beginn: string;
  ende: string;
  pause: string;
  berufsschule: boolean;
}

const LEER: Zeile = { beginn: "", ende: "", pause: "0", berufsschule: false };

const BEISPIEL: Record<Personengruppe, Zeile[]> = {
  erwachsene: [
    { beginn: "08:00", ende: "17:00", pause: "30", berufsschule: false },
    { beginn: "08:00", ende: "18:30", pause: "30", berufsschule: false },
    { beginn: "14:00", ende: "22:30", pause: "30", berufsschule: false },
    { beginn: "07:30", ende: "13:00", pause: "0", berufsschule: false },
    { beginn: "08:00", ende: "16:00", pause: "30", berufsschule: false },
    LEER,
    LEER,
  ],
  jugendliche: [
    { beginn: "07:00", ende: "15:30", pause: "60", berufsschule: false },
    { beginn: "07:00", ende: "11:45", pause: "0", berufsschule: false },
    { beginn: "08:00", ende: "14:00", pause: "30", berufsschule: true },
    { beginn: "12:00", ende: "20:30", pause: "60", berufsschule: false },
    { beginn: "06:30", ende: "14:30", pause: "60", berufsschule: false },
    { beginn: "08:00", ende: "12:00", pause: "0", berufsschule: false },
    LEER,
  ],
};

function alsArbeitstag(zeile: Zeile): Arbeitstag {
  const pause = /^\d{1,3}$/.test(zeile.pause.trim()) ? Number(zeile.pause.trim()) : 0;
  return { beginnMin: parseUhrzeit(zeile.beginn), endeMin: parseUhrzeit(zeile.ende), pauseMin: pause, berufsschule: zeile.berufsschule };
}

const GRUPPEN: { id: Personengruppe; label: string }[] = [
  { id: "erwachsene", label: "Erwachsene (ArbZG)" },
  { id: "jugendliche", label: "Jugendliche unter 18 (JArbSchG)" },
];

export function Arbeitszeitpruefer({ onClose }: { onClose: () => void }) {
  const [gruppe, setGruppe] = useState<Personengruppe>("erwachsene");
  const [zeilen, setZeilen] = useState<Zeile[]>(BEISPIEL.erwachsene);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const regeln = REGELN[gruppe];
  const auswertung = useMemo(() => pruefeWoche(gruppe, zeilen.map(alsArbeitstag)), [gruppe, zeilen]);

  function wechsle(neu: Personengruppe) {
    setGruppe(neu);
    setZeilen(BEISPIEL[neu]);
  }

  function aendere(index: number, teil: Partial<Zeile>) {
    setZeilen((aktuell) => aktuell.map((zeile, position) => (position === index ? { ...zeile, ...teil } : zeile)));
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Arbeitszeit-Prüfer</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Übung zu den Grundregeln des Arbeitszeitgesetzes und des Jugendarbeitsschutzgesetzes, keine Rechtsberatung. Stand der Regelwerte: {REGEL_STAND}. Ausnahmen (Tarifverträge, Branchen, Pflege,
          Rufbereitschaft) sind nicht abgebildet. Die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Personengruppe">
          {GRUPPEN.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-az-${eintrag.id}`}
              aria-selected={gruppe === eintrag.id}
              aria-controls="panel-az"
              tabIndex={gruppe === eintrag.id ? 0 : -1}
              className={gruppe === eintrag.id ? "is-active" : ""}
              onClick={() => wechsle(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, GRUPPEN.length, tabRefs, (next) => wechsle(GRUPPEN[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id="panel-az" aria-labelledby={`tab-az-${gruppe}`} className="stack">
          <details>
            <summary>Die Grundregeln im Überblick ({regeln.gesetz})</summary>
            <ul>
              <li>
                Arbeitszeit: höchstens {formatDauer(regeln.tagNormalMin)} am Tag
                {regeln.tagMaxMitAusgleichMin !== null ? `, bis ${formatDauer(regeln.tagMaxMitAusgleichMin)} nur mit Ausgleich` : ""}
                {regeln.wocheMaxMin !== null ? `, höchstens ${formatDauer(regeln.wocheMaxMin)} in der Woche an höchstens ${regeln.maxArbeitstageProWoche} Tagen` : ""} ({regeln.paragrafen.arbeitszeit}
                {regeln.paragrafen.woche ? `, ${regeln.paragrafen.woche}` : ""}).
              </li>
              <li>
                Ruhepausen:{" "}
                {regeln.pausenStufen.map((stufe) => `${stufe.pauseMin} Minuten bei mehr als ${formatDauer(stufe.abMin)} Arbeitszeit`).join(", ")} ({regeln.paragrafen.pause}).
              </li>
              <li>
                Ruhezeit: mindestens {formatDauer(regeln.ruhezeitMin)} zwischen zwei Arbeitstagen ({regeln.paragrafen.ruhezeit}).
              </li>
              {regeln.fenster && <li>Beschäftigung grundsätzlich nur zwischen 06:00 und 20:00 Uhr ({regeln.paragrafen.fenster}).</li>}
              {regeln.paragrafen.berufsschule && <li>Berufsschultag mit mehr als fünf Unterrichtsstunden: keine Beschäftigung im Betrieb ({regeln.paragrafen.berufsschule}).</li>}
            </ul>
          </details>

          <div className="netzplan-tabelle-wrap">
            <table className="netzplan-tabelle">
              <caption className="field-hint">Arbeitswoche (leer lassen = frei). Endet die Schicht nach Mitternacht, steht bei „Ende“ die Uhrzeit des Folgetags.</caption>
              <thead>
                <tr>
                  <th scope="col">Tag</th>
                  <th scope="col">Beginn</th>
                  <th scope="col">Ende</th>
                  <th scope="col">Pause (Min.)</th>
                  {gruppe === "jugendliche" && <th scope="col">Berufsschultag</th>}
                </tr>
              </thead>
              <tbody>
                {TAGE.map((name, index) => {
                  const zeile = zeilen[index]!;
                  return (
                    <tr key={name}>
                      <th scope="row">{name}</th>
                      <td>
                        <input type="time" className="input" aria-label={`${name}: Beginn`} value={zeile.beginn} onChange={(event) => aendere(index, { beginn: event.target.value })} />
                      </td>
                      <td>
                        <input type="time" className="input" aria-label={`${name}: Ende`} value={zeile.ende} onChange={(event) => aendere(index, { ende: event.target.value })} />
                      </td>
                      <td>
                        <input
                          className="input"
                          inputMode="numeric"
                          aria-label={`${name}: Pause in Minuten`}
                          value={zeile.pause}
                          autoComplete="off"
                          onChange={(event) => aendere(index, { pause: event.target.value })}
                        />
                      </td>
                      {gruppe === "jugendliche" && (
                        <td>
                          <input type="checkbox" aria-label={`${name}: Berufsschultag mit mehr als fünf Unterrichtsstunden`} checked={zeile.berufsschule} onChange={(event) => aendere(index, { berufsschule: event.target.checked })} />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="list-row-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setZeilen(BEISPIEL[gruppe])}>
              Beispielwoche laden
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZeilen(TAGE.map(() => LEER))}>
              Alles leeren
            </button>
          </div>

          <h3 className="tile-group-title">Auswertung</h3>
          <div aria-live="polite" className="stack">
            {auswertung.arbeitstage === 0 && <p className="field-hint">Trage Beginn, Ende und Pause für mindestens einen Tag ein.</p>}
            {auswertung.tage.map((tag, index) =>
              tag.arbeitsMin === null && tag.hinweise.length === 0 ? null : (
                <div key={TAGE[index]}>
                  <p>
                    <b>{TAGE[index]}:</b> {tag.arbeitsMin !== null ? `${formatDauer(tag.arbeitsMin)} Arbeitszeit` : "Eingabe prüfen"}
                    {tag.hinweise.length === 0 && " – keine Beanstandung."}
                  </p>
                  {tag.hinweise.length > 0 && (
                    <ul>
                      {tag.hinweise.map((hinweis, position) => (
                        <li key={position}>
                          <b>{hinweis.art === "verstoss" ? "Verstoß" : "Hinweis"}</b> ({hinweis.regel}): {hinweis.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            )}
            {auswertung.arbeitstage > 0 && (
              <div>
                <p>
                  <b>Woche:</b> {formatDauer(auswertung.summeMin)} an {auswertung.arbeitstage} Tagen
                  {auswertung.hinweise.length === 0 && " – keine Beanstandung."}
                </p>
                {auswertung.hinweise.length > 0 && (
                  <ul>
                    {auswertung.hinweise.map((hinweis, position) => (
                      <li key={position}>
                        <b>Verstoß</b> ({hinweis.regel}): {hinweis.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
