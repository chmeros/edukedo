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
 * rollenbasierte Autorisierung, aber Abschnitt 4.3 hatte kein Feld dafür vorgesehen. "parent"
 * bleibt bewusst kein Wert hier, sondern der eigene Account-Typ "parent" (eigene Tabelle) —
 * siehe Abschnitt 13 für die Begründung.
 *
 * F-117 (Nutzer-Feedback vom 18.09.2026, Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): der ursprünglich dritte Rollenwert "content_editor" wurde entfernt — er wurde nie
 * vergeben und schaltete nirgends eine eigene Berechtigung frei (jeder `roleProcedure`-Aufruf im
 * gesamten Backend verlangt ausschließlich "admin"). Nur noch "learner"/"admin".
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
    // F-108 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): rein
    // optionaler Anzeigename für die namentliche Begrüßung beim Wiedereinstieg — bewusst kein
    // Pflichtfeld (Registrierung bleibt minimal), `null` löst den neutralen Begrüßungstext aus.
    displayName: text("display_name"),
    // F-104 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): Präferenz
    // für den vereinheitlichten "Lernen"-Tab — zwei unabhängige Schalter statt einer dritten
    // "Beides"-Spalte, da sich "Beides" widerspruchsfrei aus "beide an" ergibt. Default (true,
    // true) entspricht "Beides", bis eine Person die Erstbesuch-Abfrage beantwortet.
    learnFlashcardsEnabled: boolean("learn_flashcards_enabled").notNull().default(true),
    learnQuizEnabled: boolean("learn_quiz_enabled").notNull().default(true),
    // Unterscheidet "Default nie angefasst" (Erstbesuch-Abfrage noch zu zeigen) von einer
    // bewussten Entscheidung für exakt die Default-Kombination.
    learningModePreferenceSet: boolean("learning_mode_preference_set").notNull().default(false),
    // F-134 (26.09.2026, siehe Architekturplanung Abschnitt 13): steuert die einmalige
    // Erstbesuch-Einführung (Haupt-Tabs + Kopfzeilen-Symbole) — analog zu
    // `learningModePreferenceSet`, dauerhaft je Person statt nur pro Sitzung, damit sie nach
    // erneutem Login/auf einem anderen Gerät nicht erneut erscheint.
    onboardingHintsSeen: boolean("onboarding_hints_seen").notNull().default(false),
    // F-110 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): dauerhafte
    // Präferenz, ob eine Karteikarte zuerst mit Frage- oder Antwortseite angezeigt wird.
    flashcardStartWithAnswer: boolean("flashcard_start_with_answer").notNull().default(false),
    // F-118 (Nutzer-Feedback vom 18.09.2026, erweitert F-67, siehe Abschnitt 13): "Punktehamster" —
    // wächst monoton mit jeder richtig beantworteten Quiz-Frage (recordQuizAttempt, progress.ts),
    // sinkt nie bei falschen Antworten. Bewusst rein visuell/motivierend und UNABHÄNGIG von
    // `credits` (F-119) — kein Reset/Verbrauch, jede richtige Antwort zählt erneut, auch
    // Wiederholungen. Karteikarten (F-20, subjektive Selbsteinschätzung statt geprüfter Antwort)
    // zählen bewusst nicht mit, nur echte Quiz-Antworten.
    mascotFood: integer("mascot_food").notNull().default(0),
    // Abschalt-Option (Nutzer-Entscheidung 22.09.2026) — Default an, damit der Effekt ohne
    // Erstbesuch-Abfrage sofort wirkt (wie bei den übrigen opt-out-Präferenzen dieses Projekts).
    mascotEnabled: boolean("mascot_enabled").notNull().default(true),
    // F-90/F-66 (Nutzer-Entscheidung 23.09.2026, siehe Abschnitt 13): Freigabe der
    // "Fremdkontakt"-Gamification-Funktionen (Highscore F-60, Lernpartner-Vermittlung F-62 —
    // Duelle F-61 existiert noch nicht) für ein minderjähriges Konto. Default false (F-66:
    // "standardmäßig deaktiviert"). Bei volljährigen Konten ungenutzt, da dort ohnehin keine
    // Sperre greift. Wird AUSSCHLIESSLICH über parent.setChildGamificationEnabled geschrieben
    // (siehe trpc/routers/parent.ts) — die betroffene Person selbst kann diese Spalte nicht
    // setzen, anders als z. B. mascotEnabled.
    gamificationEnabled: boolean("gamification_enabled").notNull().default(false),
    // F-70/F-80 (Nutzer-Vorgabe 25.09.2026, siehe Abschnitt 13): F-70 (KI-Bewertung) ist laut
    // Anforderungskatalog eine "dauerhaft kostenpflichtige" Funktion — seit der Umstellung auf
    // den echten Payment-Service NICHT mehr über ein eigenes admin-vergebbares Flag gesteuert,
    // sondern über den allgemeinen Abo-Status (`premiumUntil` unten, siehe `isPremiumActive` in
    // `auth/premium-status.ts`). Das vormalige `ai_grading_enabled`-Flag (Interimslösung vom
    // 23.09.2026, admin.setAiFeatureFlags) entfällt damit vollständig.
    // `aiGenerationEnabled` (F-71) bleibt bewusst EIGENES, weiterhin admin-only vergebenes Flag
    // (nicht implizit durch die Admin-Rolle freigeschaltet, kein Abo-Bezug) — F-71 läuft laut
    // Nutzer-Vorgabe vom 25.09.2026 vorerst extern (separates GPT-Werkzeug) statt über die
    // Plattform, die Freischaltung bleibt aber bestehen für eine spätere Reaktivierung.
    aiGenerationEnabled: boolean("ai_generation_enabled").notNull().default(false),
    // F-119 (Nutzer-Feedback vom 18.09.2026, Nutzer-Entscheidung 22.09.2026, siehe Abschnitt 13):
    // echte, ausgebbare Lernwährung — anders als `mascotFood` NUR beim ERSTEN richtigen
    // Beantworten eines Content-Items vergeben (Anti-Farming, recordQuizAttempt prüft die
    // learning_event-Historie), Menge gestaffelt nach content_item.difficulty. Kein Verbrauchsweg
    // existiert bisher (F-120, noch offen — siehe Anforderungskatalog Abschnitt 10, Punkt 5).
    credits: integer("credits").notNull().default(0),
    // Payment-Service-Grundgerüst (Iteration 6, siehe Abschnitt 13): lokaler Cache des von
    // apps/payment per Event-Queue gemeldeten Abo-Status (`subscription.updated`) — vermeidet
    // einen synchronen REST-Aufruf bei jedem Request, der prüfen will, ob Premium aktiv ist
    // (Architekturplanung Abschnitt 3: "beim Login prüfen, ob Premium aktiv ist"). `null` = kein
    // aktives Abo. Ein doppelt zugestelltes Event überschreibt denselben absoluten Wert erneut —
    // von Natur aus idempotent, siehe apps/payment/src/queue/events.ts. Seit 25.09.2026 (Nutzer-
    // Vorgabe, siehe Abschnitt 13) zusätzlich die alleinige Quelle für die Freischaltung von F-70
    // (KI-Bewertung) und F-129 (Instrumenten-Lernpfade) — siehe `auth/premium-status.ts` — statt
    // der vormaligen, hier gelöschten separaten Admin-Flags je Funktion.
    premiumUntil: timestamp("premium_until", { withTimezone: true }),
    // F-43 (Nutzer-Entscheidung 22.09.2026, siehe Abschnitt 13): wann zuletzt eine
    // Web-Push-Lernerinnerung verschickt wurde — verhindert, dass send-learning-reminders.ts
    // bei jedem (externen, periodischen) Aufruf erneut erinnert, solange dieselbe Lernpause
    // andauert. `null` = noch nie erinnert. Bewusst auf `user` statt auf `push_subscription`
    // (unten), da die Erinnerung dem KONTO gilt, nicht einem einzelnen Gerät.
    lastReminderSentAt: timestamp("last_reminder_sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("user_role_check", sql`${table.role} in ('learner', 'admin')`),
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

/**
 * F-01 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13):
 * Bestätigungstoken für die E-Mail-Verifizierung — dasselbe Muster wie consent_token
 * (nur der Hash wird gespeichert), aber an "user" statt "parent_child_link" gebunden. Nur für
 * volljährige Konten relevant (siehe Abschnitt 13) — minderjährige Konten verschicken keine.
 */
export const emailVerificationToken = pgTable(
  "email_verification_token",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
  },
  (table) => [index("email_verification_token_expires_at_idx").on(table.expiresAt)],
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
    // F-110 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): rein
    // additive, manuelle "schwierig"-Markierung — bewusst unabhängig von difficulty/stability/
    // due_at, beeinflusst den FSRS-Ablauf nicht (Nutzer-Entscheidung 21.09.2026).
    flaggedAsDifficult: boolean("flagged_as_difficult").notNull().default(false),
    // F-111 (Ergänzung, nicht im ursprünglichen SQL-DDL enthalten, siehe Abschnitt 13): Snapshot
    // des FSRS-Zustands VOR der jeweils letzten Bewertung (difficulty/stability/state/dueAt/
    // lastReviewedAt/reps/lapses/lastResult als JSON) — Basis für "echtes Rückgängig" bei einer
    // nachträglichen Änderung der Selbsteinschätzung (Nutzer-Entscheidung 21.09.2026). `null`
    // solange eine Karte noch nie bewertet wurde.
    previousSnapshot: jsonb("previous_snapshot"),
  },
  (table) => [
    uniqueIndex("user_progress_user_id_content_item_id_key").on(table.userId, table.contentItemId),
    index("user_progress_user_id_due_at_idx").on(table.userId, table.dueAt),
  ],
);

