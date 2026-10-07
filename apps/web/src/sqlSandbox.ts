import type { SqlDatensatzId, SqlTabelle, SqlUebung } from "@edukedo/shared";

/**
 * F-167: Schnittstelle zwischen der SQL-Übungsfläche und dem Web Worker (sqlWorker.ts), in dem SQLite
 * (sql.js, WebAssembly) läuft. Der Worker hat keinen Netzwerk- oder Dateizugriff auf Lerndaten; die
 * Datenbank liegt nur im Arbeitsspeicher der Sitzung. Läuft eine Anweisung zu lange (z. B. eine
 * unbegrenzte rekursive Abfrage), beendet `SqlSandbox` den Worker nach einer Frist — der Browser-Tab
 * bleibt bedienbar.
 */
export interface SqlAnzeigeTabelle extends SqlTabelle {
  /** Anzahl aller Ergebniszeilen (kann größer sein als `zeilen.length`, die Anzeige ist begrenzt). */
  gesamtZeilen: number;
}

export type SqlAnfrage =
  | { id: number; art: "ausfuehren"; datensatz: SqlDatensatzId; sql: string }
  | { id: number; art: "zuruecksetzen"; datensatz: SqlDatensatzId }
  | { id: number; art: "pruefen"; datensatz: SqlDatensatzId; sql: string; uebung: Pick<SqlUebung, "loesung" | "pruefAbfrage" | "art" | "geordnet"> };

export type SqlAntwort = { id: number } & (
  | { ok: true; art: "ausfuehren"; tabellen: SqlAnzeigeTabelle[]; geaendert: number; dauerMs: number }
  | { ok: true; art: "zuruecksetzen" }
  | { ok: true; art: "pruefen"; richtig: boolean; hinweis: string }
  | { ok: false; fehler: string }
);

/** Maximale Wartezeit auf eine Antwort, danach wird der Worker beendet. */
export const SQL_TIMEOUT_MS = 5000;

type OhneId<T> = T extends unknown ? Omit<T, "id"> : never;

interface Wartend {
  resolve: (antwort: SqlAntwort) => void;
  reject: (fehler: Error) => void;
}

export class SqlSandbox {
  private worker: Worker | null = null;
  private naechsteId = 1;
  private readonly wartend = new Map<number, Wartend>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  private erzeugeWorker(): Worker {
    const worker = new Worker(new URL("./sqlWorker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<SqlAntwort>) => {
      const eintrag = this.wartend.get(event.data.id);
      if (!eintrag) return;
      this.wartend.delete(event.data.id);
      if (this.wartend.size === 0 && this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      eintrag.resolve(event.data);
    };
    worker.onerror = (event) => {
      this.abbrechen(new Error(event.message || "Der SQL-Worker ist abgestürzt."));
    };
    return worker;
  }

  /** Beendet den Worker und lässt alle wartenden Anfragen mit `fehler` scheitern. */
  private abbrechen(fehler: Error): void {
    this.worker?.terminate();
    this.worker = null;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    for (const eintrag of this.wartend.values()) eintrag.reject(fehler);
    this.wartend.clear();
  }

  /** Sendet eine Anfrage; die Datenbank-Sitzung geht bei Zeitüberschreitung verloren (Worker wird neu gestartet). */
  senden(anfrage: OhneId<SqlAnfrage>): Promise<SqlAntwort> {
    this.worker ??= this.erzeugeWorker();
    const id = this.naechsteId++;
    return new Promise<SqlAntwort>((resolve, reject) => {
      this.wartend.set(id, { resolve, reject });
      this.timer ??= setTimeout(
        () => this.abbrechen(new Error(`Abbruch nach ${SQL_TIMEOUT_MS / 1000} Sekunden: Die Anweisung läuft zu lange. Die Beispieldatenbank wurde neu geladen.`)),
        SQL_TIMEOUT_MS,
      );
      this.worker!.postMessage({ ...anfrage, id } as SqlAnfrage);
    });
  }

  beenden(): void {
    this.abbrechen(new Error("Beendet"));
  }
}
