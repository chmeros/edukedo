---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI5
fachgebiet_title: "Planen und Umsetzen eines Projektes der Systemintegration"
thema_code: "SI5-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Situationen im Prüfungsbereich „Planen und Umsetzen eines Projektes der Systemintegration" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 20 und § 24 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen die Themen 12.1 bis 12.3 zu zusammenhängenden Situationen aus der Praxis eines Systemintegrationsprojekts bei der Brevanta IT-Systemhaus GmbH: Projektbeschreibung und Zeitplan, Alternativenbewertung und Wirtschaftlichkeit, Schwachstellen, Schutzmaßnahmen und Präsentation. Sie dienen der Vorbereitung auf die betriebliche Projektarbeit mit Dokumentation sowie auf Präsentation und Fachgespräch. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-SI5-01 · Fallaufgabe

**Themenbezug:** 12.1 (Projektbeschreibung, Anforderungen, Zeitplanung im 40-Stunden-Rahmen)

**Ausgangssituation:** Jonas Weber, Auszubildender im dritten Ausbildungsjahr bei der Brevanta IT-Systemhaus GmbH, möchte für seine betriebliche Projektarbeit die Einführung eines zentralen Backup-Systems bei der Hollmann Metallbau GmbH durchführen (60 Arbeitsplätze, ein Standort, zwei Dateiserver, ein Datenbankserver). Seine Projektbeschreibung zur Genehmigung durch den Prüfungsausschuss enthält folgenden Auszug:

