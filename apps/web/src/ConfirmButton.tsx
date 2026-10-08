import { useState } from "react";

/**
 * Review WEB-24/UXL-11: Folgenreiche Aktionen (Mitglied entfernen, Kohorte beenden, Kurs verlassen, Lizenz entziehen ...) liefen mit
 * einem einzigen Klick. Diese Schaltfläche fragt zuerst nach, an Ort und Stelle (ohne Dialog, der Fokus bleibt in der Zeile): erst
 * "Entfernen", dann "Ja, wirklich" oder "Abbrechen".
 */
export function ConfirmButton({
  label,
  question,
  confirmLabel = "Ja, wirklich",
  onConfirm,
  disabled = false,
  className = "btn btn-ghost btn-sm",
}: {
  label: string;
  /** Kurze Rückfrage mit den Folgen, z. B. "Mitglied wirklich entfernen?". */
  question: string;
  confirmLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <button type="button" className={className} disabled={disabled} onClick={() => setAsking(true)}>
        {label}
      </button>
    );
  }
  return (
    <span role="group" aria-label={question} style={{ display: "inline-flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <span>{question}</span>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        autoFocus
        disabled={disabled}
        onClick={() => {
          setAsking(false);
          onConfirm();
        }}
      >
        {confirmLabel}
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAsking(false)}>
        Abbrechen
      </button>
    </span>
  );
}
