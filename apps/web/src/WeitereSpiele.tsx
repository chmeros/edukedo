import { useState, type ReactNode } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-158 (weitere Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
 * Architekturplanung Abschnitt 13): Phishing-Detektiv, Bug-Hunt, Code-Reihenfolge, Troubleshooting-
 * Detektiv sowie der Subnetting-/Zahlensystem-Sprint. Alle Spiele laufen nach demselben Muster wie
 * die ersten drei (KennzahlenDuell.tsx): Aufgaben nacheinander, Antwort wird serverseitig geprüft
 * (`get*` liefert nie die Lösung), Fortschritt und Gamification serverseitig.
 */

interface SpielProps {
  kursId: string;
  setKey?: string;
  title: string;
  onClose: () => void;
}

function SpielRahmen({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>{title}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Zurück zu den Spielen
        </button>
      </div>
      {children}
    </div>
  );
}

/**
 * Gemeinsame Aufgabenfolge: startet bei der ersten ungelösten Aufgabe (einmalig beim ersten Laden — nicht
 * mitlaufend, sonst würde die Ansicht nach einer richtigen Antwort sofort zur nächsten Aufgabe springen,
 * bevor die Rückmeldung gelesen werden kann), „Weiter" setzt den Zeiger fort.
 */
function useAufgabenZeiger(items: { geloest: boolean }[] | undefined) {
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [override, setOverride] = useState<number | null>(null);
  if (items && startIndex === null) {
    const firstOpen = items.findIndex((item) => !item.geloest);
    setStartIndex(firstOpen === -1 ? items.length : firstOpen);
  }
  const index = override ?? startIndex ?? 0;
  return { index, weiter: () => setOverride(index + 1) };
}

function Fortschrittszeile({ index, total, titel }: { index: number; total: number; titel: string }) {
  return (
    <span className="quiz-progress">
      Aufgabe {index + 1} von {total} · {titel}
    </span>
  );
}

