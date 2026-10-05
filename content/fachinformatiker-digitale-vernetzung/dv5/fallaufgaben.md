---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: DV5
fachgebiet_title: "Planen und Umsetzen eines Projektes der digitalen Vernetzung"
thema_code: "DV5-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Situationen im Prüfungsbereich „Planen und Umsetzen eines Projektes der digitalen Vernetzung" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 36 und § 40 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DV5 (12.1–12.3) zu zusammenhängenden Situationen aus der betrieblichen Projektarbeit bei der Brevanta IT-Systemhaus GmbH (Bereich Smart-Factory-/IoT-Vernetzung). Sie trainieren, was im Prüfungsbereich „Planen und Umsetzen eines Projektes der digitalen Vernetzung" verlangt wird: Projektbeschreibung, Planung und Bestandsanalyse, Entscheidungen und Sicherheitskonzept, Dokumentation sowie Präsentation und Fachgespräch. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-DV5-01 · Fallaufgabe

**Themenbezug:** 12.1 (Projektbeschreibung, Ziel, Zeitplanung, Genehmigung)

**Ausgangssituation:** Jonas Weber, Auszubildender bei der Brevanta IT-Systemhaus GmbH im Bereich Smart-Factory-/IoT-Vernetzung, möchte für den Kunden Kreuzer Kunststofftechnik GmbH seine betriebliche Projektarbeit durchführen. Der Kunde betreibt in drei Hallen insgesamt 18 Spritzgießmaschinen. Die Maschine „SGM 2" (Baujahr 2004) hat eine Altsteuerung ohne Netzwerkanschluss, aber eine serielle Schnittstelle (RS-485, Modbus RTU), über die Zählerstand, Maschinenstatus und Zykluszeit lesbar sind. Jonas hat folgenden Entwurf für die Projektbeschreibung erstellt, der dem Prüfungsausschuss vorgelegt werden soll.

```
Projekttitel:        Vernetzung der Produktion bei der Kreuzer Kunststofftechnik GmbH
Ausgangssituation:   Die Kreuzer Kunststofftechnik GmbH hat viele Maschinen in drei
                     Hallen und möchte alles digitalisieren, weil das heute Standard ist.
Projektziel:         Die Produktion soll effizienter und moderner werden (Industrie 4.0).
Zeitplanung:         Arbeitspaket       | Stunden
                     Analyse            |   6
                     Konzept            |   8
                     Umsetzung          |  20
                     Test               |   8
                     Dokumentation      |  10
                     Puffer             |   0
```

Der Kunde wünscht bis zum 27.11. ein Dashboard, das für die SGM 2 Zählerstand, Status und Zykluszeit mit einer Aktualisierung von höchstens 10 Sekunden anzeigt. Die Anlage darf dabei nicht verändert werden, und die Daten sollen verschlüsselt über das Werksnetz zur Plattform der Brevanta übertragen werden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beurteilen Sie Ausgangssituation und Projektziel im Entwurf. Nennen Sie mindestens vier Mängel und erklären Sie, warum sie bei der Genehmigung durch den Prüfungsausschuss problematisch sind.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Prüfen Sie die Zeitplanung rechnerisch gegen die Vorgaben der Verordnung. Erstellen Sie einen korrigierten Stundenplan, der alle Aufgaben einschließlich Dokumentation berücksichtigt, einen Puffer enthält und die Höchstdauer einhält.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Formulieren Sie für das eingegrenzte Projekt (nur die SGM 2) eine Ausgangssituation in drei bis vier Sätzen und ein SMART-Projektziel.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Nach 10 Projektstunden stellt Jonas fest, dass das Register für die Zykluszeit nicht lesbar ist, der Wert sich aber aus der Differenz von Zählerstand und Zeit berechnen ließe. Bewerten Sie, wie er vorgehen sollte, und beurteilen Sie, ob dafür eine erneute Abstimmung mit der zuständigen Stelle nötig ist.

