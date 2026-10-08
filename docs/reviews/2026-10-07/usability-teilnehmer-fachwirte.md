# Usability-Test Teilnehmer:in — Fachwirt-Kurse

Stand: 2026-10-08. Getestet in der lokalen Dev-Umgebung (Web :5173, API :3001) mit dem eingebauten Browser (Desktop, zusätzlich 375x812 und Dark Mode). Ein Wegwerf-Konto (`@example.test`), nach dem Test per SQL gelöscht (0 Zeilen übrig, keine verwaisten `user_progress`-Zeilen). Kein Quellcode geändert, nichts committet. In der Prüfungssimulation wurden keine Antworten abgegeben, keine Zahlungs-/Abo-Flows berührt.

## Kurzfazit

Die Fachwirt-Kurse sind inhaltlich und didaktisch ordentlich ausgebaut: verständliche Karteikarten und Fragen mit Erklärung bei jeder Antwort, acht Fragetypen (Single-/Multiple-Choice, Wahr/Falsch, Entweder-Oder, Kurzantwort, Lückentext mit Tippen oder Wortpool, Zuordnung per Auswählen/Ziehen, Reihenfolge), ein sehr guter Finanzrechner und ein Handelskalkulations-Trainer mit Rechenweg und Haftungsabgrenzung („Lernwerkzeug, keine Beratung“, „Eingaben werden nicht gespeichert“). Mobile Ansicht und Dark Mode funktionieren, Tastaturfokus ist sichtbar.

Die größten Probleme für Lernende sind aber keine Inhaltsfragen, sondern Bedienfehler in gemeinsamen Bausteinen, die in **allen** Kursen auftreten und im Browser bestätigt wurden:
1. Notiz-/„Fehler melden“-Dialog: nach dem ersten getippten Zeichen geht der Fokus verloren (UXT-F-01).
2. Einstellungen und „Konto löschen“ (aus dem Header-Menü) schließen sich beim ersten echten Mausklick im Dialog (UXT-F-02).
3. Mischmodus (Karteikarten + Quiz): Fragen wiederholen sich in der Runde, Zähler „x von N“ schrumpft (UXT-F-03).
4. Es gibt keine „Passwort vergessen“-Funktion, obwohl F-02 sie als Muss verlangt (UXT-F-04).

Kursübergreifend fällt auf: Aufbau und Umfang sind uneinheitlich (Spiele: 6/6/6/4/0 je Kurs; Instrument-Kacheln führen nicht zum Instrument; Prüfungsablauf überall „noch nicht beschrieben“).

Schulnoten (1 = sehr gut, 6 = ungenügend): Industriefachwirt 2,5 · Technischer Fachwirt 2,7 · Wirtschaftsfachwirt 3,0 · Handelsfachwirt 2,3 · Immobilienfachwirt 3,3. Die Noten würden sich bei Behebung der vier Querschnittsfehler jeweils um etwa 0,5 verbessern.

## Testumgebungs-Hinweis (kein App-Fehler)

Der eingebaute Browser teilt das Cookie-Jar zwischen allen Tabs desselben Hosts. Parallel testende Agenten überschrieben dadurch meine Session (der erste Beitrittsversuch lief kurz im Konto eines anderen Testers: „Du bist bereits in Transport Management … eingeschrieben“). Abhilfe: Zugriff über `http://teilnehmer.localhost:5173` (eigener Cookie-Host, Vite-Proxy `/api` funktioniert). Nur mein eigenes Konto wurde angelegt und gelöscht; fremde Konten (`uxt-teilnehmer-*`) wurden nicht angefasst.

## Kurs 1: Industriefachwirt (Note 2,5)

**Getestet:** Registrierung, Beitritt, Onboarding, 40 Karteikarten (zwei Runden), 14 Quizfragen in 8 Typen, Notiz-/Melden-Dialog, Einstellungen, Pause-Dialog, Theorie-Seitenpanel, Suche, alle 13 Instrument-Kacheln, Finanzrechner (alle 5 Tabs, Fehleingaben), 6 Spiele (Kreuzworträtsel gespielt, Rechen-Sprint 1 Aufgabe, übrige geöffnet), Fortschritt/Erfolge, Prüfung (4 Unterreiter nur angesehen), mobil, Dark Mode, Konsole/Netzwerk.

