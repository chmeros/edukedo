import { useState } from "react";
import { CourseIllustration } from "./CourseIcons";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { KursInhalte } from "./KursInhalte";
import { Modal } from "./Modal";
import { Tile } from "./Tile";
import { trpc } from "./trpc";
import { ConfirmButton } from "./ConfirmButton";

const KATEGORIE_LABEL: Record<string, string> = {
  erwachsenenbildung: "Erwachsenenbildung",
  schule: "Schule",
  unbekannt: "Sonstige",
};

const KATEGORIE_FILTERS: { id: "alle" | "erwachsenenbildung" | "schule"; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "erwachsenenbildung", label: "Erwachsenenbildung" },
  { id: "schule", label: "Schule" },
];

/**
 * F-100/F-101: Dedizierte Kursauswahl-/Katalogseite — löst die bisherige, direkt im
 * Header-Dropdown eingebettete Kursliste ab (skaliert nicht auf perspektivisch mehrere hundert
 * Kurse, siehe Architekturplanung Abschnitt 13). Dient sowohl der verbindlichen Erstauswahl
 * (F-101, `canDismiss={false}` solange noch kein Kurs belegt ist) als auch dem späteren
 * Kurswechsel über den Header-Link (F-100, `canDismiss={true}`).
 */
export function CourseSelection({
  onSelected,
  canDismiss,
  onDismiss,
}: {
  onSelected: (kursId: string) => void;
  canDismiss: boolean;
  onDismiss?: () => void;
}) {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const me = trpc.auth.me.useQuery();
  // F-147: Gesamtfortschritt je belegtem Kurs für den Füllstand der Kachel; Kurse ohne Content-Items
  // liefern keine Zeile → 0 %.
  const progress = trpc.courses.progress.useQuery();
  // Review UXT-F-23: Umfang je Kurs (Themen und Aufgaben) als Kurzbeschreibung unter der Kategorie.
  const umfang = trpc.courses.umfang.useQuery();
  // Review UXL-12: Lese-Modus für Kursinhalte (ohne Beitritt).
  const [lesen, setLesen] = useState<{ kursId: string; titel: string } | null>(null);
  const [search, setSearch] = useState("");
  // Review UXL-24: Schulkurse nennen offen, dass Minderjährige derzeit nicht zugelassen sind (Server-Schalter ALLOW_MINORS).
  const authConfig = trpc.auth.publicConfig.useQuery();
  const kategorieText = (kategorie: string, kursId: string) => {
    const basis =
      kategorie === "schule" && authConfig.data?.minorsAllowed === false
        ? `${KATEGORIE_LABEL[kategorie]} · aktuell nur für Volljährige zugänglich`
        : KATEGORIE_LABEL[kategorie];
    const zeile = umfang.data?.find((eintrag) => eintrag.kursId === kursId);
    if (!zeile) return basis;
    // Geschützte Leerzeichen, damit „752 Aufgaben“ nicht mitten in der Angabe umbricht.
    const mitZahl = (wert: number, einzahl: string, mehrzahl: string) => `${wert.toLocaleString("de-DE")}\u00A0${wert === 1 ? einzahl : mehrzahl}`;
    return `${basis} · ${mitZahl(zeile.themen, "Thema", "Themen")} · ${mitZahl(zeile.aufgaben, "Aufgabe", "Aufgaben")}`;
  };
  const [kategorieFilter, setKategorieFilter] = useState<"alle" | "erwachsenenbildung" | "schule">("alle");
  // F-102: Beitritt zu einem Erwachsenenbildungskurs bei bereits bestehender Belegung derselben
  // Kategorie erfordert eine Bestätigung, da dabei automatisch die alte Belegung verlassen wird
  // (integrierter Wechsel-Flow statt zwei getrennter Schritte, Nutzer-Entscheidung 18.09.2026).
  const [pendingSwitch, setPendingSwitch] = useState<{
    kursId: string;
    title: string;
    leaveKursId: string;
    leaveTitle: string;
  } | null>(null);

  const enroll = trpc.courses.enroll.useMutation({
    onSuccess: (_result, variables) => {
      utils.courses.list.invalidate();
      utils.courses.progress.invalidate();
      setPendingSwitch(null);
      onSelected(variables.kursId);
    },
  });
  const leave = trpc.courses.leave.useMutation({
    onSuccess: () => {
      utils.courses.list.invalidate();
      utils.courses.progress.invalidate();
    },
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  if (lesen) {
    return <KursInhalte kursId={lesen.kursId} titel={lesen.titel} onClose={() => setLesen(null)} />;
  }

  const all = courses.data ?? [];
  const joined = all.filter((course) => course.joined);
  const available = all
    .filter((course) => !course.joined)
    .filter((course) => kategorieFilter === "alle" || course.kategorie === kategorieFilter)
    .filter((course) => course.title.toLowerCase().includes(search.trim().toLowerCase()));

  function handleJoin(course: { id: string; title: string; kategorie: string }) {
    if (course.kategorie === "erwachsenenbildung") {
      const conflict = joined.find((entry) => entry.kategorie === "erwachsenenbildung");
      if (conflict) {
        setPendingSwitch({ kursId: course.id, title: course.title, leaveKursId: conflict.id, leaveTitle: conflict.title });
        return;
      }
    }
    enroll.mutate({ kursId: course.id });
  }

  return (
    <div className="stack">
      {!canDismiss && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Wähle einen Lernbereich, um mit dem Lernen zu beginnen.</div>
        </div>
      )}

      {joined.length > 0 && (
        <div className="panel-section">
          <span className="stat-subheading">Deine Kurse</span>
          <div className="tile-grid">
            {joined.map((course) => {
              const percent = progress.data?.find((row) => row.kursId === course.id)?.percent ?? 0;
              return (
                <Tile
                  key={course.id}
                  title={course.title}
                  description={kategorieText(course.kategorie, course.id)}
                  meta={progress.data ? `${percent} % gelernt` : undefined}
                  image={<CourseIllustration kategorie={course.kategorie} type={course.type} />}
                  fill={progress.data ? percent : 0}
                  actions={
                    <>
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => onSelected(course.id)}>
                        Auswählen
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setLesen({ kursId: course.id, titel: course.title })}>
                        Inhalte ansehen
                      </button>
                      {/* Review WEB-24: Kurs verlassen löscht Zieltermin, Plan-Start und Lernpartner-Präferenz, daher mit Rückfrage. */}
                      <ConfirmButton
                        label="Verlassen"
                        question="Kurs wirklich verlassen? Zieltermin, Plan-Start, Lernpartner-Auswahl und deine Mitgliedschaften in Kohorten dieses Kurses gehen verloren, dein Lernfortschritt bleibt erhalten."
                        confirmLabel="Ja, verlassen"
                        disabled={leave.isPending && leave.variables?.kursId === course.id}
                        onConfirm={() => leave.mutate({ kursId: course.id })}
                      />
                    </>
                  }
                >
                  {leave.error && leave.variables?.kursId === course.id && (
                    <ErrorMessage>{leave.error.message}</ErrorMessage>
                  )}
                </Tile>
              );
            })}
          </div>
        </div>
      )}

      {me.data?.isMinor && (
        // F-153 (Nutzer-Feedback vom 05.10.2026): Minderjährige sahen bisher stillschweigend nur einen Bruchteil
        // des Katalogs — die IHK-Kurse (Fortbildung, Fachinformatiker/in, AEVO) sind laut F-13 nur für Erwachsene.
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Du siehst hier nur Kurse für deine Altersgruppe. Die IHK-Kurse (Fortbildungen, Fachinformatiker/in, AEVO)
            sind aktuell erst ab 18 Jahren freigeschaltet.
          </div>
        </div>
      )}

      <div className="panel-section">
        <span className="stat-subheading">{joined.length > 0 ? "Weiteren Kurs beitreten" : "Kurs beitreten"}</span>
        <div className="field">
          <input
            className="input"
            type="search"
            placeholder="Kurs suchen…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="header-actions">
          {KATEGORIE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={filter.id === kategorieFilter ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
              aria-pressed={filter.id === kategorieFilter}
              onClick={() => setKategorieFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {available.length === 0 && <p className="field-hint">Keine passenden Kurse gefunden.</p>}
        <div className="tile-grid">
          {available.map((course) => (
            <Tile
              key={course.id}
              title={course.title}
              description={kategorieText(course.kategorie, course.id)}
              image={<CourseIllustration kategorie={course.kategorie} type={course.type} />}
              actions={
                <>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={enroll.isPending && enroll.variables?.kursId === course.id}
                    onClick={() => handleJoin(course)}
                  >
                    Beitreten
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setLesen({ kursId: course.id, titel: course.title })}>
                    Inhalte ansehen
                  </button>
                </>
              }
            >
              {/* Ein Fehlschlag über den Wechsel-Dialog (pendingSwitch) wird dort im Modal gezeigt,
                  nicht hier — sonst wäre die Meldung hinter dem geöffneten Modal verdeckt. */}
              {enroll.error && !pendingSwitch && enroll.variables?.kursId === course.id && (
                <ErrorMessage>{enroll.error.message}</ErrorMessage>
              )}
            </Tile>
          ))}
        </div>
      </div>

      {canDismiss && onDismiss && (
        <button type="button" className="link-muted-btn" onClick={onDismiss}>
          ← Zurück
        </button>
      )}

      {pendingSwitch && (
        <Modal title="Kurs wechseln?" onClose={() => setPendingSwitch(null)}>
          <div className="stack">
            <p>
              Du bist aktuell in <b>{pendingSwitch.leaveTitle}</b> eingeschrieben. Weiterbildungskurse erlauben nur
              eine aktive Belegung gleichzeitig — mit dem Beitritt zu <b>{pendingSwitch.title}</b> verlässt du{" "}
              {pendingSwitch.leaveTitle} automatisch.
            </p>
            {/* Review UXL-12/UXL-21/UXL-05: Was mit Kohorten beim Wechsel passiert, sollte vor dem Wechsel klar sein. */}
            <p className="field-hint">
              Deine Mitgliedschaften in Kohorten des verlassenen Kurses enden mit dem Wechsel. Kohorten, die du leitest, bleiben bestehen und
              sind wieder sichtbar, wenn du zurückwechselst. Deine Lernstände bleiben erhalten, ein gesetzter Zieltermin des verlassenen
              Kurses nicht.
            </p>
            <div className="header-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setPendingSwitch(null)}>
                Abbrechen
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={enroll.isPending}
                onClick={() =>
                  enroll.mutate({ kursId: pendingSwitch.kursId, leaveKursId: pendingSwitch.leaveKursId })
                }
              >
                Wechseln
              </button>
            </div>
            {enroll.error && <ErrorMessage>{enroll.error.message}</ErrorMessage>}
          </div>
        </Modal>
      )}
    </div>
  );
}
