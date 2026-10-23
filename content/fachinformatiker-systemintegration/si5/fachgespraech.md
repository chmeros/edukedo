---
kurs_slug: fachinformatiker-systemintegration
fachgebiet_code: SI5
fachgebiet_title: "Planen und Umsetzen eines Projektes der Systemintegration"
thema_code: "SI5-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen, orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit nach § 20 Abs. 3 der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250) — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "23.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Die Fragen simulieren typische Rückfragen eines Prüfungsausschusses im Anschluss an die Präsentation einer betrieblichen Projektarbeit der Systemintegration, wie sie im Prüfungsbereich „Planen und Umsetzen eines Projektes der Systemintegration" nach § 20 FIAusbV üblich sind (Präsentation höchstens 15 Minuten, Präsentation und Fachgespräch zusammen höchstens 30 Minuten). Sie sind aus der Ich-Perspektive des Prüflings zu beantworten, beziehen sich beispielhaft auf Projekte bei der Brevanta IT-Systemhaus GmbH (z. B. Dateiserver-Migration, Backup-System, Standortvernetzung, Verzeichnisdienst, Härtung nach Schwachstellenscan) und erfordern freies Formulieren mit Begründung — nicht das Aufsagen auswendig gelernter Definitionen. Empfohlenes Antwortmuster: Kernaussage, Begründung, Beleg aus dem Projekt.

### 12.1 Projektwahl, Anforderungen, Alternativen und Planung

- Warum haben Sie dieses Projekt als betriebliche Projektarbeit gewählt, und wie haben Sie geprüft, dass es in 40 Stunden machbar ist?
  - Erwartung: Es gibt reale Auftraggeber:innen (extern oder intern) mit einem tatsächlichen Bedarf.
  - Erwartung: Das Projekt zeigt den Bezug zur Systemintegration: Anforderungen analysieren, Alternativen bewerten, ein System ändern oder einführen, Schwachstellen und Schutzmaßnahmen betrachten und dokumentieren; reine Routinearbeit bietet dafür wenig Substanz.
  - Erwartung: Der Umfang passt in den Zeitrahmen: Zu groß scheitert an der Zeit, zu klein liefert keinen Stoff für Alternativen, Tests und Dokumentation; belegt wird das durch einen Zeitplan mit Arbeitspaketen und Stunden, in dem auch die Dokumentation und ein Puffer stehen.
  - Erwartung: Die Eigenleistung ist abgrenzbar, und Testumgebung, Hardware, Zugänge, Wartungsfenster und Ansprechpersonen sind im Projektzeitraum verfügbar; Lieferzeiten sind keine Arbeitsstunden, können aber den Kalender sprengen.
  - Erwartung: Vorab ist geklärt, ob Kundendaten, Netzpläne und Konfigurationen verwendet werden dürfen; Namen werden üblicherweise anonymisiert und sicherheitsrelevante Angaben geschwärzt.
  - Rückfrage: Worin unterscheiden sich Arbeitsstunden und Kalenderdauer, und wie wirkt sich eine Lieferzeit aus?
- Wie lautet Ihr Projektziel, an welchen Zielgrößen haben Sie die Zielerreichung gemessen, und wurden sie erreicht?
  - Erwartung: Das Projektziel beschreibt, was am Ende konkret vorhanden sein soll, und ist abgegrenzt.
  - Erwartung: Die Zielgrößen sind messbar, z. B. Wiederherstellungszeit, Verfügbarkeit in Prozent oder unverändert übernommene Berechtigungsstruktur.
  - Erwartung: Ziele und Anforderungen sind SMART formuliert (spezifisch, messbar, akzeptiert, realistisch, terminiert), damit ein Soll-Ist-Vergleich möglich ist.
  - Erwartung: Die Zielerreichung wird mit Tests belegt, in denen Soll, Ist und Ergebnis festgehalten sind.
  - Erwartung: Nicht erreichte Zielwerte werden offen benannt und begründet, nicht versteckt.
  - Rückfrage: Warum ist die Formulierung „Der Server soll besser und sicherer werden“ als Ziel unbrauchbar?
