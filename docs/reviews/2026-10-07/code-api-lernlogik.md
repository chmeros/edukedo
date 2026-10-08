# Code-Review apps/api — Lern-Kernlogik und Datenintegrität

Stand: 07.10.2026, Branch `claude/projektstruktur-analyse-3c1ccb`. Rein lesende Prüfung (Quelltext, Migrationen, Tests, lesende Abfragen auf die lokale Entwicklungs-DB). Es wurde nichts geändert, nichts committet, kein Server gestartet.

Geprüft: `trpc/routers/` content, quiz, progress, exam, game, glossar, notes, offline, instrumentLernpfad, courses, gamification, highscore (Randbereich), ai (nur Bezug zu exam), `achievements/catalog.ts`, `pacing.ts`, `progress-items.ts`, `game-sprint-token.ts`, `packages/shared` (`quiz-logic.ts`, `fsrs/scheduler.ts`, `game-logic*.ts`, Schemas), `db/schema.ts`, `drizzle/`-Migrationen, `db/import-content.ts`, `db/freigeben.ts`, Tests in `apps/api/src/*.test.ts` und `apps/api/test/*.integration.test.ts`. Die lokale DB wurde per `psql` nur gelesen (Constraints, Indizes, Zählungen).

## Kurzfazit

Die Kernlogik ist insgesamt sorgfältig gebaut: Der Fortschritts-Nenner (`progress.overview`, `courses.progress`, `progress.pacing`, `exam.guide`) filtert konsequent auf `is_active` und auf `PROGRESS_COUNTABLE_TYPES`, der Zähler ist immer eine Teilmenge des Nenners, 0/0 ist überall abgefangen. Alle Lese-Endpunkte für Lerninhalte joinen über `user_course` und `is_active`, die Schreib-Endpunkte (`quiz.submit*`, `submitReview`, Offline-Sync) prüfen Kurszugehörigkeit und Aktiv-Status. Das Drizzle-Schema und die laufende DB entsprechen dem SQL aus Architekturplanung §4.3 bis auf dokumentierte Ergänzungen; die Migrationen sind unauffällig (43 Dateien, Journal vollständig, nur zwei bewusste Spalten-Drops).

Die größten Risiken liegen nicht in der Antwortbewertung, sondern an drei Stellen:

1. Der Bulk-Import (`importAllContent`, auch per Admin-Button auslösbar) ersetzt Content je Thema durch Löschen und Neuanlegen. Wegen `ON DELETE CASCADE` verschwinden dabei `user_progress`, `learning_event` und `user_note` aller Lernenden, und der Vorgang ist nicht atomar (LOG-01).
2. Die Credit-Rücknahme beim Lernrunden-Abbruch behandelt Karteikarten falsch (LOG-02), und der Offline-Sync vertraut dem Client-Zeitstempel ungeprüft (LOG-03).
3. Mehrere Kennzahlen (Streak, Tagesstatistik, Wochenfenster) rechnen in UTC statt in der Zeitzone der Lernenden, und Ranglisten/Achievements/Trefferquote zählen jedes Antwort-Ereignis ohne Idempotenz (LOG-06, LOG-09).

Testlücken: Prüfungssimulation (`exam.start/submitAnswer/finish`), nebenläufige Anfragen, Zeitzonen, Fortschrittsprozente mit inaktiven Items und Abbruch einer reinen Karteikarten-Runde sind kaum oder gar nicht getestet (siehe Abschnitt „Testlücken“).

## Befundtabelle

Schwere: Blocker (Datenverlust oder nicht tragbar für Produktivbetrieb), Hoch (falsches Ergebnis im Normalbetrieb), Mittel, Niedrig, Hinweis.

| ID | Schwere | Ort | Thema |
|---|---|---|---|
| LOG-01 | Blocker | `db/import-content.ts:440-450`, `trpc/routers/admin.ts:111-120`, `db/schema.ts:388,431,462` | Re-Import löscht Lernfortschritt aller Lernenden, nicht atomar |
| LOG-02 | Hoch | `trpc/routers/progress.ts:540-566` | Abbruch einer Karteikarten-Runde zieht nie vergebene Credits ab |
| LOG-03 | Hoch | `trpc/routers/offline.ts:146,222-248`, `progress.ts:198,270`, `packages/shared/src/schemas/offline-sync.ts:33-38` | Offline-Sync übernimmt `occurredAt` ungeprüft |
| LOG-04 | Mittel | `trpc/routers/exam.ts:219-295,302-328` | Prüfungssimulation: Item/Session/Kurs nicht gebunden, nach `finish` änderbar |
| LOG-05 | Mittel | `exam.ts:264-275`, `ai.ts:160-181`, `db/schema.ts:596-607` | Veraltete KI-Bewertung nach erneutem Einreichen |
| LOG-06 | Mittel | `achievements/catalog.ts:46-91`, `gamification.ts:52,134,168`, `progress.ts:807,1068` | Alle Tagesgrenzen in UTC |
| LOG-07 | Mittel | `trpc/routers/content.ts:53,87-92` | Neue Karten verdrängen fällige Wiederholungen |
| LOG-08 | Mittel | `quiz.ts:127-261`, `progress.ts:861-864`, `shared/quiz-logic.ts:1001-1010` | Submit-Endpunkte prüfen `content_item.type` nicht |
| LOG-09 | Mittel | `highscore.ts:89-103`, `gamification.ts:44-65`, `progress.ts:169-173`, `exam.ts:286-292` | Rangliste, Achievements, Trefferquote: jede Antwort zählt, online ohne Idempotenz |
| LOG-10 | Mittel | `gamification.ts:40-52,100-103,164-169`, `progress.ts:584-598`, `db/schema.ts:486`, `db/send-learning-reminders.ts:36-43` | Ereignislisten werden unbegrenzt komplett geladen, fehlender Index |
| LOG-11 | Mittel | `progress.ts:231-325,372-452` | `applyReview`/`applyChangeReview` ohne Sperre (Lost Update) |
| LOG-12 | Mittel | `progress.ts:470-483,1019-1038`, `apps/web/src/Quiz.tsx:124` | `abortRound`: Client-Uhr als Schranke, nicht atomar, ungedeckelte Liste |
| LOG-13 | Mittel | `offline.ts:216-260`, `apps/web/src/offlineSync.ts:35-47`, `adminContent.ts:595-598` | Offline-Sync: Giftbeiträge bleiben ewig, Batches nicht chronologisch, Optionen-IDs ändern sich |
| LOG-14 | Mittel | `notes.ts:27-46,58-86` | Notizen: keine Zugriffsprüfung, `list` zeigt Texte deaktivierter Items |
| LOG-15 | Mittel | `game.ts:192-205,389-403,317-323,544-554` | Spielstand: Lost Update, `completedAt` springt zurück, ungeprüfte Runde |
| LOG-16 | Niedrig | `game-sprint-token.ts:21-39`, `game.ts:534-554` | Sprint-Token wiederverwendbar, Bestwert fälschbar |
| LOG-17 | Niedrig | `quiz.ts:135`, `game.ts`, `instrumentLernpfad.ts:189-221`, `app.ts:39-43` | Fachliche Fehler enden als HTTP 500 und füllen das Fehlerlog |
| LOG-18 | Niedrig | `progress.ts:372-452` | `changeReview` zeitlich unbegrenzt |
| LOG-19 | Niedrig | `progress.ts:797,845-848`, `pacing.ts:33-34` | Pacing: Zieltag ab Mitternacht UTC „überfällig“, leerer Kurs gilt als fertig |
| LOG-20 | Niedrig | `db/schema.ts` (u. a. 163, 391), Architekturplanung §4.3 | Fehlende CHECK-Constraints, Doku §4.3 veraltet |
| LOG-21 | Niedrig | `db/freigeben.ts:41-45` | `freigeben` reaktiviert auch redaktionell deaktivierte Items |
| LOG-22 | Niedrig | `content.ts`, `quiz.ts`, `offline.ts` | `content_item.is_premium` wird nirgends ausgewertet |
| LOG-23 | Niedrig | `progress.ts:923-931,975-988`, `game.ts:272-278`, `schemas/course.ts:50-53` | Fehlende Eingabegrenzen und Einschreibungsprüfungen, keine Ratenbegrenzung |
| LOG-24 | Hinweis | `shared/game-logic-weitere.ts:171-178,210` | Code-Reihenfolge: gleiche Zeilen erhalten dieselbe ID |
| LOG-25 | Hinweis | `shared/fsrs/scheduler.ts:13,77` | FSRS-Fälligkeit minutengenau, kein Fuzz, ts-fsrs 4.7.1 |
| LOG-26 | Hinweis | `exam.ts`, `shared/schemas/exam.ts` | Zeitlimit der Prüfung nur im Client (dokumentiert) |

