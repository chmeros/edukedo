---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI3
fachgebiet_title: "Administrieren von IT-Systemen"
thema_code: "SI3-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (Konzeption und Administration von IT-Systemen)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen im Prüfungsbereich Konzeption und Administration von IT-Systemen nach der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 21 sowie Anlage (Ausbildungsrahmenplan) Abschnitt C lfd. Nr. 3 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus SI3 (10.1–10.4) zu zusammenhängenden Situationen aus dem Managed-Services-Betrieb der Brevanta IT-Systemhaus GmbH, wie sie im schriftlichen Prüfungsbereich „Konzeption und Administration von IT-Systemen" (90 Minuten) typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte.

---

#### F-SI3-01 · Fallaufgabe

**Themenbezug:** 10.1 (Berechtigungskonzept, Verzeichnisdienst, Nutzungsrichtlinie)

**Ausgangssituation:** Die Hausverwaltung Seeberg GmbH (45 Beschäftigte) ist neuer Managed-Services-Kunde der Brevanta IT-Systemhaus GmbH. Beim Aufnehmen der Ist-Situation durch Systemintegrator Daniel Okafor fällt Folgendes auf: Auf dem Dateiserver sind alle Ordner für die Gruppe „Jeder" mit Vollzugriff freigegeben. Das Sekretariat nutzt ein gemeinsames Konto „buero" mit einem Passwort, das auf einem Klebezettel am Monitor steht. Vier Konten von Beschäftigten, die vor mehr als einem Jahr ausgeschieden sind, sind noch aktiv. Eine Praktikantin hat zu Beginn ihrer Tätigkeit das Administratorpasswort des Servers erhalten, „damit es schneller geht". Jeder der drei Server pflegt eigene lokale Benutzerkonten. Eine schriftliche Nutzungsregelung für die IT gibt es nicht. Die Geschäftsführung wünscht ein Berechtigungskonzept und eine zentrale Benutzerverwaltung. Die Fachbereiche haben ihren Zugriffsbedarf so beschrieben:

Abteilung          | Beschäftigte | Tätigkeit laut Fachbereich
Objektverwaltung   |           18 | pflegt Objektakten und Mietverträge, liest Wartungsaufträge
Buchhaltung        |            6 | bucht Mieten und Rechnungen, liest Mietverträge und Objektakten
Vermietung         |            8 | erstellt Mietverträge, liest Objektakten
Technik            |            9 | bearbeitet Wartungsaufträge, liest Objektakten
Geschäftsleitung   |            2 | liest alle Bereiche, verwaltet allein die Personalakten
Sekretariat        |            2 | nutzt Vorlagen und Posteingang, kein Zugriff auf Personal und Buchhaltung

Auf dem Dateiserver sollen die Ordner Mietverträge, Objektakten, Buchhaltung, Personal, Wartungsaufträge und Vorlagen eingerichtet werden.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Benennen Sie fünf Mängel der Ist-Situation, ordnen Sie jedem Mangel das verletzte Prinzip oder Risiko zu und nennen Sie je eine Sofortmaßnahme.

**Teilaufgabe 2 (5 Punkte, bloom: erschaffen):** Entwerfen Sie auf Grundlage der Tätigkeitsbeschreibung eine Rechtematrix (Gruppen und Ordner mit den Rechten kein Zugriff, Lesen oder Ändern) nach dem Prinzip der minimalen Rechte.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Erläutern Sie, welche Vorteile ein Verzeichnisdienst gegenüber den lokalen Konten bietet, grenzen Sie Authentifizierung und Autorisierung voneinander ab und beschreiben Sie den Ablauf für einen neuen Mitarbeiter, einen Abteilungswechsel und einen Austritt.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, welche Inhalte eine Nutzungsrichtlinie für die Hausverwaltung enthalten sollte, wen Sie bei Erstellung und Einführung beteiligen und wie sich zwei der Vorgaben technisch durch zentrale Konfigurationsrichtlinien durchsetzen lassen.

