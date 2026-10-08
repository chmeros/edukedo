import { useId, useState } from "react";

/**
 * Review WRK-47: Jede Übungsaufgabe der Trainer entsteht aus einer Aufgabennummer (dem Startwert des Zufallsgenerators). Dieselbe Nummer
 * mit derselben Aufgabenart und Schwierigkeit ergibt dieselbe Aufgabe: Lehrkräfte können eine Aufgabe nennen ("Aufgabe 482913"),
 * Lernende können sie nochmal laden oder teilen.
 */
export const MAX_AUFGABENNUMMER = 2147483647;

/** Liest eine Aufgabennummer (nur Ziffern, 1 bis 2147483647); sonst `null`. */
export function leseAufgabennummer(text: string): number | null {
  const bereinigt = text.trim();
  if (!/^\d{1,10}$/.test(bereinigt)) return null;
  const nummer = Number(bereinigt);
  return nummer >= 1 && nummer <= MAX_AUFGABENNUMMER ? nummer : null;
}

export function AufgabenNummer({ nummer, onLaden }: { nummer: number; onLaden: (nummer: number) => void }) {
  const id = useId();
  const [eingabe, setEingabe] = useState("");
  const [fehler, setFehler] = useState(false);
  return (
    <details className="field-hint">
      <summary>Aufgabennummer: {nummer}</summary>
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          const gelesen = leseAufgabennummer(eingabe);
          if (gelesen === null) {
            setFehler(true);
            return;
          }
          setFehler(false);
          setEingabe("");
          onLaden(gelesen);
        }}
      >
        <span>Mit derselben Aufgabenart und Schwierigkeit ergibt die Nummer {nummer} immer dieselbe Aufgabe. Zum Weitergeben oder zum Wiederholen.</span>
        <label htmlFor={id}>Nummer laden</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input id={id} className="input" style={{ maxWidth: "10rem" }} inputMode="numeric" autoComplete="off" value={eingabe} onChange={(event) => setEingabe(event.target.value)} />
          <button type="submit" className="btn btn-secondary btn-sm">
            Laden
          </button>
        </div>
        {fehler && <span className="subnet-fehler" role="alert">Bitte eine Zahl zwischen 1 und {MAX_AUFGABENNUMMER} eingeben.</span>}
      </form>
    </details>
  );
}
