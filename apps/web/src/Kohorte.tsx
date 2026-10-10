import { COHORT_ACTIVE_WINDOW_DAYS } from "@edukedo/shared";
import { useEffect, useState } from "react";
import { ConfirmButton } from "./ConfirmButton";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { pluralDe } from "./plural";
import { Tile } from "./Tile";
import { trpc } from "./trpc";
import { CopyButton } from "./CopyButton";
import { csvText, ladeTextHerunter, sichererDateiname } from "./dateiExport";

/**
 * F-64: aggregierte Kennzahlen + Mitgliederliste (nur E-Mail/Beitrittsdatum, kein
 * Lernfortschritt — siehe trpc/routers/cohort.ts) für die Dozent:in einer Kohorte. Eigene
 * Komponente statt Inline-Erweiterung der Kohorten-Zeile, da beide Abfragen erst bei
 * tatsächlichem Aufklappen geladen werden sollen (keine Dozentin-Kennzahlen unnötig im
 * Hintergrund laden, solange niemand hinschaut).
 */
/** „0“ heißt nach dem Runden: unter der halben Stufe. So steht dort keine Zahl, die wie ein exakter Wert aussieht. */
function zeigeProzent(wert: number | null, stufe: number): string {
  if (wert === null) return "–";
  return wert === 0 ? `unter ${stufe / 2} %` : `${wert} %`;
}

