# Gesamtbericht: Code-Review und Usability-Test (07.10.2026)

Stand: Repository `a8114ab` (Branch `claude/projektstruktur-analyse-3c1ccb`), lokale Entwicklungsumgebung mit frisch importierten Inhalten (16.040 Items).
Umfang: 7 Code-Reviews, 15 Fachlehrer-Prüfungen (je Kurs), 3 Teilnehmer-Usability-Tests (alle 15 Kurse) und 1 Lehrkraft-Usability-Test. Insgesamt 26 Einzelberichte in diesem Ordner.

**Wichtig zur Belastbarkeit:** Die Befunde stammen von Review-Agenten. Ich habe vier besonders folgenreiche Aussagen selbst am Code gegengeprüft (siehe Abschnitt 2, „selbst bestätigt“); alle übrigen sind Aussagen der Einzelberichte und vor einer Korrektur im jeweiligen Bericht nachzulesen. Rechts-, Steuer- und Normeninhalte gelten nach Regel R4 weiter als **ungeprüft und nicht freigegeben**; die gemeldeten Rechtsfehler sind Prüfhinweise für fachkundige Personen, kein Prüfergebnis. Es wurde nichts am Code oder an Inhalten geändert.

## 1. Gesamtbild in Kürze

- **Technische Qualität:** Fundament solide (Auth/Session, Rollen- und Eigentümerprüfungen ohne gefundenes IDOR, Kern↔Payment sauber getrennt, Formeln überwiegend korrekt, 1.400+ Unit-Tests grün, `tsc` sauber). Die Schwächen liegen in **Datensicherheit des Re-Imports**, **nicht erzwungenen Jugendschutz-Regeln**, **Betriebsreife (Build/Deploy/CI)** und **Frontend-Robustheit**.
- **Inhaltliche Qualität (Fachlehrer-Sicht):** Noten zwischen 2 und 4, kein Kurs ohne Auflagen. Alle rechnerisch nachgeprüften Aufgaben stimmen weitgehend; die Fehler liegen bei **Rechtsaussagen**, **einzelnen Definitionen** und **mehrdeutigen Zonenfragen**. Dazu kommen **Rahmenplan-Lücken** (v. a. Rechenaufgaben) und **R5-Verstöße** (Werkzeuge/Spiele ohne Theorie).
- **Usability (Teilnehmer-Sicht):** Noten 2,0 bis 3,5 je Kurs, **kein Blocker** in den Teilnehmertests. Entwurfsinstrumente (R3-Gating) sind in allen vier Fachinformatiker-Kursen korrekt unsichtbar.

## 2. Priorität A: vor jedem Echtbetrieb beheben