**Musterlösungshinweise:** Teilaufgabe 1: Die Ausgangssituation beschreibt weder die vorhandene Technik (Steuerung, Schnittstellen, Netz) noch das konkrete Problem noch einen Auslöser; „alles digitalisieren" ist nicht abgegrenzt. Das Ziel ist nicht messbar, nicht terminiert und nicht überprüfbar („effizienter", „moderner"); „Industrie 4.0" ist ein Schlagwort. Zudem fehlen Abgrenzung (welche Maschinen), Bezug zu den nachzuweisenden Fähigkeiten (Schnittstelle, Informationssicherheit, Übertragung) und erkennbarer Eigenanteil. Der Prüfungsausschuss kann nicht beurteilen, ob das Projekt in 40 Stunden machbar und prüfungsgeeignet ist; die Verordnung verlangt Ausgangssituation, Projektziel und Zeitplanung. Teilaufgabe 2: Summe 6 + 8 + 20 + 8 + 10 + 0 = 52 Stunden; die Höchstdauer von 40 Stunden für Projektarbeit und Dokumentation wird um 12 Stunden überschritten, außerdem fehlt ein Puffer. Mögliche Neuverteilung: Bestandsanalyse und Anforderungen 5, Konzept mit Sicherheitskonzept 5, Testkonzept 2, Aufbau und Konfiguration 10, Schnittstelle und Visualisierung 6, Tests und Inbetriebnahme 3, Dokumentation 8, Puffer 1 = 40 Stunden. Voraussetzung ist die Eingrenzung auf eine Maschine; andere Aufteilungen sind zulässig, solange die Summe 40 nicht überschreitet. Teilaufgabe 3: Z. B. Ausgangssituation: Bei der Kreuzer Kunststofftechnik GmbH steht die Spritzgießmaschine SGM 2 (Baujahr 2004) mit einer Altsteuerung ohne Netzwerkanschluss; Zählerstand, Status und Zykluszeit sind nur über eine serielle Modbus-RTU-Schnittstelle lesbar und werden bisher von Hand erfasst; das Produktionsnetz ist bislang nicht dokumentiert. Ziel: Bis zum 27.11. werden Zählerstand, Status und Zykluszeit der SGM 2 über ein Gateway rückwirkungsfrei gelesen, per MQTT über TLS an die Plattform übertragen und im Dashboard mit höchstens 10 s Verzögerung angezeigt; die Steuerung wird nicht verändert. Teilaufgabe 4: Vorgehen: Problem und Abweichung nachvollziehbar festhalten (Risiko eingetreten), technische Alternative prüfen (Berechnung der Zykluszeit im Gateway aus Zählerstand und Zeitstempel, vorher gegen die Anzeige der Maschine verifizieren), mit dem Kunden und der Ausbildenden abstimmen, den Test erweitern und die Entscheidung in der Dokumentation begründen. Eine unwesentliche Änderung im Lösungsweg bei gleichem Ziel muss in der Regel nur dokumentiert werden; ändern sich dagegen Projektziel oder Umfang wesentlich, ist die Abstimmung mit der zuständigen Stelle bzw. dem Prüfungsausschuss geboten — das Verfahren ist je nach zuständiger Stelle unterschiedlich geregelt und vorab zu erfragen.

---

#### F-DV5-02 · Fallaufgabe

**Themenbezug:** 12.1 (Bestandsanalyse, Anforderungen), 12.2 (Nutzwertanalyse, Informationssicherheit, Fernwartung)

