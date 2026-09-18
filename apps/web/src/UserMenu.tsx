import { useRef, useState } from "react";
import { DeleteAccount } from "./DeleteAccount";
import { useDismissableMenu } from "./useDismissableMenu";

const ROLE_LABELS: Record<string, string> = {
  learner: "Lernende:r",
  admin: "Admin",
};

/**
 * Nutzer-Menü im globalen Header (Layout-Vereinheitlichung, siehe Architekturplanung
 * Abschnitt 13, Entscheidung vom 16.09.2026) — löst die bisherige, mitten im Lernbereich
 * stehende "Eingeloggt als ..."-Zeile samt Logout/Konto-löschen ab. Der Admin-Bereich-
 * Umschalter (`view`) lebt bewusst hier statt als eigener Tab in der Lern-Tab-Leiste: Er
 * gehört konzeptionell zur Rolle der Person, nicht zu den Lerninhalten.
 */
export function UserMenu({
  email,
  role,
  isMinor,
  onLogout,
  logoutPending,
  isAdmin,
  view,
  onViewChange,
}: {
  email: string;
  role: string;
  isMinor: boolean;
  onLogout: () => void;
  logoutPending: boolean;
  isAdmin: boolean;
  view: "app" | "admin" | "courses";
  onViewChange: (view: "app" | "admin") => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useDismissableMenu(menuRef, triggerRef, open, () => setOpen(false));

  return (
    <div className="header-menu" ref={menuRef}>
      <button
        type="button"
        ref={triggerRef}
        className="header-menu-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="header-menu-trigger-label">{email}</span>
        <span aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="header-menu-panel">
          <p className="who">
            Eingeloggt als <b>{email}</b>
            {isMinor ? " · minderjährig" : ""} · <span className="role-pill">{ROLE_LABELS[role] ?? role}</span>
          </p>
          {isAdmin && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ alignSelf: "flex-start" }}
              onClick={() => {
                onViewChange(view === "admin" ? "app" : "admin");
                setOpen(false);
              }}
            >
              {view === "admin" ? "← Zur Lern-App" : "Verwaltung öffnen"}
            </button>
          )}
          <hr />
          <div className="user-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              disabled={logoutPending}
            >
              Logout
            </button>
            <DeleteAccount />
          </div>
        </div>
      )}
    </div>
  );
}