| Nr. | Thema | Kern | Quelle | Status |
| --- | --- | --- | --- | --- |
| A1 | **Re-Import vernichtet Lernfortschritt** | `import-content.ts` löscht je Thema alle Items; `ON DELETE CASCADE` entfernt `user_progress`, `learning_event`, `user_note`. Nicht transaktional, bricht an FK (`exam_answer`, `duell_*`) halb ab; Themen werden über den Titel identifiziert (Titelkorrektur = Dublette). Auch per `admin.triggerImport` auslösbar. | LOG-01, SOZ-03/04, INF-02/03/04 | **selbst bestätigt** (Code löscht, Kommentar nennt die Kaskade) |
| A2 | **Mathe-Jugendschutz technisch nicht erzwungen** | `admin.setPublished` verlangt die Consent-Bestätigung nur bei `zielgruppe = minderjaehrige`; Mathematik 9 trägt dieses Feld nicht. Die Bestätigung ist ein Client-Boolean. Heute durch `ALLOW_MINORS=false` abgefangen. | SEC-02 | **selbst bestätigt** (Guard-Bedingung im Code) |
| A3 | **E-Mail nur Konsolen-Stub, Consent-/Setup-Links dauerhaft gültig** | Tokens landen im Log, Links gelten unbegrenzt und mehrfach (auch nach Passwortvergabe). Ohne echten Versand kommt keine Eltern-Mail an. | SEC-01/03, SOZ-06 | Bericht |
| A4 | **Payment-Platzhalter schaltet Premium kostenlos frei** | `POST /checkout-sessions` aktiviert sofort ein Abo, kein Produktions-Guard, kein Webhook, keine Signatur, keine Idempotenz. | SOZ-01/02 | Bericht |
| A5 | **Produktions-Build läuft nicht** | `dist` importiert extensionslos und `@edukedo/shared` als TS-Quelle (`ERR_MODULE_NOT_FOUND`); kein Dockerfile, keine Deploy-Pipeline; CI ohne Redis. | INF-01/05/06 | Bericht |
| A6 | **Abhängigkeiten mit Sicherheitsmeldungen** | `pnpm audit --prod`: 14 Meldungen (1 kritisch, 7 hoch), u. a. Fastify 4.29.1, drizzle-orm 0.36.4 (SQL-Injection), proxy-addr. | INF-06 | Bericht |
| A7 | **Mindestgröße der Aggregate nach Mitgliedern statt Beitragenden** | Dozenten- und Firmenstatistik lassen sich auf eine Einzelperson zuspitzen (reproduziert: 4 inaktive + 1 aktive Person = deren Quote). Verstößt gegen F-64/F-93. | UXL-01, SOZ-05 | im Browser reproduziert |
| A8 | **Minderjährigenschutz nur an Einschaltpunkten** | Freundeskreis, Kohortenbeitritt, Duell-Empfang ungesperrt; echte E-Mail-Adressen in sozialen Listen; Elternwiderruf wirkt nur auf Login/Sessions. Latent, solange `ALLOW_MINORS=false`. | SEC-05/06, SOZ-07/08, WEB (Mittel) | Bericht |

## 3. Priorität B: hohe Nutzerwirkung, sichtbar im Live-Kurs

