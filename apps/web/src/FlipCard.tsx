import type { ReactNode } from "react";

/**
 * Durchgängige Interaktionsidee aus dem Design-Entwurf (design/01-landing-und-app-vorschau.html,
 * siehe design/README.md): Karteikarten als 3D-Flip-Card statt Button-Reveal — macht das
 * Kernprodukt (FSRS-Spaced-Repetition-Karteikarten) auch auf der Landing Page wiedererkennbar.
 * Gesteuert (flipped/onToggle) statt intern verwaltet, damit Flashcards.tsx den Zustand beim
 * Wechsel zur nächsten Karte zurücksetzen kann.
 *
 * `stacked` (Design-Vorschlag, 17.09.2026): blendet zwei angedeutete Karten hinter der
 * eigentlichen Karte ein (siehe .flip-stack in styles.css) — visualisiert beiläufig, dass noch
 * weitere Karten im Stapel warten, statt die Karte rein dekorativ einzufärben. Bewusst optional
 * (Standard `false`): die Landing-Page-Beispielkarte zeigt nur eine einzelne Demo-Karte, kein
 * echter Stapel, und soll das nicht vortäuschen.
 */
export function FlipCard({
  flipped,
  onToggle,
  front,
  back,
  stacked = false,
}: {
  flipped: boolean;
  onToggle: () => void;
  front: ReactNode;
  back: ReactNode;
  stacked?: boolean;
}) {
  return (
    <div className="flip-scene">
      {stacked && (
        <>
          <div className="flip-stack flip-stack-2" aria-hidden="true" />
          <div className="flip-stack flip-stack-1" aria-hidden="true" />
        </>
      )}
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
