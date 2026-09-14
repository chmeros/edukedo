import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  customType,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Schema Quelle der Wahrheit: docs/Architekturplanung.md Abschnitt 4.3.
 * Tabellen-/Spaltennamen und Lösch-/Änderungsverhalten folgen dort 1:1 dem SQL-DDL.
 * Abweichungen/Ergänzungen (session, user.role) sind in Abschnitt 13 dokumentiert.
 */

const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

// ---------------------------------------------------------------------------
// Content-Hierarchie (Abschnitt 4.3)
// ---------------------------------------------------------------------------

export const kurs = pgTable("kurs", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  // varchar statt char (Abweichung von Abschnitt 4.3, siehe Abschnitt 13): Postgres füllt
  // CHAR(n) mit Leerzeichen auf ("de   " statt "de") — VARCHAR(5) behält dieselbe
  // Längenbegrenzung, ohne dieses Padding an jede lesende Stelle im Code weiterzugeben.
  locale: varchar("locale", { length: 5 }).notNull().default("de"),
  metadata: jsonb("metadata").notNull().default({}),
  targetMode: text("target_mode").notNull().default("einzeltermin"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const fachgebiet = pgTable(
  "fachgebiet",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    title: text("title").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    metadata: jsonb("metadata").notNull().default({}),
  },
  (table) => [
    uniqueIndex("fachgebiet_kurs_id_code_key").on(table.kursId, table.code),
    index("fachgebiet_kurs_id_sort_order_idx").on(table.kursId, table.sortOrder),
  ],
);

export const thema = pgTable(
  "thema",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fachgebietId: uuid("fachgebiet_id")
      .notNull()
      .references(() => fachgebiet.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("thema_fachgebiet_id_sort_order_idx").on(table.fachgebietId, table.sortOrder)],
);

// ---------------------------------------------------------------------------
// Nutzerkonten (vorgezogen wegen Fremdschlüsseln aus Content-Items) — Abschnitt 4.3
// ---------------------------------------------------------------------------

/**
 * "user.role" (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten): Abschnitt 7 verlangt
 * rollenbasierte Autorisierung (learner, parent, content_editor, admin), aber Abschnitt 4.3
 * hatte kein Feld dafür vorgesehen. "parent" bleibt bewusst kein Wert hier, sondern der eigene
 * Account-Typ "parent" (eigene Tabelle) — siehe Abschnitt 13 für die Begründung.
 */
export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: citext("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("learner"),
    birthDate: date("birth_date"),
    isMinor: boolean("is_minor").notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("user_role_check", sql`${table.role} in ('learner', 'content_editor', 'admin')`),
  ],
);

export const userCourse = pgTable(
  "user_course",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    targetDate: date("target_date"),
    planStartDate: date("plan_start_date"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("user_course_user_id_kurs_id_key").on(table.userId, table.kursId)],
);

/**
 * "session" (neu, nicht im ursprünglichen SQL-DDL enthalten): Grundlage des Lucia-Pattern-Auth
 * (Abschnitt 2). "id" speichert nur den SHA-256-Hash des Session-Tokens, nie den Klartext-Token
 * selbst (analog zu consent_token.token_hash) — der Klartext-Token existiert nur im httpOnly-Cookie.
 * Trägt user_id ODER parent_id, weil "user" und "parent" bewusst getrennte Konto-Tabellen sind
 * (Abschnitt 4.4) und beide Konto-Typen sich einloggen können. Siehe Abschnitt 13.
 */
export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references(() => parent.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_parent_id_idx").on(table.parentId),
    check(
      "session_exactly_one_principal_check",
      sql`num_nonnulls(${table.userId}, ${table.parentId}) = 1`,
    ),
  ],
);

// ---------------------------------------------------------------------------
// Content-Items — relational, wo stabil, JSONB, wo variabel — Abschnitt 4.3
// ---------------------------------------------------------------------------

export const contentItem = pgTable(
  "content_item",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    themaId: uuid("thema_id")
      .notNull()
      .references(() => thema.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    prompt: text("prompt").notNull(),
    explanation: text("explanation"),
    payload: jsonb("payload").notNull().default({}),
    difficulty: text("difficulty").notNull().default("mittel"),
    isPremium: boolean("is_premium").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    currentVersion: integer("current_version").notNull().default(1),
    createdBy: uuid("created_by").references(() => user.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("content_item_thema_id_active_idx")
      .on(table.themaId)
      .where(sql`${table.isActive}`),
  ],
);

export const contentItemVersion = pgTable(
  "content_item_version",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    prompt: text("prompt").notNull(),
    explanation: text("explanation"),
    payload: jsonb("payload").notNull(),
    changedBy: uuid("changed_by").references(() => user.id, { onDelete: "set null" }),
    changeNote: text("change_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("content_item_version_content_item_id_version_number_key").on(
      table.contentItemId,
      table.versionNumber,
    ),
  ],
);

