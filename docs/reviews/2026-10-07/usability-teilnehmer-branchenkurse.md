# Usability-Test Teilnehmer:innen-Sicht — Branchenkurse

Stand: 2026-10-08 · Tester: Claude (Browser-Agent, eigener Tab) · Umgebung: lokale Dev-Umgebung (Web :5173, API :3001), Desktop 1345 px, einmal mobil 375×812, Hell- und Dunkelmodus.
Getestete Kurse: Transport Management and Logistics, Versicherungen und Finanzanlagen, Fachwirt Gesundheits- und Sozialwesen, Fachwirt Büro- und Projektorganisation, Ausbildung der Ausbilder (AEVO).
Testkonto: ein Wegwerfkonto `@example.test`, lokal angelegt, am Ende per SQL gelöscht (Kontrolle: 0 Zeilen, kein Fehler).

## Kurzfazit

Die Plattform fühlt sich insgesamt stimmig, ruhig und ernsthaft an: Registrierung und Kursbeitritt sind schnell, die Fragetypen (Karteikarte, Wahr/Falsch, Single/Multiple Choice, Kurzantwort, Lückentext, Reihenfolge, Zonen-Zuordnung) funktionieren, die Rückmeldungen sind freundlich, und die echten Werkzeuge (Finanzrechner, Netzplan, die drei AEVO-Werkzeuge) sind ausgesprochen gut gemacht: klare Hinweise „Lernwerkzeug, keine Beratung / nichts wird gespeichert“, saubere Fehleingaben-Meldungen, Rechenweg. Dunkelmodus und Kontrast sind in Ordnung, es gab keine fehlgeschlagenen Netzaufrufe.

Die größten Reibungen für Lernende:
1. **Notiz- und „Fehler melden“-Dialog sind praktisch unbenutzbar** (Fokus springt nach jedem Zeichen aus dem Feld). Bekannter Befund des Code-Reviews: **bestätigt**.
2. **Instrument-Kacheln führen nicht zuverlässig zum Instrument** (Büro: drei verschiedene Kacheln landen in derselben Projektphasen-Aufgabe; in anderen Kursen beliebige Karte des Themas). Der Instrumente-Tab wirkt dadurch wie ein nicht eingelöstes Versprechen.
3. **Zonenfrage „Verkehrsträger“ (Transport) ist für Lernende frustrierend**: eine plausible Zuordnung wird rot markiert, ohne Erklärung und ohne Hinweis auf die richtige Zone; Theorie und eine Schwesterfrage stützen die „falsche“ Antwort sogar.
4. **Mischmodus-Queue** (bekannter Befund): Zähler „x von y“ läuft rückwärts in y, Fragen wiederholen sich, Beschriftung „20 Quiz-Fragen im Mix“ passt nicht zur Anzeige. **Bestätigt.**
5. **Theorie ist schwer auffindbar** (kein eigener Tab; nur über „Im Thema nachlesen“, „📖 Lesen“ im Fortschritt-Tab oder die Suche).
6. Uneinheitliche Ausstattung der Kurse (Spiele: 5 / 0 / 0 / 6 / 1; Werkzeuge mit Eingabe: 1 / 2 / 0 / 1 / 3; „Prüfungsablauf noch nicht beschrieben“ in allen fünf Kursen), interne Anforderungs-IDs im Nutzertext, mobil nimmt der Kopfbereich viel Platz.

Kein Blocker gefunden.

## Vergleich der Kurse (Aufbau, Benennung, Umfang)

| Merkmal | Transport | Versicherungen | Gesundheit/Soziales | Büro/Projekt | AEVO |
|---|---|---|---|---|---|
| Tabs | Lernen, Prüfung, Instrumente, Gaming, Fortschritt (überall gleich) | gleich | gleich | gleich | gleich |
| Kacheln im Instrumente-Tab | 9 + Sparverfahren-Trainer | 7 Quiz-Kacheln + Netzplan + Finanzrechner | 7, kein Werkzeug mit Eingabe | 11 + Netzplan | 5 Quiz-Kacheln + 3 Werkzeuge |
| Spiele | 5 (Kreuzworträtsel, Memory, Betrugs-Detektiv, Prozess-Reihenfolge, Rechen-Sprint) | keine („derzeit keine Spiele“) | keine | 6 (u. a. Duelle, Beleg-Detektiv) | 1 (Prozess-Reihenfolge) |
| Theorie | 3 Abschnitte je Thema, Fallbeispiel „Fracora“ | 5 Abschnitte, Fallbeispiel „Nordantis“, Allgemeinhinweis | Fallbeispiel „Morgenlicht“, kein Hinweis | – (nicht geöffnet) | Fallbeispiel „Kelvinar“, Rechtswerte ohne Stand |
| Prüfungsablauf („Gelassen bleiben“) | „noch nicht beschrieben“ | gleich | gleich | gleich | gleich |
| Hinweise „Lernwerkzeug/keine Beratung“ | Werkzeug nicht geöffnet | Finanzrechner vorbildlich | – | – | Werkzeuge vorbildlich |