- Wie haben Sie den Ist-Zustand erhoben (Systeme, Netzstruktur, Last, Störungen), und welche Erkenntnis aus der Ist-Analyse hat Ihre Planung am stärksten beeinflusst?
  - Erwartung: Erhoben werden vorhandene Systeme, Dienste, Betriebssystem- und Softwarestände sowie Lizenzen (z. B. aus Inventarliste, Betriebsdokumentation oder Inventarisierungswerkzeug).
  - Erwartung: Zur Netzstruktur gehören Topologie, Subnetze, VLANs, Adressplan und Firewall-Regeln (z. B. aus Netzplan, Konfigurationsauszügen oder Netzwerkscan).
  - Erwartung: Nutzung und Last werden erfasst: Anzahl der Benutzer:innen, Datenmengen und Spitzenzeiten (Monitoring, Speicherbelegung, Gespräche mit Anwender:innen).
  - Erwartung: Probleme und Schwachstellen ergeben sich aus Störungshistorie und Ausfallzeiten (Ticketsystem, Protokolle); dazu kommen Rahmenbedingungen wie Budget, Termine und Wartungsfenster.
  - Erwartung: Die Ist-Analyse mündet in eine Gegenüberstellung von Ist und Soll, aus der die Lücke hervorgeht; die prägende Erkenntnis wird mit ihrem Einfluss auf die Planung begründet.
  - Rückfrage: Welche Quellen eignen sich, um Störungen und Ausfallzeiten zu erfassen?
- Welche Anforderungen des Kunden waren Muss-, welche Soll-Kriterien, und was haben Sie bewusst nicht umgesetzt (Abgrenzung)?
  - Erwartung: Muss-Kriterien sind unverzichtbar, Soll-Kriterien wünschenswert, Kann-Kriterien optional.
  - Erwartung: Anforderungen werden nach Art unterschieden: funktionale (was muss das System leisten), nichtfunktionale (wie gut, z. B. Verfügbarkeit, Antwortzeiten, Wiederherstellungszeit, Sicherheit) und Randbedingungen (Budget, Termin, vorhandene Systemlandschaft).
  - Erwartung: Die Anforderungen stehen in einer knappen, nummerierten Liste mit Abstimmungsvermerk der Auftraggeber:innen und sind prüfbar formuliert.
  - Erwartung: Das Projekt ist abgegrenzt; was bewusst nicht umgesetzt wird, wird benannt.
  - Rückfrage: Worin unterscheiden sich funktionale und nichtfunktionale Anforderungen?
  - Rückfrage: Was unterscheidet Lastenheft und Pflichtenheft?
- Welche Lösungsalternativen haben Sie betrachtet, nach welchen technischen, wirtschaftlichen und qualitativen Kriterien haben Sie bewertet, und wie haben Sie die Gewichtung begründet?
  - Erwartung: Betrachtet werden mindestens zwei bis drei echte Alternativen, sinnvollerweise auch die Nullvariante (nichts ändern) als Bezugspunkt.
  - Erwartung: Varianten, die ein Muss-Kriterium verletzen (K.o.-Kriterium), scheiden aus und werden nicht weiter punktiert; die Begründung gehört in die Dokumentation.
  - Erwartung: Die Bewertungskriterien umfassen technische Aspekte (Leistung, Kompatibilität, Verfügbarkeit, Sicherheit, Administrierbarkeit), wirtschaftliche Aspekte (Anschaffungs- und Betriebskosten, Lizenzen, Aufwand) und qualitative Aspekte (Zuverlässigkeit, Herstellersupport, Zukunftsfähigkeit, Bedienbarkeit, Datenschutz).
  - Erwartung: Die Gewichte spiegeln die Anforderungen der Auftraggeber:innen wider und ergeben zusammen 100 Prozent; die Punktvergabe (z. B. Skala 1 bis 5) wird begründet.
  - Erwartung: Der Nutzwert je Alternative ist die Summe aus Gewicht mal Punkte; das Ergebnis wird auf Plausibilität geprüft.
  - Rückfrage: Was ist eine Nullvariante, und wozu dient sie?
