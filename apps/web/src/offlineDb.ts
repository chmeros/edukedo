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

/** Deckungsgleich mit `RawAnswerOption` in `@edukedo/shared` (`quiz-logic.ts`) — bewusst
 * inklusive `contentItemId`, damit ein Array von Optionen direkt an `checkMcAnswer`/
 * `checkMatching`/`shapeQuizItem` durchgereicht werden kann (siehe offlineQuiz.ts). Nur bei
 * type "quiz_mc"/"zuordnung" gesetzt, sonst ein leeres Array. */
export interface OfflineAnswerOption {
  id: string;
  contentItemId: string;
  text: string;
  isCorrect: boolean;
  side: "links" | "rechts" | null;
  groupKey: string | null;
  // F-113 Teil 2: RawAnswerOption (@edukedo/shared) verlangt seither sortOrder für alle Typen —
  // für die hier offline unterstützten Typen bleibt der Wert ungenutzt ("sortieren" selbst ist
  // bewusst nicht offline verfügbar).
  sortOrder: number;
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

const OFFLINE_OWNER_KEY = "edukedo-offline-owner";

/**
 * Review-Befund WEB-04: Die lokalen Daten (Inhalte mit Lösung, noch nicht synchronisierte Antworten) gehören zu
 * genau einer Person. Beim Logout und beim Wechsel der angemeldeten Person werden sie gelöscht, sonst würden
 * Offline-Antworten von Nutzer A auf einem geteilten Gerät dem nächsten Nutzer B gutgeschrieben.
 */
/**
 * Review WRK-20: Entwürfe der Planungswerkzeuge (Freitext wie Thema, Zielgruppe, Beruf) und die Prüfungstag-Checkliste liegen im
 * Browser, nicht beim Server. Auf einem geteilten Gerät sollen sie dem nächsten Konto nicht angezeigt werden; Einstellungen zur
 * Darstellung (Hell/Dunkel usw.) bleiben dagegen erhalten.
 */
const LOKALE_ENTWUERFE = ["edukedo.ausbildungsplan.v1", "edukedo.unterweisungsplan.v1", "edukedo.examDayChecklist", "edukedo.lastSession.v1", "edukedo.examDraft.v1"];

export async function clearOfflineData(): Promise<void> {
  await Promise.all([offlineDb.content.clear(), offlineDb.queue.clear()]);
  try {
    localStorage.removeItem(OFFLINE_OWNER_KEY);
    for (const schluessel of LOKALE_ENTWUERFE) localStorage.removeItem(schluessel);
  } catch {
    // Speicher blockiert: nichts zu tun.
  }
}

/** Merkt sich, wem die lokalen Daten gehören; bei einer anderen Person werden sie vor jeder weiteren Nutzung gelöscht. */
export async function claimOfflineData(userId: string): Promise<void> {
  try {
    const owner = localStorage.getItem(OFFLINE_OWNER_KEY);
    if (owner && owner !== userId) await clearOfflineData();
    localStorage.setItem(OFFLINE_OWNER_KEY, userId);
  } catch {
    // Speicher blockiert (z. B. privates Fenster): Zuordnung nicht möglich, Verhalten wie bisher.
  }
}
