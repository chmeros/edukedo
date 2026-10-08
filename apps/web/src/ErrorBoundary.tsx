import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Review-Befund B10 (WRK, WEB): Ein Renderfehler in einer Komponente ließ bisher den gesamten React-Baum verschwinden — ein
 * leerer weißer Bildschirm ohne Erklärung und ohne Weg zurück. Diese Grenze fängt Renderfehler ab, zeigt eine verständliche
 * Meldung und bietet „Erneut versuchen“ an. Sie wird zweimal eingesetzt: um die ganze App (letzte Rückfallebene) und um den
 * Inhalt eines Lernbereichs, damit Kopfzeile und Navigation bei einem Fehler in einem Werkzeug erhalten bleiben.
 *
 * Fängt nur Fehler beim Rendern und in Lebenszyklus-Methoden. Fehler in Ereignishandlern und in asynchronem Code (z. B.
 * fehlgeschlagene Netzwerkaufrufe) fängt React-Error-Boundary-Technik nicht; dafür bleibt die jeweilige Fehleranzeige zuständig.
 */
interface Props {
  children: ReactNode;
  /** Ändert sich dieser Wert (z. B. der gewählte Lernbereich), wird der Fehlerzustand zurückgesetzt. */
  resetKey?: string | number | null;
  /** Kurzer Name des Bereichs für die Meldung, z. B. „Dieser Bereich“. */
  bereich?: string;
  /** Vollbild-Variante (oberste Ebene) statt eingebettetem Hinweis. */
  vollbild?: boolean;
}

interface State {
  fehler: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { fehler: null };

  static getDerivedStateFromError(fehler: Error): State {
    return { fehler };
  }

  componentDidCatch(fehler: Error, info: ErrorInfo): void {
    console.error("Renderfehler abgefangen:", fehler, info.componentStack);
  }

  componentDidUpdate(vorher: Props): void {
    if (this.state.fehler && vorher.resetKey !== this.props.resetKey) {
      this.setState({ fehler: null });
    }
  }

  render(): ReactNode {
    if (!this.state.fehler) return this.props.children;
    const bereich = this.props.bereich ?? "Dieser Bereich";
    return (
      <div className={this.props.vollbild ? "shell shell--narrow" : undefined} role="alert">
        <div className="card stack">
          <h2>{bereich} konnte nicht angezeigt werden</h2>
          <p>
            Beim Anzeigen ist ein unerwarteter Fehler aufgetreten. Deine bisherigen Lernergebnisse sind nicht betroffen. Du kannst
            es erneut versuchen oder die Seite neu laden.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.setState({ fehler: null })}>
              Erneut versuchen
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.location.reload()}>
              Seite neu laden
            </button>
          </div>
        </div>
      </div>
    );
  }
}