- Wie robust ist Ihre Nutzwertanalyse: Würde sich die Entscheidung ändern, wenn der Kunde die Gewichte anders setzt?
  - Erwartung: Mit einer Sensitivitätsprobe wird geprüft, ob sich die Reihung der Alternativen ändert, wenn die Gewichte variiert werden (z. B. bei stärkerer Gewichtung der Kosten).
  - Erwartung: Bleibt dieselbe Alternative vorn, ist das Ergebnis robust.
  - Erwartung: Eine Nutzwertanalyse ist kein Beweis, sondern ein strukturiertes Argument; ihre Aussagekraft hängt von nachvollziehbaren Kriterien, begründeten Gewichten und ehrlicher Punktvergabe ab.
  - Erwartung: Beschönigte oder nachträglich „passend gemachte“ Punkte fallen im Fachgespräch auf; ein Alternativenvergleich nur zum Schein ist ein typischer Dokumentationsfehler.
  - Rückfrage: Wie begründen Sie die Gewichtung Ihrer Kriterien?
- Wie haben Sie Ihre Arbeitspakete und deren Aufwände geplant, und welche Abweichungen von der genehmigten Projektbeschreibung gab es?
  - Erwartung: Das Projekt wird im Projektstrukturplan in Teilaufgaben und Arbeitspakete zerlegt, z. B. Ist-Analyse, Alternativen, Konzept mit Testkonzept, Aufbau, Datenübernahme, Tests, Übergabe und Dokumentation.
  - Erwartung: Die Stunden je Arbeitspaket werden begründet, z. B. durch Erfahrungswerte, Vergleichsprojekte oder Dreipunktschätzung (optimistisch, wahrscheinlich, pessimistisch).
  - Erwartung: Abhängigkeiten und Reihenfolge werden geklärt (Tests erst nach Aufbau, Einweisung erst nach bestandenen Tests); der kritische Pfad bestimmt die Mindestdauer, Meilensteine setzen Prüfpunkte, ein Puffer wird ausgewiesen.
  - Erwartung: Die Summe der Stunden bleibt im Rahmen von 40 Stunden, und Tests und Dokumentation stehen im Plan.
  - Erwartung: Abweichungen von der genehmigten Projektbeschreibung werden offen benannt und begründet, der Zeitplan wird nicht nachträglich geschönt.
  - Rückfrage: Was ist eine Dreipunktschätzung?

### 12.2 Umsetzung, Sicherheit, Tests, Übergabe und Wirtschaftlichkeit

- Welche Konfigurations- und Architekturentscheidungen waren in Ihrem Projekt am wichtigsten, und welche Alternativen haben Sie dabei verworfen?
  - Erwartung: Jede wichtige Entscheidung wird mit den Anforderungen (Muss- und Soll-Kriterien) und den Bewertungskriterien begründet, nicht nur beschrieben; ein Anleitungsstil ohne das Warum ist ein typischer Dokumentationsfehler.
  - Erwartung: Vor dem Aufbau wurde die Kompatibilität geprüft: Hardware und Hypervisor, Betriebssystem- und Treiberversionen, Protokollversionen und Lizenzbedingungen; gefundene Probleme werden mit ihrer Lösung dokumentiert.
  - Erwartung: Die verworfenen Alternativen werden genannt und anhand der Kriterien begründet abgelehnt.
  - Erwartung: Sicherheitsrelevante Konfigurationen (z. B. Härtung, Segmentierung, Berechtigungen nach dem Prinzip der geringsten Rechte) werden begründet.
  - Erwartung: Die Antwort folgt dem Muster Kernaussage, Begründung, Beleg aus dem Projekt.
  - Rückfrage: Welchen Beleg aus dem Projekt, etwa ein Testergebnis, können Sie für Ihre Entscheidung nennen?
