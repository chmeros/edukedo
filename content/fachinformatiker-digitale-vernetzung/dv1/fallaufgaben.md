---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: DV1
fachgebiet_title: "Analysieren und Planen von Systemen zur Vernetzung von Prozessen und Produkten"
thema_code: "DV1-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Analysieren und Planen von Systemen zur Vernetzung von Prozessen und Produkten" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 6 Nr. 1, § 36 Abs. 2 und Anlage (Ausbildungsrahmenplan) Abschnitt E lfd. Nr. 1 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DV1 (8.1–8.4) zu zusammenhängenden Situationen aus dem Alltag der Smart-Factory-/IoT-Vernetzung bei der Brevanta IT-Systemhaus GmbH, wie sie im Prüfungsbereich „Planen und Umsetzen eines Projektes der digitalen Vernetzung" und in der Projektpraxis typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte. Alle Preise, Mengen und Messwerte sind fiktiv.

---

#### F-DV1-01 · Fallaufgabe

**Themenbezug:** 8.1 (Systemübersicht, Ebenen) + 8.2 (Bestandsaufnahme, Topologien, Schnittstellen)

**Ausgangssituation:** Die Lindner Kunststofftechnik GmbH (Spritzguss) beauftragt die Brevanta, Maschinendaten der Halle 2 an eine Auswertungsplattform anzubinden. Auszubildender Jonas Weber führt die Bestandsaufnahme durch. Aus Unterlagen und Begehung ergibt sich der folgende Stand. Alle Verbindungen sind Kupferkabel; es existiert nur ein einziges Netz ohne VLANs.

```
Serverraum Verwaltung:
  ERP-Server ---- Core-Switch S0 (managed) ---- Firewall ---- Internet-Router
  MES-Server ----/

Hallenverteiler H1 (Schaltschrank, 45 m von S0 entfernt):
  S0 ---- S1 (Switch, nicht verwaltbar, 8 Ports)

Belegung von S1:
  Port 1: Uplink zu S0
  Port 2: SPS Zelle A (Spritzgießmaschine 1)
  Port 3: Maschine 2 ---- Maschine 3 ---- Maschine 4
          (hintereinander über die integrierten Switches der Maschinen)
  Port 4: Funk-Gateway Sensorik (40 Temperatur- und Drucksensoren)
  Port 5: Kamera-Switch K1 (6 Qualitätskameras)
  Port 6: Kabel ohne Beschriftung, Gegenstelle unbekannt
  Port 7: frei
  Port 8: frei
```

Weitere Beobachtungen: In der Adresstabelle des Core-Switches S0 steht hinter dem Anschluss zu S1 eine MAC-Adresse, die in keiner Geräteliste vorkommt. Das Firewall-Protokoll zeigt, dass das Funk-Gateway regelmäßig eine Verbindung ins Internet aufbaut; laut vorhandenem Netzplan gibt es eine solche Verbindung nicht. Die Kabelstrecke von Maschine 4 zum Hallenverteiler H1 wäre 38 m lang. Die Maschinen 2 bis 4 laufen bei Netzausfall autark weiter, melden dann aber keine Daten mehr.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Bestimmen Sie die Gesamttopologie und die Teiltopologien des Hallennetzes und nennen Sie mindestens vier Schwachstellen mit ihren Auswirkungen.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Sie die Bestandsaufnahme fortsetzen, um das unbekannte Gerät und die unbekannte Internetverbindung zu klären. Gehen Sie auf passive und aktive Methoden ein und nennen Sie die Angaben, die Sie in die Inventarliste aufnehmen.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Der Kunde schlägt vor, die Maschinen 2 bis 4 durch ein zusätzliches Kabel von Maschine 4 zum freien Port 7 von S1 zu einem Ring zu schließen. Bewerten Sie den Vorschlag und nennen Sie Voraussetzungen und verbleibende Schwächen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Dokumentation der Ist-Architektur über mehrere Ebenen: Ordnen Sie die Komponenten den Ebenen der Automatisierungspyramide zu, benennen Sie die Darstellungen, die Sie dem Kunden vorlegen, und kennzeichnen Sie Auffälligkeiten, die in der Darstellung sichtbar werden müssen.

