import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

/**
 * F-64: aggregierte Kennzahlen + Mitgliederliste (nur E-Mail/Beitrittsdatum, kein
 * Lernfortschritt — siehe trpc/routers/cohort.ts) für die Dozent:in einer Kohorte. Eigene
 * Komponente statt Inline-Erweiterung der Kohorten-Zeile, da beide Abfragen erst bei
 * tatsächlichem Aufklappen geladen werden sollen (keine Dozentin-Kennzahlen unnötig im
 * Hintergrund laden, solange niemand hinschaut).
 */
function CohortDetail({ cohortId }: { cohortId: string }) {
  const stats = trpc.cohort.stats.useQuery({ cohortId });
  const members = trpc.cohort.members.useQuery({ cohortId });

  if (stats.isLoading || !stats.data) {
    return <p>Lädt…</p>;
  }
  const d = stats.data;

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
          <span className="stat-subheading">Ø Trefferquote je Handlungsbereich</span>
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
        </>
      )}

      <span className="stat-subheading">Mitglieder ({members.data?.length ?? "…"})</span>
      <div className="tile-grid tile-grid-sm">
        {(members.data ?? []).map((member) => (
          <Tile
            key={member.userId}
            size="sm"
            title={member.email}
            description={`Beigetreten am ${new Date(member.joinedAt).toLocaleDateString("de-DE")}`}
          />
        ))}
      </div>
      {members.data?.length === 0 && <p className="field-hint">Noch niemand beigetreten.</p>}
    </div>
  );
}

function CohortRow({ cohort }: { cohort: { id: string; name: string; joinCode: string; memberCount: number } }) {
  const utils = trpc.useUtils();
  const [expanded, setExpanded] = useState(false);
  const regenerate = trpc.cohort.regenerateJoinCode.useMutation({
    onSuccess: () => utils.cohort.myCohorts.invalidate(),
  });

  // F-148: Kohorte als Kachel; die Details (breit) klappen als eigene Zeile über die volle
  // Rasterbreite darunter auf (`.tile-subgrid`).
  return (
    <>
      <Tile
        size="sm"
        title={cohort.name}
        description={
          <>
            Beitritts-Code <code>{cohort.joinCode}</code> · {cohort.memberCount} Mitglied(er)
          </>
        }
        aria-expanded={expanded}
        actions={
          <>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setExpanded((current) => !current)}>
              {expanded ? "Einklappen" : "Details anzeigen"}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={regenerate.isPending}
              onClick={() => regenerate.mutate({ cohortId: cohort.id })}
            >
              Neuen Code erzeugen
            </button>
          </>
        }
      >
        {regenerate.error && <ErrorMessage>{regenerate.error.message}</ErrorMessage>}
      </Tile>
      {expanded && (
        <div className="tile-subgrid">
          <CohortDetail cohortId={cohort.id} />
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
 */
export function Kohorte({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const myCohorts = trpc.cohort.myCohorts.useQuery({ kursId });
  const [joinCode, setJoinCode] = useState("");
  const [newCohortName, setNewCohortName] = useState("");

  const join = trpc.cohort.join.useMutation({
    onSuccess: () => {
      utils.friend.friends.invalidate({ kursId });
      utils.highscore.leaderboard.invalidate({ kursId });
      // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): ein Kohorten-
      // Beitritt befreundet automatisch mit allen bestehenden Mitgliedern (F-65, ensureFriendship
      // in cohort.ts) — dieselbe Lücke wie bei FriendCircle.tsx' redeem für die Lernpartner-
      // Vermittlung (F-62), deren Kandidatenkreis ebenfalls auf den Freundeskreis beschränkt ist.
      utils.lernpartner.matches.invalidate({ kursId });
    },
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
          Kohorten bündeln eine Lerngruppe innerhalb dieses Kurses — Mitglieder werden automatisch miteinander
          befreundet (Grundlage für Duelle/Lernpartner-Vermittlung), Dozent:innen sehen ausschließlich aggregierte
          Kennzahlen, nie Einzelantworten.
        </p>
      </div>

      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          // Review UXL-09: Das Feld bleibt bei einem Fehler gefüllt, ein Tippfehler lässt sich so korrigieren.
          join.mutate({ code: joinCode }, { onSuccess: () => setJoinCode("") });
        }}
      >
        <span className="stat-subheading">Kohorte beitreten</span>
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
        <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={join.isPending}>
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
        <span className="stat-subheading">Meine Kohorten (als Dozent:in)</span>
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
        <span className="stat-subheading">Neue Kohorte anlegen</span>
        <div className="field">
          <label htmlFor="cohort-new-name">Name der Lehrgangsgruppe</label>
          <input
            className="input"
            id="cohort-new-name"
            value={newCohortName}
            onChange={(event) => setNewCohortName(event.target.value)}
            placeholder="z. B. Fachwirt-Kurs Herbst 2026"
            required
          />
        </div>
        <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={create.isPending}>
          Kohorte anlegen
        </button>
        {create.error && <ErrorMessage>{create.error.message}</ErrorMessage>}
      </form>
    </div>
  );
}