- Wie haben Sie die Änderung am produktiven System vorbereitet (Sicherung, Wartungsfenster, Rückfallplan), und was hätten Sie bei einem Scheitern getan?
  - Erwartung: Die Änderung wird beschrieben (was, warum, wer betroffen, erwarteter Effekt) und mit einer Auswirkungs- und Risikoanalyse bewertet.
  - Erwartung: Termin und Wartungsfenster außerhalb der Kernarbeitszeit werden mit den Auftraggeber:innen abgestimmt, die Anwender:innen werden informiert.
  - Erwartung: Vor der Änderung liegt eine vollständige, getestete Datensicherung vor; ein Snapshot einer virtuellen Maschine hilft beim schnellen Zurückrollen, ist aber keine Datensicherung, weil er auf demselben Speicher liegt.
  - Erwartung: Der Rückfallplan (Rollback) wird vorher festgelegt, einschließlich eines Abbruchkriteriums, bis wann entschieden wird; bei einem Scheitern wird der Ausgangszustand wiederhergestellt.
  - Erwartung: Wenn möglich wird zuerst an einem Testsystem oder einer kleinen Nutzergruppe erprobt, und die durchgeführten Schritte und Abweichungen werden dokumentiert.
  - Rückfrage: Warum ist ein Snapshot keine Datensicherung?
  - Rückfrage: Warum wird der Rückfallplan vorher und nicht unter Zeitdruck festgelegt?
- Wie haben Sie die Datenübernahme durchgeführt und geprüft, dass nichts verloren gegangen ist und die Berechtigungen stimmen?
  - Erwartung: Der Datenbestand wird bereinigt (Altlasten, Duplikate), der Umfang bestimmt und die Zuordnung von Quelle zu Ziel (Namen, Berechtigungen) festgelegt.
  - Erwartung: Eine Erstkopie im laufenden Betrieb nimmt die Berechtigungen mit; im Wartungsfenster folgt eine Abschluss-Synchronisation, die nur die Änderungen seit der Erstkopie überträgt und so die Ausfallzeit klein hält.
  - Erwartung: Die Validierung erfolgt über Anzahl und Größe der Dateien, Prüfsummen-Stichproben und Berechtigungsstichproben.
  - Erwartung: Ein Berechtigungstest prüft, dass Berechtigte Zugriff haben und Nichtberechtigte keinen (Negativtest).
  - Erwartung: Nach der Umschaltung bleibt das Altsystem zunächst nur lesbar und wird erst nach einer vereinbarten Beobachtungszeit abgeschaltet.
  - Rückfrage: Warum wird die Datenübernahme in Erstkopie und Abschluss-Synchronisation aufgeteilt?
- Welche Schwachstellen haben Sie gefunden oder berücksichtigt, wie haben Sie sie bewertet und priorisiert, und welche Schutzmaßnahmen haben Sie umgesetzt?
  - Erwartung: Zuerst wird der Bestand erfasst (Systeme, Dienste, Ports, Softwarestände, Benutzerkonten); Schwachstellen werden per Schwachstellenscan, Konfigurationsprüfung gegen eine Härtungs-Checkliste, Herstellerhinweise und Protokollsichtung ermittelt.
  - Erwartung: Befunde werden verifiziert, weil automatische Scanner auch Fehlalarme (False Positives) melden.
  - Erwartung: Die Priorisierung folgt dem Risiko (Eintrittswahrscheinlichkeit mal Schadensausmaß); der CVSS-Basiswert (0,0 bis 10,0) reicht allein nicht, zusätzlich zählen Erreichbarkeit, Verfügbarkeit eines Exploits, Wert der betroffenen Daten und Systeme sowie bestehende Schutzschichten.
  - Erwartung: Maßnahmen: möglichst die Ursache beseitigen (Patch, Konfigurationsänderung), sonst abschirmen (Segmentierung, Firewall-Regel), sonst erkennen (Protokollierung, Alarmierung) und nur bei bewusster Entscheidung das Restrisiko akzeptieren.
  - Erwartung: Typische Schutzmaßnahmen sind Härtung, Netzsegmentierung, Mehr-Faktor-Authentifizierung für Administrationszugänge, Berechtigungskonzept nach dem Prinzip der geringsten Rechte und getrennte Sicherungen; Schutzmaßnahmen sind selbst Änderungen mit eigenem Risiko und durchlaufen Tests und Rückfallplanung.
  - Rückfrage: Warum kann ein Befund mit niedrigerem CVSS-Wert dennoch zügig zu beheben sein?