| Nr. | Thema | Kern | Quelle | Status |
| --- | --- | --- | --- | --- |
| B1 | **Quiz ist erratbar (alle Kurse)** | `shapeQuizItem` mischt Multiple-Choice-Optionen nicht; Position B/2 in ca. 60–70 %, nie D; Wahr/Falsch zu 70–90 % „Falsch“; richtige Option meist die längste. Verfälscht Fortschritt, Credits, Streaks. Einfacher Fix: Optionen mischen. | SHR-01, alle Fachlehrer-Berichte | **selbst bestätigt** (Optionen werden unverändert übernommen, nur Zuordnung/Reihenfolge werden gemischt); Verteilung laut Berichten |
| B2 | **Modal verliert Fokus bei Textfeldern** | `Modal.tsx`: Effekt hängt an `[onClose]`, Aufrufer übergeben pro Render eine neue Funktion → Fokus springt aufs Panel. Notiz, „Fehler melden“ und „Konto löschen“ praktisch unbenutzbar; Klick im Einstellungsdialog schließt ihn (UserMenu `mousedown`). | WEB-01/02, UXL-02/03, UXT-F-01/02, UXT-B | **Ursache selbst bestätigt** (Effekt-Dependency); im Browser von 3 Tests bestätigt, vom FI-Test für den Pause-Dialog nicht (dort ohne Textfeld) |
| B3 | **Mischmodus-Queue instabil** | `dueCards.invalidate()` nach jeder Bewertung; Fragen wiederholen sich bis zu fünfmal, Zähler schrumpft, Themenfilter wird durchbrochen, Abschlussquote verfälscht. | WEB-05, UXT-I-01, UXT-F-03, UXT-B | in 3 Tests bestätigt |
| B4 | **Offline: Daten nicht nutzergebunden** | IndexedDB/Sync-Queue wird beim Logout nicht geleert → auf geteilten Geräten gehen Antworten an den nächsten Nutzer; Kaltstart ohne Netz landet auf der Landing Page. | WEB-03/04 | Bericht |
| B5 | **Offline-Sync nimmt `occurredAt` ungeprüft an** | Zukunftsdatum friert Karten ein, erlaubt Streak-/Highscore-Manipulation. | LOG-03, SHR | Bericht |
| B6 | **Kein „Passwort vergessen“** | F-02 verlangt es als Muss. | UXT-F-04, SEC | im Browser bestätigt |
| B7 | **Allowlist filtert nur den Instrumente-Tab** | SQL-/UML-/ER-Fragen stehen im Quiz-Pool der FI-Kurse und erscheinen im Lernen-Quiz. | SHR, UXT-I-02 | im Browser bestätigt |
| B8 | **Instrument-Kacheln führen nicht zum Instrument** | Kachel öffnet eine Themen-Lernrunde (im Büro-Kurs landen drei Instrumente in derselben Aufgabe). | UXT-B, UXT-F, UXT-I-17 | in 3 Tests beobachtet |
| B9 | **Mobile Tab-Leiste abgeschnitten** | Bei 375 px ist „Fortschritt“ nicht erreichbar; `.segmented`-Leisten der Rechner ohne Umbruch/Scroll. | WRK-02, UXT-I-03, UXT-B | in 2 Tests bestätigt |
| B10 | **Keine ErrorBoundary** | Ein Renderfehler leert die ganze App (z. B. 200.000 Zahlen im Statistiktrainer: `Math.min(...x)`). | WRK | Bericht |
| B11 | **Rechenfehler** | `rundeCent` falsch ab Werten ≥ 2 (z. B. 8,54 × 25 % = 2,13 statt 2,14; Tilgungspläne in ca. 4 % um 1 Cent); Skalierungsrechner meldet bei jedem 0–10-V-Signal „außerhalb des Nennbereichs“. | SHR-02, WRK-01 | Bericht (teils reproduziert) |
| B12 | **Fortschritt/Credits** | Abbruch einer Karteikarten-Runde zieht nie vergebene Credits ab; Prüfungssimulation ohne Item-/Session-Bindung, nach `finish` änderbar; alle Tagesgrenzen/Streaks in UTC. | LOG-02 u. a. | Bericht |

## 4. Priorität C: fachliche Blocker je Kurs (nach R4 nur Prüfhinweise)