**Ausgangssituation:** Die Kaltenbach Abfüllservice GmbH betreibt eine Abfüllanlage mit einer Altsteuerung ohne Ethernet; verfügbar sind eine serielle Schnittstelle (RS-485, Modbus RTU) und digitale Ausgänge. Das Produktionsnetz hängt derzeit ohne Firewall direkt am Büronetz. Der Kunde möchte Betriebs- und Energiedaten der Anlage in einem Dashboard sehen und künftig weitere Anlagen anbinden. Die Auszubildende Selin Aydin von der Brevanta hat drei Varianten gesammelt: A) Edge-Gateway vor Ort mit lokalem MQTT-Broker und gesicherter Weiterleitung an die Plattform, B) je Anlage ein Mobilfunk-Router mit direkter Verbindung zur Cloud, C) Austausch der Steuerung gegen ein netzwerkfähiges Modell. Die Kriterien und Bewertungen (Punkte 1 bis 5, 5 = beste Bewertung) stehen in der folgenden Tabelle.

```
Kriterium                      | Gewicht | A Edge-Gateway | B Mobilfunk-Router | C Steuerungstausch
Informationssicherheit         |   30    |       4        |         2          |         5
Kosten                         |   25    |       4        |         3          |         1
Umsetzbarkeit in 40 Stunden    |   25    |       5        |         4          |         1
Erweiterbarkeit                |   20    |       4        |         3          |         5
```

Der Anlagenhersteller verlangt für die Fernwartung einen dauerhaft erreichbaren Zugang über eine Portweiterleitung auf die Steuerung. Die Auszubildende soll ihre Entscheidung dem Kunden und später im Fachgespräch begründen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie die Nutzwerte der drei Varianten und nennen Sie die empfohlene Variante.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Prüfen Sie die Stabilität des Ergebnisses: Wie ändern sich die Nutzwerte, wenn die Informationssicherheit mit 40, die Kosten mit 15 und die übrigen Kriterien unverändert gewichtet werden? Nennen Sie außerdem eine Schwäche der Nutzwertanalyse.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie für die gewählte Variante ein knappes Sicherheitskonzept mit mindestens fünf konkreten Maßnahmen und ordnen Sie jeder Maßnahme ein Schutzziel zu.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Forderung des Herstellers nach einem dauerhaften Fernzugang per Portweiterleitung und schlagen Sie eine sichere Alternative vor.

**Musterlösungshinweise:** Teilaufgabe 1: A = 30 × 4 + 25 × 4 + 25 × 5 + 20 × 4 = 120 + 100 + 125 + 80 = 425. B = 30 × 2 + 25 × 3 + 25 × 4 + 20 × 3 = 60 + 75 + 100 + 60 = 295. C = 30 × 5 + 25 × 1 + 25 × 1 + 20 × 5 = 150 + 25 + 25 + 100 = 300. Die Gewichte ergeben 100; Empfehlung ist Variante A (Edge-Gateway) mit 425 Punkten. Teilaufgabe 2: A = 40 × 4 + 15 × 4 + 25 × 5 + 20 × 4 = 160 + 60 + 125 + 80 = 425; B = 80 + 45 + 100 + 60 = 285; C = 200 + 15 + 25 + 100 = 340. Die Rangfolge bleibt (A vor C vor B); der Vorsprung von A wächst gegenüber B und schrumpft gegenüber C, weil C bei der Sicherheit gut abschneidet. Das Ergebnis ist damit robust. Schwächen der Nutzwertanalyse: Gewichte und Punkte sind subjektiv und lassen sich beeinflussen, Kriterien können sich überschneiden, hohe Werte in einem Kriterium können niedrige in einem anderen ausgleichen (Kompensation); K.-o.-Kriterien werden nicht erfasst. Teilaufgabe 3: Z. B. (1) Trennung von Produktions- und Büronetz mit Firewall bzw. eigenem Segment — Vertraulichkeit, Verfügbarkeit; (2) Gateway liest nur, keine Schreibzugriffe auf die Steuerung — Integrität; (3) Verschlüsselung der Übertragung zur Plattform mit TLS und Gerätezertifikat, eigener Benutzer je Gerät — Vertraulichkeit; (4) Standardpasswörter ändern, nicht benötigte Dienste abschalten, Rollen nach Least Privilege — Vertraulichkeit, Integrität; (5) Pufferung bei Verbindungsausfall und Sicherung der Gateway-Konfiguration — Verfügbarkeit; (6) Protokollierung der Zugriffe und geplante Aktualisierungen im Wartungsfenster — Integrität, Verfügbarkeit. Teilaufgabe 4: Ein dauerhaft erreichbarer Port auf die Steuerung ist hoch riskant: Die Altsteuerung bietet keine moderne Authentifizierung, der Dienst wäre aus dem Internet erreichbar und für Scans und Angriffe sichtbar, jede Schwachstelle wirkt unmittelbar auf die Anlage (Verfügbarkeit, Funktionssicherheit). Alternative: Fernzugang nur über VPN mit Mehrfaktor-Anmeldung, auf Anfrage zeitlich befristet durch den Kunden freigegeben, über einen gesicherten Übergabepunkt in einer eigenen Zone (DMZ) und mit Protokollierung; Zugriff nur auf definierte Ziele und mit minimalen Rechten, schriftliche Regelung mit dem Hersteller.

