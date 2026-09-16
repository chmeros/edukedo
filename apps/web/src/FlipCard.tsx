import type { ReactNode } from "react";

/**
 * Durchgängige Interaktionsidee aus dem Design-Entwurf (design/01-landing-und-app-vorschau.html,
 * siehe design/README.md): Karteikarten als 3D-Flip-Card statt Button-Reveal — macht das
 * Kernprodukt (FSRS-Spaced-Repetition-Karteikarten) auch auf der Landing Page wiedererkennbar.
 * Gesteuert (flipped/onToggle) statt intern verwaltet, damit Flashcards.tsx den Zustand beim
 * Wechsel zur nächsten Karte zurücksetzen kann.
 */
export function FlipCard({
  flipped,
  onToggle,
  front,
  back,
}: {
  flipped: boolean;
  onToggle: () => void;
  front: ReactNode;
  back: ReactNode;
}) {
  return (
    <div className="flip-scene">
      <div
        className={flipped ? "flip-card is-flipped" : "flip-card"}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Beide Seiten liegen unabhängig vom Umdreh-Zustand immer im DOM (siehe 3D-Flip
            oben in styles.css) — `backface-visibility: hidden` blendet die Rückseite nur
            visuell aus, ein Screenreader würde ohne `aria-hidden` sonst Frage- UND
            Antworttext gleichzeitig vorlesen, egal welche Seite gerade sichtbar ist (F-44). */}
        <div className="flip-face flip-front" aria-hidden={flipped}>
          {front}
        </div>
        <div className="flip-face flip-back" aria-hidden={!flipped}>
          {back}
        </div>
      </div>
    </div>
  );
}