**Musterlösungshinweise:** Teilaufgabe 1: Gesamtstruktur ist ein Baum als Mischform: Core-Switch S0 als Kern, S1 als Verteiler, darunter die Endgeräte. Teilstrukturen: ein Stern an S1 (SPS, Funk-Gateway, Kamera-Switch K1 mit eigenem Stern aus 6 Kameras, unbekanntes Gerät) und eine Linie aus Maschine 2, 3 und 4. Schwachstellen (mindestens vier): (1) S1 ist zentraler Verteiler ohne Redundanz und nicht verwaltbar, also ohne Überwachung, VLANs und Konfigurationssicherung; fällt er aus, ist die gesamte Halle von MES und Plattform getrennt. (2) Der Uplink S0 zu S1 ist einzeln ausgelegt, es gibt keinen zweiten Weg. (3) In der Linie trennt der Ausfall oder das Abschalten von Maschine 2 die Maschinen 3 und 4. (4) S0, Firewall und Router sind jeweils nur einmal vorhanden (Single Points of Failure). (5) Flaches Netz ohne Segmentierung: ERP, Produktion und Kameras teilen sich ein Netz, Störungen und Angriffe können sich ungehindert ausbreiten. (6) Unbekanntes Gerät und nicht dokumentierte Internetverbindung des Gateways sind Dokumentations- und Sicherheitsproblem. Teilaufgabe 2: Passive Methoden zuerst: Unterlagen und Beschriftungen prüfen, Instandhaltung und IT befragen, das unbeschriftete Kabel an Port 6 physisch bis zur Gegenstelle verfolgen, die MAC-Adresse aus der Adresstabelle des managed Core-Switches S0 auslesen (S1 ist nicht verwaltbar und liefert selbst keine Informationen); die ersten drei Byte der MAC-Adresse erlauben oft einen Rückschluss auf den Hersteller. Für die Internetverbindung das Firewall-Protokoll auswerten (Ziel, Port, Häufigkeit) und beim Sensorlieferanten rückfragen, ob das Gateway eine Cloud-Anbindung nutzt. Aktive Methoden wie Scans oder gezieltes Abfragen nur mit ausdrücklicher Freigabe und Abstimmung mit der Anlagenverantwortung, bevorzugt außerhalb der Produktion, weil sie empfindliche Geräte stören können. Konnte das Gerät nicht geklärt werden, ist mit dem Kunden zu entscheiden, ob der Port nach Abstimmung stillgelegt wird (als Änderung dokumentiert). Inventarliste: Gerätename und Typ, Funktion, Ebene, MAC-Adresse, IP-Adresse und VLAN, Anschluss (S1, Port 6), Standort, Firmwarestand, Zuständigkeit, Status (geklärt oder offen) und Quelle der Information. Teilaufgabe 3: Sinnvoll, aber nicht ausreichend. Voraussetzungen: S1 muss durch einen verwaltbaren Switch ersetzt werden, der ein Ringredundanzverfahren unterstützt, und die integrierten Switches der Maschinen müssen dasselbe Verfahren unterstützen (Herstellerangaben prüfen); sonst entsteht eine Schleife mit Broadcast-Sturm statt einer Redundanz. Port 7 ist frei, die 38 m liegen unter der üblichen Grenze von etwa 100 m für Kupfer. Wirkung: Fällt Maschine 2 oder eine Leitung zwischen den Maschinen aus, bleiben die übrigen über den Ring erreichbar; die Umschaltzeit des Verfahrens muss zur Toleranz der Anlage passen. Verbleibende Schwächen: S1 und der Uplink zu S0 bleiben Single Points of Failure; zusätzliche Maßnahmen sind ein redundanter Uplink oder zweiter Verteiler, Segmentierung und Überwachung. Teilaufgabe 4: Feldebene: 40 Sensoren, Sensorik und Aktorik der Maschinen, Qualitätskameras; Steuerungsebene: SPS Zelle A und die Maschinensteuerungen; Leitebene: im Bestand nicht erkennbar (beim Kunden zu klären); Betriebsleitebene: MES-Server; Unternehmensebene: ERP-Server; querliegend: Switches, Firewall, Router, Funk-Gateway. Darstellungen: physischer Netzplan (Geräte, Ports, Kabel), logischer Netzplan (zeigt: aktuell nur ein Netz), Ebenenbild, Datenflussdiagramm und ergänzend Inventar- und Schnittstellenliste. Sichtbar zu machen sind das Fehlen der Segmentierung, die Verbindung des Gateways ins Internet als Ebenen überspringende Schatten-Verbindung, die Linie und der zentrale S1 als Single Points of Failure, das unbekannte Gerät und das offene Fehlen der Leitebene. Annahmen und ungeklärte Punkte werden in der Dokumentation gekennzeichnet; Stand und Version angeben.

