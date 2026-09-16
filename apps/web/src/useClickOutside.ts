import { useEffect } from "react";

/** Schließt ein Dropdown/Menü bei Klick außerhalb von `ref` — genutzt von CourseMenu/UserMenu. */
export function useClickOutside(ref: React.RefObject<HTMLElement | null>, onOutside: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [active, ref, onOutside]);
}