---

## Details

### LOG-01 (Blocker) Re-Import ersetzt Content per Löschen und Neuanlegen und vernichtet dabei Lernfortschritt

Beleg: `apps/api/src/db/import-content.ts:440-450` löscht für jedes bereits vorhandene Thema alle `content_item` (`db.delete(contentItem)…`) und legt sie mit neuen UUIDs wieder an. Der Kommentar dort nennt als Voraussetzung, es gebe „noch keine echten Nutzerdaten“. `importAllContent()` (`import-content.ts:858-890`) verarbeitet bei jedem Lauf alle Kurse und alle Themen; ausgelöst durch `pnpm db:import-content` oder durch `admin.triggerImport` (`trpc/routers/admin.ts:111-120`, Rolle admin, per Button im Admin-Bereich).

Folgen laut Schema (`db/schema.ts`): `user_progress.content_item_id` (Z. 388), `learning_event.content_item_id` (Z. 462), `user_note.content_item_id` (Z. 431), `answer_option`, `content_item_version`, `content_item_tag`, `content_report` kaskadieren (`ON DELETE CASCADE`). `exam_answer` (Z. 580) und `duell_question` (Z. 1114/1117) sind `RESTRICT`.

Fehlerszenario: Ein Redakteur korrigiert einen Tippfehler in einem Thema und klickt „Content-Import“. Für jedes Thema ohne Prüfungsantworten und Duell-Bezug verschwinden sofort Fortschritt (FSRS-Zustand, „beherrscht“), die gesamte Ereignishistorie (Trefferquote, Schwachstellen, Streak, Achievement-Grundlage, Highscore) und die Notizen aller Lernenden zu diesen Items; Prozentanzeigen springen auf 0. Für Themen mit Fallaufgaben-Prüfungsantworten oder Duell-Fragen schlägt dagegen das `DELETE` mit einem FK-Fehler fehl. Da `importThemaFile` nicht in einer Transaktion läuft (alle Schreibzugriffe über `db`, nicht über `tx`), bleibt der Lauf mittendrin stehen: frühere Themen sind bereits neu angelegt, spätere noch alt. Auch `importGlossarFiles` löscht das Glossar eines Kurses (Z. 802) vor dem Neuanlegen und kann bei einem Fehler (mehrdeutiger Begriff, unbekanntes Thema) mit leerem Glossar zurückbleiben.

Die Architekturplanung §4.1/§4.4 verspricht das Gegenteil („Versionierung statt Hard-Delete bei Content“, „`is_active` ersetzt einen harten Löschvorgang“). Die Folge für Prüfungsantworten ist in §13 (Eintrag zum RESTRICT, ca. Z. 2542) vermerkt, der stille Verlust von `user_progress`/`learning_event`/`user_note` nicht.

Empfehlung: Vor dem ersten Produktivbetrieb auf inkrementellen Upsert umstellen (Items über einen stabilen Schlüssel aus dem Zwischenformat, z. B. Thema + laufende Nummer oder Hash des Prompts, wiederfinden; fehlende Items per `is_active = false` zurückziehen; Optionen ersetzen). Bis dahin `admin.triggerImport` und `db:import-content` in Produktion sperren (Umgebungsvariable/Guard) und den Import je Thema in einer Transaktion ausführen. Test ergänzen: Import, Antwort abgeben, erneuter Import, Fortschritt muss erhalten bleiben.

### LOG-02 (Hoch) Rundenabbruch zieht für Karteikarten Credits ab, die nie vergeben wurden

Beleg: `progress.ts:540-566` (`abortRoundItem`). Der Block `if (event.isCorrect) { … }` behandelt `mascotFood` korrekt nur für Nicht-Karteikarten (Z. 542), die Credit-Rücknahme (Z. 548-565, `greatest(credits - amount, 0)`) steht aber außerhalb dieser Bedingung. Credits werden jedoch ausschließlich in `recordQuizAttempt` (Z. 107-123, 180-187) vergeben, `applyReview` (Z. 231-325) vergibt nie welche.

Fehlerszenario: Eine lernende Person hat im Quiz 6 Credits verdient. Sie startet eine Karteikarten-Runde, bewertet drei Karten (mittel, schwer, mittel) mit „gewusst“ und bricht die Runde ab (F-125). Für jede Karte, zu der es kein weiteres richtiges Ereignis gibt, werden 2 bzw. 3 Credits abgezogen, das Konto fällt auf 0. Der Test `test/abort-round.integration.test.ts` prüft Credits nur für eine Quiz-Antwort.

