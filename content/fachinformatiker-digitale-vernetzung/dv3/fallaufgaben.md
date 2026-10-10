---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: DV3
fachgebiet_title: "Betreiben vernetzter Systeme, Diagnose und Störungsbeseitigung"
thema_code: "DV3-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen im Prüfungsbereich Diagnose und Störungsbeseitigung in vernetzten Systemen der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 37, sowie Anlage (Ausbildungsrahmenplan) Abschnitt E lfd. Nr. 3 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DV3 (10.1–10.4) zu zusammenhängenden Servicefällen der Brevanta IT-Systemhaus GmbH bei Industriekunden, wie sie im schriftlichen Prüfungsbereich „Diagnose und Störungsbeseitigung in vernetzten Systemen" typisch sind (Störungsszenario mit Symptomen, Logauszug und Messwerten, dann Eingrenzung, Maßnahmen, Auswertung und Sicherheitsbewertung). Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-DV3-01 · Fallaufgabe

**Themenbezug:** 10.1 (Überwachung, Kennwerte) + 10.2 (Eingrenzung, Diagnosewerkzeuge, Maßnahmen, Dokumentation)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH betreut im Bereich Smart-Factory-/IoT-Vernetzung die Fördertechnik des Möbelwerks Tannenberg GmbH. In Halle 1 hängen die Steuerungen SPS-01 bis SPS-04 am Industrie-Switch SW-F1, in Halle 2 die Steuerungen SPS-05 bis SPS-08 am Industrie-Switch SW-F2. Beide Switches sind über genau ein Kupferkabel (45 m, Port 24 an SW-F1) verbunden, das bisher mit 1 Gbit/s lief; der Leitstand hängt an SW-F1. Heute um 06:12 Uhr meldet der Leitstand für alle Antriebssteuerungen in Halle 2 „Kommunikationsstörung", die Förderstrecken in Halle 2 laufen nur noch stockend. Schichtleiter Marek Lenz berichtet, dass am Vortag Arbeiten mit einem Hubwagen in der Verbindungsgasse zwischen den Hallen stattgefunden haben. Die Servicetechnikerin Selin Aydin erhebt vom Leitstand aus folgende Messwerte und Logeinträge. Der mittlere Datenverkehr zwischen den Hallen beträgt laut Monitoring-Verlauf der letzten Wochen unverändert etwa 96 Mbit/s.

Ping-Test vom Leitstand (je 100 Pakete):

```
Gerät   | Halle | Switch | Paketverlust | Antwortzeit (Mittel)
SPS-01  | 1     | SW-F1  | 0 %          | 1 ms
SPS-04  | 1     | SW-F1  | 0 %          | 1 ms
SW-F2   | 2     | -      | 28 %         | 47 ms
SPS-05  | 2     | SW-F2  | 31 %         | 48 ms
SPS-08  | 2     | SW-F2  | 30 %         | 52 ms
```

Syslog-Auszug (Zeitangaben Vortag/heute):

```
Zeit            | Gerät | Meldung
Vortag 14:37:10 | SW-F1 | Port 24: Link down
Vortag 14:37:13 | SW-F1 | Port 24: Link up, 1000 Mbit/s Vollduplex
heute 06:11:52  | SW-F1 | Port 24: Link down
heute 06:11:55  | SW-F1 | Port 24: Link up, 100 Mbit/s Vollduplex
heute 06:12:30  | SW-F1 | Port 24: Sendewarteschlange voll, 842 Pakete verworfen (5 Min.)
heute 06:12:41  | LEIT  | Zyklische Kommunikation SPS-05 bis SPS-08: Zeitüberschreitung
```

Port-Statistik von SW-F1, Port 24 (Uplink zu SW-F2):

