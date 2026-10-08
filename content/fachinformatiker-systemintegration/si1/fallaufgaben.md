---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI1
fachgebiet_title: "Konzipieren und Realisieren von IT-Systemen"
thema_code: "SI1-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Konzipieren und Realisieren von IT-Systemen“ der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 4 Nr. 1 und Anlage (Ausbildungsrahmenplan) Abschnitt C lfd. Nr. 1 sowie § 20 Abs. 2 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus SI1 (8.1–8.4) zu zusammenhängenden Kundenprojekten des Bereichs Systemintegration/Managed Services der Brevanta IT-Systemhaus GmbH, wie sie im Prüfungsbereich „Planen und Umsetzen eines Projektes der Systemintegration“ und in den schriftlichen Prüfungsbereichen der Fachrichtung typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-SI1-01 · Fallaufgabe

**Themenbezug:** 8.1 (Anforderungen, Dimensionierung, Variantenbewertung, Konzept) + 8.2 (Virtualisierung, externe Ressourcen)

**Ausgangssituation:** Die Steuerkanzlei Aldenhoff & Partner (28 Arbeitsplätze) zieht in neue Räume um. Der sieben Jahre alte Einzelserver soll abgelöst werden; die Brevanta IT-Systemhaus GmbH soll ein Konzept erstellen. Systemintegratorin Ayla Berger hat im Gespräch mit Kanzleiinhaberin Dr. Ingrid Aldenhoff und Büroleiter Marc Sommer folgende Notizen angefertigt:

(1) Die Mandantendaten sind hochvertraulich und dürfen nur berechtigten Personen zugänglich sein.
(2) Nach einem Totalausfall soll die Kanzlei spätestens nach vier Stunden wieder arbeiten können.
(3) Höchstens vier Stunden Arbeit dürfen verloren gehen. Derzeit wird einmal nachts gesichert.
(4) Das System soll schnell sein.
(5) Rund zehn Mitarbeitende arbeiten an zwei Tagen pro Woche im Homeoffice und benötigen Zugriff auf die Kanzleidaten.
(6) Das Budget ist begrenzt.

Weitere Daten aus der Ist-Analyse: Der Dateiserver enthält 2,5 TB. Erwartet wird ein Wachstum von 20 % pro Jahr bei einem Planungshorizont von drei Jahren; für Snapshots und Spitzen soll eine Reserve von 20 % auf den Bedarf nach drei Jahren eingeplant werden. Geplant ist die Virtualisierung mit drei virtuellen Servern:

VM                     | Arbeitsspeicher
Verzeichnisdienst      | 4 GB
Dateiserver            | 8 GB
Fachanwendung mit DB   | 24 GB

Für den Eigenbedarf des Hypervisors und eine Reserve werden pauschal 25 % auf die Summe der VM-Arbeitsspeicher aufgeschlagen. Brevanta hat drei Varianten entworfen: A = neuer virtualisierter Server vor Ort; B = gemieteter Server im externen Rechenzentrum mit VPN-Anbindung; C = Hybrid: Server vor Ort, zusätzlich verschlüsselte Datensicherung in einem externen Rechenzentrum. Die Kriterien und Bewertungen (Punkte 1 bis 5, 5 = beste Erfüllung):

Kriterium                         | Gewicht | Variante A | Variante B | Variante C
Datenschutz und Vertraulichkeit   | 35 %    | 5          | 4          | 5
Verfügbarkeit, Wiederherstellung  | 25 %    | 3          | 4          | 4
Kosten über drei Jahre            | 20 %    | 4          | 3          | 3
Betriebsaufwand für die Kanzlei   | 20 %    | 2          | 4          | 3

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie die Notizen (1) bis (6) jeweils als funktionale Anforderung, nicht-funktionale Anforderung oder Rahmenbedingung ein, leiten Sie aus (2) und (3) die Kennzahlen RTO und RPO ab und beurteilen Sie, ob die bisherige nächtliche Sicherung dafür genügt. Benennen Sie außerdem zwei nicht prüfbar formulierte Notizen und formulieren Sie eine davon messbar um.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie mit nachvollziehbarem Rechenweg den nutzbaren Speicherbedarf einschließlich Reserve sowie den Mindest-Arbeitsspeicher des Hosts. Begründen Sie kurz, warum bei der Dimensionierung nicht nur der heutige Bestand zählt.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Ermitteln Sie die Gesamtnutzwerte der drei Varianten, sprechen Sie eine begründete Empfehlung aus und nennen Sie eine Grenze der Nutzwertanalyse.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie die Gliederung des Konzeptdokuments für die Kanzlei (mindestens acht Punkte) und nennen Sie für die externe Datensicherung der Variante C vier Punkte, die vor der Beauftragung des Anbieters zu prüfen sind.