Empfehlung: Credit-Rücknahme innerhalb von `if (item.type !== "karteikarte")` verlagern; Test für Karteikarte mit vorhandenem Guthaben ergänzen.

### LOG-03 (Hoch) Offline-Sync: `occurredAt` wird ungeprüft übernommen

Beleg: `shared/schemas/offline-sync.ts:33-38` (`occurredAt: z.coerce.date()`, keine Ober-/Untergrenze), `offline.ts:146` (Sortierung), `offline.ts:222-248` (Weitergabe an `applyReview`/`recordQuizAttempt`), `progress.ts:198-200` und `270-272` (Ereignis wird bei `occurredAt <= lastReviewedAt` nicht mehr auf `user_progress` angewendet).

Fehlerszenario A (ehrlicher Fehler): Ein Gerät mit falscher Uhr (z. B. ein Jahr voraus) synchronisiert eine offline bewertete Karte. `user_progress.last_reviewed_at` liegt danach in der Zukunft. Jede spätere Online-Bewertung dieser Karte ist `now <= lastReviewedAt` und wird in `applyReview` stillschweigend verworfen (Rückgabe des alten `dueAt`), das Ereignis steht trotzdem im Verlauf. Die Karte ist ein Jahr lang eingefroren, die Person merkt es nicht.
Fehlerszenario B (Manipulation): Per eigenem Request lassen sich beliebig viele Ereignisse mit frei gewählten Zeitstempeln (Vergangenheit/Zukunft) und frischen UUIDs einreichen. Für `quiz_mc`-Einträge ist die Lösung ohnehin im Offline-Download (`downloadKurs`, bewusste Entscheidung), damit lassen sich 7-Tage-Serie, „100 richtig“, Wochenfenster der Rangliste und `mascotFood` herstellen (siehe LOG-09). Zukunftsdatierte Ereignisse machen `daysSinceLastActive` negativ und unterdrücken Lernerinnerungen.

Empfehlung: Serverseitig `occurredAt` auf `[jetzt − Offline-Höchstdauer (z. B. 30 Tage), jetzt + 5 Minuten]` begrenzen; außerhalb davon verwerfen oder auf die Serverzeit klemmen. Zusätzlich in `applyReview` Zeitstempel in der Zukunft nie als `lastReviewedAt` speichern.

### LOG-04 (Mittel) Prüfungssimulation: Zuordnung, Abschluss und Zeitlimit

Beleg `exam.ts`:
- `submitAnswer` (Z. 219-295) prüft, dass die Session der Person gehört (Z. 220-227), aber nicht, dass die `contentItemId` zu dieser Session gehört (es gibt keine Zuordnungstabelle Session → Items), nicht, dass sie im Kurs der Session liegt, nicht, dass der Kurs belegt ist, und nicht `is_active` (Z. 229-236 filtert nur `type = fallaufgabe`). Es kann also jede Fallaufgabe jedes Kurses (auch deaktivierte, auch aus nicht belegten Kursen) in jede eigene Session eingereicht werden, und sie zählt in `finish`.
- Weder `submitAnswer` noch `finish` (Z. 302-328) prüfen `finished_at`. Eine abgeschlossene Session lässt sich beliebig weiter ändern und erneut abschließen (neues `finished_at`, neuer `score`). `bestExamScore` (`gamification.ts:124-129`) und das Achievement `erste_pruefung` (`gamification.ts:53-57,67`) hängen daran. `finish` einer Session ohne jede Antwort ergibt `score = 0`, `answeredCount = 0` und vergibt trotzdem „Erste Prüfungssimulation“.
- Jede erneute Einreichung derselben Aufgabe legt ein weiteres `learning_event` an (Z. 286-292), obwohl `exam_answer` per Upsert ersetzt wird; die Statistik zählt die Aufgabe dann mehrfach. Das `learning_event` wird nicht in derselben Transaktion wie das `exam_answer`-Upsert geschrieben.
- Wird eine Fallaufgabe zwischen zwei Einreichungen redaktionell geändert (`adminContent.update` erhöht `current_version`), entsteht wegen des Unique-Index auf (Session, Version) (`schema.ts:592`) eine zweite `exam_answer`-Zeile für dieselbe Aufgabe, `finish` zählt sie doppelt.
- Zeitlimit: nur clientseitig (dokumentiert, siehe LOG-26). `exam_session.started_at` ist vorhanden, wird aber nie gegen die zurückgegebene `durationMinutes` geprüft.

Fehlerszenario: Person startet eine Session, reicht eine leichte Fallaufgabe aus einem anderen Kurs mit voller Selbsteinschätzung ein, schließt ab und erhält Score 100 und das Achievement; danach lässt sich die Antwort ändern und erneut abschließen.

Empfehlung: Beim Start die ausgewählten Item-IDs in der Session festhalten (Tabelle oder JSONB-Feld) und in `submitAnswer` dagegen prüfen; `finished_at` als Sperre verwenden; `finish` nur bei mindestens einer Antwort ein Achievement zählen lassen; das `learning_event` per Upsert/einmalig je (Session, Item) schreiben; optional serverseitig Dauer + Toleranz prüfen.

### LOG-05 (Mittel) Nach erneutem Einreichen bleibt die alte KI-Bewertung hängen

Beleg: `exam.ts:264-275` ersetzt `exam_answer` per `ON CONFLICT DO UPDATE` und behält dabei die Zeilen-ID. `ai_grading_job.exam_answer_id` verweist auf diese ID mit `ON DELETE CASCADE` (`schema.ts:612-614`), der Kommentar bei `aiGradingJob` (`schema.ts:596-607`) geht noch von „Delete + Insert“ aus („ein daran hängender Job wird automatisch entsorgt“). Seit der Umstellung am 27.09.2026 trifft das nicht mehr zu. `ai.myGradingResult` (`ai.ts:169-181`) liefert den jüngsten Job zur `exam_answer`-ID, `parts` werden aus der Job-Zeile (altes Ergebnis) und der aktuellen `given_answer` (neuer Text, neue Selbsteinschätzung) zusammengesetzt (Z. 183-197).

Fehlerszenario: Person lässt ihre Antwort bewerten (Premium), überarbeitet sie anhand des Feedbacks und reicht erneut ein. Die Ergebnisansicht zeigt weiterhin „completed“ mit dem Feedback zur alten Antwort neben dem neuen Antworttext. Reicht sie während eines laufenden Jobs erneut ein, bewertet der Worker (`ai/process-grading-job.ts:29-52` liest die Antwort erst bei Verarbeitung) einen Text, der nicht zum Zeitpunkt der Anforderung gehört.

