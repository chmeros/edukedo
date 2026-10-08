import { zahlLesehinweis } from "@edukedo/shared";
import { useState, type ComponentPropsWithoutRef } from "react";

/**
 * Review WRK-06: Rahmen um die Eingabefelder eines Rechners. Schreibt jemand eine mehrdeutige Zahl wie „2.500“ (Punkt =
 * Tausendertrennung, gelesen 2500), steht darunter, wie sie gelesen wurde. Ein Baustein für alle Felder des Rahmens (Ereignis
 * „input“ steigt auf), statt jedes der vielen Zahlenfelder einzeln zu ändern; erfasst werden Felder mit `inputMode="decimal"`.
 */
export function ZahlLesehinweis({ children, ...rest }: ComponentPropsWithoutRef<"div">) {
  const [hinweis, setHinweis] = useState<string | null>(null);
  return (
    <div
      {...rest}
      onInput={(event) => {
        const feld = event.target;
        if (!(feld instanceof HTMLInputElement) || feld.inputMode !== "decimal") return;
        const text = zahlLesehinweis(feld.value);
        const name = feld.getAttribute("aria-label") ?? feld.labels?.[0]?.textContent ?? "Eingabe";
        setHinweis(text ? `${name}: ${text}` : null);
      }}
    >
      {children}
      <div aria-live="polite">{hinweis && <p className="field-hint">{hinweis}</p>}</div>
    </div>
  );
}
