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
    // F-104 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): Präferenz
    // für den vereinheitlichten "Lernen"-Tab — zwei unabhängige Schalter statt einer dritten
    // "Beides"-Spalte, da sich "Beides" widerspruchsfrei aus "beide an" ergibt. Default (true,
    // true) entspricht "Beides", bis eine Person die Erstbesuch-Abfrage beantwortet.
    learnFlashcardsEnabled: boolean("learn_flashcards_enabled").notNull().default(true),
    learnQuizEnabled: boolean("learn_quiz_enabled").notNull().default(true),
    // Unterscheidet "Default nie angefasst" (Erstbesuch-Abfrage noch zu zeigen) von einer
    // bewussten Entscheidung für exakt die Default-Kombination.
    learningModePreferenceSet: boolean("learning_mode_preference_set").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("user_role_check", sql`${table.role} in ('learner', 'content_editor', 'admin')`),
    check(
      "user_learning_mode_at_least_one_check",
      sql`${table.learnFlashcardsEnabled} or ${table.learnQuizEnabled}`,
    ),
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
    // F-35 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten): nur im Zielmodus
    // "wochenziel" genutzt (siehe kurs.targetMode) — die persönliche, wiederkehrende
    // Wochenlast, gegen die progress.pacing die zuletzt beantworteten Lerneinheiten misst.
    // Für "einzeltermin"-Kurse bleibt die Spalte null, siehe Architekturplanung Abschnitt 13.
    weeklyGoalItems: integer("weekly_goal_items"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
    // F-60 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten): Opt-in für die
    // Highscore-Liste, je Kurs getrennt (analog zu weeklyGoalItems) — standardmäßig false, siehe
    // Anforderungskatalog ("standardmäßig deaktiviert"). Sitzt bewusst hier statt in einer eigenen
    // Tabelle, weil es ein einzelnes, pro Kurs-Mitgliedschaft skopiertes Flag ist, keine eigene
    // Entität mit Historie.
    highscoreOptIn: boolean("highscore_opt_in").notNull().default(false),
    // F-62 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten): Bevorzugter Handlungsbereich
    // für die Lernpartner-Vermittlung — nullable, da eine Präferenz optional ist (F-62 verlangt
    // "Prüfungstermin UND/ODER Handlungsbereich" als Abgleichsbasis, nicht beides zwingend).
    // `onDelete: "set null"` statt "cascade": Verschwindet ein Fachgebiet, verliert die Person
    // nur ihre Präferenz, nicht die gesamte Kurs-Mitgliedschaft.
    lernpartnerFachgebietId: uuid("lernpartner_fachgebiet_id").references(() => fachgebiet.id, {
      onDelete: "set null",
    }),
  },
  (table) => [uniqueIndex("user_course_user_id_kurs_id_key").on(table.userId, table.kursId)],
);

/**
 * "session" (neu, nicht im ursprünglichen SQL-DDL enthalten): Grundlage des Lucia-Pattern-Auth
 * (Abschnitt 2). "id" speichert nur den SHA-256-Hash des Session-Tokens, nie den Klartext-Token
 * selbst (analog zu consent_token.token_hash) — der Klartext-Token existiert nur im httpOnly-Cookie.
 * Trägt user_id ODER parent_id ODER company_account_id, weil "user"/"parent"/"company_account"
 * bewusst getrennte Konto-Tabellen sind (Abschnitt 4.4) und alle drei Konto-Typen sich einloggen
 * können. `company_account_id` seit F-91 (Business-Lizenzen, Baustein 1, siehe Abschnitt 13).
 * Siehe Abschnitt 13.
 */
