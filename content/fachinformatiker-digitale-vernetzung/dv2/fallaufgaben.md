---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: DV2
fachgebiet_title: "Errichten, Ändern und Prüfen von vernetzten Systemen"
thema_code: "DV2-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Errichten, Ändern und Prüfen von vernetzten Systemen“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 6 Nr. 2 und Anlage (Ausbildungsrahmenplan) Abschnitt E lfd. Nr. 2 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DV2 (9.1–9.4) zu zusammenhängenden Situationen aus dem Alltag der Smart-Factory-/IoT-Vernetzung bei der Brevanta IT-Systemhaus GmbH, wie sie in den schriftlichen Prüfungsbereichen der Fachrichtung Digitale Vernetzung (z. B. „Diagnose und Störungsbeseitigung in vernetzten Systemen") typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte. Konfigurationsausschnitte und Tabellen sind in Festbreitenschrift dargestellt.

---

#### F-DV2-01 · Fallaufgabe

**Themenbezug:** 9.1 (Gateway konfigurieren), 9.2 (Serielle Parameter, Modbus, Skalierung), 9.3 (Zugangsdaten, Verschlüsselung), 9.4 (Testfälle, Änderungsprotokoll)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH bindet für die Kranz Umformtechnik GmbH die Presse 2 an das Produktions-Dashboard an. Auf einem RS-485-Bus hängen ein Temperaturmodul und ein Energiezähler (Modbus RTU). Ein Edge-Gateway (GW-Presse2) liest beide Geräte aus, rechnet die Rohwerte um und sendet sie per MQTT an einen Broker in der DMZ (10.10.50.10). Nach dem ersten Einschalten zeigt das Dashboard weder für die Temperatur noch für die Leistung brauchbare Werte, und im Gateway-Protokoll stehen Zeitüberschreitungen. Auszubildender Jonas Reuter soll die Konfiguration prüfen. Aus den Gerätedatenblättern liegt folgende Übersicht vor:

```
Gerät            | Busadresse | Übertragung                           | Register                   | Skalierung
Temperaturmodul  | 3          | 9600 Baud, 8 Datenbits, gerade, 1 Stopp | 100 = Temperatur in °C     | Rohwert x 0,1
Energiezähler    | 4          | 9600 Baud, 8 Datenbits, gerade, 1 Stopp | 20 = Wirkleistung in kW    | Rohwert x 0,01
```

Konfigurationsausschnitt des Gateways (Version 1.0):

