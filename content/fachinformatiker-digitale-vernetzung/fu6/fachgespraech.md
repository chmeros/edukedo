---
kurs_slug: fachinformatiker-digitale-vernetzung
fachgebiet_code: FU6
fachgebiet_title: "IT-Sicherheit, Datenschutz und Qualitätssicherung"
thema_code: "FU6-fachgespraech"
thema_title: "Fachgesprächsfragen-Sammlung"
quelle: "Frei formulierte Fragen zur Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), Anlage (Ausbildungsrahmenplan) Abschnitt A lfd. Nr. 5 und 6 (§ 4 Abs. 2 Nr. 5 und 6), orientiert an typischen Rückfragen im Fachgespräch zur betrieblichen Projektarbeit — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fachgesprächsfragen

Diese Sammlung dient als Fragen-Pool für den Fachgesprächs-Trainer (F-25). Im Anschluss an die Präsentation der betrieblichen Projektarbeit wird ein Fachgespräch geführt, in dem die Vorgehensweise begründet werden soll (vgl. Regelungen zur betrieblichen Projektarbeit in den §§ 12, 20, 28 und 36 FIAusbV, je nach Fachrichtung). Die Fragen sind nach Thema gruppiert, beziehen sich auf das eigene Projekt und simulieren typische Rückfragen des Prüfungsausschusses zu Qualitätssicherung, IT-Sicherheit und Datenschutz. Sie erfordern freies Formulieren und eine Begründung der eigenen Entscheidungen statt auswendig gelernter Antworten.

### 6.1 IT-Sicherheit: Schutzziele, Bedrohungen und Maßnahmen

- Welche Schutzziele waren in Ihrem Projekt am wichtigsten, und woran haben Sie das festgemacht?
  - Erwartung: Die drei klassischen Schutzziele sind Vertraulichkeit (nur Berechtigte sehen Informationen), Integrität (Daten und Systeme bleiben korrekt und unverändert) und Verfügbarkeit (Systeme und Daten stehen bei Bedarf zur Verfügung).
  - Erwartung: Die Gewichtung der Schutzziele richtet sich nach dem konkreten System und dem Schutzbedarf der Daten.
  - Erwartung: Die Wahl wird am Projekt mit typischen Verletzungen begründet, z. B. gestohlene Zugangsdaten (Vertraulichkeit), manipulierte Messwerte (Integrität), Ransomware oder Hardware-Ausfall (Verfügbarkeit).
  - Erwartung: Schutzziele können in Konflikt geraten: Eine sehr restriktive Zugriffskontrolle stärkt die Vertraulichkeit, kann aber die Verfügbarkeit im Störungsfall einschränken.
  - Rückfrage: Welche weiteren Schutzziele werden ergänzend häufig genannt?
- Welche drei Bedrohungen haben Sie für Ihr Projekt oder Ihr System als besonders relevant eingeschätzt, und wie haben Sie deren Schadenspotenzial bewertet?
  - Erwartung: Eine Bedrohung ist ein mögliches Ereignis, das ein Schutzziel verletzen kann; ein Bedrohungsszenario beschreibt konkret, wer was wie angreift (oder welcher Fehler passiert), welche Schutzziele betroffen sind und welche Folgen eintreten.
  - Erwartung: Typische Angriffsarten sind Malware (einschließlich Ransomware), Phishing, Social Engineering, Denial of Service, Man-in-the-Middle, Injection, Brute-Force- und Credential-Stuffing-Angriffe sowie das Ausnutzen ungepatchter Schwachstellen.
  - Erwartung: Bedrohungen sind nicht nur Angriffe von außen, sondern auch menschliche Fehler, technisches Versagen und höhere Gewalt.
  - Erwartung: Das Schadenspotenzial wird nach wirtschaftlichen und technischen Kriterien eingeschätzt, z. B. Produktionsstillstand, Vertragsstrafen, Reputation und Wiederherstellungsaufwand.
  - Rückfrage: Worin unterscheiden sich Bedrohung, Schwachstelle und Risiko?
  - Rückfrage: Welches Schutzziel verletzt Ransomware vor allem?