function CohortDetail({ cohortId, cohortName }: { cohortId: string; cohortName: string }) {
  const utils = trpc.useUtils();
  // Review UXL-06: Zeitraum für „aktive Mitglieder“ wählbar (Standard 30 Tage).
  const [tage, setTage] = useState<7 | 30 | 90>(30);
  const stats = trpc.cohort.stats.useQuery({ cohortId, days: tage }, { keepPreviousData: true });
  const members = trpc.cohort.members.useQuery({ cohortId });
  // Review UXL-05: Die Dozent:in kann Mitglieder aus der Kohorte entfernen.
  // Entscheidung 10.10.2026: Die Adresse eines erwachsenen Mitglieds zeigt die Leitung erst auf ausdrücklichen Klick.
  const [kontakte, setKontakte] = useState<Record<string, string>>({});
  const memberContact = trpc.cohort.memberContact.useMutation({
    onSuccess: (ergebnis, eingabe) => setKontakte((vorher) => ({ ...vorher, [eingabe.userId]: ergebnis.email })),
  });
  const removeMember = trpc.cohort.removeMember.useMutation({
    onSuccess: () => {
      utils.cohort.members.invalidate({ cohortId });
      utils.cohort.stats.invalidate({ cohortId });
      utils.cohort.myCohorts.invalidate();
    },
  });

  if (stats.isLoading || !stats.data) {
    return <p>Lädt…</p>;
  }
  const d = stats.data;

  // Review UXL-16: Export der Gruppenkennzahlen als Nachweis (CSV). Enthält nur, was auf dem Bildschirm steht, also nur aggregierte Werte
  // und nur dort, wo genug verschiedene Personen beigetragen haben; keine Einzelpersonen, keine Mitgliederliste.
  function exportiere() {
    const prozent = (wert: number | null) => (wert === null ? "" : wert);
    ladeTextHerunter(
      `kohorte-${sichererDateiname(cohortName)}-${new Date().toISOString().slice(0, 10)}.csv`,
      csvText([
        ["Kohorte", cohortName],
        ["Stand", new Date().toLocaleDateString("de-DE")],
        ["Mitglieder", d.totalMembers],
        ["Hinweis", `Kennzahlen erst ab ${d.minCohortSize} beteiligten Mitgliedern; leere Felder sind aus Datenschutzgründen ausgeblendet.`],
        [],
        ["Kennzahl", "Wert in Prozent"],
        ["Hinweis", `Prozentwerte sind auf ${d.roundingStepPercent} % gerundet (0 bedeutet unter ${d.roundingStepPercent / 2} %), Anzahlen auf Zehner.`],
        [`Aktive Mitglieder (${d.activeWindowDays} Tage)`, prozent(d.activeSharePercent)],
        ["Durchschnittlicher Kursfortschritt (beherrschte Aufgaben an allen Aufgaben des Kurses)", prozent(d.avgCourseProgressPercent)],
        ["Sicher beherrscht unter den bearbeiteten Aufgaben", prozent(d.avgProgressPercent)],
        [],
        ["Handlungsbereich", "Durchschnittliche Trefferquote in Prozent", "Anzahl Antworten"],
        ...d.byFachgebiet.map((eintrag) => [eintrag.fachgebietTitle, prozent(eintrag.avgAccuracyPercent), prozent(eintrag.answers)]),
      ]),
    );
  }

  return (
    <div className="stack">
      {d.totalMembers < d.minCohortSize ? (
        <p className="field-hint">
          Aggregierte Kennzahlen sind erst ab {d.minCohortSize} Mitgliedern verfügbar (aktuell {d.totalMembers}) — bei
          weniger Mitgliedern wäre eine "aggregierte" Kennzahl faktisch eine personenbezogene Einzelauswertung.
        </p>
      ) : (
        <>
          <div className="field" role="group" aria-label="Zeitraum für aktive Mitglieder">
            <span id={`kohorte-zeitraum-${cohortId}`}>Zeitraum für „aktive Mitglieder“</span>
            <div className="segmented" role="group" aria-labelledby={`kohorte-zeitraum-${cohortId}`}>
              {COHORT_ACTIVE_WINDOW_DAYS.map((anzahl) => (
                <button key={anzahl} type="button" className={tage === anzahl ? "is-active" : ""} aria-pressed={tage === anzahl} onClick={() => setTage(anzahl)}>
                  {anzahl} Tage
                </button>
              ))}
            </div>
          </div>
          <div className="stat-row">
            <div className="stat-tile">
              <span className="stat-value">{zeigeProzent(d.activeSharePercent, d.roundingStepPercent)}</span>
              <span className="stat-label">Aktive Mitglieder ({d.activeWindowDays} Tage)</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{zeigeProzent(d.avgCourseProgressPercent, d.roundingStepPercent)}</span>
              <span className="stat-label">Ø Kursfortschritt</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{zeigeProzent(d.avgProgressPercent, d.roundingStepPercent)}</span>
              <span className="stat-label">Sicher beherrscht (bearbeitete Aufgaben)</span>
            </div>
          </div>
          {/* Review UXL-06: Was die Zahlen bedeuten und auf welcher Basis sie stehen. */}
          <ul className="field-hint stat-erklaerung">
            <li>
              <b>Aktive Mitglieder:</b> Anteil der Mitglieder, die im gewählten Zeitraum mindestens eine Aufgabe beantwortet haben.
            </li>
            <li>
              <b>Ø Kursfortschritt:</b> Anteil der Aufgaben des Kurses, die ein Mitglied sicher beherrscht, gemittelt über alle Mitglieder.
              Das ist dieselbe Zahl, die Lernende in ihrem Fortschritt sehen.
            </li>
            <li>
              <b>Sicher beherrscht (bearbeitete Aufgaben):</b> Von den Aufgaben, die Mitglieder schon angefasst haben, der Anteil, der sicher
              sitzt. Die Zahl ist meist deutlich höher als der Kursfortschritt, weil der noch unbearbeitete Rest des Kurses nicht mitzählt.
            </li>
          </ul>
          {/* Entscheidung 10.10.2026 (UXL-01 Rest): Werte in Stufen gerundet, damit sich bei kleinen Gruppen aus dem Vergleich zweier Abrufe
              kein Einzelwert ablesen lässt. */}
          <p className="field-hint">
            Die Prozentwerte sind auf {d.roundingStepPercent} % gerundet („unter {d.roundingStepPercent / 2} %“ heißt: kaum Fortschritt), damit sich
            bei kleinen Gruppen keine Einzelwerte ablesen lassen.
            {d.workedItems !== null && ` Basis: ${d.totalMembers} Mitglieder, die Beteiligten haben zusammen rund ${d.workedItems} Aufgaben bearbeitet.`}
          </p>
          {(d.activeSharePercent === null || d.avgProgressPercent === null || d.avgCourseProgressPercent === null) && (
            <p className="field-hint">
              Mit „–“ gekennzeichnete Kennzahlen erscheinen erst, wenn mindestens {d.minCohortSize} verschiedene Mitglieder dazu
              beigetragen haben — sonst ließe sich die Leistung einzelner Personen ablesen.
            </p>
          )}
          <h4 className="stat-subheading">Ø Trefferquote je Handlungsbereich</h4>
          {/* F-148: Trefferquote je Handlungsbereich als Kachel mit Füllstand (Tile.tsx). */}
          <div className="tile-grid tile-grid-sm">
            {d.byFachgebiet.map((entry) => (
              <Tile
                key={entry.fachgebietId}
                size="sm"
                title={entry.fachgebietTitle}
                meta={
                  entry.avgAccuracyPercent !== null
                    ? `${entry.avgAccuracyPercent} % (rund ${pluralDe(entry.answers ?? 0, "Antwort", "Antworten")})`
                    : "noch zu wenig Beteiligung"
                }
                fill={entry.avgAccuracyPercent ?? 0}
              />
            ))}
          </div>
          {d.byFachgebiet.length === 0 && <p className="field-hint">Noch keine Quiz-Aktivität in dieser Kohorte.</p>}
          <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={exportiere}>
            Kennzahlen als CSV exportieren
          </button>
        </>
      )}

      <h4 className="stat-subheading">Mitglieder ({members.data?.length ?? "…"})</h4>
      <div className="tile-grid tile-grid-sm">
        {(members.data ?? []).map((member) => (
          <Tile
            key={member.userId}
            size="sm"
            title={member.name}
            description={
              <>
                {`Beigetreten am ${new Date(member.joinedAt).toLocaleDateString("de-DE")}`}
                {kontakte[member.userId] && (
                  <>
                    {" · Kontakt: "}
                    <a className="link" href={`mailto:${kontakte[member.userId]}`}>
                      {kontakte[member.userId]}
                    </a>
                  </>
                )}
              </>
            }
            actions={
              <>
              {member.contactAvailable && !kontakte[member.userId] && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={memberContact.isPending}
                  onClick={() => memberContact.mutate({ cohortId, userId: member.userId })}
                >
                  Kontakt anzeigen
                </button>
              )}
              <ConfirmButton
                label="Entfernen"
                question="Aus der Kohorte entfernen?"
                disabled={removeMember.isPending}
                onConfirm={() => removeMember.mutate({ cohortId, userId: member.userId })}
              />
              </>
            }
          />
        ))}
      </div>
      {memberContact.error && <ErrorMessage>{memberContact.error.message}</ErrorMessage>}
      {removeMember.error && <ErrorMessage>{removeMember.error.message}</ErrorMessage>}
      {members.data?.length === 0 && <p className="field-hint">Noch niemand beigetreten.</p>}
    </div>
  );
}