**Musterlösungshinweise:** Teilaufgabe 1: (1) nicht-funktional (Sicherheit/Vertraulichkeit, sehr hoher Schutzbedarf); (2) nicht-funktional (Verfügbarkeit), RTO = 4 Stunden; (3) nicht-funktional, RPO = 4 Stunden; (4) nicht-funktional (Leistung), aber nicht messbar formuliert; (5) funktional (Fernzugriff), mit Sicherheitsfolgen wie VPN und Mehr-Faktor-Authentifizierung; (6) Rahmenbedingung (Budget), ohne Betrag nicht prüfbar. Die nächtliche Sicherung genügt nicht: Im ungünstigsten Fall gehen fast 24 Stunden Arbeit verloren, der RPO beträgt aber 4 Stunden; nötig sind häufigere Sicherungen oder Replikation (mindestens alle 4 Stunden, in der Praxis besser kürzer) und eine Kopie außerhalb des Standorts. Messbare Fassung z. B. für (4): Das Öffnen einer Mandantenakte dauert bei bis zu 28 gleichzeitigen Nutzer:innen höchstens 3 Sekunden. Teilaufgabe 2: Speicher: 2,5 TB × 1,2³ = 2,5 TB × 1,728 = 4,32 TB; mit 20 % Reserve 4,32 TB × 1,2 = 5,184 TB, also rund 5,2 TB nutzbar (Rohkapazität je nach RAID-Level höher). Arbeitsspeicher: 4 GB + 8 GB + 24 GB = 36 GB; 36 GB × 1,25 = 45 GB, gewählt wird die nächsthöhere sinnvolle Ausbaustufe des Servers. Der heutige Bestand zählt nicht allein, weil das System über mehrere Jahre genutzt wird und Wachstum, Spitzenlast, Snapshots und Hypervisor-Eigenbedarf zu berücksichtigen sind; zu knapp bemessene Systeme verursachen Engpässe und teure Nachrüstung, Annahmen werden dokumentiert. Teilaufgabe 3: Variante A: 0,35 × 5 + 0,25 × 3 + 0,20 × 4 + 0,20 × 2 = 1,75 + 0,75 + 0,80 + 0,40 = 3,70. Variante B: 0,35 × 4 + 0,25 × 4 + 0,20 × 3 + 0,20 × 4 = 1,40 + 1,00 + 0,60 + 0,80 = 3,80. Variante C: 0,35 × 5 + 0,25 × 4 + 0,20 × 3 + 0,20 × 3 = 1,75 + 1,00 + 0,60 + 0,60 = 3,95. Empfehlung: Variante C (3,95) knapp vor B (3,80) und A (3,70), weil sie die hohe Vertraulichkeit der lokalen Lösung mit besserer Wiederherstellbarkeit durch die externe Kopie verbindet; die Entscheidung trifft der Kunde. Grenze: Gewichte und Punkte sind subjektive Einschätzungen, deshalb sollte geprüft werden, ob sich das Ergebnis bei veränderten Gewichten ändert (Sensitivität); ergänzend ist eine Kostenbetrachtung über die Nutzungsdauer (TCO) sinnvoll. Teilaufgabe 4: Gliederung z. B. 1. Ausgangslage, Ziele und Abgrenzung, 2. Anforderungen mit Priorität (funktional, nicht-funktional, Rahmenbedingungen), 3. Ist-Zustand, 4. Lösungsvarianten, Bewertung und Empfehlung, 5. Zielarchitektur mit Dimensionierung und Annahmen, 6. Sicherheits-, Berechtigungs- und Backupkonzept, 7. Risiken und Annahmen, 8. Projektplan und Kosten, 9. Test- und Abnahmekriterien sowie Übergabe, 10. Freigabe durch den Auftraggeber. Prüfpunkte für den externen Backup-Anbieter z. B.: Standort der Rechenzentren und vertragliche Regelung der Auftragsverarbeitung unter Beteiligung der Datenschutzbeauftragten und unter Berücksichtigung der beruflichen Verschwiegenheitspflichten der Kanzlei, Verschlüsselung mit eigener Schlüsselhoheit beim Kunden, SLA zu Verfügbarkeit und Wiederherstellungszeit (passt die Rücksicherung über die Internetleitung zur RTO von vier Stunden?), Exit-Strategie mit Datenexport, Kündigungsfristen und nachweislicher Löschung.

