---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: DP5
fachgebiet_title: "Planen und Durchführen eines Projektes der Datenanalyse"
thema_code: "DP5-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Situationen im Prüfungsbereich „Planen und Durchführen eines Projektes der Datenanalyse“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 28 und § 32 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DP5 (12.1–12.3) zu zusammenhängenden Situationen aus dem Alltag der Datenanalyse bei der Brevanta IT-Systemhaus GmbH, wie sie rund um die betriebliche Projektarbeit (Projektbeschreibung, Durchführung, Dokumentation, Präsentation und Fachgespräch) typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-DP5-01 · Fallaufgabe

**Themenbezug:** 12.1 (Projektbeschreibung, Anforderungsanalyse, Zeitplan, Datenschutz und Freigaben)

**Ausgangssituation:** Jonas Eberle, Umschüler zum Fachinformatiker in der Fachrichtung Daten- und Prozessanalyse, möchte als betriebliche Projektarbeit eine Kundensegmentierung für den Online-Shop der Fennmoor Gartenbedarf GmbH durchführen. Die Marketingleiterin von Fennmoor wünscht sich Klarheit darüber, welche Kundengruppen es gibt und welche Gruppen gezielt angeschrieben werden sollen. Jonas hat folgenden Entwurf für die Projektbeschreibung erstellt:
Titel: Kundenanalyse für Fennmoor
Ausgangssituation: Fennmoor möchte seine Daten besser nutzen.
Projektziel: Mit Hilfe von Data Science sollen die Kunden analysiert und eine bessere Marketingstrategie entwickelt werden.
Zeitplanung:
```
Arbeitspaket                                  | Stunden
Einarbeitung in Python und Bibliotheken       |   6
Datenbeschaffung                              |  10
Datenbereinigung                              |  12
Clusteranalyse                                |  10
Dashboard für das Marketing                   |   8
Dokumentation                                 |   6
```
Weitere Informationen aus Gesprächen: Es liegen Bestelldaten der letzten zwei Jahre vor (ca. 85.000 Bestellungen von ca. 14.000 Kunden) mit Name, Anschrift, E-Mail-Adresse, Geburtsdatum, Bestellpositionen und Bestelldatum. Ein Export der Daten wurde noch nicht angefordert; die Datenschutzbeauftragten sind nicht informiert. Die Prüfungszeit für Projektarbeit und Dokumentation beträgt in dieser Fachrichtung höchstens 40 Stunden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie Ausgangssituation und Projektziel im Entwurf: Welche Mängel weisen sie auf, und welche Angaben fehlen?

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Prüfen Sie den Zeitplan: Berechnen Sie die Gesamtstundenzahl, benennen Sie die Abweichung vom zulässigen Rahmen und schlagen Sie einen korrigierten Zeitplan einschließlich Puffer vor. Nennen Sie außerdem, was zusätzlich zur Stundenkürzung erforderlich ist.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Formulieren Sie ein überarbeitetes Projektziel mit mindestens einem überprüfbaren Muss-Ziel (mit zwei Erfolgskriterien), einem Kann-Ziel und einer Abgrenzung.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Planung hinsichtlich Datenschutz und Freigaben und nennen Sie Maßnahmen, die vor Beginn der Datenanalyse zu veranlassen und im Zeitplan zu berücksichtigen sind.

