import type { CSSProperties, ReactNode } from "react";

/**
 * F-144 (durchgängiges Kacheldesign, Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung
 * Abschnitt 13): gemeinsame Kachel für Spiele, Fortschritt, Instrumente, Kursauswahl, Erfolge und
 * Sozial-Bereiche — Vorbild war die Spiele-Kachel (F-140). Zwei Varianten:
 *  - `onClick` ohne `actions` → die ganze Kachel ist ein `<button>` (Spiele, Fortschritt).
 *  - sonst `<article>` mit optionaler Aktionsleiste (verschachtelte Buttons wären in einem
 *    `<button>` ungültiges HTML — Instrumente, Kursauswahl, Sozial).
 *
 * `fill` (0–100) zeichnet einen Füllstand von unten nach oben in hellem, transparentem Blau
 * (siehe `.tile-fill` in styles.css): Der Text liegt darüber und bleibt lesbar, die Zahl steht
 * zusätzlich immer als Text da (`meta`) — die Füllung allein trägt keine Information (`aria-hidden`).
 */
export interface TileProps {
  title: ReactNode;
  description?: ReactNode;
  /** Kurzer Wert unter dem Titel, z. B. „63 % (41/65)". */
  meta?: ReactNode;
  /** Illustration/Symbol oberhalb des Textes (Bannerformat 16:7, SVG mit viewBox 320×140). */
  image?: ReactNode;
  /** Füllstand in Prozent (0–100), von unten nach oben. */
  fill?: number;
  size?: "md" | "sm";
  active?: boolean;
  disabled?: boolean;
  /** Hinweis in Kursivschrift am Ende, z. B. „In diesem Kurs noch nicht verfügbar". */
  note?: ReactNode;
  actions?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
  "aria-expanded"?: boolean;
  className?: string;
}

export function Tile({
  title,
  description,
  meta,
  image,
  fill,
  size = "md",
  active,
  disabled,
  note,
  actions,
  onClick,
  children,
  "aria-expanded": ariaExpanded,
  className,
}: TileProps) {
  const asButton = onClick !== undefined && actions === undefined;
  const classes = [
    "tile",
    size === "sm" ? "tile-sm" : "",
    active ? "is-active" : "",
    disabled ? "is-disabled" : "",
    asButton && !disabled ? "is-clickable" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const style =
    fill === undefined
      ? undefined
      : ({ "--tile-fill": `${Math.min(100, Math.max(0, fill))}%` } as CSSProperties);

  const content = (
    <>
      {image && <span className="tile-image">{image}</span>}
      {fill !== undefined && <span className="tile-fill" aria-hidden="true" />}
      <span className="tile-body">
        <span className="tile-title">{title}</span>
        {meta && <span className="tile-meta">{meta}</span>}
        {description && <span className="tile-description">{description}</span>}
        {children}
        {note && <span className="tile-note">{note}</span>}
      </span>
      {actions && <span className="tile-actions">{actions}</span>}
    </>
  );

  if (asButton) {
    return (
      <button
        type="button"
        className={classes}
        style={style}
        disabled={disabled}
        aria-expanded={ariaExpanded}
        onClick={() => !disabled && onClick()}
      >
        {content}
      </button>
    );
  }
  return (
    <article className={classes} style={style}>
      {content}
    </article>
  );
}
