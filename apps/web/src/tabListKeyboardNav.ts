import type { RefObject } from "react";

/**
 * Pfeiltasten-Navigation (Links/Rechts/Pos1/Ende) für das ARIA-Tablist-Muster (F-44) — von
 * App.tsx (Lernmodus-Tabs, Login/Registrieren-Umschalter) und Pruefungsvorbereitung.tsx
 * (Prüfungsvorbereitungs-Umschalter) geteilt, da alle drei identisch aufgebaute Tab-Leisten mit
 * "roving tabindex" sind (nur der aktive Tab ist per Tab-Taste erreichbar, die Pfeiltasten
 * wechseln zwischen den übrigen — siehe WAI-ARIA Authoring Practices "Tabs"). Aktiviert die
 * Auswahl sofort beim Wechseln ("automatic activation"), passend zum bisherigen Klick-Verhalten
 * dieser Tab-Leisten.
 */
export function handleTabListKeyDown(
  event: React.KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  count: number,
  tabRefs: RefObject<(HTMLButtonElement | null)[]>,
  onSelect: (index: number) => void,
) {
  let nextIndex: number | null = null;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % count;
  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + count) % count;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = count - 1;
  if (nextIndex === null) return;
  event.preventDefault();
  onSelect(nextIndex);
  tabRefs.current?.[nextIndex]?.focus();
}