Empfehlung: Beim Upsert zugehörige `ai_grading_job`-Zeilen löschen oder als veraltet markieren (z. B. `answer_revision`/`updated_at` an `exam_answer` und Job vergleichen); Kommentar in `schema.ts` anpassen.

### LOG-06 (Mittel) Tagesgrenzen durchgehend in UTC

Beleg: `achievements/catalog.ts:46-91` (`toUtcDayStart`, `currentStreakDays`, `daysSinceLastActive`), `gamification.ts:52,134,168` (`toISOString().slice(0, 10)`), `progress.ts:1068` (`dailyHitRate`), `gamification.ts:105-112` (`mostAnsweredInOneDay`). Es gibt keine Zeitzone je Nutzer (`db/schema.ts`, keine Spalte). Betrifft die Plattform mit deutschem Publikum (MEZ/MESZ).

Fehlerszenario: Wer täglich gegen 00:30 Uhr (MESZ) lernt, erzeugt Ereignisse um 22:30 UTC des Vortags; wer an Tag D um 00:10 und an Tag D+1 um 23:50 Ortszeit lernt, landet auf den UTC-Tagen D−1 und D+1, die Serie reißt, obwohl zwei Kalendertage in Folge gelernt wurde. Umgekehrt zählen 23:30 und 00:15 Ortszeit als derselbe UTC-Tag. Die Serien-Erinnerung (`StreakReminderBanner`) und das 7-Tage-Achievement sind betroffen; „Tage seit der letzten Aktivität“ kippt morgens zwischen 01:00 und 02:00 Ortszeit.

Empfehlung: Zeitzone fest auf `Europe/Berlin` für die Tageszuordnung (SQL `date(occurred_at at time zone 'Europe/Berlin')`) oder je Nutzer speichern; Tests mit Ereignissen um 22:30–23:30 UTC ergänzen.

### LOG-07 (Mittel) Neue Karten gehen vor fälligen Wiederholungen, kein Tageslimit

Beleg: `content.ts:53` (Bedingung `userProgress.dueAt IS NULL OR dueAt <= now`), `content.ts:87-92` (`ORDER BY dueAt ASC NULLS FIRST LIMIT 20`).

Fehlerszenario: Ein Kurs hat rund 500 Karten, die Person hat 60 Karten fällig und noch 300 nie gesehene. Die 20er-Runde besteht ausschließlich aus neuen Karten, solange es noch neue gibt; die fälligen Wiederholungen kommen erst dran, wenn alle neuen Karten durch sind. FSRS-Wiederholungen werden dadurch dauerhaft aufgeschoben, das Vergessen steigt. Ein Tageslimit für neue Karten oder eine Mischung (fällige zuerst, dann neue) fehlt.

Empfehlung: Fällige Wiederholungen zuerst, danach neue Karten mit Tageslimit (z. B. 10 bis 20 pro Tag, konfigurierbar) oder ein festes Mischungsverhältnis.

### LOG-08 (Mittel) Submit-Endpunkte prüfen den Item-Typ nicht

Beleg: `quiz.ts:127-261` und `progress.ts:861-874` rufen nur `assertContentItemAccessible` (`progress.ts:80-93`, prüft Einschreibung und `is_active`, aber nicht `type`). `checkMcAnswer` (`shared/quiz-logic.ts:1001-1010`) wertet jede Option mit `isCorrect` als richtig.

Fehlerszenarien:
- `submitAnswer` mit einer richtigen Option eines `quiz_mc_multi`-Items wird als richtig gewertet (Teilantwort statt Alles-oder-nichts, F-116), inkl. Credits und „beherrscht“.
- `progress.submitReview` auf ein Quiz-Item: zwei Aufrufe „gewusst“ bringen es über Lernen in den FSRS-Zustand `review`, im Fortschritt zählt es als beherrscht, ohne beantwortet zu sein.
- `submitSortieren` (feste Länge 4) auf ein Multiple-Choice-Item mit vier Optionen: Optionen liegen mit `sortOrder` nach Anlegereihenfolge vor, probierbar mit 24 Permutationen; `correctOrder` verrät die Reihenfolge in der Datenbank.
- Typfremde Aufrufe (z. B. `submitAnswer` auf eine Karteikarte) werfen `QuizItemNotFoundError`/`ZodError` und enden als HTTP 500 (siehe LOG-17).

Empfehlung: Je Endpunkt den erwarteten `type` aus `content_item` erzwingen (eine Hilfsfunktion `assertContentItemAccessible(db, user, id, allowedTypes)`), `submitReview`/`toggleDifficultyFlag` auf `karteikarte` beschränken.

### LOG-09 (Mittel) Rangliste, Achievements und Trefferquote zählen jedes Ereignis

Beleg:
- `highscore.ts:89-103`: Punkte = Anzahl richtiger `learning_event`-Zeilen der letzten 7 Tage, kein Dedup je Item.
- `gamification.ts:44-65`: „zehn_richtig“/„hundert_richtig“ zählen Ereignisse, nicht verschiedene Items.
- Online-Antworten (`quiz.submit*`, `submitReview`, `exam.submitAnswer`) tragen keinen Idempotenzschlüssel (`clientEventId` bleibt `null`, `progress.ts:171`), Doppelklick oder Wiederholung erzeugt zwei Ereignisse und zweimal `mascotFood` (Z. 116). Karteikarte „unsicher“ zählt als richtig (`progress.ts:253`).
- Prüfungs-Einreichungen erzeugen bei jeder Wiederholung ein neues Ereignis (siehe LOG-04).

Fehlerszenario: In einem Freundeskreis mit Highscore (F-60) beantwortet jemand dieselbe leichte Frage hundertmal richtig und führt die Liste an; das Achievement „100 richtig“ entsteht mit einer einzigen Frage. Credits sind per „erstes richtiges Beantworten“ geschützt (F-119), `mascotFood`, Rangliste und Achievements nicht.

Empfehlung: Rangliste und Achievements auf `count(distinct content_item_id)` bzw. Ereignisse je Item und Tag deckeln; Online-Mutationen mit optionaler Client-Request-ID versehen und dieselbe `onConflictDoNothing`-Logik nutzen.

### LOG-10 (Mittel) Ereignislisten werden unbegrenzt komplett geladen; fehlender Index