- Wie sind Sie vorgegangen, um Risiken zu priorisieren — und warum haben Sie sich für genau diese Maßnahmen entschieden und gegen andere?
  - Erwartung: Die Vorgehensweise umfasst: Werte (Assets) und Schutzbedarf erfassen, Bedrohungen und Schwachstellen ermitteln, Eintrittswahrscheinlichkeit und Schadenspotenzial einschätzen, Risiken priorisieren (z. B. in einer Risikomatrix), Maßnahmen auswählen und das Restrisiko dokumentieren.
  - Erwartung: Das Risiko ergibt sich aus Eintrittswahrscheinlichkeit mal Schadenshöhe.
  - Erwartung: Für den Umgang mit einem Risiko gibt es vier Strategien: vermeiden, vermindern, übertragen und akzeptieren.
  - Erwartung: Jede Maßnahme wird dem Risiko zugeordnet, das sie senkt, weil eine Maßnahme meist nur gegen eine Angriffsart wirkt; gute Konzepte kombinieren technische und organisatorische Maßnahmen in mehreren Schichten (Defense in Depth).
  - Erwartung: Die Abwahl anderer Maßnahmen wird begründet, denn ein ausformuliertes Szenario zeigt auch, warum sich eine Maßnahme nicht lohnt.
  - Rückfrage: Welche Strategie wählen Sie bei geringer Wahrscheinlichkeit und geringem Schaden?
- Welche betrieblichen Vorgaben zur IT-Sicherheit (z. B. Passwortrichtlinie, Berechtigungskonzept) haben Sie in Ihrem Projekt berücksichtigt, und wie haben Sie deren Einhaltung sichergestellt?
  - Erwartung: Betriebliche Vorgaben wie Passwortrichtlinie oder Regeln für mobile Geräte ergeben sich meist aus dem Informationssicherheits-Managementsystem des Unternehmens.
  - Erwartung: Auszubildende müssen diese Vorgaben kennen, einhalten und im Projekt erkennbar berücksichtigen.
  - Erwartung: Ein Berechtigungskonzept folgt dem Prinzip der minimalen Rechte: Jede Person und jedes System erhält nur die Rechte, die für die Aufgabe nötig sind.
  - Erwartung: Die Einhaltung wird geprüft, z. B. durch Konfigurationsreviews (unnötige Dienste deaktiviert, Standardpasswörter geändert) oder Audits anhand von Checklisten.
  - Rückfrage: Was verlangt das Prinzip der minimalen Rechte?
- Wie haben Sie Authentifizierung und Verschlüsselung in Ihrem Projekt umgesetzt oder bewusst nicht umgesetzt, und welches Restrisiko bleibt?
  - Erwartung: Bei der Authentifizierung weist ein Nutzer seine Identität nach, die Autorisierung prüft anschließend, was er darf; Faktoren sind Wissen, Besitz und Eigenschaft.
  - Erwartung: Mehrfaktor-Authentifizierung kombiniert mindestens zwei unterschiedliche Faktoren und schützt auch dann, wenn ein Passwort abgegriffen wurde; zwei Passwörter sind kein zweiter Faktor.
  - Erwartung: Symmetrische Verschlüsselung nutzt denselben Schlüssel (schnell, aber der Schlüsselaustausch muss sicher sein), asymmetrische ein Schlüsselpaar aus öffentlichem und privatem Schlüssel; TLS kombiniert beides.
  - Erwartung: Passwörter werden nur gehasht mit Salt abgelegt, nicht im Klartext und nicht reversibel verschlüsselt.
  - Erwartung: Ein bewusster Verzicht auf eine Maßnahme wird begründet, und das verbleibende Restrisiko wird benannt und dokumentiert.
  - Rückfrage: Wovor schützt eine verschlüsselte Verbindung mit geprüftem Zertifikat?

### 6.2 Datenschutz

- Werden in Ihrem Projekt personenbezogene Daten verarbeitet? Wenn ja, welche, und wie haben Sie das für sich geklärt?
- Wie haben Sie die Grundsätze der Datenminimierung und der Zweckbindung in Ihrer Lösung berücksichtigt?
- Mit welchen Daten haben Sie getestet, und wie haben Sie sichergestellt, dass dabei keine echten personenbezogenen Daten ungeschützt verwendet wurden?
- Wie ist die Rollenverteilung zwischen Ihrem Ausbildungsbetrieb und dem Kunden, und welche Vereinbarungen sind dafür nötig?
- Wie haben Sie Ihre Kundschaft oder Ihre Kolleg:innen zu Datenschutz-Anforderungen beraten, und wann haben Sie bewusst die Datenschutzbeauftragte oder den Datenschutzbeauftragten einbezogen?

### 6.3 Qualitätssicherung und Verbesserungsprozesse