---

#### F-DV1-02 · Fallaufgabe

**Themenbezug:** 8.3 (Zonenkonzept, Netzwerkanforderungen, Kalkulation, Ausfallkosten)

**Ausgangssituation:** Die Nordwerk Intralogistik GmbH errichtet ein neues Lager mit Fördertechnik. Die Brevanta soll die Vernetzung planen und kalkulieren. Anforderungen des Kunden: 10 Überwachungskameras (je 4 Mbit/s), 120 Sensoren und Scanner (zusammen 6 Mbit/s), 8 fahrerlose Transportfahrzeuge im WLAN (je 2 Mbit/s) sowie ein Lagerleitsystem, das in der Halle steht, und eine Anbindung an das ERP im Verwaltungsgebäude. Der Lieferant der Fördertechnik verlangt einen Fernwartungszugang. Die Halle wird über Glasfaser mit dem Kernnetz verbunden; der Uplink ist wahlweise mit 100 Mbit/s oder 1 Gbit/s bestellbar. Für die Kalkulation liegt folgende Preisliste vor (alle Preise netto):

```
Pos | Leistung                                   | Menge | Einzelpreis
1   | Industrie-Switch, 16 Ports, managed        | 5     | 590 EUR
2   | Industrie-Switch, 8 Ports, PoE, managed    | 3     | 480 EUR
3   | Industrie-Access-Point                     | 6     | 520 EUR
4   | Industrie-Firewall                         | 1     | 3.400 EUR
5   | Glasfaser-Trunk inkl. Medienkonverter      | 4     | 380 EUR

Arbeitsleistung:
Installation               48 h x 82 EUR
Konfiguration und Test     20 h x 96 EUR
Dokumentation, Einweisung   8 h x 96 EUR

Aufschlag für Unvorhergesehenes: 10 % auf die Nettosumme
Umsatzsteuer: 19 %
```

**Teilaufgabe 1 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ein Zonenkonzept mit mindestens vier Zonen. Ordnen Sie alle genannten Systeme einer Zone zu, legen Sie den Zugang für die Fernwartung fest und formulieren Sie drei Regeln für die Übergänge.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie die erforderliche Gesamtbandbreite der Halle einschließlich 30 % Reserve und begründen Sie, welcher Uplink zu bestellen ist (Planungsannahme: Dauerlast höchstens etwa 70 % der Nennbandbreite).

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Kalkulieren Sie die Kosten: Materialsumme, Arbeitsleistung, Nettosumme, Aufschlag, Nettosumme mit Aufschlag, Umsatzsteuer und Bruttosumme.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Für 4.800 € netto Mehrinvestition (zweiter Uplink und zweiter Verteiler, keine zusätzlichen laufenden Kosten) sinkt die erwartete Stillstandszeit von 5 auf 1 Stunde pro Jahr. Ein Stillstand kostet den Kunden 2.400 € pro Stunde. Berechnen Sie die Amortisationszeit, bewerten Sie die Investition und nennen Sie eine Unsicherheit der Annahmen.