Beleg:
- `gamification.ts:40-52` (`checkAndAward`: zwei Zählabfragen plus alle Ereignisse), `:100-103` (`myPersonalBests`), `:164-169` (`streakStatus`, wird vom Banner bei jedem App-Start gebraucht) laden jeweils alle `learning_event`-Zeilen der Person und gruppieren in TypeScript.
- `progress.ts:584-598` (`fetchLearningEventsByThema`) für `stats` und `suggestions`, `progress.ts:808-820` (`pacing` lädt alle Ereignisse der Woche, nur um `.length` zu nehmen).
- `db/send-learning-reminders.ts:36-43`: je Konto alle Ereignisse, `Math.max(...events.map(...))` wirft ab etwa 100 000+ Argumenten einen `RangeError` und beendet das gesamte Skript für alle weiteren Konten.
- Indizes: `learning_event_content_item_id_idx` (`schema.ts:486`) nur auf `content_item_id`. Die Abfrage „gab es schon ein richtiges Ereignis dieser Person für dieses Item?“ (`progress.ts:155-165`, bei jeder richtigen Antwort unter Zeilensperre) sowie die „letztes Ereignis“-Abfragen (`progress.ts:436-441,472-483,522-527`) filtern nach `user_id` und `content_item_id` und müssen alle Ereignisse des Items aller Personen durchsuchen.

Fehlerszenario: Bei einigen Tausend aktiven Lernenden pro Item und mehreren zehntausend Ereignissen einer Vielnutzerin wächst die Antwortzeit jeder richtigen Antwort und jedes App-Starts linear. Lokal sind es 80 Ereignisse, das Problem ist heute unsichtbar.

Empfehlung: Index `learning_event (user_id, content_item_id, occurred_at)`; Aggregationen in SQL (`count(*) filter`, `group by date`, `max(occurred_at)`); `Math.max` per Schleife oder `max()` in SQL.

### LOG-11 (Mittel) `applyReview` und `applyChangeReview` ohne Zeilensperre

Beleg: `progress.ts:241-324` liest `user_progress` (Z. 242-246), berechnet daraus den neuen Zustand und schreibt per Upsert; anders als `recordQuizAttempt` (Z. 145, `FOR UPDATE` auf `user`) gibt es keine Sperre. `applyChangeReview` (Z. 379-451) ebenso. Online-Aufrufe haben keine `clientEventId`.

Fehlerszenario: Doppeltipp auf „gewusst“ oder zwei Tabs: beide Transaktionen lesen denselben Zustand, beide schreiben ihr Ergebnis; es bleibt ein Review (`reps` +1), im Verlauf stehen zwei Ereignisse (Trefferquote und Rangliste doppelt), `previousSnapshot` zeigt je nach Reihenfolge den falschen Vorzustand, ein anschließendes `changeReview` rechnet vom falschen Ausgangspunkt.

Empfehlung: `SELECT … FOR UPDATE` auf die `user_progress`-Zeile bzw. dieselbe Nutzerzeilensperre wie in `recordQuizAttempt`; für Online-Einreichungen eine Client-Request-ID.

### LOG-12 (Mittel) `abortRound`: Client-Uhr, Einzelschritte, Listenlänge

Beleg:
- `since` kommt aus `new Date()` im Client (`apps/web/src/Quiz.tsx:124`, ebenso `MixedLearning.tsx:131`, `Flashcards.tsx:140`), die Ereignisse tragen die Serverzeit (`progress.ts:130`). `abortRoundItem` löscht nur Ereignisse mit `occurredAt >= since` (Z. 472-483). Läuft die Client-Uhr mehr als einige Sekunden vor, werden die Antworten der Runde nicht erfasst und bleiben bestehen; läuft sie nach, werden bis zu 6 Stunden (Deckel Z. 1028) ältere Ereignisse mitgelöscht.
- Je Item wird nur das jüngste Ereignis gelöscht (Z. 472-489); wurde ein Item in der Runde zweimal beantwortet (Wiederholung falscher Fragen), bleibt eine Antwort stehen.
- Jedes Item läuft in einer eigenen Transaktion (Z. 1029-1031), ein Fehler mittendrin lässt eine halb abgebrochene Runde zurück. `contentItemIds` ist ohne Obergrenze (`schemas/progress.ts:66-70`) und wird sequenziell abgearbeitet.
- Für ältere Karten ohne `previous_snapshot` (vor F-111 bewertet, Spalte `null`) wird das Ereignis gelöscht, der FSRS-Zustand aber nicht zurückgesetzt (Z. 504).
- Die Löschung nimmt keine Nutzerzeilensperre (anders als `recordQuizAttempt`), läuft also bei gleichzeitigen Antworten ungeschützt.

Empfehlung: Serverseitig einen Rundenzeitstempel vergeben (z. B. bei `startExerciseSet` bzw. `startSession`) statt `since` vom Client; Obergrenze für `contentItemIds` (z. B. 100); alles in einer Transaktion.

### LOG-13 (Mittel) Offline-Sync: dauerhaft hängende Einträge, Reihenfolge, Optionen-IDs

Beleg:
- `offline.ts:216-260`: Einträge zu inaktiven/unbekannten Items oder mit veralteter Struktur (`QuizItemNotFoundError`, `ZodError`) werden übersprungen und tauchen nicht in `syncedIds` auf. Der Client (`apps/web/src/offlineSync.ts:35-47`) löscht nur bestätigte IDs und sendet den Rest bei jedem Sync erneut, für immer.
- `offlineSync.ts:35-37` schneidet die Warteschlange in Blöcke zu 500 in der Reihenfolge von `queue.toArray()` (Primärschlüssel = UUID), nicht nach `occurredAt`; der Server sortiert nur innerhalb eines Blocks (`offline.ts:146`). Ab mehr als 500 Einträgen können ältere Ereignisse nach neueren eintreffen und werden dann für `user_progress` übergangen (`progress.ts:198,270`).
- `adminContent.update` löscht und legt alle `answer_option`-Zeilen neu an (`adminContent.ts:595-598`), die Options-IDs ändern sich bei jeder Bearbeitung. Offline-Kopien und laufende Quiz-Runden mit alten IDs führen zu `QuizItemNotFoundError` (HTTP 500 online, „hängender“ Eintrag offline).

Empfehlung: Server meldet überspringbare Einträge mit Grund zurück (`rejectedIds`), Client verwirft sie; Client sortiert vor dem Aufteilen nach `occurredAt`; Options-IDs bei Bearbeitung stabil halten (Upsert nach Position) oder Offline-Einträge über Optionstext/Position auflösen.