**Beobachtet:** Karteikarten sind knapp und fachlich nachvollziehbar (Solvitec-Fallbeispiel durchgängig). Theorie öffnet als Seitenpanel nur über „Im Thema nachlesen“ (kein eigener Theorie-Einstieg im Lernen-Tab; in Fortschritt je Thema „📖 Lesen“); Absätze sind lang, Inhaltsverzeichnis (5 Abschnitte, eingeklappt) vorhanden. Quiz-Feedback ist gut (Richtig/Falsch, Erklärung, Motivationssatz); falsche Kurzantworten zeigen die Lösung. Suche funktioniert (Enter), liefert aber Rohsyntax (UXT-F-06). Finanzrechner: Werte nachgerechnet (Zinseszins, Sparplan 32.244,45 €, Annuität 14.072,22 €, Skonto 36,73 %) stimmen; Fehlermeldungen konkret („Das Startkapital muss zwischen 0 und 1 Milliarde Euro liegen“, „Laufzeit … 1 bis 60“); deutsche Zahlenformate (10.000,50) werden akzeptiert. Fortschritt: Trefferquote, Zeitverlauf, Schwachstellen je Thema. Zuordnungsfrage zu „Zeitraum/Beschreibung“ ist missverständlich formuliert (UXT-F-09). Kleinere Befunde: UXT-F-11, -12, -13, -14, -15, -16.

## Kurs 2: Technischer Fachwirt (Note 2,7)

**Getestet:** Beitritt (Wechsel über „Weiteren Kurs beitreten“ erst nach „Verlassen“), 15 Quizfragen (MC, Wahr/Falsch, Entweder-Oder, Kurzantwort, Lücke, Zuordnung), Mischmodus, 12 Instrument-Kacheln, Theorie (10.1 Qualitätsmanagement), Spiele, Fortschritt/Erfolge, Prüfung (Gelassen bleiben, Schriftlich).

**Beobachtet:** Fachlich stimmige Fragen (Werkvertrag § 631, GWB, DIN 8580, Presspassung); viele Entweder-Oder-Fragen („Erfasst die Sensorik … oder setzt sie Steuerbefehle um?“) sind sehr leicht. Instrument-Kacheln landen in Themen, in denen die erste Frage nichts mit dem Instrument zu tun hat (SWOT -> „7.4 Automatisierungstechnik“, Gantt und Projektstrukturplan -> beide „8.3 Logistikprozesse“, UXT-F-05). Mischmodus bestätigt wiederholte Frage und schrumpfenden Zähler (39 -> 38 -> 37, dieselbe Qualitätsfrage in Schritt 1 und 4; UXT-F-03). Ishikawa-Kachel heißt hier „(6M)/Milieu“, im Industriefachwirt „(Ursachenkategorien)/Mitwelt“ (UXT-F-18). Fortschritt: „Die 1 Themen mit der niedrigsten Trefferquote“ (UXT-F-15). Prüfungsablauf nicht beschrieben (UXT-F-08).

## Kurs 3: Wirtschaftsfachwirt (Note 3,0)

**Getestet:** Beitritt, 12 Mischmodus-Schritte (Karten, Wahr/Falsch, Zuordnung, Wortpool), 8 Instrument-Kacheln, Spiele, Beleg-Detektiv (Aufgabe 1 komplett), Fachgespräch, Präsentation, Gelassen bleiben.

**Beobachtet:** Nach dem Kurswechsel landet man auf dem zuletzt genutzten Tab (hier Fortschritt) statt im Lernen; die Onboarding-Banner („Kurz erklärt“) erscheinen erneut. Nur 4 Spiele (kein Kreuzworträtsel, kein Memory; UXT-F-07). Beleg-Detektiv hat sehr gutes, differenziertes Feedback („Erkannt“/„Übersehen“, Rechenweg). Rechtsfragen (§ 15 HGB, §§ 370/378 AO) mit Paragrafenbezug in der Erklärung — gut. Fachgespräch-Fragen vorhanden („Frage 1 von 20 · 2.2 Kostenrechnung“). Kein Rechtswerkzeug jenseits des Finanzrechners.

## Kurs 4: Handelsfachwirt (Note 2,3)

**Getestet:** Beitritt, 12 Mischmodus-Schritte (Multi-Select, Reihenfolge, Wahr/Falsch, Kurzantwort, Karten), 11 Instrument-Kacheln plus zwei Trainer, Handelskalkulation-Trainer (Fehleingabe, Teilrichtig, Lösung), 6 Spiele (Liste), Prüfung/Gelassen bleiben.