**Musterlösungshinweise:** Teilaufgabe 1: Mögliche Zonen: Unternehmenszone (ERP, Büroarbeitsplätze im Verwaltungsgebäude), Übergangszone/Industrial DMZ (Jump-Host für Fernwartung, Datenbroker für Auswertungen), Produktionszone (Lagerleitsystem, Server in der Halle, Kameras-Aufzeichnung), Zellenzone bzw. Feldzone (Förderanlagen-Steuerungen, Sensoren und Scanner, WLAN für die Transportfahrzeuge, ggf. eigene Zone für Funk). Fernwartung: Der Lieferant verbindet sich nur über den Jump-Host der Übergangszone, mit Authentifizierung (möglichst Mehrfaktor), zeitlich begrenzt freigeschaltet und protokolliert; keine direkte Verbindung in die Produktions- oder Zellenzone. Regeln (Beispiele): Default Deny an allen Übergängen; das Leitsystem darf Daten an das ERP über genau definierte Dienste senden, aber keine Verbindung vom ERP in die Zellenzone; die Kameras dürfen nur mit dem Aufzeichnungssystem kommunizieren; Verbindungen werden nach Quelle, Ziel, Dienst und Richtung beschrieben. Teilaufgabe 2: Kameras 10 × 4 Mbit/s = 40 Mbit/s; Sensoren 6 Mbit/s; Fahrzeuge 8 × 2 Mbit/s = 16 Mbit/s; Summe 40 + 6 + 16 = 62 Mbit/s. Mit 30 % Reserve: 62 × 1,3 = 80,6 Mbit/s. Auf einem 100-Mbit/s-Uplink wären das 80,6 % (schon ohne Reserve 62 %), also über der Planungsannahme von etwa 70 %; auf einem 1-Gbit/s-Uplink nur etwa 8,1 % (62 Mbit/s: 6,2 %). Zu bestellen ist daher der 1-Gbit/s-Uplink. Teilaufgabe 3: Material: 5 × 590 = 2.950 €; 3 × 480 = 1.440 €; 6 × 520 = 3.120 €; 3.400 €; 4 × 380 = 1.520 €; Summe 12.430 €. Arbeit: 48 × 82 = 3.936 €; 20 × 96 = 1.920 €; 8 × 96 = 768 €; Summe 6.624 €. Netto 12.430 + 6.624 = 19.054 €. Aufschlag 10 %: 1.905,40 €; Netto mit Aufschlag 20.959,40 €. Umsatzsteuer 19 %: 20.959,40 × 0,19 = 3.982,29 € (gerundet); Brutto 24.941,69 €. Teilaufgabe 4: Jährliche Ersparnis (5 h − 1 h) × 2.400 € = 9.600 €. Amortisation 4.800 € / 9.600 € pro Jahr = 0,5 Jahre, also sechs Monate. Bewertung: sehr wirtschaftlich, sofern die Annahmen tragen; zusätzlich sicherheits- und betriebsrelevante Vorteile (kein einzelner Verteiler als Single Point of Failure). Unsicherheit: Die erwartete Stillstandszeit ist eine Schätzung; auch bei nur 2 Stunden Einsparung (4.800 € pro Jahr) amortisiert sich die Investition nach einem Jahr. Ebenfalls zu prüfen: Stillstandskosten je Stunde, ob alle Ausfallursachen durch die Redundanz abgedeckt sind (z. B. nicht die Steuerungen selbst) und ob die Annahmen mit dem Kunden abgestimmt sind.

---

#### F-DV1-03 · Fallaufgabe

**Themenbezug:** 8.4 (Auswertung, Optimierung, Änderungsmanagement, Kundenabstimmung) + 8.3 (Netzwerkanforderungen)

**Ausgangssituation:** Die Rosenfeld Verpackungstechnik GmbH betreibt eine Abfülllinie im Drei-Schicht-Betrieb. Die Brevanta hat vor einigen Monaten ein Monitoring der Hallenvernetzung eingerichtet. Die Anbindung der Halle ans Kernnetz (Uplink) hat 100 Mbit/s. Der Kunde verlangt, dass die Latenz zwischen Steuerung und Leitsystem nie über 50 ms liegt. Auswertung einer Woche (Mittelwerte über die gleich langen Zeitfenster der drei Schichten):

