import {
  createSeededRandom,
  randomSeed,
  bewerteTestwerte,
  erwartet,
  erzeugeTestAufgabe,
  grenzen,
  istErwartetRichtig,
  klasseText,
  klassen,
  leseBetrag,
  leseTestwerte,
  musterTestwerte,
  spezText,
  type TestAufgabe,
  type TestStufe,
} from "@edukedo/shared";
import { useMemo, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { AufgabenNummer } from "./AufgabenNummer";

/**
 * F-205 (Testfall-Trainer, siehe Architekturplanung Abschnitt 13): Übung zu Äquivalenzklassen und Grenzwerten für
 * ganzzahlige Eingaben im Kurs „Fachinformatiker Anwendungsentwicklung“ (Black-Box-Test, Kurstheorie 9.2). Zu einer
 * zufälligen Spezifikation nennt man die Zahl der Klassen, wählt Testwerte und trägt erwartete Ergebnisse ein. Rechnet im
 * Browser (packages/shared/src/testfaelle.ts), ohne Server-Aufruf, Speicherung oder Wertung.
 */
const STUFEN: { id: TestStufe; label: string; hinweis: string }[] = [
  { id: "leicht", label: "Leicht", hinweis: "Zwei Staffelstufen, nur Klassen und Testwerte; jede Klasse braucht einen Wert." },
  { id: "mittel", label: "Mittel", hinweis: "Drei Staffelstufen; die Testwerte müssen auch alle Grenzwerte beidseitig enthalten, dazu vier erwartete Ergebnisse." },
  { id: "schwer", label: "Schwer", hinweis: "Drei bis vier Staffelstufen mit Obergrenze; Klassen, Grenzwerte beidseitig und sechs erwartete Ergebnisse." },
];

function Marke({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
      ✓
    </span>
  ) : (
    <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
      ✗
    </span>
  );
}

export function Testfalltrainer({ onClose }: { onClose: () => void }) {
  const [stufe, setStufe] = useState<TestStufe>("leicht");
  const [nummer, setNummer] = useState(randomSeed);
  const [aufgabe, setAufgabe] = useState<TestAufgabe>(() => erzeugeTestAufgabe("leicht", createSeededRandom(nummer)));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);
  const { spec, erwartungsEingaben } = aufgabe;
  const alleKlassen = useMemo(() => klassen(spec), [spec]);

  function neu(naechste: TestStufe, vorgabe?: number) {
    setStufe(naechste);
    const neueNummer = vorgabe ?? randomSeed();
    setNummer(neueNummer);
    setAufgabe(erzeugeTestAufgabe(naechste, createSeededRandom(neueNummer)));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  function aendere(id: string, wert: string) {
    setEingaben((aktuell) => ({ ...aktuell, [id]: wert }));
    setGeprueft(false);
  }

  const werte = leseTestwerte(eingaben.testwerte ?? "");
  const abdeckung = werte !== null && werte.length > 0 ? bewerteTestwerte(spec, werte) : null;
  const grenzenGefordert = stufe !== "leicht";
  const anzahlOk = leseBetrag(eingaben.anzahl ?? "") === alleKlassen.length;
  const testwerteOk = abdeckung !== null && abdeckung.klassenVollstaendig && (!grenzenGefordert || abdeckung.grenzenVollstaendig);
  const erwartetOk = erwartungsEingaben.map((wert) => istErwartetRichtig(eingaben[`erw-${wert}`] ?? "", erwartet(spec, wert)));
  const felder = [anzahlOk, testwerteOk, ...erwartetOk];
  const richtig = felder.filter(Boolean).length;
  const eingabeKlasse = (ok: boolean) => `input netzplan-eingabe${geprueft ? (ok ? " is-correct" : " is-wrong") : ""}`;

  function zeigeLoesung() {
    const antworten: Record<string, string> = { anzahl: String(alleKlassen.length), testwerte: musterTestwerte(spec).join("; ") };
    for (const wert of erwartungsEingaben) antworten[`erw-${wert}`] = erwartet(spec, wert);
    setEingaben(antworten);
    setGeprueft(false);
    setGeloest(true);
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Testfall-Trainer</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Übung zu Äquivalenzklassen und Grenzwerten, wie sie die Kurstheorie zum Black-Box-Test beschreibt. Alle Eingaben sind ganze Zahlen. Die Aufgaben sind Beispiele, die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="group" aria-label="Schwierigkeit">
          {STUFEN.map((eintrag) => (
            <button key={eintrag.id} type="button" className={stufe === eintrag.id ? "is-active" : ""} aria-pressed={stufe === eintrag.id} onClick={() => neu(eintrag.id)}>
              {eintrag.label}
            </button>
          ))}
        </div>
        <span className="field-hint">{STUFEN.find((eintrag) => eintrag.id === stufe)!.hinweis}</span>
        <details className="instrument-more">
          <summary>So geht die Testfallermittlung</summary>
          <ol>
            <li>Teile den Eingabebereich in Klassen, in denen sich alle Werte nach der Spezifikation gleich verhalten. Auch die ungültigen Bereiche sind Klassen.</li>
            <li>Wähle aus jeder Klasse einen Repräsentanten.</li>
            <li>Teste zusätzlich an jeder Grenze zwischen zwei Klassen beide Seiten: den letzten Wert der unteren und den ersten Wert der oberen Klasse. Dort entstehen die typischen Fehler (zum Beispiel „&gt;“ statt „&gt;=“).</li>
            <li>Lege für jeden Testwert das erwartete Ergebnis aus der Spezifikation fest.</li>
          </ol>
        </details>

        <p>
          <b>Spezifikation:</b> {spezText(spec)}
        </p>

        <div className="field">
          <label htmlFor="tf-anzahl">Wie viele Äquivalenzklassen gibt es (gültige und ungültige zusammen)?</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input id="tf-anzahl" className={eingabeKlasse(anzahlOk)} inputMode="numeric" autoComplete="off" value={eingaben.anzahl ?? ""} onChange={(event) => aendere("anzahl", event.target.value)} />
            {geprueft && <Marke ok={anzahlOk} />}
          </div>
        </div>

        <div className="field">
          <label htmlFor="tf-testwerte">Deine Testwerte (ganze Zahlen, mit Semikolon oder Leerzeichen getrennt, auch negative)</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id="tf-testwerte"
              className={eingabeKlasse(testwerteOk)}
              style={{ width: "24rem", maxWidth: "100%" }}
              autoComplete="off"
              value={eingaben.testwerte ?? ""}
              onChange={(event) => aendere("testwerte", event.target.value)}
            />
            {geprueft && <Marke ok={testwerteOk} />}
          </div>
          <span className="field-hint">
            {grenzenGefordert ? "Jede Klasse braucht mindestens einen Wert, und an jeder Grenze müssen beide Randwerte dabei sein." : "Jede Klasse braucht mindestens einen Wert. Die Grenzwerte folgen auf den höheren Stufen."}
          </span>
        </div>

        {erwartungsEingaben.length > 0 && (
          <div className="stack">
            <h3 className="tile-group-title">Erwartete Ergebnisse</h3>
            <p className="field-hint">Trage zu diesen Eingaben das Ergebnis ein, das die Spezifikation verlangt (bei ungültigen Eingaben „Fehlermeldung“).</p>
            {erwartungsEingaben.map((wert, index) => (
              <div className="field" key={wert}>
                <label htmlFor={`tf-erw-${wert}`}>Eingabe {wert}</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input id={`tf-erw-${wert}`} className={eingabeKlasse(erwartetOk[index]!)} autoComplete="off" value={eingaben[`erw-${wert}`] ?? ""} onChange={(event) => aendere(`erw-${wert}`, event.target.value)} />
                  {geprueft && <Marke ok={erwartetOk[index]!} />}
                </div>
              </div>
            ))}
          </div>
        )}

        {geprueft && (
          <div className="stack" aria-live="polite">
            {werte === null && <p className="field-hint subnet-fehler">Die Testwerte sind keine Liste ganzer Zahlen. Trenne mit Semikolon oder Leerzeichen und lass Kommas und Dezimalstellen weg.</p>}
            {werte !== null && werte.length === 0 && <p className="field-hint">Du hast noch keine Testwerte eingetragen.</p>}
            {abdeckung && (
              <>
                <p>
                  <b>Klassen:</b> {abdeckung.abgedeckt.length} von {alleKlassen.length} abgedeckt.
                  {abdeckung.fehlendeKlassen.length > 0 && ` Es fehlt ein Wert aus: ${abdeckung.fehlendeKlassen.map((klasse) => klasseText(klasse)).join("; ")}.`}
                </p>
                <p>
                  <b>Grenzwerte:</b> {grenzen(spec).length - abdeckung.fehlendeGrenzen.length} von {grenzen(spec).length} Grenzen beidseitig abgedeckt.
                  {abdeckung.fehlendeGrenzen.length > 0 &&
                    ` Es fehlen ${abdeckung.fehlendeGrenzen
                      .map((eintrag) => `${eintrag.fehlend.join(" und ")} (Grenze zwischen „${klasseText(eintrag.grenze.unten)}“ und „${klasseText(eintrag.grenze.oben)}“)`)
                      .join("; ")}.`}
                  {!grenzenGefordert && abdeckung.fehlendeGrenzen.length > 0 && " Auf dieser Stufe zählen sie noch nicht, sie gehören aber zu einer guten Testfallermittlung."}
                </p>
              </>
            )}
            {richtig === felder.length ? (
              <div className="alert alert-success" role="status">
                <SuccessIcon />
                <div>
                  Alles richtig — {felder.length} von {felder.length}.
                </div>
              </div>
            ) : (
              <div className="alert alert-info" role="status">
                <InfoIcon />
                <div>
                  {richtig} von {felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert.
                </div>
              </div>
            )}
          </div>
        )}

        {geloest && (
          <div className="stack">
            <h3 className="tile-group-title">Musterlösung</h3>
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption className="field-hint">Äquivalenzklassen mit den Grenzwerten beidseitig</caption>
                <thead>
                  <tr>
                    <th scope="col">Klasse</th>
                    <th scope="col">Bereich</th>
                    <th scope="col">Ergebnis</th>
                    <th scope="col">Grenzwerte</th>
                  </tr>
                </thead>
                <tbody>
                  {alleKlassen.map((klasse) => {
                    const randwerte = [klasse.von, klasse.bis].filter((wert): wert is number => wert !== null);
                    return (
                      <tr key={klasse.nr}>
                        <td>{klasse.nr}</td>
                        <th scope="row">{klasseText(klasse).replace(/ \(.*\)$/, "")}</th>
                        <td>{klasse.gueltig ? klasse.ergebnis : "Fehlermeldung (ungültig)"}</td>
                        <td>{randwerte.length > 0 ? randwerte.join(" und ") : "–"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="field-hint">
              Muster-Testwerte: {musterTestwerte(spec).join("; ")}. Die beiden äußeren Werte sind Repräsentanten der offenen Randklassen. Jede Grenze zwischen zwei Klassen ergibt zwei Testwerte: den letzten Wert der unteren und den ersten Wert der oberen Klasse.
            </p>
          </div>
        )}

        <div className="rate-row">
          <button type="button" className="btn btn-primary" disabled={geloest} onClick={() => setGeprueft(true)}>
            Prüfen
          </button>
          <button type="button" className="btn btn-secondary" disabled={geloest} onClick={zeigeLoesung}>
            Lösung anzeigen
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => neu(stufe)}>
            Neue Aufgabe
          </button>
        </div>
        <AufgabenNummer nummer={nummer} onLaden={(geladen) => neu(stufe, geladen)} />
      </div>
    </div>
  );
}