**Beobachtet:** Umfang und Werkzeugangebot am besten: Handelskalkulations-Trainer (Vorwärts-/Rückwärts-/Differenzkalkulation, „Ohne Umsatzsteuer“, Rundungshinweis, Eingaben „nicht gespeichert“, Zahlenfelder mit `inputmode=decimal`), Lagerkennzahlen-Rechner, Kraljic-, ABC-, XYZ-Kacheln. Die Beispielrechnung ist korrekt (Selbstkosten 288,60 €, LVP 404,92 €). Falsch markierte Felder zeigen ✗ und „2 von 3 richtig“; leeres „Prüfen“ gibt keine Rückmeldung (UXT-F-12). Im Mischmodus erschien die Reihenfolge-Frage „ABC-Analyse“ als Frage 2 und erneut als Frage 4 (UXT-F-03). Benennung doppelt: Kachel „Handelskalkulation“ (Zuordnung) und „Handelskalkulation-Trainer“ (UXT-F-18). Begriff „Pennerliste“ (Handelsjargon) steht ohne Einordnung als Lösungswort.

## Kurs 5: Immobilienfachwirt (Note 3,3)

**Getestet:** Beitritt, 10 Mischmodus-Schritte (Karte, Zuordnung, Lücke, Multi-Select, Wahr/Falsch), Instrument-Kacheln (8 + Netzplan-Trainer + Finanzrechner), Netzplan-Trainer, Spiele, Prüfung/Gelassen bleiben, Suche.

**Beobachtet:** Spiele-Tab leer: „Für diesen Kurs gibt es derzeit keine Spiele.“ (UXT-F-07). Rechtsnahe Lückenfragen (Bestellerprinzip, § 34 BauGB, Betriebskostenabrechnung 12 Monate) sind inhaltlich gut; die Lösung „zwölf“ ist in der DB nur als Wort hinterlegt (`accepted: ["zwölf"]`), die Antwort „12“ würde nach Code/DB voraussichtlich als falsch gewertet (nicht im Browser verifiziert, UXT-F-19). Suche zeigt hier die Lösung im Treffer (`___zwölf___`, UXT-F-06). Es gibt kein immobilienspezifisches Werkzeug (Rendite, Beleihung, Wertermittlung nur als Zuordnungsfrage); der Finanzrechner trägt Disclaimer und „nicht gespeichert“, aber kein Datum/„Stand“ (für Finanzmathematik unkritisch, bei Rechts-/Steuerwerten wäre ein Stand nötig, es gibt aber keinen solchen Rechner).

## Befundtabelle

Schweregrade: Blocker / Hoch / Mittel / Niedrig / Hinweis. Kurs-Kürzel: IFW Industrie, TF Technischer, WiFW Wirtschaft, HFW Handel, ImmoFW Immobilien, alle = kursübergreifend.

