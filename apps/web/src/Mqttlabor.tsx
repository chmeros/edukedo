import {
  abbruch,
  abonnieren,
  AUFTRAEGE,
  entferneAbo,
  findeAuftrag,
  leereEingabe,
  neuerBroker,
  simuliereAuftrag,
  trennen,
  veroeffentlichen,
  verbinden,
  type Abo,
  type Auftrag,
  type AuftragEingabe,
  type Broker,
  type Ereignis,
  type LogEintrag,
  type Qos,
  type Will,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-206 (MQTT-Labor, siehe Architekturplanung Abschnitt 13): Simulation eines MQTT-Brokers (MQTT 3.1.1) im Browser für
 * den Kurs „Fachinformatiker Digitale Vernetzung“. Kein Netzwerkverkehr, kein TLS, keine Anmeldung. Zwei Reiter:
 * Aufträge (feste Abläufe, in denen Abonnements, Retain-Flag oder Last Will einzustellen sind, mit automatischer
 * Prüfung) und Freies Labor (drei Clients, Abonnieren, Veröffentlichen, Trennen und Verbindungsabbruch mit Protokoll).
 * Die Logik steht in packages/shared/src/mqttlabor.ts.
 */
type Modus = "auftraege" | "labor";
const MODI: { id: Modus; label: string }[] = [
  { id: "auftraege", label: "Aufträge" },
  { id: "labor", label: "Freies Labor" },
];

const NAMEN: Record<string, string> = { sensor: "Sensor", dashboard: "Dashboard", alarm: "Alarmgeber" };
const name = (kunde: string) => NAMEN[kunde] ?? kunde;
const QOS_WERTE: Qos[] = [0, 1, 2];

function Erklaerung() {
  return (
    <details className="instrument-more">
      <summary>So funktioniert MQTT in diesem Labor</summary>
      <ul>
        <li>Clients reden nicht direkt miteinander. Sie veröffentlichen Nachrichten zu einem <b>Topic</b> (zum Beispiel werk1/halle2/temp) beim <b>Broker</b>, und der Broker verteilt sie an alle, die ein passendes Topic abonniert haben.</li>
        <li>
          Ein Abonnement ist ein <b>Filter</b>. Das Zeichen <b>+</b> steht für genau eine Ebene (werk1/+/temp), das Zeichen <b>#</b> für beliebig viele Ebenen und darf nur am Ende stehen (werk1/halle2/#). Groß- und
          Kleinschreibung zählt.
        </li>
        <li>Die <b>Zustellgüte</b> (QoS 0, 1, 2) ist das Minimum aus der Güte der Veröffentlichung und der Güte des Abonnements.</li>
        <li>Eine <b>Retained Message</b> speichert der Broker je Topic. Neue Abonnenten bekommen sie sofort. Eine leere Nachricht mit Retain-Flag löscht sie.</li>
        <li>Der <b>Last Will</b> wird beim Verbinden hinterlegt. Bricht die Verbindung ohne ordentliches Trennen ab, veröffentlicht der Broker ihn.</li>
      </ul>
      <p className="field-hint">
        Vereinfacht: Jede Verbindung ist eine neue Sitzung, Abonnements gehen beim Trennen verloren. Es gibt keine Wiederholungen und Duplikate bei QoS 1 und 2, keine Verschlüsselung und keine Anmeldung. Hier
        passiert nichts im Netzwerk.
      </p>
    </details>
  );
}

function Protokoll({ eintraege }: { eintraege: LogEintrag[] }) {
  if (eintraege.length === 0) return <p className="field-hint">Noch nichts passiert.</p>;
  return (
    <ol>
      {eintraege.map((eintrag, index) => (
        <li key={index}>
          {eintrag.text}
          {eintrag.fehler && (
            <>
              {" "}
              <b>Abgelehnt:</b> {eintrag.fehler}
            </>
          )}
          {eintrag.zustellungen.length > 0 && (
            <ul>
              {eintrag.zustellungen.map((zustellung, nr) => (
                <li key={nr}>
                  → {name(zustellung.an)} bekommt „{zustellung.topic}“: {zustellung.payload === "" ? "(leer)" : `„${zustellung.payload}“`} (QoS {zustellung.qos}
                  {zustellung.retained ? ", gespeichert" : ""}
                  {zustellung.art === "will" ? ", Last Will" : ""})
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function ereignisText(ereignis: Ereignis): string {
  switch (ereignis.typ) {
    case "verbinden":
      return ereignis.will === "lernend" ? `${name(ereignis.kunde)} verbindet sich mit dem Last Will, den du einstellst.` : ereignis.will ? `${name(ereignis.kunde)} verbindet sich mit Last Will auf „${ereignis.will.topic}“ („${ereignis.will.payload}“).` : `${name(ereignis.kunde)} verbindet sich.`;
    case "abonnieren":
      return ereignis.filter !== undefined ? `${name(ereignis.kunde)} abonniert „${ereignis.filter}“ mit QoS ${ereignis.qos ?? 0}.` : `${name(ereignis.kunde)} abonniert, was du einstellst.`;
    case "veroeffentlichen":
      return `${name(ereignis.von)} veröffentlicht „${ereignis.topic}“: „${ereignis.payload}“ (QoS ${ereignis.qos}${ereignis.retain === "lernend" ? ", Retain-Flag nach deiner Wahl" : ereignis.retain ? ", Retain" : ""}).`;
    case "abbruch":
      return `Die Verbindung von ${name(ereignis.kunde)} bricht ab, ohne dass er sich ordentlich trennt.`;
    case "trennen":
      return `${name(ereignis.kunde)} trennt sich ordentlich vom Broker.`;
  }
}

function nachrichtText(auftrag: Auftrag, id: string): string {
  for (const ereignis of auftrag.ablauf) {
    if (ereignis.typ === "veroeffentlichen" && ereignis.id === id) return `„${ereignis.topic}“: „${ereignis.payload}“`;
    if (ereignis.typ === "abbruch" && ereignis.id === id) return `die Last-Will-Meldung von ${name(ereignis.kunde)}`;
  }
  return id;
}

function Auftraege() {
  const [auftragId, setAuftragId] = useState(AUFTRAEGE[0]!.id);
  const [eingabe, setEingabe] = useState<AuftragEingabe>(() => ({ ...leereEingabe(), abos: [{ filter: "", qos: 0 }] }));
  const [gestartet, setGestartet] = useState(false);
  const [loesungSichtbar, setLoesungSichtbar] = useState(false);
  const auftrag = findeAuftrag(auftragId);
  const abos = auftrag.eingabe.abos;

  function wechsle(id: string) {
    setAuftragId(id);
    setEingabe({ ...leereEingabe(), abos: findeAuftrag(id).eingabe.abos ? [{ filter: "", qos: 0 }] : [] });
    setGestartet(false);
    setLoesungSichtbar(false);
  }

  function aendere(teil: Partial<AuftragEingabe>) {
    setEingabe((aktuell) => ({ ...aktuell, ...teil }));
    setGestartet(false);
  }

  function setzeAbo(index: number, teil: Partial<Abo>) {
    aendere({ abos: eingabe.abos.map((abo, position) => (position === index ? { ...abo, ...teil } : abo)) });
  }

  // Leere Filterzeilen zählen nicht als Abonnement.
  const bereinigt: AuftragEingabe = { ...eingabe, abos: eingabe.abos.filter((abo) => abo.filter.trim() !== "").map((abo) => ({ ...abo, filter: abo.filter.trim() })) };
  const ergebnis = gestartet ? simuliereAuftrag(auftrag, bereinigt) : null;
  const frage = auftrag.eingabe.frage;

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="mq-auftrag">Auftrag</label>
        <select id="mq-auftrag" className="input" style={{ maxWidth: "36rem" }} value={auftragId} onChange={(event) => wechsle(event.target.value)}>
          {AUFTRAEGE.map((eintrag, index) => (
            <option key={eintrag.id} value={eintrag.id}>
              {index + 1}. {eintrag.titel}
            </option>
          ))}
        </select>
      </div>
      <Erklaerung />
      <p>
        <b>Aufgabe:</b> {auftrag.auftrag}
      </p>
      <h3 className="tile-group-title">Ablauf</h3>
      <ol>
        {auftrag.ablauf.map((ereignis, index) => (
          <li key={index}>{ereignisText(ereignis)}</li>
        ))}
      </ol>

      <h3 className="tile-group-title">Deine Einstellungen</h3>
      {abos && (
        <div className="stack">
          <p className="field-hint">
            Abonnements von {name(abos.kunde)} (höchstens {abos.maxAbos}). Leere Zeilen zählen nicht.
          </p>
          {eingabe.abos.map((abo, index) => (
            <div key={index} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
              <label htmlFor={`mq-filter-${index}`} className="field-hint">
                Filter {index + 1}
              </label>
              <input id={`mq-filter-${index}`} className="input" style={{ width: "20rem", maxWidth: "100%" }} autoComplete="off" spellCheck={false} value={abo.filter} onChange={(event) => setzeAbo(index, { filter: event.target.value })} />
              {abos.qosWaehlbar && (
                <select aria-label={`QoS von Filter ${index + 1}`} className="input" style={{ maxWidth: "7rem" }} value={abo.qos} onChange={(event) => setzeAbo(index, { qos: Number(event.target.value) as Qos })}>
                  {QOS_WERTE.map((wert) => (
                    <option key={wert} value={wert}>
                      QoS {wert}
                    </option>
                  ))}
                </select>
              )}
              {eingabe.abos.length > 1 && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => aendere({ abos: eingabe.abos.filter((_, position) => position !== index) })}>
                  Entfernen
                </button>
              )}
            </div>
          ))}
          {eingabe.abos.length < abos.maxAbos && (
            <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => aendere({ abos: [...eingabe.abos, { filter: "", qos: 0 }] })}>
              Weiteres Abonnement
            </button>
          )}
        </div>
      )}
      {auftrag.eingabe.retain?.map((id) => (
        <label key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" checked={eingabe.retain[id] === true} onChange={(event) => aendere({ retain: { ...eingabe.retain, [id]: event.target.checked } })} />
          Retain-Flag bei der Nachricht {nachrichtText(auftrag, id)}
        </label>
      ))}
      {auftrag.eingabe.will && (
        <div className="stack">
          <div className="field">
            <label htmlFor="mq-will-topic">Last Will von {name(auftrag.eingabe.will)}: Topic</label>
            <input id="mq-will-topic" className="input" style={{ width: "20rem", maxWidth: "100%" }} autoComplete="off" spellCheck={false} value={eingabe.willTopic} onChange={(event) => aendere({ willTopic: event.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="mq-will-text">Last Will von {name(auftrag.eingabe.will)}: Text</label>
            <input id="mq-will-text" className="input" style={{ width: "20rem", maxWidth: "100%" }} autoComplete="off" value={eingabe.willPayload} onChange={(event) => aendere({ willPayload: event.target.value })} />
          </div>
        </div>
      )}
      {frage && (
        <fieldset className="field" style={{ border: "none", padding: 0 }}>
          <legend>{frage.text}</legend>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {frage.optionen.map((option) => (
              <label key={option} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <input type="radio" name="mq-frage" checked={eingabe.antwort === option} onChange={() => aendere({ antwort: option })} />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="rate-row">
        <button type="button" className="btn btn-primary" onClick={() => setGestartet(true)}>
          Simulation starten
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setLoesungSichtbar(true)}>
          Lösung anzeigen
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => wechsle(auftragId)}>
          Zurücksetzen
        </button>
      </div>

      {ergebnis && (
        <div className="stack" aria-live="polite">
          {ergebnis.ok ? (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Auftrag erfüllt.</div>
            </div>
          ) : (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                {ergebnis.leer && "Du hast noch nichts eingestellt. "}
                {frage && !ergebnis.leer && "Das ist nicht die richtige Antwort. "}
                {ergebnis.fehler.length > 0 && `Eine Aktion wurde abgelehnt: ${[...new Set(ergebnis.fehler)][0]} `}
                {ergebnis.fehlend.length > 0 && `Es fehlt: ${ergebnis.fehlend.map((id) => nachrichtText(auftrag, id)).join("; ")}. `}
                {ergebnis.zuviel.length > 0 && `Zu viel angekommen: ${ergebnis.zuviel.map((id) => nachrichtText(auftrag, id)).join("; ")}. `}
              </div>
            </div>
          )}
          <h3 className="tile-group-title">Protokoll der Simulation</h3>
          <Protokoll eintraege={ergebnis.broker.log} />
          <p className="field-hint">{auftrag.erklaerung}</p>
        </div>
      )}
      {loesungSichtbar && (
        <p>
          <b>Lösung:</b> {auftrag.loesung}
        </p>
      )}
    </div>
  );
}

const LABOR_KUNDEN = ["sensor", "dashboard", "alarm"];

function Labor() {
  const [broker, setBroker] = useState<Broker>(() => neuerBroker(LABOR_KUNDEN));
  const [willTopic, setWillTopic] = useState<Record<string, string>>({});
  const [willText, setWillText] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [filterQos, setFilterQos] = useState<Record<string, Qos>>({});
  const [von, setVon] = useState("sensor");
  const [topic, setTopic] = useState("werk1/halle2/temp");
  const [payload, setPayload] = useState("24,1");
  const [qos, setQos] = useState<Qos>(0);
  const [retain, setRetain] = useState(false);

  function verbinde(kunde: string) {
    const thema = (willTopic[kunde] ?? "").trim();
    const will: Will | null = thema === "" ? null : { topic: thema, payload: willText[kunde] ?? "", qos: 1, retain: false };
    setBroker((aktuell) => verbinden(aktuell, kunde, will));
  }

  const retainedListe = Object.values(broker.retained);

  return (
    <div className="stack">
      <Erklaerung />
      <p className="field-hint">
        Drei Clients stehen bereit: Sensor, Dashboard und Alarmgeber. Verbinde sie, lege Abonnements an, veröffentliche Nachrichten und beobachte im Protokoll, wer was bekommt. Mit „Verbindung abbrechen“ simulierst du
        einen Ausfall ohne ordentliches Trennen.
      </p>
      <div className="rate-row">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBroker(neuerBroker(LABOR_KUNDEN))}>
          Alles zurücksetzen
        </button>
      </div>

      {LABOR_KUNDEN.map((kunde) => {
        const verbindung = broker.kunden[kunde]!;
        return (
          <div className="stack" key={kunde} style={{ borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
            <h3 className="tile-group-title">
              {name(kunde)}: {verbindung.online ? "verbunden" : "nicht verbunden"}
            </h3>
            {!verbindung.online ? (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                <label htmlFor={`lab-wt-${kunde}`} className="field-hint">
                  Last Will (optional): Topic
                </label>
                <input id={`lab-wt-${kunde}`} className="input" style={{ width: "14rem", maxWidth: "100%" }} autoComplete="off" spellCheck={false} value={willTopic[kunde] ?? ""} onChange={(event) => setWillTopic((a) => ({ ...a, [kunde]: event.target.value }))} />
                <label htmlFor={`lab-wx-${kunde}`} className="field-hint">
                  Text
                </label>
                <input id={`lab-wx-${kunde}`} className="input" style={{ width: "8rem" }} autoComplete="off" value={willText[kunde] ?? ""} onChange={(event) => setWillText((a) => ({ ...a, [kunde]: event.target.value }))} />
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => verbinde(kunde)}>
                  Verbinden
                </button>
              </div>
            ) : (
              <>
                <div className="rate-row">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBroker((a) => trennen(a, kunde))}>
                    Ordentlich trennen
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBroker((a) => abbruch(a, kunde))}>
                    Verbindung abbrechen
                  </button>
                </div>
                {verbindung.will && (
                  <p className="field-hint">
                    Last Will: „{verbindung.will.topic}“: „{verbindung.will.payload}“
                  </p>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                  <label htmlFor={`lab-f-${kunde}`} className="field-hint">
                    Abonnieren: Filter
                  </label>
                  <input id={`lab-f-${kunde}`} className="input" style={{ width: "16rem", maxWidth: "100%" }} autoComplete="off" spellCheck={false} value={filter[kunde] ?? ""} onChange={(event) => setFilter((a) => ({ ...a, [kunde]: event.target.value }))} />
                  <select aria-label={`QoS des Abonnements von ${name(kunde)}`} className="input" style={{ maxWidth: "7rem" }} value={filterQos[kunde] ?? 0} onChange={(event) => setFilterQos((a) => ({ ...a, [kunde]: Number(event.target.value) as Qos }))}>
                    {QOS_WERTE.map((wert) => (
                      <option key={wert} value={wert}>
                        QoS {wert}
                      </option>
                    ))}
                  </select>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setBroker((a) => abonnieren(a, kunde, (filter[kunde] ?? "").trim(), filterQos[kunde] ?? 0))}>
                    Abonnieren
                  </button>
                </div>
                {verbindung.abos.length > 0 ? (
                  <ul>
                    {verbindung.abos.map((abo) => (
                      <li key={abo.filter}>
                        {abo.filter} (QoS {abo.qos}){" "}
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBroker((a) => entferneAbo(a, kunde, abo.filter))} aria-label={`Abonnement ${abo.filter} von ${name(kunde)} beenden`}>
                          Beenden
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="field-hint">Keine Abonnements.</p>
                )}
              </>
            )}
          </div>
        );
      })}

      <h3 className="tile-group-title">Nachricht veröffentlichen</h3>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
        <label htmlFor="lab-von" className="field-hint">
          Von
        </label>
        <select id="lab-von" className="input" style={{ maxWidth: "10rem" }} value={von} onChange={(event) => setVon(event.target.value)}>
          {LABOR_KUNDEN.map((kunde) => (
            <option key={kunde} value={kunde}>
              {name(kunde)}
            </option>
          ))}
        </select>
        <label htmlFor="lab-topic" className="field-hint">
          Topic
        </label>
        <input id="lab-topic" className="input" style={{ width: "16rem", maxWidth: "100%" }} autoComplete="off" spellCheck={false} value={topic} onChange={(event) => setTopic(event.target.value)} />
        <label htmlFor="lab-payload" className="field-hint">
          Text
        </label>
        <input id="lab-payload" className="input" style={{ width: "8rem" }} autoComplete="off" value={payload} onChange={(event) => setPayload(event.target.value)} />
        <select aria-label="QoS der Veröffentlichung" className="input" style={{ maxWidth: "7rem" }} value={qos} onChange={(event) => setQos(Number(event.target.value) as Qos)}>
          {QOS_WERTE.map((wert) => (
            <option key={wert} value={wert}>
              QoS {wert}
            </option>
          ))}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input type="checkbox" checked={retain} onChange={(event) => setRetain(event.target.checked)} />
          Retain
        </label>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setBroker((a) => veroeffentlichen(a, von, topic.trim(), payload, qos, retain))}>
          Veröffentlichen
        </button>
      </div>

      <h3 className="tile-group-title">Gespeicherte Nachrichten (Retained)</h3>
      {retainedListe.length === 0 ? (
        <p className="field-hint">Keine.</p>
      ) : (
        <ul>
          {retainedListe.map((eintrag) => (
            <li key={eintrag.topic}>
              {eintrag.topic}: „{eintrag.payload}“ (QoS {eintrag.qos})
            </li>
          ))}
        </ul>
      )}

      <h3 className="tile-group-title">Protokoll</h3>
      <div aria-live="polite">
        <Protokoll eintraege={broker.log} />
      </div>
    </div>
  );
}

export function Mqttlabor({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("auftraege");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>MQTT-Labor</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Simulation eines MQTT-Brokers im Browser (nach MQTT 3.1.1, vereinfacht). Es fließt kein Netzwerkverkehr, nichts wird gespeichert, und es gibt keine Verschlüsselung und keine Anmeldung.
        </p>
        <div className="segmented" role="tablist" aria-label="MQTT-Labor">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-mq-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-mq-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-mq-${modus}`} aria-labelledby={`tab-mq-${modus}`}>
          {modus === "labor" ? <Labor /> : <Auftraege />}
        </div>
      </div>
    </div>
  );
}