---

#### F-SI1-02 · Fallaufgabe

**Themenbezug:** 8.2 (Virtualisierung, Installation, Härtung) + 8.3 (Kompatibilität, Tests, Dokumentation)

**Ausgangssituation:** Die Lenhardt Kunststofftechnik GmbH (Spritzguss, 90 Beschäftigte, Zweischichtbetrieb) lässt von der Brevanta einen sieben Jahre alten Einzelserver durch einen virtualisierten Cluster aus zwei Hosts mit gemeinsam genutztem Speicher ersetzen. Auf dem Altserver laufen der Verzeichnisdienst, der Dateiserver und die Betriebsdatenerfassung (BDE), die von zwölf Spritzgießmaschinen Produktionsdaten entgegennimmt. Auszubildende Leyla Demir hat die Kompatibilität vorab geprüft und folgende Befunde zusammengetragen (OS = Betriebssystem):

Komponente           | Herstellerangabe                    | Neue Umgebung                      | Befund
BDE-Software         | Freigabe bis vorletzte Hauptversion | neueste Hauptversion Server-OS     | nicht freigegeben
Lizenzdongle der BDE | USB-Dongle am Server nötig          | VM, läuft auf beiden Hosts         | nicht durchreichbar
Maschinenanbindung   | altes Dateifreigabe-Protokoll       | Richtlinie: Protokoll abgeschaltet | Konflikt
Datenbank-Client     | 32-Bit-Client nötig                 | 64-Bit-Gastsystem                  | freigegeben

Das Testkonzept fordert unter anderem: Nach dem Ausfall eines Hosts müssen alle VMs innerhalb von 15 Minuten wieder erreichbar sein (RTO), und bei zwölf angebundenen Maschinen und bis zu 25 gleichzeitigen Clients darf die Antwortzeit einer BDE-Abfrage höchstens 2 Sekunden betragen. Im Wartungsfenster am Samstag, mit aktueller Datensicherung und informierten Beteiligten, wurden zwei Tests durchgeführt. Failover-Test:

10:02 Host 1 kontrolliert vom Strom getrennt
10:07 VM Verzeichnisdienst wieder erreichbar
10:12 VM Dateiserver wieder erreichbar
10:19 VM BDE wieder erreichbar, Lizenzfehler (Dongle nicht erkannt)
10:31 BDE funktionsfähig, nachdem der Dongle von Hand an Host 2 umgesteckt wurde

Lasttest der BDE-Abfrage:

Last                       | Antwortzeit | CPU-Auslastung Host | Speicher-Latenz
12 Maschinen + 10 Clients  | 0,7 s       | 20 %                | 5 ms
12 Maschinen + 25 Clients  | 1,5 s       | 38 %                | 11 ms
12 Maschinen + 40 Clients  | 4,2 s       | 52 %                | 46 ms

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Ordnen Sie die vier Befunde der Kompatibilitätsprüfung jeweils der Ebene zu (Hardware bzw. Virtualisierung, Betriebssystem bzw. Software, Protokoll) und beurteilen Sie, welche Befunde den geplanten Betrieb verhindern können und welcher zusätzlich ein Sicherheitsrisiko darstellt.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Schlagen Sie für die Befunde „BDE-Software nicht freigegeben“, „Lizenzdongle“ und „veraltetes Protokoll der Maschinen“ jeweils eine Lösung vor und bewerten Sie Vorteile, Risiken und Aufwand. Geben Sie an, wie Sie die Ausnahme beim Protokoll absichern und dokumentieren.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Werten Sie den Failover-Test gegen die Anforderung aus (Zeiten je VM), nennen Sie zwei plausible Ursachen für die Abweichung bei der BDE-VM und leiten Sie Maßnahmen und einen Nachtest ab.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Werten Sie den Lasttest aus, benennen Sie den wahrscheinlichen Engpass mit Begründung, beurteilen Sie, ob die Anforderung belegt ist, und formulieren Sie eine begründete Freigabeempfehlung für den Testbericht.

