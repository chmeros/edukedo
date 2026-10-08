import { createHash } from "node:crypto";

/**
 * Abgleich-Plan für den Content-Import (Entwurf docs/entwuerfe/sicherer-content-import.md, Abschnitte 4.3 bis 4.6,
 * Schritt 3). Reine Funktion ohne Datenbankzugriff: Sie vergleicht den Soll-Zustand einer Themendatei (aus dem Markdown)
 * mit dem Ist-Zustand in der Datenbank und beschreibt, was zu tun ist. Der spätere Executor (Schritt 5) setzt den Plan um;
 * hier ist nichts an den Importer angebunden.
 */

/** Version der Hash-Funktion. Eine Änderung an `computeContentHash` erfordert eine neue Version, sonst gelten alle Items als geändert. */
export const CONTENT_HASH_VERSION = "v1";

/** Ab so vielen Entfernungen in einem Thema greift die Abbruchschwelle (zusätzlich zum Anteil). */
export const REMOVAL_THRESHOLD_MIN_COUNT = 5;
/** Anteil der aktiven Items eines Themas, ab dem Entfernungen den Import blockieren (außer `allowRemovals`). */
export const REMOVAL_THRESHOLD_SHARE = 0.2;

export interface SyncOption {
  text: string;
  isCorrect: boolean;
  groupKey: string | null;
  side: "links" | "rechts" | null;
  sortOrder: number;
}

/** Ein Item, wie es das Markdown beschreibt. */
export interface DesiredItem {
  key: string;
  type: string;
  prompt: string;
  explanation: string | null;
  difficulty: string;
  bloom: string | null;
  payload: unknown;
  options: SyncOption[];
  tags: string[];
  /** Soll-Zustand von `is_active` (Entwurfs-Instrumente sind inaktiv, siehe KURS_ENTWURF). Nicht Teil des Inhalts-Hashes. */
  isActive: boolean;
}

export interface ExistingOption extends SyncOption {
  id: string;
  /** Eine Duellantwort verweist auf diese Option; sie darf nicht gelöscht werden (RESTRICT). */
  referenced?: boolean;
}

/** Ein Item, wie es in der Datenbank steht. */
export interface ExistingItem {
  id: string;
  /** `null` für Altbestand, der noch nicht per Backfill einem Schlüssel zugeordnet wurde. */
  key: string | null;
  type: string;
  isActive: boolean;
  /** Review LOG-21: In der Redaktion von Hand deaktiviert; der Import aktiviert das Item nicht wieder. */
  editorDeactivated?: boolean;
  contentHash: string | null;
  payload: unknown;
  options: ExistingOption[];
  tags: string[];
}

export interface OptionChanges {
  /** Bestehende Option wird an der Stelle aktualisiert (ID bleibt stabil, Zuordnung über `sortOrder`). */
  update: { id: string; desired: SyncOption }[];
  insert: SyncOption[];
  remove: string[];
}

export interface PlannedUpdate {
  id: string;
  key: string;
  desired: DesiredItem;
  contentHash: string;
  options: OptionChanges;
  addTags: string[];
  removeTags: string[];
  /** Richtige Antworten oder Lösungs-Payload haben sich geändert (Entscheidung 2: Fortschritt bleibt, der Lauf weist darauf hin). */
  solutionChanged: boolean;
}

export interface PlannedCreate {
  desired: DesiredItem;
  contentHash: string;
}

export interface SyncPlan {
  create: PlannedCreate[];
  update: PlannedUpdate[];
  unchanged: number;
  /** Aus dem Markdown verschwundene (oder nie zugeordnete) Items: werden deaktiviert, nicht gelöscht. */
  deactivate: { id: string; key: string | null }[];
  /** `is_active` weicht vom Soll ab (z. B. Freigabe eines Entwurfs oder ein wieder aufgetauchtes Item). */
  setActive: { id: string; key: string; isActive: boolean }[];
  warnings: string[];
  /** Gesetzt, wenn die Abbruchschwelle für Entfernungen greift; der Plan darf dann nicht ausgeführt werden. */
  blocked: string | null;
}

export interface PlanOptions {
  /** Hebt die Abbruchschwelle für Entfernungen auf (`--allow-removals`). */
  allowRemovals?: boolean;
}