- Wie haben Sie nachgewiesen, dass die Schutzmaßnahmen wirken, und welches Restrisiko bleibt?
  - Erwartung: Nach der Umsetzung erfolgen ein erneuter Scan bzw. Test (Retest), und das Ergebnis wird dokumentiert.
  - Erwartung: Ein Sicherheitstest umfasst Schwachstellenscan, Prüfung der Härtungsmaßnahmen und Kontrolle offener Ports.
  - Erwartung: Ein Berechtigungstest prüft auch den Negativfall, ob Nichtberechtigte tatsächlich keinen Zugriff haben.
  - Erwartung: Eine Sicherung gilt erst als funktionsfähig, wenn die Wiederherstellung nachgewiesen ist, auch in der Zeit.
  - Erwartung: Ein verbleibendes Restrisiko wird dokumentiert; Sicherheitsmaßnahmen sollen nicht nur aufgezählt, sondern begründet und auf Wirksamkeit geprüft werden.
  - Rückfrage: Was bedeuten RPO und RTO?
- Welche Tests haben Sie durchgeführt, wie haben Sie die Testfälle aus den Anforderungen abgeleitet, und wie sind Sie mit nicht bestandenen Tests umgegangen?
  - Erwartung: Die Testfälle werden aus den Muss- und Soll-Kriterien der Anforderungen abgeleitet, denn es wird gegen die Anforderungen getestet.
  - Erwartung: Typische Testarten sind Funktionstest, Berechtigungstest (mit Negativtest), Last- und Leistungstest, Ausfall- bzw. Failover-Test, Wiederherstellungstest und Sicherheitstest.
  - Erwartung: Das Testprotokoll hält je Testfall Soll, Ist und Ergebnis fest.
  - Erwartung: Auch gescheiterte Tests gehören ins Protokoll, samt Nachbesserung und Wiederholungstest.
  - Erwartung: Testprotokolle, die fehlen oder nur „bestanden“ enthalten, sind ein typischer Dokumentationsfehler.
  - Rückfrage: Welcher Test wird beim Berechtigungstest gern vergessen?
- Wie haben Sie die Übergabe und die Einweisung vorbereitet, was enthielt das Abnahmeprotokoll, und wie ist der Betrieb (Updates, Monitoring, Sicherung) geregelt?
  - Erwartung: Die Übergabe umfasst einen Funktionsnachweis (Testergebnisse, ggf. Vorführung), die Dokumentation (Systemdokumentation, Betriebs- bzw. Administrationshandbuch, ggf. kurze Benutzerinformation) und die Einweisung der Administrierenden und Anwender:innen.
  - Erwartung: Zugangsdaten und Berechtigungen werden auf sicherem Weg übergeben, Standard- und Projektkonten werden entfernt oder geändert.
  - Erwartung: Das Abnahmeprotokoll enthält Datum, Beteiligte, abgenommenen Leistungsumfang, festgestellte Mängel mit Fristen, Hinweise zu Restarbeiten und Support sowie Unterschriften.
  - Erwartung: Die Einführung beginnt mit einem Pilotbetrieb, danach folgt der Rollout in Wellen oder auf einmal im Wartungsfenster; eine Phase erhöhter Aufmerksamkeit (Hypercare) begleitet die ersten Betriebstage.
  - Erwartung: Der Betrieb ist geregelt durch Patch- und Updatemanagement, Monitoring, Datensicherung mit regelmäßigen Wiederherstellungstests, Lizenzverwaltung und Lebenszyklusplanung.
  - Rückfrage: Was besagt die 3-2-1-Regel der Datensicherung?
- Wie haben Sie die Wirtschaftlichkeit berechnet, welche Annahmen stecken in Ihrer Rechnung (Stundensatz, Nutzungsdauer, Preise), und wie belastbar ist sie?
  - Erwartung: Die einmaligen Kosten (z. B. Personal mit internem Verrechnungssatz, Hardware, Lizenzen) und die laufenden Kosten pro Jahr, Alt gegen Neu, werden gegenübergestellt.
  - Erwartung: Die jährliche Einsparung ist die Differenz der laufenden Kosten; die Amortisationszeit ergibt sich aus Investition geteilt durch jährliche Einsparung.
  - Erwartung: Alle Annahmen (Stundensätze, Preise, Nutzungsdauer) werden offen genannt; die Rechnung ist vereinfacht (z. B. keine Abzinsung, kein Restwert), und das wird benannt.
  - Erwartung: Nicht monetäre Nutzen wie höhere Ausfallsicherheit, bessere Wiederherstellbarkeit, aktuelle Sicherheitsupdates und Zukunftsfähigkeit ergänzen die Bewertung.
  - Erwartung: Die Belastbarkeit hängt davon ab, dass keine typischen Fehler gemacht wurden: Personalkosten vergessen, Einsparungen ohne Quelle, laufende Kosten ignoriert oder Lieferantenpreise nicht belegt.
  - Rückfrage: Wie berechnen Sie die Amortisationszeit bei 8.400 € Investition und 2.800 € jährlicher Einsparung?