```
# GW-Presse2, Konfigurationsausschnitt
[seriell]
schnittstelle      = RS-485
baudrate           = 19200
datenbits          = 8
paritaet           = keine
stoppbits          = 1
abfrageintervall_s = 2

[geraet.temperatur]
modbus_adresse     = 3
register           = 100
faktor             = 1
einheit            = grad_c
topic              = werk1/presse2/temperatur

[geraet.energie]
modbus_adresse     = 3
register           = 20
faktor             = 0.01
einheit            = kW
topic              = werk1/presse2/leistung

[mqtt]
broker             = 10.10.50.10
port               = 1883
benutzer           = admin
passwort           = admin
tls                = aus
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Vergleichen Sie die Konfiguration mit den Datenblättern und nennen Sie mindestens vier Fehler bzw. Schwachstellen. Begründen Sie jeweils kurz, welche Auswirkung sie haben.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Geben Sie die korrigierten Konfigurationszeilen für die gefundenen Kommunikations- und Skalierungsfehler an. Berechnen Sie anschließend, welche Werte das Dashboard anzeigt, wenn das Temperaturmodul den Rohwert 253 und der Energiezähler den Rohwert 1875 liefert, und wie viele Werte bei einem Abfrageintervall von 2 Sekunden pro Tag insgesamt anfallen (beide Messstellen zusammen).

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Bewerten Sie die MQTT-Einstellungen aus Sicht der IT-Sicherheit und beschreiben Sie, welche Änderungen Sie am Gateway und an der Firewall empfehlen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie vier Testfälle mit erwartetem Ergebnis, mit denen die korrigierte Anbindung vor Übergabe geprüft wird, und formulieren Sie einen Eintrag für das Änderungsprotokoll.

**Musterlösungshinweise:** Teilaufgabe 1: (1) Baudrate 19200 statt 9600 — Gateway und Geräte „sprechen" unterschiedlich schnell, es kommen keine gültigen Antworten an, Folge sind die Zeitüberschreitungen. (2) Parität „keine" statt „gerade" — selbst bei richtiger Baudrate würden Telegramme verworfen. (3) Der Energiezähler ist mit Busadresse 3 konfiguriert, die bereits das Temperaturmodul besitzt; richtig ist 4 — bei doppelter Adresse antworten falsche oder mehrere Geräte, Werte werden vermischt oder gehen verloren. (4) Faktor 1 statt 0,1 beim Temperaturmodul — Werte wären um den Faktor 10 zu groß. (5) Sicherheit: Standardzugangsdaten admin/admin, unverschlüsselte Verbindung über Port 1883 ohne TLS — Mitlesen und Manipulation möglich. Teilaufgabe 2: baudrate = 9600; paritaet = gerade; im Abschnitt geraet.energie modbus_adresse = 4; im Abschnitt geraet.temperatur faktor = 0.1. Rohwert 253 × 0,1 = 25,3 °C; Rohwert 1875 × 0,01 = 18,75 kW; (ohne Korrektur würde das Dashboard 253 °C anzeigen). Werte pro Tag: 86 400 Sekunden ÷ 2 s = 43 200 Abfragen je Messstelle, bei zwei Messstellen 86 400 Werte. Teilaufgabe 3: Bewertung: ungeschützte Übertragung und bekannte Standardzugangsdaten sind eine gravierende Schwachstelle, weil Prozessdaten mitgelesen und Nachrichten gefälscht werden können; das Risiko ist hoch bei geringem Behebungsaufwand. Empfehlung: TLS aktivieren und Port 8883 verwenden, eigene Zugangsdaten bzw. Zertifikate je Gerät statt admin/admin (im Passwortsafe verwalten), am Broker Berechtigungen je Topic einschränken (Gateway darf nur in seine Topics schreiben), Gateway baut die Verbindung ausgehend zum Broker auf; Firewall: Quelle Gateway, Ziel Broker, nur 8883/TCP erlauben, übrige Verbindungen verweigern (Default Deny); nicht benötigte Dienste am Gateway abschalten, Verwaltungszugang per SSH bzw. verschlüsselter Weboberfläche mit persönlichen Konten. Teilaufgabe 4: Beispiele: T-01 Kommunikation: beide Geräte (Adresse 3 und 4) antworten auf Abfrage, 0 Zeitüberschreitungen in 10 Minuten. T-02 Funktion: Temperaturmodul bei Referenztemperatur (z. B. 25 °C) — Anzeige 25 °C +/- 0,5 °C. T-03 Fehlerfall: Busleitung am Temperaturmodul abziehen — Alarm „Sensor/Gerät nicht erreichbar" in definierter Zeit, kein veralteter Wert als gültig. T-04 Failover: Verbindung zum Broker 10 Minuten trennen — Werte werden gepuffert und nachgeliefert. T-05 Sicherheit: Zugriff aus dem Büronetz auf das Gateway wird blockiert; TLS-Verbindung aktiv. Änderungsprotokoll-Beispiel: Nr., Datum, Person (J. Reuter), Komponente GW-Presse2, Änderung (Baudrate 19200 auf 9600, Parität keine auf gerade, Busadresse Energiezähler 3 auf 4, Faktor Temperatur 1 auf 0,1, MQTT mit TLS und eigenem Konto), Grund (Datenblattabgleich, Sicherheitsvorgabe), Version 1.0 auf 1.1, Tests T-01 bis T-05, Freigabe durch Betreiber, Rückfall: Sicherung der Version 1.0.

---

#### F-DV2-02 · Fallaufgabe

**Themenbezug:** 9.3 (Gefahrenpotenziale, Segmentierung, Remote-Zugriff, Datensicherung, Zugangsberechtigungen) + 9.1 (Härtung) + 9.4 (Dokumentation)

**Ausgangssituation:** Die Lindner Verpackungstechnik GmbH betreibt eine automatische Verpackungslinie und beauftragt die Brevanta mit einer Sicherheitsbewertung. Bei der Begehung fällt Folgendes auf: Alle Büro-PCs, die Verpackungslinie und das Gäste-WLAN hängen im selben Netz. Der Servicetechniker des Maschinenherstellers hat auf dem Bedien-PC der Linie eine Fernwartungssoftware installiert, die rund um die Uhr erreichbar ist; er nutzt ein gemeinsames Konto „service" mit einem Kennwort, das seit der Installation unverändert ist. Der Bedien-PC läuft mit einem Betriebssystem, das vom Hersteller nicht mehr mit Sicherheitsupdates versorgt wird. Rezepturen werden per USB-Stick vom Büro an die Linie gebracht. Das Steuerungsprogramm der SPS liegt nur auf dem Laptop des Servicetechnikers. Die Übersicht:

```
System                      | Adresse         | Bemerkung
Büro-PCs (30 Stück)         | 192.168.1.x     | gleiches Netz wie Maschinen
Bedien-PC Verpackungslinie  | 192.168.1.50    | nicht mehr unterstütztes Betriebssystem, Fernwartung dauerhaft aktiv
SPS Verpackungslinie        | 192.168.1.60    | Programm nur auf dem Laptop des Servicetechnikers
Gäste-WLAN                  | 192.168.1.x     | erreicht dasselbe Netz
```

Die Linie läuft im Dreischichtbetrieb, ein Stillstand kostet nach Angabe des Kunden mehrere tausend Euro pro Stunde. Die Geschäftsführung wünscht ein umsetzbares, möglichst wenig störendes Konzept.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Identifizieren Sie mindestens fünf Gefahrenpotenziale aus der Beschreibung und erläutern Sie jeweils, welcher Schaden daraus entstehen könnte.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Wählen Sie die drei dringendsten Gefahrenpotenziale aus und begründen Sie die Rangfolge anhand von Eintrittswahrscheinlichkeit, Schadensausmaß und Behebungsaufwand.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Konzept für die Segmentierung und die sichere Fernwartung. Nennen Sie die Zonen, drei konkrete Firewall-Regeln (mit Standardregel) und die Bausteine des Fernzugangs.

**Teilaufgabe 4 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Datensicherung, Updates und Berechtigungen geregelt werden sollten: Was wird gesichert, wann und wo? Wie gehen Sie mit dem nicht mehr unterstützten Betriebssystem um? Skizzieren Sie eine Berechtigungsmatrix für drei Rollen.

**Musterlösungshinweise:** Teilaufgabe 1: (1) Flaches Netz — ein infizierter Büro-PC oder ein Gerät im Gäste-WLAN erreicht Bedien-PC und SPS; möglich sind Manipulation oder Stillstand. (2) Dauerhaft aktive Fernwartung mit gemeinsamem, unverändertem Kennwort — Fremdzugriff auf die Anlage, keine Zuordnung von Handlungen zu Personen. (3) Nicht mehr unterstütztes Betriebssystem — bekannte Lücken bleiben offen, Schadsoftware kann sich ausbreiten. (4) USB-Stick als Transportweg — Einschleppen von Schadsoftware in die Produktion. (5) Steuerungsprogramm nur auf dem Laptop des Servicetechnikers — Datenverlust, lange Wiederanlaufzeit bei Defekt der SPS, Abhängigkeit vom Dienstleister. (6) Gäste-WLAN im Maschinennetz — unkontrollierter Zugang. Teilaufgabe 2: Plausible Rangfolge: 1. Fernwartung mit Sammelkonto (leicht aus dem Internet ausnutzbar, hoher Schaden, Behebung schnell möglich); 2. flaches Netz inklusive Gäste-WLAN (hohe Ausbreitungsgefahr, Behebung mit etwas Aufwand); 3. fehlende Sicherung des SPS-Programms (geringe Wahrscheinlichkeit pro Zeitraum, aber sehr hoher Stillstandsschaden, günstig zu beheben). Andere Gewichtungen sind zulässig, wenn die drei Kriterien nachvollziehbar angewendet werden; das nicht unterstützte Betriebssystem kann ebenfalls hoch priorisiert werden. Teilaufgabe 3: Zonen: Büro-IT, Gäste-WLAN (getrennt, nur Internet), Produktionsnetz (Verpackungslinie), DMZ mit Jumphost und VPN-Endpunkt. Regeln, z. B.: 1. Jumphost (DMZ) → Bedien-PC Verpackungslinie, nur der benötigte Dienst (z. B. verschlüsselter Remotezugriff), erlauben; 2. Büro-IT → Produktionsnetz, alle Dienste, verweigern; 3. Gäste-WLAN → alle internen Netze, verweigern; Standardregel: alle → alle, verweigern (Default Deny). Fernzugang: VPN des Dienstleisters in die DMZ, Zugriff nur über den Jumphost, persönliches Konto mit Mehr-Faktor-Authentifizierung, Freischaltung des Zugangs nur auf Anforderung und befristet mit Freigabe durch den Betreiber, Protokollierung, vertragliche Regelung der Pflichten; dauerhafte Fernwartungssoftware auf dem Bedien-PC entfernen. Teilaufgabe 4: Datensicherung: SPS-Programm, HMI-Projekt, Rezepturen, Konfigurationen der Netzwerkgeräte und Gerätelisten sichern — regelmäßig sowie nach jeder Änderung und vor jedem Update; 3-2-1-Regel, mindestens eine Kopie offline bzw. an anderem Ort, Versionsstand und Datum, Wiederherstellungstest; Sicherung nicht nur beim Dienstleister. Betriebssystem: kurzfristig kompensierend (Segmentierung, Zugriff nur über Jumphost, USB sperren, Überwachung), mittelfristig Ablösung oder Migration planen und mit Hersteller abstimmen; Updates nur nach Freigabe, Test und im Wartungsfenster. Rezepturtransport: gesicherter Übertragungsweg oder geprüfter, dedizierter Datenträger über eine Prüfstation. Berechtigungsmatrix z. B.: Bediener — Linie bedienen, keine Sollwert- oder Programmänderung; Instandhaltung — bedienen und Parameter ändern, kein Programm; Dienstleister — nur nach Freigabe befristet Programmänderung und Fernzugriff; persönliche Konten, minimale Rechte, regelmäßige Überprüfung, Austritt bzw. Vertragsende führt zum Entzug.

---

#### F-DV2-03 · Fallaufgabe

**Themenbezug:** 9.4 (Testkonzept, Fehlerbeseitigung, Inbetriebnahmeprotokoll, Übergabe) + 9.2 (Öffner/Schließer, Lasttest) + 9.1/9.3 (Ringredundanz, Firewall-Regeln)

**Ausgangssituation:** Für die Ostermann Logistiktechnik GmbH hat die Brevanta die Vernetzung der Fördertechnik in Halle 2 aufgebaut: Sechs Fördersegmente mit je einer Lichtschranke und einer Antriebssteuerung sind über drei Industrie-Switches in einer Ringstruktur verbunden. Ein Edge-Gateway sammelt die Daten und liefert sie an ein Dashboard; zusätzlich werden 48 Messstellen (Energie, Temperaturen, Taktzahlen) einmal pro Sekunde erfasst. Die Auszubildende Selin Demir hat vor der Inbetriebnahme einen Testplan abgearbeitet. Ergebnis:

```
ID   | Testart       | Erwartetes Ergebnis                                      | Ist-Ergebnis                  | Bewertung
T-01 | Kommunikation | alle 6 Segmentsteuerungen antworten                       | 6 von 6 antworten             | bestanden
T-02 | Funktion      | Lichtschranke Segment 4 löst "Teil erkannt" aus           | keine Meldung                 | fehlgeschlagen
T-03 | Failover      | nach Ringunterbrechung Umschaltung in unter 5 s           | Umschaltung nach 38 s         | fehlgeschlagen
T-04 | Sicherheit    | Zugriff aus dem Büronetz auf Segmentsteuerung blockiert   | Zugriff möglich               | fehlgeschlagen
T-05 | Last/Dauer    | 48 Messstellen, 1 Wert/s, 8 h, keine Lücken               | Daten vollständig, keine Lücken | bestanden
T-06 | Wiederanlauf  | Gateway nach Stromausfall in unter 2 min betriebsbereit   | 95 s                          | bestanden
```

Bei der Fehlersuche zu T-02 zeigt sich: Der Lichtschrankeneingang liefert im Ruhezustand (Strahl frei) eine 1 und bei unterbrochenem Strahl eine 0. Im Programm steht:

```
TEIL_ERKANNT := LICHTSCHRANKE_4
```

Bei T-04 findet sich in der Firewall oberhalb der Verweigerungsregel „Büro-IT → Produktion" noch die Regel „Büro-IT → alle, erlauben" aus der Testphase. Die Inbetriebnahme ist für den kommenden Montag im Wartungsfenster angesetzt; der Kunde möchte bei der Übergabe auch das Instandhaltungsteam eingewiesen haben.

**Teilaufgabe 1 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Kernpunkte eines Testkonzepts für dieses Projekt (Ziele und Umfang, Testarten mit je einem Beispiel, Testumgebung bzw. FAT/SAT, Sicherheitsregeln für den Test, Abschlusskriterien).

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie die drei fehlgeschlagenen Tests: Nennen Sie jeweils die wahrscheinliche Ursache, die Korrekturmaßnahme und den anschließenden Nachweis, dass der Fehler behoben ist. Berechnen Sie außerdem die Zahl der Werte, die T-05 insgesamt erfasst hat.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie die Inbetriebnahme am Montag abläuft, und nennen Sie die Inhalte des Inbetriebnahmeprotokolls, einschließlich der Angaben zu den heute noch offenen Punkten.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, ob die Übergabe und Abnahme am Montag stattfinden sollten, wenn die Korrekturen aus Teilaufgabe 2 erst teilweise umgesetzt sind. Beschreiben Sie, wie Einweisung und Dokumentation für Instandhaltung und Bedienpersonal gestaltet werden.

**Musterlösungshinweise:** Teilaufgabe 1: Ziele: Nachweis, dass Kommunikation, Funktionen, Redundanz und Sicherheit der Vernetzung den vereinbarten Anforderungen entsprechen; Umfang: neu errichtete Komponenten und Schnittstellen zu den bestehenden Anlagenteilen; ausdrücklich nicht getestet: interne Steuerungslogik der Antriebe. Testarten: Kommunikationstest (Erreichbarkeit aller Steuerungen), Funktionstest bzw. Signaltest (Lichtschranke bis Dashboard), Lasttest/Dauertest (48 Messstellen über 8 Stunden), Failover-Test (Ringunterbrechung, Gateway-Wiederanlauf, Ausfall der Verbindung zum Dashboard mit Puffern), Sicherheitstest (Firewall), Regressionstest nach Änderungen. Umgebung: FAT im Werkstattaufbau mit simulierten Signalen, SAT in der Halle im Wartungsfenster. Sicherheitsregeln: Not-Halt und Schutzeinrichtungen bleiben aktiv, riskante Tests zuerst in der Simulation, Tests nur mit befugten Personen und Freigabe des Betreibers, Elektroarbeiten durch Elektrofachkräfte. Abschlusskriterien: alle kritischen Testfälle bestanden, keine offenen Fehler hoher Schwere, Abweichungen dokumentiert und vom Kunden bewertet. Teilaufgabe 2: T-02: Der Sensor liefert im Ruhezustand 1 (Öffner-Verhalten), das Programm geht aber von „1 = Teil erkannt" aus; Korrektur `TEIL_ERKANNT := NOT LICHTSCHRANKE_4` (oder die Sensorlogik passend umstellen und dokumentieren); Nachweis durch Fehlernachtest mit Teil im Strahl (Meldung erscheint, im freien Zustand keine Meldung) und Regressionstest der anderen Segmente. T-03: Umschaltzeit 38 s deutet auf ein nicht oder falsch konfiguriertes Ring- bzw. Schleifenschutzverfahren an den Switches hin (z. B. Standardverfahren mit langer Umschaltzeit oder Parameter nicht gesetzt); Korrektur: Ringprotokoll gemäß Konzept aktivieren und Parameter prüfen; Nachweis durch Wiederholung der Ringunterbrechung an verschiedenen Stellen mit gemessener Umschaltzeit unter 5 s, danach Konfiguration sichern. T-04: Eine Erlauben-Regel aus der Testphase steht vor der Verweigerungsregel und wird zuerst ausgewertet; Korrektur: Regel löschen und Regelreihenfolge prüfen, Standardregel Default Deny sicherstellen; Nachweis durch erneuten Zugriffsversuch (blockiert) und Prüfung des Firewall-Protokolls. Werte T-05: 8 h = 28 800 s; 48 × 28 800 = 1 382 400 Werte. Teilaufgabe 3: Ablauf: Vorbereitung (Ist-Stand sichern, Wartungsfenster, Zuständigkeiten, Testplan bereitlegen), Sicht- und Verdrahtungsprüfung, Spannung zuschalten, Netzwerk und Kommunikation prüfen, Signaltest aller Kanäle, Einzelfunktionen, Gesamtsystemtest inklusive Failover- und Sicherheitstests, Probebetrieb, Endstand sichern, Protokoll erstellen. Protokollinhalt: Projekt, Anlage, Datum, Beteiligte; Komponenten mit Versionsständen (Firmware, Konfigurationen, Programme); durchgeführte Tests mit Ergebnis (Verweis auf Testprotokoll, inklusive wiederholter Tests T-02 bis T-04); offene Punkte mit Verantwortlichen und Fristen; Datensicherungsstand und Rücksicherungstest; Bestätigung, dass Standardpasswörter ersetzt sind und Zugangsdaten sicher übergeben wurden (nicht im Protokoll); Unterschriften. Offene Punkte (falls noch nicht erledigt) werden als Mängel mit Frist aufgeführt. Teilaufgabe 4: Bewertung: Die drei Fehler betreffen Funktion (T-02), Verfügbarkeit (T-03) und Sicherheit (T-04) und sind keine Schönheitsfehler. Eine Abnahme ohne Nachweis ihrer Behebung ist nicht empfehlenswert; sinnvoll ist, die Korrekturen und Nachtests vor dem Termin abzuschließen oder die Abnahme zu verschieben bzw. nur unter klar dokumentierten Bedingungen und Fristen mit dem Kunden zu vereinbaren; geringfügige Mängel (z. B. Beschriftung) lassen sich in einer Mängelliste führen. Einweisung zielgruppengerecht: Bedienpersonal — Dashboard, Alarmquittierung; Instandhaltung — Fehlersuche, Austausch von Komponenten, Konfigurationssicherung; IT-Verantwortliche — Netzstruktur, Berechtigungen, Sicherung; praktische Übungen, Kurzanleitungen und Teilnehmerliste. Dokumentation: Netz-, Adress- und VLAN-Plan, Geräteliste mit Versionen, Konfigurations- und Programmsicherungen, Berechtigungskonzept, Wartungs- und Notfallanleitung, Test- und Inbetriebnahmeprotokolle, Ansprechpartner; Übergabe der Zugangsdaten über einen sicheren Weg.