---

#### F-DV5-03 · Fallaufgabe

**Themenbezug:** 12.2 (Dokumentation, Soll-Ist-Vergleich, Vertraulichkeit), 12.3 (Präsentation, Fachgespräch)

**Ausgangssituation:** Der Auszubildende Murat Demir hat die Projektarbeit „Anbindung der Abfülllinie 2 an die Energie- und Zustandsüberwachung" fast abgeschlossen. Sein Ausbilder prüft den Dokumentationsentwurf und notiert Folgendes.

```
Gliederung des Entwurfs
1 Einleitung (1 Seite)
2 Grundlagen Netzwerke und Protokolle (9 Seiten, u. a. „Was ist MQTT?", „Das OSI-Modell")
3 Durchführung (4 Seiten, überwiegend Screenshots ohne Beschriftung)
4 Fazit (eine halbe Seite): „Das Projekt verlief ohne Probleme und hat sich gelohnt."
Anhang: Screenshot der Gateway-Konfiguration (Administratorpasswort sichtbar),
        Netzplan (Verbindungen rot/grün, ohne Legende)
Sätze im Text: „Der Zeitplan wurde exakt eingehalten, es gab keine Abweichungen."
               „Das Projekt spart dem Kunden viel Geld."
```

Der Soll-Ist-Vergleich der Arbeitsstunden in der Dokumentation lautet:

```
Arbeitspaket                       | Soll (h) | Ist (h)
Bestandsanalyse                    |    6     |    8
Konzept und Variantenvergleich     |    7     |    5
Aufbau und Konfiguration           |   12     |   14
Tests und Inbetriebnahme           |    6     |    5
Dokumentation                      |    8     |    8
Puffer                             |    1     |    0
Summe                              |   40     |   40
```

Murat soll die Dokumentation überarbeiten und die Präsentation vorbereiten. Die Prüfung findet im zweiten Teil mit Präsentation und Fachgespräch statt.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Beurteilen Sie den Entwurf und nennen Sie mindestens fünf Mängel in Aufbau, Inhalt und Anhang, jeweils mit einer Verbesserung.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie die Abweichungen je Arbeitspaket und in der Summe. Bewerten Sie die Aussage „exakt eingehalten, keine Abweichungen" und formulieren Sie einen Absatz für den Soll-Ist-Vergleich mit plausiblen Gründen.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Bewerten Sie den Screenshot mit dem sichtbaren Administratorpasswort und den Umgang mit Kundendaten in Dokumentation und Präsentation. Nennen Sie Maßnahmen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie eine Gliederung der 15-minütigen Präsentation mit Minutenangaben (Summe höchstens 15), beschreiben Sie zwei Visualisierungen der Architektur und formulieren Sie drei Fragen, mit denen Murat im Fachgespräch rechnen sollte, jeweils mit einer Antwortrichtung.