### LOG-14 (Mittel) Notizen: keine Zugriffsprüfung, Anzeige deaktivierter Inhalte

Beleg: `notes.ts:27-46` (`save`) und `:48-53` (`delete`) prüfen weder Einschreibung noch `is_active` noch Existenz des Items; `notes.list` (Z. 58-86) joint `content_item` ohne `is_active`-Filter und liefert `prompt` des Items.

Fehlerszenarien: (a) Ein redaktionell zurückgezogenes oder rechtlich beanstandetes Item (R3/R4) bleibt über „Meine Notizen“ mit seinem Aufgabentext sichtbar. (b) `save` mit einer beliebigen UUID liefert einen FK-Fehler (HTTP 500) oder legt eine Notiz an, womit die Existenz von Item-IDs geprüft werden kann; Notizen auf Items fremder Kurse sind möglich.

Empfehlung: In `save` `assertContentItemAccessible` nutzen, in `list` auf `is_active = true` filtern.

### LOG-15 (Mittel) Spielstände: Lost Update, Abschluss-Zeitpunkt, ungeprüfte Runde

Beleg:
- `game.ts:192-205` (`recordListResult`), `:309-326`, `:342-358`: lesen den JSON-Spielstand, ergänzen ihn und schreiben ihn zurück, ohne Sperre. Zwei fast gleichzeitige richtige Antworten (zwei Tabs, schnelle Eingabe) überschreiben sich, eine gelöste Nummer geht verloren.
- `upsertProgress(…, completed ? new Date() : null)` setzt `completed_at` bei jeder späteren Aktualisierung neu bzw. zurück auf `null`. Wird nach dem Abschluss ein bereits gelöstes Element erneut richtig beantwortet, springt `completed_at` auf „jetzt“; ändert Content die Elementanzahl (z. B. Duell von 20 auf 22 Fragen), ist ein abgeschlossenes Spiel plötzlich „offen“. Enthält `solvedNumbers` Nummern, die nicht mehr existieren, gilt `length === total` nie wieder.
- `completeMemoryRound` (`game.ts:389-403`) prüft `runde` nur gegen 1 bis 4 (Schema), nicht gegen vorhandene Runden des Sets, und zählt die Anzahl statt die Menge der gültigen Runden; damit ist ein Abschluss ohne Spielen oder ein Zustand, der nie „abgeschlossen“ werden kann, herstellbar (bewusst ohne Belohnung, daher nur Anzeige).
- `sprintAbschluss` (`game.ts:544-554`) setzt `completed_at` immer und nimmt `richtig`/`gesamt` ungeprüft (0 bis 20 bzw. 1 bis 20), `richtig/gesamt` mit `gesamt = 1` ergibt 100 %.

Empfehlung: Spielstand atomar fortschreiben (`jsonb_set`/`||` in einem `UPDATE` oder `SELECT … FOR UPDATE`), `completed_at` nur setzen, wenn es noch `null` ist; Zähler gegen die gültige Menge prüfen.

### LOG-16 (Niedrig) Sprint-Token und Bestwerte

Beleg: `game-sprint-token.ts:21-24` (Token trägt Parameter und Ablauf, 1 Stunde), `game.ts:534-541`. Der Token ist nicht an Nutzer, Sprint oder einmalige Verwendung gebunden und kann beliebig oft beantwortet werden; die Antwort enthält die Lösung (`erwartet`). HMAC-Prüfung und Längenvergleich mit `timingSafeEqual` sind korrekt. Bestwerte sind clientgemeldet (LOG-15). Da Spiele keine Belohnung vergeben (F-175), folgenlos außer für die Anzeige des eigenen Bestwerts.

Empfehlung: Falls später Belohnung/Rangliste: Nutzer-ID und laufende Sprint-ID in den Token, Antworten zählen serverseitig, Abschluss serverseitig ableiten.

### LOG-17 (Niedrig) Fachliche Fehler werden zu HTTP 500

Beleg: `QuizItemNotFoundError`, `GameItemNotFoundError`, `LernpfadItemNotFoundError` und `ZodError` aus den Prüffunktionen sind keine `TRPCError` (`shared/quiz-logic.ts:27`, `quiz.ts:135`, `game.ts:345,379`, `instrumentLernpfad.ts:189-221`); nur `submitReihenfolge` fängt ab (`game.ts:477-481`). `app.ts:39-43` protokolliert jeden `INTERNAL_SERVER_ERROR` als „Unerwarteter tRPC-Fehler“. Ein beim Bearbeiten ungültig gewordener Options-Verweis (LOG-13), ein manipulierter Aufruf oder ein defektes Theorie-Payload in `content.theorySections` (`content.ts:171-176`, ein einziges ungültiges Payload lässt die gesamte Liste scheitern) erzeugt 500er und Rauschen im Fehlerlog.

Empfehlung: Eine gemeinsame Fehlerabbildung (z. B. in einer tRPC-Middleware) von `*NotFoundError` auf `NOT_FOUND`/`BAD_REQUEST`.

### LOG-18 (Niedrig) `changeReview` ohne Zeitfenster

Beleg: `progress.ts:372-452`. Es wird immer vom Zustand vor der letzten Bewertung neu gerechnet, aber mit dem aktuellen `now` (Z. 403) und ohne Prüfung, wie lange die letzte Bewertung zurückliegt; das letzte `learning_event` wird umgeschrieben (Z. 436-448), egal wie alt es ist.

Fehlerszenario: Ruft ein Client `changeReview` Tage nach der Bewertung auf, rechnet FSRS mit der größeren verstrichenen Zeit und vergibt eine höhere Stabilität (Intervall länger als verdient); die Trefferquote eines alten Tages wird nachträglich geändert.

Empfehlung: Änderung nur innerhalb weniger Minuten nach der letzten Bewertung zulassen.

### LOG-19 (Niedrig) Pacing: Zieltermin und leerer Kurs

Beleg: `progress.ts:845-848` (`new Date(enrollment.targetDate)` ist 00:00 UTC), `pacing.ts:33-34` (`isOverdue = targetDate <= now`), `progress.ts:796-797` und `pacing.ts:32` (`remainingThemen === 0` bedeutet fertig).
- Am Prüfungstag selbst gilt der Termin ab 01:00/02:00 Ortszeit als „überfällig“, obwohl der Tag noch läuft.
- Ein Kurs ohne zählbare aktive Items (alles Entwurf/inaktiv, `totalThemen = 0`) liefert `isComplete = true`.