| Kurs | Note (Fachl./Didaktik) | Empfehlung | Wichtigste Fehler |
| --- | --- | --- | --- |
| Ausbildung der Ausbilder | 4 / 3 | Recht nicht freigabereif | Zeugnisinhalt (§ 16 BBiG), Vertragsform (§ 11: Textform nur für die Niederschrift), falsche Paragrafenverweise (§ 21 Abs. 3, § 5 Abs. 2 Nr. 6), § 98 BetrVG; Tuckman/PDCA im Sprint ohne Theorie |
| Technischer Fachwirt | 3 / 3 | mit Auflagen | 50 Hz = 100 Richtungswechsel/s (Theorie sagt 50); „Führung“ als angeblicher Fachgesprächsschwerpunkt (auch in `CLAUDE.md`/`content/README.md`); ABC- und Härteprüfungs-Einordnung; Rahmenplan-Lücken |
| Industriefachwirt | 3 / 3,5 | mit Auflagen | Aufbewahrungsfrist 10 statt 8 Jahre; § 343 BGB gegenüber Kaufleuten; Werk-/Werklieferungsvertrag; Rechen-Sprint ohne Theorie |
| Versicherungen/Finanzanlagen | 3 / 3 | mit Auflagen | Notlagentarif falsch beschrieben; § 61/62 VVG vertauscht (Q-3.2-01); F-KB1-03/F-KP1-03 Musterlösungen; Finanzanlagen fehlen komplett; Altersvorsorgereform 2027 nicht berücksichtigt |
| Transport/Logistik | 3− / 3 | mit Auflagen | Haftungsdurchbruch nach § 435 HGB (Vorsatz/Leichtfertigkeit, nicht „grobe Fahrlässigkeit“); **zwei live sichtbare mehrdeutige Zonenfragen** (Verkehrsträger, ABC); „BAG“ statt BALM |
| Immobilienfachwirt | 4 / 3 | Recht nicht freigabereif | Maklerprovision (§§ 656a–d BGB), Fortbildungspflicht § 15b MaBV, Indexmiete, Kabelanschluss, VOB; fast keine Rechenaufgaben |
| Handelsfachwirt | 3,5 | mit Auflagen | Handelsspanne vs. Kalkulationszuschlag in der Theorie vertauscht (Trainer rechnet richtig); Skonto-Aussage; Listungsgebühr in F-WB1-03; nur 3 Rechenaufgaben |
| Wirtschaftsfachwirt | 3 / 3 | mit Auflagen | Sachmangel und Aufbewahrungsfristen veraltet; Lehrbuch-Abweichungen; keine Buchführung/Bilanzanalyse |
| Gesundheit/Soziales | 3− / 3 | mit Auflagen | Nachweisgesetz, Rückstellungen, Kostenträger-Zuordnungen; Finanzierung/Rechnen fehlt; Instrument „Kostenträger“ bleibt gesperrt |
| Büro/Projektorganisation | 3,5 / 3,5 | mit Auflagen | Pflichtenheft, Corporate Identity, „Datenquellen“, Ausbildungsplan/Rahmenlehrplan falsch/irreführend; Kurzantworten nur im Autorenwortlaut lösbar |
| Mathematik 9 | 2,5 / 3,5 (gesamt 3,0) | mit Auflagen | U-ALG-01 Musterlösung widerspricht dem Text (x parallel zur Wand); Strahlensatz-Beschriftung (Q-GEO3-04 zwei wahre Optionen); Kurzantworten mit √, ², ° praktisch unlösbar; Körperberechnung/Statistik fehlen |
| Fachinformatiker AE | 2 / 2–3 | mit Auflagen | Kein belegter Sachfehler; Testart/Testverfahren, MVC, mehrdeutige UML-Zonen; Q-6.1-22; Theorie fehlt für Bug-Hunt/Sortier-/Zahlensystem-Sprint |
| Fachinformatiker DPA | 2 / 2 | mit Auflagen | Quantität vs. Vollständigkeit und Validität vs. Plausibilität nicht trennscharf (Instrument bereits sichtbar!); Skalenniveaus drei- vs. vierstufig |
| Fachinformatiker DV | 2 / 2–3 | mit Auflagen | **Q-11.4-05 falsch gestellt** (kleinste vs. längste Präfixlänge, Blocker); OPC UA als reines Polling dargestellt; Topologien per Router-IP statt Gateway „lösbar“ |
| Fachinformatiker SI | 2 / 3 | mit Auflagen | Theorie fehlt für Linux/Windows-Befehle, Subnetting/VLSM, Zahlensysteme, DNS/DHCP/IPv6/Zertifikate (R5); K-10.1-16 widerspricht GPO-Theorie |

Zusätzlich kursübergreifend: **zu wenige Rechenaufgaben** (v. a. Fachwirte), **Kurzantworten per exaktem String-Vergleich** (nicht erfüllbar bei Sonderzeichen/Dezimalzahlen), **Karteikarten-Duplikate**, **Spieleangebot uneinheitlich** (0 bis 6 Spiele je Kurs), **Prozess-Reihenfolge-Spiel passt in mehreren Kursen nicht** (Scrum/Tuckman/PDCA ohne Theorie).

## 5. Priorität D: Mittel/Niedrig (Auszug)