- Welche Qualitätsmerkmale waren Ihrem Kunden wichtig, und wie haben Sie diese messbar gemacht?
  - Erwartung: Qualität bedeutet, dass die vereinbarten und berechtigterweise erwarteten Anforderungen erfüllt werden; sie hängt von Produktqualität und Prozessqualität ab.
  - Erwartung: Qualität wird in Qualitätsmerkmale zerlegt, z. B. funktionale Eignung, Zuverlässigkeit, Leistungseffizienz, Gebrauchstauglichkeit, Sicherheit, Wartbarkeit, Kompatibilität und Übertragbarkeit, bei vernetzten Systemen etwa Verfügbarkeit und Latenz.
  - Erwartung: Mit dem Kunden wird vorab vereinbart, welche Merkmale wie gemessen werden.
  - Erwartung: Eine messbare Formulierung ersetzt Vages wie „schnell“, z. B. „Antwortzeit unter zwei Sekunden bei 100 gleichzeitigen Nutzern“.
  - Rückfrage: Worin unterscheiden sich Produktqualität und Prozessqualität?
- Welche Qualitätssicherungsmaßnahmen haben Sie projektbegleitend durchgeführt, und welche davon haben Fehler tatsächlich aufgedeckt?
  - Erwartung: Konstruktive Maßnahmen beugen Fehlern vor (z. B. Coding-Guidelines, Vorlagen, Definition of Done), analytische Maßnahmen prüfen vorhandene Ergebnisse (z. B. Tests, Code-Reviews, Inspektionen, statische Analyse, Abnahmeprüfungen).
  - Erwartung: Projektbegleitend kommen Tests auf mehreren Ebenen (Unit-, Integrations-, System- und Abnahmetests), automatisierte Prüfungen in der Build-Pipeline und Code-Reviews nach dem Vier-Augen-Prinzip zum Einsatz.
  - Erwartung: Testfälle werden sinnvoll ausgewählt (z. B. Grenzwerte, Fehlerfälle), denn Tests können das Vorhandensein von Fehlern zeigen, aber nicht deren Abwesenheit beweisen.
  - Erwartung: Alle Maßnahmen werden dokumentiert, z. B. Testprotokolle mit Datum, Testfall, erwartetem und tatsächlichem Ergebnis und Tester, außerdem Review-Ergebnisse und Abnahmeprotokolle.
  - Rückfrage: Worin unterscheiden sich Verifikation und Validierung?
- Wie sind Sie vorgegangen, als ein Fehler oder Mangel auftrat — haben Sie nur das Symptom beseitigt oder auch die Ursache analysiert? Beschreiben Sie das an einem konkreten Beispiel.
  - Erwartung: Der Fehler wird erfasst und reproduziert, z. B. als Ticket mit Schweregrad, Umgebung und Schritten zur Reproduktion.
  - Erwartung: Es genügt nicht, das Symptom zu beseitigen; eine systematische Ursachenanalyse (5-Why, Ishikawa-Diagramm, Pareto-Analyse) verhindert, dass derselbe Fehler wiederkehrt.
  - Erwartung: Auf die Korrektur (aktuellen Fehler beheben und prüfen) folgt eine Korrekturmaßnahme gegen die Ursache, z. B. ein zusätzlicher Test oder ein geänderter Prozess.
  - Erwartung: Das Ergebnis wird dokumentiert, z. B. als „Lessons Learned“, geänderte Checkliste oder Retrospektive.
  - Rückfrage: Worin unterscheiden sich Schweregrad und Priorität eines Fehlers?
  - Rückfrage: Wo endet eine 5-Why-Kette?
- Wie haben Sie einen Soll-Ist-Vergleich durchgeführt, und welche Konsequenzen haben Sie aus der Abweichung gezogen?
  - Erwartung: Die Soll-Werte werden vorab messbar festgelegt, sonst lässt sich der Erfolg nicht belegen.
  - Erwartung: Geplante Zielwerte (Soll) werden mit den tatsächlich erreichten Werten (Ist) verglichen, z. B. Fehlerdichte, Testabdeckung, Behebungsdauer von Tickets, Verfügbarkeit, Termine oder Kosten.
  - Erwartung: Die Abweichung wird analysiert: Ist sie relevant, woran liegt sie, welche Konsequenz folgt?
  - Erwartung: Im PDCA-Zyklus findet der Vergleich in der Check-Phase statt; in der Act-Phase wird bei Erfolg standardisiert und bei Misserfolg nachgesteuert.
  - Rückfrage: Welche Phasen hat der PDCA-Zyklus?
- Welche Betriebsrichtlinien oder Qualitätssicherungssysteme Ihres Betriebs haben Sie angewendet, und wie haben Sie Ihre Ergebnisse dokumentiert?
  - Erwartung: Ein betriebliches Qualitätssicherungssystem legt Verantwortlichkeiten, Abläufe, Vorlagen und Prüfpunkte fest und ist oft an Normen wie die ISO 9001 angelehnt.
  - Erwartung: Angewendet wird es im Alltag z. B. durch Checklisten, Freigabeprozesse, Ticketsysteme, Vorlagen für Testprotokolle und Dokumentationsstandards.
  - Erwartung: Dokumentiert werden Testpläne und Testprotokolle, Review-Ergebnisse, Abnahmeprotokolle sowie die Änderungs- und Fehlerhistorie.
  - Erwartung: Die Dokumentation macht Ergebnisse nachvollziehbar, dient als Nachweis gegenüber Kunden und ist Grundlage für Verbesserungen.