Auffällig: Die gleichen Namen („Instrumente“, „Gaming“, Seitenüberschrift „Spiele“) und die gleiche Seitenstruktur machen die Kurse leicht lernbar; der Umfang der Instrumente und Spiele schwankt aber stark, ohne dass Lernende erfahren, warum („Für diesen Kurs gibt es derzeit keine Spiele“ ist die einzige Erklärung).

## Kurs 1: transport-management-logistics — Schulnote 3

**Getestet:** Registrierung, Kurssuche/Beitritt, Lernmodus-Dialog, ca. 20 Items im Mischmodus (alle Fragetypen inkl. Reihenfolge, Lückentext, Zone), gefilterte Themenschlange, Theorie-Panel, Instrumente-Tab (alle Kacheln aufgelistet; ABC-, Verkehrsträger- und SWOT-Kachel geöffnet; Sparverfahren-Trainer nicht geöffnet), Spiele (Kreuzworträtsel Einfach-Modus, Memory, Betrugs-Detektiv, Prozess-Reihenfolge, Rechen-Sprint mit Fehleingabe), Fortschritt (Übersicht, Erfolge), Prüfung (nur ansehen: Schriftlich, Präsentation, Fachgespräch, Gelassen bleiben), Einstellungen, Suche, Dunkelmodus, mobil, Tastatur, Konsole/Netzwerk, Kontrast.

**Befunde:**
- Notiz- und Melden-Dialog: nach jedem Zeichen verliert das Feld den Fokus (UXT-B-01). Escape schließt den Dialog korrekt.
- Zonenfrage Verkehrsträger (Q-2.3-13..16): 8 Aussagen, 4 Zonen. Meine Zuordnung von „Bei einem kurzfristigen Eilauftrag mit kleinen Mengen meist die einzig praktikable Option, weil er flexibel einsetzbar ist“ zu *Luft* wurde rot markiert (7 von 8). Die richtige Zone (vermutlich *Straße*) wird nicht genannt, eine Erklärung fehlt. Gleichzeitig sagt eine Single-Choice-Frage im selben Thema „Luftverkehr ist trotz hoher Kosten die einzig praktikable Option“, und die Theorie schreibt „Eilaufträge sprechen für Luft- oder Straßenverkehr“. „Benötigt in der Regel zusätzlichen Vor- und Nachlauf per Lkw“ passt zu Schiene, Wasser und Luft; „bei Fracora am häufigsten genutzt“ ist nur mit Firmenwissen lösbar. Subjektiv: man fühlt sich getäuscht, nicht geprüft. Der Hinweis „teils bewusst ähnlich formuliert“ entschärft das nicht.
- Zonenfrage ABC/XYZ (Q-2.2-14?): gut lösbar (4/4). Die Kachel „ABC-Analyse“ spricht nur von A/B/C, die Frage mischt ABC- und XYZ-Klassen (Zonen in der Reihenfolge A, Z, C, X). Dieselbe Frage kam nach korrekter Lösung 5 Items später erneut.
- Mischmodus: „1 von 32 → 3 von 31 → 4 von 30 → 5 von 29 …“; falsch beantwortete Fragen kehren nach wenigen Items zurück (u. a. „Ersatzteil“, „gebrochener Verkehr“), eine korrekt gelöste Lewin-Frage erschien nach 13 Items erneut. Einmal verschwand eine bereits angezeigte Karte („Marktanteil“) ohne Bewertung und wurde durch eine Quizfrage ersetzt (einmalig beobachtet, nicht reproduziert).
- Reihenfolge-Frage: Ablegen funktioniert nur über das kleine Label („1.“); ein Klick in die große leere Fläche passiert nichts; ein Klick auf ein bereits gewähltes Element hebt die Auswahl auf.
- Kurzantwort: Enter sendet nicht ab; Button ist bis zur Eingabe deaktiviert (gut). Lückentext: bei richtiger Antwort nur „1 von 1 Lücken richtig“, keine Erklärung.
- Instrumente: Kachelklick führt in gefilterte Themenschlange; SWOT startet mit Karteikarte „Shipper“, Verkehrsträger mit einer Karteikarte, nur die ABC-Kachel springt direkt zur Zonenfrage. Der Hinweistext nennt „Fortgeschritten-Funktionen, siehe unten“, unten steht dazu nichts.
- Theorie: Panel mit Inhaltsverzeichnis, aber lange Textabsätze ohne Listen/Abbildungen.
- Spiele: Kreuzworträtsel (Hinweise gut, „ZUHOEREN“ als Umschrift), Memory, Betrugs-Detektiv, Prozess-Reihenfolge funktionieren. **Rechen-Sprint**: Einleitung enthält einen abgebrochenen Satz („Ein einfacher Taschenrechner ist erlaubt. — und prüfe jede Antwort sofort.“); Eingabe „abc“ wird als falsche Antwort („Nicht ganz — richtig wäre 1.000,00 €“) gewertet statt als Eingabefehler. Der Lösungsweg wird sehr schön angezeigt.
- Gaming-Seite: Spiele plus Freundeskreis/Kohorten/Highscore/Duelle/Lernpartner auf einer langen Seite; „Meine Kohorten (als Dozent:in)“ und „Neue Kohorte anlegen“ sind für alle sichtbar.
- Fortschritt/Erfolge: verständlich; „Beste Prüfungspunktzahl (Selbsteinschätzung)“ unklar.
- Prüfung: „Gelassen bleiben“ → „Für diesen Kurs ist der Prüfungsablauf hier noch nicht beschrieben“.
- Einstellungen: umfangreich und verständlich; Abo-Abschnitt nennt interne IDs (F-70, F-129); Dev-Hinweis „Zahlungsdienst gerade nicht erreichbar“ (Umgebung).
- Mobil 375×812: kein horizontaler Seitenüberlauf; Tableiste scrollt, „Gaming“ angeschnitten und „Fortschritt“ unsichtbar ohne Hinweis; Kursname im Kopf abgeschnitten; beim ersten Besuch füllen E-Mail-Banner + „Kurz erklärt“-Banner fast den ganzen ersten Bildschirm, darunter drei „Weiter, wo du aufgehört hast“-Karten.
- Konsole: 3× `TRPCClientError: UNAUTHORIZED` beim Start (vor dem Login), später 2× „Du bist in diesem Kurs nicht eingeschrieben.“ beim Kurswechsel. Netzwerk: alle Aufrufe 200/207; nach jeder Antwort 2 Folgeabrufe.
- Tastatur: Karteikarte per Tab erreichbar (role=button, sichtbarer Fokus), Leertaste dreht um, Escape schließt Dialoge. Multiple-Choice-Optionen sind Buttons mit „☐/☑“-Zeichen ohne Checkbox-Rolle; Kopf-Icon-Buttons ohne Namen.