// ---------------------------------------------------------------------------
// Eigene Notizen zu Lerneinheiten (F-15) — Ergänzung, nicht im ursprünglichen SQL-DDL
// enthalten, siehe Abschnitt 13. Eigenständige Tabelle statt einer Erweiterung von
// user_progress: eine Notiz ist unabhängig vom FSRS-/Quiz-Fortschritt eines Items und soll auch
// zu Content-Typen ohne user_progress-Zeile (z. B. Fallaufgaben, Fachgesprächsfragen) möglich
// sein. Genau eine Notiz je (user_id, content_item_id) — dieselbe Composite-Unique-Konvention
// wie bei user_progress.
// ---------------------------------------------------------------------------
export const userNote = pgTable(
  "user_note",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "cascade" }),
    noteText: text("note_text").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("user_note_user_id_content_item_id_key").on(table.userId, table.contentItemId)],
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

/**
 * N-08: Start/Abschluss eines Übungssets (Quiz- oder Mischmodus-Runde, siehe F-22) — Grundlage
 * für die in Abschnitt 11 definierte KPI "Abschlussquote von Übungssets". Bewusst als eigene
 * Tabelle statt Ableitung aus `learning_event`: Ein Event-Log allein kennt keine "Rundengröße"
 * und könnte daher nie unterscheiden, ob eine Runde vollständig durchlaufen oder nach der
 * ersten Frage abgebrochen wurde. Nur online erfasst (kein Offline-Sync-Baustein wie F-42) —
 * ein offline begonnenes/abgeschlossenes Übungsset fließt aktuell nicht in die KPI ein, siehe
 * apps/web/src/Quiz.tsx/MixedLearning.tsx. Reine Karteikarten-Sitzungen (F-20, endlos bis zum
 * Abbruch, keine feste Zielgröße) zählen bewusst nicht als "Übungsset" im Sinne dieser KPI.
 */
