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
function CohortDetail({ cohortId, cohortName }: { cohortId: string; cohortName: string }) {
  const utils = trpc.useUtils();
  const stats = trpc.cohort.stats.useQuery({ cohortId });
  const members = trpc.cohort.members.useQuery({ cohortId });
  // Review UXL-05: Die Dozent:in kann Mitglieder aus der Kohorte entfernen.
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
        ["Aktive Mitglieder (30 Tage)", prozent(d.activeSharePercent)],
        ["Durchschnittlicher Fortschritt", prozent(d.avgProgressPercent)],
        [],
        ["Handlungsbereich", "Durchschnittliche Trefferquote in Prozent"],
        ...d.byFachgebiet.map((eintrag) => [eintrag.fachgebietTitle, prozent(eintrag.avgAccuracyPercent)]),
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
          <div className="stat-row">
            <div className="stat-tile">
              <span className="stat-value">{d.activeSharePercent === null ? "–" : `${d.activeSharePercent} %`}</span>
              <span className="stat-label">Aktive Mitglieder (30 Tage)</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{d.avgProgressPercent === null ? "–" : `${d.avgProgressPercent} %`}</span>
              <span className="stat-label">Ø Fortschritt</span>
            </div>
          </div>
          {(d.activeSharePercent === null || d.avgProgressPercent === null) && (
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
                meta={entry.avgAccuracyPercent !== null ? `${entry.avgAccuracyPercent} %` : "noch zu wenig Beteiligung"}
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
            title={member.email}
            description={`Beigetreten am ${new Date(member.joinedAt).toLocaleDateString("de-DE")}`}
            actions={
              <ConfirmButton
                label="Entfernen"
                question="Aus der Kohorte entfernen?"
                disabled={removeMember.isPending}
                onConfirm={() => removeMember.mutate({ cohortId, userId: member.userId })}
              />
            }
          />
        ))}
      </div>
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
export function Kohorte({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const myCohorts = trpc.cohort.myCohorts.useQuery({ kursId });
  const memberships = trpc.cohort.myMemberships.useQuery({ kursId });
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
      <div className="panel-section-head">
        <h2>Lehrgangsgruppen</h2>
        <p>
          Kohorten bündeln eine Lerngruppe innerhalb dieses Kurses. Mitglieder werden automatisch miteinander befreundet
          (Grundlage für Duelle und Lernpartner-Vermittlung). Die Leitung der Gruppe sieht Kennzahlen der ganzen Gruppe, nie
          Einzelantworten.
        </p>
      </div>

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
          Wenn du beitrittst, sieht die Leitung der Gruppe deine E-Mail-Adresse und dein Beitrittsdatum sowie Kennzahlen der ganzen
          Gruppe (nie deine einzelnen Antworten). Du wirst mit allen Mitgliedern befreundet und kannst jederzeit wieder austreten;
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

      <div className="stack">
        <h3 className="stat-subheading">Meine Kohorten (als Leitung)</h3>
        <div className="tile-grid tile-grid-sm">
          {(myCohorts.data ?? []).map((cohort) => (
            <CohortRow key={cohort.id} cohort={cohort} />
          ))}
        </div>
        {myCohorts.data?.length === 0 && <p className="field-hint">Noch keine eigene Kohorte angelegt.</p>}
      </div>

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