## Kurs 2: versicherungen-finanzanlagen — Schulnote 2

**Getestet:** Kurswechsel (Dialog), ca. 10 Items (Karte, Lückentext, SC, MC, Zone PDCA↔Schadenregulierung), alle Kacheln gelistet, Finanzrechner (alle 5 Reiter, Fehleingaben), Netzplan-Übung, Theorie PKV, Kennzahlen-Kachel, Spiele, Prüfung ansehen.

**Befunde:**
- Dialog „Kurs wechseln?“ nennt „(F-102)“ (interne Anforderungs-ID).
- Erste Karteikarte „Was passiert mit darüber hinausgehenden Alterungsrückstellungen …“: Bezug fehlt, Karte nicht eigenständig verständlich.
- Lückentext zeigt bei falscher Antwort „Richtige Lösung: Vertragsdichte“ (gut); Zonen-Rückmeldung „4 von 4 Begriffen richtig zugeordnet“ (Transport: „Zuordnungen“) — uneinheitliche Wortwahl.
- **Finanzrechner (vorbildlich):** Hinweis „Lernwerkzeug zum Nachrechnen, keine Anlage- oder Finanzierungsberatung. Beispielwerte, keine Prognose … Eingaben werden nicht gespeichert“, Rechenweg, Jahrestabelle. Fehleingaben (abc, −5000, −3 %, 150 %, Laufzeit 0 / 1000 / 10,5, leere Felder) werden mit klaren Meldungen abgefangen; „1.000“ und „3.5“ werden sinnvoll gelesen; Stichprobenwerte stimmen (10.000 € · 3 % · 10 J. → 13.439,16 €). Kein „Stand“-Datum (bei Rechenbeispiel nicht nötig).
- Netzplan üben: Leicht/Mittel/Schwer, Prüfen mit ✓/✗ je Feld, „9 von 11 richtig“, Lösung anzeigen, Neue Aufgabe — gut.
- Theorie PKV: Allgemeinhinweis („bewusst allgemein gehalten … aktuelle gesetzliche Regelungen“), durchgängiges Fallbeispiel; keine konkreten Beträge, daher kein Stand nötig.
- Kachel „Kennzahlen der Versicherungstechnik“ startet mit einer MC-Frage zur Combined Ratio; eine Zonenfrage erscheint erst nach 2 Items (und gehört zur Balanced Scorecard).
- Spiele: „Für diesen Kurs gibt es derzeit keine Spiele.“ — der Tab „Gaming“ besteht dann nur aus Sozialfunktionen.
- Falsch beantwortete Frage („intrinsische Motivation“) kommt 3 Items später direkt wieder.