| ID | Schwere | Kurs | Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|---|
| UXT-F-01 | Hoch | alle | Karteikarte/Frage -> „Notiz“ oder „Fehler melden“ -> Tasten einzeln tippen („a b c“) | Eingabe läuft durch. Beobachtet: Dialog fokussiert beim Öffnen kein Feld; nach dem 1. Zeichen springt der Fokus auf das Dialog-DIV, nur „a“ kommt an (bestätigt WEB-02; Text-am-Stück-Eingabe maskiert den Fehler) | Modal darf Fokus nur beim Öffnen setzen (Autofokus auf erstes Feld), nicht bei jedem Re-Render |
| UXT-F-02 | Hoch | alle | Header-Menü -> „Einstellungen“ (oder „Konto löschen“) -> echter Mausklick auf Checkbox/Passwortfeld | Dialog bleibt offen. Beobachtet: Dialog schließt sich beim ersten Klick im Dialog (Menü-Outside-Click-Hook; Menü bleibt zusätzlich hinter dem Dialog sichtbar). Per Skript-Klick scheinbar OK | Modal aus dem Menü-Baum lösen (Portal außerhalb des Click-Outside-Bereichs) und Menü beim Öffnen schließen |
| UXT-F-03 | Hoch | TF, HFW (alle mit Mischmodus) | Einstellungen: Karteikarten + Quiz -> Lernen, Karten bewerten | Jede Frage einmal je Runde, Zähler konstant. Beobachtet: Zähler 39 -> 38 -> 37; dieselbe Quizfrage nach 3 Schritten erneut (TF); „ABC-Analyse“-Reihenfolge als Frage 2 und 4 (HFW); Beschriftung „20 Quiz-Fragen im Mix“ vs. „19 Quiz-Fragen“ (bestätigt WEB-05) | Queue einmal je Runde aufbauen, wie in `Flashcards.tsx` |
| UXT-F-04 | Hoch | alle | Login-Maske ansehen | „Passwort vergessen“ (F-02, Muss). Beobachtet: nirgends in der UI (Login/Registrierung/Menü), keine Fundstelle im Web-Code | Reset-Flow ergänzen oder F-02 im Katalog als offen kennzeichnen |
| UXT-F-05 | Mittel | alle | Instrumente -> „Zu diesem Instrument lernen“ | Direkt zum Instrument. Beobachtet: Start eines Themen-Quiz bzw. Mischmodus, erste Frage ohne Bezug (IFW: SWOT -> 7.1, Instrument erst Frage 6; TF: SWOT -> „Automatisierungstechnik“, Gantt und Projektstrukturplan -> beide „Logistikprozesse“; HFW: ABC-Kachel -> Karte „Bestellrhythmusverfahren“). Mehrere Kacheln teilen dasselbe Thema. Intro verspricht „erst Quiz, danach praktische Anwendung“ und „Lernpfad … siehe unten“ — unten steht nichts dazu | Einstieg direkt auf die Instrument-Frage (Item-Filter) oder Kachel-Text ehrlich beschreiben; Lernpfad-Hinweis nur zeigen, wenn Lernpfade sichtbar sind |
| UXT-F-06 | Mittel | IFW, ImmoFW | Instrumente -> Suche „Kapitalwert“ / „Betriebskostenabrechnung muss dem Mieter“ | Treffer als lesbarer Text ohne Lösung. Beobachtet: Lückentext erscheint roh mit Lösung (`___Kapitalwert___`, `___zwölf___`) | Marker in der Suchvorschau entfernen und Lösung ausblenden („…“) |
| UXT-F-07 | Mittel | alle (Vergleich) | Gaming-Tab je Kurs | Gleichartiges Spieleangebot. Beobachtet: IFW 6, TF 6, HFW 6, WiFW 4 (kein Kreuzworträtsel/Memory), ImmoFW 0 („derzeit keine Spiele“) | Mindestangebot je Kurs definieren oder Reiter bei 0 Spielen ausblenden |
| UXT-F-08 | Mittel | alle | Prüfung -> „Gelassen bleiben“ | Kursspezifischer Prüfungsablauf. Beobachtet: überall „Für diesen Kurs ist der Prüfungsablauf hier noch nicht beschrieben“ | Texte je Kurs ergänzen (Inhalt braucht fachliche Freigabe) |
| UXT-F-09 | Mittel | IFW | Zuordnung „Ordne den Begriff dem passenden Zeitraum bzw. der passenden Beschreibung zu“ | Eindeutige Aufgabe. Beobachtet: verschiebbar sind Beschreibungen, Ziele sind Begriffe — Wortlaut verdreht; bei falschen Zuordnungen nur rote Markierung, richtige Lösung wird nicht gezeigt (Reihenfolge-Fragen zeigen sie) | Wortlaut präzisieren; bei Falschantwort richtige Zuordnung einblenden |
| UXT-F-10 | Niedrig | alle | Wahr/Falsch, Entweder-Oder anklicken | Wie bei MC mit „Antwort prüfen“. Beobachtet: sofortige, endgültige Wertung beim Klick (Fehlklick nicht korrigierbar); inkonsistent zu MC | Einheitlich bestätigen oder bewusst als Schnellmodus kennzeichnen |
| UXT-F-11 | Niedrig | IFW (alle mit Rechen-Sprint) | Gaming -> Rechen-Sprint | Ein vollständiger Satz. Beobachtet: „…Ein einfacher Taschenrechner ist erlaubt. — und prüfe jede Antwort sofort.“ (Satzfragment im Quelltext) | Text korrigieren |
| UXT-F-12 | Niedrig | alle | Quiz-Kurzantwort, Rechen-Sprint, Handelskalkulation | Enter sendet, leere Eingabe gibt Hinweis. Beobachtet: Quiz-Kurzantwort/Lücke: Enter sendet nicht (Button `type=button`; Sprint: Enter geht); leeres „Prüfen“ (Sprint, Kalkulationstrainer) ohne Rückmeldung; Sprint-Feld ohne `inputmode=decimal` (Trainer hat es) | Formular-Submit vereinheitlichen; Hinweis bei leerem Feld |
| UXT-F-13 | Niedrig | alle | Kursliste -> „Verlassen“ | Rückfrage, Hinweis auf Fortschritt. Beobachtet: sofortiges Verlassen ohne Bestätigung (Fortschritt bleibt in der DB erhalten, wird aber nicht gesagt); Einzelbelegung bei Weiterbildungskursen wird nur bei Beitritt erklärt | Bestätigungsdialog mit „Fortschritt bleibt erhalten“ |
| UXT-F-14 | Niedrig | alle | Einstellungen -> Abo; Kursliste | Nutzertexte ohne interne IDs. Beobachtet: „KI-Bewertung deiner Fallaufgaben (F-70) und … Lernpfade (F-129)“; „Zahlungsdienst gerade nicht erreichbar — zuletzt bekannter Stand:“ mit leerem Rest (Dev); „Demo-Kurs (Platzhalter-Content)“ in der Kursliste | IDs entfernen, Demo-Kurs für Lernende ausblenden, Fallback-Text prüfen |
| UXT-F-15 | Niedrig | TF, IFW | Fortschritt | Korrekte Grammatik/Bedeutung. Beobachtet: „Die 1 Themen mit der niedrigsten Trefferquote“; ein Thema mit 81 % wird als Schwachstelle gelistet; „1 % (1/105)“ ohne Erklärung der Metrik | Pluralformen; Schwelle für „Schwachstelle“; Metrik erläutern |
| UXT-F-16 | Niedrig | alle | Prüfung -> Schriftliche Prüfung | Deutsche Dezimalschreibung, sinnvolle Dauern. Beobachtet: „1.5 Std.“ und „10 Std.“ | „1,5 Std.“; 10 Std. begründen/entfernen |
| UXT-F-17 | Niedrig | alle | Seite neu laden (eingeloggt) | Kein Flackern. Beobachtet: Landingpage blitzt kurz auf, bevor die App erscheint; Konsole: 3x `TRPCClientError: UNAUTHORIZED` (Auth-Probe vor Login) | Ladezustand statt Landingpage; Probe still behandeln |
| UXT-F-18 | Hinweis | alle (Vergleich) | Instrument-Namen vergleichen | Einheitliche Begriffe. Beobachtet: Ishikawa „(Ursachenkategorien)/Mitwelt“ (IFW) vs. „(6M)/Milieu“ (TF); HFW: „Handelskalkulation“ (Zuordnung) und „Handelskalkulation-Trainer“; Handelsjargon „Pennerliste“ | Benennungen abstimmen |
| UXT-F-19 | Hinweis | ImmoFW | Lückentext „… spätestens ___ Monate …“ | „12“ wird akzeptiert. Beobachtet (DB/Code, nicht im Browser): nur `["zwölf"]` akzeptiert, keine Zahl-Normalisierung | `accepted` um Ziffernvarianten ergänzen oder Normalisierung im Server |
| UXT-F-20 | Hinweis | alle | Erststart, Kurswechsel, Mobil | Orientierung beim ersten Kurs. Beobachtet: Beitritt ohne Bestätigung, direkt in die Quizrunde (letzter Lernmodus); beim Kurswechsel Landung auf dem zuletzt offenen Tab, „Kurz erklärt“-Banner erscheint erneut; Jargon „Punktehamster/Creditstand“ nur im Banner erklärt; mobil: Tab-Leiste scrollt horizontal („Fortschritt“ verdeckt) | Onboarding nur einmal; beim neuen Kurs auf „Lernen“; Scroll-Hinweis |
| UXT-F-21 | Hinweis | alle | Quiz-MC mit Screenreader/ARIA | Auswahlzustand semantisch. Beobachtet: `.quiz-opt` ohne `role=radio/checkbox` und ohne `aria-pressed`; Checkbox „Nur schwierige Karten“ mit zugänglichem Namen „on“ | ARIA-Rollen ergänzen |
| UXT-F-22 | Hinweis | alle | Karteikarte bewerten | Klare Begriffe. Beobachtet: Bewertung „Schwer/Mittel/Einfach“ und daneben „Schwierig“ (Stern) neben „Weiter“ — leicht zu verwechseln; Karteikarten füllen den Belohnungszähler nicht (nur Quiz) | Benennung trennen; Hinweis zum Zähler |
| UXT-F-23 | Hinweis | alle | Kursliste | Kurzbeschreibung/Umfang je Kurs. Beobachtet: nur Titel und Kategorie; Überschrift „Weiteren Kurs beitreten“ auch ohne belegten Kurs | Kurz-Teaser (Themenzahl) ergänzen |
| UXT-F-24 | Hinweis | Testumgebung | Parallele Tabs | — Beobachtet: gemeinsames Cookie-Jar überschreibt Sessions anderer Agenten | Für künftige Paralleltests eigene Hostnamen (`*.localhost`) verwenden |