- Welche Rolle spielten Datenschutz und Vertraulichkeit im Projekt (z. B. Umgang mit Kundendaten, Zugriffsrechte, Testdaten)?
  - Erwartung: Rechtliche und betriebliche Vorgaben wie Datenschutz und interne Richtlinien gehören zu den Rahmenbedingungen der Anforderungsanalyse; Datenschutz kann außerdem als Kriterium in der Nutzwertanalyse der Lösungsalternativen gewichtet werden.
  - Erwartung: Bei der Vertraulichkeit wird vorab das Einverständnis des Betriebs bzw. der Kundschaft geklärt, ob Kundendaten, Netzpläne und Konfigurationen verwendet werden dürfen; üblich ist, Kunden- und Personennamen zu anonymisieren und sicherheitsrelevante Angaben wie Passwörter, öffentliche IP-Adressen und Schlüssel zu schwärzen.
  - Erwartung: Zugriffsrechte folgen einem Berechtigungskonzept nach dem Prinzip der geringsten Rechte (Least Privilege); getestet wird, ob Berechtigte Zugriff haben und Nichtberechtigte keinen.
  - Erwartung: Sind personenbezogene Daten betroffen, sind außerdem die technischen und organisatorischen Maßnahmen des Datenschutzes zu beachten; ein Zugriff auf Kundendaten im Rahmen der Dienstleistung setzt in der Regel eine vertragliche Regelung zur Auftragsverarbeitung voraus.
  - Erwartung: Bei der Übergabe werden Zugangsdaten und Berechtigungen auf sicherem Weg übergeben, und Standard- und Projektkonten werden entfernt oder geändert.
  - Rückfrage: Was prüft der Negativtest beim Berechtigungstest?
  - Rückfrage: Welche technischen Schutzmaßnahmen kennen Sie für Administrationszugänge und die Datenübertragung?
- Ihr Ausbildungsbetrieb betreibt Systeme oder Fernwartungszugänge für Kundschaft. Welche rechtlichen Anforderungen ergeben sich daraus für den Betrieb selbst, und wie wirken sie sich auf Ihr Projekt aus?
  - Erwartung: Ein Dienstleister, der Betrieb, Wartung oder Fernwartung für Kundschaft erbringt (Managed Service Provider), kann selbst eine wichtige oder besonders wichtige Einrichtung sein; das hängt von der Größe ab und davon, ob Managed Services mehr als eine vernachlässigbare Nebentätigkeit sind. Die Einrichtung prüft und registriert sich selbst. Zugleich ist der Dienstleister Glied der Lieferkette seiner Kundschaft und selbst Auftraggeber seiner Zulieferer.
  - Erwartung: Hat der Dienstleister seine Hauptniederlassung (Ort der Entscheidungen zum Risikomanagement) in Deutschland, ist das BSI für ihn in der gesamten Union zuständig; für diese Einrichtungsarten gibt es zusätzlich eine besondere Registrierung.
  - Erwartung: Für solche Dienstleister gelten Anforderungen, die Verwaltungszugänge unmittelbar betreffen: eigene Verwaltungskonten, starke Authentifizierung, eingeschränkte Rechte, geschützte und getrennte Verwaltungssysteme und Protokollierung privilegierter Zugriffe, jeweils soweit angemessen.
  - Erwartung: Im Projekt zeigt sich das in den Anforderungen und im Konzept (Konten, Rechte, Authentifizierung, Protokollierung), in Tests einschließlich des Negativfalls und in der Dokumentation, in der Kundendaten anonymisiert und sicherheitsrelevante Angaben geschwärzt werden; rechtlich bindend ist das für den Dienstleister und seine eigenen Verwaltungssysteme, für ein Kundenprojekt eine Orientierung.
  - Erwartung: Der Dienstleister gibt Orientierung, erteilt aber keine verbindliche Rechtsauskunft; die verbindliche Klärung liegt bei Rechtsberatung und Geschäftsleitung. Anforderungen der Kundschaft ergeben sich teils aus dem Gesetz, im Übrigen aus dem Vertrag.
  - Rückfrage: Welche Behörde beaufsichtigt einen solchen Dienstleister, wenn er Kundschaft in mehreren EU-Staaten hat?
