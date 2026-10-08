import { useState } from "react";

/**
 * Review UXL-09/UXL-11: Codes (Einladung, Kohorte, Unternehmen) lassen sich mit einem Klick kopieren, statt sie abzutippen.
 * Fällt die Zwischenablage aus (nur HTTPS/Berechtigung), bleibt der Code sichtbar und markierbar; die Schaltfläche meldet es.
 */
export function CopyButton({ text, label = "Kopieren" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      aria-label={`${label}: ${text}`}
      onClick={() => {
        navigator.clipboard
          .writeText(text)
          .then(() => setState("copied"))
          .catch(() => setState("failed"))
          .finally(() => window.setTimeout(() => setState("idle"), 2000));
      }}
    >
      {state === "copied" ? "Kopiert ✓" : state === "failed" ? "Nicht möglich" : label}
    </button>
  );
}