**Musterlösungshinweise:** Teilaufgabe 1: BDE-Software und Betriebssystem = Software-Ebene (Betriebssystem bzw. Freigabe); Dongle = Hardware bzw. Virtualisierung (USB-Hardware in der VM, die zwischen Hosts wechseln kann); Maschinenanbindung = Protokoll-Ebene; 32-Bit-Client = unkritisch, weil freigegeben und nachinstallierbar. Betrieb verhindern können die fehlende Freigabe der BDE-Software und der nicht durchreichbare Dongle sowie der Protokollkonflikt (die Maschinen können sonst keine Daten liefern); ein Sicherheitsrisiko ist das veraltete Protokoll, weil die Sicherheitsrichtlinie es aus gutem Grund abschaltet. Teilaufgabe 2: BDE-Software: beim Hersteller Freigabe oder Update erfragen; falls nicht kurzfristig möglich, die BDE in einer eigenen VM mit passendem älteren Gastsystem betreiben, im Netz segmentiert und mit minimalen Zugriffen (Vorteil: Betrieb gesichert, Nachteil: veraltetes System bleibt angreifbar und muss gepflegt werden); langfristig Ablösung planen. Dongle: USB-über-Netzwerk-Lösung bzw. Netzwerk-Lizenzdongle oder Wechsel auf eine softwarebasierte Lizenz des Herstellers, alternativ die BDE-VM fest an einen Host binden (Nachteil: verliert Failover-Fähigkeit). Protokoll: Maschinenfirmware aktualisieren, falls möglich; sonst Gateway bzw. Protokollumsetzer oder isoliertes Maschinennetz mit streng begrenztem Zugriff auf genau einen Dateiserver; die Ausnahme wird begründet, befristet, technisch eingegrenzt, in der Sicherheitsdokumentation festgehalten und mit dem Kunden abgestimmt, eine pauschale Abschaltung der Richtlinie ist keine Lösung. Teilaufgabe 3: Verzeichnisdienst nach 5 Minuten, Dateiserver nach 10 Minuten (beide innerhalb von 15 Minuten), BDE erreichbar erst nach 17 Minuten und funktionsfähig erst nach 29 Minuten, damit ist die Anforderung nicht erfüllt. Mögliche Ursachen: Dongle wird nach der Umschaltung nicht erkannt bzw. ist an den ausgefallenen Host gebunden, ungünstige Neustartreihenfolge oder Priorität der VMs, lange Startzeit der Anwendung, Speicherzugriffe beim gleichzeitigen Start. Maßnahmen: Dongle-Lösung ändern, Startreihenfolge und -verzögerungen festlegen, Startzeit der BDE messen, danach den Failover-Test wiederholen und den Failback prüfen, Ergebnis dokumentieren. Teilaufgabe 4: Bei 10 und 25 Clients ist die Anforderung erfüllt (0,7 s und 1,5 s, jeweils höchstens 2 s); bei 40 Clients steigt die Antwortzeit auf 4,2 s. Die CPU ist mit 52 % nicht der Engpass, die Speicher-Latenz steigt aber von 11 auf 46 ms, der Engpass liegt wahrscheinlich im Speichersystem bzw. in seiner Anbindung. Die Anforderung für die geforderte Last ist belegt, es besteht aber wenig Reserve für Wachstum. Freigabeempfehlung: wegen des nicht bestandenen Failover-Tests keine uneingeschränkte Freigabe; Freigabe erst nach behobener Dongle-Problematik und bestandenem Wiederholungstest, zusätzlich Hinweis auf den Speicher-Engpass bei höherer Last (Beobachtung im Monitoring, ggf. schnellere Speicheranbindung), alles im Testbericht mit Rückverfolgung auf die Anforderungen.