**Musterlösungshinweise:** Teilaufgabe 1: (1) Vollzugriff für „Jeder" verletzt das Prinzip der minimalen Rechte und Need-to-know, Sofortmaßnahme: Freigaben auf Gruppen mit bedarfsgerechten Rechten umstellen. (2) Sammelkonto „buero" verhindert Zurechenbarkeit, Sofortmaßnahme: personenbezogene Konten anlegen und das Sammelkonto sperren. (3) Passwort am Monitor bedeutet unzureichenden Schutz der Zugangsdaten, Sofortmaßnahme: Passwort ändern, Passwortregeln schulen und Passwortmanager bzw. Mehrfaktor-Authentifizierung einführen. (4) Aktive Konten Ausgeschiedener sind verwaiste Zugänge (fehlender Leaver-Prozess), Sofortmaßnahme: Konten sperren, später löschen und Leaver-Checkliste einführen. (5) Administratorpasswort bei der Praktikantin verletzt minimale Rechte und Funktionstrennung, Sofortmaßnahme: Passwort ändern, Admin-Rechte auf geschulte Personen mit separaten Admin-Konten beschränken. Weitere zulässige Mängel: lokale Kontenpflege auf drei Servern (hoher Aufwand, Inkonsistenz) und fehlende Nutzungsrichtlinie. Teilaufgabe 2: Beispiel (Rechte je Gruppe, Reihenfolge Objektverwaltung, Buchhaltung, Vermietung, Technik, Geschäftsleitung, Sekretariat): Mietverträge: Ändern, Lesen, Ändern, kein Zugriff, Lesen, kein Zugriff. Objektakten: Ändern, Lesen, Lesen, Lesen, Lesen, kein Zugriff. Buchhaltung: kein Zugriff, Ändern, kein Zugriff, kein Zugriff, Lesen, kein Zugriff. Personal: kein Zugriff, kein Zugriff, kein Zugriff, kein Zugriff, Ändern, kein Zugriff. Wartungsaufträge: Lesen, Lesen, kein Zugriff, Ändern, Lesen, kein Zugriff. Vorlagen: Lesen für alle Gruppen, Ändern für das Sekretariat. Rechte werden Gruppen, nicht Einzelpersonen zugewiesen; sinnvolle Ergänzungen sind eine eigene Administrationsgruppe und die Abstimmung der Matrix mit den Fachbereichen. Andere begründete Rechtevergaben sind zulässig, sofern die Tätigkeitsbeschreibung eingehalten wird und keine Rechte ohne Bedarf vergeben werden. Teilaufgabe 3: Vorteile: zentrale Pflege an einer Stelle, ein Konto für alle Server, schnelles Sperren, einheitliche Passwortregeln, Nachvollziehbarkeit und Single Sign-On, zentrale Konfigurationsrichtlinien; Verzeichnis auf mindestens zwei Servern betreiben und sichern, weil Anmeldungen davon abhängen. Authentifizierung prüft, wer jemand ist (Passwort, Token, möglichst Mehrfaktor); Autorisierung prüft danach anhand von Gruppen und Rechten, was die Person darf. Ablauf Eintritt: Konto im Verzeichnis anlegen, Gruppenzugehörigkeit nach Abteilung zuweisen, Erstpasswort, Einweisung. Wechsel: Gruppenzugehörigkeit ändern, nicht mehr benötigte Rechte entfernen. Austritt: Konto zum Austrittstag sperren, Postfach und Daten übergeben, später löschen, Geräte und Zugangsmittel zurückholen. Teilaufgabe 4: Inhalte: Geltungsbereich, dienstliche und private Nutzung, Passwort- und Zugangsregeln, Umgang mit Geräten und Wechselmedien, Umgang mit Daten und Speicherorten, Melde- und Mitwirkungspflichten, Kontrolle und Folgen bei Verstößen. Beteiligte: Geschäftsführung, Datenschutzbeauftragte bzw. Datenschutzverantwortliche, Personalverantwortliche und gegebenenfalls Betriebsrat (falls vorhanden), Fachbereiche. Einführung: Freigabe, Bekanntmachung, Schulung, Kenntnisnahme dokumentieren, jährliche Überprüfung. Technische Umsetzung z. B.: Bildschirmsperre nach 10 Minuten, Passwort-Mindestanforderungen und Sperre bei Fehlversuchen, Installationsrecht nur für Administrator:innen, automatische Laufwerkszuordnung. Neue Richtlinien zuerst an einer Testgruppe erproben.