/** Kanonische JSON-Darstellung: Objektschlüssel sortiert, damit der Hash unabhängig von der Einfügereihenfolge ist. */
export function canonicalJson(value: unknown): string {
  if (value === undefined) return "null";
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(",")}]`;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record)
    .filter((key) => record[key] !== undefined)
    .sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`;
}

function normalizeText(value: string): string {
  return value.normalize("NFC").replace(/\r\n/g, "\n");
}

/** Feste Reihenfolge der Optionen (auch bei gleicher sortOrder, z. B. links/rechts einer Zuordnung), unabhängig von der Datenbank-Rückgabe. */
function compareOptions(a: SyncOption, b: SyncOption): number {
  return (
    a.sortOrder - b.sortOrder ||
    (a.side ?? "").localeCompare(b.side ?? "") ||
    (a.groupKey ?? "").localeCompare(b.groupKey ?? "") ||
    a.text.localeCompare(b.text)
  );
}

/** Identität einer Option innerhalb eines Items: Position und Seite (links/rechts teilen sich bei Zuordnungen die sortOrder). */
function optionSlot(option: Pick<SyncOption, "sortOrder" | "side">): string {
  return `${option.sortOrder}|${option.side ?? ""}`;
}

/** Hash des importierten Inhalts (ohne `isActive` und Schlüssel). Optionen nach `sortOrder`, Tags alphabetisch. */
export function computeContentHash(item: DesiredItem): string {
  const content = {
    type: item.type,
    prompt: normalizeText(item.prompt),
    explanation: item.explanation === null ? null : normalizeText(item.explanation),
    difficulty: item.difficulty,
    bloom: item.bloom,
    payload: item.payload ?? null,
    options: [...item.options]
      .sort(compareOptions)
      .map((option) => ({
        text: normalizeText(option.text),
        isCorrect: option.isCorrect,
        groupKey: option.groupKey,
        side: option.side,
        sortOrder: option.sortOrder,
      })),
    tags: [...new Set(item.tags)].sort(),
  };
  return `${CONTENT_HASH_VERSION}:${createHash("sha256").update(canonicalJson(content)).digest("hex")}`;
}

function planOptionChanges(existing: ExistingOption[], desired: SyncOption[], warnings: string[], key: string): OptionChanges {
  const bySlot = new Map(existing.map((option) => [optionSlot(option), option] as const));
  const changes: OptionChanges = { update: [], insert: [], remove: [] };
  const used = new Set<string>();

  for (const wanted of desired) {
    const current = bySlot.get(optionSlot(wanted));
    if (!current) {
      changes.insert.push(wanted);
      continue;
    }
    used.add(optionSlot(wanted));
    const same =
      current.text === wanted.text &&
      current.isCorrect === wanted.isCorrect &&
      current.groupKey === wanted.groupKey &&
      current.side === wanted.side;
    if (!same) changes.update.push({ id: current.id, desired: wanted });
  }
  for (const option of existing) {
    if (used.has(optionSlot(option))) continue;
    if (option.referenced) {
      warnings.push(`${key}: Option ${option.sortOrder} entfällt im Markdown, wird aber von einer Duellantwort verwendet und bleibt bestehen.`);
    } else {
      changes.remove.push(option.id);
    }
  }
  return changes;
}

/**
 * Lösungsrelevanter Teil der Optionen: bei "sortieren" trägt die Reihenfolge (sortOrder mit Text) die Lösung, sonst nur die
 * als richtig markierten sowie die per Gruppenschlüssel oder Seite zugeordneten Optionen. Eine geänderte falsche Antwort
 * ist deshalb keine geänderte Lösung.
 */
function optionPattern(options: SyncOption[], type: string): string {
  const relevant =
    type === "sortieren"
      ? options.map((option) => [option.sortOrder, option.text])
      : options
          .filter((option) => option.isCorrect || option.groupKey !== null || option.side !== null)
          .map((option) => [option.sortOrder, option.isCorrect, option.groupKey, option.side]);
  return canonicalJson(relevant.map((entry) => canonicalJson(entry)).sort());
}

/** Itemarten ohne Lösung: eine Änderung gilt nie als „Lösung geändert“. */
const TYPES_WITHOUT_SOLUTION = new Set(["theorie", "karteikarte", "fachgespraech_frage", "fallaufgabe"]);