---

#### F-SI1-03 · Fallaufgabe

**Themenbezug:** 8.4 (Datenübernahme, Strategie, Validierung, Rollback, Übergabe) + 8.3 (Testmigration, Dokumentation)

**Ausgangssituation:** Die Möbelmanufaktur Wiesenthal GmbH (60 Beschäftigte, ein Standort mit Büro und Werkstatt) wechselt von einem veralteten Dateiserver auf eine neue virtualisierte Umgebung, die die Brevanta aufgebaut und getestet hat. Der Projektleiter Tim Reuter und Geschäftsführer Peter Wiesenthal planen die Datenübernahme. Der Datenbestand umfasst 2,4 TB, davon sind nach Abstimmung mit den Abteilungen 0,6 TB Duplikate, temporäre Dateien und nicht mehr benötigte Altdaten, die vor der Migration aussortiert werden sollen. Eine Testmigration hat eine effektive Übertragungsrate von 100 MB/s ergeben (Rechnung mit 1 TB = 1.000.000 MB). Der Prüfsummenvergleich zur Validierung liest die Daten auf beiden Seiten und benötigt nach Erfahrung ungefähr so lange wie die Übertragung selbst. Das Wartungsfenster beginnt am Freitag um 18:00 Uhr und endet am Montag um 06:00 Uhr; ab Montag früh benötigt die Fertigungsplanung zwingend die Konstruktionszeichnungen auf dem neuen Server. Herr Wiesenthal wünscht eine einmalige Umstellung am Wochenende („alles auf einmal, damit es vorbei ist“). Brevanta schlägt vor, die Hauptmenge bereits in der Woche vorher zu kopieren und am Stichtag nur geänderte Daten nachzuziehen; erwartet werden dabei 80 GB Änderungen. Am Stichtag liegt folgendes Zwischenergebnis der Validierung vor:

Dateien in der Quelle                           | 412.380
Dateien im Ziel                                 | 412.327
Dateien mit abweichender Prüfsumme              | 7
Berechtigungsstichprobe (20 Ordner)             | 2 Ordner ohne Gruppenberechtigung Einkauf

**Teilaufgabe 1 (5 Punkte, bloom: bewerten):** Bewerten Sie für diesen Fall die Strategien Big Bang und schrittweise Migration anhand von mindestens vier Kriterien und sprechen Sie eine begründete Empfehlung aus, wie die Wünsche des Geschäftsführers umgesetzt werden können.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie die Übertragungsdauer für den bereinigten Bestand bei Vollkopie am Stichtag einschließlich der Dauer der Validierung, die durch die Bereinigung eingesparte Zeit sowie die Dauer am Stichtag bei der Delta-Variante (Übertragung und Validierung der Änderungen). Beurteilen Sie, ob das Wartungsfenster ausreicht.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Analysieren Sie das Validierungsergebnis: Nennen Sie je Abweichung eine plausible Ursache und eine Maßnahme und begründen Sie, ob am Stichtag Montag früh um 06:00 Uhr bereits freigegeben werden kann.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen kurzen Rollback-Plan (Entscheidungszeitpunkt, Kriterien, Schritte) und einen Übergabeplan mit Dokumenten, Einweisung und Abnahmeprotokoll; kennzeichnen Sie dabei eine Phase erhöhter Betreuung nach dem Start als in der Praxis übliche Maßnahme.