export const answerOption = pgTable(
  "answer_option",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    groupKey: text("group_key"),
    side: text("side"),
    text: text("text").notNull(),
    isCorrect: boolean("is_correct").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("answer_option_content_item_id_idx").on(table.contentItemId)],
);

export const tag = pgTable("tag", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const contentItemTag = pgTable(
  "content_item_tag",
  {
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.contentItemId, table.tagId] })],
);

// ---------------------------------------------------------------------------
// Fortschritt & Prüfungssimulation — Abschnitt 4.3
// ---------------------------------------------------------------------------

export const userProgress = pgTable(
  "user_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    difficulty: real("difficulty").notNull(),
    stability: real("stability").notNull(),
    state: text("state").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    lastResult: text("last_result"),
    reps: integer("reps").notNull().default(0),
    lapses: integer("lapses").notNull().default(0),
  },
  (table) => [
    uniqueIndex("user_progress_user_id_content_item_id_key").on(table.userId, table.contentItemId),
    index("user_progress_user_id_due_at_idx").on(table.userId, table.dueAt),
  ],
);

export const examSession = pgTable(
  "exam_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    mode: text("mode").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    score: real("score"),
  },
  (table) => [index("exam_session_user_id_kurs_id_idx").on(table.userId, table.kursId)],
);

export const examAnswer = pgTable(
  "exam_answer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    examSessionId: uuid("exam_session_id")
      .notNull()
      .references(() => examSession.id, { onDelete: "cascade" }),
    contentItemVersionId: uuid("content_item_version_id")
      .notNull()
      .references(() => contentItemVersion.id, { onDelete: "restrict" }),
    givenAnswer: jsonb("given_answer").notNull(),
    isCorrect: boolean("is_correct"),
    points: real("points"),
  },
  (table) => [index("exam_answer_exam_session_id_idx").on(table.examSessionId)],
);

// ---------------------------------------------------------------------------
// Eltern-/Jugendschutz (F-08, F-90) — Abschnitt 4.3
// ---------------------------------------------------------------------------

/**
 * "parent.password_set" (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe
 * Abschnitt 13): Ein neu angelegter Elternteil erhält beim ersten Consent-Vorgang nur einen
 * zufälligen, nirgends bekannten Platzhalter-Hash (siehe auth/consent.ts) — diese Spalte
 * unterscheidet das explizit von einem tatsächlich selbst gesetzten Passwort, ohne den
 * Platzhalter-Hash selbst danach untersuchen zu müssen.
 */
export const parent = pgTable("parent", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: citext("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  passwordSet: boolean("password_set").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const parentChildLink = pgTable(
  "parent_child_link",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    parentId: uuid("parent_id")
      .notNull()
      .references(() => parent.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    consentStatus: text("consent_status").notNull().default("pending"),
    consentedAt: timestamp("consented_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [uniqueIndex("parent_child_link_parent_id_user_id_key").on(table.parentId, table.userId)],
);

export const consentToken = pgTable(
  "consent_token",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    parentChildLinkId: uuid("parent_child_link_id")
      .notNull()
      .references(() => parentChildLink.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    reminderSentCount: integer("reminder_sent_count").notNull().default(0),
  },
  (table) => [index("consent_token_expires_at_idx").on(table.expiresAt)],
);

// ---------------------------------------------------------------------------
// Melden/Blockieren (F-68, Datenmodell seit Phase 1, UI erst Phase 4) — Abschnitt 4.3
// ---------------------------------------------------------------------------

export const report = pgTable("report", {
  id: uuid("id").primaryKey().defaultRandom(),
  reporterUserId: uuid("reporter_user_id").references(() => user.id, { onDelete: "set null" }),
  reportedUserId: uuid("reported_user_id").references(() => user.id, { onDelete: "cascade" }),
  kursId: uuid("kurs_id")
    .notNull()
    .references(() => kurs.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("offen"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const block = pgTable(
  "block",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    blockedUserId: uuid("blocked_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("block_user_id_blocked_user_id_kurs_id_key").on(
      table.userId,
      table.blockedUserId,
      table.kursId,
    ),
  ],
);
