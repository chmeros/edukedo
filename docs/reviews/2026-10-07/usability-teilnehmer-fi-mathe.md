# Usability-Test Teilnehmer:in — Fachinformatiker-Kurse und Mathematik 9

Stand: 08.10.2026. Getestet mit einem Wegwerf-Konto (volljährig, E-Mail-Adresse im Format uxt-teilnehmer-...@example.test), lokale Dev-Umgebung (Web :5173, API :3001), eigener Browser-Tab. Es wurde kein Quellcode und kein Inhalt verändert, nichts committet. Das Testkonto wurde am Ende per `DELETE FROM "user"` entfernt, die Kontrolle per SELECT ergab 0 Zeilen (kein Fehler beim Löschen, auch keine verwaisten `user_course`-Zeilen).

## Kurzfazit

- **Kein Blocker.** Die als Entwurf gesperrten Instrumente (Authentifizierungsfaktoren, Kryptografie-Bausteine, Monitoring, Cloud-Modelle, Angriffsarten, Verzeichnisdienst) tauchen für Lernende **nirgends** auf: nicht im Instrumente-Tab, nicht in der Suche, nicht im Quiz-Pool (je Kurs 400+ verschiedene Fragen per API geprüft), nicht in den Fortschrittsprozenten (die Summe entspricht exakt den aktiven Fragen, z. B. Digitale Vernetzung 1545).
- Instrumente-Tab und Spiele-Liste entsprechen in allen vier Fachinformatiker-Kursen genau der Allowlist (Kernangebot und „Grundlagen (gemeinsamer Teil 1)"). Alle geöffneten Werkzeuge liefen ohne Fehler (SQL-Worker ca. 2–4 s Startzeit, danach flott).
- Die Allowlist-Lücke aus dem Code-Review ist **bestätigt**: Sie filtert nur den Instrumente-Tab. Im Lernen-Quiz und in den Fortschrittszahlen erscheinen Fragen zu nicht angebotenen Instrumenten (SQL, UML, ER-Modell, Normalformen, SWOT, Eisenhower, Ablaufstrukturen, Teststufen). Mittel.
- Der Code-Review-Befund zur **Mischmodus-Queue ist bestätigt** und das wichtigste Ergebnis: In der gemischten Lernrunde kommen Fragen mehrfach wieder (eine falsch beantwortete Lückenfrage 5-mal in einer Runde, direkt aufeinanderfolgend), **richtig gelöste Reihenfolge- und Zuordnungsfragen kehren zurück**, und in einer Runde mit Themenfilter erscheint eine Frage aus einem anderen Thema. Hoch.
- Der Befund zum **Modal-Fokusverlust ist weitgehend widerlegt**: Pause-Dialog und Einstellungen halten den Fokus (Fokusfalle, Escape, Rückgabe an den Auslöser bzw. das vorherige Element). Nur Kleinigkeit: Nach „Einstellungen" geht der Fokus beim Schließen auf den Tab „Instrumente" statt auf das Benutzermenü (Niedrig).
- **Mathematik 9:** Inhaltlich vorhanden (Theorie, 210 Items), aber dünn (nur 3 Fachgebiete, keine Instrumente, keine Spiele, keine Reihenfolge-/Wahr-Falsch-Fragen) und der Prüfungs-Tab ist ein IHK-Text (siehe UXT-I-10). **Jugendschutz:** Minderjährige können sich derzeit gar nicht registrieren (`ALLOW_MINORS=false`, F-159), der Eltern-Consent-Flow ist deshalb für Teilnehmende nicht erreichbar; das ist lückenlos, aber die Kommunikation (Startseite wirbt mit „Klassenarbeit", Kurs „Klasse 9" ist nur für Volljährige nutzbar) ist widersprüchlich.
- Schulnoten (1 = sehr gut): Anwendungsentwicklung 2,5, Daten- und Prozessanalyse 2,0, Digitale Vernetzung 2,0, Systemintegration 2,0, Mathematik 9: 3,5.

## Registrierung und Kurswahl (kursübergreifend)

- Registrierung funktioniert (Name optional, E-Mail, Passwort, Geburtsdatum; klarer Hinweis „nur Volljährige"). Danach Banner „Bitte bestätige deine E-Mail-Adresse … Erneut senden".
- Kursauswahl: 16 Karten mit Filter „Alle / Erwachsenenbildung / Schule" und Suchfeld; darunter „Demo-Kurs (Platzhalter-Content)" (UXT-I-12).
- Kurswechsel bei Weiterbildungskursen: sauberer Dialog „Kurs wechseln?" mit Hinweis auf die Ein-Kurs-Regel (F-102). Ein „Kurs verlassen" ohne Wechsel gibt es in der Oberfläche nicht (nur im API); für Lernende nicht nötig.
- Mein erster Klick auf „Beitreten" bei Anwendungsentwicklung landete (vermutlich Layoutverschiebung beim Laden des Banners; ein paralleler Testagent hatte denselben Effekt) in „Transport/Logistik". Nicht reproduzierbar; nur Hinweis.
- Orientierung: Nach dem Beitritt erscheint „Kurz erklärt …" (Lernen / Prüfung / Instrumente / Gaming / Fortschritt) und „Weiter, wo du aufgehört hast". Die **Theorie** wird in diesem Erklärtext nicht erwähnt; sie steckt unter Fortschritt > Fachgebiet aufklappen > „Lesen" und in der Suche (UXT-I-16).

## Kurs 1: Fachinformatiker/in Anwendungsentwicklung

**Getestet:** Beitritt, Startansicht, Theorie (Seitenpanel zu Thema 8.1), Lernen-Tab (gemischte Runde 40 Items: Karteikarten, MC, Entweder-oder, Zuordnung, Reihenfolge, Lückentext frei und mit Wortpool, Kurzantwort), Fortschritt je Fachgebiet und Erfolge, Instrumente-Tab (Schreibtischtest Ausprobieren und Üben, Algorithmen-Visualisierer, Nutzwert/Wirtschaftlichkeit, Testfall-Trainer, Verfügbarkeit/RAID, SQL-Übungsfläche mit Prüfungsmodus und Beiblatt), Suche, Gaming (Bug-Hunt Schleifen, Code-Reihenfolge, Rechen-Sprint Sortieren und Suchen; übrige Spiele nur in der Liste), Prüfungs-Tab (nur angesehen, keine Antworten abgegeben), Dark Mode, mobile Ansicht 375x812, Konsole, Netzwerk, Kontraste, Tastatur.

**Positiv:** Theorie ist gut lesbar (Fallbeispiel Brevanta, gegliedert, ASCII-Diagramme in scrollbaren Codeblöcken, Inhaltsverzeichnis). Quiz-Rückmeldungen sind freundlich und enthalten Erklärungen; Lückenfragen nennen die richtige Lösung. Zuordnung und Reihenfolge funktionieren per Klick (Element wählen, Zielfeld wählen). SQL: Ergebnistabelle und „Aufgabe prüfen" gegen die Musterlösung korrekt, Prüfungsmodus blendet Vorschläge aus und zeigt ein selbst erstelltes Syntax-Beiblatt. Bug-Hunt erklärt den Fehler ausführlich. Sechs Werkzeuge ohne Fehler.

**Entwurfsinstrumente:** nirgends sichtbar (Tab, Suche nach „Authentifizierungsfaktor", „Cloudmodell", „Kryptografie": keine Treffer; Quiz-Pool: 412 verschiedene Fragen, kein Entwurfstyp).

**Befunde:** UXT-I-01 bis -09, -16, -17 (siehe Tabelle). **Schulnote: 2,5.**

## Kurs 2: Fachinformatiker/in Daten- und Prozessanalyse

**Getestet:** Kurswechsel, Instrumente-Tab, Prozesskennzahlen, Statistik-Trainer, SQL-Übungsfläche mit Datensatz-Umschalter „Projektdaten / Importdaten (Datenqualität)" (Aufgabe „Mengenabgleich nach dem Import", `SELECT *` auf `kunde_import`), Gaming-Liste, Rechen-Sprint Statistik, Prozess-Reihenfolge (ETL), Begriffe-Duell SQL, Lernen-Tab (ca. 21 Items), Quiz-Pool per API, Tastatur (sichtbarer Fokusring, Pfeiltasten in der Tab-Leiste, Modal-Fokusfalle), Fortschritt.

**Allowlist:** Instrumente und Spiele stimmen mit der Matrix überein (Kern: Gantt, PDCA, Schutzziele, SQL-Gruppen, ER-Modell, Normalformen, BPMN, Analysewerkzeuge, Datenqualität, Skalenniveaus; Werkzeuge: Wirtschaftlichkeit, SQL, Prozesskennzahlen, Statistik, Verfügbarkeit). Keine Entwurfsinstrumente; Quiz-Pool 414 Fragen ohne Entwurfstyp. Importdaten-SQL ist ein Highlight (bewusst „schmutzige" Daten, z. B. Geburtsjahr 1850).

**Befunde:** Im Quiz-Pool stecken UML (3), Teststufen (1), Ablaufstrukturen (1) obwohl nicht im Angebot (UXT-I-02). Wiederholungsschleife (UXT-I-01) schwächer: im ersten Drittel keine Wiederholung. **Schulnote: 2,0.**

## Kurs 3: Fachinformatiker/in Digitale Vernetzung

**Getestet:** Instrumente-Tab, MQTT-Labor (Auftrag 1: Abonnement „werk1/halle2/temp" eingetragen, „Auftrag erfüllt", Protokoll der Simulation sehr verständlich), Energiebedarf-Rechner, Netzwerk-Topologie (13 Szenarien: 3 leicht, 6 mittel, 4 schwer inkl. vier Industrienetz-Szenarien; Adressplan und Prüfaufträge), Terminal-Szenarien (10, `help`, Simulation), Gaming (Troubleshooting-Detektiv Aufgabe 1 von 10, Subnetting-Sprint, Kreuzworträtsel mit zwei Modi, IT-Memory Ports), Lernen-Tab (9 Items), Fortschrittssummen, Quiz-Pool.

**Allowlist:** Kern: Gantt, Risikomatrix, OSI, Schutzziele, Teststufen, Automatisierungspyramide, Sensor/Steuerung/Aktor, Industrie-/IoT-Protokolle, Zonenkonzept IT/OT, Subnetting, Terminal, Topologie, Wirtschaftlichkeit, Verfügbarkeit, Energie, Skalierung/Modbus, MQTT-Labor, Flag-Rätsel; Grundlagen: PDCA, PSP, Scrum, Netzplan, Algorithmen, Schreibtischtest. Keine SQL-/UML-/ER-Kachel. Keine Entwurfsinstrumente (406 Fragen geprüft; die 12 inaktiven Entwurfsfragen sind nicht in der Fortschrittssumme).

**Befund:** Quiz-Pool enthält SQL (3), UML (1), Normalformen (3), ER (1), Ablaufstrukturen (3), SWOT (1) (UXT-I-02). Die korrekt gelöste Reihenfolge-Frage „Netzerweiterung" kam nach wenigen Items erneut (UXT-I-01). **Schulnote: 2,0.**

## Kurs 4: Fachinformatiker/in Systemintegration

**Getestet:** Instrumente-Tab, Netzwerk-Topologie (13 Szenarien inkl. der vier neuen: Inter-VLAN, Standortverbund, DMZ-Webserver, redundante Anbindung; Szenario 1 mit „Lösung anzeigen" und „Alle Prüfaufträge testen": didaktisch sehr gute Erklärung), Terminal (12 Szenarien inkl. „Permission denied" und „Cron-Job"), Subnetting-Rechner, Flag-Rätsel (8 Rätsel; Rätsel 1 per Base64 gelöst, Auswertung plus „Was du daraus mitnimmst" gut), Bug-Hunt „Skripte und Konfigurationsdateien" (12 Aufgaben, Bash), Lernen-Tab (14 Items), Prüfungs-Tab (nur angesehen), Quiz-Pool.

**Allowlist:** Kern: Gantt, Risikomatrix, OSI, Schutzziele, Teststufen, Sicherungsarten, RAID-Level, Netzwerksicherheits-Bausteine, Switching/VLAN/Routing, Subnetting, Terminal, Topologie, Wirtschaftlichkeit, Verfügbarkeit, Flag-Rätsel; Grundlagen: PDCA, PSP, Scrum, Netzplan, Algorithmen, Schreibtischtest. Keine Entwurfsinstrumente (404 Fragen geprüft, 19 inaktive Entwurfsfragen). Eine normale Wahr/Falsch-Frage im Quiz spricht „Verzeichnisdienst" an (Authentifizierung vs. Autorisierung) — regulärer Kursinhalt, kein Entwurfstyp.

**Befund:** Im Lernen-Quiz erschien tatsächlich eine SQL-Frage (HAVING statt WHERE); im Pool liegen UML (2), ER (2), Normalformen (2), SWOT (1), Eisenhower (1) (UXT-I-02). Bei Kurzantworten mit Zahl (Prozent) erscheint der Hinweis „War deine Antwort trotzdem sinngemäß richtig … bitte über Fehler melden", der bei reinen Zahlenantworten irreführend wirkt. **Schulnote: 2,0.**

## Kurs 5: Mathematik, Klasse 9 (bundeslandneutral)

**Getestet:** Beitritt als Volljährige (möglich), Startansicht, Instrumente-Tab, Gaming-Tab, Fortschritt (3 Fachgebiete), Theorie (Thema Wurzeln), Lernen-Tab (ca. 25 Items: Karteikarten, Lückentext frei, Kurzantwort, Zuordnung), Prüfungs-Tab (nur angesehen: Unter-Reiter Präsentation, Fachgespräch, Gelassen bleiben), Quiz-Pool per API, Jugendschutz: Registrierung mit Geburtsdatum 2011 (Wegwerf-Adresse, kein Konto entstanden), öffentliche Seiten `/datenschutz-kinder`, `/consent/confirm`, `/parent`.

**Beobachtungen:**
- Theorie ist verständlich geschrieben, Formeln stehen als Unicode-Text (√, ², ⁻², ℝ), kein Formelsatz; Brüche als „a / b". Für Klasse 9 ausreichend, aber „3⁻² als Bruch" lässt offen, welche Schreibweise („1/9", „1 / 9") akzeptiert wird (Toleranz der Kurzantwort nicht systematisch getestet).
- Umfang: nur 210 aktive Items (Algebra & Funktionen 90, Geometrie 90, Stochastik 30), Quiz-Typen nur Lückentext, Kurzantwort, Zuordnung, MC; keine Reihenfolge-, Wahr/Falsch- oder Mehrfachauswahl-Fragen.
- Instrumente-Tab und Spiele-Tab: „Für diesen Kurs gibt es derzeit keine Instrumente und Werkzeuge." bzw. „… keine Spiele." (UXT-I-11). Kein Rechen-Sprint, kein Bug-Hunt für Mathe.
- Prüfungs-Tab ist auf IHK-Prüfungen ausgelegt (UXT-I-10).
- Wiederholung geloester Fragen (UXT-I-01) auch hier: Dieselbe falsch beantwortete Lückenfrage („Vierfeldertafel") direkt zweimal hintereinander; die richtig gelöste Strahlensatz-Zuordnung kam erneut.

**Jugendschutz-Bewertung:** Der Flow ist aus Sicht von Teilnehmenden **lückenlos, weil er gar nicht erreichbar ist**: `auth.publicConfig` liefert `minorsAllowed:false`; das Registrierungsformular zeigt bei einem Geburtsdatum unter 18 sofort „Wir können dich leider noch nicht aufnehmen: edukedo steht aktuell nur Volljährigen offen" und deaktiviert „Registrieren"; auf der API-Seite wird vor jeder Kontoanlage abgelehnt (kein Konto, keine Eltern-Mail). Der Eltern-Consent-Flow selbst (`/consent/confirm`, `/parent`) ist erreichbar, aber ohne Token bzw. Login leer („Kein Bestätigungs-Token in der URL gefunden.", Eltern-Login). Er konnte deshalb nicht Ende zu Ende getestet werden; lokal werden ohnehin keine Mails verschickt. Auffälligkeiten: UXT-I-13.

**Schulnote Mathematik 9: 3,5** (Inhalt gut, aber dünn und ohne Werkzeuge/Spiele, Prüfungs-Tab unpassend; Teilnahme für die eigentliche Zielgruppe derzeit nicht möglich).

## Befundtabelle nach Schwere

Schweregrade: Blocker = Verstoß gegen Freigaberegeln oder Datenverlust; Hoch = Kernfunktion falsch; Mittel = deutliche Hürde oder Inkonsistenz; Niedrig = Politur; Hinweis = Beobachtung ohne Handlungszwang.

### Blocker
Keine.

### Hoch

| ID | Kurs | Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|
| UXT-I-01 | alle (AE, DV, Mathe nachgestellt; DPA schwächer) | Lernen-Tab, gemischte Runde (20 Karten + 20 Quiz), mehrere Fragen falsch und einige richtig beantworten | Erwartet: jede Frage höchstens einmal je Runde, ggf. gezielte Wiederholung falscher Antworten am Ende; Themenfilter strikt. Beobachtet: Dieselbe falsch beantwortete Lückenfrage („Beim ___ … Fischgräte", Ishikawa) kam in einer Runde 5-mal, die WCAG-Frage 3-mal, die Semantic-Versioning-Frage 2-mal; in Mathe die Lückenfrage „Vierfeldertafel" direkt zweimal hintereinander. Richtig gelöste Reihenfolge- und Zuordnungsfragen (AE „Projektdokumentation", DV „Netzerweiterung", Mathe „Strahlensatz") erschienen kurz danach erneut (die AE-Frage ist in der DB eindeutig, kein Duplikat). Die Rundenzählung „40 von 40" enthält die Wiederholungen, Schlussmeldung „7 von 18 Quiz-Fragen richtig" statt 20. In einer neu gestarteten Runde mit Themenfilter „9.3 Versionsverwaltung" erschien eine Frage aus Thema 12.2 (Projektdokumentation). Bestätigt den Code-Review-Befund zur Mischmodus-Queue. | Queue je Runde bei Start leeren, richtig beantwortete Items nie erneut stellen, Wiederholung falscher Antworten begrenzen (max. 1x, mit Abstand), Themenfilter auf Queue und Folgefragen anwenden; Rundenzähler auf distinkte Items beziehen. |

### Mittel

| ID | Kurs | Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|
| UXT-I-02 | AE, DPA, DV, SI | `quiz.quizItems` abfragen bzw. Lernen-Tab; Instrumente-Tab vergleichen | Erwartet: Quiz bietet nur Inhalte der freigegebenen Instrumente. Beobachtet: Die Allowlist (KURS_ANGEBOT) filtert nur den Instrumente-Tab. Im Quiz-Pool und in den Fortschrittssummen stehen u. a. SWOT und Eisenhower (AE, DV, SI), UML, Teststufen und Ablaufstrukturen (DPA), SQL, UML, ER, Normalformen, Ablaufstrukturen (DV, SI); im Lernen-Quiz erschien eine SQL-Frage in Systemintegration. Entwurfstypen sind korrekt **nicht** enthalten (inaktiv). Bestätigt den Code-Review-Befund ohne Blocker-Wirkung. | `quizItems`, Fortschritt (`progress.overview`, `courses.progress`) und Prüfungssimulation ebenfalls über `kurs.metadata.angebot` filtern oder Inhalte nicht freigegebener Typen je Kurs deaktivieren; Test ergänzen. |
| UXT-I-03 | alle (mobil) | Viewport 375x812, Startseite | Tab-Leiste „Lernen / Prüfung / Instrumente / Gaming / Fortschritt" ist breiter als der Bildschirm: „Gaming" abgeschnitten, „Fortschritt" nicht sichtbar; „Weiter, wo du aufgehört hast" (3 Karten) und Fortschrittsbalken belegen fast den ganzen ersten Bildschirm. Kein horizontaler Seitenscroll (scrollWidth=375). | Tabs umbrechen oder als untere Navigationsleiste; „Weiter, wo du aufgehört hast" mobil auf eine Karte kürzen oder einklappen. |
| UXT-I-10 | Mathe | Prüfungs-Tab ansehen | Erwartet: Prüfung passend zu Klasse 9. Beobachtet: „Situationsbezogene Fallaufgaben über mehrere Handlungsbereiche hinweg, wie in der schriftlichen IHK-Prüfung", Übungsdauer 30 Min. bis 10 Std., Unter-Reiter Präsentation („Prüfungskommission", Flipchart), „Fachgespräch: Keine Fachgesprächsfragen für diesen Kurs verfügbar.", „Gelassen bleiben: … Prüfungsordnung deiner Kammer bzw. … Einladung … deiner IHK". Für eine Schulklasse unpassend. | Prüfungs-Tab je Kurskategorie ausblenden oder auf „Klassenarbeit" zuschneiden (Dauer 45 Min., keine Präsentation/Fachgespräch); leere Reiter ausblenden. |
| UXT-I-16 | alle | Neu im Kurs, Theorie lesen wollen | Die Theorie ist nicht auf dem Lernen-Tab, nicht im „Kurz erklärt"-Text und nicht im Instrumente-Tab zu finden, sondern nur unter Fortschritt > Fachgebiet aufklappen > „Lesen" oder über die Suche. Der Hinweis dort spricht nur von „gezielt weiterlernen". Das Seitenpanel bleibt danach über alle Tabs offen. | „Theorie lesen" im Lernen-Tab und in „Kurz erklärt" verankern; in „Weiter, wo du aufgehört hast" einen Link „Theorie dazu" anbieten. |
| UXT-I-17 | AE (Stichprobe Git-Bereiche) | Instrumente > Kachel „Git-Bereiche" > „Zu diesem Instrument lernen" | Erwartet (Intro-Text: „erst ein Wissenstest per Quiz, danach die praktische Anwendung am Instrument selbst"): Zonen-Aufgabe des Instruments. Beobachtet: Es startet eine Lernrunde „Gefiltert: 9.3 — Versionsverwaltung" (20 Karteikarten + 16 Quiz-Fragen), die mit einer Karteikarte beginnt; die Zonen-Frage zum Instrument ist nicht gezielt erreichbar (nicht abschließend geprüft). | Kachel führt direkt zur Instrument-Frage; sonst Beschriftung und Intro-Text anpassen. |

### Niedrig

| ID | Kurs | Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|
| UXT-I-04 | alle | Gaming > Rechen-Sprint (jedes Set) | Beschreibung lautet „10 Aufgaben, jede ist neu zufällig erzeugt. Ein einfacher Taschenrechner ist erlaubt. — und prüfe jede Antwort sofort." Satzfragment (Quelle: apps/web/src/WeitereSpiele.tsx Zeile 746). | Satz für rechensprint ohne „— und …" formulieren. |
| UXT-I-05 | alle | Fortschritt > Erfolge direkt nach den ersten Antworten | Banner „Neues Achievement freigeschaltet: Erster Schritt, Fleißig dabei", aber die Kacheln zeigen beide noch „Noch nicht erreicht" (Klasse tile-locked); erst nach Neuladen „Erreicht am 8.10.2026". | Achievements-Abfrage nach `checkAndAward` invalidieren. |
| UXT-I-06 | AE (alle Zuordnungsfragen) | Zuordnung falsch beantworten („2 von 4 Zuordnungen richtig") | Falsche Kästen nur rot/grün gefärbt; die richtige Lösung wird nicht genannt, keine Erklärung. Farbe als einziger Hinweis (Barrierefreiheit). Lückenfragen nennen die Lösung. | Richtige Zuordnung als Text ausgeben, Symbol/Text zusätzlich zur Farbe. |
| UXT-I-07 | alle | Fortschritt > Fachgebiet > „Lesen" | Theorie-Panel bleibt beim Tabwechsel offen und verdrängt Inhalt; Schließen-Button heißt „Theorie schließen" (aria), sichtbar „Schließen ✕". Codeblock „V-Modell" ist abgeschnitten und nur horizontal scrollbar (Breite 492 px in 410 px). | Codeblöcke kleiner setzen oder Umbruch anbieten; Panel beim Tabwechsel schließen oder Hinweis anzeigen. |
| UXT-I-08 | alle | Startseite (Gast), Konsole/Netzwerk | Konsole: mehrere `TRPCClientError: UNAUTHORIZED` (401) beim Laden als Gast; je Antwort in der Lernrunde 5 Folgeabfragen (`content.dueCards, progress.suggestions, gamification.mascotStatus, auth.me, gamification.streakStatus`) — gesprächig. Sonst keine fehlgeschlagenen Aufrufe außer dem erwartbaren 409 beim Kurswechsel-Test. | 401 für Gäste leise behandeln; Abfragen gezielter invalidieren. |
| UXT-I-12 | alle | Kursauswahl | „Demo-Kurs (Platzhalter-Content)" (Kategorie „Sonstige") ist für Lernende beitretbar. | Nur in Dev/Admin zeigen oder `is_published=false`. |
| UXT-I-13 | Mathe / Jugendschutz | Startseite, Registrierung, `/datenschutz-kinder` | Startseite wirbt mit „… bis zur Klassenarbeit" und einer Mathe-Karteikarte, das Formular lehnt Minderjährige ab; der Kurs „Klasse 9" wird Erwachsenen ohne Altershinweis angeboten. `/datenschutz-kinder` ist über URL erreichbar und enthält Entwurfsvermerk und interne Formulierung („laut Entwicklungsplan (Iteration 0, Organisatorisches) noch nicht eingerichtet"), spricht von „unter 16", während die App alle unter 18 ablehnt. | Startseite und Kursbeschreibung an den Ist-Stand anpassen (z. B. „Schulkurse starten, sobald die Eltern-Einwilligung freigeschaltet ist"); interne Hinweise aus der Kinder-Datenschutzseite entfernen oder die Seite bis zur Freigabe ausblenden. |
| UXT-I-14 | AE, DPA, DV, Mathe | Setting „Fachbegriffe nach der Antwort markieren" | Das Glossar ist nur in Systemintegration gefüllt (157 Einträge per `glossar.list`); in AE, DPA, DV und Mathe liefert die Abfrage 0 Einträge, die Einstellung bewirkt dort nichts. Es gibt keine eigene Glossar-Ansicht zum Nachschlagen. | Glossar je Kurs füllen oder Einstellung kursbezogen ausblenden; Glossar-Ansicht erwägen. |
| UXT-I-15 | alle | Benutzermenü > Einstellungen, Escape | Fokus wandert beim Schließen auf den Tab „Instrumente" (vorheriger Fokus) statt zum Benutzermenü-Auslöser, weil das Menü beim Öffnen des Modals verschwindet. Pause-Dialog der Lernrunde gibt den Fokus korrekt zurück. | Auslöser-Referenz vor dem Schließen des Menüs merken oder Menü-Button als Fokusziel setzen. |

### Hinweis

| ID | Kurs | Beobachtung |
|---|---|---|
| UXT-I-09 | alle | Über der Frage im Lernen-Tab liegt ein leerer Bereich (ca. 100–150 px), die Frage steht in einer schmalen, zentrierten Spalte; „Kurz erklärt" erscheint auf der Startansicht und auf jeder Werkzeugseite, solange „Verstanden" nicht geklickt ist (auch im Werkzeug, wo es stört). |
| UXT-I-11 | Mathe | Instrumente-Tab: Intro-Text spricht weiter von „Fortgeschritten-Funktionen, siehe unten", obwohl der Kurs keine Instrumente hat („Für diesen Kurs gibt es derzeit keine Instrumente und Werkzeuge."); Spiele-Tab: „keine Spiele", dafür ganze Freundeskreis-/Kohorten-/Duell-Bereiche (u. a. „Meine Kohorten (als Dozent:in)") auf der Lernenden-Seite. |
| UXT-I-18 | alle | Die Primärfarbe der Aktionen (rot-orange, z. B. „Antwort prüfen", „Neue Runde starten") ist dieselbe wie bei der destruktiven Aktion „Runde verwerfen"; der deaktivierte „Antwort prüfen"-Button (Deckkraft 0,55) wirkt fast wie aktiv. Kontrast der Fließtexte ist gut (Grautext 5,3:1, Haupttext 15,5:1). |

## Kursübergreifende Auffälligkeiten und Vergleich

- **Gemeinsame Teile:** Die vier FI-Kurse teilen Theorie- und Quizbausteine (übereinstimmende Fachgebiete: Projekt- und Auftragsabwicklung, IT-Systeme/Arbeitsplatz, Netzwerke und IT-Betrieb, Programmierung, Datenbanken, IT-Sicherheit, Wirtschafts- und Sozialkunde) und die Gruppe „Grundlagen (gemeinsamer Teil 1)". Dieselben Befunde (UXT-I-01, -02, -04, -05, -07) treten in allen vier Kursen auf. In jedem FI-Kurs steht das Quiz-Material zu SWOT, Eisenhower, SQL, UML usw. unabhängig vom Angebot im Pool.
- **Unterschiede:** AE hat Entwicklungswerkzeuge (Schreibtischtest, Algorithmen, Testfälle, SQL, Bug-Hunt, Code-Reihenfolge); DPA hat Statistik, Prozesskennzahlen und SQL mit Importdaten; DV hat MQTT-Labor, Skalierung, Energie, Industrienetz-Szenarien und Troubleshooting; SI hat Topologie mit Inter-VLAN/DMZ/Redundanz, Terminal mit Rechten und Cron, Bug-Hunt Skripte und Konfigurationen. Alle Allowlists werden im Instrumente- und Spiele-Tab exakt eingehalten; im Terminal-, Topologie- und Flag-Werkzeug werden die erlaubten Szenarien je Kurs korrekt gefiltert (DV 10 Terminal-Szenarien, SI 12; Topologie je 13 mit unterschiedlichen Schwer-Szenarien).
- **Prüfungs-Tab:** In den FI-Kursen mit passenden Prüfungsbereichen und Dauer (z. B. „Teil 2 · 90 Min.", „Wirtschafts- und Sozialkunde 60 Min."); in Mathe nicht passend (UXT-I-10).
- **Ladezeiten:** SQL-Worker 2–4 s bis zur Eingabe, danach Ergebnis sofort; Werkzeug-Chunks laden lazy (MQTT-Labor braucht ca. 1,5 s). Keine auffälligen Ladeprobleme.
- **Dark Mode:** Instrumente-Tab mit Illustrationen und Kacheln gut lesbar; keine Darstellungsfehler festgestellt.
- **Tastatur (zwei Stichproben):** (1) Tab-Reihenfolge mit Sprunglink „Zum Hauptinhalt springen", Fokusring 2 px solid sichtbar; (2) Pfeiltasten in der Tab-Leiste wechseln den Tab, Modal hat Fokusfalle (40 Tab-Schritte bleiben im Dialog) und Escape schließt. Karteikarte: Vorderseite hat tabindex 0 und reagiert auf Enter/Leertaste (nur im Code geprüft).
- **Rechtschreibung:** Keine Fehler in den gelesenen Texten; Auffälligkeit nur der Satz in UXT-I-04.
- **Entwurfsinstrumente (Wichtig):** In keinem der vier FI-Kurse sichtbar; weder Instrumente-Tab, Suche (z. B. „Authentifizierungsfaktor", „Kryptografie", „Cloudmodell": keine Treffer), Quiz-Pool, Fortschrittsprozente noch Spiele. Nur reguläre Karteikarten/Fragen zu verwandten Begriffen (z. B. „Zwei-Faktor" im Schutzziele-Instrument, „Verzeichnisdienst" als Wahr/Falsch-Frage) sind da und gehören nicht zum Entwurfsbestand.

## Nicht getestet / Grenzen

- Prüfungssimulation: nur angesehen, keine Antworten abgegeben, nicht gestartet (Vorgabe).
- Nicht durchgespielt: Bug-Hunt-Sets Objektorientierung und SQL-Fehler, Phishing-Detektiv, Kennzahlen-Duell (außer Duell-Start SQL in DPA), Kreuzworträtsel (nur Startseite), IT-Memory (nur Start), Zahlensystem-Sprint, Prozess-Reihenfolge (nur Start), Troubleshooting-Detektiv (nur Aufgabe 1 gelesen), Daten-Detektiv (nicht im Angebot, wie vorgesehen). Instrumente mit Zonen-Zuordnung (Gantt, PSP, Scrum, UML, ER, …) nur über die Kachel „Git-Bereiche" probiert.
- Werkzeuge nur zum Teil bedient: Algorithmen-Visualisierer, Wirtschaftlichkeit, Testfall-Trainer, Verfügbarkeit, Prozesskennzahlen, Statistik, Energie, Subnetting wurden geöffnet und gelesen, aber nicht alle Eingaben durchgerechnet; MQTT-Labor Auftrag 1, Topologie Szenario 1, SQL und Flag-Rätsel 1 wurden tatsächlich gelöst.
- Kurzantwort-Toleranz (z. B. „1/9" vs. „1 / 9") nicht systematisch geprüft; Karteikarten-Tastaturbedienung nur im Code, nicht mit echten Tasten.
- Kein Zugriff auf E-Mails: E-Mail-Bestätigung und Eltern-Consent nicht Ende zu Ende testbar (keine lokale Mailzustellung, Minderjährige gesperrt). Eltern-Dashboard nur als Login-Seite gesehen.
- Mobile Ansicht nur Startseite (375x812); Dark Mode nur Instrumente-Tab; Kontraste nur stichprobenartig im Hellmodus gemessen.
- Netzwerk-Auswertung beschränkt auf die zuletzt gepufferten Anfragen (alle sichtbaren 200 OK).
- Eigene Klickfehler beim ersten Kursbeitritt (siehe oben) nicht reproduzierbar; andere Agenten testeten parallel mit eigenen Konten.
