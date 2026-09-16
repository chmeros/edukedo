import Dexie, { type Table } from "dexie";
import type { FsrsProgressState, ReviewResult } from "@edukedo/shared";

/**
 * F-42 (Offline-Modus, Grundgerüst): lokaler IndexedDB-Speicher über Dexie.js (Architekturplanung
 * Abschnitt 2/5) für zwei Zwecke:
 *  - `content`: für offline verfügbar gemachte Karteikarten/Quiz-Items eines Kurses, inklusive
 *    Lösung (bewusste Entscheidung, siehe Architekturplanung Abschnitt 13 — ermöglicht offline
 *    sofortiges Feedback wie online, statt es erst beim nächsten Sync anzuzeigen).
 *  - `queue`: noch nicht synchronisierte Lern-Ereignisse (Karteikarten-Selbsteinschätzung,
 *    Quiz-Antwort). Absichtlich einzelne Ereignisse mit Zeitstempel statt nur des daraus
 *    resultierenden Endzustands, damit der Sync sie später chronologisch über die bestehenden
 *    submitReview/recordQuizAttempt-Pfade nachspielen kann, ohne bei Mehrgeräte-Nutzung
 *    zwischenzeitliche Wiederholungen zu verlieren (siehe Architekturplanung Abschnitt 5/13).
 *
 * Dieses Modul legt nur das Schema an — Befüllen (Content-Download), Lesen/Schreiben beim
 * offline Beantworten und der Sync-Abgleich sind eigene, spätere Schritte.
 */

export type OfflineContentType = "karteikarte" | "quiz_mc" | "zuordnung" | "luecken" | "kurzantwort";

/** Deckungsgleich mit `RawAnswerOption` in apps/api/src/quiz-logic.ts — nur bei
 * type "quiz_mc"/"zuordnung" gesetzt, sonst ein leeres Array. */
export interface OfflineAnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  side: "links" | "rechts" | null;
  groupKey: string | null;
}

export interface OfflineContentItem {
  /** content_item.id */
  id: string;
  kursId: string;
  themaId: string;
  type: OfflineContentType;
  prompt: string;
  explanation: string | null;
  /** Nur bei type "luecken"/"kurzantwort" gesetzt (content_item.payload, inkl. Lösung). */
  payload: unknown;
  /** Nur bei type "quiz_mc"/"zuordnung" gesetzt. */
  options: OfflineAnswerOption[];
  /** Nur bei type "karteikarte" gesetzt — aktueller FSRS-Zustand für `scheduleReview`. */
  progress: FsrsProgressState | null;
  downloadedAt: number;
}

export type OfflineQueueEventPayload =
  | { kind: "review"; result: ReviewResult }
  | { kind: "quiz_mc"; selectedOptionId: string }
  | { kind: "zuordnung"; pairs: { leftOptionId: string; rightOptionId: string }[] }
  | { kind: "luecken"; answers: Record<string, string> }
  | { kind: "kurzantwort"; answer: string };

export interface OfflineQueueEntry {
  /** Client-generierte UUID — dient beim Sync als Idempotenz-Schlüssel (siehe Architekturplanung
   * Abschnitt 13), falls eine Übertragung abbricht und wiederholt wird. */
  id: string;
  contentItemId: string;
  event: OfflineQueueEventPayload;
  /** Epoch-Millisekunden, Client-Uhrzeit — bestimmt die Replay-Reihenfolge beim Sync. */
  occurredAt: number;
  synced: boolean;
}

class OfflineDatabase extends Dexie {
  content!: Table<OfflineContentItem, string>;
  queue!: Table<OfflineQueueEntry, string>;

  constructor() {
    super("edukedo-offline");
    this.version(1).stores({
      content: "id, kursId, themaId, type",
      queue: "id, occurredAt, synced",
    });
  }
}

export const offlineDb = new OfflineDatabase();