## Kursübergreifende Auffälligkeiten

- **Gemeinsame Bausteine tragen die schwersten Fehler** (UXT-F-01 bis -03); sie sind kursunabhängig und treffen jede:n Lernende:n.
- **Uneinheitlicher Ausbau:** Instrumente 8 (WiFW/ImmoFW) bis 13 (IFW), Spiele 0 bis 6, Rechner/Trainer nur im Handelsfachwirt (Kalkulation, Lagerkennzahlen) und Immobilienfachwirt (Netzplan) zusätzlich zum Finanzrechner. Handelsfachwirt wirkt am vollständigsten, Immobilienfachwirt am dünnsten.
- **Szenario-Namen** pro Kurs (Solvitec, Vantera, NordWert, Loreno Mode & Wohnen, Ravelin) schaffen Praxisnähe und sind konsistent eingesetzt.
- **Theorie:** immer nur als Seitenpanel über „Im Thema nachlesen“ oder Fortschritt -> „📖 Lesen“; lange Absätze, Überschriften-Hierarchie H2 -> H4. Kein eigener Theorie-Einstieg in „Lernen“. Ein eigenes Glossar-Verzeichnis gibt es nicht — Fachbegriffe werden nur nach der Antwort im Text markiert (Option „Fachbegriffe nach der Antwort markieren“).
- **Rechts-/Finanzwerkzeuge:** Finanzrechner und Kalkulationstrainer nennen Lernzweck, „keine Beratung“, „Eingaben werden nicht gespeichert“ und Annahmen (Jahresende, ohne Umsatzsteuer); ein „Stand“ (Datum) fehlt, wäre bei den vorhandenen reinen Rechenwerkzeugen aber nicht nötig.
- **Technik:** Alle API-Aufrufe in den getesteten Abläufen mit 200 OK, Antwortzeiten gefühlt unter 1 s; Konsole nur UNAUTHORIZED-Probes; Layout mobil (375x812) ohne horizontalen Scroll; Dark Mode lesbar; Fokusrahmen sichtbar (2 px grün); Escape schließt Dialoge und gibt den Fokus zurück; Primärbutton weiß auf Rot (4,5:1, gedimmt im Deaktiviert-Zustand).
- **Bestätigung bekannter Code-Review-Befunde:** WEB-02 (Fokusraub) bestätigt, inklusive des Teils „Header-Menü-Modals schließen beim ersten Klick“; WEB-05 (Mischmodus-Queue) bestätigt (Wiederholungen, schrumpfender Zähler).