function Abschluss({ meldung, onClose }: { meldung: string; onClose: () => void }) {
  return (
    <div className="stack">
      <div className="alert alert-success">
        <div>{meldung}</div>
      </div>
      <button type="button" className="btn btn-secondary" style={{ alignSelf: "flex-start" }} onClick={onClose}>
        Zurück zu den Spielen
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phishing-Detektiv
// ---------------------------------------------------------------------------

const ORT_LABEL: Record<string, string> = {
  absender: "Absender",
  betreff: "Betreff",
  text: "Text",
  link: "Link",
  anhang: "Anhang",
};

export function PhishingDetektiv({ kursId, setKey, title, onClose }: SpielProps) {
  const utils = trpc.useUtils();
  const data = trpc.game.getPhishing.useQuery({ kursId, setKey });
  const zeiger = useAufgabenZeiger(data.data?.mails);
  const [markiert, setMarkiert] = useState<Set<string>>(new Set());
  const [urteil, setUrteil] = useState<"phishing" | "echt" | null>(null);

  const submit = trpc.game.submitPhishing.useMutation({
    onSuccess: (result) => {
      if (result.correct) {
        utils.game.getPhishing.invalidate({ kursId, setKey });
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const mails = data.data.mails;
  const mail = mails[zeiger.index];
  if (!mail) return <SpielRahmen title={title} onClose={onClose}><Abschluss meldung={data.data.abschlussmeldung} onClose={onClose} /></SpielRahmen>;
  const ergebnis = submit.data && submit.variables?.nummer === mail.nummer ? submit.data : null;

  function toggle(id: string) {
    if (ergebnis) return;
    setMarkiert((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    submit.reset();
    setMarkiert(new Set());
    setUrteil(null);
  }

  function naechste() {
    reset();
    zeiger.weiter();
  }

  return (
    <SpielRahmen title={title} onClose={onClose}>
      <div className="stack">
        <Fortschrittszeile index={zeiger.index} total={mails.length} titel="E-Mail prüfen" />
        <p className="field-hint">
          Tippe auf alle Elemente, die dir verdächtig vorkommen, und entscheide dann, ob die Mail echt oder Phishing ist.
        </p>
        <div className="phishing-mail">
          {mail.elemente.map((element) => {
            const erklaerung = ergebnis?.elemente.find((entry) => entry.id === element.id);
            let className = "phishing-element";
            if (erklaerung) {
              if (erklaerung.verdaechtig && erklaerung.markiert) className += " is-correct";
              else if (erklaerung.verdaechtig) className += " is-missed";
              else if (erklaerung.markiert) className += " is-wrong-mark";
            } else if (markiert.has(element.id)) {
              className += " is-marked";
            }
            return (
              <button
                key={element.id}
                type="button"
                className={className}
                aria-pressed={markiert.has(element.id)}
                onClick={() => toggle(element.id)}
              >
                <span className="phishing-label">{ORT_LABEL[element.ort] ?? element.ort}</span>
                {element.text}
                {erklaerung && (
                  <span className="phishing-explain">
                    {erklaerung.verdaechtig ? (erklaerung.markiert ? "✔ Erkannt. " : "✘ Übersehen. ") : erklaerung.markiert ? "✘ Fälschlich markiert. " : ""}
                    {erklaerung.erklaerung}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!ergebnis ? (
          <div className="stack">
            <div className="list-row-actions" role="group" aria-label="Dein Urteil">
              <button
                type="button"
                className={urteil === "echt" ? "btn btn-primary" : "btn btn-secondary"}
                aria-pressed={urteil === "echt"}
                onClick={() => setUrteil("echt")}
              >
                Echte Mail
              </button>
              <button
                type="button"
                className={urteil === "phishing" ? "btn btn-primary" : "btn btn-secondary"}
                aria-pressed={urteil === "phishing"}
                onClick={() => setUrteil("phishing")}
              >
                Phishing
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start" }}
              disabled={!urteil || submit.isPending}
              onClick={() => urteil && submit.mutate({ kursId, setKey, nummer: mail.nummer, markiert: [...markiert], urteil })}
            >
              Prüfen
            </button>
            {submit.error && <ErrorMessage>{submit.error.message}</ErrorMessage>}
          </div>
        ) : (
          <div className="stack">
            <p role="status" className={ergebnis.correct ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
              {ergebnis.correct
                ? "Richtig erkannt!"
                : ergebnis.urteilRichtig
                  ? "Dein Urteil stimmt, aber bei den markierten Elementen war nicht alles richtig."
                  : ergebnis.istPhishing
                    ? "Das war Phishing."
                    : "Das war eine echte Mail."}{" "}
              {ergebnis.aufloesung}
            </p>
            <div className="list-row-actions">
              {!ergebnis.correct && (
                <button type="button" className="btn btn-secondary" onClick={reset}>
                  Nochmal versuchen
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={naechste}>
                {zeiger.index + 1 < mails.length ? "Nächste Mail" : "Fertig"}
              </button>
            </div>
          </div>
        )}
      </div>
    </SpielRahmen>
  );
}

// ---------------------------------------------------------------------------
// Bug-Hunt
// ---------------------------------------------------------------------------

export function BugHunt({ kursId, setKey, title, onClose }: SpielProps) {
  const utils = trpc.useUtils();
  const data = trpc.game.getBugHunt.useQuery({ kursId, setKey });
  const zeiger = useAufgabenZeiger(data.data?.aufgaben);
  const [zeile, setZeile] = useState<number | null>(null);

  const submit = trpc.game.submitBugHunt.useMutation({
    onSuccess: (result) => {
      if (result.correct) {
        utils.game.getBugHunt.invalidate({ kursId, setKey });
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const aufgaben = data.data.aufgaben;
  const aufgabe = aufgaben[zeiger.index];
  if (!aufgabe) return <SpielRahmen title={title} onClose={onClose}><Abschluss meldung={data.data.abschlussmeldung} onClose={onClose} /></SpielRahmen>;
  const ergebnis = submit.data && submit.variables?.nummer === aufgabe.nummer ? submit.data : null;
  const geloest = ergebnis?.correct === true;

  function naechste() {
    submit.reset();
    setZeile(null);
    zeiger.weiter();
  }

  return (
    <SpielRahmen title={title} onClose={onClose}>
      <div className="stack">
        <Fortschrittszeile index={zeiger.index} total={aufgaben.length} titel={`${aufgabe.titel} (${aufgabe.sprache})`} />
        <p>{aufgabe.aufgabe}</p>
        <p className="field-hint">In genau einer Zeile steckt der Fehler. Tippe sie an.</p>
        <pre className="code-block" aria-label={`Code, ${aufgabe.zeilen.length} Zeilen`}>
          {aufgabe.zeilen.map((text, index) => {
            const nummer = index + 1;
            let className = "code-line";
            if (geloest && ergebnis && "fehlerZeile" in ergebnis && ergebnis.fehlerZeile === nummer) className += " is-correct";
            else if (zeile === nummer) className += ergebnis && !ergebnis.correct ? " is-wrong" : " is-selected";
            return (
              <button
                key={nummer}
                type="button"
                className={className}
                aria-pressed={zeile === nummer}
                disabled={geloest}
                onClick={() => {
                  submit.reset();
                  setZeile(nummer);
                }}
              >
                <span className="code-no">{nummer}</span>
                <span>{text === "" ? " " : text}</span>
              </button>
            );
          })}
        </pre>

        {ergebnis && ergebnis.correct ? (
          <div className="stack">
            <p role="status" className="quiz-feedback is-correct">
              Gefunden! Richtig wäre: <code>{ergebnis.korrektur.trim()}</code> — {ergebnis.erklaerung}
            </p>
            <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={naechste}>
              {zeiger.index + 1 < aufgaben.length ? "Nächste Aufgabe" : "Fertig"}
            </button>
          </div>
        ) : (
          <div className="stack">
            {ergebnis && !ergebnis.correct && (
              <p role="status" className="quiz-feedback is-wrong">
                Das ist es nicht. {ergebnis.tipp}
              </p>
            )}
            <button
              type="button"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start" }}
              disabled={zeile === null || submit.isPending}
              onClick={() => zeile !== null && submit.mutate({ kursId, setKey, nummer: aufgabe.nummer, zeile })}
            >
              Prüfen
            </button>
            {submit.error && <ErrorMessage>{submit.error.message}</ErrorMessage>}
          </div>
        )}
      </div>
    </SpielRahmen>
  );
}

// ---------------------------------------------------------------------------
// Code-Reihenfolge
// ---------------------------------------------------------------------------

export function CodeReihenfolge({ kursId, setKey, title, onClose }: SpielProps) {
  const utils = trpc.useUtils();
  const data = trpc.game.getCodeReihenfolge.useQuery({ kursId, setKey });
  const zeiger = useAufgabenZeiger(data.data?.aufgaben);
  const [anordnung, setAnordnung] = useState<{ nummer: number; ids: string[] } | null>(null);

  const submit = trpc.game.submitCodeReihenfolge.useMutation({
    onSuccess: (result) => {
      if (result.correct) {
        utils.game.getCodeReihenfolge.invalidate({ kursId, setKey });
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const aufgaben = data.data.aufgaben;
  const aufgabe = aufgaben[zeiger.index];
  if (!aufgabe) return <SpielRahmen title={title} onClose={onClose}><Abschluss meldung={data.data.abschlussmeldung} onClose={onClose} /></SpielRahmen>;

  // Die Startanordnung (gemischt) kommt vom Server; lokal wird nur umsortiert.
  const ids = anordnung && anordnung.nummer === aufgabe.nummer ? anordnung.ids : aufgabe.zeilen.map((zeile) => zeile.id);
  const textById = new Map(aufgabe.zeilen.map((zeile) => [zeile.id, zeile.text]));
  const ergebnis = submit.data && submit.variables?.nummer === aufgabe.nummer ? submit.data : null;
  const geloest = ergebnis?.correct === true;

  function verschiebe(position: number, richtung: -1 | 1) {
    const ziel = position + richtung;
    if (ziel < 0 || ziel >= ids.length || geloest) return;
    const next = [...ids];
    [next[position], next[ziel]] = [next[ziel]!, next[position]!];
    submit.reset();
    setAnordnung({ nummer: aufgabe!.nummer, ids: next });
  }

  function naechste() {
    submit.reset();
    setAnordnung(null);
    zeiger.weiter();
  }

  return (
    <SpielRahmen title={title} onClose={onClose}>
      <div className="stack">
        <Fortschrittszeile index={zeiger.index} total={aufgaben.length} titel={`${aufgabe.titel} (${aufgabe.sprache})`} />
        <p>{aufgabe.aufgabe}</p>
        <p className="field-hint">Bringe die Zeilen mit den Pfeilen in die richtige Reihenfolge.</p>
        <div className="stack" role="list">
          {ids.map((id, position) => {
            let rowClass = "code-order-row";
            if (ergebnis && !ergebnis.correct) rowClass += ergebnis.positionen[position] ? " is-correct" : " is-wrong";
            if (geloest) rowClass += " is-correct";
            return (
              <div key={`${id}-${position}`} className={rowClass} role="listitem">
                <pre className="code-block">{textById.get(id)}</pre>
                {!geloest && (
                  <span className="list-row-actions">
                    <button type="button" className="btn btn-ghost btn-sm" aria-label={`Zeile ${position + 1} nach oben`} disabled={position === 0} onClick={() => verschiebe(position, -1)}>
                      ↑
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" aria-label={`Zeile ${position + 1} nach unten`} disabled={position === ids.length - 1} onClick={() => verschiebe(position, 1)}>
                      ↓
                    </button>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {geloest && ergebnis ? (
          <div className="stack">
            <p role="status" className="quiz-feedback is-correct">
              Richtig! {ergebnis.erklaerung}
            </p>
            <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={naechste}>
              {zeiger.index + 1 < aufgaben.length ? "Nächste Aufgabe" : "Fertig"}
            </button>
          </div>
        ) : (
          <div className="stack">
            {ergebnis && !ergebnis.correct && (
              <p role="status" className="quiz-feedback is-wrong">
                Noch nicht ganz — grün markierte Zeilen stehen schon an der richtigen Stelle.
              </p>
            )}
            <button
              type="button"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start" }}
              disabled={submit.isPending}
              onClick={() => submit.mutate({ kursId, setKey, nummer: aufgabe.nummer, reihenfolge: ids })}
            >
              Prüfen
            </button>
            {submit.error && <ErrorMessage>{submit.error.message}</ErrorMessage>}
          </div>
        )}
      </div>
    </SpielRahmen>
  );
}

// ---------------------------------------------------------------------------
// Netzwerk-Troubleshooting-Detektiv
// ---------------------------------------------------------------------------

export function TroubleshootingDetektiv({ kursId, setKey, title, onClose }: SpielProps) {
  const utils = trpc.useUtils();
  const data = trpc.game.getTroubleshooting.useQuery({ kursId, setKey });
  const zeiger = useAufgabenZeiger(data.data?.faelle);
  const [fall, setFall] = useState<{ nummer: number; schichtGeloest: boolean; schichtFalsch: string | null; ursacheFalsch: string | null }>({
    nummer: 0,
    schichtGeloest: false,
    schichtFalsch: null,
    ursacheFalsch: null,
  });
  const [erklaerung, setErklaerung] = useState<string | null>(null);

  const submit = trpc.game.submitTroubleshooting.useMutation({
    onSuccess: (result, variables) => {
      // Zustand gehört immer zum Fall der Antwort (bei einem Fallwechsel beginnt er leer).
      const aktualisiere = (patch: Partial<typeof fall>) =>
        setFall((current) => ({
          ...(current.nummer === variables.nummer ? current : { nummer: variables.nummer, schichtGeloest: false, schichtFalsch: null, ursacheFalsch: null }),
          ...patch,
        }));
      if (variables.schritt === 1) {
        aktualisiere({ schichtGeloest: result.correct, schichtFalsch: result.correct ? null : variables.antwort });
      } else if (result.correct) {
        setErklaerung(result.erklaerung);
        utils.game.getTroubleshooting.invalidate({ kursId, setKey });
      } else {
        aktualisiere({ ursacheFalsch: variables.antwort });
      }
    },
  });

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;
  const faelle = data.data.faelle;
  const aktuell = faelle[zeiger.index];
  if (!aktuell) return <SpielRahmen title={title} onClose={onClose}><Abschluss meldung={data.data.abschlussmeldung} onClose={onClose} /></SpielRahmen>;
  const zustand = fall.nummer === aktuell.nummer ? fall : { nummer: aktuell.nummer, schichtGeloest: false, schichtFalsch: null, ursacheFalsch: null };
  const gesamtGeloest = erklaerung !== null;

  function naechster() {
    setErklaerung(null);
    setFall({ nummer: 0, schichtGeloest: false, schichtFalsch: null, ursacheFalsch: null });
    zeiger.weiter();
  }

  function optionen(
    liste: { id: string; text: string }[],
    schritt: 1 | 2,
    falsch: string | null,
    aktiv: boolean,
  ) {
    return (
      <div className="stack">
        {liste.map((option) => (
          <button
            key={option.id}
            type="button"
            className={falsch === option.id ? "quiz-opt is-wrong" : "quiz-opt"}
            disabled={!aktiv || submit.isPending}
            onClick={() => submit.mutate({ kursId, setKey, nummer: aktuell!.nummer, schritt, antwort: option.id })}
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  }

  return (
    <SpielRahmen title={title} onClose={onClose}>
      <div className="stack">
        <Fortschrittszeile index={zeiger.index} total={faelle.length} titel={aktuell.titel} />
        <p>{aktuell.szenario}</p>
        <div className="stack">
          <span className="stat-subheading">Beobachtungen</span>
          <ul className="calm-list">
            {aktuell.symptome.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>

        <span className="stat-subheading">1. Auf welcher Schicht liegt die Ursache?</span>
        {optionen(aktuell.schichtOptionen, 1, zustand.schichtFalsch, !zustand.schichtGeloest)}
        {zustand.schichtFalsch && <p role="status" className="quiz-feedback is-wrong">Dazu passen die Beobachtungen nicht. Gehe die Schichten von unten nach oben durch.</p>}

        {zustand.schichtGeloest && (
          <>
            <p role="status" className="quiz-feedback is-correct">Schicht richtig eingegrenzt.</p>
            <span className="stat-subheading">2. Was ist die wahrscheinlichste Ursache?</span>
            {optionen(aktuell.ursachenOptionen, 2, zustand.ursacheFalsch, !gesamtGeloest)}
            {zustand.ursacheFalsch && !gesamtGeloest && (
              <p role="status" className="quiz-feedback is-wrong">Diese Ursache wird durch die Beobachtungen ausgeschlossen. Lies sie noch einmal.</p>
            )}
          </>
        )}

        {gesamtGeloest && (
          <div className="stack">
            <p role="status" className="quiz-feedback is-correct">Richtig! {erklaerung}</p>
            <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={naechster}>
              {zeiger.index + 1 < faelle.length ? "Nächster Fall" : "Fertig"}
            </button>
          </div>
        )}
        {submit.error && <ErrorMessage>{submit.error.message}</ErrorMessage>}
      </div>
    </SpielRahmen>
  );
}

// ---------------------------------------------------------------------------
// Subnetting-/Zahlensystem-Sprint
// ---------------------------------------------------------------------------

const SCHWIERIGKEIT_LABEL = { leicht: "Leicht", mittel: "Mittel", schwer: "Schwer" } as const;

function formatZeit(sekunden: number): string {
  return `${Math.floor(sekunden / 60)}:${String(sekunden % 60).padStart(2, "0")}`;
}

export function SprintSpiel({ kursId, setKey, title, gameType, onClose }: SpielProps & { gameType: "subnetting" | "zahlensysteme" | "rechensprint" }) {
  const utils = trpc.useUtils();
  const info = trpc.game.getSprint.useQuery({ kursId, setKey, gameType });
  const [schwierigkeit, setSchwierigkeit] = useState<"leicht" | "mittel" | "schwer">("leicht");
  const [aufgaben, setAufgaben] = useState<{ token: string; frage: string; hinweis: string }[] | null>(null);
  const [index, setIndex] = useState(0);
  const [richtig, setRichtig] = useState(0);
  const [eingabe, setEingabe] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [dauer, setDauer] = useState<number | null>(null);

  const startSprint = trpc.game.sprintStart.useMutation({
    onSuccess: (result) => {
      setAufgaben(result.aufgaben);
      setIndex(0);
      setRichtig(0);
      setEingabe("");
      setStart(Date.now());
      setDauer(null);
    },
  });
  const antwort = trpc.game.sprintAntwort.useMutation({
    onSuccess: (result) => {
      if (result.correct) setRichtig((current) => current + 1);
    },
  });
  const abschluss = trpc.game.sprintAbschluss.useMutation({
    onSuccess: () => utils.game.getSprint.invalidate({ kursId, setKey, gameType }),
  });

  if (info.isLoading) return <p>Lädt…</p>;
  if (info.error || !info.data) return <ErrorMessage>Das Spiel konnte nicht geladen werden.</ErrorMessage>;

  const fertig = aufgaben !== null && index >= aufgaben.length;
  const aufgabe = aufgaben && !fertig ? aufgaben[index] : null;
  const ergebnis = antwort.data && antwort.variables?.token === aufgabe?.token ? antwort.data : null;

  function weiter() {
    antwort.reset();
    setEingabe("");
    const naechster = index + 1;
    setIndex(naechster);
    if (aufgaben && naechster >= aufgaben.length) {
      const sekunden = start ? Math.round((Date.now() - start) / 1000) : 0;
      setDauer(sekunden);
      abschluss.mutate({ kursId, setKey, gameType, schwierigkeit, richtig, gesamt: aufgaben.length });
    }
  }

  return (
    <SpielRahmen title={title} onClose={onClose}>
      {!aufgaben ? (
        <div className="stack">
          <p>
            {info.data.anzahl} Aufgaben, jede ist neu zufällig erzeugt. {gameType === "rechensprint" ? "Ein einfacher Taschenrechner ist erlaubt." : "Rechne im Kopf oder auf Papier"} — und prüfe jede Antwort sofort.
          </p>
          <div className="field">
            <span id="sprint-schwierigkeit">Schwierigkeit</span>
            <div className="segmented" role="group" aria-labelledby="sprint-schwierigkeit">
              {(["leicht", "mittel", "schwer"] as const).map((stufe) => (
                <button key={stufe} type="button" className={schwierigkeit === stufe ? "is-active" : ""} aria-pressed={schwierigkeit === stufe} onClick={() => setSchwierigkeit(stufe)}>
                  {SCHWIERIGKEIT_LABEL[stufe]}
                  {info.data.bestwerte[stufe] ? ` (Bestwert ${info.data.bestwerte[stufe]!.richtig}/${info.data.bestwerte[stufe]!.gesamt})` : ""}
                </button>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={startSprint.isPending} onClick={() => startSprint.mutate({ kursId, setKey, gameType, schwierigkeit })}>
            Sprint starten
          </button>
          {startSprint.error && <ErrorMessage>{startSprint.error.message}</ErrorMessage>}
        </div>
      ) : fertig ? (
        <div className="stack">
          <div className="alert alert-success">
            <div>
              {richtig} von {aufgaben.length} richtig{dauer !== null ? ` in ${formatZeit(dauer)} Minuten` : ""}. {info.data.abschlussmeldung}
            </div>
          </div>
          <div className="list-row-actions">
            <button type="button" className="btn btn-primary" onClick={() => { setAufgaben(null); setStart(null); }}>
              Noch ein Sprint
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Zurück zu den Spielen
            </button>
          </div>
        </div>
      ) : (
        aufgabe && (
          <div className="stack">
            <span className="quiz-progress">
              Aufgabe {index + 1} von {aufgaben.length} · {richtig} richtig · {SCHWIERIGKEIT_LABEL[schwierigkeit]}
            </span>
            <div className="quiz-question">{aufgabe.frage}</div>
            <form
              className="stack"
              onSubmit={(event) => {
                event.preventDefault();
                if (!ergebnis && eingabe.trim()) antwort.mutate({ kursId, setKey, gameType, token: aufgabe.token, eingabe });
              }}
            >
              <input
                className="input sprint-input"
                value={eingabe}
                onChange={(event) => setEingabe(event.target.value)}
                disabled={!!ergebnis}
                aria-label="Deine Antwort"
                autoComplete="off"
                autoFocus
              />
              <span className="field-hint">{aufgabe.hinweis}</span>
              {!ergebnis && (
                <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={antwort.isPending || !eingabe.trim()}>
                  Prüfen
                </button>
              )}
            </form>
            {antwort.error && <ErrorMessage>{antwort.error.message}</ErrorMessage>}
            {ergebnis && (
              <div className="stack">
                <p role="status" className={ergebnis.correct ? "quiz-feedback is-correct" : "quiz-feedback is-wrong"}>
                  {ergebnis.correct ? "Richtig! " : `Nicht ganz — richtig wäre ${ergebnis.erwartet}. `}
                  {ergebnis.erklaerung}
                </p>
                <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={weiter}>
                  {index + 1 < aufgaben.length ? "Weiter" : "Ergebnis anzeigen"}
                </button>
              </div>
            )}
          </div>
        )
      )}
    </SpielRahmen>
  );
}
