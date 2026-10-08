# Fachlehrer-Review: Fachinformatiker/-in Anwendungsentwicklung

Prüfdatum: 07.10.2026
Prüfgegenstand: `content/fachinformatiker-anwendungsentwicklung/` (ae1–ae5, fu1–fu7), dazu die Passung zu `KURS_ANGEBOT`/`KURS_ENTWURF` (`packages/shared/src/kurs-angebot.ts`) und den Spielinhalten (`apps/api/src/db/content/*`, `seed-games.ts`, `packages/shared/src/game-logic-rechnen.ts`).
Rolle: Fachlehrer:in/Prüfer:in. Es wurden keine Inhalte oder Code verändert, nichts committet.

## 1. Kurzfazit

| Dimension | Note (1–6) |
|---|---|
| Fachliche Richtigkeit | 2 |
| Didaktik und Quizqualität | 2–3 |

Freigabeempfehlung: **freigabereif mit Auflagen.**

Begründung: Es wurde kein belegter fachlicher Fehler gefunden, der einen Blocker rechtfertigt. Alle nachgerechneten Zahlenbeispiele, Codebeispiele und SQL-Abfragen stimmen. Die Auflagen betreffen:

1. einen systemischen Rate-Bias bei Multiple-Choice (Optionen werden nicht gemischt),
2. interne Widersprüche in wenigen Begriffen (Testart/Testverfahren, MVC, Phishing/Schutzziel),
3. Spiele und Werkzeuge, deren Konzepte in der Theorie nicht vorkommen (R5 „Theorie vor Werkzeug“),
4. mehrdeutige Zuordnungs- und Zonenfragen,
5. erhebliche Redundanz zwischen den Themen,
6. Rechtsstand-Hinweise, die unter R4 nie als „geprüft“ gelten dürfen.

Befunde nach Schwere: Blocker 0, Hoch 10, Mittel 15, Niedrig 12, Hinweis 4.

Wichtigste drei Befunde:
- FL-AE-01: Antwortposition und Optionslänge verraten die richtige Antwort sehr oft.
- FL-AE-05, -06, -07: Spiele und Werkzeuge (Sortieren/Suchen, Bug-Hunt OO/Schleifen, Zahlensysteme, IT-Rechnen) verlangen Wissen, das die Theorie nicht vermittelt.
- FL-AE-02, -03, -09: interne Widersprüche (Testart gegen Testverfahren, MVC als Entwurfs- gegen Architekturmuster, mehrdeutige UML-Zonenfragen).

## 2. Prüfumfang

| Bereich | Umfang | Tiefe |
|---|---|---|
| ae1 (8.1–8.4, Fallaufgaben) | alle Themen, Karten, Quiz, Fallaufgaben | vollständig gelesen |
| ae2 (9.1–9.4) | alle | vollständig gelesen, Rechnungen nachgerechnet |
| ae3 (10.1–10.3) | alle | vollständig gelesen, Nutzwertanalysen nachgerechnet |
| ae4 (11.1–11.4, Fallaufgaben) | alle | Python-Code ausgeführt, SQL in SQLite gegen Beispieldaten geprüft |
| ae5 (12.1–12.3, Fachgespräch, Fallaufgaben) | alle | vollständig gelesen, alle Zahlen nachgerechnet |
| fu1–fu7 (1.1–7.5, Fallaufgaben, Fachgespräche, Glossar) | alle Themen | vollständig gelesen bzw. gesichtet, Zahlen nachgerechnet; fu6-Fachgespräch und fu6-Fallaufgaben ganz gelesen |

Stichprobenanteil: Rechenwege, Codebeispiele und SQL-Ergebnisse wurden zu 100 % nachgerechnet. Inhaltliche Prüfung gegen Fachwissen und FIAusbV/Rahmenplan erfolgte für alle Themen. Rechtsangaben (fu7) wurden nur gegen Fachwissen geprüft, nicht gegen aktuelle Gesetzestexte (siehe Abschnitt 9).

Zusätzliche Strukturchecks per Skript (Scratchpad): Frageverteilung, Position der richtigen Antwort, Optionslängen, Duplikate zwischen Karteikarten.

## 3. Befundtabelle

Sicherheit: **belegt** = im Material nachgewiesen oder nachgerechnet; **zu prüfen** = fachliche Einschätzung, die eine Gegenprüfung durch eine zweite Fachperson oder Primärquelle braucht.