export const exerciseSet = pgTable(
  "exercise_set",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    themaId: uuid("thema_id").references(() => thema.id, { onDelete: "set null" }),
    mode: text("mode").notNull(),
    totalItems: integer("total_items").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    index("exercise_set_user_id_started_at_idx").on(table.userId, table.startedAt),
    check("exercise_set_mode_check", sql`${table.mode} in ('quiz', 'mixed')`),
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

/**
 * F-70 (Nutzer-Entscheidung 23.09.2026, siehe Abschnitt 13): asynchrone KI-Bewertungs-Anfrage
 * für eine bereits eingereichte Fallaufgaben-Abgabe (`exam_answer`) — "Die Bewertung läuft
 * asynchron (Job-Queue): Nutzer:innen reichen die Abgabe ein, können währenddessen weiterlernen
 * und werden benachrichtigt (siehe F-43), sobald das Ergebnis vorliegt". `exam_answer_id`
 * bewusst `onDelete: cascade` — reicht eine Person dieselbe Fallaufgabe erneut ein, ersetzt
 * `exam.submitAnswer` die vorhandene `exam_answer`-Zeile per Delete+Insert (siehe dort), ein
 * daran hängender Job für die alte Abgabe wird damit automatisch mit entsorgt statt verwaist
 * stehen zu bleiben. `user_id` zusätzlich zur über `exam_answer` erreichbaren Kette gespeichert,
 * da der asynchrone Worker (queue/ai-grading-queue.ts) direkt wissen muss, wen er per Web Push
 * benachrichtigen soll, ohne über drei Tabellen zurückzujoinen.
 */
export const aiGradingJob = pgTable(
  "ai_grading_job",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    examAnswerId: uuid("exam_answer_id")
      .notNull()
      .references(() => examAnswer.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("queued"),
    /** F-70 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): strukturiert
     * statt Freitext — ein Array `{ feedback: string, points: number }[]` in derselben
     * Reihenfolge wie die Teilaufgaben der bewerteten Fallaufgabe, ermöglicht dem Frontend den
     * Vergleich mit der Selbsteinschätzung je Teilaufgabe (`exam_answer.given_answer`). Löst das
     * vormalige freie `result_text`-Feld ab. */
    resultParts: jsonb("result_parts"),
    errorMessage: text("error_message"),
    requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    index("ai_grading_job_exam_answer_id_idx").on(table.examAnswerId),
    check("ai_grading_job_status_check", sql`${table.status} in ('queued', 'processing', 'completed', 'failed')`),
  ],
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

/**
 * F-61 (Nutzer-Entscheidung 23.09.2026, siehe Architekturplanung Abschnitt 13): Asynchrone
 * 1:1-Wissensduelle innerhalb des Freundeskreises (F-63) je Kurs. Bewusst als EINE Zeile mit
 * gedoppelten "challenger"/"opponent"-Spalten statt einer separaten Teilnehmenden-Tabelle — die
 * Rollenzahl ist mit genau zwei fest (kein variabler Teilnehmendenkreis wie bei
 * `friend_circle_link`), eine zweite Tabelle wäre hier nur ein unnötiger Join für die häufigste
 * Abfrage ("zeig mir den Status dieses Duells"). Kein separater "annehmen/ablehnen"-Schritt: der
 * Anforderungskatalog beschreibt nur den Ablauf ab dem eingefrorenen Fragenpool, nicht eine
 * Bestätigung davor — beide Seiten können unabhängig voneinander jederzeit ihren eigenen
 * Durchgang spielen ("asynchron"), ein nie beantwortetes Duell läuft nach 7 Tagen einfach ab.
 * `startedAt` markiert die erste Antwort (nicht `created_at`), damit die Zeit als
 * Sekundärkriterium tatsächliche Bearbeitungszeit misst statt der (bei asynchronem Spiel
 * beliebigen) Kalenderzeit bis zum Beginn.
 */
export const duell = pgTable(
  "duell",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    challengerUserId: uuid("challenger_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    opponentUserId: uuid("opponent_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("offen"),
    questionCount: integer("question_count").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // F-61: "läuft automatisch nach 7 Tagen ab" — bei Erstellung fest berechnet statt einer
    // Ableitung aus createdAt bei jeder Abfrage, damit eine spätere Änderung der Fristdauer
    // bereits laufende Duelle nicht rückwirkend verändert.
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    // Erinnerung "kurz vor Ablauf" (siehe F-43) — verhindert einen doppelten Versand bei
    // wiederholten Skriptläufen, analog zu user.last_reminder_sent_at.
    reminderSentAt: timestamp("reminder_sent_at", { withTimezone: true }),
    challengerStartedAt: timestamp("challenger_started_at", { withTimezone: true }),
    challengerFinishedAt: timestamp("challenger_finished_at", { withTimezone: true }),
    challengerCorrectCount: integer("challenger_correct_count"),
    // F-61: "individuell konfigurierbar ..., Standardeinstellung: nur Gesamtergebnis" — je
    // Person ein eigener Schalter, ob die GEGENSEITE die eigenen Einzelfragen-Ergebnisse sehen
    // darf (nicht umgekehrt "ob ich die der Gegenseite sehen will" — das ergibt sich stattdessen
    // aus dem Schalter der jeweils ANDEREN Person, siehe duell.ts `get`).
    challengerRevealDetails: boolean("challenger_reveal_details").notNull().default(false),
    opponentStartedAt: timestamp("opponent_started_at", { withTimezone: true }),
    opponentFinishedAt: timestamp("opponent_finished_at", { withTimezone: true }),
    opponentCorrectCount: integer("opponent_correct_count"),
    opponentRevealDetails: boolean("opponent_reveal_details").notNull().default(false),
  },
  (table) => [
    index("duell_challenger_user_id_kurs_id_idx").on(table.challengerUserId, table.kursId),
    index("duell_opponent_user_id_kurs_id_idx").on(table.opponentUserId, table.kursId),
    index("duell_status_expires_at_idx").on(table.status, table.expiresAt),
    check("duell_status_check", sql`${table.status} in ('offen', 'abgeschlossen', 'abgelaufen')`),
    check("duell_distinct_participants_check", sql`${table.challengerUserId} <> ${table.opponentUserId}`),
  ],
);

/**
 * F-61: der beim Duell-Start eingefrorene Fragenpool — EINE Zeile je Frage, geteilt von beiden
 * Duellpartner:innen (nicht je Person dupliziert, da der Pool laut Anforderungskatalog für
 * beide Seiten identisch ist). `contentItemVersionId` (nicht `contentItemId`) ist der
 * eigentliche Fairness-Anker (F-12/F-61: "Frage-IDs inkl. Content-Version") — spätere
 * Content-Änderungen an genau diesem Item wirken sich damit nicht mehr auf ein laufendes/
 * abgeschlossenes Duell aus, analog zu `exam_answer.content_item_version_id`.
 * `contentItemId` zusätzlich (denormalisiert) gespeichert, damit `duell.submitAnswer` eine
 * eingereichte Antwort ohne Umweg über `content_item_version` der richtigen Frage zuordnen kann
 * (Frontend sendet `contentItemId`, wie schon bei quiz.submitAnswer/preview.submitAnswer).
 */
export const duellQuestion = pgTable(
  "duell_question",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    duellId: uuid("duell_id")
      .notNull()
      .references(() => duell.id, { onDelete: "cascade" }),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItem.id, { onDelete: "restrict" }),
    contentItemVersionId: uuid("content_item_version_id")
      .notNull()
      .references(() => contentItemVersion.id, { onDelete: "restrict" }),
    sortOrder: integer("sort_order").notNull(),
  },
  (table) => [
    uniqueIndex("duell_question_duell_id_content_item_id_key").on(table.duellId, table.contentItemId),
    index("duell_question_duell_id_sort_order_idx").on(table.duellId, table.sortOrder),
  ],
);