---

#### F-SI3-02 · Fallaufgabe

**Themenbezug:** 10.3 (Sicherungsarten, Wiederherstellungskette, RPO/RTO, 3-2-1-Regel, Restore-Test)

**Ausgangssituation:** Die Spedition Rademacher GmbH betreibt einen Dateiserver mit Disposition-, Rechnungs- und Kundenunterlagen. Das Managed-Services-Team der Brevanta IT-Systemhaus GmbH soll ein Sicherungskonzept entwerfen. Die Rahmenbedingungen:

Parameter                                 | Wert
Datenbestand des Dateiservers             | 800 GB
Neue oder geänderte Daten pro Tag         | 20 GB (jeweils andere Daten)
Vollsicherung                             | sonntags
Zusatzsicherung                           | montags bis samstags, jeweils um 22:00 Uhr
Sicherungsziel (Backup-NAS im Serverraum) | 4.000 GB nutzbar
Wiederherstellungsrate                    | 125 MB/s (1 GB = 1.000 MB)
Vorgabe des Kunden (RPO / RTO)            | 24 Stunden / 6 Stunden

Zur Vereinfachung wachsen die Bestände nicht über die Wochen hinaus; jede Woche wird mit demselben Bedarf gerechnet. Zur Wahl stehen die inkrementelle und die differentielle Sicherung für Montag bis Samstag. In der Nacht von Mittwoch auf Donnerstag fällt der Server komplett aus. Die Sicherung von Mittwoch 22:00 Uhr ist vollständig durchgelaufen.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie den Speicherbedarf einer Woche (Sonntag bis Samstag) für beide Strategien und geben Sie an, wie viele Wochenzyklen jeweils auf das Backup-NAS passen.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Bestimmen Sie für beide Strategien, welche Sicherungssätze für die Wiederherstellung auf den Stand von Mittwoch benötigt werden, wie viele GB wiederhergestellt werden müssen und wie lange die reine Datenübertragung dauert. Prüfen Sie, ob RTO und RPO eingehalten werden können.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Empfehlen Sie eine der beiden Strategien und begründen Sie Ihre Entscheidung anhand von Kapazität, Wiederherstellungsaufwand und Risiken.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie ergänzende Maßnahmen für das Sicherungskonzept: Umsetzung der 3-2-1-Regel, Schutz der Sicherungen, Überwachung der Sicherungsjobs und einen Plan für Restore-Tests.

