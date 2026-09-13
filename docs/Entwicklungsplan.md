# Entwicklungsplan: edukedo

Stand: 12.09.2026 · Grundlage: Anforderungskatalog Version 0.19 (insbesondere Abschnitt 9, Phasenplanung) und Architekturplanung Version 0.6 (insbesondere „Nächste Schritte")

> **Aktualisierung 12.09.2026 (Entwickler-Review):** Vier Anpassungen gegenüber der ersten Fassung: (1) **Iteration 2 und 3 wurden dependency-bewusst neu geschnitten** — der Eltern-Consent-Flow (F-08/F-90) steht jetzt bewusst *vor* der Live-Schaltung des Mathe-Kurses, weil die Architekturplanung genau das verlangt (Consent-Infrastruktur muss stehen, bevor ein überwiegend von Minderjährigen genutzter Kurs veröffentlicht wird). (2) Das **`REPORT`/`BLOCK`-Datenmodell wandert von Iteration 3 nach Iteration 0**, weil es ohnehin nur Schema ohne UI ist und laut Architekturplanung in dieselbe erste Migrations-Charge gehört. (3) **Konto-Selbstlöschung (F-06)** ist jetzt ein expliziter Task in Iteration 1, statt implizit „irgendwann" mitzulaufen — ab dieser Iteration entstehen echte personenbezogene Daten. (4) Iteration 0 berücksichtigt jetzt auch **`CONTENT_ITEM_VERSION`, `TAG`/`CONTENT_ITEM_TAG`** sowie die dafür nötigen Postgres-Extensions, passend zum inzwischen vertieften Datenmodell (Architekturplanung Version 0.5/0.6).

## Grundprinzip

Der Plan ist **iterativ** organisiert, nicht kalendarisch: Jede Iteration liefert einen abgeschlossenen, für sich sinnvollen Zuwachs (idealerweise einen lauffähigen vertikalen Slice), bevor die nächste beginnt. Es gibt bewusst keine Zeitangaben je Iteration oder Aufgabe — nur den bereits an anderer Stelle festgehaltenen groben Rahmen für den MVP-Launch insgesamt (Q2 2027, siehe Anforderungskatalog Abschnitt 1). Reihenfolge und Detailtiefe der Aufgaben können sich beim Arbeiten noch verschieben; der Plan ist als lebendes Dokument gedacht, das mit dem Projektfortschritt aktualisiert wird — Aufgaben können als erledigt abgehakt werden (`- [x]`).

Jede Iteration ist nach **Bereichen** aufgeschlüsselt: Programmierung (Kern), Programmierung (Payment, erst ab Iteration 6 relevant), Content, Recht & Compliance, Organisatorisches, Testing, Nutzer:innen-Feedback. Nicht jeder Bereich hat in jeder Iteration Aufgaben.

## Iteration 0 — Grundgerüst & Vorbereitung

Ziel: Alles ist bereit, um mit dem ersten inhaltlichen Slice (Iteration 1) zu beginnen — noch ohne sichtbaren Lernfortschritt für Nutzer:innen.

**Programmierung (Kern)**
- [x] Monorepo aufsetzen (pnpm Workspaces + Turborepo), Grundstruktur `/apps/web`, `/apps/api`, `/packages/shared` anlegen
- [x] CI-Grundgerüst (GitHub Actions: Lint, Typecheck, Tests, Build bei PR) — Lint/Typecheck/Test/Build laufen jetzt tatsächlich gegen echten Code statt gegen TODO-Platzhalter
- [x] Drizzle-Migrationsverwaltung einrichten, benötigte Extensions aktivieren (`citext` für `"user".email`/`parent.email`, `pgcrypto` für `gen_random_uuid()`) — erste Migration `0000_enable_extensions.sql`; lokale Postgres/Redis-Instanz über `docker-compose.yml` im Repo-Root (siehe Architekturplanung Abschnitt 13)
- [ ] Verwaltete PostgreSQL-Cloud-Instanz (z. B. Neon/Supabase) für Staging/Produktion tatsächlich anlegen — Kontoerstellung/Vertragsabschluss, kein Code-Task; die Migrationen selbst sind bereits lauffähig vorbereitet
- [x] Generisches Content-Datenmodell migriert: `kurs`, `fachgebiet`, `thema`, `content_item`, `content_item_version`, `answer_option` (inkl. `side`-Feld für Zuordnungs-Paare), `tag`, `content_item_tag`, `user_course` (F-09, F-13) — siehe `apps/api/src/db/schema.ts` + `apps/api/drizzle/0001_*.sql`
- [x] `report`/`block`-Datenmodell (F-68) direkt mit den übrigen Migrationen angelegt, auch ohne UI (vorgezogen aus der ursprünglich späteren Jugendschutz-Iteration, siehe Architekturplanung Abschnitt 4.4)
- [x] Auth-Grundgerüst (Eigenbau): Argon2id-Hashing, Sessions/Cookies nach dem Lucia-Pattern, Rollenmodell — `user.role` (`learner`/`content_editor`/`admin`) plus eigener `parent`-Account-Typ mit eigener Session (siehe Architekturplanung Abschnitt 13); inkl. lauffähiger `register`/`login`/`logout`/`me`-Endpunkte (nimmt das Iteration-1-Item "Registrierung/Login inkl. Altersabfrage" unten vorweg)
- [x] tRPC-Router-Grundstruktur für die Kern-API (`health`, `auth`; weitere Module folgen modulweise)

**Content**
- [ ] Zwischenformat für Content-Erstellung festlegen (z. B. Markdown-Dateien mit definiertem Frontmatter oder eine Tabellenvorlage) — unabhängig vom Entwicklungsstand des Redaktionssystems (F-11/F-17)
- [ ] Eigene Wissensquellen für HB3 (Führen/Verwalten/Ausbilden) sichten und mit Abschnitt 7 (Urheberrecht: frei formuliert, keine 1:1-Übernahme) abgleichen
- [ ] Mathematik-Themenkatalog (Abschnitt 4) mit konkretem Schulbuch-/Übungsmaterial für Klasse 9 gegenprüfen, bevor der erste Mathe-Themenblock entsteht

**Recht & Compliance**
- [ ] Kleingewerbe anmelden (Einzelunternehmen), Steuernummer/ladungsfähige Anschrift für spätere Impressumspflicht (F-51) einholen
- [ ] Kanzlei-Shortlist für die spätere Jugendschutzprüfung erstellen (unverbindlich, siehe Abschnitt 7)

**Organisatorisches**
- [ ] Domains edukedo.com/.de mit Hosting/DNS verbinden, geschäftliche E-Mail-Adresse einrichten
- [ ] Hosting-Accounts für Frontend (Vercel/Cloudflare Pages) und Kern-Backend (Railway/Render/Fly.io) anlegen

**Testing**
- [x] Testinfrastruktur aufsetzen (Vitest, Testcontainers für Postgres) — `apps/api/test/db.integration.test.ts` läuft Migrationen gegen einen echten, per Testcontainers gestarteten Postgres-Container; benötigt lokal einen laufenden Docker-Daemon

## Iteration 1 — Erster vertikaler Slice: Fachwirt-Pilot, HB3 (erstes Thema)

Ziel: Eine Person kann sich registrieren und mit echtem, selbst erstelltem Content zu einem ersten Thema aus HB3 lernen — Karteikarten und Quiz funktionieren Ende-zu-Ende.

**Programmierung (Kern)**
- [x] Registrierung/Login inkl. Altersabfrage (F-01, F-02); `USER.birth_date`/`is_minor` werden gesetzt, volle Jugendschutz-Durchsetzung (F-08) ist hier noch nicht nötig (Fachwirt-Pilot = erwachsene Zielgruppe) — bereits mit dem Auth-Grundgerüst in Iteration 0 umgesetzt (`apps/api/src/trpc/routers/auth.ts`)
- [x] Konto-Selbstlöschung (F-06) implementieren: Eigenes Konto inkl. kaskadierender Daten vollständig löschen können — `auth.deleteAccount` (Passwort-Bestätigung, dann ein einzelnes `DELETE FROM user`, den Rest übernehmen die bereits im Datenmodell festgelegten `ON DELETE CASCADE`/`SET NULL`-Regeln) plus Frontend-Bestätigungsdialog (`apps/web/src/DeleteAccount.tsx`). Per Testcontainers-Integrationstest und live gegen echtes Postgres verifiziert (inkl. Kurs-/Fortschritts-/Session-Daten sowie des asymmetrischen `report`-Löschverhaltens)
- [x] Karteikarten-Modus (F-20) mit FSRS-Algorithmus (`ts-fsrs`, `USER_PROGRESS`-Felder `difficulty`/`stability`/`state`) — Backend (`apps/api/src/fsrs/scheduler.ts`, Router `content`/`progress`) und Frontend (`apps/web/src/Flashcards.tsx`) Ende-zu-Ende gegen echtes Postgres verifiziert; läuft aktuell nur mit technischem Platzhalter-Content (`db:seed`), nicht mit echtem HB3-Content (bleibt separate Content-Aufgabe). Dafür minimal auch `courses.list`/`courses.enroll` (F-09) ergänzt, da der Karteikarten-Modus eine Kurseinschreibung voraussetzt — die vollständige Kursauswahl-UI folgt trotzdem erst in Iteration 3
- [x] Quiz-Modus (F-21) mit Sofort-Feedback — alle drei Formate (Multiple Choice, Zuordnung, Lückentext) umgesetzt (Backend `apps/api/src/trpc/routers/quiz.ts`, Frontend `apps/web/src/Quiz.tsx`) und Ende-zu-Ende gegen echtes Postgres verifiziert; richtige Antwort/Zuordnung/Lösung wird jeweils serverseitig erst bei der Auswertung offengelegt, nie beim Laden der Fragen
- [x] Einfache Fortschrittsanzeige je Fachgebiet und Thema (F-30) — Backend (`progress.overview`) und Frontend (`apps/web/src/Progress.tsx`) umgesetzt und gegen echtes Postgres verifiziert; "beherrscht" = FSRS-Zustand `review` (siehe Architekturplanung Abschnitt 13). Umfasst aktuell nur Karteikarten, da nur der Karteikarten-Modus `user_progress` schreibt
- [x] PWA-Grundgerüst (F-40, F-41): Service Worker, installierbar — `vite-plugin-pwa` (App-Shell-Precaching + Web-App-Manifest), Layout gegen 375px-Mobile-Breakpoint live verifiziert. Volle Offline-Synchronisierung (F-42, IndexedDB-Warteschlange) ist bewusst nicht Teil dieses Schritts. Platzhalter-Icons (kein echtes Branding vorhanden), siehe Architekturplanung Abschnitt 13

**Content**
- [ ] Erstes Thema/Lernfeld aus HB3 vollständig erstellen: Theorie-Zusammenfassung, Karteikarten, Übungsfragen (im Zwischenformat aus Iteration 0)

**Testing**
- [ ] Unit-Tests für die Spaced-Repetition-Logik (FSRS-Integration)
- [ ] End-to-End-Test: Registrierung → Karteikarten-Session → Quiz

**Nutzer:innen-Feedback**
- [ ] Ersten kleinen Kreis Fachwirt-Kandidat:innen informell ansprechen und um Feedback zu diesem ersten Slice bitten

## Iteration 2 — Jugendschutz/Eltern-Consent scharf schalten

Ziel: Der vollständige Eltern-Consent-Flow und das Eltern-Dashboard stehen produktiv, **bevor** irgendein Kurs mit überwiegend minderjähriger Zielgruppe live geht. Diese Iteration wurde beim Entwickler-Review bewusst vor die Mathe-Kurs-Aktivierung (jetzt Iteration 3) gezogen.

**Programmierung (Kern)**
- [ ] Vollständiger Eltern-Consent-Flow (F-08): E-Mail-Bestätigung, `CONSENT_TOKEN`, automatische Erinnerungen, kontoloser Vorschau-Modus — **Kernmechanismus umgesetzt und live verifiziert:** Registrierung unter 16-Jähriger fragt E-Mail eines Elternteils ab, legt `parent`/`parent_child_link`("pending")/`consent_token` an und versendet (aktuell nur simuliert, siehe `apps/api/src/email/sender.ts`) den Bestätigungslink; Login bleibt bis zur Bestätigung gesperrt (`auth.login`), die Bestätigungsseite (`/consent/confirm`) setzt `consent_status` auf "confirmed". **Noch offen:** automatische Erinnerungsmails (`reminder_sent_count` existiert im Schema, aber kein Scheduler/Cron), kontoloser Vorschau-Modus
- [ ] `PARENT`, `PARENT_CHILD_LINK` als eigener Account-Typ — `parent`/`parent_child_link`-Zeilen werden bereits angelegt (siehe oben), aber Eltern haben noch keinen echten Login (Platzhalter-Passwort-Hash, siehe Architekturplanung Abschnitt 13) — folgt zusammen mit dem Eltern-Dashboard
- [ ] Eltern-Dashboard-Grundgerüst (F-90): Einwilligungsstatus einsehen, Widerruf
- [ ] Kindgerechte Datenschutz-Kurzfassung (F-53) im Frontend einbinden

**Recht & Compliance**
- [ ] Externe Jugendschutzprüfung tatsächlich beauftragen — Zeitpunkt an diesen Content-/Entwicklungsfortschritt gekoppelt, nicht an ein Kalenderdatum (siehe Abschnitt 7)

**Content**
- [ ] Restliche Themen/Lernfelder von HB3 erstellen (Priorität, siehe 80/20-Aufteilung, Abschnitt 9) — unkritisch bezüglich Jugendschutz, da der Fachwirt-Pilot weiterhin eine erwachsene Zielgruppe hat

**Testing**
- [ ] End-to-End-Test des kompletten Eltern-Consent-Flows (Registrierung Minderjährige:r → Eltern-Mail → Bestätigung → Freischaltung → Widerruf)
- [ ] Backend-Tests für `REPORT`/`BLOCK` (Datenmodell existiert bereits seit Iteration 0, auch ohne UI testbar)

## Iteration 3 — Mehrfach-Kurs aktivieren, Mathe-Kurs live schalten

Ziel: Der zweite Kurs (Mathematik) existiert mit einem ersten Themenblock und wird jetzt — abgesichert durch den in Iteration 2 fertiggestellten Consent-Flow — für echte Nutzer:innen veröffentlicht; ein Nutzerkonto kann beide Kurse gleichzeitig belegen.

**Programmierung (Kern)**
- [ ] Mehrfach-Kursbelegung (F-09) aktiv nutzen: Kursauswahl/-wechsel im Frontend, je Kurs getrennter Fortschritt
- [ ] Zweiten Kurstyp (Mathematik) im generischen Modell anlegen (`KURS.type = "schulfach"`, `KURS.metadata` mit Klassenstufe/Bundesland-Ansatz, siehe F-13), zunächst mit `is_published = false`
- [ ] Bulk-Import-Grundfunktion (F-17) bauen, die das Content-Zwischenformat einliest — löst das manuelle Iteration-0-Provisorium ab
- [ ] Admin-/Redaktionsbereich (F-11) in einer ersten, einfachen Version
- [ ] Nach Fertigstellung des ersten Mathe-Themenblocks: `KURS.is_published = true` setzen (erst jetzt zulässig, da der Consent-Flow aus Iteration 2 produktiv steht)

**Content**
- [ ] Erstes Mathe-Fachgebiet/Themenblock erstellen (z. B. Quadratische Funktionen, siehe Themenkatalog Abschnitt 4)

**Testing**
- [ ] Tests für Bulk-Import (Datenintegrität, Versionierung F-12)

## Iteration 4 — Zweites Fachwirt-Handlungsgebiet (HB1) & Redaktions-Effizienz

Ziel: Der Fachwirt-Pilot hat zwei vollständige Handlungsbereiche, die Content-Erstellung ist durch bessere Werkzeuge spürbar schneller.

**Programmierung (Kern)**
- [ ] Effizienzfunktionen im Redaktionssystem ausbauen (F-17): Vorlagen für Fragetypen, verbesserter Bulk-Export

**Content**
- [ ] HB1 (Entscheidungsprozesse/Organisationsstrukturen) vollständig erstellen

**Nutzer:innen-Feedback**
- [ ] Erste KPI-Auswertung (Abschnitt 11: aktive Nutzer:innen, Abschlussquote) für beide Kurse
- [ ] Validierungs-Gate für den Mathe-Kurs prüfen (Abschnitt 9): lohnt sich weiterer Ausbau über den ersten Themenblock hinaus?

## Iteration 5 — Ausbau der Kernlernerfahrung (entspricht Phase 2/3 im Anforderungskatalog)

Ziel: Das Kernlernangebot ist funktional vollständig für beide Kurse, bevor in aufwändigere Zusatzfunktionen (Iteration 6) investiert wird.

**Programmierung (Kern)**
- [ ] Prüfungssimulation „Schriftliche Prüfung" (F-23)
- [ ] Offline-Modus für individuelle Lernmodi (F-42)
- [ ] „Weiter lernen"-Einstieg (F-27)
- [ ] Präsentations-/Fachgesprächs-Trainer (F-24/F-25)
- [ ] Lernstatistiken, Schwachstellenanalyse (F-31/F-32)
- [ ] Restzeit-/Lernpensum-Anzeige inkl. beider Zielmodi (F-35)
- [ ] Barrierefreiheit gemäß WCAG 2.1 AA prüfen/nachziehen (F-44)

**Content**
- [ ] Weitere Handlungsbereiche (HB2, HB4) bzw. weitere Mathe-Themenblöcke, je nach KPI-Signal aus Iteration 4

**Testing**
- [ ] Manuelle Barrierefreiheits-Stichprobe (Screenreader)

## Iteration 6 — Validierungs-Gate bestanden: Social, Gamification, KI, Payment (entspricht Phase 4)

Ziel: Erst nach positivem Signal aus den KPIs (Abschnitt 11) werden die aufwändigeren, bislang zurückgestellten Funktionen gebaut.

**Programmierung (Kern)**
- [ ] Einladungs-/Freundschaftssystem (F-63), Highscore (F-60), Duelle (F-61), Lernpartner-Vermittlung (F-62)
- [ ] Melde-/Blockier-UI (F-68) als Zusatzansicht im Admin-Bereich (Datenmodell existiert bereits seit Iteration 0)
- [ ] Nicht-soziale Gamification (F-67)
- [ ] Kohorten-/Dozenten-Funktion (F-07, F-64, F-65)
- [ ] KI-gestützte Bewertung & Aufgabengenerierung (F-70–F-72), inkl. BullMQ/Redis-Warteschlange

**Programmierung (Payment)**
- [ ] Payment-Service als eigenständiges App-Paket aufsetzen (eigene DB, eigenes Deployment)
- [ ] Event-/Message-Queue Kern ↔ Payment (BullMQ auf Redis) — inkl. Anbindung der bereits bestehenden Konto-Selbstlöschung (F-06) aus Iteration 1, damit gelöschte Konten auch im Payment-Service bereinigt werden
- [ ] Abo-/Kaufverwaltung (F-81), Statusübersicht im Nutzerprofil (F-82)

**Recht & Compliance**
- [ ] Vertragspartner-AGB gegenüber Minderjährigen prüfen (Zahlungsdienstleister, Managed-API-Anbieter)
- [ ] Zahlungsdienstleister auswählen und Vertrag abschließen (setzt die in Iteration 0 angemeldete Rechtsform voraus)

**Testing**
- [ ] Kontrakttests Kern ↔ Payment
- [ ] Event-/Queue-Tests (Idempotenz, Verhalten bei Ausfall)

## Offene, bewusst nicht terminierte Themen

Diese Punkte sind laut Anforderungskatalog (Abschnitt 10) bewusst ohne festen Auslöser in diesem Plan und werden erst aufgenommen, wenn ihre jeweilige Bedingung eintritt:

- Schulzentrierter Einwilligungsweg / schulische IT-Anforderungen — erst falls Schulen aktiv als Kanal hinzukommen
- JMStV-Jugendschutzbeauftragte:r-Pflicht — erst wenn Nutzerzahlen/Reichweite absehbar sind
- Konkrete Infrastruktur für das selbst gehostete KI-Modell — wird laut Architekturplanung erst kurz vor Iteration 6 festgelegt