**Musterlösungshinweise:** Teilaufgabe 1: Mängel und Verbesserungen: (1) Neun Seiten Grundlagen statt Projektbezug — auf Wesentliches kürzen und stattdessen Entscheidungen und Begründungen darlegen; (2) Durchführung nur als unbeschriftete Screenshots — Beschreibung, Begründung und Konfigurationsauszug mit Erklärung; (3) kein Bestands-, Anforderungs- und Variantenkapitel erkennbar — ergänzen (Ist-Architektur, Anforderungen, Nutzwertanalyse); (4) Fazit ohne Soll-Ist-Vergleich, Abweichungen und Lessons Learned — „ohne Probleme" ist unglaubwürdig; (5) Wirtschaftlichkeit ohne Rechnung — Kosten, Nutzen, Annahmen und Amortisation darstellen; (6) Netzplan ohne Legende, Farben als einziger Informationsträger — Legende, Beschriftung, Muster oder Text ergänzen; (7) Passwort im Screenshot — schwärzen; (8) Informationssicherheit, Tests und Inbetriebnahmeprotokoll fehlen offenbar im Aufbau — ergänzen. Teilaufgabe 2: Abweichungen: +2 (Bestandsanalyse), −2 (Konzept), +2 (Aufbau), −1 (Tests), 0 (Dokumentation), −1 (Puffer); Summe +2 − 2 + 2 − 1 + 0 − 1 = 0. Die Gesamtsumme von 40 Stunden stimmt, einzelne Pakete weichen aber ab; die Aussage „keine Abweichungen" ist daher falsch. Beispielabsatz: Die Gesamtdauer entsprach dem Plan von 40 Stunden. Die Bestandsanalyse dauerte zwei Stunden länger, weil die Protokollbeschreibung der Abfülllinie unvollständig war und Register durch Versuche ermittelt werden mussten; zwei Stunden wurden im Konzept eingespart, weil die Entscheidungskriterien durch die Analyse bereits feststanden. Der Aufbau benötigte zwei Stunden mehr wegen der Zertifikatseinrichtung; die Tests verliefen ohne Nacharbeit eine Stunde kürzer; der Puffer wurde nicht benötigt. Teilaufgabe 3: Ein sichtbares Administratorpasswort ist ein Sicherheitsrisiko (Zugriff auf das Gateway, Missbrauch im Produktionsnetz) und verletzt die Vertraulichkeit; die Dokumentation wird weitergegeben und archiviert. Maßnahmen: Passwort umgehend ändern (Screenshot gilt als kompromittiert), Bild schwärzen oder neu erstellen, in Dokumentation und Folien keine Zugangsdaten, Schlüssel und interne Adressen zeigen, vertrauliche Betriebsdaten mit dem Kunden abstimmen bzw. anonymisieren, Veröffentlichung und Weitergabe der Unterlagen klären. Teilaufgabe 4: Beispiel: 1 Min. Einstieg und Kunde; 2 Min. Ausgangssituation und Ziel; 3 Min. Bestand und Anforderungen mit Ebenenbild; 3 Min. Lösung und Entscheidung (Nutzwertanalyse); 3 Min. Umsetzung, Schnittstellen und Sicherheitskonzept; 2 Min. Tests, Soll-Ist und Wirtschaftlichkeit; 1 Min. Fazit = 15 Minuten, Rückfragen im Fachgespräch. Visualisierungen: (a) Ist- und Soll-Architektur im gleichen Layout mit Ebenenbändern, Protokollen an den Verbindungen und hervorgehobenen neuen Komponenten; (b) Weg eines Messwerts vom Sensor über Gateway und Broker bis zum Dashboard mit Sicherheitszonen. Erwartbare Fragen: Warum diese Variante und nicht eine andere (Entscheidung, Kriterien, Alternativen, Grenzen)? Wie ist die Anlage vor unberechtigtem Zugriff geschützt (Segmentierung, Zugriffskonzept, Verschlüsselung)? Was passiert bei Ausfall der Verbindung oder bei zehnfacher Datenmenge (Pufferung, Kapazität, Skalierung)?
