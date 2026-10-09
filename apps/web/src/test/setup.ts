import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ohne `globals: true` räumt Testing Library nicht von selbst auf: gerenderte Komponenten werden nach jedem Test ausgehängt.
afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});
