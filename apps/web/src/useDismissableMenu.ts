import { useEffect } from "react";

/**
 * Schließt ein Dropdown/Menü (CourseSwitcher/UserMenu) bei Klick außerhalb ODER bei Escape —
 * vorher (`useClickOutside`) nur per Maus schließbar (F-44). Bei Escape wandert der Fokus
 * zusätzlich zurück auf `triggerRef`, da er sonst auf einem gerade unsichtbar gewordenen
 * Element im Panel "verschwindet" (Standard-Verhalten für ein Disclosure-Widget, siehe
 * WAI-ARIA Authoring Practices).
 */
export function useDismissableMenu(
  menuRef: React.RefObject<HTMLElement | null>,
  triggerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onDismiss();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, menuRef, triggerRef, onDismiss]);
}