## Kurs 3: fachwirt-gesundheit-soziales — Schulnote 3

**Getestet:** Kurswechsel, ca. 16 Items (Karten, SC, Kurzantwort, Zone Pflegeleistungen), Instrumente (7 Kacheln; PSP-, Donabedian-, Ansoff-Kachel geöffnet), Spiele, Prüfung ansehen, Suche + Theorie 4.2.

**Befunde:**
- Kein Einführungs-/Lernmodus-Dialog beim Wechsel; erstes Item ist eine allgemeine Projektfrage („Matrix- oder reine Projektorganisation?“) statt Gesundheitsbezug.
- Zone „Ordne die Leistung der passenden Beschreibung zu.“ (Pflegegeld, Entlastungsbetrag, Verhinderungspflege, Pflegesachleistung): Formulierung vertauscht (Beschreibungen sind die zu ziehenden Begriffe, Leistungen die Zonen); „Verhinderungspflege“ ↔ „Ersatzpflege bei Ausfall einer Pflegeperson“ ist nur mit Vorwissen eindeutig; 4/4 lösbar.
- Instrumente: kein Werkzeug mit Eingabe; Kacheln führen in beliebige Themen (PSP → Frage zur Aufbauorganisation, Donabedian → Karte „Expertenstandards“, Ansoff → Karte „Werbung vs. Öffentlichkeitsarbeit“). Das Instrument selbst bleibt unklar.
- Spiele: keine.
- Theorie 4.2 Finanzierungssysteme (SGB V/XI-nah): ohne Rechtsstand und ohne „ohne Gewähr“-Hinweis; im Versicherungskurs gibt es einen Allgemeinhinweis.
- Prüfungsablauf: „noch nicht beschrieben“.

## Kurs 4: fachwirt-buero-projektorganisation — Schulnote 3

**Getestet:** Kurswechsel, ca. 7 Items (Kurzantworten, Karten, SC, Zone Ausbildungsmethoden), 11 Kacheln gelistet, Stakeholder-/PSP-/ABC-Kachel geöffnet, Spiele (Kennzahlen-Duell, Begriffe-Duell, Beleg-Detektiv angespielt), Prüfung ansehen.

**Befunde:**
- Die Kacheln „Stakeholder-Matrix“, „Projektstrukturplan/Organigramm“ und „Projektphasen“ führen alle in dieselbe Warteschlange (Thema 1.3) und starten mit derselben Zonenfrage „Ordne die Tätigkeiten den passenden Zonen zu.“ (10 Tätigkeiten, 6 Projektphasen-Zonen). Wer „Stakeholder-Matrix“ wählt, bekommt eine Projektphasen-Übung. Die „ABC-Analyse“-Kachel öffnet Thema 4.2 mit der Frage „Tertiärbedarf“.
- Die ersten zwei Items sind Kurzantworten „Nenne zwei …“ (zwei Begriffe als freier Text) — für Lernende schwer zu treffen; Bewertung dazu nicht geprüft.
- Zone Ausbildungsmethoden (Vier-Stufen/Lehrgespräch/Leittext) im Büro-Kurs: 3/3 lösbar, thematisch ausbildungslastig.
- Kachel „Balanced Scorecard“ zeigt „Geführter Lernpfad: Fortgeschritten-Funktion, noch nicht freigeschaltet“ — nur hier gesehen; in den anderen Kursen verweist der Text auf „siehe unten“ ohne Inhalt.
- Spiele: 6 Stück, Duelle starten ohne Anleitung, sind aber selbsterklärend; Beleg-Detektiv mit guter Anleitung. „Kreuzworträtsel: Finanzkennzahlen“ wirkt im Büro-Kurs themenfern.

## Kurs 5: ausbildung-der-ausbilder — Schulnote 2

**Getestet:** Kurswechsel, 13 Items (12 Karten, SC, WF, Zone Vier-Stufen-Methode 8/8), 8 Kacheln gelistet, Lernziel-Check (inkl. Fehleingaben), Ausbildungsplan-Zeitplaner (Beispiel, Fehleingaben), Unterweisungs-Planer (Anzeige), Spiele, Prüfung, Suche + Theorie 1.1, Kontrastmessung.

