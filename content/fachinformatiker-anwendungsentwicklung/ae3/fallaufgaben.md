---
kurs_slug: fachinformatiker-anwendungsentwicklung
fachgebiet_code: AE3
fachgebiet_title: "Planen eines Softwareproduktes"
thema_code: "AE3-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen im schriftlichen Prüfungsbereich „Planen eines Softwareproduktes“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 13 (Prüfungsbereich Planen eines Softwareproduktes) — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen die Themen 10.1 bis 10.3 zu zusammenhängenden Kundenszenarien rund um die Brevanta IT-Systemhaus GmbH, wie sie im schriftlichen Prüfungsbereich „Planen eines Softwareproduktes" (90 Minuten) typisch sind: Auswahl von Entwicklungsumgebung und Bibliotheken, Spezifikation, Oberflächenkonzept und Qualitätskontrolle. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-AE3-01 · Fallaufgabe

**Themenbezug:** 10.1 (Bibliotheksauswahl, Lizenz) + 10.2 (Funktionsspezifikation, Eingabemaske) + 10.3 (Testfallableitung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH entwickelt für die Hollmann Haustechnik GmbH, einen Heizungs- und Sanitärbetrieb mit 60 Beschäftigten, ein Kundenportal. Endkunden sollen darüber Wartungstermine für ihre Heizungsanlage buchen und Wartungsprotokolle als PDF herunterladen können. Die Software wird als Webanwendung im Rechenzentrum der Hollmann Haustechnik betrieben; Brevanta übergibt Quelltext und Installationspaket und ist danach nur noch für Wartungsverträge zuständig. Projektleiterin Nadine Albers lässt das Team zunächst die Bibliothek für die PDF-Erzeugung auswählen. Zwei Kandidaten stehen zur Wahl:
- Bibliothek P: permissive Open-Source-Lizenz, letzte Version vor drei Monaten, mittelgroße Community, solide Dokumentation, im Team noch nicht eingesetzt.
- Bibliothek Q: Open-Source-Lizenz mit starkem Copyleft, letzte Version vor zwei Wochen, sehr große Community, im Team seit Jahren bekannt.
Für die Terminbuchung gelten folgende Regeln aus dem Lastenheft: Die Buchung ist nur für angemeldete Kunden möglich. Das Wunschdatum muss frühestens morgen und spätestens in 90 Tagen ab heute liegen. Der Anlass ist „Wartung" oder „Störung". Freie Termine werden aus dem Terminkalender der Hollmann Haustechnik gelesen; ist der gewählte Termin zwischenzeitlich vergeben, muss die Buchung abgelehnt werden.

**Teilaufgabe 1 (5 Punkte, bloom: bewerten):** Bewerten Sie die Bibliotheken P und Q anhand von mindestens vier geeigneten Kriterien unter Berücksichtigung der Szenario-Angaben und sprechen Sie eine begründete Empfehlung aus.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Legen Sie die Spezifikation der Funktion „Termin buchen" fest: Eingaben mit Datentyp und Wertebereich, Rückgabe sowie mindestens drei Fehlerfälle mit jeweils vorgesehenem Verhalten.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Konzept für die Eingabemaske „Termin buchen": Beschreiben Sie Aufbau und Eingabeelemente, nennen Sie Maßnahmen zur Eingabevalidierung (inklusive der Frage, wo geprüft wird) und formulieren Sie zwei gut verständliche Fehlermeldungen.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** Leiten Sie aus der Regel für das Wunschdatum mindestens fünf Testfälle mit konkreten Eingaben (bezogen auf „heute" als Tag 0) und erwartetem Ergebnis ab und benennen Sie das angewendete Verfahren.

**Musterlösungshinweise:** Teilaufgabe 1: Kriterien z. B. Lizenz (Q mit starkem Copyleft ist kritisch, weil Quelltext und Paket an den Kunden weitergegeben werden und das Offenlegungs- bzw. Lizenzpflichten auslösen kann; P permissiv, unkritisch), Pflege (beide aktuell), Community/Dokumentation (Q besser), Einarbeitung (Q besser, P erfordert Aufwand), Wartbarkeit; sinnvolle Empfehlung ist P bzw. zumindest eine vorherige Lizenzklärung für Q, mit Begründung, dass das Lizenzrisiko ein KO-Kriterium bzw. hoch zu gewichten ist und der Einarbeitungsaufwand überschaubar bleibt (Alternativ gut begründete Abwägung möglich); Teilaufgabe 2: z. B. Name und Zweck, Eingaben (Kunden-ID ganzzahlig, Pflicht, angemeldet; Wunschdatum Datum, Pflicht, Bereich morgen bis heute plus 90 Tage; Anlass Aufzählung WARTUNG oder STOERUNG, Pflicht), Rückgabe (Buchungsbestätigung mit Buchungsnummer), Fehlerfälle (nicht angemeldet; Datum außerhalb des Bereichs; Anlass unbekannt; Termin zwischenzeitlich vergeben; Terminkalender nicht erreichbar) jeweils mit Fehlercode, Meldung und Verhalten (keine Buchung, Eingaben bleiben erhalten, Protokollierung); Teilaufgabe 3: Feldliste mit Pflichtmarkierung, Datumsauswahl (Kalender mit gesperrten Tagen), Auswahl für Anlass, Abbrechen- und Buchen-Schaltfläche; Validierung clientseitig für schnelles Feedback und serverseitig zwingend; Fehlermeldungen konkret und konstruktiv (z. B. „Das Wunschdatum muss zwischen morgen und dem [Datum] liegen."), am Feld, Eingaben bleiben erhalten; Teilaufgabe 4: Äquivalenzklassenbildung und Grenzwertanalyse: z. B. Tag 0 (abgelehnt), Tag 1 (akzeptiert), Tag 90 (akzeptiert), Tag 91 (abgelehnt), Datum in der Vergangenheit (abgelehnt), ungültiges Format (abgelehnt, Fehlermeldung), leeres Feld (abgelehnt).

---

#### F-AE3-02 · Fallaufgabe

**Themenbezug:** 10.1 (Plattformentscheidung) + 10.2 (Lasten-/Pflichtenheft, Oberflächenkonzept) + 10.3 (Teststrategie, Abnahme)

**Ausgangssituation:** Im Bereich Smart-Factory-/IoT-Vernetzung der Brevanta IT-Systemhaus GmbH soll für die Keller Verpackungstechnik AG eine App entwickelt werden, mit der Schichtleiter an der Produktionslinie Störungen von Verpackungsmaschinen melden und den Bearbeitungsstand einsehen. Die Maschinensteuerungen liefern Störungsdaten über eine Schnittstelle als JSON. Die App wird auf Tablets in der Halle genutzt; die Beschäftigten tragen Arbeitshandschuhe, die Halle ist laut, die Lichtverhältnisse wechseln, und das WLAN hat einzelne Funklöcher. Der Kunde hat folgendes Lastenheft eingereicht (Auszug):
- Die App soll einfach und robust sein.
- Störungen sollen schnell gemeldet werden können.
- Die App soll alle wichtigen Maschinendaten anzeigen.
- Das System soll verfügbar sein.
Das Entwicklungsteam, das bisher hauptsächlich Webanwendungen gebaut hat, prüft, ob die App als Webanwendung im Browser der Tablets oder als native App für das Tablet-Betriebssystem umgesetzt werden soll. Gefordert ist ein Offline-Betrieb für kurze Funklöcher; neu gemeldete Störungen sollen nach Wiederverbindung nachsynchronisiert werden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie, warum die im Lastenheft-Auszug genannten Anforderungen als Grundlage für ein Pflichtenheft nicht ausreichen, und formulieren Sie für zwei der vier Aussagen je eine prüfbare Anforderung.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Bewerten Sie die beiden Umsetzungsvarianten (Webanwendung oder native App) anhand von mindestens vier Kriterien und treffen Sie eine begründete Entscheidung.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie das Konzept der Hauptmaske zur Störungsmeldung in Textform oder als einfache Skizze und begründen Sie Ihre Gestaltungsentscheidungen im Hinblick auf die genannten Einsatzbedingungen in der Halle.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Planen Sie die Qualitätskontrolle: Nennen Sie geeignete Teststufen und Testarten mit je einem konkreten Prüfgegenstand sowie mindestens drei Abnahmekriterien.

**Musterlösungshinweise:** Teilaufgabe 1: Die Aussagen sind unpräzise und nicht messbar („einfach", „robust", „schnell", „wichtige Daten", „verfügbar"), nicht eindeutig prüfbar und teils unvollständig (Wer? Welche Daten? Welcher Wert?); mögliche Formulierungen: „Eine Störungsmeldung muss mit höchstens drei Bedienschritten abgeschlossen werden können", „Das System muss während der Produktionszeiten eine Verfügbarkeit von mindestens 99 Prozent pro Monat erreichen", „Bei Verlust der WLAN-Verbindung bis zu 10 Minuten müssen erfasste Meldungen lokal gespeichert und nach Wiederverbindung übertragen werden"; Teilaufgabe 2: Kriterien z. B. Offline-Fähigkeit (nativ meist einfacher; Webanwendung nur mit zusätzlichem Aufwand), Team-Know-how (Web vorhanden), Wartbarkeit und Verteilung von Updates (Web einfacher), Zugriff auf Gerätefunktionen, Plattformunabhängigkeit, Lizenz- und Entwicklungskosten; beide Varianten können sinnvoll begründet werden, entscheidend ist der Bezug zu den Szenario-Angaben; Teilaufgabe 3: große Schaltflächen mit ausreichendem Abstand (Handschuhbedienung), kontrastreiche Darstellung auch bei wechselndem Licht, Information nicht nur über Farbe, wenige Pflichtangaben mit Auswahlfeldern statt Freitext, Störungsart und Maschine vorbelegt aus der Schnittstelle, deutliche Rückmeldung (optisch und ggf. haptisch) statt reiner Tonmeldung wegen Lärm, Statusanzeige für Offline-Zustand, Bestätigung der erfolgreichen Meldung, Abbrechen möglich; Teilaufgabe 4: Modultests (z. B. Verarbeitung der JSON-Störungsdaten), Integrationstest (Anbindung der Maschinenschnittstelle, Synchronisation), Systemtest (Gesamtfunktion, Offline-Szenario, Performance), Abnahmetest beim Kunden in der Halle (Feldtest mit Handschuhen); Testarten: funktional, Usability, Leistung, Regressionstests; Abnahmekriterien z. B. alle Muss-Anforderungen erfüllt, keine offenen kritischen Fehler, Meldung in höchstens drei Schritten, Verfügbarkeitsziel nachgewiesen, Einweisung und Dokumentation übergeben, Abnahmeprotokoll unterzeichnet.

---

#### F-AE3-03 · Fallaufgabe

**Themenbezug:** 10.1 (Abhängigkeitsverwaltung) + 10.2 (Schnittstelle, Datenstruktur, Oberfläche) + 10.3 (Review, Metriken, Testfälle)

**Ausgangssituation:** Das Analyse-Team der Brevanta IT-Systemhaus GmbH hat für die Nordhaff Getränkehandel GmbH einen Prototyp eines Absatzberichts entwickelt. Das Programm liest täglich eine CSV-Datei aus der Warenwirtschaft des Kunden ein, wertet Absatzzahlen je Artikel und Filiale aus und zeigt sie in einem Dashboard an. Bei der Durchsicht des Prototyps fallen dem neuen Teammitglied Tim Reuter folgende Punkte auf:
- Im Projekt sind alle Abhängigkeiten mit „neueste Version" eingetragen, eine Lock-Datei gibt es nicht; die eingebundene Diagramm-Bibliothek ist seit zwei Jahren nicht mehr aktualisiert worden, für sie sind Sicherheitslücken bekannt, und zu ihrer Lizenz gibt es im Projekt keine Notiz.
- Die CSV-Datei hat die Spalten Artikelnummer, Filiale, Datum, Menge und Umsatz. Fehlerhafte Zeilen (z. B. Menge als Text, fehlendes Datum) führen derzeit dazu, dass das Programm abbricht und die Meldung „Fehler 500" anzeigt.
- Im Dashboard sind Abweichungen nur durch rote und grüne Balken ohne Beschriftung dargestellt; die Schrift ist sehr klein; Filtereinstellungen werden nach jedem Fehler zurückgesetzt.
- Tests existieren bisher nicht; der Prototyp wurde nur manuell ausprobiert.
Das Team soll das Produkt nun als Grundlage für den Produktivbetrieb planen. Für eine der Auswertungsfunktionen, die die zyklomatische Komplexität 14 aufweist, soll eine Qualitätsmaßnahme eingeplant werden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Analysieren Sie die Risiken im Umgang mit den Abhängigkeiten und schlagen Sie vier konkrete Maßnahmen für eine geordnete Abhängigkeits- und Build-Verwaltung vor.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Legen Sie die Spezifikation der CSV-Schnittstelle fest: Spalten mit Datentyp und Format, Pflichtangaben, Regeln und das vorgesehene Verhalten bei fehlerhaften Zeilen (inklusive Rückmeldung an die Benutzer:innen).

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Analysieren Sie, gegen welche Grundsätze ergonomischer Gestaltung das beschriebene Dashboard verstößt, und nennen Sie je eine Verbesserungsmaßnahme.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Qualitätskontrollkonzept für den Import und die Auswertung: Nennen Sie je ein Beispiel für einen Modultest und einen Integrationstest, eine Review-Maßnahme, die Behandlung der Funktion mit Komplexität 14 sowie eine Kennzahl, mit der der Teststand für den Kunden dargestellt werden kann.

**Musterlösungshinweise:** Teilaufgabe 1: Risiken: nicht reproduzierbare Builds durch wechselnde Versionen, Sicherheitslücken in veralteter Bibliothek, unklare Lizenzlage (rechtliches Risiko), Abhängigkeit von einem nicht mehr gepflegten Projekt, aufgeblähter Abhängigkeitsbaum; Maßnahmen z. B. Versionen festlegen und Lock-Datei einchecken, Bibliothek durch gepflegte Alternative ersetzen oder aktualisieren (ggf. über eigene Schnittstellenschicht gekapselt), Lizenzen aller Abhängigkeiten erfassen und prüfen, regelmäßiger Abgleich mit bekannten Schwachstellen, Build automatisieren (CI), nur notwendige Abhängigkeiten aufnehmen; Teilaufgabe 2: z. B. Artikelnummer (Text, Pflicht, definiertes Format), Filiale (Text oder Schlüssel, Pflicht, muss bekannt sein), Datum (ISO-Format, Pflicht, nicht in der Zukunft), Menge (ganze Zahl, größer oder gleich 0, Pflicht), Umsatz (Dezimalzahl mit Punkt oder Komma festgelegt, größer oder gleich 0); Kodierung, Trennzeichen und Kopfzeile festlegen; fehlerhafte Zeilen werden übersprungen, protokolliert (Zeilennummer, Grund) und in einem Fehlerbericht angezeigt, der Import der gültigen Zeilen wird abgeschlossen, bei Überschreiten eines Schwellenwerts (z. B. mehr als 5 Prozent fehlerhaft) Abbruch mit klarer Meldung; Teilaufgabe 3: Selbstbeschreibungsfähigkeit/Barrierefreiheit (Information nur über Farbe, keine Beschriftung; Legende und Werte ergänzen), Lesbarkeit/Aufgabenangemessenheit (Schriftgröße erhöhen, Kontraste), Fehlertoleranz und Steuerbarkeit (Filter bleiben nach Fehlern erhalten, verständliche Fehlermeldung statt „Fehler 500"), Erwartungskonformität (Konsistenz der Darstellung); Teilaufgabe 4: Modultest z. B. Prüfung der Zeilenvalidierung mit Grenz- und Fehlwerten (Menge 0, -1, „abc", leeres Datum), Integrationstest z. B. Import-Datei bis zur Dashboard-Darstellung mit bekannter Testdatei; Review z. B. Code-Review mit Checkliste und statischer Codeanalyse vor der Übernahme in die Hauptlinie; Funktion mit Komplexität 14 aufteilen (Refactoring) und gründlich testen, da schwer testbar und wartbar; Kennzahlen z. B. Testfälle bestanden/fehlgeschlagen/offen, Anforderungsabdeckung, Fehler nach Schweregrad.
