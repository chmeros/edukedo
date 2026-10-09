/**
 * Lädt die App neu auf der Startseite. Eigene Funktion, damit sich der Seitenwechsel in Tests ersetzen lässt (jsdom kann nicht navigieren).
 */
export function zurStartseite() {
  window.location.replace("/");
}