**Befunde:**
- Einstieg mit 12 Karteikarten in Folge; mehrere nennen ohne Einführung Personen/Firma („Frau Yildiz“, „Kelvinar“) — ohne Theoriekenntnis schwer verständlich.
- **Werkzeuge vorbildlich:** Lernziel-Check („Faustregeln, keine Bewertung und keine KI. Deine Eingaben bleiben im Browser und werden nicht gespeichert“), Ausbildungsplan-Zeitplaner („kennt keine Rechtswerte … nicht an den Server gesendet“, Zeitleiste, Textausgabe), Unterweisungs-Planer (vier Stufen, Prüfpunkte). Kleinigkeiten: Lernziel-Check meldet bei „asdf qwer“ ✓ „Überprüfbarkeit in Ordnung“ und erkennt „Schraubendreher“ als Tätigkeitsverb (Heuristik, ausgewiesen); Zeitplaner meldet bei Probezeit 99 Monate nur „reicht über die geplanten Abschnitte hinaus“.
- Theorie 1.1 nennt Rechtswerte („max. 8 Stunden täglich, 40 Stunden wöchentlich“, JArbSchG) ohne Stand-Angabe.
- Spiele: nur „Prozess-Reihenfolge: Abläufe in der Ausbildung“ (generischer Beschaffungsprozess-Aufbau).
- Prüfungsablauf: „noch nicht beschrieben“ — ausgerechnet bei AEVO, wo die Prüfung (schriftlich + Präsentation/Fachgespräch) sehr konkret ist.

## Befundtabelle

Schwere: Blocker (Lernen nicht möglich) · Hoch (zentrale Funktion stark beeinträchtigt) · Mittel · Niedrig · Hinweis.