### 6.4 Wirksamkeit prüfen und nachsteuern

- Woran haben Sie festgestellt, dass die von Ihnen umgesetzten Sicherheits- oder Datenschutzmaßnahmen wirksam sind?
  - Erwartung: Wirksamkeit fragt, ob die Maßnahme das Ziel erreicht (z. B. schützt das Backup tatsächlich vor Datenverlust?), Effizienz fragt, ob der Aufwand in einem sinnvollen Verhältnis zum Nutzen steht.
  - Erwartung: Genutzt werden geeignete Prüfverfahren wie Audits, Konfigurations- und Code-Reviews, Schwachstellenscans, Penetrationstests, Protokollauswertung und Praxistests der Prozesse.
  - Erwartung: Praxistests belegen die Wirkung konkret, z. B. zeigt ein Restore-Test, ob sich ein Backup wiederherstellen lässt und in welcher Zeit.
  - Erwartung: Die Ergebnisse werden mit zuvor festgelegten Zielwerten im Soll-Ist-Vergleich bewertet und nach Schweregrad, Ausnutzbarkeit und Schadenspotenzial priorisiert.
  - Rückfrage: Warum müssen Ergebnisse eines Schwachstellenscans kontextbezogen bewertet werden?
- Welche Kennzahlen oder Prüfverfahren (z. B. Test, Schwachstellenscan, Log-Auswertung, Audit) haben Sie dafür genutzt, und warum haben Sie diese ausgewählt?
  - Erwartung: Beispiele für Kennzahlen sind Anzahl und Alter offener kritischer Schwachstellen, die Zeit bis zum Einspielen von Sicherheitsupdates, Erkennungs- und Reaktionszeiten, die Klickrate bei Phishing-Simulationen und die Restore-Erfolgsquote mit Wiederanlaufzeit.
  - Erwartung: Kennzahlen müssen zum Ziel passen: Die Zahl durchgeführter Schulungen beschreibt Aktivität, nicht Wirkung; aussagekräftiger ist z. B. die Meldequote verdächtiger Mails.
  - Erwartung: Kennzahlen bringen nur etwas, wenn Zielwerte festgelegt sind und ein Soll-Ist-Vergleich erfolgt.
  - Erwartung: Schwachstellenscans führen Schwachstellen mit Kennung (CVE) und Bewertung nach CVSS (Skala 0 bis 10), die Log-Analyse sucht Auffälligkeiten wie viele fehlgeschlagene Anmeldungen oder Rechteänderungen.
  - Erwartung: Die Auswahl wird begründet durch das Ziel der Maßnahme und das Verhältnis von Aufwand und Nutzen.
  - Rückfrage: Was bedeuten RTO und RPO?
- Was würden Sie im Rückblick in Ihrem Projekt anders machen, um Sicherheit, Datenschutz und Qualität noch besser zu gewährleisten, und wie würden Sie den Kunden darüber informieren?
  - Erwartung: Verbesserungen leiten sich aus den Prüfergebnissen ab, die nach Schweregrad, Ausnutzbarkeit und Schadenspotenzial bewertet werden; je Feststellung wird entschieden, ob beseitigt, abgeschwächt, abgesichert oder bewusst akzeptiert wird (mit dokumentiertem Restrisiko).
  - Erwartung: Nachgesteuert wird mit einem Maßnahmenplan mit Verantwortlichen und Terminen und einer Nachprüfung (Retest); die Prüfung ist die Check-Phase, die Nachsteuerung die Act-Phase des PDCA-Zyklus.
  - Erwartung: Der Kundenbericht enthält ein Management Summary (kurz, ohne Fachjargon), einen Detailteil für die technischen Ansprechpersonen mit Befunden, Schweregrad und Handlungsempfehlung, einen priorisierten Maßnahmenplan sowie Hinweise zu Restrisiken.
  - Erwartung: Der Bericht ist sachlich ohne Schuldzuweisungen, nennt auch, was gut funktioniert, wird nur an den vereinbarten Empfängerkreis übergeben und enthält keine unnötigen personenbezogenen Daten oder Zugangsdaten im Klartext.
  - Rückfrage: Warum ist ein Prüfbericht vertraulich zu behandeln?