**Musterlösungshinweise:** Teilaufgabe 1: Inkrementell: 800 GB + 6 × 20 GB = 920 GB pro Woche. Differentiell: 20 + 40 + 60 + 80 + 100 + 120 = 420 GB, zuzüglich 800 GB Vollsicherung = 1.220 GB pro Woche. Auf 4.000 GB passen bei inkrementeller Sicherung 4.000 ÷ 920 = 4,35, also 4 volle Wochenzyklen (3.680 GB), bei differentieller Sicherung 4.000 ÷ 1.220 = 3,28, also 3 volle Wochenzyklen (3.660 GB). Teilaufgabe 2: Stand Mittwoch inkrementell: Vollsicherung vom Sonntag plus Inkremente von Montag, Dienstag und Mittwoch, also 4 Sätze, 800 + 3 × 20 = 860 GB. Differentiell: Vollsicherung plus Differenz von Mittwoch (60 GB), also 2 Sätze, ebenfalls 860 GB. Dauer: 860.000 MB ÷ 125 MB/s = 6.880 s, das sind etwa 114,7 Minuten bzw. rund 1 Stunde 55 Minuten. Das RTO von 6 Stunden (360 Minuten) lässt damit noch gut 4 Stunden für Beschaffung bzw. Austausch der Hardware, Neuinstallation, Prüfung und Wiederanlauf; es ist einzuhalten, wenn Ersatzhardware oder eine Ersatzumgebung zügig verfügbar ist. Das RPO von 24 Stunden wird eingehalten, weil die Sicherung von Mittwoch 22:00 Uhr vorliegt und der Verlust höchstens die Änderungen seit diesem Zeitpunkt umfasst (unter 24 Stunden). Teilaufgabe 3: Eine begründete Entscheidung zählt. Plausibel ist die inkrementelle Strategie, weil nur sie vier Wochen Vorhaltung (Generationenprinzip) auf dem NAS erlaubt, die Wiederherstellung auch im schlechtesten Fall (Stand Samstag: 7 Sätze, 920 GB, 920.000 ÷ 125 = 7.360 s, rund 123 Minuten) das RTO deutlich unterschreitet und sie weniger Sicherungszeit pro Nacht braucht. Risiko ist die längere Kette: Ein beschädigtes Inkrement gefährdet alle folgenden Stände; Gegenmaßnahmen sind Prüfung der Sicherungen, regelmäßige neue Vollsicherung und Restore-Tests. Für differentielle Sicherung spricht die einfachere Wiederherstellung mit zwei Sätzen, dagegen der höhere Speicherbedarf (nur 3 Wochen Vorhaltung) und die wachsende Datenmenge pro Nacht. Teilaufgabe 4: 3-2-1: Original auf dem Server, erste Sicherung auf dem NAS (anderes Gerät), zweite Sicherung auf einem anderen Medium an anderem Ort (z. B. verschlüsselter Cloud-Objektspeicher oder Band im anderen Brandabschnitt bzw. Zweitstandort), davon eine Kopie unveränderbar oder offline gegen Ransomware. Schutz: Verschlüsselung der Sicherungen, getrennte Zugangsdaten für die Backup-Software, Zugriff nur für wenige Rollen, Schlüssel getrennt aufbewahren; bei Cloud-Speicherung Auftragsverarbeitungsvertrag und Prüfung des Speicherorts. Überwachung: Meldung bei fehlgeschlagenen oder ausgebliebenen Jobs, tägliche bzw. wöchentliche Kontrolle, Eskalation. Restore-Tests: monatlich Stichproben einzelner Dateien, mindestens einmal jährlich vollständige Wiederherstellung in einer Testumgebung mit Zeitmessung und Protokoll, Ergebnisse mit RTO vergleichen und das Konzept anpassen; zusätzlich Aufbewahrungsdauer und Löschkonzept nach Vorgaben des Kunden festlegen.

---

#### F-SI3-03 · Fallaufgabe

**Themenbezug:** 10.2 (Patchmanagement, Änderungsmanagement) + 10.4 (Monitoring, Support, SLA)

**Ausgangssituation:** Die Maschinenbau Kolbe GmbH (120 Arbeitsplätze, 6 Server) wird von der Brevanta IT-Systemhaus GmbH betreut. Der Hersteller des Server-Betriebssystems hat ein Sicherheitsupdate für eine kritische, bereits aktiv ausgenutzte Lücke veröffentlicht. Das Team hat den Server SRV-APP01 (Anwendungsserver mit dem ERP-Dienst) am Samstagabend im Wartungsfenster aktualisiert, vorher einen Snapshot angelegt und den ERP-Dienst danach zehn Minuten getestet. Die ERP-Datenbank liegt auf einem eigenen Server (SRV-DB01) und war vom Update nicht betroffen. Am Montagmorgen meldet der Werkstattleiter um 06:50 Uhr, dass das ERP nicht erreichbar ist; innerhalb von 20 Minuten gehen 17 weitere Meldungen ein. Der Verlauf der Überwachungswerte von SRV-APP01 (Schwellwerte: Warnung ab 85 Prozent, kritisch ab 95 Prozent Arbeitsspeicher; Meldungen gehen per E-Mail an ein Sammelpostfach, in dem sich in der Woche zuvor 214 Warnmeldungen angesammelt haben; normale RAM-Belegung im Wochenverlauf laut Baseline: 55 bis 65 Prozent):