```
Aushandlung (konfiguriert: automatisch) : 100 Mbit/s, Vollduplex (bisher 1000 Mbit/s)
Mittlerer Sendeverkehr (5 Min.)         : 96 Mbit/s
Verworfene Pakete (5 Min.)              : 842
CRC-Fehler (5 Min.)                     : 0
Link-Down-Ereignisse (24 h)             : 2
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Grenzen Sie anhand der Messwerte, des Logauszugs und der Port-Statistik ein, welche Bereiche der Anlage in Ordnung sind und wo die Störung liegt, und formulieren Sie die naheliegende Ursachenhypothese mit Begründung.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Ein Kabeltest am Uplinkkabel ergibt: Adernpaare 1/2 und 3/6 in Ordnung, Adernpaare 4/5 und 7/8 unterbrochen, Unterbrechung etwa 31 m vom Messende (SW-F1) entfernt. Beschreiben Sie, ob damit die Hypothese bestätigt ist, und leiten Sie die Maßnahmen zur Störungsbeseitigung ab (Workaround, Ursachenbeseitigung, Absprachen, Prüfung nach der Maßnahme).

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Berechnen Sie die Auslastung des Uplinks vor der Störung und jetzt, erklären Sie damit, warum die Störung bei unverändertem Datenverkehr entstanden ist, und nennen Sie zwei Überwachungseinstellungen, die das Problem früher gemeldet hätten.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Störungsdokumentation für das Ticket (mindestens fünf Bestandteile mit Inhalt) und formulieren Sie drei vorbeugende Maßnahmen.

**Musterlösungshinweise:** Teilaufgabe 1: Halle 1, SW-F1 und der Leitstand sind in Ordnung (0 Prozent Verlust, 1 ms), die Spannungsversorgung dort läuft. Alle Teilnehmer in Halle 2 einschließlich des Switches SW-F2 selbst sind gleichmäßig betroffen (28 bis 31 Prozent Verlust, rund 50 ms); weil alle vier Steuerungen gleichzeitig und gleichartig betroffen sind, liegt kein Einzelgerätefehler vor, sondern ein gemeinsamer Fehler vor Halle 2, also an Uplink-Port, Kabel oder an SW-F2. Das Log zeigt Link-down/up um 06:11:52 mit neuer Aushandlung auf 100 statt 1000 Mbit/s; bereits am Vortag um 14:37 gab es ein Link-down (Zeitpunkt der Hubwagenarbeiten). Die Port-Statistik zeigt 96 Mbit/s Verkehr auf einer 100-Mbit/s-Strecke und verworfene Pakete; daraus folgen Paketverlust, Zeitüberschreitungen der zyklischen Kommunikation und das Stocken der Anlage. Hypothese: mechanischer Schaden am Uplinkkabel oder Stecker (Hubwagen), sodass nur noch zwei Adernpaare funktionieren und die Verbindung auf 100 Mbit/s zurückfällt; CRC-Fehler = 0 spricht gegen eine Duplex-Fehlanpassung. Teilaufgabe 2: Bestätigt: Gigabit-Ethernet über Kupfer nutzt alle vier Adernpaare, 100 Mbit/s nur zwei; sind die Paare 4/5 und 7/8 unterbrochen, fällt die Aushandlung auf 100 Mbit/s zurück; die Stelle bei etwa 31 m passt zur Hubwagen-Fahrgasse. Maßnahmen: Vorgehen mit dem Schichtleiter bzw. Anlagenverantwortlichen abstimmen (kurzer Stillstand oder Wartungsfenster, Anlage in sicheren Zustand); Workaround kurzfristig z. B. nicht zwingend benötigten Datenverkehr (etwa Kamerabilder) vorübergehend drosseln oder, falls vorhanden, eine Reserveleitung nutzen; Ursachenbeseitigung: beschädigtes Kabel durch ein neues, geeignet geschütztes Kabel ersetzen (nur eine Änderung, Switch-Konfiguration bleibt unverändert); danach Kabeltest, Link-Status 1000 Mbit/s, Ping-Test (erwartet 0 Prozent Verlust, 1 bis 2 ms), Auslastung, Leitstand ohne Störmeldung; Beobachtung über eine Schicht bzw. 24 Stunden, danach Rückmeldung an Melder. Teilaufgabe 3: Vorher 96 ÷ 1000 = 9,6 Prozent, jetzt 96 ÷ 100 = 96 Prozent. Der Verkehr blieb gleich, die Kapazität sank auf ein Zehntel; die Strecke ist damit praktisch voll ausgelastet, Warteschlangen laufen über, Pakete werden verworfen. Frühere Meldung durch: Alarm bei Abweichung der ausgehandelten Link-Geschwindigkeit vom Sollwert (1000 Mbit/s) bzw. bei Link-down-Ereignissen (bereits der Vortag war auffällig), Auslastungsschwelle (z. B. Warnung ab 70 Prozent, kritisch ab 90 Prozent), Alarm bei verworfenen Paketen. Teilaufgabe 4: Bestandteile z. B.: Meldung (06:12, Melder, Symptom und Auswirkung: Förderstrecken Halle 2 stockend), Eingrenzung (Ping-Tabelle, Syslog, Port-Statistik, Hypothese), Ursache (Kabelschaden bei etwa 31 m, vermutlich durch Hubwagen), Maßnahme (Workaround, Kabeltausch, wer, wann), Prüfung (Kabeltest, Link 1000 Mbit/s, Ping, Auslastung), Dauer (Beginn 06:11, Wiederherstellung), Vorbeugung. Vorbeugung z. B.: Überfahrschutz bzw. Kabelkanal in der Fahrgasse, Kabeltest nach Bauarbeiten und Alarm bei Link-Geschwindigkeit, redundanter zweiter Uplink (z. B. Ringstruktur, Kosten-Nutzen abwägen) sowie Ersatzkabel vorhalten und die Mitarbeitenden für die Trasse sensibilisieren.

---

#### F-DV3-02 · Fallaufgabe

**Themenbezug:** 10.3 (Ausfallstatistik, MTBF/MTTR, Trend, Wartungsoptimierung) + 10.1 (Vorgaben und Kennzahlen)

**Ausgangssituation:** Für die Verpackungslinie 2 des Kunststoffwerks Nordbrandt GmbH betreibt die Brevanta IT-Systemhaus GmbH das vernetzte Steuerungs- und Überwachungssystem. Die Leitung der Instandhaltung, Frau Petra Lindner, wünscht eine Auswertung der letzten 90 Tage (2.160 Stunden) und einen begründeten Vorschlag zur Verbesserung der Verfügbarkeit. Die Anlage war im gesamten Zeitraum geplant im Dauerbetrieb. Der Servicedesk hat folgende ungeplante Ausfälle dokumentiert:

```
Nr | Datum | Ursache                                          | Ausfalldauer
1  | 14.07 | Netzteil 24 V in Schaltschrank 3 defekt          | 12 h
2  | 29.07 | Lichtschranke driftet, Fehlauslösungen           | 3 h
3  | 22.08 | Netzteil 24 V in Schaltschrank 3 defekt          | 14 h
4  | 05.09 | Kabelbruch an der Datenleitung des Zubringerbands | 5 h
5  | 19.09 | Lagerschaden am Antriebsmotor                    | 20 h
```

Die Ausfalldauer enthält jeweils die Wartezeit auf Ersatzteile. Außerdem liegen für ein baugleiches Netzteil in Schaltschrank 5 (gleiche Bauart und gleiches Alter wie die beiden ausgefallenen Netzteile, bisher ohne Ausfall) folgende Wochenmittelwerte der letzten vier Wochen vor. Die Nennspannung beträgt 24 V; die Warnschwelle liegt bei 22,8 V.

```
Woche | Ausgangsspannung (Mittel) | Schaltschranktemperatur (Mittel)
1     | 24,0 V                    | 31 °C
2     | 23,8 V                    | 34 °C
3     | 23,6 V                    | 37 °C
4     | 23,4 V                    | 40 °C
```

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie für den Betrachtungszeitraum Gesamtausfallzeit, Betriebszeit, MTBF, MTTR und Verfügbarkeit der Linie (mit Rechenweg).

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Werten Sie die Ausfallstatistik nach Ursachen aus (Anzahl und Ausfallzeit mit Prozentanteilen), benennen Sie die auffälligste Schwachstelle und leiten Sie zwei Maßnahmen ab; weisen Sie auf eine Einschränkung der Aussagekraft hin.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Werten Sie die Wochenmittelwerte des Netzteils in Schaltschrank 5 aus: Bestimmen Sie den Trend, die Woche, in der die Warnschwelle bei gleichbleibendem Verlauf erreicht wird, und eine begründete Maßnahme mit Zeitpunkt; nennen Sie außerdem eine Auffälligkeit in den Messwerten, die einer Ursachenprüfung bedarf.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Frau Lindner schlägt vor, Ersatznetzteile vor Ort zu bevorraten, sodass jeder Netzteilausfall nur noch 2 Stunden dauert. Berechnen Sie die neuen Kennzahlen (Ausfallzeit, Betriebszeit, MTBF, MTTR, Verfügbarkeit bei gleicher Ausfallanzahl) und bewerten Sie den Vorschlag mit Nutzen, Aufwand und einem Erfolgskriterium.

**Musterlösungshinweise:** Teilaufgabe 1: Gesamtausfallzeit 12 + 3 + 14 + 5 + 20 = 54 Stunden; Betriebszeit 2.160 − 54 = 2.106 Stunden; Anzahl der Ausfälle 5; MTBF = 2.106 ÷ 5 = 421,2 Stunden; MTTR = 54 ÷ 5 = 10,8 Stunden; Verfügbarkeit = 421,2 ÷ (421,2 + 10,8) = 421,2 ÷ 432 = 97,5 Prozent (Kontrolle 2.106 ÷ 2.160 = 97,5 Prozent). Teilaufgabe 2: Nach Anzahl: Netzteil 2 von 5 Ausfällen (40 Prozent), Lichtschranke, Kabelbruch und Lagerschaden je 1 (je 20 Prozent). Nach Ausfallzeit: Netzteil 12 + 14 = 26 von 54 Stunden = 48,1 Prozent, Lagerschaden 20 Stunden = 37,0 Prozent, Kabelbruch 5 Stunden = 9,3 Prozent, Lichtschranke 3 Stunden = 5,6 Prozent. Auffälligste Schwachstelle: das Netzteil in Schaltschrank 3 (zweimal ausgefallen, knapp die Hälfte der Ausfallzeit, lange Wartezeiten auf Ersatz). Maßnahmen z. B.: Ersatznetzteil bevorraten (senkt die MTTR), Spannung und Schaltschranktemperatur überwachen und bei Abweichung alarmieren, Netzteile zustandsorientiert tauschen, Kühlung und Lüfterfilter prüfen; ergänzend Zustandsüberwachung des Lagers (Schwingung, Temperatur) und regelmäßige Sichtprüfung der Datenleitungen. Einschränkung: Mit nur fünf Ausfällen sind die Kennzahlen statistisch wenig belastbar, ein einzelner langer Ausfall (20 Stunden) prägt das Bild stark. Teilaufgabe 3: Die Spannung sinkt gleichmäßig um 0,2 V pro Woche, die Temperatur steigt um 3 °C pro Woche. Fortschreibung: Woche 5: 23,2 V, Woche 6: 23,0 V, Woche 7: 22,8 V — die Warnschwelle wird in Woche 7 erreicht (rechnerisch (23,4 − 22,8) ÷ 0,2 = 3 Wochen nach Woche 4), ab Woche 8 wird sie unterschritten. Es handelt sich um eine Prognose unter der Annahme eines gleichbleibenden Trends. Maßnahme: das Netzteil zustandsorientiert im nächsten geplanten Wartungsfenster vor Woche 7 tauschen (Ersatzteil vorher beschaffen) und die Messwerte weiter beobachten. Auffälligkeit: Mit sinkender Spannung steigt die Schaltschranktemperatur; Ursache prüfen (z. B. verstopfter Lüfterfilter, defekter Lüfter, Alterung des Netzteils); ein Zusammenhang ist wahrscheinlich, aber noch nicht bewiesen (Korrelation ist keine Ursache). Teilaufgabe 4: Netzteilausfälle dauern künftig 2 × 2 = 4 Stunden statt 26 Stunden; Gesamtausfallzeit = 54 − 26 + 4 = 32 Stunden; Betriebszeit = 2.160 − 32 = 2.128 Stunden; MTBF = 2.128 ÷ 5 = 425,6 Stunden; MTTR = 32 ÷ 5 = 6,4 Stunden; Verfügbarkeit = 2.128 ÷ 2.160 ≈ 98,52 Prozent (vorher 97,5 Prozent), also 22 Stunden weniger Ausfall im Zeitraum. Bewertung: Nutzen hoch (größte Ursachengruppe, schnelle Wirkung auf die MTTR); Aufwand gering bis mäßig (Kosten für ein bis zwei Ersatznetzteile, Lagerhaltung, Einweisung); die Ausfallhäufigkeit selbst (MTBF) bleibt unverändert, deshalb zusätzlich zustandsorientierter Tausch und Ursachenprüfung; Risiko: Ersatzteil muss zu Typ und Firmware passen. Erfolgskriterium z. B.: kein Netzteilausfall länger als 2 Stunden und Verfügbarkeit der Linie mindestens 98,5 Prozent im nächsten 90-Tage-Zeitraum, Überprüfung nach Ablauf des Zeitraums (PDCA).

---

#### F-DV3-03 · Fallaufgabe

**Themenbezug:** 10.4 (Angriffsszenarien, Anomalien, Vorfallreaktion, Sicherheitslösungen, Schwachstellenbewertung) + 10.1 (Logauswertung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH betreibt für die Seidel Metallbau GmbH die Vernetzung einer Biegezelle: Die Steuerung SPS-B1 (10.40.20.15) wird vom Leitstand (10.40.10.5) über Modbus/TCP (Port 502) angesprochen. Für die Fernwartung durch Brevanta gibt es ein VPN-Gateway; verbundene Fernwartende erhalten Adressen aus dem Pool 10.40.99.0/24. Vereinbart und bisher beobachtet: Fernwartung nur werktags zwischen 07:00 und 17:00 Uhr, nur lesender Zugriff; Schreibbefehle auf die Steuerung kommen nur vom Leitstand, im Mittel etwa 120 pro Stunde. Für das Sammelkonto wartung1 ist die Mehr-Faktor-Anmeldung nicht aktiviert. Am Montag um 06:40 Uhr meldet Schichtführer Jonas Weber, dass die Ausschussquote der Biegezelle seit etwa 02:30 Uhr bei 6,8 Prozent liegt (üblich 1,2 Prozent) und mehrere Biegewinkel-Sollwerte von der hinterlegten Rezeptur abweichen. Die Auswertung der Gateway- und Netzlogs in der Nacht zu Montag ergibt:

```
Zeit     | Quelle               | Ziel               | Ereignis
02:14:07 | 203.0.113.45         | VPN-Gateway        | Anmeldung fehlgeschlagen, Benutzer wartung1
02:14:11 | 203.0.113.45         | VPN-Gateway        | Anmeldung fehlgeschlagen, Benutzer wartung1
...      | ...                  | ...                | (bis 02:20:58 insgesamt 120 fehlgeschlagene Anmeldungen)
02:21:19 | 203.0.113.45         | VPN-Gateway        | Anmeldung erfolgreich, Benutzer wartung1
02:22:03 | 10.40.99.7 (VPN-Pool)| SPS-B1 10.40.20.15 | TCP 502, Modbus-Funktionscode 16 (Schreiben)
...      | ...                  | ...                | (bis 02:42:03 insgesamt 1.560 Schreibbefehle)
```

Eine Prüfung durch Brevanta hat außerdem folgende Schwachstellen ergeben:

```
Befund | System                  | Basiswert (CVSS) | Erreichbarkeit / Ausnutzbarkeit
A      | VPN-Gateway (Firmware)  | 9,8 (kritisch)   | aus dem Internet erreichbar, öffentliche Angriffswerkzeuge bekannt, Update verfügbar
B      | SPS-B1 (Firmware)       | 7,5 (hoch)       | nur aus der Anlagenzone erreichbar, kein Angriffswerkzeug bekannt, Update braucht Herstellerfreigabe und 2 h Stillstand
C      | Leitstand-PC            | 5,5 (mittel)     | nur aus dem Büronetz erreichbar, Ausnutzung erfordert lokale Anmeldung, Updates 3 Monate im Rückstand
```

Brevanta plant, die Fernwartung künftig über einen Sprungrechner (10.40.99.2) zu führen.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Nennen Sie mindestens vier Auffälligkeiten (Anomalien) mit Bezug zur beschriebenen Baseline, berechnen Sie, um das Wievielfache die Schreibrate über dem Normalwert liegt, und ordnen Sie den Vorfall den passenden Angriffsszenarien zu.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Beschreiben Sie in sinnvoller Reihenfolge die Sofortmaßnahmen zur Vorfallreaktion und begründen Sie dabei die Abstimmung mit dem Betrieb.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Priorisieren Sie die Befunde A bis C mit Begründung (z. B. nach Schweregrad und Ausnutzbarkeit) und geben Sie je Befund die Entscheidung (Beheben, Ausgleichen, Akzeptieren) an.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen Firewall-Regelsatz (Quelle, Ziel, Dienst, Aktion) für den Zugriff auf SPS-B1 und nennen Sie mindestens drei weitere Sicherheitsmaßnahmen für den Fernwartungszugang und die Überwachung.

**Musterlösungshinweise:** Teilaufgabe 1: Anomalien: Anmeldeversuche und Anmeldung weit außerhalb der Fernwartungszeit (02:14 bis 02:42 Uhr, Montag, vereinbart ist werktags 07:00 bis 17:00 Uhr); unbekannte Quelladresse 203.0.113.45; 120 fehlgeschlagene Anmeldungen in knapp sieben Minuten (Passwortraten); erfolgreiche Anmeldung mit dem Sammelkonto ohne zweiten Faktor; Schreibbefehle (Funktionscode 16) von einer Fernwartungsadresse, obwohl die Fernwartung nur lesen soll; 1.560 Schreibbefehle in 20 Minuten = 78 pro Minute gegenüber dem Normalwert von 120 pro Stunde = 2 pro Minute, also das 39-fache (78 ÷ 2); Prozessauswirkung: Ausschuss 6,8 statt 1,2 Prozent und Sollwertabweichungen. Szenarien: Angriff über den Fernwartungszugang (gezielte Passwortangriffe bzw. schwache Zugangsdaten) mit anschließender Manipulation von Steuerdaten (Integrität, mit Folgen für Qualität und gegebenenfalls Anlagensicherheit); denkbar ergänzend Schadsoftware oder ein Insider, was geprüft wird. Teilaufgabe 2: 1. Vorfall melden und bewerten (Vorfallverantwortliche, Kunde, Anlagenverantwortlicher). 2. Mit dem Anlagenverantwortlichen abstimmen und den sicheren Anlagenzustand herstellen (z. B. Zelle anhalten oder in Handbetrieb, damit keine weiteren Teile mit falschen Werten entstehen; unkontrolliertes Abschalten könnte selbst Schäden verursachen). 3. Eindämmen: Konto wartung1 sperren, Sitzung beenden, Fernzugang vorerst deaktivieren oder auf bekannte Adressen beschränken, Zugangsdaten ändern. 4. Beweise sichern: Gateway-, Firewall- und Netzlogs, Konfigurationsstände und ggf. Mitschnitte sichern und nicht überschreiben. 5. Sollwerte und Programm von SPS-B1 mit der gesicherten Rezeptur und dem Programmstand vergleichen und die korrekten Werte aus der Sicherung wiederherstellen; Teile aus dem betroffenen Zeitraum durch die Qualitätssicherung prüfen und sperren. 6. Ursache beseitigen (Zugangsweg schließen, Gateway-Update, siehe Teilaufgabe 3/4) und Betrieb wiederaufnehmen, danach verstärkt beobachten. 7. Kunden informieren, Vorfall dokumentieren, ggf. vertragliche oder gesetzliche Melde- und Informationspflichten prüfen. Begründung der Abstimmung: Die Anlage ist ein physischer Prozess; Eingriffe können Qualität, Material und Sicherheit beeinflussen, daher entscheidet der Anlagenverantwortliche mit über Zeitpunkt und Art. Teilaufgabe 3: Bewertung z. B. mit Schweregrad und Ausnutzbarkeit je 1 bis 3: A = 3 × 3 = 9 (zuerst: kritisch, aus dem Internet erreichbar, Angriffswerkzeuge öffentlich, Update vorhanden; vermutlich Teil des Angriffswegs), C = 2 × 2 = 4, B = 3 × 1 = 3. Reihenfolge begründbar A, danach B oder C; Argumente für B vor C: Steuerung ist sicherheits- und prozessrelevant, nach Kompromittierung des Gateways ist die Zone potenziell erreichbar; Argumente für C vor B: Aufwand gering, mittlere Lücke, regulärer Update-Zyklus. Entscheidungen: A beheben (Update zeitnah im abgestimmten Wartungsfenster, bis dahin Zugang einschränken); B ausgleichen (Zugriff auf die Steuerung per Firewall auf Leitstand und Sprungrechner beschränken, verstärkt überwachen, Update nach Herstellerfreigabe im geplanten Stillstand); C beheben im regulären Update-Zyklus, vorher ausgleichen (Büronetz-Zugriff beschränken); Akzeptieren nur bewusst, befristet und dokumentiert. Teilaufgabe 4: Regelsatz z. B.: 1. Leitstand 10.40.10.5 nach SPS-B1 10.40.20.15, TCP 502, erlauben; 2. Sprungrechner 10.40.99.2 nach SPS-B1 10.40.20.15, TCP 502, erlauben und protokollieren (nach Möglichkeit nur lesende Funktionscodes, sofern die Industrie-Firewall das unterstützt); 3. VPN-Gateway nach Sprungrechner (nur der benötigte Dienst), erlauben und protokollieren; 4. alle nach alle, alle Dienste, verwerfen und protokollieren (Default Deny); das übrige Pool 10.40.99.0/24 erhält keinen direkten Zugriff auf SPS-B1. Weitere Maßnahmen z. B.: Mehr-Faktor-Anmeldung und personalisierte Konten statt Sammelkonto, Kontosperre bzw. Verzögerung nach Fehlversuchen, zeitlich befristete Freigabe der Fernwartung nur nach Terminvereinbarung, Alarm bei Anmeldung außerhalb der Fernwartungszeiten, bei Schreibbefehlen von anderen Quellen als dem Leitstand und bei Sollwertabweichungen von der Rezeptur, regelmäßige Offline-Sicherung von Programm und Rezeptur, zentrale zeitsynchrone Protokollierung, Gateway-Update; vor dem Einspielen der Regeln Test und Rückfallplan, damit die Anlage nicht unbeabsichtigt vom Leitstand getrennt wird.