/**
 * F-61: eine eingereichte Antwort einer der beiden Duellpartner:innen auf eine `duell_question`
 * — je Person höchstens eine Zeile je Frage (siehe unique Index), Bewertung wiederverwendet
 * `checkMcAnswer` (quiz-logic.ts) genau wie quiz.submitAnswer/preview.submitAnswer. Fragenpool
 * bewusst auf `MC_LIKE_QUIZ_TYPES` beschränkt (siehe trpc/routers/duell.ts) — eine einzelne,
 * gewählte Options-ID genügt damit für alle Duell-Fragen, keine typspezifischen
 * `given_answer`-JSONB-Varianten wie bei `exam_answer` nötig.
 */
export const duellAnswer = pgTable(
  "duell_answer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    duellQuestionId: uuid("duell_question_id")
      .notNull()
      .references(() => duellQuestion.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    selectedOptionId: uuid("selected_option_id")
      .notNull()
      .references(() => answerOption.id, { onDelete: "restrict" }),
    isCorrect: boolean("is_correct").notNull(),
    answeredAt: timestamp("answered_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("duell_answer_duell_question_id_user_id_key").on(table.duellQuestionId, table.userId)],
);

/**
 * F-64/F-65 (Nutzer-Entscheidung 23.09.2026, siehe Abschnitt 13): Lehrgangsgruppe (Kohorte), je
 * Kurs angelegt (F-64: "Lehrgangsgruppen (Kohorten) sind je Kurs angelegt"). Bewusst KEIN neuer
 * `user.role`-Wert für die Dozenten-Rolle (F-07), obwohl Architekturplanung Abschnitt 7
 * ursprünglich genau das vorsah — "Dozent:in sein" ist inhärent JE KOHORTE (dieselbe Person kann
 * Dozent:in dieser Kohorte und ganz normale Lernperson in einem anderen Kurs sein), ein
 * platform­weiter Rollenwert würde diese Granularität nicht abbilden und wäre weitgehend
 * redundant, da die eigentliche Autorisierung ohnehin je Kohorte geprüft werden muss (siehe
 * F-117, Abschnitt 13 — bereits einmal ein nie sauber genutzter Rollenwert entfernt). Stattdessen
 * einfache Eigentümerschaft über `dozent_user_id` (verweist auf dieselbe `user`-Tabelle, kein
 * eigener Account-Typ wie bei `parent`/`company_account`) — Autorisierung je Anfrage über
 * `cohort.dozent_user_id = ctx.currentUser.id`, analog zu `company.stats`s
 * `ctx.currentCompanyAdmin.id`-Prüfung, nur ohne zusätzliche Session-Spalte/Middleware.
 * Selbstbedienung statt Admin-Anlage (anders als `company_account`, das an eine
 * Abrechnungsfreischaltung hängt) — eine Kohorte ist eine rein organisatorische, unbezahlte
 * Struktur ohne Freischalt-Bedarf; jede eingeschriebene Person kann eine Kohorte für ihren Kurs
 * anlegen und wird dabei automatisch deren Dozent:in.
 */
export const cohort = pgTable(
  "cohort",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    dozentUserId: uuid("dozent_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // Einzelner, ersetzbarer Code statt einer eigenen Mehrfach-Code-Tabelle wie bei
    // `invite_code`/`company_invite_code` — eine Kohorte braucht typischerweise nur EINEN
    // Beitritts-Link, den die Dozent:in an ihre Gruppe weitergibt; `regenerateJoinCode` deckt den
    // seltenen Fall eines kompromittierten/nicht mehr gewünschten Codes ab.
    joinCode: text("join_code").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("cohort_dozent_user_id_idx").on(table.dozentUserId)],
);

/**
 * F-65: "Mitglieder einer Lehrgangsgruppe werden automatisch in den kursbezogenen Freundeskreis
 * (F-63) der anderen Gruppenmitglieder aufgenommen" — beim Beitritt (`cohort.join`) werden
 * `friend_circle_link`-Zeilen mit allen bereits vorhandenen Mitgliedern angelegt (siehe
 * trpc/routers/cohort.ts), diese Tabelle hält nur die Kohorten-Zugehörigkeit selbst.
 * Dozent:in-Konto bewusst NICHT automatisch Mitglied (analog zu `company_admin`, der/die auch
 * nicht in den eigenen `company.stats` mitgezählt wird) — die aggregierten Kennzahlen sollen die
 * Lerngruppe abbilden, nicht die Dozent:in selbst.
 */
export const cohortMember = pgTable(
  "cohort_member",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cohortId: uuid("cohort_id")
      .notNull()
      .references(() => cohort.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("cohort_member_cohort_id_user_id_key").on(table.cohortId, table.userId)],
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

// ---------------------------------------------------------------------------
// Web-Push-Benachrichtigungen (F-43) — Nutzer-Entscheidung 22.09.2026, siehe Abschnitt 13
// ---------------------------------------------------------------------------

/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)"): eine Zeile je abonniertem Browser/Gerät — eine Web-Push-
 * Subscription (`endpoint`/`keys.p256dh`/`keys.auth`) ist pro Browser-Installation eindeutig,
 * ein Konto kann mehrere gleichzeitig haben (Handy + Laptop). Bewusst KEIN zusätzliches
 * `push_enabled`-Flag auf `user` — ob mindestens eine Zeile existiert, IST der Opt-in-Zustand
 * (Abmelden löscht die Zeile statt ein Flag umzuschalten); das erspart eine zweite Quelle der
 * Wahrheit, die vom tatsächlichen Abo-Zustand des Browsers auseinanderlaufen könnte.
 */
export const pushSubscription = pgTable("push_subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // Global eindeutig (vom Push-Dienst des Browser-Herstellers vergeben), nicht nur je Nutzer —
  // deckt zugleich den Fall ab, dass sich derselbe Browser erneut anmeldet.
  endpoint: text("endpoint").notNull().unique(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Instrumenten-Lernpfad (F-129/F-130/F-131) — Nutzer-Vorgabe vom 24.09.2026, siehe Abschnitt 13
// ---------------------------------------------------------------------------

/**
 * F-129: ein geführter, mehrstufiger Lernpfad je Instrument (z. B. Balanced Scorecard) und Kurs —
 * bewusst EINE Zeile je Kurs+Instrument-Kombination mit dem GESAMTEN Pfad (Narrativ + sieben
 * Stationen) als JSONB-Payload, keine relationale Zerlegung in content_item/answer_option (siehe
 * packages/shared/src/schemas/instrument-lernpfad.ts für die ausführliche Begründung). Die
 * Payload-Struktur wird ausschließlich auf Anwendungsebene validiert (Zod), analog zu
 * content_item.payload (Architekturplanung Abschnitt 4.1) — die DB erzwingt sie bewusst nicht.
 */
export const instrumentLernpfad = pgTable(
  "instrument_lernpfad",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kursId: uuid("kurs_id")
      .notNull()
      .references(() => kurs.id, { onDelete: "cascade" }),
    // Kein FK auf einen bestehenden content_item.type-Wert — Instrumente wie "bsc" existieren
    // sowohl als eigener Fragetyp (F-114) als auch potenziell als Lernpfad; beide Konzepte bleiben
    // bewusst unabhängig voneinander (siehe F-105-Abgrenzung im Anforderungskatalog).
    instrumentType: text("instrument_type").notNull(),
    title: text("title").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("instrument_lernpfad_kurs_id_instrument_type_key").on(table.kursId, table.instrumentType)],
);

/**
 * F-129 (Abschluss-Selbsteinschätzung): "getrennt vom eigentlichen Pfad-Ergebnis gespeichert...
 * unbewertet" — eigene, sehr schlanke Tabelle statt Wiederverwendung von `learning_event`
 * (das ist an `content_item`/`is_correct` gebunden und fachlich für GEWERTETE Antworten gedacht,
 * siehe Architekturplanung Abschnitt 4.4). Ein Upsert je (user, lernpfad) — ein erneuter Durchlauf
 * ersetzt die vorherige Einschätzung, statt eine Historie aufzubauen (für "Vorher/Nachher-
 * Vergleich bei einem späteren Durchlauf", siehe Pflege-Referenz-Content, reicht der jeweils
 * letzte Wert; eine Verlaufsanzeige ist nicht Teil dieser ersten Umsetzung).
 */
export const instrumentLernpfadSelbsteinschaetzung = pgTable(
  "instrument_lernpfad_selbsteinschaetzung",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    instrumentLernpfadId: uuid("instrument_lernpfad_id")
      .notNull()
      .references(() => instrumentLernpfad.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("instrument_lernpfad_selbsteinschaetzung_user_id_lernpfad_id_key").on(
      table.userId,
      table.instrumentLernpfadId,
    ),
    check("instrument_lernpfad_selbsteinschaetzung_rating_check", sql`${table.rating} between 0 and 10`),
  ],
);