```
Zeitfenster   | Ø Auslastung | Spitze | Ø Latenz | max. Latenz | Paketverlust
06:00 - 14:00 | 38 %         | 71 %   | 4 ms     | 9 ms        | 0,0 %
14:00 - 22:00 | 41 %         | 76 %   | 5 ms     | 11 ms       | 0,0 %
22:00 - 06:00 | 22 %         | 97 %   | 6 ms     | 142 ms      | 0,4 %
```

Aus dem Ereignisprotokoll: Täglich um 02:00 Uhr startet der Sicherungslauf des MES-Servers (rund 40 GB, dezimal gerechnet) zum Backup-Server im Verwaltungsgebäude über denselben Uplink; er endet gegen 03:07 Uhr. Alle Überschreitungen der 50-ms-Grenze liegen zwischen 02:00 und 03:10 Uhr. Dabei erreicht der Sicherungslauf auf dem Link rund 80 Mbit/s. Für das Edge-Gateway der Linie sind in den letzten 90 Tagen vier Ausfälle mit zusammen 12 Stunden Ausfallzeit protokolliert. Außerdem möchte die Qualitätsleitung zusätzlich drei Kameras (je 4 Mbit/s) für die Sichtprüfung am Linienende anbinden; sie sollen im Tagbetrieb laufen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie (a) die mittlere Uplink-Auslastung über 24 Stunden, (b) die Dauer des Sicherungslaufs aus den Angaben (40 GB bei 80 Mbit/s) und (c) die Verfügbarkeit des Edge-Gateways im Betrachtungszeitraum von 90 Tagen sowie dessen MTBF und MTTR.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Ermitteln Sie die wahrscheinliche Ursache der Latenzspitzen und Paketverluste in der Nachtschicht, nennen Sie die Belege aus den Daten und erklären Sie, welche weiteren Prüfungen nötig sind, bevor die Ursache als gesichert gilt.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Entwickeln Sie zwei Optimierungsvorschläge in der Struktur Befund, Maßnahme, erwarteter Nutzen, Aufwand und Risiko, rechnen Sie bei der Begrenzung des Sicherungslaufs auf 30 Mbit/s die neue Laufzeit und die neue Auslastung nach, und empfehlen Sie begründet das weitere Vorgehen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Planen Sie die Abstimmung mit dem Kunden zur Anbindung der drei Kameras: Welche Auswirkungen zeigen die Daten, wie läuft der Änderungsprozess ab, und welche Punkte gehören in den Änderungsantrag?

