import { useSyncExternalStore } from "react";

/**
 * F-155 (Darstellung: Hell/Dunkel und „Ruhiger Modus", Nutzer-Feedback vom 05.10.2026, siehe
 * Architekturplanung Abschnitt 13): reine Darstellungs-Präferenzen dieses Browsers — bewusst in
 * `localStorage` statt serverseitig (wie die Karteikarten-Startseite F-110): kein Datenmodell-
 * Eingriff, wirkt sofort auch vor dem Login, und ein Gerät darf anders eingestellt sein als ein
 * anderes. Jeder Zugriff ist in try/catch gekapselt (privater Modus, gesperrter Speicher); dann
 * gilt die Einstellung nur bis zum Neuladen (Speicher im Arbeitsspeicher).
 *
 * - Theme: "system" (Standard, folgt `prefers-color-scheme`), "light" oder "dark" — gesetzt über
 *   `data-theme` am `<html>`, wofür styles.css beide Blöcke bereits enthält.
 * - Ruhiger Modus: blendet Punktehamster, Lernserie und Credits aus (siehe App.tsx) und blendet den
 *   Countdown der Prüfungssimulation standardmäßig aus (siehe Exam.tsx) — für Personen, die
 *   Spielelemente unter Druck setzen.
 */
export type Theme = "system" | "light" | "dark";

const THEME_KEY = "edukedo.theme";
const CALM_KEY = "edukedo.calmMode";

const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function read(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string | null) {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Nur Komfort — die Einstellung gilt dann bis zum Neuladen.
  }
  apply();
  listeners.forEach((listener) => listener());
}

function readTheme(): Theme {
  const value = read(THEME_KEY);
  return value === "light" || value === "dark" ? value : "system";
}

function readCalm(): boolean {
  return read(CALM_KEY) === "1";
}

function apply() {
  const root = document.documentElement;
  const theme = readTheme();
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  if (readCalm()) root.dataset.calm = "1";
  else delete root.dataset.calm;
}

/** Einmal beim App-Start aufrufen (main.tsx), damit die gespeicherte Darstellung sofort gilt. */
export function initDisplayPrefs() {
  apply();
}

export function setTheme(theme: Theme) {
  write(THEME_KEY, theme === "system" ? null : theme);
}

export function setCalmMode(enabled: boolean) {
  write(CALM_KEY, enabled ? "1" : null);
}

export function getCalmMode(): boolean {
  return readCalm();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "system");
}

export function useCalmMode(): boolean {
  return useSyncExternalStore(subscribe, readCalm, () => false);
}