Zeitpunkt   | RAM-Belegung | CPU-Last | Bemerkung
Sa 22:30    |         58 % |     22 % | Snapshot angelegt
Sa 23:10    |            - |        - | Update installiert, Neustart
Sa 23:25    |         41 % |     18 % | ERP-Dienst läuft, Kurztest 10 Minuten bestanden
So 06:00    |         53 % |     15 % | keine Meldung
So 18:00    |         75 % |     17 % | keine Meldung
So 23:35    |         85 % |     19 % | Warnung per E-Mail
Mo 03:00    |         91 % |     21 % | Warnung per E-Mail
Mo 06:30    |         98 % |     55 % | kritisch per E-Mail, starke Auslagerung
Mo 06:45    |            - |        - | ERP-Dienst antwortet nicht mehr

Für Störungen der Priorität 1 gilt laut SLA: Reaktionszeit 30 Minuten, Lösungszeit 4 Stunden, jeweils innerhalb der Servicezeit Montag bis Freitag von 06:00 bis 18:00 Uhr.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Werten Sie den Verlauf aus: Beschreiben Sie das Muster, ziehen Sie einen begründeten Schluss auf die wahrscheinliche Ursache, und erklären Sie, warum der Kurztest nach dem Update das Problem nicht aufdecken konnte und weshalb die Alarme keine rechtzeitige Reaktion auslösten.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Legen Sie die Priorität des Tickets fest, berechnen Sie die SLA-Fristen für Reaktion und Lösung und beschreiben Sie die Sofortmaßnahmen in sinnvoller Reihenfolge einschließlich Rückfalloption und Kommunikation.

**Teilaufgabe 3 (5 Punkte, bloom: erschaffen):** Entwerfen Sie eine Strategie für die künftige Verteilung kritischer Updates bei diesem Kunden mit Testkriterien, Rollout in Wellen (Rechnung für die 120 Arbeitsplätze: Pilot 5 Prozent, zweite Welle 25 Prozent, Rest), Wartungsfenster, Rückfallplan und Dokumentation, und berücksichtigen Sie dabei den Zeitdruck bei aktiv ausgenutzten Lücken.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie die Überwachung und das Vorgehen und schlagen Sie Verbesserungen für Schwellwerte, Alarmierung, Trendauswertung und die Nachbereitung vor, die dem Zyklus aus Plan, Do, Check und Act folgen.