**Musterlösungshinweise:** Teilaufgabe 1: Die Ausgangssituation ist unkonkret — es fehlen der Ist-Zustand (wie werden Kunden heute angesprochen, welche Daten liegen vor), das konkrete Problem mit Auswirkungen (z. B. Streuverluste, hohe Kosten je Aktion), Umfeld und Auftraggeber sowie der Datenbestand. Das Ziel ist nicht überprüfbar („analysiert", „besser"); es fehlen Zielgröße, Erfolgskriterien, Vergleichsmaßstab, Muss- und Kann-Ziele und eine Abgrenzung. „Marketingstrategie entwickeln" überschreitet zudem den Auftrag einer Datenanalyse, denn die Strategie ist Aufgabe des Marketings; die Analyse liefert Grundlagen. Teilaufgabe 2: 6 + 10 + 12 + 10 + 8 + 6 = 52 Stunden; das sind 12 Stunden (30 %) mehr als die höchstens zulässigen 40 Stunden. Ein möglicher korrigierter Plan: Anforderungsanalyse und Planung 4, Datenbeschaffung und Datenverständnis 5, Datenaufbereitung 9, Clusteranalyse und Bewertung 9, Ergebnisaufbereitung und Empfehlungen 3, Dokumentation 8, Puffer 2 = 40 Stunden. Die Einarbeitung ist keine Projektleistung im Prüfungsrahmen bzw. gehört nur im notwendigen Umfang in die Planung, das Dashboard wird zum Kann-Ziel oder entfällt. Stunden zu kürzen genügt nicht — der Projektumfang muss mit reduziert und zwischen Muss- und Kann-Zielen getrennt werden; die Dokumentation darf nicht auf Kosten der Qualität gekürzt werden. Teilaufgabe 3: Beispiel Muss-Ziel: Aus den Bestelldaten der letzten 24 Monate werden Kundensegmente gebildet (3 bis 6 Segmente), von denen jedes mindestens 5 % der aktiven Kunden umfasst und durch Kennzahlen (Bestellhäufigkeit, durchschnittlicher Warenkorbwert, Zeit seit der letzten Bestellung) beschrieben ist. Erfolgskriterium 1: Die Marketingleitung bestätigt in einem Abnahmetermin, dass die Segmente nachvollziehbar und für die Ansprache nutzbar sind. Erfolgskriterium 2: Eine Wiederholung der Analyse auf einer zufälligen Teilmenge der Daten liefert vergleichbare Segmente (Stabilitätsprüfung). Kann-Ziel: Je Segment ein Vorschlag für die Ansprache oder ein einfaches Dashboard. Abgrenzung: kein Versand von Kampagnen, keine Echtzeit-Auswertung, keine Personalisierung auf Einzelpersonenebene. Teilaufgabe 4: Die Planung ist in diesem Punkt unzureichend. Die Daten enthalten personenbezogene Angaben (Name, Anschrift, E-Mail, Geburtsdatum), obwohl für eine Segmentierung pseudonymisierte Kundennummern und abgeleitete Merkmale (z. B. Altersklasse) genügen — Datenminimierung. Vor Beginn zu veranlassen: Freigabe des Datenzugriffs durch den Dateneigner (Fennmoor), Klärung von Zweck und Rechtsgrundlage der Verarbeitung, Einbindung der Datenschutzbeauftragten (Fennmoor und Brevanta), gegebenenfalls Vereinbarung zur Auftragsverarbeitung, Festlegung von Speicherort, Zugriffsrechten und Löschung, Pseudonymisierung beim Export. Die Freigabe wird als Meilenstein und Risiko (Verzögerung) in den Zeitplan aufgenommen, weil sie auf dem kritischen Pfad liegt. In der vorliegenden Form sollte die Projektbeschreibung noch nicht beim Prüfungsausschuss eingereicht werden.

---

#### F-DP5-02 · Fallaufgabe

**Themenbezug:** 12.2 (Methodenwahl, Gütemaße, Interpretation, Wirtschaftlichkeit, Validität)