export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references(() => parent.id, { onDelete: "cascade" }),
    companyAccountId: uuid("company_account_id").references(() => companyAccount.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_parent_id_idx").on(table.parentId),
    index("session_company_account_id_idx").on(table.companyAccountId),
    check(
      "session_exactly_one_principal_check",
      sql`num_nonnulls(${table.userId}, ${table.parentId}, ${table.companyAccountId}) = 1`,
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
    // "bloom" (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13):
    // kognitive Anforderungsstufe nach der Bloom'schen Taxonomie, ab HB1/HB2/HB4 verbindlich
    // im Content-Zwischenformat (siehe content/README.md) — bewusst nullable statt mit
    // Default, da älterer Content (HB3, Mathematik-9, Demo) nie danach klassifiziert wurde;
    // ein Default-Wert würde dafür fälschlich eine tatsächlich erfolgte Einstufung vortäuschen.
    bloom: text("bloom"),
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
    check(
      "content_item_bloom_check",
      sql`${table.bloom} is null or ${table.bloom} in ('erinnern', 'verstehen', 'anwenden', 'analysieren', 'bewerten', 'erschaffen')`,
    ),
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

// ---------------------------------------------------------------------------
// Lernstatistiken (F-31/F-32) — Ergänzung, nicht im ursprünglichen SQL-DDL enthalten,
// siehe Abschnitt 13.
// ---------------------------------------------------------------------------

/**
 * Append-only Ereignis-Log je beantworteter Frage (Karteikarte oder Quiz) — anders als
 * user_progress (nur der aktuelle FSRS-/Beherrschungs-Zustand) hier bewusst ein Verlauf,
 * weil F-31 ("Trefferquote im Zeitverlauf") und F-32 (Schwachstellenanalyse je Thema) sonst
 * nicht berechenbar wären — insbesondere für Quiz-Antworten, die in user_progress keinerlei
 * Historie hinterlassen (reps/lapses bleiben dort für Quiz-Zeilen konstant 0, siehe
 * recordQuizAttempt in trpc/routers/progress.ts). Siehe Architekturplanung Abschnitt 13.
 */
export const learningEvent = pgTable(
  "learning_event",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    isCorrect: boolean("is_correct").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
    /**
     * F-42 Baustein 5 (Sync-Endpunkt): client-generierte UUID aus offlineDb.queue, nur bei
     * über den Sync nachgespielten Ereignissen gesetzt — dient als Idempotenz-Schlüssel, falls
     * ein Sync-Versuch abbricht und wiederholt wird (siehe Architekturplanung Abschnitt 13).
     * Mehrere NULL-Werte sind unter UNIQUE in Postgres zulässig, normale Online-Ereignisse
     * bleiben also unberührt. Bewusst NICHT spaltenweit eindeutig (Code-Review-Fund, siehe
     * Architekturplanung Abschnitt 13): eine global eindeutige Spalte auf einem rein
     * client-generierten Wert hätte bei einer Kollision zwischen zwei verschiedenen Nutzer:innen
     * (Zufall oder ein manipulierter Request) die Antwort der/des zweiten stillschweigend
     * verworfen — der zusammengesetzte Unique-Index unten scoped die Eindeutigkeit auf die
     * jeweilige Nutzer:in.
     */
    clientEventId: uuid("client_event_id"),
  },
  (table) => [
    index("learning_event_user_id_occurred_at_idx").on(table.userId, table.occurredAt),
    index("learning_event_content_item_id_idx").on(table.contentItemId),
    uniqueIndex("learning_event_user_id_client_event_id_key").on(table.userId, table.clientEventId),
  ],
);

/**
 * Explizite Lernsitzung (F-31 "Lernzeit") per Start/Heartbeat/Ende vom Frontend gemeldet
 * (siehe apps/web/src/useLearningSession.ts), statt aus Ereignis-Zeitstempeln geschätzt —
 * siehe Architekturplanung Abschnitt 13. last_ping_at dient als konservativer Ersatz für
 * ended_at, falls kein expliziter Endpunkt mehr ankommt (z. B. Absturz/Verbindungsabbruch):
 * Die Sitzungsdauer wird dann nur bis zum letzten bekannten Heartbeat statt bis zur
 * tatsächlichen Beendigung gezählt — zählt im Zweifel also zu wenig statt zu viel Lernzeit.
 */
export const learningSession = pgTable(
  "learning_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    lastPingAt: timestamp("last_ping_at", { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (table) => [index("learning_session_user_id_kurs_id_idx").on(table.userId, table.kursId)],
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
// Präsentationstrainer (F-24) — Ergänzung, nicht im ursprünglichen SQL-DDL enthalten,
// siehe Abschnitt 13.
// ---------------------------------------------------------------------------

/**
 * Genau ein Entwurf je (Nutzer:in, Kurs) — die drei Gliederungsabschnitte sind eine stabile,
 * bekannte Struktur (relational als eigene Spalten, analog zur generellen Modellierungs-
 * regel aus Abschnitt 4.1), die Checkliste dagegen bewusst als JSONB-Map (Item-Key →
 * abgehakt), da sich die Menge der Checklisten-Punkte künftig ändern könnte, ohne dafür eine
 * Migration zu benötigen — die Punkte selbst sind rein im Frontend definiert
 * (apps/web/src/Praesentationstrainer.tsx), nicht in der Datenbank.
 */
export const presentationDraft = pgTable(
  "presentation_draft",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    outlineEinleitung: text("outline_einleitung").notNull().default(""),
    outlineHauptteil: text("outline_hauptteil").notNull().default(""),
    outlineSchluss: text("outline_schluss").notNull().default(""),
    checklist: jsonb("checklist").notNull().default({}),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("presentation_draft_user_id_kurs_id_key").on(table.userId, table.kursId)],
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
// Business-Lizenzen & Sponsoring (F-91–F-94, Baustein 1: Datenmodell + Auth-Grundgerüst,
// ergänzt 16.09.2026) — Architekturplanung Abschnitt 4.5/13.
// ---------------------------------------------------------------------------

/**
 * Eigener Account-Typ analog zu "parent" (F-91) — eigenes Login, nicht Teil des
 * "user"-Rollenmodells (siehe Abschnitt 13, "user.role"). `password_set` folgt demselben
 * Platzhalter-Muster wie `parent.password_set`: Ein Admin legt das Konto an (siehe
 * `admin.createCompanyAccount`), der nirgends bekannte Platzhalter-Hash lässt sich nicht
 * erraten — nur der per E-Mail verschickte Setup-Link (`company_setup_token`) verschafft eine
 * erste Session, aus der heraus `company.setInitialPassword` ein echtes Passwort setzt.
 * `seat_limit`/`billing_status` sind hier (nicht in einer separaten Tabelle) untergebracht, da
 * beide Felder 1:1 am Konto hängen und von genau einer Stelle (Admin, siehe Abschnitt 13)
 * gepflegt werden. `branding_*` bleibt bis Baustein 3 (F-92) ungenutzt.
 */
export const companyAccount = pgTable(
  "company_account",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    contactEmail: citext("contact_email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    passwordSet: boolean("password_set").notNull().default(false),
    seatLimit: integer("seat_limit").notNull().default(0),
    billingStatus: text("billing_status").notNull().default("pending"),
    brandingLogoUrl: text("branding_logo_url"),
    brandingColor: text("branding_color"),
    brandingHeadline: text("branding_headline"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "company_account_billing_status_check",
      sql`${table.billingStatus} in ('pending', 'active', 'expired')`,
    ),
  ],
);

/**
 * Einmal-Link, der ein neu von einem Admin angelegtes Unternehmens-Konto erstmals mit einer
 * Session versorgt (analog zu `consent_token`, aber ohne die dort nötige Einwilligungs-
 * Zustandsmaschine — hier gibt es nur "noch kein Passwort gesetzt" vs. "Passwort gesetzt").
 */
export const companySetupToken = pgTable(
  "company_setup_token",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyAccountId: uuid("company_account_id")
      .notNull()
      .references(() => companyAccount.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
  },
  (table) => [index("company_setup_token_expires_at_idx").on(table.expiresAt)],
);

/**
 * F-91 Baustein 2: Lizenzvergabe per Einladungscode (analog zum invite_code-Konzept für
 * Freundeskreise, F-63 — dort noch nicht gebaut). Anders als bei F-63 bewusst OHNE
 * verpflichtende Befristung (`expires_at` nullable): Ein Unternehmens-Code ist ein
 * fortlaufendes Einschreibungsmittel für neue Mitarbeitende, kein sicherheitskritischer
 * Sozial-Invite — die eigentliche Kapazitätsgrenze ist `company_account.seat_limit`, nicht
 * eine Code-Gültigkeitsdauer. Mehrere Codes je Unternehmen erlaubt (z. B. je Abteilung).
 */
export const companyInviteCode = pgTable(
  "company_invite_code",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyAccountId: uuid("company_account_id")
      .notNull()
      .references(() => companyAccount.id, { onDelete: "cascade" }),
    code: text("code").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("company_invite_code_company_account_id_idx").on(table.companyAccountId)],
);

/**
 * Verknüpft eine Nutzerin/einen Nutzer mit genau einem Unternehmen (Branding-/Statistik-
 * Zugehörigkeit, F-92/F-93) — bewusst 1:1 (unique auf user_id) statt n:m, um Branding-Anzeige
 * eindeutig zu halten (siehe Architekturplanung Abschnitt 4.5/13). Trägt bewusst KEINEN Verweis
 * auf den eingelösten `company_invite_code` — welcher konkrete Code benutzt wurde, ist für
 * Branding/Statistik irrelevant und ein Code kann durch mehrere Personen eingelöst werden.
 */
export const userCompanyMembership = pgTable(
  "user_company_membership",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    companyAccountId: uuid("company_account_id")
      .notNull()
      .references(() => companyAccount.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("user_company_membership_user_id_key").on(table.userId),
    index("user_company_membership_company_account_id_idx").on(table.companyAccountId),
  ],
);

/**
 * F-91 Baustein 5 (F-94): Sponsoring bewusst vom Lizenzmodell getrennt — keine
 * Nutzer-Verknüpfung, keine Session/kein eigener Account-Typ, admin-gepflegt (redaktionelle
 * Unabhängigkeit, siehe F-11/F-16). `kursId = null` bedeutet plattformweite Platzierung (z. B.
 * auf der Startseite), ein gesetzter Wert beschränkt die Sponsor-Erwähnung auf einen einzelnen
 * Kurs. `startsAt`/`endsAt` sind beide nullable und unabhängig voneinander optional — ein
 * Sponsoring ohne Enddatum läuft bis zum manuellen Deaktivieren (`isActive = false`) weiter.
 * Siehe Architekturplanung Abschnitt 4.5/13.
 */
export const sponsor = pgTable(
  "sponsor",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    logoUrl: text("logo_url"),
    attributionText: text("attribution_text").notNull(),
    kursId: uuid("kurs_id").references(() => kurs.id, { onDelete: "cascade" }),
    isActive: boolean("is_active").notNull().default(true),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("sponsor_kurs_id_idx").on(table.kursId)],
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

// ---------------------------------------------------------------------------
// Feedback-Funktion für fehlerhafte Lerninhalte (F-50) — neu, 19.09.2026
// ---------------------------------------------------------------------------

/**
 * F-50 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): bewusst eine
 * eigene Tabelle statt Wiederverwendung von `report` oben — `report` ist strukturell an F-68
 * gebunden (meldet eine ANDERE PERSON, `reported_user_id` NOT NULL, immer an einen Kurs
 * gebunden), hier wird dagegen ein CONTENT-ITEM gemeldet, unabhängig vom Freundeskreis und ohne
 * Kurs-Bezug (der Kurs ergibt sich transitiv über `content_item_id`). Gleiches asymmetrisches
 * Lösch-Verhalten wie bei `report`: `reporter_user_id` bewusst `ON DELETE SET NULL` (die Meldung
 * bleibt für die redaktionelle Nacharbeit auch nach einer Konto-Löschung des Melders erhalten),
 * `content_item_id` `ON DELETE CASCADE` (eine Meldung zu einem gelöschten Content-Item ist
 * gegenstandslos).
 */
export const contentReport = pgTable("content_report", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentItemId: uuid("content_item_id")
    .notNull()
    .references(() => contentItem.id, { onDelete: "cascade" }),
  reporterUserId: uuid("reporter_user_id").references(() => user.id, { onDelete: "set null" }),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("offen"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Einladungs-/Freundschaftssystem (F-63) — Abschnitt 4.5 (Phase-4-Erweiterung)
// ---------------------------------------------------------------------------

/**
 * F-63: Einladungscode/-link, mit dem eine Person ihren (kursbezogenen) Freundeskreis aufbaut.
 * Anders als `company_invite_code` (F-91, dort bewusst OHNE Pflicht-Befristung) hier `expires_at`
 * bewusst `notNull()` — der Anforderungskatalog verlangt für F-63 ausdrücklich eine zeitliche
 * Befristung (z. B. 7 Tage), da ein Sozial-Invite anders als ein Business-Lizenzcode ein
 * sicherheitsrelevantes Ziel ist (unbefugter Fremdkontakt). Mehrfach durch verschiedene Personen
 * einlösbar (kein Einmal-Ticket) — der Code ist ein teilbarer Link, keine personalisierte
 * Einladung an eine bestimmte E-Mail-Adresse, analog zum company_invite_code-Muster.
 */
export const inviteCode = pgTable(
  "invite_code",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    code: text("code").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("invite_code_user_id_kurs_id_idx").on(table.userId, table.kursId),
    index("invite_code_expires_at_idx").on(table.expiresAt),
  ],
);

/**
 * F-63: Freundschaft als EINE symmetrische Zeile statt zweier gerichteter Zeilen — kanonisch
 * sortiert (`user_id_a < user_id_b`, per CHECK erzwungen), damit weder Duplikate noch eine
 * "wer hat wen eingeladen"-Mehrdeutigkeit entstehen können. Bewusst `kurs_id`-gebunden (nicht
 * kontenweit global), weil laut Anforderungskatalog der Freundeskreis bei Mehrfach-Kursbelegung
 * (F-09) je Kurs getrennt ist — dieselben zwei Personen können in Kurs A befreundet sein und in
 * Kurs B (noch) nicht. Bildet die Grundlage für Highscore (F-60), Duelle (F-61) und
 * Lernpartner-Vermittlung (F-62, jeweils eigene, spätere Bausteine). Die automatische Ergänzung
 * um Kohorten-Mitgliedschaften (F-65) ist noch nicht Teil dieses Grundgerüsts, da Kohorten
 * (F-64/F-65) selbst noch nicht existieren.
 */
export const friendCircleLink = pgTable(
  "friend_circle_link",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    userIdA: uuid("user_id_a")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    userIdB: uuid("user_id_b")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("friend_circle_link_kurs_id_user_id_a_user_id_b_key").on(
      table.kursId,
      table.userIdA,
      table.userIdB,
    ),
    index("friend_circle_link_user_id_b_idx").on(table.userIdB),
    check("friend_circle_link_user_order_check", sql`${table.userIdA} < ${table.userIdB}`),
  ],
);

// ---------------------------------------------------------------------------
// Nicht-soziale Gamification (F-67) — Abschnitt 4.5 (Phase-4-Erweiterung)
// ---------------------------------------------------------------------------

/**
 * F-67: Individuelle Achievements/Abzeichen, bewusst ohne jeden Fremdkontakt — anders als
 * `friend_circle_link`/`highscore`/`lernpartner` KEINE `kurs_id`, da ein Achievement die gesamte
 * Lernreise einer Person über alle belegten Kurse hinweg würdigt (F-09: Mehrfach-Kursbelegung),
 * nicht eine einzelne Kurs-Mitgliedschaft. Der Achievement-Katalog selbst (Titel, Beschreibung,
 * Freischalt-Kriterium) ist bewusst als Server-Konstante geführt (`achievements/catalog.ts`),
 * nicht in einer eigenen DB-Tabelle — er ändert sich nur mit einem Code-Deployment, nicht zur
 * Laufzeit. Diese Tabelle speichert ausschließlich, WANN eine Person ein Kriterium erstmals
 * erfüllt hat (unveränderlich ab dem ersten Erreichen), damit ein späterer Rückgang (z. B. nach
 * einer Konto-Bereinigung) ein einmal verdientes Abzeichen nicht wieder entzieht.
 */
export const achievement = pgTable(
  "achievement",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    achievementKey: text("achievement_key").notNull(),
    earnedAt: timestamp("earned_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("achievement_user_id_achievement_key_key").on(table.userId, table.achievementKey)],
);