Empfehlung: Zieltermin bis Tagesende (Europe/Berlin) rechnen; bei `totalThemen = 0` eigenen Zustand „keine Lerninhalte“ liefern.

### LOG-20 (Niedrig) Schema gegenüber §4.3: fehlende CHECKs, veraltete Doku

Gegenprobe der lokalen DB: Tabellen, FKs, `ON DELETE`-Regeln und Unique-Indizes entsprechen dem Drizzle-Schema (`exam_answer` → `content_item_version` ist `RESTRICT`, `learning_event`-CHECK vorhanden). Abweichungen von §4.3, die in §13 nicht oder nur teilweise stehen:
- `user_progress.state`: kein CHECK auf `new|learning|review|relearning` (`schema.ts:391`); `scheduleReview` fällt bei unbekanntem Wert still auf `New` zurück (`shared/fsrs/scheduler.ts:73`). Quiz-Zeilen schreiben außerdem Platzhalterwerte (`difficulty 0`, `stability 0`, `dueAt = occurredAt`, `progress.ts:203-219`); lokal bestätigt: 10 Zeilen `review` mit `stability = 0`.
- `user.credits`, `user.mascot_food`: kein `>= 0`-CHECK (`schema.ts:163`, Z. 129 ff.), die Untergrenze liegt nur im Anwendungscode (`greatest(…, 0)`, `progress.ts:545,563`).
- `content_item.type` ist in §4.3 als 7 Werte dokumentiert, im Code sind es über 20; `exam_session.mode` ist in §4.3 `quiz|schriftliche_simulation|…`, der Code schreibt `schriftliche_pruefung` (`exam.ts:25`). `exam_answer.is_correct` wird nie gesetzt.
- Der Kommentar bei `ai_grading_job` im Schema (Z. 596-607) beschreibt Delete+Insert (siehe LOG-05).

Empfehlung: CHECKs für `state`, `credits >= 0`, `mascot_food >= 0` ergänzen, §4.3 aktualisieren.

### LOG-21 (Niedrig) `freigeben` reaktiviert auch bewusst deaktivierte Items

Beleg: `db/freigeben.ts:41-45` setzt alle inaktiven Items der angegebenen Typen im Kurs auf aktiv. Eine einzelne in der Redaktion (`adminContent.setActive`) deaktivierte Frage desselben Instrumenttyps wird dabei mit freigegeben, auch wenn die Fachprüfung sie ausgenommen hat. Wegen R3/R4 gesperrte Einzelfragen sollten nicht über denselben Mechanismus zurückkommen.

Empfehlung: Entwurfs-Status getrennt vom redaktionellen Aktiv-Status führen (z. B. Spalte `review_status`) oder `freigeben` nur Items aktivieren lassen, die der Import selbst inaktiv angelegt hat.

### LOG-22 (Niedrig) `is_premium` hat keine Wirkung

Beleg: Die Spalte wird in `adminContent.ts` geschrieben und gelesen, aber in keiner Lese-Abfrage für Lernende (`content.ts`, `quiz.ts`, `offline.ts`, `exam.ts`) ausgewertet (Suche nach `isPremium` ergibt nur `adminContent.ts`, `ai.ts:239,254` und die Premium-Gates für KI und Lernpfade über `premiumUntil`). Setzt ein Redakteur `is_premium` an einer Frage, ist sie weiterhin für alle frei verfügbar. Aktuell inaktiv, weil kein Item so markiert ist; bei Einführung von F-80 ein stilles Leck.

### LOG-23 (Niedrig) Eingabegrenzen, Einschreibungsprüfungen, Ratenbegrenzung

- `progress.startSession` (`progress.ts:923-931`) und `startExerciseSet` (`:975-988`) prüfen weder Einschreibung noch Zugehörigkeit von `themaId` zum Kurs (unbekannte IDs: FK-Fehler, HTTP 500); `totalItems` ohne Obergrenze.
- `game.available` (`game.ts:272-278`) und `instrumentLernpfad.available` (`instrumentLernpfad.ts:85-91`) liefern Titel auch ohne Einschreibung.
- `dueCardsInputSchema.contentItemIds` (`shared/schemas/course.ts:50-53`) ohne `max`.
- `syncQueue` mit bis zu 500 Einträgen, je Eintrag eigene Transaktion mit mehreren Abfragen (sequenziell, bis etwa 3 000 DB-Aufrufe je Request), und die Quiz-/Spiel-Endpunkte haben keine Ratenbegrenzung (nur `preview.submit*` ist begrenzt, siehe Test „Code-Review-Fund: begrenzt preview.submit*“).

### LOG-24 (Hinweis) Code-Reihenfolge: gleiche Zeilen, gleiche ID

`codeZeilenId` (`game-logic-weitere.ts:171-178`) ist ein reiner Hash des Zeilentexts. Besteht eine Aufgabe aus zwei gleichen Zeilen (z. B. zwei Mal `}`), erhält der Client zwei Elemente mit identischer `id` (`shapeCodeReihenfolge`, Z. 210), was Listen-Keys und Drag-and-Drop-Zuordnung im Frontend stören kann. Die serverseitige Prüfung (`checkCodeReihenfolge`, Z. 235-245) bleibt korrekt. Schema (`schemas/game.ts:352`) verbietet doppelte Zeilen nicht.

### LOG-25 (Hinweis) FSRS-Anbindung

- Fälligkeit ist ein exakter Zeitstempel (`now + Intervall`), keine Tagesgrenze: Wer abends bewertet, sieht die Karte am nächsten Morgen noch nicht fällig; ohne `enable_fuzz` häufen sich Karten desselben Tages auf denselben Minuten (`shared/fsrs/scheduler.ts:13,77`).
- Installiert ist `ts-fsrs` 4.7.1 (`^4.6.2` in `packages/shared/package.json`); Standardparameter, keine Anpassung. Die vier Zustände und die Abbildung der drei Bewertungsstufen auf `Again/Hard/Good` sind konsistent, `Easy` fehlt bewusst.
- Der Unit-Test (`scheduler.test.ts`) hat 5 Fälle; Übergänge `review → relearning` (Again), mehrfache Lernschritte und das Verhalten bei `lastReviewedAt = null` mit Zustand ≠ `new` sind nicht abgedeckt.

### LOG-26 (Hinweis) Prüfungs-Zeitlimit nur clientseitig

Dokumentiert (`shared/schemas/exam.ts:3-9`, `exam.ts:119-125`): Selbstlern-Werkzeug, kein beaufsichtigter Modus. Zusätzlich liefert `exam.start` die Musterlösungshinweise (`explanation`, Z. 195-199) schon mit den Aufgaben aus; wer die Antwort vorab im Netzwerk-Tab liest, kann sie ablesen. Für die Selbstbewertung unkritisch, für eine „Prüfungssimulation“ mit Aussagekraft der Punktzahl relevant (siehe LOG-04).