```
Ausgangssituation:
Die Hollmann Metallbau GmbH hat ein Backup-System. Es ist veraltet.

Projektziel:
Das Backup soll besser und sicherer werden.

Zeitplanung:
Nr | Arbeitspaket                                         | Stunden
1  | Installation und Konfiguration der Backup-Appliance   |  16
2  | Einrichtung der Sicherungsjobs und Datenübernahme     |  12
3  | Anforderungsgespräch mit dem Kunden                   |   2
4  | Netzwerkanbindung und Firewall-Regeln                 |   8
5  | Einweisung der Administratoren                        |   4
6  | Projektdokumentation                                  |  10
   | Summe                                                 |  52
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Nennen Sie fünf Mängel dieser Projektbeschreibung und begründen Sie jeweils kurz, warum sie für die Genehmigung oder die spätere Bewertung problematisch sind. Beziehen Sie sich dabei auf die Anforderungen an die Projektbeschreibung und auf die nachzuweisenden Fähigkeiten im Projektbereich der Systemintegration.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Formulieren Sie für das Projekt eine tragfähige Ausgangssituation (drei bis vier Sätze, erfundene, aber plausible Zahlen sind erlaubt) und ein Projektziel mit mindestens drei messbaren Zielgrößen.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Erstellen Sie einen überarbeiteten Zeitplan, dessen Summe die zulässige Höchstdauer einhält. Er muss mindestens Anforderungsanalyse, Lösungsalternativen, Konzeption mit Testkonzept, Umsetzung, Tests, Übergabe, Dokumentation und einen Puffer enthalten.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Beurteilen Sie, ob das Vorhaben grundsätzlich als Prüfungsprojekt der Systemintegration geeignet ist. Nennen Sie je zwei Argumente dafür und dagegen und beschreiben Sie, was vor Beginn der Projektarbeit noch geklärt sein muss.

**Musterlösungshinweise:** Teilaufgabe 1 (je zutreffendem, begründetem Mangel 1 Punkt, höchstens 5): (a) Ausgangssituation zu vage — weder Umfeld noch Probleme, Zahlen oder Ist-Zustand sind genannt, die Ausgangssituation ist aber einer der drei Pflichtbestandteile; (b) Projektziel nicht messbar („besser und sicherer") und deshalb nicht testbar oder im Soll-Ist-Vergleich überprüfbar; (c) Zeitplan summiert sich auf 52 Stunden und überschreitet die Höchstgrenze von 40 Stunden für Projektarbeit und Dokumentation; (d) Lösungsalternativen und ihre Bewertung (technisch, wirtschaftlich, qualitativ) fehlen im Zeitplan, obwohl dies nachzuweisen ist; (e) Tests, insbesondere ein Wiederherstellungstest, und ein Testkonzept fehlen; (f) die Anforderungserhebung ist mit 2 Stunden knapp und eine Ist-Analyse fehlt; (g) kein Puffer, keine Abhängigkeiten oder Reihenfolge erkennbar; (h) Schwachstellen- bzw. Sicherheitsbetrachtung (Zugriffsschutz und Verschlüsselung der Sicherungen) fehlt. Teilaufgabe 2: Beispiel Ausgangssituation: Die Hollmann Metallbau GmbH (60 Arbeitsplätze, zwei Dateiserver, ein Datenbankserver) sichert ihre Daten derzeit mit einem Bandlaufwerk, dessen Hersteller den Support beendet hat. In den letzten zwölf Monaten schlugen vier Sicherungsläufe fehl; eine Wiederherstellung wurde nie getestet. Beispiel Ziel: Alle drei Server werden täglich gesichert (maximaler Datenverlust 24 Stunden); eine Freigabe mit 500 GB ist in höchstens 2 Stunden wiederherstellbar (Nachweis durch Wiederherstellungstest); eine Kopie der Sicherung liegt verschlüsselt außerhalb des Standorts (3-2-1-Regel); die Berechtigungen für den Zugriff auf die Sicherungen sind dokumentiert und auf zwei Administratorenkonten beschränkt (Bewertung: 1 Punkt Ausgangssituation, 3 Punkte messbare Ziele, 1 Punkt Abgrenzung oder Stimmigkeit). Teilaufgabe 3: Beispiel mit Summe 40 Stunden — Anforderungsanalyse (Ist/Soll) 3 h; Lösungsalternativen und Nutzwertanalyse 3 h; Konzeption inkl. Testkonzept 3 h; Installation und Konfiguration der Appliance 8 h; Netzwerkanbindung und Firewall-Regeln 4 h; Einrichtung der Sicherungsjobs und Datenübernahme 5 h; Tests inkl. Wiederherstellungstest 3 h; Übergabe, Einweisung und Abnahme 3 h; Dokumentation 6 h; Puffer 2 h (3 + 3 + 3 + 8 + 4 + 5 + 3 + 3 + 6 + 2 = 40). Andere Verteilungen sind zulässig; Bewertung: Summe höchstens 40 h (1 Punkt), alle geforderten Pakete vorhanden (2 Punkte), sinnvolle Reihenfolge und Abhängigkeiten (1 Punkt), Puffer und realistische Dokumentationszeit (1 Punkt). Teilaufgabe 4: Grundsätzlich geeignet, wenn der Umfang zugeschnitten wird. Dafür sprechen: realer Kundenauftrag mit klaren Alternativen (Band, Appliance, Cloud) und damit Stoff für den Alternativenvergleich; Test-, Sicherheits- und Übergabeanteile (Wiederherstellungstest, Schutz der Sicherungen) decken mehrere der nachzuweisenden Fähigkeiten ab. Dagegen bzw. kritisch: Umfang (Aufbau, Netzwerkanbindung und Datenübernahme in 40 Stunden knapp); Abhängigkeit von Lieferzeit und Wartungsfenstern; Datenschutz bei Wiederherstellungstests mit echten Kundendaten. Vorab zu klären: Einverständnis des Kunden und des Betriebs (Anonymisierung), verfügbare Hardware und Termine, Abgrenzung der Eigenleistung, Genehmigung der überarbeiteten Projektbeschreibung durch den Prüfungsausschuss vor Beginn.

---

#### F-SI5-02 · Fallaufgabe

**Themenbezug:** 12.1 (Lösungsalternativen, Nutzwertanalyse) + 12.2 (Wirtschaftlichkeit) + 12.3 (Begründung der Entscheidung)

**Ausgangssituation:** Die Rothmann Logistik GmbH (60 Beschäftigte) betreibt ein Lager am Hauptsitz und einen zweiten Standort in 30 km Entfernung. Bisher greifen die Beschäftigten des zweiten Standorts per Remote-Verbindung über das Internet auf Warenwirtschaft und Dateien zu; das Vorgehen ist langsam, schlecht abgesichert und fällt oft aus. Der Kunde verlangt: Die Übertragung zwischen den Standorten muss verschlüsselt sein (Muss), und der Betrieb soll durch die Managed-Services-Abteilung der Brevanta möglich sein. Auszubildende Selin Aydin untersucht für ihre Projektarbeit drei Alternativen. Alle Alternativen erfüllen das Muss-Kriterium der Verschlüsselung.

```
A: Standortkopplung per IPsec-VPN über vorhandene Internetanschlüsse
   (2 Firewalls je 1.800 EUR, Einrichtung 1.200 EUR einmalig, Wartung/Support 600 EUR pro Jahr)