| ID | Schwere | Kurs | Schritte | Erwartung vs. Beobachtung | Empfehlung |
|---|---|---|---|---|---|
| UXT-B-01 | Hoch | alle | Lernen → „Notiz“ bzw. „Fehler melden“ → ins Feld klicken → tippen | Erwartet: Text fließend eingeben. Beobachtet: nach jedem Zeichen springt der Fokus auf das Modal-Panel; pro Klick wird nur 1 Zeichen angenommen (per Einzeltasten verifiziert, beide Dialoge); kein Autofokus beim Öffnen. Bekannter Code-Review-Befund: bestätigt. | Dialog-Komponente nicht bei jedem Tastendruck neu mounten (Komponenten/`key` stabilisieren), Autofokus auf das Feld. |
| UXT-B-02 | Hoch | Transport | Instrumente → „Verkehrsträger“ → Zonenfrage, „Eilauftrag … einzig praktikable Option“ → Luft | Erwartet: eindeutige Zuordnung. Beobachtet: „7 von 8“, Luft-Zuordnung rot, richtige Zone und Begründung fehlen; Theorie („Luft- oder Straßenverkehr“) und SC-Frage („Luftverkehr … einzig praktikable Option“) widersprechen dem Schlüssel; „Vor- und Nachlauf per Lkw“ passt zu 3 Verkehrsträgern; „bei Fracora am häufigsten genutzt“ nur mit Firmenwissen lösbar. | Fragen disambiguieren (je Aussage genau ein Träger, Fachlehrer-Review umsetzen) oder bis dahin aus dem Live-Bestand nehmen; Rückmeldung mit richtiger Zone + Kurzbegründung je Fehlzuordnung. |
| UXT-B-03 | Hoch | Büro (auch Transport, Gesundheit) | Instrumente → Kachel „Stakeholder-Matrix“ bzw. „Projektstrukturplan“ bzw. „Projektphasen“ → „Zu diesem Instrument lernen“ | Erwartet: das gewählte Instrument. Beobachtet: alle drei Kacheln landen in derselben Projektphasen-Zonenfrage (Thema 1.3); in Transport/Gesundheit starten SWOT, Verkehrsträger, Donabedian, Ansoff mit beliebiger Karteikarte; nur ABC-/Kennzahlen-Kachel springen teils direkt. | Kachel auf das konkrete Instrument-Item verlinken (Deep-Link auf die Zonenfrage); Warteschlange mit dem Instrument beginnen; Beschriftung ehrlich anpassen. |
| UXT-B-04 | Hoch | alle | Neuer Nutzer sucht Theorie in den Tabs Lernen/Prüfung/Instrumente/Gaming/Fortschritt | Erwartet: Tab/Menüpunkt „Theorie“. Beobachtet: Theorie nur über „Im Thema nachlesen“ (nach einer Antwort), „📖 Lesen“ im Tab Fortschritt oder „Theorie lesen“ in der Suche (Instrumente-Tab); auch der Einführungstext erwähnt Theorie nicht. | „Theorie“ im Intro-Text und in der Navigation sichtbar machen (z. B. Button je Thema auf der Lernen-Startseite). |
| UXT-B-05 | Mittel | Transport, Versicherungen | Lernen im Modus „Beides gemischt“, 20+ Items | Zähler „1 von 32 → 3 von 31 → 5 von 29“ (Nenner schrumpft); Fragen wiederholen sich (falsche nach 3–5 Items, korrekt gelöste Lewin-/ABC-Zone nach 5–13 Items); Beschriftung „20 Quiz-Fragen im Mix“ widerspricht „14 + 14 / 16 + 16“; einmal verschwand eine Karte ohne Bewertung. Bekannter Befund: bestätigt. | Queue stabil halten, Fortschritt als feste Zahl, Wiederholungen kennzeichnen („Wiederholung: zuvor falsch“); Label an tatsächliche Anzahl koppeln. |
| UXT-B-06 | Mittel | Transport | Reihenfolge-Frage „Angebotsprozess bei Fracora“: in leeres Feld „1.“ klicken | Erwartet: Element wird abgelegt. Beobachtet: nur das kleine Label „1.“ ist Klickziel; Klick in die große Fläche tut nichts; erneuter Klick auf gewähltes Element hebt Auswahl auf. | Gesamte Zone als Klickziel; Auswahlzustand sichtbar kennzeichnen. |
| UXT-B-07 | Mittel | alle | Zonen-/Lückenfragen beantworten | Zonen zeigen nur Rot/Grün (farbabhängig), keine richtige Zone, keine Erklärung; Lückentext (richtig) ohne Erklärung; im Versicherungskurs wird bei falsch die Lösung genannt; Wortwahl „Zuordnungen“ vs. „Begriffen“ wechselt. | Einheitliche Rückmeldung: richtige Lösung + Kurzerklärung, nicht nur Farbe (auch Symbol/Text je Element). |
| UXT-B-08 | Mittel | Versicherungen, Gesundheit, AEVO | Erste Karten/Fragen lesen | Karten ohne Kontext: „darüber hinausgehenden Alterungsrückstellungen“, „Frau Yildiz“, „Kelvinar“ ohne Einführung; Gesundheitskurs startet mit allgemeiner Projektfrage. | Karten eigenständig formulieren; Fallfirma/-personen beim ersten Auftreten kurz einführen; Einstiegsitems fachspezifisch wählen. |
| UXT-B-09 | Mittel | Versicherungen, Gesundheit (AEVO 1, Transport 5, Büro 6) | Tab Gaming | „Für diesen Kurs gibt es derzeit keine Spiele.“; der Tab heißt dennoch „Gaming“, Seitenüberschrift „Spiele“, Einführungstext verspricht „Lernspiele“. | Tab bei fehlenden Spielen ausblenden oder Platzhalter mit Hinweis; Benennung vereinheitlichen. |
| UXT-B-10 | Mittel | alle | Prüfung → „Gelassen bleiben“; Schriftliche Prüfung → Übungsdauer | „Für diesen Kurs ist der Prüfungsablauf hier noch nicht beschrieben“ in allen 5 Kursen, auch bei AEVO mit klar definierter Prüfung. Übungsdauer „1.5 Std.“ (Dezimalpunkt) und „10 Std.“ unerklärt. | Prüfungsablauf je Kurs ergänzen; „1,5 Std.“; Sinn der 10-Std.-Option erklären. |
| UXT-B-11 | Mittel | Transport (mobil) | Viewport 375×812, Startansicht | Tableiste scrollt horizontal, „Gaming“ angeschnitten, „Fortschritt“ unsichtbar ohne Hinweis; Kursname im Kopf abgeschnitten; E-Mail-Banner + „Kurz erklärt“ + 3 „Weiter, wo du aufgehört hast“-Karten füllen den ersten Bildschirm. | Tabs umbrechen oder fester Tab-Balken; Banner einklappbar; max. 1–2 Fortsetzen-Karten. |
| UXT-B-12 | Mittel | alle | Barrierefreiheit per DOM prüfen | Kopf-Icon-Buttons ohne Namen (ein weiterer in der Lernansicht); MC-Optionen als Buttons mit „☐/☑“ ohne Checkbox-Rolle/`aria-checked`; Kurzantwort-Feld ohne Label (nur Platzhalter „Antwort“); Antworttext der Karteikarte steht schon vor dem Umdrehen im DOM. | `aria-label`, `role=checkbox`/`aria-checked`, `<label>`, Rückseite per `aria-hidden` bis zum Umdrehen. |
| UXT-B-13 | Mittel | AEVO, Gesundheit | Theorie 1.1 (AEVO) und 4.2 (Gesundheit) | Rechtsnahe Aussagen („max. 8 Stunden täglich, 40 Stunden wöchentlich“, SGB-Verweise) ohne Stand und ohne „ohne Gewähr“-Hinweis; im Versicherungskurs gibt es einen Allgemeinhinweis. | Einheitlichen Rechts-Hinweis mit Stand je Theorie-Thema ergänzen. |
| UXT-B-14 | Niedrig | alle | Einstellungen, Kurswechsel, Suche | Interne IDs im Nutzertext: „(F-70)“, „(F-129)“ (Abo), „(F-102)“ (Kurs wechseln), „HB1-fachgespraech — … (F-25)“ (Suchergebnis). | IDs aus UI-Texten entfernen. |
| UXT-B-15 | Niedrig | Transport | Gaming → Rechen-Sprint | Einleitung mit abgebrochenem Satz („… Taschenrechner ist erlaubt. — und prüfe jede Antwort sofort.“); „abc“ als Antwort → „Nicht ganz — richtig wäre …“ statt Eingabehinweis. | Text korrigieren; Eingabe validieren (Zahl). |
| UXT-B-16 | Niedrig | Transport | Kurzantwort-Frage, Enter drücken | Enter sendet nicht ab; „Antwort prüfen“ muss geklickt werden. | Enter als Absenden. |
| UXT-B-17 | Niedrig | alle | Zwischen Items wechseln | Beim Wechsel bleibt die alte Frage > 1 s sichtbar/klickbar (Klick trifft veraltete Ansicht). | Übergang verkürzen, alte Ansicht sofort deaktivieren. |
| UXT-B-18 | Niedrig | Transport, Versicherungen, Gesundheit, AEVO | Instrumente-Tab, Hinweistext | „Für manche Instrumente gibt es zusätzlich einen geführten Lernpfad … (Fortgeschritten-Funktionen, siehe unten)“: unten steht nichts (nur im Büro-Kurs an der BSC-Kachel „noch nicht freigeschaltet“). | Lernpfad-Hinweis an den betroffenen Kacheln zeigen oder den Satz streichen. |
| UXT-B-19 | Niedrig | AEVO | Lernziel-Check: „asdf qwer“, „… weiß, wie ein Schraubendreher benutzt wird“ | „Überprüfbarkeit ✓ in Ordnung“ für Unsinn; „Schraubendreher“ als Tätigkeitsverb erkannt. | Bei nicht erkanntem Verb keine ✓-Meldung zur Überprüfbarkeit. |
| UXT-B-20 | Niedrig | AEVO | Ausbildungsplan-Zeitplaner: Probezeit 99 Monate | Nur „reicht über die geplanten Abschnitte hinaus“, kein Plausibilitätshinweis. | Hinweis („unüblich lang, siehe Kurs“) ohne Rechtswert ergänzen. |
| UXT-B-21 | Niedrig | AEVO (Messung) | Dunkelmodus, Kontrast | Dunkel: „100 % Trefferquote“ (13 px) nur 4,18 : 1 (< 4,5); Hell: alle geprüften Texte ≥ 4,5 : 1; roter Primärbutton „Nächste Frage“ genau 4,5 : 1. | Farbe der Zusatzzeile im Dunkelmodus aufhellen. |
| UXT-B-22 | Niedrig | alle | Browser-Konsole | 3× `TRPCClientError: UNAUTHORIZED` beim Seitenstart (vor Login), 2× „Du bist in diesem Kurs nicht eingeschrieben.“ direkt nach Kurswechsel (Abfragen des alten Kurses laufen noch). | Auth-Probe ohne Fehlerlog; Abfragen beim Kurswechsel abbrechen. |
| UXT-B-23 | Niedrig | alle | Lernmodus-Dialog, Login, Nutzermenü, Gaming | „Beides gemischt“ ist als einziger Lernmodus-Button rot (wirkt wie Warnung); im Login-Formular kein „Passwort vergessen“ gefunden; „Konto löschen“ steht direkt unter „Logout“; Gaming-Seite zeigt „Meine Kohorten (als Dozent:in)“ + „Neue Kohorte anlegen“ jeder Person. | Farbe/Reihenfolge überdenken; Passwort-Reset verlinken; Dozent:innen-Bereich nur bei Rolle anzeigen. |
| UXT-B-24 | Niedrig | Büro | Zone „Ausbildungsmethode“, Kreuzworträtsel „Finanzkennzahlen“ | Themen wirken im Büro-Kurs randständig (Ausbildung/Finanzen statt Büro/Projekt). | Inhalt dem Kurs zuordnen oder umbenennen. |
| UXT-B-25 | Hinweis | alle | Netzwerk-Tab | Nach jeder Antwort 2 Folgeabrufe (dueCards, suggestions, mascotStatus, auth.me, streakStatus); keine Fehler, keine Wartezeiten > 1 s bemerkt. | Ggf. bündeln/cachen. |
| UXT-B-26 | Hinweis | alle | Registrierung | Lernen ist vor E-Mail-Bestätigung möglich; Banner „Bitte bestätige deine E-Mail-Adresse …“ bleibt auf der Startseite. | Bewusst so? Banner nach Schließen merken. |
| UXT-B-27 | Hinweis | Büro | Lernen, Items 1–2 | Kurzantworten „Nenne zwei …“ (mehrere Begriffe als freier Text): Bewertung nicht geprüft. | Bewertung prüfen (Synonyme, Reihenfolge). |
| UXT-B-00 | Hinweis | Testaufbau | Mehrere Tabs im selben Browser | Session-Cookies sind pro Host geteilt: parallele Tests auf `localhost:5173` überschrieben sich gegenseitig die Anmeldung (ich war kurz im Konto eines anderen Testers; mein erster Kursbeitritt/Lernmodus-Klick könnte dort gelandet sein). Lösung: eigener Host `uxt-teilnehmer.localhost:5173`. | Bei Parallel-Tests je Agent eigenen Host verwenden. |