**Musterlösungshinweise:** Teilaufgabe 1: Kriterien z. B. Datenmenge (1,8 TB nach Bereinigung, überschaubar), Standorte und Nutzerzahl (ein Standort, 60 Beschäftigte), zulässige Downtime (Fenster von 60 Stunden, aber Montag 06:00 Uhr ist hart), Risiko und Rückweg, Parallelbetriebsaufwand, Komplexität der Berechtigungen. Empfehlung: Der gewünschte einmalige Wechsel (Big Bang am Stichtag) ist hier vertretbar, wenn er durch eine Testmigration, eine Vorabkopie mit Delta-Nachlauf, eine Validierung, klare Go/No-Go-Kriterien und einen Rollback-Plan abgesichert ist; ein mehrmonatiger Parallelbetrieb wäre für diesen Standort unverhältnismäßig aufwendig, ein kleiner Pilot (z. B. eine Abteilung in der Testphase) kann das Risiko senken. Teilaufgabe 2: Bereinigter Bestand 2,4 TB minus 0,6 TB = 1,8 TB = 1.800.000 MB; bei 100 MB/s sind das 18.000 s = 5 Stunden Kopierdauer; die Validierung dauert etwa nochmals 5 Stunden, bei Vollkopie am Stichtag also rund 10 Stunden. Ohne Bereinigung wären es 2.400.000 MB ÷ 100 MB/s = 24.000 s = 6 Stunden 40 Minuten Kopierdauer, die Bereinigung spart also 1 Stunde 40 Minuten pro Durchlauf. Delta-Variante: 80 GB = 80.000 MB ÷ 100 MB/s = 800 s, rund 13,3 Minuten Übertragung, die Validierung der Änderungen dauert etwa genauso lange, zusammen rund 27 Minuten. Das Wartungsfenster von 60 Stunden (Freitag 18:00 Uhr bis Montag 06:00 Uhr) reicht in beiden Varianten; die Delta-Variante verkürzt die Downtime stark und lässt viel Pufferzeit für Fehlerbehebung und einen eventuellen Rollback. Teilaufgabe 3: Differenz von 53 Dateien (412.380 minus 412.327): z. B. nicht übertragbare Zeichen oder zu lange Pfade, gesperrte bzw. geöffnete Dateien, bewusst aussortierte Dateien; Maßnahme: Liste der fehlenden Dateien erstellen, klassifizieren, notwendige Dateien nachziehen und Ausschlüsse dokumentieren. 7 abweichende Prüfsummen: Übertragungsfehler oder zwischenzeitlich geänderte Dateien; Maßnahme: erneut übertragen und erneut vergleichen. 2 Ordner ohne Gruppenberechtigung: Fehler beim Übernehmen der Berechtigungen oder beim Mapping der Gruppen; Maßnahme: Berechtigungen korrigieren und alle Ordner systematisch prüfen, nicht nur die Stichprobe. Freigabe: Noch nicht, solange Abweichungen ungeklärt oder unbehoben sind (No-Go bzw. Freigabe erst nach Behebung und erneuter Validierung); da der Rückweg bis dahin offen ist und Zeit im Fenster bleibt, ist die Entscheidung rechtzeitig vor 06:00 Uhr an einem festgelegten Entscheidungszeitpunkt zu treffen. Teilaufgabe 4: Rollback-Plan: Vor Beginn getestete Vollsicherung, Altsystem unverändert und nur lesend erhalten, Entscheidungszeitpunkt (z. B. Sonntag 18:00 Uhr) und Point of no Return vor dem Wiederaufnehmen des Betriebs, Kriterien für No-Go (z. B. kritische Abweichungen in der Validierung, Anwendungsfunktionen der Key User nicht erfolgreich), Schritte (Umschaltung auf Altsystem, Dienste zurück, Information der Beteiligten, Ursachenanalyse, Neuanlauf), ein Verantwortlicher je Schritt und geplante Rückfalldauer innerhalb des Fensters. Übergabeplan: Beteiligte (Geschäftsführung, Fachbereiche, externe Dienstleister, ggf. Datenschutzbeauftragte) abstimmen; Dokumente: Systemdokumentation, Betriebshandbuch mit Sicherung und Wiederherstellung, Benutzerkurzanleitung, Testbericht und Migrationsprotokoll, Liste offener Punkte; Zugangsdaten getrennt und geschützt übergeben; Einweisung für Anwender:innen (Zugriff auf Laufwerke, Verhalten bei Störungen) und für die betreuende Person; Abnahme mit Abnahmeprotokoll (offene unwesentliche Mängel mit Frist); Hypercare als in der Praxis übliche, nicht normierte Phase erhöhter Betreuung in den ersten Tagen und Wochen mit schnelleren Reaktionszeiten, Monitoring und Sammlung von Rückmeldungen, danach Überführung in den Regelbetrieb.
