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

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Fokus-Falle: Tab/Shift+Tab bleiben innerhalb des Panels, statt in den (unsichtbaren,
      // aber weiterhin im DOM befindlichen) Hintergrund zu wandern.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
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
  }, [onClose]);

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