---

## Positiv aufgefallen

- Fortschrittsberechnung einheitlich: `progress.overview`, `progress.pacing`, `courses.progress`, `exam.guide` nutzen dieselbe Typliste (`progress-items.ts`) und `is_active`; der Zähler hängt per `LEFT JOIN` an denselben Items wie der Nenner; `0/0` ist in `overview`, `courses.progress` und `exam.guide` abgefangen.
- Sichtbarkeitsfilter `is_active` (F-186, KURS_ENTWURF) greift in allen Lese-Endpunkten (Quiz, Karteikarten, Theorie, Suche, Instrumente, Offline-Download, Offline-Sync, Prüfungsstart, Glossar-unabhängig).
- Zugriffsschutz: `assertContentItemAccessible` (Einschreibung + aktiv, `NOT_FOUND` statt `FORBIDDEN`) an allen schreibenden Quiz-/Review-Pfaden; im Offline-Sync gebündelt und je Eintrag übersprungen statt Batch-Abbruch.
- `recordQuizAttempt`: Transaktion mit Zeilensperre auf `user` gegen doppelte Credit-Vergabe, Idempotenz über `(user_id, client_event_id)` mit `ON CONFLICT DO NOTHING`, Anti-Farming für Credits, Schutz vor älterem Offline-Ereignis (`progress.ts:125-221`).
- Sicherheitsrelevante Prüfungen sind serverseitig: Lösungen werden nicht mit den Fragen ausgeliefert, `checkMatching` und `checkQuadrantAnswer` zählen jede Option höchstens einmal (Replay-/Duplikat-Schutz), Punkte der Fallaufgaben werden auf das mögliche Maximum geklemmt, Sprint-Token nutzt HMAC mit eigenem Schlüsselkontext und `timingSafeEqual`.
- `courses.enroll`: Sperre der eigenen `user`-Zeile gegen die Check-then-Act-Race, atomarer Kurswechsel (F-102), Altersgruppenprüfung und `is_published` serverseitig.
- Migrationen: 43 SQL-Dateien, Journal und Snapshots konsistent; die laufende DB entspricht dem Schema (Stichprobe der Constraints und Indizes); die Drops (`ai_grading_enabled`, `instrument_lernpfade_enabled`, `result_text`) sind bewusste Ablösungen.
- Streak-/Pacing-Mathematik ist durch reine Funktionen gekapselt und getestet (`catalog.test.ts`, `pacing.test.ts`), Randfälle (Division durch null am Zieltermin) sind abgefangen.

## Testlücken

- Prüfungssimulation: außer `exam-pruefungsbereiche.integration.test.ts` (Start, Bereiche, Hilfeseite) und Nutzung in `ai.integration.test.ts` keine Tests für `submitAnswer` (fremde Items, abgeschlossene Session, Mehrfacheinreichung) und `finish` (leere Session, Wiederholung).
- Nebenläufigkeit: nur `course-enrollment` testet Parallelität (`Promise.all`); nicht getestet sind parallele `quiz.submit*` (Credits), `submitReview` (Lost Update), `exam.submitAnswer`, `recordListResult`.
- `abort-round.integration.test.ts`: drei Fälle; es fehlen Karteikarte mit vorhandenem Credit-Guthaben (LOG-02), zwei Antworten desselben Items in einer Runde, Karten ohne `previous_snapshot`, `since` im Verhältnis zu Uhrabweichung.
- `offline-sync.integration.test.ts`: fünf Fälle; es fehlen zukunfts-/weit zurückliegende `occurredAt`, Batches über 500, Reihenfolge über Batchgrenzen, dauerhaft übersprungene Einträge, Quiz-Typ-Mismatch (`quiz_mc_multi` über `quiz_mc`-Ereignis).
- Fortschritt: keine Tests, die belegen, dass `is_active = false`-Items aus `progress.overview`/`courses.progress`/`pacing` herausfallen (ein Test deaktiviert ein Item per `setActive` in `core-learning-flow.integration.test.ts:744`, prüft aber nicht die Prozentzahlen).
- `progress.stats`, `progress.suggestions`, `progress.pacing`: kein Integrationstest der Berechnung.
- Zeitzonen und Tagesgrenzen: Tests für Streak verwenden UTC-Daten (`catalog.test.ts`, Streak-Tests in `core-learning-flow`), keine Fälle um 22:00–24:00 UTC.
- Import: kein Test, dass vorhandener Lernfortschritt einen erneuten Import überlebt (LOG-01); `import-content.integration.test.ts` bestätigt die vollständige Ersetzung („ersetzt bei einem erneuten Import den Content vollständig“) als gewünschtes Verhalten, prüft aber nicht, was dabei mit Nutzerdaten geschieht.
- Migrationen: kein Test, dass `drizzle-kit generate` keine Differenz zum Schema liefert (Schema-Drift).

## Nicht geprüft / Grenzen

- Nicht ausgeführt: keine Tests, keine Serverstarts, keine Schreibzugriffe auf die Datenbank. Alle Fehlerszenarien sind aus Quelltext und Schema hergeleitet, nicht reproduziert.
- Nicht im Fokus: Authentifizierung/Consent (`auth.ts`, `consent.ts`, `parent.ts`), Duelle (`duell.ts`), Freundeskreise, Kohorten, Firmenkonten, Payment-Service, KI-Anbieter-Anbindung (nur der Bezug von `exam`/`ai_grading_job`), `preview.ts`, Admin-Bereich außer `triggerImport`/`adminContent`.
- Frontend (`apps/web`) nur dort gelesen, wo ein Server-Verhalten davon abhängt (`offlineSync.ts`, `roundStartedAt`).
- Inhaltliche Richtigkeit der Spiel- und Quiz-Inhalte, Freigabestatus nach R3/R4 und die Prüfblätter wurden nicht bewertet.
- Lasttests und tatsächliche Abfragepläne (`EXPLAIN`) wurden nicht erhoben; die Aussagen zu Indizes (LOG-10) beruhen auf der Abfrageform und den vorhandenen Indizes. Die lokale DB enthält nur 80 Ereignisse, Zeitmessungen sind dort nicht aussagekräftig.
- `packages/shared`-Logik (`terminal-sim`, `topologie-sim`, Rechner) und die Sprint-Generatoren wurden nicht auf mathematische Korrektheit geprüft.