- **Usability:** Theorie ohne eigenen Tab; „Prüfungsablauf noch nicht beschrieben“ in allen Kursen; Zonen-Rückmeldung nennt oft nur Farbe statt Lösung; Suche zeigt Lückentext-Rohsyntax mit Lösung; „Demo-Kurs“ für Lernende sichtbar; interne IDs (F-70, F-102) im Nutzertext; abgebrochener Satz im Rechen-Sprint (`WeitereSpiele.tsx:746`); rohe englische Zod-JSON-Fehler; Glossar nur in Systemintegration gefüllt; Achievement-Kachel nicht aktualisiert.
- **Lehrkraft:** Mitglieder erfahren nicht, dass Dozent:in E-Mail und Beitrittsdatum sieht; kein Austritt aus Kohorte; Datenschutzerklärung erwähnt Kohorten nicht; Firmenbranding akzeptiert `javascript:`-/`http:`-Logo-URLs und unlesbare Farben; „Lizenz entziehen/Widerrufen“ ohne Rückfrage; `/vorschau` liefert nur 5 Zufallsfragen. Positiv: Unterweisungs- und Ausbildungsplaner (Note 2).
- **Technik:** In-Memory-Rate-Limiter ohne `trustProxy`; Push-Endpoint SSRF-anfällig; `NODE_ENV`-Default `development` (fail-open); `registerInputSchema.birthDate` akzeptiert `null`/`0` als 1970; `calculateAge` zeitzonenabhängig; Selbst-DoS durch Glob-Regex im Terminal und SQL-Sandbox; `apps/web` ohne Tests (33.000 Zeilen); Doku-Drift (`CLAUDE.md` nennt Katalog 0.19, Ist 1.28; F-144–F-156 kollidieren im Code mit dem Katalog); Testlücken bei Rate-Limits, `setPublished`, Link-Ablauf, `exam.*`, Offline-Sync.

## 6. Hinweise zur Testdurchführung

- Die parallelen Browser-Agenten teilten das Cookie-Jar auf `localhost:5173`; zwei Agenten wichen auf eigene `*.localhost`-Hosts aus, einer war kurz in einem fremden Testkonto. Einzelne Befunde (z. B. Kursbeitritt im falschen Kurs) sind deshalb nicht belastbar reproduzierbar und im Bericht entsprechend vermerkt.
- Abgebrochene Agenten (Nutzungslimit) wurden neu gestartet; vier Fachlehrer-Berichte (Büro, Gesundheit, Immobilien, Wirtschaftsfachwirt) waren vor dem Abbruch fertig geschrieben. Bei der Büro- und Gesundheit-Prüfung war die Online-Recherche eingeschränkt; Aussagen sind dort als „zu prüfen“ markiert.
- Alle Testkonten und Testdaten wurden gelöscht (Kontroll-SELECT: 0 Zeilen). Postgres/Redis mussten zwischendurch neu gestartet werden; die Entwicklungs-DB enthält die frisch importierten Inhalte.
- Nicht abgedeckt: Prüfungssimulation (nur angesehen), Offline/Push, KI-Funktionen, Zahlungsflows, echter Eltern-Consent-Flow (durch `ALLOW_MINORS=false` nicht erreichbar), Gerätetests (Mobil nur im Browser-Emulator).

## 7. Empfohlene Reihenfolge

1. **Sofort (klein, hoher Nutzen):** MC-Optionen mischen (B1); `Modal`-Effekt von `onClose` entkoppeln (B2); `invalidate()` im Mischmodus entfernen (B3); Logout leert IndexedDB (B4); `occurredAt` begrenzen (B5); `rundeCent` korrigieren (B11); Platzhalter-Checkout in Produktion sperren (A4).
2. **Vor jedem Echtbetrieb (mittlerer Aufwand):** Import transaktional und über stabile Themen-IDs, ohne Löschen von Items mit Nutzerdaten (A1); Mindestgrößen nach Beitragenden (A7); Consent-Links befristet/einmalig und echter Mailversand (A3); `setPublished`-Guard für Mathe und alle Minderjährigen-Kurse serverseitig (A2); Build/Dockerfile/CI (A5); Dependency-Updates (A6).
3. **Inhalt (nur mit fachkundiger Prüfung, R3/R4):** Blocker je Kurs aus Abschnitt 4 abarbeiten, mehrdeutige Zonenfragen im Live-Kurs Transport zuerst; Rechenaufgaben und fehlende Theorie (R5) ergänzen, bevor die zugehörigen Werkzeuge/Spiele sichtbar bleiben.
4. **Folgearbeit:** Web-Tests, ErrorBoundary, Mobil-Navigation, Instrument-Kachel-Navigation, Theorie-Tab, Passwort-Reset, Doku-Drift bereinigen.