## Kursübergreifende Auffälligkeiten

- **Instrumente-Tab:** Konzept „erst Quiz, dann Anwendung am Instrument“ wird durch die Verlinkung nicht eingelöst (B-03). Kurse haben 0 bis 3 echte Werkzeuge; Werkzeug-Kacheln tragen sprechende Buttons („Rechner öffnen“, „Netzplan üben“, „Feinziel prüfen“), Quiz-Kacheln „Zu diesem Instrument lernen“ — das ist ein gutes Muster.
- **Werkzeug-Qualität** (Finanzrechner, Netzplan, AEVO-Planer): einheitlich hohes Niveau — Hinweisbox oben, Rechenweg, klare Fehlertexte, „nichts wird gespeichert“. Dieses Muster sollte für künftige Rechts-/Finanz-/Versicherungswerkzeuge Standard bleiben.
- **Zonen-Fragen** sind der fehleranfälligste Typ (Mehrdeutigkeit, Formulierung, Klickziele, Rückmeldung).
- **Fachtexte:** Theorie = lange Fließtextabsätze; Fallfirmen (Fracora, Nordantis, Morgenlicht, Kelvinar) geben Orientierung, tauchen in Karten aber unvermittelt auf.
- **Benennung:** „Instrumente“ / „Werkzeugkasten“, „Gaming“ / „Spiele“, „Lernen“ / „Zu diesem Thema lernen“ wechseln.
- **Interne Kennungen** (F-xx, Themencodes) sickern in Nutzertexte.
- **Dunkelmodus** konsistent; Fokusrahmen sichtbar; Escape schließt Dialoge.

