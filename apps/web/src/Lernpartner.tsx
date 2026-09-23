import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-62: Lernpartner-Vermittlung — zeigt nur Übereinstimmungen (Prüfungstermin und/oder
 * Handlungsbereich) innerhalb des Freundeskreises an; bewusst kein Anfrage-/Bestätigungs-Workflow
 * und kein Chat — der Kontakt läuft über die im Freundeskreis bereits sichtbare E-Mail-Adresse
 * (siehe FriendCircle.tsx). `fachgebiete` wird von `Progress.tsx` durchgereicht (bereits über
 * `progress.overview` geladen), damit hier keine zweite, redundante Abfrage nötig ist.
 *
 * Code-Review-Fund (23.09.2026, siehe Architekturplanung Abschnitt 13): `isMinor`/
 * `gamificationEnabled` fehlten hier bisher komplett — die Präferenzauswahl war für
 * Minderjährige uneingeschränkt sichtbar, obwohl F-66 sie ausdrücklich mit Highscore (F-60)
 * gleichstellt. Analog zu Highscore.tsx geblendet (Hinweistext statt eines deaktivierten
 * Auswahlfelds, siehe dort für die Begründung).
 */
export function Lernpartner({
  kursId,
  fachgebiete,
  isMinor,
  gamificationEnabled,
}: {
  kursId: string;
  fachgebiete: { id: string; title: string }[];
  isMinor: boolean;
  gamificationEnabled: boolean;
}) {
  const utils = trpc.useUtils();
  const matches = trpc.lernpartner.matches.useQuery({ kursId });
  const setFachgebiet = trpc.lernpartner.setFachgebiet.useMutation({
    onSuccess: () => utils.lernpartner.matches.invalidate({ kursId }),
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Lernpartner-Vermittlung</h2>
        <p>
          Zeigt Übereinstimmungen bei Prüfungstermin und Handlungsbereich innerhalb deines Freundeskreises — ohne
          eigenen Chat, meldet euch per E-Mail.
        </p>
      </div>

      {isMinor && !gamificationEnabled ? (
        <p className="field-hint">
          Für minderjährige Nutzer:innen ist die Lernpartner-Vermittlung ohne gesonderte Einwilligung der
          Erziehungsberechtigten deaktiviert.
        </p>
      ) : (
        <div className="field">
          <label htmlFor="lernpartner-fachgebiet">Bevorzugter Handlungsbereich (optional)</label>
          <select
            className="input"
            id="lernpartner-fachgebiet"
            onChange={(event) => setFachgebiet.mutate({ kursId, fachgebietId: event.target.value || null })}
            disabled={setFachgebiet.isPending}
          >
            <option value="">Keine Präferenz</option>
            {fachgebiete.map((fachgebiet) => (
              <option key={fachgebiet.id} value={fachgebiet.id}>
                {fachgebiet.title}
              </option>
            ))}
          </select>
        </div>
      )}
      {setFachgebiet.error && <ErrorMessage>{setFachgebiet.error.message}</ErrorMessage>}

      <div className="list">
        {(matches.data ?? []).map((entry) => (
          <div key={entry.friendUserId} className="list-row">
            <div className="meta">
              {entry.friendEmail}
              <span>
                {entry.targetDate ? `Zieltermin ${new Date(entry.targetDate).toLocaleDateString("de-DE")}` : "Kein Zieltermin"}
                {entry.fachgebietTitle ? ` · ${entry.fachgebietTitle}` : ""}
              </span>
            </div>
            {entry.matchScore > 0 && (
              <span className="stat-label">
                {entry.matchesTargetDate && "Ähnlicher Zieltermin"}
                {entry.matchesTargetDate && entry.matchesFachgebiet && " · "}
                {entry.matchesFachgebiet && "Gleicher Handlungsbereich"}
              </span>
            )}
          </div>
        ))}
      </div>
      {matches.data?.length === 0 && <p className="field-hint">Noch keine Freunde in diesem Kurs.</p>}
    </div>
  );
}
