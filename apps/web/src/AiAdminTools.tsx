import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-71/F-80 (Nutzer-Entscheidung 23.09.2026, seit 25.09.2026 einziges verbleibendes KI-
 * Freischalt-Flag, siehe Architekturplanung Abschnitt 13): admin-vergebbare Freischaltung der
 * KI-Aufgabengenerierung für ein Konto — F-70 (KI-Bewertung) läuft inzwischen über den echten
 * Abo-Status (siehe AboStatus.tsx), F-71 bleibt admin-only, da die Aufgabengenerierung laut
 * Nutzer-Vorgabe vom 25.09.2026 vorerst extern läuft. Sucht das Konto per E-Mail statt aus einer
 * Liste — anders als bei Unternehmens-Konten gibt es keine vorhandene Nutzer:innen-Übersicht.
 */
function AiFeatureFlagsForm() {
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState<string | null>(null);
  const found = trpc.admin.findUserByEmail.useQuery({ email: searchedEmail ?? "" }, { enabled: !!searchedEmail });
  const setFlags = trpc.admin.setAiGenerationEnabled.useMutation({
    onSuccess: () => {
      if (searchedEmail) utils.admin.findUserByEmail.invalidate({ email: searchedEmail });
      utils.auth.me.invalidate();
    },
  });

  return (
    <div className="stack">
      <form
        className="list-row-actions"
        onSubmit={(event) => {
          event.preventDefault();
          setSearchedEmail(email.trim());
        }}
      >
        <input
          className="input"
          type="email"
          placeholder="E-Mail-Adresse des Kontos"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" className="btn btn-secondary btn-sm" disabled={found.isFetching}>
          Suchen
        </button>
      </form>
      {found.error && <ErrorMessage>{found.error.message}</ErrorMessage>}
      {found.data && (
        <div className="list-row">
          <div className="meta">{found.data.email}</div>
          <div className="list-row-actions">
            <label>
              <input
                type="checkbox"
                checked={found.data.aiGenerationEnabled}
                disabled={setFlags.isPending}
                onChange={(event) =>
                  setFlags.mutate({ userId: found.data!.id, aiGenerationEnabled: event.target.checked })
                }
              />{" "}
              KI-Aufgabengenerierung (F-71)
            </label>
          </div>
        </div>
      )}
      {setFlags.error && <ErrorMessage>{setFlags.error.message}</ErrorMessage>}
    </div>
  );
}

/**
 * F-71: erzeugt einen KI-Entwurf — bewusst zunächst nur `quiz_mc` (siehe Architekturplanung
 * Abschnitt 13) — mit `isActive: false`. Landet damit automatisch im bestehenden
 * redaktionellen Freischalt-Weg (Admin-Content-Verwaltung oben, "Aktivieren"), ohne dafür
 * einen eigenen Review-Mechanismus zu bauen.
 */
function AiContentGenerationForm({ courses }: { courses: { id: string; title: string }[] }) {
  const utils = trpc.useUtils();
  const [kursId, setKursId] = useState(courses[0]?.id ?? "");
  const themaTree = trpc.adminContent.themaTree.useQuery({ kursId }, { enabled: !!kursId });
  const [themaId, setThemaId] = useState("");
  const [topicHint, setTopicHint] = useState("");
  const generate = trpc.ai.generateContentItem.useMutation({
    onSuccess: () => {
      utils.adminContent.list.invalidate();
      setTopicHint("");
    },
  });

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        generate.mutate({ themaId, topicHint });
      }}
    >
      <div className="field">
        <label htmlFor="ai-gen-kurs">Kurs</label>
        <select
          className="input"
          id="ai-gen-kurs"
          value={kursId}
          onChange={(event) => {
            setKursId(event.target.value);
            setThemaId("");
          }}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="ai-gen-thema">Thema</label>
        <select
          className="input"
          id="ai-gen-thema"
          value={themaId}
          onChange={(event) => setThemaId(event.target.value)}
          required
        >
          <option value="" disabled>
            Thema wählen…
          </option>
          {(themaTree.data ?? []).map((fachgebiet) => (
            <optgroup key={fachgebiet.id} label={fachgebiet.title}>
              {fachgebiet.themen.map((thema) => (
                <option key={thema.id} value={thema.id}>
                  {thema.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="ai-gen-hint">Themenschwerpunkt</label>
        <input
          className="input"
          id="ai-gen-hint"
          value={topicHint}
          onChange={(event) => setTopicHint(event.target.value)}
          placeholder="z. B. Grundlagen der Ablauforganisation"
          maxLength={300}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ alignSelf: "flex-start" }}
        disabled={generate.isPending || !themaId}
      >
        {generate.isPending ? "Wird generiert…" : "Entwurf generieren"}
      </button>
      {generate.error && <ErrorMessage>{generate.error.message}</ErrorMessage>}
      {generate.data && (
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Entwurf erstellt (inaktiv) — in der Content-Verwaltung oben prüfen und aktivieren.</div>
        </div>
      )}
    </form>
  );
}

/**
 * F-71/F-72/F-80: Admin-Werkzeuge für die KI-Aufgabengenerierung — F-70 (KI-Bewertung) ist seit
 * 25.09.2026 kein Admin-Flag mehr, sondern läuft über den echten Abo-Status (siehe AboStatus.tsx),
 * daher hier nicht mehr aufgeführt. Eigene Datei statt Erweiterung von AdminPanel.tsx (bereits
 * umfangreich), analog zu AdminContentEditor.tsx.
 */
export function AiAdminTools({
  courses,
  generationEnabled,
}: {
  courses: { id: string; title: string }[];
  generationEnabled: boolean;
}) {
  const providerInfo = trpc.ai.providerInfo.useQuery();

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Admin: KI-Aufgabengenerierung (F-71/F-72)</h2>
        {providerInfo.data?.provider === "ollama" ? (
          <p>
            Aktiver KI-Anbieter: lokales Modell <code>{providerInfo.data.model}</code> über Ollama (F-128) — echte
            KI-Ausgaben, keine Platzhalter mehr. Weiterhin klar als unverbindliche Lernhilfe gekennzeichnet.
          </p>
        ) : (
          <p>
            Alle KI-Texte sind bewusst als Entwicklungs-Platzhalter gekennzeichnet — der eigentliche KI-Anbieter wird laut
            Architekturplanung erst kurz vor Phase 4 ausgewählt.
          </p>
        )}
      </div>
      <h3>Freischaltung der Aufgabengenerierung je Konto (F-80)</h3>
      <AiFeatureFlagsForm />
      <h3>Aufgabengenerierung (F-71)</h3>
      {generationEnabled ? (
        <AiContentGenerationForm courses={courses} />
      ) : (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Für dein eigenes Konto noch nicht freigeschaltet — oben per E-Mail suchen und die Generierung aktivieren.</div>
        </div>
      )}
    </div>
  );
}
