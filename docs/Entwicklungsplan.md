# Entwicklungsplan: edukedo

Stand: 14.09.2026 · Grundlage: Anforderungskatalog Version 0.20 (insbesondere Abschnitt 9, Phasenplanung) und Architekturplanung Version 0.8 (insbesondere „Nächste Schritte")

> **Aktualisierung 14.09.2026:** Business-Lizenzen & Sponsoring (F-91–F-94, siehe Anforderungskatalog Abschnitt 5.12 und Architekturplanung Abschnitt 4.5/13) als neue Aufgaben in **Iteration 6** ergänzt — passend zur dortigen Phase-4-Einordnung. Bewusst unter „Programmierung (Kern)" statt „Programmierung (Payment)" einsortiert, weil die Lizenz laut Architekturentscheidung keine Premium-Freischaltung auslöst und deshalb ohne Anbindung an den separaten Payment-Service auskommt — diese Aufgaben sind unabhängig von den übrigen Iteration-6-Payment-Aufgaben umsetzbar. Ergänzend: ein Recht-&-Compliance-Task zu Unternehmens-AGB sowie zwei Testing-Tasks zur Zugriffssperre bei aggregierter Statistik.
>
> **Aktualisierung 12.09.2026 (Entwickler-Review):** Vier Anpassungen gegenüber der ersten Fassung: (1) **Iteration 2 und 3 wurden dependency-bewusst neu geschnitten** — der Eltern-Consent-Flow (F-08/F-90) steht jetzt bewusst *vor* der Live-Schaltung des Mathe-Kurses, weil die Architekturplanung genau das verlangt (Consent-Infrastruktur muss stehen, bevor ein überwiegend von Minderjährigen genutzter Kurs veröffentlicht wird). (2) Das **`REPORT`/`BLOCK`-Datenmodell wandert von Iteration 3 nach Iteration 0**, weil es ohnehin nur Schema ohne UI ist und laut Architekturplanung in dieselbe erste Migrations-Charge gehört. (3) **Konto-Selbstlöschung (F-06)** ist jetzt ein expliziter Task in Iteration 1, statt implizit „irgendwann" mitzulaufen — ab dieser Iteration entstehen echte personenbezogene Daten. (4) Iteration 0 berücksichtigt jetzt auch **`CONTENT_ITEM_VERSION`, `TAG`/`CONTENT_ITEM_TAG`** sowie die dafür nötigen Postgres-Extensions, passend zum inzwischen vertieften Datenmodell (Architekturplanung Version 0.5/0.6).

## Grundprinzip

Der Plan ist **iterativ** organisiert, nicht kalendarisch: Jede Iteration liefert einen abgeschlossenen, für sich sinnvollen Zuwachs (idealerweise einen lauffähigen vertikalen Slice), bevor die nächste beginnt. Es gibt bewusst keine Zeitangaben je Iteration oder Aufgabe — nur den bereits an anderer Stelle festgehaltenen groben Rahmen für den MVP-Launch insgesamt (Q2 2027, siehe Anforderungskatalog Abschnitt 1). Reihenfolge und Detailtiefe der Aufgaben können sich beim Arbeiten noch verschieben; der Plan ist als lebendes Dokument gedacht, das mit dem Projektfortschritt aktualisiert wird — Aufgaben können als erledigt abgehakt werden (`- [x]`).

Jede Iteration ist nach **Bereichen** aufgeschlüsselt: Programmierung (Kern), Programmierung (Payment, erst ab Iteration 6 relevant), Content, Recht & Compliance, Organisatorisches, Testing, Nutzer:innen-Feedback. Nicht jeder Bereich hat in jeder Iteration Aufgaben.

## Iteration 0 — Grundgerüst & Vorbereitung

Ziel: Alles ist bereit, um mit dem ersten inhaltlichen Slice (Iteration 1) zu beginnen — noch ohne sichtbaren Lernfortschritt für Nutzer:innen.

**Programmierung (Kern)**
- [ ] Monorepo aufsetzen (pnpm Workspaces + Turborepo), Grundstruktur `/apps/web`, `/apps/api`, `/packages/shared` anlegen
- [ ] CI-Grundgerüst (GitHub Actions: Lint, Typecheck, Tests, Build bei PR)
- [ ] PostgreSQL-Instanz (z. B. Neon/Supabase) für den Kern anlegen, benötigte Extensions aktivieren (`citext` für `"user".email`/`parent.email`, ggf. `pgcrypto` für `gen_random_uuid()`), Drizzle/Prisma-Migrationsverwaltung einrichten
- [ ] Generisches Content-Datenmodell migrieren: `KURS`, `FACHGEBIET`, `THEMA`, `CONTENT_ITEM`, `CONTENT_ITEM_VERSION`, `ANSWER_OPTION` (inkl. `side`-Feld für Zuordnungs-Paare), `TAG`, `CONTENT_ITEM_TAG`, `USER_COURSE` (F-09, F-13)
- [ ] `REPORT`/`BLOCK`-Datenmodell (F-68) direkt mit den übrigen Migrationen anlegen, auch ohne UI (vorgezogen aus der ursprünglich späteren Jugendschutz-Iteration, siehe Architekturplanung Abschnitt 4.4)
- [ ] Auth-Grundgerüst (Eigenbau): Argon2id-Hashing, Sessions/Cookies, Rollenmodell (`learner`, `parent`, `content_editor`, `admin`)
- [ ] tRPC-Router-Grundstruktur für die Kern-API

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
- [ ] Testinfrastruktur aufsetzen (Vitest, Testcontainers für Postgres)

## Iteration 1 — Erster vertikaler Slice: Fachwirt-Pilot, HB3 (erstes Thema)

Ziel: Eine Person kann sich registrieren und mit echtem, selbst erstelltem Content zu einem ersten Thema aus HB3 lernen — Karteikarten und Quiz funktionieren Ende-zu-Ende.

**Programmierung (Kern)**
- [ ] Registrierung/Login inkl. Altersabfrage (F-01, F-02); `USER.birth_date`/`is_minor` werden gesetzt, volle Jugendschutz-Durchsetzung (F-08) ist hier noch nicht nötig (Fachwirt-Pilot = erwachsene Zielgruppe)
- [ ] Konto-Selbstlöschung (F-06) implementieren: Eigenes Konto inkl. kaskadierender Daten vollständig löschen können — die technische Grundlage (Löschverhalten je Tabelle) steht bereits im Datenmodell; nötig, sobald echte personenbezogene Daten entstehen, unabhängig vom (später hinzukommenden) Payment-Service
- [ ] Karteikarten-Modus (F-20) mit FSRS-Algorithmus (`ts-fsrs`, `USER_PROGRESS`-Felder `difficulty`/`stability`/`state`)
- [ ] Quiz-Modus (F-21) mit Sofort-Feedback
- [ ] Einfache Fortschrittsanzeige je Thema (F-30)
- [ ] PWA-Grundgerüst (F-40, F-41): Service Worker, installierbar

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
- [ ] Vollständiger Eltern-Consent-Flow (F-08): E-Mail-Bestätigung, `CONSENT_TOKEN`, automatische Erinnerungen, kontoloser Vorschau-Modus
- [ ] `PARENT`, `PARENT_CHILD_LINK` als eigener Account-Typ
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

## Iteration 6 — Validierungs-Gate bestanden: Social, Gamification, KI, Payment, Business-Lizenzen (entspricht Phase 4)

Ziel: Erst nach positivem Signal aus den KPIs (Abschnitt 11) werden die aufwändigeren, bislang zurückgestellten Funktionen gebaut.

**Programmierung (Kern)**
- [ ] Einladungs-/Freundschaftssystem (F-63), Highscore (F-60), Duelle (F-61), Lernpartner-Vermittlung (F-62)
- [ ] Melde-/Blockier-UI (F-68) als Zusatzansicht im Admin-Bereich (Datenmodell existiert bereits seit Iteration 0)
- [ ] Nicht-soziale Gamification (F-67)
- [ ] Kohorten-/Dozenten-Funktion (F-07, F-64, F-65)
- [ ] KI-gestützte Bewertung & Aufgabengenerierung (F-70–F-72), inkl. BullMQ/Redis-Warteschlange
- [ ] **Business-Lizenzen & Sponsoring (F-91–F-94, ergänzt 14.09.2026, siehe Architekturplanung Abschnitt 4.5/13):** `company_account` als eigener Account-Typ/Login (Rolle `company_admin`, analog zu `parent`) inkl. Lizenzkontingent-Verwaltung (`seat_limit`, `billing_status`); `company_invite_code` zur Lizenzvergabe (analog F-63); `user_company_membership` zur Branding-/Statistik-Zuordnung (1:1 je Nutzer:in)
- [ ] Visuelles Unternehmens-Branding (F-92): Logo/Farbschema/Begrüßungstext auf Basis von `company_account`, rein präsentationsseitig — kein separater Content
- [ ] Aggregierte Unternehmens-Statistik (F-93) als eigener `/company/*`-Endpunkt, technisch ohne Möglichkeit einer Einzel-Nutzer-Auswertung (Beschäftigtendatenschutz, § 26 BDSG — siehe Anforderungskatalog Abschnitt 7, Architekturplanung Abschnitt 8)
- [ ] Sponsoring-Markenplatzierung (F-94): `sponsor`-Tabelle, statische Anzeige-Komponente ohne Tracking/Personalisierung, admin-gepflegt; für den Schulfach-Kurs zusätzlich gegen N-01/N-13 prüfen (keine Interaktivität/Call-to-Action)
- [ ] Einfaches Admin-Werkzeug, um `company_account.billing_status`/`seat_limit` nach manuellem Zahlungseingang freizuschalten (kein automatisierter Checkout, siehe Architekturplanung Abschnitt 13)

**Programmierung (Payment)**
- [ ] Payment-Service als eigenständiges App-Paket aufsetzen (eigene DB, eigenes Deployment)
- [ ] Event-/Message-Queue Kern ↔ Payment (BullMQ auf Redis) — inkl. Anbindung der bereits bestehenden Konto-Selbstlöschung (F-06) aus Iteration 1, damit gelöschte Konten auch im Payment-Service bereinigt werden
- [ ] Abo-/Kaufverwaltung (F-81), Statusübersicht im Nutzerprofil (F-82)

**Recht & Compliance**
- [ ] Vertragspartner-AGB gegenüber Minderjährigen prüfen (Zahlungsdienstleister, Managed-API-Anbieter)
- [ ] Zahlungsdienstleister auswählen und Vertrag abschließen (setzt die in Iteration 0 angemeldete Rechtsform voraus)
- [ ] **Einfache Unternehmens-AGB/Nutzungsbedingungen für Business-Lizenzen erstellen (ergänzt 14.09.2026):** Regelt Rechnungsstellung, Laufzeit/Kündigung des Kontingents sowie den Hinweis, dass der zugrunde liegende Lerncontent unabhängig davon weiterhin frei zugänglich bleibt (siehe Anforderungskatalog Abschnitt 5.12) — unabhängig von der B2C-AGB-Prüfung oben

**Testing**
- [ ] Kontrakttests Kern ↔ Payment
- [ ] Event-/Queue-Tests (Idempotenz, Verhalten bei Ausfall)
- [ ] **Zugriffskontroll-Tests für `/company/*`-Statistik-Endpunkte (ergänzt 14.09.2026):** Verifizieren, dass mit `company_admin`-Berechtigung unter keinen Umständen Einzel-Nutzer-Datensätze abrufbar sind — nur aggregierte Werte
- [ ] **Test der Lizenzkontingent-Grenzen (ergänzt 14.09.2026):** Einladungscode lässt sich nicht über `seat_limit` hinaus einlösen; Branding erscheint nur für Mitglieder des jeweiligen `company_account`

## Offene, bewusst nicht terminierte Themen

Diese Punkte sind laut Anforderungskatalog (Abschnitt 10) bewusst ohne festen Auslöser in diesem Plan und werden erst aufgenommen, wenn ihre jeweilige Bedingung eintritt:

- Schulzentrierter Einwilligungsweg / schulische IT-Anforderungen — erst falls Schulen aktiv als Kanal hinzukommen
- JMStV-Jugendschutzbeauftragte:r-Pflicht — erst wenn Nutzerzahlen/Reichweite absehbar sind
- Konkrete Infrastruktur für das selbst gehostete KI-Modell — wird laut Architekturplanung erst kurz vor Iteration 6 festgelegt
</content>