function CohortRow({ cohort }: { cohort: { id: string; name: string; joinCode: string; memberCount: number } }) {
  const utils = trpc.useUtils();
  const [expanded, setExpanded] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(cohort.name);
  const regenerate = trpc.cohort.regenerateJoinCode.useMutation({
    onSuccess: () => utils.cohort.myCohorts.invalidate(),
  });
  const rename = trpc.cohort.rename.useMutation({
    onSuccess: () => {
      utils.cohort.myCohorts.invalidate();
      setRenaming(false);
    },
  });
  const remove = trpc.cohort.remove.useMutation({
    onSuccess: () => utils.cohort.myCohorts.invalidate(),
  });
  // Review UXL-17: Die Mitgliederzahl der Kachel kommt aus der Übersicht; beim Aufklappen neu laden, damit sie zu den Details passt.
  useEffect(() => {
    if (expanded) utils.cohort.myCohorts.invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  // F-148: Kohorte als Kachel; die Details (breit) klappen als eigene Zeile über die volle
  // Rasterbreite darunter auf (`.tile-subgrid`).
  return (
    <>
      <Tile
        size="sm"
        title={cohort.name}
        description={
          <>
            Beitritts-Code <code>{cohort.joinCode}</code> <CopyButton text={cohort.joinCode} /> ·{" "}
            {pluralDe(cohort.memberCount, "Mitglied", "Mitglieder")}
          </>
        }
        aria-expanded={expanded}
        actions={
          <>
            <button type="button" className="btn btn-ghost btn-sm" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>
              {expanded ? "Einklappen" : "Details anzeigen"}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRenaming((current) => !current)}>
              Umbenennen
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={regenerate.isPending}
              onClick={() => regenerate.mutate({ cohortId: cohort.id })}
            >
              Neuen Code erzeugen
            </button>
            <ConfirmButton
              label="Kohorte beenden"
              question="Kohorte wirklich beenden? Mitgliedschaften und Code entfallen, Freundschaften bleiben."
              confirmLabel="Ja, beenden"
              disabled={remove.isPending}
              onConfirm={() => remove.mutate({ cohortId: cohort.id })}
            />
          </>
        }
      >
        {renaming && (
          <form
            className="stack"
            onSubmit={(event) => {
              event.preventDefault();
              rename.mutate({ cohortId: cohort.id, name });
            }}
          >
            <label htmlFor={`cohort-rename-${cohort.id}`}>Neuer Name</label>
            <input
              className="input"
              id={`cohort-rename-${cohort.id}`}
              value={name}
              maxLength={100}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }} disabled={rename.isPending}>
              Speichern
            </button>
          </form>
        )}
        {regenerate.error && <ErrorMessage>{regenerate.error.message}</ErrorMessage>}
        {rename.error && <ErrorMessage>{rename.error.message}</ErrorMessage>}
        {remove.error && <ErrorMessage>{remove.error.message}</ErrorMessage>}
      </Tile>
      {expanded && (
        <div className="tile-subgrid">
          <CohortDetail cohortId={cohort.id} cohortName={cohort.name} />
        </div>
      )}
    </>
  );
}