**Ausgangssituation:** Leyla Hartung, Auszubildende bei der Brevanta IT-Systemhaus GmbH, untersucht für die Kramer Kunststofftechnik GmbH Ausfälle von Spritzgussmaschinen. Ziel: Für jede Maschine und jede Woche soll vorhergesagt werden, ob innerhalb der nächsten sieben Tage ein ungeplanter Ausfall eintritt (Klassifikation). Als Merkmale dienen Sensordaten (Temperatur, Druck, Schwingungen) und Wartungshistorie. Die Daten stammen von 10 Maschinen über 20 Wochen (200 Maschinen-Wochen) und wurden vollständig als Testmenge ausgewertet, die das Modell nicht gesehen hat. Ergebnis der Auswertung:
```
                                   tatsächlich      tatsächlich
                                   Ausfall          kein Ausfall
Modell sagt Ausfall vorher               18               12
Modell sagt keinen Ausfall vorher         6              164
```
Kosten laut Kunde: Ein ungeplanter Ausfall kostet im Mittel 4.800 € (Produktionsstillstand, Reparatur). Ein vorbeugender Wartungseingriff nach Alarm kostet 450 €, unabhängig davon, ob der Alarm berechtigt war. Annahme für die Rechnung: Wird nach einem berechtigten Alarm rechtzeitig gewartet, tritt der Ausfall nicht ein. Vergleichsverfahren (Baseline): Bisher wird nur nach einem Ausfall repariert.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie aus der Konfusionsmatrix Accuracy, Precision und Recall (in Prozent) und geben Sie den Rechenweg an.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Das Modell erreicht eine Accuracy von 91 %. Ein Kollege meint, das sei „sehr gut". Analysieren Sie diese Aussage, indem Sie die Accuracy der trivialen Vorhersage „nie Ausfall" berechnen und erklären, warum Precision und Recall hier aussagekräftiger sind.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Berechnen Sie die Gesamtkosten im Testzeitraum (a) ohne Modell (nur Reparatur nach Ausfall) und (b) mit Modell (Wartung nach jedem Alarm) sowie die Ersparnis in Euro.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Belastbarkeit des Ergebnisses und formulieren Sie eine vorsichtige Empfehlung an den Kunden. Nennen Sie mindestens vier Aspekte (Grenzen und mögliche Fehlerquellen) sowie einen Vorschlag für das weitere Vorgehen.

**Musterlösungshinweise:** Teilaufgabe 1: Accuracy = (18 + 164) / 200 = 182 / 200 = 91 %. Precision = 18 / (18 + 12) = 18 / 30 = 60 %. Recall = 18 / (18 + 6) = 18 / 24 = 75 %. Teilaufgabe 2: Tatsächlich gab es 24 Ausfälle und 176 Wochen ohne Ausfall. Die Vorhersage „nie Ausfall" wäre in 176 von 200 Fällen richtig, also Accuracy 88 % — ohne einen einzigen Ausfall zu erkennen. Das Modell liegt nur 3 Prozentpunkte darüber; die Accuracy täuscht bei stark unausgewogenen Klassen. Aussagekräftiger: Recall (75 % der Ausfälle werden erkannt, 25 % verpasst) und Precision (60 % der Alarme sind berechtigt, 40 % sind falscher Alarm); beides ist mit den Kosten der Fehlerarten zu verknüpfen. Teilaufgabe 3: (a) Ohne Modell: 24 Ausfälle × 4.800 € = 115.200 €. (b) Mit Modell: berechtigte Alarme 18 × 450 € = 8.100 €; falsche Alarme 12 × 450 € = 5.400 €; verpasste Ausfälle 6 × 4.800 € = 28.800 €; Summe 42.300 €. Ersparnis: 115.200 € − 42.300 € = 72.900 € (rund 63 %). Voraussetzung ist die genannte Annahme, dass rechtzeitige Wartung den Ausfall verhindert. Teilaufgabe 4: Die Ersparnis ist im Testzeitraum beachtlich, aber die Aussagekraft ist begrenzt: nur 20 Wochen und 10 Maschinen; nur 24 Ausfälle, wenige Fälle schwanken stark; ein einziger Testzeitraum ohne Wiederholung (Stabilität unklar); Saisonalität, Wartungsstrategien und Produktwechsel können sich ändern; die Annahme, dass jeder berechtigte Alarm einen Ausfall verhindert, ist optimistisch; möglicherweise Datenlecks (z. B. Merkmale, die erst nach Eintritt eines Ausfalls entstehen, wie Störmeldungen, Wartungstickets), die das Ergebnis verfälschen; Kostenwerte sind Mittelwerte. Empfehlung (vorsichtig): Das Modell ist im Testzeitraum deutlich besser als die reine Reaktion und eignet sich für einen begrenzten Pilotbetrieb mit begleitender Messung (Recall, Precision, Kosten) über einen längeren Zeitraum; Alarmschwelle gegebenenfalls anpassen, da ein verpasster Ausfall viel teurer ist als ein falscher Alarm; Prüfung auf Datenlecks; regelmäßige Neubewertung des Modells (Pflegekonzept).