function isSolutionChanged(existing: ExistingItem, desired: DesiredItem): boolean {
  if (TYPES_WITHOUT_SOLUTION.has(desired.type)) return false;
  if (optionPattern(existing.options, desired.type) !== optionPattern(desired.options, desired.type)) return true;
  return canonicalJson(existing.payload ?? null) !== canonicalJson(desired.payload ?? null);
}

/**
 * Berechnet den Abgleich-Plan für ein Thema.
 *  - Schlüssel nur im Soll: anlegen.
 *  - In beiden, gleicher Hash: unverändert (nur `is_active` wird bei Abweichung nachgezogen).
 *  - In beiden, anderer oder fehlender Hash: aktualisieren.
 *  - Nur im Ist (oder ohne Schlüssel): deaktivieren, nie löschen.
 * Greift die Abbruchschwelle (mindestens fünf Entfernungen und mehr als 20 % der aktiven Items), ist `blocked` gesetzt.
 */
export function planSync(desiredItems: DesiredItem[], existingItems: ExistingItem[], options: PlanOptions = {}): SyncPlan {
  const desiredByKey = new Map<string, DesiredItem>();
  for (const item of desiredItems) {
    if (desiredByKey.has(item.key)) throw new Error(`Doppelter Schlüssel im Soll-Zustand: ${item.key}`);
    desiredByKey.set(item.key, item);
  }
  const existingByKey = new Map<string, ExistingItem>();
  for (const item of existingItems) {
    if (item.key === null) continue;
    if (existingByKey.has(item.key)) throw new Error(`Doppelter Schlüssel im Ist-Zustand: ${item.key}`);
    existingByKey.set(item.key, item);
  }

  const plan: SyncPlan = { create: [], update: [], unchanged: 0, deactivate: [], setActive: [], warnings: [], blocked: null };

  for (const desired of desiredItems) {
    const contentHash = computeContentHash(desired);
    const current = existingByKey.get(desired.key);
    if (!current) {
      plan.create.push({ desired, contentHash });
      continue;
    }
    if (current.type !== desired.type) {
      plan.warnings.push(`${desired.key}: Typ ändert sich von "${current.type}" zu "${desired.type}"; der Fortschritt bleibt am Item erhalten.`);
    }
    if (current.contentHash === contentHash) {
      plan.unchanged += 1;
    } else {
      const currentTags = new Set(current.tags);
      const wantedTags = new Set(desired.tags);
      plan.update.push({
        id: current.id,
        key: desired.key,
        desired,
        contentHash,
        options: planOptionChanges(current.options, desired.options, plan.warnings, desired.key),
        addTags: [...wantedTags].filter((tag) => !currentTags.has(tag)).sort(),
        removeTags: [...currentTags].filter((tag) => !wantedTags.has(tag)).sort(),
        solutionChanged: isSolutionChanged(current, desired),
      });
    }
    if (!current.isActive && desired.isActive && current.editorDeactivated) {
      plan.warnings.push(`${desired.key}: bleibt deaktiviert, weil es in der Redaktion von Hand deaktiviert wurde.`);
    } else if (current.isActive !== desired.isActive) {
      plan.setActive.push({ id: current.id, key: desired.key, isActive: desired.isActive });
    }
  }

  for (const current of existingItems) {
    if (current.key !== null && desiredByKey.has(current.key)) continue;
    // Bereits deaktivierte Items, die weiterhin fehlen, sind nichts Neues.
    if (current.isActive) plan.deactivate.push({ id: current.id, key: current.key });
  }

  const activeCount = existingItems.filter((item) => item.isActive).length;
  if (
    !options.allowRemovals &&
    plan.deactivate.length >= REMOVAL_THRESHOLD_MIN_COUNT &&
    plan.deactivate.length > activeCount * REMOVAL_THRESHOLD_SHARE
  ) {
    plan.blocked = `${plan.deactivate.length} von ${activeCount} aktiven Items würden deaktiviert (Schwelle ${REMOVAL_THRESHOLD_SHARE * 100} %, mindestens ${REMOVAL_THRESHOLD_MIN_COUNT}); mit allowRemovals bestätigen.`;
  }
  return plan;
}