B: Provider-Standleitung (Layer-2-Anbindung)
   (Bereitstellung 1.500 EUR einmalig, 600 EUR pro Monat)
C: SD-WAN als Managed Service
   (2 Geräte je 900 EUR einmalig, 250 EUR pro Monat)
```

Die Bewertung erfolgte mit Punkten von 1 (schlecht) bis 5 (sehr gut):

```
Kriterium                      | Gewicht | A (VPN) | B (Standleitung) | C (SD-WAN)
Kosten                         |   30 %  |    5    |        2         |     3
Verfügbarkeit und Performance  |   25 %  |    3    |        5         |     4
Sicherheit                     |   25 %  |    4    |        5         |     4
Administrationsaufwand         |   10 %  |    3    |        4         |     5
Skalierbarkeit                 |   10 %  |    4    |        2         |     5
```

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie die Nutzwerte der drei Alternativen und geben Sie die Rangfolge an.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Nach einem Ausfall im Vorjahr gewichtet der Kunde neu: Verfügbarkeit und Performance 35 %, Kosten 20 %, Sicherheit 25 %, Administrationsaufwand 10 %, Skalierbarkeit 10 %. Berechnen Sie die Nutzwerte erneut und deuten Sie das Ergebnis im Hinblick auf die Belastbarkeit der Entscheidung.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Berechnen Sie für jede Alternative die Gesamtkosten über drei Jahre (einmalige und laufende Kosten) und die Differenz zwischen der teuersten und der günstigsten Alternative.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Sprechen Sie unter Berücksichtigung technischer, wirtschaftlicher und qualitativer Aspekte eine begründete Empfehlung aus, nennen Sie je eine Einschränkung oder ein Risiko der empfohlenen Variante und formulieren Sie die Antwort so, wie Sie sie im Fachgespräch auf die Frage „Warum haben Sie sich so entschieden?" geben würden (Kernaussage, Begründung, Beleg).

**Musterlösungshinweise:** Teilaufgabe 1: A = 0,30 · 5 + 0,25 · 3 + 0,25 · 4 + 0,10 · 3 + 0,10 · 4 = 1,5 + 0,75 + 1,0 + 0,3 + 0,4 = 3,95. B = 0,30 · 2 + 0,25 · 5 + 0,25 · 5 + 0,10 · 4 + 0,10 · 2 = 0,6 + 1,25 + 1,25 + 0,4 + 0,2 = 3,70. C = 0,30 · 3 + 0,25 · 4 + 0,25 · 4 + 0,10 · 5 + 0,10 · 5 = 0,9 + 1,0 + 1,0 + 0,5 + 0,5 = 3,90. Rangfolge: A (3,95) vor C (3,90) vor B (3,70); der Abstand von A und C ist mit 0,05 sehr gering (Bewertung: je 1 Punkt je korrektem Nutzwert, 1 Punkt Rangfolge mit Hinweis auf den kleinen Abstand). Teilaufgabe 2: A = 0,20 · 5 + 0,35 · 3 + 0,25 · 4 + 0,10 · 3 + 0,10 · 4 = 1,0 + 1,05 + 1,0 + 0,3 + 0,4 = 3,75. B = 0,20 · 2 + 0,35 · 5 + 0,25 · 5 + 0,10 · 4 + 0,10 · 2 = 0,4 + 1,75 + 1,25 + 0,4 + 0,2 = 4,00. C = 0,20 · 3 + 0,35 · 4 + 0,25 · 4 + 0,10 · 5 + 0,10 · 5 = 0,6 + 1,4 + 1,0 + 0,5 + 0,5 = 4,00. Deutung: Die Rangfolge hängt stark von der Gewichtung ab: A fällt vom ersten auf den letzten Platz, B und C liegen gleichauf. Die Entscheidung ist daher nicht robust; die Gewichte müssen mit dem Kunden abgestimmt und dokumentiert werden, und bei Gleichstand sind zusätzliche Kriterien (z. B. Gesamtkosten, Risiken) heranzuziehen. Teilaufgabe 3: A = 2 · 1.800 + 1.200 + 3 · 600 = 3.600 + 1.200 + 1.800 = 6.600 EUR. B = 1.500 + 36 · 600 = 1.500 + 21.600 = 23.100 EUR. C = 2 · 900 + 36 · 250 = 1.800 + 9.000 = 10.800 EUR. Differenz teuerste (B) minus günstigste (A) = 23.100 − 6.600 = 16.500 EUR. Teilaufgabe 4: Vertretbar sind mehrere Empfehlungen, wichtig ist die Begründung: Beispiel Empfehlung C (SD-WAN): bei höherem Gewicht der Verfügbarkeit mit B gleichauf (4,00), aber über drei Jahre 12.300 EUR günstiger (23.100 − 10.800); gute Skalierbarkeit und geringer Administrationsaufwand, da Betrieb als Managed Service möglich ist. Einschränkungen/Risiken: Abhängigkeit vom Dienstanbieter und vertragliche Bindung, Datenschutz und Vertragsgestaltung (Auftragsverarbeitung) prüfen, Verfügbarkeit hängt weiterhin von den Internetanschlüssen ab. Alternativ ist A bei knappem Budget vertretbar, wenn Verfügbarkeit und Skalierbarkeit weniger gewichtet werden und das Risiko offen benannt wird. Beispielantwort im Fachgespräch: „Ich habe SD-WAN gewählt, weil der Kunde nach dem Ausfall Verfügbarkeit höher gewichtet hat und die Variante dort mit der Standleitung gleichauf liegt (jeweils 4,00), aber über drei Jahre rund 12.300 EUR günstiger ist. Einschränkend bleibt die Abhängigkeit vom Anbieter; deshalb habe ich Vertragslaufzeit und Auftragsverarbeitung abgestimmt."

---

#### F-SI5-03 · Fallaufgabe

**Themenbezug:** 12.2 (Schwachstellen, Schutzmaßnahmen, Änderung durchführen) + 12.3 (Präsentation, Fachgespräch)

**Ausgangssituation:** Für das Ingenieurbüro Meyerhoff (35 Beschäftigte) führt Umschüler Tim Brandt als Projektarbeit eine Härtung der IT-Umgebung durch. Ein Schwachstellenscan hat die folgenden Befunde geliefert (Werte fiktiv, die Befunde wurden bereits auf Fehlalarme geprüft):

```
Nr | System             | Befund                                                              | CVSS | Erreichbarkeit
1  | VPN-Gateway        | Firmware mit bekannter Schwachstelle (Codeausführung aus der Ferne), Exploit öffentlich | 9,8 | aus dem Internet
2  | Dateiserver        | Veraltetes Dateifreigabeprotokoll (SMBv1) aktiviert                  | 8,1 | internes LAN
3  | WLAN-Gastnetz      | Nicht vom Büro-LAN getrennt, Gäste erreichen interne Systeme          | 7,5 | Gäste im Gebäude
4  | Netzwerkdrucker    | Standard-Administrationspasswort unverändert                         | 6,5 | internes LAN
5  | Intranet-Webserver | Abgelaufenes selbstsigniertes Zertifikat                              | 4,3 | internes LAN
```

Die Änderung am VPN-Gateway soll nach Absprache mit dem Büro am Samstagvormittag im Wartungsfenster erfolgen; das Gateway ist der einzige Zugang für die Beschäftigten im Homeoffice.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Bringen Sie die fünf Befunde in eine begründete Reihenfolge der Bearbeitung. Gehen Sie dabei über den CVSS-Wert hinaus auf weitere Faktoren ein.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Schlagen Sie für die Befunde 1 bis 4 jeweils eine geeignete Schutzmaßnahme vor und ordnen Sie sie als technisch oder organisatorisch ein.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Beschreiben Sie, wie Sie das Firmware-Update des VPN-Gateways vorbereiten und durchführen (Sicherung, Rückfallplan, Test, Kommunikation) und wie Sie anschließend die Wirksamkeit der Maßnahme nachweisen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie eine Gliederung für die Präsentation dieses Projekts mit Zeitangaben (Gesamtdauer innerhalb der zulässigen Höchstdauer) und formulieren Sie zwei Fragen, die der Prüfungsausschuss im Fachgespräch stellen könnte, jeweils mit einem Antwortansatz.

**Musterlösungshinweise:** Teilaufgabe 1: Vertretbare Reihenfolge 1, 3, 2, 4, 5. Befund 1 zuerst: höchster Wert, aus dem Internet erreichbar, öffentlicher Exploit — ein Angreifer braucht keinen Zugang zum Netz, und das Gateway ist zentraler Zugang. Befund 3 vor Befund 2, weil die fehlende Trennung jedem Gast ohne weitere Hürden Zugriff auf interne Systeme (auch auf den Dateiserver) verschafft und damit Schutzmaßnahmen im internen Netz untergräbt; alternativ ist die Reihenfolge 1, 2, 3 mit Begründung (höherer CVSS-Wert, Dateiserver als Datenträger der Kerndaten) vertretbar. Befund 4 liegt im internen Netz und ist leicht zu beheben; Befund 5 gefährdet kaum Daten, erzeugt aber Warnmeldungen (Gewöhnung der Anwender:innen an Zertifikatswarnungen) und wird zuletzt behandelt. Zusätzliche Faktoren: Erreichbarkeit, Exploit-Verfügbarkeit, Wert der betroffenen Systeme und Daten, Aufwand der Behebung, Abhängigkeiten zwischen Befunden (Bewertung: 3 Punkte begründete Reihenfolge, 2 Punkte weitere Faktoren). Teilaufgabe 2: Befund 1: Firmware auf eine fehlerbereinigte Version aktualisieren und Zugang zusätzlich mit Mehr-Faktor-Authentifizierung und eingeschränkten Quelladressen absichern (technisch); zusätzlich Patch-Prozess mit festen Zuständigkeiten (organisatorisch). Befund 2: SMBv1 abschalten und nur aktuelle Protokollversionen zulassen, vorher Abhängigkeiten (Altgeräte) prüfen (technisch). Befund 3: Gastnetz in ein eigenes VLAN legen, Zugriff auf das Internet erlauben und alles andere per Firewall sperren (technisch); Nutzungsrichtlinie für das Gastnetz (organisatorisch). Befund 4: Standardpasswort ändern, Administrationszugang auf das Verwaltungsnetz begrenzen (technisch), Passwortrichtlinie und Übergabeprozess für neue Geräte (organisatorisch). Jeweils 1 Punkt je passender und eingeordneter Maßnahme, 1 Punkt für die korrekte Zuordnung technisch/organisatorisch insgesamt. Teilaufgabe 3: Vorbereitung: Konfiguration des Gateways exportieren und sichern, Hersteller-Hinweise zur Firmware lesen, Rückfallplan festlegen (bisherige Firmware und Konfiguration bereithalten, Abbruchkriterium, z. B. wenn der Tunnel nach 30 Minuten nicht wieder stabil läuft), Zugriff zur Not über eine zweite Person oder einen Notzugang sicherstellen; Information der Beschäftigten über Wartungsfenster und kurzzeitigen Ausfall; möglichst vorher an einem Testgerät oder nach Rücksprache mit dem Hersteller erproben. Durchführung: Update einspielen, Dienste prüfen, Funktionstest (Anmeldung, Zugriff auf Freigaben aus dem Homeoffice), Berechtigungstest, Protokolle sichten; Dokumentation der Schritte und Zeiten. Wirksamkeit: erneuter Schwachstellenscan, der Befund 1 nicht mehr meldet; Ergebnis im Testprotokoll festhalten, Restrisiko benennen (z. B. künftige Schwachstellen), Aktualisierungsrhythmus festlegen. Teilaufgabe 4: Beispielgliederung (14 Minuten, Obergrenze 15): 1 Einstieg und Kundenbild (1 Min.); 2 Ausgangssituation und Ziel (2 Min.); 3 Scanergebnis, Bewertung und Priorisierung der Befunde (3 Min.); 4 Maßnahmen und Umsetzung mit Schwerpunkt VPN-Update und Segmentierung inkl. Rückfallplan (4 Min.); 5 Tests und Wirksamkeitsnachweis, Übergabe (2 Min.); 6 Aufwand und Soll-Ist-Vergleich (1 Min.); 7 Fazit und Restrisiken (1 Min.). Beispielfragen: (a) „Warum haben Sie das Gastnetz vor dem Dateiserver behandelt?" — Kernaussage: weil die fehlende Trennung ein direkter Zugang zu internen Systemen war; Begründung und Bezug zu Erreichbarkeit/Schaden; Hinweis, dass SMBv1 danach nur noch aus dem Büronetz erreichbar war. (b) „Was ist mit den Schwachstellen, die Sie nicht behoben haben, und wie bewerten Sie das Restrisiko?" — Antwortansatz: Befund 5 bewusst zurückgestellt (niedriger Wert, internes Netz), Maßnahme und Termin benannt, Restrisiko mit dem Kunden abgestimmt und dokumentiert. Bewertung: 3 Punkte Gliederung mit stimmigem Zeitplan (Summe höchstens 15 Minuten), 2 Punkte für zwei passende Fragen mit Antwortansatz.