---

#### F-DP5-03 · Fallaufgabe

**Themenbezug:** 12.2 (Dokumentation) + 12.3 (Präsentation, Fachgespräch)

**Ausgangssituation:** Daniel Okafor, Umschüler zum Fachinformatiker in der Fachrichtung Daten- und Prozessanalyse, hat für die Corvian Softwarehaus GmbH 4.200 Support-Tickets des letzten Jahres ausgewertet: Zuordnung der Tickets zu Themen (per Schlüsselwort-Regelwerk), Bearbeitungsdauer je Thema und Anteil wiederholter Anfragen. Ergebnis: Das Thema „Login/Zugang" macht 31 % der Tickets aus; häufige Wiederholungsanfragen betreffen dieses Thema. Seine Dokumentation (Entwurf) hat folgendes Inhaltsverzeichnis:
```
1 Einleitung                                       1 Seite
2 Installation von Python und JupyterLab           5 Seiten
3 Quellcode des Auswertungsskripts                14 Seiten
4 Ergebnisse                                       2 Seiten
5 Fazit                                         0,5 Seiten
Anhang: Screenshot der Ticketliste (mit Kundennamen und E-Mail-Adressen)
```
Die Einleitung lautet: „Corvian möchte Tickets auswerten." Das Fazit lautet: „Das Projekt war ein voller Erfolg." Es gibt weder Angaben zur Datenherkunft, zur Aufbereitung oder zur Begründung des Schlüsselwort-Verfahrens noch einen Soll-Ist-Vergleich; laut Zeiterfassung dauerte die Datenaufbereitung etwa doppelt so lang wie geplant. Die Präsentation soll nach den Vorgaben der Verordnung höchstens 15 Minuten dauern; anschließend folgt das Fachgespräch. Zur Treffsicherheit der Themenzuordnung liegt eine manuelle Stichprobe vor: Von 100 zufällig gezogenen Tickets waren 82 korrekt zugeordnet; Fehler traten vor allem bei Tickets auf, die mehrere Themen berühren.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie das Inhaltsverzeichnis und die genannten Textstellen: Nennen Sie mindestens fünf Mängel der Dokumentation und begründen Sie jeweils kurz, warum sie problematisch sind.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Entwerfen Sie eine überarbeitete Gliederung der Dokumentation (Kapitel mit Kerninhalten, Hinweise zu Anhang und Datenschutz).

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Planen Sie die 15-minütige Präsentation: Erstellen Sie ein Zeitbudget je Block (Summe höchstens 15 Minuten) und formulieren Sie für drei Ergebnisfolien Aussagetitel.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Im Fachgespräch fragt ein Mitglied des Prüfungsausschusses: „Wie belastbar ist Ihre automatische Zuordnung der Tickets zu Themen, und warum haben Sie kein maschinelles Lernverfahren eingesetzt?" Entwerfen und bewerten Sie eine Antwort in vier Bausteinen (Kernaussage, Begründung, Alternativen, Ergebnis und Grenzen) unter Verwendung der Angaben aus der Ausgangssituation.