## 7a. Umsetzungsstand (laufend ergänzt)

| Punkt | Stand | Nachweis |
| --- | --- | --- |
| A1 Re-Import vernichtet Lernfortschritt | **erledigt 08.10.2026** | docs/entwuerfe/sicherer-content-import.md, Architekturplanung §13 (Schritte 1 bis 7) |
| A2 Mathe-Jugendschutz serverseitig | **teilweise erledigt 08.10.2026** (Veröffentlichungs-Guard); „Mail produktiv“ als Bedingung offen | Architekturplanung §13 „Sicherheit, Schritt 1“ |
| A4 Payment-Platzhalter | **erledigt 08.10.2026** (503 in Produktion) | Architekturplanung §13 „Schritt 7“ des Stabilisierungsblocks |
| B1 Quiz-Optionen mischen | **erledigt 08.10.2026** | §13 „Schritt 1“ |
| B2 Modal-Fokus | **erledigt 08.10.2026** | §13 „Schritt 2“ |
| B3 Mischmodus-Queue | **erledigt 08.10.2026** | §13 „Schritt 3“ |
| B4 Offline-Daten pro Person | **erledigt 08.10.2026** (WEB-03 Kaltstart offline offen) | §13 „Schritt 4“ |
| B5 Zeitstempel im Offline-Sync | **erledigt 08.10.2026** (Fenster 14 Tage) | §13 „Schritt 5“ |
| B9 Mobile Tab-Leisten | **erledigt 08.10.2026** | §13 „Schritt 8“ |
| B11 `rundeCent` | **erledigt 08.10.2026** (Skalierungsrechner-Meldung WRK-01 offen) | §13 „Schritt 6“ |
| A7 Mindestgröße nach Beitragenden | **erledigt 08.10.2026** (Mitglieder erfahren weiterhin nichts, UXL-04 offen) | §13 „Sicherheit, Schritt 2“ |
| A3 Consent-/Setup-Links dauerhaft, Links im Log | **teilweise erledigt 08.10.2026** (Einmal-Links, kein Link im Produktions-Log); echter Mailversand wartet auf Anbieterwahl | §13 „Sicherheit, Schritt 3“ |
| SEC-04 Ratenbegrenzung (Eltern-/Firmen-Login, Registrierung, Mail-Bombing, trustProxy, Speicher) | **erledigt 08.10.2026** | §13 „Sicherheit, Schritt 4“ |
| B6 Passwort vergessen (F-02) für Lernende, Eltern, Unternehmen | **erledigt 08.10.2026** | §13 „Sicherheit, Schritt 5“ |
| B10 ErrorBoundary und Absturz im Statistiktrainer | **erledigt 08.10.2026** (kein automatischer Komponententest, manuell geprüft) | §13 „ErrorBoundary und Absturz im Statistiktrainer“ |
| A6 Abhängigkeiten (Fastify 5, drizzle-orm 0.45, Overrides) | **erledigt 08.10.2026** (Produktion: 0 Funde; Dev-Werkzeuge vitest/vite offen) | §13 „Abhängigkeiten, Sicherheitsupdates“ |
| A5 Produktions-Build, Images, CI | **erledigt 08.10.2026** (Actions-Datei noch nicht in GitHub gelaufen; Deploy-Workflow und Hosting offen) | §13 „Produktions-Build, Images und CI“, infra/README.md |
| A8 Minderjährigenschutz (beide Seiten, Widerruf, Anzeigenamen, Kaufsperre) | **erledigt 08.10.2026** (Oberfläche für Minderjährige und rechtliche Prüfung offen) | §13 „Minderjährigenschutz in den sozialen Funktionen“ |
| B7 Allowlist auch für Instrument-Fragen | **erledigt 08.10.2026** (50 Fragen im Bestand unsichtbar) | §13 „Kursangebot gilt auch für Instrument-Fragen“ |
| B8 Instrument-Kachel führt zum Instrument | **erledigt 08.10.2026** | §13 „Instrument-Kacheln führen zum Instrument“ |
| Fachlehrer-Befunde zum Content: Sortierung aller 610 Befunde; Paket 1 (5 Blocker) und Technischer Fachwirt (14 Korrekturen) umgesetzt | **teilweise erledigt 08.10.2026** (Rest und Rechtsnahes offen, R3/R4) | `content-korrekturen.md`, §13 „Inhaltskorrekturen“ |
| Lese-Modus für Kursinhalte (UXL-12 Rest: "Inhalte ansehen" ohne Beitritt, mit Lösungen) | **erledigt 08.10.2026** | §13 „Lese-Modus für Kursinhalte“ |
| Lehrkraft-Erweiterungen: UXL-12 (Vorschau-Limit, Dialog), UXL-13 (Meldungen mit Kategorie und Rückmeldung), UXL-14 (Druck/Textdatei, Zeit), UXL-15 (Großanzeige), UXL-16 (CSV-Export), UXL-19, UXL-21, UXL-22 | **erledigt 08.10.2026** (offen: Lese-Modus ohne Beitritt, Aufbewahrungsfrist der Meldungen, UXL-23 bewusst unverändert) | §13 „Lehrkraft-Erweiterungen“ |
| Werkzeuge: WRK-19 Rest (Topologie-Labor merkt den Stand je Szenario) | **erledigt 08.10.2026** | §13 „Topologie-Labor“ |
| Werkzeuge: WRK-47 (Aufgabennummer in zwölf Trainern) | **erledigt 08.10.2026** | §13 „Werkzeuge: Aufgabennummer“ |
| Werkzeuge: WRK-04 (nur exakt gerundete Werte, Nutzer-Entscheidung), WRK-05 (Rechenwege ungerundet), WRK-06 (strikte Zahleneingabe) | **erledigt 08.10.2026** (Lesehinweis in acht Rechnern; offen: Skalierung, Testfalltrainer, Statistik, WRK-47) | §13 „Werkzeuge: Rundung“ |
| Web, offene Punkte: WEB-03 (Kaltstart ohne Netz), WEB-10 (Prüfungsentwurf), WEB-18 (CSP), WEB-21 (Hinweis), WEB-22 (Redaktionsliste), WEB-39 (maskable), WRK-19 (Reiter) | **erledigt 08.10.2026** (offen: Logo-Auslieferung, Topologie-Szenarien, WRK-04/05/06/47, UXL-Erweiterungen) | §13 „Web, offene Punkte“ |
| LOG (niedrig/Hinweis), LOG-16 bis 26 (Token an Nutzer, Fehlerabbildung, Änderungsfenster, Zieltag, CHECKs, Freigabe-Schutz, Eingabegrenzen, Zeilen-IDs, FSRS) | **erledigt 08.10.2026** (offen: einmaliger Sprint-Token, `is_premium` vor F-80, Ratenbegrenzung) | §13 „Lernlogik, niedrige Befunde“ |
| LOG (mittel), Paket 2: LOG-05/07/12/13/15 (Neuabgabe, Fälligkeit, Runde verwerfen, stabile Options-IDs, Spielstände atomar) | **erledigt 08.10.2026** (LOG-16 Sprint-Token offen) | §13 „Lernlogik, mittlere Befunde, Paket 2“ |
| LOG (mittel), Paket 1: LOG-08/09/10/11/14 (Typbindung, Sperren, Notizen, Aggregation, Index) | **erledigt 08.10.2026** (Idempotenzschlüssel für Online-Antworten offen) | §13 „Lernlogik, mittlere Befunde, Paket 1“ |
| WRK/UXL/WEB, Paket 11 (Abschluss: WEB-16, WRK-45 bewusst unverändert; Reststand in §13) | **erledigt 08.10.2026** | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 10 (Ladegröße, Schriften, Aktualisierung, Touch; WEB-18/19/21/22/23, WRK-35/44) | **erledigt 08.10.2026** (WEB-03, CSP und Logo-Auslieferung offen) | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 9 (Prüfung, Links, Dialoge, Rückmeldungen; WEB-05/10/11/26/28/29/33/35/36/39) | **erledigt 08.10.2026** (Prüfungsentwurf-Speicherung und maskable Icon offen) | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 8 (Werkzeuge und Spiele, Bedienung; WRK-18/23/27/30/31/32/34/43/46) | **erledigt 08.10.2026** (WRK-04/05/06/19/47 bewusst offen) | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 7 (Robustheit der Werkzeuge; WRK-10/11/12/13/14/15/20/24/33/39) | **erledigt 08.10.2026** | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 6 (Unternehmen, Codes, Startseite; UXL-09/10/11/24, SHR-11, WEB-17) | **erledigt 08.10.2026** | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 5 (Sitzung, Offline-Daten, Ladefehler; WEB-08/12/20/25/34/38) | **erledigt 08.10.2026** (WEB-03/19/21 offen) | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 4 (Rückfragen, Seiten, Barrierefreiheit; UXL-11, WEB-15/24/27/30/31/41/42, WRK-22/41/42) | **erledigt 08.10.2026** | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 3 (Werkzeuge: mobile Eingabe, Fokus, Rechen- und Anzeigefehler; WRK-03/07/08/16/17/21/25/26/28/29/36/37/38/40) | **erledigt 08.10.2026** | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 2 (Kohorten-Verwaltung und Transparenz; UXL-04/05/17/18/20) | **erledigt 08.10.2026** (Datenschutzerklärung zu Kohorten: Prüfhinweis offen) | §13 „Web-Feinschliff“ |
| WRK/UXL/WEB, Paket 1 (Fehlermeldungen, Code-Felder, Kontraste, autocomplete, Ladefehler; UXL-08/09, WEB-06/07/09/14/32/37/40, WRK-01) | **erledigt 08.10.2026**; weitere Pakete laufend | §13 „Web-Feinschliff“ |
| B12 Credits-Abbruch, Prüfungssimulation, Tagesgrenzen | **erledigt 08.10.2026** (LOG-02, LOG-04, LOG-06; Zeitlimit serverseitig und Pacing-Zieltage offen) | §13 „Fortschritt, Credits und Prüfungssimulation“ |

## 8. Einzelberichte

Code: `code-api-sicherheit.md` (28 Befunde), `code-api-lernlogik.md` (26), `code-api-sozial-admin-payment.md` (32), `code-shared.md` (29), `code-web-kern.md` (47), `code-web-werkzeuge.md` (47), `code-pipeline-tests-infra.md` (36).
Fachlehrer: `fachlehrer-<kurs>.md` für alle 15 Kurse (Befundzahlen je Bericht, z. B. AEVO 43, Technischer Fachwirt 54, Industriefachwirt 56, Versicherungen 45, Transport 56, Handelsfachwirt 69).
Usability: `usability-teilnehmer-fachwirte.md`, `usability-teilnehmer-branchenkurse.md`, `usability-teilnehmer-fi-mathe.md`, `usability-lehrkraft-verwaltung.md`.
