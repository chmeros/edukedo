import type { AdminContentItemForm } from "@edukedo/shared";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

const TYPE_LABELS: Record<string, string> = {
  theorie: "Theorie",
  karteikarte: "Karteikarte",
  quiz_mc: "Quiz · Multiple Choice",
  // F-113: strukturell identisch zu Multiple Choice (siehe Architekturplanung Abschnitt 13).
  wahr_falsch: "Quiz · Wahr/Falsch",
  entweder_oder: "Quiz · Entweder-Oder",
  was_passt_nicht: "Quiz · Was passt nicht dazu",
  zuordnung: "Quiz · Zuordnung",
  luecken: "Quiz · Lückentext",
  kurzantwort: "Quiz · Kurzantwort",
  fallaufgabe: "Fallaufgabe",
  fachgespraech_frage: "Fachgesprächsfrage",
};

const CONTENT_TYPES = Object.keys(TYPE_LABELS) as AdminContentItemForm["type"][];

const BLOOM_OPTIONS = ["erinnern", "verstehen", "anwenden", "analysieren", "bewerten", "erschaffen"] as const;

function defaultFormForType(type: AdminContentItemForm["type"], themaId: string): AdminContentItemForm {
  const common = { themaId, difficulty: "mittel" as const, bloom: null, isPremium: false, isActive: true };
  switch (type) {
    case "theorie":
      return { type, prompt: "", bodyMarkdown: "", ...common };
    case "karteikarte":
      return { type, prompt: "", explanation: "", ...common };
    case "quiz_mc":
    case "was_passt_nicht":
      return {
        type,
        prompt: "",
        explanation: "",
        options: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
        ...common,
      };
    case "entweder_oder":
      return {
        type,
        prompt: "",
        explanation: "",
        // Bewusst fest bei genau 2 Optionen (siehe adminContentItemFormUnion), anders als
        // quiz_mc/was_passt_nicht kann hier nicht "Option hinzufügen" geklickt werden.
        options: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
        ...common,
      };
    case "wahr_falsch":
      // F-113: Die zwei Antwortmöglichkeiten sind bei diesem Typ immer "Wahr"/"Falsch" (der
      // Prompt selbst ist die zu beurteilende Aussage) — Texte deshalb schon hier fest
      // vorgegeben, im Formular unten schreibgeschützt (siehe Architekturplanung Abschnitt 13).
      return {
        type,
        prompt: "",
        explanation: "",
        options: [
          { text: "Wahr", isCorrect: true },
          { text: "Falsch", isCorrect: false },
        ],
        ...common,
      };
    case "zuordnung":
      return {
        type,
        prompt: "",
        explanation: "",
        pairs: [
          { left: "", right: "" },
          { left: "", right: "" },
        ],
        ...common,
      };
    case "luecken":
      return { type, explanation: "", lueckentextSource: "", ...common };
    case "kurzantwort":
      return { type, prompt: "", explanation: "", acceptedAnswers: [""], matchMode: "exact", ...common };
    case "fallaufgabe":
      return { type, prompt: "", explanation: "", parts: [{ prompt: "", points: 1, bloom: null }], ...common };
    case "fachgespraech_frage":
      return { type, prompt: "", explanation: "", themaTitel: "", ...common };
  }
}

type ThemaTree = { id: string; title: string; themen: { id: string; title: string }[] }[];