## Nicht getestet / Grenzen

- Kein Zahlungs-/Abo-Flow, keine Lernpfade (Fortgeschritten-Funktionen waren nicht freigeschaltet), keine KI-Bewertung, keine Prüfungssimulation mit Antworten, keine Downloads (Fortschritts-PDF nicht ausgelöst).
- Soziale Funktionen (Freundeskreis, Kohorten, Duelle, Highscore) nur gesehen, nicht bedient; E-Mail-Bestätigung konnte in der Dev-Umgebung nicht abgeschlossen werden (Banner blieb sichtbar).
- Theorie ausführlich nur in zwei Kursen (IFW 5.1, TF 10.1) gelesen; Karteikarten komplett nur im IFW (40 Karten), in den anderen Kursen nur als Stichprobe im Mischmodus.
- Offline-Modus, Push-Benachrichtigungen, Kontrastmessung nur punktuell (Primärbutton, Muted-Link), keine vollständige WCAG-Prüfung.
- Quiz-Fragetypen „Fallaufgabe“ und „Fachgespräch“ als Aufgabe wurden nicht beantwortet (Fachgespräch-Frage nur angesehen).
- Der Befund UXT-F-19 beruht auf DB-/Code-Lage, nicht auf einer Browserbeobachtung (Wiederfinden der Frage in der Runde gelang im Zeitbudget nicht).
- Konto-Löschen-Dialog wurde nur geöffnet und nicht bestätigt; Löschung des Testkontos erfolgte per SQL.
- Ladezeiten nicht quantitativ gemessen.
