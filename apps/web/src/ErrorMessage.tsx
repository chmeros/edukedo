import type { ReactNode } from "react";

/**
 * Gemeinsame Fehlertext-Komponente (F-44) statt des bisher an elf Stellen wiederholten
 * `<p className="error">` — `role="alert"` sorgt dafür, dass Screenreader eine erst nach einer
 * fehlgeschlagenen Aktion (Formular-Absenden, Mutation) eingeblendete Fehlermeldung automatisch
 * ankündigen, statt dass Nutzer:innen sie erst durch manuelles Absuchen der Seite finden.
 */
export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="error" role="alert">
      {children}
    </p>
  );
}