function ThemaSelect({ value, onChange, themaTree }: { value: string; onChange: (id: string) => void; themaTree: ThemaTree }) {
  return (
    <select className="input" value={value} onChange={(event) => onChange(event.target.value)} required>
      <option value="" disabled>
        Thema wählen…
      </option>
      {themaTree.map((fachgebiet) => (
        <optgroup key={fachgebiet.id} label={fachgebiet.title}>
          {fachgebiet.themen.map((thema) => (
            <option key={thema.id} value={thema.id}>
              {thema.title}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

/**
 * Das eigentliche Formular — erst gemountet, sobald `initial` feststeht (bei "Bearbeiten" also
 * erst nach dem Laden von adminContent.get), damit der lokale useState-Ausgangswert sicher aus
 * echten Daten befüllt werden kann, statt mit einem `useEffect`-Reset auf verspätet eintreffende
 * Server-Daten reagieren zu müssen.
 */
function ContentItemForm({
  initial,
  contentItemId,
  themaTree,
  onClose,
  onSaved,
}: {
  initial: AdminContentItemForm;
  contentItemId?: string;
  themaTree: ThemaTree;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<AdminContentItemForm>(initial);
  const [changeNote, setChangeNote] = useState("");
  const isEdit = !!contentItemId;
  const create = trpc.adminContent.create.useMutation({ onSuccess: onSaved });
  const update = trpc.adminContent.update.useMutation({ onSuccess: onSaved });
  const active = isEdit ? update : create;

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }) as AdminContentItemForm);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (isEdit) {
      update.mutate({ ...form, contentItemId, changeNote: changeNote.trim() || undefined } as never);
    } else {
      create.mutate(form as never);
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="ce-thema">Thema</label>
        <ThemaSelect value={form.themaId} onChange={(id) => setField("themaId", id)} themaTree={themaTree} />
      </div>

      {form.type !== "luecken" && (
        <div className="field">
          <label htmlFor="ce-prompt">
            {form.type === "theorie"
              ? "Titel"
              : form.type === "zuordnung"
                ? "Anweisung"
                : form.type === "fachgespraech_frage" || form.type === "fallaufgabe"
                  ? "Übergeordnete Frage/Situation"
                  : form.type === "wahr_falsch"
                    ? "Aussage"
                    : "Frage"}
          </label>
          <textarea
            className="input"
            id="ce-prompt"
            rows={2}
            value={form.prompt}
            onChange={(event) => setField("prompt", event.target.value)}
            required
          />
        </div>
      )}

      {form.type === "theorie" && (
        <div className="field">
          <label htmlFor="ce-body">Theorietext (Markdown)</label>
          <textarea
            className="input"
            id="ce-body"
            rows={10}
            value={form.bodyMarkdown}
            onChange={(event) => setField("bodyMarkdown", event.target.value)}
            required
          />
        </div>
      )}

      {form.type === "karteikarte" && (
        <div className="field">
          <label htmlFor="ce-explanation">Rückseite (Antwort)</label>
          <textarea
            className="input"
            id="ce-explanation"
            rows={3}
            value={form.explanation ?? ""}
            onChange={(event) => setField("explanation", event.target.value)}
            required
          />
        </div>
      )}

      {/* F-113: was_passt_nicht ist im Formular identisch zu quiz_mc (freie Optionstexte,
          2–10, genau eine richtig — bei was_passt_nicht ist "richtig" hier "der Ausreißer"),
          siehe Architekturplanung Abschnitt 13. */}
      {(form.type === "quiz_mc" || form.type === "was_passt_nicht") && (
        <div className="field">
          <label>{form.type === "was_passt_nicht" ? "Begriffe (genau einer passt nicht dazu)" : "Antwortoptionen (genau eine richtig)"}</label>
          <div className="stack">
            {form.options.map((option, index) => (
              <div key={index} className="list-row-actions">
                <input
                  className="input"
                  value={option.text}
                  placeholder={`Option ${index + 1}`}
                  onChange={(event) => {
                    const next = [...form.options];
                    next[index] = { ...next[index]!, text: event.target.value };
                    setField("options", next);
                  }}
                  required
                />
                <label className="field-hint" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input
                    type="radio"
                    name="ce-correct-option"
                    checked={option.isCorrect}
                    onChange={() => setField("options", form.options.map((o, i) => ({ ...o, isCorrect: i === index })))}
                  />
                  {form.type === "was_passt_nicht" ? "passt nicht dazu" : "richtig"}
                </label>
                {form.options.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setField("options", form.options.filter((_, i) => i !== index))}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
            {form.options.length < 10 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: "flex-start" }}
                onClick={() => setField("options", [...form.options, { text: "", isCorrect: false }])}
              >
                Option hinzufügen
              </button>
            )}
          </div>
        </div>
      )}

      {/* F-113: entweder_oder/wahr_falsch sind bewusst fest bei genau 2 Optionen (siehe
          adminContentItemFormUnion) — kein Hinzufügen/Entfernen. Bei wahr_falsch sind die
          Texte zusätzlich schreibgeschützt (immer "Wahr"/"Falsch", siehe defaultFormForType). */}
      {(form.type === "entweder_oder" || form.type === "wahr_falsch") && (
        <div className="field">
          <label>{form.type === "wahr_falsch" ? "Welche Einschätzung ist richtig?" : "Die zwei Antwortmöglichkeiten (genau eine richtig)"}</label>
          <div className="stack">
            {form.options.map((option, index) => (
              <div key={index} className="list-row-actions">
                <input
                  className="input"
                  value={option.text}
                  placeholder={`Option ${index + 1}`}
                  disabled={form.type === "wahr_falsch"}
                  onChange={(event) => {
                    const next = [...form.options];
                    next[index] = { ...next[index]!, text: event.target.value };
                    setField("options", next);
                  }}
                  required
                />
                <label className="field-hint" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input
                    type="radio"
                    name="ce-correct-option"
                    checked={option.isCorrect}
                    onChange={() => setField("options", form.options.map((o, i) => ({ ...o, isCorrect: i === index })))}
                  />
                  richtig
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {form.type === "zuordnung" && (
        <div className="field">
          <label>Zuordnungspaare</label>
          <div className="stack">
            {form.pairs.map((pair, index) => (
              <div key={index} className="list-row-actions">
                <input
                  className="input"
                  value={pair.left}
                  placeholder="Links"
                  onChange={(event) => {
                    const next = [...form.pairs];
                    next[index] = { ...next[index]!, left: event.target.value };
                    setField("pairs", next);
                  }}
                  required
                />
                <span aria-hidden="true">↔</span>
                <input
                  className="input"
                  value={pair.right}
                  placeholder="Rechts"
                  onChange={(event) => {
                    const next = [...form.pairs];
                    next[index] = { ...next[index]!, right: event.target.value };
                    setField("pairs", next);
                  }}
                  required
                />
                {form.pairs.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setField("pairs", form.pairs.filter((_, i) => i !== index))}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
            {form.pairs.length < 10 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: "flex-start" }}
                onClick={() => setField("pairs", [...form.pairs, { left: "", right: "" }])}
              >
                Paar hinzufügen
              </button>
            )}
          </div>
        </div>
      )}

      {form.type === "luecken" && (
        <div className="field">
          <label htmlFor="ce-luecken">Lückentext</label>
          <textarea
            className="input"
            id="ce-luecken"
            rows={4}
            value={form.lueckentextSource}
            onChange={(event) => setField("lueckentextSource", event.target.value)}
            placeholder="Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf."
            required
          />
          <p className="field-hint">Lücken mit dreifachem Unterstrich markieren: ___Stichwort___.</p>
        </div>
      )}

      {form.type === "kurzantwort" && (
        <>
          <div className="field">
            <label>Akzeptierte Antworten</label>
            <div className="stack">
              {form.acceptedAnswers.map((answer, index) => (
                <div key={index} className="list-row-actions">
                  <input
                    className="input"
                    value={answer}
                    onChange={(event) => {
                      const next = [...form.acceptedAnswers];
                      next[index] = event.target.value;
                      setField("acceptedAnswers", next);
                    }}
                    required
                  />
                  {form.acceptedAnswers.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setField("acceptedAnswers", form.acceptedAnswers.filter((_, i) => i !== index))}
                    >
                      Entfernen
                    </button>
                  )}
                </div>
              ))}
              {form.acceptedAnswers.length < 10 && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setField("acceptedAnswers", [...form.acceptedAnswers, ""])}
                >
                  Antwort hinzufügen
                </button>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="ce-matchmode">Vergleichsmodus</label>
            <select
              className="input"
              id="ce-matchmode"
              value={form.matchMode}
              onChange={(event) => setField("matchMode", event.target.value)}
            >
              <option value="exact">Exakt (nach Trimmen, ohne Groß-/Kleinschreibung)</option>
              <option value="contains">Enthält (Antwort muss den Text enthalten)</option>
            </select>
          </div>
        </>
      )}

      {form.type === "fallaufgabe" && (
        <div className="field">
          <label>Teilaufgaben</label>
          <div className="stack">
            {form.parts.map((part, index) => (
              <div key={index} className="list-row-actions">
                <input
                  className="input"
                  value={part.prompt}
                  placeholder={`Teilaufgabe ${index + 1}`}
                  onChange={(event) => {
                    const next = [...form.parts];
                    next[index] = { ...next[index]!, prompt: event.target.value };
                    setField("parts", next);
                  }}
                  required
                />
                <input
                  className="input"
                  type="number"
                  min={1}
                  style={{ width: 80 }}
                  value={part.points}
                  onChange={(event) => {
                    const next = [...form.parts];
                    next[index] = { ...next[index]!, points: Number(event.target.value) };
                    setField("parts", next);
                  }}
                  required
                />
                {form.parts.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setField("parts", form.parts.filter((_, i) => i !== index))}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
            {form.parts.length < 10 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: "flex-start" }}
                onClick={() => setField("parts", [...form.parts, { prompt: "", points: 1, bloom: null }])}
              >
                Teilaufgabe hinzufügen
              </button>
            )}
          </div>
        </div>
      )}

      {form.type === "fachgespraech_frage" && (
        <div className="field">
          <label htmlFor="ce-thematitel">Gliederungspunkt (Kontext)</label>
          <input
            className="input"
            id="ce-thematitel"
            value={form.themaTitel}
            onChange={(event) => setField("themaTitel", event.target.value)}
            required
          />
        </div>
      )}

      {form.type !== "theorie" && form.type !== "luecken" && form.type !== "karteikarte" && (
        <div className="field">
          <label htmlFor="ce-erklaerung">Erklärung (optional)</label>
          <textarea
            className="input"
            id="ce-erklaerung"
            rows={2}
            value={"explanation" in form ? (form.explanation ?? "") : ""}
            onChange={(event) => setField("explanation", event.target.value)}
          />
        </div>
      )}

      <div className="list-row-actions">
        <div className="field">
          <label htmlFor="ce-difficulty">Schwierigkeit</label>
          <select
            className="input"
            id="ce-difficulty"
            value={form.difficulty}
            onChange={(event) => setField("difficulty", event.target.value)}
          >
            <option value="leicht">Leicht</option>
            <option value="mittel">Mittel</option>
            <option value="schwer">Schwer</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="ce-bloom">Bloom-Stufe (optional)</label>
          <select
            className="input"
            id="ce-bloom"
            value={form.bloom ?? ""}
            onChange={(event) => setField("bloom", event.target.value || null)}
          >
            <option value="">Keine Angabe</option>
            {BLOOM_OPTIONS.map((bloom) => (
              <option key={bloom} value={bloom}>
                {bloom}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-row-actions">
        <label className="field-hint" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={form.isActive} onChange={(event) => setField("isActive", event.target.checked)} />
          Aktiv (sichtbar für Lernende)
        </label>
        <label className="field-hint" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={form.isPremium} onChange={(event) => setField("isPremium", event.target.checked)} />
          Premium (F-80)
        </label>
      </div>

      {isEdit && (
        <div className="field">
          <label htmlFor="ce-changenote">Änderungsnotiz (optional, F-12)</label>
          <input
            className="input"
            id="ce-changenote"
            value={changeNote}
            onChange={(event) => setChangeNote(event.target.value)}
            placeholder="z. B. Tippfehler korrigiert, Distraktor ausgetauscht"
          />
        </div>
      )}

      <div className="alert-actions">
        <button type="submit" className="btn btn-primary btn-sm" disabled={active.isPending}>
          {isEdit ? "Änderungen speichern" : "Content-Item anlegen"}
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Abbrechen
        </button>
      </div>
      {active.error && <ErrorMessage>{active.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-11: CMS-Teil des Admin-/Redaktionsbereichs (Nutzer-Entscheidung vom 19.09.2026, siehe
 * Architekturplanung Abschnitt 13) — Pflege UND Neuanlage einzelner Content-Items, unabhängig
 * vom Bulk-Import (F-17). `focusContentItemId` erlaubt einen direkten Sprung aus der F-50-
 * Fehlermeldungsliste (AdminPanel.tsx) in den Editor des gemeldeten Items.
 */
export function AdminContentEditor({
  courses,
  focusContentItemId,
  onFocusHandled,
}: {
  courses: { id: string; title: string }[];
  focusContentItemId?: string | null;
  onFocusHandled?: () => void;
}) {
  const utils = trpc.useUtils();
  const [kursId, setKursId] = useState(courses[0]?.id ?? "");
  const [themaFilter, setThemaFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<{ mode: "create"; type: AdminContentItemForm["type"] } | { mode: "edit"; contentItemId: string } | null>(
    null,
  );

  const themaTree = trpc.adminContent.themaTree.useQuery({ kursId }, { enabled: !!kursId });
  const list = trpc.adminContent.list.useQuery(
    { kursId, themaId: themaFilter || undefined, type: (typeFilter || undefined) as AdminContentItemForm["type"] | undefined },
    { enabled: !!kursId },
  );
  const editingItem = trpc.adminContent.get.useQuery(
    { contentItemId: editing?.mode === "edit" ? editing.contentItemId : "" },
    { enabled: editing?.mode === "edit" },
  );
  const setActive = trpc.adminContent.setActive.useMutation({ onSuccess: () => utils.adminContent.list.invalidate() });

  useEffect(() => {
    if (focusContentItemId) {
      setEditing({ mode: "edit", contentItemId: focusContentItemId });
      onFocusHandled?.();
    }
    // onFocusHandled bewusst nicht in den Dependencies — würde bei jedem Render von AdminPanel
    // (das eine neue Inline-Funktion übergibt) diesen Effect erneut auslösen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusContentItemId]);

  const filteredList = (list.data ?? []).filter(
    (item) => search.trim() === "" || item.prompt.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function closeEditor() {
    setEditing(null);
  }
  function saved() {
    utils.adminContent.list.invalidate();
    setEditing(null);
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Admin: Content-Redaktion (F-11)</h2>
      </div>
      <div className="list-row-actions">
        <select className="input" value={kursId} onChange={(event) => { setKursId(event.target.value); setThemaFilter(""); }}>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <select className="input" value={themaFilter} onChange={(event) => setThemaFilter(event.target.value)}>
          <option value="">Alle Themen</option>
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
        <select className="input" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="">Alle Typen</option>
          {CONTENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        <input
          className="input"
          type="search"
          placeholder="Suche im Prompt…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="list">
        {filteredList.map((item) => (
          <div key={item.id} className="list-row">
            <div className="meta">
              {item.prompt.slice(0, 100)}
              {item.prompt.length > 100 ? "…" : ""}
              <span>
                {!item.isActive && "Inaktiv · "}
                {TYPE_LABELS[item.type] ?? item.type} · {item.fachgebietTitle} — {item.themaTitle} · v{item.currentVersion}
              </span>
            </div>
            <div className="list-row-actions">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing({ mode: "edit", contentItemId: item.id })}>
                Bearbeiten
              </button>
              <button
                type="button"
                className={item.isActive ? "btn btn-danger btn-sm" : "btn btn-ghost btn-sm"}
                onClick={() => setActive.mutate({ contentItemId: item.id, isActive: !item.isActive })}
                disabled={setActive.isPending}
              >
                {item.isActive ? "Deaktivieren" : "Aktivieren"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {list.data?.length === 0 && <p className="field-hint">Keine Content-Items in dieser Auswahl.</p>}

      <div className="field">
        <label htmlFor="ce-new-type">Neues Content-Item anlegen</label>
        <div className="list-row-actions">
          <select
            className="input"
            id="ce-new-type"
            defaultValue=""
            onChange={(event) => {
              const type = event.target.value as AdminContentItemForm["type"];
              if (type) setEditing({ mode: "create", type });
              event.target.value = "";
            }}
          >
            <option value="" disabled>
              Typ wählen…
            </option>
            {CONTENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {editing?.mode === "create" && (
        <Modal title={`Neu anlegen: ${TYPE_LABELS[editing.type]}`} onClose={closeEditor}>
          <ContentItemForm
            initial={defaultFormForType(editing.type, themaFilter || themaTree.data?.[0]?.themen[0]?.id || "")}
            themaTree={themaTree.data ?? []}
            onClose={closeEditor}
            onSaved={saved}
          />
        </Modal>
      )}

      {editing?.mode === "edit" && (
        <Modal title="Content-Item bearbeiten" onClose={closeEditor}>
          {editingItem.isLoading && <p>Lädt…</p>}
          {editingItem.error && <ErrorMessage>{editingItem.error.message}</ErrorMessage>}
          {editingItem.data && (
            <ContentItemForm
              key={editing.contentItemId}
              initial={editingItem.data as AdminContentItemForm}
              contentItemId={editing.contentItemId}
              themaTree={themaTree.data ?? []}
              onClose={closeEditor}
              onSaved={saved}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
