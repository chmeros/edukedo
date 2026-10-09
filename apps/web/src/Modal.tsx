import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Redesign 17.09.2026 (siehe Architekturplanung Abschnitt 13): erste echte Modal-Komponente im
 * Projekt — löst mehrere bisherige "Inline-Bestätigung innerhalb eines Dropdowns/einer Zeile"-
 * Muster ab (Konto löschen, Melden, Blockieren), die kein Backdrop, keinen Fokus-Trap und kein
 * Scroll-Lock hatten. Bewusst getrennt von `useDismissableMenu` (Dropdown-Zweck: lokales Panel,
 * kein Hintergrund-Unterbrechen) statt es wiederzuverwenden — ein Modal braucht zusätzlich einen
 * Backdrop-Klick-Handler, eine Fokus-Falle und ein Scroll-Lock, die für ein Dropdown unnötig
 * bzw. falsch wären.
 */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Aufrufer übergeben meist eine neue Inline-Funktion pro Render. Würde der Effekt an `onClose` hängen,
  // liefe er bei jedem Re-Render (z. B. bei jedem getippten Zeichen) neu und `panelRef.focus()` risse den
  // Fokus aus dem Eingabefeld (Review-Befund WEB-02). Deshalb wird der aktuelle Handler nur in einer Ref gehalten.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Review UXT-B-01: Enthält der Dialog ein Feld mit `data-autofocus`, bekommt dieses den Fokus (sofort tippen), sonst das Panel.
    (panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panelRef.current)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      // Fokus-Falle: Tab/Shift+Tab bleiben innerhalb des Panels, statt in den (unsichtbaren,
      // aber weiterhin im DOM befindlichen) Hintergrund zu wandern.
      if (event.key !== "Tab" || !panelRef.current) return;
      // Review WEB-26: Deaktivierte und unsichtbare Elemente zählen nicht als Fokusziele; das Panel selbst (Startfokus) auch nicht.
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((element) => element.offsetParent !== null || element === document.activeElement);
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="modal-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="modal-close" aria-label="Schließen" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