## Nicht getestet / Grenzen

- Prüfungssimulation (laut Auftrag nur angesehen, keine Antworten), Atemübung, Präsentations-Timer, Fachgesprächs-Bewertung.
- Sparverfahren-Trainer (Transport), SWOT-/Ansoff-/Risikomatrix-Zonenfragen im Detail, Fallaufgaben/KI-Bewertung (Abo; Zahlungsdienst in der Dev-Umgebung nicht erreichbar), Lernpfade (gesperrt), Zahlungs-/Abo-Flows (bewusst nicht).
- Spiele nur angespielt: Kreuzworträtsel (nur „Einfach“), Memory, Betrugs-Detektiv, Beleg-Detektiv, Duelle nicht bis zum Ende; Freunde/Kohorten/Duelle/Highscore (benötigen zweite Person).
- Glossar: im Teilnehmerbereich keine eigene Glossar-Seite gefunden; „Fachbegriffe nach der Antwort markieren“ (Einstellung) nicht geprüft.
- Theorie nur in Transport, Versicherungen (PKV), Gesundheit (4.2) und AEVO (1.1) geöffnet, nicht im Büro-Kurs.
- Quiz-Rückmeldungen in den Kursen 2–5 größtenteils halbautomatisch (erste Option) erzeugt, um Fragetypen zu erfassen; inhaltliche Prüfung der Antworten daher nicht vollständig. Items je Kurs: Transport ≈ 30 (Misch + gefilterte Schlange), übrige 7–16.
- Mobil nur im Kurs Transport und nur Start-/Lernansicht geprüft; Tastatur zwei Stichproben (Karteikarte, Dialog/Escape); keine Screenreader-Prüfung, nur Rollen/Labels per DOM.
- Offline-Modus, Push, PWA-Installation, Mehrgerätesync nicht getestet. Kein Test mit minderjährigen Konten/Consent-Flow.
- Alle Messungen in lokaler Dev-Umgebung (Vite-Dev-Server); Ladezeiten nicht aussagekräftig (subjektiv keine Wartezeiten > 1 s).