/**
 * F-07/F-64/F-65: Lehrgangsgruppen (Kohorten). Kombiniert wie FriendCircle.tsx zwei Rollen in
 * einer Komponente — "Kohorte beitreten" (jede eingeschriebene Person) und "Meine Kohorten"
 * (Dozent:in-Sicht auf selbst angelegte Kohorten, bewusst kein eigener `user.role`-Wert, siehe
 * schema.ts). Im "Sozial"-Tab platziert, direkt nach `FriendCircle`, da ein Kohorten-Beitritt
 * (F-65) automatisch den dortigen Freundeskreis erweitert.
 *
 * Review UXL-04/05: Vor dem Beitritt steht, was die Gruppe sieht, und der Beitritt wird bestätigt; Mitglieder sehen ihre
 * Mitgliedschaften und können austreten; die Dozent:in kann umbenennen, Mitglieder entfernen und die Kohorte beenden.
 */
export function Kohorte({ kursId, nurLeiten = false }: { kursId: string; nurLeiten?: boolean }) {
  const utils = trpc.useUtils();
  const myCohorts = trpc.cohort.myCohorts.useQuery({ kursId });
  const memberships = trpc.cohort.myMemberships.useQuery({ kursId });
  // Review UXL-21: Kohorten, die diese Person in anderen Kursen leitet (die Verwaltung gibt es nur im jeweiligen Kurs).
  const leading = trpc.cohort.leadingOverview.useQuery();
  const inAnderenKursen = (leading.data ?? []).filter((eintrag) => eintrag.kursId !== kursId);
  const [joinCode, setJoinCode] = useState("");
  const [joinConfirmed, setJoinConfirmed] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");

  const join = trpc.cohort.join.useMutation({
    onSuccess: () => {
      utils.cohort.myMemberships.invalidate({ kursId });
      utils.friend.friends.invalidate({ kursId });
      utils.highscore.leaderboard.invalidate({ kursId });
      // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): ein Kohorten-
      // Beitritt befreundet automatisch mit allen bestehenden Mitgliedern (F-65, ensureFriendship
      // in cohort.ts) — dieselbe Lücke wie bei FriendCircle.tsx' redeem für die Lernpartner-
      // Vermittlung (F-62), deren Kandidatenkreis ebenfalls auf den Freundeskreis beschränkt ist.
      utils.lernpartner.matches.invalidate({ kursId });
    },
  });
  const leave = trpc.cohort.leave.useMutation({
    onSuccess: () => utils.cohort.myMemberships.invalidate({ kursId }),
  });
  const create = trpc.cohort.create.useMutation({
    onSuccess: () => {
      utils.cohort.myCohorts.invalidate({ kursId });
      setNewCohortName("");
    },
  });

  return (
    <div className="panel-section">
      {!nurLeiten && (
        <div className="panel-section-head">
          <h2>Lehrgangsgruppen</h2>
          <p>
            Kohorten bündeln eine Lerngruppe innerhalb dieses Kurses. Mitglieder werden automatisch miteinander befreundet
            (Grundlage für Duelle und Lernpartner-Vermittlung). Die Leitung der Gruppe sieht Kennzahlen der ganzen Gruppe, nie
            Einzelantworten. Wer eine Gruppe leitet, findet die Verwaltung auch im Menü oben rechts unter „Gruppe leiten“.
          </p>
        </div>
      )}

      {!nurLeiten && (
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          // Review UXL-09: Das Feld bleibt bei einem Fehler gefüllt, ein Tippfehler lässt sich so korrigieren.
          join.mutate(
            { code: joinCode, confirmed: true },
            {
              onSuccess: () => {
                setJoinCode("");
                setJoinConfirmed(false);
              },
            },
          );
        }}
      >
        <h3 className="stat-subheading">Kohorte beitreten</h3>
        <div className="field">
          <label htmlFor="cohort-join-code">Beitritts-Code</label>
          <input
            className="input"
            id="cohort-join-code"
            value={joinCode}
            onChange={(event) => setJoinCode(event.target.value)}
            placeholder="z. B. AB3DEFGHJK"
            required
          />
        </div>
        {/* Review UXL-04: Transparenz vor dem Beitritt. */}
        <p className="field-hint">
          Wenn du beitrittst, sieht die Leitung der Gruppe deinen Anzeigenamen und dein Beitrittsdatum sowie Kennzahlen der ganzen
          Gruppe (nie deine einzelnen Antworten); deine E-Mail-Adresse kann die Leitung nur auf ausdrücklichen Klick einsehen. Du wirst mit allen Mitgliedern befreundet und kannst jederzeit wieder austreten;
          die Freundschaften bleiben dann bestehen und lassen sich im Freundeskreis einzeln lösen.
        </p>
        <label className="checkbox-row" htmlFor="cohort-join-confirm">
          <input
            id="cohort-join-confirm"
            type="checkbox"
            checked={joinConfirmed}
            onChange={(event) => setJoinConfirmed(event.target.checked)}
          />{" "}
          Ich habe das gelesen und möchte beitreten.
        </label>
        <button
          type="submit"
          className="btn btn-ghost btn-sm"
          style={{ alignSelf: "flex-start" }}
          disabled={join.isPending || !joinConfirmed}
        >
          Beitreten
        </button>
        {join.data && (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>Du bist jetzt Mitglied der Kohorte "{join.data.cohortName}".</div>
          </div>
        )}
        {join.error && <ErrorMessage>{join.error.message}</ErrorMessage>}
      </form>
      )}

      {!nurLeiten && (
      <div className="stack">
        <h3 className="stat-subheading">Meine Mitgliedschaften</h3>
        <div className="tile-grid tile-grid-sm">
          {(memberships.data ?? []).map((entry) => (
            <Tile
              key={entry.cohortId}
              size="sm"
              title={entry.name}
              description={`Beigetreten am ${new Date(entry.joinedAt).toLocaleDateString("de-DE")}`}
              actions={
                <ConfirmButton
                  label="Austreten"
                  question="Wirklich austreten?"
                  confirmLabel="Ja, austreten"
                  disabled={leave.isPending}
                  onConfirm={() => leave.mutate({ cohortId: entry.cohortId })}
                />
              }
            />
          ))}
        </div>
        {leave.error && <ErrorMessage>{leave.error.message}</ErrorMessage>}
        {memberships.data?.length === 0 && <p className="field-hint">Du bist in diesem Kurs in keiner Kohorte Mitglied.</p>}
      </div>
      )}

      <div className="stack">
        <h3 className="stat-subheading">Meine Kohorten (als Leitung)</h3>
        <div className="tile-grid tile-grid-sm">
          {(myCohorts.data ?? []).map((cohort) => (
            <CohortRow key={cohort.id} cohort={cohort} />
          ))}
        </div>
        {myCohorts.data?.length === 0 && <p className="field-hint">Noch keine eigene Kohorte angelegt.</p>}
      </div>

      {inAnderenKursen.length > 0 && (
        <div className="stack">
          <h3 className="stat-subheading">Meine Kohorten in anderen Kursen</h3>
          <p className="field-hint">
            Kohorten lassen sich nur im jeweiligen Kurs verwalten. Wechsle über das Kursmenü oben in den Kurs, um sie zu öffnen. Die
            Mitglieder bleiben in der Zwischenzeit bestehen.
          </p>
          <div className="tile-grid tile-grid-sm">
            {inAnderenKursen.map((eintrag) => (
              <Tile
                key={eintrag.id}
                size="sm"
                title={eintrag.name}
                description={`${eintrag.kursTitle} · ${pluralDe(eintrag.memberCount, "Mitglied", "Mitglieder")}`}
              >
                {!eintrag.enrolled && (
                  <p className="field-hint">Du belegst diesen Kurs aktuell nicht. Tritt ihm wieder bei, um die Kohorte zu verwalten.</p>
                )}
              </Tile>
            ))}
          </div>
        </div>
      )}

      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          create.mutate({ kursId, name: newCohortName });
        }}
      >
        <h3 className="stat-subheading">Neue Kohorte anlegen</h3>
        <div className="field">
          <label htmlFor="cohort-new-name">Name der Lehrgangsgruppe</label>
          <input
            className="input"
            id="cohort-new-name"
            value={newCohortName}
            maxLength={100}
            onChange={(event) => setNewCohortName(event.target.value)}
            placeholder="z. B. Fachwirt-Kurs Herbst 2026"
            required
          />
        </div>
        <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={create.isPending}>
          Kohorte anlegen
        </button>
        {create.data && (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>
              Kohorte „{create.data.name}“ angelegt. Beitritts-Code: <code>{create.data.joinCode}</code>
            </div>
          </div>
        )}
        {create.error && <ErrorMessage>{create.error.message}</ErrorMessage>}
      </form>
    </div>
  );
}
