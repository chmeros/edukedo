import { LUECKEN_AUSWAHL_MIN_DISTRACTORS, QUADRANT_MODELS, type AdminContentItemForm } from "@edukedo/shared";
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
  // F-116: Mehrfachauswahl — eine, zwei, drei oder alle vier Optionen können richtig sein.
  quiz_mc_multi: "Quiz · Mehrfachauswahl",
  zuordnung: "Quiz · Zuordnung",
  // F-113 Teil 2: vier vorgegebene Elemente per Drag-and-Drop in die richtige Reihenfolge bringen.
  sortieren: "Quiz · Sortieren",
  // F-114: visuelle Zuordnungs-Variante mit festen Zonen (siehe Architekturplanung Abschnitt 13).
  swot: "Quiz · SWOT-Matrix",
  bsc: "Quiz · Balanced Scorecard",
  ansoff: "Quiz · Ansoff-Matrix",
  // F-114 Teil 2: wie swot/bsc/ansoff, aber die Zeitabschnitte sind content-autoriert statt fest
  // im Code (siehe Architekturplanung Abschnitt 13).
  gantt: "Quiz · Gantt-Diagramm",
  luecken: "Quiz · Lückentext",
  // F-115: Alternative Bedienform — Wörter per Drag-and-Drop aus einem Pool statt Freitext.
  luecken_auswahl: "Quiz · Lückentext (Wortauswahl)",
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
    case "quiz_mc_multi":
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
    // F-113 Teil 2: vier leere Elemente, die Redaktion trägt sie in der richtigen Reihenfolge ein.
    case "sortieren":
      return {
        type,
        prompt: "",
        explanation: "",
        items: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        ...common,
      };
    // F-114: je ein leerer Begriff pro Zone als Starthilfe — ein SWOT-Feld hat z. B. immer
    // genau die vier festen Zonen aus QUADRANT_MODELS (siehe Architekturplanung Abschnitt 13).
    case "swot":
    case "bsc":
    case "ansoff":
      return {
        type,
        prompt: "",
        explanation: "",
        terms: QUADRANT_MODELS[type].zones.map((zone) => ({ text: "", zoneKey: zone.key })),
        ...common,
      };
    // F-114 Teil 2: zwei leere Zeitabschnitte als Starthilfe, je zwei leere Begriffe pro
    // Abschnitt (Mindestanzahl 4 Begriffe, siehe adminContentItemFormUnion).
    case "gantt":
      return {
        type,
        prompt: "",
        explanation: "",
        periods: ["Phase 1", "Phase 2"],
        terms: [
          { text: "", periodIndex: 0 },
          { text: "", periodIndex: 0 },
          { text: "", periodIndex: 1 },
          { text: "", periodIndex: 1 },
        ],
        ...common,
      };
    case "luecken":
      return { type, explanation: "", lueckentextSource: "", ...common };
    case "luecken_auswahl":
      return {
        type,
        explanation: "",
        lueckentextSource: "",
        distractors: Array.from({ length: LUECKEN_AUSWAHL_MIN_DISTRACTORS }, () => ""),
        ...common,
      };
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

      {form.type !== "luecken" && form.type !== "luecken_auswahl" && (
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

      {/* F-116: Mehrfachauswahl — Checkboxen statt Radio-Buttons, da hier mehr als eine Option
          richtig sein darf (mindestens eine, siehe adminContentItemFormSchema). */}
      {form.type === "quiz_mc_multi" && (
        <div className="field">
          <label>Antwortoptionen (mindestens eine richtig)</label>
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
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(event) => {
                      const next = [...form.options];
                      next[index] = { ...next[index]!, isCorrect: event.target.checked };
                      setField("options", next);
                    }}
                  />
                  richtig
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

      {/* F-113 Teil 2 (Sortieren): die Eingabe-Reihenfolge IST die richtige Reihenfolge — kein
          separates Positions-Feld, kein Hinzufügen/Entfernen (fest auf genau 4 Elemente, siehe
          Anforderungskatalog "vier vorgegebene Elemente"). */}
      {form.type === "sortieren" && (
        <div className="field">
          <label>Elemente in der richtigen Reihenfolge</label>
          <div className="stack">
            {form.items.map((sortierenItem, index) => (
              <div key={index} className="list-row-actions">
                <span aria-hidden="true">{index + 1}.</span>
                <input
                  className="input"
                  value={sortierenItem.text}
                  placeholder={`Element ${index + 1}`}
                  onChange={(event) => {
                    const next = [...form.items];
                    next[index] = { text: event.target.value };
                    setField("items", next);
                  }}
                  required
                />
              </div>
            ))}
          </div>
          <p className="field-hint">
            Die Reihenfolge dieser vier Felder ist die richtige Reihenfolge — Lernende sehen die Elemente gemischt.
          </p>
        </div>
      )}

      {/* F-114: SWOT-Matrix/Balanced Scorecard/Ansoff-Matrix — Begriffe der jeweils festen Zone
          des gewählten Modells zuordnen (QUADRANT_MODELS, siehe Architekturplanung Abschnitt 13).
          Die Zonen selbst sind nicht editierbar, nur welcher Begriff zu welcher Zone gehört. */}
      {(form.type === "swot" || form.type === "bsc" || form.type === "ansoff") && (
        <div className="field">
          <label>Begriffe ({QUADRANT_MODELS[form.type].zones.map((zone) => zone.label).join(" / ")})</label>
          <div className="stack">
            {form.terms.map((term, index) => (
              <div key={index} className="list-row-actions">
                <input
                  className="input"
                  value={term.text}
                  placeholder={`Begriff ${index + 1}`}
                  onChange={(event) => {
                    const next = [...form.terms];
                    next[index] = { ...next[index]!, text: event.target.value };
                    setField("terms", next);
                  }}
                  required
                />
                <select
                  className="input"
                  value={term.zoneKey}
                  onChange={(event) => {
                    const next = [...form.terms];
                    next[index] = { ...next[index]!, zoneKey: event.target.value };
                    setField("terms", next);
                  }}
                >
                  {QUADRANT_MODELS[form.type].zones.map((zone) => (
                    <option key={zone.key} value={zone.key}>
                      {zone.label}
                    </option>
                  ))}
                </select>
                {form.terms.length > 4 && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setField("terms", form.terms.filter((_, i) => i !== index))}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
            {form.terms.length < 20 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: "flex-start" }}
                onClick={() =>
                  setField("terms", [...form.terms, { text: "", zoneKey: QUADRANT_MODELS[form.type].zones[0]!.key }])
                }
              >
                Begriff hinzufügen
              </button>
            )}
          </div>
        </div>
      )}

      {/* F-114 Teil 2 (Gantt-Diagramm, siehe Architekturplanung Abschnitt 13): wie swot/bsc/ansoff,
          aber die Zeitabschnitte sind hier selbst Teil des Formulars statt fest im Code — beim
          Entfernen eines Abschnitts werden referenzierende Begriffe auf den ersten verbleibenden
          Abschnitt zurückgesetzt statt eine ungültige Referenz zu behalten. */}
      {form.type === "gantt" && (
        <>
          <div className="field">
            <label>Zeitabschnitte</label>
            <div className="stack">
              {form.periods.map((period, index) => (
                <div key={index} className="list-row-actions">
                  <input
                    className="input"
                    value={period}
                    placeholder={`Zeitabschnitt ${index + 1}, z. B. „Woche 1–2"`}
                    onChange={(event) => {
                      const next = [...form.periods];
                      next[index] = event.target.value;
                      setField("periods", next);
                    }}
                    required
                  />
                  {form.periods.length > 2 && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        const nextPeriods = form.periods.filter((_, i) => i !== index);
                        const nextTerms = form.terms.map((term) =>
                          term.periodIndex === index
                            ? { ...term, periodIndex: 0 }
                            : term.periodIndex > index
                              ? { ...term, periodIndex: term.periodIndex - 1 }
                              : term,
                        );
                        setField("periods", nextPeriods);
                        setField("terms", nextTerms);
                      }}
                    >
                      Entfernen
                    </button>
                  )}
                </div>
              ))}
              {form.periods.length < 6 && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setField("periods", [...form.periods, ""])}
                >
                  Zeitabschnitt hinzufügen
                </button>
              )}
            </div>
          </div>
          <div className="field">
            <label>Begriffe (je einem Zeitabschnitt zugeordnet)</label>
            <div className="stack">
              {form.terms.map((term, index) => (
                <div key={index} className="list-row-actions">
                  <input
                    className="input"
                    value={term.text}
                    placeholder={`Begriff ${index + 1}`}
                    onChange={(event) => {
                      const next = [...form.terms];
                      next[index] = { ...next[index]!, text: event.target.value };
                      setField("terms", next);
                    }}
                    required
                  />
                  <select
                    className="input"
                    value={term.periodIndex}
                    onChange={(event) => {
                      const next = [...form.terms];
                      next[index] = { ...next[index]!, periodIndex: Number(event.target.value) };
                      setField("terms", next);
                    }}
                  >
                    {form.periods.map((period, periodIndex) => (
                      <option key={periodIndex} value={periodIndex}>
                        {period || `Zeitabschnitt ${periodIndex + 1}`}
                      </option>
                    ))}
                  </select>
                  {form.terms.length > 4 && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setField("terms", form.terms.filter((_, i) => i !== index))}
                    >
                      Entfernen
                    </button>
                  )}
                </div>
              ))}
              {form.terms.length < 20 && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setField("terms", [...form.terms, { text: "", periodIndex: 0 }])}
                >
                  Begriff hinzufügen
                </button>
              )}
            </div>
          </div>
        </>
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

      {/* F-115: dasselbe lueckentextSource-Autorenformat wie "luecken", zusätzlich die
          Distraktoren (Begriffe ohne passende Lücke) für den Wortpool. */}
      {form.type === "luecken_auswahl" && (
        <>
          <div className="field">
            <label htmlFor="ce-luecken-auswahl">Lückentext</label>
            <textarea
              className="input"
              id="ce-luecken-auswahl"
              rows={4}
              value={form.lueckentextSource}
              onChange={(event) => setField("lueckentextSource", event.target.value)}
              placeholder="Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf."
              required
            />
            <p className="field-hint">Lücken mit dreifachem Unterstrich markieren: ___Stichwort___.</p>
          </div>
          <div className="field">
            <label>Zusätzliche Begriffe ohne passende Lücke (Distraktoren, mindestens {LUECKEN_AUSWAHL_MIN_DISTRACTORS})</label>
            <div className="stack">
              {form.distractors.map((distractor, index) => (
                <div key={index} className="list-row-actions">
                  <input
                    className="input"
                    value={distractor}
                    placeholder={`Begriff ${index + 1}`}
                    onChange={(event) => {
                      const next = [...form.distractors];
                      next[index] = event.target.value;
                      setField("distractors", next);
                    }}
                    required
                  />
                  {form.distractors.length > LUECKEN_AUSWAHL_MIN_DISTRACTORS && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setField("distractors", form.distractors.filter((_, i) => i !== index))}
                    >
                      Entfernen
                    </button>
                  )}
                </div>
              ))}
              {form.distractors.length < 15 && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setField("distractors", [...form.distractors, ""])}
                >
                  Begriff hinzufügen
                </button>
              )}
            </div>
          </div>
        </>
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

  /**
   * Code-Review-Fund (22.09.2026, siehe Architekturplanung Abschnitt 13): create/update/
   * setActive invalidierten bisher nur `adminContent.list` — anders als der benachbarte
   * `triggerImport` (AdminPanel.tsx), der bei genau derselben Art von Änderung (Content-Items
   * werden ersetzt/geändert) konsequent auch die Lern-seitigen Queries mit invalidiert. Eine
   * einzelne Bearbeitung/Deaktivierung ist dieselbe Änderungskategorie wie ein Bulk-Import, nur
   * kleiner — ohne diese Invalidierung sahen Quiz-/Karteikarten-/Theorie-Listen eine soeben
   * bearbeitete oder deaktivierte Frage weiterhin im alten Zustand, bis irgendetwas anderes
   * zufällig neu lud.
   */
  function invalidateContentCaches() {
    utils.adminContent.list.invalidate();
    utils.content.theorySections.invalidate();
    utils.content.dueCards.invalidate();
    utils.quiz.quizItems.invalidate();
    utils.progress.overview.invalidate();
  }

  const setActive = trpc.adminContent.setActive.useMutation({ onSuccess: invalidateContentCaches });

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
    invalidateContentCaches();
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