- Angenommen, ein Fernwartungskonto wird missbraucht und es werden Kundendaten kopiert, obwohl kein Dienst ausfällt. Wie läuft die Reaktion ab, wer wird wann informiert, und was wird dokumentiert?
  - Erwartung: Das Ereignis wird gemeldet, nach festgelegten Kriterien bewertet und eingedämmt (etwa Konto sperren); die Bewertung wird bei neuen Informationen angepasst. Bei einem Dienstleister kann der Vorfall auch ohne Ausfall erheblich sein, wenn die Vertraulichkeit der Daten infolge einer mutmaßlich böswilligen Handlung beeinträchtigt ist; die Meldestufen entsprechen Thema 6.6 „NIS2, KRITIS und Meldepflichten“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“.
  - Erwartung: Die Kundschaft wird informiert: Betrifft es personenbezogene Daten im Auftrag, wird der Verantwortliche unverzüglich informiert; diese gesetzliche Pflicht gilt immer, eine vertraglich vereinbarte Frist (etwa sechs Stunden in Textform) kommt hinzu und verlängert sie nicht. Die Kundschaft bewertet danach selbst und prüft ihre eigenen Meldepflichten; die Meldung des Dienstleisters ersetzt die der Kundschaft nicht.
  - Erwartung: Die Information enthält, was die Kundschaft für ihre Bewertung braucht: was geschehen ist und wann, betroffene Systeme und Daten, ungefähre Zahl der Betroffenen, Maßnahmen, mögliche Folgen und eine Ansprechperson.
  - Erwartung: Dokumentiert werden eine Zeitleiste, die Begründung der Einstufung und des Kenntniszeitpunkts, Entscheidungen, Maßnahmen, Nachweise und Meldungen; danach folgt eine Nachbetrachtung mit Ursache und Lehren.
  - Rückfrage: Welche Rolle spielt die vertraglich vereinbarte Frist neben der gesetzlichen Pflicht, den Verantwortlichen unverzüglich zu informieren?

### 12.3 Soll-Ist-Vergleich, Reflexion und Präsentation

- Wo weicht das Ergebnis von Ihrer Planung ab (Zeit, Kosten, Umfang), wie erklären Sie diese Abweichungen, und welche Konsequenzen ziehen Sie daraus?
  - Erwartung: Plan und Ergebnis werden gegenübergestellt: Zeit (Stunden je Arbeitspaket), Kosten, Umfang bzw. Funktionen und Zielerreichung (waren die messbaren Ziele erfüllt?).
  - Erwartung: Abweichungen werden nicht versteckt, sondern begründet; zu nennen sind die Ursachen, z. B. nicht dokumentierte Berechtigungen im Altsystem oder ein Firmware-Update des Hosts.
  - Erwartung: Mehraufwände in einem Arbeitspaket können durch Einsparungen an anderer Stelle oder den eingeplanten Puffer aufgefangen werden, sodass die Gesamtstunden gleich bleiben.
  - Erwartung: Aus den Abweichungen werden Konsequenzen für künftige Planungen abgeleitet, z. B. die Berechtigungsanalyse früher einplanen.
  - Rückfrage: Warum ist es im Fachgespräch besser, Abweichungen selbst offen anzusprechen?
- Welches Problem hat Sie im Projekt am meisten Zeit gekostet, wie haben Sie die Ursache gefunden, und was haben Sie daraus gelernt?
  - Erwartung: Das Problem wird konkret und offen geschildert, nicht beschönigt oder verschwiegen.
  - Erwartung: Die Ursache wird benannt und belegt, z. B. nicht dokumentierte Berechtigungen im Altsystem.
  - Erwartung: Es wird gezeigt, wie das Problem gelöst wurde, und seine Wirkung auf den Zeitplan im Soll-Ist-Vergleich wird dargestellt.
  - Erwartung: Aus dem Problem wird eine Lehre für künftige Planungen abgeleitet, z. B. die Berechtigungsanalyse früher einplanen.