**Musterlösungshinweise:** Teilaufgabe 1: (1) Datenherkunft, Datenstand und Berechtigung fehlen — Ergebnisse sind nicht nachvollziehbar. (2) Keine Beschreibung der Datenaufbereitung und -qualität, obwohl sie den größten Aufwand verursachte. (3) Das Verfahren (Schlüsselwort-Regelwerk) wird nicht begründet, Alternativen fehlen. (4) Installation von Software (5 Seiten) und vollständiger Quellcode (14 Seiten) statt Begründung und Ergebnisse; Quellcode gehört ausgewählt in den Anhang. (5) Ergebnisse umfassen nur 2 Seiten, ohne Vergleichsmaßstab, Interpretation, Grenzen oder Visualisierungshinweise; die Treffsicherheit (82 % in der Stichprobe) wird nicht genannt. (6) Es fehlen Projektziel, Erfolgskriterien und Abgleich mit der genehmigten Projektbeschreibung. (7) Der Soll-Ist-Vergleich fehlt; die Abweichung bei der Datenaufbereitung wird nicht erklärt. (8) Das Fazit ist eine unbelegte Behauptung ohne Reflexion und Optimierungsempfehlungen (Wirtschaftlichkeit/Nutzen fehlt ebenfalls). (9) Der Screenshot im Anhang enthält Kundennamen und E-Mail-Adressen — Datenschutzverstoß; anonymisieren bzw. weglassen. (10) Die Einleitung ist zu knapp (kein Ist-Zustand, kein Problem). Teilaufgabe 2: Mögliche Gliederung: Deckblatt, Inhaltsverzeichnis, Kurzfassung; 1 Ausgangssituation und Projektziel (Ist-Zustand, Problem, Muss-/Kann-Ziele, Abgrenzung); 2 Anforderungsanalyse (Analysefragen, Kennzahlen, Erfolgskriterien); 3 Projektplanung (Phasen, Zeitplan, Risiken, Datenschutz und Freigaben); 4 Daten (Herkunft, Stand, Datenwörterbuch, Berechtigung); 5 Datenaufbereitung und -qualität (Kennzahlen, Bereinigung mit Begründung); 6 Methodenwahl und Durchführung (Regelwerk, Alternativen, Annahmen, Stichprobenprüfung); 7 Ergebnisse und Interpretation (Visualisierungen, Vergleich, Grenzen); 8 Optimierungsvorschläge und Nutzen (z. B. Self-Service-Hilfe zu Login-Problemen, Kennzahlen); 9 Soll-Ist-Vergleich, Fazit und Reflexion; Verzeichnisse. Anhang: Datenwörterbuch, ausgewählte Code-Auszüge, Protokolle; keine personenbezogenen Daten, Screenshots anonymisieren. Teilaufgabe 3: Beispiel: Einstieg und Problem 2 Min.; Ziel und Anforderungen 1 Min.; Daten und Aufbereitung (Qualität, Aufwand) 3 Min.; Methode und Ergebnisse 5 Min.; Optimierung und Nutzen 2 Min.; Soll-Ist und Fazit 2 Min. = 15 Minuten (alternativ mit Zeitpuffer 13 bis 14 Minuten). Aussagetitel z. B.: „Fast jedes dritte Ticket (31 %) betrifft Login und Zugang"; „Wiederholungsanfragen zu Login binden überdurchschnittlich viel Bearbeitungszeit" (falls so belegt); „82 von 100 geprüften Tickets wurden korrekt zugeordnet — Mehrfachthemen sind die Schwachstelle". Titel müssen die Botschaft nennen, nicht nur „Ergebnisse". Teilaufgabe 4: Kernaussage: Ich habe ein regelbasiertes Schlüsselwortverfahren eingesetzt, dessen Treffsicherheit ich an einer Stichprobe geprüft habe. Begründung: Das Verfahren ist für den Kunden nachvollziehbar und im Zeitrahmen von 40 Stunden umsetzbar; Themenlisten lassen sich fachlich abstimmen. Alternativen: Ein überwachtes Lernverfahren würde manuell gelabelte Tickets in größerer Zahl benötigen, die nicht vorlagen; Aufwand und Erklärbarkeit sprachen dagegen; bei größerem Datenbestand ist es eine Option. Ergebnis und Grenzen: In einer Zufallsstichprobe von 100 Tickets waren 82 korrekt (82 %); bei Tickets mit mehreren Themen ist die Zuordnung unscharf; 100 Tickets sind eine kleine Stichprobe, die Treffsicherheit könnte je nach Thema schwanken; Empfehlung: Stichprobe vergrößern und je Thema auswerten. Bewertung: Die Antwort ist überzeugend, wenn sie konkrete Zahlen nennt, die Wahl am eigenen Projekt begründet, Alternativen abwägt und Grenzen offen benennt, ohne die Ergebnisse als gesichert darzustellen; schwach wären allgemeine Aussagen („einfacher ist besser") oder Ausweichen.