### 3.1 Blocker

Keine.

### 3.2 Hoch

| ID | Datei / Frage | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-AE-01 | alle Quiz (Anzeigelogik: `quiz-logic.ts` `shapeQuizItem`, `quiz.ts` `orderBy(sortOrder)`, `QuizSteps.tsx`) | MC-Optionen werden nicht gemischt. Auswertung der Inhalte: Bei MC steht die richtige Antwort in 104 von 152 Fällen (68 %) an Position 2 und nie an Position 4. Bei „Was passt nicht“ steht sie in 40 von 45 Fällen an Position 4. Bei Wahr/Falsch ist in 45 von 56 Fällen (80 %) „Falsch“ richtig. In 110 von 152 MC ist die längste Option richtig (72 %). Lernende können ohne Fachwissen sehr gut raten. | Optionen beim Ausliefern mischen (wie bei Zuordnung/Sortieren) und Autor:innen-Leitfaden zur Optionslänge ergänzen. Alternativ die Antwortpositionen im Content gleichmäßig verteilen und Wahr/Falsch ausbalancieren. | belegt |
| FL-AE-02 | 9.2, 10.3, K-9.2-08, K-9.2-22, Q-9.2-08, F-AE2-01 (TA2 und Musterlösung) | Widerspruch bei „Testart“ und „Testverfahren“: K-9.2-22 trennt Testart (funktional/nichtfunktional/Regression) von Testverfahren (Black-/White-Box). Q-9.2-08 fragt dagegen „Zu welcher Testart gehört Zweigüberdeckung“, der Theorieabschnitt „Testarten“ führt Black-/White-Box „nach Vorgehensweise“, F-AE2-01 TA2 verlangt „Testart (Black-Box oder White-Box)“ und die Musterlösung nennt „Testart: Black-Box“. 10.3 spricht von „Testarten und -sichten: Black-Box/White-Box“. Die Begriffsverwendung ist im Kurs uneinheitlich (im Prüfblatt als Zweifelsfall bekannt, hier bestätigt). | Eine Begriffsregelung festlegen, die der IHK-Praxis folgt, und überall anwenden. Betroffene Fragen/Lösungen angleichen. In den Theorietexten einen Hinweis zu den abweichenden Lehrbuchbezeichnungen ergänzen. | belegt (Widerspruch); zu prüfen (welche Bezeichnung die IHK nutzt) |
| FL-AE-03 | 8.4 (Theorie), 8.2, K-8.2-24 | MVC ist in 8.4 „Entwurfsmuster“, in 8.2/K-8.2-24 „Architekturmuster“. Beides in einem Kurs ist verwirrend. Außerdem steht MVC im Quiz auch im Kontext der Instrumente „Muster“. | Einheitlich „Architekturmuster“ (lehrbuchüblich, mit Hinweis auf „häufig auch als Entwurfsmuster bezeichnet“). | belegt (Widerspruch) |
| FL-AE-04 | fu5 5.2: Q-5.2-16, Q-5.2-17, Q-5.2-18 (SQL-Befehlsgruppen/Zonen) | Die Fragen nutzen DQL, TCL, SAVEPOINT und TRUNCATE. Die Theorie führt nur DDL/DML/DCL ein (SELECT „teils eigene Gruppe“). Die Zuordnung SELECT = DQL widerspricht der unter IHK-Prüfungen häufigen Zuordnung SELECT = DML. Lernende werden für eine in der Theorie nicht vorbereitete Unterscheidung bestraft oder mit einer prüfungsabweichenden Zuordnung konfrontiert. | Theorie um DQL/TCL ergänzen oder die Fragen auf DDL/DML/DCL beschränken. Bei SELECT beide gängigen Zuordnungen erklären und in Fragen nur eindeutig auflösbare Befehle verwenden. | belegt (R5-Lücke); zu prüfen (IHK-Zuordnung) |
| FL-AE-05 | fu4 4.2, 11.2; Rechen-Sprint „Sortieren und Suchen“ (Typen sortvergleiche, sorttausch, sortwert, binaersuche, suchindex, binmax) | Sortierverfahren stehen nur in einem Absatz. Es gibt keine einzige Karteikarte oder Quizfrage zu Bubble-, Selection- oder Insertion-Sort. Das Spiel verlangt Vergleichs- und Tauschzählen sowie Binärsuche per Handrechnung. Das Kursprofil nennt Sortierverfahren als in den Katalogen verstärkt (Sekundärquellen). R5 „Theorie vor Werkzeug“ ist verletzt. | Eigenes Thema oder Unterabschnitt „Sortieren und Suchen“ mit Ablauf-Tabellen, Karten und Quiz ergänzen, bevor das Spiel sichtbar bleibt. | belegt (Lücke); zu prüfen (Prüfungsrelevanz laut aktuellem Katalog) |
| FL-AE-06 | fu4 4.1, ae4; Bug-Hunt-Sets objektorientierung und schleifen (`game-bughunt-*.ts`) | Die Spiele setzen static, super, equals, virtual/override, Closures und continue voraus. Die Theorie behandelt Kapselung nur als Konvention. Überladen, static, abstrakte Klassen und Interfaces fehlen. Das Prüfblatt nennt Sichtbarkeit/static bereits als offen. Die Bug-Hunt-Snippets ließen sich nicht ausführen (siehe Abschnitt 9), die Erklärungen wirken plausibel. | Theorie um die genannten OO-Konzepte (mindestens static, Überladen, abstrakte Klassen/Interfaces, Vererbung mit super) und Schleifensteuerung (break/continue) ergänzen oder die Aufgaben entfernen. | belegt (Lücke) |
| FL-AE-07 | Spiele „Zahlensystem-Sprint“ (Grundlagen) und „IT-Rechnen“ (Datenmengen/Übertragungszeiten, `seed-games.ts` ~505–513, `game-logic-rechnen.ts` ~275/408) | Im Kurs gibt es keine Theorie zu Zahlensystemen (Suche nach Dualsystem/Zahlensystem ohne Treffer) und keine zu Datenmengen, Einheiten und Übertragungsraten. R5 verletzt. Dabei sind genau diese Themen in Teil 1 der FIAusbV und im Rahmenplan relevant. | Thema „Zahlensysteme und Datenmengen“ (Dual/Hex, Präfixe 1000 gegen 1024, Übertragungszeit) in fu3 ergänzen. | belegt (Lücke) |
| FL-AE-08 | fu6 6.1: Q-6.1-22 | „Die digitale Signatur kombiniert dieses Verfahren mit einem Hash“ führt zur Antwort „Asymmetrische Verschlüsselung“. Eine Signatur ist formal keine Verschlüsselung, sondern ein Verfahren mit privatem Schlüssel über einen Hash. Im Prüfblatt als Zweifelsfall bekannt. Mit der Formulierung lernt man ein schiefes Bild. | Frage umformulieren: „Welches Schlüsselverfahren liegt der digitalen Signatur zugrunde?“ und Erklärung präzisieren („Signieren mit dem privaten, Prüfen mit dem öffentlichen Schlüssel“). | belegt (unscharf); zu prüfen (Prüfformulierung der IHK) |
| FL-AE-09 | 8.2: Q-8.2-22, Q-8.2-19 (Item 8), Q-8.2-18, Q-8.2-17 | Mehrdeutige UML-Zonen-/Zuordnungsfragen: Q-8.2-22 („Methode, die ein Fahrzeug erwartet und jedes Auto akzeptiert“) kann Abhängigkeit (Parameter) oder Vererbung meinen (vgl. Q-8.2-19 Item 8). Q-8.2-18 („Erzeugungsmethode statt new“) passt ebenso auf Singleton `getInstance`. Q-8.2-17 („Verbindungspool = Singleton“) ist diskutabel (Object Pool). Das Prüfblatt kennt Aggregation/Komposition als Zweifelsfall. | Aufgabentexte so schärfen, dass nur eine Zuordnung zulässig ist (z. B. „Ein Objekt wird als Attribut gehalten, Lebenszyklus gebunden“). Bei Singleton klarstellen („genau eine Instanz“). | belegt (Mehrdeutigkeit) |
| FL-AE-10 | fu6 6.2 (DSGVO), fu1 1.2 (UWG/DSGVO bei Werbe-E-Mail), fu1 1.3 (Abnahme/Gewährleistung), 8.3 (BITV/BFSG), fu7 (BBiG, ArbZG, BUrlG, BetrVG, JAV) | Rechtsnahe Inhalte unterliegen R4 und dürfen nicht als „geprüft“ gelten. Konkreter Stand-Hinweis: Die Pflicht zur Benennung eines Datenschutzbeauftragten nach § 38 BDSG ist zur Aufhebung bis Ende 2026 angekündigt (Quelle: https://www.dr-datenschutz.de/faellt-die-pflicht-zum-datenschutzbeauftragten-bis-ende-2026/). Fachwissenstest der fu7-Angaben (BBiG Probezeit 1–4 Monate, 4 Wochen Kündigung in der Probezeit, ArbZG, BUrlG 24 Werktage, BetrVG-Schwellen 5/4 Jahre/16/18, JAV 5/18/25/2 Jahre, GmbH 25.000 Euro, AG 50.000 Euro) ergab Übereinstimmung, ersetzt aber keine Rechtsprüfung. | Rechtsstand-Datum im Frontmatter ergänzen, Status „ungeprüft“ lassen und Rechtsprüfung durch eine fachkundige Person einplanen. § 38 BDSG zeitnah beobachten und den Wortlaut des Abschnitts bei Gesetzesänderung anpassen. | belegt (Rechtsstand-Risiko); zu prüfen (Gesetzesstand) |

### 3.3 Mittel

| ID | Datei / Frage | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-AE-11 | 11.1, ae4-Fallaufgaben F-AE4-01/-03, Kursprofil | Schwerpunkt auf PAP und Struktogramm (14 Karten/Quizfragen in 11.1; zwei Fallaufgaben). Das Kursprofil nennt, dass Struktogramm/PAP seit 2025 aus den IHK-Katalogen gestrichen sind. Dagegen fehlt das Aktivitätsdiagramm als grafische Darstellung von Algorithmen in 11.1 (kommt nur in 8.2 vor). | Aktuellen Katalog prüfen. Wenn Struktogramm/PAP entfallen, Anteil reduzieren und Aktivitätsdiagramm als Darstellung von Algorithmen ergänzen. | zu prüfen (Katalogstand, Quellen unsicher) |
| FL-AE-12 | fu6 6.1: Q-6.1-02 und Q-6.1-15 | Phishing wird in einer Erklärung dem Schutzziel Vertraulichkeit zugeordnet, in der anderen dem Schutzziel Authentizität (gefälschter Absender). Beides lässt sich begründen, die Lernenden erhalten aber widersprüchliche Signale. | Beide Fragen auf eine eindeutige Fassung bringen (z. B. „Welches Schutzziel verletzt ein gefälschter Absender?“) und Erklärungen abgleichen. | belegt (Inkonsistenz) |
| FL-AE-13 | 8.1 und fu1 Q-1.1-16, Q-1.1-18 | 8.1 spricht von „vier Ereignissen innerhalb des Sprints“, Q-1.1-16 zählt „fünf Events (Sprint, …)“. Q-1.1-18 behandelt die Definition of Done als „Artefakt“; der Scrum Guide 2020 nennt sie als Verbindlichkeit des Inkrements (die Erklärung relativiert das bereits). | Zählung vereinheitlichen („fünf Scrum-Events, Sprint als Rahmen“) und DoD als „Verbindlichkeit zum Inkrement“ benennen. | belegt (Inkonsistenz) |
| FL-AE-14 | fu4 4.3: Q-4.3-15 Item „gegen Pflichtenheft → Systemtest“; 10.2/10.3; Modultest/Komponententest | Q-4.3-15 ordnet „gegen das Pflichtenheft“ dem Systemtest zu, während 10.2/10.3 das Pflichtenheft als Maßstab für Test und Abnahme nennen. Modultest/Komponententest werden uneinheitlich verwendet. | Zuordnung eindeutig formulieren („gegen das Gesamtsystem mit allen Anforderungen“) und Begriffe angleichen. | belegt |
| FL-AE-15 | Karten-Duplikate und Redundanz 9.2/10.3/11.3/4.3 | Identische Kartenfragen: K-8.2-03/K-10.2-07; K-9.1-11/K-2.2-08; K-9.2-08/K-11.3-05/K-10.3-07; K-9.2-10/K-10.3-15/K-4.3-08 (Regressionstest); K-10.3-02/K-6.3-09; K-11.1-01/K-4.2-01; K-12.1-09/K-2.3-03; K-3.2-16/K-4.4-14; K-3.2-17/K-7.5-02. Thema 10.3 wiederholt weitgehend 9.2 (Teststufen, Äquivalenzklassen, Testkonzept, Abnahme), 11.3 ein viertes Mal. Doppelte Karten bringen Lernenden bei Spaced Repetition keinen Mehrwert, sondern Mehrarbeit. | Duplikate zusammenführen (eine Karte, mehrere Tags) und 10.3/11.3 auf nicht wiederholende Aspekte kürzen. | belegt |
| FL-AE-16 | 9.3: Q-9.3-15, Q-9.3-16 | `git reset --soft`/`--mixed` und `git add -p` werden gefragt, die Theorie nennt nur `reset --hard`. Im Prüfblatt bekannt. R5-Lücke (die Freigabe wurde am 06.10.2026 ohne Einzelentscheidung erteilt). | Theorie ergänzen oder Fragen entfernen. | belegt |
| FL-AE-17 | 11.1 (Zustandsdiagramm), 8.2, K-4.2-16 | Endzustand: 11.1 „Kreis mit Rand“, 8.2 „Kreis mit gefülltem Kreis darin“ (die UML-Notation stimmt bei 8.2). K-4.2-16 nennt für Start/Ende ein „Oval“, 11.1 ein „abgerundetes Rechteck“. | Darstellung vereinheitlichen und gegen UML/DIN-66001-Notation abgleichen. | belegt |
| FL-AE-18 | 12.1, Instrument Risikomatrix, fu6 6.4 | Vier Risikostrategien im Text (vermeiden/vermindern/übertragen/akzeptieren) gegen Zonen im Instrument (Vermeiden/Absichern/Beobachten/Akzeptieren). Ishikawa-Kategorien weichen von der Theorie ab. | Begriffe in Instrument und Theorie angleichen. | belegt |
| FL-AE-19 | Fragen mit Schwierigkeit „schwer“, die zu leicht sind: Q-9.1-12 (bewerten, drei absurde Distraktoren), Q-9.4-07 (Entweder-Oder, 50 % Ratequote), Q-10.1-13, Q-10.3-14, Q-1.2-10, Q-2.1-13, Q-2.2-09/-11, Q-2.3-02/-14, Q-11.1-14 (Antwort steckt im Fragekontext, identisch mit K-11.1-17) | Das Schwierigkeitslabel stimmt nicht mit dem tatsächlichen Anspruch überein. Das verzerrt die adaptive Auswahl. | Schwierigkeit herabstufen oder Aufgaben durch echte Anwendungs-/Bewertungsfragen mit plausiblen Distraktoren ersetzen. | belegt |
| FL-AE-20 | Offensichtliche/absurde Distraktoren: Q-8.1-10, Q-8.3-11 (Fehlerprotokolle, DB-Indizes, Lock-Dateien), Q-8.4-09 („Juristische Wartung“), Q-9.3-01 („genau ein Zweig“), Q-9.3-10 (Prepared Statement), Q-9.4-12 („Foto des Teamraums“), Q-10.1-09 (Sterne), Q-10.3-10, Q-1.2-13, Q-2.4-13/-14 | Distraktoren sind teils Strohmänner und lassen sich per Ausschlussverfahren eliminieren. Das senkt die Aussagekraft. | Durch typische Fehlvorstellungen ersetzen (häufige Verwechslungen aus der Praxis). | belegt |
| FL-AE-21 | fu7 Q-7.2-12; 8.4 Q-8.4-13 (Hierarchie-Instrument) | Q-7.2-12: „Lohn-/Gehaltsabrechnung“ ist „Bereich Verwaltung“ oder „Abteilung Personal“ zuordenbar; das Organigramm führt „Bereich Verwaltung“ außerhalb der vier Bereiche. Q-8.4-13: „Eingaben entgegennehmen → Backend“ ist mehrdeutig (das Frontend nimmt Eingaben entgegen). | Hierarchie und Aufgabenbeschreibung angleichen bzw. Aufgabe präzisieren. | belegt |
| FL-AE-22 | fu1 F-FU1-01, Musterlösung TA2 | Die Musterlösung nennt „Urlaub eines Entwicklers in Woche 3“, der in der Ausgangssituation nicht vorkommt. Prüflinge können das nicht herleiten. | Sachverhalt in die Ausgangssituation aufnehmen oder aus der Musterlösung streichen. | belegt |
| FL-AE-23 | Rahmenplan Teil 1/Teil 2 | Fehlende Themen: BPMN/Prozessmodellierung im Kurs (laut Sekundärquellen neu, nur im DPA-Kurs vorhanden), UML-Aktivitätsdiagramm in der Algorithmen-Theorie (siehe FL-AE-11), Sortierverfahren (siehe FL-AE-05). Details in Abschnitt 4. | Themen planen und in R5-Reihenfolge einführen. | zu prüfen (Quellen) |
| FL-AE-24 | fu3 3.1: Q-3.1-16 | „Firewall-Regel auf Port 443 → Transportschicht“ ist diskutabel (Portfilter arbeitet auf Schicht 4, verbreitet wird aber auch HTTPS = Anwendungsschicht argumentiert); „Sitzung“ als Beispiel wirkt lehrbuchhaft. | Beispiel schärfen („Portnummer“ statt „HTTPS“). | zu prüfen |
| FL-AE-25 | fu7 7.4 | Keine Rechenaufgabe zu Brutto/Netto bzw. Lohnabrechnung im WiSo-Teil. Prüfungsrelevant sind Entgeltabrechnung und Sozialversicherung eher qualitativ, eine einfache Rechenaufgabe fehlt dennoch. | Einfache Aufgabe mit vorgegebenen Abzugssätzen ergänzen (Rechenweg statt Rechtsstand). | zu prüfen |

### 3.4 Niedrig

| ID | Datei / Frage | Fehlerbeschreibung | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| FL-AE-26 | Q-8.2-21 | Gendern uneinheitlich („Ein Student/Studierende“). Weitere Auffälligkeiten bei Du/Sie und Gendern wurden in den Stichproben nicht notiert. | Vereinheitlichen. | belegt |
| FL-AE-27 | 8.2 gegen 10.2 | Randbedingungen zählt 8.2 zu den NFR, 10.2 trennt sie als „Einsatzumgebung“. | Einheitliche Gliederung festlegen. | belegt |
| FL-AE-28 | 10.2, andere | Portierbarkeit/Portabilität uneinheitlich. | Eine Schreibweise. | belegt |
| FL-AE-29 | ae5 12.3 | Namensdoppelungen: Mira Kaya/Mira Kellner, Jonas Kramer/Jonas Reuter/Tim Reuter. | Namen ändern. | belegt |
| FL-AE-30 | K-6.2-17 | Doppelverneinung. | Umformulieren. | belegt |
| FL-AE-31 | F-AE1-01 TA2 | Akzeptanzkriterien-Beispiel nur für eine Story. | Ein zweites Beispiel oder Hinweis. | belegt |
| FL-AE-32 | 9.1 | Richtwerte 5/7 Wochen (Rahmenplan) wirken wie eine Spaltenzuordnung. | Zuordnung der Wochen zu Phasen gegen die Quelle prüfen. | zu prüfen |
| FL-AE-33 | Q-10.2-11, Q-11.2-11 | Zu offensichtlich bzw. triviale Dopplung zu K-11.2-02. | Ersetzen/streichen. | belegt |
| FL-AE-34 | Q-11.2-14 (Kurzantwort) | Akzeptiert nur „Bre“; Eingabe mit Anführungszeichen oder Varianten kann ablehnen. | Akzeptierte Antworten ergänzen. | zu prüfen |
| FL-AE-35 | 8.3 | ISO 9241-110 wird mit den klassischen sieben Grundsätzen erklärt (die Fassung von 2020 formuliert anders; im Text erwähnt). | Fassungsdatum nennen. R4 beachten. | belegt |
| FL-AE-36 | fu1 1.1 | Theorie verweist auf das App-Werkzeug „Netzplan-Trainer“ (Drift-Risiko zwischen Theorie und App). | Verweis allgemein halten. | belegt |
| FL-AE-37 | fu2, fu6, fu7 | Redundanz bei DSGVO-Grundsätzen, Social Engineering und POUR in mehreren Themen. | Querverweise statt Wiederholung. | belegt |

### 3.5 Hinweise (kein Mangel)

| ID | Beobachtung |
|---|---|
| FL-AE-H1 | Alle Rechnungen sind korrekt (Netzplan, TCO, Nutzwertanalysen, Verfügbarkeit 99,80 %/52,6 min, RAID, Subnetze, Amortisation, Soll-Ist-Vergleiche, Fallaufgaben ae1, ae4, ae5, fu1, fu6). Python-Codebeispiele (11.1–11.3, 4.x) und alle SQL-Ergebnisse (11.4, 5.2) stimmen. |
| FL-AE-H2 | Die Prüfungsstruktur nach FIAusbV (Teil 1; Teil 2 mit Projekt 50 %, Planen eines Softwareproduktes, Algorithmen, WiSo, mündliche Ergänzungsprüfung) ist in 12.1 korrekt wiedergegeben. |
| FL-AE-H3 | Fallaufgaben sind betrieblich plausibel, mit Punkten und Musterlösungshinweisen, und decken die Bloom-Stufen sinnvoll ab. |
| FL-AE-H4 | Die Fachgespräche in fu6 sind sinnvoll nach Thema gruppiert und beziehen sich auf das eigene Projekt. |

## 4. Lücken gegenüber FIAusbV/Rahmenplan

| Prüfungsbereich | Abdeckung | Lücke |
|---|---|---|
| Teil 1: Einrichten eines IT-gestützten Arbeitsplatzes (fu2, fu3, fu5, fu6) | Kern abgedeckt (Beschaffung, Netzwerk, Sicherheit, Datenschutz, QS) | Zahlensysteme/Datenmengen (FL-AE-07); Übertragungsraten fehlen als Theorie |
| Teil 2: Planen eines Softwareproduktes (ae1–ae3) | gut abgedeckt (Anforderungen, Vorgehensmodelle, UML, Tests, Nutzwertanalyse) | Begriffsklarheit Testart/Testverfahren (FL-AE-02); Redundanz 9.2/10.3 |
| Teil 2: Entwicklung und Umsetzung von Algorithmen (ae4) | Kontrollstrukturen, Datenstrukturen, SQL gut | Sortierverfahren (FL-AE-05); Aktivitätsdiagramm als Darstellung (FL-AE-11); OO-Konzepte (FL-AE-06) |
| Teil 2: WiSo (fu7, fu1, fu2) | Berufsbildung, Arbeitsrecht, Betriebsverfassung, Unternehmensformen, Arbeitsschutz | Rechenaufgabe Entgelt (FL-AE-25); Rechtsstand R4 (FL-AE-10) |
| Betriebliches Projekt (ae5) | Projektantrag, Dokumentation, Präsentation, Fachgespräch gut | keine wesentliche Lücke |
| Mündliche Ergänzungsprüfung | indirekt über Fachgesprächsfragen | Kein eigenes Format; für 2:1-Gewichtung kein Hinweis |

## 5. Didaktische Empfehlungen

1. MC-Optionen mischen und Längenbias beseitigen (FL-AE-01). Das ist die wirkungsvollste Einzelmaßnahme für die Quizqualität.
2. Vor jedem Spiel/Werkzeug die zugehörige Theorie prüfen und ergänzen (R5), insbesondere Sortieren/Suchen, OO-Konzepte, Zahlensysteme/Datenmengen.
3. Redundanz abbauen: 10.3 und 11.3 sollten nicht die Teststufen/Äquivalenzklassen aus 9.2 wiederholen, sondern auf Anwendungsaufgaben (Testfälle ableiten) ausgerichtet sein.
4. Distraktoren aus echten Fehlvorstellungen bilden, absurde Alternativen entfernen.
5. Das Schwierigkeitslabel an tatsächlichen Anspruch koppeln (mit Pilotdaten der Lernenden prüfen).
6. Begriffsglossar zu strittigen Begriffen (Testart/Testverfahren, Entwurfs-/Architekturmuster, Modul-/Komponententest, DQL/DML) mit „So verwendet es der Kurs“ ergänzen.
7. Mehr Rechenwege im WiSo-Teil (Entgelt) und Aktivitätsdiagramm-Übungen zur Algorithmen-Darstellung.

## 6. Passung der Instrumente, Spiele und Werkzeuge

Quelle: `KURS_ANGEBOT` und `KURS_ENTWURF` in `packages/shared/src/kurs-angebot.ts`.

| Element | Status im Angebot | Theorie vorhanden? | Bewertung |
|---|---|---|---|
| Instrumente Kern: gantt, hierarchie, schutzziele, sql, scrum, uml, teststufen, ermodell, normalisierung, ablauf, git, muster, klassenbeziehungen, testverfahren | sichtbar | ja (8.2, 9.2, 9.3, 8.4, 5.2, 11.4, 1.1, 4.3, 6.1) | passend; Auflagen FL-AE-02/03/04/09/18 (Begriffe, Mehrdeutigkeit) |
| Instrumente Grundlagen: pdca, risiko, osi | sichtbar | ja (6.3, 12.1, 3.1) | passend; Risikomatrix-Zonen gegen Strategien abgleichen (FL-AE-18) |
| Werkzeuge: wirtschaftlichkeit, sqluebung, testfaelle, verfuegbarkeit, schreibtischtest, algorithmen | sichtbar | ja | passend; Schreibtischtest braucht Sortier-/Schleifentheorie (FL-AE-05/06) |
| Spiele: bughunt standard, schleifen, objektorientierung, sql-fehler | sichtbar | teilweise | Schleifen/OO: R5-Lücke (FL-AE-06) |
| Spiel: codereihenfolge | sichtbar | ja (11.1–11.3) | passend |
| Spiel: kennzahlen_duell sql | sichtbar | ja (11.4) | passend |
| Spiel: rechensprint it-rechnen (Grundlagen) und zahlensysteme (Grundlagen) | sichtbar | nein | R5-Lücke (FL-AE-07) |
| Spiel: rechensprint algorithmen (Kern; Sortieren/Suchen) | sichtbar | nur 1 Absatz | R5-Lücke (FL-AE-05) |
| `KURS_ENTWURF`: authfaktoren, kryptobausteine, angriffsarten | unsichtbar (Entwurf) | 6.1 vorhanden | vor Freischaltung die Zonenfragen gegen Q-6.1-22/Q-6.1-02/-15 (FL-AE-08/12) abgleichen |

## 7. Positiv hervorzuheben

- Fachlich sehr saubere Rechen- und Codebeispiele ohne gefundenen Fehler.
- Durchgängiger betrieblicher Bezug (Brevanta IT-Systemhaus GmbH) und prüfungsnahe Fallaufgaben mit Punktevergabe.
- Prüfungsstruktur nach FIAusbV korrekt und für Lernende verständlich beschrieben.

## 8. Empfohlene Reihenfolge der Auflagen

1. FL-AE-01 (technische Maßnahme, großer Hebel).
2. FL-AE-02, -03, -08, -12, -13, -17, -18 (Begriffe angleichen, geringer Aufwand).
3. FL-AE-05, -06, -07, -04, -16 (R5-Lücken schließen oder Spiele/Fragen entfernen).
4. FL-AE-09, -14, -21, -22 (Mehrdeutigkeiten beheben).
5. FL-AE-10 (Rechtsprüfung einplanen, § 38 BDSG beobachten).
6. FL-AE-15, -19, -20 (Qualitätspflege).

## 9. Nicht geprüft / Grenzen

- Rechtsnahe Inhalte (DSGVO, BDSG, UWG, BBiG, ArbZG, BUrlG, BetrVG, JArbSchG, BFSG/BITV, ISO 9241, BSI/ISO-Normen) wurden nur gegen Fachwissen gelesen. Sie sind unter R4 weiterhin ungeprüft und dürfen nicht als „geprüft“ ausgewiesen werden.
- Die Websuche beschränkte sich auf den Rechtsstand § 38 BDSG; die Quelle ist eine Sekundärquelle.
- Kursprofil und Katalogstand (Streichung Struktogramm/PAP, neue Themen wie Sortierverfahren, BPMN, Anomalien, Kerberos) beruhen auf Sekundärquellen und sind nicht gegen die aktuellen Original-Kataloge der IHK geprüft.
- Bug-Hunt-Snippets (Java/C#/Python in den Spielen) ließen sich nicht ausführen, da im Code keine Aufrufe vorhanden sind; geprüft wurde nur die Plausibilität von Code und Erklärung.
- Die UI-Darstellung (Anzeige, Mischen von Optionen) wurde nur im Quelltext nachvollzogen, nicht in der laufenden App getestet.
- Stichprobenartig geprüft: Glossare und ein Teil der Fachgesprächs-Fragen (fu6 gelesen, andere gesichtet); Du/Sie und Gendern nur per Skript und Stichprobe.
- Pilotdaten der Lernenden lagen nicht vor; Schwierigkeitseinschätzungen sind Fachurteile.