- Was würden Sie heute anders machen, wenn Sie das Projekt noch einmal beginnen könnten?
  - Erwartung: Schwächen werden selbst angesprochen: Wo lag die Planung falsch? Das ist erwartbar und gut vorbereitbar.
  - Erwartung: Die Antwort stützt sich auf konkrete Abweichungen und Probleme des Projekts, nicht auf allgemeine Aussagen.
  - Erwartung: Es wird eine Lehre für künftige Planungen abgeleitet, z. B. die Berechtigungsanalyse früher einplanen.
  - Erwartung: Ein ehrlicher Rückblick spricht für Souveränität, nicht dagegen.
  - Rückfrage: Welche typischen Planungsfehler gibt es im 40-Stunden-Rahmen?
- Nennen Sie zwei Teile Ihrer Lösung, die sich ändern würden, wenn die Kundschaft statt 35 plötzlich 200 Arbeitsplätze oder einen weiteren Standort hätte, und begründen Sie eine dieser Änderungen.
  - Erwartung: Anzahl der Benutzer:innen, Datenmengen und Spitzenzeiten gehören zur Last und bestimmen die Dimensionierung der Lösung.
  - Erwartung: Der Last- und Leistungstest müsste mit der erwarteten Nutzung wiederholt werden.
  - Erwartung: Skalierbarkeit ist eine nichtfunktionale Anforderung und ein Bewertungskriterium der Nutzwertanalyse; verschieben sich die Gewichte, ist die Reihung der Alternativen erneut zu prüfen (Sensitivität).
  - Erwartung: Sicherung und Wiederherstellung wären erneut gegen die Zielwerte (RTO, RPO) nachzuweisen.
  - Erwartung: Ein weiterer Standort betrifft die Netzstruktur (Subnetze, VLANs, Adressplan, Firewall-Regeln) und die Segmentierung bzw. Anbindung, z. B. über einen verschlüsselten Tunnel.
- Welche Teile des Projekts haben Sie selbst umgesetzt, und welche Unterstützung oder Vorgaben haben Sie erhalten?
  - Erwartung: Die Eigenleistung wird klar abgegrenzt: Was wurde selbst gemacht, was wurde vorgegeben?
  - Erwartung: Unterstützung durch Kolleg:innen wird dabei nicht verschwiegen.
  - Erwartung: Auch Vorgaben der Auftraggeber:innen und des Betriebs werden benannt.
  - Erwartung: Die Antwort bezieht sich auf das Projekt, mit konkreten Entscheidungen und Ergebnissen statt allgemeiner Theorie.
- Wie haben Sie Ihre Präsentation auf Ihre Zuhörenden zugeschnitten, und welche Inhalte haben Sie bewusst weggelassen?
  - Erwartung: Der Kontext wird kurz erklärt (Kundenumfeld, Systemlandschaft, eigene Rolle), weil der Prüfungsausschuss das Projekt und die Kundschaft nicht kennt.
  - Erwartung: Fachsprache wird dort genutzt, wo sie präzise ist, unübliche oder betriebsinterne Abkürzungen werden einmal erklärt.
  - Erwartung: Der Fokus liegt auf den Entscheidungen: Welche Möglichkeiten gab es, welche Kriterien waren wichtig, warum fiel die Wahl so aus?
  - Erwartung: Wesentliches kommt vor Vollständigkeit: Die Details stehen in der Dokumentation, was weggelassen wird, ist bewusst weggelassen und kann im Fachgespräch auf Nachfrage vertieft werden.
  - Erwartung: Reservefolien mit erwartbaren Detailthemen (z. B. IP-Adressplan, Testprotokoll, Kostenrechnung, Risiken) erlauben es, Nachfragen mit einem Bild zu belegen.
  - Rückfrage: Welche Schwerpunkte setzen Sie bei der Vorstellung derselben Lösung für eine Geschäftsführung, welche für Administrierende?
