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
      // Ein Modal, das aus dem Menü geöffnet wurde, liegt per Portal außerhalb von `menuRef`. Klicks darin
      // dürfen das Menü nicht schließen, sonst wird das Modal beim ersten Klick mit entfernt (Review-Befund WEB-01).
      if ((event.target as Element | null)?.closest?.(".modal-backdrop")) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onDismiss();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      // Bei offenem Modal schließt Escape nur das Modal (das Modal behandelt die Taste selbst).
      if (document.querySelector(".modal-backdrop")) return;
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