**Musterlösungshinweise:** Teilaufgabe 1: Die RAM-Belegung steigt nach dem Neustart gleichmäßig um etwa 1,8 Prozentpunkte pro Stunde an und fällt nicht wieder, während die CPU-Last zunächst niedrig bleibt und erst bei hoher Speicherbelegung durch Auslagerung steigt; das spricht für ein Speicherleck des ERP-Dienstes oder einer durch das Update veränderten Komponente, das sich erst nach Stunden auswirkt. Die Datenbank ist nicht betroffen. Der Zusammenhang mit dem Update ergibt sich aus dem zeitlichen Beginn und der Abweichung von der Baseline (vorher 58 Prozent bei Normalbetrieb, normal 55 bis 65 Prozent). Der Kurztest von zehn Minuten konnte ein schleichendes Problem nicht zeigen; nötig wären ein längerer Test oder Dauerbeobachtung unter Last, z. B. in einer Testumgebung. Die Alarme blieben wirkungslos, weil sie nur per E-Mail an ein überlaufenes Sammelpostfach gingen (Alarmmüdigkeit), niemand zuständig oder in Bereitschaft war und keine Eskalation existierte; außerdem war die Warnstufe mit 85 Prozent erst spät erreicht. Teilaufgabe 2: Priorität 1 (Ausfall der zentralen Anwendung, viele Betroffene, hohe Dringlichkeit). Eingang 06:50 Uhr: Reaktionsfrist 06:50 + 30 Minuten = 07:20 Uhr, Lösungsfrist 06:50 + 4 Stunden = 10:50 Uhr (innerhalb der Servicezeit). Maßnahmen: Ticket aufnehmen und Gleichartiges bündeln, Kunden über die Störung und die erwartete Dauer informieren; ERP-Dienst bzw. SRV-APP01 neu starten als schnelle Zwischenlösung (stellt Betrieb vorübergehend wieder her, löst die Ursache nicht); Ursache durch Rollback des Updates beseitigen (Deinstallation des Updates oder Rückkehr zum Snapshot von Samstag 22:30 Uhr; da die Daten auf SRV-DB01 liegen, entsteht für das ERP kein Datenverlust, Änderungen auf SRV-APP01 seit dem Snapshot müssen vorher geprüft werden), danach Funktionsprüfung mit Anwender:innen, Ticket abschließen und dokumentieren. Weil die Sicherheitslücke aktiv ausgenutzt wird, sind begleitende Schutzmaßnahmen (z. B. Zugriffsbeschränkungen, Netzsegmentierung, Abschaltung der betroffenen Funktion) und eine neue Bewertung des Updates erforderlich; Meldung an den Hersteller. Teilaufgabe 3: Strategie: Bewertung der Dringlichkeit (aktiv ausgenutzt: Notfalländerung, beschleunigt, aber geordnet), Test an einem Klon bzw. Testsystem mit Dauerbeobachtung von Arbeitsspeicher, CPU und Dienstverfügbarkeit über mindestens einen Betriebstag und Lasttest, Testkriterien festlegen (kein Speicherwachstum über Schwelle, Dienst stabil, Schnittstellen funktionieren), vor dem Update Snapshot bzw. Sicherung, Wartungsfenster am Wochenende oder abends mit Information der Beschäftigten, Rollout in Wellen. Clients: Pilot 5 Prozent von 120 = 6 Geräte, zweite Welle 25 Prozent = 30 Geräte, dritte Welle 120 − 6 − 30 = 84 Geräte; Server nacheinander, kritische Anwendungsserver erst nach Beobachtung der Pilotsysteme. Rückfallplan mit Verantwortlichen und Entscheidungskriterium, begleitende Schutzmaßnahmen bis zum Abschluss des Rollouts, Änderungsantrag mit Risiko- und Rückfallplan, Dokumentation und Erfolgskontrolle (Patchstand je Gruppe). Teilaufgabe 4: Bewertung: Die Überwachung hat den Fehler gemessen, aber nicht wirksam gemeldet; das Vorgehen war bei Test, Alarmierung und Bereitschaft unzureichend. Verbesserungen: Plan: Schwellwerte aus der Baseline mit Dauer und Zeitfenster ableiten, Warnungen nach Dringlichkeit staffeln, Zuständigkeiten, Bereitschaft und Eskalation festlegen, Trendalarm bei ungewöhnlich starkem Anstieg (z. B. mehr als 1 Prozentpunkt pro Stunde über mehrere Stunden), Testplan für Updates erweitern. Do: Alarme an ein Ticketsystem bzw. Bereitschaft statt eines Sammelpostfachs leiten, nach Updates erhöhte Beobachtung (z. B. 48 Stunden) mit gezielter Kontrolle. Check: Alarmaufkommen, Reaktionszeiten, Patchstand und SLA-Erfüllung auswerten (z. B. Anteil fristgerecht gelöster Tickets). Act: Prozess und Schwellwerte anpassen, Erkenntnisse in Wissensdatenbank und Änderungsprozess einarbeiten, Kunden über Maßnahmen informieren.