**Musterlösungshinweise:** Teilaufgabe 1: (a) (38 + 41 + 22) / 3 = 101 / 3 ≈ 33,7 %. (b) 40 GB = 320 Gbit = 320.000 Mbit; 320.000 / 80 = 4.000 s ≈ 66,7 min, also rund 67 Minuten; das passt zu den Ereigniszeiten (02:00 bis etwa 03:07 Uhr). (c) Betrachtungszeitraum 90 × 24 h = 2.160 h; Nichtverfügbarkeit 12 / 2.160 ≈ 0,556 %, Verfügbarkeit also rund 99,44 %; MTTR = 12 h / 4 = 3 h; MTBF = (2.160 − 12) / 4 = 537 h; Kontrolle 537 / (537 + 3) ≈ 0,9944. Teilaufgabe 2: Wahrscheinliche Ursache: Der Sicherungslauf des MES lastet den gemeinsam genutzten Uplink bis nahe an die Grenze aus (Spitze 97 %), und die Steuerungsdaten werden in den Warteschlangen der Netzwerkgeräte verzögert und teilweise verworfen. Belege: Alle Überschreitungen der 50-ms-Grenze liegen im Zeitraum des Sicherungslaufs (02:00 bis 03:10); die mittlere Latenz der Nachtschicht ist unauffällig (6 ms), die maximale Latenz aber 142 ms und der Paketverlust 0,4 %, was für kurzzeitige Überlast spricht, nicht für eine Dauerstörung; Mittelwerte allein hätten das verdeckt. Zeitliches Zusammentreffen beweist die Ursache noch nicht. Weitere Prüfungen: testweise den Sicherungslauf verschieben oder begrenzen und erneut messen; Portzähler (Verwürfe, Fehler) und Warteschlangenstatistiken an den beteiligten Switches auswerten; prüfen, ob die Steuerungsdaten über denselben Link laufen und ob Priorisierung konfiguriert ist; Zeitsynchronisation der Messpunkte kontrollieren; weitere mögliche Ursachen ausschließen (z. B. weitere nächtliche Jobs). Teilaufgabe 3: Vorschlag A: Befund: Latenzspitzen bis 142 ms und 0,4 % Paketverlust während des Sicherungslaufs. Maßnahme: Sicherungslauf in der Bandbreite auf 30 Mbit/s begrenzen (Rate-Limit) und zusätzlich Steuerungsverkehr priorisieren. Rechnung: 320.000 Mbit / 30 = 10.667 s ≈ 178 min, also etwa 2 h 58 min; Auslastung: Der Nachtmittelwert von 22 % enthält den Sicherungslauf selbst, die Grundlast liegt also darunter; selbst konservativ mit 22 % + 30 % = 52 % bleibt die Auslastung unter der Planungsannahme von etwa 70 %. Nutzen: keine Überschreitung der 50-ms-Grenze zu erwarten, die Anforderung des Kunden würde erfüllt. Aufwand: gering (Konfiguration, einige Stunden, kein Stillstand), Risiko: längere Laufzeit des Sicherungslaufs, der weiterhin vor dem Morgen abgeschlossen sein sollte; Rückfall durch gesicherte Konfiguration. Vorschlag B: Uplink auf 1 Gbit/s erweitern (und weiterhin Priorisierung einrichten): Der Sicherungslauf wäre bei etwa 900 Mbit/s nutzbarer Rate (Annahme) in rund 6 Minuten fertig und die Reserve für Wachstum (z. B. zusätzliche Kameras) wäre größer. Aufwand: einmalige Hardware- und Installationskosten und ein kurzes Wartungsfenster, Risiko: ohne Priorisierung könnte der Lauf den Link kurzzeitig weiterhin ausreizen. Empfehlung: Sofort Vorschlag A umsetzen (schnell, günstig, wirksam), danach nachmessen (Soll-Ist-Vergleich der Latenz); Vorschlag B im Zusammenhang mit der Kameraerweiterung prüfen. Teilaufgabe 4: Auswirkungen: 3 × 4 Mbit/s = 12 Mbit/s zusätzlich, das sind 12 % des 100-Mbit/s-Uplinks; die tägliche Spitze der Schichten 14:00 bis 22:00 Uhr von 76 % würde auf etwa 88 % steigen, über dem Planungsrichtwert von etwa 70 %. Der Uplink ist für die Erweiterung damit nicht komfortabel, die Anbindung sollte mit der Uplink-Erweiterung (Vorschlag B) gekoppelt werden; zusätzlich sind neue VLAN- und Firewall-Regeln zu prüfen und die Kameras in die Zonen einzuordnen. Ablauf: Änderungsantrag erfassen, Auswirkungsanalyse (Netzlast, Zonenregeln, Switch-Ports und PoE-Budget, Doku), Bewertung und Freigabe durch Qualitätsleitung, Instandhaltung, IT-Leitung des Kunden und Projektleitung der Brevanta, Planung im Wartungsfenster mit Rückfallplan und Konfigurationssicherung, Umsetzung und Test (Bildqualität, Latenz, Netzlast), Nachmessung, Dokumentation und Abschluss. Inhalte des Antrags: Beschreibung und Begründung (automatische Sichtprüfung), betroffene Systeme (Switch, Uplink, Leitsystem), Auswirkungen (Last, Regeln, Wartungsfenster), Kosten und Termin, Rückfallplan, Freigaben und Verantwortliche. In der Abstimmung mit dem Kunden die Kosten-Nutzen-Argumente und die Varianten (mit oder ohne Uplink-Erweiterung) verständlich darstellen und die Entscheidung einholen.
